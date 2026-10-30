import { BaseView } from "../../../base/baseView.js";
import userIcon from "lucide-static/icons/user.svg";
import mailIcon from "lucide-static/icons/mail.svg";
import lockIcon from "lucide-static/icons/lock.svg";
import phoneIcon from "lucide-static/icons/phone.svg";
import userPlusIcon from "lucide-static/icons/user-plus.svg";
import alertCircleIcon from "lucide-static/icons/alert-circle.svg";
import arrowLeftIcon from "lucide-static/icons/arrow-left.svg";

export class RegisterView extends BaseView {
  constructor() {
    super("#app-content");
    this.onSubmit = null;
  }

  getTemplate() {
    return /*html*/ `
      <section class="min-h-[75vh] flex items-center justify-center py-12 px-4 bg-[#f8fafc]">
        <div class="w-full max-w-md bg-white border-2 border-gray-900 shadow-[8px_8px_0px_0px_#f59e0b] p-6 sm:p-8 rounded-none">

          <div class="border-b-2 border-gray-900 pb-4 mb-6">
            <span class="text-[11px] font-bold uppercase tracking-widest text-[#f59e0b] block">
              Gia nhập QuickShip Network
            </span>
            <h1 class="font-['Oswald'] font-bold text-2xl sm:text-3xl uppercase tracking-wider text-gray-900 mt-1">
              ĐĂNG KÝ THÀNH VIÊN
            </h1>
            <p class="text-xs text-gray-500 mt-1">
              Tạo tài khoản để theo dõi lịch sử vận đơn và tích lũy ưu đãi cước phí
            </p>
          </div>

          <div id="register-error-box" class="hidden mb-4 p-3 bg-red-50 border-2 border-[#b91c1c] text-xs font-bold uppercase tracking-wider text-[#b91c1c] rounded-none flex items-center gap-2">
            <img src="${alertCircleIcon}" class="w-4 h-4 shrink-0 text-[#b91c1c]" alt="" />
            <span id="register-error-message"></span>
          </div>

          <!-- Form thông tin đăng ký thành viên -->
          <form id="register-form" class="flex flex-col gap-3.5">

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-700">Họ và tên:</label>
              <div class="flex border-2 border-gray-900 focus-within:border-[#b91c1c] transition rounded-none">
                <div class="bg-gray-100 p-2.5 border-r-2 border-gray-900 flex items-center">
                  <img src="${userIcon}" class="w-4 h-4 text-gray-600" alt="" />
                </div>
                <input id="reg-name" type="text" required placeholder="Nguyễn Văn A" class="flex-1 px-3 py-2 text-sm text-gray-900 outline-none bg-white rounded-none" />
              </div>
            </div>


            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-700">Email:</label>
              <div class="flex border-2 border-gray-900 focus-within:border-[#b91c1c] transition rounded-none">
                <div class="bg-gray-100 p-2.5 border-r-2 border-gray-900 flex items-center">
                  <img src="${mailIcon}" class="w-4 h-4 text-gray-600" alt="" />
                </div>
                <input id="reg-email" type="email" required placeholder="name@gmail.com" class="flex-1 px-3 py-2 text-sm text-gray-900 outline-none bg-white rounded-none" />
              </div>
            </div>


            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-700">Số điện thoại:</label>
              <div class="flex border-2 border-gray-900 focus-within:border-[#b91c1c] transition rounded-none">
                <div class="bg-gray-100 p-2.5 border-r-2 border-gray-900 flex items-center">
                  <img src="${phoneIcon}" class="w-4 h-4 text-gray-600" alt="" />
                </div>
                <input id="reg-phone" type="tel" required placeholder="0912345678" class="flex-1 px-3 py-2 text-sm text-gray-900 outline-none bg-white rounded-none font-mono" />
              </div>
            </div>


            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-700">Mật khẩu:</label>
              <div class="flex border-2 border-gray-900 focus-within:border-[#b91c1c] transition rounded-none">
                <div class="bg-gray-100 p-2.5 border-r-2 border-gray-900 flex items-center">
                  <img src="${lockIcon}" class="w-4 h-4 text-gray-600" alt="" />
                </div>
                <input id="reg-password" type="password" required minlength="6" placeholder="Tối thiểu 6 ký tự" class="flex-1 px-3 py-2 text-sm text-gray-900 outline-none bg-white rounded-none font-mono" />
              </div>
            </div>

            <button
              type="submit"
              class="mt-2 w-full bg-[#0f172a] hover:bg-[#b91c1c] text-white py-3 px-4 font-['Oswald'] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-gray-900 shadow-[3px_3px_0px_0px_#f59e0b] transition cursor-pointer rounded-none active:translate-x-0.5 active:translate-y-0.5"
            >
              <img src="${userPlusIcon}" class="w-4 h-4 invert brightness-0" alt="" />
              <span>HOÀN TẤT ĐĂNG KÝ</span>
            </button>
          </form>

          <div class="mt-6 pt-4 border-t-2 border-gray-100 text-center text-xs text-gray-600">
            Đã có tài khoản?
            <a href="#/auth" class="font-bold text-[#b91c1c] uppercase hover:underline ml-1 inline-flex items-center gap-0.5">
              <img src="${arrowLeftIcon}" class="w-3 h-3 text-[#b91c1c]" alt="" /> Đăng nhập
            </a>
          </div>

        </div>
      </section>
    `;
  }

  run() {
    const form = document.querySelector("#register-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.clearError();
        const payload = {
          name: document.querySelector("#reg-name")?.value || "",
          email: document.querySelector("#reg-email")?.value || "",
          phone: document.querySelector("#reg-phone")?.value || "",
          password: document.querySelector("#reg-password")?.value || "",
        };
        if (this.onSubmit) this.onSubmit(payload);
      });
    }
  }

  showError(message) {
    const errorBox = document.querySelector("#register-error-box");
    const errorMsg = document.querySelector("#register-error-message");
    if (errorBox && errorMsg) {
      errorMsg.textContent = message;
      errorBox.classList.remove("hidden");
    }
  }

  clearError() {
    const errorBox = document.querySelector("#register-error-box");
    if (errorBox) errorBox.classList.add("hidden");
  }
}
