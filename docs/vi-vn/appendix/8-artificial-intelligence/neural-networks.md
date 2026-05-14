# Mạng nơ-ron và Học sâu

::: tip Lời nói đầu
**Mạng nơ-ron là động cơ của cuộc cách mạng AI.** Từ khả năng hiểu ngôn ngữ của ChatGPT đến nhận dạng hình ảnh của xe tự lái, đều là mạng nơ-ron đang hoạt động. Nó không phải là phép thuật, mà là một khuôn khổ toán học tinh tế — thông qua việc "học" từ lượng lớn dữ liệu, tìm ra mối quan hệ ánh xạ từ đầu vào đến đầu ra. Hiểu rõ các nguyên lý cơ bản của nó sẽ giúp bạn sử dụng và gỡ lỗi các công cụ AI tốt hơn.
:::

**Bài viết này sẽ dạy bạn những gì?**

Sau khi hoàn thành chương này, bạn sẽ có được:

- **Các khái niệm cốt lõi**: Hiểu các nguyên lý cơ bản của nơ-ron, lớp, truyền tiến, truyền ngược
- **Các loại mạng**: Tìm hiểu các đặc điểm và trường hợp sử dụng của CNN, RNN, Transformer và các kiến trúc chính khác
- **Quá trình huấn luyện**: Hiểu cách mô hình "học" từ dữ liệu
- **Các kỹ thuật quan trọng**: Nắm bắt các khái niệm thực tế như quá khớp, tốc độ học, chuẩn hóa
- **Dòng chảy phát triển**: Tìm hiểu quá trình tiến hóa từ perceptron đến mô hình ngôn ngữ lớn

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|-------------------|
| **Chương 1** | Từ nơ-ron đến mạng | Perceptron, hàm kích hoạt, truyền tiến |
| **Chương 2** | Mạng học như thế nào | Hàm mất mát, hạ gradient, truyền ngược |
| **Chương 3** | Các kiến trúc mạng chính | CNN, RNN, Transformer |
| **Chương 4** | Nghệ thuật huấn luyện | Quá khớp, chuẩn hóa, điều chỉnh siêu tham số |
| **Chương 5** | Dòng chảy phát triển và biên giới | Từ perceptron đến GPT |

---

## 1. Từ nơ-ron đến mạng

### Một nơ-ron riêng lẻ

Đơn vị tối thiểu của mạng nơ-ron là **nơ-ron** (Neuron). Nó mô phỏng cách hoạt động của các nơ-ron sinh học: nhận nhiều tín hiệu đầu vào, tính tổng có trọng số, tạo ra kết quả đầu ra thông qua hàm kích hoạt.

```
Đầu vào x1 ──→ ×w1 ──┐
Đầu vào x2 ──→ ×w2 ──┼──→ Σ(tổng có trọng số) + b(độ lệch) ──→ f(hàm kích hoạt) ──→ Đầu ra
Đầu vào x3 ──→ ×w3 ──┘
```

Biểu thức toán học: **y = f(w₁x₁ + w₂x₂ + w₃x₃ + b)**

<NeuronDemo />

### Hàm kích hoạt: Tại sao cần phi tuyến tính?

Nếu không có hàm kích hoạt, bất kể xếp chồng bao nhiêu lớp nơ-ron, cuối cùng nó vẫn tương đương với một phép biến đổi tuyến tính (phép nhân ma trận). Hàm kích hoạt giới thiệu **phi tuyến tính**, cho phép mạng học các mẫu phức tạp.

| Hàm kích hoạt | Công thức | Đặc điểm | Trường hợp sử dụng phổ biến |
|----------------|-----------|----------|--------------------------|
| ReLU | max(0, x) | Đơn giản hiệu quả, huấn luyện nhanh | Lựa chọn mặc định cho lớp ẩn |
| Sigmoid | 1/(1+e⁻ˣ) | Đầu ra 0~1 | Lớp đầu ra phân loại nhị phân |
| Tanh | (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ) | Đầu ra -1~1 | Thường dùng trong RNN |
| Softmax | eˣᵢ/Σeˣⱼ | Đầu ra phân phối xác suất | Lớp đầu ra đa lớp |

