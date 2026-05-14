# Ngôn Ngữ Dành Riêng Cho Lĩnh Vực (DSL): Những "Mã Không Giống Mã" Trong Thế Giới Backend

::: tip Lời Nói Đầu
Trong một trường hợp thực tế, kỹ sư Armin đã xây dựng một bộ dịch vụ cơ sở hạ tầng tại công ty mới bằng AI, tổng cộng khoảng 4 vạn dòng mã (Go + YAML + Pulumi + mã keo SDK), trong đó hơn 90% được tạo bởi AI. Trường hợp này chứa nhiều thuật ngữ mà người mới bắt đầu chưa quen: YAML, Pulumi, HCL, Lua, mã keo SDK……chúng không phải Python hay JavaScript, nhưng lại ở khắp nơi trong các dự án backend. Bài viết này sẽ giới thiệu những công nghệ này từ một góc nhìn thống nhất——**Ngôn Ngữ Dành Riêng Cho Lĩnh Vực (DSL)**——để giải thích một cách có hệ thống.
:::

**Mục tiêu học tập của bài viết này**

Trong phát triển backend, ngoài logic kinh doanh được viết bằng ngôn ngữ lập trình thông dụng (Python, Go, Java, v.v.), còn tồn tại một lượng lớn **các tệp và mã có mục đích khác nhau, cú pháp khác nhau, nhưng không thuộc về ngôn ngữ lập trình thông dụng**. Chúng có một khái niệm cấp cao chung: **DSL (Domain-Specific Language, Ngôn Ngữ Dành Riêng Cho Lĩnh Vực)**.

Sau khi học xong bài viết này, bạn sẽ có thể:

- Hiểu rõ sự khác biệt cốt lõi giữa DSL và ngôn ngữ lập trình thông dụng (GPL)
- Nắm vững hệ thống phân loại DSL: định dạng chuỗi hóa dữ liệu, ngôn ngữ kịch bản nhúng, ngôn ngữ định nghĩa cơ sở hạ tầng
- Phân biệt các kịch bản sử dụng của XML, JSON, YAML, TOML, CSV, Protobuf, v.v.
- Hiểu mục đích thiết kế của các ngôn ngữ kịch bản nhúng như Lua
- Giải thích nguyên lý và sự khác biệt giữa Terraform (HCL) và Pulumi
- Hiểu cách hoạt động của thông số kỹ thuật OpenAPI và tạo SDK tự động
- Xác định loại mã nào phù hợp để giao cho AI tạo

| Chương | Chủ đề | Khái Niệm Cốt Lõi |
|--------|--------|-----------------|
| **Chương 1** | Khái Quát Chung Về DSL | Định nghĩa DSL vs GPL, hệ thống phân loại và biểu đồ toàn cảnh |
| **Chương 2** | Định Dạng Chuỗi Hóa Dữ Liệu | XML, JSON, YAML, TOML, CSV, Protobuf, v.v. |
| **Chương 3** | Ngôn Ngữ Kịch Bản Nhúng | Triết lý thiết kế và ứng dụng điển hình của các ngôn ngữ như Lua |
| **Chương 4** | Cơ Sở Hạ Tầng Như Mã | Nguyên lý và so sánh của Terraform (HCL) và Pulumi |
| **Chương 5** | Mã Keo Và Tạo SDK | Thông số kỹ thuật OpenAPI và tạo mã máy khách tự động |
| **Chương 6** | AI Và Mối Quan Hệ Với DSL | Tại sao AI đặc biệt giỏi trong việc tạo mã DSL |

---

## 1. Khái Quát Chung Về DSL: Một Thế Giới Khác Ngoài Ngôn Ngữ Thông Dụng

### 1.1 DSL Là Gì?

**DSL (Domain-Specific Language, Ngôn Ngữ Dành Riêng Cho Lĩnh Vực)** là một ngôn ngữ được thiết kế cho một lĩnh vực cụ thể hoặc nhiệm vụ cụ thể. Đối lập với nó là **GPL (General-Purpose Language, Ngôn Ngữ Lập Trình Thông Dụng)**, chẳng hạn như Python, Java, Go, C++, v.v.——chúng được thiết kế để giải quyết bất kỳ vấn đề tính toán nào.

Sự khác biệt cốt lõi giữa chúng:

| Khía Cạnh | GPL (Ngôn Ngữ Lập Trình Thông Dụng) | DSL (Ngôn Ngữ Dành Riêng Cho Lĩnh Vực) |
|----------|-----------------------------------|---------------------------------------|
| **Mục Tiêu Thiết Kế** | Giải quyết bất kỳ vấn đề tính toán nào | Giải quyết vấn đề của một lĩnh vực cụ thể |
| **Phạm Vi Biểu Hiện** | Hoàn chỉnh Turing, về mặt lý thuyết có thể tính toán bất kỳ điều gì | Thường cố ý hạn chế phạm vi biểu hiện |
| **Chi Phí Học Tập** | Tương đối cao, cần hiểu toàn bộ hệ thống ngôn ngữ | Tương đối thấp, chỉ cần hiểu các khái niệm của lĩnh vực đó |
| **Đại Diện Điển Hình** | Python, Java, Go, C++, JavaScript | SQL, HTML/CSS, biểu thức chính quy, YAML, HCL |

Bạn thực tế đã sử dụng DSL rồi:

- **SQL** là DSL của lĩnh vực truy vấn cơ sở dữ liệu——bạn sử dụng `SELECT * FROM users WHERE age > 18` để truy vấn dữ liệu, thay vì viết logic duyệt bằng Python
- **HTML/CSS** là DSL của lĩnh vực cấu trúc và kiểu dáng trang web——bạn sử dụng các thẻ và thuộc tính để mô tả trang, thay vì sử dụng C++ để vận hành pixel
- **Biểu thức chính quy** là DSL của lĩnh vực so khớp mẫu văn bản——bạn sử dụng `\d{3}-\d{4}` để khớp số điện thoại, thay vì viết vòng lặp so sánh ký tự

### 1.2 Phân Loại DSL

DSL có thể được chia thành hai loại chính dựa trên "liệu có tính hoàn chỉnh Turing hay không":

**DSL Bên Ngoài (External DSL)**

Sở hữu cú pháp và bộ phân tích cú pháp độc lập, không phụ thuộc vào bất kỳ ngôn ngữ lập trình thông dụng nào. Mã do người dùng viết được xử lý bởi trình thông dịch hoặc trình biên dịch chuyên dụng.

- Loại mô tả dữ liệu thuần túy: JSON, YAML, XML, TOML, CSV, Protobuf (không chứa bất kỳ logic nào)
- Loại truy vấn/vận hành: SQL, GraphQL, biểu thức chính quy (có khả năng logic hạn chế)
- Loại lập mô hình miền: HCL (Terraform), Dockerfile, cú pháp cấu hình Nginx (mô tả khai báo trạng thái của một lĩnh vực cụ thể)

**DSL Bên Trong (Internal DSL / Embedded DSL)**

Ký sinh trong một ngôn ngữ lập trình thông dụng, tận dụng cú pháp của ngôn ngữ chủ để xây dựng các phương thức biểu hiện dành riêng cho lĩnh vực. Chính mã đó là mã ngôn ngữ chủ hợp pháp, nhưng đọc nó giống như một ngôn ngữ chuyên dụng.

- Pulumi (viết bằng TypeScript/Python/Go, nhưng API được thiết kế giống như cấu hình khai báo)
- Định tuyến trong Ruby on Rails (`get '/users', to: 'users#index'`, mã Ruby hợp pháp, nhưng đọc nó giống như cấu hình)
- Cú pháp khẳng định trong khung kiểm thử (`expect(value).toBe(42)`, JavaScript hợp pháp, nhưng đọc nó giống như ngôn ngữ tự nhiên)

### 1.3 Biểu Đồ Toàn Cảnh DSL Trong Dự Án Backend

Trong một dự án backend điển hình, bạn sẽ gặp các loại DSL sau:

```
DSL Trong Dự Án Backend
├── Định Dạng Chuỗi Hóa Dữ Liệu (mô tả cấu trúc dữ liệu)
│   ├── Định dạng văn bản: JSON, YAML, XML, TOML, CSV, INI
│   └── Định dạng nhị phân: Protobuf, MessagePack, Avro, BSON
├── Ngôn Ngữ Kịch Bản Nhúng (lớp cấu hình có thể lập trình)
│   ├── Lua (game engine, Nginx, Redis)
│   ├── GDScript (Godot engine)
│   └── Jsonnet (tạo mẫu cấu hình)
├── DSL Cơ Sở Hạ Tầng Và Vận Hành (mô tả khai báo trạng thái hệ thống)
│   ├── HCL (Terraform)
│   ├── Dockerfile / Docker Compose YAML
│   └── Cú pháp cấu hình Nginx / Apache
└── Ngôn Ngữ Mô Tả Giao Diện (mô tả hợp đồng API)
    ├── OpenAPI / Swagger
    ├── Protocol Buffers (.proto file)
    └── GraphQL Schema
```

Sau khi hiểu rõ biểu đồ toàn cảnh này, các chương tiếp theo sẽ mở rộng chi tiết cho từng nhánh.

---

## 2. Định Dạng Chuỗi Hóa Dữ Liệu: Sử Dụng Văn Bản Để Mô Tả Dữ Liệu Có Cấu Trúc

### 2.1 Chuỗi Hóa Dữ Liệu Là Gì?

**Chuỗi Hóa (Serialization)** là quá trình chuyển đổi cấu trúc dữ liệu trong bộ nhớ (đối tượng, từ điển, mảng, v.v.) thành một dạng văn bản/dòng byte có thể lưu trữ hoặc truyền tải. Ngược lại, việc khôi phục dữ liệu trong bộ nhớ từ văn bản/dòng byte được gọi là **Hủy Chuỗi Hóa (Deserialization)**.

Định dạng chuỗi hóa dữ liệu là loại DSL cơ bản nhất——chúng là DSL bên ngoài mô tả dữ liệu thuần túy, không có khả năng logic nào, chỉ chịu trách nhiệm mô tả tĩnh "giá trị là gì".

### 2.2 Tại Sao Cần Các Định Dạng Này?

Giả sử bạn phát triển một dịch vụ backend, địa chỉ cơ sở dữ liệu là `localhost:5432`. Nếu bạn mã hóa cứng địa chỉ này trong mã nguồn, nó sẽ hoạt động tốt khi phát triển cục bộ, nhưng khi triển khai đến môi trường sản xuất, địa chỉ cơ sở dữ liệu sẽ trở thành `db.prod.company.com:5432`, bạn sẽ cần phải sửa đổi mã nguồn và biên dịch lại.

Thực hành kỹ thuật phổ biến trong ngành là: **Tách các tham số có thể thay đổi từ mã, lưu trữ chúng trong tệp cấu hình riêng lẻ.** Chương trình đọc tệp cấu hình khi khởi động và quyết định hành vi dựa trên các giá trị trong đó.

Ngoài cấu hình, định dạng chuỗi hóa dữ liệu cũng được sử dụng rộng rãi cho: trao đổi dữ liệu giữa các hệ thống (yêu cầu/phản hồi API), lưu trữ dữ liệu bền vững, giao tiếp giữa các ngôn ngữ, v.v.

