# Từ điển năng lực AI
Khi công nghệ AI tạo sinh được triển khai rộng rãi trong các sản phẩm và tình huống kinh doanh, một câu hỏi ngày càng thực tế đặt ra trước mỗi chúng ta: **Rốt cuộc có những năng lực AI nào có thể sử dụng?** Trong các yêu cầu cụ thể, **nên chọn loại năng lực nào, loại mô hình nào hay sản phẩm nào để đáp ứng?**

Đối mặt với sự bối rối này, cách làm trực quan nhất có lẽ là "nước đến chân mới nhảy": **gặp yêu cầu thì tìm kiếm API sản phẩm của các nhà cung cấp dịch vụ đám mây trên thị trường, hoặc mô hình tương ứng, tìm kiếm các giải pháp thương mại trên thị trường rồi đối chiếu tài liệu và Demo để xử lý**. Thấy yêu cầu về hình ảnh thì nghĩ đến sinh ảnh, gặp tác vụ văn bản thì tìm LLM, liên quan đến tương tác giọng nói thì nghĩ đến ASR và TTS, rồi so sánh trong hàng ngàn API và dịch vụ. Tuy nhiên, việc gom các sản phẩm rời rạc lại với nhau hoàn toàn khác với việc lập kế hoạch, lựa chọn và kết hợp năng lực AI một cách hệ thống trong các tình huống doanh nghiệp. Chỉ dựa vào tra cứu tạm thời và phán đoán kinh nghiệm sẽ dẫn đến hàng loạt thách thức nghiêm trọng như nhận thức năng lực bị phân mảnh, thiết kế giải pháp tùy tiện, khó tái sử dụng năng lực.

Để giải quyết những điểm đau này, tư duy sắp xếp lấy "bản đồ toàn cảnh năng lực AI" làm cốt lõi đã ra đời. Trong cuốn sổ tay này, điều chúng tôi muốn làm không phải là chồng chất thuật ngữ, mà là giúp bạn nhanh chóng hiểu rõ ba điều: **"Việc này có thể dùng năng lực AI nào để làm? Nên chọn loại mô hình hoặc sản phẩm nào? Tiếp theo dùng những từ khóa nào để tìm API, dự án hoặc dịch vụ để thử?"** Thông qua việc hệ thống hóa từ phương thức (văn bản, hình ảnh, âm thanh, video, 3D, đa phương thức) đến tầng kiến trúc (mô hình, truy xuất, Agent, platform engineering), **chúng tôi có thể tìm ra năng lực AI tương ứng, mô hình/sản phẩm đại diện, cũng như các ứng dụng phổ biến trong kinh doanh thực tế cho mỗi loại yêu cầu và tình huống điển hình**, giúp các nhóm xây dựng hệ thống AI với chi phí thử nghiệm thấp hơn, hiệu quả ra quyết định cao hơn và khả năng tái sử dụng mạnh hơn.

Trong cuốn sổ tay này, chúng tôi sẽ giới thiệu một cách có hệ thống bản đồ năng lực AI chủ đạo hiện nay, từ đơn phương thức đến tích hợp đa phương thức, từ mô hình đơn điểm đến khung tổng thể của nền tảng và kỹ thuật, kết hợp với các dạng sản phẩm và tình huống ứng dụng phổ biến, đưa ra tham khảo lựa chọn năng lực hướng đến thực tiễn.

> Vì **nội dung khá nhiều**, bạn có thể tra cứu sổ tay này khi gặp vấn đề không biết cách lựa chọn trong quá trình thực hành; khuyến nghị bạn **dựa theo hướng ứng dụng cụ thể, để AI tham khảo sổ tay này và đưa ra gợi ý lựa chọn mô hình, gợi ý gọi API cho giải pháp là được.**

Nếu bạn chỉ muốn tìm hiểu về danh mục tương ứng mà không muốn xem nội dung chi tiết, chỉ cần đọc phần đầu của mỗi chương lớn là đủ, ví dụ nội dung 1.1, 1.2 nhưng không cần xem nội dung 1.1.1 hay 1.1.2.

**Khuyến nghị chỉ tra cứu phần tương ứng khi cần thiết hoặc chỉ duyệt qua phần mục lục cấp một, nếu có hứng thú thì mới đọc toàn văn.**

**Các bản cập nhật sau sẽ bổ sung địa chỉ dịch vụ API mô hình được khuyến nghị thử dùng trong từng phần chương.**

# Bạn sẽ học được gì trong bài này

- Toàn cảnh năng lực AI: Tư duy phân chia năng lực tổng thể từ văn bản, hình ảnh, âm thanh, video, 3D đến đa phương thức, Agent, RAG, bảo mật và platform engineering
- Mô hình và sản phẩm tương ứng với từng năng lực: Tìm hiểu các mô hình và dịch vụ đại diện đằng sau các năng lực chủ chốt như Embedding, OCR, ASR, TTS, VLM, RAG
- Phương pháp ánh xạ từ năng lực đến tình huống: Nắm vững cách chuyển hóa "danh sách năng lực" thành các ứng dụng cụ thể như nội dung sản phẩm, tìm kiếm hỏi đáp, chăm sóc khách hàng thông minh, vận hành tự động hóa

Sau khi hoàn thành việc học sổ tay này, bạn sẽ xây dựng được nhận thức hệ thống ở mức nhập môn về các năng lực AI chủ đạo, không chỉ biết "thị trường có những năng lực gì, thường đi kèm những sản phẩm nào", mà còn hiểu được vị trí và mối quan hệ tương hỗ của chúng trong kiến trúc tổng thể. Biết cách nhanh chóng xác định năng lực cần thiết khi đối mặt với yêu cầu kinh doanh cụ thể, đưa ra lựa chọn có căn cứ, đặt nền móng vững chắc để xây dựng hệ thống năng lực AI.
## Các tham số mô hình được đề cập trong tài liệu

Trước khi đi vào bản đồ năng lực cụ thể, hãy làm rõ một khái niệm thường xuyên được nhắc đến nhưng vẫn còn khá trừu tượng: thế nào là mô hình lớn? Thế nào là mô hình nhỏ?

**Xét về mặt học thuật**, mô hình lớn thường chỉ các mô hình đa năng có số lượng tham số từ hàng tỷ, hàng trăm tỷ đến hàng nghìn tỷ, còn mô hình nhỏ là các mô hình chuyên dụng được tối ưu cho một tác vụ hoặc tình huống cụ thể, với số tham số nhỏ hơn (từ hàng chục triệu đến hàng trăm triệu).

**Xét về mặt giá cả**, nếu một mô hình có chi phí gọi API rất rẻ — ví dụ tính theo lượt gọi chỉ vài xu, vài hào, hoặc chỉ vài xu đến vài hào mỗi nghìn token — và không đặc biệt nhấn mạnh đây là mô hình lớn đa năng, thì thường đó hoặc là mô hình nhỏ điển hình (ví dụ các mô hình chuyên làm OCR, ASR, phân loại hình ảnh, kiểm duyệt nội dung), hoặc là phiên bản nhẹ hơn của mô hình lớn với số tham số nhỏ hơn (được nén hoặc chưng cất để phục vụ concurrency cao, chi phí thấp). Nếu giá mỗi lần gọi rõ ràng cao hơn — ví dụ một lần gọi đã tốn vài hào thậm chí khởi điểm 1 đồng — thì khả năng cao đó là mô hình lớn.

Ngoài ra, nếu mô tả sản phẩm đặc biệt nhấn mạnh việc sử dụng LLM, mô hình lớn đa năng, mô hình lớn đa phương thức, hoặc đề cập đến việc hoàn thành end-to-end các tác vụ phức tạp từ đầu vào đến đầu ra (ví dụ chatbot end-to-end, hỏi đáp truy xuất end-to-end, tạo video end-to-end), thì thường có thể coi đó là mô hình lớn.

Ngược lại, nếu trọng tâm quảng bá tập trung vào một năng lực dọc cụ thể — như nhận dạng thẻ ngân hàng, nhận dạng hóa đơn, nhận dạng biển số xe, dự đoán tỷ lệ nhấp quảng cáo, chuyển đổi giọng nói, kiểm duyệt an toàn nội dung — thì nền tảng của sản phẩm đó nhiều khả năng là một hoặc một nhóm mô hình nhỏ.

Vì vậy, trong phần còn lại của tài liệu này, bạn có thể dùng quy ước thực tế sau:

- Mô hình lớn chủ yếu chỉ các mô hình đa năng, có thể hội thoại, có thể lập trình, thường có giá cao hơn một chút (bao gồm cả phiên bản đa phương thức của chúng, như GPT-4o, Gemini 1.5 Pro, Claude 3.5 Sonnet, v.v.) — chúng có thể xử lý hầu hết các tác vụ văn bản, code đa năng cũng như các tác vụ đa phương thức như hình ảnh, âm thanh, video;
- Mô hình nhỏ chỉ các mô hình được fine-tune hoặc tùy chỉnh cho một tác vụ cụ thể, thường rẻ hơn, hiệu năng ổn định và có thể kiểm soát hơn, nhưng phạm vi ứng dụng hẹp hơn — bạn cần chủ động kết hợp và điều phối chúng trong hệ thống của mình.

Ở đây đáng bổ sung thêm một thay đổi quan trọng của ngành: nhiều năng lực mô hình được đề cập trong tài liệu này, trước năm 2021, thực ra đều do "mô hình nhỏ" đảm nhiệm — huấn luyện mô hình riêng cho từng tình huống, từng tập dữ liệu cụ thể để đáp ứng nhu cầu chính xác. Còn **ngày nay, hầu hết các tình huống và tác vụ đa năng đã có thể giải quyết trực tiếp bằng cách gọi mô hình lớn**.

Xét từ góc độ **độ chính xác và chi phí** tối ưu tuyệt đối, mô hình nhỏ vẫn có giá trị không thể thay thế; nhưng **với người mới bắt đầu, bạn hoàn toàn có thể bắt đầu bằng cách học cách tìm và gọi API của mô hình lớn**, rồi dần dần đi sâu vào các kỹ thuật nâng cao. Bạn chỉ cần cân nhắc giữa chi phí, độ chính xác và độ trễ, rồi quyết định chỗ nào dùng mô hình lớn đa năng, chỗ nào tiếp tục giữ hoặc đưa vào mô hình nhỏ chuyên dụng.

> **Nhận biết các mô hình lớn đa năng về văn bản và đa phương thức thông qua một số sản phẩm phổ biến:**
>
> - Dòng OpenAI: GPT-4, GPT-4.1, GPT-4o, GPT-5.1, v.v.
> - Dòng Google: Gemini 1.5 Pro, Gemini 1.5 Flash, v.v.
> - Dòng Anthropic: Claude 3.5 Sonnet, Claude 3.5 Haiku, v.v.
> - Các mô hình trong nước (Trung Quốc): Qwen series, ERNIE Bot series, GLM / Zhipu Qingyan (智谱清言), iFlytek Spark (讯飞星火), mô hình lớn đằng sau Kimi của Moonshot AI (月之暗面), MiniMax MiniMax-M2.7 series, v.v.
>
> Các mô hình lớn và dịch vụ thiên về hình ảnh và video, bao gồm:
>
> - Tạo hình ảnh: DALL·E, Midjourney, Stable Diffusion, SDXL, Flux, v.v.
> - Hiểu đa phương thức hình ảnh: GPT-4o, GPT-4.1 with Vision, Gemini 1.5 (đa phương thức văn bản-hình ảnh), Claude 3.5 Sonnet Vision, LLaVA, v.v.
> - Tạo video: Sora, Kling, Runway Gen-2, Pika, Luma, Veo, v.v.
>
> Các mô hình lớn về giọng nói và âm thanh, bao gồm:
>
> - Nhận dạng giọng nói ASR: Whisper series (Whisper, Whisper-large-v3, v.v.), Deepgram, các mô hình lớn ASR end-to-end của các nhà cung cấp cloud (như iFlytek (讯飞), Baidu, Volcano Engine (火山), Alibaba, v.v.)
> - Đa phương thức giọng nói và hội thoại giọng nói: GPT-4o (hội thoại giọng nói end-to-end), OpenAI Realtime, khả năng hiểu âm thanh của Gemini 1.5, v.v.
> - TTS / Tạo âm thanh và âm nhạc: OpenAI TTS, ElevenLabs, Suno, Udio, MusicGen, v.v.
>
> Các mô hình tạo sinh và hiểu biết về 3D / không gian, bao gồm:
>
> - Text-to-3D và Image-to-3D: DreamFusion, Shap-E, GET3D, Zero-1-to-3, TripoSR, v.v.
> - Dòng NeRF / Neural Rendering: Instant-NGP, NeRF series, các mô hình liên quan đến Gaussian Splatting, v.v.

# 1. Tác vụ văn bản (Text / NLP / LLM)

Trong các năng lực AI, tác vụ văn bản là chức năng nền tảng nhất. Dù bạn cuối cùng muốn làm kiểm duyệt nội dung, tìm kiếm và gợi ý, hỏi đáp tri thức, hay trợ lý viết lách, code Copilot — về bản chất tất cả đều không thể bỏ qua một câu hỏi: làm thế nào để máy thực sự hiểu được văn bản.
## 1.1 Mô Hình Hóa Ngôn Ngữ Cơ Bản và Biểu Diễn

Hãy bắt đầu từ nền tảng cơ bản nhất: mô hình hóa ngôn ngữ và biểu diễn. Vai trò của nó là giúp máy tính trước tiên làm quen với ngôn ngữ theo nghĩa thống kê, và trên cơ sở đó tìm ra một biểu diễn ma trận vector ổn định cho các từ, câu, tài liệu, phục vụ cho các tác vụ phân loại, khớp, trích xuất, sinh văn bản về sau. Dù bạn muốn thực hiện bất kỳ tác vụ xử lý văn bản nào trong tương lai, đều cần trả lời cùng một câu hỏi: làm thế nào để biểu diễn một đoạn văn bản bằng một chuỗi số?

Chúng ta có thể xem xét nội dung liên quan đến vấn đề này từ ba góc độ đơn giản: tình huống ứng dụng, nguyên lý, và mô hình:

- **Tình huống ứng dụng**
  - **Liên quan đến tìm kiếm và truy xuất**
    - Công cụ tìm kiếm tổng quát: người dùng nhập bất kỳ câu nào và nhận được tài liệu liên quan về mặt ngữ nghĩa, thay vì chỉ khớp chính xác từ khóa.
    - Tìm kiếm trong trang / tìm kiếm thương mại điện tử: người dùng mô tả bằng ngôn ngữ tự nhiên (ví dụ: "áo sơ mi trắng phù hợp đi làm mùa hè"), tìm ra sản phẩm tương ứng về ngữ nghĩa.
    - Truy xuất thư viện tài liệu / cơ sở tri thức: trong tài liệu kỹ thuật, quy định pháp lý, cơ sở tri thức doanh nghiệp, nhập trực tiếp một câu để lấy các mục liên quan.
  - **Liên quan đến gợi ý và xếp hạng**
    - Luồng thông tin / gợi ý nội dung: dựa trên nội dung người dùng đã xem, đã nhấp gần đây, tự động tìm các nội dung tương tự để tiếp tục gợi ý, thay vì chỉ dựa vào quy tắc thủ công hoặc nhãn.
    - Thương mại điện tử / gợi ý sản phẩm: dựa trên mô tả sản phẩm người dùng đã xem, đã mua, đã yêu thích, tìm các sản phẩm có phong cách hoặc công dụng tương tự để gợi ý cá nhân hóa.
    - Mô hình hóa sở thích người dùng: dựa trên tiêu đề người dùng đã xem, từ khóa đã tìm kiếm, tóm tắt một vài hướng sở thích chính để nâng cao hiệu quả gợi ý và xếp hạng.
  - **Liên quan đến trợ lý hỏi đáp**
    - Hỏi đáp FAQ: người dùng hỏi cùng một câu hỏi bằng các cách diễn đạt khác nhau ("Làm thế nào để xuất hóa đơn?" vs "Xuất hóa đơn ở đâu?"), hệ thống có thể chuyển đến cùng một câu trả lời.
    - Hỏi đáp cơ sở tri thức / trợ lý doanh nghiệp: người dùng đặt câu hỏi bằng ngôn ngữ tự nhiên, hệ thống truy xuất tài liệu nội bộ theo ngữ nghĩa, tìm đoạn văn phù hợp nhất để trả lời.
  - **Liên quan đến phân tích hiểu văn bản**
    - Phân tích bình luận dư luận: phân loại số lượng lớn bình luận, bài đăng theo "đang nói về gì / cảm xúc như thế nào".
    - Loại bỏ trùng lặp / phát hiện tương tự: dùng để phát hiện bài viết được viết lại, nội dung giả nguyên bản.
    - Phân cụm / nhóm tài liệu: nhóm nhiều bài viết, báo cáo theo nội dung tương tự, tiện cho việc điều hướng, gợi ý hoặc kiểm tra mẫu.
  - **Làm đặc trưng chung cho tác vụ downstream (tác vụ downstream là sử dụng năng lực cơ bản của mô hình để thực hiện các tác vụ xử lý văn bản cụ thể hơn)**
    - Phân loại văn bản: các mô hình downstream về phân loại cảm xúc, nhận dạng ý định, nhận dạng nội dung spam, v.v. trực tiếp tái sử dụng biểu diễn của lớp này.
    - Trích xuất thông tin: nhận dạng thực thể, trích xuất quan hệ được tinh chỉnh dựa trên biểu diễn từ / câu, thay vì huấn luyện từ đầu.
    - Sinh văn bản: cung cấp đầu vào biểu diễn ngữ nghĩa cho các tác vụ sinh như tóm tắt, viết lại, tiếp tục viết, nâng cao chất lượng và khả năng kiểm soát sinh văn bản.
- **Nguyên lý**
  Học biểu diễn từ, câu, tài liệu, làm nền tảng cho các tác vụ phức tạp hơn về sau.
  - Mô hình hóa ngôn ngữ
    - Mô hình ngôn ngữ tự hồi quy: dự đoán token tiếp theo (dòng GPT, LLaMA, Qwen, v.v.)
    - Mô hình ngôn ngữ có mặt nạ (Masked LM): dự đoán token bị che (BERT, RoBERTa, ERNIE)
  - Biểu diễn từ / câu / đoạn văn
    - Vector từ tĩnh: Word2Vec, GloVe, FastText
    - Biểu diễn theo ngữ cảnh: BERT embedding, Sentence‑BERT, v.v.
    - Vector cấp tài liệu: dùng cho truy xuất ngữ nghĩa, khớp độ tương tự
- **Mô hình**
  BERT / RoBERTa / ERNIE, dòng GPT, LLaMA / Qwen / Yi và các LLM khác; các mô hình Embedding (dòng OpenAI text‑embedding‑3, bge, E5, SimCSE, v.v.).

### **1.1.1 Mô Hình Hóa Ngôn Ngữ: Học Ngôn Ngữ Qua "Đoán Từ Tiếp Theo"**

Bước đầu tiên của lớp này là cho mô hình **làm quen với các quy luật ngôn ngữ** trên lượng lớn văn bản. Cách làm có thể hiểu đơn giản là: ra cho mô hình vô số "bài đoán từ", sau khi xem ngữ cảnh của một đoạn văn, để nó điền vào từ (token) hợp lý nhất. Bài tập đủ nhiều, ngữ liệu đủ rộng, mô hình sẽ dần học được: một câu tự nhiên trông như thế nào, những từ nào thường xuất hiện cùng nhau, cách diễn đạt nào đọc thấy gượng gạo. Quá trình này gọi là "mô hình hóa ngôn ngữ", bản chất là một **cơ chế huấn luyện đoán từ** thống nhất.

Có hai cách ra đề phổ biến, mỗi cách lấy một câu ví dụ đơn giản:

1. **Tiếp nối về sau (tự hồi quy)**: chỉ cho phần nội dung phía trước, để mô hình đoán "tiếp theo sẽ nói gì".
2. Nhập tiền tố: `Hôm nay trời mưa, vì vậy tôi`
3. Nhiệm vụ mô hình: đoán từ tiếp theo, ví dụ " **mang** （ô）" " **không** （ra ngoài）" " **định** （ở nhà）" v.v., rồi tiếp tục nối về sau.
   Cách này chủ yếu rèn luyện khả năng nắm bắt **viết tiếp, tính mạch lạc, các cách diễn đạt thông thường** của mô hình.
4. **Đào lỗ điền từ (mặt nạ)**: đào một lỗ ở giữa, để mô hình dùng ngữ cảnh cả trước lẫn sau để điền vào chỗ trống.
5. Câu gốc: `Hôm nay trời mưa, vì vậy tôi mang ô`
6. Câu huấn luyện: `Hôm nay [MASK] rồi, vì vậy tôi mang ô`
7. Nhiệm vụ mô hình: điền `[MASK]` thành " **trời mưa** " hoặc các từ hợp lý tương tự.
   Ở đây mô hình phải xem cả bên trái "Hôm nay" "rồi" lẫn bên phải "vì vậy tôi mang ô" mới có thể quyết định điền gì, thuận lợi hơn cho việc học **ngữ nghĩa toàn câu**.

Qua việc lặp đi lặp lại hai loại "bài đoán từ" này trên lượng lớn ngữ liệu, mô hình sẽ dần tích lũy được **cảm quan ngôn ngữ và kiến thức thống kê thông thường**. Trên cơ sở đó, bước tiếp theo chúng ta sẽ biến năng lực này thành **biểu diễn vector của từ, câu và tài liệu** một cách tường minh, làm nền tảng cho các tác vụ truy xuất, gợi ý và hỏi đáp về sau.

### 1.1.2 Biểu Diễn Từ, Câu và Tài Liệu: Ánh Xạ Ký Hiệu Rời Rạc Vào Không Gian Ngữ Nghĩa

Thế hệ phương pháp xây dựng vector văn bản đầu tiên là **vector từ tĩnh**: gán cho mỗi từ một vector cố định, sau khi huấn luyện xong không thay đổi theo ngữ cảnh, trực quan, đơn giản, nhưng **không thể phân biệt nghĩa của từ đa nghĩa trong các ngữ cảnh khác nhau.** Để giải quyết vấn đề này, sau đó xuất hiện phương pháp biểu diễn động dựa trên ngữ cảnh: cùng một từ trong các câu khác nhau sẽ tạo ra các vector khác nhau, hoàn toàn do ngữ cảnh mà nó xuất hiện quyết định. Ví dụ, "Apple" trong "Apple ra mắt điện thoại mới" sẽ nghiêng về hướng ngữ nghĩa "công ty công nghệ", trong khi "Apple giàu vitamin" thì lại gần khái niệm "trái cây" hơn.

Cơ chế này không chỉ nâng cao khả năng biểu đạt ở cấp độ từ, mà còn mở đường cho việc vector hóa câu và tài liệu. Với câu, có thể tạo ra vector câu; với tài liệu, có thể nhập cả tài liệu để mã hóa (nếu độ dài cho phép), hoặc mã hóa từng đoạn rồi tổng hợp thành một vector toàn cục thông qua cơ chế attention, pooling phân cấp, học tương phản, v.v. Các mô hình embedding chuyên dụng gần đây (như bge, E5, dòng text-embedding) chính là liên tục tối ưu hóa xung quanh mục tiêu "làm cho văn bản có ngữ nghĩa gần nhau thì gần nhau hơn trong không gian vector", đặc biệt nổi bật trong các tác vụ truy xuất ngữ nghĩa, khớp tương tự.

Quy trình từ mô hình hóa ngữ cảnh đến sinh vector câu/tài liệu này đã trở thành cơ sở hạ tầng cốt lõi đằng sau các hệ thống tìm kiếm, gợi ý, hỏi đáp. Hãy quay lại các tình huống đã đề cập ở trên:

- Tình huống tìm kiếm và truy xuất (tìm kiếm tổng quát, tìm kiếm thương mại điện tử, truy xuất cơ sở tri thức) đều cần mã hóa đầu vào của người dùng và tài liệu ứng viên thành vector, rồi thực hiện khớp độ tương tự trong không gian vector để tìm kết quả ngữ nghĩa gần nhất, thay vì chỉ khớp chính xác từ khóa.
- Tình huống gợi ý và xếp hạng (gợi ý luồng thông tin, gợi ý sản phẩm, mô hình hóa sở thích người dùng) cần chuyển đổi nội dung tương ứng với hành vi lịch sử của người dùng thành vector, rồi tìm nội dung mới có vector gần tương tự để gợi ý cho người dùng, thực hiện hiệu quả cá nhân hóa "đã xem A gợi ý B".
- Tình huống trợ lý hỏi đáp (hỏi đáp FAQ, hỏi đáp cơ sở tri thức) cần mã hóa câu hỏi của người dùng và các câu hỏi hoặc đoạn văn trong cơ sở tri thức thành vector, tìm câu trả lời khớp nhất thông qua độ tương tự vector.
- Tình huống phân tích hiểu văn bản (dư luận bình luận, loại bỏ trùng lặp, phân cụm) cần trước tiên chuyển từng đoạn văn bản thành vector, rồi thực hiện phân cụm, tính độ tương tự hoặc phân loại dựa trên vector.
- Tình huống tác vụ downstream (phân loại văn bản, trích xuất thông tin, sinh văn bản) thì trực tiếp sử dụng biểu diễn vector của lớp này làm đặc trưng đầu vào, đưa vào bộ phân loại, bộ trích xuất hoặc bộ sinh tiếp theo, tránh phải học ngữ nghĩa từ đầu.

Về mặt kỹ thuật, cách làm phổ biến là đóng gói thành một "dịch vụ vector văn bản" thống nhất: nhập bất kỳ đoạn văn bản nào, đầu ra là một chuỗi vector có số chiều cố định, dùng chung cho nhiều hệ thống như tìm kiếm, gợi ý, hỏi đáp. Ở cấp độ sản phẩm, năng lực của lớp này chủ yếu thể hiện ở: thu hồi ngữ nghĩa trong tìm kiếm và gợi ý (không còn chỉ dựa vào từ khóa, mà thu hồi nội dung "nói khác nhau nhưng ý nghĩa tương tự" thông qua độ tương tự vector), cũng như dịch vụ embedding / truy xuất vector thống nhất hướng đến cơ sở tri thức doanh nghiệp, FAQ, thư viện tình huống.
## 1.2 Phân loại văn bản và So khớp văn bản (Classification & Matching)

Trong phần trước, chúng ta đã dùng mô hình ngôn ngữ cơ bản và biểu diễn văn bản để tìm ra "tọa độ" của mỗi đoạn văn bản trong không gian ngữ nghĩa. Tuy nhiên, chỉ có tọa độ thôi là chưa đủ — điều mà nghiệp vụ thực sự quan tâm thường là: đoạn văn bản này thuộc loại nào? Nó và một đoạn văn bản khác có nói về cùng một sự việc không? Hai câu đó về mặt logic là hỗ trợ hay mâu thuẫn nhau? Bạn có thể hiểu đơn giản như sau: dùng hai khả năng phân loại và so khớp để chuyển hóa biểu diễn vector ở tầng dưới thành nhãn và tín hiệu liên quan có thể trực tiếp thúc đẩy quyết định nghiệp vụ. Chúng ta vẫn sẽ xem xét tầng này từ ba góc độ: kịch bản, nguyên lý và mô hình:

- **Kịch bản**
  - Hiểu nội dung và kiểm duyệt: Gắn nhãn chủ đề, cảm xúc, rủi ro... cho bình luận, bài đăng, bài viết, phục vụ kiểm duyệt, gợi ý, phân tích thống kê.
  - Gợi ý và xếp hạng: Dựa trên mức độ khớp giữa "nhãn sở thích người dùng" và "nhãn nội dung" để quyết định hiển thị nội dung nào và ưu tiên thứ tự ra sao.
  - Tìm kiếm và FAQ: Người dùng nhập một câu hỏi ngôn ngữ tự nhiên bất kỳ, hệ thống tự động tìm ra cặp câu hỏi–câu trả lời hoặc đoạn tài liệu liên quan nhất.
  - Nhận diện nội dung tương đồng: Tìm các mục "có nội dung gần nhau" trong lượng lớn văn bản, dùng để loại trùng, gộp thống kê, gợi ý "nội dung liên quan".
  - Phán đoán quan hệ logic: Xác định hai câu có hỗ trợ nhau, mâu thuẫn nhau hay không liên quan, phục vụ kiểm tra sự thật, kiểm tra tính nhất quán trong hội thoại đa lượt, v.v.
- **Nguyên lý**
  Trên nền biểu diễn ngữ nghĩa, thực hiện phán đoán tổng thể đối với từng đoạn văn bản đơn lẻ hoặc cặp văn bản:
  - Phân loại văn bản: Gắn nhãn cho một văn bản đơn (như cảm xúc, chủ đề, loại rủi ro...);
  - So khớp văn bản: Đánh giá độ tương đồng, mức độ liên quan giữa hai đoạn văn bản, hoặc "câu hỏi–câu trả lời" có khớp nhau không;
- **Mô hình**
  Lấy encoder được pre-train làm nền, gắn thêm cấu trúc phân loại / so khớp đơn giản:
  - Phân loại văn bản đơn: BERT / RoBERTa / DeBERTa + lớp phân loại fully connected;
  - So khớp văn bản: Sentence‑BERT, SimCSE, Bi‑Encoder, Cross‑Encoder;
  - Phán đoán phức tạp: Trên LLM thông qua instruction fine-tuning, để mô hình trực tiếp xuất ra nhãn hoặc quan hệ logic.

### 1.2.1 Phân loại văn bản: từ "hiểu nội dung" đến "định tính nội dung"

Nhờ biểu diễn ngữ nghĩa từ tầng trước, chúng ta có thể rất tự nhiên gắn thêm một classification head đơn giản phía trên, và với một lượng nhỏ dữ liệu có nhãn, giúp mô hình học cách trả lời câu hỏi: **"Đoạn văn bản này thuộc loại nào?"**

Điển hình nhất là **phân loại cảm xúc**. Một câu đánh giá của người dùng có thể là khen ngợi, phàn nàn, hoặc chỉ đơn thuần là trình bày sự thật. Sau khi mô hình nhận được biểu diễn vector của câu đó, chỉ cần gắn thêm một lớp phân loại softmax là có thể xuất ra xác suất "tích cực / tiêu cực / trung lập". Khả năng này đã rất trưởng thành trong các kịch bản như thương mại điện tử, mạng xã hội, chợ ứng dụng, v.v.

Một nhóm lớn khác là **phân loại chủ đề / ngành**. Trong gợi ý tin tức, chúng ta muốn biết một bài báo thuộc thể thao, tài chính hay giải trí; trong hệ thống chăm sóc khách hàng / ticket nội bộ doanh nghiệp, điều quan tâm hơn là đây là tư vấn sản phẩm, lỗi tính năng hay phản hồi khiếu nại. Những nhãn này vừa giúp nội dung được định tuyến chính xác vào đúng quy trình, vừa đóng vai trò là đặc trưng quan trọng trong giai đoạn xếp hạng gợi ý.

Ở mức cao hơn, **phân loại rủi ro / tuân thủ** liên quan trực tiếp đến an toàn nền tảng. Chúng ta sẽ xây dựng các mô hình phân loại chuyên biệt cho các hạng mục như dẫn dắt quảng cáo, xúc phạm tấn công, nhạy cảm chính trị, nội dung khiêu dâm thấp kém... kết hợp với kiểm duyệt thủ công để chặn hoặc giảm hạng nội dung có rủi ro cao. Có thể nói, cửa ải đầu tiên trong hầu hết các chiến lược an toàn nội dung đều do các bộ phân loại loại này tạo thành.

Có thể thấy, đến tầng này, chúng ta đã có thể chuyển hóa "biểu diễn ngữ nghĩa trừu tượng" thành các nhãn có thể dùng được trong nghiệp vụ. Tiếp theo, điều chúng ta cần thảo luận là: khi các văn bản có quan hệ với nhau, chúng ta **so khớp và suy luận** như thế nào.

### 1.2.2 So khớp văn bản: "tìm câu phù hợp nhất" cho một câu cho trước

Khác với phân loại "định tính một văn bản đơn lẻ", **so khớp văn bản** tập trung vào "mức độ liên quan giữa hai đoạn văn bản". Trong nhiều sản phẩm, đây thường là mắt xích then chốt để hiện thực hóa "trí thông minh": người dùng nói một câu, hệ thống có tìm được câu phù hợp nhất trong kho tri thức để phản hồi hay không, hoàn toàn phụ thuộc vào chất lượng so khớp.

Cơ bản nhất là **tính toán độ tương đồng ngữ nghĩa**. Chúng ta trước tiên dùng mô hình embedding từ tầng trước để mã hóa hai câu thành vector, sau đó dùng cosine similarity, dot product... để đánh giá khoảng cách của chúng trong không gian ngữ nghĩa. Các mô hình như SimCSE, Sentence‑BERT được xây dựng thông qua contrastive learning, chuyên kéo gần "các cặp câu tương đồng" và đẩy xa "các cặp câu không tương đồng".

Trên nền đó, **phát hiện diễn giải lại** (paraphrase detection) và **phát hiện đạo văn** chỉ là các tác vụ so khớp trong kịch bản ứng dụng cụ thể. Cái trước dùng để loại trùng nội dung, tránh nền tảng tràn ngập các biểu đạt lặp lại; cái sau trong các kịch bản giáo dục, cộng đồng tri thức... dùng để nhận diện các câu trả lời hay bài viết có mức độ tương đồng cao. Về mặt kỹ thuật, bản chất cả hai đều là phân loại nhị phân hoặc xếp hạng dựa trên độ tương đồng văn bản.

Một ứng dụng downstream rất quan trọng là **so khớp câu hỏi–câu trả lời**. Khi người dùng đặt một câu hỏi ngôn ngữ tự nhiên, chúng ta không dùng từ khóa để so khớp trực tiếp với FAQ, mà dùng vector ngữ nghĩa để recall trước, sau đó dùng mô hình so khớp tinh tế hơn (như Cross‑Encoder) để rerank một số ứng viên, chọn ra câu có khả năng tương ứng cao nhất. Chuỗi xử lý này tạo thành nền tảng của chatbot FAQ và hệ thống hỏi đáp tài liệu.

Ở tầng này, chúng ta đã có khả năng phân loại và phán đoán quan hệ đối với "toàn bộ đoạn văn bản". Nhưng trong nhiều kịch bản, nghiệp vụ không dừng lại ở đó, mà còn muốn biết thêm: **đoạn văn bản này cụ thể đề cập đến những thực thể nào, đã xảy ra sự kiện gì**. Điều này tự nhiên dẫn đến chủ đề của phần tiếp theo — **gán nhãn chuỗi và trích xuất thông tin**.
## 1.3 Gán Nhãn Chuỗi và Trích Xuất Thông Tin (Sequence Labeling & Information Extraction)

Sau khi hoàn thành việc phân loại và so khớp toàn bộ văn bản, chúng ta thường gặp một nhu cầu chi tiết hơn: không chỉ cần biết "bài viết này nói về chủ đề gì, mức độ rủi ro có cao không", mà còn cần biết thêm "nó đề cập đến ai cụ thể, ở đâu, khi nào, số tiền là bao nhiêu". Phần này chính là bước then chốt tiến đến "cấu trúc hóa chi tiết" dựa trên nền tảng đánh giá tổng thể. Bạn có thể hiểu như sau: trong điều kiện đã biết "nên xem loại văn bản nào, nội dung đại khái là gì", chúng ta đào sâu vào bên trong văn bản để khai thác thực thể, quan hệ, sự kiện và các trường dữ liệu, giúp văn bản phi cấu trúc có thể được hệ thống nghiệp vụ tiêu thụ trực tiếp. Chúng ta cũng xem xét tầng này từ bốn khía cạnh: mục tiêu, nguyên lý, mô hình và sản phẩm:

- **Tình huống ứng dụng**
  - Cấu trúc hóa văn bản ngành: Từ các tài liệu như hợp đồng, báo cáo, thông báo, bệnh án, chính sách, trích xuất các trường thông tin quan trọng như tên người, tổ chức, số tiền, thời gian, điều khoản để nhập cơ sở dữ liệu và tìm kiếm.
  - Đồ thị tri thức và mạng quan hệ: Nhận dạng thực thể và quan hệ giữa chúng từ tin tức, bài báo, hỏi đáp, xây dựng đồ thị "ai có quan hệ gì với ai" phục vụ tìm kiếm, gợi ý và phân tích.
  - Xử lý hóa đơn và chứng từ: Tự động trích xuất các trường như tiêu đề, mã số thuế, số tiền, ngày tháng từ hóa đơn, bảng đối chiếu, phiếu hoàn tiền, giảm thiểu nhập liệu thủ công.
  - Phân tích dư luận và sự kiện: Trích xuất "ai đã làm gì, khi nào, ở đâu" từ khối lượng văn bản lớn phục vụ theo dõi sự kiện, cảnh báo rủi ro và báo cáo thống kê.
  - Cấu trúc hóa nhật ký và phiếu yêu cầu: Trích xuất thông tin quan trọng từ văn bản phi cấu trúc như hội thoại chăm sóc khách hàng, phiếu yêu cầu, nhật ký hệ thống để thuận tiện thống kê, giám sát và xử lý tự động.
- **Nguyên lý**
  Thực hiện gán nhãn chi tiết và cấu trúc hóa văn bản ở cấp độ token / cụm từ:
  - Gán nhãn chuỗi: Gán nhãn cho từng token (như tên người, tên địa danh, tên tổ chức, tên sản phẩm, v.v.), thực hiện nhận dạng thực thể có tên (NER), gán nhãn từ loại, phân đoạn cụm từ, v.v.;
  - Trích xuất quan hệ và sự kiện: Nhận dạng quan hệ "thực thể‑thực thể" và cấu trúc sự kiện "ai đã làm gì, khi nào, ở đâu" dựa trên các thực thể đã nhận dạng;
  - Trích xuất trường nghiệp vụ: Dựa trên schema nghiệp vụ cụ thể (như trường hợp đồng, trường hóa đơn), chuyển đổi tài liệu dài thành các cặp key‑value hoặc bảng bản ghi chuẩn hóa.
- **Mô hình**
  Dựa trên biểu diễn tiền huấn luyện, thực hiện trích xuất thông tin thông qua gán nhãn chuỗi hoặc trích xuất span:
  - Mô hình gán nhãn chuỗi: BiLSTM‑CRF, BERT + CRF / Softmax, v.v.;
  - Trích xuất dựa trên Span: Dự đoán trực tiếp vị trí bắt đầu và kết thúc của các span thực thể / quan hệ;
  - Trích xuất cấp tài liệu: Các mô hình loại DocIE kết hợp bố cục và định dạng tài liệu;
  - Trích xuất dựa trên LLM: Thông qua Prompt / Few‑shot, cho phép mô hình lớn trích xuất các trường theo định dạng chỉ định.

### 1.3.1 Gán Nhãn Chuỗi: Gắn "Nhãn" Ngữ Nghĩa Cho Từng Token và Cụm Từ

Trong giai đoạn phân loại văn bản, chúng ta chỉ quan tâm toàn bộ đoạn văn thuộc loại nào; còn trong giai đoạn gán nhãn chuỗi, chúng ta cần đánh dấu từng token, từng cụm từ trong văn bản. Nhiệm vụ điển hình nhất là nhận dạng thực thể có tên (NER): nhận dạng các loại thực thể cụ thể như tên người, tên tổ chức, tên địa danh, tên sản phẩm, tên bệnh, v.v.

- Ví dụ, trong câu "Trương Tam gia nhập một công ty công nghệ ở Bắc Kinh", gán nhãn "Trương Tam" là tên người, "Bắc Kinh" là tên địa danh, "một công ty công nghệ" là tên tổ chức.

Về phương pháp mô hình hóa, cách tiếp cận truyền thống sử dụng cấu trúc gán nhãn chuỗi như BiLSTM + CRF, sau đó phổ biến hơn là BERT + CRF hoặc BERT + Softmax, tận dụng khả năng biểu diễn ngữ cảnh của encoder tiền huấn luyện để xác định nhãn của từng token (như B‑ORG, I‑ORG, O, v.v.). Trong thực tế, mô hình NER thường là bước "tiền xử lý" đầu tiên cho đồ thị tri thức và trích xuất quan hệ phía sau.

Ngoài NER, gán nhãn từ loại và phân đoạn cụm từ cũng là những nhiệm vụ gán nhãn chuỗi điển hình. Chúng chủ yếu phục vụ phân tích ngôn ngữ ở tầng thấp, cung cấp cấu trúc cơ sở cho các nhiệm vụ ngữ pháp / ngữ nghĩa phức tạp hơn ở phía sau.

- Ví dụ, với chuỗi "nhanh chóng nâng cao hiệu suất mô hình", gán nhãn "nhanh chóng" là trạng từ, "nâng cao" là động từ, "hiệu suất" là danh từ để phục vụ phân tích downstream.

### 1.3.2 Trích Xuất Quan Hệ và Sự Kiện: Nối "Điểm" Thành "Đường" và "Câu Chuyện"

Sau khi nhận dạng được các thực thể trong văn bản thông qua gán nhãn chuỗi, câu hỏi tự nhiên tiếp theo là: các thực thể này có quan hệ gì với nhau, và chúng cùng tạo nên sự kiện như thế nào?

Trích xuất quan hệ tập trung vào "cặp thực thể + loại quan hệ". Ví dụ, trong câu "Trương Tam gia nhập một công ty công nghệ với chức danh CTO vào năm 2024", chúng ta không chỉ nhận dạng hai thực thể "Trương Tam" và "một công ty công nghệ", mà còn phải trích xuất quan hệ "làm việc tại" giữa chúng.

- Nói đơn giản, đó là gắn nhãn quan hệ "nhận việc" lên cặp thực thể "Trương Tam – một công ty công nghệ".

Cao hơn quan hệ, trích xuất sự kiện cố gắng tái tạo "ai đã làm gì, khi nào, ở đâu". Lấy một bài báo làm ví dụ, một mẫu sự kiện chuẩn có thể bao gồm nhiều slot: loại sự kiện (mua lại, hợp tác, tai nạn), thời gian, địa điểm, các bên tham gia, số tiền, hậu quả, v.v. Mô hình trích xuất sự kiện cần tự động điền vào các slot này từ văn bản dài, từ đó xây dựng "bảng sự kiện" có thể tìm kiếm, thống kê và suy luận.

- Ví dụ, từ câu "một công ty mua lại công ty khác với giá 5 tỷ đồng", trích xuất: loại sự kiện=mua lại, số tiền=5 tỷ đồng, các bên tham gia=hai công ty.

Về phương pháp mô hình hóa, ngoài trích xuất theo gán nhãn chuỗi truyền thống, chúng ta còn sử dụng Span‑based IE (dự đoán trực tiếp vị trí bắt đầu và kết thúc của span thực thể / quan hệ) cũng như Prompt‑based IE và trích xuất Few‑shot dựa trên LLM nổi lên trong những năm gần đây. Ưu điểm của phương pháp sau là có thể nhanh chóng thích nghi với schema mới thông qua các prompt ngôn ngữ tự nhiên, giảm thiểu chi phí gán nhãn lại và huấn luyện lại đáng kể.

Từ góc độ kỹ thuật, các hệ thống trích xuất trưởng thành thường hình thành một pipeline:

- Upstream NER / gán nhãn chuỗi nhận dạng thực thể;
- Tầng trung gian mô hình hóa cấu trúc quan hệ và sự kiện;
- Downstream ghi kết quả vào cơ sở dữ liệu hoặc đồ thị tri thức để các hệ thống tìm kiếm, phân tích và kiểm soát rủi ro tiêu thụ.
## 1.4 Tạo Sinh và Chỉnh Sửa Văn Bản (Text Generation & Editing)

Trong các phần trước, chúng ta đã lần lượt xây dựng chuỗi hiểu ngôn ngữ "biểu diễn → phân loại và khớp → gán nhãn chuỗi và trích xuất": mô hình không chỉ có thể ánh xạ văn bản vào không gian ngữ nghĩa, mà còn có thể đưa ra phán đoán trên toàn đoạn văn và trích xuất thông tin có cấu trúc từ đó. Phần này sẽ thực hiện "đảo ngược" chuỗi hiểu đó: trên nền tảng hiểu biết đầy đủ, cho phép mô hình chủ động tạo ra, viết lại, nén và trau chuốt văn bản. Bạn có thể hiểu đây là: thực hiện "mã hóa ngược" trong không gian ngữ nghĩa, chuyển đổi biểu diễn nội tại trở lại thành đầu ra ngôn ngữ tự nhiên chất lượng cao — đây là tầng gần nhất với nhận thức của người dùng trong toàn bộ chuỗi năng lực xử lý văn bản. Chúng ta vẫn phân tích theo bốn chiều: mục tiêu, nguyên lý, mô hình và sản phẩm:

- **Tình huống ứng dụng**
  - Viết lách và văn phòng hàng ngày: tạo email, thông báo, bản thảo kế hoạch, hoặc mở rộng, viết lại và trau chuốt văn bản hiện có.
  - Quản lý tri thức và tóm tắt: tự động tóm tắt tài liệu dài, báo cáo, biên bản cuộc họp, giúp nắm bắt nhanh trọng tâm.
  - Dịch vụ khách hàng và hỏi đáp: tự động tạo câu trả lời có cấu trúc rõ ràng, giọng văn nhất quán dựa trên câu hỏi của người dùng và tài liệu được truy xuất.
  - Nội dung marketing và sáng tạo: tạo bản sao quảng cáo, bài đăng mạng xã hội, giới thiệu sự kiện, kịch bản, v.v.
  - Tình huống đa ngôn ngữ: thực hiện dịch thuật, bản địa hóa, thích ứng với các ngôn ngữ và bối cảnh khác nhau trong khi vẫn giữ nguyên ý nghĩa gốc.
- **Nguyên lý**
  Dựa trên mô hình hóa ngôn ngữ, thực hiện "tạo sinh từ đầu" và "chỉnh sửa dựa trên nội dung có sẵn":
  - Tạo sinh tự do: tạo ra một đoạn văn bản hoàn chỉnh từ đầu dựa trên ý định, prompt hoặc dàn ý;
  - Viết lại có kiểm soát: điều chỉnh phong cách, độ dài, cấu trúc (như tóm tắt, mở rộng, chuyển đổi phong cách) trong khi giữ nguyên thông tin cốt lõi;
  - Sửa lỗi và trau chuốt: sửa lỗi chính tả, vấn đề ngữ pháp, tối ưu hóa thứ tự diễn đạt và cấu trúc logic.
- **Mô hình**
  Chủ yếu là các mô hình tạo sinh được tiền huấn luyện quy mô lớn + tinh chỉnh theo hướng dẫn:
  - LLM được tinh chỉnh theo hướng dẫn: dòng GPT, LLaMA / Qwen / GLM, v.v., dùng cho tạo sinh và chỉnh sửa đa năng;
  - Mô hình Seq2Seq: T5, BART, mT5, v.v., dùng cho các tác vụ tóm tắt, dịch thuật, chuyển đổi định dạng;
  - Căn chỉnh và an toàn: thông qua các phương pháp như RLHF / RLAIF, giúp nội dung tạo ra phù hợp hơn với hướng dẫn và yêu cầu an toàn.

Do phần này về cơ bản tương đương với kỹ thuật prompt, nên sẽ không trình bày thêm — bạn có thể tự tham khảo phần hướng dẫn kỹ thuật prompt.

# 2. Mô Thức Hình Ảnh (Image / Vision)

Trong các năng lực AI, mô thức hình ảnh đảm nhận vai trò "hiểu thế giới bằng thị giác". Dù mục tiêu cuối cùng là giám sát an ninh, xe tự lái, hiệu ứng video ngắn, chỉnh sửa ảnh thông minh cho thương mại điện tử, hay hỏi đáp đa phương thức, AI vẽ tranh — về bản chất tất cả đều không thể tách rời khỏi một con đường: bắt đầu từ các pixel thô, từng bước đạt được khả năng hiểu có cấu trúc và tạo sinh có kiểm soát đối với nội dung hình ảnh.
## 2.1 Thị Giác Cấp Thấp (Low‑Level Vision)

Ở phần trước, chúng ta đã tổng quan về vai trò của phương thức thị giác trong hệ thống đa phương thức, cũng như cách nó kết nối với ngôn ngữ và giọng nói. Nhưng trước khi thực sự đi vào các "nhiệm vụ ngữ nghĩa cấp cao" như phát hiện đối tượng, hiểu ảnh, trả lời câu hỏi thị giác, còn một tầng năng lực nền tảng thường bị bỏ qua nhưng cực kỳ quan trọng — đó là thị giác cấp thấp. Bạn có thể hiểu nó như sau: trước khi "hiểu được trong ảnh có gì", hệ thống cần giải quyết hai câu hỏi: "chất lượng bức ảnh này như thế nào" và "có những cấu trúc cục bộ ổn định nào có thể được tầng trên tái sử dụng" — thông qua một lớp phục hồi, tăng cường và trích xuất cấu trúc tổng quát, chuyển đổi pixel thô thành biểu diễn ảnh sạch hơn và ổn định hơn.

Nhìn từ góc độ kỹ thuật, thị giác cấp thấp vừa ảnh hưởng trực tiếp đến "trải nghiệm chất lượng hình ảnh" mà người dùng cảm nhận bằng mắt thường, vừa quyết định phân phối đầu vào cho các nhiệm vụ phát hiện, nhận dạng, phân đoạn ở tầng trên có lành mạnh hay không. Nếu tầng này làm không tốt, tất cả các mô hình phía sau đều phải vận hành trong môi trường "nhiễu lớn, biến dạng nặng, ánh sáng cực đoan"; ngược lại, nếu ở tầng này ảnh đã được sửa chữa tốt nhất có thể và thông tin cấu trúc được chắt lọc kỹ, các nhiệm vụ cấp cao có thể phát huy năng lực trên một nền tảng thân thiện hơn. Dưới đây chúng ta cũng nhìn từ ba góc độ: bối cảnh ứng dụng, nguyên lý và mô hình:

- **Bối cảnh ứng dụng**
  - Máy ảnh và thiết bị chụp: khử nhiễu tự động, HDR, chế độ chụp đêm, chống rung trên điện thoại/máy ảnh; hợp nhất nhiều khung hình để nâng cao chi tiết và dải động.
  - Nền tảng nội dung và video ngắn: tăng cường chất lượng ảnh/video tải lên bằng một chạm, loại bỏ nhiễu nén, nâng độ sắc nét và độ tương phản, cải thiện cảm quan chủ quan.
  - Phục hồi ảnh cũ và tài liệu: khử nhiễu, tô màu, siêu phân giải cho ảnh cũ; tự động nắn thẳng và tăng cường hóa đơn, hợp đồng, trang sách bị chụp nghiêng hay tối, hỗ trợ OCR.
  - Giám sát và an ninh: khử nhiễu, khử sương mù, loại bỏ giọt mưa, nâng độ phân giải cho camera giám sát ánh sáng thấp, tạo nền tảng cho nhận dạng khuôn mặt/biển số phía sau.
  - AR/VR và tái tạo 3D: cung cấp các điểm góc, cạnh và bộ mô tả cục bộ ổn định cho SLAM, ghép ảnh panorama, tái tạo 3D, đảm bảo độ bền vững của theo dõi và hiệu chỉnh.
- **Nguyên lý**
  Xoay quanh hai mục tiêu cốt lõi "chất lượng ảnh" và "cấu trúc cục bộ", thực hiện mô hình hóa vật lý và thống kê trên thông tin cấp pixel:
  - Phục hồi và tăng cường ảnh: giả định ảnh quan sát được là ảnh lý tưởng sau khi bị suy giảm bởi nhiễu, kernel làm mờ, nén và phi tuyến tính trong tạo ảnh; dựa trên giả định này để thực hiện khử nhiễu, khử mờ, loại bỏ nhiễu tạo tác nén, tăng cường ánh sáng thấp và tái tạo siêu phân giải, làm cho đầu ra gần hơn với ảnh thực của cảnh thật, đồng thời phù hợp với thói quen cảm nhận của mắt người.
  - Trích xuất đặc trưng cấu trúc: không cần đưa vào nhãn ngữ nghĩa cụ thể, trích xuất các đặc trưng như cạnh, góc, kết cấu cục bộ, vùng nổi bật từ gradient pixel và thống kê kết cấu, cung cấp "bộ khung hình học" cho các nhiệm vụ phát hiện, hiệu chỉnh, theo dõi, phân đoạn phía sau.
  - Tiền xử lý hình học và ánh sáng: dựa trên mô hình máy ảnh và các gợi ý hình học đơn giản (đường thẳng, điểm biến mất, tính đối xứng...) để ước tính quan hệ biến dạng và phối cảnh, thông qua khử biến dạng, nắn thẳng, chuẩn hóa độ tương phản và ánh sáng để căn chỉnh ảnh thô về không gian đầu vào chuẩn hóa và ổn định hơn.
- **Mô hình**
  Kết hợp phương pháp xử lý ảnh cổ điển và mô hình học sâu, cân nhắc giữa hiệu quả và hiệu suất:
  - Xử lý ảnh truyền thống: lọc song phương, non-local means, lọc dẫn hướng, Retinex, cân bằng histogram, phát hiện cạnh Canny/LoG, góc Harris/FAST, bộ mô tả SIFT/SURF/ORB, biến đổi Hough, hiệu chỉnh máy ảnh và sửa hình học...
  - Mô hình phục hồi và tăng cường sâu: các mô hình khử nhiễu, khử mờ, siêu phân giải, khử mưa/sương mù/nhiễu tạo tác nén dựa trên CNN hoặc Vision Transformer (như EDSR, RCAN, SwinIR, ESRGAN...), cùng mạng tăng cường đa khung/video; học ánh xạ từ ảnh suy giảm sang ảnh chất lượng cao theo phương thức end-to-end, hoặc sử dụng các mô hình chỉnh sửa ảnh hiện đại như Jimo (即梦) và mô hình chỉnh sửa Qwen.

### 2.1.1 Phục Hồi và Tăng Cường Ảnh: Từ "Nhìn Thấy" Đến "Nhìn Rõ"

Trong thị giác cấp thấp, phục hồi và tăng cường ảnh phải đối mặt đầu tiên với các loại suy giảm chất lượng: nhiễu, mờ, méo do nén, ánh sáng thấp, dải động không đủ... Nhiều ảnh thô trong các tình huống thực tế không "sạch": ánh sáng yếu ban đêm và trong nhà khiến khung hình đầy hạt và đốm màu, ảnh chụp nhanh và camera giám sát thường bị mờ do chuyển động hoặc lấy nét sai, nén video mang lại nhiễu dạng khối vuông. Mục tiêu của phục hồi và tăng cường là, trong khi không thay đổi nội dung ngữ nghĩa của ảnh, khôi phục chi tiết rõ ràng và cảm quan tự nhiên nhất có thể, biến đầu vào "mờ, tối, bẩn" thành "rõ, sáng, dễ chịu".

Các nhiệm vụ điển hình bao gồm khử nhiễu, khử mờ, tăng cường ánh sáng thấp và siêu phân giải. Khử nhiễu và khử mờ cần cân bằng giữa kết cấu cục bộ và cấu trúc tổng thể: vừa phải triệt tiêu nhiễu tần số cao và loại bỏ ảnh hưởng của kernel làm mờ bằng giải tích chập, vừa không được xóa luôn cả chi tiết thật; tăng cường ánh sáng thấp thì phải nâng độ sáng và độ tương phản trong khi tránh kéo nhiễu vùng tối lên theo, đồng thời hiệu chỉnh lệch màu và kiềm chế vùng quá sáng; siêu phân giải tập trung vào việc bổ sung thông tin tần số cao hợp lý khi phóng to, làm cho ảnh phóng to vừa không "mờ" hay "nặng cảm giác nhựa", vừa không "bịa đặt" chi tiết quá mức. Các phương pháp hiện đại phần lớn dùng mạng sâu (CNN hoặc Vision Transformer), học ánh xạ từ ảnh quan sát y sang ảnh lý tưởng x trên lượng lớn dữ liệu cặp "suy giảm–sạch", đồng thời sử dụng mục tiêu tổ hợp gồm lỗi pixel, tổn thất nhận thức và tổn thất đối nghịch, cân bằng giữa "chỉ số đẹp" và "mắt người thấy đẹp".

Các khả năng này trong sản phẩm thường hiện diện theo cách ngầm: chế độ chụp đêm và chụp HDR trên camera điện thoại, tăng cường chất lượng một chạm trên nền tảng video ngắn, công cụ phục hồi ảnh cũ, dịch vụ tăng cường đám mây cho hệ thống giám sát — về bản chất đều dựa vào mô-đun phục hồi và tăng cường của tầng này. Đối với doanh nghiệp, chúng vừa ảnh hưởng trực tiếp đến cảm nhận chủ quan của người dùng về "chất lượng hình ảnh", vừa gián tiếp quyết định chất lượng đầu vào cho các thuật toán phát hiện, nhận dạng, phân đoạn ở tầng trên. Có thể nói, nhiệm vụ thị giác cấp cao càng phức tạp thì càng phụ thuộc vào tầng dưới có một "nền ảnh" chất lượng cao và phân phối ổn định.

### 2.1.2 Đặc Trưng Cấu Trúc và Tiền Xử Lý: Dựng "Giàn Giáo" Cho Hiểu Biết Cấp Cao

Khi chất lượng ảnh được phục hồi đến mức có thể sử dụng, công việc quan trọng thứ hai của thị giác cấp thấp là trích xuất từ pixel các đặc trưng tạm thời không liên quan đến ngữ nghĩa cụ thể nhưng rất quan trọng cho cấu trúc hình học và nhận thức thị giác, đồng thời thống nhất hóa hình học và ánh sáng. Bước này sẽ không trực tiếp cho bạn biết "đây là một chiếc xe" hay "đây là khuôn mặt của ai đó", nhưng sẽ trả lời các câu hỏi như "ở đâu có đường viền và góc cạnh rõ ràng", "vùng nào có cấu trúc kết cấu nổi bật", "ảnh có bị biến dạng hay nghiêng không" — cung cấp đầu vào có cấu trúc đáng tin cậy cho các mô hình tầng trên.

Về trích xuất đặc trưng, cạnh và góc là các yếu tố cơ bản nhất. Thông qua các toán tử Canny, Sobel, hệ thống có thể đánh dấu trên toàn bộ ảnh những "cạnh" có sự thay đổi độ xám hoặc màu sắc mạnh nhất — những cạnh này thường tương ứng với đường viền vật thể, ranh giới bộ phận và hướng kết cấu; phát hiện góc (như Harris, FAST) tìm ra các "điểm góc" có gradient cục bộ thay đổi đáng kể theo nhiều hướng, thường xuất hiện ở góc vật thể và giao điểm đường thẳng. Hơn nữa, các bộ mô tả cục bộ như SIFT, SURF, ORB mã hóa mẫu kết cấu của một vùng nhỏ xung quanh các điểm đặc trưng này, giúp cùng một điểm vật lý vẫn có thể được khớp dưới các góc nhìn, tỉ lệ và biến đổi ánh sáng khác nhau — đây là nền tảng cho hiệu chỉnh ảnh, ghép panorama, SLAM, theo dõi AR và tái tạo 3D.

Song song với trích xuất đặc trưng là các thao tác tiền xử lý hình học và ánh sáng. Biến dạng thùng/gối do ống kính góc rộng, nghiêng và kéo phối cảnh khi chụp tài liệu — tất cả đều được nhận dạng qua các gợi ý hình học cấp thấp như phát hiện đường thẳng, ước tính điểm biến mất, rồi được "kéo về bình thường" qua các bước khử biến dạng, nắn thẳng, hiệu chỉnh phối cảnh; cân bằng histogram toàn cục hoặc thích ứng, kéo độ tương phản và chuẩn hóa ánh sáng nâng cao độ tương phản cục bộ và giảm ảnh hưởng của ánh sáng không đều và bóng đổ trong khi đảm bảo chi tiết không bị mất. Chuyển đổi không gian màu (RGB→HSV/Lab) và thống kê histogram màu cung cấp đầu vào trực tiếp sử dụng được cho các nhiệm vụ phân đoạn dựa trên màu sắc đơn giản, phát hiện vùng nổi bật, hiệu chỉnh lệch màu...

Sau khi học sâu end-to-end trở thành xu hướng chính, một phần các đặc trưng cấu trúc và tiền xử lý này đã được "nội hóa" vào kernel tích chập và chiến lược chuẩn hóa ở vài lớp đầu của mạng, không còn xuất hiện dưới dạng toán tử tường minh trong sơ đồ kiến trúc hệ thống. Nhưng về mặt chức năng, chúng vẫn đóng vai trò như cũ: dùng một lớp xử lý cấp thấp tương đối tổng quát, không phụ thuộc vào loại cụ thể, để sắp xếp pixel thô thành biểu diễn ổn định hơn về hình thái hình học, điều kiện ánh sáng và cấu trúc cục bộ, rồi giao cho các mô-đun phân loại, phát hiện, phân đoạn và đa phương thức ở tầng trên hoàn thành nhiệm vụ "hiểu đây là gì". Không có lớp "giàn giáo" này, các mô hình tầng trên sẽ phải vật lộn trực tiếp trên ảnh thô với nhiều nhiễu, biến dạng nặng và cấu trúc mờ — độ bền vững và khả năng tổng quát hóa của toàn bộ hệ thống sẽ giảm sút đáng kể.
## 2.2 Phân loại và nhận dạng hình ảnh (Image Classification & Recognition)

Trong phần lớn các tác vụ xử lý hình ảnh, điều doanh nghiệp thực sự quan tâm là: **Toàn bộ bức ảnh này thuộc loại nào? Người trong ảnh là ai? Người đi bộ này có xuất hiện ở các camera khác nhau là cùng một người không?** Bạn có thể hiểu tầng này như sau: trên một không gian đầu vào thống nhất và sạch, hệ thống gán "nhãn danh mục" hoặc "nhãn danh tính" cho toàn bộ bức ảnh hoặc toàn bộ người/đối tượng, chuyển đổi tín hiệu thị giác thành kết quả nhận dạng có thể sử dụng trực tiếp nhất.

Từ góc độ sản phẩm, phân loại và nhận dạng hình ảnh là một trong những nhóm năng lực thị giác được triển khai quy mô lớn sớm nhất, đồng thời là "module đầu vào" của nhiều ứng dụng thượng tầng. Nền tảng thương mại điện tử và nội dung dùng nó để tự động gán nhãn ảnh, nhận dạng danh mục chủ thể; hệ thống an ninh và kiểm soát ra vào dùng nó để xác nhận "có phải cùng một người không"; hệ thống tái nhận dạng người đi bộ thì truy tìm dấu vết của cùng một đối tượng qua nhiều camera. Dưới đây chúng ta cũng sẽ phân tích tầng này từ ba góc độ: tình huống, nguyên lý và mô hình:

- **Tình huống**
  - Hiểu ảnh tổng quát: Tự động gán nhãn chủ đề như "phong cảnh / ẩm thực / thú cưng / tài liệu" cho ảnh người dùng tải lên, phục vụ tìm kiếm, gợi ý, kiểm duyệt nội dung.
  - Nhận dạng khuôn mặt và kiểm soát ra vào: Trong hệ thống cửa an ninh và chấm công, nhận dạng danh tính cá nhân từ ảnh khuôn mặt, thực hiện "quét mặt đi qua", "quét mặt chấm công".
  - Tái nhận dạng người đi bộ/nhân viên: Xác định xem có phải cùng một người đi bộ hay cùng một nhân viên trong các hình ảnh từ camera khác nhau, phục vụ tìm kiếm an ninh và phân tích quỹ đạo di chuyển.
  - Nhận dạng thuộc tính người: Mà không cần xác nhận trực tiếp danh tính, nhận dạng các thuộc tính như giới tính, độ tuổi, có đội mũ/đeo ba lô/mặc đồng phục hay không, cung cấp manh mối cho tìm kiếm và phân tích hành vi.
- **Nguyên lý**
  Trong không gian đặc trưng thị giác thống nhất, thực hiện mô hình hóa phân biệt cho toàn bộ ảnh hoặc toàn bộ người/đối tượng:
  - Phân loại hình ảnh: Lấy toàn bộ hình ảnh làm đầu vào, trích xuất đặc trưng toàn cục qua mạng tích chập hoặc Vision Transformer, kết nối một đầu phân loại ở đỉnh đặc trưng, đầu ra là xác suất danh mục đơn nhãn hoặc đa nhãn, dùng để trả lời "đây là loại ảnh gì".
  - Nhận dạng danh tính/thực thể: Chuyển đổi bài toán "là ai" thành bài toán học metric trong không gian đặc trưng, tức là học một không gian nhúng sao cho đặc trưng ảnh của cùng một danh tính gần nhau, đặc trưng của các danh tính khác nhau cách xa nhau, sau đó dùng tìm kiếm láng giềng gần nhất hoặc phân cụm để hoàn thành nhận dạng và tìm kiếm.
  - Nhận dạng thuộc tính: Trên nền đặc trưng người đi bộ/cơ thể người dùng chung, thêm nhiều đầu ra đa nhiệm vụ, dự đoán các nhãn thuộc tính như giới tính, độ tuổi, màu trang phục, có mang đồ vật hay không, giúp cùng một đặc trưng có thể phục vụ nhiều nhu cầu tìm kiếm và phân tích hạ tầng.
- **Mô hình**
  Sử dụng mạng tích chập sâu và Vision Transformer làm backbone, kết hợp đầu phân loại hoặc đầu học metric để thực hiện các tác vụ nhận dạng khác nhau:
  - Backbone phân loại hình ảnh: ResNet, DenseNet, EfficientNet, ConvNeXt, Vision Transformer (ViT), Swin Transformer, v.v., thường được pre-train trên các tập dữ liệu quy mô lớn như ImageNet, sau đó fine-tune trên dữ liệu nghiệp vụ cụ thể.
  - Kiến trúc phân loại tổng quát: Backbone + lớp phân loại fully connected (Softmax / Sigmoid), dùng cho các tác vụ phân loại ảnh đơn nhãn hoặc đa nhãn, có thể xử lý phân phối đuôi dài bằng class reweighting, focal loss, v.v.
  - Nhận dạng danh tính/thực thể: Trên đầu ra đặc trưng của Backbone, sử dụng các hàm mất mát có ràng buộc góc như ArcFace, CosFace, SphereFace để tường minh mở rộng khoảng cách liên lớp giữa các danh tính khác nhau, nâng cao khả năng phân tách trong không gian đặc trưng, và hoàn thành so sánh trên thư viện quy mô lớn thông qua tìm kiếm vector (ANN).
  - Kiến trúc nhận dạng người đi bộ/thuộc tính: Đối với Re-ID người đi bộ và nhận dạng thuộc tính cơ thể người, cách làm phổ biến là dùng Backbone chung để trích xuất đặc trưng người đi bộ, sau đó ở tầng trên phân ra "nhánh danh tính" và "nhánh thuộc tính", vừa tối ưu khả năng phân biệt danh tính qua camera, vừa đảm bảo dự đoán đa thuộc tính.

Tương ứng với hình thức sản phẩm cụ thể, năng lực của tầng này thường được cung cấp ra ngoài dưới dạng "API nhận dạng/phân loại nội dung ảnh", "SDK/SaaS nhận dạng khuôn mặt", "nền tảng tái nhận dạng người đi bộ", v.v. Chúng vừa trực tiếp thúc đẩy quyết định nghiệp vụ (như mở cửa kiểm soát ra vào, ghi nhãn nội dung), vừa đóng vai trò thượng nguồn, cung cấp nhãn có cấu trúc và biểu diễn danh tính ổn định cho các bước tìm kiếm, gợi ý, phân tích hành vi và hiểu biết đa phương thức tiếp theo. Dưới đây, chúng ta sẽ triển khai từ hai góc độ: phân loại hình ảnh và nhận dạng danh tính/thuộc tính.

### 2.2.1 Phân loại hình ảnh: Trả lời "Đây là ảnh gì?"

Trong tác vụ phân loại hình ảnh cơ bản nhất, hệ thống đối mặt với toàn bộ bức ảnh, mục tiêu là gán cho nó một hoặc một số nhãn danh mục ngữ nghĩa. Phổ biến nhất là phân loại đơn nhãn, ví dụ trong tập dữ liệu như ImageNet, mỗi ảnh được chú thích là một danh mục chính như "chó", "mèo", "ô tô", "máy bay"; trong các tình huống nghiệp vụ, năng lực này được ứng dụng rộng rãi để gán nhãn chủ đề như "phong cảnh / ẩm thực / thú cưng / chân dung / tài liệu" cho ảnh người dùng tải lên, hỗ trợ tìm kiếm, gợi ý và kiểm duyệt nội dung. Tương tự phân loại văn bản, mô hình sẽ kết nối một lớp fully connected + Softmax trên đặc trưng thị giác toàn cục được Backbone pre-train trích xuất, đầu ra là phân phối xác suất trên tất cả các danh mục ứng viên.

Trong nhiều ứng dụng thực tế, một bức ảnh thường thuộc nhiều danh mục cùng lúc, ví dụ một bức ảnh "selfie hoàng hôn bên biển" vừa có thể là "phong cảnh", vừa là "chân dung", vừa có thể được gán nhãn "du lịch", "bãi biển". Lúc này cần đến phân loại đa nhãn (Multi-label Classification): mô hình vẫn xuất phát từ đặc trưng toàn ảnh, nhưng tầng đầu ra không còn là Softmax loại trừ lẫn nhau nữa, mà là dự đoán riêng lẻ xác suất có/không cho mỗi nhãn (Sigmoid), và sử dụng hàm mất mát đa nhãn để huấn luyện. Để đối phó với "các danh mục đuôi dài" trong dữ liệu thực tế (mẫu nhãn hiếm rất ít), mô hình phân loại đa nhãn thường bổ sung các cơ chế như class reweighting, hard example mining hoặc mô hình hóa cấu trúc nhãn để nâng cao recall cho các danh mục ít phổ biến.

Ở tầng giao tiếp người-máy, phân loại hình ảnh thường được cung cấp ra ngoài dưới dạng "API nhận dạng nội dung ảnh". Nghiệp vụ thượng lưu chỉ cần tải lên một bức ảnh là có thể nhận được một tập nhãn danh mục cùng độ tin cậy, dùng cho các phán đoán chiến lược tiếp theo: ví dụ hệ thống phân phối quảng cáo có thể hạn chế một số danh mục nhạy cảm dựa trên nội dung ảnh, nền tảng thương mại điện tử có thể dùng phân loại ảnh để hỗ trợ sửa lỗi danh mục sản phẩm, nền tảng nội dung thì dùng để làm giàu đặc trưng gợi ý và tín hiệu kiểm duyệt. Mặc dù về mặt kỹ thuật năng lực này tương đối trưởng thành, nhưng nó vẫn là nền tảng cho các năng lực phức tạp hơn như phát hiện đối tượng, phân đoạn thực thể, visual question answering tiếp theo.

### 2.2.2 Nhận dạng hình ảnh và nhận dạng thuộc tính: Trả lời "Đây là ai / Đây là thực thể nào?"

Khác với "đây là loại ảnh gì", nhận dạng hình ảnh quan tâm hơn đến "người/đối tượng trong ảnh là ai", tức là sự phân biệt ở cấp độ danh tính, cấp độ thực thể. Đại diện điển hình là nhận dạng khuôn mặt và tái nhận dạng người đi bộ: cái trước trong các tình huống kiểm soát ra vào, chấm công, thanh toán xác định "khuôn mặt hiện tại gần với danh tính nào nhất trong thư viện"; cái sau thì trong các hình ảnh giám sát từ nhiều camera và các khoảng thời gian khác nhau, tìm kiếm xem có tồn tại cùng một người đi bộ hay không, hỗ trợ truy tìm vụ việc và phân tích quỹ đạo. Cốt lõi của loại tác vụ này không còn là phân loại đa lớp đơn giản nữa, mà là làm thế nào để học được một embedding "compact trong lớp, phân tán giữa các lớp" trong không gian đặc trưng, sao cho ảnh của cùng một danh tính chụp ở các tư thế, ánh sáng, camera khác nhau vẫn có thể được tập hợp lại với nhau.

Về thiết kế mô hình, nhận dạng khuôn mặt và tái nhận dạng người đi bộ thường áp dụng paradigm tương tự: trước tiên dùng Backbone như ResNet, ConvNeXt, ViT, Swin để trích xuất đặc trưng lấy khuôn mặt/người đi bộ làm trung tâm, sau đó kết nối các hàm mất mát được thiết kế đặc biệt cho học metric như ArcFace, CosFace, v.v. Khác với hàm mất mát phân loại thông thường, các hàm mất mát này trực tiếp ràng buộc ranh giới liên lớp trong không gian góc hoặc không gian đặc trưng, tường minh mở rộng khoảng cách giữa đặc trưng của các danh tính khác nhau, từ đó khiến đặc trưng sau khi huấn luyện có thể đem ra làm tìm kiếm vector quy mô lớn mà không bị giới hạn ở các danh mục cố định đã thấy lúc huấn luyện. Khi phục vụ trực tuyến, hệ thống sẽ tính trước và lập chỉ mục đặc trưng của mỗi danh tính trong thư viện ảnh, sau đó thực hiện tìm kiếm láng giềng gần nhất xấp xỉ (ANN) trên đặc trưng khuôn mặt/người đi bộ của truy vấn trực tuyến, tìm ra một số ứng viên tương đồng nhất, kết hợp ngưỡng nghiệp vụ và thông tin đa phương thức để đưa ra quyết định cuối cùng.

Đối ứng với "nhận dạng danh tính trực tiếp" là **nhận dạng thuộc tính** không hướng đến người cụ thể. Trong nhiều tình huống an ninh và bán lẻ, hệ thống chỉ cần biết "là nam hay nữ", "khoảng độ tuổi nào", "có đội mũ/đeo khẩu trang không", "màu sắc và kiểu dáng quần áo", "có mang ba lô/kéo hành lý không", v.v. để nhanh chóng lọc đối tượng mục tiêu, mà không cần thiết và cũng không phù hợp để đầu ra trực tiếp là danh tính cá nhân. Loại tác vụ này thường trên nền đặc trưng người đi bộ/cơ thể người dùng chung, kết nối nhiều đầu thuộc tính song song (đầu ở đây có nghĩa là vị trí đầu ra xác suất, có thể có nhiều đầu ra xác suất dùng để phán đoán danh mục), mỗi đầu phụ trách dự đoán một hoặc một nhóm nhãn thuộc tính, tạo thành framework học đa nhiệm vụ. Một mặt, huấn luyện đa nhiệm vụ có thể làm cho đặc trưng phong phú hơn, tổng quát hóa tốt hơn; mặt khác, bản thân thuộc tính cũng có thể là điều kiện phụ trợ cho Re-ID hoặc tìm kiếm, nâng cao khả năng sử dụng của hệ thống trong các tình huống phức tạp.

Về hình thức sản phẩm, loại năng lực này thường được đóng gói thành "SDK/dịch vụ đám mây nhận dạng khuôn mặt", "nền tảng tái nhận dạng người đi bộ", "API nhận dạng thuộc tính cơ thể người", v.v., được tích hợp vào cổng kiểm soát ra vào, máy chấm công, nền tảng an ninh và hệ thống cấu trúc hóa video. So với phân loại hình ảnh tổng quát, chúng có yêu cầu cao hơn về bảo mật dữ liệu và bảo vệ quyền riêng tư, đồng thời cũng nhạy cảm hơn về sự đánh đổi giữa tỷ lệ nhận sai và tỷ lệ recall, do đó ngoài thuật toán, còn được hỗ trợ bởi các cơ chế như phát hiện chất lượng (như có phải người thật không, có bị che khuất/chụp lại không), phát hiện liveness, xác minh chéo đa phương thức, tạo thành giải pháp nhận dạng danh tính hoàn chỉnh và có trách nhiệm hơn.
## 2.3 Phát hiện Đối tượng (Object Detection)

Ở phần phân loại và nhận dạng hình ảnh trước đó, chúng ta chỉ gán một nhãn tổng thể cho "toàn bộ ảnh" hoặc "toàn bộ người", mà bỏ qua vị trí và kích thước của chúng trong ảnh. Tuy nhiên, bài toán phổ biến hơn trong thực tế là: **Trong ảnh này có những vật thể nào? Chúng nằm ở đâu?** Ví dụ, trong một bức ảnh đường phố, chúng ta muốn đồng thời xác định tất cả người đi bộ, phương tiện, biển báo giao thông; trên dây chuyền sản xuất công nghiệp, cần xác định tất cả vùng lỗi và vị trí linh kiện trong cùng một khung hình. Object detection ra đời để phục vụ những nhu cầu này: nó dự đoán đồng thời **vị trí (bounding box) và loại** của từng vật thể trong một ảnh đơn hoặc khung video, là năng lực nền tảng cho nhiều tác vụ thị giác hạ nguồn (theo dõi, phân đoạn, phân tích hành vi, đếm đa mục tiêu, v.v.).

Từ góc độ kỹ thuật, object detection là "bước cấu trúc hóa đầu tiên" của nhiều hệ thống thị giác — nó phân rã một ảnh thô thành nhiều hình chữ nhật có nhãn, mỗi hình chữ nhật có thể được đưa vào các mô-đun khác để nhận dạng, theo dõi, phân tích thuộc tính hay thậm chí sinh ngữ nghĩa. Phát hiện người đi bộ/phương tiện trong camera an ninh, phát hiện hàng hóa trên kệ bán lẻ không người phục vụ, phát hiện khuyết tật/dị vật trong kiểm tra chất lượng công nghiệp, cũng như API "object detection" do các nhà cung cấp đám mây cung cấp, về bản chất đều dựa trên tầng năng lực này. Dưới đây chúng ta sẽ hệ thống hóa object detection theo ba góc độ: **tình huống ứng dụng**, **nguyên lý** và **mô hình**, rồi triển khai chi tiết từng hướng chính trong các mục tiếp theo.

- **Tình huống ứng dụng**
  - An ninh và giám sát giao thông: phát hiện thời gian thực người đi bộ, phương tiện, xe không có động cơ, biển báo, mục tiêu đi ngược chiều/lấn làn trong hình ảnh camera, cung cấp nền tảng cho phân tích hành vi và cảnh báo.
  - Kiểm tra chất lượng công nghiệp và sản xuất: phát hiện khuyết tật sản phẩm (xước, vỡ, dị vật), vị trí linh kiện, kiểm tra lắp ráp có thiếu bộ phận không trên dây chuyền sản xuất, hỗ trợ loại bỏ tự động và định vị robot.
  - Bán lẻ và logistics: phát hiện và thanh toán hàng hóa trên kệ bán lẻ không người phục vụ; object detection và định vị kiện hàng, pallet, hàng xếp chồng trong kho, hỗ trợ kiểm kê và robot gắp hàng.
  - Hiểu nội dung và kiểm duyệt: phát hiện người, logo, vũ khí, vật phẩm nhạy cảm trong ảnh/video, cung cấp tín hiệu có cấu trúc cho kiểm duyệt nội dung, tuân thủ quảng cáo và nhận diện thương hiệu.
- **Nguyên lý**
  Cốt lõi của object detection là xây dựng cơ chế dự đoán dày đặc trên ảnh:
  - Đưa ảnh đầu vào qua Backbone để trích xuất feature map đa tỷ lệ; trên các feature map này, tại mỗi "vị trí" (hoặc vùng ứng viên), đồng thời dự đoán "có mục tiêu không", "là loại nào" và "tham số bbox tương ứng".
  - Theo kiến trúc, có **phát hiện hai giai đoạn (Two-stage)** — trước tạo ứng viên rồi tinh chỉnh — và **phát hiện một giai đoạn (One-stage)** tích hợp, thực hiện phân loại và hồi quy trực tiếp trên feature map; hai loại có sự đánh đổi riêng về độ chính xác và tốc độ.
  - Theo thiết kế ứng viên, có phương pháp **anchor-based** dựa vào anchor được định nghĩa trước, phương pháp **anchor-free** dự đoán trực tiếp tâm điểm/biên, và **họ DETR** dựa trên khớp tập hợp.
  - Để đối phó với mục tiêu nhỏ, mục tiêu dày đặc, che khuất và thay đổi tỷ lệ trong dữ liệu thực, bộ phát hiện thường kết hợp feature đa tỷ lệ (FPN), đầu vào độ phân giải cao hơn, hàm mất mát chuyên biệt và chiến lược hậu xử lý (như biến thể NMS, kiểm tra đa tỷ lệ).
- **Mô hình**
  Mô hình phát hiện về cơ bản gồm ba phần: **mạng xương sống + kim tự tháp đặc trưng/cấu trúc đầu + mất mát và hậu xử lý**:
  - Bộ phát hiện hai giai đoạn kinh điển: Faster R-CNN, Mask R-CNN, v.v. — trước tiên tạo ứng viên qua RPN, rồi thực hiện phân loại và hồi quy bbox tinh tế trên từng vùng ứng viên; độ chính xác cao, cấu trúc rõ ràng, phù hợp với tình huống yêu cầu độ chính xác cực cao.
  - Bộ phát hiện một giai đoạn: SSD, RetinaNet, họ YOLO (YOLOv5/6/7/8, YOLOX, YOLOv10, v.v.) — hoàn thành phát hiện trong một mạng thống nhất, cấu trúc gọn, độ trễ thấp, là lực lượng chính cho phát hiện thời gian thực trong công nghiệp.
  - Bộ phát hiện Anchor-free/Transformer: FCOS, CenterNet, ATSS, v.v. dự đoán box trực tiếp lấy điểm pixel làm tâm; DETR/Deformable DETR, v.v. sử dụng Transformer và khớp tập hợp, xem phát hiện như bài toán "sinh một tập mục tiêu từ một tập truy vấn", đơn giản hóa nhiều thiết kế thủ công.
  - Phát hiện và theo dõi video: trên nền bộ phát hiện ảnh, tích hợp thêm thông tin thời gian và chiến lược liên kết (như đầu theo dõi, optical flow, khớp quỹ đạo), tạo thành framework thống nhất Detection + Tracking, hỗ trợ phân tích hành vi đa mục tiêu dài hạn.

Nhìn tổng thể, object detection giữ "vị trí trung tâm" trong phổ năng lực thị giác — một mặt tiếp nhận đầu vào ảnh sạch từ thị giác cấp thấp, mặt kia phân rã ảnh thành các phần tử "cấp mục tiêu" có thể dùng cho nhận dạng, theo dõi, phân đoạn và hiểu đa phương thức. Dưới đây, chúng ta sẽ triển khai theo ba hướng: **kiến trúc phát hiện một/hai giai đoạn**, **phát hiện Anchor-based / Anchor-free / Transformer** và **phát hiện mục tiêu nhỏ và phát hiện trong video**.

### 2.3.1 Phát hiện Một Giai đoạn và Hai Giai đoạn: Đánh đổi Cấu trúc giữa Độ chính xác và Tốc độ

Xét về kiến trúc, cách phân chia kinh điển nhất của object detection là **hai giai đoạn (Two-stage) và một giai đoạn (One-stage)**. Sự khác biệt chính là: có "chọn thô một loạt ứng viên rồi tinh chỉnh" hay "dự đoán toàn bộ box và nhãn trong một lần" trên feature map.

Phát hiện hai giai đoạn tiêu biểu là Faster R-CNN. Trước tiên, nó tạo ra một loạt ứng viên "có xác suất cao chứa mục tiêu" qua RPN (Region Proposal Network) trên feature map của Backbone (giai đoạn một), sau đó thực hiện RoI alignment và trích xuất đặc trưng trên từng vùng ứng viên, rồi phân loại và hồi quy bbox chính xác hơn (giai đoạn hai). Ưu điểm của thiết kế này là: phần lớn mẫu âm bị lọc ngay ở giai đoạn RPN, giai đoạn hai có thể tập trung vào một số ít vùng ứng viên để phán xét chất lượng cao, do đó thường có lợi thế về độ chính xác và dễ mở rộng sang phân đoạn thực thể (Mask R-CNN), phát hiện keypoint (Keypoint R-CNN), v.v. Tuy nhiên, cấu trúc đa giai đoạn dẫn đến độ phức tạp tính toán và triển khai tương đối cao, phù hợp hơn với tình huống offline hoặc gần thời gian thực không quá đòi hỏi về độ trễ nhưng nhấn mạnh độ chính xác và khả năng mở rộng.

Phát hiện một giai đoạn cố gắng thông suốt toàn bộ quy trình, hoàn thành đồng thời phân loại nhãn và hồi quy bbox trong một mạng thống nhất. Các mô hình tiêu biểu gồm SSD, RetinaNet và họ YOLO: chúng dự đoán trực tiếp "tiền cảnh/hậu cảnh + nhãn + bbox" của một số ứng viên tại mỗi vị trí trên feature map đa tỷ lệ, bỏ qua giai đoạn proposal tường minh, phù hợp hơn cho tăng tốc và triển khai end-to-end. Các bộ phát hiện một giai đoạn đời đầu có khoảng cách nhất định so với hai giai đoạn về độ chính xác, nhưng nhờ cấu trúc đơn giản và tốc độ nhanh đã nhanh chóng chiếm vị trí chủ đạo trong công nghiệp; với sự ra đời của FPN, focal loss, IoU-aware loss, cùng Backbone và Neck mạnh hơn, các mô hình thế hệ mới như RetinaNet, YOLOX, YOLOv7/8/10 đã đạt được sự cân bằng độ chính xác–tốc độ "gần bằng thậm chí vượt hai giai đoạn" trên nhiều tác vụ.

Ở tầng ứng dụng, kỹ thuật thường cân nhắc giữa hai loại kiến trúc này tùy theo nhu cầu: đối với phân tích offline theo lô trên đám mây, tác vụ yêu cầu độ chính xác cao và khả năng mở rộng (như đồng thời làm detection + segmentation + keypoint), phát hiện hai giai đoạn vẫn là lựa chọn ổn định đáng tin cậy; còn với thiết bị edge, ứng dụng di động, phát hiện thời gian thực từ camera và các tình huống nhạy cảm với độ trễ, các bộ phát hiện một giai đoạn như họ YOLO gần như là lựa chọn mặc định, và thường được kết hợp với các kỹ thuật quantization, pruning, distillation để tiếp tục nén mô hình và tăng throughput.

### 2.3.2 Anchor-based và Anchor-free: Từ Thiết kế Thủ công đến Học End-to-End

Về cách định nghĩa "ứng viên box", các phương pháp phát hiện còn được chia thành hai nhóm lớn: **Anchor-based và Anchor-free**. Các phương pháp chủ lưu đời đầu (như Faster R-CNN, SSD, RetinaNet, YOLOv3/v4/v5, v.v.) áp dụng tư duy Anchor-based: định nghĩa trước một số anchor với tỷ lệ và kích thước khác nhau tại mỗi vị trí trên feature map, rồi học xác suất tiền cảnh và độ dịch chuyển bbox cho mỗi anchor. Cách này dễ triển khai và hiệu quả tốt, nhưng cần điều chỉnh thủ công nhiều về kích thước và tỷ lệ anchor, và trong tình huống mục tiêu nhỏ, mục tiêu dày đặc dễ xảy ra số lượng anchor khổng lồ, mất cân bằng nghiêm trọng giữa mẫu dương và âm.

Phương pháp Anchor-free cố gắng thoát khỏi sự phụ thuộc vào anchor được định nghĩa trước. Tiêu biểu là FCOS, CenterNet, ATSS, v.v. — chúng thường dự đoán trực tiếp tại mỗi điểm pixel trên feature map "đây có phải tâm của một mục tiêu không (hoặc có thuộc mục tiêu đó không)" cùng khoảng cách biên tương ứng, từ đó hoàn toàn tránh được sự phức tạp của anchor được định sẵn. Ưu điểm là: cấu trúc mô hình đơn giản hơn, chiến lược phân bổ mẫu huấn luyện tự nhiên hơn, đặc biệt có khả năng tổng quát hóa và mở rộng tốt hơn khi đối mặt với tình huống thực tế có sự thay đổi tỷ lệ lớn và hình dạng mục tiêu phức tạp. Đồng thời, bộ phát hiện Anchor-free cũng thúc đẩy nhiều framework thống nhất dựa trên pixel/điểm, giúp detection, keypoint và segmentation dễ mô hình hóa chung hơn.

Tiến xa hơn nữa, các bộ phát hiện Transformer-based như DETR/Deformable DETR tư duy lại bài toán phát hiện từ một chiều khác: chúng không rải dày anchor trên feature map mà giới thiệu một tập "vector truy vấn" (object queries) có số lượng cố định, thông qua cơ chế self-attention và cross-attention của Transformer để "sinh" ra một tập dự đoán mục tiêu từ đặc trưng toàn cục, và dùng Hungarian Matching để căn chỉnh một-một. Tư duy dự đoán tập hợp (set prediction) này loại bỏ hoàn toàn NMS và phân bổ mẫu thủ công truyền thống, về mặt khái niệm rất gọn, nhưng trong triển khai đời đầu tồn tại vấn đề hội tụ chậm, không thân thiện với mục tiêu nhỏ; Deformable DETR sau đó giới thiệu deformable attention và cơ chế đa tỷ lệ, cải thiện đáng kể tốc độ hội tụ và hiệu suất, dần được ứng dụng nhiều hơn trong detection và tình huống đa tác vụ.

Đối với thực hành kỹ thuật, Anchor-based, Anchor-free và Transformer detection không phải là lựa chọn loại trừ lẫn nhau, mà giống như một chuỗi tiến hóa: từ thiết kế anchor heavily engineered, đến dự đoán điểm/tâm end-to-end hơn, rồi đến framework thống nhất hoàn toàn dựa trên dự đoán tập hợp và attention. Trong triển khai công nghiệp hiện tại, các mô hình Anchor-based trưởng thành như họ YOLO vẫn là lực lượng chính; Anchor-free và họ DETR xuất hiện nhiều hơn trong các hệ thống yêu cầu cao về tính đơn giản cấu trúc, thống nhất đa tác vụ và khả năng mở rộng.

### 2.3.3 Phát hiện Mục tiêu Nhỏ và Phát hiện trong Video: Hướng tới Độ bền vững trong Tình huống Thực

Object detection trên các bộ dữ liệu công khai thường tạo ra ảo giác "bài toán đã cơ bản được giải quyết", nhưng ngay khi bước vào tình huống thực, sẽ lập tức gặp hai loại vấn đề nan giải: **mục tiêu nhỏ/mục tiêu dày đặc** và **phát hiện và theo dõi bền vững trong video**.

Trong phát hiện mục tiêu nhỏ, mục tiêu thường chỉ chiếm vùng pixel rất nhỏ trong ảnh gốc, ví dụ người đi bộ ở xa, phương tiện ở khoảng cách lớn, máy bay không người lái trên không, hoặc khuyết tật rất nhỏ trên ảnh công nghiệp độ phân giải cao. Khi Backbone giảm mẫu và độ phân giải feature map giảm xuống, những mục tiêu nhỏ này rất dễ bị "nhấn chìm" trong đặc trưng cấp cao, dẫn đến bỏ sót. Để khắc phục, bộ phát hiện thường dùng kim tự tháp đặc trưng đa tỷ lệ (FPN/PAFPN, v.v.), tăng độ phân giải đầu vào, thêm detection head trên feature map nông, thậm chí thiết kế riêng nhánh và chiến lược weighting loss cho mục tiêu nhỏ. Đồng thời, ở tầng dữ liệu cũng cần tăng cường nhận thức và khả năng ghi nhớ mục tiêu tỷ lệ nhỏ của mô hình qua cắt xén, phóng to, resample mục tiêu nhỏ, v.v.

Mục tiêu dày đặc (như đám đông, bãi đậu xe dày đặc, hàng hóa/linh kiện xếp chặt) sẽ bộc lộ các vấn đề anchor chồng lấp, NMS nhầm lẫn, che khuất nghiêm trọng. Chiến lược cải thiện gồm phân bổ nhãn tinh tế hơn (như phương pháp phân bổ thích nghi ATSS), soft NMS hoặc chiến lược khử trùng dựa trên học, cũng như giảm cạnh tranh giữa các box bằng cách mô hình hóa theo điểm tâm/bản đồ mật độ. Trong kiểm tra chất lượng công nghiệp, nhiều hệ thống còn kết hợp detection và phân đoạn cấp pixel để định vị khuyết tật chính xác hơn, phục vụ xử lý tự động tiếp theo.

Khi detection mở rộng từ ảnh đơn sang video, thách thức khác là **tính liên tục thời gian và sự ổn định của mục tiêu**. Bộ phát hiện ảnh đơn dự đoán độc lập trên từng frame, khó tránh khỏi bỏ sót ngắn hạn, lắc ID và báo động giả; trong khi các ứng dụng thực tế như cảnh báo, đếm, phân tích quỹ đạo thường yêu cầu quỹ đạo mục tiêu nhất quán qua nhiều frame. Vì vậy, video object detection thường tích thêm một mô-đun Tracking, liên thông "detection + theo dõi mục tiêu": cách làm kinh điển là dùng bộ phát hiện ảnh làm frontend, ở backend dùng Kalman filter, Hungarian matching, độ tương đồng đặc trưng ngoại hình, v.v. để thực hiện theo dõi đa mục tiêu (như SORT, DeepSORT, v.v.); cách tiến bộ hơn là tích hợp trực tiếp tracking head vào mạng detection, học chung detection và liên kết cross-frame, nâng cao độ bền vững trong tình huống che khuất ngắn hạn, chuyển động nhanh, v.v.

Trong hệ thống thực tế, mục tiêu nhỏ, mục tiêu dày đặc và phát hiện video thường không phải vấn đề riêng lẻ mà xuất hiện đồng thời: ví dụ người đi bộ/phương tiện ở xa trong giám sát đường đô thị, đám đông dày đặc ở quảng trường ga tàu, linh kiện chuyển động tốc độ cao trong video dây chuyền sản xuất. Điều này cũng quyết định rằng, một mô-đun object detection chất lượng cao, ngoài chỉ số ấn tượng trên benchmark tiêu chuẩn, còn cần chịu được thử thách của nhiều yếu tố phức tạp trong điều kiện thực tế như đa tỷ lệ, đa mật độ, video dài hạn, mới có thể thực sự hỗ trợ phân tích hành vi, cảnh báo thông minh và hiểu đa phương thức ở tầng trên.
## 2.4 Phân Vùng Ảnh (Image Segmentation)

Với object detection, chúng ta đã có thể biết "trong ảnh có những vật thể nào, chúng ở đâu một cách tương đối", nhưng nhiều tác vụ còn đòi hỏi sự hiểu biết cấu trúc tinh vi hơn: **chính xác đến từng pixel, xác định nó thuộc lớp nào, thuộc instance nào**. Ví dụ trong xe tự lái cần biết những pixel nào là đường, pixel nào là người và xe; công cụ tách nền cần tách từng sợi tóc ra khỏi background một cách sạch sẽ; trong ảnh y tế cần phác thảo chính xác đường viền khối u và cơ quan. Các tác vụ này được gọi chung là image segmentation — chúng xuất ra nhãn ngữ nghĩa hoặc instance trực tiếp ở cấp độ pixel, cung cấp thông tin cấu trúc không gian chi tiết hơn so với detection.

Từ góc độ sản phẩm, image segmentation là năng lực cốt lõi của "cấu trúc hóa ở cấp pixel": công cụ tách nền và thay thế background dựa vào nó để quyết định pixel nào cần giữ lại; module cảm nhận của xe tự lái dựa vào nó để xây dựng bản đồ "vùng có thể di chuyển + chướng ngại vật" chi tiết; phần mềm ảnh y tế dựa vào nó để đo kích thước, hình dạng và thể tích tổn thương; nền tảng viễn thám dựa vào nó để phân biệt đất nông nghiệp, mặt nước, công trình xây dựng, đường sá và các địa vật khác. Dưới đây chúng ta sẽ hệ thống hóa image segmentation theo ba góc độ **tình huống**, **nguyên lý** và **mô hình**, và triển khai các hướng như semantic/instance/panoptic/large model segmentation trong các mục con tiếp theo.

- **Tình huống**
  - Chỉnh sửa nội dung và tách nền: tách ảnh chân dung, thay background ở mức sợi tóc, tách vật thể và chỉnh sửa theo lớp, dùng cho làm đẹp ảnh, hiệu ứng video ngắn, sáng tạo quảng cáo.
  - Xe tự lái và robot: gán nhãn từng pixel thành mặt đường, vạch kẻ đường, người đi bộ, xe cộ, dải phân cách, công trình, bầu trời, v.v., dùng cho lập kế hoạch đường đi, cảnh báo va chạm và mô hình hóa môi trường.
  - Phân tích ảnh y tế: phân vùng chính xác cơ quan, khối u, vùng tổn thương trong ảnh CT, MRI, siêu âm, hỗ trợ chẩn đoán, lập kế hoạch phẫu thuật và đánh giá hiệu quả điều trị.
  - Viễn thám và thông tin địa lý: phân vùng đất nông nghiệp, mặt nước, đường sá, công trình, rừng và các địa vật khác trong ảnh vệ tinh/chụp từ trên không, hỗ trợ quy hoạch lãnh thổ, giám sát sử dụng đất và đánh giá thiên tai.
- **Nguyên lý**
  Image segmentation về bản chất là "dự đoán dày đặc" — từ ảnh đầu vào, encoder (Backbone) trích xuất đặc trưng đa tỷ lệ, rồi qua decoder hoặc module upsampling, dần khôi phục feature map về kích thước bằng ảnh đầu vào, xuất ra nhãn ngữ nghĩa hoặc instance tại mỗi vị trí pixel.
  - **Semantic Segmentation**: gán một lớp ngữ nghĩa cho mỗi pixel (ví dụ đường, người, xe, bầu trời), không phân biệt các cá thể khác nhau cùng lớp, phù hợp để mô tả "thành phần cảnh quan".
  - **Instance Segmentation**: đi xa hơn thông tin ngữ nghĩa, phân biệt các instance khác nhau cùng lớp, tạo mặt nạ độc lập cho "từng chiếc xe, từng người", là sự kết hợp giữa detection và segmentation.
  - **Panoptic Segmentation**: xử lý thống nhất "các vật thể đếm được (thing, như người, xe)" và "background không đếm được (stuff, như đường, bầu trời)", đồng thời cung cấp nhãn ngữ nghĩa và instance ID cho mỗi pixel.
    So với detection, segmentation nhạy cảm hơn với chi tiết không gian và chất lượng đường biên, đòi hỏi thông tin ngữ cảnh đa tỷ lệ phong phú hơn và chiến lược upsampling/fusion tinh tế hơn.
- **Mô hình**
  Các mô hình segmentation từ cổ điển đến mới nhất phát triển đại thể theo lộ trình "FCN → encoder–decoder → ngữ cảnh đa tỷ lệ → detection+segmentation tích hợp → large model segmentation":
  - Semantic segmentation: FCN, U‑Net và các biến thể, dòng DeepLab (DeepLabv3/v3+), PSPNet, v.v., thu nhận ngữ cảnh đa tỷ lệ và biên giới tinh tế thông qua dilated convolution, pyramid pooling, skip connection.
  - Instance/panoptic segmentation: Mask R‑CNN, Panoptic FPN, Mask2Former, v.v., kết hợp detection head với segmentation head, thực hiện phân vùng ở cấp vật thể và panoptic segmentation.
  - Large model và universal segmentation: các mô hình segmentation nền tảng như Segment Anything Model (SAM), nâng khả năng segmentation từ "huấn luyện riêng cho từng tác vụ" lên "một mô hình thích ứng hầu hết các tình huống segmentation", hỗ trợ segmentation tương tác, dựa trên prompt (prompt‑based).

Nhìn chung, image segmentation cung cấp biểu diễn cấu trúc không gian tinh tế hơn so với object detection, là một mắt xích không thể thiếu khi xây dựng hệ thống cảm nhận độ tin cậy cao và công cụ chỉnh sửa nâng cao. Dưới đây chúng ta sẽ triển khai theo ba hướng: **semantic segmentation và instance segmentation**, **panoptic segmentation và tích hợp với detection**, cũng như **universal segmentation**, **large model**, và **unsupervised segmentation**.

### 2.4.1 Semantic Segmentation và Instance Segmentation: Từ "Lớp Pixel" đến "Instance Pixel"

Mục tiêu của **Semantic Segmentation** là gán một lớp ngữ nghĩa cho mỗi pixel trong ảnh, để mạng học được rằng "vùng này là đường, vùng kia là xe, đây là người, đằng kia là bầu trời và công trình". Cách tiếp cận cổ điển thường dùng kiến trúc encoder–decoder: encoder (như ResNet, EfficientNet, Swin Transformer, v.v.) trích xuất đặc trưng cấp cao với downsampling dần dần, decoder thông qua upsampling, skip connection và fusion đa tỷ lệ, kết hợp đặc trưng ngữ nghĩa cấp cao thô với chi tiết cấp thấp, khôi phục về độ phân giải gốc. FCN là người đầu tiên hệ thống hóa hình thức dự đoán dày đặc này; U‑Net với cấu trúc U đối xứng và nhiều skip connection đã đạt thành công lớn trong ảnh y tế; dòng DeepLab mở rộng receptive field mà không giảm độ phân giải thông qua dilated convolution và ASPP (Atrous Spatial Pyramid Pooling); PSPNet thu nhận thông tin ngữ cảnh toàn cục qua pyramid pooling. Các mô hình này cùng thúc đẩy ứng dụng quy mô lớn trong các lĩnh vực như cảnh đường phố, viễn thám, y tế, v.v.

**Instance Segmentation** tiến thêm một bước, phân biệt các cá thể khác nhau cùng lớp dựa trên nhãn ngữ nghĩa pixel: không chỉ biết những pixel nào là "xe", mà còn biết những pixel đó thuộc chiếc xe nào. Mô hình tiêu biểu nhất là Mask R‑CNN — nó thêm một nhánh segmentation song song vào framework detection của Faster R‑CNN: trước tiên dùng detection head dự đoán lớp và vị trí của mỗi bounding box đề xuất, rồi tạo một binary mask trong mỗi box, từ đó thu được kết quả phân vùng ở cấp vật thể dạng "box + mask". So với pure semantic segmentation, phương pháp này xử lý tốt sự chồng lấp và che khuất của các vật thể, là nền tảng cho các tác vụ như tách ảnh người/sản phẩm, đếm nhiều đối tượng, chỉnh sửa chi tiết. Các phương pháp instance segmentation kế tiếp liên tục cải thiện chất lượng mask, khả năng đa tỷ lệ và tốc độ, cũng xuất hiện các kiến trúc mới dựa trên anchor‑free và Transformer, nhưng cách tiếp cận "detection + local segmentation" vẫn rất phổ biến.

Ở cấp độ sản phẩm, semantic segmentation thường xuất hiện trong các ứng dụng "cấp cảnh quan", ví dụ phân vùng đường xe tự lái, nhận dạng địa vật viễn thám, phân vùng cơ quan y tế, v.v.; instance segmentation thường dùng hơn cho tách nền, đếm và chỉnh sửa "ở cấp vật thể", ví dụ chọn và tách riêng từng chiếc xe, từng người, từng sản phẩm bằng một cú nhấp. Kết hợp cả hai có thể cung cấp thông tin không gian vừa tinh tế vừa có cấu trúc cho các tác vụ thượng tầng.

Chỉ làm semantic segmentation sẽ gộp các đối tượng cùng lớp lại với nhau (tất cả pixel "xe" đều thuộc cùng một lớp); chỉ làm instance segmentation lại thường chỉ quan tâm đến "things" đếm được (như người, xe, động vật), bỏ qua "stuff" background không đếm được diện tích lớn (như đường, thảm cỏ, bầu trời). Trong nhiều tình huống, chúng ta vừa cần biết **mặt nạ cấp instance của từng đối tượng**, vừa muốn hiểu **thành phần tổng thể của cảnh quan**. Điều này dẫn đến sự ra đời của **Panoptic Segmentation**: đồng thời cung cấp lớp ngữ nghĩa và instance ID cho mỗi pixel, thực hiện mô hình hóa thống nhất cho thing + stuff.

Các hệ thống panoptic segmentation giai đoạn đầu thường được thực hiện theo cách "mô hình semantic segmentation + mô hình instance segmentation + tổng hợp hậu xử lý": trước tiên dùng một mạng dự đoán lớp ngữ nghĩa của mỗi pixel, rồi dùng mạng khác xuất mask và lớp của các instance, cuối cùng dùng một bộ quy tắc (như ưu tiên, xử lý chồng lấp) để hợp nhất cả hai thành một kết quả panoptic segmentation nhất quán. Panoptic FPN đại diện cho một con đường thanh lịch hơn về mặt kỹ thuật: trên một Backbone và Feature Pyramid Network (FPN) dùng chung, gắn riêng semantic segmentation head và instance segmentation head, thông qua huấn luyện chung và chia sẻ đặc trưng, đồng thời thu được hai loại output, rồi hợp nhất chúng qua hậu xử lý nhẹ. Điều này không chỉ nâng cao hiệu quả mà còn tăng cường tính nhất quán giữa ngữ nghĩa và instance.

Ở cấp độ mô hình, cùng với sự phát triển của tích hợp detection/segmentation và kiến trúc Transformer, xuất hiện các framework panoptic segmentation thống nhất như Mask2Former: chúng có xu hướng dùng một cấu trúc "query + mask decoder" chung, đồng thời dự đoán mask của semantic, instance thậm chí các tác vụ downstream khác trong cùng một mạng, từ đó đơn giản hóa hệ thống đáng kể về mặt kiến trúc, thuận tiện cho mở rộng đa tác vụ. Đối với các tác vụ phức tạp như xe tự lái, điều hướng robot, hiểu cảnh AR, panoptic segmentation cung cấp mô tả cảnh quan hoàn chỉnh gần hơn với "nhận thức chủ quan của mắt người", cho phép các quyết định và kế hoạch thượng tầng được thực hiện trên nền tảng ngữ nghĩa không gian chính xác hơn.

Về hình thức sản phẩm, panoptic segmentation thường được nhúng trong các hệ thống xe tự lái, robot và nền tảng phân tích thị giác cao cấp — người dùng chưa chắc cảm nhận trực tiếp khái niệm "panoptic segmentation", nhưng sẽ thực sự hưởng lợi từ sự hiểu biết cảnh quan ổn định hơn và trải nghiệm tương tác tự nhiên hơn.

### 2.4.2 Universal Segmentation và Unsupervised Segmentation: Từ Tùy Chỉnh Tác Vụ đến "Segment Anything"

Các mô hình segmentation truyền thống thường được huấn luyện xoay quanh dataset và tác vụ cụ thể: ví dụ "semantic segmentation 19 lớp cảnh đường phố", "phân vùng một loại khối u nhất định", "phân vùng một số loại sản phẩm nhất định", v.v. — mỗi lần thay tác vụ lại phải gán nhãn lại, huấn luyện lại. Trong thực tế kinh doanh, cách tiếp cận phụ thuộc mạnh vào dữ liệu được gán nhãn chính xác này rất tốn kém, và khó có thể bao phủ các lớp đuôi dài và các tình huống mới liên tục xuất hiện. Trong những năm gần đây, cùng với sự phát triển của các mô hình thị giác pretrain quy mô lớn và paradigm dựa trên prompt (prompt‑based), xuất hiện các **large model segmentation thông dụng** tiêu biểu là **Segment Anything Model (SAM)**, cố gắng nâng khả năng segmentation từ "tùy chỉnh tác vụ" lên "cơ sở hạ tầng".

Lấy SAM làm ví dụ, nó học đặc trưng chung của toàn ảnh qua một image encoder mạnh mẽ (thường là ViT được pretrain quy mô lớn), rồi thông qua prompt encoder nhẹ và mask decoder, chuyển đổi các gợi ý mà người dùng cung cấp (điểm, box, văn bản, v.v.) thành kết quả segmentation. Trong giai đoạn huấn luyện, SAM sử dụng lượng lớn nhãn mask từ nhiều nguồn và nhiều tác vụ, giúp mô hình học được một "khả năng segmentation có tính tổng quát hóa" thay vì ghi nhớ nhãn của một dataset cụ thể; trong giai đoạn sử dụng, bạn chỉ cần cung cấp rất ít gợi ý (một điểm hoặc một box thô) để có được mask chất lượng cao trên nhiều loại ảnh và lớp vật thể chưa từng thấy. Paradigm này đã giảm đáng kể ngưỡng để xây dựng các ứng dụng segmentation mới, đồng thời cung cấp công cụ mạnh mẽ cho các tình huống unsupervised/weakly supervised.

Liên quan đến đó là hướng **unsupervised / self-supervised segmentation** theo nghĩa rộng hơn: không phụ thuộc hoặc rất ít phụ thuộc vào mask do con người gán, tự động chia ảnh thành các vùng có nghĩa thông qua các tín hiệu như sự tương đồng nội tại trong ảnh, tính nhất quán theo thời gian, ràng buộc đa góc nhìn, v.v. Các công trình giai đoạn đầu tập trung nhiều hơn vào "visual clustering" và region proposal generation; ngày nay chúng được các large model nội hóa nhiều hơn thành một cách học biểu diễn, cung cấp khởi tạo tốt cho các tác vụ segmentation downstream. Kết hợp với các mô hình học tương phản văn bản–ảnh như CLIP, ngày càng nhiều phương pháp có thể thực hiện zero-shot hoặc few-shot segmentation "chỉ cần tên lớp bằng văn bản, không cần cung cấp nhãn mask", cung cấp giải pháp mới cho tình huống cold-start và các lớp đuôi dài.

Trong các sản phẩm thực tế, large model segmentation thông dụng thường xuất hiện dưới dạng "công cụ tách nền tương tác", "vùng chọn thông minh", "tách nền một chạm", cũng dần được tích hợp vào phần mềm chuyên dụng trong các lĩnh vực y tế, viễn thám, công nghiệp, v.v., đóng vai trò là bộ tăng tốc cho gán nhãn bán tự động và phân vùng hỗ trợ. So với các mô hình tùy chỉnh truyền thống, chúng không nhất thiết đạt đỉnh cao trong một tác vụ cụ thể, nhưng có lợi thế rõ rệt trong việc "làm được một chút mọi thứ, triển khai nhanh trong nhiều tình huống", đồng thời đặt nền tảng cho việc xây dựng các mô hình thị giác nền tảng đa phương thức thực sự trong tương lai.
## 2.5 Phát hiện Keypoint & Nhận diện Hành động (Keypoint Detection & Action Recognition)

Sau khi phân loại, phát hiện và phân đoạn, chúng ta đã có thể biết "trong ảnh có gì, ở đâu, mỗi pixel thuộc về gì". Nhưng trong nhiều tác vụ thực tế, điều mà hệ thống quan tâm không chỉ là "sự tồn tại và vị trí của vật thể", mà còn là **tư thế và hành động**: một người đang đi bộ hay đang chạy? Bàn tay này có giơ lên không, có thực hiện cử chỉ nào không? Công nhân có đeo thiết bị bảo hộ đúng cách và thực hiện các thao tác chuẩn không? Kỹ thuật vận động của vận động viên có chuẩn xác không? Những câu hỏi này đòi hỏi chúng ta phải hiểu sâu hơn về **cấu trúc nội tại của vật thể và sự thay đổi theo thời gian**.

Keypoint Detection và Action Recognition chính là hai lớp năng lực hướng đến nhu cầu này:

- **Keypoint Detection (Phát hiện Keypoint)**: Trên ảnh hoặc khung video, dự đoán một số "điểm xương" (như khớp, đầu ngón tay, các điểm đặc trưng trên khuôn mặt) của đối tượng mục tiêu (thường là cơ thể người, bàn tay, khuôn mặt hoặc cấu trúc cơ khí cụ thể), từ đó thu được biểu diễn tư thế (pose) có cấu trúc chi tiết.
- **Action Recognition (Nhận diện Hành động)**: Phân tích sự thay đổi theo thời gian của các keypoint hoặc đặc trưng ngoại quan này để xác định "người/nhóm người này đang thực hiện hành động hay hành vi gì".

Từ góc độ sản phẩm, năng lực này phục vụ rộng rãi cho: tương tác người-máy (điều khiển bằng cử chỉ), phân tích thể thao (đánh giá kỹ thuật vận động), an ninh (phát hiện ngã, nhận diện hành vi bất thường như đánh nhau/chạy), an toàn công nghiệp (phát hiện thao tác vi phạm), điều khiển nhân vật ảo (dựa vào keypoint cơ thể/khuôn mặt để điều khiển bộ xương 3D và hoạt ảnh). Dưới đây chúng ta sẽ hệ thống lại lớp năng lực này từ ba góc độ **tình huống ứng dụng**, **nguyên lý** và **mô hình**, đồng thời triển khai chi tiết Keypoint Detection và Action Recognition trong các tiểu mục.

- **Tình huống ứng dụng**
  - Tương tác người-máy và AR/VR: Thông qua nhận diện cử chỉ, phát hiện tư thế cơ thể, thực hiện tương tác tự nhiên "ra hiệu là điều khiển được", hoặc điều khiển nhân vật ảo theo thời gian thực trong AR/VR.
  - Huấn luyện thể thao và phân tích vận động: Theo dõi keypoint và phân tích góc độ các động tác chạy, nhảy cao, ném bóng, cử tạ,... để đưa ra đánh giá kỹ thuật vận động và gợi ý sửa lỗi.
  - An ninh và an toàn công cộng: Phát hiện các hành vi bất thường như ngã, đánh nhau, chạy mạnh, leo qua rào chắn để cảnh báo kịp thời; nhận diện thao tác có chuẩn mực hay không tại công trường và nhà máy.
  - Công nghiệp và cộng tác người-máy: Phát hiện công nhân có thao tác đúng tư thế theo quy chuẩn không, khoảng cách an toàn khi cộng tác với robot, có xuất hiện hành động nguy hiểm không.
  - Điều khiển khuôn mặt/biểu cảm và nhân vật ảo: Nắm bắt chi tiết biểu cảm qua keypoint khuôn mặt, dùng cho chuyển biểu cảm, điều khiển nhân vật số, hình đại diện ảo trong hội nghị video,...
- **Nguyên lý**
  Hai loại tác vụ này tập trung vào cấu trúc không gian và biến đổi theo thời gian, nhưng về bản chất đều là dự đoán có cấu trúc trong không gian đặc trưng chiều cao:
  - Keypoint Detection: Định vị một tập hợp keypoint được định nghĩa trước trên ảnh (như 17/25 khớp cơ thể người, 21 khớp bàn tay, 68/106 keypoint khuôn mặt), cách phổ biến là dự đoán heatmap của từng keypoint trên feature map, rồi suy ngược tọa độ từ vị trí đỉnh; trong tình huống nhiều người, còn cần thực hiện "lắp ráp khớp về từng người".
  - Nhận diện hành động đơn khung/ngắn hạn: Dựa trên một ảnh đơn hoặc cửa sổ thời gian ngắn, thông qua tư thế cơ thể (keypoint) và đặc trưng ngoại quan, phán đoán loại hành động xảy ra trong khung/đoạn đó (như đi, chạy, giơ tay, vẫy tay, ngồi xuống,...).
  - Nhận diện hành động theo chuỗi thời gian: Trên thang thời gian dài hơn, phân tích chuỗi đặc trưng (đặc trưng ảnh, chuỗi keypoint hoặc optical flow,...), mô hình hóa sự bắt đầu, duy trì và kết thúc của hành động, nhận diện các hành vi phức tạp như "đang nghe điện thoại", "đang chống đẩy", "hai người đẩy nhau".
  - Biểu diễn có cấu trúc: Chuỗi keypoint cung cấp một biểu diễn có cấu trúc gọn hơn và ổn định hơn so với pixel thô, tiện cho việc xử lý thay đổi góc nhìn, nhiễu nền và sự khác biệt ngoại quan trong nhận diện hành động.
- **Mô hình**
  Các mô hình phổ biến phát triển theo hướng thống nhất "trích xuất đặc trưng bằng CNN/Transformer + đầu keypoint/chuỗi thời gian":
  - Keypoint Detection: Dòng OpenPose, Hourglass Network, HRNet, hai nhánh lớn là top-down (phát hiện người trước rồi ước lượng tư thế) và bottom-up (phát hiện khớp trước rồi lắp ráp); gần đây cũng có các bộ ước lượng tư thế dựa trên Transformer.
  - Nhận diện hành động từ video: Mô hình video dựa trên 2D/3D CNN (I3D, SlowFast,...), mô hình GCN dựa trên bộ xương (ST-GCN,..., mô hình hóa quan hệ thời-không gian trực tiếp trên đồ thị keypoint), và các giải pháp end-to-end dựa trên Video Transformer (Video Swin, TimeSformer,...).
  - Đa tác vụ thống nhất và mô hình lớn: Đồng thời xuất kết quả phát hiện, phân đoạn, keypoint và nhãn hành động trên backbone thị giác tổng quát, hoặc tận dụng mô hình lớn đa phương thức để hiểu trực tiếp "người này đang làm hành động gì" qua text prompt, kết nối dự đoán có cấu trúc với hiểu biết ngữ nghĩa.

Dưới đây chúng ta sẽ triển khai chi tiết theo hai hướng: **Keypoint Detection & Pose Estimation** và **Action Recognition & Behavior Understanding**.

### 2.5.1 Keypoint Detection & Pose Estimation: "Vẽ bộ xương" cho người và vật

Keypoint Detection (còn thường được gọi là Pose Estimation) tập trung vào **cấu trúc không gian trong một khung hoặc một ảnh đơn**: tìm một tập hợp keypoint có ý nghĩa ngữ nghĩa trong ảnh 2D và kết nối chúng thành bộ xương. Ví dụ, trong ước lượng tư thế cơ thể người, chúng ta thường cần phát hiện các khớp như đầu, vai, khuỷu tay, cổ tay, hông, đầu gối, mắt cá chân; trong tư thế khuôn mặt thì là góc mắt, góc miệng, đầu mũi, đường viền khuôn mặt; trong tư thế bàn tay thì là gốc ngón, khớp ngón, đầu ngón tay. Đối với các đối tượng phi con người như cánh tay robot, các cấu kiện khớp cũng có thể định nghĩa một hệ keypoint tương tự.

Về thiết kế mô hình, Keypoint Detection thường dùng **mô hình "trích xuất đặc trưng + dự đoán heatmap"**:

- Đầu tiên sử dụng CNN hoặc Vision Transformer (như ResNet, HRNet, Swin,...) để trích xuất đặc trưng đa tỷ lệ từ ảnh đầu vào.
- Sau đó thông qua một đầu giải mã hoặc nhiều lớp tích chập, xuất ra một heatmap cho mỗi loại keypoint, trong đó giá trị mỗi pixel biểu thị "xác suất vị trí đó là keypoint tương ứng".
- Ở giai đoạn suy luận, thường lấy vị trí đỉnh của mỗi heatmap làm tọa độ keypoint, và tinh chỉnh ở mức sub-pixel bằng nội suy song tuyến, khớp cục bộ,...

Đối với tình huống nhiều người, các phương pháp ước lượng tư thế chia thành hai hướng lớn:

- **Top-down (Từ trên xuống)**: Trước tiên dùng bộ phát hiện người đi bộ để tìm bounding box của từng người trong ảnh, rồi thực hiện ước lượng tư thế đơn người riêng biệt cho từng vùng cắt. Cách này cho độ chính xác cao với từng người và framework đơn giản, nhưng tốn kém tính toán trong tình huống đông người dày đặc và nhạy cảm với chất lượng phát hiện. Các hệ thống tiêu biểu bao gồm nhiều tổ hợp Faster R-CNN/YOLO + Hourglass/HRNet.
- **Bottom-up (Từ dưới lên)**: Không phân biệt từng người trước, mà dự đoán trực tiếp tất cả các keypoint tiềm năng (và loại của chúng) trên toàn bộ ảnh, đồng thời dự đoán quan hệ kết nối giữa các keypoint hoặc trường ái lực (như PAF của OpenPose). Sau đó dùng thuật toán graph matching/clustering để lắp ráp các keypoint thành nhiều bộ xương người độc lập. Các phương pháp này hiệu quả hơn trong tình huống đông người dày đặc và mạnh mẽ hơn về quy mô số người, nhưng quá trình lắp ráp phức tạp và nhạy cảm với chất lượng kết nối.

Gần đây, các mô hình ước lượng tư thế dựa trên Transformer cũng dần xuất hiện, coi Keypoint Detection như một tập hợp tác vụ "query–response", tương tự DETR, có thể thống nhất kiến trúc phát hiện đối tượng và ước lượng tư thế. Trong ứng dụng kỹ thuật, năng lực Keypoint Detection thường được đóng gói thành "SDK hoặc API keypoint cơ thể/cử chỉ/khuôn mặt", ứng dụng thượng nguồn chỉ cần truyền vào ảnh hoặc khung video là có thể nhận tọa độ bộ xương có cấu trúc, dùng cho nhận diện hành động, điều khiển tương tác hoặc điều khiển hoạt ảnh tiếp theo.

### 2.5.2 Action Recognition & Behavior Understanding: Làm cho "bộ xương" chuyển động

Sau khi có được keypoint hoặc đặc trưng thị giác cấp cao, bước tiếp theo là hiểu **sự thay đổi trong chiều thời gian** — tức là Action Recognition (Nhận diện Hành động) và Behavior Understanding (Phân tích Hành vi). Khác với Keypoint Detection, Action Recognition không còn giới hạn ở một khung đơn; nó quan tâm đến mẫu biến đổi của đặc trưng trong một khoảng thời gian: từ "giơ tay" đến "vẫy tay", từ "đi bộ" đến "chạy", từ "đứng" đến "ngã".

Về biểu diễn đầu vào, có ba hướng tiếp cận chính:

- **Dựa trên khung video thô/optical flow**: Mô hình hóa trực tiếp chuỗi khung video, hoặc bổ sung thêm optical flow (trường mô tả tốc độ chuyển động cục bộ) làm đầu vào, cho phép mô hình học kết hợp từ thông tin ngoại quan và chuyển động.
- **Dựa trên chuỗi bộ xương/keypoint**: Trước tiên dùng Pose Estimation để lấy chuỗi tọa độ keypoint cơ thể người, rồi mô hình hóa trên "đồ thị bộ xương thời-không gian", giảm thiểu nhiễu nền và ánh sáng, tập trung hơn vào cấu trúc cơ thể và mẫu chuyển động.
- **Hợp nhất đa phương thức**: Kết hợp đặc trưng video, chuỗi keypoint, thậm chí âm thanh, văn bản và nhiều phương thức khác để xử lý các tình huống hành vi phức tạp (như tương tác nhiều người, hành động cấp sự kiện).

Tương ứng, kiến trúc mô hình cũng phát triển đa dạng:

- Nhận diện hành động giai đoạn đầu chủ yếu dựa trên **2D CNN + time pooling** hoặc **3D CNN** (như I3D, C3D): cách trước trích đặc trưng từng khung rồi pooling hoặc RNN theo chiều thời gian; cách sau thực hiện tích chập 3D trực tiếp trên không gian và thời gian, nắm bắt mẫu chuyển động ngắn hạn.
- Đối với chuỗi bộ xương, phương pháp tiêu biểu là **mạng tích chập đồ thị thời-không gian (ST-GCN)**: coi keypoint cơ thể người là các nút trong cấu trúc đồ thị, kết nối giữa các khớp là cạnh, cũng kết nối theo chiều thời gian, truyền thông tin trên đồ thị thời-không gian qua tích chập đồ thị để học mẫu hành động. Các phương pháp này nhẹ, mạnh mẽ với nền và phù hợp triển khai trên thiết bị hạn chế tài nguyên.
- Gần đây, **Video Transformer** (như TimeSformer, Video Swin) nổi bật trong nhận diện hành động, chúng chia video thành các patch thời-không gian, mô hình hóa phụ thuộc dài hạn qua cơ chế tự chú ý, có khả năng nắm bắt tốt hơn các hành động phức tạp và tương tác đa mục tiêu.

Ở phía nghiệp vụ, Action Recognition thường kết hợp với phát hiện, theo dõi và Keypoint Detection để tạo thành hệ thống phân tích hành vi end-to-end:

- Trong an ninh, trước tiên phát hiện và theo dõi người, rồi phân loại hành động trên chuỗi keypoint của từng quỹ đạo, thực hiện phát hiện ngã, nhận diện đánh nhau/chạy,...;
- Trong ứng dụng thể thao và fitness, phân tích chuỗi keypoint để đánh giá hành động có chuẩn xác không, biên độ có phù hợp không và đưa ra gợi ý sửa lỗi;
- Trong tình huống tương tác người-máy, thực hiện phân loại hành động nhẹ trên luồng tư thế thời gian thực, thực hiện tương tác vẫy tay, tim tay, lệnh cử chỉ,...;
- Trong an toàn công nghiệp, liên tục giám sát thao tác của công nhân, nhận diện tư thế nguy hiểm (như cúi người vào vùng nguy hiểm, vượt qua ranh giới an toàn,...).

Hướng tới tương lai, các mô hình lớn đa phương thức đang nâng "Action Recognition" lên thành "hiểu sự kiện và ý định" ở tầng cao hơn: mô hình không chỉ có thể gán nhãn "đi bộ, chạy, nghe điện thoại", mà còn có thể trả lời các mô tả gần với ngôn ngữ hàng ngày hơn như "người này có vẻ đang ra hiệu gọi ai đó", "hai người này đang xảy ra tranh cãi". Keypoint Detection và Action Recognition trong đó, với tư cách là những gợi ý chuyển động có cấu trúc quan trọng, cùng với đặc trưng ngoại quan và text prompt, cùng nhau hỗ trợ năng lực hiểu thời-không gian phức tạp hơn.
## 2.6 Phát hiện Từ vựng Mở / Thế giới Mở / Miền Mở

（Open‑Vocabulary / Open‑World / Open‑Domain Detection）

Các năng lực phát hiện và phân đoạn trước đây đều ngầm giả định một tiền đề: **tập hợp danh mục tại thời điểm huấn luyện và suy luận là cố định**. Nghĩa là, mô hình đã thấy đầy đủ "tất cả các danh mục cần nhận dạng" ngay trong giai đoạn huấn luyện, và khi suy luận chỉ cần lựa chọn trong bộ nhãn đóng này. Tuy nhiên, thế giới thực phức tạp hơn nhiều so với bất kỳ bộ dữ liệu nào: sản phẩm mới, thương hiệu mới, biển báo mới, loài sinh vật mới, tình huống mới liên tục xuất hiện — không thể chuẩn bị đủ dữ liệu gán nhãn cho mỗi danh mục mới rồi huấn luyện lại bộ phát hiện. Điều này thúc đẩy sự ra đời của **phát hiện từ vựng mở / thế giới mở / miền mở**: trong điều kiện dữ liệu huấn luyện chỉ bao phủ một số hữu hạn "danh mục đã biết", mô hình vẫn có thể cảm nhận, định vị và nhận dạng **các danh mục mới chưa từng thấy** khi suy luận, đồng thời duy trì tính bền vững khi phong cách hình ảnh và miền chụp (domain) thay đổi.

Bạn có thể hiểu tầng này như sau: trên nền tảng phát hiện truyền thống, thêm vào "khả năng căn chỉnh và tổng quát hóa với không gian ngôn ngữ và thế giới mở". Mô hình không còn chỉ nói "đây là một trong 80 danh mục COCO", mà có thể hiểu và truy xuất mục tiêu trong không gian được mô tả bằng văn bản tùy ý — ví dụ: "phát hiện tất cả 'giày thể thao màu đỏ' trong ảnh", "đánh dấu tất cả 'phương tiện bay nhỏ nghi vấn'" — dù các danh mục chi tiết này chưa bao giờ xuất hiện tường minh trong tập huấn luyện. Dưới đây chúng ta sẽ xem xét tầng này từ ba góc độ: **tình huống**, **nguyên lý** và **mô hình**, đồng thời lần lượt mở rộng phát hiện từ vựng mở, phát hiện thế giới mở và tổng quát hóa miền mở trong các tiểu mục.

- **Tình huống**
  - API hiểu cảnh tổng quát: người dùng cung cấp mô tả ngôn ngữ tự nhiên tùy ý (từ danh mục hoặc câu ngắn), hệ thống trả về khung phát hiện hoặc mặt nạ phân đoạn của mục tiêu tương ứng trên hình ảnh bất kỳ phong cách nào — ví dụ: "tất cả mũ bảo hộ trong ảnh", "tất cả logo thương hiệu nghi vấn", "tất cả vật thể có bánh xe".
  - Nhận dạng hàng hóa / loài sinh vật quy mô lớn: hàng hóa đuôi dài liên tục ra mắt trong thương mại điện tử, các loài động thực vật phong phú trong tự nhiên — dữ liệu huấn luyện chỉ bao phủ một phần danh mục đã biết, nhưng hệ thống cần định vị và nhận dạng sơ bộ hàng loạt danh mục mới, đồng thời hỗ trợ truy xuất qua văn bản hoặc hình ảnh.
  - Giám sát an ninh / cảm biến lái xe tự động đa miền: dữ liệu huấn luyện chủ yếu từ đường phố thành thị ban ngày / một số góc camera nhất định, nhưng triển khai thực tế phải đối mặt với các "miền mới" như thành phố khác, nông thôn, cao tốc, thời tiết khắc nghiệt, camera hồng ngoại / mắt cá — trong đó còn xuất hiện các mục tiêu mới chưa từng được gán nhãn trong tập huấn luyện (mẫu xe mới, cơ sở hạ tầng giao thông mới, chướng ngại vật loại mới).
- **Nguyên lý**
  Cốt lõi của nhóm phương pháp này là dùng **không gian nhúng căn chỉnh thị giác–ngôn ngữ** thay thế "đầu danh mục one‑hot cố định" truyền thống, kết hợp nhiều cơ chế để xử lý "danh mục chưa thấy" và "miền mới":
  - Phát hiện từ vựng mở (Open‑Vocabulary Detection): trong giai đoạn huấn luyện, tận dụng các cặp ảnh–văn bản (image–text pairs) quy mô lớn để tiền huấn luyện không gian căn chỉnh kiểu CLIP, cho phép đặc trưng vùng ảnh và nhúng văn bản so khớp trực tiếp trong cùng một không gian ngữ nghĩa; đầu phát hiện không còn xuất ra logit danh mục cố định mà xuất ra vector đặc trưng vùng, đối chiếu với vector mô tả văn bản tùy ý, từ đó hỗ trợ "huấn luyện chỉ thấy một phần danh mục, suy luận có thể chỉ định danh mục văn bản bất kỳ".
  - Phát hiện thế giới mở (Open‑World Detection): xử lý thêm "các danh mục hoàn toàn không có gán nhãn trong tập huấn luyện", yêu cầu mô hình có thể phát hiện các mục tiêu đó dưới dạng "danh mục chưa biết (unknown)", và sau đó thông qua gán nhãn tương tác hoặc học liên tục, dần dần đưa các danh mục chưa biết này vào tập danh mục đã biết, hình thành một hệ thống học trực tuyến có thể liên tục mở rộng danh mục.
  - Phát hiện miền mở / đa miền (Open‑Domain Detection): đối mặt với sự thay đổi lớn về phong cách ảnh, thiết bị chụp, điều kiện môi trường (domain shift), sử dụng các kỹ thuật như thích ứng miền (Domain Adaptation) và tổng quát hóa miền (Domain Generalization) để giúp bộ phát hiện duy trì hiệu suất ổn định trên các miền mới chưa từng thấy; các phương pháp phổ biến bao gồm căn chỉnh miền đối kháng, huấn luyện đa miền, ngẫu nhiên hóa phong cách, meta-learning, v.v.
  - Từ vựng mở tích hợp phân đoạn và phát hiện: mở rộng ý tưởng trên xuống cấp pixel, tạo mặt nạ phân đoạn cho bất kỳ mô tả văn bản nào (open‑vocabulary segmentation), thông qua hàm mất mát căn chỉnh Region–Word hoặc Mask–Word, thực hiện "mô tả một vùng / vật thể bằng ngôn ngữ tự nhiên là nhận được mask hoặc khung tương ứng".
- **Mô hình**
  Các hướng kỹ thuật chủ đạo hiện nay của phát hiện từ vựng mở / thế giới mở / miền mở về cơ bản xoay quanh "tiền huấn luyện thị giác–ngôn ngữ quy mô lớn + thích ứng đầu phát hiện + cơ chế tổng quát hóa miền":
  - Bộ phát hiện dựa trên CLIP: lấy bộ mã hóa ảnh và bộ mã hóa văn bản kiểu CLIP làm nền tảng, áp dụng học tương phản và hàm mất mát căn chỉnh Region–Word giữa đặc trưng cấp vùng (ROI, patch bản đồ đặc trưng, vùng mask) và nhúng văn bản; các triển khai điển hình bao gồm thay thế hoặc mở rộng đầu phân loại trên các kiến trúc Faster R‑CNN / RetinaNet / YOLO / DETR, khiến chúng xuất điểm danh mục theo cách "độ tương đồng cosine + nhúng văn bản".
  - Phát hiện dẫn bởi caption / dựa trên prompt: tận dụng dữ liệu mô tả ảnh–văn bản (caption) quy mô lớn, tự động tạo mô tả văn bản cho các vùng hoặc mask trong ảnh, rồi dùng những văn bản tự tạo này căn chỉnh với vùng phát hiện / phân đoạn để huấn luyện, từ đó giảm phụ thuộc vào nhãn danh mục thủ công; khi suy luận, dùng prompt ngôn ngữ tự nhiên (như "tất cả người mặc áo đỏ", "tất cả xe điện") điều khiển phát hiện / phân đoạn.
  - Chuỗi công trình phát hiện thế giới mở: tường minh đưa vào khung phát hiện truyền thống cơ chế mô hình hóa "danh mục chưa biết (unknown)", mở rộng danh mục tiến bộ và học tăng dần; một số phương pháp dùng khoảng cách trong không gian metric và ước lượng độ không chắc chắn để phán đoán "có phải danh mục chưa biết không", một số khác đưa vào kho nhớ và huấn luyện lại trực tuyến, cho phép hệ thống tích lũy kiến thức danh mục mới theo thời gian.
  - Phát hiện thích ứng miền / tổng quát hóa miền: bổ sung bộ phân biệt miền, hàm mất mát đối kháng, batch normalization đa miền, tăng cường ngẫu nhiên hóa phong cách, v.v. vào tầng Backbone và đầu phát hiện, giúp bộ phát hiện học được biểu diễn bất biến miền hơn giữa các miền khác nhau; cũng có các công trình đưa chiến lược huấn luyện đa nguồn miền và meta-learning vào khung phát hiện Transformer (như Deformable DETR) để nâng cao khả năng tổng quát hóa đa miền.
  - Mô hình phát hiện tổng quát / Foundation: nâng bài toán phát hiện lên tầm "mô hình nền tảng", tiền huấn luyện một Detection Foundation Model tổng quát nhất có thể về danh mục lẫn miền, rồi thích ứng cho tình huống cụ thể qua tinh chỉnh nhẹ hoặc prompt văn bản; loại mô hình này thường kết hợp gán nhãn phát hiện quy mô lớn, cặp ảnh–văn bản đa nguồn, thậm chí dữ liệu video, với mục tiêu biến "hiểu biết tổng quát về ảnh bất kỳ phong cách + văn bản bất kỳ" thành hiện thực.

Về mặt hình thái sản phẩm cụ thể, phát hiện từ vựng mở / thế giới mở / miền mở thường thể hiện dưới dạng giao diện thị giác "tự nhiên hơn, ít ràng buộc hơn": người dùng không cần thỏa thuận trước một tập nhãn nhỏ cố định, mà có thể dùng ngôn ngữ tự nhiên mô tả mục tiêu cần tìm; hệ thống cũng không cần huấn luyện lại bộ phát hiện từ đầu cho từng tình huống nghiệp vụ, mà dựa trên mô hình tổng quát thống nhất, nhanh chóng thích ứng qua prompt hoặc vài mẫu ít. Đối với hệ thống nhận dạng hàng hóa / loài sinh vật quy mô lớn, hệ thống giám sát an ninh và cảm biến lái xe tự động triển khai toàn cầu, tầng năng lực này đang trở thành bệ phóng quan trọng từ "hiệu suất trên bộ dữ liệu đóng" sang "khả dụng trong thế giới mở thực sự".

### 2.6.1 Phát hiện từ vựng mở: từ đầu danh mục cố định đến không gian danh mục dẫn bởi văn bản

**Xuất phát điểm của phát hiện từ vựng mở (Open‑Vocabulary Detection) là phá vỡ giới hạn "đầu danh mục cố định" trong phát hiện truyền thống. Trước đây, bộ phát hiện nối ở tầng trên cùng một lớp phân loại có kích thước cố định (tương ứng N danh mục trong tập huấn luyện), sau khi huấn luyện xong chỉ có thể lựa chọn trong N danh mục đó; còn phát hiện từ vựng mở thì thông qua việc đưa vào** bộ mã hóa văn bản và không gian nhúng ngữ nghĩa chung, cho phép đặc trưng vùng xuất ra từ đầu phát hiện so khớp độ tương đồng với bất kỳ mô tả văn bản nào, từ đó chấp nhận các danh mục mới chưa từng thấy khi suy luận.

Cách làm điển hình là dùng mô hình tiền huấn luyện thị giác–ngôn ngữ kiểu CLIP:

- Phía văn bản: mã hóa tên danh mục hoặc mô tả ngôn ngữ tự nhiên (như "person", "red sports car", "yellow construction helmet"), thu được vector văn bản.
- Phía thị giác: trong khung phát hiện (Faster R‑CNN, RetinaNet, YOLO, DETR, v.v.), trích xuất vector đặc trưng vùng cho mỗi vùng ứng viên hoặc điểm đặc trưng.
- Huấn luyện căn chỉnh: thông qua hàm mất mát tương phản, hàm mất mát căn chỉnh Region–Word, khiến văn bản và đặc trưng vùng cùng ngữ nghĩa xích lại gần nhau trong không gian nhúng, các vector khác ngữ nghĩa thì cách xa nhau. Khi huấn luyện, dù chỉ cung cấp gán nhãn khung tường minh cho một phần danh mục, vẫn có thể mở rộng độ phủ ngữ nghĩa bằng cặp ảnh–văn bản hoặc caption ảnh.

Ở giai đoạn suy luận, hệ thống không còn phụ thuộc vào một tập tên danh mục cố định từ lúc huấn luyện, mà cho phép người dùng cung cấp trực tuyến danh mục từ tùy ý hoặc mô tả ngôn ngữ tự nhiên, chuyển thành nhúng qua bộ mã hóa văn bản, rồi so khớp độ tương đồng với đặc trưng vùng. Điều này cho phép bộ phát hiện, mà không cần huấn luyện lại, hỗ trợ các nhu cầu linh hoạt như "phát hiện tất cả ván trượt", "phát hiện tất cây xanh", "phát hiện tất cả thiết bị liên quan an toàn" — dù một số danh mục cụ thể chưa từng xuất hiện gán nhãn đầy đủ trong tập huấn luyện, miễn là về mặt ngữ nghĩa có sự chồng lấp với không gian ảnh–văn bản đã tiền huấn luyện thì đều có thể được nhận dạng và định vị ở một mức độ nhất định.

Trong thực tiễn kỹ thuật, phát hiện từ vựng mở cần cân bằng giữa hiệu quả và hiệu suất: một mặt, duy trì căn chỉnh ngữ nghĩa với Backbone thị giác–ngôn ngữ tiền huấn luyện quy mô lớn; mặt khác, phải đáp ứng yêu cầu đa tỉ lệ và thời gian thực của tác vụ phát hiện. Các bộ phát hiện dựa trên CLIP chủ đạo thường dùng phương pháp "tính trước nhúng văn bản + tính độ tương đồng vector hiệu quả" để tránh mã hóa lại văn bản nhiều lần trong dịch vụ trực tuyến, đồng thời lượng tử hóa hoặc chưng cất đặc trưng vùng để cân bằng độ chính xác và tốc độ suy luận.

### 2.6.2 Phát hiện thế giới mở: từ "danh mục chưa thấy" đến "ẩn số có thể học"

**Phát hiện thế giới mở (Open‑World Detection) trên nền tảng từ vựng mở, tiến thêm một bước yêu cầu mô hình xử lý tường minh "danh mục chưa biết"**: dữ liệu huấn luyện chỉ gán nhãn một phần danh mục, các vật thể còn lại hoặc chưa được gán nhãn, hoặc đều được gọi chung là nền; khi suy luận, các "vật thể thực có nhưng chưa được gán nhãn" này không nên bị coi đơn giản là nền, cũng không nên bị phân loại sai vào danh mục đã biết, mà nên được phát hiện dưới dạng "danh mục chưa biết (unknown)", đồng thời có khả năng sau đó chuyển hóa thành "danh mục mới đã biết".

Về mặt mô hình hóa, phát hiện thế giới mở thường cần giải quyết ba vấn đề:

1. **Nhận thức danh mục chưa biết**: làm thế nào để tránh học tất cả mục tiêu chưa gán nhãn thành "nền" trong giai đoạn huấn luyện? Các cách làm phổ biến bao gồm: đưa vào slot "danh mục chưa biết" tường minh, thông qua khai thác ví dụ âm và mô hình hóa độ không chắc chắn để mô hình học cách xuất "unknown" ở các vùng độ tin cậy thấp; hoặc dùng dữ liệu không gán nhãn và cơ chế tự giám sát, thực hiện phân cụm và tạo nhãn giả cho các vùng mục tiêu tiềm năng có độ tin cậy cao.
2. **Kiểm soát phân loại sai**: mô hình cần cân bằng giữa "thà phán đoán là unknown còn hơn phân loại sai vào danh mục đã biết", liên quan đến thiết kế hàm mất mát (như margin, phân biệt tập mở), ngưỡng quyết định và chiến lược hậu xử lý.
3. **Mở rộng danh mục tiến bộ**: khi bên nghiệp vụ gán nhãn thủ công một loạt mục tiêu "unknown" thành danh mục mới, mô hình nên có thể đưa các danh mục mới này vào tập "danh mục đã biết" qua học tăng dần mà không quên đáng kể các danh mục cũ. Vì vậy, nhiều công trình đưa vào kho nhớ, hàm mất mát chưng cất, cách ly tham số hoặc cơ chế phát lại để hấp thụ ổn định các danh mục mới.

Từ góc độ sản phẩm, phát hiện thế giới mở đặc biệt phù hợp với các tình huống **danh mục tăng trưởng liên tục, đuôi dài cực kỳ nghiêm trọng** — ví dụ nhận dạng loài sinh vật tự nhiên, nhận dạng hàng hóa ra mắt nhanh, phát hiện mục tiêu bất thường trong tình huống an ninh phức tạp. Hệ thống có thể trước tiên dùng phát hiện thế giới mở để đánh dấu "bất kỳ mục tiêu đáng ngờ nào không phải nền", rồi dần dần qua gán nhãn thủ công hoặc bán tự động, nâng cấp các cụm có giá trị thành danh mục chính thức, từ đó hình thành một hệ thống phát hiện "danh mục có thể tăng trưởng bền vững", thay vì bị bó buộc bởi bộ dữ liệu cố định.

### 2.6.3 Phát hiện miền mở / phân phối mở: tính bền vững đa phong cách, đa thiết bị, đa tình huống

Dù tập danh mục không thay đổi, bộ phát hiện vẫn sẽ gặp phải **dịch chuyển miền (Domain Shift)** nghiêm trọng trong triển khai thực tế: dữ liệu huấn luyện có thể từ camera độ phân giải cao ban ngày tại một vài thành phố, nhưng môi trường triển khai lại bao gồm các quốc gia khác nhau, nông thôn, cao tốc, hầm đường bộ, ban đêm, mưa tuyết, camera độ phân giải thấp, ống kính mắt cá thậm chí hình ảnh hồng ngoại; giữa ảnh chụp sản phẩm thương mại điện tử và ảnh người dùng chụp thực tế, ảnh quảng cáo / minh họa / phong cách hoạt hình cũng tồn tại sự khác biệt rất lớn. **Phát hiện miền mở (Open‑Domain Detection)** tập trung vào: duy trì sự ổn định và đáng tin cậy của hiệu suất phát hiện khi phân phối ảnh thay đổi đáng kể.

Các hướng kỹ thuật điển hình bao gồm:

- **Thích ứng miền (Domain Adaptation)**: trong điều kiện có dữ liệu không gán nhãn hoặc ít gán nhãn của miền đích, thông qua căn chỉnh miền đối kháng (gây nhầm lẫn miền nguồn / miền đích trong không gian đặc trưng), căn chỉnh miền đa cấp (phong cách ảnh, đặc trưng, đầu ra đầu phát hiện), chuyển phong cách (như chuyển phong cách ảnh miền nguồn sang miền đích), v.v., giúp mô hình học được đặc trưng ít nhạy cảm với miền.
- **Tổng quát hóa miền (Domain Generalization)**: trong điều kiện chỉ có dữ liệu nhiều miền nguồn mà không có dữ liệu miền đích, dùng các phương pháp như huấn luyện đa miền, ngẫu nhiên hóa phong cách, nhiễu loạn đặc trưng, meta-learning để mô hình tiếp xúc với phân phối đa dạng nhất có thể ngay trong giai đoạn huấn luyện, nâng cao khả năng tổng quát hóa trên miền mới chưa biết.
- **Mô hình phát hiện tổng quát / Foundation**: thông qua tiền huấn luyện Backbone và cấu trúc đầu phát hiện trên dữ liệu quy mô cực lớn, đa nguồn, đa phong cách (bao gồm ảnh tự nhiên, khung video, dữ liệu tổng hợp, dữ liệu đa phương thức), rồi tinh chỉnh nhẹ cho tình huống nghiệp vụ cụ thể, từ đó đạt được tính bền vững miền mở mạnh hơn so với "huấn luyện đơn miền".

Các cơ chế miền mở này thường chồng lấp lẫn nhau với năng lực từ vựng mở / thế giới mở: một hệ thống phát hiện tổng quát hướng đến thế giới thực vừa cần hiểu được mô tả danh mục ngôn ngữ tự nhiên của người dùng (từ vựng mở), vừa cần đưa ra phán đoán "chưa biết" hợp lý và hấp thụ tiến bộ cho các mục tiêu mới xuất hiện (thế giới mở), lại còn cần duy trì hiệu suất dưới các quốc gia, thiết bị, thời tiết và phong cách khác nhau (miền mở). Trong triển khai kỹ thuật, ba yếu tố này không phải là các hướng nghiên cứu độc lập với nhau, mà cùng nhau cấu thành tổ hợp năng lực quan trọng để bước từ "benchmark đóng" sang "khả dụng trong thế giới mở".
## 2.7 Nhiệm vụ Thị giác–Ngôn ngữ (Vision–Language Tasks)

Các chương trước chủ yếu xoay quanh "thị giác đơn modal": đầu vào là một ảnh, đầu ra là bounding box, segmentation mask, nhãn lớp hoặc điểm chất lượng. Trong nhiều ứng dụng thực tế, thông tin thị giác không tồn tại độc lập — một bức ảnh thường đi kèm tiêu đề, chú thích, hội thoại hay câu truy vấn tìm kiếm; người dùng muốn hỏi "ảnh này nói gì" hay "ảnh này có khớp với câu này không". **Nhiệm vụ thị giác–ngôn ngữ** chính là để giải quyết những vấn đề như vậy: chúng nhận ảnh + văn bản làm đầu vào hoặc đầu ra, thông qua **căn chỉnh đa modal và mô hình hóa kết hợp**, giúp hệ thống có thể "xem ảnh mô tả", "xem ảnh trả lời câu hỏi", "dùng văn bản tìm ảnh / dùng ảnh tìm văn bản".

Từ góc độ sản phẩm, mô hình thị giác–ngôn ngữ (VLM) là năng lực cốt lõi của hệ thống đa modal: công cụ tìm kiếm dựa vào nó để thực hiện "tìm ảnh bằng văn bản / tìm văn bản bằng ảnh"; nền tảng nội dung dùng nó để ghép ảnh thông minh, kiểm duyệt quảng cáo, kiểm tra độ nhất quán giữa ảnh và văn bản; các trợ lý đa modal sử dụng nó như năng lực nền tảng để thực hiện "trò chuyện qua ảnh", "đặt câu hỏi về tài liệu/ảnh chụp màn hình". Dưới đây chúng ta sẽ tổng hợp tầng này theo ba góc độ **tình huống**, **nguyên lý** và **mô hình**, sau đó mở rộng riêng phần mô tả ảnh, VQA và truy xuất ảnh–văn bản trong các tiểu mục tiếp theo.

- **Tình huống**
  - Mô tả ảnh (Image Captioning): Tự động tạo một hoặc hai câu mô tả ngôn ngữ tự nhiên cho ảnh, dùng cho đọc hỗ trợ người khuyết tật, chú thích album thông minh, làm giàu chỉ mục tìm kiếm.
  - Hỏi đáp hình ảnh (VQA): Người dùng đặt câu hỏi ngôn ngữ tự nhiên về ảnh ("Người này đang cầm gì?", "Biển số xe là bao nhiêu?"), hệ thống đưa ra câu trả lời chính xác, có thể dùng trong giáo dục, hỗ trợ quyết định và trợ lý đa modal.
  - Truy xuất ảnh–văn bản (Cross‑modal Retrieval): Dùng văn bản tìm ảnh liên quan (Text‑to‑Image), dùng ảnh tìm văn bản liên quan (Image‑to‑Text), hỗ trợ tìm kiếm "dùng văn bản tìm ảnh / dùng ảnh tìm văn bản", chọn ảnh sáng tạo và kiểm duyệt quảng cáo.
  - Kiểm tra độ nhất quán ảnh–văn bản và kiểm duyệt: Phán đoán xem ảnh có phù hợp với tiêu đề/slogan quảng cáo không, có rủi ro "ảnh và chữ không khớp" hay "mô tả gây hiểu lầm" không, dùng trong kiểm duyệt nội dung và an toàn thương hiệu.
- **Nguyên lý**
  Vấn đề cốt lõi là: làm thế nào để ánh xạ ảnh và văn bản vào **cùng một không gian ngữ nghĩa**, và thực hiện căn chỉnh cũng như suy luận trong không gian đó:
  - Căn chỉnh đa modal: Thông qua bộ mã hóa ảnh và bộ mã hóa văn bản được huấn luyện kết hợp, để các "cặp ảnh–văn bản" tương ứng gần nhau trong không gian biểu diễn, các cặp không liên quan thì xa nhau (điển hình như CLIP); đây là nền tảng cho truy xuất và khớp.
  - Hiểu và sinh kết hợp: Dựa trên biểu diễn đã căn chỉnh, đưa vào cơ chế attention đa modal, để mô hình ngôn ngữ sinh văn bản (mô tả ảnh), suy luận và trả lời câu hỏi (VQA) trên nền tảng "nhìn thấy đặc trưng ảnh".
  - Prompt hóa và chỉ thị hóa: Dùng các chỉ thị ngôn ngữ tự nhiên để mô tả thống nhất nhiều loại nhiệm vụ thị giác–ngôn ngữ ("viết tiêu đề cho ảnh này", "trả lời câu hỏi về ảnh này", "phán đoán xem đoạn văn này có mô tả ảnh không"), để một mô hình hoàn thành nhiều loại nhiệm vụ thông qua các prompt khác nhau.
- **Mô hình**
  Các VLM chủ đạo phát triển thành hai dòng: **VLM học tương phản** và **LLM đa modal sinh tạo**:
  - Học tương phản: CLIP, ALIGN, v.v., mã hóa ảnh và văn bản thành vector riêng biệt, huấn luyện trên dữ liệu cặp ảnh–văn bản quy mô lớn, đạt hiệu quả xuất sắc trong các tác vụ truy xuất và khớp, là nền tảng của "tìm ảnh bằng văn bản / tìm văn bản bằng ảnh".
  - Mô hình sinh thị giác–ngôn ngữ: BLIP / BLIP‑2, Flamingo, Kosmos, LLaVA, v.v., kết nối bộ mã hóa thị giác với LLM, thông qua attention đa modal và instruction fine-tuning, hỗ trợ mô tả ảnh, VQA, hội thoại nhiều lượt và các tác vụ phức tạp khác.
  - LLM đa modal tổng quát: Như GPT‑4.1 with Vision, Gemini 1.5, v.v., tiếp tục thống nhất thị giác cùng nhiều modal hơn (giọng nói, code, v.v.) vào một mô hình lớn, thực hiện truy xuất, hỏi đáp, suy luận và sinh tạo thông qua interface thống nhất.

Nhìn chung, các nhiệm vụ thị giác–ngôn ngữ đánh dấu rằng "thị giác không còn là một kênh nhận thức riêng biệt" mà cùng với ngôn ngữ tham gia vào biểu đạt tri thức và suy luận ở tầng cao hơn. Dưới đây chúng ta sẽ mở rộng theo hai hướng: **mô tả ảnh và VQA**, **truy xuất ảnh–văn bản và căn chỉnh đa modal** (gộp thành hai tiểu mục theo nội dung).

### 2.7.1 Mô tả ảnh và VQA: Từ "xem ảnh mô tả" đến "xem ảnh suy luận"

Mục tiêu của **Mô tả ảnh (Image Captioning)** là nhận đầu vào một ảnh và đưa ra một đoạn mô tả ngôn ngữ tự nhiên, ví dụ "một bé gái đang thả diều trên bãi cỏ". Cách tiếp cận truyền thống thường dùng cấu trúc "CNN + RNN": dùng mạng tích chập trích xuất đặc trưng toàn ảnh, rồi dùng LSTM/GRU sinh từng từ mô tả; khi Transformer và VLM pre-trained xuất hiện, paradigm chủ đạo dần chuyển sang cấu trúc "bộ mã hóa ảnh + bộ giải mã văn bản" như BLIP / BLIP‑2, ViT + GPT, v.v. Về huấn luyện, mô hình thường được huấn luyện autoregressive trên lượng lớn cặp ảnh–văn bản, đôi khi còn sử dụng reinforcement learning hoặc contrastive loss để tối ưu tính đa dạng và độ chính xác của mô tả. Ở tầng sản phẩm, mô tả ảnh được ứng dụng rộng rãi trong đọc hỗ trợ người khuyết tật (tạo chú thích ảnh cho phần mềm đọc màn hình của người mù), album thông minh tự động thêm tiêu đề, cũng như cung cấp thêm chỉ mục văn bản cho hệ thống tìm kiếm.

**VQA (Visual Question Answering) đưa thêm tương tác của con người vào: đầu vào của mô hình không còn là "ảnh + prompt trống" mà là "ảnh + câu hỏi", đầu ra là một câu trả lời ngắn hoặc giải thích ngôn ngữ tự nhiên. So với mô tả ảnh, VQA nhấn mạnh hơn vào khả năng kiểm soát và suy luận**: câu hỏi có thể tập trung vào chi tiết cục bộ ("mũ của người đàn ông màu gì?"), quan hệ ("xe nào gần ngã tư hơn?"), đếm ("có bao nhiêu con chó?"), thậm chí cần kiến thức bên ngoài ("món ăn này thuộc ẩm thực nào?"). Các mô hình VQA đời đầu thường dùng bộ mã hóa ảnh + bộ mã hóa câu hỏi + module hợp nhất (như bilinear pooling, attention) + classification head, đưa ra câu trả lời từ một bộ từ vựng hữu hạn; các LLM đa modal hiện đại thì dùng trực tiếp bộ mã hóa ảnh + LLM, thực hiện sinh ngôn ngữ tự nhiên trên nền tảng "nhìn ảnh", có ưu thế rõ ràng trong trả lời mở và hội thoại nhiều lượt.

Cả hai có thể được xem là các "template prompt" khác nhau trong framework VLM thống nhất:

- Captioning: `<ảnh> + "Describe this image in one sentence."` → văn bản;
- VQA: `<ảnh> + "Q: ... A:"` → văn bản.

Thông qua Instruction Tuning, cùng một LLM đa modal có thể tương thích nhiều tác vụ như mô tả, hỏi đáp, giải thích, gán nhãn, đây cũng là tư duy kỹ thuật nền tảng của các sản phẩm VLM hiện đại (trợ lý đa modal, chatbot hỏi đáp hình ảnh, v.v.).

### 2.7.2 Truy xuất ảnh–văn bản và căn chỉnh đa modal: Tìm ảnh bằng văn bản & Tìm văn bản bằng ảnh

**Truy xuất ảnh–văn bản (Cross‑modal Retrieval)** giải quyết một nhu cầu tần suất cao khác: cho trước một đoạn văn bản, tìm ảnh phù hợp (Text‑to‑Image Retrieval); hoặc cho trước một bức ảnh, tìm các mô tả văn bản liên quan, thông tin sản phẩm, bài báo, v.v. (Image‑to‑Text Retrieval). Các năng lực này tạo thành cốt lõi của các sản phẩm "tìm ảnh bằng văn bản / tìm văn bản bằng ảnh", "tìm sản phẩm qua ảnh", "ghép ảnh cho tin tức", v.v.

Kỹ thuật cốt lõi là **căn chỉnh đa modal**: các mô hình tiêu biểu như CLIP sử dụng bộ mã hóa riêng cho ảnh và văn bản (như ViT và Transformer text encoder), huấn luyện bằng contrastive learning trên dữ liệu cặp ảnh–văn bản quy mô lớn:

- Với cùng một cặp (ảnh, văn bản), đưa vector của chúng lại gần nhau trong không gian embedding;
- Với các cặp ảnh–văn bản không khớp, đẩy xa vector của chúng ra.

Sau khi huấn luyện, chỉ cần mã hóa tất cả ảnh và văn bản thành vector, có thể thực hiện khớp nhanh trong không gian dùng chung thông qua vector search (tìm kiếm láng giềng gần nhất):

- Text‑to‑Image: văn bản → vector văn bản → vector ảnh gần nhất;
- Image‑to‑Text: ảnh → vector ảnh → vector văn bản gần nhất.

Trong thực hành kỹ thuật, loại mô hình này thường dùng cấu trúc hai giai đoạn:

- Giai đoạn 1 dùng bi-encoder nhẹ và nhanh (Bi‑Encoder, như CLIP) để truy xuất thô, nhanh chóng lọc ra một tập nhỏ ứng viên từ thư viện ảnh hàng trăm triệu bản;
- Giai đoạn 2 có thể dùng cross-encoder mạnh hơn (Cross‑Encoder) hoặc LLM đa modal để re-rank và reorder các ứng viên, nhằm nâng cao độ liên quan và tính bền vững.

Ở phía sản phẩm, truy xuất ảnh–văn bản và căn chỉnh đa modal được ứng dụng rộng rãi trong: tìm kiếm ảnh, truy xuất quảng cáo (tìm ảnh phù hợp dựa trên copy quảng cáo), kiểm tra tuân thủ (kiểm tra xem ảnh và văn bản quảng cáo có nhất quán không), gợi ý nội dung (dựa trên lịch sử đọc văn bản của người dùng để gợi ý ảnh/video liên quan), v.v. Khi các LLM đa modal ngày càng phát triển, năng lực truy xuất này cũng dần được tích hợp vào các framework đa modal lớn hơn, dưới dạng "chỉ thị ngôn ngữ tự nhiên + bộ nhớ đa modal / vector database", cung cấp interface thống nhất ra bên ngoài.
## 2.8 Nhận dạng ký tự quang học (OCR)

Trong nhiều nghiệp vụ, thông tin quan trọng nhất không nằm ở "vật thể và cảnh vật trong hình ảnh", cũng không phải ở mô tả ngôn ngữ tự nhiên về hình ảnh, mà được viết trực tiếp lên hình ảnh dưới dạng **văn bản**: điều khoản hợp đồng, số tiền hóa đơn, tên biển báo đường phố, số đọc trên đồng hồ đo, thông báo lỗi trên ảnh chụp màn hình, v.v. **Nhận dạng ký tự quang học (OCR)** là tác vụ hiểu có cấu trúc xoay quanh "hình ảnh + bố cục tài liệu": tự động phát hiện và nhận dạng nội dung văn bản từ đầu vào thị giác phức tạp, hiểu bố cục và cấu trúc tài liệu, từ đó hỗ trợ tìm kiếm, thống kê, nhập liệu tự động và hỏi đáp thông minh.

Nhìn từ góc độ sản phẩm, OCR là cầu nối then chốt "biến thông tin dạng giấy/hình ảnh thành văn bản có thể tính toán", là hạ tầng cơ sở cho việc điện tử hóa, tự động hóa và thông minh hóa văn phòng: xem xét hợp đồng, nhập liệu chứng từ, số hóa hồ sơ doanh nghiệp/chính phủ, chuyển đổi PDF sang Word trong phần mềm văn phòng, trợ lý hỏi đáp tài liệu, v.v., tất cả đều được xây dựng trên nền tảng năng lực OCR. Dưới đây là tổng quan hệ thống OCR theo ba góc độ **tình huống**, **nguyên lý** và **mô hình**, và sẽ được triển khai chi tiết trong các tiểu mục tiếp theo.

- **Tình huống**
  - Nhận dạng văn bản trong cảnh thực: biển hiệu cửa hàng, biển đường, bảng quảng cáo, chữ trên bao bì trong cảnh đường phố, dùng cho điều hướng, tìm kiếm, phân tích bán lẻ và kiểm tra tuân thủ.
  - OCR tài liệu: nhận dạng văn bản và cấu trúc hóa các bản scan, fax, PDF, hợp đồng/hóa đơn/báo cáo dạng ảnh, khôi phục thành văn bản có thể chỉnh sửa.
  - Tình huống chuyên biệt: nhận dạng biển số xe, đọc số đồng hồ đo (điện, nước, gas), trích xuất văn bản từ ảnh chụp màn hình, nhận dạng đề thi/biểu mẫu, v.v.
  - Hiểu tài liệu: trích xuất cấu trúc tiêu đề, đoạn văn, bảng, chú thích trong tài liệu dài có bố cục phức tạp, làm nền tảng cho tìm kiếm, tóm tắt và hỏi đáp.
- **Nguyên lý**
  Hệ thống OCR thường được chia thành các bước then chốt sau:
  - Phát hiện văn bản: phát hiện tất cả vùng chứa chữ trong hình ảnh (dòng văn bản hoặc khối văn bản), xuất ra khung định vị (hình chữ nhật ngang hoặc tứ giác bốn điểm), đây là đầu vào cho bước nhận dạng tiếp theo.
  - Nhận dạng văn bản: thực hiện nhận dạng chuỗi trên từng vùng văn bản đã phát hiện, chuyển đổi chuỗi pixel thành chuỗi ký tự (chữ Hán, tiếng Anh, số, ký hiệu, v.v.).
  - Phân tích bố cục (Layout Analysis): trong tình huống tài liệu, nhận dạng vai trò của từng vùng (tiêu đề, nội dung, hình ảnh, bảng, đầu trang/chân trang, v.v.), khôi phục thứ tự đọc và cấu trúc phân cấp.
  - Nhận dạng cấu trúc bảng: phân chia hàng cột vùng bảng, phân tích ranh giới ô, khôi phục ô gộp, tái tạo cấu trúc bảng logic.
  - Hỏi đáp tài liệu (DocVQA): trên nền tảng OCR và hiểu bố cục, cho phép mô hình trả lời các câu hỏi như "Ngày thanh toán trong hợp đồng này là khi nào?" hay "Số tiền trên hóa đơn là bao nhiêu?", đòi hỏi suy luận đa vùng, đa bước.
- **Mô hình**
  Trong kỹ thuật, thường gặp tổ hợp "module OCR chuyên dụng + mô hình hiểu tài liệu + mô hình đa phương thức lớn":
  - Phát hiện và nhận dạng văn bản:
    - Phát hiện: EAST, DBNet/DBNet++ và các phương pháp dựa trên phân đoạn hoặc học cạnh, xử lý tốt văn bản cong và nền phức tạp;
    - Nhận dạng: CRNN, RARE, SAR và các mô hình chuỗi (CNN + RNN/Attention + CTC hoặc giải mã tự hồi quy), hỗ trợ đa ngôn ngữ và đa font chữ.
  - Hiểu bố cục và cấu trúc tài liệu:
    - LayoutLM / LayoutLMv2/v3, DocFormer, v.v., mã hóa chung nội dung văn bản (token), thông tin vị trí (bounding box) và đặc trưng thị giác;
    - Donut và các mô hình "hiểu tài liệu đầu-cuối", chuyển thẳng từ hình ảnh sang đầu ra có cấu trúc (như JSON / Markdown), làm mờ ranh giới của OCR truyền thống.
  - Hỏi đáp tài liệu và hiểu đa phương thức:
    - Thêm đầu tác vụ lên mô hình bố cục để thực hiện DocVQA;
    - Hoặc sử dụng trực tiếp mô hình đa phương thức lớn (VLM) để đọc ảnh tài liệu, hoàn thành hỏi đáp và tóm tắt ở tầng ngôn ngữ tự nhiên, đồng thời tận dụng ngầm năng lực OCR.

Nhìn tổng thể, OCR đã phát triển từ "nhận dạng ký tự đơn giản" ban đầu thành hệ thống hiểu tài liệu toàn diện bao gồm **văn bản + bố cục + cấu trúc + hỏi đáp**, là trụ cột then chốt cho số hóa doanh nghiệp, quản lý hồ sơ chính phủ và văn phòng thông minh. Dưới đây, chúng ta sẽ triển khai theo ba hướng: **phát hiện và nhận dạng văn bản**, **phân tích bố cục tài liệu và cấu trúc bảng**, **hỏi đáp tài liệu và DocVQA đa phương thức**.

### 2.8.1 Phát hiện và nhận dạng văn bản: từ pixel đến văn bản có thể sử dụng

Bước đầu tiên của OCR là **phát hiện văn bản**: tìm tất cả các vùng chứa chữ trong hình ảnh đầu vào. Văn bản trong cảnh đường phố/thực tế phải đối mặt với các thách thức như font chữ đa dạng, nghiêng/biến dạng, ánh sáng phức tạp, nền nhiễu nghiêm trọng; còn trong tình huống tài liệu thì nhấn mạnh hỗ trợ mạnh mẽ với văn bản dày đặc và bố cục nhiều cột. Các phương pháp như EAST, DBNet chuyển bài toán phát hiện thành "phân đoạn cấp pixel + học cạnh", dự đoán xác suất văn bản và tham số hình học trên feature map, sau đó xử lý hậu kỳ để có được khung văn bản chính xác (có thể là hình chữ nhật ngang hoặc tứ giác/đa giác tùy ý), cân bằng độ chính xác và tốc độ.

**Nhận dạng văn bản** cắt từng vùng văn bản đã phát hiện và chuyển đổi thành chuỗi ký tự. Phương pháp kinh điển lấy CRNN làm đại diện: trước tiên dùng CNN trích xuất đặc trưng, sau đó dùng RNN hoặc Transformer để mô hình hóa chuỗi, cuối cùng dùng CTC hoặc giải mã chú ý để xuất chuỗi ký tự. Đối với văn bản có độ dài không cố định, chữ cong và ngôn ngữ phức tạp (hỗn hợp Hán-Anh, đa ngôn ngữ), mô hình nhận dạng cần đồng thời nỗ lực trong mô hình hóa đặc trưng thị giác và mô hình hóa ngôn ngữ ký tự. Các phương pháp như RARE, SAR đưa vào mạng biến đổi không gian (STN) hoặc cơ chế căn chỉnh chú ý để hiệu chỉnh biến dạng hình học, nâng cao khả năng thích ứng với bố cục phức tạp.

Trong hệ thống kỹ thuật, phát hiện và nhận dạng thường được tổ chức thành hai dịch vụ tách rời tạo thành một OCR pipeline: frontend phát hiện chia hình ảnh thành nhiều dòng/khối văn bản, backend nhận dạng thực hiện nhận dạng ký tự trên từng khối, và có thể thêm mô hình ngôn ngữ để hiệu chỉnh lỗi (như sửa chính tả, kiểm tra số/số tiền). Đối với các tình huống cụ thể như biển số xe, số đọc đồng hồ, còn sử dụng mô hình phát hiện/nhận dạng được fine-tune chuyên biệt, tận dụng prior của tình huống (font chữ cố định, bộ ký tự hữu hạn) để đổi lấy độ chính xác cao hơn và độ trễ thấp hơn.

### 2.8.2 Phân tích bố cục tài liệu và cấu trúc bảng: khôi phục "hình dạng của tài liệu"

Chỉ nhận dạng ra văn bản thôi là chưa đủ, đặc biệt trong các tình huống tài liệu dài, báo cáo, hợp đồng và chứng từ, **cấu trúc bố cục** thường quyết định ý nghĩa và tầm quan trọng của thông tin: quan hệ phân cấp giữa tiêu đề và nội dung, vị trí của biểu đồ và chú thích đi kèm, vai trò của đầu trang/chân trang, thứ tự logic của các đoạn văn trong và ngoài bảng, v.v. Mục tiêu của **Phân tích bố cục tài liệu (Document Layout Analysis)** là nhận dạng vai trò và ranh giới của các vùng khác nhau trên trang hai chiều, đồng thời khôi phục thứ tự đọc và cấu trúc phân cấp hợp lý.

Các mô hình như LayoutLM / LayoutLMv2/v3, DocFormer mã hóa chung nội dung (text embedding), vị trí không gian (tọa độ bounding box) và đặc trưng thị giác cục bộ (từ CNN/ViT) của mỗi token văn bản, mô hình hóa quan hệ ngữ nghĩa-không gian giữa các token thông qua Transformer. Bằng cách huấn luyện trên các bộ dữ liệu có chú thích bố cục, mô hình có thể học cách phân biệt nhiều loại vùng như "tiêu đề/đoạn văn/danh sách/bảng/chú thích hình/đầu trang chân trang" và đưa ra nhãn cùng phân cấp tương ứng trong đầu ra. Các mô hình này thường đóng vai trò "tầng trung gian", cung cấp khung tài liệu có cấu trúc cho hệ thống xem xét hợp đồng, phân tích báo cáo, nền tảng số hóa hồ sơ.

**Nhận dạng cấu trúc bảng (Table Structure Recognition)** là một nhánh đặc biệt quan trọng trong phân tích bố cục: không chỉ phát hiện vùng bảng, mà còn phân tích sâu hơn ranh giới hàng cột, tọa độ ô và ô gộp, cuối cùng tái tạo một bảng logic (thường biểu diễn dưới dạng HTML, bảng Markdown, hoặc JSON có cấu trúc với tọa độ). Các phương pháp triển khai bao gồm:

- Dựa trên quy tắc/thị giác: sử dụng phát hiện đường kẻ, mạng phân đoạn, phát hiện đối tượng, v.v. để trích xuất đường kẻ bảng và vùng ô, sau đó xây dựng đồ thị tô pô;
- Dựa trên Transformer: mã hóa các khối văn bản và thông tin hình học của vùng bảng thành chuỗi, trực tiếp dự đoán cấu trúc ô và quan hệ liên kết.

Về mặt sản phẩm, các năng lực này hỗ trợ các tình huống có giá trị cao như "chuyển đổi PDF sang Word/Excel", "nhập liệu có cấu trúc chứng từ/hóa đơn", "phân tích báo cáo và trích xuất chỉ số", là thành phần then chốt cho tự động hóa văn phòng doanh nghiệp/chính phủ.

### 2.8.3 Hỏi đáp tài liệu và DocVQA: từ "đọc tài liệu" đến "hỏi tài liệu"

Khi năng lực OCR và phân tích bố cục đủ mạnh, nhu cầu tự nhiên tiếp theo là: **không để người dùng tự lật xem tài liệu nữa, mà trực tiếp "hỏi tài liệu"**. Đây chính là **hỏi đáp tài liệu (DocVQA)**: mô hình trả lời câu hỏi trên các tài liệu phức tạp như hợp đồng, báo cáo, hóa đơn, hướng dẫn sử dụng, ví dụ như "Ngày có hiệu lực của hợp đồng này là khi nào?", "Lợi nhuận ròng Q4 năm 2023 trong trang báo cáo này là bao nhiêu?", "Tên bên mua trên hóa đơn là ai?".

Hệ thống DocVQA truyền thống thường được xây dựng theo cách "OCR + mô hình bố cục + đầu QA":

- Trước tiên dùng OCR trích xuất văn bản và tọa độ;
- Dùng LayoutLM / DocFormer, v.v. để mô hình hóa quan hệ ba phương thức văn bản–bố cục–thị giác;
- Cuối cùng thêm đầu tác vụ (phân loại / trích xuất / dự đoán span) lên biểu diễn này, định vị câu trả lời hoặc đoạn liên quan trong tài liệu dựa trên câu hỏi.

Với sự phát triển của các mô hình đa phương thức lớn, ngày càng nhiều hệ thống bắt đầu sử dụng trực tiếp "ảnh tài liệu + câu hỏi" làm đầu vào, để một VLM hoặc LLM đa phương thức trực tiếp tạo ra câu trả lời hoặc giải thích có trích dẫn. Trong kiến trúc này, OCR, bố cục, hiểu ngữ nghĩa và năng lực suy luận phối hợp với nhau theo cách đầu-cuối bên trong mô hình: mô hình vừa có thể nhìn thấy bố cục gốc và các gợi ý thị giác, vừa có thể tận dụng kiến thức thế giới ngôn ngữ và mẫu suy luận để hoàn thành trả lời các câu hỏi phức tạp.

Về hình thái sản phẩm, DocVQA thường xuất hiện dưới dạng "trợ lý xem xét hợp đồng", "hỏi đáp hóa đơn/báo cáo", "hỏi đáp thông minh tài liệu dài", giúp bạn nhanh chóng định vị thông tin quan trọng từ lượng lớn tài liệu, tự động tạo tóm tắt, so sánh điều khoản, v.v., giảm đáng kể gánh nặng xem xét thủ công và truy xuất thông tin.
## 2.9 Tạo Ảnh và Chỉnh Sửa Ảnh (Image Generation & Editing)

Các khả năng thị giác được giới thiệu trước đây phần lớn mang tính "phân biệt": nhận ảnh đầu vào, xuất ra nhãn, bounding box, mask hoặc văn bản; còn một hướng phát triển nhanh chóng trong những năm gần đây là **thị giác tạo sinh**: mô hình không chỉ hiểu ảnh mà còn **tạo ra hoặc chỉnh sửa ảnh**, sinh ra nội dung hình ảnh chất lượng cao với nhiều phong cách khác nhau dựa trên điều kiện văn bản hoặc ảnh cho trước. **Tạo ảnh và chỉnh sửa ảnh** chính là năng lực cốt lõi của hướng đi này, là nền tảng cho vô số sản phẩm từ nền tảng vẽ AIGC đến công cụ chỉnh ảnh thông minh và hiệu ứng đặc biệt.

Nhìn từ góc độ kinh doanh, thị giác tạo sinh đã chuyển từ "demo công nghệ" thành công cụ năng suất thực sự: designer dùng nó để phác thảo ý tưởng và hoàn thiện bản vẽ; đội ngũ marketing dùng nó để tạo hàng loạt poster và vật liệu quảng cáo; người dùng thông thường dùng nó để tạo avatar, minh họa, hình nền; nhà sáng tạo video dùng nó để tách nền, thay background và thêm hiệu ứng. Dưới đây chúng ta sẽ nhìn nhận lớp này từ ba góc độ: **tình huống sử dụng**, **nguyên lý** và **mô hình**, sau đó mở rộng chi tiết về text-to-image, image-to-image và khả năng chỉnh sửa trong các mục tiếp theo.

- **Tình huống sử dụng**
  - Text-to-Image: bạn nhập một đoạn mô tả ("thành phố ban đêm phong cách cyberpunk"), hệ thống tự động tạo ra nhiều ảnh phù hợp với mô tả đó, hỗ trợ chọn ảnh và chỉnh sửa lặp đi lặp lại.
  - Chuyển đổi phong cách và dịch ảnh: chuyển ảnh thực sang phong cách anime/phác thảo/sơn dầu/màu nước, hoặc ánh xạ giữa các miền khác nhau (ban ngày ↔ ban đêm, mùa hè ↔ mùa đông).
  - Vẽ lại có điều kiện và mở rộng khung hình: vẽ lại một vùng cụ thể trong ảnh gốc (Inpainting), mở rộng canvas ra ngoài khung hình (Outpainting), dùng để sửa khuyết điểm, xóa/thêm đối tượng, mở rộng bố cục.
  - Chỉnh sửa bằng văn bản: dùng câu lệnh ngôn ngữ tự nhiên để chỉnh sửa ảnh ("đổi bầu trời thành hoàng hôn", "biến chiếc xe này thành xe thể thao màu đỏ"), bạn không cần thành thạo phần mềm chỉnh sửa ảnh phức tạp.
- **Nguyên lý**
  Mô hình thị giác tạo sinh chủ yếu học "phân phối ảnh" và "kiểm soát có điều kiện" để thực hiện tạo sinh và chỉnh sửa:
  - Mô hình hóa phân phối: GAN, mô hình khuếch tán (Diffusion), Flow Matching, v.v. học phân phối chiều cao từ lượng lớn ảnh, cho phép mô hình dần dần "lấy mẫu" ra ảnh chân thực từ nhiễu ngẫu nhiên.
  - Tạo sinh có điều kiện: dựa trên mô hình hóa phân phối ảnh thuần túy, đưa thêm các điều kiện như văn bản/phác thảo/bản đồ phân đoạn/keypoint/bản đồ độ sâu, khiến quá trình tạo sinh bị ràng buộc bởi tín hiệu bên ngoài (Text‑to‑Image, Image‑to‑Image, ControlNet, v.v.).
  - Chỉnh sửa có kiểm soát: trong không gian tiềm ẩn của ảnh hiện có, dùng văn bản hoặc mask cục bộ để hướng dẫn và chỉnh sửa các đặc trưng cục bộ, thực hiện vẽ lại cục bộ, thay đổi phong cách, điều chỉnh bố cục, v.v.
- **Mô hình**
  Các mô hình tạo ảnh và chỉnh sửa ảnh chủ lưu hiện tại chủ yếu dựa trên **mô hình khuếch tán + kiểm soát có điều kiện**:
  - Dòng GAN: StyleGAN và các biến thể nổi bật trong điều khiển khuôn mặt độ phân giải cao và phong cách; nhưng training không ổn định, khó bao phủ phân phối đa phương thức phức tạp.
  - Mô hình khuếch tán: Stable Diffusion, Imagen, DALL·E series, v.v., lấy mẫu thông qua quá trình "thêm nhiễu chiều thuận + khử nhiễu chiều ngược", kết hợp cả chất lượng lẫn đa dạng, là hướng chủ đạo hiện nay của Text‑to‑Image.
  - Tạo sinh và chỉnh sửa có kiểm soát: ControlNet, T2I‑Adapter, v.v., chồng thêm kênh điều kiện (cạnh, tư thế, phân đoạn, v.v.) lên mô hình khuếch tán cơ sở để thực hiện kiểm soát chính xác; kết hợp Inpainting/Outpainting được hướng dẫn bằng văn bản để thực hiện chỉnh sửa cục bộ và mở rộng khung hình.
  - Flow Matching và thế hệ mô hình tạo sinh mới: biến đổi phân phối nhiễu thành phân phối ảnh thông qua học trường luồng liên tục, khám phá điểm cân bằng mới về hiệu quả, khả năng kiểm soát và độ ổn định.

Ở cấp độ sản phẩm, các công nghệ này đến với người dùng dưới dạng Jimeng, mô hình ảnh Alibaba Qwen, FLUX, OpenAI hoặc Gemini, hệ sinh thái Stable Diffusion, Photoshop Generative Fill, Canva AI, tính năng tách nền và hiệu ứng thông minh của CapCut, v.v., dần dần tiến hóa từ "đồ chơi" thành một mắt xích chính thức trong quy trình sản xuất nội dung. Dưới đây chúng ta sẽ mở rộng theo ba hướng: **Text-to-Image**, **Image-to-Image** và **chỉnh sửa ảnh bằng văn bản**.

### 2.9.1 Text‑to‑Image: Từ Một Câu Chữ Đến Một Bức Tranh

Nhiệm vụ cốt lõi của **Text‑to‑Image** là: cho trước một đoạn mô tả ngôn ngữ tự nhiên, tạo ra một bức ảnh khớp tối đa với ngữ nghĩa và phong cách của mô tả đó. Các mô hình Text‑to‑Image hiện đại chủ yếu dựa trên kiến trúc khuếch tán:

- Đầu tiên dùng bộ mã hóa văn bản (như CLIP Text Encoder hoặc T5/LLM) để mã hóa văn bản đầu vào thành vector điều kiện;
- Sau đó trong không gian tiềm ẩn của ảnh, bắt đầu từ trạng thái nhiễu cao, thực hiện lấy mẫu khử nhiễu ngược nhiều bước, ở mỗi bước đều dùng điều kiện văn bản để hướng dẫn hướng tạo sinh;
- Cuối cùng thu được ảnh độ phân giải cao phù hợp với mô tả, có thể phóng to hoặc xử lý thêm.

Các phương pháp như Stable Diffusion, Imagen, DALL·E series được training trên lượng lớn cặp ảnh–văn bản, giúp mô hình vừa nắm vững phổ thị giác (hình dạng, kết cấu, bố cục, ánh sáng), vừa đạt được khả năng căn chỉnh ngôn ngữ–thị giác nhất định (hiểu các mô tả phức tạp như "phong cách", "chất liệu", "bố cục"). Ở cấp độ sản phẩm, năng lực này cho phép "người không biết vẽ cũng có thể tạo ra tranh": bạn chỉ cần mô tả ý tưởng bằng ngôn ngữ tự nhiên, hệ thống sẽ đưa ra nhiều cách thể hiện hình ảnh, hỗ trợ thử nghiệm và tinh chỉnh lặp đi lặp lại.

Các mô hình Text‑to‑Image thường hỗ trợ đầu ra đa phong cách và đa độ phân giải: bằng cách thêm style token, điều kiện kích thước, v.v. trong lúc training hoặc inference, cho phép cùng một mô hình chuyển đổi giữa các phong cách khác nhau như "ảnh thực tế, minh họa flat, render 3D". Các kỹ thuật thường dùng trong kỹ thuật bao gồm:

- Prompt Engineering để tinh chỉnh và ổn định phong cách đầu ra;
- Các kỹ thuật fine-tuning nhẹ như LoRA / DreamBooth, nhanh chóng thích ứng mô hình tổng quát với nhân vật, IP hoặc phong cách thương hiệu cụ thể.

### 2.9.2 Image‑to‑Image: Dịch Ảnh, Chuyển Phong Cách và Vẽ Lại Cục Bộ

Nhiệm vụ **Image‑to‑Image** dựa trên ảnh đầu vào cho trước, tạo ra một phiên bản ảnh khác "bị ràng buộc bởi ảnh đó": vừa giữ lại cấu trúc hoặc nội dung tổng thể của ảnh gốc, vừa thực hiện một số chuyển đổi hoặc cải tiến nhất định. Các dạng điển hình bao gồm:

- Dịch ảnh / Chuyển phong cách: ánh xạ giữa các miền thị giác khác nhau, như "ảnh → anime", "mùa hè → mùa đông", "ban ngày → ban đêm", "phác thảo → ảnh màu". Trước đây chủ yếu dựa trên GAN (CycleGAN, Pix2Pix, v.v.), hiện nay cũng có thể dùng mô hình khuếch tán với kiểm soát có điều kiện để thực hiện.
- Tạo sinh có điều kiện: dùng phác thảo, bản đồ phân đoạn, bản đồ độ sâu, bản đồ cạnh, v.v. làm điều kiện, hướng dẫn quá trình khuếch tán thông qua các module như ControlNet, T2I‑Adapter, giúp ảnh tạo ra tuân thủ nghiêm ngặt điều kiện hình học/bố cục, đồng thời tự do sáng tạo về kết cấu, ánh sáng và phong cách.
- Inpainting / Outpainting: khoanh vùng một khu vực trên ảnh gốc, coi đó là phần cần vẽ lại (inpainting), hoặc mở rộng tạo nội dung mới ra ngoài khung hình (outpainting), thực hiện các thao tác "lấp chỗ trống", "mở rộng ảnh".

Chìa khóa của những nhiệm vụ này là **tạo ra nội dung mới trong khi giữ nguyên các ràng buộc**. Mô hình khuếch tán nổi bật trong lĩnh vực này: trong inpainting, mô hình chỉ lấy mẫu vùng mask, giữ nguyên ảnh gốc ở các vùng không bị che, thông qua hiểu ngữ nghĩa và thông tin ngữ cảnh để nội dung mới hòa hợp tự nhiên với vùng xung quanh về phong cách và ánh sáng. Đối với chuyển phong cách, mô hình giữ lại cấu trúc đầu vào trong khi lấy mẫu kết cấu và màu sắc từ phân phối phong cách mục tiêu, thực hiện "thay áo không thay xương".

Trong các sản phẩm, khả năng Image‑to‑Image hỗ trợ vô số công cụ sáng tạo: bộ lọc phong cách, chuyển thành manga, thay bầu trời một chạm, làm đẹp tự động, phục chế ảnh cũ, chỉnh sửa cục bộ, v.v., thường được trình bày cho người dùng qua giao diện trực quan.

### 2.9.3 Chỉnh Sửa Ảnh Bằng Văn Bản: Ngôn Ngữ Tự Nhiên Làm "Cọ Vẽ"

Trong phần mềm chỉnh sửa ảnh truyền thống, bạn cần nắm vững cả bộ khái niệm chuyên nghiệp như layer, mask, selection, filter; còn **chỉnh sửa ảnh bằng văn bản (Text‑guided Editing)** cố gắng dùng ngôn ngữ tự nhiên thay thế hầu hết các thao tác chuyên nghiệp đó:

- "Đổi background thành đường chân trời thành phố ban đêm";
- "Cho người này mặc bộ vest đen";
- "Biến chiếc xe này thành xe thể thao màu xanh, thêm hiệu ứng motion blur".

Về mặt kỹ thuật, chỉnh sửa bằng văn bản thường được xây dựng trên mô hình khuếch tán Text‑to‑Image, thực hiện thông qua một số cách:

- Tìm kiếm hoặc lấy mẫu trong không gian tiềm ẩn gần ảnh gốc, giữ cho ảnh sau chỉnh sửa có độ tương đồng cao với ảnh gốc, chỉ thay đổi ở các vùng cục bộ bị ảnh hưởng bởi văn bản;
- Dùng mask tường minh (bạn khoanh vùng), giới hạn phạm vi chỉnh sửa trong khu vực cụ thể (đây chính là tính năng "chọn vùng rồi nhập lệnh văn bản" trong nhiều công cụ);
- Đưa thêm module "kiểm soát bằng lệnh" (như ControlNet, control token có thể học), tăng cường khả năng kiểm soát và ổn định của mô hình đối với yêu cầu chỉnh sửa.

Các sản phẩm như Jimeng, FLUX, mô hình ảnh Alibaba Qwen, hệ sinh thái Stable Diffusion, Canva AI, v.v. đều cung cấp năng lực tương tự: bạn chỉ cần văn bản đơn giản và ít thao tác là có thể hoàn thành các chỉnh sửa phức tạp. Với người dùng chuyên nghiệp, đây trở thành "trợ lý thông minh" giúp tăng tốc quy trình sáng tạo; với người dùng thông thường, điều này hạ thấp đáng kể ngưỡng gia nhập của việc chỉnh sửa ảnh.
## 2.10 Đánh Giá Chất Lượng Hình Ảnh（Image Quality Assessment, IQA）

Trong các tác vụ như tăng cường thị giác cấp thấp, mã hóa nén, tạo và chỉnh sửa hình ảnh, chúng ta thường phải trả lời một câu hỏi tưởng chừng mang tính chủ quan: **"Bức ảnh này trông có đẹp không?"**. Kiểm tra thủ công rõ ràng không thể mở rộng quy mô, còn các chỉ số truyền thống như PSNR lại thường không nhất quán với cảm nhận chủ quan của mắt người. Mục tiêu của **Đánh Giá Chất Lượng Hình Ảnh（Image Quality Assessment, IQA）** là xây dựng một cơ chế tự động để chấm điểm hoặc xếp hạng chất lượng chủ quan/khách quan của hình ảnh, trở thành mắt xích quan trọng kết nối "đầu ra của thuật toán cấp thấp" với "trải nghiệm thực tế của người dùng".

Nhìn từ góc độ hệ thống, IQA đóng vai trò "người gác cổng" và "tham chiếu điều chỉnh tham số" trong nhiều pipeline: các nền tảng thương mại điện tử/nội dung dùng nó để lọc ảnh tải lên bị mờ, nhiễu nhiều hay nén quá mức; camera/album ảnh trên điện thoại dùng nó để chọn ra "bức ảnh đẹp nhất" trong chụp liên tiếp; các dịch vụ tăng cường và nén trên đám mây dùng nó để đánh giá so sánh trước-sau, từ đó định hướng cải tiến mô hình. Dưới đây là tổng quan IQA theo ba chiều **tình huống**, **nguyên lý** và **mô hình**, và các phần tiếp theo sẽ mở rộng về loại đánh giá, chỉ số và paradigm học.

- **Tình huống**
  - Kiểm tra chất lượng khi tải lên: Chấm điểm chất lượng ảnh/video do người dùng tải lên, lọc nội dung bị mờ nghiêm trọng, phơi sáng bất thường, nhiễu rõ ràng hoặc nén quá mức.
  - Chọn ảnh thông minh và loại trùng lặp: Trong album ảnh và ứng dụng camera trên điện thoại, chọn phiên bản có độ sắc nét, biểu cảm và bố cục tốt hơn từ nhiều ảnh tương tự, đồng thời nhận diện ảnh kém chất lượng hoặc dư thừa để dọn dẹp.
  - Đánh giá thuật toán tăng cường/nén: Trong các thử nghiệm A/B về thuật toán tăng cường hình ảnh, khử nhiễu, siêu phân giải, mã hóa/giải mã,... dùng chỉ số IQA để đo khách quan "chiến lược nào tốt hơn", hỗ trợ tìm kiếm tham số và lựa chọn mô hình.
  - Tự động chọn poster/thumbnail: Tự động chọn khung có chất lượng thị giác và sức hút cao hơn từ video hoặc bộ sưu tập ảnh để làm ảnh bìa hoặc ứng viên poster.
- **Nguyên lý**
  Cốt lõi của IQA là mô tả chất lượng hình ảnh theo hai chiều: **mức độ méo so với ảnh tham chiếu** và **cảm nhận chủ quan của mắt người**:
  - FR‑IQA (Full-Reference IQA): Với điều kiện có ảnh tham chiếu chất lượng cao, so sánh ảnh cần đánh giá với ảnh tham chiếu theo từng pixel hoặc theo đặc trưng, đo mức độ méo, dùng trong nghiên cứu phát triển thuật toán và đánh giá thực nghiệm.
  - NR‑IQA (No-Reference IQA / Blind IQA): Phổ biến hơn trong thực tế, không có ảnh tham chiếu, chỉ có thể suy ra chất lượng từ đặc trưng thống kê hoặc đặc trưng sâu của một ảnh đơn lẻ; mô hình cần học từ lượng lớn hình ảnh cùng điểm đánh giá chủ quan để hiểu "mắt người thích loại ảnh nào".
  - Pseudo-Reference / Downsampled-Reference: Trong một số tình huống, có thể dùng phiên bản độ phân giải thấp trước khi nén, "ảnh lý tưởng" được dự đoán bởi mô hình,... làm tham chiếu xấp xỉ, cân bằng giữa tính khả thi và độ chính xác đánh giá.
- **Mô hình**
  Mô hình IQA chia thành hai nhóm lớn: **chỉ số đặc trưng thủ công truyền thống** và **dự đoán chất lượng theo phong cách học sâu**:
  - Chỉ số truyền thống:
    - FR‑IQA: PSNR, SSIM, MS‑SSIM, FSIM,... tập trung vào thông tin cấu trúc, độ tương phản và pha, nhạy hơn với các suy giảm đơn giản (như thêm nhiễu, làm mờ).
    - Chỉ số cảm nhận: LPIPS, DISTS,... đo sự khác biệt cảm nhận giữa các hình ảnh trong không gian đặc trưng sâu, có tương quan cao hơn với cảm nhận chủ quan của mắt người.
  - NR‑IQA / học có giám sát:
    - Phương pháp sớm: BRISQUE, NIQE, BLIINDS,... dựa trên thống kê cảnh tự nhiên (NSS) và đặc trưng thủ công, huấn luyện mô hình nông để dự đoán điểm chất lượng.
    - NR‑IQA sâu: RankIQA, DBCNN, HyperIQA, MUSIQ,... trực tiếp dùng CNN/ViT trích xuất đặc trưng từ hình ảnh, huấn luyện có giám sát trên dữ liệu MOS（Mean Opinion Score，điểm đánh giá chủ quan trung bình）, để điểm chất lượng đầu ra khớp tối đa với đánh giá của mắt người.
    - Biểu diễn tiền huấn luyện: Dùng đặc trưng từ các mô hình lớn như CLIP, ViT làm đầu vào hoặc backbone cho mạng dự đoán chất lượng, fine-tune trên dữ liệu MOS hạn chế để cải thiện khả năng tổng quát hóa với các loại méo phức tạp.

Nhìn tổng thể, IQA không phải là một chỉ số đơn nhất kiểu "càng cao càng tốt", mà là một hệ thống đánh giá gắn với mục tiêu nghiệp vụ cụ thể: trong một số tình huống (như tăng cường ảnh giám sát), việc bảo toàn chi tiết và khả năng nhận diện quan trọng hơn tính tự nhiên thị giác; trên các nền tảng sáng tạo nội dung, cảm nhận chủ quan và tiêu chuẩn thẩm mỹ lại chiếm ưu thế. Do đó, cách làm phổ biến trong công nghiệp là: dựa trên mô hình IQA đa dụng, fine-tune bằng một lượng nhỏ dữ liệu nghiệp vụ hoặc học trọng số có chọn lọc, xây dựng bộ đánh giá chất lượng "nhận thức tác vụ".

### 2.10.1 Phân Loại Đánh Giá: Có Tham Chiếu, Không Tham Chiếu và Tham Chiếu Xấp Xỉ

Tùy theo việc có hay không có ảnh tham chiếu chất lượng cao, IQA chia thành ba loại: **FR‑IQA (Full-Reference)**, **NR‑IQA (No-Reference)** và **Pseudo-Reference**.

Trong **FR‑IQA**, chúng ta giả định tồn tại một ảnh tham chiếu lý tưởng chất lượng cao, và ảnh cần đánh giá là phiên bản suy giảm của nó sau khi nén, truyền tải hoặc xử lý. Mô hình so sánh hai ảnh theo từng pixel hoặc theo mức đặc trưng để lượng hóa mức độ méo. PSNR là phép đo đơn giản nhất (dựa trên sai số bình phương trung bình), SSIM/MS‑SSIM/FSIM,... xem xét thêm nhiều chiều như độ sáng, độ tương phản, cấu trúc, pha, tiệm cận hơn với cảm nhận của mắt người ở mức độ nhất định. Các chỉ số này rất phù hợp để đánh giá các phương pháp mã hóa/giải mã, siêu phân giải, khử nhiễu,... trong giai đoạn phát triển thuật toán, nhưng trong nghiệp vụ thực tế thường thiếu ảnh tham chiếu nên phạm vi ứng dụng hạn chế.

**NR‑IQA (Blind IQA)** là thiết lập phổ biến hơn trong các hệ thống thực tế: chỉ có ảnh cần đánh giá, không có bất kỳ tham chiếu nào. Các phương pháp NR‑IQA sớm (như BRISQUE, NIQE, BLIINDS,...) chủ yếu dựa trên thống kê cảnh tự nhiên: giả định hình ảnh tự nhiên chất lượng cao có phân phối thống kê ổn định ở một số đặc trưng, suy giảm sẽ gây ra thay đổi đặc trưng thống kê, từ đó có thể huấn luyện mô hình dự đoán điểm chất lượng dựa trên các đặc trưng này. Trong kỷ nguyên học sâu, mô hình NR‑IQA thường trực tiếp dùng CNN/ViT trích xuất đặc trưng rồi hồi quy điểm chất lượng hoặc học quan hệ xếp hạng trên tập dữ liệu có điểm đánh giá chủ quan của mắt người (MOS), cho phép bao phủ nhiều loại méo như nhiễu, mờ, nén, phơi sáng bất thường,...

**Pseudo-Reference / Downsampled-Reference IQA** nằm ở giữa hai loại trên: khi không có tham chiếu chất lượng cao thực sự, dùng một phiên bản xấp xỉ có thể lấy được (như ảnh độ phân giải thấp trước khi nén, "ảnh sạch" do mô hình dự đoán,...) làm tham chiếu để ước tính mức độ suy giảm. Cách này phổ biến trong giám sát chất lượng video trực tuyến và tối ưu hóa mã hóa, cân bằng giữa chi phí và độ chính xác đánh giá.

### 2.10.2 Chỉ Số và Paradigm Học: Từ PSNR đến Dự Đoán Chất Lượng Cảm Nhận

Ở cấp độ triển khai cụ thể, IQA sử dụng nhiều chỉ số và paradigm học để tiệm cận cảm nhận chủ quan của mắt người.

**Về chỉ số truyền thống**:

- PSNR dựa trực tiếp trên sai số cấp pixel, đơn giản và hiệu quả, nhưng cũng phạt nặng các thay đổi không nhạy với mắt người (như dịch chuyển nhẹ, lọc giữ cấu trúc);
- SSIM, MS‑SSIM, FSIM,... mô hình hóa độ tương đồng hình ảnh theo nhiều chiều như độ sáng, độ tương phản, cấu trúc, pha, nhạy hơn với méo cấu trúc và phản ánh ở mức độ nhất định sở thích của mắt người đối với thông tin cấu trúc.

**Về chỉ số cảm nhận**: LPIPS, DISTS,... tính toán sự khác biệt vector ở các lớp đặc trưng bên trong mạng sâu tiền huấn luyện (VGG, AlexNet, ViT,...), có trọng số theo tầm quan trọng của từng lớp, thu được một loại "khoảng cách trong không gian đặc trưng" có tương quan cao hơn với độ tương đồng cảm nhận chủ quan. Chúng đặc biệt phù hợp làm mục tiêu huấn luyện hoặc chỉ số đánh giá cho các tác vụ sinh (siêu phân giải, tạo sinh, chỉnh sửa), dùng để đo "trông có giống không".

**Về dự đoán chất lượng có học**: Các mô hình NR‑IQA sâu (như RankIQA, DBCNN, HyperIQA, MUSIQ,...) trực tiếp chấm điểm hoặc xếp hạng hình ảnh:

- Trong dữ liệu huấn luyện, mỗi hình ảnh đi kèm một tập điểm đánh giá chủ quan (MOS), mô hình dùng đây làm giám sát để huấn luyện mạng hồi quy chất lượng hoặc xếp hạng;
- Về kiến trúc mô hình, phần lớn dùng CNN/ViT + global pooling + MLP đầu ra điểm chất lượng, hoặc đầu ra một phân phối chất lượng rồi lấy kỳ vọng;
- Một số phương pháp còn dùng contrastive learning hoặc ranking learning (pairwise ranking), giúp mô hình tập trung hơn vào quan hệ "tương đối tốt/xấu" thay vì điểm tuyệt đối.

Với sự phổ biến của các mô hình thị giác tiền huấn luyện quy mô lớn, ngày càng nhiều phương pháp IQA áp dụng paradigm "Pretrained Backbone + lightweight head": tận dụng biểu diễn thị giác phong phú của CLIP, ViT,... fine-tune trên ít dữ liệu MOS hơn, từ đó duy trì khả năng tổng quát hóa tốt qua các loại méo và tình huống khác nhau.

Trong triển khai kỹ thuật, thường kết hợp nhiều chỉ số trên: ví dụ chỉ số FR‑IQA dùng đánh giá cải tiến thuật toán trong giai đoạn thực nghiệm; mô hình NR‑IQA sâu dùng kiểm tra chất lượng thời gian thực trên môi trường production; chỉ số cảm nhận dùng tối ưu hóa nội bộ các tác vụ sinh. Thông qua thử nghiệm A/B để căn chỉnh các chỉ số tự động này với dữ liệu người dùng thực (tỷ lệ click, tỷ lệ xem hết, tỷ lệ khiếu nại,...), dần dần xây dựng "hệ thống đo lường chất lượng cảm nhận" có liên quan cao đến mục tiêu nghiệp vụ.

# 3. Mô Thức 3D / Không Gian（3D / Spatial / XR）

Khi ứng dụng mở rộng từ "hình ảnh/video phẳng 2D" sang các tình huống như tự lái xe, robot, AR/VR/XR,... hệ thống không còn thỏa mãn với việc chỉ "nhìn pixel 2D", mà cần hiểu **cấu trúc ba chiều, tỷ lệ và quan hệ vị trí/tư thế trong thế giới thực**. Các tác vụ này được gọi chung là mô thức 3D / không gian: bao gồm cả mô hình hóa chính xác về hình học và tô-pô, lẫn hiểu ngữ nghĩa, định vị điều hướng và tạo nội dung trong không gian 3D. Một đầu kết nối các loại cảm biến như LiDAR, RGB‑D, IMU,...; đầu còn lại kết nối các module nhận thức tự lái, hệ thống điều hướng robot, mô hình môi trường ARKit/ARCore, ứng dụng quét dựng mô hình 3D trên điện thoại và các nền tảng digital twin,...
## 3.1 Nhận Thức và Tái Tạo 3D (3D Perception & Reconstruction)

Trong thị giác 2D, chúng ta chỉ thấy "thế giới sau khi được chụp thành ảnh"; còn trong các tình huống như xe tự lái, robot, AR/VR, điều quan trọng hơn là: **vị trí, hình dạng và cấu trúc của thế giới thực trong không gian 3D**. Nhận thức và tái tạo 3D nhằm mục đích khôi phục thông tin hình học ba chiều của môi trường từ nhiều loại cảm biến (camera, LiDAR, camera độ sâu, v.v.), biểu diễn dưới dạng point cloud, voxel, mesh, implicit field, v.v., cung cấp nền tảng cho hoạch định đường đi, mô phỏng vật lý, digital twin và sinh nội dung 3D.

Trong thực tiễn kỹ thuật, tầng này bao gồm nhiều hướng kỹ thuật từ **xử lý point cloud** đến **tái tạo hình học đa góc nhìn** đến **neural radiance field / neural field rendering**, tương ứng với các sản phẩm như module nhận thức 3D trong xe tự lái, mô hình hóa môi trường ARKit/ARCore, ứng dụng quét/dựng mô hình 3D trên điện thoại, và nền tảng dựng mô hình digital twin thành phố/khu công nghiệp. Dưới đây sẽ trình bày từ ba góc độ **tình huống**, **nguyên lý**, **mô hình**, đồng thời phân chia thêm một số hướng con quan trọng.

- **Tình huống**
  - Xe tự lái và hỗ trợ lái xe: Nhận thức cấu trúc 3D của xe cộ, người đi bộ, lề đường, vạch kẻ đường, cơ sở hạ tầng giao thông từ point cloud LiDAR và hình ảnh đa camera trên xe, phục vụ hoạch định đường đi và quyết định an toàn.
  - Quét môi trường trong nhà/ngoài trời: Sử dụng điện thoại/máy tính bảng (structured light / ToF / stereo) hoặc máy quét cầm tay thu thập dữ liệu đa góc nhìn, xây dựng mô hình 3D của phòng, tòa nhà, khu phố theo thời gian thực, dùng cho dựng mô hình AR, thiết kế nội thất, digital twin.
  - Digital Twin và BIM: Tái tạo nhà máy, khu công nghiệp, thành phố thực tế thành mô hình 3D độ chính xác cao qua hình ảnh đa góc nhìn và point cloud, phục vụ quản lý vận hành, mô phỏng và trực quan hóa.
  - Quét 3D tiêu dùng: App quét 3D trên điện thoại, công cụ "chụp ảnh ra mô hình 3D" một chạm, cung cấp hình học thô cho in 3D, thử đồ ảo, sản xuất tài sản game/phim.
- **Nguyên lý**
  - Xử lý point cloud: Coi tập hợp các điểm thưa/dày thu được từ LiDAR hoặc tái tạo đa góc nhìn là tập điểm mẫu 3D, thực hiện lọc, căn chỉnh, giảm mẫu và học đặc trưng, sau đó phân loại, phân đoạn ngữ nghĩa/thực thể hoặc phát hiện đối tượng 3D.
  - Hình học đa góc nhìn và tái tạo 3D: Ước tính tư thế camera và point cloud 3D thưa giữa nhiều ảnh qua SfM (Structure‑from‑Motion), sau đó tạo point cloud dày qua MVS (Multi‑View Stereo), tiếp theo tái tạo mesh và dán texture.
  - Neural radiance field / neural implicit field: Sử dụng các phương pháp NeRF, Instant‑NGP, Gaussian Splatting, v.v., biểu diễn cảnh 3D dưới dạng trường mật độ thể tích/màu sắc liên tục hoặc tập hợp Gaussian particles, sinh ảnh qua volume rendering hoặc rasterization, học từ giám sát đa góc nhìn; sau khi huấn luyện có thể thực hiện novel view synthesis và trích xuất hình học.
- **Mô hình**
  - Mạng point cloud: PointNet / PointNet++, PointCNN, DGCNN, MinkowskiNet, v.v. học đặc trưng trực tiếp trên điểm hoặc sparse voxel, dùng cho phân loại, phân đoạn và phát hiện 3D. Trong xe tự lái thường dùng các framework phát hiện 3D như VoxelNet, SECOND, CenterPoint, chuyển đổi point cloud sang voxel hoặc đặc trưng BEV (bird's eye view) để phát hiện.
  - Chuỗi công cụ tái tạo hình học: Các hệ thống SfM/MVS truyền thống như COLMAP, OpenMVG / OpenMVS, có thể khôi phục tư thế camera và point cloud dày từ ảnh đa góc nhìn, xây dựng Mesh chất lượng cao.
  - Tái tạo và rendering neural field: NeRF / Instant‑NGP, Gaussian Splatting và nhiều mô hình cải tiến, mã hóa cảnh trong mạng neural hoặc Gaussian cloud, thực hiện novel view synthesis độ trung thực cao và tái tạo cảnh 3D, dần hình thành sản phẩm kỹ thuật hóa. Trong ngành cũng xuất hiện các dịch vụ 3D AI như "Hunyuan 3D", "Tripo" hướng đến nhà phát triển và sản xuất nội dung, đóng gói công nghệ NeRF/Gaussian thành cloud API hoặc công cụ tương tác.

Bắt đầu từ tầng này, hình học truyền thống và deep learning, implicit representation và explicit mesh đan xen chặt chẽ, vừa phải giải quyết vấn đề "làm thế nào để tái tạo chính xác thế giới thực", vừa phải cân nhắc tính thời gian thực và khả năng dùng được, phục vụ tầng cao hơn là hiểu cảnh 3D, sinh và chỉnh sửa 3D.

### 3.1.1 Xử Lý Point Cloud và Phát Hiện Đối Tượng 3D

Đối với xe tự lái, robot và đo đạc độ chính xác cao, LiDAR point cloud là một trong những thông tin cảm biến 3D quan trọng nhất. Point cloud là tập hợp điểm thưa gồm tọa độ 3D (đôi khi kèm cường độ phản xạ, timestamp, v.v.), không có cấu trúc lưới đều đặn, đặt ra thách thức cho tích chập truyền thống. Mục tiêu xử lý point cloud là trích xuất thông tin hình học và ngữ nghĩa hữu ích từ các điểm phi cấu trúc này, ví dụ như "đây là một chiếc xe", "đây là lề đường/mặt đất", "đây là một tòa nhà".

Trong bài toán **phân loại và phân đoạn point cloud**, chúng ta thường quan tâm đến: một điểm (hoặc cụm điểm) thuộc loại cấu trúc nào, như xe, người đi bộ, mặt đất, lề đường, tòa nhà, cây cối, v.v., hoặc thực hiện phân đoạn ngữ nghĩa/thực thể cho cảnh. Từ góc độ phương pháp mô hình hóa, có thể chia thành ba loại:

1. Mạng point cloud trực tiếp: PointNet / PointNet++, PointCNN, DGCNN, v.v. định nghĩa các phép tính "không nhạy cảm với thứ tự sắp xếp của tập điểm" trực tiếp trên tập điểm, xây dựng đặc trưng phân cấp qua tổng hợp vùng lân cận cục bộ, phù hợp với phân loại và phân đoạn point cloud quy mô vừa và nhỏ.
2. Voxel và sparse convolution: Rasterize point cloud thành 3D voxel, sau đó dùng sparse 3D CNN (như VoxelNet, MinkowskiNet) để tích chập, cân bằng giữa tính cấu trúc đều đặn và độ thưa không gian, ứng dụng rộng rãi trong phát hiện 3D cho xe tự lái.
3. Chiếu và đa góc nhìn: Chiếu point cloud sang BEV (bird's eye view), depth map góc nhìn trước hoặc các góc nhìn đa chiều, sau đó dùng 2D CNN trích xuất đặc trưng, tương đối dễ kết hợp với các mạng phát hiện 2D trưởng thành.

Trong **phát hiện đối tượng 3D**, mục tiêu không chỉ đơn giản là gán nhãn cho điểm, mà là dự đoán bounding box 3D (vị trí, kích thước, hướng) và loại của chúng, đây là lõi của nhận thức môi trường trong xe tự lái. Các phương pháp điển hình như VoxelNet, SECOND, PointPillars và CenterPoint, v.v., thường chuyển đổi point cloud sang biểu diễn voxel hoặc dạng cột, thực hiện hồi quy phát hiện trên BEV hoặc không gian 3D. Các phương pháp như CenterPoint thông qua paradigm "phát hiện điểm trung tâm", trực tiếp phát hiện tâm đối tượng cùng kích thước/hướng trên BEV, cân bằng cả độ chính xác lẫn tốc độ. Cùng với sự phát triển của deep learning và phần cứng cảm biến, phát hiện 3D đã có thể thực hiện suy luận thời gian thực trên chip cấp automotive, trở thành một trong những module cơ bản của perception stack trong xe tự lái.

### 3.1.2 Hình Học Đa Góc Nhìn và Tái Tạo 3D: Từ Ảnh Đến Mesh

Nếu không có LiDAR, liệu có thể "hiểu" được 3D không? Câu trả lời là có — hình học đa góc nhìn và tái tạo 3D dựa vào "nhiều ảnh chụp + chuyển động camera". Bằng cách chụp cùng một cảnh từ các góc nhìn khác nhau, chúng ta có thể sử dụng ràng buộc hình học để khôi phục tư thế camera và cấu trúc không gian, đây chính là pipeline SfM/MVS kinh điển.

**SfM (Structure‑from‑Motion)** chủ yếu giải quyết hai vấn đề:

1. Từ nhiều ảnh ghép đôi hoặc đa góc nhìn, ước tính extrinsics (vị trí và hướng) của từng ảnh;
2. Khôi phục một tập hợp điểm đặc trưng 3D thưa trong hệ tọa độ thống nhất.

Các công cụ điển hình như COLMAP, OpenMVG, thông qua trích xuất và khớp đặc trưng (SIFT/ORB, v.v.), Bundle Adjustment (BA) tăng dần hoặc toàn cục, có thể tự động khôi phục point cloud thưa và tư thế camera từ tập ảnh không cần hiệu chỉnh.
Trên cơ sở đó, **MVS (Multi‑View Stereo)** sẽ sử dụng tính nhất quán quang trắc đa góc nhìn để tạo point cloud dày: ước tính độ sâu cho từng pixel/tia nhìn, dần dần lấp đầy chi tiết hình học của cảnh.

Sau khi có point cloud dày, bước tiếp theo là **tái tạo Mesh (Mesh Reconstruction)**:

- Thông qua Poisson Surface Reconstruction, Marching Cubes hoặc các phương pháp dựa trên học máy, "bọc" các điểm rải rác thành bề mặt liên tục, tạo thành Mesh có cấu trúc topo.
- Thường sẽ tiếp tục thực hiện lấp lỗ hổng, làm mượt, tối ưu biên, và Texture Mapping, thu được mô hình 3D có thể trực tiếp dùng để render và chỉnh sửa.

Về mặt hình thức sản phẩm, toàn bộ pipeline này đã được đưa xuống dưới dạng phần mềm desktop, dịch vụ đám mây và SDK. Ví dụ: ứng dụng quét 3D trên điện thoại sẽ gọi quy trình tương tự SfM/MVS ở backend, sau khi bạn "đi vòng quanh chụp ảnh" hoặc "quét một vòng video" sẽ tự động xuất ra mô hình mesh có thể import vào game engine; các nền tảng digital twin thì ở quy mô thành phố/khu công nghiệp, dùng ảnh chụp từ máy bay + dữ liệu street view để chạy tái tạo quy mô lớn, tạo ra cảnh 3D có thể tương tác.

### 3.1.3 Neural Radiance Field và Volume Rendering: NeRF, Gaussian và Thế Hệ Tái Tạo 3D Mới

SfM/MVS/tái tạo mesh truyền thống có thể thu được hình học hiển thị có cấu trúc tốt, nhưng vẫn có hạn chế về chất lượng render, tính liên tục góc nhìn và khả năng thể hiện chi tiết; còn neural radiance field (NeRF) và các công trình tiếp theo đã định nghĩa lại tái tạo 3D và novel view synthesis theo cách **implicit field + volume rendering**.

Trong NeRF, toàn bộ cảnh 3D được mô hình hóa như một hàm liên tục:

![](https://ecn00p15ubf1.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjYyZTc5MWFhY2QxM2FjNTI1MDFhNDM5NTEwNTBkNGFfM3RvSngwZnhwc1hMRFQxaXVXMkFNem5RSFFqUkppdkdfVG9rZW46TVltUGJUUWRib1NGV2V4dklHZ2NYandjbkJlXzE3NjcxMDU4ODM6MTc2NzEwOTQ4M19WNA)

Cho trước vị trí điểm x trong không gian 3D và hướng quan sát d, mạng sẽ xuất mật độ thể tích σ và màu sắc c tương ứng tại điểm đó. Thực hiện tích phân volume rendering theo hàm ánh xạ này dọc theo hướng tia nhìn của camera, chúng ta thu được màu pixel tại tư thế camera đó; ngược lại, chỉ cần cho trước một tập ảnh đa góc nhìn cùng tham số camera, chúng ta có thể tìm ra tham số mô hình θ bằng cách tối thiểu hóa sai số giữa kết quả render và ảnh thực. Sau khi mô hình hoàn tất huấn luyện, chỉ cần thay đổi tư thế camera là có thể tổng hợp các ảnh góc nhìn mới "chưa từng được chụp thực" (Novel View Synthesis).

NeRF truyền thống có tốc độ huấn luyện và render khá chậm, các phương pháp tiếp theo như **Instant‑NGP** thông qua mã hóa hash grid đa độ phân giải, v.v., đã tăng tốc đáng kể quá trình hội tụ và suy luận; **Gaussian Splatting** thay thế biểu diễn cảnh bằng 3D Gaussian particles, thông qua chiến lược rasterization hiệu quả, đạt được novel view rendering chất lượng cao theo thời gian thực. Đồng thời, nhiều công trình còn mở rộng NeRF/Gaussian với các tính năng có thể chỉnh sửa, đa phương thức, có thể kết hợp, dần chuyển từ prototype nghiên cứu sang hệ thống kỹ thuật.

Về mặt sản phẩm hóa, công nghệ NeRF/Gaussian đã được tích hợp vào nhiều sản phẩm 3D AI:

- Công cụ "video đa góc nhìn → cảnh 3D" trên điện thoại/PC, lớp nền thường dựa trên neural field hoặc Gaussian particles để hoàn thành tái tạo và render;
- Trong pipeline tài sản game/phim, sử dụng neural field để chụp cảnh nhanh và phục hồi ánh sáng, sau đó xuất ra Mesh + texture cho các công cụ DCC truyền thống;
- Các dịch vụ 3D AI từ các nhà cung cấp đám mây và nền tảng nội dung lớn, như "Hunyuan 3D" của Tencent, Tripo, v.v., thường hỗ trợ "ảnh đa góc nhìn/video ngắn → mô hình/cảnh 3D có thể chỉnh sửa", bên trong kết hợp neural radiance field, biểu diễn SDF/Gaussian và tái tạo hiển thị tiếp theo, đóng gói kết quả 3D chất lượng cao thành API thân thiện với nhà phát triển hoặc sản phẩm tương tác.
## 3.2 Hiểu Cảnh 3D & Định Vị (3D Scene Understanding & SLAM)

Nếu nhận thức & tái tạo 3D trả lời câu hỏi "thế giới này trông như thế nào", thì hiểu cảnh 3D và định vị đi xa hơn để trả lời: "**Tôi đang ở đâu trong thế giới này? Những chỗ nào có thể đi qua, chỗ nào là chướng ngại vật?**" Đối với robot hút bụi, robot AGV, máy bay không người lái, AR navigation và hệ thống định vị trong nhà, khả năng tự định vị, tự xây bản đồ và tự lập kế hoạch di chuyển trong môi trường 3D là điều kiện tiên quyết để hoạt động.

Phần công việc này chủ yếu xoay quanh **hiểu ngữ nghĩa 3D** và **SLAM (Simultaneous Localization and Mapping)**: cái trước thực hiện phân đoạn ngữ nghĩa và nhận diện vùng có thể đi qua trong cảnh 3D đã tái tạo, cái sau sử dụng các cảm biến như visual/IMU/LiDAR để ước tính tư thế camera/robot và xây dựng bản đồ. Về mặt kỹ thuật, tầng này thường được nhúng vào khung xe robot, bộ điều khiển bay của máy bay không người lái hoặc AR engine trên thiết bị di động dưới dạng SDK hoặc module thuật toán.

- **Ứng dụng**
  - Robot gia dụng và dịch vụ: robot hút bụi, robot giao đồ ăn/tuần tra xây dựng bản đồ trong môi trường trong nhà, nhận biết loại phòng và chướng ngại vật, tự động lập kế hoạch đường vệ sinh hoặc tuần tra.
  - Kho vận và logistics: robot AGV/AMR tự điều hướng trong kho, nhận dạng kệ hàng, lối đi và khu vực cấm vào, thực hiện vận chuyển và kiểm kê.
  - Máy bay không người lái và robot ngoài trời: xây dựng bản đồ 3D trong môi trường ngoài trời, tránh các chướng ngại vật như tòa nhà, cây cối, đường dây điện, thực hiện nhiệm vụ tuần tra, đo vẽ và an ninh.
  - AR navigation và định vị trong nhà: điện thoại/kính AR sử dụng SLAM để lấy tư thế camera, hiển thị mũi tên điều hướng, thông tin phòng và POI chồng lên bản đồ ngữ nghĩa, thực hiện dẫn đường và điều hướng immersive.
- **Nguyên lý**
  - Phân đoạn ngữ nghĩa 3D và hiểu cảnh: thực hiện phân đoạn ngữ nghĩa trên biểu diễn point cloud hoặc voxel, phân biệt tường, sàn nhà, bàn ghế, kệ hàng, cửa sổ và các cấu trúc khác, đồng thời nhận dạng vùng có thể đi qua và chướng ngại vật, cung cấp thông tin ngữ nghĩa cho điều hướng và ra quyết định hành vi.
  - Ước tính tư thế và SLAM: thông qua Visual SLAM (monocular/stereo/RGB‑D) hoặc LiDAR‑SLAM, ước tính tư thế 6D của camera/robot từ dữ liệu cảm biến liên tục, xử lý phát hiện vòng lặp và tối ưu hóa bản đồ, kết hợp nhiều nguồn thông tin như IMU, encoder bánh xe, GNSS khi cần để tăng độ ổn định.
  - Xây dựng bản đồ và điều hướng: chồng thông tin hình học và ngữ nghĩa lên bản đồ cục bộ/toàn cục, tạo thành bản đồ 2D/3D/topology/ngữ nghĩa, từ đó lập kế hoạch đường đi, tránh chướng ngại vật và phân công nhiệm vụ.
- **Mô hình**
  - Hệ thống SLAM: dòng ORB‑SLAM theo phương pháp đặc trưng điểm kinh điển, DSO theo phương pháp trực tiếp, cùng VINS‑Mono/VINS‑Fusion tích hợp IMU, thực hiện ước tính tư thế chính xác và xây dựng bản đồ dày đặc/bán dày đặc thông qua theo dõi đặc trưng frontend + tối ưu hóa backend. LIO‑SAM và các framework tương tự thường gặp trong LiDAR/visual‑LiDAR fusion.
  - Mạng phân đoạn ngữ nghĩa 3D: 3D U‑Net, MinkowskiNet và các 3D CNN khác, cùng dòng PointNet++/KPConv/SparseConv dựa trên point cloud, dùng cho phân đoạn ngữ nghĩa và phân đoạn thực thể trên point cloud/voxel.
  - Định vị fusion đa cảm biến: các phương pháp dựa trên graph optimization hoặc filtering (EKF/UKF), kết hợp thông tin visual, IMU, LiDAR, odometry trong không gian trạng thái thống nhất, cải thiện độ ổn định định vị trong điều kiện ánh sáng kém, thiếu texture hoặc môi trường động.

Tổng thể, hiểu cảnh 3D và định vị tạo nền tảng để robot "có thể di chuyển được": vừa phải xây dựng framework tự định vị đáng tin cậy trong thế giới ba chiều phức tạp, vừa phải làm cho bản đồ trở nên "có ý nghĩa", từ đó hỗ trợ lập kế hoạch nhiệm vụ cấp cao và tương tác người-máy.

### 3.2.1 Phân Đoạn Ngữ Nghĩa 3D và Hiểu Vùng Có Thể Đi Qua

Trong bản đồ thuần hình học, mọi cấu trúc chỉ là các điểm/voxel không có sự phân biệt; nhưng trong ứng dụng thực tế, điều bạn quan tâm là: đâu là sàn nhà, đâu là tường, đâu có bàn ghế hay kệ hàng, đâu có thể đi qua. **Phân đoạn ngữ nghĩa 3D** là gán nhãn ngữ nghĩa cho từng điểm hoặc voxel, chuyển đổi "thuần hình học" thành "hình học + ngữ nghĩa".

Trong cảnh trong nhà/ngoài trời, các mục tiêu điển hình bao gồm:

- Cấu trúc cố định: tường, sàn nhà, trần nhà, cầu thang, cột, đường, lề đường, v.v.;
- Đồ nội thất và tiện nghi: bàn ghế, tủ, kệ hàng, cửa sổ, tay vịn, v.v.;
- Vùng có thể/không thể đi qua: vùng robot có thể đi, chướng ngại vật cần tránh, khu vực cấm vào, v.v.

Về mô hình hóa, phân đoạn ngữ nghĩa 3D thường sử dụng:

- Phương án voxel/sparse convolution: voxel hóa point cloud rồi dùng sparse CNN như 3D U‑Net, MinkowskiNet học đặc trưng cấp voxel, cân bằng giữa chi tiết cục bộ và cấu trúc toàn cục.
- Phương án point cloud trực tiếp: các mạng point cloud như PointNet++, KPConv thực hiện tổng hợp đặc trưng trên vùng lân cận cục bộ, thực hiện dự đoán ngữ nghĩa cấp điểm.

Trong các ứng dụng như robot hút bụi, robot AGV, kết quả phân đoạn ngữ nghĩa được trừu tượng hóa thêm thành **bản đồ ngữ nghĩa**: ví dụ phân chia phòng thành phòng ngủ/phòng khách/nhà bếp, phân chia không gian trong kho thành khu vực kệ hàng/lối đi/khu cấm vào. Robot không chỉ biết "đâu có thể đi" mà còn có thể tùy chỉnh chiến lược khác nhau tùy theo loại phòng (ví dụ tránh khu vực thảm trong phòng ngủ, ưu tiên phủ kín một số khu hàng trong kho).

### 3.2.2 Ước Tính Tư Thế, SLAM và Định Vị Fusion Đa Cảm Biến

Mục tiêu của **SLAM (Simultaneous Localization and Mapping)** là: trong môi trường chưa biết, vừa di chuyển vừa ước tính quỹ đạo của bản thân, đồng thời xây dựng bản đồ môi trường. Đối với môi trường trong nhà không có hỗ trợ định vị ngoài chính xác cao (như RTK‑GNSS), SLAM là giải pháp ưu tiên của hầu hết robot và AR engine.

Trong visual SLAM, các phương pháp tiêu biểu như ORB‑SLAM, DSO, VINS‑Mono/VINS‑Fusion thường được chia thành một số module chính:

- Frontend: trích xuất và theo dõi keypoint/image patch từ ảnh liên tục, ước tính tư thế tương đối giữa các frame liền kề.
- Backend: thực hiện BA hoặc graph optimization trong sliding window hoặc global graph, xử lý drift, phát hiện vòng lặp và relocalization.
- Bản đồ: xây dựng bản đồ dày đặc hoặc bán dày đặc dựa trên thông tin tư thế và độ sâu, cung cấp nền tảng cho điều hướng hoặc rendering tiếp theo.

Visual thuần túy dễ thất bại khi thiếu texture hoặc ánh sáng thay đổi mạnh, do đó trong thực tế thường sử dụng **định vị fusion đa cảm biến**:

- Visual + IMU: các framework như VINS‑Mono/VINS‑Fusion kết hợp độ chính xác ngắn hạn tần số cao của IMU với ràng buộc tỷ lệ và hình học của visual, cải thiện đáng kể độ ổn định trong các tình huống quay gấp và ngắn hạn.
- LiDAR + IMU + Visual: các framework odometry như LIO‑SAM tích hợp IMU và thông tin visual tùy chọn vào LiDAR‑SLAM, tận dụng đặc tính bù đắp lẫn nhau của ba loại để đạt định vị ổn định, được sử dụng rộng rãi trong autonomous driving và đo vẽ độ chính xác cao.

Ở cấp độ sản phẩm, các phương pháp này thường được đóng gói thành một phần của bộ điều khiển chassis robot, bộ điều khiển bay máy bay không người lái, AR engine (như Visual‑Inertial SLAM trong ARKit/ARCore) hoặc SDK định vị trong nhà, che giấu logic ước tính trạng thái và graph optimization phức tạp với ứng dụng cấp trên, cho phép bạn trực tiếp nhận được "tư thế thời gian thực + bản đồ".

### 3.2.3 Bản Đồ Ngữ Nghĩa, Điều Hướng và Tránh Chướng Ngại Vật

Với ước tính tư thế ổn định và bản đồ hình học/ngữ nghĩa, bước tiếp theo là để robot "di chuyển thông minh". Phần này chủ yếu liên quan đến **xây dựng bản đồ ngữ nghĩa, lập kế hoạch đường đi và tránh chướng ngại vật**.

- **Xây dựng bản đồ ngữ nghĩa**: chồng thông tin ngữ nghĩa (loại phòng, POI, nhãn khu vực) lên bản đồ hình học, tạo thành biểu diễn bản đồ phù hợp với ra quyết định cấp cao. Ví dụ:
  - Trong cảnh gia đình, phân chia bản đồ thành phòng ngủ, phòng khách, nhà bếp, phòng tắm, v.v.;
  - Trong cảnh kho vận, đánh dấu vị trí kệ hàng, khu bốc dỡ, khu vực nguy hiểm, v.v.;
  - Trong trung tâm thương mại/triển lãm lớn, đánh dấu cửa hàng, quầy dịch vụ, nhà vệ sinh và các POI khác để phục vụ AR navigation và dẫn đường.
- **Lập kế hoạch đường đi và tránh chướng ngại vật**: xây dựng grid map hoặc topological map trên bản đồ, sử dụng các thuật toán lập kế hoạch như A*, D* Lite, RRT để tìm đường đi khả thi từ điểm xuất phát đến điểm đích cho robot; đồng thời kết hợp nhận thức thời gian thực (chướng ngại vật phía trước, người đi bộ/xe cộ động), thực hiện tái lập kế hoạch cục bộ và tránh chướng ngại vật, đảm bảo an toàn và hiệu quả vận hành.
- **Hành vi điều hướng và lập lịch nhiệm vụ**: trong robot AGV và máy bay không người lái, còn tích hợp module lập lịch nhiệm vụ và phối hợp đa máy lên trên điều hướng: phân công nhiệm vụ, tránh tắc nghẽn, tối ưu hóa đường đi tổng thể và tiêu thụ năng lượng.

Hệ thống AR navigation và định vị trong nhà về bản chất cũng dựa vào bản đồ ngữ nghĩa và lập kế hoạch đường đi tương tự, chỉ khác là "người thực thi" chuyển từ robot sang con người: hệ thống lấy tư thế thiết bị của người dùng thông qua SLAM, lập kế hoạch đường đi trên bản đồ ngữ nghĩa, rồi hiển thị trực quan đường đi chồng lên góc nhìn thế giới thực dưới dạng augmented reality.
## 3.3 Tạo Sinh và Chỉnh Sửa 3D (3D Generation & Editing)

Nếu nhận thức 3D và SLAM là "thu thập và hiểu" hình học từ thế giới thực, thì tạo sinh và chỉnh sửa 3D lại đứng từ góc độ sản xuất nội dung: **làm thế nào để AI tự động tạo ra và cải tạo các tài nguyên 3D**. Điều này hướng trực tiếp đến nhu cầu nội dung khổng lồ trong game, phim ảnh, nhân vật số, không gian ảo, trưng bày thương mại điện tử, in 3D và nhiều lĩnh vực khác.

Trong hai, ba năm gần đây, với sự đột phá của các công nghệ như NeRF/Gaussian, biểu diễn SDF, mô hình khuếch tán đa phương thức, tạo sinh 3D đã bước vào giai đoạn phát triển nhanh chóng: tạo mô hình hoặc cảnh 3D chỉ từ văn bản, hình ảnh, video đã trở thành hiện thực. Các nhà cung cấp cloud lớn và các startup đã ra mắt các phương pháp như "Hunyuan 3D", Tripo, DreamFusion / Magic3D dưới dạng công cụ trực tuyến, đưa sản xuất 3D dần tiến đến hướng "ai cũng dùng được". Tạo sinh và chỉnh sửa 3D có thể chia thành bốn nhóm năng lực: text-to-3D, ảnh/video-to-3D, tối ưu và chỉnh sửa mô hình, cùng với rigging và animation.

- **Ứng dụng**
  - Sản xuất tài nguyên game / phim ảnh: tạo nhanh mô hình 3D có thể dùng được cho nhân vật, đạo cụ, kiến trúc, cảnh vật, giảm đáng kể khối lượng công việc mỹ thuật.
  - Thương mại điện tử và trưng bày sản phẩm: tự động tạo mô hình trưng bày 3D từ mô tả sản phẩm hoặc ảnh chụp, dùng cho xem mẫu 3D, thử đặt AR, quảng cáo tương tác.
  - Nhân vật số và nội dung ảo: tạo nhanh các tài nguyên 3D như nhân vật ảo, người mẫu thử quần áo ảo, cảnh livestreamer ảo, phục vụ livestream, video ngắn và ứng dụng tương tác.
  - In 3D và tạo mô hình cá nhân hóa: tạo mô hình có thể in được từ phác thảo / ảnh / văn bản, phục vụ quà tặng cá nhân hóa, thiết kế nguyên mẫu và ứng dụng giáo dục.
- **Nguyên lý**
  - Text-to-3D: mã hóa mô tả văn bản thành vector ngữ nghĩa, sau đó tạo ra biểu diễn 3D (NeRF/SDF/Gaussian/Mesh) qua quá trình tối ưu đa giai đoạn hoặc quá trình khuếch tán, thường tận dụng mô hình text-to-image 2D mạnh làm "bộ chấm điểm" hoặc prior.
  - Ảnh / Video-to-3D: sử dụng một hoặc nhiều ảnh, video đa góc nhìn làm tín hiệu giám sát, kết hợp NeRF, SDF hoặc biểu diễn lai ẩn/hiện để tái tạo mô hình 3D có hình học và texture.
  - Tối ưu và chỉnh sửa mô hình 3D: retopology, giảm poly, tăng cường chi tiết, tạo LOD, UV unwrap và tạo texture cho mô hình hiện có, cùng với biến dạng và style hóa dựa trên ngôn ngữ / hình ảnh.
  - Rigging và animation: tự động suy luận cấu trúc xương cho nhân vật 3D và hoàn thành rigging, hỗ trợ animation xương và mô phỏng vật lý (vải, vật thể mềm, vật thể cứng), tạo ra tài nguyên động có thể điều khiển.
- **Mô hình**
  - Biểu diễn cơ bản cho tạo sinh 3D: NeRF / Instant-NGP, SDF (bề mặt ẩn), Gaussian Splatting và mạng tạo sinh dựa trên Mesh, tạo nên không gian biểu diễn dữ liệu 3D.
  - Phương pháp Text-to-3D: các hướng tiếp cận điển hình như DreamFusion, Magic3D, Fantasia3D, thực hiện tạo sinh end-to-end từ văn bản đến 3D qua "mô hình text-to-image 2D + tối ưu 3D" hoặc "mô hình khuếch tán 3D", đặt nền tảng kỹ thuật cho các sản phẩm như Hunyuan 3D, Tripo ra đời sau.
  - Mô hình ảnh/video-to-3D: framework tái tạo và tối ưu dựa trên NeRF/SDF/Gaussian, khôi phục hình học và texture 3D ổn định từ tính nhất quán đa góc nhìn và prior đơn góc nhìn.
  - Thuật toán rigging và animation: trích xuất xương tự động, dự đoán trọng số xương, retargeting và tạo chuyển động dựa trên deep learning, cung cấp công cụ một chạm cho animation nhân vật ảo.

Ở lớp này, DCC 3D truyền thống (Maya/Blender/3ds Max v.v.) và chuỗi công cụ AI đang dần hợp nhất: nhiều dịch vụ AI 3D được nhúng vào quy trình sản xuất hiện có dưới dạng plugin hoặc giao diện cloud, giúp người tạo mô hình / họa sĩ có thể nhanh chóng lặp lại tài nguyên trong sự cộng tác người-máy.

### 3.3.1 Text-to-3D và Phác Thảo Cảnh

Mục tiêu của **Text-to-3D** là: cho một câu mô tả ngôn ngữ tự nhiên, ví dụ "một món đồ chơi vịt vàng phong cách hoạt hình, có khăn quàng màu xanh, phù hợp trưng bày đồ chơi trẻ em", hệ thống tự động tạo ra một mô hình 3D có thể chỉnh sửa (Mesh/NeRF/SDF/Gaussian v.v.). Đây là ứng dụng điển hình kết hợp LLM / mô hình đa phương thức với biểu diễn 3D.

Các hướng kỹ thuật điển hình bao gồm:

1. **Tối ưu dựa trên mô hình text-to-image 2D** (như DreamFusion, Magic3D):
2. Sử dụng mô hình Text-to-Image mạnh (như mô hình khuếch tán) làm "bộ đánh giá", cho ảnh được render từ biểu diễn 3D ở một góc nhìn nhất định, đánh giá mức độ khớp với mô tả văn bản.
3. Qua tối ưu gradient hoặc quá trình khuếch tán, lặp lại điều chỉnh biểu diễn 3D (NeRF/SDF/Mesh) sao cho ảnh render từ nhiều góc nhìn đều phù hợp với ngữ nghĩa văn bản.
4. **Mô hình khuếch tán 3D / tạo sinh trực tiếp**:
5. Lấy dữ liệu 3D (point cloud, voxel, tham số trường ẩn, Gaussian particle v.v.) làm mục tiêu tạo sinh của mô hình khuếch tán, pretrain trên dataset 3D quy mô lớn;
6. Kiểm soát điều kiện bằng văn bản, thực hiện lấy mẫu Text-to-3D end-to-end.

Ở cấp độ cảnh, khả năng **phác thảo cảnh** cho phép người dùng mô tả bố cục không gian bằng ngôn ngữ tự nhiên hoặc phác thảo thô, ví dụ "một phòng khách có cửa kính sàn, bên trái có sofa hình chữ L, giữa là bàn trà, bên phải có kệ sách và tủ tivi", hệ thống tự động dựng lên một bố cục 3D hợp lý về hình học và ngữ nghĩa. Bạn có thể tinh chỉnh mô hình và vật liệu trong công cụ DCC sau đó, hoặc nhanh chóng tạo ra nguyên mẫu cảnh có thể dùng được trực tiếp qua khả năng "tạo sinh cảnh" của Hunyuan 3D, Tripo và các công cụ tương tự.

Hiện tại, nhiều nền tảng đã ra mắt sản phẩm Text-to-3D hướng đến nhà thiết kế và nhà phát triển:

- "Hunyuan 3D" và các sản phẩm tương tự tích hợp text-to-3D, tạo sinh đa góc nhìn và khả năng tái tạo vào giao diện thống nhất, hỗ trợ nhanh chóng tạo nhân vật, đạo cụ và cảnh từ văn bản rồi xuất sang game engine;
- Các sản phẩm như Tripo nhấn mạnh "đầu vào đa phương thức + đầu ra 3D một chạm", hỗ trợ kết hợp văn bản đơn giản và ảnh tham chiếu, hướng dẫn tạo ra tài nguyên 3D đáp ứng yêu cầu phong cách và cấu trúc.

### 3.3.2 Ảnh / Video-to-3D và Tối Ưu Chỉnh Sửa Mô Hình

So với văn bản thuần túy, tạo mô hình 3D từ ảnh hoặc video có ràng buộc hình học chặt chẽ hơn và tính nhất quán thị giác tốt hơn. Vì vậy, nhiều sản phẩm AI 3D hỗ trợ **ảnh-to-3D / video-to-3D**:

- Một ảnh chụp → 3D thô: dựa vào prior đơn góc nhìn (như prior hình dạng khuôn mặt, cơ thể người, các loại vật thể phổ biến), suy luận hình học 3D tổng quát, tạo mô hình 3D dùng được cho preview hoặc tương tác đơn giản.
- Nhiều ảnh / video ngắn → 3D chất lượng cao: kết hợp tái tạo NeRF/SDF/Gaussian, hình học đa góc nhìn và hậu xử lý, chuyển đổi hàng chục ảnh hoặc vài giây video thành mô hình 3D độ trung thực cao, phù hợp cho tài nguyên game/phim ảnh hoặc trưng bày thương mại điện tử chất lượng cao.

Tạo ra hình học 3D chỉ là bước đầu, sau đó còn cần nhiều công việc **tối ưu và chỉnh sửa mô hình**:

- Retopology và giảm poly: chuyển đổi trường ẩn hoặc Mesh nhiều polygon thành topology có cấu trúc gọn gàng, số mặt có thể kiểm soát, thuận tiện cho rigging, animation và render thời gian thực.
- Tạo LOD: tự động tạo mô hình đa cấp độ chi tiết (Level of Detail), dùng mô hình thấp ở xa, mô hình cao ở gần, cân bằng chất lượng hình ảnh và hiệu năng.
- UV unwrap và tạo texture: tự động unwrap UV cho mô hình, tạo hoặc tối ưu normal map, displacement map, roughness/metalness map và các vật liệu PBR khác; một số mô hình còn hỗ trợ tự động tạo texture style hóa từ văn bản hoặc ảnh tham chiếu.
- Chỉnh sửa hình học và phong cách: sửa đổi cục bộ dựa trên ngôn ngữ hoặc ảnh ví dụ, như "làm cho chân ghế này ngắn hơn một chút" hay "đổi tòa nhà này sang phong cách cyberpunk", bên dưới thường được thực hiện qua thao tác không gian tiềm ẩn hình dạng hoặc chỉnh sửa neural field.

Các sản phẩm như Hunyuan 3D, Tripo thường kết nối toàn bộ quy trình trên: bạn bắt đầu từ ảnh/video hoặc văn bản đơn giản, hệ thống nội bộ hoàn thành tái tạo, retopology, texture và xuất file, giúp người dùng không chuyên cũng có thể nhận được mô hình 3D "cắm vào là dùng" trong vài phút, rút ngắn đáng kể thời gian từ ý tưởng đến tài nguyên.

### 3.3.3 Rigging, Animation và Tài Nguyên 3D Động

Mô hình tĩnh chỉ là một nửa nội dung, tài nguyên 3D "có thể chuyển động" mới quan trọng hơn trong game, phim ảnh, nhân vật ảo và ứng dụng tương tác. Điều này liên quan đến **rigging xương, vẽ weight, animation và mô phỏng vật lý** — truyền thống đây đều là công việc chuyên nghiệp đòi hỏi kỹ năng cao, nhưng nay cũng dần được công cụ AI hỗ trợ thậm chí hoàn thành bán tự động.

- **Rigging tự động**: cho một Mesh nhân vật, hệ thống tự động suy luận cấu trúc phân cấp xương (cột sống, tứ chi, ngón tay v.v.) và vị trí của xương trong mô hình, đồng thời dự đoán weight của mỗi đỉnh so với từng xương. Các phương pháp deep learning gần đây có thể học ánh xạ này trên dataset nhân vật có chú thích xương quy mô lớn, thực hiện rigging xương một chạm.
- **Tạo animation và chuyển động**: xếp chồng dữ liệu chuyển động (Mocap hoặc AI tạo sinh) lên xương hiện có, hoàn thành các animation đi bộ, chạy, biểu cảm, cử chỉ; tạo chuyển động và retargeting dựa trên deep learning có thể chuyển chuyển động cơ thể người trong video hoặc chuyển động của nhân vật khác sang nhân vật mới.
- **Mô phỏng vật lý**: mô phỏng vật lý cho vải, vật thể mềm, vật thể cứng, làm cho chuyển động của tóc, quần áo, cờ, vật thể mềm tự nhiên hơn. Một số hệ thống sử dụng neural network để tăng tốc hoặc xấp xỉ vật lý, làm cho hiệu ứng vật lý trong game engine thời gian thực chân thực hơn.

Về sản phẩm và hệ sinh thái, các năng lực này thường được tích hợp vào:

- Chuỗi công cụ tài nguyên game / phim ảnh: cung cấp cho người tạo mô hình rigging một chạm, phân bổ weight tự động và thư viện chuyển động cơ bản, giảm đáng kể công việc lặp đi lặp lại;
- Nền tảng sản xuất nhân vật ảo / tài nguyên số: bắt đầu từ ảnh hoặc scan nhân vật, qua tái tạo 3D + rigging tự động + điều khiển chuyển động, xuất ra nhân vật ảo có thể điều khiển trong livestream, video ngắn, ứng dụng tương tác;
- Nền tảng AI 3D (như Hunyuan 3D, Tripo và các sản phẩm tương tự): sau khi tạo sinh 3D, bổ sung thêm chức năng rigging và animation đơn giản, để bạn có thể "nhân vật tạo ra là chuyển động được ngay" mà không cần thao tác phức tạp trên công cụ DCC.

Khi công nghệ tạo sinh và chỉnh sửa 3D trưởng thành, toàn bộ quy trình sản xuất nội dung 3D đang chuyển dịch từ "lấy công cụ DCC chuyên nghiệp làm trung tâm" sang "cộng tác người-máy do AI dẫn dắt": AI chịu trách nhiệm tạo sinh và phần lớn công việc cơ bản, con người tập trung hơn vào định nghĩa phong cách, kiểm soát chất lượng và các điểm quyết định thiết kế then chốt. Các sản phẩm AI 3D thế hệ mới như Hunyuan 3D, Tripo chính là hiện thân tập trung của xu hướng này, cung cấp hạ tầng 3D nhanh hơn, dễ dùng hơn cho các ứng dụng game, phim ảnh, AR/VR, digital twin và nhân vật ảo ở lớp trên.

# 4. Âm Thanh (Audio / Speech)

Trong technology stack tổng thể, "âm thanh" tương ứng với việc nhận thức và tạo sinh tín hiệu âm học: bao gồm cả xử lý dạng sóng và phổ tần số thô, chuyển đổi giọng nói thành văn bản, hiểu "ai đang nói" và "nói gì", cũng như sáng tác và tổng hợp âm thanh và âm nhạc. Tương tự như thị giác, âm thanh cũng có thể được chia thành nhiều lớp: **xử lý dạng sóng và phổ tần số** ở lớp dưới cùng chịu trách nhiệm "nghe rõ"; **nhận dạng giọng nói và công nghệ người nói** ở lớp giữa chịu trách nhiệm "hiểu ai đang nói gì"; bên trên đó là **hiểu âm thanh/âm nhạc** và **tạo sinh giọng nói, âm nhạc** ở mức trừu tượng hơn. Toàn bộ khối năng lực này cùng nhau hỗ trợ các sản phẩm như phụ đề thời gian thực trong cuộc họp, trợ lý giọng nói, hậu kỳ chỉnh âm podcast, loa thông minh, giám sát an ninh âm học, gợi ý và tạo sinh âm nhạc.
## 4.1 Xử Lý Âm Thanh Ở Cấp Độ Dạng Sóng: Bắt Đầu Từ "Nghe Rõ"

Ở tầng sâu nhất của công nghệ âm thanh, điều chúng ta quan tâm đầu tiên không phải là "nói gì", "ai đang nói" hay "phong cách âm nhạc là gì", mà là **âm thanh đó có sạch không, có nghe rõ không**. Tầng này chủ yếu làm việc ở cấp độ dạng sóng và phổ tần, thông qua các thao tác như lấy mẫu lại, tăng cường, khử nhiễu, tách nguồn âm, để biến âm thanh thô tạp, méo tiếng, lẫn lộn thành "tín hiệu sạch" phù hợp hơn cho việc nhận dạng, phân tích và tổng hợp về sau. Có thể so sánh với "tăng cường ảnh + khử nhiễu + tách tiền cảnh/hậu cảnh" trong thị giác máy tính — tầng này thiên về làm sạch âm học hơn là xử lý ngữ nghĩa.

Nhìn từ góc độ sản phẩm, tầng này gần như "ẩn mình" đằng sau mọi sản phẩm âm thanh: khử nhiễu thời gian thực trong phần mềm hội nghị, hậu kỳ chỉnh âm cho podcast/video ngắn, "chế độ tăng cường giọng nói" trong máy ghi âm và điện thoại, "nút làm đẹp giọng" trên nền tảng livestream, cũng như tiền xử lý cho các mô hình ASR/nhận dạng giọng nói — tất cả đều là biểu hiện trực tiếp của xử lý âm thanh ở cấp độ dạng sóng. Dưới đây chúng ta vẫn tiếp cận theo ba góc độ **tình huống**, **nguyên lý** và **mô hình**, đồng thời trong các tiểu mục tiếp theo sẽ triển khai cụ thể ba hướng chính: tiền xử lý & trích xuất đặc trưng, tăng cường & khử nhiễu, và tách nguồn âm.

- **Tình huống**
  - Giao tiếp trực tuyến và hội nghị: Zoom, các ứng dụng họp trực tuyến tương tự trong môi trường văn phòng ồn ào, khu vực mở, hoặc tại nhà — thời gian thực triệt tiêu tiếng gõ phím, tiếng va chạm, tiếng ồn đường phố, tiếng vang, giúp giọng nói rõ hơn.
  - Sáng tạo nội dung và hậu kỳ chỉnh âm: Trong hậu kỳ podcast, video ngắn, livestream — tự động loại bỏ tiếng nền, tiếng hum điện, tiếng vang phòng, vá các đoạn bị clipping và thiếu dải tần, nâng cao chất lượng nghe tổng thể.
  - Frontend ghi âm và phiên âm: Máy ghi âm, phụ đề thông minh, dịch vụ phiên âm hội nghị — trước khi đưa vào ASR, thực hiện VAD, khử nhiễu, chuẩn hóa độ to để tăng độ bền nhận dạng của backend.
  - Thiết bị đầu cuối và IoT: "Thu âm từ xa" và "chế độ khử nhiễu" trên loa thông minh, màn hình xe hơi, camera — cố gắng thu được giọng người nói chính hoặc nguồn âm quan trọng trong môi trường âm thanh phức tạp.
- **Nguyên lý**
  Xử lý ở cấp độ dạng sóng thường không trực tiếp hiểu ngữ nghĩa, mà tối ưu hóa tín hiệu dựa trên cấu trúc phổ tần và đặc tính thống kê:
  - Biến đổi qua lại giữa miền thời gian và miền tần số (ví dụ STFT → phổ/mel-spectrogram → iSTFT), triệt tiêu hoặc mô hình hóa các dải tần nhiễu, đặc trưng vang và tiếng nền.
  - Thông qua VAD và đặc trưng năng lượng/phổ, phân biệt "đoạn có giọng nói" và "đoạn im lặng/nhiễu", giảm ảnh hưởng của các đoạn không hợp lệ lên backend.
  - Sử dụng deep learning hoặc phương pháp lọc cổ điển để ước tính mặt nạ hoặc hàm khuếch đại của "phổ giọng sạch" và "phổ nhiễu", trọng số hóa phổ tần để đạt mục tiêu tăng cường và khử nhiễu.
  - Trong tình huống nhiều nguồn âm trộn lẫn, dùng mạng phân tách end-to-end hoặc biểu diễn thưa để tách các giọng nói khác nhau, giọng người với nhạc đệm, tiếng nền với tiền cảnh thành các track độc lập.
- **Mô hình**
  Các mô hình ở cấp độ dạng sóng/phổ tần có thể chia thành hai loại lớn: **mô hình miền phổ** và **mô hình end-to-end miền thời gian**:
  - Dòng U‑Net trên phổ/mel-spectrogram: Spectrogram‑based U‑Net, DCCRN, v.v. — thực hiện tích chập và encode–decode kiểu "xử lý ảnh" trên mặt phẳng thời gian–tần số, là phương án phổ biến cho tăng cường giọng nói, tách giọng ca, v.v.
  - Mô hình end-to-end miền dạng sóng: Wave‑U‑Net, Conv‑TasNet, Demucs, v.v. — mô hình hóa trực tiếp trên dạng sóng thời gian, tránh STFT/ISTFT tường minh, thường cho kết quả tốt hơn về chất lượng nghe chủ quan và độ trung thực miền thời gian.
  - Phương pháp xử lý tín hiệu cổ điển: Spectral subtraction, Wiener filtering và các phương pháp miền tần số truyền thống vẫn được sử dụng rộng rãi trên thiết bị nhẹ hoặc trong các tình huống cực kỳ nhạy cảm về độ trễ, thường kết hợp với mạng tăng cường sâu thành "giải pháp lai".

### 4.1.1 Tiền Xử Lý và Trích Xuất Đặc Trưng: "Dọn Sân Dựng Khấu" Cho Backend

Bất kỳ mô hình ASR, nhận dạng giọng nói, phát hiện sự kiện, TTS nào về sau đều cần một đầu vào âm thanh thống nhất, sạch và có cấu trúc nhất có thể — đó chính là trách nhiệm của tầng tiền xử lý và trích xuất đặc trưng. Nó đảm nhận việc "dọn sân" và "thống nhất định dạng" cơ bản nhưng cực kỳ quan trọng, dựng sẵn sân khấu cho các mô hình âm thanh phía trên.

Trong giai đoạn tiền xử lý, đầu tiên âm thanh thu được sẽ được **chuyển đổi tốc độ lấy mẫu và kênh âm thanh**: ví dụ chuyển stereo 48kHz sang mono 16kHz để đáp ứng thông số đầu vào của mô hình downstream và giảm chi phí tính toán. Tiếp theo, thực hiện chuẩn hóa độ to, loại bỏ thành phần DC, lọc đơn giản, v.v., giúp âm thanh thu từ các thiết bị và bối cảnh khác nhau nhất quán hơn về thang năng lượng.

**Phát hiện điểm cuối giọng nói (VAD)** là một khâu then chốt khác trong tiền xử lý. Nó cố gắng tự động phân chia luồng âm thanh thành "đoạn có giọng nói" và "đoạn im lặng/nhiễu thuần túy", thường dựa trên năng lượng khung, entropy phổ, tỷ lệ qua không hoặc mạng nơ-ron nhỏ. Lợi ích của VAD là: giảm đáng kể dữ liệu không hợp lệ gửi vào mô hình ASR/nhận dạng giọng nói, giảm khối lượng tính toán, đồng thời tránh các đoạn im lặng làm nhiễu loạn nhận dạng (ví dụ nhận nhầm thành chuỗi dài khoảng trắng hoặc ký tự lạ). Trong truyền thông thời gian thực, VAD còn có thể điều khiển "đèn chỉ thị hoạt động giọng nói" và logic tự động tắt tiếng.

Về mặt trích xuất đặc trưng, phổ biến nhất là chuyển dạng sóng thời gian thành **phổ tần** hoặc **mel-spectrogram**. Thông qua biến đổi Fourier thời gian ngắn (STFT), âm thanh được phân giải thành phân bố tần số thay đổi theo thời gian; qua bộ lọc mel, có thể thu được mel-spectrogram hoặc đặc trưng cepstral mel phù hợp hơn với tri giác thính giác của con người (như log Mel‑spectrogram, MFCC). Các đặc trưng thời gian–tần số này cung cấp một "biểu diễn hai chiều" cho việc nhận dạng, tách và tổng hợp về sau, tương tự ảnh xám hoặc feature map đa kênh trong thị giác, thuận tiện cho các cấu trúc tích chập, attention xử lý. Cùng với sự phát triển của mô hình hóa end-to-end, ngày càng có nhiều mô hình học đặc trưng trực tiếp trên dạng sóng (như Wav2Vec 2.0), nhưng trong thực tiễn kỹ thuật, tổ hợp STFT + đặc trưng mel vẫn là frontend phổ biến và đáng tin cậy nhất.

### 4.1.2 Tăng Cường và Khử Nhiễu: Biến "Âm Mờ" Thành "Giọng Sạch"

Trong môi trường thực tế, âm thanh hầu như luôn truyền trong nhiễu và tiếng vang: tiếng điều hòa, gõ phím, tiếng ồn đường phố, đám đông huyên náo, tiếng vọng phòng — tất cả đều ở mức độ khác nhau làm giảm độ rõ ràng và chất lượng chủ quan của giọng nói và âm nhạc. Mục tiêu của **tăng cường giọng nói và khử nhiễu** là trong khi cố gắng bảo toàn tính tự nhiên và toàn vẹn của giọng nói, triệt tiêu những nhiễu loạn nền này, biến âm thanh "bị mờ" thành âm thanh "sạch" nhất có thể.

Trong các phương pháp truyền thống, nhiệm vụ này chủ yếu được thực hiện qua các kỹ thuật miền tần số như spectral subtraction, Wiener filtering: trước tiên ước tính phổ nhiễu, sau đó "trừ" nhiễu theo quy tắc nhất định trên phổ tần hoặc điều chỉnh khuếch đại dải tần. Mặc dù đơn giản trong triển khai và có tính thời gian thực tốt, nhưng trong điều kiện nhiễu mạnh, nhiễu phi dừng và môi trường vang phức tạp, dễ tạo ra "nhiễu âm nhạc" và các artifact rõ rệt.

Phương pháp deep learning học một **ánh xạ** trên phổ hoặc dạng sóng: cho giọng nói có nhiễu, dự đoán mặt nạ thời gian–tần số hoặc trực tiếp dự đoán dạng sóng sạch. Các phương án phổ biến bao gồm sử dụng cấu trúc encode–decode như **Spectrogram‑based U‑Net, DCCRN** trên phổ mel/tuyến tính để sửa chữa tinh tế phổ từng khung; cũng có các mô hình **Conv‑TasNet, Demucs, Wave‑U‑Net** thực hiện tăng cường dạng sóng end-to-end trực tiếp trên dạng sóng thời gian. Các phương pháp này trong các tình huống như điện thoại giọng nói, hội nghị trực tuyến, phục hồi bản ghi âm — có thể cải thiện đáng kể độ rõ giọng nói và chất lượng nghe chủ quan.

Trong sáng tạo nội dung và hậu kỳ sản xuất, "phục hồi bản ghi âm" thường còn bao gồm giảm âm bật (plosives), cắt âm sibilance, bù thiếu hụt dải tần cũng như cân bằng (EQ) và xử lý động học (compressor/limiter) — những thao tác mang "hơi hướng audio engineer" hơn. Ngày càng nhiều công cụ kết hợp các xử lý truyền thống này với mô hình sâu, cung cấp khả năng "chỉnh âm một chạm" và "làm đẹp âm thanh", phục vụ các bạn làm podcast, sáng tạo video và nền tảng livestream.

### 4.1.3 Tách Nguồn Âm: Tháo Rời "Âm Thanh Trộn Lẫn"

Nếu tăng cường và khử nhiễu là "làm nổi bật âm chính, làm yên lặng hơn nền", thì **tách nguồn âm** tiến thêm một bước, cố gắng tách hoàn toàn nhiều nguồn âm trộn lẫn thành các track độc lập. Ví dụ: nhiều người nói đồng thời trong bản ghi hội nghị; giọng ca và nhạc đệm trộn lẫn trong âm nhạc; sự kiện chính (như còi báo động, tiếng hét) bị chìm trong tiếng nền trong bản ghi môi trường. Mục tiêu của tách nguồn âm là từ một hoặc nhiều tín hiệu trộn lẫn, phục hồi dạng sóng hoặc phổ của từng nguồn âm độc lập.

Trong lĩnh vực giọng nói, **tách nhiều người nói** là ứng dụng cốt lõi: mô hình cần phân tách nhiều giọng nói chồng chéo sang các kênh khác nhau dựa trên voiceprint, cấu trúc thời gian–tần số và đặc trưng người nói — mà không cần micro riêng cho từng người. Khả năng này không chỉ cải thiện hiệu suất ASR nhiều người nói, mà còn cung cấp đầu vào sạch hơn cho tách và gán nhãn người nói (Diarization). Trong lĩnh vực âm nhạc, **tách giọng ca/nhạc đệm (vocal separation)** có thể tách ra track giọng rõ và track nhạc thuần từ một bài hát đã mix, dùng cho cover, Remix, karaoke, phân tích âm nhạc, v.v. Tương tự, **tách tiếng môi trường/tiếng tiền cảnh** có thể dùng trong an ninh và IoT, trích xuất âm sự kiện quan trọng (như tiếng vỡ kính, tiếng xung đột) từ nền phức tạp.

Ở cấp độ mô hình, tách nguồn âm thường đòi hỏi năng lực mô hình hóa mạnh hơn và kiến trúc phức tạp hơn so với tăng cường thông thường. Các mạng end-to-end như **Conv‑TasNet, Demucs, Wave‑U‑Net** có thể phân tách nhiều nguồn âm trực tiếp trong miền thời gian; trên miền phổ, thường thấy các cấu trúc U‑Net đa nhánh, attention, ước tính mặt nạ — dự đoán mặt nạ hoặc phổ chuyên biệt cho từng nguồn âm. Với sự tăng trưởng của dữ liệu huấn luyện và tài nguyên tính toán, các mô hình tách nguồn âm hiện đại đã có thể trong môi trường vang và nhiễu khá phức tạp, xuất ra các track chất lượng cao có thể dùng cho sáng tác và phân tích thực tế — cung cấp nền tảng vững chắc cho làm đẹp giọng livestream, hội nghị nhiều người nói, sản xuất âm nhạc và truy xuất âm thanh.
## 4.2 Nhận dạng giọng nói và công nghệ nhận dạng người nói (ASR & Speaker)

Sau khi hoàn thành tiền xử lý, tăng cường và phân tách ở tầng dạng sóng, cuối cùng chúng ta có thể bắt đầu đặt ra các câu hỏi ở tầng cao hơn: **"Trong audio có nói gì? ""Ai đang nói? ""Khi nào ai đang nói?"** Tầng này tập trung vào các tác vụ "hiểu và chú thích" xoay quanh chính giọng nói: nhận dạng giọng nói tự động (ASR), nhận dạng và xác minh người nói, phân tách và chú thích người nói (Diarization), cùng với phát hiện từ khoá và keyword hướng đến tương tác (KWS).

Xét về hình thức sản phẩm, tầng này là cốt lõi của phần lớn "sản phẩm giọng nói": bàn phím giọng nói, chuyển ngữ cuộc họp, phân tích ghi âm dịch vụ khách hàng, kiểm soát chất lượng tổng đài thông minh, loa thông minh và tương tác giọng nói trên xe hơi, robot điện thoại, xác thực voiceprint trong tài chính, v.v. — hầu hết đều phụ thuộc trực tiếp vào các công nghệ này. Chúng chuyển đổi "âm thanh sạch" từ tầng trước thành chuỗi văn bản, nhãn người nói hoặc sự kiện keyword, là một trong những cầu nối quan trọng nhất từ audio sang thế giới ngữ nghĩa.

- **Tình huống ứng dụng**
  - Nhận dạng giọng nói tự động (ASR): phụ đề thời gian thực, bàn phím giọng nói, ghi chép cuộc họp và lớp học, chuyển ngữ cuộc gọi tổng đài — cung cấp cho người dùng kênh tức thì từ "thính giác sang văn bản".
  - Nhận dạng và xác minh người nói: "mở khoá bằng giọng nói", "xác minh voiceprint" trên điện thoại/ngân hàng/call center, cũng như tìm kiếm một người nói cụ thể trong lượng lớn bản ghi âm.
  - Phân tách và chú thích người nói (Diarization): trong cuộc họp, phỏng vấn, thảo luận bàn tròn — tự động trả lời "ai nói vào lúc nào", thực hiện "chuyển ngữ theo từng người nói".
  - Phát hiện từ khoá và keyword (KWS): phát hiện từ đánh thức trên loa thông minh/xe hơi ("Hey Siri", "OK Google"), cũng như bắt bắt các cụm từ quan trọng ("khiếu nại", "hoàn tiền", "leo thang") trong ghi âm tổng đài và kiểm soát chất lượng.
- **Nguyên lý**
  Hầu hết các tác vụ ở tầng này đều có thể được hiểu thống nhất là **căn chỉnh thời gian và chú thích chuỗi** trên chuỗi audio:
  - ASR: cho một đoạn giọng nói, học ánh xạ từ đặc trưng âm học sang chuỗi văn bản, thường dùng CTC, RNN‑Transducer (RNN‑T) hoặc kiến trúc end-to-end dựa trên attention; các mô hình hiện đại thường dùng pre-training quy mô lớn (như Wav2Vec 2.0, Whisper, v.v.) rồi fine-tune.
  - Nhận dạng người nói: trích xuất từ audio một **speaker embedding** có số chiều cố định (như x‑vector, ECAPA‑TDNN); trong không gian embedding này, giọng nói của cùng một người xích lại gần nhau, giọng nói của người khác nhau cách xa nhau — kết hợp mô hình đo lường hoặc phân loại để hoàn thành nhận dạng và xác minh.
  - Phân tách và chú thích người nói (Diarization): kết hợp speaker embedding, VAD, phân đoạn clustering hoặc mạng end-to-end (EEND) để gán nhãn người nói cho từng đoạn thời gian, ghép thành "dòng thời gian đa người nói".
  - KWS: phát hiện bằng mô hình nhỏ độ trễ thấp trên luồng audio liên tục, thực hiện khớp mẫu cục bộ và đánh giá độ tin cậy cho từ đánh thức hoặc keyword được định nghĩa trước, cân bằng giữa tài nguyên tính toán thấp và recall cao.
- **Mô hình**
  Phổ mô hình ASR và công nghệ người nói bao gồm cả kiến trúc end-to-end, mô hình embedding chuyên dụng lẫn phương pháp clustering:
  - ASR: Wav2Vec 2.0, Conformer, Whisper, RNN‑T, Citrinet, v.v. — hầu hết dùng kiến trúc tích chập + self-attention hoặc thuần self-attention, hỗ trợ đa ngôn ngữ, từ vựng lớn và ngữ cảnh dài.
  - Speaker embedding: ECAPA‑TDNN, x‑vector, i‑vector, v.v. — thông qua huấn luyện phân loại hoặc metric learning trên dữ liệu nhiều người nói, thu được không gian đặc trưng người nói bền vững.
  - Diarization: từ pipeline truyền thống VAD + phân đoạn + clustering, đến các phương pháp end-to-end như End‑to‑End Diarization (EEND) xuất trực tiếp ma trận "thời điểm × người nói".
  - Phát hiện từ khoá/keyword: kết hợp frontend CNN/RNN/Transformer nhẹ với CTC hoặc cơ chế gating, nhúng local trên thiết bị, thực hiện lắng nghe thường trực với độ trễ cực thấp và tài nguyên tính toán tối thiểu.

### 4.2.1 Nhận dạng giọng nói tự động (ASR): chuyển "âm thanh" thành "văn bản"

**Nhận dạng giọng nói tự động (ASR) là tuyến đường chính của "audio → văn bản": dù là bàn phím giọng nói hay chuyển ngữ cuộc họp, phụ đề thông minh, phân tích ghi âm tổng đài — bước đầu tiên đều là chuyển đổi chính xác những gì người dùng nói thành văn bản. Các hệ thống ASR hiện đại thường dùng kiến trúc end-to-end**: xuất phát từ đặc trưng âm học (như mel-spectrogram hoặc dạng sóng trực tiếp), qua một loạt mạng sâu (như Conformer, Citrinet, Encoder dựa trên Transformer), xuất trực tiếp chuỗi văn bản hoặc chuỗi token tương ứng.

Về mặt mô hình hoá, những thách thức chính của ASR bao gồm phụ thuộc dài hạn, đa ngôn ngữ và phương ngữ, biến thể giọng nói, giọng nói chồng chéo, tiếng ồn nền và thuật ngữ chuyên ngành. Vì vậy, hướng chủ đạo hiện nay là dùng lượng lớn audio không gán nhãn để pre-training tự giám sát (như Wav2Vec 2.0, HuBERT), hoặc huấn luyện có giám sát quy mô lớn trên dữ liệu đa ngôn ngữ đa tác vụ (như Whisper), rồi fine-tune với lượng dữ liệu domain tương đối ít, từ đó đạt được độ bền vững tốt trên các ngôn ngữ, giọng nói và bối cảnh khác nhau.

Ở tầng sản phẩm, ASR thường được đóng gói thành "Speech Input SDK", "Cloud Speech Recognition API", "Meeting Transcription Service", v.v.: frontend có thể là nhận dạng streaming thời gian thực (RNN‑T, streaming Transformer, v.v.), backend có thể tăng cường nhận dạng tên người, địa danh, tên thương hiệu và thuật ngữ nghiệp vụ cụ thể thông qua hot word injection, từ điển tuỳ chỉnh, và ràng buộc ngữ cảnh. Các kết quả nhận dạng này thường là nền tảng cho NLP, hệ thống đối thoại và phân tích dữ liệu tiếp theo.

### 4.2.2 Nhận dạng và phân tách chú thích người nói: trả lời "ai" và "khi nào đang nói"

So với "nói gì", **"ai đang nói" cũng quan trọng không kém trong nhiều ứng dụng: các bối cảnh tài chính, hành chính, tổng đài, an ninh cần xác minh danh tính hoặc điều tra rủi ro thông qua nhận dạng voiceprint**; còn bối cảnh cuộc họp và phỏng vấn cần biết "mỗi câu là ai nói", để hỗ trợ chuyển ngữ theo người nói, thống kê phát biểu và phân tích hành vi.

Trong tác vụ **nhận dạng/xác minh người nói (Speaker Recognition)**, mục tiêu của hệ thống là: cho một đoạn giọng nói, xác định người nói là ai, hoặc xác định có phải cùng người nói đã đăng ký hay không. Các hệ thống hiện đại thường dùng các mô hình như ECAPA‑TDNN, x‑vector để trích xuất một vector embedding người nói có số chiều cố định từ đoạn giọng nói. Trong giai đoạn huấn luyện, kết hợp phân loại người nói và metric learning đảm bảo embedding của cùng một người tập trung hơn, khoảng cách embedding giữa người khác nhau lớn hơn; trong giai đoạn suy luận, dùng nearest neighbor hoặc backend discriminator (như PLDA, Cosine scoring with margin) để xác minh và nhận dạng. Nhờ đó, hệ thống có thể trả lời "có phải cùng một người hay không" với độ tin cậy nhất định trong môi trường điện thoại, microphone, tiếng ồn.

**Phân tách và chú thích người nói (Diarization)** tiếp tục trả lời "ai nói vào lúc nào". Phương pháp truyền thống thường gồm ba bước: dùng VAD tìm các đoạn có giọng nói, cắt audio dài thành các segment ngắn, trích xuất speaker embedding cho mỗi segment, cuối cùng clustering và ghép thời gian trong không gian embedding để thu được một dòng thời gian đa người nói. Các phương pháp tiên tiến hơn như **End‑to‑End Diarization (EEND)** cố gắng xuất trực tiếp ma trận boolean "thời gian × người nói" từ đặc trưng audio, học end-to-end các mẫu phức tạp như giọng nói chồng chéo, chuyển đổi người nói. Diarization cực kỳ có giá trị trong các bối cảnh cuộc họp, chương trình phỏng vấn, biên bản toà án, tổng đài điện thoại, thường kết hợp với ASR để tạo thành "bản ghi văn bản có nhãn người nói".

### 4.2.3 Phát hiện từ khoá và keyword: "đôi tai" hướng đến tương tác và giám sát

Trong luồng audio liên tục, không phải mỗi giây đều đáng được nhận dạng và lưu trữ đầy đủ. Vai trò của **Phát hiện từ khoá và keyword (KWS)** chính là "người gác cổng" luôn trực tuyến:

- Trong loa thông minh, xe hơi, trợ lý điện thoại, module KWS chịu trách nhiệm phát hiện từ đánh thức (như "Hey Siri", "OK Google", "Xiao Ai Tong Xue"); khi phát hiện từ đánh thức, chuyển luồng audio cho hệ thống ASR và đối thoại tốn kém hơn xử lý.
- Trong các bối cảnh tổng đài thông minh, kiểm soát chất lượng và tuân thủ, KWS đánh dấu và cảnh báo các cụm từ quan trọng xuất hiện trong ghi âm hoặc cuộc gọi thời gian thực (như "khiếu nại", "trả hàng", "bảo vệ quyền lợi", "gian lận"), cung cấp điểm kích hoạt cho phân tích backend và chiến lược kiểm soát chất lượng.

Về mặt triển khai kỹ thuật, KWS thường cần chạy dưới ràng buộc **tài nguyên tính toán cực thấp và độ trễ thấp**, đặc biệt là phát hiện từ đánh thức trên thiết bị local: mô hình thường là một frontend CNN/RNN/Transformer nhỏ, kết nối với đầu phân loại CTC hoặc gating, phát hiện mẫu âm học của các từ cụ thể, và dùng sliding window cùng làm mượt độ tin cậy để tránh đánh thức nhầm. Đối với bối cảnh kiểm soát chất lượng keyword, có thể dùng ASR mạnh hơn + khớp keyword/regex + phân tích thống kê, hoặc trực tiếp huấn luyện mô hình keyword tagging end-to-end. Dù ở hình thức nào, KWS về bản chất là thêm một lớp lọc ngữ nghĩa "cấp độ sự kiện" trên luồng giọng nói — là giao diện kết nối quan trọng giữa thế giới audio và logic tương tác.
## 4.3 Hiểu Âm Thanh/Âm Nhạc (Audio Event & Music Understanding)

Không phải mọi âm thanh đều xoay quanh "giọng nói". Trong thực tế có rất nhiều tình huống liên quan đến âm thanh môi trường, âm thanh sự kiện và âm nhạc — điều họ quan tâm hơn là: **"Sự kiện âm thanh gì đang xảy ra?", "Cảnh quan âm thanh hiện tại là gì?", "Bài hát này thuộc phong cách gì, dùng nhạc cụ nào, nhịp độ và điệu thức ra sao?"** Nhóm năng lực này được gọi chung là hiểu âm thanh/âm nhạc, tập trung vào phát hiện sự kiện âm thanh, phân loại môi trường/cảnh quan và hiểu thuộc tính âm nhạc.

Nhìn từ góc độ sản phẩm, công nghệ hiểu âm thanh hỗ trợ nhiều ứng dụng rộng rãi như giám sát âm học an ninh, cảm biến âm học IoT, thích nghi môi trường cho thiết bị thông minh, gợi ý và phân loại âm nhạc, nhận dạng bản quyền âm nhạc, tìm kiếm âm nhạc và hỗ trợ sáng tác. Tương tự "phân loại ảnh + phân loại chi tiết" trong lĩnh vực hình ảnh, tầng này cấu trúc hóa không gian âm thanh vốn liên tục và phức tạp thành các nhãn sự kiện rời rạc, vector thuộc tính đa chiều và mô tả phong cách.

- **Tình huống ứng dụng**
  - Phát hiện sự kiện âm thanh: phát hiện tiếng còi báo động, kính vỡ, tiếng khóc của trẻ em, tiếng va chạm, v.v., dùng cho giám sát an ninh, tòa nhà thông minh, hệ thống an toàn xe cộ và cảnh báo công nghiệp.
  - Phân loại môi trường/cảnh quan: nhận diện các cảnh quan như "trong nhà/ngoài trời", "văn phòng/trong xe/đường phố/tàu điện ngầm", cung cấp cơ sở cho chiến lược khử tiếng ồn, điều chỉnh độ khuếch đại tự động và chuyển đổi chế độ của thiết bị thông minh.
  - Hiểu âm nhạc và truy xuất thông tin âm nhạc (MIR): phân loại thể loại, nhận dạng nhạc cụ, phân tích nhịp điệu và điệu thức, hỗ trợ gợi ý âm nhạc, tạo danh sách phát, tìm kiếm âm nhạc, nhận dạng bản quyền và trợ lý sáng tác.
- **Nguyên lý**
  Hiểu âm thanh/âm nhạc phần lớn dựa trên **đặc trưng thời–tần + mạng nơ-ron sâu** để thực hiện phân loại hoặc gán nhãn đa nhãn:
  - Sử dụng các đặc trưng như log Mel‑spectrogram để chuyển đổi âm thanh thành "ảnh âm học", sau đó dùng các kiến trúc CNN, CRNN hoặc Transformer để nhận dạng mẫu thời–tần.
  - Với phát hiện sự kiện âm thanh, thường dùng đầu ra đa nhãn đa chuỗi thời gian, dự đoán sự tồn tại của từng sự kiện trên trục thời gian, đôi khi kết hợp nhãn giám sát yếu và học đa thực thể.
  - Với phân loại môi trường/cảnh quan, chú trọng hơn đến đặc trưng thống kê dài hạn và cấu trúc nền, thường cần mô hình hóa trên cửa sổ thời gian dài hơn.
  - Các tác vụ hiểu âm nhạc kết hợp kiến thức lý thuyết âm nhạc để mô hình hóa nhịp độ (BPM), điểm phách, điệu thức, hợp âm và cấu trúc; một số tác vụ dùng tự giám sát hoặc học tương phản để tiền huấn luyện embedding âm nhạc, rồi tinh chỉnh cho tác vụ downstream.
- **Mô hình**
  Các mô hình hiểu âm thanh phổ biến thường được tiền huấn luyện trên các tập dữ liệu công khai (như AudioSet) rồi chuyển giao sang tác vụ cụ thể:
  - Các mô hình CNN/CRNN như VGGish, YAMNet, PANNs sau khi tiền huấn luyện trên dữ liệu âm thanh quy mô lớn có thể dùng cho nhiều tác vụ sự kiện âm thanh và cảnh quan.
  - Các mô hình dựa trên Transformer như AST (Audio Spectrogram Transformer) sử dụng self-attention trực tiếp trên spectrogram, đạt năng lực mô hình hóa thời–tần toàn cục mạnh hơn.
  - Các mô hình MusicTagging/MIR dành riêng cho âm nhạc được tiền huấn luyện trên hàng triệu bài hát để tạo mô hình nhãn hoặc mô hình embedding, dùng cho nhãn phong cách/cảm xúc/nhạc cụ, tìm kiếm và gợi ý âm nhạc.

### 4.3.1 Sự Kiện Âm Thanh & Cảnh Quan Môi Trường: Giúp Thiết Bị "Hiểu Được Môi Trường"

Trong an ninh, IoT, thành phố thông minh và hệ thống xe cộ, chỉ dựa vào camera không đủ để hiểu toàn diện trạng thái môi trường. Mục tiêu của **phát hiện sự kiện âm thanh** là giúp hệ thống "hiểu được" các sự kiện quan trọng: khi xảy ra vỡ kính, còi báo động, trẻ khóc, va chạm, tiếng hét, ẩu đả hoặc hành vi phá hoại, hệ thống có thể nhận diện trong tín hiệu âm thanh và phát cảnh báo. Khác với nhận dạng giọng nói, các sự kiện này thường ngắn, phi ngôn ngữ, có dải tần và dạng năng lượng khác nhau, và có thể chồng lấp nhiều với tiếng ồn nền.

**Phân loại môi trường/cảnh quan** tập trung hơn vào cảnh quan âm thanh (acoustic scene) liên tục: là văn phòng yên tĩnh, đường phố ồn ào, trong xe, ga tàu cao tốc hay quán cà phê? Hệ thống có thể tự động điều chỉnh cường độ khử tiếng ồn, tham số triệt tiếng vang, hướng beam của mảng microphone, thậm chí thay đổi chiến lược tương tác (ví dụ trong xe dùng phản hồi ngắn gọn hơn, trên đường ồn ào tăng âm lượng đầu ra). Trong tình huống IoT, "mạng lưới âm học" gồm nhiều cảm biến âm thanh có thể dùng để giám sát dài hạn và phân tích thống kê trạng thái môi trường.

Về mặt kỹ thuật, cả hai loại tác vụ này đều chủ yếu dùng phương án **phân loại đa nhãn + mô hình hóa chuỗi thời gian**: chuyển đổi âm thanh sang Mel spectrogram, dùng VGGish, PANNs, AST hoặc các mô hình tương tự để trích xuất đặc trưng, rồi dùng pooling chuỗi thời gian hoặc mô hình chuỗi để xuất ra mức kích hoạt của từng nhãn trên trục thời gian. Vì nhiều tập dữ liệu chỉ cung cấp "nhãn cấp đoạn" (weak labels), mô hình thường cần học định vị thời gian của sự kiện dưới giám sát yếu thông qua học đa thực thể, self-attention pooling, v.v.

### 4.3.2 Hiểu Âm Nhạc & Gán Nhãn: Từ "Nhãn Danh Sách Phát" đến "Phân Tích Cấu Trúc"

Trong lĩnh vực âm nhạc, mục tiêu của hiểu âm thanh không chỉ là "đây là bài hát gì" mà còn phải trả lời: **"Bài hát này thuộc phong cách gì? Dùng những nhạc cụ nào? Nhịp độ nhanh hay chậm? Điệu thức và cấu trúc hòa âm tổng thể là gì?"** Những thông tin này vừa hỗ trợ gợi ý âm nhạc và biên soạn danh sách phát, vừa cung cấp "metadata âm nhạc" có cấu trúc cho nhà sáng tác và các mô hình sinh.

Tác vụ **phân loại thể loại** dựa trên đặc trưng âm học tổng thể và cấu trúc bài hát để phân vào các thể loại như pop, rock, cổ điển, hip-hop, electronic, Lo‑Fi, v.v.; **nhận dạng nhạc cụ** phân biệt dấu vân âm thanh của các nhạc cụ khác nhau như trống, bass, guitar, piano, nhạc cụ dây trên đặc trưng thời–tần, có thể dùng cho thống kê nhạc cụ, tìm kiếm âm nhạc và phân tích phối khí. **Phân tích nhịp điệu/điệu thức** ước tính BPM, vị trí phách, nhịp phách, giọng chủ (Key), v.v., cung cấp nền tảng cho khớp nhịp, tự động hòa âm, DJ mixing và đồng bộ nhạc nền game.

Về mặt mô hình, hiểu âm nhạc chủ yếu tái sử dụng các mô hình âm thanh tổng quát (như PANNs, AST), nhưng cũng có nhiều mô hình và embedding tiền huấn luyện chuyên dụng cho truy xuất thông tin âm nhạc (MIR). Cách tiếp cận điển hình là thực hiện **học nhãn âm nhạc đa nhãn** (genre, mood, instrument, era, v.v.) trên tập dữ liệu âm nhạc quy mô lớn để thu được không gian embedding âm nhạc, rồi tinh chỉnh hoặc suy luận zero-shot cho các tác vụ cụ thể nêu trên. Kết hợp các mô hình này, các nền tảng âm nhạc có thể phân loại và gợi ý âm nhạc thông minh hơn, các nền tảng bản quyền có thể tăng cường nhận dạng dấu vân âm nhạc và tìm kiếm tương đồng, còn các công cụ sáng tác có thể tận dụng năng lực hiểu này để gợi ý nhạc đệm phù hợp cho bạn, mở rộng phong cách tương tự hoặc tự động tạo cấu trúc âm nhạc.
## 4.4 Tạo Giọng Nói và Âm Thanh (TTS / VC / Music Generation)

Sau khi hoàn thành các bước "làm sạch", "nhận dạng" và "hiểu" âm thanh, câu hỏi tự nhiên tiếp theo là: **"Liệu chúng ta có thể khiến máy móc trực tiếp 'nói chuyện', 'ca hát' hay thậm chí 'sáng tác nhạc'?"** Đây chính là thế giới của tạo sinh giọng nói và âm thanh: từ văn bản sang giọng nói (TTS), từ giọng nói này sang giọng nói khác (VC / Voice Cloning), đến tạo sinh âm nhạc và hiệu ứng âm thanh ở phạm vi rộng hơn, và cả tổng hợp giọng hát có thể hát lời và giai điệu. Tương tự như tạo sinh hình ảnh, tầng này không chỉ đơn thuần là gán nhãn hay trích xuất cấu trúc từ dữ liệu có sẵn, mà chủ động "sáng tạo" nội dung âm thanh mới.

Ở tầng sản phẩm, khả năng này đã thẩm thấu vào nhiều loại ứng dụng: các dòng sản phẩm giọng nói như OpenAI TTS, ElevenLabs, Volcano Engine, minimax cung cấp giọng nói tổng hợp chất lượng cao cho ứng dụng; các nền tảng tạo nhạc như Suno, Udio cung cấp cho người sáng tạo và ngay cả người dùng thông thường khả năng tạo ra âm nhạc hoàn chỉnh từ văn bản; game, video, virtual streamer và nhân vật số dựa vào các mô hình này để lồng tiếng và hát, giảm đáng kể ngưỡng sản xuất nội dung.

- **Tình huống ứng dụng**
  - Chuyển văn bản thành giọng nói (TTS): đọc tin tức, thông báo điều hướng, phản hồi giọng nói của chatbot, đọc nội dung trong app học tập, đọc màn hình hỗ trợ tiếp cận, v.v. — cần chuyển đổi văn bản tùy ý thành giọng nói tự nhiên, rõ ràng và có thể kiểm soát.
  - Chuyển đổi giọng nói / Voice Cloning (VC / Voice Cloning): trong khi vẫn giữ nguyên ngữ nghĩa và ngữ điệu, thay đổi âm sắc của người nói, thực hiện "đổi giọng" hoặc "nhân bản giọng nói ít mẫu" (trong điều kiện tuân thủ nghiêm ngặt).
  - Tạo sinh âm nhạc và hiệu ứng âm thanh: tạo nhạc nền và hiệu ứng âm thanh phù hợp (âm thanh môi trường, hiệu ứng UI, nhạc chuyển cảnh) cho video ngắn, game, quảng cáo, podcast.
  - Tổng hợp giọng hát và cover: cho trước giai điệu và lời bài hát, để ca sĩ ảo hát, hoặc tạo phiên bản cover theo phong cách/âm sắc nhất định trong điều kiện tuân thủ.
- **Nguyên lý**
  Tạo sinh giọng nói và âm thanh thường áp dụng tư duy mô hình hóa phân tầng **"biểu diễn cấp cao → dạng sóng cấp thấp"**:
  - Trong TTS, trước tiên chuyển văn bản thành chuỗi âm vị/âm tiết/ký tự, sau đó qua mô hình chuỗi-sang-đặc-trưng-âm-học (như Mel spectrogram) (Tacotron, FastSpeech, VITS, v.v.), cuối cùng dùng neural vocoder (WaveNet, WaveRNN, HiFi‑GAN, v.v.) để tạo dạng sóng độ trung thực cao từ đặc trưng.
  - Trong Voice Conversion, bằng cách tách biệt "nói gì (nội dung)" và "ai đang nói (âm sắc)", trích xuất biểu diễn nội dung từ giọng nói nguồn, rồi kết hợp với embedding người nói mục tiêu hoặc điều kiện codec, tạo ra dạng sóng giọng nói mới.
  - Tạo sinh âm nhạc và hiệu ứng có thể dựa trên biểu diễn token hóa (như nốt nhạc, MIDI, token spectrogram/codec đã mã hóa), sử dụng kiến trúc autoregressive, Diffusion hoặc neural codec để lấy mẫu âm thanh mới từ văn bản, âm thanh tham chiếu hoặc tham số cấu trúc.
  - Tổng hợp giọng hát bổ sung vào TTS các điều khiển ngữ điệu, đường cao độ và hát tinh tế hơn, thường mô hình hóa tường minh hoặc tiềm ẩn cao độ, trường độ, legato, vibrato, v.v.
- **Mô hình**
  Các hướng công nghệ chủ đạo hiện tại trong tạo sinh giọng nói và âm thanh bao gồm:
  - TTS: Tacotron / Tacotron2, FastSpeech series (TTS phi autoregressive), VITS, v.v. chịu trách nhiệm từ văn bản đến Mel spectrogram hoặc codec token; WaveNet, WaveRNN, HiFi‑GAN, WaveGlow, v.v. đóng vai trò vocoder hoặc decoder chịu trách nhiệm từ đặc trưng đến dạng sóng. Các mô hình TTS dựa trên Diffusion và Neural Codec gần đây tiếp tục nâng cao độ tự nhiên và đa dạng.
  - Voice Conversion / Cloning: framework VC dựa trên speaker embedding + content encoder, cùng các mô hình chuyển đổi giọng nói sử dụng neural codec, hỗ trợ nhân bản âm sắc ít mẫu và chuyển giao người nói xuyên ngôn ngữ. Công nghệ này hiện đã được nhiều nền tảng thương mại hóa; trong nước phổ biến có Volcano Engine, minimax, iFlytek Open Platform, Baidu Intelligent Cloud Qianfan, Alibaba Cloud Intelligent Speech Interaction; ở nước ngoài có ElevenLabs, Resemble.ai, Play.ht. Trong đó, Voice Cloning của Volcano Engine hỗ trợ huấn luyện nhanh từ ít mẫu âm thanh, phù hợp nhiều kịch bản thương mại như chatbot, sách nói; minimax dựa trên lợi thế công nghệ LLM đạt được sự thích nghi tự nhiên giữa âm sắc nhân bản và nội dung văn bản, đồng thời hỗ trợ chuyển giao âm sắc người nói xuyên ngôn ngữ; Voice Cloning của iFlytek Open Platform có ưu thế rõ rệt về độ rõ phát âm tiếng Trung và khả năng diễn đạt cảm xúc, phục vụ rộng rãi trong lĩnh vực giáo dục, phát thanh truyền hình.
  - Tạo sinh âm nhạc và hiệu ứng: MusicLM, MusicGen, và các mô hình kiểu Suno / Udio, thường dựa trên điều kiện văn bản và/hoặc âm thanh tham chiếu, sử dụng kiến trúc autoregressive hoặc diffusion để tạo âm thanh dài trên discrete codec token.

### 4.4.1 Chuyển Văn Bản Thành Giọng Nói (TTS): Để Máy "Tự Nhiên Lên Tiếng"

**Chuyển văn bản thành giọng nói (TTS)** là tác vụ tạo sinh giọng nói trực quan nhất: đầu vào là một đoạn văn bản, đầu ra là một đoạn giọng nói tự nhiên, mượt mà, trong trạng thái lý tưởng gần như không thể phân biệt với giọng người thật. Hệ thống TTS hiện đại thường gồm hai giai đoạn chính: từ văn bản sang đặc trưng âm học (như Mel spectrogram), và từ đặc trưng âm học sang dạng sóng.

Ở giai đoạn đầu, mô hình cần xử lý các vấn đề như phân tách từ, chuyển đổi âm vị, phân biệt đa âm, dấu câu và ngắt nghỉ, dự đoán ngữ điệu. Các mô hình tiêu biểu gồm Tacotron series dựa trên attention và FastSpeech series dựa trên dự đoán độ dài — loại sau tăng tốc đáng kể tổng hợp và nâng cao độ ổn định nhờ kiến trúc phi autoregressive. Những năm gần đây, các mô hình end-to-end như VITS tích hợp mô hình hóa âm học và vocoder vào một framework thống nhất, đơn giản hóa thêm hệ thống.

Ở giai đoạn thứ hai, neural vocoder như WaveNet, WaveRNN, HiFi‑GAN, WaveGlow, v.v. chịu trách nhiệm chuyển đổi Mel spectrogram hoặc biểu diễn trung gian khác thành dạng sóng độ trung thực cao. Vocoder được huấn luyện tốt không chỉ tạo ra giọng nói tự nhiên, rõ ràng mà còn tái hiện tốt các âm sắc, cảm xúc và phong cách khác nhau. Hệ thống TTS hiện đại còn hỗ trợ **mô hình hóa đa người nói** (thông qua speaker embedding), kiểm soát âm sắc/tốc độ/cảm xúc (như "hưng phấn", "bình tĩnh", "giọng phát thanh"), cũng như TTS đa ngôn ngữ, cung cấp khả năng giọng nói tùy chỉnh cao cho các ứng dụng đa dạng.

### 4.4.2 Chuyển Đổi Giọng Nói và Nhân Bản Giọng: Thay Đổi "Ai Đang Nói"

Trong nhiều kịch bản sáng tạo và hỗ trợ, chúng ta muốn thay đổi âm sắc hoặc phong cách của người nói **mà không thay đổi nội dung và ngữ điệu** — đây chính là tác vụ của **Voice Conversion (VC)** và **Voice Cloning**. Cái trước chủ yếu giải quyết "chuyển lời nói của A thành giọng của B"; cái sau nhấn mạnh thêm "chỉ cần ít mẫu, thậm chí vài câu giọng nói là có thể học được âm sắc mới".

Về mặt kỹ thuật, VC thường dùng phương pháp "tách biệt nội dung–âm sắc": qua một content encoder trích xuất thông tin nội dung và ngữ điệu của giọng nói (có thể là đơn vị rời rạc dựa trên ASR, hoặc biểu diễn liên tục tự giám sát), rồi qua một conditional generator kết hợp với speaker embedding mục tiêu hoặc điều kiện codec, tạo ra giọng nói mới với âm sắc mục tiêu nhưng ngữ nghĩa và nhịp điệu gần như không đổi. Nếu đưa vào neural codec, có thể chỉnh sửa giọng nói trực tiếp trong không gian mã hóa-giải mã, thực hiện chuyển đổi độ trung thực cao.

**Voice Cloning** nhấn mạnh thêm khả năng ít mẫu và tổng quát hóa trên nền tảng VC: mô hình cần trích xuất biểu diễn người nói ổn định từ vài mẫu thậm chí vài giây âm thanh, rồi tạo ra giọng nói tổng hợp nhất quán về phong cách và gần gũi về âm sắc. Khả năng này rất hữu ích trong thiết lập nhân vật ảo, trợ lý cá nhân hóa, tùy chỉnh nhân vật game, tăng tốc lồng tiếng, v.v. — nhưng cũng cần tuân thủ nghiêm ngặt các quy định pháp lý và đạo đức, đảm bảo chỉ sử dụng trong điều kiện được ủy quyền hợp lệ, thông báo đầy đủ và kiểm soát an toàn, tránh lạm dụng hoặc rủi ro mạo danh.

### 4.4.3 Tạo Sinh Âm Nhạc và Hiệu Ứng Âm Thanh: Từ Prompt Đến Toàn Bộ Soundscape

So với tạo sinh giọng nói, **tạo sinh âm nhạc và hiệu ứng âm thanh** phức tạp hơn về mặt cấu trúc và thang thời gian: âm nhạc thường kéo dài hơn, cấu trúc nội tại (đoạn nhạc, giai điệu, hòa âm, nhịp điệu) phong phú hơn; hiệu ứng âm thanh thì đa dạng muôn loại, từ môi trường tự nhiên (tiếng mưa, gió, sóng biển) đến âm thanh bắt chước (click UI, âm thanh thông báo, hiệu ứng kỹ năng game) — mỗi loại có mẫu riêng. Những năm gần đây, các mô hình dựa trên neural codec, sequence modeling và diffusion đã biến "tạo âm nhạc/hiệu ứng hoàn chỉnh từ văn bản" thành hiện thực.

Trong tạo sinh âm nhạc, các mô hình như MusicLM, MusicGen, Suno, Udio thường mã hóa âm thanh thành chuỗi discrete codec token, rồi huấn luyện mô hình sinh có điều kiện văn bản hoặc điều kiện đa phương thức trên không gian rời rạc này. Bạn chỉ cần cung cấp một đoạn mô tả văn bản (ví dụ: "nhạc nền Lo‑Fi nhịp điệu vừa phải, ấm áp chữa lành, phù hợp học tập tập trung", "nhạc phối khí điện tử căng thẳng, phù hợp trailer khoa học viễn tưởng"), hoặc tải lên một đoạn nhạc tham chiếu, mô hình có thể tạo ra âm nhạc chất lượng cao kéo dài hàng chục giây đến vài phút. Với người sáng tạo, đây vừa là nguồn cảm hứng, vừa là công cụ tạo mẫu nhanh và tạo nhạc nền đắc lực.

Trong tạo sinh hiệu ứng âm thanh, công nghệ tương tự có thể tạo hiệu ứng UI, âm thanh thông báo, âm thanh môi trường game từ text prompt, giúp đội ngũ sản phẩm và game nhanh chóng lặp lại thiết kế âm thanh. Kết hợp với khả năng hiểu âm thanh của tầng trước, còn có thể thực hiện căn chỉnh phong cách và thích nghi ngữ cảnh, ví dụ tự động khớp phong cách hiệu ứng âm thanh dựa trên hình ảnh hoặc màn chơi game.

Dù là giọng nói hay âm nhạc và hiệu ứng âm thanh, khả năng ở tầng này đang phát triển nhanh chóng: từ âm thanh máy móc nặng mùi tổng hợp thời kỳ đầu, đến nội dung độ trung thực cao gần như không thể phân biệt với giọng người và âm nhạc chuyên nghiệp ngày nay. Đồng thời, các vấn đề liên quan đến bản quyền, tuân thủ, truy xuất nguồn gốc và khả năng kiểm soát cũng trở nên đặc biệt quan trọng — làm thế nào để vừa cung cấp công cụ sáng tạo mạnh mẽ, vừa bảo vệ quyền lợi hợp pháp của người sáng tạo và người dùng, sẽ là vấn đề then chốt mà tầng công nghệ này cần liên tục đối mặt.

# 5. Video (Video)

Trong hệ thống AI đa phương thức, **phương thức video** chịu trách nhiệm hiểu và tạo sinh "tín hiệu thị giác thay đổi theo thời gian". So với hình ảnh đơn khung, video không chỉ chứa thông tin kết cấu, hình dạng và bố cục trong không gian, mà còn mang những **tín hiệu chiều thời gian** phong phú: sự khởi đầu và kết thúc của hành động, quỹ đạo chuyển động của vật thể, nhịp độ chuyển cảnh, v.v. Dù là nhận diện hành vi trong giám sát an ninh, phân tích động tác trong huấn luyện thể thao, hay chỉnh sửa một chạm trên nền tảng video ngắn, phân tích thông minh video dài — về bản chất tất cả đều dựa vào một bộ khả năng hiểu và tạo sinh xoay quanh "chuỗi khung hình".

Từ góc độ kỹ thuật, khả năng video có thể được chia thành vài tầng: **tăng cường và phục hồi video cơ bản** đảm bảo "có thể nhìn rõ"; **hiểu video và phân tích cấu trúc** trả lời "điều gì đã xảy ra"; trên nền tảng đó, **tác vụ đa phương thức video + ngôn ngữ** chuyển đổi nội dung video thành mô tả cấu trúc và giao diện truy xuất có thể dùng bằng văn bản; xa hơn, **tạo sinh và biên tập video** ngược lại từ văn bản hoặc video mẫu, tạo hoặc tái tổ hợp nội dung video theo cách có kiểm soát; còn một lớp ứng dụng tiêu biểu là **nhân vật số / virtual human** tích hợp giọng nói, ngôn ngữ, hành động và kết xuất video lại với nhau, hình thành dạng thức mới hướng đến tương tác và sản xuất nội dung.

Dưới đây chúng ta cũng xuất phát từ các khả năng phân tầng để hệ thống hóa các năng lực liên quan đến video.
## 5.1 Xử lý video truyền thống: Từ "phát được" đến "đẹp mắt, dễ dùng"

Ở tầng nền tảng nhất của công nghệ video, điều chúng ta quan tâm đầu tiên không phải là "trong khung hình là ai" hay "sự kiện gì đang xảy ra", mà là đoạn video đó có ổn định, rõ nét và thoải mái khi xem hay không: hình ảnh có bị rung không, có bị mờ không, nhiễu nhiều không, tỉ lệ có phù hợp với thiết bị đầu cuối không. **Xử lý video truyền thống** hoạt động chủ yếu ở cấp độ chuỗi khung hình và điểm ảnh không–thời gian, thông qua các thao tác tăng cường, phục hồi, siêu phân giải, nội suy khung hình và đổi tỉ lệ khung hình, nhằm chuyển hóa video thô ồn ào, rung lắc, độ phân giải thấp hoặc tỉ lệ không phù hợp thành "tín hiệu thời gian chất lượng cao" thuận tiện hơn cho việc xem và phân tích về sau. Bạn có thể coi đây là phiên bản tương tự của "phục hồi & tăng cường ảnh + hiệu chỉnh hình học" trong ảnh tĩnh, chỉ khác là ở đây còn có thêm chiều thời gian để làm mượt và đảm bảo tính nhất quán.

Nhìn từ góc độ sản phẩm, tầng năng lực này gần như "tàng hình" đằng sau mọi sản phẩm video: nút tăng chất lượng một chạm trong phần mềm dựng phim, tự động nâng cấp chất lượng của các nền tảng video ngắn, siêu phân giải và nội suy khung hình thông minh trên TV box và trình phát, dịch vụ phục hồi phim cũ, cũng như tiền xử lý đa khung cho các mô hình phát hiện/nhận dạng thượng nguồn — tất cả đều là biểu hiện trực tiếp của xử lý video truyền thống. Dưới đây chúng ta vẫn sẽ phân tích theo ba góc độ **tình huống**, **nguyên lý** và **mô hình**, sau đó triển khai chi tiết ở các mục nhỏ về tăng cường & phục hồi video, siêu phân giải và nội suy khung hình.

- **Tình huống**
  Trong các nền tảng video trực tuyến, công cụ dựng phim, hệ thống giám sát và thiết bị đầu cuối, xử lý video truyền thống xuất hiện trong những tình huống điển hình sau:
  - Nền tảng nội dung & công cụ dựng phim: Video ngắn, video dài khi tải lên hoặc chỉnh sửa được áp dụng tăng chất lượng một chạm, ổn định hình ảnh, chống rung, khử nhiễu, giúp người dùng "cầm điện thoại lên là quay được, quay xong là dùng được ngay"; khi nhập tư liệu video cũ vào dự án dựng phim, việc phục hồi và bổ sung khung hình giúp chúng trông nhất quán với tư liệu mới.
  - Phục hồi phim điện ảnh & phim cũ: Phục hồi kỹ thuật số cho phim nhựa lịch sử, chương trình truyền hình thời kỳ đầu và tư liệu độ phân giải thấp — xóa vết xước, nhiễu và rung lắc, phục hồi màu sắc và chi tiết, cung cấp phiên bản chất lượng cao hơn cho việc tái chiếu, tái phát hành và lưu trữ số.
  - Giám sát video & camera hành trình: Khử nhiễu, khử sương mù, tăng cường độ tương phản và ổn định hình ảnh cho các cảnh giám sát trong điều kiện ánh sáng yếu, mưa sương mù, nén nặng, nâng cao tính bền vững của các mô-đun phát hiện và nhận dạng phía sau, thuận tiện cho việc thu thập bằng chứng và truy vết.
  - Phát trực tiếp trên thiết bị đầu cuối & tăng cường phía thiết bị: TV, set-top box, trình phát trên điện thoại tích hợp sẵn chức năng siêu phân giải và nội suy khung hình tại chỗ, "nâng cấp" nội dung 720p/1080p, 24/30fps hiện có lên hiệu ứng hình ảnh gần với 4K, 60/120fps khi phát.
  - Thích ứng đa thiết bị & phân phối: Để đồng thời phủ được điện thoại màn hình dọc, máy tính bảng màn hình ngang và TV màn hình lớn, cùng một video được xử lý thích ứng ngang/dọc, cắt xén thông minh và đổi tỉ lệ khung hình đa chuẩn, giảm chi phí dựng thủ công và quản lý đa phiên bản.
- **Nguyên lý**
  Xử lý video truyền thống thường không trực tiếp hiểu ngữ nghĩa, mà tập trung mô hình hóa và tối ưu hóa ở cấp tín hiệu không–thời gian xung quanh chất lượng hình ảnh, tính ổn định và tính nhất quán theo thời gian:
  - Mô hình hóa không–thời gian kết hợp: Dựa trên nền tảng tăng cường từng khung đơn lẻ, đưa thêm thông tin chiều thời gian vào, sử dụng ước lượng quang dòng (optical flow), mô hình hóa chuyển động camera hoặc tích chập không–thời gian để biến các khung trước sau thành "quan sát" bổ sung, thực hiện hợp nhất đa khung và triệt nhiễu trên trục thời gian.
  - Ổn định hình ảnh & chống rung: Mô hình hóa rung camera như một chuỗi biến đổi hình học theo thời gian (tịnh tiến, xoay, co giãn, v.v.), ước lượng quỹ đạo chuyển động toàn cục hoặc cục bộ, làm mượt rồi chiếu lại vào video đầu ra, từ đó triệt rung và ổn định hình ảnh.
  - Siêu phân giải video & nội suy khung hình: Siêu phân giải video căn chỉnh và tái tạo chi tiết từ nhiều khung, vừa nâng độ phân giải không gian vừa đảm bảo tính nhất quán theo thời gian; nội suy khung hình ước lượng quang dòng hoặc sử dụng mạng sinh không–thời gian để tổng hợp khung trung gian giữa hai khung, trình bày chuyển động ở tốc độ khung hình cao hơn và tăng độ mượt mà.
  - Đổi tỉ lệ & tự động bố cục: Phát hiện và theo dõi chủ thể (người, vật) trong video, ước lượng quỹ đạo chủ thể theo trục thời gian, kết hợp với tỉ lệ khung hình của độ phân giải mục tiêu để chọn cửa sổ cắt xén phù hợp cho từng khung, và làm mượt chuyển động của cửa sổ cắt xén theo thời gian để đảm bảo cảm quan tự nhiên.
  - Đánh đổi giữa chất lượng & hiệu suất: Xử lý offline trên đám mây có thể theo đuổi chất lượng tối ưu và mô hình phức tạp, còn trong các tình huống điện thoại, trình phát và thời gian thực cần kiểm soát số tham số mô hình, độ phức tạp tính toán và độ trễ, đòi hỏi sự cân bằng tinh tế trong cấu trúc thuật toán và framework suy luận.
- **Mô hình**
  Trong triển khai cụ thể, xử lý video truyền thống kết hợp các phương pháp xử lý tín hiệu video cổ điển với mô hình deep learning, tìm kiếm sự cân bằng giữa hiệu quả, hiệu suất và hình thức triển khai:
  - Phương pháp xử lý video cổ điển: Ổn định và nội suy khung dựa trên optical flow, lọc miền thời gian và hợp nhất đa khung, khử nhiễu và khử artifact nén dựa trên block matching, v.v., vẫn được ứng dụng rộng rãi trong các tình huống hạn chế tài nguyên tính toán hoặc yêu cầu khả năng giải thích cao.
  - Mô hình deep learning phục hồi & tăng cường video: Các mạng siêu phân giải và tăng cường đa khung tiêu biểu như EDVR, BasicVSR / BasicVSR++, phiên bản video của Real‑ESRGAN, thông qua căn chỉnh và tổng hợp đặc trưng không–thời gian, vượt trội rõ rệt so với phương pháp truyền thống trong khử nhiễu, khử mờ, phục hồi chi tiết và khử artifact nén.
  - Mô hình nội suy khung hình deep learning: Các mạng nội suy như DAIN, RIFE, FILM, thông qua ước lượng optical flow tường minh hoặc ngầm định và hợp nhất đặc trưng trung gian để tạo khung xen giữa, ổn định hơn so với phương pháp optical flow + resampling truyền thống trong các tình huống chuyển động phức tạp và bị che khuất.
  - Phục hồi video dựa trên Transformer: Sử dụng attention không–thời gian để xử lý thống nhất kết cấu không gian và phụ thuộc thời gian, có khả năng mô hình hóa mạnh hơn trong các tình huống chuyển động camera phức tạp và cảnh đa vật thể, đồng thời kiểm soát lượng tính toán khi suy luận thông qua cơ chế sparse attention, sliding window, v.v.
  - Sản phẩm & hệ thống thực tế: Tăng cường thông minh của CapCut, phần mềm tăng cường thương mại như Topaz Video Enhance, pipeline tăng cường chất lượng của Bilibili và các nền tảng video ngắn, dịch vụ SaaS phục hồi phim cũ, v.v., thường tầng hóa nhiều mô hình và chiến lược, tự động chọn đường xử lý tối ưu theo loại tư liệu và điều kiện thiết bị đầu cuối.

Nhìn tổng thể, tầng này thiên về việc "đặt nền tảng vật lý và tri giác" cho video trước khi đến ngữ nghĩa: vừa giúp người dùng có trải nghiệm xem thoải mái hơn, vừa cung cấp đầu vào sạch hơn, ổn định hơn cho các mô hình phát hiện, nhận dạng và sinh thượng nguồn. Tiếp theo, chúng ta sẽ lần lượt triển khai theo các hướng nhỏ: **tăng cường & phục hồi video**, **siêu phân giải & nội suy khung hình**, v.v.

### 5.1.1 Tăng cường & phục hồi video: Mài giũa từ "xem được" đến "đẹp mắt"

Trong điều kiện quay thực tế, video thường không "sạch": rung lắc mạnh do cầm tay, nhiễu cao và cảm giác nhòe trong ánh sáng yếu, artifact dạng khối và dải màu do nén mạng, phai màu và vết xước từ thiết bị cũ — tất cả đều khiến chất lượng video thấp hơn nhiều so với lý tưởng. Mục tiêu của tăng cường và phục hồi video là khôi phục tối đa cảm quan ổn định, rõ nét, tự nhiên mà không thay đổi nội dung ngữ nghĩa của video, mài giũa tư liệu "gắng xem được" lên mức "trông dễ chịu, thậm chí đẹp".

Trên trục thời gian, điều đầu tiên tăng cường và phục hồi cần giải quyết là vấn đề ổn định. Thông qua khớp đặc trưng hoặc ước lượng quang dòng trên các khung liên tiếp, có thể tách chuyển động camera toàn cục ra khỏi chuyển động vật thể cục bộ, rồi sử dụng quỹ đạo camera đã được làm mượt để kết xuất lại khung đầu ra, từ đó triệt tiêu rung nhanh và lắc nhẹ, tránh gây cảm giác chóng mặt cho người xem. Trên cơ sở đó, khử nhiễu, khử mờ và khử artifact ở cấp khung hình tập trung nhiều hơn vào mô hình hóa không gian–thời gian kết hợp: khử nhiễu đa khung khai thác thông tin dư thừa từ các khung trước sau, thực hiện xử lý tương tự "hợp nhất đa phơi sáng" theo chiều thời gian, vừa giữ được chi tiết kết cấu vừa hiệu quả triệt nhiễu ISO cao và nhiễu nén; với mờ chuyển động nhẹ, ước lượng nhân mờ hoặc sử dụng mạng deep learning đầu-cuối-đến-đầu-cuối để thực hiện xử lý làm nét kiểu deconvolution trên chuỗi khung hình, giúp nền tĩnh và chủ thể chuyển động đều sắc nét hơn.

Đối với phim cũ và tư liệu chất lượng thấp, phục hồi còn bao gồm "tái tạo" ở cấp màu sắc và cấu trúc. Phim nhựa lão hóa dẫn đến hình ảnh ngả vàng, độ tương phản giảm, vết xước và đốm bẩn cục bộ rõ rệt; video số thời kỳ đầu thường có độ phân giải thấp, nén nặng và răng cưa ở cạnh. Quy trình phục hồi hiện đại thường dùng nhiều bước phối hợp: đầu tiên dùng mô hình phát hiện và phân đoạn để xác định vị trí các vùng hư hỏng cục bộ như vết xước, đốm bẩn, rồi dùng mạng bổ sung không–thời gian để "mượn liệu lấp chỗ trống" từ các khung lân cận và pixel không gian lân cận; đồng thời phục hồi màu sắc và định hình lại độ tương phản để tông màu tổng thể tiệm cận với tham chiếu phong cách gốc hoặc đã định. Với video bị nén nặng, còn đưa thêm mạng khử artifact chuyên dụng cho hiệu ứng khối và artifact vòng, cải thiện cạnh và chi tiết mà không làm mượt quá mức.

Trong sản phẩm, các năng lực tăng cường và phục hồi này thường thể hiện dưới dạng "một chạm": người dùng chỉ cần tích chọn "ổn định hình ảnh", "tăng cường chất lượng" hoặc "phục hồi video cũ", hệ thống sẽ tự động chọn tổ hợp mô hình và tham số phù hợp ở phía sau, xử lý chuỗi khung hình qua nhiều giai đoạn. Với doanh nghiệp, tầng này vừa quyết định trực tiếp đánh giá chủ quan của khán giả về chất lượng hình ảnh, vừa gián tiếp ảnh hưởng đến hiệu suất của các mô hình phân tích thượng nguồn: đầu vào video sạch hơn, ổn định hơn thường đồng nghĩa với nhận dạng khuôn mặt/biển số xe đáng tin cậy hơn, phát hiện hành vi chính xác hơn và ít cảnh báo giả hơn.

### 5.1.2 Siêu phân giải & nội suy khung hình: Từ "nhìn rõ được" đến "mượt mà hơn"

Trong bối cảnh thiết bị hiển thị liên tục nâng cấp và yêu cầu của người dùng về chi tiết và độ mượt ngày càng cao, lượng lớn nội dung video hiện có đang "thiếu hụt bẩm sinh" về độ phân giải và tốc độ khung hình: 1080p trông không đủ sắc nét trên màn hình 4K, 24/30fps dễ gây hiệu ứng kéo dài hoặc giật trên màn hình lớn và cảnh chuyển động nhanh. Công nghệ siêu phân giải và nội suy khung hình ra đời để giải quyết hai vấn đề này: cái trước "bổ sung chi tiết" theo chiều không gian, cái sau "bổ sung quá trình" theo chiều thời gian, cùng nhau nâng video "gắng nhìn rõ được" lên cảm quan "chi tiết phong phú, phát mượt mà".

Siêu phân giải video so với siêu phân giải ảnh đơn có thêm một chiều quan trọng: thời gian. Phóng to từng khung đơn giản dễ dẫn đến chi tiết không nhất quán giữa các khung liền kề, xuất hiện nhấp nháy và kết cấu rung. Do đó, các phương pháp chủ lưu đều khai thác thông tin từ nhiều khung trước sau, thông qua ước lượng optical flow hoặc căn chỉnh ở cấp đặc trưng để căn chỉnh chi tiết từ các khung lân cận vào khung mục tiêu, rồi mới tái tạo chi tiết sau khi căn chỉnh. Các mô hình như EDVR, BasicVSR / BasicVSR++, phiên bản video của Real‑ESRGAN sẽ căn chỉnh và tổng hợp đa khung trong không gian đặc trưng, rồi dùng mạng sâu để suy luận chi tiết độ phân giải cao, tránh cảm giác "mờ" và "như nhựa" do nội suy đơn giản. Trong quá trình này, cách cân bằng giữa "hợp lý vật lý" và "đẹp về cảm quan" là cốt lõi của thiết kế hàm mất mát và chiến lược huấn luyện: vừa phải cải thiện chỉ số khách quan (như PSNR, SSIM), vừa đảm bảo cảm quan chủ quan tự nhiên, không bị quá nét và không có chi tiết giả.

Nội suy khung hình tập trung vào "bổ sung khung" trên trục thời gian. Phương pháp truyền thống dựa vào ước lượng optical flow — dự đoán chuyển động của từng pixel giữa hai khung liền kề, rồi theo quy tắc nhất định nội suy tạo khung mới ở vị trí trung gian. Tuy nhiên trong vùng chuyển động nhanh, nhiều vật thể che khuất hoặc kết cấu phức tạp, optical flow thường không đủ chính xác, dễ xuất hiện kéo dài, bóng ma hoặc biến dạng cục bộ. Các mô hình nội suy deep learning như DAIN, RIFE, FILM thông qua mạng đầu-cuối-đến-đầu-cuối học đồng thời chiến lược hợp nhất optical flow, độ sâu hoặc đặc trưng trung gian, trực tiếp xuất khung nội suy, cải thiện rõ rệt độ ổn định và chất lượng thị giác trong cảnh phức tạp. Với thể thao, video gameplay và sáng tác slow motion, nội suy khung hình có thể nâng mượt video gốc 24/30fps lên 60/120fps, vừa giữ nguyên chi tiết chuyển động vừa giảm giật và bóng mờ.

Trong thực tiễn kỹ thuật, siêu phân giải và nội suy khung hình thường được kết hợp sử dụng: nội suy thời gian trước cho nội dung hiện có độ phân giải thấp, tốc độ khung hình thấp, rồi siêu phân giải không gian sau, hoặc cả hai được triển khai tích hợp trong một mạng không–thời gian thống nhất. Về hình thức triển khai, xử lý offline trên đám mây phù hợp với phục hồi điện ảnh và dịch vụ "nâng cấp chất lượng" cấp nền tảng đòi hỏi chất lượng cực cao, còn suy luận thời gian thực phía thiết bị xuất hiện nhiều hơn trong TV box, trình phát App và camera thể thao/hành động, cần nén mô hình và tăng tốc phần cứng để đảm bảo độ trễ thấp. Dù thể hiện dưới hình thức nào, siêu phân giải và nội suy khung hình đã trở thành hạ tầng quan trọng của "trải nghiệm HD/UHD", giúp nội dung cũ "hồi sinh" trên các thiết bị đầu cuối mới.
## 5.2 Hiểu Video và Phân Tích Cấu Trúc (Video Understanding)

Nếu như xử lý video truyền thống phần lớn dừng lại ở mức "chất lượng hình ảnh và độ ổn định", thì **hiểu video và phân tích cấu trúc** bắt đầu trả lời câu hỏi ngữ nghĩa kiểu "điều gì đang xảy ra trong video": ai đang làm gì, ở đâu, kéo dài bao lâu, có tồn tại hành vi bất thường hay không. Mục tiêu ở đây là phân tách video theo trục thời gian một cách có cấu trúc: nhận diện hành động và hành vi, phát hiện và theo dõi đối tượng, phân tách tiền cảnh và hậu cảnh, phân chia cảnh và cảnh quay, đồng thời trích xuất các tín hiệu ngữ nghĩa cấp cao phục vụ cho việc ra quyết định, tìm kiếm và cảnh báo ở các tầng downstream.

Từ góc độ sản phẩm, lớp năng lực này đã đi sâu vào các nền tảng an ninh thông minh, hệ thống phân tích huấn luyện thể thao, camera hành trình thông minh và hệ thống phân tích video kiểm tra chất lượng công nghiệp: nhận diện ẩu đả, ngã, lang thang và các hành vi bất thường trong giám sát; phân tích tính chuẩn mực của động tác và các chi tiết kỹ thuật trong các kịch bản thể thao và thể dục; theo dõi quỹ đạo phương tiện và người trong môi trường giao thông và công nghiệp, giám sát quy trình sản xuất có bình thường hay không. Dưới đây vẫn sắp xếp loại năng lực này từ ba góc độ **kịch bản**, **nguyên lý** và **mô hình**, đồng thời mở rộng chi tiết một số hướng đại diện trong các mục nhỏ tiếp theo.

- **Kịch bản**
  - An ninh và an toàn công cộng: Trong giám sát đô thị, khu vực và tòa nhà, nhận diện các hành vi như ẩu đả, ngã, tụ tập, chạy, trèo qua hàng rào, cảnh báo sớm các mẫu bất thường như lang thang, ở lại đêm khuya.
  - Giao thông và di chuyển: Phát hiện và theo dõi quỹ đạo của người đi bộ, phương tiện, xe đạp tại ngã tư, hầm đường bộ và cao tốc, phân tích các hành vi vượt đèn đỏ, đi ngược chiều, lấn làn, vượt tốc độ, cung cấp cơ sở cho quản lý giao thông và truy vết tai nạn.
  - Thể thao và huấn luyện vận động: Phân tích các giai đoạn chính và chất lượng tư thế của các động tác như ném bóng rổ, giao bóng tennis, các tư thế yoga, cung cấp phân tích kỹ thuật và gợi ý sửa lỗi cho vận động viên và người dùng đại chúng.
  - Sản xuất công nghiệp và kiểm tra chất lượng: Giám sát các bước thao tác trên dây chuyền sản xuất có chuẩn mực không, phát hiện trong quá trình lắp ráp có tồn tại thiếu lắp, lắp sai hoặc động tác bất thường không, cung cấp dữ liệu cơ bản cho an toàn sản xuất và nâng cao tỉ lệ hợp lệ.
  - Cấu trúc hóa nội dung và tìm kiếm: Thực hiện phân tách cảnh quay, phân loại cảnh và đánh dấu đoạn quan trọng cho video dài, cung cấp chỉ mục có cấu trúc cho việc tìm kiếm, đề xuất và biên tập tiếp theo.
- **Nguyên lý**
  Điểm mấu chốt của hiểu video và phân tích cấu trúc là mô hình hóa chung các đối tượng không gian và ngữ nghĩa trên chiều thời gian:
  - Nhận diện hành động và phân tích hành vi: Dựa trên tích chập 2D/3D, pooling thời gian hoặc Transformer, mã hóa tổng thể một đoạn video và nhận diện loại hành động xảy ra trong đó; các phương pháp nâng cao kết hợp chuỗi điểm khớp cơ thể người và tô pô xương để phân tích chất lượng và mẫu động tác ở mức độ chi tiết hơn.
  - Phát hiện và theo dõi đối tượng: Trong khi thực hiện phát hiện trên từng khung hình, giới thiệu cơ chế liên kết xuyên khung (đặc trưng ngoại hình, quỹ đạo chuyển động, v.v.), chuỗi các hộp phát hiện của cùng một đối tượng tại các thời điểm khác nhau thành quỹ đạo liên tục, thu được kết quả theo dõi đa đối tượng.
  - Phân tách ngữ nghĩa video và phân tích cảnh: Thực hiện phân tách ngữ nghĩa hoặc phân tách thực thể ở cấp độ pixel cho từng khung hình trong video, đồng thời sử dụng tính liên tục thời gian để làm mượt dự đoán; đồng thời phát hiện các điểm chuyển cảnh và ranh giới cảnh, thực hiện phân tách cấu trúc video dài.
  - Phát hiện sự kiện cấp cao và bất thường: Trên cơ sở các đặc trưng hành động và quỹ đạo cơ bản, sử dụng các phương pháp mô hình hóa thời gian và nhận dạng mẫu để phát hiện các sự kiện hiếm gặp và mẫu bất thường, thường kết hợp học không giám sát hoặc học yếu giám sát để giảm thiểu vấn đề thiếu nhãn.
- **Mô hình**
  Trong lựa chọn mô hình, hiểu video và phân tích cấu trúc thường sử dụng kiến trúc kết hợp "đặc trưng không gian + mô hình hóa thời gian":
  - Các mô hình cổ điển dựa trên tích chập 3D và Two‑Stream như I3D, thực hiện nhận diện hành động end-to-end cho các đoạn video ngắn bằng cách tích chập đồng thời trên chiều không gian và thời gian.
  - Các mô hình dòng SlowFast dựa trên đa đường dẫn và đa tỉ lệ thời gian, sử dụng đường dẫn chậm để nắm bắt ngữ nghĩa và đường dẫn nhanh để nắm bắt chi tiết chuyển động, đạt được cân bằng tốt hơn giữa khối lượng tính toán và độ chính xác.
  - Các mô hình video dựa trên Transformer như TimeSformer, Video Swin Transformer, sử dụng cơ chế chú ý không-thời gian để mô hình hóa video trong phạm vi thời gian dài, phù hợp hơn để nắm bắt các sự kiện phức tạp và tương tác đa chủ thể.
  - Các bộ phát hiện dựa trên Tube và mô hình tích chập không-thời gian / Transformer, mở rộng hộp phát hiện theo thời gian thành "tube", thực hiện phát hiện hành vi và phân tách không-thời gian trên đặc trưng kết hợp không gian–thời gian.
  - Các phương pháp theo dõi đa đối tượng (MOT) như DeepSORT, kết hợp kết quả phát hiện cấp khung hình với nhúng ngoại hình và dự đoán chuyển động để ổn định liên kết danh tính đối tượng trong video.

Tổng thể, lớp năng lực này trừu tượng hóa video từ "luồng pixel chất lượng cao" thành "luồng hành vi và sự kiện", đặt nền tảng cấu trúc cho việc hiểu đa phương thức, tìm kiếm và ra quyết định ở tầng trên. Dưới đây, chúng ta sẽ mở rộng từ ba hướng: **nhận diện hành động và phân tích hành vi**, **phát hiện và theo dõi đối tượng**, **phát hiện sự kiện và bất thường**.

### 5.2.1 Nhận Diện Hành Động và Phân Tích Hành Vi: Từ Chuỗi Khung Hình đến "Ai Đang Làm Gì"

Nhận diện hành động và phân tích hành vi quan tâm đến "trong một cửa sổ thời gian, chủ thể đang làm gì". Trong kịch bản an ninh, điều này có nghĩa là nhận diện từ video các hành vi như "đi bộ, chạy, ngã, ẩu đả"; trong thể thao và thể dục, thì tương ứng với "ném bóng, giao bóng, squat có chuẩn không", "tư thế yoga có đúng không" và các động tác chi tiết hơn. Về mặt kỹ thuật, các phương pháp ban đầu chủ yếu dựa vào tích chập 2D + optical flow hoặc đặc trưng thủ công, xếp chồng một số khung hình để phân loại tổng thể; các phương pháp hiện đại sử dụng nhiều hơn tích chập 3D (I3D, các biến thể 3D ResNet), cấu trúc đa tỉ lệ thời gian như SlowFast, hoặc các mô hình dựa trên chú ý không-thời gian như TimeSformer, Video Swin Transformer, để mô hình hóa chung kết cấu không gian và thay đổi thời gian.

Trong nhiều kịch bản yêu cầu phân tích tư thế độ chính xác cao, việc phân loại trực tiếp đoạn RGB là không đủ, mà còn kết hợp ước lượng tư thế cơ thể người và mô hình hóa chuỗi xương: trước tiên trích xuất các điểm khớp 2D/3D từ từng khung hình, sau đó đưa chuỗi điểm khớp vào mạng RNN, tích chập thời gian hoặc GCN/Transformer để phân tích cấu trúc thời gian và sự phối hợp không gian của động tác. Cách tiếp cận "ưu tiên tư thế + mô hình hóa thời gian" này có tính bền vững hơn với sự thay đổi về nền, ánh sáng và trang phục, phù hợp với các ứng dụng có yêu cầu cao về chi tiết động tác như yoga, thể dục, đánh giá tính chuẩn mực thao tác công nghiệp.

### 5.2.2 Phát Hiện và Theo Dõi Đối Tượng: Từ "Ở Đâu Trong Khung Hình Này" đến "Toàn Bộ Quỹ Đạo"

Phát hiện đối tượng đơn khung có thể cho bạn biết "trong khung hình này có những đối tượng nào, ở đâu", trong khi nhiều nhiệm vụ trong thực tế cần "chiếc xe này / người này đến từ đâu, đi đến đâu, đã làm gì ở giữa". Mô-đun phát hiện và theo dõi đối tượng chính là để chuỗi các phát hiện cấp khung hình thành quỹ đạo liên tục theo thời gian: một mặt chạy bộ phát hiện trên từng khung hình để đưa ra các hộp đối tượng ứng viên; mặt khác dựa trên các gợi ý như đặc trưng ngoại hình (nhúng ReID), dự đoán chuyển động (bộ lọc Kalman) và độ chồng lấp không gian để khớp và liên kết các hộp trên các khung hình liền kề, thu được kết quả theo dõi đa đối tượng (MOT).

Trong thực tiễn kỹ thuật, một pipeline điển hình là "phát hiện người đi bộ/phương tiện mạnh mẽ + thuật toán liên kết kiểu DeepSORT", được triển khai trên camera giám sát hoặc camera hành trình, xuất ra quỹ đạo chuyển động của từng ID theo thời gian thực. Trong các hệ thống phức tạp hơn, các quỹ đạo này còn được kết hợp với ngữ nghĩa khu vực (làn đường, phân vùng) và các quy tắc nghiệp vụ để suy luận thêm các mẫu hành vi cấp cao như đi ngược chiều, dừng đỗ lâu dài, ra vào thường xuyên, cung cấp tín hiệu thời gian liên tục cho an ninh upstream, phân tích lưu lượng giao thông và giám sát quy trình công nghiệp.

### 5.2.3 Phát Hiện Sự Kiện và Bất Thường: Tìm Ra "Điều Không Ổn" Trong "Mẫu Bình Thường"

Trong hầu hết các kịch bản nghiệp vụ, những gì thực sự cần được chú ý trọng điểm thường là "thiểu số bất thường" và "sự kiện quan trọng": ví dụ ẩu đả, ngã, tụ tập trong an ninh, dừng máy bất thường hoặc thao tác vi phạm trong sản xuất công nghiệp, hành vi lái xe nguy hiểm trong giao thông, v.v. Các sự kiện loại này tương đối hiếm gặp, chi phí gán nhãn cao, mẫu cực kỳ mất cân bằng, gây ra thêm thách thức cho việc xây dựng mô hình.

Cách làm phổ biến là xây dựng một mô-đun phát hiện bất thường thời gian trên cơ sở nhận diện hành động, theo dõi đối tượng và phân tách cảnh cơ bản: hoặc trực tiếp học ít mẫu bất thường đã được gán nhãn theo phương pháp có giám sát; hoặc áp dụng phương pháp không giám sát/yếu giám sát, mô hình hóa phân phối chuyển động và hành vi của "mẫu bình thường", một khi quan sát mới lệch rõ rệt so với phân phối lịch sử thì phát ra cảnh báo. Ở cấp độ mô hình, sẽ kết hợp bộ mã hóa tự động thời gian, học đối chiếu, mạng nơ-ron đồ thị hoặc Transformer thời gian, mã hóa thống nhất quan hệ không gian và phụ thuộc thời gian, từ đó nắm bắt các mẫu hành vi nhóm phức tạp hơn và phụ thuộc tầm xa.
## 5.3 Nhiệm vụ đa phương thức Video + Ngôn ngữ (Video‑Language)

Nếu như hiểu video giải quyết vấn đề "hiểu rõ bản thân video", thì **nhiệm vụ đa phương thức Video + Ngôn ngữ** tập trung vào "cách dùng ngôn ngữ tự nhiên để mô tả, hỏi đáp, tìm kiếm nội dung video", cũng như "cách định vị nhanh thông tin quan trọng trên trục thời gian của video dài theo yêu cầu văn bản". Loại nhiệm vụ này cần xử lý đồng thời tín hiệu hình ảnh, giọng nói và văn bản: một mặt trích xuất đặc trưng hình ảnh và âm thanh trong video, mặt khác kết nối với khả năng suy luận và sinh ngôn ngữ của LLM, nén nội dung không-thời gian thành bản tóm tắt văn bản, kết quả hỏi đáp và chỉ mục ngữ nghĩa phù hợp cho cả người dùng lẫn hệ thống máy móc.

Nhìn từ góc độ sản phẩm, tầng năng lực này đã đi sâu vào các tình huống như: tự động tạo phụ đề và trục thời gian cho video dài, "đánh dấu thông minh / trích xuất đoạn key" trên nền tảng cắt ghép video ngắn, trợ lý hỏi đáp cho video đào tạo doanh nghiệp và hội họp — người dùng không còn phải "xem từ đầu đến cuối" mà có thể trực tiếp tìm kiếm, đặt câu hỏi và tái cấu trúc nội dung video bằng ngôn ngữ tự nhiên. Dưới đây chúng ta vẫn triển khai theo ba góc độ **tình huống**, **nguyên lý** và **mô hình**.

- **Tình huống**
  - Tạo phụ đề và tóm tắt: Tự động tạo phụ đề đa ngôn ngữ cho khóa học, bài diễn thuyết, hội họp và video dài, đồng thời tạo tóm tắt theo chương, danh sách điểm hay và trục thời gian.
  - Hỏi đáp video và truy cập tri thức: Xây dựng "trợ lý hỏi đáp video" cho video giảng dạy, video hướng dẫn thao tác, nội dung đào tạo doanh nghiệp — hỗ trợ người dùng đặt câu hỏi bằng ngôn ngữ tự nhiên như "bước này làm thế nào" hay "cuối cùng người này để điện thoại ở đâu".
  - Tìm kiếm nội dung video và định vị đoạn phim: Hỗ trợ tìm kiếm chính xác "văn bản → đoạn video" trong thư viện video quy mô lớn, ví dụ "tìm phần đề cập đến giá cả", "tìm đoạn giải thích công thức nào đó"; tự động đánh dấu đoạn hay và thông tin quan trọng trong một video dài.
  - Hỗ trợ sản xuất và biên tập nội dung: Kết hợp hiểu nội dung video với chức năng sinh ngôn ngữ, tự động tạo tiêu đề, văn bản, kịch bản phân cảnh, hỗ trợ creator nhanh chóng cắt ghép và tái cơ cấu tư liệu.
- **Nguyên lý**
  Cốt lõi của hệ thống đa phương thức Video–Ngôn ngữ là căn chỉnh đặc trưng hình ảnh chuỗi thời gian với biểu diễn văn bản trong không gian nhúng thống nhất, từ đó thực hiện tìm kiếm, sinh và suy luận:
  - Trích xuất và căn chỉnh đặc trưng đa phương thức: Trích xuất đặc trưng không-thời gian từ khung hình/đoạn video (CNN/ViT/Video Transformer), trích xuất nhúng ngôn ngữ từ văn bản (LLM tiền huấn luyện hoặc bộ mã hóa văn bản), căn chỉnh hai phương thức thông qua học tương phản hoặc tiền huấn luyện đa phương thức.
  - Pipeline giọng nói và văn bản: Với nội dung có giọng nói, thường dùng ASR để tạo trước văn bản chuyển đổi căn chỉnh theo dấu thời gian, rồi kết hợp mô hình hóa với đặc trưng hình ảnh — vừa có thể dùng văn bản trực tiếp để tìm kiếm, vừa có thể đối chiếu đa phương thức và hiệu chỉnh lỗi.
  - Mô hình hóa thời gian và định vị đoạn phim: Với video dài, cần học biểu diễn "cấp đoạn phim" trên trục thời gian, chuyển đổi động giữa đoạn cục bộ và ngữ cảnh toàn cục qua attention hoặc RAG chuỗi thời gian, thực hiện định vị chính xác khoảng thời gian liên quan đến câu hỏi.
  - Sinh và suy luận: Kết nối LLM vào biểu diễn đa phương thức đã căn chỉnh để thực hiện sinh ngôn ngữ tự nhiên (phụ đề, tóm tắt, giải thích), hoặc thực hiện hỏi đáp đa lượt và suy luận logic.
- **Mô hình**
  Về hình thái mô hình, nhiệm vụ đa phương thức Video–Ngôn ngữ đã trải qua quá trình tiến hóa từ "bộ mã hóa chuyên dụng + đầu đơn giản" đến "mô hình lớn đa phương thức thống nhất":
  - Mô hình Video–Ngôn ngữ sơ khai: Như VideoBERT, kết hợp mô hình hóa token hình ảnh và văn bản trong giai đoạn tiền huấn luyện, thu được biểu diễn Video–Ngôn ngữ có thể chuyển giao thông qua dự đoán có mặt nạ và học tương phản.
  - All‑in‑One Video‑Language Models: Tích hợp thống nhất video, văn bản (và giọng nói) vào một Transformer đa phương thức duy nhất, thực hiện xử lý đa nhiệm thống nhất gồm sinh mô tả, tìm kiếm, QA thông qua tham số chia sẻ hoặc chia sẻ một phần.
  - Mô hình đa phương thức video dài: Như Gemini, Claude, GPT có khả năng xử lý video — thông qua ngữ cảnh dài và mô hình hóa chuỗi thời gian phân cấp, hiểu toàn diện video hàng chục phút đến hàng giờ, hỗ trợ tóm tắt và hỏi đáp ở cấp độ trục thời gian.
  - RAG chuỗi thời gian + VLM: Xây dựng "chỉ mục vector chuỗi thời gian" trên video — dùng VLM mã hóa các đoạn video để lập cơ sở dữ liệu offline, khi truy vấn tìm kiếm đoạn liên quan, kết hợp LLM tổng hợp câu trả lời và thực hiện suy luận có thể giải thích.

Nhìn chung, tầng này đưa video từ "máy hiểu" lên cấp độ "đối thoại và cộng tác người-máy": bạn có thể hỏi video như hỏi một người, còn hệ thống thực hiện căn chỉnh và suy luận phức tạp về hình ảnh, giọng nói và ngôn ngữ ở phía sau.

### 5.3.1 Phụ đề, tóm tắt và trục thời gian: Nén video dài thành văn bản có thể duyệt

Đối với video khóa học, bài giảng, hội họp và nội dung dài, nhu cầu cấp thiết nhất thường là "biết nhanh nội dung gì được trình bày, đâu là điểm quan trọng" thay vì xem hoàn toàn từ đầu đến cuối. Hệ thống phụ đề và tóm tắt tự động thông qua tổ hợp "ASR + xử lý văn bản + hỗ trợ hình ảnh" chuyển đổi nội dung âm thanh thành văn bản căn chỉnh theo dấu thời gian, rồi tạo ra đề cương có cấu trúc và tóm tắt súc tích, thực hiện nén thông tin từ "video cấp giờ" xuống "đọc cấp phút".

Ở tầng triển khai, module ASR chịu trách nhiệm cung cấp chuyển đổi đa ngôn ngữ ổn định, chất lượng cao và căn chỉnh trục thời gian; phía văn bản thì dùng LLM để hiệu chỉnh lỗi, tách câu và tái cơ cấu ngữ nghĩa văn bản chuyển đổi gốc, trích xuất tiêu đề chương, thông tin quan trọng và các cặp hỏi-đáp. Trong một số tình huống, còn kết hợp thêm gợi ý hình ảnh (như thay đổi trang slide, chuyển cảnh) để hỗ trợ phân định ranh giới chương và đoạn quan trọng, đảm bảo cấu trúc tóm tắt nhất quán hơn với nhịp nội dung thực tế.

### 5.3.2 Hỏi đáp video và tìm kiếm ngữ nghĩa: "Điều khiển" video bằng ngôn ngữ tự nhiên

Vượt lên trên phụ đề và tóm tắt, nhu cầu tiến xa hơn là có thể hỏi đáp và tìm kiếm đối với nội dung video cụ thể: ví dụ "cuối cùng người này để điện thoại ở đâu", "đoạn nào đề cập đến chiến lược giá", "phút thứ mấy trình diễn bước này". Loại nhiệm vụ này cần định vị ngữ nghĩa câu hỏi trên trục thời gian: vừa phải hiểu nhân vật, đồ vật và hành động liên quan trong câu hỏi, vừa phải tìm đoạn tương ứng trong biểu diễn chuỗi thời gian của video.

Về cách làm cụ thể, thường xây dựng offline chỉ mục đa độ hạt cho video: trích xuất biểu diễn đa phương thức (hình ảnh + văn bản/giọng nói) cho các đoạn có độ dài cố định, xây dựng chỉ mục vector hoặc cấu trúc đồ thị. Khi tương tác online, mã hóa câu hỏi của người dùng thành vector văn bản, so khớp với biểu diễn đoạn phim trong chỉ mục để tìm khoảng thời gian liên quan nhất; sau đó gửi nội dung của các đoạn này (mô tả ảnh chụp khung hình quan trọng, văn bản chuyển đổi, v.v.) cùng câu hỏi vào LLM, để mô hình sinh câu trả lời ngôn ngữ tự nhiên hoặc trả về thời điểm tương ứng. Với thư viện video quy mô lớn, có thể hỗ trợ "tìm kiếm xuyên video" theo cơ chế tương tự, ví dụ tìm kiếm đoạn liên quan trong cơ sở tri thức đào tạo doanh nghiệp hoặc video sản phẩm thương mại điện tử.

### 5.3.3 Hỗ trợ biên tập đa phương thức: Từ hiểu biết đến "giúp bạn cắt xong"

Khi hệ thống có thể hiểu ổn định nội dung và cấu trúc ngữ nghĩa trong video, bước tiếp theo tự nhiên là tận dụng ngược lại những kết quả hiểu biết này để hỗ trợ sáng tạo và biên tập. Mô hình đa phương thức Video–Ngôn ngữ có thể dựa trên kịch bản hoặc prompt do creator cung cấp, tự động chọn lọc đoạn phù hợp ngữ nghĩa từ tư liệu hiện có, tạo timeline cắt thô; cũng có thể dựa trên nội dung video tự động tạo tiêu đề, văn bản thumbnail, nhãn chương, thậm chí đề xuất về nhịp độ góc máy và nhạc nền.

Trong quy trình làm việc, loại năng lực này thường xuất hiện dưới dạng "đề xuất thông minh" và "cắt thô tự động": sau khi creator tải lên tư liệu, hệ thống tự động hoàn thành phân tích, phân cảnh, đánh dấu và đưa ra một số phiên bản ứng viên (như các phương án cắt ghép với nhịp độ khác nhau, độ dài khác nhau); creator có thể tinh chỉnh trên cơ sở đó mà không cần bắt đầu từ đầu chọn lọc từng khung hình. Với ứng dụng cấp doanh nghiệp, hệ thống còn có thể kết hợp cơ sở tri thức và quy chuẩn thương hiệu, đảm bảo văn bản, phụ đề và phong cách cắt ghép được tạo ra phù hợp với yêu cầu nghiệp vụ và tiêu chuẩn tuân thủ đã định.
## 5.4 Tạo và Chỉnh Sửa Video (Video Generation & Editing)

Sau khi đã có khả năng hiểu và phân tích cấu trúc ổn định, **tạo và chỉnh sửa video** tiến lên giai đoạn "chủ động sáng tạo nội dung": không chỉ nâng cao chất lượng hình ảnh hay phân tích cấu trúc, mà còn dựa trên kịch bản văn bản, hình ảnh tham chiếu hoặc video có sẵn để tạo ra các cảnh quay hoàn toàn mới, hoặc thực hiện chỉnh sửa và sắp xếp lại video gốc một cách có cấu trúc. Phạm vi này bao gồm cả Text‑to‑Video (tạo video từ văn bản từ đầu), lẫn chuyển đổi phong cách, mở rộng và sắp xếp lại dựa trên hình ảnh/video có sẵn, cũng như chỉnh sửa và thay thế chi tiết ở cấp độ đối tượng.

Về sản phẩm, tầng năng lực này đã đi vào dòng chính của sáng tạo nội dung thông qua hàng loạt sản phẩm như Jimeng Video, MiniMax Video, Sora, Runway Gen‑2, Pika, Kling…: quảng cáo, video concept, hoạt hình, storyboard kịch bản có thể được tạo ra nhanh chóng mà không cần đội ngũ quay phim lớn hay hậu kỳ phức tạp; người sáng tạo có thể điều khiển góc máy và phong cách bằng kịch bản ngôn ngữ tự nhiên; quy trình dựng phim truyền thống bắt đầu tích hợp sâu với các công cụ tạo sinh có cấu trúc. Dưới đây vẫn được trình bày theo góc độ **tình huống**, **nguyên lý** và **mô hình**.

- **Tình huống**
  - Từ nội dung, kịch bản đến video ngắn: quảng cáo thương hiệu, tiểu phẩm, đoạn phim kịch tính và hoạt hình concept được tự động hoặc bán tự động tạo thành bản thảo video có thể phát dựa trên kịch bản.
  - Từ hình ảnh/video sang video: tạo phiên bản động cho minh họa hoặc thiết kế nhân vật, chuyển đổi phong cách cho cảnh quay thực (thực tế → anime/minh họa), hoặc mở rộng/sắp xếp lại video hiện có theo chiều thời gian và không gian.
  - Chỉnh sửa có cấu trúc và hậu kỳ: trong khi vẫn giữ nguyên ngữ nghĩa tổng thể, thực hiện các thao tác tinh tế như đổi mặt nhân vật, đồng bộ khẩu hình, xóa và thay thế đối tượng, sắp xếp lại cắt ghép theo kịch bản văn bản.
- **Nguyên lý**
  Các phương pháp tạo và chỉnh sửa video chủ đạo hiện nay phần lớn lấy mô hình khuếch tán (Diffusion) hoặc biến thể của nó làm cốt lõi, từng bước "khử nhiễu" để tạo video trong không gian tiềm ẩn không-thời gian chiều cao:
  - Mô hình hóa có điều kiện văn bản: sử dụng bộ mã hóa văn bản (như tháp văn bản T5/CLIP hoặc mô hình ngôn ngữ chuyên dụng) để ánh xạ kịch bản thành vector điều kiện, dẫn hướng bộ giải mã video căn chỉnh với mô tả văn bản về phong cách, nội dung và mẫu chuyển động.
  - Tính nhất quán không-thời gian và kiểm soát chuyển động: trong quá trình khuếch tán hoặc tối ưu hóa hậu nghiệm, thêm tích chập không-thời gian, attention tuần tự hoặc biểu diễn 4D (NeRF/GS…) để đảm bảo tính liên tục và hợp lý vật lý của video theo trục thời gian.
  - Tạo sinh có điều kiện từ hình ảnh/video: khởi động quá trình khuếch tán trên không gian đặc trưng của hình ảnh hoặc video đầu vào, thông qua kiểm soát mức độ nhiễu, vùng che và kênh điều kiện để thực hiện chỉnh sửa hoặc mở rộng có kiểm soát theo kiểu "giữ nguyên phần đã cho + tạo nội dung mới".
  - Tín hiệu điều khiển có cấu trúc: kết hợp thông tin cấu trúc như khung xương tư thế, mặt nạ phân vùng, bản đồ độ sâu, quỹ đạo camera để làm cho video tạo ra có thể kiểm soát hơn về chuyển động của chủ thể và thay đổi góc nhìn.
- **Mô hình**
  Các mô hình và hướng tiêu biểu bao gồm:
  - Mô hình Text‑to‑Video dựa trên Diffusion (Sora, Runway Gen‑2, Pika, Kling…), được tiền huấn luyện trên các cặp video–văn bản quy mô lớn, có khả năng tạo sinh mạnh mẽ trên các cảnh phức tạp, chuyển động đa góc máy và phong cách đa dạng.
  - Mô hình khuếch tán Image‑to‑Video: lấy hình ảnh một khung làm điều kiện, dự đoán sự tiến hóa động của các khung tiếp theo, thực hiện "một ảnh → hoạt hình/hiệu ứng động"; hoặc tiếp tục viết, mở rộng, xoay góc nhìn cho video ngắn.
  - NeRF/biểu diễn 4D và phương pháp keyframe + nội suy: sử dụng biểu diễn cảnh 3D hoặc keyframe + nội suy tuần tự, kết hợp tạo sinh với mô hình hóa hình học và tính nhất quán, thực hiện dạo cảnh góc nhìn ổn định hơn và chuyển động phức tạp hơn.

Những năng lực này không tồn tại riêng lẻ, mà dần thấm vào pipeline dựng phim và hậu kỳ: từ nội dung đến storyboard, từ storyboard đến bản dựng thô, từ bản dựng thô đến phong cách hóa và chỉnh sửa cục bộ — ngày càng nhiều công đoạn được "văn bản + điều khiển có cấu trúc" dẫn dắt.

### 5.4.1 Text‑to‑Video: Từ Kịch Bản Đến Chuỗi Cảnh Quay "Có Thể Xem Được"

Text‑to‑Video hướng đến mục tiêu: bạn mô tả một cảnh, một góc máy hoặc đoạn câu chuyện bằng ngôn ngữ tự nhiên, hệ thống tự động tạo ra một đoạn video mạch lạc. So với tạo hình ảnh, Text‑to‑Video thêm vào thách thức về chiều thời gian: không chỉ phải duy trì chất lượng hình ảnh và tính nhất quán phong cách ở cấp độ từng khung, mà còn phải đảm bảo tính liên tục xuyên khung về danh tính chủ thể, ánh sáng, nền và quỹ đạo chuyển động.

Mô hình Text‑to‑Video dựa trên khuếch tán điển hình sẽ trước tiên được tiền huấn luyện trên dữ liệu ghép cặp video–văn bản quy mô lớn: bộ mã hóa văn bản trích xuất điều kiện ngữ nghĩa, bộ giải mã video trong không gian tiềm ẩn lặp đi lặp lại khử nhiễu "video nhiễu", dần hội tụ thành tín hiệu không-thời gian nhất quán với văn bản. Trong quá trình này, sự phụ thuộc thời gian được xây dựng tường minh vào mạng thông qua các cấu trúc như attention tuần tự, tích chập 3D hoặc biểu diễn 4D, để tránh các vấn đề như "nhảy khung" hay "reset nhân vật". Một số hệ thống còn hỗ trợ kiểm soát chuyển động camera (đẩy/kéo/xoay/dịch chuyển) và nhịp bố cục, giúp kết quả tạo sinh gần với ngôn ngữ quay phim thực tế hơn.

### 5.4.2 Hình Ảnh/Video sang Video: "Phát Triển" và "Biến Đổi" Trên Nội Dung Có Sẵn

Một hướng quan trọng khác là tạo sinh và chỉnh sửa dựa trên hình ảnh hoặc video có sẵn: ví dụ, "làm sống động" một bức minh họa hay ảnh concept thiết kế nhân vật, phong cách hóa video người thật thành anime, hoặc thay đổi nền, điều chỉnh thời tiết và thời gian trong khi giữ nguyên cấu trúc. Về mặt kỹ thuật, các phương pháp này thường bổ sung "kênh tham chiếu" vào quá trình khuếch tán: mã hóa hình ảnh hoặc video đầu vào thành đặc trưng, dùng làm điều kiện hoặc trạng thái khởi đầu tham gia vào khử nhiễu, đồng thời kiểm soát "vùng nào có thể thay đổi, vùng nào phải giữ nguyên" thông qua mặt nạ và ràng buộc hình học tường minh.

Với tình huống chuyển đổi phong cách, mô hình vẽ lại kết cấu và ánh sáng để khớp với phong cách mục tiêu trong khi vẫn giữ nguyên chuyển động và bố cục gốc; với mở rộng và sắp xếp lại video, bạn có thể "tiếp tục viết" các khung mới ở hai đầu hoặc ở giữa theo thời gian, thực hiện mở rộng cảnh theo chiều ngang/dọc, đi vòng quanh góc nhìn hoặc bổ sung tình tiết. Năng lực này rất phù hợp để kết hợp với quy trình dựng phim truyền thống: người dựng phim đưa ra các cảnh quay chính và nhịp điệu, mô hình tự động tạo ra các chuyển tiếp và biến thể giữa các "điểm neo" đó.

### 5.4.3 Chỉnh Sửa Video Có Cấu Trúc: Kiểm Soát Chi Tiết Ở Cấp Độ Đối Tượng

Trong nhiều tình huống thực tế, tạo lại video hoàn toàn không phải là nhu cầu cấp thiết; điều quan trọng hơn là thực hiện các chỉnh sửa có cấu trúc, có thể kiểm soát và chi tiết trên hình ảnh hiện có: chẳng hạn đổi mặt, thay khẩu hình, xóa vật thể không cần thiết, thay thế nội dung vị trí quảng cáo, hoặc sắp xếp lại thứ tự cảnh quay dựa trên kịch bản văn bản. Chỉnh sửa video có cấu trúc phát triển theo hướng này: trên nền tảng hiểu video, đưa vào phân vùng cấp độ đối tượng, theo dõi và biểu diễn tham số hóa, để các thao tác chỉnh sửa có thể ràng buộc ổn định với mục tiêu và khoảng thời gian cụ thể.

Đổi mặt nhân vật và đồng bộ khẩu hình (Lip‑sync) là ứng dụng điển hình nhất trong hướng này: mô hình cần ánh xạ danh tính của nhân vật mục tiêu lên màn trình diễn trong video gốc trong khi đảm bảo tư thế đầu và biểu cảm tổng thể tự nhiên mạch lạc, đồng thời kiểm soát chính xác chuyển động khẩu hình theo tín hiệu giọng nói mới. Xóa/thay thế đối tượng phụ thuộc vào phân vùng chất lượng cao và bổ sung không-thời gian: trước tiên phân vùng và loại bỏ đối tượng mục tiêu trong từng khung, sau đó dùng các khung lân cận và kết cấu ngữ cảnh để lấp đầy khoảng trống, tránh xuất hiện vết "vá lưới" rõ ràng. Dựng phim theo văn bản thực hiện tự động chọn và ghép các đoạn phù hợp với ngữ nghĩa kịch bản bằng cách căn chỉnh "cấu trúc kịch bản" với trục thời gian video, hiện thực hóa tự động hóa chỉnh sửa ở cấp độ cao hơn.
## 5.5 Digital Human / Avatar (Digital Human / Avatar)

**Digital Human / Avatar** có thể được xem là sự "tích hợp cấp hệ thống" của tạo sinh video, tổng hợp giọng nói, hiểu đa phương thức và kết xuất đồ họa: không chỉ đơn thuần tạo ra một đoạn video, mà dựa trên đầu vào văn bản hoặc giọng nói, điều khiển liên tục và có kiểm soát một nhân vật ảo "mở miệng nói chuyện, thể hiện biểu cảm, thực hiện động tác", đồng thời hiện thực hóa tương tác gần thời gian thực thậm chí thời gian thực trong ngày càng nhiều tình huống. So với tạo sinh video thông thường, digital human nhấn mạnh hơn ba điểm: **tính nhất quán lâu dài của danh tính và ngoại hình, sự căn chỉnh tinh tế giữa giọng nói—biểu cảm—động tác, và tính thời gian thực cùng độ ổn định của hệ thống đầu cuối đến đầu cuối**.

Nhìn từ góc độ sản phẩm, digital human đã xuất hiện rộng rãi trong các tình huống như **nền tảng sản xuất nội dung, dịch vụ khách hàng ảo / lễ tân thông minh / hướng dẫn viên ảo, giáo dục đào tạo và lớp học trực tuyến, IP ảo thương hiệu / thần tượng ảo, công cụ phát sóng ảo / phân thân số dành cho người sáng tạo**: doanh nghiệp có thể sản xuất hàng loạt nội dung video với hình ảnh và phong cách cố định, dịch vụ chính phủ và doanh nghiệp có thể dùng lễ tân ảo phục vụ người dùng 7×24 giờ, người sáng tạo cá nhân có thể không cần lộ mặt nhưng vẫn liên tục sản xuất video "có người xuất hiện". Dưới đây vẫn sắp xếp theo ba chiều **tình huống**, **nguyên lý** và **mô hình**, và triển khai ba hướng điều khiển & biểu đạt, tạo sinh hình ảnh & video, tương tác thời gian thực & tích hợp hệ thống trong các mục tiếp theo.

- **Tình huống**
  - Sản xuất nội dung và truyền thông trực tuyến: video quảng bá doanh nghiệp, giải thích tính năng sản phẩm, ghi hình khóa học, phát sóng tin tức, sử dụng digital human thay thế người thật xuất hiện trên màn hình, giảm đáng kể chi phí trường quay, thiết bị ánh sáng và nhân lực.
  - Dịch vụ khách hàng ảo và hướng dẫn viên: tại các điểm giao dịch ngân hàng, sảnh hành chính, khu du lịch, bảo tàng, dùng digital human đảm nhận tiếp đón, hỏi đáp, tư vấn nghiệp vụ và chỉ đường, vừa đảm bảo hình ảnh đồng nhất vừa phục vụ 7×24 giờ.
  - IP ảo thương hiệu / thần tượng ảo: vận hành lâu dài video ngắn, livestream, nội dung thương mại điện tử xoay quanh một nhân vật ảo nhất định, duy trì nhân cách và phong cách hình ảnh đồng nhất trên các nền tảng khác nhau.
  - Phát sóng ảo và phân thân số: cung cấp cho những người sáng tạo không muốn lộ mặt hoặc cần vận hành nhiều danh tính một phát sóng viên ảo / phân thân số có thể cấu hình, liên kết với giọng nói thật hoặc giọng tổng hợp, thực hiện "chỉ cần nói chuyện / gõ phím là có thể xuất hiện ổn định trên màn hình".
- **Nguyên lý**
  Hệ thống digital human về bản chất là một pipeline đa phương thức "điều khiển bằng giọng nói / văn bản + mô hình hóa hình ảnh + đầu ra video / kết xuất", có sự khác biệt nhỏ giữa tình huống ngoại tuyến và thời gian thực, nhưng các thành phần cốt lõi tương tự nhau:
  - Điều khiển bằng giọng nói và ngôn ngữ: trực tiếp dùng TTS tổng hợp giọng nói từ kịch bản, hoặc kết nối ASR + LLM, tạo văn bản trả lời từ giọng nói / văn bản người dùng, rồi dùng TTS xuất giọng nói; đặc trưng giọng nói (như mel spectrogram) làm tín hiệu điều khiển kiểm soát trục thời gian hình miệng và biểu cảm.
  - Mô hình hóa không gian hình ảnh và chuyển động: xây dựng biểu diễn hình học và ngoại hình có thể kiểm soát cho nhân vật ảo, ví dụ chân dung 2D / hình minh họa, Avatar 3D dựa trên xương và Blendshape, hoặc biểu diễn thể tích có thể kết xuất dựa trên NeRF / 4D Gaussian; đồng thời định nghĩa một tập "tham số điều khiển" (như keypoint, skeleton tư thế, hệ số Blendshape) để mã hóa biểu cảm và tư thế.
  - Ánh xạ giọng nói → biểu cảm / động tác: thông qua mô hình "điều khiển bằng giọng nói" chuyên dụng, ánh xạ đặc trưng giọng nói thành tham số điều khiển khuôn mặt và nửa thân trên, thực hiện đồng bộ khẩu hình (Lip-sync), chi tiết biểu cảm và chuyển động đầu vai; digital human thời gian thực yêu cầu ánh xạ này có độ trễ thấp đầu cuối đến đầu cuối và ổn định.
  - Kết xuất và tổng hợp: dựa trên tham số điều khiển khung hiện tại, thực hiện kết xuất hình ảnh hoặc 3D cho nhân vật ảo, xuất luồng video liên tục hoặc hình ảnh thời gian thực; có thể chồng thêm nền, đạo cụ, phụ đề và kết hợp với quy trình biên tập video truyền thống.
- **Mô hình**
  Về mô hình cụ thể, hệ thống digital human thường kết hợp sử dụng nhiều loại mô hình chuyên dụng và mô hình đa phương thức tổng quát:
  - Mô hình Audio-driven Talking Head: như các mô hình đồng bộ khẩu hình loại Wav2Lip, thông qua học mối quan hệ căn chỉnh giữa giọng nói và pixel / hình học vùng miệng, tạo ra chuyển động miệng tự nhiên trong khi đảm bảo tính nhất quán danh tính.
  - Mô hình digital human thời gian thực / nhẹ: như Ultralight-Digital-Human, mô hình Talking Head nhẹ, v.v., nén đáng kể số tham số và lượng tính toán về mặt cấu trúc, cho phép đạt gần thời gian thực trong điều khiển và kết xuất ngay cả trên CPU / thiết bị di động / WebGPU.
  - Mô hình biểu diễn NeRF / 4D: như ER-NeRF (giải pháp digital human NeRF theo hướng Explicit / Efficient / Editable), v.v., thông qua mô hình hóa hình ảnh nhân vật và sự thay đổi biểu cảm trong không gian 3D, làm cho góc nhìn, ánh sáng và chuyển động tự nhiên hơn, phù hợp với tình huống độ trung thực cao và đa góc máy.
  - Mô hình điều khiển bằng giọng nói và căn chỉnh đa phương thức: như mô hình "giọng nói → biểu cảm khuôn mặt / talking head" loại MuseTalk, căn chỉnh đặc trưng âm thanh và đặc trưng thị giác, thực hiện biểu cảm nói chuyện và chuyển động đầu chân thực mà không phụ thuộc vào lượng lớn chú thích 3D.
  - Mô hình giọng nói và đối thoại: TTS đa người nói độ tự nhiên cao, mô hình đối thoại bằng giọng nói đầu cuối đến đầu cuối (ASR + LLM + TTS tích hợp), cung cấp cho digital human khả năng giọng nói và đối thoại đa phong cách, đa ngôn ngữ.

Nhìn tổng thể, digital human vừa là một tập mô hình, vừa là một hệ thống hoàn chỉnh: nó tích hợp hiểu ngôn ngữ, giọng nói, tạo sinh thị giác và suy luận thời gian thực, từ đó trình bày trước "màn hình" một nhân vật ảo có thể tương tác. Dưới đây, chúng ta triển khai theo ba hướng **điều khiển & biểu đạt**, **tạo sinh hình ảnh & video** và **tương tác thời gian thực & tích hợp hệ thống**.

### 5.5.1 Điều khiển & Biểu đạt: Từ kịch bản / giọng nói đến nhân vật "biết nói, biết biểu cảm"

Trong pipeline digital human, **điều khiển & biểu đạt** chịu trách nhiệm trả lời câu hỏi cốt lõi: với kịch bản hoặc giọng nói cho trước, nhân vật ảo ở mỗi khung hình nên thể hiện khẩu hình, biểu cảm và chuyển động đầu vai như thế nào. Điều này bao gồm cả tình huống sản xuất hàng loạt ngoại tuyến lẫn phản hồi đối thoại thời gian thực.

Trong sản xuất nội dung ngoại tuyến, chuỗi xử lý phổ biến là "kịch bản văn bản → TTS → điều khiển bằng giọng nói": phía nghiệp vụ cung cấp văn bản phát sóng, mô-đun TTS tạo giọng nói với âm sắc mục tiêu (như đại diện ảo thương hiệu), rồi đưa đặc trưng giọng nói vào mô hình "giọng nói → động tác". **Mô hình loại Wav2Lip** là đại diện quan trọng của khâu này:

- Nó nhận khung hình ảnh chân dung tham chiếu và đoạn giọng nói tương ứng làm đầu vào, thông qua mạng tích chập / chú ý dự đoán vùng miệng được căn chỉnh tinh tế với giọng nói, rồi hòa trộn với chân dung gốc, từ đó chỉnh xác khẩu hình trong khi giữ nguyên danh tính và phần lớn biểu cảm.
- Trong quá trình huấn luyện, thông qua dữ liệu căn chỉnh giọng nói–video giám sát mạng học hình thái khoang miệng tương ứng với các âm vị khác nhau, và duy trì tính liên tục theo thời gian, tránh khẩu hình bị nhảy hoặc có cảm giác trễ.

So với các phương pháp đồng bộ khẩu hình thuần túy giai đoạn đầu, thế hệ mô hình điều khiển bằng giọng nói mới hơn (như phương pháp loại MuseTalk) tiếp tục mở rộng sang **biểu cảm toàn khuôn mặt và tư thế đầu**:

- Các mô hình này thường ánh xạ đặc trưng giọng nói vào một "không gian ẩn cảm xúc / biểu đạt" chiều thấp, rồi thông qua bộ giải mã tạo keypoint, hệ số Blendshape hoặc trực tiếp tạo đặc trưng hình ảnh, thúc đẩy những thay đổi tinh tế ở vùng lông mày, mắt, má, khiến "biểu cảm khi nói chuyện" sinh động hơn.
- Một số mô hình còn mã hóa thêm thông tin ngữ nghĩa của nội dung giọng nói (như nghi vấn, nhấn mạnh, cảm thán), kết hợp tín hiệu cú pháp / dụng học từ phân tích LLM, thêm các động tác gật đầu, cau mày, cử chỉ tay ở những chỗ thay đổi ngữ điệu, nâng cao độ tự nhiên và sức hấp dẫn của biểu đạt.

Ở chiều cao hơn, **điều khiển & biểu đạt** cũng có thể kết hợp tín hiệu điều khiển bên ngoài: ví dụ lấy skeleton tư thế, quỹ đạo cử chỉ tay, hướng nhìn, v.v. làm đầu vào bổ sung, cho phép digital human mô phỏng phong cách của một diễn giả cụ thể, hoặc thực thi template hành động được định nghĩa trước theo "chỉ thị hành động" trong kịch bản (như "chỉ vào màn hình" "mở hai tay ra"). Dù là điều khiển khẩu hình cục bộ như Wav2Lip, hay mô hình hóa biểu đạt toàn thân hơn như MuseTalk / điều khiển skeleton thời gian thực, chúng cùng nhau thực hiện ánh xạ liên tục từ giọng nói / văn bản đến chuyển động khuôn mặt và nửa thân trên, là khâu then chốt giúp digital human "trông có vẻ đang thực sự nói chuyện nghiêm túc".

### 5.5.2 Tạo sinh Hình ảnh & Video: Từ "một mô hình" đến "một nhân vật có thể định hình"

Chuỗi điều khiển giải quyết "di chuyển như thế nào", còn **tạo sinh hình ảnh & video** quyết định "ai đang di chuyển, di chuyển ở đâu, di chuyển theo phong cách gì". Điều này bao gồm cả digital human chân thực độ trung thực cao lẫn các hình ảnh phong cách hóa như anime, hoạt hình và Avatar đa giác thấp, cùng các lựa chọn kỹ thuật khác nhau hướng đến kết xuất thời gian thực và ngoại tuyến.

Trong tình huống chân dung 2D và hình minh họa, cách làm điển hình là huấn luyện **mô hình tạo sinh Talking Head** dựa trên ít hình ảnh tham chiếu và video ngắn:

- Mô hình mã hóa thông tin danh tính nhân vật thành "vector ngoại hình" hoặc đặc trưng phong cách, lấy tham số điều khiển (như vector ẩn giọng nói, keypoint, mã hóa biểu cảm) làm đầu vào điều kiện, tổng hợp khung hình mới trong không gian hình ảnh.
- Khác với Wav2Lip thuần túy chỉ thay đổi khẩu hình, loại mô hình này có thể thực hiện xoay nhỏ về tư thế, chồng thêm thay đổi cảm xúc về biểu cảm, khiến digital human trông không quá "cứng nhắc".

Trong các tình huống đòi hỏi độ chân thực cao hơn, góc nhìn tự do hơn và chuyển đổi đa góc máy, ngày càng nhiều phương án áp dụng mô hình hóa digital human dựa trên **NeRF / 4D** (như phương pháp loại ER-NeRF):

- Thông qua quay từ nhiều góc nhìn hoặc video, trước tiên tái tạo thể tích 3D hoặc trường Gaussian của đầu / nửa thân trên nhân vật, mã hóa các trạng thái tương ứng với biểu cảm và khẩu hình khác nhau thành không gian ẩn có thể nội suy;
- Khi điều khiển, ánh xạ tham số giọng nói / biểu cảm vào không gian ẩn này, thực hiện kết xuất thể tích hoặc kết xuất Gaussian trong 3D, rồi chiếu lên màn hình.
- Ưu điểm của cách làm này là: góc nhìn, ánh sáng và nền tự nhiên hơn, có thể hỗ trợ chuyển động "góc nhìn vòng quanh" "máy quay ảo", đặc biệt phù hợp với VR/AR, phòng livestream ảo và sản xuất quảng cáo cao cấp.

Trong các nghiệp vụ nhấn mạnh triển khai đa nền tảng và tính thời gian thực, còn sử dụng các phương án nhẹ hóa như **Ultralight-Digital-Human**:

- Thông qua cắt tỉa cấu trúc, tái cấu trúc toán tử và chưng cất mô hình, nén mạng kết xuất Talking Head hoặc Avatar xuống quy mô có thể chạy trên thiết bị di động / WebGPU;
- Hoàn thành tạo sinh từ tham số điều khiển đến một khung hình trong vài mili giây, căn chỉnh với luồng giọng nói thời gian thực hoặc tín hiệu điều khiển, thực hiện "digital human độ trễ thấp", phù hợp với thiết bị đầu cuối tương tác, máy tự phục vụ và ứng dụng Web frontend.

Ở cấp độ sản xuất video hoàn chỉnh, tạo sinh hình ảnh & video còn phải kết hợp với nền, đạo cụ và ngôn ngữ máy quay: một quy trình làm việc phổ biến là:

- Trước tiên tùy chỉnh một hình ảnh digital human cho thương hiệu hoặc cá nhân (2D hoặc 3D);
- Cài đặt trước một số cảnh ảo (phòng thu, văn phòng, lớp học, phòng trưng bày, v.v.);
- Khi sản xuất nội dung, hệ thống tự động chọn cảnh và góc máy phù hợp theo kịch bản, tạo hình ảnh digital human, và phối hợp đa màn hình với PPT, video trình diễn, hình ảnh sản phẩm.
  Điều này khiến digital human không chỉ là một "talking head", mà là "nhân vật" có thể hòa nhập tự nhiên vào các loại chương trình và hình thức nội dung khác nhau.

### 5.5.3 Digital Human Thời gian thực & Tích hợp Hệ thống: Từ video ngoại tuyến đến "đồng nghiệp trong màn hình"

Với sự trưởng thành của ASR, TTS, LLM và các mô hình tạo sinh video nhẹ, ngày càng nhiều hệ thống digital human bắt đầu chuyển từ **sản xuất hàng loạt ngoại tuyến** sang **tương tác thời gian thực**: người dùng mở miệng nói hoặc nhập văn bản tại đầu cuối, digital human trên màn hình trong vài trăm mili giây đến vài giây "nghe hiểu—suy nghĩ—phản hồi—mở miệng nói", tạo ra trải nghiệm tương tự nhân viên dịch vụ khách hàng / hướng dẫn viên / người dẫn chương trình thật. Điều then chốt ở đây không chỉ là bản thân mô hình, mà còn là cách **nén pipeline đa phương thức xuống độ trễ đầu cuối đến đầu cuối chấp nhận được**.

Trong một vòng lặp kín digital human thời gian thực điển hình:

- **Đầu vào frontend**: mô-đun ASR chuyển đổi giọng nói người dùng thành văn bản theo thời gian thực, hoặc trực tiếp nhận đầu vào văn bản người dùng.
- **Hiểu ngữ nghĩa và ra quyết định**: LLM kết hợp kho kiến thức nghiệp vụ và công cụ (RAG, truy vấn cơ sở dữ liệu, phối hợp quy trình) tạo văn bản trả lời, cùng các chỉ thị có cấu trúc cần thiết (như cần hiển thị trang PPT nào, phát đoạn video nào).
- **Giọng nói và điều khiển**: TTS chuyển đổi văn bản trả lời thành giọng nói với âm sắc mục tiêu, luồng giọng nói vừa được tạo ra vừa được mô hình điều khiển Wav2Lip / MuseTalk / skeleton thời gian thực tiêu thụ, từng đoạn xuất ra tham số khẩu hình và biểu cảm tương ứng.
- **Đầu ra kết xuất**: mạng kết xuất nhẹ loại Ultralight-Digital-Human hoặc engine kết xuất NeRF / Avatar dựa trên GPU, chuyển đổi tham số điều khiển thành khung hình video theo thời gian thực, xuất trực tiếp ra màn hình thông qua WebRTC, RTMP hoặc kết xuất cục bộ.

Để cung cấp trải nghiệm nhất quán trên nhiều đầu cuối, hệ thống còn cần cân nhắc kỹ càng giữa **độ trễ, băng thông và năng lực tính toán**:

- Trong phương án kết xuất trên đám mây, phần lớn tính toán (LLM, TTS, điều khiển và kết xuất) được hoàn thành trên máy chủ, đầu cuối chỉ chịu trách nhiệm phát luồng video, phù hợp với Web / App và màn hình lớn ngoài trời có năng lực tính toán hạn chế, nhưng phụ thuộc vào độ ổn định mạng;
- Trong phương án "đám mây + đầu cuối kết hợp", ASR và một phần suy luận LLM được hoàn thành trên đám mây, điều khiển và kết xuất nhẹ được thực hiện cục bộ, có thể giảm đáng kể độ trễ tương tác âm thanh-hình ảnh, phù hợp với thiết bị di động và thiết bị đầu cuối tự phục vụ;
- Trên các đầu cuối có năng lực tính toán mạnh (như PC hiệu suất cao, máy trạm chuyên dụng), còn có thể đưa phần lớn pipeline xuống cục bộ, thực hiện tương tác ổn định trong môi trường mạng yếu.

Về phía mô hình, **digital human thời gian thực** cũng đặt ra yêu cầu bổ sung về thiết kế cấu trúc:

- Mô hình điều khiển bằng giọng nói cần có khả năng suy luận streaming, có thể đưa ra dự đoán khẩu hình và biểu cảm sau khi nhận được một đoạn giọng nói nhỏ, thay vì đợi đến hết cả câu;
- Mạng kết xuất cần giảm thiểu phụ thuộc vào kernel tích chập lớn và chú ý toàn cục, sử dụng tích chập cục bộ, tự chú ý nhẹ, kim tự tháp độ phân giải và các cấu trúc khác để kiểm soát lượng tính toán;
- Đối với các phương án độ trung thực cao dựa trên NeRF / 4D, cần thông qua cache lưới, cắt tỉa frustum, thể tích thưa và tối ưu hóa GPU, v.v. để kiểm soát kết xuất mỗi khung hình trong vài mili giây đến vài chục mili giây.

Ở cấp độ tích hợp hệ thống, digital human thời gian thực thường còn phải gắn kết chặt chẽ với **kiến thức nghiệp vụ, thiết lập nhân cách và chiến lược đối thoại**:

- Quản lý kiến thức ngành, quy trình nghiệp vụ và FAQ thông qua kho kiến thức và RAG, đảm bảo "nói đúng, nói đủ";
- Kiểm soát phong cách nói chuyện và ranh giới biểu đạt thông qua cấu hình nhân cách và template kịch bản, đảm bảo "nói giống người đó (hoặc thương hiệu đó)";
- Thông qua chiến lược đối thoại đa lượt và quản lý trạng thái phiên, cho phép digital human ghi nhớ ngữ cảnh người dùng, xác nhận và đặt câu hỏi thêm vào thời điểm thích hợp, tạo ra cảm giác tương tác "như một đồng nghiệp / hướng dẫn viên / giảng viên thật sự".

Nhìn tổng thể, sau khi tích hợp các mô hình được thiết kế chuyên biệt cho đồng bộ khẩu hình, điều khiển biểu cảm và kết xuất thời gian thực như Wav2Lip, MuseTalk, ER-NeRF, Ultralight-Digital-Human, digital human đang nhanh chóng tiến hóa từ "công cụ template video ngoại tuyến" thành **thực thể ảo có thể phản hồi thời gian thực, có nhân cách ổn định và kiến thức chuyên nghiệp**, trở thành mắt xích tổng hợp và có sức ứng dụng nhất trong hệ thống công nghệ video.

# 6. Chuỗi Thời gian & Ra Quyết định Theo Trình tự (Time Series & Sequential Decision)

Trong mô hình hóa thị giác và cấu trúc ở phần trước, chúng ta suy nghĩ về vấn đề nhiều hơn trong không gian "tĩnh": một bức ảnh, một bản ghi, một đoạn văn bản. Còn trong nghiệp vụ thực tế, phần lớn các chỉ số cốt lõi đều tiến hóa theo thời gian: doanh số và lưu lượng biến động mỗi ngày, tải máy chủ và số liệu cảm biến thay đổi mỗi giây, giá tài chính và chỉ số vĩ mô liên tục điều chỉnh dưới tác động của chính sách và sự kiện. **Chuỗi thời gian & ra quyết định theo trình tự** tập trung vào: dự đoán tương lai trên trục thời gian, phát hiện bất thường, mô tả đột biến cấu trúc, và trên cơ sở đó đưa ra các quyết định và điều khiển có tầm nhìn xa.

Nhìn từ góc độ sản phẩm, loại năng lực này xuyên suốt các khâu then chốt như vận hành, quy hoạch, kiểm soát rủi ro và lập lịch: mô-đun dự đoán chỉ số được nhúng trong hệ thống BI / báo cáo truyền thống, dự đoán nhu cầu và gợi ý tồn kho an toàn trong công cụ quy hoạch tài chính và chuỗi cung ứng, phân tích tương quan vĩ mô và khai thác quan hệ nhân quả trong phần mềm phân tích nghiên cứu định lượng, dự đoán lưu lượng và năng lực vận chuyển trên nền tảng thương mại điện tử và di chuyển, phát hiện bất thường chỉ số và cảnh báo trong AIOps vận hành, đều là các hình thức ứng dụng điển hình của lớp này. Dưới đây chúng ta triển khai theo bốn hướng **phương pháp thống kê cổ điển**, **mô hình hóa chuỗi thời gian bằng deep learning**, **phát hiện bất thường & điểm thay đổi** và **mô hình hóa chuỗi không-thời gian**.
## 6.1 Mô hình hóa chuỗi thời gian cổ điển (Statistical TS Modeling)

Trong nhiều lĩnh vực kinh doanh, "thời gian" là trục chủ đạo tự nhiên: doanh số thay đổi theo ngày/tuần, lưu lượng truy cập website dao động theo chiến dịch, tải thiết bị lên xuống theo hành vi người dùng, số liệu cảm biến phản ánh những biến đổi tinh tế trong trạng thái hệ thống. **Mô hình hóa chuỗi thời gian thống kê cổ điển** là cách vận dụng các mô hình thống kê tương đối dễ giải thích và phân tích trên cấu trúc thời gian đó, nhằm trả lời ba câu hỏi cốt lõi: **Tương lai sẽ ra sao? Các biến liên quan với nhau như thế nào? Hệ thống đang ở trạng thái nào?** Dù deep learning đã nổi bật trong nhiều tình huống, các phương pháp truyền thống như ARIMA, phân tích đồng tích hợp, bộ lọc Kalman vẫn phục vụ lâu dài trong tài chính, chuỗi cung ứng, vận hành, kiểm soát rủi ro, và thường đóng vai trò "baseline" cùng công cụ giải thích cho các hệ thống phức tạp hơn.

Nhìn từ góc độ ứng dụng, các mô hình chuỗi thời gian cổ điển hiện diện rộng rãi trong module dự báo chỉ số của hệ thống BI/báo cáo truyền thống, công cụ lập kế hoạch tài chính và chuỗi cung ứng, cũng như các phần mềm nghiên cứu định lượng. Chúng có thể trực tiếp đưa ra khoảng dự báo tương lai cho một hoặc nhiều chuỗi thời gian, phân tích sự biến động đồng bộ và quan hệ cân bằng dài hạn giữa các chỉ số vĩ mô, đồng thời ước tính quỹ đạo và trạng thái ẩn thông qua mô hình không gian trạng thái. Dưới đây, chúng ta hệ thống hóa cách dùng điển hình của nhóm phương pháp này theo ba chiều **tình huống**, **nguyên lý** và **mô hình**, rồi triển khai từng hướng cụ thể.

- **Tình huống**
  - Dự báo chỉ số: dự báo ngắn hạn hoặc trung hạn các giá trị thay đổi theo thời gian như doanh số, lưu lượng website, tải CPU, số liệu cảm biến, phục vụ các quyết định dự trữ hàng tồn kho, sắp xếp công suất, lên lịch vận hành.
  - Phân tích kinh tế vĩ mô và tài chính: nghiên cứu mối liên hệ dài hạn và động thái ngắn hạn giữa các chỉ số vĩ mô và thị trường như GDP, lạm phát, lãi suất, tỷ giá, giá tài sản, hỗ trợ nghiên cứu chính sách và phát triển chiến lược định lượng.
  - Ước tính quá trình và quỹ đạo: trong định vị, dẫn đường, theo dõi mục tiêu và giám sát thiết bị, ước tính và làm mượt quỹ đạo, vận tốc, trạng thái thay đổi theo thời gian, đồng thời khôi phục "quá trình thực" trong môi trường nhiễu.
- **Nguyên lý**
  Các phương pháp chuỗi thời gian cổ điển đều dựa trên tư duy **"giả định thống kê + cấu trúc tham số hóa"**:
  - Giả định chuỗi thời gian thỏa mãn điều kiện dừng hoặc dừng yếu, dùng cấu trúc tự tương quan (hàm tự tương quan ACF, hàm tự tương quan riêng phần PACF) để mô tả "giá trị hiện tại được quyết định bởi bao nhiêu bậc lịch sử quá khứ".
  - Trong trường hợp đa biến, dùng mô hình đồng tích hợp và vector tự hồi quy (VAR) để mô tả quan hệ cân bằng dài hạn và cơ chế hiệu chỉnh lệch ngắn hạn giữa nhiều chuỗi thời gian.
  - Với các hệ thống nhiễu nhiều và trạng thái không quan sát trực tiếp được, đưa vào trạng thái ẩn (latent state) và phương trình quan sát tạo thành mô hình không gian trạng thái, dùng suy luận Bayes hoặc bộ lọc đệ quy (như bộ lọc Kalman) để ước tính và dự báo trực tuyến.
- **Mô hình**
  Họ mô hình của nhóm phương pháp này tương đối rõ ràng, cấu trúc minh bạch, dễ giải thích và điều chỉnh tham số:
  - Dòng AR/MA/ARIMA/SARIMA đơn biến và đa biến, dùng để mô hình hóa chuỗi thời gian dừng/có mùa vụ, là "thành viên thường trú" của hệ thống BI và module dự báo truyền thống.
  - Mô hình VAR/đồng tích hợp, dùng để mô hình hóa chung các chuỗi thời gian vĩ mô và tài chính đa chiều, kiểm định quan hệ nhân quả, phù hợp với phân tích liên kết ở tầng chính sách và chiến lược.
  - Mô hình không gian trạng thái và bộ lọc Kalman, mô hình Markov ẩn (HMM), dùng để ước tính quỹ đạo, ước tính trạng thái thiết bị và suy luận trạng thái ẩn, là công cụ nền tảng trong kiểm soát kỹ thuật và xử lý tín hiệu.

Nhìn tổng thể, ưu điểm của mô hình hóa chuỗi thời gian cổ điển nằm ở **khả năng giải thích, khả năng chẩn đoán và khả năng kiểm soát kỹ thuật**: quy trình mô hình hóa, kiểm định giả thuyết, phân tích phần dư đều có quy chuẩn trưởng thành, dễ dàng tích hợp vào hệ thống BI và lập kế hoạch hiện có. Dưới đây, chúng ta triển khai theo ba hướng: dự báo đơn/đa biến, đồng tích hợp và nhân quả, không gian trạng thái.

### 6.1.1 Dự báo chuỗi thời gian đơn biến/đa biến: Từ ARIMA đến VAR

Trong tình huống kinh doanh điển hình nhất, bạn thường đối mặt với một hoặc vài đường cong chỉ số sắp xếp theo thời gian: ví dụ doanh số hàng ngày của một mặt hàng, PV mỗi giờ của website, mức sử dụng CPU mỗi phút của data center, số liệu cảm biến thiết bị mỗi giây. Mục tiêu là dựa vào xu hướng lịch sử để đưa ra dự báo ngắn hạn hoặc trung hạn cho tương lai, kèm khoảng tin cậy hợp lý. Dòng mô hình **AR/MA/ARMA/ARIMA/SARIMA** chính là công cụ tiêu chuẩn được thiết kế cho mục đích này.

Với chuỗi đơn biến, mô hình dạng ARIMA giả định "giá trị hiện tại được quyết định tuyến tính bởi các giá trị lịch sử trong vài kỳ trước và nhiễu ngẫu nhiên", thực hiện sai phân và sai phân mùa vụ trên chuỗi để loại bỏ xu hướng và mùa vụ, đưa chuỗi về dừng:

- Phần AR (tự hồi quy) mô tả "ảnh hưởng của độ trễ bản thân lên giá trị hiện tại";
- Phần MA (trung bình trượt) nắm bắt "ảnh hưởng của các số hạng sai số lịch sử lên giá trị hiện tại";
- Phần I (sai phân) có nhiệm vụ loại bỏ xu hướng;
- Thêm phần mùa vụ vào sẽ thu được SARIMA, có thể mô tả rõ ràng các cấu trúc chu kỳ theo tuần, tháng, v.v.

Trong thực hành kỹ thuật, thông thường bạn sẽ kiểm định tính dừng trước (ví dụ ADF), quan sát đồ thị ACF/PACF, rồi chọn bậc hợp lý thông qua tiêu chí thông tin (AIC/BIC) và chẩn đoán phần dư. Với các chỉ số có mùa vụ rõ ràng (như doanh số thương mại điện tử theo ngày, lưu lượng dịp lễ), SARIMA đặc biệt phù hợp; kết hợp thêm đặc trưng ngày lễ hoặc biến ngoại sinh có thể cải thiện thêm hiệu suất dự báo.

Khi bạn muốn mô hình hóa đồng thời nhiều chuỗi thời gian có liên quan, có thể đưa vào **mô hình chuỗi thời gian đa biến**. Phương pháp đại diện là VAR (vector tự hồi quy) và các biến thể của nó. VAR xem nhiều chuỗi như một vector kết hợp, dùng các độ trễ của chính chúng và của nhau để cùng giải thích giá trị hiện tại, từ đó nắm bắt ảnh hưởng qua lại giữa các chỉ số khác nhau. Ví dụ, trong phân tích kinh tế vĩ mô, bạn có thể đưa tốc độ tăng GDP, lạm phát, lãi suất, tỷ giá vào cùng một mô hình VAR để nghiên cứu phản ứng xung và đường truyền; trong vận hành kinh doanh, cũng có thể dùng VAR để mô tả "sự thay đổi lưu lượng của một kênh ảnh hưởng thế nào đến các kênh khác", "mối quan hệ động giữa cường độ khuyến mãi và doanh số", cung cấp tham chiếu cho phân bổ nguồn lực.

Về hình thái sản phẩm, khả năng dự báo đơn/đa biến này thường được nhúng vào **chức năng dự báo của hệ thống BI/báo cáo truyền thống, công cụ lập kế hoạch tài chính và chuỗi cung ứng**: người dùng chọn một hoặc vài chuỗi thời gian, hệ thống tự động hoàn thành mô hình hóa và dự báo, cung cấp khoảng dự báo, phân tích phần dư và báo cáo chẩn đoán mô hình, hỗ trợ ra quyết định mà không cần đi sâu vào toàn bộ chi tiết toán học phía sau.

### 6.1.2 Đồng tích hợp và quan hệ nhân quả: Cân bằng dài hạn giữa các chỉ số vĩ mô

Trong lĩnh vực kinh tế và tài chính, nhiều chuỗi thời gian trông có vẻ ngẫu nhiên, nhưng ở thang thời gian dài hơn lại tồn tại một **quan hệ cân bằng dài hạn ổn định**. Ví dụ điển hình bao gồm tỷ giá và chênh lệch lãi suất, chỉ số chứng khoán và lợi nhuận vĩ mô, giá hàng hóa và chỉ số chi phí, v.v. Nhìn riêng từng chuỗi, có thể đều không dừng; nhưng một tổ hợp tuyến tính nào đó lại dao động quanh một mức ổn định trong dài hạn. Hiện tượng này gọi là **đồng tích hợp (cointegration)**, cung cấp manh mối quan trọng để hiểu mối quan hệ cấu trúc giữa các chỉ số vĩ mô.

Trong thực hành kỹ thuật, phân tích đồng tích hợp thường gồm các bước sau:

1. Kiểm định nghiệm đơn vị cho từng chuỗi thời gian, xác nhận chúng đồng bậc tích hợp (ví dụ đều là I(1));
2. Thực hiện kiểm định đồng tích hợp (như phương pháp hai bước Engle-Granger, kiểm định Johansen, v.v.), xác định có tồn tại tổ hợp tuyến tính không tầm thường nào làm cho tổ hợp đó dừng hay không;
3. Nếu phát hiện quan hệ đồng tích hợp, có thể xây dựng mô hình hiệu chỉnh sai số (ECM), mô tả "khi hệ thống lệch khỏi cân bằng dài hạn trong ngắn hạn, hệ thống hiệu chỉnh dần dần trở lại trạng thái cân bằng như thế nào".

Liên quan đến đồng tích hợp là **kiểm định nhân quả Granger**. Đây không phải "nhân quả" theo nghĩa triết học, mà là một định nghĩa thống kê dựa trên khả năng dự báo: nếu thông tin lịch sử của biến X có thể cải thiện đáng kể độ chính xác dự báo của biến Y, thì gọi là "X Granger dẫn đến Y". Bằng cách so sánh sai số dự báo khi có/không có độ trễ của một biến nào đó trong khung VAR hoặc hồi quy, bạn có thể đánh giá ảnh hưởng có hướng giữa các chỉ số vĩ mô hay thị trường khác nhau. Trong nghiên cứu định lượng và phân tích vĩ mô, kiểm định này thường dùng để sàng lọc các chỉ báo dẫn tiềm năng, xây dựng nhân tố, hoặc kiểm chứng giả thuyết chiến lược.

Nhìn từ góc độ sản phẩm, phân tích đồng tích hợp và nhân quả xuất hiện nhiều hơn trong **phần mềm phân tích nghiên cứu định lượng, nền tảng phân tích kinh tế vĩ mô và công cụ nghiên cứu tài chính**. Chúng giúp các nhà nghiên cứu trích xuất mối quan hệ cấu trúc tương đối bền vững từ hàng đống chuỗi thời gian, ánh xạ các mối quan hệ đó lên các khái niệm kinh doanh cấp cao hơn (như "ràng buộc dài hạn của lãi suất lên tỷ giá", "hồi quy chênh lệch giá giữa các tài sản"), trở thành cơ sở quan trọng cho thiết kế chiến lược và quản lý rủi ro.

### 6.1.3 Mô hình không gian trạng thái và ước tính trạng thái ẩn: Bộ lọc Kalman và HMM

Trong nhiều hệ thống thực tế, chuỗi thời gian bạn quan sát được chỉ là **biểu hiện bề ngoài đã bị nhiễm nhiễu**, còn điều thực sự quan tâm là "trạng thái hệ thống" tiến hóa theo thời gian phía sau: ví dụ vị trí và vận tốc thực của phương tiện, trạng thái sức khỏe thiết bị, mẫu hành vi tiềm ẩn của người dùng, v.v. Lúc này, nếu vẫn chỉ mô hình hóa theo kiểu ARIMA trên chuỗi quan sát, sẽ khó tận dụng đầy đủ sự hiểu biết về cấu trúc hệ thống. **Mô hình không gian trạng thái (State Space Models)** chính là được đề xuất cho bài toán "trạng thái ẩn + quan sát nhiễu" này.

Mô hình không gian trạng thái thường gồm hai phần:

- Phương trình chuyển trạng thái: mô tả trạng thái ẩn tiến hóa theo thời gian như thế nào, có thể tuyến tính hoặc phi tuyến;
- Phương trình quan sát: mô tả trạng thái ẩn sinh ra các giá trị quan sát có nhiễu như thế nào.

Dưới giả định tuyến tính Gaussian, khung này có thể thực hiện ước tính và dự báo trạng thái đệ quy thông qua **bộ lọc Kalman (Kalman Filter) và bộ làm mượt (Smoother)**: mỗi bước gồm hai giai đoạn "dự báo" và "cập nhật", kết hợp phân phối trạng thái tại thời điểm trước với quan sát hiện tại để thu được ước tính trạng thái mới. Điều này cực kỳ phổ biến trong dẫn đường và định vị (như ước tính quỹ đạo, theo dõi mục tiêu), chuỗi thời gian tài chính (như ước tính biến động), ước tính trạng thái thiết bị (như giám sát sức khỏe, dự báo tuổi thọ còn lại).

Liền kề với mô hình không gian trạng thái liên tục là **mô hình Markov ẩn (HMM)**. HMM giả định hệ thống chuyển đổi theo thời gian giữa một số trạng thái ẩn rời rạc, phân phối xác suất sinh dữ liệu quan sát khác nhau ở mỗi trạng thái ẩn. Thông qua thuật toán forward-backward và thuật toán Viterbi, HMM có thể ước tính chuỗi trạng thái ẩn, tính xác suất chuỗi quan sát, và dự báo trạng thái cùng quan sát bước tiếp theo. HMM ban đầu được dùng rộng rãi trong nhận dạng giọng nói, gán nhãn văn bản, cũng thường dùng cho nhận dạng mẫu hành vi đơn giản và mô hình hóa chuỗi sự kiện, vẫn có ưu thế trong một số tình huống công nghiệp và tài chính — cấu trúc dễ giải thích, huấn luyện ổn định, dễ kết hợp với kinh nghiệm chuyên ngành.

Ở cấp độ hệ thống, mô hình hóa không gian trạng thái, bộ lọc Kalman và HMM thường đóng vai trò module nền tảng của **hệ thống ước tính quỹ đạo, ước tính trạng thái thiết bị, kiểm soát tài chính và kỹ thuật**, được đóng gói trong chuỗi công cụ lớn hơn. Chúng không nhất thiết được phơi bày trực tiếp cho người dùng cuối, nhưng phía sau các sản phẩm dẫn đường, theo dõi mục tiêu, kiểm soát công nghiệp, đo lường rủi ro, chúng lâu dài đóng vai trò "động cơ vô hình".
## 6.2 Mô hình hóa chuỗi thời gian bằng học sâu (Deep TS Forecasting)

Khi quy mô dữ liệu và độ phức tạp của các tình huống ứng dụng ngày càng tăng, các mô hình cổ điển dựa thuần túy vào giả định tuyến tính và dừng bắt đầu tỏ ra "bất lực" trong nhiều bài toán thực tế: các mẫu phi tuyến phức tạp, phụ thuộc dài hạn, tương tác đa biến phức tạp, hành vi đột biến và sự chồng chất của các chu kỳ — tất cả đòi hỏi những cấu trúc mô hình linh hoạt hơn và dung lượng lớn hơn. **Mô hình hóa chuỗi thời gian bằng học sâu** ra đời chính trong bối cảnh đó: từ RNN/LSTM/GRU, đến Temporal CNN/TCN, rồi đến Transformer chuyên dụng cho chuỗi thời gian, các mô hình lai và phân cấp — tất cả cùng tạo nên bộ công cụ chủ lực của dự báo và mô hình hóa chuỗi thời gian hiện đại.

Nhìn từ góc độ ứng dụng, các mô hình học sâu cho chuỗi thời gian đã được triển khai rộng rãi trong **nền tảng dự báo lưu lượng & doanh số thương mại điện tử, hệ thống dự báo cung/cầu/vận lực/lịch trình, công cụ dự báo tải tài nguyên đám mây và lập kế hoạch năng lực** — phục vụ bài toán dự báo thống nhất và linh hoạt trong cấu trúc phức tạp nhiều danh mục, nhiều cửa hàng, nhiều thành phố, thậm chí nhiều dòng kinh doanh. So với các mô hình cổ điển, chúng chú trọng hơn vào "học biểu diễn đầu cuối" và "mô hình hóa mẫu toàn cục", đồng thời vượt trội hơn trong các tình huống chuỗi dài, chiều cao và đa biến. Dưới đây, chúng ta cũng khai thác theo ba chiều **tình huống**, **nguyên lý** và **mô hình**.

- **Tình huống**
  - Dự báo nhiều chuỗi quy mô lớn: hàng nghìn chuỗi doanh số/lưu lượng theo chiều sản phẩm, cửa hàng, thành phố cần được mô hình hóa đồng thời trong một mô hình thống nhất, đồng thời hỗ trợ cold-start và chuỗi đuôi dài.
  - Vận hành và lập lịch phức tạp: trong các hệ thống điện/nước/vận lực/lịch trình, nhu cầu chịu tác động của nhiều đặc trưng đa chiều (thời tiết, ngày lễ, giá cả, sự kiện), và tồn tại cấu trúc nhiều cấp bậc (cửa hàng/thành phố/toàn quốc), cần cân bằng đồng thời mẫu toàn cục và sự khác biệt cục bộ.
  - Tài nguyên đám mây và hạ tầng: các cụm máy chủ quy mô lớn, nền tảng container, tải mạng và lưu trữ có tính phi tuyến cao và cấu trúc đa đỉnh, đòi hỏi dự báo tần suất cao và hỗ trợ lập kế hoạch năng lực để đảm bảo SLO.
- **Nguyên lý**
  Cốt lõi của các mô hình học sâu cho chuỗi thời gian là **tự động học các mẫu đa tỉ lệ và phụ thuộc dài hạn từ chuỗi lịch sử và các biến đồng hành**:
  - RNN/LSTM/GRU truyền "bộ nhớ" tường minh qua chiều thời gian bằng cấu trúc hồi tiếp, phù hợp để nắm bắt phụ thuộc tuần tự và cấu trúc thời gian cục bộ.
  - Temporal CNN / TCN sử dụng tích chập một chiều và tích chập giãn nở, mở rộng vùng tiếp nhận trong khi đảm bảo tính nhân quả, cho phép huấn luyện song song và truyền gradient ổn định.
  - Transformer chuỗi thời gian và các biến thể chuyên dụng (Informer, Autoformer, TimesNet, v.v.) tận dụng cơ chế tự chú ý để mô hình hóa các phụ thuộc phức tạp và mẫu chu kỳ trong tình huống chuỗi dài, đa biến.
  - Các mô hình lai và phân cấp đưa thêm giả định cấu trúc "toàn cục + cục bộ" và "chuỗi thời gian nhiều cấp", cho phép đồng thời học mẫu toàn cục và đặc trưng cá thể trong một khung thống nhất.
- **Mô hình**
  Trong triển khai cụ thể, mô hình hóa học sâu cho chuỗi thời gian đã sản sinh ra một loạt kiến trúc tiêu biểu:
  - Mô hình chuỗi học sâu cổ điển: RNN/LSTM/GRU và các mô hình dự báo xác suất tự hồi quy như DeepAR xây dựng trên chúng.
  - Mô hình tích hợp phân rã và dự báo: N‑BEATS và tương tự, tăng cường khả năng giải thích thông qua các mô-đun phân rã xu hướng/mùa vụ tường minh.
  - Mô hình chuỗi thời gian dựa trên chú ý: Temporal Fusion Transformer (TFT) và tương tự, kết hợp chú ý, cổng và lựa chọn biến, phù hợp với các tình huống kinh doanh đa biến giàu biến đồng hành.
  - Mô hình Transformer chuỗi dài: Informer, Autoformer, TimesNet, PatchTST, v.v., được thiết kế chuyên biệt xoay quanh hiệu quả chuỗi dài và mô hình hóa đa tỉ lệ.

Dưới đây, chúng ta sẽ khai thác theo ba hướng: mô hình chuỗi học sâu, tích chập và Transformer, cùng mô hình lai và phân cấp.

### 6.2.1 RNN/LSTM/GRU học sâu: Từ đơn chuỗi đến DeepAR

Trong giai đoạn đầu học sâu tiếp cận lĩnh vực chuỗi thời gian, **RNN/LSTM/GRU** là lựa chọn tự nhiên nhất. Tương tự như mô hình hóa văn bản và giọng nói, chúng "ghi nhớ" thông tin lịch sử bằng cách truyền trạng thái ẩn qua các bước thời gian, cho phép nắm bắt các phụ thuộc phi tuyến và dài hạn phức tạp hơn so với các mô hình tuyến tính truyền thống. Với một hoặc vài chuỗi thời gian, LSTM/GRU đơn giản có thể đạt kết quả dự báo tốt khi có đủ dữ liệu; còn trong tình huống nhiều chuỗi quy mô lớn, có thể sử dụng **mô hình RNN/LSTM/GRU chia sẻ tham số**, huấn luyện chung trên tất cả các chuỗi để học các mẫu thời gian chung.

Trên nền tảng đó, các mô hình xác suất tự hồi quy như **DeepAR** cung cấp một khung chuẩn cho mô hình hóa học sâu chuỗi thời gian: mô hình đưa các quan sát lịch sử và biến đồng hành vào một mạng RNN/LSTM/GRU chia sẻ, tại mỗi bước thời gian xuất ra các tham số phân phối có điều kiện của giá trị chuỗi (như Gaussian, phân phối nhị thức âm, v.v.), và thực hiện dự báo xác suất đầu cuối thông qua huấn luyện hợp lý tối đa. Thiết kế này cho phép mô hình tự nhiên tạo ra khoảng dự báo, xử lý thang đo không đều và hỗn hợp nhiều chuỗi, thuận lợi cho việc triển khai trong các tình huống như dự báo doanh số thương mại điện tử, dự báo nhu cầu.

Tuy nhiên, các mô hình RNN tồn tại những vấn đề điển hình: suy giảm gradient trên chuỗi dài, và không thể song song hóa hoàn toàn trong giai đoạn huấn luyện. Mặc dù cơ chế cổng (LSTM/GRU) giảm nhẹ một phần vấn đề, nhưng với khoảng thời gian đặc biệt dài và dữ liệu tần suất cao, hiệu quả huấn luyện và suy luận vẫn là yếu tố cần đánh đổi. Điều này thúc đẩy ngành công nghiệp và giới học thuật khám phá các cấu trúc thân thiện với song song hóa hơn, như TCN và Transformer.

### 6.2.2 Temporal CNN và Transformer: Từ tích chập cục bộ đến chú ý chuỗi dài

Để giải quyết vấn đề hiệu quả và ổn định của RNN trên chuỗi dài, **Temporal CNN / TCN** đưa vào tích chập một chiều và tích chập giãn nở để mô hình hóa phụ thuộc thời gian: bằng cách xếp chồng nhiều lớp tích chập nhân quả và mở rộng vùng tiếp nhận theo từng lớp, nó mô hình hóa được lịch sử xa mà không vi phạm tính nhân quả thời gian. So với RNN, TCN có thể song song hóa cao trong quá trình huấn luyện, đường truyền gradient ngắn hơn, do đó nổi bật về tính ổn định và hiệu quả huấn luyện, phù hợp để sử dụng trong các tình huống dự báo chuỗi thời gian công nghiệp với dữ liệu tần suất cao cần vùng tiếp nhận lớn.

Ở mức độ phức tạp cao hơn, **Transformer và các cấu trúc chuyên dụng cho chuỗi thời gian** trở thành nhân vật chính trong mô hình hóa chuỗi thời gian dài, đa biến những năm gần đây. Việc sử dụng trực tiếp Transformer chuẩn gặp vấn đề độ phức tạp tính toán tăng theo bình phương độ dài chuỗi, vì vậy đã xuất hiện một loạt các giải pháp cải tiến hướng đến chuỗi thời gian:

- **Informer** giảm gánh nặng tính toán trên chuỗi dài thông qua các cơ chế như tự chú ý thưa xác suất, đồng thời tối ưu hóa cấu trúc cho bài toán dự báo.
- **Autoformer** tích hợp phân rã xu hướng và mùa vụ vào khung tự chú ý, cố gắng nâng cao khả năng giải thích và tính ổn định trong khi vẫn duy trì khả năng mô hình hóa chuỗi dài.
- **TimesNet** tăng cường nhận thức về chu kỳ và mẫu thông qua khai triển trong miền thời gian–tần số hoặc đa tỉ lệ, xử lý tốt hơn các chuỗi dài phức tạp và đa chu kỳ.
- **PatchTST** mượn ý tưởng "patch" của Vision Transformer, xem các chuỗi con liên tiếp như các miếng vá, nâng cao hiệu quả mô hình hóa và khả năng tổng quát hóa trên chuỗi dài.

Các mô hình này thường đặc biệt phù hợp với các tình huống chuỗi thời gian phức tạp có **chuỗi dài, đa biến, biến đồng hành chiều cao**, như tải tài nguyên đám mây quy mô lớn, nhu cầu năng lượng đa khu vực, dự báo lưu lượng đa kênh. Chúng có thể đồng thời mô hình hóa đầu vào đa chiều, đặc trưng tĩnh và biến phụ thuộc thời gian trong một kiến trúc thống nhất, đồng thời cung cấp một số manh mối cho giải thích và chẩn đoán sau này thông qua trọng số chú ý.

### 6.2.3 Mô hình lai và phân cấp: Toàn cục + Cục bộ, Chuỗi thời gian nhiều cấp

Trong thực tế kinh doanh, các chuỗi thời gian hiếm khi "cô lập": chúng thường có **cấu trúc phân cấp rõ ràng và các mẫu chia sẻ** — ví dụ như phân cấp doanh số cửa hàng/thành phố/khu vực/toàn quốc, phân cấp sản phẩm SKU/danh mục/thương hiệu, hoặc cấu trúc tổ chức dòng kinh doanh/sản phẩm/kênh. Nếu đơn giản mô hình hóa riêng từng chuỗi, rất khó tận dụng cấu trúc phân cấp này; còn nếu trộn lẫn tất cả các chuỗi lại với nhau, sẽ bỏ qua sự khác biệt cá thể hóa của mỗi chuỗi. **Mô hình lai và phân cấp** được thiết kế chính để giải quyết các vấn đề như vậy.

Một hướng tư duy phổ biến là **mô hình toàn cục + cục bộ**: thông qua một "mô hình toàn cục" chia sẻ để học các mẫu chung của tất cả chuỗi (như xu hướng tổng thể, hiệu ứng ngày lễ, mùa vụ), đồng thời đưa vào tham số cục bộ hoặc vector nhúng cho mỗi chuỗi hoặc mỗi nhóm con, để nắm bắt đặc tính cá thể. Cấu trúc này vừa tránh được vấn đề thưa dữ liệu do huấn luyện mô hình riêng biệt cho chuỗi đuôi dài, vừa giữ lại khả năng mô hình hóa tinh tế trên các chuỗi phổ biến.

Hướng khác là **mô hình hóa chuỗi thời gian nhiều cấp (hierarchical TS)**: trong quá trình dự báo tường minh xem xét các ràng buộc cấp bậc (như tổng các cấp con cần nhất quán với dự báo cấp trên), thông qua tối ưu hóa chung từ trên xuống, từ dưới lên hoặc cấp trung gian, đảm bảo các dự báo ở các cấp bậc nhất quán về mặt số học và cấu trúc. Trong khung học sâu chuỗi thời gian, điều này thường biểu hiện như thêm đặc trưng cấp bậc vào mã hóa đầu vào, thiết kế đầu ra đa đầu cho các cấp bậc khác nhau, hoặc sử dụng hàm mất mát phân cấp để huấn luyện.

Nhìn từ góc độ sản phẩm, loại mô hình lai và phân cấp này được ứng dụng rộng rãi trong các tình huống như **nền tảng dự báo doanh số thương mại điện tử, hệ thống dự báo cung/cầu/vận lực/lịch trình**: hệ thống cần đồng thời đưa ra dự báo ở các độ hạt khác nhau như "đơn cửa hàng đơn sản phẩm", "cấp thành phố", "tổng toàn quốc", và duy trì tính nhất quán giữa các cấp trên và dưới trong quá trình lập kế hoạch tài nguyên và phân bổ KPI. Cấu trúc linh hoạt của các mô hình học sâu cho phép loại ràng buộc này được nhúng vào quá trình mô hình hóa theo phương thức đầu cuối, thay vì hoàn toàn phụ thuộc vào hiệu chỉnh hậu kỳ.
## 6.3 Phát hiện bất thường và phát hiện điểm thay đổi (Anomaly & Change Point Detection)

Trong bối cảnh chuỗi thời gian, "dự đoán tương lai" chỉ là một phần của vấn đề — phần còn lại quan trọng không kém là: **phát hiện bất thường và thay đổi cấu trúc theo thời gian thực**. Dù là vận hành thiết bị, chỉ số kinh doanh, hành vi giao dịch hay giám sát vận hành hệ thống, phát hiện bất thường và phát hiện điểm thay đổi đều là năng lực cốt lõi để đảm bảo hệ thống ổn định và nhận diện rủi ro. Theo truyền thống, các phương pháp dựa trên ngưỡng thống kê, EWMA, CUSUM được sử dụng rộng rãi; khi số chiều và độ phức tạp của dữ liệu tăng lên, các phương pháp machine learning và deep learning (Isolation Forest, One‑Class SVM, AutoEncoder/VAE, time-series GAN, GNN + mô hình chuỗi thời gian) cũng bắt đầu đóng vai trò quan trọng.

Xét về hình thái sản phẩm, các năng lực này thường được tích hợp sẵn trong **hệ thống cảnh báo lỗi thiết bị, nền tảng cảnh báo bất thường chỉ số kinh doanh (như tỷ lệ chuyển đổi giảm đột ngột), hệ thống phát hiện tấn công bảo mật và gian lận, engine cảnh báo AIOps vận hành** — giám sát theo thời gian thực tín hiệu chuỗi thời gian đa chiều, tự động đánh dấu các điểm nghi ngờ và thay đổi cấu trúc, kết hợp với luồng quy tắc, cơ sở tri thức và quyết định thủ công. Dưới đây, chúng ta sẽ triển khai theo ba góc độ: **tình huống**, **nguyên lý** và **mô hình**.

- **Tình huống**
  - Thiết bị và hệ thống công nghiệp: Giám sát dữ liệu cảm biến nhiệt độ, rung động, dòng điện, áp suất — phát hiện sớm xu hướng hỏng hóc và suy giảm, giảm thiểu thời gian dừng máy và thiệt hại.
  - Chỉ số kinh doanh và vận hành: Giám sát các chỉ số quan trọng như PV/UV, tỷ lệ chuyển đổi, số đơn hàng, độ trễ, tỷ lệ lỗi — nhanh chóng phát hiện giảm đột ngột, tăng đột ngột, biến động bất thường, cung cấp cảnh báo cho đội ngũ vận hành và kỹ thuật.
  - Bảo mật và kiểm soát rủi ro: Phân tích chuỗi thời gian về hành vi đăng nhập, chuỗi giao dịch, mẫu truy cập — nhận diện các cuộc tấn công tiềm ẩn, gian lận và hành vi gian lận.
- **Nguyên lý**
  Phát hiện bất thường và điểm thay đổi về bản chất là tìm kiếm sự lệch lạc đáng kể và biến đổi cấu trúc so với "mẫu bình thường":
  - Đối với bất thường điểm và bất thường chuỗi, có thể dùng khớp phân phối thống kê, ước lượng mật độ hoặc học biên giới để xác định liệu quan sát hiện tại có nằm ngoài "vùng bình thường" hay không.
  - Đối với điểm thay đổi, cần chú ý đến sự biến đổi đột ngột của các đặc tính thống kê (trung bình, phương sai, cấu trúc tương quan, phân phối, v.v.) của chuỗi thời gian trên trục thời gian, và cố gắng xác định vị trí thời gian xảy ra thay đổi.
  - Trong mạng đa chiều và đa điểm, cần đưa cấu trúc phụ thuộc giữa nhiều chuỗi thời gian (như topo, tương quan) vào mô hình hóa, tránh nhầm lẫn bất thường cục bộ với xu hướng tổng thể.
- **Mô hình**
  Xét theo nhóm phương pháp, có thể chia thành phương pháp thống kê, phương pháp học đơn lớp/cô lập, mô hình deep learning tái tạo và mô hình kết hợp đồ thị + chuỗi thời gian:
  - Phát hiện bất thường thống kê: Ngưỡng, EWMA, CUSUM, v.v. — cực kỳ hiệu quả cho biến đơn hoặc tình huống đơn giản, là nền tảng của hệ thống giám sát truyền thống.
  - Phương pháp machine learning: Isolation Forest, One‑Class SVM, v.v. — dùng để mô tả "vùng bình thường" trong không gian đặc trưng đa chiều, cô lập các mẫu bất thường.
  - Mô hình deep learning tái tạo: AutoEncoder / VAE / time-series GAN — học tái tạo chuỗi bình thường, đánh dấu bất thường khi lỗi tái tạo tăng lớn.
  - GNN + mô hình chuỗi thời gian: Trong các tình huống mạng cảm biến, chỉ số microservice, v.v. — đưa cấu trúc đồ thị và mô hình chuỗi thời gian vào học chung mẫu bình thường, tăng cường nhận diện bất thường liên quan đến topo.

Dưới đây, chúng ta sẽ triển khai theo ba hướng: bất thường điểm/chuỗi, phát hiện điểm thay đổi, đa chiều và cấu trúc đồ thị.

### 6.3.1 Bất thường điểm và bất thường chuỗi: Từ ngưỡng thống kê đến mô hình tái tạo

Dạng phát hiện bất thường trực quan nhất là **bất thường điểm**: giá trị quan sát tại một thời điểm lệch xa khỏi phạm vi bình thường lịch sử (như CPU đột ngột tăng lên 100%, giá trị giao dịch tăng bất thường, giá trị cảm biến nhảy đột ngột). Trong phương pháp truyền thống, cách phổ biến nhất là khớp phân phối thống kê hoặc thống kê trượt (trung bình, phương sai, phân vị) trên dữ liệu lịch sử bình thường, từ đó thiết lập ngưỡng hoặc biểu đồ kiểm soát (như EWMA, CUSUM), phát cảnh báo khi quan sát hiện tại vượt ra ngoài khoảng chấp nhận. Ưu điểm là đơn giản, chi phí tính toán thấp, dễ giải thích — do đó vẫn được sử dụng rộng rãi trong giám sát vận hành và hệ thống công nghiệp.

Khi số chiều tăng hoặc mẫu trở nên phức tạp hơn, có thể đưa vào các phương pháp học đơn lớp/cô lập như **Isolation Forest, One‑Class SVM**: chúng học một vùng tổng hợp (hoặc biên giới) trên "mẫu bình thường", coi các điểm nằm ngoài vùng đó là bất thường. Bằng cách trích xuất đặc trưng thống kê trên cửa sổ trượt của chuỗi (như trung bình cửa sổ, phương sai, đặc trưng miền tần số), các phương pháp này cũng có thể dùng để nhận diện "bất thường chuỗi" cục bộ (tức là hành vi trong một khoảng thời gian lệch khỏi mẫu bình thường), phù hợp với chỉ số đa chiều và các tình huống khó định nghĩa chính xác dạng phân phối.

Trong framework deep learning, các phương pháp **AutoEncoder / VAE / time-series GAN dựa trên lỗi tái tạo** cung cấp lựa chọn linh hoạt hơn:

- Dùng AutoEncoder hoặc VAE để huấn luyện mô hình "nén–tái tạo" trên lượng lớn chuỗi bình thường, giúp mô hình học cách tái tạo mẫu bình thường;
- Trong giám sát trực tuyến, đưa cửa sổ thời gian mới vào mô hình — nếu lỗi tái tạo tăng lớn đáng kể, thì khoảng đó được coi là có bất thường;
- Các phương pháp time-series GAN học cách sinh chuỗi bình thường, tìm tín hiệu bất thường trong kết quả phán định của discriminator hoặc lỗi sinh.

Các phương pháp này có thể thích nghi với các mẫu phi tuyến tính cao và cấu trúc biến hiệp phức tạp, đặc biệt phù hợp để xây dựng engine phát hiện bất thường thống nhất trên **chỉ số kinh doanh đa chiều, dữ liệu cảm biến thiết bị phức tạp**.

### 6.3.2 Phát hiện điểm thay đổi: Biến đổi cấu trúc đột ngột và sự kiện có hiệu lực

Khác với bất thường điểm và bất thường cục bộ, **Phát hiện điểm thay đổi (Change Point Detection)** tập trung vào sự biến đổi đột ngột về cấu trúc của chuỗi thời gian: ví dụ trung bình nhảy từ mức này sang mức khác, độ biến động thay đổi, chu kỳ và cấu trúc tương quan điều chỉnh. Những thay đổi này thường tương ứng với một sự kiện hoặc chuyển đổi trạng thái nào đó trong thế giới thực, như thay đổi cấu hình, áp dụng chính sách mới, điều chỉnh chính sách, thay đổi quy trình sản xuất, chuyển đổi regime thị trường — cực kỳ quan trọng cho chẩn đoán kinh doanh và phân tích nhân quả.

Trong phương pháp thống kê truyền thống, phát hiện điểm thay đổi thường dùng các kỹ thuật như kiểm định tỷ số likelihood, CUSUM, Bayesian Online Change Point Detection (BOCPD):

- Khớp mô hình với các tham số khác nhau (như trung bình/phương sai khác nhau) trước và sau các thời điểm khác nhau, so sánh độ khớp của "giả thuyết không có điểm thay đổi" và "giả thuyết có điểm thay đổi";
- Trong tình huống trực tuyến, cập nhật đệ quy xác suất hậu nghiệm "liệu đến thời điểm hiện tại có xuất hiện điểm thay đổi hay không" cho mỗi thời điểm — khi vượt ngưỡng đặt sẵn thì kích hoạt cảnh báo.

Trong các thiết lập phức tạp hơn, có thể kết hợp học biểu diễn deep learning với mô hình phân đoạn, coi phát hiện điểm thay đổi như một **bài toán phân đoạn chuỗi**: dùng mạng nơ-ron trích xuất đặc trưng, rồi tìm biên giới đoạn trong không gian đặc trưng, hoặc trực tiếp huấn luyện mô hình dự đoán xác suất một thời điểm thuộc "điểm thay đổi". Điều này đặc biệt hữu ích cho các chỉ số kinh doanh có nhiều dạng thay đổi (không chỉ thay đổi trung bình/phương sai) và khó mô tả bằng giả thuyết thống kê đơn giản.

Trong hệ thống sản phẩm, phát hiện điểm thay đổi thường được tích hợp trong **nền tảng phân tích chỉ số kinh doanh, hệ thống phân tích thực nghiệm A/B, công cụ giám sát thay đổi cấu hình và chiến lược**: khi chỉ số quan trọng có sự thay đổi mang tính cấu trúc, hệ thống có thể tự động đánh dấu điểm thay đổi tiềm năng và liên kết với các sự kiện thay đổi tương ứng (như phát hành phiên bản, điều chỉnh tham số, triển khai chính sách), cung cấp manh mối cho phân tích nguyên nhân gốc rễ sau này.

### 6.3.3 Chuỗi thời gian đa chiều và cấu trúc đồ thị: Mô hình hóa kết hợp GNN + mô hình chuỗi thời gian

Trong hệ thống phân tán hiện đại và bối cảnh IoT, chúng ta thường đối mặt với **chuỗi thời gian đa điểm, đa chiều, có cấu trúc topo liên kết**: ví dụ nhiều điểm đo trong mạng cảm biến, các chỉ số dịch vụ trong kiến trúc microservice, nhiều nút và cạnh trong lưới điện/mạng giao thông. Khi đó, việc phát hiện bất thường riêng lẻ trên từng chuỗi thời gian rất dễ nhận định sai biến động cục bộ hoặc bỏ qua mẫu tổng thể — bất thường thực sự thường là biểu hiện của "không nhất quán cục bộ–tổng thể" hoặc "không hài hòa trong cấu trúc topo".

Vì vậy, những năm gần đây đã xuất hiện nhiều phương pháp kết hợp **GNN (Graph Neural Network) + mô hình chuỗi thời gian**:

- Đầu tiên xây dựng cấu trúc đồ thị biểu diễn quan hệ giữa nhiều điểm dựa trên topo thực tế (kết nối vật lý, topo mạng) hoặc đồ thị tương quan ước lượng từ dữ liệu;
- Tại mỗi bước thời gian, dùng GNN thực hiện truyền thông điệp trên đặc trưng nút (giá trị chuỗi thời gian và ngữ cảnh cục bộ của từng điểm), học đặc trưng tương quan không gian;
- Tiếp theo đưa biểu diễn sau mã hóa đồ thị vào các mô hình chuỗi thời gian như RNN, TCN hoặc Transformer để nắm bắt mẫu động theo chiều thời gian;
- Cuối cùng thực hiện chấm điểm bất thường hoặc phát hiện điểm thay đổi trên biểu diễn kết hợp, đạt được **nhận diện bất thường kết hợp không–thời gian**.

Framework này đặc biệt phù hợp với các tình huống như **giám sát mạng cảm biến, phát hiện bất thường chỉ số microservice, phát hiện bất thường không–thời gian trong tính toán đô thị**: nó có thể phân biệt "thay đổi toàn cục" (như tải toàn bộ hệ thống tăng) với "bất thường cục bộ" (như một nút bị tắc nghẽn bất thường), đồng thời nhận diện tốt hơn các mẫu bất thường liên quan đến cấu trúc topo (như vấn đề cấp liên kết, sự cố mạng khu vực).

Ở cấp độ kỹ thuật, các phương pháp này thường xuất hiện như năng lực nâng cao của **hệ thống cảnh báo AIOps vận hành, nền tảng bảo mật và kiểm soát rủi ro, hệ thống giám sát nhóm thiết bị** — kết hợp với giám sát thống kê cơ bản, hệ thống quy tắc và tri thức chuyên gia, cung cấp cơ chế phát hiện bất thường thông minh hơn và nhận thức ngữ cảnh hơn cho các hệ thống phức tạp.
## 6.4 Chuỗi Thời Gian - Không Gian (Spatio-Temporal Modeling)

Trong nhiều tình huống nghiệp vụ quan trọng, chỉ mô hình hóa "thời gian" là chưa đủ: **"khi nào" và "ở đâu" tồn tại song song** và hai yếu tố này có mức độ liên kết rất cao. Lưu lượng giao thông đô thị chịu ảnh hưởng đồng thời bởi cấu trúc mạng đường và quy luật thời gian; khí tượng và chất lượng không khí phụ thuộc vào cả quá trình diễn biến theo thời gian lẫn sự lân cận địa lý và trường khí quyển; logistics, xe đạp chia sẻ và đặt xe trực tuyến đều cần xem xét đồng thời phân bố thời gian - không gian của nhu cầu cùng cấu trúc đường/khu vực. **Mô hình hóa chuỗi thời gian - không gian (Spatio-Temporal Modeling)** chính là phương pháp hệ thống giải quyết bài toán mô hình hóa kết hợp "thời gian + không gian" này.

So với mô hình chuỗi thời gian thuần túy, mô hình thời gian - không gian cần đưa **cấu trúc phụ thuộc không gian** vào xem xét một cách tường minh: lưu lượng giao thông của các đoạn đường lân cận, chất lượng không khí của các trạm quan trắc gần nhau, tải và trạng thái của các nút kết nối thường có mức tương quan cao hơn so với các điểm ở xa nhau. Vì vậy, các cấu trúc như mạng nơ-ron đồ thị (GNN), ConvLSTM được sử dụng rộng rãi để kết hợp học đặc trưng theo cả hai chiều không gian và thời gian. Ở tầng sản phẩm, những khả năng này hỗ trợ một loạt ứng dụng then chốt như **nền tảng tính toán đô thị (dự báo giao thông/luồng người), hệ thống dự báo khí tượng/môi trường, lập kế hoạch tuyến đường logistics và nền tảng điều phối xe đạp chia sẻ/đặt xe trực tuyến**.

- **Tình huống ứng dụng**
  - Dự báo lưu lượng giao thông và luồng người: Trên cấu trúc mạng đường hoặc mạng tàu điện ngầm, dự báo lưu lượng xe, người đi lại trong từng khung giờ, hỗ trợ tối ưu đèn tín hiệu, quản lý ùn tắc và quyết định điều phối.
  - Quan trắc khí tượng và môi trường: Trên lưới địa lý hoặc mạng trạm quan trắc, dự báo phân bố thời gian - không gian của nhiệt độ, lượng mưa, gió, chất lượng không khí trong tương lai, cung cấp cơ sở cho dự báo và ra quyết định.
  - Điều phối logistics và vận tải: Dự báo nhu cầu đơn hàng, phân bố phương tiện, tải của kho/trạm trên cấu trúc khu vực đô thị hoặc mạng đường, cung cấp căn cứ cho lập kế hoạch tuyến, điều phối phương tiện và phân bổ năng lực vận tải.
- **Nguyên lý**
  Cốt lõi của mô hình hóa chuỗi thời gian - không gian là **đồng thời học tương quan không gian và động học thời gian trong một khung thống nhất**:
  - Theo chiều không gian, sử dụng cấu trúc đồ thị hoặc cấu trúc tích chập để mô tả "ai liên quan đến ai", từ đó thực hiện truyền thông điệp và tổng hợp đặc trưng;
  - Theo chiều thời gian, sử dụng RNN, TCN, Transformer hoặc cấu trúc chuỗi thời gian chuyên biệt để mô tả sự thay đổi động;
  - Hai chiều này có thể được kết nối nối tiếp (không gian trước, thời gian sau), hoặc đan xen hoặc tác động đồng thời (như tích chập thời gian - không gian, chú ý thời gian - không gian).
- **Mô hình**
  Hầu hết các mô hình thời gian - không gian điển hình đều áp dụng dạng kết hợp "GNN + mô hình chuỗi thời gian" hoặc "tích chập + LSTM":
  - Mạng nơ-ron đồ thị + mô hình chuỗi thời gian: ST-GCN, DCRNN, Graph WaveNet, ST-Transformer, v.v., sử dụng tích chập đồ thị hoặc chú ý đồ thị để nắm bắt phụ thuộc không gian, rồi dùng cấu trúc chuỗi thời gian để nắm bắt động học thời gian.
  - Mô hình ConvLSTM: ConvLSTM, Conv-TT-LSTM, v.v., nhúng cổng tích chập không gian vào quá trình đệ quy chuỗi thời gian, thực hiện mô hình hóa kết hợp các đặc trưng cục bộ thời gian - không gian.

Dưới đây, chúng ta sẽ triển khai theo ba hướng: tác vụ & biểu diễn dữ liệu thời gian - không gian, GNN + mô hình chuỗi thời gian, và ConvLSTM cùng tích chập thời gian - không gian.

### 6.5.1 Tác Vụ & Biểu Diễn Dữ Liệu Thời Gian - Không Gian: Từ Mạng Đường Đến Lưới Địa Lý

Trước khi đi vào các mô hình cụ thể, mô hình hóa chuỗi thời gian - không gian trước tiên phải giải quyết bài toán **biểu diễn cấu trúc không gian như thế nào**. Khác với trục thời gian một chiều, cấu trúc không gian có thể là lưới đều (grid), đồ thị không đều (graph), hoặc dạng hỗn hợp.

- Trong tình huống giao thông, đường và nút giao thông tự nhiên tạo thành một đồ thị có hướng hoặc vô hướng: nút biểu diễn đoạn đường hoặc ngã tư, cạnh biểu diễn kết nối đường và hướng di chuyển; mỗi nút tại mỗi bước thời gian có một tập đặc trưng như lưu lượng xe, tốc độ trung bình, chỉ số ùn tắc, v.v.
- Trong dự báo khí tượng và chất lượng không khí, có thể sử dụng lưới địa lý đều (như lưới kinh vĩ độ), hoặc xây dựng quan hệ lân cận giữa các trạm quan trắc thành cấu trúc đồ thị, định nghĩa trọng số cạnh dựa trên khoảng cách địa lý, hướng gió hoặc tương quan.
- Trong logistics và vận tải chia sẻ, có thể chia đô thị thành các ô lưới hoặc đơn vị khu vực, mỗi đơn vị theo thời gian có các đặc trưng như số lượng đơn hàng, số phương tiện hoạt động, đồng thời về không gian được kết nối thông qua quan hệ lân cận hoặc khoảng cách đường thực tế.

Biểu diễn thống nhất theo dạng "**cấu trúc không gian + chuỗi thời gian**" này cho phép nhiều tình huống khác nhau được mô hình hóa thành các bài toán tương tự: cho trước chuỗi thời gian - không gian lịch sử, dự báo trạng thái của từng nút hoặc ô lưới trong một số bước thời gian trong tương lai. Thiết kế các mô hình tiếp theo (dù là GNN + mô hình chuỗi thời gian hay ConvLSTM) đều triển khai trên góc nhìn thống nhất này.

Ở tầng sản phẩm, sự trừu tượng hóa ở tầng này thường được đóng gói trong tầng dữ liệu và tầng mô hình hóa của **nền tảng tính toán đô thị, hệ thống dự báo khí tượng/môi trường, nền tảng lập kế hoạch tuyến và điều phối**: phía nghiệp vụ chỉ cần biết "chúng ta dự báo lưu lượng/nhu cầu tương lai trên mạng đường/lưới như thế nào", còn biểu diễn dữ liệu bên dưới và tích hợp thời gian - không gian được khung mô hình hóa xử lý thống nhất.

### 6.5.2 Mạng Nơ-ron Đồ Thị + Mô Hình Chuỗi Thời Gian: ST-GCN, DCRNN, Graph WaveNet, v.v.

Khi mô hình hóa chuỗi thời gian - không gian trên cấu trúc đồ thị, hướng tiếp cận phổ biến nhất hiện nay là kết hợp "**Mạng nơ-ron đồ thị (GNN) + mô hình chuỗi thời gian**". Các mô hình đại diện bao gồm **ST-GCN, DCRNN, Graph WaveNet, ST-Transformer**, v.v., với đặc điểm chung là:

- Theo chiều không gian, sử dụng tích chập đồ thị (GCN), chú ý đồ thị (GAT) hoặc tích chập miền phổ, v.v. để thực hiện "tổng hợp lân cận" trên đặc trưng nút tại mỗi bước thời gian, từ đó nắm bắt ảnh hưởng của phụ thuộc không gian và cấu trúc tô-pô;
- Theo chiều thời gian, sử dụng RNN (như GRU/LSTM), TCN hoặc Transformer để mô hình hóa chuỗi đặc trưng ở cấp nút, nắm bắt xu hướng thời gian và tính chu kỳ;
- Thông qua xếp chồng xen kẽ hoặc thiết kế kết hợp, cho phép mô hình học các mẫu cục bộ và toàn cục ở nhiều tỷ lệ thời gian - không gian.

Ví dụ, **DCRNN (Diffusion Convolutional RNN)** kết hợp tích chập đồ thị với đơn vị hồi quy có cổng, sử dụng tích chập khuếch tán để mô phỏng sự lan truyền thông tin trên mạng đường, rồi dùng RNN để nắm bắt động học theo chiều thời gian, rất phù hợp cho các tác vụ như dự báo lưu lượng giao thông. **Graph WaveNet** dựa trên tích chập đồ thị và tích chập thời gian, bổ sung thêm học cấu trúc đồ thị thích ứng và mô hình hóa đa tỷ lệ, nâng cao khả năng thích ứng với mạng đường phức tạp và tô-pô không đều. Các mô hình như **ST-Transformer** đưa cơ chế tự chú ý vào mô hình hóa thời gian - không gian, đồng thời xem xét tương quan giữa các vị trí thời gian và không gian khác nhau thông qua mô-đun chú ý thời gian - không gian.

Trong hệ thống thực tế, loại mô hình GNN + chuỗi thời gian này được triển khai rộng rãi trong **nền tảng dự báo giao thông và luồng người đô thị, hệ thống điều phối vận tải chia sẻ, giám sát mạng IoT phức tạp**, v.v. Chúng thường đóng vai trò là một trong những engine dự báo cốt lõi, kết hợp với hệ thống quy tắc, mô hình mô phỏng và chiến lược nghiệp vụ để tạo thành vòng lặp khép kín, giúp điều phối và lập kế hoạch vừa có thể xem xét cấu trúc toàn cục vừa có thể phản ứng với thay đổi cục bộ.

### 6.5.3 ConvLSTM và Tích Chập Thời Gian - Không Gian: ConvLSTM, Conv-TT-LSTM, v.v.

Một hướng quan trọng khác là mô hình hóa thời gian - không gian dựa trên **ConvLSTM** và các biến thể của nó. Khác với LSTM tiêu chuẩn truyền vector một chiều giữa các bước thời gian, ConvLSTM sử dụng toán tử tích chập trong cấu trúc cổng, khiến trạng thái ẩn và đầu vào đều được giữ dưới dạng tensor đa chiều (như feature map trên lưới không gian). Nhờ vậy, trong quá trình cập nhật trạng thái tại mỗi bước thời gian, vừa có đệ quy theo thời gian, vừa có tổng hợp tích chập cục bộ theo chiều không gian, thực hiện mô hình hóa tự nhiên các mẫu cục bộ thời gian - không gian.

Trên cơ sở đó, **các mô hình cải tiến như Conv-TT-LSTM** thử nghiệm các cơ chế phân tích tensor, chia sẻ tham số, tích chập đa tỷ lệ, v.v. để nâng cao khả năng biểu diễn và hiệu quả của mô hình, đáp ứng dữ liệu thời gian - không gian quy mô lớn hơn và phức tạp hơn. Ví dụ, trong dự báo khí tượng, có thể xếp chồng nhiều lớp ConvLSTM để thực hiện đệ quy thời gian - không gian trên ảnh đặc trưng khí tượng đa kênh (nhiệt độ, độ ẩm, hướng gió, v.v.), dự báo phân bố không gian trong vài giờ hoặc vài ngày tới từ một số khung lịch sử; trong giao thông và quan trắc môi trường, cũng có thể ánh xạ mạng đường hoặc điểm quan trắc lên lưới đều, sử dụng ConvLSTM và các mô hình tương tự để dự báo.

So với mô hình GNN + chuỗi thời gian, dòng ConvLSTM được sử dụng nhiều hơn trong các tình huống có **cấu trúc lưới đều, tính làm mịn không gian cục bộ rõ ràng**, như dự báo phản xạ radar thời tiết, dự báo lưới chất lượng không khí, dự báo khung hình video, v.v. Ưu điểm của nó là triển khai tương đối trực tiếp, dễ tận dụng cơ sở hạ tầng mạng tích chập hiện có để tăng tốc và triển khai, cũng dễ phối hợp với các mô hình thị giác như CNN/ViT, chẳng hạn kết hợp đặc trưng tích chập và đệ quy chuỗi thời gian trong mô hình hóa thời gian - không gian ảnh viễn thám.

Về dạng sản phẩm, các mô hình theo hướng này chủ yếu được dùng trong **hệ thống dự báo khí tượng/môi trường, nền tảng phân tích thời gian - không gian viễn thám, dự báo thời gian - không gian video và hình ảnh**, thường phơi bày năng lực lên tầng trên dưới dạng "bản đồ dự báo kịch bản thời gian - không gian tương lai", trở thành đầu vào quan trọng cho ra quyết định nghiệp vụ và phân tích trực quan hóa.

# 7. Tầng Agent và Gọi Công Cụ (Agents & Tool Use)

Ở các tầng năng lực thị giác, ngôn ngữ trước đó, mô hình phần lớn vẫn ở dạng "trả lời thụ động" — nhận đầu vào, đưa ra đầu ra. Nhưng trong nhiều nghiệp vụ thực tế, thứ chúng ta cần là một **agent thông minh có thể chủ động lập kế hoạch, gọi công cụ bên ngoài và kết nối các workflow**: nó không chỉ có thể nhìn/đọc/nghe, mà còn tự "quyết định bước tiếp theo là gì", chẳng hạn đi tra cứu tài liệu, chạy code, đọc/ghi file, gọi hệ thống nội bộ, rồi tổng hợp kết quả, giải thích và phản hồi lại cho người dùng.

Tầng này có thể được hiểu là tầng keo kết dính then chốt "biến mô hình cơ sở thành hệ thống có thể hành động": thông qua **giao diện gọi công cụ có cấu trúc, điều phối workflow, phối hợp đa agent và cơ chế human-in-the-loop**, mở rộng LLM từ một "nhân thức" mạnh mẽ thành "nhân viên kỹ thuật số" có thể hoàn thành các tác vụ đầu cuối đến đầu cuối.
## 7.1 Gọi Công Cụ và Thực Thi (Tool Calling / Function Calling)

Trong thời đại văn bản thuần túy — chỉ đọc không viết, chỉ nói không làm — LLM giống một "siêu đối thoại viên": có thể hiểu vấn đề, đưa ra gợi ý, viết code, liệt kê phương án, nhưng mọi công việc "thực thi thực sự" — truy vấn database, chạy script, tạo file, gọi dịch vụ đám mây — vẫn cần con người tiếp tay hoàn thành. Sự xuất hiện của **Tool Calling / Function Calling** lần đầu tiên cho phép mô hình "ra tay" trong phạm vi an toàn: tự động tạo tham số có cấu trúc từ ngôn ngữ tự nhiên để gọi các khả năng bên ngoài như công cụ tìm kiếm, database, engine tính toán, dịch vụ tạo sinh hình ảnh/âm thanh/video, rồi tổng hợp kết quả thực thi trả về, từ đó tạo thành vòng khép kín "hiểu → quyết định → thực thi".

Nhìn từ góc độ sản phẩm, tool calling là "khả năng nền tảng" của hầu hết các hệ thống Agent: OpenAI Assistants API, LangChain, LlamaIndex, AutoGen, các nền tảng Agent của nhà cung cấp đám mây — về bản chất đều xây dựng trên LLM một tầng runtime xoay quanh **cách định nghĩa công cụ, cách để mô hình chọn đúng công cụ, cách xử lý lỗi và retry**. Dưới đây cũng sẽ phân tích năng lực này từ ba góc độ **tình huống**, **nguyên lý** và **mô hình**, và các tiểu mục tiếp theo sẽ lần lượt đi sâu vào ba hướng: "thiết kế interface gọi công cụ", "chiến lược lựa chọn công cụ" và "các loại công cụ điển hình".

- **Tình huống**
  - Hỏi đáp thông minh và tăng cường retrieval: mô hình tự động quyết định có gọi công cụ retrieval (tìm kiếm vector/keyword) hay không dựa trên câu hỏi của người dùng, truy vấn knowledge base nội bộ hoặc tìm kiếm web, rồi tích hợp tài liệu và FAQ tìm được vào câu trả lời cuối cùng.
  - Tự động hóa dữ liệu và báo cáo: với những yêu cầu như "giúp tôi xem doanh thu giai đoạn này và vẽ biểu đồ" hay "tính chỉ số rủi ro của danh mục đầu tư này", mô hình tự động tạo SQL hoặc tham số phân tích, gọi database và engine tính toán, trả về biểu đồ và kết luận.
  - Thao tác tài liệu và file: tự động đọc PDF/Word/Excel/bảng database, trích xuất và tóm tắt thông tin quan trọng, hoặc tạo file mới theo chỉ lệnh (như báo cáo, hợp đồng, phương án), rồi tải lên/lưu trữ vào vị trí chỉ định thông qua công cụ.
  - Tạo sinh và xử lý media: gọi dịch vụ tạo sinh hình ảnh/âm thanh/video/3D theo chỉ lệnh văn bản, hoặc thực hiện cắt ghép, nén, chuyển mã, thêm watermark cho media hiện có, tạo thành pipeline nội dung "copywriting + thiết kế + xuất file" chỉ với một thao tác.
- **Nguyên lý**
  Cốt lõi của tool calling là: **dùng ngôn ngữ tự nhiên để điều khiển lời gọi hàm có cấu trúc**.
  - Đầu tiên, phơi bày tên, mô tả, cấu trúc tham số (kiểu dữ liệu, trường bắt buộc, giá trị enum...) của các công cụ bên ngoài cho LLM dưới dạng JSON Schema hoặc function signature.
  - Khi người dùng gửi yêu cầu, LLM không chỉ hiểu ngữ nghĩa mà còn phải phán đoán "có cần gọi công cụ nào không", "cần công cụ nào", "tham số của các công cụ đó nên điền thế nào".
  - Khi mô hình quyết định gọi một công cụ, nó tạo ra một bộ tham số có cấu trúc (thường là JSON), runtime sẽ thực sự thực thi API/chương trình bên ngoài, rồi trả kết quả thực thi về cho mô hình dưới dạng có cấu trúc để mô hình tiếp tục suy luận hoặc tạo câu trả lời cuối cùng.
  - Để đảm bảo an toàn và độ bền vững, hệ thống cần xử lý validation tham số, timeout, lỗi trả về, retry và fallback trong suốt quá trình này, đồng thời thực hiện kiểm soát quyền hạn và audit cho các lời gọi có thể liên quan đến bảo mật/quyền riêng tư.
- **Mô hình**
  Các mô hình và framework hỗ trợ năng lực này chủ yếu gồm ba loại:
  - LLM hỗ trợ Function Calling: như GPT‑4.1 / dòng o..., hiểu "tool signature + JSON Schema" ngay ở tầng decoding, có thể chủ động hoặc bị động tạo tham số gọi có cấu trúc vào đúng thời điểm.
  - Paradigm suy luận tăng cường công cụ: như ReAct, Toolformer — đan xen "suy nghĩ + gọi công cụ" vào cùng một chuỗi suy luận, coi việc sử dụng công cụ là một phần của bước trung gian, không phải tiền/hậu xử lý đơn giản.
  - Framework kỹ thuật và runtime: OpenAI Assistants API, LangChain, LlamaIndex, AutoGen, các nền tảng Agent của nhà cung cấp đám mây... cung cấp hạ tầng cho định nghĩa công cụ, routing lời gọi, quản lý trạng thái, xử lý lỗi và audit log, giúp developer tập trung vào "phơi bày công cụ nào" và "trừu tượng hóa API nghiệp vụ như thế nào" thay vì xây dựng runtime từ đầu.

### 7.1.1 Interface Gọi Công Cụ: Từ Ngôn Ngữ Tự Nhiên Đến Lời Gọi Hàm Có Cấu Trúc

Một hệ thống tool calling có thể dùng được, trước hết cần một "tầng interface công cụ" rõ ràng, chuẩn mực, thân thiện với LLM. Tầng này chịu trách nhiệm đóng gói các API, script, dịch vụ bên ngoài thành các "hàm" mà mô hình có thể hiểu và gọi an toàn, để mô hình có thể "nói ra" công cụ và tham số mình muốn gọi như đang viết pseudocode.

- **Định nghĩa công cụ và schema tham số**
  Ở tầng interface, mỗi công cụ thường được định nghĩa bằng cấu trúc tương tự JSON Schema hoặc function signature: bao gồm tên (name), mô tả (description), các trường tham số (properties), kiểu dữ liệu (string / number / boolean / array / object), có bắt buộc không (required), phạm vi giá trị hoặc enum...
  Thông tin này một mặt dùng để điều khiển type checking của frontend/SDK, mặt khác được cung cấp trực tiếp cho LLM, giúp mô hình "học" cách điền tham số đúng. Mô tả càng rõ ràng, ràng buộc càng hợp lý thì lời gọi mô hình tạo ra càng chuẩn, tỷ lệ lỗi càng thấp.
- **LLM tạo tham số có cấu trúc**
  Khi người dùng đưa ra yêu cầu như "giúp tôi xem doanh thu Q3 năm 2024 và vẽ biểu đồ cột phân tách theo khu vực", mô hình cần suy luận ra: điều này cần ít nhất một "công cụ truy vấn báo cáo" (truy cập dữ liệu), có thể cần thêm một "công cụ tạo biểu đồ" (vẽ đồ thị). Với mỗi công cụ, nó phải trích xuất và ánh xạ tham số có cấu trúc từ ngôn ngữ gốc, như phạm vi thời gian (start_date/end_date), chiều (region), chỉ số (revenue), loại biểu đồ (bar), định dạng đầu ra..., rồi xuất dưới dạng JSON giao cho runtime.
  Trong quá trình này, mô hình về bản chất đang thực hiện suy luận tích hợp "ngôn ngữ tự nhiên → lập kế hoạch nhiệm vụ → trích xuất/điền tham số", vì vậy prompt ngôn ngữ tự nhiên trong mô tả công cụ, ví dụ về tham số và few‑shot sample đều rất quan trọng.
- **Thực thi công cụ và trả về kết quả**
  Sau khi runtime nhận được lời gọi JSON từ mô hình, nó sẽ validation tham số và kiểm tra an toàn trước, rồi mới thực sự gọi backend API hoặc chương trình. Sau khi thực thi xong, kết quả được đóng gói thành đối tượng có cấu trúc (như bảng kết quả truy vấn, URL file, ID tài nguyên media...) trả về cho mô hình.
  Tiếp đó, mô hình chuyển đổi các kết quả thô này thành giải thích có thể đọc được cho người dùng hoặc xử lý thêm, như tóm tắt báo cáo, tạo phân tích ngôn ngữ tự nhiên, nhúng chú thích biểu đồ... Với mô hình, kết quả công cụ chỉ là một phần thông tin trung gian, nó vẫn phải chịu trách nhiệm "hiểu kết quả + giải thích kết quả".

### 7.1.2 Chiến Lược Lựa Chọn Công Cụ: Ra Quyết Định Trong Thế Giới Đa Công Cụ

Khi hệ thống chỉ có một công cụ, "có dùng công cụ không" là câu hỏi duy nhất. Nhưng trong ứng dụng Agent thực tế, thường có hàng chục thậm chí hàng trăm công cụ: retrieval từ các nguồn dữ liệu khác nhau, API nghiệp vụ của các phòng ban khác nhau, khả năng tạo sinh/phân tích của các lĩnh vực kỹ thuật khác nhau — điều này đặt ra một thách thức mới: **làm thế nào để mô hình lựa chọn và phối hợp hợp lý trong môi trường đa công cụ**.

- **Lựa chọn và routing công cụ**
  Trước tiên, mô hình cần phán đoán "yêu cầu hiện tại có cần gọi công cụ không" và "cần gọi công cụ nào (hoặc những công cụ nào)". Điều này thường được thực hiện bằng cách liệt kê mô tả các công cụ khả dụng trong system prompt và cung cấp ví dụ điển hình, để mô hình học cách chọn công cụ phù hợp theo ý định người dùng.
  Với những tình huống có nhiều công cụ, độ tương đồng mô tả cao, nhiều framework sẽ giới thiệu "tool router" (như bộ lọc trước dựa trên vector retrieval hoặc rule), trước tiên lọc ra một số công cụ ứng viên từ danh sách lớn, rồi mới phơi bày cho LLM lựa chọn, từ đó giảm gánh nặng cho mô hình và xác suất chọn sai.
- **Thứ tự và kết hợp đa công cụ**
  Các nhiệm vụ phức tạp thường cần nhiều công cụ phối hợp hoàn thành. Ví dụ "nghiên cứu các công ty niêm yết chính trong một ngành và tạo báo cáo có biểu đồ so sánh tài chính" có thể liên quan đến công cụ tìm kiếm, database báo cáo tài chính, engine tính toán, công cụ tạo biểu đồ, công cụ xuất tài liệu...
  Trong trường hợp này, mô hình cần lập kế hoạch nhiệm vụ nhẹ: dùng công cụ nào trước để lấy danh sách, rồi truy vấn chi tiết từng mục trong danh sách, sau đó hợp nhất dữ liệu, tính toán và trực quan hóa, cuối cùng gọi công cụ xuất để tạo báo cáo. Thực hành điển hình bao gồm tư duy ReAct/Planner‑Executor, để mô hình hoàn thành lời gọi kết hợp công cụ dần dần trong vòng lặp "Suy nghĩ (Plan) — Gọi (Act) — Phản tư (Reflect)".

### 7.1.3 Các Loại Công Cụ Điển Hình: Bức Tranh Năng Lực Từ Retrieval Đến Tạo Sinh Media

Các loại công cụ khác nhau cung cấp cho hệ thống Agent những "bộ não mở rộng" ở các chiều khác nhau. Nhìn từ thực tiễn kỹ thuật, các loại công cụ sau đây gần như là "trang bị tiêu chuẩn" của mọi ứng dụng phức tạp.

- **Công cụ retrieval: tìm kiếm vector và keyword**
  Công cụ retrieval chịu trách nhiệm mở rộng "bộ nhớ" ra thế giới bên ngoài:
  - Tìm kiếm keyword phù hợp với tài liệu truyền thống có cấu trúc tốt, trường rõ ràng và database nghiệp vụ.
  - Tìm kiếm vector thông qua embedding xây dựng chỉ mục ngữ nghĩa cho văn bản phi cấu trúc, code, lịch sử hội thoại, thậm chí dữ liệu đa phương thức, hỗ trợ retrieval "mờ nhưng liên quan về mặt ngữ nghĩa".
    Trong kịch bản RAG, LLM dùng công cụ retrieval để lấy context liên quan đến câu hỏi người dùng, rồi suy luận và tạo sinh trên cơ sở đó, nâng cao đáng kể tính kịp thời và độ chính xác của câu trả lời.
- **Thực thi code và engine tính toán**
  Các công cụ thực thi code (như Python/JS sandbox, Notebook executor) cho phép LLM "viết một đoạn code và chạy ngay lập tức", giải quyết các vấn đề tính toán phức tạp, xử lý dữ liệu, mô phỏng số, trực quan hóa...
  Mô hình chịu trách nhiệm tạo code và tham số đầu vào, môi trường thực thi chịu trách nhiệm cô lập an toàn, giới hạn tài nguyên và thu thập kết quả. Loại công cụ này rất quan trọng trong các kịch bản phân tích dữ liệu, nghiên cứu định lượng, báo cáo tự động, tính toán khoa học và tự xác minh của Agent (mô hình tạo câu trả lời rồi dùng code kiểm tra lại).
- **Truy cập file và nguồn dữ liệu**
  Công cụ đọc/ghi file chịu trách nhiệm đưa hệ thống file bên ngoài và các nguồn dữ liệu vào tầm nhìn của Agent: đọc PDF/Word/Excel, truy cập bảng database, gọi API nghiệp vụ nội bộ... Mô hình thông qua các công cụ này lấy dữ liệu nghiệp vụ thực tế, rồi quy nạp, so sánh và tạo báo cáo.
  Kèm theo đó còn có công cụ ghi và quản lý file: lưu trữ bền vững các báo cáo, biểu đồ, PPT, code đã tạo và trả về link hoặc ID, tiện cho người dùng truy cập và tích hợp sau này.
- **Công cụ tạo sinh và xử lý media**
  Công cụ tạo sinh media thêm cho Agent "cánh tay sáng tạo" và "thiết kế":
  - Tạo sinh và chỉnh sửa hình ảnh/video: tự động tạo hình minh họa, poster, storyboard từ copywriting, hoặc cắt ghép, thêm phụ đề, thêm watermark cho media hiện có.
  - Tạo sinh và xử lý âm thanh: TTS, lồng tiếng, tạo nhạc, tăng cường âm thanh và cắt ghép.
  - Công cụ 3D/kỹ thuật: tạo scene 3D đơn giản, bản phác thảo CAD, prototype UI...
    Trong sản xuất nội dung, thiết kế marketing, giáo dục đào tạo, ứng dụng game và đa phương tiện, loại công cụ này đưa "từ ý tưởng đến thành phẩm" ngày càng gần hơn với một pipeline tự động hóa.

Nhìn tổng thể, tool calling và thực thi mở rộng LLM từ "language model" thành "bộ điều khiển đa năng có interface hành động": mô hình hiểu nhu cầu và môi trường qua ngôn ngữ, thực hiện thao tác thực tế qua công cụ, liên tục điều chỉnh chiến lược qua phản hồi. Kết hợp với workflow orchestration và cộng tác đa Agent phù hợp (xem 7.2), đây chính là kiến trúc nền tảng của thế hệ ứng dụng thông minh mới.
## 7.2 Điều phối Workflow và Cộng tác Đa Agent (Workflow & Orchestration)

Với khả năng gọi công cụ, LLM không còn chỉ là "người trả lời câu hỏi" mà có thể trở thành "đơn vị thực thi" hướng đến từng nhiệm vụ cụ thể. Nhưng thực tế kinh doanh thường phức tạp hơn nhiều so với một cuộc hội thoại đơn lẻ: một bài phân tích tố tụng hoàn chỉnh, một đợt nghiên cứu thị trường, một lần cấu hình thí nghiệm A/B, hay một quy trình vận hành end-to-end thường đòi hỏi nhiều bước thao tác, nhiều loại công cụ, thậm chí nhiều bên tham gia trong thời gian dài. Lúc này, mô hình đơn LLM + công cụ trở nên không đủ đáp ứng, cần tiến thêm một bước với **điều phối workflow và cộng tác đa Agent**.

Nhìn từ góc độ hệ thống, trách nhiệm của lớp này là: **trừu tượng hóa một quy trình nghiệp vụ phức tạp, đa bước, đa bên tham gia thành một đồ thị workflow mà LLM có thể hiểu và điều khiển**, sau đó lên lịch một hoặc nhiều Agent trên đồ thị đó, phối hợp với sự can thiệp của con người để cùng nhau hoàn thành nhiệm vụ. Các triển khai điển hình bao gồm kiến trúc Agent dạng Planner‑Executor, Agent có khả năng phản tư / tự điều chỉnh, và Workflow Orchestrator dựa trên cấu trúc đồ thị; các dạng sản phẩm tương ứng là các nền tảng tự động tạo báo cáo và tự động hóa vận hành, tích hợp low-code workflow + LLM, robot quy trình nghiệp vụ phức tạp, hệ thống vận hành tự động, v.v.

- **Tình huống ứng dụng**
  - Pipeline báo cáo và nội dung: tự động hóa hoặc bán tự động hóa quy trình sản xuất nội dung đa bước từ "nhận yêu cầu → thu thập và kéo dữ liệu → phân tích và trực quan hóa → viết báo cáo → xem xét chỉnh sửa → xuất bản và phân phối".
  - Tự động hóa quy trình nghiệp vụ: ví dụ trong vận hành thương mại điện tử với chuỗi "phân tích sản phẩm → giám sát đối thủ cạnh tranh → tạo chiến lược hoạt động → triển khai cấu hình", hay trong kịch bản vận hành với chuỗi "giám sát cảnh báo → phân tích nguyên nhân gốc rễ → thực thi biện pháp giảm thiểu → báo cáo tổng kết".
  - Cộng tác đa vai trò: để các Agent thuộc các lĩnh vực khác nhau (pháp lý, tài chính, kỹ thuật, vận hành) phối hợp xung quanh một dự án phức tạp, ví dụ như thẩm định mua bán sáp nhập, chuẩn bị tài liệu đầu tư, biên soạn hồ sơ thầu cho dự án lớn.
- **Nguyên lý**
  Cốt lõi của workflow và cộng tác đa Agent là thêm một lớp **kiểm soát có cấu trúc và quản lý trạng thái** phía trên LLM:
  - Phân tách nhiệm vụ phức tạp thành nhiều nhiệm vụ con có quan hệ phụ thuộc, biểu diễn bằng các cấu trúc như DAG / state machine / đồ thị có hướng, và cấu hình điều kiện kích hoạt, đầu vào/đầu ra cùng Agent/công cụ cần thiết cho mỗi nút.
  - Agent dạng Planner hoặc orchestrator cấp trên quyết định khi nào kích hoạt nút nào, dùng Agent hay công cụ nào, và điều chỉnh động đường đi tiếp theo dựa trên kết quả thực thi (nhánh điều kiện, vòng lặp, rollback khi lỗi).
  - Đưa Human‑in‑the‑loop vào các khâu then chốt để con người xác nhận và chỉnh sửa các quyết định rủi ro cao và đầu ra quan trọng, đồng thời đưa phản hồi của con người trở lại hệ thống để cập nhật chiến lược hoặc fine-tune mô hình.
- **Mô hình**
  Các hướng kỹ thuật chính hỗ trợ lớp này bao gồm:
  - Kiến trúc Agent dạng Planner‑Executor: một "Agent lập kế hoạch" đảm nhiệm phân tách nhiệm vụ và thiết kế đường đi, một hoặc nhiều "Agent thực thi" đảm nhiệm triển khai các bước cụ thể.
  - Agent phản tư / tự điều chỉnh: liên tục xem xét lại hiệu suất của mình trong quá trình thực thi, phản tư và sửa chữa các kết quả trung gian không hợp lý, giảm thiểu sự lan truyền âm thầm của "lỗi tự tin".
  - Graph‑based Workflow Orchestrator: mô hình hóa toàn bộ quy trình nhiệm vụ thành cấu trúc đồ thị, đưa vào các cơ chế trạng thái nút, điều kiện cạnh, kiểm soát song song/tuần tự, biến các lệnh gọi LLM thành một hoặc nhiều nút trong đồ thị thay vì là trung tâm điều khiển duy nhất.

### 7.2.1 Phân tách và lập kế hoạch nhiệm vụ: từ "yêu cầu một câu" đến quy trình có thể thực thi

Những gì người dùng đưa cho Agent thường là một yêu cầu ngôn ngữ tự nhiên được nén rất cao, ví dụ "giúp tôi làm một nghiên cứu thị trường về ngành xe năng lượng mới và xuất ra PPT", nhưng bên trong thực sự chứa đựng rất nhiều bước như thu thập, lọc, phân tích, trực quan hóa, dàn trang, chỉnh sửa nhiều vòng. Làm thế nào để xuất phát từ câu đó và tự động xây dựng một workflow rõ ràng, có thể thực thi là bước đầu tiên của điều phối workflow.

- **Từ ngôn ngữ tự nhiên đến đồ thị nhiệm vụ con**
  Agent dạng Planner trước tiên cần "triển khai" yêu cầu: kết hợp template tích hợp sẵn, các trường hợp lịch sử và danh sách công cụ để xác định các giai đoạn chính (như thu thập thông tin, phân tích dữ liệu, thiết kế cấu trúc, viết nội dung, hiệu đính và xuất bản), rồi tiếp tục chi tiết hóa thành các nhiệm vụ con có thể thực thi (ví dụ "thu thập 5 báo cáo ngành có thẩm quyền trong năm gần đây", "kéo dữ liệu doanh số 3 năm gần đây và phân tách theo loại xe", "tạo 3 biểu đồ so sánh", v.v.).
  Quan hệ phụ thuộc và logic lịch trình giữa các nhiệm vụ con này sẽ được biểu diễn tường minh thành một đồ thị hoặc state machine: cái nào có thể song song, cái nào phải tuần tự, ở những nút nào cần xác nhận thủ công, trong điều kiện nào cần rollback hoặc retry.
- **Nhánh điều kiện, vòng lặp và đường dẫn ngoại lệ**
  Quy trình thực tế thường không phải là pipeline tuyến tính mà chứa **nhánh điều kiện** (ví dụ "nếu không tìm đủ báo cáo chất lượng cao thì đổi từ khóa hoặc đổi nguồn dữ liệu"), **vòng lặp** (ví dụ "liên tục thử viết lại và nén cho đến khi độ dài báo cáo đáp ứng giới hạn") và **đường dẫn ngoại lệ** (ví dụ "khi một nguồn dữ liệu không tiếp cận được thì chuyển sang nguồn dự phòng hoặc dùng phương pháp ước tính").
  Điều này yêu cầu lớp điều phối workflow có thể biểu diễn ngữ nghĩa luồng điều khiển if/else, while/for, try/catch trên cấu trúc đồ thị, và cho phép Agent Planner hoặc orchestrator cấp trên đưa ra quyết định dựa trên kết quả thực tế trong quá trình chạy, thay vì chỉ lập kế hoạch toàn bộ các bước một lần ở đầu.
- **Liên kết với gọi công cụ**
  Phân tách và lập kế hoạch nhiệm vụ liên kết chặt chẽ với gọi công cụ ở mục 7.1: khi Planner tạo ra các nhiệm vụ con, thường đồng thời chỉ định "nhiệm vụ này cần dùng những công cụ/Agent nào" và "định dạng đầu vào/đầu ra của nút này", đặt nền tảng cho việc tự động điền tham số và thực thi công cụ về sau.
  Một số hệ thống áp dụng hai giai đoạn tường minh "Plan + Execute": trước tiên Planner xuất ra một kế hoạch máy đọc được (ví dụ mô tả workflow dạng JSON), sau đó Executor nghiêm túc gọi công cụ và Agent theo kế hoạch; cũng có hệ thống áp dụng phong cách ReAct, dệt "suy nghĩ – gọi công cụ – quan sát – suy nghĩ lại" vào cùng một cuộc hội thoại để có được khả năng thực thi thích nghi linh hoạt hơn.

### 7.2.2 Cộng tác đa Agent: để "đội nhóm ảo" mỗi người một việc

Một mô hình lớn đơn lẻ dù mạnh đến đâu, trong các tình huống nghiệp vụ phức tạp, các lĩnh vực khác nhau thường đòi hỏi cấu trúc kiến thức, sở thích phong cách và chính sách bảo mật khác nhau. Tư tưởng của **cộng tác đa Agent** là phân tách một "trí tuệ lớn và toàn diện" thành nhiều vai trò "chuyên sâu và tinh nhuệ": có người phụ trách lập kế hoạch, có người phụ trách thực thi, có người phụ trách hiệu đính, có người phụ trách phán đoán chuyên môn lĩnh vực, tạo thành một đội nhóm ảo được cấu thành bởi Agent + công cụ + con người.

- **Phân công vai trò: lập kế hoạch, thực thi và hiệu đính**
  Trong một quy trình đa Agent điển hình, các vai trò phổ biến bao gồm:
  - Agent lập kế hoạch: chịu trách nhiệm hiểu yêu cầu người dùng, thiết kế kế hoạch tổng thể, phân tách nhiệm vụ con, và điều chỉnh động đường đi dựa trên kết quả trong quá trình thực thi.
  - Agent thực thi: tối ưu hóa chuyên sâu xung quanh một số công cụ hoặc lĩnh vực con (như Agent thu thập, Agent phân tích dữ liệu, Agent viết nội dung), hoàn thành các bước cụ thể theo yêu cầu kế hoạch.
  - Agent hiệu đính: kiểm tra và sửa đổi đầu ra trung gian và cuối cùng từ góc độ cấu trúc, logic, nhất quán phong cách và kiểm soát rủi ro, giống như "biên tập viên ảo / Reviewer".
- **Phối hợp với Agent chuyên gia lĩnh vực**
  Đối với các lĩnh vực chuyên nghiệp cao như pháp lý, tài chính, kỹ thuật, vận hành, có thể phân tách thêm các Agent chuyên gia lĩnh vực: ví dụ "Agent cố vấn pháp lý", "Agent phân tích đầu tư", "Agent vận hành cloud-native", "Agent tối ưu quảng cáo", v.v.
  Chúng có thể dựa trên knowledge base chuyên dụng theo lĩnh vực, công cụ, thậm chí mô hình được fine-tune chuyên biệt để tham gia cộng tác theo dự án: ví dụ trong một tài liệu đầu tư, Agent kỹ thuật phụ trách phần khả thi kỹ thuật, Agent tài chính phụ trách mô hình tài chính và định giá, Agent pháp lý phụ trách tuân thủ và công bố rủi ro, Agent vận hành phụ trách chiến lược thị trường và tăng trưởng, sau đó Agent tổng kiểm soát tổng hợp và thống nhất phong cách.
- **Giao thức cộng tác và định tuyến tin nhắn**
  Chìa khóa của cộng tác đa Agent còn nằm ở "ai nói với ai vào lúc nào". Hệ thống cần một cơ chế định tuyến và điều phối tin nhắn:
  - Quyết định yêu cầu người dùng hoặc kết quả trung gian nào sẽ được Agent nào xử lý.
  - Duy trì ngữ cảnh chung và bộ nhớ riêng tư của từng Agent.
  - Kiểm soát thực thi song song và tuần tự, cũng như giải quyết xung đột (ví dụ khi các Agent khác nhau đưa ra các đề xuất mâu thuẫn nhau thì phân xử như thế nào).
    Các khả năng này thường được cung cấp bởi orchestrator cấp trên hoặc "Agent quản lý", trong khi các framework như LangChain, AutoGen cung cấp cơ sở hạ tầng về định tuyến hội thoại, phiên đa Agent, thiết lập vai trò ở tầng kỹ thuật.

### 7.2.3 Human‑in‑the‑loop: giữ chặt các điểm kiểm soát rủi ro trong tay

Dù workflow và cộng tác đa Agent có thông minh đến đâu, trong kinh doanh thực tế vẫn không thể hoàn toàn thoát khỏi sự phán đoán của con người, đặc biệt trong các kịch bản **rủi ro cao, chi phí cao, độ nhạy cảm cao** như tuân thủ pháp lý, quyết định tài chính, tư vấn y tế, thay đổi sản xuất quy mô lớn, xử lý khủng hoảng truyền thông, v.v. Thiết kế **Human‑in‑the‑loop** chính là để tìm ra sự cân bằng giữa tự động hóa và khả năng kiểm soát: cái gì nên tự động thì tự động, cái gì cần xác nhận thủ công thì nhất định phải dừng lại để con người xem qua.

- **Xác nhận thủ công các bước then chốt**
  Trong đồ thị workflow, thường đánh dấu tường minh một số "nút phê duyệt/xác nhận thủ công":
  - Ví dụ khi tự động tạo hợp đồng, trước khi ký phát cần có sự xác nhận kép từ phía pháp lý và người phụ trách nghiệp vụ;
  - Trong hệ thống vận hành tự động, các thao tác liên quan đến thay đổi môi trường production, khởi động lại hàng loạt, chỉnh sửa cấu hình bắt buộc phải có kỹ sư trực nhấn xác nhận;
  - Trong kịch bản tạo nội dung, nội dung được phát hành công khai với số lượng lớn hoặc nhạy cảm với thương hiệu cần được duyệt thủ công.
    Orchestrator sẽ tạm dừng thực thi tự động tại các nút này, gửi kết quả trung gian đến vai trò con người tương ứng, và tiếp tục quy trình tiếp theo sau khi nhận phản hồi.
- **Cập nhật chiến lược dựa trên phản hồi**
  Con người không chỉ "nhấn thông qua hoặc từ chối" tại một thời điểm nhất định, quan trọng hơn là nội dung phản hồi có thể được hệ thống hấp thụ:
  - So sánh phiên bản đã được con người chỉnh sửa với đầu ra gốc, ghi lại làm "mẫu dương/âm" để dùng cho tối ưu hóa prompt hoặc fine-tune mô hình về sau.
  - Dựa trên phân tích thống kê, xác định những loại nhiệm vụ/bước nào dễ bị con người chỉnh sửa nhiều nhất, từ đó tối ưu hóa prompt, tổ hợp công cụ hoặc thiết kế workflow của Agent tương ứng.
  - Trong các trường hợp cực đoan hoặc bất thường, con người có thể thêm "blacklist / whitelist / quy tắc đặc biệt", ảnh hưởng trực tiếp đến lựa chọn chiến lược của hệ thống trong các tình huống tương tự.
- **Phân cấp rủi ro và khả năng quan sát**
  Cuối cùng, Human‑in‑the‑loop còn cần một cơ chế phân cấp rủi ro và khả năng quan sát rõ ràng:
  - Dựa trên các chiều như loại nhiệm vụ, phạm vi ảnh hưởng, quy mô tiền bạc, thông tin nhạy cảm liên quan, phân loại quy trình thành các cấp độ rủi ro khác nhau, tương ứng với mức độ can thiệp của con người khác nhau (như chỉ đọc xem xét, phê duyệt bắt buộc, phê duyệt đa cấp).
  - Thông qua log, kiểm toán, dashboard trực quan hóa, cho phép nhân viên vận hành/quản lý có thể theo dõi bất cứ lúc nào nhiệm vụ nào đang chạy, đang ở bước nào, ở đâu đã kích hoạt can thiệp thủ công, lịch sử có những lỗi và chỉnh sửa thủ công nào.
    Những khả năng này không chỉ nâng cao mức độ chấp nhận của hệ thống trong doanh nghiệp mà còn cung cấp nền tảng cho việc kiểm tra tuân thủ và phân định trách nhiệm về sau.

Nhìn tổng thể, gọi công cụ và thực thi (7.1) giải quyết vấn đề "hành động đơn bước", trong khi điều phối workflow và cộng tác đa Agent (7.2) cố gắng trả lời câu hỏi "làm thế nào để nối nhiều bước lại với nhau, để các vai trò khác nhau cộng tác lâu dài và vận hành có kiểm soát". Hai yếu tố kết hợp lại, cùng với Human‑in‑the‑loop và các thực hành kỹ thuật tốt, tạo thành nền tảng ứng dụng thông minh thế hệ mới hướng đến các tình huống nghiệp vụ thực tế.

# 8. Lớp Truy xuất và Tri thức (Retrieval & Knowledge)

Trong lớp nhìn nhận và hiểu biết trước đó, mô hình chủ yếu dựa vào "kiến thức đã học trong tham số của chính nó" để hiểu và tạo ra nội dung. Nhưng trong thực tế kinh doanh, nhiều vấn đề không thể chỉ giải quyết bằng "trí nhớ": quy chế nội bộ doanh nghiệp thay đổi mỗi ngày, quy định và tiêu chuẩn ngành liên tục cập nhật, lịch sử giao dịch của một khách hàng nào đó chỉ tồn tại trong cơ sở dữ liệu nội bộ. Lúc này, chỉ dựa vào kiến thức mà mô hình "đã học thuộc" là hoàn toàn không đủ, quan trọng hơn là liệu có thể **truy xuất và suy luận hiệu quả trên knowledge base bên ngoài, dữ liệu có cấu trúc và knowledge graph** hay không.

Có thể hiểu lớp này như: phía trên khả năng của mô hình, thêm một lớp "bộ não ngoài biết tra cứu tài liệu và biết dùng cơ sở dữ liệu". Khi người dùng đặt câu hỏi, hệ thống không trực tiếp tạo ra câu trả lời mà trước tiên đi "lật tài liệu" trong các nguồn dữ liệu phù hợp: thư viện tài liệu, cơ sở dữ liệu, công cụ tìm kiếm, knowledge graph, log và hệ thống nghiệp vụ… sau đó mới để mô hình đưa ra câu trả lời và quyết định dựa trên nội dung thực sự đã truy xuất được. Điều này không chỉ có thể cải thiện đáng kể độ chính xác và tính kịp thời mà còn nâng cao khả năng giải thích và tuân thủ ở mức độ lớn (ví dụ có thể trích dẫn nguồn, lưu lại bản ghi SQL đã thực thi, v.v.).

Xung quanh lớp này, các khả năng phổ biến có thể phân chia thành hai hướng: một là **Retrieval-Augmented Generation (RAG)**, chủ yếu hướng đến "hỏi đáp ngôn ngữ tự nhiên + truy xuất tài liệu/knowledge base"; hai là **Dữ liệu có cấu trúc và Knowledge Graph (Structured Data & KG)**, chịu trách nhiệm truy cập và suy luận chính xác hơn, có kiểm soát hơn trên cơ sở dữ liệu, cơ sở dữ liệu đồ thị và nền tảng tri thức lĩnh vực. Dưới đây sẽ lần lượt triển khai.
## 8.1 Retrieval-Augmented Generation (RAG)

RAG (Retrieval-Augmented Generation) có thể được xem là "LLM biết tra cứu tài liệu". Khác với việc chỉ dựa vào các tham số nội bộ của mô hình, RAG trước khi trả lời mỗi câu hỏi sẽ đi tìm kiếm trong cơ sở tri thức bên ngoài, tìm ra một số đoạn tài liệu (chunk) liên quan nhất đến câu hỏi, sau đó đưa các nội dung đã truy xuất đó làm "ngữ cảnh" cho LLM, để mô hình tạo ra câu trả lời trên cơ sở "đã đọc tài liệu". Đối với các tình huống như hỏi đáp cơ sở tri thức doanh nghiệp, tìm kiếm báo cáo ngành, hỏi đáp chuyên ngành pháp lý/y tế/tài chính, robot tìm kiếm tài liệu nội bộ, RAG đã trở thành mô hình mặc định.

Về kiến trúc hệ thống, một RAG điển hình có thể phân tách thành ba tầng: **tầng xây dựng chỉ mục, tầng truy xuất, tầng sinh tạo**. Hai tầng đầu chủ yếu đảm bảo "truy xuất chính xác", tầng sau đảm bảo "diễn đạt rõ ràng". Dưới đây sẽ triển khai theo ba tầng này, và đi sâu hơn vào thiết kế cốt lõi cùng thực tiễn trong các mục con.

- **Tình huống ứng dụng**
  - Hỏi đáp tri thức nội bộ doanh nghiệp: Nhân viên đặt câu hỏi bằng ngôn ngữ tự nhiên về quy trình, tài liệu kỹ thuật, tài liệu dự án; hệ thống truy xuất nội dung liên quan từ tài liệu nội bộ và Wiki, sau đó LLM tạo ra câu trả lời rõ ràng kèm trích dẫn.
  - Tìm kiếm báo cáo ngành và nghiên cứu: Truy xuất nội dung liên quan đến một vấn đề ngành cụ thể (ví dụ "thay đổi chính sách trợ cấp xe năng lượng mới") trong số lượng lớn PDF, báo cáo và tài liệu, sau đó tự động tóm tắt, so sánh và liệt kê nguồn.
  - Hỏi đáp lĩnh vực pháp lý / y tế / tài chính: Truy xuất nâng cao dựa trên các tài liệu có thẩm quyền như điều khoản pháp lý, bản án, hướng dẫn lâm sàng, tờ hướng dẫn sản phẩm để giảm thiểu rủi ro "bịa đặt".
  - Robot tìm kiếm tài liệu / phiếu công việc nội bộ: Giúp bộ phận vận hành, chăm sóc khách hàng, phát triển nhanh chóng định vị câu trả lời trong cơ sở tri thức, phiếu công việc và nhật ký thay đổi, rồi tóm tắt kết quả bằng ngôn ngữ tự nhiên.
- **Nguyên lý**
  Ý tưởng cốt lõi của RAG là "lưu trữ tri thức bên ngoài, giao suy luận cho mô hình":
  - Chia các tài liệu phi cấu trúc (PDF, trang web, Word, tài liệu kỹ thuật, v.v.) thành các khối tài liệu (chunk) phù hợp để truy xuất, dùng mô hình Embedding ánh xạ chúng vào không gian vector, và xây dựng chỉ mục vector (như FAISS, Milvus, PGVector, v.v.).
  - Khi người dùng truy vấn, đồng thời sử dụng truy xuất vector ngữ nghĩa và truy xuất từ khóa (Hybrid Search) để tìm các khối tài liệu liên quan nhất, sau đó thực hiện sắp xếp lại (Re-ranking) dựa trên độ liên quan và độ bao phủ.
  - Đưa ngữ cảnh đã truy xuất, câu hỏi của người dùng và các chỉ thị hệ thống/ràng buộc định dạng cần thiết vào LLM cùng nhau; mô hình trả lời dưới ràng buộc "bằng chứng có thể kiểm chứng" và trích dẫn nguồn (source citation) trong đầu ra để nâng cao khả năng giải thích và kiểm toán.
- **Mô hình**
  Hệ thống RAG điển hình thường là một **kiến trúc kết hợp mô hình**:
  - Mô hình Embedding: Dùng để mã hóa truy vấn và các khối tài liệu vào cùng một không gian ngữ nghĩa, là yếu tố then chốt quyết định hiệu quả truy xuất vector (bao gồm Embedding tổng quát và Embedding tùy chỉnh theo lĩnh vực).
  - Mô hình truy xuất và sắp xếp lại: Hybrid Search (như BM25 + Vector) phụ trách vòng thu hồi đầu tiên, Cross-Encoder Re-ranker hoặc bản thân LLM được dùng để sắp xếp lại kết quả thu hồi một cách tinh tế hơn.
  - Mô hình sinh tạo: LLM trả lời dựa trên ngữ cảnh truy xuất đã cho; trong các RAG phức tạp hơn như HyDE / ReAct + RAG, LLM còn tham gia vào các quá trình "sinh tạo tài liệu giả", "gọi công cụ nhiều vòng", "suy nghĩ + truy xuất xen kẽ" để nâng cao khả năng thu hồi, giảm quên lãng và tăng cường suy luận.

### 8.1.1 Xây dựng chỉ mục và tổ chức tài sản tri thức

Trong bất kỳ hệ thống RAG nào, xây dựng chỉ mục đều là nền tảng. Không có chỉ mục chất lượng cao, dù LLM phía sau có mạnh đến đâu cũng chỉ là "giỏi mà không có nguyên liệu". Mục tiêu của việc xây dựng chỉ mục là chuyển hóa các tài nguyên tài liệu lộn xộn thành "tài sản tri thức có thể truy xuất, có thể bảo trì, có thể mở rộng".

Xét về quy trình, việc xây dựng chỉ mục điển hình bao gồm các bước then chốt sau:

1. **Phân khối tài liệu và tiền xử lý**
   Tài liệu thường là PDF dài, PPT, Word hoặc trang web. Nếu vector hóa toàn bộ tài liệu trực tiếp, dễ gây ra "pha loãng" (một tài liệu chứa nhiều chủ đề) và không thuận lợi cho việc truy xuất hiệu quả. Do đó cần:
   1. Phân khối theo đoạn văn, tiêu đề, số trang, cấu trúc chương mục, cân bằng giữa "tính hoàn chỉnh ngữ nghĩa" và "kích thước khối";
   2. Xử lý vấn đề định dạng (OCR văn bản trong bảng, công thức, hình ảnh), khử nhiễu (tiêu đề đầu/cuối trang, mục lục, thông tin bản quyền, v.v.);
   3. Tạo "nhãn ngữ cảnh" cho mỗi khối (như tài liệu chứa nó, tiêu đề chương, số trang) để chuẩn bị cho việc giải thích và trích dẫn sau này.
2. **Embedding và chỉ mục vector**
   Trên cơ sở phân khối, tạo vector ngữ nghĩa cho mỗi khối tài liệu:
   1. Chọn mô hình Embedding phù hợp (như Embedding ngữ nghĩa tổng quát, mô hình tinh chỉnh theo lĩnh vực), đảm bảo khả năng biểu đạt tốt cho ngôn ngữ và thuật ngữ chuyên ngành mục tiêu;
   2. Dùng FAISS, Milvus, PGVector, v.v. để xây dựng chỉ mục vector nhiều chiều, hỗ trợ tìm kiếm láng giềng gần nhất xấp xỉ trên dữ liệu quy mô lớn;
   3. Xử lý đa phiên bản và cập nhật gia tăng: Khi tài liệu được cập nhật, cần hỗ trợ xây dựng lại chỉ mục gia tăng, ghi lại phiên bản và chiến lược dọn dẹp phiên bản cũ.
3. **Chỉ mục siêu thông tin và lọc**
   Vector ngữ nghĩa thuần túy không đủ để đáp ứng nhu cầu lọc phức tạp, thông thường còn cần xây dựng **chỉ mục siêu thông tin**:
   1. Bổ sung metadata về thời gian, tác giả, nguồn, loại tài liệu, đơn vị kinh doanh, cấp độ nhạy cảm, v.v. cho mỗi khối tài liệu;
   2. Hỗ trợ lọc trước dựa trên siêu thông tin khi truy xuất (như phạm vi thời gian, phòng ban, cấp độ quyền hạn) để giảm kết quả không liên quan;
   3. Đặt nền tảng cho kiểm soát quyền hạn và kiểm toán, tránh RAG tiết lộ nội dung mà người dùng không có quyền truy cập trong câu trả lời.

### 8.1.2 Truy xuất và sắp xếp lại: Từ "thu hồi liên quan" đến "tìm được bằng chứng phù hợp nhất"

Sau khi xây dựng chỉ mục xong, khi người dùng khởi tạo truy vấn, bước tiếp theo là giai đoạn truy xuất và sắp xếp lại. Điều quan trọng ở đây không chỉ là "tìm một số tài liệu liên quan", mà là cố gắng tìm được **tổ hợp bằng chứng vừa liên quan vừa đủ bao phủ và hỗ trợ suy luận**.

1. **Hybrid Search: Sự bổ trợ giữa vector và từ khóa**
   Truy xuất thuần vector giỏi nắm bắt độ tương đồng ngữ nghĩa, nhưng với các thuật ngữ chính xác, mã hiệu, trường trong bảng, v.v., truy xuất từ khóa (như BM25) thường ổn định hơn. Do đó trong thực tiễn kỹ thuật, Hybrid Search được áp dụng phổ biến:
   1. Đầu tiên thực hiện truy xuất vector và truy xuất từ khóa riêng biệt cho truy vấn, thu được hai tập ứng viên khối tài liệu;
   2. Dùng tính điểm có trọng số hoặc chiến lược hợp nhất đã học được để kết hợp hai tập ứng viên;
   3. Trong một số tình huống, có thể điều chỉnh động trọng số của truy xuất vector và từ khóa dựa trên loại truy vấn (hỏi đáp FAQ vs. định vị điều luật).
2. **Sắp xếp lại (Re-ranking): Chọn lọc "tập bằng chứng" tinh tế hơn**
   Kết quả truy xuất ban đầu thường chứa nhiều khối tài liệu "liên quan ngoài lề" hoặc "dư thừa", cần sắp xếp lại để nâng cao chất lượng Top-K cuối cùng:
   1. Dùng Cross-Encoder (bộ mã hóa chéo) để mã hóa hai chiều và tính điểm độ liên quan cho cặp "truy vấn–khối tài liệu"; so với mô hình Embedding hai tháp, độ chính xác cao hơn nhưng chi phí lớn hơn, phù hợp làm sắp xếp lại giai đoạn hai;
   2. Khi hiệu suất cho phép, đưa LLM vào để sắp xếp lại nhẹ nhàng, để mô hình dựa trên thông tin ngữ nghĩa và ngữ cảnh phong phú hơn để đánh giá khối nào thực sự "hữu ích";
   3. Đồng thời xem xét độ bao phủ và tính đa dạng, tránh tất cả các khối truy xuất đều tập trung vào cùng một tài liệu hoặc cùng một đoạn văn, dẫn đến góc nhìn trả lời quá hẹp.
3. **Tối ưu hóa vòng lặp kín truy xuất–sinh tạo**
   Trong thực tiễn nâng cao hơn, truy xuất và sinh tạo không còn là quy trình một chiều mà hình thành vòng lặp kín:
   1. Dùng LLM phân tích "tình trạng sử dụng" kết quả truy xuất (khối nào được trích dẫn, khối nào luôn bị bỏ qua), hướng dẫn ngược lại việc tối ưu hóa chiến lược chỉ mục và phân khối;
   2. Dùng tín hiệu "hỏi thêm/sửa lỗi" trong nhật ký hội thoại để gán nhãn và huấn luyện lại các mẫu thu hồi thất bại, thu hồi sai, nâng cao độ bền vững của hệ thống với các truy vấn mơ hồ, câu hỏi đuôi dài.

### 8.1.3 Sinh tạo và trích dẫn: Trả lời câu hỏi "dưới ràng buộc bằng chứng"

Tầng cuối cùng là tầng sinh tạo, nó quyết định trực tiếp trải nghiệm người dùng. Mục tiêu ở đây không phải là để mô hình "tự do sáng tạo" mà là để nó **dưới ràng buộc của bằng chứng truy xuất, đưa ra câu trả lời rõ ràng, có giới hạn, có trích dẫn**.

1. **Sinh tạo có kiểm soát dựa trên ngữ cảnh truy xuất**
   Trong kiến trúc RAG, LLM nhận được không chỉ câu hỏi của người dùng mà còn nhiều khối tài liệu đã truy xuất và chỉ thị hệ thống. Hệ thống thường sẽ:
   1. Ràng buộc mô hình thông qua Prompt "chỉ trả lời dựa trên tài liệu đã cho", "nếu không tìm thấy câu trả lời trong tài liệu thì nêu rõ sự thiếu hụt";
   2. Tổ chức có cấu trúc ngữ cảnh truy xuất (phân đoạn, đánh số, ghi chú nguồn) để mô hình dễ hiểu và trích dẫn;
   3. Kiểm soát định dạng đầu ra (danh sách, bảng, giải thích theo điểm, v.v.) để phù hợp với hệ thống downstream hoặc hiển thị frontend.
2. **Trích dẫn và khả năng giải thích (Source Citation)**
   Để thuận tiện cho kiểm toán và truy xuất nguồn gốc, đặc biệt trong các lĩnh vực rủi ro cao như pháp lý, y tế, tài chính, quy chế nội bộ doanh nghiệp, câu trả lời thường cần kèm theo trích dẫn rõ ràng:
   1. Ghi chú trích dẫn nguồn trong đầu ra, như "[Tài liệu A, Chương 3, Mục 2]", "[Điều 12 Quy định X]";
   2. Hỗ trợ nhảy một cú click đến vị trí nguyên bản trên giao diện frontend để người dùng kiểm tra và đọc thêm;
   3. Lưu nhật ký toàn bộ chuỗi "câu hỏi–kết quả truy xuất–khối trích dẫn–câu trả lời cuối cùng" ở backend để cung cấp dữ liệu cho kiểm soát rủi ro và cải thiện mô hình sau này.
3. **Các biến thể RAG nâng cao: HyDE / ReAct + RAG, v.v.**
   Để nâng cao hiệu quả trong các tình huống câu hỏi khó, trong thực tiễn còn sử dụng các biến thể RAG phức tạp hơn:
   1. HyDE: LLM trước tiên tạo ra một "tài liệu câu trả lời giả định" dựa trên câu hỏi, sau đó dùng vector của tài liệu đó để truy xuất tài liệu thực, từ đó nâng cao chất lượng thu hồi;
   2. ReAct + RAG: LLM theo phương thức "Suy nghĩ (Reasoning) + Hành động (Action)" gọi công cụ truy xuất nhiều lần trong quá trình suy luận, dần dần làm rõ câu hỏi và bổ sung bằng chứng, tương tự như "vừa suy nghĩ vừa tra cứu tài liệu";
   3. RAG đa vòng: Trong quá trình hội thoại, lưu giữ kết quả truy xuất và câu trả lời lịch sử, hình thành phiên tri thức dài hạn nhận biết ngữ cảnh, thay vì chỉ là "một câu hỏi một lần truy xuất".
## 8.2 Dữ liệu có cấu trúc & Đồ thị tri thức (Structured Data & KG)

Nếu RAG chủ yếu giải quyết bài toán "làm thế nào để tra cứu thông tin trong kho tài liệu phi cấu trúc khổng lồ", thì tầng dữ liệu có cấu trúc và đồ thị tri thức lại tập trung hơn vào câu hỏi "làm thế nào để khai thác hiệu quả các tri thức có cấu trúc trong cơ sở dữ liệu, hệ thống báo cáo và graph database".

Trong môi trường doanh nghiệp, dữ liệu nghiệp vụ thực sự quan trọng — đơn hàng, khách hàng, hợp đồng, tồn kho, nhật ký hành vi — thường tồn tại dưới dạng cơ sở dữ liệu quan hệ, data warehouse, OLAP engine hoặc graph database. Các hệ thống này đã rất trưởng thành về khả năng truy vấn, hiệu năng tính toán và kiểm toán, nhưng đối với người dùng nghiệp vụ, việc viết SQL / DSL trực tiếp vẫn còn rào cản khá cao. **Text‑to‑SQL / Text‑to‑DSL** và **hỏi đáp & suy luận trên đồ thị tri thức** chính là cách để LLM đóng vai trò "giao diện ngôn ngữ tự nhiên" và "đối tác suy luận" mà không phá vỡ sự ổn định của các hệ thống đó.

- **Tình huống ứng dụng**
  - Hỏi đáp BI thông minh & phân tích tự phục vụ: người dùng nghiệp vụ đặt câu hỏi bằng ngôn ngữ tự nhiên (ví dụ: "Cho tôi xem xu hướng tỷ lệ mua lại của khách hàng mới khu vực Hoa Đông trong 3 tháng gần nhất"), hệ thống tự động sinh SQL, truy vấn data warehouse rồi trả về kết quả bằng ngôn ngữ tự nhiên và biểu đồ trực quan.
  - Trợ lý phân tích vận hành / kinh doanh: nhân viên vận hành có thể khám phá dữ liệu theo dạng hội thoại ("Tại sao tỷ lệ chuyển đổi của chiến dịch này lại giảm", "Kênh nào đóng góp nhiều người dùng giá trị cao nhất"), dần dần tinh chỉnh điều kiện và chiều phân tích qua nhiều lượt hội thoại.
  - Nền tảng tri thức chuyên ngành: tổ chức các thực thể, khái niệm, quy tắc và tình huống thành đồ thị tri thức, hỗ trợ khám phá quan hệ thượng/hạ nguồn xung quanh một thực thể và kiểm tra tuân thủ.
  - Hệ thống hỏi đáp & suy luận trên graph database: trong các tình huống kiểm soát rủi ro, chống rửa tiền, phân tích chuỗi cung ứng, kết hợp graph database với LLM để trả lời và giải thích các câu hỏi dạng "chuỗi quan hệ" và "suy luận đa bước".
- **Nguyên lý**
  Cốt lõi của tầng này là chuyển LLM từ "người trả lời trực tiếp" thành "trợ lý biết gọi cơ sở dữ liệu và graph database":
  - Trong hỏi đáp cơ sở dữ liệu, mô hình cần hiểu ý định ngôn ngữ tự nhiên của người dùng, kết hợp với schema cơ sở dữ liệu (cấu trúc bảng, ý nghĩa trường, ràng buộc, v.v.) để sinh ra SQL / GraphQL / DSL nội bộ chính xác, rồi giải thích và trực quan hóa kết quả thực thi.
  - Trong tình huống đồ thị tri thức, hệ thống cần trước tiên trích xuất thực thể và quan hệ từ tài liệu, nhật ký để xây dựng đồ thị có cấu trúc; sau đó khi hỏi đáp, LLM chịu trách nhiệm dịch câu hỏi ngôn ngữ tự nhiên thành truy vấn đồ thị (ví dụ: Cypher), rồi thực hiện suy luận và giải thích đa bước dựa trên kết quả truy vấn.
  - Khác với RAG, điều được nhấn mạnh ở đây là **truy cập chính xác vào dữ liệu có cấu trúc và cấu trúc đồ thị** — một mặt cần đảm bảo ngữ nghĩa đúng, cú pháp chặt chẽ; mặt khác cần kiểm soát tấn công profiling, lộ lọt dữ liệu nhạy cảm và truy vấn chi phí cao.
- **Mô hình**
  Phương án điển hình thường là kiến trúc đa mô-đun "LLM + thành phần chuyên dụng":
  - Mô hình Text‑to‑SQL: mô hình được pre-train hoặc fine-tune trên kho ngữ liệu SQL quy mô lớn (như PICARD, DIN‑SQL, v.v.), tập trung vào tính đúng đắn cú pháp và căn chỉnh schema, đôi khi kết hợp phản hồi thực thi để tự sửa lỗi.
  - Pipeline trích xuất thông tin & xây dựng đồ thị: thông qua các mô-đun NER, trích xuất quan hệ, trích xuất sự kiện để xây dựng và cập nhật đồ thị tri thức từ văn bản và nhật ký; LLM có thể tham gia vào việc trích xuất các trường hợp khó, hỗ trợ phán định các quan hệ ranh giới mờ.
  - LLM + graph database kết hợp hỏi đáp: LLM đảm nhận phân tích câu hỏi, sinh truy vấn và giải thích kết quả; graph database (như Neo4j, v.v.) chịu trách nhiệm thực thi hiệu quả và tìm kiếm quan hệ đa bước; hai bên kết nối qua giao thức gọi công cụ hoặc DSL trung gian.

### 8.2.1 Thực hành hỏi đáp cơ sở dữ liệu (Text‑to‑SQL / DSL)

Mục tiêu của hỏi đáp cơ sở dữ liệu là để người dùng nghiệp vụ "hỏi dữ liệu bằng ngôn ngữ tự nhiên", trong khi hệ thống tự động hoàn thành việc sinh câu truy vấn, thực thi và giải thích ở phía sau. Để làm tốt điều này, chìa khóa nằm ở việc cân bằng **độ chính xác ngữ nghĩa, tính đúng đắn cú pháp và an toàn thực thi**.

1. **Chuyển đổi từ ngôn ngữ tự nhiên sang SQL / DSL**
   Trong chuỗi cơ bản nhất, hệ thống cần:
   1. Phân tích ý định người dùng: xác định đối tượng truy vấn (ví dụ: "khách hàng mới khu vực Hoa Đông"), điều kiện lọc (thời gian, khu vực, kênh), cách tổng hợp (tổng số, giá trị trung bình, so sánh cùng kỳ/liên kỳ) và nhu cầu hiển thị (xu hướng, xếp hạng, Top‑N);
   2. Kết hợp schema cơ sở dữ liệu: hiểu bảng và trường nào có thể biểu diễn các khái niệm trên, cách thực hiện join, group by và sắp xếp;
   3. Sinh SQL / GraphQL / DSL nội bộ có thể thực thi, đảm bảo cấu trúc hợp lệ thông qua bộ kiểm tra cú pháp hoặc mô hình Text2SQL chuyên dụng (PICARD, DIN‑SQL, v.v.).
2. **Giải thích ngôn ngữ tự nhiên & trực quan hóa kết quả thực thi**
   Sau khi thực thi truy vấn, hệ thống còn cần biến "tập kết quả khô khan" thành "insight có thể hiểu được":
   1. Giải thích văn bản cho kết quả đơn giản, ví dụ: "Tỷ lệ mua lại của khách hàng mới khu vực Hoa Đông trong 3 tháng qua có xu hướng tăng tổng thể, từ 15% lên 21%";
   2. Chọn hình thức trực quan hóa phù hợp cho kết quả phức tạp (biểu đồ đường, biểu đồ cột, biểu đồ tròn, biểu đồ phân phối, v.v.) và đưa ra phân tích ngắn gọn;
   3. Hỗ trợ người dùng tiếp tục đặt câu hỏi dựa trên kết quả hiện tại (ví dụ: "Đợt tăng trưởng này chủ yếu đến từ kênh nào?"), tự động xây dựng truy vấn mới dựa trên SQL lịch sử và ngữ cảnh.
3. **An toàn & kiểm soát: ngăn chặn "truy vấn bừa bãi" và "vượt quyền"**
   Do SQL được LLM sinh ra có tính linh hoạt rất cao, cần có một tầng cơ chế an toàn và quản trị:
   1. Dựa trên vai trò và quyền hạn người dùng, giới hạn nghiêm ngặt database, bảng, trường và khoảng thời gian có thể truy vấn;
   2. Trang bị cho SQL được mô hình sinh ra các quy tắc kiểm tra tĩnh/động, lọc các thao tác nguy hiểm (như quét phạm vi rộng, join chi phí cao, truy vấn cross-tenant, v.v.);
   3. Ghi lại đầy đủ "câu hỏi ngôn ngữ tự nhiên – SQL được sinh – kết quả thực thi – câu trả lời cuối cùng" để phục vụ kiểm toán và phân tích bất thường.

### 8.2.2 Xây dựng và truy vấn đồ thị tri thức

Đồ thị tri thức cố gắng tổ chức các tri thức rải rác trong văn bản, bảng biểu, nhật ký thành mạng lưới có cấu trúc "thực thể – quan hệ – thuộc tính – sự kiện", từ đó hỗ trợ tốt hơn **khám phá quan hệ, suy luận đa bước và hỏi đáp phức tạp**. Theo hướng này, LLM và các phương pháp trích xuất thông tin truyền thống cùng graph database tạo thành sự bổ trợ lẫn nhau rất tốt.

1. **Trích xuất thực thể và quan hệ từ tài liệu để xây dựng đồ thị**
   Xây dựng đồ thị tri thức thường dùng pipeline đa giai đoạn:
   1. Trích xuất thông tin: sử dụng các mô hình NER, trích xuất quan hệ, trích xuất sự kiện để nhận dạng thực thể (người, tổ chức, sản phẩm, địa danh, khái niệm), quan hệ giữa chúng (trực thuộc, hợp tác, phụ thuộc, nhân quả) và các sự kiện quan trọng (giao dịch, rủi ro, thay đổi) từ văn bản;
   2. Chuẩn hóa và căn chỉnh: gộp các cách biểu diễn khác nhau của cùng một thực thể (tên viết tắt, bí danh, biến thể chính tả) về dạng chuẩn, căn chỉnh vào ID thống nhất;
   3. Cập nhật đồ thị và quản lý phiên bản: hỗ trợ cập nhật gia tăng, giải quyết xung đột và sửa lỗi, đảm bảo đồ thị duy trì chất lượng và nhất quán trong quá trình phát triển dài hạn. LLM có thể hỗ trợ các thuật toán truyền thống trong việc giải nghĩa nhập nhằng, tinh chỉnh loại quan hệ, quy nạp quy tắc.
2. **LLM + graph database (Neo4j, v.v.) để truy vấn và suy luận**
   Khi đồ thị đã được xây dựng xong, graph database chịu trách nhiệm lưu trữ và truy xuất hiệu quả, còn LLM có thể đóng vai trò "đầu vào ngôn ngữ tự nhiên + bộ điều khiển suy luận":
   1. Phân tích câu hỏi & sinh truy vấn đồ thị: dịch câu hỏi ngôn ngữ tự nhiên thành câu lệnh truy vấn đồ thị (ví dụ: Cypher của Neo4j), bao gồm xác định thực thể xuất phát, loại quan hệ, độ dài đường đi và điều kiện lọc;
   2. Suy luận đa bước: thông qua đường đi và subgraph cục bộ thu được từ truy vấn đồ thị, LLM tiếp tục giải thích và quy nạp, ví dụ: "Khách hàng A và thực thể rủi ro cao B được kết nối gián tiếp qua ba công ty";
   3. Trực quan hóa kết quả và khả năng giải thích: trình bày kết quả truy vấn đồ thị dưới dạng mạng lưới trực quan, đồng thời LLM đưa ra giải thích bằng lời để giúp người dùng hiểu cấu trúc quan hệ phức tạp.
3. **Nền tảng tri thức chuyên ngành và dịch vụ thống nhất**
   Trong các ứng dụng cấp doanh nghiệp hoặc ngành nghề quy mô lớn hơn, đồ thị tri thức thường tồn tại như một "nền tảng tri thức chuyên ngành":
   1. Cung cấp góc nhìn thực thể và quan hệ thống nhất cho các hệ thống nghiệp vụ cấp trên (kiểm soát rủi ro, tuân thủ, chân dung khách hàng 360, phân tích chuỗi cung ứng, v.v.);
   2. Cùng với RAG và hỏi đáp cơ sở dữ liệu tạo thành tầng dịch vụ tri thức thống nhất, logic điều phối LLM thống nhất quyết định câu hỏi hiện tại nên truy cập chỉ mục tài liệu, cơ sở dữ liệu quan hệ hay graph database;
   3. Dưới yêu cầu an toàn và tuân thủ, thông qua kiểm soát truy cập và chiến lược ẩn danh hóa ở tầng đồ thị, tiếp tục giảm thiểu rủi ro rò rỉ thông tin nhạy cảm.

Mục tiêu chung của tầng này là nâng cấp từ "mô hình biết nói" lên "mô hình vừa biết nói, vừa thực sự kết nối với dữ liệu và tài sản tri thức thực tế của doanh nghiệp". Khi RAG, Text‑to‑SQL, đồ thị tri thức và hạ tầng dữ liệu truyền thống kết hợp hiệu quả với nhau, hệ thống AI mới có thể vừa duy trì tính thông minh và linh hoạt, vừa đảm bảo tính kiểm soát được, khả năng giải thích và năng lực phát triển bền vững trong môi trường nghiệp vụ phức tạp.

# 9. An toàn, Căn chỉnh & Đánh giá (Safety / Alignment / Evaluation)

Trong các chương trước, chúng ta tiếp cận nhiều hơn từ góc độ "mô hình có thể làm gì": có thể nhìn hình ảnh, có thể viết code, có thể hội thoại với người dùng. Nhưng trong hệ thống LLM thực tế, chỉ "có năng lực" là chưa đủ: **làm thế nào để chứng minh những năng lực đó ổn định, đáng tin cậy và kiểm soát được? Làm thế nào để đảm bảo đầu ra phù hợp với các giá trị và yêu cầu tuân thủ? Trong vận hành dài hạn, làm thế nào để liên tục giám sát, lặp lại và hồi quy?**
Tầng này tập trung vào: **đánh giá năng lực & benchmark, căn chỉnh giá trị & huấn luyện, an toàn nội dung & tuân thủ, và kiểm soát độ bền vững & ảo giác** — cùng nhau tạo thành "tầng hạ tầng" vận hành bền vững cho LLM.

Nhìn từ góc độ sản phẩm, những năng lực này xuyên suốt toàn bộ vòng đời mô hình: ở giai đoạn thực nghiệm, mô hình cần benchmark chuẩn và đánh giá chuyên nghiệp; trước khi ra mắt phải vượt qua huấn luyện căn chỉnh và kiểm tra an toàn; sau khi ra mắt phụ thuộc vào cổng an toàn nội dung, kiểm toán nhật ký và A/B testing để giám sát liên tục; khi đối mặt với tình huống mới và mối đe dọa mới, lại phải quay lại vòng đánh giá và căn chỉnh để huấn luyện và kiểm định lại. Dưới đây chúng ta sẽ triển khai theo bốn hướng: **đánh giá năng lực & benchmark, căn chỉnh giá trị & huấn luyện, an toàn nội dung & tuân thủ, kiểm soát độ bền vững & ảo giác**.
## 9.1 Đánh Giá Năng Lực và Kiểm Thử Chuẩn (Capability Evaluation & Benchmarks)

Trong quá trình nghiên cứu và triển khai LLM, **đánh giá năng lực và kiểm thử chuẩn** là mắt xích then chốt chuyển hóa "năng lực mô hình" thành "tín hiệu có thể quan sát": vừa phải trả lời câu hỏi "trình độ tổng thể của mô hình này như thế nào", vừa phải trả lời "hiệu suất trong một lĩnh vực chuyên sâu hay tình huống kinh doanh thực tế cụ thể ra sao". Một mặt, chúng ta dùng bộ chuẩn tiêu chuẩn hóa và hệ thống đánh giá tự động để đo lường hiệu suất của mô hình trên các chiều tổng quát như **hiểu và sinh ngôn ngữ, suy luận và toán học, kiến thức và tính thực tế**; mặt khác, còn cần xây dựng các bộ đánh giá chuyên biệt cho các lĩnh vực như **y tế, pháp lý, tài chính, giáo dục**, và liên tục kiểm chứng, điều chỉnh trong **hội thoại người dùng thực tế, AB test và các chỉ số kinh doanh (Task Success Rate, CSAT, tỷ lệ đóng ticket...)**. Tổng thể, lớp này cuối cùng sẽ kết tinh thành **nền tảng đánh giá năng lực** nội bộ và **"tài liệu năng lực"** đối ngoại, cung cấp căn cứ quyết định thống nhất cho việc lựa chọn mô hình đa phiên bản, đa tenant, đa kịch bản. Dưới đây sẽ triển khai theo ba góc độ **kịch bản**, **nguyên lý**, **mô hình**.

- **Kịch bản**
  - **Kịch bản đánh giá năng lực tổng quát**: Khi cập nhật mô hình nền tảng hoặc phiên bản lớn, cần đánh giá hệ thống hiệu suất trên các tác vụ **hiểu và sinh ngôn ngữ** như đọc hiểu, tóm tắt, dịch thuật, chất lượng hội thoại; năng lực trên các tác vụ **suy luận và toán học** như số học, suy luận đa bước, bài lập trình/logic; đồng thời đo lường trình độ **kiến thức và tính thực tế** qua hỏi đáp thực tế, QA miền mở, tác vụ độ phủ kiến thức — dùng để xác định "mô hình mới có nâng cao toàn diện hay không".
  - **Kịch bản đánh giá lĩnh vực chuyên sâu**: Với các lĩnh vực phân khúc như y tế, pháp lý, tài chính, giáo dục, cần thiết kế hỏi đáp chuyên môn và mô phỏng ra quyết định — ví dụ hỏi đáp bệnh lý và gợi ý phân loại, hiểu điều luật và phân loại án lệ, phân tích đầu tư và đánh giá rủi ro, giải đáp dạy học và hỗ trợ bài tập — đồng thời kiểm tra tính nhất quán và ổn định của mô hình trong **môi trường đa ngôn ngữ, đa văn hóa**, xác nhận khả năng "nói đúng, nói phù hợp" trong môi trường rủi ro cao.
  - **Kịch bản đánh giá thực tế và chỉ số kinh doanh**: Trong giai đoạn ra mắt sản phẩm và vận hành liên tục, thông qua phát lại nhật ký hội thoại người dùng, AB test trực tuyến... ánh xạ hiệu suất mô hình sang các chỉ số kinh doanh như **tỷ lệ hoàn thành tác vụ (Task Success Rate)**, **mức độ hài lòng người dùng (CSAT)**, **tỷ lệ đóng ticket**; lúc này đối tượng đánh giá thực chất là hệ thống tổng thể "mô hình + chiến lược + quy trình sản phẩm", dùng để hướng dẫn rollback phiên bản, tối ưu chiến lược và mở rộng tính năng mới.
- **Nguyên lý**
  Hệ thống đánh giá năng lực có thể xem như một "công trình hệ thống đo lường" phân lớp, các nguyên lý cốt lõi gồm:
  - **Bộ chuẩn tiêu chuẩn: Thước đo công khai và thí nghiệm tái hiện được**
    - Ngôn ngữ / suy luận: Sử dụng các tác vụ tổng hợp như **MMLU**, **BIG-Bench** kết hợp bài toán toán học và logic như **GSM8K**, **MATH**, xây dựng thước đo thống nhất cho hiểu ngôn ngữ, nắm kiến thức, suy luận đa bước.
    - Lập trình: Thông qua **HumanEval**, **MBPP**, ngân hàng đề **Codeforces**..., định lượng năng lực sinh code, sửa chương trình và giải quyết vấn đề.
    - Đa phương thức: Tận dụng các benchmark **VQA**, **MMBench**, **ScienceQA**, **MathVista**... để kiểm tra hiểu ảnh-văn bản, hỏi đáp thị giác và suy luận toán học trong hình ảnh.
      Các benchmark này nhấn mạnh **tiêu chuẩn hóa, tái hiện được, có thể so sánh**, thuận tiện cho so sánh ngang giữa các mô hình, tổ chức và công bố đối ngoại.
  - **Đánh giá tự động: Quy mô hóa và hồi quy liên tục**
    - **LLM-as-a-Judge**: Dùng mô hình mạnh hơn hoặc được huấn luyện chuyên biệt để chấm điểm/xếp hạng câu trả lời, đánh giá tính chính xác, đầy đủ, phong cách và an toàn, thực hiện đánh giá chủ quan tự động quy mô lớn.
    - **Các chỉ số dựa trên quy tắc**: Như BLEU / ROUGE / BERTScore đo độ tương đồng văn bản, Pass@k đo tỷ lệ pass bài lập trình..., cho phép so sánh nhanh sự khác biệt giữa các phiên bản trên tập dữ liệu cố định.
      Điểm mấu chốt của đánh giá tự động là **tính ổn định và nhất quán** — dù không hoàn hảo, miễn là "độ lệch nhất quán" thì có thể phản ánh đáng tin cậy sự thay đổi tương đối của mô hình trong CI liên tục.
  - **Đánh giá thủ công: Căn chỉnh cảm nhận con người và mục tiêu kinh doanh**
    - **So sánh Pairwise và gán nhãn chấm điểm**: Người gán nhãn thực hiện lựa chọn pairwise hoặc chấm điểm đa chiều (helpful / honest / harmless...) cho câu trả lời của hai mô hình A/B, là nguồn dữ liệu quan trọng để huấn luyện mô hình phần thưởng RLHF / RLAIF.
    - **Thí nghiệm người dùng trực tuyến**: Thực hiện AB test trên các kịch bản triển khai như trợ lý hội thoại, tìm kiếm/gợi ý, trực tiếp quan sát ảnh hưởng của các mô hình/chiến lược khác nhau lên chỉ số hài lòng người dùng, tỷ lệ chuyển đổi...
      Đánh giá thủ công vừa dùng để **hiệu chỉnh đánh giá tự động**, vừa là căn cứ quan trọng khi "giải thích hành vi mô hình" đối ngoại.
- **Mô hình**
  Trong thực hành kỹ thuật, đánh giá năng lực sẽ kết tinh thành một bộ "nền tảng + quy trình + hệ thống chỉ số" tương đối hoàn chỉnh:
  - **Nền tảng đánh giá năng lực nội bộ và CI pipeline**: Quản lý thống nhất các bộ chuẩn, script đánh giá, cấu hình LLM-as-a-Judge và công cụ gán nhãn thủ công; hỗ trợ kích hoạt một chạm hồi quy Benchmark sau khi mô hình hoặc chiến lược mới được nộp; tự động tổng hợp sự thay đổi chỉ số trên các tác vụ và chiều khác nhau, cung cấp Dashboard trực quan hóa và cảnh báo hồi quy.
  - **"Tài liệu năng lực" đối ngoại và hồ sơ mô hình**: Tổng hợp kết quả đánh giá nội bộ thành "tài liệu năng lực" có thể tiêu thụ đối ngoại, bao gồm thành tích benchmark đại diện, kịch bản áp dụng khuyến nghị (như hội thoại tổng quát, hỗ trợ lập trình, hiểu đa phương thức...), các hạn chế đã biết và kịch bản không phù hợp, giúp khách hàng hình thành kỳ vọng đúng đắn, đồng thời cung cấp căn cứ cho tuân thủ và phân chia trách nhiệm.
  - **Công cụ đánh giá và lựa chọn mô hình thống nhất đa tenant/đa phiên bản**: Trong cùng một bộ hệ thống đánh giá, so sánh thống nhất các mô hình có kích thước, chiến lược căn chỉnh hoặc kiến trúc khác nhau; hỗ trợ cấu hình trọng số theo ngành, khu vực, yêu cầu SLA; tự động tạo điểm tổng hợp "hiệu suất–chi phí–độ trễ", giúp bên sản phẩm và kinh doanh ra quyết định lựa chọn mô hình và phát hành canary.

### 9.1.1 Đánh Giá Năng Lực Tổng Quát và Chuyên Sâu: Từ Benchmark Đến Kiểm Chứng Kịch Bản

Đánh giá năng lực tổng quát và chuyên sâu là "lớp nền tảng đầu tiên" của toàn bộ hệ thống đánh giá, trọng tâm là: trước tiên dùng thước đo thống nhất để đo lường **năng lực cơ bản** của mô hình, sau đó kiểm chứng **khả năng sử dụng và rủi ro** trong các kịch bản chuyên nghiệp.

Trong đánh giá năng lực tổng quát, thường sẽ phân tách tác vụ thành ba chiều: hiểu và sinh ngôn ngữ, suy luận và toán học, kiến thức và tính thực tế. Chiều đầu tiên dùng tác vụ đọc hiểu, tóm tắt, dịch thuật, chất lượng hội thoại để kiểm tra mô hình có thể hiểu chính xác ngữ cảnh, kiểm soát phong cách và xuất ra văn bản mạch lạc không; chiều thứ hai dùng số học, suy luận đa bước, bài lập trình/logic để đánh giá năng lực trên chuỗi suy luận phức tạp và cấu trúc chương trình; chiều thứ ba đo độ phủ kiến thức và trình độ thực tế qua hỏi đáp thực tế và QA miền mở. Trong đánh giá lĩnh vực chuyên sâu, cần mời chuyên gia ngành tham gia thiết kế dữ liệu: như hỏi đáp y tế thiết lập ngữ cảnh tiền sử bệnh, kết quả xét nghiệm..., yêu cầu mô hình đưa ra cảnh báo rủi ro và ranh giới tư vấn khám chữa bệnh trong câu trả lời; tác vụ pháp lý thiết kế tìm kiếm điều luật, so sánh án lệ, phân tích áp dụng pháp luật; tài chính và giáo dục tập trung vào công bố tuân thủ và hướng dẫn dạy học. Lớp đánh giá này thường kết hợp bộ chuẩn tiêu chuẩn và tập dữ liệu tự xây dựng, vừa theo đuổi khả năng so sánh, vừa chú trọng tính liên quan kinh doanh.

### 9.1.2 Đánh Giá Tự Động và LLM-as-a-Judge: Làm Cho Đánh Giá Có Thể Mở Rộng

Khi quy mô tác vụ và số phiên bản mô hình tăng trưởng nhanh chóng, chỉ dựa vào thủ công đã khó đáp ứng nhu cầu đánh giá, lúc này cần thực hiện **quy mô hóa và hồi quy tần suất cao** thông qua hệ thống đánh giá tự động.

Một cách làm là tận dụng các chỉ số dựa trên quy tắc truyền thống: với tác vụ dịch thuật, tóm tắt, dùng BLEU / ROUGE / BERTScore so với câu trả lời tham chiếu; với tác vụ lập trình dùng Pass@k kiểm tra trong nhiều mẫu sinh có ít nhất một mẫu pass unit test không. Các chỉ số này dễ triển khai, có thể tự động hóa cao, nhưng không nhạy cảm với sự đa dạng câu trả lời và chi tiết phong cách. Cách làm đại diện hơn là **LLM-as-a-Judge**: dùng mô hình mạnh hơn hoặc được huấn luyện chuyên biệt làm "giám khảo chấm điểm", dựa trên Rubric chấm điểm được định nghĩa trước, thực hiện chấm điểm đa chiều hoặc xếp hạng Pairwise cho đầu ra của mô hình được kiểm tra. Điều này cho phép chúng ta thực hiện đánh giá tự động hiệu quả ngay cả trên tác vụ hỏi đáp mở và hội thoại không có câu trả lời chuẩn, câu trả lời đa dạng. Trong kỹ thuật thực tế, tiêu chuẩn chấm điểm và prompt của LLM-as-a-Judge cần được hiệu chỉnh và lặp lại qua dữ liệu gán nhãn thủ công để đảm bảo nhất quán với giám khảo con người.

### 9.1.3 Đánh Giá Thủ Công và Chỉ Số Kinh Doanh: Khép Vòng Về Trải Nghiệm Người Dùng Thực Tế

Dù chỉ số offline có hoàn chỉnh đến đâu, cũng chỉ có thể xấp xỉ trải nghiệm người dùng thực tế. Để khép vòng đánh giá năng lực về kinh doanh, cần đưa vào hai loại phương tiện: đánh giá thủ công và thí nghiệm trực tuyến.

Về phía đánh giá thủ công, phổ biến nhất là so sánh Pairwise: để người gán nhãn, trong điều kiện không biết danh tính mô hình, dựa trên các chiều helpful / honest / harmless..., thực hiện lựa chọn ưu tiên hoặc chấm điểm cho hai câu trả lời A/B, từ đó thu được dữ liệu ưu tiên chất lượng cao — một mặt dùng để đánh giá trực tiếp, mặt khác có thể cung cấp dữ liệu huấn luyện mô hình phần thưởng cho RLHF / RLAIF. Về phía kinh doanh, thông qua AB test trực tuyến so sánh ảnh hưởng của các phiên bản mô hình, prompt, cấu hình chiến lược khác nhau lên tỷ lệ hoàn thành tác vụ, mức độ hài lòng người dùng (CSAT), tỷ lệ đóng ticket và các chỉ số then chốt khác, kết hợp phát lại nhật ký hội thoại người dùng và kiểm tra thủ công ngẫu nhiên, liên tục giám sát hiệu suất thực tế của mô hình sau khi lên line. Đầu ra của lớp đánh giá này lại phản hồi ngược trở lại hướng trọng tâm và điều chỉnh trọng số của nền tảng đánh giá năng lực, hình thành vòng khép kín "chỉ số offline — đánh giá thủ công — chỉ số trực tuyến".
## 9.2 Value Alignment & Training

Sau khi sở hữu năng lực nền tảng mạnh mẽ, để trở thành sản phẩm "an toàn, đáng tin cậy, có thể kiểm soát", LLM còn phải trải qua quá trình **Value Alignment & Training**. Tầng này không còn quan tâm đến việc mô hình "có thể trả lời hay không", mà tập trung vào " **câu trả lời có hữu ích, trung thực, vô hại hay không** " cũng như "trong các vai trò và ngành nghề khác nhau, mô hình nên nói chuyện như thế nào". Nhìn từ góc độ kỹ thuật, quá trình alignment gồm ba bước: đầu tiên, thông qua tài liệu và quy chuẩn để xác định rõ **mục tiêu alignment (What to Align)**, phân rã Helpful, Honest, Harmless thành các tiêu chuẩn có thể gán nhãn và huấn luyện; tiếp theo, xây dựng **dữ liệu instruction và dữ liệu an toàn** bao phủ rộng, gồm các tác vụ thông thường, các trường hợp vùng xám và các câu trả lời không phù hợp; cuối cùng, thông qua các phương pháp **SFT, RLHF / RLAIF, mô hình hóa chiến lược từ chối/chuyển hướng**, "ghi" các ưu tiên và quy tắc này vào hành vi mô hình, kết hợp với quản lý hội thoại thượng nguồn và policy engine để thực hiện alignment an toàn end-to-end. Phần dưới đây cũng triển khai từ ba góc độ: **tình huống**, **nguyên lý**, **mô hình**.

- **Tình huống**
  - **Tình huống trợ lý C-end phổ thông**: Trợ lý chat và trợ lý tra cứu thông tin hướng đến đại chúng, cần duy trì thái độ " **thân thiện, hữu ích, không vượt giới hạn** " trên phổ chủ đề rộng: vừa phải trả lời chuyên nghiệp, tập trung vào tác vụ, vừa phải thành thật thừa nhận giới hạn khi không chắc chắn, từ chối hoặc hướng dẫn nhẹ nhàng với các yêu cầu rõ ràng không phù hợp.
  - **Tình huống trợ lý ngành chuyên biệt**: Trong các lĩnh vực y tế, pháp lý, tài chính, giáo dục, ngoài an toàn cơ bản, còn phải bổ sung các quy chuẩn ngành: ví dụ trợ lý y tế cần nhấn mạnh "không mang tính chẩn đoán + cảnh báo rủi ro + khuyến nghị khám bác sĩ", trợ lý pháp lý phải tránh cung cấp lời khuyên vi phạm pháp luật, trợ lý tài chính phải tuân thủ yêu cầu công bố tuân thủ đầu tư, trợ lý giáo dục phải cân nhắc bảo vệ trẻ vị thành niên và nội dung phù hợp độ tuổi.
  - **Tình huống alignment layer có thể cấu hình cho B-end**: Doanh nghiệp thường muốn, trên nền tảng an toàn phổ quát, nhúng thêm các yêu cầu ngành của mình, phong cách thương hiệu và chính sách nội bộ, do đó cần một **alignment layer có thể cấu hình**, cho phép khách hàng tự cấu hình ngưỡng an toàn, danh mục nhạy cảm và phong cách ngôn từ mà không cần huấn luyện lại LLM nền.
- **Nguyên lý**
  Value alignment có thể hiểu là "dùng giá trị quan của con người và tổ chức để ràng buộc không gian hành vi của mô hình", các nguyên lý cốt lõi bao gồm:
  - **Định nghĩa mục tiêu alignment (What to Align)**
    - **Helpful (Hữu ích)**: Câu trả lời phải chất lượng cao, chuyên nghiệp, cấu trúc rõ ràng, tập trung vào mục tiêu tác vụ, không lan man và tán gẫu quá mức.
    - **Honest (Trung thực)**: Cố gắng không bịa đặt, chủ động thừa nhận sự không chắc chắn, đưa ra phạm vi ước tính hoặc đề xuất kênh kiểm chứng khi thiếu kiến thức hoặc hiểu chưa rõ.
    - **Harmless (Vô hại)**: Tuân thủ pháp luật và chính sách nền tảng, tránh tạo ra nội dung thù hận, phân biệt đối xử, khuyến khích tự làm hại bản thân, hướng dẫn tội phạm, đồng thời tôn trọng phẩm giá và ranh giới của người dùng.
      Các mục tiêu này sẽ được đưa vào hướng dẫn gán nhãn và tài liệu chính sách, trở thành tiêu chuẩn thống nhất cho việc xây dựng dữ liệu, mô hình hóa phần thưởng và đánh giá tiếp theo.
  - **Xây dựng dữ liệu huấn luyện alignment**
    - **Dữ liệu Instruction**: Thiết kế các instruction tác vụ bao phủ rộng và câu trả lời lý tưởng, bao gồm nhiều tình huống hỏi đáp, viết lách, tóm tắt, code, lập kế hoạch, dạy mô hình hành vi tốt nhất với "các yêu cầu thông thường".
    - **Dữ liệu Safety**: Xây dựng các mẫu đối chiếu "câu trả lời tốt vs câu trả lời không phù hợp", đặc biệt chú trọng vùng xám (gray zone), như thông tin phổ thông vs thao tác cụ thể, hỗ trợ cảm xúc vs khuyến khích tự làm hại, tranh luận hợp pháp vs kích động thù hận, cung cấp cho mô hình các ví dụ ranh giới chi tiết.
  - **Phương pháp huấn luyện alignment**
    - **SFT (Supervised Fine-Tuning)**: Thực hiện fine-tuning có giám sát trên dữ liệu hội thoại/instruction chất lượng cao, là bước đầu tiên định hình hành vi chuẩn và phong cách ngôn từ của mô hình.
    - **RLHF / RLAIF**: Xây dựng dữ liệu ưu tiên thông qua điểm số từ con người hoặc mô hình, huấn luyện reward model, sau đó thực hiện policy optimization để mô hình có xu hướng tạo ra các câu trả lời được "ưu tiên" (hữu ích hơn, an toàn hơn, trung thực hơn) khi sinh văn bản.
    - **Mô hình hóa chiến lược từ chối/chuyển hướng**: Với các yêu cầu có rủi ro cao hoặc không phù hợp, huấn luyện mô hình không chỉ biết từ chối mà còn đưa ra giải thích hợp lý và hướng dẫn người dùng đến giải pháp thay thế an toàn (ví dụ cung cấp nguồn hỗ trợ, khuyến khích tham khảo chuyên gia, v.v.).
- **Mô hình**
  Về thiết kế hệ thống, value alignment thường thể hiện dưới dạng kết hợp " **huấn luyện alignment tầng dưới + policy guardrail tầng trên** ":
  - **Mô hình alignment SFT + RLHF / RLAIF**: Giai đoạn SFT giúp mô hình học pattern cơ bản của câu trả lời lý tưởng; giai đoạn RLHF / RLAIF thông qua preference learning "siết chặt" hành vi hơn nữa, khiến mô hình gần hơn với ưu tiên của con người và tiêu chuẩn an toàn. Về chiều an toàn, có thể xây dựng riêng một reward head hoặc classifier cho tính có hại, dùng để áp dụng hình phạt trong policy optimization.
  - **Constitutional AI / Policy-based Alignment**: Bằng cách trước tiên soạn thảo một bộ tài liệu "Constitution" hoặc Policy, rồi để mô hình tự phê bình và viết lại theo bộ quy tắc này, tạo ra lượng lớn "dữ liệu tự giám sát chỉnh sửa", vừa giảm chi phí nhân công vừa tăng cường khả năng nội hóa quy tắc của mô hình.
  - **Phối hợp quản lý hội thoại và phát hiện ý định**: Trong pipeline sản phẩm, chuyển một phần logic an toàn/alignment lên tầng quản lý hội thoại, thông qua nhận diện ý định, điền slot, định tuyến tác vụ để quyết định có chuyển yêu cầu cho LLM không, có cần lọc an toàn bổ sung hay trả lời theo template không. Điều này tạo ra "bảo hiểm kép" gồm alignment mô hình + policy guardrail.
  - **Nền tảng alignment nội bộ và cấu hình vai trò**: Xây dựng nền tảng alignment nội bộ, cung cấp công cụ gán nhãn/chấm điểm, quản lý phiên bản chính sách và training pipeline; đồng thời hỗ trợ cấu hình mục tiêu alignment và phong cách ngôn từ khác nhau cho các vai trò khác nhau (chăm sóc khách hàng, tư vấn y tế, hỗ trợ giáo dục, v.v.), để cùng một mô hình nền thể hiện nhân cách nhất quán nhưng có thể kiểm soát, hoàn toàn khác biệt trong các sản phẩm khác nhau.

### 9.2.1 Mục tiêu alignment và dữ liệu huấn luyện: Biến giá trị thành tín hiệu có thể học

Bước đầu tiên của value alignment là dịch "giá trị trừu tượng" thành tín hiệu mà mô hình có thể học được, và điều này không thể thiếu định nghĩa mục tiêu alignment và xây dựng dữ liệu huấn luyện.

Ở tầng mục tiêu alignment, nhóm thường sản xuất một bộ tài liệu quy chuẩn hành vi chi tiết, phân rã Helpful / Honest / Harmless thành các điều khoản cụ thể, như: cấm cung cấp các bước cụ thể cho một số thao tác nguy hiểm cao, với lời khuyên y tế/pháp lý phải kèm theo tuyên bố từ chối trách nhiệm và cảnh báo rủi ro, khi đề cập chủ đề tranh cãi phải giữ thái độ trung lập và trình bày đa góc nhìn, v.v. Tiếp theo, trong giai đoạn dữ liệu instruction, sẽ xây dựng các tác vụ đa dạng và câu trả lời lý tưởng xoay quanh các chỉ số này, bao gồm các tình huống chat, viết lách, code, hỏi đáp và tích hợp nhiều ngôn ngữ, nhiều bối cảnh văn hóa; trong giai đoạn dữ liệu safety, sẽ xây dựng các ví dụ đối chiếu "câu trả lời tốt/xấu" cho nội dung có hại, lĩnh vực rủi ro cao và vùng xám, cung cấp tư liệu huấn luyện cho preference learning và safety classifier tiếp theo. Thông qua cách này, mục tiêu giá trị được "dịch" thành phân phối dữ liệu thực tế, trở thành tín hiệu mà quá trình huấn luyện mô hình có thể trực tiếp cảm nhận.

### 9.2.2 SFT, RLHF / RLAIF và chiến lược từ chối: Định hình hành vi mô hình

Sau khi có mục tiêu alignment và dữ liệu, bước tiếp theo là ghi các mục tiêu đó vào hành vi mô hình thông qua quy trình huấn luyện đa giai đoạn.

Trong giai đoạn SFT, mô hình được fine-tuning có giám sát trên dữ liệu minh họa chất lượng cao của con người, tương tự như "học từ sách giáo khoa": nó quyết định phong cách ngôn từ, cấu trúc và paradigm chuẩn để giải quyết vấn đề của mô hình với phần lớn các yêu cầu thông thường. Sau đó, **RLHF / RLAIF** thực hiện preference optimization: trước tiên dùng nhãn ưu tiên từ con người hoặc LLM lớn hơn để huấn luyện reward model, rồi dùng thuật toán policy optimization (như PPO, v.v.) điều chỉnh mô hình để nó có xu hướng nhận phần thưởng cao hơn khi sinh văn bản. Như vậy, mô hình không chỉ "biết câu trả lời đúng trông như thế nào" mà còn biết "câu trả lời nào phù hợp hơn với ưu tiên của con người và yêu cầu an toàn". Trên cơ sở đó, còn mô hình hóa riêng các **chiến lược từ chối và chuyển hướng** khác nhau: với các câu hỏi rõ ràng vi phạm pháp luật, rủi ro cực cao hoặc không phù hợp để AI trả lời, mô hình phải học cách đưa ra lời từ chối và giải thích rõ ràng, đồng thời cung cấp con đường thay thế an toàn (như đường dây hỗ trợ, tư vấn chuyên nghiệp, v.v.), thay vì im lặng đơn giản hoặc trả lời qua loa.

### 9.2.3 Tầng policy và nền tảng alignment: Làm cho alignment có thể cấu hình và tiến hóa được

Dù mô hình nền đã được huấn luyện alignment đầy đủ, trong hệ thống thực tế vẫn cần **tầng policy và nền tảng alignment** để đạt được khả năng kiểm soát và tiến hóa chi tiết hơn.

Tầng policy thường bao gồm nhận diện ý định, đánh giá rủi ro và logic định tuyến: khi đầu vào của người dùng đến hệ thống, trước tiên mô hình nhẹ sẽ xác định ý định, lĩnh vực và mức độ rủi ro của nó, rồi quyết định có gọi trực tiếp LLM không, có cần lọc an toàn bổ sung không, có rơi vào template trả lời hay chuyển sang kênh nhân viên không. Với các ngành và khách hàng khác nhau, tầng policy có thể tải các cấu hình Policy khác nhau, thực hiện tùy chỉnh danh mục nhạy cảm, phong cách từ chối và phong cách thương hiệu. Đồng thời, nền tảng alignment nội bộ sẽ quản lý tất cả tài sản liên quan đến alignment: công cụ gán nhãn/chấm điểm, phiên bản reward model, lịch sử thay đổi chính sách, kết quả A/B online, v.v., giúp nhóm có thể nhanh chóng lặp chiến lược alignment và phát hành grayscale mà không cần huấn luyện lại mô hình nền thường xuyên, từ đó duy trì sự kiểm soát liên tục đối với hành vi mô hình.
## 9.3 Bảo Mật Nội Dung và Tuân Thủ (Content Safety & Compliance)

Khi các mô hình lớn được tích hợp vào tìm kiếm, hội thoại, sáng tạo nội dung, nền tảng mạng xã hội và cả hệ thống nội bộ doanh nghiệp, **bảo mật nội dung và tuân thủ** đã chuyển từ "tính năng bổ sung" thành "điều kiện tiên quyết để được phép hoạt động". Tầng này tập trung vào: liệu mô hình có tạo ra nội dung vi phạm pháp luật hoặc gây hại khi sinh văn bản, hình ảnh, âm thanh hay video hay không; liệu hệ thống có tuân thủ luật pháp và quy định của quốc gia/khu vực và ngành nghề khi xử lý dữ liệu người dùng hay không; và liệu hệ thống có cung cấp được chuỗi bằng chứng rõ ràng, có thể truy vết khi đối mặt với kiểm toán và giám sát hay không. Để làm được điều đó, bạn cần xây dựng một hệ thống kỹ thuật và quản trị toàn diện bao gồm **kiểm duyệt nội dung đa phương thức, tuân thủ theo khu vực và ngành, bảo vệ quyền riêng tư và dữ liệu cục bộ**, đồng thời đóng gói chúng thành các sản phẩm như dịch vụ bảo mật nội dung SaaS, nền tảng tuân thủ doanh nghiệp và cổng bảo mật ngành. Dưới đây sẽ được triển khai theo ba góc độ **tình huống**, **nguyên lý** và **mô hình**.

- **Tình huống**
  - **Tình huống kiểm duyệt và lọc nội dung đa phương thức**: Trong các sản phẩm hội thoại, nền tảng UGC, ứng dụng cộng đồng và mạng xã hội, mô hình lớn sẽ tạo ra hoặc tiếp nhận lượng lớn nội dung văn bản, hình ảnh, âm thanh và video. Bạn cần có năng lực **kiểm duyệt đa phương thức** thống nhất để nhận diện và chặn theo thời gian thực các đầu ra có rủi ro cao liên quan đến quyền riêng tư cá nhân, hướng dẫn phạm pháp, kích động thù địch, bạo lực cực đoan, nội dung khiêu dâm và nội dung không phù hợp với trẻ vị thành niên.
  - **Tình huống ràng buộc tuân thủ và bản địa hóa**: Luật pháp và quy định của các quốc gia/khu vực khác nhau có yêu cầu khác nhau về bảo vệ dữ liệu, bảo vệ trẻ vị thành niên và quản lý nội dung; các ngành khác nhau (y tế, tài chính, giáo dục, quảng cáo, v.v.) cũng có quy chuẩn tuân thủ riêng. Do đó hệ thống phải hỗ trợ tải các mẫu chính sách khác nhau theo **khu vực và ngành** để đáp ứng yêu cầu của cơ quan quản lý địa phương.
  - **Tình huống bảo vệ quyền riêng tư và dữ liệu người dùng**: Trong quá trình huấn luyện mô hình và cung cấp dịch vụ trực tuyến, bạn cần xử lý lượng lớn dữ liệu hội thoại và nghiệp vụ của người dùng. Làm thế nào để thực hiện ẩn danh hóa, khử nhận dạng và thu thập tối thiểu dữ liệu, đồng thời bảo vệ quyền riêng tư trong giai đoạn huấn luyện và suy luận thông qua các biện pháp kỹ thuật và thể chế, là một trụ cột quan trọng khác của hệ thống bảo mật nội dung và tuân thủ, đặc biệt trong các ngành nhạy cảm như tài chính và y tế.
- **Nguyên lý**
  Nguyên lý nền tảng của bảo mật nội dung và tuân thủ có thể được phân thành ba tầng: chính sách, lọc và quyền riêng tư:
  - **Hệ thống chính sách bảo mật (Policy Engine)**
    - **Hình thức hóa** luật pháp, quy tắc nền tảng và chuẩn mực ngành **thành các chính sách có thể thực thi**, sử dụng engine quy tắc kết hợp chấm điểm mô hình để phân cấp rủi ro nội dung (an toàn / vùng xám / rủi ro cao).
    - Hỗ trợ lựa chọn các mẫu chính sách khác nhau theo tình huống và khách hàng, ví dụ như cấu hình các danh mục nhạy cảm và ngưỡng khác nhau cho sản phẩm dành cho thanh thiếu niên, cộng đồng chuyên nghiệp hoặc doanh nghiệp đa quốc gia.
  - **Lọc nội dung đa tầng: Trước–Trong–Sau**
    - **Trước**: Phát hiện và viết lại Prompt của người dùng (Prompt Shielding), chặn các ý định rõ ràng vi phạm pháp luật hoặc cực kỳ nhạy cảm trước khi yêu cầu đến mô hình lớn, hoặc dẫn hướng sang cách diễn đạt an toàn hơn.
    - **Trong**: Khi mô hình tạo ra đầu ra, sử dụng mô hình phân loại bảo mật và quy tắc để kiểm duyệt nội dung theo thời gian thực (Real-time Safety Filter), cắt ngắn, thay thế, che khuất hoặc kích hoạt luồng từ chối trả lời đối với nội dung có rủi ro cao.
    - **Sau**: Thực hiện kiểm toán mẫu và xem xét thủ công đối với nhật ký hội thoại và tạo sinh, phân tích nguồn gốc của các vấn đề được phát hiện, từ đó cập nhật chính sách và mô hình, đồng thời cung cấp hồ sơ có thể truy vết cho cơ quan quản lý bên ngoài.
  - **Kỹ thuật bảo vệ quyền riêng tư và quản trị dữ liệu**
    - Trước khi lưu trữ và huấn luyện dữ liệu, thực hiện **ẩn danh hóa và khử nhận dạng** dữ liệu hội thoại người dùng, xóa hoặc thay thế các trường nhạy cảm như họ tên, số CMND, số điện thoại, địa chỉ, và tuân thủ **nguyên tắc thu thập tối thiểu** chỉ giữ lại thông tin cần thiết.
    - Trong một số tình huống, áp dụng **Differential Privacy (DP)** để hạn chế ảnh hưởng của từng mẫu đơn lẻ lên tham số mô hình, hoặc sử dụng **Federated Learning (FL)** để giữ việc huấn luyện trong vùng dữ liệu cục bộ, tránh đưa dữ liệu thô lên đám mây.
    - Sử dụng các cơ chế kiểm soát truy cập như **RBAC / ABAC** để hạn chế nghiêm ngặt ai có thể truy cập nhật ký và dữ liệu nhạy cảm ở mức độ nào, kết hợp với nhật ký kiểm toán để đảm bảo đường dẫn truy cập có thể theo dõi.
- **Mô hình**
  Từ góc độ thiết kế sản phẩm và hệ thống, bảo mật nội dung và tuân thủ cuối cùng sẽ phát triển thành một loạt "dịch vụ và nền tảng bảo mật" có thể tái sử dụng:
  - **Dịch vụ bảo mật nội dung SaaS**: Đóng gói khả năng kiểm duyệt văn bản / hình ảnh / âm thanh và video thành API thống nhất để kết nối với ứng dụng thượng nguồn; đầu vào là nội dung, đầu ra là loại rủi ro, mức độ phân cấp và đề xuất xử lý (cho qua, chặn, xem xét thủ công), giúp developer tích hợp nhanh module bảo mật.
  - **Nền tảng tuân thủ nội bộ doanh nghiệp**: Cung cấp cho doanh nghiệp lớn khả năng cấu hình chính sách tuân thủ tập trung, báo cáo kiểm toán và cảnh báo rủi ro, kết nối với hệ thống nghiệp vụ nội bộ và đội xem xét thủ công, cho phép các đơn vị kinh doanh thực thi quy tắc tùy chỉnh trong khuôn khổ chính sách thống nhất và đáp ứng yêu cầu báo cáo giám sát bên ngoài.
  - **Cổng bảo mật chuyên dụng và hệ thống kiểm toán nhật ký cho ngành rủi ro cao**: Trong các ngành rủi ro cao như tài chính và y tế, thông qua cổng bảo mật chuyên dụng làm proxy cho tất cả các lệnh gọi mô hình lớn, kiểm tra và khử nhận dạng lưu lượng theo thời gian thực, lưu trữ nhật ký quan trọng tại cục bộ hoặc vùng tuân thủ, cung cấp khả năng kiểm toán truy cập chi tiết và truy vết sự kiện, đáp ứng các yêu cầu giám sát nghiêm ngặt.

### 9.3.1 Kiểm Duyệt Đa Phương Thức và Policy Engine: Biến Quy Tắc Thành "Code Có Thể Thực Thi"

Hệ thống bảo mật nội dung thực tế trước tiên phải có khả năng "hiểu" nội dung đến từ các kênh và phương thức khác nhau, sau đó mới có thể triển khai chính sách xuống từng yêu cầu và phản hồi.

Về kiểm duyệt đa phương thức, hệ thống thường xây dựng nhiều mô hình phát hiện cho văn bản, hình ảnh, video, v.v.: mô hình phía văn bản nhận diện từ khóa nhạy cảm, ngữ cảnh và cách diễn đạt ẩn ý; phía hình ảnh và video phát hiện nội dung bạo lực, khiêu dâm, trẻ vị thành niên, biểu tượng thù địch và vật phẩm bất hợp pháp, kết hợp OCR, ASR và đặc trưng thị giác để đưa ra phán đoán tổng hợp khi cần. Policy Engine liên kết đầu ra của các mô hình này với yêu cầu pháp lý: ví dụ, nếu một khu vực có hạn chế nghiêm ngặt hơn về nội dung cờ bạc hay chính trị, bạn có thể tăng độ nhạy của các danh mục phát hiện liên quan trong mẫu chính sách tương ứng, hoặc bắt buộc chuyển sang xem xét thủ công đối với nội dung trúng các phân loại đó. Bằng cách chuyển đổi các quy tắc trừu tượng thành chuỗi quy tắc, ngưỡng và hành động (cho qua / chặn / xem xét thủ công / che khuất), Policy Engine giúp các yêu cầu tuân thủ thực sự "vận hành được".

### 9.3.2 Lọc Đa Tầng và Kiểm Toán Nhật Ký: Xây Dựng Vòng Khép Kín Bảo Mật End-to-End

Chặn tại một điểm duy nhất khó có thể bao quát hết mọi rủi ro, do đó hệ thống bảo mật nội dung phổ biến áp dụng thiết kế **ba tuyến phòng thủ Trước–Trong–Sau**.

Ở giai đoạn Trước, hệ thống nhanh chóng phát hiện đầu vào của người dùng, trực tiếp từ chối hoặc viết lại các Prompt vi phạm rõ ràng hoặc cực kỳ nhạy cảm, hướng dẫn người dùng đặt câu hỏi theo cách an toàn; đối với các yêu cầu thăm dò ranh giới và mơ hồ, cũng có thể chủ động bổ sung tuyên bố và cảnh báo rủi ro. Ở giai đoạn Trong, đầu ra của mô hình đi qua thành phần lọc bảo mật thời gian thực: thành phần này sử dụng phân loại văn bản và khớp quy tắc để cắt tỉa, thay thế hoặc kích hoạt quy trình từ chối trả lời đối với đầu ra tiềm ẩn rủi ro cao, đảm bảo nội dung cuối cùng hiển thị cho người dùng nằm trong phạm vi chấp nhận được. Ở giai đoạn Sau, thông qua cơ chế kiểm toán nhật ký và kiểm tra mẫu, đội bảo mật hoặc hệ thống tự động đáng tin cậy định kỳ phát lại và kiểm tra các phiên hội thoại, phân tích các trường hợp phán đoán sai, bỏ sót và các mẫu rủi ro mới, từ đó cập nhật chính sách, dữ liệu huấn luyện và mô hình phát hiện. Điều này tạo thành một vòng khép kín bảo mật liên tục phát triển, thay vì "cấu hình một lần là xong".

### 9.3.3 Bảo Vệ Quyền Riêng Tư và Cổng Bảo Mật Ngành: Làm Cho Bảo Mật Dữ Liệu "Có Thể Chứng Minh"

Trong các ngành có độ nhạy cảm cao, chỉ "không tạo ra nội dung có hại" là hoàn toàn chưa đủ — bạn còn phải chứng minh rằng "việc sử dụng dữ liệu người dùng nội bộ cũng an toàn, tuân thủ và có thể truy vết".

Bảo vệ quyền riêng tư bắt đầu từ khi dữ liệu vào hệ thống: ngay trong giai đoạn thu thập và lưu trữ, thực hiện ẩn danh hóa và khử nhận dạng càng nhiều càng tốt, đảm bảo ngay cả khi nhật ký bị rò rỉ cũng khó có thể liên kết trực tiếp đến một cá nhân cụ thể; trong giai đoạn huấn luyện, giảm ảnh hưởng và rủi ro rò rỉ dữ liệu của từng người dùng lên mô hình cuối cùng thông qua differential privacy, chiến lược lấy mẫu hoặc federated learning. Đối với lưu lượng suy luận mô hình, thực hiện kiểm soát truy cập thống nhất thông qua **cổng bảo mật**: tất cả các yêu cầu và phản hồi đều phải qua kiểm tra nội dung, xác minh quyền hạn và ghi nhật ký kiểm toán của cổng, áp dụng các chính sách truy cập và chế độ xem dữ liệu khác nhau theo đơn vị kinh doanh và vai trò người dùng khi cần thiết. Cuối cùng, các nhật ký và hồ sơ thay đổi chính sách này sẽ được tích lũy thành "chuỗi bằng chứng" có thể xem được bởi kiểm toán nội bộ và cơ quan quản lý bên ngoài, giúp doanh nghiệp không chỉ tuân thủ trên thực tế mà còn "có thể chứng minh sự tuân thủ của mình" về mặt hình thức.

# 10. AI for Science (AI4Science)

Khi deep learning và các mô hình lớn chuyển từ "đề xuất quảng cáo, hiểu ngôn ngữ tự nhiên" sang **chính các vấn đề khoa học**, mục tiêu không còn chỉ là dự đoán một chỉ số hay thực hiện một phân loại, mà là thực sự tham gia vào **khám phá quy luật, thiết kế thí nghiệm, tăng tốc mô phỏng và suy luận**. AI4Science cố gắng kết hợp "nhận dạng mẫu thống kê" với "định luật vật lý / quy luật hóa sinh / cấu trúc toán học", để mô hình đóng vai trò "trợ lý khoa học có thể lập trình" trong các khâu thiết kế phân tử, kỹ thuật protein, khám phá vật liệu, mô phỏng vật lý, suy luận toán học và nhiều lĩnh vực khác.

Trong thực hành kỹ thuật, tầng này một đầu kết nối với các "cơ sở hạ tầng khoa học truyền thống" như phần mềm hóa học lượng tử, molecular dynamics (MD), các bộ mô phỏng CFD/FEA, công cụ chứng minh định lý tự động, cơ sở dữ liệu tài liệu và phòng thí nghiệm robot (Robotic Lab), đầu kia kết nối với quy trình nghiên cứu khoa học thực tế của các công ty dược phẩm, doanh nghiệp vật liệu, công ty năng lượng và tổ chức nghiên cứu. Dưới đây sẽ được triển khai theo ba góc độ **tình huống**, **nguyên lý** và **mô hình**, với phân chia chi tiết hơn ở một số hướng quan trọng.

- **Tình huống**
  - Thiết kế phân tử và thuốc: Từ hàng triệu phân tử nhỏ / mảnh ghép, dự đoán tính chất và ADMET, thiết kế ứng viên thuốc nhắm vào đích tác động cụ thể, thu hẹp không gian thí nghiệm thông qua sàng lọc ảo và tối ưu hóa đa mục tiêu.
  - Mô hình hóa cấu trúc protein và sinh học: Dự đoán cấu trúc ba chiều của protein và phức hợp, hỗ trợ thiết kế kháng thể, enzyme và protein thuốc, đánh giá ảnh hưởng của đột biến đến chức năng và độ ổn định.
  - Mô phỏng vật lý và thiết kế kỹ thuật: Sử dụng mô hình thay thế sâu để tăng tốc các mô phỏng tốn kém như CFD / FEA / molecular dynamics, cung cấp công cụ đánh giá và tối ưu hóa nhanh cho các lĩnh vực hàng không vũ trụ, ô tô và năng lượng.
  - Khám phá vật liệu và thiết kế tinh thể: Thực hiện sàng lọc ảo và thiết kế ngược trong không gian hóa học / vật liệu rộng lớn, tăng tốc nghiên cứu và phát triển các vật liệu quan trọng như pin, quang điện, chất xúc tác và hợp kim.
  - Toán học và suy luận ký hiệu: Thực hiện chứng minh định lý tự động, tính toán ký hiệu và giải phương trình trong các hệ thống hình thức, tăng cường khả năng suy luận chặt chẽ của mô hình lớn trong bài toán toán học và dẫn xuất kỹ thuật.
  - Quy trình khoa học và thí nghiệm tự động: Kết nối với tài liệu, cơ sở dữ liệu và nền tảng thí nghiệm tự động, xây dựng "Phòng thí nghiệm Tự lái (Self-Driving Lab)", cho phép mô hình tham gia thiết kế, thực thi và phân tích kết quả thí nghiệm.
- **Nguyên lý**
  - Biểu diễn có cấu trúc và mô hình hóa đồ thị: Sử dụng đồ thị (Graph), đồ thị tinh thể (Crystal Graph), đồ thị phân tử, v.v. để biểu diễn các đối tượng phức tạp, mô hình hóa quan hệ hình học và tô pô trên mạng nơ-ron đồ thị hoặc mạng E(3)-equivariant.
  - Thiên kiến quy nạp vật lý / hóa học: Tích hợp tiên nghiệm vật lý vào cấu trúc mô hình và hàm mất mát thông qua các định luật bảo toàn, tính đối xứng (tịnh tiến / quay / phản chiếu), ràng buộc PDE (PINN), hàm thế năng, v.v.
  - Sinh tạo và thiết kế ngược: Sử dụng các phương pháp mô hình hóa sinh tạo như VAE, GAN, Diffusion, RL để hỗ trợ suy ngược cấu trúc từ "tính chất mục tiêu / điều kiện ràng buộc", thực hiện thiết kế ngược phân tử / vật liệu / cấu trúc.
  - Mô hình đại diện và ghép nối đa tỷ lệ: Dùng mô hình đại diện sâu để xấp xỉ các mô phỏng tốn kém về hóa học lượng tử / môi trường liên tục / cơ học kết cấu, ghép nối mô hình vi mô–trung mô–vĩ mô để thực hiện mô hình hóa đa tỷ lệ.
  - Tăng cường công cụ và quy trình Agent: Kết hợp LLM với bộ mô phỏng, máy tính ký hiệu, công cụ chứng minh định lý tự động, hệ thống tra cứu tài liệu và robot thí nghiệm, xây dựng Agent có thể tự động lập kế hoạch và thực thi các nhiệm vụ khoa học.
- **Mô hình**
  - Mô hình biểu diễn phân tử và vật liệu: Các mạng E(3)-equivariant và mạng đồ thị như SchNet, DimeNet, PhysNet, CGCNN, MEGNet, ALIGNN; các mô hình ngôn ngữ phân tử như ChemBERTa, MolBERT, MoleculeSTM.
  - Mô hình sinh học cấu trúc: AlphaFold / AlphaFold2 / AlphaFold3, RoseTTAFold, OpenFold, ProteinMPNN, ESM-IF, chuỗi mô hình ngôn ngữ protein ESM và mô hình sinh tạo cấu trúc.
  - Mô phỏng vật lý và học toán tử: PINN, DeepONet, Fourier Neural Operator (FNO) và họ Neural Operator, DeepMD, NequIP cùng các mô hình bề mặt thế năng và học toán tử khác.
  - Mô hình toán học và suy luận ký hiệu: Các mô hình chuyên dụng cho toán học / chứng minh như Minerva, Gödel, GPT-f, Lean-Dojo, cùng các hệ thống tăng cường công cụ LLM + SymPy/Mathematica/Lean/Coq.
  - Hệ thống Agent khoa học và quy trình làm việc: Kết hợp truy xuất, sinh code, gọi mô phỏng và giao diện điều khiển thí nghiệm, đóng gói thành "trợ lý AI khoa học" và nền tảng thí nghiệm tự lái cho các lĩnh vực dược phẩm, vật liệu, vật lý và hóa học.

Bắt đầu từ tầng này, tính toán khoa học truyền thống và deep learning, mô hình lớn đan xen sâu sắc với nhau: vừa phải tôn trọng các ràng buộc nghiêm ngặt của vật lý / hóa học / sinh học / toán học, vừa phải tận dụng khả năng khớp dữ liệu mạnh mẽ để nâng cao hiệu quả. Mục tiêu cuối cùng là để AI trở thành "cộng tác viên" trong nghiên cứu khoa học, chứ không chỉ là một hộp đen dự đoán.

---
## 10.1 Mô hình hóa phân tử và thiết kế thuốc (Molecular Modeling & Drug Discovery)

Trong nghiên cứu phát triển thuốc truyền thống, từ phát hiện đích tác động đến thử nghiệm lâm sàng thường mất hơn 10 năm và hàng tỷ đô la chi phí, trong đó phần lớn thời gian và nguồn lực tiêu tốn ở giai đoạn thiết kế phân tử, dự đoán tính chất và sàng lọc ảo giai đoạn đầu. Mô hình hóa phân tử và thiết kế thuốc dựa trên AI nhằm mục tiêu đẩy nhanh quá trình này bằng **dữ liệu + mô hình hóa sinh thành**: xuất phát từ mô tả cấu trúc hoặc văn bản, dự đoán tính chất phân tử và ADMET, thiết kế các hợp chất ứng viên cho đích cụ thể, đồng thời giảm đáng kể gánh nặng thực nghiệm ướt thông qua tối ưu hóa đa mục tiêu và sàng lọc ảo.

Hướng này một đầu kết nối với các phần mềm hóa học lượng tử (DFT, ab initio), thực nghiệm hoạt tính sinh học, HTS (High-Throughput Screening) và các nguồn dữ liệu khác; đầu kia kết nối với nền tảng Small Molecule Design nội bộ của các công ty dược, SaaS dự đoán tính chất, công cụ thiết kế vật liệu / hóa chất. Dưới đây sẽ triển khai theo ba chiều: **bối cảnh**, **nguyên lý** và **mô hình**.

- **Bối cảnh**
  - Sàng lọc ảo giai đoạn đầu và phát hiện Hit: Đối mặt với thư viện phân tử ảo quy mô hàng triệu đến hàng tỷ, AI nhanh chóng dự đoán hoạt tính / ADMET, xếp hạng phân tử ứng viên, sàng lọc ra một số lượng nhỏ Hit có giá trị cao để đưa vào giai đoạn thực nghiệm.
  - Đánh giá tính chất phân tử và ADMET: Trong giai đoạn tối ưu hóa hợp chất dẫn đầu (Lead Optimization), liên tục dự đoán độ tan, độc tính, độ ổn định chuyển hóa và sinh khả dụng đường uống, cung cấp tham chiếu cho đánh giá dược động học và an toàn.
  - Sinh phân tử hướng đích: Cho trước thông tin đích protein (đặc điểm túi gắn kết, ligand đã biết) hoặc ràng buộc tính chất mục tiêu, tự động sinh ra các phân tử nhỏ ứng viên có cấu trúc đa dạng, hoạt tính cao và có thể tổng hợp được.
  - Thiết kế phân tử vật liệu và hóa chất: Hướng đến các tình huống phi dược phẩm như sơn, dung môi, chất điện giải, chất hoạt động bề mặt, thiết kế phân tử đáp ứng các tính chất vật lý cụ thể (độ nhớt, phân cực, năng lượng bề mặt, v.v.).
- **Nguyên lý**
  - Biểu diễn phân tử và dự đoán tính chất:
    - **Biểu diễn cấu trúc**: Các dạng phổ biến gồm chuỗi SMILES, đồ thị phân tử (nguyên tử là nút, liên kết là cạnh), tọa độ 3D và đặc trưng lượng tử; mô hình cần trích xuất thông tin ngữ nghĩa và hình học có thể tổng quát hóa từ các biểu diễn này.
    - **Dự đoán tính chất**: Thông qua GNN (GCN, GAT, MPNN) hoặc mạng đẳng biến 3D (SchNet, DimeNet, PhysNet, v.v.), học từ đồ thị phân tử hoặc cấu trúc 3D để dự đoán các tính chất lượng tử như năng lượng, moment lưỡng cực, mức năng lượng orbital, cũng như các thuộc tính ADMET như độ tan, LogP, độc tính, độ ổn định chuyển hóa.
    - **Học biểu diễn và tiền huấn luyện**: Thực hiện dự đoán che mặt nạ, học đối chiếu hoặc tiền huấn luyện tự hồi quy trên các thư viện phân tử quy mô lớn (như ZINC, ChEMBL, PubChem), thu được biểu diễn phân tử chung có thể chuyển giao, cung cấp đặc trưng cho QSAR / ADMET ở hạ nguồn.
  - Sinh cấu trúc và tối ưu hóa phân tử:
    - **Mô hình hóa sinh thành**: Sử dụng các mô hình sinh thành VAE, GAN, Flow, Diffusion để lấy mẫu phân tử mới trong không gian SMILES hoặc đồ thị phân tử, yêu cầu đảm bảo tính hợp lệ của cấu trúc hóa học (hóa trị, cấu trúc vòng, v.v.) và tính đa dạng.
    - **Sinh có điều kiện**: Đưa vào vector điều kiện (hoạt tính mục tiêu, tính chất lý hóa, mảnh cấu trúc, mô tả túi gắn kết của đích, v.v.), sinh ra phân tử ứng viên trong ràng buộc cho trước, thực hiện thiết kế hướng tính chất hoặc bổ sung mảnh.
    - **Tối ưu hóa đa mục tiêu và RL**: Thông qua học tăng cường (như MolDQN) thực hiện các thao tác "chỉnh sửa" trong không gian phân tử (thêm nguyên tử, thay đổi liên kết, thay thế mảnh), từ đó cân bằng giữa nhiều mục tiêu như hoạt tính, độc tính, khả năng tổng hợp và tránh bằng sáng chế.
  - Mô hình hóa tương tác protein – phân tử nhỏ:
    - **Vị trí gắn kết và hàm tính điểm**: Mô hình hóa mối quan hệ không gian giữa túi protein và ligand thông qua mạng tích chập 3D / đồ thị / đồ thị tương tác, dự đoán vị trí gắn kết và ái lực gắn kết (Binding Affinity).
    - **Docking và dự đoán Binding Pose**: Kết hợp tìm kiếm cấu hình trong Docking với mô hình sâu, dùng hàm tính điểm sâu hoặc sinh thành kiểu Diffusion để dự đoán cấu hình ổn định, cải thiện độ chính xác docking và giảm chi phí tính toán.
- **Mô hình**
  - Mô hình biểu diễn phân tử:
    - **GNN và mạng 3D**: Các mô hình đẳng biến 3D xét đến góc / khoảng cách như DimeNet / DimeNet++, SchNet, PhysNet; các mạng nơ-ron đồ thị phổ dụng như GCN/GAT/MPNN; phù hợp cho dự đoán tính chất và QSAR.
    - **Transformer dựa trên SMILES**: Coi phân tử như "câu ngôn ngữ hóa học", dùng Transformer thực hiện mô hình hóa ngôn ngữ tự hồi quy hoặc che mặt nạ, cung cấp biểu diễn chuỗi cho sinh thành và dự đoán tính chất.
  - Mô hình sinh thành và tối ưu hóa:
    - Mô hình sinh đồ thị: GraphVAE, Junction Tree VAE, GraphAF sinh phân tử trong không gian đồ thị / mảnh, nhấn mạnh tính hợp lệ cấu trúc và khả năng diễn giải (xây dựng theo mảnh).
    - Mô hình khuếch tán: Diffusion for Molecules sinh phân tử hoặc cấu hình mới bằng cách thêm / loại bỏ nhiễu trong không gian đồ thị hoặc cấu trúc 3D, có thể kết hợp với vector điều kiện để thực hiện sinh thành tùy chỉnh.
    - Tối ưu hóa học tăng cường: Các phương pháp dựa trên RL như MolDQN coi tối ưu hóa phân tử là bài toán quyết định tuần tự trong không gian trạng thái "chỉnh sửa phân tử", dùng hàm phần thưởng mã hóa các chỉ số đa mục tiêu.
  - Mô hình ngôn ngữ lớn về phân tử và hướng đa phương thức:
    - **Mô hình ngôn ngữ phân tử**: ChemBERTa, MolBERT được tiền huấn luyện trên ngữ liệu SMILES quy mô lớn, hỗ trợ chuyển giao zero-shot hoặc few-shot sang các tác vụ hạ nguồn.
    - **Mô hình phân tử đa phương thức**: MoleculeSTM tích hợp cấu trúc (đồ thị / 3D), mô tả văn bản (con đường tổng hợp, tóm tắt tài liệu), thuộc tính phân tử, thực hiện truy xuất xuyên phương thức và dự đoán kết hợp.
  - Hình thức sản phẩm và ứng dụng:
    - Nền tảng sàng lọc thuốc giai đoạn đầu và nền tảng Small Molecule Design nội bộ dành cho công ty dược, cung cấp năng lực tích hợp sàng lọc ảo, sinh phân tử, dự đoán ADMET.
    - SaaS dự đoán tính chất dành cho nhà nghiên cứu phát triển: tra cứu nhanh tính chất phân tử, ADMET, độ tương đồng phân tử qua Web hoặc API.
    - Công cụ thiết kế cấp phân tử dành cho thiết kế vật liệu và hóa chất, dùng cho phát triển tùy chỉnh các hệ phân tử như sơn, dung môi, chất điện giải.

Bắt đầu từ hướng con này, quy trình thiết kế thuốc đang chuyển dịch từ "chuyên gia + thực nghiệm thông lượng cao" sang vòng khép kín "chuyên gia + mô hình + thực nghiệm tự động hóa". AI không chỉ đưa ra điểm số mà dần tham gia vào toàn bộ chu trình từ "đề xuất ý tưởng" đến "sinh ứng viên" rồi đến "sàng lọc và tối ưu hóa".

### 10.1.1 Biểu diễn phân tử và dự đoán tính chất / ADMET

Trong nghiên cứu phát triển thuốc và vật liệu, một năng lực cơ bản là: **cho trước một phân tử, nhanh chóng và chính xác dự đoán tính chất và hành vi của nó**, bao gồm tính chất hóa học lượng tử (năng lượng, orbital, moment lưỡng cực), tính chất lý hóa (độ tan, LogP), cũng như các chỉ số ADMET liên quan đến dược động học / độc tính. Bản chất của vấn đề này là làm thế nào để học được từ các dạng biểu diễn phân tử khác nhau một **biểu diễn vừa phù hợp với quy luật hóa học, vừa có năng lực tổng quát hóa**.

- Ở cấp độ **biểu diễn phân tử**, các dạng biểu diễn phổ biến bao gồm:
  - **Chuỗi SMILES / SELFIES và các dạng tương tự**: Coi phân tử như chuỗi ký tự, tự nhiên phù hợp cho mô hình hóa ngôn ngữ bằng RNN / Transformer.
  - **Biểu diễn đồ thị phân tử**: Nguyên tử là nút, liên kết là cạnh, nút và cạnh mang đặc trưng loại, hóa trị, tính thơm, v.v.; phù hợp cho mô hình hóa lân cận và tô-pô bằng GNN, MPNN.
  - **Biểu diễn hình học 3D**: Tọa độ 3D, góc liên kết, góc nhị diện thu được từ tối ưu hóa hóa học lượng tử hoặc trường lực, cung cấp cơ sở cho mạng đẳng biến E(3) nắm bắt cấu trúc không gian.
- Ở cấp độ **dự đoán tính chất và ADMET**, các tác vụ mục tiêu bao gồm:
  - Dự đoán tính chất lượng tử phân tử nhỏ: năng lượng, moment lưỡng cực, mức năng lượng HOMO/LUMO, v.v., dùng để thay thế các tính toán DFT / ab initio tốn kém.
  - QSAR / dự đoán hoạt tính: xác định hoạt tính (IC50, Ki), tính chọn lọc của hợp chất đối với đích cụ thể, dùng để sàng lọc ứng viên tiềm năng.
  - Các chỉ số ADMET: độ tan, tính thấm, độc tính, độ ổn định chuyển hóa, ức chế CYP, v.v., là chìa khóa đánh giá khả năng thành thuốc.

Con đường mô hình điển hình là: dùng DimeNet / SchNet / PhysNet / GNN trích xuất biểu diễn chiều cao từ cấu trúc phân tử, sau đó qua học đa tác vụ đồng thời dự đoán nhiều tính chất; tiền huấn luyện trên dữ liệu công khai quy mô lớn hoặc dữ liệu nội bộ doanh nghiệp để nâng cao năng lực mô hình hóa trong kịch bản dữ liệu nhỏ. Đầu ra được cung cấp dưới dạng SaaS dự đoán ADMET hoặc API nền tảng nội bộ, mang lại cho nhóm dự án năng lực "thực nghiệm ảo" nhanh chóng.

### 10.1.2 Sinh cấu trúc và tối ưu hóa phân tử: từ SMILES / Graph đến thuốc ứng viên

Sau khi có được mô hình biểu diễn phân tử và dự đoán tính chất đáng tin cậy, mục tiêu tiến xa hơn là **chủ động sinh ra các phân tử "tốt hơn"**: không chỉ đánh giá hợp chất cho trước, mà xoay quanh đích và ràng buộc tính chất để trực tiếp thiết kế các phân tử ứng viên mới. Hướng này thường được gọi là **sinh phân tử và tối ưu hóa phân tử**.

Về **sinh cấu trúc**, nghiên cứu và thực hành kỹ thuật chủ yếu xoay quanh ba con đường:

1. **Sinh chuỗi dựa trên SMILES**
   Coi phân tử như chuỗi ký tự, dùng VAE, GAN hoặc Transformer tự hồi quy lấy mẫu cấu trúc mới trong không gian SMILES; đảm bảo tính hợp lệ hóa học thông qua ràng buộc ngữ pháp (như SELFIES) hoặc xử lý hậu kỳ.
2. **Sinh dựa trên đồ thị / mảnh**
   Các mô hình như GraphVAE, Junction Tree VAE, GraphAF trực tiếp xây dựng cấu trúc ở cấp độ đồ thị phân tử hoặc mảnh cơ sở (Fragment / Motif), gần gũi hơn với tư duy tổng hợp hóa học, thuận lợi cho kiểm soát vòng, nhóm chức và cấu trúc khung.
3. **Sinh dựa trên khuếch tán và 3D**
   Các phương pháp như Diffusion for Molecules thực hiện khuếch tán và khử nhiễu trong không gian đồ thị hoặc tọa độ 3D, có thể xét đồng thời đến cấu hình không gian, phù hợp cho việc sinh ligand hoặc đơn vị vật liệu nhạy cảm với hình dạng 3D.

Về **tối ưu hóa phân tử**, điều then chốt là đưa vào **mục tiêu và ràng buộc**:

- **Sinh có điều kiện**: Đưa hoạt tính mục tiêu, tính chất lý hóa hoặc neo mảnh cấu trúc làm vector điều kiện vào mô hình, khiến quá trình sinh thiên về thỏa mãn các điều kiện này.
- **Học tăng cường và tối ưu hóa đa mục tiêu**: Dùng mô hình dự đoán tính chất làm "môi trường", dùng RL thực hiện quyết định tuần tự trong không gian phân tử (như MolDQN), thiết lập phần thưởng và hình phạt trên nhiều chỉ số đa chiều như hoạt tính, độc tính, khả năng tổng hợp, rủi ro bằng sáng chế, thực hiện cân bằng đa mục tiêu.
- **Khả năng tổng hợp và prior hóa học**: Tích hợp mô hình dự đoán con đường tổng hợp, chỉ số độ phức tạp tổng hợp (như SA score) vào quá trình sinh và tối ưu hóa, tránh tạo ra các cấu trúc khó tổng hợp hoặc không ổn định.

Về sản phẩm hóa, loại mô hình này thường được đóng gói vào "nền tảng thiết kế thuốc AI" nội bộ của công ty dược: cho trước đích, cấu trúc dẫn đầu đã biết và hướng tối ưu hóa, nền tảng tự động đề xuất một số lô phân tử ứng viên, nhóm dự án tiếp tục sàng lọc và lặp dần dựa trên thực nghiệm, bằng sáng chế và cân nhắc thương mại, thực hiện vòng tối ưu hóa khép kín "mô hình–thực nghiệm–mô hình".
## 10.2 Mô Hình Hóa Protein & Cấu Trúc Sinh Học (Protein & Structural Biology)

Trong khoa học sự sống, **cấu trúc quyết định chức năng** là một nguyên tắc gần như giáo điều: protein gấp cuộn thành cấu trúc ba chiều như thế nào, lắp ráp với các phân tử khác thành phức hợp ra sao, trực tiếp quyết định biểu hiện chức năng của chúng trong tế bào. Phân tích cấu trúc truyền thống dựa vào các phương pháp thực nghiệm như tinh thể học X‑ray, NMR, cryo-EM, có chu kỳ dài, chi phí cao và tồn tại vùng mù lớn "khó kết tinh, khó giải mã". Các mô hình deep learning đại diện là AlphaFold đã đẩy mạnh đáng kể năng lực "từ trình tự trực tiếp ra cấu trúc", cho phép thu được cấu trúc chất lượng cao ở quy mô toàn bộ genome.

Hướng này một đầu kết nối với các cơ sở dữ liệu trình tự và cấu trúc như UniProt / PDB, các dự án omics thực nghiệm và structural genomics; đầu kia kết nối với các nền tảng thiết kế và phân tích cấu trúc của ngành dược sinh học, sinh học tổng hợp, kỹ thuật enzyme. Dưới đây cũng triển khai theo ba góc nhìn **tình huống**, **nguyên lý**, **mô hình** và tiếp tục chia nhỏ các hướng con quan trọng.

- **Tình huống**
  - Chú thích và sàng lọc cấu trúc đích: dự đoán cấu trúc lượng lớn protein ở cấp độ genome, hỗ trợ phát hiện đích, chú thích chức năng và phân tích pathway; kết hợp thông tin biến thể để đánh giá cơ chế bệnh sinh tiềm năng.
  - Thiết kế kháng thể / thuốc protein: mô hình hóa và thiết kế chi tiết các vùng quan trọng như vùng biến đổi kháng thể (CDR), domain gắn receptor, tối ưu hóa ái lực, đặc hiệu và tính sinh miễn dịch.
  - Thiết kế enzyme và xúc tác sinh học: dựa trên cấu trúc 3D enzyme và môi trường vị trí hoạt động, thiết kế thư viện đột biến và biến thể, nâng cao hiệu suất xúc tác, phổ cơ chất và độ bền.
  - Nghiên cứu phức hợp và tương tác: dự đoán cấu trúc phức hợp protein–protein, protein–nucleic acid, protein–phân tử nhỏ, giải mã mô hình tương tác bề mặt, cung cấp nền tảng cấu trúc cho thiết kế thuốc và mô hình hóa đường truyền tín hiệu.
  - Phân tích hiệu ứng đột biến và kháng thuốc: đánh giá ảnh hưởng của biến thể tự nhiên hay đột biến nhân tạo đến độ bền cấu trúc, chức năng và gắn kết phối tử, phân tích cơ sở cấu trúc của đột biến kháng thuốc.
- **Nguyên lý**
  - Dự đoán cấu trúc protein:
    - **Trình tự → Cấu trúc**: từ trình tự amino acid (trình tự đơn hoặc kết hợp MSA đa trình tự), mô hình hóa các ràng buộc hình học từng cặp dư lượng (khoảng cách, góc, contact map), rồi tạo cấu trúc 3D toàn nguyên tử qua module tái tạo hình học.
    - **Tín hiệu đồng tiến hóa**: tận dụng mô hình đột biến đồng thời (co‑evolution) giữa các trình tự đồng nguồn để suy luận quan hệ tiếp xúc dư lượng tiềm năng, cung cấp prior mạnh cho ràng buộc gấp cuộn.
    - **Tinh chỉnh cấu trúc và ước lượng độ không chắc chắn**: tinh chỉnh cục bộ cấu trúc dự đoán (relax, repack) và xuất điểm tin cậy (như pLDDT, PAE), hướng dẫn chọn "vùng đáng tin cậy" trong ứng dụng tiếp theo.
  - Mô hình hóa phức hợp và lắp ráp phân tử:
    - **Mô hình hóa đa chuỗi kết hợp**: nhận nhiều chuỗi protein hoặc protein + nucleic acid làm đầu vào, tích hợp nhận diện chuỗi và ràng buộc giao diện, xuất trực tiếp cấu trúc phức hợp hoàn chỉnh.
    - **Dự đoán giao diện và lắp ráp**: dựa trên cấu trúc monomer đã biết, dùng mô hình đồ thị hoặc mô hình khuếch tán để dự đoán cấu hình giao diện và phương thức lắp ráp khả dĩ nhất.
  - Thiết kế protein và dự đoán hiệu ứng đột biến:
    - **Gấp cuộn ngược (Inverse Folding)**: cho trước cấu trúc khung 3D hoặc ràng buộc topo, tạo ra trình tự amino acid có thể gấp cuộn ổn định thành cấu trúc đó, thực hiện thiết kế protein de novo.
    - **Mô hình hóa hiệu ứng đột biến**: kết hợp mô hình ngôn ngữ protein và mô hình cấu trúc, dự đoán ảnh hưởng của đột biến cụ thể lên độ bền (ΔΔG), hoạt tính hoặc ái lực gắn kết, hỗ trợ tiến hóa định hướng và sàng lọc biến thể.
- **Mô hình**
  - Dự đoán cấu trúc:
    - AlphaFold / AlphaFold2 / AlphaFold3: lấy cơ chế attention và module hình học làm cốt lõi, dự đoán cấu trúc protein độ chính xác cao từ MSA, cấu trúc template và đặc trưng trình tự, xuất ước lượng độ không chắc chắn.
    - RoseTTAFold, OpenFold: dùng biểu diễn đa track (sequence / pair / structure) và cơ chế attention đa tỷ lệ, cung cấp triển khai nền tảng cho open source và ứng dụng công nghiệp.
  - Mô hình hóa phức hợp và giao diện:
    - AlphaFold‑Multimer: mô hình hóa trực tiếp cấu trúc phức hợp protein–protein trong kịch bản đa chuỗi, đồng thời xử lý gấp cuộn monomer và tương tác giao diện.
    - RFdiffusion: dùng mô hình khuếch tán để tạo hoặc tối ưu khung protein và giao diện phức hợp trong không gian 3D, thực hiện thiết kế lắp ráp phức tạp và cấu trúc đối xứng.
    - DiffDock và các phương pháp tương tự: trong hệ protein–phân tử nhỏ, dùng khuếch tán hoặc hàm chấm điểm sâu để dự đoán Binding Pose và phương thức gắn kết.
  - Mô hình thiết kế và đột biến:
    - ProteinMPNN: tạo trình tự tương thích cho cấu trúc đã cho, dùng cho thiết kế khung bền vững và giao diện.
    - ESM‑IF, ESMFold / ESM‑2 series: mô hình ngôn ngữ được huấn luyện trước trên trình tự protein quy mô lớn, có khả năng suy luận cấu trúc, chức năng và hiệu ứng đột biến từ trình tự.
  - Sản phẩm và ứng dụng:
    - Dịch vụ dự đoán cấu trúc protein và cơ sở dữ liệu trên public cloud (như AlphaFold DB), cung cấp chú thích cấu trúc quy mô lớn và interface tải về cho nghiên cứu khoa học.
    - Nền tảng thiết kế cấu trúc nội bộ của công ty dược sinh học: tích hợp các module dự đoán cấu trúc protein, thiết kế kháng thể, kỹ thuật enzyme, docking protein–phối tử.
    - SaaS công nghệ sinh học: cung cấp công cụ dự đoán vị trí gắn kết, đánh giá nhiệt động lực học giao diện, đánh giá ái lực và tính sinh miễn dịch, phục vụ phát triển thuốc kháng thể và chế phẩm sinh học.

Từ hướng con này, AI không chỉ đang "đọc hiểu" cấu trúc protein tồn tại trong tự nhiên mà còn đang "sáng tạo" ra các kiến trúc protein và phức hợp hoàn toàn mới, đưa sinh học cấu trúc từ "kỷ nguyên đo lường thụ động" sang "kỷ nguyên thiết kế chủ động".

### 10.2.1 Dự Đoán Cấu Trúc Protein và Lắp Ráp Phức Hợp

Dự đoán cấu trúc protein là một trong những đột phá tiêu biểu nhất của sự kết hợp giữa sinh học cấu trúc và AI. Vấn đề cốt lõi là: **liệu có thể từ trình tự, mà không cần hoặc ít cần dữ liệu thực nghiệm, dự đoán được cấu trúc 3D gần với độ phân giải thực nghiệm không?** Trong ứng dụng thực tế, cấu trúc monomer thường chỉ là điểm khởi đầu; quan trọng hơn là protein lắp ráp với các phân tử khác thành phức hợp như thế nào.

Trong **dự đoán cấu trúc monomer**, quy trình điển hình bao gồm:

1. **Mã hóa trình tự / MSA**: trích xuất đặc trưng trình tự và khai thác tín hiệu đồng tiến hóa qua đa trình tự đối sánh (multiple sequence alignment).
2. **Suy luận ràng buộc hình học**: dự đoán phân phối khoảng cách, xác suất tiếp xúc và hướng tương đối giữa các cặp dư lượng, tạo thành trường hình học dạng "đo giả".
3. **Xây dựng cấu trúc và tinh chỉnh lặp**: dưới ràng buộc hình học, dùng module cấu trúc (như khối bất biến quay-tịnh tiến, cập nhật tọa độ nội) để xây dựng cấu trúc 3D, lặp nhiều vòng refinement để giảm vi phạm hình học.
4. **Đánh giá độ không chắc chắn và chất lượng**: xuất độ tin cậy từng dư lượng (pLDDT), ước lượng sai số từng cặp dư lượng (PAE) và các chỉ số khác, cung cấp tham chiếu cho mô hình hóa và sàng lọc tiếp theo.

Trong **dự đoán phức hợp và lắp ráp**, bài toán mở rộng thêm thành "nhiều chuỗi tổ chức và tương tác với nhau trong không gian như thế nào":

- Với **phức hợp protein–protein**, thường dùng chiến lược mô hình hóa đa chuỗi chuyên dụng (như AlphaFold‑Multimer) để xuất trực tiếp cấu trúc lắp ráp từ đầu vào đa chuỗi.
- Với **hệ protein–nucleic acid / protein–phân tử nhỏ**, một con đường là dự đoán từng cấu trúc riêng rồi dự đoán phương thức lắp ráp qua docking và hàm chấm điểm giao diện; một con đường khác là dùng mô hình khuếch tán hoặc mô hình hóa kết hợp để tạo trực tiếp cấu hình phức hợp trong không gian 3D.
- Trong kịch bản đa tiểu đơn vị, thể lắp ráp lớn, còn cần kết hợp ràng buộc đối xứng, bản đồ mật độ EM độ phân giải thấp và các thông tin khác để thực hiện lắp ráp phân tầng và đa tỷ lệ.

Trong thực tế sản phẩm, dự đoán cấu trúc và lắp ráp thường được đóng gói thành dịch vụ cloud hoặc chuỗi công cụ cục bộ, cung cấp thông tin cấu trúc cơ bản cho chú thích chức năng protein, mô hình hóa mạng tương tác, xác nhận đích thuốc.

### 10.2.2 Thiết Kế Protein và Dự Đoán Hiệu Ứng Đột Biến: Từ Cấu Trúc đến Điều Tiết Chức Năng

Sau khi nắm vững ánh xạ "trình tự → cấu trúc", bước tiếp theo là bài toán ngược: **làm thế nào, trong điều kiện cho trước cấu trúc hoặc yêu cầu chức năng, thiết kế được trình tự protein và phương án đột biến phù hợp?** Đó chính là cốt lõi của thiết kế protein và dự đoán hiệu ứng đột biến.

Trong **thiết kế protein**, các nhiệm vụ chính bao gồm:

- **Gấp cuộn ngược (Inverse Folding)**: cho trước khung (backbone) đích hoặc cấu trúc topo tổng thể, tạo ra trình tự amino acid có thể gấp cuộn ổn định thành cấu trúc đó; quá trình này có thể thực hiện qua các mô hình tạo sinh có điều kiện cấu trúc như ProteinMPNN, ESM‑IF.
- **Thiết kế định hướng chức năng**: trong khi duy trì sự ổn định cấu trúc tổng thể, thiết kế định hướng các vùng vị trí hoạt động, túi gắn kết, vùng giao diện, tối ưu hóa ái lực, đặc hiệu và hiệu suất xúc tác.
- **Ràng buộc khả năng sản xuất và tính sinh miễn dịch**: trong quá trình thiết kế trình tự, tích hợp các ràng buộc về tính khả thi biểu hiện, biến đổi sau dịch mã, rủi ro sinh miễn dịch, đảm bảo khả năng triển khai thực tế của trình tự ứng viên trong phát triển chế phẩm sinh học.

Trong **dự đoán hiệu ứng đột biến**, bạn cần quan tâm đến:

- **Thay đổi độ bền (ΔΔG)**: cho trước cấu trúc wild-type và vị trí đột biến, dự đoán ảnh hưởng của đột biến một điểm hoặc đa điểm lên độ bền gấp cuộn, dùng cho tiến hóa định hướng và phân tích đột biến kháng thuốc.
- **Thay đổi hoạt tính và ái lực**: kết hợp cấu trúc và mô hình ngôn ngữ protein để đánh giá ảnh hưởng của đột biến lên hoạt tính enzyme, ái lực phối tử và điều tiết đường truyền tín hiệu.
- **Thiết kế thư viện biến thể quy mô lớn**: trước khi thực hiện thí nghiệm sàng lọc in vivo / in vitro, dùng mô hình để pre-screen không gian đột biến khổng lồ, giữ lại các biến thể tiềm năng cao, giảm chi phí thực nghiệm.

Ở cấp độ kỹ thuật và sản phẩm, thiết kế protein và dự đoán hiệu ứng đột biến thường được tích hợp thành "module thiết kế và tối ưu cấu trúc" nội bộ của các công ty dược sinh học / sinh học tổng hợp: từ cấu trúc khung ứng viên, tự động đề xuất nhiều vòng phương án đột biến và thiết kế thư viện biến thể, tạo thành vòng lặp dữ liệu khép kín với thí nghiệm sàng lọc thông lượng cao.
## 10.3 Mô Phỏng Vật Lý và Tính Toán Tăng Tốc (Physics Simulation & Surrogate Modeling)

Trong các lĩnh vực hàng không vũ trụ, ô tô, kỹ thuật dân dụng, năng lượng, hóa chất, **mô phỏng độ chính xác cao là khâu cốt lõi trong thiết kế và kiểm chứng**. Tuy nhiên CFD (Computational Fluid Dynamics), FEA (Finite Element Analysis), Molecular Dynamics (MD) và các bài toán giải PDE thường rất tốn kém về tính toán, khó hỗ trợ quét tham số quy mô lớn, điều khiển thời gian thực hoặc tối ưu hóa trực tuyến. Mô phỏng vật lý và surrogate modeling dựa trên AI cố gắng dùng mạng sâu để xấp xỉ bộ giải số hoặc toán tử, nhằm đạt được tăng tốc vài bậc độ lớn trong khi vẫn đảm bảo tính nhất quán vật lý và khả năng giải thích.

Hướng này một đầu kết nối với phần mềm mô phỏng truyền thống (ANSYS, Fluent, COMSOL, bộ giải tự phát triển), dữ liệu đo lường thực nghiệm và cảm biến; đầu kia kết nối với nền tảng thiết kế kỹ thuật, thiết kế khí động học cho xe tự lái và hàng không vũ trụ, mô phỏng và tối ưu hóa quy trình hóa học. Dưới đây trình bày theo ba góc độ: **kịch bản**, **nguyên lý**, **mô hình**.

- **Kịch bản**
  - Tăng tốc mô phỏng kỹ thuật: Với hình học và điều kiện vận hành cho trước, dùng deep surrogate model để nhanh chóng dự đoán trường áp suất, trường vận tốc, trường nhiệt độ, phân bố ứng suất / biến dạng, hỗ trợ nhiều vòng lặp thiết kế và tối ưu hóa.
  - Mô phỏng quy trình phức tạp và tối ưu hóa công nghệ: Trong công nghiệp hóa chất, năng lượng, dùng ML xấp xỉ mô hình cơ chế hoặc mô hình hộp đen, thực hiện đánh giá nhanh và điều khiển thời gian thực.
  - Mô phỏng ở quy mô phân tử / vật liệu: Dùng ML potential (Neural Network Potential) thay thế tính toán thế năng và lực ab initio chi phí cao, tăng tốc mô phỏng động lực học phân tử và hành vi pha vật liệu.
  - Đa tỉ lệ và ghép nối đa ngành: Dùng deep surrogate model nối các mô hình vi mô–trung mô–vĩ mô lại với nhau, xây dựng chuỗi mô phỏng và tối ưu hóa đa tỉ lệ đầu cuối.
- **Nguyên lý**
  - Surrogate Models (Mô hình thay thế / đại diện):
    - Học ánh xạ "tham số đầu vào → trường đầu ra / chỉ số" từ dữ liệu mô phỏng số hoặc thực nghiệm, làm xấp xỉ cho bộ giải độ chính xác cao.
    - Trong không gian tham số đa chiều, kết hợp active learning và Bayesian optimization, tự động chọn các điểm mẫu có nhiều thông tin nhất để thực hiện mô phỏng hoặc thực nghiệm độ chính xác cao, liên tục cải thiện chất lượng surrogate model.
  - Physics-Informed Neural Networks (PINN):
    - Đưa PDE, điều kiện ban đầu / biên và các định luật bảo toàn vật lý vào hàm mất mát, dùng kỹ thuật automatic differentiation để giải trường vật lý trên không gian liên tục.
    - Hỗ trợ bài toán thuận (giải trường trạng thái) và bài toán ngược (từ quan sát thưa suy ngược nguồn, tham số vật liệu...), đặc biệt phù hợp với hình học và biên phức tạp mà phương pháp số truyền thống khó xử lý.
  - Operator Learning và Neural Operator:
    - Không chỉ khớp "nghiệm trong điều kiện cụ thể" mà học ánh xạ từ hàm đến hàm (toán tử), như "điều kiện biên / nguồn → toàn bộ trường nghiệm".
    - Các phương pháp tiêu biểu như Fourier Neural Operator (FNO), DeepONet, thông qua biến đổi miền tần số hoặc kiến trúc mạng đặc biệt, nâng cao khả năng tổng quát hóa trên các mật độ lưới và hình dạng hình học khác nhau.
  - Mô hình đa tỉ lệ:
    - Huấn luyện các tham số hiệu dụng hoặc quan hệ cấu thành ở tầng trung mô / vĩ mô trên dữ liệu mô phỏng vi mô, deep surrogate model đóng vai trò "lớp cầu nối tỉ lệ".
    - Với các bài toán vật liệu phức tạp, ghép nối lưu thể–cấu trúc và dòng đa pha, dùng deep model truyền thông tin giữa các tỉ lệ và mô đun vật lý khác nhau.
- **Mô hình**
  - Mạng nơ-ron vật lý đa năng:
    - Họ PINN: Giải bằng cách tối thiểu hóa phần dư PDE trên các điểm lấy mẫu trong miền không–thời gian, áp dụng cho các phương trình Navier‑Stokes, Maxwell, đàn hồi học...
    - DeepONet, FNO, họ Neural Operator: Trực tiếp học xấp xỉ "cấp toán tử" của bộ giải PDE, suy luận nhanh trên nhiều điều kiện vận hành và nhiều hình học.
  - Mô hình thế năng ở quy mô phân tử / vật liệu:
    - DeepMD, SchNet, NequIP, SpookyNet...: Xây dựng ML potential bề mặt độ chính xác cao, tăng tốc đáng kể tính toán lực và năng lượng với độ chính xác gần ab initio.
    - Ghép nối với các engine MD truyền thống, thực hiện động lực học phân tử độ chính xác cao cho hệ lớn, thang thời gian dài.
  - Surrogate model CFD / cơ học kết cấu:
    - Mạng Encoder‑Decoder U‑Net / UNet++: Dự đoán trường dòng chảy hoặc trường nhiệt độ từ hình học / điều kiện biên trên lưới đều.
    - Graph Neural Network on Mesh: Truyền thông và cập nhật nút / phần tử trên lưới phi cấu trúc, phù hợp với hình học phức tạp và ghép nối đa trường vật lý.
    - Neural Operator for CFD: Tổng quát hóa dự đoán trường dòng chảy trên các số Reynolds, điều kiện dòng vào và tham số hình học khác nhau.
  - Sản phẩm và ứng dụng:
    - Module AI tăng tốc trong phần mềm mô phỏng công nghiệp: Cung cấp chức năng ước tính nhanh và phân tích độ nhạy bên ngoài bộ giải truyền thống.
    - Nền tảng mô phỏng và tối ưu hóa quy trình hóa chất / năng lượng: Kết hợp mô hình cơ chế + surrogate model + thuật toán tối ưu thành công cụ tối ưu hóa quy trình tích hợp.
    - Thiết kế khí động học cho xe tự lái / hàng không vũ trụ: Quét biến thiết kế quy mô lớn và tối ưu hóa hình dạng tự động trong thiết kế ngoại hình khí động.

### 10.3.1 Surrogate Model và Physics-Informed Neural Networks (PINN)

**Surrogate Models** và **Physics-Informed Neural Networks (PINN)** là hai con đường bổ sung cho nhau trong việc AI hóa mô phỏng vật lý: cái trước xuất phát từ dữ liệu để xấp xỉ ánh xạ mô phỏng, cái sau xuất phát từ vật lý để xây dựng mục tiêu học.

Trong kịch bản **surrogate model**, quy trình điển hình là:

1. Thu thập một tập dữ liệu mẫu qua mô phỏng số độ chính xác cao hoặc thực nghiệm (tham số đầu vào, điều kiện biên, hình học → đại lượng vật lý đầu ra).
2. Huấn luyện mạng sâu (như MLP, mạng tích chập, GNN, Neural Operator) xấp xỉ hàm ánh xạ này.
3. Trong tối ưu hóa thiết kế, quét tham số hoặc điều khiển thời gian thực, dùng surrogate model thay thế bộ giải đắt tiền để đánh giá nhanh.

Trong kịch bản **PINN**, mô hình không còn chủ yếu dựa vào nhãn giám sát số lượng lớn, mà xây dựng hàm mất mát bằng cách tối thiểu hóa phần dư PDE và vi phạm điều kiện biên:

- Tại các điểm lấy mẫu trong không gian / thời gian, dùng đầu ra mạng nơ-ron là đại lượng vật lý (như vận tốc, áp suất, trường dịch chuyển...), dùng automatic differentiation để tính gradient và đạo hàm.
- Thay các đạo hàm này vào PDE để tạo phần dư, cùng với sai số điều kiện biên và điều kiện ban đầu tạo thành tổng mất mát.
- Tối ưu hóa để phần dư PDE và sai số biên tiến về 0, từ đó thu được nghiệm xấp xỉ thỏa mãn phương trình vật lý.

Hai cách tiếp cận có thể kết hợp: khi có một phần dữ liệu độ chính xác cao, dùng sai số dữ liệu + phần dư vật lý cùng ràng buộc quá trình huấn luyện, nâng cao độ chính xác và khả năng tổng quát hóa. Trong ứng dụng kỹ thuật, PINN đặc biệt phù hợp xử lý bài toán ngược và mô hình hóa dựa trên dữ liệu, như suy ngược tham số vật liệu, nguồn hoặc vị trí khuyết tật từ quan sát cảm biến.

### 10.3.2 Neural Operator và Mô Hình Vật Lý Đa Tỉ Lệ

**Neural Operator** nâng việc mô hình hóa vật lý từ mức "điểm–điểm / tham số–nghiệm" lên mức "hàm–hàm": nó học xấp xỉ toán tử thống nhất của "cho một lớp PDE và điều kiện biên, giải trường nghiệm của chúng", thay vì nghiệm cụ thể trong một điều kiện vận hành đơn lẻ. Điều này mở ra khả năng tổng quát hóa mới trên nhiều điều kiện vận hành, nhiều hình học và độ phân giải lưới khác nhau.

Trong **operator learning**, cách làm điển hình là:

- Dùng hàm (như nguồn, điều kiện biên, trường tham số vật liệu...) làm đầu vào, dùng mạng (như FNO, DeepONet) xuất ra toàn bộ hàm trường nghiệm.
- Thông qua huấn luyện trên các mẫu với lưới khác nhau, tham số khác nhau và hình học khác nhau, cho mô hình học được "mẫu chung" của bộ giải PDE.
- Khi triển khai, chỉ cần cung cấp hàm đầu vào mới (như điều kiện biên mới, hình học mới), có thể nhanh chóng suy luận ra trường nghiệm xấp xỉ.

Trong kịch bản **mô hình hóa đa tỉ lệ**:

- Huấn luyện Neural Operator trên lượng lớn dữ liệu sinh ra ở tỉ lệ vi mô (như động lực học phân tử, tính dẻo tinh thể), học ánh xạ giữa cấu trúc vi mô và phản ứng vĩ mô.
- Trong mô hình môi trường liên tục vĩ mô, dùng ánh xạ này làm mô đun tính quan hệ cấu thành hoặc tham số hiệu dụng, thực hiện ghép nối vi–vĩ mô.
- Với các hệ phức tạp như ghép nối lưu thể–cấu trúc, dòng đa pha, dòng phản ứng, có thể mô hình hóa riêng từng trường vật lý và ghép nối qua các biến giao diện dùng chung (như thông lượng, lực giao diện...).

Trong thực tiễn kỹ thuật, Neural Operator đang dần chuyển từ nguyên mẫu nghiên cứu sang ứng dụng, trở thành hướng kỹ thuật quan trọng "bộ giải tăng tốc + cầu nối đa tỉ lệ" trong các kịch bản CFD, địa vật lý, mô hình hóa khí hậu.
## 10.4 Khám Phá Vật Liệu và Thiết Kế Tinh Thể (Materials Science & Crystal Design)

Trong khoa học vật liệu, một mâu thuẫn cốt lõi là: **không gian thiết kế gần như vô hạn, trong khi chi phí thực nghiệm và tính toán độ chính xác cao cực kỳ tốn kém**. Làm thế nào để tìm kiếm hiệu quả các vật liệu ứng cử viên đáp ứng yêu cầu hiệu năng cụ thể trong không gian tổ hợp hóa học và cấu trúc khổng lồ là vấn đề then chốt trong các lĩnh vực năng lượng mới, điện tử, vật liệu kết cấu và vật liệu chức năng. Khám phá vật liệu và thiết kế tinh thể được dẫn dắt bởi AI, thông qua mạng nơ-ron đồ thị, mô hình sinh và sàng lọc ảo thông lượng cao, dần chuyển hóa nghiên cứu phát triển từ kiểu "thử và sai" sang "dữ liệu dẫn dắt + thiết kế ngược".

Hướng này một đầu kết nối với các cơ sở dữ liệu vật liệu như Materials Project, OQMD, AFLOW và kết quả tính toán DFT/MD, đầu kia kết nối với các nền tảng nghiên cứu phát triển vật liệu cho các ứng dụng pin, quang điện, xúc tác, bán dẫn, hợp kim, v.v. Dưới đây trình bày theo ba góc độ: **tình huống ứng dụng**, **nguyên lý** và **mô hình**.

- **Tình huống ứng dụng**
  - Sàng lọc vật liệu định hướng hiệu năng: Cho trước cấu trúc tinh thể hoặc công thức hóa học, dự đoán cấu trúc vùng năng lượng, vùng cấm, độ linh động hạt tải, tính chất nhiệt/điện/từ, v.v., cung cấp cơ sở cho sàng lọc và tối ưu hóa tổ hợp vật liệu.
  - Nghiên cứu phát triển vật liệu năng lượng mới: Hướng đến các hệ chất điện phân pin, vật liệu điện cực, chất dẫn ion rắn, lớp hấp thụ quang điện và xúc tác, dự đoán độ dẫn ion, độ ổn định, cửa sổ điện hóa và hoạt tính.
  - Sàng lọc ảo thông lượng cao (HTVS): Trong thư viện ứng cử viên quy mô lớn được xây dựng, sử dụng mô hình ML đánh giá nhanh, lọc ra các vật liệu tiềm năng, sau đó dùng một số lượng nhỏ DFT/thực nghiệm để xác nhận và hiệu chỉnh.
  - Thiết kế ngược cấu trúc tinh thể và thành phần: Xuất phát từ tính chất mục tiêu, tìm kiếm ngược tổ hợp cấu trúc tinh thể/thành phần thỏa mãn các ràng buộc hiệu năng và quy trình.
- **Nguyên lý**
  - Biểu diễn vật liệu và tinh thể:
    - Biểu diễn cấu trúc tinh thể tuần hoàn dưới dạng đồ thị tinh thể (Crystal Graph): nút là nguyên tử, cạnh là quan hệ lân cận giữa các nguyên tử, kết hợp thông tin tham số mạng và nhóm không gian.
    - Đối với vật liệu vô định hình hoặc đa pha phức tạp, có thể dùng bộ mô tả môi trường cục bộ (như SOAP), đặc trưng Voronoi hoặc cấu trúc đồ thị đa tỷ lệ để biểu diễn vi cấu trúc.
  - Dự đoán tính chất:
    - Thực hiện tích chập/truyền thông điệp trên đồ thị tinh thể với các mô hình GNN như CGCNN, MEGNet, ALIGNN để dự đoán năng lượng, vùng cấm, môđun đàn hồi, độ dẫn nhiệt, v.v.
    - Sử dụng embedding dựa trên tài liệu và công thức hóa học như Mat2Vec để thực hiện học chuyển giao và ước tính zero-shot trong tình huống ít dữ liệu.
  - Sàng lọc ảo thông lượng cao:
    - Xây dựng thư viện ứng cử viên (qua liệt kê tổ hợp, sinh cấu trúc, quy tắc kinh nghiệm, v.v.) → sử dụng mô hình ML dự đoán nhanh tính chất → lọc ra một số Top ứng cử viên để thực hiện DFT hoặc xác nhận thực nghiệm → cập nhật mô hình và chiến lược sàng lọc, tạo thành vòng lặp học chủ động.
  - Sinh và thiết kế ngược:
    - Sử dụng mô hình khuếch tán, VAE hoặc mô hình sinh GNN để lấy mẫu cấu trúc mới trong không gian cấu trúc tinh thể, có thể áp đặt các ràng buộc về thành phần, nhóm không gian, mật độ, v.v.
    - Kết hợp mô hình thay thế và tối ưu hóa Bayes, tìm kiếm tổ hợp cấu trúc/thành phần phù hợp xuất phát từ tính chất mục tiêu, thực hiện inverse design.
- **Mô hình**
  - Biểu diễn và dự đoán:
    - CGCNN (Crystal Graph Convolutional Neural Network): Thực hiện tích chập trên đồ thị tinh thể, dùng để dự đoán tính chất vật liệu vô cơ như năng lượng, vùng cấm.
    - MEGNet, ALIGNN: Tích hợp cấu trúc đồ thị với thông tin cạnh/góc, có khả năng tổng quát hóa và độ chính xác tốt hơn trên nhiều họ vật liệu.
    - Mat2Vec + ML nhẹ: Thông qua vector hóa công thức hóa học và thông tin nguyên tố, huấn luyện nhanh các mô hình nhỏ cho dự đoán tính chất cụ thể.
  - Sinh và thiết kế ngược:
    - Diffusion for Crystals: Thực hiện khuếch tán/khử nhiễu trong không gian chiều cao gồm tham số mạng và vị trí nguyên tử, tạo ra cấu trúc tinh thể thỏa mãn một số ràng buộc nhất định.
    - GNN‑based Generative Models: Thông qua việc thêm/sửa đổi nguyên tử và liên kết từng bước hoặc thao tác mạng tinh thể, thực hiện tìm kiếm cấu trúc từ khởi tạo ngẫu nhiên đến gần tính chất mục tiêu.
    - Surrogate + Bayesian Optimization: Dùng mô hình ML làm hộp đen xấp xỉ "cấu trúc → tính chất", thực hiện tối ưu hóa Bayes trên đó để tìm cấu trúc hoặc thành phần tối ưu.
  - Nền tảng dữ liệu và chuỗi công cụ:
    - Materials Project, OQMD, AFLOW: Cung cấp lượng lớn dữ liệu cấu trúc và tính toán DFT, là nền tảng để huấn luyện và đánh giá các mô hình ML vật liệu.
    - Cơ sở dữ liệu vật liệu và mô hình nội bộ doanh nghiệp: Kết hợp dữ liệu thực nghiệm và thông tin quy trình của công ty, xây dựng nền tảng thiết kế AI vật liệu chuyên biệt theo lĩnh vực.
  - Sản phẩm và ứng dụng:
    - Nền tảng tăng tốc nghiên cứu phát triển vật liệu năng lượng mới: Cung cấp khả năng dự đoán tính chất tích hợp, HTVS và inverse design cho các nhóm pin, điện xúc tác, quang điện.
    - Phần mềm sàng lọc ảo và SaaS: Cung cấp công cụ sàng lọc số hóa cho hợp kim, bán dẫn, gốm chức năng, giảm chi phí thử sai ở giai đoạn đầu.
    - Công cụ thiết kế AI nội bộ của các công ty vật liệu: Kết nối với hệ thống quản lý thông tin phòng thí nghiệm (LIMS) và dữ liệu dây chuyền sản xuất, tạo thành vòng lặp khép kín từ "mô hình → thực nghiệm → sản xuất".

### 10.4.1 Dự Đoán Tính Chất Vật Liệu và Sàng Lọc Ảo Thông Lượng Cao (HTVS)

Trong quy trình nghiên cứu phát triển vật liệu, **dự đoán tính chất nhanh và đáng tin cậy** là một năng lực nền tảng: cho trước một cấu trúc hoặc thành phần ứng cử viên, liệu có thể đánh giá sơ bộ xem nó có đáng để khám phá sâu hơn mà không cần thực hiện DFT/thực nghiệm tốn kém hay không. Các mô hình dự đoán tính chất dựa trên GNN và cơ sở dữ liệu vật liệu đã tạo ra khả năng cho sàng lọc ảo thông lượng cao.

Ở tầng **dự đoán tính chất**:

- Sử dụng biểu diễn đồ thị tinh thể cho cấu trúc tuần hoàn, học tương tác giữa nguyên tử và vùng lân cận thông qua các mô hình CGCNN, MEGNet, ALIGNN.
- Thực hiện huấn luyện đơn nhiệm vụ hoặc đa nhiệm vụ cho các bài toán khác nhau (năng lượng, vùng cấm, hằng số đàn hồi, độ dẫn nhiệt, điện dẫn, từ tính, v.v.), đạt hiệu năng dự đoán gần với độ chính xác DFT trên các tập dữ liệu như Materials Project.
- Trong tình huống công nghiệp, thường kết hợp dữ liệu thực nghiệm nội bộ để huấn luyện lại hoặc thích ứng miền, nhằm nâng cao khả năng thích nghi với họ vật liệu và điều kiện quy trình cụ thể.

Trong tình huống **sàng lọc ảo thông lượng cao (HTVS)**, quy trình điển hình là:

1. Xây dựng thư viện ứng cử viên quy mô lớn (liệt kê tổ hợp, sinh cấu trúc hoặc mở rộng từ cơ sở dữ liệu hiện có).
2. Sử dụng mô hình ML dự đoán nhanh tính chất mục tiêu và tính chất phụ trợ của mỗi ứng cử viên (độ ổn định, an toàn, các chỉ số liên quan đến chi phí, v.v.).
3. Sắp xếp thứ hạng theo tính chất mục tiêu và điều kiện đa ràng buộc, chọn ra Top‑K ứng cử viên để thực hiện tính toán DFT độ trung thực cao hoặc xác nhận thực nghiệm.
4. Đưa kết quả xác nhận phản hồi về mô hình, cập nhật tham số và ước tính độ không chắc chắn, tạo thành vòng lặp học chủ động "sàng lọc–xác nhận–sàng lọc lại".

Quy trình làm việc này đã đi vào giai đoạn thực dụng trong nhiều lĩnh vực như vật liệu pin, lớp hấp thụ quang điện, xúc tác và vật liệu kết cấu, trở thành "động cơ sàng lọc tiền kỳ" cho các nhóm nghiên cứu phát triển vật liệu.

### 10.4.2 Sinh Tinh Thể và Thiết Kế Ngược: Từ Tính Chất Mục Tiêu đến Cấu Trúc Ứng Cử Viên

Sau khi có được khả năng dự đoán tính chất đáng tin cậy và HTVS, mục tiêu xa hơn là **trực tiếp xuất phát từ tính chất mục tiêu và các ràng buộc, đề xuất cấu trúc tinh thể và thành phần ứng cử viên mới**, tức là thiết kế ngược và sinh vật liệu.

Trong **sinh tinh thể**, các vấn đề then chốt bao gồm:

- Làm thế nào để tạo ra mạng tinh thể và sắp xếp nguyên tử hợp lý về mặt vật lý dưới các ràng buộc tuần hoàn?
- Làm thế nào để áp đặt tường minh hoặc ẩn các ràng buộc về thành phần, đối xứng và mật độ trong quá trình sinh?
- Làm thế nào để đảm bảo cấu trúc được sinh ra vẫn ổn định sau khi qua quá trình thư giãn đơn giản?

Vì vậy, nghiên cứu và thực hành kỹ thuật thường áp dụng:

- **Diffusion for Crystals**: Thêm/loại bỏ nhiễu trong không gian kết hợp của tham số mạng + vị trí nguyên tử, thực hiện sinh dần từ khởi tạo ngẫu nhiên đến mẫu cấu trúc, có thể tích hợp tính chất mục tiêu và ràng buộc thành phần vào quá trình nhiễu hoặc vector điều kiện.
- **GNN‑based Generative Models**: Thêm dần nguyên tử và quan hệ liên kết trên cấu trúc đồ thị, hoặc chỉnh sửa cấu trúc hiện có, sinh ra cấu trúc ứng cử viên thỏa mãn ràng buộc.

Trong **thiết kế ngược**, thường kết hợp với mô hình thay thế và phương pháp tối ưu hóa:

- Coi mô hình dự đoán tính chất như một hàm hộp đen "cấu trúc → tính chất".
- Thông qua tối ưu hóa Bayes, thuật toán tiến hóa hoặc RL để khám phá trong không gian cấu trúc, khiến tính chất dự đoán dần tiếp cận giá trị mục tiêu, đồng thời thỏa mãn các ràng buộc về độ ổn định, an toàn, chi phí.
- Thực hiện xác nhận DFT/thực nghiệm cho các cấu trúc ứng cử viên tìm được, và sử dụng kết quả để cập nhật mô hình thay thế và chiến lược tìm kiếm.

Trong ứng dụng kỹ thuật, mô-đun thiết kế ngược thường được tích hợp vào nền tảng AI vật liệu, cung cấp cho bạn giao diện tương tác "thiết lập tính chất mục tiêu → hệ thống tự động đề xuất cấu trúc ứng cử viên", nâng cao đáng kể hiệu quả khám phá vật liệu mới.
## 10.5 Toán học và Lý luận Ký hiệu (Mathematics & Symbolic Reasoning)

Toán học là ngôn ngữ được hình thức hóa cao độ và có thể xác minh chính xác, điều này khiến nó vừa mang thuộc tính "độ khó cực cao" vừa có "tiềm năng lợi nhuận cực lớn" trong kỷ nguyên AI. Một mặt, việc chứng minh các định lý phức tạp và lý luận bậc cao đặt ra yêu cầu rất cao đối với năng lực mô hình; mặt khác, kết quả của lý luận toán học và tính toán ký hiệu có thể được xác minh nghiêm ngặt, phù hợp tự nhiên để phối hợp với các công cụ lập trình. Mục tiêu của AI trong lĩnh vực toán học và lý luận ký hiệu là xây dựng các mô hình có khả năng **thực hiện lý luận và tính toán đáng tin cậy** trong các hệ thống hình thức, đồng thời tích hợp chúng vào các ứng dụng giáo dục, nghiên cứu khoa học và kỹ thuật.

Lĩnh vực này một đầu kết nối với các bộ chứng minh định lý tương tác như Lean / Coq / Isabelle, các hệ thống đại số máy tính (CAS) như SymPy / Mathematica / Maple, cùng các kho bài toán và ngữ liệu tài liệu toán học quy mô lớn; đầu còn lại kết nối với các sản phẩm giáo dục toán học, công cụ hỗ trợ nghiên cứu và nhu cầu suy diễn công thức cũng như phân tích rủi ro trong các lĩnh vực kỹ thuật / tài chính. Dưới đây là phân tích theo ba góc độ: **Tình huống**, **Nguyên lý** và **Mô hình**.

- **Tình huống**
  - Chứng minh định lý tự động và hỗ trợ chứng minh: Tự động đưa ra bằng chứng định lý trong hệ thống hình thức, hoặc tạo ra bản thảo chứng minh có thể đọc được để con người xem xét và hoàn thiện thêm.
  - Thao tác biểu thức và tính toán ký hiệu: Tự động hóa rút gọn biểu thức, đạo hàm, tích phân, khai triển chuỗi, biến đổi và giải phương trình, cung cấp các công cụ ký hiệu cho mô hình hóa kỹ thuật và phân tích rủi ro tài chính.
  - Hiểu bài toán toán học và tạo ra các bước giải: Trích xuất biểu diễn có cấu trúc từ các bài toán trong ngôn ngữ tự nhiên hoặc hình ảnh, đưa ra các bước giải nghiêm ngặt và có thể kiểm tra, phục vụ các tình huống giáo dục và huấn luyện.
  - Tăng cường năng lực lý luận toán học: Thông qua fine-tuning chuyên biệt về toán học và tăng cường công cụ, nâng cao khả năng lý luận đa bước và tính nghiêm ngặt của LLM trong các lĩnh vực số học, đại số, hình học, tổ hợp.
- **Nguyên lý**
  - Hệ thống hình thức và tìm kiếm:
    - Trong các hệ thống như Lean / Coq / Isabelle, các đối tượng và định lý toán học được hình thức hóa thành các hạng và kiểu, quá trình chứng minh tương ứng với việc xây dựng cây chứng minh dưới ràng buộc quy tắc.
    - Tìm kiếm chứng minh có thể được xem như "tìm đường đi thỏa mãn ràng buộc trong không gian trạng thái cực lớn", phù hợp để áp dụng reinforcement learning, MCTS (Monte Carlo Tree Search) và các phương pháp mạng chính sách / mạng giá trị.
  - Phối hợp thần kinh – ký hiệu:
    - LLM chịu trách nhiệm trích xuất cấu trúc vấn đề và tư duy giải quyết từ ngôn ngữ tự nhiên hoặc đầu vào phi cấu trúc, dịch chúng thành biểu diễn ký hiệu (như mã SymPy, script chứng minh Lean).
    - Hệ thống đại số máy tính và bộ chứng minh định lý chịu trách nhiệm thực thi tính toán ký hiệu nghiêm ngặt và xác minh hình thức, kiểm tra và sửa lỗi đầu ra của LLM.
  - Nâng cao năng lực lý luận toán học:
    - Thông qua pre-training hoặc fine-tuning chuyên biệt trên văn bản toán học và kho bài toán quy mô lớn (như Minerva, Gödel), nâng cao khả năng hiểu ngôn ngữ toán học và nắm vững phong cách lý luận của mô hình.
    - Áp dụng framework Tool‑Augmented LLM, sử dụng bộ giải ký hiệu, thư viện tính toán số, công cụ vẽ đồ thị và bộ chứng minh như các công cụ bên ngoài, giúp mô hình học cách "gọi công cụ" thay vì "học thuộc lòng kết quả" trong lý luận phức tạp.
- **Mô hình**
  - Chứng minh định lý tự động:
    - Bộ chứng minh theo kiểu AlphaZero: Xem quá trình chứng minh như một trò chơi, sử dụng mạng chính sách và mạng giá trị để hướng dẫn tìm kiếm, dần dần xây dựng chứng minh hình thức.
    - GPT‑f, Lean‑Dojo và các công trình tương tự: Được huấn luyện trên ngữ liệu định lý và chứng minh hình thức quy mô lớn, dùng để tự động tạo ra chứng minh trong các hệ thống như Lean.
  - LLM toán học lớn và tăng cường công cụ:
    - Minerva, Gödel và các mô hình tương tự: Các LLM được fine-tuning trên ngữ liệu sách giáo khoa toán học, bài báo, kho bài toán, thể hiện mạnh hơn trong các bài toán chứng minh, bài thi đấu và các nhiệm vụ lý luận bậc cao.
    - LLM + SymPy / Mathematica / Lean / Coq: LLM đảm nhiệm phân tích vấn đề và lập kế hoạch chiến lược, gọi các công cụ tính toán ký hiệu và chứng minh để thực hiện thao tác chính xác và xác minh.
  - Sản phẩm và ứng dụng:
    - "Trợ lý toán học / Trợ lý giải bài" trong các sản phẩm giáo dục, cung cấp giải thích cá nhân hóa và nhiều con đường giải pháp.
    - Công cụ hỗ trợ nghiên cứu: Giúp các nhà nghiên cứu xây dựng giả thuyết, tạo bản thảo chứng minh, tìm kiếm các định lý và bổ đề liên quan, thúc đẩy quá trình khám phá lý thuyết.
    - Suy diễn công thức và phân tích mô hình rủi ro trong lĩnh vực kỹ thuật / tài chính: Hình thức hóa các mô hình phức tạp, thực hiện phân tích độ nhạy cảm ký hiệu và kiểm tra tuân thủ.

### 10.5.1 Chứng minh Định lý Tự động và Lý luận Hình thức

**Chứng minh định lý tự động (ATP) và chứng minh định lý tương tác (ITP)** là hướng quan trọng giao thoa giữa toán học và khoa học máy tính. Nhiệm vụ cốt lõi của việc AI tham gia vào lĩnh vực này là tự động xây dựng hoặc hỗ trợ xây dựng chứng minh trong hệ thống hình thức, giảm bớt gánh nặng của con người ở các chi tiết cấp thấp, để họ tập trung hơn vào tư duy cấp cao.

Trong **hệ thống hình thức**:

- Định lý được mã hóa như một kiểu mục tiêu (goal) cần xây dựng, chứng minh tương ứng với việc xây dựng một hạng sao cho kiểu của nó là kiểu mục tiêu đó.
- Quá trình chứng minh được tạo thành từ một chuỗi các chiến thuật (tactics) hoặc các bước suy luận, mỗi bước tiến hành theo các quy tắc logic nghiêm ngặt.

AI có thể đảm nhận nhiều vai trò trong đó:

1. **Lựa chọn chiến thuật và đề xuất tham số**: Trong trạng thái chứng minh hiện tại, dự đoán chiến thuật tiếp theo cần sử dụng và các tham số của nó, giảm thiểu thử nghiệm thủ công và quay lui.
2. **Truy xuất bổ đề và định lý**: Truy xuất các bổ đề / định lý liên quan nhất đến mục tiêu hiện tại từ thư viện rộng lớn, thu hẹp không gian tìm kiếm.
3. **Tạo chứng minh đầu-cuối**: Khi có định lý và ngữ cảnh, trực tiếp tạo ra script chứng minh hoàn chỉnh hoặc một phần, sau đó bộ chứng minh xác minh tính đúng đắn của nó.

Các công trình như bộ chứng minh theo kiểu AlphaZero, GPT‑f, Lean‑Dojo, thông qua huấn luyện mạng chính sách và mạng giá trị hoặc mô hình ngôn ngữ trên ngữ liệu hình thức quy mô lớn, đã đạt được khả năng tự động hoàn thành chứng minh một tỷ lệ đáng kể các định lý trên các hệ thống như Lean / Coq. Về hướng sản phẩm, loại khả năng này có triển vọng phát triển thành "trợ lý xác minh hình thức", được sử dụng để xác minh phần mềm / phần cứng, phân tích giao thức mật mã và thiết kế hệ thống độ tin cậy cao.

### 10.5.2 Tính toán Ký hiệu và Giải Bài toán Toán học: LLM + CAS

So với chứng minh định lý, **tính toán ký hiệu và giải bài toán toán học** gần gũi hơn với các tình huống kỹ thuật và giáo dục. Mục tiêu của nó là: **Từ bài toán ngôn ngữ tự nhiên, tự động xây dựng biểu thức ký hiệu, thực thi tính toán và đưa ra các bước giải có thể giải thích được**.

Theo hướng này, quy trình phối hợp thần kinh – ký hiệu điển hình là:

1. **Hiểu và trừu tượng hóa vấn đề**: LLM phân tích bài toán trong ngôn ngữ tự nhiên hoặc hình ảnh thành biểu diễn toán học có cấu trúc (phương trình, ràng buộc, hàm mục tiêu, v.v.).
2. **Tạo biểu thức ký hiệu**: Dịch kết quả trừu tượng thành mã CAS (như biểu thức SymPy, lệnh Mathematica).
3. **Gọi \*\***CAS\*\* **để thực thi**: Sử dụng CAS thực hiện các phép tính đại số chính xác, đạo hàm, tích phân, giải hệ phương trình, giới hạn, v.v.
4. **Giải thích kết quả và tạo các bước**: LLM dựa trên kết quả tính toán của CAS, tạo ra các bước giải và giải thích phù hợp với thói quen của con người.

Mô hình này có một số ưu điểm then chốt:

- Đảm bảo tính đúng đắn của tính toán thông qua CAS, tránh "tính toán lệch" và lỗi tích lũy của LLM trên các biểu thức dài.
- Cung cấp hiểu ngôn ngữ tự nhiên và biểu đạt thông qua LLM, hạ thấp ngưỡng sử dụng CAS, cho phép người dùng không chuyên cũng có thể gọi các công cụ ký hiệu mạnh mẽ.
- Trong các tình huống giáo dục, có thể kiểm soát mức độ chi tiết và phong cách giải bài, tạo ra các giải thích phù hợp với các giai đoạn học tập khác nhau.

Trong các tình huống kỹ thuật / tài chính, khả năng này có thể mở rộng sang hình thức hóa và phân tích các mô hình phức tạp: tự động trích xuất cấu trúc mô hình từ tài liệu và code, xây dựng biểu diễn ký hiệu, và thực hiện phân tích độ nhạy cảm, phân tích trường hợp biên và nhận diện rủi ro.
## 10.6 Quy Trình Khoa Học & Tự Động Hóa Thí Nghiệm (Scientific Workflow & Lab Automation)

Các hướng nhỏ trước đây hầu hết tập trung vào "năng lực đơn điểm": dự đoán một tính chất, tạo ra một cấu trúc, chứng minh một định lý. Tuy nhiên trong nghiên cứu khoa học và phát triển công nghiệp thực tế, điều quan trọng hơn là làm thế nào để **kết nối các năng lực này thành** **quy trình** hoàn chỉnh, và tích hợp với cơ sở dữ liệu tài liệu, nền tảng mô phỏng và thiết bị thí nghiệm tự động. Hướng Scientific Workflow & Lab Automation nhằm xây dựng hệ thống tích hợp **Agent + Công cụ + Robot** hướng đến các tình huống khoa học, giúp AI tiến hóa từ "biết tính toán" sang "biết làm thí nghiệm, biết nghiên cứu".

Hướng này một đầu kết nối với cơ sở dữ liệu tài liệu và bằng sáng chế (như PubMed, arXiv), kho dữ liệu khoa học, đồ thị tri thức lĩnh vực và nền tảng mô phỏng; đầu còn lại kết nối với phòng thí nghiệm tự động hóa (Robotic Lab), thiết bị sàng lọc thông lượng cao và hệ thống quản lý quy trình nghiên cứu. Dưới đây sẽ trình bày từ ba góc độ: **Tình huống**, **Nguyên lý** và **Mô hình**.

- **Tình huống**
  - Khai thác tài liệu khoa học & xây dựng kho tri thức: Tự động trích xuất thông tin về hợp chất, protein, vật liệu, điều kiện phản ứng, kết quả thí nghiệm từ lượng lớn tài liệu, xây dựng kho tri thức có cấu trúc và đồ thị tri thức.
  - Thiết kế thí nghiệm & Self‑Driving Lab: Dưới sự hướng dẫn của kế hoạch thí nghiệm do AI đề xuất, nền tảng thí nghiệm robot tự động thực hiện pha chế, phản ứng, đo lường và thu thập dữ liệu, thực hiện tối ưu hóa "vòng lặp kín".
  - Quản lý dữ liệu khoa học & đảm bảo tái hiện: Tự động sắp xếp dữ liệu mô phỏng và thí nghiệm, metadata và script code, tạo hồ sơ và báo cáo thí nghiệm tiêu chuẩn hóa, nâng cao khả năng truy vết và tái hiện.
  - "Trợ lý thí nghiệm AI" trong lĩnh vực: Cung cấp hỗ trợ toàn diện về tìm kiếm tài liệu, thiết kế phương án, lập kế hoạch thí nghiệm và phân tích kết quả cho các công ty dược phẩm, công ty vật liệu và tổ chức nghiên cứu.
- **Nguyên lý**
  - Khai thác tài liệu & LLM lĩnh vực:
    - Sử dụng các mô hình pre-trained lĩnh vực như SciBERT, BioBERT, PubMedBERT để nhận dạng thực thể có tên, trích xuất quan hệ, phân tích phương trình phản ứng và trích xuất điều kiện thí nghiệm.
    - Trên cơ sở đó huấn luyện các LLM lĩnh vực như Bio‑LM, Chem‑LM, Materials‑LM, nâng cao khả năng hiểu và suy luận về thuật ngữ chuyên môn, câu lệnh thí nghiệm và giả định ẩn.
  - Thiết kế thí nghiệm & Self‑Driving Lab:
    - Coi không gian thí nghiệm (công thức, nhiệt độ, thời gian, thứ tự thêm vào, v.v.) là biến tối ưu hóa, dùng LLM + RL hoặc chiến lược Bayesian Optimization để đề xuất tập điều kiện thí nghiệm tiếp theo.
    - Robot thí nghiệm và thiết bị thực thi theo kế hoạch, thu thập dữ liệu và truyền về theo thời gian thực, mô hình cập nhật tham số và ước tính độ không chắc chắn, tạo thành vòng lặp học tích cực.
  - Điều phối quy trình & Agent:
    - Trong framework Agent & Tool Use, tích hợp đồng bộ các công cụ tìm kiếm tài liệu, tạo code, gọi mô phỏng, phân tích dữ liệu, trực quan hóa và tạo báo cáo.
    - Agent dựa vào mục tiêu nhiệm vụ (ví dụ: "tìm công thức chất điện phân dẫn điện cao"), tự động lập kế hoạch phân rã nhiệm vụ, thứ tự gọi công cụ và tích hợp kết quả.
- **Mô hình**
  - Mô hình khai thác tài liệu & tri thức:
    - SciBERT, BioBERT, PubMedBERT, v.v.: Các mô hình được pre-trained trên tài liệu khoa học và y sinh, dùng cho trích xuất thực thể/quan hệ, phân loại và hỏi đáp.
    - Galactica, LLM chuyên biệt lĩnh vực: Huấn luyện chủ yếu trên ngữ liệu khoa học, hỗ trợ tạo bài tổng quan, bản thảo code, đề xuất thiết kế thí nghiệm, v.v.
  - Mô hình lập kế hoạch & kiểm soát thí nghiệm:
    - LLM + RL / Bayesian Optimization: Kết hợp prior lĩnh vực, độ không chắc chắn của mô hình và chi phí thí nghiệm, khám phá và khai thác không gian thí nghiệm một cách hiệu quả.
    - Agent tích hợp với interface điều khiển Robotic Lab: Chuyển đổi mô tả thí nghiệm bằng ngôn ngữ tự nhiên thành các bước thí nghiệm có cấu trúc và lệnh điều khiển thiết bị.
  - Hệ thống Scientific Agent & quy trình:
    - Trên nền tảng năng lực Agent & Tool Use ở chương 7, xây dựng "Agent đa công cụ" hướng đến tình huống khoa học: có thể tìm kiếm tài liệu, tạo code, gọi mô phỏng, xử lý dữ liệu, vẽ biểu đồ và viết bản thảo báo cáo.
  - Sản phẩm & Ứng dụng:
    - "Trợ lý thí nghiệm AI" và bàn thí nghiệm tự động hóa nội bộ của công ty dược phẩm/công ty vật liệu: Dùng để đẩy nhanh phát triển công thức, tối ưu hóa quy trình và sàng lọc ứng viên.
    - Công cụ tìm kiếm khoa học lĩnh vực và đồ thị tri thức (Bio / Chem / Materials / Physics Knowledge Graph): Hỗ trợ tìm kiếm ngữ nghĩa, khám phá tương tác và suy luận tri thức.
    - Nền tảng quản lý quy trình nghiên cứu: Tích hợp lập kế hoạch thí nghiệm, ghi chép dữ liệu, quản lý phiên bản, trực quan hóa và tự động tạo báo cáo, nâng cao hiệu quả đội nghiên cứu và khả năng tái hiện kết quả.

### 10.6.1 Khai Thác Tài Liệu Khoa Học & Xây Dựng Kho Tri Thức Lĩnh Vực

Phần lớn tri thức khoa học xuất hiện đầu tiên dưới dạng tài liệu và báo cáo. Để AI thực sự tham gia vào nghiên cứu khoa học, bạn phải giúp nó "đọc hiểu tài liệu và trích xuất tri thức có cấu trúc từ đó". **Khai thác tài liệu khoa học & xây dựng kho tri thức** chính là xuất phát từ văn bản phi cấu trúc, xây dựng hạ tầng tri thức có thể truy vấn và suy luận được.

Trong hướng này, các nhiệm vụ cốt lõi bao gồm:

- **Nhận dạng thực thể & chuẩn hóa**: Nhận dạng các thực thể như hợp chất, protein, vật liệu, chất phản ứng, sản phẩm, thiết bị thí nghiệm và điều kiện trong tài liệu, đồng thời căn chỉnh với các cơ sở dữ liệu tiêu chuẩn (như ChEMBL, Uniprot, Materials Project).
- **Trích xuất quan hệ & sự kiện**: Trích xuất từ văn bản các quan hệ và sự kiện như "ai tương tác với ai như thế nào", "trong điều kiện nào tạo ra kết quả gì", ví dụ phương trình phản ứng, quan hệ công thức–hiệu suất, v.v.
- **Xây dựng** **đồ thị tri thức**: Tổ chức thực thể và quan hệ thành cấu trúc đồ thị, hỗ trợ truy vấn phức tạp (như "tất cả các phương pháp đã được báo cáo để cải thiện một tính chất nào đó trong một điều kiện nhất định") và suy luận đường dẫn.

Để đạt được các mục tiêu trên, thường sử dụng:

- Các mô hình pre-trained như SciBERT, BioBERT, PubMedBERT để thực hiện NER (nhận dạng thực thể), RE (trích xuất quan hệ) và trích xuất sự kiện cấp tài liệu.
- Trên cơ sở đó xây dựng LLM chuyên biệt lĩnh vực (Bio‑LM, Chem‑LM, Materials‑LM), dùng cho hỏi đáp phức tạp hơn, tạo bài tổng quan và bổ sung tri thức.

Kho tri thức lĩnh vực và đồ thị tri thức được xây dựng không chỉ có thể cung cấp dịch vụ tìm kiếm và khuyến nghị thông minh hơn cho người làm nghiên cứu phát triển, mà còn cung cấp dữ liệu và prior cho thiết kế thí nghiệm, thiết kế ngược vật liệu/thuốc phía sau.

### 10.6.2 Self‑Driving Lab & Scientific Workflow Agent: Từ "Đọc Tài Liệu" Đến "Làm Thí Nghiệm"

Sau khi có năng lực khai thác tài liệu, mô hình hóa và tối ưu hóa, bước tiếp theo là kết hợp các năng lực này với **nền tảng thí nghiệm tự động hóa**, xây dựng **Self‑Driving Lab (phòng thí nghiệm tự vận hành)** và Scientific Workflow Agent thực sự.

Trong Self‑Driving Lab, vòng lặp công việc điển hình là:

1. **Đặt mục tiêu**: Nhà nghiên cứu đưa ra mục tiêu vĩ mô (như "nâng cao độ dẫn điện của một vật liệu trong điều kiện cụ thể") và các ràng buộc (chi phí, an toàn, giới hạn quy trình, v.v.).
2. **Tìm kiếm tài liệu & tri thức**: Agent gọi tìm kiếm tài liệu và đồ thị tri thức, tìm hiểu công việc hiện có và quy luật kinh nghiệm, hình thành giả thuyết ban đầu và không gian thiết kế thí nghiệm.
3. **Lập kế hoạch thí nghiệm & chiến lược tối ưu hóa**: Dựa trên LLM + RL / Bayesian Optimization, đề xuất tập điều kiện thí nghiệm đầu tiên (công thức, nhiệt độ, thời gian, môi trường, v.v.).
4. **Robot thực thi & thu thập dữ liệu**: Bàn thí nghiệm tự động hóa (Robotic Lab) thực hiện thí nghiệm, thu thập kết quả theo thời gian thực và truyền về.
5. **Cập nhật mô hình & thiết kế vòng tiếp theo**: Mô hình proxy cập nhật tham số và ước tính độ không chắc chắn dựa trên dữ liệu mới, rồi đề xuất điều kiện thí nghiệm có nhiều thông tin hơn hoặc tiềm năng hơn cho vòng tiếp theo.

Trong **Scientific** **Workflow** **Agent** theo nghĩa rộng hơn, vòng lặp này mở rộng sang các khâu mô phỏng, phân tích dữ liệu và tạo báo cáo:

- Agent có thể tự động tạo code mô phỏng hoặc gọi công cụ mô phỏng có sẵn để đánh giá trước một số điều kiện thí nghiệm;
- Trong giai đoạn phân tích dữ liệu, tự động hoàn thành làm sạch dữ liệu, trực quan hóa và kiểm định thống kê;
- Khi tổng kết giai đoạn dự án, tạo hồ sơ thí nghiệm có cấu trúc và bản thảo báo cáo kèm biểu đồ và tài liệu tham khảo.

Về hình thức sản phẩm, các hệ thống loại này thường triển khai dưới dạng nền tảng: cung cấp một bộ giao diện và API thống nhất, kết nối với thư viện tài liệu, công cụ mô phỏng và thiết bị thí nghiệm, cho phép các nhà khoa học và kỹ sư đặt mục tiêu ở cấp cao bằng ngôn ngữ tự nhiên và giao diện trực quan, còn các khâu còn lại do Agent + chuỗi công cụ tự động điều phối và thực thi.

Từ hướng nhỏ này, vai trò của AI trong khoa học thực sự chuyển từ "công cụ phân tích offline" sang "cộng tác viên nghiên cứu trực tuyến": không chỉ đọc tài liệu, viết code, tính toán mô hình, mà còn cùng với robot hoàn thành từng thí nghiệm và khám phá thực sự.

# 11. Năng Lực Nền Tảng & Kỹ Thuật (MLOps / Infra)

Để đưa mô hình ngôn ngữ lớn từ phòng thí nghiệm vào sản xuất doanh nghiệp, chỉ "mô hình đủ tốt" thôi là chưa đủ, mà phải dựa vào một **hệ thống nền tảng và kỹ thuật** ổn định, có thể mở rộng và vận hành được. Hệ thống này cần xuyên suốt các khâu **huấn luyện & fine-tuning mô hình, triển khai & tối ưu hóa suy luận, vận hành dữ liệu & mô hình, giám sát & quản lý chi phí, bảo mật & tuân thủ, cũng như năng lực hỗ trợ trung tâm & ứng dụng**, kết nối các điểm kỹ thuật vốn rời rạc thành một vòng lặp kín có thể vận hành bền vững.

Nhìn từ góc độ kinh doanh, năng lực nền tảng và kỹ thuật thường quyết định liệu một tổ chức có thể "sử dụng mô hình ngôn ngữ lớn một cách có quy mô, an toàn và chi phí thấp" hay không: cùng một mô hình nền tảng, nếu không có hệ thống MLOps tốt, rất có thể chỉ dừng lại ở giai đoạn Demo và thí điểm; nhưng một khi có nền tảng hoàn thiện, doanh nghiệp có thể nhanh chóng nhân rộng và phát triển ứng dụng chất lượng cao trên nhiều BU, nhiều quốc gia/khu vực, nhiều tình huống ngành nghề. Dưới đây chúng ta sẽ trình bày lần lượt từ sáu hướng: **nền tảng huấn luyện & fine-tuning mô hình, triển khai & tối ưu hóa suy luận, vận hành dữ liệu & mô hình, giám sát & độ tin cậy chi phí, hạ tầng bảo mật & tuân thủ, và năng lực ứng dụng & trung tâm thượng tầng**.
## 11.1 Huấn luyện & Tinh chỉnh Mô hình (Training & Fine-tuning)

Ở tầng mô hình nền tảng, phần lớn các tổ chức không tự huấn luyện mô hình hàng trăm tỷ tham số từ đầu, mà thay vào đó thực hiện **tiếp tục tiền huấn luyện + tinh chỉnh** dựa trên các mô hình nền tảng mã nguồn mở hoặc thương mại. Vấn đề cốt lõi ở tầng này là: làm thế nào để sử dụng hiệu quả tài nguyên tính toán và dữ liệu, "kéo gần" mô hình đa năng vào các ngành, doanh nghiệp và tác vụ cụ thể, đồng thời đảm bảo khả năng quản lý kỹ thuật đối với nhiều mô hình và nhiều phiên bản.

Nhìn từ góc độ kỹ thuật, tầng này thường bao gồm ba phần: **tiền huấn luyện và tiếp tục tiền huấn luyện**, **các mô hình tinh chỉnh và chuỗi công cụ**, cùng **hạ tầng huấn luyện phân tán quy mô lớn**.

- **Tình huống ứng dụng**
  - Nghiên cứu phát triển mô hình nền tảng đa năng: các nhà cung cấp cloud / tập đoàn lớn tự phát triển mô hình nền tảng ngôn ngữ đa năng / đa phương thức, phục vụ API đối ngoại và chia sẻ nội bộ cho nhiều nghiệp vụ.
  - Mô hình lớn theo ngành và mô hình chuyên biệt: xây dựng mô hình nền tảng theo ngành hoặc "mô hình lớn sở hữu riêng của doanh nghiệp" xoay quanh các lĩnh vực cụ thể như tài chính, y tế, pháp lý, sản xuất, năng lượng, game.
  - Tùy chỉnh mô hình cấp doanh nghiệp: tinh chỉnh mô hình chuyên biệt hoặc trọng số LoRA dựa trên dữ liệu nội bộ cho từng khách hàng lớn (ngân hàng, bảo hiểm, chính phủ, tập đoàn sản xuất).
  - Thị trường mô hình đa thuê bao: nền tảng SaaS / cloud cung cấp khả năng tinh chỉnh và lưu trữ "một khách hàng một mô hình" cho nhiều khách hàng vừa và nhỏ, mỗi thuê bao có một bộ trọng số hoặc lớp thích nghi riêng.
  - Nền tảng tinh chỉnh một chạm: sản phẩm quản lý toàn diện mở cho các nhóm phi thuật toán với quy trình "tải dữ liệu lên → chọn mô hình nền tảng → tự động tinh chỉnh → triển khai một chạm".
- **Nguyên lý**
  - Tiền huấn luyện và tiếp tục tiền huấn luyện:
    - Thực hiện tiền huấn luyện quy mô lớn trên văn bản đa năng, code, và dữ liệu đa phương thức khối lượng lớn, giúp mô hình đạt được **khả năng hiểu ngôn ngữ đa năng, tri thức thế giới và năng lực suy luận cơ bản**.
    - Đối với các ngành cụ thể, áp dụng **Domain-adaptive Pretraining (DAPT)** để tiếp tục tiền huấn luyện trên mô hình đa năng, đưa vào thuật ngữ chuyên ngành, phong cách viết và phân phối tri thức của ngành.
    - Tiền huấn luyện đa ngôn ngữ / đa phương thức thông qua không gian ngữ nghĩa dùng chung và huấn luyện kết hợp, giúp mô hình có khả năng **chuyển giao liên ngôn ngữ** và **tích hợp hình ảnh-văn bản / giọng nói / dữ liệu có cấu trúc**.
  - Các mô hình tinh chỉnh:
    - **Tinh chỉnh toàn tham số**: khi phân phối tác vụ mục tiêu khác xa tiền huấn luyện, và có đủ tài nguyên tính toán cũng như dữ liệu, cập nhật trực tiếp toàn bộ tham số để đạt hiệu suất tối đa.
    - **Tinh chỉnh hiệu quả tham số (PEFT)**: thông qua Adapter, LoRA / QLoRA, Prefix / P-Tuning và các phương pháp khác, chỉ huấn luyện một lượng rất nhỏ "tham số tăng thêm", phù hợp với các tình huống đa tác vụ, đa khách hàng, cập nhật thường xuyên.
    - **Tinh chỉnh theo chỉ thị và theo tác vụ**: sử dụng định dạng "chỉ thị + ví dụ" để mô hình học cách hiểu mô tả tác vụ bằng ngôn ngữ tự nhiên; có thể nhắm vào một tác vụ dọc đơn lẻ hoặc đảm nhiệm nhiều tác vụ trên cùng một mô hình thống nhất.
    - **RLHF / RLAIF**: huấn luyện mô hình phần thưởng thông qua phản hồi từ con người hoặc AI, sau đó dùng học tăng cường để căn chỉnh hành vi mô hình (tính lịch sự, an toàn, chiến lược từ chối trả lời, giá trị quan).
  - Huấn luyện phân tán và hệ thống kỹ thuật:
    - Sử dụng các chiến lược **song song dữ liệu, song song mô hình, song song pipeline, song song tensor** để phân tách mô hình cực lớn và dữ liệu quy mô lớn ra nhiều node, nhiều GPU trong cụm để huấn luyện phối hợp.
    - Áp dụng các kỹ thuật như ZeRO / FSDP để **giảm mức sử dụng bộ nhớ GPU, nâng cao thông lượng huấn luyện**, kết hợp lập lịch hiệu quả (Kubernetes + Slurm / Ray) để thực hiện huấn luyện cụm quy mô lớn.
    - Dựa vào pipeline dữ liệu chuẩn hóa (tải dataset, làm sạch, loại bỏ trùng lặp, phân mảnh, cache) và các framework tinh chỉnh (Transformers Trainer, DeepSpeed, Lightning, v.v.) để giảm thiểu việc làm lại từ đầu.
- **Công cụ & Mô hình**
  - Chuỗi công cụ tiền huấn luyện và tiếp tục tiền huấn luyện:
    - Framework huấn luyện: PyTorch, TensorFlow, JAX.
    - Tăng tốc huấn luyện quy mô lớn: DeepSpeed, Megatron-LM, Colossal-AI, Fairscale.
    - Chiến lược huấn luyện phân tán: song song dữ liệu (DP), song song mô hình (MP), song song pipeline (PP), song song tensor; ZeRO / FSDP, Megatron (TP+PP), DeepSpeed ZeRO.
    - Lập lịch và quản lý cụm: Kubernetes + Slurm / Ray / Horovod / TorchElastic.
    - Pipeline dữ liệu: Hugging Face Datasets, WebDataset, Petastorm, tf.data, Arrow; object storage (S3 / OSS / GCS) + local cache; công cụ làm sạch và loại bỏ trùng lặp dữ liệu.
  - Công cụ tinh chỉnh và PEFT:
    - Framework tinh chỉnh: Hugging Face Transformers + Trainer / Accelerate, PyTorch Lightning, DeepSpeed, Colossal-AI.
    - Bộ công cụ PEFT: PEFT (LoRA / QLoRA / Prefix Tuning / Prompt Tuning, v.v.), LLaMA-Adapter và các chuỗi công cụ LoRA đa dạng.
    - Xây dựng chỉ thị và dữ liệu: Self-Instruct, pipeline phong cách Alpaca / Dolly, các công cụ tăng cường dữ liệu và viết lại hội thoại.
  - Chuỗi công cụ RLHF / RLAIF:
    - TRL (Transformers Reinforcement Learning), trlx, DeepSpeed-RLHF, pipeline RLHF tự phát triển.
    - Huấn luyện mô hình phần thưởng, mô hình xếp hạng / chấm điểm, mẫu chiến lược từ chối trả lời và căn chỉnh hành vi.

Về hình thức sản phẩm, tầng này thường thể hiện dưới dạng: **nền tảng phát triển mô hình nền tảng, dịch vụ "đào tạo hộ + tùy chỉnh" cấp doanh nghiệp, nền tảng tinh chỉnh một chạm và thị trường mô hình (Model Hub / Model Store)**, hỗ trợ lộ trình sản xuất hóa từ "mô hình đa năng" đến "nghìn doanh nghiệp nghìn mô hình".

### 11.1.1 Tiền huấn luyện và tiếp tục tiền huấn luyện: từ năng lực đa năng đến mô hình nền tảng theo ngành

Tiền huấn luyện là "công trình nguồn" cho năng lực của các mô hình lớn hiện đại: thông qua học tự giám sát trên lượng lớn văn bản chưa được gán nhãn, code và dữ liệu đa phương thức, mô hình dần dần đạt được khả năng mô hình hóa ngôn ngữ, tri thức thế giới, suy luận cơ bản và học biểu diễn. Trên nền tảng đó, tiếp tục tiền huấn luyện (đặc biệt là **Domain-adaptive Pretraining, DAPT**) đảm nhiệm nhiệm vụ "kéo mô hình về phía một lĩnh vực dọc cụ thể".

Trong giai đoạn **tiền huấn luyện đa năng**, các điểm cốt lõi cần quan tâm bao gồm:

1. **Quy mô và tính đa dạng của ngữ liệu**: kết hợp văn bản web, sách, code, hội thoại, nội dung đa ngôn ngữ cũng như dữ liệu đa phương thức như cặp hình ảnh-văn bản, bao phủ càng rộng càng tốt về tri thức và hình thức biểu đạt.
2. **Mục tiêu huấn luyện và kết hợp đa tác vụ**: ngoài mô hình hóa ngôn ngữ tự hồi quy kinh điển, đôi khi bổ sung thêm các mục tiêu như điền vào chỗ trống, dự đoán câu tiếp theo, học tương phản, căn chỉnh hình ảnh-văn bản, nhằm nâng cao khả năng căn chỉnh ngữ nghĩa và hiểu đa phương thức của mô hình.
3. **Đa ngôn ngữ và căn chỉnh**: thông qua từ điển dùng chung hoặc mã hóa subword, cùng ngữ liệu song song liên ngôn ngữ hoặc tác vụ căn chỉnh, mô hình hóa các ngôn ngữ khác nhau trong không gian vector thống nhất, thực hiện **chuyển giao liên ngôn ngữ và dịch thuật**.

Trong giai đoạn **tiếp tục tiền huấn luyện theo ngành (DAPT)**, trọng tâm chuyển sang:

1. **Xây dựng ngữ liệu theo ngành**: xây dựng ngữ liệu chuyên biệt từ các nguồn như hồ sơ y tế và hướng dẫn lâm sàng, bản án và văn bản pháp lý, báo cáo tài chính và dữ liệu giao dịch, tài liệu thiết kế sản xuất / năng lượng / game.
2. **Thích nghi phong cách và thuật ngữ**: thông qua tiếp tục tiền huấn luyện trên lượng lớn ngữ liệu trong ngành, giúp mô hình tự nhiên nắm bắt thuật ngữ chuyên ngành, cách diễn đạt cố định, phong cách viết chuyên nghiệp và tri thức tiềm ẩn (như thói quen diễn đạt lâm sàng, ngôn ngữ pháp lý).
3. **Tiêm tri thức độc quyền cấp doanh nghiệp**: đối với các doanh nghiệp hoặc tổ chức lớn, có thể bổ sung thêm tài liệu nội bộ, cơ sở tri thức, nhật ký phiếu công việc ngoài ngữ liệu đa năng + ngành, huấn luyện "mô hình lớn độc quyền doanh nghiệp" làm nền tảng thông minh thống nhất.

Trong thực tiễn kỹ thuật, tiền huấn luyện và tiếp tục tiền huấn luyện sẽ phối hợp với các framework phân tán quy mô lớn (Megatron-LM, DeepSpeed ZeRO, v.v.) cũng như pipeline dữ liệu hiệu quả (WebDataset / HF Datasets + object storage) để vận hành, tạo thành **pipeline huấn luyện ổn định và có thể tái sử dụng**. Đối với các nhà cung cấp cloud hoặc tập đoàn lớn, pipeline này thường được đóng gói thành nền tảng nội bộ, hỗ trợ tiền huấn luyện tăng dần theo chu kỳ và lặp lại song song nhiều mô hình nền tảng theo ngành.

### 11.1.2 Các mô hình tinh chỉnh và RLHF: từ "biết nói" đến "hiểu nghiệp vụ, giữ ranh giới"

Sau khi có mô hình nền tảng mạnh mẽ, làm thế nào để mô hình "có ích cho nghiệp vụ" và "hành vi có thể kiểm soát" — điều then chốt nằm ở giai đoạn tinh chỉnh và căn chỉnh. Điều này bao gồm cả tinh chỉnh có giám sát (SFT) theo nghĩa truyền thống, lẫn tinh chỉnh theo chỉ thị, tinh chỉnh đa tác vụ và học tăng cường dựa trên phản hồi (RLHF / RLAIF).

Ở tầng **các mô hình tinh chỉnh**, có thể phân chia đại khái thành:

1. **Tinh chỉnh toàn tham số (Full Fine-tuning)**
   Trong các tình huống phân phối tác vụ khác xa tiền huấn luyện, hoặc có yêu cầu cứng về hiệu suất tối ưu và đủ tài nguyên tính toán (ví dụ như mô hình ngôn ngữ lập trình cụ thể, mô hình hội thoại theo ngôn ngữ / ngành cụ thể), việc cập nhật trực tiếp toàn bộ tham số có thể đạt giới hạn hiệu suất tối đa. Tuy nhiên chi phí cao, quản lý phiên bản phức tạp, thường chỉ áp dụng cho một số ít mô hình lõi.
2. **Tinh chỉnh hiệu quả tham số (PEFT)**
   Thông qua các phương pháp Adapter, LoRA / QLoRA, Prefix / P-Tuning, chỉ huấn luyện "các tham số tăng thêm nhỏ" được chèn vào hoặc phần tăng hạng thấp của trọng số, trong khi trọng số mô hình lớn gốc được giữ nguyên (frozen). Điều này mang lại ba lợi thế kỹ thuật:
   1. Đa tác vụ / đa khách hàng có thể dùng chung một mô hình nền tảng, chỉ cần chuyển đổi các trọng số Adapter / LoRA khác nhau.
   2. Giảm đáng kể yêu cầu bộ nhớ GPU và tài nguyên tính toán, hỗ trợ hoàn thành tinh chỉnh trong môi trường cụm GPU vừa và nhỏ hoặc đơn máy.
   3. Cập nhật thường xuyên, rollback đơn giản, thuận tiện cho thử nghiệm nhanh và thực nghiệm A/B.
3. **Tinh chỉnh theo chỉ thị và theo tác vụ**
   1. **Tinh chỉnh theo chỉ thị (Instruction Tuning)**: thông qua các mẫu "chỉ thị ngôn ngữ tự nhiên + đầu vào + đầu ra kỳ vọng", giúp mô hình học cách hiểu các dạng chỉ thị như "giúp tôi…", "hãy giải thích…", từ đó thoát khỏi các template cố định theo tác vụ.
   2. **Tinh chỉnh đơn tác vụ**: ví dụ chỉ tinh chỉnh cho hỏi đáp dịch vụ khách hàng, hoàn thiện code, tư vấn pháp lý, tối đa hóa hiệu suất tác vụ đó.
   3. **Tinh chỉnh đa tác vụ**: đảm nhiệm nhiều loại tác vụ đồng thời trên một mô hình thống nhất (hỏi đáp, tóm tắt, dịch thuật, code, tạo lý do gợi ý, v.v.), nâng cao tính đa năng của mô hình và tỷ lệ sử dụng tài nguyên.

Ở tầng **căn chỉnh hành vi và an toàn**, **RLHF / RLAIF** đóng vai trò then chốt:

1. **Huấn luyện mô hình phần thưởng (Reward Model)**: thu thập sở thích của con người hoặc AI đối với nhiều câu trả lời ứng viên của mô hình (xếp hạng / chấm điểm), huấn luyện một mô hình phần thưởng có thể đánh giá "chất lượng câu trả lời".
2. **Tối ưu mô hình nền tảng bằng học tăng cường (như PPO)**: dưới sự hướng dẫn của mô hình phần thưởng, điều chỉnh tham số mô hình thông qua học tăng cường để phù hợp hơn với sở thích của con người và giá trị quan của nền tảng, ví dụ:
3. Lịch sự, trung lập, chuyên nghiệp hơn;
4. Từ chối hoặc viết lại an toàn đối với các yêu cầu nguy hiểm, vi phạm, liên quan đến quyền riêng tư;
5. Khi có sự không chắc chắn, thể hiện sự không chắc chắn thay vì bịa đặt sự thật.
6. **RLAIF và căn chỉnh tự giám sát**: trong một số tình huống, sử dụng mô hình nền tảng mạnh làm người phản hồi, hoặc kết hợp quy tắc và đánh giá tự động, để căn chỉnh bán tự động quá trình tinh chỉnh, giảm chi phí gán nhãn thủ công.

Về chuỗi công cụ, các framework như Hugging Face Transformers + PEFT, TRL / trlx, DeepSpeed-RLHF đã cơ bản hình thành **quy trình làm việc công nghiệp chuẩn** từ SFT → huấn luyện RM → RLHF. Về mặt định nghĩa sản phẩm, tầng này điển hình được triển khai dưới dạng: **dịch vụ tùy chỉnh / đào tạo hộ mô hình, nền tảng tinh chỉnh một chạm, thị trường mô hình đa thuê bao và nền tảng kỹ thuật mô hình lớn chuyên biệt theo ngành / doanh nghiệp**.
## 11.2 Triển Khai Mô Hình và Suy Luận (Serving & Optimization)

Sau khi huấn luyện xong mô hình lớn, cách cung cấp dịch vụ suy luận theo hướng **khả dụng cao**, **độ trễ thấp**, **có thể mở rộng và tiết kiệm chi phí** là trụ cột thứ hai của hệ thống AI engineering. Tầng triển khai và suy luận một đầu kết nối với cụm tính toán GPU/NPU, đầu còn lại kết nối với API gateway, ứng dụng doanh nghiệp và nền tảng mở bên ngoài. Trách nhiệm cốt lõi bao gồm: **thiết kế kiến trúc triển khai, chiến lược định tuyến mô hình, tối ưu hóa hiệu năng suy luận và tận dụng phần cứng**.

Nhìn tổng thể, tầng này cần giải quyết ba vấn đề: **dùng kiến trúc nào để phục vụ ra bên ngoài**, **làm sao để suy luận nhanh hơn và rẻ hơn**, **làm sao duy trì tính khả dụng cao và khả năng quản trị trong môi trường đa mô hình, đa vùng địa lý, đa tenant**.

- **Tình huống áp dụng**
  - AI trung tâm nội bộ doanh nghiệp / Model Service Bus: cung cấp thống nhất API mô hình lớn cho các đơn vị kinh doanh, che giấu sự khác biệt về mô hình và phần cứng bên dưới.
  - Cloud API mở ra bên ngoài: cung cấp giao diện suy luận chuẩn hóa cho các nhà phát triển bên ngoài và đối tác hệ sinh thái, hỗ trợ lựa chọn đa mô hình và quản lý phiên bản.
  - Nghiệp vụ online QPS cao: trợ lý chăm sóc khách hàng, tìm kiếm, gợi ý, trợ lý văn phòng và các tình huống có yêu cầu cực cao về độ trễ và ổn định.
  - Sinh nội dung offline chi phí thấp: văn bản quảng cáo/game, tạo knowledge base, tái cấu trúc code hàng loạt và các tác vụ batch processing ưu tiên throughput và chi phí, không yêu cầu realtime cao.
  - Triển khai đa vùng, đa cụm: cung cấp truy cập gần nhất cho người dùng toàn cầu hoặc đa khu vực, đồng thời hỗ trợ hình thức multi-cloud hoặc hybrid cloud.
- **Nguyên lý**
  - Kiến trúc triển khai và định tuyến mô hình:
    - **Single model serving**: ở giai đoạn đầu hoặc tình huống đơn giản, dùng một mô hình chính cung cấp dịch vụ thống nhất ra ngoài, kiến trúc đơn giản nhưng khó cân bằng giữa độ trễ và chi phí.
    - **Multi-model serving và routing**: căn cứ vào các chiều như loại tác vụ, yêu cầu độ trễ, ràng buộc chi phí, cấp độ người dùng... cấu hình mô hình có kích thước hoặc chuyên môn khác nhau, và định tuyến yêu cầu thông qua quy tắc hoặc Meta‑model (bao gồm A/B testing, chiến lược Multi-armed Bandit...).
    - **Cô lập đa tenant và quản lý SLA**: trong tình huống đa khách hàng, đảm bảo cô lập về hiệu năng và bảo mật giữa các tenant thông qua hạn mức tài nguyên, giới hạn QPS, xác thực truy cập và phân cấp SLA.
    - **Mở rộng đàn hồi và khả dụng cao**: nhờ hạ tầng Kubernetes/Service Mesh, thực hiện tự động scale in/out, triển khai đa replica, phát hành canary, blue-green deployment và disaster recovery đa vùng.
  - Tối ưu hóa hiệu năng suy luận:
    - **Nén và tăng tốc mô hình**: giảm lượng tính toán và chiếm dụng VRAM của mô hình thông qua quantization (INT8/INT4/NF4/GPTQ/AWQ), pruning/sparsification, knowledge distillation.
    - **Tối ưu hóa cấp hệ thống**: dùng KV Cache lưu cache attention key-value để tăng tốc hội thoại dài và suy luận liên tục; cân bằng throughput và độ trễ thông qua batching, sinh token song song và streaming output; giảm overhead truy cập bộ nhớ và khởi động kernel bằng operator fusion và graph optimization.
    - **Tận dụng phần cứng dị cấu**: xây dựng Runtime và chiến lược lập lịch phù hợp cho từng phần cứng GPU, CPU, NPU, FPGA, ASIC; trong tình huống multi-GPU single node và multi-GPU multi-node, dùng NVLink/RDMA và các kết nối tốc độ cao khác để nâng cao hiệu suất tổng thể.
  - Engineering và vận hành:
    - Dùng các framework suy luận chuyên dụng như vLLM, TGI, Triton để giảm đáng kể chi phí tự phát triển.
    - Triển khai đa nền tảng và tối ưu cấp operator thông qua các compiler và Runtime như ONNX Runtime, TensorRT, TVM, OpenVINO.
    - Xây dựng **cụm suy luận online thống nhất và tầng điều phối traffic** bằng Kubernetes, Ray, Service Mesh và API gateway.
- **Mô hình và công cụ**
  - Framework Serving và dịch vụ suy luận:
    - vLLM, TGI (Text Generation Inference), Triton Inference Server.
    - Ray Serve, KServe, TorchServe, SageMaker Endpoint, Vertex AI Endpoint, v.v.
  - Cụm và lập lịch:
    - Kubernetes (K8s), Kubeflow, Ray, Slurm.
    - Service Mesh: Istio/Linkerd (hỗ trợ quản trị traffic như canary, rate limiting, circuit breaker, fallback).
  - API gateway và xác thực:
    - Kong, NGINX/APISIX/Envoy.
    - IAM/Keycloak/Auth0, Cloud Provider API Gateway, OAuth2/OIDC, v.v.
  - Nén mô hình và thư viện hiệu năng:
    - Quantization: NVIDIA TensorRT‑LLM/TensorRT, Intel Neural Compressor, OpenVINO (PTQ/QAT), BitsAndBytes, GPTQ, AWQ, AutoGPTQ.
    - Pruning/Sparse: PyTorch Sparse, TensorFlow Model Optimization Toolkit, SparseML, Neural Magic.
    - Distillation: các giải pháp tham khảo DistilBERT/TinyBERT, hoặc distillation pipeline dựa trên Hugging Face Trainer + custom distillation loss.
  - Inference engine/Runtime và graph optimization:
    - ONNX Runtime, TensorRT, OpenVINO Runtime, TVM, MNN, NCNN.
    - Inference engine chuyên dụng cho mô hình lớn: Sglang, vLLM, FasterTransformer, TGI, LMDeploy, DeepSpeed‑Inference.
    - Compilation và graph optimization: TVM, XLA (JAX/TF), TensorRT Graph Optimizer, TorchDynamo/TorchInductor, MLIR, Glow, ONNX Graph Optimizer, Intel NNCF, v.v.
  - Phần cứng và hỗ trợ dị cấu:
    - GPU: CUDA/cuDNN/cuBLAS, ROCm (AMD).
    - CPU: oneDNN (MKL‑DNN), OpenBLAS, Eigen.
    - NPU/Card tăng tốc chuyên dụng: Ascend CANN, Habana Gaudi, Graphcore IPU và các SDK khác.

Về phía sản phẩm, tầng này thường xuất hiện dưới dạng **AI trung tâm doanh nghiệp/Model Service Bus, Cloud API mở ra bên ngoài, Inference Gateway thống nhất, cụm suy luận online QPS cao, nền tảng batch processing chi phí thấp và giải pháp tối ưu hóa tỷ lệ sử dụng tài nguyên tính toán** — đây là "hệ điều hành" runtime hỗ trợ năng lực mô hình lớn triển khai ở quy mô lớn.

### 11.2.1 Kiến Trúc Triển Khai và Định Tuyến Mô Hình: Từ Single Model đến Multi-Model Service Mesh

Ở giai đoạn thử nghiệm ban đầu, nhiều team sẽ chọn dùng một mô hình "lớn và toàn diện" làm **điểm vào duy nhất** để cung cấp dịch vụ: tất cả yêu cầu đều được xử lý bởi cùng một mô hình. Mô hình này có kiến trúc đơn giản, chi phí bảo trì thấp, phù hợp với tình huống POC và lưu lượng thấp. Nhưng khi nghiệp vụ mở rộng và áp lực chi phí tăng lên, những hạn chế của kiến trúc single model sẽ nhanh chóng lộ rõ:

1. Các tác vụ khác nhau có yêu cầu khác nhau về độ trễ/chi phí/chất lượng; dùng một mô hình lớn để xử lý tất cả yêu cầu sẽ gây ra **lãng phí tài nguyên tính toán**.
2. Phục vụ các ngành khác nhau và khách hàng khác nhau cần cung cấp năng lực có sự khác biệt, ví dụ mô hình chuyên ngành, trọng số fine-tuning riêng cho từng khách hàng, rất khó quản lý thống nhất trong mô hình "single model".
3. Các tình huống như canary release, A/B testing, disaster recovery đa vùng yêu cầu có khả năng lập lịch linh hoạt giữa nhiều phiên bản mô hình.

Do đó, hệ thống serving mô hình lớn trưởng thành thường tiến hóa thành kiến trúc **multi-model serving và intelligent routing**:

1. **Multi-model pool và model catalog**: đồng thời duy trì mô hình có nhiều kích thước (small/base/large/ultra), nhiều chuyên môn (general/code/multimodal/industry-specific), nhiều phiên bản (v1/v1.1/custom...) và đăng ký, quản lý thống nhất ở tầng serving.
2. **Chiến lược routing**:
3. **Rule-based routing**: lựa chọn tường minh dựa trên tham số yêu cầu (loại tác vụ, cấp độ người dùng, ưu tiên độ trễ/chi phí...) và quy tắc nghiệp vụ (một ngành, một vùng bắt buộc dùng mô hình cụ thể).
4. **Model selector (Meta‑model)**: dùng một mô hình nhẹ để tự động chọn mô hình tối ưu dựa trên nội dung đầu vào, hiệu quả lịch sử, chỉ số realtime (ví dụ mô hình nhỏ nhanh vs. mô hình lớn chậm).
5. **A/B / Bandit routing**: thực hiện thử nghiệm online giữa mô hình mới/cũ hoặc các cấu hình khác nhau, tự động hội tụ về phương án tốt hơn dựa trên các chỉ số CTR, user satisfaction, task success rate.
6. **Cô lập đa tenant và quản lý quota**:
7. Xếp chồng kiểm soát quota theo chiều tenant lên trên model routing, giới hạn QPS, xác thực truy cập và phân cấp SLA, đảm bảo cô lập tài nguyên và dữ liệu giữa các khách hàng khác nhau.
8. Thông qua **logical isolation + physical isolation (dedicated cluster hoặc dedicated node)** để ứng phó với các tình huống tuân thủ cao như tài chính/y tế/chính phủ.
9. **Mở rộng đàn hồi và khả dụng cao**:
10. Tự động scale in/out theo lưu lượng dựa trên Kubernetes HPA/VPA, Cluster Autoscaler.
11. Đảm bảo tính ổn định dịch vụ thông qua triển khai đa replica, load balancing, canary release, blue-green deployment và disaster recovery đa vùng.

Về mặt kỹ thuật, thường sử dụng tổ hợp **Kubernetes + Service Mesh (Istio/Linkerd) + API gateway (Kong/APISIX/Envoy) + Model serving framework (vLLM/TGI/Triton/Ray Serve/KServe)** để hình thành một **nền tảng suy luận dạng service mesh** vừa hỗ trợ đa mô hình, đa tenant, vừa hỗ trợ quản trị traffic và canary release.

### 11.2.2 Tối Ưu Hóa Hiệu Năng Suy Luận và Tăng Tốc Phần Cứng: Đẩy Chi Phí "Mỗi Lần Suy Luận" Xuống Mức Thấp Nhất

Trong tình huống thương mại hóa quy mô lớn của mô hình lớn, chi phí suy luận thường là một trong những khoản chi tiêu liên tục lớn nhất. Làm sao để trong khi đảm bảo trải nghiệm, nén **chi phí đơn vị yêu cầu (Cost per Request / per Token) và độ trễ end-to-end** xuống phạm vi có thể chấp nhận, là thách thức kỹ thuật cốt lõi của tầng triển khai.

Về **phía mô hình**, các phương pháp phổ biến bao gồm:

1. **Quantization**
   Thông qua việc nén trọng số và activation từ FP16/BF16 xuống các định dạng bit thấp như INT8/INT4/NF4, giảm đáng kể chiếm dụng VRAM và overhead băng thông.
   1. Post-Training Quantization (PTQ): như GPTQ, AWQ, BitsAndBytes..., thực hiện quantization offline cho mô hình đã có sẵn.
   2. Quantization-Aware Training (QAT): xem xét lỗi quantization trong giai đoạn training/fine-tuning để nâng cao độ chính xác sau quantization.
2. **Pruning và Sparsification**
   Thông qua structured/unstructured pruning loại bỏ trọng số hoặc channel không quan trọng, làm mô hình trở nên sparse, kết hợp với sparse operator thân thiện với phần cứng (như NVIDIA sparse matrix acceleration) để tăng tốc suy luận.
3. **Distillation**
   Dùng mô hình lớn làm teacher, chắt lọc kiến thức vào mô hình student nhỏ hơn hoặc mô hình đặc thù cho tác vụ, duy trì hiệu năng tác vụ gần bằng trong khi giảm đáng kể quy mô tham số, phù hợp với nghiệp vụ online cực nhạy cảm với độ trễ hoặc edge deployment.

Về **phía hệ thống và Runtime**, các điểm tối ưu hóa then chốt bao gồm:

1. **KV Cache và tối ưu hóa long context**:
   Trong autoregressive generation, cache attention key-value của các token lịch sử để tránh tính toán lặp lại, từ đó nâng cao hiệu quả của hội thoại dài và multi-turn request; kết hợp chiến lược chunked computation và dynamic pruning để kiểm soát overhead VRAM.
2. **Batching và parallel generation**:
   Thông qua dynamic batching, grouped scheduling và parallel token generation cho nhiều yêu cầu, nâng cao throughput tổng thể mà không làm tăng đáng kể P95 latency; kết hợp streaming output để cải thiện trải nghiệm tương tác frontend.
3. **Operator và graph optimization**:
   Dùng compiler và Runtime (như TensorRT, TVM, ONNX Runtime, TorchInductor) để thực hiện operator fusion, memory layout optimization, static graph compilation, giảm overhead khởi động kernel và truy cập bộ nhớ.
4. **Lập lịch phần cứng dị cấu**:
   Căn cứ vào đặc tính tính toán và yêu cầu độ trễ của các tác vụ khác nhau, phân bổ hợp lý giữa các tài nguyên dị cấu GPU, CPU, NPU, FPGA:
5. Yêu cầu hội thoại/tìm kiếm cực nhạy cảm với độ trễ và concurrency cao ưu tiên lập lịch lên GPU/NPU.
6. Các tác vụ như batch generation, offline evaluation, log replay có thể lập lịch lên CPU hoặc GPU/NPU chi phí thấp.

Về công cụ và framework, TensorRT‑LLM, SgLang, vLLM, FasterTransformer, LMDeploy, DeepSpeed‑Inference... đã hình thành một **hệ sinh thái tăng tốc suy luận mô hình lớn** tương đối trưởng thành. Về phía nghiệp vụ, các tối ưu hóa này cuối cùng thể hiện thành: **cụm suy luận online QPS cao, độ trễ thấp; nền tảng batch generation chi phí thấp; giải pháp tối ưu tỷ lệ sử dụng tài nguyên tính toán và hệ thống thanh toán, hạch toán chi phí MaaS/API**.
## 11.3 Vận hành Dữ liệu và Mô hình (Data / Model Ops)

Khi LLM đi vào môi trường production, chúng không còn là tài sản tĩnh "giao một lần là xong" nữa, mà là hệ thống động cần liên tục lặp lại trên năm chiều: **dữ liệu, mô hình, cấu hình, phiên bản và thực nghiệm**. Tầng Data / Model Ops được xây dựng xung quanh thực tế này: từ vòng quay dữ liệu, quản lý vòng đời mô hình đến thực nghiệm trực tuyến và phát hành tự động — cung cấp nền tảng cho **sự cải tiến bền vững và tiến hóa có kiểm soát** của năng lực mô hình.

Tầng này một đầu kết nối data lake / data warehouse, log và hệ thống thu thập; đầu kia kết nối nền tảng huấn luyện, hệ thống đánh giá và gateway dịch vụ trực tuyến — là trung tâm kết nối vòng lặp khép kín "dữ liệu – mô hình – phản hồi nghiệp vụ".

- **Tình huống ứng dụng**
  - Nền tảng dữ liệu doanh nghiệp + nền tảng huấn luyện mô hình tích hợp: thông suốt toàn bộ chuỗi từ thu thập, làm sạch, gán nhãn, quản lý dữ liệu đến huấn luyện / fine-tune, hỗ trợ nhiều mô hình liên tục lặp lại.
  - "Cơ chế cải tiến hiệu quả liên tục" cho ứng dụng AI B2C / B2B: dựa vào vòng quay dữ liệu được thúc đẩy bởi phản hồi người dùng và dữ liệu sử dụng.
  - Bàn làm việc quản lý dữ liệu và gán nhãn dùng chung cho đội gán nhãn và đội thuật toán: hỗ trợ phân công tác vụ, kiểm tra chất lượng, truy vết phiên bản.
  - Nền tảng ModelOps cấp tập đoàn: thống nhất ghi chép và quản lý tất cả phiên bản mô hình, kết quả đánh giá và trạng thái phát hành.
  - Hệ thống thực nghiệm kinh doanh trực tuyến và phát hành dần dần: hỗ trợ A/B testing, chạy thử lưu lượng nhỏ đa mô hình và tự động mở rộng sang phiên bản tốt nhất.
  - Dịch vụ hosting mô hình: cung cấp cho đối tác / khách hàng khả năng quản lý mô hình "tải lên một nơi, triển khai đa môi trường, quản lý đa phiên bản".
- **Nguyên lý**
  - Quản lý dữ liệu và vòng quay dữ liệu:
    - **Thu thập và quản trị dữ liệu**: thu thập mẫu từ log nghiệp vụ, hội thoại người dùng, dữ liệu công khai, dữ liệu đối tác; thực hiện loại trùng lặp, giảm nhiễu, ẩn danh hóa, thống nhất định dạng và đánh giá chất lượng.
    - **Vòng lặp khép kín gán nhãn và phản hồi**: xây dựng dữ liệu gán nhãn chất lượng cao thông qua kết hợp gán nhãn chuyên gia và crowdsourcing cùng cơ chế kiểm tra chất lượng; đưa phản hồi như like / dislike, sửa lỗi, xem xét thủ công của người dùng trở lại vào pool mẫu huấn luyện.
    - **Vòng quay dữ liệu (Data Flywheel)**: sau khi mô hình ra mắt, liên tục thu thập dữ liệu sử dụng thực tế → chọn lọc mẫu có giá trị cao (như lỗi mô hình, độ tin cậy thấp, tác vụ lợi nhuận cao) → huấn luyện lại hoặc fine-tune → hiệu quả mô hình cải thiện → vòng sử dụng mới, tạo thành vòng phản hồi dương.
  - Vòng đời mô hình và phát hành:
    - **Quản lý phiên bản mô hình**: duy trì số phiên bản rõ ràng (major/minor), phiên bản dữ liệu huấn luyện, tham số cấu hình, kết quả đánh giá, báo cáo an toàn và nhật ký thay đổi cho mỗi mô hình.
    - **CI/CD và pipeline tự động**: sau khi huấn luyện hoàn tất, tự động kích hoạt đánh giá và kiểm tra an toàn; thông qua kiểm tra hồi quy và kiểm soát ngưỡng, chỉ cho phép phát hành dần dần và triển khai toàn bộ khi các chỉ số quan trọng không suy giảm quá mức.
    - **Thực nghiệm và phân bổ lưu lượng**: sử dụng A/B testing, multi-armed bandit và các phương pháp thực nghiệm trực tuyến khác để so sánh đa phiên bản mô hình, tự động chọn phiên bản tối ưu theo chỉ số nghiệp vụ thời gian thực (ví dụ: tỷ lệ thành công tác vụ, tỷ lệ giải quyết ticket, mức độ hài lòng người dùng).
- **Công cụ và mô hình**
  - Data lake và data warehouse:
    - Delta Lake, Apache Hudi, Iceberg, Hive, BigQuery, Snowflake, v.v., dùng để lưu trữ và quản lý thống nhất dữ liệu có cấu trúc / phi cấu trúc quy mô lớn.
  - Xử lý dữ liệu luồng:
    - Kafka, Pulsar, Flink, Spark Streaming, v.v., dùng để tiếp nhận log thời gian thực, hội thoại người dùng và luồng sự kiện.
  - Quản lý feature và mẫu:
    - Feast và các Feature Store khác, kho mẫu tự phát triển, ML Metadata Store, dùng để ghi chép mẫu, feature và metadata huấn luyện.
  - Nền tảng gán nhãn và kiểm tra chất lượng:
    - Label Studio, nền tảng tương tự Scale, hệ thống gán nhãn tự phát triển — hỗ trợ gán nhãn đa tác vụ, kiểm tra chất lượng và quản lý nhân sự.
  - Nền tảng MLOps / ModelOps:
    - MLflow, Kubeflow, SageMaker, Vertex AI, Azure ML, Weights & Biases, v.v., dùng để quản lý thực nghiệm huấn luyện, tham số, chỉ số và model artifact.
  - Đăng ký mô hình và quản lý phiên bản:
    - MLflow Model Registry, SageMaker Model Registry, W&B Artifacts, v.v.
  - Công cụ CI/CD:
    - GitHub Actions, GitLab CI, Jenkins, Argo CD, Flux, v.v., dùng để xây dựng pipeline phân phối mô hình liên tục.

### 11.3.1 Vòng quay dữ liệu và vòng lặp huấn luyện: Làm cho mô hình "càng dùng càng thông minh"

Trong phát triển phần mềm truyền thống, nâng cấp phiên bản thường được thúc đẩy bởi kế hoạch phát triển; nhưng trong thời đại LLM, **dữ liệu và phản hồi** trở thành động lực lặp lại chính. Mục tiêu của vòng quay dữ liệu là biến "sử dụng mô hình → tích lũy dữ liệu → huấn luyện lại → nâng cấp mô hình" thành một vòng lặp khép kín tự động cuộn, giúp mô hình **càng dùng càng tốt hơn** trong thực tế nghiệp vụ.

Các mắt xích cốt lõi bao gồm:

1. **Thu thập và lọc dữ liệu trực tuyến**
   Trong các ứng dụng như chatbot, Copilot, hỏi đáp tìm kiếm, trợ lý code, v.v., mỗi lần tương tác của người dùng đều là mẫu huấn luyện tiềm năng có giá trị cao. Thông qua hệ thống log và theo dõi sự kiện, thu thập có cấu trúc yêu cầu, câu trả lời mô hình, hành vi người dùng (nhấp chuột, chấp nhận hay không); đồng thời thực hiện ẩn danh hóa quyền riêng tư và cắt tỉa trường ngay tại phía thu thập để đảm bảo không đưa thêm rủi ro tuân thủ.
2. **Khai thác mẫu có giá trị cao**
   Lọc ra một phần nhỏ mẫu có giá trị nhất cho huấn luyện từ khối lượng log khổng lồ, ví dụ:
   1. Câu trả lời rõ ràng sai hoặc bị người dùng dislike, dùng cho huấn luyện lại kiểu "sửa lỗi".
   2. Mẫu câu hỏi dài khó, tác vụ workflow phức tạp, dùng để nâng cao năng lực mô hình trong "suy luận chuỗi dài / gọi công cụ đa bước".
   3. Case nghiệp vụ điển hình, ticket có giá trị cao, dùng để xây dựng năng lực chuyên biệt theo ngành / doanh nghiệp.
3. **Gán nhãn và kiểm soát chất lượng**
   Thực hiện gán nhãn thủ công hoặc bán tự động cho các mẫu ứng viên (bao gồm câu trả lời mong đợi, xếp hạng tốt/xấu, nhãn an toàn, v.v.), và đảm bảo chất lượng gán nhãn thông qua kiểm tra nhiều vòng, xem xét lại và kiểm tra ngẫu nhiên, cung cấp dữ liệu đáng tin cậy cho SFT hoặc RLHF tiếp theo.
4. **Huấn luyện lại và đánh giá triển khai liên tục**
   Định kỳ thêm mẫu mới vào tập huấn luyện, thực hiện các thao tác huấn luyện lại như SFT / DAPT / RLHF, đồng thời đánh giá "chỉ số offline + hiệu quả online" thông qua bộ đánh giá chuẩn và thực nghiệm A/B trực tuyến, đảm bảo phiên bản mới nhìn chung tốt hơn phiên bản cũ, tránh vòng quay dữ liệu "đi sai hướng".

Ở dạng trưởng thành, phần lớn các thao tác của vòng quay dữ liệu sẽ được tự động hóa và đóng gói vào **nền tảng Data / Model Ops**: từ thu thập dữ liệu, lọc mẫu, phân công tác vụ gán nhãn, đến kích hoạt huấn luyện lại mô hình, thu thập kết quả đánh giá và quyết định triển khai — giảm thiểu tối đa thao tác thủ công, biến lặp lại mô hình thành một quy trình kỹ thuật ổn định và có kiểm soát.

### 11.3.2 Vòng đời mô hình và ModelOps: Từ mô hình thực nghiệm đến tài sản production

Khi số lượng mô hình và phiên bản tăng theo cấp số nhân, nếu thiếu quản lý vòng đời nghiêm ngặt, rất dễ xảy ra các vấn đề như "mô hình rải rác khắp nơi, phiên bản hỗn loạn, khó rollback". Mục tiêu của ModelOps là quản lý mô hình như **tài sản kỹ thuật hạng nhất** — có thể truy vết, so sánh và rollback toàn bộ quá trình.

Các điểm quan trọng bao gồm:

1. **Quản lý phiên bản và metadata**
   Gán số phiên bản rõ ràng cho mỗi mô hình (ví dụ `industry-legal-base-v1.2.3`) và ghi lại:
   1. Phiên bản dữ liệu huấn luyện và khoảng thời gian;
   2. Cấu hình huấn luyện (siêu tham số, phiên bản script huấn luyện, commit code được sử dụng);
   3. Chỉ số đánh giá (benchmark tổng quát + benchmark đặc thù nghiệp vụ);
   4. Đánh giá an toàn và chiến lược alignment (như phiên bản chiến lược trả lời chủ đề nhạy cảm);
   5. Lịch sử triển khai / ngừng / rollback.
2. **Pipeline tự động đầu cuối (CI/CD cho Mô hình)**
   Đóng gói quy trình "hoàn thành huấn luyện mô hình → đánh giá tự động → kiểm tra an toàn và thiên lệch → phát hành dần dần → phát hành toàn bộ" vào pipeline CI/CD.
3. Nếu chỉ số đánh giá offline không đạt ngưỡng định sẵn, tự động chặn triển khai.
4. Nếu kết quả thực nghiệm A/B online không tốt, tự động giảm lưu lượng hoặc rollback về phiên bản trước.
5. **Đa phiên bản cùng tồn tại và điều phối lưu lượng**
   Trong môi trường production, thường có nhiều phiên bản mô hình tồn tại đồng thời (như `stable` / `canary` / `experimental`), so sánh trực tuyến thông qua chiến lược phân bổ lưu lượng (tỷ lệ cố định, chiều người dùng, chiều feature).
   1. A/B testing chú trọng hơn đến kết luận thống kê ổn định;
   2. Multi-armed Bandit tự động cân bằng giữa khám phá và khai thác, tăng tốc hội tụ về phiên bản hiệu quả hơn.
6. **Hỗ trợ tuân thủ và kiểm toán**
   Đối với các ngành như tài chính, y tế, chính phủ, cần duy trì hồ sơ có thể truy vết cho mỗi lần thay đổi phiên bản mô hình: ai, vào lúc nào, dựa trên dữ liệu gì, đã nâng cấp mô hình từ phiên bản nào lên phiên bản nào, và đánh giá tác động sau khi nâng cấp như thế nào. Phần này thường phối hợp với **cơ sở hạ tầng an toàn và tuân thủ** trong mục 11.5.

Về mặt triển khai kỹ thuật, các công cụ như MLflow / SageMaker / Vertex AI / W&B đã cung cấp khả năng ModelOps tương đối trưởng thành; hầu hết doanh nghiệp sẽ đóng gói lại lần hai kết hợp với quy trình của riêng mình trên nền tảng đó, xây dựng **trung tâm đăng ký mô hình nội bộ và nền tảng phát hành** thống nhất.
## 11.4 Giám sát, Chi phí & Độ tin cậy (Monitoring, Cost & Reliability)

Khi LLM trở thành hạ tầng cốt lõi của nghiệp vụ, làm thế nào để đảm bảo **có thể quan sát, có thể cảnh báo, có thể mở rộng/thu nhỏ** và **kiểm soát chi phí** trở thành trách nhiệm trọng tâm của đội ngũ SRE và nền tảng. Tầng giám sát, chi phí và độ tin cậy kết hợp hệ thống observability truyền thống với các chỉ số đặc thù của LLM, xây dựng góc nhìn đa chiều phục vụ vận hành, thuật toán và quản lý.

Tầng này một đầu kết nối hệ thống thu thập giám sát, log/tracing, đầu kia kết nối KPI nghiệp vụ và nền tảng phân tích chi phí — là trụ cột then chốt đảm bảo dịch vụ mô hình "ổn định, nhanh, tiết kiệm".

- **Kịch bản**
  - Dashboard giám sát vận hành dành cho đội ngũ vận hành/SRE: hiển thị thống nhất mức sử dụng CPU/GPU, QPS, độ trễ, tỷ lệ lỗi, cảnh báo, v.v.
  - Nền tảng giám sát chất lượng dữ liệu và mô hình dành cho đội ngũ thuật toán: theo dõi phân phối dữ liệu đầu vào, model drift, hiệu quả prompt engineering và tỷ lệ RAG hit.
  - Bảng điều khiển sức khỏe dịch vụ dành cho ban quản lý: liên kết và hiển thị KPI nghiệp vụ (tỷ lệ chuyển đổi, mức độ hài lòng, tỷ lệ hoàn thành tác vụ) cùng với các chỉ số mô hình.
  - Nền tảng phân tích và tối ưu chi phí AI: phân tách chi phí tính toán theo mô hình, dự án, dòng nghiệp vụ; hỗ trợ quản lý ngân sách và chiến lược tối ưu chi phí.
  - Hệ thống lập lịch thông minh và co giãn linh hoạt: tự động mở rộng/thu nhỏ hoặc chuyển đổi cấu hình mô hình theo tải và ngân sách.
  - Hệ thống tính phí và quyết toán chi phí MaaS/API đối ngoại: hỗ trợ tính phí theo số lần gọi, số token, mức sử dụng tài nguyên tính toán và các chiều khác.
- **Nguyên lý**
  - Giám sát và observability:
    - **Giám sát đa tầng**: từ tầng hạ tầng (CPU/GPU/bộ nhớ/mạng/lưu trữ) đến tầng dịch vụ (QPS, độ trễ P50/P95/P99, tỷ lệ lỗi, timeout retry), rồi đến tầng mô hình (lượng token sử dụng, phân phối độ dài context, độ dài phản hồi, các loại lỗi phổ biến).
    - **Log và distributed tracing**: ghi log có cấu trúc cho request/response (sau khi ẩn danh hóa), kèm theo phiên bản mô hình, quyết định routing, thông tin tenant; sử dụng công cụ distributed tracing ghi lại toàn bộ chuỗi request từ API gateway → model service → hệ thống downstream.
    - **Cảnh báo và phân tích**: thiết lập cảnh báo ngưỡng, phát hiện bất thường và phân tích xu hướng, liên kết với chỉ số nghiệp vụ, chi phí và sự kiện bảo mật để định vị và phục hồi nhanh chóng.
  - Kiểm soát chi phí và lập lịch linh hoạt:
    - **Phân tích chi phí**: phân tách chi phí GPU/CPU/lưu trữ/băng thông theo chiều mô hình, dự án, dòng nghiệp vụ; tính chi phí trung bình mỗi request và chi phí biên của các tác vụ/khách hàng khác nhau.
    - **Lập lịch linh hoạt**: áp dụng chiến lược phân bổ theo giờ cao/thấp điểm, tự động mở rộng trong giờ cao điểm, tự động thu nhỏ trong giờ thấp điểm; dịch chuyển tác vụ batch offline sang ban đêm hoặc các khung giờ tải thấp.
    - **Giảm cấp có chiến lược và tăng tốc theo yêu cầu**: tự động chuyển sang mô hình nhỏ hơn, context ngắn hơn hoặc cấu hình suy luận bảo thủ hơn khi tài nguyên căng thẳng; tự động sử dụng mô hình lớn hơn hoặc context dài hơn cho các request có giá trị cao.
- **Mô hình**
  - Giám sát và trực quan hóa:
    - Prometheus + Grafana, VictoriaMetrics, Thanos và các giải pháp thu thập, trực quan hóa chỉ số khác.
  - Hệ thống log:
    - ELK (Elasticsearch + Logstash + Kibana), EFK (Fluentd/Fluent Bit), OpenSearch, v.v.
  - Distributed tracing:
    - OpenTelemetry, Jaeger, Zipkin, v.v.
  - Giám sát đặc thù cho mô hình:
    - WhyLabs, Arize AI, Fiddler, Evidently AI, v.v., dùng để giám sát data/model drift và đánh giá chất lượng đầu ra.
  - Thống kê và phân bổ chi phí:
    - K8s Metrics/Cost Exporter, Kubecost, cùng các công cụ Cost Management của từng nhà cung cấp đám mây (AWS Cost Explorer/GCP Billing/Azure Cost Management).
  - Lập lịch tài nguyên và co giãn linh hoạt:
    - K8s HPA/VPA, Cluster Autoscaler, Volcano, Ray Cluster Autoscaler.
  - Điều phối tác vụ:
    - Argo Workflows, Airflow, Prefect, Dagster, v.v.

### 11.4.1 Giám sát & Observability: Từ hạ tầng đến hành vi mô hình

Trong hệ thống LLM, các chỉ số CPU/bộ nhớ/QPS truyền thống đã không còn đủ — bạn cần bổ sung thêm một tầng giám sát từ "góc nhìn mô hình" để thực sự thấy rõ tình trạng sức khỏe hệ thống. Một hệ thống observability hoàn chỉnh thường bao gồm:

1. **Giám sát tầng hạ tầng và dịch vụ**
   Thu thập và trực quan hóa qua Prometheus/Grafana, VictoriaMetrics, v.v.:
   1. Mức sử dụng CPU, GPU, bộ nhớ, đĩa, mạng ở cấp độ node/Pod;
   2. QPS, độ trễ P50/P95/P99, tỷ lệ lỗi, tỷ lệ timeout retry, số lượng kết nối ở cấp độ dịch vụ;
   3. Tỷ lệ sử dụng tài nguyên và cảnh báo dung lượng ở cấp độ cluster.
2. **Giám sát chỉ số tầng mô hình**
   Ngoài các chỉ số hiệu năng thông thường, dịch vụ LLM còn cần giám sát chuyên biệt:
   1. Lượng token tiêu thụ mỗi request (đầu vào/đầu ra), phân phối độ dài context;
   2. Độ dài phản hồi và tỷ lệ cắt ngắn, để phát hiện vấn đề chất lượng do giới hạn context/độ dài đầu ra;
   3. Thống kê các loại lỗi phổ biến (như đầu vào quá dài, model timeout, lỗi gọi tool, v.v.).
3. **Log và distributed tracing**
   1. Sử dụng structured log để ghi lại tham số request (sau khi ẩn danh hóa), phiên bản mô hình, quyết định routing, định danh tenant, mã trả về và các thông tin khác.
   2. Dùng OpenTelemetry, Jaeger, Zipkin, v.v. để tracing toàn bộ hành trình của một request qua API gateway → model service → hệ thống downstream → chuỗi callback, giúp định vị điểm nghẽn độ trễ và điểm lỗi.
4. **Phát hiện bất thường và cảnh báo thông minh**
   Trên nền cảnh báo ngưỡng truyền thống, bạn có thể tích hợp thêm giám sát thống kê đơn giản hoặc mô hình machine learning để phát hiện bất thường trên QPS, độ trễ, tỷ lệ lỗi, phân phối token, v.v. — tự động cảnh báo khi có biến động đột ngột và liên kết với chiến lược tự phục hồi (như tự động mở rộng, chuyển đổi lưu lượng, giảm cấp dịch vụ).

Đối với đội ngũ thuật toán, bạn cũng có thể tích hợp vào tầng này các công cụ như WhyLabs, Arize, Evidently AI để theo dõi dài hạn phân phối đầu vào, đặc trưng đầu ra mô hình và tình trạng drift — cung cấp tín hiệu cho data flywheel và quá trình re-training về sau.

### 11.4.2 Phân tích chi phí & Lập lịch linh hoạt: Tìm điểm cân bằng giữa "trải nghiệm" và "ngân sách"

Một trong những thách thức vận hành nổi bật nhất của dịch vụ LLM là **chi phí cao và biến động lớn**. Nếu thiếu phân tích chi phí và lập lịch linh hoạt tinh tế, khi nghiệp vụ tăng trưởng bạn sẽ khó thấy "tiền đang đốt ở đâu" và khó kịp thời điều chỉnh. Một hệ thống chi phí và lập lịch tài nguyên trưởng thành thường bao gồm:

1. **Quy gán và phân bổ chi phí**
   Sử dụng Kubecost, công cụ Billing của nhà cung cấp đám mây và sổ cái tự phát triển để phân tách chi phí GPU/CPU/lưu trữ/băng thông theo các chiều mô hình, dự án, dòng nghiệp vụ, tenant — giúp mỗi đội và khách hàng đều có thể thấy mức tiêu thụ tài nguyên và chi phí thực tế tương ứng của mình.
2. **Phân tích chi phí mỗi request và chi phí biên**
   1. Tính chi phí trung bình mỗi request của từng mô hình/tác vụ (Cost per 1k tokens/per request), so sánh tỷ lệ giá trị/hiệu năng giữa các mô hình và cấu hình khác nhau.
   2. Phân tích chi phí biên của các khách hàng và kịch bản nghiệp vụ khác nhau, làm cơ sở cho chiến lược định giá (tính phí API), phân cấp SLA và đóng gói sản phẩm.
3. **Co giãn linh hoạt và tận dụng giờ cao/thấp điểm**
   1. Thực hiện tự động co giãn qua các cơ chế K8s HPA/VPA, Cluster Autoscaler, Ray Autoscaler, v.v. — đảm bảo không sập trong giờ cao điểm và không lãng phí trong giờ thấp điểm.
   2. Sắp xếp các tác vụ offline (như tạo nội dung hàng loạt, replay log, đánh giá offline) vào ban đêm hoặc các khung giờ không cao điểm, để nâng cao tỷ lệ sử dụng GPU tổng thể và làm phẳng đường cong chi phí.
4. **Giảm cấp có chiến lược và tăng tốc theo yêu cầu**
   1. Tự động kích hoạt chiến lược giảm cấp khi tài nguyên căng thẳng hoặc chi phí vượt ngân sách: dùng mô hình nhỏ hơn, rút ngắn context hoặc đầu ra, giảm mức song song.
   2. Tự động dùng mô hình lớn hơn, context dài hơn hoặc khả năng gọi tool phong phú hơn cho các request có giá trị cao (như người dùng trả phí cao cấp, luồng nghiệp vụ quan trọng) — thực hiện "phân bổ tài nguyên theo giá trị".

Trong kịch bản API đối ngoại, tầng này còn liên kết chặt chẽ với hệ thống tính phí, hình thành **nền tảng tính phí MaaS/API và quyết toán chi phí**: tính phí dựa trên lượng token sử dụng, số lần gọi, cấu hình mô hình và loại request, đồng thời cung cấp phân tích chi phí và biên lợi nhuận cho bộ phận vận hành/kinh doanh.
## 11.5 Cơ Sở Hạ Tầng Bảo Mật, Quyền Truy Cập & Tuân Thủ (Security, Access Control & Compliance Infra)

Khi năng lực LLM tiếp cận các ngành nhạy cảm như tài chính, y tế, chính phủ, bảo mật và tuân thủ không còn là "giá trị gia tăng" mà trở thành điều kiện tiên quyết để gia nhập thị trường. Tầng cơ sở hạ tầng bảo mật, quyền truy cập & tuân thủ chịu trách nhiệm xây dựng phòng tuyến cấp hệ thống từ **kiểm soát truy cập, bảo mật dữ liệu, bảo vệ quyền riêng tư đến kiểm toán tuân thủ**, đảm bảo dịch vụ model vận hành đáng tin cậy trong khuôn khổ pháp lý và quy định.

Tầng này một đầu kết nối xác thực danh tính, quản lý quyền, hệ thống khóa & mã hóa, đầu kia kết nối dịch vụ model và nền tảng log / kiểm toán — đây là chìa khóa biến "model dùng được" thành "model dám dùng".

- **Tình huống ứng dụng**
  - Nền tảng LLM nội địa hóa cho các ngành tuân thủ cao như tài chính / y tế / chính phủ: yêu cầu dữ liệu không rời khỏi domain, có thể kiểm toán, có thể truy vết.
  - Gateway kiểm soát truy cập & kiểm toán AI thống nhất của doanh nghiệp: thực hiện xác thực quyền thống nhất, quản lý quyền và ghi nhận kiểm toán cho tất cả lời gọi model.
  - SaaS / nền tảng đám mây đa tenant: cần cung cấp cách ly bảo mật và hỗ trợ tuân thủ nghiêm ngặt cho từng khách hàng ở cấp độ logic và vật lý.
  - Giao diện mở cho đối tác / hệ sinh thái: yêu cầu kiểm soát quyền chi tiết và giới hạn quota cho các lời gọi API, đồng thời đáp ứng yêu cầu tuân thủ (như GDPR, v.v.).
- **Nguyên lý**
  - Kiểm soát truy cập & cách ly tenant:
    - Sử dụng API Key / Token / OAuth / SSO để xác thực danh tính.
    - Quản lý quyền chi tiết theo model, tính năng, tần suất gọi và phạm vi dữ liệu thông qua RBAC (kiểm soát truy cập dựa trên vai trò) và ABAC (kiểm soát truy cập dựa trên thuộc tính).
    - Thực hiện cách ly **dữ liệu, log, cấu hình và trọng số model** trong môi trường đa tenant, ngăn chặn truy cập chéo tenant và rò rỉ thông tin.
  - Bảo mật dữ liệu & bảo vệ quyền riêng tư:
    - Áp dụng mã hóa truyền tải TLS, mã hóa lưu trữ và quản lý khóa tập trung (KMS) để đảm bảo an toàn dữ liệu trong quá trình truyền và lưu trữ.
    - Thực thi chính sách ẩn danh hóa log và tối thiểu hóa dữ liệu, chỉ giữ lại thông tin cần thiết cho nghiệp vụ và tối ưu hóa, đồng thời kiểm toán hành vi truy cập.
    - Áp dụng kỹ thuật tăng cường quyền riêng tư (như ẩn danh hóa dữ liệu, differential privacy, federated learning) trong các tình huống cần thiết để giảm thêm rủi ro về quyền riêng tư.
  - Tuân thủ & kiểm toán:
    - Ghi lại toàn bộ dấu vết và thực hiện phê duyệt cho các thao tác quan trọng như phát hành model, thay đổi cấu hình, thay đổi quyền, điều chỉnh chiến lược routing.
    - Ghi nhận metadata có thể truy vết cho mỗi request: nguồn gốc request, phiên bản model, cơ sở quyết định (như tình trạng sử dụng knowledge base / tool call).
    - Đảm bảo thiết kế và vận hành hệ thống tuân thủ các yêu cầu quy định ngành tài chính, y tế, chính phủ cũng như tiêu chuẩn tuân thủ dữ liệu nội địa và xuyên biên giới.
- **Công cụ & Nền tảng**
  - Xác thực danh tính & quản lý quyền:
    - Keycloak, Auth0, Okta, IAM của các nhà cung cấp đám mây (AWS IAM / GCP IAM / Azure AD).
    - OPA (Open Policy Agent) + Rego Policy và các policy engine tương tự, dùng để quản lý và thực thi chính sách thống nhất.
  - API security gateway:
    - Kong, Apigee, Envoy, API Gateway của các nhà cung cấp đám mây, v.v.
  - Bảo mật dữ liệu & khóa:
    - KMS (Key Management Service), HashiCorp Vault.
    - TLS termination, Confidential Computing, v.v.

### 11.5.1 Kiểm Soát Truy Cập & Cách Ly Tenant: Đảm Bảo "Ai Được Dùng, Dùng Gì, Dùng Bao Nhiêu"

Trên nền tảng LLM được nhiều dòng nghiệp vụ, nhiều khách hàng, nhiều vai trò cùng sử dụng, nếu không có kiểm soát truy cập chi tiết và cách ly tenant, rất dễ xảy ra các vấn đề nghiêm trọng như lạm dụng quyền, rò rỉ dữ liệu và tranh chấp tài nguyên. Một hệ thống truy cập & cách ly hoàn chỉnh cần phối hợp trên các chiều sau:

1. **Xác Thực Danh Tính & Đăng Nhập Một Lần (SSO)**
   Thông qua API Key / Token, OAuth2 / OIDC, enterprise SSO, v.v., thực hiện xác thực danh tính thống nhất cho nhân viên nội bộ, đối tác bên ngoài, ứng dụng bên thứ ba. Với người dùng doanh nghiệp, có thể tích hợp với hệ thống danh tính hiện có (như AD / LDAP / enterprise IAM), tránh hệ thống tài khoản trùng lặp.
2. **Kiểm Soát Quyền Chi Tiết (RBAC / ABAC)**
3. RBAC: Cấu hình model có thể truy cập, môi trường (test / production), thao tác (gọi / cấu hình / phát hành) và quota riêng cho các vai trò như admin, kỹ sư thuật toán, vận hành nghiệp vụ, người dùng thông thường, đối tác.
4. ABAC: Trên nền tảng vai trò, đưa thêm các thuộc tính như tenant ID, project ID, data domain, khoảng thời gian để thực hiện chính sách linh hoạt hơn (ví dụ: "chỉ cho phép tenant chính phủ A gọi cụm model nội địa trong local domain").
5. **Cách Ly Đa Tenant & Quản Lý Quota**
   1. Ở cấp độ logic, cách ly lời gọi, dữ liệu và log của các khách hàng khác nhau thông qua tenant ID;
   2. Ở cấp độ vật lý, cung cấp dedicated cluster hoặc dedicated node cho khách hàng tuân thủ cao (như ngân hàng / chính phủ) để đạt mức cách ly cao hơn;
   3. Cấu hình giới hạn QPS, số kết nối đồng thời và quota token cho từng tenant, ngăn tình trạng "một tenant bùng phát kéo sập toàn hệ thống".
6. **Kiểm Toán Truy Cập & Đánh Giá Chính Sách**
   1. Ghi nhận kiểm toán cho các thao tác quan trọng (như tạo / xóa API Key, điều chỉnh quyền, sửa quota);
   2. Dùng các policy engine như OPA / Rego để thống nhất đánh giá và giải thích chính sách truy cập phức tạp trước khi thực thi, giảm rủi ro "chính sách nằm rải rác trong code".

Thông qua cơ chế này, nền tảng có thể mở khả năng LLM cho người dùng nội bộ và bên ngoài trong khi đảm bảo an toàn tài nguyên và dữ liệu, đồng thời cung cấp dữ liệu cơ sở cho kiểm toán tuân thủ và truy cứu trách nhiệm sau này.

### 11.5.2 Bảo Mật Dữ Liệu, Quyền Riêng Tư & Kiểm Toán Tuân Thủ: Giúp Model "Dùng Tốt Mà Vẫn Tuân Thủ"

LLM thường tiếp xúc với lượng lớn dữ liệu nhạy cảm (hội thoại người dùng, tài liệu nghiệp vụ, bản ghi giao dịch, v.v.) — một khi xảy ra sự cố bảo mật hoặc tuân thủ, hậu quả sẽ cực kỳ nghiêm trọng. Do đó, cần "bảo vệ đa lớp" trên toàn bộ vòng đời dữ liệu và toàn chuỗi gọi model.

1. **Bảo Mật Truyền Tải & Lưu Trữ Dữ Liệu**
   1. Bật mã hóa TLS thống nhất cho tất cả giao diện bên ngoài và nội bộ, ngăn chặn nghe lén hoặc giả mạo trong quá trình truyền;
   2. Áp dụng mã hóa lưu trữ tĩnh cho dữ liệu nhạy cảm, kết hợp với KMS của nhà cung cấp đám mây hoặc tự xây dựng để quản lý vòng đời khóa;
   3. Dùng công cụ như Vault để quản lý tập trung các khóa và thông tin xác thực cần thiết để truy cập database, object storage, API bên thứ ba.
2. **Nguyên Tắc Tối Thiểu Hóa & Ẩn Danh Hóa**
   1. Chỉ thu thập các trường dữ liệu cần thiết cho nghiệp vụ, đồng thời cố gắng loại bỏ thông tin nhận dạng cá nhân (PII) và các trường nhạy cảm trong log và mẫu training;
   2. Hash hoặc ẩn danh hóa các identifier buộc phải giữ lại, giảm thiểu rủi ro rò rỉ;
   3. Trong tình huống RAG / knowledge base, phân cấp quyền truy cập tài liệu, đảm bảo model không truy xuất thông tin từ "tài liệu không được phép xem".
3. **Kỹ Thuật Tăng Cường Quyền Riêng Tư & Ràng Buộc Biên**
   1. Trong các tình huống cần chia sẻ model nhưng không chia sẻ dữ liệu gốc, áp dụng differential privacy hoặc federated learning để cân bằng giữa quyền riêng tư và hiệu quả;
   2. Với các tình huống chính phủ, tài chính, y tế, áp dụng mô hình "dữ liệu không rời domain, model được triển khai xuống hoặc triển khai nội địa", đặt năng lực training / inference trong compliance domain.
4. **Cơ Chế Tuân Thủ & Kiểm Toán**
   1. Thực hiện quy trình phê duyệt và ghi lại dấu vết cho các thao tác phát hành model, thay đổi cấu hình, điều chỉnh quyền, thuận tiện cho việc truy vết về sau;
   2. Ghi lại thông tin meta như phiên bản model, bên gọi, quyết định routing, phạm vi truy cập dữ liệu cho mỗi request — có thể tái hiện khi có tranh chấp hoặc yêu cầu điều tra;
   3. Định kỳ xuất báo cáo tuân thủ (như kiểm toán truy cập dữ liệu, bản ghi sử dụng quyền, báo cáo sự kiện bất thường), kết nối với yêu cầu kiểm soát rủi ro nội bộ và giám sát bên ngoài.

Phần năng lực này phối hợp với Data / Model Ops và nền tảng giám sát ở mục 11.3, 11.4, cùng nhau tạo thành môi trường vận hành model "vừa có thể liên tục lặp, vừa an toàn và tuân thủ".
## 11.6 Lớp Ứng Dụng và Năng Lực Nền Tảng (Application Enablers)

Với toàn bộ cơ sở hạ tầng từ training đến inference, bảo mật và vận hành, còn cần thêm một lớp "năng lực" hướng tới doanh nghiệp và lập trình viên — lớp này trừu tượng hóa các LLM nền thành các thành phần và dịch vụ dễ sử dụng hơn, gần với ngữ nghĩa nghiệp vụ hơn. Lớp này thường được gọi là **AI trung tâm, lớp application enabler hoặc nền tảng Copilot**, với nhiệm vụ: đóng gói LLM + RAG + Agent + workflow thành các năng lực tiêu chuẩn hóa, giúp đội ngũ nghiệp vụ và các đối tác sinh thái nhanh chóng xây dựng ứng dụng AI.

Lớp này một đầu kết nối model API, RAG engine và Agent Orchestrator, đầu còn lại kết nối các hệ thống nghiệp vụ như CRM / ERP / OA / hệ thống ticket — đây là cầu nối then chốt từ năng lực mô hình đến bối cảnh nghiệp vụ thực tế.

- **Các tình huống ứng dụng**
  - Nền tảng AI trung tâm / Copilot doanh nghiệp: thống nhất cung cấp các năng lực thông minh như hội thoại, RAG, Agent cho các hệ thống nội bộ CRM, ERP, OA, chăm sóc khách hàng, marketing, R&D.
  - Nền tảng phát triển ứng dụng cho lập trình viên và đối tác sinh thái: thông qua SDK, template sẵn có, công cụ visual orchestration, giúp bên thứ ba nhanh chóng xây dựng và triển khai ứng dụng AI.
  - AI backend cho sản phẩm SaaS ngành dọc: như cloud chăm sóc khách hàng thông minh, cloud marketing, cloud cộng tác văn phòng, cloud quản lý R&D — nhúng năng lực AI vào hệ thống sản phẩm hiện có.
  - Trợ lý theo kịch bản dọc: code Copilot, trợ lý bán hàng, trợ lý vận hành, trợ lý pháp lý, trợ lý y tế — nhanh chóng kết hợp thành giải pháp theo kịch bản cụ thể thông qua năng lực nền tảng.
- **Nguyên lý hoạt động**
  - Năng lực hội thoại và Agent:
    - **Quản lý phiên và bộ nhớ**: duy trì trạng thái hội thoại đa lượt và bộ nhớ dài hạn, hỗ trợ chuyển đổi chủ đề, nén ngữ cảnh và cá nhân hóa hồ sơ người dùng.
    - **Tool Use và điều phối** **workflow**: thông qua cơ chế function calling hoặc plugin, kết nối mô hình với hệ thống bên ngoài (cơ sở dữ liệu, tìm kiếm, API nghiệp vụ, dịch vụ bên thứ ba); trong các tác vụ phức tạp, sử dụng Workflow / Orchestrator để chuỗi hóa nhiều bước thao tác.
    - **Cộng tác đa Agent**: với các tác vụ phức tạp, phân chia thành các vai trò khác nhau (như người lập kế hoạch, người thực thi, người kiểm duyệt), phối hợp để phân rã tác vụ và tổng hợp kết quả.
  - RAG và knowledge base:
    - **Phân tích tài liệu và tiền xử lý**: phân tích, cắt đoạn, cấu trúc hóa các tài liệu PDF, Word, trang web, bản scan.
    - **Vector hóa và truy xuất**: sử dụng Embedding model để vector hóa văn bản / bảng / code, xây dựng vector index; kết hợp truy xuất từ khóa và vector truy xuất để đạt độ recall cao.
    - **RAG và chuỗi bằng chứng**: tại thời điểm inference, trước tiên truy xuất nội dung liên quan từ knowledge base, sau đó LLM sinh câu trả lời dựa trên kết quả truy xuất, đồng thời xuất ra trích dẫn và chuỗi bằng chứng, nâng cao độ chính xác và khả năng giải thích.
    - **Knowledge graph** **và tích hợp tri thức có cấu trúc**: kết hợp knowledge graph theo lĩnh vực, bảng dữ liệu nghiệp vụ, hệ thống quy tắc với LLM, nâng cao khả năng xử lý truy vấn có cấu trúc và ràng buộc phức tạp.
  - Tiếp cận lập trình viên và phát triển thứ cấp:
    - **SDK đa ngôn ngữ và thiết kế** **API**: cung cấp SDK cho Python / JS / Java / Go, đóng gói mẫu gọi, xử lý retry và idempotency.
    - **Template và công cụ** **low-code** **/ no-code**: thông qua template có sẵn và công cụ "lắp ghép" trực quan, cho phép cả người dùng không chuyên về lập trình cũng có thể xây dựng RAG / Agent / Workflow.
    - **Plugin và middleware**: cung cấp plugin hoặc middleware tích hợp với các hệ thống nghiệp vụ phổ biến (CRM / ERP / OA / hệ thống ticket), giảm chi phí tích hợp hệ thống.
- **Các mô hình và công cụ**
  - Framework hội thoại / Agent:
    - LangChain, LlamaIndex, Haystack, Semantic Kernel, v.v.
    - Lớp Orchestration tự phát triển: thường bao gồm Workflow Engine, Tool Router, module quản lý Memory.
  - RAG và vector search:
    - Vector database: FAISS, Milvus, Qdrant, Weaviate, Pinecone, v.v.
    - Phân tích tài liệu: unstructured, Textract, pdfplumber, Apache Tika, v.v.
  - SDK / lớp tiếp cận:
    - SDK chính thức hoặc tự phát triển, thư viện component frontend (component chat, quản lý prompt template, giao diện lịch sử hội thoại).
    - Middleware / plugin tích hợp với hệ thống nghiệp vụ (CRM / ERP / OA / ticket, v.v.).

### 11.6.1 Hội Thoại và Điều Phối Agent: Từ "Bot Hỏi Đáp" Đến "Thực Thể Cộng Tác Tác Vụ"

So với các bot hỏi đáp FAQ thời kỳ đầu, các ứng dụng hiện đại được LLM dẫn dắt giống một "cộng tác viên thông minh biết dùng công cụ" hơn. Mục tiêu của hội thoại và điều phối Agent là nâng cấp LLM từ "bộ tạo ngôn ngữ" thành agent có khả năng **gọi công cụ, thực thi kế hoạch, phối hợp đa vai trò**.

1. **Quản lý hội thoại và cơ chế bộ nhớ**
   1. Duy trì ngữ cảnh hội thoại, hồ sơ người dùng và bộ nhớ dài hạn, đảm bảo tính nhất quán và liền mạch trong nhiều lượt tương tác;
   2. Với hội thoại quá dài, sử dụng tóm tắt, retrieval-based memory để nén, tránh ngữ cảnh "tràn";
   3. Trong ứng dụng doanh nghiệp, đưa thông tin định danh và quyền hạn vào ngữ cảnh hội thoại, đảm bảo câu trả lời và thao tác phù hợp với quyền hạn của người dùng trong hệ thống nghiệp vụ.
2. **Tool Use và điều phối** **workflow**
   1. Cung cấp cho mô hình danh sách công cụ có cấu trúc (như "tra đơn hàng", "tạo ticket", "truy vấn tồn kho", "gọi search engine"), và thông qua interface function calling để mô hình chủ động gọi khi cần;
   2. Dùng Orchestrator để điều phối thứ tự, luồng dữ liệu và xử lý lỗi của nhiều lần gọi công cụ dựa trên kế hoạch mô hình đề xuất;
   3. Mô hình hóa workflow cho các quy trình nghiệp vụ phức tạp (như phê duyệt, hoàn chi phí, xử lý sau bán hàng), để Agent có thể đóng vai "điều phối viên quy trình".
3. **Mô hình cộng tác đa Agent**
   1. Phân rã tác vụ phức tạp thành nhiều vai trò: như "Agent lập kế hoạch tác vụ", "Agent truy xuất thông tin", "Agent thực thi", "Agent kiểm tra / kiểm duyệt";
   2. Thực hiện cộng tác giữa các Agent qua kênh tin nhắn hoặc shared memory, nâng cao độ bền và khả năng giải thích với tác vụ phức tạp;
   3. Trong môi trường doanh nghiệp, có thể đưa vai trò con người vào vòng cộng tác, như "AI soạn thảo – con người kiểm duyệt – AI chỉnh sửa – hệ thống thực thi".

Lớp này thường tận dụng các framework có sẵn như LangChain, Semantic Kernel, LlamaIndex, kết hợp dịch vụ Orchestration tự phát triển, thống nhất hội thoại, công cụ, workflow, quyền hạn và audit trong một "nền tảng Agent" duy nhất.

### 11.6.2 RAG, Knowledge Base và Nền Tảng Lập Trình Viên: Đưa Tri Thức Doanh Nghiệp "Kết Nối Vào Não Mô Hình"

Dù LLM có mạnh đến đâu, cũng không thể tự nhiên nắm giữ tri thức riêng tư của từng doanh nghiệp, càng không thể biết theo thời gian thực các chính sách, sản phẩm và quy tắc nghiệp vụ mới nhất. RAG + knowledge base + nền tảng lập trình viên chính là con đường then chốt để đưa **tri thức doanh nghiệp, tri thức ngành và dữ liệu thời gian thực** vào năng lực mô hình theo cách kỹ thuật hóa.

1. **Phân tích tài liệu và nhập kho tri thức**
   1. Thông qua các thành phần như unstructured, Textract, pdfplumber, Tika, phân tích PDF, tài liệu Office, trang web, bản scan ảnh thành văn bản có cấu trúc;
   2. "Cắt đoạn" theo chương mục, tiêu đề, khối ngữ nghĩa để cung cấp độ hạt phù hợp cho vector hóa và truy xuất tiếp theo;
   3. Với thông tin có cấu trúc như dữ liệu bảng, cơ sở dữ liệu nghiệp vụ, tài liệu API, xây dựng ánh xạ schema tương ứng và interface truy cập.
2. **Vector hóa, indexing và reranking truy xuất**
   1. Sử dụng Embedding model chuyển văn bản / code / nội dung đa phương thức thành vector, lưu vào các vector database như FAISS, Milvus, Qdrant, Weaviate, Pinecone;
   2. Đồng thời giữ lại năng lực lọc theo từ khóa và metadata (như lọc theo tenant, phòng ban, loại tài liệu), kết hợp thành quy trình "lọc trước truy xuất + semantic search + reranking" độ chính xác cao;
   3. Tại thời điểm truy vấn, đưa kết quả truy xuất cùng câu hỏi gốc vào LLM, thực hiện "retrieval augmented generation (RAG)", trả về trích dẫn và chuỗi bằng chứng.
3. **Template ứng dụng RAG và công cụ** **low-code**
   1. Cung cấp template RAG có sẵn cho các kịch bản phổ biến (hỏi đáp tri thức, giải thích chính sách, hướng dẫn sản phẩm, trợ lý tài liệu nội bộ, v.v.);
   2. Thông qua giao diện cấu hình trực quan (chọn nguồn tri thức, thiết lập quy tắc cắt đoạn, chọn vector model và LLM) nhanh chóng xây dựng trợ lý tri thức chuyên biệt;
   3. Bộc lộ các năng lực này dưới dạng SDK cho lập trình viên, hỗ trợ nhúng nhanh vào Web, mobile, desktop hoặc plugin hệ thống nghiệp vụ.
4. **Nền tảng lập trình viên và tích hợp sinh thái**
   1. Cung cấp SDK cho Python / JS / Java / Go, cùng các component frontend (bong bóng chat, khu vực trích dẫn tài liệu, nút phản hồi), giảm ngưỡng tích hợp;
   2. Cung cấp plugin hoặc middleware cho các hệ thống nghiệp vụ chủ lưu (CRM / ERP / OA / ticket), cho phép "tick vài mục cấu hình" là tiếp cận được năng lực AI;
   3. Mở nền tảng phát triển ứng dụng ra bên ngoài, để các đối tác sinh thái xây dựng ứng dụng ngành của mình dựa trên model nền, năng lực RAG và Agent, hình thành vòng phản hồi tích cực "nền tảng – sinh thái – khách hàng cuối".

Lớp này cuối cùng đóng gói các năng lực mô hình và cơ sở hạ tầng phức tạp thành "các thành phần nghiệp vụ có thể tái sử dụng, có thể lắp ghép", giúp doanh nghiệp trong điều kiện **an toàn, tuân thủ, kiểm soát chi phí**, với ngưỡng thấp hơn và tốc độ nhanh hơn, thực sự biến LLM thành công cụ năng suất thúc đẩy đổi mới nghiệp vụ.