### Từ nơ-ron đến mạng

Tổ chức nhiều nơ-ron thành **lớp**, và ghép nối nhiều lớp lại với nhau sẽ tạo thành mạng nơ-ron:

```
Lớp đầu vào     Lớp ẩn 1        Lớp ẩn 2       Lớp đầu ra
(đặc trưng)     (trích xuất      (trích xuất    (dự đoán)
                đặc trưng thấp)  đặc trưng cao)

 x1 ──→  [○ ○ ○ ○] ──→ [○ ○ ○] ──→  [○ ○]
 x2 ──→  [○ ○ ○ ○] ──→ [○ ○ ○] ──→  Mèo/Chó
 x3 ──→  [○ ○ ○ ○] ──→ [○ ○ ○]
```

| Khái niệm | Giải thích |
|-----------|-----------|
| Lớp đầu vào | Nhận dữ liệu gốc (pixel hình ảnh, vector văn bản, v.v.) |
| Lớp ẩn | Lớp xử lý trung gian, càng nhiều lớp mạng càng "sâu" (từ "sâu" trong học sâu) |
| Lớp đầu ra | Tạo ra dự đoán cuối cùng (xác suất phân loại, giá trị hồi quy, v.v.) |
| Truyền tiến | Quá trình dữ liệu chảy từ lớp đầu vào qua từng lớp đến lớp đầu ra |

::: tip Tại sao lại gọi là "học sâu"?
Học máy truyền thống thường chỉ có 1-2 lớp. Khi số lớp ẩn tăng lên hàng chục thậm chí hàng trăm lớp, nó được gọi là "học sâu". Mạng càng sâu có thể học được các đặc trưng trừu tượng hơn: lớp đầu tiên học cạnh, lớp thứ hai học kết cấu, lớp thứ ba học bộ phận, các lớp sâu hơn học "đây là một chú mèo".
:::

---

## 2. Mạng học như thế nào

"Học" của mạng nơ-ron về bản chất là một **bài toán tối ưu hóa**: tìm một tập hợp các trọng số (w) và độ lệch (b) sao cho dự đoán của mạng càng gần với câu trả lời thực tế càng tốt.

### Ba bước huấn luyện

```
1. Truyền tiến: Nhập dữ liệu, nhận kết quả dự đoán
2. Tính mất mát: Dùng hàm mất mát để đo khoảng cách giữa dự đoán và giá trị thực tế
3. Truyền ngược: Dựa trên mất mát, tính gradient của mỗi trọng số, cập nhật trọng số
   ↓
Lặp lại các bước trên cho đến khi mất mát đủ nhỏ
```

### Hàm mất mát: Đo "sai lệch bao nhiêu"

Hàm mất mát (Loss Function) định lượng hóa khoảng cách giữa giá trị dự đoán và giá trị thực tế. Mục đích của huấn luyện là giảm thiểu mất mát.

| Hàm mất mát | Tóm tắt công thức | Trường hợp áp dụng |
|------------|------------------|------------------|
| MSE (Sai số bình phương trung bình) | Bình phương trung bình chênh lệch giữa giá trị dự đoán và thực tế | Bài toán hồi quy |
| Cross-Entropy (Entropy chéo) | -Σ y·log(ŷ) | Bài toán phân loại |
| Binary Cross-Entropy | Phiên bản entropy chéo nhị phân | Bài toán phân loại nhị phân |

### Hạ gradient: Tìm điểm thấp nhất

Hãy tưởng tượng bạn đứng trên một ngọn núi, bị bịt mắt phải đi đến điểm thấp nhất. Điều duy nhất bạn có thể làm là **cảm nhận độ dốc dưới chân, rồi bước xuống dốc theo hướng xuống dốc**. Đó chính là hạ gradient.

