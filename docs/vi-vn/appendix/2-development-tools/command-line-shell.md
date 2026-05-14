# Dòng Lệnh và Shell Script
> 💡 **Hướng Dẫn Học Tập**: Chương này nhằm cung cấp cho những bạn mới bắt đầu một cái nhìn hệ thống về cách thức hoạt động của terminal. Không cần có nền tảng chuyên môn về máy tính, chúng ta sẽ thông qua các bài demo tương tác, từng bước phân tích cơ chế hoạt động của terminal.

## 0. Bắt Đầu Nhanh: Làm Sao Mở Terminal?

Trước khi bạn bắt đầu học, đầu tiên phải tìm được nó. Terminal là "phụ kiện chuẩn" của mỗi hệ điều hành, bạn không cần cài đặt bất kỳ phần mềm nào để sử dụng nó.

::: info 🖥️ Cách mở trên các hệ điều hành khác nhau

** macOS (Mac)**

1.  Nhấn `Command (⌘) + Space` để mở Spotlight.
2.  Gõ `Terminal` hoặc `終端`.
3.  Nhấn Enter, bạn sẽ thấy một cửa sổ có chữ đen trên nền trắng (hoặc chữ trắng trên nền đen).

**🪟 Windows**

- **Cách 1 (CMD)**: Nhấn `Win + R`, gõ `cmd`, nhấn Enter. Đây là dòng lệnh cổ nhất.
- **Cách 2 (PowerShell)**: Nhấn `Win + R`, gõ `powershell`, nhấn Enter. Đây là terminal hiện đại hơn và mạnh mẽ hơn.
- _Gợi ý: Cả hai đều dùng được cho các thao tác đơn giản hàng ngày, nhưng khuyến nghị dùng PowerShell hoặc cài đặt WSL (Windows Subsystem for Linux) cho môi trường phát triển._

**🐧 Linux**

- Thường là tổ hợp phím `Ctrl + Alt + T`.
- Hoặc tìm `Terminal` trong menu ứng dụng.

:::

### 0.1 Thực Hành: Hãy Thử Ngay (Hands-on Lab)

Chỉ nói mà không làm thì không hiệu quả. Trước khi tìm hiểu những nguyên lý phức tạp, chúng ta sẽ trải nghiệm cảm giác "gõ lệnh" trực tiếp.

> 💡 **Gợi ý**: Để an toàn và tiện lợi, bạn nên thực hành trong **trình mô phỏng web** phía dưới. Nếu bạn tự tin, cũng có thể mở terminal thực tế trên máy theo hướng dẫn ở trên và thực hành cùng (kết quả là như nhau).

Trong bài tập này, bạn sẽ học được:

1.  **Xem tệp**: Học dùng `ls` hoặc `dir` để xem những gì có trong thư mục hiện tại.
2.  **Tạo và vào thư mục**: Học dùng `mkdir` để tạo thư mục mới, dùng `cd` để vào như cánh cửa truyền tải.
3.  **Tạo tệp mới**: Học dùng lệnh để nhanh chóng tạo tệp mới.
4.  **Cài đặt phần mềm**: Trải nghiệm cảm giác cài đặt thư viện Python hoặc phần mềm hệ thống bằng một dòng lệnh.
5.  **Xóa và dọn dẹp**: Học cách xóa tệp không cần thiết (dùng cẩn thận!).
6.  **Hỏi AI Trợ Giúp**: Đây là phần quan trọng nhất! Khi bạn quên lệnh, hãy học cách hỏi AI: "Trên Mac làm sao để xóa tệp?", nó sẽ cho bạn đáp án trực tiếp.

_Hãy chọn hệ điều hành mà bạn thường dùng phía dưới, rồi bắt đầu thực hành theo hướng dẫn:_

<TerminalHandsOn />

### 0.2 Tại Sao Phải Bỏ Chuột? (Why CLI?)

Bạn có thể tự hỏi: _"Giao diện đồ họa (GUI) hiện đại rồi, chỉ cần click chuột là xong, tại sao lại phải đối mặt với cửa sổ đen trắng và gõ những lệnh phức tạp?"_

Đây không phải để "tỏ vẻ hacker", mà vì trong những tình huống nhất định, **ngôn ngữ (lệnh) mạnh hơn cảu chuột nhiều**.

#### 1. Chuột Khó Biểu Đạt "Hàng Loạt" Và "Logic"

