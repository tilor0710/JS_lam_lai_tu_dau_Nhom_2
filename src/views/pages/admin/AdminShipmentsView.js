import { BaseView } from "../../../base/baseView.js";
import packageIcon from "lucide-static/icons/package.svg";
import plusIcon from "lucide-static/icons/plus.svg";
import truckIcon from "lucide-static/icons/truck.svg";
import clockIcon from "lucide-static/icons/clock.svg";
import { Popup } from "../../../components/Popup.js";
import {
  ADMIN_PAGE_SIZE,
  getPageItems,
  getPaginationTemplate,
} from "./AdminPagination.js";

const escapeHTML = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

export class AdminShipmentsView extends BaseView {
  constructor() {
    super("#app-content");
    this.onCreateShipment = null;
    this.onAddEvent = null;
    this.onPageChange = null;
    this.currentPage = 1;
  }

  getTemplate(shipments = []) {
    const totalPages = Math.ceil(shipments.length / ADMIN_PAGE_SIZE);
    this.currentPage = Math.min(this.currentPage, Math.max(totalPages, 1));
    const pageShipments = getPageItems(shipments, this.currentPage);

    return /*html*/ `
      <div class="flex min-w-0 flex-col gap-4 sm:gap-6">


        <div class="flex flex-col items-stretch justify-between gap-4 border-l-4 border-[#b91c1c] pl-3 sm:flex-row sm:items-end sm:pl-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Phân hệ bưu chính</span>
            <h1 class="mt-0.5 text-2xl font-bold font-['Oswald'] uppercase text-gray-900 sm:text-3xl">QUẢN LÝ VẬN ĐƠN</h1>
          </div>
          <button id="btn-toggle-create" class="flex w-full items-center justify-center gap-1.5 rounded-none bg-[#b91c1c] px-4 py-2.5 font-['Oswald'] text-xs font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_#0f172a] transition hover:bg-[#991b1b] sm:w-auto">
            <img src="${plusIcon}" class="w-4 h-4 invert brightness-0" alt="" />
            <span>Tiếp nhận đơn tại quầy</span>
          </button>
        </div>


        <!-- Form tiếp nhận vận đơn tại quầy -->
        <div id="create-shipment-panel" class="hidden rounded-none border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_#f59e0b] sm:p-5">
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
        <div class="min-w-0 overflow-x-auto rounded-none border-2 border-gray-900 bg-white shadow-[4px_4px_0px_0px_#0f172a] sm:shadow-[6px_6px_0px_0px_#0f172a]">
          <table class="w-full min-w-[1000px] border-collapse text-left text-xs">
            <thead>
              <tr class="bg-gray-100 border-b-2 border-gray-900 font-['Oswald'] uppercase text-gray-800 tracking-wider">
                <th class="p-3 border-r border-gray-300">Mã Đơn / Vận Đơn</th>
                <th class="p-3 border-r border-gray-300">Khách Hàng ➔ Nơi Nhận</th>
                <th class="p-3 border-r border-gray-300">Loại Đơn</th>
                <th class="p-3 border-r border-gray-300">Tổng Tiền / Cước Phí</th>
                <th class="p-3 border-r border-gray-300">Trạng Thái</th>
                <th class="p-3 border-r border-gray-300">Sản Phẩm / Mốc Hành Trình</th>
                <th class="p-3 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody class="divide-y border-b-2 border-gray-900 font-medium">
              ${pageShipments
                .map(
                  (s) => {
                    const isOrder = s.recordType === "order";
                    const itemCount = Array.isArray(s.items) ? s.items.length : 0;
                    return /*html*/ `
                <tr class="hover:bg-red-50/30 transition">
                  <td class="p-3 font-mono font-bold text-[#b91c1c]">${escapeHTML(s.id)}</td>
                  <td class="p-3 text-gray-700">${escapeHTML(s.sender)} ➔ ${escapeHTML(s.receiver)}</td>
                  <td class="p-3"><span class="bg-gray-100 text-gray-800 font-mono px-2 py-0.5 border border-gray-300 font-bold">${isOrder ? "ĐƠN SHOP" : escapeHTML(s.serviceType)}</span></td>
                  <td class="p-3 font-mono font-bold">${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(isOrder ? s.totalAmount : s.shippingFee) || 0)}</td>
                  <td class="p-3">
                    <span class="text-[10px] font-bold uppercase px-2 py-0.5 border ${
                      s.currentStatus === "DELIVERED"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                        : "bg-amber-50 text-amber-700 border-amber-300"
                    }">
                      ${escapeHTML(s.currentStatus || "PENDING")}
                    </span>
                  </td>
                  <td class="p-3 font-mono">${isOrder ? `${itemCount} sản phẩm` : `${(s.events || []).length} mốc`}</td>
                  <td class="p-3 text-center">
                    ${
                      isOrder
                        ? '<span class="text-gray-500">Đơn hàng cửa hàng</span>'
                        : `<button
                            data-id="${escapeHTML(s.id)}"
                            class="btn-open-dispatch bg-gray-900 hover:bg-[#b91c1c] text-white px-3 py-1 font-['Oswald'] text-[11px] font-bold uppercase tracking-wider transition rounded-none cursor-pointer"
                          >
                            + Cập nhật chặng
                          </button>`
                    }
                  </td>
                </tr>
              `;
                  },
                )
                .join("")}
            </tbody>
          </table>
          ${getPaginationTemplate(shipments.length, this.currentPage)}
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
    document.querySelectorAll(".btn-open-dispatch").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.id;
        const submitted = await Popup.form({
          title: "Cập nhật hành trình",
          reference: id,
          submitText: "Cập nhật ngay",
          content: /*html*/ `
            <label class="flex flex-col gap-1.5">
              Vị trí ghi nhận
              <input name="location" type="text" required maxlength="200" placeholder="Bưu cục Cầu Giấy, Kho Tân Bình..." class="border-2 border-gray-900 p-2.5 text-sm font-medium normal-case text-gray-900 outline-none focus:border-[#b91c1c]" />
            </label>
            <label class="flex flex-col gap-1.5">
              Trạng thái bưu gửi
              <select name="status" required class="border-2 border-gray-900 bg-white p-2.5 text-sm font-medium normal-case text-gray-900 outline-none focus:border-[#b91c1c]">
                <option value="Đã tiếp nhận kiện hàng">Đã tiếp nhận kiện hàng</option>
                <option value="Đang luân chuyển liên tỉnh">Đang luân chuyển liên tỉnh</option>
                <option value="Đến bưu cục phát">Đến bưu cục phát</option>
                <option value="Đang phát hàng">Đang phát hàng</option>
                <option value="Giao hàng thành công">Giao hàng thành công</option>
              </select>
            </label>
          `,
          onSubmit: async (formData) => {
            await this.onAddEvent?.(id, {
              location: String(formData.location ?? "").trim(),
              status: String(formData.status ?? ""),
            });
          },
        });
        if (submitted) {
          await Popup.alert(`Đã cập nhật chặng mới cho đơn ${id}!`);
        }
      });
    });
  }
}
