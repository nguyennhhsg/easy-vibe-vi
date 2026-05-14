# Biểu thức chính quy

> 💡 **Hướng dẫn học tập**: Biểu thức chính quy trông giống như sách cổ? Nó thực chất chỉ là một ngôn ngữ mini để "mô tả các mẫu văn bản". Chương này sẽ giúp bạn hiểu các ý tưởng cơ bản của biểu thức chính quy từ đầu, học cách sử dụng một vài ký hiệu chính để giải quyết 80% các vấn đề tìm kiếm và xác thực văn bản.

---

## 0. Tại sao bạn cần biểu thức chính quy?

Hãy tưởng tượng các kịch bản sau:
- Tìm tất cả các địa chỉ IP từ một đoạn nhật ký dài
- Xác thực xem định dạng email do người dùng nhập có hợp lệ không
- Thay thế tất cả các định dạng ngày trong văn bản từ `2024/01/15` thành `2024-01-15`
- Trích xuất tất cả các liên kết từ mã nguồn trang web

**Sử dụng tìm kiếm chuỗi thông thường?** Bạn cần viết rất nhiều logic `if-else`.  
**Sử dụng biểu thức chính quy?** Một dòng mẫu giải quyết xong.

---

## 1. Bắt đầu với biểu thức chính quy: có thể làm được trong ba phút

👇 Hãy thử: nhập biểu thức chính quy và xem kết quả khớp theo thời gian thực

<RegexDemo />

::: tip 💡 Hiểu bằng một câu
Biểu thức chính quy = **sử dụng các ký hiệu đặc biệt để mô tả "bạn muốn tìm loại văn bản nào"**. `\d` biểu thị các chữ số, `+` biểu thị một hoặc nhiều, vì vậy `\d+` là "một hoặc nhiều chữ số".
:::

---

## 2. Khái niệm cơ bản: Kết hợp giống như xây dựng với các khối xây dựng

Bản chất của biểu thức chính quy là sử dụng **ba loại khối xây dựng** để xây dựng mẫu bạn muốn:

### 2.1 Khối xây dựng 1: Lớp ký tự (khớp với ký tự nào)

| Cú pháp | Ý nghĩa | Ví dụ |
|---|---|---|
| `.` | Bất kỳ ký tự nào | `a.c` → abc, a1c, a c |
| `\d` | Chữ số [0-9] | `\d\d` → 42, 99 |
| `\w` | Chữ cái/chữ số/dấu gạch dưới | `\w+` → hello, user_1 |
| `\s` | Ký tự khoảng trắng | Khớp với khoảng trắng, Tab |
| `[abc]` | Bất kỳ cái nào trong tập hợp | `[aeiou]` → Chữ cái nguyên âm |
| `[^abc]` | Không có trong tập hợp | `[^0-9]` → Ký tự không phải là chữ số |

### 2.2 Khối xây dựng 2: Bộ định lượng (khớp bao nhiêu lần)

| Cú pháp | Ý nghĩa | Ví dụ |
|---|---|---|
| `*` | 0 lần hoặc nhiều lần | `ab*` → a, ab, abbb |
| `+` | 1 lần hoặc nhiều lần | `ab+` → ab, abbb (không khớp a) |
| `?` | 0 lần hoặc 1 lần | `colou?r` → color, colour |
| `{3}` | Chính xác 3 lần | `\d{3}` → 123 |
| `{2,4}` | 2 đến 4 lần | `\d{2,4}` → 12, 1234 |

### 2.3 Khối xây dựng 3: Vị trí và nhóm

| Cú pháp | Ý nghĩa | Ví dụ |
|---|---|---|
| `^` | Đầu dòng | `^Hello` → Dòng bắt đầu bằng Hello |
| `$` | Cuối dòng | `end$` → Dòng kết thúc bằng end |
| `\b` | Ranh giới từ | `\bcat\b` → cat (không khớp catch) |
| `(...)` | Nhóm bắt được | `(\d+)-(\d+)` → bắt được riêng biệt |
| `a\|b` | Hoặc | `cat\|dog` → cat hoặc dog |

---

