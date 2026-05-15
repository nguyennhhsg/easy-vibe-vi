# Nguyên lý cơ sở dữ liệu (Chỉ mục / Giao dịch / Tối ưu hóa truy vấn)
::: tip 🎯 Câu hỏi cốt lõi
**Tại sao truy vấn Excel của bạn mất 10 giây, còn tìm kiếm Taobao chỉ mất 0.01 giây?** Khi dữ liệu từ "vài nghìn bản ghi" thành "một tỷ bản ghi", từ "một người sử dụng" thành "hàng chục triệu người truy cập cùng lúc", Excel không còn đủ dùng nữa. Cơ sở dữ liệu ra đời để giải quyết vấn đề này——nó là "Super Excel" được thiết kế đặc biệt để xử lý khối lượng dữ liệu khổng lồ và lưu lượng truy cập cao. Chương này sẽ giúp bạn hiểu rõ các nguyên lý cốt lõi của cơ sở dữ liệu từ con số không.
:::

---

## 1. Tại sao lại cần "cơ sở dữ liệu"?

### 1.1 Từ tiệm sách nhỏ đến Taobao: sự thay đổi quy mô dữ liệu

Hãy tưởng tượng bạn mở một tiệm sách nhỏ, bán được vài cuốn mỗi ngày. Bạn viết vội vàng vào quyển sổ:

```
2024-01-15：Trương Tam mua《Trăm năm cô đơn》, 59 nhân dân tệ
2024-01-16：Lý Tứ mua《Còn sống》, 39 nhân dân tệ
```

Lúc này, quyển sổ hoàn toàn đủ dùng. Nhưng khi tiệm sách của bạn trở thành "Amazon", hàng triệu đơn hàng tràn vào mỗi ngày, vấn đề bắt đầu nảy sinh:

- **Dữ liệu lớn**: không phải vài mươi hàng, mà là hàng trăm triệu hàng
- **Truy cập đồng thời**: không phải một người đang xem, mà là hàng chục triệu người truy cập cùng lúc
- **Liên kết dữ liệu**: đơn hàng liên kết với người dùng, sản phẩm, hàng tồn kho, vận chuyển......các mối quan hệ phức tạp cần quản lý hiệu quả
- **An toàn dữ liệu**: không thể mất toàn bộ đơn hàng chỉ vì mất điện

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**📓 Excel/Sổ ghi chép**
- Thích hợp cho cá nhân hoặc nhóm nhỏ
- Dữ liệu: vài nghìn đến vài chục nghìn hàng
- Một người sử dụng, truy cập tuần tự
- Tìm kiếm thủ công, tốc độ chậm

</div>
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🗄️ Cơ sở dữ liệu**
- Thích hợp cho ứng dụng cấp doanh nghiệp
- Dữ liệu: hàng trăm triệu trở lên
- Hàng chục triệu người trực tuyến cùng lúc
- Tốc độ truy vấn milisecond

</div>
</div>

**Đây chính là vấn đề mà "cơ sở dữ liệu" cần giải quyết: làm sao lưu trữ hiệu quả, truy vấn nhanh chóng, và quản lý an toàn khối lượng dữ liệu khổng lồ?**

### 1.2 Một câu chuyện thực tế: tại sao không thể dùng Excel để lưu dữ liệu người dùng

Bạn có thể nói: "Dự án của tôi chỉ có vài chục nghìn người dùng, Excel không là đủ dùng sao?" Hãy để tôi kể một câu chuyện thực tế.

::: warning Câu chuyện bê bối của Tiểu Lâm
Tiểu Lâm bắt đầu kinh doanh một ứng dụng mạng xã hội, lúc đầu không có nhiều người dùng, anh lưu thông tin người dùng bằng Excel (tên, điện thoại, thời gian đăng ký, v.v.). Mỗi ngày xuất Excel để thống kê tăng trưởng người dùng, mọi thứ bình thường.

Khi số lượng người dùng vượt quá 100.000, vấn đề bắt đầu xuất hiện:
- Excel mất 5 phút để mở
- Lọc "người dùng ở Bắc Kinh" bị đơ cả nửa ngày
- Một lần file Excel bị hỏng, vài nghìn dữ liệu người dùng biến mất vĩnh viễn

Điều tồi tệ nhất là khi anh muốn thực hiện tính năng "xem tất cả đơn hàng của một người dùng"——nhưng thông tin người dùng và đơn hàng lại ở những file Excel khác nhau, anh chỉ có thể sao chép dán thủ công, mỗi lần mất nửa giờ.

Sau đó, anh hỏi ý kiến của một người bạn lớp tuổi, anh chàng đó nhìn xem rồi cười: "Bạn cần không phải Excel, mà là cơ sở dữ liệu."

Sau khi chuyển sang dùng cơ sở dữ liệu, mọi thứ đã đổi:
- Truy vấn "người dùng ở Bắc Kinh" chỉ mất 0.01 giây
- Thông qua "mối quan hệ", tự động liên kết người dùng và đơn hàng, một câu SQL giải quyết
- Dữ liệu tự động sao lưu, không còn lo file bị hỏng

Tiểu Lâm từ đó nhận ra một điều: **khi dữ liệu còn ít thì dùng cái gì cũng được; nhưng dữ liệu một khi lớn lên, Excel chỉ là thảm họa.**
:::

