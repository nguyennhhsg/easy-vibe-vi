# Đo lường và tối ưu hóa hiệu suất trang web
::: tip 🎯 Vấn đề cốt lõi
**Tại sao trang web của bạn tải chậm, nhưng người dùng vẫn điên cuồng phàn nàn về độ chậm?** Nó giống như hỏi: tại sao nhà hàng phục vụ chậm, khách hàng mất kiên nhẫn? Chương này sẽ đưa bạn hiểu sâu sắc về các khái niệm cốt lõi của tối ưu hóa hiệu suất frontend, giúp trang web của bạn "bay" lên.
:::

---

## 1. Tại sao phải "tối ưu hóa hiệu suất"?

### 1.1 Từ có thể sử dụng đến tốt: Sự phát triển của tối ưu hóa hiệu suất

Mười năm trước, các trang web rất đơn giản, một trang có thể chỉ vài KB, tốc độ tải gần như không cảm nhận được sự chậm trễ. Lúc đó chúng ta hoàn toàn không cần xem xét tối ưu hóa hiệu suất — vì vấn đề chưa xuất hiện.

Nhưng bây giờ hoàn toàn khác. Độ phức tạp của các trang web hiện đại tăng theo cấp số nhân: một trang chủ thương mại điện tử có thể có hàng chục hình ảnh độ phân giải cao, một nền tảng xã hội có thể tải cùng một lúc hàng nghìn bài viết, một bảng điều khiển quản lý có thể chứa hàng chục thành phần tương tác. Phía sau những tính năng "phong phú" này là khối lượng mã lớn và dung lượng tài nguyên, nếu không tối ưu hóa tốt, trải nghiệm của người dùng sẽ tệ hại.

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**👴 Trang web mười năm trước**
- Mỗi trang chỉ vài KB đến vài chục KB
- Chỉ có chữ và một ít hình ảnh
- Người dùng gần như không cảm nhận được sự chậm trễ tải
- Không cần tối ưu hóa hiệu suất

</div>
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🚀 Trang web hiện đại**
- Một trang có thể vài MB hoặc hơn
- Có hình ảnh độ phân giải cao, video, các thành phần tương tác
- Tải chậm, cuộn kém mượt, phản ứng click chậm
- Phải tối ưu hóa hiệu suất mới có thể sử dụng được

</div>
</div>

**Đó là vấn đề mà "tối ưu hóa hiệu suất" giải quyết: giảm thời gian chờ của người dùng, làm cho các hoạt động mượt mà hơn.**

### 1.2 Một câu chuyện thực tế gặp phải: Tại sao bạn cần hiểu tối ưu hóa hiệu suất

Bạn có thể nói: "Mạng nhanh như vậy, thiết bị tốt như vậy, có cần cân nhắc tối ưu hóa hiệu suất không?" Để bạn hiểu rõ tại sao những kiến thức này quan trọng, tôi sẽ kể một câu chuyện thực tế.

::: warning Câu chuyện gặp phải của Tiểu Vương
Tiểu Vương là một kỹ sư frontend vừa vào làm việc, chịu trách nhiệm phát triển trang chủ thương mại điện tử của công ty. Anh ấy sử dụng Vue 3 mới nhất, thư viện giao diện phổ biến nhất, chức năng hoàn thiện rất tốt, khi kiểm tra trên máy tính hiệu suất cao của công ty, mọi thứ đều bình thường.

Nhưng ngày thứ hai sau khi phát hành, phòng chăm sóc khách hàng bốc hơi — rất nhiều người dùng phàn nàn "website quá chậm", "hình ảnh tải mãi không ra", "nhấp vào nút mãi không có phản ứng". Tiểu Vương mở máy phát triển của mình để kiểm tra, mọi thứ đều mượt mà, anh hoàn toàn không hiểu vấn đề ở đâu.

Sau đó, anh nhờ người sư phụ giúp định vị, sư phụ bảo anh dùng một chiếc laptop thường thường, kết nối mạng 4G thông thường, rồi kiểm tra lại trang web của anh. Tiểu Vương hơi nghe: trang chủ mất hơn mười giây để tải, cuộn danh sách lúc lên lúc xuống như PowerPoint, nhấp vào nút phải chờ vài giây mới có phản ứng.

Hoá ra máy phát triển của Tiểu Vương là MacBook Pro cấu hình cao + quang học gigabit, trong khi hầu hết người dùng dùng thiết bị thường thường + mạng di động. Mã của anh có hàng chục hình ảnh chưa nén độ phân giải cao, nhập toàn bộ thư viện giao diện nhưng chỉ dùng vài thành phần, ngoài ra còn thực hiện rất nhiều tính toán đồng bộ khi render.

Giải pháp thực chất không phức tạp: nén hình ảnh, nhập thành phần theo nhu cầu, đặt tính toán vào luồng nền, sử dụng danh sách ảo. Sau những thay đổi này, thời gian tải trang chủ từ hơn mười giây xuống còn 2 giây, cuộn cũng rất mượt mà, phàn nàn của người dùng biến mất ngay lập tức.

Tiểu Vương từ đó hiểu rõ một điều: **không hiểu tối ưu hóa hiệu suất, mã bạn viết chạy nhanh như bay trên máy tính của bạn, nhưng trên thiết bị của người dùng có thể hoàn toàn không dùng được.**
:::

::: info 💡 Chỉ dẫn cốt lõi
Tối ưu hóa hiệu suất không phải lựa chọn, mà là kỹ năng bắt buộc. Bạn phải suy nghĩ từ góc độ người dùng — họ dùng thiết bị thường thường, mạng thường thường, nếu mã của bạn không chạy được trên thiết bị của họ, điều đó chứng tỏ bạn cần tối ưu hóa.
:::

---

## 2. Khái niệm cốt lõi: Tải, Render, Tương tác

::: tip 🤔 Những khái niệm này liên quan gì đến hiệu suất?
Tải, render, tương tác là ba giai đoạn cốt lõi khi người dùng truy cập trang web, mỗi giai đoạn đều có thể trở thành nút thắt hiệu suất.

