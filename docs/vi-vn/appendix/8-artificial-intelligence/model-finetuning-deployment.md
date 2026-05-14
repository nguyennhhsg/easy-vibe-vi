# Tinh chỉnh và Triển khai Mô hình

::: tip Lời tựa
**Mô hình lớn rất mạnh, nhưng nó không hiểu nghiệp vụ của bạn.** GPT-4 có thể viết thơ, có thể lập trình, nhưng nó không biết thuật ngữ sản phẩm của công ty bạn, không hiểu các quy chuẩn chuyên nghiệp của ngành bạn. Tinh chỉnh (Fine-tuning) chính là quá trình để mô hình lớn thông dụng "học" kiến thức chuyên môn của bạn — giống như cho một người am hiểu nhiều lĩnh vực tham dự khóa đào tạo trước khi nhận việc, để biến họ thành chuyên gia trong lĩnh vực của bạn.
:::

**Bài viết này sẽ dạy bạn những gì?**

Sau khi hoàn thành chương này, bạn sẽ có được:

- **Nhận thức quy trình**: Nắm vững toàn bộ đường ống tinh chỉnh từ chuẩn bị dữ liệu đến đưa mô hình lên sản phẩm
- **Kỹ thuật dữ liệu**: Hiểu các yêu cầu định dạng và tiêu chuẩn chất lượng của dữ liệu tinh chỉnh
- **Tinh chỉnh hiệu quả**: Hiểu nguyên lý và ưu điểm của các kỹ thuật tinh chỉnh hiệu quả tham số như LoRA
- **Nén mô hình**: Nắm vững cách các kỹ thuật lượng tử hóa cho phép mô hình lớn chạy trên phần cứng bình dân
- **Thực hành triển khai**: Hiểu các kiến trúc chính và chiến lược lựa chọn của dịch vụ mô hình

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|-------------------|
| **Chương 1** | Đường ống tinh chỉnh | Dữ liệu→Huấn luyện→Đánh giá→Triển khai |
| **Chương 2** | Dữ liệu huấn luyện | Định dạng dữ liệu, kiểm soát chất lượng |
| **Chương 3** | Tinh chỉnh LoRA | Thích nghi low-rank, hiệu quả tham số |
| **Chương 4** | Lượng tử hóa mô hình | FP16, INT8, INT4 |
| **Chương 5** | Triển khai mô hình | Dịch vụ suy luận, cổng API |

---

## 0. Bức tranh toàn cảnh: Tại sao cần tinh chỉnh?

Huấn luyện mô hình ngôn ngữ lớn chia thành hai giai đoạn: **tiền huấn luyện** và **tinh chỉnh**. Tiền huấn luyện là học khả năng ngôn ngữ trên dữ liệu thông dụng khổng lồ, tinh chỉnh là học khả năng chuyên môn trên dữ liệu nhiệm vụ cụ thể.

Có một cách nói: tiền huấn luyện giống như học đại học — học kiến thức đại cương, hiểu một chút về mọi thứ; tinh chỉnh giống như đào tạo trước khi nhận việc — học kỹ năng chuyên môn cho vị trí cụ thể.

::: tip Khi nào cần tinh chỉnh?
- **Định dạng đầu ra cụ thể**: Cần mô hình luôn xuất ra định dạng JSON cố định
- **Kiến thức lĩnh vực chuyên môn**: Y tế, pháp luật, tài chính và các lĩnh vực khác với thuật ngữ chuyên ngành và quy chuẩn
- **Chuyển đổi phong cách ngôn ngữ**: Cho mô hình trả lời bằng tông giọng, phong cách cụ thể (như cách nói của dịch vụ khách hàng)
- **Hỗ trợ ngôn ngữ thiểu số**: Cải thiện hiệu suất mô hình trên ngôn ngữ cụ thể
- **Tối ưu chi phí**: Dùng mô hình nhỏ tinh chỉnh thay thế gọi mô hình lớn, giảm chi phí suy luận
:::

---

## 1. Đường ống tinh chỉnh: Hành trình hoàn chỉnh từ dữ liệu đến trực tuyến

Tinh chỉnh không phải là "ném dữ liệu cho mô hình xong là được". Nó là một quy trình kỹ thuật nghiêm ngặt, mỗi khâu đều sẽ ảnh hưởng đến hiệu quả cuối cùng.

