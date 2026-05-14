# Trình duyệt là một hệ điều hành

::: tip Lời nói đầu
Bạn sử dụng trình duyệt mỗi ngày — xem video, lướt tin tức, làm việc trực tuyến. Nhưng bạn có bao giờ tự hỏi: **khi bạn nhập một địa chỉ web vào thanh địa chỉ và nhấn Enter, điều gì xảy ra phía sau?**

Bài viết này sẽ dùng **"mua sắm trực tuyến"** làm so sánh sinh động, kết hợp với **quá trình kỹ thuật thực tế**, để giúp bạn từng bước hiểu cách trình duyệt chuyển một dòng địa chỉ web thành một trang web đầy màu sắc.

Sau khi đọc bài này, bạn sẽ có thể:
- Hiểu được quy trình hoàn chỉnh từ nhập địa chỉ web đến hiển thị trang
- Nắm vững các khái niệm cốt lõi như URL, DNS, TCP, HTTP
- Tìm hiểu cách trình duyệt hiển thị trang
- Biết sự khác biệt giữa trang tĩnh và trang động

**Không cần nền tảng lập trình**, chỉ cần kinh nghiệm mua sắm trực tuyến hàng ngày của bạn.
:::

**Bài viết này sẽ dạy bạn cái gì?**

Sau khi hoàn thành chương này, bạn sẽ nắm vững toàn bộ quá trình kỹ thuật từ nhập địa chỉ web đến hiển thị trang, hiểu cách trình duyệt và máy chủ hợp tác với nhau. Những kiến thức này là nền tảng cho việc học các công nghệ tiếp theo như API, giao diện, bảo mật mạng, và cũng là chìa khóa để khắc phục các vấn đề hàng ngày như "trang web không mở được", "tải chậm".

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|----------|------------------|
| **Chương 1** | Phân tích URL | Cấu trúc và chức năng của địa chỉ web |
| **Chương 2** | Truy vấn DNS | Cách tên miền chuyển đổi thành địa chỉ IP |
| **Chương 3** | Bắt tay TCP | Cách thiết lập kết nối đáng tin cậy |
| **Chương 4** | Giao tiếp HTTP | Cách trình duyệt và máy chủ giao tiếp |
| **Chương 5** | Hiển thị trình duyệt | Cách mã trở thành hình ảnh |
| **Chương 6** | Tĩnh vs Động | Cách tạo nội dung trang web |

---

## 0. Lời dẫn: Khi bạn nhấn phím Enter

::: tip 🤔 Câu hỏi cốt lõi
**Khi bạn nhập địa chỉ web vào trình duyệt và nhấn Enter, điều gì xảy ra phía sau?** Tại sao có trang web mở nhanh, có trang mở chậm? Tại sao đôi khi gặp lỗi "không tìm thấy máy chủ"?
:::

### So sánh sinh động: Một chuyến mua sắm trực tuyến

Hãy tưởng tượng bạn đang thực hiện một lần **mua sắm trực tuyến**. Toàn bộ quá trình có thể chia thành 5 bước:

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; background: var(--vp-c-bg-alt); border-radius: 12px;">

**🛒 Bước 1: Điền đơn hàng**
Chọn hàng, xác nhận địa chỉ giao hàng

</div>
<div style="flex: 1; padding: 16px; background: var(--vp-c-bg-alt); border-radius: 12px;">

**🗺️ Bước 2: Tìm kho**
Hệ thống tìm kho giao hàng cụ thể

</div>
<div style="flex: 1; padding: 16px; background: var(--vp-c-bg-alt); border-radius: 12px;">

**📞 Bước 3: Thiết lập kênh**
Xác nhận kho hoạt động và có thể giao hàng

</div>
</div>

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; background: var(--vp-c-bg-alt); border-radius: 12px;">

**🚚 Bước 4: Kho giao hàng**
Nhân viên giao hàng mang bưu kiện đến nhà

</div>
<div style="flex: 1; padding: 16px; background: var(--vp-c-bg-alt); border-radius: 12px;">

**🎁 Bước 5: Mở hộp**
Mở bưu kiện, xem sản phẩm yêu thích

</div>
</div>

**Quá trình truy cập trang web tương tự một cách đáng kinh ngạc!**

Khi bạn nhập `google.com` vào trình duyệt và nhấn Enter, bạn chính là "người mua hàng", trình duyệt thực hiện một loạt hoạt động, cuối cùng "mang" nội dung trang web từ máy chủ ở xa đến màn hình của bạn.

<UrlToBrowserQuickStart />

::: info 💡 Hiểu biết cốt lõi
Chìa khóa để hiểu cách hoạt động của trình duyệt là: **ánh xạ quá trình kỹ thuật phức tạp lên các tình huống sinh hoạt quen thuộc**. Năm bước mua sắm hoàn toàn tương ứng với năm giai đoạn kỹ thuật khi truy cập trang web.
:::

---

## 1. Bước 1: Điền "đơn hàng" —— Phân tích URL

