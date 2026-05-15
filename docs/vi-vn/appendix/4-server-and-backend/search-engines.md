# Nguyên lý Công cụ Tìm kiếm

::: tip Lời nói đầu
**Khi bạn tìm kiếm "váy liền đỏ" trên Taobao, bạn tìm thấy kết quả phù hợp nhất từ hàng tỷ sản phẩm trong 0.1 giây — làm thế nào điều này có thể xảy ra?** Công cụ tìm kiếm là một trong những cơ sở hạ tầng cốt lõi nhất của Internet. Từ Google đến tìm kiếm trong trang thương mại điện tử, nguyên lý cốt lõi của nó đều giống nhau: chỉ mục đảo ngược + xếp hạng độ liên quan.
:::

**Bài viết này sẽ dạy bạn cái gì?**

Sau khi học xong chương này, bạn sẽ có được:

- **Chỉ mục đảo ngược**: Hiểu được cấu trúc dữ liệu cốt lõi nhất của công cụ tìm kiếm
- **Kỹ thuật phân từ**: Hiểu các thách thức và giải pháp phổ biến của phân từ tiếng Trung
- **Xếp hạng độ liên quan**: Nắm vững nguyên lý cơ bản của TF-IDF và BM25
- **Elasticsearch**: Hiểu kiến trúc và các trường hợp sử dụng của công cụ tìm kiếm phổ biến nhất
- **Tối ưu hóa tìm kiếm**: Nắm vững các tính năng tìm kiếm thực tế như từ đồng nghĩa, sửa lỗi, làm nổi bật

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|-----------------|
| **Chương 1** | Chỉ mục đảo ngược | Chỉ mục thuận vs chỉ mục đảo ngược |
| **Chương 2** | Phân từ và phân tích | Phân từ tiếng Trung, từ dừng, trích rút từ gốc |
| **Chương 3** | Xếp hạng độ liên quan | TF-IDF, BM25 |
| **Chương 4** | Elasticsearch | Kiến trúc phân tán, phân đoạn, bản sao |
| **Chương 5** | Tối ưu hóa tìm kiếm | Từ đồng nghĩa, sửa lỗi, tự động hoàn thành |

---

## 0. Bản đồ toàn cảnh: Bản chất của tìm kiếm là gì?

Bản chất của tìm kiếm là một vấn đề **truy vấn thông tin (Information Retrieval)**: cho một truy vấn, tìm kết quả phù hợp nhất từ một lượng lớn tài liệu và sắp xếp chúng theo độ liên quan.

Quá trình này chia thành hai giai đoạn:

- **Giai đoạn lập chỉ mục (ngoại tuyến)**: Xử lý tất cả các tài liệu trước để thiết lập một cấu trúc tìm kiếm hiệu quả
- **Giai đoạn truy vấn (trực tuyến)**: Khi người dùng nhập từ khóa, nhanh chóng tìm thấy các tài liệu phù hợp và sắp xếp chúng

::: tip Tại sao không thể sử dụng truy vấn LIKE trong cơ sở dữ liệu?
`SELECT * FROM products WHERE name LIKE '%váy liền đỏ%'` trông có vẻ như có thể tìm kiếm, nhưng nó cần **quét toàn bộ bảng** — kiểm tra từng bản ghi. Khi lượng dữ liệu đạt đến hàng triệu, truy vấn như vậy sẽ chậm đến mức không thể sử dụng được. Chỉ mục đảo ngược biến phép toán O(n) này thành tìm kiếm O(1).
:::

---

## 1. Chỉ mục đảo ngược: "Trái tim" của công cụ tìm kiếm

Cơ sở dữ liệu truyền thống sử dụng **chỉ mục thuận**: tìm nội dung tài liệu từ ID tài liệu. Trong khi đó, công cụ tìm kiếm sử dụng **chỉ mục đảo ngược**: tìm danh sách tài liệu chứa từ khóa từ từ khóa.

<InvertedIndexDemo />

| Loại chỉ mục | Hướng | Cách tìm kiếm | Trường hợp sử dụng |
|-------------|------|--------------|------------------|
| Chỉ mục thuận | Tài liệu → Nội dung | Biết ID, tìm nội dung | Truy vấn khóa chính cơ sở dữ liệu |
| Chỉ mục đảo ngược | Từ khóa → Danh sách tài liệu | Biết từ khóa, tìm tài liệu | Tìm kiếm toàn văn |

