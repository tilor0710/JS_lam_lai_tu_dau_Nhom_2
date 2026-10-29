import { BaseView } from "../../../base/baseView.js";
import { CartService } from "../../../services/CartService.js";
import shoppingCartIcon from "lucide-static/icons/shopping-cart.svg";
import trashIcon from "lucide-static/icons/trash-2.svg";
import minusIcon from "lucide-static/icons/minus.svg";
import plusIcon from "lucide-static/icons/plus.svg";
import arrowLeftIcon from "lucide-static/icons/arrow-left.svg";
import packageIcon from "lucide-static/icons/package.svg";

// Dữ liệu giỏ hàng đến từ localStorage nên PHẢI escape trước khi chèn vào HTML.
const escapeHTML = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export class CartView extends BaseView {
  constructor() {
    super("#app-content");

    // Callback để Controller đăng ký
    this.onUpdateQuantity = null; // (id, quantity) => void
    this.onRemove = null; // (id) => void
    this.onClear = null; // () => void
  }

  getTemplate({
    items = [],
    totalQuantity = 0,
    totalPrice = 0,
    error = "",
  } = {}) {
    return `
      <section class="max-w-7xl mx-auto px-4 py-8">

        <!-- TIÊU ĐỀ TRANG -->
        <div class="border-b-2 border-gray-900 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div class="border-l-4 border-[#b91c1c] pl-4">
            <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Vật tư đóng gói bưu chính</span>
            <h1 class="text-3xl sm:text-4xl font-bold font-['Oswald'] text-gray-900 uppercase tracking-wide mt-0.5">
              GIỎ HÀNG CỦA BẠN
            </h1>
          </div>
          <a href="#/shop" class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-[#b91c1c] transition">
            <img src="${arrowLeftIcon}" class="w-3.5 h-3.5" alt="" />
            Tiếp tục mua sắm
          </a>
        </div>

        ${
          error
            ? `<div role="alert" class="bg-red-50 border-2 border-red-700 p-6 text-center text-sm text-red-800">${escapeHTML(error)}</div>`
            : items.length === 0
              ? this.#getEmptyTemplate()
              : this.#getCartTemplate(items, totalQuantity, totalPrice)
        }

      </section>
    `;
  }

  #getEmptyTemplate() {
    return `
      <div class="bg-white border-2 border-gray-900 shadow-[6px_6px_0px_0px_#b91c1c] rounded-none p-10 sm:p-16 text-center">
        <div class="inline-flex bg-[#0f172a] p-4 text-[#f59e0b] mb-4">
          <img src="${shoppingCartIcon}" class="w-10 h-10 invert brightness-0" alt="" />
        </div>
        <h2 class="font-['Oswald'] text-2xl font-bold text-gray-900 uppercase tracking-wide">
          Giỏ hàng đang trống
        </h2>
        <p class="text-sm text-gray-600 mt-2 max-w-md mx-auto">
          Bạn chưa chọn vật tư đóng gói nào. Hãy ghé cửa hàng để chọn thùng carton, bì thư, băng keo và nhiều hơn nữa.
        </p>
        <a href="#/shop" class="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-['Oswald'] text-xs font-bold uppercase tracking-wider border-b-2 border-[#f59e0b] transition rounded-none">
          <img src="${packageIcon}" class="w-4 h-4 invert brightness-0" alt="" />
          Đến cửa hàng vật tư
        </a>
      </div>
    `;
  }

  #getCartTemplate(items, totalQuantity, totalPrice) {
    return `
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        <!-- DANH SÁCH SẢN PHẨM -->
        <div class="lg:col-span-2 flex flex-col gap-4">
          ${items.map((item) => this.#getItemTemplate(item)).join("")}

          <div class="flex justify-end">
            <button
              type="button"
              data-action="clear"
              class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#b91c1c] transition cursor-pointer"
            >
              <img src="${trashIcon}" class="w-3.5 h-3.5" alt="" />
              Xóa toàn bộ giỏ hàng
            </button>
          </div>
        </div>

        <!-- TÓM TẮT ĐƠN HÀNG -->
        <aside class="bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#f59e0b] rounded-none p-5 lg:sticky lg:top-24">
          <h2 class="font-['Oswald'] text-lg font-bold text-gray-900 uppercase tracking-wide border-b-2 border-gray-900 pb-3">
            Tóm tắt đơn hàng
          </h2>

          <dl class="mt-4 flex flex-col gap-3 text-sm">
            <div class="flex justify-between">
              <dt class="text-gray-600">Số loại sản phẩm</dt>
              <dd class="font-mono font-bold text-gray-900">${items.length}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-gray-600">Tổng số lượng</dt>
              <dd class="font-mono font-bold text-gray-900" data-role="total-quantity">${totalQuantity}</dd>
            </div>
            <div class="flex justify-between items-baseline border-t-2 border-gray-100 pt-3">
              <dt class="text-[11px] uppercase tracking-wide text-gray-500">Tạm tính</dt>
              <dd class="text-2xl font-['Oswald'] font-bold text-[#b91c1c] tracking-wide" data-role="total-price">
                ${CartService.formatPrice(totalPrice)}
              </dd>
            </div>
          </dl>

          <p class="text-[11px] text-gray-500 mt-3">
            Phí vận chuyển (nếu có) sẽ được tính ở bước thanh toán.
          </p>
        </aside>

      </div>
    `;
  }

  #getItemTemplate(item) {
    const name = escapeHTML(item.name);
    const lineTotal = CartService.formatPrice(item.price * item.quantity);

    return `
      <article
        data-item-id="${item.id}"
        class="bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#0f172a] rounded-none p-3 sm:p-4 flex gap-3 sm:gap-4"
      >
        <!-- Ảnh -->
        <div class="w-20 h-20 sm:w-28 sm:h-28 shrink-0 bg-gray-100 border-2 border-gray-900 overflow-hidden">
          <img src="${escapeHTML(item.image)}" alt="${name}" class="w-full h-full object-cover" />
        </div>

        <!-- Thông tin -->
        <div class="flex-1 min-w-0 flex flex-col justify-between gap-3">
          <div class="flex justify-between items-start gap-3">
            <div class="min-w-0">
              <h3 class="font-['Oswald'] font-bold text-sm sm:text-base text-gray-900 uppercase tracking-wide line-clamp-2">
                ${name}
              </h3>
              <p class="text-xs font-mono text-gray-500 mt-1">
                Đơn giá: ${CartService.formatPrice(item.price)}
              </p>
            </div>

            <button
              type="button"
              data-action="remove"
              data-id="${item.id}"
              aria-label="Xóa ${name} khỏi giỏ hàng"
              class="shrink-0 p-1.5 border-2 border-gray-300 hover:border-[#b91c1c] hover:bg-red-50 transition cursor-pointer rounded-none"
            >
              <img src="${trashIcon}" class="w-4 h-4" alt="" />
            </button>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3">
            <!-- Bộ chỉnh số lượng -->
            <div class="inline-flex items-stretch border-2 border-gray-900 rounded-none">
              <button
                type="button"
                data-action="decrease"
                data-id="${item.id}"
                aria-label="Giảm số lượng"
                class="px-2.5 bg-white hover:bg-gray-900 hover:text-white transition cursor-pointer flex items-center"
              >
                <img src="${minusIcon}" class="w-3.5 h-3.5" alt="" />
              </button>
              <input
                type="number"
                min="1"
                max="99"
                value="${item.quantity}"
                data-action="quantity"
                data-id="${item.id}"
                aria-label="Số lượng"
                class="w-12 text-center font-mono font-bold text-sm border-x-2 border-gray-900 py-1.5 focus:outline-none focus:bg-amber-50 rounded-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                type="button"
                data-action="increase"
                data-id="${item.id}"
                aria-label="Tăng số lượng"
                class="px-2.5 bg-white hover:bg-gray-900 hover:text-white transition cursor-pointer flex items-center"
              >
                <img src="${plusIcon}" class="w-3.5 h-3.5" alt="" />
              </button>
            </div>

            <!-- Thành tiền -->
            <span class="font-['Oswald'] text-lg sm:text-xl font-bold text-[#b91c1c] tracking-wide">
              ${lineTotal}
            </span>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Gắn sự kiện trực tiếp lên các phần tử vừa render. Không dùng container
   * (#app-content) vì nó được dùng chung cho mọi trang: listener gắn ở đó
   * sẽ tồn tại mãi và bị nhân đôi mỗi lần vào lại trang Giỏ hàng.
   */
  run() {
    const root = this.container;
    if (!root) return;

    root.querySelectorAll('[data-action="increase"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const input = root.querySelector(
          `input[data-action="quantity"][data-id="${id}"]`,
        );
        const current = Number(input?.value) || 1;
        this.onUpdateQuantity?.(id, current + 1);
      });
    });

    root.querySelectorAll('[data-action="decrease"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const input = root.querySelector(
          `input[data-action="quantity"][data-id="${id}"]`,
        );
        const current = Number(input?.value) || 1;
        // Về 0 nghĩa là xóa; để tránh xóa nhầm, giảm tối thiểu còn 1.
        this.onUpdateQuantity?.(id, Math.max(1, current - 1));
      });
    });

    root.querySelectorAll('input[data-action="quantity"]').forEach((input) => {
      input.addEventListener("change", () => {
        // Ô trống / chữ / 0 / số âm => về 1 (xóa sản phẩm đã có nút thùng rác).
        const parsed = Math.floor(Number(input.value));
        const safe = Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
        this.onUpdateQuantity?.(input.dataset.id, safe);
      });
    });

    root.querySelectorAll('[data-action="remove"]').forEach((btn) => {
      btn.addEventListener("click", () => this.onRemove?.(btn.dataset.id));
    });

    root
      .querySelector('[data-action="clear"]')
      ?.addEventListener("click", () => {
        if (window.confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
          this.onClear?.();
        }
      });
  }
}
