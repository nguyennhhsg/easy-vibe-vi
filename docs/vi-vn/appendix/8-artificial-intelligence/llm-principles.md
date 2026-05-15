# Cách thức hoạt động của Mô hình Ngôn ngữ Lớn
> 💡 **Hướng dẫn học tập**: Phần này không yêu cầu nền tảng lập trình, thông qua các bản demo tương tác, bạn sẽ hiểu sâu hơn về nguyên tắc hoạt động cơ bản của Mô hình Ngôn ngữ Lớn (LLM). Chúng ta sẽ bắt đầu từ chia tách từ cơ bản nhất, cho đến cách GPT được huấn luyện và suy diễn.

<LlmQuickStartDemo />

## 0. Mở đầu: Từ Ngôn ngữ Con người Đến Tính toán Máy tính

Con người giao tiếp bằng ngôn ngữ, máy tính tính toán bằng số.
**Mô hình Ngôn ngữ Lớn (LLM)** về bản chất, là một cây cầu kết nối hai thế giới này.

Nhiệm vụ cốt lõi của nó chỉ có một: **chuyển đổi vấn đề "hiểu ngôn ngữ" thành vấn đề "tính toán toán học".**

Để đạt được mục tiêu này, chúng ta cần giải quyết ba thách thức cốt lõi:

1.  **Dịch thuật**: Làm cách nào để chuyển đổi chữ thành số? (Chia tách từ & Embedding)
2.  **Hiệu suất**: Làm cách nào để máy tính tính toán nhanh chóng? (Tính toán ma trận)
3.  **Bộ nhớ**: Làm cách nào để máy tính hiểu bối cảnh? (Mô hình Transformer)

Hướng dẫn này sẽ dẫn bạn từ con số không, một bước bước tháo rời quá trình xây dựng cây cầu này.

---

## 1. Bước đầu tiên: Dịch thuật (Tokenization)

Máy tính không hiểu hai chữ "burger", nó chỉ nhận biết những con số.
Vì vậy, nhiệm vụ đầu tiên của chúng ta là: **cắt dòng văn bản thành những đơn vị nhỏ nhất mà máy tính có thể hiểu.**

### 1.1 Chia tách từ là gì?

Chia tách từ là cắt một câu hoàn chỉnh thành những "đơn vị từ" (Token).

- **Tiếng Anh**: Có dấu cách tự nhiên, dễ chia tách (ví dụ `I love AI`).
- **Tiếng Trung**: Không có dấu cách, cần thuật toán để cắt (ví dụ `我爱人工智能` — "tôi yêu trí tuệ nhân tạo").

#### Tokenizer (Dịch giả)

Chương trình thực hiện hành động chia tách từ, chúng ta gọi nó là **Tokenizer**.
Nó giống như một dịch giả, chịu trách nhiệm dịch văn bản của con người thành một dãy số mà máy có thể hiểu.

LLM hiện đại (như GPT-4) thường sử dụng kỹ thuật **Subword Tokenization (Chia tách từ con)** (như thuật toán BPE).
Điểm thông minh của nó là: **những từ phổ biến giữ nguyên, những từ hiếm bị tách.**

Dưới đây là một ví dụ thực tế về chia tách BPE (dựa trên Tokenizer GPT-4):

**Input**: `"The quick brown fox jumps over the lazy dog. \n今天天气真不错！"` (câu tiếng Trung nghĩa là "Hôm nay thời tiết thật tốt!")

**Token List**:

```text
index=791,   string='The' 
index=4062,  string=' quick' 
index=14198, string=' brown' 
index=39935, string=' fox' 
index=83368, string=' jumps'   <-- Nếu bị tách, có thể là ' jump' + 's'
index=927,   string=' over' 
index=279,   string=' the' 
index=16053, string=' lazy' 
index=3290,  string=' dog' 
index=13,    string='.' 
index=198,   string='\n'       <-- Ký tự xuống dòng 
index=33838, string='今天'      <-- "Hôm nay" - những từ phổ biến được kết hợp trực tiếp 
index=54580, string='天气'      <-- "Thời tiết"
index=20265, string='真'        <-- "Thật"
index=57672, string='不错'      <-- "Tốt"
index=171,   string='！' 
```

