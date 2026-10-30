import { BaseView } from "../../../base/baseView.js";
import userIcon from "lucide-static/icons/user.svg";
import mailIcon from "lucide-static/icons/mail.svg";
import phoneIcon from "lucide-static/icons/phone.svg";
import packageIcon from "lucide-static/icons/package.svg";
import logOutIcon from "lucide-static/icons/log-out.svg";
import shoppingBagIcon from "lucide-static/icons/shopping-bag.svg";

export class UserDashboardView extends BaseView {
  constructor() {
    super("#app-content");
    this.onLogout = null;
  }

  getTemplate(user = {}) {
    return /*html*/ `
      <section class="max-w-6xl mx-auto px-4 py-10">


        <!-- Hồ sơ thành viên và nút đăng xuất -->
        <div class="bg-white border-2 border-gray-900 shadow-[6px_6px_0px_0px_#0f172a] p-6 sm:p-8 rounded-none mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-[#b91c1c] text-white flex items-center justify-center font-['Oswald'] font-bold text-2xl border-2 border-gray-900 shadow-[2px_2px_0px_0px_#0f172a]">
              ${(user.name || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <span class="text-[10px] font-mono font-bold uppercase tracking-widest text-[#b91c1c] bg-red-50 border border-red-200 px-2 py-0.5">
                ${user.role === "ADMIN" ? "QUẢN TRỊ VIÊN HỆ THỐNG" : "KHÁCH HÀNG THÀNH VIÊN"}
              </span>
              <h1 class="text-2xl sm:text-3xl font-bold font-['Oswald'] text-gray-900 uppercase mt-1">
                ${user.name || "Khách hàng QuickShip"}
              </h1>
              <p class="text-xs text-gray-500 font-mono">Mã thành viên: #QS-${user.id || "00"}</p>
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
                <span>Email: <b class="text-gray-900 font-mono">${user.email || "---"}</b></span>
              </div>
              <div class="flex items-center gap-2 text-gray-700">
                <img src="${phoneIcon}" class="w-4 h-4 text-gray-400" alt="" />
                <span>Số điện thoại: <b class="text-gray-900 font-mono">${user.phone || "---"}</b></span>
              </div>
              <div class="flex items-center gap-2 text-gray-700">
                <img src="${userIcon}" class="w-4 h-4 text-gray-400" alt="" />
                <span>Vai trò: <b class="text-[#b91c1c] uppercase font-bold">${user.role || "USER"}</b></span>
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
                  <img src="${packageIcon}" class="w-4 h-4 text-[#b91c1c]" alt="" />
                  <span>Vận đơn gửi gần đây</span>
                </div>
                <div class="text-2xl font-['Oswald'] font-bold text-gray-900 mt-2">1 Kiện</div>
              </div>

              <div class="bg-white border-2 border-gray-900 p-4 shadow-[3px_3px_0px_0px_#0f172a] rounded-none">
                <div class="flex items-center gap-2 text-gray-500 text-xs uppercase font-bold">
                  <img src="${shoppingBagIcon}" class="w-4 h-4 text-[#f59e0b]" alt="" />
                  <span>Đơn vật tư đã mua</span>
                </div>
                <div class="text-2xl font-['Oswald'] font-bold text-gray-900 mt-2">0 Đơn</div>
              </div>
            </div>


            <div class="bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#0f172a] p-6 rounded-none">
              <h3 class="font-['Oswald'] font-bold text-lg uppercase tracking-wider text-gray-900 border-b-2 border-gray-100 pb-2 mb-4">
                Vận đơn gần nhất của bạn
              </h3>

              <div class="p-4 bg-gray-50 border-2 border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 rounded-none">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-mono font-bold text-sm text-[#b91c1c]">SP123456789VN</span>
                    <span class="bg-amber-50 text-amber-700 border border-amber-300 text-[10px] font-bold uppercase px-1.5 py-0.2">
                      OUT_FOR_DELIVERY
                    </span>
                  </div>
                  <p class="text-xs text-gray-600 mt-1">Hà Nội Hub ➔ Nguyễn Văn A - TP.HCM</p>
                </div>
                <a href="/" class="text-xs font-['Oswald'] font-bold uppercase text-[#b91c1c] hover:underline">
                  Xem lộ trình ➔
                </a>
              </div>
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
