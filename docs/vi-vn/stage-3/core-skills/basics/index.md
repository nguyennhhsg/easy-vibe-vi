# Hướng dẫn cơ bản bắt đầu nhanh Claude Code

Claude Code là công cụ lập trình AI nguyên bản do Anthropic phát hành chính thức, nó tích hợp trực tiếp khả năng của mô hình ngôn ngữ lớn vào terminal, cho phép bạn hợp tác với AI bằng ngôn ngữ tự nhiên để hoàn thành các tác vụ lập trình. Khác với các công cụ hoàn thành mã truyền thống, Claude Code có thể hiểu ngữ cảnh của toàn bộ dự án, thực hiện các tác vụ phát triển phức tạp, từ tạo mã đến tái cấu trúc, từ gỡ lỗi đến viết tài liệu, nó đều có thể thực hiện.

Chương này sẽ giúp bạn nhanh chóng nắm vững cách sử dụng cốt lõi của Claude Code, bao gồm cài đặt cấu hình, các hoạt động cơ bản, mẹo hữu ích và các lệnh thường dùng. Dù bạn là lần đầu tiếp xúc với công cụ lập trình AI hay muốn sử dụng Claude Code hiệu quả hơn, tất cả kiến thức cần thiết đều ở đây.

---

## Cài đặt nhanh chóng

Claude Code được xây dựng dựa trên Node.js, do đó trước khi cài đặt hãy đảm bảo hệ thống của bạn đã cài đặt Node.js 18 hoặc phiên bản cao hơn. Quá trình cài đặt rất đơn giản, thường chỉ mất vài phút.

### Tại sao cần Claude Code

Trong quy trình phát triển truyền thống, các nhà phát triển phải chuyển đổi liên tục giữa trình chỉnh sửa, terminal, trình duyệt và tài liệu. Claude Code tích hợp những quy trình làm việc này vào một giao diện thống nhất: bạn có thể viết mã, chạy thử nghiệm, xem tài liệu thậm chí hợp tác với các thành viên trong nhóm trong cùng một cửa sổ terminal. Điều quan trọng hơn là nó có thể hiểu cấu trúc dự án của bạn, ghi nhớ thói quen viết mã của bạn, thực sự trở thành trợ lý lập trình của bạn.

### Phương pháp 1: Cài đặt thủ công

Cài đặt thủ công phù hợp cho những nhà phát triển thích kiểm soát từng bước, cũng giúp bạn hiểu rõ hơn về các thành phần của công cụ.

```bash
# Cài đặt Claude Code CLI toàn cầu
# Sử dụng tham số -g để cài đặt lệnh toàn cầu, để bạn có thể sử dụng ở bất kỳ thư mục nào
npm install -g @anthropic-ai/claude-code

# Xác minh cài đặt có thành công không
# Nếu hiển thị số phiên bản (ví dụ: 0.1.25), cài đặt thành công
claude --version
```

Trong quá trình cài đặt, npm sẽ tự động tải xuống tất cả các phụ thuộc và cấu hình các biến môi trường. Nếu gặp sự cố về quyền hạn, bạn có thể thử thêm `sudo` trước lệnh (macOS/Linux) hoặc chạy terminal với tư cách quản trị viên (Windows).

### Phương pháp 2: Để AI Agent giúp bạn cài đặt

Nếu bạn đã sử dụng các trợ lý lập trình AI khác (như Cursor, Windsurf hoặc AI Agent của dự án này), bạn có thể để chúng giúp bạn hoàn thành cài đặt. Lợi ích của cách này là AI sẽ tự động phát hiện môi trường của bạn, xử lý các xung đột phụ thuộc có thể xảy ra, và chọn cách cài đặt tối ưu dựa trên cấu hình hệ thống của bạn.

**Chỉ cần nói như thế này:**

```
Giúp tôi cài đặt claude code của anthropic
```

Hoặc cụ thể hơn:

```
Cài đặt claude code cli và kiểm tra xem phiên bản Node.js có tương thích không
```

AI Agent sẽ:
1. Kiểm tra phiên bản Node.js hiện tại
2. Nếu không đáp ứng yêu cầu, nhắc nhở bạn nâng cấp
3. Thực hiện lệnh cài đặt
4. Xác minh kết quả cài đặt
5. Nếu có vấn đề, tự động cố gắng sửa chữa

### Khởi động lần đầu và khởi tạo

Sau khi cài đặt xong, hãy vào thư mục dự án của bạn để khởi động Claude Code:

```bash
# Vào thư mục dự án (Claude Code sẽ làm việc trong thư mục hiện tại)
cd /path/to/your/project

# Khởi động Claude Code
claude
```

Lần khởi động đầu tiên, Claude Code sẽ hướng dẫn bạn hoàn thành một số bước khởi tạo quan trọng:

1. **Đăng nhập tài khoản Anthropic**: Bạn cần có tài khoản Anthropic để sử dụng Claude Code. Nếu không có, hệ thống sẽ nhắc bạn đăng ký.

2. **Chọn gói sử dụng**:
   - **Gói miễn phí**: Phù hợp với học tập cá nhân và sử dụng nhẹ, có giới hạn gọi nhất định
   - **Gói Pro**: Phù hợp với các nhà phát triển chuyên nghiệp, cung cấp hạn ngạch gọi cao hơn và phản hồi ưu tiên

3. **Chấp thuận điều khoản sử dụng**: Đọc và chấp thuận điều khoản dịch vụ và chính sách bảo mật của Anthropic

4. **Tùy chọn: Cấu hình khóa API**: Nếu bạn có khóa API tùy chỉnh (ví dụ: lấy từ nhà cung cấp bên thứ ba), bạn có thể cấu hình nó lúc này

::: info Lưu ý đặc biệt cho người dùng khu vực Trung Quốc

Do các vấn đề về mạng, người dùng khu vực Trung Quốc có thể không thể truy cập trực tiếp dịch vụ chính thức của Anthropic. Claude Code hỗ trợ sử dụng các dịch vụ của bên thứ ba tương thích với định dạng API Anthropic, điều này hoàn toàn khả thi từ mặt kỹ thuật.

**Bạn có hai lựa chọn:**

1. **Sử dụng trực tiếp API Token**: Mua Token từ nhà cung cấp dịch vụ tương thích với Anthropic API, cấu hình qua biến môi trường
2. **Sử dụng Coding Plan**: Một số nhà cung cấp dịch vụ cung cấp Coding Plan chuyên dụng, được tối ưu hóa cho kịch bản mã, thường tiết kiệm hơn

**Cách làm được khuyến nghị**: Để AI Agent giúp bạn hoàn thành cấu hình. Chỉ cần cung cấp thông tin cấu hình từ nhà cung cấp (như địa chỉ API, khóa, v.v.), AI sẽ tự động đặt các biến môi trường chính xác.

**Để tìm hướng dẫn cấu hình chi tiết, vui lòng tham khảo:** [Cách cài đặt claudecode và cách cấu hình biến môi trường](/vi-vn/stage-2/backend/modern-cli/)

:::

---

## Bắt đầu nhanh: Làm một số thử nghiệm nhỏ

Sau khi cài đặt xong, đừng vội sử dụng trong các dự án chính thức, nên thực hiện một vài thử nghiệm nhỏ trước để làm quen với cách Claude Code hoạt động. 3 thử nghiệm này được thiết kế từ cơ bản đến nâng cao, tương ứng với ba khả năng cốt lõi của Claude Code: hiểu ngôn ngữ tự nhiên, tạo nội dung và thực thi mã.

### Thử nghiệm 1: Hội thoại — Cảm nhận khả năng hiểu biết của AI

Mục đích của thử nghiệm này là để bạn trải nghiệm khả năng hiểu ngôn ngữ tự nhiên của Claude Code. Khác với các công cụ tìm kiếm thông thường, Claude Code có thể hiểu ngữ cảnh, tiến hành đối thoại nhiều vòng và điều chỉnh câu trả lời dựa trên phản hồi của bạn.

**Hãy thử những cuộc hội thoại này:**

```
Xin chào, bạn là ai?
```
Claude sẽ giới thiệu bản thân mình là Claude Code, trợ lý lập trình AI do Anthropic phát triển.

```
Closure là gì? Phiên bản quá dài thì không cần
```
Quan sát cách Claude trả lời dựa trên gợi ý "quá dài thì không cần", cho một lời giải thích ngắn gọn nhưng chính xác.

```
JavaScript và TypeScript có sự khác biệt gì?
```
Câu hỏi này liên quan đến so sánh kỹ thuật, hãy xem Claude có thể cung cấp câu trả lời có cấu trúc, sâu sắc không.

**Yếu tố thử nghiệm**: Lưu ý phong cách trả lời của Claude — nó thường sẽ cung cấp kết luận cốt lõi trước, sau đó mở rộng chi tiết. Cách trả lời dạng "kim tự tháp đảo ngược" này rất thích hợp để nhanh chóng lấy thông tin.

### Thử nghiệm 2: Tạo tài liệu Markdown — Trải nghiệm tạo nội dung

Thử nghiệm này thể hiện khả năng tạo nội dung của Claude Code. Đối với các nhà phát triển, viết tài liệu thường là một trong những việc gây đau đầu nhất. Claude có thể nhanh chóng tạo tài liệu có cấu trúc rõ ràng và nội dung hoàn chỉnh dựa trên yêu cầu của bạn.

**Nhập lệnh này:**

```
Giúp tôi viết một tài liệu Markdown về các lệnh Git thường dùng
Yêu cầu: bao gồm lệnh, giải thích, ví dụ
```

**Claude sẽ làm gì:**

