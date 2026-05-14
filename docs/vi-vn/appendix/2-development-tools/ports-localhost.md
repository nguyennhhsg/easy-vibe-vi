# Cổng và localhost

> 💡 **Hướng dẫn học tập**: Khi bạn chạy `npm run dev`, terminal hiển thị `http://localhost:5173`, bạn có bao giờ tự hỏi: `localhost` là gì? `5173` biểu thị điều gì? Tại sao đôi khi lại báo lỗi `EADDRINUSE`? Chương này sẽ giải thích rõ ràng những khái niệm mà bạn thấy hàng ngày trong phát triển, nhưng hiếm khi đi sâu vào.

Trước khi bắt đầu, bạn nên bổ sung hai phần "nền tảng":

- **Nền tảng mạng**: Nếu bạn chưa rõ về khái niệm địa chỉ IP và HTTP, bạn có thể xem phần [Nền tảng máy tính - Giao tiếp mạng](/vi-vn/appendix/1-computer-fundamentals/network-fundamentals.md).
- **Nền tảng terminal**: Nếu bạn chưa quen với dòng lệnh terminal, bạn có thể xem [Dòng lệnh và Shell Script](./command-line-shell.md).

---

## 0. Lời dẫn: Cái `localhost:5173` bạn thấy hàng ngày đó thực sự là gì?

<DevServerFlowDemo />

Mỗi lập trình viên đều quen thuộc với dòng đầu ra này:

```
➜  Local:   http://localhost:5173/
```

Nhưng bạn có bao giờ nghĩ rằng, chỉ trong một dòng ngắn này, lại chứa đựng nhiều khái niệm quan trọng:

- **http://** → Giao thức truyền thông (dùng ngôn ngữ gì để giao tiếp)
- **localhost** → Địa chỉ đích (tìm ai)
- **:5173** → Số cổng (sau khi tìm thấy, gõ vào cửa nào)

Hiểu rõ ba điều này, bạn sẽ có thể giải quyết 90% các vấn đề mạng trong môi trường phát triển. Tiếp theo, chúng ta sẽ phân tích từng cái một.

---

## 1. Cổng là gì? (IP là tòa nhà, cổng là số phòng)

### 1.1 Một phép so sánh trực quan

Hãy tưởng tượng một máy chủ là một tòa nhà:

- **Địa chỉ IP** (ví dụ `192.168.1.100`) chính là địa chỉ trên bảng tên của tòa nhà — cho bạn biết "đi đến tòa nhà nào".
- **Số cổng** (ví dụ `:80`) chính là số phòng trong tòa nhà — cho bạn biết "vào phòng nào".

Một tòa nhà có thể đồng thời có nhà hàng (phòng 80), quán cà phê (phòng 443), văn phòng (phòng 22). Tương tự, một máy tính có thể đồng thời chạy máy chủ Web, cơ sở dữ liệu, dịch vụ SSH, mỗi cái chiếm một cổng khác nhau.

👇 **Hãy thử bấm**:

Bấm vào "biển hiệu phòng" dưới đây để mô phỏng kết nối đến các cổng khác nhau. Quan sát cẩn thận: điều gì xảy ra khi cổng "mở" (có chương trình nghe) và "đóng"?

<PortAnalogyDemo />

### 1.2 Phạm vi giá trị của số cổng

Số cổng là một số nguyên trong khoảng **0–65535** (tổng cộng 65536 cái). Nhiều cổng này được chia thành ba khoảng:

| Khoảng | Phạm vi | Mục đích | Ví dụ |
| :--- | :--- | :--- | :--- |
| **Cổng hệ thống** | 0 – 1023 | Dành riêng cho các giao thức tiêu chuẩn, người dùng thông thường không thể tùy ý chiếm dụng | 80 (HTTP)、443 (HTTPS)、22 (SSH) |
| **Cổng đã đăng ký** | 1024 – 49151 | Dành cho các ứng dụng phổ biến đăng ký sử dụng | 3306 (MySQL)、5432 (PostgreSQL)、6379 (Redis) |
| **Cổng động** | 49152 – 65535 | Hệ điều hành phân bổ tạm thời | Khi trình duyệt gửi yêu cầu, hệ thống ngẫu nhiên phân bổ một cổng nguồn |

