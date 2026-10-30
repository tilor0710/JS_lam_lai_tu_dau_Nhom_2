import { BaseView } from "../../../base/baseView.js";
import { CartService } from "../../../services/CartService.js";
import arrowLeftIcon from "lucide-static/icons/arrow-left.svg";
import shieldCheckIcon from "lucide-static/icons/shield-check.svg";

const escapeHTML = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export class CheckoutView extends BaseView {
  constructor() {
    super("#app-content");
    this.onSubmit = null;
    this.isSubmitting = false;
  }

  getTemplate({ items = [], user = null, error = "", order = null } = {}) {
    if (order) {
      return /*html*/ `
        <section class="mx-auto w-full max-w-3xl px-4 py-12">
          <div class="border-2 border-gray-900 bg-white p-6 text-center shadow-[6px_6px_0px_0px_#f59e0b] sm:p-10">
            <div class="mx-auto flex h-16 w-16 items-center justify-center border-2 border-emerald-700 bg-emerald-50 text-3xl font-bold text-emerald-700">✓</div>
            <p class="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Đơn hàng đã được ghi nhận</p>
            <h1 class="mt-2 font-['Oswald'] text-3xl font-bold uppercase text-gray-900 sm:text-4xl">Cảm ơn bạn đã mua hàng</h1>
            <p class="mt-3 text-sm text-gray-600">Mã đơn hàng <strong class="font-mono text-gray-900">#${escapeHTML(order.id)}</strong></p>
            <p class="mt-2 text-sm leading-6 text-gray-600">
              ${
                order.paymentMethod === "BANK_TRANSFER"
                  ? "Đơn đang chờ xác nhận thanh toán. QuickShip sẽ liên hệ bạn để gửi thông tin chuyển khoản; hiện chưa có giao dịch nào được xác nhận."
                  : "Đơn hàng đang chờ xác nhận và sẽ được thanh toán khi giao hàng."
              }
            </p>
            ${
              order.cartClearFailed
                ? /*html*/ `<p role="alert" class="mt-4 border-2 border-amber-500 bg-amber-50 p-3 text-left text-xs leading-5 text-amber-900">Đơn đã tạo thành công nhưng giỏ hàng chưa xóa được. Vui lòng không đặt lại đơn; hãy liên hệ hỗ trợ để được kiểm tra.</p>`
                : ""
            }
            <p class="mt-4 border-t border-gray-200 pt-4 font-['Oswald'] text-2xl font-bold text-[#b91c1c]">
              ${CartService.formatPrice(order.totalAmount)}
            </p>
            <a href="/shop" class="mt-6 inline-flex items-center gap-2 border-2 border-gray-900 bg-gray-900 px-5 py-3 font-['Oswald'] text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#b91c1c]">
              <img src="${arrowLeftIcon}" class="h-4 w-4 brightness-0 invert" alt="" />
              Tiếp tục mua sắm
            </a>
          </div>
        </section>
      `;
    }

    if (items.length === 0) {
      return /*html*/ `
        <section class="mx-auto w-full max-w-3xl px-4 py-12">
          <div class="border-2 border-gray-900 bg-white p-8 text-center shadow-[6px_6px_0px_0px_#f59e0b]">
            <h1 class="font-['Oswald'] text-2xl font-bold uppercase text-gray-900">Giỏ hàng đang trống</h1>
            <p class="mt-2 text-sm text-gray-600">Thêm sản phẩm vào giỏ trước khi thanh toán.</p>
            <a href="/shop" class="mt-5 inline-block bg-gray-900 px-5 py-3 font-['Oswald'] text-xs font-bold uppercase text-white hover:bg-[#b91c1c]">Đến cửa hàng</a>
          </div>
        </section>
      `;
    }

    const totalPrice = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    return /*html*/ `
      <section class="mx-auto w-full max-w-7xl px-4 py-8">
        <div class="mb-6 border-b-2 border-gray-900 pb-5">
          <a href="/cart" class="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-[#b91c1c]">
            <img src="${arrowLeftIcon}" class="h-4 w-4" alt="" />
            Quay lại giỏ hàng
          </a>
          <div class="border-l-4 border-[#b91c1c] pl-4">
            <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Hoàn tất đơn hàng</span>
            <h1 class="font-['Oswald'] text-3xl font-bold uppercase tracking-wide text-gray-900 sm:text-4xl">Thông tin thanh toán</h1>
          </div>
        </div>

        ${
          /*html*/ `<div id="checkout-error" role="alert" tabindex="-1" class="${error ? "" : "hidden"} mb-5 border-2 border-red-700 bg-red-50 p-4 text-sm text-red-800">${escapeHTML(error)}</div>`
        }

        <form id="checkout-form" class="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.8fr)]">
          <div class="flex flex-col gap-5">
            <section class="border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_#f59e0b] sm:p-6">
              <h2 class="mb-5 border-b-2 border-gray-900 pb-3 font-['Oswald'] text-lg font-bold uppercase text-gray-900">Thông tin nhận hàng</h2>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label class="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-700">
                  Họ và tên
                  <input name="name" type="text" required minlength="2" maxlength="100" autocomplete="name" value="${escapeHTML(user?.name)}" placeholder="Nguyễn Văn A" class="border-2 border-gray-300 px-3 py-2.5 text-sm font-medium normal-case text-gray-900 outline-none focus:border-gray-900" />
                </label>
                <label class="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-700">
                  Số điện thoại
                  <input name="phone" type="tel" required minlength="9" maxlength="15" autocomplete="tel" value="${escapeHTML(user?.phone)}" placeholder="0912345678" class="border-2 border-gray-300 px-3 py-2.5 text-sm font-medium normal-case text-gray-900 outline-none focus:border-gray-900" />
                </label>
                <label class="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-700 sm:col-span-2">
                  Email nhận thông báo (không bắt buộc)
                  <input name="email" type="email" maxlength="150" autocomplete="email" value="${escapeHTML(user?.email)}" placeholder="name@example.com" class="border-2 border-gray-300 px-3 py-2.5 text-sm font-medium normal-case text-gray-900 outline-none focus:border-gray-900" />
                </label>
                <label class="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-700 sm:col-span-2">
                  Địa chỉ giao hàng
                  <textarea name="address" required minlength="8" maxlength="300" rows="3" autocomplete="street-address" placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố" class="resize-y border-2 border-gray-300 px-3 py-2.5 text-sm font-medium normal-case leading-5 text-gray-900 outline-none focus:border-gray-900"></textarea>
                </label>
                <label class="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-700 sm:col-span-2">
                  Ghi chú giao hàng (không bắt buộc)
                  <textarea name="note" maxlength="500" rows="2" placeholder="Hướng dẫn giao hàng, thời gian nhận..." class="resize-y border-2 border-gray-300 px-3 py-2.5 text-sm font-medium normal-case leading-5 text-gray-900 outline-none focus:border-gray-900"></textarea>
                </label>
              </div>
            </section>

            <fieldset class="border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_#0f172a] sm:p-6">
              <legend class="px-2 font-['Oswald'] text-lg font-bold uppercase text-gray-900">Phương thức thanh toán</legend>
              <div class="flex flex-col gap-3">
                <label class="flex cursor-pointer items-start gap-3 border-2 border-gray-200 p-4 transition has-[:checked]:border-[#b91c1c] has-[:checked]:bg-red-50/50">
                  <input type="radio" name="paymentMethod" value="COD" checked class="mt-0.5 accent-[#b91c1c]" />
                  <span>
                    <span class="block text-sm font-bold text-gray-900">Thanh toán khi nhận hàng (COD)</span>
                    <span class="mt-1 block text-xs leading-5 text-gray-600">Thanh toán tiền mặt cho nhân viên giao hàng.</span>
                  </span>
                </label>
                <label class="flex cursor-pointer items-start gap-3 border-2 border-gray-200 p-4 transition has-[:checked]:border-[#b91c1c] has-[:checked]:bg-red-50/50">
                  <input type="radio" name="paymentMethod" value="BANK_TRANSFER" class="mt-0.5 accent-[#b91c1c]" />
                  <span>
                    <span class="block text-sm font-bold text-gray-900">Chuyển khoản thủ công</span>
                    <span class="mt-1 block text-xs leading-5 text-gray-600">Đơn sẽ chờ xác nhận. QuickShip sẽ liên hệ gửi thông tin chuyển khoản; trang hiện chưa kết nối ngân hàng và không tự xác nhận tiền.</span>
                  </span>
                </label>
              </div>
            </fieldset>
          </div>

          <aside class="border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_#f59e0b] lg:sticky lg:top-24 sm:p-5">
            <h2 class="border-b-2 border-gray-900 pb-3 font-['Oswald'] text-lg font-bold uppercase text-gray-900">Đơn hàng của bạn</h2>
            <ul class="mt-4 flex max-h-64 flex-col gap-3 overflow-y-auto">
              ${items
                .map(
                  (item) => /*html*/ `
                    <li class="flex items-start justify-between gap-3 text-sm">
                      <span class="min-w-0 text-gray-700">${escapeHTML(item.name)} <span class="font-mono text-gray-500">× ${item.quantity}</span></span>
                      <span class="shrink-0 font-mono font-bold text-gray-900">${CartService.formatPrice(item.price * item.quantity)}</span>
                    </li>
                  `,
                )
                .join("")}
            </ul>
            <dl class="mt-4 flex flex-col gap-3 border-t-2 border-gray-200 pt-4 text-sm">
              <div class="flex justify-between gap-3">
                <dt class="text-gray-600">Tạm tính</dt>
                <dd class="font-mono font-bold text-gray-900">${CartService.formatPrice(totalPrice)}</dd>
              </div>
              <div class="flex justify-between gap-3">
                <dt class="text-gray-600">Phí vận chuyển</dt>
                <dd class="text-right text-xs text-gray-500">Xác nhận sau</dd>
              </div>
              <div class="flex items-baseline justify-between gap-3 border-t-2 border-gray-100 pt-3">
                <dt class="text-xs font-bold uppercase tracking-wide text-gray-700">Tổng tiền hàng</dt>
                <dd class="font-['Oswald'] text-2xl font-bold text-[#b91c1c]">${CartService.formatPrice(totalPrice)}</dd>
              </div>
            </dl>
            <p class="mt-3 text-[11px] leading-5 text-gray-500">Phí vận chuyển chưa bao gồm; nhân viên sẽ xác nhận trước khi giao hàng.</p>
            <button type="submit" class="mt-5 inline-flex w-full items-center justify-center gap-2 border-2 border-gray-900 bg-[#b91c1c] px-4 py-3 font-['Oswald'] text-sm font-bold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#0f172a] transition hover:-translate-y-0.5 hover:bg-[#991b1b] disabled:cursor-wait disabled:opacity-60">
              <img src="${shieldCheckIcon}" class="h-4 w-4 brightness-0 invert" alt="" />
              <span data-role="checkout-submit-label">Đặt hàng</span>
            </button>
            <p class="mt-3 text-center text-[11px] text-gray-500">Đơn hàng sẽ được xác nhận trước khi xử lý.</p>
          </aside>
        </form>
      </section>
    `;
  }

  run() {
    const form = this.container?.querySelector("#checkout-form");
    form?.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (this.isSubmitting || !form.reportValidity()) return;

      const formData = new FormData(form);
      const details = {
        name: String(formData.get("name") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        address: String(formData.get("address") ?? "").trim(),
        note: String(formData.get("note") ?? "").trim(),
        paymentMethod: String(formData.get("paymentMethod") ?? "COD"),
      };

      this.isSubmitting = true;
      const submitButton = form.querySelector('button[type="submit"]');
      const submitLabel = form.querySelector(
        '[data-role="checkout-submit-label"]',
      );
      if (submitButton) submitButton.disabled = true;
      if (submitLabel) submitLabel.textContent = "Đang xử lý...";

      try {
        await this.onSubmit?.(details);
      } finally {
        this.isSubmitting = false;
        if (submitButton?.isConnected) submitButton.disabled = false;
        if (submitLabel?.isConnected) submitLabel.textContent = "Đặt hàng";
      }
    });
  }

  showError(message) {
    const errorElement = this.container?.querySelector("#checkout-error");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.remove("hidden");
      errorElement.focus();
      return;
    }

    this.render({ items: [], error: message });
  }
}
