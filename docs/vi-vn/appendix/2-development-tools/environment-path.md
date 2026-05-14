# Biến môi trường và PATH

> 💡 **Hướng dẫn học tập**: Mỗi lần bạn gõ `git` hoặc `python` trong terminal, hệ thống phải tìm chương trình này ở đâu. Mỗi lần mã của bạn gọi API mô hình lớn, chương trình cần biết sử dụng khóa nào. Hai việc này đều được điều khiển bởi cùng một cơ chế——**biến môi trường**.

---

## 0. Mỗi chương trình đều mang theo một nhóm cấu hình

Mỗi chương trình đang chạy đều giữ một nhóm cấu hình «khóa=giá trị» gọi là **biến môi trường**. Chương trình có thể đọc những cấu hình này bất kỳ lúc nào, để hiểu rõ môi trường chạy hiện tại.

Nhấp vào bất kỳ biến nào trong danh sách dưới đây để "xem" giá trị của nó trong terminal:

<EnvVarOverviewDemo />

---

## 1. PATH: Shell tìm lệnh bạn nhập như thế nào

`PATH` là một biến môi trường đặc biệt, lưu trữ một chuỗi đường dẫn thư mục (được tách bằng dấu hai chấm). Khi bạn nhập `git`, Shell sẽ lần lượt vào từng thư mục theo thứ tự, tìm kiếm tệp thực thi tên `git`——nó sẽ dừng ngay khi tìm thấy cái đầu tiên.

```bash
$ echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

Chọn một lệnh để quan sát quá trình Shell tìm kiếm từng thư mục:

<PathSearchDemo />

**Ba quy luật quan trọng**:
- Thư mục ở phía trước trong PATH, ưu tiên càng cao
- Tìm thấy cái đầu tiên là dừng, không tiếp tục tìm kiếm
- Tất cả thư mục đều không có → `command not found`

---

## 2. Tại sao phải khởi động lại terminal sau khi cài đặt công cụ?

Khi cài đặt các công cụ như nvm, Homebrew, conda, tập lệnh cài đặt sẽ tự động thêm một dòng vào `~/.zshrc`, thêm thư mục của nó vào PATH:

```bash
# Nội dung tự động được ghi bởi tập lệnh cài đặt (ví dụ)
export PATH="/usr/local/opt/python@3.12/bin:$PATH"
```

Dòng mã này chỉ thực thi khi **Shell mới khởi động**. Các cửa sổ terminal đã mở sẽ không bị ảnh hưởng, vì vậy:

```bash
# Có thể có hiệu lực ngay mà không cần khởi động lại
source ~/.zshrc
```

**Tình huống phổ biến với công cụ phát triển AI**:

```bash
# Ollama / pipx cài xong báo command not found
which ollama          # kiểm tra vị trí cài đặt thực tế

# Đường dẫn công cụ CLI được cài đặt bởi pip (được thêm vào PATH)
# macOS: ~/Library/Python/3.x/bin
# Linux: ~/.local/bin
export PATH="$PATH:$HOME/.local/bin"

# Khuyến nghị dùng pipx để cài đặt công cụ dòng lệnh, quản lý PATH tự động
pipx install aider-chat
```

---

## 3. Phạm vi của biến: Ai có thể nhìn thấy biến này?

Biến môi trường không được phát sóng cho tất cả các chương trình——mỗi tiến trình giữ **bản sao của riêng nó**, được kế thừa từ tiến trình cha, và việc sửa đổi bản sao của nó sẽ không ảnh hưởng đến tiến trình cha.

Biểu đồ dưới đây hiển thị ba cấp độ. Hãy export một biến mới ở cấp độ «người dùng», xem liệu nó có xuất hiện ở cấp độ «tiến trình»:

<EnvScopeDemo />

---

## 4. export: Quyết định liệu tiến trình con có thể đọc biến này hay không

Khi đặt biến, có hay không `export` là hai việc hoàn toàn khác nhau:

<EnvExportDemo />

Để biến tồn tại vĩnh viễn trên các phiên, hãy viết `export` vào tệp cấu hình:

```bash
# macOS (zsh)
echo 'export MY_VAR="value"' >> ~/.zshrc
source ~/.zshrc       # có hiệu lực ngay, không cần mở lại terminal