### 2.3 Định Dạng Văn Bản Có Thể Đọc Được Bởi Con Người

Dưới đây là các định dạng chuỗi hóa văn bản phổ biến nhất trong kỹ thuật, được giới thiệu theo thứ tự lịch sử.

**INI**

Định dạng cấu hình sớm nhất, bắt nguồn từ hệ thống Windows. Cấu trúc đơn giản, bao gồm phần (section) và cặp khóa-giá trị:

```ini
[database]
host = localhost
port = 5432

[server]
debug = true
```

Ưu điểm là có tính dễ đọc mạnh mẽ. Hạn chế là không hỗ trợ cấu trúc lồng nhau và loại mảng, không thể biểu thị cấu hình phức tạp. Hiện tại chủ yếu xuất hiện trong các hệ thống kế thừa và một số cấu hình Linux (như `php.ini`, `my.cnf`).

**CSV**

**CSV (Comma-Separated Values, Giá Trị Được Phân Tách Bằng Dấu Phẩy)** là định dạng dữ liệu bảng đơn giản nhất:

```csv
name,age,city
Alice,30,Beijing
Bob,25,Shanghai
```

Mỗi dòng là một bản ghi, các trường được phân tách bằng dấu phẩy. CSV được sử dụng rộng rãi để nhập/xuất dữ liệu, trao đổi bảng tính, đường ống phân tích dữ liệu. Hạn chế của nó là chỉ có thể biểu diễn bảng hai chiều phẳng, không hỗ trợ cấu trúc lồng nhau, và không có thông tin loại (tất cả giá trị đều là chuỗi).

**XML**

**XML (eXtensible Markup Language, Ngôn Ngữ Đánh Dấu Có Thể Mở Rộng)** ra đời năm 1998 và từng là tiêu chuẩn chính để trao đổi dữ liệu:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<config>
  <database>
    <host>localhost</host>
    <port>5432</port>
  </database>
  <server>
    <debug>true</debug>
    <allowed_origins>
      <origin>https://example.com</origin>
      <origin>https://app.example.com</origin>
    </allowed_origins>
  </server>
</config>
```

Khả năng biểu hiện của XML rất mạnh, hỗ trợ cấu trúc lồng nhau, thuộc tính, không gian tên, xác thực Schema, v.v. Nhưng cú pháp của nó lại rất dài——nhiều thẻ mở/đóng dẫn đến tỷ lệ tín hiệu/nhiễu thấp, trải nghiệm viết và đọc bằng tay kém hơn.

XML vẫn được sử dụng rộng rãi trong các lĩnh vực sau:
- Hệ sinh thái Java (Maven's `pom.xml`, cấu hình Spring, tệp bố cục Android)
- Dịch vụ Web cấp doanh nghiệp (giao thức SOAP)
- Định dạng tài liệu văn phòng (`.docx`, `.xlsx` về cơ bản là các tệp XML được nén ZIP)
- Nguồn cấp RSS/Atom, đồ họa vectơ SVG

**JSON**

**JSON (JavaScript Object Notation)** ra đời năm 2001 và nhanh chóng thay thế XML trở thành tiêu chuẩn thực tế để trao đổi dữ liệu API Web:

```json
{
  "database": {
    "host": "localhost",
    "port": 5432
  },
  "server": {
    "debug": true
  }
}
```

Ưu điểm là cấu trúc rõ ràng, gần như tất cả các ngôn ngữ lập trình đều có hỗ trợ phân tích cú pháp gốc. Nhược điểm chính là **không hỗ trợ bình luận**, và một lượng lớn các dấu ngoặc và dấu ngoặc kép dễ gây lỗi khi viết bằng tay. JSON cũng là định dạng tiêu chuẩn cho cấu hình dự án frontend (`package.json`, `tsconfig.json`).

**YAML**

**YAML (YAML Ain't Markup Language)** cũng ra đời năm 2001, là định dạng cấu hình được sử dụng rộng rãi nhất trong lĩnh vực backend và DevOps ngày nay. Docker Compose, Kubernetes, GitHub Actions cũng như nhiều công cụ khác đều sử dụng YAML:

```yaml
# Cấu hình cơ sở dữ liệu
database:
  host: localhost
  port: 5432

# Cấu hình máy chủ
server:
  debug: true
  allowed_origins:
    - https://example.com
    - https://app.example.com
```

Ưu điểm là hỗ trợ bình luận, cú pháp đơn giản, có thể biểu diễn cấu trúc lồng nhau phức tạp. Nhược điểm là **phụ thuộc vào thụt lề để biểu thị mối quan hệ cấp bậc**, lỗi thụt lề sẽ dẫn đến lỗi phân tích cú pháp, đây là vấn đề mà người mới bắt đầu thường gặp nhất.

> Bổ sung: Tên đầy đủ của YAML "YAML Ain't Markup Language" là một ký hiệu đệ quy.

**TOML**

**TOML (Tom's Obvious Minimal Language)** ra đời năm 2013, được trình quản lý gói Cargo của Rust và `pyproject.toml` của Python sử dụng:

```toml
[database]
host = "localhost"
port = 5432

