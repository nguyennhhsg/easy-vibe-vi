# Toàn Cảnh Mô Hình Dữ Liệu (Tài Liệu / Đồ Thị / Chuỗi Thời Gian / Vectơ)

::: tip 🎯 Câu Hỏi Cốt Lõi
**Tại sao không thể đưa tất cả dữ liệu vào bảng MySQL?** Khi dữ liệu của bạn là mạng lưới mối quan hệ xã hội, lưu lượng cảm biến hàng triệu dòng mỗi giây, hoặc những vectơ ngữ nghĩa mà AI cần hiểu, thì bảng quan hệ sẽ không đủ sức. Các hình thái dữ liệu khác nhau cần các cách mô hình hóa khác nhau.
:::

---

## 1. Ngoài Mô Hình Quan Hệ: Tại Sao Cần Các Mô Hình Dữ Liệu Khác?

Cơ sở dữ liệu quan hệ (MySQL, PostgreSQL) tổ chức dữ liệu bằng "bảng + hàng + cột", phù hợp với dữ liệu kinh doanh có cấu trúc cố định và mối quan hệ rõ ràng. Nhưng dữ liệu trong thế giới thực có nhiều hình thái hơn:

| Hình Thái Dữ Liệu | Điểm Yếu Của Mô Hình Quan Hệ | Mô Hình Phù Hợp Hơn |
|----------|-------------|-------------|
| Hồ Sơ Người Dùng (các trường không cố định, cấu trúc lồng nhau) | Thường xuyên ALTER TABLE, nhiều cột NULL | **Mô Hình Tài Liệu** |
| Mạng Xã Hội (bạn của bạn của bạn) | Hiệu suất JOIN nhiều tầng giảm theo cấp số nhân | **Mô Hình Đồ Thị** |
| Chỉ Số Giám Sát (hàng triệu ghi mỗi giây) | Tắc nghẽn ghi, dữ liệu lịch sử phình ra | **Mô Hình Chuỗi Thời Gian** |
| Tìm Kiếm Ngữ Nghĩa AI ("nội dung có ý nghĩa tương tự") | Không thể biểu thị độ tương tự ngữ nghĩa | **Mô Hình Vectơ** |

::: info 💡 Quan Điểm Cốt Lõi
Không phải "thay thế" mô hình quan hệ, mà là "bổ sung". Hầu hết các hệ thống vẫn chạy nghiệp vụ cốt lõi trên MySQL/PostgreSQL, nhưng giới thiệu mô hình dữ liệu chuyên dụng trong những tình huống cụ thể có thể đạt được sự cải thiện hiệu suất theo độ lớn.
:::

---

## 2. Mô Hình Tài Liệu (Document)

### 2.1 Mô Hình Tài Liệu Là Gì?

Mô hình tài liệu lưu trữ dữ liệu dưới dạng **tài liệu JSON/BSON**, mỗi bản ghi là một tài liệu độc lập, có thể có cấu trúc trường khác nhau.

```json
{
  "_id": "user_1001",
  "name": "张三",
  "tags": ["VIP", "活跃"],
  "address": { "city": "北京", "district": "朝阳区" },
  "orders": [
    { "id": "o1", "amount": 299 },
    { "id": "o2", "amount": 599 }
  ]
}
```

**Đặc Điểm Chính:**
- **Không có ràng buộc Schema**: Không cần xác định cấu trúc bảng trước, các trường có thể thêm hoặc xóa bất cứ lúc nào
- **Cấu Trúc Lồng Nhau**: Địa chỉ, đơn hàng được nhúng trực tiếp trong tài liệu, đọc tất cả dữ liệu trong một lần
- **Mở Rộng Ngang**: Tự nhiên phù hợp với phân chia (Sharding), dễ dàng xử lý dữ liệu khổng lồ

### 2.2 Tài Liệu vs Quan Hệ

| Khía Cạnh So Sánh | Quan Hệ (MySQL) | Tài Liệu (MongoDB) |
|----------|----------------|------------------|
| Cấu Trúc Dữ Liệu | Schema Cố Định, sửa bằng ALTER TABLE | Schema Linh Hoạt, thêm trường bất cứ lúc nào |
| Dữ Liệu Lồng Nhau | Cần JOIN nhiều bảng | Lồng Nhau Trực Tiếp Trong Tài Liệu |
| Liên Kết Giữa Các Bản Ghi | JOIN Rất Mạnh | Truy Vấn Liên Kết Yếu Hơn |
| Trường Hợp Phù Hợp | Dữ Liệu Kinh Doanh Có Cấu Trúc Ổn Định | Dữ Liệu Nội Dung Có Cấu Trúc Thay Đổi |

### 2.3 Các Trường Hợp Điển Hình

- **Quản Lý Nội Dung CMS**: Các bài viết, bình luận, cấu trúc thẻ khác nhau
- **Hồ Sơ Người Dùng**: Người dùng khác nhau có các trường thuộc tính khác nhau
- **Danh Mục Sản Phẩm**: Điện thoại có "kích thước màn hình", thực phẩm có "thời hạn sử dụng", các trường hoàn toàn khác nhau
- **Trung Tâm Cấu Hình**: Cấu trúc cấu hình của các dịch vụ không thống nhất

