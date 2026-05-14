# Phương pháp luận thiết kế hệ thống

::: tip Lời nói đầu
**Thiết kế hệ thống không phải vẽ sơ đồ kiến trúc bất chợt, mà là một phương pháp luận có thể theo dõi được.** Dù là câu hỏi thiết kế hệ thống trong phỏng vấn hay thiết kế kiến trúc trong công việc thực tế, đều tuân theo khung tư duy tương tự: trước tiên làm rõ vấn đề, sau đó ước tính quy mô, rồi thiết kế phương án, cuối cùng tối ưu hóa chi tiết.
:::

**Bài viết này sẽ dạy bạn điều gì?**

Sau khi hoàn thành chương này, bạn sẽ có được:

- **Quy trình thiết kế**: Nắm vững khung phương pháp bốn bước của thiết kế hệ thống
- **Ước tính năng lực**: Học được kỹ thuật "ước tính mặt sau phong bì"
- **Mô hình phổ biến**: Thành thạo các mô hình cốt lõi như bộ nhớ đệm, phân chia cơ sở dữ liệu, hàng đợi tin nhắn
- **Tư duy cân bằng**: Hiểu được tư duy trade-off trong thiết kế kiến trúc
- **Trường hợp thực tế**: Qua các trường hợp như dịch vụ liên kết ngắn, luồng Feed để hiểu quy trình thiết kế

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|------------|
| **Chương 1** | Phương pháp bốn bước thiết kế | Làm rõ nhu cầu, ước tính năng lực, thiết kế kiến trúc, tối ưu hóa chi tiết |
| **Chương 2** | Ước tính năng lực | QPS, lưu trữ, băng thông, ước tính mặt sau phong bì |
| **Chương 3** | Mô hình thiết kế cốt lõi | Bộ nhớ đệm, phân chia cơ sở dữ liệu, hàng đợi tin nhắn, CDN |
| **Chương 4** | Tư duy cân bằng | Tính nhất quán vs Tính sẵn có, Hiệu suất vs Chi phí |
| **Chương 5** | Trường hợp kinh điển | Dịch vụ liên kết ngắn, luồng Feed, hệ thống giảm giá |

---

## 1. Phương pháp bốn bước thiết kế hệ thống

Thiết kế hệ thống không phải bắt đầu bằng cách vẽ sơ đồ kiến trúc. Dù là phỏng vấn hay thực tế, đều nên tuân theo một quy trình có cấu trúc.

<SystemDesignStepsDemo />

::: tip Tại sao phải làm rõ nhu cầu trước?
Nhiều người nhận được đề bài liền bắt đầu vẽ, kết quả lại thiết kế một hệ thống "đúng nhưng không phải điều người phỏng vấn muốn". Dành 5 phút để hỏi rõ nhu cầu có thể tránh được 30 phút sửa chữa sau này.

Những câu hỏi làm rõ phổ biến:
- Chức năng cốt lõi của hệ thống là gì? (Không nên thiết kế tất cả các tính năng)
- Quy mô người dùng bao lớn? (Quyết định có cần phân tán hay không)
- Tỷ lệ đọc-ghi? (Quyết định chiến lược bộ nhớ đệm)
- Dữ liệu cần lưu giữ bao lâu? (Quyết định phương án lưu trữ)
:::

---

## 2. Ước tính năng lực: Nghệ thuật của mặt sau phong bì

"Ước tính mặt sau phong bì" (Back-of-envelope estimation) là kỹ năng cốt lõi trong thiết kế hệ thống. Không cần tính toán chính xác, chỉ cần biết độ lớn.

<CapacityEstimationDemo />

### Bảng tra cứu nhanh các phép chuyển đổi thông thường

| Độ lớn | Chuyển đổi | Mẹo ghi nhớ |
|-------|----------|------------|
| 1 ngày | 86.400 giây | ≈ 100.000 giây |
| 100 triệu yêu cầu/ngày | ≈ 1.200 QPS | Chia cho 100.000 |
| 1 KB × 100 triệu | ≈ 100 GB | 100 triệu bản ghi nhỏ |
| 1 MB × 1 triệu | ≈ 1 TB | 1 triệu hình ảnh |