# Linux (bash)
echo 'export MY_VAR="value"' >> ~/.bashrc
source ~/.bashrc
```

---

## 5. Khóa API: Tuyệt đối không được viết vào mã

Khi gọi API từ OpenAI, Anthropic, DeepSeek, v.v., khóa chính là «chứng minh thư + thẻ tín dụng» của bạn. Nếu bị rò rỉ, người khác có thể sử dụng hạn mức của bạn để chi tiêu, và chi phí sẽ do bạn chịu.

Lỗi phổ biến nhất là viết khóa trực tiếp vào mã:

<ApiKeyDangerDemo />

---

## 6. Phát triển cục bộ: Dùng tệp .env để quản lý khóa

Khi phát triển cục bộ, hãy đặt khóa trong tệp `.env` ở thư mục gốc của dự án, mã đọc nó thông qua thư viện dotenv. `.env` phải được thêm vào `.gitignore`, không thể commit vào Git.

Bên trái viết cấu hình, bên phải đọc——chuyển ngôn ngữ để xem hai cách viết:

<DotEnvDemo />

---

## 7. Môi trường sản xuất: Để nền tảng chạy tiêm khóa

`.env` là một công cụ tiện lợi cho giai đoạn phát triển. Trên máy chủ và nền tảng đám mây, nên do **môi trường chạy** chịu trách nhiệm tiêm khóa, mã chính nó hoàn toàn không biết khóa được đặt ở đâu:

<ServerSecretDemo />

---

## 8. Khắc phục sự cố trong thực tế

### `command not found`

```bash
# Bước 1: Xác nhận xem có trong PATH hay không
which python3         # nếu có đầu ra có nghĩa là đã tìm thấy

# Bước 2: Tìm vị trí thực tế của chương trình (macOS)
brew list python | grep bin

# Bước 3: Thêm thư mục vào PATH
export PATH="/tìm_thấy_đường_dẫn:$PATH"
source ~/.zshrc       # sau khi viết vào tệp cấu hình, hãy nhớ source
```

### Cài đặt hai phiên bản, nhưng không phải cái tôi muốn

```bash
which python
# /usr/bin/python ← phiên bản cũ của hệ thống, ở phía trước trong PATH

# Đặt thư mục phiên bản mới ở phía trước PATH
export PATH="/usr/local/bin:$PATH"

which python
# /usr/local/bin/python ← phiên bản mới, bây giờ ưu tiên
```

### Biến rõ ràng đã được đặt, nhưng chương trình không thể đọc

| Nguyên nhân | Giải pháp |
|:---|:---|
| Quên `export` | Thêm `export` rồi thử lại |
| Đã sửa `~/.zshrc` nhưng chưa có hiệu lực | `source ~/.zshrc` |
| Dùng `.env` nhưng chưa cài dotenv | `pip install python-dotenv` / `npm install dotenv` |
| Chỉ có hiệu lực trong phiên SSH trên máy chủ | Dùng `EnvironmentFile` của systemd thay thế |

---

## Danh từ tra cứu nhanh

| Thuật ngữ | Ý nghĩa |
|:---|:---|
| **PATH** | Danh sách thư mục mà Shell tìm kiếm các tệp thực thi, được tách bằng dấu hai chấm, thứ tự quyết định ưu tiên |
| **export** | Đánh dấu biến để kế thừa, tiến trình con tự động nhận bản sao khi khởi động |
| **source** | Thực thi lại tệp cấu hình trong Shell hiện tại, để sửa đổi có hiệu lực ngay |
| **which** | Hiển thị đường dẫn tệp thực thi tương ứng với lệnh nào (kết quả tìm kiếm PATH) |
| **.env** | Tệp cấu hình cục bộ của dự án, lưu trữ khóa phát triển, phải được thêm vào `.gitignore` |
| **.env.example** | Mẫu có tên biến đầy đủ, giá trị để trống, có thể commit an toàn vào Git |
| **chmod 600** | Quyền tệp: chỉ chủ sở hữu có thể đọc và ghi, thích hợp bảo vệ tệp khóa |
| **Secret Scanner** | Các nền tảng như GitHub tự động quét rò rỉ khóa, thông báo cho nhà cung cấp để hủy nếu phát hiện |
