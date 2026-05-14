# Quy trình kỹ thuật tinh chỉnh trình duyệt

::: tip 🎯 Câu hỏi cốt lõi
**Tại sao một số trang web chạy mượt như lụa, nhưng một số lại lag như PowerPoint?** Trình duyệt làm cách nào để biến một đống mã HTML, CSS, JavaScript thành trang web bạn nhìn thấy? Chương này sẽ dẫn bạn sâu vào "xưởng" của trình duyệt, giúp bạn hiểu quy trình làm việc của nó, từ đó viết được những trang web hiệu suất tốt hơn.
:::

**Bài viết này sẽ dạy bạn những gì?**

| Chương | Nội dung | Sau khi học xong bạn có thể |
|-----|------|-----------|
| **Chương 1** | Tại sao cần hiểu quy trình tinh chỉnh | Hiểu được sự cần thiết của tối ưu hóa hiệu suất |
| **Chương 2** | Năm giai đoạn của quy trình tinh chỉnh | Nắm vững quy trình tinh chỉnh cơ bản của trình duyệt |
| **Chương 3** | Xây dựng cây DOM và cây CSSOM | Hiểu cách HTML và CSS được phân tích |
| **Chương 4** | Xây dựng cây render | Biết phần tử nào sẽ được render |
| **Chương 5** | Bố cục và reflow | Tránh kích hoạt các tính toán bố cục tốn kém |
| **Chương 6** | Vẽ và repaint | Giảm các hoạt động vẽ không cần thiết |
| **Chương 7** | Kết hợp và GPU tăng tốc | Sử dụng GPU để nâng cao hiệu suất hoạt ảnh |
| **Chương 8** | Vòng lặp sự kiện | Hiểu cơ chế thực thi JavaScript |
| **Chương 9** | Tối ưu hóa hiệu suất thực tế | Nắm vững các kỹ thuật tối ưu hóa hiệu suất phổ biến |

Mỗi chương đều bắt đầu từ "hiểu nguyên lý", bạn không cần viết mã tối ưu hóa tay. Khi gặp vấn đề về hiệu suất, bạn có thể quay lại xem bất cứ lúc nào.

---

## 1. Tại sao cần hiểu "quy trình tinh chỉnh"?

### 1.1 Từ "chạy được" đến "chạy nhanh": Con đường phát triển của các nhà phát triển frontend

Khi bắt đầu học frontend, chúng ta chỉ quan tâm mã có thể "chạy" hay không - trang có hiển thị, nút có thể nhấp, là thành công rồi. Nhưng khi dự án lớn dần, người dùng tăng lên, bạn sẽ nhanh chóng phát hiện một sự thật tàn khốc: **cùng chức năng, người này viết trang web mượt mà, người kia lại lag đến mức người dùng muốn ném chuột**.

Giống như học lái xe. Lái xe thứ nhất chỉ quan tâm "xe có chạy được không", nhưng tài xế có kinh nghiệm sẽ quan tâm "khi nào nên thay số, khi nào nên thắng, làm sao lái tiết kiệm xăng nhất". Trình duyệt chính là "chiếc xe" bạn lái, hiểu được "thói quen làm việc" của nó, bạn mới có thể lái nhanh và ổn định.

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🐢 Tư duy của người mới (chỉ quan tâm tính năng)**
- Miễn là trang có hiển thị là được
- Lag là lỗi của trình duyệt
- Tối ưu hóa hiệu suất là điều cần xem xét sau

</div>
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🚀 Tư duy nâng cao (quan tâm trải nghiệm)**
- Mượt mà là lõi của trải nghiệm người dùng
- Hiểu quy trình làm việc của trình duyệt
- Xem xét hiệu suất ngay khi viết mã

</div>
</div>

**Hiểu quy trình tinh chỉnh là bước then chốt từ "chạy được" đến "chạy nhanh".**

### 1.2 Một câu chuyện thực tế: Tại sao "tối ưu hóa" lại lag hơn?

::: warning Câu chuyện sai lầm hiệu suất của Tiểu Trương
Tiểu Trương là kỹ sư frontend tại một công ty thương mại điện tử, chịu trách nhiệm tối ưu hóa trang chi tiết sản phẩm. Trang này hiển thị thông tin sản phẩm rất lag, khiến người dùng phàn nàn liên tục.

Tiểu Trương nghĩ: "Trang lag chắc vì có quá nhiều DOM, tôi sẽ ẩn nó đi bằng `display:none`, sau khi sửa xong rồi hiển thị lại, thế là trình duyệt sẽ không render lại liên tiếp rồi?"

Vì vậy anh ấy viết đoạn mã như này:

```javascript
// "Tối ưu hóa" mà bạn tưởng
const container = document.getElementById('list')
container.style.display = 'none'  // Ẩn trước, chẳng phải không sẽ render lại?

for (let i = 0; i < 1000; i++) {
  const item = document.createElement('div')
  item.style.width = Math.random() * 100 + 'px'  // Chiều rộng ngẫu nhiên
  container.appendChild(item)
}

container.style.display = 'block'  // Hiển thị lại, render một lần
```

Kết quả kiểm tra, trang web **lag hơn**! Tiểu Trương bị bối rối: rõ ràng đã "tối ưu hóa" rồi, tại sao lại chậm hơn?

Sau đó người quản lý frontend nhìn thấy mã và chỉ ra vấn đề: **Mặc dù phần tử bị ẩn đi, nhưng mỗi lần bạn sửa `style.width` vẫn sẽ kích hoạt tính toán kiểu và đánh dấu bố cục của trình duyệt, trình duyệt làm rất nhiều công việc vô ích ở phía sau**.

Cách làm đúng là sử dụng `DocumentFragment` để thao tác hàng loạt trong bộ nhớ, sau đó chèn vào DOM một lần, chỉ kích hoạt một lần render.
:::

::: info 💡 Bài học cốt lõi
Nếu không hiểu quy trình làm việc của trình duyệt, bạn có thể sẽ "tự quá thông minh" viết ra một đống "mã tối ưu hóa", kết quả là hiệu suất còn tệ hơn. **Chỉ khi hiểu quy trình tinh chỉnh, bạn mới biết hoạt động nào tốn kém, hoạt động nào rẻ, từ đó tránh dùng sức lực vào chỗ sai.**
:::

---

## 2. Khái niệm cốt lõi: "Quy trình tinh chỉnh" là gì?

::: tip 🤔 "Tinh chỉnh" là gì?
**Tinh chỉnh (Rendering)**, nói đơn giản là quá trình trình duyệt "vẽ" mã thành trang web bạn thấy.

Bạn có thể tưởng tượng nó như **nhà in in sách**:
- **HTML** = Bản thảo sách (văn bản, hình ảnh, chương)
- **CSS** = Yêu cầu sắp xếp (cỡ chữ, màu sắc, khoảng cách)
- **JavaScript** = Sửa đổi động (tác giả sửa bản thảo, điều chỉnh sắp xếp)

Trình duyệt lấy những "vật liệu" này, phải trải qua một loạt "quy trình", cuối cùng mới "in ấn" được trang web bạn nhìn thấy. Loạt quy trình này gọi là **quy trình tinh chỉnh (Rendering Pipeline)**.
:::

