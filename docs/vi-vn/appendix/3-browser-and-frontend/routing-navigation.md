# Định Tuyến và Điều Hướng
::: tip 🎯 Câu Hỏi Cốt Lõi
**Tại sao một số trang web chuyển trang mà không bị thoáng trắng, mượt mà như App?** Đó là phép thuật của định tuyến frontend. Chương này sẽ đưa bạn từ "cách lật trang" của website truyền thống sang thế giới "chuyển slide" của single page application, hiểu cách định tuyến frontend nâng cao trải nghiệm người dùng lên một tầm cao mới.
:::

---

## 1. Tại sao cần "định tuyến frontend"?

### 1.1 Từ website truyền thống đến single page application: Bước ngoặt trong trải nghiệm người dùng

Nhớ lại trải nghiệm duyệt web ở đầu thời kỳ, mỗi lần nhấp vào liên kết là một quá trình "lật trang hoàn chỉnh": trang bị thoáng trắng, vòng tròn tải xoay, toàn bộ trang được render lại. Nếu mạng chậm, bạn còn phải nhìn chằm chằm vào vòng tròn tải trong vài giây nữa. Trải nghiệm này giờ đã lỗi thời, nhưng hồi đó đó là cách làm tiêu chuẩn.

Phát triển frontend hiện đại đã thay đổi hoàn toàn mô hình này. Chúng tôi sử dụng công nghệ định tuyến frontend, cho phép chuyển trang như một App trên điện thoại—không có thoáng trắng, không có vòng tròn tải, người dùng hầu như không cảm thấy quá trình "chuyển hướng". Sự cải thiện trải nghiệm này không phải là phép thuật, mà là công lao của hệ thống định tuyến frontend.

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**📖 Website Truyền Thống (MPA)**
- Nhấp liên kết → Refresh toàn trang
- Mỗi trang là một tệp HTML độc lập
- Trình duyệt tải lại tất cả tài nguyên
- Trải nghiệm như "lật trang", có quá trình lật rõ ràng

</div>
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**📱 Single Page Application (SPA)**
- Nhấp liên kết → Chuyển mà không refresh
- Chỉ có một tệp HTML điểm vào
- Chỉ tải dữ liệu cần thiết
- Trải nghiệm như "chuyển slide", mượt mà tự nhiên

</div>
</div>

**Đó là vấn đề cốt lõi mà "định tuyến frontend" giải quyết: thực hiện chuyển đổi view và cập nhật URL mà không refresh trang.**

<RouteMatchingDemo />

### 1.2 Một câu chuyện thực tế về hố sâu: Tại sao bạn cần hiểu mô hình định tuyến

Bạn có thể nói: "Tôi sử dụng Vue Router hoặc React Router, cấu hình rồi dùng được, tại sao còn phải hiểu các nguyên lý dưới tầng này?" Để tôi kể một câu chuyện thực tế, bạn sẽ hiểu tại sao kiến thức này lại quan trọng.

::: warning Câu Chuyện Vấp Phải Của Tiểu Lý
Tiểu Lý là một lập trình viên frontend mới, vừa vào công ty đã được giao phát triển một single page application dựa trên Vue. Lúc phát triển ở máy tính cá nhân, mọi thứ bình thường, định tuyến chuyển mượt mà. Nhưng khi anh ấy deploy dự án lên máy chủ thử nghiệm, vấn đề xuất hiện: khi người dùng truy cập trực tiếp một tuyến đường nào đó (như `example.com/user/123`) hoặc refresh trang ở trang chi tiết, họ sẽ thấy lỗi **404 Not Found**.

Tiểu Lý bối rối: rõ ràng ở máy tính cá nhân có thể truy cập bình thường, sao lại 404 khi deploy? Anh ấy kiểm tra rất lâu, thậm chí còn nghi ngờ đó là vấn đề cấu hình máy chủ.

Sau này anh ấy hỏi sư phụ, sư phụ một mắt đã nhìn ra vấn đề: Tiểu Lý sử dụng History mode, nhưng máy chủ chưa cấu hình fallback. Khi người dùng truy cập trực tiếp `/user/123`, máy chủ sẽ tìm tệp tương ứng với đường dẫn này, nhưng tất cả các tuyến đường của SPA thực ra đều chỉ tới cùng một `index.html`. Giải pháp rất đơn giản: cấu hình máy chủ để tất cả các tuyến đường đều quay lại `index.html`, cho phép định tuyến frontend xử lý phần còn lại.

Kể từ đó Tiểu Lý hiểu rõ một bài học: **Không hiểu nguyên lý mô hình định tuyến và yêu cầu cấu hình máy chủ, bạn thậm chí còn không biết tại sao báo lỗi, chứ đừng nói tới việc giải quyết.**
:::

::: info 💡 Nhận Thức Cốt Lõi
Định tuyến frontend không phải "phép thuật đen", hiểu nguyên lý hoạt động của nó giúp bạn nhanh chóng định vị, giải quyết chính xác khi gặp vấn đề về deployment, hiệu suất, SEO. Còn quan trọng hơn, nó giúp bạn đưa ra những lựa chọn kiến trúc thông minh—khi nào dùng Hash mode, khi nào dùng History mode, cách tránh những hố sâu thường gặp.
:::

---

## 2. Khái Niệm Cốt Lõi: Định Tuyến, Mô Hình, Điều Hướng

Trước khi đi sâu vào cách cài đặt cụ thể, chúng ta cần làm rõ một vài khái niệm cốt lõi. Để giúp bạn hiểu rõ hơn, chúng tôi dùng một phép so sánh với thư viện để minh họa mối quan hệ giữa chúng.

::: tip 🤔 Những Khái Niệm Này Có Liên Quan Gì Đến Định Tuyến?
Định tuyến, mô hình, điều hướng chính là ba cột trụ của hệ thống định tuyến frontend.

Khi bạn sử dụng Vue Router hoặc React Router, framework sẽ giúp bạn xử lý:
1. **Ánh xạ định tuyến** → Xác định mối quan hệ giữa URL và component
2. **Lựa chọn mô hình** → Quyết định dùng Hash hay History mode
3. **Kiểm soát điều hướng** → Xử lý chuyển trang, nút tới/lùi