::: info 💡 Hiểu biết cốt lõi
Cơ sở dữ liệu không phải là "Excel phức tạp hơn", mà là một triết lý thiết kế hoàn toàn khác:
- **Excel**: được thiết kế cho dữ liệu nhỏ, sử dụng bởi một người
- **Cơ sở dữ liệu**: được thiết kế cho dữ liệu lớn, truy cập cao, liên kết phức tạp

Lựa chọn công cụ thích hợp có thể giúp hiệu năng hệ thống của bạn tăng hàng ngàn lần.
:::

---

## 2. Khái niệm cốt lõi: bảng, hàng, cột, khóa chính

::: tip 🤔 Các khái niệm này liên quan gì đến cơ sở dữ liệu?
Bảng, hàng, cột, khóa chính là những "viên gạch" của cơ sở dữ liệu.

Hãy tưởng tượng bạn xây nhà:
- **Bảng** = một phòng (lưu trữ một loại dữ liệu)
- **Hàng** = một chiếc hộp trong phòng (một bản ghi hoàn chỉnh)
- **Cột** = nhãn trên hộp (tên, tuổi, v.v.)
- **Khóa chính** = số hiệu duy nhất của hộp (tuyệt đối không lặp lại)

Chỉ khi hiểu rõ những khái niệm cơ bản này, bạn mới biết dữ liệu được tổ chức như thế nào.
:::

Trước khi đi sâu vào học cơ sở dữ liệu, chúng ta cần hiểu rõ một vài khái niệm cốt lõi. Để giúp bạn hiểu, chúng ta sẽ dùng phép so sánh với thư viện.

### 2.1 Dùng phép so sánh thư viện để hiểu cấu trúc cơ sở dữ liệu

Hãy tưởng tượng bạn bước vào một thư viện, cách tổ chức bên trong kỳ lạ giống với cơ sở dữ liệu:

| Khái niệm | 📚 Phép so sánh thư viện | Tác dụng thực tế | Ví dụ cụ thể |
|------|-------------|----------|----------|
| **Cơ sở dữ liệu (Database)** | Toàn bộ thư viện | Bộ chứa lưu trữ tất cả dữ liệu | Cơ sở dữ liệu của một trang web thương mại điện tử |
| **Bảng (Table)** | Một kệ sách | Tập hợp lưu trữ cùng loại dữ liệu | Bảng người dùng, bảng sản phẩm, bảng đơn hàng |
| **Cột (Column)** | Nhãn trên sống sách | Thuộc tính của dữ liệu (trường) | Tên, tuổi, số điện thoại |
| **Hàng (Row)** | Mỗi cuốn sách trên kệ | Một bản ghi dữ liệu cụ thể | "Trương Tam, 25 tuổi, Bắc Kinh" |
| **Khóa chính (Primary Key)** | Mã ISBN của mỗi cuốn sách | Định danh duy nhất cho mỗi hàng | user_id = 1001 |

**Xem ví dụ thực tế**: Bảng người dùng (users)

| user_id (khóa chính) | name | age | city | email |
|:-------------:|------|-----|------|-------|
| 1001 | Trương Tam | 25 | Bắc Kinh | zhangsan@example.com |
| 1002 | Lý Tứ | 30 | Thượng Hải | lisi@example.com |
| 1003 | Vương Ngũ | 28 | Bắc Kinh | wangwu@example.com |

- **Bảng**: `users` (lưu trữ tất cả dữ liệu người dùng)
- **Cột**: `user_id`, `name`, `age`, `city`, `email` (mỗi thuộc tính của người dùng)
- **Hàng**: mỗi hàng là một người dùng (ví dụ "Trương Tam, 25 tuổi, Bắc Kinh")
- **Khóa chính**: `user_id` (1001, 1002, 1003, không bao giờ lặp lại)

### 2.2 Khóa chính (Primary Key): "Thẻ căn cước" của dữ liệu

::: tip 📖 Khóa chính là gì?
**Khóa chính** là định danh duy nhất cho mỗi hàng trong bảng, giống như số thẻ căn cước.

**Đặc điểm chính**:
- **Tính duy nhất**: không bao giờ lặp lại (không có hai người có cùng số thẻ căn cước)
- **Không trống**: phải có giá trị (không thể "không có thẻ căn cước")
- **Không thay đổi**: một khi đã đặt, sẽ không thay đổi (số thẻ căn cước của bạn không thay đổi)

**Cách làm phổ biến**:
- Dùng số nguyên tự tăng: 1, 2, 3, 4...
- Dùng UUID (định danh duy nhất toàn cầu): `550e8400-e29b-41d4-a716-446655440000`
:::

Tại sao lại cần khóa chính? Hãy tưởng tượng một thế giới không có khóa chính:

**Kịch bản**: bạn muốn thay đổi tuổi của "Trương Tam", nhưng có 3 người tên "Trương Tam" trong bảng, hệ thống nên thay đổi cái nào?

```sql
-- Không có khóa chính, câu này sẽ thay đổi tất cả người tên "Nguyen Van A"!
UPDATE users SET age = 26 WHERE name = 'Nguyen Van A';

-- Có khóa chính, thay đổi chính xác
UPDATE users SET age = 26 WHERE user_id = 1001;
```