[server]
debug = true
allowed_origins = [
  "https://example.com",
  "https://app.example.com"
]
```

TOML cố gắng kết hợp tính đơn giản của INI và khả năng biểu hiện của YAML, đồng thời tránh các vấn đề mà độ nhạy cảm thụt lề mang lại.

### 2.4 Định Dạng Chuỗi Hóa Nhị Phân

Các định dạng trên đều là văn bản có thể đọc được bởi con người. Trong các tình huống có yêu cầu cao hơn về hiệu suất và kích thước, còn tồn tại một loại **định dạng chuỗi hóa nhị phân**——chúng hy sinh tính dễ đọc để đổi lấy kích thước nhỏ hơn và tốc độ phân tích cú pháp nhanh hơn.

| Định Dạng | Nhà Phát Triển | Đặc Điểm | Trường Hợp Sử Dụng Điển Hình |
|----------|---|---------|--------------------------|
| **Protocol Buffers (Protobuf)** | Google | Cần tệp Schema `.proto` được định nghĩa trước, kiểu mạnh, kích thước cực nhỏ | Giao tiếp gRPC, dịch vụ Google nội bộ, vi dịch vụ hiệu suất cao |
| **MessagePack** | Cộng Đồng | Giống như phiên bản nhị phân của JSON, không cần Schema | Mã hóa nội bộ Redis, giao tiếp hiệu suất cao giữa các ngôn ngữ |
| **Avro** | Apache | Hỗ trợ tiến hóa Schema, phù hợp với các tình huống dữ liệu lớn | Chuỗi hóa dữ liệu của hệ sinh thái Hadoop / Kafka |
| **BSON** | MongoDB | Phần mở rộng nhị phân của JSON, hỗ trợ nhiều loại dữ liệu hơn | Định dạng lưu trữ nội bộ cơ sở dữ liệu MongoDB |

Lấy Protocol Buffers làm ví dụ, cần trước tiên định nghĩa Schema:

```protobuf
// user.proto
syntax = "proto3";

message User {
  string name = 1;
  int32 age = 2;
  string email = 3;
}
```

Sau đó sử dụng trình biên dịch (`protoc`) để tự động tạo mã chuỗi hóa/hủy chuỗi hóa cho các ngôn ngữ khác nhau. Mô hình "định nghĩa Schema trước, sau đó tạo mã" này giống với chiến lược tạo SDK OpenAPI sẽ được giới thiệu sau.

### 2.5 Bảng So Sánh Hoàn Chỉnh

| Định Dạng | Loại | Năm Ra Đời | Tính Dễ Đọc | Hỗ Trợ Bình Luận | Trường Hợp Sử Dụng Điển Hình |
|----------|------|---------|----------|---------|--------------------------|
| **INI** | Văn Bản | 1980s | Cao | ✅ | Cấu hình hệ thống, dự án kế thừa |
| **CSV** | Văn Bản | 1972 | Cao | ❌ | Nhập/xuất dữ liệu, trao đổi bảng tính |
| **XML** | Văn Bản | 1998 | Trung Bình | ✅ | Hệ sinh thái Java, dịch vụ Web cấp doanh nghiệp, định dạng tài liệu |
| **JSON** | Văn Bản | 2001 | Cao | ❌ | Trao đổi dữ liệu API Web, cấu hình frontend |
| **YAML** | Văn Bản | 2001 | Cao | ✅ | Docker, K8s, CI/CD, cấu hình dịch vụ backend |
| **TOML** | Văn Bản | 2013 | Cao | ✅ | Cấu hình dự án Rust / Python |
| **Protobuf** | Nhị Phân | 2008 | Không | — | gRPC, giao tiếp vi dịch vụ hiệu suất cao |
| **MessagePack** | Nhị Phân | 2008 | Không | — | Giao tiếp hiệu suất cao giữa các ngôn ngữ |
| **Avro** | Nhị Phân | 2009 | Không | — | Đường ống dữ liệu lớn Hadoop / Kafka |
| **BSON** | Nhị Phân | 2009 | Không | — | Lưu trữ nội bộ MongoDB |

**Điểm Quan Trọng**: Chức năng cốt lõi của tất cả các định dạng này là giống nhau——**chuyển đổi dữ liệu có cấu trúc thành một dạng có thể lưu trữ, có thể truyền tải**. Định dạng văn bản ưu tiên tính dễ đọc của con người và tính dễ chỉnh sửa; định dạng nhị phân ưu tiên hiệu suất phân tích cú pháp và kích thước truyền tải. Việc chọn định dạng nào tùy thuộc vào cân bằng nhu cầu của kịch bản cụ thể.

---

## 3. Ngôn Ngữ Kịch Bản Nhúng: Lớp Cấu Hình Có Thể Lập Trình

### 3.1 Định Nghĩa Khái Niệm

Python, JavaScript, Go, v.v. là ngôn ngữ lập trình thông dụng (General-Purpose Language), chúng có thể chạy độc lập và xây dựng các ứng dụng hoàn chỉnh.

Khác với điều đó, còn có một loại ngôn ngữ **được thiết kế đặc biệt để nhúng vào các chương trình máy chủ khác để chạy**, cung cấp khả năng mở rộng có thể lập trình cho chương trình máy chủ. Loại ngôn ngữ này được gọi là **Ngôn Ngữ Kịch Bản Nhúng (Embedded Scripting Language)**.

Vấn đề cốt lõi mà chúng giải quyết là: **Khi khả năng biểu hiện của tệp cấu hình tĩnh (YAML/JSON) không đủ, cần giới thiệu logic điều kiện, vòng lặp, v.v., làm cách nào để đạt được hành vi động mà không cần sửa đổi mã nguồn của chương trình máy chủ.**

### 3.2 Lua: Ngôn Ngữ Kịch Bản Nhúng Điển Hình Nhất

Lua (tiếng Bồ Đào Nha có nghĩa là "mặt trăng") là một ngôn ngữ kịch bản cực kỳ nhẹ, trình thông dịch hoàn toàn được biên dịch chỉ vài trăm KB. Mục tiêu thiết kế của nó không phải là chạy độc lập, mà là hoạt động như một lớp mở rộng có thể nhúng.

Các trường hợp ứng dụng điển hình của Lua:

- **Game Engine**: Hệ thống plugin của "World of Warcraft", kịch bản trò chơi của "Roblox" đều sử dụng Lua. Game engine được thực hiện bằng C/C++, thực hiện kết xuất cốt lõi và tính toán vật lý, trong khi logic cấp độ, đối thoại NPC, v.v. được giao cho kịch bản Lua. Bằng cách này, khi nhân viên lập kế hoạch sửa đổi nội dung trò chơi, không cần phải biên dịch lại engine.

- **Web Server**: OpenResty nhúng Lua vào bên trong Nginx, cho phép nhân viên vận hành triển khai logic kịch bản Lua để lọc yêu cầu, giới hạn tốc độ, xác thực, v.v., mà không cần phải sửa đổi mã nguồn C của Nginx.

- **Database**: Redis hỗ trợ gửi kịch bản Lua đến máy chủ để thực thi, được sử dụng để thực hiện các hoạt động hợp chất cần đảm bảo tính nguyên tử (chẳng hạn như "đọc trước rồi ghi").

Dưới đây là một ví dụ về kịch bản Lua được nhúng vào Nginx (OpenResty):

```lua
-- Chức năng: xác thực token cho đường dẫn /api/secret
local uri = ngx.var.uri
local token = ngx.req.get_headers()["Authorization"]

