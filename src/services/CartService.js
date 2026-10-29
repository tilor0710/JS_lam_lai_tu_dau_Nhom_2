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
  }

  async load(products) {
    if (!Array.isArray(products)) {
      throw new Error("Danh sách sản phẩm không hợp lệ, không thể tải giỏ hàng.");
    }

    this.products = new Map(products.map((product) => [Number(product.id), product]));

    const cart = await this.model.getDefaultCart();
    if (!cart || !Array.isArray(cart.items)) {
      throw new Error("Dữ liệu giỏ hàng trong db.json không hợp lệ.");
    }

    const items = cart.items
      .map((item) => {
        const id = Number(item?.productId);
        const quantity = Math.floor(Number(item?.quantity));
        const product = this.products.get(id);

        if (
          !product ||
          !Number.isFinite(quantity) ||
          quantity <= 0
        ) {
          return null;
        }

        return this.#withProduct(product, Math.min(quantity, MAX_QTY_PER_ITEM));
      })
      .filter(Boolean);

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
  }

  #withProduct(product, quantity) {
    return {
      id: Number(product.id),
      name: String(product.name ?? ""),
      price: Number(product.price),
      image: String(product.image ?? ""),
      quantity,
    };
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
    const price = Number(product?.price);
    const qty = Math.floor(Number(quantity));

    if (!Number.isFinite(id) || !Number.isFinite(price) || price < 0) {
      throw new Error("Sản phẩm không hợp lệ, không thể thêm vào giỏ hàng!");
    }
    if (!Number.isFinite(qty) || qty <= 0) {
      throw new Error("Số lượng phải là số nguyên lớn hơn 0!");
    }

    const currentProduct = this.products.get(id) ?? product;
    const existing = this.items.find((item) => item.id === id);
    const nextItems = existing
      ? this.items.map((item) =>
          item.id === id
            ? this.#withProduct(
                currentProduct,
                Math.min(item.quantity + qty, MAX_QTY_PER_ITEM),
              )
            : item,
        )
      : [
          ...this.items,
          this.#withProduct(currentProduct, Math.min(qty, MAX_QTY_PER_ITEM)),
        ];

    await this.#save(nextItems);
  }

  async updateQuantity(id, quantity) {
    const numId = Number(id);
    const qty = Math.floor(Number(quantity));
    if (!Number.isFinite(qty)) return;

    if (qty <= 0) {
      await this.removeItem(numId);
      return;
    }

    const nextItems = this.items.map((item) =>
      item.id === numId
        ? { ...item, quantity: Math.min(qty, MAX_QTY_PER_ITEM) }
        : item,
    );
    if (nextItems.some((item, index) => item.quantity !== this.items[index]?.quantity)) {
      await this.#save(nextItems);
    }
  }

  async removeItem(id) {
    const numId = Number(id);
    await this.#save(this.items.filter((item) => item.id !== numId));
  }

  async clear() {
    await this.#save([]);
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