1. Phân tích nhu cầu của bạn: các lệnh Git thường dùng, định dạng Markdown, ba yếu tố (lệnh, giải thích, ví dụ)
2. Lên kế hoạch cấu trúc tài liệu: thường sẽ phân loại theo trường hợp sử dụng (khởi tạo, phát triển hàng ngày, quản lý nhánh, hợp tác từ xa, v.v.)
3. Tạo nội dung: cung cấp giải thích ngắn gọn và ví dụ thực tế cho mỗi lệnh
4. Định dạng đầu ra: sử dụng cú pháp Markdown, đảm bảo định dạng tiêu chuẩn

**Ví dụ về đầu ra dự kiến**:

```markdown
# Bảng tra cứu nhanh lệnh Git

## Khởi tạo kho lưu trữ

| Lệnh | Giải thích | Ví dụ |
|------|------|------|
| `git init` | Khởi tạo kho lưu trữ mới | `git init my-project` |
| `git clone` | Sao chép kho lưu trữ từ xa | `git clone https://github.com/user/repo.git` |

...
```

**Thử nghiệm nâng cao**: Bạn có thể thêm nhiều yêu cầu hơn, chẳng hạn như "thêm bình luận tiếng Việt", "sắp xếp theo tần suất sử dụng", "bao gồm xử lý lỗi phổ biến", v.v., để quan sát cách Claude điều chỉnh đầu ra.

### Thử nghiệm 3: Viết và chạy trò chơi — Quy trình làm việc với mã hoàn chỉnh

Thử nghiệm này là thử thách nhất, nó thể hiện quy trình làm việc với mã hoàn chỉnh của Claude Code: hiểu nhu cầu, viết mã, tạo tệp, chạy chương trình, xử lý lỗi. Thông qua thử nghiệm này, bạn có thể thực sự cảm nhận sức mạnh của trợ lý lập trình AI.

**Nhập lệnh này:**

```
Dùng Python viết một trò chơi rắn ăn chuối
Yêu cầu:
1. Sử dụng thư viện pygame
2. Có hiển thị điểm
3. Nhấn ESC để thoát

Sau khi viết xong hãy giúp tôi chạy nó
```

**Claude sẽ thực hiện các bước sau:**

**Bước 1: Kiểm tra môi trường**
- Kiểm tra xem Python đã được cài đặt chưa
- Kiểm tra xem thư viện pygame có sẵn không
- Nếu thiếu, nhắc nhở bạn cài đặt

**Bước 2: Viết mã**
- Tạo tệp trò chơi chính (chẳng hạn như `snake_game.py`)
- Cài đặt logic trò chơi: chuyển động của rắn, sinh ra thực ăn, phát hiện va chạm
- Thêm chức năng hiển thị điểm
- Cài đặt thoát bằng phím ESC

**Bước 3: Chạy trò chơi**
- Thực thi kịch bản Python để khởi động trò chơi
- Cửa sổ trò chơi sẽ bật lên, bạn có thể sử dụng các phím mũi tên để điều khiển rắn

**Bước 4: Hỗ trợ sau này**
- Nếu trò chơi có lỗi, bạn có thể nói trực tiếp "rắn xuyên tường rồi, sửa một chút"
- Nếu muốn thêm tính năng, ví dụ "tăng độ khó khi điểm số tăng", Claude sẽ tiếp tục chỉnh sửa

**Giá trị của thử nghiệm này**:

1. **Xác minh cài đặt**: Đảm bảo Claude Code có thể thực thi mã bình thường
2. **Trải nghiệm tương tác**: Cảm nhận quá trình phát triển hợp tác với AI
3. **Xây dựng tự tin**: Thấy AI có thể tự hoàn thành một chương trình có thể chạy được

**Các câu hỏi phổ biến**:

- **Q: Nếu tôi chưa cài đặt pygame?**
  - A: Claude sẽ phát hiện và nhắc nhở bạn chạy `pip install pygame`, hoặc bạn cũng có thể để Claude giúp bạn cài đặt

- **Q: Sau khi chạy trò chơi, terminal bị chiếm dụng rồi thì sao?**
  - A: Nhấn ESC để thoát khỏi trò chơi, hoặc tiếp tục sử dụng Claude Code ở cửa sổ terminal khác

- **Q: Có thể dùng ngôn ngữ lập trình khác không?**
  - A: Tất nhiên! Hãy thử "viết bằng JavaScript", "viết bằng HTML5 Canvas", v.v.

---

## Các mẹo lõi

Nắm vững những mẹo này sẽ giúp hiệu suất sử dụng Claude Code của bạn tăng gấp nhiều lần. Những mẹo này đến từ kinh nghiệm phát triển thực tế, bao gồm các tình huống hoạt động phổ biến nhất.

### Mẹo 1: Nhấn Esc hai lần để quay lại — Hoàn tác hoạt động sai lầm

Đây là phím tắt được sử dụng nhiều nhất và quan trọng nhất trong Claude Code. Khi hợp tác với AI, bạn có thể nói sai, đưa ra lệnh sai hoặc không hài lòng với câu trả lời của AI. Nhấn Esc hai lần có thể giúp bạn "quay ngược thời gian" một cách nhanh chóng.

**Giải thích phím tắt:**

```
Nhấn Esc một lần     → Xóa nội dung đang nhập (tương tự Ctrl+C)
Nhấn Esc hai lần     → Quay lại trạng thái đối thoại trước đó (hoàn tác một vòng đối thoại)
Nhấn Esc ba lần      → Xóa tất cả lịch sử đối thoại (bắt đầu lại)
```

**Các tình huống sử dụng:**

- **Tình huống A**: Bạn vô tình gửi một lệnh sai, Claude bắt đầu thực thi. Nhanh chóng nhấn Esc hai lần, quay lại trạng thái trước khi thực thi.
- **Tình huống B**: Câu trả lời của Claude không phải là những gì bạn muốn, bạn muốn đặt câu hỏi lại theo cách khác. Nhấn Esc hai lần hoàn tác, sắp xếp lại ngôn từ.
- **Tình huống C**: Đã có nhiều vòng đối thoại, ngữ cảnh hỗn loạn. Ba lần Esc xóa sạch, bắt đầu lại.

**⚠️ Lưu ý quan trọng**: Nhấn Esc hai lần hoàn tác là **trạng thái đối thoại**, không phải sửa đổi mã. Nếu Claude đã sửa đổi tệp của bạn, những sửa đổi này sẽ không được hoàn tác tự động. Bạn cần sử dụng thủ công `git checkout` hoặc `git reset` để khôi phục tệp.

**Đề xuất**: Trước khi thực hiện các hoạt động có thể sửa đổi mã lớn, hãy lưu công việc hiện tại trước (` git commit` hoặc `git stash`), như vậy nếu có vấn đề cũng có thể khôi phục nhanh chóng.

### Mẹo 2: Tham chiếu tệp với @ — Chỉ định ngữ cảnh chính xác

Mặc dù Claude Code có thể tự động đọc tệp dự án, nhưng tham chiếu tệp một cách rõ ràng có thể giúp AI hiểu chính xác hơn ý định của bạn, và cũng có thể tránh AI đọc các tệp không liên quan làm lãng phí Token.

**Cách sử dụng cơ bản:**

Thay vì nói mơ hồ:
```
Giải thích tệp src/utils.ts này
```

Tốt hơn là tham chiếu trực tiếp:
```
@src/utils.ts giải thích tệp này
```

**Cách sử dụng nâng cao:**

**So sánh phân tích nhiều tệp:**
```
@src/app.tsx @src/components/Header.tsx mối quan hệ giữa hai tệp này là gì?
```

**Tham chiếu thư mục:**
```
@src/components/ tóm tắt tất cả các thành phần trong thư mục này
```

**Tham chiếu dòng cụ thể (kết hợp với trình chỉnh sửa mã):**
```
@src/utils.ts:45-60 giải thích tác dụng của đoạn mã này
```

**Mẹo sử dụng:**

1. **Tab hoàn thành**: Sau khi nhập `@`, nhấn phím Tab, Claude sẽ hiển thị danh sách tệp trong thư mục hiện tại, có thể sử dụng phím mũi tên để chọn
2. **Đường dẫn tương đối**: Hỗ trợ tham chiếu đường dẫn tương đối, chẳng hạn `@./config.json` hoặc `@../shared/types.ts`
3. **Khớp mờ**: Có thể nhập tên tệp một phần, chẳng hạn `@utils` sẽ khớp với `src/utils.ts` hoặc `src/utils/index.ts`

### Mẹo 3: ! Thực thi lệnh — Tích hợp terminal

Claude Code có khả năng thực thi lệnh terminal tích hợp sẵn, không cần chuyển sang cửa sổ terminal khác để chạy lệnh.

**Cách sử dụng cơ bản:**

```
!npm test           # Chạy thử nghiệm
!git status         # Xem trạng thái Git
!ls -la             # Liệt kê tệp
```

**Các tình huống ứng dụng thực tế:**

**Tình huống: Chạy thử nghiệm và phân tích nguyên nhân thất bại**
```
!npm test
# Sau khi thử nghiệm thất bại
Phân tích nguyên nhân thất bại của thử nghiệm và sửa mã
```

**Tình huống: Xem các điểm khác biệt Git**
```
!git diff
# Sau đó để Claude giải thích nội dung thay đổi
Tóm tắt nội dung chính của những thay đổi này
```

**Tình huống: Xây dựng dự án**
```
!npm run build
# Nếu xây dựng thất bại
Xây dựng báo lỗi rồi, hãy giúp tôi sửa
```

**⚠️ Gợi ý bảo mật:**

Claude Code sẽ hỏi bạn có thực thi những lệnh nhất định (như `rm -rf`, `sudo`, v.v.) không. Đây là cơ chế bảo vệ, vui lòng xác nhận cẩn thận.

### Mẹo 4: /plan Lên kế hoạch trước rồi mới viết mã — Cách mở đúng cho các tác vụ phức tạp

Đối với các tác vụ phát triển phức tạp, việc bắt đầu viết mã trực tiếp thường kém hiệu quả. Lệnh `/plan` cho phép Claude vào chế độ lập kế hoạch, trước tiên lập một kế hoạch chi tiết, sau đó thực hiện từng bước một.

**Cách sử dụng:**

```
/plan
Tôi muốn thêm chức năng xác thực người dùng, vui lòng giúp tôi lập kế hoạch thực hiện
```

**Claude sẽ làm gì:**

1. **Phân tích nhu cầu**: Hiểu tính năng bạn muốn thực hiện
2. **Đánh giá tình trạng hiện tại**: Xem cấu trúc dự án hiện tại và tech stack
3. **Lập kế hoạch**: Liệt kê chi tiết các bước cần làm
4. **Xác nhận phương án**: Thảo luận kế hoạch với bạn, điều chỉnh dựa trên phản hồi

**Ví dụ đầu ra:**

```
📋 Kế hoạch thực hiện tính năng xác thực người dùng

