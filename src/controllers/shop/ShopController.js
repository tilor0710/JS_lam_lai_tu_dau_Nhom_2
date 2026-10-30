import { BaseController } from "../../base/baseController.js";
import { ShopView } from "../../views/pages/shop/ShopView.js";
import { Layout } from "../../views/layouts/Layout.js";
import { ProductModel } from "../../models/ProductModel.js";
import { ProductService } from "../../services/ProductService.js";
import { cartService } from "../../services/CartService.js";

export class ShopController extends BaseController {
  constructor() {
    const shopView = new ShopView();
    const productService = new ProductService(new ProductModel());
    super(productService, shopView, true);
  }

  async init() {
    Layout.render(true);

    this.view.onAddToCart = (product) => cartService.addItem(product);

    try {
      const products = await this.service.getProducts();
      await cartService.load(products);
      this.view.render({ products });
    } catch (error) {
      console.error("[ShopController Error]: Không tải được sản phẩm:", error);
      this.view.render({
        error: "Không tải được danh sách sản phẩm. Vui lòng thử lại sau.",
      });
    }
  }
}