Vì vậy, **chỉ khi hiểu ba khái niệm này, bạn mới thực sự biết hệ thống định tuyến đang làm gì, tại sao đôi khi cần cấu hình đặc biệt, tại sao khi deploy lại gặp vấn đề.**
:::

### 2.1 Dùng Phép So Sánh Thư Viện Để Hiểu Hệ Thống Định Tuyến

Hãy tưởng tượng bạn đi tìm sách ở thư viện, quá trình này bất ngờ tương tự với cách hoạt động của định tuyến frontend:

| Khái Niệm | 📚 Phép So Sánh Thư Viện | Tác Dụng Thực Tế | Ví Dụ Cụ Thể |
|------|-------------|----------|----------|
| **Định Tuyến (Route)** | Mối quan hệ giữa số hiệu kệ sách và sách | Xác định ánh xạ giữa URL và component trang | `/user/123` tương ứng với component `UserDetail.vue` |
| **Bộ Định Tuyến (Router)** | Hệ thống hướng dẫn và định vị của thư viện | Quản lý tất cả định tuyến, xử lý hành vi điều hướng | Vue Router, React Router chính là bộ định tuyến |
| **Mô Hình Định Tuyến** | Phương thức lập chỉ mục (thẻ giấy vs hệ thống điện tử) | Quyết định dạng URL và phương pháp cài đặt dưới tầng | Hash mode dùng `#`, History mode dùng đường dẫn thông thường |
| **Điều Hướng** | Đi từ một kệ sách sang kệ sách khác | Hành vi chuyển đổi giữa các trang | Nhấp liên kết, điều hướng theo chương trình, nút tới/lùi trình duyệt |

::: tip 📊 Bạn Có Thể Thấy Gì Từ Bảng Này?
Hãy giải thích từng hàng:

**Định Tuyến**: Chỉ là một "cấu hình", cho hệ thống biết "URL nào tương ứng với trang nào". Giống như số hiệu sách tương ứng với vị trí của một cuốn sách ở thư viện.

**Bộ Định Tuyến**: Là "người quản lý", chịu trách nhiệm theo URL hiện tại tìm ra component tương ứng và render. Giống như thủ thư dựa vào số hiệu sách bạn cung cấp tìm cuốn sách cho bạn.

**Mô Hình Định Tuyến**: Là "phương pháp cài đặt", quyết định URL trông như thế nào, công nghệ nào được sử dụng dưới tầng. Giống như thư viện có thể dùng danh mục giấy, hoặc hệ thống truy vấn điện tử.

**Điều Hướng**: Là "hành vi", là hành động của người dùng kích hoạt chuyển đổi trang. Giống như bạn đi từ khu A sang khu B ở thư viện.

Hiểu rõ sự khác biệt của bốn khái niệm này rất quan trọng: **Định tuyến là cấu hình tĩnh, bộ định tuyến là quản lý động, mô hình là lựa chọn công nghệ, điều hướng là hành vi người dùng.**
:::

### 2.2 Định Tuyến (Route): Hợp Đồng Ánh Xạ Giữa URL và Component

Định tuyến, về bản chất là một "hợp đồng", nó quy định rằng khi truy cập một URL nhất định nên hiển thị nội dung gì. Trong Vue Router, một cấu hình định tuyến điển hình trông như vậy:

```javascript
const routes = [
  {
    path: '/',           // Đường dẫn URL
    component: Home      // Component tương ứng
  },
  {
    path: '/user/:id',   // Định tuyến động với tham số
    component: UserDetail,
    children: [          // Định tuyến lồng nhau
      { path: 'profile', component: UserProfile },
      { path: 'posts', component: UserPosts }
    ]
  }
]
```

**Bạn Có Thể Thắc Mắc: Tại Sao Không Dùng Trực Tiếp Thẻ `<a>`, Phải Dùng Định Tuyến?**

Câu trả lời nằm ở bản chất của "single page application": SPA chỉ có một trang HTML, tất cả chuyển đổi trang thực ra là thay thế component trên cùng một trang. Nếu bạn dùng `<a href="/user/123">` truyền thống, trình duyệt sẽ thực sự gửi yêu cầu `/user/123` này, dẫn đến trang refresh hoặc lỗi 404. Tác dụng của định tuyến là chặn những hành vi chuyển hướng này, dùng JavaScript thay thế component một cách động, từ đó thực hiện chuyển đổi mà không refresh.

::: details 🔧 Một Số Mô Hình Cấu Hình Định Tuyến Thường Gặp
**Định tuyến tĩnh** (đơn giản nhất):
```javascript
{ path: '/home', component: Home }
{ path: '/about', component: About }
```

**Định tuyến động** (có tham số):
```javascript
{ path: '/user/:id', component: UserDetail }
// Có thể khớp /user/123, /user/abc, v.v.
// Component có thể lấy tham số qua route.params.id
```

**Định tuyến lồng nhau** (mối quan hệ cha-con):
```javascript
{
  path: '/user/:id',
  component: UserLayout,    // Component cha
  children: [
    { path: 'profile', component: UserProfile },   // Đường dẫn thực tế /user/:id/profile
    { path: 'posts', component: UserPosts }        // Đường dẫn thực tế /user/:id/posts
  ]
}
```

**Định tuyến ký tự đại diện** (trang 404):
```javascript
{ path: '/:pathMatch(.*)*', component: NotFound }
// Khớp tất cả định tuyến chưa định nghĩa
```
:::

### 2.3 Mô Hình Định Tuyến: Sự Khác Biệt Cốt Lõi Giữa Hash và History

Định tuyến frontend có hai mô hình cài đặt chính: Hash mode và History mode. Chúng khác biệt về dạng URL, cài đặt dưới tầng, tương thích, v.v.

::: tip 🤔 Tại Sao Cần Hai Mô Hình?
Đây thực ra là kết quả của lý do lịch sử và sự cân bằng kỹ thuật.

