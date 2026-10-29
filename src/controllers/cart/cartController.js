import { BaseController } from "../../base/baseController.js";
import { CartView } from "../../views/cart/CartView.js";
import { cartService } from "../../services/CartService.js";
import { Layout } from "../../views/layouts/Layout.js";

export class CartController extends BaseController {
  constructor() {
    // Giỏ hàng dùng chung 1 service (singleton) cho toàn ứng dụng.
    super(cartService, new CartView());
  }

  async init() {
    // 1. Header của khu vực Shop (có badge giỏ hàng) và Footer
    Layout.render(true);

    // 2. Đăng ký xử lý sự kiện từ View
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

    // 3. Vẽ giỏ hàng lần đầu
    this.refresh();
  }

  /**
   * Vẽ lại trang theo trạng thái giỏ hàng hiện tại.
   * (Gọi trực tiếp thay vì subscribe, để controller của lần vào trang cũ
   * không còn "sống" và vẽ đè lên các trang khác.)
   */
  refresh() {
    this.view.render({
      items: this.service.getItems(),
      totalQuantity: this.service.getTotalQuantity(),
      totalPrice: this.service.getTotalPrice(),
    });
  }
}
