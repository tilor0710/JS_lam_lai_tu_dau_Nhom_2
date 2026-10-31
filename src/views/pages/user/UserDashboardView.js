import { BaseView } from "../../../base/baseView.js";
import userIcon from "lucide-static/icons/user.svg";
import mailIcon from "lucide-static/icons/mail.svg";
import phoneIcon from "lucide-static/icons/phone.svg";
import packageIcon from "lucide-static/icons/package.svg";
import logOutIcon from "lucide-static/icons/log-out.svg";
import shoppingBagIcon from "lucide-static/icons/shopping-bag.svg";

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

const formatCurrency = (amount) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(Number(amount) || 0);

const formatDate = (date) => {
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? "Không xác định"
    : new Intl.DateTimeFormat("vi-VN").format(parsedDate);
};

export class UserDashboardView extends BaseView {
  constructor() {
    super("#app-content");
    this.onLogout = null;
  }

  getTemplate({ user = {}, orders = [], ordersError = "" } = {}) {
    const userOrders = Array.isArray(orders) ? orders : [];
    const orderCount = ordersError ? "—" : userOrders.length;
    const totalOrderValue = userOrders.reduce(
      (total, order) => total + (Number(order.totalAmount) || 0),
      0,
    );
    const totalOrderValueLabel = ordersError
      ? "—"
      : formatCurrency(totalOrderValue);
    const orderHistory = ordersError
      ? `<p role="alert" class="border-2 border-red-200 bg-red-50 p-4 text-sm text-red-800">${escapeHTML(ordersError)}</p>`
      : userOrders.length
        ? userOrders
            .slice(0, 5)
            .map((order) => {
              const items = Array.isArray(order.items) ? order.items : [];
              return /*html*/ `
                <article class="p-4 bg-gray-50 border-2 border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 rounded-none">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-mono font-bold text-sm text-[#b91c1c]">Đơn hàng #${escapeHTML(order.id)}</span>
                      <span class="bg-amber-50 text-amber-700 border border-amber-300 text-[10px] font-bold uppercase px-1.5 py-0.5">
                        ${escapeHTML(order.status || "PENDING")}
                      </span>
                    </div>
                    <p class="text-xs text-gray-600 mt-1">Ngày đặt: ${formatDate(order.createdAt)} · ${items.length} sản phẩm</p>
                  </div>
                  <span class="text-sm font-mono font-bold text-gray-900">${formatCurrency(order.totalAmount)}</span>
                </article>
              `;
            })
            .join("")
      : /*html*/ `
          <div class="p-6 bg-gray-50 border-2 border-gray-200 text-center">
            <p class="text-sm text-gray-600">Bạn chưa có đơn hàng nào.</p>
            <a href="/shop" class="inline-block mt-3 text-xs font-['Oswald'] font-bold uppercase text-[#b91c1c] hover:underline">
              Khám phá cửa hàng vật tư ➔
            </a>
          </div>
        `;

    return /*html*/ `
      <section class="max-w-6xl mx-auto px-4 py-10">


        <!-- Hồ sơ thành viên và nút đăng xuất -->
        <div class="bg-white border-2 border-gray-900 shadow-[6px_6px_0px_0px_#0f172a] p-6 sm:p-8 rounded-none mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-[#b91c1c] text-white flex items-center justify-center font-['Oswald'] font-bold text-2xl border-2 border-gray-900 shadow-[2px_2px_0px_0px_#0f172a]">
              ${escapeHTML((user.name || "U").charAt(0).toUpperCase())}
            </div>
            <div>
              <span class="text-[10px] font-mono font-bold uppercase tracking-widest text-[#b91c1c] bg-red-50 border border-red-200 px-2 py-0.5">
                ${user.role === "ADMIN" ? "QUẢN TRỊ VIÊN HỆ THỐNG" : "KHÁCH HÀNG THÀNH VIÊN"}
              </span>
              <h1 class="text-2xl sm:text-3xl font-bold font-['Oswald'] text-gray-900 uppercase mt-1">
                ${escapeHTML(user.name || "Khách hàng QuickShip")}
              </h1>
              <p class="text-xs text-gray-500 font-mono">Mã thành viên: #QS-${escapeHTML(user.id || "00")}</p>
            </div>
          </div>


          <button
            id="btn-user-logout"
            type="button"
            class="bg-red-50 hover:bg-[#b91c1c] text-[#b91c1c] hover:text-white border-2 border-[#b91c1c] px-5 py-2.5 text-xs font-['Oswald'] font-bold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer rounded-none"
          >
            <img src="${logOutIcon}" class="w-4 h-4" alt="" />
            <span>Đăng xuất</span>
          </button>
        </div>

        <!-- Thông tin tài khoản và hoạt động gần đây -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">


          <div class="bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#b91c1c] p-6 rounded-none flex flex-col gap-4">
            <h3 class="font-['Oswald'] font-bold text-lg uppercase tracking-wider text-gray-900 border-b-2 border-gray-100 pb-2">
              Thông tin định danh
            </h3>

            <div class="flex flex-col gap-3 text-xs">
              <div class="flex items-center gap-2 text-gray-700">
                <img src="${mailIcon}" class="w-4 h-4 text-gray-400" alt="" />
                <span>Email: <b class="text-gray-900 font-mono">${escapeHTML(user.email || "---")}</b></span>
              </div>
              <div class="flex items-center gap-2 text-gray-700">
                <img src="${phoneIcon}" class="w-4 h-4 text-gray-400" alt="" />
                <span>Số điện thoại: <b class="text-gray-900 font-mono">${escapeHTML(user.phone || "---")}</b></span>
              </div>
              <div class="flex items-center gap-2 text-gray-700">
                <img src="${userIcon}" class="w-4 h-4 text-gray-400" alt="" />
                <span>Vai trò: <b class="text-[#b91c1c] uppercase font-bold">${escapeHTML(user.role || "USER")}</b></span>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
              <a href="/shop" class="w-full text-center py-2.5 bg-gray-900 hover:bg-[#b91c1c] text-white text-xs font-['Oswald'] font-bold uppercase tracking-wider transition rounded-none">
                Đặt mua vật tư đóng gói ➔
              </a>
              <a href="/" class="w-full text-center py-2.5 border-2 border-gray-900 text-gray-900 hover:bg-gray-100 text-xs font-['Oswald'] font-bold uppercase tracking-wider transition rounded-none">
                Tra cứu bưu gửi khác
              </a>
            </div>
          </div>


          <div class="lg:col-span-2 flex flex-col gap-6">


            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white border-2 border-gray-900 p-4 shadow-[3px_3px_0px_0px_#0f172a] rounded-none">
                <div class="flex items-center gap-2 text-gray-500 text-xs uppercase font-bold">
                  <img src="${shoppingBagIcon}" class="w-4 h-4 text-[#b91c1c]" alt="" />
                  <span>Đơn hàng đã đặt</span>
                </div>
                <div class="text-2xl font-['Oswald'] font-bold text-gray-900 mt-2">${orderCount} Đơn</div>
              </div>

              <div class="bg-white border-2 border-gray-900 p-4 shadow-[3px_3px_0px_0px_#0f172a] rounded-none">
                <div class="flex items-center gap-2 text-gray-500 text-xs uppercase font-bold">
                  <img src="${packageIcon}" class="w-4 h-4 text-[#f59e0b]" alt="" />
                  <span>Tổng giá trị đơn hàng</span>
                </div>
                <div class="text-xl font-['Oswald'] font-bold text-gray-900 mt-2">${totalOrderValueLabel}</div>
              </div>
            </div>


            <div class="bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#0f172a] p-6 rounded-none">
              <h3 class="font-['Oswald'] font-bold text-lg uppercase tracking-wider text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">
                Đơn hàng gần đây của bạn
              </h3>

              <div class="flex flex-col gap-3">${orderHistory}</div>
            </div>

          </div>

        </div>

      </section>
    `;
  }

  run() {
    const logoutBtn = document.querySelector("#btn-user-logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        if (this.onLogout) this.onLogout();
      });
    }
  }
}
