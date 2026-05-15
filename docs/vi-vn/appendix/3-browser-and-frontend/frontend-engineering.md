# Toàn cảnh Kỹ thuật phát triển Frontend
::: tip 🎯 Câu hỏi cốt lõi
**Làm cách nào để biến đoạn mã bạn viết thành một trang web chạy được trong trình duyệt của người dùng?** Giống như câu hỏi: Làm cách nào để biến nguyên liệu thô thành sản phẩm hoàn thiện, đồng thời đảm bảo chất lượng và kiểm soát chi phí? Chương này sẽ giúp bạn hiểu sâu các khái niệm cốt lõi và quy trình xây dựng của kỹ thuật phát triển frontend.
:::

---

## 1. Tại sao phải "kỹ thuật hóa"?

### 1.1 Từ đơn giản đến phức tạp: Sự phát triển của phát triển frontend

Quay lại mười năm trước, phương cách phát triển frontend của chúng ta rất đơn giản: viết vài trang HTML, nhúng một số CSS và JavaScript, kéo các tệp trực tiếp vào trình duyệt để xem hiệu quả, và khi triển khai, chỉ cần tải thư mục lên máy chủ. Tổng lượng mã của một trang web có thể chỉ vài chục KB. Đó là thời đại "WYSIWYG", quy trình phát triển đơn giản và trực tiếp, hầu như không có khái niệm "kỹ thuật hóa".

Nhưng phát triển frontend hiện đại đã hoàn toàn thay đổi. Chúng ta bây giờ sử dụng TypeScript thay cho JavaScript, có nghĩa là cần biên dịch; chúng ta sử dụng cách phát triển theo thành phần của Vue hoặc React, yêu cầu chuyển đổi bổ sung; chúng ta viết CSS bằng Sass hoặc Less, cần xử lý trước; chúng ta cài đặt các gói phụ thuộc khác nhau thông qua npm, cuối cùng cần đóng gói. Một dự án frontend vừa và lớn có thể có hàng nghìn phần phụ thuộc, kích thước tổng cộng hàng trăm MB, tạo nên sự tương phản rõ rệt với "sự đơn giản trực tiếp" của mười năm trước.

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**👴 Phương cách phát triển mười năm trước**
- Viết vài HTML + CSS + JS là một dự án
- Kéo trực tiếp vào trình duyệt để xem hiệu quả
- Tải thư mục lên máy chủ để hoàn thành triển khai
- Toàn bộ mã dự án thường chỉ có vài chục KB

</div>
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🚀 Phương cách phát triển hiện đại**
- Sử dụng TypeScript, cần biên dịch để chạy
- Sử dụng Vue/React, cần chuyển đổi thành JS thuần túy
- Sử dụng quản lý gói npm, cần đóng gói và hợp nhất
- Phần phụ thuộc dự án có thể dễ dàng đạt hàng trăm MB

</div>
</div>

**Đây chính là vấn đề mà "kỹ thuật phát triển frontend" cần giải quyết: cách quản lý độ phức tạp, làm cho hiệu suất phát triển cao hơn, chất lượng mã tốt hơn, trải nghiệm người dùng tốt hơn.**

<BuildPipelineDemo />

### 1.2 Một câu chuyện thực tế về sai lầm: Tại sao bạn cần hiểu nguyên tắc xây dựng

Bạn có thể nói: "Tôi sử dụng Vite hoặc Create React App, sạn sàng sử dụng, tại sao tôi vẫn cần hiểu các nguyên tắc xây dựng này?" Hãy để tôi kể một câu chuyện thực tế, bạn sẽ hiểu tại sao kiến thức này lại quan trọng như vậy.

::: warning Câu chuyện sai lầm của Xiaoming
Xiaoming là một lập trình viên frontend mới vào công ty, công ty sử dụng dự án được xây dựng bằng Vite. Một ngày, người quản lý sản phẩm chạy đến nói trang chủ tải quá chậm, người dùng đang phàn nàn, cần tối ưu hóa ngay.

Xiaoming lập tức hành động: anh nén ảnh, thực hiện tải lười lối cho định tuyến, kích hoạt nén Gzip...một loạt hoạt động mạnh mẽ, nhưng tốc độ tải trang chủ vẫn rất chậm, vấn đề vẫn không được giải quyết.

Sau này anh tham khảo ý kiến của bậc thầy, bậc thầy mở công cụ nhà phát triển của trình duyệt, nhìn vào yêu cầu mạng, ngay lập tức phát hiện ra vấn đề: tệp `vendor.js` lại có kích thước 2MB! Hóa ra Xiaoming vì muốn sử dụng một hàm định dạng ngày tháng, đã nhập trực tiếp toàn bộ thư viện `moment.js`, trong khi `moment.js` chứa các tệp locale cho hơn 100 ngôn ngữ, phần lớn không được dự án sử dụng.

Giải pháp rất đơn giản: thay thế `moment.js` bằng `dayjs`, hoặc nhập theo nhu cầu từ `date-fns`. Sau khi thay đổi này, dung lượng 2MB ngay lập tức giảm xuống 2KB, tốc độ tải trang chủ tăng mười mấy lần.

Xiaoming từ đó hiểu ra một bài học: **nếu không hiểu nguyên tắc xây dựng và đóng gói, bạn thậm chí không biết vấn đề nằm ở đâu, chứ đừng nói đến việc giải quyết vấn đề.**
:::

::: info 💡 Bài học cốt lõi
Công cụ xây dựng không phải là phép thuật đen, hiểu được nguyên tắc hoạt động của nó giúp bạn nhanh chóng định vị vấn đề khi gặp phải, và giải quyết chúng một cách chính xác. Quan trọng hơn, nó giúp bạn đưa ra quyết định thông minh hơn khi thiết kế kiến trúc và chọn phụ thuộc.
:::

---

## 2. Khái niệm cốt lõi: Chuyển dịch, đóng gói, xây dựng

::: tip 🤔 Những khái niệm này liên quan gì đến xây dựng?
Chuyển dịch, đóng gói chính là các bước quan trọng trên dây chuyền sản xuất.

Khi bạn chạy `npm run build`, công cụ xây dựng sẽ lần lượt thực hiện:
1. **Kiểm tra mã** → Phát hiện lỗi
2. **Chuyển dịch** → Dịch cú pháp mới thành mã mà trình duyệt hiểu
3. **Đóng gói** → Hợp nhất các tệp riêng rẽ
4. **Tối ưu hóa** → Nén dung lượng, xóa mã không sử dụng

Vì vậy, **chuyển dịch và đóng gói là các bước quan trọng của quy trình xây dựng**. Chỉ khi hiểu rõ chúng, bạn mới biết công cụ xây dựng đang làm gì, tại sao đôi khi xây dựng chậm, tại sao đôi khi dung lượng đóng gói lại lớn.
:::

Trước khi tìm hiểu các công cụ cụ thể, chúng ta cần làm rõ các khái niệm cốt lõi này. Để giúp bạn hiểu rõ hơn, chúng ta sẽ sử dụng một so sánh nhà hàng để minh họa mối quan hệ giữa chúng.

