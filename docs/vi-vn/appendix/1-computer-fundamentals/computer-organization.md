# Nguyên lý tổ chức máy tính

::: tip Lời nói đầu
**Sau khi xây dựng CPU từ transistor, làm thế nào máy tính hình thành một hệ thống hoàn chỉnh?** Trong chương trước, chúng ta đã bắt đầu từ transistor, xây dựng bộ cộng, thanh ghi, đơn vị tính toán, cuối cùng lắp ráp được lõi CPU. Nhưng chỉ có CPU là không đủ — nó cần phối hợp với bộ nhớ, các thiết bị I/O, cần bus kết nối các thành phần, cần hệ thống lệnh để điều khiển. Trong chương này, chúng ta sẽ chuyển từ góc nhìn nội tại của CPU sang toàn bộ hệ thống máy tính, hiểu sâu sắc hơn về kiến trúc Von Neumann, hệ thống lệnh, phân tầng bộ nhớ, bus và I/O.
:::

**Chương này sẽ dạy bạn những gì?**

Sau khi hoàn thành chương này, bạn sẽ có được:

- **Góc nhìn hệ thống**: Hiểu cách CPU, bộ nhớ, I/O phối hợp hoạt động thay vì chỉ là những fan hâm mộ phần cứng cô lập
- **Thuật ngữ chuyên môn phần cứng**: Nắm vững các khái niệm như chu kỳ lệnh, đường ống, CPI, tỷ lệ cache hit
- **Tư duy hiệu suất**: Hiểu các nút cổ chai và chiến lược tối ưu hóa trong tổ chức máy tính
- **Nền tảng cho học tập tiếp theo**: Làm cơ sở cho hệ điều hành, kiến trúc máy tính, phát triển nhúng

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|------------------|
| **Chương 1** | Kiến trúc Von Neumann | Lưu trữ chương trình, năm thành phần chính, đường dữ liệu |
| **Chương 2** | Hệ thống lệnh | Định dạng lệnh, chế độ địa chỉ, CISC vs RISC |
| **Chương 3** | Bộ điều khiển CPU | Đơn vị điều khiển, vi hoạt động, chu kỳ lệnh |
| **Chương 4** | Hệ thống bộ nhớ | Bộ đệm, bộ nhớ chính, bộ nhớ ảo, cơ chế phân trang |
| **Chương 5** | Bus và I/O | Phân xử bus, DMA, cơ chế gián đoạn |

---

## 0. Toàn cảnh: Hệ thống phần cứng máy tính

Trong chương "Từ transistor đến CPU", chúng ta đã hiểu CPU hoạt động như thế nào — từ lấy lệnh, giải mã, thực thi đến ghi kết quả. Nhưng CPU chỉ là một đơn vị thực thi, để máy tính thực sự "có thể sử dụng", vẫn cần sự phối hợp của một loạt các thành phần ngoại vi.

<CpuArchitectureDemo />

::: tip Phân tích từng tầng: Hệ thống phần cứng máy tính
- **Tầng thứ nhất: Lõi CPU**
  Chịu trách nhiệm thực thi lệnh, bao gồm đơn vị điều khiển (phát hành tín hiệu điều khiển) và đơn vị tính toán (thực hiện các phép toán số học logic)

- **Tầng thứ hai: Nhóm thanh ghi**
  Các đơn vị lưu trữ tốc độ cao bên trong CPU, bao gồm thanh ghi dùng chung và thanh ghi chuyên dụng (PC, IR, MAR, MDR, v.v.)

- **Tầng thứ ba: Bộ nhớ chính**
  Dùng để lưu trữ chương trình và dữ liệu, CPU truy cập thông qua bus địa chỉ và bus dữ liệu

- **Tầng thứ tư: Thiết bị I/O**
  Các thiết bị nhập vào/xuất ra kết nối với bus hệ thống thông qua bộ điều khiển I/O

- **Tầng thứ năm: Bus hệ thống**
  Kết nối CPU, bộ nhớ, I/O, là kênh truyền dữ liệu, bao gồm bus địa chỉ, bus dữ liệu, bus điều khiển
:::

---

## 1. Kiến trúc Von Neumann: "Hiến pháp" của máy tính hiện đại

### 1.1 Nguyên lý lưu trữ chương trình