::: tip 🤔 Câu hỏi cốt lõi
**Tại sao địa chỉ web phải viết như vậy?** `https://www.example.com:8080/path/page.html?id=123#section` — chuỗi ký tự này có ý nghĩa gì?
:::

### So sánh sinh động: Điền phiếu mua hàng

Nếu bạn chỉ viết "mua giày" trên đơn hàng, kho chắc chắn không biết gửi đôi nào. Bạn cần viết rõ:

- **Loại cửa hàng** (cửa hàng chính hãng/cửa hàng thường)
- **Tên cửa hàng** (cửa hàng chính hãng Nike)
- **Vị trí sản phẩm** (khu giày nam/dòng giày chạy)
- **Model cụ thể** (Air Max 90)
- **Ghi chú** (tôi muốn màu đỏ)

### Quá trình thực tế: Trình duyệt phân tích URL

**URL (Uniform Resource Locator, Định vị tài nguyên thống nhất)** là "mã vị trí sản phẩm" trong thế giới trình duyệt. Khi bạn nhập `https://www.example.com:8080/path/page.html?id=123#section` vào thanh địa chỉ, trình duyệt sẽ phân tích nó ngay:

| Phần của URL                | Ví dụ                | So sánh mua sắm trực tuyến                                 | Chức năng kỹ thuật                                                                 |
| --------------------------- | -------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Giao thức** `https://`    | Giao thức HTTPS      | **Phương thức vận chuyển**: giao hàng bảo mật (HTTPS) vs bình thường (HTTP) | Quyết định quy tắc giao tiếp. `http` là truyền thông thường, `https` là truyền bảo mật |
| **Tên miền** `www.example.com` | Tên miền server    | **Tên cửa hàng**: siêu thị JD.com                           | Cho trình duyệt biết tìm máy chủ nào. Tên miền là để người dùng nhớ, cuối cùng phải chuyển thành địa chỉ IP |
| **Cổng** `:8080`            | Số cổng server      | **Số quầy**: quầy số 3 (mặc định không ghi)                 | Máy chủ có thể có nhiều dịch vụ, cổng chỉ định truy cập cái nào. HTTP mặc định cổng 80, HTTPS mặc định cổng 443 |
| **Đường dẫn** `/path/page.html` | Vị trí tệp server | **Vị trí hàng**: khu hàng dùng ngày/hàng thứ ba             | Chỉ định vị trí tài nguyên cụ thể trên máy chủ                                    |
| **Tham số truy vấn** `?id=123` | Thông tin bổ sung  | **Ghi chú đơn hàng**: màu đỏ, kích cỡ XL                   | Truyền dữ liệu bổ sung cho máy chủ, như từ khóa tìm kiếm, số trang, v.v.           |
| **Mặt bằng** `#section`     | Vị trí trong trang   | **Số trang hướng dẫn**: chuyển đến trang 5                  | Sau khi tải trang, tự động cuộn đến vị trí chỉ định, không gửi cho máy chủ        |

<UrlParserDemo />

::: info 💡 Hiểu biết chính
URL tồn tại để **con người** có thể nhớ và nhập. Máy tính cuối cùng cần **địa chỉ IP** (giống như nhân viên giao hàng cuối cùng cần địa chỉ kho thực tế, không phải tên "cửa hàng chính hãng Nike").
:::

---

## 2. Bước 2: Tra "sổ địa chỉ" —— Truy vấn DNS

::: tip 🤔 Câu hỏi cốt lõi
**Tại sao trình duyệt có thể tìm được trang web?** Bạn nhập tên miền mà con người có thể đọc (như `baidu.com`), nhưng máy tính thực sự cần địa chỉ số (IP). Điều gì xảy ra ở giữa?
:::

### So sánh sinh động: Tra sổ địa chỉ kho

Bạn ghi trên đơn là "cửa hàng chính hãng Nike", nhưng hệ thống logistics không biết kho ở đâu. Nó cần tra sổ địa chỉ:

1. Trước tiên tra **địa chỉ thường xuyên** (bạn có mua ở đây gần đây không) → bộ nhớ đệm trình duyệt
2. Nếu không có, hỏi **điểm giao dịch khu vực** (họ biết phân bổ vùng lớn) → máy chủ DNS cục bộ
3. Hỏi **trung tâm điều phối chính** (biết kho loại .com thuộc ai) → máy chủ tên miền gốc
4. Hỏi **bộ phận quản lý thương hiệu** (tìm thấy kho giao hàng thực tế của Nike) → máy chủ tên miền có thẩm quyền

### Quá trình thực tế: Truy vấn DNS phân cấp

**DNS (Domain Name System, Hệ thống tên miền)** là "hệ thống tra cứu sổ địa chỉ phân tán" của Internet. Vì toàn cầu có hàng tỷ tên miền, nên sử dụng kiến trúc phân cấp để phân tán áp lực truy vấn:

```
Bạn (trình duyệt)
    ↓ Hỏi: Địa chỉ IP của google.com là gì?
Máy chủ DNS cục bộ (nhà cung cấp mạng của bạn, như China Telecom/Unicom)
    ↓ Hỏi: .com do ai quản lý?
Máy chủ tên miền gốc (13 nhóm máy chủ gốc toàn cầu, quản lý tất cả các tên miền cấp cao)
    ↓ Nói: hãy hỏi người quản lý .com
Máy chủ tên miền cấp cao (Verisign quản lý .com)
    ↓ Nói: hãy hỏi người quản lý google.com
Máy chủ tên miền có thẩm quyền (máy chủ DNS của Google)
    ↓ Nói: địa chỉ IP của google.com là 142.250.80.46
Trả về địa chỉ IP cho trình duyệt
```

**Giải thích loại truy vấn:**

- **Truy vấn đệ quy (Recursive Query)**: Trình duyệt chỉ gửi một yêu cầu, máy chủ DNS cục bộ chịu trách nhiệm tra cứu từng lớp rồi trả kết quả
- **Truy vấn lặp (Iterative Query)**: Mỗi lớp chỉ nói lớp tiếp theo hãy hỏi đâu, trình duyệt cần tra cứu nhiều lần
- **Cơ chế bộ nhớ đệm**: Kết quả truy vấn sẽ được lưu vào bộ nhớ đệm, lần sau trả về ngay, tăng tốc độ truy cập

<DnsLookupDemo />

::: info 💡 Tại sao cần nhiều lớp như vậy?
Hãy tưởng tượng nếu toàn thế giới chỉ có một sổ địa chỉ, hàng tỷ người tra cứu cùng lúc thì chắc chắn sẽ sập. Thiết kế phân cấp cho phép mỗi lớp chỉ quản lý "khu vực" của mình, vừa hiệu quả vừa đáng tin cậy.

Đây là tư tưởng cốt lõi của thiết kế Internet: **hệ thống phân tán**.
:::

---

## 3. Bước 3: Gọi điện xác nhận —— Bắt tay ba bước TCP

::: tip 🤔 Câu hỏi cốt lõi
**Tại sao cần "bắt tay ba bước"?** Sau khi tìm được địa chỉ máy chủ, tại sao không thể gửi dữ liệu trực tiếp? Tại sao phải giao tiếp ba lần trước?
:::

### So sánh sinh động: Thiết lập kênh vận chuyển

Nếu xe vận chuyển đi thẳng đến kho, kết quả là:

- Kho đóng cửa → chạy vô ích
- Kho quá tải không nhận đơn → không thể giao hàng
- Không tìm thấy nơi dỡ hàng → không thể kết nối

**Vì vậy trước khi thực sự giao hàng, phải thiết lập kênh vận chuyển đáng tin cậy**.

### Quá trình thực tế: Bắt tay ba bước TCP

**TCP (Transmission Control Protocol, Giao thức kiểm soát truyền tải)** là quy tắc đảm bảo truyền dữ liệu đáng tin cậy. Trước khi truyền hàng hóa (dữ liệu), phải thực hiện "bắt tay ba bước" để thiết lập kết nối:

```
Client (máy tính của bạn)         Server (kho hàng)
   |                                |
   |--- SYN=1 --------------------->|  Lần 1: Xin chào, tôi ở nhà, sẵn sàng nhận hàng! (SYN)
   |                                |
   |<-- SYN=1, ACK=1 ---------------|  Lần 2: Nhận được! Tôi cũng sẵn sàng giao hàng, bạn ở nhà không? (SYN-ACK)
   |                                |
   |--- ACK=1 --------------------->|  Lần 3: Có! Vui lòng giao hàng. (ACK)
   |                                |
   ===== Kênh được thiết lập, bắt đầu giao hàng =====
```

**Tại sao là ba lần, không phải hai?**

- **Lần 1 (SYN)**: Client chứng minh mình có thể gửi
- **Lần 2 (SYN-ACK)**: Server chứng minh mình có thể nhận và gửi
- **Lần 3 (ACK)**: Client chứng minh mình có thể nhận

Bắt tay ba bước đảm bảo: **cả hai bên đều có thể gửi, cả hai bên đều có thể nhận** — khi tất cả bốn điều kiện đều thoả mãn, mới có thể truyền đáng tin cậy.

**TCP cũng chịu trách nhiệm:**

- **Phân chia dữ liệu**: Dữ liệu lớn được tách thành gói nhỏ để truyền
- **Sắp xếp lại theo thứ tự**: Đảm bảo các gói dữ liệu được lắp ráp theo đúng thứ tự
- **Gửi lại khi mất**: Nếu mất gói, tự động gửi lại
- **Kiểm soát luồng**: Điều chỉnh tốc độ gửi dựa trên tình hình mạng

<TcpHandshakeDemo />