<FinetuningPipelineDemo />

::: tip Năm giai đoạn của tinh chỉnh
1. **Chuẩn bị dữ liệu**: Thu thập, làm sạch, ghi chú dữ liệu huấn luyện, đây là khâu tốn thời gian nhất cũng là quan trọng nhất
2. **Lựa chọn mô hình**: Chọn mô hình cơ sở (Base Model) phù hợp, như Llama 3, Qwen, Mistral
3. **Cấu hình huấn luyện**: Đặt tỷ lệ học tập, kích thước batch, số epoch và các siêu tham số khác
4. **Thực thi huấn luyện**: Chạy huấn luyện trên GPU, theo dõi đường cong loss và chỉ số đánh giá
5. **Đánh giá và triển khai**: Đánh giá hiệu quả trên tập kiểm tra, triển khai thành dịch vụ API sau khi đạt yêu cầu
:::

| Giai đoạn | Hành động chính | Cạm bẫy thường gặp |
|-----------|-----------------|-------------------|
| Chuẩn bị dữ liệu | Làm sạch, loại bỏ trùng lặp, định dạng | Chất lượng dữ liệu kém dẫn đến mô hình "học sai" |
| Lựa chọn mô hình | Đánh giá khả năng mô hình cơ sở | Mô hình quá lớn không huấn luyện được, quá nhỏ hiệu quả kém |
| Cấu hình huấn luyện | Điều chỉnh siêu tham số | Tỷ lệ học tập quá cao dẫn đến quên nội dung trước |
| Thực thi huấn luyện | Theo dõi loss và chỉ số | Quá khớp, huấn luyện không hội tụ |
| Đánh giá và triển khai | Kiểm tra A/B, phát hành từng phần | Rò rỉ tập kiểm tra dẫn đến đánh giá thổi phồng |

---

## 2. Dữ liệu huấn luyện: Trần cao nhất của hiệu quả tinh chỉnh

Trong tinh chỉnh có một câu nói cổ điển: **"Garbage in, garbage out"**. Chất lượng dữ liệu huấn luyện trực tiếp quyết định giới hạn trên của hiệu quả tinh chỉnh. Hiệu quả của 100 điểm dữ liệu chất lượng cao thường tốt hơn 10000 điểm dữ liệu chất lượng thấp.

<TrainingDataDemo />

::: tip Ba định dạng dữ liệu tinh chỉnh thông dụng
1. **Định dạng chỉ dẫn (Instruction)**: Định dạng phổ biến nhất, chứa ba trường instruction (chỉ dẫn), input (đầu vào), output (đầu ra mong muốn). Thích hợp để huấn luyện mô hình tuân theo chỉ dẫn.
2. **Định dạng đối thoại (Chat)**: Dạng đối thoại nhiều vòng, chứa danh sách tin nhắn với các vai trò system, user, assistant. Thích hợp để huấn luyện chatbot.
3. **Định dạng hoàn thành (Completion)**: Cặp prompt-completion đơn giản, thích hợp cho các cảnh sinh mã, hoàn thành mã, v.v.
:::

| Khía cạnh chất lượng dữ liệu | Giải thích | Phương pháp kiểm tra |
|---------------------------|-----------|-------------------|
| Chính xác | Câu trả lời phải đúng không có sai sót | Xem xét thủ công, xác thực chuyên gia |
| Nhất quán | Phong cách trả lời câu hỏi tương tự nhất quán | Kiểm tra so sánh lấy mẫu |
| Đa dạng | Bao phủ đủ nhiều cảnh và biến thể | Thống kê phân bố loại câu hỏi |
| Loại bỏ trùng lặp | Tránh mẫu trùng lặp dẫn đến quá khớp | Loại bỏ trùng lặp văn bản, loại bỏ trùng lặp ngữ nghĩa |
| Lượng dữ liệu | Thường 500~5000 dữ liệu chất lượng cao là đủ | Bắt đầu từ ít, tăng dần |

---

## 3. LoRA: Đạt 90% hiệu quả chỉ với 1% tham số

