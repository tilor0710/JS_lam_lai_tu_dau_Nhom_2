import { BaseView } from "../../../base/baseView.js";
import calculatorIcon from "lucide-static/icons/calculator.svg";
import packageIcon from "lucide-static/icons/package.svg";
import mailIcon from "lucide-static/icons/mail.svg";
import alertCircleIcon from "lucide-static/icons/alert-circle.svg";
import checkSquareIcon from "lucide-static/icons/check-square.svg";

export class CalculateRatesView extends BaseView {
  constructor() {
    super("#app-content");
    this.currentScope = "DOMESTIC";
    this.currentItemType = "PACKAGE";
    this.onCalculate = null;
  }

  getTemplate() {
    return /*html*/ `
      <section class="max-w-4xl mx-auto px-4 py-8">


        <div class="border-l-4 border-[#b91c1c] pl-4 mb-8">
          <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Dự toán chi phí vận chuyển</span>
          <h1 class="text-3xl sm:text-4xl font-bold font-['Oswald'] text-gray-900 uppercase tracking-wide mt-0.5">
            TÍNH CƯỚC BƯU GỬI
          </h1>
        </div>


        <!-- Chọn dịch vụ và nhập thông tin bưu gửi -->
        <div class="bg-white border-2 border-gray-900 shadow-[6px_6px_0px_0px_#b91c1c] rounded-none">


          <div class="grid grid-cols-2 border-b-2 border-gray-900">
            <button
              id="tab-domestic"
              type="button"
              class="py-4 px-4 text-center font-['Oswald'] font-bold text-sm sm:text-base uppercase tracking-wider bg-[#b91c1c] text-white border-r-2 border-gray-900 transition cursor-pointer"
            >
              Trong nước (Domestic)
            </button>
            <button
              id="tab-overseas"
              type="button"
              class="py-4 px-4 text-center font-['Oswald'] font-bold text-sm sm:text-base uppercase tracking-wider bg-gray-100 text-gray-700 hover:bg-gray-200 transition cursor-pointer"
            >
              Quốc tế (Overseas)
            </button>
          </div>


          <div class="p-5 sm:p-8 flex flex-col gap-6">


            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                <span>1. Bạn muốn gửi loại hình nào?</span>
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="btn-type-package"
                  type="button"
                  class="py-3 px-4 border-2 border-gray-900 bg-red-50/50 text-[#b91c1c] font-['Oswald'] font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer transition shadow-[2px_2px_0px_0px_#0f172a]"
                >
                  <img src="${packageIcon}" class="w-4 h-4" alt="" />
                  <span>Package (Bưu kiện đóng hộp)</span>
                </button>
                <button
                  id="btn-type-mail"
                  type="button"
                  class="py-3 px-4 border-2 border-gray-300 bg-white text-gray-700 font-['Oswald'] font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer transition hover:border-gray-900"
                >
                  <img src="${mailIcon}" class="w-4 h-4" alt="" />
                  <span>Mail (Thư từ / Tài liệu)</span>
                </button>
              </div>
            </div>


            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-800">
                2. Tổng khối lượng bưu kiện (Weight):
              </label>
              <div class="flex border-2 border-gray-900 focus-within:border-[#b91c1c] transition max-w-sm">
                <input
                  id="calc-weight-input"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value="1.0"
                  class="flex-1 px-3.5 py-2.5 text-sm font-mono text-gray-900 outline-none bg-white font-bold"
                />
                <div class="bg-gray-100 border-l-2 border-gray-900 px-4 py-2.5 font-['Oswald'] font-bold text-sm text-gray-800 uppercase flex items-center">
                  KG
                </div>
              </div>
            </div>


            <div id="wrapper-calc-size" class="flex flex-col gap-2">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-800">
                3. Quy chuẩn kích thước kiện hàng (Size Tier):
              </label>
              <div class="border-2 border-gray-900 focus-within:border-[#b91c1c] transition max-w-xl">
                <select
                  id="calc-size-select"
                  class="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-900 bg-white outline-none cursor-pointer"
                >
                  <option value="SMALL">Small — 32.4 × 22.9 × 6.5 cm (Hàng tiêu chuẩn)</option>
                  <option value="MEDIUM">Medium — 32 × 25 × 10 cm (Hộp linh kiện, thời trang)</option>
                  <option value="LARGE">Large — 60 × 40 × 30 cm (Kiện hàng lớn tiêu chuẩn)</option>
                  <option value="OVERSIZE">Oversize — Dài đến 1.5m, Dài + 2R + 2C &lt; 3m (Hàng cồng kềnh)</option>
                </select>
              </div>
            </div>


            <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t-2 border-gray-100">
              <button
                id="btn-run-calculate"
                type="button"
                class="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-8 py-3 text-xs sm:text-sm font-['Oswald'] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer border-2 border-gray-900 shadow-[3px_3px_0px_0px_#0f172a]"
              >
                <img src="${calculatorIcon}" class="w-4 h-4 invert brightness-0" alt="" />
                <span>Tính cước ngay</span>
              </button>

              <span class="text-xs font-mono text-gray-500 uppercase">
                * Bảng cước đồng bộ thời gian thực từ cơ sở dữ liệu QuickShip
              </span>
            </div>


            <!-- Kết quả dự toán cước phí -->
            <div id="calc-result-box" class="flex flex-col gap-2"></div>

          </div>

        </div>

      </section>
    `;
  }

