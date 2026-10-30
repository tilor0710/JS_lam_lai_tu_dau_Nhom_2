import { BaseController } from "../../base/baseController.js";
import { ProductDetailView } from "../../views/pages/shop/ProductDetailView.js";
import { ProductModel } from "../../models/ProductModel.js";
import { ProductService } from "../../services/ProductService.js";
import { Layout } from "../../views/layouts/Layout.js";
import { cartService } from "../../services/CartService.js";

export class ShopDetailController extends BaseController {
    constructor() {
        const productService = new ProductService(new ProductModel());
        const view = new ProductDetailView();
        super(productService, view);
    }

    #getProductIdFromUrl() {
        const hashQuery = window.location.hash.split("?")[1] || "";
        const queryString = hashQuery || window.location.search.slice(1);
        const params = new URLSearchParams(queryString);
        const productId = Number(params.get("id"));

        return Number.isInteger(productId) && productId > 0 ? productId : null;
    }

    async init() {
        Layout.render(true);

        this.view.onAddToCart = async (product, quantity) => {
            if (!product || !Number.isInteger(quantity) || quantity <= 0) {
                alert("Số lượng sản phẩm không hợp lệ.");
                return;
            }

            await cartService.addItem(product, quantity);
            alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng.`);
        };

        const productId = this.#getProductIdFromUrl();

        this.view.render({ loading: true });

        try {
            if (!productId) {
                throw new Error("Không tìm thấy ID sản phẩm trong URL.");
            }

            const product = await this.service.getProductById(productId);
            if (!product) {
                throw new Error("Sản phẩm không tồn tại hoặc đã bị xoá.");
            }

            this.view.currentProduct = product;
            this.view.render({ product });
        } catch (error) {
            this.view.render({
                error: error.message || "Không thể tải chi tiết sản phẩm.",
            });
        }
    }
}
