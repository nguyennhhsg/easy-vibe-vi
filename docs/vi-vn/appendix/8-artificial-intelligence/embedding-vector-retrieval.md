# Embedding và Tìm kiếm Theo Vector

::: tip Mở đầu
**Máy tính hiểu như thế nào về 'mèo và chó giống nhau, nhưng khác với ô tô' này?** Đối với con người, đây là kiến thức phổ thông, nhưng đối với máy tính, 'mèo', 'chó', 'ô tô' chỉ là ba chuỗi ký tự không liên quan gì. Công nghệ Embedding (nhúng) là chìa khóa để giải quyết vấn đề này——nó chuyển đổi văn bản thành các vector số, giúp máy tính cũng hiểu được 'sự gần gũi hay cách biệt' về mặt ngữ nghĩa.
:::

**Bài viết này sẽ dạy bạn những gì?**

Sau khi học xong chương này, bạn sẽ có được:

- **Hiểu trực quan**：Hiểu Embedding là gì, tại sao các vector của 'mèo' và 'chó' lại gần nhau
- **Tính toán Độ tương tự**：Nắm vững các phương pháp đo lường cốt lõi như độ tương tự cosine, khoảng cách Euclid
- **Nguyên tắc Lập chỉ mục**：Hiểu cách cơ sở dữ liệu vector tìm kiếm ở mức mili giây trong dữ liệu hàng triệu cấp độ
- **Lựa chọn Công nghệ**：Tìm hiểu các đặc điểm và kịch bản ứng dụng của các cơ sở dữ liệu vector chính thống
- **Quy trình Từ đầu đến cuối**：Nắm vững Pipeline hoàn chỉnh từ văn bản đến vector đến tìm kiếm

| Chương | Nội dung | Khái niệm Cốt lõi |
|-----|------|---------|
| **Chương 1** | Khái niệm Embedding | Không gian ngữ nghĩa, biểu diễn vector |
| **Chương 2** | Tính toán Độ tương tự | Độ tương tự cosine, khoảng cách Euclid |
| **Chương 3** | Lập chỉ mục Vector | Tìm kiếm vũ phu so với ANN |
| **Chương 4** | Cơ sở dữ liệu Vector | Pinecone, Milvus, Chroma |
| **Chương 5** | Pipeline Từ đầu đến cuối | Văn bản→Vector→Lưu trữ→Truy vấn |

---

## 0. Toàn cảnh: Cây cầu từ chữ viết đến số

Trong thế giới xử lý ngôn ngữ tự nhiên, có một thách thức cơ bản: **máy tính chỉ hiểu số, không hiểu chữ viết**.

Cách tiếp cận ban đầu là gán một số cho mỗi từ (mã hóa One-Hot), chẳng hạn như 'mèo'=001, 'chó'=010, 'ô tô'=100. Nhưng cách này có một vấn đề chết người: **khoảng cách giữa tất cả các từ đều như nhau**. Khoảng cách từ 'mèo' đến 'chó' và từ 'mèo' đến 'ô tô' hoàn toàn giống nhau——rõ ràng điều này không phù hợp với trực quan của chúng ta.

Tính cách mạng của Embedding nằm ở chỗ: nó ánh xạ mỗi từ đến một không gian vector chiều thấp dày đặc, giúp các từ có ngữ nghĩa gần nhau tự nhiên tập hợp lại. Trong không gian này, 'mèo' và 'chó' rất gần nhau, trong khi 'ô tô' ở xa——máy tính cuối cùng cũng có thể 'hiểu' ngữ nghĩa.

::: tip Bước nhảy từ One-Hot đến Embedding
- **One-Hot**：Chiều = Kích thước từ vựng (có thể vài chục ngàn chiều), mỗi vector chỉ có một 1, phần còn lại toàn là 0, thưa thớt và không có ngữ nghĩa
- **Embedding**：Chiều thường là 768~1536, mỗi số đều có ý nghĩa, dày đặc và chứa đầy thông tin ngữ nghĩa
- **Bước đột phá chính**：Word2Vec (2013) đã chứng minh rằng 'ý nghĩa của một từ có thể được định nghĩa bằng bối cảnh của nó', mở ra kỷ nguyên Embedding
:::

