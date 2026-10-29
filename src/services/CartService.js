import { BaseService } from "../base/baseService.js";
import { CartModel } from "../models/CartModel.js";

const MAX_QTY_PER_ITEM = 99;

/**
 * Lưu productId và quantity trong db.json; thông tin sản phẩm được lấy từ products.
 */
export class CartService extends BaseService {
  constructor(cartModel) {
    super(cartModel);
    this.listeners = new Set();
    this.items = [];
    this.products = new Map();
    this.writeQueue = Promise.resolve();
  }

  async load(products) {
    if (!Array.isArray(products)) {
      throw new Error("Danh sách sản phẩm không hợp lệ, không thể tải giỏ hàng.");
    }

    return this.#enqueue(async () => {
      this.products = new Map(
        products.map((product) => [Number(product.id), product]),
      );

      const cart = await this.model.getDefaultCart();
      if (!cart || !Array.isArray(cart.items)) {
        throw new Error("Dữ liệu giỏ hàng trong db.json không hợp lệ.");
      }

      const quantities = new Map();
      cart.items.forEach((item) => {
        const id = Number(item?.productId);
        const quantity = Math.floor(Number(item?.quantity));
        const product = this.products.get(id);
        const maxQuantity = product
          ? Math.min(this.#maxQuantity(product), MAX_QTY_PER_ITEM)
          : 0;

        if (
          !Number.isInteger(id) ||
          !product ||
          !Number.isFinite(quantity) ||
          quantity <= 0 ||
          !maxQuantity
        ) {
          return;
        }

        quantities.set(
          id,
          Math.min((quantities.get(id) ?? 0) + quantity, maxQuantity),
        );
      });

      const items = Array.from(quantities, ([id, quantity]) =>
        this.#withProduct(this.products.get(id), quantity),
      );

      const normalized = items.map(({ id, quantity }) => ({
        productId: id,
        quantity,
      }));
      if (JSON.stringify(normalized) !== JSON.stringify(cart.items)) {
        await this.model.updateItems(normalized);
      }

      this.items = items;
      this.#notify();
      return this.getItems();
    });
  }

  #withProduct(product, quantity) {
    return {
      id: Number(product.id),
      name: String(product.name ?? ""),
      price: Number(product.price),
      image: String(product.image ?? ""),
      stock: this.#maxQuantity(product),
      quantity,
    };
  }

  #maxQuantity(product) {
    const stock = Number(product?.stock);
    return Number.isFinite(stock)
      ? Math.max(0, Math.floor(stock))
      : MAX_QTY_PER_ITEM;
  }

  #enqueue(operation) {
    const result = this.writeQueue.then(operation);
    this.writeQueue = result.catch(() => {});
    return result;
  }

  async #save(items) {
    const persistedItems = items.map(({ id, quantity }) => ({
      productId: id,
      quantity,
    }));

    await this.model.updateItems(persistedItems);
    this.items = items;
    this.#notify();
  }

  #notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.getItems());
      } catch (error) {
        console.error("[CartService Error]: Lỗi listener:", error);
      }
    });
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  async addItem(product, quantity = 1) {
    const id = Number(product?.id);
    const qty = Number(quantity);

    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Sản phẩm không hợp lệ, không thể thêm vào giỏ hàng!");
    }
    if (!Number.isInteger(qty) || qty <= 0) {
      throw new Error("Số lượng phải là số nguyên lớn hơn 0!");
    }

    return this.#enqueue(async () => {
      const currentProduct = this.products.get(id);
      if (!currentProduct) {
        throw new Error("Không tìm thấy sản phẩm. Vui lòng tải lại cửa hàng.");
      }

      const maxQuantity = Math.min(
        this.#maxQuantity(currentProduct),
        MAX_QTY_PER_ITEM,
      );
      if (maxQuantity === 0) {
        throw new Error("Sản phẩm hiện đã hết hàng.");
      }

      const existing = this.items.find((item) => item.id === id);
      const nextQuantity = (existing?.quantity ?? 0) + qty;
      if (nextQuantity > maxQuantity) {
        throw new Error(`Số lượng tối đa của sản phẩm này là ${maxQuantity}.`);
      }

      const nextItems = existing
        ? this.items.map((item) =>
            item.id === id
              ? this.#withProduct(currentProduct, nextQuantity)
              : item,
          )
        : [...this.items, this.#withProduct(currentProduct, qty)];

      await this.#save(nextItems);
    });
  }

  async updateQuantity(id, quantity) {
    const numId = Number(id);
    const qty = Number(quantity);
    if (!Number.isInteger(numId) || numId <= 0) {
      throw new Error("Sản phẩm không hợp lệ.");
    }
    if (!Number.isInteger(qty)) {
      throw new Error("Số lượng phải là số nguyên.");
    }

    if (qty <= 0) {
      await this.removeItem(numId);
      return;
    }

    return this.#enqueue(async () => {
      const existing = this.items.find((item) => item.id === numId);
      if (!existing) return;

      const product = this.products.get(numId);
      const maxQuantity = Math.min(
        product ? this.#maxQuantity(product) : existing.stock,
        MAX_QTY_PER_ITEM,
      );
      if (maxQuantity === 0) {
        throw new Error("Sản phẩm hiện đã hết hàng.");
      }

      const nextQuantity = Math.min(qty, maxQuantity);
      if (nextQuantity === existing.quantity) return;

      await this.#save(
        this.items.map((item) =>
          item.id === numId
            ? this.#withProduct(product ?? item, nextQuantity)
            : item,
        ),
      );
    });
  }

  async removeItem(id) {
    const numId = Number(id);
    if (!Number.isInteger(numId) || numId <= 0) {
      throw new Error("Sản phẩm không hợp lệ.");
    }
    return this.#enqueue(async () => {
      const nextItems = this.items.filter((item) => item.id !== numId);
      if (nextItems.length !== this.items.length) {
        await this.#save(nextItems);
      }
    });
  }

  async clear() {
    return this.#enqueue(async () => {
      if (this.items.length) await this.#save([]);
    });
  }

  getItems() {
    return this.items.map((item) => ({ ...item }));
  }

  getTotalQuantity() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  isEmpty() {
    return this.items.length === 0;
  }

  toOrderItems() {
    return this.items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));
  }

  static formatPrice(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
}

export const cartService = new CartService(new CartModel());
