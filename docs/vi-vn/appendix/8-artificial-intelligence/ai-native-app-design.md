# Thiết kế ứng dụng AI native

::: tip Lời mở đầu
**Tại sao một số sản phẩm AI làm bạn choáng ngợp, nhưng một số chỉ là "bọc ChatGPT"?** Sự khác biệt không nằm ở mô hình mạnh như thế nào, mà ở chỗ liệu sản phẩm có được thiết kế từ cốt lõi xung quanh các đặc tính của AI hay không. Ứng dụng AI native không phải là thêm một "hộp trò chuyện" vào ứng dụng truyền thống, mà là suy nghĩ lại toàn bộ tương tác người dùng, kiến trúc hệ thống và logic sản phẩm theo một mô hình hoàn toàn mới.
:::

**Chương này sẽ dạy cho bạn những gì?**

Sau khi hoàn thành chương này, bạn sẽ có được:

- **Nhận thức về mô hình**: Hiểu rõ sự khác biệt cốt lõi giữa ứng dụng AI native và ứng dụng truyền thống
- **Nguyên tắc thiết kế**: Nắm vững các nguyên tắc cốt lõi của thiết kế sản phẩm AI native
- **Kỹ thuật Prompt**: Tìm hiểu cách thiết kế Prompt chất lượng cao để điều khiển khả năng AI
- **Các mô hình tương tác**: Nhận biết các mô hình tương tác mới của thời đại AI
- **Tư duy kiến trúc**: Hiểu quy trình xử lý yêu cầu và kiến trúc hệ thống của ứng dụng AI

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|------------------|
| **Chương 1** | So sánh kiến trúc | Ứng dụng truyền thống vs ứng dụng AI native |
| **Chương 2** | Nguyên tắc thiết kế | Tư duy AI-First, thiết kế không chắc chắn |
| **Chương 3** | Kỹ thuật Prompt | Lệnh gợi ý hệ thống, thiết kế mẫu |
| **Chương 4** | Các mô hình tương tác | Đầu ra luồng, đa phương thức, Agent |
| **Chương 5** | Quy trình yêu cầu | Vòng đời hoàn chỉnh của ứng dụng AI |

---

## 0. Khung nhìn toàn cảnh: Từ "thêm AI" đến "AI native"

Trong vài năm qua, con đường AI hóa của nhiều sản phẩm là thế này: có một ứng dụng sẵn sàng, rồi thêm một nút "AI assistant" vào một góc nào đó. Cách tiếp cận này giống như lắp một động cơ lên xe ngựa — nó chạy được, nhưng không bằng thiết kế một chiếc ô tô từ đầu.

**Ứng dụng AI native** là một cách suy nghĩ sản phẩm hoàn toàn mới: từ dòng code đầu tiên, bạn coi AI là khả năng cốt lõi trong thiết kế, thay vì một tính năng được thêm vào sau.

::: tip Ứng dụng truyền thống vs ứng dụng AI native
- **Ứng dụng truyền thống**: Hành động của người dùng → logic xác định → kết quả xác định. Mỗi lần click "Đặt hàng", quy trình hoàn toàn giống nhau.
- **Ứng dụng AI native**: Ý định người dùng → AI hiểu → kết quả theo xác suất. Cùng một câu hỏi, mỗi lần trả lời có thể khác một chút.
- **Sự thay đổi cốt lõi**: Từ "viết quy tắc" đến "mô tả ý định", từ "xác định" đến "theo xác suất", từ "giao diện hoạt động" đến "giao diện đối thoại".
:::

---

## 1. So sánh kiến trúc: Hai thế giới hoàn toàn khác nhau

Kiến trúc của ứng dụng truyền thống là mô hình "yêu cầu-phản hồi": người dùng click nút, backend thực thi logic xác định, trả về kết quả xác định. Toàn bộ quá trình có thể dự đoán được, có thể kiểm thử, có thể lặp lại.

