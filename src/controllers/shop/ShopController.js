import { BaseController } from "../../base/baseController.js";
import { ShopView } from "../../views/pages/shop/ShopView.js";
import { Layout } from "../../views/layouts/Layout.js";
import { ProductModel } from "../../models/ProductModel.js";
import { ProductService } from "../../services/ProductService.js";
import { cartService } from "../../services/CartService.js";

export class ShopController extends BaseController {
    constructor() {
        const shopView = new ShopView();
        const productService = new ProductService(new ProductModel());
        super(productService, shopView, true);
    }

    async init() {
        Layout.render(true);

        this.view.onAddToCart = async (product) => {
            await cartService.addItem(product);
        };

        this.view.onBuyNow = (productId) => {
            const id = Number(productId);
            if (!Number.isInteger(id) || id <= 0) {
                alert("Sản phẩm không hợp lệ.");
                return;
            }

            window.location.hash = `#/shop/detail?id=${id}`;
        };

        this.view.onFilterChange = ({
            searchTerm,
            selectedCategory,
            sortBy,
        }) => {
            this.view.searchTerm = searchTerm;
            this.view.selectedCategory = selectedCategory;
            this.view.sortBy = sortBy;

            const products = this.view.getVisibleProducts();
            this.view.render({
                products,
                categories: this.view.getCategories(this.view.allProducts),
                searchValue: searchTerm,
                selectedCategory,
                sortBy,
            });
        };

        try {
            const products = await this.service.getProducts();
            await cartService.load(products);

            this.view.allProducts = products;
            this.view.searchTerm = "";
            this.view.selectedCategory = "Tất cả";
            this.view.sortBy = "none";

            this.view.render({
                products: this.view.getVisibleProducts(),
                categories: this.view.getCategories(products),
                searchValue: "",
                selectedCategory: "Tất cả",
                sortBy: "none",
            });
        } catch (error) {
            console.error(
                "[ShopController Error]: Không tải được sản phẩm:",
                error,
            );
            this.view.render({
                error: "Không tải được danh sách sản phẩm. Vui lòng thử lại sau.",
            });
        }
    }
}