> **Về cách xử lý các ký tự hiếm:**
> Nếu gặp một ký tự hiếm không có trong bảng từ (giả sử ký tự "今" — "hôm nay" — rất hiếm), mô hình sẽ quay trở lại mã hóa **cấp độ Byte**.
> 1.  Raw Input: `今`
> 2.  Bytes: `\xE4 \xBB \x8A`
> 3.  BPE lookup: Trước tiên tìm `\xE4\xBB\x8A` -> Không tìm thấy -> Tách thành `\xE4\xBB` (ID=1001) + `\x8A` (ID=2002).
> 4.  Token cuối cùng: `[1001, 2002]`.
>
> Cơ chế này đảm bảo **dù nhập vào ký tự nào, mô hình cũng có thể xử lý, không bao giờ xảy ra sự cố OOV (Out Of Vocabulary)**.

<TokenizationDemo />

**Điểm chính**: LLM không xử lý những từ, mà xử lý **Token ID** (một dãy chỉ số).

---

## 2. Vấn đề cốt lõi: Làm cách nào để máy tính "tính toán" ngôn ngữ?

Nhiệm vụ của chúng ta là xử lý ngôn ngữ. Nhưng máy tính chỉ nhận biết số.
Ý tưởng trực tiếp nhất là: gán cho mỗi từ một số hiệu (ID).

- Táo -> ID 10
- Chuối -> ID 20

### 2.1 Tại sao không sử dụng ID đơn giản?

Nếu chỉ dùng ID, máy tính sẽ cho rằng "10" và "20" chỉ là hai số không liên quan gì.
Hơn nữa, nếu bảng từ có 100.000 từ, chúng ta có thể cần một mảng có độ dài 100.000 để biểu diễn một từ (mã hóa One-Hot), trong đó 99.999 vị trí là 0, chỉ có một vị trí là 1.

- **Nhược điểm 1: Lãng phí** (thưa, mảng One-Hot quá lớn).
- **Nhược điểm 2: Không có nội dung** (không thể biểu thị "táo" và "chuối" đều là trái cây).

### 2.2 Giải pháp: Embedding (Vectơ dày đặc)

Để biểu thị một từ một cách **hiệu quả** và **có ý nghĩa**, chúng ta đã phát minh ra **Embedding**.
Nó không còn sử dụng một mảng dài gồm 0/1, mà sử dụng một mảng ngắn hơn, chứa đầy những số nhỏ (ví dụ 512 con số) để mô tả một từ.

- Ví dụ: `[0.8 (là trái cây), 0.1 (màu đỏ), 0.9 (ngọt)...]`
  Bằng cách này, chúng ta không chỉ nén dữ liệu, mà còn chuyển ý nghĩa của từ thành những "tọa độ" có thể tính toán.

<EmbeddingDemo />

---

## 3. Từ Một từ Đến Ma trận

Sau khi giải quyết vấn đề biểu thị "một từ", tiếp theo là giải quyết vấn đề biểu thị "một câu".

### 3.1 Tại sao phải là ma trận?

Bởi vì một câu chứa nhiều từ.

- Một từ = một dòng số (vectơ).
- Một câu = nhiều dòng số xếp chồng lên nhau.
  Đây là **ma trận**.

Lý do phải xếp thành ma trận là vì phần cứng cốt lõi của máy tính hiện đại — **GPU (thẻ đồ họa)**, được thiết kế sẵn để thực hiện tính toán ma trận.
Chỉ khi chuyển đổi ngôn ngữ thành ma trận, chúng ta mới có thể tận dụng khả năng tính toán song song của GPU, thực hiện **suy diễn và huấn luyện hiệu quả**.

### 3.2 Quy trình hoàn chỉnh

Nhìn lại cách dữ liệu di chuyển:

1.  **Chia tách từ**: Cắt văn bản thành từng mảnh.
2.  **Lập chỉ mục**: Chuyển mảnh thành ID.
3.  **Embedding**: Chuyển ID thành vectơ (để có ý nghĩa ngữ pháp và nén).
4.  **Xếp chồng**: Ghép vectơ thành ma trận (để GPU tính toán hiệu quả).

<TokenizerToMatrix />

---

## 3.5 Tạm dừng: "Mô hình" thực sự là gì?

Trước khi nói về kiến trúc cụ thể, trước tiên hãy hiểu một cách dễ hiểu về từ "mô hình".

Trong lĩnh vực AI, **mô hình (Model)** thực chất là một **hàm** hoặc **hộp đen** cực kỳ phức tạp.

- **Đầu vào**: Một loạt những con số (ví dụ Token ID ở trên).
- **Xử lý**: Bên trong hộp đen có hàng tỷ tham số (có thể hiểu là hàng tỷ nút điều chỉnh), chúng sẽ thực hiện phép cộng, trừ, nhân, chia điên cuồng trên dữ liệu đầu vào.
- **Đầu ra**: Một loạt những con số khác (đại diện cho kết quả dự đoán, ví dụ xác suất của từ tiếp theo).

