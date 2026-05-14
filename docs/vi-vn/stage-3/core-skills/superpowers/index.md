# Claude Code Superpowers Phát Triển Mức Công Nghiệp

## Giới Thiệu về Superpowers

**Superpowers** là một framework kỹ năng agent mã nguồn mở được phát triển bởi Jesse Vincent (tên người dùng obra), được thiết kế để giải quyết một vấn đề cốt lõi trong lập trình AI: làm sao để AI viết mã "mức công nghiệp" thay vì "mã đồ chơi".

Hãy tưởng tượng, một trợ lý lập trình AI thông thường giống như một "thực tập sinh thông minh" — nó có thể viết mã chạy được, nhưng có thể không có kiểm thử, không có tài liệu, không tuân theo các best practice. Còn Superpowers giống như cấp cho thực tập sinh này một "cố vấn kỹ sư cao cấp", buộc nó tuân theo quy trình phát triển phần mềm hoàn chỉnh.

### Tại sao cần Superpowers?

Trước khi có Superpowers, sử dụng Claude Code có một số vấn đề:

- **Vibe Coding rối loạn**: AI bắt đầu viết mã trực tiếp không có kế hoạch, dẫn đến phải sửa chữa lại nhiều lần
- **Thiếu kỷ luật TDD**: AI thường viết mã trước rồi bổ sung kiểm thử sau, thậm chí không viết kiểm thử
- **Yêu cầu mơ hồ bắt đầu làm ngay**: người dùng nói "làm chức năng đăng nhập", AI bắt đầu viết, kết quả làm ra không phải cái bạn muốn
- **Chất lượng mã không ổn định**: không có cơ chế review code, chất lượng phụ thuộc vào "tâm trạng" của AI

Superpowers giải quyết những vấn đề này, biến Claude thành một "đội phát triển có kỷ luật" — nó trước tiên giúp bạn làm rõ yêu cầu, sau đó lập kế hoạch, rồi phát triển theo phương pháp TDD, cuối cùng đảm bảo chất lượng thông qua review code.

---

## Bắt Đầu Nhanh

### Bước 1: Cài Đặt Superpowers

Chạy trong Claude Code:

```bash
# Thêm marketplace
/plugin marketplace add obra/superpowers-marketplace

# Cài đặt superpowers
/plugin install superpowers@superpowers-marketplace
```

Hoặc clone thủ công:

```bash
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### Bước 2: Trải Nghiệm Skill Đầu Tiên

Hãy sử dụng kỹ năng **brainstorming** (động não) của Superpowers để cảm nhận giá trị của nó.

Nhập trong Claude Code:

```
Tôi làm một chức năng đăng nhập người dùng
```

**Trước Superpowers**: Claude bắt đầu viết mã trực tiếp, có thể làm ra không phải cái bạn muốn.

**Sau Superpowers**: Claude sẽ qua các câu hỏi kiểu Socrates giúp bạn làm rõ yêu cầu:

> Chức năng đăng nhập này dành cho ứng dụng web hay ứng dụng di động?
>
> Cần hỗ trợ những cách đăng nhập nào? Email và mật khẩu? Đăng nhập bên thứ ba (Google, GitHub)?
>
> Có cần chức năng "ghi nhớ tôi"?
>
> Quy trình đặt lại mật khẩu là qua email hay tin nhắn?
>
> ...

Những câu hỏi này buộc bạn suy nghĩ rõ ràng điều mình thực sự cần, tránh viết một loạt mã mà không sử dụng.

### Bước 3: Hiểu Cơ Chế Kích Hoạt Kỹ Năng

Superpowers không phải "phép thuật", nó là một **tập hợp kỹ năng**. Hiểu kỹ năng được kích hoạt như thế nào rất quan trọng.

**Ba cách kích hoạt kỹ năng**:

1. **Kích hoạt theo từ khóa**
   - Khi bạn đề cập "TDD", "phát triển theo kiểm thử", "viết kiểm thử trước"
   - Kỹ năng `test-driven-development` sẽ được kích hoạt

2. **Kích hoạt theo kịch bản**
   - Khi yêu cầu mơ hồ, kỹ năng `brainstorming` sẽ chủ động đặt câu hỏi
   - Khi có lỗi, kỹ năng `systematic-debugging` sẽ được kích hoạt

3. **Gọi thủ công**
   - Sử dụng trực tiếp tên kỹ năng: `/test-driven-development`

#### 💡 Hiểu Quan Trọng: Không Chỉ Định TDD Sẽ Như Thế Nào?

Đây là một hiểu lầm phổ biến, hãy làm rõ:

```
# Trường hợp A: Không đề cập TDD
"Hiện thực hóa một máy tính"
→ Claude có thể viết kiểm thử hoặc không
→ Phụ thuộc vào thói quen huấn luyện của chính mô hình

