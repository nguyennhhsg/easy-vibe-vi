# Cân bằng tải và Gateway
::: tip 🎯 Câu hỏi cốt lõi
**Khi một máy chủ đơn lẻ không thể chịu được lưu lượng truy cập, làm thế nào để phân phối luồng dữ liệu "thông minh" tới nhiều phiên bản máy chủ?** Cân bằng tải là "nhân viên phân phối" của hệ thống phân tán hiện đại. Bài viết này sẽ giúp bạn hiểu sâu về triết lý thiết kế và thực hành kỹ thuật cân bằng tải thông qua các ví dụ thực tế (quầy thu ngân trà sữa, phân loại bưu chính, điều khiển giao thông).
:::

---

## 1. Tại sao cần "cân bằng tải"?

### 1.1 Bắt đầu từ một ví dụ thực tế: Quá trình phát triển kiến trúc của một trang web

Một công ty khởi nghiệp gặp phải những vấn đề hiệu suất nghiêm trọng khi lượng người dùng tăng nhanh chóng:

**Tái hiện tình huống:**

```
Giai đoạn một: Một máy chủ đơn lẻ
Người dùng → Máy chủ (1 nhân CPU, 2GB RAM)
         ↓
  Người dùng hoạt động hàng ngày: 1000 → 1000 người truy cập đồng thời trong thời gian hoạt động
         ↓
Vấn đề: CPU 100%, thời gian phản hồi chậm, thường xuyên gặp sự cố
```

::: warning ⚠️ Vấn đề chết người của máy chủ đơn lẻ

- **Nút thắt hiệu suất**: CPU 100%, thời gian phản hồi > 5 giây
- **Lỗi điểm đơn**: Máy chủ gặp sự cố, toàn bộ trang web không khả dụng
- **Khó mở rộng**: Chỉ có thể nâng cấp theo chiều dọc (thêm CPU, bộ nhớ), tốn kém và có giới hạn
  :::

**Kiến trúc cải tiến (áp dụng cân bằng tải):**

```
Giai đoạn hai: Nhiều máy chủ + Cân bằng tải
Người dùng → Bộ cân bằng tải (Nginx)
         ↓
       ├→ Máy chủ 1 (1 nhân CPU, 2GB RAM)
       ├→ Máy chủ 2 (1 nhân CPU, 2GB RAM)
       └→ Máy chủ 3 (1 nhân CPU, 2GB RAM)
```

::: tip ✨ Hiệu quả sau khi cải tiến

- **Cải thiện hiệu suất**: 3 máy chủ xử lý song song, thời gian phản hồi < 1 giây
- **Tính khả dụng cao**: 1 máy chủ gặp sự cố, những máy chủ khác tiếp tục phục vụ
- **Mở rộng theo chiều ngang**: Cần nhiều hiệu suất hơn? Chỉ cần thêm máy chủ
  :::

### 1.2 Phép ẩn dụ thực tế về cân bằng tải

**Quầy thu ngân trà sữa**

Hãy tưởng tượng bạn mở một quán trà sữa nổi tiếng:

- **1 quầy thu ngân**: Khách xếp hàng, người đứng sau chán nản, đánh giá xấu
- **3 quầy thu ngân**: Nhân viên phân bổ khách tới từng quầy, hiệu suất tăng 3 lần

**Cân bằng tải chính là "nhân viên phân bổ quầy"**:

- **Người dùng** (khách hàng) → Yêu cầu dịch vụ
- **Bộ cân bằng tải** (nhân viên phân bổ) → Phân phối yêu cầu tới các máy chủ khác nhau
- **Máy chủ** (quầy thu ngân) → Xử lý yêu cầu

<LoadBalancerTypesDemo />

---

## 2. Cân bằng tải là gì?

### 2.1 Cân bằng tải tầng bốn (L4): Chỉ xem số nhà

**Hoạt động ở tầng vận chuyển (TCP/UDP)**, giống như shipper chỉ xem **số nhà (địa chỉ IP + cổng)** của bạn, không quan tâm nhà bạn làm gì.

**Đặc điểm:**

