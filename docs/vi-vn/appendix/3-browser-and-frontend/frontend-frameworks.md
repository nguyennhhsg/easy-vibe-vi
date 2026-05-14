# Hướng dẫn sâu về Framework Frontend

::: tip Lời nói đầu
Bạn đã học được HTML, CSS và JavaScript cơ bản, có thể tạo ra những trang web đơn giản. Nhưng khi tính năng trang web ngày càng phức tạp, bạn có thể sẽ phát hiện ra: viết code bằng JavaScript nguyên bản trở nên rất khó duy trì, thay đổi một chỗ phải sửa nhiều nơi, khi nhiều người cộng tác thường hay xung đột.

Đó chính là lý do tại sao chúng ta cần framework frontend - nó làm cho code có tổ chức hơn, dễ duy trì hơn, phát triển hiệu quả hơn. Trong vibecoding, AI sẽ giúp bạn viết hầu hết code. Nhưng bạn ít nhất phải có thể hiểu được style code của những framework khác nhau, biết ưu điểm và nhược điểm của chúng, như thế thì AI mới có thể giúp bạn chọn tech stack phù hợp nhất.

Sau khi đọc xong bài này, bạn sẽ có thể:
- Hiểu tại sao công nghệ frontend cần phải không ngừng tiến hóa
- Biết Vue, React, Svelte, Angular có đặc điểm gì
- Hiểu các khái niệm cốt lõi như "data-driven", "component-based"
- Có thể lựa chọn framework phù hợp dựa trên dự án
:::

**Bài viết này sẽ dạy bạn gì?**

| Chương | Nội dung | Học xong làm được gì |
|--------|---------|-----|
| **Chương 1** | Tại sao phải quan tâm đến sự tiến hóa frontend | Hiểu công nghệ tiến hóa là để giải quyết vấn đề gì |
| **Chương 2** | Thời đại trang web tĩnh | Hiểu cách phát triển web ở thời kỳ đầu tiên |
| **Chương 3** | Thời đại jQuery | Hiểu điểm yếu của lập trình "mệnh lệnh" |
| **Chương 4** | Thời đại Vue/React | Nắm vững tư tưởng "declarative" và "data-driven" |
| **Chương 5** | Chiến lược render | Biết sự khác biệt và trường hợp áp dụng của CSR, SSR, SSG |
| **Chương 6** | Công cụ kỹ thuật hóa | Hiểu tác dụng của các công cụ build như Webpack, Vite |

Mỗi chương đều bắt đầu từ "tại sao cần công nghệ này", để bạn hiểu rõ logic đằng sau sự tiến hóa công nghệ.

---

## 1. Tại sao phải quan tâm đến lịch sử tiến hóa frontend?

::: tip 🤔 Vấn đề cốt lõi
**Tại sao trang web ngày càng phức tạp? Tại sao công nghệ frontend lại cần phải không ngừng tiến hóa?** Câu hỏi này sẽ dẫn bạn hiểu rõ con đường thay đổi công nghệ từ trang web đơn giản đến ứng dụng Web hiện đại.
:::

### 1.1 Từ "áp phích điện tử" đến "ứng dụng desktop"

Hãy tưởng tượng bạn nhìn thấy một **áp phích** trên đường phố:

- ✅ Có nội dung (chữ, hình ảnh)
- ✅ Có thiết kế (màu sắc, bố cục)
- ❌ Nhưng bạn nói chuyện với nó, nó không phản hồi
- ❌ Bạn nhấp vào một chỗ nào đó, không có gì xảy ra

**Trang web đầu tiên** cũng như vậy: chỉ có thể xem, không thể sửa, nội dung cố định.

**Trang web hiện đại** hoàn toàn khác. Chúng giống như **ứng dụng desktop** (VS Code, Figma):

- ✅ Có thể chỉnh sửa tài liệu, vẽ tranh, chơi trò chơi
- ✅ Phản ứng thực tế với mỗi thao tác của bạn
- ✅ Thậm chí có thể làm việc ngoại tuyến

**Lý do cốt lõi của sự thay đổi này: tính năng trang web ngày càng phức tạp, cần công nghệ hiệu quả hơn và cách phát triển tốt hơn.**

### 1.2 Một phép so sánh cuộc sống: xây nhà

