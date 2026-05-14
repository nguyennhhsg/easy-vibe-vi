# Tên miền, DNS và HTTPS

::: tip Lời mở đầu
**Khi bạn nhập `www.google.com` vào trình duyệt và nhấn Enter, điều gì đã xảy ra ở phía sau?** Hành động tưởng như đơn giản này thực chất liên quan đến phân giải tên miền, truy vấn DNS, bắt tay TLS được mã hóa và nhiều quá trình hợp tác tinh tế khác. Hiểu biết những cơ chế này là bài học bắt buộc cho mỗi nhà phát triển — nó liên quan trực tiếp đến việc trang web của bạn có thể truy cập được hay không, và liệu dữ liệu có bị đánh cắp hay không.
:::

**Bài viết này sẽ dạy bạn những gì?**

Sau khi học xong chương này, bạn sẽ có được:

- **Nguyên lý DNS**: Hiểu quy trình hoàn chỉnh về cách tên miền được dịch thành địa chỉ IP
- **Loại bản ghi**: Nắm vững mục đích của các bản ghi DNS thông thường như A, CNAME, MX
- **Cơ chế HTTPS**: Hiểu cách bắt tay TLS thiết lập kết nối an toàn
- **Hệ thống chứng chỉ**: Tìm hiểu chuỗi tin cậy chứng chỉ số và cơ chế xác minh
- **Nhận thức bảo mật**: Hiểu tại sao HTTPS là yêu cầu nền tảng của Web hiện đại

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|----------|
| **Chương 1** | Phân giải DNS | Truy vấn đệ quy, truy vấn lặp |
| **Chương 2** | Bản ghi DNS | A, CNAME, MX, TXT |
| **Chương 3** | HTTPS và TLS | Quá trình bắt tay, giao tiếp mã hóa |
| **Chương 4** | Chuỗi tin cậy chứng chỉ | CA, chứng chỉ gốc, chứng chỉ trung gian |
| **Chương 5** | HTTP vs HTTPS | Văn bản rõ ràng vs mã hóa, so sánh bảo mật |

---

## 0. Bức tranh toàn cảnh: Từ tên miền đến kết nối an toàn

Giao tiếp trên Internet dựa trên địa chỉ IP (chẳng hạn như 142.250.80.46), nhưng con người không thể nhớ những con số này. Vì vậy, chúng tôi đã phát minh ra **Hệ thống tên miền (DNS)** — "sổ điện thoại" của Internet, dịch tên miền có thể đọc được bởi con người thành địa chỉ IP có thể đọc được bởi máy.

Nhưng chỉ tìm được máy chủ là chưa đủ. Nếu nội dung liên lạc được truyền dưới dạng văn bản rõ ràng, bất kỳ người trung gian nào cũng có thể nghe trộm và sửa đổi dữ liệu của bạn. **HTTPS** là giải pháp cho vấn đề này — nó thêm một lớp mã hóa TLS trên HTTP, đảm bảo tính bảo mật và toàn vẹn của dữ liệu trong quá trình truyền.

::: tip Một lần truy cập web hoàn chỉnh
1. **Phân giải tên miền**: Trình duyệt hỏi DNS "IP của www.google.com là bao nhiêu?", DNS trả lời "142.250.80.46"
2. **Kết nối TCP**: Trình duyệt thiết lập bắt tay ba chiều TCP với máy chủ
3. **Bắt tay TLS**: Hai bên thương lượng thuật toán mã hóa, xác minh chứng chỉ, trao đổi khóa
4. **Giao tiếp mã hóa**: Tất cả dữ liệu HTTP được truyền qua kênh được mã hóa
:::

---

## 1. Phân giải DNS: "Sổ điện thoại" của Internet

DNS (Domain Name System) hoạt động giống như tra cứu trong sổ điện thoại: bạn biết tên của người kia (tên miền), cần tìm số điện thoại của họ (địa chỉ IP). Nhưng "sổ điện thoại" của Internet không phải là một cuốn sách, mà là một hệ thống phân tán có cấp bậc.