> Tại sao máy chủ phát triển của bạn thích dùng 3000, 5173, 8080? Vì những cái này đều nằm trong phạm vi "cổng đã đăng ký", không cần quyền quản trị viên để nghe, và cũng không dễ xung đột với các dịch vụ hệ thống.

### 1.3 Tra cứu nhanh số cổng phổ biến trong phát triển

👇 **Hãy thử bấm**:

Nhập số cổng hoặc tên dịch vụ để tìm kiếm, bấm vào bất kỳ dòng nào để xem ví dụ sử dụng.

<CommonPortsDemo />

---

## 2. localhost là gì? (Tự tìm chính mình)

### 2.1 Khái niệm cốt lõi của "vòng lặp ngược"

`localhost` là một tên miền đặc biệt, nó luôn chỉ đến **máy tính của bạn**.

Khi bạn nhập `http://localhost:3000` trong trình duyệt, những điều này xảy ra:

1. Trình duyệt hỏi hệ điều hành: "IP của `localhost` là bao nhiêu?"
2. Hệ điều hành trả lời trực tiếp: "`127.0.0.1`" (không cần kết nối internet để tìm DNS)
3. Gói dữ liệu được gửi đến `127.0.0.1`, nhưng **sẽ không thực sự rời khỏi máy tính của bạn**
4. Hệ điều hành thông qua "giao diện vòng lặp ngược (loopback interface)" **quay lại** gói dữ liệu
5. Chương trình nghe ở cổng 3000 nhận yêu cầu, trả lại phản hồi

**Toàn bộ quá trình không đi qua dây mạng, không đi qua bộ định tuyến, không cần kết nối internet.**

👇 **Hãy thử bấm**:

Bấm "Gửi yêu cầu" để quan sát toàn bộ hành trình của gói dữ liệu. Sau đó bấm "thẻ biến thể" dưới đây để hiểu các cách viết khác nhau của localhost và sự khác biệt.

<LocalhostLoopbackDemo />

### 2.2 `localhost` so với `127.0.0.1` so với `0.0.0.0`

Ba khái niệm này thường bị nhầm lẫn, nhưng ý nghĩa của chúng hoàn toàn khác nhau:

| Cách viết | Ý nghĩa | Ai có thể truy cập |
| :--- | :--- | :--- |
| `localhost` / `127.0.0.1` | Địa chỉ vòng lặp ngược, chỉ máy tính cục bộ | Chỉ máy tính của bạn |
| `0.0.0.0` | Nghe tất cả các giao diện mạng | Máy tính cục bộ + các thiết bị khác trong mạng cục bộ |
| `192.168.x.x` | IP mạng cục bộ | Các thiết bị trong mạng cục bộ |

**Tình huống thực tế**:

```bash
# Chỉ bạn có thể truy cập (an toàn, phù hợp cho phát triển)
npm run dev -- --host localhost

# Điện thoại cũng có thể truy cập (phù hợp cho gỡ lỗi di động)
npm run dev -- --host 0.0.0.0
```

> Nhiều framework (như Vite, Next.js) mặc định nghe `localhost`, vì vậy ngay cả khi điện thoại của bạn kết nối với cùng một WiFi cũng không thể truy cập. Muốn gỡ lỗi bằng điện thoại? Chỉ cần thêm tham số `--host`.

---

## 3. Xung đột cổng: Vấn đề phổ biến nhất trong môi trường phát triển

### 3.1 Tại sao lại xảy ra xung đột?

**Một cổng chỉ có thể được một chương trình nghe tại một thời điểm.** Nó giống như một phòng chỉ có thể được một hộ gia đình ở.

Nếu bạn cố gắng bắt đầu dịch vụ thứ hai trên cùng một cổng, bạn sẽ thấy lỗi cổ điển này:

```
Error: listen EADDRINUSE :::3000
```

Dịch sang ngôn ngữ thường là: **"Phòng số 3000 đã có người sống, bạn không thể vào!"**

