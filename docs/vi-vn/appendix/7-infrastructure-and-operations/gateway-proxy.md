# Cổng thông tin và Proxy ngược
::: tip 🎯 Câu hỏi cốt lõi
**Trong kiến trúc internet xử lý lưu lượng cao, làm thế nào để gửi lưu lượng một cách an toàn và hiệu quả đến dịch vụ đúng?** Proxy ngược giải quyết "làm cách nào để phân phối lưu lượng", API Gateway giải quyết "làm cách nào để xử lý yêu cầu". Bài viết này thông qua các trường hợp thực tế (tiếp tân, hệ thống bảo vệ, định tuyến thông minh) giúp bạn hiểu sâu hơn về triết học thiết kế cổng thông tin và thực hành kỹ thuật.
:::

---

## 1. Tại sao cần "cổng thông tin"?

### 1.1 Bắt đầu từ một trường hợp thực tế: Quá trình phát triển kiến trúc của một sàn thương mại điện tử

Một nền tảng thương mại điện tử gặp phải các vấn đề kiến trúc nghiêm trọng khi kinh doanh phát triển nhanh chóng:

**Tái hiện tình huống:**

```
Giai đoạn một: Công khai trực tiếp dịch vụ
Client → Gọi trực tiếp dịch vụ người dùng, dịch vụ đơn hàng, dịch vụ thanh toán...
         ↓
Vấn đề 1: IP dịch vụ bị công khai, tiềm ẩn rủi ro bảo mật
Vấn đề 2: Không thể xác thực, giới hạn lưu lượng một cách thống nhất
Vấn đề 3: Thêm dịch vụ mới cần phải sửa đổi cấu hình client
```

::: warning ⚠️ Vấn đề chết người khi công khai trực tiếp

- **Rủi ro bảo mật**: Tất cả IP dịch vụ bị công khai, dễ bị tấn công
- **Chức năng lặp lại**: Mỗi dịch vụ phải thực hiện xác thực, giới hạn lưu lượng, ghi nhật ký
- **Khó mở rộng**: Thêm dịch vụ mới cần sửa đổi tất cả client
- **Giao thức lộn xộn**: Có dịch vụ dùng HTTP, có dịch vụ dùng gRPC, client phải thích ứng
  :::

**Kiến trúc được cải thiện (giới thiệu cổng thông tin):**

```
Client → API Gateway(Nginx/Kong) → Dịch vụ nội bộ
         ↓
      Xác thực, giới hạn lưu lượng, định tuyến thống nhất
         ↓
      Client chỉ biết địa chỉ gateway
```

::: tip ✨ Hiệu quả sau khi cải thiện

- **Bảo mật**: IP dịch vụ thực tế được che giấu, chỉ gateway được công khai
- **Chức năng tập trung**: Xác thực, giới hạn lưu lượng, ghi nhật ký được xử lý thống nhất ở gateway
- **Dễ mở rộng**: Thêm dịch vụ mới chỉ cần cấu hình định tuyến ở gateway
- **Giao thức thống nhất**: HTTP với bên ngoài, có thể dùng gRPC bên trong
  :::

### 1.2 So sánh với cuộc sống: Tiếp tân

Hãy tưởng tượng bạn đến một công ty lớn:

- **Không có tiếp tân**: Khách gặp trực tiếp các phòng ban, không biết ở đâu, công ty hỗn loạn
- **Có tiếp tân**: Khách đến tiếp tân trước, tiếp tân hỏi rõ mục đích, rồi hướng dẫn đến phòng ban tương ứng

**API Gateway chính là "tiếp tân" của hệ thống**:

- **Proxy ngược**: Tiếp tân, hướng dẫn khách đến phòng ban đúng
- **API Gateway**: Tiếp tân thông minh, còn kiểm tra danh tính khách (xác thực), giới hạn số người vào (giới hạn lưu lượng)

<ReverseProxyDemo />

---

## 2. Proxy ngược là gì?

### 2.1 Proxy thuận vs Proxy ngược

::: tip 🤔 Giải thích thuật ngữ
**Proxy thuận (Forward Proxy)**:

- Triển khai ở phía client
- Thay thế client để truy cập tài nguyên bên ngoài
- Ứng dụng điển hình: VPN, công cụ vượt tường lửa
- Ví dụ: Mạng công ty, bạn truy cập internet qua proxy

**Proxy ngược (Reverse Proxy)**:

- Triển khai ở phía server
- Tiếp nhận yêu cầu từ client và chuyển tiếp đến dịch vụ nội bộ
- Client chỉ biết proxy tồn tại, không biết server thực tế
- Ví dụ: Nginx, HAProxy
  :::

**Bảng so sánh:**

| Khía cạnh       | Proxy thuận              | Proxy ngược              |
| --------------- | ------------------------ | ------------------------ |
| **Vị trí triển khai** | Phía client              | Phía server              |
| **Phục vụ đối tượng** | Client                   | Server                   |
| **Ứng dụng điển hình** | VPN, vượt tường lửa      | Cân bằng tải, gateway    |
| **Tính minh bạch** | Server thấy IP proxy     | Client thấy IP proxy     |
| **Mục đích**     | Che giấu client thực tế, tăng tốc độ | Che giấu server thực tế, cân bằng tải |

### 2.2 Giá trị cốt lõi của proxy ngược

::: details Giá trị một: Cân bằng tải
Phân phối lưu lượng đến nhiều server backend, tránh quá tải đơn điểm.

```
Client
  ↓
Nginx(proxy ngược)
  ↓
┌─────────────┬─────────────┬─────────────┐
│ Server 1    │ Server 2    │ Server 3    │
└─────────────┴─────────────┴─────────────┘
```

:::

::: details Giá trị hai: Bảo vệ bảo mật
Che giấu IP server thực tế, ngăn chặn tấn công trực tiếp. Thực hiện bảo vệ bảo mật thống nhất ở tầng proxy.

```
Client → Chỉ thấy IP của Nginx
Server thực tế → Chỉ có ở mạng nội bộ, không thể truy cập từ bên ngoài
```

:::

::: details Giá trị ba: Kết thúc SSL
Xử lý mã hóa/giải mã HTTPS ở tầng proxy, dịch vụ backend dùng HTTP, giảm bớt tải tính toán của backend.

```
HTTPS client → Nginx(mã hóa/giải mã) → HTTP backend
                   ↑
              Điểm kết thúc SSL
```

:::

---

## 3. Nginx: Tại sao nó có thể chịu được hàng triệu yêu cầu đồng thời?

### 3.1 Mô hình tiến trình Master-Worker

Nginx sử dụng kiến trúc **đa tiến trình**, không phải đa luồng:

**Tiến trình Master (quản lý viên)**:

- Chịu trách nhiệm đọc và xác minh tệp cấu hình
- Quản lý các tiến trình Worker (khởi động, dừng, tải lại)
- Không xử lý các yêu cầu cụ thể

**Tiến trình Worker (người làm việc)**:

- Thực tế xử lý các yêu cầu HTTP
- Mỗi Worker là một tiến trình độc lập, cách ly lẫn nhau
- Số lượng thường được đặt bằng số lõi CPU, tránh chi phí chuyển đổi bối cảnh

::: tip 💡 Ưu điểm

- **Cô lập tốt**: Một Worker gặp sự cố không ảnh hưởng đến Worker khác
- **Tận dụng đầy đủ đa lõi**: Mỗi Worker chạy độc lập
- **Tránh độ phức tạp đa luồng**: Không cần xử lý khóa, tranh chấp, v.v.
  :::

### 3.2 Hướng sự kiện + Không chặn bất đồng bộ

Đây là bí mật hiệu suất cốt lõi của Nginx:

**Apache truyền thống (mô hình đa tiến trình/luồng)**:

- Một kết nối = một tiến trình/luồng
- Số lượng đồng thời bị giới hạn bởi số tiến trình/luồng của hệ thống
- Khi có nhiều kết nối, chi phí chuyển đổi tiến trình rất lớn

**Nginx (mô hình hướng sự kiện)**:

- Sử dụng epoll (Linux)/kqueue (macOS) và các cơ chế I/O đa nhánh hiệu quả khác
- Một tiến trình Worker có thể xử lý hàng chục nghìn kết nối cùng lúc
- Khi kết nối không có dữ liệu, nó không chiếm dụng CPU, khi có dữ liệu mới thì thông báo sự kiện thức dậy

