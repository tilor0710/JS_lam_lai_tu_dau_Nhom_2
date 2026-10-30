import { BaseController } from "../../base/baseController.js";
import { AdminDashboardView } from "../../views/pages/admin/AdminDashboardView.js";
import { AdminLayout } from "../../views/layouts/admin/AdminLayout.js";
import { ShipmentModel } from "../../models/ShipmentModel.js";
import { LocationModel } from "../../models/LocationModel.js";

export class AdminDashboardController extends BaseController {
  constructor() {
    const view = new AdminDashboardView();
    super(null, view, false);
    this.shipmentModel = new ShipmentModel();
    this.locationModel = new LocationModel();
  }

  async init() {
    try {
      const shipments = await this.shipmentModel.getAll();
      const locations = await this.locationModel.getAll();

      const dashboardData = {
        totalShipments: shipments.length,
        totalLocations: locations.length,
        totalProducts: 6,
        recentShipments: shipments.slice(0, 5),
      };

      AdminLayout.render(this.view.getTemplate(dashboardData), "dashboard");
    } catch (err) {
      console.error("[AdminDashboardController Error]:", err);
    }
  }
}