**Hash mode** là cách cài đặt định tuyến frontend sớm nhất, nó tận dụng phần hash của URL (tức nội dung sau `#`). Thay đổi hash không kích hoạt refresh trang, và tương thích cực tốt (ngay cả IE8 cũng hỗ trợ).

**History mode** là "cách làm tiêu chuẩn" sau khi HTML5 ra đời, nó tận dụng History API cung cấp bởi các phương pháp `pushState` và `replaceState`, có thể làm cho URL "bình thường" (không có `#`), nhưng cần máy chủ hợp tác cấu hình.

Một phép so sánh: Hash mode giống "dán một cái sticker ở cửa phòng" (không ảnh hưởng cấu trúc phòng), History mode giống "đánh số lại các phòng" (cần cập nhật hệ thống biển hiệu cửa).
:::

| Đặc Tính | Hash Mode | History Mode |
|------|-----------|--------------|
| **Ví Dụ URL** | `https://example.com/#/user/123` | `https://example.com/user/123` |
| **Nguyên Lý Cài Đặt** | Lắng nghe sự kiện `hashchange` | Sử dụng History API (`pushState`, `replaceState`) |
| **Cấu Hình Máy Chủ** | Không cần (hash không gửi đến máy chủ) | **Phải cấu hình fallback về index.html** |
| **Tương Thích Trình Duyệt** | IE8+ (gần như tất cả trình duyệt) | IE10+ (trình duyệt hiện đại) |
| **Thân Thiện Với SEO** | Tương đối tệ (công cụ tìm kiếm có thể bỏ qua hash) | Tốt (cấu trúc URL rõ ràng) |
| **Trải Nghiệm Người Dùng** | URL có `#`, trông như "chuyển hướng neo" | URL đẹp, gần giống website truyền thống |
| **Độ Khó Triển Khai** | Thấp, không cần cấu hình đặc biệt | Cao, cần cấu hình máy chủ đúng cách |

<HashVsHistoryDemo />

::: tip 📊 Bạn Có Thể Thấy Gì Từ Bảng Này?
Hãy giải thích từng hàng:

**Ví Dụ URL**: Hash mode có `#` rõ ràng trong URL, người dùng sẽ thấy ngay đây là "single page application"; History mode có URL giống website truyền thống, trông "chuyên nghiệp" hơn.

**Nguyên Lý Cài Đặt**: Hash mode lắng nghe sự kiện `hashchange` (kích hoạt khi hash thay đổi); History mode dùng History API của HTML5, có thể "giả vờ" trang đã chuyển hướng, nhưng thực tế không refresh.

**Cấu Hình Máy Chủ**: Đây là nơi dễ vấp phải nhất! Nội dung sau `#` ở Hash mode không gửi tới máy chủ, nên máy chủ không cần biết định tuyến tồn tại; nhưng đường dẫn đầy đủ ở History mode gửi tới máy chủ, nếu máy chủ chưa cấu hình, sẽ trả về 404.

**Thân Thiện Với SEO**: Bot công cụ tìm kiếm thường không thực thi JavaScript, Hash mode có URL có thể bị bỏ qua; History mode có cấu trúc URL rõ ràng, dễ được lập chỉ mục.

**Độ Khó Triển Khai**: Hash mode "có thể dùng ngay", History mode cần kiến thức vận hành (Nginx, Apache, v.v.). Đó cũng là lý do tại sao nhiều dự án cá nhân mặc định dùng Hash mode.
:::

---

## 3. Quá Trình Phát Triển: Từ Website Truyền Thống Đến Định Tuyến Hiện Đại

Đã nói khá nhiều khái niệm, hãy xem một trường hợp thực tế: một website thương mại điện tử phát triển từng bước từ "multi-page truyền thống" đến "single page application với định tuyến hiện đại". Qua trường hợp này, bạn sẽ hiểu rõ hơn định tuyến frontend giải quyết được những vấn đề gì.

::: tip 📖 Kiến Thức Nền Tảng: MPA, SPA, SSR Là Gì?
Trước khi bắt đầu trường hợp, hãy tóm tắt một vài thuật ngữ:

- **MPA (Multi-Page Application)**: **Ứng dụng đa trang**, cách phát triển website truyền thống. Mỗi trang là một tệp HTML độc lập, chuyển hướng trang sẽ refresh toàn bộ trang.
- **SPA (Single-Page Application)**: **Ứng dụng đơn trang**, cách phát triển frontend chính thức hiện đại. Chỉ có một tệp HTML điểm vào, chuyển đổi trang thông qua JavaScript thay thế component một cách động, không refresh.
- **SSR (Server-Side Rendering)**: **Render Phía Máy Chủ**, tạo HTML hoàn chỉnh ở phía máy chủ. Kết hợp ưu điểm của SPA và MPA, render màn hình đầu tiên nhanh, SEO tốt.

**Hiểu đơn giản**: MPA là "mỗi lần lật trang đều vẽ lại", SPA là "trên cùng một mảnh giấy xóa rồi vẽ lại", SSR là "vẽ xong trên giấy rồi đưa cho bạn".
:::

### 3.1 Toàn Cảnh Phát Triển

Bảng dưới đây hiển thị bốn giai đoạn phát triển của ứng dụng frontend, bạn có thể thấy công nghệ định tuyến phát triển từng bước:

| Giai Đoạn | Loại Ứng Dụng | Cài Đặt Định Tuyến | Đặc Điểm Cốt Lõi | Trải Nghiệm Người Dùng |
|------|---------|---------|---------|---------|
| **Giai Đoạn 1: Multi-Page Truyền Thống** | MPA | Định tuyến phía máy chủ | Mỗi trang là tệp HTML độc lập | Mỗi chuyển hướng đều refresh |
| **Giai Đoạn 2: SPA Sớm** | SPA (Hash mode) | Định tuyến Hash | URL có `#`, tương thích tốt | Không refresh, nhưng URL không đẹp |
| **Giai Đoạn 3: SPA Hiện Đại** | SPA (History mode) | Định tuyến History | URL đẹp, cần cấu hình máy chủ | Mượt mà, URL gần giống website truyền thống |
| **Giai Đoạn 4: Render Hỗn Hợp** | SPA + SSR | Định tuyến đồng cấu trúc | Render màn hình đầu tiên phía máy chủ, chuyển đổi trang phía frontend | Màn hình đầu tiên nhanh, SEO tốt, trải nghiệm mượt mà |

