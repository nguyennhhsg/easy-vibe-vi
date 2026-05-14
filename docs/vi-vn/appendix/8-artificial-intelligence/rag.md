# RAG: Truy xuất Tăng cường Tạo sinh

::: tip Lời nói đầu
**Tại sao ChatGPT đôi khi "nói chuyện một cách sâu sắc nhưng hoàn toàn sai"?** Kiến thức của mô hình ngôn ngữ lớn đến từ dữ liệu huấn luyện, nhưng dữ liệu huấn luyện có thời hạn cắt, và cũng không bao gồm các tài liệu nội bộ của công ty bạn. RAG (Retrieval-Augmented Generation - Truy xuất Tăng cường Tạo sinh) là công nghệ cốt lõi để giải quyết vấn đề này — cho phép AI "tìm tài liệu" trước khi trả lời.
:::

**Bài viết này sẽ dạy bạn điều gì?**

Sau khi hoàn thành chương này, bạn sẽ có:

- **Hiểu biết khái niệm cốt lõi**: Biết RAG là gì, tại sao cần nó, và cách nó giải quyết vấn đề "ảo giác" của mô hình lớn
- **Nhận biết quy trình toàn bộ**: Nắm vững toàn bộ quy trình từ tải tài liệu, chia khúc, vector hóa đến truy xuất, tạo sinh
- **Khả năng lựa chọn công nghệ**: Hiểu được ưu nhược điểm của các chiến lược chia khúc khác nhau, các phương pháp truy xuất, có thể lựa chọn dựa trên kịch bản
- **Góc nhìn tiến hóa kiến trúc**: Hiểu được quá trình tiến hóa của RAG từ Naive đến Advanced rồi đến Modular
- **Khả năng ra quyết định thực tiễn**: Biết khi nào nên dùng RAG, khi nào nên dùng fine-tuning

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|------------------|
| **Chương 1** | Quy trình cơ bản của RAG | Ba giai đoạn: indexing, truy xuất, tạo sinh |
| **Chương 2** | Chiến lược chia khúc văn bản | Chia khúc cố định, chia khúc ngữ nghĩa, chia khúc đệ quy |
| **Chương 3** | Công nghệ truy xuất | Truy xuất vector, truy xuất từ khóa, truy xuất kết hợp |
| **Chương 4** | Tiến hóa kiến trúc | Naive RAG → Advanced RAG → Modular RAG |
| **Chương 5** | RAG vs Fine-tuning | So sánh các kịch bản áp dụng của hai phương pháp |

---

## 0. Toàn cảnh: Tại sao mô hình lớn cần "tìm tài liệu"?

Hãy tưởng tượng bạn là một giáo sư uyên bác, đã đọc vô số quyển sách. Nhưng nếu ai đó hỏi bạn "Dữ liệu bán hàng của công ty hôm qua là bao nhiêu", bạn chắc chắn không thể trả lời — vì thông tin này không có trong các quyển sách bạn đã đọc.

Mô hình ngôn ngữ lớn đang phải đối mặt với cùng một tình huống khó xử:

- **Kiến thức có thời hạn**: Dữ liệu huấn luyện của GPT-4 kết thúc vào một thời điểm nhất định, những gì xảy ra sau đó nó không biết
- **Thiếu kiến thức riêng tư**: Tài liệu nội bộ của công ty bạn, sách hướng dẫn sản phẩm, dữ liệu khách hàng, mô hình chưa bao giờ gặp
- **Dễ tạo ra ảo giác**: Khi mô hình không chắc chắn về câu trả lời, nó có xu hướng "phát minh" một câu trả lời có vẻ hợp lý

::: tip Ý tưởng cốt lõi của RAG
Giải pháp của RAG rất trực quan: **Trước khi để mô hình trả lời, hãy giúp nó tìm tài liệu tham khảo có liên quan**. Giống như kỳ thi mở sách — bạn không cần nhớ tất cả kiến thức, chỉ cần biết đi tìm ở đâu, cách tìm thế nào.