# Trường hợp B: Đề cập TDD
"Dùng phương pháp TDD để hiện thực hóa một máy tính"
→ Kỹ năng test-driven-development được kích hoạt
→ Buộc tuân theo quy trình RED-GREEN-REFACTOR
```

**Giá trị thực sự của Superpowers**: không phải "tạo ra từ không", mà là "tăng cường kỷ luật".

- Không có kỹ năng TDD: Claude viết kiểm thử tùy theo "tâm trạng"
- Có kỹ năng TDD: Claude bị buộc tuân theo quy trình TDD

### Hiểu Giá Trị của Superpowers

Từ giải thích trên, bạn có thể thấy giá trị cốt lõi của Superpowers:

1. **Yêu cầu Ưu Tiên**: Kỹ năng `brainstorming` chủ động đặt câu hỏi khi yêu cầu mơ hồ
2. **Kỷ Luật Quy Trình**: `test-driven-development` buộc tuân theo vòng lặp TDD đỏ-xanh-tái cấu trúc
3. **Phân Rã Tác Vụ**: `writing-plans` chia dự án lớn thành các tác vụ nhỏ
4. **Kiểm Soát Chất Lượng**: Kỹ năng `code-review` đảm bảo chất lượng mã

---

## Chi Tiết Các Kỹ Năng Cốt Lõi của Superpowers

Superpowers chứa **20+ kỹ năng có thể kết hợp**, bao gồm toàn bộ vòng đời phát triển phần mềm. Hãy hiểu chúng theo danh mục.

### 🧪 Kỹ Năng Kiểm Thử

#### test-driven-development (Phát Triển Theo Kiểm Thử)

**Cách kích hoạt**: Đề cập đến từ khóa "TDD", "phát triển theo kiểm thử", "viết kiểm thử trước".

**Kỹ năng này làm gì**: Buộc Claude tuân theo vòng lặp TDD đỏ-xanh-tái cấu trúc, thay vì "nhớ lại rồi viết kiểm thử".

**Cách phát triển truyền thống** (vấn đề phổ biến):
1. Viết mã trực tiếp
2. Kiểm thử thủ công một chút
3. Tìm thấy lỗi, sửa mã
4. Lặp lại...（kiểm thử? Lần sau nhé）

**Cách TDD** (sau khi kích hoạt kỹ năng):
1. 🔴 **ĐỎ**: Viết kiểm thử thất bại trước
2. 🟢 **XANH**: Viết mã tối thiểu để kiểm thử qua
3. 🔵 **TÁI CẤU TRÚC**: Tái cấu trúc mã, giữ kiểm thử qua
4. Lặp lại

**Ví dụ sử dụng**:

```
Dùng phương pháp TDD để hiện thực hóa một mô-đun xác thực người dùng
```

Claude sẽ:
1. Viết kiểm thử trước (kiểm thử xác thực tên người dùng mật khẩu, kiểm thử tạo token...)
2. Chạy kiểm thử, xác nhận tất cả thất bại (ĐỎ)
3. Viết mã hiện thực hóa tối thiểu
4. Chạy kiểm thử, xác nhận qua (XANH)
5. Tái cấu trúc mã, trích xuất logic chung
6. Chạy kiểm thử lại, xác nhận vẫn qua (TÁI CẤU TRÚC)

> **Lưu ý**: Nếu bạn không đề cập "TDD", Claude có thể viết kiểm thử hoặc không. Tác dụng của kỹ năng này là **tăng cường kỷ luật quy trình**, đảm bảo kiểm thử không bị "quên".

### 🐛 Kỹ Năng Gỡ Lỗi

#### systematic-debugging (Gỡ Lỗi Có Hệ Thống)

Khi xuất hiện lỗi, các nhà phát triển con người thường cố gắng ngẫu nhiên các giải pháp sửa chữa khác nhau. Superpowers buộc sử dụng phân tích nguyên nhân gốc bốn giai đoạn:

**Giai Đoạn 1: Tái Lập Vấn Đề**
- Xác nhận lỗi có thể tái lập ổn định
- Ghi lại các bước tái lập

**Giai Đoạn 2: Cô Lập Nguyên Nhân Gốc**
- Qua phương pháp chia đôi thu hẹp phạm vi
- Thêm nhật ký để định vị mã vấn đề

**Giai Đoạn 3: Xác Minh Giả Thuyết**
- Đưa ra giả thuyết nguyên nhân gốc
- Thiết kế thí nghiệm xác minh

**Giai Đoạn 4: Sửa Chữa và Xác Minh**
- Thực hiện sửa chữa
- Xác nhận lỗi được giải quyết
- Thêm kiểm thử hồi quy

#### verification-before-completion (Xác Minh Trước Hoàn Thành)

Kỹ năng này ngăn Claude "cảm thấy gần như xong" rồi dừng lại. Nó yêu cầu Claude trước khi khẳng định tác vụ hoàn thành:

1. Chạy tất cả kiểm thử
2. Kiểm thử thủ công các chức năng chính
3. Kiểm tra chất lượng mã (lint)
4. Xác nhận tài liệu đã được cập nhật

### 🤝 Kỹ Năng Cộng Tác

#### brainstorming (Động Não)

Đây là một trong những kỹ năng thú vị nhất của Superpowers. Nó sử dụng phương pháp Socratic để giúp bạn làm rõ yêu cầu.

**Cách hoạt động**: Khi bạn đưa ra một yêu cầu mơ hồ, Claude không bắt đầu ngay mà sẽ đặt câu hỏi cho bạn:

```
Bạn: Làm một hệ thống blog

