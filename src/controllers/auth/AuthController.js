import { BaseController } from "../../base/baseController.js";
import { authService } from "../../services/AuthService.js";
import { AuthView } from "../../views/pages/auth/AuthView.js";
import { Layout } from "../../views/layouts/Layout.js";

export class AuthController extends BaseController {
  constructor() {
    super(authService, new AuthView());
  }

  init() {
    Layout.render(false);
    if (this.service.isAuthenticated()) {
      window.location.hash = "#/cart";
      return;
    }

    this.view.onSubmit = async ({ mode, email, password }) => {
      try {
        await this.service[mode](email, password);
        window.location.hash = "#/cart";
      } catch (error) {
        console.error("[AuthController Error]: Không xác thực được tài khoản:", error);
        this.view.render({ error: error.message });
      }
    };

    this.view.render();
  }
}
