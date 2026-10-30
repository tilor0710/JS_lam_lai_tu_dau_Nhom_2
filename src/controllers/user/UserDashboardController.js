import { BaseController } from "../../base/baseController.js";
import { UserDashboardView } from "../../views/pages/user/UserDashboardView.js";
import { AuthService } from "../../services/AuthService.js";
import { Layout } from "../../views/layouts/Layout.js";
import { router } from "../../routers/index.js";

export class UserDashboardController extends BaseController {
  constructor() {
    const view = new UserDashboardView();
    super(null, view, false);
  }

  async init() {
    if (!AuthService.isAuthenticated()) {
      router.navigate("/auth");
      return;
    }

    const currentUser = AuthService.getCurrentUser();
    Layout.render(false);
    this.view.render(currentUser);
    this.view.onLogout = () => {
      AuthService.logout();
      Layout.render(false);
      router.navigate("/auth");
    };
  }
}