::: tip So sánh cuộc sống

- **Apache**: Nhà hàng mỗi khách được 1 nhân viên phục vụ (tiến trình), nhiều khách cần nhiều nhân viên
- **Nginx**: Một nhân viên siêu cấp phục vụ tất cả khách, ai cần thì đến, không phải đứng chìa mãi ở một khách
  :::

<NginxArchitectureDemo />

---

## 4. API Gateway là gì?

### 4.1 Tại sao cần API Gateway?

**Hãy tưởng tượng một hệ thống không có gateway:**

- Client cần biết địa chỉ của nhiều dịch vụ (dịch vụ người dùng, dịch vụ đơn hàng, dịch vụ thanh toán...)
- Mỗi dịch vụ phải tự làm xác thực, giới hạn lưu lượng, ghi nhật ký
- Giao thức không thống nhất, có dịch vụ dùng HTTP, có dịch vụ dùng gRPC
- Khi dịch vụ nâng cấp, client cũng phải thay đổi

::: warning ⚠️ Vấn đề khi không có gateway

- **Client phức tạp**: Cần cấu hình địa chỉ của nhiều dịch vụ
- **Chức năng lặp lại**: Mỗi dịch vụ phải triển khai xác thực, giới hạn lưu lượng
- **Giao thức lộn xộn**: Client phải thích ứng với nhiều giao thức
- **Khó nâng cấp**: Nâng cấp dịch vụ, client cũng phải thay đổi
  :::

**Sau khi có API Gateway:**

- Client chỉ cần biết địa chỉ gateway, gateway chịu trách nhiệm định tuyến đến dịch vụ đúng
- Xác thực, giới hạn lưu lượng, ghi nhật ký và các logic ngang cắt khác được xử lý thống nhất ở gateway
- Gateway có thể thực hiện chuyển đổi giao thức, công khai HTTP thống nhất với bên ngoài
- Nâng cấp dịch vụ backend, chỉ cần thay đổi cấu hình gateway, client không cảm nhận được gì

<ApiGatewayDemo />

### 4.2 Chức năng cốt lõi của API Gateway

| Chức năng     | Giải thích                                     | Trường hợp điển hình                         |
| :------------ | :--------------------------------------------- | :------------------------------------------- |
| **Định tuyến** | Dựa vào URL, Header và các quy tắc khác, chuyển tiếp yêu cầu đến dịch vụ khác nhau | `/api/users` → Dịch vụ người dùng, `/api/orders` → Dịch vụ đơn hàng |
| **Cân bằng tải** | Khi cùng một dịch vụ có nhiều instance, chia sẻ lưu lượng | Dịch vụ người dùng có 3 instance, phân phối yêu cầu theo vòng tròn |
| **Xác thực phê duyệt** | Xác minh thống nhất JWT, OAuth Token | Người dùng chưa đăng nhập không thể truy cập `/api/admin` |
| **Giới hạn lưu lượng / Ngắt mạch** | Kiểm soát giới hạn lưu lượng, ngăn dịch vụ bị quá tải | Tối đa 1000 yêu cầu mỗi giây, vượt quá trả về 429 |
| **Chuyển đổi giao thức** | HTTP bên ngoài, có thể chuyển gRPC bên trong | Client dùng HTTP, gateway chuyển gRPC gọi dịch vụ nội bộ |
| **Phát hành thử nghiệm** | Dựa vào Header hoặc tỷ lệ, hướng dẫn một phần lưu lượng đến phiên bản mới | 5% người dùng dùng phiên bản mới, 95% dùng phiên bản cũ |
| **Ghi nhật ký giám sát** | Ghi nhật ký yêu cầu thống nhất, thuận tiện phân tích và xử lý sự cố | Ghi nhật ký thời gian yêu cầu, mã trạng thái, kích thước trả về |

---

## 5. Thực hành gateway: Làm cách nào để xây dựng kiến trúc gateway hoàn chỉnh?

### 5.1 Sơ đồ kiến trúc hoàn chỉnh

