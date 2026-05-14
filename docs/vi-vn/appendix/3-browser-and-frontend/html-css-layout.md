# Hệ thống bố cục HTML / CSS
::: tip 🎯 Câu hỏi cốt lõi
**Làm sao tạo được trang web? Tại sao có trang web chỉ toàn chữ, nhưng có trang web lại có thể tương tác như một ứng dụng?** Câu hỏi này sẽ dẫn đến ba nền tảng cơ bản của phát triển Web, giúp bạn hiểu cấu trúc đằng sau mỗi trang web.
:::

---

## 1. HTML, CSS, JavaScript lần lượt là gì?

### 1.1 Từ trang web tĩnh đến ứng dụng động

Hãy tưởng tượng bạn thấy một **áp phích** trên đường phố. Bạn chỉ có thể nhìn, không thể tương tác — áp phích sẽ không thay đổi nội dung vì bạn nhìn nó, cũng sẽ không bật lên thông tin thêm vì bạn nhấp vào chỗ nào đó.

Những trang web sơ khai chính là những "áp phích điện tử" như vậy: chỉ có thể xem, không thể sửa, nội dung cố định.

Nhưng trang web hiện đại hoàn toàn khác. Chúng giống như **ứng dụng máy tính**:

- Bạn có thể nhấp, kéo, nhập, tải lên
- Trang sẽ thay đổi theo thời gian thực dựa trên hành động của bạn
- Có thể hoàn thành các công việc phức tạp như phần mềm (ví dụ: chỉnh sửa video trực tuyến)

**Lý do cốt lõi của sự thay đổi này là ba nền tảng của công nghệ web: HTML + CSS + JavaScript**.

### 1.2 Một phép so sánh: xây nhà

| Công nghệ           | 🏠 Phép so sánh nhà              | Tác dụng thực tế             | Ví dụ cụ thể                             |
| -------------- | ------------------------ | -------------------- | ------------------------------------ |
| **HTML**       | **Cấu trúc và vật liệu** của nhà     | Xác định nội dung và hệ thống phân cấp của trang web | Đây là một bức tường, đây là một cửa sổ, đây là một phòng |
| **CSS**        | **Nội thất và hình thức bên ngoài** của nhà     | Kiểm soát kiểu và bố cục của trang web | Sơn tường xanh, đặt cửa sổ về phía đông, lát sàn bằng gạch |
| **JavaScript** | **Thiết bị điện và hệ thống thông minh** của nhà | Cho trang web khả năng tương tác và logic | Bật công tắc, đèn sáng; mở cửa, rèm tự động kéo lại       |

::: tip 💡 Mối quan hệ giữa ba thành phần

**HTML → CSS**: Trước tiên phải có nhà, rồi mới có thể trang trí. HTML là nền tảng, CSS là trang trí.

**HTML + CSS → JavaScript**: Trước tiên phải có nhà và trang trí, rồi mới có thể lắp hệ thống thông minh. JavaScript sẽ biến trang "chết" thành trang "sống".

**Tư tưởng cốt lõi**: Cả ba thành phần đều có nhiệm vụ riêng, không thể thiếu một cái nào. Chỉ có HTML thì trang sẽ xấu, chỉ có HTML+CSS thì trang không thể tương tác, cả ba thành phần cùng nhau mới có thể tạo ra những "ứng dụng Web" như WeChat phiên bản web, Taobao.
:::

### 1.3 Hãy thử thực hành

👇 Bản demo dưới đây cho thấy ba thành phần HTML/CSS/JavaScript hoạt động cùng nhau như thế nào:

<WebTechTriad />

---

## 2. HTML: Bộ xương của trang web

### 2.1 Tại sao lại cần HTML?

Trước khi HTML xuất hiện, nội dung trên Internet chỉ là **văn bản thuần túy**. Giống như đoạn văn bạn đang đọc lúc này, không có bất kỳ định dạng nào, không có phân cấp, không có liên kết.

Vấn đề với văn bản thuần túy là gì?

- ❌ **Không thể biểu đạt phân cấp**: Không thể phân biệt tiêu đề, nội dung chính, ghi chú
- ❌ **Máy không hiểu**: Công cụ tìm kiếm, trình đọc màn hình (cho người khiếm thị) không thể hiểu nội dung
- ❌ **Không thể tương tác**: Không có liên kết, không có nút bấm, không có ô nhập liệu

**HTML (HyperText Markup Language)** ra đời để giải quyết vấn đề này. Nó sử dụng "thẻ" (tag) để đánh dấu ý nghĩa của nội dung, để cho trình duyệt biết "đây là cái gì".

### 2.2 Mã HTML trông như thế nào?

Đơn vị cơ bản của HTML là "thẻ" (tag). Thẻ được đặt trong dấu ngoặc nhọn `< >`, xuất hiện thành cặp:

```html
<h1>Đây là tiêu đề</h1>
<p>Đây là một đoạn</p>
<a href="url">Đây là một liên kết</a>
```

**Các khái niệm chính**:

| Khái niệm | Giải thích | Ví dụ |
|------|------|------|
| **Thẻ** | Dấu hiệu được bao bọc bởi dấu ngoặc nhọn | `<h1>`、`</h1>` |
| **Phần tử** | Toàn bộ thẻ + nội dung | `<h1>Tiêu đề</h1>` |
| **Thuộc tính** | Thông tin bổ sung trên thẻ | `href="url"`、`class="card"` |
| **Lồng nhau** | Đặt thẻ bên trong thẻ khác | `<div><p>Văn bản</p></div>` |

### 2.3 Làm sao hiểu được mã HTML?

::: tip 🎯 Bắt buộc đọc cho người mới bắt đầu: Cách nhìn code

Nhiều người mới bắt đầu sẽ choáng khi thấy một loạt `<xxx>`. Thực ra, nhìn mã HTML có **phương pháp cố định**:

**Bước thứ nhất: Tìm "lớp ngoài cùng"**

```html
<div class="card">        ← Đây là container, bên trong chứa nội dung
  <h2>Tiêu đề</h2>
  <p>Văn bản mô tả</p>
</div>
```

**Bước thứ hai: Nhìn tên thẻ để đoán ý nghĩa**

| Tên thẻ | Nhớ nhanh | Chứa gì bên trong |
|--------|----------|------------|
| `<div>` | Hộp lớn | Bất kỳ nội dung nào, dùng để nhóm |
| `<span>` | Hộp nhỏ | Đoạn văn bản, dùng để đánh dấu |
| `<p>` | Đoạn | Một đoạn văn bản |
| `<h1>`-`<h6>` | Tiêu đề | Văn bản tiêu đề, số càng nhỏ càng quan trọng |
| `<a>` | Anchor/Liên kết | Nội dung có thể nhấp để nhảy |
| `<img>` | Hình ảnh | Không chứa nội dung, dùng src để chỉ hình ảnh |
| `<button>` | Nút bấm | Văn bản/biểu tượng có thể nhấp |
| `<input>` | Ô nhập | Không chứa nội dung, nơi người dùng nhập liệu |

**Bước thứ ba: Nhìn class và id**

```html
<div class="user-card" id="user-123">
```

- `class="user-card"` → "loại" của phần tử này, CSS có thể chọn hàng loạt
- `id="user-123"` → "chứng minh thư" của phần tử này, định danh duy nhất

**Bước thứ tư: Thụt lề biểu thị phân cấp**

```html
<body>
  <header>           ← Thụt lề biểu thị header là con của body
    <nav>            ← nav là con của header
      <a>Trang chủ</a>    ← a là con của nav
    </nav>
  </header>
</body>
```
:::

### 2.4 Bảng tra cứu nhanh các thẻ HTML thường dùng

**Thẻ cấu trúc** (xác định bộ xương trang):

```html
<h1>Đây là tiêu đề cấp một</h1>
<h2>Đây là tiêu đề cấp hai</h2>
<p>Đây là một đoạn</p>
<div>Đây là một container (dùng để nhóm)</div>
<span>Đây là một container inline (dùng để đánh dấu văn bản)</span>
```

**Liên kết và phương tiện** (làm cho trang phong phú):