Sự tiến hóa công nghệ frontend, giống như cách xây nhà tiến hóa:

| Thời đại | 🏠 Phép so sánh xây nhà | Đặc điểm thực tế | Ưu điểm và nhược điểm |
|----------|-----------|---------|--------|
| **2000s** | **Dán áp phích** | Trang web tĩnh, viết HTML là xong | ✅ Đơn giản ❌ Không tương tác |
| **2010s** | **Thuê thợ trang trí thủ công** | Thời đại jQuery, thao tác thủ công từng phần tử | ✅ Có tương tác ❌ Code lộn xộn, khó duy trì |
| **2020s** | **Xây nhà bằng Lego** | Thời đại Vue/React, phát triển dựa trên component | ✅ Hiệu quả, dễ duy trì ❌ Có học lực |

::: tip 💡 Bạn có thể nhìn thấy gì từ bảng?

**Giai đoạn một → Giai đoạn hai**: từ "không thể động" đến "có thể động". Đây là bước nhảy vượt - trang web bắt đầu có tương tác, nhưng cái giá là code trở nên lộn xộn.

**Giai đoạn hai → Giai đoạn ba**: từ "có thể dùng" đến "tốt để dùng". Component hóa làm code giống như các khối xây dựng có thể tái sử dụng, tăng đáng kể hiệu suất phát triển.

**Tư tưởng cốt lõi**: sự tiến hóa công nghệ không phải để "mới vì mới", mà để giải quyết các vấn đề từ giai đoạn trước.
:::

---

---

## 2. Giai đoạn một: Trang web tĩnh và "cắt hình" (2000s)

::: tip 🤔 Vấn đề cốt lõi
**Trang web đầu tiên trông như thế nào? Tại sao lúc đó không cần framework?** Chỉ khi hiểu giới hạn của giai đoạn này, bạn mới hiểu được sự cần thiết của sự tiến hóa công nghệ sau này.
:::

<FrontendEvolutionDemo />

### 2.1 Giai đoạn này trông như thế nào?

**Cách phát triển**:

- Viết vài file HTML
- Nhúng một số CSS và JavaScript
- Kéo file thư mục trực tiếp vào trình duyệt để xem kết quả
- Tải thư mục lên server để hoàn thành deploy

**Đặc điểm**:

- ✅ **Ưu điểm**: đơn giản, trực tiếp, không có chi phí học tập, viết xong là chạy
- ❌ **Nhược điểm**: không thể thực hiện tương tác phức tạp, code nhiều thì lộn xộn

::: details Xem cấu trúc dự án thời đó

```
project/
├── index.html
├── login.html
├── css/
│   ├── bootstrap.css
│   └── custom.css
├── js/
│   ├── jquery.js
│   └── app.js
└── images/
```

**Vấn đề gặp phải**:

1. **Ô nhiễm biến toàn cục**: tất cả biến đều ở không gian tên toàn cục, dễ ghi đè lên nhau
2. **Quản lý phụ thuộc lộn xộn**: phải tải file JS theo đúng thứ tự, không thì sẽ báo lỗi
3. **Code khó tái sử dụng**: muốn tái sử dụng một tính năng nào đó, chỉ có thể copy-paste
:::

### 2.2 "Cắt hình" là gì?

Bạn có thể đã nghe nói đến từ "cắt hình". Đó là công việc chính của frontend sơ kỳ:

**Cắt hình là gì?**

Nhà thiết kế dùng Photoshop thiết kế trang → frontend cắt thiết kế thành những hình nhỏ → dùng HTML để ghép những hình thành trang

**Tại sao lại chậm như vậy?**

Mỗi hình nhỏ trên trang web, trình duyệt đều phải gửi một **yêu cầu mạng**. Yêu cầu càng nhiều, tải càng chậm.

👇 **Hãy thử**: quan sát ảnh hưởng của yêu cầu hình ảnh đến hiệu suất tải

<SliceRequestDemo />

::: tip 💡 Hình sprite (Sprite)

Để giảm số lượng yêu cầu, xuất hiện kỹ thuật "hình sprite": gộp nhiều hình nhỏ thành một hình lớn.

Ưu điểm là số yêu cầu giảm, nhược điểm là việc tạo và bảo trì rất phiền phức.