::: tip Quá trình xây dựng chỉ mục đảo ngược
1. **Thu thập tài liệu**: Lấy tất cả các tài liệu cần được tìm kiếm
2. **Phân từ (Tokenization)**: Chia tài liệu thành từng từ
3. **Thiết lập ánh xạ**: Ghi lại từng từ xuất hiện trong những tài liệu nào (cũng như vị trí, tần suất xuất hiện, v.v.)
4. **Lưu trữ bền vững**: Ghi chỉ mục vào đĩa, hỗ trợ tìm kiếm nhanh
:::

---

## 2. Phân từ và Phân tích Văn bản

Phân từ là bước đầu tiên của công cụ tìm kiếm và cũng là thách thức lớn nhất của tìm kiếm tiếng Trung. Tiếng Anh tự nhiên phân từ bằng khoảng trắng, nhưng tiếng Trung không có dấu phân cách — ví dụ chuỗi `乒乓球拍卖了` có thể chia thành `乒乓球 / 拍卖 / 了` ("bóng bàn / bán đấu giá / rồi") hoặc `乒乓 / 球拍 / 卖 / 了` ("bóng bàn / vợt bóng / bán / rồi") — hai cách cắt cho ra nghĩa hoàn toàn khác nhau.

| Cách phân từ | Giải thích | Ví dụ |
|-------------|-----------|-------|
| Phân từ tiêu chuẩn | Chia theo khoảng trắng và dấu câu (Tiếng Anh) | "hello world" → ["hello", "world"] |
| Phân từ tiếng Trung | Chia dựa trên từ điển hoặc mô hình | `搜索引擎` ("công cụ tìm kiếm") → [`搜索`, `引擎`] |
| N-gram | Chia theo cửa sổ trượt có độ dài cố định | `搜索引擎` → [`搜索`, `索引`, `引擎`] |
| Từ điển tùy chỉnh | Thêm từ vựng chuyên dụng kinh doanh | "iPhone16ProMax" làm một từ |

::: tip Quy trình Phân tích Văn bản

Phân từ chỉ là một bước của phân tích văn bản, quy trình hoàn chỉnh bao gồm:
1. **Lọc ký tự**: Loại bỏ thẻ HTML, ký tự đặc biệt
2. **Phân từ**: Chia văn bản thành từng từ (Token)
3. **Lọc từ dừng**: Loại bỏ các từ tần suất cao vô nghĩa như "the", "a", "is" (hoặc trong tiếng Trung là `的`, `了`, `是`)
4. **Mở rộng từ đồng nghĩa**: Mở rộng "điện thoại" thành "điện thoại, mobile, smartphone"
5. **Trích rút từ gốc**: Khôi phục "running" thành "run" (Tiếng Anh)
:::

---

## 3. Xếp hạng độ liên quan: Kết quả nào "liên quan" nhất?

Tìm thấy các tài liệu phù hợp chỉ là bước đầu tiên, điều quan trọng hơn là **sắp xếp** — đặt kết quả phù hợp nhất ở phía trước.

| Thuật toán | Nguyên lý | Đặc điểm |
|-----------|----------|---------|
| TF-IDF | Tần suất từ (TF) × Tần suất tài liệu nghịch đảo (IDF) | Thuật toán cổ điển, đơn giản và hiệu quả |
| BM25 | Phiên bản cải tiến của TF-IDF, thêm chuẩn hóa độ dài tài liệu | Thuật toán mặc định của Elasticsearch |
| Truy vấn vectơ | Chuyển đổi tài liệu và truy vấn thành vectơ, tính độ tương tự cosine | Hỗ trợ tìm kiếm ngữ nghĩa |

::: tip Hiểu TF-IDF theo trực giác
- **TF (Tần suất từ)**: Một từ xuất hiện càng nhiều lần trong tài liệu, tài liệu đó càng có khả năng liên quan đến từ đó
- **IDF (Tần suất tài liệu nghịch đảo)**: Một từ xuất hiện càng ít trong các tài liệu, tính phân biệt của nó càng cao
- Những từ phổ thông như "the" hay "của" xuất hiện trong tất cả các tài liệu (IDF thấp), vì vậy tìm kiếm chúng không có ý nghĩa
- "Elasticsearch" chỉ xuất hiện trong một số tài liệu (IDF cao), tìm kiếm nó có thể xác định vị trí chính xác
:::

