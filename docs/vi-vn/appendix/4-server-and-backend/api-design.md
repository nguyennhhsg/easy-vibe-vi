# Thiết kế API: "Giao thức đối thoại" giữa frontend và backend

::: tip 🎯 Câu hỏi lõi
**Frontend và backend giao tiếp như thế nào một cách hiệu quả?** Điều này giống như hỏi: menu của một nhà hàng nên được thiết kế như thế nào để khách hiểu ngay? Thế nào để nhân viên ghi đơn mà không bị lỗi? Cách phục vụ thế nào thì khách hài lòng? Thiết kế API giải quyết vấn đề "quy tắc giao tiếp".
:::

---

## 0. Trước tiên hãy hỏi một câu hỏi: Bạn có từng gặp những cơn ác mộng này không?

**Tình huống một: Đặt tên endpoint theo ý muốn**

```
GET /getUserData
GET /fetchUserInfo
GET /queryUserById
GET /users/query
```

Bốn endpoint, chức năng giống nhau, nhưng style đặt tên hoàn toàn khác. Nhân viên mới tới mặt mũi ngơ ngác: mình dùng cái nào?

**Tình huống hai: Xử lý lỗi đủ kiểu**

```json
// Có trả về HTTP status code
HTTP/1.1 404 Not Found

// Có trả về 200 + code
HTTP/1.1 200 OK
{ "code": 404, "message": "người dùng không tồn tại" }

// Có trả về trực tiếp exception
HTTP/1.1 200 OK
{ "error": "có lỗi" }
```

Frontend không biết cách kiểm tra xem request có thành công hay không.

**Tình huống ba: Cấu trúc response hàng trăm kiểu**

```json
// API A
{ "data": { ... } }

// API B
{ "result": { ... } }

// API C
{ "content": { ... } }
```

Mỗi endpoint trả về format khác nhau, frontend phải xử lý riêng từng endpoint.

---

**API thiết kế tốt giống như hệ thống gọi món của nhà hàng** — menu rõ ràng, quy trình chuẩn, lỗi có hướng dẫn.

---

## 1. API là gì?

**API**（Application Programming Interface, Giao diện lập trình ứng dụng) là "quy ước giao tiếp giữa các chương trình".

### 1.1 Dùng nhà hàng để so sánh

| Vai trò nhà hàng | Khái niệm tương ứng | Giải thích |
| :--- | :--- | :--- |
| Menu | Tài liệu API | Cho bạn biết có những "món" gì để gọi |
| Nhân viên phục vụ | Giao thức HTTP | Cách "giao tiếp" tiêu chuẩn |
| Bếp | Server | Xử lý "đơn hàng" theo yêu cầu |
| Đã lên món | Response | Trả kết quả cho "khách hàng" |

### 1.2 Một request-response API hoàn chỉnh

👇 **Thử ngay**: Nhấp nút dưới để thấy một quy trình request-response API hoàn chỉnh:

<ApiRequestDemo />

---

## 2. Triết lý thiết kế API: RPC / REST / GraphQL / gRPC

Trước khi bắt đầu thiết kế RESTful cụ thể, hãy tìm hiểu bốn style thiết kế API phổ biến:

<ApiStyleCompare />

### 2.1 REST và RESTful: Có khác gì không?

Nhiều người nhầm lẫn hai khái niệm này:

| Khái niệm | Ý nghĩa | Giải thích |
| :--- | :--- | :--- |
| **REST** | Một phong cách kiến trúc | Một triết lý thiết kế do Roy Fielding đề xuất, bao gồm tập hợp các ràng buộc |
| **RESTful** | Tuân theo phong cách REST | Tính từ, chỉ API thiết kế tuân theo các nguyên tắc REST |

**So sánh**:
- REST giống "chủ nghĩa tối giản" — một triết lý thiết kế
- API RESTful giống "phòng phong cách tối giản" — áp dụng triết lý này vào thực tiễn

**Sáu ràng buộc của REST**:

