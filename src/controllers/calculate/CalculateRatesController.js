import { BaseController } from "../../base/baseController.js";
import { CalculateRatesView } from "../../views/pages/calculate/CalculateRatesView.js";
import { RateModel } from "../../models/RateModel.js";
import { RateService } from "../../services/RateService.js";
import { Layout } from "../../views/layouts/Layout.js";

export class CalculateRatesController extends BaseController {
  constructor() {
    const model = new RateModel();
    const service = new RateService(model);
    const view = new CalculateRatesView();

    super(service, view, false);
  }

  async init() {
    Layout.render(false);
    this.view.render();
    this.view.onCalculate = async (payload) => {
      this.view.showLoading();

      try {
        const result = await this.service.calculate(payload);
        this.view.renderResult(result);
      } catch (err) {
        this.view.renderError(err.message || "Lỗi khi tính toán cước phí!");
      }
    };
  }
}
