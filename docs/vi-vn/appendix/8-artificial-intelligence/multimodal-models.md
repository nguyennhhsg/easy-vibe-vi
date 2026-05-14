# Mô hình đa phương thức (Thị giác / Âm thanh / Video)
> 💡 **Hướng dẫn học tập**: Chương này không yêu cầu kiến thức sâu về thị giác máy tính. Qua các bản demo tương tác, bạn sẽ hiểu AI có "mắt" như thế nào. Chúng tôi sẽ tiết lộ những nguyên lý cốt lõi đằng sau các mô hình như GPT-4V, Qwen-VL, v.v.

<VlmQuickStartDemo />

## 0. Lời dẫn: Lắp "mắt" cho bộ não

Trong [Giới thiệu về Mô hình Ngôn ngữ Lớn](./llm-intro), chúng ta biết LLM về bản chất là một "bộ não" bị nhốt trong hộp đen, chỉ có thể hiểu thế giới thông qua **văn bản**.

Sự xuất hiện của **mô hình đa phương thức lớn (VLM)** tương đương với việc lắp một cặp **mắt** cho bộ não này.

Nhưng điều này không dễ. Bởi vì:

- **Bộ não (LLM)** chỉ hiểu **văn bản** (chính xác hơn là ID Token).
- **Mắt (camera)** thấy được là **pixel** (giá trị màu RGB).

Nhiệm vụ cốt lõi của VLM là **dịch "tín hiệu pixel" thành "tín hiệu văn bản"**, giúp LLM cảm thấy xem hình ảnh dễ như đọc bài viết.

---

## 1. Bước 1: Biến hình ảnh thành "từ" (Visual Tokenization)

Hãy tưởng tượng bạn đang miêu tả một bức tranh ghép qua điện thoại cho bạn bè. Bạn không thể nói hết một lúc, bạn phải miêu tả từng mảnh một.
Máy tính xem hình cũng vậy.

### 1.1 Cắt thành mảnh (Patchify) —— Tạo "từ vựng thị giác"

Chúng ta biết mô hình ngôn ngữ lớn (LLM) xử lý văn bản bằng cách tách câu thành từng token. Nếu bạn muốn LLM "đọc hiểu" hình ảnh, cách trực tiếp nhất là biến hình ảnh cũng thành dạng tương tự Token.

Để phù hợp với "thói quen đọc từ" của mô hình lớn, chúng ta cần một kỹ thuật có thể chuyển hình ảnh 2D liên tục thành các mảnh rời rạc. Đây chính là khái niệm **cắt hình ảnh đa tạp trực quan (Patchify)**: chúng ta cắt một bức hình hoàn chỉnh 2D, giống như cắt đậu phụ, thành một dãy các ô lưới cố định nhỏ (gọi là Patch).

- **Hình ảnh gốc** = một bài viết hoàn chỉnh
- **Mảnh hình ảnh (Patch)** = một từ trong bài viết (Token)

Trong thực hành kỹ thuật, chúng ta thường cắt hình ảnh theo kích thước cố định (ví dụ $16 \times 16$ hoặc $14 \times 14$ pixel) một cách liền mạch. Chẳng hạn, một bức hình đầu vào thông thường $224 \times 224$ pixel, sau khi cắt sẽ thành $14 \times 14 = 196$ khối hình ảnh độc lập.
Qua hoạt động này, mảng pixel 2D liên tục ban đầu đã bị cắt vật lý thành 196 "từ vựng thị giác" rời rạc.

> 🕹️ **Bản demo tương tác**: Nhấp nút bên dưới để trải nghiệm cách hình ảnh gốc được lưới đều cắt thành từng Patch độc lập.

<PatchifyDemo />

### 1.2 Tuần tự hóa (Flatten) —— Xếp thành một câu