```
┌───────────────────────────────────────────────────────────────────────┐
│                           Client (trình duyệt/ứng dụng)                    │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │ HTTPS
                                ▼
┌───────────────────────────────────────────────────────────────────────┐
│                        Tầng bên ngoài: CDN + WAF                      │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  CDN (mạng phân phối nội dung)                              │  │
│  │  - Bộ nhớ tạm tĩnh (ảnh, CSS, JS)                       │  │
│  │  - Truy cập gần đây, giảm độ trễ                           │  │
│  └───────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  WAF (tường lửa ứng dụng web)                               │  │
│  │  - Bảo vệ chống lại tiêm SQL, tấn công XSS                │  │
│  │  - Chặn Bot độc hại, trình thu thập dữ liệu                │  │
│  │  - Bảo vệ chống tấn công CC                      │  │
│  └───────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────────┐
│                     Tầng giữa: API Gateway (Nginx/Kong)           │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Lớp thứ nhất: Kết thúc SSL + Bảo vệ bảo mật               │  │
│  │  - HTTPS / TLS 1.3                                        │  │
│  │  - HSTS, tiêu đề phản hồi bảo mật                            │  │
│  └───────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Lớp thứ hai: Xác thực và phê duyệt                      │  │
│  │  - Xác minh JWT Token                                       │  │
│  │  - OAuth 2.0 / Tích hợp SSO                                    │  │
│  │  - Quản lý API Key                                         │  │
│  │  - Xác minh quyền (RBAC)                                      │  │
│  └───────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Lớp thứ ba: Kiểm soát lưu lượng                        │  │
│  │  - Giới hạn lưu lượng - Thuật toán bucket mã thông báo/bộ chứa│  │
│  │  - Ngắt mạch - Ngăn chặn lỗi lan rộng                     │  │
│  │  - Giảm tải - Phương án thay thế khi dịch vụ không khả dụng │  │
│  │  - Phát hành thử nghiệm - Phân bổ lưu lượng theo tỷ lệ      │  │
│  └───────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Lớp thứ tư: Định tuyến và cân bằng tải                    │  │
│  │  - Định tuyến đường dẫn (Path-based Routing)                  │  │
│  │  - Định tuyến tên miền (Host-based Routing)                    │  │
│  │  - Định tuyến Header (Header-based Routing)                         │  │
│  │  - Thuật toán cân bằng tải - Vòng tròn/có trọng số/ít kết nối nhất/Hash IP) │  │
│  │  - Khám phá dịch vụ - Tích hợp (Service Discovery)             │  │
│  └───────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Lớp thứ năm: Chuyển đổi giao thức và xử lý dữ liệu         │  │
│  │  - Kết thúc SSL (HTTPS ↔ HTTP)                                 │  │
│  │  - Chuyển đổi giao thức (HTTP ↔ gRPC / WebSocket)                 │  │
│  │  - Chuyển đổi yêu cầu/phản hồi (JSON ↔ XML)                     │  │
│  │  - Nén dữ liệu (Gzip / Brotli)                                   │  │
│  │  - Bộ nhớ tạm (Cache) - Tài nguyên tĩnh và phản hồi API      │  │
│  └───────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────────┐
│                        Tầng bên trong: Cụm vi dịch vụ              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │
│  │  Dịch vụ người dùng│ │  Dịch vụ đơn hàng│ │  Dịch vụ sản phẩm│ │  Dịch vụ thanh toán│      │
│  │  User Svc   │ │  Order Svc  │ │ Product Svc │ │ Payment Svc │      │
│  │             │ │             │ │             │ │             │      │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘      │
│         │                │                │                │               │
│         └────────────────┴────────────────┴────────────────┘               │
│                                       │                              │
│                    Khám phá dịch vụ và trung tâm cấu hình (etcd)    │
│                    - Đăng ký dịch vụ và khám phá                      │
│                    - Kiểm tra sức khỏe                                  │
│                    - Lưu trữ cấu hình KV                                  │
└───────────────────────────────────────────────────────────────────────┘
```

### 5.2 Định tuyến và cân bằng tải

