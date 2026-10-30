import { BaseController } from "../../base/baseController.js";
import { AdminProductsView } from "../../views/pages/admin/AdminProductsView.js";
import { AdminLayout } from "../../views/layouts/admin/AdminLayout.js";
import { ProductModel } from "../../models/ProductModel.js";
import { ADMIN_PAGE_SIZE } from "../../views/pages/admin/AdminPagination.js";

export class AdminProductsController extends BaseController {
  constructor() {
    const view = new AdminProductsView();
    super(null, view, false);
    this.productModel = new ProductModel();
  }

  async init() {
    let products = [];
    const renderCurrentPage = () => {
      AdminLayout.render(this.view.getTemplate(products), "products");
      this.view.run();
    };
    const renderPage = async (focusProductId) => {
      products = await this.productModel.getAll();
      if (focusProductId !== undefined) {
        const index = products.findIndex(
          (product) => String(product.id) === String(focusProductId),
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

    this.view.onCreateProduct = async (payload) => {
      const product = await this.productModel.post(payload);
      alert("Đã thêm mặt hàng thành công vào kho vật tư!");
      await renderPage(product?.id);
    };

    this.view.onDeleteProduct = async (id) => {
      await this.productModel.deleteOne(id);
      await renderPage();
    };

    await renderPage();
  }
}
