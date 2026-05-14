# SSH và Xác Thực Khóa

> 💡 **Hướng Dẫn Học Tập**: Mỗi lần `git push` phải nhập mật khẩu? Kết nối máy chủ luôn bị "Permission denied"? Chương này sẽ giúp bạn hiểu rõ nguyên lý xác thực khóa SSH trong 5 phút, và cách đăng nhập GitHub và máy chủ mà không cần mật khẩu.

---

## 0. Bạn chắc chắn đã gặp những tình huống này

- `git push` lúc nào cũng bật hộp nhập mật khẩu, rất phiền phức
- Kết nối SSH máy chủ thất bại, không biết `id_rsa` và `id_ed25519` là gì
- Nghe nói "khóa công khai" và "khóa riêng tư", nhưng không rõ cái nào cho người khác, cái nào giữ cho mình

**Mâu Thuẫn Cốt Lõi**: Mật khẩu không an toàn, lại còn phiền phức. Khóa SSH chính là giải pháp để vừa đảm bảo an toàn vừa tiện lợi.

---

## 1. Mật Khẩu vs Khóa: Tại Sao Khóa Tốt Hơn?

👇 Hãy thử nhé: So sánh sự khác biệt giữa đăng nhập bằng mật khẩu và đăng nhập bằng khóa

<SSHAuthDemo />

::: tip 💡 Tóm Lược Trong Một Câu
Đăng nhập bằng mật khẩu = Mỗi lần gửi mật khẩu cho đối phương kiểm tra (mật khẩu có thể bị nghe lén);  
Đăng nhập bằng khóa = Chứng tỏ "tôi có khóa" nhưng không cần cho bạn xem khóa (khóa riêng tư không bao giờ được truyền).
:::

---

## 2. Mã Hóa Bất Đối Xứng: Khóa Công Khai và Khóa Riêng Tư

Khóa SSH dựa trên **mã hóa bất đối xứng**, một lần tạo ra hai khóa:

| | Khóa Riêng Tư (Private Key) | Khóa Công Khai (Public Key) |
|---|---|---|
| **Vị Trí Lưu Trữ** | Máy tính của bạn `~/.ssh/id_ed25519` | Máy chủ/GitHub |
| **Có thể cho người khác không** | ❌ Tuyệt đối không | ✅ Tùy ý |
| **Chức Năng** | Ký (Chứng minh danh tính) | Xác minh (Xác thực danh tính) |
| **Phép So Sánh** | Chìa khóa | Ổ khóa |

### Các Loại Khóa Phổ Biến

| Loại | Lệnh | Độ Khuyến Nghị | Giải Thích |
|---|---|---|---|
| **Ed25519** | `ssh-keygen -t ed25519` | ⭐⭐⭐ | Mới nhất, nhanh nhất, an toàn nhất |
| **RSA** | `ssh-keygen -t rsa -b 4096` | ⭐⭐ | Tương thích tốt, nhưng chậm hơn |
| **ECDSA** | `ssh-keygen -t ecdsa` | ⭐ | Nói chung không được khuyến cáo |

---

## 3. Thực Hành: Tạo Và Cấu Hình Khóa SSH

### 3.1 Tạo Cặp Khóa

```bash
ssh-keygen -t ed25519 -C "your@email.com"
```

Sau khi thực hiện sẽ hiển thị:
- **Đường Dẫn Tệp**: Nhấn Enter để dùng đường dẫn mặc định `~/.ssh/id_ed25519`
- **Cụm Mật Khẩu**: Có thể đặt bảo vệ thêm (hoặc để trống)

### 3.2 Thêm Khóa Công Khai Vào GitHub

```bash
# 1. Sao chép nội dung khóa công khai
cat ~/.ssh/id_ed25519.pub | pbcopy  # macOS
cat ~/.ssh/id_ed25519.pub | xclip   # Linux

# 2. Mở GitHub → Settings → SSH and GPG keys → New SSH key
# 3. Dán khóa công khai, lưu lại

# 4. Kiểm tra kết nối
ssh -T git@github.com
# Nếu thành công sẽ thấy: Hi username! You've been authenticated...
```

### 3.3 Thêm Khóa Công Khai Vào Máy Chủ

```bash
# Cách 1: ssh-copy-id (được khuyến cáo)
ssh-copy-id user@your-server

# Cách 2: Sao chép thủ công
cat ~/.ssh/id_ed25519.pub | ssh user@server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

---

## 4. SSH Config: Tạm Biệt Những Lệnh Dài

Cấu hình bí danh trong `~/.ssh/config`, cấu hình một lần hưởng lợi suốt đời:

```
Host dev
  HostName 192.168.1.100
  User deploy
  IdentityFile ~/.ssh/id_ed25519

Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
```

Hiệu quả sau khi cấu hình:

| Trước | Sau |
|---|---|
| `ssh -i ~/.ssh/id_ed25519 deploy@192.168.1.100` | `ssh dev` |
| Mỗi lần phải nhớ IP và tên người dùng | Chỉ cần nhớ một bí danh |

---

## 5. Khắc Phục Các Sự Cố Thường Gặp

| Vấn Đề | Nguyên Nhân | Giải Pháp |
|---|---|---|
| `Permission denied (publickey)` | Khóa công khai chưa được thêm vào máy chủ | `ssh-copy-id user@server` |
| `WARNING: UNPROTECTED PRIVATE KEY FILE` | Quyền tệp khóa riêng tư quá rộng | `chmod 600 ~/.ssh/id_ed25519` |
| `Could not resolve hostname` | Cấu hình SSH Config có lỗi | Kiểm tra định dạng `~/.ssh/config` |
| GitHub vẫn yêu cầu mật khẩu | Sử dụng HTTPS thay vì SSH | Dùng `git@github.com:user/repo.git` |

---

## 6. Tóm Lược

::: tip 📚 Những Điểm Cốt Lõi
1. **Khóa > Mật khẩu**: Khóa riêng tư không bao giờ được truyền, an toàn hơn mật khẩu nhiều
2. **Khuyến cáo Ed25519**: Thuật toán khóa hiện đại nhất, nhanh và an toàn
3. **Khóa công khai tùy ý cho, khóa riêng tư tuyệt đối không rò rỉ**: Nhớ kỹ quy tắc này
4. **SSH Config**: Cấu hình một lần bí danh, sau đó `ssh bí-danh` để kết nối một lần
5. **GitHub/GitLab**: Sau khi thêm khóa công khai, `git push/pull` không cần nhập mật khẩu nữa
:::

**Bước Tiếp Theo Học Tập**:
- [Cổng Và localhost](./ports-localhost) - Hiểu những điều cơ bản về kết nối mạng
- [Biến Môi Trường Và PATH](./environment-path) - Hiểu cấu hình hệ thống