Giai đoạn 1: Thiết kế cơ sở dữ liệu
- [ ] Tạo bảng users (id, email, password_hash, created_at)
- [ ] Tạo bảng sessions (id, user_id, expires_at)

Giai đoạn 2: API backend
- [ ] POST /api/auth/register - Đăng ký người dùng
- [ ] POST /api/auth/login - Đăng nhập người dùng
- [ ] POST /api/auth/logout - Đăng xuất người dùng
- [ ] GET /api/auth/me - Lấy thông tin người dùng hiện tại

Giai đoạn 3: Tích hợp frontend
- [ ] Tạo trang đăng nhập
- [ ] Tạo trang đăng ký
- [ ] Thêm bảo vệ route

Giai đoạn 4: Thử nghiệm
- [ ] Viết thử nghiệm đơn vị
- [ ] Viết thử nghiệm tích hợp

Bạn muốn bắt đầu từ giai đoạn nào? Hoặc cần điều chỉnh kế hoạch?
```

**Thực hành tốt nhất:**

- Đối với các tác vụ vượt quá 30 phút, hãy sử dụng `/plan` trước
- Sau khi lập kế hoạch, có thể thực hiện từng giai đoạn, kiểm tra một lần sau khi hoàn thành mỗi giai đoạn
- Nếu yêu cầu thay đổi, có thể chạy lại `/plan` để điều chỉnh kế hoạch

### Mẹo 5: /init Tự động tạo cấu hình — Khởi tạo dự án nhanh chóng

`/init` là một trong những lệnh mạnh nhất của Claude Code. Nó có thể tự động quét dự án của bạn, hiểu tech stack và cấu trúc, sau đó tạo một tệp cấu hình `CLAUDE.md` hoàn chỉnh.

**Cách sử dụng:**

```
/init
```

**Claude sẽ thực hiện các bước sau:**

1. **Quét cấu trúc dự án**: Xác định framework, ngôn ngữ, công cụ xây dựng
2. **Phân tích tệp cấu hình**: Đọc package.json, tsconfig.json, v.v.
3. **Kiểm tra phong cách mã**: Hiểu các quy ước đặt tên, cách tổ chức tệp
4. **Tạo CLAUDE.md**: Tạo tệp cấu hình chứa thông tin dự án

**Ví dụ CLAUDE.md được tạo:**

```
# Dự án của tôi

## Tech Stack
- Framework: Next.js 14 (App Router)
- Ngôn ngữ: TypeScript
- Kiểu dáng: Tailwind CSS
- Quản lý trạng thái: Zustand
- Cơ sở dữ liệu: Prisma + PostgreSQL

## Lệnh thường dùng

\`\`\`bash
npm run dev      # Khởi động máy chủ phát triển
npm run build    # Xây dựng sản xuất
npm run test     # Chạy thử nghiệm
npx prisma migrate dev  # Di chuyển cơ sở dữ liệu
\`\`\`

## Các quy chuẩn mã
- Sử dụng các thành phần hàm + Hooks
- Đặt tên tệp: PascalCase (thành phần), camelCase (hàm tiện ích)
- Tiêu chuẩn commit: Conventional Commits
```

**Tại sao điều này lại quan trọng:**

`CLAUDE.md` là "bộ nhớ dự án" của Claude Code. Mỗi lần khởi động, Claude sẽ tự động đọc tệp này, hiểu được nền tảng dự án. Điều này có nghĩa là:

- Bạn không cần giải thích công nghệ dự án mỗi lần
- Claude sẽ biết các quy chuẩn mã và thực hành tốt nhất của bạn
- Khi hợp tác với nhóm, các thành viên mới cũng có thể nhanh chóng hiểu dự án

**Đề xuất**: Sau khi khởi tạo dự án mới, hãy chạy ngay `/init`, sau đó điều chỉnh cấu hình được tạo dựa trên tình hình thực tế.

### Mẹo 6: /compact Nén ngữ cảnh — Tiết kiệm Token

Cửa sổ ngữ cảnh của Claude Code là có giới hạn (thường là 200K Token). Đối thoại dài sẽ tiêu thụ lượng Token lớn, không chỉ tăng chi phí mà còn có thể dẫn đến mất thông tin quan trọng từ đầu vì bị đẩy ra khỏi cửa sổ ngữ cảnh.

**Cách sử dụng:**

```
/compact
```

**Nguyên tắc hoạt động:**

`/compact` sẽ phân tích lịch sử đối thoại hiện tại, trích xuất thông tin chính yếu (chẳng hạn như các quyết định đã đưa ra, mã đã tạo, yêu cầu đã xác nhận), sau đó tạo một bản tóm tắt ngắn gọn. Các đối thoại tiếp theo dựa trên tóm tắt này, chứ không phải lịch sử hoàn chỉnh.

**Khi nào nên sử dụng:**

- Sau 5-6 vòng đối thoại
- Cảm thấy Claude bắt đầu "quên" nội dung trước đó
- Muốn chuyển sang tác vụ con mới nhưng vẫn muốn giữ lại bối cảnh chính

**Đề xuất sử dụng:**

```
# Sau đối thoại dài, nén
/compact

# Tiếp tục làm việc
Bây giờ chúng ta đã hoàn thành mô-đun người dùng, tiếp theo hãy làm mô-đun đơn hàng
```

### Mẹo 7: Sử dụng Claude Code hỗ trợ Git commit

Trong Claude Code, quy trình commit được khuyến nghị là: trước tiên để Claude giúp bạn xem diff, sắp xếp thông báo commit, sau đó bạn thực hiện lệnh Git chuẩn để hoàn thành commit. Điều này vừa rõ ràng vừa thuận tiện để bạn xác nhận nội dung sửa đổi trước khi commit.

Tham khảo tài liệu chính thức:

- [Built-in commands](https://code.claude.com/docs/en/commands)
- [Discover plugins](https://code.claude.com/docs/en/discover-plugins)

**Quy trình làm việc được khuyến nghị:**

```bash
# 1. Xem các thay đổi hiện tại
/diff
!git status

# 2. Để Claude tóm tắt nội dung thay đổi và tạo thông báo commit
Dựa trên git diff hiện tại, vui lòng tạo thông báo commit theo quy chuẩn Conventional Commits,
và giải thích bằng tiếng Việt tại sao phân loại như vậy

# 3. Sau khi bạn xác nhận, hãy thực hiện commit Git chuẩn
!git add -A
!git commit -m "feat(docs): update Claude Code workflow guidance"
```

**Lợi ích của cách làm này:**

1. **Gần hơn với khả năng hiện tại của chính thức**: Không phụ thuộc vào các lệnh đã bị loại bỏ
2. **Minh bạch hơn**: Bạn có thể kiểm tra diff và thông báo commit trước, sau đó quyết định có commit hay không
3. **Tính phổ quát**: Khi chuyển sang IDE AI khác hoặc môi trường Git thuần túy, quy trình làm việc vẫn áp dụng được

**Nếu bạn muốn giữ lại trải nghiệm "commit bằng một lệnh":**

Claude Code hiện nay khuyến nghị sử dụng plugin để bổ sung lại khả năng này. Ví dụ, plugin `commit-commands` chính thức sẽ cung cấp các lệnh như vậy.

```bash
# 1. Thêm thị trường plugin chính thức
/plugin marketplace add anthropics/claude-code

# 2. Cài đặt plugin quy trình làm việc commit
/plugin install commit-commands@anthropics-claude-code

# 3. Tải lại plugin
/reload-plugins

# 4. Sử dụng lệnh plugin để commit
/commit-commands:commit
```

**Lưu ý bổ sung:**

- `/commit-commands:commit` là lệnh do plugin cung cấp, không phải lệnh mặc định của Claude Code hiện tại
- Nếu bạn chỉ muốn kiểm tra sửa đổi trước khi commit, hãy ưu tiên sử dụng `/diff`, hoặc để Claude giải thích trực tiếp `git diff`
- Chính thức cũng đã đánh dấu `/review` là lỗi thời; nếu bạn cần khả năng tương tự, hãy sử dụng plugin hoặc quy trình xem xét bằng ngôn ngữ tự nhiên

### Mẹo 8: Shift+Tab tự động chấp nhận — Tăng hiệu suất

Theo mặc định, Claude Code sẽ hỏi xác nhận trước khi sửa đổi mã. Điều này rất hữu ích ở giai đoạn học, nhưng khi đã quen có thể cảm thấy phiền toái. Nhấn `Shift+Tab` để bật chế độ tự động chấp nhận, giúp quy trình làm việc mượt mà hơn.

**Cách sử dụng:**

- Nhấn `Shift+Tab` → Vào chế độ tự động chấp nhận
- Nhấn lại `Shift+Tab` → Thoát chế độ tự động chấp nhận

**So sánh chế độ:**

| Chế độ | Hành động | Tình huống áp dụng |
|------|------|----------|
| Chế độ mặc định | Hỏi xác nhận mỗi khi sửa đổi | Giai đoạn học, mã quan trọng |
| Tự động chấp nhận | Áp dụng sửa đổi trực tiếp | Sau khi quen, phát triển nhanh |

**⚠️ Lưu ý:**

- Ở chế độ tự động chấp nhận, Claude sẽ sửa đổi tệp trực tiếp mà không có xác nhận lần thứ hai
- Khuyến nghị kết hợp với Git, như vậy ngay cả khi có sự cố cũng có thể khôi phục
- Đối với các hoạt động nhạy cảm (như xóa tệp, sửa đổi cấu hình), Claude vẫn sẽ hỏi

### Mẹo 9: Ctrl+C Hủy hoạt động — Phanh khẩn cấp

Khi Claude đang thực hiện một tác vụ chạy lâu, hoặc bạn nhận ra lệnh bị sai, `Ctrl+C` là nút "phanh khẩn cấp" của bạn.

**Cách sử dụng:**

- Nhấn `Ctrl+C` một lần → Hủy hoạt động hiện đang thực thi
- Nhấn `Ctrl+C` hai lần → Thoát hoàn toàn Claude Code

**Các tình huống sử dụng:**

- Claude đang chạy một lệnh tốn thời gian, bạn muốn ngắt
- Claude bắt đầu tạo một lượng lớn mã không liên quan
- Bạn nhận ra lệnh bị sai, muốn dừng ngay

**Khác biệt với Esc hai lần:**

- `Ctrl+C`: Dừng **hoạt động** hiện đang tiến hành (chẳng hạn như chạy lệnh, tạo mã)
- `Esc hai lần`: Quay lại **trạng thái đối thoại** (hoàn tác một vòng đối thoại)

### Mẹo 10: /context Xem lượng sử dụng ngữ cảnh — Tối ưu hóa tiêu thụ Token

`/context` hiển thị tình hình sử dụng ngữ cảnh của phiên làm việc hiện tại, giúp bạn hiểu rõ tiêu thụ Token, tối ưu hóa chi phí sử dụng.

**Cách sử dụng:**

```
/context
```

**Ví dụ đầu ra:**

```
📊 Tình hình sử dụng ngữ cảnh

Sử dụng Token: 45,230 / 200,000 (22.6%)
Tham chiếu tệp: 12 tệp
Số vòng đối thoại: 8

Tệp tiêu thụ Token nhiều nhất:
1. src/api/users.ts (3,420 tokens)
2. node_modules/@types/react/index.d.ts (2,890 tokens)
3. src/components/Dashboard.tsx (1,560 tokens)

Đề xuất:
- Mức sử dụng hiện tại lành mạnh, không cần nén
- Nếu muốn giảm tiêu thụ, có thể thêm node_modules vào .claudeignore
```

**Cách sử dụng thông tin này:**

1. **Xác định tệp lớn**: Nếu một tệp nhất định tiêu thụ lượng Token lớn, hãy cân nhắc liệu có thực sự cần tệp đó không
2. **Tối ưu hóa .claudeignore**: Thêm các tệp không liên quan (chẳng hạn như node_modules, sản phẩm xây dựng) vào danh sách bỏ qua
3. **Quyết định nén**: Khi mức sử dụng vượt quá 70%, hãy cân nhắc sử dụng `/compact`

### Mẹo 11: /resume Khôi phục phiên — Chuyển đổi đối thoại đa tác vụ

Khi xử lý nhiều tác vụ, bạn có thể mở nhiều đối thoại. `/resume` cho phép bạn nhanh chóng chuyển quay lại phiên làm việc trước đó trong cuộc trò chuyện hiện tại, mà không cần thoát và khởi động lại.

**Cách sử dụng:**

```
/resume
```

**Nguyên tắc hoạt động:**

Claude Code sẽ tự động ghi nhớ các phiên đối thoại trước đó. Khi bạn sử dụng `/resume`, nó sẽ chuyển ngôn ngữ về ngữ cảnh của phiên làm việc trước, bảo toàn tất cả nội dung thảo luận và trạng thái trước đó.

**Các tình huống sử dụng:**

**Tình huống A: Xử lý nhiều tác vụ song song**
```
# Tác vụ 1: Sửa lỗi
claude> Sửa vấn đề xác thực trang đăng nhập
# ... có một đoạn đối thoại...

# Tác vụ 2: Thêm tính năng mới (phiên làm việc mới)
claude> Thêm chức năng đăng ký người dùng
# ... có một đoạn đối thoại khác...

# Chuyển về tác vụ 1
claude> /resume
# Tiếp tục công việc sửa lỗi trước đó
```

**Tình huống B: Tìm kiếm tạm thời rồi quay lại**
```
claude> Giải thích thuật toán này
# ... thảo luận thuật toán...

claude> /resume
# Tự động chuyển về công việc phát triển mã trước đó
```

**Tình huống C: Tiếp tục sau khi ngắt đối thoại**
```
claude> Tiếp tục công việc trước
# Nếu trước đó bạn ngắt một tác vụ nào đó, có thể dùng /resume để quay lại
```

**So sánh với các lệnh liên quan:**

| Lệnh | Chức năng | Tình huống sử dụng |
|------|------|----------|
| `/resume` | Chuyển về phiên làm việc trước đó trong cuộc trò chuyện hiện tại | Nhiều tác vụ, cần chuyển đổi liên tục |
| `claude -c` | Tiếp tục phiên làm việc gần nhất | Thoát rồi kết nối lại cùng phiên |
| `claude -r` | Khôi phục phiên làm việc trước | Thoát rồi khôi phục trạng thái trước |
| `Esc hai lần` | Quay lại trạng thái đối thoại trước | Hoàn tác vòng đối thoại gần nhất |

**Đề xuất sử dụng:**

1. **Quản lý đa tác vụ**: Khi cần chuyển đổi giữa nhiều tác vụ, sử dụng `/resume` hiệu quả hơn việc mô tả lại ngữ cảnh
2. **Bộ nhớ phiên**: Mỗi phiên có ngữ cảnh độc lập, `/resume` giúp bảo toàn những ngữ cảnh này
3. **Kết hợp với /compact**: Trong phiên dài, có thể trước tiên `/compact` nén, sau đó `/resume` chuyển, giữ ngữ cảnh rõ ràng

---

## Cấu hình cốt lõi

Cấu hình hợp lý có thể giúp Claude Code thích ứng tốt hơn với dự án và nhóm của bạn. Phần này giới thiệu tác dụng của tệp cấu hình, mức độ ưu tiên và cách tối ưu hóa cho các tình huống sử dụng khác nhau.

### Vị trí tệp cấu hình và mức độ ưu tiên

Claude Code sử dụng chiến lược cấu hình phân lớp, các mức cấu hình khác nhau có phạm vi và mức độ ưu tiên khác nhau. Hiểu rõ cơ chế này giúp bạn quản lý cấu hình linh hoạt hơn.

**Mức độ ưu tiên cấu hình (từ cao đến thấp):**

| Vị trí | Phạm vi | Mục đích | Có commit Git |
|------|--------|------|--------------|
| `.claude/settings.local.json` | Dự án cục bộ | Cài đặt tùy chỉnh cá nhân | ❌ Không |
| `.claude/settings.json` | Chia sẻ dự án | Cấu hình thống nhất nhóm | ✅ Có |
| `~/.claude/settings.json` | Toàn cầu | Cấu hình mặc định cá nhân | ❌ Không |

**Quy tắc hợp nhất cấu hình:**

- Cấu hình có mức độ ưu tiên cao sẽ ghi đè các cấu hình cùng tên ở mức thấp
- Các mục cấu hình không xung đột sẽ được hợp nhất
- Cấu hình mức dự án ưu tiên hơn cấu hình toàn cầu, cấu hình cá nhân ưu tiên hơn cấu hình chia sẻ

**Các tình huống ứng dụng thực tế:**

**Tình huống 1: Dự án nhóm**
```
~/.claude/settings.json          # Cài đặt trình chỉnh sửa mặc định của bạn
.claude/settings.json            # Quy chuẩn mã thống nhất, cấu hình quyền hạn của nhóm
.claude/settings.local.json      # Ưu tiên gỡ lỗi của bạn, cài đặt chủ đề
```

**Tình huống 2: Dự án cá nhân**
```
~/.claude/settings.json          # Cấu hình mặc định toàn cầu
.claude/settings.json            # Cấu hình dự án cụ thể (chẳng hạn như quy tắc quyền hạn đặc biệt)
```

### CLAUDE.md - Bộ nhớ dự án

`CLAUDE.md` là tệp cấu hình quan trọng nhất của Claude Code, nó như một "hướng dẫn sử dụng" dự án. Mỗi lần khởi động Claude Code, nó sẽ tự động đọc `CLAUDE.md` trong thư mục hiện tại, hiểu được nền tảng dự án, tech stack và các quy chuẩn.

**Tại sao CLAUDE.md lại quan trọng như vậy?**

Tưởng tượng tình huống này: bạn gia nhập một dự án mới, cần hiểu tech stack, các quy chuẩn mã, các lệnh thường dùng. Thường bạn phải mất vài giờ để đọc tài liệu, xem mã, hỏi đồng nghiệp. Nhưng với `CLAUDE.md`, Claude Code sẽ biết tất cả thông tin này khi khởi động, bạn có thể bắt đầu hợp tác hiệu quả ngay lập tức.

**Mẫu tối thiểu khả dụng:**

```
# [Tên dự án]

## Tech Stack
- Framework: React 18 + TypeScript
- Quản lý trạng thái: Zustand
- Kiểu dáng: Tailwind CSS
- Công cụ xây dựng: Vite

## Lệnh thường dùng

\`\`\`bash
npm run dev      # Khởi động máy chủ phát triển (cổng 5173)
npm run test     # Chạy thử nghiệm đơn vị
npm run build    # Xây dựng sản xuất
npm run lint     # Kiểm tra mã
\`\`\`

## Các quy chuẩn mã
- Sử dụng các thành phần hàm + Hooks
- Đặt tên tệp: PascalCase (thành phần), camelCase (hàm tiện ích)
- Git commit sử dụng quy chuẩn Conventional Commits
- Tất cả các lệnh gọi API phải đi qua bao bọc request thống nhất
```

**Mẫu hoàn chỉnh (được khuyến nghị):**

```
# [Tên dự án]

## Tổng quan dự án
Một câu mô tả chức năng chính và người dùng mục tiêu của dự án.

## Tech Stack
### Frontend
- Framework: React 18 + TypeScript
- Routing: React Router v6
- Trạng thái: Zustand + React Query
- Kiểu dáng: Tailwind CSS + Headless UI
- Xây dựng: Vite

### Backend (nếu có)
- Runtime: Node.js + Express
- Cơ sở dữ liệu: PostgreSQL + Prisma
- Xác thực: JWT + bcrypt

## Cấu trúc dự án

\`\`\`
src/
├── components/      # Các thành phần có thể tái sử dụng
├── pages/           # Các thành phần trang
├── hooks/           # Các Hook tùy chỉnh
├── lib/             # Các hàm tiện ích
├── types/           # Các kiểu TypeScript
└── api/             # Các lệnh gọi API
\`\`\`

## Lệnh thường dùng

\`\`\`bash
# Phát triển
npm run dev              # Khởi động máy chủ phát triển
npm run dev:mock         # Phát triển sử dụng dữ liệu Mock

# Thử nghiệm
npm run test             # Chạy tất cả thử nghiệm
npm run test:watch       # Chạy thử nghiệm ở chế độ theo dõi
npm run test:coverage    # Tạo báo cáo phạm vi thử nghiệm

# Chất lượng mã
npm run lint             # Kiểm tra ESLint
npm run lint:fix         # Tự động sửa vấn đề ESLint
npm run format           # Định dạng Prettier
npm run typecheck        # Kiểm tra kiểu TypeScript

# Xây dựng
npm run build            # Xây dựng sản xuất
npm run preview          # Xem trước xây dựng sản xuất
\`\`\`

## Quy chuẩn phát triển
### Phong cách mã
- Sử dụng các thành phần hàm, tránh các thành phần lớp
- Ưu tiên sử dụng Hooks tùy chỉnh để bao gọi logic
- Props của thành phần phải định nghĩa giao diện TypeScript

### Quy trình làm việc Git
- Tên nhánh: tiền tố `feature/`、`fix/`、`refactor/`
- Thông báo commit tuân theo Conventional Commits
- PR phải đạt kiểm tra CI và Code Review

### Yêu cầu hiệu suất
- Lazy load thành phần, giảm thời gian tải trang đầu tiên
- Hình ảnh sử dụng định dạng WebP, bật lazy load
- Thời gian phản hồi API kiểm soát dưới 200ms

## Biến môi trường

\`\`\`bash
# .env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=MyApp
\`\`\`

## Các câu hỏi thường gặp

### Máy chủ phát triển không khởi động được?

Kiểm tra xem cổng 5173 có bị chiếm dụng không, hoặc thử `npm run dev -- --port 3000`

### Lỗi kiểu?

Chạy `npm run typecheck` để xem thông báo lỗi chi tiết
```

**Tạo nhanh CLAUDE.md:**

Nếu bạn đã có dự án nhưng chưa có `CLAUDE.md`, hãy chạy lệnh `/init` để để Claude tự động tạo:

```bash
claude
# Trong Claude Code nhập
/init
```

Claude sẽ phân tích cấu trúc dự án, package.json, mã hiện có, tạo `CLAUDE.md` phù hợp với tình hình thực tế. Sau khi tạo, nên kiểm tra và điều chỉnh theo nhu cầu.

### .claudeignore - Tiết kiệm Token

Tệp `.claudeignore` cho Claude Code biết những tệp nào không nên đọc vào ngữ cảnh. Cấu hình hợp lý có thể giảm đáng kể tiêu thụ Token (thường giảm 40-60%), đồng thời tăng tốc độ phản hồi.

**Tại sao cần .claudeignore?**

Khi hiểu dự án, Claude Code cố gắng đọc các tệp liên quan. Nhưng một số tệp không giúp ích gì cho việc hiểu dự án, thay vào đó chúng sẽ:
- Tiêu thụ lượng Token lớn (chẳng hạn như các tệp định nghĩa kiểu trong node_modules)
- Thêm nhiễu (chẳng hạn như tệp nhật ký, sản phẩm xây dựng)
- Bao gồm thông tin nhạy cảm (chẳng hạn như tệp .env)

**Cấu hình được khuyến nghị:**

```
# ===== Thư mục phụ thuộc =====
# Những thư mục này chứa nhiều mã của bên thứ ba, Claude không cần đọc
node_modules/
.pnp/
.pnp.js

# ===== Sản phẩm xây dựng =====
# Các tệp được tạo, không chứa thông tin mã nguồn
dist/
build/
.next/
out/
*.tsbuildinfo

# ===== Tệp nhật ký =====
# Nhật ký được tạo trong thời gian chạy, không giúp hiểu dự án
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# ===== Liên quan thử nghiệm =====
# Báo cáo phạm vi thử nghiệm, dữ liệu coverage
coverage/
.nyc_output/

# ===== Trình chỉnh sửa/IDE =====
# Cấu hình trình chỉnh sửa và tệp tạm thời
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# ===== Tệp hệ thống =====
# Tệp hệ thống macOS, Windows
.DS_Store
Thumbs.db

# ===== Biến môi trường =====
# Bao gồm thông tin nhạy cảm, không nên đọc
.env
.env.local
.env.*.local

# ===== Tệp tài nguyên lớn =====
# Hình ảnh, video và các tệp nhị phân khác
*.png
*.jpg
*.jpeg
*.gif
*.svg
*.ico
*.mp4
*.webm

# ===== Tệp khoá (tùy chọn) =====
# Nếu bạn không cần Claude phân tích phiên bản phụ thuộc, có thể bỏ qua
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
```

**Mẹo cấu hình:**

1. **Bắt đầu từ cấu hình tối thiểu**: Trước tiên bỏ qua node_modules và sản phẩm xây dựng, quan sát tiêu thụ Token
2. **Điều chỉnh theo dự án**: Nếu là dự án có nhiều hình ảnh, thêm bộ lọc hình ảnh; nếu là dự án tài liệu, giữ tệp Markdown
3. **Tối ưu hóa định kỳ**: Sử dụng `/context` để xem những tệp nào tiêu thụ Token nhiều nhất, cân nhắc thêm vào danh sách bỏ qua

### Cấu hình quyền hạn

Claude Code mặc định sẽ hỏi xác nhận trước khi thực hiện các hoạt động nhạy cảm. Thông qua cấu hình `permissions` trong `settings.json`, bạn có thể kiểm soát chi tiết những hoạt động nào có thể tự động thực hiện, những hoạt động nào cần xác nhận, những hoạt động nào hoàn toàn cấm.

**Cấu trúc cấu hình quyền hạn:**

```json
{
  "permissions": {
    "allow": [
      // Tự động cho phép, không hỏi
    ],
    "ask": [
      // Hỏi xác nhận trước khi thực thi
    ],
    "deny": [
      // Hoàn toàn cấm
    ]
  }
}
```

**Cú pháp cấu hình:**

Quy tắc quyền hạn sử dụng định dạng `loại_hoạt_động(mẫu_khớp)`:

| Loại hoạt động | Giải thích | Ví dụ |
|----------|------|------|
| `Bash` | Thực thi lệnh terminal | `Bash(git status)` |
| `Edit` | Chỉnh sửa tệp | `Edit(src/**/*.ts)` |
| `Read` | Đọc tệp | `Read(README.md)` |
| `Write` | Tạo tệp mới | `Write(src/components/*.tsx)` |

**Mẫu khớp hỗ trợ ký tự đại diện:**

- `*` khớp với ký tự tuỳ ý (không bao gồm `/`)
- `**` khớp với đường dẫn tuỳ ý
- `?` khớp với ký tự đơn

**Ví dụ cấu hình thực tế:**

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Read(src/**/*.ts)",
      "Write(src/components/*.tsx)"
    ],
    "ask": [
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",
      "Bash(npm install:*)",
      "Bash(npm run build)",
      "Edit(package.json)",
      "Edit(tsconfig.json)",
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",
      "Edit(.git/*)",
      "Write(/etc/*)",
      "Read(/etc/passwd)"
    ]
  }
}
```

**Đề xuất cấu hình:**

1. **Giai đoạn phát triển**: Đặt quyền hạn rộng hơn, tăng tốc độ lặp
2. **Môi trường sản xuất**: Siết chặt quyền hạn, đặc biệt là các hoạt động liên quan đến triển khai, dữ liệu nhạy cảm
3. **Hợp tác nhóm**: Để quyền hạn cơ bản trong `settings.json` (chia sẻ), điều chỉnh cá nhân trong `settings.local.json`

### Thư mục Rules - Quản lý quy tắc mô-đun

Đối với các dự án lớn, `CLAUDE.md` duy nhất có thể trở nên quá dài và khó bảo trì. Claude Code hỗ trợ sử dụng **thư mục Rules** để quản lý mô-đun, chia tách các quy chuẩn khác nhau thành các tệp độc lập.

**Cấu trúc thư mục:**

```
.claude/
├── settings.json          # Tệp cấu hình chính
├── CLAUDE.md              # Tổng quan dự án (vẫn cần)
└── rules/                 # Thư mục quy tắc
    ├── 00-security.md     # Quy tắc bảo mật (toàn cầu)
    ├── 01-coding-style.md # Phong cách mã (toàn cầu)
    ├── 10-api.md          # Quy chuẩn phát triển API
    ├── 11-frontend.md     # Quy chuẩn phát triển frontend
    ├── 12-backend.md      # Quy chuẩn phát triển backend
    └── 20-testing.md      # Quy chuẩn thử nghiệm
