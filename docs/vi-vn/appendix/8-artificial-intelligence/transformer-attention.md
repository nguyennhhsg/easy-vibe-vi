---
title: 'Transformer và cơ chế Attention: Động cơ lõi của các mô hình lớn'
description: 'Hiểu sâu sắc kiến trúc Transformer và cơ chế Attention, khám phá nền tảng kỹ thuật của các mô hình lớn như GPT, BERT.'
---

# Transformer và cơ chế Attention: Động cơ lõi của các mô hình lớn

Năm 2017, kiến trúc Transformer được Google đề xuất trong bài báo "Attention Is All You Need" đã hoàn toàn thay đổi luật chơi của xử lý ngôn ngữ tự nhiên. Nó đã loại bỏ mạng nơron hồi quy truyền thống (RNN), chỉ dựa vào cơ chế Attention đã đạt được hiệu suất mạnh hơn và hiệu quả huấn luyện cao hơn. Ngày nay, hầu hết tất cả các mô hình ngôn ngữ lớn—GPT, BERT, T5, LLaMA—đều được xây dựng dựa trên nền tảng của Transformer.

<TransformerQuickStartDemo />

---

## Một, Thách thức của RNN và Bước đột phá của Transformer

Trước khi Transformer xuất hiện, phương pháp chính để xử lý dữ liệu chuỗi (như văn bản, giọng nói) là mạng nơron hồi quy (RNN) và các biến thể của nó LSTM, GRU. Các mô hình này xử lý từng phần tử trong chuỗi thông qua cấu trúc hồi quy, và duy trì một trạng thái ẩn để ghi nhớ thông tin lịch sử.

### 1.1 Ba khiếm khuyết chết người của RNN

**Phụ thuộc theo thứ tự, không thể song song**：RNN phải chờ tính toán của bước thời gian trước hoàn tất mới có thể xử lý từ tiếp theo. Điều này dẫn đến tốc độ huấn luyện cực kỳ chậm, không thể tận dụng đầy đủ khả năng tính toán song song của GPU hiện đại.

**Suy giảm phụ thuộc khoảng cách dài**：Ngay cả LSTM cải tiến, khi xử lý văn bản dài, thông tin sớm cũng sẽ dần bị "quên". Ví dụ, trong một bài viết 500 ký tự, mô hình rất khó nhớ thông tin chính được đề cập ở đầu.

**Gradient Vanishing/Exploding**：Trong quá trình back-propagation, gradient cần được truyền tầng theo tầng dọc theo các bước thời gian, dễ xảy ra gradient vanishing hoặc exploding, dẫn đến training không ổn định.

### 1.2 Bước đột phá cách mạng của Transformer

Transformer thông qua **cơ chế tự chú ý (Self-Attention)**, cho phép mô hình "nhìn toàn bộ" chuỗi trong một lần, tính toán trực tiếp mối quan hệ giữa bất kỳ hai vị trí nào, mà không cần truyền thông tin từng bước.

<RnnVsTransformerDemo />

::: tip Ưu điểm cốt lõi của Transformer
- **Tính toán song song**：Attention của tất cả vị trí có thể được tính toán đồng thời, tốc độ huấn luyện được tăng lên hàng chục lần
- **Tầm nhìn toàn cầu**：Trực tiếp nắm bắt phụ thuộc khoảng cách dài, không bị giới hạn bởi độ dài chuỗi
- **Khả năng mở rộng**：Kiến trúc đơn giản và thống nhất, dễ xếp chồng các mạng sâu hơn
:::

---

## Hai, Kiến trúc hoàn chỉnh của Transformer: Từ toàn bộ đến chi tiết

Kiến trúc hoàn chỉnh của Transformer bao gồm hai phần: **bộ mã hóa (Encoder)** và **bộ giải mã (Decoder)**, lần lượt chịu trách nhiệm hiểu input và tạo output.

<TransformerArchitectureDemo />

### 2.1 Bộ mã hóa (Encoder)

Lấy câu "Số dư trong tài khoản ngân hàng không đủ" làm ví dụ. Khi mô hình xử lý từ "số dư" này, nó sẽ tự động tính toán mức độ liên quan với các từ khác:

- "Số dư" có mối liên hệ chặt chẽ với "tài khoản" (0.35)
- "Số dư" có mối liên hệ vừa phải với "ngân hàng" (0.20)
- "Số dư" có mối liên hệ thấp với "của", "trong" và các từ hạn định khác (0.05-0.10)

Mối liên hệ này không phải do con người quy định, mà mô hình tự động học được từ dữ liệu lớn.

<SelfAttentionDemo />

### 2.2 Quá trình tính toán Attention

Cơ chế tự chú ý được thực hiện thông qua ba bước chính:

1. **Tạo các vector Q, K, V**：Mỗi từ thông qua ba phép biến đổi tuyến tính khác nhau, tạo ra ba vector: Query (truy vấn), Key (khóa), Value (giá trị)
2. **Tính trọng số Attention**：Sử dụng Query và tất cả Key để tính tích vô hướng, nhận được điểm tương tự
3. **Tính tổng có trọng số**：Sử dụng trọng số Attention để tính tổng có trọng số của các vector Value, nhận được output cuối cùng

---

## Ba, Query, Key, Value: Ba vũ sĩ của Attention

Cơ chế Attention của Transformer được lấy cảm hứng từ ý tưởng truy xuất thông tin, ánh xạ mỗi từ vào ba không gian vector khác nhau.

### 3.1 Vai trò của ba vector

**Query (Truy vấn)**：Đại diện cho "Tôi muốn tìm gì". Ý định truy vấn của từ hiện tại, được sử dụng để khớp với Key của các từ khác.

**Key (Khóa)**：Đại diện cho "Tôi là gì". Đặc trưng nhận dạng của mỗi từ, được sử dụng để được Query truy xuất.

**Value (Giá trị)**：Đại diện cho "Nội dung của tôi là gì". Thông tin thực tế sẽ được truyền, được tính tổng có trọng số theo trọng số Attention.

Điểm khéo léo của thiết kế này là: **Tính toán độ tương tự (Q·K) và truyền thông tin (V) là tách biệt**. Mô hình có thể học rằng "những từ nào nên được chú ý" và "sau khi chú ý nên trích xuất thông tin gì" là hai vấn đề độc lập.

<QKVMechanismDemo />

### 3.2 Công thức tính toán Attention

Công thức tính toán Attention hoàn chỉnh là:

```
Attention(Q, K, V) = softmax(QK^T / √d_k) V
```

Trong đó:
- `QK^T`：Tính tích vô hướng của Query và Key, nhận được ma trận tương tự
- `√d_k`：Hệ số tỷ lệ, ngăn chặn giá trị tích vô hướng quá lớn dẫn đến mất gradient softmax
- `softmax`：Chuyển đổi độ tương tự thành phân phối xác suất (trọng số Attention)
- Cuối cùng nhân với `V`：Sử dụng trọng số Attention để tính tổng có trọng số của Value

---

## Bốn, Attention đa đầu: Hiểu ngữ nghĩa từ nhiều góc độ

Một Attention head đơn lẻ chỉ có thể nắm bắt một loại phụ thuộc. Để cho phép mô hình hiểu câu từ nhiều góc độ, Transformer đã giới thiệu **Attention đa đầu (Multi-Head Attention)**.

### 4.1 Cơ chế hoạt động của đa đầu

Attention đa đầu chiếu input vào nhiều không gian con khác nhau, mỗi "đầu" tính toán Attention độc lập, cuối cùng nối lại các output của tất cả đầu.

Transformer điển hình sử dụng 8 hoặc 16 Attention head, mỗi đầu có thể tập trung vào các hiện tượng ngôn ngữ khác nhau:

- **Grammar head**：Nhận dạng các mối quan hệ ngữ pháp như chủ-động từ-tân ngữ, định ngữ-trạng từ-bổ ngữ
- **Semantic head**：Nắm bắt mối liên hệ ngữ nghĩa của từ (như "ngân hàng" và "tài khoản")
- **Position head**：Chú ý đến phụ thuộc địa phương của các từ liền kề
- **Reference head**：Phân tích đối tượng được chỉ định bởi đại từ (như "anh ta" chỉ "Tiểu Minh")
- **Sentiment head**：Nhận dạng sắc thái tích cực/tiêu cực và xu hướng cảm xúc
- **Entity head**：Nhận dạng các thực thể được đặt tên như tên người, tên địa điểm

<MultiHeadAttentionDemo />

### 4.2 Ưu điểm của đa đầu

**Khả năng biểu diễn mạnh hơn**：Các đầu khác nhau có thể nắm bắt các loại phụ thuộc khác nhau, tránh hạn chế của một quan điểm duy nhất.

**Tính toán song song**：Nhiều đầu có thể được tính toán đồng thời mà không tăng thời gian tính toán.

**Độ bền vững tốt hơn**：Ngay cả khi một số đầu không học thành công, các đầu khác vẫn có thể cung cấp thông tin hiệu quả.

::: tip Biểu diễn toán học của Attention đa đầu
```
MultiHead(Q, K, V) = Concat(head_1, ..., head_h) W^O
Trong đó head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)
```
Mỗi đầu có những ma trận trọng số độc lập W^Q, W^K, W^V, cuối cùng hợp nhất output của tất cả đầu thông qua W^O.
:::

---

