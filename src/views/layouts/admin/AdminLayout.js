import { AdminSidebar } from "./AdminSidebar.js";
import bellIcon from "lucide-static/icons/bell.svg";
import logOutIcon from "lucide-static/icons/log-out.svg";

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
        <div class="flex min-h-screen bg-[#f8fafc] text-gray-900 font-['Asap']">


          ${AdminSidebar.getTemplate(activeTab)}


          <div class="flex-1 flex flex-col min-w-0">


            <!-- Thanh thông tin quản trị và đăng xuất -->
            <header class="h-18 bg-white border-b-2 border-gray-900 px-6 flex items-center justify-between sticky top-0 z-30">
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono font-bold bg-[#b91c1c] text-white px-2 py-0.5 uppercase tracking-widest">
                  ADMIN PORTAL
                </span>
                <span class="text-xs text-gray-500 font-medium hidden sm:inline">
                  • Hệ thống quản trị thời gian thực
                </span>
              </div>


              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2.5 border-l border-gray-300 pl-4">
                  <div class="w-8 h-8 bg-gray-900 text-white flex items-center justify-center font-bold font-['Oswald'] text-sm border border-[#f59e0b]">
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


            <main class="flex-1 p-6 lg:p-8 overflow-y-auto">
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
    }
  }
}