- **Tốc độ siêu nhanh**: Chỉ thực hiện chuyển tiếp địa chỉ đơn giản, không phân tích nội dung gói dữ liệu
- **Tình huống áp dụng**: Kết nối cơ sở dữ liệu, bộ nhớ cache Redis, máy chủ trò chơi kết nối dài
- **Sản phẩm đại diện**: LVS (Linux Virtual Server), AWS NLB, Azure Load Balancer

::: details Nguyên lý hoạt động

```
Yêu cầu từ khách hàng → Bộ cân bằng tải L4 → Máy chủ backend
              ↓
         Chỉ xem IP + Port
              ↓
         Chuyển tiếp nhanh (không phân tích nội dung gói)
```

:::

### 2.2 Cân bằng tải tầng bảy (L7): Kiểm tra nội dung gói

**Hoạt động ở tầng ứng dụng (HTTP/HTTPS)**, giống như shipper không chỉ xem số nhà, mà còn **mở gói kiểm tra nội dung**, dựa vào nội dung quyết định cách giao hàng.

**Đặc điểm:**

- **Định tuyến thông minh**: Có thể thực hiện định tuyến tinh tế dựa trên đường dẫn URL, HTTP header, Cookie, v.v.
- **Chức năng nâng cao**: Giảm tải SSL, bộ nhớ cache nội dung, nén, WAF bảo mật
- **Tình huống áp dụng**: Ứng dụng web, gateway API, kiến trúc microservice
- **Sản phẩm đại diện**: Nginx, HAProxy, AWS ALB, Envoy

::: details Nguyên lý hoạt động

```
Yêu cầu từ khách hàng → Bộ cân bằng tải L7 → Phân tích nội dung HTTP
              ↓
         Kiểm tra URL, Header, Cookie
              ↓
         Định tuyến thông minh tới máy chủ cụ thể
```

:::

### 2.3 So sánh L4 vs L7 một cách toàn diện

| Khía cạnh | Cân bằng tải bốn (L4) | Cân bằng tải bảy (L7) |
| :--- | :--- | :--- |
| **Tầng hoạt động** | Tầng vận chuyển (TCP/UDP) | Tầng ứng dụng (HTTP/HTTPS) |
| **Cơ sở quyết định** | Địa chỉ IP + cổng | URL, Header, Cookie, Body |
| **Tốc độ xử lý** | Cực nhanh (xử lý trong kernel) | Khá nhanh (phân tích ở user space) |
| **Độ giàu có chức năng** | Chuyển tiếp cơ bản | Giảm tải SSL, bộ nhớ cache, nén, WAF |
| **Tình huống điển hình** | Cơ sở dữ liệu, trò chơi, kết nối dài | Ứng dụng web, gateway API, microservice |
| **Sản phẩm đại diện** | LVS, AWS NLB | Nginx, HAProxy, AWS ALB |

---

## 3. Câu hỏi cốt lõi một: Làm thế nào để tránh "máy chủ hỏng" tiếp tục tiếp khách?

### 3.1 Kiểm tra sức khỏe: Đừng để máy chủ "bị bệnh" kéo cả hệ thống xuống

Hãy tưởng tượng, quầy thu ngân của bạn bỗng nhiên hỏng, nhưng nhân viên phân bổ không biết, vẫn liên tục phân bổ khách hàng tới đó. Kết quả là hàng ngày tăng dần, khách hàng phàn nàn. 

**Kiểm tra sức khỏe (Health Check) chính là "canh gác" để ngăn chặn tình huống này.** Nó định kỳ "thăm khám" từng máy chủ, phát hiện máy chủ "bị bệnh" thì lập tức loại bỏ khỏi danh sách, chờ "hồi phục" rồi mới đưa lại vào.

<!-- <HealthCheckDemo /> -->

### 3.2 Kiểm tra sức khỏe chủ động vs kiểm tra sức khỏe bị động

**Kiểm tra sức khỏe chủ động (Active Health Check)**: Bộ cân bằng tải chủ động "gõ cửa" hỏi máy chủ "bạn còn ở đây không?"

- Định kỳ gửi yêu cầu kiểm tra (chẳng hạn HTTP /health, TCP ping)
- Nếu timeout hoặc trả về mã lỗi, coi như không lành mạnh
- **Ưu điểm**: Kết quả kiểm tra chính xác và đáng tin cậy
- **Nhược điểm**: Tạo ra lưu lượng kiểm tra bổ sung