Năm 1945, nhà toán học John von Neumann đã đề xuất ý tưởng kiến trúc **lưu trữ chương trình (Stored-program)** có tính chất thay đổi. Ý tưởng này đã đặt nền móng cho máy tính hiện đại.

::: tip Khái niệm cốt lõi
**Lưu trữ chương trình**: Chương trình được xem như một loại dữ liệu đặc biệt, lưu trữ trong bộ nhớ giống như dữ liệu thông thường. CPU có thể đọc và thực thi các lệnh chương trình lưu trữ trong bộ nhớ giống như đọc ghi dữ liệu.
:::

Điều này có nghĩa là:
- **Máy tính sơ kỳ**: Chương trình được lập trình bằng dây cứng, thay đổi chương trình cần hàn lại mạch
- **Kiến trúc Von Neumann**: Chương trình lưu trong bộ nhớ, thay đổi chương trình chỉ cần thay đổi nội dung bộ nhớ

### 1.2 Năm thành phần chính

Kiến trúc Von Neumann chia máy tính thành năm phần cốt lõi:

<RegisterDemo />

| Thành phần | Tiếng Anh | Chức năng | Bộ phận chính |
|-----------|----------|----------|-------------|
| **Đơn vị tính toán** | ALU (Arithmetic Logic Unit) | Thực hiện phép toán số học và logic | Bộ cộng, bộ dịch, bộ so sánh |
| **Bộ điều khiển** | CU (Control Unit) | Chỉ huy phối hợp hoạt động của các thành phần | Thanh ghi lệnh, bộ giải mã, bộ phát thời gian |
| **Bộ nhớ** | Memory | Lưu trữ chương trình và dữ liệu | Thanh ghi địa chỉ bộ nhớ (MAR), thanh ghi dữ liệu bộ nhớ (MDR) |
| **Thiết bị nhập vào** | Input | Nhập thông tin | Bàn phím, chuột, máy quét |
| **Thiết bị xuất ra** | Output | Xuất thông tin | Màn hình, máy in |

### 1.3 Đường dữ liệu

**Đường dữ liệu (Data Path)** là quỹ đạo mà dữ liệu lưu thông giữa các bộ phận chức năng. Bên trong CPU, đường dữ liệu kết nối:

- Nhóm thanh ghi
- Đơn vị tính toán logic (ALU)
- Thanh ghi dữ liệu bộ nhớ (MDR)

Chiều rộng của đường dữ liệu (có thể truyền bao nhiêu bit cùng lúc) trực tiếp ảnh hưởng đến hiệu suất của máy tính.

### 1.4 Nút cổ chai Von Neumann

Kiến trúc Von Neumann có một **nút cổ chai hiệu suất** nổi tiếng:

> Tốc độ truyền dữ liệu giữa CPU và bộ nhớ far thấp hơn tốc độ xử lý của CPU.

Điều này dẫn đến CPU thường trong tình trạng "chờ dữ liệu" không được sử dụng. Nhiều kỹ thuật tối ưu hóa máy tính hiện đại được phát triển xoay quanh vấn đề này:

| Kỹ thuật tối ưu hóa | Nguyên lý |
|------------------|---------|
| **Bộ đệm (Cache)** | Đặt bộ lưu trữ tốc độ cao dung lượng nhỏ gần CPU |
| **Đường ống lệnh** | Cho phép nhiều lệnh ở các giai đoạn khác nhau cùng lúc |
| **Siêu quy mô** | Phát hành nhiều lệnh trong cùng một chu kỳ xung nhịp |
| **Đa nhân song song** | Chia sẻ tác vụ tính toán giữa nhiều lõi CPU |

---

## 2. Hệ thống lệnh: Giao diện giữa CPU và phần mềm

Phần trước chúng ta biết ý tưởng cốt lõi của kiến trúc Von Neumann: **chương trình và dữ liệu được lưu trữ trong bộ nhớ giống nhau**. Nhưng điều này đặt ra một câu hỏi then chốt — "chương trình" được lưu trong bộ nhớ trông như thế nào? CPU làm sao hiểu nó?

Câu trả lời là **hệ thống lệnh (Instruction Set Architecture, ISA)**. Nếu so sánh CPU như một dịch vụ, thì hệ thống lệnh là **tài liệu API** của nó — nó định nghĩa tất cả các lệnh mà CPU có thể hiểu, định dạng của mỗi lệnh, và phạm vi dữ liệu mà lệnh có thể hoạt động. Mỗi dòng code bạn viết cuối cùng sẽ được trình biên dịch dịch thành một chuỗi gọi API này.

