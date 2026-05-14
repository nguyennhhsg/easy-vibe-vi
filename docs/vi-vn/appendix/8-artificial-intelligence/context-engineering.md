# Kỹ thuật quản lý ngữ cảnh
> 💡 **Hướng dẫn học tập**: Kỹ thuật viết lời nhắc giải quyết câu hỏi "làm sao để nói rõ ràng", còn kỹ thuật quản lý ngữ cảnh giải quyết câu hỏi "làm sao để mô hình thấy được thông tin phù hợp tại đúng thời điểm phù hợp". Chương này sẽ xoay quanh một câu hỏi: **trong cửa sổ ngữ cảnh có hạn, làm sao để mô hình hiểu bạn mà không phải chi quá nhiều tiền?**

Trước khi bắt đầu, bạn nên bổ sung hai "viên gạch nền tảng":

- **Token là gì**: Bạn có thể đọc phần "Tokenization & Token" trong [Giới thiệu về mô hình ngôn ngữ lớn](./llm-intro.md).
- **Prompt là gì**: Nếu bạn chưa quen với cấu trúc cơ bản của System / User / Assistant, bạn có thể xem [Kỹ thuật viết lời nhắc](./prompt-engineering/).

---

## 0. Lời mở đầu: Tại sao nó lại quên chuyện, và càng lúc càng đắt?

<AgentContextFlow />

Nhiều người khi sử dụng mô hình ngôn ngữ lớn thực tế đều gặp phải tình huống tương tự:

- Nói chuyện được nửa chừng, mô hình đột nhiên "quên" những điều kiện quan trọng được đề cập trước đó;
- Trong cuộc trò chuyện dài, câu trả lời trước sau mâu thuẫn, khó giữ lại một bộ cài đặt nhất quán;
- Càng nhiều vòng trao đổi, hóa đơn tăng lên như tính tiền taxi.

Theo trực giác, chúng ta sẽ nghĩ: **"Mô hình này có trí nhớ kém"**.
Nhưng hầu hết thời gian, vấn đề không phải ở việc mô hình "không nhớ", mà là chúng ta **chưa thiết kế tốt ngữ cảnh mà nó có thể thấy được**.

<IntroProblemReasonSolution />

Đối mặt với những thách thức này, chỉ "viết tốt lời nhắc" đã không còn đủ. Chúng ta cần một phương pháp kỹ thuật hệ thống hơn để trong cửa sổ hạn chế và ngân sách nhất định, mô hình luôn nhận được thông tin quan trọng nhất. Đây chính là vấn đề mà **kỹ thuật quản lý ngữ cảnh** cố gắng giải quyết.

---

## 1. "Kỹ thuật quản lý ngữ cảnh" là gì? (Định nghĩa + Tình huống)

Trước tiên hãy cho một định nghĩa công việc ngắn gọn, rồi xem vài tình huống điển hình.

> Kỹ thuật quản lý ngữ cảnh là một phương pháp kỹ thuật để xây dựng và quản lý "môi trường thông tin" cho LLM, quyết định mô hình "nhìn thấy gì, bỏ qua gì, khi nào thấy", từ đó hoàn thành nhiệm vụ ổn định trong cửa sổ ngữ cảnh có hạn.

Bạn có thể hiểu đơn giản nó là ba việc: sắp xếp thông tin, kiểm soát cửa sổ, quản lý chi phí.  
Những tình huống phổ biến cần dùng nó bao gồm:

- Agent hội thoại và chatbot dịch vụ khách hàng
- Trợ lý mã / tài liệu
- Gọi công cụ đa vòng và sắp xếp quy trình dài

Tiếp theo, chúng ta sẽ bắt đầu từ "bài học đau thương" của một nhóm thực tế, xem họ dần dần tiến hóa từ "chỉ biết viết Prompt" thành "biết làm kỹ thuật quản lý ngữ cảnh".

---

## 2. Bắt đầu từ "bài học đau thương": Những sai lầm mà nhóm Manus đã gặp

Các ví dụ trong chương này đến từ **Manus** (một Agent AI đa năng).
Khác với hội thoại bình thường, Manus cần tự động lên kế hoạch và gọi công cụ để hoàn thành các tác vụ dài (liên quan đến hàng chục thậm chí hàng trăm vòng tương tác).

Điều này đặt ra một mâu thuẫn cốt lõi:
- **Nếu không nhớ**: Thông tin quan trọng bị mất, tác vụ bị gián đoạn.
- **Nhớ hết**: Chi phí và độ trễ tăng vọt, thậm chí vượt quá giới hạn cửa sổ.