**Nói một cách dễ hiểu:**

Bạn có thể tưởng tượng mô hình như một **đầu bếp giàu kinh nghiệm**:

1.  **Đầu vào (Nguyên liệu)**: Bạn cho anh ấy thịt bò, khoai tây, cà chua.
2.  **Mô hình (Bộ não của đầu bếp)**: Dựa vào hàng chục ngàn công thức nấu ăn anh ấy đã học (dữ liệu huấn luyện), anh ấy nhanh chóng tính toán trong đầu: thịt bò cắt thành khúc, khoai tây bóc vỏ, kiểm soát lửa...
3.  **Đầu ra (Những món ăn)**: Cuối cùng, anh ấy đưa ra một đĩa hầm thịt bò khoai tây.

Cái gọi là **huấn luyện (Training)**, là quá trình từ khi đầu bếp mới bắt đầu, chúng ta cho anh ấy thử sai hàng tỷ lần. Thêm mặn rồi điều chỉnh "nút mặn", thêm nhạt rồi điều chỉnh "nút lửa", cho đến khi anh ấy có thể nấu ăn ổn định và ngon miệng.

LLM hiện nay, là một "đầu bếp siêu cấp từng đọc toàn bộ sách của nhân loại", chỉ không phải đang nấu ăn, mà đang "nấu" những lời nói.

## 4. Con đường tiến hóa: Từ RNN Đến Transformer

Có dữ liệu (Token), có đầu bếp (mô hình), tiếp theo cần xem cách đầu bếp này suy nghĩ như thế nào.

Trong lịch sử tiến hóa của AI, có hai kiểu "cách suy nghĩ" chính (kiến trúc): **RNN** và **Transformer**.

### 4.1 Cách cũ ngây thơ: RNN (Trò chơi truyền lời)

Các mô hình sơ khai (RNN, Mạng lưới thần kinh tuần hoàn) xử lý một câu, giống như chúng ta chơi **trò chơi truyền lời**.

**Cách thức hoạt động:**

1.  Đọc từ thứ 1 "tôi", ghi nhớ trong đầu, chuyển cho bước 2.
2.  Đọc từ thứ 2 "thích", kết hợp với ký ức vừa rồi, cập nhật thông tin trong đầu, rồi chuyển cho bước 3.
3.  Đọc từ thứ 3 "ăn", cập nhật ký ức lại...
4.  ...cho đến khi đọc xong từ cuối cùng.

**Điều này dẫn đến hai nhược điểm chết người:**

1.  **Chậm (không thể song song)**: Phải chờ người trước truyền xong, người sau mới bắt đầu. Không thể cho 100 người làm việc cùng lúc.
2.  **Quên (lãng quên khoảng cách dài)**: Khi tin tức truyền đến người thứ 100, anh ấy có thể đã quên người thứ 1 nói "tôi" hay "bạn". Điều này dẫn đến mô hình viết bài dài dễ dàng mâu thuẫn từ đầu đến cuối.

### 4.2 Thiết kế thiên tài hiện tại: Transformer (Cuộc họp quanh bàn tròn)

Năm 2017, Google đề xuất một kiến trúc hoàn toàn mới — **Transformer**. Nó thay đổi hoàn toàn quy tắc, biến "trò chơi truyền lời" thành **cuộc họp quanh bàn tròn**.

**Cách thức hoạt động:**
Transformer không còn truyền lời từng cái một, mà cho **tất cả những từ cùng lúc ngồi quanh bàn**.

1.  **Góc nhìn của Chúa (Tính toán song song)**: Tất cả những từ cùng vào, không cần xếp hàng. Mọi người viết thông tin của mình lên giấy, trải ra giữa bàn.
2.  **Cơ chế Attention (Chú ý)**: Đây là bí kíp tối thượng của nó. Mỗi từ có thể **trực tiếp** xem thông tin của bất kỳ từ nào khác trên bàn.
    - Ví dụ khi đọc ký tự "nó" này, mô hình không cần nhớ lại tin tức truyền lời, mà có thể nhìn thẳng thấy "con mèo" phía trước, ngay lập tức hiểu "nó = con mèo".

**Điều này hoàn toàn giải quyết những điểm yếu của RNN:**

- **Nhanh**: Mọi người nhìn tài liệu cùng lúc, GPU có thể hoạt động hết công suất, hiệu suất cực cao.
- **Không quên**: Dù câu dài bao nhiêu, từ thứ 1 và từ thứ 10.000 đều "cách một bước", muốn nhìn ai là nhìn ai.

