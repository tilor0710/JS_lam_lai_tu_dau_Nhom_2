import { BaseView } from "../../../base/baseView.js";
import shoppingBagIcon from "lucide-static/icons/shopping-bag.svg";
import arrowLeftIcon from "lucide-static/icons/arrow-left.svg";

const CATEGORY_LABELS = {
    BOXES: "HỘP CARTON",
    ENVELOPES: "BÌ THƯ",
    PROTECTION: "CHỐNG SỐC",
    TAPES: "BĂNG KEO",
    BAGS: "TÚI ĐÓNG GÓI",
};

const escapeHTML = (value) =>
    String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(Number(price) || 0);

export class ProductDetailView extends BaseView {
    constructor() {
        super("#app-content");
        this.onAddToCart = null;
        this.currentProduct = null;
    }

    getTemplate({ product = null, loading = false, error = "" } = {}) {
        if (loading) {
            return /*html*/ `
        <section class="max-w-4xl mx-auto px-4 py-16">
          <div class="border-2 border-gray-900 bg-white p-8 text-center text-sm text-gray-700">
            Đang tải thông tin sản phẩm...
          </div>
        </section>
      `;
        }

        if (error) {
            return /*html*/ `
        <section class="max-w-4xl mx-auto px-4 py-16">
          <div class="border-2 border-[#b91c1c] bg-red-50 p-8 text-center text-sm text-[#b91c1c] font-bold uppercase tracking-wide">
            ${escapeHTML(error)}
          </div>
        </section>
      `;
        }

        if (!product) {
            return "";
        }

        const category =
            CATEGORY_LABELS[product.category] ??
            product.category ??
            "Chưa phân loại";
        const dimensions = product.dimensions
            ? `${product.dimensions.length} × ${product.dimensions.width} × ${product.dimensions.height} cm`
            : "Chưa cập nhật";

        return /*html*/ `
      <section class="max-w-6xl mx-auto px-4 py-8">
        <button
          type="button"
          data-role="back-to-shop"
          class="mb-6 inline-flex items-center gap-2 border-2 border-gray-900 bg-white px-3 py-2 text-[11px] font-['Oswald'] font-bold uppercase tracking-wider text-gray-900 hover:bg-gray-900 hover:text-white transition"
        >
          <img src="${arrowLeftIcon}" class="w-4 h-4" alt="" />
          Quay lại cửa hàng
        </button>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white border-2 border-gray-900 p-5 md:p-6 shadow-[6px_6px_0px_0px_#f59e0b] rounded-none">
          <div class="overflow-hidden border-2 border-gray-900 bg-gray-100">
            <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" class="w-full h-full object-cover aspect-[4/3]" />
          </div>

          <div class="flex flex-col">
            <span class="inline-block w-fit bg-[#0f172a] text-[#f59e0b] text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 mb-3">
              ${escapeHTML(category)}
            </span>

            <h1 class="font-['Oswald'] text-3xl md:text-4xl font-bold uppercase tracking-wide text-gray-900">
              ${escapeHTML(product.name)}
            </h1>

            <div class="mt-4 text-3xl font-['Oswald'] font-bold text-[#b91c1c] tracking-wide">
              ${formatPrice(product.price)}
            </div>

            <div class="mt-4 grid grid-cols-2 gap-3 text-xs text-gray-700">
              <div class="border-2 border-gray-200 p-2">
                <span class="block font-bold uppercase tracking-wide text-gray-900">Tồn kho</span>
                <span class="mt-1 block">${Number(product.stock ?? 0)} sản phẩm</span>
              </div>
              <div class="border-2 border-gray-200 p-2">
                <span class="block font-bold uppercase tracking-wide text-gray-900">Kích thước</span>
                <span class="mt-1 block">${escapeHTML(dimensions)}</span>
              </div>
            </div>

            <div class="mt-5">
              <p class="text-xs font-bold uppercase tracking-wider text-gray-900">Mô tả sản phẩm</p>
              <p class="mt-2 text-sm leading-6 text-gray-700">
                ${escapeHTML(product.description || "Sản phẩm đang được cập nhật mô tả chi tiết.")}
              </p>
            </div>

            <div class="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <div class="flex items-center border-2 border-gray-900 bg-white">
                <button
                  type="button"
                  data-quantity-change="decrease"
                  class="w-11 h-11 text-xl font-bold text-gray-900 hover:bg-gray-100 transition"
                >
                  −
                </button>
                <input
                  id="product-detail-quantity"
                  type="number"
                  min="1"
                  value="1"
                  class="w-16 h-11 border-0 text-center text-sm font-bold text-gray-900 focus:outline-none"
                />
                <button
                  type="button"
                  data-quantity-change="increase"
                  class="w-11 h-11 text-xl font-bold text-gray-900 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                data-role="add-to-cart"
                class="flex-1 w-full sm:w-auto bg-[#b91c1c] hover:bg-[#7f1d1d] text-white font-['Oswald'] font-bold text-xs uppercase tracking-wider py-3 px-5 border-2 border-[#b91c1c] shadow-[3px_3px_0px_0px_#0f172a] transition"
              >
                <span class="inline-flex items-center gap-2">
                  <img src="${shoppingBagIcon}" class="w-4 h-4 invert brightness-0" alt="" />
                  Thêm vào giỏ hàng
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
    }

    run() {
        const quantityInput = document.querySelector(
            "#product-detail-quantity",
        );
        const increaseBtn = document.querySelector(
            '[data-quantity-change="increase"]',
        );
        const decreaseBtn = document.querySelector(
            '[data-quantity-change="decrease"]',
        );
        const addBtn = document.querySelector('[data-role="add-to-cart"]');
        const backBtn = document.querySelector('[data-role="back-to-shop"]');

        const adjustQuantity = (direction) => {
            if (!quantityInput) return;
            const currentValue = Number(quantityInput.value) || 1;
            const nextValue =
                direction === "increase" ? currentValue + 1 : currentValue - 1;
            quantityInput.value = String(Math.max(1, nextValue));
        };

        increaseBtn?.addEventListener("click", () =>
            adjustQuantity("increase"),
        );
        decreaseBtn?.addEventListener("click", () =>
            adjustQuantity("decrease"),
        );

        addBtn?.addEventListener("click", async () => {
            if (!this.onAddToCart || !this.currentProduct) return;

            const quantity = Number(quantityInput?.value) || 1;
            await this.onAddToCart(this.currentProduct, quantity);
        });

        backBtn?.addEventListener("click", () => {
            window.location.hash = "#/shop";
        });
    }
}
