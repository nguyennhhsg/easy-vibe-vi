---
title: 'Gặp lỗi khi viết code - Hướng dẫn thực hành chụp ảnh hỏi AI'
description: 'Học cách hỏi AI hiệu quả để giải quyết các lỗi khác nhau trong quá trình phát triển, nắm vững quy trình chuẩn chụp ảnh, mô tả và định vị vấn đề, để AI trở thành trợ thủ gỡ lỗi của bạn.'
---

<script setup>
const duration = 'khoảng <strong>30 phút</strong>'
</script>

# Gặp lỗi khi viết code - Phải làm sao?

## Hướng dẫn chương

<ChapterIntroduction :duration="duration" :tags="['kỹ thuật gỡ lỗi', 'cộng tác với AI', 'giải quyết vấn đề', 'công cụ nhà phát triển']" coreOutput="một quy trình tiêu chuẩn hóa để xử lý lỗi" expectedOutput="có khả năng giải quyết độc lập 90% lỗi phổ biến">

Vào thời đại AI, cách xử lý lỗi đã thay đổi.

Bạn không cần nhớ tất cả các loại lỗi, không cần trở thành chuyên gia gỡ lỗi, thậm chí không cần hiểu lỗi là gì.

<strong>Bạn chỉ cần học một điều: cách hỏi AI.</strong>

Chương này sẽ dạy bạn một quy trình <strong>từ đơn giản đến nâng cao</strong>:

1. <strong>Bước một: hỏi trực tiếp</strong>: mô tả hiện tượng + chụp ảnh, hỏi một câu
2. <strong>Bước hai: bổ sung thông tin</strong>: nếu không giải quyết được, hãy mở F12 để bổ sung thông tin chính

Sau khi nắm vững quy trình này, <strong>bạn có thể tự giải quyết 90% lỗi báo cáo</strong>.

</ChapterIntroduction>

::: info Ghi chú
Tất cả các phương pháp trong chương này dựa trên kinh nghiệm sử dụng thực tế Cursor/Trae/Claude và các IDE AI khác, có thể áp dụng trực tiếp vào phát triển hàng ngày.
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Hỏi trực tiếp', description: 'mô tả hiện tượng + chụp ảnh' },
      { title: 'Bổ sung thông tin', description: 'mở F12 định vị vấn đề' },
      { title: 'Lặp lại giải quyết', description: 'cho đến khi giải quyết xong' }
    ]" />
  </ClientOnly>
</div>

## 1. Tâm pháp cốt lõi: chụp ảnh hỏi AI

::: warning Tại sao chương này lại quan trọng?

Khi gặp lỗi, phản ứng đầu tiên của nhiều người mới bắt đầu là:
- Hoảng sợ, bắt đầu sửa code tùy tiện
- Dành nửa giờ tìm kiếm "cách giải quyết lỗi xxx"
- Cố gắng tự hiểu lỗi là gì
- Tự gỡ lỗi cho đến hôm kế

<strong>Tất cả những cách này đều lãng phí thời gian.</strong>

Vào thời đại AI, gỡ lỗi đã trở thành một việc rất đơn giản:

```
Thấy lỗi → chụp ảnh → hỏi AI → làm theo lời AI
```

Bạn không cần hiểu lỗi, không cần biết gỡ lỗi, thậm chí không cần biết vấn đề ở đâu.

<strong>Bạn chỉ cần học cách hỏi.</strong>

:::

### 1.1 Cách hỏi đơn giản nhất

Không cần template phức tạp, chọn một trong hai cách:

**Cách một: mô tả hiện tượng**

Định dạng: vừa làm gì, bây giờ xảy ra điều gì

```
Vừa rồi tôi sửa code trang đăng nhập, bây giờ trang trắng rồi, phải làm sao?
```

**Cách hai: chụp ảnh**

Chụp trực tiếp trang hiện tại hoặc thông báo lỗi

```
[chụp ảnh]

Cái lỗi này phải giải quyết như thế nào?
```

**Cách tốt nhất: mô tả + chụp ảnh**

```
Vừa rồi tôi sửa code trang đăng nhập, bây giờ trang trắng rồi.

[chụp ảnh]

Phải làm sao?
```

**Nhớ: mô tả rõ ràng ngữ cảnh, thêm chụp ảnh, AI có thể giúp bạn giải quyết vấn đề nhanh hơn.**

### 1.2 Cách nói rõ vấn đề

Nhiều người mới biết cần hỏi, nhưng không biết cách nói. Thực ra chỉ cần nói rõ ba điều:

**1. Vừa làm gì**

```
Vừa rồi tôi nhấn nút lưu
Vừa rồi tôi sửa code trang đăng nhập
Vừa rồi tôi làm mới trang
```

**2. Bây giờ thấy gì**

```
Bây giờ trang trống
Bây giờ nút không có phản ứng khi nhấn
Bây giờ hiển thị thông báo lỗi
```

**3. Muốn đạt được hiệu quả gì**

```
Tôi muốn dữ liệu lưu thành công
Tôi muốn trang hiển thị bình thường
Tôi muốn nút bấm hiển thị thông báo
```

**Ví dụ hoàn chỉnh:**

```
Vừa rồi tôi nhấn nút lưu, bây giờ trang hiển thị lỗi "lưu thất bại".

[chụp ảnh]

Tôi muốn lưu dữ liệu biểu mẫu vào cơ sở dữ liệu thành công, phải làm sao?
```

