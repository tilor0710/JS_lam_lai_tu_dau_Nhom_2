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

    this.view.onUpdateQuantity = async (id, quantity) => {
      try {
        await this.service.updateQuantity(id, quantity);
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
      } catch (error) {
        console.error("[CartController Error]: Không cập nhật được giỏ hàng:", error);
        this.refresh("Không thể cập nhật giỏ hàng. Vui lòng thử lại.");
      }
    };

    this.view.onRemove = async (id) => {
      try {
        await this.service.removeItem(id);
        this.refresh();
      } catch (error) {
        console.error("[CartController Error]: Không xóa được sản phẩm:", error);
        this.refresh("Không thể xóa sản phẩm. Vui lòng thử lại.");
      }
    };

    this.view.onClear = async () => {
      try {
        await this.service.clear();
        this.refresh();
      } catch (error) {
        console.error("[CartController Error]: Không thể xóa giỏ hàng:", error);
        this.refresh("Không thể xóa giỏ hàng. Vui lòng thử lại.");
      }
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
}
