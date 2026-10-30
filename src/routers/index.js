import Navigo from "navigo";
import { HomeController } from "../controllers/home/HomeController.js";
import { LocateController } from "../controllers/locate/LocateController.js";
import { ShopController } from "../controllers/shop/ShopController.js";
import { CalculateRatesController } from "../controllers/calculate/CalculateRatesController.js";
import { CartController } from "../controllers/cart/cartController.js";
import { AuthController } from "../controllers/auth/AuthController.js";
import { UserDashboardController } from "../controllers/user/UserDashboardController.js";
import { AdminDashboardController } from "../controllers/admin/AdminDashboardController.js";
import { AdminShipmentsController } from "../controllers/admin/AdminShipmentsController.js";
import { AdminLocationsController } from "../controllers/admin/AdminLocationsController.js";
import { AdminRatesController } from "../controllers/admin/AdminRatesController.js";
import { AdminProductsController } from "../controllers/admin/AdminProductsController.js";

import { AuthService } from "../services/AuthService.js";

export const router = new Navigo("/", { hash: true });
const adminGuard = (callback) => {
  if (!AuthService.isAdmin()) {
    alert("⚠️ CẢNH BÁO: Bạn cần đăng nhập với tài khoản ADMIN để truy cập!");
    router.navigate("/auth");
    return;
  }
  callback();
};

export const initRouter = () => {
  router
    .on("/", () => new HomeController().init())
    .on("/locate-us", () => new LocateController().init())
    .on("/calculate-rates", () => new CalculateRatesController().init())
    .on("/shop", () => new ShopController().init())
    .on("/cart", () => new CartController().init())
    .on("/auth", () => new AuthController("login").init())
    .on("/login", () => router.navigate("/auth"))
    .on("/register", () => new AuthController("register").init())
    .on("/user", () => {
      if (!AuthService.isAuthenticated()) {
        router.navigate("/auth");
        return;
      }
      new UserDashboardController().init();
    })
    .on("/admin", () => adminGuard(() => new AdminDashboardController().init()))
    .on("/admin/shipments", () =>
      adminGuard(() => new AdminShipmentsController().init()),
    )
    .on("/admin/locations", () =>
      adminGuard(() => new AdminLocationsController().init()),
    )
    .on("/admin/rates", () =>
      adminGuard(() => new AdminRatesController().init()),
    )
    .on("/admin/products", () =>
      adminGuard(() => new AdminProductsController().init()),
    )
    .notFound(() => {
      const content = document.querySelector("#app-content");
      if (content) {
        content.innerHTML = /*html*/ `
          <!-- Trang thông báo không tìm thấy đường dẫn -->
          <div class="max-w-7xl mx-auto px-4 py-24 text-center">
            <div class="inline-block p-8 bg-white border-2 border-gray-900 shadow-[6px_6px_0px_0px_#b91c1c] rounded-none">
              <h1 class="font-['Oswald'] text-5xl font-extrabold text-[#b91c1c] tracking-wider">404 ERROR</h1>
              <p class="font-['Oswald'] text-lg uppercase font-bold text-gray-900 mt-2">KHÔNG TÌM THẤY TRANG YÊU CẦU</p>
              <a href="#/" class="inline-block mt-6 px-6 py-2.5 bg-[#b91c1c] text-white font-['Oswald'] text-xs font-bold uppercase rounded-none">Quay về trang chủ</a>
            </div>
          </div>
        `;
      }
    })
    .resolve();
};