Bài học từ giai đoạn này: **Quá nhiều yêu cầu là kẻ thù hiệu suất**.
:::

---

---

## 3. Giai đoạn hai: Thời đại jQuery - "Vận chuyển thủ công" (2010s)

::: tip 🤔 Vấn đề cốt lõi
**Tại sao cần jQuery? Nó giải quyết vấn đề gì, và lại mang đến vấn đề gì mới?** Chỉ khi hiểu những giới hạn của jQuery, bạn mới thấy giá trị của Vue/React.
:::

### 3.1 Tại sao cần jQuery?

Khi trang web trở nên phức tạp, vấn đề của JavaScript nguyên bản lộ ra:

- ❌ **API phức tạp**: thao tác đơn giản cũng phải viết nhiều code
- ❌ **Tương thích trình duyệt**: API ở các trình duyệt khác nhau khác nhau, phải viết nhiều code tương thích
- ❌ **Bộ chọn yếu**: tìm phần tử rất phiền phức

**jQuery** ra đời. Nó làm cho JavaScript trở nên đơn giản:

```javascript
// JavaScript nguyên bản (phức tạp)
const element = document.getElementById('title')

// jQuery (đơn giản)
const element = $('#title')
```

### 3.2 Tư tưởng jQuery: tự tay sửa trang

Tư tưởng cốt lõi của jQuery là **mệnh lệnh**: bạn nói trình duyệt "làm thế nào".

```javascript
// Tìm phần tử tiêu đề
$('#title').text('Tiêu đề mới')

// Tìm nút và vô hiệu hóa
$('#submit-btn').attr('disabled', true)

// Tìm danh sách và thêm một mục
$('ul').append('<li>Mục mới</li>')
```

**Vấn đề**: bạn phải nhớ trang có những phần tử nào, mỗi khi dữ liệu thay đổi phải sửa thủ công tất cả các phần tử liên quan.

👇 **Hãy thử**: so sánh cách jQuery và cách data-driven

<JQueryVsStateDemo />

::: warning ⚠️ Điểm yếu của jQuery

Tưởng tượng bạn đang làm một giỏ hàng:

```javascript
// Người dùng nhấp vào "Thêm vào giỏ hàng"
function addToCart() {
  cartCount++ // Dữ liệu thay đổi

  // Bạn phải sửa thủ công tất cả các nơi liên quan
  $('#cart-count').text(cartCount) // Chấm đỏ ở góc phải
  $('#cart-page-count').text(cartCount) // Trang giỏ hàng
  $('#checkout-price').text(calculatePrice()) // Nút thanh toán

  // Nếu sót một chỗ, trang sẽ không nhất quán!
}
```

**Đây chính là cái giá của "vận chuyển thủ công"**: dễ sai sót, khó duy trì.
:::

### 3.3 Thiết bị di động phổ biến: sự ra đời của thiết kế responsive

Giai đoạn này còn có một thay đổi quan trọng: **điện thoại và máy tính bảng bắt đầu phổ biến**.

Trang web phải thích ứng với các màn hình khác nhau. Điều này cần **bố cục responsive**: cùng một bộ HTML/CSS, tự động thay đổi bố cục dựa trên chiều rộng màn hình.

**Cốt lõi của bố cục responsive: media query**

```css
/* Màn hình máy tính (lớn hơn 640px) */
@media (min-width: 640px) {
  .container {
    display: flex;
  }
}

/* Màn hình điện thoại (nhỏ hơn 640px) */
@media (max-width: 640px) {
  .container {
    display: block;
  }
}
```

👇 **Hãy thử**: điều chỉnh chiều rộng trình duyệt, quan sát hiệu ứng của bố cục responsive

<ResponsiveGridDemo />

::: tip 💡 Responsive giống như "khung ảnh thông minh"

Tưởng tượng bạn xem cùng một bức ảnh ở những căn phòng khác nhau:

- Ở **phòng khách lớn** (màn hình máy tính), bức ảnh có thể để lớn hơn, bên cạnh còn có những vật trang trí khác
- Ở **phòng ngủ nhỏ** (màn hình điện thoại), bức ảnh phải nhỏ hơn, những vật trang trí khác phải để vào tủ

