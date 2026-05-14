# Tính Khả Dụng Cao và Khôi Phục Thảm Họa

::: tip Lời Tựa
**Hệ thống ngừng hoạt động 1 phút có thể có nghĩa là mất mất hàng chục vạn tiền.** Tính khả dụng cao (High Availability) là khả năng của hệ thống tiếp tục cung cấp dịch vụ khi gặp phải các sự cố bất thường như lỗi phần cứng, lỗi phần mềm, vấn đề mạng, v.v. Khôi phục thảm họa (Disaster Recovery) là khả năng hệ thống phục hồi dịch vụ khi xảy ra thảm họa ở quy mô lớn hơn.
:::

**Bạn sẽ học được gì từ bài viết này?**

Sau khi hoàn thành chương này, bạn sẽ nắm được:

- **Đo lường tính khả dụng**: Hiểu ý nghĩa của "bao nhiêu số 9" và thời gian ngừng hoạt động tương ứng
- **Chuyển đổi dự phòng**: Thành thạo các kiến trúc khả dụng cao như chủ-dự phòng, chủ-chủ, đa hoạt động
- **Chiến lược khôi phục thảm họa**: Hiểu khái niệm RPO và RTO và cách thiết kế
- **Phát hiện sự cố**: Hiểu các cơ chế phát hiện sự cố như nhịp đập, thăm dò, ngắt mạch
- **Kỹ thuật hỗn loạn**: Hiểu cách chủ động gây ra sự cố để xác minh khả năng phục hồi của hệ thống

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|-------------------|
| **Chương 1** | Đo lường tính khả dụng | SLA, bao nhiêu số 9, thời gian ngừng hoạt động |
| **Chương 2** | Kiến trúc chuyển đổi dự phòng | Chủ-dự phòng, chủ-chủ, đa khu vực khả dụng, đa khu vực hoạt động |
| **Chương 3** | Thiết kế khôi phục thảm họa | RPO, RTO, chiến lược sao lưu |
| **Chương 4** | Phát hiện sự cố và phục hồi | Nhịp đập, ngắt mạch, tự động mở rộng/thu hẹp |
| **Chương 5** | Kỹ thuật hỗn loạn | Gây ra sự cố, xác minh khả năng phục hồi |

---

## 1. Đo lường tính khả dụng: Bao nhiêu số 9 có ý nghĩa gì?

Tính khả dụng thường được đo lường bằng "bao nhiêu số 9", công thức tính như sau:

**Tính khả dụng = Thời gian hoạt động bình thường / Tổng thời gian × 100%**

Ví dụ, trong một tháng (30 ngày = 43.200 phút) hệ thống ngừng hoạt động 43 phút, thì tính khả dụng là (43.200 - 43) / 43.200 ≈ 99,9%. Mỗi số 9 bổ sung có nghĩa là thời gian ngừng hoạt động cho phép giảm một cấp độ, và độ phức tạp cũng như chi phí tăng theo cấp số nhân.

| Mức khả dụng | Phần trăm | Thời gian ngừng hoạt động mỗi tháng | Thời gian ngừng hoạt động mỗi năm | Yêu cầu điển hình |
|-------------|----------|----------------------------------|----------------------------------|------------------|
| 2 số 9 | 99% | 7,3 giờ | 3,65 ngày | Công cụ nội bộ |
| 3 số 9 | 99,9% | 43 phút | 8,76 giờ | Hệ thống kinh doanh bình thường |
| 4 số 9 | 99,99% | 4,3 phút | 52,6 phút | Thương mại điện tử, SaaS |
| 5 số 9 | 99,999% | 26 giây | 5,26 phút | Tài chính, thanh toán |

<AvailabilityCalculatorDemo />

::: tip SLA là gì?
**SLA (Service Level Agreement, Thỏa thuận Mức Dịch Vụ)** là cam kết chính thức giữa nhà cung cấp dịch vụ và khách hàng. Ví dụ, AWS S3 cam kết 99,99% tính khả dụng, nếu không đạt được, sẽ hoàn lại tiền theo tỷ lệ. SLA không chỉ là chỉ số kỹ thuật, nó còn là hợp đồng thương mại — vi phạm SLA có nghĩa là phải bồi thường.
:::