```

**Đề xuất đặt tên tệp:**

Sử dụng tiền tố số để kiểm soát thứ tự tải (chẳng hạn `00-`, `01-`), đảm bảo các quy tắc cơ bản được tải trước, các quy tắc cụ thể được tải sau.

**Định dạng tệp quy tắc:**

Tệp quy tắc hỗ trợ YAML frontmatter để kiểm soát phạm vi áp dụng:

```markdown
---
# Tùy chọn: chỉ định đường dẫn tệp áp dụng quy tắc
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"

# Tùy chọn: chỉ định lệnh áp dụng quy tắc
commands:
  - "generate api"
  - "create endpoint"

# Tùy chọn: mức độ ưu tiên quy tắc (số càng nhỏ ưu tiên càng cao)
priority: 10
---

# Quy chuẩn phát triển API

## Thiết kế route
- Phong cách RESTful, sử dụng danh từ số nhiều
- Kiểm soát phiên bản: /api/v1/users
- Tài nguyên lồng nhau: /api/v1/users/123/orders

## Định dạng yêu cầu/phản hồi
- Sử dụng JSON thống nhất
- Phản hồi lỗi phải bao gồm code và message
- Phản hồi phân trang sử dụng cấu trúc { data, pagination }

## Yêu cầu bảo mật
- Tất cả các endpoint phải xác minh xác thực (trừ endpoint công khai)
- Hoạt động nhạy cảm cần xác nhận lần thứ hai
- Cài đặt giới hạn tốc độ để ngăn chặn lạm dụng
```

**Thừa kế và ghi đè quy tắc:**

- Quy tắc toàn cầu (không có frontmatter hoặc `globs: *`) áp dụng cho tất cả tệp
- Quy tắc đường dẫn cụ thể chỉ áp dụng cho các tệp khớp
- Khi nhiều quy tắc xung đột, quy tắc có mức độ ưu tiên cao hơn có hiệu lực
- Quy tắc cụ thể có thể ghi đè quy tắc toàn cầu

**Ví dụ tình huống sử dụng:**

**Tình huống 1: Dự án frontend-backend tách biệt**
```
.claude/rules/
├── 00-general.md          # Quy chuẩn chung (thông báo commit, quy ước đặt tên)
├── 10-backend.md          # Quy chuẩn backend (NestJS cụ thể)
├── 11-frontend.md         # Quy chuẩn frontend (React cụ thể)
└── 20-database.md         # Quy chuẩn cơ sở dữ liệu (Prisma cụ thể)
```

**Tình huống 2: Kiến trúc microservice**
```
.claude/rules/
├── 00-global/             # Quy tắc toàn cầu
│   ├── security.md
│   └── logging.md
├── 10-services/           # Quy tắc dịch vụ cụ thể
│   ├── user-service.md
│   ├── order-service.md
│   └── payment-service.md
└── 20-shared/             # Quy tắc thành phần chia sẻ
    ├── shared-lib.md
    └── common-utils.md