<DnsResolutionDemo />

::: tip Bốn bước của phân giải DNS
1. **Bộ nhớ đệm trình duyệt**: Trước tiên kiểm tra bộ nhớ đệm cục bộ, nếu bạn đã truy cập tên miền này trước đó, hãy sử dụng IP được lưu vào bộ nhớ đệm trực tiếp
2. **Công cụ phân giải đệ quy**: Nếu bộ nhớ đệm miss, gửi yêu cầu đến công cụ phân giải đệ quy của ISP (chẳng hạn như 8.8.8.8)
3. **Truy vấn từng bước**: Công cụ phân giải đệ quy lần lượt yêu cầu máy chủ tên miền gốc → máy chủ tên miền cấp cao nhất (.com) → máy chủ tên miền có thẩm quyền (google.com)
4. **Trả về kết quả**: Máy chủ có thẩm quyền trả về IP cuối cùng, công cụ phân giải đệ quy lưu vào bộ nhớ đệm kết quả và trả về cho trình duyệt
:::

| Cấp bậc | Máy chủ | Trách nhiệm | Số lượng |
|--------|---------|-----------|---------|
| Tên miền gốc | Máy chủ gốc | Biết địa chỉ của tất cả các tên miền cấp cao nhất | 13 nhóm trên toàn cầu |
| Tên miền cấp cao nhất | Máy chủ TLD | Quản lý .com, .cn, .org, v.v. | Một nhóm cho mỗi hậu tố |
| Tên miền có thẩm quyền | Có thẩm quyền | Lưu trữ bản ghi DNS của tên miền cụ thể | Ít nhất 2 cho mỗi tên miền |
| Công cụ phân giải đệ quy | Công cụ phân giải | Hoàn thành toàn bộ quá trình truy vấn thay cho người dùng | ISP hoặc DNS công khai |

---

## 2. Loại bản ghi DNS: "Bảng cấu hình" đằng sau tên miền

DNS không chỉ dịch tên miền thành IP. Thông qua các loại bản ghi DNS khác nhau, bạn có thể kiểm soát phân phối email, chuyển hướng tên miền, khám phá dịch vụ và nhiều hành vi khác. Hiểu những loại bản ghi này là cơ sở để cấu hình tên miền và khắc phục sự cố mạng.

<DnsRecordTypeDemo />

| Loại bản ghi | Mục đích | Ví dụ |
|---------|---------|--------|
| A | Tên miền → Địa chỉ IPv4 | `example.com → 93.184.216.34` |
| AAAA | Tên miền → Địa chỉ IPv6 | `example.com → 2606:2800:220:1:...` |
| CNAME | Tên miền → Tên miền khác (bí danh) | `www.example.com → example.com` |
| MX | Chỉ định máy chủ email | `example.com → mail.example.com` |
| TXT | Lưu trữ thông tin văn bản | Xác minh SPF, xác minh quyền sở hữu tên miền |
| NS | Chỉ định máy chủ tên miền có thẩm quyền | `example.com → ns1.example.com` |

::: tip Cấu hình DNS trong các tình huống thực tế
- **Triển khai trang web**: Thêm bản ghi A trỏ đến IP máy chủ hoặc CNAME trỏ đến tên miền CDN
- **Cấu hình email**: Thêm bản ghi MX trỏ đến máy chủ email, cấu hình bản ghi TXT SPF/DKIM để chống spam
- **Xác minh quyền sở hữu tên miền**: Nhà cung cấp dịch vụ điện toán đám mây yêu cầu bạn thêm bản ghi TXT cụ thể để chứng minh bạn sở hữu tên miền này
- **Cân bằng tải**: Cấu hình nhiều bản ghi A cho cùng một tên miền, DNS làm tròn để phân phối lưu lượng truy cập
:::

---

## 3. HTTPS và TLS: Mặc "áo giáp chống đạn" cho dữ liệu