> **Bước bổ sung của HTTPS**: Nếu là HTTPS (trang web an toàn), sau bắt tay TCP sẽ còn **bắt tay TLS** (1-RTT hoặc 2-RTT), cả hai bên trao đổi khóa mã hóa, đảm bảo nội dung giao tiếp sau đó chỉ có cả hai bên mới hiểu, giống như giao tiếp bằng mật ngữ.

---

## 4. Bước 4: "Người mua" và "người bán" giao tiếp —— Yêu cầu và phản hồi HTTP

::: tip 🤔 Câu hỏi cốt lõi
**Trình duyệt và máy chủ nói gì với nhau?** Sau khi thiết lập kết nối, trình duyệt làm sao "nói" cho máy chủ biết nó muốn cái gì? Máy chủ lại đáp lại như thế nào?
:::

### So sánh sinh động: Kho giao hàng

Xe vận chuyển đến kho: "Đây là đơn hàng (yêu cầu HTTP), **tôi muốn lấy hàng (mã nguồn HTML trang web)!**"
Nhân viên kho kiểm tra: "Đơn hàng hợp lệ, đây là bưu kiện bạn muốn (tệp HTML), lấy đi."

### Quá trình thực tế: Giao tiếp giao thức HTTP

**HTTP (HyperText Transfer Protocol, Giao thức truyền siêu văn bản)** là "quy tắc giao tiếp" giữa trình duyệt và máy chủ. Sau khi kênh được thiết lập, trình duyệt gửi **yêu cầu lấy hàng**, **mục tiêu cốt lõi là lấy mã nguồn trang web (tệp HTML)**:

**Ví dụ yêu cầu HTTP:**

```http
GET /index.html HTTP/1.1          ← Phương thức yêu cầu + đường dẫn + phiên bản giao thức
Host: www.example.com             ← Máy chủ đích (hỗ trợ máy chủ ảo, một máy chủ có thể lưu trữ nhiều trang web)
User-Agent: Chrome/120.0          ← Xác định client (máy chủ có thể trả về nội dung phù hợp dựa trên điều này)
Accept: text/html,application/xhtml+xml  ← Định dạng phản hồi được chấp nhận
Accept-Language: zh-CN,zh;q=0.9   ← Ngôn ngữ ưa thích
Accept-Encoding: gzip, deflate    ← Định dạng nén được hỗ trợ
Connection: keep-alive            ← Duy trì kết nối (tái sử dụng kết nối TCP)
Cookie: session_id=abc123         ← Thông tin xác thực
```

::: tip 💡 Bất ngờ của lập trình viên: Đây không phải API sao?
**Giống hệt!**
Lệnh gọi API (fetch / axios) mà bạn thường viết và việc trình duyệt truy cập trang web, ở **lớp HTTP hoàn toàn giống nhau**.

Cả hai đều gửi một yêu cầu, máy chủ trả về một đoạn văn bản dữ liệu.

- Nếu máy chủ trả về **HTML**, trình duyệt sẽ **vẽ nó ra** (thành trang web).
- Nếu máy chủ trả về **JSON**, code của bạn sẽ **lưu nó vào** (dùng cho xử lý logic).

**Fundamentally không có "hai loại" yêu cầu, chỉ có một loại yêu cầu HTTP, khác nhau ở định dạng dữ liệu trả về (Content-Type).**
Đó là lý do tại sao khi hiểu HTTP, bạn sẽ hiểu được 90% nguyên lý API backend.

Nếu bạn muốn học sâu hơn về phát triển API, vui lòng tham khảo [phần API](./api-intro.md).
:::

**Các phương thức HTTP phổ biến:**

- `GET`: Lấy tài nguyên (an toàn, idempotent, có thể được lưu vào bộ nhớ đệm)
- `POST`: Gửi dữ liệu (tạo tài nguyên, như đăng ký, đăng nhập)
- `PUT`: Cập nhật tài nguyên (thay thế hoàn toàn)
- `PATCH`: Cập nhật một phần tài nguyên
- `DELETE`: Xóa tài nguyên
- `HEAD`: Lấy tiêu đề phản hồi (không trả về nội dung, dùng để kiểm tra xem tài nguyên có tồn tại không)

**Máy chủ trả về phản hồi HTTP:**

```http
HTTP/1.1 200 OK                   ← Phiên bản giao thức + mã trạng thái + mô tả trạng thái
Date: Mon, 23 May 2025 12:00:00 GMT  ← Thời gian máy chủ
Content-Type: text/html; charset=UTF-8  ← Loại nội dung và mã hóa
Content-Length: 1234              ← Chiều dài nội dung (byte)
Cache-Control: max-age=3600       ← Chính sách bộ nhớ đệm
Set-Cookie: user_id=xyz789        ← Đặt Cookie

<!DOCTYPE html>...                ← Nội dung phản hồi (nội dung trang web)
```

**Phân loại mã trạng thái HTTP:**

