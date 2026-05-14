# Giới thiệu về hệ thống kiểu

::: tip Lời nói đầu
**Tại sao `"1" + 1` trong JavaScript lại cho ra `"11"`, nhưng trong Python lại báo lỗi ngay? ** Đó là hệ thống kiểu đang hoạt động. Hệ thống kiểu là "luật giao thông" của ngôn ngữ lập trình—nó quyết định dữ liệu có thể dùng như thế nào, có thể tính toán với ai, khi nào thì kiểm tra xem có hợp lệ không. Hiểu rõ hệ thống kiểu, bạn sẽ hiểu được "tính cách khác nhau" của các ngôn ngữ khác nhau.
:::

**Bài viết này sẽ dạy bạn cái gì?**

Sau khi học xong chương này, bạn sẽ nhận được:

- **Khả năng phân loại**: Nắm vững phương pháp phân loại bốn tầng của kiểu tĩnh/động, mạnh/yếu
- **Chẩn đoán vấn đề**: Khi gặp `TypeError` có thể nhanh chóng xác định là kiểu không khớp hay chuyển đổi kiểu ngầm
- **Lựa chọn ngôn ngữ**: Hiểu tại sao TypeScript phù hợp cho dự án lớn, Python phù hợp cho mẫu nhanh
- **Suy diễn kiểu**: Hiểu cách ngôn ngữ hiện đại kết hợp sự ngắn gọn và an toàn
- **Ý thức thực hành**: Nắm vững thói quen mã hóa an toàn kiểu

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|------------------|
| **Chương 1** | Hệ thống kiểu là gì | Bản chất của kiểu, tại sao cần kiểu |
| **Chương 2** | Kiểu tĩnh vs kiểu động | Thời điểm kiểm tra, hỗ trợ IDE, an toàn |
| **Chương 3** | Kiểu mạnh vs kiểu yếu | Chuyển đổi ngầm, an toàn kiểu |
| **Chương 4** | Suy diễn kiểu | Suy diễn tự động, hai mặt tốt nhất |
| **Chương 5** | Kiểu chung: Viết một lần, áp dụng cho tất cả kiểu | Tham số kiểu, ràng buộc kiểu, tái sử dụng |
| **Chương 6** | An toàn kiểu thực hành | Cạm bẫy phổ biến, chiến lược phòng chống |
| **Chương 7** | Sơ đồ bốn tầng kiểu ngôn ngữ | Phân loại bốn tầng, lựa chọn ngôn ngữ |

---

## 0. Toàn cảnh: Kiểu là "thẻ căn cước" của dữ liệu

Trong thế giới thực, bạn sẽ không nhét một cuốn sách vào ly cà phê—vì chúng là những thứ có "kiểu" khác nhau. Thế giới lập trình cũng vậy: số, chuỗi, giá trị boolean, mảng……mỗi loại dữ liệu đều có "danh tính" riêng, quyết định nó có thể tham gia vào phép tính nào.

**Hệ thống kiểu** là tập hợp các quy tắc mà ngôn ngữ lập trình dùng để quản lý những "danh tính" này. Nó trả lời hai câu hỏi cốt lõi:

::: tip Hai câu hỏi cốt lõi của hệ thống kiểu
- **Khi nào kiểm tra?** Là kiểm tra khi viết mã (kiểu tĩnh), hay chỉ kiểm tra khi chạy (kiểu động)?
- **Nghiêm ngặt đến mức nào?** Là cấm dùng chung một cách chặt chẽ (kiểu mạnh), hay tự động giúp bạn chuyển đổi (kiểu yếu)?
:::

---

## 1. Hệ thống kiểu là gì: Luật giao thông của dữ liệu

<TypeSystemDemo />

Bản chất của hệ thống kiểu là một tập hợp **các quy tắc ràng buộc**, nó cho trình biên dịch hoặc trình thông dịch biết:

- Biến này có thể lưu trữ giá trị gì?
- Hai giá trị này có thể cộng được không?
- Tham số của hàm này nên là gì?

Một thế giới không có hệ thống kiểu giống như một con đường không có luật giao thông—bất kỳ dữ liệu nào cũng có thể tính toán với bất kỳ dữ liệu nào, kết quả hoàn toàn không thể dự đoán.