### 2.1 Từ code đến lệnh: Hành trình dịch của một dòng code

Trước tiên, chúng ta hãy xây dựng một nhận thức toàn cục: code bạn viết trong trình soạn thảo và những gì CPU thực sự thực thi, giữa chúng là cách nhau bởi vài tầng dịch.

<CodeToInstructionDemo />

Chuỗi dịch này là chìa khóa để hiểu hệ thống lệnh:

| Tầng | Nội dung | Ai có thể hiểu |
|-----|---------|--------------|
| Ngôn ngữ cấp cao | `int a = 10 + 5;` | Con người |
| Ngôn ngữ assembly | `MOV R1, #10` / `ADD R3, R1, R2` | Con người (cần đào tạo) |
| Mã máy | `0001 0001 0000 1010` | CPU |

::: tip Tại sao phải hiểu chuỗi này?
- Khi thấy lỗi biên dịch, bạn biết lỗi xảy ra ở bước "ngôn ngữ cấp cao → assembly"
- Khi gặp sự cố thời chạy, bạn biết vấn đề là ở giai đoạn CPU thực thi lệnh
- Khi hiểu tối ưu hóa hiệu suất, bạn biết trình biên dịch đã làm gì tối ưu trong quá trình "dịch"
- Khi chọn kiến trúc CPU (x86 vs ARM), bạn biết sự khác biệt là "API tập lệnh" khác nhau
:::

### 2.2 Một lệnh trông như thế nào?

Biết rằng code sẽ được dịch thành lệnh, câu hỏi tiếp theo là: **cấu trúc nội tại của một lệnh là gì?**

Về bản chất, mỗi lệnh máy chỉ là một chuỗi số nhị phân, nhưng nó có định dạng nội tại nghiêm ngặt. Hai phần lõi nhất:

- **Mã lệnh (Opcode)**: Cho CPU biết "làm gì" — cộng? nhảy? hay đọc bộ nhớ?
- **Toán hạng (Operand)**: Cho CPU biết "làm gì trên cái gì" — thanh ghi nào? địa chỉ bộ nhớ nào? hằng số nào?

Giống như một câu có cấu trúc "động từ + tân ngữ", lệnh cũng có cấu trúc "phép toán + đối tượng":

```
Lệnh:   ADD  R3, R1, R2
        ───  ──────────
        Mã lệnh  Toán hạng
        (cộng)  (R3 = R1 + R2)
```

Dựa trên số lượng toán hạng, định dạng lệnh từ đơn giản đến phức tạp có bốn loại:

<InstructionFormatDemo />

| Định dạng | Cấu trúc | Ví dụ | Tình huống sử dụng |
|----------|---------|------|------------------|
| Không địa chỉ | Chỉ có mã lệnh | `RET`(trở về) | Máy tính stack, toán hạng ẩn trong đỉnh stack |
| Một địa chỉ | Mã lệnh + 1 địa chỉ | `INC R1`(R1 cộng 1) | Phép toán một toán hạng |
| Hai địa chỉ | Mã lệnh + 2 địa chỉ | `MOV R1, R2` | Phổ biến nhất, truyền dữ liệu và tính toán |
| Ba địa chỉ | Mã lệnh + 3 địa chỉ | `ADD R3, R1, R2` | Không phá hủy toán hạng nguồn |

::: tip Tại sao có nhiều định dạng như vậy?
Đây là **sự cân bằng giữa không gian và tính linh hoạt**. Lệnh không địa chỉ ngắn nhất (tiết kiệm bộ nhớ), nhưng cần thêm các hoạt động stack; lệnh ba địa chỉ linh hoạt nhất (không phá hủy dữ liệu nguồn), nhưng chiếm nhiều bit hơn. Các kiến trúc CPU khác nhau sẽ chọn các kết hợp định dạng lệnh khác nhau.
:::

### 2.3 CPU tìm dữ liệu như thế nào? — Chế độ địa chỉ

Lệnh nói với CPU "cộng", nhưng hai số để cộng ở đâu? Có thể viết trực tiếp trong lệnh, có thể trong thanh ghi, hoặc có thể trong bộ nhớ ở một địa chỉ nào đó. **Chế độ địa chỉ** là quy tắc cho CPU biết "đi đâu để tìm toán hạng".

