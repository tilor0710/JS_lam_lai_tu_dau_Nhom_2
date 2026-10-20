export class ShopHeader {
  static getTemplate() {
    return /*html*/ `
      <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <!-- Logo Shop -->
          <a href="#/shop" class="font-extrabold text-2xl text-brand-blue tracking-tight">
            QuickShip <span class="text-gray-500 font-medium text-lg">| Shop</span>
          </a>
          
          <!-- Navigation Shop -->
          <nav class="hidden md:flex items-center gap-6">
            <a href="#/" class="text-sm font-bold text-gray-500 hover:text-brand-strong transition">← Về trang Vận chuyển</a>
            <a href="#/shop" class="text-sm font-bold text-brand-blue transition">Tất cả sản phẩm</a>
          </nav>

          <!-- Giỏ hàng & Đăng nhập -->
          <div class="flex items-center gap-4">
            <a href="#/cart" class="flex items-center gap-1.5 text-gray-700 hover:text-brand-blue transition">
              <!-- Icon Cart SVG tạm -->
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <span class="text-sm font-bold">Giỏ hàng (0)</span>
            </a>
            <a href="#/auth" class="bg-brand-blue text-white px-5 py-2 rounded-lg text-sm font-bold transition hover:opacity-90">
              Đăng nhập
            </a>
          </div>
        </div>
      </header>
    `;
  }
}