| Mã trạng thái | Loại           | Ý nghĩa                | So sánh mua sắm trực tuyến               |
| ------------- | -------------- | ---------------------- | ---------------------------------------- |
| **200**       | Thành công     | Yêu cầu được xử lý     | "Xác nhận đơn, giao hàng ngay"            |
| **301/302**   | Chuyển hướng    | Tài nguyên đã di chuyển | "Cửa hàng chuyển tới quán khác, vui lòng đặt ở quán mới" |
| **304**       | Chưa sửa đổi   | Bộ nhớ đệm vẫn hợp lệ | "Hàng bạn mua lần trước vẫn dùng được, không cần giao lại" |
| **400**       | Lỗi client     | Định dạng yêu cầu sai  | "Phiếu đơn điền mơ hồ, không hiểu"       |
| **401**       | Chưa được phép  | Cần xác thực danh tính | "Vui lòng xuất trình thẻ thành viên trước" |
| **403**       | Cấm truy cập   | Quyền hạn không đủ    | "Người ngoài không được vào"              |
| **404**       | Không tìm thấy | Tài nguyên không tồn tại | "Kho không có mặt hàng này"               |
| **500**       | Lỗi máy chủ    | Lỗi nội bộ máy chủ    | "Kho cháy rồi, không giao được hàng"     |
| **502**       | Lỗi gateway    | Máy chủ upstream không đáp | "Kho chính hết hàng, chi nhánh cũng không có" |
| **503**       | Dịch vụ không sẵn sàng | Máy chủ quá tải hoặc bảo trì | "Quá tải, tạm dừng nhận đơn" |

<HttpExchangeDemo />

---

## 5. Bước 5: Mở "bưu kiện" —— Hiển thị trình duyệt

::: tip 🤔 Câu hỏi cốt lõi
**Mã làm sao biến thành hình ảnh?** Máy chủ gửi dưới dạng các đoạn code HTML/CSS/JavaScript tẻ nhạt, trình duyệt làm sao biến chúng thành trang web đầy màu sắc?
:::

### So sánh sinh động: Mở hộp và lắp ráp

Bạn cuối cùng cũng nhận được bưu kiện (phản hồi HTTP), nhưng mở ra không phải đồ nội thất thành phẩm, mà là một đống **linh kiện** (HTML) và một quyển **hướng dẫn lắp ráp** (CSS). Là "người mua" (trình duyệt), bạn cần tự tay lắp ráp:

1. **Mở hộp**: Lấy tất cả linh kiện, kiểm tra danh sách (phân tích HTML → cây DOM).
2. **Đọc hướng dẫn**: Hiểu hướng dẫn, biết linh kiện nào lắp đâu, màu gì (phân tích CSS → cây CSSOM).
3. **Phân loại**: Chọn linh kiện cần lắp, vứt bỏ xốp đóng gói (display: none), chuẩn bị lắp (xây dựng cây hiển thị).
4. **Đo lường vị trí**: Dùng thước đo kích thước phòng, quyết định mỗi đồ nội thất lắp ở đâu cụ thể (bố cục/reflow).
5. **Tô màu trang trí**: Sơn đồ nội thất, dán decal (hiển thị).
6. **Trưng bày cuối cùng**: Lau sạch, bật đèn trưng bày (hợp thành).

### Quá trình thực tế: Công cụ hiển thị trình duyệt

Trình duyệt nhận được **mã HTML/CSS/JavaScript** (văn bản tẻ nhạt), nhưng nó phải biến thành **hình ảnh pixel** (trang web đẹp). Quá trình này gọi là **hiển thị (Rendering)**, được **công cụ hiển thị** của trình duyệt (như Blink của Chrome, WebKit của Safari) thực thi.

#### Bước 1: Phân tích HTML → Xây dựng cây DOM (danh sách linh kiện)

Trình duyệt đọc luồng byte HTML, phân tích nó thành **cây DOM (Document Object Model, Mô hình đối tượng tài liệu)**. Giống như sắp xếp một đống linh kiện rải rác thành một danh sách có cấp bậc:

```html
<!-- HTML gốc -->
<div class="header">Tiêu đề</div>
<div class="content">Nội dung</div>
```

```text
Cấu trúc cây DOM:
Document
 └─ html
     └─ body
         ├─ div.header ("Tiêu đề")
         └─ div.content ("Nội dung")
```

#### Bước 2: Phân tích CSS → Xây dựng cây CSSOM (hướng dẫn)

Trình duyệt phân tích tất cả CSS (inline, tệp bên ngoài), xây dựng **cây CSSOM (CSS Object Model)**. Giống như hiểu quy tắc kiểu dáng trong hướng dẫn:

```css
.header {
  color: blue;
  font-size: 24px;
} /* Tiêu đề phải màu xanh */
.content {
  display: none;
} /* Nội dung tạm thời ẩn */
```

#### Bước 3: Hợp nhất → Cây hiển thị (chuẩn bị lắp)

Cây DOM + Cây CSSOM = **Cây hiển thị (Render Tree)**.
Điểm chính: **chỉ những phần tử "hiển thị" mới ở trong cây hiển thị**.