| Tác dụng của hệ thống kiểu | Giải thích | Ví dụ |
|--------------------------|-----------|-------|
| Ngăn chặn phép tính bất hợp pháp | Chặn những hoạt động không có ý nghĩa | Không thể chia một chuỗi |
| Cung cấp thông tin tài liệu | Kiểu là tài liệu tốt nhất | `function add(a: number, b: number)` rõ ràng |
| Hỗ trợ công cụ IDE | Tự động hoàn thành, tái cấu trúc, nhảy tới | Gõ `user.` tự động gợi ý tất cả thuộc tính |
| Tối ưu hóa hiệu suất | Trình biên dịch có thể tạo mã nhanh hơn khi biết kiểu | Biết là số nguyên thì dùng lệnh số nguyên |

---

## 2. Kiểu tĩnh vs kiểu động: Khi nào kiểm tra?

Đây là chiều phân loại quan trọng nhất của hệ thống kiểu—**thời điểm kiểm tra**.

<StaticVsDynamicDemo />

::: tip Sự khác biệt cốt lõi
- **Kiểu tĩnh**: Kiểu của biến được xác định tại thời điểm biên dịch, viết xong mã, chưa chạy đã tìm thấy lỗi kiểu. Đại diện: Java, TypeScript, Rust, Go.
- **Kiểu động**: Kiểu của biến được xác định tại thời điểm chạy, cùng một biến có thể trước lưu số rồi sau lưu chuỗi. Đại diện: Python, JavaScript, Ruby, PHP.
:::

| Chiều | Kiểu tĩnh | Kiểu động |
|------|----------|----------|
| Thời điểm kiểm tra | Thời biên dịch (kiểm tra trước khi chạy) | Thời chạy (kiểm tra khi chạy tới dòng đó) |
| Phát hiện bug | Sớm (biết ngay khi viết xong) | Muộn (người dùng vận hành mới lộ) |
| Tính linh hoạt | Thấp hơn (kiểu cố định) | Cao hơn (kiểu có thể thay đổi) |
| Hỗ trợ IDE | Tốt (tự động hoàn thành, tái cấu trúc) | Yếu hơn (chỉ biết kiểu khi chạy) |
| Tốc độ phát triển | Đầu vào chậm (phải viết kiểu) | Đầu vào nhanh (không cần quan tâm kiểu) |
| Chi phí bảo trì | Thấp (kiểu là tài liệu) | Cao (thiếu thông tin kiểu) |

::: tip Xu hướng: Ngôn ngữ động đang "tĩnh hóa"
Python thêm Type Hints, cộng đồng JavaScript chuyển sang TypeScript—ngôn ngữ động cũng đang áp dụng các lợi ích của kiểu tĩnh. Điều này cho thấy rằng trong các dự án lớn, ưu thế an toàn của kiểu tĩnh ngày càng được thừa nhận.
:::

---

## 3. Kiểu mạnh vs kiểu yếu: Có cho phép "chuyển đổi lén lút" không?

Chiều phân loại thứ hai là **mức độ nghiêm ngặt của chuyển đổi kiểu**.

<StrongVsWeakDemo />

::: tip Sự khác biệt cốt lõi
- **Kiểu mạnh**: Không cho phép chuyển đổi kiểu ngầm, kiểu không khớp thì báo lỗi. Bạn phải tường minh cho ngôn ngữ biết "tôi muốn chuyển chuỗi thành số".
- **Kiểu yếu**: Cho phép chuyển đổi kiểu ngầm, ngôn ngữ sẽ "tốt bụng" tự động chuyển đổi. Nhưng "tốt bụng" này thường mang lại bug không ngờ.
:::

| Chiều | Kiểu mạnh | Kiểu yếu |
|------|----------|---------|
| `"1" + 1` | Báo lỗi hoặc cần chuyển đổi tường minh | Tự động chuyển đổi (có thể được `"11"` hoặc `2`) |
| An toàn | Cao (không bị lỗi lén lút) | Thấp (chuyển đổi ngầm có thể gây bug) |
| Tiện lợi | Thấp (cần chuyển đổi thủ công) | Cao (chuyển đổi tự động tiết kiệm công) |
| Tính dự đoán | Cao (hành vi chắc chắn) | Thấp (quy tắc chuyển đổi phức tạp) |

---

## 4. Suy diễn kiểu: Giải pháp kết hợp tốt nhất của thời đại hiện đại