```
Giá trị mất mát
  ↑
  │    ╱╲
  │   ╱  ╲      ← vị trí hiện tại
  │  ╱    ╲    ↙ hạ theo hướng gradient
  │ ╱      ╲╱   ← cực tiểu cục bộ
  │╱            ╲╱  ← cực tiểu toàn cục
  └──────────────→ giá trị trọng số
```

| Khái niệm | Giải thích |
|-----------|-----------|
| Gradient | Đạo hàm riêng của hàm mất mát đối với mỗi trọng số, chỉ ra "điều chỉnh hướng nào để giảm mất mát" |
| Tốc độ học | Mỗi bước đi bao xa. Quá lớn sẽ bỏ lỡ điểm thấp nhất, quá nhỏ sẽ hội tụ quá chậm |
| Kích thước batch | Mỗi lần dùng bao nhiêu mẫu để tính gradient. Toàn bộ quá chậm, một mẫu quá dao động, mini-batch là sự thỏa hiệp |

### Truyền ngược: Chiến thắng của quy tắc dây chuyền

Truyền ngược (Backpropagation) là thuật toán hiệu quả để tính gradient. Nó tận dụng **quy tắc dây chuyền** của vi tích phân, bắt đầu từ lớp đầu ra, tính gradient của mỗi trọng số đối với mất mát lần lượt ngược lại.

```
Truyền tiến: Đầu vào → Lớp ẩn 1 → Lớp ẩn 2 → Đầu ra → Mất mát
Truyền ngược: Mất mát → Đầu ra → Lớp ẩn 2 → Lớp ẩn 1 → Cập nhật tất cả trọng số
```

::: tip Hiểu trực quan về truyền ngược
Hãy tưởng tượng mạng nơ-ron là một dây chuyền sản xuất. Sản phẩm (dự đoán) có vấn đề (mất mát lớn), bạn cần bắt đầu từ công đoạn cuối cùng để tìm nguyên nhân, kiểm tra mỗi công đoạn (mỗi lớp trọng số) đã đóng góp bao nhiêu vào vấn đề cuối cùng, rồi điều chỉnh theo mức độ đóng góp. Đóng góp nhiều thì điều chỉnh nhiều, đóng góp ít thì điều chỉnh ít.
:::

---

## 3. Các kiến trúc mạng chính

Các loại dữ liệu khác nhau cần các kiến trúc mạng khác nhau. Chọn kiến trúc đúng, sự thành công sẽ nhanh gấp đôi.

<NetworkLayersDemo />

### 3.1 CNN (Mạng nơ-ron tích chập)

CNN là vương vị trong xử lý hình ảnh. Ý tưởng cốt lõi: sử dụng các hạt nhân tích chập nhỏ trượt trên hình ảnh để trích xuất các đặc trưng cục bộ.

```
Hình ảnh đầu vào → [Lớp tích chập→kích hoạt→gộp] × N → Lớp kết nối đầy đủ → Đầu ra
  28×28      trích xuất cạnh/kết cấu/hình dạng      kết quả phân loại
```

| Đặc điểm | Giải thích |
|----------|-----------|
| Kết nối cục bộ | Mỗi nơ-ron chỉ nhìn thấy một vùng nhỏ thay vì toàn bộ hình ảnh |
| Chia sẻ tham số | Cùng một hạt nhân tích chập được tái sử dụng trên toàn hình ảnh, giảm đáng kể số tham số |
| Bất biến tịnh tiến | Dù mèo ở bên trái hay bên phải hình ảnh đều có thể nhận dạng được |
| Đặc trưng theo lớp | Lớp nông học cạnh, lớp sâu học ngữ nghĩa |

Mô hình đại diện: LeNet, AlexNet, VGG, ResNet, EfficientNet

### 3.2 RNN (Mạng nơ-ron tuần hoàn)

RNN được thiết kế đặc biệt cho **dữ liệu chuỗi**. Trạng thái ẩn của nó được truyền đến bước thời gian tiếp theo, cho phép mạng có khả năng "ghi nhớ".

