import { BaseModel } from "../base/baseModel.js";

export class ShipmentModel extends BaseModel {
  constructor() {
    super("shipments");
  }

  async getByCode(code) {
    const list = await this.getBy("id", code);
    return list && list.length > 0 ? list[0] : null;
  }
}