- **GUI (chuột)**: Phù hợp với "thấy gì click nấy". Nếu bạn muốn xóa một bức ảnh, click chuột phải rồi xóa là nhanh. Nhưng nếu bạn muốn "xóa tất cả ảnh được chụp năm 2023, dung lượng trên 5MB, định dạng PNG", chuột bó tay, bạn phải chọn lọc từng tấm từng tấm trong nửa ngày.
- **CLI (lệnh)**: Phù hợp với "mô tả những gì bạn muốn làm". Yêu cầu trên chỉ cần một dòng lệnh, máy tính sẽ tự động tìm tệp phù hợp và xử lý, dù có 10000 tấm cũng được.

#### 2. Lệnh Có Thể Ghi Lại Và Tái Sử Dụng

- **GUI**: Bạn cấu hình môi trường một lần, phải click vài chục lần menu. Lần tới chuyển máy tính khác, bạn phải nhớ lại để click lại, dễ dàng quên bước.
- **CLI**: Bạn có thể viết tất cả lệnh vào một tệp (script). Lần sau chỉ cần chạy tệp này, máy tính sẽ **không sai** khi lặp lại thao tác của bạn. Đây là nền tảng của "tự động hóa".

#### 3. Điều Khiển Từ Xa Là Lựa Chọn Duy Nhất

- **GUI**: Truyền hình ảnh giống như xem video HD, cần tốc độ mạng rất cao. Nếu mạng hơi lag, chuột sẽ giật, không thể hoạt động được.
- **CLI**: Truyền chỉ là văn bản thuần, vài chục ký tự. Dù trong vùng núi có sóng yếu, bạn vẫn có thể điều khiển mượt mà máy chủ ở đầu kia thế giới.

**Tóm Lại**: GUI phù hợp với **khám phá** (duyệt web, xem hình), CLI phù hợp với **sản xuất** (phát triển, vận hành, xử lý hàng loạt). Nhà phát triển dùng terminal vì nó **chính xác hơn, có kiểm soát hơn, hiệu quả hơn**.

## 1. Định Nghĩa Khái Niệm: Terminal Là Gì? (Definition)

_Terminal trên các hệ điều hành khác nhau có hình dáng khác nhau, **cách gõ lệnh cũng khác**. Click nút bên dưới để chuyển đổi xem, chú ý quan sát macOS, Windows và Linux làm thế nào dùng những lệnh khác nhau (như `dir` so với `ls`) để làm cùng một việc:_

<TerminalOSDemo />

Trước khi giao diện đồ họa (GUI) phổ biến, terminal là cách chính để con người tương tác với máy tính. Ngay cả ngày nay, nó vẫn là công cụ chính xác và hiệu quả nhất để nhà phát triển kiểm soát máy tính.

<TerminalDefinition />

Về bản chất, terminal là một **môi trường nhập/xuất dòng ký tự**:

- **Nhập**: Gửi lệnh qua bàn phím (tín hiệu ký tự).
- **Xuất**: Hiển thị phản hồi văn bản trên màn hình.

Nó không xử lý đồ họa, hình ảnh hay video phức tạp, mà tập trung vào **tương tác thông tin văn bản**.

## 2. Kiến Trúc Cốt Lõi: Nghệ Thuật Tách Rời (The Big Picture)

Trước khi đi sâu, hãy suy nghĩ một câu hỏi: **Cửa sổ terminal có thực sự hiểu được những gì bạn đang nói không?**

Thực ra, terminal (Terminal) giống như một **màn hình chỉ biết truyền lời**. Khi bạn gõ lệnh `date`, terminal không biết đó là "xem ngày" mà nó chỉ đóng gói 4 chữ cái này và gửi cho **Shell** ở phía sau — người thực sự quyết định.

Shell mới là "bộ não" có thể hiểu lời nói của bạn và chỉ huy máy tính làm việc.

Để hiểu rõ cách chúng phối hợp, chúng ta sẽ xem ba "người làm việc" có phân công rõ ràng. Để hiểu mối quan hệ của chúng, so sánh hay nhất là **trình duyệt** với **máy chủ web**.

### 2.1 Phân Công Vai Trò

- **🖥️ Terminal (Cửa Sổ Terminal) —— Giống "Trình Duyệt"**
  - **Nhiệm vụ**: Nó chỉ chịu trách nhiệm **nhập** (báo cáo phím bạn gõ cho đối phương) và **hiển thị** (vẽ ký tự mà đối phương gửi lại lên màn hình).
  - **Đặc điểm**: Nó **không có trí thông minh**, không biết `ls` hay `cd` là gì. Giống Chrome, dù bạn truy cập Baidu hay Google, nó chỉ render trang web.
  - _Terminal phổ biến_: Cửa sổ CMD/PowerShell trên Windows, Terminal.app trên macOS, terminal tích hợp trong VS Code.

