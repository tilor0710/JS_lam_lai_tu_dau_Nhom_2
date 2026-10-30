import { BaseController } from "../../base/baseController.js";
import { CheckoutView } from "../../views/pages/cart/CheckoutView.js";
import { cartService } from "../../services/CartService.js";
import { ProductModel } from "../../models/ProductModel.js";
import { ProductService } from "../../services/ProductService.js";
import { OrderModel } from "../../models/OrderModel.js";
import { AuthService } from "../../services/AuthService.js";
import { Layout } from "../../views/layouts/Layout.js";

export class CheckoutController extends BaseController {
  constructor() {
    super(cartService, new CheckoutView());
    this.productModel = new ProductModel();
    this.productService = new ProductService(this.productModel);
    this.orderModel = new OrderModel();
  }

  async init() {
    Layout.render(true);
    this.view.onSubmit = (details) => this.#placeOrder(details);

    try {
      const products = await this.productService.getProducts();
      await this.service.load(products);
      this.#render();
    } catch (error) {
      console.error("[CheckoutController Error]: Không tải được checkout:", error);
      this.view.render({
        error: "Không tải được dữ liệu đơn hàng. Vui lòng quay lại giỏ hàng.",
      });
    }
  }

  #render({ error = "", order = null } = {}) {
    this.view.render({
      items: order ? [] : this.service.getItems(),
      user: AuthService.getCurrentUser(),
      error,
      order,
    });
  }

  async #placeOrder(details) {
    const items = this.service.getItems();
    if (!items.length) {
      this.view.showError("Giỏ hàng đang trống. Vui lòng thêm sản phẩm trước.");
      return;
    }

    if (details.name.length < 2) {
      this.view.showError("Vui lòng nhập họ tên người nhận hợp lệ.");
      return;
    }

    const phoneDigits = details.phone.replace(/\D/g, "");
    if (phoneDigits.length < 9 || phoneDigits.length > 12) {
      this.view.showError("Số điện thoại nhận hàng chưa hợp lệ.");
      return;
    }

    if (details.address.length < 8) {
      this.view.showError("Vui lòng nhập địa chỉ giao hàng đầy đủ.");
      return;
    }

    if (!["COD", "BANK_TRANSFER"].includes(details.paymentMethod)) {
      this.view.showError("Phương thức thanh toán không hợp lệ.");
      return;
    }

    const currentUser = AuthService.getCurrentUser();
    const order = {
      userId: currentUser?.id ?? null,
      customerName: details.name,
      phone: details.phone,
      email: details.email,
      shippingAddress: details.address,
      note: details.note,
      paymentMethod: details.paymentMethod,
      paymentStatus: "UNPAID",
      status: "PENDING",
      totalAmount: this.service.getTotalPrice(),
      shippingFee: null,
      items: this.service.toOrderItems(),
      createdAt: new Date().toISOString(),
    };

    const reservedStock = [];
    try {
      const currentProducts = await this.productModel.getAll();
      if (!Array.isArray(currentProducts)) {
        throw new Error("Không thể kiểm tra tồn kho hiện tại.");
      }

      for (const item of items) {
        const product = currentProducts.find(
          (current) => Number(current.id) === item.id,
        );
        const stock = Number(product?.stock);
        if (!product || !Number.isInteger(stock) || stock < item.quantity) {
          throw new Error(
            `${item.name} không còn đủ tồn kho. Vui lòng quay lại giỏ hàng.`,
          );
        }
      }

      for (const item of items) {
        const product = currentProducts.find(
          (current) => Number(current.id) === item.id,
        );
        const stock = Number(product.stock);
        await this.productModel.patch(item.id, {
          stock: stock - item.quantity,
        });
        reservedStock.push({ id: item.id, stock });
      }

      const createdOrder = await this.orderModel.post(order);
      try {
        await this.service.clear();
      } catch (error) {
        console.error(
          "[CheckoutController Error]: Đơn đã tạo nhưng không xóa được giỏ hàng:",
          error,
        );
        this.#render({ order: { ...createdOrder, cartClearFailed: true } });
        return;
      }
      this.#render({ order: createdOrder ?? order });
    } catch (error) {
      console.error("[CheckoutController Error]: Không tạo được đơn hàng:", error);
      const rollbackErrors = [];
      for (const product of reservedStock.reverse()) {
        try {
          await this.productModel.patch(product.id, { stock: product.stock });
        } catch (rollbackError) {
          rollbackErrors.push(rollbackError);
        }
      }
      this.view.showError(
        rollbackErrors.length
          ? "Không thể hoàn tất đơn và chưa khôi phục được đầy đủ tồn kho. Vui lòng liên hệ quản trị viên trước khi thử lại."
          : error.message ||
            "Chưa thể tạo đơn hàng. Giỏ hàng của bạn vẫn được giữ nguyên; vui lòng thử lại.",
      );
      if (rollbackErrors.length) {
        console.error(
          "[CheckoutController Error]: Không thể hoàn tác tồn kho:",
          rollbackErrors,
        );
      }
    }
  }
}