**Bố cục responsive** chính là "khung ảnh thông minh", tự động điều chỉnh cách trình bày dựa trên kích thước phòng.
:::

---

---

## 4. Giai đoạn ba: Từ "vận chuyển thủ công" đến "data-driven" (Vue/React)

::: tip 🤔 Vấn đề cốt lõi
**Tại sao cần Vue/React? Sự khác biệt căn bản giữa chúng và jQuery là gì?** Hiểu "declarative" và "data-driven" là chìa khóa để nắm vững framework frontend hiện đại.
:::

### 4.1 Tại sao cần framework mới?

Những vấn đề từ thời đại jQuery tích tụ đến một mức nhất định:

- **Code nhiều thì lộn xộn**: toàn bộ nơi là thao tác DOM, khó duy trì
- **Dễ sinh ra lỗi**: nếu sót cập nhật một nơi nào đó, trang sẽ không nhất quán
- **Hợp tác khó khăn**: nhiều người sửa cùng một file, dễ xung đột

**Vue / React** có tư tưởng cốt lõi: **chỉ sửa dữ liệu, trang tự động cập nhật**.

### 4.2 Tư tưởng Vue/React: UI khai báo

**jQuery (mệnh lệnh)**:

```javascript
// Bạn phải nói trình duyệt từng bước cần làm gì
$('#title').text('Tiêu đề mới')
$('#title').css('color', 'red')
$('#title').show()
```

**Vue (khai báo)**:

```javascript
// Bạn chỉ nói trình duyệt "cần hiển thị cái gì"
data() {
  return {
    title: "Tiêu đề mới",
    color: "red",
    visible: true
  }
}
```

👇 **Hãy thử**: so sánh sự khác biệt giữa mệnh lệnh và khai báo

<ImperativeVsDeclarativeDemo />

::: tip 💡 Mệnh lệnh vs Khai báo

Giống như vẽ một bức tranh:

- **Mệnh lệnh**: bạn nói họa sĩ "cầm bút, nhúng vào màu đỏ, vẽ một vòng tròn ở tọa độ (10,10)"
- **Khai báo**: bạn cho họa sĩ xem một bức ảnh, "vẽ thành giống như vậy"

Vue/React chính là "khai báo": bạn mô tả "trang trông như thế nào", framework chịu trách nhiệm "vẽ nó ra".
:::

### 4.3 Component hóa: viết trang như xếp Lego

**Tính năng mạnh nhất của Vue / React** là **component hóa**: tách trang thành những "khối xây dựng" độc lập.

Tưởng tượng bạn xếp Lego:

- Bạn không cần "từ đầu chạm dao cắt từng khối Lego" (từ đầu viết HTML/CSS)
- Bạn chỉ cần "theo hướng dẫn xếp những khối Lego lại với nhau" (ghép những component lại)
- Mỗi khối Lego đều **độc lập**, bạn có thể **tái sử dụng** nó trong những bộ khác nhau

**Lợi ích của component**:

- **Tái sử dụng**: viết một component "thẻ sản phẩm", có thể dùng 100 lần
- **Đóng gói**: trạng thái bên trong component không ảnh hưởng đến người khác
- **Duy trì**: sửa một component, tất cả nơi dùng nó sẽ tự động cập nhật

::: info 💡 Cách nhận biết
- Thấy `<ComponentName />` → đây là một component
- Thấy `import xxx from './xxx.vue'` → đang import một component
- Thấy `props: {...}` → những tham số component nhận
- Thấy `emit('xxx')` → component gửi sự kiện cho component cha
:::

### 4.4 SPA: sự ra đời của ứng dụng một trang

**Vue / React** thời đại còn có một thay đổi quan trọng: **từ MPA đến SPA**.

**MPA (Ứng dụng nhiều trang)**:

- Nhấp vào một liên kết → trang toàn bộ làm tươi → hiển thị trang mới
- Giống như **lật qua sách**: mỗi lần lật trang đều phải đóng sách cũ lại, đi lấy quyển sách mới từ kệ

**SPA (Ứng dụng một trang)**:

- Nhấp vào một liên kết → chỉ làm tươi vùng nội dung → trang không làm tươi
- Giống như **chuyển chương trong cùng một quyển sách**: chỉ xóa nội dung cũ, viết nội dung mới