Tinh chỉnh toàn bộ (Full Fine-tuning) cần cập nhật tất cả tham số của mô hình — đối với mô hình 70B tham số, điều này có nghĩa là cần hàng trăm GB bộ nhớ GPU và rất nhiều khả năng tính toán GPU. Đối với hầu hết các nhóm, điều này không thực tế.

LoRA (Low-Rank Adaptation) cung cấp một giải pháp tuyệt vời: **đóng băng các tham số mô hình gốc, chỉ huấn luyện một nhóm ma trận low-rank mới**. Lượng tham số của các ma trận này thường chỉ chiếm 0,1%~1% mô hình gốc, nhưng có thể đạt hiệu quả gần bằng tinh chỉnh toàn bộ.

<LoRADemo />

::: tip Ý tưởng cốt lõi của LoRA
Ma trận trọng số của mô hình gốc W là một ma trận khổng lồ (ví dụ 4096×4096). LoRA không sửa đổi trực tiếp W, mà thêm một "tuyến đường phụ" bên cạnh: W' = W + BA, trong đó B và A là hai ma trận nhỏ (ví dụ 4096×8 và 8×4096). Khi huấn luyện chỉ cập nhật B và A, W gốc giữ nguyên.
- **Hạng (Rank)**: Giá trị r càng lớn, khả năng biểu diễn càng mạnh, nhưng lượng tham số cũng càng nhiều. Thường r=8~64 là đủ
- **Hợp nhất triển khai**: Sau khi huấn luyện xong, có thể hợp nhất BA quay lại W, suy luận không có chi phí bổ sung
:::

| Phương pháp tinh chỉnh | Tham số có thể huấn luyện | Nhu cầu bộ nhớ | Tốc độ huấn luyện | Hiệu quả |
|----------------------|--------------------------|-------------|-----------------|---------|
| Tinh chỉnh toàn bộ | 100% | Cực cao | Chậm | Tốt nhất |
| LoRA | 0,1%~1% | Thấp | Nhanh | Gần tinh chỉnh toàn bộ |
| QLoRA | 0,1%~1% | Thấp hơn | Trung bình | Hơi thấp hơn LoRA |
| Prompt Tuning | < 0,01% | Cực thấp | Rất nhanh | Hạn chế |

---

## 4. Lượng tử hóa mô hình: "Giảm cân" cho mô hình lớn

Một mô hình 70B tham số, nếu lưu trữ bằng FP32 (số thực dấu phẩy động 32 bit), cần 280GB bộ nhớ GPU — không có vài GPU hàng đầu thì hoàn toàn không chạy được. Kỹ thuật lượng tử hóa (Quantization) nén mô hình bằng cách giảm độ chính xác của dữ liệu số, cho phép mô hình lớn chạy trên phần cứng bình dân.

<ModelQuantizationDemo />

::: tip Sự cân bằng cốt lõi của lượng tử hóa
Lượng tử hóa bản chất là **đánh đổi độ chính xác để lấy không gian**. FP32 → FP16 gần như không có tổn thất, INT8 có tổn thất rất nhỏ, INT4 sẽ có sự suy giảm chất lượng rõ rệt nhưng thường có thể chấp nhận được. Chìa khóa là tìm được điểm cân bằng tốt nhất cho cảnh của bạn.
- **FP16 (nửa độ chính xác)**: Kích thước giảm nửa, chất lượng gần như không bị tổn thất, là lựa chọn mặc định cho huấn luyện và suy luận
- **INT8 (8 bit nguyên)**: Kích thước lại giảm nửa, tổn thất chất lượng rất nhỏ, thích hợp cho hầu hết các cảnh suy luận
- **INT4 (4 bit nguyên)**: Kích thước chỉ bằng 1/8 FP32, có tổn thất chất lượng nhất định, thích hợp cho thiết bị tài nguyên hạn chế
:::

| Độ chính xác | Byte mỗi tham số | Kích thước mô hình 70B | Tổn thất chất lượng | Cảnh áp dụng |
|-------------|-----------------|----------------------|-------------------|-----------|
| FP32 | 4 byte | ~280 GB | Không | Cơ sở huấn luyện |
| FP16 | 2 byte | ~140 GB | Gần như không | Huấn luyện và suy luận tiêu chuẩn |
| INT8 | 1 byte | ~70 GB | Rất nhỏ | Suy luận sản phẩm |
| INT4 | 0,5 byte | ~35 GB | Có thể chấp nhận | Thiết bị biên, triển khai cục bộ |

