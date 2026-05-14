# Bản chất của các framework frontend

> 💡 **Hướng dẫn học tập**: Bài viết này sẽ trả lời một câu hỏi cơ bản——**các framework frontend (Vue, React, Svelte, v.v.) thực sự đang làm gì?** Nếu bạn chỉ học HTML, CSS và một chút JavaScript, hoàn toàn không vấn đề, chúng ta sẽ bắt đầu từ đầu.

Trước khi bắt đầu, hãy đảm bảo bạn biết hai khái niệm cơ bản này. Nếu chưa chắc chắn, có thể xem các chương tương ứng:

- **HTML**: Bộ xương của trang web, xác định trang có những phần tử nào (tiêu đề, đoạn văn, nút bấm, hình ảnh…). Xem [HTML và bố cục CSS](./html-css-layout.md).
- **JavaScript**: Ngôn ngữ lập trình giúp trang web "chuyển động", có thể sửa đổi nội dung trang và phản ứng với thao tác của người dùng. Xem [Hướng dẫn JavaScript chuyên sâu](./javascript-deep-dive.md).

Còn một khái niệm sẽ xuất hiện thường xuyên, hãy giải thích đầy đủ ở đây.

### DOM là gì?

DOM viết tắt của Document Object Model, tên tiếng Việt là "Mô hình đối tượng tài liệu".

Khi bạn mở một trang web trong trình duyệt, việc đầu tiên trình duyệt làm là đọc mã HTML. Sau khi đọc, trình duyệt không hiển thị trực tiếp văn bản HTML, thay vào đó, nó **chuyển đổi mã HTML thành một cấu trúc cây**, lưu trữ trong bộ nhớ. Cây này gọi là DOM tree.

Mỗi nút (Node) trên cây tương ứng với một thẻ trong HTML. Mối quan hệ lồng nhau giữa các thẻ, trong DOM tree sẽ trở thành mối quan hệ giữa nút cha và nút con.

👇 **Hãy thử**:
Di chuyển chuột đến mã HTML ở bên trái, các nút tương ứng trong DOM tree ở bên phải sẽ được làm nổi bật. Điều ngược lại cũng vậy. Mỗi dòng thẻ HTML đều tương ứng với một nút trên DOM tree.

<WhatIsDomDemo />

**Tại sao cần hiểu DOM?** Vì cách JavaScript sửa đổi trang là thao tác với DOM tree này——thêm nút, xóa nút, sửa nội dung nút. Và công việc cốt lõi của framework frontend chính là tự động hóa những thao tác DOM này. Chúng ta sẽ nói lại về DOM, và hiểu nó là cơ sở để hiểu nguyên lý framework.

---

## 0. Mở đầu: "Frontend framework" là gì?

Trước tiên, hãy giải thích từ "framework". Trong lập trình, **framework** là một bộ mã đã được viết sẵn và các quy tắc, nó quy định cách mã của bạn nên được tổ chức, cách nó nên chạy. Bạn viết mã theo cách của nó, nó giúp bạn xử lý rất nhiều công việc dưới cơ sở lặp lại và phức tạp.

**Frontend framework**, chính là framework chuyên giúp bạn **xây dựng giao diện web**. Hiện tại, những framework phổ biến nhất là Vue, React, Svelte, Angular.

Vậy chúng giải quyết vấn đề gì? Ba thẻ dưới đây tóm tắt logic cốt lõi:

<FrameworkMotivationDemo />

Tiếp theo, chúng ta sẽ mở rộng từng bước, từ những câu hỏi cơ bản nhất.

---

## 1. Vấn đề cốt lõi: Dữ liệu thay đổi, giao diện thì sao?

### 1.1 Trước tiên, hãy làm rõ "dữ liệu" và "giao diện" là gì

Trong bất kỳ ứng dụng web nào, đều có hai thứ tồn tại cùng lúc:

- **Dữ liệu (Data / State)**: Thông tin được lưu trữ bên trong chương trình. Ví dụ, "giỏ hàng có 3 sản phẩm", "tên người dùng là Nguyễn Văn A", "hiện tại đã chọn tab 2". Những dữ liệu này nằm trong các biến của JavaScript, người dùng không nhìn thấy chúng.
- **Giao diện (UI)**: Thứ mà người dùng thấy trên màn hình. Ví dụ, hiển thị "Giỏ hàng(3)", hiển thị "Chào mừng, Nguyễn Văn A", tab 2 được làm nổi bật. Đây là hiệu ứng hình ảnh do các phần tử HTML thể hiện.

**Có mối tương ứng giữa dữ liệu và giao diện**: Dữ liệu là "3 sản phẩm", giao diện phải hiển thị "3". Nếu dữ liệu trở thành "4 sản phẩm", giao diện cũng phải trở thành "4".

