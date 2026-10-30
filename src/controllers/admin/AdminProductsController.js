import { BaseController } from "../../base/baseController.js";
import { AdminProductsView } from "../../views/pages/admin/AdminProductsView.js";
import { AdminLayout } from "../../views/layouts/admin/AdminLayout.js";
import { ProductModel } from "../../models/ProductModel.js";

export class AdminProductsController extends BaseController {
  constructor() {
    const view = new AdminProductsView();
    super(null, view, false);
    this.productModel = new ProductModel();
  }

  async init() {
    const renderPage = async () => {
      const products = await this.productModel.getAll();
      AdminLayout.render(this.view.getTemplate(products), "products");
      this.view.run();
    };

    this.view.onCreateProduct = async (payload) => {
      await this.productModel.post(payload);
      alert("Đã thêm mặt hàng thành công vào kho vật tư!");
      await renderPage();
    };

    this.view.onDeleteProduct = async (id) => {
      await this.productModel.deleteOne(id);
      await renderPage();
    };

    await renderPage();
  }
}