::: warning ⚠️ Những Hiểu Lầm Phổ Biến
"MongoDB không cần thiết kế cấu trúc dữ liệu" —— Sai! Mô hình tài liệu cũng cần thiết kế cẩn thận: các cấp độ lồng nhau không nên quá sâu, các tài liệu con được cập nhật thường xuyên nên tách thành các bộ sưu tập độc lập.
:::

---

## 3. Mô Hình Đồ Thị (Graph)

### 3.1 Mô Hình Đồ Thị Là Gì?

Mô hình đồ thị sử dụng **nút (Node)** và **cạnh (Edge)** để biểu thị các thực thể và mối quan hệ của chúng. Mỗi nút là một thực thể, mỗi cạnh là một mối quan hệ, các nút và cạnh đều có thể mang theo các thuộc tính.

```
(张三) --[关注]--> (李四) --[关注]--> (王五)
   |                                    |
   +--------[购买]----> (iPhone) <--[购买]--+
```

### 3.2 Khả Năng Giết Người của Mô Hình Đồ Thị: Truy Vấn Nhiều Bước

**Trường Hợp**: Tìm "bạn của bạn của bạn" trong mạng xã hội

Cách Làm Quan Hệ (3 lần JOIN):
```sql
SELECT DISTINCT f3.name
FROM friends f1
JOIN friends f2 ON f1.friend_id = f2.user_id
JOIN friends f3 ON f2.friend_id = f3.user_id
WHERE f1.user_id = 1001;
```

Cách Làm Cơ Sở Dữ Liệu Đồ Thị (Ngôn Ngữ Truy Vấn Cypher):
```cypher
MATCH (me)-[:FOLLOWS*1..3]->(target)
WHERE me.name = '张三'
RETURN DISTINCT target.name
```

Với mỗi bước bổ sung trong quan hệ, có thêm một lần JOIN, hiệu suất giảm theo cấp số nhân. Cơ sở dữ liệu đồ thị duyệt các mối quan hệ trực tiếp thông qua con trỏ, hiệu suất truy vấn nhiều bước gần như không thay đổi.

### 3.3 Các Trường Hợp Điển Hình

- **Mạng Xã Hội**: Đề xuất bạn bè, theo dõi chung, truyền bá ảnh hưởng
- **Đồ Thị Kiến Thức**: Suy luận mối quan hệ thực thể ("ai là học sinh của giáo viên của ai")
- **Phát Hiện Gian Lận**: Phát hiện vòng luồng tiền, mạng lưới tài khoản liên kết
- **Hệ Thống Đề Xuất**: Đề xuất dựa trên đồ thị quan hệ người dùng-sản phẩm-thẻ

---

## 4. Mô Hình Chuỗi Thời Gian (Time-Series)

### 4.1 Mô Hình Chuỗi Thời Gian Là Gì?

Mô hình chuỗi thời gian sử dụng **dấu thời gian** làm trục chính, được tối ưu hóa đặc biệt cho các tình huống "ghi theo thứ tự thời gian, truy vấn theo phạm vi thời gian".

```
timestamp            device      cpu_usage   memory
2024-01-15 10:00:01  server-01   45%         12.3GB
2024-01-15 10:00:02  server-01   67%         12.5GB
2024-01-15 10:00:03  server-01   92%         14.1GB
```

### 4.2 Tại Sao Không Sử Dụng MySQL Để Lưu Trữ Dữ Liệu Chuỗi Thời Gian?

| Vấn Đề | MySQL | Cơ Sở Dữ Liệu Chuỗi Thời Gian (InfluxDB) |
|------|-------|----------------------|
| Tốc Độ Ghi | Hàng vạn/giây | **Hàng triệu/giây** |
| Dữ Liệu Lịch Sử | Làm sạch thủ công, bảng ngày càng lớn | **Chính Sách Hết Hạn Tự Động** (TTL) |
| Truy Vấn Tập Hợp | GROUP BY Chậm | **Giảm Mẫu Tích Hợp** (5 giây → giá trị trung bình 1 phút) |
| Hiệu Quả Lưu Trữ | Lưu Trữ Chung, lãng phí không gian | **Nén Theo Cột**, tiết kiệm 90% không gian |

### 4.3 Các Trường Hợp Điển Hình

- **Giám Sát Máy Chủ**: CPU, bộ nhớ, đĩa được thu thập mỗi giây
- **Cảm Biến IoT**: Nhiệt độ, độ ẩm, quỹ đạo GPS
- **Dữ Liệu Tài Chính**: Giá cổ phiếu, dữ liệu mức độ giây của khối lượng giao dịch
- **Phân Tích Nhật Ký**: Tập hợp dòng thời gian của nhật ký ứng dụng

---