> **Tóm lại:**
>
> - **RNN**: Giống chơi mê cung, bước từng bước khám phá, dễ bị lạc.
> - **Transformer**: Giống có góc nhìn của Chúa nhìn bản đồ, điểm đầu điểm cuối nhìn rõ.

#### Tại sao lại cần thông tin "vị trí"?

Bởi vì Transformer là "một nồi hết", nếu không xử lý đặc biệt, nó không thể phân biệt "tôi yêu bạn" và "bạn yêu tôi" (tất cả từ giống nhau, chỉ thứ tự khác).
Vì vậy chúng ta sẽ dán một **thẻ số (mã hóa vị trí)** cho mỗi từ, báo cho mô hình biết ai ở vị trí 1, ai ở vị trí 2.

> Ghi chú nhỏ: Nhiều LLM là tự hồi quy (dự đoán từ tiếp theo), nên khi sinh ra vẫn là một token một token; nhưng ở **mỗi bước sinh**, tính toán bên trong Transformer vẫn có thể tận dụng song song ma trận và tối ưu hóa bộ nhớ đệm.

### 4.3 Công nghệ đen tối hiệu suất: KV Cache (Bộ nhớ đệm KV)

Bạn có thể đã nghe nói rằng, khi sinh bài dài, càng về sau càng chậm, hoặc dung lượng bộ nhớ GPU càng tăng. Điều này thường là do mô hình cần "nhớ" tất cả những gì đã sinh ra trước đó.

**Transformer "ghi chép" như thế nào?**

Trong cơ chế attention của Transformer, mỗi từ sẽ sinh ra hai vectơ `Key (K)` và `Value (V)`, để cung cấp cho những từ sau "truy vấn".

- Khi mô hình sinh từ thứ 100, nó cần quay lại xem K và V của 99 từ trước đó.
- Nếu mỗi lần lại tính lại K và V của 99 từ trước, thì quá lãng phí!

**Tác dụng của KV Cache:**

KV Cache giống như một **"sổ ghi chép tăng dần"**.

1.  **Không tính lại**: Tính K và V của từ thứ 1, lưu lại.
2.  **Chỉ tính cái mới**: Khi sinh từ thứ 2, chỉ tính K và V của từ thứ 2, rồi ghép với K, V của từ thứ 1.
3.  **Càng lưu càng dày**: Khi cuộc trò chuyện tiếp diễn, "sổ ghi chép" này (dung lượng bộ nhớ GPU) sẽ càng lúc càng dày.

Đây chính là lý do vì sao cuộc trò chuyện văn bản dài (Long Context) tiêu tốn rất nhiều dung lượng GPU — **không phải mô hình lớn hơn, mà sổ ghi chép (KV Cache) quá dày.**

<RNNvsTransformer />

---

## 5. Khai phá: Từ "Tiếp tục viết" Đến "Hội thoại"

Nhiều người nhầm tưởng ChatGPT thực sự hiểu những gì chúng ta nói, nhưng thực ra bản năng của nó chỉ có một: **đoán từ tiếp theo** (Next Token Prediction).

### 5.1 Bản năng: Tiếp tục viết điên cuồng

Nếu bạn nhập vào mô hình cơ bản (Base Model): "Hôm nay thời tiết rất đẹp", nó có thể tiếp tục viết: "Chúng ta hãy đi chơi công viên."
Nhưng nếu bạn nhập: "Thủ đô của nước Mỹ là đâu?", nó có thể tiếp tục viết: "Thủ đô của Trung Quốc là đâu? Thủ đô của Nhật Bản là đâu?" (bởi vì nó đang bắt chước định dạng đề thi, chứ không phải trả lời câu hỏi).

### 5.2 Kỹ thuật: Dùng "kịch bản" để hội thoại

Để chuyển nó thành trợ lý hội thoại, các kỹ sư đã nghĩ ra một cách tuyệt diệu: **đóng vai**.
Chúng ta âm thầm thêm vào nội dung nhập cho mô hình một số **nhãn đặc biệt (Template)**, khiến mô hình tưởng nó đang tiếp tục viết một "kịch bản hội thoại".

Ví dụ, bạn nhìn thấy:

> User: Xin chào

Mô hình thực ra nhìn thấy:

> `<|user|>` Xin chào `<|assistant|>`

Mô hình một khi nhìn thấy `<|assistant|>`, nó sẽ biết: "Ồ, đến lượt tôi đóng vai trợ lý nói chuyện rồi."

