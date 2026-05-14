# Giới thiệu về Nguyên lý Biên dịch

::: tip Lời mở đầu
**Khi bạn nhấn nút "Chạy", mã nguồn được chuyển thành kết quả trên màn hình như thế nào?** Mỗi dòng mã bạn viết, máy tính thực sự "không hiểu" — nó chỉ nhận biết 0 và 1. Bộ biên dịch chính là "thông dịch viên" dịch ngôn ngữ con người thành ngôn ngữ máy. Hiểu rõ nguyên lý biên dịch, bạn sẽ nắm được lỗi lầm từ đâu, tại sao một số ngôn ngữ nhanh hơn những ngôn ngữ khác, và logic cơ bản của tối ưu hóa mã.
:::

**Chương này sẽ dạy bạn những gì?**

Sau khi học xong chương này, bạn sẽ có:

- **Tầm nhìn toàn cảnh**: Nắm vững toàn bộ quy trình biên dịch từ mã nguồn đến chương trình có thể thực thi
- **Phân tích từ vựng**: Hiểu cách bộ biên dịch chia nhỏ mã thành từng Token
- **Phân tích cú pháp**: Hiểu quá trình xây dựng AST (Cây cú pháp trừu tượng)
- **Trực quan hóa AST**: Nhìn trực tiếp cấu trúc cây của mã
- **Phân tích ngữ nghĩa và tối ưu hóa**: Hiểu nguyên lý của kiểm tra kiểu dữ liệu và tối ưu hóa mã
- **Thực hành kỹ thuật tối ưu hóa**: Nắm các kỹ thuật tối ưu cơ bản như constant folding, dead code elimination
- **Mô hình thực thi**: Phân biệt ba cách thực thi: biên dịch, giải thích và JIT

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|------------------|
| **Chương 1** | Bộ biên dịch là gì | Phép so sánh thông dịch viên, quy trình biên dịch |
| **Chương 2** | Phân tích từ vựng | Token, quy tắc từ vựng |
| **Chương 3** | Phân tích cú pháp | AST, cây cú pháp, độ ưu tiên |
| **Chương 4** | Trực quan hóa AST | Cây cú pháp tương tác, kiểu nút |
| **Chương 5** | Phân tích ngữ nghĩa và tối ưu hóa | Kiểm tra kiểu, constant folding, dead code elimination |
| **Chương 6** | Thực hành kỹ thuật tối ưu hóa | Inline function, loop hoisting, constant propagation |
| **Chương 7** | Biên dịch vs Giải thích vs JIT | So sánh ba mô hình thực thi |

---

## 0. Bức tranh toàn cảnh: "Hành trình dịch" của mã

Hãy tưởng tượng bạn là một thông dịch viên, cần dịch một cuốn tiểu thuyết tiếng Trung thành tiếng Anh. Bạn sẽ không dịch từng chữ một cách máy móc, mà thay vào đó:

1. **Nhận diện từ** — Chia câu thành từng từ (phân tích từ vựng)
2. **Hiểu cú pháp** — Xác định xem cấu trúc câu có đúng không (phân tích cú pháp)
3. **Hiểu ngữ nghĩa** — Đảm bảo ý nghĩa rõ ràng, không mâu thuẫn (phân tích ngữ nghĩa)
4. **Chỉnh sửa và tối ưu** — Làm cho bản dịch tự nhiên và mượt mà hơn (tối ưu hóa mã)
5. **Xuất bản dịch** — Viết bản tiếng Anh cuối cùng (tạo mã)

Bộ biên dịch làm điều tương tự, chỉ khác là nó dịch ngôn ngữ lập trình.

<CompilerAnalogyDemo />

---

## 1. Sáu bước quy trình biên dịch của bộ biên dịch

Công việc của bộ biên dịch có thể chia thành sáu giai đoạn, giống như dây chuyền sản xuất ở nhà máy, mỗi giai đoạn xử lý xong rồi chuyển cho giai đoạn tiếp theo.