if uri == "/api/secret" and token ~= "Bearer my-secret-token" then
    ngx.status = 403
    ngx.say("Access denied")
    return ngx.exit(403)
end
```

### 3.3 Các Ngôn Ngữ Kịch Bản Nhúng Khác

| Ngôn Ngữ | Môi Trường Máy Chủ | Mục Đích Sử Dụng Điển Hình |
|----------|---------|--------------------------|
| **Lua** | Game engine, Nginx (OpenResty), Redis | Logic trò chơi, chính sách gateway, hoạt động cache |
| **VimScript / Lua** | Vim / Neovim editor | Phát triển plugin editor |
| **Emacs Lisp** | Emacs editor | Tùy chỉnh hành vi editor |
| **GDScript** | Godot game engine | Kịch bản logic trò chơi |
| **Jsonnet** | Hệ sinh thái Kubernetes / công cụ tạo cấu hình | Tạo mẫu để tạo ra một lượng lớn cấu hình YAML/JSON tương tự |

**Điểm Quan Trọng**: Ngôn ngữ kịch bản nhúng trong phân loại DSL thuộc về **vùng biên giới giữa DSL bên trong và DSL bên ngoài**——chúng là ngôn ngữ độc lập (có cú pháp và trình thông dịch riêng), nhưng mục tiêu thiết kế là nhúng vào chương trình máy chủ chạy, thay vì xây dựng ứng dụng độc lập. Chúng lấp đầy khoảng trống giữa "tệp cấu hình tĩnh" (DSL mô tả dữ liệu thuần túy) và "ngôn ngữ lập trình thông dụng" (GPL): khi cấu hình cần biểu hiện logic (điều kiện, vòng lặp, lệnh gọi hàm), nhúng một ngôn ngữ kịch bản nhẹ là giải pháp tiêu chuẩn trong kỹ thuật.

---

## 4. Cơ Sở Hạ Tầng Như Mã (Infrastructure as Code)

### 4.1 "Cơ Sở Hạ Tầng" Là Gì

Trong kỹ thuật backend, "Cơ Sở Hạ Tầng" (Infrastructure) đề cập đến các tài nguyên cấp dưới mà chương trình ứng dụng phụ thuộc:

- Tài nguyên tính toán: máy chủ (máy ảo hoặc container)
- Lưu trữ dữ liệu: thể hiện cơ sở dữ liệu, bộ chứa lưu trữ đối tượng
- Mạng: quy tắc tường lửa, cân bằng tải, cấu hình DNS
- Phần mềm trung gian: hàng đợi tin nhắn, cụm cache

Trong thời đại điện toán đám mây, các tài nguyên này được tạo và quản lý thông qua giao diện đồ họa của bảng điều khiển của nhà cung cấp dịch vụ đám mây (chẳng hạn như AWS, Aliyun, Tencent Cloud).

### 4.2 Hạn Chế Của Quản Lý Thủ Công

Thao tác thủ công thông qua bảng điều khiển có thể thực hiện được trong các dự án quy mô nhỏ, nhưng khi quy mô dự án phát triển, nó sẽ phơi bày các vấn đề sau:

1. **Không Thể Lặp Lại**: Các bước vận hành không được ghi lại, không thể sao chép chính xác cùng một môi trường
2. **Không Thể Kiểm Tra**: Không thể theo dõi "ai đã sửa đổi cấu hình nào vào thời điểm nào"
3. **Không Thể Hợp Tác**: Quá trình vận hành không thể được đưa vào kiểm soát phiên bản, không thể thực hiện đánh giá mã
4. **Dễ Gây Lỗi**: Vận hành thủ công trong môi trường sản xuất có nguy cơ vận hành sai lầm cao

**Cơ Sở Hạ Tầng Như Mã (Infrastructure as Code, tên viết tắt là IaC)** có ý tưởng cốt lõi là: **Sử dụng mã để khai báo các tài nguyên cơ sở hạ tầng, cung cấp cho nó khả năng kiểm soát phiên bản, thực thi tự động và triển khai có thể lặp lại.**

### 4.3 Terraform

Terraform là công cụ IaC được sử dụng rộng rãi nhất hiện nay, được phát triển bởi công ty HashiCorp. Nó sử dụng ngôn ngữ **HCL (HashiCorp Configuration Language)** chuyên dụng.

Terraform áp dụng mô hình **khai báo**: người dùng mô tả trạng thái cuối cùng mong muốn, Terraform tự động tính toán các hoạt động cần thiết để đi từ trạng thái hiện tại đến trạng thái mục tiêu.

```hcl
# Định nghĩa một máy chủ đám mây
resource "aws_instance" "my_server" {
  ami           = "ami-0c55b159cbfafe1f0"  # Hình ảnh hệ điều hành
  instance_type = "t3.micro"               # Thông số kỹ thuật thể hiện

  tags = {
    Name = "my-first-server"
  }
}

