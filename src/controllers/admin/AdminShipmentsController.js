import { BaseController } from "../../base/baseController.js";
import { AdminShipmentsView } from "../../views/pages/admin/AdminShipmentsView.js";
import { AdminLayout } from "../../views/layouts/admin/AdminLayout.js";
import { ShipmentModel } from "../../models/ShipmentModel.js";
import { ADMIN_PAGE_SIZE } from "../../views/pages/admin/AdminPagination.js";

export class AdminShipmentsController extends BaseController {
  constructor() {
    const view = new AdminShipmentsView();
    super(null, view, false);
    this.shipmentModel = new ShipmentModel();
  }

  async init() {
    let shipments = [];
    const renderCurrentPage = () => {
      AdminLayout.render(this.view.getTemplate(shipments), "shipments");
      this.view.run();
    };
    const renderPage = async (focusShipmentId) => {
      shipments = await this.shipmentModel.getAll();
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
      alert(`Đã tạo thành công vận đơn: ${randomCode}`);
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

        alert(`Đã cập nhật chặng mới cho đơn ${id}!`);
        await renderPage();
      }
    };

    await renderPage();
  }
}
