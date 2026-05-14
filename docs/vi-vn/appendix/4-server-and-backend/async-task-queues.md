# Hàng đợi tác vụ không đồng bộ và mô hình sản xuất-tiêu thụ

::: tip Lời mở đầu
**Người dùng nhấp nút "Xuất báo cáo", rồi chờ vòng tải lên trong 30 giây——điều này hợp lý không?** Khi một thao tác mất vài giây thậm chí vài phút để hoàn thành, để người dùng chỉ chờ đợi rõ ràng không phải là trải nghiệm tốt. Hàng đợi tác vụ không đồng bộ chính là mô hình kiến trúc cốt lõi để giải quyết vấn đề này——đưa các thao tác tốn thời gian vào xử lý nền, cho phép người dùng nhận phản hồi ngay lập tức.
:::

**Bạn sẽ học được gì từ bài viết này?**

Sau khi hoàn thành chương này, bạn sẽ thu được:

- **So sánh đồng bộ và không đồng bộ**：Hiểu tại sao một số thao tác phải được không đồng bộ hóa, và cách không đồng bộ hóa mang lại cải thiện trải nghiệm người dùng
- **Mô hình sản xuất-tiêu thụ**：Nắm vững tư tưởng cốt lõi của mô hình Producer-Consumer và quy trình làm việc
- **Cơ chế Worker pool**：Hiểu cách các tác vụ được phân phối đến nhiều Worker để xử lý song song
- **Bảo đảm độ tin cậy**：Nắm vững các cơ chế như thử lại tác vụ, tính chất lũy đẳng, hàng đợi tin nhắn chết, v.v.
- **Khả năng lựa chọn kỹ thuật**：Hiểu các đặc điểm và các tình huống áp dụng của các framework tác vụ không đồng bộ chính

| Chương | Nội dung | Khái niệm cốt lõi |
|-----|------|---------|
| **Chương 1** | Tại sao cần không đồng bộ | Đồng bộ chặn vs Không đồng bộ không chặn |
| **Chương 2** | Mô hình sản xuất-tiêu thụ | Producer、Queue、Consumer |
| **Chương 3** | Worker pool | Xử lý đồng thời, phân phối tác vụ |
| **Chương 4** | Bảo đảm độ tin cậy | Chiến lược thử lại, tính chất lũy đẳng, hàng đợi tin nhắn chết |
| **Chương 5** | Lựa chọn framework | Celery、Sidekiq、Bull、RQ |

---

## 0. Toàn cảnh: Tại sao không thể để người dùng chỉ chờ đợi?

Hãy tưởng tượng bạn đi đến nhà hàng để đặt hàng. Một nhà hàng tốt sẽ cấp cho bạn một số lấy thức ăn ngay sau khi bạn đặt hàng, sau đó bạn có thể tìm chỗ ngồi, chơi điện thoại, và quay lại nhận khi thức ăn sẵn sàng. Thay vì để bạn đứng ở quầy, chỉ nhìn đầu bếp hoàn thành cả món ăn.

Có rất nhiều thao tác tương tự như "nấu ăn" trong ứng dụng Web:

- **Gửi email/tin nhắn văn bản**：Gọi API của bên thứ ba, có thể mất vài giây
- **Tạo báo cáo/PDF**：Tính toán dữ liệu lớn, có thể mất vài chục giây
- **Xử lý hình ảnh/video**：Nén, chuyển mã, thêm hình mờ, có thể mất vài phút
- **Đồng bộ dữ liệu**：Đồng bộ dữ liệu giữa các hệ thống, thời gian không chắc chắn

::: tip Ý tưởng cốt lõi của tác vụ không đồng bộ
Tách các thao tác tốn thời gian khỏi luồng chính "yêu cầu-phản hồi", đưa vào hàng đợi nền để xử lý không đồng bộ. Sau khi người dùng gửi yêu cầu, họ ngay lập tức nhận được phản hồi "Đã nhận, đang xử lý", và sau khi xử lý hoàn thành, kết quả được thông báo qua thông báo, thăm dò, hoặc WebSocket.
:::

---

## 1. Đồng bộ vs Không đồng bộ: Câu chuyện của một đơn hàng

Khi người dùng gửi một đơn hàng, backend cần làm rất nhiều việc: giảm kho, tạo hồ sơ đơn hàng, gửi email xác nhận, cập nhật hệ thống đề xuất, ghi nhật ký kiểm toán……

Ở chế độ đồng bộ, các thao tác này được thực hiện tuần tự, người dùng phải chờ tất cả các thao tác hoàn thành mới có thể thấy kết quả. Ở chế độ không đồng bộ, bạn chỉ cần hoàn thành các thao tác cốt lõi (giảm kho, tạo đơn hàng), các thao tác khác được đưa vào hàng đợi để xử lý nền.

