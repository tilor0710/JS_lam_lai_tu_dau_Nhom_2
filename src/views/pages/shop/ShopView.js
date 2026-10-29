import { BaseView } from "../../../base/baseView.js";
import shoppingBagIcon from "lucide-static/icons/shopping-bag.svg";
import plusIcon from "lucide-static/icons/plus.svg";
import packageIcon from "lucide-static/icons/package.svg";
import filterIcon from "lucide-static/icons/filter.svg";

// Dữ liệu sản phẩm mẫu (bám sát db.json) phục vụ cho team làm Giỏ hàng test
const DEMO_PRODUCTS = [
  {
    id: 1,
    name: "Thùng Carton Tiêu Chuẩn Size S (30x20x10 cm)",
    category: "HỘP CARTON",
    price: 15000,
    formattedPrice: "15.000 ₫",
    image:
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&auto=format&fit=crop",
    dimensions: "30 × 20 × 10 cm",
  },
  {
    id: 2,
    name: "Thùng Carton Chịu Lực Size L (45x35x20 cm)",
    category: "HỘP CARTON",
    price: 35000,
    formattedPrice: "35.000 ₫",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop",
    dimensions: "45 × 35 × 20 cm",
  },
  {
    id: 3,
    name: "Bì Thư Chống Sốc Poly Bubble Mailer (25x18 cm)",
    category: "BÌ THƯ KHÍ",
    price: 12000,
    formattedPrice: "12.000 ₫",
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320b5ab8?w=500&auto=format&fit=crop",
    dimensions: "25 × 18 × 2 cm",
  },
  {
    id: 4,
    name: "Cuộn Màng Xốp Hơi Chống Va Đập (0.5m x 50m)",
    category: "BỌC CHỐNG SỐC",
    price: 95000,
    formattedPrice: "95.000 ₫",
    image:
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&auto=format&fit=crop",
    dimensions: "Dài 50m • Rộng 0.5m",
  },
  {
    id: 5,
    name: "Băng Keo Niêm Phong Chuyên Dụng (Hàng Dễ Vỡ)",
    category: "BĂNG KEO",
    price: 28000,
    formattedPrice: "28.000 ₫",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop",
    dimensions: "Rộng 4.8cm • 100 Yards",
  },
  {
    id: 6,
    name: "Túi Niêm Phong Đóng Gói PE Chống Nước (28x42 cm)",
    category: "TÚI PE",
    price: 45000,
    formattedPrice: "45.000 ₫",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop",
    dimensions: "28 × 42 cm • Set 50 túi",
  },
];

export class ShopView extends BaseView {
  constructor() {
    super("#app-content");
    this.onAddToCart = null; // Cung cấp callback cho bạn cùng team gắn giỏ hàng
  }

  getTemplate() {
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
          ${DEMO_PRODUCTS.map(
            (prod) => `
            <div class="bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[6px_6px_0px_0px_#b91c1c] hover:border-[#b91c1c] transition-all rounded-none flex flex-col justify-between p-4 group">
              
              <div>
                <!-- Khung ảnh sắc nét góc vuông -->
                <div class="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden border-2 border-gray-900">
                  <img 
                    src="${prod.image}" 
                    alt="${prod.name}" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span class="absolute top-2 left-2 bg-[#0f172a] text-[#f59e0b] text-[10px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                    ${prod.category}
                  </span>
                </div>

                <!-- Tên sản phẩm & Quy cách -->
                <h3 class="font-['Oswald'] font-bold text-base text-gray-900 uppercase tracking-wide group-hover:text-[#b91c1c] transition mt-3 line-clamp-2">
                  ${prod.name}
                </h3>
                <p class="text-xs font-mono text-gray-500 mt-1">
                  Quy cách: ${prod.dimensions}
                </p>
              </div>

              <!-- Giá tiền & Nút Thêm vào giỏ -->
              <div class="mt-4 pt-3 border-t-2 border-gray-100 flex flex-col gap-2.5">
                <div class="flex justify-between items-baseline">
                  <span class="text-[11px] uppercase tracking-wide text-gray-500">Đơn giá:</span>
                  <span class="text-2xl font-['Oswald'] font-bold text-[#b91c1c] tracking-wide">
                    ${prod.formattedPrice}
                  </span>
                </div>

                <!-- NÚT BẤM CÓ SẴN DATA ATTRIBUTES CHO TEAM GIỎ HÀNG BẮT SỰ KIỆN -->
                <button 
                  type="button"
                  data-product-id="${prod.id}"
                  data-product-name="${prod.name}"
                  data-product-price="${prod.price}"
                  data-product-image="${prod.image}"
                  class="btn-add-to-cart w-full bg-gray-900 hover:bg-[#b91c1c] text-white font-['Oswald'] font-bold text-xs uppercase tracking-wider py-2.5 px-4 flex items-center justify-center gap-2 transition cursor-pointer border-2 border-gray-900 shadow-[2px_2px_0px_0px_#f59e0b] active:translate-x-0.5 active:translate-y-0.5 rounded-none"
                >
                  <img src="${shoppingBagIcon}" class="w-4 h-4 invert brightness-0" alt="" />
                  <span>Thêm vào giỏ hàng</span>
                </button>
              </div>

            </div>
          `,
          ).join("")}
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

  run() {
    // Demo gắn thử sự kiện click vào nút Thêm giỏ hàng để bạn cùng team thấy nó hoạt động
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

        console.log(
          "👉 Đã bắt được dữ liệu sản phẩm để đưa vào Giỏ hàng:",
          productData,
        );

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