### 2.1 Sử dụng so sánh nhà hàng để hiểu ba khái niệm

Hãy tưởng tượng bạn đang quản lý một nhà hàng, mỗi ngày phải cung cấp nhiều món ăn khác nhau cho khách hàng. Các bước liên quan trong quá trình này lại tương tự một cách đáng ngạc nhiên với ba khái niệm cốt lõi của kỹ thuật phát triển frontend:

| Khái niệm | 🍽️ So sánh nhà hàng | Tác dụng thực tế | Ví dụ cụ thể |
|------|-------------|----------|----------|
| **Chuyển dịch** | Dịch công thức nấu ăn từ tiếng Trung sang tiếng Anh, giúp đầu bếp nước ngoài cũng hiểu được | Chuyển đổi cú pháp mới thành cú pháp cũ mà trình duyệt hiểu | Bạn viết `const name = user?.name`, sau chuyển dịch thành `var name = user && user.name` |
| **Đóng gói** | Đóng gói các món ăn của các bàn khác nhau vào các hộp giao hàng riêng, tiện lợi cho giao hàng | Hợp nhất các tệp mô-đun riêng rẽ thành một vài tệp | Bạn viết 50 tệp .js, sau đóng gói thành 2 tệp |
| **Xây dựng** | Toàn bộ quy trình từ nhận đơn, nấu ăn, đóng gói đến giao hàng | Toàn bộ quy trình chuyển đổi từ mã nguồn thành mã sản xuất | Chạy `npm run build` sau đó, thư mục src biến thành thư mục dist |

### 2.2 Chuyển dịch (Transpile): "Thông dịch viên" của mã

Chuyển dịch, theo tên gọi có nghĩa là "chuyển đổi + biên dịch", tác dụng cốt lõi là chuyển đổi một ngôn ngữ lập trình (hoặc phiên bản mới của nó) thành phiên bản khác (hoặc phiên bản cũ hơn). Bạn có thể thắc mắc: tại sao phải làm vậy? Tại sao không viết trực tiếp mã mà trình duyệt hỗ trợ?

Câu trả lời nằm ở vấn đề tương thích trình duyệt. Mặc dù JavaScript phát hành phiên bản mới mỗi năm, mang theo cú pháp và API mạnh mẽ hơn, nhưng tốc độ cập nhật của trình duyệt chậm hơn rất nhiều. Nếu bạn sử dụng cú pháp ES2022 mới nhất, nó có thể không chạy được hoàn toàn trên trình duyệt cũ. Tác dụng của công cụ chuyển dịch là chuyển đổi "mã tiên tiến" của bạn thành "mã bảo thủ", đảm bảo chạy bình thường trên tất cả các trình duyệt.

::: details 🔧 Ví dụ chuyển dịch: Xem chuyển dịch đã làm gì
Hãy xem một ví dụ cụ thể. Dưới đây là mã bạn viết, sử dụng toán tử liên kết tùy chọn ES2020 và toán tử hợp nhất null:

```js
// Bạn viết (ES2020+)
const result = data?.items?.map(item => item.name) ?? []
```

Đoạn mã này rất ngắn gọn và thanh lịch, nhưng sẽ báo lỗi cú pháp trên trình duyệt cũ. Công cụ chuyển dịch sẽ chuyển nó thành mã tương đương, có tính tương thích tốt hơn:

```js
// Sau chuyển dịch (phiên bản ES5 tương thích)
var _data$items, _data$items$map
var result =
  (_data$items$map =
    (_data$items = data == null ? void 0 : data.items) == null
      ? void 0
      : _data$items.map(function (item) {
          return item.name
        })) != null
    ? _data$items$map
    : []
```

Có thể thấy, một dòng mã ngắn gọn đã được chuyển thành nhiều dòng mã "rườm rà", nhưng mã sau đó có thể chạy bình thường trên bất kỳ trình duyệt nào.
:::

**Các công cụ chuyển dịch phổ biến:**

- **Babel** là công cụ chuyển dịch JavaScript lâu đời nhất, có sinh thái phong phú nhất, gần như có thể xử lý tất cả cú pháp hiện đại. Hệ thống plugin của nó rất mạnh mẽ, nhưng cũng vì tính linh hoạt cao nên cấu hình tương đối phức tạp.
- **SWC** là công cụ chuyển dịch được viết lại bằng ngôn ngữ Rust, tốc độ nhanh hơn Babel hơn 20 lần, và ngày càng được nhiều dự án sử dụng, bao gồm các framework nổi tiếng như Next.js.
- **esbuild** được viết bằng ngôn ngữ Go, cũng nổi tiếng với tốc độ, Vite sử dụng nó để chuyển dịch nhanh ở chế độ phát triển.

::: details 🔍 Dự án của tôi sử dụng công cụ chuyển dịch nào?
Bạn không cần phải chọn chủ động, thường do scaffold của dự án quyết định:

| Loại dự án | Công cụ chuyển dịch mặc định |
|---------|-------------|
| Dự án Vite | esbuild (chế độ phát triển) + esbuild/rollup (chế độ sản xuất) |
| Create React App | Babel |
| Next.js | SWC (phiên bản mới) / Babel (phiên bản cũ) |
| Vue CLI | Babel |

Muốn biết dự án của bạn sử dụng cái gì? Mở `package.json`, tìm kiếm từ khóa `babel`, `@babel/core`. Nếu tìm thấy, có nghĩa là dùng Babel; nếu không, rất có thể là esbuild hoặc SWC.

**Thực ra bạn không cần quan tâm điều này** —các công cụ này là "trong suốt" đối với nhà phát triển, bạn chỉ cần viết mã, chúng sẽ hoạt động im lặng ở chế độ nền.
:::

### 2.3 Đóng gói (Bundle): "Nhân viên đóng gói" của mô-đun

Đóng gói có nghĩa là hợp nhất nhiều tệp mô-đun riêng rẽ thành một hoặc vài tệp. Trong phát triển frontend sớm, chúng ta thường viết tất cả mã trong một tệp JS, nhưng khi quy mô dự án tăng lên, cách làm này trở nên khó duy trì. Frontend hiện đại sử dụng phát triển mô-đun hóa, mỗi chức năng một tệp, nhưng trình duyệt tải nhiều tệp nhỏ sẽ gây ra vấn đề về hiệu suất, đó là lý do công cụ đóng gói cần giúp đỡ.

::: tip 📦 ES mô-đun là gì?
Bạn có thể đã nghe nói về từ "ES mô-đun", nhưng nó thực sự là gì?

**Trước tiên hãy phân biệt hai khái niệm**:
- **ECMAScript (ES)**：là tiêu chuẩn quy chuẩn ngôn ngữ JavaScript, định nghĩa cú pháp và API
- **ES mô-đun**：là phương án mô-đun hóa được định nghĩa trong tiêu chuẩn ECMAScript, thông qua cú pháp `import` và `export` để nhập xuất mã

Thử so sánh: ECMAScript giống như "tiêu chuẩn Tiếng Phổ thông", còn ES mô-đun giống như "một cách biểu đạt nhất định trong Tiếng Phổ thông".