## 5. Mô Hình Vectơ (Vector)

### 5.1 Mô Hình Vectơ Là Gì?

Mô hình vectơ chuyển đổi dữ liệu không có cấu trúc như văn bản, hình ảnh, âm thanh thông qua **mô hình Embedding** thành vectơ số chiều cao, sau đó đo độ tương tự ngữ nghĩa bằng cách tính khoảng cách giữa các vectơ.

```
"好吃的日料" → Embedding → [0.82, 0.15, 0.91, 0.33, ...]
                                    ↓ 余弦相似度
"银座寿司之神"  → [0.80, 0.18, 0.89, ...] → 96% 相似
"意大利披萨"    → [0.12, 0.85, 0.20, ...] → 31% 相似
```

### 5.2 Tìm Kiếm Vectơ vs Tìm Kiếm Từ Khóa

| So Sánh | Tìm Kiếm Từ Khóa (LIKE / Chỉ Mục Toàn Văn Bản) | Tìm Kiếm Vectơ |
|------|---------------------------|---------|
| Phương Pháp Tìm Kiếm | Khớp Chuỗi Chính Xác | Khớp Độ Tương Tự Ngữ Nghĩa |
| "Ẩm thực Nhật Bản ngon" | Chỉ có thể khớp với văn bản chứa "ẩm thực Nhật Bản" | Có thể tìm thấy "sushi" "sashimi" "izakaya" |
| Đa Ngôn Ngữ | Cần xử lý riêng biệt | Hiểu ngữ nghĩa qua ngôn ngữ |
| Đa Phương Thức | Chỉ Văn Bản | Lấy Lại Văn Bản, Hình Ảnh, Âm Thanh Thống Nhất |

### 5.3 Các Trường Hợp Điển Hình

- **RAG (Tạo Ra Tăng Cường Bằng Truy Xuất)**: Cung cấp các đoạn kiến thức liên quan cho LLM
- **Tìm Kiếm Ngữ Nghĩa**: Hiểu ý định của người dùng chứ không phải từ khóa
- **Tìm Kiếm Hình Ảnh Bằng Hình Ảnh**: Tải lên một hình ảnh, tìm thấy các hình ảnh tương tự về mặt hình ảnh
- **Hệ Thống Đề Xuất**: Đề xuất tương tự dựa trên ngữ nghĩa nội dung

::: tip 💡 Lựa Chọn Cơ Sở Dữ Liệu Vectơ
- **Cơ Sở Dữ Liệu Vectơ Độc Lập**: Pinecone, Milvus, Weaviate —— Tập trung vào truy xuất vectơ, hiệu suất tối ưu
- **Tiện Ích Mở Rộng Cơ Sở Dữ Liệu Truyền Thống**: pgvector (PostgreSQL), Atlas Vector Search (MongoDB) —— Giảm độ phức tạp của kiến trúc
- **Thư Viện Vectơ Trong Bộ Nhớ**: FAISS, Annoy —— Phù hợp với các tình huống quy mô nhỏ, độ trễ thấp
:::

---

## 6. Quyết Định Lựa Chọn: Cách Chọn Mô Hình Dữ Liệu?

| Dữ Liệu Của Bạn Trông Như Thế Nào? | Mô Hình Được Đề Xuất | Sản Phẩm Đại Diện |
|-------------------|---------|---------|
| Cấu Trúc Cố Định, Mối Quan Hệ Rõ Ràng (Đơn Hàng, Người Dùng) | Quan Hệ | MySQL, PostgreSQL |
| Cấu Trúc Linh Hoạt, Nhiều Cấp Độ Lồng Nhau (Nội Dung, Cấu Hình) | Tài Liệu | MongoDB, DynamoDB |
| Các Mối Quan Hệ Giữa Các Thực Thể Phức Tạp, Cần Duyệt Nhiều Bước | Đồ Thị | Neo4j, Amazon Neptune |
| Ghi Theo Thứ Tự Thời Gian, Truy Vấn Theo Phạm Vi Thời Gian | Chuỗi Thời Gian | InfluxDB, TimescaleDB |
| Dữ Liệu Không Có Cấu Trúc, Cần Tìm Kiếm Độ Tương Tự Ngữ Nghĩa | Vectơ | Pinecone, Milvus, pgvector |

::: info 🎯 Lời Khuyên Thực Chiến
Các hệ thống hiện đại thường **kết hợp nhiều mô hình**:
- **Nghiệp vụ cốt lõi** dùng PostgreSQL (Quan Hệ)
- **Nhật ký hành vi người dùng** dùng InfluxDB (Chuỗi Thời Gian)
- **Thư viện kiến thức AI** dùng Milvus + pgvector (Vectơ)
- **Công cụ đề xuất** dùng Neo4j (Đồ Thị)

Không nên theo đuổi "một cơ sở dữ liệu giải quyết tất cả vấn đề", mà hãy để mỗi loại dữ liệu tìm được ngôi nhà phù hợp nhất.
:::

<DataModelsDemo />