- **🧠 Shell (Vỏ) —— Giống "Máy Chủ Web"**
  - **Nhiệm vụ**: Nó mới là bộ não có logic. Chạy ở phía sau, chịu trách nhiệm **nhận** chuỗi lệnh từ bạn, **phân tích** ý nghĩa, rồi **chỉ huy** hệ điều hành làm việc.
  - **Đặc điểm**: Nó vô hình vô ảnh, chỉ giao tiếp qua dòng văn bản với thế giới bên ngoài.
  - _Shell phổ biến_: Bash, Zsh, Fish, PowerShell.

- **⚙️ Kernel (Nhân) —— "Quản Gia" Phía Sau**
  - **Nhiệm vụ**: Lõi của hệ điều hành, chỉ nó mới điều khiển trực tiếp phần cứng (đọc/ghi ổ cứng, cấp phát bộ nhớ, điều khiển CPU).
  - **Quan Hệ**: Shell là "thư ký" của kernel, giúp bạn dịch lời nói người thành lời kernel hiểu.

### 2.2 Tại Sao Phải Tách Rời? (Khả Năng Thay Thế)

Vì **lớp hiển thị** (terminal) và **lớp logic** (Shell) hoàn toàn tách riêng, chúng có thể kết hợp tự do:

- **Đổi "Giao Diện"**: Bạn có thể dùng Terminal chuẩn trên macOS, hoặc tải iTerm2, hay dùng terminal trong VS Code. Chúng trông khác nhau, nhưng đều kết nối cùng một Shell (zsh), nên lệnh giống hệt.
- **Đổi "Bộ Não"**: Bạn có thể trong cùng một cửa sổ terminal, chuyển từ bash sang zsh, hoặc chuyển sang môi trường tương tác Python. Lúc này, terminal không đổi, nhưng logic xử lý lệnh thay đổi.

### 2.3 Quy Trình Tương Tác: Phím Mất Tích

Bạn có thể nghĩ: _"Tôi nhấn 'a' trên bàn phím, terminal vẽ 'a' lên màn hình."_
**Sai!** Quy trình thực tế như thế này (gọi là **Echo - Phản Âm**):

1.  **Nhấn 'a'**: Tín hiệu bàn phím gửi tới terminal.
2.  **Gửi Tín Hiệu**: Terminal gửi mã 'a' cho Shell.
3.  **Shell Xử Lý**: Shell nhận 'a', thấy không sao, gửi ngược lại 'a' cho terminal.
4.  **Hiển Thị**: Terminal nhận 'a' từ Shell, đó mới vẽ nó lên màn hình.

> 💡 **Thí Nghiệm Nhỏ**: Một số lệnh (như nhập mật khẩu) sẽ tắt chức năng phản âm của Shell. Lúc này bạn nhấn bàn phím, terminal gửi cho Shell, nhưng Shell **không gửi lại** gì, nên màn hình trống trơn. Đó là để bảo vệ quyền riêng tư.

**Tóm Gọn Quy Trình**:
Bạn gõ ở terminal ➡️ Tín hiệu gửi cho Shell ➡️ Shell gửi lại như cũ (bạn thấy ký tự) và hiểu ➡️ Shell chỉ huy kernel làm việc.

_Demo phía dưới cho thấy quy trình này, chú ý "bức tường" giữa Shell và kernel, cùng cách ký tự đi qua lại:_

<ArchitectureDemo />

## 3. Mô Hình Hình Ảnh: Hệ Thống Lưới (The Grid System)

Không giống giao diện đồ họa hiện đại dùng "pixel", terminal dựa vào **lưới ký tự (Character Grid)**.
Màn hình terminal được chia thành nhiều hàng và cột, mỗi ô được gọi là **ô đơn vị (Cell)**.

### 3.1 Cấu Tạo Của Ô Đơn Vị

Mỗi ô là đơn vị hiển thị nhỏ nhất của terminal, chứa hai loại thông tin cốt lõi:

1.  **Ký tự (Glyph)**: Chữ thực tế hiển thị (như `A`, `中`, `$`).
2.  **Thuộc Tính (Attributes)**: Kiểu dáng của ký tự (như màu chữ, màu nền, đậm, gạch chân).

Khi bạn kéo để thay đổi kích thước cửa sổ terminal, về bản chất là thay đổi **số hàng (Rows)** và **số cột (Columns)** của lưới.

