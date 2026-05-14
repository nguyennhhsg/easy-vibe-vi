# HTTP Protocol: "Ngôn ngữ giao tiếp" giữa frontend và backend

::: tip 🎯 Câu hỏi cốt lõi
**HTTP hoạt động như thế nào?** Giống như hỏi: hai người làm sao để trò chuyện? Cần thỏa thuận ngôn ngữ, ngữ pháp, quy tắc trò chuyện. HTTP chính là "giao thức đối thoại" giữa frontend và backend.
:::

---

## 0. Bản chất của HTTP

**HTTP**（HyperText Transfer Protocol, Giao thức truyền siêu văn bản）là giao thức cơ bản cho giao tiếp giữa frontend và backend.

### 0.1 Kiểu so sánh với đối thoại

| Phần tử đối thoại | Tương ứng HTTP | Giải thích |
| :--- | :--- | :--- |
| Ngôn ngữ | Giao thức HTTP | Ngôn ngữ mà cả hai bên đều hiểu |
| Ngữ pháp | Định dạng yêu cầu/phản hồi | Cách "nói chuyện" |
| Quy trình | Mô hình yêu cầu-phản hồi | Một hỏi một đáp |
| Kết thúc | Cúp máy | Đóng kết nối TCP |

---

## 1. Quá trình phát triển của HTTP

HTTP ra đời từ năm 1991 đến nay, đã trải qua nhiều lần nâng cấp đáng kể.

<HttpProtocolDemo />

### 1.1 So sánh các phiên bản

| Phiên bản | Năm | Cải tiến cốt lõi | Đặc điểm điển hình |
| :--- | :--- | :--- | :--- |
| **HTTP/0.9** | 1991 | Chỉ hỗ trợ GET | Văn bản thuần, chỉ có yêu cầu, không có tiêu đề phản hồi |
| **HTTP/1.0** | 1996 | Thêm POST/HEAD | Mỗi yêu cầu một kết nối TCP |
| **HTTP/1.1** | 1997 | Kết nối liên tục | Keep-Alive, một kết nối nhiều yêu cầu |
| **HTTP/2** | 2015 | Đa hóa mux | Frame nhị phân, nén tiêu đề |
| **HTTP/3** | 2022 | Dựa trên QUIC | Truyền UDP, giải quyết tắc nghẽn đầu hàng |

::: tip 💡 Tại sao cần HTTP/2?
HTTP/1.1 mặc dù hỗ trợ kết nối liên tục, nhưng các yêu cầu phải được gửi nối tiếp（phải đợi phản hồi của yêu cầu trước mới có thể gửi yêu cầu tiếp theo). HTTP/2 đã giải quyết vấn đề này thông qua đa hóa mux, cho phép gửi nhiều yêu cầu cùng lúc.
:::

---

## 2. Cấu trúc của yêu cầu HTTP

### 2.1 Dòng yêu cầu

```http
GET /api/users/123 HTTP/1.1
```

Chứa ba phần:
- **Phương thức**: GET, POST, PUT, DELETE v.v.
- **URL**: Đường dẫn tài nguyên yêu cầu
- **Phiên bản**: HTTP/1.1 hoặc HTTP/2

### 2.2 Tiêu đề yêu cầu

```http
Host: api.example.com
User-Agent: Mozilla/5.0
Accept: application/json
Authorization: Bearer xxx
Content-Type: application/json
Content-Length: 45
```

Các tiêu đề yêu cầu phổ biến:
| Tiêu đề | Giải thích | Ví dụ |
| :--- | :--- | :--- |
| **Host** | Tên miền máy chủ | `api.example.com` |
| **User-Agent** | Thông tin client | `Mozilla/5.0` |
| **Accept** | Loại phản hồi được chấp nhận | `application/json` |
| **Authorization** | Thông tin xác thực | `Bearer token` |
| **Content-Type** | Loại thân yêu cầu | `application/json` |

### 2.3 Thân yêu cầu

```json
{
  "name": "Trần Văn A",
  "email": "trananh@example.com"
}
```

Chỉ các phương thức POST, PUT, PATCH v.v. mới có thân yêu cầu.

---

## 3. Cấu trúc của phản hồi HTTP

### 3.1 Dòng trạng thái

```http
HTTP/1.1 200 OK
```

Chứa ba phần:
- **Phiên bản**: HTTP/1.1
- **Mã trạng thái**: 200, 404, 500 v.v.
- **Văn bản trạng thái**: OK, Not Found v.v.

### 3.2 Tiêu đề phản hồi

```http
Content-Type: application/json
Content-Length: 156
Cache-Control: max-age=3600
Set-Cookie: session=xxx; HttpOnly
```