Claude:
- Blog này chủ yếu dành cho ai? Độc giả kỹ thuật hay công chúng rộng rãi?
- Cần hỗ trợ chỉnh sửa Markdown không?
- Cần chức năng bình luận không?
- Cần chức năng tìm kiếm không?
- Là đơn người dùng hay đa tác giả?
- ...
```

Những câu hỏi này buộc bạn suy nghĩ về những chức năng thực sự cần, tránh phát triển một loạt thứ không sử dụng.

#### writing-plans (Viết Kế Hoạch)

Kỹ năng này chia dự án lớn thành những tác vụ nhỏ có thể hoàn thành trong 2-5 phút.

**Ví dụ**:

```
Dùng writing-plans để lập kế hoạch phát triển một API danh sách việc cần làm
```

Claude sẽ tạo danh sách tác vụ chi tiết, mỗi tác vụ 2-5 phút có thể hoàn thành.

```markdown
# Kế Hoạch Hiện Thực Hóa

## Tác Vụ 1: Thiết Kế Schema Cơ Sở Dữ Liệu (ước tính 5 phút)
- Tạo bảng todos
- Định nghĩa các trường: id, title, completed, createdAt

## Tác Vụ 2: Tạo Routes Express (ước tính 10 phút)
- POST /todos - Tạo tác vụ
- GET /todos - Lấy danh sách
- GET /todos/:id - Lấy riêng lẻ
- PUT /todos/:id - Cập nhật
- DELETE /todos/:id - Xóa

## Tác Vụ 3: Thêm Xác Thực Đầu Vào (ước tính 10 phút)
- Tiêu đề không thể trống
- completed phải là giá trị boolean

## Tác Vụ 4: Viết Kiểm Thử (ước tính 15 phút)
- Viết kiểm thử cho mỗi endpoint
- Bao gồm các trường hợp biên

## Tác Vụ 5: Khởi Động Server và Xác Minh (ước tính 5 phút)
- Chạy kiểm thử
- Kiểm thử thủ công mỗi endpoint với curl

