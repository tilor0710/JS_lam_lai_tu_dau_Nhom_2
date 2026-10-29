import { BaseService } from "../base/baseService.js";

export class ProductService extends BaseService {
  constructor(productModel) {
    super(productModel);
  }

  async getProducts() {
    const products = await this.model.getAll();
    if (!Array.isArray(products)) {
      throw new Error("Dữ liệu sản phẩm trong db.json không hợp lệ.");
    }

    return products.map((product) => {
      const normalized = {
        ...product,
        id: Number(product?.id),
        name: String(product?.name ?? ""),
        price: Number(product?.price),
        image: String(product?.image ?? ""),
      };

      if (
        !Number.isFinite(normalized.id) ||
        !normalized.name ||
        !Number.isFinite(normalized.price) ||
        normalized.price < 0
      ) {
        throw new Error(`Dữ liệu sản phẩm không hợp lệ (id: ${product?.id}).`);
      }

      return normalized;
    });
  }
}