Các tiêu đề phản hồi phổ biến:
| Tiêu đề | Giải thích | Ví dụ |
| :--- | :--- | :--- |
| **Content-Type** | Loại thân phản hồi | `application/json` |
| **Content-Length** | Kích thước thân phản hồi | `156` |
| **Cache-Control** | Chiến lược bộ nhớ đệm | `max-age=3600` |
| **Set-Cookie** | Đặt Cookie | `session=xxx` |

### 3.3 Thân phản hồi

```json
{
  "code": 0,
  "data": {
    "id": 123,
    "name": "Trần Văn A"
  }
}
```

---

## 4. Chi tiết các phương thức HTTP

| Phương thức | Mục đích | Thân yêu cầu | Tính chất lũy đẳng | An toàn |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | Lấy tài nguyên | Không | Có | Có |
| **POST** | Tạo tài nguyên | Có | Không | Không |
| **PUT** | Cập nhật toàn bộ | Có | Có | Không |
| **PATCH** | Cập nhật một phần | Có | Không | Không |
| **DELETE** | Xóa tài nguyên | Không | Có | Không |
| **HEAD** | Lấy tiêu đề | Không | Có | Có |
| **OPTIONS** | Truy vấn phương thức được hỗ trợ | Không | Có | Có |

### 4.1 GET và POST

| Tính năng | GET | POST |
| :--- | :--- | :--- |
| **Vị trí tham số** | Tham số truy vấn URL | Thân yêu cầu |
| **Bộ nhớ đệm** | Có thể bộ nhớ đệm | Mặc định không bộ nhớ đệm |
| **Dấu trang** | Có thể thêm dấu trang | Không thể |
| **Lịch sử** | Lưu trong lịch sử trình duyệt | Không lưu |
| **Độ dài dữ liệu** | Bị giới hạn（độ dài URL) | Không giới hạn |
| **An toàn** | Tham số hiển thị trong URL | Tham số trong thân yêu cầu |

::: tip 💡 Khi nào sử dụng GET/POST?
- **GET**: Truy vấn, lấy dữ liệu
- **POST**: Tạo, gửi dữ liệu
- **PUT**: Cập nhật toàn bộ（thay thế toàn bộ tài nguyên)
- **PATCH**: Cập nhật một phần（chỉ sửa các trường được chỉ định)
- **DELETE**: Xóa tài nguyên
:::

---

## 5. Mã trạng thái HTTP

### 5.1 Phân loại mã trạng thái

| Danh mục | Giải thích | Mã trạng thái điển hình |
| :--- | :--- | :--- |
| **2xx** | Thành công | 200 OK、201 Created、204 No Content |
| **3xx** | Chuyển hướng | 301 Vĩnh viễn、302 Tạm thời、304 Không sửa đổi |
| **4xx** | Lỗi client | 400 Lỗi tham số、401 Chưa xác thực、404 Không tồn tại |
| **5xx** | Lỗi server | 500 Lỗi nội bộ、503 Không khả dụng |

### 5.2 Các mã trạng thái thường dùng

| Mã trạng thái | Giải thích | Trường hợp sử dụng |
| :--- | :--- | :--- |
| **200 OK** | Yêu cầu thành công | Yêu cầu GET、PUT thành công |
| **201 Created** | Tạo thành công | Yêu cầu POST tạo tài nguyên thành công |
| **204 No Content** | Không có nội dung | Yêu cầu DELETE xóa thành công |
| **301 Moved Permanently** | Chuyển hướng vĩnh viễn | URL thay đổi vĩnh viễn |
| **302 Found** | Chuyển hướng tạm thời | URL thay đổi tạm thời |
| **304 Not Modified** | Không sửa đổi | Bộ nhớ đệm có hiệu lực |
| **400 Bad Request** | Lỗi tham số | Định dạng tham số yêu cầu sai |
| **401 Unauthorized** | Chưa xác thực | Cần đăng nhập |
| **403 Forbidden** | Không có quyền | Đã đăng nhập nhưng quyền không đủ |
| **404 Not Found** | Không tồn tại | Tài nguyên không tồn tại |
| **500 Internal Server Error** | Lỗi nội bộ | Server bị lỗi |
| **503 Service Unavailable** | Không khả dụng | Server đang bảo trì hoặc quá tải |

---

## 6. HTTPS: HTTP an toàn

### 6.1 HTTP và HTTPS

| Tính năng | HTTP | HTTPS |
| :--- | :--- | :--- |
| **Giao thức** | TCP | TCP + SSL/TLS |
| **Cổng** | 80 | 443 |
| **Dữ liệu** | Truyền văn bản thường | Truyền được mã hóa |
| **Chứng chỉ** | Không cần | Cần chứng chỉ SSL |
| **Hiệu suất** | Nhanh hơn một chút | Chậm hơn một chút（chi phí bắt tay) |
| **SEO** | Không ảnh hưởng | Công cụ tìm kiếm ưu tiên indexing |