Nhóm Manus đã trải qua nhiều lần tái cấu trúc kiến trúc, mới hiểu một điều: **Ngữ cảnh không thể chỉ dựa vào "viết", mà phải dựa vào "thiết kế".**

### 2.1 Bốn lần tái cấu trúc dạy chúng ta điều gì?

Người đồng sáng lập Manus, T季逸超 đã chia sẻ "lịch sử sai lầm" của họ:

| Giai đoạn | Vấn đề gặp phải | Suy nghĩ lúc bấy giờ | Kết quả |
| :--- | :--- | :--- | :--- |
| **Lần đầu** | AI nói chuyện rồi quên | "Viết thêm lời nhắc thôi" | Viết càng dài, chi phí càng cao |
| **Lần hai** | Thông tin quan trọng bị loại bỏ | "Sao không copy thông tin quan trọng vài lần" | Văn bản dài hơn, chi phí cao hơn |
| **Lần ba** | Hóa đơn cao đến kinh hoàng | "Có cách nào tái sử dụng tính toán trước đó không?" | Tìm được cách giảm chi phí tính toán lặp lại |
| **Lần bốn** | Không thể xử lý tài liệu dài | "Có cách nào truy vấn khi cần không?" | Lập kế hoạch "thư viện + truy vấn theo nhu cầu" |

**Nhận thức cốt lõi**: **Không phải nhớ càng nhiều càng tốt, mà nhớ càng khéo càng tốt**.

### 2.2 "Trí nhớ" của AI thực sự giống cái gì?

**Bộ nhớ của máy tính truyền thống** = **Ổ cứng**:
- Dung lượng lớn: có thể lưu trữ lâu dài lượng dữ liệu lớn;
- Giá thành thấp: chi phí lưu trữ một năm tương đối thấp;
- Tốc độ đọc/ghi tương đối chậm, tìm kiếm thông tin cần thời gian.

**Ngữ cảnh của AI** = **Bảng đen nhỏ**:
- Đọc/ghi nhanh: mô hình có thể thấy trực tiếp toàn bộ ngữ cảnh trong một lần gọi;
- Dung lượng có hạn: sau khi đầy sẽ phải xóa nội dung cũ;
- Mỗi token được viết lên sẽ tạo ra tính toán và chi phí bổ sung.

**Kinh nghiệm của Manus**: **Bảng đen phải dùng tiết kiệm, dùng khéo, đừng dùng để lưu trữ bách khoa toàn thư**.

---

## 3. Bước thứ nhất: Nhận thức chi phí - Mỗi đồng tiền của bạn chi cho đâu?

### 3.1 Tại sao phải xem chi phí trước?

Hãy xem một cuộc hội thoại AI điển hình, tiền của bạn được chi như thế nào:

```
💰 Cấu trúc chi phí (một cuộc hội thoại):
├─ 70% Xem lại nội dung cũ ("Chúng ta vừa nói về cái gì?")
├─ 20% Xử lý nội dung mới ("Bây giờ nói về cái gì?")  
└─ 10% Tạo phản hồi ("Làm sao trả lời?")
```

**Khám phá đáng kinh ngạc**: **70% tiền đi vào việc để AI xem lại những gì bạn đã nói trước đó!**

### 3.2 KV Cache là gì? (Tái sử dụng tiền tố)

Trước khi bàn giá cả, chúng ta phải hiểu một khái niệm công nghệ cốt lõi: **KV Cache (bộ nhớ đệm khóa-giá trị)**.
Đừng sợ thuật ngữ kỹ thuật này, nó chỉ là "bảng tra cứu trí nhớ ngắn hạn" của AI.

- **Khi không có KV Cache**: AI mỗi lần phải như lần đầu tiên nhìn thấy bài viết này vậy, từ chữ cái đầu tiên bắt đầu đọc lại, hiểu, tính toán.
- **Khi có KV Cache**: AI sẽ lưu lại kết quả tính toán của phần đã xem (Pre-fill). Lần tới nếu nội dung đầu không thay đổi, nó sẽ lấy trực tiếp từ trí nhớ, không cần tính lại.

Điều này giống như:
> Bạn đi thi kỳ thi.
> **Tình huống A**: Mỗi lần phải đọc toàn bộ sách giáo khoa từ đầu, rồi mới bắt đầu trả lời. (chậm, mệt, đắt)
> **Tình huống B**: Nội dung sách bạn đã thuộc lòng (Cache), ngồi xuống trả lời luôn. (nhanh, dễ nhàn, rẻ)

