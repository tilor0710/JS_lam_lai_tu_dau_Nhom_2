import { BaseController } from "../../base/baseController.js";
import { AdminDashboardView } from "../../views/pages/admin/AdminDashboardView.js";
import { AdminLayout } from "../../views/layouts/admin/AdminLayout.js";
import { ShipmentModel } from "../../models/ShipmentModel.js";
import { LocationModel } from "../../models/LocationModel.js";
import { OrderModel } from "../../models/OrderModel.js";

export class AdminDashboardController extends BaseController {
  constructor() {
    const view = new AdminDashboardView();
    super(null, view, false);
    this.shipmentModel = new ShipmentModel();
    this.locationModel = new LocationModel();
    this.orderModel = new OrderModel();
  }

  async init() {
    try {
      const [shipments, locations, orders] = await Promise.all([
        this.shipmentModel.getAll(),
        this.locationModel.getAll(),
        this.orderModel.getAll(),
      ]);
      if (
        !Array.isArray(shipments) ||
        !Array.isArray(locations) ||
        !Array.isArray(orders)
      ) {
        throw new Error("Dữ liệu tổng quan quản trị không hợp lệ.");
      }

      const recentActivity = [
        ...shipments.map((shipment) => ({
          ...shipment,
          recordType: "shipment",
          createdAt:
            shipment.createdAt || shipment.events?.[0]?.time || null,
        })),
        ...orders.map((order) => ({
          ...order,
          id: `DH-${order.id}`,
          sender:
            order.customerName ||
            order.email ||
            (order.userId ? `Khách hàng #${order.userId}` : "Khách hàng"),
          receiver: order.shippingAddress || "Chưa có địa chỉ giao hàng",
          serviceType: "SHOP",
          currentStatus: order.status || "PENDING",
          recordType: "order",
        })),
      ].sort(
        (first, second) =>
          (Date.parse(second.createdAt) || 0) -
          (Date.parse(first.createdAt) || 0),
      );

      const dashboardData = {
        totalShipments: shipments.length + orders.length,
        totalLocations: locations.length,
        totalProducts: 6,
        recentShipments: recentActivity.slice(0, 5),
        totalRevenue:
          shipments.reduce(
            (total, shipment) => total + (Number(shipment.shippingFee) || 0),
            0,
          ) +
          orders.reduce(
            (total, order) => total + (Number(order.totalAmount) || 0),
            0,
          ),
      };

      AdminLayout.render(this.view.getTemplate(dashboardData), "dashboard");
    } catch (err) {
      console.error("[AdminDashboardController Error]:", err);
    }
  }
}