Tiêu Chí Chấp Nhận:
- Tất cả kiểm thử qua
- Mỗi endpoint hoạt động bình thường với curl
```

#### executing-plans (Thực Hiện Kế Hoạch)

Kỹ năng này thực hiện hàng loạt kế hoạch, tạm dừng tại mỗi điểm kiểm tra để xác nhận.

**Ví dụ sử dụng**:

```
Thực hiện kế hoạch trên, tạm dừng một lúc sau khi hoàn thành mỗi tác vụ
```

Claude sẽ:
1. Hoàn thành tác vụ 1, rồi tạm dừng: `✅ Schema cơ sở dữ liệu hoàn thành, tiếp tục không?`
2. Sau khi bạn xác nhận hoàn thành tác vụ 2, rồi tạm dừng lại
3. Cứ như vậy tiếp tục

Điều này cho phép bạn kiểm tra hướng tại mỗi giai đoạn, tránh sai hướng mới phát hiện ra muộn.

#### dispatching-parallel-agents (Điều Phối Agents Song Song)

Kỹ năng này có thể khởi động đồng thời nhiều agents con và làm việc song song.

**Trường hợp sử dụng**: Khi bạn cần xử lý nhiều tác vụ độc lập cùng lúc.

```
Dùng agents song song để cùng hoàn thành:
- Agent A: Viết API backend
- Agent B: Viết thành phần frontend
- Agent C: Viết kiểm thử
```

Mỗi agent làm việc trong môi trường cô lập riêng, không ảnh hưởng lẫn nhau.

#### subagent-driven-development (Phát Triển Theo Agents Con)

Kỹ năng này khởi động một agents con độc lập cho mỗi tác vụ nhỏ.

**Ưu điểm**:
- Mỗi agents con có bối cảnh độc lập
- Tác vụ thất bại không ảnh hưởng đến các tác vụ khác
- Có thể thực hiện song song nhiều tác vụ

#### using-git-worktrees (Sử Dụng Git Worktrees)

Kỹ năng này sử dụng tính năng worktree của Git để tạo môi trường phát triển cô lập.

**Lợi ích**:
- Nhiều tính năng có thể phát triển song song
- Mỗi worktree là độc lập
- Không xung đột lẫn nhau

### 👀 Kỹ Năng Review Code

#### requesting-code-review (Yêu Cầu Review Code)

Khi bạn hoàn thành mã, kỹ năng này sẽ tự động yêu cầu review code.

```
Tự động kích hoạt review code sau khi hoàn thành
```

#### receiving-code-review (Tiếp Nhận Review Code)

Kỹ năng này định nghĩa cách tiếp nhận và xử lý phản hồi review.

**Quy Trình Review**:
1. Gửi mã
2. Tự động kích hoạt review
3. Người review kiểm tra chất lượng mã, bảo mật, tỷ lệ bao phủ kiểm thử
4. Đưa ra các gợi ý cải thiện
5. Sửa lỗi
6. Review lại cho đến khi được phê duyệt

---

## Quy Trình Làm Việc Hoàn Chỉnh của Superpowers

Sức mạnh thực sự của Superpowers nằm ở việc kết hợp nhiều kỹ năng thành quy trình phát triển hoàn chỉnh.

### Quy Trình Phát Triển Tiêu Chuẩn

```
1. Brainstorming (Động Não)
   ↓ Thông qua câu hỏi-trả lời làm rõ yêu cầu thực tế

2. Design Document (Tài Liệu Thiết Kế)
   ↓ Chia khối hiển thị thiết kế, chờ xác nhận

3. Writing Plans (Viết Kế Hoạch)
   ↓ Chia thành các tác vụ nhỏ 2-5 phút

4. Subagent Development (Phát Triển Agents Con)
   ↓ Mỗi tác vụ khởi động agents con độc lập
   ↓ Review hai giai đoạn: phù hợp spec + chất lượng mã

5. TDD (Phát Triển Theo Kiểm Thử)
   ↓ Buộc vòng lặp RED-GREEN-REFACTOR

6. Code Review (Review Code)
   ↓ Kiểm soát chất lượng