👇 **Hãy thử**: trải nghiệm sự khác biệt giữa MPA và SPA

<RoutingModeDemo />

**Lợi ích của SPA**:

- ✅ **Trải nghiệm mượt**: chuyển trang nhanh
- ✅ **Quản lý trạng thái tốt**: nội dung nhập vào, vị trí cuộn đều được lưu
- ❌ **Trang đầu có thể chậm**: phải tải JavaScript trước
- ❌ **Cần xử lý riêng SEO**: công cụ tìm kiếm có thể không bắt được nội dung (cần SSR/SSG)

---

---

## 5. Chiến lược render: từ CSR đến SSR/SSG

::: tip 🤔 Vấn đề cốt lõi
**Trang được tạo ở server hay ở trình duyệt?** Những chiến lược render khác nhau có ưu và nhược điểm riêng, lựa chọn chiến lược phù hợp rất quan trọng đối với hiệu suất và SEO.
:::

**CSR (Render bên client)**:

- Trình duyệt tải JavaScript → thực hiện code → tạo trang
- Ưu điểm: tương tác mượt, server ít tải
- Nhược điểm: trang đầu chậm, không tốt cho SEO

**SSR (Render bên server)**:

- Server tạo HTML → gửi cho trình duyệt → trình duyệt trực tiếp hiển thị
- Ưu điểm: trang đầu nhanh, tốt cho SEO
- Nhược điểm: server tải nặng, thực hiện phức tạp

**SSG (Tạo trang web tĩnh)**:

- Tạo tất cả HTML của trang trong lúc build
- Ưu điểm: cực nhanh, hoàn toàn tĩnh, thân thiện với CDN
- Nhược điểm: không phù hợp với nội dung động

👇 **Hãy thử**: so sánh đặc điểm của những chiến lược render khác nhau

<RenderingStrategyDemo />

::: info 💡 Cách lựa chọn?
- **Trang web nội dung** (blog, tài liệu): ưu tiên SSG
- **Trang web động cần SEO** (thương mại điện tử, tin tức): dùng SSR
- **Hệ thống quản lý sau**: dùng CSR
- **Yêu cầu kết hợp**: cân nhắc Nuxt/Next.js với render hỗn hợp
:::

---

## 6. Giai đoạn bốn: Kỹ thuật hóa và công cụ build (2015s-2020s)

::: tip 🤔 Vấn đề cốt lõi
**Tại sao frontend cần "kỹ thuật hóa"? Công cụ build thực sự đang làm gì?** Hiểu kỹ thuật hóa, bạn mới hiểu được quy trình làm việc của dự án frontend hiện đại.
:::

### 6.1 Tại sao cần "kỹ thuật hóa"?

Dự án frontend ngày càng lớn, không thể còn dựa vào "nhập kịch bản thủ công".

**Kỹ thuật hóa** chính là dùng công cụ và quy chuẩn, làm cho phát triển hiệu quả hơn, code tin cậy hơn, hợp tác suôn sẻ hơn.

::: tip 💡 Kỹ thuật hóa = từ "tiệm thủ công" đến "nhà máy hiện đại"

Tưởng tượng bạn nấu ăn ở nhà vs mở nhà hàng:

- **Nấu ở nhà**: muốn ăn gì thì nấu gì, rất tự do
- **Mở nhà hàng**: cần công thức tiêu chuẩn, quy trình hoạt động thống nhất, mua nguyên liệu thống nhất

Phát triển frontend cũng vậy:

- **Dự án nhỏ**: viết sao cũng được
- **Dự án lớn**: cần quy chuẩn code thống nhất, công cụ tự động hóa, quy trình tiêu chuẩn
:::

### 6.2 Công cụ build: Webpack → Vite

**Webpack (truyền thống)**:

- Cách làm việc: **build trước, phục vụ sau**
- Lúc khởi động: build tất cả code → khởi động server
- Vấn đề: **chậm**. Dự án càng lớn, khởi động càng chậm (có thể phải chờ 30 giây)

**Vite (hiện đại)**:

- Cách làm việc: **compile khi cần**
- Lúc khởi động: không build, khởi động server trực tiếp
- Trình duyệt yêu cầu file nào, thì compile file đó ngay lập tức
- Ưu điểm: **nhanh**. Thường chỉ tốn dưới 1 giây để khởi động