Các ngôn ngữ kiểu tĩnh sơ khai (như Java) yêu cầu bạn tường minh khai báo kiểu của mỗi biến, viết rất啰嗦. Ngôn ngữ hiện đại giải quyết vấn đề này thông qua **suy diễn kiểu**—trình biên dịch tự động suy ra kiểu, bạn không cần viết, nhưng nó giúp bạn kiểm tra chặt chẽ.

<TypeInferenceFlowDemo />

::: tip Giá trị của suy diễn kiểu
Viết như ngôn ngữ động vậy ngắn gọn, trình biên dịch kiểm tra như ngôn ngữ tĩnh vậy chặt chẽ. Đây là hướng chính của ngôn ngữ lập trình hiện đại.
- **TypeScript**: `let x = 42` tự động suy ra là `number`
- **Rust**: `let v = vec![1, 2, 3]` tự động suy ra là `Vec<i32>`
- **Kotlin**: `val name = "Alice"` tự động suy ra là `String`
- **Go**: `x := 42` khai báo biến ngắn tự động suy ra kiểu
:::

---

## 5. Kiểu chung: Viết một lần, áp dụng cho tất cả kiểu

Khi bạn viết một hàm "lấy phần tử đầu tiên của mảng", bạn sẽ phát hiện: mảng số cần viết một hàm, mảng chuỗi cần viết một hàm, mảng đối tượng lại cần viết một hàm……mã hoàn toàn giống nhau, chỉ khác kiểu. **Kiểu chung (Generics)** chính là giải pháp cho vấn đề này—dùng một "tham số kiểu" thay cho kiểu cụ thể, để một phần mã áp dụng được cho tất cả kiểu.

<GenericTypeDemo />

::: tip Giá trị cốt lõi của kiểu chung
- **Tái sử dụng mã**: Một hàm/lớp áp dụng được cho tất cả kiểu, không cần viết lại
- **An toàn kiểu**: Khác với `any` bỏ qua kiểm tra kiểu, kiểu chung luôn giữ thông tin kiểu
- **Ràng buộc kiểu**: Dùng `extends` giới hạn phạm vi của kiểu chung, vừa linh hoạt vừa an toàn
:::

| Tính năng kiểu chung | Giải thích | Ví dụ |
|-------------------|-----------|-------|
| Hàm kiểu chung | Tham số/giá trị trả về của hàm dùng tham số kiểu | `function first<T>(arr: T[]): T` |
| Lớp kiểu chung | Thuộc tính/phương thức của lớp dùng tham số kiểu | `class Box<T> { value: T }` |
| Ràng buộc kiểu chung | Dùng extends giới hạn phạm vi của T | `<T extends HasLength>` |
| Nhiều tham số kiểu | Dùng đồng thời nhiều biến kiểu | `function pair<K, V>(k: K, v: V)` |

---

## 6. An toàn kiểu thực hành: Cạm bẫy phổ biến và phòng chống

Học xong lý thuyết, bây giờ xem các cạm bẫy dễ bước vào nhất trong phát triển thực tế. Những cạm bẫy này không phân biệt ngôn ngữ, hầu như mọi lập trình viên đều sẽ gặp.

<TypeSafetyPracticeDemo />

::: tip Bốn quy tắc vàng của an toàn kiểu
1. **Bật chế độ nghiêm ngặt**: `strict: true` của TypeScript, `mypy --strict` của Python
2. **Tránh any**: Dùng `unknown` thay cho `any`, buộc bạn kiểm tra kiểu rồi mới dùng
3. **Xử lý null tường minh**: Dùng optional chaining `?.` và null coalescing `??` để truy cập an toàn
4. **Định nghĩa giao diện cho API**: Dữ liệu ngoài không bao giờ đáng tin, dùng giao diện + xác thực lúc chạy bảo vệ kép
:::

| Cạm bẫy | Mức độ nguy hiểm | Phương pháp phòng chống |
|-------|-----------------|----------------------|
| Tham chiếu null/undefined | ⭐⭐⭐⭐⭐ | strictNullChecks + optional chaining |
| Lạm dụng kiểu any | ⭐⭐⭐⭐ | Dùng unknown + type guard |
| Chuyển đổi kiểu ngầm | ⭐⭐⭐ | So sánh chặt chẽ === + ESLint |
| Mảng kiểu không nhất quán | ⭐⭐⭐ | Khai báo tường minh kiểu phần tử mảng |