# Định nghĩa một thể hiện cơ sở dữ liệu PostgreSQL
resource "aws_db_instance" "my_database" {
  engine         = "postgres"
  instance_class = "db.t3.micro"
  username       = "admin"
  password       = "please-use-secrets-manager"
}
```

Quá trình thực thi:

```bash
terraform plan    # Xem trước các thay đổi sắp được thực thi
terraform apply   # Xác nhận và thực thi, tự động tạo tài nguyên trên nền tảng đám mây
```

### 4.4 Pulumi

Pulumi cung cấp một cách suy nghĩ khác: **Sử dụng trực tiếp ngôn ngữ lập trình thông dụng (TypeScript, Python, Go, v.v.) để định nghĩa cơ sở hạ tầng**, thay vì học cú pháp HCL chuyên dụng.

Định nghĩa máy chủ tương tự, sử dụng Pulumi + TypeScript được biểu hiện như sau:

```typescript
import * as aws from "@pulumi/aws";

const server = new aws.ec2.Instance("my-server", {
    ami: "ami-0c55b159cbfafe1f0",
    instanceType: "t3.micro",
    tags: { Name: "my-first-server" },
});

const bucket = new aws.s3.Bucket("my-bucket", {
    acl: "private",
});

export const serverIp = server.publicIp;
```

Vì sử dụng ngôn ngữ lập trình thông dụng, nhà phát triển có thể tận dụng các tính năng của vòng lặp, điều kiện, trừu tượng hóa hàm, v.v. để xử lý logic cơ sở hạ tầng phức tạp.

### 4.5 So Sánh Terraform Và Pulumi

| Khía Cạnh | Terraform | Pulumi |
|----------|-----------|--------|
| **Ngôn Ngữ** | HCL (ngôn ngữ chuyên dụng) | TypeScript / Python / Go, v.v. (ngôn ngữ lập trình thông dụng) |
| **Chi Phí Học Tập** | Cần học cú pháp HCL | Sử dụng ngôn ngữ lập trình đã nắm vững, chi phí học tập thấp hơn |
| **Hệ Sinh Thái Cộng Đồng** | Rất trưởng thành, gần như bao quát tất cả các nhà cung cấp dịch vụ đám mây | Tăng trưởng nhanh, nhưng quy mô nhỏ hơn Terraform |
| **Trường Hợp Sử Dụng Phù Hợp** | Quản lý cơ sở hạ tầng tiêu chuẩn hóa do đội ngũ vận hành dẫn đầu | Các dự án do nhà phát triển dẫn đầu, các tình huống cần logic phức tạp |
| **Mức Độ Thích Ứng Với Tạo Mã AI** | Cao (mô hình cố định) | Rất cao (về bản chất là mã ngôn ngữ lập trình thông dụng) |

**Điểm Quan Trọng**: Trong công cụ IaC, HCL là một loại DSL bên ngoài điển hình——nó có cú pháp độc lập và bộ phân tích cú pháp, được thiết kế đặc biệt để mô tả khai báo trạng thái cơ sở hạ tầng. Trong khi đó, Pulumi áp dụng chiến lược DSL bên trong——sử dụng cú pháp ngôn ngữ lập trình thông dụng để biểu hiện các khái niệm dành riêng cho lĩnh vực. Hai cách tiếp cận có mục tiêu giống nhau (chuyển quản lý cơ sở hạ tầng từ vận hành thủ công sang lập trình do mã điều khiển), con đường khác nhau (ngôn ngữ chuyên dụng vs ngôn ngữ thông dụng). Mã có thể được đưa vào kiểm soát phiên bản Git, được đánh giá bởi nhóm, thực thi tự động và quay lại.

---

## 5. Mã Keo Và Tạo SDK Tự Động

### 5.1 Mã Keo Là Gì

Trong kỹ thuật phần mềm, **Mã Keo (Glue Code)** đề cập đến mã không chứa logic kinh doanh, chỉ được sử dụng để kết nối hai hệ thống hoặc mô-đun.

Mã keo điển hình bao gồm:

- Mã yêu cầu HTTP khi frontend gọi API backend (nối URL, thiết lập header yêu cầu, phân tích phản hồi)
- Mã máy khách HTTP khi dịch vụ A gọi giao diện dịch vụ B
- Mã thích ứng giao diện giữa các ngôn ngữ lập trình khác nhau

Đặc điểm của loại mã này là: **Lặp lại cao, mô hình cố định, nhưng không thể bỏ qua.**

### 5.2 Quy Chuẩn OpenAPI Và Tạo Mã Tự Động

Vì mã keo có đặc điểm cực kỳ mô hình hóa, giải pháp của ngành kỹ thuật là: **Trước tiên sử dụng định dạng tiêu chuẩn để mô tả giao diện API, sau đó sử dụng công cụ để tự động tạo mã máy khách.**

**Quy Chuẩn OpenAPI** (có tên trước đó là Swagger) là tiêu chuẩn ngành để mô tả REST API. Nó sử dụng định dạng YAML hoặc JSON, xác định chính xác đường dẫn, tham số, phần thân yêu cầu và cấu trúc phản hồi của API:

```yaml
openapi: 3.0.0
info:
  title: API Dịch Vụ Email
  version: 1.0.0