**Quy tắc vàng của khóa chính**: mỗi bảng nên có một khóa chính, và không bao giờ thay đổi nó.

### 2.3 Khóa ngoài (Foreign Key): cây cầu nối giữa các bảng

Đây là điểm mạnh của cơ sở dữ liệu so với Excel——**các bảng có thể tạo mối quan hệ với nhau**.

::: tip 📖 Khóa ngoài là gì?
**Khóa ngoài** là một cột chỉ đến khóa chính của bảng khác, dùng để tạo liên kết giữa các bảng.

**Hiểu đơn giản**:
- Khóa chính = số thẻ căn cước của tôi
- Khóa ngoài = số thẻ căn cước của người khác mà tôi đề cập đến

**Ví dụ**: `user_id` trong bảng đơn hàng là khóa ngoài, chỉ đến khóa chính của bảng người dùng.
:::

Xem một ví dụ thực tế:

**Bảng người dùng (users)**:

| user_id (khóa chính) | name | phone |
|:-------------:|------|-------|
| 1001 | Trương Tam | 138xxxx |
| 1002 | Lý Tứ | 139xxxx |

**Bảng đơn hàng (orders)**:

| order_id (khóa chính) | product_name | price | user_id (khóa ngoài) |
|:--------------:|-------------|-------|:-------------:|
| 5001 | iPhone 15 | 5999 | 1001 |
| 5002 | MacBook | 14999 | 1001 |
| 5003 | AirPods | 1999 | 1002 |

**Hiểu chính**:
- `user_id = 1001` trong bảng đơn hàng chỉ đến `user_id = 1001` trong bảng người dùng (Trương Tam)
- Khi muốn biết "đơn hàng 5001 là ai mua", cơ sở dữ liệu tự động đi tìm trong bảng người dùng với `user_id = 1001`

**Lợi ích**:
- **Dữ liệu không lặp lại**: Trương Tam mua 100 đơn hàng, thông tin của anh chỉ lưu một lần trong bảng người dùng
- **Dễ bảo trì**: Trương Tam thay số điện thoại, chỉ thay ở bảng người dùng, tất cả đơn hàng tự động cập nhật
- **Truy vấn linh hoạt**: có thể dễ dàng trả lời "tổng chi tiêu của mỗi người dùng là bao nhiêu" kiểu câu hỏi phức tạp

<DatabaseRelationDemo />

---

## 3. Cách giao tiếp với cơ sở dữ liệu? Bắt đầu với SQL và thực hành

Bạn không thể trực tiếp "click" vào cơ sở dữ liệu (mặc dù có công cụ giao diện, nhưng bản chất cũng chuyển thành lệnh), bạn cần dùng một ngôn ngữ đặc biệt để chỉ đạo cơ sở dữ liệu làm việc.

Ngôn ngữ đó là **SQL (Structured Query Language, ngôn ngữ truy vấn có cấu trúc)**.

Tin tốt là: SQL rất gần với tiếng Anh tự nhiên, nghe giống như đang nói chuyện.

### 3.1 Các thao tác cốt lõi của SQL: CRUD

Hầu hết thời gian, bạn chỉ cần nắm bốn thao tác, trong giới nó gọi là **CRUD**:

| Thao tác | Tiếng Anh | Từ khóa SQL | Hiểu đơn giản |
|------|------|------------|----------|
| **C**reate | Tạo | `INSERT` | Thêm một bản ghi dữ liệu |
| **R**ead | Đọc | `SELECT` | Truy vấn dữ liệu |
| **U**pdate | Cập nhật | `UPDATE` | Sửa dữ liệu |
| **D**elete | Xóa | `DELETE` | Xóa dữ liệu |

::: tip 📊 Bạn có thể thấy gì từ bảng?
Bốn thao tác này bao gồm toàn bộ kịch bản xử lý dữ liệu:
- **Create**: khi người dùng đăng ký, chèn một bản ghi người dùng mới
- **Read**: khi người dùng đăng nhập, truy vấn tên người dùng và mật khẩu
- **Update**: khi người dùng sửa thông tin cá nhân, cập nhật dữ liệu trong bảng
- **Delete**: khi người dùng hủy tài khoản, xóa dữ liệu người dùng

Nhớ bốn cái này, bạn đã nắm được 80% các thao tác SQL hàng ngày.
:::

### 3.2 Truy vấn dữ liệu (SELECT): thao tác được sử dụng nhiều nhất của cơ sở dữ liệu

Truy vấn là chức năng quan trọng nhất của cơ sở dữ liệu, cũng là chìa khóa tối ưu hóa hiệu năng.

**Ví dụ 1**: Tìm tất cả người dùng ở Bắc Kinh

```sql
SELECT name, age FROM users WHERE city = 'Ha Noi';
```

**Hiểu từng từ**:
- `SELECT name, age`: chọn hai cột name và age
- `FROM users`: từ bảng users
- `WHERE city = 'Ha Noi'`: trong điều kiện city bằng "Hà Nội"

**Kết quả trả về**:

| name | age |
|------|-----|
| Trương Tam | 25 |
| Vương Ngũ | 28 |