<CompilerDemo />

::: tip Quy trình biên dịch
1. **Phân tích từ vựng (Lexical Analysis)**: Chia nhỏ mã nguồn thành từng Token (đơn vị từ vựng)
2. **Phân tích cú pháp (Syntax Analysis)**: Tổ chức các Token thành cây cú pháp (AST)
3. **Phân tích ngữ nghĩa (Semantic Analysis)**: Kiểm tra kiểu dữ liệu, xem biến đã được khai báo chưa
4. **Tạo mã trung gian (IR Generation)**: Tạo biểu diễn trung gian độc lập với nền tảng
5. **Tối ưu hóa mã (Optimization)**: Làm cho mã trung gian hiệu quả hơn
6. **Tạo mã (Code Generation)**: Tạo mã máy cho nền tảng đích
:::

| Giai đoạn | Đầu vào | Đầu ra | Phép so sánh |
|-----------|---------|--------|-------------|
| Phân tích từ vựng | Dòng ký tự mã nguồn | Dòng Token | Chia câu thành từ |
| Phân tích cú pháp | Dòng Token | AST (cây cú pháp) | Phân tích cấu trúc câu |
| Phân tích ngữ nghĩa | AST | AST có kiểu | Kiểm tra ý nghĩa có hợp lý không |
| Mã trung gian | AST có kiểu | IR | Viết nháp |
| Tối ưu hóa mã | IR | IR đã tối ưu | Chỉnh sửa và xóa bỏ |
| Tạo mã | IR đã tối ưu | Mã máy | Xuất bản cuối cùng |

---

## 2. Phân tích từ vựng: Chia nhỏ mã thành "từ"

Phân tích từ vựng là bước đầu tiên của quá trình biên dịch. Bộ biên dịch quét mã nguồn từ trái sang phải, từng ký tự một, kết hợp chúng thành **Token (đơn vị từ vựng)** có ý nghĩa.

<LexerTokenDemo />

Giống như khi đọc câu tiếng Anh, não bộ của bạn tự động kết hợp các chữ cái thành từ, bộ phân tích từ vựng kết hợp các ký tự thành Token:

```
Mã nguồn: let x = 10 + 5;

Dòng Token:
[let]   → Từ khóa (từ được ngôn ngữ dự trữ)
[x]     → Định danh (tên biến)
[=]     → Toán tử (gán)
[10]    → Hằng số số
[+]     → Toán tử (cộng)
[5]     → Hằng số số
[;]     → Dấu phân cách (kết thúc câu lệnh)
```

::: tip Năm loại Token
- **Từ khóa**: Từ đặc biệt được dự trữ bởi ngôn ngữ, như `let`, `if`, `return`, `function`
- **Định danh**: Tên do lập trình viên định nghĩa, như tên biến, tên hàm
- **Hằng số**: Các giá trị được viết trực tiếp trong mã, như số `42`, chuỗi `"hello"`
- **Toán tử**: Ký hiệu thực hiện phép tính, như `+`, `-`, `=`, `===`
- **Dấu phân cách**: Ký hiệu tách biệt cấu trúc mã, như `;`, `,`, `(`, `)`
:::

---

## 3. Phân tích cú pháp: Xây dựng cây cú pháp (AST)

Phân tích từ vựng chia nhỏ mã thành Token, nhưng Token chỉ là những "từ" đơn lẻ. Nhiệm vụ của phân tích cú pháp là tổ chức các Token này theo quy tắc cú pháp, xây dựng thành một **cây cú pháp trừu tượng (Abstract Syntax Tree, AST)** — nó phản ánh cấu trúc và độ ưu tiên của các phép tính trong mã.

```
Biểu thức: 1 + 2 * 3

Cây cú pháp:    Tại sao như vậy?
       +        Vì * có độ ưu tiên
      / \       cao hơn +, nên
     1   *      2 * 3 kết hợp trước
        / \     thành một cây con
       2   3
```