Để giúp bạn hiểu rõ hơn, chúng ta sử dụng một **tiệm bánh** để so sánh với quy trình tinh chỉnh của trình duyệt.

### 2.1 Dùng tiệm bánh để so sánh quy trình tinh chỉnh

Tưởng tượng bạn đang quản lý một tiệm bánh, mỗi ngày phải làm bánh cho khách hàng. Các giai đoạn liên quan trong quá trình này, thật kỳ lạ giống với quy trình tinh chỉnh của trình duyệt:

| Giai đoạn | 🥖 So sánh tiệm bánh | Công việc thực tế của trình duyệt | Ví dụ cụ thể |
|------|-------------|--------------|----------|
| **1. Chuẩn bị nguyên liệu** | Sắp xếp danh sách nguyên liệu (bột, trứng, kem...) | **Xây dựng cây DOM**: Phân tích HTML thành cấu trúc hình cây | Bạn viết `<div><p>Hello</p></div>`, trình duyệt phân tích thành `div→p→"Hello"` của cây |
| **2. Chuẩn bị công thức** | Sắp xếp thẻ công thức (tỷ lệ nguyên liệu của mỗi loại bánh) | **Xây dựng cây CSSOM**: Phân tích CSS thành cây quy tắc | Bạn viết `.title { color: red }`, trình duyệt ghi chép "`.title` có văn bản màu đỏ" |
| **3. Lập kế hoạch** | Dựa vào nguyên liệu và công thức, quyết định hôm nay làm bánh gì | **Xây dựng cây render**: Hợp nhất DOM và CSSOM, chỉ giữ lại các phần tử nhìn thấy được | Thẻ `<script>` không hiển thị, nên không trong cây render |
| **4. Sắp xếp vị trí** | Đặt bánh lên tủ trưng bày, quyết định mỗi bánh đặt ở đâu | **Bố cục (Layout)**: Tính toán kích thước và vị trí của mỗi phần tử | Tính toán "div này rộng 200px, cao 100px, ở vị trí (50, 50) trên màn hình" |
| **5. Tô màu trang trí** | Quét lòng đỏ trứng, rắc vừng, vắt kem lên bánh | **Vẽ (Paint)**: "Vẽ" màu, đường viền, bóng của phần tử lên màn hình | Vẽ thực tế "văn bản màu đỏ" lên màn hình |
| **6. Lắp ráp hoàn chỉnh** | Xếp chồng tất cả bánh lại, sắp xếp thành hình dạng đẹp | **Kết hợp (Composite)**: Hợp nhất nhiều lớp thành hình ảnh cuối cùng | GPU hợp nhất lớp nền, lớp chữ, lớp hình ảnh thành một bức tranh hoàn chỉnh |

::: tip 📊 Bạn có thể thấy điều gì từ bảng?
Hãy giải thích từng hàng, hiểu mỗi giai đoạn của quy trình tinh chỉnh:

**Giai đoạn 1-2 (giai đoạn chuẩn bị)**: Trình duyệt trước tiên "hiểu" mã của bạn. HTML và CSS được phân tích riêng biệt, vì chúng có nhiệm vụ khác nhau - HTML quyết định "có gì", CSS quyết định "trông như thế nào".

**Giai đoạn 3 (giai đoạn hợp nhất)**: Tại sao phải "hợp nhất"? Vì không phải tất cả phần tử HTML đều hiển thị (chẳng hạn `<head>`, `<script>`), trình duyệt cần "hợp nhất" các "phần tử nhìn thấy được" và "kiểu dáng của chúng", tạo thành "bản vẽ thi công".

**Giai đoạn 4-5 (giai đoạn vẽ)**: Bố cục là "tính vị trí", vẽ là "tô màu". Thay đổi bố cục (chẳng hạn thay đổi chiều rộng) sẽ dẫn đến vẽ, nhưng thay đổi vẽ (chẳng hạn thay đổi màu) không sẽ dẫn đến bố cục.

**Giai đoạn 6 (giai đoạn kết hợp)**: "Phép thuật" của trình duyệt hiện đại. Cách truyền thống là "vẽ một lần xong" (CPU chậm), cách hiện đại là "vẽ từng lớp + GPU kết hợp" (nhanh), đó là lý do tại sao hoạt ảnh `transform` mượt hơn hoạt ảnh `width`.
:::

### 2.2 Năm giai đoạn của quy trình tinh chỉnh

<RenderingPipelineDemo />

---

## 3. Giai đoạn thứ nhất: Xây dựng cây DOM và cây CSSOM

### 3.1 Tại sao cần "cây hóa"?

::: tip 🤔 DOM là gì?
**DOM (Document Object Model, Mô hình Đối tượng Tài liệu)**, là một cấu trúc hình cây mà trình duyệt chuyển đổi từ tài liệu HTML, thuận tiện cho JavaScript thao tác các phần tử trang.

Bạn có thể tưởng tượng nó như **cây phả hệ**:
- Ở đỉnh là "tổ tiên" (`<html>`)
- Dưới đó là "hậu duệ" (`<body>`, `<head>`)
- Dưới nữa là "cháu" (`<div>`, `<p>`, `<span>`)

**Tại sao phải chuyển thành cây?** Vì cấu trúc hình cây rất tiện "tìm kiếm" và "sửa đổi". Ví dụ, bạn muốn tìm "tất cả phần tử có class là `title`", trình duyệt có thể tìm kiếm nhanh trên cây, thay vì từ từ tìm từ một loạt văn bản lộn xộn.
:::

Trình duyệt lấy HTML, không hiển thị ngay lập tức, mà phải "hiểu" trước. Quá trình này chia thành ba bước:

**Bước thứ nhất: Phân tích từ vựng - tách mã thành "từ"**

```html
<div class="container">
  <p>Hello World</p>
</div>
```

Trình duyệt thấy đoạn mã này, sẽ "tách từ" trước:
- `<div>` → "thẻ mở div"
- `class="container"` → "thuộc tính class, giá trị container"
- `<p>` → "thẻ mở p"
- `Hello World` → "nội dung văn bản"
- `</p>` → "thẻ đóng p"
- `</div>` → "thẻ đóng div"

**Bước thứ hai: Phân tích cú pháp - tập hợp "từ" thành "nút"**

Trình duyệt theo quy tắc HTML, tập hợp những "từ" này thành "nút":
- Nút phần tử: `<div>`, `<p>`
- Nút thuộc tính: `class="container"`
- Nút văn bản: `"Hello World"`

**Bước thứ ba: Xây dựng cây - thiết lập "quan hệ cha con"**

Cuối cùng, trình duyệt theo quan hệ lồng nhau của thẻ, xây dựng cấu trúc hình cây:

```
Document (nút gốc của tài liệu)
└── html
    └── body
        └── div.class = "container"
            └── p
                └── "Hello World"
```

### 3.2 Cây CSSOM: "Sổ tay quy tắc" kiểu dáng