Sau khi hoàn thành cắt mảnh, hiện tại chúng ta đang có một ma trận 2D kích thước $14 \times 14$. Tuy nhiên, dù là Transformer truyền thống hay LLM hiện đại, chúng hầu hết chỉ chấp nhận **đầu vào tuần tự 1D** (tức là dữ liệu cấu trúc tuyến tính xếp từ trái sang phải).

Để tương thích với tiêu chuẩn đầu vào của mô hình lớn, chúng ta phải thực hiện **tuần tự hóa (Flatten) và phép chiếu tuyến tính (Linear Projection)**:
1. **Làm phẳng (Flatten)**: Xếp các khối hình ảnh đầu nối đuôi, "làm phẳng" ma trận 2D thành một trục 1D chỉ có thứ tự trước sau.
2. **Kéo giãn đặc trưng (Projection)**: 196 khối này hiện tại chỉ là "thịt sống" của pixel đỏ xanh lam xếp chồng. Chúng ta cần dùng một mạng nơ-ron nhỏ (thường là một lớp kết nối đầy đủ) để xử lý từng khối, nén và chuyển đổi chúng thành vectơ đặc trưng độ dài cố định (ví dụ danh sách 768 chữ số).

Sau bước này, hình ảnh mới thực sự trở thành một "chuỗi từ vựng thị giác" (Visual Token Sequence).

> 🕹️ **Bản demo tương tác**: Quan sát hoạt ảnh bên dưới, hiểu cách **một khối pixel thuần túy (Patch)** trải qua kéo giãn ma trận, cuối cùng được ánh xạ thành một **vectơ (Vector)** có chứa nhiều chiều đặc trưng phong phú.

<LinearProjectionDemo />

---

## 2. Bước 2: Dịch xuyên loài (Projection)

Lúc này, mặc dù hình ảnh đã được chuyển đổi thành chuỗi "từ vựng thị giác" liên tục 1D, nhưng chuỗi này vẫn là đống mã rối không thể đọc được đối với LLM cuối cùng.

Tại sao không đọc được? Vì **không gian đặc trưng khác nhau** (tức là chúng nói những ngôn ngữ khác nhau).
Bộ mã hóa thị giác (như ViT) trích xuất là **đặc trưng pixel không gian** (ví dụ nó chỉ có thể nói với bạn "đây là thứ được tạo thành từ nhiều đường cong đen", "đây là một vùng đỏ rộng lớn"); trong khi LLM bên trong hiểu là **đặc trưng ngữ nghĩa sâu sắc** (chẳng hạn các khái niệm "mèo", "cây", "nguy hiểm", v.v.).

Giữa hai hệ thống thoại hoàn toàn khác nhau này, chúng ta cần xây dựng một cây cầu, đó chính là **dịch giả xuyên phương thức** của chúng ta: **Projector (máy chiếu/bộ thích ứng)**.

### 2.1 Vai trò của dịch giả (Latent Space Alignment)

Bản chất học thuật của Projector là thực hiện **căn chỉnh không gian tiềm ẩn đặc trưng (Latent Space Alignment)**. Nó giống như dịch giả đồng thời trong cuộc sống thực:

- **Đầu vào (Source)**: "Đặc trưng thị giác" do ViT tạo ra (tập trung vào biểu diễn đặc trưng 2D cao chiều liên tục về hình học, màu sắc, quy luật kết cấu).
- **Xử lý (Translation)**: Projector tận dụng cấu trúc mạng nơ-ron (có thể là vài lớp biến đổi tuyến tính đơn giản, hoặc lớp chú ý phức tạp), trong quá trình này tìm ra mối quan hệ toán học giữa hai ngôn ngữ.
- **Đầu ra (Target)**: Xuất ra "ngôn ngữ LLM" hoàn toàn phù hợp với khẩu vị và kỳ vọng (token nhúng văn bản tương đương được chuyển đổi từ đặc trưng hình ảnh, làm cho hình ảnh có ý nghĩa đối thoại).