Một trong những nhiệm vụ cốt lõi của gateway là **gửi yêu cầu đến đúng nơi**. Điều này liên quan đến hai khả năng chính: **định tuyến** (đến máy chủ nào) và **cân bằng tải** (cách phân bổ lưu lượng).

::: details Quy tắc định tuyến: Từ URL đến dịch vụ
Hãy tưởng tượng một hệ thống thương mại điện tử, các URL khác nhau tương ứng với các dịch vụ khác nhau:

- `/api/users/*` → Dịch vụ người dùng
- `/api/orders/*` → Dịch vụ đơn hàng
- `/api/products/*` → Dịch vụ sản phẩm
- `/api/pay/*` → Dịch vụ thanh toán

**Ví dụ cấu hình Nginx:**

```nginx
server {
    listen 80;
    server_name api.example.com;

    # Dịch vụ người dùng
    location /api/users/ {
        proxy_pass http://user-service;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Dịch vụ đơn hàng
    location /api/orders/ {
        proxy_pass http://order-service;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Dịch vụ sản phẩm
    location /api/products/ {
        proxy_pass http://product-service;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Dịch vụ thanh toán (cần mức bảo mật cao hơn)
    location /api/pay/ {
        # Hạn chế truy cập IP
        allow 10.0.0.0/8;
        deny all;

        proxy_pass http://payment-service;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

:::

::: details Cân bằng tải: Bốn chiến lược so sánh
Khi cùng một dịch vụ có nhiều instance, làm cách nào để chọn?

| Chiến lược   | Nguyên lý                                            | Trường hợp áp dụng     | Ưu điểm              | Nhược điểm                   |
| :----------- | :--------------------------------------------------- | :--------------------- | :------------------- | :--------------------------- |
| **Vòng tròn** | Phân bổ theo thứ tự cho mỗi máy chủ                   | Máy chủ hiệu suất tương tự | Đơn giản công bằng   | Không xem xét tải hiện tại của máy chủ |
| **Vòng tròn có trọng số** | Phân bổ theo tỷ lệ trọng số, trọng số cao được phân bổ nhiều hơn | Hiệu suất máy chủ khác nhau | Tận dụng đầy đủ máy chủ hiệu suất cao | Cần đặt trọng số hợp lý |
| **Ít kết nối nhất** | Phân bổ cho máy chủ có ít kết nối nhất hiện tại      | Kịch bản kết nối lâu dài, luồng video | Thích ứng động với thay đổi tải | Cần thống kê số kết nối theo thời gian thực |
| **Hash IP**  | Tính hash dựa trên IP client, IP cùng luôn được phân bổ cho cùng máy chủ | Cần giữ trạng thái phiên | Đảm bảo tính nhất quán phiên | Khi lưu lượng IP lớn sẽ gây áp lực đơn điểm |

**Ví dụ cấu hình Nginx:**

```nginx
# Vòng tròn có trọng số
upstream backend_weighted {
    server 10.0.1.10:8080 weight=3;  # Hiệu suất tốt, chịu lưu lượng nhiều hơn
    server 10.0.1.11:8080 weight=2;
    server 10.0.1.12:8080 weight=1;  # Hiệu suất kém, chịu lưu lượng ít hơn
}

# Ít kết nối nhất
upstream backend_least_conn {
    least_conn;
    server 10.0.1.10:8080;
    server 10.0.1.11:8080;
    server 10.0.1.12:8080;
}