### Ứng dụng quy tắc 2-8 trong ước tính

Hầu hết các hệ thống tuân theo quy tắc 80/20: 20% dữ liệu chứa 80% yêu cầu. Điều này có nghĩa là:

- **Kích thước bộ nhớ đệm** ≈ Tổng dữ liệu × 20%
- **QPS điểm nóng** ≈ Tổng QPS × 80% tập trung vào 20% khóa
- **Mục tiêu tỷ lệ trúng bộ nhớ đệm** ≈ 80%+ (thấp hơn giá trị này cho thấy chiến lược bộ nhớ đệm có vấn đề)

---

## 3. Mô hình thiết kế cốt lõi

Các mô hình xuất hiện lặp đi lặp lại trong thiết kế hệ thống, nắm được những mô hình này bạn sẽ có thể đối phó với hầu hết các tình huống.

### 3.1 Mô hình bộ nhớ đệm

| Mô hình | Đường dọc đọc | Đường dọc ghi | Trường hợp sử dụng |
|--------|--------|---------|----------|
| Cache-Aside | Kiểm tra bộ nhớ đệm trước, nếu miss thì truy vấn DB và điền lại | Ghi DB trước, sau đó xóa bộ nhớ đệm | Trường hợp chung, được sử dụng nhiều nhất |
| Read-Through | Lớp bộ nhớ đệm tự động tải từ DB | Giống Cache-Aside | Cần hỗ trợ khung bộ nhớ đệm |
| Write-Behind | Giống Cache-Aside | Ghi vào bộ nhớ đệm trước, ghi DB không đồng bộ | Loại ghi dày đặc, có thể dung thứ mất dữ liệu |

::: tip Tại sao "xóa bộ nhớ đệm" thay vì "cập nhật bộ nhớ đệm"?
Cập nhật bộ nhớ đệm dễ dẫn đến dữ liệu không nhất quán trong tình huống đồng thời: luồng A và B cùng cập nhật, A ghi DB trước nhưng B cập nhật bộ nhớ đệm trước, dẫn đến giá trị cũ của B trong bộ nhớ đệm. Xóa bộ nhớ đệm cho phép yêu cầu đọc tiếp theo tải lại từ DB, tự nhiên tránh được vấn đề này.
:::

### 3.2 Phân chia cơ sở dữ liệu

Khi lượng dữ liệu bảng đơn vượt quá mức chục triệu, hoặc QPS bảng đơn vượt quá giới hạn, bạn cần xem xét phân chia cơ sở dữ liệu.

| Chiến lược | Cách làm | Ưu điểm | Nhược điểm |
|----------|---------|--------|-----------|
| Phân chia cơ sở dữ liệu theo chiều dọc | Phân chia cơ sở dữ liệu theo lĩnh vực kinh doanh | Tách biệt kinh doanh, mở rộng độc lập | JOIN xuyên cơ sở dữ liệu khó |
| Phân chia bảng theo chiều ngang | Phân chia cùng một bảng thành nhiều bảng theo quy tắc | Lượng dữ liệu bảng đơn có thể kiểm soát | Lựa chọn khóa phân chia rất quan trọng |
| Phân chia bảng theo chiều dọc | Tách các trường lớn thành bảng riêng biệt | Giảm IO, cải thiện hiệu suất truy vấn | Cần thêm JOIN |

**Nguyên tắc lựa chọn khóa phân chia**:
- Chọn trường được truy vấn thường xuyên nhất (như user_id)
- Phân bố dữ liệu phải đều, tránh điểm nóng
- Cố gắng để dữ liệu của cùng một người dùng ở cùng một phân chia (giảm truy vấn xuyên phân chia)

### 3.3 Hàng đợi tin nhắn

Hàng đợi tin nhắn là "cơ chế giảm xóc" của hệ thống phân tán, tác dụng cốt lõi là tách biệt, không đồng bộ, cắt giảm đỉnh.

