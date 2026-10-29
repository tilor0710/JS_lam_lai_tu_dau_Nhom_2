import { Header } from "./Header.js";
import { ShopHeader } from "./ShopHeader.js";
import { Footer } from "./Footer.js";
import { cartService } from "../../services/CartService.js";

export class Layout {
  static render(isShop = false) {
    const headerElement = document.querySelector("#app-header");
    const footerElement = document.querySelector("#app-footer");

    if (headerElement) {
      headerElement.innerHTML = isShop
        ? ShopHeader.getTemplate()
        : Header.getTemplate();
    }

    if (footerElement) {
      footerElement.innerHTML = Footer.getTemplate();
    }

    this.unsubscribeCart?.();
    this.unsubscribeCart = cartService.subscribe((items) => {
      this.updateCartCount(items);
    });
    this.updateCartCount(cartService.getItems());
  }

  static updateCartCount(items) {
    const quantity = items.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('[data-role="cart-count"]').forEach((badge) => {
      badge.textContent = String(quantity);
      badge.setAttribute("aria-label", `${quantity} sản phẩm trong giỏ hàng`);
    });
  }

  static unsubscribeCart = null;
}
