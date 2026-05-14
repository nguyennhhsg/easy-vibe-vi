# Chất lượng mã và tái cấu trúc

::: tip Lời mở đầu
**Chỉ cần mã chạy được là được rồi sao?** Bạn có thể đã viết mã kiểu như vậy: chức năng đã được thực hiện, nhưng sau hai tuần bạn tự mình cũng không hiểu nó nữa. Hoặc có ai đó rời khỏi nhóm, để lại một đống mã mà "chỉ Thượng Đế và họ mới hiểu được".

Chương này sẽ giúp bạn hiểu mã tốt là gì, cách nhận biết mã xấu, và cách cải thiện nó một cách an toàn.
:::

**Bài viết này sẽ dạy bạn điều gì?**

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|------------------|
| **Chương 1** | Mã bốc mùi | Nhận biết các vấn đề phổ biến |
| **Chương 2** | Kỹ thuật tái cấu trúc | Cải thiện mã một cách an toàn |
| **Chương 3** | Kiểm tra mã | Đảm bảo chất lượng trong cộng tác nhóm |
| **Chương 4** | Đo lường chất lượng | Đo lường sức khỏe mã bằng dữ liệu |

Sau khi hoàn thành chương này, bạn sẽ nắm vững cách nhận biết các vấn đề mã, tái cấu trúc an toàn, và liên tục nâng cao chất lượng mã thông qua cộng tác nhóm.

---

## 0. Bức tranh toàn cảnh: Vòng đời của mã

Trong phát triển phần mềm, có một sự thật thường bị bỏ qua: **mã được đọc nhiều lần hơn rất nhiều lần so với lần được viết.**

Một đoạn mã từ lúc được tạo ra đến lúc loại bỏ, sẽ đi qua một hành trình tương tự như sau:

::: tip Cả đời của một đoạn mã
- **Giai đoạn viết**: Nhà phát triển viết phiên bản đầu tiên, chức năng chạy được, các bài kiểm tra vượt qua.
- **Giai đoạn kiểm tra**: Các thành viên nhóm đọc mã, đưa ra gợi ý cải thiện.
- **Giai đoạn bảo trì**: Sửa lỗi, thêm tính năng, thích ứng với các yêu cầu mới — giai đoạn này chiếm hơn 80% vòng đời của mã.
- **Giai đoạn tái cấu trúc**: Khi mã trở nên khó duy trì, cần cải thiện cấu trúc nội bộ mà không thay đổi hành vi bên ngoài.
- **Giai đoạn loại bỏ**: Công nghệ phát triển, mã cũ được thay thế bằng giải pháp mới.
:::

Martin Fowler nói trong cuốn sách "Refactoring": **"Bất kỳ một kẻ ngốc nào cũng có thể viết mã mà máy tính hiểu được, nhưng chỉ những lập trình viên giỏi mới có thể viết mã mà con người hiểu được."**

---

## 1. Mã bốc mùi: Nhận biết các vấn đề phổ biến

### 1.1 Mã bốc mùi là gì?

"Mã bốc mùi" (Code Smell) là một khái niệm được Kent Beck đưa ra, dùng chỉ những **đặc điểm trong mã mà mặc dù không phải là lỗi, nhưng gợi ý những vấn đề thiết kế sâu hơn**. Giống như một căn phòng có mùi lạ — nó sẽ không khiến bạn bệnh ngay lập tức, nhưng cho thấy có nơi nào đó cần được dọn dẹp.

Thông qua thành phần tương tác dưới đây, hãy nhận biết một số mùi mã phổ biến nhất:

<CodeSmellDemo />

### 1.2 Danh sách mùi mã phổ biến

| Mùi mã | Triệu chứng | Tác hại |
|--------|----------|--------|
| **Hàm quá dài** | Hàm dài hơn 50 dòng | Khó hiểu, khó kiểm tra và tái sử dụng |
| **Số ma thuật** | Viết trực tiếp `86400000` trong mã | Ý nghĩa không rõ, dễ bỏ sót khi sửa |
| **Mã trùng lặp** | Logic tương tự xuất hiện ở nhiều chỗ | Cần đồng bộ hóa khi sửa, dễ bỏ sót |
| **Lồng sâu quá mức** | Quá 3 lớp if/for | Logic giống mê cung, khó theo dõi |
| **Danh sách tham số dài** | Hàm có hơn 4 tham số | Khó gọi, dễ truyền sai thứ tự |
| **Lớp thần** | Một lớp/mô-đun làm quá nhiều việc | Trách nhiệm không rõ, sẽ gây ảnh hưởng lan tỏa |