::: tip 🤔 CSSOM là gì?
**CSSOM (CSS Object Model, Mô hình Đối tượng CSS)**, là cấu trúc hình cây mà trình duyệt chuyển đổi từ quy tắc CSS, dùng để tính toán kiểu dáng cuối cùng của mỗi phần tử.

Bạn có thể tưởng tượng nó như **hướng dẫn phối đồ thời trang**:
- Quy tắc tầng trên (font chữ của body) sẽ ảnh hưởng đến tầng dưới (tất cả phần tử con)
- Nếu có xung đột (ví dụ cùng một phần tử có nhiều quy tắc chỉ định màu khác nhau), phải theo "mức độ ưu tiên" để quyết định dùng cái nào
- Cuối cùng tính ra mỗi phần tử nên "mặc" cái gì
:::

Quá trình xây dựng CSSOM tương tự DOM, nhưng có một điểm khác biệt quan trọng: **CSS là "kế thừa" và "xếp tầng" của**.

::: details Xem quá trình xây dựng CSSOM
**CSS gốc:**
```css
body {
  font-size: 16px;
  color: #333;
}

.container {
  width: 100%;
  color: red;  /* sẽ ghi đè color của body */
}

.container p {
  font-weight: bold;
}
```

**Cây CSSOM sau khi xây dựng:**
```
StyleSheet
├── body
│   ├── font-size: 16px
│   └── color: #333
└── .container
    ├── width: 100%
    ├── color: red  (mức độ ưu tiên cao hơn, ghi đè color của body)
    └── p
        └── font-weight: bold
```
:::

### 3.3 Hồi tưởng sai lầm: Tại sao CSS của tôi không "hoạt động"?

**Lỗi thứ nhất: Xung đột mức độ ưu tiên bộ chọn CSS**

::: details Xem lỗi phổ biến
```css
/* CSS bạn viết */
#header { color: red; }      /* bộ chọn id, mức độ ưu tiên 100 */
.title { color: blue; }     /* bộ chọn class, mức độ ưu tiên 10 */

/* HTML */
<div id="header" class="title">Đoạn văn bản này có màu gì?</div>
```

Bạn tưởng là xanh, kết quả là **đỏ**. Vì mức độ ưu tiên của bộ chọn id (100) cao hơn bộ chọn class (10).
:::

**Lỗi thứ hai: Thẻ HTML không đóng, trình duyệt "tự động sửa"**

::: details Xem trình duyệt sửa lỗi HTML như thế nào
```html
<!-- HTML bạn viết -->
<div>
  <p>Đây là một đoạn văn bản
</div>

<!-- Sau khi trình duyệt sửa -->
<div>
  <p>Đây là một đoạn văn bản</p>  <!-- Trình duyệt tự động đóng thẻ cho bạn -->
</div>
```

Trình duyệt rất "khoan dung", sẽ tự động sửa lỗi của bạn. Nhưng sự khoan dung này có cái giá - trình duyệt cần tính toán thêm để đoán ý định của bạn, **sẽ ảnh hưởng đến hiệu suất**.
:::

<DomToRenderTreeDemo />

---

## 4. Giai đoạn thứ hai: Xây dựng cây render

### 4.1 Tại sao cần "cây render"?

Bạn có thể hỏi: **"Đã có cây DOM và cây CSSOM rồi, tại sao còn phải xây dựng cây render nữa? Dùng DOM luôn không được sao?"**

Câu trả lời là: **Cây DOM chứa quá nhiều "thông tin vô dụng"**.

Ví dụ, xem đoạn HTML dưới đây:

```html
<html>
<head>
  <title>Tiêu đề trang</title>
  <style>/* Mã CSS */</style>
  <script>/* Mã JavaScript */</script>
</head>
<body>
  <div class="container">
    <p>Nội dung nhìn thấy được</p>
  </div>
  <div style="display: none">
    <p>Nội dung ẩn (display:none)</p>
  </div>
</body>
</html>
```

**Cây DOM sẽ chứa tất cả phần tử**:
- `<head>`, `<title>`, `<style>`, `<script>` (những cái này không hiển thị)
- div có `display: none` (cũng không hiển thị)

Nhưng **cây render chỉ chứa "phần tử sẽ vẽ lên màn hình"**:
- Xóa bỏ `<head>` và tất cả phần tử con của nó
- Xóa bỏ div có `display: none`

### 4.2 Quy tắc xây dựng cây render

Khi xây dựng cây render, trình duyệt sẽ tuân theo một loạt quy tắc:

| Tình huống | Cách xử lý | Ví dụ | Ảnh hưởng hiệu suất |
|------|---------|------|----------|
| `display: none` | **Loại bỏ hoàn toàn** khỏi cây render | Phần tử và tất cả phần tử con không nhìn thấy được | ✅ Giảm khối lượng render |
| `visibility: hidden` | **Bao gồm trong cây render**, nhưng không vẽ | Chiếm không gian, nhưng hoàn toàn trong suốt | ⚠️ Vẫn cần tính toán bố cục |
| `opacity: 0` | **Bao gồm trong cây render**, nhưng trong suốt | Có thể tương tác (có thể nhấp), nhưng không nhìn thấy | ⚠️ Vẫn cần tính toán bố cục |
| Không trong viewport | **Bao gồm trong cây render**, tạm không vẽ | Khi cuộn vào viewport sẽ vẽ | ⚠️ Nhưng vẫn trong cây render |

::: tip 📊 Bạn có thể thấy điều gì từ bảng?
**Phát hiện chính**: `display: none` là cách ẩn duy nhất "thực sự tiết kiệm hiệu suất", vì phần tử hoàn toàn không trong cây render, trình duyệt sẽ không làm bất kỳ bố cục và vẽ nào cho nó.

Trong khi đó, `visibility: hidden` và `opacity: 0` mặc dù "không nhìn thấy", nhưng vẫn trong cây render, trình duyệt vẫn phải tính toán bố cục (chiếm không gian). Nếu bạn cần "ẩn nhưng không ảnh hưởng bố cục" (ví dụ làm hoạt ảnh mờ dần), có thể dùng `opacity`; nếu cần "ẩn hoàn toàn và không chiếm không gian", dùng `display: none`.
:::

### 4.3 Hồi tưởng sai lầm: Tại sao đặt display:none, trang vẫn lag?

::: danger ❌ Hiểu lầm phổ biến: Tưởng phần tử có `display:none` "không tồn tại"
Nhiều người tưởng sau khi đặt `display: none`, phần tử sẽ "biến mất", sửa đổi nó như thế nào cũng không ảnh hưởng đến hiệu suất. Đây là **sai lầm**!

Mặc dù phần tử có `display: none` không trong cây render, nhưng khi bạn sửa đổi thuộc tính của nó qua JavaScript, trình duyệt vẫn cần:
1. **Tính toán lại kiểu** (khớp quy tắc CSS)
2. **Theo dõi thay đổi** (chuẩn bị cho việc hiển thị trong tương lai)

Xem ví dụ "tối ưu hóa" dưới đây:
:::