Dùng "tìm người" trong đời sống để so sánh:

| Chế độ địa chỉ | So sánh | Ví dụ lệnh | Giải thích |
|-------------|--------|---------|----------|
| **Địa chỉ tức thì** | Người đang đứng trước mặt bạn | `MOV R1, #100` | Dữ liệu viết trực tiếp trong lệnh, nhanh nhất |
| **Địa chỉ thanh ghi** | Gọi điện nội bộ tìm đồng nghiệp | `MOV R1, R2` | Dữ liệu trong thanh ghi CPU, rất nhanh |
| **Địa chỉ trực tiếp** | Biết số nhà, đến thẳng | `MOV R1, [0x1000]` | Lệnh có viết địa chỉ bộ nhớ |
| **Địa chỉ gián tiếp** | Hỏi lễ tân "Anh A ở phòng nào" | `MOV R1, [R2]` | Thanh ghi chứa địa chỉ, cần kiểm tra thêm lần |
| **Địa chỉ có chỉ số** | "Tòa 3 + tầng 5" tính ra phòng | `MOV R1, [R2+10]` | Địa chỉ cơ sở + độ lệch, dùng cho truy cập mảng |

<AddressingModeDemo />

::: tip Tại sao cần nhiều chế độ địa chỉ như vậy?
Các tình huống khác nhau cần chiến lược "tìm dữ liệu" khác nhau:
- **Gán hằng số** (`x = 100`) → địa chỉ tức thì, dữ liệu trong lệnh
- **Tính toán biến** (`a + b`) → địa chỉ thanh ghi, dữ liệu đã tải vào thanh ghi
- **Truy cập mảng** (`arr[i]`) → địa chỉ có chỉ số, địa chỉ cơ sở + độ lệch
- **Hoạt động con trỏ** (`*ptr`) → địa chỉ gián tiếp, thanh ghi chứa địa chỉ

Khi bạn viết `arr[i]` sẽ không nghĩ đến chế độ địa chỉ, nhưng trình biên dịch sẽ tự động chọn phương pháp phù hợp nhất.
:::

### 2.4 Danh sách khả năng của CPU — Phân loại lệnh

Bây giờ chúng ta biết định dạng lệnh và chế độ địa chỉ, câu hỏi cuối cùng: **CPU thực sự có thể làm những gì?**

Tất cả lệnh có thể được phân thành sáu loại, chúng bao phủ mọi điều máy tính có thể làm:

| Loại | Làm gì | Lệnh đại diện | Code tương ứng |
|-----|-------|-----------|-------------|
| **Truyền dữ liệu** | Vận chuyển dữ liệu | MOV, LOAD, STORE | `let x = y`, truyền tham số hàm |
| **Phép toán số học** | Cộng trừ nhân chia | ADD, SUB, MUL, DIV | `a + b`, `count++` |
| **Phép toán logic** | Thao tác bit | AND, OR, NOT, XOR | `flags & 0xFF`, kiểm tra quyền |
| **Phép toán dịch** | Dịch trái phải | SHL, SHR | `x << 2`(tương đương nhân 4) |
| **Chuyển đổi điều khiển** | Nhảy và gọi hàm | JMP, CALL, RET | `if`, `for`, gọi hàm |
| **Nhập vào xuất ra** | Giao tiếp với ngoại vi | IN, OUT | Đọc bàn phím, ghi màn hình |

::: tip Một hiểu biết then chốt
Tất cả code bạn viết — dù là logic kinh doanh phức tạp hay giao diện người dùng lịnh lợi — cuối cùng sẽ bị phân tích thành tổ hợp của sáu loại hoạt động cơ bản này. "Thông minh" của CPU không nằm ở việc nó có thể làm những việc phức tạp, mà ở khả năng nó thực thi những hoạt động đơn giản này hàng tỷ lần mỗi giây.
:::

### 2.5 Hai triết lý thiết kế: CISC vs RISC

Thiết kế hệ thống lệnh có một sự bất đồng cơ bản: **liệu mỗi lệnh có nên mạnh mẽ nhất có thể, hay liệu nó có nên đơn giản nhất có thể?**

Sự bất đồng này tạo ra hai trường phái, trực tiếp ảnh hưởng đến mỗi thiết bị bạn dùng hôm nay:

<CISCvsRISCDemo />

Dùng một so sánh để hiểu:
- **CISC giống dao quân sư Thụy Sỹ**: Một chiếc dao tích hợp kéo, mở nắp chai, tua vít……chức năng nhiều nhưng mỗi cái không nhất thiết tốt nhất
- **RISC giống bộ công cụ chuyên nghiệp**: Mỗi công cụ chỉ làm một việc, nhưng làm nhanh và tốt

::: tip Tại sao điện thoại của bạn dùng ARM, máy tính dùng x86?
- **x86 (CISC)** thống trị thị trường PC và máy chủ 40 năm, tích lũy một hệ sinh thái phần mềm khổng lồ. Thay đổi kiến trúc có nghĩa là tất cả phần mềm phải biên dịch lại
- **ARM (RISC)** thống trị các thiết bị di động nhờ ưu điểm tiết kiệm năng lượng. Pin điện thoại nhỏ, mỗi miliwatt đều quý giá
- **Apple Silicon** chứng minh rằng RISC cũng có thể đạt hiệu suất cao — chip M series vượt quá cả hiệu suất lẫn tiết kiệm năng lượng so với x86
- **RISC-V** là kiến trúc RISC mở nguồn, đang phát triển nhanh chóng trong lĩnh vực IoT, giáo dục, chip AI
:::

---

> **Tóm tắt**: Hệ thống lệnh là cầu nối giữa phần mềm và phần cứng. Code bạn viết thông qua trình biên dịch dịch thành lệnh, lệnh thông qua mã lệnh và toán hạng nói với CPU làm gì, với cái gì, chế độ địa chỉ quyết định dữ liệu đến từ đâu. Các thiết kế hệ thống lệnh khác nhau (CISC/RISC) quyết định đặc tính hiệu suất và tình huống áp dụng của CPU.
>
> Bây giờ chúng ta biết "cấu trúc tĩnh" của lệnh — nó trông như thế nào, có những loại nào. Câu hỏi tiếp theo là: **CPU bên trong thực thi từng lệnh từng bước như thế nào?** Đây là công việc của bộ điều khiển.

---

## 3. Bộ điều khiển: "Trung tâm chỉ huy" của CPU

### 3.1 Cấu tạo bộ điều khiển

Bộ điều khiển là "bộ não" của CPU, chịu trách nhiệm phối hợp các thành phần hoạt động theo yêu cầu lệnh:

<ControllerDemo />

| Thành phần | Chức năng |
|-----------|----------|
| **Bộ đếm chương trình (PC)** | Lưu trữ địa chỉ lệnh tiếp theo |
| **Thanh ghi lệnh (IR)** | Lưu trữ lệnh đang được thực thi |
| **Bộ giải mã lệnh** | Phân tích mã lệnh và toán hạng |
| **Bộ phát thời gian** | Tạo tín hiệu nhịp, điều khiển thời gian các thành phần |
| **Bộ tạo chuỗi vi hoạt động** | Tạo chuỗi tín hiệu điều khiển cần thiết để thực thi lệnh |

<PSWFlagDemo />

### 3.2 Chu kỳ lệnh

CPU thực thi một lệnh cần trải qua một **chu kỳ lệnh** hoàn chỉnh, thường bao gồm:

1. **Giai đoạn lấy lệnh (Fetch)**: Đọc lệnh từ bộ nhớ vào IR
2. **Giai đoạn giải mã (Decode)**: Phân tích ý nghĩa lệnh
3. **Giai đoạn thực thi (Execute)**: Thực hiện phép toán
4. **Giai đoạn truy cập bộ nhớ (Memory Access)**: Nếu cần, truy cập bộ nhớ
5. **Giai đoạn ghi kết quả (Write Back)**: Ghi kết quả vào thanh ghi hoặc bộ nhớ

### 3.3 Vi hoạt động

**Vi hoạt động** là hoạt động cơ bản nhất được điều khiển bởi tín hiệu điều khiển. Ví dụ, giai đoạn "lấy lệnh" có thể được phân tích thành các vi hoạt động sau:

| Xung nhịp | Vi hoạt động | Tín hiệu điều khiển |
|---------|------------|------------------|
| T1 | PC → MAR | PCout, MARin |
| T2 | MEM → MDR | MEMout, MDRin |
| T3 | MDR → IR | MDRout, IRin |
| T4 | PC + 1 → PC | PC+1, PCin |

