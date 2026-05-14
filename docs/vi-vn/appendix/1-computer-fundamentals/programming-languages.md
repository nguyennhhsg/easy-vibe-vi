# Bản đồ ngôn ngữ lập trình

::: tip Lời mở đầu
Tại sao lại có rất nhiều ngôn ngữ lập trình? Nên học cái nào? Chương này sẽ đưa bạn từ "sự tiến hóa của ngôn ngữ" đến "mô hình lập trình" đến "cách chọn lựa", để thiết lập hiểu biết toàn diện về ngôn ngữ lập trình. **Kết luận trước: không có ngôn ngữ tốt nhất, chỉ có ngôn ngữ phù hợp nhất cho tình huống.**
:::

**Chương này sẽ dạy bạn cái gì?**

Sau khi hoàn thành chương này, bạn sẽ có được:

- **Khả năng lựa chọn hợp lý**: Khi đối mặt với "học ngôn ngữ nào", bạn có thể đưa ra quyết định dựa trên yêu cầu dự án, thay vì theo phong trào mù quang
- **Sâu sắc hiểu biết về mô hình**: Hiểu rằng "lập trình hướng đối tượng", "lập trình hàm" là những cách suy nghĩ khác nhau, chứ không chỉ là sự khác biệt về cú pháp
- **Góc nhìn tiến hóa lịch sử**: Thấy được sự tiến hóa của ngôn ngữ trong hơn 70 năm — từ viết thủ công 0 và 1 đến tạo mã từ ngôn ngữ tự nhiên
- **Nền tảng học tập tiếp theo**: Để đặt nền tảng cho việc hiểu các ý tưởng thiết kế ngôn ngữ mới, quyết định lựa chọn công nghệ

| Chương | Nội dung | Khái niệm cốt lõi |
|-----|------|---------|
| **Chương 1** | Tiến hóa ngôn ngữ | Từ ngôn ngữ máy đến ngôn ngữ cấp cao |
| **Chương 2** | Mô hình lập trình | Mệnh lệnh, hướng đối tượng, hàm số |
| **Chương 3** | Lựa chọn ngôn ngữ | Phương pháp lựa chọn dựa trên tình huống |

---

## 0. Con người nói chuyện với máy tính như thế nào?

Hãy tưởng tượng bạn cần giao tiếp với một robot chỉ hiểu nhị phân:

- **Gõ 0 và 1 trực tiếp** — Nguyên thủy nhất, hiệu quả cực kỳ thấp, viết 0 thành 1 thì toàn bộ sai (ngôn ngữ máy)
- **Sử dụng ký hiệu ghi nhớ thay thế** — `MOV AX, 1` dễ hiểu hơn nhiều so với `10110000 00000001` (ngôn ngữ lắp ráp)
- **Sử dụng gần giống ngôn ngữ tự nhiên** — `int sum = 1 + 2;` con người có thể đọc trực tiếp (ngôn ngữ cấp cao)

**Ngôn ngữ lập trình là cây cầu nối con người với máy tính**, và đã tiến hóa theo hướng "gần hơn với cách suy nghĩ của con người" trong hơn 70 năm.

---

## 1. Tiến hóa của ngôn ngữ lập trình

👇 Hãy thử nhấp chuột: Khám phá quá trình tiến hóa của ngôn ngữ lập trình từ những năm 1940 đến ngày hôm nay

<LanguageMapDemo />

::: tip 💡 Tóm tắt một câu
Xu hướng tiến hóa của ngôn ngữ lập trình: **ngày càng gần hơn với cách suy nghĩ của con người, ngày càng an toàn hơn, ngày càng hiệu quả hơn**. Từ viết thủ công 0/1, đến ký hiệu ghi nhớ lắp ráp, đến lập trình cấu trúc của C, đến lập trình hướng đối tượng của Java, rồi đến an toàn bộ nhớ của Rust — mỗi thế hệ ngôn ngữ đều giải quyết những điểm yếu của thế hệ trước.
:::

---

## 2. Mô hình lập trình: Cách suy nghĩ về các vấn đề

Mô hình lập trình không phải là tính năng của ngôn ngữ, mà là cách suy nghĩ — giống như viết lách có các thể loại khác nhau như thơ, tiểu thuyết, luận văn.

### 2.1 Mệnh lệnh — "Nói cho máy tính từng bước làm cách nào"

```c
int sum = 0;
for (int i = 0; i < n; i++) {
    sum += arr[i];
}
```

### 2.2 Hướng đối tượng — "Đóng gói dữ liệu và hành vi thành các đối tượng"

```python
class Dog:
    def __init__(self, name):
        self.name = name
    def bark(self):
        print(f"{self.name} says woof!")
```

### 2.3 Hàm số — "Kết hợp các hàm thuần túy, không sửa đổi trạng thái"

```haskell
sum = foldl (+) 0
-- đầu vào giống nhau luôn tạo ra đầu ra giống nhau
```