## Năm, Kiến trúc hoàn chỉnh của Transformer: Bộ mã hóa và bộ giải mã

Kiến trúc hoàn chỉnh của Transformer bao gồm hai phần: **bộ mã hóa (Encoder)** và **bộ giải mã (Decoder)**, lần lượt chịu trách nhiệm hiểu input và tạo output.

### 5.1 Bộ mã hóa (Encoder)

Bộ mã hóa bao gồm nhiều lớp (thường là 6-12 lớp) các cấu trúc giống nhau được xếp chồng, mỗi lớp chứa hai lớp con:

1. **Lớp tự Attention đa đầu**：Nắm bắt mối quan hệ phụ thuộc bên trong chuỗi input
2. **Mạng nơron feed-forward (Feed Forward)**：Thực hiện các phép biến đổi phi tuyến tính độc lập cho mỗi vị trí

Sau mỗi lớp con đều có **kết nối dư (Residual Connection)** và **bình thường hóa lớp (Layer Normalization)**, đảm bảo tính ổn định của training đối với mạng sâu.

### 5.2 Bộ giải mã (Decoder)

Bộ giải mã cũng bao gồm nhiều lớp được xếp chồng, nhưng mỗi lớp có ba lớp con:

1. **Attention đa đầu có mặt nạ (Masked Multi-Head Attention)**：Chỉ có thể nhìn thấy các từ trước vị trí hiện tại, ngăn chặn "gian lận"
2. **Attention chéo (Cross-Attention)**：Kết nối bộ mã hóa và bộ giải mã, cho phép bộ giải mã chú ý đến chuỗi input
3. **Mạng nơron feed-forward**：Giống với bộ mã hóa

<TransformerArchitectureDemo />

### 5.3 Biến thể hiện đại: Chỉ bộ mã hóa vs Chỉ bộ giải mã

Mặc dù Transformer ban đầu chứa cả bộ mã hóa và bộ giải mã, nhưng các mô hình lớn hiện đại thường chỉ sử dụng một trong hai:

| Loại kiến trúc | Mô hình đại diện | Tác vụ phù hợp |
| --- | --- | --- |
| **Chỉ bộ mã hóa** | BERT, RoBERTa | Phân loại văn bản, nhận dạng thực thể được đặt tên, trả lời câu hỏi |
| **Chỉ bộ giải mã** | GPT, LLaMA, Claude | Tạo văn bản, hội thoại, hoàn thành mã |
| **Bộ mã hóa-bộ giải mã** | T5, BART | Dịch, tóm tắt, viết lại văn bản |

::: tip Tại sao GPT chỉ sử dụng bộ giải mã?
Dòng mô hình GPT sử dụng phương pháp **tạo tự hồi quy**, dự đoán từng từ tiếp theo một. Kiến trúc chỉ bộ giải mã có sẵn phù hợp với loại tác vụ tạo này, có cấu trúc đơn giản hơn, dễ dàng mở rộng đến quy mô hàng trăm tỷ tham số.
:::

---

## Sáu, Mã hóa vị trí: Cho mô hình biết thứ tự của các từ

Cơ chế tự Attention của Transformer tự nó là **không phụ thuộc vào vị trí**—nó xem câu như một tập hợp các từ, không quan tâm đến thứ tự từ. Nhưng thứ tự từ rất quan trọng đối với ngữ nghĩa: "Tôi yêu bạn" và "Bạn yêu tôi" có ý nghĩa hoàn toàn khác!

### 6.1 Sự cần thiết của mã hóa vị trí

Để cho phép mô hình nhận thức thông tin vị trí, Transformer thêm **mã hóa vị trí (Positional Encoding)** vào input embedding. Mã hóa vị trí là một vector có cùng kích thước với word embedding, được cộng trực tiếp vào word embedding.

<PositionalEncodingDemo />

### 6.2 Mã hóa vị trí sin-cosin

Transformer ban đầu sử dụng hàm sin-cosin cố định để tạo mã hóa vị trí:

```
PE(pos, 2i) = sin(pos / 10000^(2i/d))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d))
```

Ưu điểm của thiết kế này:
- **Tính duy nhất**：Mỗi vị trí có một mã hóa duy nhất
- **Vị trí tương đối**：Mô hình có thể học được mối quan hệ khoảng cách tương đối
- **Tính ngoại suy**：Có thể xử lý các chuỗi dài hơn so với thời training

### 6.3 Phương án mã hóa vị trí hiện đại

Khi nghiên cứu sâu hơn, xuất hiện thêm nhiều phương án mã hóa vị trí:

**Mã hóa vị trí có thể học được**：BERT, GPT coi mã hóa vị trí là tham số có thể huấn luyện, không phải hàm cố định.

