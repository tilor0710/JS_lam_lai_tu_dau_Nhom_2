import { BaseController } from "../../base/baseController.js";
import { CartView } from "../../views/pages/cart/CartView.js";
import { cartService } from "../../services/CartService.js";
import { ProductModel } from "../../models/ProductModel.js";
import { ProductService } from "../../services/ProductService.js";
import { Layout } from "../../views/layouts/Layout.js";
import { authService } from "../../services/AuthService.js";

export class CartController extends BaseController {
  constructor() {
    super(cartService, new CartView());
    this.productService = new ProductService(new ProductModel());
    this.isCheckingOut = false;
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

    this.view.onCheckout = () => {
      if (this.isCheckingOut) return;
      if (!authService.isAuthenticated()) {
        window.location.hash = "#/auth";
        return;
      }

      if (!window.confirm("Xác nhận thanh toán đơn hàng này?")) return;

      this.isCheckingOut = true;
      return this.#runCartAction(
        () => this.#placeOrder(),
        "Không thể hoàn tất thanh toán.",
      ).finally(() => {
        this.isCheckingOut = false;
      });
    };

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

  async #placeOrder() {
    const items = this.service.getItems();
    if (!items.length) {
      throw new Error("Giỏ hàng đang trống.");
    }

    const products = await Promise.all(
      items.map((item) => this.productService.model.getOne(item.id)),
    );
    const stockChanges = products.map((product, index) => {
      const quantity = items[index].quantity;
      const stock = Number(product?.stock);

      if (!Number.isFinite(stock) || stock < 0) {
        throw new Error(`Tồn kho sản phẩm "${items[index].name}" không hợp lệ.`);
      }
      if (stock < quantity) {
        throw new Error(
          `Sản phẩm "${items[index].name}" chỉ còn ${stock} sản phẩm trong kho.`,
        );
      }

      return {
        id: product.id,
        previousStock: stock,
        nextStock: stock - quantity,
      };
    });

    const updatedProducts = [];
    try {
      for (const change of stockChanges) {
        await this.productService.model.patch(change.id, {
          stock: change.nextStock,
        });
        updatedProducts.push(change);
      }

      await this.service.clear();
    } catch (error) {
      const rollbackResults = await Promise.allSettled(
        updatedProducts.map((change) =>
          this.productService.model.patch(change.id, {
            stock: change.previousStock,
          }),
        ),
      );
      const rollbackFailed = rollbackResults.some(
        (result) => result.status === "rejected",
      );

      if (rollbackFailed) {
        console.error("[CartController Error]: Không thể hoàn tác tồn kho.");
        throw new Error(
          `${error.message} Một số tồn kho không thể hoàn tác, vui lòng kiểm tra dữ liệu.`,
        );
      }
      throw error;
    }

    window.alert("Đặt hàng thành công. Tồn kho đã được cập nhật.");
  }
}
