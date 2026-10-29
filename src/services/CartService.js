import { BaseService } from "../base/baseService.js";

const STORAGE_KEY = "quickship_cart";
const MAX_QTY_PER_ITEM = 99;

/**
 * Nghiệp vụ Giỏ hàng (JavaScript thuần, lưu bền bằng localStorage).
 *
 * - Không phụ thuộc DOM hay thư viện ngoài => dễ test, dễ tái sử dụng.
 * - Dùng chung 1 instance (xem `cartService` ở cuối file) để mọi trang
 *   (Shop, Cart, Header badge) cùng nhìn thấy một giỏ hàng duy nhất.
 */
export class CartService extends BaseService {
  constructor() {
    // Giỏ hàng không gọi API nên không cần Model.
    super(null);
    this.listeners = new Set();
    this.items = this.#load();

    // Đồng bộ khi người dùng mở nhiều tab cùng lúc.
    if (typeof window !== "undefined") {
      window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEY || e.key === null) {
          this.items = this.#load();
          this.#notify();
        }
      });
    }
  }

  /* ------------------------------ ĐỌC / GHI ------------------------------ */

  #load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      // Dữ liệu trong localStorage có thể bị sửa tay => lọc & ép kiểu lại.
      return parsed
        .map((it) => ({
          id: Number(it?.id),
          name: String(it?.name ?? ""),
          price: Number(it?.price),
          image: String(it?.image ?? ""),
          quantity: Math.floor(Number(it?.quantity)),
        }))
        .filter(
          (it) =>
            Number.isFinite(it.id) &&
            Number.isFinite(it.price) &&
            it.price >= 0 &&
            it.quantity > 0,
        )
        .map((it) => ({
          ...it,
          quantity: Math.min(it.quantity, MAX_QTY_PER_ITEM),
        }));
    } catch (error) {
      console.error("[CartService Error]: Không đọc được giỏ hàng:", error);
      return [];
    }
  }

  #save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    } catch (error) {
      // Safari chế độ riêng tư / hết dung lượng: giỏ vẫn chạy trong bộ nhớ.
      console.error("[CartService Error]: Không lưu được giỏ hàng:", error);
    }
    this.#notify();
  }

  #notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.getItems());
      } catch (error) {
        console.error("[CartService Error]: Lỗi listener:", error);
      }
    });
  }

  /* ------------------------------ THAO TÁC ------------------------------- */

  /** Đăng ký lắng nghe thay đổi giỏ hàng. Trả về hàm huỷ đăng ký. */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /** Thêm sản phẩm; nếu đã có thì cộng dồn số lượng. */
  addItem(product, quantity = 1) {
    const id = Number(product?.id);
    const price = Number(product?.price);
    const qty = Math.floor(Number(quantity));

    if (!Number.isFinite(id) || !Number.isFinite(price) || price < 0) {
      throw new Error("Sản phẩm không hợp lệ, không thể thêm vào giỏ hàng!");
    }
    if (!Number.isFinite(qty) || qty <= 0) {
      throw new Error("Số lượng phải là số nguyên lớn hơn 0!");
    }

    const existing = this.items.find((it) => it.id === id);

    if (existing) {
      existing.quantity = Math.min(existing.quantity + qty, MAX_QTY_PER_ITEM);
    } else {
      this.items.push({
        id,
        name: String(product.name ?? ""),
        price,
        image: String(product.image ?? ""),
        quantity: Math.min(qty, MAX_QTY_PER_ITEM),
      });
    }

    this.#save();
  }

  /** Đặt lại số lượng. Số lượng <= 0 sẽ xoá sản phẩm khỏi giỏ. */
  updateQuantity(id, quantity) {
    const numId = Number(id);
    const qty = Math.floor(Number(quantity));
    if (!Number.isFinite(qty)) return;

    const item = this.items.find((it) => it.id === numId);
    if (!item) return;

    if (qty <= 0) {
      this.removeItem(numId);
      return;
    }

    item.quantity = Math.min(qty, MAX_QTY_PER_ITEM);
    this.#save();
  }

  removeItem(id) {
    const numId = Number(id);
    this.items = this.items.filter((it) => it.id !== numId);
    this.#save();
  }

  clear() {
    this.items = [];
    this.#save();
  }

  /* ------------------------------- TRUY VẤN ------------------------------ */

  /** Trả về bản sao để bên ngoài không sửa trực tiếp vào state. */
  getItems() {
    return this.items.map((it) => ({ ...it }));
  }

  getTotalQuantity() {
    return this.items.reduce((sum, it) => sum + it.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  }

  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Chuyển giỏ hàng sang đúng định dạng `items` của bảng `orders` trong
   * db.json, để bước Thanh toán sau này chỉ việc POST lên.
   */
  toOrderItems() {
    return this.items.map((it) => ({
      productId: it.id,
      quantity: it.quantity,
      price: it.price,
    }));
  }

  static formatPrice(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
}

export const cartService = new CartService();