Qua lớp dịch này, mô hình lớn sẽ ngạc nhiên phát hiện: "À? Chuỗi số truyền vào không phải chính là tổ hợp từ mô tả mà tôi thường đọc sao!", do đó tự nhiên sẽ xử lý đặc trưng hình ảnh cùng với ngôn ngữ tự nhiên.

<ProjectorDemo />

### 2.2 Các trường phái dịch khác nhau

Để hoàn thành "quy trình dịch" căn chỉnh đặc trưng nhanh hơn, chính xác hơn, giới học thuật và công nghiệp đã phát triển vài giải pháp thiết kế kết nối phần cứng có tính đại diện cao:

1.  **Trường phái dịch trực tiếp (Linear Projection)**:
    - **Cách làm**: Cực kỳ đơn giản, chỉ dùng một hoặc vài chục lớp perceptron đa lớp (MLP / lớp chiếu tuyến tính) để biến đổi ma trận toán học trực tiếp.
    - **Đặc điểm**: **Mất mát thông tin cực kỳ thấp, bảo toàn chi tiết nguyên vị của hình ảnh**; nhưng khiếm khuyết là tất cả vài trăm từ vựng thị giác đã cắt được chuyển nguyên vẹn cho mô hình ngôn ngữ, dẫn đến lượng tính toán sau này tăng vọt.
    - **Đại diện**: Dòng LLaVA.

2.  **Trường phái dịch ý (Q-Former / Resampler)**:
    - **Cách làm**: Không phải truyền nguyên vẹn, mà là thêm vào giữa một mạng "quân thám nhỏ" có khả năng trừu tượng hóa tóm tắt. Người đại lý ở giữa này trước tiên nhanh chóng hiểu toàn bộ hình ảnh, lọc ra vài chục điểm cốt lõi cô đặc cao độ.
    - **Đặc điểm**: **Thông tin cô đặc tinh luyện cao độ, Token ít, tiết kiệm đáng kể hiệu năng tính toán của LLM**; khiếm khuyết là có khả năng loại bỏ những dấu vết quan sát cực kỳ tinh tế ở cạnh hình ảnh gốc khi tinh luyện.
    - **Đại diện**: BLIP-2, Gemini (một phần cơ chế tương tự).

3.  **Trường phái hòa hợp (C-Abstractor / Pooling)**:
    - **Cách làm**: Tận dụng gộp tích chập hoặc sắp xếp lại khu vực cục bộ, nén đóng gói hợp nhất các khối pixel $2 \times 2$ hoặc lớn hơn thành một biểu diễn hoàn chỉnh.
    - **Đặc điểm**: Vừa nén hợp lý độ dài token tối đa, vừa vẫn để lại một phần cảm giác cục bộ và không gian phụ thuộc lẫn nhau.
    - **Đại diện**: Qwen-VL-Max.

---

## 3. Bước 3: Hoàn thiện (The Architecture)

Có các bộ phận, có tiêu chuẩn kết nối, tiếp theo chúng ta xem nó hoàn thành vũ trang toàn thân như thế nào. Các mô hình ngôn ngữ thị giác đa phương thức (Vision-Language Model) chính thống về cơ bản đều tuân theo một kiến trúc **"ba phần"** thống nhất.

### 3.1 Cấu trúc cơ thể VLM

<ModelArchitectureComparisonDemo />

Một VLM thực thể trong một mẫu hình điển hình, chủ yếu bao gồm ba phần chính hoạt động phối hợp:

1.  **"Mắt" cảm nhận đặc trưng (Vision Encoder - bộ mã hóa thị giác)**:
    - **Chức năng**: Là cửa ngõ đầu tiên của đầu vào hình ảnh, chịu trách nhiệm xem hình và trừu tượng hóa đặc trưng thị giác 2D cao chiều.
    - **Lựa chọn loại**: Hầu hết các nhà sản xuất sẽ không huấn luyện mắt từ đầu, mà sử dụng trực tiếp các bộ phận trưởng thành được tiền huấn luyện trên hàng trăm triệu dữ liệu "hình ảnh-văn bản ghép cặp" (như tháp thị giác mô hình CLIP của OpenAI, hoặc mô hình SigLIP của Google).
    - *Loại so sánh hình ảnh: Đây là vùng tế bào nhạy sáng thị lực đặc hóa cao của sinh vật.*

