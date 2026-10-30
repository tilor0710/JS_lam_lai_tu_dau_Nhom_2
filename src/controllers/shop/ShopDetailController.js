import { BaseController } from "../../base/baseController.js";
import { ProductDetailView } from "../../views/pages/shop/ProductDetailView.js";
import { ProductModel } from "../../models/ProductModel.js";
import { ProductService } from "../../services/ProductService.js";
import { Layout } from "../../views/layouts/Layout.js";
import { cartService } from "../../services/CartService.js";
import { Popup } from "../../components/Popup.js";

export class ShopDetailController extends BaseController {
    constructor() {
        const productService = new ProductService(new ProductModel());
        const view = new ProductDetailView();
        super(productService, view);
    }

    #getProductIdFromUrl(match) {
        const params = new URLSearchParams(
            match?.queryString ?? window.location.search.slice(1),
        );
        const productId = Number(params.get("id"));

        return Number.isInteger(productId) && productId > 0 ? productId : null;
    }

    async init(match) {
        Layout.render(true);

        this.view.onAddToCart = async (product, quantity) => {
            if (!product || !Number.isInteger(quantity) || quantity <= 0) {
                await Popup.alert("Số lượng sản phẩm không hợp lệ.", {
                    title: "Không thể thêm sản phẩm",
                    type: "error",
                });
                return;
            }

            try {
                await cartService.addItem(product, quantity);
                await Popup.alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng.`);
            } catch (error) {
                console.error("[ShopDetailController Error]: Không thêm được sản phẩm vào giỏ hàng:", error);
                await Popup.alert(
                    error.message || "Không thể thêm sản phẩm vào giỏ hàng.",
                    { title: "Không thể thêm sản phẩm", type: "error" },
                );
            }
        };

        const productId = this.#getProductIdFromUrl(match);

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
            document.title = `${product.name} | QuickShip`;
            this.view.render({ product });
        } catch (error) {
            this.view.render({
                error: error.message || "Không thể tải chi tiết sản phẩm.",
            });
        }
    }
}