### 2.4 Tuyên bố — "Chỉ nói làm cái gì, không quan tâm làm cách nào"

```sql
SELECT name FROM users WHERE active = true
-- cơ sở dữ liệu tự quyết định cách truy vấn nhanh nhất
```

::: tip 💡 Trong phát triển thực tế
Hầu hết các ngôn ngữ hiện đại là đa mô hình. Python vừa hỗ trợ lập trình hướng đối tượng, vừa hỗ trợ lập trình hàm; JavaScript cũng vậy. Không cần lo lắng "mô hình nào tốt nhất", mà chọn cách phù hợp nhất dựa trên vấn đề.
:::

---

## 3. Hệ thống kiểu: Quy tắc giao thông của dữ liệu

| | Kiểu mạnh | Kiểu yếu |
|---|---|---|
| **Tĩnh** | Java, Rust, TypeScript — An toàn nhất | C, C++ — Hiệu quả nhưng phải cẩn thận |
| **Động** | Python, Ruby — Linh hoạt và an toàn | JavaScript, PHP — Linh hoạt nhưng dễ gặp lỗi |

**Vấn đề chính**: `"1" + 1` bằng cái gì?
- **JavaScript (kiểu yếu)**: `"11"` — Im lặng giúp bạn chuyển đổi
- **Python (kiểu mạnh)**: `TypeError` — Cho bạn tự suy nghĩ rõ ràng

Muốn hiểu sâu về hệ thống kiểu? → [Giới thiệu hệ thống kiểu](/vi-vn/appendix/type-systems) | [Giới thiệu nguyên lý biên dịch](/vi-vn/appendix/compilers)

---

## 4. Biên dịch vs Diễn giải

| | Biên dịch | Diễn giải | JIT |
|---|---|---|---|
| **Quá trình** | Dịch tất cả trước, sau đó thực thi | Đọc và thực thi cùng lúc | Diễn giải trước, sau đó biên dịch các điểm nóng |
| **Tốc độ** | Nhanh nhất | Chậm hơn | Trung bình |
| **Gỡ lỗi** | Cần biên dịch và đợi | Phản hồi ngay tức thì | Tức thì + tối ưu hóa |
| **Ví dụ** | C, Rust, Go | Python, Ruby | Java, JavaScript |

---

## 5. Cách chọn ngôn ngữ lập trình?

### Chọn theo tình huống

| Tình huống | Ngôn ngữ được đề xuất | Lý do |
|---|---|---|
| **Web frontend** | JavaScript, TypeScript | Trình duyệt chỉ nhận JS |
| **Web backend** | Go, Java, Python, Node.js | Hệ sinh thái trưởng thành |
| **Phát triển di động** | Swift (iOS), Kotlin (Android) | Khuyên dùng chính thức |
| **AI / Dữ liệu** | Python | PyTorch, Pandas đều ở Python |
| **Lập trình hệ thống** | C, Rust | Điều khiển trực tiếp phần cứng |
| **Cloud-native** | Go, Rust | Docker/K8s đều được viết bằng Go |

### Gợi ý lộ trình học tập

1. **Python** — Cú pháp đơn giản nhất, cổng vào thời đại AI
2. **JavaScript** — Bắt buộc để phát triển Web, xử lý cả frontend lẫn backend
3. **TypeScript** — Thêm hệ thống kiểu cho JS, trải nghiệm kiểu tĩnh
4. **Go hoặc Rust** — Hiểu ngôn ngữ biên dịch và các khái niệm cấp thấp

---

## 6. Tóm tắt

::: tip 📚 Các điểm chính
1. **Tiến hóa ngôn ngữ**: Từ ngôn ngữ máy đến ngôn ngữ cấp cao, ngày càng gần hơn với cách suy nghĩ của con người
2. **Mô hình lập trình**: Mệnh lệnh, hướng đối tượng, hàm số, tuyên bố, mỗi cái có tình huống áp dụng phù hợp
3. **Hệ thống kiểu**: Tĩnh/động, mạnh/yếu, ảnh hưởng đến an toàn và tính linh hoạt
4. **Cách chạy**: Biên dịch nhanh, diễn giải linh hoạt, JIT cân bằng
5. **Không có giải pháp hoàn hảo**: Chọn ngôn ngữ dựa trên tình huống, chứ không phải theo đuổi "ngôn ngữ tốt nhất"
:::

**Bước tiếp theo học tập**:
- [Giới thiệu nguyên lý biên dịch](/vi-vn/appendix/compilers) - Hiểu sâu về quá trình biên dịch và tối ưu hóa mã
- [Giới thiệu hệ thống kiểu](/vi-vn/appendix/type-systems) - Hiểu sâu về hệ thống kiểu và an toàn kiểu
- [Cấu trúc dữ liệu](/vi-vn/appendix/data-structures) - Hiểu cách tổ chức dữ liệu
- [Giới thiệu tư duy thuật toán](/vi-vn/appendix/algorithm-thinking) - Học các phương pháp giải quyết vấn đề
