
import { BaseController } from "../../base/baseController.js";
import { LoginView } from "../../views/pages/auth/LoginView.js";
import { Layout } from "../../views/layouts/Layout.js";

export class LoginController extends BaseController {
    constructor() {
        super(null, new LoginView());
    }

    async init() {
        Layout.render(false);
        this.view.render();
    }
}
