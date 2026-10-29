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
        stock:
          product?.stock === undefined
            ? undefined
            : Number(product.stock),
      };

      if (
        !Number.isInteger(normalized.id) ||
        normalized.id <= 0 ||
        !normalized.name ||
        !Number.isFinite(normalized.price) ||
        normalized.price < 0 ||
        (normalized.stock !== undefined &&
          (!Number.isFinite(normalized.stock) || normalized.stock < 0))
      ) {
        throw new Error(`Dữ liệu sản phẩm không hợp lệ (id: ${product?.id}).`);
      }

      if (normalized.stock !== undefined) {
        normalized.stock = Math.floor(normalized.stock);
      }

      return normalized;
    });
  }
}