```js
// utils.js - xuất mô-đun
export function add(a, b) { return a + b }
export function subtract(a, b) { return a - b }

// main.js - nhập mô-đun
import { add, subtract } from './utils.js'
console.log(add(1, 2))  // 3
```

**Kiến thức nhỏ về phiên bản ES**：ECMAScript phát hành phiên bản mới mỗi năm：
- **ES5（2009）**：phiên bản kinh điển, gần như tất cả các trình duyệt đều hỗ trợ
- **ES6/ES2015**：bản cập nhật có ý nghĩa bước ngoặt, giới thiệu `let/const`, hàm mũi tên, **ES mô-đun**, `class` vân vân
- **ES2016-ES2024**：liên tục thêm các tính năng mới mỗi năm（như `async/await`, liên kết tùy chọn `?.` vân vân)

ES mô-đun chính là được giới thiệu trong ES6（năm 2015). Trước đó, JavaScript không có hệ thống mô-đun chính thức, các nhà phát triển chỉ có thể sử dụng các "giải pháp dân gian"（như CommonJS, AMD), dẫn đến vấn đề quy chuẩn mô-đun không thống nhất. ES mô-đun thống nhất những quy chuẩn này, trở thành nền tảng của phát triển frontend hiện đại.
:::

**Tại sao cần đóng gói?** Chủ yếu có ba lý do：trước hết, mặc dù các trình duyệt hiện đại đã hỗ trợ ES mô-đun, nhưng tải hàng trăm tệp nhỏ trong môi trường sản xuất vẫn sẽ gây ra chi phí hiệu suất; thứ hai, quá trình đóng gói có thể thực hiện Tree Shaking, tự động xóa mã chưa sử dụng, giảm dung lượng tệp; cuối cùng, sau đóng gói có thể chia tách mã, thực hiện tải theo nhu cầu, cải thiện tốc độ tải trang đầu tiên.

::: details 📁 Đối chiếu trước và sau đóng gói：xem đóng gói đã làm gì
**Cấu trúc mã nguồn trước đóng gói**（các tệp riêng rẽ）：
```
src/
├── index.js          (tệp nhập, nhập các mô-đun khác)
├── utils/
│   ├── a.js          (hàm tiện ích A)
│   ├── b.js          (hàm tiện ích B)
│   └── c.js          (hàm tiện ích C)
└── components/
    └── Button.vue    (thành phần nút)
```

**Sản phẩm sau đóng gói**（các tệp sau hợp nhất）：
```
dist/
├── index.[hash].js      (mã nhập chính)
├── vendor.[hash].js     (mã thư viện bên thứ ba)
└── assets/
    └── logo.[hash].png  (tài nguyên tĩnh)
```

Công cụ đóng gói sẽ phân tích mối quan hệ phụ thuộc giữa các tệp, hợp nhất chúng theo thứ tự chính xác, đồng thời thực hiện các tối ưu hóa khác nhau.
:::

👇 **Thử thực hành**：
Bản demo dưới đây cho thấy cách chia tách mã thực hiện tải theo nhu cầu. Nhấp vào các định tuyến khác nhau, quan sát xem mã nào được tải：

<CodeSplittingDemo />

### 2.4 Xây dựng (Build): "Dây chuyền sản xuất" hoàn chỉnh

Xây dựng là một khái niệm rộng hơn, bao gồm toàn bộ quá trình chuyển đổi từ mã nguồn thành sản phẩm có thể triển khai. Một quy trình xây dựng hoàn chỉnh thường bao gồm các bước sau：

1. **Giai đoạn tiền biên dịch**：biên dịch TypeScript thành JavaScript, biên dịch Sass thành CSS
2. **Giai đoạn kiểm tra mã**：chạy ESLint để kiểm tra quy chuẩn mã, chạy kiểm tra kiểu TypeScript
3. **Giai đoạn phân tích phụ thuộc**：phân tích mối quan hệ phụ thuộc giữa các mô-đun, xây dựng biểu đồ phụ thuộc

👇 **Thử thực hành**：
Bản demo dưới đây cho thấy biểu đồ mối quan hệ phụ thuộc giữa các mô-đun trong dự án. Nhấp vào các nút khác nhau, quan sát cách các mô-đun tham chiếu lẫn nhau：

<DependencyGraphDemo />

4. **Giai đoạn chuyển dịch**：sử dụng Babel và các công cụ khác để chuyển đổi cú pháp, đảm bảo tính tương thích
5. **Giai đoạn đóng gói**：hợp nhất các tệp mô-đun, áp dụng Tree Shaking để xóa mã vô dụng
6. **Giai đoạn tối ưu hóa**：nén mã, chia tách mã, trích xuất mô-đun chung
7. **Giai đoạn xử lý tài nguyên**：nén hình ảnh, tạo sprite, xử lý tệp phông chữ
8. **Giai đoạn tạo sản phẩm**：xuất tệp cuối cùng vào thư mục dist

Hiểu được quy trình hoàn chỉnh này rất quan trọng, bởi vì khi xây dựng gặp vấn đề, bạn cần biết vấn đề nằm ở bước nào, mới có thể giải quyết vấn đề một cách có mục tiêu.

---

## 3. Thực tế：đường phát triển kỹ thuật hóa của một đội nhóm

::: tip 🤔 "Kỹ thuật hóa" là gì?
Đã nói về "kỹ thuật hóa" rất nhiều, nhưng nó thực sự là gì?

**Nói đơn giản, kỹ thuật hóa là quá trình biến "xưởng thủ công" thành "nhà máy hiện đại".**

Tưởng tượng bạn đang nấu ăn ở nhà, muốn ăn gì thì nấu gì, rất tự do. Nhưng nếu mở một nhà hàng, mỗi ngày phục vụ hàng trăm khách hàng, bạn không thể "làm gì thì làm gì" nữa —bạn cần công thức nấu ăn tiêu chuẩn, quy trình hoạt động quy chuẩn, mua nguyên liệu thống nhất, như vậy mới đảm bảo mỗi món ăn có chất lượng ổn định, tốc độ phục vụ nhanh.

Phát triển frontend cũng vậy. Một người viết dự án nhỏ, viết cách nào cũng được. Nhưng khi hợp tác trong đội nhóm, dự án phát triển lớn hơn, bạn cần：
- **Quy chuẩn mã thống nhất**：mọi người đều viết mã theo cùng một cách
- **Công cụ tự động hóa**：cho máy giúp chúng ta kiểm tra lỗi, chuyển đổi mã, đóng gói tệp
- **Quy trình tiêu chuẩn hóa**：từ phát triển đến trực tuyến có một tập các bước rõ ràng

**Đây chính là kỹ thuật hóa：sử dụng công cụ và quy chuẩn, làm cho phát triển hiệu quả hơn, mã đáng tin cậy hơn, hợp tác suôn sẻ hơn.**
:::

Đã nói rất nhiều khái niệm, hãy xem một trường hợp thực tế：một công ty khởi nghiệp đã phát triển từ "viết HTML trực tiếp" sang "quy trình kỹ thuật hóa hiện đại" như thế nào. Thông qua trường hợp này, bạn sẽ hiểu rõ hơn về kỹ thuật hóa thực sự giải quyết vấn đề nào.