::: tip 📊 Bạn Có Thể Thấy Gì Từ Bảng Này?
Hãy giải thích từng hàng:

**Giai Đoạn 1 → Giai Đoạn 2**: Từ "có refresh" sang "không refresh", đây là bước ngoặt chất lượng. Lần đầu tiên người dùng trải nghiệm được cảm giác "mượt mà như App", nhưng cái giá là URL có `#`, trông không chuyên nghiệp.

**Giai Đoạn 2 → Giai Đoạn 3**: Từ "có thể dùng" sang "tốt để dùng". History mode làm cho URL đẹp, gần giống website truyền thống, nhưng cái giá là tăng độ khó triển khai (cần cấu hình máy chủ).

**Giai Đoạn 3 → Giai Đoạn 4**: Từ "trải nghiệm tốt" sang "trải nghiệm tốt + SEO tốt". SSR giải quyết vấn đề SEO của SPA, tốc độ render màn hình đầu tiên cũng nhanh hơn, nhưng độ khó cài đặt tăng lên đáng kể.

**Tóm tắt lại**: Phát triển định tuyến frontend không chỉ là "chuyển đổi nhanh hơn", mà là **nâng cấp toàn bộ kiến trúc ứng dụng**—từ máy chủ chính đến frontend chính, rồi đến kết hợp frontend-backend, mỗi bước đều cân bằng giữa trải nghiệm người dùng, chi phí phát triển, SEO, v.v.
:::

### 3.2 Giai Đoạn 1: Ứng Dụng Multi-Page Truyền Thống——Refresh Mỗi Lần

Tại sao gọi "ứng dụng multi-page truyền thống"? Vì giai đoạn này mỗi trang là một tệp HTML độc lập, khi chuyển hướng trang trình duyệt sẽ tải lại tất cả tài nguyên (HTML, CSS, JS). Đây là cách phát triển Web sớm nhất, hiện nay nhiều website truyền thống vẫn hoạt động theo cách này.

Trong giai đoạn này, trang web thương mại điện tử "Mua Nhiều Hơn" dùng kiến trúc MPA điển hình:

**Phương Pháp Phát Triển**:
- **Cài Đặt Định Tuyến**: Định tuyến phía máy chủ, mỗi trang tương ứng một tệp HTML trên máy chủ
- **Chuyển Hướng Trang**: Dùng `<a href="/products/123">`, kích hoạt refresh toàn bộ trang
- **Quản Lý Trạng Thái**: Mỗi lần chuyển hướng sẽ mất trạng thái trang trước đó (vị trí cuộn, nội dung biểu mẫu, v.v.)

**Đặc Điểm Của Giai Đoạn Này**:
- ✅ **Ưu Điểm**: Cài đặt đơn giản, thân thiện với công cụ tìm kiếm (SEO tốt), trình duyệt tương thích tới/lùi một cách sẵn sàng
- ❌ **Nhược Điểm**: Mỗi lần chuyển hướng đều refresh, trải nghiệm người dùng tệ, máy chủ chịu áp lực lớn (tải lại tài nguyên lặp lại)

::: details Xem Cấu Trúc Dự Án Và Quy Trình Truy Cập Hồi Đó
**Cấu Trúc Dự Án** (cấu trúc render phía máy chủ điển hình):
```
server/
├── views/              # Mẫu HTML
│   ├── index.html      # Mẫu trang chủ
│   ├── products.html   # Mẫu trang danh sách sản phẩm
│   └── product.html    # Mẫu trang chi tiết sản phẩm
├── public/             # Tài nguyên tĩnh
│   ├── css/
│   ├── js/
│   └── images/
└── server.js           # Điểm vào máy chủ
```

**Quy Trình Chuyển Hướng Trang**:
```
1. Người dùng nhấp liên kết <a href="/products/123">
       ↓
2. Trình duyệt gửi yêu cầu GET tới máy chủ
       ↓
3. Máy chủ render product.html, chèn dữ liệu
       ↓
4. Trả về trang HTML hoàn chỉnh
       ↓
5. Trình duyệt phân tích cú pháp HTML, tải CSS/JS, render trang
       ↓
6. Người dùng thấy trang (quá trình này thường mất 1-3 giây)
```

**Điểm Đau Của Người Dùng**:
- Sau khi nhấp liên kết trang bị thoáng trắng, thời gian chờ lâu
- Mỗi lần chuyển hướng đều tải lại tệp CSS/JS giống nhau
- Trình duyệt tương thích tới/lùi sẽ tải lại trang
- Không thể lưu trạng thái trang phức tạp (như điều kiện lọc, vị trí cuộn)
:::

Phương pháp phát triển này ở website nhỏ có thể chấp nhận được, nhưng khi quy mô website tăng lên, yêu cầu của người dùng về trải nghiệm tăng cao, những vấn đề này bắt đầu ảnh hưởng nghiêm trọng tới tỷ lệ giữ chân người dùng và tỷ lệ chuyển đổi.

### 3.3 Giai Đoạn 2: Ứng Dụng Đơn Trang Sớm——Thời Đại Định Tuyến Hash

Các vấn đề của ứng dụng multi-page truyền thống tích tụ đến một mức nhất định, đội ngũ "Mua Nhiều Hơn" quyết định giới thiệu định tuyến frontend, nâng cấp lên kiến trúc single page application. Đây là một điểm uốn cong quan trọng——từ "máy chủ chính" sang "frontend chính".

Nhưng giai đoạn này cũng có cái giá: URL có chứa `#`, trông không đủ chuyên nghiệp, công cụ tìm kiếm cũng gặp vấn đề.

