import { BaseService } from "../base/baseService.js";

export class TrackingService extends BaseService {
  constructor(shipmentModel) {
    super(shipmentModel);
  }

  async track(code) {
    if (!code || !code.trim()) {
      throw new Error("Vui lòng nhập mã vận đơn!");
    }

    const cleanCode = code.trim().toUpperCase();
    const shipment = await this.model.getByCode(cleanCode);

    if (!shipment) {
      return null;
    }

    return shipment;
  }
}