7. Hoàn Thành
```

### Trường Hợp Thực Tế: Xây Dựng Hệ Thống Xác Thực Người Dùng Bằng Superpowers

Hãy trải nghiệm quy trình làm việc hoàn chỉnh của Superpowers qua một ví dụ chi tiết.

#### Bước 1: Brainstorming Làm Rõ Yêu Cầu

```
Tôi cần một hệ thống xác thực người dùng
```

Claude sẽ đặt câu hỏi cho bạn:
- Ứng dụng web hay di động?
- Hỗ trợ những cách đăng nhập nào?
- Cần chức năng đặt lại mật khẩu không?
- Cần chức năng "ghi nhớ tôi"?
- ...

#### Bước 2: Tạo Tài Liệu Thiết Kế

Sau khi xác nhận yêu cầu, Claude sẽ tạo tài liệu thiết kế:

```markdown
# Thiết Kế Hệ Thống Xác Thực Người Dùng

## Yêu Cầu Chức Năng
1. Đăng ký người dùng (Email + Mật khẩu)
2. Đăng nhập người dùng
3. Đặt lại mật khẩu (Email)
4. Ghi nhớ tôi (JWT + Refresh Token)

## Lựa Chọn Công Nghệ
- Backend: Node.js + Express
- Cơ sở dữ liệu: SQLite
- Xác thực: JWT
- Mã hóa: bcrypt

## Thiết Kế API
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/reset-password
```

#### Bước 3: Viết Kế Hoạch Hiện Thực Hóa

```
Dùng writing-plans để lập kế hoạch phát triển API xác thực
```

Claude sẽ tạo danh sách tác vụ chi tiết, mỗi tác vụ 2-5 phút có thể hoàn thành.

#### Bước 4: Thực Hiện Phát Triển

```
Dùng phương pháp TDD để thực hiện kế hoạch trên
```

Claude sẽ:
1. Viết kiểm thử trước
2. Xác nhận kiểm thử thất bại (ĐỎ)
3. Viết mã hiện thực hóa
4. Xác nhận kiểm thử qua (XANH)
5. Tái cấu trúc mã (TÁI CẤU TRÚC)

#### Bước 5: Review Code

Tự động kích hoạt review code, kiểm tra:
- Chất lượng mã
- Bảo mật (SQL Injection, XSS, v.v.)
- Tỷ lệ bao phủ kiểm thử
- Hoàn thiện tài liệu

---

## Superpowers vs Sử Dụng Trực Tiếp Claude Code

| Khía Cạnh | Sử Dụng Trực Tiếp Claude Code | Sử Dụng Superpowers |
|-----------|-------------------------------|-------------------|
| **Làm Rõ Yêu Cầu** | AI bắt đầu viết mã trực tiếp | Câu hỏi Socratic làm rõ yêu cầu |
| **Quy Trình Phát Triển** | Tùy do AI phát huy | Buộc TDD vòng lặp đỏ-xanh-tái cấu trúc |
| **Quản Lý Tác Vụ** | Hoàn thành một lần | Chia thành tác vụ nhỏ, có điểm kiểm tra |
| **Chất Lượng Mã** | Phụ thuộc vào phán đoán AI | Buộc review code |
| **Tính Dự Đoán Được** | Kết quả không ổn định | Quy trình có thể lặp lại |
| **Trường Hợp Sử Dụng** | Tác vụ đơn giản, xác minh nguyên mẫu | Mã mức công nghiệp, dự án phức tạp |

### So Sánh Hình Ảnh

Nếu so sánh Claude Code với một "thực tập sinh thông minh":

- **Sử dụng trực tiếp**: Bảo anh "làm chức năng đăng nhập", anh bắt đầu viết mã, có thể làm ra cái bạn cảm thấy không đúng
- **Sử dụng Superpowers**: Gán anh một "cố vấn kỹ sư cao cấp", cố vấn sẽ hỏi rõ yêu cầu, lập kế hoạch, kiểm tra chất lượng mã

---

## Chi Tiết Cài Đặt và Cấu Hình

### Phương Pháp 1: Qua Marketplace (Khuyến Nghị)

```bash
# Thêm marketplace
/plugin marketplace add obra/superpowers-marketplace

# Cài đặt
/plugin install superpowers@superpowers-marketplace

