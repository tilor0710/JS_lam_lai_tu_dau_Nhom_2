import { BaseView } from "../../../base/baseView.js";
import searchIcon from "lucide-static/icons/search.svg";
import clockIcon from "lucide-static/icons/clock.svg";
import arrowRightIcon from "lucide-static/icons/arrow-right.svg";
import mapPinIcon from "lucide-static/icons/map-pin.svg";

export class LocateView extends BaseView {
  constructor() {
    super("#app-content");
    this.map = null;
    this.markersLayer = null;
    this.locations = [];
    this.onSearch = null;
  }

  getTemplate() {
    return `
      <section class="max-w-7xl mx-auto px-4 py-8">
        
        <!-- TIÊU ĐỀ GÓC CẠNH VỚI DẢI ĐỎ THƯƠNG HIỆU -->
        <div class="border-l-4 border-[#b91c1c] pl-4 mb-8">
          <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Hạ tầng giao nhận toàn quốc</span>
          <h1 class="text-3xl sm:text-4xl font-bold font-['Oswald'] text-gray-900 uppercase tracking-wide mt-0.5">
            MẠNG LƯỚI BƯU CỤC QUICKSHIP
          </h1>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- CỘT TRÁI (5 phần): Tìm kiếm & Danh sách vuông vức -->
          <div class="lg:col-span-5 flex flex-col gap-4 bg-white p-5 border-2 border-gray-900 shadow-[6px_6px_0px_0px_#0f172a] rounded-none">
            
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-700">Tìm kiếm bưu cục gần nhất:</label>
              <div class="flex border-2 border-gray-900 focus-within:border-[#b91c1c] transition rounded-none">
                <input 
                  id="locate-search-input" 
                  type="text" 
                  placeholder="Nhập tên quận, thành phố hoặc địa chỉ..." 
                  class="flex-1 px-3.5 py-2.5 text-sm text-gray-900 outline-none bg-white rounded-none"
                />
                <button 
                  id="locate-search-btn" 
                  class="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-5 py-2.5 text-xs font-['Oswald'] font-bold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer border-l-2 border-gray-900 rounded-none shrink-0"
                >
                  <img src="${searchIcon}" class="w-4 h-4 invert brightness-0" alt="" />
                  <span>Tìm</span>
                </button>
              </div>
            </div>

            <!-- DANH SÁCH BƯU CỤC VUÔNG VỰC -->
            <div id="locate-list" class="flex flex-col gap-3 max-h-[460px] overflow-y-auto pr-1 mt-2">
              <div class="p-4 text-xs font-mono text-gray-500 uppercase tracking-wider border border-gray-200 text-center">
                Đang tải dữ liệu mạng lưới bưu cục...
              </div>
            </div>

          </div>

          <!-- CỘT PHẢI (7 phần): BẢN ĐỒ VUÔNG VỨC ĐỔ BÓNG ĐỎ ĐÔ -->
          <div class="lg:col-span-7 sticky top-4">
            <div class="border-2 border-gray-900 shadow-[6px_6px_0px_0px_#b91c1c] rounded-none overflow-hidden bg-gray-100">
              <div id="locate-map" class="h-[520px] w-full rounded-none z-0"></div>
            </div>
          </div>

        </div>
      </section>
    `;
  }