---

## 1. Khái niệm Embedding: Biến Chữ viết Thành Tọa độ

Ý tưởng cốt lõi của Embedding có thể được tóm tắt bằng một câu: **sử dụng một tập hợp các số (vector) để biểu diễn ý nghĩa của một từ hoặc câu**.

Hãy tưởng tượng một hệ tọa độ hai chiều. Chúng ta đặt 'mèo' ở tọa độ (0.2, 0.7), 'chó' ở (0.3, 0.6), 'ô tô' ở (0.9, 0.1). Bạn sẽ thấy rằng tọa độ của 'mèo' và 'chó' rất gần nhau, trong khi 'ô tô' cách chúng rất xa. Đây là trực quan về Embedding——độ tương tự ngữ nghĩa trở thành khoảng cách không gian.

<EmbeddingConceptDemo />

::: tip Ba Đặc tính Chính của Embedding
1. **Phân cụm Ngữ nghĩa**：Các từ có ý nghĩa tương tự sẽ tự động tập hợp lại (một cụm động vật, một cụm thực phẩm, một cụm công nghệ)
2. **Mối quan hệ Lý thuyết**：Phép toán vector có thể biểu thị mối quan hệ ngữ nghĩa, ví dụ cổ điển: king - man + woman ≈ queen
3. **Ý nghĩa Chiều**：Mỗi chiều mã hóa ngầm một số đặc tính ngữ nghĩa nào đó (chẳng hạn như 'có phải là động vật hay không', 'kích thước', 'xu hướng cảm xúc', v.v.)
:::

| Phương pháp Mã hóa | Chiều | Thông tin Ngữ nghĩa | Ứng dụng Điển hình |
|---------|------|---------|---------|
| One-Hot | Kích thước từ vựng (~50000) | Không | NLP truyền thống |
| Word2Vec | 100~300 | Ngữ nghĩa cấp từ | Độ tương tự từ, suy luận lý thuyết |
| BERT Embedding | 768 | Ngữ nghĩa theo bối cảnh | Hiểu câu, hỏi đáp |
| OpenAI text-embedding-3 | 1536~3072 | Ngữ nghĩa sâu | RAG, tìm kiếm ngữ nghĩa |

---

## 2. Tính toán Độ tương tự: Các Vector Gần nhau Bao nhiêu?

Với biểu diễn vector, câu hỏi tự nhiên tiếp theo là: **làm thế nào để đo lường hai vector tương tự với nhau bao nhiêu?** Giống như đo lường hai thành phố trên bản đồ gần nhau bao nhiêu——bạn có thể đo khoảng cách đường thẳng, hoặc xem liệu hướng có giống nhau hay không.

<VectorSimilarityDemo />

::: tip Hai Phép đo Cốt lõi
- **Độ tương tự Cosine (Cosine Similarity)**：Đo lường liệu hướng của hai vector có giống nhau hay không, phạm vi giá trị [-1, 1]. 1 biểu thị hướng hoàn toàn giống nhau, 0 biểu thị trực giao (không liên quan), -1 biểu thị hoàn toàn đối lập. Lựa chọn hàng đầu cho so sánh ngữ nghĩa văn bản, vì nó không bị ảnh hưởng bởi độ dài vector.
- **Khoảng cách Euclid (Euclidean Distance)**：Đo lường khoảng cách đường thẳng giữa các điểm cuối của hai vector, phạm vi giá trị [0, ∞). 0 biểu thị trùng khớp hoàn toàn, giá trị càng lớn càng không tương tự. Thích hợp cho các kịch bản cần xem xét 'kích thước tuyệt đối'.
:::