RAG = Truy xuất (Retrieval) + Tăng cường (Augmented) + Tạo sinh (Generation)
:::

---

## 1. Quy trình cơ bản của RAG: Indexing, Truy xuất, Tạo sinh

Quy trình làm việc của RAG có thể chia thành hai giai đoạn: **Indexing ngoại tuyến** và **Truy vấn trực tuyến**.

Giai đoạn ngoại tuyến giống như công việc phân loại sách trong thư viện — phân loại, đánh số, sắp xếp tất cả các quyển sách để dễ tìm kiếm sau này. Giai đoạn trực tuyến là quá trình bạn đọc đến thư viện tìm tài liệu — tìm sách có liên quan dựa trên câu hỏi, sau đó tổng hợp thông tin để đưa ra câu trả lời.

<RAGPipelineDemo />

::: tip Ba giai đoạn cốt lõi
1. **Giai đoạn Indexing**: Tải tài liệu gốc, làm sạch, chia khúc, sau đó chuyển đổi thành vector thông qua mô hình embedding, lưu trữ vào cơ sở dữ liệu vector. Đây là công việc chuẩn bị một lần.
2. **Giai đoạn Truy xuất**: Khi người dùng đặt câu hỏi, chuyển đổi câu hỏi thành vector, tìm kiếm các đoạn tài liệu tương tự nhất trong cơ sở dữ liệu vector.
3. **Giai đoạn Tạo sinh**: Ghép các đoạn tài liệu được truy xuất và câu hỏi của người dùng thành Prompt, gửi cho mô hình lớn để tạo ra câu trả lời cuối cùng.
:::

| Giai đoạn | Đầu vào | Đầu ra | Công nghệ chính |
|-----------|---------|--------|-----------------|
| Indexing | Tài liệu gốc | Cơ sở dữ liệu vector | Chia khúc văn bản, mô hình embedding |
| Truy xuất | Câu hỏi của người dùng | Top-K đoạn tài liệu | Độ tương tự vector, sắp xếp lại |
| Tạo sinh | Câu hỏi + Bối cảnh | Câu trả lời cuối cùng | Kỹ thuật Prompt, LLM |

---

## 2. Chia khúc văn bản: Cho con voi vào tủ lạnh

Chia khúc văn bản là bước dễ bị bỏ qua nhất trong RAG, nhưng có tác động lớn nhất đến kết quả. Tại sao cần chia khúc? Vì cửa sổ bối cảnh của mô hình lớn có hạn, chúng ta không thể cho cả một cuốn sách vào. Quan trọng hơn, **chất lượng chia khúc trực tiếp xác định chất lượng truy xuất**.

Tưởng tượng bạn đang tìm một điểm kiến thức nào đó trong một cuốn sách ở thư viện. Nếu cả cuốn sách là một "khúc", việc truy xuất nó cũng vô dụng — bạn vẫn phải lật từng trang. Nhưng nếu chia khúc theo chương thậm chí theo đoạn, bạn có thể định vị chính xác nội dung bạn cần.

<ChunkingStrategyDemo />

::: tip Lựa chọn chiến lược chia khúc
- **Chia khúc kích thước cố định**: Cắt dựa trên số ký tự hoặc token, đơn giản nhưng có thể cắt đứt ngữ nghĩa
- **Chia khúc đệ quy**: Trước tiên chia theo đoạn, nếu đoạn quá dài thì chia theo câu, giữ nguyên tính toàn vẹn ngữ nghĩa
- **Chia khúc ngữ nghĩa**: Sử dụng mô hình embedding để xác định ranh giới ngữ nghĩa, cắt tại vị trí độ tương tự đột ngột thay đổi
- **Chia khúc dựa trên cấu trúc tài liệu**: Sử dụng thông tin cấu trúc như tiêu đề Markdown, thẻ HTML để chia khúc

Không có chiến lược chia khúc "tốt nhất", chỉ có chiến lược phù hợp nhất với dữ liệu của bạn. Thường khuyến nghị bắt đầu với chia khúc đệ quy, kích thước chunk 200-500 tokens, overlap 10-20%.
:::