```

**Đề xuất di chuyển:**

Nếu bạn đã có một `CLAUDE.md` lớn, có thể di chuyển theo các bước sau:

1. Tạo thư mục `.claude/rules/`
2. Chia nội dung `CLAUDE.md` theo chủ đề
3. Thêm frontmatter phù hợp cho mỗi tệp quy tắc
4. Giữ `CLAUDE.md` làm tổng quan dự án, loại bỏ quy chuẩn chi tiết
5. Thử nghiệm để đảm bảo quy tắc tải chính xác

---

## Các lệnh hoạt động cốt lõi

Claude Code cung cấp bộ lệnh hoạt động phong phú, giúp bạn hợp tác hiệu quả với AI. Những lệnh này được chia thành nhiều loại: lệnh Slash (chức năng tích hợp sẵn), hệ thống ký tự (hoạt động nhanh), và lệnh ngôn ngữ tự nhiên (phát triển hàng ngày).

### Tra cứu nhanh lệnh Slash

Lệnh Slash là chức năng tích hợp sẵn của Claude Code, bắt đầu bằng `/`. Chúng cung cấp hoạt động tiêu chuẩn, chẳng hạn như khởi tạo dự án, quản lý cấu hình, xem trạng thái, v.v.

| Lệnh | Chức năng | Tình huống sử dụng |
|------|------|----------|
| `/help` | Hiển thị tất cả lệnh | Tra cứu nhanh lệnh |
| `/init` | Khởi tạo dự án, tạo CLAUDE.md | Dự án mới hoặc thêm cấu hình |
| `/plan` | Vào chế độ lập kế hoạch | Lập kế hoạch trước khi viết mã dự án phức tạp |
| `/clear` | Xóa lịch sử đối thoại | Khi ngữ cảnh hỗn loạn, bắt đầu lại |
| `/compact` | Nén ngữ cảnh | Tiết kiệm Token sau đối thoại dài |
| `/diff` | Mở chế độ xem diff tương tác | Xem những thay đổi chưa commit |
| `/plugin` | Quản lý plugin | Cài đặt mở rộng commit, review, v.v. |
| `/context` | Xem mức sử dụng ngữ cảnh | Tối ưu hóa tiêu thụ Token |
| `/cost` | Xem chi phí phiên làm việc | Quan tâm đến chi phí sử dụng |
| `/config` | Mở bảng điều khiển cấu hình | Sửa đổi cài đặt |
| `/permissions` | Quản lý quyền hạn | Điều chỉnh quyền hoạt động |
| `/model` | Chuyển đổi mô hình AI | Chọn mô hình khác |

**Ví dụ kết hợp lệnh:**

```bash
# Quy trình phát triển hoàn chỉnh
/plan                    # 1. Lập kế hoạch
# ... thực hiện phát triển ...
/diff                    # 2. Xem thay đổi
Hãy tạo thông báo commit dựa trên git diff hiện tại
!git add -A              # 3. Lưu giữ thay đổi
!git commit -m "..."     # 4. Commit mã
/cost                    # 5. Xem chi phí
```

### Hệ thống ký tự

Hệ thống ký tự là cách hoạt động nhanh của Claude Code, sử dụng các ký hiệu đặc biệt để kích hoạt nhanh chóng các chức năng cụ thể.

| Ký hiệu | Tên | Mục đích | Ví dụ |
|------|------|------|------|
| `/` | Lệnh Slash | Thực thi hoạt động tích hợp sẵn | `/help`, `/plan` |
| `@` | Tham chiếu At | Tham chiếu tệp/thư mục | `@src/app.tsx` |
| `!` | Chế độ Bang | Thực thi lệnh terminal | `!npm test` |
| `&` | Chạy nền | Thực thi tác vụ ở nền | `&npm run dev` |

**Mẹo kết hợp ký hiệu:**

```bash
# Kết hợp nhiều ký hiệu
@src/utils.ts !npm test
# Giải thích: đọc utils.ts, sau đó chạy thử nghiệm

@src/components/ @src/pages/ so sánh cấu trúc của hai thư mục này
# Giải thích: tham chiếu đồng thời hai thư mục để so sánh

!git diff @src/app.tsx giải thích những thay đổi này
# Giải thích: xem diff Git, sau đó để Claude giải thích thay đổi của tệp cụ thể
```

### Hoạt động tệp

Hoạt động tệp là chức năng được sử dụng thường xuyên nhất trong phát triển hàng ngày. Claude Code hỗ trợ đọc, chỉnh sửa, tạo, xóa và các hoạt động tệp khác.

**Đọc tệp:**

```bash
# Đọc cơ bản
@src/app.tsx giải thích tệp này

# Đọc và phân tích
@src/utils/helpers.ts tìm những vấn đề hiệu suất tiềm ẩn

# Đọc so sánh
@src/components/OldButton.tsx @src/components/NewButton.tsx so sánh sự khác biệt giữa hai thành phần này
```

**Chỉnh sửa tệp:**

```bash
# Chỉnh sửa đơn giản
Sửa src/utils/date.ts để hàm formatDate hỗ trợ định dạng tiếng Việt

# Chỉnh sửa phức tạp
@src/api/users.ts tái cấu trúc tệp này:
1. Trích xuất logic xử lý lỗi lặp lại vào hàm handleError thống nhất
2. Sử dụng async/await thay thế chuỗi Promise
3. Thêm chú thích JSDoc

# Chỉnh sửa hàng loạt
Chuyển đổi tất cả các thành phần lớp trong src/components/ thành các thành phần hàm
```

**Tạo tệp:**

```bash
# Tạo một tệp
Tạo src/components/UserCard.tsx, thực hiện một thành phần thẻ hiển thị thông tin người dùng

# Tạo nhiều tệp liên quan
Tạo mô-đun người dùng:
1. src/types/user.ts - định nghĩa giao diện User
2. src/api/users.ts - lệnh gọi API liên quan đến người dùng
3. src/components/UserCard.tsx - thành phần thẻ người dùng
4. src/hooks/useUser.ts - Hook lấy dữ liệu người dùng
```

**Xóa tệp:**

```bash
# Xóa với xác nhận
Xóa src/old-component.tsx (thành phần này không được sử dụng nữa)

# Claude sẽ hỏi xác nhận và có thể gợi ý bạn kiểm tra xem có tệp nào khác tham chiếu đến nó không
```

### Hoạt động Git

Claude Code tích hợp sâu rộng với Git, cho phép bạn hoàn thành quy trình kiểm soát phiên bản hoàn chỉnh mà không rời khỏi terminal.

**Xem trạng thái:**

```bash
# Xem trạng thái Git
Hiển thị trạng thái Git và những thay đổi chưa commit

