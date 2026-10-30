import { BaseView } from "../../../base/baseView.js";
import { HeroSection } from "./HeroSection.js";
import truckIcon from "lucide-static/icons/truck.svg";
import clockIcon from "lucide-static/icons/clock.svg";
import alertCircleIcon from "lucide-static/icons/alert-circle.svg";

export class HomeView extends BaseView {
  constructor() {
    super("#app-content");
    this.onTrack = null;
  }

  getTemplate() {
    return /*html*/ `
      <div class="home-page">
        <!-- Banner, tra cứu vận đơn và tiện ích trang chủ -->
        ${HeroSection.getTemplate()}

      </div>
    `;
  }

  run() {
    const input = document.querySelector("#tracking-input");
    const btn = document.querySelector("#tracking-btn");

    const handleSearch = () => {
      const code = input?.value.trim() || "";
      if (this.onTrack) {
        this.onTrack(code);
      }
    };

    if (btn) btn.addEventListener("click", handleSearch);
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleSearch();
      });
    }
  }

  showLoading() {
    const resultBox = document.querySelector("#tracking-result");
    if (resultBox) {
      resultBox.innerHTML = /*html*/ `
        <div class="p-3 bg-gray-100 border border-gray-300 text-xs font-mono uppercase tracking-wider text-gray-600 rounded-none text-center">
          Đang truy xuất hệ thống bưu gửi...
        </div>
      `;
    }
  }

  renderError(message) {
    const resultBox = document.querySelector("#tracking-result");
    if (resultBox) {
      resultBox.innerHTML = /*html*/ `
        <div class="p-3 bg-red-50 border-2 border-[#b91c1c] text-xs font-bold uppercase tracking-wider text-[#b91c1c] rounded-none flex items-center gap-2">
          <img src="${alertCircleIcon}" class="w-4 h-4 shrink-0 text-[#b91c1c]" alt="" />
          <span>${message}</span>
        </div>
      `;
    }
  }

  renderTrackingResult(data) {
    const resultBox = document.querySelector("#tracking-result");
    if (!resultBox) return;

    if (!data) {
      this.renderError("Không tìm thấy thông tin mã vận đơn trên hệ thống!");
      return;
    }
    const summaryHtml = /*html*/ `
      <div class="bg-gray-50 border-2 border-gray-900 p-3.5 flex flex-col gap-1.5 rounded-none mt-1">
        <div class="flex justify-between items-center border-b border-gray-200 pb-1.5">
          <span class="font-['Oswald'] font-bold text-sm text-[#b91c1c] uppercase tracking-wide">
            VẬN ĐƠN: ${data.id}
          </span>
          <span class="bg-gray-900 text-[#f59e0b] text-[10px] font-mono px-2 py-0.5 uppercase font-bold">
            ${data.serviceType}
          </span>
        </div>
        <div class="text-xs text-gray-700 flex flex-col gap-0.5 mt-1">
          <div><b class="text-gray-900 uppercase text-[10px]">Từ:</b> ${data.sender}</div>
          <div><b class="text-gray-900 uppercase text-[10px]">Đến:</b> ${data.receiver}</div>
          <div><b class="text-gray-900 uppercase text-[10px]">Cước phí:</b> ${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(data.shippingFee || 0)}</div>
        </div>
      </div>
    `;
    const timelineHtml = /*html*/ `
      <div class="mt-2 border-2 border-gray-900 bg-white p-3.5 flex flex-col gap-3 rounded-none max-h-56 overflow-y-auto">
        <div class="font-['Oswald'] font-bold text-xs uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-1 flex items-center gap-1.5">
          <img src="${truckIcon}" class="w-3.5 h-3.5 text-[#b91c1c]" alt="" />
          <span>Lịch trình vận chuyển chi tiết</span>
        </div>

        <div class="flex flex-col gap-3.5 border-l-2 border-[#b91c1c] ml-2 pl-3 py-1">
          ${(data.events || [])
            .map(
              (ev) => /*html*/ `
            <div class="relative flex flex-col gap-0.5">
              <span class="absolute -left-[18px] top-1 w-2.5 h-2.5 bg-[#b91c1c] border-2 border-white ring-1 ring-gray-900"></span>
              <span class="text-xs font-bold text-gray-900 uppercase tracking-wide">${ev.status}</span>
              <span class="text-[11px] text-gray-600">${ev.location}</span>
              <span class="text-[10px] font-mono text-gray-400 flex items-center gap-1 mt-0.5">
                <img src="${clockIcon}" class="w-3 h-3 text-gray-400" alt="" />
                ${ev.time}
              </span>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `;

    resultBox.innerHTML = summaryHtml + timelineHtml;
  }
}
