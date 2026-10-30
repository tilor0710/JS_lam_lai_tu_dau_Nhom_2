import { BaseView } from "../../../base/baseView.js";
import mapPinIcon from "lucide-static/icons/map-pin.svg";
import plusIcon from "lucide-static/icons/plus.svg";
import trashIcon from "lucide-static/icons/trash.svg";
import { Popup } from "../../../components/Popup.js";
import {
  ADMIN_PAGE_SIZE,
  getPageItems,
  getPaginationTemplate,
} from "./AdminPagination.js";

export class AdminLocationsView extends BaseView {
  constructor() {
    super("#app-content");
    this.onCreateLocation = null;
    this.onDeleteLocation = null;
    this.onPageChange = null;
    this.currentPage = 1;
  }

  getTemplate(locations = []) {
    const totalPages = Math.ceil(locations.length / ADMIN_PAGE_SIZE);
    this.currentPage = Math.min(this.currentPage, Math.max(totalPages, 1));
    const pageLocations = getPageItems(locations, this.currentPage);

    return /*html*/ `
      <div class="flex min-w-0 flex-col gap-4 sm:gap-6">

        <div class="flex flex-col items-stretch justify-between gap-4 border-l-4 border-[#f59e0b] pl-3 sm:flex-row sm:items-end sm:pl-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">Hạ tầng điểm phát</span>
            <h1 class="mt-0.5 text-2xl font-bold font-['Oswald'] uppercase text-gray-900 sm:text-3xl">MẠNG LƯỚI BƯU CỤC</h1>
          </div>
          <button id="btn-toggle-loc" class="flex w-full items-center justify-center gap-1.5 rounded-none bg-gray-900 px-4 py-2.5 font-['Oswald'] text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#b91c1c] sm:w-auto">
            <img src="${plusIcon}" class="w-4 h-4 invert brightness-0" alt="" />
            <span>Thêm bưu cục mới</span>
          </button>
        </div>


        <!-- Form thêm bưu cục -->
        <div id="create-loc-panel" class="hidden rounded-none border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_#b91c1c] sm:p-5">
          <h3 class="font-['Oswald'] font-bold text-lg text-gray-900 uppercase mb-4 border-b border-gray-200 pb-2">
            Đăng ký điểm bưu cục mới lên bản đồ
          </h3>
          <form id="form-create-loc" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-bold uppercase tracking-wider text-gray-700">
            <div class="flex flex-col gap-1">
              <label>Tên bưu cục:</label>
              <input id="loc-name" type="text" required placeholder="Bưu cục Quận 7..." class="border-2 border-gray-900 p-2 text-xs font-medium text-gray-900 outline-none rounded-none" />
            </div>
            <div class="flex flex-col gap-1">
              <label>Địa chỉ cụ thể:</label>
              <input id="loc-address" type="text" required placeholder="123 Nguyễn Thị Thập..." class="border-2 border-gray-900 p-2 text-xs font-medium text-gray-900 outline-none rounded-none" />
            </div>
            <div class="flex flex-col gap-1">
              <label>Số Hotline:</label>
              <input id="loc-phone" type="text" required placeholder="028.3775..." class="border-2 border-gray-900 p-2 text-xs font-mono font-medium text-gray-900 outline-none rounded-none" />
            </div>
            <div class="flex flex-col gap-1">
              <label>Vĩ độ (Latitude):</label>
              <input id="loc-lat" type="number" step="0.0001" required value="10.7328" class="border-2 border-gray-900 p-2 text-xs font-mono font-medium text-gray-900 outline-none rounded-none" />
            </div>
            <div class="flex flex-col gap-1">
              <label>Kinh độ (Longitude):</label>
              <input id="loc-lng" type="number" step="0.0001" required value="106.7188" class="border-2 border-gray-900 p-2 text-xs font-mono font-medium text-gray-900 outline-none rounded-none" />
            </div>
            <div class="flex flex-col gap-1">
              <label>Giờ làm việc:</label>
              <input id="loc-hours" type="text" value="07:30 - 18:30" class="border-2 border-gray-900 p-2 text-xs font-medium text-gray-900 outline-none rounded-none" />
            </div>
            <div class="sm:col-span-2 lg:col-span-3 flex justify-end gap-2 pt-2">
              <button type="button" id="btn-cancel-loc" class="px-4 py-2 border-2 border-gray-400 text-gray-600 font-['Oswald'] text-xs font-bold uppercase rounded-none hover:bg-gray-100 cursor-pointer">Hủy</button>
              <button type="submit" class="px-6 py-2 bg-[#b91c1c] text-white font-['Oswald'] text-xs font-bold uppercase rounded-none transition cursor-pointer">Lưu điểm bưu cục</button>
            </div>
          </form>
        </div>


        <!-- Danh sách và thao tác với các bưu cục -->
        <div class="min-w-0 overflow-x-auto rounded-none border-2 border-gray-900 bg-white shadow-[4px_4px_0px_0px_#0f172a] sm:shadow-[6px_6px_0px_0px_#0f172a]">
          <table class="w-full min-w-[900px] border-collapse text-left text-xs">
            <thead>
              <tr class="bg-gray-100 border-b-2 border-gray-900 font-['Oswald'] uppercase text-gray-800 tracking-wider">
                <th class="p-3 border-r border-gray-300">ID</th>
                <th class="p-3 border-r border-gray-300">Tên Bưu Cục</th>
                <th class="p-3 border-r border-gray-300">Địa Chỉ</th>
                <th class="p-3 border-r border-gray-300">Hotline</th>
                <th class="p-3 border-r border-gray-300">Tọa Độ (Lat, Lng)</th>
                <th class="p-3 border-r border-gray-300">Giờ Mở Cửa</th>
                <th class="p-3 text-center">Xóa</th>
              </tr>
            </thead>
            <tbody class="divide-y border-b-2 border-gray-900 font-medium">
              ${pageLocations
                .map(
                  (loc) => /*html*/ `
                <tr class="hover:bg-amber-50/30 transition">
                  <td class="p-3 font-mono font-bold text-gray-500">#${loc.id}</td>
                  <td class="p-3 font-['Oswald'] font-bold text-gray-900 text-sm uppercase">${loc.name}</td>
                  <td class="p-3 text-gray-600">${loc.address}</td>
                  <td class="p-3 font-mono">${loc.phone || "---"}</td>
                  <td class="p-3 font-mono text-gray-500 text-[11px]">${loc.lat}, ${loc.lng}</td>
                  <td class="p-3 text-gray-700">${loc.operatingHours || "07:30 - 18:30"}</td>
                  <td class="p-3 text-center">
                    <button data-id="${loc.id}" class="btn-delete-loc p-1.5 border border-red-200 bg-red-50 text-[#b91c1c] hover:bg-[#b91c1c] hover:text-white transition cursor-pointer">
                      <img src="${trashIcon}" class="w-3.5 h-3.5" alt="Delete" />
                    </button>
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
          ${getPaginationTemplate(locations.length, this.currentPage)}
        </div>

      </div>
    `;
  }

  run() {
    document
      .querySelector("#admin-pagination")
      ?.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-page]");
        const page = Number(button?.dataset.page);
        if (button && !button.disabled && page !== this.currentPage) {
          this.onPageChange?.(page);
        }
      });

    const toggle = document.querySelector("#btn-toggle-loc");
    const panel = document.querySelector("#create-loc-panel");
    const cancel = document.querySelector("#btn-cancel-loc");

    toggle?.addEventListener("click", () => panel?.classList.toggle("hidden"));
    cancel?.addEventListener("click", () => panel?.classList.add("hidden"));

    document
      .querySelector("#form-create-loc")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const payload = {
          name: document.querySelector("#loc-name")?.value || "",
          address: document.querySelector("#loc-address")?.value || "",
          phone: document.querySelector("#loc-phone")?.value || "",
          lat: parseFloat(document.querySelector("#loc-lat")?.value),
          lng: parseFloat(document.querySelector("#loc-lng")?.value),
          operatingHours:
            document.querySelector("#loc-hours")?.value || "07:30 - 18:30",
          postalCode: "700000",
        };
        if (this.onCreateLocation) this.onCreateLocation(payload);
      });

    document.querySelectorAll(".btn-delete-loc").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.id;
        const confirmed = await Popup.confirm(
          "Bạn có chắc chắn muốn xóa bưu cục này khỏi mạng lưới?",
          {
            title: "Xóa bưu cục?",
            type: "warning",
            confirmText: "Xóa bưu cục",
          },
        );
        if (confirmed) {
          if (this.onDeleteLocation) this.onDeleteLocation(id);
        }
      });
    });
  }
}