Khi người dùng truy cập trang web của bạn, sẽ lần lượt trải qua:
1. **Tải** → Tải HTML/CSS/JS/hình ảnh từ máy chủ xuống trình duyệt
2. **Render** → "Vẽ" nội dung đã tải thành trang mà người dùng có thể nhìn thấy
3. **Tương tác** → Phản hồi các hành động click, cuộn, v.v. của người dùng

Vì vậy, **tối ưu hóa hiệu suất là làm cho ba giai đoạn này đều nhanh hơn**. Hiểu chúng, bạn mới biết nút thắt hiệu suất ở đâu, nên dùng phương pháp gì để tối ưu hóa.
:::

Trước khi học sâu các kỹ thuật tối ưu hóa cụ thể, chúng ta cần làm rõ một số khái niệm cốt lõi. Để giúp bạn hiểu rõ hơn, chúng tôi sẽ sử dụng phép ẩn dụ nhà hàng để so sánh mối quan hệ của chúng.

### 2.1 Hiểu ba giai đoạn bằng phép ẩn dụ nhà hàng

Hãy tưởng tượng bạn đi ăn tại một nhà hàng, quá trình này giống một cách đáng ngạc nhiên với việc truy cập trang web:

| Giai đoạn | 🍽️ Phép ẩn dụ nhà hàng | Tác dụng thực | Ví dụ cụ thể |
|-----------|------------------------|--------------|-------------|
| **Tải** | Vận chuyển nguyên liệu từ kho đến bếp | Tải HTML/CSS/JS/hình ảnh từ máy chủ xuống trình duyệt | Người dùng mở trang web, trình duyệt bắt đầu tải các tài nguyên |
| **Render** | Đầu bếp chế biến nguyên liệu thành món ăn | Trình duyệt chuyển mã thành trang mà người dùng có thể nhìn thấy | Trình duyệt phân tích HTML, tính bố cục, vẽ trang |
| **Tương tác** | Nhân viên phục vụ phản hồi nhu cầu của khách | Trình duyệt phản hồi click, cuộn, v.v. | Người dùng nhấp vào nút, trang phát hành phản hồi |

### 2.2 Tải (Loading): Vận chuyển nguyên liệu

Tải là quá trình tải xuống các tài nguyên khác nhau cần thiết cho trang web (HTML, CSS, JavaScript, hình ảnh, phông chữ, v.v.) từ máy chủ đến trình duyệt. Quá trình này giống như vận chuyển nguyên liệu từ kho đến bếp, nếu vận chuyển chậm hoặc có quá nhiều nguyên liệu, bếp phải chờ đợi.

**Tại sao tải lại chậm?** Có ba lý do chính: Thứ nhất, dung lượng tài nguyên quá lớn — một hình ảnh độ phân giải cao chưa nén có thể là 5MB, tương đương với tải một cuốn tiểu thuyết; Thứ hai, độ trễ mạng — nếu máy chủ ở nước ngoài hoặc người dùng dùng mạng di động, mỗi yêu cầu đều phải chờ lâu; Cuối cùng, quá nhiều yêu cầu — trình duyệt chỉ có thể tải một số tài nguyên cùng một lúc, quá nhiều tài nguyên sẽ phải xếp hàng.

::: details 🔍 Xem những gì xảy ra trong giai đoạn tải
Khi người dùng nhập địa chỉ trang web vào thanh địa chỉ của trình duyệt và nhấn Enter, các bước sau sẽ xảy ra lần lượt:

1. **Phân giải DNS**: Chuyển đổi tên miền (như `www.example.com`) thành địa chỉ IP (như `192.168.1.1`), giống như tra cứu địa chỉ nhà hàng qua danh bạ điện thoại
2. **Kết nối TCP**: Trình duyệt và máy chủ thiết lập kết nối, giống như quay số điện thoại trước khi gọi
3. **Bắt tay TLS**: Thiết lập kết nối an toàn (HTTPS), giống như xác nhận danh tính của đối phương
4. **Yêu cầu tài nguyên**: Trình duyệt yêu cầu tệp HTML từ máy chủ
5. **Phân tích HTML**: Trình duyệt phân tích HTML, phát hiện cần CSS, JS, hình ảnh, v.v. và tiếp tục yêu cầu
6. **Tải tài nguyên**: Tải tất cả các tài nguyên cần thiết xuống máy
7. **Bắt đầu render**: Sau khi tải xong, bắt đầu vẽ trang

Các bước 1-4 gọi là "thời gian byte đầu tiên" (TTFB), các bước 5-7 là thời gian tải tài nguyên thực tế.
:::

**Các phương pháp tối ưu hóa tải phổ biến:**

- **Nén tài nguyên**: Làm file nhỏ hơn (nén Gzip, Brotli)
- **Sử dụng CDN**: Lưu trữ file trên máy chủ gần người dùng hơn
- **Lazy load**: Chỉ tải nội dung mà người dùng có thể thấy, tải phần còn lại khi người dùng cuộn
- **Code splitting**: Chia tệp lớn thành tệp nhỏ, tải theo nhu cầu

### 2.3 Render: Đầu bếp nấu ăn

Render là quá trình trình duyệt chuyển đổi HTML, CSS, JavaScript đã tải thành trang mà người dùng có thể nhìn thấy. Quá trình này giống như đầu bếp chế biến nguyên liệu thành món ăn, nếu quy trình phức tạp, có nhiều bước, thời gian phục vụ sẽ chậm.

::: tip 📖 "Render" là gì?
Bạn có thể nghe từ "render" nhưng nó thực sự là gì?

**Nói một cách đơn giản, render là quá trình chuyển đổi mã thành hình ảnh.**

Những gì trình duyệt phải làm bao gồm:
1. **Phân tích HTML** → Tạo cây DOM (cấu trúc của trang)
2. **Phân tích CSS** → Tạo cây CSSOM (kiểu của trang)
3. **Hợp nhất** → Tạo cây render (kết hợp cấu trúc và kiểu)
4. **Bố cục** → Tính toán vị trí và kích thước của mỗi phần tử
5. **Vẽ** → Vẽ các phần tử
6. **Tổng hợp** → Kết hợp nhiều lớp thành hình ảnh cuối cùng

