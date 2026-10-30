import { BaseView } from "../../../base/baseView.js";
import plusIcon from "lucide-static/icons/plus.svg";
import trashIcon from "lucide-static/icons/trash.svg";
import {
  ADMIN_PAGE_SIZE,
  getPageItems,
  getPaginationTemplate,
} from "./AdminPagination.js";

export class AdminProductsView extends BaseView {
  constructor() {
    super("#app-content");
    this.onCreateProduct = null;
    this.onDeleteProduct = null;
    this.onPageChange = null;
    this.currentPage = 1;
  }

  getTemplate(products = []) {
    const totalPages = Math.ceil(products.length / ADMIN_PAGE_SIZE);
    this.currentPage = Math.min(this.currentPage, Math.max(totalPages, 1));
    const pageProducts = getPageItems(products, this.currentPage);

    return /*html*/ `
      <div class="flex min-w-0 flex-col gap-4 sm:gap-6">

        <div class="flex flex-col items-stretch justify-between gap-4 border-l-4 border-gray-900 pl-3 sm:flex-row sm:items-end sm:pl-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Quản trị kho hàng</span>
            <h1 class="mt-0.5 text-2xl font-bold font-['Oswald'] uppercase text-gray-900 sm:text-3xl">KHO VẬT TƯ ĐÓNG GÓI</h1>
          </div>
          <button id="btn-toggle-prod" class="flex w-full items-center justify-center gap-1.5 rounded-none bg-gray-900 px-4 py-2.5 font-['Oswald'] text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#b91c1c] sm:w-auto">
            <img src="${plusIcon}" class="w-4 h-4 invert brightness-0" alt="" />
            <span>Thêm vật tư mới</span>
          </button>
        </div>


        <!-- Form thêm vật tư vào kho -->
        <div id="create-prod-panel" class="hidden rounded-none border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_#f59e0b] sm:p-5">
          <h3 class="font-['Oswald'] font-bold text-lg text-gray-900 uppercase mb-4 border-b border-gray-200 pb-2">
            Nhập vật tư đóng gói mới vào kho
          </h3>
          <form id="form-create-prod" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold uppercase tracking-wider text-gray-700">
            <div class="flex flex-col gap-1 sm:col-span-2">
              <label>Tên mặt hàng:</label>
              <input id="prod-name" type="text" required placeholder="Thùng Carton 5 lớp chịu lực..." class="border-2 border-gray-900 p-2 text-xs font-medium text-gray-900 outline-none rounded-none" />
            </div>
            <div class="flex flex-col gap-1">
              <label>Phân loại (Category):</label>
              <select id="prod-cat" class="border-2 border-gray-900 p-2 text-xs font-medium text-gray-900 outline-none rounded-none bg-white">
                <option value="BOXES">BOXES (Hộp carton)</option>
                <option value="ENVELOPES">ENVELOPES (Bì thư khí)</option>
                <option value="PROTECTION">PROTECTION (Chống sốc)</option>
                <option value="TAPES">TAPES (Băng keo)</option>
                <option value="BAGS">BAGS (Túi niêm phong)</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label>Giá bán (VND):</label>
              <input id="prod-price" type="number" required value="25000" class="border-2 border-gray-900 p-2 text-xs font-mono font-medium text-gray-900 outline-none rounded-none" />
            </div>
            <div class="flex flex-col gap-1">
              <label>Tồn kho ban đầu:</label>
              <input id="prod-stock" type="number" required value="100" class="border-2 border-gray-900 p-2 text-xs font-mono font-medium text-gray-900 outline-none rounded-none" />
            </div>
            <div class="flex flex-col gap-1 sm:col-span-3">
              <label>Link ảnh sản phẩm (URL):</label>
              <input id="prod-image" type="url" required value="https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400" class="border-2 border-gray-900 p-2 text-xs font-mono font-medium text-gray-900 outline-none rounded-none" />
            </div>
            <div class="sm:col-span-2 lg:col-span-4 flex justify-end gap-2 pt-2 border-t border-gray-200">
              <button type="button" id="btn-cancel-prod" class="px-4 py-2 border-2 border-gray-400 text-gray-600 font-['Oswald'] text-xs font-bold uppercase rounded-none hover:bg-gray-100 cursor-pointer">Hủy</button>
              <button type="submit" class="px-6 py-2 bg-gray-900 text-white font-['Oswald'] text-xs font-bold uppercase rounded-none transition cursor-pointer">Lưu vật tư</button>
            </div>
          </form>
        </div>


        <!-- Danh sách vật tư trong kho -->
        <div class="min-w-0 overflow-x-auto rounded-none border-2 border-gray-900 bg-white shadow-[4px_4px_0px_0px_#0f172a] sm:shadow-[6px_6px_0px_0px_#0f172a]">
          <table class="w-full min-w-[720px] border-collapse text-left text-xs">
            <thead>
              <tr class="bg-gray-100 border-b-2 border-gray-900 font-['Oswald'] uppercase text-gray-800 tracking-wider">
                <th class="p-3 border-r border-gray-300">Hình Ảnh</th>
                <th class="p-3 border-r border-gray-300">Tên Mặt Hàng</th>
                <th class="p-3 border-r border-gray-300">Danh Mục</th>
                <th class="p-3 border-r border-gray-300">Đơn Giá</th>
                <th class="p-3 border-r border-gray-300">Tồn Kho</th>
                <th class="p-3 text-center">Xóa</th>
              </tr>
            </thead>
            <tbody class="divide-y border-b-2 border-gray-900 font-medium">
              ${pageProducts
                .map(
                  (p) => /*html*/ `
                <tr class="hover:bg-slate-50 transition">
                  <td class="p-3 w-16">
                    <img src="${p.image}" class="w-12 h-12 object-cover border border-gray-300" alt="" />
                  </td>
                  <td class="p-3 font-['Oswald'] font-bold text-gray-900 text-sm uppercase">${p.name}</td>
                  <td class="p-3"><span class="bg-gray-100 text-gray-700 font-mono px-2 py-0.5 border border-gray-300 font-bold">${p.category}</span></td>
                  <td class="p-3 font-mono font-bold text-[#b91c1c]">${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p.price || 0)}</td>
                  <td class="p-3 font-mono font-bold">${p.stock} cái</td>
                  <td class="p-3 text-center">
                    <button data-id="${p.id}" class="btn-delete-prod p-1.5 border border-red-200 bg-red-50 text-[#b91c1c] hover:bg-[#b91c1c] hover:text-white transition cursor-pointer">
                      <img src="${trashIcon}" class="w-3.5 h-3.5" alt="Delete" />
                    </button>
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
          ${getPaginationTemplate(products.length, this.currentPage)}
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

    const toggle = document.querySelector("#btn-toggle-prod");
    const panel = document.querySelector("#create-prod-panel");
    const cancel = document.querySelector("#btn-cancel-prod");

    toggle?.addEventListener("click", () => panel?.classList.toggle("hidden"));
    cancel?.addEventListener("click", () => panel?.classList.add("hidden"));

    document
      .querySelector("#form-create-prod")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const payload = {
          name: document.querySelector("#prod-name")?.value || "",
          category: document.querySelector("#prod-cat")?.value || "BOXES",
          price: Number(document.querySelector("#prod-price")?.value) || 20000,
          stock: Number(document.querySelector("#prod-stock")?.value) || 50,
          image: document.querySelector("#prod-image")?.value || "",
        };
        if (this.onCreateProduct) this.onCreateProduct(payload);
      });

    document.querySelectorAll(".btn-delete-prod").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;
        if (confirm("Bạn có chắc chắn muốn xóa mặt hàng này khỏi kho?")) {
          if (this.onDeleteProduct) this.onDeleteProduct(id);
        }
      });
    });
  }
}