**Kiểm tra sức khỏe bị động (Passive Health Check)**: Bộ cân bằng tải "quan sát" tình huống phản hồi của luồng lưu lượng kinh doanh thực tế

- Thống kê thời gian phản hồi và tỷ lệ lỗi của yêu cầu thực tế
- Nếu liên tục thất bại nhiều lần, coi như không lành mạnh
- **Ưu điểm**: Không tạo lưu lượng kiểm tra bổ sung
- **Nhược điểm**: Cần đủ mẫu dữ liệu luồng để xác định

::: details Bảng thiết lập ngưỡng
| Chỉ số | Ngưỡng lành mạnh | Ngưỡng không lành mạnh | Giải thích |
|:---|:---|:---|:---|
| **Mã trạng thái HTTP** | 200-399 | 400+ hoặc timeout | 4xx/5xx đều coi là thất bại |
| **Kết nối TCP** | Kết nối thành công | Timeout kết nối | Kiểm tra liệu cổng có khả dụng |
| **Thời gian phản hồi** | < 500ms | > 2000ms | Thời gian timeout thường đặt là 2-5 giây |
| **Số lần thất bại liên tục** | - | 3 lần | Tránh kết luận sai do dao động đơn lần |
| **Khoảng thời gian kiểm tra** | - | 5 giây | Quá thường xuyên sẽ tăng tải |

::: tip 💡 Bẫy: Ngưỡng thiết lập quá "nhạy cảm"
Một nhóm đã đặt ngưỡng thời gian phản hồi kiểm tra sức khỏe ở 100ms, trong khi thời gian phản hồi trung bình của ứng dụng dao động trong khoảng 80-120ms. Kết quả là máy chủ thường xuyên bị đánh dấu là "không lành mạnh", dẫn tới luồng dữ liệu dao động liên tục giữa lành mạnh và không lành mạnh, khiến tính khả dụng chung của hệ thống giảm xuống.

**Cách làm đúng**: Ngưỡng nên đặt ở **2-3 lần thời gian phản hồi P99**, tạo ra đủ không gian đệm cho dao động bình thường.
:::

---

## 4. Câu hỏi cốt lõi hai: Làm thế nào để đảm bảo "khách cũ" luôn tìm cùng một "nhân viên"?

### 4.1 Duy trì phiên: Để "khách cũ" luôn tìm cùng một "nhân viên"

Hãy tưởng tượng bạn là khách quen của quán trà sữa, lần nào tới cũng được một nhân viên phục vụ. Cô ấy biết bạn thích nửa đường, không đá, phục vụ vừa nhanh vừa tâm lý. Nhưng nếu lần nào tới đều gặp một người mới, bạn phải lặp lại yêu cầu, hiệu suất giảm đáng kể.

**Duy trì phiên (Session Persistence/Sticky Session)** chính là giải pháp cho vấn đề này: đảm bảo yêu cầu của cùng một người dùng luôn được định tuyến tới cùng một máy chủ backend.

<SessionPersistenceDemo />

### 4.2 So sánh ba cơ chế duy trì phiên

| Cơ chế | Nguyên lý thực hiện | Ưu điểm | Nhược điểm | Tình huống áp dụng |
| :--- | :--- | :--- | :--- | :--- |
| **Chèn Cookie** | LB chèn Cookie vào phản hồi, yêu cầu sau sẽ mang theo Cookie này | Không bị ảnh hưởng bởi thay đổi IP, có thể duy trì từ yêu cầu đầu tiên | Cần hỗ trợ Cookie ở phía khách, có thể bị tắt | Giỏ hàng trang thương mại, duy trì trạng thái đăng nhập |
| **Băm IP** | Thực hiện tính toán băm IP của khách hàng, ánh xạ tới máy chủ cụ thể | Không cần hỗ trợ ở phía khách, không trạng thái | Nếu IP thay đổi sẽ mất phiên, khó phân bổ đều | Môi trường không có Cookie, WebSocket |
| **Bảng phiên dính** | LB duy trì bảng ánh xạ phiên tới máy chủ | Hỗ trợ sao chép phiên và chuyển đổi dự phòng | Chiếm dụng bộ nhớ LB, cần đồng bộ thêm | Tình huống yêu cầu tính khả dụng cao |