| Phương pháp Đo lường | Trực quan Công thức | Phạm vi Giá trị | Kịch bản Ứng dụng |
|---------|---------|------|---------|
| Độ tương tự cosine | Nhìn hướng, bỏ qua độ dài | [-1, 1] | Tìm kiếm ngữ nghĩa văn bản, hệ thống khuyến nghị |
| Khoảng cách Euclid | Nhìn khoảng cách đường thẳng của điểm cuối | [0, ∞) | Đặc tính hình ảnh, phân tích cụm |
| Tích vô hướng | Hướng × Độ dài | (-∞, +∞) | Tính toán nhanh cho vector chuẩn hóa |
| Khoảng cách Manhattan | Khoảng cách dọc theo các trục tọa độ | [0, ∞) | Vector thưa thớt chiều cao |

---

## 3. Lập chỉ mục Vector: Cách Tìm kiếm Ở Mức Mili giây Giữa Hàng triệu Vector?

Giả sử bạn có 1 triệu tài liệu, mỗi tài liệu được chuyển đổi thành một vector 1536 chiều. Một người dùng đặt một câu hỏi, bạn cần tìm 10 cái tương tự nhất. Cách trực tiếp nhất là tính độ tương tự từng cái——nhưng điều này có nghĩa là phải thực hiện 1 triệu phép toán vector 1536 chiều, quá chậm.

Đây là vấn đề mà lập chỉ mục vector cần giải quyết: **đánh đổi không gian với thời gian, xây dựng cấu trúc chỉ mục thông qua xử lý trước, làm cho tốc độ tìm kiếm giảm từ O(n) xuống O(log n) xấp xỉ**.

<VectorIndexDemo />

::: tip Tìm kiếm Vũ phu so với Hàng xóm Gần nhất Xấp xỉ (ANN)
- **Tìm kiếm Vũ phu (Flat)**：So sánh từng cái, 100% chính xác nhưng chậm. Thích hợp cho các kịch bản có lượng dữ liệu nhỏ (< 100.000).
- **IVF (Lập chỉ mục Tệp Đảo ngược)**：Trước tiên chia không gian vector thành một số vùng (phân cụm), khi truy vấn chỉ tìm kiếm một vài vùng gần nhất. Giống như chia thư viện thành các khu theo chủ đề, tìm sách chỉ đi đến các khu liên quan.
- **HNSW (Đồ thị Thế giới Nhỏ Có thể Điều hướng Phân cấp)**：Xây dựng cấu trúc đồ thị nhiều lớp, điều hướng từng lớp từ độ hạt thô đến độ hạt mịn. Giống như trước tiên xem bản đồ thế giới để định vị đến quốc gia, sau đó xem bản đồ tỉnh, cuối cùng xem bản đồ đường phố.
- **PQ (Lượng hóa Tích)**：Nén các vector chiều cao thành mã hóa ngắn, hy sinh độ chính xác nhỏ để trao đổi với tiết kiệm bộ nhớ lớn. Thích hợp cho các bộ dữ liệu cực lớn.
:::

| Loại Chỉ mục | Tốc độ Xây dựng | Tốc độ Truy vấn | Tỷ lệ Gọi lại | Sử dụng Bộ nhớ | Quy mô Ứng dụng |
|---------|---------|---------|-------|---------|---------|
| Flat (vũ phu) | Không cần xây dựng | Chậm | 100% | Cao | < 100.000 |
| IVF | Trung bình | Nhanh | 95%+ | Trung bình | 100.000~10 triệu |
| HNSW | Chậm | Rất nhanh | 99%+ | Cao | 100.000~10 triệu |
| PQ | Trung bình | Nhanh | 90%+ | Rất thấp | > 10 triệu |
| IVF-PQ | Trung bình | Nhanh | 92%+ | Thấp | > 100 triệu |

---

## 4. Cơ sở dữ liệu Vector: Công cụ Lưu trữ Được Thiết kế Để Dành cho Vector

