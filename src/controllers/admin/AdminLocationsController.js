import { BaseController } from "../../base/baseController.js";
import { AdminLocationsView } from "../../views/pages/admin/AdminLocationsView.js";
import { AdminLayout } from "../../views/layouts/admin/AdminLayout.js";
import { LocationModel } from "../../models/LocationModel.js";
import { ADMIN_PAGE_SIZE } from "../../views/pages/admin/AdminPagination.js";
import { Popup } from "../../components/Popup.js";

export class AdminLocationsController extends BaseController {
  constructor() {
    const view = new AdminLocationsView();
    super(null, view, false);
    this.locationModel = new LocationModel();
  }

  async init() {
    let locations = [];
    const renderCurrentPage = () => {
      AdminLayout.render(this.view.getTemplate(locations), "locations");
      this.view.run();
    };
    const renderPage = async (focusLocationId) => {
      locations = await this.locationModel.getAll();
      if (focusLocationId !== undefined) {
        const index = locations.findIndex(
          (location) => String(location.id) === String(focusLocationId),
        );
        if (index >= 0) {
          this.view.currentPage = Math.floor(index / ADMIN_PAGE_SIZE) + 1;
        }
      }
      renderCurrentPage();
    };

    this.view.onPageChange = (page) => {
      this.view.currentPage = page;
      renderCurrentPage();
    };

    this.view.onCreateLocation = async (payload) => {
      const location = await this.locationModel.post(payload);
      await Popup.alert("Đã thêm bưu cục thành công vào mạng lưới!");
      await renderPage(location?.id);
    };

    this.view.onDeleteLocation = async (id) => {
      await this.locationModel.deleteOne(id);
      await renderPage();
    };

    await renderPage();
  }
}