::: tip 💡 Gợi ý sử dụng

- **Chèn Cookie**: Khuyên dùng trước tiên, khả năng tương thích tốt
- **Băm IP**: Chỉ dùng cho tình huống WebSocket và các trường hợp đặc biệt
- **Bảng phiên dính**: Kết hợp với Cookie, cung cấp khả năng chuyển đổi dự phòng
  :::

---

## 5. Câu hỏi cốt lõi ba: Làm thế nào để triển khai không ngừng dịch vụ?

### 5.1 Triển khai xanh-đỏ: "Chuyển đổi một nút" không ngừng dịch vụ

**Ý tưởng cốt lõi**: Duy trì đồng thời hai môi trường sản xuất hoàn toàn giống hệt (môi trường xanh và môi trường đỏ), nhưng chỉ một môi trường phục vụ người dùng.

<BlueGreenDeploymentDemo />

**Quy trình làm việc:**

1. **Trạng thái ban đầu**: Môi trường xanh chạy v1.0 (sản xuất), môi trường đỏ chờ sẵn.
2. **Triển khai phiên bản mới**: Triển khai v1.1 lên môi trường đỏ, thực hiện kiểm tra cơ bản nội bộ.
3. **Chuyển đổi lưu lượng**: Chỉ định bộ cân bằng tải tới môi trường đỏ, chuyển đổi lưu lượng tức thì tới v1.1.
4. **Theo dõi quan sát**: Quan sát tình trạng chạy của môi trường đỏ, đảm bảo không có bất thường.
5. **Giữ phiên bản cũ**: Môi trường xanh giữ v1.0 một khoảng thời gian (chẳng hạn 24 giờ), làm bảo hiểm để hoàn nguyên nhanh.

::: tip ✨ Phân tích ưu và nhược điểm
| Ưu điểm | Nhược điểm |
|:---|:---|
| ✅ Không có thời gian ngừng dịch vụ, chuyển đổi trong vài mili giây | ❌ Chi phí tài nguyên cao, cần duy trì hai môi trường |
| ✅ Hoàn nguyên nhanh, phát hiện vấn đề lập tức quay lại môi trường cũ | ❌ Cần xử lý riêng khả năng tương thích khi thay đổi lược đồ cơ sở dữ liệu |
| ✅ Môi trường mới có thể kiểm tra hoàn toàn rồi mới tiếp quản luồng | ❌ Không phù hợp với dịch vụ có trạng thái (như kết nối dài WebSocket) |

:::

### 5.2 Phát hành Canary: Chiến lược phát hành xám "bước nhỏ, nhanh chóng"

Phát hành Canary được đặt tên theo "chim Canary của mỏ than" trong lịch sử — khai thác mỏ đem theo chim Canary xuống hầm, nếu chim Canary bị bất thường, chứng tỏ có khí độc rò rỉ, khai thác mỏ lập tức sơ tán. Trong phát triển phần mềm, phát hành Canary chính là để một nhóm người dùng nhỏ dùng phiên bản mới trước, quan sát không có vấn đề rồi mới mở rộng dần dần.

<CanaryReleaseDemo />

**Ý tưởng cốt lõi:**

1. **Luồng nhỏ tiên hành**: Trước tiên chỉ định tuyến 1% luồng tới máy chủ phiên bản mới.
2. **Quan sát chỉ số**: Liên tục theo dõi tỷ lệ lỗi, độ trễ, chỉ số kinh doanh quan trọng.
3. **Mở rộng dần dần**: Nếu mọi thứ bình thường, dần dần nâng tỷ lệ lên 5%, 10%, 25%, 50%, 100%.
4. **Hoàn nguyên nhanh**: Một khi phát hiện bất thường, lập tức chuyển tất cả luồng về phiên bản cũ.

