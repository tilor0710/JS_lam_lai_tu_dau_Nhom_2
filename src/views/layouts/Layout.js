import { Header } from "./Header.js";
import { ShopHeader } from "./ShopHeader.js";
import { Footer } from "./Footer.js";

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

    this.run();
  }

  static run() {}
}