| Ràng buộc | Giải thích |
| :--- | :--- |
| **Tách biệt client-server** | Frontend và backend phát triển độc lập, giải phóng coupling |
| **Không trạng thái** | Mỗi request chứa tất cả thông tin cần thiết, server không lưu trạng thái phiên |
| **Có thể cache** | Response nên chỉ ra có thể cache hay không, cải thiện hiệu suất |
| **Giao diện thống nhất** | Sử dụng các phương thức HTTP và status code tiêu chuẩn |
| **Hệ thống phân tầng** | Client không cần biết kết nối với tầng nào |
| **Code theo yêu cầu**（tùy chọn) | Server có thể mở rộng chức năng client |

::: tip 💡 Tại sao REST phổ biến nhất?
1. **Chi phí học tập thấp**: Chính giao thức HTTP thể hiện tư tưởng REST
2. **Hệ sinh thái trưởng thành**: Công cụ, framework, tài liệu phong phú
3. **Tính phổ quát cao**: Bất kỳ ngôn ngữ, nền tảng nào cũng có thể gọi
4. **Dễ cache**: GET request vốn có thể cache, CDN-friendly
:::

---

## 3. Thiết kế RESTful: Để URL "nói chuyện"

**REST**（Representational State Transfer) là một phong cách kiến trúc, ý tưởng lõi là:

- Trừu tượng hóa sự vật trên mạng thành "tài nguyên" (Resource)
- Dùng URL định danh tài nguyên
- Dùng HTTP methods để thao tác tài nguyên

### 3.1 Dùng kho hàng để so sánh

| Khái niệm kho hàng | Tương ứng REST | Ví dụ |
| :--- | :--- | :--- |
| Địa chỉ kệ | URL | `/users`, `/orders` |
| Cách thao tác | HTTP methods | GET (xem), POST (nhập kho) |
| Hàng hóa | Tài nguyên | Dữ liệu người dùng, dữ liệu đơn hàng |

**Nguyên tắc chính**: URL là danh từ, không phải động từ.

### 3.2 Quy tắc thiết kế URL

| Quy tắc | Ví dụ sai | Ví dụ đúng | Giải thích |
| :--- | :--- | :--- | :--- |
| Dùng danh từ không dùng động từ | `/getUsers` | `/users` | URL đại diện cho tài nguyên, HTTP methods đại diện cho thao tác |
| Dùng số nhiều | `/user` | `/users` | Thống nhất style số nhiều |
| Chữ thường + gạch ngang | `/UserProfiles` | `/user-profiles` | URL phân biệt hoa thường |
| Tránh quá sâu | `/a/b/c/d/e` | `/a/b/c` | Tối đa 3 tầng |
| Filter dùng query params | `/products/phone/5000` | `/products?cat=phone` | Điều kiện lọc dùng `?` parameter |

::: tip 💡 URL phân biệt hoa thường
Thống nhất dùng chữ thường + gạch ngang là cách an toàn nhất, tránh lẫn lộn hoa thường và dấu gạch dưới không nhất quán.
:::

### 3.3 Chọn HTTP methods

| Methods | Mục đích | Tính idempotent | Bảo mật | Trường hợp điển hình |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | Lấy tài nguyên | Có | Có | Truy vấn danh sách, xem chi tiết |
| **POST** | Tạo tài nguyên | Không | Không | Thêm người dùng, tạo đơn hàng |
| **PUT** | Cập nhật toàn bộ | Có | Không | Thay thế toàn bộ hồ sơ người dùng |
| **PATCH** | Cập nhật một phần | Không | Không | Chỉ sửa nickname |
| **DELETE** | Xóa tài nguyên | Có | Không | Xóa người dùng, hủy đơn hàng |

::: tip 💡 Tính idempotent là gì?
**Tính idempotent**: Thực hiện nhiều lần kết quả giống nhau.

- **Thao tác idempotent**（GET/PUT/DELETE): Nhấp 10 lần và nhấp 1 lần, kết quả giống nhau
- **Thao tác không idempotent**（POST): Nhấp 10 lần, có thể tạo 10 đơn hàng

**Giải pháp**: Thao tác POST kiểm tra với ID duy nhất, tránh xử lý trùng.
:::

---