2.  **"Thần kinh thị giác" chuyển tín hiệu (Projector - máy chiếu phương thức)**:
    - **Chức năng**: Kết nối bộ mã hóa và nền tảng ngôn ngữ, chịu trách nhiệm nén kích thước tín hiệu, thông thoáng và dịch ngữ nghĩa đa phương thức.
    - **Lựa chọn loại**: Đây là **trọng tâm của trọng tâm** của huấn luyện hệ thống đa phương thức tiếp theo. Lượng tham số của chính nó thường không lớn (tương đối với LLM), nhưng quyết định xem "văn bản" và "hình ảnh" có thể "tâm ý tương thông" hay không.
    - *Loại so sánh hình ảnh: Nó giống như thần kinh thị giác trung tâm chuyển đổi tín hiệu điện sang vỏ não.*

3.  **"Bộ não" động cơ nhận thức (LLM Backbone - nền tảng mô hình ngôn ngữ)**:
    - **Chức năng**: Chịu trách nhiệm quan sát cuối cùng, gọi ra kiến thức phổ thông, suy luận logic sâu sắc và tạo ra câu trả lời giống con người.
    - **Lựa chọn loại**: Thường sử dụng mô hình ngôn ngữ lớn mã nguồn mở thông minh nhất trong ngành làm điểm gắn (như Qwen, Llama 3, Vicuna, v.v.).
    - *Loại so sánh hình ảnh: Đây là bộ não có thư viện kiến thức thế giới, nó làm phán đoán tư duy cấp cao đối với tín hiệu đã xử lý từ thần kinh thị giác.*

---

## 4. Nó học để xem hình ảnh như thế nào? (Training)

Được rồi, giờ các bộ phận cơ thể đã nối khít. Nhưng trước khi chính thức tiếp khách, VLM vừa lắp ráp lại thực ra đang ở trạng thái "mù và hỗn độn" giống như trẻ sơ sinh—vì thần kinh thị giác mới thêm (Projector) là một tờ giấy trắng, toàn bộ là giá trị số ngẫu nhiên không có ý nghĩa.

Để cho "quái vật" đã dán mảnh này có khả năng xem hình nói chuyện, giới khoa học đã tóm lược ra một bộ quy luật huấn luyện hiệu quả: **"quy luật hai giai đoạn huấn luyện (Two-Stage Training)"**.

### Giai đoạn 1: Nhận diện vật (Feature Alignment —— tiền huấn luyện căn chỉnh đặc trưng)

Giai đoạn này, nhiệm vụ chính là giúp Projector ngẫu nhiên thiết lập mối quan hệ ánh xạ xuyên phương thức ban đầu. Quá trình rất giống như dạy trẻ sơ sinh bằng "flashcard nhận thức", buộc ghi nhớ từ.

- **Cho xem (đầu vào huấn luyện)**: Khối lượng lớn (thường hàng trăm triệu) các cặp hình-văn bản cực đơn giản chỉ có một chủ thể nổi bật (ví dụ ảnh "mèo" nền trắng).
- **Nói cho nó (đầu ra mục tiêu)**: Kèm theo nhãn từ vựng ngắn (một chỉ mèo cam).
- **Tối ưu hóa mục tiêu**: Buộc lái Projector học cách qua biến đổi ma trận, để đặc trưng thị giác tương ứng của mèo này (sau khi dịch), và vector từ "mèo" trong ngôn ngữ tự nhiên càng trùng hợp lên nhất.
- **Trạng thái kiểm soát tham số (Freeze Strategy)**: Để tránh phá hủy trí tuệ mô hình sẵn có, trong giai đoạn này các nhà nghiên cứu sẽ nặng nề **đông lạnh (Freeze)** vài chục đến hàng trăm tỷ tham số của "mắt" (ViT) và "bộ não" (LLM), **chỉ mở khóa huấn luyện vài triệu tham số của "thần kinh thị giác" (Projector)**

