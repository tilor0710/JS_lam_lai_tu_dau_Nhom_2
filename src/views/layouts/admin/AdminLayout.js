import { AdminSidebar } from "./AdminSidebar.js";
import logOutIcon from "lucide-static/icons/log-out.svg";
import menuIcon from "lucide-static/icons/menu.svg";

export class AdminLayout {
  static render(contentHtml, activeTab = "dashboard") {
    const clientHeader = document.querySelector("#app-header");
    const clientFooter = document.querySelector("#app-footer");
    if (clientHeader) clientHeader.innerHTML = "";
    if (clientFooter) clientFooter.innerHTML = "";
    const appContent = document.querySelector("#app-content");
    if (appContent) {
      appContent.innerHTML = /*html*/ `
        <!-- Khung quản trị gồm thanh trên và nội dung trang -->
        <div class="flex min-h-screen w-full min-w-0 max-w-full overflow-x-clip bg-[#f8fafc] text-gray-900 font-['Asap']">


          ${AdminSidebar.getTemplate(activeTab)}


          <div class="flex min-h-screen min-w-0 flex-1 flex-col">


            <!-- Thanh thông tin quản trị và đăng xuất -->
            <header class="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-2 border-b-2 border-gray-900 bg-white px-3 sm:min-h-18 sm:px-6">
              <div class="flex min-w-0 items-center gap-2">
                <button
                  id="btn-admin-menu"
                  type="button"
                  aria-label="Mở menu quản trị"
                  aria-expanded="false"
                  aria-controls="admin-mobile-sidebar"
                  class="shrink-0 border-2 border-gray-900 bg-white p-2 transition hover:bg-gray-100 lg:hidden"
                >
                  <img src="${menuIcon}" alt="" class="h-4 w-4" />
                </button>
                <span class="text-xs font-mono font-bold bg-[#b91c1c] text-white px-2 py-0.5 uppercase tracking-widest">
                  ADMIN PORTAL
                </span>
                <span class="hidden text-xs font-medium text-gray-500 xl:inline">
                  • Hệ thống quản trị thời gian thực
                </span>
              </div>


              <div class="flex shrink-0 items-center gap-2 sm:gap-4">
                <div class="flex items-center gap-2 border-l border-gray-300 pl-2 sm:gap-2.5 sm:pl-4">
                  <div class="flex h-8 w-8 items-center justify-center border border-[#f59e0b] bg-gray-900 font-['Oswald'] text-sm font-bold text-white">
                    AD
                  </div>
                  <div class="hidden sm:flex flex-col">
                    <span class="text-xs font-bold text-gray-900 uppercase">Admin QuickShip</span>
                    <span class="text-[10px] font-mono text-[#b91c1c] font-bold">SUPER_ADMIN</span>
                  </div>
                </div>

                <button
                  id="btn-admin-logout"
                  class="p-2 border border-gray-300 bg-gray-50 text-gray-700 hover:bg-[#b91c1c] hover:text-white hover:border-[#b91c1c] transition cursor-pointer"
                  title="Đăng xuất Admin"
                >
                  <img src="${logOutIcon}" class="w-4 h-4" alt="Logout" />
                </button>
              </div>
            </header>


            <main class="w-full min-w-0 flex-1 overflow-y-auto p-3 sm:p-5 lg:p-8">
              ${contentHtml}
            </main>

          </div>

        </div>
      `;
      document
        .querySelector("#btn-admin-logout")
        ?.addEventListener("click", () => {
          localStorage.removeItem("quickship_current_user");
          localStorage.removeItem("quickship_jwt_token");
          window.location.hash = "#/auth";
        });

      const mobileSidebar = document.querySelector("#admin-mobile-sidebar");
      const menuButton = document.querySelector("#btn-admin-menu");
      const closeMobileSidebar = () => {
        mobileSidebar?.classList.add("hidden");
        mobileSidebar?.setAttribute("aria-hidden", "true");
        menuButton?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("overflow-hidden");
      };

      menuButton?.addEventListener("click", () => {
        mobileSidebar?.classList.remove("hidden");
        mobileSidebar?.setAttribute("aria-hidden", "false");
        menuButton.setAttribute("aria-expanded", "true");
        document.body.classList.add("overflow-hidden");
      });
      mobileSidebar?.querySelectorAll("[data-close-admin-menu]").forEach((button) => {
        button.addEventListener("click", closeMobileSidebar);
      });
      mobileSidebar?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMobileSidebar);
      });
    }
  }
}