Trong bảng tính tiền của nhà cung cấp đám mây, **"sách đã thuộc"(Cache Hit)** thường rẻ **90% trở lên** so với **"sách mới xem"(Cache Miss)**.

### 3.3 "Thuộc lòng bài học" so với "tìm kiếm khi cần" về giá cả

Lấy Claude làm ví dụ:
- **Tìm kiếm khi cần** (không có bộ nhớ đệm): $3.00 / triệu từ
- **Thuộc lòng rồi dùng** (có bộ nhớ đệm): $0.30 / triệu từ  
- **Chênh lệch 10 lần**!

**Thực hành của Manus**: Bằng cách để AI "thuộc bài học", họ đã giảm chi phí từ **$0.15 xuống $0.02**, **tiết kiệm 87%**!

<ContextWindowVisualizer />

### 3.4 Hướng dẫn tránh sai lầm: Đừng để dấu thời gian phá hủy "bộ nhớ đệm" của bạn

Nhiều lập trình viên có thói quen viết "thời gian hiện tại" vào câu đầu tiên của System Prompt, cảm thấy điều này rất có tính chuyên nghiệp.
**Nhưng đây thực ra là một trong những phản mẫu lớn nhất trong kỹ thuật quản lý ngữ cảnh.**

Hãy tưởng tượng: bạn thuộc lòng một cuốn sách lịch sử nguyên (System Prompt), kết quả dòng đầu tiên được viết "giây hiện tại".
Nếu dòng này thay đổi mỗi giây, thì tất cả nội dung mà bạn thuộc được giây trước sẽ hết hạn giây sau -- bạn phải bắt đầu lại từ đầu.

Đây chính là "mẹo" của **tái sử dụng tiền tố (KV Cache)**: **Chỉ cần phần đầu thay đổi, phần sau 99% phải tính lại.**

#### Ví dụ sai: Đặt thông tin động ở trước
```text
System: Bây giờ là 2024-01-01 12:00:01. Bạn là trợ lý...
(một phút sau)
System: Bây giờ là 2024-01-01 12:01:01. Bạn là trợ lý...
```
**Hậu quả**: Mặc dù chỉ thay đổi vài ký tự, nhưng vì nằm ở đầu, nên 99% nội dung cố định phía sau không thể tái sử dụng bộ nhớ đệm, mỗi yêu cầu đều như lần đầu tiên vậy chậm và đắt.

#### Cách làm đúng: Tách thông tin động và tĩnh
```text
System: Bạn là trợ lý... (đặt ở đây vài nghìn từ quy tắc cố định, kho kiến thức)
User: (truyền thời gian hiện tại vào đây thông qua gọi công cụ hoặc tin nhắn người dùng)
```
**Lợi ích**: Các quy tắc vài nghìn từ ở phía trước không bao giờ thay đổi, AI chỉ cần "thuộc" một lần. Các yêu cầu tiếp theo gọi trực tiếp trí nhớ, tốc độ cực nhanh.

👇 **Thử thao tác**: 
Nhấn vào công tắc dưới đây để kích hoạt **"tăng tốc độ bằng cách thuộc bài"**, sau đó nhấp nhiều lần "Gửi yêu cầu mới".
Quan sát một lúc: khi khối nội dung đầu tiên trở thành "đã thuộc", tốc độ bắt đầu phát ra (TTFT) sẽ thay đổi như thế nào?

<KVCacheDemo />

---

## 4. Bước thứ hai: Cửa sổ trượt - Khi "trí nhớ" trở thành "chi phí"

Khi cuộc hội thoại ngày càng dài, vấn đề đầu tiên gặp phải là: **cửa sổ đầy rồi thì sao?**

### 4.1 Tại sao "vào trước, ra trước" lại gây vấn đề?

Cách quản lý trí nhớ đơn giản nhất là **cửa sổ trượt (Sliding Window)**: **cái mới vào, cái cũ ra ngoài**.
Điều này nghe có vẻ công bằng, nhưng thực tế lại là thảm họa.

**Tái hiện tình huống**:
```text
Lịch sử hội thoại:
[1] Người dùng: Tôi là Trần Ba, chịu trách nhiệm về hệ thống thanh toán  
[2] Người dùng: Dự án dùng ngôn ngữ Go
[3] Người dùng: Cơ sở dữ liệu là PostgreSQL
...
[20] Người dùng: Viết giúp tôi một API
```
**Kết quả**: Khi nói chuyện đến câu 20, câu 1 "Tôi là Trần Ba" đã bị đẩy ra khỏi cửa sổ. AI hoàn toàn quên bạn là ai, cũng không biết bạn chịu trách nhiệm về hệ thống gì.