### 6.2 Quy trình làm việc của HTTPS

1. **Client Hello**: Client gửi các bộ mã hóa được hỗ trợ
2. **Server Hello**: Server trả lại chứng chỉ và bộ mã hóa được chọn
3. **Xác minh chứng chỉ**: Client xác minh hiệu lực của chứng chỉ server
4. **Trao đổi khóa**: Sử dụng mã hóa không đối xứng để trao đổi khóa phiên
5. **Giao tiếp được mã hóa**: Sử dụng khóa phiên để thực hiện giao tiếp mã hóa đối xứng

::: tip 💡 Ưu điểm của HTTPS
- **Chống nghe lén**: Dữ liệu được mã hóa, bên thứ ba không thể đọc
- **Chống sửa đổi**: Kiểm tra tính toàn vẹn của dữ liệu
- **Chống giả mạo**: Xác minh danh tính server bằng chứng chỉ SSL
:::

---

## 7. Cơ chế bộ nhớ đệm HTTP

### 7.1 Tiêu đề bộ nhớ đệm

| Tiêu đề | Giải thích | Ví dụ |
| :--- | :--- | :--- |
| **Cache-Control** | Chiến lược bộ nhớ đệm | `max-age=3600` |
| **ETag** | Số phiên bản tài nguyên | `"33a64df551425fcc"` |
| **Last-Modified** | Thời gian sửa đổi cuối cùng | `Wed, 21 Oct 2015 07:28:00 GMT` |

### 7.2 Chiến lược bộ nhớ đệm

**Bộ nhớ đệm mạnh**:
```http
Cache-Control: max-age=3600
```
Trong 3600 giây, trình duyệt sử dụng trực tiếp bộ nhớ đệm, không gửi yêu cầu.

**Bộ nhớ đệm thương lượng**:
```http
ETag: "33a64df551425fcc"
```
Trình duyệt gửi `If-None-Match`, server trả lại 304（Không sửa đổi) hoặc 200（Đã sửa đổi).

---

## 8. Các câu hỏi phổ biến

### 8.1 Sự khác biệt bản chất giữa GET và POST

**Hiểu lầm**: Sự khác biệt giữa GET và POST chỉ là vị trí tham số.

**Sự thật**:
- GET là lũy đẳng, kết quả của nhiều yêu cầu là giống nhau
- POST không lũy đẳng, nhiều yêu cầu có thể tạo nhiều tài nguyên
- GET có thể bộ nhớ đệm, POST mặc định không bộ nhớ đệm
- GET có thể được lưu dấu trang, POST thì không

### 8.2 Tắc nghẽn đầu hàng của HTTP/1.1

**Vấn đề**: HTTP/1.1 mặc dù hỗ trợ kết nối liên tục, nhưng các yêu cầu phải được gửi nối tiếp. Nếu yêu cầu trước phản hồi chậm, tất cả các yêu cầu tiếp theo phải chờ đợi.

**Giải pháp**:
- HTTP/2 đa hóa mux
- Phân chia miền（tạo nhiều kết nối với nhiều miền)
- Bể kết nối（giới hạn số lượng song song)

### 8.3 Ưu điểm của HTTP/2

| Tính năng | HTTP/1.1 | HTTP/2 |
| :--- | :--- | :--- |
| **Định dạng truyền** | Văn bản | Frame nhị phân |
| **Đa hóa mux** | Không hỗ trợ | Hỗ trợ |
| **Nén tiêu đề** | Không | Thuật toán HPACK |
| **Server push** | Không hỗ trợ | Hỗ trợ |

---

## Bảng tham khảo nhanh thuật ngữ

| Thuật ngữ | Tiếng Anh | Giải thích |
| :--- | :--- | :--- |
| **HTTP** | HyperText Transfer Protocol | Giao thức truyền siêu văn bản |
| **HTTPS** | HTTP Secure | HTTP + SSL/TLS |
| **TCP** | Transmission Control Protocol | Giao thức điều khiển truyền |
| **SSL/TLS** | Secure Sockets Layer | Lớp ổ cắm an toàn |
| **Tính chất lũy đẳng** | Idempotent | Kết quả của nhiều yêu cầu là giống nhau |
| **Kết nối liên tục** | Keep-Alive | Gửi nhiều yêu cầu trên một kết nối TCP |
| **Đa hóa mux** | Multiplexing | Gửi nhiều yêu cầu cùng lúc |
| **Tắc nghẽn đầu hàng** | Head-of-Line Blocking | Yêu cầu phía trước cản trở yêu cầu phía sau |