<FeatureAlignmentDemo />

### Giai đoạn 2: Hội thoại (Visual Instruction Tuning —— luyện tập đối thoại)

Nếu giai đoạn đầu chỉ khiến mô hình thành cơ chế đọc tên từng cái như khi nêu thực đơn, thì nhiệm vụ giai đoạn hai là kích hoạt thương số cao của nó, giúp nó thực sự có thể trả lời các chỉ dẫn phức tạp kết hợp hình-văn bản của con người dựa trên bối cảnh.

- **Cho xem (đầu vào huấn luyện)**: Các cặp hỏi-đáp huấn luyện chất lượng cao được thiết kế cẩn thận. Chẳng hạn như cung cấp bức ảnh toàn cảnh giao thông thành phố phức tạp.
- **Yêu cầu nó trả lời (đầu ra mục tiêu)**: Người dùng hỏi: "`<hình ảnh>` người đàn ông đi xe đạp trắng ở góc dưới bên trái có đội mũ bảo hiểm không?" Trợ lý trả lời: "Không, anh ấy không có gì trên đầu cả, đây là hành vi rất nguy hiểm trong thành phố."
- **Tối ưu hóa mục tiêu**: Giúp mô hình lớn không chỉ nhận tín hiệu thị giác, mà còn kết hợp tích tụ kiến thức văn minh trước đó, hoàn toàn hòa nhập logic văn bản với biểu diễn đa phương thức và đưa ra suy luận.
- **Trạng thái kiểm soát tham số (Freeze Strategy)**: Lúc này thần kinh thị giác đã cơ bản thông suốt. Trong giai đoạn tinh chỉnh này, thường tiếp tục đông lạnh một phần trọng số tầng dưới bộ mã hóa thị giác, đồng thời **hoàn toàn mở khóa LLM và Projector** (hoặc sử dụng cấu hình LoRA), tiến hành điều chỉnh lan truyền ngược tổng thể quy mô lớn liên tục.

<VLMInferenceDemo />

---

## 5. Nâng cao: Xem rõ hơn (Advanced Tricks)

Mặc dù kiến trúc trên hỗ trợ mô hình đa phương thức ban đầu, nhưng thế hệ VLM đầu tiên tồn tại một khiếm khuyết cơ bản rất gây đau đầu—**cận thị (thị lực bẩm sinh không đủ)**.

Bộ mã hóa thị giác ViT ban đầu vì lý do thiết kế lịch sử, sinh ra chỉ có thể xử lý những hình ảnh cực kỳ thấp độ phân giải như $224 \times 224$ hoặc $336 \times 336$. Nó giống như bị buộc nhìn thế giới qua camera phục cổ mờ, chất lượng thấp chỉ vài chục vạn pixel, những chi tiết chữ nhỏ xíu trên bảng báo hiệu trong ảnh sẽ hoàn toàn mờ thành một khối pixel, bộ não dù siêu thông minh cũng là "bao công không có cơm".

Để khắc phục bệnh độ phân giải thấp, các nhà sản xuất mô hình tiên phong (như đội Qwen-VL, LLaVA-NeXT, v.v.) đã sử dụng vài kỹ thuật kỹ nghệ vô cùng tinh xảo:

### 5.1 Bố cục cắt động độ phân giải cao (Dynamic High-Resolution Mapping)

Nếu nhập trực tiếp hình ảnh lớn sẽ làm bộ nhớ đầy, nhưng cắt nhỏ thô bạo lại mất hết chi tiết, phải giải quyết như thế nào? Giải pháp hiện tại là: **chiến lược "góc nhìn kép" giữa close-up chi tiết và toàn cảnh từ trên cao**.