---

## 5. Triển khai mô hình: Từ phòng thí nghiệm đến môi trường sản phẩm

Mô hình đã huấn luyện, đã nén lượng tử, bước cuối cùng là triển khai nó thành dịch vụ có thể gọi. Triển khai mô hình không chỉ là "chạy mô hình", còn liên quan đến xử lý đồng thời, cân bằng tải, kiểm soát chi phí và các vấn đề kỹ thuật khác.

<ModelServingDemo />

::: tip Ba phương án triển khai chính
1. **Nhà cung cấp dịch vụ API**: Trực tiếp sử dụng API của OpenAI, Anthropic và các nhà cung cấp khác. Không có vận hành, trả tiền theo token, thích hợp để xác thực nhanh và sử dụng quy mô vừa.
2. **Dịch vụ suy luận tự lưu trữ**: Dùng khung như vLLM, TGI để triển khai trên máy chủ GPU của riêng bạn. Chi phí có thể kiểm soát, dữ liệu không rời khỏi miền, thích hợp cho cảnh có yêu cầu quyền riêng tư hoặc gọi quy mô lớn.
3. **Suy luận không máy chủ**: Sử dụng nền tảng như AWS SageMaker, Replicate, tính tiền theo yêu cầu, tự động mở rộng. Thích hợp cho cảnh lưu lượng giao thông biến động lớn.
:::

| Phương án triển khai | Mô hình chi phí | Độ trễ | Độ phức tạp vận hành | Cảnh áp dụng |
|-------------------|-----------------|--------|-------------------|-----------|
| Nhà cung cấp dịch vụ API | Tính tiền theo token | Trung bình | Không | Nguyên mẫu nhanh, quy mô vừa |
| Tự triển khai vLLM | Chi phí thuê GPU | Thấp | Cao | Quy mô lớn, nhạy cảm quyền riêng tư |
| Không máy chủ | Tính tiền theo yêu cầu | Khởi động lạnh cao hơn | Thấp | Lưu lượng giao thông biến động lớn |
| Triển khai biên | Đầu tư phần cứng một lần | Cực thấp | Trung bình | Cảnh ngoại tuyến, IoT |

---

## Tóm tắt

Tinh chỉnh mô hình và triển khai là khâu then chốt để biến mô hình lớn từ "công cụ thông dụng" thành "trợ lý chuyên môn". Từ chuẩn bị dữ liệu đến đưa mô hình lên sản phẩm, mỗi bước đều cần tư duy kỹ thuật và thực hành.

Nhìn lại các điểm chính của chương:

1. **Tinh chỉnh là đào tạo trước khi nhận việc**: Cho mô hình thông dụng học kiến thức và mô hình hành vi của lĩnh vực cụ thể
2. **Chất lượng dữ liệu quyết định giới hạn trên**: 100 dữ liệu chất lượng cao tốt hơn 10000 dữ liệu chất lượng thấp
3. **LoRA là vua hiệu quả**: Dùng chưa tới 1% tham số để đạt hiệu quả gần bằng tinh chỉnh toàn bộ
4. **Lượng tử hóa là vũ khí triển khai**: Lượng tử hóa INT4 cho phép mô hình 70B chạy trên một GPU duy nhất
5. **Phương án triển khai thích hợp với bối cảnh**: Xác thực nhanh dùng API, quy mô lớn dùng tự triển khai, lưu lượng biến động dùng không máy chủ

## Đọc mở rộng

- [Hugging Face PEFT Documentation](https://huggingface.co/docs/peft) - Tài liệu thư viện tinh chỉnh hiệu quả tham số chính thức
- [vLLM Documentation](https://docs.vllm.ai/) - Công cụ suy luận LLM hiệu năng cao
- [Unsloth](https://github.com/unslothai/unsloth) - Khung LoRA tinh chỉnh tăng tốc 2x
- [GGUF Format Specification](https://github.com/ggerganov/ggml/blob/master/docs/gguf.md) - Định dạng mô hình lượng tử hóa sử dụng bởi llama.cpp
- [OpenAI Fine-tuning Guide](https://platform.openai.com/docs/guides/fine-tuning) - Hướng dẫn tinh chỉnh chính thức OpenAI