**Bản chất vấn đề**: Chiến lược này coi **thông tin quan trọng** (danh tính, công nghệ stack) và **chuyện nhảm nhí** ("được rồi", "biết rồi") như nhau, cùng bị đuổi ra ngoài.

### 4.2 "Quên mất ở giữa" - Tại sao AI lại không thấy thông tin quan trọng?

Ngoài "quên nhanh", AI còn có một thói quen lạ: **nó cũng sẽ "bỏ sót"**.
Các nghiên cứu chỉ ra: **AI nhạy cảm nhất với đầu và cuối, dễ bỏ qua phần giữa nhất**. Đây chính là hiện tượng nổi tiếng **Lost in the Middle (Mất ở giữa)**.

**Đường cong nhớ hình chữ U**:
```text
Vị trí: Đầu → Giữa → Cuối
Trí nhớ: Cao → Thấp → Cao
```

👇 **Thử thao tác**: 
1. Trước tiên hãy thử **"cửa sổ trượt"**: trong hộp trò chuyện dưới đây gửi vài tin nhắn, xem những cuộc nói chuyện cũ bị "đẩy ra" như thế nào.
2. Rồi xem **"mất ở giữa"**: quan sát một lúc, khi thông tin quan trọng nằm ở giữa toàn bộ đoạn văn, tỷ lệ truy vấn thành công có phải thấp nhất không?

<SlidingWindowDemo />
<LostInMiddleDemo />

**Giải pháp**: Đặt thông tin quan trọng ở **đầu** (lời nhắc hệ thống) hoặc **cuối** (câu hỏi người dùng).

---

## 5. Bước thứ ba: Giữ lại có chọn lọc - Làm sao "dán chặt" thông tin quan trọng?

Vì "vào trước ra trước" không đáng tin, chúng ta nên làm gì?
Câu trả lời của Manus là: **lập "hệ thống phân cấp thông tin"**.

### 5.1 Tại sao phải phân cấp thông tin?

Không coi mọi thông tin như nhau nữa, mà quyết định giữ hay bỏ dựa trên mức độ quan trọng:

| Cấp độ | Loại thông tin | Đối xử | Ảnh hưởng chi phí |
| :--- | :--- | :--- | :--- |
| **VIP** | Cài đặt hệ thống, danh tính người dùng | **Luôn giữ lại** | +15% chi phí |
| **Quan trọng** | Mục tiêu tác vụ hiện tại | **Giữ lại trong suốt tác vụ** | +10% chi phí |
| **Thường** | Lịch sử hội thoại bình thường | **Giữ lại 5 vòng gần nhất** | Chi phí cơ sở |
| **Có thể bỏ** | Kiến thức có thể truy vấn | **Truy vấn khi cần** | -60% chi phí |

**Ý tưởng cốt lõi**: **Dùng tăng thêm 25% chi phí, đổi lấy giữ lại 90% thông tin quan trọng**.

### 5.2 Chiến lược "dán chặt"

Bạn có thể tưởng tượng cửa sổ ngữ cảnh như một bảng đen:
- **Thông tin VIP**: Dùng đinh **dán chặt** ở trên cùng của bảng (System Prompt).
- **Thông tin quan trọng**: Dùng nam châm **hút vào** giữa bảng (Context Injection).
- **Hội thoại bình thường**: Viết ở nửa dưới bảng, đầy rồi xóa cái cũ (Sliding Window).

👇 **Thử thao tác**: 
Thử "dán chặt" một câu hội thoại quan trọng vào bảng dưới đây.
Quan sát một lúc: khi bạn tiếp tục nói chuyện, thông tin được dán chặt có vẫn ở đó không, còn những cái không dán chặt thì bị đẩy ra ngoài không?

<SelectiveContextDemo />

---

## 6. Bước thứ tư: RAG - Khi "trí nhớ" cần "thư viện"

Đôi khi, thông tin chúng ta phải xử lý quá nhiều (ví dụ như vài trăm trang tài liệu kỹ thuật), bảng đen không đủ chỗ. Lúc này cần ngoại công lớn -- **RAG (Retrieval-Augmented Generation, Tạo thế hệ được tăng cường bằng truy vấn)**.

### 6.1 Tại sao "bảng đen nhỏ" không đủ?

