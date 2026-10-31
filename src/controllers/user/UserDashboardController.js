import { BaseController } from "../../base/baseController.js";
import { UserDashboardView } from "../../views/pages/user/UserDashboardView.js";
import { AuthService } from "../../services/AuthService.js";
import { Layout } from "../../views/layouts/Layout.js";
import { router } from "../../routers/index.js";
import { OrderModel } from "../../models/OrderModel.js";

export class UserDashboardController extends BaseController {
  constructor() {
    const view = new UserDashboardView();
    super(null, view, false);
    this.orderModel = new OrderModel();
  }

  async init() {
    if (!AuthService.isAuthenticated()) {
      router.navigate("/auth");
      return;
    }

    const currentUser = AuthService.getCurrentUser();
    Layout.render(false);
    this.view.onLogout = () => {
      AuthService.logout();
      Layout.render(false);
      router.navigate("/auth");
    };

    try {
      const userOrders = await this.orderModel.getBy("userId", currentUser.id);
      if (!Array.isArray(userOrders)) {
        throw new Error("Dữ liệu lịch sử đơn hàng không hợp lệ.");
      }

      const orders = userOrders
        .filter((order) => String(order.userId) === String(currentUser.id))
        .sort(
          (first, second) =>
            (Date.parse(second.createdAt) || 0) -
            (Date.parse(first.createdAt) || 0),
        );
      this.view.render({ user: currentUser, orders });
    } catch (error) {
      console.error(
        "[UserDashboardController Error]: Không tải được đơn hàng:",
        error,
      );
      this.view.render({
        user: currentUser,
        orders: [],
        ordersError: "Không tải được lịch sử đơn hàng. Vui lòng tải lại trang.",
      });
    }
  }
}