**Ví dụ 2**: Tìm sản phẩm có giá từ 5000 đến 15000

```sql
SELECT name, price FROM products
WHERE price BETWEEN 5000 AND 15000;
```

**Ví dụ 3**: Tìm kiếm mờ (tìm người dùng có tên chứa "Nguyen")

```sql
SELECT name FROM users WHERE name LIKE '%Nguyen%';
```

::: warning ⚠️ Bẫy hiệu năng: sử dụng LIKE
`LIKE '%Nguyen%'` dẫn đến **quét toàn bảng**, khi dữ liệu lớn rất chậm.

**Gợi ý tối ưu**:
- ❌ Không nên dùng `LIKE '%Nguyen%'` (có % ở cả hai đầu)
- ✅ Có thể dùng `LIKE 'Nguyen%'` (chỉ có % ở phía sau)

Vì `LIKE 'Nguyen%'` có thể sử dụng chỉ mục, nhưng `LIKE '%Nguyen%'` không thể.
:::

### 3.3 Chèn dữ liệu (INSERT): thêm bản ghi

**Ví dụ**: Thêm một người dùng mới

```sql
INSERT INTO users (user_id, name, age, city, email)
VALUES (1004, 'Pham Van D', 35, 'Da Nang', 'phamvand@example.com');
```

**Hiểu từng từ**:
- `INSERT INTO users`: chèn vào bảng users
- `(user_id, name, age, city, email)`: chỉ định các cột cần chèn
- `VALUES (1004, 'Pham Van D', ...)`: các giá trị tương ứng

**Chèn nhiều hàng** (hiệu quả hơn):

```sql
INSERT INTO users (name, age, city) VALUES
('Minh', 25, 'Ha Noi'),
('Hong', 28, 'TP HCM'),
('Cuong', 30, 'Da Nang');
```

### 3.4 Cập nhật dữ liệu (UPDATE): sửa bản ghi

**Ví dụ**: Tăng tuổi tất cả người dùng ở Bắc Kinh lên 1

```sql
UPDATE users SET age = age + 1 WHERE city = 'Ha Noi';
```

::: danger ❌ Nguy hiểm cực đại: đừng quên WHERE!
Nếu bạn quên viết mệnh đề `WHERE`, sẽ sửa **tất cả hàng**!

```sql
-- Nguy hiểm! Sẽ thay đổi tuổi tất cả người dùng thành 26
UPDATE users SET age = 26;

-- Đúng: chỉ sửa người dùng có user_id = 1001
UPDATE users SET age = 26 WHERE user_id = 1001;
```

**Bài học thực tế**: năm 2012, một công ty nổi tiếng vì một kỹ sư quên viết WHERE, khiến hàng trăm triệu dữ liệu người dùng trong môi trường sản xuất bị sửa sai, hệ thống ngừng hoạt động 4 giờ, tổn thất khổng lồ.
:::

### 3.5 Xóa dữ liệu (DELETE): xóa bản ghi

**Ví dụ**: Xóa người dùng có user_id = 1004

```sql
DELETE FROM users WHERE user_id = 1004;
```

::: danger ❌ Hai lần nguy hiểm: DELETE còn cần WHERE hơn!
```sql
-- Nguy hiểm! Sẽ xóa toàn bộ dữ liệu trong bảng!
DELETE FROM users;

-- Đúng: chỉ xóa hàng được chỉ định
DELETE FROM users WHERE user_id = 1004;
```

**Thực hành tốt nhất**:
1. Trước khi xóa, dùng SELECT để xác nhận dữ liệu
2. Trong hệ thống quan trọng, dùng "xóa mềm" (thêm cột `is_deleted` để đánh dấu xóa)
3. Trước khi thao tác trên hệ thống sản xuất, sao lưu dữ liệu
:::

### 3.6 Truy vấn nhiều bảng (JOIN): khoảnh khắc kỳ diệu của cơ sở dữ liệu

Bạn còn nhớ "khóa ngoài" mà chúng ta nói trước không? SQL mạnh mẽ nhất ở chỗ nó có thể truy vấn nhiều bảng liên kết cùng một lúc.

**Kịch bản**: Truy vấn "tất cả sản phẩm mà Trương Tam đã mua"

Giả sử chúng ta có ba bảng:

**Bảng người dùng (users)**:
| user_id | name |
|---------|------|
| 1001 | Nguyen Van A |

**Bảng sản phẩm (products)**:
| product_id | name | price |
|------------|------|-------|
| 201 | iPhone 15 | 5999 |
| 202 | MacBook | 14999 |

**Bảng đơn hàng (orders)**:
| order_id | user_id | product_id | quantity |
|----------|---------|------------|----------|
| 5001 | 1001 | 201 | 1 |
| 5002 | 1001 | 202 | 2 |

**Truy vấn SQL**:

```sql
SELECT u.name, p.name AS product_name, p.price, o.quantity
FROM orders o
JOIN users u ON o.user_id = u.user_id
JOIN products p ON o.product_id = p.product_id
WHERE u.name = 'Nguyen Van A';
```

**Kết quả trả về**:

| name | product_name | price | quantity |
|------|--------------|-------|----------|
| Nguyen Van A | iPhone 15 | 5999 | 1 |
| Nguyen Van A | MacBook | 14999 | 2 |