### 3.4 Bộ điều khiển lập trình vs bộ điều khiển vi chương trình

| Đặc tính | Bộ điều khiển lập trình | Bộ điều khiển vi chương trình |
|--------|----------------------|---------------------------|
| **Cách thực hiện** | Mạch logic tổ hợp | Chuỗi vi lệnh (firmware) |
| **Tốc độ** | Nhanh | Chậm hơn một chút |
| **Độ khó thiết kế** | Phức tạp | Dễ hơn |
| **Tính linh hoạt** | Kém (thay đổi cần thiết kế lại mạch) | Tốt (chỉnh sửa vi chương trình là đủ) |
| **Ứng dụng típ** | Xử lý RISC | Xử lý CISC sơ kỳ |

---

## 4. Hệ thống bộ nhớ: Tại sao cần bộ đệm?

### 4.1 Cấu trúc phân tầng bộ nhớ

Các thiết bị lưu trữ của máy tính tạo thành cấu trúc hình kim tự tháp:

<StorageHierarchyDemo />

| Tầng | Loại lưu trữ | Thời gian truy cập | Dung lượng típ | Vị trí |
|------|------------|-------------|----------|--------|
| **Thanh ghi** | SRAM | <1ns | Mấy KB | Bên trong CPU |
| **Bộ đệm L1** | SRAM | ~1ns | 32-64KB | Gần lõi CPU |
| **Bộ đệm L2** | SRAM | ~3-10ns | 256KB-1MB | Bên trong chip CPU |
| **Bộ đệm L3** | SRAM | ~10-20ns | 2-16MB | Bên trong/dùng chung chip CPU |
| **Bộ nhớ chính (RAM)** | DRAM | ~50-100ns | 8-64GB | Trên bo mạch |
| **SSD** | Flash | ~10-100μs | 256GB-2TB | Trên bo mạch |
| **HDD** | Đĩa cứng | ~5-10ms | 1-10TB | Bên trong hộp |

::: tip So sánh về tốc độ
Nếu so sánh CPU truy cập L1 cache giống như **lấy một tờ giấy từ bàn**:
- Truy cập bộ nhớ → Đi thang máy xuống cửa hàng tiện lợi mua giấy
- Truy cập SSD → Lái xe đến thành phố khác mua giấy
- Truy cập HDD → Bay máy bay đến nước khác mua giấy

Sự khác biệt tốc độ có thể đạt **hàng triệu lần**!
:::

### 4.2 Nguyên lý bộ đệm

**Bộ đệm (Cache)** là bộ lưu trữ nhanh được đặt giữa CPU và bộ nhớ, ý tưởng cốt lõi dựa trên hai nguyên lý tính địa phương:

::: tip Nguyên lý tính địa phương
- **Tính địa phương theo thời gian**: Nếu một dữ liệu vừa được truy cập, rất có khả năng nó sẽ được truy cập lại rất sớm
- **Tính địa phương không gian**: Nếu một dữ liệu được truy cập, dữ liệu ở gần đó rất có khả năng cũng sẽ được truy cập
:::

#### Cách hoạt động của bộ đệm

1. **Cache hit (Bộ đệm trúng)**: Dữ liệu CPU cần có trong bộ đệm, đọc trực tiếp
2. **Cache miss (Bộ đệm trượt)**: Dữ liệu không trong bộ đệm, cần tải từ bộ nhớ

```
Tỷ lệ trúng = Số lần trúng / Tổng số truy cập
Thời gian truy cập trung bình = Tỷ lệ trúng × thời gian cache + (1-tỷ lệ trúng) × thời gian bộ nhớ
```

<CacheDemo />

### 4.3 Cách ánh xạ bộ đệm

| Cách | Nguyên lý | Ưu điểm | Nhược điểm |
|-----|---------|--------|----------|
| **Ánh xạ trực tiếp** | Mỗi khối bộ nhớ chỉ có thể để vào một vị trí cố định | Đơn giản nhanh | Tỷ lệ xung đột cao |
| **Ánh xạ tập hợp liên kết** | Mỗi khối bộ nhớ có thể để vào N vị trí (N đường) | Cân bằng tốc độ và tỷ lệ trúng | Thực hiện phức tạp |
| **Ánh xạ liên kết toàn phần** | Bất kỳ vị trí nào | Tỷ lệ xung đột thấp nhất | Thực hiện khó khăn (cần so sánh tất cả tags) |