## 4. Status codes: Để lỗi "biết nói"

HTTP status codes là cách tiêu chuẩn để server nói với client "đã xảy ra gì".

### 4.1 Phân loại status codes

| Phân loại | Ý nghĩa | Status codes điển hình |
| :--- | :--- | :--- |
| **2xx** | Thành công | 200 OK, 201 Created, 204 No Content |
| **3xx** | Chuyển hướng | 301 Chuyển vĩnh viễn, 304 Không sửa đổi |
| **4xx** | Lỗi client | 400 Lỗi tham số, 401 Chưa xác thực, 404 Không tồn tại |
| **5xx** | Lỗi server | 500 Lỗi nội bộ, 503 Dịch vụ không khả dụng |

### 4.2 Minh họa status codes thường dùng

👇 **Thử ngay**: Nhấp nút dưới để hiểu ý nghĩa những status codes phổ biến:

<StatusCodeDemo />

---

## 5. Xử lý lỗi: "Từ chối" một cách thanh lịch

Xử lý lỗi tốt cho phép client "thấy status code là biết được chuyện gì", mà không phải đoán.

### 4.1 "Hướng dẫn tránh bẫy" xử lý lỗi

**Bẫy 1: Tất cả lỗi đều trả 200**

```json
// ❌ Cách sai
HTTP/1.1 200 OK
{ "error": "có lỗi" }
```

Vấn đề: Tầng cache sẽ cache response "thành công" này, hệ thống monitoring không phát hiện được vấn đề.

**Bẫy 2: Thông điệp lỗi quá chung chung**

```json
// ❌ Cách sai
HTTP/1.1 400 Bad Request
{ "message": "lỗi tham số" }
```

Vấn đề: Client không biết tham số nào bị sai, tại sao sai.

**Bẫy 3: Lộ thông tin nhạy cảm**

```json
// ❌ Cách nguy hiểm
HTTP/1.1 500 Internal Server Error
{ "stack": "at UserService.login...", "sql": "SELECT * FROM..." }
```

Nguy hiểm: Lộ cấu trúc code, truy vấn database, attacker có thể dùng thông tin này.

### 5.2 Minh họa xử lý lỗi đúng cách

👇 **Thử ngay**: So sánh response lỗi "tốt" và "xấu":

<ErrorHandlingDemo />

---

## 6. Kiểm soát phiên bản: "Hỗ trợ ngược" của API

### 6.1 Tại sao phải kiểm soát phiên bản?

Tình huống: App của bạn có 1 triệu người dùng, cần sửa endpoint đơn hàng.

**Nếu không kiểm soát phiên bản**:
- App mới gọi endpoint mới → OK
- App cũ gọi endpoint mới → Thiếu trường, crash!

**Cách đúng**:
- `/v1/orders` - endpoint cũ, tiếp tục phục vụ App cũ
- `/v2/orders` - endpoint mới, các tính năng mới ở đây

### 6.2 Chiến lược kiểm soát phiên bản

| Chiến lược | Ví dụ | Ưu điểm | Nhược điểm |
| :--- | :--- | :--- | :--- |
| **URL path** | `/v1/users` | Trực quan, dễ cache | URL dài hơn |
| **Request header** | `Accept: vnd.api.v2+json` | URL sạch | Khó debug |
| **Query params** | `/users?version=2` | Đơn giản | Không đủ tiêu chuẩn |

### 6.3 Ví dụ phát triển phiên bản

Lấy endpoint người dùng làm ví dụ, thể hiện phát triển từ v1 sang v2:

| Endpoint | v1（cũ) | v2（mới) | Ghi chú thay đổi |
| :--- | :--- | :--- | :--- |
| **Lấy người dùng** | `GET /v1/users`<br>Trả về: `name, email` | `GET /v2/users`<br>Trả về: `name, email, avatar, phone` | Thêm trường avatar, phone |
| **Tạo đơn hàng** | `POST /v1/orders`<br>Nhận: `items[]` | `POST /v2/orders`<br>Nhận: `items[], coupons[]` | Thêm hỗ trợ mã giảm giá |
| **Thao tác hàng loạt** | Không có | `POST /v2/orders/batch` | Thêm endpoint tạo hàng loạt |

