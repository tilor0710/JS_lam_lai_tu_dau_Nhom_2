import { BaseView } from "../../../base/baseView.js";
import packageIcon from "lucide-static/icons/package.svg";
import plusIcon from "lucide-static/icons/plus.svg";
import truckIcon from "lucide-static/icons/truck.svg";
import clockIcon from "lucide-static/icons/clock.svg";

export class AdminShipmentsView extends BaseView {
  constructor() {
    super("#app-content");
    this.onCreateShipment = null;
    this.onAddEvent = null;
  }

  getTemplate(shipments = []) {
    return /*html*/ `
      <div class="flex flex-col gap-6">


        <div class="border-l-4 border-[#b91c1c] pl-4 flex justify-between items-end">
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Phân hệ bưu chính</span>
            <h1 class="text-3xl font-bold font-['Oswald'] text-gray-900 uppercase mt-0.5">QUẢN LÝ VẬN ĐƠN</h1>
          </div>
          <button id="btn-toggle-create" class="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-4 py-2.5 font-['Oswald'] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition rounded-none shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer">
            <img src="${plusIcon}" class="w-4 h-4 invert brightness-0" alt="" />
            <span>Tiếp nhận đơn tại quầy</span>
          </button>
        </div>


        <!-- Form tiếp nhận vận đơn tại quầy -->
        <div id="create-shipment-panel" class="hidden bg-white border-2 border-gray-900 p-5 shadow-[4px_4px_0px_0px_#f59e0b] rounded-none">
          <h3 class="font-['Oswald'] font-bold text-lg text-gray-900 uppercase mb-4 border-b border-gray-200 pb-2">
            Lập phiếu gửi hàng tại quầy
          </h3>
          <form id="form-create-shipment" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold uppercase tracking-wider text-gray-700">
            <div class="flex flex-col gap-1">
              <label>Điểm gửi (Sender):</label>
              <input id="new-sender" type="text" required placeholder="Hà Nội Hub..." class="border-2 border-gray-900 p-2 text-xs font-medium text-gray-900 outline-none rounded-none" />
            </div>
            <div class="flex flex-col gap-1">
              <label>Người nhận & Địa chỉ:</label>
              <input id="new-receiver" type="text" required placeholder="Lê Văn A - Đà Nẵng..." class="border-2 border-gray-900 p-2 text-xs font-medium text-gray-900 outline-none rounded-none" />
            </div>
            <div class="flex flex-col gap-1">
              <label>Gói dịch vụ:</label>
              <select id="new-service" class="border-2 border-gray-900 p-2 text-xs font-medium text-gray-900 outline-none rounded-none bg-white">
                <option value="EXPRESS">EXPRESS (Hỏa tốc)</option>
                <option value="STANDARD">STANDARD (Tiêu chuẩn)</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label>Cước phí (VND):</label>
              <input id="new-fee" type="number" required value="35000" class="border-2 border-gray-900 p-2 text-xs font-mono font-medium text-gray-900 outline-none rounded-none" />
            </div>
            <div class="sm:col-span-2 lg:col-span-4 flex justify-end gap-2 pt-2">
              <button type="button" id="btn-cancel-create" class="px-4 py-2 border-2 border-gray-400 text-gray-600 font-['Oswald'] text-xs font-bold uppercase rounded-none hover:bg-gray-100 cursor-pointer">Hủy</button>
              <button type="submit" class="px-6 py-2 bg-gray-900 hover:bg-[#b91c1c] text-white font-['Oswald'] text-xs font-bold uppercase rounded-none transition cursor-pointer">Lưu & Tạo mã vận đơn</button>
            </div>
          </form>
        </div>


        <!-- Danh sách vận đơn và thao tác cập nhật chặng -->
        <div class="bg-white border-2 border-gray-900 shadow-[6px_6px_0px_0px_#0f172a] rounded-none overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-gray-100 border-b-2 border-gray-900 font-['Oswald'] uppercase text-gray-800 tracking-wider">
                <th class="p-3 border-r border-gray-300">Mã Vận Đơn</th>
                <th class="p-3 border-r border-gray-300">Nơi Gửi ➔ Nơi Nhận</th>
                <th class="p-3 border-r border-gray-300">Dịch Vụ</th>
                <th class="p-3 border-r border-gray-300">Cước Phí</th>
                <th class="p-3 border-r border-gray-300">Trạng Thái</th>
                <th class="p-3 border-r border-gray-300">Số Mốc Hành Trình</th>
                <th class="p-3 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody class="divide-y border-b-2 border-gray-900 font-medium">
              ${shipments
                .map(
                  (s) => /*html*/ `
                <tr class="hover:bg-red-50/30 transition">
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
                  <td class="p-3 font-mono">${(s.events || []).length} mốc</td>
                  <td class="p-3 text-center">
                    <button
                      data-id="${s.id}"
                      class="btn-open-dispatch bg-gray-900 hover:bg-[#b91c1c] text-white px-3 py-1 font-['Oswald'] text-[11px] font-bold uppercase tracking-wider transition rounded-none cursor-pointer"
                    >
                      + Cập nhật chặng
                    </button>
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>


        <!-- Cửa sổ cập nhật hành trình vận đơn -->
        <div id="modal-dispatch" class="hidden fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          <div class="bg-white border-2 border-gray-900 shadow-[8px_8px_0px_0px_#b91c1c] max-w-md w-full p-6 rounded-none">
            <div class="border-b-2 border-gray-900 pb-3 mb-4 flex justify-between items-center">
              <h3 class="font-['Oswald'] font-bold text-xl uppercase text-gray-900">Bắn sự kiện hành trình</h3>
              <span id="modal-target-code" class="font-mono font-bold text-[#b91c1c] text-sm"></span>
            </div>
            <form id="form-dispatch-event" class="flex flex-col gap-3.5 text-xs font-bold uppercase tracking-wider text-gray-700">
              <input type="hidden" id="modal-shipment-id" />
              <div class="flex flex-col gap-1">
                <label>Vị trí ghi nhận:</label>
                <input id="event-location" type="text" required placeholder="Bưu cục Cầu Giấy, Kho Tân Bình..." class="border-2 border-gray-900 p-2 text-xs font-medium text-gray-900 outline-none rounded-none" />
              </div>
              <div class="flex flex-col gap-1">
                <label>Trạng thái bưu gửi:</label>
                <select id="event-status" class="border-2 border-gray-900 p-2 text-xs font-medium text-gray-900 outline-none rounded-none bg-white">
                  <option value="Đã tiếp nhận kiện hàng">Đã tiếp nhận kiện hàng</option>
                  <option value="Đang luân chuyển liên tỉnh">Đang luân chuyển liên tỉnh</option>
                  <option value="Đến bưu cục phát">Đến bưu cục phát</option>
                  <option value="Đang phát hàng">Đang phát hàng</option>
                  <option value="Giao hàng thành công">Giao hàng thành công</option>
                </select>
              </div>
              <div class="flex justify-end gap-2 pt-3 border-t border-gray-200">
                <button type="button" id="btn-close-modal" class="px-4 py-2 border-2 border-gray-400 text-gray-600 font-['Oswald'] text-xs font-bold uppercase rounded-none hover:bg-gray-100 cursor-pointer">Đóng</button>
                <button type="submit" class="px-5 py-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-['Oswald'] text-xs font-bold uppercase rounded-none transition cursor-pointer">Cập nhật ngay</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    `;
  }

  run() {
    const toggleBtn = document.querySelector("#btn-toggle-create");
    const panel = document.querySelector("#create-shipment-panel");
    const cancelBtn = document.querySelector("#btn-cancel-create");

    toggleBtn?.addEventListener("click", () =>
      panel?.classList.toggle("hidden"),
    );
    cancelBtn?.addEventListener("click", () => panel?.classList.add("hidden"));
    document
      .querySelector("#form-create-shipment")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const payload = {
          sender: document.querySelector("#new-sender")?.value || "",
          receiver: document.querySelector("#new-receiver")?.value || "",
          serviceType:
            document.querySelector("#new-service")?.value || "STANDARD",
          shippingFee:
            Number(document.querySelector("#new-fee")?.value) || 30000,
        };
        if (this.onCreateShipment) this.onCreateShipment(payload);
      });
    const modal = document.querySelector("#modal-dispatch");
    document.querySelectorAll(".btn-open-dispatch").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;
        document.querySelector("#modal-shipment-id").value = id;
        document.querySelector("#modal-target-code").textContent = id;
        modal?.classList.remove("hidden");
      });
    });

    document
      .querySelector("#btn-close-modal")
      ?.addEventListener("click", () => {
        modal?.classList.add("hidden");
      });
    document
      .querySelector("#form-dispatch-event")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.querySelector("#modal-shipment-id")?.value;
        const eventData = {
          location: document.querySelector("#event-location")?.value || "",
          status: document.querySelector("#event-status")?.value || "",
        };
        if (this.onAddEvent) this.onAddEvent(id, eventData);
        modal?.classList.add("hidden");
      });
  }
}