| Tình huống | Không dùng hàng đợi | Dùng hàng đợi |
|----------|----------|---------|
| Gửi thông báo sau đặt hàng | Giao diện đặt hàng gọi dịch vụ thông báo đồng bộ, nếu thông báo thất bại thì đặt hàng thất bại | Đặt hàng thành công sau đó gửi tin nhắn, dịch vụ thông báo tiêu thụ không đồng bộ |
| Giảm giá kịch tính | Dòng lưu lượng tức thời phá vỡ cơ sở dữ liệu | Yêu cầu vào hàng đợi trước, backend tiêu thụ theo khả năng |
| Đồng bộ dữ liệu | Dịch vụ A gọi trực tiếp giao diện của dịch vụ B | Dịch vụ A gửi sự kiện, dịch vụ B đăng ký xử lý |

---

## 4. Tư duy cân bằng: Không có giải pháp hoàn hảo

Bản chất của thiết kế kiến trúc là cân bằng (Trade-off). Mỗi quyết định đều có giá thành, chìa khóa là hiểu rõ giá thành và đưa ra lựa chọn phù hợp với giai đoạn hiện tại.

| Chiều cân bằng | Tùy chọn A | Tùy chọn B | Cơ sở quyết định |
|------------|----------|----------|----------|
| Tính nhất quán vs Tính sẵn có | Nhất quán mạnh (CP) | Sẵn có cao (AP) | Kinh doanh có thể dung thứ không nhất quán tạm thời? |
| Hiệu suất vs Chi phí | Bộ nhớ đệm toàn bộ | Bộ nhớ đệm theo yêu cầu | Lượng dữ liệu và ngân sách |
| Đơn giản vs Linh hoạt | Kiến trúc đơn lõi | Vi dịch vụ | Quy mô nhóm và độ phức tạp kinh doanh |
| Thời gian thực vs Hàng loạt | Xử lý luồng | Xử lý hàng loạt | Yêu cầu kịp thời dữ liệu |
| Tự xây dựng vs Dịch vụ quản lý | Tự xây dựng MySQL | Dùng RDS cơ sở dữ liệu đám mây | Khả năng vận hành và chi phí |

::: tip Ghi chép quyết định kiến trúc (ADR)
Mỗi quyết định kiến trúc quan trọng đều nên được ghi chép lại: **bối cảnh là gì, đã xem xét phương án nào, tại sao chọn phương án này, có những chi phí gì**. Đây không phải để đổ lỗi, mà để cho người sau hiểu "tại sao lúc đó lại thiết kế như vậy".

Định dạng rất đơn giản:
- **Tiêu đề**: Sử dụng XXX thay vì YYY
- **Bối cảnh**: Chúng tôi gặp phải vấn đề gì
- **Quyết định**: Chúng tôi chọn phương án gì
- **Lý do**: Tại sao chọn phương án này
- **Chi phí**: Nhược điểm và rủi ro của quyết định này
:::

### Những sai lầm phổ biến trong cân bằng

| Sai lầm | Biểu hiện | Cách làm đúng |
|--------|---------|---------|
| Tối ưu hóa quá sớm | Người dùng hoạt động hằng ngày chỉ có 1000 người đã phân chia cơ sở dữ liệu | Trước tiên dùng cơ sở dữ liệu đơn, khi gặp nút thắt cổ chai thì mới tách |
| Định hướng bởi công nghệ | "Tôi muốn dùng Kafka" thay vì "Tôi cần không đồng bộ" | Bắt đầu từ vấn đề, không phải từ công nghệ |
| Bỏ qua chi phí vận hành | Chọn phương án tối ưu nhất nhưng nhóm không thể duy trì | Phương án phải phù hợp với khả năng nhóm |
| Tìm kiếm tính nhất quán hoàn hảo | Tất cả tình huống đều dùng giao dịch phân tán | Hầu hết tình huống tính nhất quán cuối cùng đã đủ |

---

## 5. Trường hợp kinh điển

Qua ba trường hợp kinh điển, hãy kết nối phương pháp luận mà bạn đã học được.

