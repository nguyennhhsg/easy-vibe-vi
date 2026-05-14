# API Nhập Môn: Hiểu Rõ "Cuộc Đối Thoại Giữa Các Chương Trình" Từ Số 0

::: tip 🎯 Câu Hỏi Lõm Thõm
**API là gì?** Điều này giống như hỏi: làm sao thiết kế menu nhà hàng để khách nhìn là hiểu? Làm sao người phục vụ ghi đơn để không bị sai? API giải quyết vấn đề "các chương trình nói chuyện với nhau như thế nào". Ngay ngày đầu tiên bạn viết code, bạn đã dùng API mà có thể chưa nhận ra.
:::

---

## 0. Ba Điều Bối Rối Của Người Mới Học

**Bối Rối Một: API có phải thứ cao siêu không?**

Nhiều người nghe đến API là cảm thấy đó là khái niệm chỉ kỹ sư nâng cao mới hiểu. Thực tế bạn đã dùng API rồi:

```python
len("hello")        # Đây chính là API mà Python cung cấp
open("file.txt")    # Đây cũng là API
requests.get(url)   # Cái này cũng là API
```

**Bối Rối Hai: Web API và API thường có gì khác?**

| Loại | Gọi Đối Tượng | Cách Giao Tiếp | Tình Huống Điển Hình |
| :--- | :--- | :--- | :--- |
| **API Hàm** | Mã cục bộ | Gọi hàm | `len()`, `open()` |
| **API Hệ Điều Hành** | Hệ điều hành | Lệnh gọi hệ thống | Đọc/ghi file, tạo tiến trình |
| **Web API** | Máy chủ từ xa | Yêu cầu HTTP | Gọi mô hình AI, lấy dự báo thời tiết |

**Bối Rối Ba: Mình nên dùng HTTP hay SDK?**

```python
# Cách HTTP: tự xử lý tất cả chi tiết
import requests
response = requests.post(
    "https://api.deepseek.com/v1/chat/completions",
    headers={"Authorization": "Bearer sk-xxx"},
    json={"model": "deepseek-chat", "messages": [...]}
)
result = response.json()["choices"][0]["message"]["content"]

# Cách SDK: trợ lý giúp bạn xử lý
from openai import OpenAI
client = OpenAI(api_key="sk-xxx")
response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[...]
)
result = response.choices[0].message.content
```

---

## 1. Bản Chất Của API: Cắm Điện Và Ổ Cắm

**API** (Application Programming Interface, Giao Diện Lập Trình Ứng Dụng) là "thỏa thuận về cách các chương trình nói chuyện với nhau".

### 1.1 Lấy Điện Tử Gia Làm Ví Dụ

| Khái Niệm | Ví Dụ Điện Tử Gia | API Tương Ứng |
| :--- | :--- | :--- |
| **Giao Diện** | Hình dáng ổ cắm | Chữ ký hàm / URL |
| **Đầu Vào** | Dòng điện đầu vào | Tham số hàm / Phần nội dung yêu cầu |
| **Đầu Ra** | Thiết bị hoạt động | Giá trị trả về / Phần nội dung phản hồi |

### 1.2 So Sánh Ba Hình Thái API

<ApiTypesComparison />

### 1.3 Khác Biệt Giữa API Hàm Và API HTTP

Nhiều người mới học sẽ bối rối: API hàm và API HTTP khác nhau thế nào? Khi đọc tài liệu làm sao phân biệt?

<ApiFunctionVsHttp />

### 1.4 Cách Đọc Tài Liệu API Các Loại Khác Nhau

Khi gặp tài liệu API loại khác nhau, trọng tâm cần chú ý cũng khác:

<DocumentTypesComparison />

---

## 2. Một Cuộc Gọi API Hoàn Chỉnh

👇 **Hãy Thử Nào**: Nhấn nút dưới đây, quan sát quá trình yêu cầu-phản hồi API hoàn chỉnh:

<ApiRequestDemo />

### 2.1 Bốn Giai Đoạn Của Cuộc Gọi API

