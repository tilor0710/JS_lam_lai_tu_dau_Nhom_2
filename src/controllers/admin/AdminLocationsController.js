import { BaseController } from "../../base/baseController.js";
import { AdminLocationsView } from "../../views/pages/admin/AdminLocationsView.js";
import { AdminLayout } from "../../views/layouts/admin/AdminLayout.js";
import { LocationModel } from "../../models/LocationModel.js";

export class AdminLocationsController extends BaseController {
  constructor() {
    const view = new AdminLocationsView();
    super(null, view, false);
    this.locationModel = new LocationModel();
  }

  async init() {
    const renderPage = async () => {
      const locations = await this.locationModel.getAll();
      AdminLayout.render(this.view.getTemplate(locations), "locations");
      this.view.run();
    };

    this.view.onCreateLocation = async (payload) => {
      await this.locationModel.post(payload);
      alert("Đã thêm bưu cục thành công vào mạng lưới!");
      await renderPage();
    };

    this.view.onDeleteLocation = async (id) => {
      await this.locationModel.deleteOne(id);
      await renderPage();
    };

    await renderPage();
  }
}