# Hash IP (giữ phiên)
upstream backend_ip_hash {
    ip_hash;
    server 10.0.1.10:8080;
    server 10.0.1.11:8080;
    server 10.0.1.12:8080;
}
```

:::

<LoadBalancingDemo />

---

## 6. Bảo mật gateway: Làm cách nào để bảo vệ cửa chính của hệ thống?

### 6.1 Xác thực và phê duyệt

**Cách truyền thống (mỗi dịch vụ tự xác thực):**

- Dịch vụ người dùng, dịch vụ đơn hàng, dịch vụ thanh toán... mỗi dịch vụ phải xác minh JWT
- Mã code lặp lại, khó bảo trì
- Secret phân tán ở các dịch vụ khác nhau, rủi ro rò rỉ cao

**Xác thực thống nhất ở gateway:**

- Client mang theo Token truy cập gateway
- Gateway xác minh tính hợp lệ của Token (chữ ký, thời gian hết hạn)
- Sau khi xác minh thành công, thêm thông tin người dùng (như user_id) vào tiêu đề yêu cầu, chuyển tiếp đến dịch vụ backend
- Dịch vụ backend không cần xác minh, lấy thông tin người dùng trực tiếp từ Header

::: tip 💡 Ý tưởng cốt lõi
**Xác thực ở gateway, phê duyệt ở dịch vụ**:

- **Xác thực**: Bạn là ai? (Xác minh Token, lấy danh tính người dùng)
- **Phê duyệt**: Bạn có thể làm gì? (Dựa vào vai trò người dùng, quyết định quyền)

Giống như tiếp tân công ty: tiếp tân xác thực danh tính của bạn (thẻ căn cước), nhưng quyền cụ thể do từng phòng ban quyết định.
:::

<AuthMiddlewareDemo />

### 6.2 HTTPS và kết thúc SSL

**Tại sao cần HTTPS?**

1. **Bảo mật**: Ngăn chặn dữ liệu bị đánh cắp trong quá trình truyền
2. **Tuân thủ**: Trình duyệt hiện đại cảnh báo "không an toàn" cho trang HTTP
3. **SEO**: Công cụ tìm kiếm ưu tiên lập chỉ mục trang HTTPS

**Phương án kết thúc SSL:**

- Chỉ cấu hình HTTPS và chứng chỉ ở tầng gateway
- Gateway chịu trách nhiệm bắt tay TLS và mã hóa/giải mã
- Giữa gateway và dịch vụ backend sử dụng truyền HTTP rõ ràng (mạng nội bộ đáng tin cậy)
- Dịch vụ backend tập trung vào logic kinh doanh, không cần xử lý TLS

::: tip 💡 Ưu điểm kết thúc SSL

- **Quản lý đơn giản**: Chứng chỉ chỉ cấu hình ở gateway, backend không cần
- **Giảm bớt chi phí**: Dịch vụ backend không cần xử lý bắt tay TLS
- **Cập nhật thống nhất**: Cập nhật chứng chỉ chỉ cần hoạt động ở gateway
  :::

<SslTerminationDemo />

---

## 7. Giới hạn lưu lượng và ngắt mạch: Làm cách nào để ngăn hệ thống bị "thủy triều lưu lượng" tàn phá?

### 7.1 So sánh thuật toán giới hạn lưu lượng

| Thuật toán   | Ý tưởng cốt lõi               | Lưu lượng đột biến              | Trường hợp áp dụng                 | Độ phức tạp triển khai |
| :----------- | :---------------------------- | :------------------------------ | :--------------------------------- | :--------------------- |
| **Bucket mã thông báo** | Bucket chứa mã thông báo, cần mã thông báo mới cho phép | Cho phép mức độ đột biến nhất định | Giới hạn API, kiểm soát băng thông | Trung bình       |
| **Bộ chứa** | Yêu cầu vào bộ chứa, chảy ra theo tốc độ cố định | Buộc mịn, đột biến sẽ bị lưu trong bộ đệm hoặc từ chối | Cần xử lý mịn chặt (như "1 phút tối đa 100 lần") | Trung bình       |
| **Cửa sổ trượt** | Thống kê số yêu cầu trong cửa sổ thời gian | Tính toán chặt theo cửa sổ, vượt quá một phen từ chối | Thống kê chính xác (như "1 phút tối đa 100 lần") | Cao       |

### 7.2 Cấu hình giới hạn lưu lượng Nginx thực tế

```nginx
# Định nghĩa vùng giới hạn lưu lượng (đặt trong khối http)

# 1. Giới hạn lưu lượng dựa trên IP (thuật toán bộ chứa)
# zone=mylimit:10m - Tên vùng và kích thước bộ nhớ (10MB có thể lưu khoảng 160 nghìn IP)
# rate=10r/s - Cho phép tối đa 10 yêu cầu mỗi giây
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

# 2. Giới hạn số kết nối dựa trên IP (ngăn chặn một IP thiết lập quá nhiều kết nối)
limit_conn_zone $binary_remote_addr zone=addr:10m;