Khi Manus đối mặt với tài liệu cấp độ triệu từ, họ so sánh hai cách làm:

1.  **Viết hết vào**: Tất cả nội dung một lần cho vào ngữ cảnh.
    *   **Hậu quả**: Bảng đen chưa kịp lấy hết, xử lý cực chậm, lại theo lý thuyết "mất ở giữa", AI hoàn toàn không nhớ phần giữa.
    *   **Chi phí**: Khoảng $50/lần, chờ 15 giây.
2.  **Truy vấn theo nhu cầu (RAG)**: Trước tiên đi vào thư viện (cơ sở dữ liệu) tìm, chỉ chép vào bảng đen những đoạn liên quan.
    *   **Hậu quả**: Bảng đen sạch sẽ, AI tập trung vào thông tin quan trọng.
    *   **Chi phí**: Khoảng $0.5/lần, chờ 2 giây.

**Tiết kiệm 99% tiền, 87% thời gian!**

### 6.2 "Tìm tài liệu" theo cách tốt nhất

Kinh nghiệm tổng hợp của Manus:
*   **Mỗi cuốn sách xé thành mấy miếng?** 500-1000 từ hiệu quả nhất.
*   **Một lần tìm vài cuốn sách?** 3-5 cuốn, nhiều hơn lại gây bứn.
*   **Cuốn sách liên quan bao nhiêu mới tìm?** Độ tương tự > 0.7, tránh "cắt ghép" nội dung không liên quan.

👇 **Thử thao tác**: 
Nhập vào hộp tìm kiếm câu hỏi (ví dụ "Làm sao để đặt lại mật khẩu"), xem hệ thống làm sao để từ một đống tài liệu chỉ tìm ra vài điều liên quan nhất.

<RAGSimulationDemo />

---

## 7. Bước thứ năm: Nén - Làm sao để "bảng đen nhỏ" viết được dặc hơn?

Nếu mọi thông tin đều quan trọng, xóa không được, lại không muốn tìm tài liệu thì sao?
Thì chỉ còn cách **viết chữ nhỏ hơn** -- đó là **nén ngữ cảnh**.

### 7.1 Khi nào cần "viết tắt"?
*   Tài liệu truy vấn được quá dày (>2000 từ).
*   Lịch sử hội thoại quá啰嗦 (chiếm >80% không gian bảng).
*   Cần trả lời nhanh, không muốn để AI đọc những bài viết dài.

### 7.2 Ba tầng của "viết tắt"

| Cách nén | Tỷ lệ nén | Giữ lại gì | Tình huống dùng | Tiết kiệm tiền |
| :--- | :--- | :--- | :--- | :--- |
| **Tóm tắt** | 70% | Ý chính | Tìm hiểu nhanh | Tiết kiệm 30% |
| **Điểm chính** | 50% | Điểm mấu chốt | Kết quả có cấu trúc | Tiết kiệm 50% |
| **Bảng** | 30% | Dữ liệu cốt lõi | Xử lý bằng máy | Tiết kiệm 70% |

👇 **Thử thao tác**: 
Chọn các chiến lược nén khác nhau, xem những bài viết dài dòng như thế nào trở thành ngắn gọn, tinh tế.

<ContextCompressionDemo />

---

## 8. Tích hợp hệ thống: Xây dựng "cung điện trí nhớ" cho AI

Trước đây chúng ta như xây dựng bằng khối, học hỏi các chiến lược riêng biệt:
*   **KV Cache**: Giúp chúng ta tiết kiệm tiền (Chương 3)
*   **Cửa sổ trượt**: Giúp chúng ta giải phóng chỗ (Chương 4)
*   **Phân cấp giữ lại**: Giúp chúng ta giữ điểm quan trọng (Chương 5)
*   **RAG**: Giúp chúng ta cắm ngoại công (Chương 6)

Bây giờ là lúc xây dựng những khối này thành một lâu đài hoàn chỉnh -- chúng tôi gọi nó là **"cung điện trí nhớ"** của Manus.

### 8.1 Lắp ráp ngữ cảnh như xây nhà

Đừng coi ngữ cảnh như một đống chữ lộn xộn, mà hãy coi nó như một tòa nhà phân tầng. Mỗi tầng đều có chức năng riêng và "quy tắc sinh sống" riêng.

👇 **Thử thao tác**: 
Nhấp "Bắt đầu xây dựng", xem chúng ta làm sao để từng tầng dựa tòa lâu đài này.

<MemoryPalaceDemo />

