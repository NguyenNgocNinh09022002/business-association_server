// HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY WEBSTIE

* Website sẽ bao gồm 2 phần: client và server:

Bước 1. Clone project về máy:
- Client: git clone https://github.com/NguyenNgocNinh09022002/business-association_client
- Server: git clone https://github.com/NguyenNgocNinh09022002/business-association_server

Bước 2: Truy cập vào thư mục src của 2 project và mở terminal ở vị trí này, thực hiện các lệnh (ở cả 2 project):
- Đầu tiên, chạy lệnh: npm install
- Tiếp theo, chạy lệnh: npm start


Bước 3: Truy cập wesite:
- Truy cập giao diện của người dùng ở đường dẫn: http://localhost:3000

- Truy cập giao diện quản trị admin ở đường dẫn: http://locakhost:3000/admin

** Phân quyền quản trị **

Ở giao diện quản trị có 4 loại quyền
* Mức 1: Thêm xóa sửa bài viết, thành viên: admin_1
* Mức 2: Duyệt bài viết, thành viên: admin_2
* Mức 3: Đăng(cập nhật thao tác tới dữ liệu - thêm/xóa/sửa) bài viết, thành viên: admin_3
* Mức 4: quản lý tài khoản quản trị: thêm/xóa/sửa tài khoản: admin

Để tiếp cận giao diện ứng với từng loại quyền, thực hiện các thao tác sau:
    B1: Tại giao diện quản trị (admin/post) nhấn F12 để mở dev tool
    B2: Chuyển sang tab Application
    B3: Mở rộng mục localstorage, thay đổi value của key "hiephoidoanhnghiep.role" với giá trị là quyền tương ứng ở trên 