**Phương Pháp Phát Triển**:
- **Cài Đặt Định Tuyến**: Định tuyến Hash, tận dụng phần `#` của URL
- **Chuyển Hướng Trang**: JavaScript chặn nhấp liên kết, thay thế component một cách động
- **Quản Lý Trạng Thái**: Trạng thái trang giữ ở phía client, không cần tải lại

**Đặc Điểm Của Giai Đoạn Này**:
- ✅ **Ưu Điểm**: Chuyển đổi không refresh, trải nghiệm người dùng mượt mà, áp lực máy chủ giảm
- ❌ **Nhược Điểm**: URL có `#`, SEO không thân thiện, lần tải đầu tiên chậm

::: details Xem Phương Pháp Cài Đặt Định Tuyến Hash
**Cấu Trúc Dự Án** (cấu trúc SPA sớm điển hình):
```
project/
├── index.html          # Tệp HTML điểm vào duy nhất
├── css/
│   └── app.css         # Tất cả các kiểu được gộp trong một tệp
├── js/
│   ├── router.js       # Cài đặt định tuyến đơn giản
│   ├── views/          # Component trang
│   │   ├── Home.js
│   │   ├── ProductList.js
│   │   └── ProductDetail.js
│   └── app.js          # Điểm vào ứng dụng
└── server.js           # Máy chủ tệp tĩnh đơn giản
```

**Mã Cốt Lõi Của Định Tuyến Hash**:
```javascript
// router.js - Cài đặt định tuyến Hash đơn giản
class HashRouter {
  constructor(routes) {
    this.routes = routes
    this.currentPath = null

    // Lắng nghe thay đổi hash
    window.addEventListener('hashchange', () => {
      this.matchRoute()
    })

    // Khởi tạo
    this.matchRoute()
  }

  matchRoute() {
    // Lấy hash hiện tại (bỏ #)
    const hash = window.location.hash.slice(1) || '/'
    const route = this.routes.find(r => r.path === hash)

    if (route) {
      this.render(route.component)
    } else {
      this.render(NotFoundComponent)
    }
  }

  render(component) {
    const app = document.getElementById('app')
    app.innerHTML = component.template()
    component.mount?.(app)
  }

  navigate(path) {
    window.location.hash = path
  }
}

// Sử dụng
const router = new HashRouter([
  { path: '/', component: Home },
  { path: '/products', component: ProductList },
  { path: '/products/:id', component: ProductDetail }
])

// Điều hướng
router.navigate('/products/123')
```

**Dạng URL**:
- Trang chủ: `https://example.com/#/`
- Danh sách sản phẩm: `https://example.com/#/products`
- Chi tiết sản phẩm: `https://example.com/#/products/123`

**Cải Thiện Mang Lại**:
1. **Trải Nghiệm Người Dùng Nâng Cao**: Chuyển đổi trang không refresh, mượt mà tự nhiên
2. **Áp Lực Máy Chủ Giảm**: Chỉ tải một lần HTML/CSS/JS, sau đó chỉ yêu cầu dữ liệu
3. **Giữ Trạng Thái**: Vị trí cuộn, nội dung biểu mẫu, v.v. có thể giữ lại khi chuyển đổi trang
4. **Thân Thiện Với Offline**: Kết hợp Service Worker có thể cài đặt truy cập offline

**Vấn Đề Mới**:
1. **URL Không Đẹp**: `#` làm cho URL trông giống "chuyển hướng neo", không đủ chuyên nghiệp
2. **Vấn Đề SEO**: Bot công cụ tìm kiếm có thể bỏ qua nội dung sau hash, dẫn đến trang không được lập chỉ mục
3. **Lần Tải Đầu Tiên Chậm**: Cần tải hết tất cả JavaScript, thời gian render màn hình đầu tiên tương đối dài
:::

### 3.4 Giai Đoạn 3: Ứng Dụng Đơn Trang Hiện Đại——Định Tuyến History Trở Thành Chủ Lực

Những vấn đề của định tuyến Hash (URL không đẹp, SEO tệ) làm phiền các lập trình viên rất lâu. Khi HTML5 trở nên phổ biến và tương thích trình duyệt cải thiện, định tuyến History dần trở thành chủ lực.

Định tuyến History tận dụng HTML5 History API, có thể làm cho URL "bình thường" (không có `#`), nhưng cái giá là cần máy chủ hợp tác cấu hình.

**Phương Pháp Phát Triển**:
- **Cài Đặt Định Tuyến**: Định tuyến History, sử dụng `pushState` và `replaceState`
- **Thư Viện Định Tuyến**: Vue Router, React Router, v.v. trở thành thư viện chín muồi
- **Cấu Hình Máy Chủ**: Cần cấu hình máy chủ để quay lại `index.html` cho tất cả định tuyến

**Đặc Điểm Của Giai Đoạn Này**:
- ✅ **Ưu Điểm**: URL đẹp, thân thiện với SEO, trải nghiệm người dùng mượt mà
- ❌ **Nhược Điểm**: Triển khai cần cấu hình đặc biệt, máy chủ phải hợp tác

::: details Cài Đặt Định Tuyến History Và Cấu Hình Triển Khai
**Cấu Trúc Dự Án** (cấu trúc SPA hiện đại điển hình):
```
project/
├── public/
│   └── index.html          # Tệp HTML điểm vào duy nhất
├── src/
│   ├── router/
│   │   └── index.js        # Cấu hình định tuyến
│   ├── views/              # Component trang
│   │   ├── Home.vue
│   │   ├── ProductList.vue
│   │   └── ProductDetail.vue
│   ├── App.vue
│   └── main.js
├── package.json
└── vite.config.js          # Cấu hình xây dựng
```

**Ví Dụ Cấu Hình Vue Router**:
```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),  // History mode
  routes: [
    { path: '/', component: () => import('@/views/Home.vue') },
    { path: '/products', component: () => import('@/views/ProductList.vue') },
    { path: '/products/:id', component: () => import('@/views/ProductDetail.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('@/views/NotFound.vue') }
  ]
})

export default router
```

**Dạng URL**:
- Trang chủ: `https://example.com/`
- Danh sách sản phẩm: `https://example.com/products`
- Chi tiết sản phẩm: `https://example.com/products/123`