paths:
  /emails:
    post:
      summary: Gửi Email
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                to:
                  type: string
                  example: "user@example.com"
                subject:
                  type: string
                body:
                  type: string
      responses:
        '200':
          description: Gửi Thành Công
```

Dựa trên tệp quy chuẩn này, sử dụng công cụ như `openapi-generator` có thể tự động tạo SDK máy khách cho nhiều ngôn ngữ:

- **Python**: `client.emails.send(to="user@example.com", subject="Hi", body="Hello")`
- **TypeScript**: `client.emails.send({ to: "user@example.com", subject: "Hi", body: "Hello" })`
- **Go**: `client.Emails.Send(ctx, &SendEmailRequest{To: "user@example.com", ...})`

SDK được tạo ra đóng gói tất cả các chi tiết của yêu cầu HTTP, bên gọi không cần quan tâm đến đường dẫn URL, phương thức yêu cầu, định dạng chuỗi hóa, v.v.

### 5.3 Hiểu Lại Trường Hợp Của Armin

Quay lại trường hợp ở đầu bài viết, bây giờ có thể hiểu chính xác mỗi phần cấu thành:

| Phần Cấu Thành | Tính Chất | Giải Thích |
|---|---|---|
| **Go** | Mã Logic Kinh Doanh | Thực hiện chức năng cốt lõi của dịch vụ gửi/nhận email |
| **YAML** | Tệp Cấu Hình | Cấu hình dịch vụ, định nghĩa đường dẫn CI/CD, tệp quy chuẩn OpenAPI |
| **Pulumi** | Mã Cơ Sở Hạ Tầng | Định nghĩa tài nguyên đám mây bằng Go/TypeScript (máy chủ, cơ sở dữ liệu, mạng) |
| **Mã Keo SDK** | Thư Viện Máy Khách Được Tạo Tự Động | SDK Python và TypeScript được tạo tự động từ quy chuẩn OpenAPI |

Trong đó, cấu hình YAML, định nghĩa tài nguyên Pulumi, mã keo SDK——ba loại này đều là mã có mô hình hóa cao, có ràng buộc quy chuẩn rõ ràng, đây chính là lĩnh vực mà khả năng tạo mã AI mạnh nhất. Do đó, "90% của 4 vạn dòng mã được AI tạo" là hợp lý.

---

## 6. AI Và Mối Quan Hệ Với DSL

### 6.1 Phân Tích Tính Thích Ứng Của Tạo Mã AI

| Khía Cạnh Đặc Điểm | Phù Hợp Với Tạo AI | Không Phù Hợp Với Tạo AI |
|---|---|---|
| **Mức Độ Mô Hình Hóa** | Lặp lại cao, tồn tại mẫu cố định | Cần thiết kế sáng tạo, không có tiền lệ |
| **Ràng Buộc Quy Chuẩn** | Có quy chuẩn rõ ràng hoặc quy chuẩn cú pháp | Yêu cầu không rõ ràng, biên giới không rõ |
| **Phụ Thuộc Bối Cảnh** | Tự sáng suốt cục bộ, định nghĩa đơn không phụ thuộc vào sự hiểu biết toàn cầu | Cần hiểu rõ ý định kiến trúc của toàn bộ hệ thống |
| **Tính Có Thể Xác Minh** | Có thể được công cụ tự động xác minh (như `terraform validate`) | Chỉ có thể dựa vào phán đoán của con người để xác minh thiết kế hợp lý |

Bốn loại công nghệ được giới thiệu trong bài viết này——tệp cấu hình, kịch bản nhúng, mã IaC, mã keo SDK——đều sở hữu các đặc điểm ở cột trái. Điều này giải thích tại sao hiệu quả tạo mã AI trong các lĩnh vực này lại vượt trội hơn so với mã logic kinh doanh.

### 6.2 Khung Đánh Giá

Khi xác định xem một mã nhất định có phù hợp để giao cho AI tạo hay không, bạn có thể tham khảo ba tiêu chí sau:

1. **Có tồn tại quy chuẩn hoặc schema có sẵn không?** —— Có thì thân thiện với AI
2. **Nó có thuộc về mô hình lặp lại hàng loạt không?** —— Có thì thân thiện với AI
3. **Kết quả tạo ra có thể được công cụ xác minh tự động không?** —— Có thì thân thiện với AI

Mã đáp ứng cả ba tiêu chí (chẳng hạn như tạo SDK từ quy chuẩn OpenAPI, xác định nhiều tài nguyên đẳng cấu bằng Terraform), có thể dựa vào AI tạo mã ở mức độ cao. Mã đáp ứng cả ba tiêu chí không (chẳng hạn như thiết kế một giao thức đồng thuận phân tán mới), vẫn cần kỹ sư tự hoàn thành.

---

## 7. Bảng Thuật Ngữ

| Thuật Ngữ | Tên Đầy Đủ / Tiếng Việt | Định Nghĩa |
|---|---|---|
| **DSL** | Domain-Specific Language / Ngôn Ngữ Dành Riêng Cho Lĩnh Vực | Ngôn ngữ được thiết kế cho một lĩnh vực cụ thể, đối lập với ngôn ngữ lập trình thông dụng |
| **GPL** | General-Purpose Language / Ngôn Ngữ Lập Trình Thông Dụng | Ngôn ngữ lập trình có thể giải quyết bất kỳ vấn đề tính toán nào, chẳng hạn như Python, Java, Go |
| **DSL Bên Ngoài** | External DSL | Ngôn ngữ dành riêng cho lĩnh vực có cú pháp độc lập và bộ phân tích cú pháp, chẳng hạn như SQL, HCL, YAML |
| **DSL Bên Trong** | Internal DSL / Embedded DSL | Biểu hiện dành riêng cho lĩnh vực ký sinh vào ngôn ngữ lập trình thông dụng, tận dụng cú pháp của máy chủ, chẳng hạn như Pulumi |
| **Chuỗi Hóa Dữ Liệu** | Data Serialization | Quá trình chuyển đổi cấu trúc dữ liệu trong bộ nhớ thành một định dạng có thể lưu trữ hoặc truyền tải |
| **INI** | Initialization | Định dạng cấu hình cặp khóa-giá trị sớm nhất, bắt nguồn từ hệ thống Windows |
| **CSV** | Comma-Separated Values / Giá Trị Được Phân Tách Bằng Dấu Phẩy | Định dạng bảng văn bản thuần túy, các trường được phân tách bằng dấu phẩy |
| **XML** | eXtensible Markup Language / Ngôn Ngữ Đánh Dấu Có Thể Mở Rộng | Định dạng dữ liệu văn bản dựa trên thẻ, khả năng biểu hiện mạnh nhưng cú pháp dài |
| **JSON** | JavaScript Object Notation | Định dạng trao đổi dữ liệu nhẹ dựa trên cặp khóa-giá trị, tiêu chuẩn thực tế của API Web |
| **YAML** | YAML Ain't Markup Language | Định dạng tệp cấu hình dựa trên thụt lề, được sử dụng rộng rãi trong lĩnh vực backend và DevOps |
| **TOML** | Tom's Obvious Minimal Language | Định dạng cấu hình cú pháp rõ ràng, thường được sử dụng trong hệ sinh thái Rust và Python |
| **Protobuf** | Protocol Buffers | Định dạng chuỗi hóa nhị phân được phát triển bởi Google, cần xác định Schema trước, kích thước nhỏ, tốc độ nhanh |
| **MessagePack** | — | Định dạng chuỗi hóa nhị phân tương tự JSON, không cần Schema |
| **Lua** | — | Ngôn ngữ kịch bản nhẹ được nhúng, thường được sử dụng trong game engine, Web server và tiện ích mở rộng cơ sở dữ liệu |
| **IaC** | Infrastructure as Code / Cơ Sở Hạ Tầng Như Mã | Thực hành kỹ thuật sử dụng mã để định nghĩa và quản lý tài nguyên điện toán đám mây |
| **Terraform** | — | Công cụ IaC được HashiCorp phát triển, sử dụng ngôn ngữ khai báo HCL |
| **HCL** | HashiCorp Configuration Language | Ngôn ngữ cấu hình chuyên dụng được Terraform sử dụng |
| **Pulumi** | — | Công cụ IaC hỗ trợ ngôn ngữ lập trình thông dụng |
| **OpenAPI** | — | Quy chuẩn ngành để mô tả giao diện REST API (có tên trước đó là Swagger) |
| **SDK** | Software Development Kit / Bộ Công Cụ Phát Triển Phần Mềm | Thư viện máy khách đã đóng gói các chi tiết gọi API |
| **Mã Keo** | Glue Code | Mã thích ứng không chứa logic kinh doanh, chỉ được sử dụng để kết nối hai hệ thống |

---

## Tóm Tắt

Các dự án backend chứa một lượng lớn mã không phải logic kinh doanh. Chúng có một khái niệm cấp cao chung: **DSL (Ngôn Ngữ Dành Riêng Cho Lĩnh Vực)**——ngôn ngữ được thiết kế cho một lĩnh vực cụ thể, đối lập với ngôn ngữ lập trình thông dụng.

DSL được giới thiệu trong bài viết này có thể được phân thành bốn loại:

1. **Định Dạng Chuỗi Hóa Dữ Liệu** (XML / JSON / YAML / TOML / CSV / Protobuf, v.v.)——DSL bên ngoài mô tả dữ liệu thuần túy, chuyển đổi dữ liệu có cấu trúc thành một dạng có thể lưu trữ, có thể truyền tải
2. **Ngôn Ngữ Kịch Bản Nhúng** (Lua, v.v.)——nằm giữa cấu hình và ngôn ngữ thông dụng, cung cấp khả năng mở rộng có thể lập trình cho chương trình máy chủ
3. **Ngôn Ngữ Định Nghĩa Cơ Sở Hạ Tầng** (HCL / Dockerfile, v.v.)——DSL bên ngoài khai báo, mô tả trạng thái mong muốn của hệ thống; Pulumi thực hiện cùng một mục tiêu theo cách DSL bên trong
4. **Ngôn Ngữ Mô Tả Giao Diện Và Tạo Mã Keo** (OpenAPI / .proto)——thông qua quy chuẩn mô tả để tự động tạo mã kết nối giữa các hệ thống

Sau khi hiểu khung phân loại DSL, khi đối mặt với các loại "mã không giống mã" trong dự án backend, bạn có thể nhanh chóng xác định bản chất của nó: nó thuộc DSL loại nào, giải quyết vấn đề gì của lĩnh vực, tại sao không dùng ngôn ngữ lập trình thông dụng để viết.

Đồng thời, vì mã DSL có đặc điểm mô hình hóa cao, được điều khiển bởi quy chuẩn, có thể xác minh tự động, nó cũng là lĩnh vực mà công nghệ tạo mã AI hiện tại hiệu quả nhất.