# Xác minh cài đặt
/skills
```

### Phương Pháp 2: Clone Thủ Công

```bash
# Tạo thư mục
mkdir -p ~/.claude/skills

# Clone kho
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### Phương Pháp 3: Cài Đặt Cấp Dự Án

Nếu bạn muốn sử dụng Superpowers trong dự án cụ thể:

```bash
# Trong thư mục gốc dự án
mkdir -p .claude/skills

# Clone hoặc sao chép superpowers
cp -r ~/.claude/skills/superpowers .claude/skills/
```

Cách này cho phép các thành viên đội chia sẻ cấu hình Superpowers giống nhau.

---

## Bảng Tra Cứu Nhanh Kỹ Năng Thường Dùng

| Tên Kỹ Năng | Chức Năng | Trường Hợp Sử Dụng |
|-------------|----------|-------------------|
| `brainstorming` | Câu hỏi Socratic làm rõ yêu cầu | Yêu cầu không rõ ràng |
| `writing-plans` | Chia tác vụ thành các bước nhỏ | Bắt đầu dự án lớn |
| `executing-plans` | Thực hiện kế hoạch với điểm kiểm tra | Phát triển theo kế hoạch |
| `test-driven-development` | Vòng lặp TDD đỏ-xanh-tái cấu trúc | Tất cả phát triển chức năng |
| `systematic-debugging` | Phân tích nguyên nhân gốc bốn giai đoạn | Khi có lỗi |
| `verification-before-completion` | Xác minh trước hoàn thành | Kết thúc tác vụ |
| `requesting-code-review` | Yêu cầu review code | Trước gửi mã |
| `subagent-driven-development` | Phát triển theo agents con | Tác vụ song song |
| `using-git-worktrees` | Cô lập Git worktree | Phát triển chức năng song song |

---

## Best Practice

### 1. Xác Định Rõ Từ Khóa Kích Hoạt

Các kỹ năng của Superpowers được kích hoạt thông qua từ khóa, hiểu các từ khóa kích hoạt thường dùng:

| Kỹ Năng | Từ Khóa Kích Hoạt |
|--------|------------------|
| `test-driven-development` | "TDD", "phát triển theo kiểm thử", "viết kiểm thử trước" |
| `brainstorming` | Tự động kích hoạt khi yêu cầu mơ hồ |
| `systematic-debugging` | "Gỡ lỗi", "lỗi", "không hoạt động" |
| `writing-plans` | "Lập kế hoạch", "lên kế hoạch" |

### 2. Sử Dụng Superpowers Khi Cần Kỷ Luật Quy Trình

- Phát triển mã mức công nghiệp → Đề cập "TDD"
- Yêu cầu không rõ ràng → Cho `brainstorming` giúp làm rõ
- Dự án phức tạp → Dùng `writing-plans` chia tác vụ

### 3. Không Bắt Buộc Cho Tác Vụ Đơn Giản

Nếu là nguyên mẫu nhanh hoặc script một lần, không cần buộc hoàn thành toàn bộ quy trình. Superpowers phù hợp với mã cần duy trì lâu dài.

### 4. Có Thể Kết Hợp Nhiều Kỹ Năng

```
Dùng phương pháp TDD hiện thực hóa xác thực người dùng, hoàn thành rồi giúp tôi review code
```

Điều này sẽ kích hoạt cùng lúc kỹ năng `test-driven-development` và `code-review`.

---

## Những Câu Hỏi Thường Gặp

### Q1: Có Bắt Buộc Phải Chỉ Định "TDD" Khi Sử Dụng Superpowers Không?

**Không bắt buộc**.

Superpowers là tập hợp kỹ năng, mỗi kỹ năng có điều kiện kích hoạt riêng:
- Nói "dùng phương pháp TDD" → Kích hoạt `test-driven-development`
- Không đề cập TDD → Claude có thể viết kiểm thử hoặc không (tùy mô hình)

Tác dụng của Superpowers là **tăng cường kỷ luật quy trình**, không phải tạo ra năng lực mới.

### Q2: Superpowers Có Làm Phát Triển Chậm Lại Không?

