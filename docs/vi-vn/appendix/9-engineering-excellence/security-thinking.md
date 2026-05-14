# Tư duy bảo mật và cơ sở tấn công - phòng thủ

::: tip Lời mở đầu
**Trang web của bạn có an toàn không?** Nhiều nhà phát triển nghĩ rằng "bảo mật là việc của đội bảo mật", cho đến khi dự án của họ bị tấn công và dữ liệu người dùng bị rò rỉ. Bảo mật không phải là tùy chọn, mà là kỹ năng cơ bản của mỗi nhà phát triển.

Chương này sẽ giúp bạn xây dựng tư duy bảo mật, hiểu những mối đe dọa bảo mật web phổ biến nhất và các phương pháp phòng thủ.
:::

**Bài viết này sẽ dạy bạn những gì?**

| Chương | Nội dung | Khái niệm cơ bản |
|-----|------|---------|
| **Chương 1** | Mô hình tư duy bảo mật | Suy nghĩ như một kẻ tấn công |
| **Chương 2** | Các cuộc tấn công Web phổ biến | XSS、SQL 注入、CSRF |
| **Chương 3** | Chiến lược phòng thủ | Xác thực đầu vào, mã hóa đầu ra, kiểm soát quyền truy cập |
| **Chương 4** | Danh sách kiểm tra bảo mật | Kiểm tra bảo mật tự thực hiện trước khi dự án trực tuyến |

Sau khi học xong chương này, bạn sẽ có nhận thức bảo mật cơ bản, có thể xác định và phòng thủ trước những mối đe dọa bảo mật web phổ biến nhất.

---

## 0. Toàn cảnh: Tại sao nhà phát triển cần hiểu biết về bảo mật?

Hãy tưởng tượng bạn xây dựng một ngôi nhà, có đầy đủ chức năng, trang trí đẹp, nhưng quên lắp khóa. Lỗ hổng bảo mật là những "khóa bị quên" trong thế giới mã.

::: tip Nguyên tắc cốt lõi của bảo mật
- **Quyền tối thiểu**: Chỉ cấp quyền cần thiết, không cho thêm một chút nào
- **Phòng thủ theo chiều sâu**: Không phụ thuộc vào một tuyến phòng thủ duy nhất, thiết lập tầng bảo vệ
- **Không bao giờ tin tưởng đầu vào**: Tất cả dữ liệu từ bên ngoài có thể là độc hại
- **Mặc định an toàn**: Cấu hình mặc định nên an toàn, chứ không phải tiện lợi
:::

---

## 1. Các cuộc tấn công Web phổ biến

Qua thành phần tương tác dưới đây, hãy tìm hiểu ba loại nguyên lý tấn công Web phổ biến nhất (chỉ dùng cho mục đích giáo dục):

<WebSecurityDemo />

### 1.1 XSS (Tấn công kịch bản liên trang)

Kẻ tấn công chèn các kịch bản độc hại vào trang web, khi những người dùng khác truy cập, kịch bản sẽ được thực thi trong trình duyệt của họ.

```javascript
// Nguy hiểm: Chèn trực tiếp đầu vào người dùng vào HTML
element.innerHTML = userInput
// Nếu userInput là <script>evil code</script>, nó sẽ được thực thi

// An toàn: Sử dụng textContent hoặc escape
element.textContent = userInput
// Hoặc sử dụng cơ chế escape tự động của framework (Vue {{ }}, React JSX)
```

**Điểm phòng thủ chính**:
- Escape các ký tự đặc biệt HTML khi xuất ra (`<`, `>`, `&`, `"`, `'`)
- Sử dụng cơ chế escape tự động của framework hiện đại
- Đặt tiêu đề `Content-Security-Policy` HTTP

### 1.2 SQL Injection

Kẻ tấn công xây dựng đầu vào đặc biệt để thay đổi logic truy vấn SQL.

```javascript
// Nguy hiểm: Nối chuỗi SQL
const query = `SELECT * FROM users WHERE name = '${userInput}'`
// Nếu userInput là ' OR '1'='1, nó sẽ trả về tất cả người dùng

// An toàn: Sử dụng truy vấn tham số hóa
const query = 'SELECT * FROM users WHERE name = ?'
db.execute(query, [userInput])
```

**Điểm phòng thủ chính**:
- Luôn sử dụng truy vấn tham số hóa / câu lệnh biên dịch trước
- Sử dụng framework ORM (chẳng hạn như Prisma, Sequelize)
- Hạn chế quyền tài khoản cơ sở dữ liệu

### 1.3 CSRF (Giả mạo yêu cầu liên trang)

Kẻ tấn công cám dỗ người dùng đã đăng nhập truy cập trang độc hại, tận dụng trạng thái đăng nhập của người dùng để gửi yêu cầu.

**Điểm phòng thủ chính**:
- Sử dụng CSRF Token
- Kiểm tra tiêu đề `Referer` / `Origin`
- Sử dụng POST thay vì GET cho các hoạt động quan trọng
- Đặt thuộc tính `SameSite` cho Cookie

---

## 2. Chiến lược phòng thủ

### 2.1 Xác thực đầu vào

```javascript
// Xác thực danh sách trắng: chỉ cho phép các định dạng dự kiến
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Giới hạn chiều dài
function isValidUsername(name) {
  return name.length >= 2 && name.length <= 50
}
```

### 2.2 Bảo vệ dữ liệu nhạy cảm

| Loại dữ liệu | Biện pháp bảo vệ |
|---------|---------|
| Mật khẩu | bcrypt/argon2 hash, không bao giờ lưu trữ bằng văn bản rõ |
| Khóa API | Biến môi trường, không gửi đến kho mã |
| Dữ liệu người dùng | Truyền HTTPS, lưu trữ được mã hóa |
| Mã thông báo phiên | HttpOnly + Secure + SameSite Cookie |

