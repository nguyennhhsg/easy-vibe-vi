# Cộng tác mã nguồn mở

::: tip Lời dẫn
**Bạn muốn tham gia các dự án mã nguồn mở nhưng không biết bắt đầu từ đâu?** Mã nguồn mở không chỉ là "sử dụng miễn phí mã của người khác", mà còn là một cách thức cộng tác và một bước đệm sự nghiệp. Một lần đóng góp mã nguồn mở chất lượng cao có thể thuyết phục hơn cả việc viết mười dự án cá nhân trên sơ yếu lý lịch.

Chương này sẽ giúp bạn hiểu rõ toàn bộ quy trình cộng tác mã nguồn mở, từ tìm kiếm dự án đến gửi PR, hãy bước chân đầu tiên vào thế giới đóng góp mã nguồn mở.
:::

**Bài viết này sẽ dạy bạn điều gì?**

| Chương | Nội dung | Khái niệm cốt lõi |
|-------|---------|------------------|
| **Chương 1** | Quy trình đóng góp mã nguồn mở | Toàn bộ chuỗi từ Fork đến PR |
| **Chương 2** | Giấy phép mã nguồn mở | Sự khác biệt giữa các giấy phép |
| **Chương 3** | Quy tắc cộng tác | Cách trở thành một người đóng góp được chào đón |
| **Chương 4** | Bắt đầu đóng góp từ đầu | Tìm các dự án thích hợp cho người mới |

Sau khi học xong chương này, bạn sẽ nắm vững toàn bộ quy trình và quy tắc cộng tác mã nguồn mở, và có đủ tự tin để gửi đóng góp cho bất kỳ dự án mã nguồn mở nào.

---

## 0. Toàn cảnh: Giá trị của mã nguồn mở

Mã nguồn mở không chỉ là chia sẻ mã, mà còn là một **mô hình cộng tác toàn cầu hóa**. Linux, React, Vue, Node.js——những dự án thay đổi thế giới này đều là mã nguồn mở.

::: tip Lợi ích của việc tham gia mã nguồn mở
- **Sự phát triển kỹ thuật**: Đọc mã nguồn tuyệt vời, nhận được Review từ các bậc thầy
- **Phát triển sự nghiệp**: Đóng góp mã nguồn mở là thẻ bài kỹ thuật tốt nhất
- **Cảm giác thân thuộc với cộng đồng**: Trở thành thành viên của cộng đồng nhà phát triển toàn cầu
- **Đóng góp cho hệ sinh thái**: Những công cụ bạn sử dụng hàng ngày cũng cần có người bảo trì
:::

---

## 1. Quy trình đóng góp mã nguồn mở

Thông qua thành phần tương tác dưới đây, hãy tìm hiểu từng bước quy trình hoàn chỉnh từ Fork đến Merge:

<OpenSourceWorkflowDemo />

### 1.1 Tổng quan quy trình

```
Fork → Clone → Branch → Commit → Push → PR → Review → Merge
```

### 1.2 Giải thích chi tiết các bước chính

**Tạo nhánh tính năng**: Không phát triển trực tiếp trên main.

```bash
git checkout -b fix/typo-in-readme
```

**Viết Commit Message rõ ràng**: Tuân theo quy chuẩn commit của dự án.

```bash
git commit -m "fix: Sửa lỗi chính tả trong lệnh cài đặt README"
```

**Tạo Pull Request**: Mô tả PR phải bao gồm:
- Bạn đã thay đổi cái gì, tại sao phải thay đổi
- Số hiệu Issue liên quan (ví dụ: `Fixes #123`)
- Cách để kiểm tra những thay đổi của bạn

---

## 2. Giấy phép mã nguồn mở

Thông qua thành phần tương tác dưới đây, hãy so sánh sự khác biệt giữa các giấy phép mã nguồn mở phổ biến:

<LicenseComparisonDemo />

### 2.1 Giấy phép phổ biến