::: details Xem mã "tối ưu hóa vô hiệu"
```javascript
// ❌ "Tối ưu hóa" mà bạn tưởng: Ẩn trước, sửa xong rồi hiển thị
const container = document.getElementById('list')
container.style.display = 'none'

// Hoạt động DOM điên cuồng
for (let i = 0; i < 1000; i++) {
  const item = document.createElement('div')
  item.style.width = Math.random() * 100 + 'px'  // Thay đổi chiều rộng!
  item.textContent = `Item ${i}`
  container.appendChild(item)
}

container.style.display = 'block'

// Vấn đề: Mỗi lần sửa style.width, trình duyệt vẫn phải tính toán lại kiểu,
// ngay cả khi phần tử là display:none!
```

**✅ Tư thế tối ưu hóa đúng:**
```javascript
// Dùng DocumentFragment để thao tác hàng loạt
const container = document.getElementById('list')
const fragment = document.createDocumentFragment()  // Vùng chứa ảo

// Tất cả hoạt động đều trên fragment trong bộ nhớ
for (let i = 0; i < 1000; i++) {
  const item = document.createElement('div')
  item.style.width = Math.random() * 100 + 'px'
  item.textContent = `Item ${i}`
  fragment.appendChild(item)  // Không ảnh hưởng đến DOM thực tế
}

// Chèn vào DOM thực tế một lần, chỉ kích hoạt một lần render
container.appendChild(fragment)
```
:::

---

## 5. Giai đoạn thứ ba: Bố cục và reflow

### 5.1 "Bố cục" là gì?

::: tip 🤔 Bố cục (Layout) là gì?
**Bố cục**, còn gọi là **reflow (luồng ngược)**, là quá trình trình duyệt tính toán "mỗi phần tử ở vị trí nào, chiếm bao nhiêu không gian".

Bạn có thể tưởng tượng nó như **nhà thiết kế nội thất đo phòng**:
- Trước tiên đo độ dài chiều rộng của mỗi phòng
- Quyết định bố trí nơi đặt nội thất
- Tính ra tọa độ của từng đồ vật

**Tại sao bố cục "tốn kém"?** Vì thay đổi một phần tử có thể ảnh hưởng đến phần tử khác. Chẳng hạn bạn làm một div rộng hơn, div bên cạnh có thể bị xô xuống, dẫn đến toàn trang cần tính toán lại.
:::

### 5.2 "Mỏ" kích hoạt reflow

Dưới đây là các hoạt động phổ biến sẽ kích hoạt reflow, **khuyên bạn lưu và ghi nhớ**:

| Loại | Thuộc tính/hoạt động | Ảnh hưởng hiệu suất | Phương án thay thế |
|------|----------|----------|----------|
| **Kích thước** | `width`, `height`, `min/max-width/height` | 💀💀💀 | Dùng `transform: scale()` thay thế |
| **Vị trí** | `top`, `right`, `bottom`, `left` | 💀💀💀 | Dùng `transform: translate()` thay thế |
| **Lề** | `margin`, `padding` | 💀💀 | Dùng `transform` hoặc `gap` thay thế |
| **Đường viền** | `border-width` | 💀💀 | Tránh sửa đổi thường xuyên |
| **Nội dung** | Nội dung văn bản thay đổi, hình ảnh tải | 💀💀 | Dành sẵn không gian, tránh bố cục rung |
| **Phông chữ** | `font-size`, `line-height` | 💀💀💀 | Tránh sửa đổi thường xuyên |
| **Hiển thị** | Giá trị `display` thay đổi | 💀💀💀 | Dùng `visibility` hoặc `opacity` thay thế (nếu không cần ẩn hoàn toàn) |
| **Truy vấn** | `offsetWidth`, `offsetHeight` v.v. | 💀💀💀💀💀 | **Đọc hàng loạt, tránh bố cục rung** |

::: tip 📊 Bạn có thể thấy điều gì từ bảng?
**Phát hiện chính**:
1. **Thuộc tính hình học (chiều rộng cao độ vị trí) tốn kém nhất**: Chúng sẽ kích hoạt tính toán bố cục đầy đủ
2. **Truy vấn thuộc tính nguy hiểm hơn sửa đổi**: Đọc `offsetWidth` sẽ **kích hoạt bố cục đồng bộ bắt buộc** (xem mục 5.4)
3. **Transform và opacity hiệu suất tốt nhất**: Chúng không kích hoạt reflow, chỉ kích hoạt giai đoạn kết hợp
:::

### 5.3 Hồi tưởng sai lầm: Tại sao hoạt ảnh của tôi lag như PPT?

**Lỗi: Làm hoạt ảnh bằng width**

::: details Xem mã hoạt ảnh hiệu suất kém
```css
/* ❌ Hoạt ảnh xấu: kích hoạt reflow */
.box {
  width: 100px;
  transition: width 0.3s;
}

.box:hover {
  width: 200px;  /* Thay đổi chiều rộng sẽ kích hoạt reflow! */
}
```

Mỗi khung hình hoạt ảnh đều kích hoạt reflow, trình duyệt cần:
1. Tính toán lại chiều rộng
2. Tính toán lại vị trí (có thể ảnh hưởng phần tử khác)
3. Vẽ lại

**✅ Hoạt ảnh tốt: Dùng transform**
```css
/* ✅ Hoạt ảnh tốt: chỉ kích hoạt kết hợp */
.box {
  width: 100px;
  transform: scaleX(1);
  transition: transform 0.3s;
}

.box:hover {
  transform: scaleX(2);  /* Cân đối không kích hoạt reflow! */
}
```

`transform` được GPU xử lý trực tiếp, không kích hoạt reflow và repaint, hoạt ảnh mượt như lụa.
:::

### 5.4 Sát thủ hiệu suất: Bố cục đồng bộ bắt buộc

::: danger 💀 Vấn đề hiệu suất nguy hiểm nhất: Bố cục rung
**Bố cục đồng bộ bắt buộc (Forced Synchronous Layout)**, còn gọi là **bố cục rung (Layout Thrashing)**, là vấn đề hiệu suất phổ biến nhất và cũng là vấn đề nghiêm trọng nhất.

Nguyên nhân là: **JavaScript khi đọc thuộc tính bố cục (như `offsetWidth`), trình duyệt phải thực thi ngay tính toán bố cục để trả về giá trị chính xác.**

Nếu bạn "đọc viết xen kẽ", sẽ dẫn đến trình duyệt lặp đi lặp lại "bố cục → đọc → bố cục → đọc", tạo thành vòng lặp xấu.
:::

::: details Xem mã bố cục rung
```javascript
// ❌ Tệ nhất: đọc viết xen kẽ, dẫn đến bố cục rung
const elements = document.querySelectorAll('.item')

for (let i = 0; i < elements.length; i++) {
  const height = elements[i].offsetHeight  // Đọc → kích hoạt bố cục
  elements[i].style.width = (height * 2) + 'px'  // Viết → đánh dấu cần reflow
  // Lần lặp tiếp theo sẽ đọc, lại kích hoạt bố cục...vòng lặp xấu!
}

// Nếu có 100 phần tử, sẽ kích hoạt 100 lần tính toán bố cục!
```