**Cấu Hình Chính: Nginx** (bắt buộc khi triển khai):
```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/app;
    index index.html;

    # Cấu hình chính: tất cả định tuyến chỉ tới index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Tại Sao Cần Cấu Hình Này?**

```
Kịch Bản: Người dùng truy cập trực tiếp https://example.com/products/123

❌ Nếu Không Cấu Hình:
1. Trình duyệt yêu cầu máy chủ /products/123
2. Nginx tìm tệp /products/123 trên hệ thống tệp
3. Không tìm thấy tệp, trả về 404

✅ Nếu Đã Cấu Hình try_files:
1. Trình duyệt yêu cầu máy chủ /products/123
2. Nginx cố gắng tìm tệp → Không tồn tại
3. Quay lại /index.html (theo quy tắc try_files)
4. Trình duyệt tải index.html
5. Vue Router tiếp quản, phân tích cú pháp /products/123
6. Render Component ProductDetail
7. Trang hiển thị bình thường!
```

**So Sánh Khác Biệt Với Hash Mode**:
| Mục So Sánh | Hash Mode | History Mode |
|--------|----------|-------------|
| URL | `/#/products/123` | `/products/123` |
| Cấu Hình Máy Chủ | Không cần | **Bắt Buộc** |
| Truy Cập Trực Tiếp | ✅ Hoạt động bình thường | ❌ Cần hỗ trợ máy chủ |
| SEO | ⚠️ Tương đối tệ | ✅ Tốt |
:::

### 3.5 Giai Đoạn 4: Render Hỗn Hợp——Giải Pháp Cuối Cùng SPA + SSR

Khi định tuyến History trở nên chín muồi, đội ngũ bắt đầu quan tâm tới vấn đề sâu hơn: làm sao vừa giữ trải nghiệm mượt mà của SPA, vừa giải quyết vấn đề SEO và tải chậm ở màn hình đầu tiên?

Cốt lõi của giai đoạn này là "render đồng cấu trúc"——màn hình đầu tiên render phía máy chủ (SEO tốt, tải nhanh), chuyển đổi trang sau đó xử lý phía frontend (trải nghiệm mượt mà).

**Phương Pháp Phát Triển**:
- **Lựa Chọn Framework**: Next.js (React), Nuxt.js (Vue)
- **Chiến Lược Render**: Render phía máy chủ + thủy hóa phía client (Hydration)
- **Mô Hình Định Tuyến**: History mode (máy chủ đã cấu hình sẵn)

**Đặc Điểm Của Giai Đoạn Này**:
- ✅ **Ưu Điểm**: Màn hình đầu tiên nhanh, SEO tốt, chuyển đổi trang mượt mà
- ❌ **Nhược Điểm**: Độ khó cài đặt cao, cần môi trường chạy phía máy chủ

::: details Nguyên Lý Hoạt Động Của Render Hỗn Hợp
**Quy Trình Tải Trang**:
```
1. Người dùng truy cập /products/123
       ↓
2. Máy chủ tiếp nhận yêu cầu
       ↓
3. Máy chủ render Component ProductDetail → Tạo HTML hoàn chỉnh
       ↓
4. Trả về HTML tới trình duyệt (chứa nội dung đầy đủ)
       ↓
5. Trình duyệt hiển thị nội dung nhanh chóng (render màn hình đầu tiên nhanh)
       ↓
6. Tải JavaScript, thực thi "thủy hóa" (Hydration)
       ↓
7. Chuyển đổi trang sau đó được định tuyến frontend tiếp quản (không refresh)
```

**So Sánh Màn Hình Đầu Tiên Giữa SPA Truyền Thống Và SSR**:

| Mục So Sánh | SPA Truyền Thống | SSR |
|--------|---------|-----|
| Nội Dung Màn Hình Đầu Tiên | Thoáng trắng → Tải JS → Render | Hiển thị nội dung ngay lập tức |
| SEO | Bot có thể không thấy nội dung | Bot thấy HTML hoàn chỉnh |
| Thời Gian Render Màn Hình Đầu Tiên | Tương đối chậm (cần tải JS) | Tương đối nhanh (HTML đã chứa nội dung) |
| Chuyển Đổi Trang Sau Đó | Mượt mà (định tuyến frontend) | Mượt mà (định tuyến frontend) |
:::

---

## 4. Nguyên Lý Sâu Hơn: Định Tuyến Hoạt Động Như Thế Nào?

Sau khi hiểu trường hợp thực tế, hãy đi sâu xem nguyên lý hoạt động của định tuyến frontend, hiểu rõ sự khác biệt giữa hai mô hình Hash và History.

<RouterArchitectureDemo />

### 4.1 Nguyên Lý Hoạt Động Của Hash Mode

Hash mode dựa vào phần `hash` của URL (tức nội dung sau `#`). Hash có hai đặc tính quan trọng:

1. **Thay đổi hash không kích hoạt refresh trang**
2. **Thay đổi hash được ghi vào lịch sử trình duyệt**

Điều này có nghĩa là chúng tôi có thể thay đổi URL mà không refresh trang, đồng thời nút tới/lùi của trình duyệt cũng hoạt động bình thường.

**Quy Trình Hoạt Động**:

```
Người dùng nhấp liên kết <a href="#/user/123">
       ↓
Trình duyệt cập nhật URL (không refresh trang)
https://example.com/#/user/123
       ↓
Kích hoạt sự kiện hashchange
       ↓
Bộ Lắng Nghe Định Tuyến Bắt Sự Kiện
       ↓
Phân Tích Cú Pháp Giá Trị Hash → /user/123
       ↓
Khớp Với Cấu Hình Định Tuyến → Tìm Component UserDetail
       ↓
Render Component Vào Trang
```

**Cài Đặt Mã Cốt Lõi**:

```javascript
class HashRouter {
  constructor(routes) {
    this.routes = routes

    // Lắng nghe thay đổi hash
    window.addEventListener('hashchange', () => {
      this.loadRoute()
    })

    // Khởi tạo tải tuyến đường
    this.loadRoute()
  }

  loadRoute() {
    // Lấy hash hiện tại, bỏ đầu #
    const hash = window.location.hash.slice(1) || '/'
    const route = this.matchRoute(hash)

    if (route) {
      this.render(route.component)
    }
  }

  matchRoute(path) {
    return this.routes.find(r => r.path === path)
  }

  render(component) {
    document.getElementById('app').innerHTML = component.template()
  }

  push(path) {
    window.location.hash = path
  }
}
```

::: tip 💡 Ưu Điểm Của Hash Mode
- **Tương Thích Tốt**: IE8+ đều hỗ trợ, gần như tất cả trình duyệt
- **Triển Khai Đơn Giản**: Không cần cấu hình máy chủ, có thể dùng ngay
- **Cài Đặt Đơn Giản**: Chỉ cần lắng nghe sự kiện `hashchange`
:::

### 4.2 Nguyên Lý Hoạt Động Của History Mode

History mode tận dụng HTML5 History API, cung cấp các phương pháp như `pushState`, `replaceState`, v.v., có thể thay đổi URL mà không refresh trang.

**API Cốt Lõi**:

```javascript
// Thêm bản ghi lịch sử mới
history.pushState(state, title, url)
// Ví dụ: history.pushState({id: 123}, 'Chi tiết người dùng', '/user/123')

// Thay thế bản ghi lịch sử hiện tại
history.replaceState(state, title, url)

// Lắng nghe thay đổi bản ghi lịch sử (nút tới/lùi)
window.addEventListener('popstate', (event) => {
  // event.state chứa state được truyền vào pushState
})
```

**Quy Trình Hoạt Động**:

```
Người dùng nhấp liên kết <a href="/user/123">
       ↓
JavaScript Chặn Sự Kiện Nhấp
event.preventDefault()
       ↓
Gọi history.pushState
history.pushState({id: 123}, 'Chi tiết người dùng', '/user/123')
       ↓
URL Cập Nhật (không refresh trang)
https://example.com/user/123
       ↓
Khớp Định Tuyến Và Render Component
       ↓
Người Dùng Nhấp Nút Lùi Của Trình Duyệt
       ↓
Kích Hoạt Sự Kiện Popstate
       ↓
Bộ Lắng Nghe Định Tuyến Bắt Sự Kiện
       ↓
Render Component Tương Ứng Với URL Mới
```

**Cài Đặt Mã Cốt Lõi**:

```javascript
class HistoryRouter {
  constructor(routes) {
    this.routes = routes

    // Chặn tất cả nhấp liên kết
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a')
      if (link && link.getAttribute('href').startsWith('/')) {
        e.preventDefault()
        this.push(link.getAttribute('href'))
      }
    })

    // Lắng nghe nút tới/lùi của trình duyệt
    window.addEventListener('popstate', () => {
      this.loadRoute()
    })

    // Khởi tạo tải tuyến đường
    this.loadRoute()
  }

  loadRoute() {
    const path = window.location.pathname
    const route = this.matchRoute(path)

    if (route) {
      this.render(route.component)
    }
  }

  push(path) {
    history.pushState({}, '', path)
    this.loadRoute()
  }

  render(component) {
    document.getElementById('app').innerHTML = component.template()
  }
}
```

::: warning ⚠️ Cạm Bẫy Của History Mode
Vấn đề lớn nhất của History mode là: **Khi người dùng truy cập trực tiếp một URL nhất định hoặc refresh trang, trình duyệt sẽ gửi yêu cầu tới máy chủ**.

Nếu máy chủ không cấu hình đúng cách, sẽ trả về 404. Giải pháp là cấu hình máy chủ để tất cả định tuyến quay lại `index.html`, cho phép định tuyến frontend tiếp quản xử lý phần còn lại.
:::

---

## 5. Hướng Dẫn Thực Chiến Cấu Hình Định Tuyến

Lý thuyết đã nói đủ, dưới đây là các mô hình cấu hình định tuyến thường dùng và thực hành tốt nhất trong dự án thực tế.

### 5.1 Cấu Hình Định Tuyến Cơ Bản

::: details Ví Dụ Cấu Hình Vue Router Hoàn Chỉnh

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user/:id',
      name: 'UserDetail',
      component: () => import('@/views/UserDetail.vue'),
      props: true  // Truyền tham số định tuyến dưới dạng props
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Hành vi cuộn: giữ vị trí cuộn khi quay lại, nếu không thì cuộn tới đầu
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
```

:::

### 5.2 Lazy Loading Của Định Tuyến: Nâng Cao Hiệu Suất Màn Hình Đầu Tiên

Lazy loading của định tuyến nghĩa là chỉ tải component tương ứng khi người dùng truy cập định tuyến đó, thay vì tải tất cả component cùng một lúc. Điều này có thể giảm đáng kể thời gian tải màn hình đầu tiên.

```javascript
// ❌ Tải tất cả component cùng một lúc (màn hình đầu tiên chậm)
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import User from '@/views/User.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/user', component: User }
]

// ✅ Lazy loading (màn hình đầu tiên nhanh)
const routes = [
  { path: '/', component: () => import('@/views/Home.vue') },
  { path: '/about', component: () => import('@/views/About.vue') },
  { path: '/user', component: () => import('@/views/User.vue') }
]
```

<CodeSplittingDemo />

::: tip 💡 Nguyên Lý Của Lazy Loading
Khi bạn sử dụng `import('@/views/Home.vue')`, Webpack/Vite sẽ đóng gói component này vào một tệp riêng biệt. Chỉ khi người dùng truy cập định tuyến này, tệp tương ứng mới được tải xuống.

Một phép so sánh: lazy loading giống "gọi món khi cần" thay vì "mang tất cả món ăn lên bàn một lúc". Điều này có thể giảm thời gian tải màn hình đầu tiên, cải thiện trải nghiệm người dùng.
:::

### 5.3 Bộ Bảo Vệ Định Tuyến: Kiểm Soát Quyền Hạn Và Chặn Điều Hướng

Bộ bảo vệ định tuyến có thể thực thi logic trước và sau khi chuyển hướng định tuyến, thường dùng cho xác minh quyền hạn, cấu hình tiêu đề trang, tải dữ liệu trước, v.v.

```javascript
// Bộ bảo vệ toàn cục trước
router.beforeEach(async (to, from, next) => {
  // Cấu hình tiêu đề trang
  document.title = to.meta.title || 'My App'

  // Xác minh quyền hạn
  if (to.meta.requiresAuth) {
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      next('/login')
      return
    }
  }

  next()
})