Có thể cảm thấy chậm lúc đầu vì:
- Cần thời gian làm rõ yêu cầu
- Phải viết kiểm thử trước mã
- Phải qua review code

Nhưng dài hạn, vì giảm thiểu rework và lỗi, hiệu suất tổng thể cao hơn.

### Q3: Dự Án Nhỏ Có Cần Superpowers Không?

Với nguyên mẫu xác minh hoặc tác vụ rất đơn giản, có thể sử dụng Claude Code trực tiếp. Superpowers phù hợp hơn với:
- Dự án mức công nghiệp
- Dự án cộng tác đa người
- Mã cần duy trì dài hạn

### Q4: Superpowers và Skills Khác Nhau Gì?

| Khía Cạnh | Superpowers | Skills |
|-----------|-------------|--------|
| **Bản Chất** | Khung phương pháp phát triển hoàn chỉnh | Gói kỹ năng có thể tái sử dụng |
| **Phạm Vi** | Bao gồm toàn bộ quy trình phát triển | Tập trung vào chức năng cụ thể |
| **Mối Quan Hệ** | Superpowers sử dụng Skills bên trong | Superpowers là tập hợp các Skills |

### Q5: Có Thể Tùy Chỉnh Kỹ Năng Superpowers Không?

Có thể! Superpowers là mã nguồn mở, bạn có thể:
1. Fork kho
2. Sửa kỹ năng hiện có
3. Thêm kỹ năng mới
4. Đóng góp lại cộng đồng

---

## Tài Liệu Tham Khảo

### Tài Nguyên Chính Thức

- [obra/superpowers GitHub](https://github.com/obra/superpowers) - Kho chính thức (50,000+ ⭐)
- [Hướng Dẫn Chi Tiết Sử Dụng Superpowers](https://www.cnblogs.com/gyc567/p/19510203) - Hướng dẫn chi tiết tiếng Trung
- [Hướng Dẫn Cấu Hình Môi Trường Superpowers](https://m.blog.csdn.net/gitblog_00683/article/details/144768992) - Hướng dẫn cấu hình

### Tài Nguyên Cộng Đồng

| Kho | Giải Thích |
|-----|-----------|
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | Gói công cụ toàn diện, bao gồm quy trình TDD |
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | Best practice chính thức |

### Bài Viết Liên Quan

- [Tạm Biệt Vibe Coding! Dùng Superpowers Để Claude Code Viết Mã Mức Công Nghiệp](https://juejin.cn/post/7593573617648123956)
- [Cách Tôi Dùng Superpowers MCP Để Buộc Claude Code Lập Kế Hoạch Trước Khi Viết Mã](https://juejin.cn/post/7570341520551673871)
- [Hướng Dẫn Nhập Môn Claude Code + Superpowers Cơ Bản Nhất](https://juejin.cn/post/7594832320030638123)

---

## Tóm Tắt

Superpowers là một **tập hợp kỹ năng phát triển mức công nghiệp**, biến Claude Code từ "thực tập sinh thông minh" thành "đội phát triển có kỷ luật".

### Điểm Chính

1. **Superpowers Là Tập Hợp Kỹ Năng, Không Phải Phép Thuật**
   - Sau cài đặt, kỹ năng có sẵn ở chế độ nền
   - Kích hoạt thông qua từ khóa hoặc kịch bản
   - Có thể gọi thủ công kỹ năng cụ thể

2. **Nhớ Các Từ Khóa Kích Hoạt Quan Trọng**
   - Muốn TDD → Nói "dùng phương pháp TDD"
   - Yêu cầu mơ hồ → `brainstorming` sẽ chủ động hỏi
   - Có lỗi → Đề cập "gỡ lỗi" kích hoạt `systematic-debugging`

3. **Trường Hợp Sử Dụng**
   - ✅ Phát triển mã mức công nghiệp
   - ✅ Dự án cần duy trì lâu dài
   - ✅ Dự án cộng tác đa người
   - ❌ Nguyên mẫu nhanh (tùy chọn)
   - ❌ Script một lần (tùy chọn)

Nhớ: **Superpowers Không Làm AI Thông Minh Hơn, Mà Làm AI Có Kỷ Luật Hơn.**