### 5.1 Dịch vụ liên kết ngắn (TinyURL)

Dịch vụ liên kết ngắn là câu hỏi thiết kế hệ thống kinh điển trong phỏng vấn, nhỏ nhưng đầy đủ các chức năng.

**Làm rõ nhu cầu**:
- Chức năng cốt lõi: Liên kết dài → liên kết ngắn (ghi), liên kết ngắn → chuyển hướng (đọc)
- Tỷ lệ đọc-ghi: khoảng 100:1 (đọc nhiều hơn ghi)
- Chuyển hướng hằng ngày: 100 triệu lần
- Liên kết ngắn không hết hạn

**Ước tính năng lực**:

| Chỉ số | Tính toán | Kết quả |
|--------|---------|--------|
| QPS ghi | 100 triệu / 100 / 86.400 | ≈ 12 QPS |
| QPS đọc | 100 triệu / 86.400 | ≈ 1.200 QPS |
| QPS đọc đỉnh | 1.200 × 3 | ≈ 3.600 QPS |
| Lưu trữ 5 năm | 1 triệu/ngày × 365 × 5 × 100B | ≈ 18 GB |
| Bộ nhớ đệm (20%) | 18 GB × 20% | ≈ 3,6 GB |

**Thiết kế kiến trúc**:

```
Đường ghi: Máy khách → Máy chủ API → Trình tạo ID → Mã hóa Base62 → Ghi MySQL + Redis
Đường đọc: Máy khách → CDN → Máy chủ API → Truy vấn Redis → Chuyển hướng 302
                                                    ↓ (cache miss)
                                                  Truy vấn MySQL → Điền lại Redis
```

**Quyết định thiết kế chính**:
- Tạo mã ngắn: Snowflake ID phân tán + mã hóa Base62, tránh xung đột băm
- Chiến lược bộ nhớ đệm: Cache-Aside, liên kết ngắn nóng dùng CDN tăng tốc
- Cơ sở dữ liệu: Bảng đơn là đủ (18GB rất nhỏ), lập chỉ mục theo mã ngắn

### 5.2 Hệ thống luồng Feed

Luồng Feed (tường bạn bè, trang chủ Weibo) của nền tảng xã hội là một câu hỏi kinh điển khác.

**Thách thức cốt lõi**: Người dùng đăng một bài động, làm sao để tất cả người theo dõi đều thấy?

| Phương án | Cách làm | Ưu điểm | Nhược điểm |
|--------|---------|--------|-----------|
| Mô hình kéo (Pull) | Khi đọc hãy tập hợp theo thời gian thực những bài động của những người được theo dõi | Ghi đơn giản, lưu trữ ít | Đọc chậm, khi theo dõi nhiều sẽ chậm |
| Mô hình đẩy (Push) | Khi đăng hãy ghi vào hộp thư đến của tất cả người theo dõi | Đọc cực nhanh | Những người dùng có nhiều người theo dõi sẽ ghi đẩy nghiêm trọng |
| Kết hợp đẩy-kéo | Người dùng bình thường đẩy, người dùng nổi tiếng kéo | Cân bằng hiệu suất đọc-ghi | Thực hiện phức tạp |

**Phương án kết hợp đẩy-kéo**:
- Người theo dõi < 10.000: Khi đăng hãy đẩy đến bộ nhớ đệm Feed của tất cả người theo dõi (mô hình đẩy)
- Người theo dõi > 10.000: Không đẩy, khi đọc Feed người theo dõi sẽ kéo theo thời gian thực (mô hình kéo)
- Khi người dùng mở Feed: Hợp nhất nội dung được đẩy + kéo theo thời gian thực của những người nổi tiếng, sắp xếp theo thời gian

### 5.3 Hệ thống giảm giá kịch tính

Thách thức cốt lõi của giảm giá kịch tính: Lưu lượng siêu cao trong tức thời + hàng hóa không thể bán quá.

**Đặc điểm lưu lượng**:
- Trước hoạt động: Rất nhiều người dùng làm mới trang chờ đợi
- Tức thời khi hoạt động bắt đầu: QPS có thể gấp 100 lần trở lên so với bình thường
- Sau hoạt động kết thúc: Lưu lượng nhanh chóng giảm

