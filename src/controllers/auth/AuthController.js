import { BaseController } from "../../base/baseController.js";
import { LoginView } from "../../views/pages/auth/LoginView.js";
import { RegisterView } from "../../views/pages/auth/RegisterView.js";
import { AuthService } from "../../services/AuthService.js";
import { Layout } from "../../views/layouts/Layout.js";
import { router } from "../../routers/index.js";

export class AuthController extends BaseController {
  constructor(mode = "login") {
    const view = mode === "register" ? new RegisterView() : new LoginView();
    super(null, view, false);
    this.mode = mode;
  }

  async init() {
    Layout.render(false);
    this.view.render();
    if (this.mode === "register") {
      this.view.onSubmit = async (payload) => {
        try {
          await AuthService.register(payload);
          Layout.render(false);
          router.navigate("/user");
        } catch (err) {
          let msg = err.message;
          if (msg.includes("Email already exists")) {
            msg = "Email này đã được sử dụng trên hệ thống!";
          }
          this.view.showError(msg);
        }
      };
    } else {
      this.view.onSubmit = async (email, password) => {
        try {
          const user = await AuthService.login(email, password);
          Layout.render(false);
          if (user.role === "ADMIN") {
            router.navigate("/admin");
          } else {
            router.navigate("/user");
          }
        } catch (err) {
          let message = err.message;
          if (message.includes("Cannot find user")) {
            message = "Tài khoản email này không tồn tại!";
          } else if (message.includes("Incorrect password")) {
            message = "Mật khẩu không chính xác!";
          }
          this.view.showError(message);
        }
      };
    }
  }
}
