import { BaseView } from "../../../base/baseView.js";
import packageIcon from "lucide-static/icons/package.svg";
import mapPinIcon from "lucide-static/icons/map-pin.svg";
import shoppingBagIcon from "lucide-static/icons/shopping-bag.svg";
import dollarSignIcon from "lucide-static/icons/dollar-sign.svg";

export class AdminDashboardView extends BaseView {
  constructor() {
    super("#app-content");
  }

  getTemplate(data = {}) {
    const {
      totalShipments = 3,
      totalLocations = 7,
      totalProducts = 6,
      recentShipments = [],
    } = data;

    return /*html*/ `
      <div class="flex min-w-0 flex-col gap-5 sm:gap-8">


        <div class="border-l-4 border-[#b91c1c] pl-4">
          <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Giám sát hoạt động</span>
          <h1 class="mt-0.5 text-2xl font-bold font-['Oswald'] uppercase tracking-wide text-gray-900 sm:text-3xl">
            TỔNG QUAN HỆ THỐNG
          </h1>
        </div>


        <!-- Thống kê hoạt động hệ thống -->
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">

          <div class="flex items-center justify-between rounded-none border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_#0f172a] sm:p-5">
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-gray-500">Vận Đơn Hoạt Động</span>
              <div class="text-3xl font-['Oswald'] font-extrabold text-[#b91c1c] mt-1">${totalShipments}</div>
              <span class="text-[10px] text-emerald-600 font-bold uppercase tracking-wide mt-1 block">Toàn mạng lưới</span>
            </div>
            <div class="bg-red-50 p-3 border border-red-200">
              <img src="${packageIcon}" class="w-6 h-6 text-[#b91c1c]" alt="" />
            </div>
          </div>

          <div class="flex items-center justify-between rounded-none border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_#0f172a] sm:p-5">
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-gray-500">Điểm Bưu Cục</span>
              <div class="text-3xl font-['Oswald'] font-extrabold text-gray-900 mt-1">${totalLocations}</div>
              <span class="text-[10px] text-emerald-600 font-bold uppercase tracking-wide mt-1 block">Đang hoạt động</span>
            </div>
            <div class="bg-amber-50 p-3 border border-amber-200">
              <img src="${mapPinIcon}" class="w-6 h-6 text-[#f59e0b]" alt="" />
            </div>
          </div>

          <div class="flex items-center justify-between rounded-none border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_#0f172a] sm:p-5">
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-gray-500">Mặt Hàng Vật Tư</span>
              <div class="text-3xl font-['Oswald'] font-extrabold text-gray-900 mt-1">${totalProducts}</div>
              <span class="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-1 block">Có sẵn trong kho</span>
            </div>
            <div class="bg-blue-50 p-3 border border-blue-200">
              <img src="${shoppingBagIcon}" class="w-6 h-6 text-blue-600" alt="" />
            </div>
          </div>

          <div class="flex items-center justify-between rounded-none border-2 border-gray-900 bg-[#0f172a] p-4 text-white shadow-[4px_4px_0px_0px_#f59e0b] sm:p-5">
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#f59e0b]">Doanh Thu Ước Tính</span>
              <div class="text-2xl font-['Oswald'] font-extrabold text-white mt-1">130.000 ₫</div>
              <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wide mt-1 block">Cước phí & Shop</span>
            </div>
            <div class="bg-slate-800 p-3 border border-slate-700">
              <img src="${dollarSignIcon}" class="w-6 h-6 invert brightness-0" alt="" />
            </div>
          </div>

        </div>


        <!-- Bảng vận đơn gần đây -->
        <div class="rounded-none border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_#0f172a] sm:p-6 sm:shadow-[6px_6px_0px_0px_#0f172a]">
          <div class="flex justify-between items-center border-b-2 border-gray-200 pb-4 mb-4">
            <div>
              <h2 class="font-['Oswald'] font-bold text-xl uppercase tracking-wider text-gray-900">
                VẬN ĐƠN CẦN THEO DÕI GẦN NHẤT
              </h2>
              <p class="text-xs text-gray-500 mt-0.5">Dữ liệu bưu gửi đọc trực tiếp từ db.json</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-gray-100 border-2 border-gray-900 font-['Oswald'] uppercase text-gray-800 tracking-wider">
                  <th class="p-3 border-r border-gray-300">Mã Vận Đơn</th>
                  <th class="p-3 border-r border-gray-300">Lộ Trình</th>
                  <th class="p-3 border-r border-gray-300">Gói Dịch Vụ</th>
                  <th class="p-3 border-r border-gray-300">Cước Phí</th>
                  <th class="p-3">Trạng Thái</th>
                </tr>
              </thead>
              <tbody class="divide-y border-x-2 border-b-2 border-gray-900 font-medium">
                ${recentShipments
                  .map(
                    (s) => /*html*/ `
                  <tr class="hover:bg-red-50/40 transition">
                    <td class="p-3 font-mono font-bold text-[#b91c1c]">${s.id}</td>
                    <td class="p-3 text-gray-700">${s.sender} ➔ ${s.receiver}</td>
                    <td class="p-3"><span class="bg-gray-100 text-gray-800 font-mono px-2 py-0.5 border border-gray-300 font-bold">${s.serviceType}</span></td>
                    <td class="p-3 font-mono font-bold">${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(s.shippingFee || 0)}</td>
                    <td class="p-3">
                      <span class="text-[10px] font-bold uppercase px-2 py-0.5 border ${
                        s.currentStatus === "DELIVERED"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : "bg-amber-50 text-amber-700 border-amber-300"
                      }">
                        ${s.currentStatus}
                      </span>
                    </td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }
}