Quá trình này rất phức tạp, bất kỳ vấn đề nào ở một giai đoạn cũng có thể dẫn đến trang bị tụt lại.
:::

**Tại sao render lại chậm?** Có hai lý do chính: Thứ nhất, trang quá phức tạp — nếu một trang có hàng chục nghìn nút DOM, trình duyệt tính toán bố cục và vẽ sẽ rất chậm; Thứ hai, thường xuyên sửa đổi trang — nếu mã JavaScript thường xuyên sửa đổi DOM, sẽ khiến trình duyệt liên tục tính toán bố cục lại và vẽ lại, tiêu tốn rất nhiều hiệu suất.

::: details 📁 Xem những gì xảy ra trong giai đoạn render
**Quy trình render hoàn chỉnh**:

```
HTML (chuỗi)
    ↓
[Phân tích HTML] → Tạo cây DOM
    ↓
Cây DOM (cấu trúc trang)

CSS (bảng kiểu)
    ↓
[Phân tích CSS] → Tạo cây CSSOM
    ↓
Cây CSSOM (kiểu trang)

Cây DOM + Cây CSSOM
    ↓
[Hợp nhất] → Tạo cây render
    ↓
Cây render (các phần tử cần render)
    ↓
[Bố cục Layout] → Tính toán vị trí và kích thước của mỗi phần tử
    ↓
[Vẽ Paint] → Tô màu, vẽ chữ
    ↓
[Tổng hợp Composite] → Kết hợp nhiều lớp
    ↓
Hình ảnh cuối cùng
```

**Đường dẫn render quan trọng (Critical Rendering Path)**: Trình duyệt cần render nội dung màn hình đầu tiên càng nhanh càng tốt, giúp người dùng cảm thấy "trang web rất nhanh". Đây gọi là "tối ưu hóa đường dẫn render quan trọng".
:::

👇 **Thử tay**:
Bản demo dưới đây thể hiện cách trình duyệt render trang. Nhấp "Bước tiếp theo", quan sát các giai đoạn render:

<PerformanceOverviewDemo />

**Các phương pháp tối ưu hóa render phổ biến:**

- **Giảm reflow và repaint**: Tránh sửa đổi DOM thường xuyên, sử dụng `transform` và `opacity` thay vì `top` và `width`
- **Danh sách ảo**: Chỉ render nội dung có thể nhìn thấy, hiệu suất tăng đáng kể với dữ liệu nhiều
- **CSS animation**: Sử dụng CSS animation thay vì JavaScript animation, hiệu suất tốt hơn

### 2.4 Tương tác (Interaction): Nhân viên phục vụ phản hồi

Tương tác là quá trình trình duyệt phản hồi các hoạt động của người dùng (click, cuộn, nhập, v.v.). Quá trình này giống như nhân viên phục vụ phản hồi nhu cầu của khách, nếu nhân viên quá bận, khách phải chờ.

**Tại sao tương tác lại chậm?** Lý do chính là **luồng chính bị chặn**. JavaScript của trình duyệt là đơn luồng, nếu mã đang thực hiện tính toán phức tạp, sẽ không thể phản hồi các hoạt động của người dùng, dẫn đến trang bị tụt lại.

::: tip 🤔 "Luồng chính" là gì?
Trình duyệt có nhiều luồng, nhưng chỉ một luồng chịu trách nhiệm thực thi JavaScript, render trang và phản hồi các hoạt động của người dùng — **luồng chính**.

Bạn có thể tưởng tượng luồng chính là một **nhân viên bận rộn**, anh ấy phải làm rất nhiều việc:
- Thực thi mã JavaScript (tính toán dữ liệu, gọi API)
- Render trang (bố cục, vẽ)
- Phản hồi các hoạt động của người dùng (click nút, cuộn trang)

Vấn đề là: **anh ấy chỉ có một người**. Nếu anh ấy đang thực hiện tính toán JavaScript phức tạp (chẳng hạn như xử lý mười nghìn dữ liệu), lúc này người dùng nhấp vào nút, anh ấy không thể phản hồi ngay lập tức, phải chờ tính toán xong. Đây là **gốc rễ của sự tụt lại**.

**Giải pháp**:
- Đặt tính toán phức tạp vào Web Worker (luồng nền)
- Sử dụng time slicing, chia tác vụ lớn thành tác vụ nhỏ
- Tránh các hoạt động đồng bộ phức tạp, chuyển sang không đồng bộ
:::

👇 **Thử tay xem**:
Bản demo dưới đây so sánh sự khác biệt giữa tính toán đồng bộ và Web Worker. Nhấp "Bắt đầu tính toán", quan sát liệu trang có bị tụt lại không:

<PerformanceMetricsDemo />

**Các phương pháp tối ưu hóa tương tác phổ biến:**

- **Debounce và throttle**: Hạn chế tần suất kích hoạt sự kiện (chẳng hạn như sự kiện cuộn, sự kiện nhập)
- **Web Worker**: Đặt tính toán phức tạp vào luồng nền, không chặn luồng chính
- **Time slicing**: Chia tác vụ lớn thành tác vụ nhỏ, giúp trình duyệt có cơ hội phản hồi hoạt động của người dùng

---

## 3. Thực tế: Con đường tối ưu hóa hiệu suất của một đội

Nói rất nhiều khái niệm, hãy xem một trường hợp thực tế: một công ty khởi nghiệp là cách nào để từng bước tiến hóa từ "hoàn toàn không cân nhắc hiệu suất" đến "tối ưu hóa hiệu suất có hệ thống". Qua trường hợp này, bạn sẽ trực quan hơn hiểu tối ưu hóa hiệu suất thực sự giải quyết vấn đề gì.

### 3.1 Bảng toàn cảnh tiến hóa