_Hãy thử các thao tác phía dưới, quan sát cách lưới chứa ký tự:_

<TerminalGrid />

### 3.2 Kiểm Tra Kiểu Dáng

Terminal không thể hiển thị hình ảnh, toàn bộ "giao diện" được thực hiện bằng kết hợp màu sắc và kiểu dáng ký tự.

_Click vào ô phía dưới, xem những thuộc tính kiểu dáng ẩn sau mỗi ô:_

<CellInspector />

## 4. Giao Thức Truyền Thông: Chuỗi Thoát (Escape Sequences)

Bạn có thể thắc mắc: Vì terminal chỉ truyền văn bản, vậy chữ màu sắc, con trỏ di chuyển, xóa màn hình là làm thế nào?

Câu trả lời là **chuỗi thoát (Escape Sequences)**.
Đây là một chuỗi ký tự đặc biệt (thường bắt đầu bằng ký tự `ESC`). Khi terminal nhận những ký tự này, **nó không hiển thị chúng lên màn hình**, mà **giải thích thành lệnh điều khiển**.

Ví dụ:

- Ký tự thường `A` → Vẽ A lên màn hình.
- Chuỗi `\033[31m` → **Lệnh**: Đặt màu chữ sau là đỏ.
- Chuỗi `\033[2J` → **Lệnh**: Xóa màn hình.

Giống như bạn và bạn thân có lệnh: nếu tôi nói chuyện bình thường, bạn ghi lại; nếu tôi giơ tay trái (tương đương `ESC`), câu tiếp theo là lệnh chứ không phải nội dung.

_Click nút "Play" phía dưới, quan sát cách terminal xử lý từng ký tự trong dòng, và nhận biết những lệnh ẩn:_

<EscapeParserDemo />

_Component phía dưới giới thiệu nhiều loại chuỗi thoát khác nhau và hiệu ứng render của chúng:_

<EscapeSequences />

## 5. Cơ Chế Nhập: Dòng Byte (Input as Byte Stream)

Quá trình nhập thường bị hiểu lầm. Khi bạn nhấn bàn phím, terminal không trực tiếp "vẽ" ký tự lên màn hình, mà thực hiện **mã hóa và truyền**.

1.  **Bắt Phím**: Terminal bắt tác động phím vật lý của bạn.
2.  **Chuyển Đổi Mã**: Chuyển phím thành **chuỗi byte** cụ thể.
    - Nhấn `a` → Gửi byte `a`.
    - Nhấn `mũi tên lên` → Gửi chuỗi `^[[A`.
3.  **Gửi**: Gửi dòng byte cho Shell hoặc chương trình đang chạy.

**Điểm Chính**: Mọi phím bấm (kể cả phím chức năng, click chuột) ở tầng truyền đều là **dữ liệu byte**.

_Hãy bấm phím phía dưới, quan sát cách nhập của bạn được chuyển thành dữ liệu tầng thấp:_

<InputVisualizer />

## 6. Chế Độ Chạy: Máy Đánh Chữ vs Tay Cầm Chơi Game (Cooked vs. Raw Mode)

Terminal có hai "tính cách" hoàn toàn khác nhau. Hiểu điều này, bạn sẽ biết tại sao **gõ lệnh ở terminal** và **chơi game rắn**  là hai trải nghiệm hoàn toàn khác.

- **Chế Độ Xử Lý (Cooked Mode) —— Giống Máy Đánh Chữ**
  - Đây là chế độ mặc định.
  - **Hành Vi**: Ký tự bạn gõ sẽ bị terminal **giữ lại tạm thời**, cho tới khi bạn nhấn Enter.
  - **Lợi Ích**: Nó cho bạn cơ hội sửa. Gõ sai? Nhấn Backspace xóa lại, chương trình chẳng biết bạn từng gõ sai.
  - _Áp Dụng: Gõ lệnh thường ngày (như `ls`, `cd`)._

- **Chế Độ Thô (Raw Mode) —— Giống Tay Cầm Chơi Game**
  - Đây là chế độ "cao thủ".
  - **Hành Vi**: Mỗi phím bạn nhấn (kể cả phím mũi tên, Ctrl+tổ hợp), đều **gửi ngay lập tức** cho chương trình, không có buffer.
  - **Lợi Ích**: Chương trình phản ứng thời gian thực với thao tác bạn.
  - _Áp Dụng: Chơi game ở terminal (như rắn), dùng trình soạn Vim (trình soạn dùng toàn bàn phím)._

_Click nút phía dưới để chuyển đổi chế độ, cảm nhận khác biệt giữa "viết thư" và "chơi game":_