::: tip Khoảng cách từ 3 số 9 đến 4 số 9
3 số 9 (99,9%) có nghĩa là mỗi tháng có thể ngừng hoạt động 43 phút — khi triển khai có vấn đề, chỉ cần cuộn lại là hết thời gian cho phép.
4 số 9 (99,99%) có nghĩa là mỗi tháng chỉ có thể ngừng hoạt động 4 phút — điều này yêu cầu bạn phải có hệ thống khả dụng cao hoàn chỉnh bao gồm chuyển đổi dự phòng tự động, triển khai liên tục, kiểm tra sức khỏe, v.v.
:::

---

## 2. Kiến trúc chuyển đổi dự phòng

Chuyển đổi dự phòng (Failover) là cơ chế cốt lõi của tính khả dụng cao: khi nút chính bị hỏng, tự động chuyển sang nút dự phòng để tiếp tục cung cấp dịch vụ.

### Mô hình chủ-dự phòng (Active-Standby)

Kiến trúc khả dụng cao phổ biến nhất. Nút chính xử lý tất cả các yêu cầu, nút dự phòng đồng bộ hóa dữ liệu theo thời gian thực nhưng không xử lý yêu cầu. Khi nút chính bị hỏng, nút dự phòng tự động tiếp quản.

```
Trạng thái bình thường:
  Máy khách → Nút chính (xử lý yêu cầu)
              Nút dự phòng (đồng bộ hóa dữ liệu, chờ)

Chuyển đổi dự phòng:
  Máy khách → Nút dự phòng (tiếp quản làm nút chính mới)
              Nút chính cũ (hỏng, chờ sửa chữa)
```

Vấn đề chính là **tách não (Split Brain)**: khi phân chia mạng, cả nút chính lẫn nút dự phòng đều cho rằng nút kia đã hỏng, cùng lúc cung cấp dịch vụ bên ngoài, dẫn đến dữ liệu không nhất quán. Giải pháp là giới thiệu **nút trọng tài (Quorum)** — ít nhất 3 nút bỏ phiếu để quyết định nút nào là nút chính.

### Đa khu vực khả dụng (Multi-AZ)

Triển khai dịch vụ ở nhiều trung tâm dữ liệu (khu vực khả dụng) cùng một vùng. Mất điện hoặc mất kết nối ở một trung tâm dữ liệu không ảnh hưởng đến dịch vụ chung. Các khu vực khả dụng của nhà cung cấp đám mây thường được kết nối bằng đường chuyên biệt độ trễ thấp (< 2ms).

### Đa khu vực hoạt động (Multi-Region Active-Active)

Triển khai bản sao dịch vụ hoàn chỉnh ở các thành phố khác nhau hoặc thậm chí ở các quốc gia khác nhau, mỗi trang web đều có thể xử lý yêu cầu một cách độc lập. Đây là kiến trúc khả dụng cao ở mức cao nhất, nhưng cũng phức tạp nhất — thách thức cốt lõi là **độ trễ đồng bộ hóa dữ liệu liên khu vực** và vấn đề nhất quán.

<FailoverStrategyDemo />

| Kiến trúc | Mức khả dụng | Chi phí | Độ phức tạp | Kịch bản áp dụng |
|-----------|------------|--------|-----------|-----------------|
| Máy đơn | 99%~99,9% | Thấp | Thấp | Phát triển kiểm thử, công cụ nội bộ |
| Chủ-dự phòng | 99,9%~99,99% | Trung bình | Trung bình | Hệ thống kinh doanh cỡ vừa |
| Đa khu vực khả dụng | 99,99% | Cao | Cao | Nền tảng thương mại điện tử, SaaS |
| Đa khu vực hoạt động | 99,999% | Cực cao | Cực cao | Tài chính, công ty internet lớn |

---

## 3. Thiết kế khôi phục thảm họa: RPO và RTO

Thiết kế khôi phục thảm họa xoay quanh hai chỉ số cốt lõi:

| Chỉ số | Tên đầy đủ | Ý nghĩa | Ví dụ |
|------|-----------|--------|------|
| RPO | Recovery Point Objective | Có thể chịu được mất bao nhiêu dữ liệu | RPO=0 có nghĩa là không thể mất bất kỳ dữ liệu nào |
| RTO | Recovery Time Objective | Có thể chịu được ngừng hoạt động bao lâu | RTO=5 phút có nghĩa là phục hồi trong 5 phút |

### Mối quan hệ giữa chiến lược sao lưu và RPO