::: tip 💡 Best practices kiểm soát phiên bản
- **Duy trì hỗ trợ ngược**: Endpoint v1 phục vụ ít nhất 6-12 tháng, để client nâng cấp
- **Cập nhật tài liệu đồng bộ**: Mỗi phiên bản có tài liệu API riêng
- **Công bố dừng hỗ trợ**: Thông báo sớm rằng v1 sẽ dừng khi nào, hướng dẫn di chuyển
- **Giám sát sử dụng**: Thống kê lượng gọi v1, xác nhận có thể dừng an toàn trước khi ngưng dịch vụ
:::

---

## 7. Thiết kế cấu trúc response

Response structure là "hợp đồng dữ liệu" giữa frontend và backend, thống nhất format giảm chi phí giao tiếp rất nhiều.

<ResponseStructureDemo />

### 7.1 Tham khảo thực tiễn các hãng lớn

::: details Hướng dẫn thiết kế API của Google
Tham khảo [Google API Design Guide](https://cloud.google.com/apis/design/errors), Google yêu cầu tất cả response lỗi API phải chứa cấu trúc thông điệp `google.rpc.Status`:

```json
{
  "error": {
    "code": 429,
    "message": "Tài nguyên không đủ, vui lòng thử lại sau",
    "status": "RESOURCE_EXHAUSTED",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "RESOURCE_AVAILABILITY",
        "domain": "compute.googleapis.com",
        "metadata": {
          "zone": "us-east1-a",
          "service": "compute"
        }
      }
    ]
  }
}
```

**Yêu cầu cốt lõi**:
- Phải chứa `ErrorInfo` cung cấp định danh lỗi có thể đọc bằng máy
- `message` hướng tới nhà phát triển, mô tả vấn đề và giải pháp bằng ngôn ngữ tươi mới
- `details` array có thể chứa `LocalizedMessage`（thông điệp địa phương), `Help`（liên kết trợ giúp), v.v.
:::

::: details Hướng dẫn REST API của Microsoft
Tham khảo [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md), Microsoft nhấn mạnh tính nhất quán của response:

**Phân loại lỗi và sự cố**:
- **Lỗi (Error)**: Do client gửi dữ liệu không hợp lệ, trả 4xx, không ảnh hưởng khả dụng API
- **Sự cố (Fault)**: Server không thể xử lý đúng request hợp lệ, trả 5xx, ảnh hưởng khả dụng API

**Tiêu chuẩn Response headers**:
- `Date`: Phải trả về, dùng format RFC 5322（múi giờ GMT)
- `Content-Type`: Phải trả về
- `ETag`: Các tài nguyên hỗ trợ kiểm soát đồng thời lạc quan phải trả về
:::