# 3. Giới hạn lưu lượng dựa trên điểm cuối máy chủ (không phân biệt IP, bảo vệ toàn bộ backend)
limit_req_zone $server_name zone=server_limit:10m rate=100r/s;

server {
    listen 80;
    server_name api.example.com;

    # Dịch vụ người dùng - Giới hạn lưu lượng bình thường
    location /api/users/ {
        # Áp dụng giới hạn lưu lượng
        # burst=20 - Dung lượng bộ chứa, cho phép bùng nổ 20 yêu cầu
        # nodelay - Không trì hoãn xử lý yêu cầu bùng nổ (xử lý ngay hoặc từ chối)
        limit_req zone=mylimit burst=20 nodelay;

        # Giới hạn số kết nối của một IP
        limit_conn addr 10;

        proxy_pass http://user-service;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Dịch vụ đơn hàng - Giới hạn lưu lượng chặt hơn
    location /api/orders/ {
        # Giới hạn lưu lượng chặt hơn: tối đa 5 yêu cầu mỗi giây
        limit_req_zone $binary_remote_addr zone=order_limit:10m rate=5r/s;
        limit_req zone=order_limit burst=10 nodelay;

        proxy_pass http://order-service;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Xử lý sau khi giới hạn lưu lượng
    # Khi yêu cầu bị giới hạn, trả về 429 Too Many Requests
    error_page 429 /429.html;
    location = /429.html {
        internal;
        return 429 '{"error": "Too Many Requests", "message": "Rate limit exceeded. Please try again later."}';
        add_header Content-Type application/json;
    }
}
```

::: tip 💡 Đề xuất chiến lược giới hạn lưu lượng

- **Giao diện thông thường**: 10 yêu cầu mỗi giây, cho phép bùng nổ 20 yêu cầu
- **Giao diện quan trọng** (thanh toán, đơn hàng): 5 yêu cầu mỗi giây, cho phép bùng nổ 10 yêu cầu
- **Bảo vệ toàn cầu**: Tất cả yêu cầu cộng lại không vượt quá 100 yêu cầu mỗi giây
  :::

<RateLimitingDemo />

### 7.3 Ngắt mạch: Ngăn chặn lỗi lan rộng

**Nguyên lý hoạt động của bộ ngắt mạch:**

1. **Trạng thái đóng**: Chuyển tiếp yêu cầu bình thường, đồng thời thống kê tỷ lệ lỗi
2. **Trạng thái mở**: Khi tỷ lệ lỗi vượt quá ngưỡng, bộ ngắt mở, không chuyển tiếp yêu cầu nữa, trả về lỗi trực tiếp
3. **Trạng thái nửa mở**: Sau một khoảng thời gian, cho phép ít yêu cầu thử nghiệm, nếu thành công thì đóng bộ ngắt

::: tip 💡 Ý tưởng cốt lõi
**Bộ ngắt mạch giống như cầu chì điện**: khi dòng điện quá lớn, cầu chì tự động ngắt, bảo vệ toàn bộ mạch điện không bị cháy.

Tương tự, khi dịch vụ backend có lỗi rất nhiều, bộ ngắt mạch "nhảy bật", tấc từ chối nhanh chóng, ngăn chặn lỗi lan rộng đến toàn hệ thống.
:::

---

## 8. Tổng kết: Tư duy cốt lõi về thiết kế gateway

### 8.1 Ôn lại nguyên tắc cốt lõi

| Nguyên tắc   | Ý nghĩa              | Điểm thực hành chính               |
| ------------ | -------------------- | ---------------------------------- |
| **Định tuyến** | Gửi yêu cầu đến chính xác | Định tuyến đường dẫn, định tuyến tên miền, định tuyến Header |
| **Cân bằng tải** | Chia sẻ lưu lượng trên nhiều máy chủ | Vòng tròn, có trọng số, ít kết nối nhất, Hash IP |
| **Bảo mật** | Bảo vệ cửa chính hệ thống | Xác thực phê duyệt, HTTPS, WAF |
| **Giới hạn lưu lượng** | Ngăn chặn bị lưu lượng tấn công | Bucket mã thông báo, bộ chứa, cửa sổ trượt |
| **Ngắt mạch** | Ngăn chặn lỗi lan rộng | Tấc từ chối nhanh chóng, phương án giảm tải |
| **Quan sát được** | Giám sát và xử lý sự cố | Nhật ký, chỉ số, theo dõi liên kết |

### 8.2 Đề xuất lựa chọn công nghệ

::: tip 💡 Cây quyết định lựa chọn

```
Lựa chọn gateway:
│
├─ Chỉ cần proxy ngược, cân bằng tải?
│  ├─ Có → Nginx (lựa chọn hàng đầu)
│  └─ Không → Tiếp tục
│
├─ Cần hệ sinh thái plugin phong phú?
│  ├─ Có → Kong (dựa trên Nginx)
│  └─ Không → Tiếp tục
│
├─ Spring Cloud bộ đầy đủ?
│  ├─ Có → Spring Cloud Gateway
│  └─ Không → Nginx
```

:::

---

## 9. Bảng tra cứu thuật ngữ

| Thuật ngữ   | Tiếng Anh                | Giải thích                                                                                                               |
| ------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **Proxy ngược** | Reverse Proxy            | Triển khai ở máy chủ, tiếp nhận yêu cầu từ client và chuyển tiếp đến dịch vụ nội bộ. Client chỉ biết proxy tồn tại, không biết địa chỉ server thực tế. |
| **Proxy thuận** | Forward Proxy            | Triển khai ở phía client, thay thế client để truy cập tài nguyên bên ngoài. Server nhìn thấy IP proxy, không biết client thực tế. Ứng dụng điển hình: VPN, công cụ vượt tường lửa. |
| **API Gateway**  | API Gateway              | Nằm giữa client và dịch vụ backend, cung cấp các chức năng định tuyến, xác thực, giới hạn lưu lượng, ghi nhật ký, v.v., là "cửa chính thống nhất" của kiến trúc vi dịch vụ. |
| **Cân bằng tải** | Load Balancing           | Phân bổ lưu lượng yêu cầu đến nhiều máy chủ, tránh quá tải đơn điểm, nâng cao tính khả dụng và hiệu suất của hệ thống. |
| **Kết thúc SSL**  | SSL Termination          | Xử lý mã hóa/giải mã HTTPS ở tầng gateway, dịch vụ backend dùng HTTP, giảm bớt chi phí tính toán backend, đơn giản hóa quản lý chứng chỉ. |
| **Giới hạn lưu lượng**     | Rate Limiting            | Giới hạn số lượng yêu cầu trong một khoảng thời gian, ngăn chặn hệ thống bị lưu lượng đột biến áp chế. Thuật toán phổ biến: bucket mã thông báo, bộ chứa, cửa sổ trượt. |
| **Ngắt mạch**     | Circuit Breaking         | Khi dịch vụ phụ thuộc gặp sự cố, tự động ngắt cuộc gọi, ngăn chặn lỗi lan rộng, cung cấp phương án giảm tải. |
| **Giữ phiên** | Session Persistence      | Đảm bảo yêu cầu từ cùng một client luôn được định tuyến đến cùng một máy chủ backend, dùng cho các tình huống cần giữ trạng thái phiên. |
| **Kiểm tra sức khỏe** | Health Check             | Kiểm tra định kỳ sức khỏe dịch vụ backend, tự động loại bỏ các nút bị lỗi, đảm bảo lưu lượng chỉ gửi đến các instance dịch vụ khỏe mạnh. |
| **Phát hành thử nghiệm** | Canary Release           | Hướng dẫn một lượng nhỏ lưu lượng đến phiên bản mới, xác minh ổn định trước khi mở rộng tỷ lệ, giảm rủi ro phát hành. |
| **WAF**      | Web Application Firewall | Tường lửa ứng dụng web, bảo vệ chống lại các mối đe dọa bảo mật web như tiêm SQL, tấn công XSS, tấn công CC, v.v. |
| **CDN**      | Content Delivery Network | Mạng phân phối nội dung, triển khai các nút cạnh trên toàn cầu, tăng tốc độ truy cập tài nguyên tĩnh. |
