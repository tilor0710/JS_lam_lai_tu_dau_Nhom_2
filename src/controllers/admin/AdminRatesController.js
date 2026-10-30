import { BaseController } from "../../base/baseController.js";
import { AdminRatesView } from "../../views/pages/admin/AdminRatesView.js";
import { AdminLayout } from "../../views/layouts/admin/AdminLayout.js";
import { RateModel } from "../../models/RateModel.js";
import { Popup } from "../../components/Popup.js";

export class AdminRatesController extends BaseController {
  constructor() {
    const view = new AdminRatesView();
    super(null, view, false);
    this.rateModel = new RateModel();
  }

  async init() {
    const renderPage = async () => {
      const rates = await this.rateModel.getDefaultRates();
      AdminLayout.render(this.view.getTemplate(rates), "rates");
      this.view.run();
    };

    this.view.onUpdateRates = async (updatedData) => {
      await this.rateModel.patch(1, updatedData);
      await Popup.alert("Đã lưu bảng cước mới thành công vào hệ thống!");
      await renderPage();
    };

    await renderPage();
  }
}
