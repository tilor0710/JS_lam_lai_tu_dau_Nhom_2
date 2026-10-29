import { BaseModel } from "../base/baseModel.js";

export class RateModel extends BaseModel {
  constructor() {
    super("shipping_rates");
  }

  async getDefaultRates() {
    return await this.getOne(1);
  }
}
