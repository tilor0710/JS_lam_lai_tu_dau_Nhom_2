import truckIcon from "lucide-static/icons/truck.svg";
import layoutDashboardIcon from "lucide-static/icons/layout-dashboard.svg";
import packageIcon from "lucide-static/icons/package.svg";
import mapPinIcon from "lucide-static/icons/map-pin.svg";
import calculatorIcon from "lucide-static/icons/calculator.svg";
import shoppingBagIcon from "lucide-static/icons/shopping-bag.svg";
import logOutIcon from "lucide-static/icons/log-out.svg";
import xIcon from "lucide-static/icons/x.svg";

export class AdminSidebar {
  static getTemplate(activeTab = "dashboard") {
    const menuItems = [
      {
        id: "dashboard",
        label: "Tổng quan",
        icon: layoutDashboardIcon,
        link: "#/admin",
      },
      {
        id: "shipments",
        label: "Quản lý Vận đơn",
        icon: packageIcon,
        link: "#/admin/shipments",
      },
      {
        id: "locations",
        label: "Mạng lưới Bưu cục",
        icon: mapPinIcon,
        link: "#/admin/locations",
      },
      {
        id: "rates",
        label: "Cấu hình Bảng cước",
        icon: calculatorIcon,
        link: "#/admin/rates",
      },
      {
        id: "products",
        label: "Kho Vật tư Shop",
        icon: shoppingBagIcon,
        link: "#/admin/products",
      },
    ];

    const navigation = /*html*/ `
      <nav class="p-3 flex flex-col gap-1.5 mt-2">
        ${menuItems
          .map(
            (item) => /*html*/ `
            <a
              href="${item.link}"
              class="flex items-center gap-3 px-3.5 py-3 text-xs font-['Oswald'] font-bold uppercase tracking-wider transition rounded-none border-l-4 ${
                activeTab === item.id
                  ? "bg-[#1e293b] text-[#f59e0b] border-[#f59e0b]"
                  : "text-gray-400 border-transparent hover:bg-[#1e293b]/70 hover:text-white"
              }"
            >
              <img src="${item.icon}" class="w-4 h-4 invert brightness-0 opacity-80" alt="" />
              <span>${item.label}</span>
            </a>
          `,
          )
          .join("")}
      </nav>
    `;

    return /*html*/ `
      <!-- Menu quản trị trên màn hình lớn -->
      <aside class="hidden lg:flex w-64 bg-[#0f172a] text-gray-300 border-r-2 border-gray-900 flex-col justify-between shrink-0 min-h-screen">
        <div>

          <div class="h-18 px-5 border-b-2 border-gray-900 bg-[#0b1120] flex items-center gap-2.5">
            <div class="bg-[#b91c1c] p-2 text-white flex items-center justify-center">
              <img src="${truckIcon}" alt="Logo" class="w-5 h-5 invert brightness-0" />
            </div>
            <div>
              <div class="font-['Oswald'] font-bold text-lg uppercase tracking-wider text-white">
                QUICK<span class="text-[#f59e0b]">SHIP</span>
              </div>
              <div class="text-[9px] font-mono uppercase tracking-widest text-[#f59e0b] font-bold">
                PORTAL QUẢN TRỊ
              </div>
            </div>
          </div>

          ${navigation}
        </div>


        <div class="p-4 border-t-2 border-gray-900 bg-[#0b1120]">
          <a href="#/" class="flex items-center justify-center gap-2 w-full py-2.5 px-3 border border-gray-700 hover:border-[#b91c1c] text-xs font-bold uppercase text-gray-300 hover:text-white hover:bg-[#b91c1c] transition rounded-none">
            <img src="${logOutIcon}" class="w-3.5 h-3.5 invert brightness-0" alt="" />
            <span>Về Trang chủ</span>
          </a>
        </div>
      </aside>

      <!-- Menu quản trị dạng drawer trên điện thoại -->
      <div id="admin-mobile-sidebar" class="fixed inset-0 z-50 hidden lg:hidden" aria-hidden="true">
        <button
          type="button"
          data-close-admin-menu
          aria-label="Đóng menu"
          class="absolute inset-0 h-full w-full bg-slate-950/60"
        ></button>
        <aside class="relative flex min-h-full w-72 max-w-[85vw] flex-col justify-between border-r-2 border-gray-900 bg-[#0f172a] text-gray-300 shadow-[8px_0px_0px_0px_#b91c1c]">
          <div>
            <div class="flex h-18 items-center justify-between border-b-2 border-gray-900 bg-[#0b1120] px-5">
              <div class="flex items-center gap-2.5">
                <div class="flex items-center justify-center bg-[#b91c1c] p-2 text-white">
                  <img src="${truckIcon}" alt="" class="h-5 w-5 invert brightness-0" />
                </div>
                <div>
                  <div class="font-['Oswald'] text-lg font-bold uppercase tracking-wider text-white">
                    QUICK<span class="text-[#f59e0b]">SHIP</span>
                  </div>
                  <div class="text-[9px] font-mono font-bold uppercase tracking-widest text-[#f59e0b]">
                    PORTAL QUẢN TRỊ
                  </div>
                </div>
              </div>
              <button
                type="button"
                data-close-admin-menu
                aria-label="Đóng menu"
                class="border border-gray-700 p-2 text-gray-300 transition hover:border-[#f59e0b] hover:text-white"
              >
                <img src="${xIcon}" alt="" class="h-4 w-4 invert brightness-0" />
              </button>
            </div>
            ${navigation}
          </div>
          <div class="border-t-2 border-gray-900 bg-[#0b1120] p-4">
            <a href="#/" class="flex w-full items-center justify-center gap-2 rounded-none border border-gray-700 px-3 py-2.5 text-xs font-bold uppercase text-gray-300 transition hover:border-[#b91c1c] hover:bg-[#b91c1c] hover:text-white">
              <img src="${logOutIcon}" class="h-3.5 w-3.5 invert brightness-0" alt="" />
              <span>Về Trang chủ</span>
            </a>
          </div>
        </aside>
      </div>
    `;
  }
}