Vấn đề là: **quá trình "thay đổi theo" này, ai chịu trách nhiệm?**

👇 **Hãy bấm**:
Bấm nút "Thêm sản phẩm", hãy chú ý quan sát: dữ liệu (bên trái) đã thay đổi, nhưng giao diện (bên phải) không cập nhật theo——chúng "mất kết nối" với nhau. Bấm "Đồng bộ giao diện" để sửa thủ công.

<DataUIGapDemo />

### 1.2 Tại sao biến JavaScript thay đổi, giao diện không tự động thay đổi?

Đây là nơi dễ gây nhầm lẫn nhất cho người mới bắt đầu, chúng ta hãy giải thích rõ ràng nguyên lý cơ bản.

Trong JavaScript, biến chỉ là một khoảng không gian bộ nhớ, được sử dụng để lưu trữ dữ liệu. Khi bạn thực thi `count = count + 1`, JavaScript engine làm việc rất đơn giản: thay đổi giá trị của count trong bộ nhớ từ 3 thành 4. **Sau khi hoàn thành bước này, nó kết thúc, không có gì xảy ra tiếp theo.**

Còn nội dung hiển thị trên trang (ví dụ, nút DOM `<span>3</span>`) được lưu trữ ở một khoảng không gian bộ nhớ hoàn toàn khác. Khi JavaScript engine sửa đổi biến, nó hoàn toàn không biết rằng có một nút DOM trên trang đang hiển thị giá trị của biến này, và cũng không có cơ chế nào cho phép nó kiểm tra.

Nên bản chất là: **biến JavaScript và nút DOM là hai khoảng không gian bộ nhớ độc lập, không có cơ chế tự động liên kết giữa chúng.** Sửa đổi biến chỉ thay đổi bộ nhớ nơi biến được lưu trữ, bộ nhớ nơi nút DOM được lưu trữ sẽ không bị ảnh hưởng.

```javascript
let count = 3

// Trang có một nút DOM hiển thị giá trị của count:
// <span id="counter">3</span>

count = 4
// JavaScript engine đã làm gì?
//   → Thay đổi giá trị của biến count trong bộ nhớ từ 3 thành 4
//   → Kết thúc. Không có gì nữa.
// Trang vẫn hiển thị "3" trong <span>
```

Nếu bạn muốn hiển thị trên trang cũng trở thành "4", bạn phải **viết mã bổ sung**, tìm nút DOM đó thủ công, rồi sửa đổi nội dung của nó:

```javascript
count = 4  // Bước 1: Thay đổi biến

// Bước 2: Bạn phải tự viết——tìm nút DOM, thay đổi văn bản của nó thành giá trị mới
document.getElementById('counter').textContent = count
```

Nếu trên trang có 5 nơi hiển thị giá trị count (số lượng giỏ hàng, danh sách sản phẩm, tổng giá, tổng con, lời nhắc trạng thái), bạn phải viết 5 đoạn mã như thế này. **Bỏ sót bất kỳ đoạn nào, nơi đó vẫn sẽ hiển thị giá trị cũ, người dùng sẽ nhìn thấy thông tin sai.**

### 1.3 Framework làm gì? Hai bước thiết lập kết nối tự động

Framework có thể đồng bộ tự động, dựa vào **hai bước kết hợp**——không thiếu một bước nào.

**Bước một: Bạn "đăng ký" trong template nơi nào cần hiển thị biến này**

Trong template HTML của framework, bạn sử dụng cú pháp như `{{ count }}` để đánh dấu "nơi này sẽ hiển thị giá trị count":

```html
<!-- Vue template -->
<span>Giỏ hàng: {{ count }} sản phẩm</span>    <!-- Vị trí A: Tôi muốn hiển thị count -->
<span>Tổng giá: ¥{{ count * 99 }}</span>   <!-- Vị trí B: Tôi cũng sử dụng count -->
<span>{{ count > 5 ? 'Quá nhiều' : 'Bình thường' }}</span>  <!-- Vị trí C: Tôi cũng sử dụng count -->
```

Lần đầu tiên framework hiển thị trang, nó sẽ ghi lại mối quan hệ "đăng ký" này: **vị trí A, B, C đều phụ thuộc vào count**.

**Bước hai: Framework theo dõi biến, nếu thay đổi thì tìm bảng đăng ký, tự động cập nhật**

Framework sử dụng `Proxy` tích hợp của JavaScript để "bao bọc" biến của bạn, biến nó thành một "biến được theo dõi". Khi bạn sửa đổi biến này, Proxy sẽ vừa lực lượng vừa làm thêm một việc: thông báo cho framework "count đã thay đổi". Sau khi framework nhận được thông báo, nó sẽ tìm bảng đăng ký từ bước một, cập nhật toàn bộ vị trí A, B, C.

