export class Header {
  static getTemplate() {
    return /*html*/ `
      <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <!-- Logo -->
          <a href="#/" class="font-extrabold text-2xl text-brand-strong tracking-tight">
            Quick<span class="text-brand-blue">Ship</span>
          </a>
          
          <!-- Navigation -->
          <nav class="hidden md:flex items-center gap-6">
            <a href="#/" class="text-sm font-bold text-gray-700 hover:text-brand-strong transition">Trang chủ</a>
            <a href="#/track" class="text-sm font-bold text-gray-700 hover:text-brand-strong transition">Tra cứu</a>
            <a href="#/calculate-rates" class="text-sm font-bold text-gray-700 hover:text-brand-strong transition">Tính cước</a>
            <a href="#/locate-us" class="text-sm font-bold text-gray-700 hover:text-brand-strong transition">Bưu cục</a>
            <a href="#/shop" class="text-sm font-bold text-brand-blue hover:underline">Cửa hàng Vật tư</a>
          </nav>

          <!-- Nút Đăng nhập -->
          <a href="#/auth" class="bg-brand-strong text-white px-5 py-2 rounded-lg text-sm font-bold transition hover:opacity-90">
            Đăng nhập
          </a>
        </div>
      </header>
    `;
  }
}
