import shoppingBagIcon from "lucide-static/icons/shopping-bag.svg";
import arrowLeftIcon from "lucide-static/icons/arrow-left.svg";
import userIcon from "lucide-static/icons/user.svg";
import { AuthService } from "../../services/AuthService.js";

export class ShopHeader {
  static getTemplate() {
    const accountRoute = AuthService.getAccountRoute();
    const accountLabel = AuthService.isAuthenticated()
      ? "Tài khoản"
      : "Đăng nhập";

    return /*html*/ `
      <!-- Header cửa hàng: thương hiệu, giỏ hàng và tài khoản -->
      <header class="bg-white border-b-2 border-[#f59e0b] sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 h-18 flex items-center justify-between">

          <div class="flex items-center gap-4">
            <a href="/shop" class="font-['Oswald'] font-bold text-2xl uppercase tracking-wider text-gray-900 flex items-center gap-2">
              <span class="bg-[#f59e0b] text-gray-900 px-2 py-0.5 text-lg font-extrabold">SHOP</span>
              QuickShip Store
            </a>
            <a href="/" class="hidden sm:flex items-center gap-1 text-xs font-bold uppercase text-gray-500 hover:text-[#b91c1c] ml-4 transition border-l border-gray-300 pl-4">
              <img src="${arrowLeftIcon}" class="w-3.5 h-3.5" alt="" />
              Về trang vận chuyển
            </a>
          </div>

          <div class="flex items-center gap-3">

            <a href="/cart" aria-label="Giỏ hàng" class="flex items-center gap-1.5 border border-gray-300 px-2.5 py-2 text-sm font-bold text-gray-800 transition hover:border-[#b91c1c] sm:gap-2 sm:px-4">
              <img src="${shoppingBagIcon}" class="w-4 h-4 text-gray-700" alt="" />
              <span class="hidden sm:inline">Giỏ hàng</span>
              <span data-role="cart-count" class="bg-[#b91c1c] text-white text-xs px-1.5 py-0.2 font-mono">0</span>
            </a>


            <a href="${accountRoute}" aria-label="${accountLabel}" class="flex items-center gap-1.5 bg-[#b91c1c] px-2.5 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#991b1b] sm:px-4">
              <img src="${userIcon}" class="w-3.5 h-3.5 invert brightness-0" alt="" />
              <span class="hidden sm:inline">${accountLabel}</span>
            </a>
          </div>

        </div>
      </header>
    `;
  }
}
