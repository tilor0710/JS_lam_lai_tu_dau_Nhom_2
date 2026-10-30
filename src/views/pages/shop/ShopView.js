import { BaseView } from "../../../base/baseView.js";
import shoppingBagIcon from "lucide-static/icons/shopping-bag.svg";
import packageIcon from "lucide-static/icons/package.svg";
import filterIcon from "lucide-static/icons/filter.svg";
import searchIcon from "lucide-static/icons/search.svg";
import {
    ADMIN_PAGE_SIZE,
    getPageItems,
    getPaginationTemplate,
} from "../admin/AdminPagination.js";

const CATEGORY_LABELS = {
    BOXES: "HỘP CARTON",
    ENVELOPES: "BÌ THƯ",
    PROTECTION: "CHỐNG SỐC",
    TAPES: "BĂNG KEO",
    BAGS: "TÚI ĐÓNG GÓI",
};

const normalizeText = (value = "") =>
    String(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

const escapeHTML = (value) =>
    String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

export class ShopView extends BaseView {
    constructor() {
        super("#app-content");
        this.onAddToCart = null;
        this.onProductSelect = null;
        this.onFilterChange = null;
        this.allProducts = [];
        this.searchTerm = "";
        this.selectedCategory = "Tất cả";
        this.sortBy = "none";
        this.currentPage = 1;
        this.debounceTimer = null;
    }

    getCategories(products = []) {
        return [
            ...new Set(
                (Array.isArray(products) ? products : [])
                    .map((product) => product.category)
                    .filter(Boolean),
            ),
        ].sort((a, b) => a.localeCompare(b));
    }

    getVisibleProducts() {
        const normalizedQuery = normalizeText(this.searchTerm);

        let filteredProducts = this.allProducts.filter((product) => {
            const matchesCategory =
                this.selectedCategory === "Tất cả" ||
                product.category === this.selectedCategory;
            const matchesSearch =
                !normalizedQuery ||
                normalizeText(product.name).includes(normalizedQuery);

            return matchesCategory && matchesSearch;
        });

        if (this.sortBy === "asc") {
            filteredProducts = [...filteredProducts].sort(
                (a, b) => Number(a.price) - Number(b.price),
            );
        }

        if (this.sortBy === "desc") {
            filteredProducts = [...filteredProducts].sort(
                (a, b) => Number(b.price) - Number(a.price),
            );
        }

        return filteredProducts;
    }

    getTemplate({
        products = [],
        error = "",
        loading = false,
        categories = [],
        selectedCategory = "Tất cả",
        searchValue = "",
        sortBy = "none",
    } = {}) {
        const categoryList = categories.length
            ? categories
            : this.getCategories(products);
        const visibleProducts = Array.isArray(products) ? products : [];
        const totalPages = Math.ceil(visibleProducts.length / ADMIN_PAGE_SIZE);
        this.currentPage = Math.min(
            this.currentPage,
            Math.max(totalPages, 1),
        );
        const pageProducts = getPageItems(
            visibleProducts,
            this.currentPage,
            ADMIN_PAGE_SIZE,
        );

        return /*html*/ `
      <section class="mx-auto w-full max-w-7xl px-4 py-8">
        <div class="mb-8 flex flex-col gap-5 border-b-2 border-gray-900 pb-6 xl:flex-row xl:items-start xl:justify-between">
          <div class="border-l-4 border-[#b91c1c] pl-4">
            <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Vật tư đóng gói bưu chính</span>
            <h1 class="text-3xl sm:text-4xl font-bold font-['Oswald'] text-gray-900 uppercase tracking-wide mt-0.5">
              CỬA HÀNG VẬT TƯ QUICKSHIP
            </h1>
            <p class="text-gray-600 text-xs sm:text-sm mt-1">
              Quy chuẩn đóng gói đồng bộ, bảo vệ kiện hàng an toàn tuyệt đối trên mọi hành trình.
            </p>
          </div>

          <div class="flex w-full flex-col gap-3 border-2 border-gray-900 bg-white p-3 shadow-[4px_4px_0px_0px_#f59e0b] sm:p-4 xl:max-w-2xl">
            <label for="shop-search" class="text-[11px] font-bold uppercase tracking-wider text-gray-700">
              Tìm kiếm sản phẩm
            </label>
            <div class="flex items-center gap-2 border-2 border-gray-300 px-3 py-2 focus-within:border-gray-900">
              <img src="${searchIcon}" class="h-4 w-4 shrink-0" alt="" />
              <input
                id="shop-search"
                type="search"
                value="${escapeHTML(searchValue)}"
                placeholder="Nhập tên sản phẩm..."
                class="w-full min-w-0 border-0 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
            </div>

            <div class="grid grid-cols-1 gap-3 sm:grid-cols-[10rem_minmax(0,1fr)]">
              <div class="flex flex-col gap-1.5">
                <label for="shop-sort" class="text-[11px] font-bold uppercase tracking-wider text-gray-700">
                  Sắp xếp theo giá
                </label>
              <select
                id="shop-sort"
                class="w-full border-2 border-gray-900 bg-white px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-900 focus:outline-none"
              >
                <option value="none" ${sortBy === "none" ? "selected" : ""}>Mặc định</option>
                <option value="asc" ${sortBy === "asc" ? "selected" : ""}>Giá tăng dần</option>
                <option value="desc" ${sortBy === "desc" ? "selected" : ""}>Giá giảm dần</option>
              </select>
              </div>

              <div class="flex min-w-0 flex-col gap-1.5">
                <span class="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-700">
                  <img src="${filterIcon}" class="h-3.5 w-3.5" alt="" />
                  Danh mục
                </span>
                <div class="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  aria-pressed="${selectedCategory === "Tất cả"}"
                  class="shop-category-btn ${selectedCategory === "Tất cả" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 bg-white text-gray-700 hover:border-gray-900"} border-2 px-2.5 py-1.5 text-[10px] font-['Oswald'] font-bold uppercase tracking-wider transition sm:px-3 sm:text-[11px]"
                  data-shop-category="Tất cả"
                >
                  Tất cả
                </button>
                ${categoryList
                    .map((category) => {
                        const label = CATEGORY_LABELS[category] ?? category;
                        const isActive = selectedCategory === category;
                        return /*html*/ `
                      <button
                        type="button"
                        aria-pressed="${isActive}"
                        class="shop-category-btn ${isActive ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 bg-white text-gray-700 hover:border-gray-900"} border-2 px-2.5 py-1.5 text-[10px] font-['Oswald'] font-bold uppercase tracking-wider transition sm:px-3 sm:text-[11px]"
                        data-shop-category="${escapeHTML(category)}"
                      >
                        ${escapeHTML(label)}
                      </button>
                    `;
                    })
                    .join("")}
                </div>
              </div>
            </div>

            <p class="border-t border-gray-200 pt-2 text-xs font-mono text-gray-600" aria-live="polite">
              ${visibleProducts.length} sản phẩm phù hợp
            </p>
          </div>
        </div>

        <!-- Danh sách sản phẩm -->
        <div id="shop-product-grid" class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          ${
              loading
                  ? /*html*/ `<p class="sm:col-span-2 lg:col-span-3 text-center text-sm text-gray-700">Đang tải sản phẩm...</p>`
                  : error
                    ? /*html*/ `<p role="alert" class="sm:col-span-2 lg:col-span-3 text-center text-sm text-red-700">${escapeHTML(error)}</p>`
                    : pageProducts.length
                      ? pageProducts
                            .map((product) => this.#getProductTemplate(product))
                            .join("")
                      : /*html*/ `<p class="sm:col-span-2 lg:col-span-3 text-center text-sm text-gray-700">Không tìm thấy sản phẩm.</p>`
          }
        </div>

        ${getPaginationTemplate(visibleProducts.length, this.currentPage, {
            containerId: "shop-pagination",
            ariaLabel: "Phân trang sản phẩm",
        })}

        <div class="mt-12 p-6 bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#f59e0b] rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="bg-[#b91c1c] p-2 text-white shrink-0">
              <img src="${packageIcon}" class="w-6 h-6 invert brightness-0" alt="" />
            </div>
            <div>
              <h4 class="font-['Oswald'] font-bold text-base text-gray-900 uppercase">
                Cam kết vật tư chính hãng QuickShip
              </h4>
              <p class="text-xs text-gray-600">
                Được kiểm định độ bền bỉ, chịu lực đạt chuẩn vận chuyển nội địa và đường hàng không quốc tế.
              </p>
            </div>
          </div>
          <span class="text-xs font-mono font-bold text-gray-500 uppercase shrink-0">
            ISO 9001:2015 CERTIFIED
          </span>
        </div>
      </section>
    `;
    }

    #getProductTemplate(product) {
        const name = escapeHTML(product.name);
        const image = escapeHTML(product.image);
        const category = escapeHTML(
            CATEGORY_LABELS[product.category] ?? product.category ?? "",
        );
        const dimensions = product.dimensions
            ? `${product.dimensions.length} × ${product.dimensions.width} × ${product.dimensions.height} cm`
            : "";
        const formattedPrice = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(product.price);

        return /*html*/ `
      <article
        tabindex="0"
        aria-label="Xem chi tiết ${name}"
        data-product-detail="${product.id}"
        class="cursor-pointer rounded-none border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_#0f172a] transition-all hover:border-[#b91c1c] hover:shadow-[6px_6px_0px_0px_#b91c1c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b91c1c] group"
      >
        <div>
          <div class="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden border-2 border-gray-900">
            <img
              src="${image}"
              alt="${name}"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span class="absolute top-2 left-2 bg-[#0f172a] text-[#f59e0b] text-[10px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
              ${category}
            </span>
          </div>

          <h3 class="font-['Oswald'] font-bold text-base text-gray-900 uppercase tracking-wide group-hover:text-[#b91c1c] transition mt-3 line-clamp-2">
            ${name}
          </h3>
          <p class="text-xs font-mono text-gray-500 mt-1">
            Quy cách: ${escapeHTML(dimensions)}
          </p>
        </div>

        <div class="mt-4 pt-3 border-t-2 border-gray-100 flex flex-col gap-2.5">
          <div class="flex justify-between items-baseline">
            <span class="text-[11px] uppercase tracking-wide text-gray-500">Đơn giá:</span>
            <span class="text-2xl font-['Oswald'] font-bold text-[#b91c1c] tracking-wide">
              ${formattedPrice}
            </span>
          </div>

          <button
            type="button"
            data-product-id="${product.id}"
            data-product-name="${escapeHTML(product.name)}"
            data-product-price="${product.price}"
            data-product-image="${escapeHTML(product.image)}"
            class="btn-add-to-cart w-full bg-gray-900 hover:bg-[#b91c1c] text-white font-['Oswald'] font-bold text-xs uppercase tracking-wider py-2.5 px-4 flex items-center justify-center gap-2 transition cursor-pointer border-2 border-gray-900 shadow-[2px_2px_0px_0px_#f59e0b] active:translate-x-0.5 active:translate-y-0.5 rounded-none"
          >
            <img src="${shoppingBagIcon}" class="w-4 h-4 invert brightness-0" alt="" />
            <span>Thêm vào giỏ hàng</span>
          </button>

        </div>
      </article>
    `;
    }

    run() {
        const searchInput = document.querySelector("#shop-search");
        const sortSelect = document.querySelector("#shop-sort");
        const categoryButtons = document.querySelectorAll(".shop-category-btn");
        const addButtons = document.querySelectorAll(".btn-add-to-cart");
        const productGrid = document.querySelector("#shop-product-grid");
        const pagination = document.querySelector("#shop-pagination");

        const applyFilters = () => {
            this.currentPage = 1;
            this.onFilterChange?.({
                searchTerm: this.searchTerm,
                selectedCategory: this.selectedCategory,
                sortBy: this.sortBy,
            });
        };

        searchInput?.addEventListener("input", (event) => {
            this.searchTerm = event.target.value.trim();
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                const selectionStart = event.target.selectionStart;
                applyFilters();
                const updatedInput = document.querySelector("#shop-search");
                updatedInput?.focus();
                updatedInput?.setSelectionRange(selectionStart, selectionStart);
            }, 300);
        });

        sortSelect?.addEventListener("change", (event) => {
            this.sortBy = event.target.value;
            applyFilters();
        });

        categoryButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const category = button.dataset.shopCategory;
                this.selectedCategory = category || "Tất cả";
                applyFilters();
            });
        });

        addButtons.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const targetBtn = e.currentTarget;
                const productData = {
                    id: Number(targetBtn.dataset.productId),
                    name: targetBtn.dataset.productName,
                    price: Number(targetBtn.dataset.productPrice),
                    image: targetBtn.dataset.productImage,
                };

                const originalText = targetBtn.innerHTML;
                targetBtn.disabled = true;

                try {
                    if (!this.onAddToCart) {
                        throw new Error(
                            "Chưa đăng ký xử lý thêm sản phẩm vào giỏ hàng.",
                        );
                    }

                    await this.onAddToCart(productData);
                    targetBtn.innerHTML = /*html*/ `<span>✓ Đã thêm vào giỏ</span>`;
                } catch (error) {
                    console.error(
                        "[ShopView Error]: Không lưu được giỏ hàng:",
                        error,
                    );
                    targetBtn.innerHTML = /*html*/ `<span>Không thể thêm, thử lại</span>`;
                } finally {
                    targetBtn.classList.replace("bg-gray-900", "bg-[#b91c1c]");
                    setTimeout(() => {
                        targetBtn.innerHTML = originalText;
                        targetBtn.classList.replace(
                            "bg-[#b91c1c]",
                            "bg-gray-900",
                        );
                        targetBtn.disabled = false;
                    }, 1200);
                }
            });
        });

        const openProduct = (productCard) => {
            if (productCard && this.onProductSelect) {
                this.onProductSelect(productCard.dataset.productDetail);
            }
        };

        productGrid?.addEventListener("click", (event) => {
            if (event.target.closest(".btn-add-to-cart")) return;
            openProduct(event.target.closest("[data-product-detail]"));
        });

        productGrid?.addEventListener("keydown", (event) => {
            if (
                (event.key === "Enter" || event.key === " ") &&
                event.target.matches("[data-product-detail]")
            ) {
                event.preventDefault();
                openProduct(event.target);
            }
        });

        pagination?.addEventListener("click", (event) => {
            const button = event.target.closest("button[data-page]");
            const page = Number(button?.dataset.page);
            if (button && !button.disabled && page !== this.currentPage) {
                this.currentPage = page;
                this.onFilterChange?.({
                    searchTerm: this.searchTerm,
                    selectedCategory: this.selectedCategory,
                    sortBy: this.sortBy,
                    page,
                });
            }
        });
    }
}