### 5.3 Bản demo tương tác sâu

Bản demo dưới đây sẽ dẫn bạn từng bước một thấy rõ bản chất của LLM. Vui lòng nhấn lần lượt vào **1. Bản năng -> 2. Kỹ thuật -> 3. Nguyên lý -> 4. Nâng cao**, tự tay thử!

<TrainingInferenceDemo />

---

## 6. Từ "Nói bậy" Đến "Trợ lý tốt" (Alignment)

Chỉ biết hội thoại là chưa đủ. Mô hình gốc có thể sẽ dạy người ta chế tạo bom, hoặc toàn nói tục.
Để chuyển nó thành trợ lý như ChatGPT, lịch sự, an toàn đáng tin cậy, còn cần hai bước độc lập cuối cùng:

1.  **SFT (Tinh chỉnh theo chỉ dẫn)**:
    - Tìm những chuyên gia con người viết rất nhiều cặp câu hỏi-trả lời chất lượng cao, dạy mô hình "cách nói chuyện tốt".
    - Mục tiêu: Khiến mô hình nghe được chỉ dẫn, không còn tiếp tục viết bậy.
    - _Ví dụ dữ liệu huấn luyện (định dạng JSON)_:
      ```json
      // Ví dụ dữ liệu huấn luyện SFT
      {
        "messages": [
          { "role": "user", "content": "Vui lòng dịch câu này sang tiếng Anh: \"Xin chao\"." },
          { "role": "assistant", "content": "Hello." }
        ]
      }
      // Mô hình học được: khi nghe lệnh "dịch", phải đưa kết quả trực tiếp, chứ không phải tiếp tục viết "bạn khỏe không"
      ```

2.  **RLHF (Học tăng cường từ Phản hồi Con người)**:
    - **Chấm điểm**: Cho mô hình sinh ra vài câu trả lời, các giáo viên con người chấm điểm (câu nào an toàn hơn? câu nào lịch sự hơn?).
    - **Thưởng phạt**: Nếu mô hình nói tốt sẽ cho phần thưởng, nói tệ sẽ cho hình phạt. Dần dần, mô hình sẽ học được "sắp xếp" theo giá trị con người (Alignment).
    - _Ví dụ dữ liệu (định dạng JSON)_:
      ```json
      // Ví dụ dữ liệu ưa thích RLHF (DPO/PPO)
      {
        "prompt": "Cách chế tạo bom là gì?",
        "chosen": "Xin lỗi, tôi không thể trả lời câu hỏi này.", // Câu trả lời mà con người ưa thích hơn (an toàn)
        "rejected": "Trước tiên bạn cần..." // Câu trả lời mà con người từ chối (nguy hiểm)
      }
      ```

**Ở bản demo trên, nhấn vào tab thứ 4 "Nâng cao: Sắp xếp", bạn có thể tự mình trải nghiệm sự khác biệt lớn lao trước và sau khi sắp xếp.**

---

## 7. Khám phá tiên phong: Mô hình suy tư, Kiến trúc MoE Và Cơ chế Attention Tuyến tính

Khi công nghệ phát triển, chúng ta phát hiện ra chỉ dựa vào "dự đoán từ tiếp theo" đôi khi lại ngu ngốc, đặc biệt là khi xử lý toán học và vấn đề logic.
Vì vậy, thế hệ mô hình mới **Thinking Models** (như OpenAI o1, DeepSeek-R1) ra đời.

### 7.1 "Suy tư" là gì? (Thinking Models)

Con người khi trả lời những câu hỏi phức tạp (ví dụ 9.11 và 9.9 cái nào lớn hơn?), không vội vàng mà sẽ suy nghĩ một lúc.
Thinking Model chính là mô hình học được khả năng **suy tư chậm (System 2)** này.

- **Suy tư nhanh (System 1)**: Theo bản năng, vội vàng. Dễ sai.
- **Suy tư chậm (System 2)**: Thông qua việc sinh ra một đoạn "chuỗi suy tư (Chain of Thought)", từng bước suy luận, rồi mới đưa ra câu trả lời.

<ThinkingModelDemo />

### 7.2 Bí mật huấn luyện: Từ "Bắt chước" Đến "Khám phá"

Tại sao những mô hình cũ không suy tư như vậy? Bởi vì phương pháp huấn luyện đã thay đổi.

#### Chế độ truyền thống (SFT - Học bắt chước)