::: tip Hiểu biết cốt lõi
Mùi mã không phải "lỗi", mà là "tín hiệu". Nó cho bạn biết: thiết kế ở đây có thể cần cải thiện. Không phải tất cả mùi mã đều cần sửa ngay lập tức, nhưng bạn cần có khả năng nhận biết chúng.
:::

---

## 2. Kỹ thuật tái cấu trúc: Cải thiện mã một cách an toàn

### 2.1 Tái cấu trúc là gì?

Tái cấu trúc (Refactoring) được định nghĩa rất chính xác: **cải thiện cấu trúc nội bộ mã mà không thay đổi hành vi bên ngoài của nó.**

Từ khóa là "không thay đổi hành vi bên ngoài". Tái cấu trúc không phải viết lại, không phải thêm tính năng, không phải sửa lỗi. Đó là "sắp xếp lại" bên trong mã.

Thông qua thành phần dưới đây, hãy so sánh sự thay đổi trước và sau của một số kỹ thuật tái cấu trúc phổ biến:

<RefactoringDemo />

### 2.2 Kỹ thuật tái cấu trúc thường dùng

**Trích xuất hàm (Extract Function)**

Đây là kỹ thuật tái cấu trúc được sử dụng nhiều nhất. Khi một đoạn mã có thể được tóm tắt bằng một tên có ý nghĩa, bạn nên trích xuất nó thành một hàm.

```javascript
// Trước tái cấu trúc
function printReport(data) {
  // Tính tổng giá
  let total = 0
  for (const item of data.items) {
    total += item.price * item.qty
  }
  // In ra...
}

// Sau tái cấu trúc
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

function printReport(data) {
  const total = calculateTotal(data.items)
  // In ra...
}
```

**Đổi tên (Rename)**

Đặt tên tốt là tài liệu rẻ nhất và hiệu quả nhất. Khi bạn cần viết chú thích để giải thích ý nghĩa của một biến/hàm, điều đó có nghĩa là tên của nó không đủ tốt.

```javascript
// Trước tái cấu trúc
const d = new Date() - startTime  // thời gian đã trôi qua
const arr = users.filter(u => u.a) // người dùng hoạt động

// Sau tái cấu trúc
const elapsedMs = new Date() - startTime
const activeUsers = users.filter(user => user.isActive)
```

**Thay thế điều kiện lồng bằng câu lệnh bảo vệ (Replace Nested Conditional with Guard Clauses)**

```javascript
// Trước tái cấu trúc
function getPayAmount(employee) {
  if (employee.isSeparated) {
    return { amount: 0 }
  } else {
    if (employee.isRetired) {
      return { amount: employee.pension }
    } else {
      return { amount: employee.salary }
    }
  }
}

// Sau tái cấu trúc
function getPayAmount(employee) {
  if (employee.isSeparated) return { amount: 0 }
  if (employee.isRetired) return { amount: employee.pension }
  return { amount: employee.salary }
}
```

::: tip Lưới bảo vệ cho tái cấu trúc
Rủi ro lớn nhất của tái cấu trúc là "sửa đi sửa lại rồi lỗi liền phát sinh". Vì vậy, điều kiện tiên quyết của tái cấu trúc là **có kiểm tra bao phủ**. Sau mỗi bước tái cấu trúc nhỏ, hãy chạy kiểm tra để đảm bảo hành vi không thay đổi. Mã không có kiểm tra, trước tiên hãy viết kiểm tra rồi mới tái cấu trúc.
:::

---

## 3. Kiểm tra mã: Đảm bảo chất lượng trong cộng tác nhóm

### 3.1 Tại sao cần kiểm tra mã?

Kiểm tra mã (Code Review) là một trong những phương tiện đảm bảo chất lượng hiệu quả nhất trong nhóm. Giá trị của nó không chỉ nằm ở việc phát hiện lỗi, mà còn:

- **Chia sẻ kiến thức**: Các thành viên nhóm biết mã của nhau, giảm "hệ số xe buýt" (nếu ai đó bị xe buýt tông, dự án vẫn có thể tiếp tục được không?)
- **Thống nhất phong cách**: Thông qua kiểm tra, dần hình thành quy chuẩn mã hóa của nhóm
- **Phát hiện sớm các vấn đề thiết kế**: Tốt hơn là phát hiện các quyết định kiến trúc tồi tệ so với phát hiện lỗi
- **Học hỏi lẫn nhau**: Đọc mã của người khác là cách nhanh nhất để cải thiện kỹ năng lập trình

### 3.2 Kiểm tra cái gì?

| Khía cạnh | Điểm tập trung |
|----------|----------------|
| **Tính đúng đắn** | Logic có đúng không? Có xử lý điều kiện biên không? |
| **Khả năng đọc** | Tên có rõ ràng không? Cấu trúc có dễ hiểu không? |
| **Bảo mật** | Có rủi ro chèn mã không? Dữ liệu nhạy cảm có bị lộ không? |
| **Hiệu suất** | Có vấn đề hiệu suất rõ ràng không? Truy vấn N+1? |
| **Kiểm tra** | Có kiểm tra tương ứng không? Có bao phủ các đường dẫn quan trọng không? |

### 3.3 Lễ nghi của kiểm tra

Kiểm tra mã tốt là **thảo luận về mã, không phải chỉ trích người**:

- Dùng "chúng ta" thay vì "bạn": ~~"bạn viết sai ở đây"~~ → "ở đây chúng ta có thể cân nhắc sử dụng guard clause"
- Đặt câu hỏi thay vì ra lệnh: ~~"đổi thành const"~~ → "biến này có sẽ được gán lại không? Nếu không, dùng const sẽ an toàn hơn"
- Nêu lý do: Không chỉ nói "không tốt", mà nói "tại sao không tốt" và "làm thế nào để tốt hơn"

---

## 4. Đo lường chất lượng mã

### 4.1 Độ phức tạp tuần hoàn

Độ phức tạp tuần hoàn (Cyclomatic Complexity) đo lường số lượng đường dẫn độc lập trong mã. Mỗi `if`, `for`, `case`, `&&`, `||` đều làm tăng độ phức tạp.

| Độ phức tạp | Đánh giá | Gợi ý |
|----------|--------|--------|
| 1-10 | Đơn giản | Dễ hiểu và kiểm tra |
| 11-20 | Trung bình | Hãy cân nhắc tách nhỏ |
| 21-50 | Phức tạp | Phải tái cấu trúc |
| 50+ | Không thể duy trì | Tái cấu trúc khẩn cấp |

### 4.2 Độ bao phủ mã

Độ bao phủ mã đo lường tỷ lệ phần trăm mã được thực thi bởi kiểm tra. Các chỉ số phổ biến:

- **Bao phủ dòng**: Tỷ lệ dòng mã được thực thi so với tổng số dòng
- **Bao phủ nhánh**: Tỷ lệ nhánh điều kiện được thực thi so với tổng số nhánh

::: tip Cạm bẫy của độ bao phủ
80% độ bao phủ không có nghĩa là chất lượng mã tốt. Độ bao phủ chỉ có thể cho bạn biết "mã nào chưa được kiểm tra", không thể cho bạn biết "kiểm tra có có ý nghĩa không". Một bài kiểm tra chỉ khẳng định `expect(true).toBe(true)` có thể tăng độ bao phủ, nhưng hoàn toàn vô giá trị.
:::

### 4.3 Công cụ thực tế

| Công cụ | Mục đích |
|---------|---------|
| **ESLint** | Phân tích tĩnh JavaScript/TypeScript |
| **Prettier** | Định dạng mã, thống nhất phong cách |
| **SonarQube** | Nền tảng chất lượng mã toàn diện |
| **Husky** | Git hooks, tự động kiểm tra trước khi commit |

---

## 5. Hỗ trợ AI: Nâng cao chất lượng mã bằng mô hình lớn

Mô hình lớn đã trở nên rất thực tế trong lĩnh vực chất lượng mã, nó có thể hoạt động như một "nhân viên kiểm tra mã trực tuyến 24/7" của bạn.