---

## 4. Elasticsearch: Công cụ Tìm kiếm Phổ biến Nhất

Elasticsearch là công cụ tìm kiếm mã nguồn mở phổ biến nhất hiện nay, được xây dựng dựa trên Apache Lucene, cung cấp khả năng tìm kiếm toàn văn phân tán và API RESTful.

| Khái niệm | Giải thích |
|----------|-----------|
| Index | Tương tự như "bảng" trong cơ sở dữ liệu, lưu trữ các tài liệu cùng loại |
| Document | Một bản ghi, định dạng JSON |
| Shard | Phân đoạn, chia chỉ mục thành nhiều nút |
| Replica | Bản sao, cung cấp tính sẵn có cao và mở rộng đọc |
| Mapping | Định nghĩa loại trường, tương tự như Schema cơ sở dữ liệu |
| Analyzer | Bộ phân tích văn bản, xác định quy tắc phân từ |

::: tip ES vs Cơ sở dữ liệu

Elasticsearch không được sử dụng để thay thế cơ sở dữ liệu, mà được sử dụng như một lớp tìm kiếm kết hợp với cơ sở dữ liệu. Kiến trúc điển hình: Dữ liệu được ghi vào cơ sở dữ liệu → Đồng bộ hóa với ES → Yêu cầu tìm kiếm đi qua ES → Yêu cầu chi tiết đi qua cơ sở dữ liệu.
:::

---

## 5. Tối ưu hóa Tìm kiếm: Làm cho Tìm kiếm "Thông minh hơn"

| Phương pháp tối ưu hóa | Giải thích | Hiệu quả |
|----------------------|-----------|---------|
| Từ đồng nghĩa | Tìm "điện thoại" cũng ra "mobile", "smartphone" | Tăng tỷ lệ recall |
| Sửa lỗi chính tả | "iphoen" được tự động sửa thành "iphone" | Khả năng chịu lỗi |
| Tự động hoàn thành | Nhập "iph" gợi ý "iphone 15 pro" | Nâng cao trải nghiệm |
| Làm nổi bật | Tô đỏ các từ phù hợp trong kết quả tìm kiếm | Trình bày trực quan |
| Điều chỉnh trọng số | Trọng số khớp tiêu đề > Khớp nội dung | Tăng độ chính xác |
| Lọc và Tổng hợp | Lọc theo khoảng giá, thương hiệu | Thu hẹp phạm vi |

---

## Tóm lại

Công cụ tìm kiếm là cơ sở hạ tầng cốt lõi của các ứng dụng Internet. Hiểu được ba khái niệm cốt lõi — chỉ mục đảo ngược, phân từ, xếp hạng độ liên quan — bạn sẽ nắm vững bản chất của công cụ tìm kiếm.

Xem lại các điểm chính của chương này:

1. **Chỉ mục đảo ngược**: Ánh xạ ngược từ từ khóa đến tài liệu, là cấu trúc dữ liệu cốt lõi của công cụ tìm kiếm
2. **Phân từ là nền tảng**: Phân từ tiếng Trung là chìa khóa cho chất lượng tìm kiếm, bạn cần chọn một bộ phân từ phù hợp
3. **Xếp hạng BM25**: Đánh giá độ liên quan dựa trên tần suất từ và tần suất tài liệu, là thuật toán mặc định của ES
4. **Kiến trúc ES**: Phân đoạn + Bản sao để thực hiện phân tán và tính sẵn có cao
5. **Tối ưu hóa tìm kiếm**: Từ đồng nghĩa, sửa lỗi, hoàn thành làm cho tìm kiếm thông minh hơn

## Đọc Thêm

- [Elasticsearch Tài liệu Chính thức](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) - Tham khảo ES có thẩm quyền nhất
- [Hướng dẫn Elasticsearch Thẩm quyền](https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html) - Hướng dẫn bắt đầu tiếng Trung
- [Apache Lucene](https://lucene.apache.org/) - Thư viện công cụ tìm kiếm cơ sở của ES
- [MeiliSearch](https://www.meilisearch.com/) - Công cụ tìm kiếm nhẹ, phù hợp cho các dự án vừa và nhỏ
- [Typesense](https://typesense.org/) - Công cụ tìm kiếm tức thì mã nguồn mở
