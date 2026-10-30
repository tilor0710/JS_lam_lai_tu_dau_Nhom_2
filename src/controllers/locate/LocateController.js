import { BaseController } from "../../base/baseController.js";
import { LocateView } from "../../views/pages/locate/LocateView.js";
import { LocationService } from "../../services/LocationService.js";
import { LocationModel } from "../../models/LocationModel.js";
import { Layout } from "../../views/layouts/Layout.js";

export class LocateController extends BaseController {
  constructor() {
    const model = new LocationModel();
    const service = new LocationService(model);
    const view = new LocateView();

    super(service, view);
  }

  async init() {
    Layout.render(false);
    this.view.render();
    const initialLocations = await this.service.getLocations();
    this.view.renderLocations(initialLocations);
    this.view.onSearch = async (keyword) => {
      const filteredLocations = await this.service.getLocations(keyword);
      this.view.renderLocations(filteredLocations);
    };
  }
}