**Hiểu quy trình JOIN**:
1. `FROM orders o`: bắt đầu từ bảng đơn hàng
2. `JOIN users u ON o.user_id = u.user_id`: liên kết với bảng người dùng thông qua user_id
3. `JOIN products p ON o.product_id = p.product_id`: liên kết với bảng sản phẩm thông qua product_id
4. `WHERE u.name = 'Nguyen Van A'`: lọc các đơn hàng của Nguyễn Văn A

<SqlPlaygroundDemo />

---

## 4. Tại sao cơ sở dữ liệu lại nhanh như vậy? Bí mật của chỉ mục được tiết lộ

Đây là nơi kỳ diệu nhất của cơ sở dữ liệu, cũng là câu hỏi yêu thích trong phỏng vấn.

Nếu bạn tìm "tất cả người có họ Trương" trong Excel, Excel phải quét từ hàng đầu đến hàng cuối cùng. Đó là **quét toàn bảng**——dữ liệu càng nhiều, tốc độ càng chậm.

Nhưng trong cơ sở dữ liệu, ngay cả với 1 tỷ hàng dữ liệu, tìm kiếm cũng chỉ mất vài millisecond.

**Bí quyết là: Chỉ mục (Index).**

### 4.1 Hiểu trực quan: Bài học từ từ điển

Hãy tưởng tượng bạn phải tìm một từ trong một cuốn sách 1000 trang mà không có mục lục. Bạn sẽ làm gì?

**Chỉ có thể lật trang lần lượt**——đó là quét toàn bảng, trung bình cần lật 500 trang.

Nhưng nếu cuốn sách này có **mục lục theo bảng chữ cái** thì sao?

Bạn muốn tìm từ "database":
1. Lật đến mục lục, tìm khu vực bắt đầu bằng chữ "d"
2. Trong khu vực "d", tìm tiếp các chữ "a", "t"...
3. Mục lục cho bạn biết: ở trang 256

Bạn chỉ cần lật 3 lần! Đó là **tìm kiếm với chỉ mục**.

**Chỉ mục của cơ sở dữ liệu giống như mục lục sách**:
- Không có chỉ mục: quét hàng lần lượt (1 tỷ hàng = vài phút)
- Có chỉ mục: nhảy trực tiếp (1 tỷ hàng = 3 lần I/O đĩa = vài millisecond)

### 4.2 Quét toàn bảng vs Tìm kiếm với chỉ mục: so sánh tốc độ

Giả sử chúng ta có một bảng người dùng với 10 triệu bản ghi.

**Kịch bản**: Tìm người dùng có `user_id = 5,555,555`

| Cách | Quy trình | Số hàng cần kiểm tra | Ước tính thời gian |
|------|------|----------------|----------|
| **Quét toàn bảng** | Bắt đầu từ hàng 1, xem từng hàng | Trung bình 5 triệu hàng | 5-30 giây |
| **Tìm kiếm chỉ mục** | Tìm chỉ mục, nhảy trực tiếp đến vị trí đích | 3-4 lần so sánh | 0.003 giây |

**Chênh lệch tốc độ: hàng nghìn lần!**

::: tip 💡 Hiểu biết cốt lõi
Chỉ mục không phải là viên đạn thần kỳ, nó có chi phí:
- **Chiếm dung lượng**: chỉ mục cần thêm không gian lưu trữ
- **Giảm tốc độ ghi**: mỗi lần INSERT/UPDATE/DELETE đều phải cập nhật chỉ mục

**Khi nào nên xây dựng chỉ mục?**
- Cột thường dùng để truy vấn (WHERE, JOIN điều kiện)
- Dữ liệu lớn (dưới vài nghìn hàng không cần)

**Khi nào không nên xây dựng chỉ mục?**
- Cột ít khi truy vấn
- Cột thường xuyên cập nhật
- Bảng dữ liệu nhỏ
:::

### 4.3 Cấu trúc dữ liệu bên dưới: Cây B+

Chỉ mục thực tế không phải là "danh sách chữ cái" đơn giản, mà là một cấu trúc dữ liệu được thiết kế tỉ mỉ, gọi là **Cây B+ (B+ Tree)**.

::: tip 📖 Cây B+ là gì?
**Cây B+** là một cấu trúc dữ liệu hình cây "ngắn, rộng":

- **Ngắn**: từ gốc đến lá thường chỉ 3-4 tầng
- **Rộng**: mỗi nút có thể lưu trữ hàng trăm giá trị chính

**Tại sao lại "ngắn, rộng"?**

Bởi dữ liệu được lưu trữ trên đĩa, mỗi lần đọc đĩa (I/O) đều rất chậm (chậm hơn bộ nhớ hàng nghìn lần). Cây B+ được thiết kế để **giảm thiểu số lần I/O đĩa**.

- 3-4 tầng cao = tối đa 3-4 lần đọc đĩa
- Mỗi tầng lưu nhiều dữ liệu = đảm bảo cây không quá cao
:::

**Ví dụ thực tế**:

Giả sử mỗi nút của cây B+ có thể lưu 1000 giá trị chính:

- **Nút gốc**: 1000 giá trị chính → chỉ đến 1000 nút con
- **Nút trung gian**: mỗi cái lưu 1000 giá trị chính → chỉ đến 1000 nút lá
- **Nút lá**: mỗi cái lưu 1000 bản ghi dữ liệu thực

**Tổng dữ liệu** = 1000 × 1000 × 1000 = **1 tỷ bản ghi**

**Chiều cao cây** = **3 tầng**

Điều này có nghĩa là: tìm bất kỳ bản ghi nào trong 1 tỷ bản ghi, chỉ cần **3 lần I/O đĩa**!

Đây chính là bí mật của việc truy vấn cơ sở dữ liệu siêu nhanh.

<BPlusTreeDemo />

---

## 5. Giao dịch: Làm sao để đảm bảo dữ liệu không mất, không loạn?

Hãy tưởng tượng kịch bản mua vé tàu trong mùa vận chuyển:

- Thời điểm T1: Người dùng A truy vấn, phát hiện "chuyến tàu G1234 còn 1 vé"
- Thời điểm T2: Người dùng B cũng truy vấn, cũng phát hiện "còn 1 vé"
- Thời điểm T3: Người dùng A nhấn "mua", hệ thống trừ hàng tồn kho, bán cho A
- Thời điểm T4: Người dùng B nhấn "mua"——nếu không có cơ chế bảo vệ, hệ thống sẽ lại trừ hàng tồn kho và bán cùng một vé cho B!

Đây là vấn đề **xung đột đồng thời** điển hình.

### 5.1 Giao dịch (Transaction) là gì?

**Giao dịch** là một nhóm thao tác của cơ sở dữ liệu, những thao tác này **hoặc thành công hết, hoặc thất bại hết**, không có trạng thái "làm được một nửa".

::: tip 🤖 Ví dụ trong cuộc sống
**Chuyển tiền tại ngân hàng** là một giao dịch điển hình:

1. Trừ 100 từ tài khoản A
2. Cộng 100 vào tài khoản B

Nếu bước 1 thành công nhưng bước 2 thất bại (ví dụ mất điện), sẽ xảy ra điều gì?
- **Không có giao dịch**: tiền của tài khoản A biến mất, tài khoản B không nhận được, tiền biến mất khỏi không gian vô hình
- **Có giao dịch**: hệ thống phát hiện bước 2 thất bại, tự động hoàn tác bước 1, cả hai tài khoản trở về trạng thái ban đầu

Đây là **tính nguyên tử** của giao dịch: hoàn toàn làm, hoặc hoàn toàn không làm.
:::

### 5.2 Bốn tính chất lớn của giao dịch (ACID)

Giao dịch có bốn tính chất lớn, viết tắt là **ACID**:

| Tính chất | Tiếng Anh | Ý nghĩa | Ví dụ chuyển tiền tại ngân hàng |
|------|------|------|--------------|
| **A**tomicity | Tính nguyên tử | Hoàn toàn làm, hoặc hoàn toàn không làm | Trừ tiền và cộng tiền phải thành công đồng thời, không thể chỉ trừ tiền mà không cộng |
| **C**onsistency | Tính nhất quán | Dữ liệu lúc nào cũng ở trạng thái hợp lệ | Trước và sau chuyển tiền, tổng tiền của hai tài khoản không thay đổi |
| **I**solation | Tính cô lập | Các giao dịch không ảnh hưởng đến nhau | Khi A đang chuyển tiền, B thấy số dư tài khoản là trạng thái "trước chuyển" hoặc "sau chuyển", không thể thấy trạng thái ở giữa |
| **D**urability | Tính bền vững | Một khi đã cam kết, dữ liệu sẽ được lưu lại vĩnh viễn | Sau khi chuyển tiền thành công, ngay cả mất điện, số dư tài khoản cũng không quay trở lại |

::: tip 📊 Bạn có thể thấy gì từ bảng?
Bốn tính chất này đảm bảo an toàn dữ liệu:

- **Tính nguyên tử**: ngăn chặn "làm một nửa" (trừ tiền nhưng không cộng vào)
- **Tính nhất quán**: ngăn chặn dữ liệu không hợp lệ (sau chuyển tiền tổng tiền thay đổi)
- **Tính cô lập**: ngăn chặn xung đột đồng thời (hai người sửa cùng dữ liệu)
- **Tính bền vững**: ngăn chặn mất dữ liệu (cam kết rồi mất điện cũng không sao)

Nếu không có những đảm bảo này, hệ thống ngân hàng không thể chạy được.
:::

### 5.3 Mức cô lập của giao dịch: cân bằng giữa an toàn và hiệu năng

Về lý thuyết, chúng ta muốn các giao dịch hoàn toàn cô lập. Nhưng **cô lập hoàn toàn = hiệu năng cực kỳ tệ** (vì cần nhiều khóa, các giao dịch khác phải chờ đợi).

Do đó, cơ sở dữ liệu cung cấp **bốn mức cô lập**:

| Mức cô lập | Đọc bẩn | Không thể đọc lại | Đọc ảo | Hiệu năng | Tình huống sử dụng |
|----------|------|------------|------|------|----------|
| **Đọc chưa cam kết** | Có thể | Có thể | Có thể | Nhanh nhất | Hầu như không dùng (dữ liệu có thể sai) |
| **Đọc đã cam kết** | Không | Có thể | Có thể | Khá nhanh | Kinh doanh thông thường (Oracle mặc định) |
| **Có thể đọc lại** | Không | Không | Có thể | Trung bình | Chuyển tiền tại ngân hàng (MySQL mặc định) |
| **Tuần tự hóa** | Không | Không | Không | Chậm nhất | Tình huống cực kỳ nghiêm ngặt (rất ít dùng) |

::: tip 📖 Ba "đọc" là gì?
- **Đọc bẩn**: đọc dữ liệu mà giao dịch khác chưa cam kết (có thể bị hoàn tác, dữ liệu không chính xác)
- **Không thể đọc lại**: trong cùng một giao dịch, đọc hai lần cùng dữ liệu, kết quả khác nhau (bị giao dịch khác sửa rồi)
- **Đọc ảo**: trong cùng một giao dịch, hai lần truy vấn, số hàng trong tập kết quả khác nhau (giao dịch khác chèn/xóa dữ liệu)

**Ví dụ thông thường** (kiểm tra số dư tài khoản tại ngân hàng):
- **Đọc bẩn**: bạn thấy số dư 1000, nhưng giao dịch kia hoàn tác, thực tế chỉ 100
- **Không thể đọc lại**: lần đầu xem số dư 1000, lần thứ hai xem thành 800 (bị trừ tiền rồi)
- **Đọc ảo**: lần đầu xem 5 giao dịch, lần thứ hai xem 6 giao dịch (có giao dịch mới)
:::

<TransactionACIDDemo />

---

## 6. Tối ưu hóa hiệu năng: Kỹ thuật thực chiến để truy vấn nhanh 1000 lần

Giờ bạn đã hiểu các khái niệm cốt lõi như chỉ mục, giao dịch. Nhưng trong các dự án thực tế, bạn có thể gặp các vấn đề hiệu năng khác nhau.

Phần này sẽ cung cấp **chiến lược tối ưu hóa có thể áp dụng trực tiếp**.

### 6.1 Hướng dẫn tránh bẫy khi sử dụng chỉ mục

::: warning ⚠️ Lỗi thông thường: Chỉ mục không hoạt động
Nhiều lần bạn xây dựng chỉ mục, nhưng truy vấn vẫn chậm——vì chỉ mục **không hoạt động**.

**Những nguyên nhân phổ biến dẫn đến chỉ mục không hoạt động**:
1. Sử dụng hàm trên cột chỉ mục
2. Chuyển đổi kiểu ngầm
3. Truy vấn LIKE bắt đầu bằng %
4. Điều kiện OR (trong một số trường hợp)
5. Chỉ mục kép không thỏa mãn nguyên tắc tiền tố bên trái
:::

**Bẫy 1: Sử dụng hàm trên cột chỉ mục**

```sql
-- ❌ Sai: sử dụng hàm trên cột chỉ mục, không thể sử dụng chỉ mục
SELECT * FROM users WHERE YEAR(created_at) = 2024;

-- ✅ Đúng: chuyển thành truy vấn phạm vi, có thể sử dụng chỉ mục
SELECT * FROM users
WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';
```

**Bẫy 2: Chuyển đổi kiểu ngầm**

```sql
-- Giả sử user_id là kiểu int
-- ❌ Sai: truyền chuỗi, gây chuyển đổi ngầm, không thể sử dụng chỉ mục
SELECT * FROM users WHERE user_id = '123';

-- ✅ Đúng: truyền kiểu tương ứng
SELECT * FROM users WHERE user_id = 123;
```

**Bẫy 3: LIKE bắt đầu bằng %**

```sql
-- ❌ Sai: bắt đầu bằng %, không thể sử dụng chỉ mục
SELECT * FROM users WHERE name LIKE '%Nguyen Van A%';

-- ✅ Đúng: bắt đầu bằng tiền tố cố định, có thể sử dụng chỉ mục
SELECT * FROM users WHERE name LIKE 'Nguyen Van A%';

-- ✅ Hoặc dùng chỉ mục toàn văn (phù hợp với tìm kiếm văn bản)
SELECT * FROM users WHERE MATCH(name) AGAINST('Nguyen Van A');
```

### 6.2 Mẫu tối ưu hóa SQL thực chiến

**Mẫu 1: Tối ưu hóa phân trang (vấn đề phân trang sâu)**

::: details Xem vấn đề và giải pháp
```sql
-- ❌ Vấn đề: khi OFFSET rất lớn, truy vấn ngày càng chậm
SELECT * FROM orders
ORDER BY created_at DESC
LIMIT 10 OFFSET 1000000;

-- ✅ Giải pháp 1: dùng dấu thời gian của lần truy vấn trước làm con trỏ
SELECT * FROM orders
WHERE created_at < '2024-01-15 12:00:00'
ORDER BY created_at DESC
LIMIT 10;

-- ✅ Giải pháp 2: dùng phạm vi khóa chính
SELECT * FROM orders
WHERE order_id > 1000000
ORDER BY order_id
LIMIT 10;
```
:::

**Mẫu 2: Tối ưu hóa chèn nhiều hàng**