```
Bước thời gian t1    Bước thời gian t2    Bước thời gian t3
 "Tôi"  ──→   "thích"  ──→  "mèo"
  ↓           ↓           ↓
 [h1]  ──→  [h2]   ──→  [h3] ──→ Đầu ra
  ↑           ↑           ↑
 Trạng thái ẩn được truyền qua các bước thời gian (ghi nhớ)
```

| Biến thể | Bài toán được giải quyết | Cơ chế cốt lõi |
|---------|------------------------|----------------|
| RNN gốc | Mô hình hóa chuỗi cơ bản | Kết nối tái diễn đơn giản |
| LSTM | Gradient biến mất trên chuỗi dài | Cổng quên, cổng đầu vào, cổng đầu ra |
| GRU | Quá nhiều tham số LSTM | Cổng đặt lại và cổng cập nhật |
| RNN hai chiều | Chỉ có thể nhìn vào quá khứ | Xử lý từ trước đến sau và từ sau đến trước cùng lúc |

::: tip Cơ chế cổng của LSTM
Tuyệt vời của LSTM nằm ở ba "cổng": **cổng quên** quyết định loại bỏ kỷ ức cũ nào, **cổng đầu vào** quyết định lưu trữ thông tin mới nào, **cổng đầu ra** quyết định xuất ra nội dung nào. Giống như khi bạn đọc một cuốn sách, sẽ chọn lọc ghi nhớ các cốt truyện quan trọng, quên những chi tiết không liên quan.
:::

### 3.3 Transformer: Chú ý là tất cả

Bài báo "Attention Is All You Need" của Google năm 2017 giới thiệu Transformer, hoàn toàn thay đổi lĩnh vực AI. Nó sử dụng **cơ chế tự chú ý** để thay thế cấu trúc tuần hoàn, là cơ sở của các mô hình lớn như GPT, BERT, Claude, v.v.

```
Chuỗi đầu vào → Nhúng + mã hóa vị trí → [Chú ý đa đầu → Mạng truyền tiếp] × N → Đầu ra
                                                    ↑
                                        Mỗi từ có thể "nhìn thấy" tất cả các từ khác
```

| Ưu điểm | Giải thích |
|--------|-----------|
| Tính toán song song | Không giống RNN phải xử lý từng bước, Transformer có thể xử lý song song toàn bộ chuỗi |
| Phụ thuộc khoảng cách dài | Bất kỳ hai vị trí nào cũng có thể thiết lập mối liên kết trực tiếp, không bị hạn chế bởi khoảng cách |
| Khả năng mở rộng | Mô hình càng lớn, dữ liệu càng nhiều, hiệu suất càng tốt (Luật mở rộng) |

**Trực quan về tự chú ý**: Khi đọc câu "Chú mèo ngồi trên thảm, vì **nó** rất mệt", từ "nó" cần chú ý đến "chú mèo" để hiểu ý nghĩa. Tự chú ý cho phép mô hình học cách liên kết này — tính một "điểm số liên quan" cho mỗi cặp từ trong chuỗi.

<NetworkArchitectureDemo />

## 4. Nghệ thuật huấn luyện

Có kiến trúc tốt chưa đủ, quá trình huấn luyện có nhiều "bẫy" cần tránh.

### 4.1 Quá khớp vs Khớp không đủ

| Vấn đề | Hiệu suất | Nguyên nhân | Giải pháp |
|--------|----------|-----------|---------|
| Quá khớp | Hiệu suất tốt trên tập huấn luyện, kém trên tập kiểm tra | Mô hình quá phức tạp, "ghi nhớ câu trả lời" thay vì học quy tắc | Chuẩn hóa, Dropout, tăng cường dữ liệu, dừng sớm |
| Khớp không đủ | Hiệu suất kém trên cả tập huấn luyện và tập kiểm tra | Mô hình quá đơn giản, không thể học quy tắc | Tăng dung lượng mô hình, huấn luyện lâu hơn, đặc trưng tốt hơn |

