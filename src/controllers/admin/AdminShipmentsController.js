import { BaseController } from "../../base/baseController.js";
import { AdminShipmentsView } from "../../views/pages/admin/AdminShipmentsView.js";
import { AdminLayout } from "../../views/layouts/admin/AdminLayout.js";
import { ShipmentModel } from "../../models/ShipmentModel.js";
import { OrderModel } from "../../models/OrderModel.js";
import { ADMIN_PAGE_SIZE } from "../../views/pages/admin/AdminPagination.js";
import { Popup } from "../../components/Popup.js";

export class AdminShipmentsController extends BaseController {
  constructor() {
    const view = new AdminShipmentsView();
    super(null, view, false);
    this.shipmentModel = new ShipmentModel();
    this.orderModel = new OrderModel();
  }

  async init() {
    let shipments = [];
    let orders = [];
    const renderCurrentPage = () => {
      AdminLayout.render(this.view.getTemplate(shipments), "shipments");
      this.view.run();
    };
    const renderPage = async (focusShipmentId) => {
      const [shipmentRecords, orderRecords] = await Promise.all([
        this.shipmentModel.getAll(),
        this.orderModel.getAll(),
      ]);
      if (!Array.isArray(shipmentRecords) || !Array.isArray(orderRecords)) {
        throw new Error("Dữ liệu vận đơn hoặc đơn hàng không hợp lệ.");
      }

      orders = orderRecords.map((order) => ({
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
      }));
      shipments = [
        ...shipmentRecords.map((shipment) => ({
          ...shipment,
          recordType: "shipment",
          createdAt:
            shipment.createdAt || shipment.events?.[0]?.time || null,
        })),
        ...orders,
      ].sort(
        (first, second) =>
          (Date.parse(second.createdAt) || 0) -
          (Date.parse(first.createdAt) || 0),
      );

      if (focusShipmentId !== undefined) {
        const index = shipments.findIndex(
          (shipment) => String(shipment.id) === String(focusShipmentId),
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
    this.view.onCreateShipment = async (data) => {
      const randomCode = `SP${Math.floor(100000000 + Math.random() * 900000000)}VN`;
      const now = new Date().toISOString().replace("T", " ").substring(0, 16);

      const newShipment = {
        id: randomCode,
        ...data,
        currentStatus: "RECEIVED",
        weightKg: 1.0,
        size: "MEDIUM",
        events: [
          {
            time: now,
            location: data.sender,
            status: "Bưu gửi mới tạo tại quầy",
          },
        ],
      };

      await this.shipmentModel.post(newShipment);
      await Popup.alert(`Đã tạo thành công vận đơn: ${randomCode}`);
      await renderPage(randomCode);
    };
    this.view.onAddEvent = async (id, eventData) => {
      const now = new Date().toISOString().replace("T", " ").substring(0, 16);
      const currentShipment = await this.shipmentModel.getOne(id);

      if (currentShipment) {
        const updatedEvents = [
          ...(currentShipment.events || []),
          { time: now, location: eventData.location, status: eventData.status },
        ];

        let statusMap = "IN_TRANSIT";
        if (eventData.status.includes("Giao hàng thành công"))
          statusMap = "DELIVERED";
        if (eventData.status.includes("Đang phát"))
          statusMap = "OUT_FOR_DELIVERY";

        await this.shipmentModel.patch(id, {
          events: updatedEvents,
          currentStatus: statusMap,
        });

        await renderPage();
      }
    };

    await renderPage();
  }
}
