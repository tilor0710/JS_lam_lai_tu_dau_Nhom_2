import { BaseView } from "../../../base/baseView.js";

const escapeHTML = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export class AuthView extends BaseView {
  constructor() {
    super("#app-content");
    this.mode = "login";
    this.onSubmit = null;
  }

  getTemplate({ error = "" } = {}) {
    const isRegister = this.mode === "register";
    const title = isRegister ? "TẠO TÀI KHOẢN" : "ĐĂNG NHẬP";

    return `
      <section class="max-w-md mx-auto px-4 py-12">
        <div class="bg-white border-2 border-gray-900 shadow-[6px_6px_0px_0px_#b91c1c] p-6 sm:p-8">
          <div class="border-l-4 border-[#b91c1c] pl-4 mb-6">
            <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Tài khoản QuickShip</span>
            <h1 class="text-3xl font-bold font-['Oswald'] text-gray-900 uppercase mt-1">${title}</h1>
          </div>

          <p class="text-sm text-gray-600 mb-5">
            ${isRegister ? "Đăng ký hoặc đăng nhập để tiếp tục thanh toán." : "Đăng nhập hoặc tạo tài khoản để thanh toán đơn hàng."}
          </p>

          ${
            error
              ? `<p role="alert" class="bg-red-50 border-2 border-red-700 p-3 mb-4 text-sm text-red-800">${escapeHTML(error)}</p>`
              : ""
          }

          <form data-form="auth" class="flex flex-col gap-4">
            <label class="text-xs font-bold uppercase tracking-wide text-gray-800">
              Email
              <input name="email" type="email" autocomplete="email" required
                class="mt-1 w-full border-2 border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none" />
            </label>
            <label class="text-xs font-bold uppercase tracking-wide text-gray-800">
              Mật khẩu
              <input name="password" type="password" autocomplete="${isRegister ? "new-password" : "current-password"}" minlength="6" required
                class="mt-1 w-full border-2 border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none" />
            </label>
            <button type="submit" class="bg-[#b91c1c] hover:bg-[#991b1b] text-white py-3 font-['Oswald'] text-sm font-bold uppercase tracking-wider border-b-2 border-[#f59e0b]">
              ${isRegister ? "Đăng ký và tiếp tục" : "Đăng nhập và tiếp tục"}
            </button>
          </form>

          <p class="text-sm text-center text-gray-600 mt-5">
            ${isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"}
            <button type="button" data-action="toggle-mode" class="font-bold text-[#b91c1c] underline">
              ${isRegister ? "Đăng nhập" : "Đăng ký"}
            </button>
          </p>
          <a href="#/cart" class="block text-center text-xs text-gray-500 hover:text-[#b91c1c] mt-5">Quay lại giỏ hàng</a>
        </div>
      </section>
    `;
  }

  run() {
    this.container
      ?.querySelector('[data-action="toggle-mode"]')
      ?.addEventListener("click", () => {
        this.mode = this.mode === "login" ? "register" : "login";
        this.render();
      });

    this.container
      ?.querySelector('[data-form="auth"]')
      ?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const submitButton = form.querySelector('[type="submit"]');
        const formData = new FormData(form);

        submitButton.disabled = true;
        try {
          await this.onSubmit?.({
            mode: this.mode,
            email: formData.get("email"),
            password: formData.get("password"),
          });
        } finally {
          if (submitButton.isConnected) submitButton.disabled = false;
        }
      });
  }
}