```
Sai số
  ↑
  │ ╲  sai số huấn luyện          sai số kiểm tra  ╱
  │  ╲                                            ╱
  │   ╲─────────────────────────╱
  │    khớp không đủ ← điểm tối ưu → quá khớp
  └──────────────────────────────→ độ phức tạp mô hình
```

### 4.2 Các siêu tham số quan trọng

Siêu tham số là các tham số cần được đặt trước khi huấn luyện (không phải mô hình tự học):

| Siêu tham số | Tác dụng | Dải thông thường | Gợi ý điều chỉnh |
|-------------|---------|------------------|-----------------|
| Tốc độ học | Độ lớn của mỗi bước cập nhật | 1e-5 ~ 1e-1 | Siêu tham số quan trọng nhất, thường bắt đầu từ 1e-3 |
| Kích thước batch | Bao nhiêu mẫu được sử dụng cho mỗi lần huấn luyện | 16 ~ 512 | Batch càng lớn huấn luyện càng ổn định, nhưng cần nhiều VRAM hơn |
| Số vòng huấn luyện (Epoch) | Số lần duyệt qua toàn bộ tập dữ liệu | 10 ~ 100+ | Kết hợp với dừng sớm, ngừng khi tập xác thực không còn cải thiện |
| Bộ tối ưu hóa | Chiến lược cập nhật gradient | Adam, SGD | Adam là lựa chọn mặc định, SGD+động lượng phù hợp với điều chỉnh tinh |

### 4.3 Kỹ thuật chuẩn hóa

Các phương pháp phổ biến để ngăn chặn quá khớp:

| Kỹ thuật | Nguyên lý | Cách sử dụng |
|----------|---------|------------|
| Dropout | Khi huấn luyện, tắt ngẫu nhiên một số nơ-ron | Thường p=0.1~0.5 |
| Suy giảm trọng số | Thêm một hình phạt cho kích thước trọng số vào hàm mất mát | Chuẩn hóa L2, λ=1e-4 |
| Tăng cường dữ liệu | Biến đổi ngẫu nhiên dữ liệu huấn luyện (lật, cắt, xoay) | Bắt buộc cho bài toán hình ảnh |
| Dừng sớm | Ngừng huấn luyện khi mất mát trên tập xác thực không còn giảm | patience=5~10 |
| Chuẩn hóa Batch | Chuẩn hóa phân phối đầu vào của mỗi lớp | Tăng tốc hội tụ, có tác dụng chuẩn hóa nhẹ |

::: tip Quy tắc kinh nghiệm huấn luyện
1. Trước tiên chạy trên tập dữ liệu nhỏ để xuyên suốt quy trình, đảm bảo không có lỗi code
2. Bắt đầu từ các mô hình đã được huấn luyện trước để điều chỉnh tinh, thay vì huấn luyện từ đầu
3. Tốc độ học là siêu tham số đáng được dành thời gian điều chỉnh nhất
4. Nếu mất mát huấn luyện không giảm, trước tiên hãy kiểm tra dữ liệu và code, sau đó mới nghi ngờ mô hình
:::

---

## 5. Dòng chảy phát triển và biên giới

Sự phát triển của mạng nơ-ron đã trải qua một số lần "mùa đông" và "phục hưng", mỗi lần đột phá đều đến từ những đổi mới công nghệ chính.

| Thời kỳ | Cột mốc | Đột phá chính |
|--------|--------|--------------|
| 1958 | Perceptron (Perceptron) | Mô hình mạng nơ-ron đầu tiên, chỉ có thể xử lý vấn đề tuyến tính |
| 1986 | Thuật toán truyền ngược | Cho phép huấn luyện mạng nhiều lớp trở thành khả thi |
| 1998 | LeNet (CNN) | Mạng tích chập thành công lớn lao trong nhận dạng chữ số viết tay |
| 2012 | AlexNet | CNN sâu vượt trội hơn các phương pháp truyền thống trên ImageNet, học sâu bùng nổ |
| 2014 | GAN (Mạng đối kháng sinh thành) | Hai mạng đối kháng huấn luyện, có thể tạo ra hình ảnh chân thực |
| 2017 | Transformer | "Attention Is All You Need", cơ chế chú ý thay thế RNN |
| 2018 | BERT | Mô hình tiền huấn luyện + điều chỉnh tinh, NLP đạt đột phá toàn diện |
| 2020 | GPT-3 | 1750 tỷ tham số, thể hiện khả năng nổi lên của mô hình lớn |
| 2022 | ChatGPT | Công nghệ căn chỉnh RLHF, AI vào tầm mắt công chúng |
| 2023+ | Mô hình đa phương thức lớn | GPT-4V, Claude, v.v., cùng hiểu văn bản và hình ảnh |