| Phương pháp sao lưu | RPO | Chi phí | Giải thích |
|-------------------|-----|--------|-----------|
| Sao lưu đầy đủ hàng ngày | 24 giờ | Thấp | Mất nhiều nhất một ngày dữ liệu |
| Sao lưu tăng dần theo thời gian thực | Cấp độ phút | Trung bình | binlog/WAL đồng bộ liên tục |
| Sao chép đồng bộ | 0 | Cao | Ghi phải chờ xác nhận từ bản sao |

::: tip Không phải tất cả dữ liệu đều cần RPO=0
Nếu ảnh đại diện người dùng bị mất, bạn có thể tải lên lại (RPO=24 giờ là đủ), nhưng hồ sơ thanh toán không được mất một bản ghi nào (RPO=0). Hãy quyết định chiến lược sao lưu dựa trên giá trị kinh doanh của dữ liệu, thay vì áp dụng một cách duy nhất.
:::

---

## 4. Phát hiện sự cố và phục hồi

### 4.1 Cơ chế phát hiện sự cố

| Cơ chế | Nguyên lý | Tốc độ phát hiện | Kịch bản áp dụng |
|------|---------|-----------------|-----------------|
| Phát hiện nhịp đập | Gửi gói nhịp đập định kỳ, xác định sự cố nếu hết thời gian chờ | Cấp độ giây | Phát hiện tồn tại của nút |
| Kiểm tra sức khỏe | Kiểm tra trạng thái dịch vụ thông qua thăm dò HTTP/TCP | Cấp độ giây | Phát hiện phía sau bộ cân bằng tải |
| Thăm dò kinh doanh | Mô phỏng các yêu cầu thực để kiểm tra logic kinh doanh | Cấp độ giây đến phút | Giám sát tính khả dụng từ đầu đến cuối |

**Cách hoạt động của phát hiện nhịp đập**: Nút A gửi một tín hiệu "tôi vẫn còn sống" đến người giám sát trong khoảng thời gian cố định (ví dụ 5 giây). Nếu liên tục không nhận được N lần nhịp đập (ví dụ 3 lần), hệ thống sẽ xác định nút A bị hỏng. Các tham số chính là **khoảng thời gian nhịp đập** và **ngưỡng thời gian chờ** — nếu khoảng thời gian quá ngắn sẽ tăng chi phí mạng, quá dài sẽ trì hoãn phát hiện sự cố.

**Ba cấp độ kiểm tra sức khỏe**:
- **Thăm dò tồn tại (Liveness)**: Tiến trình vẫn còn chạy không? Nếu không thì khởi động lại
- **Thăm dò sẵn sàng (Readiness)**: Dịch vụ có thể chấp nhận yêu cầu không? Nếu không thì loại bỏ khỏi bộ cân bằng tải
- **Thăm dò khởi động (Startup)**: Dịch vụ đã hoàn thành khởi động không? Nếu chưa thì chờ, không phán xét nhầm là sự cố

### 4.2 Cơ chế phục hồi tự động

| Cơ chế | Mô tả | Công cụ điển hình |
|------|------|-------------------|
| Khởi động lại tự động | Tự động khởi động tiến trình khi nó bị sập | systemd, PM2, K8s |
| Mở rộng/thu hẹp tự động | Tự động thêm các thực thể khi tải tăng | K8s HPA, Auto Scaling của nhà cung cấp đám mây |
| Ngắt mạch hạ cấp | Khi dịch vụ hạ lưu bị hỏng, nhanh chóng thất bại để ngăn chặn sự cố tầng tầng | Hystrix, Sentinel, Resilience4j |
| Giới hạn tốc độ | Từ chối trực tiếp các yêu cầu vượt quá dung lượng | Giới hạn limit_req của Nginx, giới hạn tốc độ cổng |

**Giải thích chi tiết mẫu ngắt mạch (Circuit Breaker)**:

Ý tưởng của bộ ngắt mạch xuất phát từ bộ ngắt điện trong mạch điện — khi dòng điện quá lớn tự động mở, bảo vệ toàn bộ mạch không bị cháy. Trong vi dịch vụ, khi dịch vụ hạ lưu bị hỏng, bộ ngắt mạch sẽ "mở", để cho yêu cầu thất bại nhanh chóng, thay vì chờ đợi hết thời gian chờ một cách ngốc nghếch.

```
Ba trạng thái của bộ ngắt mạch:

  Đóng (bình thường) → Tỷ lệ thất bại vượt ngưỡng → Mở (ngắt mạch)
       ↑                                              │
       │                                        Chờ thời gian lạnh
       │                                              ↓
       └── Yêu cầu thăm dò thành công ← Nửa mở (thăm dò)
```