**✅ Tư thế tối ưu hóa đúng: Tách đọc viết**
```javascript
const elements = document.querySelectorAll('.item')

// Bước thứ nhất: Đọc hàng loạt (đọc hết trước)
const heights = []
for (let i = 0; i < elements.length; i++) {
  heights.push(elements[i].offsetHeight)  // Chỉ kích hoạt một lần bố cục
}

// Bước thứ hai: Viết hàng loạt (viết hết sau)
requestAnimationFrame(() => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.width = (heights[i] * 2) + 'px'  // Chỉ kích hoạt một lần reflow
  }
})
```
:::

<LayoutReflowDemo />

---

## 6. Giai đoạn thứ tư: Vẽ và repaint

### 6.1 "Vẽ" là gì?

::: tip 🤔 Vẽ (Paint) là gì?
**Vẽ**, là quá trình trình duyệt thực sự "vẽ" các phần tử đã "tính toán bố cục" lên màn hình.

Bạn có thể tưởng tượng nó như **sơn một căn phòng**:
- Giai đoạn bố cục = đo kích thước, vẽ đường
- Giai đoạn vẽ = sơn thực sự, dán giấy dán tường

**Vẽ không tốn kém bằng bố cục, nhưng cũng không rẻ.** Vẽ thường xuyên vẫn ảnh hưởng đến hiệu suất, đặc biệt với các phần tử phức tạp (bóng, gradient).
:::

### 6.2 Tín hiệu kích hoạt repaint

Khác với reflow, repaint chỉ liên quan đến "ngoài hình dáng" thay đổi, không liên quan đến "hình học" thay đổi:

| Loại | Thuộc tính | Ảnh hưởng hiệu suất | Ghi chú |
|------|------|----------|------|
| **Màu sắc** | `color`, `background-color` | 💀 | Kích hoạt repaint phổ biến nhất |
| **Nền** | `background-image`, `background-position` | 💀💀 | Hình ảnh chậm hơn màu đơn |
| **Đường viền** | `border-color`, `border-style` | 💀 | Thay đổi màu/kiểu đường viền |
| **Văn bản** | `text-decoration`, `text-shadow` | 💀💀 | Bóng chậm hơn văn bản thường |
| **Bóng hộp** | `box-shadow` | 💀💀💀 | Bóng phức tạp rất chậm |
| **Góc tròn** | `border-radius` | 💀 | Thay đổi kích thước góc tròn |
| **Độ mờ** | `opacity` | ✅ | **Đặc biệt: không kích hoạt repaint, chỉ kích hoạt kết hợp** |

::: tip 📊 Bạn có thể thấy điều gì từ bảng?
**Phát hiện chính**: `opacity` là đặc biệt! Nó giống `transform`, không kích hoạt repaint, mà kích hoạc trực tiếp giai đoạn kết hợp. Đó là lý do tại sao dùng `opacity` làm hoạt ảnh mờ dần có hiệu suất tốt nhất.

Ngoài ra, **bóng và gradient tốn kém hơn repaint**, vì chúng cần tính toán pixel phức tạp. Nếu trang của bạn có rất nhiều `box-shadow`, hãy cân nhắc dùng phần tử giả hoặc hình ảnh thay thế.
:::

### 6.3 Hồi tưởng sai lầm: Tại sao hiệu ứng hover của tôi lag?

**Lỗi: Làm hiệu ứng hover bằng box-shadow**

::: details Xem mã hiệu ứng hover hiệu suất kém
```css
/* ❌ Hiệu ứng hover xấu: hoạt ảnh box-shadow rất chậm */
.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);  /* Bóng rất chậm! */
}
```

`box-shadow` cần tính toán từng pixel, hoạt ảnh sẽ lag.

**✅ Cách tốt: Dùng transform hoặc phần tử giả**
```css
/* ✅ Hiệu ứng hover tốt: dùng transform */
.card {
  transform: translateY(0);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-4px);  /* Chỉ thay đổi bóng khi hover, không làm hoạt ảnh */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
```
:::

<PaintLayerDemo />

---

## 7. Giai đoạn thứ năm: Kết hợp và GPU tăng tốc

### 7.1 "Kết hợp" là gì?

::: tip 🤔 Kết hợp (Composite) là gì?
**Kết hợp**, là "phép thuật" của trình duyệt hiện đại, nó chia trang thành nhiều **lớp (Layer)**, sau đó sử dụng **GPU (bộ xử lý đồ họa)** để kết hợp song song hình ảnh cuối cùng.

Bạn có thể tưởng tượng nó như **các lớp trong Photoshop**:
- Cách truyền thống = Vẽ mọi thứ trên một lớp (CPU nối tiếp, chậm)
- Cách kết hợp = Vẽ từng lớp, sau đó hợp nhất (GPU song song, nhanh)

**Tại sao kết hợp nhanh?** Vì GPU giỏi xử lý "kết hợp hình ảnh" kiểu công việc song song, nhanh hơn CPU hàng chục lần.
:::

### 7.2 Những phần tử nào sẽ được nâng cấp lên "lớp kết hợp"?

Trình duyệt sẽ tự động nâng cấp một số phần tử lên lớp kết hợp độc lập. Dưới đây là những điều kiện kích hoạt phổ biến:

| Điều kiện kích hoạt | Thuộc tính CSS/giá trị | Ảnh hưởng hiệu suất | Lưu ý |
|---------|-----------|----------|----------|
| **Biến đổi 3D** | `transform: translate3d()`, `rotate3d()` | ✅✅✅ | Hiệu suất hoạt ảnh tốt nhất |
| **Hack tăng tốc GPU** | `transform: translateZ(0)` | ✅✅ | Gọi là "tăng tốc GPU bắt buộc" |
| **Hoạt ảnh độ mờ** | Thay đổi `opacity` (kèm hoạt ảnh) | ✅✅✅ | Không kích hoạt repaint |
| **Định vị cố định** | `position: fixed` | ✅ | Tránh tính toán bố cục lại khi cuộn |
| **Will-Change** | `will-change: transform, opacity` | ✅✅ | Tạo lớp trước, cẩn thận bộ nhớ |
| **Canvas/WebGL** | `<canvas>`, nội dung WebGL | ✅✅ | Tự nhiên ở lớp độc lập |
| **Video** | `<video>` | ✅✅ | Lớp độc lập, tránh ảnh hưởng lẫn nhau |

::: tip 📊 Bạn có thể thấy điều gì từ bảng?
**Phát hiện chính**: `transform` và `opacity` là hoạt ảnh thuộc tính tốt nhất, vì chúng không kích hoạt reflow và repaint, kích hoạc trực tiếp giai đoạn kết hợp. Đó là lý do tại sao hướng dẫn tối ưu hóa hiệu suất luôn nói "dùng transform và opacity làm hoạt ảnh".

Nhưng cần chú ý: **Mỗi lớp kết hợp cần lưu trữ "kết cấu" trên GPU**, tốn bộ nhớ. Nếu lạm dụng `translateZ(0)`, có thể bộ nhớ GPU bị đầy, dẫn đến thiết bị yếu sụp hoặc hạ cấp về xử lý CPU (xem mục 7.4).
:::

### 7.3 Hồi tưởng sai lầm: Quá nhiều lớp kết hợp lại lag?