::: tip 📖 Kiến thức nền：jQuery, Vue, React là gì?
Trước khi bắt đầu trường hợp, trước tiên hãy giới thiệu ngắn gọn các thuật ngữ này：

- **jQuery**：thư viện JavaScript phổ biến nhất mười mấy năm trước, sử dụng để đơn giản hóa các hoạt động DOM（chẳng hạn như "nhấp nút sau đó thay đổi văn bản"). Bây giờ đã được Vue, React và các framework hiện đại khác thay thế, nhưng nhiều dự án cũ vẫn sử dụng.
- **Vue / React**：framework phát triển frontend chủ yếu hiện đại. Chúng cho phép bạn sử dụng cách "thành phần" để tổ chức mã, dữ liệu và giao diện tự động đồng bộ, hiệu suất phát triển cao hơn. Bạn hiện tại có thể đang học một trong những cái này.

**Hiểu đơn giản**：jQuery là "hộp số thủ công", bạn phải tự vận hành mỗi thành phần; Vue/React là "hộp số tự động", bạn chỉ cần cho nó biết dữ liệu là gì, nó sẽ tự động cập nhật giao diện.
:::

### 3.1 Toàn cảnh sự phát triển

::: tip 🤔 Scaffold là gì?
Scaffold là công cụ giúp bạn "xây dựng khung dự án". Ví dụ như `npm create vite@latest` sẽ tự động tạo một dự án được cấu hình sẵn, bên trong có cấu trúc thư mục, tệp cấu hình, mã ví dụ, bạn có thể bắt đầu viết mã kinh doanh ngay.

**Thời đại không có scaffold**：bạn phải tạo thư mục, viết tệp cấu hình, cài đặt phụ thuộc...việc xây dựng một dự án có thể mất nửa ngày.
**Thời đại có scaffold**：một dòng lệnh, 30 giây xong.
:::

Bảng dưới đây cho thấy bốn giai đoạn của sự phát triển kỹ thuật hóa, bạn có thể thấy cách các công cụ xây dựng, scaffold, framework phát triển từng bước：

| Giai đoạn | Công cụ xây dựng | Scaffold | Framework | Thay đổi cốt lõi |
|------|---------|--------|------|----------|
| **Giai đoạn một：Thời đại nguyên thủy** | Không có (chạy trực tiếp) | Không có (tạo tệp thủ công) | jQuery | Không có công cụ nào, hoàn toàn thủ công |
| **Giai đoạn hai：Mô-đun hóa** | Webpack + Babel | Sao chép mẫu đơn giản | Vue 2 / React | Bắt đầu có quy trình xây dựng, nhưng cấu hình rất rắc rối |
| **Giai đoạn ba：Hiện đại hóa** | Vite | create-vite / create-react-app | Vue 3 / React 18 | Sạn sàng sử dụng, khởi động zero config |
| **Giai đoạn bốn：Tối ưu hóa liên tục** | Vite + plugin | Mẫu scaffold tùy chỉnh | Framework + TypeScript | Tiêu chuẩn hóa nhóm, mẫu hóa |

::: tip 📊 Bạn có thể thấy gì từ bảng này?
Hãy giải thích từng dòng của bảng này：

**Giai đoạn một → Giai đoạn hai**：từ "không có công cụ" thành "có công cụ". Đây là bước tiến về chất lượng —bạn bắt đầu sử dụng công cụ xây dựng để xử lý mã, sử dụng framework để tổ chức dự án. Nhưng giá phải trả là cấu hình phức tạp, khó khăn khi bắt đầu.

**Giai đoạn hai → Giai đoạn ba**：từ "dùng được" thành "dùng tốt". Vite tự động hóa những thứ cần cấu hình thủ công trước đây, scaffold tạo dự án bằng một lệnh, trải nghiệm phát triển được cải thiện đáng kể. Bạn hiện tại có thể ở giai đoạn này.

**Giai đoạn ba → Giai đoạn bốn**：từ "tốt cho cá nhân" thành "hiệu quả cho nhóm". Khi nhóm phát triển lớn hơn, cần một stack công nghệ thống nhất và quy chuẩn, lúc này sẽ tùy chỉnh mẫu scaffold, giúp tất cả các dự án giữ lại một phong cách nhất quán.

**Tóm lại**：sự phát triển kỹ thuật hóa không chỉ là "công cụ xây dựng nhanh hơn", mà là **nâng cấp toàn bộ trải nghiệm phát triển** —từ xây dựng dự án thủ công sang tạo dự án bằng scaffold một lệnh, từ cấu hình phức tạp sang sạn sàng sử dụng, từ hoạt động riêng lẻ sang quy chuẩn nhóm.
:::

### 3.2 Giai đoạn một：Thời đại nguyên thủy —phụ thuộc hoàn toàn vào thủ công

Tại sao gọi là "thời đại nguyên thủy"? Bởi vì giai đoạn này không có bất kỳ công cụ tự động hóa nào, mọi việc phải làm thủ công —tạo thư mục, viết mã, quản lý phụ thuộc, gỡ lỗi vấn đề, hoàn toàn do con người.

Ở giai đoạn này, đội nhóm chỉ có 3 kỹ sư frontend, làm một dự án quản lý sau. Dự án rất nhỏ, mọi người viết riêng, có vẻ không có vấn đề gì. Nhưng khi dự án phát triển lớn hơn, các vấn đề bắt đầu phơi bày ra.

**Phương cách phát triển**：
- **Công cụ xây dựng**：không có, viết trực tiếp HTML/JS/CSS, trình duyệt chạy trực tiếp
- **Scaffold**：không có, tạo thư mục và tệp thủ công
- **Framework**：jQuery, sử dụng bộ chọn để vận hành DOM

**Đặc điểm của giai đoạn này**：
- ✅ **Ưu điểm**：đơn giản trực tiếp, không chi phí học tập, viết xong có thể chạy
- ❌ **Nhược điểm**：khi mã nhiều lên thì lộn xộn, hợp tác nhóm khó khăn, không kiểm tra mã dễ phát sinh lỗi

::: details Xem cấu trúc dự án và cách viết mã lúc đó
**Cấu trúc dự án**（tạo thủ công）：
```
project/
├── index.html
├── login.html
├── css/
│   ├── bootstrap.css
│   └── custom.css
├── js/
│   ├── jquery.js
│   ├── bootstrap.js
│   └── app.js
└── images/
```

**Vấn đề gặp phải**：
1. **Ô nhiễm biến toàn cục**：tất cả các biến đều trong không gian tên toàn cục, các biến cùng tên trong các tệp khác nhau sẽ ghi đè lẫn nhau
2. **Quản lý phụ thuộc lộn xộn**：plugin jQuery phải tải jQuery trước, thứ tự thẻ script sai là báo lỗi
3. **Mã khó tái sử dụng**：muốn tái sử dụng một chức năng nào đó, chỉ có thể sao chép dán mã
4. **Không kiểm tra mã**：lỗi chính tả biến vân vân, chỉ phát hiện khi chạy

