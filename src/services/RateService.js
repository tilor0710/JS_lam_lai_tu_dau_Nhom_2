import { BaseService } from "../base/baseService.js";

export class RateService extends BaseService {
  constructor(rateModel) {
    super(rateModel);
  }


  async calculate({
    scope = "DOMESTIC",
    itemType = "PACKAGE",
    weightKg = 1,
    size = "SMALL",
  }) {
    const weight = parseFloat(weightKg) || 0;
    if (weight <= 0) {
      throw new Error("Khối lượng hàng gửi phải lớn hơn 0 kg!");
    }
    const rates = await this.model.getDefaultRates();
    if (!rates) {
      throw new Error("Không thể truy xuất bảng cước từ hệ thống!");
    }

    let basePrice = 0;
    let estimatedDays = "";
    if (itemType === "MAIL") {
      basePrice =
        scope === "DOMESTIC"
          ? rates.mailBasePrice
          : rates.mailBasePrice * rates.overseasMultiplier;
      estimatedDays =
        scope === "DOMESTIC" ? "1 - 2 ngày làm việc" : "5 - 7 ngày làm việc";
    } else {
      basePrice = rates.packages[size] || rates.packages.SMALL;
      if (weight > 1) {
        basePrice += Math.ceil(weight - 1) * rates.extraPerKg;
      }
      if (scope === "OVERSEAS") {
        basePrice = basePrice * rates.overseasMultiplier;
        estimatedDays = "5 - 10 ngày làm việc";
      } else {
        estimatedDays = "2 - 3 ngày làm việc";
      }
    }

    return {
      price: basePrice,
      formattedPrice: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(basePrice),
      estimatedDays,
      scopeText:
        scope === "DOMESTIC" ? "Vận chuyển Nội địa" : "Vận chuyển Quốc tế",
      itemTypeText:
        itemType === "PACKAGE" ? "Bưu kiện đóng hộp" : "Thư từ / Tài liệu",
      weightText: `${weight} kg`,
    };
  }
}