| So sánh | Webpack | Vite | Cải thiện |
|---------|---------|------|----------|
| Khởi động lạnh | 30s+ | <1s | **Nhanh 30 lần** |
| Cập nhật nóng | 3-5s | <100ms | **Nhanh 30 lần** |
| File cấu hình | Vài trăm dòng | Vài chục dòng | **Đơn giản hóa lớn** |

::: tip 💡 Tại sao Vite nhanh như vậy?

**Webpack** giống như **di chuyển nhà chuẩn bị đầy đủ**: trước tiên gói tất cả thứ, sau đó bước ra ngoài.

**Vite** giống như **du lịch nhẹ**: chỉ mang những vật cần thiết, cần gì mua gì.

Trong môi trường phát triển, hầu hết thời gian bạn chỉ sửa vài file, Vite chỉ compile những file này, tất nhiên là nhanh.
:::

---

---

## 7. So sánh framework chính

::: tip 🤔 Vấn đề cốt lõi
**Vue, React, Svelte, Angular có đặc điểm gì riêng? Làm thế nào để lựa chọn framework phù hợp với mình?** Hiểu triết lý thiết kế và trường hợp sử dụng của chúng, bạn mới có thể đưa ra quyết định thông minh.
:::

### 7.1 So sánh bốn framework chính

| Tính năng | Vue | React | Svelte | Angular |
|----------|-----|-------|--------|---------|
| **Triết lý thiết kế** | Framework tiến hóa | Thư viện UI | Framework compile-time | Nền tảng hoàn chỉnh |
| **Đường cong học tập** | ⭐⭐ Đơn giản | ⭐⭐⭐ Trung bình | ⭐⭐ Đơn giản | ⭐⭐⭐⭐ Dốc |
| **Hiệu suất** | Nhanh | Nhanh | **Cực nhanh** | Nhanh |
| **Hệ sinh thái** | Hoàn chỉnh | **Hoàn chỉnh nhất** | Đang phát triển | Hoàn chỉnh |
| **Kích thước gói** | Nhỏ | Trung bình | **Nhỏ nhất** | Lớn |
| **Phù hợp với trường hợp** | Dự án trung bình | Dự án lớn | Yêu cầu hiệu suất cao | Ứng dụng cấp doanh nghiệp |
| **Hỗ trợ công ty** | Yuri You (độc lập) | Meta | Cộng đồng | Google |

### 7.2 Vue: Framework tiến hóa

**Tư tưởng cốt lõi**: áp dụng tiến hóa, có thể chỉ dùng một phần, cũng có thể dùng hết bộ

```vue
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue'
    }
  }
}
</script>
```

**Ưu điểm**:
- ✅ Đường cong học tập từng bước, tài liệu tiếng Trung hoàn chỉnh
- ✅ Cú pháp template trực quan, dễ hiểu
- ✅ Component file đơn (.vue) cấu trúc rõ ràng
- ✅ Phù hợp với phát triển nhanh

**Nhược điểm**:
- ❌ Quản lý trạng thái trong dự án lớn cần học thêm Vuex/Pinia
- ❌ Tính linh hoạt chưa bằng React

**Trường hợp phù hợp**:
- Ứng dụng Web trung bình
- Phát triển nhanh prototype
- Đội ngũ người dùng tiếng Trung (tài liệu thân thiện)

### 7.3 React: Thư viện UI

**Tư tưởng cốt lõi**: chỉ chịu trách nhiệm tầng view, những vấn đề khác để cho cộng đồng

```jsx
function App() {
  const [message, setMessage] = useState('Hello React')
  return <div>{message}</div>
}
```

**Ưu điểm**:
- ✅ Hệ sinh thái hoàn chỉnh nhất, thư viện component phong phú
- ✅ Cú pháp JSX linh hoạt, sức biểu đạt mạnh mẽ
- ✅ Virtual DOM hiệu suất xuất sắc
- ✅ Phù hợp với dự án lớn

**Nhược điểm**:
- ❌ Đường cong học tập dốc, cần nắm vững nhiều khái niệm bổ sung
- ❌ Phải tự lựa chọn và ghép nhiều thư viện khác nhau
- ❌ JSX cần compile, không thể chạy trực tiếp trong trình duyệt