Với các vector và thuật toán chỉ mục, bạn cần một nơi để lưu trữ và quản lý chúng. Cơ sở dữ liệu truyền thống (MySQL, PostgreSQL) giỏi xử lý dữ liệu có cấu trúc, nhưng không tốt trong tìm kiếm độ tương tự cho các vector chiều cao. **Cơ sở dữ liệu vector được thiết kế đặc biệt cho kịch bản này.**

<VectorDatabaseDemo />

::: tip Khả năng Cốt lõi của Cơ sở dữ liệu Vector
1. **Lưu trữ Hiệu quả**：Định dạng lưu trữ được tối ưu hóa cho các vector dấu phẩy động chiều cao
2. **Tìm kiếm ANN**：Các thuật toán chỉ mục hàng xóm gần nhất xấp xỉ đa dạng được tích hợp sẵn (HNSW, IVF, v.v.)
3. **Lọc Siêu dữ liệu**：Hỗ trợ lọc theo nhãn, thời gian, v.v. trong khi tìm kiếm vector
4. **Cập nhật Thực thời**：Hỗ trợ thêm, xóa, sửa đổi vector động, không cần xây dựng lại toàn bộ chỉ mục
5. **Mở rộng Ngang**：Kiến trúc phân tán hỗ trợ quy mô vector cấp tỷ
:::

| Cơ sở dữ liệu | Loại | Đặc điểm | Kịch bản Ứng dụng |
|-------|------|------|---------|
| Pinecone | Dịch vụ đám mây được quản lý hoàn toàn | Không vận hành, sẵn dùng ngoài hộp | Nguyên mẫu nhanh, sản xuất quy mô trung bình |
| Milvus | Nguồn mở phân tán | Hiệu suất cao, có thể mở rộng | Môi trường sản xuất quy mô lớn |
| Chroma | Nguồn mở nhẹ | Nhúng, API sạch sẽ | Phát triển cục bộ, dự án nhỏ |
| Weaviate | Nguồn mở, bản địa đám mây | Có sẵn vector hóa, GraphQL | Kịch bản cần vector hóa tự động |
| Qdrant | Nguồn mở hiệu suất cao | Thực hiện Rust, lọc mạnh | Kịch bản cần lọc phức tạp |
| pgvector | Tiện ích mở rộng PG | Tái sử dụng cơ sở hạ tầng PG hiện có | Các đội đã có PostgreSQL |

---

## 5. Pipeline Từ đầu đến cuối: Quy trình Hoàn chỉnh Từ Văn bản Đến Tìm kiếm

Sau khi hiểu các thành phần, hãy chuỗi chúng lại với nhau và xem cách một hệ thống tìm kiếm vector hoàn chỉnh hoạt động.

Toàn bộ quy trình được chia thành hai luồng: **ghi ngoại tuyến** (chuyển đổi tài liệu thành vector và lưu trữ) và **truy vấn trực tuyến** (chuyển đổi câu hỏi thành vector để tìm kiếm).

<EmbeddingPipelineDemo />

::: tip Quy trình Ghi Ngoại tuyến
1. **Tải Tài liệu**：Đọc văn bản thô từ các nguồn khác nhau (PDF, trang web, cơ sở dữ liệu)
2. **Xử lý Văn bản Trước**：Làm sạch, loại bỏ nhiễu, chuẩn hóa (xóa các thẻ HTML, ký tự đặc biệt, v.v.)
3. **Phân Đoạn Văn bản**：Cắt văn bản dài thành các đoạn có kích thước phù hợp (200~500 token) theo chiến lược
4. **Vector Hóa**：Gọi mô hình nhúng (chẳng hạn như OpenAI text-embedding-3-small) để chuyển đổi từng đoạn thành vector
5. **Lưu Trữ trong Cơ sở dữ liệu Vector**：Viết vector cùng với văn bản gốc và siêu dữ liệu vào cơ sở dữ liệu
:::