**Mã hóa vị trí tương đối**：T5, DeBERTa không mã hóa vị trí tuyệt đối, mà mã hóa khoảng cách tương đối giữa các từ.

**Mã hóa vị trí xoay (RoPE)**：Phương án được sử dụng bởi LLaMA, GPT-NeoX, đưa thông tin vị trí bằng cách xoay các vector Q và K, hiệu suất ngoại suy tốt hơn.

**ALiBi**：Thực hiện nhận thức vị trí bằng cách thêm các điều khoản thành kiến vào điểm Attention, không cần tham số bổ sung.

---

## Bảy, Tác động và tương lai của Transformer

Sự xuất hiện của Transformer không chỉ là sự ra đời của một kiến trúc mới, mà còn là sự thay đổi của toàn bộ mô hình nghiên cứu AI.

### 7.1 Mô hình pre-training thống nhất

Transformer đã làm cho "pre-training + fine-tuning" trở thành quy trình tiêu chuẩn của NLP. Bằng cách pre-training trên đại lượng văn bản không được gán nhãn, mô hình học được biểu diễn chung của ngôn ngữ, sau đó chỉ cần một lượng nhỏ dữ liệu được gán nhãn có thể thích ứng với các tác vụ hạ lưu khác nhau.

### 7.2 Kiến trúc đa phương thức chung

Sự thành công của Transformer không giới hạn ở văn bản. Nó đã được áp dụng thành công cho:

- **Thị giác máy tính**：Vision Transformer (ViT) vượt trội hơn CNN trong phân loại hình ảnh
- **Nhận dạng giọng nói**：Whisper sử dụng Transformer để thực hiện chuyển đổi giọng nói thành văn bản đa ngôn ngữ
- **Dự đoán cấu trúc protein**：AlphaFold 2 sử dụng Transformer để dự đoán cấu trúc 3D protein
- **Học tăng cường**：Decision Transformer chuyển đổi vấn đề RL thành mô hình hóa chuỗi

### 7.3 Nền tảng của thời đại mô hình lớn

Từ 175 tỷ tham số của GPT-3 đến một nghìn tỷ tham số của GPT-4, Transformer thể hiện khả năng mở rộng đáng kinh ngạc. Với đặc tính tính toán song song, nó cho phép chúng tôi huấn luyện các mô hình siêu lớn chưa từng có trước, và quan sát được **các khả năng xuất hiện (Emergent Abilities)**—khi mô hình đủ lớn, nó tự động "nhận thức" được các khả năng như suy luận, mã, đa ngôn ngữ.

### 7.4 Thách thức và hướng tương lai

Mặc dù Transformer đã đạt được thành công lớn, nhưng vẫn phải đối mặt với những thách thức:

**Độ phức tạp tính toán**：Độ phức tạp của tự Attention là O(n²), khi xử lý văn bản dài, lượng tính toán rất lớn.

**Mô hình hóa văn bản dài**：Mặc dù theo lý thuyết có thể xử lý bất kỳ độ dài nào, nhưng thực tế bị giới hạn bởi VRAM và tài nguyên tính toán.

**Tính giải thích được**：Mặc dù trọng số Attention cung cấp một mức độ giải thích nhất định, nhưng quá trình quyết định của mạng sâu vẫn là hộp đen.

Các hướng nghiên cứu hiện tại bao gồm:
- **Transformer hiệu quả**：Linformer, Performer, Flash Attention v.v. giảm độ phức tạp
- **Mô hình hóa ngữ cảnh dài**：Cơ chế Sparse Attention, Sliding Window, Memory
- **Tích hợp đa phương thức**：Kiến trúc đa phương thức gốc xử lý thống nhất văn bản, hình ảnh, âm thanh

---

## Tám, Kết luận

Sự đề xuất của Transformer và cơ chế Attention đánh dấu sự chuyển đổi triệt để của deep learning từ "thiết kế đặc trưng thủ công" đến "học tập đầu cuối". Nó không chỉ giải quyết vấn đề nút cổ chai kỹ thuật của RNN, mà quan trọng hơn là cung cấp một kiến trúc đơn giản, chung, có thể mở rộng, trở thành nền tảng của thời đại mô hình lớn.

Hiểu Transformer chính là hiểu cốt lõi của AI hiện đại. Từ mã hóa hai chiều của BERT, đến tạo tự hồi quy của GPT, cho đến biểu diễn thống nhất của các mô hình lớn đa phương thức, tất cả những đột phá này đều được xây dựng dựa trên vai của Transformer.

Trong tương lai, với sự cải thiện sức mạnh tính toán và tối ưu hóa thuật toán, Transformer sẽ tiếp tục phát triển, thúc đẩy AI hướng tới sự mạnh mẽ hơn và tính chung nhất hơn.