**Giải pháp tạm thời lúc đó**：
```js
// Sử dụng hàm tự thực hiện để mô phỏng mô-đun hóa (mô hình IIFE)
var ModuleA = (function () {
  var privateVar = 'private'  // biến riêng, không thể truy cập từ bên ngoài

  function privateFn() {
    console.log(privateVar)
  }

  return {
    publicMethod: function () {
      privateFn()  // phơi bày phương thức công khai
    }
  }
})()

// Quản lý phụ thuộc hoàn toàn dựa vào ghi chú
/**
 * @requires jquery.js (must load first)
 * @requires bootstrap.js
 */
```
:::

Phương cách phát triển này vẫn có thể ứng phó được các dự án nhỏ, nhưng khi đội nhóm phát triển lên 8 người, dự án trở nên ngày càng phức tạp, những vấn đề này bắt đầu ảnh hưởng nghiêm trọng đến hiệu suất phát triển và chất lượng mã, đội nhóm cấp bách cần một cách tổ chức tốt hơn.

### 3.3 Giai đoạn hai：Thời đại mô-đun hóa —bắt đầu có công cụ

Các vấn đề của thời đại nguyên thủy tích lũy đến một mức độ nào đó, đội nhóm cuối cùng quyết định giới thiệu chuỗi công cụ hiện đại. Đây là một điểm chuyển biến quan trọng —từ "lao động thủ công" sang "sản xuất máy hóa".

Nhưng giai đoạn này cũng có chi phí：chi phí học tập của chuỗi công cụ rất cao, tệp cấu hình phức tạp, bắt đầu cần thời gian.

**Phương cách phát triển**：
- **Công cụ xây dựng**：Webpack + Babel, cần viết tệp cấu hình
- **Scaffold**：sao chép mẫu dự án cũ, sửa cấu hình thủ công
- **Framework**：Vue 2 / React, phát triển theo thành phần

**Đặc điểm của giai đoạn này**：
- ✅ **Ưu điểm**：phát triển mô-đun hóa, khả năng bảo trì mã cải thiện đáng kể, có kiểm tra mã
- ❌ **Nhược điểm**：cấu hình phức tạp, khởi động chậm, scaffold thô sơ dễ phát sinh lỗi

::: details Xem các thay đổi sau giới thiệu chuỗi công cụ
**Cấu trúc dự án**（Webpack + Vue 2 thời đại）：
```
my-project/
├── build/               # cấu hình xây dựng (giai đoạn này cấu hình rất phức tạp!)
│   ├── webpack.base.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── config/              # cấu hình môi trường
│   ├── index.js
│   ├── dev.env.js
│   └── prod.env.js
├── src/
│   ├── components/      # thành phần
│   ├── views/           # trang
│   ├── router/          # định tuyến
│   ├── store/           # quản lý trạng thái
│   ├── App.vue
│   └── main.js
├── static/              # tài nguyên tĩnh
├── .eslintrc.js         # cấu hình ESLint
├── .babelrc             # cấu hình Babel
├── package.json
└── index.html
```

**Ví dụ tệp cấu hình**（đây là lý do tại sao nói "cấu hình phức tạp"）：
```js
// webpack.base.js - chỉ là cấu hình cơ bản đã có quá nhiều nội dung
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader', options: { limit: 8192 } }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: { '@': path.resolve(__dirname, '../src') }
  }
}
```

**Sự cải thiện mang lại**：
1. **Phát triển mô-đun hóa**：mỗi tệp là một mô-đun, thông qua import/export quản lý rõ ràng mối quan hệ phụ thuộc
2. **Tái sử dụng mã**：thành phần và hàm tiện ích có thể tái sử dụng giữa các dự án khác nhau, không cần sao chép dán
3. **Chất lượng mã**：ESLint tự động kiểm tra khi lưu, TypeScript phát hiện lỗi kiểu lúc biên dịch
4. **Tối ưu hóa hiệu suất**：chia tách mã và tải lười lối của Webpack làm cho tốc độ tải trang đầu tiên cải thiện đáng kể

**Vấn đề mới**：
1. **Cấu hình phức tạp**：webpack.config.js dễ dàng vài trăm dòng, bắt đầu rất khó
2. **Khởi động chậm**：khởi động lạnh hơn 30 giây, sửa mã cập nhật nóng phải chờ 5 giây
3. **Scaffold thô sơ**：sao chép mẫu dự án cũ, dễ quên sửa cấu hình, dẫn đến các vấn đề kỳ quặc
:::

### 3.4 Giai đoạn ba：Thời đại hiện đại —sạn sàng sử dụng

Vấn đề ở giai đoạn hai（cấu hình phức tạp, khởi động chậm）đã làm phiền lập trình viên rất lâu. Cho đến năm 2021, sự xuất hiện của Vite đã hoàn toàn thay đổi tình hình này.

Triết lý cốt lõi của Vite là "quy ước thắng hơn cấu hình" —nó có cấu hình mặc định hợp lý được tích hợp sẵn, bạn không cần viết cấu hình tệp vài trăm dòng, sạn sàng sử dụng. Giống như từ "tự lắp ráp máy tính" chuyển sang "mua máy tính thương mại", tiết kiệm rất nhiều thời gian tùy chỉnh.

Sau năm 2021, đội nhóm bắt đầu sử dụng Vite thay thế Webpack, trải nghiệm phát triển nhận được nâng cấp về chất.

**Phương cách phát triển**：
- **Công cụ xây dựng**：Vite, zero config khởi động, cập nhật nóng hàng giây
- **Scaffold**：`npm create vite@latest`, tạo dự án bằng một lệnh
- **Framework**：Vue 3 / React 18, hệ thống thành phần mạnh hơn

**Đặc điểm của giai đoạn này**：
- ✅ **Ưu điểm**：khởi động hàng giây, cập nhật nóng cực nhanh, cấu hình đơn giản, thân thiện với bắt đầu
- ❌ **Nhược điểm**：sinh thái vẫn đang hoàn thiện, một số nhu cầu đặc biệt có thể cần cấu hình bổ sung

::: details Các thay đổi mà Vite mang lại
**Cấu trúc dự án**（Vite + Vue 3 thời đại）：
```
my-project/
├── src/
│   ├── components/      # thành phần
│   ├── views/           # trang
│   ├── router/          # định tuyến
│   ├── stores/          # quản lý trạng thái (Pinia)
│   ├── assets/          # tài nguyên tĩnh
│   ├── App.vue
│   └── main.js
├── public/              # tài nguyên công cộng
├── vite.config.js       # tệp cấu hình (ngắn gọn!)
├── package.json
└── index.html
```

**So sánh tệp cấu hình**（cấu hình Vite có bao ngắn gọn）：
```js
// vite.config.js - toàn bộ tệp cấu hình chỉ có chút chút này
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': '/src' }
  }
})
// So với cấu hình Webpack ở trên, có ngắn gọn hơn rất nhiều không?
```