### 2.3 Tiêu đề bảo mật HTTP

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000
```

---

## 3. Danh sách kiểm tra bảo mật

Trước khi trực tuyến, sử dụng thành phần tương tác dưới đây để kiểm tra tình trạng bảo mật của dự án của bạn:

<SecurityChecklistDemo />

### 3.1 Giai đoạn phát triển

- [ ] Tất cả đầu vào người dùng đều được xác thực và escape
- [ ] Sử dụng truy vấn tham số hóa, không nối SQL
- [ ] Mật khẩu được lưu trữ bằng hash với các thuật toán như bcrypt
- [ ] Cấu hình nhạy cảm được quản lý thông qua biến môi trường
- [ ] `.env` file đã được thêm vào `.gitignore`

### 3.2 Giai đoạn triển khai

- [ ] Bật HTTPS
- [ ] Cấu hình tiêu đề bảo mật HTTP
- [ ] Tắt chế độ gỡ lỗi và thông tin lỗi chi tiết
- [ ] Cơ sở dữ liệu sử dụng tài khoản có quyền tối thiểu
- [ ] Cập nhật các phụ thuộc thường xuyên (`npm audit`)

---

## 4. Hỗ trợ AI: Sử dụng các mô hình lớn để nâng cao bảo vệ bảo mật

Các mô hình lớn có thể đóng vai trò là "cố vấn bảo mật" của bạn, giúp bạn kiểm tra các lỗ hổng mã và tạo ra các giải pháp bảo mật.

### 4.1 Kiểm tra bảo mật mã

> **Gợi ý từ:**
> ```
> Vui lòng thực hiện kiểm toán bảo mật đối với mã sau, kiểm tra xem có tồn tại:
> - Lỗ hổng XSS (đầu vào người dùng chưa được escape)
> - SQL injection (truy vấn nối chuỗi)
> - Rủi ro CSRF (thiếu xác minh Token)
> - Rò rỉ dữ liệu nhạy cảm (khóa hardcoded, mật khẩu bằng văn bản rõ)
> Cung cấp mức độ rủi ro, vị trí cụ thể và giải pháp khắc phục cho mỗi vấn đề.
>
> [Dán mã của bạn]
> ```

### 4.2 Tạo cấu hình bảo mật

> **Gợi ý từ:**
> ```
> Dự án của tôi sử dụng Express.js + PostgreSQL, sắp được triển khai trực tuyến.
> Vui lòng tạo một danh sách kiểm tra cấu hình bảo mật đầy đủ, bao gồm:
> - Mã cấu hình tiêu đề bảo mật HTTP
> - Cấu hình CORS
> - Cài đặt bảo mật cho kết nối cơ sở dữ liệu
> - Kế hoạch quản lý biến môi trường
> Cung cấp các đoạn mã có thể sử dụng trực tiếp.
> ```

### 4.3 Giải thích nguyên lý lỗ hổng

> **Gợi ý từ:**
> ```
> Sử dụng một ví dụ cụ thể, giải thích quy trình hoàn chỉnh của một cuộc tấn công CSRF:
> 1. Kẻ tấn công xây dựng trang độc hại như thế nào
> 2. Tại sao trình duyệt lại tự động mang theo Cookie
> 3. Máy chủ phòng thủ bằng CSRF Token như thế nào
> Sử dụng mã để chứng minh quy trình hoàn chỉnh của cuộc tấn công và phòng thủ.
> ```

::: tip Đề nghị sử dụng AI
Kiểm toán bảo mật của AI không thể thay thế việc kiểm tra bảo mật chuyên nghiệp. Hãy coi đó là lớp lọc đầu tiên, các hệ thống quan trọng vẫn cần được kiểm tra bởi đội bảo mật chuyên nghiệp.
:::

---

## 5. Tóm tắt

1. **Tư duy bảo mật**: Không bao giờ tin tưởng đầu vào bên ngoài, quyền tối thiểu, phòng thủ theo chiều sâu
2. **Các cuộc tấn công phổ biến**: XSS、SQL 注入、CSRF là những mối đe dọa bảo mật web tần suất cao nhất
3. **Chiến lược phòng thủ**: Xác thực đầu vào, mã hóa đầu ra, truy vấn tham số hóa, tiêu đề bảo mật HTTP
4. **Thói quen bảo mật**: Thực hiện danh sách kiểm tra bảo mật trước khi trực tuyến, kiểm tra các phụ thuộc thường xuyên

::: tip Suy nghĩ cuối cùng
Bảo mật không phải là một công việc một lần, mà là một thói quen xuyên suốt toàn bộ quá trình phát triển. Giống như thắt dây an toàn khi lái xe — không phải vì bạn dự kiến sẽ xảy ra tai nạn, mà vì đó là nhận thức bảo mật cơ bản. **Mỗi lần viết một dòng mã, hãy tự hỏi: Điều gì sẽ xảy ra nếu đầu vào này là độc hại?**
:::

---

## Đọc thêm

- **OWASP Top 10**: Danh sách mười rủi ro bảo mật ứng dụng web hàng đầu, mỗi nhà phát triển đều nên biết.
- **Công cụ thực tế**: Sử dụng `npm audit` để kiểm tra các lỗ hổng phụ thuộc, sử dụng plugin bảo mật ESLint để kiểm tra mã.
- **Học sâu hơn**: Tìm hiểu nguyên lý HTTPS, thực tiễn bảo mật JWT, các cân nhắc bảo mật OAuth 2.0.
- **Cộng đồng bảo mật**: Theo dõi thông báo bảo mật, vá lỗi đã biết kịp thời.