::: tip 💡 Ưu điểm của phát hành Canary
| Ưu điểm | Giải thích |
|:---|:---|
| 🎯 **Rủi ro có thể kiểm soát** | Ngay cả phiên bản mới có Bug nghiêm trọng, cũng chỉ ảnh hưởng đến một số ít người dùng |
| 📊 **Xác thực thực tế** | Xác thực trong môi trường sản xuất thực tế, đáng tin cậy hơn môi trường kiểm tra |
| 🚀 **Lặp lại nhanh chóng** | Nhóm có thể tự tin phát hành tính năng mới thường xuyên hơn |
| 💰 **Thân thiện với tài nguyên** | Không cần như triển khai xanh-đỏ phải chuẩn bị hai môi trường hoàn chỉnh |

:::

---

## 6. Câu hỏi cốt lõi bốn: Làm thế nào để hệ thống tự "thở"?

### 6.1 Tự động mở rộng-thu hẹp: Để hệ thống "sắp xếp ca" linh hoạt như nhà hàng

Hãy tưởng tượng bạn mở một nhà hàng:

- **Thời cao điểm trưa**: Cần 10 nhân viên phục vụ, nhưng 3 giờ chiều nhàn rỗi chỉ cần 2 người
- Nếu luôn duy trì 10 người: Chi phí nhân sự bao vây
- Nếu luôn chỉ có 2 người: Cao điểm khách chờ lâu, hết khách

**Tự động mở rộng-thu hẹp (Auto Scaling)** chính là để hệ thống "sắp xếp ca" linh hoạt như nhà hàng — bận thì tự động thêm máy chủ, nhàn thì tự động bớt máy chủ.

<AutoScalingDemo />

### 6.2 Lựa chọn chỉ số tự động mở rộng-thu hẹp

Trọng tâm của tự động mở rộng-thu hẹp là trả lời một câu hỏi: **Khi nào nên thêm máy? Khi nào nên bớt máy?**

Chỉ số quyết định phổ biến:

| Chỉ số | Ngưỡng mở rộng | Ngưỡng thu hẹp | Tình huống áp dụng |
| :--- | :--- | :--- | :--- |
| **Sử dụng CPU** | > 70% | < 30% | Ứng dụng tính toán yoyo |
| **Sử dụng bộ nhớ** | > 75% | < 40% | Ứng dụng tính toán bộ nhớ |
| **QPS (yêu cầu mỗi giây)** | > 1000/s | < 400/s | Gateway API, dịch vụ web |
| **Số lượng kết nối** | > 5000 | < 1000 | Cơ sở dữ liệu, hàng chờ tin nhắn |
| **Chỉ số kinh doanh tùy chỉnh** | tùy theo kinh doanh | tùy theo kinh doanh | Tình huống kinh doanh cụ thể |

::: tip 💡 "Bẫy" và "Giải pháp" của chiến lược mở rộng

**Bẫy 1: Phản ứng mở rộng quá chậm, lũ lưu lượng đã đập sập hệ thống**

Trong lúc khuyến mãi lớn, một sàn TMĐT thiết lập CPU > 80% để kích hoạt mở rộng, nhưng theo dõi có độ trễ 1 phút, phiên bản mới khởi động cần 3 phút. Kết quả lưu lượng đến quá nhanh, mở rộng chưa hoàn tất, máy chủ đã bị đập sập.

**Giải pháp:**

- **Mở rộng sớm**: Dựa vào dữ liệu lịch sử dự báo đỉnh lưu lượng, bắt đầu mở rộng sớm 30 phút
- **Ngưỡng nhiều cấp**: Đặt 60% cảnh báo (bắt đầu sưởi nóng phiên bản mới), 70% mở rộng chính thức, 80% mở rộng khẩn cấp
- **Mở rộng nhanh**: Sử dụng triển khai container, phiên bản mới khởi động trong 30 giây (so với máy ảo 3-5 phút)

**Bẫy 2: Mở rộng quá tích cực, chi phí bao vây**

Một công ty khởi nghiệp thiết lập chiến lược mở rộng tích cực: CPU > 50% sẽ mở rộng. Kết quả một dao động kinh doanh bình thường đã kích hoạt mở rộng, số máy chủ từ 5 chiếc膨 phồng lên 30 chiếc, cuối tháng đơn hóa đơn đám mây khiến CTO khóc.

**Giải pháp:**

