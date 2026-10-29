import phoneCallIcon from "lucide-static/icons/phone-call.svg";
import mapPinIcon from "lucide-static/icons/map-pin.svg";

export class Footer {
  static getTemplate() {
    return `
      <footer class="bg-[#0f172a] text-gray-300 border-t-4 border-[#b91c1c] mt-auto">
        <div class="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div class="md:col-span-2 flex flex-col gap-3">
            <h3 class="font-['Oswald'] text-2xl font-bold text-white tracking-wider">
              QUICK<span class="text-[#f59e0b]">SHIP</span> LOGISTICS
            </h3>
            <p class="text-sm text-gray-400 leading-relaxed max-w-md">
              Hệ thống vận tải và giải pháp cung ứng vật tư đóng gói hàng đầu Việt Nam. Tốc độ dứt khoát, an toàn tuyệt đối và minh bạch hành trình.
            </p>
            <div class="flex items-center gap-3 mt-2 text-xs text-[#f59e0b] font-bold uppercase tracking-wider">
              <span class="flex items-center gap-1.5">
                <img src="${phoneCallIcon}" class="w-4 h-4" alt="" /> Hotline: 1900 9999
              </span>
              <span>•</span>
              <span class="flex items-center gap-1.5">
                <img src="${mapPinIcon}" class="w-4 h-4" alt="" /> Toàn quốc
              </span>
            </div>
          </div>

          <div>
            <h4 class="font-['Oswald'] text-base font-bold text-white mb-4 tracking-wider uppercase border-l-2 border-[#b91c1c] pl-2.5">
              Dịch vụ bưu chính
            </h4>
            <ul class="flex flex-col gap-2.5 text-xs font-medium uppercase tracking-wide">
              <li><a href="#/track" class="hover:text-[#f59e0b] transition">Tra cứu bưu gửi</a></li>
              <li><a href="#/calculate-rates" class="hover:text-[#f59e0b] transition">Tính cước vận chuyển</a></li>
              <li><a href="#/locate-us" class="hover:text-[#f59e0b] transition">Mạng lưới bưu cục</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-['Oswald'] text-base font-bold text-white mb-4 tracking-wider uppercase border-l-2 border-[#f59e0b] pl-2.5">
              Hỗ trợ khách hàng
            </h4>
            <ul class="flex flex-col gap-2.5 text-xs font-medium uppercase tracking-wide">
              <li><a href="#/support" class="hover:text-[#f59e0b] transition">Quy chuẩn đóng gói</a></li>
              <li><a href="#/shop" class="hover:text-[#f59e0b] transition">Vật tư đóng hàng</a></li>
              <li><a href="#/support" class="hover:text-[#f59e0b] transition">Chính sách khiếu nại</a></li>
            </ul>
          </div>

        </div>

        <div class="max-w-7xl mx-auto px-4 py-4 border-t border-slate-800 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 2026 QUICKSHIP ENTERPRISE. ALL RIGHTS RESERVED.</span>
          <span class="font-mono text-[11px] text-gray-600">INDUSTRIAL LOGISTICS SPECIFICATION</span>
        </div>
      </footer>
    `;
  }
}