**Nguyên tắc chính:**
- Dùng lời nói bình thường, không dùng thuật ngữ chuyên ngành
- Nói theo thứ tự thời gian: trước tiên làm gì, sau đó xảy ra điều gì
- Nói ra kỳ vọng của bạn, để AI biết bạn muốn gì

## 2. Bước một: mô tả hiện tượng hỏi trực tiếp

Khi gặp vấn đề, <strong>đừng vội mở F12</strong>. Trước tiên mô tả trực tiếp hiện tượng, chụp ảnh trang hiện tại, gửi cho AI xem.

Nhiều lần, AI chỉ cần nhìn chụp ảnh là có thể cho giải pháp trực tiếp.

### 2.1 Cách mô tả hiện tượng phổ biến

::: tip Mô tả trực tiếp

**Trang trắng**
```
Trang mở ra trống trắng, phải làm sao?

[chụp ảnh]
```

**Nút click không có phản ứng**
```
Nhấn nút này không có phản ứng, giúp tôi xem.

[chụp ảnh]
```

**Dữ liệu không lưu được**
```
Nhấn lưu, dữ liệu không lưu, phải làm sao?

[chụp ảnh]
```

**Kiểu dáng hiển thị không đúng**
```
Vị trí nút này sai, phải điều chỉnh như thế nào?

[chụp ảnh]
```

**Lỗi giao diện**
```
Gọi giao diện báo lỗi, giúp tôi xem.

[chụp ảnh]
```

:::

### 2.2 Nếu AI giải quyết trực tiếp

Chúc mừng, vấn đề đã được giải quyết! Sửa theo lời AI đó là xong.

### 2.3 Nếu AI nói "cần thêm thông tin"

Lúc này mới cần mở F12, bổ sung thông tin chính. Tiếp tục xem phần dưới.

## 3. Bước hai: bổ sung thông tin chính

Khi AI nói cần thêm thông tin, theo loại vấn đề, mở F12 để chụp lại nội dung tương ứng.

### 3.1 Khi nào cần bổ sung thông tin

AI có thể trả lời như sau:
- "Mở Console xem có lỗi không"
- "Chụp ảnh Network panel cho tôi xem"
- "Cần xem thông báo lỗi cụ thể"

Lúc này, theo hướng dẫn dưới đây để bổ sung chụp ảnh.

### 3.2 Bổ sung thông tin Console (trang trắng/lỗi)

::: tip Các bước thực hiện

**Bước một: nhấn F12 để mở công cụ phát triển**

Mac là `Cmd+Option+I`, hoặc nhấp chuột phải trang chọn "kiểm tra".

**Bước hai: chuyển sang tab Console**

**Bước ba: chụp ảnh thông báo lỗi màu đỏ**

**Bước bốn: gửi cho AI**

```
Lỗi Console như sau:

[chụp ảnh]
```

:::

### 3.3 Bổ sung thông tin Network (vấn đề dữ liệu/lỗi API)

::: tip Các bước thực hiện

**Bước một: nhấn F12 để mở công cụ phát triển**

**Bước hai: chuyển sang tab Network**

**Bước ba: lặp lại thao tác một lần** (nhấn lưu/làm mới trang)

**Bước bốn: tìm yêu cầu tương ứng, chụp ảnh**

- Xem URL và mã trạng thái
- Xem Payload (tham số được gửi)
- Xem Response (kết quả trả về)

**Bước năm: gửi cho AI**

```
Thông tin Network như sau:

Yêu cầu: [chụp ảnh 1]
Tham số: [chụp ảnh 2]
Kết quả trả về: [chụp ảnh 3]
```

:::

### 3.4 Bổ sung thông tin Elements (vấn đề kiểu dáng)

::: tip Các bước thực hiện

**Bước một: nhấp chuột phải phần tử → "kiểm tra"**

Công cụ phát triển sẽ tự động định vị phần tử.

**Bước hai: chụp ảnh Styles panel**

**Bước ba: gửi cho AI**

```
Kiểu dáng phần tử như sau:

[chụp ảnh]
```

:::

## 4. Bước ba: lặp lại cho đến khi giải quyết

### 4.1 Cách làm không hiệu quả

Những cách này sẽ lãng phí thời gian của bạn:

Thấy lỗi liền hoảng sợ, bắt đầu sửa code tùy tiện
Dành nửa giờ tìm kiếm giải pháp lỗi
Cố gắng hiểu ý nghĩa của mỗi lỗi
Tự gỡ lỗi một mình cho đến hôm kế

### 4.2 Cách làm hiệu quả

Làm theo quy trình này:

Mô tả trực tiếp hiện tượng chụp ảnh hỏi trước
Khi AI nói cần thêm thông tin, hãy mở F12 để bổ sung
Sửa code theo gợi ý
Sau sửa thì kiểm tra, nếu vấn đề vẫn còn thì tiếp tục chụp ảnh hỏi

## 5. Tóm tắt: quy trình hoàn chỉnh

```
Gặp vấn đề
    ↓
Mô tả hiện tượng trực tiếp + chụp ảnh
    ↓
Gửi cho AI: "Phải làm sao?"
    ↓
AI giải quyết trực tiếp?
    ↓ có
Làm theo lời AI
    ↓
Kiểm tra xem có giải quyết không
    ↓
    ↓ không / AI cần thêm thông tin
Mở F12, bổ sung thông tin chính
    ↓
Gửi lại cho AI
    ↓
Lặp lại cho đến khi giải quyết
```