Ứng dụng AI native giới thiệu một vai trò hoàn toàn mới — **Mô hình ngôn ngữ lớn**. Nó giống như một "tầng trung gian thông minh", nhận đầu vào bằng ngôn ngữ tự nhiên, xuất ra kết quả bằng ngôn ngữ tự nhiên. Điều này mang lại những thay đổi cơ bản về kiến trúc.

<AINativeArchDemo />

| Khía cạnh | Ứng dụng truyền thống | Ứng dụng AI native |
|----------|----------------------|-------------------|
| Cách nhập liệu | Biểu mẫu, nút, hộp thả xuống | Ngôn ngữ tự nhiên, hình ảnh, giọng nói |
| Logic xử lý | if-else, engine quy tắc | Suy luận LLM, được điều khiển bởi Prompt |
| Đặc tính đầu ra | Xác định, có thể lặp lại | Theo xác suất, có thể khác mỗi lần |
| Đặc tính trễ | Mili giây | Giây (cần đầu ra luồng) |
| Xử lý lỗi | Mã lỗi rõ ràng | Ảo tưởng, từ chối trả lời, trả lời sai câu |
| Mô hình chi phí | Tài nguyên tính toán cố định | Tính phí theo token, chi phí biến động lớn |

::: tip Ba giai đoạn của sự tiến hóa kiến trúc
1. **Loại được tăng cường bằng AI**: Nhúng chức năng AI vào ứng dụng hiện tại (như tự động hoàn thành, gợi ý thông minh)
2. **Loại cộng tác với AI**: AI là cách tương tác cốt lõi, nhưng vẫn có giao diện truyền thống làm hỗ trợ (như Notion AI, GitHub Copilot)
3. **Loại AI native**: Toàn bộ sản phẩm được xây dựng xung quanh AI, bỏ đi AI thì sản phẩm không còn tồn tại (như ChatGPT, Cursor, Midjourney)
:::

---

## 2. Nguyên tắc thiết kế: "Hiến pháp" của sản phẩm AI native

Thiết kế ứng dụng AI native không thể sao chép cách suy nghĩ thiết kế của phần mềm truyền thống. Tính xác suất, trễ và tính không thể dự đoán của AI đòi hỏi chúng ta phải thiết lập một bộ nguyên tắc thiết kế hoàn toàn mới.

<AIDesignPrincipleDemo />

::: tip Năm nguyên tắc thiết kế cốt lõi
1. **Chấp nhận sự không chắc chắn**: Đầu ra của AI không phải 100% đáng tin cậy, thiết kế sản phẩm phải xem xét tình huống "AI có thể sai". Cung cấp chức năng chỉnh sửa, thử lại, phản hồi, giữ cho người dùng luôn có quyền kiểm soát.
2. **Xây dựng lòng tin từng bước**: Đừng để AI đưa ra quyết định rủi ro cao từ lúc đầu. Bắt đầu từ các tình huống rủi ro thấp để xây dựng lòng tin người dùng, sau đó từng bước mở rộng quyền tự chủ của AI.
3. **Minh bạch và có thể giải thích**: Giúp người dùng biết AI đang làm gì, tại sao lại làm như vậy. Trình bày quá trình suy luận, trích dẫn nguồn, ghi chú mức độ tin cậy.
4. **Hợp tác giữa người và máy**: AI không phải là sự thay thế, mà là sự tăng cường. Thiết kế tốt nhất là AI tạo bản nháp ban đầu, con người thực hiện phê duyệt cuối cùng.
5. **Suy giảm tối ưu**: Khi dịch vụ AI không khả dụng hoặc kết quả không lý tưởng, sản phẩm vẫn có thể sử dụng được. Luôn có Kế hoạch B.
:::

---

## 3. Kỹ thuật Prompt: "Ngôn ngữ lập trình" của ứng dụng AI

Trong ứng dụng truyền thống, bạn dùng code để bảo máy tính làm gì. Trong ứng dụng AI native, bạn dùng Prompt để bảo mô hình làm gì. **Prompt chính là ngôn ngữ lập trình của thời đại AI** — viết tốt, AI sẽ gây ấn tượng; viết tệ, AI sẽ nói ngớ ngẩn.

