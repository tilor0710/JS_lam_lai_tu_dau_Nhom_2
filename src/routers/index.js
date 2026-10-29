import Navigo from "navigo";
import { RegisterController } from "../controllers/auth/RegisterController.js";
import { HomeController } from "../controllers/home/HomeController.js";
import { ShopController } from "../controllers/shop/ShopController.js";
import { LoginController } from "../controllers/auth/LoginController.js";
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
    .on("/login", () => {
    const login = new LoginController();
    login.init();
    })
    .on("/register", () => {
    const register = new RegisterController();
    register.init();
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