<CookedRawDemo />

## 7. Điều Khiển Tiến Trình: Tín Hiệu (Signals)

Nhấn `Ctrl+C` ở terminal thường dừng chương trình. Đây không phải gửi ký tự, mà kích hoạt **tín hiệu (Signal)**.

Tín hiệu là cơ chế thông báo ở tầng hệ điều hành, dùng để báo cho chương trình biết sự kiện nào đó xảy ra.

- **Ctrl+C** → Gửi `SIGINT` (Interrupt): Báo chương trình "hãy dừng thao tác hiện tại".
- **Ctrl+Z** → Gửi `SIGTSTP` (Suspend): Báo chương trình "hãy tạm dừng và treo lên nền".

Cơ chế này bỏ qua kênh nhập dữ liệu chuẩn, đảm bảo người dùng vẫn có quyền điều khiển khi chương trình bị treo.

<SignalsDemo />

## 8. Ứng Dụng Nâng Cao: Giao Diện Toàn Màn Hình Và Bộ Đệm (Buffers & TUI)

Bạn có để ý, khi dùng `vim` để sửa tệp hoặc `htop` để xem trạng thái hệ thống, chúng chiếm cả màn hình? Nhưng khi thoát, màn hình lập tức quay về trạng thái cũ, những dòng lệnh trước đó vẫn nguyên vẹn?

Vì terminal có hai "canvas" trong việc chuyển đổi:

- **Bộ Đệm Chính (Primary Buffer)**: Giống **tập nháp**.
  - Bạn viết một dòng, hệ thống trả lời một dòng.
  - Viết đầy thì chuyển trang (cuộn), những gì viết trước vẫn ở trên.
  - _Dùng cho: Gõ lệnh hàng ngày._

- **Bộ Đệm Dự Phòng (Alternate Buffer)**: Giống **bảng đen**.
  - Chương trình xóa bảng sạch, vẽ lên (hiển thị toàn màn hình).
  - Dù vẽ thế nào, cũng không ảnh hưởng tập nháp trên bàn bạn.
  - Khi thoát chương trình, như gập bảng lại, bạn quay về tập nháp.
  - _Dùng cho: Vim, Nano, game và phần mềm toàn màn hình._

_Click nút phía dưới, trải nghiệm cách "tập nháp" và "bảng đen" chuyển đổi tức thì:_

<BufferSwitchDemo />

---

## 9. Tóm Tắt (Summary)

Terminal không phải hộp đen bí ẩn, nó là giao diện tương tác văn bản tiêu chuẩn.

- **Hiển thị**: Dựa vào lưới và ký tự.
- **Điều khiển**: Dựa vào chuỗi thoát.
- **Tương tác**: Dựa vào dòng nhập xuất và tín hiệu.

Bằng cách hiểu những nguyên lý tầng dưới này, bạn không chỉ học thuộc lệnh một cách cứng nhắc, mà có thể thực sự hiểu logic chảy qua đằng sau mỗi lần gõ bàn phím.

## Phụ Lục: Bảng Thuật Ngữ Phổ Biến (Vocabulary)

| Thuật Ngữ              | Tiếng Anh              | Giải Thích                                                |
| :------------------ | :--------------------- | :------------------------------------------------- |
| **Terminal**          | Terminal               | Chương trình cửa sổ chịu trách nhiệm hiển thị và nhập (giao diện trước).                 |
| **Shell**         | Shell                  | Chương trình có logic, chịu trách nhiệm phân tích lệnh và thực thi (giao diện sau).             |
| **CLI**           | Command Line Interface | Giao diện dòng lệnh, một cách tương tác dựa trên văn bản.               |
| **TUI**           | Text User Interface    | Giao diện người dùng văn bản, dùng ký tự để xây dựng giao diện giả đồ họa ở terminal. |
| **Chuỗi Thoát**      | Escape Sequence        | Lệnh ký tự đặc biệt để điều khiển con trỏ terminal, màu sắc, v.v.           |
| **Nhập/Xuất Chuẩn** | Stdin/Stdout           | Kênh tiêu chuẩn để chương trình nhận dữ liệu và xuất dữ liệu.                 |

## Tài Liệu Tham Khảo (Reference)

- [How Terminals Work](https://how-terminals-work.vercel.app/): Cấu trúc và bài demo của bài viết này lấy cảm hứng sâu từ dự án này. Nếu bạn muốn tìm hiểu chi tiết kỹ thuật triển khai, chúng tôi rất khuyến khích đọc hướng dẫn gốc.