Những tình huống xung đột phổ biến:

- Máy chủ phát triển lần trước chưa bị đóng hoàn toàn, vẫn đang chạy ở nền
- Hai dự án khác nhau sử dụng cùng một cổng mặc định
- Một số dịch vụ hệ thống đã chiếm dụng cổng mà bạn muốn

👇 **Hãy thử bấm**:

Hãy thử bắt đầu dịch vụ nhiều lần trong trình mô phỏng dưới đây. Khi xảy ra xung đột cổng, so sánh các cách xử lý khác nhau giữa "khởi động trực tiếp" và "khởi động thông minh".

<PortConflictDemo />

### 3.2 Kiểm tra và giải quyết

Khi gặp xung đột cổng, quá trình kiểm tra rất cố định:

**macOS / Linux:**

```bash
# Bước 1: Xem ai đang chiếm dụng cổng 3000
lsof -i :3000

# Bước 2: Sau khi lấy PID, buộc chấm dứt
kill -9 <PID>
```

**Windows:**

```bash
# Bước 1: Xem ai đang chiếm dụng cổng 3000
netstat -ano | findstr :3000

# Bước 2: Chấm dứt quá trình
taskkill /PID <PID> /F
```

> Nhiều framework hiện đại (Vite, Create React App, v.v.) khi gặp xung đột cổng sẽ tự động hỏi "có thay đổi sang cổng khác không?". Nhưng hiểu rõ nguyên tắc cơ bản sẽ giúp bạn nhanh chóng xác định các sự cố phức tạp mà framework không thể giúp bạn.

---

## 4. "Chính sách cùng nguồn gốc" và vấn đề đa tên miền trong phát triển

### 4.1 "Nguồn gốc" là gì?

Trình duyệt có một cơ chế bảo mật được gọi là **Chính sách cùng nguồn gốc (Same-Origin Policy)**: chỉ khi **giao thức, tên miền, cổng** hoàn toàn giống nhau mới được coi là "cùng nguồn gốc".

| Địa chỉ A | Địa chỉ B | Cùng nguồn gốc? | Lý do |
| :--- | :--- | :--- | :--- |
| `http://localhost:5173` | `http://localhost:5173/about` | ✅ Cùng nguồn gốc | Giao thức, tên miền, cổng đều giống nhau |
| `http://localhost:5173` | `http://localhost:3000` | ❌ Khác nguồn gốc | **Cổng khác nhau** (5173 so với 3000) |
| `http://localhost:5173` | `https://localhost:5173` | ❌ Khác nguồn gốc | **Giao thức khác nhau** (http so với https) |

### 4.2 Tại sao tách biệt front-end và back-end bắt buộc gặp vấn đề đa tên miền?

Khi kiến trúc dự án của bạn là:

```
Front-end (Vite)  →  http://localhost:5173
Back-end (Express) →  http://localhost:3000
```

Trang front-end được tải từ `:5173`, sau đó sử dụng `fetch('/api/users')` để yêu cầu giao diện `:3000` — **cổng khác nhau, kích hoạt hạn chế đa tên miền!**

**Hai giải pháp phổ biến:**

**Giải pháp 1: Cấu hình CORS ở back-end**

```javascript
// Back-end Express
app.use(cors({ origin: 'http://localhost:5173' }))
```

**Giải pháp 2: Cấu hình proxy ở front-end (được khuyến nghị)**

```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}
```

Nguyên lý của proxy: Cho phép máy chủ phát triển Vite "chuyển tiếp" yêu cầu cho bạn. Trình duyệt có vẻ như đang giao tiếp với `:5173` (cùng nguồn gốc), nhưng thực tế Vite đang lặng lẽ chuyển tiếp yêu cầu cho bạn sang `:3000`.

---

## 5. Kiểm tra thực tế: Ba vấn đề phổ biến nhất

👇 **Hãy thử bấm**:

Chọn một vấn đề bạn đã gặp phải, theo dõi các bước để kiểm tra cùng nhau. Mỗi bước bạn có thể bấm "Thực hiện" để xem kết quả.

<PortTroubleshootDemo />

