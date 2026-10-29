import { BaseController } from "../../base/baseController.js";
import { ShopView } from "../../views/pages/shop/ShopView.js";
import { Layout } from "../../views/layouts/Layout.js";

export class ShopController extends BaseController {
  constructor() {
    const shopView = new ShopView();
    // Tham số thứ 3 là true để Layout biết đây là trang Shop
    super(null, shopView, true);
  }

  async init() {
    // 1. Kêu Layout render ShopHeader (xanh) và Footer
    Layout.render(true);

    // 2. Kêu ShopView render lưới sản phẩm góc cạnh
    this.view.render();

    // 3. Chỗ này sau này bạn cùng team chỉ cần cắm logic Giỏ hàng vào đây:
    this.view.onAddToCart = (product) => {
      // Sau này: cartService.addItem(product)
      console.log("[ShopController] Nhận được yêu cầu thêm giỏ hàng:", product);
    };
  }
}