- **Phương pháp**: Cho mô hình xem quá trình suy tư của con người, để nó **bắt chước**.
- **Hạn chế**: Trần của mô hình chính là dữ liệu con người và chất lượng. Nếu bản thân con người cũng không nghĩ rõ (ví dụ những bài toán cực khó), mô hình cũng không học được.

#### Chế độ suy tư (RL - Học tăng cường)

- **Phương pháp**: **Không cho** dữ liệu quá trình, chỉ cho **bộ xác minh (Verifier)** cuối cùng.
  - Ví dụ cho một bài toán, mô hình tự mình thử sai.
  - Thử sai -> Hình phạt.
  - Thử đúng -> Phần thưởng.
- **Khoảnh khắc Aha (Aha Moment)**:
  Sau hàng ngàn lần tự mình thử nghiệm, mô hình bất ngờ phát hiện: **"Nếu tôi viết thêm vài bước suy luận trước khi xuất ra câu trả lời, xác suất nhận phần thưởng sẽ tăng rất nhiều!"**
  Vì vậy, hành vi "suy tư trước, rồi trả lời" được gia tăng và cố định lại. Giống như AlphaGo tự chơi với chính nó, cuối cùng vượt qua bảng thế cờ của con người.

### 7.3 Hướng dẫn thực hành: Sự thay đổi lớn lao trong phong cách Prompt

Khi sử dụng Thinking Model (như DeepSeek-R1, OpenAI o1), chiến lược gợi ý của bạn cần thay đổi hoàn toàn.

| Đặc điểm           | Mô hình truyền thống (GPT-4o, Claude 3.5)                   | Mô hình suy tư (R1, o1)                                    |
| :------------- | :-------------------------------------------- | :------------------------------------------------------- |
| **Logic cốt lõi**   | **System 1 (Bản năng)**                           | **System 2 (Logic)**                                      |
| **Kỹ thuật Prompt** | Cần hướng dẫn chuỗi suy tư (CoT)<br>Ví dụ: "Vui lòng suy tư từng bước..." | **Đừng** thêu dệt<br>Mô hình tự có chuỗi suy tư, hướng dẫn con người lại làm nó bị xao lãng |
| **Độ rõ ràng lệnh** | Cần tách những nhiệm vụ phức tạp thành những nhiệm vụ nhỏ                    | Đưa ra mục tiêu cuối cùng, để mô hình tự tách ra                           |
| **Trường hợp sử dụng**   | Viết sáng tạo, dịch đơn giản, trò chuyện                      | Toán phức tạp, tái cấu trúc mã, suy luận logic                             |

> ⚠️ **Chú ý**: Đừng can thiệp quá nhiều vào Thinking Model. Bạn chỉ cần xác định rõ ràng **"cái gì là kết quả hoàn hảo của nhiệm vụ"**, chứ không phải xác định **"nên làm thế nào"**.

### 7.4 Xu hướng tương lai: Sự kết hợp nhanh chậm

Trong tương lai, chúng ta có thể không cần phân biệt "mô hình suy tư" và "mô hình thường xuyên".
AI lý tưởng nên giống con người, có khả năng **tính toán năng động (Adaptive Compute)**:

- Gặp "1+1=?": Ngay lập tức gọi System 1, trả lời ngay lập tức.
- Gặp "chứng minh giả thuyết Riemann": Tự động chuyển sang System 2, suy tư ba ngày ba đêm rồi trả lời.
- **Bạn không cảm thấy chuyển đổi**: Bạn chỉ cần đặt câu hỏi, mô hình tự quyết định sử dụng bao nhiêu "trí não" để giải quyết.

### 7.5 Tiến hóa kiến trúc: Từ "Toàn năng" Đến "Nhóm chuyên gia" (Dense vs MoE)

Khi mô hình ngày càng lớn (ví dụ GPT-4, DeepSeek-V3), nếu mỗi lần sinh một chữ phải tính toán tất cả các nơ ron, tốc độ sẽ chậm tới mức không chịu được.
Vì vậy, kiến trúc **MoE (Mixture of Experts, Hỗn hợp chuyên gia)** ra đời.

- **Dense (Mô hình dày đặc)**:
  - **Ví dụ**: Một **thiên tài toàn năng**. Dù hỏi gì, anh ấy cũng sử dụng toàn bộ bộ não để trả lời.
  - **Đặc điểm**: Ổn định, nhưng khi lượng kiến thức tăng lên, phản ứng ngày càng chậm.
  - **Đại diện**: GPT-3, Llama-2.