```html
<a href="https://example.com">Nhấp vào đây để nhảy</a>
<img src="photo.jpg" alt="Mô tả ảnh" />
<video src="movie.mp4" controls></video>
```

**Biểu mẫu** (thu thập dữ liệu nhập từ người dùng):

```html
<form>
  <input type="text" placeholder="Vui lòng nhập tên người dùng" />
  <input type="password" placeholder="Vui lòng nhập mật khẩu" />
  <button type="submit">Đăng nhập</button>
</form>
```

**Thẻ ngữ nghĩa** (HTML5 mới, làm cho ý nghĩa trang rõ ràng hơn):

```html
<header>Phần đầu trang</header>
<nav>Thanh điều hướng</nav>
<main>Khu vực nội dung chính</main>
<article>Một bài viết</article>
<aside>Thanh bên</aside>
<footer>Chân trang</footer>
```

::: tip 💡 Tại sao lại dùng thẻ ngữ nghĩa?

`<div class="header">` và `<header>` trông như có cùng hiệu ứng, tại sao lại dùng cái sau?

1. **Thân thiện với SEO**: Công cụ tìm kiếm có thể hiểu cấu trúc trang tốt hơn
2. **Khả năng truy cập**: Trình đọc màn hình có thể nhanh chóng định vị các khu vực như "điều hướng" "nội dung chính"
3. **Khả năng đọc code**: Thấy `<header>` là biết ngay là phần đầu

**Khi nào dùng div?** Khi không có thẻ ngữ nghĩa thích hợp. Ví dụ: một container tổng hợp thuần túy.
:::

### 2.5 Làm sao nhớ được rất nhiều thẻ HTML?

::: tip 🎯 Sự nhầm lẫn của người mới bắt đầu

"HTML có hơn một trăm thẻ, làm sao nhớ được?"

**Câu trả lời là: Không cần nhớ hết.** Trong thực tế phát triển, 90% tình huống chỉ dùng khoảng 20 thẻ.
:::

#### Nhớ theo chức năng

**Một: Loại cấu trúc trang (vẽ bộ xương)**

| Thẻ | Cách nhớ | Mục đích |
|------|----------|------|
| `<header>` | Đầu | Phần đầu trang hoặc khối |
| `<nav>` | Điều hướng | Khu vực liên kết điều hướng |
| `<main>` | Thân | Nội dung chính của trang (chỉ một trên mỗi trang) |
| `<article>` | Bài viết | Khối nội dung độc lập (có thể tách ra vẫn có ý nghĩa) |
| `<section>` | Mục | Nhóm nội dung có chủ đề |
| `<aside>` | Bên | Thanh bên, nội dung bổ trợ |
| `<footer>` | Chân | Phần chân trang hoặc khối |

**Cách nhớ**: Hãy tưởng tượng một tờ báo — có phần đầu báo (header), mục lục (nav), bài viết chính (main/article), chuyên mục (aside), phần chân (footer).

**Hai: Loại đánh dấu nội dung (nói rõ đây là cái gì)**

| Thẻ | Cách nhớ | Mục đích |
|------|----------|------|
| `<h1>`-`<h6>` | Tiêu đề 1-6 | Phân cấp tiêu đề, h1 lớn nhất và quan trọng nhất |
| `<p>` | Đoạn | Một đoạn văn bản |
| `<ul>`/`<ol>`/`<li>` | Không thứ tự/Có thứ tự/Mục | Danh sách |
| `<a>` | Anchor | Liên kết, nhảy tới |
| `<img>` | Hình ảnh | Hình ảnh |
| `<video>`/`<audio>` | Video/Âm thanh | Đa phương tiện |
| `<strong>`/`<em>` | Nhấn mạnh/Nhấn mạnh italic | Nhấn mạnh ngữ nghĩa |

**Cách nhớ**: `<a>` là viết tắt của anchor (neo), tưởng tượng tàu thuyền neo tại một chỗ, liên kết chính là "dừng lại" tại một trang khác.

**Ba: Loại tương tác biểu mẫu (thu thập dữ liệu nhập từ người dùng)**

| Thẻ | Cách nhớ | Mục đích |
|------|----------|------|
| `<form>` | Biểu mẫu | Container biểu mẫu |
| `<input>` | Nhập | Các ô nhập khác nhau (type quyết định loại) |
| `<textarea>` | Khu vực văn bản | Nhập văn bản nhiều dòng |
| `<select>`/`<option>` | Chọn/Tùy chọn | Chọn thả xuống |
| `<button>` | Nút bấm | Nút bấm |
| `<label>` | Nhãn | Văn bản giải thích cho ô nhập |

**Cách nhớ**: Thuộc tính `type` của `<input>` quyết định nó trông như thế nào:
- `type="text"` → Ô văn bản
- `type="password"` → Ô mật khẩu
- `type="email"` → Ô email
- `type="checkbox"` → Ô kiểm tra
- `type="radio"` → Ô chọn một

**Bốn: Loại container (dùng để nhóm)**

| Thẻ | Cách nhớ | Mục đích |
|------|----------|------|
| `<div>` | Hộp lớn | Container block, chiếm hết một hàng |
| `<span>` | Hộp nhỏ | Container inline, chỉ chiếm chiều rộng nội dung |

**Cách nhớ**: div = division (chia khu vực), span = span (khoảng cách). div dùng để chia các khu vực lớn, span dùng để đánh dấu các đoạn văn bản.

#### Gặp thẻ không biết thì sao?

**Phương pháp thứ nhất: Đoán từ tiếng Anh**

Nhiều thẻ là viết tắt của từ tiếng Anh:
- `<abbr>` = abbreviation (viết tắt)
- `<blockquote>` = block quote (trích dẫn khối)
- `<caption>` = caption (tiêu đề/chú thích)
- `<figcaption>` = figure caption (chú thích hình ảnh)

**Phương pháp thứ hai: Tra cứu MDN**