::: tip Tầm quan trọng của AST
AST là "cấu trúc dữ liệu lõi" của bộ biên dịch, các giai đoạn phân tích ngữ nghĩa, tối ưu hóa, tạo mã đều dựa vào nó. Công cụ phát triển hiện đại cũng sử dụng rộng rãi AST:
- **ESLint**: Phân tích mã thành AST, kiểm tra các vi phạm quy tắc
- **Prettier**: Phân tích thành AST rồi định dạng lại đầu ra
- **Babel**: Phân tích AST → chuyển đổi → tạo mã tương thích
- **IDE refactoring**: Đổi tên biến an toàn, trích xuất hàm dựa trên AST
:::

| Cấu trúc cú pháp | Dãy Token | Nút AST |
|-----------------|----------|--------|
| Khai báo biến | `let` `x` `=` `10` | VariableDeclaration → Identifier + Literal |
| Gọi hàm | `add` `(` `1` `,` `2` `)` | CallExpression → Identifier + Arguments |
| Câu lệnh điều kiện | `if` `(` `a` `>` `b` `)` | IfStatement → BinaryExpression + Block |

---

## 4. Trực quan hóa AST: Nhìn "bộ xương" của mã

Trên đây chúng ta đã mô tả cấu trúc AST bằng chữ, nhưng "nhìn thấy" tốt hơn "đọc" nhiều. Thành phần tương tác dưới đây cho phép bạn chọn những biểu thức khác nhau, quan sát cây cú pháp của chúng theo thời gian thực.

<ASTVisualizerDemo />

Thông qua trực quan hóa, bạn sẽ phát hiện quy luật cốt lõi của AST rất đơn giản:

| Cấu trúc mã | Nút gốc AST | Nút con |
|-----------|----------|--------|
| `1 + 2 * 3` | BinaryExpression (+) | Trái: NumericLiteral(1), Phải: BinaryExpression(*) |
| `let x = 10` | VariableDeclaration | VariableDeclarator → Identifier(x) + NumericLiteral(10) |
| `add(a, b)` | CallExpression | Identifier(add) + Arguments(a, b) |

::: tip Ứng dụng của AST trong phát triển hàng ngày
Có thể bạn chưa bao giờ viết bộ biên dịch, nhưng hàng ngày bạn đang dùng các công cụ dựa trên AST:
- **ESLint / Prettier**: Phân tích mã thành AST, kiểm tra quy tắc hoặc định dạng lại
- **Babel / SWC**: Phân tích AST → chuyển đổi cú pháp → tạo mã tương thích
- **IDE refactoring**: Đổi tên an toàn, trích xuất hàm dựa trên AST
- **Tree-shaking**: Phân tích AST trong import/export, xóa mã không dùng
:::

---

## 5. Phân tích ngữ nghĩa và tối ưu hóa mã

Phân tích cú pháp đảm bảo mã "cấu trúc đúng", nhưng cấu trúc đúng không có nghĩa là "ý nghĩa đúng". Phân tích ngữ nghĩa chịu trách nhiệm kiểm tra xem ý nghĩa của mã có hợp lệ không, tối ưu hóa mã giúp chương trình chạy nhanh hơn.

<CompilationPracticeDemo />

### 4.1 Phân tích ngữ nghĩa: Kiểm tra "ý nghĩa" có đúng không

| Nội dung kiểm tra | Ví dụ | Kết quả |
|----------------|------|--------|
| Kiểm tra kiểu | `int x = "hello"` | ❌ Kiểu không khớp |
| Kiểm tra phạm vi | Sử dụng biến chưa khai báo `y` | ❌ Biến không tồn tại |
| Suy luận kiểu | `1 + 2.0` | ✅ Suy luận kết quả là float |
| Kiểm tra tham số | `add(1, 2, 3)` nhưng hàm chỉ nhận 2 tham số | ❌ Số tham số không khớp |