## 3. Thực chiến: Các mẫu xác thực phổ biến

### 3.1 Xác thực email

```
[\w.+-]+@[\w-]+\.[\w.]+
```

Phân tích:
- `[\w.+-]+` — phần tên người dùng (chữ cái, chữ số, dấu chấm, dấu cộng, dấu gạch ngang)
- `@` — ký tự @ chính
- `[\w-]+` — phần tên miền
- `\.` — dấu chấm thoát
- `[\w.]+` — tên miền cấp cao nhất

### 3.2 Xác thực số điện thoại di động (Trung Quốc)

```
1[3-9]\d{9}
```

Phân tích:
- `1` — bắt đầu bằng 1
- `[3-9]` — chữ số thứ hai là 3-9
- `\d{9}` — theo sau là 9 chữ số

### 3.3 Kiểm tra độ mạnh của mật khẩu

```
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$
```

Phân tích:
- `(?=.*[a-z])` — ít nhất một chữ cái thường (khẳng định trước)
- `(?=.*[A-Z])` — ít nhất một chữ cái hoa
- `(?=.*\d)` — ít nhất một chữ số
- `.{8,}` — tổng độ dài ít nhất 8 ký tự

---

## 4. Sử dụng biểu thức chính quy trong mã

### JavaScript

```javascript
const text = 'Cách liên lạc: 13812345678 hoặc 15099887766'
const regex = /1[3-9]\d{9}/g
const phones = text.match(regex)
// ['13812345678', '15099887766']

// Thay thế
text.replace(/\d{4}(?=\d{4}$)/, '****')
// Ẩn bốn chữ số ở giữa số điện thoại di động

// Xác thực
/^[\w.+-]+@[\w-]+\.[\w.]+$/.test('user@example.com')
// true
```

### Python

```python
import re

text = 'Giá là 99 nhân dân tệ, giảm giá 20 nhân dân tệ'
numbers = re.findall(r'\d+', text)
# ['99', '20']

# Thay thế
re.sub(r'\d+', 'X', text)
# 'Giá là X nhân dân tệ, giảm giá X nhân dân tệ'

# Bắt nhóm
match = re.search(r'(\d+)-(\d+)', '2024-01-15')
match.group(1)  # '2024'
match.group(2)  # '01'
```

---

## 5. Tham lam so với Lười biếng: Một sự khác biệt chính

```
Văn bản: <b>hello</b> and <b>world</b>
```

| Mẫu | Kết quả khớp | Giải thích |
|---|---|---|
| `<b>.*</b>` | `<b>hello</b> and <b>world</b>` | Tham lam: khớp càng nhiều càng tốt |
| `<b>.*?</b>` | `<b>hello</b>` | Lười biếng: khớp ít nhất có thể |

::: tip 💡 Ghi nhớ
Chế độ mặc định là tham lam. Thêm `?` sau bộ định lượng để thay đổi thành chế độ lười biếng. Hầu hết thời gian, bạn cần chế độ lười biếng.
:::

---

## 6. Tóm tắt

::: tip 📚 Điểm chính
1. **Biểu thức chính quy = ngôn ngữ mini để mô tả các mẫu văn bản**, được sử dụng để tìm kiếm, khớp, thay thế
2. **Ba loại khối xây dựng**: Lớp ký tự (khớp với cái gì) + Bộ định lượng (khớp bao nhiêu lần) + vị trí/nhóm
3. **\d \w \s** là ba lớp ký tự được sử dụng phổ biến nhất, bao gồm chữ số, từ, khoảng trắng
4. **Không cần viết từ đầu**: Các tình huống phổ biến đều có các mẫu biểu thức chính quy trưởng thành có thể tái sử dụng
5. **Tham lam so với Lười biếng**: Mặc định là tham lam (khớp nhiều hơn), thêm `?` để thay đổi thành lười biếng (khớp ít hơn)
:::

**Học bước tiếp theo**:
- [Biến môi trường và PATH](./environment-path) - Hiểu cấu hình hệ thống
- [SSH và Xác thực khóa](./ssh-authentication) - Kết nối an toàn với máy chủ từ xa