Dữ liệu giao thức HTTP được truyền dưới dạng văn bản rõ ràng — giống như gửi một bưu thiếp, người giao hàng (người trung gian) có thể đọc nội dung tùy tiện. HTTPS thêm một lớp mã hóa TLS (Transport Layer Security) trên HTTP, tương đương với việc bỏ bưu thiếp vào phong bì dán kín.

TLS bắt tay là bước quan trọng trong việc thiết lập kết nối an toàn, nó hoàn thành xác thực danh tính và thương lượng khóa trước khi truyền dữ liệu chính thức.

<HttpsHandshakeDemo />

::: tip Các bước cốt lõi của bắt tay TLS 1.3
1. **Client Hello**: Khách hàng gửi danh sách các thuật toán mã hóa được hỗ trợ và một số ngẫu nhiên
2. **Server Hello**: Máy chủ chọn thuật toán mã hóa, trả về chứng chỉ số và số ngẫu nhiên
3. **Xác minh chứng chỉ**: Khách hàng xác minh chứng chỉ máy chủ có đáng tin cậy hay không (kiểm tra chữ ký CA, thời hạn, khớp tên miền)
4. **Trao đổi khóa**: Hai bên thương lượng một khóa chia sẻ thông qua thuật toán ECDHE (không truyền khóa trên mạng)
5. **Giao tiếp mã hóa**: Tất cả dữ liệu tiếp theo được truyền bằng cách mã hóa với khóa đối xứng được thương lượng
:::

| Tính năng | TLS 1.2 | TLS 1.3 |
|---------|---------|---------|
| Số lần quay lại bắt tay | 2-RTT | 1-RTT (lần đầu) / 0-RTT (khôi phục) |
| Trao đổi khóa | RSA hoặc ECDHE | Chỉ ECDHE (an toàn về phía trước) |
| Thuật toán mã hóa | Hỗ trợ nhiều thuật toán cũ hơn | Chỉ giữ lại các thuật toán an toàn |
| Hiệu suất | Chậm hơn | Nhanh hơn |

---

## 4. Chuỗi tin cậy chứng chỉ: Tại sao tin tưởng trang web này?

Bước quan trọng nhất trong bắt tay TLS là "xác minh chứng chỉ". Làm thế nào trình duyệt xác định chứng chỉ của trang web là thực, chứ không phải giả mạo bởi kẻ tấn công? Câu trả lời là **chuỗi tin cậy chứng chỉ** — một hệ thống tin cậy được xác nhận từng tầng.

<CertificateChainDemo />

::: tip Cấu trúc ba tầng của chuỗi tin cậy chứng chỉ
1. **Chứng chỉ gốc (Root CA)**: Được ký bởi một cơ quan cấp chứng chỉ được tin cậy, được cài sẵn trong hệ điều hành và trình duyệt. Đây là "điểm neo" của tin tưởng.
2. **Chứng chỉ trung gian (Intermediate CA)**: Được ký bởi Root CA, được sử dụng để ký các chứng chỉ cuối cùng. Root CA không ký trực tiếp chứng chỉ trang web, để cách ly bảo mật.
3. **Chứng chỉ cuối (Leaf Certificate)**: Chứng chỉ thực tế mà trang web của bạn sử dụng, được ký bởi Intermediate CA, chứa thông tin về tên miền, khóa công khai, thời hạn, v.v.
:::

| Loại chứng chỉ | Mức xác minh | Tốc độ cấp | Tình huống áp dụng |
|---------|---------|---------|---------|
| DV (Xác minh tên miền) | Chỉ xác minh quyền sở hữu tên miền | Cấp độ phút | Trang web cá nhân, blog |
| OV (Xác minh tổ chức) | Xác minh danh tính tổ chức | Vài ngày | Trang web doanh nghiệp |
| EV (Xác minh mở rộng) | Xác minh tổ chức một cách nghiêm ngặt | Vài tuần | Ngân hàng, tổ chức tài chính |
| Chứng chỉ ký tự đại diện | Bao gồm tất cả các tên miền con | Tùy thuộc vào loại | Tình huống nhiều tên miền con |