::: tip Hầu hết lỗi bạn gặp đều từ phân tích ngữ nghĩa
- `TypeError: Cannot read properties of undefined` — kiểm tra kiểu
- `ReferenceError: x is not defined` — kiểm tra phạm vi
- `Expected 2 arguments, but got 3` — kiểm tra tham số
:::

### 4.2 Tối ưu hóa mã: Làm chương trình chạy nhanh hơn

Trước khi tạo mã cuối cùng, bộ biên dịch sẽ áp dụng nhiều tối ưu hóa cho mã trung gian. Các tối ưu hóa này trong suốt đối với lập trình viên, nhưng có thể cải thiện hiệu suất đáng kể.

| Kỹ thuật tối ưu | Trước tối ưu | Sau tối ưu | Nguyên lý |
|--------------|------------|-----------|----------|
| Constant folding | `x = 10 + 5` | `x = 15` | Tính toán trực tiếp tại thời gian biên dịch |
| Dead code elimination | `if (false) { ... }` | Xóa trực tiếp | Mã không bao giờ thực thi |
| Constant propagation | `x = 15; y = x * 2` | `y = 30` | Thay thế giá trị đã biết |
| Loop hoisting | Tính toán lặp lại trong vòng lặp `len = arr.length` | Chuyển ra ngoài vòng lặp | Tránh tính toán lặp lại |

---

## 6. Thực hành kỹ thuật tối ưu hóa: Làm thế nào bộ biên dịch giúp mã chạy nhanh hơn

Trên đây chúng ta đã nhắc đến tên các kỹ thuật tối ưu, bây giờ hãy xem kỹ bộ biên dịch làm chúng như thế nào. Thành phần tương tác dưới đây trình bày 5 kỹ thuật tối ưu hóa phổ biến nhất, bạn có thể trực quan so sánh mã trước và sau tối ưu.

<CodeOptimizationDemo />

Các bộ biên dịch và engine JIT hiện đại (như V8, GCC, LLVM) sẽ tự động áp dụng hàng chục kỹ thuật tối ưu. Là lập trình viên, bạn không cần phải làm tối ưu hóa thủ công, nhưng hiểu rõ chúng sẽ giúp bạn:

- **Viết mã dễ được tối ưu hóa**: Chẳng hạn dùng `const` thay vì `let`, bộ biên dịch dễ dàng constant folding hơn
- **Hiểu các khác biệt hiệu suất**: Tại sao hàm nhỏ nhanh hơn hàm lớn? Vì bộ biên dịch có thể inline chúng
- **Tránh "phản tối ưu"**: Một số cách viết sẽ ngăn chặn tối ưu hóa bộ biên dịch, như `eval()` và `with`

| Kỹ thuật tối ưu | Điều kiện kích hoạt | Ảnh hưởng hiệu suất | Lập trình viên có thể làm gì |
|--------------|-----------------|--------------|------------------------|
| Constant folding | Biểu thức toàn là hằng số | Loại bỏ tính toán thời gian chạy | Dùng const khai báo nhiều hơn |
| Dead code elimination | Mã không thể tiếp cận hoặc kết quả không dùng | Giảm kích thước mã | Dọn sạch mã không dùng kịp thời |
| Loop hoisting | Tính toán không thay đổi trong vòng lặp | Giảm tính toán lặp lại | Trích xuất thủ công cũng là thực hành tốt |
| Function inlining | Hàm nhỏ được gọi thường xuyên | Loại bỏ chi phí gọi hàm | Giữ hàm nhỏ và chuyên sâu |
| Constant propagation | Giá trị biến xác định tại thời gian biên dịch | Toàn bộ chuỗi tính toán bị loại bỏ | Dùng hằng số thay vì số ma thuật |

---