# Xem thay đổi chi tiết
!git diff
Giải thích nội dung thay đổi của src/api/users.ts
```

**Tạo commit:**

```bash
# Xem thay đổi
/diff

# Để Claude tạo thông báo commit
Vui lòng tạo thông báo Conventional Commit dựa trên git diff hiện tại

# Commit thủ công
!git add -A
!git commit -m "..."
```

**Hoạt động nhánh:**

```bash
# Tạo nhánh tính năng
!git checkout -b feature/user-authentication

# Sau khi phát triển xong
Vui lòng tạo thông báo commit dựa trên những thay đổi hiện tại
!git add -A
!git commit -m "..."
!git push -u origin feature/user-authentication
```

**Ví dụ quy trình Git hoàn chỉnh:**

```bash
# 1. Bắt đầu tính năng mới
!git checkout -b feature/payment-integration

# 2. Phát triển tính năng (Claude giúp viết mã)
Tạo mô-đun thanh toán hỗ trợ Alipay và WeChat Pay

# 3. Chạy thử nghiệm
!npm test

# 4. Xem thay đổi
/diff

# 5. Tạo và xác nhận thông báo commit
Vui lòng tạo thông báo Conventional Commit dựa trên git diff hiện tại
!git add -A
!git commit -m "..."

# 6. Đẩy lên từ xa
!git push -u origin feature/payment-integration

# 7. Tạo PR (tùy chọn, sử dụng GitHub CLI)
!gh pr create --title "feat: add payment integration" --body "Hỗ trợ thanh toán Alipay và WeChat Pay"
```

### Hoạt động mã

Hoạt động mã là khả năng cốt lõi của Claude Code, bao gồm tạo, giải thích, tái cấu trúc, tối ưu hóa, v.v.

**Tạo mã:**

```bash
# Tạo thành phần
Tạo một React Hook quản lý trạng thái xác thực người dùng, bao gồm đăng nhập, đăng xuất, kiểm tra quyền hạn

# Tạo hàm tiện ích
Tạo hàm tiện ích định dạng ngày, hỗ trợ thời gian tương đối (chẳng hạn "2 giờ trước")

# Tạo mô-đun hoàn chỉnh
Tạo mô-đun đơn hàng, bao gồm:
- Trang danh sách đơn hàng
- Trang chi tiết đơn hàng
- API tạo đơn hàng
- Quản lý trạng thái đơn hàng
```

**Giải thích mã:**

```bash
# Giải thích từng dòng
Giải thích từng dòng src/algorithms/quicksort.ts

# Giải thích cấp cao
@src/services/payment.ts giải thích thiết kế kiến trúc của mô-đun này

# Giải thích logic phức tạp
Giải thích hoạt động reduce trong src/utils/dataTransformer.ts
```

**Tái cấu trúc mã:**

```bash
# Tái cấu trúc kiến trúc
Chuyển đổi các thành phần lớp trong src/components/ thành các thành phần hàm

# Tái cấu trúc hiệu suất
Tối ưu hóa hiệu suất render của src/App.tsx, giảm re-render không cần thiết

# Dọn dẹp mã
@src/utils/helpers.ts tái cấu trúc tệp này:
1. Xóa các hàm không được sử dụng
2. Trích xuất logic lặp lại thành hàm chung
3. Thêm định nghĩa kiểu
4. Tối ưu hóa đặt tên hàm
```

**Gỡ lỗi mã:**

```bash
# Phân tích lỗi
Chạy npm test thất bại rồi, phân tích nguyên nhân lỗi và sửa

# Phân tích hiệu suất
@src/components/DataTable.tsx thành phần này render rất chậm, tìm nút thắt hiệu suất

# Phân tích nhật ký
!cat logs/error.log
Phân tích những nhật ký lỗi này, tìm nguyên nhân gốc rễ
```

### Hoạt động thử nghiệm

Thử nghiệm là công cụ quan trọng để đảm bảo chất lượng mã. Claude Code có thể giúp bạn tạo thử nghiệm, chạy thử nghiệm, phân tích kết quả thử nghiệm.

**Tạo thử nghiệm:**

```bash
# Tạo thử nghiệm đơn vị
Tạo thử nghiệm đơn vị cho src/utils/math.ts, bao gồm tất cả các trường hợp biên

# Tạo thử nghiệm thành phần
Tạo thử nghiệm React Testing Library cho src/components/UserForm.tsx

# Tạo thử nghiệm tích hợp
Tạo thử nghiệm tích hợp cho quy trình đăng ký người dùng, bao gồm toàn bộ quá trình từ gửi biểu mẫu đến ghi vào cơ sở dữ liệu
```

**Chạy và gỡ lỗi thử nghiệm:**

```bash
# Chạy thử nghiệm
!npm test

# Gỡ lỗi thử nghiệm thất bại
Phân tích nguyên nhân thất bại của thử nghiệm và sửa
@tests/auth.test.ts

# Xem phạm vi thử nghiệm
!npm run test:coverage
Mã nào không được thử nghiệm bao phủ?
```

**Chiến lược thử nghiệm được đề xuất:**

```bash
# Thêm thử nghiệm cho tính năng mới
Tôi đã thêm chức năng xác thực người dùng, vui lòng:
1. Tạo thử nghiệm đơn vị cho auth.service.ts
2. Tạo thử nghiệm thành phần cho thành phần LoginForm
3. Chạy tất cả thử nghiệm để đảm bảo thông qua
```

### Kết hợp lệnh và hoạt động chuỗi

Cách sử dụng Claude Code hiệu quả là kết hợp nhiều lệnh với nhau, tạo thành quy trình làm việc hoàn chỉnh.

**Tình huống 1: Quy trình sửa lỗi**

```bash
# 1. Xem vấn đề
!npm test
Thử nghiệm báo lỗi rồi, phân tích một chút

# 2. Định vị vấn đề
@src/utils/validation.ts vấn đề có trong tệp này không?

# 3. Sửa vấn đề
Sửa hàm isEmail trong validation.ts để xử lý đúng địa chỉ email chứa ký tự +

# 4. Xác minh sửa
!npm test

# 5. Commit sửa
Vui lòng tạo thông báo commit sửa dựa trên git diff hiện tại
!git add -A
!git commit -m "fix: ..."
```

**Tình huống 2: Quy trình xem xét mã**

```bash
# 1. Xem thay đổi
!git diff --stat
Những tệp nào đã được sửa đổi?

# 2. Xem xét chi tiết
@src/components/ xem xét những thay đổi của các thành phần này

# 3. Đưa ra đề xuất cải thiện
Dựa trên kết quả xem xét, có những gì cần cải thiện không?

# 4. Thực hiện cải thiện
Tối ưu hóa hiệu suất của thành phần UserList

# 5. Xem xét cuối
/diff
Vui lòng xem xét những thay đổi hiện tại, chỉ ra rủi ro tiềm ẩn và những điểm cần cải thiện
```

**Tình huống 3: Quy trình phát triển tính năng mới**

```bash
# 1. Lập kế hoạch
/plan
Tôi muốn thêm chức năng giỏ hàng

# 2. Tạo nhánh
!git checkout -b feature/shopping-cart

# 3. Phát triển tính năng
Thực hiện theo kế hoạch từng bước

# 4. Thêm thử nghiệm
Tạo thử nghiệm cho mô-đun giỏ hàng

# 5. Chạy thử nghiệm
!npm test

# 6. Xem xét mã
/diff
Vui lòng xem xét git diff hiện tại, chỉ ra rủi ro tiềm ẩn và những điểm cần cải thiện

# 7. Commit mã
Vui lòng tạo thông báo commit cho phát triển tính năng này
!git add -A
!git commit -m "feat: ..."
!git push
```

---

## Các câu hỏi thường gặp

Trong quá trình sử dụng Claude Code, bạn có thể gặp nhiều vấn đề khác nhau. Phần này tổng hợp các câu hỏi phổ biến nhất và giải pháp của chúng.

### Token tiêu thụ quá nhanh?

Tiêu thụ Token quá nhanh là vấn đề phổ biến nhất khi sử dụng Claude Code. Dưới đây là chiến lược tối ưu hóa Token hoàn chỉnh.

**Chẩn đoán vấn đề:**

Trước tiên, sử dụng lệnh `/context` để xem mức sử dụng Token hiện tại:
```
/context
```

Chú ý các chỉ số sau:
- **Tỷ lệ sử dụng Token**: Nếu vượt quá 70%, cần cân nhắc nén ngữ cảnh
- **Số lượng tham chiếu tệp**: Tham chiếu tệp càng nhiều, tiêu thụ Token càng lớn
- **Tệp lớn**: Xem những tệp nào chiếm Token nhiều nhất

**Chiến lược tối ưu hóa:**

**1. Hoàn thiện cấu hình .claudeignore**

Đảm bảo tệp `.claudeignore` của bạn bao gồm tất cả các tệp không cần:
```
# Bắt buộc phải bỏ qua
node_modules/
dist/
build/
*.log
.env

# Thêm theo loại dự án
# Dự án React
.next/
out/

# Dự án Vue
.nuxt/
.output/

# Chung
.vscode/
.idea/
coverage/
*.min.js
*.bundle.js
```

**2. Nén ngữ cảnh định kỳ**

Đối thoại dài sẽ tích lũy nhiều Token. Đề xuất sử dụng `/compact` sau 5-6 vòng:
```
# Sau đối thoại dài
/compact

# Tiếp tục làm việc
Bây giờ chúng ta hãy thực hiện mô-đun đơn hàng...
```

**3. Tham chiếu tệp chính xác**

Không nên tham chiếu toàn bộ thư mục, mà chỉ tham chiếu những tệp cần thiết:
```bash
# Không được khuyến nghị (đọc toàn bộ thư mục)
@src/ giải thích mã này