| Mục đối chiếu | Giai đoạn hai (Webpack) | Giai đoạn ba (Vite) | Cải thiện trải nghiệm |
|--------|---------|------|------|
| Tạo dự án | Sao chép mẫu, sửa cấu hình thủ công | `npm create vite@latest` | 30 giây xong |
| Khởi động lạnh | 30s+ | <1s | **Nhanh 30 lần** |
| Cập nhật nóng | 3-5s | <100ms | **Nhanh 30 lần** |
| Tệp cấu hình | Vài trăm dòng | Vài chục dòng hoặc không cần | **Đơn giản hóa đáng kể** |

**So sánh trải nghiệm thực tế**：
```bash
# Giai đoạn hai：sử dụng Webpack
npm run dev
# Chờ 30 giây...uống café trở lại vẫn đang biên dịch
# [INFO] Compiled successfully in 30123ms
# Sửa mã -> lưu -> chờ 5 giây -> cuối cùng thấy hiệu quả

# Giai đoạn ba：sử dụng Vite
npm create vite@latest my-project  # tạo dự án bằng một lệnh
cd my-project && npm install
npm run dev
# Chờ 300 mili giây...chưa kịp phản ứng đã xong
# [INFO] ready in 312ms
# Sửa mã -> lưu -> ngay lập tức thấy hiệu quả
```
:::

### 3.5 Giai đoạn bốn：Tối ưu hóa liên tục —tiêu chuẩn hóa nhóm

Khi chuỗi công cụ trưởng thành, đội nhóm bắt đầu quan tâm đến những vấn đề sâu hơn：làm cách nào để hợp tác nhóm hiệu quả hơn? Làm cách nào để tránh lặp lại sai lầm? Làm cách nào để thống nhất phong cách mã?

Giai đoạn này tập trung vào "tiêu chuẩn hóa" —không chỉ công cụ tốt, mà còn giúp tất cả mọi người trong đội làm việc theo cùng một cách.

**Phương cách phát triển**：
- **Công cụ xây dựng**：Vite + plugin tùy chỉnh, thích ứng với nhu cầu đặc biệt của nhóm
- **Scaffold**：mẫu scaffold nội bộ của nhóm, thống nhất stack công nghệ và quy chuẩn
- **Framework**：Vue 3 / React 18 + TypeScript, an toàn kiểu

**Đặc điểm của giai đoạn này**：
- ✅ **Ưu điểm**：hợp tác nhóm hiệu quả, phong cách mã thống nhất, bắt đầu mới có mẫu để theo
- ❌ **Nhược điểm**：cần đầu tư thời gian duy trì scaffold và quy chuẩn, có chi phí duy trì nhất định

**Giai đoạn này sẽ làm gì?**
1. **Tùy chỉnh mẫu scaffold**：đóng gói các cấu hình thường dùng của nhóm, cấu trúc thư mục, thành phần chung thành mẫu, tạo dự án mới bằng một lệnh
2. **Giới thiệu TypeScript**：giúp mã có kiểm tra kiểu, giảm lỗi thời gian chạy
3. **Thiết lập quy chuẩn mã**：quy tắc ESLint, quy chuẩn cam kết Git, quy trình xem xét mã
4. **Tích hợp/Triển khai liên tục (CI/CD)**：sau khi gửi mã tự động kiểm tra, tự động triển khai

::: details Cấu trúc dự án của giai đoạn tiêu chuẩn hóa nhóm
**Cấu trúc dự án**（mẫu nội bộ của nhóm + TypeScript）：
```
my-project/
├── .husky/              # Git hooks (tự động kiểm tra trước cam kết)
├── src/
│   ├── components/      # thành phần
│   ├── views/           # trang
│   ├── router/          # định tuyến
│   ├── stores/          # quản lý trạng thái
│   ├── api/             # giao diện API
│   ├── utils/           # hàm tiện ích
│   ├── types/           # định nghĩa kiểu TypeScript
│   ├── assets/          # tài nguyên tĩnh
│   ├── App.vue
│   └── main.ts          # lưu ý là .ts chứ không phải .js
├── public/
├── .eslintrc.cjs        # cấu hình ESLint (quy tắc thống nhất nhóm)
├── .prettierrc          # cấu hình Prettier (định dạng mã)
├── tsconfig.json        # cấu hình TypeScript
├── vite.config.ts       # cấu hình Vite
├── package.json
└── README.md            # tài liệu dự án
```

**Biểu hiện cụ thể của tiêu chuẩn hóa nhóm**：
```js
// tsconfig.json - cấu hình TypeScript, an toàn kiểu
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,           // bật chế độ nghiêm ngặt
    "noImplicitAny": true,    // cấm any ẩn
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}

// .eslintrc.cjs - quy chuẩn mã thống nhất của nhóm
module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  rules: {
    'no-console': 'warn',     // cấm console.log
    'no-debugger': 'error',   // cấm debugger
    'vue/multi-word-component-names': 'error'  // tên thành phần phải là nhiều từ
  }
}
```

**Sai lầm phổ biến và giải pháp**：

**Sai lầm một：nhập toàn bộ thư viện thay vì nhập theo nhu cầu**

Đây là lỗi phổ biến nhất. Nhiều khi chúng ta chỉ cần một hàm nào đó từ thư viện, nhưng không cẩn thận nhập toàn bộ thư viện.

```js
// ❌ Cách sai：nhập toàn bộ moment.js (2.5MB!)
import moment from 'moment'
const formattedDate = moment(date).format('YYYY-MM-DD')

// ✅ Cách đúng：sử dụng dayjs nhẹ hơn (2KB)
import dayjs from 'dayjs'
const formattedDate = dayjs(date).format('YYYY-MM-DD')

// Hoặc nhập theo nhu cầu hàm từ date-fns
import { format } from 'date-fns'
const formattedDate = format(date, 'yyyy-MM-dd')
```

**Sai lầm hai：Tree Shaking không hiệu lực**

Tree Shaking là tính năng công cụ đóng gói tự động xóa mã chưa sử dụng, nhưng nó cần cách nhập đúng mới có thể hoạt động.

```js
// ❌ Cách sai：sẽ nhập toàn bộ lodash (70KB+)
import _ from 'lodash'
_.debounce(fn, 200)

// ✅ Cách đúng：chỉ nhập hàm cần thiết
import debounce from 'lodash/debounce'

// Hoặc sử dụng lodash-es (phiên bản mô-đun ES, hỗ trợ Tree Shaking)
import { debounce } from 'lodash-es'
```

👇 **Thử thực hành**：
Bản demo dưới đây cho thấy cách Tree Shaking hoạt động. Chọn hàm bạn cần, quan sát sự thay đổi dung lượng đóng gói：

<TreeShakingDemo />

**Sai lầm ba：không sử dụng Hash tệp, dẫn đến vấn đề bộ nhớ đệm**

Trình duyệt sẽ bộ nhớ đệm tài nguyên tĩnh để cải thiện tốc độ tải, nhưng nếu tên tệp không thay đổi, sau khi cập nhật mã, người dùng có thể vẫn sử dụng phiên bản cũ.

```js
// ❌ Vấn đề：tên tệp cố định, người dùng bộ nhớ đệm phiên bản cũ
// <script src="/js/app.js"></script>

// ✅ Cách đúng：sử dụng content hash
// Vite/Webpack tự động xử lý：
// <script src="/js/app.a3f7b2c.js"></script>
// Khi nội dung thay đổi hash cũng thay đổi, trình duyệt tự động lấy phiên bản mới
```
:::