  run() {
    setTimeout(() => {
      const mapContainer = document.querySelector("#locate-map");

      if (window.L && mapContainer && !this.map) {
        this.map = window.L.map("locate-map", {
          zoomControl: true,
        }).setView([10.7798, 106.699], 12);

        window.L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution: "© OpenStreetMap contributors",
          },
        ).addTo(this.map);

        this.markersLayer = window.L.layerGroup().addTo(this.map);
        this.map.invalidateSize();

        this.drawMarkers();
      }
    }, 50);

    const searchBtn = document.querySelector("#locate-search-btn");
    const searchInput = document.querySelector("#locate-search-input");

    const triggerSearch = () => {
      const keyword = searchInput?.value.trim() || "";
      if (this.onSearch) this.onSearch(keyword);
    };

    if (searchBtn) searchBtn.addEventListener("click", triggerSearch);
    if (searchInput) {
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") triggerSearch();
      });
    }
  }

  renderLocations(locations) {
    this.locations = locations || [];
    this.renderList();
    this.drawMarkers();
  }

  renderList() {
    const listContainer = document.querySelector("#locate-list");
    if (!listContainer) return;

    listContainer.innerHTML = "";

    if (this.locations.length === 0) {
      listContainer.innerHTML = `
        <div class="p-6 text-center text-xs font-bold uppercase tracking-wider text-[#b91c1c] bg-red-50 border-2 border-[#b91c1c] rounded-none">
          Không tìm thấy bưu cục nào phù hợp!
        </div>
      `;
      return;
    }

    this.locations.forEach((loc) => {
      const card = document.createElement("div");
      // Style thẻ bưu cục: Góc vuông, hover đổ bóng cứng viền đỏ
      card.className =
        "p-4 bg-white border-2 border-gray-200 hover:border-[#b91c1c] hover:shadow-[4px_4px_0px_0px_#b91c1c] transition-all cursor-pointer rounded-none flex flex-col gap-1.5 group";

      // Đã thay thế toàn bộ emoji bằng Lucide Icons
      card.innerHTML = `
        <div class="flex items-start justify-between gap-2">
          <h3 class="font-['Oswald'] font-bold text-sm tracking-wide text-gray-900 uppercase group-hover:text-[#b91c1c] transition">
            ${loc.name}
          </h3>
          <span class="text-[10px] font-mono bg-gray-100 text-gray-700 px-1.5 py-0.5 border border-gray-300 font-bold uppercase shrink-0 rounded-none">
            BƯU CỤC
          </span>
        </div>
        <p class="text-xs text-gray-600 leading-relaxed">${loc.address}</p>
        <div class="flex justify-between items-center text-[11px] text-gray-500 mt-2 pt-2 border-t border-gray-100">
          <span class="flex items-center gap-1.5 font-medium">
            <img src="${clockIcon}" class="w-3.5 h-3.5 text-gray-500" alt="" />
            ${loc.operatingHours || "07:30 - 18:30"}
          </span>
          <span class="text-[#b91c1c] font-['Oswald'] font-bold uppercase text-xs tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition">
            Xem vị trí <img src="${arrowRightIcon}" class="w-3 h-3" alt="" />
          </span>
        </div>
      `;

      card.addEventListener("click", () => {
        if (this.map && loc.lat && loc.lng) {
          this.map.flyTo([loc.lat, loc.lng], 16, { duration: 1.2 });
        }
      });

      listContainer.appendChild(card);
    });
  }

  drawMarkers() {
    if (!this.map || !this.markersLayer || this.locations.length === 0) return;

    this.markersLayer.clearLayers();

    this.locations.forEach((loc) => {
      if (loc.lat && loc.lng) {
        const marker = window.L.marker([loc.lat, loc.lng]).addTo(
          this.markersLayer,
        );
        // Popup trên bản đồ cũng thiết kế theo phong cách vuông vức dứt khoát
        marker.bindPopup(`
          <div style="font-family: 'Asap', sans-serif; font-size: 12px; padding: 2px;">
            <div style="font-family: 'Oswald', sans-serif; font-weight: bold; font-size: 14px; color: #b91c1c; text-transform: uppercase;">
              ${loc.name}
            </div>
            <p style="margin: 4px 0 6px 0; color: #334155;">${loc.address}</p>
            <div style="font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 4px;">
              Hotline: <b>${loc.phone || "1900 9999"}</b>
            </div>
          </div>
        `);
      }
    });

    if (this.locations[0]?.lat && this.locations[0]?.lng) {
      this.map.setView([this.locations[0].lat, this.locations[0].lng], 12);
    }
  }
}