<AsyncTaskFlowDemo />

| Khía cạnh so sánh | Xử lý đồng bộ | Xử lý không đồng bộ |
|---------|---------|---------|
| Thời gian chờ đợi của người dùng | Tổng thời gian của tất cả các thao tác | Chỉ thời gian của các thao tác cốt lõi |
| Thông lượng hệ thống | Thấp (luồng bị chặn) | Cao (giải phóng luồng nhanh) |
| Tác động thất bại | Thất bại không cốt lõi dẫn đến thất bại toàn bộ | Thất bại không cốt lõi không ảnh hưởng đến luồng chính |
| Độ phức tạp của việc triển khai | Đơn giản | Cần hạ tầng hàng đợi bổ sung |
| Tính nhất quán của dữ liệu | Nhất quán mạnh | Nhất quán cuối cùng |

::: tip Khi nào nên dùng không đồng bộ?
Ba tiêu chuẩn đánh giá：**tốn thời gian dài** (vượt quá 1-2 giây)、**không phải cốt lõi** (thất bại không nên ảnh hưởng đến luồng chính)、**có thể trì hoãn** (không cần nhận kết quả ngay lập tức)。Nếu đáp ứng hai trong ba tiêu chuẩn, bạn nên cân nhắc không đồng bộ hóa。
:::

---

## 2. Mô hình sản xuất-tiêu thụ: "Dây chuyền lắp ráp" của tác vụ

Cốt lõi của hàng đợi tác vụ không đồng bộ là mô hình **Producer-Consumer Pattern** cổ điển。Mô hình này có ba vai trò：

- **Producer (Nhà sản xuất)**：Bên tạo ra tác vụ, thường là khi máy chủ Web xử lý yêu cầu của người dùng
- **Queue (Hàng đợi)**：Vùng đệm để lưu trữ các tác vụ đang chờ xử lý, thường được triển khai bằng Redis, RabbitMQ, v.v.
- **Consumer/Worker (Người tiêu thụ/Công nhân)**：Quá trình làm việc lấy tác vụ từ hàng đợi và thực hiện nó

<TaskWorkerDemo />

::: tip Ba giá trị lớn của hàng đợi
1. **Tách rời**：Nhà sản xuất không cần biết ai sẽ xử lý tác vụ, người tiêu thụ không cần biết tác vụ đến từ đâu
2. **Cắt đỉnh và lấp đáy**：Khi lưu lượng đột ngột tăng, các tác vụ được tích lũy trong hàng đợi trước, người tiêu thụ xử lý theo tốc độ của họ
3. **Độ tin cậy**：Các tác vụ được lưu trữ trong hàng đợi, ngay cả khi người tiêu thụ gặp sự cố cũng không bị mất
:::

| Thành phần | Trách nhiệm | Triển khai phổ biến |
|------|------|---------|
| Middleware tin nhắn | Lưu trữ và chuyển tiếp các tin nhắn tác vụ | Redis、RabbitMQ、Kafka |
| Trình nối tiếp hóa | Tuần tự hóa/bỏ tuần tự hóa các tham số tác vụ | JSON、MessagePack、Pickle |
| Bộ lập lịch | Quản lý các tác vụ theo lịch trình và tác vụ bị trì hoãn | Cron、APScheduler、node-cron |
| Kho lưu trữ kết quả | Lưu kết quả thực hiện tác vụ | Redis、cơ sở dữ liệu、S3 |

---

## 3. Bảo đảm độ tin cậy: Các tác vụ không thể "mất" và cũng không thể "trùng lặp"

Trong môi trường phân tán, các vấn đề như rung động mạng, khởi động lại dịch vụ, thiếu tài nguyên, v.v. có thể xảy ra bất cứ lúc nào。Hệ thống tác vụ không đồng bộ phải có cơ chế bảo đảm độ tin cậy hoàn chỉnh।

Hai vấn đề cốt lõi nhất：**mất tác vụ** (người tiêu thụ gặp sự cố giữa chừng xử lý) và **thực hiện lặp lại** (tác vụ được phân phối hai lần)।

<TaskRetryDemo />

::: tip Ba "cây búa" của độ tin cậy
1. **Cơ chế ACK**：Người tiêu thụ gửi xác nhận (ACK) chỉ sau khi hoàn thành xử lý tác vụ, các tác vụ chưa được xác nhận sẽ được phân phối lại
2. **Chiến lược thử lại**：Sau khi tác vụ thất bại, hãy thử lại theo chiến lược, thoái lui theo cấp số nhân + rung động là thực hành tốt nhất
3. **Thiết kế tính chất lũy đẳng**：Thực hiện cùng một tác vụ nhiều lần có cùng hiệu ứng với thực hiện một lần, được triển khai thông qua khử trùng ID duy nhất
:::