// Bộ móc toàn cục sau
router.afterEach((to, from) => {
  // Thống kê truy cập trang
  analytics.trackPageView(to.path)
})

// Bộ bảo vệ cấp định tuyến
const routes = [
  {
    path: '/admin',
    component: Admin,
    meta: { requiresAuth: true, roles: ['admin'] },
    beforeEnter: (to, from, next) => {
      // Logic riêng cho định tuyến này
      if (hasPermission()) {
        next()
      } else {
        next('/403')
      }
    }
  }
]
```

::: tip 💡 Các Cách Dùng Thường Gặp Của Bộ Bảo Vệ Định Tuyến
- **Xác Minh Quyền Hạn**: Kiểm tra người dùng có quyền truy cập trang này không
- **Tiêu Đề Trang**: Cấu hình động `document.title`
- **Tải Dữ Liệu Trước**: Tải dữ liệu trước khi vào trang
- **Thanh Tiến Trình**: Hiển thị thanh tiến trình cho chuyển đổi trang
- **Thống Kê Truy Cập**: Ghi lại thông tin truy cập trang
:::

---

## 6. Các Vấn Đề Thường Gặp Và Giải Pháp

### 6.1 Sau Triển Khai Refresh Trang Báo Lỗi 404

**Vấn Đề**: Phát triển ở máy tính cá nhân bình thường, sau triển khai lên máy chủ, truy cập trực tiếp một định tuyến nào đó hoặc refresh trang lại báo lỗi 404.

**Nguyên Nhân**: History mode, máy chủ sẽ coi URL là đường dẫn tệp đi tìm, nhưng tất cả định tuyến của SPA thực ra đều chỉ tới `index.html`.

**Giải Pháp**: Cấu hình máy chủ fallback.

```nginx
# Cấu Hình Nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

```apache
# Cấu Hình Apache (.htaccess)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 6.2 Tham Số Định Tuyến Bị Mất

**Vấn Đề**: Sau khi refresh trang, `$route.params` bị mất.

**Nguyên Nhân**: Tham số định tuyến chỉ tồn tại khi chuyển hướng định tuyến, refresh trang cần phân tích cú pháp lại từ URL.

**Giải Pháp**:

```javascript
// ❌ Cách sai: Chỉ lấy tham số khi created
created() {
  const userId = this.$route.params.id
  this.fetchUser(userId)
}

// ✅ Cách đúng: Lắng nghe thay đổi định tuyến
watch: {
  '$route.params.id': {
    immediate: true,
    handler(newId) {
      this.fetchUser(newId)
    }
  }
}
```

### 6.3 Vị Trí Cuộn Bất Thường Khi Chuyển Đổi Trang

**Vấn Đề**: Sau chuyển đổi trang, vị trí cuộn không reset, hoặc quay lại không giữ lại vị trí trước đó.

**Giải Pháp**: Cấu hình `scrollBehavior` của định tuyến.

```javascript
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // Quay lại giữ vị trí cuộn
    if (savedPosition) {
      return savedPosition
    }
    // Chuyển tới anchor
    if (to.hash) {
      return { el: to.hash }
    }
    // Nếu không thì cuộn tới đầu
    return { top: 0 }
  }
})
```

---

## 7. Tóm Tắt

Hãy dùng một bảng để ôn lại các khái niệm cốt lõi của định tuyến frontend:

| Khái Niệm | Giải Thích Một Câu | Vấn Đề Được Giải Quyết | Phương Án Đại Diện |
|------|-----------|-----------|----------|
| **Định Tuyến** | Mối quan hệ ánh xạ giữa URL và component | Truy cập URL khác nhau hiển thị nội dung khác nhau | Vue Router, React Router |
| **Hash Mode** | Tận dụng hash của URL để cài đặt định tuyến | Tương thích tốt, triển khai đơn giản | Vue Router Hash Mode |
| **History Mode** | Tận dụng History API để cài đặt định tuyến | URL đẹp, SEO tốt | Vue Router History Mode |
| **Lazy Loading Định Tuyến** | Tải component của định tuyến khi cần | Giảm thời gian tải màn hình đầu tiên | `() => import('./Page.vue')` |
| **Bộ Bảo Vệ Định Tuyến** | Hàm móc trước và sau chuyển hướng định tuyến | Kiểm soát quyền hạn, tải dữ liệu trước | `beforeEach`, `beforeEnter` |
| **Định Tuyến Động** | Định tuyến có tham số | Khớp một loạt đường dẫn chứ không phải một | `/user/:id` |

::: info Viết Ở Cuối
Định tuyến frontend là một trong những công nghệ cốt lõi của single page application hiện đại. Từ Hash mode sớm đến History mode chủ lực ngày nay, công nghệ định tuyến liên tục phát triển, mang đến trải nghiệm duyệt web mượt mà hơn cho người dùng.

Hiểu rõ nguyên lý và mô hình định tuyến giúp bạn nhanh chóng định vị, giải quyết chính xác khi gặp vấn đề về triển khai, hiệu suất, SEO. Còn quan trọng hơn, nó giúp bạn đưa ra những lựa chọn kiến trúc thông minh khi thiết kế dự án——khi nào dùng Hash, khi nào dùng History, cách tránh những cạm bẫy thường gặp.

Hy vọng bài viết này giúp bạn xây dựng hiểu biết toàn diện về định tuyến frontend. Khi bạn gặp vấn đề liên quan tới định tuyến trong dự án thực tế, bạn sẽ biết nên bắt đầu từ đâu, cách định vị, và cách giải quyết.
:::