- **Đặt thời gian chờ mở rộng**: Sau mỗi lần mở rộng, phải chờ ít nhất 5 phút mới mở rộng lại
- **Đặt số phiên bản tối đa**: max = phiên bản hiện tại × 2, ngăn chặn膨 phồng vô hạn
- **Phân biệt xung và xu hướng**: Chỉ khi liên tục 3 chu kỳ vượt ngưỡng mới mở rộng, tránh xung đơn lần kích hoạt

**Bẫy 3: Thu hẹp quá nhanh, máy vừa mở rộng lập tức thu hẹp**

Một nhóm thiết lập CPU < 30% để thu hẹp. Sau mở rộng, luồng vẫn còn tiêu thụ, CPU tạm thời giảm xuống 25%, kích hoạt thu hẹp. Vừa thu hẹp xong, CPU lại bắn lên 80%, lại kích hoạt mở rộng — hệ thống trong tình trạng "mở rộng-thu hẹp-mở rộng" điên loạn.

**Giải pháp:**

- **Thu hẹp bảo thủ hơn**: Ngưỡng mở rộng 70%, ngưỡng thu hẹp 25%, có đủ vùng đệm giữa hai cái
- **Thời gian chờ thu hẹp dài hơn**: Sau mở rộng, phải chờ ít nhất 10 phút mới thu hẹp
- **Thu hẹp từng bước**: Mỗi lần chỉ thu hẹp 1 máy, quan sát rồi quyết định có tiếp tục thu hẹp không
  :::

---

## 7. Thực hành: Làm thế nào chọn bộ cân bằng tải?

### 7.1 So sánh các bộ cân bằng tải chính

| Tính năng | Nginx | HAProxy | Envoy | Cân bằng tải nhà cung cấp đám mây |
| --- | --- | --- | --- | --- |
| **Định vị** | Máy chủ proxy đảo ngược/cân bằng tải hiệu suất cao | Bộ cân bằng tải mã nguồn mở | Proxy gốc đám mây | Cân bằng tải được quản lý |
| **Hiệu suất** | Cực cao (C, điều khiển sự kiện) | Cao (điều khiển sự kiện) | Cao (C++/Rust) | Cực cao |
| **Độ giàu có chức năng** | Cân bằng tải cơ bản, tệp tĩnh, bộ nhớ cache | Thuật toán cân bằng tải giàu có | Định tuyến nâng cao, quan sát | Chức năng toàn diện |
| **Cấu hình** | Tệp cấu hình (nginx.conf) | Tệp cấu hình (haproxy.cfg) | API/tệp cấu hình | Giao diện điều khiển |
| **Mở rộng** | Mô-đun C/kịch bản Lua | Kịch bản Lua | WASM/Bộ lọc | Trình cắm |
| **Tình huống áp dụng** | Tài nguyên tĩnh, cân bằng tải bảy, kết thúc SSL | Cân bằng tải bảy, tính khả dụng cao | Lưới dịch vụ, đám mây đa | Bắt đầu nhanh |

::: tip 💡 Gợi ý lựa chọn
**Cây quyết định:**

```
Chọn bộ cân bằng tải:
│
├─ Chỉ cần cân bằng tải bốn cơ bản?
│  ├─ Có → LVS (mã nguồn mở miễn phí) hoặc NLB nhà cung cấp đám mây
│  └─ Không → Tiếp tục
│
├─ Cần lưới dịch vụ, triển khai đám mây đa?
│  ├─ Có → Envoy
│  └─ Không → Tiếp tục
│
├─ Cần cấu hình và trình cắm cực kỳ phức tạp?
│  ├─ Có → HAProxy
│  └─ Không → Tiếp tục
│
├─ Cần hiệu suất cao + cấu hình đơn giản?
│  ├─ Có → Nginx (lựa chọn hàng đầu)
│  └─ Tiếp tục
│
├─ Muốn quản lý được vận hành?
│  ├─ Có → Cân bằng tải nhà cung cấp đám mây (AWS ALB, Aliyun SLB)
│  └─ Nginx tự xây dựng
```

:::

---

## 8. Tóm tắt: Tư duy cốt lõi về cân bằng tải

### 8.1 Ôn lại các nguyên tắc cốt lõi

