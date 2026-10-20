import { BaseController } from "../../base/baseController.js";
import { Layout } from "./../../views/layouts/Layout";
import { ShopView } from "./../../views/pages/shop/ShopView";

export class ShopController extends BaseController {
  constructor() {
    super(null, new ShopView());
  }

  async init() {
    Layout.render(true);

    this.view.render();
  }
}
