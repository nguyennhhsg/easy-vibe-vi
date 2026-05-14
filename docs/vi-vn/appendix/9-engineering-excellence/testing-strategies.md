# Chiến lược kiểm thử

::: tip Lời mở đầu
**Mã của bạn thực sự "không có vấn đề"?** Mỗi lần chỉnh sửa xong mã, bạn lại phải nhấp chuột thủ công để kiểm tra xem có bị hỏng không——cách làm này có thể tạm ổn khi dự án nhỏ, nhưng khi lượng mã tăng lên hàng vạn dòng và đội ngũ mở rộng đến mười mấy người, "nhấp chuột thủ công để xem" trở thành một thảm họa.

Chương này sẽ giúp bạn hiểu các chiến lược cơ bản của kiểm thử phần mềm, từ kim tự tháp kiểm thử đến TDD, xây dựng tư duy bảo đảm chất lượng một cách hệ thống.
:::

**Bài viết này sẽ dạy bạn những gì?**

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|----------|-------------------|
| **Chương 1** | Kim tự tháp kiểm thử | Các tầng và tỷ lệ kiểm thử |
| **Chương 2** | Thực hành kiểm thử đơn vị | Cách viết một bài kiểm thử tốt |
| **Chương 3** | Phát triển hướng kiểm thử (TDD) | Vòng lặp đỏ-xanh-tái cấu trúc |
| **Chương 4** | Lựa chọn chiến lược kiểm thử | Giải pháp cho các kịch bản khác nhau |

Sau khi học xong chương này, bạn sẽ hiểu cách chọn chiến lược kiểm thử phù hợp cho dự án, viết các bài kiểm thử có giá trị, và nâng cao chất lượng thiết kế mã thông qua TDD.

---

## 0. Toàn cảnh: Tại sao cần kiểm thử tự động?

Tưởng tượng bạn là một kỹ sư xây dựng. Mỗi lần chỉnh sửa bản vẽ, bạn không tự mình leo lên từng tầng nhà để kiểm tra xem cấu trúc có an toàn không——bạn sẽ dựa vào một **hệ thống kiểm tra tự động**. Kiểm thử phần mềm chính là "hệ thống kiểm tra cấu trúc" của thế giới mã.

::: tip Giá trị của kiểm thử tự động
- **Bảo vệ hồi quy**: Khi sửa chức năng A, tự động kiểm tra xem các chức năng B, C, D có bị ảnh hưởng không
- **Sự tự tin khi tái cấu trúc**: Mã được bao phủ bởi các bài kiểm thử sẽ cho bạn cảm giác an tâm khi tái cấu trúc
- **Tài liệu sống**: Các bài kiểm thử tốt chính là hướng dẫn sử dụng tốt nhất
- **Phản hồi nhanh chóng**: Biết trong vài giây liệu mã có đúng không, thay vì đợi cho đến khi triển khai mới phát hiện vấn đề
:::

---

## 1. Kim tự tháp kiểm thử: Các tầng và tỷ lệ kiểm thử

### 1.1 Kim tự tháp ba tầng

Kim tự tháp kiểm thử do Mike Cohn đề xuất là mô hình cổ điển cho chiến lược kiểm thử. Nó cho chúng ta biết: **các loại kiểm thử khác nhau nên có tỷ lệ số lượng khác nhau**.

Thông qua thành phần tương tác bên dưới, nhấp vào từng tầng của kim tự tháp để tìm hiểu đặc điểm của mỗi tầng kiểm thử:

<TestPyramidDemo />

### 1.2 Tại sao lại là hình kim tự tháp?

Hình dạng kim tự tháp phản ánh một sự cân bằng cốt lõi: **sự cân bằng giữa tốc độ và độ chính xác**.

- **Tầng dưới (kiểm thử đơn vị)**: Cực nhanh, số lượng nhiều nhất, chi phí thấp nhất, nhưng chỉ có thể xác minh các bộ phận riêng lẻ
- **Tầng giữa (kiểm thử tích hợp)**: Tốc độ vừa phải, số lượng vừa phải, xác minh sự hợp tác giữa các bộ phận
- **Tầng trên (kiểm thử E2E)**: Gần nhất với người dùng thực, nhưng tốc độ chậm, chi phí bảo trì cao, dễ bị lỗi do vấn đề môi trường

> **Anti-pattern: Ốc quế kem** —— Nếu dự án của bạn có nhiều bài kiểm thử E2E nhất và kiểm thử đơn vị ít nhất, thì đó là "ốc quế kem" bị lật ngược. Điều này có nghĩa là bộ kiểm thử chạy chậm, thường xuyên bị lỗi, chi phí bảo trì cực cao.

---

## 2. Thực hành kiểm thử đơn vị

### 2.1 Kiểm thử đơn vị tốt là gì?

Các bài kiểm thử đơn vị tốt tuân theo nguyên tắc **FIRST**:

| Nguyên tắc | Ý nghĩa | Giải thích |
|-----------|---------|-----------|
| **F**ast | Nhanh chóng | Hoàn thành trong vài mili giây, nhà phát triển sẵn sàng chạy thường xuyên |
| **I**ndependent | Độc lập | Các bài kiểm thử không phụ thuộc vào nhau, có thể chạy riêng lẻ |
| **R**epeatable | Có thể lặp lại | Kết quả chạy nhất quán trong mọi môi trường |
| **S**elf-validating | Tự xác thực | Kết quả rõ ràng là thành công/thất bại, không cần phán xét bằng tay |
| **T**imely | Kịp thời | Viết các bài kiểm thử cùng lúc (hoặc trước) khi viết mã |

### 2.2 Cấu trúc kiểm thử: Mô hình AAA

Mỗi bài kiểm thử nên có cấu trúc ba phần rõ ràng:

```javascript
test('Nên tính toán chính xác giá có thuế', () => {
  // Arrange (Chuẩn bị) —— Thiết lập dữ liệu kiểm thử
  const price = 100
  const taxRate = 0.13

  // Act (Thực thi) —— Gọi hàm được kiểm thử
  const result = calculateTotalWithTax(price, taxRate)

  // Assert (Khẳng định) —— Xác minh kết quả
  expect(result).toBe(113)
})
```

### 2.3 Kiểm thử cái gì? Không kiểm thử cái gì?

**Nên kiểm thử:**
- Logic kinh doanh cốt lõi (tính toán giá, xác định quyền, chuyển đổi dữ liệu)
- Điều kiện biên (giá trị rỗng, không, số âm, số rất lớn)
- Đường dẫn xử lý lỗi

**Không cần kiểm thử:**
- Triển khai nội bộ của thư viện bên thứ ba
- Getter/setter đơn giản
- Tính năng của chính framework (chẳng hạn như hệ thống phản ứng của Vue)

---

## 3. TDD: Phát triển hướng kiểm thử

### 3.1 Vòng lặp đỏ-xanh-tái cấu trúc

Lõi của TDD (Test-Driven Development) là một vòng lặp đơn giản: **viết bài kiểm thử trước, sau đó viết triển khai, cuối cùng tái cấu trúc**.

Thông qua thành phần tương tác bên dưới, bạn sẽ trực tiếp trải nghiệm toàn bộ vòng lặp TDD:

<TDDCycleDemo />

### 3.2 Ba quy tắc của TDD

1. **Không viết bất kỳ mã sản phẩm nào, trừ khi là để vượt qua một bài kiểm thử bị lỗi**
2. **Chỉ viết bài kiểm thử code đủ để làm cho bài kiểm thử bị lỗi** (không biên dịch cũng được coi là lỗi)
3. **Chỉ viết mã sản phẩm đủ để làm cho bài kiểm thử thành công**

### 3.3 Giá trị thực sự của TDD

Giá trị của TDD không chỉ nằm ở "viết bài kiểm thử trước", mà còn ở chỗ nó **bắt buộc bạn phải suy nghĩ về thiết kế giao diện**. Khi bạn viết bài kiểm thử trước, bạn đang suy nghĩ từ góc độ "người dùng": hàm này nên nhận những tham số nào? Trả về kết quả gì? Điều này tự nhiên sẽ dẫn đến thiết kế API tốt hơn.

::: tip TDD không phải là viên đạn thần kỳ
TDD phù hợp với mã logic-heavy (thuật toán, quy tắc kinh doanh, chuyển đổi dữ liệu), nhưng đối với các tình huống như bố cục UI, prototyping khám phá, TDD bắt buộc lại sẽ làm chậm tốc độ. Chìa khóa là hiểu được ý tưởng của nó và sử dụng một cách linh hoạt.
:::

---

## 4. Lựa chọn chiến lược kiểm thử

### 4.1 Trọng tâm kiểm thử của các dự án khác nhau

| Loại dự án | Trọng tâm kiểm thử | Tỷ lệ được đề xuất |
|-----------|-----------------|------------------|
| **Thư viện công cụ/SDK** | Kiểm thử đơn vị chủ yếu | 90% đơn vị + 10% tích hợp |
| **Dịch vụ API** | Kiểm thử tích hợp chủ yếu | 30% đơn vị + 60% tích hợp + 10% E2E |
| **Ứng dụng web** | Phân phối cân bằng | 50% đơn vị + 30% tích hợp + 20% E2E |
| **MVP/Prototype** | E2E đường dẫn chính | Chỉ cần một số kiểm thử lõi |

### 4.2 Công cụ kiểm thử phổ biến