**Chiến lược cắt giảm đỉnh theo tầng**:

```
Yêu cầu của người dùng → CDN (trang tĩnh) → Cổng (giới hạn tốc độ) → Hàng đợi tin nhắn (cắt giảm đỉnh) → Dịch vụ hàng hóa (khấu trừ)
```

| Tầng | Chiến lược | Hiệu quả |
|------|---------|--------|
| Frontend | Nút bấm tắt + trễ ngẫu nhiên + xác minh | Lọc robot, phân tán yêu cầu |
| CDN | Bộ nhớ đệm tài nguyên tĩnh | Giảm 90% yêu cầu trang |
| Cổng | Giới hạn tốc độ với thùng mã | Chỉ cho phép thông lượng mà hệ thống có thể chịu đựng |
| Hàng đợi tin nhắn | Yêu cầu vào hàng đợi, xử lý không đồng bộ | Cắt giảm đỉnh, bảo vệ cơ sở dữ liệu |
| Dịch vụ hàng hóa | Redis khấu trừ sơ bộ + thao tác nguyên tử Lua | Không bán quá, phản hồi mili giây |

::: tip Nguyên tắc cốt lõi của giảm giá kịch tính
1. **Cản ở thượng nguồn nhất có thể**: Những gì CDN có thể cản không nên để tới tầng ứng dụng
2. **Tách biệt đọc-ghi**: Trang chi tiết sản phẩm dùng bộ nhớ đệm, chỉ có đặt hàng đi vào cơ sở dữ liệu
3. **Xử lý không đồng bộ**: Sau khi người dùng nhấp vào "giảm giá" hãy trả về "xếp hàng chờ" ngay lập tức, xử lý không đồng bộ ở phía sau
4. **Phương án dự phòng**: Giới hạn tốc độ, ngắt mạch, giảm tải, nếu bất kỳ tầng nào gặp sự cố đều có phương án B
:::

---

## Tóm tắt

Thiết kế hệ thống là một kỹ năng rất mang tính thực hành, cốt lõi nằm ở tư duy có cấu trúc và cân bằng lựa chọn.

Hãy xem lại những điểm chính của chương này:

1. **Khung phương pháp bốn bước**: Làm rõ nhu cầu → Ước tính năng lực → Thiết kế kiến trúc → Tối ưu hóa chi tiết, mỗi bước đều không thể bỏ qua
2. **Ước tính mặt sau phong bì**: Không cần chính xác, chỉ cần biết độ lớn, dùng để hướng dẫn quyết định kiến trúc
3. **Mô hình cốt lõi**: Bộ nhớ đệm, phân chia cơ sở dữ liệu, hàng đợi tin nhắn, CDN, giới hạn tốc độ và ngắt mạch — đây là "khối xây dựng" của thiết kế hệ thống
4. **Tư duy cân bằng**: Không có phương án hoàn hảo, chỉ có phương án phù hợp với giai đoạn hiện tại, ghi chép lý do và chi phí của mỗi quyết định
5. **Trường hợp kinh điển**: Dịch vụ liên kết ngắn rèn luyện kiến thức cơ bản, luồng Feed rèn luyện mô hình đẩy-kéo, giảm giá kịch tính rèn luyện đồng thời cao — nắm được ba trường hợp này bạn sẽ có thể rút ra kinh nghiệm cho các trường hợp khác

## Đọc thêm

- [System Design Interview](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF) - Kinh điển phỏng vấn thiết kế hệ thống của Alex Xu
- [Designing Data-Intensive Applications](https://dataintensive.net/) - Thiết kế ứng dụng dữ liệu dày đặc của Martin Kleppmann
- [The System Design Primer](https://github.com/donnemartin/system-design-primer) - Tài nguyên học thiết kế hệ thống toàn diện nhất trên GitHub
- [ByteByteGo](https://bytebytego.com/) - Blog trực quan hóa thiết kế hệ thống của Alex Xu
