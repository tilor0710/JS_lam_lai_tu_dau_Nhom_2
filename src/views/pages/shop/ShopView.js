import { BaseView } from "../../../base/baseView.js";
import shoppingBagIcon from "lucide-static/icons/shopping-bag.svg";
import packageIcon from "lucide-static/icons/package.svg";
import filterIcon from "lucide-static/icons/filter.svg";

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

export class ShopView extends BaseView {
  constructor() {
    super("#app-content");
    this.onAddToCart = null; // Cung cấp callback cho bạn cùng team gắn giỏ hàng
  }

  getTemplate({ products = [], error = "" } = {}) {
    return `
      <section class="max-w-7xl mx-auto px-4 py-8">
        
        <!-- HEADER TRANG CỬA HÀNG -->
        <div class="border-b-2 border-gray-900 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div class="border-l-4 border-[#b91c1c] pl-4">
            <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Vật tư đóng gói bưu chính</span>
            <h1 class="text-3xl sm:text-4xl font-bold font-['Oswald'] text-gray-900 uppercase tracking-wide mt-0.5">
              CỬA HÀNG VẬT TƯ QUICKSHIP
            </h1>
            <p class="text-gray-600 text-xs sm:text-sm mt-1">
              Quy chuẩn đóng gói đồng bộ, bảo vệ kiện hàng an toàn tuyệt đối trên mọi hành trình.
            </p>
          </div>

          <!-- THANH LỌC DANH MỤC GÓC CẠNH -->
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="bg-gray-900 text-white text-[11px] font-['Oswald'] font-bold px-3 py-1.5 uppercase tracking-wider flex items-center gap-1 rounded-none">
              <img src="${filterIcon}" class="w-3.5 h-3.5 invert brightness-0" alt="" />
              Tất cả
            </span>
            <span class="bg-white border-2 border-gray-300 text-gray-700 text-[11px] font-['Oswald'] font-bold px-3 py-1.5 uppercase tracking-wider rounded-none hover:border-gray-900 cursor-pointer transition">
              Hộp Carton
            </span>
            <span class="bg-white border-2 border-gray-300 text-gray-700 text-[11px] font-['Oswald'] font-bold px-3 py-1.5 uppercase tracking-wider rounded-none hover:border-gray-900 cursor-pointer transition">
              Chống Sốc
            </span>
            <span class="bg-white border-2 border-gray-300 text-gray-700 text-[11px] font-['Oswald'] font-bold px-3 py-1.5 uppercase tracking-wider rounded-none hover:border-gray-900 cursor-pointer transition">
              Băng Keo & Túi
            </span>
          </div>
        </div>

        <!-- LƯỚI SẢN PHẨM VUÔNG VỨC CÔNG NGHIỆP (3 - 4 CỘT) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          ${
            error
              ? `<p role="alert" class="sm:col-span-2 lg:col-span-3 text-center text-sm text-red-700">${escapeHTML(error)}</p>`
              : products.length
                ? products.map((product) => this.#getProductTemplate(product)).join("")
                : `<p class="sm:col-span-2 lg:col-span-3 text-center text-sm text-gray-600">Chưa có sản phẩm nào.</p>`
          }
        </div>

        <!-- THÔNG BÁO TIÊU CHUẨN GÓC CẠNH PHÍA DƯỚI -->
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

    return `
            <div class="bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[6px_6px_0px_0px_#b91c1c] hover:border-[#b91c1c] transition-all rounded-none flex flex-col justify-between p-4 group">
              
              <div>
                <!-- Khung ảnh sắc nét góc vuông -->
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

                <!-- Tên sản phẩm & Quy cách -->
                <h3 class="font-['Oswald'] font-bold text-base text-gray-900 uppercase tracking-wide group-hover:text-[#b91c1c] transition mt-3 line-clamp-2">
                  ${name}
                </h3>
                <p class="text-xs font-mono text-gray-500 mt-1">
                  Quy cách: ${escapeHTML(dimensions)}
                </p>
              </div>

              <!-- Giá tiền & Nút Thêm vào giỏ -->
              <div class="mt-4 pt-3 border-t-2 border-gray-100 flex flex-col gap-2.5">
                <div class="flex justify-between items-baseline">
                  <span class="text-[11px] uppercase tracking-wide text-gray-500">Đơn giá:</span>
                  <span class="text-2xl font-['Oswald'] font-bold text-[#b91c1c] tracking-wide">
                    ${formattedPrice}
                  </span>
                </div>

                <!-- NÚT BẤM CÓ SẴN DATA ATTRIBUTES CHO TEAM GIỎ HÀNG BẮT SỰ KIỆN -->
                <button 
                  type="button"
                  data-product-id="${product.id}"
                  data-product-name="${name}"
                  data-product-price="${product.price}"
                  data-product-image="${image}"
                  class="btn-add-to-cart w-full bg-gray-900 hover:bg-[#b91c1c] text-white font-['Oswald'] font-bold text-xs uppercase tracking-wider py-2.5 px-4 flex items-center justify-center gap-2 transition cursor-pointer border-2 border-gray-900 shadow-[2px_2px_0px_0px_#f59e0b] active:translate-x-0.5 active:translate-y-0.5 rounded-none"
                >
                  <img src="${shoppingBagIcon}" class="w-4 h-4 invert brightness-0" alt="" />
                  <span>Thêm vào giỏ hàng</span>
                </button>
              </div>

            </div>
    `;
  }

  run() {
    const addButtons = document.querySelectorAll(".btn-add-to-cart");

    addButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const targetBtn = e.currentTarget;
        const productData = {
          id: targetBtn.dataset.productId,
          name: targetBtn.dataset.productName,
          price: Number(targetBtn.dataset.productPrice),
          image: targetBtn.dataset.productImage,
        };

        // Hiệu ứng phản hồi nhanh khi click
        const originalText = targetBtn.innerHTML;
        targetBtn.innerHTML = `<span>✓ Đã thêm vào giỏ</span>`;
        targetBtn.classList.replace("bg-gray-900", "bg-[#b91c1c]");

        setTimeout(() => {
          targetBtn.innerHTML = originalText;
          targetBtn.classList.replace("bg-[#b91c1c]", "bg-gray-900");
        }, 1200);

        // Bắn callback ra ngoài nếu controller có đăng ký
        if (this.onAddToCart) {
          this.onAddToCart(productData);
        }
      });
    });
  }
}