## 7. Biên dịch vs Giải thích vs JIT

Sau khi viết code, có ba cách "dịch" để nó chạy. Ba cách này có ưu và nhược điểm riêng, quyết định trực tiếp đặc điểm hiệu suất và trường hợp sử dụng của ngôn ngữ.

<CompileVsInterpretDemo />

| Khía cạnh | Biên dịch | Giải thích | JIT biên dịch tức thời |
|----------|---------|-----------|------------------|
| Quy trình | Biên dịch toàn bộ thành mã máy trước, sau đó thực thi | Đọc và thực thi từng dòng, dịch từng dòng | Trước tiên giải thích thực thi, mã hot spot rồi biên dịch |
| Tốc độ chạy | Nhanh nhất | Chậm nhất | Trung bình (hot spot gần như biên dịch) |
| Tốc độ khởi động | Chậm (cần biên dịch) | Nhanh (chạy trực tiếp) | Trung bình (cần khởi động) |
| Đa nền tảng | Cần biên dịch lại | Đa nền tảng tự nhiên | Đa nền tảng |
| Ngôn ngữ đại diện | C, Rust, Go | Python, Ruby | JavaScript (V8), Java |

::: tip Tại sao JavaScript lại nhanh như vậy?
Engine JIT V8 sẽ giám sát mã nào được thực thi thường xuyên (hot spot code), sau đó biên dịch chúng thành mã máy tối ưu hóa cao độ. Vì vậy dù JavaScript là "ngôn ngữ giải thích", trong V8 nó có hiệu suất gần ngang ngôn ngữ biên dịch. Đây cũng là nền tảng cho phép Node.js làm máy chủ.
:::

---

## Tóm tắt

Nguyên lý biên dịch không chỉ là kiến thức dành cho những người phát triển bộ biên dịch. Hiểu quy trình biên dịch sẽ giúp bạn hiểu rõ hơn về thông báo lỗi, chọn ngôn ngữ phù hợp, viết mã hiệu quả hơn.

Hãy ôn lại các điểm chính của chương:

1. **Bộ biên dịch là thông dịch viên**: Dịch mã dễ đọc từ con người thành lệnh thực thi máy
2. **Sáu bước quy trình**: Phân tích từ vựng → Phân tích cú pháp → Phân tích ngữ nghĩa → Mã trung gian → Tối ưu → Tạo mã
3. **Phân tích từ vựng tách Token**: Chia dòng ký tự thành các đơn vị có ý nghĩa như từ khóa, định danh, toán tử
4. **Phân tích cú pháp xây AST**: Tổ chức Token theo quy tắc cú pháp thành cấu trúc cây, phản ánh độ ưu tiên
5. **Phân tích ngữ nghĩa đảm bảo tính đúng đắn**: Kiểm tra kiểu, kiểm tra phạm vi, hầu hết lỗi bạn gặp đều từ đây
6. **Bộ biên dịch tự động tối ưu**: Constant folding, dead code elimination, function inlining và các kỹ thuật khác giúp mã tự động chạy nhanh hơn
7. **Ba mô hình thực thi**: Biên dịch nhanh nhất, giải thích linh hoạt nhất, JIT kết hợp cả hai

## Đọc thêm

- [AST Explorer](https://astexplorer.net/) - Xem cấu trúc AST của mã trực tuyến
- [Crafting Interpreters](https://craftinginterpreters.com/) - Xây dựng một ngôn ngữ lập trình từ đầu (sách miễn phí trực tuyến)
- [The Super Tiny Compiler](https://github.com/jamiebuilds/the-super-tiny-compiler) - Bộ biên dịch siêu nhỏ được viết bằng JavaScript
- [V8 Blog](https://v8.dev/blog) - Blog công nghệ JIT biên dịch của engine V8
- [LLVM Official Website](https://llvm.org/) - Cơ sở hạ tầng biên dịch phổ biến nhất
