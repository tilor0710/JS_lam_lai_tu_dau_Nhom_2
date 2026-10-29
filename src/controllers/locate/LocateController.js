import { BaseController } from "../../base/baseController.js";
import { LocateView } from "../../views/pages/locate/LocateView.js";
import { LocationService } from "../../services/LocationService.js";
import { LocationModel } from "../../models/LocationModel.js";
import { Layout } from "../../views/layouts/Layout.js";

export class LocateController extends BaseController {
  constructor() {
    // 1. Lắp ráp Model -> Service -> View (Dependency Injection)
    const model = new LocationModel();
    const service = new LocationService(model);
    const view = new LocateView();

    super(service, view);
  }

  async init() {
    // 1. Render Header thường và Footer
    Layout.render(false);

    // 2. Render khung HTML của trang Locate
    this.view.render();

    // 3. Tải danh sách 7 bưu cục ban đầu từ db.json
    const initialLocations = await this.service.getLocations();
    this.view.renderLocations(initialLocations);

    // 4. Lắng nghe khi người dùng gõ tìm kiếm
    this.view.onSearch = async (keyword) => {
      const filteredLocations = await this.service.getLocations(keyword);
      this.view.renderLocations(filteredLocations);
    };
  }
}