### 8.2 Tại sao thiết kế này mạnh nhất?

Triết lý thiết kế của tòa lâu đài này, thực ra chỉ để giải quyết ba mâu thuẫn:

1.  **Nền tảng (System Prompt) -- Giải quyết vấn đề "đắt"**
    *   **Mâu thuẫn**: Cài đặt hệ thống (bạn là ai, quy tắc là gì) dài nhất, mỗi lần phải gửi.
    *   **Giải pháp**: Đặt ở tầng dưới cùng, dùng công nghệ **KV Cache**, miễn là không thay đổi, AI có thể "thuộc bài" toàn bộ. Các cuộc hội thoại tiếp theo hàng trăm vòng, chi phí tính toán phần này gần như **0**.

2.  **Cột trụ (Task Context) -- Giải quyết vấn đề "quên"**
    *   **Mâu thuẫn**: Cuộc hội thoại một khi kéo dài, AI dễ quên mục tiêu tác vụ lúc đầu (ví dụ "viết một trò chơi rắn").
    *   **Giải pháp**: Dùng chiến lược **phân cấp giữ lại**, "dán chặt" mục tiêu tác vụ vào tầng hai. Bất kể nói chuyện bao nhiêu vòng, tầng này không bao giờ xóa, đảm bảo AI không quên mục đích ban đầu.

3.  **Tầng trên (Chat & RAG) -- Giải quyết vấn đề "bừa"**
    *   **Mâu thuẫn**: Vừa có hội thoại mới, vừa có tài liệu tìm được, trộn vào nhau dễ bị lẫn.
    *   **Giải pháp**: 
        *   **Phòng khách (hội thoại)**: Dùng **cửa sổ trượt** quản lý, chỉ giữ lại 5-10 câu nóng hổi gần nhất.
        *   **Thư viện (RAG)**: Tài liệu dùng xong là đi, không chiếm chỗ.

### 8.3 Hiệu quả thực chiến

Nhóm Manus khi đưa kiến trúc này lên production, hiệu quả xuất hiện tức thì:

*   **Tiết kiệm tiền**: Vì nền tảng đã được "thuộc" lại, chi phí mỗi vòng hội thoại giảm sâu **84%**.
*   **Nhanh hơn**: AI không cần mỗi lần đọc lại vài nghìn từ cố định, thời gian phản hồi trung bình từ 8 giây rút ngắn lên **2 giây**.
*   **Chính xác hơn**: Thông tin quan trọng được "dán chặt", không bao giờ quên lấy mình là ai, cũng không quên mình đang làm gì.

---

## 9. Mẫu thực chiến: Sao chép bài làm

Để bạn hiểu rõ hơn cách cơ chế này hoạt động, chúng tôi đã chuẩn bị **mô phỏng toàn quy trình**.

Vui lòng chọn một tình huống, nhấp "Bước tiếp", xem từ người dùng phát câu hỏi cho đến AI trả lời trong vài giây, **cung điện trí nhớ** làm sao để động động tìm kiếm, lắp ráp và làm sạch ngữ cảnh.

<MemoryPalaceActionDemo />

### 📝 Mẫu thực chiến sẵn dùng

Nếu bạn sắp thiết kế một hệ thống như Manus, đừng chỉ nhìn Prompt viết như thế nào, mà hãy để ý **kiến trúc hệ thống làm sao để điều phối ngữ cảnh**.

Dưới đây là **bản thiết kế hệ thống** của hai **tình huống điển hình**, bao gồm **thiết kế lời nhắc** và **logic mã (pseudocode)**.

#### Tình huống 1: Agent kỹ sư toàn stack (loại trí nhớ dài hạn)
> **Thách thức cốt lõi**: Chu kỳ tác vụ dài, dễ quên yêu cầu ban đầu và bối cảnh dự án.
> **Chiến lược giải quyết**: Tầng System (danh tính) + Tầng Task (dán chặt mục tiêu) + Tầng Chat (cửa sổ trượt).

**1. Lời nhắc hệ thống (Tầng 1 & 2)**
```markdown
# Tầng 1: Cài đặt danh tính (System Prompt) - Không bao giờ thay đổi, dùng KV Cache
Bạn là một kỹ sư toàn stack kỳ cựu, thành thạo Python và Vue3.
Phong cách mã:
- Đặt tên biến tuân thủ nghiêm ngặt PEP8
- Logic quan trọng phải có chú thích
- Ưu tiên dùng công cụ đã có trong dự án

# Tầng 2: Khóa tác vụ (Task Context) - Không được xóa trong suốt tác vụ
Tác vụ hiện tại: Tái cấu trúc mô-đun thanh toán (payment_module)
Ràng buộc cốt lõi:
1. Phải tương thích với API cũ phiên bản v1.0
2. Script di chuyển cơ sở dữ liệu phải có tính lũy đẳng
3. Hạn chót: Cuối tuần này
```

