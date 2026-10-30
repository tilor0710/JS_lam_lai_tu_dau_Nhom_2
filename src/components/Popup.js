const escapeHTML = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const POPUP_STYLES = {
  success: {
    icon: "✓",
    iconClass: "quickship-popup-icon-success",
  },
  error: {
    icon: "!",
    iconClass: "quickship-popup-icon-error",
  },
  warning: {
    icon: "!",
    iconClass: "quickship-popup-icon-warning",
  },
  info: {
    icon: "i",
    iconClass: "quickship-popup-icon-info",
  },
  confirm: {
    icon: "?",
    iconClass: "quickship-popup-icon-warning",
  },
};

export class Popup {
  static alert(message, options = {}) {
    return this.#showMessage(message, options);
  }

  static async confirm(message, options = {}) {
    const result = await this.#showMessage(message, {
      ...options,
      type: "confirm",
      cancelText: options.cancelText ?? "Hủy",
      confirmText: options.confirmText ?? "Xác nhận",
      showCancel: true,
    });

    return result === "confirm";
  }

  static form({
    title,
    reference = "",
    content,
    submitText = "Lưu thay đổi",
    cancelText = "Đóng",
    onSubmit,
  }) {
    return new Promise((resolve) => {
      const dialog = this.#createDialog({
        title,
        reference,
        type: "info",
        body: /*html*/ `
          <form data-popup-form class="flex flex-col gap-4">
            <div class="flex flex-col gap-3 text-xs font-bold uppercase tracking-wider text-gray-700">
              ${content}
            </div>
            <div data-popup-error role="alert" class="hidden border-2 border-red-700 bg-red-50 p-3 text-xs font-medium normal-case text-red-800"></div>
            <div class="flex justify-end gap-2 border-t border-gray-200 pt-3">
              <button type="button" data-popup-cancel class="border-2 border-gray-400 px-4 py-2 font-['Oswald'] text-xs font-bold uppercase text-gray-600 transition hover:bg-gray-100">${escapeHTML(cancelText)}</button>
              <button type="submit" class="border-2 border-[#b91c1c] bg-[#b91c1c] px-4 py-2 font-['Oswald'] text-xs font-bold uppercase text-white transition hover:bg-[#991b1b]">${escapeHTML(submitText)}</button>
            </div>
          </form>
        `,
      });

      const form = dialog.querySelector("[data-popup-form]");
      const submitButton = form.querySelector('button[type="submit"]');
      const errorElement = form.querySelector("[data-popup-error]");
      let settled = false;
      const finish = (result) => {
        if (settled) return;
        settled = true;
        resolve(result);
      };

      dialog.querySelector("[data-popup-cancel]")?.addEventListener("click", () => {
        dialog.close("cancel");
      });
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!form.reportValidity() || submitButton.disabled) return;

        submitButton.disabled = true;
        errorElement.classList.add("hidden");
        try {
          await onSubmit?.(Object.fromEntries(new FormData(form)));
          dialog.close("submit");
        } catch (error) {
          console.error("[Popup Error]: Không thể hoàn tất thao tác:", error);
          errorElement.textContent =
            error.message || "Không thể hoàn tất thao tác. Vui lòng thử lại.";
          errorElement.classList.remove("hidden");
          submitButton.disabled = false;
        }
      });
      dialog.addEventListener(
        "close",
        () => {
          finish(dialog.returnValue === "submit");
          dialog.remove();
        },
        { once: true },
      );

      this.#mount(dialog);
      form.querySelector("input:not([type=hidden]), select, textarea")?.focus();
    });
  }

  static #showMessage(
    message,
    {
      title = "QuickShip",
      type = "success",
      confirmText = "Đóng",
      cancelText = "Hủy",
      showCancel = false,
      reference = "",
    } = {},
  ) {
    return new Promise((resolve) => {
      const dialog = this.#createDialog({
        title,
        reference,
        type,
        body: /*html*/ `
          <p class="whitespace-pre-line text-sm leading-6 text-gray-600">${escapeHTML(message)}</p>
          <div class="mt-6 flex justify-end gap-2">
            ${
              showCancel
                ? /*html*/ `<button type="button" data-popup-cancel class="border-2 border-gray-300 bg-white px-4 py-2 font-['Oswald'] text-xs font-bold uppercase text-gray-700 transition hover:bg-gray-100">${escapeHTML(cancelText)}</button>`
                : ""
            }
            <button type="button" data-popup-confirm class="border-2 border-gray-900 bg-gray-900 px-5 py-2 font-['Oswald'] text-xs font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_#f59e0b] transition hover:bg-[#b91c1c]">${escapeHTML(confirmText)}</button>
          </div>
        `,
      });

      dialog.querySelector("[data-popup-confirm]")?.addEventListener("click", () => {
        dialog.close("confirm");
      });
      dialog.querySelector("[data-popup-cancel]")?.addEventListener("click", () => {
        dialog.close("cancel");
      });
      dialog.addEventListener(
        "close",
        () => {
          resolve(dialog.returnValue);
          dialog.remove();
        },
        { once: true },
      );

      this.#mount(dialog);
      dialog.querySelector("[data-popup-confirm]")?.focus();
    });
  }

  static #createDialog({ title, reference, type, body }) {
    const dialog = document.createElement("dialog");
    const style = POPUP_STYLES[type] ?? POPUP_STYLES.info;
    dialog.className = "quickship-popup";
    dialog.setAttribute("aria-labelledby", "quickship-popup-title");
    dialog.innerHTML = /*html*/ `
      <div class="quickship-popup-card">
        <div class="quickship-popup-heading">
          <span class="quickship-popup-icon ${style.iconClass}" aria-hidden="true">${style.icon}</span>
          <div class="min-w-0 flex-1">
            <h2 id="quickship-popup-title" class="font-['Oswald'] text-lg font-bold uppercase tracking-wide text-gray-900">${escapeHTML(title)}</h2>
            ${reference ? /*html*/ `<p class="mt-0.5 truncate font-mono text-xs font-bold text-[#b91c1c]">${escapeHTML(reference)}</p>` : ""}
          </div>
          <button type="button" data-popup-close aria-label="Đóng cửa sổ" class="quickship-popup-close">×</button>
        </div>
        <div class="quickship-popup-content">${body}</div>
      </div>
    `;

    dialog.querySelector("[data-popup-close]")?.addEventListener("click", () => {
      dialog.close("cancel");
    });

    return dialog;
  }

  static #mount(dialog) {
    document.body.append(dialog);
    dialog.showModal();
  }
}