1. **Tổng quan chung**: Trước tiên giảm nhỏ hình ảnh gốc lớn trực tiếp xuống $336 \times 336$, cho mắt nhìn một cái. Điều này giúp mô hình nắm bắt **bố cục vĩ mô toàn cảnh** (bầu trời ở đâu? Mặt đất ở đâu?).
2. **Cắt lát phóng to xem**: Cắt hình ảnh gốc độ phân giải cao thành vài chục khối cắt lát riêng biệt, không mất dữ liệu, $336 \times 336$ (Slice).
3. **Lần lượt duyệt và ghép không gian lại**: Cho động cơ thị giác từng cái dùng kính phóng đại quét vài chục mặt cắt không mất dữ liệu để thu thập chi tiết độ phân giải cao. Sau đó, Projector sẽ giống xếp hình ghép từng khối chi tiết ngữ nghĩa với bối cảnh tổng quan ban đầu lại với nhau.

Cách này giống y như bạn chụp toàn cảnh một tờ báo bằng điện thoại (xem bố cục toàn trang), sau đó lại cầm điện thoại sát báo chụp liên tiếp vài chục ảnh close-up đoạn văn.

### 5.2 Thay bằng cặp mắt sinh ra to lớn (Scaling the Vision Encoder)

Một cách khác thể hiện thẩm mỹ bạo lực thuần túy là: vì mắt gốc sinh ra có khiếm khuyết gen, thì tôi sẽ luyện từ đầu một cặp mắt siêu khổng lồ.

Lấy **InternVL** từ mô hình mã nguồn mở xuất sắc trong nước làm ví dụ điển hình, nó loại bỏ mô hình thị giác quy mô nhỏ thường dùng, từ dưới lên trực tiếp tiêu tốn hàng tấn tài nguyên huấn luyện riêng một bộ mã hóa thị giác siêu khổng lồ cực hiếm có lượng tham số lên đến vài chục tỷ (như InternViT-6B với 60 tỷ tham số).
Nhờ khả năng hấp thụ dữ liệu cực mạnh, nó sinh ra chính là hỗ trợ gốc độ phân giải cao nhập vào không khiểm chứng "kính thiên văn không gian Hubble". Thiết kế này giảm đáng kể chi phí kỹ thuật phức tạp hệ thống vì cắt hình ghép hình và nguy hiểm sai lệch đặc trưng, trực tiếp thực hiện cảm nhận thị giác độ phân giải cao "nhìn thấy toàn bộ".

---

## 6. Tóm tắt

Mô hình đa phương thức lớn (VLM) không có gì thần kỳ. Nó chỉ làm một việc:

**Dịch "hình ảnh" ngoại ngữ thành "văn bản" ngôn ngữ mẹ đẻ, rồi cho LLM ăn.**

Chỉ cần hiểu điều này, bạn đã hiểu hết VLM.

---

## 7. Bảng tra cứu thuật ngữ (Glossary)

| Thuật ngữ     | Tên đầy đủ            | Giải thích                                                   |
| :------------ | :-------------------- | :--------------------------------------------------------- |
| **VLM**       | Vision-Language Model | **Mô hình đa phương thức**. GPT có thể xem hình ảnh.         |
| **ViT**       | Vision Transformer    | **Mô hình thị giác**. "Mắt" của VLM, chuyên biến pixel thành vectơ. |
| **Patch**     | -                     | **Khối hình ảnh**. Mảnh nhỏ được cắt từ hình ảnh, tương đương "từ vựng thị giác". |
| **Projector** | -                     | **Máy chiếu/dịch giả**. Cây cầu nối mắt và bộ não.          |
| **Alignment** | -                     | **Căn chỉnh**. Giúp đặc trưng hình ảnh và đặc trưng văn bản trong cùng không gian "nghe được nhau". |