**2. Logic lắp ráp ngữ cảnh (Pseudo-Code)**
```python
def build_engineer_context(user_input, chat_history, task_info):
    context = []
    
    # 1. Tầng nền: Cài đặt danh tính (dùng KV Cache bộ nhớ đệm)
    # Phần nội dung này vài trăm vòng hội thoại không thay đổi, chi phí tính toán gần như 0
    context.append(SYSTEM_PROMPT)
    
    # 2. Tầng cột: Khóa tác vụ (Pinned)
    # Bất kể hội thoại bao lâu, phần này luôn được chèn vào sau System
    context.append(f"Tác vụ hiện tại: {task_info}")
    
    # 3. Tầng truy vấn: Đoạn mã (RAG)
    # Dựa vào câu hỏi người dùng, đi tìm mã liên quan trong kho mã
    relevant_code = search_codebase(user_input)
    if relevant_code:
        context.append(f"Mã tham khảo:\n{relevant_code}")
    
    # 4. Tầng tương tác: Lịch sử hội thoại (Sliding Window)
    # Chỉ lấy 10 vòng gần nhất, tránh vượt quá ngữ cảnh
    recent_chat = chat_history[-10:] 
    context.extend(recent_chat)
    
    # 5. Nhập cuối cùng
    context.append(user_input)
    
    return context
```

#### Tình huống 2: Agent dịch vụ khách hàng thông minh (loại trả lời chính xác)
> **Thách thức cốt lõi**: Nhạy cảm chi phí, và tuyệt đối không được nói linh tinh.
> **Chiến lược giải quyết**: Tầng System (ràng buộc mạnh) + Tầng RAG (chèn động).

**1. Lời nhắc hệ thống (Tầng 1)**
```markdown
# Tầng 1: Cài đặt danh tính (System Prompt)
Bạn là một nhân viên dịch vụ khách hàng thương mại điện tử chuyên nghiệp.
Nguyên tắc trả lời:
1. Tone giọng nhẹ nhàng, chuyên nghiệp, ngắn gọn
2. **Tuyệt đối cấm** tìm từng câu, chỉ trả lời dựa trên [tài liệu tham khảo]
3. Nếu không có trong tài liệu, hãy trả lời trực tiếp "Rất tiếc, câu hỏi này tôi cần chuyển tiếp nhân viên hỗ trợ con người"
```

**2. Logic lắp ráp ngữ cảnh (Pseudo-Code)**
```python
def build_support_context(user_input):
    context = []
    
    # 1. Tầng nền: Cài đặt danh tính
    context.append(SYSTEM_PROMPT)
    
    # 2. Tầng thư viện: Truy vấn động (RAG)
    # Chỉ có tình huống dịch vụ khách hàng, RAG mới là nhân vật chính, đặt giữa
    docs = vector_db.search(user_input, top_k=3)
    
    context.append("【Bắt đầu tài liệu tham khảo】")
    for doc in docs:
        context.append(doc.content)
    context.append("【Kết thúc tài liệu tham khảo】")
    
    # 3. Tầng tương tác: Lịch sử rất ngắn
    # Dịch vụ khách hàng thường không cần nhớ quá lâu, giữ lại 3 vòng gần nhất thôi
    context.extend(get_recent_chat(limit=3))
    
    context.append(user_input)
    
    return context
```

---

## 10. Bảng thuật ngữ đối chiếu

