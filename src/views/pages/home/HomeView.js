import { BaseView } from "./../../../base/baseView";
import searchIcon from "lucide-static/icons/search.svg";
import calculatorIcon from "lucide-static/icons/calculator.svg";
import mapPinIcon from "lucide-static/icons/map-pin.svg";
import mailboxIcon from "lucide-static/icons/mailbox.svg";
import packageIcon from "lucide-static/icons/package.svg";
import checkSquareIcon from "lucide-static/icons/check-square.svg";
import arrowRightIcon from "lucide-static/icons/arrow-right.svg";

export class HomeView extends BaseView {
  constructor() {
    super("#app-content");
  }

  getTemplate() {
    return /*html*/ `
      <section class="bg-[#f1f5f9] py-6 sm:py-10 lg:py-14 border-b border-gray-200 overflow-x-hidden">
        <div class="max-w-7xl mx-auto px-3.5 sm:px-4">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            <!-- CỘT TRÁI: BANNER THÔNG TIN -->
            <div class="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
              <div class="border-l-4 border-[#b91c1c] pl-3 sm:pl-4">
                <span class="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#b91c1c]">
                  Dịch vụ logistics toàn quốc
                </span>
                <h1 class="text-2xl sm:text-3xl lg:text-5xl font-bold font-['Oswald'] text-gray-900 leading-[1.15] uppercase tracking-wide mt-1">
                  KẾT NỐI CỘNG ĐỒNG BẰNG DỊCH VỤ GIAO HÀNG TIN CẬY
                </h1>
              </div>

              <p class="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                Hạ tầng bưu chính thông minh kết hợp hệ sinh thái vật tư đóng gói hoàn chỉnh. Đảm bảo đúng hẹn, minh bạch và chính xác trên từng kiện hàng.
              </p>

              <div>
                <a href="#/shop" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-gray-900 font-['Oswald'] font-bold uppercase text-xs sm:text-sm px-5 sm:px-6 py-3 border-2 border-gray-900 shadow-[3px_3px_0px_0px_#0f172a] sm:shadow-[4px_4px_0px_0px_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5">
                  <span>Khám phá kho vật tư đóng gói</span>
                  <img src="${arrowRightIcon}" class="w-4 h-4" alt="" />
                </a>
              </div>
            </div>

            <!-- CỘT PHẢI: CHIẾC HỘP TRA CỨU ĐÃ ĐƯỢC TỐI ƯU MOBILE -->
            <div class="lg:col-span-5 w-full">
              <div class="bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#b91c1c] sm:shadow-[6px_6px_0px_0px_#b91c1c] p-4 sm:p-6 flex flex-col gap-4 sm:gap-5">
                
                <div class="border-b-2 border-gray-100 pb-2.5 sm:pb-3 flex justify-between items-center">
                  <h2 class="font-['Oswald'] font-bold text-xl sm:text-2xl uppercase tracking-wider text-gray-900">
                    TRA CỨU BƯU GỬI
                  </h2>
                  <span class="bg-gray-100 text-gray-600 text-[9px] sm:text-[10px] font-mono px-2 py-0.5 border border-gray-300 uppercase font-bold">
                    SYSTEM
                  </span>
                </div>

                <!-- CỤM INPUT VÀ NÚT BẤM (HẾT BỊ BÓP MÉO) -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-700">Mã vận đơn bưu cục:</label>
                  
                  <div class="flex flex-col sm:flex-row border-2 border-gray-900 focus-within:border-[#b91c1c] transition">
                    <input 
                      id="tracking-input" 
                      type="text" 
                      placeholder="VD: SP123456789VN..." 
                      class="w-full flex-1 px-3 py-2.5 text-xs sm:text-sm font-mono text-gray-900 outline-none uppercase bg-white"
                    />
                    <button 
                      id="tracking-btn" 
                      type="button" 
                      class="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-4 sm:px-5 py-2.5 text-xs font-['Oswald'] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer border-t-2 sm:border-t-0 sm:border-l-2 border-gray-900 whitespace-nowrap shrink-0"
                    >
                      <img src="${searchIcon}" class="w-3.5 h-3.5 invert brightness-0" alt="" />
                      <span>Tra cứu</span>
                    </button>
                  </div>
                </div>

                <div id="tracking-result" class="flex flex-col gap-2"></div>

                <!-- CÁC LINK TIỆN ÍCH -->
                <div class="grid grid-cols-1 gap-1.5 sm:gap-2 pt-2 border-t border-gray-200">
                  <a href="#/calculate-rates" class="flex items-center justify-between p-2.5 sm:p-3 border border-gray-200 hover:border-[#b91c1c] hover:bg-red-50/30 transition group">
                    <div class="flex items-center gap-2.5 sm:gap-3">
                      <div class="bg-gray-100 p-1.5 group-hover:bg-[#b91c1c] transition">
                        <img src="${calculatorIcon}" class="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:invert group-hover:brightness-0" alt="" />
                      </div>
                      <span class="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-gray-800">Tính cước vận chuyển</span>
                    </div>
                    <span class="text-gray-400 group-hover:text-[#b91c1c] text-xs font-bold">➔</span>
                  </a>

                  <a href="#/locate-us" class="flex items-center justify-between p-2.5 sm:p-3 border border-gray-200 hover:border-[#b91c1c] hover:bg-red-50/30 transition group">
                    <div class="flex items-center gap-2.5 sm:gap-3">
                      <div class="bg-gray-100 p-1.5 group-hover:bg-[#b91c1c] transition">
                        <img src="${mapPinIcon}" class="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:invert group-hover:brightness-0" alt="" />
                      </div>
                      <span class="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-gray-800">Tìm bưu cục gần nhất</span>
                    </div>
                    <span class="text-gray-400 group-hover:text-[#b91c1c] text-xs font-bold">➔</span>
                  </a>

                  <a href="#/find-postal-code" class="flex items-center justify-between p-2.5 sm:p-3 border border-gray-200 hover:border-[#b91c1c] hover:bg-red-50/30 transition group">
                    <div class="flex items-center gap-2.5 sm:gap-3">
                      <div class="bg-gray-100 p-1.5 group-hover:bg-[#b91c1c] transition">
                        <img src="${mailboxIcon}" class="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:invert group-hover:brightness-0" alt="" />
                      </div>
                      <span class="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-gray-800">Tra cứu mã bưu chính</span>
                    </div>
                    <span class="text-gray-400 group-hover:text-[#b91c1c] text-xs font-bold">➔</span>
                  </a>
                </div>

              </div>
            </div>

          </div>

          <!-- 2 KHỐI DƯỚI GÓC CẠNH -->
          <div class="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t-2 border-gray-200">
            <div class="p-4 sm:p-6 bg-white border-2 border-gray-300 flex flex-col gap-2 sm:gap-3">
              <div class="flex items-center gap-2">
                <img src="${packageIcon}" class="w-4 h-4 sm:w-5 sm:h-5 text-[#b91c1c]" alt="" />
                <h3 class="font-['Oswald'] font-bold text-base sm:text-lg uppercase text-gray-900">Gửi hàng bưu phẩm</h3>
              </div>
              <p class="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                Giải pháp gửi kiện hàng nội địa và quốc tế dứt khoát, an toàn với quy trình theo dõi mã vạch chính xác.
              </p>
              <a href="#/shop" class="text-xs font-bold uppercase text-[#b91c1c] hover:underline flex items-center gap-1 mt-1">
                Vật tư đóng gói ➔
              </a>
            </div>

            <div class="p-4 sm:p-6 bg-white border-2 border-gray-300 flex flex-col gap-2 sm:gap-3">
              <div class="flex items-center gap-2">
                <img src="${checkSquareIcon}" class="w-4 h-4 sm:w-5 sm:h-5 text-[#f59e0b]" alt="" />
                <h3 class="font-['Oswald'] font-bold text-base sm:text-lg uppercase text-gray-900">Nhận hàng tại bưu cục</h3>
              </div>
              <p class="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                Chủ động nhận bưu gửi tại các điểm bưu cục trên toàn quốc với thời gian lưu kho linh hoạt.
              </p>
              <a href="#/locate-us" class="text-xs font-bold uppercase text-[#b91c1c] hover:underline flex items-center gap-1 mt-1">
                Xem điểm bưu cục ➔
              </a>
            </div>
          </div>

        </div>
      </section>
    `;
  }

  run() {
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
