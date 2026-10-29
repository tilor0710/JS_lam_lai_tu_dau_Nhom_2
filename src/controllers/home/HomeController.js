import { BaseController } from "../../base/baseController.js";
import { HomeView } from "../../views/pages/home/HomeView.js";
import { ShipmentModel } from "../../models/ShipmentModel.js";
import { TrackingService } from "../../services/TrackingService.js";
import { Layout } from "../../views/layouts/Layout.js";

export class HomeController extends BaseController {
  constructor() {
    // 1. Khởi tạo Model & Service
    const shipmentModel = new ShipmentModel();
    const trackingService = new TrackingService(shipmentModel);
    const homeView = new HomeView();

    // 2. Bơm vào BaseController
    super(trackingService, homeView);
  }

  async init() {
    // 1. Gọi Layout vẽ Header đỏ và Footer
    Layout.render(false);

    // 2. Ra lệnh cho HomeView vẽ HeroSection ra màn hình
    this.view.render();

    // 3. Lắng nghe sự kiện tra cứu từ người dùng
    this.view.onTrack = async (code) => {
      if (!code) {
        this.view.renderError("Vui lòng nhập mã vận đơn để tra cứu!");
        return;
      }

      // Bật trạng thái đang tải
      this.view.showLoading();

      try {
        // Nhờ Service đi tìm đơn hàng trong db.json
        const shipment = await this.service.track(code);

        // Ném dữ liệu cho View vẽ Timeline
        this.view.renderTrackingResult(shipment);
      } catch (err) {
        this.view.renderError(err.message || "Lỗi truy xuất máy chủ dữ liệu!");
      }
    };
  }
}