::: danger 💀 Bẫy tối ưu hóa quá mức
Có người nghe nói "tăng tốc GPU nhanh", nên cho tất cả phần tử `transform: translateZ(0)`, kết quả là trang lag hơn.

**Nguyên nhân vấn đề**:
Mỗi lớp kết hợp cần lưu trữ "kết cấu" (bitmap) trong GPU, tốn bộ nhớ. Nếu một trang có 100 lớp kết hợp, bộ nhớ GPU có thể bị đầy, dẫn đến thiết bị yếu sụp hoặc hạ cấp về xử lý CPU.
:::

::: details Xem mã "tối ưu hóa quá mức"
```css
/* ❌ Cách sai: cho tất cả phần tử bật tăng tốc GPU */
.card { transform: translateZ(0); }
.button { transform: translateZ(0); }
.icon { transform: translateZ(0); }
/* ... 100 phần tử đều thêm ... */

/* Kết quả: bộ nhớ GPU bị đầy, trang lag chết */
```

**✅ Cách đúng: chỉ dùng khi cần**
```css
/* Chiến lược 1: Chỉ bật cho phần tử cần hoạt ảnh */
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);  /* Tự động tạo lớp kết hợp */
}

/* Chiến lược 2: Dùng will-change để gợi ý trình duyệt */
.card {
  will-change: transform;  /* Tạo lớp trước */
}

/* Chiến lược 3: Sau hoạt ảnh, hủy lớp */
.card:not(:hover) {
  will-change: auto;  /* Giải phóng bộ nhớ GPU */
}
```
:::

<CompositeDemo />

---

## 8. Vòng lặp sự kiện: "Phép chia thân" của JavaScript

::: tip 🤔 Vòng lặp sự kiện là gì?
**Vòng lặp sự kiện (Event Loop)**, là cơ chế JavaScript hiện thực "bất đồng bộ". Vì JavaScript là **đơn luồng** (một lần chỉ làm một việc), nhưng nó lại phải xử lý nhấp chuột người dùng, yêu cầu mạng, bộ hẹn giờ v.v. nhiều việc khác nhau, nên cần một "hệ thống điều phối" để quản lý các công việc này.

Bạn có thể tưởng tượng nó như **trung tâm phân loại gửi bưu kiện**:
- **Call Stack (ngăn xếp gọi)** = Bưu kiện đang xử lý
- **Web APIs** = Kho hàng hợp tác bên ngoài (bộ hẹn giờ, yêu cầu mạng v.v.)
- **Callback Queue (hàng đợi gọi lại)** = Kệ bưu kiện chờ xử lý
- **Event Loop (vòng lặp sự kiện)** = Robot phân loại (liên tục kiểm tra "có thể xử lý công việc tiếp theo không")
:::

### 8.1 Tác vụ vĩ mô và tác vụ vi mô

Lúc đầu JavaScript chỉ có một hàng đợi tác vụ. Nhưng khi lập trình bất đồng bộ trở nên phức tạp, trình duyệt đã giới thiệu hai loại tác vụ:

| Loại | Nguồn thường gặp | Mức độ ưu tiên | Thời điểm thực thi |
|------|---------|--------|----------|
| **Tác vụ vĩ mô** | `setTimeout`/`setInterval`, hoạt động I/O, render UI | Thấp | Thực thi một tác vụ cho mỗi chu kỳ vòng lặp sự kiện |
| **Tác vụ vi mô** | `Promise.then`, `MutationObserver` | Cao | Ngay khi tác vụ vĩ mô hiện tại kết thúc, xóa sạch tất cả tác vụ vi mô |

**"Thần chú" thứ tự thực thi**:

```
1. Thực thi tác vụ vĩ mô hiện tại (ví dụ <script> toàn bộ)
2. Thực thi tất cả tác vụ vi mô được tạo ra trong quá trình
   ↳ Tác vụ vi mô có thể tạo ra tác vụ vi mô mới, xóa sạch tất cả sau đó mới tiếp tục
3. Nếu cần, thực hiện render UI (reflow/repaint)
4. Mở vòng lặp sự kiện tiếp theo, thực thi tác vụ vĩ mô tiếp theo
```

### 8.2 Hồi tưởng sai lầm: Promise nhanh hơn setTimeout?

::: danger ❌ Hiểu lầm phổ biến: setTimeout(fn, 0) sẽ "thực thi ngay lập tức"
Nhiều người tưởng `setTimeout(fn, 0)` là "thực thi 0 mili giây sau, tức là thực thi ngay lập tức", đây là **hiểu lầm**.

Thực tế, `setTimeout(fn, 0)` có nghĩa là: **"Đợi ít nhất 0 mili giây, sau đó thêm gọi lại vào hàng đợi tác vụ vĩ mô"**. Nhưng nó phải đợi ngăn xếp gọi hiện tại trống, hàng đợi tác vụ vi mô trống, có thể cần render UI, sau đó mới có thể thực thi.
:::

::: details Xem thứ tự thực thi
```javascript
console.log('1. Start')

setTimeout(() => {
  console.log('2. setTimeout callback')
}, 0)

Promise.resolve().then(() => {
  console.log('3. Promise.then')
})

console.log('4. End')

// Bạn tưởng thứ tự output:
// 1. Start
// 4. End
// 2. setTimeout callback  ← setTimeout(0) không phải là ngay lập tức sao?
// 3. Promise.then

// Thứ tự output thực tế:
// 1. Start
// 4. End
// 3. Promise.then         ← Promise.then thực thi trước setTimeout!
// 2. setTimeout callback
```

**Sơ đồ quy trình thực thi:**
```
Ngăn xếp gọi (Call Stack)          Hàng đợi tác vụ vĩ mô                    Hàng đợi tác vụ vi mô
                              [setTimeout callback]         [Promise.then callback]

1. console.log('1. Start')
   → Output: 1. Start

2. setTimeout(fn, 0)
   → Thêm gọi lại vào hàng đợi tác vụ vĩ mô      ← [setTimeout callback]

3. Promise.resolve().then()
   → Thêm gọi lại vào hàng đợi tác vụ vi mô                                   ← [Promise.then callback]

4. console.log('4. End')
   → Output: 4. End

5. Ngăn xếp gọi trống, kiểm tra hàng đợi tác vụ vi mô
   → Tìm thấy gọi lại Promise.then
   → Thực thi: console.log('3. Promise.then')
   → Output: 3. Promise.then

6. Hàng đợi tác vụ vi mô trống
   → Có thể cần render UI (nếu có thay đổi)

7. Kiểm tra hàng đợi tác vụ vĩ mô
   → Tìm thấy gọi lại setTimeout
   → Thực thi: console.log('2. setTimeout callback')
   → Output: 2. setTimeout callback
```
:::

::: tip 💡 Bài học cốt lõi
**Tác vụ vi mô "tức thời" hơn tác vụ vĩ mô**. Nếu bạn muốn một hoạt động "thực thi ngay khi khối mã hiện tại kết thúc, nhưng trước khi cập nhật UI", hãy dùng `Promise.then` hoặc `queueMicrotask`.