- **Trạng thái đóng**: Chuyển tiếp yêu cầu bình thường, đồng thời thống kê tỷ lệ thất bại
- **Trạng thái mở**: Tất cả yêu cầu trả về lỗi ngay lập tức (thất bại nhanh chóng), không gọi đến dịch vụ hạ lưu
- **Trạng thái nửa mở**: Sau khi thời gian chờ lạnh kết thúc, cho phép một số yêu cầu thăm dò. Nếu thành công, phục hồi đóng; nếu thất bại, tiếp tục mở

**Hạ cấp (Fallback)** là chiến lược kèm theo của ngắt mạch: khi ngắt mạch được kích hoạt, thay vì báo lỗi trực tiếp, hãy trả về kết quả "để lại". Ví dụ, nếu dịch vụ gợi ý bị hỏng, hãy trả về danh sách sản phẩm nổi bật; nếu tải ảnh đại diện người dùng thất bại, hãy hiển thị ảnh mặc định.

---

## 5. Kỹ thuật hỗn loạn: Chủ động tìm kiếm vấn đề

Ý tưởng cốt lõi của kỹ thuật hỗn loạn là: **Thay vì chờ sự cố xảy ra, hãy chủ động gây ra sự cố**, xác minh khả năng phục hồi của hệ thống trong môi trường có kiểm soát.

| Công cụ | Người đề xuất | Khả năng cốt lõi |
|--------|-----------|-----------------|
| Chaos Monkey | Netflix | Chấm dứt ngẫu nhiên các thực thể ở môi trường sản xuất |
| Chaos Mesh | PingCAP | Gây ra sự cố ở môi trường K8s |
| Litmus | CNCF | Khung công tác kỹ thuật hỗn loạn đám mây gốc |
| ChaosBlade | Alibaba | Công cụ gây ra sự cố đa kịch bản |

::: tip Các bước thực hiện kỹ thuật hỗn loạn
1. **Xác định trạng thái ổn định**: Làm rõ chỉ số thể hiện hệ thống hoạt động bình thường (ví dụ độ trễ P99 < 200ms)
2. **Đưa ra giả thuyết**: Nếu một nút bị hỏng, hệ thống nên tự động phục hồi trong 30 giây
3. **Gây ra sự cố**: Tạo ra sự cố trong phạm vi có kiểm soát (trước tiên ở môi trường kiểm thử, sau đó đến sản xuất)
4. **Quan sát kết quả**: Hệ thống có phục hồi như dự kiến không? Có xảy ra sự cố tầng tầng không?
5. **Sửa chữa điểm yếu**: Sau khi phát hiện vấn đề, cải thiện kiến trúc và quy trình
:::

---

## Tóm tắt

Tính khả dụng cao không phải là một tính năng, mà là một khả năng kiến trúc. Nó cần được đảm bảo ở từng khâu từ thiết kế, phát triển, triển khai đến vận hành.

Hãy xem lại những điểm chính của chương này:

1. **Bao nhiêu số 9**: Mỗi số 9 bổ sung, thời gian ngừng hoạt động giảm một cấp độ, chi phí và độ phức tạp tăng theo cấp số nhân
2. **Chuyển đổi dự phòng**: Từ chủ-dự phòng đến đa khu vực hoạt động, chọn kiến trúc phù hợp dựa trên nhu cầu kinh doanh
3. **RPO và RTO**: Thiết kế chiến lược sao lưu và phục hồi dựa trên giá trị dữ liệu và dung sai kinh doanh
4. **Tự động hóa**: Phát hiện sự cố, khởi động lại tự động, ngắt mạch hạ cấp là cơ sở hạ tầng của tính khả dụng cao
5. **Kỹ thuật hỗn loạn**: Chủ động gây ra sự cố, xác minh khả năng phục hồi của hệ thống trong môi trường có kiểm soát

## Đọc thêm

- [Site Reliability Engineering](https://sre.google/sre-book/table-of-contents/) - Kinh điển SRE của Google
- [Chaos Monkey](https://netflix.github.io/chaosmonkey/) - Công cụ kỹ thuật hỗn loạn của Netflix
- [Release It!](https://pragprog.com/titles/mnee2/release-it-second-edition/) - Mẫu thiết kế môi trường sản xuất
- [Chaos Mesh](https://chaos-mesh.org/) - Nền tảng kỹ thuật hỗn loạn K8s