- `.header`: ở trong cây hiển thị (hiển thị).
- `.content`: **không ở** trong cây hiển thị (vì `display: none`, giống xốp đóng gói, không cần lắp).

#### Bước 4: Bố cục (Layout / Reflow) —— Đo lường kích thước

Trình duyệt tính toán **tọa độ chính xác và kích thước** trên màn hình của mỗi nút trong cây hiển thị.

- "Hộp tiêu đề này rộng 100px, cao 50px, đặt ở vị trí trên cùng bên trái (0,0)."
- Quá trình này gọi là **sắp xếp lại (Reflow)**. Nếu kích thước cửa sổ thay đổi (ví dụ điện thoại xoay ngang), tất cả vị trí phần tử phải tính toán lại, tốn rất nhiều hiệu năng.

#### Bước 5: Vẽ (Paint) —— Tô màu

Biết vị trí rồi, trình duyệt bắt đầu tô màu pixel: vẽ màu nền, màu chữ, viền, bóng, v.v.

#### Bước 6: Hợp thành (Composite) —— Trưng bày cuối cùng

Trình duyệt hiện đại sẽ chia trang thành nhiều **lớp (Layers)** vẽ riêng (ví dụ như 3D transform, thanh cuộn độc lập), sau đó GPU sẽ xếp chồng chúng lên nhau giống như lớp trong Photoshop, hiển thị trên màn hình.

<BrowserRenderingDemo />

::: info 💡 Bạn có biết không?
**Bố cục và vẽ** là lúc trình duyệt bận rộn nhất. Càng nhiều phần tử trên trang web, cấu trúc càng phức tạp, trình duyệt cần càng nhiều thời gian để tính toán vị trí và tô màu. Đó là lý do tại sao một số trang web phức tạp sẽ giật khi mở.
:::

---

## 5.5 Trang web được "tạo" như thế nào? Tĩnh vs Động

::: tip 🤔 Câu hỏi cốt lõi
**Nội dung trang web từ đâu?** Trước đó chúng tôi nói cách trình duyệt "mở bưu kiện" — lấy tệp HTML từ máy chủ và hiển thị. Nhưng tệp HTML trên máy chủ được tạo ra như thế nào? Được tạo sẵn hay làm ngay?
:::

Trước đó chúng tôi nói cách trình duyệt "mở bưu kiện" — lấy HTML/CSS/JS mà máy chủ gửi lại và hiển thị. Nhưng bạn có bao giờ tự hỏi một câu hỏi khác không: **tệp HTML trên máy chủ được tạo ra như thế nào?**

Câu trả lời là: **có hai cách**, đó là sự khác biệt giữa trang tĩnh và trang động.

### Trang tĩnh: Làm sẵn, gửi trực tiếp cho bạn

Hãy tưởng tượng bạn đi siêu thị mua bánh quy. Bánh quy trên kệ đã được nhà máy sản xuất sẵn, bạn lấy đi thôi, không cần đợi.

**Trang tĩnh** giống vậy — trang web đã được chuẩn bị sẵn trên máy chủ, khi bạn truy cập, máy chủ gửi trực tiếp tệp HTML đã tạo sẵn, không xử lý gì thêm.

**Đặc điểm:**
- ✅ Tốc độ truy cập nhanh (máy chủ chỉ gửi tệp, không cần tính toán)
- ✅ Dễ tạo (viết HTML xong là dùng được)
- ✅ Khả năng chịu tải cao (có thể dùng CDN phân phối, dù bao nhiêu người truy cập cũng không sợ)
- ❌ Nội dung khó cập nhật (muốn thay đổi nội dung phải tạo lại tệp)

**Ví dụ phổ biến:** Trang giới thiệu công ty, tài liệu sản phẩm, trung tâm trợ giúp, blog cá nhân

### Trang động: Đặt ngay, làm ngay, mỗi lần khác nhau

Hãy tưởng tượng bạn đi nhà hàng gọi món. Đầu bếp làm theo đơn hàng của bạn, bạn gọi gà xào không giao mì tôm.

**Trang động** là bạn truy cập máy chủ mới "tạo" trang — máy chủ nhận yêu cầu của bạn, đi vào cơ sở dữ liệu tìm dữ liệu, tính toán, rồi tạo một tệp HTML hoàn toàn mới gửi cho bạn.

**Đặc điểm:**
- ✅ Nội dung thực tế (giỏ hàng hiển thị kho hàng mới nhất, tin tức cập nhật mỗi lúc)
- ✅ Theo từng người (đăng nhập xong nhìn thấy thông tin cá nhân của bạn)
- ✅ Chức năng mạnh (tìm kiếm, bình luận, đề xuất, thanh toán đều có thể)
- ❌ Tốc độ truy cập chậm (máy chủ cần thời gian tính toán)
- ❌ Áp lực máy chủ lớn (nhiều người truy cập cùng lúc phải xếp hàng)