| Thuật ngữ tiếng Anh | Dịch tiếng Việt | Giải thích |
| :--- | :--- | :--- |
| **Context Window** | Cửa sổ ngữ cảnh | Độ dài tối đa của văn bản mà mô hình có thể xử lý một lần (bao gồm đầu vào và đầu ra). Nội dung vượt quá sẽ bị cắt ngắn hoặc bị lãng quên. |
| **Token** | Từ tố / Token | Đơn vị nhỏ nhất mà LLM xử lý văn bản. Thường 1 Token xấp xỉ 0.75 từ tiếng Anh hoặc 0.5 ký tự tiếng Trung. Tính phí và giới hạn cửa sổ đều dùng đơn vị này. |
| **KV Cache** | Bộ nhớ đệm KV | Một công nghệ tăng tốc độ suy luận, bằng cách bộ nhớ đệm các cặp khóa-giá trị chú ý đã tính, tránh tính lại tiền tố lặp lại, giảm đáng kể độ trễ và chi phí. |
| **RAG** | Tạo thế hệ được tăng cường bằng truy vấn | Trước khi trả lời câu hỏi, trước tiên truy vấn thông tin liên quan từ kho kiến thức bên ngoài, làm ngữ cảnh cho mô hình, giảm ảo tưởng và mở rộng ranh giới kiến thức. |
| **Sliding Window** | Cửa sổ trượt | Chiến lược quản lý ngữ cảnh cơ bản nhất. Giữ số lượng Token trong cửa sổ không đổi, khi nội dung mới vào, tự động loại bỏ nội dung cũ nhất. |
| **Lost in Middle** | Mất ở giữa | Một hạn chế của mô hình ngôn ngữ lớn. Các nghiên cứu chỉ ra mô hình nhớ sâu nhất thông tin ở đầu và cuối ngữ cảnh, dễ bỏ sót thông tin ở giữa. |
| **System Prompt** | Lời nhắc hệ thống | Chỉ dẫn ở vị trí đầu đối thoại, dùng để cài đặt danh tính mô hình, chuẩn mực hành vi, phong cách phản hồi và tác vụ cốt lõi. |
| **Few-shot** | Học từ vài mẫu | Trong lời nhắc cung cấp vài mẫu "câu hỏi-câu trả lời", giúp mô hình nhanh chóng hiểu mô hình tác vụ và định dạng đầu ra. |
| **Chain of Thought** | Chuỗi suy nghĩ | Hướng dẫn mô hình trước khi đưa ra câu trả lời cuối cùng, trước tiên xuất bước suy luận. Phương pháp này có thể nâng cao đáng kể khả năng của mô hình trong việc giải quyết logic phức tạp và các vấn đề toán học. |
| **Hallucination** | Ảo tưởng | Hiện tượng mô hình tự tin sinh ra thông tin có vẻ hợp lý nhưng thực ra sai hoặc không tồn tại. |
| **Embedding** | Vectơ hóa / Nhúng | Công nghệ chuyển đổi văn bản thành vectơ số chiều cao. Văn bản có ngữ nghĩa tương tự có khoảng cách gần nhất trong không gian vectơ, là nền tảng cho tìm kiếm ngữ nghĩa. |
| **Vector DB** | Cơ sở dữ liệu vectơ | Cơ sở dữ liệu chuyên dùng để lưu trữ và truy vấn dữ liệu vectơ. Hỗ trợ tìm kiếm bằng độ tương tự để nhanh chóng tìm ra đoạn tài liệu phù hợp nhất với truy vấn. |
| **Temperature** | Nhiệt độ | Siêu tham số kiểm soát tính ngẫu nhiên của đầu ra mô hình. Giá trị càng cao (ví dụ 0.8) đầu ra càng đa dạng, sáng tạo; giá trị càng thấp (ví dụ 0.2) đầu ra càng xác định, khác. |
| **TTFT** | Độ trễ từ đầu tiên | Time to First Token, thời gian từ khi người dùng gửi yêu cầu cho đến khi mô hình xuất Token đầu tiên, là chỉ tiêu quan trọng đánh giá trải nghiệm tương tác. |

---

## Kết luận: Bản chất của kỹ thuật quản lý ngữ cảnh

Bốn lần tái cấu trúc của Manus dạy chúng ta:

**Từ thực tế**: Không phải nhớ càng nhiều càng tốt, mà nhớ càng có cấu trúc, càng có chọn lọc càng tốt.

**Từ góc độ chi phí**:
- Phần lớn lãng phí đến từ tính toán lặp lại tiền tố cố định, cần giải quyết bằng cơ chế ổn định tiền tố và bộ nhớ đệm;
- Thông tin quan trọng bị xóa nhầm, thường do chiến lược cửa sổ trượt "bình đẳng", cần giải quyết bằng phân cấp thông tin và chiến lược dán chặt;  
- Khi đối mặt với tài liệu siêu dài và kho kiến thức, chỉ dựa vào tăng giới hạn cửa sổ ngữ cảnh là không thực tế, phải kết hợp cơ chế truy vấn và nén.

Mục tiêu là: Với giới hạn mô hình và ngữ cảnh nhất định, mỗi token đầu vào đều phải có mục đích rõ ràng.