- **MoE (Mô hình hỗn hợp chuyên gia)**:
  - **Ví dụ**: Một **nhóm chuyên gia trên dây chuyền lắp ráp** (mỗi xử lý một chữ thì thay đổi người).
  - **Cơ chế cốt lõi (Token-Level Routing)**:
    Bí mật của MoE là **định tuyến Token gốc**. Nó **hoàn toàn không phải** phân công dựa vào "loại nhiệm vụ" (ví dụ đưa tất cả bài toán cho chuyên gia toán), mà **định tuyến theo "chữ hiện tại" thời gian thực**.
    - Khi mô hình sinh "`def`", định tuyến cho **chuyên gia lập trình**.
    - Khi mô hình sinh "`love`", định tuyến cho **chuyên gia văn học**.
    - Khi mô hình sinh "`3.14`", định tuyến cho **chuyên gia toán**.
    Điều này có nghĩa là, dù trong cùng một câu, những chữ khác nhau cũng thường được xử lý bởi những chuyên gia khác nhau.
  - **Đặc điểm**: Mặc dù tổng số người nhiều (lượng tham số lớn), nhưng khi xử lý mỗi chữ chỉ có vài người làm việc (tham số được kích hoạt ít). **Vừa hiểu biết rộng, vừa nhanh**.
  - **Đại diện**: GPT-4, DeepSeek-V3, Mixtral.

<MoEDemo />

### 7.6 Cuộc cách mạng hiệu suất: Đột phá giới hạn độ dài (Linear Attention)

Ngoài MoE, còn có một vấn đề cốt lõi khác: **độ dài bối cảnh**.
Transformer truyền thống (như GPT-4) sử dụng **cơ chế attention tiêu chuẩn**, lượng tính toán của nó tăng **bình phương** theo số lượng chữ.

- Đọc 1 vạn chữ, lượng tính toán là 1 trăm triệu lần.
- Đọc 10 vạn chữ, lượng tính toán là 100 tỷ lần!

Để giải quyết vấn đề này, các mô hình như MiniMax (dòng abab) và RWKV sử dụng **cơ chế attention tuyến tính (Linear Attention)**.

### Tại sao một cái là "mạng", một cái là "tuyến tính"?

Sự khác biệt cơ bản nằm ở: **bạn chọn "lưu trữ tất cả lời nói gốc", hay "luôn luôn tóm tắt"?**

- **Attention tiêu chuẩn (Mạng) — Tại sao phải quay lại xem?**
  - **Lý do cốt lõi**: Để **"tìm kiếm mối liên hệ"**.
  - **Ví dụ**: Ví dụ câu "tôi cho **táo** cho **nó**...". Khi bạn đọc đến "**nó**" cái chữ này, để hiểu rõ "nó" chỉ ai, mô hình phải quay lại kiểm tra tất cả những chữ phía trước (tôi, cho, táo, cho).
  - **Quá trình**: "nó" phát ra một tín hiệu truy vấn (Query), để so khớp với nhãn của tất cả những chữ phía trước (Key).
    - So khớp với "tôi"? 0 điểm.
    - So khớp với "táo"? **100 điểm!**
  - **Giá cả phải trả**: Bởi vì mô hình không biết chữ nào quan trọng, nên **phải kiểm tra tất cả những chữ phía trước, một chữ cũng không thể bỏ sót**. Đây chính là lý do vì sao đường liên kết thành một mạng.

- **Linear Attention (Tuyến tính) — Tại sao lại có thể không quay lại?**
  - **Nguyên lý**: Mô hình học được "ghi chép". Đọc xong "táo", nó nén "có một táo" thông tin này vào **trạng thái (State)**; khi đọc "nó", nó trực tiếp tra cứu trạng thái trong tay, ngay lập tức biết "nó=táo".
  - **Giá cả phải trả**: Mặc dù nhanh, nhưng khi "nén" có thể mất một số chi tiết (ví dụ quên rằng táo là màu đỏ).

<LinearAttentionDemo />

### 7.7 So sánh kiến trúc lớn: RNN vs Transformer vs RWKV

| Kiến trúc | Cơ chế cốt lõi | Độ phức tạp (độ dài N) | Huấn luyện song song | Tốc độ suy diễn | Vấn đề quên | Mô hình đại diện |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RNN** | Đệ quy tuần hoàn | $O(N)$ (thấp) | ❌ Không | Chậm (tuần hoàn) | Nghiêm trọng (lãng quên khoảng cách dài) | LSTM, GRU |
| **Transformer** | Attention toàn cầu | $O(N^2)$ (cực cao) | ✅ Có | Trung bình (KV Cache) | Không (nhưng bị giới hạn bởi cửa sổ) | GPT-4, Llama |
| **RWKV / Linear** | Attention tuyến tính | $O(N)$ (thấp) | ✅ Có | Nhanh (dung lượng hằng số) | Nhẹ (có mất mát nén) | RWKV, MiniMax |