| Giai Đoạn | Chuyện Gì Xảy Ra | Ví Dụ Điện Tử Gia |
| :--- | :--- | :--- |
| **Yêu Cầu** | Khách hàng gửi yêu cầu tới máy chủ | Nhấn công tắc |
| **Truyền Tải** | Yêu cầu truyền qua mạng tới máy chủ | Dòng điện truyền qua dây |
| **Xử Lý** | Máy chủ xử lý yêu cầu và trả về dữ liệu | Thiết bị bắt đầu hoạt động |
| **Phản Hồi** | Khách hàng nhận và xử lý kết quả | Bóng đèn phát sáng |

### 2.2 Ví Dụ Nhà Hàng

| Vai Trò Nhà Hàng | API Tương Ứng | Giải Thích |
| :--- | :--- | :--- |
| **Menu** | Tài Liệu API | Cho bạn biết có những "món" nào để gọi |
| **Người Phục Vụ** | Giao Thức HTTP | Cách "nói chuyện" chuẩn hóa |
| **Bếp** | Máy Chủ | Xử lý "đơn hàng" theo yêu cầu |
| **Mang Đến Bàn** | Phản Hồi | Trả lại kết quả cho "khách" |

---

## 3. Phương Thức HTTP: Bạn Đang "Hỏi" Hay Đang "Làm"?

Khi gọi Web API, bạn cần cho máy chủ biết bạn muốn làm gì. Đó là lý do tồn tại phương thức HTTP.

### 3.1 Dùng Tình Huống Gọi Đơn Để Hiểu

| Tình Huống | Ngoài Đời Bạn Nói Sao? | Phương Thức HTTP Tương Ứng |
| :--- | :--- | :--- |
| Bạn muốn biết hôm nay có món gì | "Anh ơi, cho tôi xem menu" | **GET** - Chỉ "hỏi", không thay đổi dữ liệu |
| Bạn muốn gọi một phần gà xốt chua cà chua | "Cho tôi một phần gà xốt chua cà chua" | **POST** - "Làm" một việc, tạo dữ liệu |
| Bạn muốn thay đổi một món ăn | "Thay vì gà xốt chua cà chua, cho tôi gà sốt dứa" | **PUT** - Thay thế dữ liệu |
| Bạn muốn thay đổi hương vị | "Gà xốt chua cà chua không cho hạt điều" | **PATCH** - Sửa một phần |
| Bạn không muốn món đó nữa | "Tính lại, không cần món đó" | **DELETE** - Xóa dữ liệu |

<HttpMethodsDemo />

::: warning Về Tính Lũy Đẳng
**Tính Lũy Đẳng**: Thực hiện nhiều lần kết quả có giống không?

- **Lũy Đẳng** (GET/PUT/DELETE): Nhấn 10 lần hay nhấn 1 lần, kết quả như nhau
- **Không Lũy Đẳng** (POST): Nhấn 10 lần, có thể tạo 10 đơn hàng

**Giải Pháp**: Với thao tác POST dùng ID duy nhất để kiểm tra, tránh xử lý lặp.
:::

### 3.2 Bảng Tra Cứu Nhanh Phương Thức HTTP

| Phương Thức | Mục Đích | Lũy Đẳng | An Toàn | Tình Huống Điển Hình |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | Lấy tài nguyên | Có | Có | Truy vấn danh sách, xem chi tiết |
| **POST** | Tạo tài nguyên | Không | Không | Thêm người dùng, gửi đơn hàng |
| **PUT** | Cập Nhật Toàn Bộ | Có | Không | Thay thế toàn bộ hồ sơ người dùng |
| **PATCH** | Cập Nhật Một Phần | Không | Không | Chỉ thay đổi biệt danh |
| **DELETE** | Xóa tài nguyên | Có | Không | Xóa người dùng, hủy đơn hàng |

---

## 4. Mã Trạng Thái HTTP: Máy Chủ Đang Nói Gì Với Bạn?

Khi máy chủ phản hồi, nó sẽ trước hết trả về một mã trạng thái, cho bạn biết yêu cầu có thành công không.

### 4.1 Phân Loại Mã Trạng Thái

<StatusCodeCategories />

### 4.2 Giải Thích Chi Tiết Các Mã Trạng Thái Thường Gặp