<PromptDesignDemo />

::: tip Cấu trúc bốn tầng của thiết kế Prompt
1. **Lệnh gợi ý hệ thống (System Prompt)**: Định nghĩa vai trò của AI, ranh giới khả năng và chuẩn mực hành vi. Đây là chỉ thị ở cấp độ "hiến pháp", người dùng không nhìn thấy nhưng luôn có hiệu lực.
2. **Tiêm ngữ cảnh (Context)**: Thông qua tài liệu liên quan được truy xuất bằng RAG, lịch sử người dùng, v.v., cung cấp cho AI thông tin nền để trả lời.
3. **Đầu vào người dùng (User Message)**: Câu hỏi hoặc hướng dẫn thực tế của người dùng.
4. **Ràng buộc định dạng đầu ra (Format)**: Chỉ định định dạng đầu ra của AI (JSON, Markdown, mẫu cụ thể), đảm bảo kết quả có thể được phân tích bằng chương trình.
:::

| Kỹ thuật Prompt | Giải thích | Hiệu quả |
|-----------------|-----------|---------|
| Thiết lập vai trò | "Bạn là một kỹ sư frontend tài ba" | Nâng cao chất lượng trả lời trong lĩnh vực chuyên môn |
| Ví dụ Few-shot | Cung cấp 2-3 ví dụ về đầu vào-đầu ra | Giúp mô hình hiểu định dạng và phong cách mong đợi |
| Chuỗi suy luận (CoT) | "Vui lòng suy nghĩ từng bước" | Nâng cao độ chính xác của suy luận phức tạp |
| Ràng buộc đầu ra | "Trả lời theo định dạng JSON" | Đảm bảo đầu ra có thể được phân tích bằng chương trình |
| Chỉ thị tiêu cực | "Không bịa ra thông tin không chắc chắn" | Giảm ảo tưởng và thông tin sai lệch |

---

## 4. Các mô hình tương tác: Trải nghiệm người dùng của thời đại AI

Ứng dụng AI native tạo ra một loạt các mô hình tương tác hoàn toàn mới. Tương tác của ứng dụng truyền thống là "click-chờ đợi-xem", còn tương tác của ứng dụng AI giống như "đối thoại-quan sát-điều chỉnh".

<AIUXPatternDemo />

::: tip Bốn mô hình tương tác cốt lõi
1. **Đầu ra luồng (Streaming)**: Khi AI tạo nội dung, hiển thị từng chữ một, thay vì chờ tất cả tạo xong rồi mới hiển thị. Điều này giảm đáng kể thời gian chờ mà người dùng cảm nhận, đồng thời cho phép người dùng đánh giá hướng đi có đúng không trong quá trình tạo.
2. **Đối thoại nhiều lượt (Multi-turn)**: Thông qua ghi nhớ ngữ cảnh, thực hiện đối thoại liên tục, người dùng có thể từng bước tinh chỉnh nhu cầu. Thách thức chính là quản lý cửa sổ ngữ cảnh và nén lịch sử đối thoại.
3. **Tương tác đa phương thức (Multimodal)**: Hỗ trợ nhiều hình thức đầu vào khác nhau như văn bản, hình ảnh, giọng nói, tệp tin, AI cũng có thể xuất ra hình ảnh, code, bảng, v.v.
4. **Chế độ Agent (Agentic)**: AI không chỉ trả lời câu hỏi, mà tự động lên kế hoạch, thực thi các tác vụ nhiều bước. Người dùng đưa ra mục tiêu, AI tự phân tích các bước và hoàn thành từng bước.
:::

---

## 5. Quy trình yêu cầu: Vòng đời hoàn chỉnh của một lần gọi AI

Khi người dùng gửi một tin nhắn trong ứng dụng AI, điều gì xảy ra đằng sau? Hiểu quy trình hoàn chỉnh này là cơ sở để xây dựng ứng dụng AI đáng tin cậy.

<AIAppFlowDemo />