```sql
-- ❌ Kém hiệu quả: chèn từng hàng (nhiều vòng lặp mạng)
INSERT INTO users (name, age) VALUES ('Nguyen Van A', 25);
INSERT INTO users (name, age) VALUES ('Tran Van B', 30);
INSERT INTO users (name, age) VALUES ('Le Van C', 28);

-- ✅ Hiệu quả: chèn nhiều hàng trong một SQL (chỉ một vòng lặp mạng)
INSERT INTO users (name, age) VALUES
('Nguyen Van A', 25),
('Tran Van B', 30),
('Le Van C', 28);
```

**Mẫu 3: Tránh SELECT ***

```sql
-- ❌ Kém hiệu quả: trả về tất cả cột (bao gồm các trường lớn không cần)
SELECT * FROM users WHERE user_id = 1;

-- ✅ Hiệu quả: trả về chỉ các cột cần thiết
SELECT user_id, name, email FROM users WHERE user_id = 1;
```

### 6.3 Chiến lược ứng phó các tình huống lưu lượng cao

| Tình huống | Vấn đề | Giải pháp |
|------|------|----------|
| **Dữ liệu nóng** | Một hàng dữ liệu bị đọc/ghi thường xuyên, gây tranh chấp khóa | Dùng bộ đệm (Redis) + chia tách đọc-ghi |
| **Kịch bản giây vàng** | Lưu lượng cao đột ngột làm giảm hàng tồn kho | Khóa lạc quan + nóng hàng tồn kho + hàng đợi thư giảm áp |
| **Truy vấn chậm** | Truy vấn phức tạp làm quá tải cơ sở dữ liệu | Tối ưu chỉ mục + tách truy vấn + chia tách đọc-ghi |
| **Kết nối cạn kiệt** | Quá nhiều yêu cầu đồng thời dẫn đến cạn kiệt hồ bơi kết nối | Tối ưu hóa hồ bơi kết nối + giới hạn tốc độ + hạ cấp dịch vụ |

::: tip 💡 Hiểu biết cốt lõi
Nguyên tắc cơ bản của tối ưu hóa hiệu năng:
1. **Đo lường trước, tối ưu hóa sau**: dùng `EXPLAIN` để phân tích kế hoạch truy vấn, tìm ra nút cổ chai thực sự
2. **Ưu tiên chỉ mục**: 80% vấn đề hiệu năng có thể giải quyết bằng tối ưu chỉ mục
3. **Giảm áp lực cơ sở dữ liệu**: có thể dùng bộ đệm thì dùng, có thể bất đồng bộ thì bất đồng bộ
4. **Chia để trị**: chia bảng lớn thành bảng nhỏ, chia truy vấn lớn thành truy vấn nhỏ
:::

<QueryOptimizationDemo />

---

## 7. Tóm tắt và Lộ trình học tập

Hãy dùng một bảng để ôn tập các khái niệm cốt lõi của cơ sở dữ liệu:

| Khái niệm | Một câu giải thích | Vấn đề được giải quyết | Điểm chính |
|------|-----------|-----------|--------|
| **Bảng, hàng, cột** | Cách tổ chức dữ liệu | Cách lưu trữ dữ liệu có cấu trúc | Bảng = bảng tính Excel, hàng = bản ghi, cột = trường |
| **Khóa chính** | Định danh duy nhất cho mỗi hàng | Cách tìm chính xác một hàng dữ liệu | Duy nhất, không trống, không thay đổi |
| **Khóa ngoài** | Cây cầu nối giữa các bảng | Cách liên kết dữ liệu từ các bảng khác nhau | Chỉ đến khóa chính của bảng khác |
| **SQL** | Ngôn ngữ giao tiếp với cơ sở dữ liệu | Cách thêm, xóa, sửa, xem dữ liệu | SELECT, INSERT, UPDATE, DELETE |
| **Chỉ mục** | Cấu trúc dữ liệu tăng tốc độ truy vấn | Cách tìm dữ liệu nhanh chóng | Cây B+, giảm I/O đĩa |
| **Giao dịch** | Cơ chế đảm bảo an toàn dữ liệu | Cách ngăn chặn xung đột đồng thời và mất dữ liệu | ACID: tính nguyên tử, nhất quán, cô lập, bền vững |

::: info Lời cuối cùng
Cơ sở dữ liệu là một chủ đề sâu rộng, bài viết này chỉ là phần mở đầu. Nếu bạn muốn tiếp tục học sâu, tôi gợi ý theo lộ trình sau:

**Bước tiếp theo**:
1. **Thực hành**: cài đặt MySQL hoặc PostgreSQL, tạo bảng, chèn dữ liệu, viết truy vấn SQL
2. **Khung ORM**: học cách sử dụng cơ sở dữ liệu trong code (như SQLAlchemy, Prisma, TypeORM)
3. **Tối ưu chỉ mục**: tìm hiểu sâu hơn về chỉ mục kép, chỉ mục bao quát, đẩy chỉ mục xuống, v.v.
4. **Nguyên lý giao dịch**: tìm hiểu MVCC (kiểm soát đồng thời phiên bản), cơ chế khóa, mức cô lập
5. **Cơ sở dữ liệu phân tán**: học phân shard, chia tách đọc-ghi, nhân rộng chính-tôi, v.v.

Hãy nhớ: **lý thuyết + thực hành = hiểu biết thực sự**.
:::