**Ví dụ phổ biến:** Taobao, Weibo, ngân hàng trực tuyến, tài liệu trực tuyến

**Có cần máy chủ không?** Trang động thực sự cần một cái gì đó "backend" để tạo nội dung, nhưng hình thức đa dạng:
- **Máy chủ truyền thống**: Tự mua/thuê máy chủ (ECS Aliyun, AWS EC2)
- **Serverless**: Không quản lý máy chủ, nhà cung cấp đám mây chạy code cho bạn (AWS Lambda, Aliyun Function Compute, Cloudflare Workers)
- **Gọi API bên thứ ba**: Thanh toán dùng Stripe, thời tiết dùng API khí tượng, tự không viết backend code

::: tip 💡 Kết hợp tĩnh-động
Bây giờ nhiều trang web là "hỗn hợp": phần chính là tĩnh, nhưng phần nào đó (ví dụ khu bình luận, ô tìm kiếm) là tải động. JavaScript có thể tải trang sau khi đó gọi API lấy dữ liệu, triển khai "trang tĩnh + chức năng động".
:::

### 📊 Tĩnh vs Động, so sánh rõ ràng

| | Trang tĩnh | Trang động |
|---|-----------|-----------|
| **Cách tạo** | Làm sẵn, lưu trên máy chủ | Làm ngay khi truy cập |
| **Giống cái gì** | Hàng trên kệ siêu thị | Cơm đặt ở nhà hàng |
| **Tốc độ** | Nhanh | Chậm (cần tính toán) |
| **Có thay đổi nội dung không** | Khó (phải tạo lại) | Dễ (thay đổi backend trực tiếp) |
| **Phù hợp làm gì** | Nội dung trưng bày (giới thiệu, tài liệu) | Ứng dụng tương tác (mua sắm, xã hội) |
| **Ví dụ điển hình** | Trang chủ công ty, tài liệu trợ giúp | Taobao, WeChat, ngân hàng trực tuyến |

### 🤔 Câu hỏi thường gặp

**Q: Trang tĩnh có dùng JavaScript được không?**

Dĩ nhiên! Ảnh chuyên động, menu gập lại, xác thực form các chức năng tương tác này, trang tĩnh đều làm được bằng JavaScript. Chúng tôi nói "tĩnh""động" ở đây là **nội dung trang web được chuẩn bị sẵn hay không**, với việc có tương tác hay không là hai chuyện.

**Q: Trang động nhất định phải tự mua máy chủ sao?**

Không nhất thiết. Ngoài máy chủ truyền thống, bạn còn có Serverless (cloud functions), hoặc trực tiếp gọi API bên thứ ba. Xu hướng hiện nay là "càng ít động máy chủ càng tốt" — dùng trang tĩnh + JavaScript gọi API, vừa nhanh vừa tiết kiệm chi phí.

::: tip 💡 Lưu ý quan trọng
Dù trang tĩnh hay động, **nguyên lý hiển thị trình duyệt vẫn như nhau**! Máy chủ gửi cái gì, trình duyệt hiển thị cái đó. Khác biệt chỉ là:
- Trang tĩnh: máy chủ gửi "sản phẩm thành phẩm"
- Trang động: máy chủ gửi "sản phẩm vừa làm"

Là lập trình viên frontend, bạn chủ yếu quan tâm cách trình duyệt xử lý nội dung nhận được, không phải máy chủ tạo nó.
:::

---

## 6. Tóm tắt: Một chuyến "mua sắm trực tuyến" hoàn chỉnh

::: tip 🎉 Sau khi học xong chương này, bạn nên có thể
- Giải thích quy trình hoàn chỉnh từ nhập địa chỉ web đến hiển thị trang
- Hiểu chức năng và mối quan hệ của URL, DNS, TCP, HTTP
- Biết cách trình duyệt hiển thị trang
- Phân biệt trang tĩnh và trang động
- Dùng so sánh sinh động giải thích nguyên lý trình duyệt cho người khác
:::

Hãy nhìn lại toàn bộ chuyến đi:

| Giai đoạn     | Thuật ngữ kỹ thuật | So sánh mua sắm | Nhiệm vụ cốt lõi       | Công nghệ chính                    |
| ------------- | ------------------ | --------- | --------------------- | ---------------------------------- |
| **1. Phân tích** | Phân tích URL      | Điền đơn hàng | Hiểu người mua muốn gì | Giao thức, tên miền, cổng, đường dẫn, tham số |
| **2. Truy vấn** | Truy vấn DNS       | Tra địa chỉ kho | Tìm kho giao hàng của cửa hàng | Truy vấn đệ quy/lặp, cơ chế bộ nhớ đệm |
| **3. Kết nối** | Bắt tay TCP        | Thiết lập kênh | Đảm bảo logistics thông suốt | Bắt tay ba bước, kiểm soát luồng |
| **4. Giao tiếp** | Trao đổi HTTP     | Kho giao hàng | Gửi đơn hàng và nhận hàng | Phương thức yêu cầu, mã trạng thái, trường tiêu đề |
| **5. Trưng bày** | Hiển thị trình duyệt | Mở hộp lắp ráp | Hiển thị hàng hóa | DOM, CSSOM, cây hiển thị, bố cục, vẽ |