---

## 4. Nguyên tắc sâu：Tại sao Vite lại nhanh như vậy?

Sau khi hiểu được trường hợp thực tế, hãy tìm hiểu sâu về nguyên tắc hoạt động của Vite, hiểu tại sao nó lại nhanh hơn các công cụ truyền thống rất nhiều.

<BundlerComparisonDemo />

### 4.1 Hai cách hoạt động hoàn toàn khác nhau

Phương cách hoạt động của công cụ đóng gói truyền thống（như Webpack）là "đóng gói trước rồi phục vụ"：trước khi khởi động máy chủ phát triển, nó phải trước hết đóng gói tất cả các mô-đun của toàn bộ ứng dụng thành một hoặc vài tệp bundle. Trong quá trình này cần duyệt tất cả tệp nguồn, phân tích mối quan hệ phụ thuộc, chuyển đổi mã, hợp nhất tệp, dự án càng lớn, quá trình này càng lâu.

```
Quy trình công cụ đóng gói truyền thống：

Mã nguồn (100+ tệp)
    ↓
[Đóng gói tất cả ở thời điểm xây dựng] ← Bước này rất tốn thời gian!
    ↓
Bundle (một hoặc vài tệp lớn)
    ↓
Trình duyệt yêu cầu → trả về tệp đã đóng gói
```

Phương cách hoạt động của Vite hoàn toàn khác, nó sử dụng chiến lược "biên dịch theo nhu cầu"：khi khởi động, hầu như không làm bất kỳ công việc đóng gói nào, khởi động máy chủ phát triển trực tiếp. Khi trình duyệt yêu cầu một mô-đun nào đó, Vite mới biên dịch mô-đun này và trả về.

```
Quy trình của Vite：

Mã nguồn (100+ tệp)
    ↓
[Không đóng gói! Khởi động máy chủ trực tiếp] ← Gần như ngay lập tức
    ↓
Trình duyệt yêu cầu index.html
    ↓
Trình duyệt phát hiện <script type="module">, tiếp tục yêu cầu tệp JS
    ↓
Vite biên dịch theo nhu cầu mô-đun được yêu cầu → trả về mã đã biên dịch
    ↓
Trình duyệt tải theo nhu cầu, chỉ yêu cầu những cái được sử dụng
```

### 4.2 Ba thời điểm quan trọng của quy trình hoạt động của Vite

**Lúc khởi động：khởi động lạnh hàng giây**

Vite khởi động chỉ làm hai việc：khởi động một máy chủ tệp tĩnh, xử lý trước một số thông tin phụ thuộc. Nó không cần đóng gói, không cần biên dịch tất cả tệp, vì vậy gần như ngay lập tức có thể khởi động xong.

**Lúc yêu cầu：biên dịch theo nhu cầu**

Khi trình duyệt thông qua `<script type="module">` yêu cầu tệp JavaScript, Vite sẽ chặn yêu cầu này, biên dịch mã theo thời gian thực rồi trả về. Nó sẽ chuyển TypeScript thành JavaScript, chia tệp thành thành phần duy nhất Vue thành template/script/style, biên dịch bộ tiền xử lý CSS thành CSS thuần túy.

**Lúc sửa：cập nhật nóng cực nhanh**

Khi bạn sửa mã và lưu, Vite sẽ thông báo cho trình duyệt thông qua WebSocket, chỉ cập nhật mô-đun có thay đổi, chứ không làm tươi lại toàn bộ trang. Vì hạt độ mô-đun rất nhỏ（một tệp chính là một mô-đun), tốc độ cập nhật rất nhanh, thường dưới 100 mili giây.

👇 **Thử thực hành**：
Bản demo dưới đây so sánh sự khác nhau giữa làm tươi lại truyền thống và cập nhật nóng HMR：

<HotReloadDemo />

::: tip 💡 Tại sao môi trường sản xuất vẫn phải đóng gói?
Bạn có thể hỏi：vì không đóng gói nhanh như vậy, tại sao môi trường sản xuất vẫn phải đóng gói? Có vài lý do：trước hết, mặc dù HTTP/2 hỗ trợ đa điểm, nhưng tải nhiều tệp nhỏ vẫn có chi phí hiệu suất; thứ hai, quá trình đóng gói có thể thực hiện tối ưu hóa tích cực hơn, chẳng hạn như nén mã, nâng độ phạm vi, Tree Shaking triệt để hơn; cuối cùng, sau đóng gói có thể thực hiện chiến lược bộ nhớ đệm tốt hơn và phân phối CDN. Vì vậy Vite sử dụng Rollup để đóng gói khi xây dựng sản xuất.
:::

---

## 5. Loader và Plugin của Webpack

Mặc dù Vite ngày càng phổ biến, nhưng nhiều dự án cũ vẫn sử dụng Webpack, và thiết kế tư tưởng của Webpack rất có ích cho hiểu các công cụ xây dựng. Nếu bạn cần duy trì dự án sử dụng Webpack, hiểu hai khái niệm cốt lõi —Loader và Plugin —là bắt buộc.

### 5.1 Loader：bộ biến đổi tệp

Triết lý cốt lõi của Webpack là "mọi thứ đều là mô-đun", nhưng Webpack chỉ hiểu JavaScript. Tác dụng của Loader là chuyển đổi các loại tệp khác thành mô-đun JavaScript mà Webpack có thể xử lý.

Ví dụ, khi bạn import một tệp `.vue`, `vue-loader` sẽ chuyển nó thành đối tượng thành phần JavaScript; khi bạn import một tệp `.scss`, `sass-loader` sẽ biên dịch nó thành CSS, sau đó `css-loader` phân tích các `@import` và `url()` trong đó, cuối cùng `style-loader` tiêm CSS vào thẻ `<style>` của trang.

### 5.2 Plugin：bộ mở rộng chức năng

Khả năng của Plugin mạnh hơn Loader, nó có thể truy cập toàn bộ vòng đời xây dựng của Webpack, thực hiện logic tùy chỉnh ở các giai đoạn khác nhau. Ví dụ, `HtmlWebpackPlugin` có thể tự động tạo tệp HTML và tiêm tham chiếu tài nguyên sau đóng gói; `MiniCssExtractPlugin` có thể trích xuất CSS thành tệp độc lập thay vì nhúng trong JS; `BundleAnalyzerPlugin` có thể phân tích thành phần tệp sau đóng gói, giúp bạn tìm ra các mô-đun có dung lượng quá lớn.

### 5.3 Khác biệt giữa Loader và Plugin

| Mục đối chiếu | Loader | Plugin |
|--------|--------|--------|
| **Trách nhiệm cốt lõi** | Biến đổi tệp, chuyển tệp không-JS thành mô-đun JS | Mở rộng chức năng, can thiệp các giai đoạn khác nhau của quy trình xây dựng |
| **Thời điểm thực hiện** | Thực hiện khi tải mô-đun, nhắm vào từng tệp riêng lẻ | Xuyên suốt toàn bộ vòng đời xây dựng, có thể lắng nghe các sự kiện khác nhau |
| **Vị trí cấu hình** | Cấu hình trong mảng `module.rules` | Tạo instance trong mảng `plugins` |
| **Ví dụ điển hình** | `babel-loader`、`vue-loader`、`sass-loader` | `HtmlWebpackPlugin`、`MiniCssExtractPlugin` |