---

## 7. Sơ đồ bốn tầng kiểu ngôn ngữ: "Vẽ chân dung" cho ngôn ngữ lập trình

Kết hợp hai chiều "kiểu tĩnh/động" và "kiểu mạnh/yếu", bạn sẽ có một sơ đồ phân loại bốn tầng. Mỗi ngôn ngữ lập trình đều có thể xếp vào sơ đồ này.

<LanguageTypeModelDemo />

| Tầng | Đặc điểm | Ngôn ngữ đại diện | Tình huống áp dụng |
|-----|---------|-----------------|-------------------|
| Tĩnh + Kiểu mạnh | An toàn nhất, kiểm tra chặt chẽ tại thời biên dịch | Rust, Java, Haskell | Hệ thống lớn, quan trọng về an toàn |
| Tĩnh + Kiểu yếu | Kiểm tra lúc biên dịch nhưng cho phép chuyển đổi ngầm | C, C++ | Lập trình hệ thống, nhạy cảm hiệu suất |
| Động + Kiểu mạnh | Kiểm tra lúc chạy, không cho phép chuyển đổi ngầm | Python, Ruby | Tập lệnh, mẫu nhanh |
| Động + Kiểu yếu | Linh hoạt nhất, cũng dễ bug nhất | JavaScript, PHP | Frontend web, tập lệnh nhỏ |

::: tip Không có "hệ thống kiểu tốt nhất"
Khi chọn ngôn ngữ, hệ thống kiểu là một trong những yếu tố xem xét quan trọng:
- **Mẫu nhanh**: Kiểu động (Python) phát triển nhanh
- **Dự án lớn**: Kiểu tĩnh (TypeScript, Java) chi phí bảo trì thấp
- **Lập trình hệ thống**: Kiểu mạnh + tĩnh (Rust) an toàn nhất
- **Hợp tác đội nhóm**: Kiểu tĩnh cung cấp khả năng đọc mã tốt hơn và hỗ trợ IDE tốt hơn
:::

---

## Tóm tắt

Hệ thống kiểu là quan điểm chính để hiểu sự khác biệt của các ngôn ngữ lập trình. Nó không phải là lý thuyết tẻ nhạt, mà ảnh hưởng trực tiếp tới trải nghiệm viết mã và chất lượng mã của bạn.

Nhìn lại những điểm chính của chương:

1. **Kiểu là thẻ căn cước**: Mỗi loại dữ liệu đều có kiểu, kiểu quyết định dữ liệu có thể tham gia vào phép tính nào
2. **Kiểu tĩnh vs kiểu động**: Khi nào kiểm tra kiểu—lúc biên dịch hay lúc chạy
3. **Kiểu mạnh vs kiểu yếu**: Có cho phép chuyển đổi kiểu ngầm hay không
4. **Suy diễn kiểu**: Ngôn ngữ hiện đại cho bạn thưởng thức sự ngắn gọn của kiểu động và an toàn của kiểu tĩnh
5. **Kiểu chung**: Dùng tham số kiểu thực hiện tái sử dụng mã, kết hợp linh hoạt và an toàn kiểu
6. **An toàn kiểu thực hành**: Tham chiếu null, lạm dụng any, chuyển đổi ngầm là những cạm bẫy kiểu phổ biến nhất
7. **Sơ đồ bốn tầng**: Không có hệ thống kiểu tốt nhất, chỉ có lựa chọn phù hợp với tình huống

## Đọc thêm

- [Tài liệu chính thức TypeScript](https://www.typescriptlang.org/docs/) - Phần mở rộng kiểu tĩnh cho JavaScript phổ biến nhất
- [Type Hints trong Python](https://docs.python.org/3/library/typing.html) - Hệ thống gợi ý kiểu của Python
- [Rust Book - Data Types](https://doc.rust-lang.org/book/ch03-02-data-types.html) - Giới thiệu hệ thống kiểu Rust
- [Type Systems (Wikipedia)](https://en.wikipedia.org/wiki/Type_system) - Tổng quan học thuật về hệ thống kiểu
- [What To Know Before Debating Type Systems](https://cdsmith.wordpress.com/2011/01/09/an-old-article-i-wrote/) - Thảo luận kinh điển về hệ thống kiểu