### 5.1 Nhận biết mùi mã

> **Lời nhắc**:
> ```
> Vui lòng kiểm tra mã sau, xác định mùi mã (Code Smell), bao gồm nhưng không giới hạn:
> hàm quá dài, số ma thuật, mã trùng lặp, lồng sâu quá mức, danh sách tham số dài.
> Với mỗi vấn đề, cung cấp vị trí cụ thể, mô tả vấn đề và gợi ý cải thiện.
>
> [Dán mã của bạn vào đây]
> ```

### 5.2 Tái cấu trúc tự động

> **Lời nhắc**:
> ```
> Vui lòng tái cấu trúc mã sau, với các yêu cầu:
> 1. Không thay đổi hành vi bên ngoài
> 2. Sử dụng các kỹ thuật như trích xuất hàm, thay thế điều kiện lồng bằng câu lệnh bảo vệ
> 3. Cải thiện tên, loại bỏ số ma thuật
> 4. Giải thích lý do của mỗi bước tái cấu trúc
>
> [Dán mã của bạn vào đây]
> ```

### 5.3 Mô phỏng kiểm tra mã

> **Lời nhắc**:
> ```
> Vui lòng kiểm tra mã này từ góc độ nhà phát triển có kinh nghiệm, đưa ra phản hồi từ các khía cạp sau:
> - Tính đúng đắn: Logic có lỗi không? Có xử lý điều kiện biên không?
> - Khả năng đọc: Tên có rõ ràng không? Cấu trúc có dễ hiểu không?
> - Hiệu suất: Có vấn đề hiệu suất rõ ràng không?
> - Bảo mật: Có rủi ro chèn mã hoặc rò rỉ dữ liệu không?
> Sử dụng giọng điệu "gợi ý" thay vì "ra lệnh", cung cấp giải pháp cải thiện.
>
> [Dán mã của bạn vào đây]
> ```

::: tip Gợi ý sử dụng AI
Bạn cần tự xác minh gợi ý tái cấu trúc của AI — chạy kiểm tra để xác nhận hành vi không thay đổi. Hãy xem AI như một "đồng nghiệp đưa ra gợi ý", chứ không phải "quyền lực đáng tin cậy vô điều kiện".
:::

---

## 6. Tóm tắt

Hãy nhìn lại con đường này, từ nhận biết vấn đề đến giải quyết vấn đề, chúng ta đã xây dựng một hệ thống hoàn chỉnh để cải thiện chất lượng mã:

1. **Nhận biết**: Học cách ngửi mùi mã xấu, biết chỗ nào cần cải thiện
2. **Tái cấu trúc**: Nắm vững các kỹ thuật tái cấu trúc an toàn, cải thiện từng bước nhỏ dưới sự bảo vệ của kiểm tra
3. **Cộng tác**: Thông qua kiểm tra mã, để nhóm cùng bảo vệ chất lượng mã
4. **Đo lường**: Sử dụng các chỉ số khách quan để theo dõi sức khỏe mã

::: tip Tư tưởng cuối cùng
Chất lượng mã không phải là công việc một lần, mà là một thói quen liên tục. Giống như giữ phòng sạch sẽ vậy — không phải chờ đến khi bừa bộn rồi mới dọn dẹp lớn, mà hàng ngày sắp xếp lại. **Quy tắc Boy Scout** nói rất đúng: hãy để mã sạch sẽ hơn một chút so với lúc bạn bắt đầu.
:::

---

## Đọc thêm

- **Sách kinh điển**: "Refactoring: Improving the Design of Existing Code" (Tái cấu trúc: Cải thiện thiết kế mã hiện có) của Martin Fowler là kinh thánh của lĩnh vực này.
- **Mã sạch sẽ**: "Clean Code" (Mã sạch) của Robert C. Martin cung cấp nhiều nguyên tắc mã hóa thực tế.
- **Công cụ thực tiễn**: Hãy thử cấu hình ESLint + Prettier + Husky trong dự án, trải nghiệm đảm bảo chất lượng mã tự động hóa.
- **Kiểm tra mã**: Hướng dẫn kiểm tra mã của Google là tiêu chuẩn trong ngành, đáng để học hỏi.