| Cơ chế | Vấn đề được giải quyết | Phương pháp triển khai |
|------|-----------|---------|
| Xác nhận ACK | Mất tác vụ | Xác nhận thủ công sau khi hoàn thành xử lý, nếu hết thời gian chờ mà chưa được xác nhận thì phân phối lại |
| Hàng đợi tin nhắn chết (DLQ) | "Tin nhắn độc" bị lặp đi lặp lại | Sau khi thử lại vượt quá giới hạn, chuyển vào hàng đợi tin nhắn chết, can thiệp thủ công để xử lý |
| Tính chất lũy đẳng | Thực hiện lặp lại | Khử trùng bằng ID duy nhất của tác vụ, ràng buộc duy nhất của cơ sở dữ liệu |
| Hàng đợi ưu tiên | Tác vụ bị chết đói | Xử lý các tác vụ ưu tiên cao trước, tránh bị chặn bởi các tác vụ ưu tiên thấp |
| Kiểm soát thời gian chờ | Tác vụ bị kẹt | Đặt thời gian thực hiện tối đa, tự động chấm dứt và thử lại khi hết thời gian |

---

## 4. Lựa chọn framework: Chọn công cụ phù hợp với bạn

Các hệ sinh thái ngôn ngữ khác nhau có các framework tác vụ không đồng bộ khác nhau, mỗi cái có ưu điểm khác nhau về độ phong phú của tính năng, hiệu suất, dễ sử dụng।Khi lựa chọn framework, trước tiên hãy xem xét ngăn xếp kỹ thuật của bạn, sau đó quyết định dựa trên quy mô dự án và yêu cầu।

<AsyncComparisonDemo />

::: tip Gợi ý lựa chọn
- **Dự án Python**：Sử dụng Celery cho dự án vừa và lớn, RQ cho dự án nhỏ
- **Dự án Node.js**：Lựa chọn hàng đầu là BullMQ (thế hệ tiếp theo của Bull)
- **Dự án Ruby**：Sidekiq gần như là lựa chọn duy nhất
- **Dự án Java**：Sử dụng Spring Batch cho hệ sinh thái Spring, Kafka Streams cho thông lượng cao
- **Dự án Go**：Asynq (dựa trên Redis) hoặc Machinery

Nếu dự án của bạn đã sử dụng Redis, thì các giải pháp dựa trên Redis (Celery+Redis、BullMQ、Sidekiq) là cách bắt đầu đơn giản nhất।
:::

---

## Tổng kết

Hàng đợi tác vụ không đồng bộ là hạ tầng không thể thiếu trong kiến trúc backend। Nó cho phép hệ thống xử lý một cách thanh lịch các thao tác tốn thời gian, nâng cao trải nghiệm người dùng đồng thời tăng thông lượng hệ thống।

Xem lại các điểm chính của chương này：

1. **Tiêu chuẩn đánh giá không đồng bộ hóa**：tốn thời gian dài、không phải cốt lõi、có thể trì hoãn, đáp ứng hai cái thì nên không đồng bộ hóa
2. **Mô hình sản xuất-tiêu thụ**：Producer → Queue → Consumer, ba bên tách rời và hợp tác
3. **Worker pool**：Nhiều Worker tiêu thụ song song, nâng cao khả năng xử lý
4. **Bảo đảm độ tin cậy**：Xác nhận ACK + chiến lược thử lại + tính chất lũy đẳng, ba cái không thể thiếu
5. **Lựa chọn framework**：Lựa chọn dựa trên ngăn xếp kỹ thuật và quy mô dự án, Redis là middleware tin nhắn phổ biến nhất

## Đọc thêm

- [Tài liệu chính thức Celery](https://docs.celeryq.dev/) - Hàng đợi tác vụ phân tán phổ biến nhất của Python
- [Tài liệu BullMQ](https://docs.bullmq.io/) - Hàng đợi tác vụ hiệu suất cao của Node.js
- [Wiki Sidekiq](https://github.com/sidekiq/sidekiq/wiki) - Tiêu chuẩn xử lý tác vụ của hệ sinh thái Ruby
- [Hướng dẫn RabbitMQ](https://www.rabbitmq.com/tutorials) - Hướng dẫn giới thiệu middleware tin nhắn
- [Thực hành tốt nhất cho tác vụ không đồng bộ](https://brandur.org/job-drain) - Các mô hình thiết kế và cạm bẫy của hàng đợi tác vụ