### 4.4 Bộ nhớ ảo

**Bộ nhớ ảo** là một trừu tượng hóa quan trọng được cung cấp bởi hệ điều hành:

- Mỗi tiến trình đều cho rằng mình sở hữu toàn bộ không gian địa chỉ ảo
- Hệ điều hành chịu trách nhiệm dịch địa chỉ ảo thành địa chỉ vật lý
- Các trang không thường xuyên sử dụng có thể hoán ra đĩa (không gian hoán đổi)

::: tip So sánh bộ nhớ ảo
Hãy tưởng tượng bộ nhớ ảo như **quản lý phòng trong khách sạn**:
- Bạn (tiến trình) cho rằng toàn bộ tòa nhà là của bạn
- Thực sự khách sạn (OS) chỉ cấp phòng bạn cần hiện tại
- Phòng không ở sẽ được "hoán ra" kho chứa (đĩa cứng)
- Phòng cần thiết có thể "hoán vào" bất cứ lúc nào
:::

---

## 5. Bus và I/O: "Mạch máu" của máy tính

### 5.1 Bus hệ thống

**Bus (Đường dữ liệu)** là kênh dữ liệu kết nối các thành phần máy tính:

<BusSystemDemo />

| Loại bus | Chức năng | Hướng | Chiều rộng típ |
|---------|---------|------|-------------|
| **Bus địa chỉ** | Truyền địa chỉ bộ nhớ | Một chiều (CPU→bộ nhớ) | 32-bit/64-bit |
| **Bus dữ liệu** | Truyền dữ liệu | Hai chiều | 32-bit/64-bit |
| **Bus điều khiển** | Truyền tín hiệu điều khiển | Hai chiều | Nhiều tín hiệu |

### 5.2 Phân xử bus

Khi nhiều thiết bị cùng lúc yêu cầu sử dụng bus, cần cơ chế **phân xử** quyết định ai dùng trước:

| Cách phân xử | Giải thích |
|-----------|----------|
| **Phân xử tập trung** | Bộ phân xử trung tâm quyết định |
| **Phân xử phân tán** | Các thiết bị tự thương lượng |

### 5.3 Cách thức truy cập I/O

| Cách | Nguyên lý | Ưu điểm | Nhược điểm |
|-----|---------|--------|----------|
| **Truy vấn chương trình** | CPU thăm dò kiểm tra trạng thái I/O | Đơn giản | Tỷ lệ sử dụng CPU thấp |
| **Phương pháp gián đoạn** | I/O hoàn thành sau thông báo CPU | CPU có thể làm việc khác song song | Chi phí xử lý gián đoạn |
| **DMA** | Thiết bị I/O truy cập bộ nhớ trực tiếp | CPU không tham gia hoàn toàn | Cần bộ điều khiển DMA |

<IOMethodDemo />

### 5.4 Nguyên lý DMA

**DMA (Direct Memory Access, Truy cập bộ nhớ trực tiếp)** cho phép thiết bị I/O trao đổi dữ liệu trực tiếp với bộ nhớ:

<NetworkOverviewDemo />

- **Không DMA**: CPU tham gia toàn bộ quá trình truyền dữ liệu, CPU không thể làm việc khác
- **Có DMA**: CPU nói với bộ điều khiển DMA "truyền từ đây đến đó, truyền bao nhiêu", rồi làm việc khác, DMA hoàn thành thì thông báo CPU

::: tip So sánh DMA
Điều này giống như **gọi đồ ăn ngoài**:
- **Không DMA**: Bạn tự đi siêu thị mua, về nhà nấu (tham gia toàn bộ)
- **Có DMA**: Bạn gọi thằng giao hàng, anh ấy trực tiếp giao vào bếp (người khác lo, bạn chỉ cần "nhận")
:::

### 5.5 Cơ chế gián đoạn

**Gián đoạn** là cơ chế rất quan trọng trong hệ thống máy tính:

1. Sau khi thiết bị I/O hoàn thành, gửi **yêu cầu gián đoạn** đến CPU
2. CPU đang thực thi lệnh, sau khi hoàn thành lệnh hiện tại thì phản ứng lại gián đoạn
3. CPU lưu trữ trạng thái hiện tại, nhảy đến chương trình xử lý gián đoạn
4. Sau khi xử lý xong, khôi phục trạng thái tiếp tục thực thi

---

## 6. Tối ưu hóa hiệu suất CPU: Kỹ thuật đường ống

### 6.1 Đường ống lệnh

**Đường ống lệnh (Instruction pipeline)** là kỹ thuật song song giúp CPU đạt hiệu suất cao nhất:

<PipelineDemo />

#### Cách hoạt động của đường ống

```
Thực thi tuần tự (5 lệnh, 15 chu kỳ):
Lệnh 1: IF→ID→EX→MEM→WB
Lệnh 2:            IF→ID→EX→MEM→WB
Lệnh 3:                         IF→ID→EX→MEM→WB
...

Thực thi đường ống (5 lệnh, 9 chu kỳ):
Lệnh 1: IF→ID→EX→MEM→WB
Lệnh 2:    IF→ID→EX→MEM→WB
Lệnh 3:       IF→ID→EX→MEM→WB
...
```

Lý tưởng, N lệnh có CPI (chu kỳ mỗi lệnh) ≈ 1

### 6.2 Nguy hiểm đường ống

Mặc dù đường ống có thể nâng cao hiệu suất, nhưng cũng dẫn đến các vấn đề **nguy hiểm (Hazard)**:

| Loại | Nguyên nhân | Giải pháp |
|-----|----------|---------|
| **Nguy hiểm cấu trúc** | Xung đột tài nguyên phần cứng | Tăng phần cứng/lệnh chậm |
| **Nguy hiểm dữ liệu** | Lệnh sau cần kết quả lệnh trước | Chuyển tiếp dữ liệu/bubble/sắp xếp lệnh |
| **Nguy hiểm điều khiển** | Lệnh nhảy thay đổi luồng thực thi | Khe trễ/dự đoán nhánh |

---

## 7. Tóm tắt: Máy tính "chạy" như thế nào?

Hãy dùng thuật ngữ chuyên môn để kết nối toàn bộ quy trình:

> **Sau khi chương trình khởi động, hệ điều hành tải tệp thực thi từ đĩa vào bộ nhớ. Đơn vị lấy lệnh của CPU (IF) thông qua bus địa chỉ đọc lệnh từ bộ nhớ vào thanh ghi lệnh (IR). Bộ điều khiển giải mã (ID) lệnh, xác định loại hoạt động rồi tạo tín hiệu điều khiển tương ứng. Đơn vị tính toán (EX) thực hiện phép toán số học logic, nếu cần truy cập bộ nhớ thì thông qua bus dữ liệu truy cập bộ nhớ (MEM), cuối cùng kết quả ghi lại (WB) vào thanh ghi hoặc bộ nhớ. Toàn bộ quá trình được điều khiển bởi xung nhịp, bộ điều khiển phát hành chuỗi vi hoạt động phối hợp các thành phần hoạt động có trật tự.**

---

## Mở rộng đọc thêm

| Chủ đề | Nội dung học tập sâu hơn |
|------|----------------------|
| Kiến trúc máy tính | 《Tổ chức máy tính và thiết kế: Giao diện phần cứng/phần mềm》 - Patterson & Hennessy |
| Vi kiến trúc CPU | 《Hiểu sâu hệ thống máy tính》 - Bryant & O'Hallaron |
| Kiến trúc tập lệnh | Sách hướng dẫn ARMv8, sách hướng dẫn Intel x64 |
| Nguyên lý bộ đệm | Giao thức tính nhất quán cache (MESI), chiến lược ghi cache |
| Hệ điều hành | Các chương tiếp theo 《Hệ điều hành》 |

---

## Bước tiếp theo

Bây giờ bạn đã nắm vững kiến thức chuyên môn về nguyên lý tổ chức máy tính. Bạn có thể tiếp tục học:

- **[Hệ điều hành](./operating-systems.md)**: Hiểu cách chương trình chạy trên hệ điều hành, cách tiến trình, luồng, quản lý bộ nhớ được thực hiện
- **[Mã hóa, lưu trữ và truyền dữ liệu](./data-encoding-storage.md)**: Hiểu sâu cách dữ liệu được biểu diễn, lưu trữ và truyền trong máy tính