::: tip Quy trình Truy vấn Trực tuyến
1. **Nhận Truy vấn**：Người dùng nhập câu hỏi bằng ngôn ngữ tự nhiên
2. **Vector hóa Truy vấn**：Sử dụng cùng một mô hình nhúng để chuyển đổi câu hỏi thành vector
3. **Tìm kiếm Độ tương tự**：Tìm kiếm các đoạn tài liệu Top-K tương tự nhất trong cơ sở dữ liệu vector
4. **Xử lý Sau**：Sắp xếp lại, khử trùng, lọc siêu dữ liệu
5. **Trả lại Kết quả**：Trả lại các đoạn tài liệu liên quan nhất cho người gọi (hoặc chuyển cho LLM để tạo câu trả lời)
:::

| Bước | Lựa chọn Chính | Giải pháp Được đề xuất |
|------|---------|---------|
| Mô hình Nhúng | Độ chính xác so với Giá so với Tốc độ | OpenAI text-embedding-3-small (tỷ giá tốt) |
| Chiến lược Phân đoạn | Độ hạt so với Tính hoàn chỉnh Ngữ nghĩa | Phân đoạn đệ quy, 200~500 token |
| Cơ sở dữ liệu Vector | Quy mô so với Chi phí Vận hành | Dùng Chroma cho dự án nhỏ, dùng Pinecone/Milvus cho sản xuất |
| Thước đo Độ tương tự | Ngữ nghĩa so với Chính xác | Độ tương tự cosine (ưu tiên cho kịch bản văn bản) |
| Giá trị Top-K | Tỷ lệ Gọi lại so với Nhiễu | Trước tiên lấy 20, sau khi sắp xếp lại lấy Top 5 |

---

## Tóm tắt

Embedding và Tìm kiếm Vector là cây cầu kết nối 'ngôn ngữ con người' và 'sự hiểu biết của máy', cũng là cơ sở hạ tầng cho các ứng dụng AI như RAG, tìm kiếm ngữ nghĩa, hệ thống khuyến nghị.

Xem lại các điểm chính của chương này:

1. **Bản chất của Embedding**：Ánh xạ văn bản vào không gian vector chiều cao, biến độ tương tự ngữ nghĩa thành khoảng cách không gian
2. **Thước đo Độ tương tự**：Độ tương tự cosine tập trung vào hướng (thích hợp cho văn bản), khoảng cách Euclid tập trung vào khoảng cách tuyệt đối
3. **Chỉ mục là Chìa khóa Hiệu suất**：HNSW và IVF làm cho tìm kiếm các vector cấp triệu xuống mức mili giây
4. **Lựa chọn Cơ sở dữ liệu Vector**：Sử dụng Chroma/pgvector cho dự án nhỏ, sử dụng Pinecone/Milvus cho môi trường sản xuất
5. **Tư duy Từ đầu đến cuối**：Từ tải tài liệu đến tìm kiếm cuối cùng, mỗi lựa chọn bước sẽ ảnh hưởng đến kết quả cuối cùng

## Đọc thêm

- [OpenAI Embeddings 文档](https://platform.openai.com/docs/guides/embeddings) - Hướng dẫn sử dụng mô hình nhúng chính thức
- [Pinecone Learning Center](https://www.pinecone.io/learn/) - Hướng dẫn hệ thống về cơ sở dữ liệu vector và tìm kiếm
- [FAISS Wiki](https://github.com/facebookresearch/faiss/wiki) - Tài liệu thư viện tìm kiếm vector nguồn mở của Facebook
- [Word2Vec 原始论文](https://arxiv.org/abs/1301.3781) - Công trình khai sáng kỷ nguyên Embedding
- [MTEB 排行榜](https://huggingface.co/spaces/mteb/leaderboard) - Bảng xếp hạng so sánh hiệu suất mô hình nhúng
