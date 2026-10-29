import truckIcon from "lucide-static/icons/truck.svg";
import userIcon from "lucide-static/icons/user.svg";
import menuIcon from "lucide-static/icons/menu.svg";
import shoppingCartIcon from "lucide-static/icons/shopping-cart.svg";

export class Header {
  static getTemplate() {
    return /*html*/ `
      <header class="bg-white border-b-2 border-[#b91c1c] sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto px-3.5 sm:px-4 h-16 sm:h-18 flex items-center justify-between">
          
          <!-- Logo -->
          <a href="#/" class="flex items-center gap-1.5 sm:gap-2">
            <div class="bg-[#b91c1c] p-1.5 sm:p-2 text-white flex items-center justify-center">
              <img src="${truckIcon}" alt="Logo" class="w-5 h-5 sm:w-6 sm:h-6 invert brightness-0" />
            </div>
            <span class="font-['Oswald'] font-bold text-xl sm:text-2xl uppercase tracking-wider text-gray-900">
              Quick<span class="text-[#b91c1c]">Ship</span>
            </span>
          </a>
          
          <!-- Menu Desktop -->
          <nav class="hidden md:flex items-center gap-1 font-semibold text-sm">
            <a href="#/" class="px-3.5 py-2 text-gray-800 hover:text-[#b91c1c] hover:bg-red-50/50 transition uppercase tracking-wide">Trang chủ</a>
            <a href="#/calculate-rates" class="px-3.5 py-2 text-gray-800 hover:text-[#b91c1c] hover:bg-red-50/50 transition uppercase tracking-wide">Tính cước</a>
            <a href="#/locate-us" class="px-3.5 py-2 text-gray-800 hover:text-[#b91c1c] hover:bg-red-50/50 transition uppercase tracking-wide">Bưu cục</a>
            <a href="#/shop" class="px-3.5 py-2 text-[#b91c1c] font-bold border border-[#b91c1c] hover:bg-[#b91c1c] hover:text-white transition uppercase tracking-wide ml-2">
              Cửa hàng Vật tư
            </a>
          </nav>

          <!-- Nút Đăng nhập & Nút Menu Mobile -->
          <div class="flex items-center gap-2">
            <a href="#/cart" aria-label="Giỏ hàng" class="relative p-2 border-2 border-gray-900 hover:border-[#b91c1c] transition">
              <img src="${shoppingCartIcon}" class="w-5 h-5" alt="" />
              <span data-role="cart-count" class="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-[#b91c1c] text-white text-[10px] font-bold flex items-center justify-center">0</span>
            </a>
            <a href="#/auth" class="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider border-b-2 border-[#f59e0b] flex items-center gap-1.5 transition">
              <img src="${userIcon}" class="w-3.5 h-3.5 invert brightness-0" alt="" />
              <span class="hidden xs:inline">Đăng nhập</span>
            </a>

            <!-- Nút Hamburger Mobile góc cạnh -->
            <button 
              id="mobile-menu-toggle" 
              class="md:hidden p-2 border-2 border-gray-900 bg-white hover:bg-gray-100 transition cursor-pointer"
              onclick="document.querySelector('#mobile-menu-drawer')?.classList.toggle('hidden')"
            >
              <img src="${menuIcon}" class="w-5 h-5 text-gray-900" alt="Menu" />
            </button>
          </div>

        </div>

        <!-- MENU MOBILE XỔ XUỐNG VUÔNG VỨC -->
        <div id="mobile-menu-drawer" class="hidden md:hidden border-t-2 border-gray-900 bg-white px-4 py-3 flex flex-col gap-2 font-['Oswald'] uppercase text-xs tracking-wider border-b-2 border-[#b91c1c]">
          <a href="#/" class="py-2 px-3 border-b border-gray-100 hover:bg-red-50 hover:text-[#b91c1c]">Trang chủ</a>
          <a href="#/calculate-rates" class="py-2 px-3 border-b border-gray-100 hover:bg-red-50 hover:text-[#b91c1c]">Tính cước vận chuyển</a>
          <a href="#/locate-us" class="py-2 px-3 border-b border-gray-100 hover:bg-red-50 hover:text-[#b91c1c]">Mạng lưới bưu cục</a>
          <a href="#/shop" class="py-2 px-3 bg-[#b91c1c] text-white font-bold text-center mt-1">Cửa hàng Vật tư</a>
        </div>
      </header>
    `;
  }
}