---

## 5. HTTP vs HTTPS: Tại sao mã hóa là yêu cầu nền tảng?

Vào năm 2024, hơn 95% lưu lượng trang web toàn cầu đã được truyền qua HTTPS. Trình duyệt Chrome sẽ đánh dấu cảnh báo "không an toàn" cho các trang web HTTP, và công cụ tìm kiếm cũng sẽ giảm xếp hạng của các trang web HTTP. HTTPS không còn là một "tùy chọn", mà là yêu cầu nền tảng của Web hiện đại.

<DnsHttpsComparisonDemo />

| Khía cạnh | HTTP | HTTPS |
|---------|------|-------|
| Truyền dữ liệu | Văn bản rõ ràng, có thể nghe lén | Mã hóa, không thể nghe lén |
| Xác thực danh tính | Không, không thể xác nhận danh tính máy chủ | Có, xác minh máy chủ qua chứng chỉ |
| Toàn vẹn dữ liệu | Không có bảo vệ, có thể bị sửa đổi | Có bảo vệ, sửa đổi sẽ bị phát hiện |
| Cổng | 80 | 443 |
| Ảnh hưởng SEO | Hạ thấp xếp hạng tìm kiếm | Tăng điểm xếp hạng tìm kiếm |
| Hiệu suất trình duyệt | Hiển thị cảnh báo "không an toàn" | Hiển thị biểu tượng khóa |

::: tip Nhận chứng chỉ HTTPS miễn phí
**Let's Encrypt** là một cơ quan cấp chứng chỉ miễn phí, tự động hóa, cho phép bất kỳ trang web nào cũng có thể bật HTTPS mà không cần chi phí. Kết hợp với công cụ Certbot, bạn có thể yêu cầu và tự động gia hạn chứng chỉ chỉ bằng một cú nhấp chuột. Hầu hết các nền tảng đám mây và nhà cung cấp dịch vụ CDN cũng cung cấp chứng chỉ SSL miễn phí.
:::

---

## Tóm tắt

Tên miền, DNS và HTTPS là ba trụ cột của cơ sở hạ tầng Internet. DNS cho phép chúng ta truy cập trang web bằng những tên có thể đọc được của con người, HTTPS đảm bảo quá trình giao tiếp an toàn và đáng tin cậy.

Xem lại các điểm chính của chương này:

1. **DNS là một hệ thống phân tầng**: Miền gốc → Miền cấp cao nhất → Miền có thẩm quyền, truy vấn từng bước, tăng tốc độ bộ nhớ đệm
2. **Các loại bản ghi phục vụ các mục đích khác nhau**: Bản ghi A trỏ đến IP, CNAME tạo bí danh, MX quản lý email, TXT xác minh
3. **Bắt tay TLS thiết lập tin tưởng**: Xác minh chứng chỉ + thương lượng khóa, TLS 1.3 chỉ cần 1-RTT
4. **Chuỗi tin cậy chứng chỉ**: Root CA → Intermediate CA → Chứng chỉ cuối, xác nhận từng tầng
5. **HTTPS là yêu cầu nền tảng**: Chứng chỉ miễn phí (Let's Encrypt) làm cho mã hóa không có rào cản

## Đọc thêm

- [How DNS Works](https://howdns.works/) - Giải thích nguyên lý hoạt động của DNS dưới dạng truyện tranh
- [Let's Encrypt 文档](https://letsencrypt.org/docs/) - Hướng dẫn yêu cầu chứng chỉ SSL miễn phí
- [Cloudflare Learning Center](https://www.cloudflare.com/learning/dns/what-is-dns/) - Hướng dẫn về DNS và hệ thống bảo mật mạng
- [TLS 1.3 RFC 8446](https://datatracker.ietf.org/doc/html/rfc8446) - Thông số kỹ thuật giao thức TLS 1.3
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Kiểm tra chất lượng cấu hình HTTPS của trang web trực tuyến
