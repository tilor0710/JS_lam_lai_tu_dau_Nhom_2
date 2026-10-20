import { BaseView } from "./../../../base/baseView";

export class ShopView extends BaseView {
  constructor() {
    super("#app-content");
  }

  getTemplate() {
    return /*html*/ `
      <section class="max-w-7xl mx-auto px-4 py-10">
        <div class="mb-8 flex justify-between items-end border-b border-gray-200 pb-4">
          <div>
            <h1 class="text-3xl font-extrabold text-brand-blue">Cửa Hàng Vật Tư Đóng Gói</h1>
            <p class="text-gray-500 text-sm mt-1">Cung cấp hộp carton, băng keo và phụ liệu đóng hàng tiêu chuẩn</p>
          </div>
          <a href="#/" class="text-sm font-semibold text-gray-600 hover:text-brand-strong transition">
            ← Quay lại Trang chủ
          </a>
        </div>

        <!-- Lưới sản phẩm demo -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div class="border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between">
            <div>
              <div class="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">📦</div>
              <h3 class="font-bold text-base mt-3 text-gray-800">Thùng Carton Size L (45x35x20)</h3>
              <p class="text-xs text-gray-500 mt-1">Tiêu chuẩn đóng gói hàng bưu chính</p>
            </div>
            <div class="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
              <span class="text-lg font-extrabold text-brand-blue">35.000 ₫</span>
              <button class="bg-brand-blue text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 transition">
                Thêm vào giỏ
              </button>
            </div>
          </div>

          <div class="border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between">
            <div>
              <div class="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">✉️</div>
              <h3 class="font-bold text-base mt-3 text-gray-800">Bì thư chống sốc Bubble Mailer</h3>
              <p class="text-xs text-gray-500 mt-1">Bảo vệ hàng linh kiện, phụ kiện</p>
            </div>
            <div class="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
              <span class="text-lg font-extrabold text-brand-blue">12.000 ₫</span>
              <button class="bg-brand-blue text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 transition">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  run() {}
}
