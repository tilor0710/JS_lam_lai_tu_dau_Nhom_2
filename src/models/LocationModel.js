import { BaseModel } from "../base/baseModel.js";

export class LocationModel extends BaseModel {
  constructor() {
    super("locations");
  }

  async search(keyword) {
    const query = keyword ? `q=${encodeURIComponent(keyword)}` : "";
    return await this.getAll(query);
  }
}