### Xu hướng hiện tại

| Hướng | Giải thích |
|------|-----------|
| Mô hình lớn (LLM) | Số lượng tham số từ hàng trăm triệu đến hàng triệu tỷ, nổi lên khả năng lập luận, lập trình, v.v. |
| Đa phương thức | Cùng một mô hình xử lý văn bản, hình ảnh, âm thanh, video |
| Điều chỉnh tinh hiệu quả | Công nghệ LoRA, QLoRA, v.v. cho phép các lập trình viên thông thường cũng có thể điều chỉnh tinh các mô hình lớn |
| AI Agent | Cho phép mô hình ngôn ngữ lớn sử dụng các công cụ, lên kế hoạch, tự hoàn thành các mục tiêu phức tạp |
| Chưng cất mô hình nhỏ | Sử dụng kiến thức từ mô hình lớn để huấn luyện mô hình nhỏ, triển khai ở phía người dùng |

::: tip Gợi ý dành cho các lập trình viên
Bạn không cần huấn luyện mạng nơ-ron từ đầu. Phát triển AI hiện đại chủ yếu là **gọi API** (chẳng hạn như OpenAI, Claude API) hoặc **điều chỉnh tinh các mô hình đã được huấn luyện trước** (chẳng hạn như sử dụng Hugging Face). Nhưng hiểu các nguyên lý cơ bản sẽ giúp bạn chọn lựa mô hình tốt hơn, thiết kế prompt tốt hơn, chẩn đoán vấn đề tốt hơn.
:::

---

## Tóm tắt

| Khái niệm cốt lõi | Tóm tắt một câu |
|------------------|-----------------|
| Nơ-ron | Tổng có trọng số + hàm kích hoạt, đơn vị tính toán tối thiểu của mạng |
| Truyền tiến | Dữ liệu chảy từ lớp đầu vào qua từng lớp đến lớp đầu ra, tạo dự đoán |
| Truyền ngược | Bắt đầu từ mất mát, tính gradient lần lượt qua từng lớp, cập nhật trọng số |
| CNN | Hạt nhân tích chập trích xuất đặc trưng cục bộ, lựa chọn hàng đầu cho xử lý hình ảnh |
| RNN/LSTM | Kết nối tuần hoàn duy trì ghi nhớ, xử lý dữ liệu chuỗi |
| Transformer | Tự chú ý xử lý song song, kiến trúc cơ sở của mô hình lớn |
| Quá khớp | Mô hình "ghi nhớ câu trả lời", sử dụng chuẩn hóa, Dropout, v.v. để ngăn chặn |
| Học truyền đạt | Đứng trên vai những người khổng lồ, dùng mô hình tiền huấn luyện để điều chỉnh tinh giải quyết vấn đề mới |

---

## Đọc thêm

- [3Blue1Brown - Video chuỗi mạng nơ-ron](https://www.3blue1brown.com/topics/neural-networks) — Giải thích trực quan nhất
- [Stanford CS231n](http://cs231n.stanford.edu/) — Khóa học mạng nơ-ron tích chập cổ điển
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) — Kiến trúc Transformer minh họa
- [Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/) — Sách giáo khoa trực tuyến miễn phí
- [Hugging Face Course](https://huggingface.co/learn) — Thực hành Transformer và mô hình lớn