::: tip Sáu giai đoạn xử lý yêu cầu
1. **Tiền xử lý đầu vào**: Xác nhận đầu vào người dùng, kiểm tra an toàn nội dung, loại bỏ thông tin nhạy cảm
2. **Lắp ráp ngữ cảnh**: Kết hợp lệnh gợi ý hệ thống, truy xuất tài liệu liên quan (RAG), tải lịch sử đối thoại
3. **Gọi mô hình**: Gửi Prompt đã lắp ráp đến API LLM, mở phản hồi luồng
4. **Xử lý sau đầu ra**: Định dạng đầu ra, lọc an toàn nội dung, trích xuất dữ liệu có cấu trúc
5. **Lưu vào bộ nhớ cache kết quả**: Lưu vào cache kết quả cho các câu hỏi phổ biến, giảm chi phí và trễ
6. **Giám sát và ghi lại**: Ghi lại lượng token sử dụng, thời gian phản hồi, phản hồi người dùng, để tiếp tục cải thiện
:::

| Giai đoạn | Xem xét quan trọng | Vấn đề phổ biến |
|-----------|------------------|-----------------|
| Tiền xử lý đầu vào | Bảo vệ chống tấn công tiêm, giới hạn độ dài | Tiêm Prompt, tấn công jailbreak |
| Lắp ráp ngữ cảnh | Phân bổ ngân sách token, ưu tiên thông tin | Tràn ngữ cảnh, thông tin quan trọng bị cắt ngắn |
| Gọi mô hình | Xử lý timeout, chiến lược thử lại, truyền luồng | Giới hạn lưu lượng API, timeout mạng |
| Xử lý sau đầu ra | Xác thực định dạng, phát hiện ảo tưởng | Định dạng đầu ra không phù hợp kỳ vọng |
| Chiến lược cache | Cache ngữ nghĩa vs cache chính xác | Tỷ lệ hit cache thấp |
| Giám sát cảnh báo | Giám sát chi phí, đánh giá chất lượng | Chi phí token mất kiểm soát |

---

## Tóm lược

Thiết kế ứng dụng AI native không phải là đơn giản thêm chức năng AI vào ứng dụng truyền thống, mà là tái cấu trúc toàn diện từ các khía cạnh như kiến trúc, tương tác, thực hành kỹ thuật, v.v.

Hãy xem lại các điểm chính của chương này:

1. **Sự chuyển đổi kiến trúc**: Từ logic xác định đến suy luận theo xác suất, ứng dụng AI native cần cách suy nghĩ về kiến trúc hoàn toàn mới
2. **Nguyên tắc thiết kế**: Chấp nhận sự không chắc chắn, xây dựng lòng tin từng bước, minh bạch và có thể giải thích, hợp tác giữa người và máy, suy giảm tối ưu
3. **Prompt là lõi**: Kỹ thuật Prompt là "ngôn ngữ lập trình" của ứng dụng AI, trực tiếp quyết định chất lượng sản phẩm
4. **Đổi mới tương tác**: Đầu ra luồng, đối thoại nhiều lượt, đa phương thức, chế độ Agent xác định lại trải nghiệm người dùng
5. **Tư duy toàn chuỗi**: Từ tiền xử lý đầu vào đến giám sát cảnh báo, mỗi bước đều cần được thiết kế đặc biệt để phù hợp với đặc tính AI

## Đọc thêm

- [Google PAIR Guidelines](https://pair.withgoogle.com/) - Hướng dẫn thiết kế AI tương tác người-máy của Google
- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering) - Các thực hành tốt nhất kỹ thuật Prompt chính thức
- [Anthropic Prompt Engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering) - Hướng dẫn thiết kế Prompt của Claude
- [Nielsen Norman Group: AI UX](https://www.nngroup.com/topic/artificial-intelligence/) - Nghiên cứu trải nghiệm người dùng AI
- [Building LLM Applications](https://www.oreilly.com/library/view/building-llm-powered/9781835462317/) - Hướng dẫn thực hành xây dựng ứng dụng LLM
