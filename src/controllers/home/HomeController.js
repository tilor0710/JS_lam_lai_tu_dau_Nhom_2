import { BaseController } from "../../base/baseController.js";
import { HomeView } from "../../views/pages/home/HomeView.js";
import { ShipmentModel } from "../../models/ShipmentModel.js";
import { TrackingService } from "../../services/TrackingService.js";
import { Layout } from "../../views/layouts/Layout.js";

export class HomeController extends BaseController {
  constructor() {
    const shipmentModel = new ShipmentModel();
    const trackingService = new TrackingService(shipmentModel);
    const homeView = new HomeView();
    super(trackingService, homeView);
  }

  async init() {
    Layout.render(false);
    this.view.render();
    this.view.onTrack = async (code) => {
      if (!code) {
        this.view.renderError("Vui lòng nhập mã vận đơn để tra cứu!");
        return;
      }
      this.view.showLoading();

      try {
        const shipment = await this.service.track(code);
        this.view.renderTrackingResult(shipment);
      } catch (err) {
        this.view.renderError(err.message || "Lỗi truy xuất máy chủ dữ liệu!");
      }
    };
  }
}