---

## 6. Bảng đối chiếu thuật ngữ

| Thuật ngữ tiếng Anh | Đối chiếu tiếng Việt | Giải thích |
| :--- | :--- | :--- |
| **Port** | Cổng | Một số từ 0–65535 được sử dụng để phân biệt các dịch vụ mạng khác nhau trên cùng một máy. Mỗi dịch vụ "nghe" một cổng và chờ kết nối từ máy khách. |
| **localhost** | Máy tính cục bộ | Một tên miền đặc biệt, luôn chỉ đến máy tính của bạn (127.0.0.1). Được sử dụng để truy cập các dịch vụ chạy trên máy tính của bạn mà không cần kết nối internet. |
| **Loopback Interface** | Giao diện vòng lặp ngược | Giao diện mạng ảo của hệ điều hành. Các gói dữ liệu được gửi đến 127.0.0.1 sẽ không rời khỏi máy tính mà thay vào đó "quay lại" thông qua giao diện này. |
| **EADDRINUSE** | Địa chỉ đã được sử dụng | Lỗi được báo cáo bởi Node.js / hệ điều hành, chỉ ra rằng cổng bạn muốn nghe đã được một chương trình khác chiếm dụng. |
| **CORS** | Chia sẻ tài nguyên khi có nhiều nguồn gốc | Cơ chế bảo mật của trình duyệt. Khi trang front-end cố gắng yêu cầu giao diện từ một nguồn gốc khác (giao thức/tên miền/cổng khác nhau), back-end cần phải cấp phép rõ ràng. |
| **Same-Origin Policy** | Chính sách cùng nguồn gốc | Nền tảng bảo mật của trình duyệt: chỉ cho phép các yêu cầu với cùng giao thức, tên miền và cổng giao tiếp tự do, chặn đọc dữ liệu từ nhiều nguồn gốc. |
| **Proxy** | Máy chủ proxy | Trong môi trường phát triển, máy chủ proxy thay mặt trình duyệt chuyển tiếp yêu cầu đến back-end, vượt qua hạn chế cùng nguồn gốc của trình duyệt. |
| **0.0.0.0** | Tất cả các giao diện | Khi một dịch vụ nghe trên 0.0.0.0, nó chấp nhận kết nối từ bất kỳ giao diện mạng nào (máy tính cục bộ, mạng cục bộ, v.v.). |
| **Well-known Ports** | Cổng nổi tiếng | Tên gọi chung cho các cổng 0–1023, được dành riêng cho các giao thức tiêu chuẩn như HTTP (80), HTTPS (443), SSH (22). |
| **PID** | ID tiến trình | Một số duy nhất được hệ điều hành gán cho mỗi chương trình đang chạy, được sử dụng để quản lý và chấm dứt tiến trình. |
| **lsof** | Liệt kê các tệp được mở | Lệnh macOS/Linux được sử dụng để xem tiến trình nào đang chiếm dụng một cổng cụ thể (`lsof -i :số_cổng`). |
| **HMR** | Thay thế mô-đun nóng | Tính năng của máy chủ phát triển: sau khi bạn sửa đổi mã, trình duyệt tự động cập nhật mà không cần làm mới trang thủ công. Bên dưới sử dụng WebSocket để thông báo cho trình duyệt. |

---

## Kết luận

Cổng và localhost là những khái niệm cơ bản nhất và phổ biến nhất trong môi trường phát triển:

- **Cổng** = "Số biển" để phân biệt các dịch vụ khác nhau trên một máy (0–65535)
- **localhost** = Địa chỉ đặc biệt "tự tìm chính mình" (127.0.0.1), dữ liệu không rời khỏi máy tính
- **Xung đột cổng** về bản chất là "một biển chỉ có thể gắn một tấm biển"
- **Vấn đề đa tên miền** về bản chất là "cổng khác nhau = nguồn gốc khác", cần CORS hoặc proxy để giải quyết

Nhớ bốn câu này, bạn sẽ có thể nhanh chóng xác định nguyên nhân của hầu hết các vấn đề mạng gặp phải trong môi trường phát triển.