**Toàn bộ quá trình thường xảy ra trong vài trăm mili giây** — hãy nghĩ xem điều đó tuyệt vời như thế nào!

Trình duyệt của bạn trong chưa đến 1 giây đã:

- Phân tích một địa chỉ phức tạp
- Truy vấn các máy chủ DNS phân tán trên toàn cầu
- Thiết lập kết nối đáng tin cậy với máy chủ cách xa
- Trao đổi HTTP hoàn chỉnh
- Biến mã tẻ nhạt thành hình ảnh đẹp mắt

Đó là sự kỳ diệu của Internet: **công nghệ phức tạp, trải nghiệm đơn giản**.

::: info 💡 Học tập nâng cao
Nếu bạn muốn tìm hiểu sâu hơn về một phần nào đó, có thể tham khảo:
- **Phát triển API**: [Giới thiệu API](./api-intro.md) - Học cách thiết kế và sử dụng API
- **Hiệu năng frontend**: [Tối ưu hiệu năng frontend](./frontend-performance.md) - Học cách tối ưu tốc độ tải trang
- **Hiển thị trình duyệt**: [Quy trình hiển thị trình duyệt](./browser-rendering-pipeline.md) - Tìm hiểu chi tiết quá trình hiển thị
:::

---

## 7. Bảng tra cứu thuật ngữ (Glossary)

| Thuật ngữ   | Viết tắt/Tên đầy đủ           | Giải thích đơn giản                                                        |
| ----------- | ----------------------------- | -------------------------------------------------------------------------- |
| **URL**     | Uniform Resource Locator      | **Định vị tài nguyên thống nhất**. "Địa chỉ" của trang web, nói cho trình duyệt biết tìm tài nguyên ở đâu. |
| **DNS**     | Domain Name System            | **Hệ thống tên miền**. "Danh bạ điện thoại" của Internet, chuyển đổi tên miền mà con người có thể đọc thành địa chỉ IP mà máy móc có thể đọc. |
| **Địa chỉ IP** | Internet Protocol Address     | **Địa chỉ giao thức Internet**. "Số nhà" duy nhất của mỗi thiết bị kết nối mạng, ví dụ như `192.168.1.1`. |
| **TCP**     | Transmission Control Protocol | **Giao thức kiểm soát truyền tải**. "Quy tắc" đảm bảo truyền dữ liệu đáng tin cậy, thiết lập kết nối thông qua bắt tay ba bước. |
| **HTTP**    | HyperText Transfer Protocol   | **Giao thức truyền siêu văn bản**. "Quy tắc" giao tiếp giữa trình duyệt và máy chủ. |
| **HTTPS**   | HTTP Secure                   | **HTTP an toàn**. Thêm mã hóa (TLS/SSL) dựa trên HTTP để bảo vệ dữ liệu. |
| **HTML**    | HyperText Markup Language     | **Ngôn ngữ đánh dấu siêu văn bản**. "Xương sống" của trang web, định nghĩa cấu trúc nội dung. |
| **CSS**     | Cascading Style Sheets        | **Bảng kiểu xếp tầng**. "Da" của trang web, định nghĩa giao diện nội dung. |
| **DOM**     | Document Object Model         | **Mô hình đối tượng tài liệu**. Cấu trúc cây mà trình duyệt chuyển đổi HTML thành, thuận tiện vận hành. |
| **CSSOM**   | CSS Object Model              | **Mô hình đối tượng CSS**. Cấu trúc cây mà trình duyệt chuyển đổi CSS thành. |
| **Hiển thị**| Rendering                    | Quá trình trình duyệt chuyển đổi mã thành pixel trên màn hình. |
| **RTT**     | Round Trip Time               | **Thời gian quay vòng**. Thời gian gói dữ liệu từ gửi đến nhận xác nhận, ảnh hưởng tốc độ tải trang. |

---

::: tip 🎓 Chúc mừng
Bây giờ mỗi khi bạn nhập một địa chỉ vào thanh địa chỉ và nhấn Enter, bạn đã có thể nhìn thấy thế giới kỹ thuật số đông đúc phía sau màn hình.

Bạn hiểu rõ:
- Tại sao đôi khi trang web không mở được (lỗi giải quyết DNS, máy chủ sập)
- Tại sao trang web nào nhanh, trang nào chậm (độ trễ mạng, hiệu năng máy chủ, độ phức tạp trang)
- Cách trình duyệt chuyển mã thành hình ảnh (quy trình hiển thị)

**Đó là giá trị của việc hiểu nguyên lý kỹ thuật** — khi gặp vấn đề, bạn biết từ đâu tìm nguyên nhân, thay vì bất lực.
:::
