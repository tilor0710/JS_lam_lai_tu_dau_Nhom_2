import { BaseController } from "./../../base/baseController";
import { HomeView } from "./../../views/pages/home/HomeView";
import { Layout } from "./../../views/layouts/Layout";

export class HomeController extends BaseController {
  constructor() {
    super(null, new HomeView());
  }

  async init() {
    Layout.render(false);

    this.view.render();
  }
}
