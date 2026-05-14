# Giới hạn tốc độ và kiểm soát áp lực ngược

::: tip Lời dẫn
**Lúc 00:00 ngày mua sắm 11/11, hàng tỷ người dùng đổ vào cùng một lúc — máy chủ có chịu được không?** Mọi hệ thống đều có giới hạn về khả năng xử lý. Khi lượng yêu cầu vượt quá khả năng chịu đựng của hệ thống, nếu không kiểm soát, kết quả là không ai dùng được. Giới hạn tốc độ và kiểm soát áp lực ngược chính là hai lớp phòng vệ bảo vệ hệ thống khỏi bị "áp đảo".
:::

**Bài viết này sẽ dạy bạn cái gì?**

Sau khi học xong chương này, bạn sẽ có được:

- **Tính cần thiết của giới hạn tốc độ**: Hiểu tại sao cần phải chủ động từ chối một phần yêu cầu để bảo vệ hệ thống
- **Các thuật toán giới hạn tốc độ**: Nắm vững nguyên lý và điểm khác nhau của ba thuật toán cốt lõi: xô token, xô rò và cửa sổ trượt
- **Cơ chế kiểm soát áp lực ngược**: Hiểu các chiến lược xử lý khi tốc độ phía trước vượt quá phía sau
- **Giới hạn tốc độ đa lớp**: Tìm hiểu kiến trúc giới hạn tốc độ đa lớp từ client đến gateway đến dịch vụ
- **Khả năng thực hành**: Biết chọn chiến lược giới hạn tốc độ nào trong tình huống nào

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|-------------------|
| **Chương 1** | Tại sao cần giới hạn tốc độ | Hiệu ứng tuyết lở, bảo vệ dịch vụ |
| **Chương 2** | Các thuật toán giới hạn tốc độ | Xô token, xô rò, cửa sổ trượt |
| **Chương 3** | Kiểm soát áp lực ngược | Vùng đệm, chiến lược loại bỏ, mở rộng linh hoạt |
| **Chương 4** | Kiến trúc giới hạn tốc độ đa lớp | Client, gateway, máy chủ |
| **Chương 5** | Thực hành và lựa chọn | Nginx, Redis, Sentinel |

---

## 0. Toàn cảnh: Tại sao phải "từ chối" người dùng?

Điều này nghe có vẻ trái trực giác — chúng ta không nên phục vụ tốt từng người dùng sao? Nhưng thực tế là: **nếu không từ chối một phần yêu cầu, tất cả yêu cầu sẽ thất bại**.

Hãy tưởng tượng một nhà hàng chỉ có thể chứa được 100 người, đột nhiên có 1000 người ào vào. Nếu không giới hạn tốc độ, kết quả không phải là 1000 người đều có thể ăn cơm, mà là bếp sụp đổ, nhân viên phục vụ gặp áp lực, 1000 người ai cũng không ăn được. Cách làm đúng là tại cửa xếp hàng để giới hạn tốc độ, để 100 người vào trước, những người còn lại chờ đợi.

::: tip Mục tiêu cốt lõi của giới hạn tốc độ
- **Bảo vệ hệ thống**: Ngăn chặn quá tải dẫn đến dịch vụ hoàn toàn không khả dụng
- **Phân phối công bằng**: Đảm bảo các yêu cầu đã được chấp nhận có thể được xử lý bình thường
- **Giảm công năng một cách duyên dáng**: Các yêu cầu bị giới hạn nhận được mã trạng thái 429 rõ ràng, thay vì hết thời gian chờ hoặc lỗi 500
:::

---

## 1. Các thuật toán giới hạn tốc độ: Ba giải pháp cổ điển

Vấn đề cốt lõi của giới hạn tốc độ là: **Trong một đơn vị thời gian, tối đa bao nhiêu yêu cầu được phép thông qua?** Các thuật toán khác nhau có những sự đánh đổi khác nhau về độ chính xác, xử lý lưu lượng đột ngột và độ phức tạp của việc triển khai.

<RateLimitAlgorithmDemo />

| Thuật toán | Nguyên lý | Lưu lượng đột ngột | Độ chính xác | Độ phức tạp triển khai |
|-----------|---------|-------------------|------------|----------------------|
| Xô token | Phát token với tốc độ cố định, yêu cầu tiêu thụ token | Cho phép (có dự trữ trong xô) | Cao | Trung bình |
| Xô rò | Yêu cầu xếp hàng, xử lý với tốc độ cố định | Không cho phép (hoàn toàn mịn) | Cao | Trung bình |
| Cửa sổ trượt | Thống kê số yêu cầu trong cửa sổ | Cho phép một phần | Khá cao | Thấp |
| Cửa sổ cố định | Đếm theo cửa sổ thời gian | Có thể đột ngột ở ranh giới | Thấp | Thấp nhất |

::: tip Chọn thuật toán nào?
- **Giới hạn tốc độ API**: Xô token được sử dụng phổ biến nhất, cho phép lưu lượng đột ngột hợp lý
- **Định hình lưu lượng**: Xô rò thích hợp cho các tình huống cần tốc độ đầu ra không đổi
- **Đếm đơn giản**: Cửa sổ trượt dễ triển khai, thích hợp cho hầu hết các ứng dụng Web
:::

---

## 2. Kiểm soát áp lực ngược: Khi phía trước nhanh hơn phía sau

Giới hạn tốc độ giải quyết vấn đề "quá nhiều yêu cầu bên ngoài", trong khi **kiểm soát áp lực ngược (Backpressure)** giải quyết vấn đề "tốc độ các thành phần bên trong không khớp".