```
JavaScript gốc:
  Bạn viết HTML → <span id="counter">3</span>（không kết nối gì với biến）
  Bạn sửa biến → count = 4 → Kết thúc, giao diện không có phản ứng
  Bạn sửa thủ công → document.getElementById('counter').textContent = 4 → Giao diện mới cập nhật

Framework Vue:
  Bạn viết template → <span>{{ count }}</span>（framework ghi nhớ: nơi này phụ thuộc vào count）
  Bạn sửa biến → count = 4 → Proxy chặn → Thông báo cho framework → Framework tìm bảng đăng ký → Tự động cập nhật A/B/C
```

Đây là lý do tại sao "chỉ framework mới có thể đồng bộ tự động"——`<span>` trong HTML gốc và biến JS không có bất kỳ kết nối nào, cú pháp template của framework (`{{ }}`) mới là chìa khóa để thiết lập kết nối này. Khi bạn viết `{{ count }}`, framework mới biết rằng nơi này sẽ hiển thị count; framework mới có thể tìm đến nơi này và cập nhật nó khi count thay đổi.

👇 **Hãy bấm**:
Trước tiên chọn "JavaScript gốc", bấm "Thực thi" sau đó hãy chú ý quan sát——biến đã thay đổi nhưng giao diện không chuyển động, bạn phải từng bước đồng bộ thủ công từng vị trí. Sau đó chuyển sang "Sử dụng framework", bấm "Thực thi"——biến vừa thay đổi, framework tự động hoàn thành tất cả các bước, giao diện ngay lập tức theo kịp.

<WhyNoAutoSyncDemo />

### 1.4 So sánh: Đồng bộ thủ công vs đồng bộ tự động trong thực tế

Sau khi hiểu nguyên lý, chúng ta hãy xem sự khác biệt giữa đồng bộ thủ công và đồng bộ tự động trong một tình huống phức tạp hơn một chút.

👇 **Hãy bấm**:
Bên trái là cách "đồng bộ thủ công" khi không có framework——mỗi vùng hiển thị, bạn phải bấm riêng nút "Đồng bộ" để cập nhật. Bên phải là cách "đồng bộ tự động" khi có framework——bạn chỉ cần bấm "Thêm sản phẩm", tất cả các vùng hiển thị sẽ tự động cập nhật. Hãy thử cố tình không đồng bộ một vùng bên trái, xem điều gì xảy ra.

<ManualVsAutoSyncDemo />

**Đây chính là lý do cơ bản vì sao frontend framework tồn tại: thêm cho biến JavaScript khả năng "tự động thông báo giao diện cập nhật khi thay đổi", loại bỏ lỗi do đồng bộ thủ công.**

---

## 2. Ý tưởng cốt lõi của framework: Dùng dữ liệu để mô tả giao diện

### 2.1 Sự khác biệt giữa hai cách viết

Sau khi hiểu giá trị của "đồng bộ tự động", chúng ta hãy xem framework thực sự làm cách nào. Thực hiện nó.

Vào thời không có framework (ví dụ, sử dụng jQuery), mã được viết như thế này——bạn từng bước nói với trình duyệt nên làm gì:

```javascript
// Bước 1: Tìm phần tử có id là counter trên trang
var element = document.getElementById('counter')
// Bước 2: Thay đổi nội dung văn bản của phần tử này thành giá trị mới
element.textContent = '4'
// Bước 3: Tìm phần tử khác, cũng thay đổi nó
document.getElementById('total').textContent = '¥396'
// Bước 4: Nếu số lượng lớn hơn 5, cũng cần thay đổi lời nhắc trạng thái……
```

Cách viết này gọi là **mệnh lệnh (Imperative)**——bạn đang "lệnh" trình duyệt thực thi các thao tác từng bước.

Có framework, mã trở thành như thế này——bạn chỉ mô tả "giao diện nên trông như thế nào":

```html
<!-- Tôi không quan tâm giá trị này được cập nhật lên trang như thế nào -->
<!-- Tôi chỉ nói: nơi này nên hiển thị giá trị count -->
<span>{{ count }}</span>
<span>Tổng giá: ¥{{ count * 99 }}</span>
<span v-if="count > 5">Sản phẩm quá nhiều!</span>
```

Cách viết này gọi là **khai báo (Declarative)**——bạn đang "khai báo" trạng thái cuối cùng của giao diện, còn cách đạt được trạng thái này, framework tự xử lý.

### 2.2 Công thức cốt lõi: UI = f(State)

Tất cả các framework frontend hiện đại——dù Vue, React hay Svelte——đều tuân theo cùng một ý tưởng cốt lõi, có thể diễn đạt bằng một công thức:

> **UI = f(State)**

Công thức này có nghĩa là:

- **State（trạng thái）**: Dữ liệu của ứng dụng của bạn. Chính là những biến trong JavaScript: giỏ hàng có bao nhiêu sản phẩm, người dùng đã đăng nhập chưa, trang hiện tại là trang nào……
- **f（hàm）**: Cơ chế hiển thị của framework. Nó biết cách biến dữ liệu thành giao diện.
- **UI（giao diện）**: Kết quả cuối cùng mà người dùng nhìn thấy trên màn hình.

**Ý nghĩa**: Cho một bộ dữ liệu nhất định (State), thông qua xử lý của framework (f), có thể xác định một cách chắc chắn giao diện tương ứng (UI). Dữ liệu thay đổi, giao diện sẽ theo kịp. Nhà phát triển chỉ cần quan tâm dữ liệu, không cần quan tâm giao diện cập nhật như thế nào.

👇 **Hãy bấm**:
Sửa đổi dữ liệu (State) ở bên trái, quan sát cách giao diện (UI) ở bên phải tự động thay đổi. Đây chính là thể hiện trực quan của `UI = f(State)`.

<DeclarativeFormulaDemo />

### 2.3 Tại sao khai báo tốt hơn mệnh lệnh?

Ưu điểm của cách viết khai báo là:

| Khía cạnh so sánh | Mệnh lệnh（không có framework） | Khai báo（có framework） |
| :--- | :--- | :--- |
| **Lượng mã** | Mỗi cập nhật đều cần viết mã thao tác cụ thể | Chỉ viết template một lần, framework tự xử lý |
| **Xác suất lỗi** | Dễ bỏ sót cập nhật ở một nơi nào đó | Framework đảm bảo tất cả nơi đều cập nhật |
| **Khả năng đọc** | Mã lẫn lộn với rất nhiều thao tác DOM | Mã rõ ràng mô tả cấu trúc giao diện |
| **Chi phí bảo trì** | Sửa một tính năng phải sửa ở nhiều nơi | Chỉ cần sửa logic dữ liệu, giao diện tự theo kịp |

Nói ngắn gọn: cách khai báo cho phép bạn tập trung sự chú ý vào "logic kinh doanh" (dữ liệu thay đổi như thế nào), không cần lo lắng về "cách cập nhật giao diện" đó——một việc lặp lại và dễ xảy ra lỗi.

---

## 3. Hệ thống phản ứng: Framework biết dữ liệu thay đổi như thế nào?

### 3.1 "Phản ứng" là gì?

Trước đó chúng ta nói "dữ liệu thay đổi, giao diện tự động cập nhật". Nhưng đây có một vấn đề kỹ thuật: **JavaScript tự nó không có khả năng "tự động thông báo cho người khác khi biến bị sửa đổi"**.

Khi bạn viết `count = 4`, JavaScript chỉ thay đổi giá trị `count` từ 3 thành 4, nó không tự động thông báo cho bất ai. Framework cần một cơ chế để "phát hiện" bạn đã sửa đổi dữ liệu.

**Phản ứng (Reactivity)** chính là tên gọi chung của cơ chế này: khi dữ liệu thay đổi, hệ thống có thể tự động cảm nhận sự thay đổi, và thực thi các thao tác cập nhật tương ứng.

### 3.2 Ba cách thực hiện khác nhau

Các framework khác nhau đã sử dụng các giải pháp kỹ thuật khác nhau để thực hiện phản ứng. Đây cũng là sự khác biệt cơ bản nhất giữa Vue, React, Svelte.

**Cách một: Chặn proxy (Vue làm)**

Vue sử dụng cơ chế `Proxy` tích hợp của JavaScript. `Proxy` có thể tự động thực thi một đoạn mã bạn chỉ định khi bạn đọc hoặc sửa đổi thuộc tính của một đối tượng.

Vue bao bọc đối tượng dữ liệu của bạn với `Proxy`. Khi bạn thực thi `count = 4`, `Proxy` sẽ chặn thao tác viết này, thông báo cho Vue: "giá trị count đã thay đổi", sau đó Vue sẽ cập nhật tất cả các phần giao diện sử dụng `count`.

Bạn là nhà phát triển không cần làm gì thêm——chỉ cần gán trực tiếp, Vue tự động cảm nhận.

**Cách hai: Gọi rõ ràng (React làm)**

React không sử dụng `Proxy`. Nó yêu cầu bạn phải sửa đổi dữ liệu thông qua một hàm chuyên dụng:

```javascript
// Cách viết của React
const [count, setCount] = useState(0)

// Không thể viết trực tiếp count = 4（React không sẽ cảm nhận được）
// Phải gọi setCount:
setCount(4)
```

