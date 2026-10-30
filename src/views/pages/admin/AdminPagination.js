export const ADMIN_PAGE_SIZE = 10;

export const getPageItems = (items, currentPage, pageSize = ADMIN_PAGE_SIZE) => {
  const startIndex = (currentPage - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export const getPaginationPages = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = [1];
  const startPage =
    currentPage <= 2
      ? 2
      : currentPage >= totalPages - 1
        ? totalPages - 2
        : currentPage - 1;
  const endPage =
    currentPage <= 2
      ? Math.min(totalPages - 1, 3)
      : currentPage >= totalPages - 1
        ? totalPages - 1
        : currentPage + 1;

  if (startPage > 2) pages.push("…");
  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page);
  }
  if (endPage < totalPages - 1) pages.push("…");
  pages.push(totalPages);

  return pages;
};

export const getPaginationTemplate = (
  totalItems,
  currentPage,
  {
    pageSize = ADMIN_PAGE_SIZE,
    containerId = "admin-pagination",
    ariaLabel = "Phân trang",
  } = {},
) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);
  const pageButtons = getPaginationPages(currentPage, totalPages)
    .map((page) =>
      typeof page === "number"
        ? /*html*/ `
          <button
            type="button"
            data-page="${page}"
            aria-label="Trang ${page}"
            ${page === currentPage ? 'aria-current="page"' : ""}
            class="min-w-9 h-9 px-2 border-2 border-gray-900 font-mono font-bold text-xs transition ${
              page === currentPage
                ? "bg-[#b91c1c] text-white shadow-[2px_2px_0px_0px_#0f172a]"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }"
          >
            ${page}
          </button>
        `
        : /*html*/ `<span class="px-1 text-gray-500" aria-hidden="true">…</span>`,
    )
    .join("");

  return /*html*/ `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t-2 border-gray-200 px-3 py-3">
      <p class="text-xs font-mono text-gray-600" aria-live="polite">
        Hiển thị <span class="font-bold text-gray-900">${firstItem}–${lastItem}</span>
        trên <span class="font-bold text-gray-900">${totalItems}</span> mục
      </p>
      ${
        totalPages > 1
          ? /*html*/ `
            <nav id="${containerId}" aria-label="${ariaLabel}" class="flex flex-wrap items-center justify-center gap-1">
              <button
                type="button"
                data-page="${currentPage - 1}"
                aria-label="Trang trước"
                ${currentPage === 1 ? "disabled" : ""}
                class="w-9 h-9 border-2 border-gray-900 font-mono text-xl font-bold transition ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }"
              >
                ‹
              </button>
              ${pageButtons}
              <button
                type="button"
                data-page="${currentPage + 1}"
                aria-label="Trang sau"
                ${currentPage === totalPages ? "disabled" : ""}
                class="w-9 h-9 border-2 border-gray-900 font-mono text-xl font-bold transition ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }"
              >
                ›
              </button>
            </nav>
          `
          : ""
      }
    </div>
  `;
};
