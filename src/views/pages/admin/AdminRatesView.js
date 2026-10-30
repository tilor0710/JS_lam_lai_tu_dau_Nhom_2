import { BaseView } from "../../../base/baseView.js";
import saveIcon from "lucide-static/icons/save.svg";

export class AdminRatesView extends BaseView {
  constructor() {
    super("#app-content");
    this.onUpdateRates = null;
  }

  getTemplate(rates = {}) {
    const pkg = rates.packages || {};

    return /*html*/ `
      <div class="flex w-full min-w-0 max-w-4xl flex-col gap-4 sm:gap-6">

        <div class="border-l-4 border-[#b91c1c] pl-4">
          <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Thiết lập chi phí</span>
          <h1 class="mt-0.5 text-2xl font-bold font-['Oswald'] uppercase text-gray-900 sm:text-3xl">CẤU HÌNH BIỂU PHÍ BƯU CHÍNH</h1>
          <p class="text-xs text-gray-500 mt-1">Các thay đổi sẽ được áp dụng trực tiếp cho Form tính cước phía khách hàng.</p>
        </div>

        <!-- Form cấu hình các mức cước -->
        <div class="rounded-none border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_#f59e0b] sm:p-6 sm:shadow-[6px_6px_0px_0px_#f59e0b]">
          <form id="form-rates-config" class="flex flex-col gap-6 text-xs font-bold uppercase tracking-wider text-gray-700">


            <div class="border-b border-gray-200 pb-4">
              <h3 class="font-['Oswald'] text-base text-gray-900 uppercase mb-3">1. Cước bưu chính Thư từ / Tài liệu (Mail)</h3>
              <div class="max-w-xs flex flex-col gap-1">
                <label>Giá cước cơ bản (VND):</label>
                <input id="rate-mail" type="number" required value="${rates.mailBasePrice || 15000}" class="border-2 border-gray-900 p-2.5 font-mono text-sm text-gray-900 outline-none rounded-none" />
              </div>
            </div>


            <div class="border-b border-gray-200 pb-4">
              <h3 class="font-['Oswald'] text-base text-gray-900 uppercase mb-3">2. Cước bưu kiện theo kích cỡ (Package Size Tier)</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1">
                  <label>Gói SMALL (VND):</label>
                  <input id="rate-small" type="number" required value="${pkg.SMALL || 25000}" class="border-2 border-gray-900 p-2.5 font-mono text-sm text-gray-900 outline-none rounded-none" />
                </div>
                <div class="flex flex-col gap-1">
                  <label>Gói MEDIUM (VND):</label>
                  <input id="rate-medium" type="number" required value="${pkg.MEDIUM || 40000}" class="border-2 border-gray-900 p-2.5 font-mono text-sm text-gray-900 outline-none rounded-none" />
                </div>
                <div class="flex flex-col gap-1">
                  <label>Gói LARGE (VND):</label>
                  <input id="rate-large" type="number" required value="${pkg.LARGE || 65000}" class="border-2 border-gray-900 p-2.5 font-mono text-sm text-gray-900 outline-none rounded-none" />
                </div>
                <div class="flex flex-col gap-1">
                  <label>Gói OVERSIZE (VND):</label>
                  <input id="rate-oversize" type="number" required value="${pkg.OVERSIZE || 110000}" class="border-2 border-gray-900 p-2.5 font-mono text-sm text-gray-900 outline-none rounded-none" />
                </div>
              </div>
            </div>


            <div>
              <h3 class="font-['Oswald'] text-base text-gray-900 uppercase mb-3">3. Phụ phí vượt cân & Hệ số quốc tế</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1">
                  <label>Phụ phí mỗi 1kg vượt thêm (VND):</label>
                  <input id="rate-extra-kg" type="number" required value="${rates.extraPerKg || 10000}" class="border-2 border-gray-900 p-2.5 font-mono text-sm text-gray-900 outline-none rounded-none" />
                </div>
                <div class="flex flex-col gap-1">
                  <label>Hệ số nhân cước Quốc tế (Lần):</label>
                  <input id="rate-multiplier" type="number" step="0.5" required value="${rates.overseasMultiplier || 4}" class="border-2 border-gray-900 p-2.5 font-mono text-sm text-gray-900 outline-none rounded-none" />
                </div>
              </div>
            </div>


            <div class="pt-3 border-t border-gray-200 flex justify-end">
              <button type="submit" class="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-8 py-3 font-['Oswald'] text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-2 border-gray-900 shadow-[3px_3px_0px_0px_#0f172a] rounded-none cursor-pointer transition">
                <img src="${saveIcon}" class="w-4 h-4 invert brightness-0" alt="" />
                <span>Lưu cấu hình bảng cước</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    `;
  }

  run() {
    document
      .querySelector("#form-rates-config")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const updatedRates = {
          mailBasePrice: Number(document.querySelector("#rate-mail")?.value),
          packages: {
            SMALL: Number(document.querySelector("#rate-small")?.value),
            MEDIUM: Number(document.querySelector("#rate-medium")?.value),
            LARGE: Number(document.querySelector("#rate-large")?.value),
            OVERSIZE: Number(document.querySelector("#rate-oversize")?.value),
          },
          extraPerKg: Number(document.querySelector("#rate-extra-kg")?.value),
          overseasMultiplier: Number(
            document.querySelector("#rate-multiplier")?.value,
          ),
        };
        if (this.onUpdateRates) this.onUpdateRates(updatedRates);
      });
  }
}