| Công cụ | Loại | Tình huống phù hợp |
|--------|------|-------------------|
| **Vitest** | Đơn vị/Tích hợp | Lựa chọn hàng đầu cho dự án Vite, tương thích API Jest |
| **Jest** | Đơn vị/Tích hợp | Công cụ phổ biến nhất trong hệ sinh thái Node.js |
| **Playwright** | E2E | Đa trình duyệt, do Microsoft tạo ra |
| **Cypress** | E2E | Trải nghiệm phát triển tốt, gỡ lỗi thuận tiện |
| **Testing Library** | Kiểm thử thành phần | Kiểm thử thành phần UI từ góc độ người dùng |

---

## 5. AI hỗ trợ: Nâng cao hiệu quả kiểm thử bằng mô hình ngôn ngữ lớn

Khả năng của mô hình ngôn ngữ lớn trong lĩnh vực kiểm thử đã cực kỳ mạnh mẽ——nó có thể giúp bạn tạo các trường hợp kiểm thử, khám phá điều kiện biên, thậm chí viết mã kiểm thử hoàn chỉnh.

### 5.1 Tạo bài kiểm thử đơn vị

> **Lời nhắc:**
> ```
> Vui lòng viết các bài kiểm thử đơn vị cho hàm sau, sử dụng framework Vitest, yêu cầu:
> 1. Tuân theo mô hình AAA (Arrange-Act-Assert)
> 2. Bao gồm đường dẫn bình thường, điều kiện biên và đường dẫn xử lý lỗi
> 3. Mỗi trường hợp kiểm thử có mô tả rõ ràng bằng tiếng Việt
>
> [Dán mã hàm của bạn ở đây]
> ```

### 5.2 Khám phá điều kiện biên

> **Lời nhắc:**
> ```
> Phân tích hàm sau, liệt kê tất cả các điều kiện biên có thể xảy ra và các kịch bản đầu vào cực đoan,
> bao gồm: giá trị rỗng, không, số âm, số rất lớn, ký tự đặc biệt, các tình huống song song, v.v.
> Đối với mỗi kịch bản, giải thích hành vi dự kiến và những rủi ro tiềm ẩn.
>
> [Dán mã hàm của bạn ở đây]
> ```

### 5.3 Tạo bài kiểm thử từ yêu cầu (hỗ trợ TDD)

> **Lời nhắc:**
> ```
> Tôi muốn triển khai một mô-đun giỏ hàng, yêu cầu như sau:
> - Thêm sản phẩm, xóa sản phẩm, sửa đổi số lượng
> - Tự động tính toán tổng giá (bao gồm chiết khấu)
> - Hiển thị lỗi khi tồn kho không đủ
>
> Vui lòng theo suy nghĩ TDD, viết các trường hợp kiểm thử trước (không viết triển khai),
> sử dụng Vitest, bao gồm tất cả các kịch bản lõi.
> ```

::: tip Gợi ý sử dụng AI
Kiểm tra xem các khẳng định trong bài kiểm thử do AI tạo ra có ý nghĩa không——tránh các bài kiểm thử vô dụng như `expect(true).toBe(true)`. Các bài kiểm thử tốt phải thực sự có thể thất bại khi mã sai.
:::

---

## 6. Tóm tắt

1. **Kim tự tháp kiểm thử**: Nhiều ở tầng dưới, ít ở tầng trên, cân bằng tốc độ và độ chính xác
2. **Kiểm thử đơn vị**: Tuân theo nguyên tắc FIRST và mô hình AAA, kiểm thử logic cốt lõi
3. **TDD**: Vòng lặp đỏ-xanh-tái cấu trúc, sử dụng kiểm thử để hướng dẫn thiết kế
4. **Lựa chọn chiến lược**: Dựa trên loại dự án và giai đoạn, chọn tỷ lệ kiểm thử phù hợp

::: tip Suy tư cuối cùng
Kiểm thử không phải là gánh nặng, mà là **tăng tốc**. Nhìn ngắn hạn, viết bài kiểm thử thực sự mất thêm thời gian; nhìn dài hạn, nó tiết kiệm vô số lần xác minh thủ công, điều tra lỗi hồi quy và sửa chữa khẩn cấp lúc nửa đêm. Các bài kiểm thử tốt cho phép bạn nói ra những lời này một cách tự tin: **"Cứ thoải mái sửa đổi, các bài kiểm thử sẽ cho chúng ta biết có vấn đề không."**
:::

---

## Đọc thêm

- **Sách cổ điển**: "Test Driven Development" của Kent Beck là tác phẩm khai sáng của TDD.
- **Hướng dẫn thực tế**: Thử viết các bài kiểm thử cho một dự án nhỏ bằng Vitest, trải nghiệm quy trình kiểm thử từ đầu.
- **Mô hình kiểm thử**: Tìm hiểu sự khác biệt và các trường hợp sử dụng của Mock, Stub, Spy.
- **Tích hợp liên tục**: Tích hợp các bài kiểm thử vào đường ống CI/CD, chạy tự động mỗi lần commit.