Bảng dưới đây thể hiện bốn giai đoạn tối ưu hóa hiệu suất, bạn có thể thấy cách các phương pháp tối ưu hóa, công cụ giám sát, chỉ số phát triển như thế nào:

| Giai đoạn | Phương pháp tối ưu hóa | Công cụ giám sát | Chỉ số cốt lõi | Sự thay đổi cốt lõi |
|-----------|----------------------|-----------------|---------------|--------------------|
| **Giai đoạn một: Thời kỳ nguyên thủy** | Không có (không cân nhắc) | Không có (dựa vào cảm giác) | Không có | Hoàn toàn không ý thức hiệu suất, miễn sao chạy được là được |
| **Giai đoạn hai: Tối ưu hóa thủ công** | Nén hình ảnh, giảm yêu cầu | Bảng Network của trình duyệt | Thời gian tải trang | Bắt đầu ý thức, nhưng phương pháp sơ khai |
| **Giai đoạn ba: Tối ưu hóa có hệ thống** | Code splitting, lazy load, danh sách ảo | Lighthouse, bảng Performance | FCP, LCP, TBT | Sử dụng công cụ chuyên nghiệp, có mục tiêu tối ưu hóa rõ ràng |
| **Giai đoạn bốn: Tối ưu hóa liên tục** | Performance budget, CI/CD check | RUM, Lighthouse CI | INP, CLS, giám sát toàn chuỗi | Đưa hiệu suất vào quy trình phát triển |

::: tip 📊 Từ bảng bạn có thể thấy gì?
Hãy giải thích từng dòng của bảng này:

**Giai đoạn một → Giai đoạn hai**: Từ "không ý thức" sang "có ý thức". Đây là bước chuyển pivotal — các nhà phát triển bắt đầu ý thức rằng hiệu suất là vấn đề và cố gắng tối ưu hóa. Nhưng các phương pháp tối ưu hóa khá sơ khai, chủ yếu dựa vào cảm giác và kinh nghiệm.

**Giai đoạn hai → Giai đoạn ba**: Từ "thủ công" sang "có hệ thống". Đây là bước tiến chất lượng — bắt đầu sử dụng các công cụ chuyên nghiệp (Lighthouse, bảng Performance) để chẩn đoán vấn đề hiệu suất, sử dụng phương pháp khoa học (code splitting, lazy load) để tối ưu hóa, thay vì dựa vào cảm giác.

**Giai đoạn ba → Giai đoạn bốn**: Từ "tối ưu hóa một lần" sang "tối ưu hóa liên tục". Khi tối ưu hóa hiệu suất trở thành một phần của quy trình phát triển, cần xây dựng hệ thống giám sát (RUM, giám sát người dùng thực), đặt performance budget ở giai đoạn phát triển, ngăn chặn sự suy giảm.

**Tổng kết**: Sự tiến hóa của tối ưu hóa hiệu suất không chỉ là "sử dụng thêm công nghệ", mà là **sự nâng cấp toàn bộ cách suy nghĩ** — từ ứng phó bị động đến ngăn chặn chủ động, từ dựa vào cảm giác sang được dữ liệu hướng dẫn, từ tối ưu hóa lần duy nhất sang cải tiến liên tục.
:::

### 3.2 Giai đoạn một: Thời kỳ nguyên thủy — hoàn toàn không cân nhắc

Tại sao gọi là "thời kỳ nguyên thủy"? Bởi vì giai đoạn này hoàn toàn không cân nhắc vấn đề hiệu suất — miễn sao chạy được là được. Đội có 3 người, làm một trang web doanh nghiệp đơn giản, dự án rất nhỏ, dường như không vấn đề gì.

Nhưng khi dự án lớn hơn, người dùng nhiều hơn, vấn đề bắt đầu lộ ra.

**Phương thức phát triển**:
- **Phương pháp tối ưu hóa**: Không có, phát triển trực tiếp, không cân nhắc hiệu suất
- **Công cụ giám sát**: Không có, đánh giá tốc độ dựa vào cảm giác
- **Chỉ số cốt lõi**: Không có

**Đặc điểm của giai đoạn này**:
- ✅ **Ưu điểm**: Phát triển nhanh, không có chi phí học tập bổ sung
- ❌ **Nhược điểm**: Trải nghiệm người dùng kém, không thể sử dụng khi mạng chậm

::: details Xem vấn đề lúc đó
**Vấn đề cụ thể gặp phải**:

1. **Hình ảnh quá lớn**: Trưởng phòng sản phẩm tải lên một hình ảnh Banner trang chủ 5MB, người dùng mạng di động mở trang web phải chờ 1 phút
2. **Không nén**: Tệp CSS và JS hoàn toàn không nén, dung lượng gấp 3 lần so với sau nén
3. **Không bộ nhớ cache**: Mỗi lần truy cập đều phải tải lại tất cả tài nguyên, người dùng cũ cũng phải chờ
4. **Tải đồng bộ**: Tất cả tệp JS đều tải đồng bộ trong `<head>`, chặn render trang

**Phản hồi của người dùng**:
- "Trang web của các bạn làm sao mở không được?"
- "Hình ảnh tải mãi không ra, toàn trắng"
- "Nhấp vào nút không có phản ứng, trang web hỏng rồi à?"

**Giải pháp tạm thời lúc đó**:
```html
<!-- Dùng mặt nạ loading để "lừa" người dùng -->
<div id="loading">Đang tải...</div>
<script>
  // Sau khi trang tải xong mới ẩn mặt nạ
  window.onload = function() {
    document.getElementById('loading').style.display = 'none'
  }
</script>
```

Đây hoàn toàn là "tự lừa bản thân" — trang vẫn rất chậm, chỉ là người dùng không nhìn thấy mà thôi.
:::

### 3.3 Giai đoạn hai: Tối ưu hóa thủ công — bắt đầu ý thức

Vấn đề của thời kỳ nguyên thủy tích lũy đến một mức độ nhất định, đội cuối cùng quyết định bắt đầu tối ưu hóa hiệu suất. Đây là bước chuyển quan trọng — từ "hoàn toàn không cân nhắc" sang "ý thức được tối ưu hóa".