# Được khuyến nghị (chỉ đọc tệp cần thiết)
@src/utils/auth.ts @src/components/Login.tsx giải thích quy trình đăng nhập
```

**4. Tránh đọc tệp lớn**

Nếu `/context` hiển thị tệp nào đó chiếm Token lớn, hãy cân nhắc:
- Có thực sự cần tệp này không?
- Có thể chỉ tham chiếu một phần mã không?
- Có thể chia tệp lớn thành các mô-đun nhỏ không?

### Claude không hiểu dự án?

Khi Claude's câu trả lời không đủ chính xác, hoặc thường xuyên hỏi thông tin cơ bản về dự án, điều đó có nghĩa là nó thiếu kiến thức nền tảng về dự án.

**Giải pháp:**

**1. Tạo CLAUDE.md**

Chạy `/init` để Claude tự động tạo tệp cấu hình dự án:
```bash
/init
```

Sau khi tạo, kiểm tra và hoàn thiện:
- Tổng quan dự án có chính xác không?
- Tech stack có đầy đủ không?
- Các lệnh thường dùng có đúng không?
- Quy chuẩn mã có rõ ràng không?

**2. Chỉnh sửa CLAUDE.md thủ công**

Nếu cấu hình tự động tạo không đủ chi tiết, hãy thêm:
```markdown
## Thông tin cụ thể dự án

### Quyết định kiến trúc
- Tại sao chọn X thay vì Y?
- Mẫu thiết kế cốt lõi là gì?

### Cạm bẫy phổ biến
- Sử dụng useEffect cần chú ý...
- Truy vấn cơ sở dữ liệu phải...

### Tích hợp bên thứ ba
- Thanh toán sử dụng Stripe
- Gửi email sử dụng SendGrid
- Lưu trữ tệp sử dụng AWS S3
```

**3. Sử dụng thư mục Rules**

Dự án lớn có thể sử dụng thư mục Rules để tổ chức quy chuẩn:
```
.claude/rules/
├── 00-architecture.md    # Tổng quan kiến trúc
├── 01-coding-style.md    # Phong cách mã
├── 10-frontend.md        # Quy chuẩn frontend
├── 11-backend.md         # Quy chuẩn backend
└── 20-testing.md         # Quy chuẩn thử nghiệm
```

**4. Bổ sung ngữ cảnh ngay lập tức**

Đối với tác vụ cụ thể, có thể bổ sung bối cảnh trong lệnh:
```
Chúng tôi sử dụng Hook useAuth tùy chỉnh để xử lý xác thực,
nó trả về { user, login, logout, isLoading }.
Vui lòng dựa trên Hook này thực hiện thành phần menu người dùng.
```

### Làm cách nào để quay lại hoạt động?

Claude Code cung cấp nhiều cơ chế quay lại, áp dụng cho các tình huống khác nhau.

**Tình huống 1: Quay lại trạng thái đối thoại**

Nếu chỉ là nói sai, hoặc không hài lòng với câu trả lời của Claude:
```
Esc hai lần  →  Quay lại vòng đối thoại trước
Esc ba lần   →  Xóa tất cả lịch sử đối thoại
```

**⚠️ Lưu ý**: Chỉ quay lại trạng thái đối thoại, không hoàn tác sửa đổi tệp.

**Tình huống 2: Hoàn tác sửa đổi tệp**

Nếu Claude đã sửa đổi tệp, cần hoàn tác thủ công:

```bash
# Xem thay đổi
!git status
!git diff

# Hoàn tác tệp cụ thể
git checkout -- src/utils/helpers.ts

# Hoàn tác tất cả thay đổi
git checkout -- .

# Nếu đã commit
# Quay lại mềm (giữ thay đổi)
git reset --soft HEAD~1

# Quay lại cứng (loại bỏ thay đổi)
git reset --hard HEAD~1
```

**Tình huống 3: Sử dụng quy trình Git để phòng tránh**

Cách tốt nhất là lưu công việc hiện tại trước khi sử dụng Claude Code:
```bash
# Lưu trạng thái hiện tại
git add .
git commit -m "WIP: before Claude Code session"
# Hoặc sử dụng git stash
git stash push -m "before claude"

# Sử dụng Claude Code để phát triển...

# Nếu kết quả không thỏa mãn, quay lại hoàn toàn
git reset --hard HEAD~1
# Hoặc
git stash pop
```

### Tối ưu hóa quyền hạn - Quá nhiều xác nhận?

Xác nhận quyền hạn quá nhiều sẽ ảnh hưởng đến hiệu suất phát triển. Thông qua cấu hình quyền hạn hợp lý, có thể tạo quy trình làm việc mượt mà hơn.

**Hiểu hệ thống quyền hạn:**

Quyền hạn của Claude Code chia thành ba cấp:
- **allow**: Tự động cho phép, không hỏi
- **ask**: Hỏi trước khi thực thi
- **deny**: Hoàn toàn cấm

**Tối ưu hóa cấu hình:**

Chỉnh sửa `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      // Hoạt động Git chỉ đọc
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git branch)",
      
      // Thử nghiệm và kiểm tra
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Bash(npm run typecheck)",
      
      // Máy chủ phát triển
      "Bash(npm run dev:*)",
      
      // Chỉnh sửa mã nguồn
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Write(src/**/*.ts)"
    ],
    "ask": [
      // Hoạt động Git ghi
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",
      
      // Quản lý gói
      "Bash(npm install:*)",
      "Bash(npm uninstall:*)",
      
      // Xây dựng và triển khai
      "Bash(npm run build)",
      "Bash(npm run deploy:*)",
      
      // Chỉnh sửa tệp cấu hình
      "Edit(package.json)",
      "Edit(tsconfig.json)",
      
      // Đọc tệp nhạy cảm
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      // Lệnh nguy hiểm
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",
      
      // Tệp hệ thống
      "Edit(/etc/*)",
      "Write(/usr/*)",
      
      // Thư mục Git
      "Edit(.git/*)"
    ]
  }
}
```

**Chiến lược quyền hạn tiến hóa:**

- **Giai đoạn học**: Giữ cài đặt mặc định, hiểu những hoạt động Claude sẽ thực hiện
- **Giai đoạn quen**: Thêm các hoạt động an toàn thường dùng (như git status, npm test) vào allow
- **Giai đoạn hiệu quả**: Cấu hình quyền hạn chi tiết dựa trên đặc điểm dự án

### Làm thế nào để sử dụng ở khu vực nội địa?

Do các vấn đề về mạng, người dùng nội địa có thể không thể truy cập trực tiếp dịch vụ chính thức của Anthropic. Dưới đây là một số giải pháp.

**Phương án 1: Sử dụng dịch vụ proxy API**

Nhiều nhà cung cấp dịch vụ đám mây cung cấp dịch vụ proxy tương thích với API Anthropic:

```bash
# Đặt biến môi trường
export ANTHROPIC_BASE_URL="https://your-api-proxy.com/v1"
export ANTHROPIC_API_KEY="your-api-key"

# Khởi động Claude Code
claude
```

**Phương án 2: Sử dụng công cụ tương thích Claude Code của bên thứ ba**

Một số nhà cung cấp nội địa cung cấp công cụ tương thích với Claude Code:

```bash
# Cài đặt phiên bản tương thích
npm install -g @some-provider/claude-code

# Cấu hình khóa API
claude config set api.key your-api-key
claude config set api.baseUrl https://api.some-provider.com
```

**Phương án 3: Sử dụng các công cụ lập trình AI khác**

Nếu Claude Code không thể sử dụng, có thể cân nhắc các giải pháp thay thế:

| Công cụ | Đặc điểm | Tình huống áp dụng |
|------|------|----------|
| Cursor | Dựa trên VS Code, chức năng hoàn chỉnh | Cần trải nghiệm IDE hoàn chỉnh |
| GitHub Copilot | Hoàn thành mã mạnh | Chủ yếu cần hoàn thành mã |
| Coding Assistant nội địa | Nội địa, truy cập ổn định | Môi trường phát triển nội địa |
| Codeium | Hạn ngạch miễn phí lớn | Ngân sách hạn chế |

**Phương án 4: Để AI Agent giúp cấu hình**

Nếu bạn không chắc cách cấu hình, hãy để AI Agent hỗ trợ:

```
Tôi muốn sử dụng Claude Code, nhưng không thể truy cập trực tiếp ở khu vực nội địa.
Tôi đã mua API từ dịch vụ XXX,
Địa chỉ API là https://api.xxx.com,
Khóa là sk-xxx.

Vui lòng giúp tôi cấu hình biến môi trường, đảm bảo Claude Code có thể sử dụng bình thường.
```

**Câu hỏi phổ biến:**

- **Q: Cấu hình xong vẫn không thể kết nối?**
  - A: Kiểm tra xem địa chỉ API có đúng không, đảm bảo bao gồm đường dẫn `/v1`
  - A: Kiểm tra xem khóa API có hợp lệ không, có cần nạp tiền không
  - A: Kiểm tra xem mạng cục bộ có cần proxy không

- **Q: Tốc độ phản hồi rất chậm?**
  - A: Chọn nhà cung cấp dịch vụ gần hơn về mặt địa lý
  - A: Sử dụng Coding Plan thay vì API chung
  - A: Cân nhắc sử dụng `/compact` giảm tiêu thụ Token

- **Q: Một số chức năng không thể sử dụng?**
  - A: Một số dịch vụ bên thứ ba có thể không tương thích hoàn toàn với tất cả chức năng Claude Code
  - A: Kiểm tra tài liệu nhà cung cấp, hiểu phạm vi chức năng được hỗ trợ

---

## Tài nguyên tham khảo

- [Tài liệu chính thức Claude Code](https://code.claude.com/docs)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)
- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code)
