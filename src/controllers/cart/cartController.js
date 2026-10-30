import { BaseController } from "../../base/baseController.js";
import { CartView } from "../../views/pages/cart/CartView.js";
import { cartService } from "../../services/CartService.js";
import { ProductModel } from "../../models/ProductModel.js";
import { ProductService } from "../../services/ProductService.js";
import { Layout } from "../../views/layouts/Layout.js";

export class CartController extends BaseController {
  constructor() {
    super(cartService, new CartView());
    this.productService = new ProductService(new ProductModel());
  }

  async init() {
    Layout.render(true);

    this.view.onUpdateQuantity = (id, quantity) =>
      this.#runCartAction(
        () => this.service.updateQuantity(id, quantity),
        "Không thể cập nhật giỏ hàng.",
        () => {
          const item = this.service
            .getItems()
            .find((cartItem) => cartItem.id === Number(id));
          if (
            !item ||
            !this.view.updateItem(
              item,
              this.service.getTotalQuantity(),
              this.service.getTotalPrice(),
            )
          ) {
            this.refresh();
          }
        },
      );

    this.view.onRemove = (id) =>
      this.#runCartAction(
        () => this.service.removeItem(id),
        "Không thể xóa sản phẩm.",
      );

    this.view.onClear = () =>
      this.#runCartAction(
        () => this.service.clear(),
        "Không thể xóa giỏ hàng.",
      );

    try {
      const products = await this.productService.getProducts();
      await this.service.load(products);
      this.refresh();
    } catch (error) {
      console.error("[CartController Error]: Không tải được sản phẩm:", error);
      this.view.render({
        error: "Không tải được dữ liệu sản phẩm. Vui lòng thử lại sau.",
      });
    }
  }

  refresh(error = "") {
    this.view.render({
      items: this.service.getItems(),
      totalQuantity: this.service.getTotalQuantity(),
      totalPrice: this.service.getTotalPrice(),
      error,
    });
  }

  async #runCartAction(action, fallbackMessage, onSuccess = () => this.refresh()) {
    try {
      await action();
      onSuccess();
    } catch (error) {
      console.error("[CartController Error]:", error);
      this.refresh(error.message || `${fallbackMessage} Vui lòng thử lại.`);
    }
  }
}