| Giấy phép | Đặc điểm | Dự án điển hình |
|----------|----------|-----------------|
| **MIT** | Tự do nhất, hầu như không có giới hạn | React, Vue, jQuery |
| **Apache 2.0** | Cần giữ lại thông báo bản quyền, có cấp phép bằng sáng chế | Android, Kubernetes |
| **GPL** | Các tác phẩm phái sinh phải cũng là mã nguồn mở | Linux, WordPress |
| **BSD** | Tương tự MIT, có một số khác biệt nhỏ | FreeBSD, Flask |

### 2.2 Làm thế nào để chọn?

- **Muốn cho nhiều người sử dụng**: Chọn MIT
- **Muốn bảo vệ bằng sáng chế**: Chọn Apache 2.0
- **Muốn đảm bảo các tác phẩm phái sinh cũng là mã nguồn mở**: Chọn GPL

---

## 3. Quy tắc cộng tác

### 3.1 Quy tắc khi gửi Issue

```markdown
<!-- Xấu -->
Tiêu đề: Không dùng được nữa
Nội dung: Cái của bạn có lỗi

<!-- Tốt -->
Tiêu đề: v2.1.0 bị lỗi trang đăng nhập trắng trên Safari 17
Nội dung:
- Môi trường: macOS 14.2, Safari 17.2
- Cách tái hiện lỗi: 1. Mở trang đăng nhập 2. Nhập tài khoản mật khẩu 3. Nhấp vào đăng nhập
- Hành vi mong đợi: Chuyển đến trang chủ
- Hành vi thực tế: Trang bị trắng, console báo lỗi TypeError: xxx
- Ảnh chụp: [Đính kèm ảnh]
```

### 3.2 Quy tắc khi gửi PR

- Trước hết hãy xem `CONTRIBUTING.md`, hiểu rõ quy chuẩn đóng góp của dự án
- Một PR chỉ làm một việc, không nên trộn lẫn nhiều thay đổi
- Giữ PR nhỏ gọn và tập trung, thuận tiện cho Review
- Chờ đợi Review một cách kiên nhẫn, phản hồi lại các ý kiến một cách lịch sự

### 3.3 Review mã của người khác

- Trước tiên hãy khen ngợi những điểm làm tốt, sau đó đưa ra các gợi ý cải thiện
- Hỏi thay vì ra lệnh: "Ở đây có cân nhắc sử dụng phương án X không?"
- Đưa ra lý do và phương án thay thế, chứ không chỉ nói "không tốt"

---

## 4. Bắt đầu đóng góp từ đầu

### 4.1 Loại đóng góp thích hợp cho người mới

| Loại | Độ khó | Giải thích |
|------|--------|-----------|
| Sửa lỗi tài liệu | Thấp | Lỗi chính tả, liên kết lỗi thời, hướng dẫn không rõ ràng |
| Dịch thuật | Thấp | Dịch tài liệu sang các ngôn ngữ khác |
| Bổ sung bài kiểm tra | Trung bình | Thêm bài kiểm tra cho mã chưa được bao phủ |
| Sửa lỗi được đánh dấu `good first issue` | Trung bình | Các vấn đề thân thiện với người mới được người bảo trì dự án đánh dấu |
| Tính năng mới | Cao | Trước tiên hãy thảo luận phương án trong Issue, nhận được chấp thuận sau đó mới bắt tay vào làm |

### 4.2 Tìm dự án thích hợp

- Hãy bắt đầu từ các công cụ bạn sử dụng hàng ngày
- Tìm kiếm GitHub bằng nhãn `good first issue`
- Chú ý đến mức độ hoạt động của dự án (gần đây có ai bảo trì không)

---

## 5. Hỗ trợ AI: Sử dụng mô hình lớn để tăc tốc độ đóng góp mã nguồn mở

Mô hình lớn có thể giúp bạn nhanh chóng hiểu cơ sở mã lạ, viết mô tả PR chất lượng cao, thậm chí hỗ trợ Code Review.