`setTimeout(0)` không đảm bảo thực thi ngay lập tức, nó sẽ bị trì hoãn ít nhất đến khi ngăn xếp gọi trống, hàng đợi tác vụ vi mô trống sau đó.
:::

<JSEventLoopDemo />

<MacroMicroTaskDemo />

---

## 9. Tối ưu hóa hiệu suất thực tế: Làm cho trang web của bạn "bay"

Sau khi hiểu quy trình tinh chỉnh của trình duyệt, chúng ta hãy xem cách tối ưu hóa. Dưới đây là năm kỹ thuật tối ưu hóa thực tế nhất.

### 9.1 Quy tắc vàng: Tránh bố cục đồng bộ bắt buộc

**Vấn đề**: Đọc viết xen kẽ thuộc tính bố cục, dẫn đến bố cục rung.

::: details Xem so sánh trước và sau tối ưu hóa
```javascript
// ❌ Tệ nhất: đọc viết xen kẽ, dẫn đến bố cục rung
for (let i = 0; i < elements.length; i++) {
  const height = elements[i].offsetHeight  // Đọc → kích hoạt bố cục
  elements[i].style.height = (height * 2) + 'px'  // Viết → đánh dấu cần reflow
  // Lần lặp tiếp theo sẽ đọc, lại kích hoạt bố cục...vòng lặp xấu!
}

// ✅ Tuyệt vời: Đọc hết trước, viết hết sau
// Bước thứ nhất: Đọc hàng loạt
const heights = []
for (let i = 0; i < elements.length; i++) {
  heights.push(elements[i].offsetHeight)
}

// Bước thứ hai: Viết hàng loạt
requestAnimationFrame(() => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.height = (heights[i] * 2) + 'px'
  }
})
```
:::

### 9.2 Dùng transform và opacity làm hoạt ảnh

**Vấn đề**: Dùng `width`, `height`, `left`, `top` làm hoạt ảnh sẽ kích hoạc reflow.

::: details Xem so sánh trước và sau tối ưu hóa
```css
/* ❌ Hoạt ảnh xấu: kích hoạc reflow */
.box {
  transition: width 0.3s, left 0.3s;
}
.box.moving {
  width: 200px;
  left: 100px;
}

/* ✅ Hoạt ảnh tốt: chỉ kích hoạc kết hợp */
.box {
  transition: transform 0.3s;
}
.box.moving {
  transform: translateX(100px) scaleX(2);
}
```
:::

### 9.3 Cuộn ảo: Giải quyết danh sách dữ liệu lớn

**Vấn đề**: Khi số lượng mục danh sách lên đến hàng nghìn, số lượng nút DOM quá nhiều dẫn đến vấn đề hiệu suất.

**Ý tưởng cốt lõi**: Chỉ render các mục danh sách nhìn thấy được trong viewport (cộng thêm bộ đệm nhỏ), số lượng nút DOM được cố định, không liên quan đến tổng lượng dữ liệu.

<RenderingPerformanceDemo />

::: details Xem cách hiện thực cuộn ảo
```vue
<template>
  <div class="virtual-list" @scroll="handleScroll">
    <!-- Phần tử chiếm chỗ, nâng thanh cuộn lên -->
    <div class="phantom" :style="{ height: totalHeight + 'px' }"></div>

    <!-- Mục danh sách thực tế được render -->
    <div class="content" :style="{ transform: `translateY(${offsetY}px)` }">
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="item"
        :style="{ height: itemHeight + 'px' }"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: Array,
  itemHeight: { type: Number, default: 50 }
})

const scrollTop = ref(0)
const buffer = 5  // số lượng bộ đệm

// Vùng nhìn thấy có thể hiển thị bao nhiêu mục
const visibleCount = computed(() => 10)

// Chỉ số bắt đầu
const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - buffer)
)

// Chỉ số kết thúc
const endIndex = computed(() =>
  Math.min(props.items.length, startIndex.value + visibleCount.value + buffer * 2)
)

// Dữ liệu nhìn thấy hiện tại
const visibleItems = computed(() =>
  props.items.slice(startIndex.value, endIndex.value)
)

// Chiều cao tổng cộng
const totalHeight = computed(() => props.items.length * props.itemHeight)

// Độ dịch
const offsetY = computed(() => startIndex.value * props.itemHeight)

const handleScroll = (e) => {
  scrollTop.value = e.target.scrollTop
}
</script>
```
:::

### 9.4 Phòng tránh và điều chỉnh tốc độ: Giảm tần suất kích hoạt sự kiện

**Vấn đề**: Sự kiện kích hoạt thường xuyên (như scroll, resize) sẽ dẫn đến vấn đề hiệu suất.

::: details Xem cách hiện thực phòng tránh và điều chỉnh tốc độ
```javascript
// Phòng tránh (Debounce): Trì hoãn thực thi, nếu kích hoạt lại trong thời gian trì hoãn, tính lại thời gian
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// Điều chỉnh tốc độ (Throttle): Thực thi theo khoảng thời gian cố định
function throttle(fn, interval) {
  let lastTime = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastTime >= interval) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

// Ví dụ sử dụng
window.addEventListener('scroll', debounce(handleScroll, 200))
window.addEventListener('resize', throttle(handleResize, 100))
```
:::

### 9.5 Tải chậm: Trì hoãn tải tài nguyên không cần thiết

**Vấn đề**: Tải quá nhiều tài nguyên ngay lúc mở trang dẫn đến trang mở chậm.

::: details Xem cách hiện thực tải chậm hình ảnh
```javascript
// Tải chậm hình ảnh
const lazyImages = document.querySelectorAll('img[data-src]')

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src  // Tải hình ảnh thực tế
      img.removeAttribute('data-src')
      observer.unobserve(img)  // Dừng quan sát
    }
  })
})

lazyImages.forEach(img => imageObserver.observe(img))
```
:::

---

## 10. Những vấn đề hiệu suất bạn nên biết cách nhận diện

Sau khi hiểu quy trình tinh chỉnh của trình duyệt, bạn nên biết cách nhận diện những vấn đề hiệu suất phổ biến sau:

| Mã có vấn đề | Vấn đề ở đâu | Cách mô tả cho AI |
|---------|---------|-------------|
| `element.style.width = ...` | Sửa đổi chiều rộng thường xuyên trong vòng lặp | "Chỗ này sẽ kích hoạc reflow nhiều lần, hãy dùng transform hoặc xử lý hàng loạt" |
| `height = element.offsetHeight` | Đọc thuộc tính bố cục ngay sau khi viết | "Đây là bố cục đồng bộ bắt buộc, hãy tách hoạt động đọc viết" |
| `element.className = ...` | Sửa đổi class thường xuyên kích hoạc tính toán kiểu lại | "Dùng classList.add/remove thay thế, giảm tính toán kiểu" |
| Hoạt ảnh dùng `width`/`left` | Kích hoạc reflow và repaint, hiệu suất kém | "Thay đổi dùng transform và opacity làm hoạt ảnh" |
| Cho tất cả phần tử `translateZ(0)` | Lạm dụng tăng tốc GPU dẫn đến bộ nhớ bị đầy | "Chỉ cho các phần tử cần hoạt ảnh bật tăng tốc GPU" |
| Danh sách 10000 mục, render hết | Số lượng nút DOM quá nhiều dẫn đến lag | "Hiện thực cuộn ảo, chỉ render vùng nhìn thấy được" |
| Hoạt động DOM trực tiếp trong sự kiện scroll | Tần suất kích hoạc quá cao dẫn đến lag | "Dùng requestAnimationFrame hoặc điều chỉnh tốc độ tối ưu hóa" |
| `box-shadow` làm hoạt ảnh hover | Tính toán bóng phức tạp rất chậm | "Thay đổi dùng transform hoặc phần tử giả, tránh làm hoạt ảnh bóng" |