---

## 3. Công nghệ truy xuất: Cách tìm nội dung liên quan nhất?

Sau khi hoàn thành chia khúc, câu hỏi chính tiếp theo là: **Khi người dùng đặt một câu hỏi, làm cách nào để tìm từ hàng nghìn hay hàng triệu đoạn tài liệu những đoạn liên quan nhất?**

Điều này giống như tìm sách trong một thư viện khổng lồ. Bạn có thể tìm kiếm theo từ khóa tên sách (truy xuất từ khóa), hoặc mô tả nội dung bạn muốn và để thủ thư giúp tìm (truy xuất ngữ nghĩa), cách tốt nhất là kết hợp cả hai (truy xuất kết hợp).

<RetrievalDemo />

| Phương pháp truy xuất | Nguyên lý | Ưu điểm | Nhược điểm |
|-----------------|----------|---------|-----------|
| Truy xuất từ khóa (BM25) | Dựa trên tần suất từ và tần suất nghịch đảo tài liệu | Khớp chính xác, tốc độ nhanh | Không thể hiểu ngữ nghĩa, từ đồng nghĩa bị mất |
| Truy xuất vector | Dựa trên độ tương tự cosine của vector embedding | Hiểu ngữ nghĩa, hỗ trợ khớp mơ hồ | Không nhạy cảm với các thuật ngữ chuyên dụng |
| Truy xuất kết hợp | Kết hợp kết quả truy xuất từ khóa và vector | Kết hợp chính xác và ngữ nghĩa | Cần điều chỉnh trọng số, độ phức tạp cao |

::: tip Sắp xếp lại (Reranking)
Sau khi truy xuất các tài liệu ứng viên, thường còn cần một bước "sắp xếp lại". Truy xuất ban đầu nhằm mục đích tăng tỷ lệ thu hồi (cố gắng không bỏ sót), sắp xếp lại nhằm mục đích tăng độ chính xác (đặt những cái liên quan nhất lên đầu). Các mô hình sắp xếp lại thường dùng bao gồm Cohere Rerank, BGE Reranker, v.v., chúng sử dụng bộ mã hóa chéo để cho điểm query-document pair một cách tinh tế.
:::

---

## 4. Tiến hóa kiến trúc: Từ đơn giản đến thông minh

Công nghệ RAG trong vòng hai năm ngắn ngủi đã trải qua ba giai đoạn tiến hóa, mỗi giai đoạn đều giải quyết những điểm yếu của giai đoạn trước.

<RAGArchitectureDemo />

::: tip So sánh ba thế hệ kiến trúc RAG
- **Naive RAG (2023)**: Quy trình "indexing → truy xuất → tạo sinh" cơ bản nhất, triển khai đơn giản nhưng hiệu quả hạn chế. Vấn đề bao gồm: chất lượng truy xuất không ổn định, không thể xử lý truy vấn phức tạp, dễ đưa vào bối cảnh nhiều tiếng ồn.
- **Advanced RAG (2024)**: Trên cơ sở Naive RAG thêm các bước tối ưu hóa như viết lại truy vấn, truy xuất kết hợp, sắp xếp lại, nén bối cảnh, v.v., tăng đáng kể độ chính xác truy xuất và chất lượng tạo sinh.
- **Modular RAG (2025)**: Tách RAG thành các mô-đun có thể cắm được, hỗ trợ các khả năng nâng cao như định tuyến quyết định, truy xuất thích ứng, tự phản ánh. Có thể động lựa chọn quy trình xử lý tối ưu dựa trên loại truy vấn.
:::

---

## 5. RAG vs Fine-tuning: Nên chọn cái nào?

Khi bạn muốn để mô hình lớn thành thạo kiến thức của một lĩnh vực cụ thể, thường có hai con đường: RAG và Fine-tuning (Tinh chỉnh). Chúng không loại trừ lẫn nhau, mà bổ sung cho nhau.

