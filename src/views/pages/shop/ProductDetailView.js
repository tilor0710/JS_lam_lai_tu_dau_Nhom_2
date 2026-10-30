import { BaseView } from "../../../base/baseView.js";
import shoppingBagIcon from "lucide-static/icons/shopping-bag.svg";
import arrowLeftIcon from "lucide-static/icons/arrow-left.svg";
import packageIcon from "lucide-static/icons/package.svg";
import shieldCheckIcon from "lucide-static/icons/shield-check.svg";
import { router } from "../../../routers/index.js";

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

        const category = escapeHTML(
            CATEGORY_LABELS[product.category] ??
                product.category ??
                "Chưa phân loại",
        );
        const productDimensions = product.dimensions ?? {};
        const hasDimensions = [
            productDimensions.length,
            productDimensions.width,
            productDimensions.height,
        ].every((value) => Number.isFinite(Number(value)) && Number(value) > 0);
        const dimensions = hasDimensions
            ? `${productDimensions.length} × ${productDimensions.width} × ${productDimensions.height} cm`
            : "Đang cập nhật";
        const stock = Math.max(0, Number(product.stock) || 0);

        return /*html*/ `
      <section class="mx-auto w-full max-w-7xl px-4 py-8">
        <button
          type="button"
          data-role="back-to-shop"
          class="group mb-6 inline-flex items-center gap-2 border-2 border-gray-900 bg-white px-3 py-2 text-[11px] font-['Oswald'] font-bold uppercase tracking-wider text-gray-900 shadow-[2px_2px_0px_0px_#f59e0b] transition hover:bg-gray-900 hover:text-white"
        >
          <img src="${arrowLeftIcon}" class="h-4 w-4 transition group-hover:-translate-x-0.5 group-hover:invert group-hover:brightness-0" alt="" />
          Quay lại cửa hàng
        </button>

        <div class="grid grid-cols-1 items-start gap-6 border-2 border-gray-900 bg-white p-4 shadow-[6px_6px_0px_0px_#f59e0b] sm:p-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:p-6">
          <div class="relative self-start overflow-hidden border-2 border-gray-900 bg-slate-100">
            <img
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}"
              class="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-[1.03]"
            />
            <span class="absolute left-3 top-3 inline-flex items-center gap-1.5 border-2 border-gray-900 bg-[#0f172a] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#f59e0b] shadow-[2px_2px_0px_0px_#f59e0b]">
              <img src="${packageIcon}" class="h-3.5 w-3.5 brightness-0 invert" alt="" />
              Vật tư QuickShip
            </span>
            <div class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-[#0f172a]/90 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white sm:px-4">
              <span class="truncate">${escapeHTML(product.name)}</span>
              <span class="shrink-0 text-[#f59e0b]">QS / ${String(product.id).padStart(3, "0")}</span>
            </div>
          </div>

          <div class="flex min-w-0 flex-col self-start">
            <div class="mb-3 flex flex-wrap items-center gap-2">
              <span class="inline-block w-fit bg-[#0f172a] px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#f59e0b]">
              ${escapeHTML(category)}
              </span>
              <span class="inline-flex items-center gap-1.5 border border-gray-200 bg-gray-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${stock > 0 ? "text-emerald-700" : "text-[#b91c1c]"}">
                <span class="h-1.5 w-1.5 rounded-full ${stock > 0 ? "bg-emerald-500" : "bg-[#b91c1c]"}"></span>
                ${stock > 0 ? "Đang có hàng" : "Tạm hết hàng"}
              </span>
            </div>

            <h1 class="font-['Oswald'] text-3xl font-bold uppercase leading-tight tracking-wide text-gray-900 sm:text-4xl">
              ${escapeHTML(product.name)}
            </h1>

            <div class="mt-4 border-l-4 border-[#b91c1c] bg-red-50/70 py-2 pl-3 text-3xl font-['Oswald'] font-bold tracking-wide text-[#b91c1c] sm:text-4xl">
              ${formatPrice(product.price)}
            </div>

            <div class="mt-4 grid grid-cols-1 gap-3 text-xs text-gray-700 sm:grid-cols-2">
              <div class="border-2 border-gray-200 bg-white p-3 transition hover:border-[#f59e0b]">
                <span class="flex items-center gap-2 font-bold uppercase tracking-wide text-gray-900">
                  <img src="${packageIcon}" class="h-4 w-4" alt="" />
                  Tồn kho
                </span>
                <span class="mt-1 block pl-6 font-mono text-gray-600">${stock} sản phẩm</span>
              </div>
              <div class="border-2 border-gray-200 bg-white p-3 transition hover:border-[#f59e0b]">
                <span class="flex items-center gap-2 font-bold uppercase tracking-wide text-gray-900">
                  <img src="${shieldCheckIcon}" class="h-4 w-4" alt="" />
                  Kích thước
                </span>
                <span class="mt-1 block pl-6 font-mono text-gray-600">${escapeHTML(dimensions)}</span>
              </div>
            </div>

            <div class="mt-5 border-t-2 border-dashed border-gray-200 pt-4">
              <p class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900">
                <span class="h-4 w-1 bg-[#f59e0b]"></span>
                Mô tả sản phẩm
              </p>
              <p class="mt-2 text-sm leading-6 text-gray-600">
                ${escapeHTML(product.description || "Sản phẩm đang được cập nhật mô tả chi tiết.")}
              </p>
            </div>

            <div class="mt-5 flex flex-col items-stretch gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center">
              <div class="flex items-center border-2 border-gray-900 bg-white">
                <button
                  type="button"
                  data-quantity-change="decrease"
                  aria-label="Giảm số lượng"
                  class="h-11 w-11 text-xl font-bold text-gray-900 transition hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  id="product-detail-quantity"
                  type="number"
                  min="1"
                  max="${stock || 1}"
                  value="1"
                  aria-label="Số lượng sản phẩm"
                  class="h-11 w-16 border-0 text-center text-sm font-bold text-gray-900 focus:outline-none"
                />
                <button
                  type="button"
                  data-quantity-change="increase"
                  aria-label="Tăng số lượng"
                  class="h-11 w-11 text-xl font-bold text-gray-900 transition hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                data-role="add-to-cart"
                ${stock === 0 ? "disabled" : ""}
                class="flex-1 w-full border-2 border-[#b91c1c] bg-[#b91c1c] px-5 py-3 font-['Oswald'] text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#0f172a] transition hover:-translate-y-0.5 hover:bg-[#991b1b] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                <span class="inline-flex items-center gap-2">
                  <img src="${shoppingBagIcon}" class="h-4 w-4 brightness-0 invert" alt="" />
                  ${stock > 0 ? "Thêm vào giỏ hàng" : "Tạm hết hàng"}
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
            const maxQuantity = Number(quantityInput.max) || Infinity;
            quantityInput.value = String(
                Math.min(maxQuantity, Math.max(1, nextValue)),
            );
        };

        increaseBtn?.addEventListener("click", () =>
            adjustQuantity("increase"),
        );
        decreaseBtn?.addEventListener("click", () =>
            adjustQuantity("decrease"),
        );
        quantityInput?.addEventListener("change", () => {
            if (!quantityInput) return;
            const maxQuantity = Number(quantityInput.max) || Infinity;
            const quantity = Number(quantityInput.value) || 1;
            quantityInput.value = String(
                Math.min(maxQuantity, Math.max(1, quantity)),
            );
        });

        addBtn?.addEventListener("click", async (event) => {
            event.preventDefault();
            if (!this.onAddToCart || !this.currentProduct) return;

            const maxQuantity = Number(quantityInput?.max) || Infinity;
            const quantity = Math.min(
                maxQuantity,
                Math.max(1, Number(quantityInput?.value) || 1),
            );
            await this.onAddToCart(this.currentProduct, quantity);
        });

        backBtn?.addEventListener("click", (event) => {
            event.preventDefault();
            router.navigate("/shop");
        });
    }
}
