import Navigo from "navigo";
import { HomeController } from "../controllers/home/HomeController.js";
import { LocateController } from "../controllers/locate/LocateController.js";
import { ShopController } from "../controllers/shop/ShopController.js";
import { CartController } from "../controllers/cart/cartController.js";
import { CalculateRatesController } from "../controllers/calculate/CalculateRatesController.js";
import { AuthController } from "../controllers/auth/AuthController.js";

export const router = new Navigo("/", { hash: true });

export const initRouter = () => {
  router
    // Trang chủ
    .on("/", () => {
      const homeCtrl = new HomeController();
      homeCtrl.init();
    })
    // Mạng lưới bưu cục (Bản đồ Leaflet)
    .on("/locate-us", () => {
      const locateCtrl = new LocateController();
      locateCtrl.init();
    })
    .on("/calculate-rates", () => {
      // <-- THÊM ROUTE NÀY
      const calcCtrl = new CalculateRatesController();
      calcCtrl.init();
    })
    // Cửa hàng vật tư đóng gói
    .on("/shop", () => {
      const shopCtrl = new ShopController();
      shopCtrl.init();
    })
    // Giỏ hàng
    .on("/cart", () => {
      const cartCtrl = new CartController();
      cartCtrl.init();
    })
    .on("/auth", () => {
      const authCtrl = new AuthController();
      authCtrl.init();
    })
    // Trang 404 góc cạnh
    .notFound(() => {
      const content = document.querySelector("#app-content");
      if (content) {
        content.innerHTML = `
          <div class="max-w-7xl mx-auto px-4 py-24 text-center">
            <div class="inline-block p-8 bg-white border-2 border-gray-900 shadow-[6px_6px_0px_0px_#b91c1c] rounded-none">
              <h1 class="font-['Oswald'] text-5xl font-extrabold text-[#b91c1c] tracking-wider">404 ERROR</h1>
              <p class="font-['Oswald'] text-lg uppercase font-bold text-gray-900 mt-2">KHÔNG TÌM THẤY TRANG YÊU CẦU</p>
              <p class="text-xs text-gray-600 mt-1 max-w-sm">Đường dẫn bạn truy cập có thể đã thay đổi hoặc không tồn tại trong hệ thống.</p>
              <a href="#/" class="inline-block mt-6 px-6 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-['Oswald'] text-xs font-bold uppercase tracking-wider transition rounded-none">
                Quay về trang chủ
              </a>
            </div>
          </div>
        `;
      }
    })
    .resolve();
};