| Nguyên tắc | Hàm ý | Điểm thực hành |
| --- | --- | --- |
| **Phân tầng** | L4 xử lý "phân loại bưu chính" (nhanh nhưng đơn giản) | L4 xử lý cơ sở dữ liệu, trò chơi; L7 xử lý Web, API |
| **Dự phòng** | Lỗi điểm đơn là kẻ thù của kiến trúc | Nâng cao tính khả dụng thông qua triển khai nhiều phiên bản, nhiều vùng |
| **Dần dần** | Phát hành phiên bản mới đừng "cắt một nước" | Triển khai xanh-đỏ không ngừng; Canary không rủi ro |
| **Đàn hồi** | Hệ thống nên "thở" như một sinh vật | Thêm máy khi bận, bớt máy khi nhàn |

### 8.2 Danh sách kiểm tra thiết kế

Trước khi áp dụng cân bằng tải, hãy tự hỏi các câu hỏi sau:

- [ ] Có thật sự cần cân bằng tải không? (Hiệu suất máy đơn lẻ có thật không đủ?)
- [ ] Chọn L4 hay L7? (Tùy theo tình huống kinh doanh)
- [ ] Cách xử lý duy trì phiên? (Cookie, băm IP, bảng phiên)
- [ ] Cách thực hiện kiểm tra sức khỏe? (Chủ động, bị động, thiết lập ngưỡng)
- [ ] Cách thực hiện không ngừng dịch vụ? (Xanh-đỏ, Canary)
- [ ] Cách thực hiện đàn hồi? (Chỉ số mở rộng, thời gian chờ, số phiên bản tối đa)

---

## 9. Bảng tra cứu tên thuật ngữ

| Tên thuật ngữ | Tiếng Anh | Giải thích |
| --- | --- | --- |
| **Bộ cân bằng tải** | Load Balancer | Thiết bị hoặc phần mềm phân phối lưu lượng tới nhiều máy chủ backend |
| **Cân bằng tải bốn** | L4 Load Balancing | Cân bằng tải dựa trên tầng vận chuyển (TCP/UDP) |
| **Cân bằng tải bảy** | L7 Load Balancing | Cân bằng tải dựa trên tầng ứng dụng (HTTP/HTTPS) |
| **Kiểm tra sức khỏe** | Health Check | Cơ chế kiểm tra định kỳ tình trạng sức khỏe của máy chủ backend |
| **Duy trì phiên** | Session Persistence | Đảm bảo yêu cầu của cùng một người dùng luôn được định tuyến tới cùng một máy chủ |
| **Phiên dính** | Sticky Session | Cách gọi khác, tương tự Session Persistence |
| **Triển khai xanh-đỏ** | Blue-Green Deployment | Chiến lược phát hành không ngừng dịch vụ bằng cách chuyển đổi giữa hai môi trường |
| **Phát hành Canary** | Canary Release | Chiến lược phát hành phân bổ xám, để nhóm người dùng nhỏ thử trước |
| **Tự động mở rộng-thu hẹp** | Auto Scaling | Tự động tăng hoặc giảm số lượng máy chủ dựa trên tải |
| **Mở rộng theo chiều ngang** | Horizontal Scaling | Tăng số lượng máy chủ để nâng cao khả năng xử lý |
| **Mở rộng theo chiều dọc** | Vertical Scaling | Nâng cao cấu hình máy đơn lẻ (CPU, bộ nhớ) để nâng cao khả năng xử lý |
| **Nhiều vùng** | Multi-Region | Triển khai dịch vụ trên nhiều vùng địa lý |
| **Nhiều hoạt động** | Active-Active | Nhiều vùng cùng phục vụ người dùng |
| **Chủ-dự phòng** | Active-Standby | Chỉ một vùng phục vụ, những vùng khác chờ sẵn |
| **Sao chép dữ liệu** | Data Replication | Cơ chế sao chép dữ liệu giữa nhiều vùng |
| **RTO** | Recovery Time Objective (RTO) | Mục tiêu thời gian phục hồi, hệ thống cần phục hồi trong bao lâu sau sự cố |
| **RPO** | Recovery Point Objective (RPO) | Mục tiêu điểm phục hồi, hệ thống sau sự cố có thể chấp nhận mất dữ liệu bao nhiêu |