> **RWKV / Linear Attention** cố gắng kết hợp ưu điểm của cả hai: Huấn luyện song song giống Transformer, suy diễn hiệu quả giống RNN.

---

## 8. Tóm tắt Và Lộ trình Học tập

Bây giờ bạn đã kết nối "đại mạch lạn và lạn duệ" từ "chia tách từ" đến "ChatGPT":

1.  **Tokenization**: Cắt dòng văn bản thành Token.
2.  **Embedding**: Ánh xạ Token thành vectơ ngữ pháp.
3.  **Transformer**: Sử dụng cơ chế attention để xử lý chuỗi, trích xuất đặc trưng song song.
4.  **Training**: Sử dụng định dạng Template để chuẩn bị dữ liệu, huấn luyện song song thông qua Teacher Forcing.
5.  **Inference**: Sinh từng chữ một theo kiểu tự hồi quy.

**Gợi ý bước tiếp theo:**

- Nếu bạn quan tâm đến toán học, có thể đi sâu vào **đại số tuyến tính** (tính toán ma trận) và **lý thuyết xác suất**.
- Nếu bạn muốn thực hành, có thể thử sử dụng thư viện `transformers` của Python để tải một mô hình siêu nhỏ (như GPT-2) để thử chơi.

---

## 9. Bảng tra cứu thuật ngữ (Glossary)

| Thuật ngữ               | Tên đầy đủ                                       | Giải thích                                                                                           |
| :----------------- | :----------------------------------------- | :--------------------------------------------------------------------------------------------- |
| **LLM**            | Large Language Model                       | Mô hình ngôn ngữ lớn. Được huấn luyện trên lượng lớn văn bản, có khả năng hiểu và sinh text con người.                                 |
| **Token**          | -                                          | **Chia tách từ**. Đơn vị nhỏ nhất của văn bản bị cắt (như từ, chữ hoặc phần của chữ). Mô hình đọc và ghi các Token ID.            |
| **Embedding**      | -                                          | **Vectơ từ**. Ánh xạ Token thành vectơ số trong không gian nhiều chiều (ví dụ 4096 chiều), nắm bắt quan hệ ngữ pháp của từ.              |
| **Transformer**    | -                                          | Kiến trúc LLM hiện đại. Dựa trên cơ chế attention, có khả năng xử lý văn bản dài một cách song song.                                      |
| **Attention**      | Attention Mechanism                        | **Cơ chế chú ý**. Cho phép mô hình khi xử lý một từ, động quan tâm tới những từ có liên quan khác trong bối cảnh.                         |
| **Context Window** | -                                          | **Cửa sổ bối cảnh**. Số lượng Token tối đa mà mô hình có thể "nhớ" trong một lần suy diễn (ví dụ 128k).                             |
| **Pre-training**   | -                                          | **Tiền huấn luyện**. Huấn luyện mô hình trên lượng lớn văn bản không có nhãn, giúp nó học quy luật ngôn ngữ cơ bản và kiến thức thế giới.                     |
| **SFT**            | Supervised Fine-Tuning                     | **Tinh chỉnh có giám sát**. Sử dụng dữ liệu cặp câu hỏi-trả lời chất lượng cao, dạy mô hình tuân theo chỉ dẫn con người.                                     |
| **RLHF**           | Reinforcement Learning from Human Feedback | **Học tăng cường từ phản hồi con người**. Thông qua chấm điểm của con người, điều chỉnh hành vi mô hình, làm cho nó phù hợp với giá trị con người (sắp xếp).           |
| **CoT**            | Chain of Thought                           | **Chuỗi suy tư**. Kỹ thuật hướng dẫn mô hình trước khi đưa ra câu trả lời cuối cùng, trước tiên hãy sinh các bước suy luận.                                   |
| **MoE**            | Mixture of Experts                         | **Mô hình hỗn hợp chuyên gia**. Bao gồm nhiều mô hình "chuyên gia" con, tự động chọn kích hoạt phần nào để giải quyết vấn đề, hiệu suất cao hơn.           |
| **Temperature**    | -                                          | **Nhiệt độ**. Tham số kiểm soát độ ngẫu nhiên của quá trình sinh. Nhiệt độ cao hơn, câu trả lời sáng tạo hơn nhưng không thể kiểm soát được; nhiệt độ thấp hơn, câu trả lời xác định hơn. |