Chỉ khi bạn gọi `setCount()` thì React mới biết dữ liệu thay đổi, mới cập nhật giao diện. Nếu bạn viết trực tiếp `count = 4`, React hoàn toàn không biết, giao diện không cập nhật.

Cách này "rõ ràng" hơn——mỗi lần dữ liệu thay đổi đều do bạn chủ động thông báo cho framework, không có những cập nhật bất ngờ.

**Cách ba: Phân tích trình biên dịch (Svelte làm)**

Svelte đã chọn một con đường hoàn toàn khác. Nó có một trình biên dịch (Compiler), trước khi mã của bạn chạy, trình biên dịch sẽ phân tích mã nguồn của bạn trước.

Khi trình biên dịch thấy bạn viết một câu lệnh gán như `count += 1`, nó sẽ tự động chèn một đoạn mã "thông báo giao diện cập nhật" vào sau dòng này. Nói cách khác, khi mã chạy, hành động "thông báo" đã được trình biên dịch xếp sẵn.

Mã của bạn trông giống như JavaScript gán bình thường, nhưng mã đã biên dịch sẽ có logic cập nhật giao diện.

👇 **Hãy bấm**:
Chọn nhãn framework khác nhau, bấm "Sửa đổi dữ liệu", quan sát mỗi framework "dưới nắp ca pô" đã trải qua những bước nào để hoàn thành phát hiện thay đổi dữ liệu và cập nhật giao diện.

<ReactivityMechanismDemo />

### 3.3 So sánh ba cách

| Khía cạnh so sánh | Vue（Proxy chặn） | React（gọi rõ ràng） | Svelte（trình biên dịch） |
| :--- | :--- | :--- | :--- |
| **Cách viết của nhà phát triển** | Gán trực tiếp `count = 4` | Phải dùng `setCount(4)` | Gán trực tiếp `count = 4` |
| **Thời điểm cảm nhận thay đổi** | Tự động chặn khi chạy | Nhà phát triển chủ động thông báo | Trước khi chạy, trình biên dịch chèn mã thông báo |
| **Chi phí hiệu suất khi chạy** | Proxy có ít overhead chặn | setState schedule có ít overhead | Gần như không có overhead bổ sung |
| **Độ khó gỡ lỗi** | Trung bình | Luồng dữ liệu rõ ràng, tương đối dễ | Cần hiểu mã đã biên dịch |
| **Tình huống phù hợp** | Theo đuổi hiệu suất phát triển và cách viết tự nhiên | Theo đuổi luồng dữ liệu có thể dự đoán | Theo đuổi hiệu suất chạy tối đa |

Ba cách không có điều gì tuyệt đối tốt hay xấu. Vue viết dễ nhất, luồng dữ liệu của React có thể kiểm soát nhất, hiệu suất chạy của Svelte tốt nhất. Chọn cái nào tùy thuộc vào nhu cầu cụ thể của dự án.

---

## 4. Thành phần: Chia giao diện thành những phần nhỏ có thể tái sử dụng

### 4.1 Tại sao phải chia?

Một trang web hoàn chỉnh có thể có thanh điều hướng, thanh bên, vùng nội dung, ô tìm kiếm, đầu người dùng, các nút khác nhau……Nếu tất cả mã được viết trong một tệp, tệp này sẽ trở nên cực kỳ dài, cực kỳ khó bảo trì.

**Thành phần (Component)** chính là chia giao diện thành những phần nhỏ độc lập, mỗi phần quản lý dữ liệu của nó, giao diện của nó, logic của nó.

Ví dụ, một trang thương mại điện tử có thể chia thành các thành phần sau:

- Thành phần `NavBar`: Chịu trách nhiệm thanh điều hướng phía trên
- Thành phần `SearchBox`: Chịu trách nhiệm ô tìm kiếm
- Thành phần `ProductCard`: Chịu trách nhiệm một thẻ sản phẩm
- Thành phần `ShoppingCart`: Chịu trách nhiệm giỏ hàng

Mỗi thành phần đều độc lập. `ProductCard` không cần biết mã nào được viết trong `NavBar`, nó chỉ cần quản lý tốt của nó.

### 4.2 Ba ưu điểm của thành phần

**Ưu điểm một: Tái sử dụng.** Một thành phần `ProductCard` được viết xong, có thể được sử dụng 100 lần trên trang——mỗi lần truyền dữ liệu sản phẩm khác nhau, sẽ hiển thị một thẻ sản phẩm khác nhau. Không cần sao chép và dán 100 phần HTML code.

**Ưu điểm hai: Đóng gói.** Dữ liệu và logic bên trong thành phần là độc lập. Sửa đổi mã của thành phần `SearchBox`, sẽ không ảnh hưởng đến thành phần `ProductCard`. Khi cộng tác nhiều người, những người khác nhau có thể phát triển các thành phần khác nhau cùng một lúc, không ảnh hưởng lẫn nhau.