**Trường hợp phù hợp**:
- Ứng dụng phức tạp lớn
- Dự án cần hệ sinh thái phong phú
- Phát triển đa nền tảng (React Native)

### 7.4 Svelte: Framework compile-time

**Tư tưởng cốt lõi**: không có Virtual DOM, compile-time chuyển component thành code nguyên bản hiệu quả

```svelte
<script>
  let message = 'Hello Svelte'
</script>

<div>{message}</div>
```

**Ưu điểm**:
- ✅ **Hiệu suất tối ưu** (không có chi phí runtime Virtual DOM)
- ✅ Kích thước gói nhỏ nhất
- ✅ Cú pháp đơn giản trực quan
- ✅ Hệ thống phản ứng theo tự nhiên hỗ trợ

**Nhược điểm**:
- ❌ Hệ sinh thái tương đối nhỏ
- ❌ Quy mô cộng đồng không bằng Vue/React
- ❌ Thư viện bên thứ ba ít hơn

**Trường hợp phù hợp**:
- Ứng dụng yêu cầu hiệu suất cực cao
- Dự án nhạy cảm với kích thước gói
- Đội ngũ sẵn sàng thử công nghệ mới

### 7.5 Angular: Nền tảng hoàn chỉnh

**Tư tưởng cốt lõi**: cung cấp giải pháp hoàn chỉnh, có thể sử dụng ngay khỏi hộp

```typescript
@Component({
  selector: 'app-root',
  template: '<div>{{ message }}</div>'
})
export class AppComponent {
  message = 'Hello Angular'
}
```

**Ưu điểm**:
- ✅ Tính năng hoàn chỉnh, routing, HTTP, form đều có
- ✅ Hỗ trợ TypeScript nguyên bản
- ✅ Phù hợp với dự án lớn và đội ngũ nhiều người
- ✅ Quy chuẩn code thống nhất

**Nhược điểm**:
- ❌ Đường cong học tập dốc
- ❌ Khái niệm nhiều, độ phức tạp cao
- ❌ Kích thước gói lớn
- ❌ Không phù hợp với dự án nhỏ

**Trường hợp phù hợp**:
- Ứng dụng cấp doanh nghiệp lớn
- Đội ngũ cần quy chuẩn chặt chẽ
- Dự án đã có tech stack TypeScript

---

## 8. Tóm tắt: Bản chất của sự tiến hóa

Sự tiến hóa công nghệ frontend, về bản chất là giải quyết hai vấn đề:

### 8.1 Hiệu suất: từ thủ công đến tự động

| Thời đại | Cách phát triển | Hiệu suất |
|----------|---------|------|
| **2000s** | Viết thủ công HTML/CSS/JS | ⭐ |
| **2010s** | jQuery + thao tác DOM thủ công | ⭐⭐ |
| **2020s** | Vue/React + data-driven | ⭐⭐⭐ |
| **Hiện tại** | Component hóa + kỹ thuật hóa + tự động hóa | ⭐⭐⭐⭐⭐ |

### 8.2 Quy mô: từ cá nhân đến đội ngũ

| Thời đại | Quy mô dự án | Cách hợp tác |
|----------|---------|---------|
| **2000s** | Vài file | Một người có thể duy trì |
| **2010s** | Vài chục file | Đội nhỏ, dễ xung đột |
| **2020s** | Vài trăm file | Đội trung bình, cần quy chuẩn |
| **Hiện tại** | Vài nghìn file | Đội lớn, cần hệ thống kỹ thuật hoàn chỉnh |

---

---

## 9. Sơ đồ đường học tập

### 9.1 Nếu bạn là người mới bắt đầu

**Bước 1: Nền tảng HTML/CSS/JavaScript**

- Hiểu ba nền tảng của trang web
- Có thể viết ra những trang tĩnh đơn giản

**Bước 2: Học một framework (Vue được khuyến nghị)**

- Hiểu tư tưởng "data-driven"
- Nắm vững phát triển dựa component

**Bước 3: Dự án thực tế**

- Làm một ứng dụng một trang hoàn chỉnh
- Quen thuộc với routing, quản lý trạng thái, gọi API