Khi tốc độ nhà sản xuất tạo ra dữ liệu liên tục vượt quá tốc độ người tiêu dùng xử lý dữ liệu, vùng đệm ở giữa sẽ liên tục phình to, cuối cùng dẫn đến tràn bộ nhớ hoặc mất dữ liệu. Cơ chế kiểm soát áp lực ngược cho phép người tiêu dùng "thông báo ngược" cho nhà sản xuất để giảm tốc độ.

<BackpressureDemo />

::: tip Bốn chiến lược kiểm soát áp lực ngược
1. **Loại bỏ (Drop)**: Loại bỏ dữ liệu mới hoặc cũ khi vùng đệm đầy, thích hợp cho các tình huống yêu cầu thời gian thực cao nhưng cho phép mất dữ liệu
2. **Chặn (Block)**: Để nhà sản xuất tạm dừng, chờ người tiêu dùng xử lý xong rồi tiếp tục, thích hợp cho các tình huống dữ liệu không thể mất
3. **Lấy mẫu (Sample)**: Chỉ xử lý một phần dữ liệu, thích hợp cho luồng dữ liệu tần số cao
4. **Mở rộng linh hoạt (Scale)**: Tăng động số lượng người tiêu dùng, thích hợp cho môi trường cloud-native
:::

---

## 3. Kiến trúc giới hạn tốc độ đa lớp

Trong môi trường sản xuất, giới hạn tốc độ không chỉ cần làm tại một điểm, mà cần **bảo vệ đa lớp**, mỗi lớp giải quyết vấn đề ở mức độ chi tiết khác nhau.

| Lớp | Vị trí | Mức độ chi tiết giới hạn tốc độ | Công cụ |
|----|--------|------------------------------|--------|
| Client | Frontend/App | Debounce nút, throttle yêu cầu | lodash.throttle, debounce |
| CDN/WAF | Nút biên | Mức độ IP, mức độ địa lý | Cloudflare Rate Limiting |
| API Gateway | Gateway đầu vào | Mức độ route, mức độ người dùng | Nginx limit_req, Kong |
| Máy chủ | Bên trong ứng dụng | Mức độ API, mức độ tài nguyên | Sentinel, Resilience4j |
| Cơ sở dữ liệu | Lớp lưu trữ | Số kết nối, QPS | Cấu hình connection pool, circuit breaker cho truy vấn chậm |

::: tip Tiêu chuẩn HTTP cho giới hạn tốc độ
Các yêu cầu bị giới hạn nên trả về mã trạng thái `429 Too Many Requests` và bao gồm trong header phản hồi:
- `Retry-After`: Đề xuất client thử lại sau bao lâu (số giây hoặc ngày)
- `X-RateLimit-Limit`: Giới hạn trên của giới hạn tốc độ
- `X-RateLimit-Remaining`: Hạn mức còn lại
- `X-RateLimit-Reset`: Thời gian đặt lại hạn mức
:::

---

## 4. Lựa chọn thực hành

| Tình huống | Giải pháp được đề xuất | Giải thích |
|-----------|----------------------|-----------|
| Giới hạn tốc độ đầu vào Nginx | `limit_req_zone` | Dựa trên thuật toán xô rò, cấu hình đơn giản |
| Giới hạn tốc độ phân tán | Redis + Lua script | Xô token hoặc cửa sổ trượt, chia sẻ đếm trên nhiều instance |
| Microservice Java | Sentinel / Resilience4j | Hỗ trợ circuit breaker, degradation, hot spot rate limiting |
| Node.js API | express-rate-limit | Đơn giản dễ sử dụng, hỗ trợ lưu trữ Redis |
| Dịch vụ Go | golang.org/x/time/rate | Triển khai xô token của thư viện chuẩn |

---

## Tóm tắt

Giới hạn tốc độ và kiểm soát áp lực ngược là hai lớp phòng vệ quan trọng để bảo vệ tính ổn định của hệ thống. Giới hạn tốc độ kiểm soát tốc độ luồng lưu lượng bên ngoài, kiểm soát áp lực ngược phối hợp tốc độ xử lý của các thành phần bên trong.

Ôn lại các điểm chính của chương này:

1. **Tính cần thiết của giới hạn tốc độ**: Nếu không từ chối một phần yêu cầu, tất cả yêu cầu sẽ thất bại
2. **Ba thuật toán cốt lõi**: Xô token (cho phép đột ngột), xô rò (hoàn toàn mịn), cửa sổ trượt (đơn giản chính xác)
3. **Cơ chế kiểm soát áp lực ngược**: Bốn chiến lược loại bỏ, chặn, lấy mẫu, mở rộng
4. **Bảo vệ đa lớp**: Từ client đến cơ sở dữ liệu, mỗi lớp giải quyết vấn đề ở mức độ chi tiết khác nhau
5. **Tiêu chuẩn 429**: Trả về mã trạng thái tiêu chuẩn và thông tin header giới hạn tốc độ khi bị giới hạn

## Đọc thêm

- [Thực hành giới hạn tốc độ của Stripe](https://stripe.com/blog/rate-limiters) - Thiết kế giới hạn tốc độ cho hệ thống thanh toán
- [Tài liệu Nginx limit_req](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html) - Mô-đun giới hạn tốc độ Nginx
- [Alibaba Sentinel](https://sentinelguard.io/) - Thành phần kiểm soát lưu lượng cho dịch vụ phân tán
- [Resilience4j](https://resilience4j.readme.io/) - Thư viện dung sai lỗi nhẹ cho Java
- [Giải thích chi tiết thuật toán Token Bucket](https://en.wikipedia.org/wiki/Token_bucket) - Nguyên lý toán học của thuật toán xô token
