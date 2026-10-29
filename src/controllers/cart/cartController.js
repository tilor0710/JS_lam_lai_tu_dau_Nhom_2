import { BaseController } from "../../base/baseController.js";
import { CartView } from "../../views/pages/cart/cartView.js";
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

    this.view.onUpdateQuantity = (id, quantity) => {
      this.service.updateQuantity(id, quantity);
      this.refresh();
    };

    this.view.onRemove = (id) => {
      this.service.removeItem(id);
      this.refresh();
    };

    this.view.onClear = () => {
      this.service.clear();
      this.refresh();
    };

    try {
      const products = await this.productService.getProducts();
      this.service.syncProducts(products);
      this.refresh();
    } catch (error) {
      console.error("[CartController Error]: Không tải được sản phẩm:", error);
      this.view.render({
        error: "Không tải được dữ liệu sản phẩm. Vui lòng thử lại sau.",
      });
    }
  }

  refresh() {
    this.view.render({
      items: this.service.getItems(),
      totalQuantity: this.service.getTotalQuantity(),
      totalPrice: this.service.getTotalPrice(),
    });
  }
}