| Mã Trạng Thái | Ý Nghĩa | Tình Huống Điển Hình | Cách Khách Hàng Xử Lý |
| :--- | :--- | :--- | :--- |
| **200 OK** | Thành công | Yêu cầu được xử lý bình thường | Hiển thị dữ liệu |
| **201 Created** | Tạo Thành Công | Yêu cầu POST tạo tài nguyên thành công | Chuyển hướng sang tài nguyên mới |
| **400 Bad Request** | Lỗi Định Dạng Yêu Cầu | Tham số bị thiếu hoặc định dạng sai | Kiểm tra tham số |
| **401 Unauthorized** | Chưa Xác Thực | Chưa cung cấp API Key hợp lệ | Hướng dẫn người dùng đăng nhập |
| **403 Forbidden** | Không Có Quyền | API Key không có quyền truy cập tài nguyên đó | Thông báo không đủ quyền |
| **404 Not Found** | Không Tồn Tại | Địa chỉ hoặc tài nguyên yêu cầu không tồn tại | Kiểm tra URL |
| **429 Too Many Requests** | Quá Nhiều Yêu Cầu | Vượt quá giới hạn tốc độ | Thử lại sau |
| **500 Internal Server Error** | Lỗi Máy Chủ | Máy chủ gặp sự cố | Thông báo cho người dùng thử lại sau |

👇 **Hãy Thử Nào**: Nhấn nút dưới đây, tìm hiểu ý nghĩa của các mã trạng thái thường gặp:

<StatusCodeDemo />

---

## 5. HTTP vs SDK: Tự Đi Hay Để Trợ Lý Giúp?

### 5.1 So Sánh Hai Cách Gọi

| | 🏃 **HTTP API** | 🤵 **SDK** |
| :--- | :--- | :--- |
| **Ví Dụ** | Tự đi chân mình | Trợ lý giúp đỡ |
| **Ưu Điểm** | ✓ Mọi ngôn ngữ đều dùng được<br>✓ Kiểm soát hoàn toàn chi tiết yêu cầu<br>✓ Không cần phụ thuộc thêm | ✓ Code ngắn gọn dễ đọc<br>✓ Tự động xử lý xác thực<br>✓ Bao gồm thử lại lỗi tự động |
| **Nhược Điểm** | ✗ Cần xử lý tất cả chi tiết<br>✗ Code dài và dễ gặp lỗi | ✗ Cần cài đặt phụ thuộc<br>✗ Có thể gặp vấn đề phiên bản |
| **Ví Dụ Code** | `requests.post(url, json=..., headers={...})` | `client.chat.completions.create(...)` |

### 5.2 Làm Sao Chọn?

| Tình Huống | Khuyên Cách | Lý Do |
| :--- | :--- | :--- |
| **Phát Triển Nhanh** | SDK | Tự động xử lý xác thực, lỗi, thử lại |
| **Học Nguyên Lý** | HTTP | Hiểu cơ chế ở mức thấp |
| **Ngôn Ngữ Không Hỗ Trợ** | HTTP | Mọi ngôn ngữ đều dùng được |
| **Cần Tùy Chỉnh** | HTTP | Linh hoạt kiểm soát từng chi tiết |

::: tip 💡 Gợi Ý
**Có thể dùng SDK thì dùng SDK**, để những việc phức tạp cho thư viện, dành thời gian cho chính mình.
:::

---

## 6. Cách Đọc Tài Liệu API?

Tài liệu API giống như kết hợp hướng dẫn sử dụng và menu. Bạn không cần đọc từ đầu đến cuối, chỉ cần học cách "tra từ điển".

### 6.1 Danh Sách Kiểm Tra Đọc Tài Liệu

Mở bất kỳ tài liệu API nào (ví dụ OpenAI hoặc DeepSeek), bạn chỉ cần tìm vài thứ này:

<ApiDocumentDemo />

| Mục | Giải Thích | Ví Dụ |
| :--- | :--- | :--- |
| **Base URL** | Địa chỉ gốc của API | `https://api.deepseek.com` |
| **Authentication** | Cách chứng minh danh tính | `Authorization: Bearer sk-xxx` |
| **Endpoints** | Danh sách giao diện cụ thể | `/v1/chat/completions` |
| **Parameters** | Tham số bắt buộc/tùy chọn | `model` (bắt buộc), `temperature` (tùy chọn) |
| **Response** | Cấu trúc dữ liệu trả về | `{"choices": [...]}` |

