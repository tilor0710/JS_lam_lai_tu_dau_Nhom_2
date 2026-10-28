import Navigo from "navigo";
import { HomeController } from "../controllers/home/HomeController.js";
import { ShopController } from "../controllers/shop/ShopController.js";
import { LocateController } from "../controllers/locate/LocateController.js"; // <-- THÊM DÒNG NÀY

export const router = new Navigo("/", { hash: true });

export const initRouter = () => {
  router
    .on("/", () => {
      const home = new HomeController();
      home.init();
    })
    .on("/shop", () => {
      const shop = new ShopController();
      shop.init();
    })
    .on("/locate-us", () => {
      const locateCtrl = new LocateController();
      locateCtrl.init();
    })
    .notFound(() => {
      const content = document.querySelector("#app-content");
      if (content) {
        content.innerHTML = /*html*/ `
          <div class="text-center py-20">
            <h1 class="text-4xl font-extrabold text-red-500">404</h1>
            <p class="text-gray-500 mt-2">Trang không tồn tại!</p>
            <a href="#/" class="inline-block mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm">Quay về trang chủ</a>
          </div>
        `;
      }
    })
    .resolve();
};
