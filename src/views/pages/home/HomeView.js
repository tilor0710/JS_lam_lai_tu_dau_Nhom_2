import { BaseView } from "./../../../base/baseView";

export class HomeView extends BaseView {
  constructor() {
    super("#app-content");
  }

  getTemplate() {
    return /*html*/ `
      <section class="bg-[#f4f6f8] py-12 lg:py-16">
        <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Cột trái: Giới thiệu -->
          <div class="lg:col-span-7 flex flex-col gap-4">
            <h1 class="text-4xl lg:text-5xl font-extrabold text-brand-strong leading-tight">
              Kết nối cộng đồng bằng dịch vụ giao hàng tin cậy
            </h1>
            <p class="text-gray-600 text-base">
              Hệ thống vận chuyển hàng đầu với mạng lưới bưu cục rộng khắp toàn quốc.
            </p>
            <div class="mt-2">
              <a href="#/shop" class="inline-block bg-brand-strong text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition">
                Khám phá cửa hàng vật tư ➔
              </a>
            </div>
          </div>

          <!-- Cột phải: Form tra cứu bưu gửi nhanh -->
          <div class="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4">
            <h2 class="text-2xl font-extrabold text-brand-strong">Tra cứu bưu gửi</h2>
            <div class="flex gap-2">
              <input id="demoTrackingInput" type="text" placeholder="Nhập mã vận đơn (VD: SP123456789VN)..." 
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-strong">
              <button id="demoBtnTrack" class="bg-brand-strong text-white px-5 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition cursor-pointer">
                Tra cứu
              </button>
            </div>
            <div id="demoResult" class="text-xs text-gray-500 italic"></div>
          </div>

        </div>
      </section>
    `;
  }

  run() {
    // Demo gắn sự kiện test nút bấm tra cứu
    const btn = document.querySelector("#demoBtnTrack");
    const input = document.querySelector("#demoTrackingInput");
    const result = document.querySelector("#demoResult");

    if (btn && input) {
      btn.addEventListener("click", () => {
        const code = input.value.trim();
        if (result) {
          result.innerHTML = code
            ? `<span class="text-green-600 font-bold">Đang kiểm tra mã: ${code}... (Sẽ gắn Service sau)</span>`
            : `<span class="text-red-500 font-bold">Vui lòng nhập mã bưu gửi!</span>`;
        }
      });
    }
  }
}
