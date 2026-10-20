export class Footer {
  static getTemplate() {
    return /*html*/ `
      <footer class="bg-[#1e293b] text-gray-300 py-12 mt-auto">
        <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="md:col-span-2">
            <h3 class="font-extrabold text-2xl text-white mb-4">Quick<span class="text-brand-blue">Ship</span></h3>
            <p class="text-sm leading-relaxed max-w-sm">
              Giải pháp vận chuyển và đóng gói hàng đầu Việt Nam. Nhanh chóng, an toàn và tin cậy.
            </p>
          </div>
          <div>
            <h4 class="font-bold text-white mb-4 uppercase text-sm tracking-wider">Dịch vụ</h4>
            <ul class="flex flex-col gap-2 text-sm">
              <li><a href="#/track" class="hover:text-white transition">Tra cứu bưu gửi</a></li>
              <li><a href="#/calculate-rates" class="hover:text-white transition">Tính cước vận chuyển</a></li>
              <li><a href="#/locate-us" class="hover:text-white transition">Tìm bưu cục gần nhất</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-white mb-4 uppercase text-sm tracking-wider">Hỗ trợ</h4>
            <ul class="flex flex-col gap-2 text-sm">
              <li><a href="#/support" class="hover:text-white transition">Trung tâm trợ giúp</a></li>
              <li><a href="#/shop" class="hover:text-white transition">Mua vật tư đóng gói</a></li>
              <li>Hotline: <span class="font-bold text-white">1900 9999</span></li>
            </ul>
          </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-sm text-center">
          © 2026 QuickShip Logistics Ecommerce. All rights reserved.
        </div>
      </footer>
    `;
  }
}