**Ưu điểm ba: Bảo trì được.** Khi một tính năng có vấn đề, bạn có thể trực tiếp định vị đến thành phần tương ứng để sửa, không cần tìm kiếm trong một tệp có hàng ngàn dòng.

👇 **Hãy bấm**:
Bấm tên thành phần ở bên trái, xem nó tương ứng với vùng nào trên trang. Hãy chú ý quan sát: cùng một thành phần `ProductCard` được sử dụng lại nhiều lần, mỗi lần hiển thị dữ liệu khác nhau.

<ComponentTreeDemo />

### 4.3 Thành phần trông như thế nào trong mã?

Lấy Vue làm ví dụ, một thành phần chỉ là một tệp `.vue`, bên trong có ba phần:

```html
<!-- ProductCard.vue -->
<template>
  <!-- Viết cấu trúc HTML ở đây —— "ngoại hình" của thành phần -->
  <div class="card">
    <h3>{{ name }}</h3>
    <p>Giá: ¥{{ price }}</p>
    <button @click="addToCart">Thêm vào giỏ hàng</button>
  </div>
</template>

<script setup>
// Viết logic JavaScript ở đây —— "hành vi" của thành phần
const props = defineProps(['name', 'price'])

function addToCart() {
  // Xử lý logic "thêm vào giỏ hàng"
}
</script>

<style scoped>
/* Viết kiểu CSS ở đây —— "kiểu dáng" của thành phần */
.card {
  border: 1px solid #ccc;
  padding: 16px;
}
</style>
```

Sử dụng thành phần này, giống như sử dụng một thẻ HTML tùy chỉnh:

```html
<!-- Sử dụng thành phần ProductCard ở những nơi khác -->
<ProductCard name="Tai nghe không dây" price="299" />
<ProductCard name="Bàn phím cơ học" price="599" />
<ProductCard name="Màn hình" price="1999" />
```

Ba dòng mã đã hiển thị ba thẻ sản phẩm khác nhau.

---

## 5. Chi phí của thao tác DOM: Tại sao framework lại có công việc lớn như vậy?

### 5.1 Thao tác DOM là gì?

Trước đó chúng ta đã nói đến DOM——cấu trúc cây được trình duyệt tạo ra sau khi phân tích HTML. **Thao tác DOM** chính là sử dụng JavaScript để sửa đổi các nút trên cây này. Ví dụ như thay đổi một đoạn văn bản, thêm một phần tử, xóa một phần tử, sửa đổi một kiểu.

Những thao tác này tự nó không phức tạp, nhưng sau khi trình duyệt thực thi thao tác DOM, nó cần làm rất nhiều công việc bổ sung để hiển thị lên màn hình được cập nhật:

1. **Tính toán lại kiểu**: Có cần phải thay đổi kiểu CSS của nút này và các nút con của nó không?
2. **Bố cục lại (Layout / Reflow)**: Cần phải tính toán lại vị trí và kích thước của tất cả các phần tử trên trang. Vì sự thay đổi của một phần tử có thể ảnh hưởng đến vị trí của các phần tử khác.
3. **Vẽ lại (Paint)**: Vẽ nội dung đã tính toán lên màn hình.

Mỗi ba bước này đều có chi phí tính toán. Nếu mã của bạn thường xuyên kích hoạt thao tác DOM, trình duyệt sẽ lặp lại thực hiện những bước này, trang sẽ trở nên chậm.

👇 **Hãy bấm**:
Quan sát sự khác biệt về thời gian giữa thao tác DOM trực tiếp và thao tác DOM hàng loạt. Khi số lần sửa đổi tăng lên, thời gian "thao tác từng cái một" sẽ tăng lên rất nhanh.

<DomOperationCostDemo />

### 5.2 Framework giải quyết vấn đề này như thế nào?

Vì thao tác DOM trực tiếp có chi phí cao, framework sẽ tìm cách **giảm số lần thao tác DOM**. Cụ thể có hai chiến lược:

**Chiến lược một: Virtual DOM + so sánh sự khác biệt (Vue, React làm)**

Virtual DOM (DOM ảo) là một đối tượng JavaScript, cấu trúc của nó tương ứng một-một với cây DOM thực, nhưng nó chỉ tồn tại trong bộ nhớ, sẽ không kích hoạt bố cục và vẽ lại của trình duyệt.

Khi dữ liệu thay đổi, quy trình xử lý của framework là:

1. Sử dụng đối tượng JavaScript tạo một "cây Virtual DOM mới", mô tả giao diện nên trông như thế nào sau khi dữ liệu thay đổi
2. So sánh cây mới này với cây cũ (quá trình này được gọi **Diff**, tức so sánh sự khác biệt), tìm ra những nút nào đã thay đổi
3. Chỉ áp dụng phần thực sự thay đổi lên DOM thực (quá trình này được gọi **Patch**, tức vá lỗi)

Bằng cách này, dù dữ liệu thay đổi như thế nào, các thao tác DOM cuối cùng đối với DOM thực luôn là ít nhất.

👇 **Hãy bấm**:
Bấm "Sửa đổi dữ liệu", quan sát Virtual DOM so sánh cây cũ và mới, tìm ra nút đã thay đổi. Chú ý xem "DOM thực" ở bên phải——chỉ phần thực sự thay đổi mới sẽ nhấp nháy.

<VirtualDomDiffDemo />

**Chiến lược hai: Xác định chính xác lúc biên dịch (Svelte làm)**

Svelte không sử dụng Virtual DOM. Trình biên dịch của nó lúc bạn viết mã đã phân tích xong: "khi `count` thay đổi, cần cập nhật phần tử `<span>` ở dòng 3". Lúc chạy, nó trực tiếp định vị phần tử đó để cập nhật, hoàn toàn không cần so sánh cây cũ và mới.

Cách làm này bỏ qua bước Diff, lý thuyết là hiệu suất tốt hơn. Nhưng nó dựa vào khả năng phân tích của trình biên dịch——trình biên dịch cần đủ thông minh để xác định chính xác tất cả các nơi cần cập nhật.

---

## 6. Thời gian chạy vs Thời gian biên dịch: Sự cân bằng cốt lõi của thiết kế framework

### 6.1 Hai giai đoạn

Từ khi bạn viết mã frontend cho đến khi nó chạy cuối cùng trong trình duyệt, sẽ trải qua hai giai đoạn:

- **Thời gian biên dịch (Compile-time / Build-time)**: Mã nguồn của bạn được công cụ xây dựng (ví dụ như Vite, Webpack) xử lý, chuyển đổi thành mã mà trình duyệt có thể thực thi trực tiếp. Quá trình này xảy ra trên máy tính của bạn, trước khi người dùng mở trang web.
- **Thời gian chạy (Runtime)**: Mã đã chuyển đổi được thực thi trong trình duyệt của người dùng. Logic cốt lõi của framework (ví dụ như Diff của Virtual DOM, theo dõi của phản ứng) hoạt động ở giai đoạn này.

### 6.2 Phân chia công việc của framework ở hai giai đoạn

Các framework khác nhau phân chia công việc ở hai giai đoạn khác nhau, điều này quyết định các đặc điểm hiệu suất và kích thước gói của chúng:

- **React**: Hầu hết công việc hoàn thành ở thời gian chạy. Tạo Virtual DOM, Diff, Patch đều xảy ra trong trình duyệt. Ưu điểm là tính linh hoạt cao; nhược điểm là cần gửi toàn bộ mã thời gian chạy của framework (khoảng 40KB) cho trình duyệt.
- **Vue**: Cách hỗn hợp. Template được tối ưu ở thời gian biên dịch (trình biên dịch đánh dấu nút nào là tĩnh, không thay đổi), nhưng cập nhật giao diện cuối cùng vẫn thông qua Virtual DOM ở thời gian chạy. Mã thời gian chạy khoảng 30KB.
- **Svelte**: Hầu hết công việc hoàn thành ở thời gian biên dịch. Trình biên dịch phân tích mã của bạn, trực tiếp tạo ra các chỉ thị cập nhật DOM chính xác. Gần như không có mã framework ở thời gian chạy——kích thước gói cuối cùng chỉ có mã kinh doanh của bạn.

👇 **Hãy bấm**:
Bấm nhãn framework khác nhau, xem vị trí của chúng trên phổ "thời gian chạy ↔ thời gian biên dịch", cũng như sự cân bằng của mỗi cái trong kích thước gói, hiệu suất chạy, trải nghiệm phát triển.

<FrameworkSpectrumDemo />

### 6.3 Xu hướng ngành

Những năm gần đây, hướng phát triển của framework rất rõ ràng: **chuyển ngày càng nhiều công việc từ thời gian chạy sang thời gian biên dịch**. Vì tính toán ở thời gian biên dịch không chiếm tài nguyên thiết bị của người dùng, không ảnh hưởng đến tốc độ tải trang.

- **Vue** đang phát triển Vapor Mode（chế độ hơi nước）, có thể bỏ qua Virtual DOM, trực tiếp tạo mã thao tác DOM ở thời gian biên dịch
- **React** đã cho ra mắt React Compiler, tự động tối ưu hóa hành vi hiển thị lại của thành phần ở thời gian biên dịch
- **Svelte 5** đã giới thiệu hệ thống Runes, tăng cường thêm khả năng phân tích ở thời gian biên dịch