[Tham chiếu phần tử HTML của MDN](https://developer.mozilla.org/vi/docs/Web/HTML/Element) có mô tả chi tiết về tất cả các thẻ.

**Phương pháp thứ ba: Hỏi AI**

> "Thẻ `<dl>` trong HTML là gì? Khi nào dùng?"

#### Không cần cố ghi nhớ thẻ

**Quy trình làm việc thực tế như thế này:**

1. Bạn biết cần dùng một "container" → viết `<div>`
2. Sau đó phát hiện đây là "khu vực điều hướng" → đổi thành `<nav>`
3. Sau đó phát hiện đây là "bài viết độc lập" → đổi thành `<article>`

**Viết ra trước, tối ưu ngữ nghĩa sau**. Thẻ có thể sửa bất cứ lúc nào, không cần lo lắng lúc đầu dùng cái nào.

---

## 3. CSS: Làn da của trang web

### 3.1 Tại sao lại cần CSS?

Tưởng tượng bạn dọn vào một **ngôi nhà chưa hoàn thành**: có tường, cửa sổ, cửa chính, có thể ở được, nhưng:

- Tường là bê tông màu xám, không đẹp
- Ổ cắm điện và công tắc được lắp lung tung, không thẩm mỹ
- Không có nội thất, cuộc sống không tiện lợi

Chỉ có HTML mà không có CSS thì trang web cũng vậy: có nội dung, có cấu trúc, nhưng **xấu**, **lộn xộn**, **không thân thiện**.

CSS (Cascading Style Sheets) chính là "đội thi công" của trang web. Nó không thay đổi cấu trúc HTML (không phá tường, không sửa cửa), chỉ chịu trách nhiệm:

- 🎨 **Sơn tường**: Thay đổi màu sắc, nền
- 🖼️ **Treo tranh**: Thêm viền, bóng, góc tròn
- 🪑 **Sắp nội thất**: Điều chỉnh bố cục, khoảng cách, căn chỉnh

### 3.2 Mã CSS trông như thế nào?

Mã CSS có định dạng cố định:

```css
bộ chọn {
  tên thuộc tính: giá trị thuộc tính;
  tên thuộc tính: giá trị thuộc tính;
}
```

**Ba cách viết:**

```html
<!-- Cách một: CSS nội bộ (dùng tạm thời để test) -->
<div style="color: red;">Văn bản màu đỏ</div>

<!-- Cách hai: CSS nội bộ (viết trong file HTML) -->
<style>
  .red-text { color: red; }
</style>

<!-- Cách ba: CSS ngoài (file CSS riêng, được khuyến nghị) -->
<link rel="stylesheet" href="styles.css" />
```

### 3.3 Làm sao hiểu được mã CSS?

::: tip 🎯 Bắt buộc đọc cho người mới bắt đầu: Cách nhìn CSS

**Bước thứ nhất: Nhìn bộ chọn — "Trang trí cho ai?"**

| Bộ chọn | Cách viết | Ý nghĩa |
|--------|------|------|
| Bộ chọn thẻ | `p { }` | Tất cả thẻ `<p>` |
| Bộ chọn lớp | `.card { }` | Tất cả phần tử `class="card"` |
| Bộ chọn ID | `#header { }` | Phần tử duy nhất `id="header"` |
| Bộ chọn hậu duệ | `.card h2 { }` | Tất cả `<h2>` bên trong `.card` |
| Bộ chọn kết hợp | `.card, .box { }` | `.card` hoặc `.box` đều được chọn |

**Bước thứ hai: Nhìn thuộc tính — "Trang trí cái gì?"**

| Loại thuộc tính | Thuộc tính phổ biến | Tác dụng |
|----------|----------|------|
| Văn bản | `color`, `font-size`, `font-weight` | Màu, kích thước, độ dày |
| Nền | `background`, `background-color` | Màu nền, hình nền |
| Viền | `border`, `border-radius` | Đường viền, góc tròn |
| Khoảng cách | `margin`, `padding` | Lề ngoài, lề trong |
| Bố cục | `display`, `flex`, `grid` | Cách sắp xếp |

**Bước thứ ba: Nhìn giá trị — "Trang trí thành kiểu gì?"**

```css
.card {
  width: 300px;        /* Chiều rộng cố định */
  padding: 16px;       /* Lề trong 16 pixel */
  border-radius: 8px;  /* Góc tròn 8 pixel */
  background: #fff;    /* Nền trắng */
}
```

**Các đơn vị phổ biến**:
- `px`: Pixel, kích thước cố định
- `%`: Phần trăm, tương đối với phần tử cha
- `rem`: Tương đối với kích thước font gốc
- `vw/vh`: Tương đối với chiều rộng/chiều cao của viewport
:::

### 3.4 Độ ưu tiên bộ chọn

Nếu một phần tử được chọn bởi nhiều bộ chọn cùng lúc, ai sẽ quyết định?

```html
<p class="highlight" id="special">Đoạn văn bản này là màu gì?</p>
```

```css
p { color: red; }             /* Độ ưu tiên: 1 */
.highlight { color: yellow; } /* Độ ưu tiên: 10 */
#special { color: blue; }     /* Độ ưu tiên: 100 */
```

**Câu trả lời**: Xanh dương. Bộ chọn ID có độ ưu tiên cao nhất, bộ chọn lớp thứ nhì, bộ chọn thẻ thấp nhất.

**CSS nội bộ** (viết trong thuộc tính style) có độ ưu tiên là 1000, cao nhất!

### 3.5 Mô hình hộp: Tại sao chiều rộng tính sai?

::: tip 🎯 Tình huống thực tế

Bạn làm một trang web, yêu cầu ba thẻ card xếp thành hàng, mỗi card rộng 300px, container rộng 900px. Bạn viết:

```css
.card { width: 300px; }
```

Kết quả: **Card thứ ba rơi xuống hàng dưới!**

**Tại sao?** Vì `width: 300px` chỉ là chiều rộng nội dung, bạn quên tính padding và border. Nếu card có `padding: 20px` và `border: 1px`, chiều rộng thực tế là 342px, ba card là 1026px, vượt container rồi!
:::

Mỗi phần tử HTML trong CSS đều được coi là một "hộp", bao gồm bốn lớp. Tưởng tượng bạn đang **đóng gói hàng gửi**: nội dung là hàng hóa, padding là bọc khí, border là hộp carton, margin là khoảng cách giữa các hộp.

👇 **Hãy thử thực hành**: Kéo thanh trượt để điều chỉnh từng lớp, quan sát sự thay đổi của mô hình hộp:

<CssBoxModel />

**Giải pháp:**

```css
.box {
  box-sizing: border-box;  /* Cho phép width bao gồm padding và border */
  width: 200px;
  padding: 10px;
  border: 5px;
}
```

Cách này, `width: 200px` là chiều rộng cuối cùng, padding và border sẽ "nén" bên trong.

### 3.6 Flexbox: Làm sao các phần tử tự động căn chỉnh?

Flexbox là cách bố cục CSS hiện đại được sử dụng nhiều nhất. Nó để các phần tử tự động sắp xếp căn chỉnh, giống như những cuốn sách trên kệ sẽ tự động sắp xếp thành hàng.

👇 **Hãy thử thực hành**: Thay đổi hướng, cách căn chỉnh, quan sát cách những hộp được sắp xếp:

<CssFlexbox />

**Các khái niệm cốt lõi của Flex:**

| Thuộc tính | Tác dụng | Giá trị phổ biến |
|------|------|--------|
| `display: flex` | Bật bố cục Flex | - |
| `flex-direction` | Hướng trục chính | `row`（ngang），`column`（dọc） |
| `justify-content` | Căn chỉnh trục chính | `flex-start`、`center`、`space-between` |
| `align-items` | Căn chỉnh trục phụ | `stretch`、`center`、`flex-start` |
| `flex-wrap` | Có bao nhiêu hàng | `nowrap`、`wrap` |
| `gap` | Khoảng cách giữa các phần tử | `10px`、`1rem` |

### 3.7 Bộ tiền xử lý CSS: SCSS/SASS và LESS

::: tip 🎯 Tình huống thực tế

Bạn viết một dự án, file CSS có 2000 dòng. Sau đó muốn đổi màu chủ đề, bạn phát hiện:

- Màu sắc chính `#3b82f6` xuất hiện 50 lần
- Muốn đổi một màu phải tìm kiếm toàn bộ, còn sợ sót những chỗ
- Bộ chọn viết thành `.nav .nav-list .nav-item .nav-link` vừa dài vừa khó bảo trì

**Bộ tiền xử lý CSS** chính là để giải quyết những vấn đề này. Nó cho phép CSS "lập trình": có biến, có lồng nhau, có thể tái sử dụng code.
:::

#### 3.7.1 Bộ tiền xử lý CSS là gì?

**Nói bằng ngôn ngữ thường**: Bộ tiền xử lý là một "CSS thông minh hơn". Bạn viết kiểu dáng bằng cú pháp mạnh hơn, rồi nó giúp bạn **biên dịch** thành CSS thông thường, trình duyệt sẽ hiểu bình thường.

**Tại sao dùng?**

| Vấn đề | CSS gốc | Bộ tiền xử lý |
|------|----------|----------|
| Màu sắc lặp lại | Sao chép dán khắp nơi | Định nghĩa biến, một chỗ sửa toàn bộ |
| Bộ chọn sâu quá | Viết thành một dòng dài | Cú pháp lồng nhau, phân cấp rõ ràng |
| Code lặp lại | Sao chép dán | Mixin (tái sử dụng như function) |

#### 3.7.2 So sánh ba bộ tiền xử lý chính

| Tính năng | CSS gốc | **SCSS/SASS** | **LESS** |
|------|----------|---------------|----------|
| **Cách viết biến** | `--primary` | `$primary` | `@primary` |
| **Cú pháp lồng nhau** | ❌ Không hỗ trợ | ✅ Hỗ trợ | ✅ Hỗ trợ |
| **Mixin (tái sử dụng code)** | ❌ Không hỗ trợ | ✅ `@mixin` | ✅ `.mixin()` |
| **Độ khó học** | Đơn giản | Trung bình | Trung bình |
| **Mức độ phổ biến** | - | ⭐⭐⭐ Phổ biến nhất | ⭐⭐ Khá phổ biến |

**Nhớ đơn giản**:
- **SCSS**: Dùng ký hiệu `$`, Bootstrap 5 đang dùng, hệ sinh thái tốt nhất
- **LESS**: Dùng ký hiệu `@`, cách viết giống `@media` của CSS, dễ bắt đầu

#### 3.7.3 So sánh ví dụ về tính năng cốt lõi

##### 1. Biến: Sửa ở một chỗ, tác dụng toàn bộ

**Tình huống**: Màu chính `#3b82f6` được dùng ở 20 chỗ, muốn đổi thành màu đỏ.

<Tabs>
<TabItem label="CSS gốc">

```css
/* Phải sửa 20 chỗ, dễ sót */
.button { background: #3b82f6; }
.link { color: #3b82f6; }
.border { border-color: #3b82f6; }
```

</TabItem>
<TabItem label="SCSS">

```scss
$primary: #3b82f6;

.button { background: $primary; }
.link { color: $primary; }
.border { border-color: $primary; }
/* Sửa $primary ở một chỗ là được */
```

</TabItem>
<TabItem label="LESS">

```less
@primary: #3b82f6;

.button { background: @primary; }
.link { color: @primary; }
.border { border-color: @primary; }
/* Sửa @primary ở một chỗ là được */
```

</TabItem>
</Tabs>

##### 2. Lồng nhau: Phân cấp rõ ràng

**Tình huống**: Thanh điều hướng có nhiều lớp cấu trúc.

<Tabs>
<TabItem label="CSS gốc">

```css
/* Viết thành một dòng dài, khó nhìn phân cấp */
.navbar .nav-list .nav-item .nav-link { }
.navbar .nav-list .nav-item .nav-link:hover { }
```

</TabItem>
<TabItem label="SCSS">

```scss
.navbar {
  .nav-list {
    .nav-item {
      .nav-link {
        &:hover { }  /* & biểu thị bộ chọn cha */
      }
    }
  }
}
```

</TabItem>
<TabItem label="LESS">

```less
.navbar {
  .nav-list {
    .nav-item {
      .nav-link {
        &:hover { }
      }
    }
  }
}
```

</TabItem>
</Tabs>

##### 3. Mixin (tái sử dụng đoạn code)

**Tình huống**: Nhiều nút bấm đều cần kiểu "căn giữa".

<Tabs>
<TabItem label="CSS gốc">

```css
/* Sao chép dán 3 lần */
.btn-primary {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-secondary {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

</TabItem>
<TabItem label="SCSS">

```scss
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-primary { @include center; }
.btn-secondary { @include center; }
```

</TabItem>
<TabItem label="LESS">

```less
.center() {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-primary { .center(); }
.btn-secondary { .center(); }
```

</TabItem>
</Tabs>

#### 3.7.4 Cách lựa chọn?

| Tình huống | Được khuyến nghị lựa chọn |
|------|----------|
| Mới bắt đầu học, dự án nhỏ | **CSS gốc**（xây dựng nền tảng trước）|
| Dự án dùng Bootstrap 5 | **SCSS**（mã nguồn Bootstrap là SCSS） |
| Nhóm quen dấu `@` | **LESS**（cách viết giống `@media` của CSS）|
| Cần logic phức tạp（vòng lặp, điều kiện） | **SCSS**（tính năng mạnh hơn）|

#### 3.7.5 Sử dụng trong dự án

**Dự án Vite（đơn giản nhất）:**

```bash
# Cài đặt sass
npm install -D sass

# Dùng trực tiếp file .scss hoặc .less
```

::: tip 💡 Lời khuyên cho người mới bắt đầu

1. **Học tốt CSS gốc trước**: Bộ tiền xử lý chỉ là "syntactic sugar", không hiểu CSS cơ bản sẽ càng dùng càng lộn
2. **Dự án nhỏ không cần dùng**: CSS dưới 200 dòng, viết CSS gốc đơn giản hơn
3. **Bắt đầu từ SCSS**: Cú pháp gần như CSS, chỉ thêm ký hiệu `$` biến
4. **Đừng lồng nhau quá sâu**: Quá 3 lớp sẽ khó bảo trì
:::

#### 3.7.6 So sánh tổ chức file của các tech stack khác nhau

**Cùng một dự án, dùng tech stack khác nhau, cấu trúc file khác ra sao?**

<Tabs>
<TabItem label="HTML gốc + CSS">

```
my-website/
├── index.html              # Cấu trúc trang
├── about.html
├── css/
│   ├── reset.css           # Đặt lại kiểu
│   ├── layout.css          # Kiểu bố cục
│   ├── components.css      # Kiểu component
│   └── style.css           # Kiểu chính（có thể hàng nghìn dòng）
├── js/
│   └── main.js
└── images/
    └── logo.png
```

**Đặc điểm**:
- CSS tập trung trong một hoặc vài file
- Sửa kiểu phải qua lại giữa HTML và CSS
- Kiểu dễ xung đột nhau

</TabItem>
<TabItem label="Vue + CSS gốc">

```
src/
├── components/             # Thư mục component
│   ├── Button/
│   │   ├── Button.vue      # Template + Kiểu + Logic
│   │   └── Button.test.js
│   ├── Header/
│   │   └── Header.vue
│   └── Footer/
│       └── Footer.vue
├── views/                  # Thư mục trang
│   ├── Home.vue
│   └── About.vue
├── App.vue                 # Component gốc
└── main.js                 # File khởi động
```

**Cấu trúc bên trong Button.vue**:
```vue
<template>
  <button class="btn">Nhấp</button>
</template>

<script>
export default { name: 'Button' }
</script>

<style scoped>              <!-- kiểu scoped chỉ ảnh hưởng component này -->
.btn { background: #3b82f6; }
</style>
```

</TabItem>
<TabItem label="Vue + SCSS">

```
src/
├── assets/
│   └── styles/
│       ├── _variables.scss     # Biến: màu, khoảng cách
│       ├── _mixins.scss        # Mixin: tái sử dụng code
│       ├── _functions.scss     # Function: tính toán màu
│       └── global.scss         # Điểm vào kiểu toàn cục
├── components/
│   ├── Button/
│   │   └── Button.vue          # Component dùng @import để gọi biến
│   └── Card/
│       └── Card.vue
├── views/
│   ├── Home.vue
│   └── About.vue
├── App.vue
└── main.js
```

**_variables.scss**:
```scss
$primary: #3b82f6;
$secondary: #64748b;
$spacing-sm: 8px;
$spacing-md: 16px;
```

**Button.vue**:
```vue
<style scoped lang="scss">
@import '@/assets/styles/variables';

.btn {
  background: $primary;      // Dùng biến
  padding: $spacing-md;
}
</style>
```

</TabItem>
<TabItem label="Vue + Tailwind CSS">

```
src/
├── components/
│   ├── Button.vue          # Không cần block style
│   ├── Card.vue
│   └── Header.vue
├── views/
│   ├── Home.vue
│   └── About.vue
├── App.vue
└── main.js

# File cấu hình（thư mục gốc）
tailwind.config.js          # Cấu hình theme
tailwind.css                # File kiểu cơ bản
```

**Button.vue**（không có block style）:
```vue
<template>
  <button class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
    Nhấp
  </button>
</template>
```

**Đặc điểm**:
- Không có file kiểu riêng biệt
- Tên lớp chính là kiểu（`bg-blue-500` = nền xanh）
- Cấu hình tập trung trong `tailwind.config.js`

</TabItem>
</Tabs>

**Tóm tắt sự khác biệt cốt lõi**:

| Tech stack | Vị trí file kiểu | Quản lý theme | Tái sử dụng code |
|--------|-------------|----------|----------|
| HTML+CSS gốc | Tập trung trong thư mục `css/` | Tìm kiếm thay thế | Sao chép dán |
| Vue + CSS | Phân tán trong component `.vue` | Tìm kiếm thay thế | Sao chép dán |
| Vue + SCSS | Trong component + file `styles/` chung | Quản lý biến tập trung | Tái sử dụng mixin |
| Vue + Tailwind | Không（trong tên lớp） | `tailwind.config.js` | Kết hợp tên lớp |

### 3.8 Làm sao nhớ được rất nhiều thuộc tính CSS?

::: tip 🎯 Sự nhầm lẫn của người mới bắt đầu

"CSS có hàng trăm thuộc tính, làm sao nhớ được?"

**Câu trả lời là: Phân loại theo chức năng, nhớ các thuộc tính cốt lõi, những cái khác dùng đến rồi tra.**
:::

#### Nhớ theo chức năng

**Một: Loại sắp xếp văn bản（quản lý văn bản trông như thế nào）**

| Thuộc tính | Cách nhớ | Giá trị thường dùng |
|------|----------|--------|
| `color` | Màu sắc | `red`、`#fff`、`rgb(0,0,0)` |
| `font-size` | Cỡ chữ | `16px`、`1rem`、`1.5em` |
| `font-weight` | Độ dày chữ | `normal`、`bold`、`100`-`900` |
| `font-family` | Kiểu chữ | `"Microsoft YaHei"`、`sans-serif` |
| `line-height` | Chiều cao dòng | `1.5`、`24px` |
| `text-align` | Căn chỉnh văn bản | `left`、`center`、`right` |
| `text-decoration` | Trang trí văn bản | `none`、`underline`、`line-through` |

**Cách nhớ**: Tưởng tượng bạn sắp xếp văn bản trong Word — đổi màu, đổi cỡ, làm đậm, đổi font, điều chỉnh dòng, căn chỉnh, thêm gạch chân.

**Hai: Loại mô hình hộp（quản lý phần tử chiếm bao nhiêu không gian）**

| Thuộc tính | Cách nhớ | Giá trị thường dùng |
|------|----------|--------|
| `width`/`height` | Chiều rộng/Chiều cao | `100px`、`50%`、`100vw` |
| `padding` | Lề trong | `10px`、`10px 20px` |
| `margin` | Lề ngoài | `10px`、`auto`（căn giữa） |
| `border` | Viền | `1px solid #ccc` |
| `border-radius` | Góc tròn | `4px`、`50%`（hình tròn） |
| `box-sizing` | Mô hình hộp | `border-box`（được khuyến nghị） |

**Cách nhớ**: padding là lề "trong"（khoảng cách từ nội dung đến viền），margin là lề "ngoài"（khoảng cách từ viền đến phần tử khác）.

**Cách viết tắt**:
```css
/* Bốn giá trị: trên phải dưới trái（theo chiều kim đồng hồ） */
padding: 10px 20px 15px 25px;

/* Hai giá trị: trên-dưới trái-phải */
padding: 10px 20px;

/* Một giá trị: bốn hướng giống nhau */
padding: 10px;
```

**Ba: Loại nền và viền（quản lý phần tử trông như thế nào）**

| Thuộc tính | Cách nhớ | Giá trị thường dùng |
|------|----------|--------|
| `background` | Nền | `#fff`、`url(bg.jpg)`、`linear-gradient(...)` |
| `background-color` | Màu nền | `#fff`、`rgba(0,0,0,0.5)` |
| `background-image` | Hình nền | `url(photo.jpg)` |
| `background-size` | Cỡ nền | `cover`、`contain`、`100%` |
| `background-position` | Vị trí nền | `center`、`top left` |
| `box-shadow` | Bóng hộp | `0 2px 10px rgba(0,0,0,0.1)` |
| `opacity` | Độ trong suốt | `0`-`1`（0 hoàn toàn trong suốt） |

**Cách nhớ**: `background` là tắt gọn, có thể đặt nhiều giá trị cùng lúc:
```css
background: #fff url(bg.jpg) no-repeat center/cover;
/*          màu   hình        lặp lại      vị trí/cỡ */
```

**Bốn: Loại bố cục（quản lý cách phần tử xếp hàng）**

| Thuộc tính | Cách nhớ | Giá trị thường dùng |
|------|----------|--------|
| `display` | Hiển thị | `block`、`inline`、`flex`、`grid`、`none` |
| `position` | Định vị | `static`、`relative`、`absolute`、`fixed`、`sticky` |
| `top`/`right`/`bottom`/`left` | Bốn hướng | `10px`、`50%`（dùng với position） |
| `z-index` | Mức độ | Số càng lớn càng ở trên |
| `float` | Nổi | `left`、`right`（cách cũ, không khuyến nghị） |
| `overflow` | Tràn | `visible`、`hidden`、`scroll`、`auto` |

**Cách nhớ position**:
- `static`: Mặc định, dòng bình thường
- `relative`: Lệch vị trí so với chính nó
- `absolute`: Định vị so với tổ tiên định vị gần nhất
- `fixed`: Định vị so với viewport（cuộn cũng không động）
- `sticky`: Cuộn đến một chỗ nhất định rồi cố định

**Năm: Loại bố cục Flexbox（thần kỳ bố cục một chiều）**

| Thuộc tính | Cách nhớ | Tác dụng |
|------|----------|------|
| `display: flex` | Bật Flex | Container thành container Flex |
| `flex-direction` | Hướng | `row`（ngang）、`column`（dọc） |
| `justify-content` | Căn chỉnh trục chính | Phần tử sắp xếp trên trục chính |
| `align-items` | Căn chỉnh trục phụ | Phần tử căn chỉnh trên trục phụ |
| `flex-wrap` | Ngắt hàng | `nowrap`、`wrap` |
| `gap` | Khoảng trống | Khoảng cách giữa phần tử |
| `flex` | Đàn hồi | Tỷ lệ giãn nở của phần tử con |

**Cách nhớ**:
- `justify` = chứng minh/căn chỉnh → căn chỉnh trục chính
- `align` = sắp xếp/căn chỉnh → căn chỉnh trục phụ

**Sáu: Loại hoạt ảnh chuyển đổi（quản lý phần tử chuyển động）**

| Thuộc tính | Cách nhớ | Giá trị thường dùng |
|------|----------|--------|
| `transition` | Chuyển đổi | `all 0.3s ease` |
| `transform` | Biến hình | `translate(10px)`、`rotate(45deg)`、`scale(1.1)` |
| `animation` | Hoạt ảnh | `fadeIn 1s ease forwards` |

**Cách viết tắt**:
```css
/* transition: thuộc tính thời gian hàm timing độ trễ */
transition: all 0.3s ease 0s;

/* transform có thể kết hợp nhiều biến đổi */
transform: translateX(10px) rotate(45deg) scale(1.1);
```

#### Gặp thuộc tính không biết thì sao?

**Phương pháp thứ nhất: Đoán từ tiếng Anh**

Nhiều thuộc tính là từ tiếng Anh hoặc viết tắt:
- `margin` = lề, không gian
- `padding` = đệm, lót
- `border` = biên giới
- `visibility` = khả năng nhìn
- `cursor` = con trỏ

**Phương pháp thứ hai: Liên tưởng theo tình huống**

Khi bạn muốn thực hiện hiệu ứng nào, hãy tưởng tượng "từ khóa":

| Tôi muốn... | Thuộc tính có thể |
|---------|------------|
| Đổi màu | `color`、`background-color`、`border-color` |
| Đổi kích thước | `width`、`height`、`font-size` |
| Đổi vị trí | `margin`、`position`、`top/left` |
| Đổi khoảng cách | `padding`、`margin`、`gap` |
| Ẩn phần tử | `display: none`、`visibility: hidden`、`opacity: 0` |
| Căn giữa | `margin: auto`、`text-align: center`、`justify-content: center` |
| Góc tròn | `border-radius` |
| Thêm bóng | `box-shadow`、`text-shadow` |
| Thêm hoạt ảnh | `transition`、`animation` |

**Phương pháp thứ ba: Tra cứu MDN hoặc hỏi AI**

[Tham chiếu thuộc tính CSS của MDN](https://developer.mozilla.org/vi/docs/Web/CSS/Reference) có mô tả chi tiết về tất cả các thuộc tính.

> "CSS làm sao để chỉ hiển thị một dòng văn bản, phần vượt quá dùng dấu ba chấm?"

**Phương pháp thứ tư: Dùng công cụ phát triển để "ăn cắp từ người khác"**

Thấy trang web đẹp mà thích:
1. Chuột phải → "Kiểm tra"
2. Chọn phần tử, xem bảng Styles
3. Sao chép trực tiếp thuộc tính CSS

#### Không cần cố ghi nhớ thuộc tính

**Quy trình làm việc thực tế như thế này:**

1. Bạn biết cần "căn giữa" → tìm kiếm "CSS căn giữa"
2. Sao chép code, sửa số liệu
3. Dùng nhiều lần rồi tự nhiên nhớ

**Đường dẫn học tập được khuyến nghị:**

1. **Nắm vững mô hình hộp trước**: `width`、`height`、`padding`、`margin`、`border`
2. **Tiếp tục nắm Flexbox**: `display: flex`、`justify-content`、`align-items`
3. **Sau đó nắm định vị**: `position`、`top/left`、`z-index`
4. **Cuối cùng học hoạt ảnh**: `transition`、`transform`、`animation`

Những thuộc tính khác dùng đến rồi tra, dùng nhiều rồi tự nhiên nhớ.

---

## 4. JavaScript: Bộ não của trang web

### 4.1 Tại sao lại cần JavaScript?

Chỉ có HTML + CSS mà không có JavaScript, trang web giống như **những tấm người mẫu trong tủ quần áo**:

- ✅ Trông rất đẹp（CSS）
- ✅ Cấu trúc rõ ràng（HTML）
- ❌ Nhưng nói chuyện với nó, nó không trả lời
- ❌ Nhấn nút, không có gì xảy ra

**JavaScript** biến trang web từ "người mẫu trong tủ quần áo" thành "người thật":

- ✅ Nhấn nút, bật lên thông báo
- ✅ Nhập văn bản, kiểm tra định dạng theo thời gian thực
- ✅ Cuộn trang, tải thêm nội dung
- ✅ Gửi biểu mẫu, hiển thị "đang gửi..."

### 4.2 Mã JavaScript trông như thế nào?

**Khả năng thứ nhất: Ghi nhớ dữ liệu**（biến）

```javascript
let userName = 'Trương Tam'
let isLoggedIn = true
let cartCount = 5
```

**Khả năng thứ hai: Lặp lại công việc**（hàm）

```javascript
function sayHello(name) {
  return 'Xin chào, ' + name + '!'
}

console.log(sayHello('Trương Tam'))  // Kết quả: Xin chào, Trương Tam!
```

**Khả năng thứ ba: Phản ứng lại sự kiện**（lắng nghe sự kiện）

```javascript
button.addEventListener('click', function() {
  alert('Nút bấm đã được nhấp!')
})
```

**Khả năng thứ tư: Sửa trang**（thao tác DOM）

```javascript
document.getElementById('title').textContent = 'Tiêu đề mới'
document.getElementById('box').style.background = 'red'
```

### 4.3 Làm sao hiểu được mã JavaScript?

::: tip 🎯 Bắt buộc đọc cho người mới bắt đầu: Cách nhìn JS

**Bước thứ nhất: Tìm biến — "Ghi nhớ cái gì?"**

```javascript
const API_URL = 'https://api.example.com'  // Hằng số, không thay đổi
let count = 0                                // Biến, sẽ thay đổi
const user = { name: 'Trương Tam', age: 25 }       // Đối tượng, nhiều dữ liệu
const items = ['Táo', 'Chuối', 'Cam']        // Mảng, danh sách dữ liệu
```

**Bước thứ hai: Tìm hàm — "Làm được gì?"**

```javascript
// Tên hàm thường cho biết dùng để làm gì
function handleClick() { }      // Xử lý click
function fetchData() { }        // Lấy dữ liệu
function validateForm() { }     // Xác thực biểu mẫu
```

**Bước thứ ba: Tìm sự kiện — "Khi nào kích hoạt?"**

```javascript
button.addEventListener('click', handleClick)     // Khi click
input.addEventListener('input', validateForm)     // Khi nhập
window.addEventListener('scroll', loadMore)       // Khi cuộn
```

**Bước thứ tư: Tìm thao tác DOM — "Sửa cái gì?"**

```javascript
element.textContent = 'Nội dung mới'     // Sửa văn bản
element.classList.add('active')    // Thêm lớp kiểu
element.style.display = 'none'     // Ẩn phần tử
parent.appendChild(child)          // Thêm phần tử
```
:::

### 4.4 DOM: JavaScript làm sao thao tác trang?

Sau khi trình duyệt đọc mã HTML, nó không coi chúng là một đống ký tự mà vẽ chúng thành một "cây" trong bộ nhớ:

```
Document（tài liệu）
    ↓
<html>
    ├─<head>
    │   └─<title>Trang web của tôi</title>
    └─<body>
        ├─<h1>Chào mừng</h1>
        └─<div class="card">
            ├─<img src="photo.jpg">
            └─<p>Một đoạn văn bản</p>
```

Cây này gọi là **DOM tree**. Mỗi thẻ HTML là một "nút" trên cây.

**Làm sao tìm nút?**

```javascript
// Tìm theo ID（nhanh nhất, duy nhất）
const element = document.getElementById('header')

// Tìm theo bộ chọn（dùng nhiều nhất）
const element = document.querySelector('.card h2')    // Tìm cái đầu
const elements = document.querySelectorAll('button')  // Tìm tất cả

// Tìm theo mối quan hệ
element.parentNode           // Tìm nút cha
element.children             // Tìm nút con
element.nextElementSibling   // Tìm anh em tiếp theo
```

**Cảnh báo hiệu suất**: Thao tác DOM rất **mắc**. Mỗi lần sửa DOM, trình duyệt phải tính toán lại bố cục, vẽ lại.

```javascript
// ❌ Kém hiệu quả: Vòng lặp 1000 lần, mỗi lần thao tác DOM
for (let i = 0; i < 1000; i++) {
  document.body.appendChild(createDiv())
}

// ✅ Hiệu quả: Sắp xếp trước, thêm một lần
const fragment = document.createDocumentFragment()
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(createDiv())
}
document.body.appendChild(fragment)
```

Đây cũng chính là lý do **Vue / React** và những framework hiện đại ra đời: Chúng chơi "DOM ảo" trong bộ nhớ, tính toán xong mới thay đổi DOM thực.

👇 **Hãy thử thực hành**: Những phương pháp cơ bản để thao tác DOM:

<DomManipulator />

### 4.5 ECMAScript: Sự tiến hóa phiên bản của JavaScript

**ECMAScript** là "sách hướng dẫn kỹ thuật" của JavaScript. Các nhà sản xuất trình duyệt thực hiện JavaScript engine theo tiêu chuẩn này.

#### Tại sao phải có số phiên bản?

JavaScript không phải là bất biến. Mỗi năm đều có tính năng mới, sửa lỗi. Số phiên bản cho bạn biết "trình duyệt này hỗ trợ những tính năng nào".

#### Tổng quan các phiên bản quan trọng

| Phiên bản | Năm | Tính năng cốt lõi | Giải quyết vấn đề gì |
|------|------|----------|----------------|
| **ES5** | 2009 | Chế độ nghiêm ngặt, `forEach`/`map`/`filter` | Chuẩn hóa ngôn ngữ, thêm phương thức mảng |
| **ES6/ES2015** | 2015 | `let/const`、mũi tên hàm、`class`、`Promise`、module hóa | Cập nhật lớn nhất, điểm khởi đầu JS hiện đại |
| **ES2016** | 2016 | `includes()`、`**` lũy thừa | Cập nhật nhỏ |
| **ES2017** | 2017 | `async/await`、`Object.entries()` | Code bất đồng bộ dễ đọc hơn |
| **ES2018** | 2018 | Toán tử `...` mở rộng、`Promise.finally()` | Tăng cường đối tượng và code bất đồng bộ |
| **ES2020** | 2020 | Xâu chuỗi tùy chọn `?.`、hợp nhất null `??`、`BigInt` | Truy cập an toàn các thuộc tính lồng |
| **ES2021** | 2021 | `replaceAll()`、gán logic `??=` | Tăng cường chuỗi ký tự và gán |
| **ES2022** | 2022 | `await` ở mức đầu、chỉ mục `.at()` | Tải module bất đồng bộ thuận tiện hơn |

#### Cú pháp ES6+ được sử dụng nhiều nhất

**1. `let` và `const` thay thế `var`**

```javascript
// ❌ Cách cũ: var có hoisting, dễ gây lỗi
var name = 'Trương Tam'
if (true) {
  var name = 'Lý Tứ'  // Ghi đè name bên ngoài
}
console.log(name)  // 'Lý Tứ', không như mong đợi

// ✅ Cách mới: let có phạm vi block
let name = 'Trương Tam'
if (true) {
  let name = 'Lý Tứ'  // Chỉ có hiệu lực trong if này
}
console.log(name)  // 'Trương Tam', theo mong đợi

// ✅ const: Sau khi khai báo không thể gán lại
const PI = 3.14159
PI = 3  // Lỗi! Ngăn chỉnh sửa vô ý
```

**2. Mũi tên hàm: Cách viết hàm ngắn gọn hơn**

```javascript
// ❌ Cách cũ
const add = function(a, b) {
  return a + b
}

// ✅ Cách mới
const add = (a, b) => a + b

// Mũi tên hàm liên kết this vào phạm vi bên ngoài
const obj = {
  name: 'Trương Tam',
  // ❌ Hàm thường: this chỉ người gọi
  oldWay: function() {
    setTimeout(function() {
      console.log(this.name)  // undefined
    }, 100)
  },
  // ✅ Mũi tên hàm: this thừa hưởng từ obj
  newWay: function() {
    setTimeout(() => {
      console.log(this.name)  // 'Trương Tam'
    }, 100)
  }
}
```

**3. Giải cấu trúc: Trích xuất dữ liệu từ đối tượng/mảy**

```javascript
// Giải cấu trúc đối tượng
const user = { name: 'Trương Tam', age: 25, city: 'Bắc Kinh' }
const { name, age } = user  // Trích xuất trực tiếp
console.log(name)  // 'Trương Tam'

// Giải cấu trúc mảng
const colors = ['đỏ', 'xanh', 'xanh dương']
const [first, second] = colors
console.log(first)  // 'đỏ'

// Tham số hàm giải cấu trúc
function greet({ name, age }) {
  console.log(`${name} năm nay ${age} tuổi`)
}
greet(user)  // 'Trương Tam năm nay 25 tuổi'
```

**4. Chuỗi template: Nối chuỗi không còn đau đầu**

```javascript
// ❌ Cách cũ: Một đống dấu ngoặc và cộng
const msg = 'Người dùng ' + name + ' có tuổi là ' + age + ' tuổi'

// ✅ Cách mới: Dấu backtick + ${}
const msg = `Người dùng ${name} có tuổi là ${age} tuổi`

// Hỗ trợ nhiều dòng
const html = `
  <div class="card">
    <h2>${name}</h2>
    <p>Tuổi: ${age}</p>
  </div>
`
```

**5. `async/await`: Viết code bất đồng bộ như code đồng bộ**

```javascript
// ❌ Callback hell
fetchUser(function(user) {
  fetchOrders(user.id, function(orders) {
    fetchDetails(orders[0].id, function(details) {
      console.log(details)
    })
  })
})

// ✅ async/await
async function getUserData() {
  const user = await fetchUser()
  const orders = await fetchOrders(user.id)
  const details = await fetchDetails(orders[0].id)
  console.log(details)
}
```

**6. Xâu chuỗi tùy chọn `?.` và hợp nhất null `??`**

```javascript
const user = {
  name: 'Trương Tam',
  address: {
    city: 'Bắc Kinh'
  }
}

// ❌ Cách cũ: Kiểm tra từng lớp
const street = user && user.address && user.address.street
const streetName = street !== undefined ? street : 'Không biết'

// ✅ Cách mới: Xâu chuỗi tùy chọn + hợp nhất null
const streetName = user?.address?.street ?? 'Không biết'
```

::: tip 💡 Làm sao biết trình duyệt hỗ trợ tính năng nào?

1. **Tra bảng tương thích**: [caniuse.com](https://caniuse.com/) nhập tên tính năng
2. **Dùng công cụ xây dựng**: Babel có thể biên dịch cú pháp mới thành code trình duyệt cũ hỗ trợ
3. **Xem đối tượng nhắm đến**: Nếu chỉ hỗ trợ trình duyệt hiện đại, phần lớn tính năng ES6+ có thể dùng trực tiếp
:::

### 4.6 TypeScript: Thêm ràng buộc loại cho JavaScript

#### Tại sao cần TypeScript?

**Tình huống thứ nhất: Loại tham số hàm không chắc chắn**

```javascript
// JavaScript
function calculateTotal(price, quantity) {
  return price * quantity
}

calculateTotal(100, 5)      // 500 ✅
calculateTotal('100', 5)    // '1005' ❌ Nối chuỗi chứ không phải nhân
calculateTotal(100, '5')    // 500 ✅ Nhưng là may mắn
```

JavaScript sẽ không báo lỗi loại tham số, chỉ khi chạy mới phát hiện.

**Tình huống thứ hai: Sai chính tả thuộc tính đối tượng**

```javascript
// JavaScript
const user = {
  name: 'Trương Tam',
  age: 25
}

console.log(user.nmae)  // undefined, sai chính tả nhưng không báo lỗi
```

**TypeScript giải quyết những vấn đề này:**

```typescript
// TypeScript
interface User {
  name: string
  age: number
}

function greet(user: User) {
  console.log(`Xin chào, ${user.name}`)
  console.log(user.nmae)  // ❌ Lỗi biên dịch: thuộc tính 'nmae' không tồn tại
}

greet({ name: 'Trương Tam', age: 25 })        // ✅
greet({ name: 'Trương Tam', age: '25' })      // ❌ Lỗi biên dịch: age phải là number
greet({ name: 'Trương Tam' })                 // ❌ Lỗi biên dịch: thiếu age
```

#### Các khái niệm cốt lõi của TypeScript

**1. Loại cơ bản**

```typescript
let name: string = 'Trương Tam'
let age: number = 25
let isActive: boolean = true
let anyValue: any = 'có thể là bất kỳ loại nào'  // Không khuyến nghị, mất kiểm tra loại
```

**2. Giao diện（Interface）: Định nghĩa cấu trúc đối tượng**

```typescript
interface Product {
  id: number
  name: string
  price: number
  discount?: number  // Thuộc tính tùy chọn
  readonly createdAt: Date  // Thuộc tính chỉ đọc
}

const product: Product = {
  id: 1,
  name: 'iPhone 15',
  price: 6999,
  createdAt: new Date()
}
```

**3. Bí danh loại（Type）**

```typescript
type ID = string | number  // Loại hợp
type Status = 'pending' | 'approved' | 'rejected'  // Loại chữ

function updateStatus(id: ID, status: Status) {
  // ...
}

updateStatus(1, 'approved')      // ✅
updateStatus('abc', 'pending')   // ✅
updateStatus(1, 'processing')    // ❌ 'processing' không phải Status hợp lệ
```

**4. Loại chung（Generic）: Loại có thể tái sử dụng**

```typescript
// Không dùng loại chung: mỗi loại viết một lần
function getFirstNumber(arr: number[]): number {
  return arr[0]
}
function getFirstString(arr: string[]): string {
  return arr[0]
}

// Dùng loại chung: một hàm giải quyết tất cả
function getFirst<T>(arr: T[]): T {
  return arr[0]
}

getFirst([1, 2, 3])        // Trả về number
getFirst(['a', 'b', 'c'])  // Trả về string
```

#### So sánh TypeScript và JavaScript

| Tính năng | JavaScript | TypeScript |
|------|------------|------------|
| Kiểm tra loại | Chỉ lúc chạy mới phát hiện lỗi | Lúc biên dịch đã phát hiện lỗi |
| Hỗ trợ IDE | Gợi ý cơ bản | Tự động hoàn thành thông minh, refactor, nhảy định nghĩa |
| Đường cong học tập | Dễ | Cần học hệ thống loại |
| Trường hợp sử dụng | Dự án nhỏ, prototype | Dự án lớn, hợp tác nhóm |
| Cách chạy | Trình duyệt chạy trực tiếp | Cần biên dịch thành JavaScript |

#### TypeScript trong phát triển thực tế

```typescript
// Định nghĩa loại phản hồi API
interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

interface User {
  id: number
  name: string
  email: string
}

// Yêu cầu API có loại
async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}

// IDE sẽ gợi ý tất cả thuộc tính
fetchUser(1).then(res => {
  console.log(res.data.name)   // ✅ IDE tự động hoàn thành
  console.log(res.data.nmae)   // ❌ Lỗi biên dịch
})
```

::: tip 💡 Lời khuyên cho người mới bắt đầu

1. **Học tốt JavaScript trước**: TypeScript là tập hợp của JS, không hiểu JS cơ bản sẽ rất khó
2. **Dự án nhỏ không cần dùng TS**: Định nghĩa loại sẽ tăng lượng code, dự án đơn giản sẽ phức tạp hơn
3. **Bắt đầu từ JSDoc**: Viết `/** @type {User} */` trong file JS, trải nghiệm gợi ý loại
4. **`any` là thỏa hiệp, không phải giải pháp**: Gặp vấn đề loại, hãy thử giải quyết trước, đừng dùng `any` ngay
:::

### 4.7 Chuỗi công cụ phát triển JavaScript hiện đại

::: tip 🎯 Tại sao cần chuỗi công cụ?

Trình duyệt chỉ hiểu HTML/CSS/JS. Nhưng phát triển hiện đại, chúng ta sẽ dùng:

- **TypeScript**: Trình duyệt không hiểu, cần biên dịch thành JS
- **SCSS/Less**: Trình duyệt không hiểu, cần biên dịch thành CSS
- **Module hóa**: `import/export` cần được gói lại thành một file
- **Cú pháp mới**: ES6+ cần được dịch thành cú pháp trình duyệt cũ hỗ trợ

Chuỗi công cụ là để chuyển "code mà chúng ta viết khi phát triển" thành "code mà trình duyệt có thể chạy".
:::

**Công cụ cốt lõi**:

| Công cụ | Tác dụng | Phép so sánh |
|------|------|------|
| **Node.js** | Môi trường chạy JavaScript | Cho phép JS chạy ngoài trình duyệt |
| **npm/yarn/pnpm** | Quản lý gói | Tải code được viết sẵn của người khác |
| **Vite/Webpack** | Công cụ xây dựng | Gói code nguồn thành code trình duyệt có thể chạy |
| **Babel** | Compiler | Dịch cú pháp mới thành cú pháp cũ |
| **ESLint** | Kiểm tra code | Phát hiện vấn đề code và kiểu không nhất quán |

**Một quy trình phát triển điển hình:**

```bash
# 1. Khởi tạo dự án
npm create vite@latest my-app -- --template vue-ts

# 2. Cài đặt dependency
cd my-app
npm install

# 3. Chế độ phát triển（cập nhật nóng）
npm run dev

# 4. Xây dựng phiên bản sản xuất
npm run build
```

---

## 5. Mối quan hệ hợp tác của ba thành phần

### 5.1 So sánh công việc

| Vai trò | Chịu trách nhiệm | Không làm | Ví dụ điển hình |
|------|----------|----------|----------|
| **HTML** | Định nghĩa cấu trúc và ngữ nghĩa | Không chịu trách nhiệm kiểu/tương tác | `<section><h1>Tiêu đề</h1></section>` |
| **CSS** | Kiểm soát hình thức và bố cục | Không chịu trách nhiệm logic/dữ liệu | `.card { background: white; }` |
| **JavaScript** | Xử lý tương tác và logic | Không chịu trách nhiệm định nghĩa cấu trúc | `button.onclick = () => alert()` |

### 5.2 Một ví dụ hợp tác hoàn chỉnh

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* CSS: Làm card đẹp */
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      max-width: 300px;
    }
    .card button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <!-- HTML: Định nghĩa cấu trúc card -->
  <div class="card">
    <h2 id="title">Nhấp vào nút</h2>
    <button id="btn">Nhấp tôi</button>
  </div>

  <script>
    // JavaScript: Làm nút có thể click
    const btn = document.getElementById('btn')
    const title = document.getElementById('title')
    
    btn.addEventListener('click', function() {
      title.textContent = 'Đã click!'
      alert('Tiêu đề đã thay đổi')
    })
  </script>
</body>
</html>
```

---

## 6. Gặp code không biết thì sao?

### 6.1 Hỏi AI

> "Thẻ `<aside>` trong HTML là gì? Khi nào dùng?"
> 
> "Hiệu ứng `position: sticky` trong CSS là gì?"

### 6.2 Tra cứu MDN

[MDN Web Docs](https://developer.mozilla.org/) là tài liệu Web có thẩm quyền nhất. Gặp thẻ, thuộc tính, phương thức không biết, tìm kiếm trực tiếp.

### 6.3 Công cụ phát triển trình duyệt

1. Chuột phải vào phần tử trang → "Kiểm tra"
2. Ở bảng **Elements** thấy cấu trúc HTML
3. Ở bảng **Styles** thấy kiểu CSS
4. Ở bảng **Console** có thể chạy code JS

### 6.4 Bảng tra cứu nhanh các thuộc tính CSS phổ biến

| Thấy cái này | Nó làm gì |
|----------|------------|
| `display: flex` | Bật bố cục đàn hồi |
| `position: absolute` | Định vị tuyệt đối |
| `z-index: 100` | Mức độ, số lớn hơn ở trên |
| `overflow: hidden` | Phần vượt quá bị ẩn |
| `cursor: pointer` | Con trỏ chuột biến thành hình bàn tay |
| `transition: all 0.3s` | Hiệu ứng chuyển đổi động |
| `box-sizing: border-box` | Cho phép width bao gồm padding và border |

---

## 7. Bảng tra cứu nhanh tên từ

| Tên từ | Tiếng Anh | Giải thích bằng ngôn ngữ thường |
|------|------|------------|
| **HTML** | HyperText Markup Language | Ngôn ngữ đánh dấu siêu văn bản, dùng thẻ mô tả cấu trúc trang |
| **CSS** | Cascading Style Sheets | Bảng kiểu xếp tầng, kiểm soát màu sắc, bố cục, hoạt ảnh |
| **JavaScript** | JavaScript | Ngôn ngữ lập trình trang web, chịu trách nhiệm tương tác và logic |
| **DOM** | Document Object Model | Mô hình đối tượng tài liệu, biểu thị trang bằng cây đối tượng |
| **Flexbox** | Flexible Box Layout | Phương pháp bố cục một chiều, dễ căn chỉnh và phân bố |
| **Mô hình hộp** | CSS Box Model | Lớp lớp hộp từ nội dung đến lề ngoài |
| **SCSS** | Sassy CSS | Bộ tiền xử lý CSS, hỗ trợ biến, lồng nhau, mixin |
| **TypeScript** | TypeScript | Tập hợp của JavaScript, thêm hệ thống loại |
| **ES6** | ECMAScript 2015 | Phiên bản quan trọng của JavaScript, thêm rất nhiều cú pháp mới |
| **Ngữ nghĩa hóa** | Semantic HTML | Dùng thẻ có nghĩa（như header）thay vì div |
| **Responsive** | Responsive Design | Thiết kế trang tự động thích ứng các kích thước màn hình khác nhau |

---

## Tóm tắt

Bây giờ bạn đã biết: **HTML định nghĩa bộ xương, CSS chịu trách nhiệm ngoại hình, JavaScript cấp linh hồn**.

Ba thành phần này là nền tảng của phát triển Web. Hiểu rõ chúng, bạn sẽ:

- Đọc được mã nguồn bất kỳ trang web nào（chuột phải → "Xem mã nguồn trang"）
- Sửa được trang web người khác（DevTools của trình duyệt → Elements）
- Bắt đầu học framework frontend（Vue/React），tất cả đều dựa trên ba thành phần này

**Bước tiếp theo được khuyến nghị:**

- Nếu bạn muốn tạo trang web nhanh chóng, có thể học framework **Vue** hoặc **React**
- Nếu bạn muốn hiểu sâu CSS, có thể học bố cục **Flexbox** và **Grid**
- Nếu bạn muốn nâng cao chất lượng code, có thể học **TypeScript**