Lấy một ví dụ: **Fine-tuning giống như cho sinh viên đi lớp đào tạo**, nội hóa kiến thức vào não; **RAG giống như phát sách tham khảo cho sinh viên**, có thể lật lại khi làm bài. Cả hai cách đều có ưu nhược điểm, chìa khóa là xem nhu cầu cụ thể của bạn là gì.

<RAGvsFineTuningDemo />

| Khía cạnh | RAG | Fine-tuning |
|----------|-----|-------------|
| Cập nhật kiến thức | Cập nhật thực tế, chỉ cần thay đổi tài liệu | Cần huấn luyện lại |
| Chi phí | Thấp (không cần huấn luyện GPU) | Cao (cần tài nguyên huấn luyện) |
| Khả năng giải thích | Cao (có thể truy tìm nguồn) | Thấp (kiến thức nội hóa trong trọng số) |
| Kịch bản áp dụng | Trả lời câu hỏi từ kho kiến thức, truy xuất tài liệu | Chuyển giao phong cách, tối ưu hóa nhiệm vụ cụ thể |
| Kiểm soát ảo giác | Tốt hơn (có căn cứ tham khảo) | Bình thường (vẫn có thể ảo giác) |

::: tip Lời khuyên thực tiễn
Trong hầu hết kịch bản, **hãy thử RAG trước**. Ưu điểm của RAG là: không cần huấn luyện, kiến thức có thể cập nhật thực tế, câu trả lời có thể truy tìm được nguồn. Chỉ khi bạn cần thay đổi "hành vi" của mô hình (ví dụ như định dạng đầu ra, phong cách ngôn ngữ, cách suy luận), hãy xem xét fine-tuning. Phương pháp mạnh mẽ nhất thường là kết hợp **RAG + Fine-tuning**.
:::

---

## Tóm tắt

RAG là một trong những công nghệ thực tiễn nhất để làm cho mô hình lớn "hạ cánh" hiện nay. Giá trị cốt lõi của nó nằm ở: giúp câu trả lời của mô hình có căn cứ, kiến thức có thể cập nhật thực tế, ảo giác có thể kiểm soát hiệu quả.

Hãy ôn lại các điểm chính của chương:

1. **Vấn đề cốt lõi mà RAG giải quyết**: Kiến thức mô hình lỗi thời, thiếu dữ liệu riêng tư, dễ ảo giác
2. **Quy trình ba giai đoạn**: Indexing (chuẩn bị ngoại tuyến) → Truy xuất (tìm kiếm trực tuyến) → Tạo sinh (tổng hợp câu trả lời)
3. **Chia khúc là nền tảng**: Chất lượng chia khúc trực tiếp xác định chất lượng truy xuất, lựa chọn chiến lược chia khúc phù hợp là rất quan trọng
4. **Truy xuất là chìa khóa**: Truy xuất kết hợp + sắp xếp lại là kết hợp hiệu quả nhất hiện nay
5. **Kiến trúc đang tiến hóa**: Từ Naive RAG đến Modular RAG, hệ thống ngày càng thông minh và linh hoạt
6. **RAG và Fine-tuning bổ sung nhau**: Trong hầu hết kịch bản hãy thử RAG trước, khi cần thay đổi hành vi của mô hình thì mới xem xét fine-tuning

## Đọc mở rộng

- [Hướng dẫn RAG của LangChain](https://python.langchain.com/docs/tutorials/rag/) - Hướng dẫn thực tiễn framework RAG phổ biến nhất
- [Tài liệu LlamaIndex](https://docs.llamaindex.ai/) - Framework tập trung vào RAG, cung cấp nhiều connector dữ liệu
- [Bài báo Survey về RAG](https://arxiv.org/abs/2312.10997) - Tổng quan toàn diện về công nghệ RAG
- [Chiến lược Chia khúc](https://www.pinecone.io/learn/chunking-strategies/) - Giải thích chi tiết các chiến lược chia khúc của Pinecone
- [So sánh Cơ sở dữ liệu Vector](https://superlinked.com/vector-db-comparison) - So sánh chức năng các cơ sở dữ liệu vector hàng đầu