Nhưng giai đoạn này tối ưu hóa khá sơ khai, chủ yếu dựa vào nén hình ảnh, gộp tệp, giảm yêu cầu HTTP đơn giản.

**Phương thức phát triển**:
- **Phương pháp tối ưu hóa**: Thủ công nén hình ảnh, gộp tệp CSS/JS, giảm yêu cầu HTTP
- **Công cụ giám sát**: Bảng Network của trình duyệt, nhật ký định thời gian đơn giản
- **Chỉ số cốt lõi**: Thời gian tải trang (dùng đồng hồ bấm giờ định thời gian thủ công)

**Đặc điểm của giai đoạn này**:
- ✅ **Ưu điểm**: Có cải thiện rõ rệt, người dùng không còn phàn nàn quá nhiều
- ❌ **Nhược điểm**: Tối ưu hóa không hệ thống, dễ bị lặp lại, thiếu chỉ số định lượng

::: details Xem cách thức tối ưu hóa thủ công cụ thể
**Phương pháp tối ưu hóa thủ công**:

1. **Nén hình ảnh thủ công**:
   - Dùng Photoshop nén từng hình ảnh thành "định dạng Web"
   - Chuyển PNG sang JPEG (nén mất mát, nhưng dung lượng nhỏ hơn nhiều)
   - Giảm kích thước hình ảnh (chẳng hạn như giảm hình rộng 2000px xuống 800px)

2. **Gộp tệp thủ công**:
   ```html
   <!-- Trước tối ưu hóa: 10 tệp JS = 10 yêu cầu -->
   <script src="utils.js"></script>
   <script src="api.js"></script>
   <script src="component-a.js"></script>
   <script src="component-b.js"></script>
   ...（còn 6 tệp khác）

   <!-- Sau tối ưu hóa: 1 tệp JS gộp = 1 yêu cầu -->
   <script src="all.js"></script>
   ```

3. **Đặt CSS/JS vào cuối trang**:
   ```html
   <body>
     <!-- Nội dung trang -->
     <h1>Chào mừng đến thăm</h1>

     <!-- Tối ưu hóa: đặt CSS/JS ở cuối -->
     <link rel="stylesheet" href="style.css">
     <script src="app.js"></script>
   </body>
   ```

**Cải thiện mang lại**:
- Dung lượng hình ảnh từ 5MB giảm xuống 500KB (giảm 90%)
- Yêu cầu HTTP từ 30 giảm xuống 5
- Thời gian tải trang từ 30 giây giảm xuống 8 giây

**Khó khăn mới**:
1. **Khối lượng công việc thủ công lớn**: Mỗi lần cập nhật đều phải nén hình ảnh, gộp tệp thủ công
2. **Dễ quên**: Người mới không biết phải tối ưu hóa, tải trực tiếp ảnh gốc
3. **Thiếu định lượng**: Chỉ biết "nhanh hơn một chút", không biết nhanh hơn bao nhiêu cụ thể
:::

### 3.4 Giai đoạn ba: Tối ưu hóa có hệ thống — dùng công cụ và dữ liệu nói chuyện

Vấn đề của giai đoạn hai (khối lượng công việc thủ công lớn, thiếu định lượng) đã làm khó đội rất lâu. Cho đến khi sau này, đội phát hiện ra các công cụ chuyên nghiệp như Lighthouse, bảng Performance, v.v., bước vào thời đại tối ưu hóa có hệ thống.

Cốt lõi của giai đoạn này là **dùng dữ liệu để hướng dẫn tối ưu hóa** — trước hết dùng công cụ chẩn đoán vấn đề, tìm nút thắt hiệu suất, sau đó tối ưu hóa có mục tiêu.

**Phương thức phát triển**:
- **Phương pháp tối ưu hóa**: Code splitting, lazy load, danh sách ảo, nén hình ảnh tự động
- **Công cụ giám sát**: Lighthouse, bảng Chrome Performance, WebPageTest
- **Chỉ số cốt lõi**: FCP (thời gian màn hình đầu tiên), LCP (vẽ nội dung lớn nhất), TBT (tổng thời gian chặn)

::: details Cách thức tối ưu hóa có hệ thống cụ thể
**Sử dụng Lighthouse chẩn đoán vấn đề**:

Lighthouse là công cụ tự động hóa kiểm tra hiệu suất do Google phát triển, có thể cung cấp báo cáo hiệu suất toàn diện và đề xuất tối ưu hóa.

```bash
# Dùng Lighthouse kiểm tra trang web
lighthouse https://www.example.com --view
```

Lighthouse sẽ cung cấp:
- **Điểm hiệu suất** (0-100 điểm)
- **Chỉ số cốt lõi** (FCP, LCP, CLS, TBT, INP)
- **Gợi ý tối ưu hóa** (chẳng hạn như "bật nén văn bản", "loại bỏ JavaScript chưa sử dụng")

**Giải thích các chỉ số chính**:

| Chỉ số | Tên gọi đầy đủ | Ý nghĩa | Giá trị lý tưởng |
|--------|--------------|---------|-----------------|
| **FCP** | First Contentful Paint | Thời gian vẽ nội dung đầu tiên (khi người dùng nhìn thấy khối nội dung đầu tiên) | <1.8s |
| **LCP** | Largest Contentful Paint | Thời gian vẽ nội dung lớn nhất (khi nội dung chính tải xong) | <2.5s |
| **TBT** | Total Blocking Time | Tổng thời gian chặn (tổng thời gian luồng chính bị chặn) | <200ms |
| **CLS** | Cumulative Layout Shift | Dịch chuyển bố cục tích lũy (mức độ phần tử trang nhảy loạn) | <0.1 |

:::

**Đặc điểm của giai đoạn này**:
- ✅ **Ưu điểm**: Tối ưu hóa có mục tiêu, hiệu quả tốt, có chỉ số định lượng
- ❌ **Nhược điểm**: Cần học công cụ và chỉ số, có rào cản nhất định

::: details Xem các kỹ thuật tối ưu hóa có hệ thống cụ thể
**1. Code splitting (Chia tách mã)**:

Chia tệp lớn thành tệp nhỏ, tải theo nhu cầu. Chẳng hạn như người dùng truy cập trang chủ, chỉ tải mã mà trang chủ cần, đợi click vào "Về chúng tôi", mới tải mã của trang đó.

```js
// Trước tối ưu hóa: tất cả mã trong một tệp, tải cùng một lúc
import About from './views/About.vue'
import Contact from './views/Contact.vue'
// ... còn 10 trang khác

// Sau tối ưu hóa: lazy load, tải khi truy cập
const About = () => import('./views/About.vue')
const Contact = () => import('./views/Contact.vue')
```

**Hiệu quả**: Dung lượng mã tải trang chủ giảm 70%, thời gian màn hình đầu tiên từ 5 giây giảm xuống 1.5 giây.

**2. Lazy loading hình ảnh**:

Chỉ tải hình ảnh mà người dùng có thể nhìn thấy, cuộn đến khu vực có thể nhìn thấy mới tải các hình ảnh khác.

```html
<!-- Trình duyệt hiện đại hỗ trợ lazy load gốc -->
<img src="placeholder.jpg" data-src="real-image.jpg" loading="lazy" />
```

**Hiệu quả**: Số lượng hình ảnh tải trang chủ từ 20 giảm xuống 3, tiết kiệm 80% băng thông.

**3. Danh sách ảo (Virtual scrolling)**:

Nếu phải render 10,000 dữ liệu, không phải tạo 10,000 nút DOM, mà chỉ render 20 trong khu vực có thể nhìn thấy, cuộn thì thay đổi động.

```vue
<!-- Dùng thành phần vue-virtual-scroller -->
<RecycleScroller
  :items="items"
  :item-size="50"
  key-field="id"
>
  <template #default="{ item }">
    <div>{{ item.name }}</div>
  </template>
</RecycleScroller>
```

**Hiệu quả**: 10,000 dữ liệu từ "đơ" thành "cuộn mượt mà", chiếm dụng bộ nhớ giảm 95%.
:::

### 3.5 Giai đoạn bốn: Tối ưu hóa liên tục — đưa hiệu suất vào quy trình phát triển

Khi công cụ và phương pháp trưởng thành, đội bắt đầu chú ý đến vấn đề sâu hơn: làm sao ngăn chặn suy giảm hiệu suất? Làm sao để hiệu suất trở thành một phần của quy trình phát triển?

Cốt lõi của giai đoạn này là **xây dựng hệ thống giám sát và performance budget** — không phải tối ưu hóa sau khi phát hành, mà ngăn chặn vấn đề hiệu suất ở giai đoạn phát triển.

**Phương thức phát triển**:
- **Phương pháp tối ưu hóa**: Performance budget, Lighthouse CI, giám sát người dùng thực (RUM)
- **Công cụ giám sát**: Lighthouse CI, WebPageTest API, Google Analytics
- **Chỉ số cốt lõi**: INP (độ trễ tương tác), CLS (dịch chuyển bố cục), giám sát toàn chuỗi

::: details Cách thức tối ưu hóa liên tục cụ thể
**1. Đặt performance budget**:

Đặt giới hạn trong cấu hình đóng gói, vượt quá sẽ báo lỗi, ngăn chặn "vô tình nhập tệp lớn".

```js
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // Giới hạn tệp đơn không quá 200KB
        chunkFileNames: 'js/[name]-[hash].js',
      }
    },
    // Phát hành cảnh báo khi vượt 200KB
    chunkSizeWarningLimit: 200
  }
})
```

**2. Lighthouse CI**:

Mỗi lần commit mã, tự động chạy kiểm tra Lighthouse, nếu điểm hiệu suất giảm, ngăn chặn hợp nhất.

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://staging.example.com
          budgetPath: ./budget.json
```

**3. Giám sát người dùng thực (RUM)**:

Thu thập dữ liệu hiệu suất trong trình duyệt người dùng thực, thay vì chỉ kiểm tra trong môi trường phát triển.

```js
// Gửi dữ liệu hiệu suất tới máy chủ
const perfData = performance.getEntriesByType('navigation')[0]
const lcp = performance.getEntriesByType('largest-contentful-paint')[0]

fetch('/api/perf', {
  method: 'POST',
  body: JSON.stringify({
    fcp: perfData.loadEventEnd - perfData.fetchStart,
    lcp: lcp.renderTime || lcp.loadTime,
    url: window.location.href
  })
})
```

**Hiệu quả**:
- Có thể phát hiện kịp thời suy giảm hiệu suất (chẳng hạn như commit nào đó khiến LCP từ 2 giây thành 5 giây)
- Hiểu được trải nghiệm người dùng thực (thay vì "trạng thái lý tưởng" của môi trường phát triển)
- Tối ưu hóa có mục tiêu đối với 10% người dùng chậm nhất
:::

**Giai đoạn này sẽ làm gì?**

1. **Performance budget**: Giới hạn kích thước tệp, số lượng yêu cầu, vượt quá sẽ báo động
2. **Kiểm tra CI/CD**: Mỗi lần commit mã tự động kiểm tra hiệu suất, suy giảm sẽ ngăn chặn hợp nhất
3. **Giám sát người dùng thực**: Thu thập dữ liệu hiệu suất của người dùng thực, cải tiến liên tục
4. **Báo cáo định kỳ**: Mỗi tuần/tháng tạo báo cáo hiệu suất, theo dõi xu hướng

---

## 4. Các nút thắt hiệu suất phổ biến và giải pháp

Nói rất nhiều lý thuyết, hãy xem các vấn đề hiệu suất phổ biến nhất trong phát triển thực tế, và cách giải quyết.

### 4.1 Tải hình ảnh chậm

**Biểu hiện vấn đề**: Hình ảnh mãi không tải ra, hoặc tải trong quá trình trang nhảy loạn.

**Nguyên nhân**:
- Hình ảnh quá lớn (ảnh gốc độ phân giải cao)
- Kích thước hình ảnh quá lớn (ảnh 2000px rộng hiển thị 200px)
- Không lazy load (tải tất cả hình ảnh cùng một lúc)

**Giải pháp**:

1. **Sử dụng định dạng hình ảnh hiện đại** (WebP, AVIF):

```html
<!-- Hiện đại: định dạng WebP, dung lượng nhỏ 30-70% -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="hình ảnh">
</picture>
```

2. **Hình ảnh đáp ứng** (tải kích thước khác nhau theo thiết bị):

```html
<!-- Thiết bị nhỏ tải ảnh nhỏ, thiết bị lớn tải ảnh lớn -->
<img
  src="image-800.jpg"
  srcset="image-400.jpg 400w,
          image-800.jpg 800w,
          image-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px,
         (max-width: 1200px) 800px,
         1200px"
  alt="hình ảnh đáp ứng">
