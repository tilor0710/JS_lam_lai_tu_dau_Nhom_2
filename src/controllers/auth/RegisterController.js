import { BaseController } from "../../base/baseController.js";
import { RegisterView } from "../../views/pages/auth/RegisterView.js";
import { Layout } from "../../views/layouts/Layout.js";

export class RegisterController extends BaseController {
    constructor() {
        super(null, new RegisterView());
    }

    async init() {
        Layout.render(false);
        this.view.render();
    }
}