  run() {
    const tabDomestic = document.querySelector("#tab-domestic");
    const tabOverseas = document.querySelector("#tab-overseas");

    const setScope = (scope) => {
      this.currentScope = scope;
      if (scope === "DOMESTIC") {
        tabDomestic.className =
          "py-4 px-4 text-center font-['Oswald'] font-bold text-sm sm:text-base uppercase tracking-wider bg-[#b91c1c] text-white border-r-2 border-gray-900 transition cursor-pointer";
        tabOverseas.className =
          "py-4 px-4 text-center font-['Oswald'] font-bold text-sm sm:text-base uppercase tracking-wider bg-gray-100 text-gray-700 hover:bg-gray-200 transition cursor-pointer";
      } else {
        tabOverseas.className =
          "py-4 px-4 text-center font-['Oswald'] font-bold text-sm sm:text-base uppercase tracking-wider bg-[#b91c1c] text-white transition cursor-pointer";
        tabDomestic.className =
          "py-4 px-4 text-center font-['Oswald'] font-bold text-sm sm:text-base uppercase tracking-wider bg-gray-100 text-gray-700 hover:bg-gray-200 border-r-2 border-gray-900 transition cursor-pointer";
      }
    };

    if (tabDomestic)
      tabDomestic.addEventListener("click", () => setScope("DOMESTIC"));
    if (tabOverseas)
      tabOverseas.addEventListener("click", () => setScope("OVERSEAS"));
    const btnPackage = document.querySelector("#btn-type-package");
    const btnMail = document.querySelector("#btn-type-mail");
    const sizeWrapper = document.querySelector("#wrapper-calc-size");

    const setItemType = (type) => {
      this.currentItemType = type;
      if (type === "PACKAGE") {
        btnPackage.className =
          "py-3 px-4 border-2 border-gray-900 bg-red-50/50 text-[#b91c1c] font-['Oswald'] font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer transition shadow-[2px_2px_0px_0px_#0f172a]";
        btnMail.className =
          "py-3 px-4 border-2 border-gray-300 bg-white text-gray-700 font-['Oswald'] font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer transition hover:border-gray-900";
        if (sizeWrapper) sizeWrapper.style.display = "flex";
      } else {
        btnMail.className =
          "py-3 px-4 border-2 border-gray-900 bg-red-50/50 text-[#b91c1c] font-['Oswald'] font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer transition shadow-[2px_2px_0px_0px_#0f172a]";
        btnPackage.className =
          "py-3 px-4 border-2 border-gray-300 bg-white text-gray-700 font-['Oswald'] font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer transition hover:border-gray-900";
        if (sizeWrapper) sizeWrapper.style.display = "none";
      }
    };

    if (btnPackage)
      btnPackage.addEventListener("click", () => setItemType("PACKAGE"));
    if (btnMail) btnMail.addEventListener("click", () => setItemType("MAIL"));
    const btnCalculate = document.querySelector("#btn-run-calculate");
    const weightInput = document.querySelector("#calc-weight-input");
    const sizeSelect = document.querySelector("#calc-size-select");

    const triggerCalculate = () => {
      if (this.onCalculate) {
        this.onCalculate({
          scope: this.currentScope,
          itemType: this.currentItemType,
          weightKg: weightInput?.value || 1,
          size: sizeSelect?.value || "SMALL",
        });
      }
    };

    if (btnCalculate) btnCalculate.addEventListener("click", triggerCalculate);
  }

  showLoading() {
    const box = document.querySelector("#calc-result-box");
    if (box) {
      box.innerHTML = /*html*/ `
        <div class="p-4 bg-gray-100 border-2 border-gray-300 text-xs font-mono uppercase tracking-wider text-gray-600 rounded-none text-center mt-2">
          Hệ thống đang đối soát bảng cước...
        </div>
      `;
    }
  }

  renderError(msg) {
    const box = document.querySelector("#calc-result-box");
    if (box) {
      box.innerHTML = /*html*/ `
        <div class="p-4 bg-red-50 border-2 border-[#b91c1c] text-xs font-bold uppercase tracking-wider text-[#b91c1c] rounded-none flex items-center gap-2 mt-2">
          <img src="${alertCircleIcon}" class="w-4 h-4 shrink-0" alt="" />
          <span>${msg}</span>
        </div>
      `;
    }
  }

  renderResult(res) {
    const box = document.querySelector("#calc-result-box");
    if (!box || !res) return;

    box.innerHTML = /*html*/ `
      <div class="mt-4 p-5 bg-[#0f172a] text-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#f59e0b] rounded-none flex flex-col gap-3">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-700 pb-2.5 gap-1">
          <span class="text-xs font-bold uppercase tracking-wider text-[#f59e0b] flex items-center gap-1.5">
            <img src="${checkSquareIcon}" class="w-4 h-4 text-[#f59e0b]" alt="" />
            <span>KẾT QUẢ DỰ TOÁN CƯỚC PHÍ</span>
          </span>
          <span class="text-[11px] font-mono text-gray-400 uppercase">
            ${res.scopeText} • ${res.itemTypeText} • ${res.weightText}
          </span>
        </div>

        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 pt-1">
          <div>
            <div class="text-[11px] uppercase tracking-wide text-gray-400">Thời gian toàn trình dự kiến:</div>
            <div class="text-sm font-['Oswald'] font-bold text-gray-200 uppercase tracking-wide mt-0.5">
              ${res.estimatedDays}
            </div>
          </div>

          <div class="text-left sm:text-right">
            <div class="text-[11px] uppercase tracking-wide text-gray-400">Cước phí ước tính:</div>
            <div class="text-3xl font-['Oswald'] font-bold text-[#f59e0b] tracking-wider mt-0.5">
              ${res.formattedPrice}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