### 6.2 Các Bước Đọc Tài Liệu

1. **Tìm Base URL** - Đây là tiền tố của tất cả yêu cầu
2. **Hiểu Cách Xác Thực** - API Key đặt ở Header hay Query?
3. **Tìm Endpoint Cần Dùng** - Giao diện cụ thể bạn cần gọi
4. **Xem Tham Số Yêu Cầu** - Cái nào bắt buộc? Cái nào tùy chọn?
5. **Hiểu Định Dạng Trả Về** - Dữ liệu được tổ chức như thế nào?

---

## 7. Thực Hành: Mô Phỏng Cuộc Gọi API

Chỉ nói không làm không tốt. Dưới đây có một API mô phỏng, bạn có thể tự do điền tham số, tự do thay địa chỉ, xem chuyện gì sẽ xảy ra.

<ApiPlayground />

Thử kích hoạt các tình huống sau:
- ✅ **Yêu Cầu Thành Công**: Điền Endpoint và API Key đúng
- ❌ **Lỗi 401**: Không điền API Key, xem máy chủ từ chối như thế nào
- ❌ **Lỗi 404**: Điền một địa chỉ không tồn tại

---

## 8. Tóm Tắt

::: info Những Điểm Chính
1. **API là cái ống truyền**,giúp bạn gửi tin tức tới code khác hoặc máy chủ từ xa
2. **Bạn đã dùng API rồi**, từ `len()` đến `open()` đều là API
3. **Web API là siêu lực**, cho phép gọi siêu máy tính ở xa
4. **SDK là trợ lý tốt**, có thể dùng SDK thì đừng tự chạy chân
5. **Xem tài liệu tìm ba thứ**: địa chỉ, xác thực, tham số
:::

Trong thời đại AI lập trình, bạn chỉ cần nhớ vài khái niệm cốt lõi này. Phần còn lại, IDE và trợ lý AI sẽ giúp bạn xử lý.

---

## Bảng Tra Cứu Thuật Ngữ

| Thuật Ngữ | Viết Tắt Đầy Đủ | Giải Thích |
| :--- | :--- | :--- |
| **API** | Application Programming Interface | Giao diện lập trình ứng dụng, định nghĩa cách phần mềm tương tác |
| **Web API** | - | API dựa trên giao thức HTTP, dùng cho giao tiếp mạng |
| **Endpoint** | - | Điểm cuối, địa chỉ cụ thể của API |
| **HTTP** | HyperText Transfer Protocol | Giao thức giao tiếp dùng cho Web API |
| **GET** | - | Phương thức lấy tài nguyên |
| **POST** | - | Phương thức gửi dữ liệu |
| **SDK** | Software Development Kit | Bộ công cụ phát triển phần mềm, bao bọc lệnh gọi API ở mức thấp |
| **URL** | Uniform Resource Locator | Địa chỉ mạng của API |
| **JSON** | JavaScript Object Notation | Định dạng dữ liệu thường dùng |
| **Authentication** | - | Quá trình xác minh danh tính |
| **Status Code** | - | Mã trạng thái trong phản hồi HTTP |
| **Request** | - | Yêu cầu |
| **Response** | - | Phản hồi |
| **Header** | - | Tiêu đề HTTP, chứa thông tin siêu dữ liệu |
| **Payload** | - | Dữ liệu thực tế của yêu cầu hoặc phản hồi |
| **Rate Limit** | - | Giới hạn tốc độ |
| **Idempotent** | - | Lũy đẳng, thực hiện nhiều lần kết quả giống nhau |
| **REST** | Representational State Transfer | Một kiểu kiến trúc API |
| **RPC** | Remote Procedure Call | Gọi thủ tục từ xa |
| **GraphQL** | - | Một ngôn ngữ truy vấn dạng API |
| **gRPC** | - | Khung RPC hiệu suất cao do Google phát triển |