### 5.1 Nhanh chóng hiểu cơ sở mã lạ

> **Gợi ý từ**:
> ```
> Tôi vừa clone một dự án mã nguồn mở, vui lòng giúp tôi phân tích cấu trúc thư mục sau,
> giải thích trách nhiệm của từng thư mục/tệp, cũng như kiến trúc chung và luồng dữ liệu của mã.
> Tôi muốn sửa một lỗi liên quan đến đăng nhập, tôi nên bắt đầu xem từ đâu?
>
> [Dán đầu ra lệnh tree hoặc cấu trúc thư mục]
> ```

### 5.2 Viết mô tả PR

> **Gợi ý từ**:
> ```
> Dựa trên git diff sau, vui lòng giúp tôi viết mô tả Pull Request, bao gồm:
> - Tiêu đề (ngắn gọn, nêu rõ đã thay đổi cái gì)
> - Mô tả thay đổi (tại sao thay đổi, đã thay đổi cái gì)
> - Phương pháp kiểm tra (cách xác minh thay đổi là chính xác)
> - Issue liên quan (nếu có)
> Viết bằng tiếng Anh, giọng điệu chuyên nghiệp thân thiện.
>
> [Dán đầu ra git diff]
> ```

### 5.3 Hỗ trợ dịch tài liệu

> **Gợi ý từ**:
> ```
> Dịch tài liệu kỹ thuật tiếng Trung sau sang tiếng Anh, yêu cầu:
> 1. Sử dụng cách diễn đạt tiếng Anh thông dụng của ngành cho các thuật ngữ kỹ thuật
> 2. Không dịch nhận xét mã và tên biến
> 3. Giữ nguyên định dạng Markdown
> 4. Giọng điệu tự nhiên mượt mà, không cảm giác dịch máy
>
> [Dán tài liệu tiếng Trung]
> ```

::: tip Lời khuyên sử dụng AI
Khi dùng AI viết mô tả PR, hãy đảm bảo bạn tự mình hiểu rõ từng dòng thay đổi. Người review có thể hỏi bạn tại sao lại thay đổi như vậy——nếu bạn không trả lời được, điều đó có nghĩa là bạn chưa thực sự hiểu rõ.
:::

---

## 6. Tóm tắt

1. **Quy trình**: Fork → Branch → Commit → PR → Review → Merge
2. **Giấy phép**: MIT tự do nhất, GPL nghiêm ngặt nhất, chọn theo nhu cầu
3. **Quy tắc**: Issue rõ ràng, PR tập trung, giao tiếp lịch sự
4. **Bắt đầu**: Bắt đầu từ việc sửa tài liệu và `good first issue`

::: tip Suy tư cuối cùng
Bản chất của mã nguồn mở là **cộng tác**. Khả năng kỹ thuật tất nhiên quan trọng, nhưng kỹ năng giao tiếp và ý thức cộng tác cũng như vậy. Một PR có thái độ thân thiện và mô tả rõ ràng sẽ được chào đón hơn một PR có mã hoàn hảo nhưng giao tiếp thô lỗ. **PR đầu tiên của bạn không cần hoàn hảo, chỉ cần bạn bước chân đầu tiên.**
:::

---

## Đọc thêm

- **Hướng dẫn bắt đầu**: Open Source Guide của GitHub là tài nguyên bắt đầu mã nguồn mở tốt nhất.
- **Lời khuyên thực tế**: Tìm một dự án bạn thích, Star trước, đọc mã, sau đó tìm cơ hội đóng góp.
- **Tham gia cộng đồng**: Tham gia các hoạt động mã nguồn mở như Hacktoberfest, nhận được hỗ trợ từ cộng đồng.
- **Góc độ của người bảo trì**: Hiểu rõ khối lượng công việc và áp lực của người bảo trì, trở thành một người đóng góp thân thiện.
