import { BaseView } from "../../../base/baseView.js";
import lockIcon from "lucide-static/icons/lock.svg";
import mailIcon from "lucide-static/icons/mail.svg";
import logInIcon from "lucide-static/icons/log-in.svg";
import alertCircleIcon from "lucide-static/icons/alert-circle.svg";
import arrowRightIcon from "lucide-static/icons/arrow-right.svg";

export class LoginView extends BaseView {
  constructor() {
    super("#app-content");
    this.onSubmit = null;
  }

  getTemplate() {
    return /*html*/ `
      <section class="min-h-[75vh] flex items-center justify-center py-12 px-4 bg-[#f8fafc]">
        <div class="w-full max-w-md bg-white border-2 border-gray-900 shadow-[8px_8px_0px_0px_#b91c1c] p-6 sm:p-8 rounded-none">

          <div class="border-b-2 border-gray-900 pb-4 mb-6">
            <span class="text-[11px] font-bold uppercase tracking-widest text-[#b91c1c] block">
              Hệ thống định danh QuickShip
            </span>
            <h1 class="font-['Oswald'] font-bold text-2xl sm:text-3xl uppercase tracking-wider text-gray-900 mt-1">
              ĐĂNG NHẬP
            </h1>
            <p class="text-xs text-gray-500 mt-1">
              Truy cập tài khoản để quản lý đơn vận chuyển hoặc kho vật tư
            </p>
          </div>

          <div id="login-error-box" class="hidden mb-4 p-3 bg-red-50 border-2 border-[#b91c1c] text-xs font-bold uppercase tracking-wider text-[#b91c1c] rounded-none flex items-center gap-2">
            <img src="${alertCircleIcon}" class="w-4 h-4 shrink-0 text-[#b91c1c]" alt="" />
            <span id="login-error-message"></span>
          </div>

          <!-- Form đăng nhập và nút xác nhận -->
          <form id="login-form" class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-700">Email đăng nhập:</label>
              <div class="flex border-2 border-gray-900 focus-within:border-[#b91c1c] transition rounded-none">
                <div class="bg-gray-100 p-2.5 border-r-2 border-gray-900 flex items-center">
                  <img src="${mailIcon}" class="w-4 h-4 text-gray-600" alt="" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  class="flex-1 px-3 py-2 text-sm text-gray-900 outline-none bg-white rounded-none"
                />
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-700">Mật khẩu:</label>
              <div class="flex border-2 border-gray-900 focus-within:border-[#b91c1c] transition rounded-none">
                <div class="bg-gray-100 p-2.5 border-r-2 border-gray-900 flex items-center">
                  <img src="${lockIcon}" class="w-4 h-4 text-gray-600" alt="" />
                </div>
                <input
                  id="login-password"
                  type="password"
                  required
                  placeholder="••••••••"
                  class="flex-1 px-3 py-2 text-sm text-gray-900 outline-none bg-white rounded-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              class="mt-2 w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white py-3 px-4 font-['Oswald'] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-gray-900 shadow-[3px_3px_0px_0px_#0f172a] transition cursor-pointer rounded-none active:translate-x-0.5 active:translate-y-0.5"
            >
              <img src="${logInIcon}" class="w-4 h-4 invert brightness-0" alt="" />
              <span>ĐĂNG NHẬP HỆ THỐNG</span>
            </button>
          </form>

          <div class="mt-6 pt-4 border-t-2 border-gray-100 text-center text-xs text-gray-600">
            Chưa có tài khoản thành viên?
            <a href="/register" class="font-bold text-[#b91c1c] uppercase hover:underline ml-1 inline-flex items-center gap-0.5">
              Đăng ký ngay <img src="${arrowRightIcon}" class="w-3 h-3 text-[#b91c1c]" alt="" />
            </a>
          </div>

        </div>
      </section>
    `;
  }

  run() {
    const form = document.querySelector("#login-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.clearError();
        const email = document.querySelector("#login-email")?.value || "";
        const password = document.querySelector("#login-password")?.value || "";
        if (this.onSubmit) this.onSubmit(email, password);
      });
    }
  }

  showError(message) {
    const errorBox = document.querySelector("#login-error-box");
    const errorMsg = document.querySelector("#login-error-message");
    if (errorBox && errorMsg) {
      errorMsg.textContent = message;
      errorBox.classList.remove("hidden");
    }
  }

  clearError() {
    const errorBox = document.querySelector("#login-error-box");
    if (errorBox) errorBox.classList.add("hidden");
  }
}