---

## 7. Tóm tắt

Nhắc lại những điểm chính của bài viết này:

**Vấn đề cơ bản mà frontend framework giải quyết**: Khi dữ liệu trong ứng dụng thay đổi, tự động, hiệu quả, đáng tin cậy cập nhật giao diện, không cần nhà phát triển thao tác DOM thủ công.

**Ý tưởng cốt lõi mà chúng tuân theo**: UI = f(State)——giao diện là hàm của dữ liệu, nhà phát triển chỉ cần quan tâm thay đổi dữ liệu, framework chịu trách nhiệm phản ánh sự thay đổi dữ liệu lên giao diện.

**Sự khác biệt kỹ thuật chính của chúng**:

| Điểm kỹ thuật | Ý nghĩa |
| :--- | :--- |
| **Hệ thống phản ứng** | Framework phát hiện thay đổi dữ liệu như thế nào. Vue dùng Proxy chặn, React dùng setState rõ ràng, Svelte dùng trình biên dịch phân tích. |
| **Virtual DOM** | Vue và React dùng một đối tượng JavaScript để mô phỏng cây DOM, thông qua so sánh cây cũ và mới (Diff) để tìm ra lượng cập nhật tối thiểu, giảm thao tác DOM thực. |
| **Thành phần hóa** | Chia giao diện thành những phần nhỏ độc lập, có thể tái sử dụng, mỗi thành phần quản lý dữ liệu và giao diện của nó. |
| **Tối ưu thời gian biên dịch** | Trước khi mã chạy, phân tích và tối ưu hóa, giảm lượng tính toán lúc chạy. Svelte đi xa nhất ở khía cạnh này. |

**Một câu nói**: Bản chất công việc của frontend framework là——quản lý quá trình đồng bộ "dữ liệu đến giao diện", cho phép nhà phát triển chỉ cần suy nghĩ về logic dữ liệu, không còn cần thao tác giao diện thủ công.

---

## Bảng từ vựng kỹ thuật

| Thuật ngữ tiếng Anh | Dịch sang tiếng Việt | Giải thích |
| :--- | :--- | :--- |
| **Framework** | Framework | Một bộ mã đã được viết sẵn và các quy tắc, cung cấp cấu trúc cơ sở và chức năng thường dùng của ứng dụng cho nhà phát triển. |
| **DOM** | DOM | Sau khi trình duyệt phân tích HTML, tạo ra một cấu trúc dữ liệu hình cây, JavaScript thao tác nó để sửa đổi trang. |
| **Virtual DOM** | Virtual DOM | Dùng đối tượng JavaScript mô phỏng cây DOM, thông qua thuật toán Diff tìm ra đường dẫn cập nhật tối thiểu, giảm số lần thao tác DOM thực. |
| **State** | Trạng thái | Dữ liệu trong ứng dụng, ví dụ như thông tin người dùng, nội dung giỏ hàng, trạng thái hiện tại của trang. |
| **Reactivity** | Phản ứng | Khi dữ liệu thay đổi, hệ thống có thể tự động cảm nhận và thực thi các thao tác cập nhật giao diện tương ứng. |
| **Proxy** | Proxy | Cơ chế tích hợp của JavaScript, có thể chặn các thao tác đọc và ghi của một đối tượng. Vue 3 dùng nó để thực hiện phản ứng. |
| **Component** | Thành phần | Một đoạn mã giao diện độc lập, có thể tái sử dụng, bao gồm cấu trúc HTML, logic JavaScript và kiểu CSS của nó. |
| **Declarative** | Khai báo | Một cách lập trình: bạn mô tả "cuối cùng muốn kết quả gì", framework quyết định cách thực hiện. |
| **Imperative** | Mệnh lệnh | Một cách lập trình: bạn từng bước nói cho chương trình "cụ thể làm cách nào". |
| **Diff** | So sánh sự khác biệt | So sánh cây Virtual DOM cũ và mới, tìm ra những nút nào đã thay đổi. |
| **Patch** | Vá lỗi | Áp dụng phần thay đổi tìm được từ Diff lên DOM thực. |
| **Compile-time** | Thời gian biên dịch | Giai đoạn khi mã được xử lý trong quá trình xây dựng, xảy ra trước khi người dùng mở trang web. |
| **Runtime** | Thời gian chạy | Giai đoạn khi mã được thực thi trong trình duyệt của người dùng. |
| **Compiler** | Trình biên dịch | Một chương trình, chuyển đổi mã nguồn thành dạng mã khác. Trình biên dịch của Svelte chuyển đổi tệp `.svelte` thành JavaScript hiệu quả. |