---

## 6. Mẫu cấu hình Vite

Lý thuyết đã nói đủ, dưới đây là mẫu cấu hình Vite có thể sử dụng trực tiếp, bao gồm hầu hết các chức năng thường dùng mà các dự án cần. Bạn có thể xóa bớt và điều chỉnh theo nhu cầu dự án của mình.

::: details Nhấp để xem cấu hình đầy đủ

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => ({
  // cấu hình đường dẫn cơ bản
  base: './',  // đường dẫn cơ bản khi triển khai, đường dẫn tương đối linh hoạt hơn

  // bí danh đường dẫn, giúp import ngắn gọn hơn
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@api': resolve(__dirname, 'src/api')
    }
  },

  // cấu hình CSS
  css: {
    preprocessorOptions: {
      scss: {
        // tự động nhập biến phong cách toàn cục
        additionalData: `@use "@/styles/vars.scss" as *;`
      }
    }
  },

  // cấu hình máy chủ phát triển
  server: {
    port: 3000,           // số cổng
    open: true,           // tự động mở trình duyệt
    cors: true,           // cho phép đa nguồn
    // cấu hình ủy quyền API, giải quyết vấn đề đa nguồn ở môi trường phát triển
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  // cấu hình xây dựng
  build: {
    outDir: 'dist',
    sourcemap: mode !== 'production',  // môi trường sản xuất không tạo sourcemap

    // cấu hình Rollup：
    rollupOptions: {
      output: {
        // chiến lược chia tách mã：đóng gói các phụ thuộc loại khác nhau vào các tệp khác nhau
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['element-plus'],
          'utils-vendor': ['lodash-es', 'axios', 'dayjs']
        },
        // quy tắc đặt tên tệp
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            return 'img/[name]-[hash][extname]'
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return 'fonts/[name]-[hash][extname]'
          }
          return '[ext]/[name]-[hash][extname]'
        }
      }
    },

    // cấu hình nén mã
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,   // xóa console
        drop_debugger: true   // xóa debugger
      }
    },

    // chunk lớn hơn 500KB sẽ kích hoạt cảnh báo
    chunkSizeWarningLimit: 500
  },

  // cấu hình plugin
  plugins: [
    vue()  // hỗ trợ Vue 3
  ]
}))
```

:::

Cấu hình này bao gồm nhu cầu chính của phát triển hàng ngày：bí danh đường dẫn giúp lệnh import ngắn gọn hơn, ủy quyền máy chủ phát triển giải quyết vấn đề đa nguồn, chiến lược chia tách mã tối ưu hóa hiệu suất tải, cấu hình nén xóa mã gỡ lỗi.

---

## 6.1 SourceMap：chiếc chìa khóa bí mật để gỡ lỗi mã nén

Bạn có thể đã nhận ý tùy chọn `sourcemap` trong cấu hình. SourceMap là gì? Tại sao nó lại quan trọng như vậy?

Ở môi trường sản xuất, mã của chúng ta sẽ bị nén, hợp nhất, chuyển dịch, cuối cùng trở thành một "kinh thánh" khó đọc. Khi mã gặp lỗi, trình duyệt chỉ có thể cho bạn biết lỗi xảy ra ở dòng 1 ký tự thứ 1234 của mã nén —điều này vô dụng cho gỡ lỗi. Tác dụng của SourceMap là thiết lập mối quan hệ ánh xạ, giúp bạn vẫn thấy mã nguồn gốc trong công cụ nhà phát triển của trình duyệt.

👇 **Thử thực hành**：
Bản demo dưới đây cho thấy cách SourceMap ánh xạ mã nén quay lại mã nguồn：

<SourceMapDemo />

---

## 6.2 Chỉ dấu tài nguyên：bộ nhớ đệm dài hạn và kiểm soát phiên bản

Ở cấu hình bạn có thể nhận ý tên tệp mang `[hash]`, đây chính là chỉ dấu tài nguyên. Tác dụng của nó là thực hiện chiến lược bộ nhớ đệm dài hạn：khi nội dung tệp không thay đổi, hash cũng không thay đổi, trình duyệt có thể sử dụng trực tiếp bộ nhớ đệm; khi nội dung tệp thay đổi, hash thay đổi theo, trình duyệt tự động lấy phiên bản mới.

👇 **Thử thực hành**：
Bản demo dưới đây cho thấy cách chỉ dấu tài nguyên ảnh hưởng đến hành vi bộ nhớ đệm của trình duyệt. Nhấp vào "xây dựng lại" mô phỏng thay đổi mã, bật tắt Hash quan sát sự thay đổi của lượt trúng bộ nhớ đệm：

<AssetFingerprintDemo />


## 7. Tóm lại

Chúng ta hãy sử dụng một bảng để hồi tưởng các khái niệm cốt lõi của kỹ thuật phát triển frontend：

| Khái niệm | Giải thích một dòng | Vấn đề được giải quyết | Công cụ đại diện |
|------|-----------|-----------|----------|
| **Chuyển dịch** | "Dịch" cú pháp mới thành cú pháp cũ | Tương thích trình duyệt | Babel、SWC、esbuild |
| **Đóng gói** | Hợp nhất nhiều tệp thành ít tệp | Giảm yêu cầu, quản lý mô-đun | Webpack、Rollup、Vite |
| **Xây dựng** | Toàn bộ quy trình từ mã nguồn đến sản phẩm | Tự động hóa, tối ưu hóa | Tất cả các công cụ trên |
| **Tree Shaking** | Xóa mã chưa sử dụng | Giảm dung lượng tệp | Webpack、Rollup |
| **Code Splitting** | Chia mã thành nhiều chunk nhỏ tải theo nhu cầu | Tối ưu hóa hiệu suất trang đầu tiên | Webpack、Vite |
| **HMR** | Thay thế mô-đun nóng, không làm tươi lại | Trải nghiệm phát triển | Webpack、Vite |


::: info Viết ở cuối
Kỹ thuật phát triển frontend là một chủ đề phát triển liên tục, công cụ sẽ thay đổi, nhưng triết lý cốt lõi không đổi：**sử dụng phương tiện tự động hóa để tăng hiệu suất, đảm bảo chất lượng, tối ưu hóa hiệu suất**. Hiểu được những nguyên tắc cốt lõi này, bất kể công cụ cách nào thay đổi và phát triển, bạn đều có thể nhanh chóng làm quen, đối phó một cách tự tin.

Hy vọng bài viết này có thể giúp bạn thiết lập nhận thức tổng thể về kỹ thuật phát triển frontend. Khi bạn gặp các vấn đề liên quan đến xây dựng trong dự án thực tế, bạn có thể biết cách bắt đầu từ đâu, cách định vị, cách giải quyết.
:::