```

3. **Lazy load** (người dùng cuộn tới mới tải):

```html
<!-- Hiện đại: lazy load gốc -->
<img src="placeholder.jpg" data-src="real-image.jpg" loading="lazy" />
```

👇 **Thử tay xem**:
Bản demo dưới đây so sánh sự khác biệt giữa lazy load và không lazy load. Quan sát yêu cầu mạng:

<ImageOptimizationDemo />

### 4.2 Tải màn hình đầu chậm

**Biểu hiện vấn đề**: Người dùng mở trang web, màn hình trắng rất lâu.

**Nguyên nhân**:
- Tải quá nhiều mã không cần thiết
- Đường dẫn render quan trọng bị chặn
- Không code splitting

**Giải pháp**:

1. **Code splitting**:

```js
// Lazy load theo route: tải khi truy cập
const routes = [
  {
    path: '/about',
    component: () => import('./views/About.vue')  // Tải khi truy cập /about
  }
]
```

2. **Preload tài nguyên quan trọng**:

```html
<!-- Báo cho trình duyệt: những tài nguyên này quan trọng, ưu tiên tải -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="hero-image.jpg" as="image">
```

3. **Inline CSS quan trọng**:

```html
<!-- Nhúng CSS màn hình đầu trực tiếp trong HTML -->
<style>
  /* CSS quan trọng màn hình đầu */
  .hero { background: #000; color: #fff; }
</style>
```

### 4.3 Cuộn trang kém mượt

**Biểu hiện vấn đề**: Cuộn trang bị giật, không mượt mà.

**Nguyên nhân**:
- Render quá nhiều nút DOM (chẳng hạn như 10,000 dữ liệu)
- Trình nghe sự kiện cuộn có tính toán phức tạp
- Thường xuyên kích hoạt tính toán bố cục

**Giải pháp**:

1. **Danh sách ảo**:

```vue
<!-- Chỉ render nội dung có thể nhìn thấy -->
<RecycleScroller
  :items="10000"
  :item-size="50"
>
  <template #default="{ item }">
    <div>{{ item.name }}</div>
  </template>
</RecycleScroller>
```

👇 **Xem tại đây**:
Bản demo dưới đây so sánh sự khác biệt về hiệu suất giữa danh sách bình thường và danh sách ảo:

<VirtualScrollingDemo />

2. **Throttle sự kiện cuộn**:

```js
// Giới hạn tần suất kích hoạt sự kiện cuộn (tối đa mỗi 100ms kích hoạt một lần)
const throttledScroll = throttle(() => {
  updatePosition()
}, 100)

window.addEventListener('scroll', throttledScroll)
```

3. **Sử dụng CSS `will-change`**:

```css
/* Báo cho trình duyệt trước: phần tử này sẽ thay đổi, vui lòng chuẩn bị sẵn -->
.scroll-container {
  will-change: transform;
}
```

### 4.4 Click phản ứng chậm

**Biểu hiện vấn đề**: Click nút, phải chờ vài giây mới có phản ứng.

**Nguyên nhân**:
- Trình nghe sự kiện click có tính toán phức tạp (chặn luồng chính)
- Không debounce (người dùng click nhanh nhiều lần, kích hoạt nhiều lần tính toán)

**Giải pháp**:

1. **Debounce sự kiện click**:

```js
// Người dùng dừng click 300ms sau mới thực thi
const debouncedClick = debounce(() => {
  submitForm()
}, 300)

button.addEventListener('click', debouncedClick)
```

2. **Sử dụng Web Worker** (đặt tính toán vào luồng nền):

```js
// Luồng chính
const worker = new Worker('calculator.js')
button.addEventListener('click', () => {
  worker.postMessage({ data: largeData })
})

worker.onmessage = (e) => {
  // Tính toán xong, hiển thị kết quả
  showResult(e.data.result)
}

// calculator.js (luồng Worker)
self.onmessage = (e) => {
  const result = heavyCalculation(e.data.data)
  self.postMessage({ result })
}
```

---

## 5. Công cụ giám sát hiệu suất

Tối ưu hóa hiệu suất không phải công việc một lần, cần giám sát liên tục. Dưới đây giới thiệu các công cụ phổ biến.

### 5.1 Công cụ nhà phát triển của trình duyệt

**Chrome DevTools** là công cụ phân tích hiệu suất phổ biến nhất:

- **Bảng Network**: Xem tình hình tải tài nguyên
- **Bảng Performance**: Phân tích hiệu suất khi chạy (FPS, hoạt động luồng chính)
- **Lighthouse**: Tạo báo cáo hiệu suất một nút

::: tip Cách sử dụng bảng Performance
1. Mở Chrome DevTools (F12)
2. Chuyển đến bảng Performance
3. Nhấp nút "Record"
4. Thao tác trang web (cuộn, click, v.v.)
5. Nhấp "Stop" dừng ghi
6. Phân tích kết quả: xem FPS (tốc độ khung hình), hoạt động luồng chính, tác vụ dài, v.v.
:::

### 5.2 Lighthouse

**Lighthouse** là công cụ kiểm tra hiệu suất tự động do Google phát triển:

```bash
# Sử dụng dòng lệnh
lighthouse https://www.example.com --view

# Hoặc dùng trong Chrome DevTools
# Mở DevTools → Lighthouse → nhấp "Analyze page load"
```

Lighthouse sẽ cung cấp:
- Điểm hiệu suất (0-100)
- Chỉ số cốt lõi (FCP, LCP, CLS, TBT, INP)
- Gợi ý tối ưu hóa (sắp xếp theo ảnh hưởng)

### 5.3 WebPageTest

**WebPageTest** là công cụ kiểm tra hiệu suất trực tuyến, có thể kiểm tra từ nhiều địa điểm, nhiều thiết bị:

```bash
# Truy cập https://www.webpagetest.org
# Nhập URL, chọn địa điểm kiểm tra và thiết bị, nhấp "Start Test"
```

WebPageTest sẽ cung cấp:
- Biểu đồ thác nước (Waterfall): Dòng thời gian tải mỗi tài nguyên
- Video so sánh: Video quá trình tải trước và sau tối ưu hóa
- Gợi ý tối ưu hóa

---

## 6. Danh sách kiểm tra tối ưu hóa hiệu suất

Dưới đây là danh sách kiểm tra tối ưu hóa hiệu suất thực dụng, bạn có thể tối ưu hóa theo thứ tự này:

### 6.1 Tối ưu hóa tải

- ✅ **Nén hình ảnh**: Dùng định dạng WebP, nén chất lượng 80-85%
- ✅ **Hình ảnh đáp ứng**: Tải kích thước hình ảnh khác nhau theo kích thước thiết bị
- ✅ **Lazy load**: Lazy load hình ảnh và thành phần, chỉ tải nội dung có thể nhìn thấy
- ✅ **Code splitting**: Chia tách mã theo route, tải theo nhu cầu
- ✅ **Nén mã**: Bật nén Gzip/Brotli
- ✅ **Sử dụng CDN**: Đặt tài nguyên tĩnh trên CDN, tăng tốc độ tải
- ✅ **Preload tài nguyên quan trọng**: Dùng `<link rel="preload">`

### 6.2 Tối ưu hóa render

- ✅ **Giảm reflow/repaint**: Dùng `transform` và `opacity` thay vì `top` và `width`
- ✅ **Danh sách ảo**: Dùng virtual scroll khi có dữ liệu nhiều
- ✅ **CSS animation**: Ưu tiên dùng CSS animation, không dùng JavaScript animation
- ✅ **Tối ưu hóa đường dẫn render quan trọng**: Inline CSS quan trọng, lazy load CSS không quan trọng
- ✅ **Tránh @import**: `@import` chặn render, dùng `<link>`

### 6.3 Tối ưu hóa tương tác

- ✅ **Debounce và throttle**: Dùng debounce/throttle cho sự kiện cuộn, nhập, resize
- ✅ **Web Worker**: Đặt tính toán phức tạp vào luồng nền
- ✅ **Time slicing**: Chia tác vụ lớn thành tác vụ nhỏ, tránh tác vụ dài
- ✅ **Tránh đọc bố cục đồng bộ**: Không đọc thuộc tính bố cục trong vòng lặp (như `offsetHeight`)

### 6.4 Tối ưu hóa bộ nhớ cache

- ✅ **HTTP cache**: Cấu hình Cache-Control và ETag
- ✅ **Service Worker**: Cache tài nguyên tĩnh, thực hiện truy cập ngoại tuyến
- ✅ **LocalStorage**: Cache dữ liệu API, giảm yêu cầu
- ✅ **Memory cache**: Dùng `Map`/`Object` cache kết quả tính toán

### 6.5 Tối ưu hóa giám sát

- ✅ **Lighthouse CI**: Mỗi lần commit tự động kiểm tra hiệu suất
- ✅ **Giám sát người dùng thực**: Thu thập dữ liệu hiệu suất của người dùng thực
- ✅ **Performance budget**: Đặt giới hạn dung lượng tệp, vượt quá báo động
- ✅ **Báo cáo định kỳ**: Mỗi tuần/tháng tạo báo cáo xu hướng hiệu suất

---

## 7. Tóm tắt

Hãy dùng một bảng để ôn lại các khái niệm cốt lõi của tối ưu hóa hiệu suất frontend:

| Khái niệm | Giải thích một câu | Giải quyết vấn đề gì | Phương pháp phổ biến |
|-----------|------------------|-------------------|-------------------|
| **Tối ưu hóa tải** | Làm cho tải tài nguyên nhanh hơn | Màn hình đầu chậm, thời gian chờ lâu | Nén hình ảnh, CDN, code splitting, lazy load |
| **Tối ưu hóa render** | Làm cho "vẽ" trang nhanh hơn | Cuộn kém mượt, click chậm | Danh sách ảo, giảm reflow/repaint, CSS animation |
| **Tối ưu hóa tương tác** | Làm cho phản ứng nhanh hơn | Click không có phản ứng, tác vụ kém mượt | Debounce/throttle, Web Worker, time slicing |
| **Tối ưu hóa bộ nhớ cache** | Tránh tải lại | Truy cập lại chậm | HTTP cache, Service Worker, LocalStorage |
| **Tối ưu hóa giám sát** | Phát hiện vấn đề liên tục | Suy giảm hiệu suất | Lighthouse, RUM, performance budget |

::: info Viết ở cuối
Tối ưu hóa hiệu suất là chủ đề tiến hóa liên tục, công cụ sẽ thay đổi, nhưng nguyên tắc cốt lõi không đổi: **suy nghĩ từ góc độ người dùng, giảm thời gian chờ, làm cho hoạt động mượt mà hơn**.

Hiểu rõ những nguyên tắc cơ bản này, bất kể công nghệ thay đổi như thế nào, bạn đều có thể nhanh chóng bắt kịp, tự tin đối phó.

Hy vọng bài viết này giúp bạn xây dựng nhận thức toàn diện về tối ưu hóa hiệu suất frontend. Khi gặp vấn đề hiệu suất trong dự án thực tế, bạn biết phải bắt đầu từ đâu, cách định vị, cách giải quyết.
:::
