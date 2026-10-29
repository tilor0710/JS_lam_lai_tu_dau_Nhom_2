# JS_Nang_Cao_Nhom_2

## Chạy ứng dụng

Chạy `npm install` một lần, sau đó dùng `npm run dev` để khởi động giao diện Vite
và API JSON Server. API chạy tại `http://localhost:3000`; dữ liệu sản phẩm và
giỏ hàng được đọc/ghi bằng Fetch API từ `db.json`.

Giỏ hàng sử dụng `GET /carts/1` để tải dữ liệu và `PATCH /carts/1` để lưu thay đổi.
Không mở `index.html` trực tiếp hoặc chỉ chạy Vite, vì khi đó API lưu dữ liệu
trong `db.json` sẽ không hoạt động.
