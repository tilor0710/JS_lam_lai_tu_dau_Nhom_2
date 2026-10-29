import { BaseService } from "../base/baseService.js";

export class LocationService extends BaseService {
  constructor(locationModel) {
    super(locationModel);
  }

  async getLocations(keyword = "") {
    try {
      const data = keyword
        ? await this.model.search(keyword)
        : await this.model.getAll();

      return data.map((item) => ({
        ...item,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lng),
      }));
    } catch (error) {
      console.error("[LocationService Error]:", error);
      return [];
    }
  }
}