**Nếu bạn đã đọc kỹ mục "Hồi tưởng sai lầm" của mỗi chương, bạn còn hiểu được những khái niệm cốt lõi này:**

- **Năm giai đoạn quy trình tinh chỉnh**: DOM/CSSOM → cây render → bố cục → vẽ → kết hợp
- **Reflow vs Repaint**: Reflow tốn kém nhất (thay đổi hình học), Repaint tốn kém hơn (thay đổi ngoài hình dáng)
- **Bố cục đồng bộ bắt buộc**: Đọc viết xen kẽ sẽ dẫn đến bố cục rung, phải tách
- **Tăng tốc GPU**: Transform và opacity được GPU xử lý, hiệu suất tốt nhất
- **Vòng lặp sự kiện**: JavaScript là đơn luồng, qua hàng đợi tác vụ thực hiện bất đồng bộ

Những khái niệm này sẽ giúp bạn định vị nhanh các nút cổ chai hiệu suất.

::: info 💡 Khi gặp vấn đề hiệu suất, hãy nói với AI như thế này
- "Hoạt ảnh lag, kiểm tra xem có kích hoạc reflow hoặc repaint không"
- "Hiệu suất cuộn kém, có thể cần điều chỉnh tốc độ hoặc requestAnimationFrame"
- "Danh sách có dữ liệu lớn, lag, cần cuộn ảo"
- "Sửa đổi kiểu thường xuyên dẫn đến vấn đề hiệu suất, hãy dùng transform tối ưu hóa"
:::

---

## 11. Tóm tắt: Bản chất tối ưu hóa quy trình tinh chỉnh

Qua học tập từ bài viết này, chúng ta có thể rút ra những kết luận cốt lõi sau:

**Từ góc độ thực hành**: Không phải tối ưu hóa càng nhiều càng tốt, mà là tối ưu hóa "sát" đúng chỗ. Chỉ khi hiểu quy trình tinh chỉnh của trình duyệt, bạn mới biết nên nỗ lực ở đâu, nên buông ở đâu.

**Từ góc độ chi phí**:
- Hầu hết lãng phí hiệu suất đến từ **đọc viết xen kẽ thuộc tính bố cục**, cần giải quyết bằng tách đọc viết và xử lý hàng loạt
- Hiệu ứng hoạt ảnh phức tạp nếu kích hoạc reflow và repaint, thường vì dùng "thuộc tính sai", cần giải quyết bằng `transform` và `opacity`
- Khi phải xử lý dữ liệu danh sách lớn, chỉ dựa vào DOM ảo không đủ, phải kết hợp **cuộn ảo** v.v.

**Mục tiêu là: Trong điều kiện trình duyệt và phần cứng nhất định, cho mỗi bước tinh chỉnh lợi ích hiệu suất rõ ràng.**

---

## 12. Bảng từ điển kỹ thuật

| Thuật ngữ tiếng Anh | Dịch tiếng Việt | Giải thích |
| :--- | :--- | :--- |
| **DOM** | Mô hình Đối tượng Tài liệu | Trình duyệt phân tích tài liệu HTML, tạo thành cấu trúc hình cây, JavaScript có thể thao tác các phần tử trang qua DOM API |
| **CSSOM** | Mô hình Đối tượng CSS | Trình duyệt phân tích CSS, tạo thành cấu trúc hình cây, kết hợp với DOM để tính toán kiểu dáng cuối cùng |
| **Render Tree** | Cây tinh chỉnh/render | Được hợp nhất từ cây DOM và CSSOM, chỉ bao gồm các nút nhìn thấy được, dùng cho tính toán bố cục và vẽ sau này |
| **Layout** | Bố cục | Tính toán thông tin hình học (vị trí, kích thước) của mỗi nút trong cây tinh chỉnh, còn gọi là Reflow (reflow) |
| **Reflow** | Reflow/Luồng ngược | Khi thay đổi hình học của phần tử (kích thước, vị trí v.v.), trình duyệt cần tính toán lại bố cục |
| **Paint** | Vẽ/Tinh chỉnh | Sau tính toán bố cục, vẽ kiểu dáng của phần tử (màu sắc, nền, đường viền v.v.) lên màn hình |
| **Repaint** | Tinh chỉnh lại | Khi thay đổi thuộc tính ngoài hình dáng của phần tử (ví dụ màu sắc, nền) nhưng không ảnh hưởng đến hình học, kích hoạc cập nhật vẽ |
| **Composite** | Kết hợp | Quá trình hợp nhất nhiều lớp vẽ (Layer) thành hình ảnh màn hình cuối cùng, thường thực thi trên GPU |
| **Layer** | Lớp/lớp kết hợp | Trình duyệt tạo bề mặt vẽ độc lập để tối ưu hóa tinh chỉnh, có thể biến đổi và kết hợp riêng biệt |
| **Event Loop** | Vòng lặp sự kiện | Cơ chế thực thi bất đồng bộ của JavaScript, chịu trách nhiệm điều phối thực thi tác vụ vĩ mô và tác vụ vi mô |
| **Call Stack** | Ngăn xếp gọi | Cấu trúc dữ liệu ghi chép hàm JavaScript đang thực thi |
| **Macro Task** | Tác vụ vĩ mô | Loại tác vụ mức độ ưu tiên thấp hơn trong vòng lặp sự kiện, như setTimeout, setInterval, hoạt động I/O v.v. |
| **Micro Task** | Tác vụ vi mô | Loại tác vụ mức độ ưu tiên cao hơn trong vòng lặp sự kiện, như Promise.then, MutationObserver v.v. |
| **Forced Synchronous Layout** | Bố cục đồng bộ bắt buộc | Trong JavaScript, đọc viết xen kẽ thuộc tính bố cục, dẫn đến trình duyệt bị buộc thực thi ngay tính toán bố cục, vấn đề hiệu suất |
| **Layout Thrashing** | Bố cục rung | Tình trạng hiệu suất giảm mạnh do bố cục đồng bộ bắt buộc thường xuyên |
| **Virtual Scrolling** | Cuộn ảo | Kỹ thuật chỉ tinh chỉnh các mục danh sách nhìn thấy được trong viewport, dùng để tối ưu hóa hiệu suất danh sách dữ liệu lớn |
| **RAF** | Yêu cầu khung hình hoạt ảnh | API do trình duyệt cung cấp, dùng để thực thi mã JavaScript liên quan đến hoạt ảnh trước khi vẽ lại lần tiếp theo |