### 9.2 Nếu bạn đã có nền tảng

**Hướng nâng cao**:

- **Kỹ thuật hóa**: học Vite/Webpack, hiểu quy trình build
- **Tối ưu hóa hiệu suất**: học lazy loading, code splitting, chiến lược cache
- **TypeScript**: thêm type cho code, nâng cao độ tin cậy
- **Render bên server**: học Nuxt/Next.js, giải quyết vấn đề SEO và trang đầu

---

## 10. Code bạn nên có thể nhận biết ngay bây giờ

Khi đọc xong chương này, bạn nên có thể:

- ✅ Hiểu mạch ngoặc của sự tiến hóa công nghệ frontend và lý do
- ✅ Phân biệt đặc điểm của Vue, React, Svelte, Angular
- ✅ Hiểu sự khác biệt giữa "mệnh lệnh" và "khai báo"
- ✅ Nắm vững tư tưởng cốt lõi "data-driven"
- ✅ Biết giá trị của phát triển dựa component
- ✅ Hiểu trường hợp áp dụng của CSR, SSR, SSG
- ✅ Hiểu tác dụng của công cụ build (Webpack, Vite)
- ✅ Có thể lựa chọn framework và tech stack phù hợp dựa trên dự án

::: info 💡 Áp dụng thực tế
Khi bạn dùng AI để làm dự án, bạn có thể nói với AI như vậy:

- "Đây là một trang web blog cần SEO, dùng Nuxt (framework SSR của Vue)"
- "Đây là một hệ thống quản lý sau, dùng Vue + Element Plus, không cần SSR"
- "Đây là một ứng dụng Web yêu cầu hiệu suất cao, cân nhắc dùng Svelte"
- "Dự án đã dùng React, tiếp tục dùng thư viện của hệ sinh thái React"
:::

---

## Bảng tra nhanh thuật ngữ

| Thuật ngữ | Tiếng Anh | Giải thích bằng lời bình dân |
|-----------|----------|-----------|
| **DOM** | Document Object Model | Mô hình đối tượng document. Dùng cây đối tượng để biểu diễn trang, có thể được JS đọc và viết. |
| **jQuery** | - | Thư viện JS nổi tiếng hồi xưa, đơn giản hóa thao tác DOM. |
| **Vue/React** | - | Framework frontend hiện đại, áp dụng data-driven và phát triển dựa component. |
| **Component** | Component | Đơn vị UI có thể tái sử dụng, chẳng hạn như nút, thẻ, thanh điều hướng. |
| **MPA** | Multi-Page Application | Ứng dụng nhiều trang. Mỗi lần nhảy đều tải lại toàn bộ trang. |
| **SPA** | Single-Page Application | Ứng dụng một trang. Chỉ tải một lần, sau này chuyển đổi không tải lại trang. |
| **Routing** | Routing | Quản lý quy tắc và quy trình chuyển đổi giữa các trang. |
| **SSR** | Server-Side Rendering | Render bên server. Server tạo HTML rồi gửi cho trình duyệt. |
| **SSG** | Static Site Generation | Tạo trang web tĩnh. Khi build, pre-render trang thành HTML tĩnh. |
| **CSR** | Client-Side Rendering | Render bên client. Trình duyệt dùng JS để tạo trang. |
| **Webpack** | - | Công cụ build truyền thống, build trước rồi phục vụ. |
| **Vite** | - | Công cụ build hiện đại, compile khi cần, tốc độ cực nhanh. |
| **Responsive** | Responsive Design | Trang tự động thích ứng với kích thước màn hình khác nhau. |
| **Media Query** | Media Query | Điều kiện CSS, áp dụng kiểu khác nhau dựa trên chiều rộng màn hình. |
| **Mệnh lệnh** | Imperative | Nói cho chương trình "làm thế nào". |
| **Khai báo** | Declarative | Nói cho chương trình "cần gì". |
| **Data-driven** | Data-Driven | Chỉ sửa dữ liệu, giao diện tự động cập nhật. |
| **Tree Shaking** | - | Tối ưu hóa lắc cây. Tự động xóa code không dùng, giảm kích thước gói. |
| **Code Splitting** | Code Splitting | Chia code thành nhiều khúc nhỏ, tải khi cần. |