::: details Sổ tay phát triển Java của Alibaba
Tham khảo [Sổ tay phát triển Java của Alibaba](https://developer.aliyun.com/special/tech-java), Alibaba có các quy chuẩn API response như sau:

**Đối tượng return thống nhất**:
```java
public class Result<T> {
    private Integer code;
    private String message;
    private T data;
    private String requestId;
}
```

**Thiết kế phân đoạn error codes**:
| Khoảng | Loại | Ví dụ |
| :--- | :--- | :--- |
| 0 | Thành công | 0 |
| 1xxxx | Lỗi tham số | 10001 thiếu tham số bắt buộc |
| 2xxxx | Lỗi kinh doanh | 20001 số dư không đủ |
| 3xxxx | Lỗi xác thực | 30001 chưa đăng nhập |
| 5xxxx | Lỗi hệ thống | 50001 exception database |
:::

::: details Thiết kế response Stripe API
Tham khảo [Stripe API Documentation](https://docs.stripe.com/api/errors), thiết kế error response của Stripe rất chi tiết:

```json
{
  "error": {
    "type": "card_error",
    "code": "card_declined",
    "message": "Thẻ của bạn bị từ chối.",
    "param": "number",
    "decline_code": "insufficient_funds",
    "doc_url": "https://stripe.com/docs/error-codes/card-declined"
  }
}
```

**Điểm thiết kế nổi bật**:
- `type` phân biệt loại lỗi: `api_error`, `card_error`, `invalid_request_error`
- `param` chỉ ra tham số nào bị sai, frontend có thể định vị trường form ngay
- `doc_url` cung cấp liên kết tài liệu, nhà phát triển tìm hiểu sâu hơn
- `decline_code` cung cấp nguyên nhân lỗi chi tiết hơn
:::

::: details Đặc tả JSON:API
Tham khảo [JSON:API Specification](https://jsonapi.org/format/), đây là đặc tả JSON API được ngành công nghiệp áp dụng rộng rãi:

```json
{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "Giải thích chi tiết đặc tả JSON:API"
    },
    "relationships": {
      "author": {
        "data": { "type": "users", "id": "9" }
      }
    }
  },
  "included": [
    {
      "type": "users",
      "id": "9",
      "attributes": {
        "name": "Trương Ba"
      }
    }
  ]
}
```

**Thiết kế cốt lõi**:
- `data` chứa tài nguyên chính, phải có `type` và `id`
- `attributes` lưu thuộc tính tài nguyên
- `relationships` mô tả liên kết tài nguyên
- `included` tránh request lặp, trả về dữ liệu liên kết một lần
:::

::: details Thiết kế response GitHub REST API
Tham khảo [GitHub REST API Documentation](https://docs.github.com/en/rest), thiết kế response GitHub chú trọng developer experience:

**Response thành công**:
```json
{
  "id": 1296269,
  "node_id": "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
  "name": "Hello-World",
  "full_name": "octocat/Hello-World",
  "owner": {
    "login": "octocat",
    "id": 1,
    "avatar_url": "https://github.com/images/error/octocat_happy.gif"
  },
  "private": false,
  "html_url": "https://github.com/octocat/Hello-World"
}
```

**Response lỗi**:
```json
{
  "message": "Thông tin xác thực sai",
  "documentation_url": "https://docs.github.com/rest"
}
```

**Điểm thiết kế nổi bật**:
- Response chứa nhiều format URL（`html_url`, `url`) để sử dụng trong các tình huống khác nhau
- Response lỗi chứa `documentation_url` chỉ tới tài liệu
- Dùng `Link` response header để implement pagination
:::

::: details Thiết kế response Twitter/X API v2
Tham khảo [Twitter API v2 Documentation](https://developer.twitter.com/en/docs/twitter-api), Twitter API v2 dùng format response đơn giản:

```json
{
  "data": {
    "id": "1460323737035677698",
    "text": "Xin chào, Twitter!"
  },
  "includes": {
    "users": [
      {
        "id": "2244994945",
        "name": "Twitter Dev",
        "username": "TwitterDev"
      }
    ]
  }
}
```

**Điểm thiết kế nổi bật**:
- `data` chứa dữ liệu chính, `includes` chứa dữ liệu liên kết（tương tự JSON:API)
- Hỗ trợ chọn field: `?tweet.fields=created_at,public_metrics`
- Pagination dùng `next_token` và `previous_token`
:::

### 7.2 Tóm tắt best practices

Kết hợp các tiêu chuẩn trên, thiết kế cấu trúc response nên tuân theo các nguyên tắc:

1. **Nhất quán là ưu tiên**: Tất cả endpoint dùng response structure giống nhau, frontend có thể uniform wrapper request layer
2. **Máy có thể đọc**: Error codes + error reasons cho phép chương trình xử lý tự động
3. **Con người thân thiện**: message mô tả rõ ràng, chứa gợi ý giải quyết
4. **Có thể truy vết**: request_id xuyên suốt toàn bộ request chain, dễ định vị vấn đề
5. **Hỗ trợ quốc tế hóa**: Qua `details` mở rộng thông điệp địa phương

### 7.3 Tiêu chuẩn thiết kế field `data`

`data` là phần lõi của response, thiết kế của nó trực tiếp ảnh hưởng hiệu quả phát triển frontend.

<DataFieldDesignDemo />

### 7.4 Thiết kế response lỗi nâng cao

<ErrorResponseDesignDemo />

::: tip Liên kết tham khảo
- [Google API Design Guide - Errors](https://cloud.google.com/apis/design/errors)
- [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines)
- [Sổ tay phát triển Java của Alibaba](https://developer.aliyun.com/special/tech-java)
- [Heroku HTTP API Design Guide](https://github.com/interagent/http-api-design)
- [Stripe API - Errors](https://docs.stripe.com/api/errors)
- [JSON:API Specification](https://jsonapi.org/format/)
:::

---

## 8. Thực chiến: Ví dụ thiết kế API hệ thống thương mại điện tử

```
# Mô-đun người dùng
GET    /v1/users                    # Lấy danh sách người dùng
POST   /v1/users                    # Tạo người dùng mới
GET    /v1/users/{id}               # Lấy chi tiết người dùng
PUT    /v1/users/{id}               # Cập nhật toàn bộ người dùng
PATCH  /v1/users/{id}               # Cập nhật một phần người dùng
DELETE /v1/users/{id}               # Xóa người dùng

# Mô-đun đơn hàng
GET    /v1/users/{id}/orders        # Lấy danh sách đơn hàng của người dùng
POST   /v1/orders                   # Tạo đơn hàng
GET    /v1/orders/{id}              # Lấy chi tiết đơn hàng
PATCH  /v1/orders/{id}/status       # Cập nhật trạng thái đơn hàng

# Mô-đun sản phẩm（dùng query params để filter phức tạp)
GET    /v1/products?category=phone&price_max=5000&sort=price_desc&page=1
```

---

## 9. Dùng AI hỗ trợ thiết kế API

AI có thể giúp bạn nhanh chóng tạo thiết kế API tuân theo tiêu chuẩn. Chìa khóa là cung cấp context rõ ràng và điều kiện ràng buộc.

### 9.1 Template prompt

```
Bạn là một kiến trúc sư backend có kinh nghiệm, thông thạo thiết kế API RESTful. Vui lòng giúp tôi thiết kế một bộ giao diện API.

## Nền tảng kinh doanh
[Mô tả tình huống kinh doanh của bạn, ví dụ: hệ thống thương mại điện tử, nền tảng blog, ứng dụng quản lý công việc, v.v.]

## Yêu cầu chức năng
[Liệt kê các mô-đun chức năng cần thiết, ví dụ:
- Quản lý người dùng: đăng ký, đăng nhập, hồ sơ cá nhân
- Quản lý đơn hàng: tạo đơn hàng, truy vấn đơn hàng, hủy đơn hàng
- Quản lý sản phẩm: danh sách sản phẩm, chi tiết sản phẩm, tìm kiếm]

## Yêu cầu thiết kế
1. Tuân theo tiêu chuẩn RESTful
2. URL dùng danh từ số nhiều, chữ thường + gạch ngang
3. Sử dụng đúng HTTP methods（GET/POST/PUT/PATCH/DELETE)
4. Response format thống nhất: { code, message, data, request_id }
5. Sử dụng status codes hợp lý
6. Kiểm soát phiên bản: cách URL path（/v1/)

## Format output
Vui lòng output theo format sau:

### Danh sách endpoint
| Methods | URL | Mô tả | Request body | Response body |
|---------|-----|-------|--------------|---------------|

### Ví dụ request/response
[Các ví dụ chi tiết của những endpoint chính]

### Giải thích status codes
[Các status codes được dùng và ý nghĩa]
```

### 9.2 Ví dụ thực chiến: API đơn hàng thương mại điện tử

**Input prompt:**

```
Bạn là một kiến trúc sư backend có kinh nghiệm, thông thạo thiết kế API RESTful. Vui lòng giúp tôi thiết kế một bộ giao diện API cho hệ thống đơn hàng thương mại điện tử.

## Nền tảng kinh doanh
Một nền tảng B2C, người dùng có thể duyệt sản phẩm, đặt hàng mua, xem trạng thái đơn hàng.

## Yêu cầu chức năng
- Mô-đun đơn hàng: tạo đơn hàng, truy vấn danh sách đơn hàng, truy vấn chi tiết đơn hàng, hủy đơn hàng, thanh toán đơn hàng
- Mô-đun giỏ hàng: thêm sản phẩm, sửa số lượng, xóa sản phẩm, xem giỏ hàng

## Yêu cầu thiết kế
1. Tuân theo tiêu chuẩn RESTful
2. URL dùng danh từ số nhiều, chữ thường + gạch ngang
3. Sử dụng đúng HTTP methods
4. Response format thống nhất
5. Kiểm soát phiên bản: /v1/
```

**Ví dụ output AI:**

| Methods | URL | Mô tả |
| :--- | :--- | :--- |
| `POST` | `/v1/orders` | Tạo đơn hàng |
| `GET` | `/v1/orders` | Truy vấn danh sách đơn hàng |
| `GET` | `/v1/orders/{id}` | Truy vấn chi tiết đơn hàng |
| `PATCH` | `/v1/orders/{id}/status` | Cập nhật trạng thái đơn hàng（hủy/thanh toán) |
| `GET` | `/v1/users/{id}/cart` | Lấy giỏ hàng |
| `POST` | `/v1/users/{id}/cart/items` | Thêm sản phẩm vào giỏ hàng |
| `PATCH` | `/v1/users/{id}/cart/items/{itemId}` | Sửa số lượng sản phẩm trong giỏ |
| `DELETE` | `/v1/users/{id}/cart/items/{itemId}` | Xóa sản phẩm trong giỏ hàng |

### 9.3 Lưu ý khi dùng AI hỗ trợ thiết kế

| Lưu ý | Giải thích |
| :--- | :--- |
| **Cung cấp context đầy đủ** | Nền tảng kinh doanh, vai trò người dùng, mối quan hệ dữ liệu phải rõ ràng |
| **Xác định điều kiện ràng buộc rõ ràng** | Quy tắc đặt tên, chiến lược phiên bản, format response phải định trước |
| **Lặp và tối ưu hóa** | Output lần đầu có thể không hoàn hảo, hỏi chi tiết, yêu cầu sửa |
| **Kiểm duyệt thủ công** | Dùng AI tạo ra cần kiểm tra xem có tuân theo yêu cầu kinh doanh hay không |
| **Bổ sung trường hợp biên** | Yêu cầu AI xem xét xử lý lỗi, kiểm soát quyền hạn, phân trang, v.v. |

::: tip 💡 Kỹ thuật follow-up
- "Vui lòng bổ sung ví dụ error response cho mỗi endpoint"
- "Vui lòng xem xét các tham số phân trang, sắp xếp, lọc"
- "Vui lòng thêm giải thích kiểm soát quyền hạn endpoint"
- "Vui lòng kiểm tra xem có tuân theo best practices RESTful không"
:::

---

## Bảng tra cứu thuật ngữ

| Thuật ngữ | Tiếng Anh | Giải thích |
| :--- | :--- | :--- |
| **API** | Application Programming Interface | Quy ước giao tiếp giữa các chương trình |
| **REST** | Representational State Transfer | Một phong cách kiến trúc, dùng URL định danh tài nguyên |
| **Tài nguyên** | Resource | Khái niệm lõi của REST, có định danh duy nhất（URL) |
| **Tính idempotent** | Idempotency | Thực hiện nhiều lần kết quả giống nhau |
| **Status codes** | Status Code | Trạng thái response được định nghĩa bởi giao thức HTTP |
| **Kiểm soát phiên bản** | Versioning | Cho phép API cũ và mới tồn tại, nâng cấp mượt mà |
| **Request body** | Request Body | Dữ liệu được gửi kèm theo yêu cầu POST/PUT/PATCH |
| **Response body** | Response Body | Dữ liệu được server trả về |
| **Headers** | Header | Metadata của request/response（ví dụ: Content-Type) |
| **Xác thực** | Authentication | Xác minh "bạn là ai"（đăng nhập, Token) |
| **Xác quyền** | Authorization | Xác minh "bạn có thể làm gì"（quyền hạn) |
