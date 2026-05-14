# Viết tài liệu kỹ thuật

::: tip Lời nói đầu
**Tài liệu bạn viết có ai đọc không?** Nhiều lập trình viên nghĩ "code chạy được là được, viết tài liệu để sau". Kết quả là: nhân viên mới không hiểu dự án, tích hợp API phải dựa vào nói chuyện, sáu tháng sau bạn cũng quên tại sao lại thiết kế như vậy.

Chương này sẽ giúp bạn nắm vững các phương pháp cốt lõi của viết tài liệu kỹ thuật, để tài liệu của bạn thực sự có người đọc, đọc được, và sử dụng được.
:::

**Bài viết này sẽ dạy bạn gì?**

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|-----------------|
| **Chương 1** | Loại tài liệu và cấu trúc | Cách viết các tài liệu khác nhau |
| **Chương 2** | Nguyên tắc viết | Rõ ràng, chính xác, ngắn gọn |
| **Chương 3** | Áp dụng thực tế | Tài liệu tốt vs tài liệu xấu |
| **Chương 4** | Bảo trì tài liệu | Giữ tài liệu luôn cập nhật |

Sau khi học xong chương này, bạn sẽ có thể viết tài liệu kỹ thuật với cấu trúc rõ ràng, nội dung chính xác, dễ bảo trì.

---

## 0. Bản đồ toàn cảnh: Tại sao tài liệu kỹ thuật lại quan trọng?

Code nói với máy tính "làm cái gì", tài liệu nói với người "tại sao phải làm như vậy". Dự án không có tài liệu giống như thiết bị không có hướng dẫn sử dụng — dùng được nhưng phải đoán mò.

::: tip Giá trị của tài liệu tốt
- **Giảm chi phí giao tiếp**: Nhân viên mới tự học, giảm trả lời lặp đi lặp lại
- **Lưu trữ bối cảnh quyết định**: Ghi lại "tại sao", không chỉ "là cái gì"
- **Nâng cao độ tin cậy dự án**: Tài liệu tốt là mặt tiền của dự án mã nguồn mở
- **Tăng tốc độ hợp tác**: API documentation giúp frontend và backend phát triển song song
:::

---

## 1. Loại tài liệu và cấu trúc

Qua thành phần tương tác dưới đây, hãy tìm hiểu cấu trúc chuẩn của các loại tài liệu khác nhau:

<DocStructureDemo />

### 1.1 Loại tài liệu thường gặp

| Loại tài liệu | Đối tượng đọc | Nội dung cốt lõi |
|---|---|---|
| **README** | Tất cả mọi người | Dự án là gì, cách dùng, cách đóng góp |
| **API documentation** | Bên gọi API | Endpoint, tham số, phản hồi, mã lỗi |
| **Architecture documentation** | Nhóm phát triển | Thiết kế hệ thống, lựa chọn công nghệ, luồng dữ liệu |
| **Changelog** | Người dùng/lập trình viên | Thay đổi phiên bản, tính năng mới/sửa/thay đổi không tương thích |
| **Contribution guide** | Những người đóng góp | Môi trường phát triển, quy chuẩn code, quy trình PR |

### 1.2 Cấu trúc vàng của README

Một README tốt nên chứa:

1. **Tên dự án + Mô tả một dòng**: Để người ta biết đây là gì trong 3 giây
2. **Bắt đầu nhanh**: Ít nhất các bước để chạy được
3. **Tính năng chính**: Các điểm mạnh cốt lõi
4. **Cách cài đặt**: Yêu cầu môi trường chi tiết và các bước cài đặt
5. **Ví dụ sử dụng**: Code có thể copy-paste
6. **Hướng dẫn đóng góp**: Cách tham gia
7. **Giấy phép**: Thông tin pháp lý

---

## 2. Nguyên tắc viết

### 2.1 Rõ ràng là ưu tiên hàng đầu

```markdown
<!-- Xấu: Mơ hồ không rõ -->
Hàm này xử lý dữ liệu.

<!-- Tốt: Cụ thể rõ ràng -->
Chuyển đổi dữ liệu đơn hàng thô sang định dạng hóa đơn, bao gồm tính toán thuế và chuyển đổi tiền tệ.
```

### 2.2 Viết cho người đọc

Trước khi viết tài liệu hãy tự hỏi: **Ai sẽ đọc tài liệu này? Họ cần thông tin gì?**

- Viết cho người mới: Giải thích thuật ngữ, cung cấp ví dụ đầy đủ
- Viết cho lập trình viên có kinh nghiệm: Đi thẳng vào chủ đề, cung cấp tham khảo API
- Viết cho người không phải kỹ thuật: Dùng so sánh, tránh thuật ngữ

### 2.3 Ví dụ code là tài liệu tốt nhất

```markdown
<!-- Xấu: Chỉ có mô tả văn bản -->
Gọi hàm createUser, truyền tên người dùng và tham số email.

<!-- Tốt: Cung cấp ví dụ có thể chạy được -->
const user = await createUser({
  name: 'Nguyễn Văn A',
  email: 'a@example.com'
})
// Trả về: { id: 'u_123', name: 'Nguyễn Văn A', createdAt: '2025-01-15' }
```

---

## 3. Áp dụng thực tế

Qua thành phần tương tác dưới đây, hãy so sánh viết kỹ thuật tốt và viết kỹ thuật xấu:

<TechWritingPracticeDemo />

### 3.1 Quy chuẩn Commit Message

```
# Xấu
fix bug
update code

# Tốt (Conventional Commits)
fix: Sửa trang đăng nhập bị trắng trên Safari
feat: Hỗ trợ xuất hàng loạt báo cáo dưới định dạng PDF
docs: Cập nhật ví dụ code trong phần xác thực API
```

### 3.2 Nghệ thuật của chú thích

```javascript
// Xấu: Mô tả "là cái gì" (code đã nói rồi)
// Duyệt qua mảng
for (const item of items) { ... }

// Tốt: Giải thích "tại sao"
// Duyệt ngược, vì xóa phần tử theo thứ tự thuận sẽ bỏ qua phần tử tiếp theo
for (let i = items.length - 1; i >= 0; i--) { ... }
```

---

## 4. Bảo trì tài liệu

### 4.1 Tài liệu là code

Đặt tài liệu và code trong cùng một kho lưu trữ, quản lý với cùng một quy trình làm việc:

- Thay đổi tài liệu được commit cùng code trong PR
- CI kiểm tra định dạng tài liệu và tính hợp lệ của các liên kết
- Phát hành phiên bản đồng thời cập nhật tài liệu

### 4.2 Tránh tài liệu bị lỗi thời

| Vấn đề | Giải pháp |
|---|---|
| Tài liệu lỗi thời | Bắt buộc cập nhật tài liệu khi thay đổi code (kiểm tra PR) |
| Không ai bảo trì | Chỉ định người chịu trách nhiệm tài liệu |
| Nội dung trùng lặp | Một nguồn thông tin duy nhất, các nơi khác tham chiếu liên kết |

---

## 5. AI hỗ trợ: Dùng mô hình lớn để nâng cao chất lượng tài liệu

Mô hình lớn gần như "có thiên năng" trong lĩnh vực viết kỹ thuật — tạo tài liệu, cải thiện cách diễn đạt, dịch nội dung đều là điểm mạnh của nó.

### 5.1 Tạo API documentation

> **Prompt**:
> ```
> Dựa trên mã route Express sau, tạo tài liệu API đầy đủ, bao gồm:
> - Đường dẫn endpoint và phương thức
> - Tham số yêu cầu (tham số đường dẫn, tham số truy vấn, nội dung yêu cầu) và kiểu dữ liệu
> - Ví dụ phản hồi thành công và lỗi
> - Ví dụ gọi sử dụng curl
>
> [Dán code route của bạn]
> ```

### 5.2 Cải thiện viết kỹ thuật

> **Prompt**:
> ```
> Vui lòng cải thiện cách diễn đạt trong tài liệu kỹ thuật sau, yêu cầu:
> 1. Ngôn ngữ ngắn gọn rõ ràng, loại bỏ cách diễn đạt dư thừa
> 2. Dùng câu chủ động thay thế câu bị động
> 3. Giữ thuật ngữ chuyên ngành chính xác
> 4. Thêm ví dụ code cần thiết
> Giữ ý nghĩa gốc không đổi, chỉ cải thiện chất lượng diễn đạt.
>
> [Dán nội dung tài liệu của bạn]
> ```

### 5.3 Tạo README

> **Prompt**:
> ```
> Dựa trên thông tin dự án sau, tạo một README.md chất lượng cao:
> - Tên dự án: [tên]
> - Mô tả một dòng: [mô tả]
> - Technology stack: [liệt kê]
> - Tính năng chính: [liệt kê]
>
> Yêu cầu bao gồm: giới thiệu dự án, bắt đầu nhanh, tính năng chính,
> bước cài đặt (có code), ví dụ sử dụng, hướng dẫn đóng góp, giấy phép.
> ```

::: tip Gợi ý sử dụng AI
Tài liệu được tạo bởi AI phải kiểm tra xem chi tiết kỹ thuật có chính xác không — nó có thể bịa ra tham số API không tồn tại hoặc giá trị trả về sai. Luôn đối chiếu với code thực tế để xác minh.
:::

---

## 6. Tóm tắt

1. **Khớp loại**: Các loại tài liệu khác nhau có cấu trúc và cách viết khác
2. **Rõ ràng là ưu tiên**: Cụ thể, chính xác, hướng tới người đọc
3. **Hướng bởi ví dụ**: Ví dụ code tốt hơn ngàn lời nói
4. **Bảo trì liên tục**: Tài liệu là code, phát triển cùng dự án

::: tip Suy tư cuối cùng
Viết tài liệu không phải lãng phí thời gian, mà là **tiết kiệm thời gian tương lai**. Tài liệu bạn viết trong 30 phút hôm nay có thể giúp 10 người mỗi người tiết kiệm 1 giờ. Tài liệu tốt là khoản đầu tư tốt nhất cho nhóm của bạn.
:::

---

## Đọc thêm

- **Hướng dẫn viết**: Khóa học Viết kỹ thuật của Google (Technical Writing) miễn phí và thực tế.
- **Công cụ tài liệu**: VitePress, Docusaurus, GitBook và các framework tài liệu hiện đại khác.
- **API documentation**: Quy chuẩn OpenAPI/Swagger là tiêu chuẩn ngành cho API documentation.
- **Gợi ý thực hành**: Bắt đầu bằng cách viết một README tốt cho dự án của chính bạn.
