# Giới thiệu Tư duy Thuật toán

::: tip Lời mở đầu
**Làm thế nào để giải quyết vấn đề một cách hiệu quả?** Bạn có thể đã gặp tình huống này: cùng một bài toán, người này viết code chạy vài giây là có kết quả, người kia chạy vài phút vẫn còn đang xử lý. Sự khác biệt thường nằm ở thuật toán. Chương này sẽ giúp bạn hiểu rõ cách tư duy cốt lõi của thuật toán.
:::

**Bài viết này sẽ dạy bạn điều gì?**

Sau khi hoàn thành chương này, bạn sẽ có được:

- **Khả năng phân tích vấn đề**: Khi gặp bài toán phức tạp, bạn sẽ biết cách dùng chia để trị, đệ quy... để phân tách vấn đề, thay vì lập tức viết code
- **Khả năng đánh giá hiệu suất**: Dùng ký hiệu Big O để so sánh xem giải pháp nào hiệu quả hơn, chứ không phải đoán mò
- **Tư duy độ phức tạp**: Trước khi viết code, hãy ước tính quy mô dữ liệu và yêu cầu thời gian, sau đó chọn mức độ thuật toán phù hợp
- **Nền tảng cho học tập tiếp theo**: Chuẩn bị cho các cấu trúc dữ liệu nâng cao, hệ thống phân tán, machine learning

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|------------------|
| **Chương 1** | Tìm kiếm nhị phân | Tư duy chia để trị, O(log n) |
| **Chương 2** | Thuật toán sắp xếp | Bubble sort, quicksort, mergesort |
| **Chương 3** | Phân tích độ phức tạp | Độ phức tạp thời gian, độ phức tạp không gian |

---

## 0. Toàn cảnh: Thuật toán là gì?

Hãy tưởng tượng bạn cần tìm một từ trong một cuốn từ điển:

- **Cách một**: Bắt đầu từ trang đầu, lật từng trang một (tìm kiếm tuyến tính)
- **Cách hai**: Định vị theo chữ cái đầu tiên, rồi tìm kiếm nhị phân (tìm kiếm nhị phân)

Cả hai cách đều tìm được, nhưng hiệu suất khác nhau hoàn toàn. **Thuật toán là phương pháp giải quyết vấn đề**.

<AlgorithmDemo />

**Các chỉ số cốt lõi của thuật toán:**

| Chỉ số | Ý nghĩa | Tại sao quan trọng |
|--------|---------|------------------|
| **Độ phức tạp thời gian** | Xu hướng tăng của thời gian chạy theo quy mô dữ liệu | Dự đoán hiệu suất với dữ liệu quy mô lớn |
| **Độ phức tạp không gian** | Xu hướng tăng của tiêu thụ bộ nhớ theo quy mô dữ liệu | Đánh giá tiêu thụ bộ nhớ |
| **Tính chính xác** | Liệu có luôn cho kết quả chính xác không | Yêu cầu cơ bản của thuật toán |

::: tip 📊 Đọc kỹ bảng này
**Độ phức tạp thời gian**: Được mô tả bằng ký hiệu Big O. O(n) có nghĩa là dữ liệu tăng gấp đôi, thời gian cũng tăng gấp đôi; O(n²) có nghĩa là dữ liệu tăng gấp đôi, thời gian tăng gấp 4 lần.

**Độ phức tạp không gian**: Cũng dùng ký hiệu Big O. Một số thuật toán dùng không gian để tiết kiệm thời gian (như bảng hash), một số dùng thời gian để tiết kiệm không gian (như thuật toán nén).

**Tính chính xác**: Thuật toán phải cho kết quả chính xác với tất cả các đầu vào có thể. Các điều kiện biên (dữ liệu rỗng, dữ liệu cực lớn) dễ gây lỗi nhất.
:::

---

## 1. Tìm kiếm nhị phân: Loại bỏ một nửa mỗi lần

### 1.1 Nguyên lý tìm kiếm nhị phân

::: tip 💡 Tìm kiếm nhị phân hoạt động như thế nào?
**Điều kiện tiên quyết**: Dữ liệu phải được sắp xếp

**Quy trình**:
1. Tìm phần tử ở giữa
2. Nếu phần tử giữa bằng mục tiêu, tìm thấy!
3. Nếu mục tiêu nhỏ hơn phần tử giữa, tiếp tục ở nửa trái
4. Nếu mục tiêu lớn hơn phần tử giữa, tiếp tục ở nửa phải
5. Mỗi lần loại bỏ một nửa, cho đến khi tìm thấy hoặc xác định không tồn tại

**Độ phức tạp thời gian**: O(log n)

**Analogía trong cuộc sống**: Trò chơi đoán số. Tôi nghĩ đến một số từ 1-100, cứ mỗi lần bạn đoán số giữa, tôi bảo lớn hay nhỏ hơn. Tối đa 7 lần là đoán được (vì 2⁷ = 128 > 100).
:::

👇 **Hãy thử**:
Phần trình diễn dưới đây cho thấy cách tìm kiếm nhị phân hoạt động, bạn có thể chọn tìm kiếm tuần tự hoặc tìm kiếm nhị phân để so sánh:

<SearchAlgorithmDemo />

### 1.2 Tại sao tìm kiếm nhị phân nhanh như vậy?

| Quy mô dữ liệu | Tìm kiếm tuyến tính | Tìm kiếm nhị phân |
|---|---|---|
| 100 | 100 lần | 7 lần |
| 1.000 | 1.000 lần | 10 lần |
| 1.000.000 | 1.000.000 lần | 20 lần |
| 1.000.000.000 | 1.000.000.000 lần | 30 lần |

::: tip 📊 Đọc kỹ bảng này
**Cột thứ nhất (Quy mô dữ liệu)**: Có bao nhiêu dữ liệu cần tìm kiếm. Bạn có thể thấy quy mô dữ liệu tăng từ 100 lên 10 tỷ (tăng 100 triệu lần!)

**Cột thứ hai (Tìm kiếm tuyến tính)**: Phương pháp "ngu nhất", bắt đầu từ phần tử đầu tiên và tìm từng cái một. Số lần tìm kiếm bằng quy mô dữ liệu, dữ liệu càng lớn, số lần tìm kiếm càng nhiều.

**Cột thứ ba (Tìm kiếm nhị phân)**: Phương pháp thông minh, mỗi lần loại bỏ một nửa. Số lần tìm kiếm chỉ liên quan đến logarit của quy mô dữ liệu, ngay cả với 10 tỷ dữ liệu cũng chỉ cần 30 lần!

**Kết luận so sánh**: Khi quy mô dữ liệu đạt 1 triệu, tìm kiếm tuyến tính cần 1 triệu lần, tìm kiếm nhị phân chỉ cần 20 lần—chênh lệch lên tới 50.000 lần!
:::

::: tip 💡 Sức mạnh của tăng trưởng logarithmic
Độ phức tạp thời gian của tìm kiếm nhị phân là O(log n), điều này có nghĩa là:

- 10 tỷ dữ liệu, tối đa 30 lần tìm kiếm
- 1 tỷ tỷ dữ liệu, tối đa 40 lần tìm kiếm

Đó là sức mạnh của tăng trưởng logarithmic—dữ liệu tăng 1.000 lần, số lần tìm kiếm chỉ tăng 10 lần.
:::

---

## 2. Sắp xếp: Biến hỗn loạn thành có thứ tự

### 2.1 Các thuật toán sắp xếp phổ biến

| Thuật toán | Độ phức tạp thời gian | Đặc điểm | Trường hợp áp dụng |
|---|---|---|---|
| **Bubble sort** | O(n²) | Đơn giản nhưng chậm | Giảng dạy, dữ liệu nhỏ |
| **Selection sort** | O(n²) | Đơn giản nhưng chậm | Dữ liệu nhỏ |
| **Insertion sort** | O(n²) | Nhanh với dữ liệu gần như đã sắp xếp | Dữ liệu nhỏ, gần như đã sắp xếp |
| **Quicksort** | O(n log n) | Nhanh nhất trong thực tế | Sắp xếp chung dụng |
| **Mergesort** | O(n log n) | Sắp xếp ổn định | Các trường hợp cần tính ổn định |
| **Heapsort** | O(n log n) | Sắp xếp tại chỗ | Khi bộ nhớ hạn chế |

::: tip 📊 Đọc kỹ bảng này
**Bubble sort**: Thuật toán sắp xếp cơ bản nhất, giống như các bọt khí từ đáy nước bFloat lên trên. Đơn giản dễ hiểu, nhưng chậm nhất. Thích hợp để học tư duy sắp xếp, không thích hợp sử dụng thực tế.

**Selection sort**: Mỗi lần chọn phần tử nhỏ nhất để đặt ở phía trước. Cũng rất đơn giản, nhưng dù dữ liệu đã sắp xếp hay chưa thì vẫn phải so sánh cùng số lần.

**Insertion sort**: Giống như sắp xếp quân bài. Chèn từng phần tử vào phần đã sắp xếp ở phía trước. Rất hiệu quả với dữ liệu gần như đã sắp xếp.

**Quicksort**: Thuật toán sắp xếp phổ biến nhất trong phát triển thực tế. Trung bình nhanh nhất, nhưng trường hợp tệ nhất (dữ liệu đã sắp xếp) sẽ giảm xuống O(n²).

**Mergesort**: Sử dụng tư duy "chia để trị", luôn O(n log n), nhưng cần thêm không gian. Thích hợp khi cần sắp xếp ổn định.

**Heapsort**: Sắp xếp sử dụng cấu trúc dữ liệu heap, sắp xếp tại chỗ (không cần thêm không gian), nhưng thực tế thường chậm hơn quicksort.
:::

### 2.2 Tại sao quicksort "nhanh"?

::: tip 💡 Nguyên lý của quicksort
**Tư duy cốt lõi**: Phương pháp chia để trị

1. Chọn một phần tử "pivot"
2. Đặt các phần tử nhỏ hơn pivot bên trái, lớn hơn pivot bên phải
3. Đệ quy sắp xếp hai phần trái và phải
4. Kết hợp kết quả

**Tại sao nhanh?**
- Sau mỗi phân chia, phần tử pivot đã ở vị trí cuối cùng
- Trung bình, mỗi lần phân chia loại bỏ khoảng một nửa phần tử
- Độ phức tạp thời gian O(n log n)

**Analogía trong cuộc sống**: Sắp xếp sách trên kệ. Lấy ra một cuốn sách, đặt những cuốn mỏng hơn bên trái, dày hơn bên phải. Sau đó lặp lại quy trình này cho hai chồng sách bên trái và bên phải.
:::

👇 **Hãy thử**:
Phần trình diễn dưới đây cho thấy trực quan hóa các thuật toán sắp xếp, bạn có thể tạo mảng, quan sát so sánh giữa quá trình bubble sort và quicksort:

<SortingAlgorithmDemo />

---

## 3. Đệ quy: Hàm gọi chính nó

### 3.1 Bản chất của đệ quy

::: tip 💡 Đệ quy là gì?
**Đệ quy** là kỹ thuật lập trình mà hàm gọi chính nó.

**Hai yếu tố chính**:
1. **Trường hợp cơ bản**: Khi nào thì dừng đệ quy?
2. **Bước đệ quy**: Làm thế nào để phân tách vấn đề thành các vấn đề con nhỏ hơn?

**Ví dụ cổ điển: Giai thừa**
```js
function factorial(n) {
  if (n <= 1) return 1        // Trường hợp cơ bản
  return n * factorial(n - 1) // Bước đệ quy
}
```

**Analogía trong cuộc sống**: Búp bê lồng Nga. Mở một búp bê, bên trong là búp bê nhỏ hơn, cho đến khi đến búp bê nhỏ nhất không mở được nữa.
:::

### 3.2 Đệ quy vs Lặp lại

| Đặc điểm | Đệ quy | Lặp lại (vòng lặp) |
|---|---|---|
| **Độ gọn gàng của code** | Thường gọn gàng hơn | Có thể phức tạp hơn |
| **Tiêu thụ bộ nhớ** | Cao hơn (call stack) | Thấp hơn |
| **Hiệu suất** | Chậm hơn một chút (chi phí gọi hàm) | Nhanh hơn |
| **Trường hợp áp dụng** | Duyệt cây, thuật toán chia để trị | Các tác vụ lặp đơn giản |

::: tip 📊 Đọc kỹ bảng này
**Độ gọn gàng của code**: Đệ quy thường chỉ cần vài dòng code để biểu thị logic phức tạp (như duyệt cấu trúc cây), trong khi dùng vòng lặp có thể cần nhiều biến và lồng nhau hơn.

**Tiêu thụ bộ nhớ**: Đệ quy sử dụng "call stack" để lưu thông tin từng lớp, giống như xếp đĩa lên nhau, mỗi lần đệ quy thêm một đĩa. Vòng lặp không cần chi phí này.

**Hiệu suất**: Mỗi lần gọi hàm đều có chi phí (truyền tham số, các phép toán stack...), nên đệ quy thường chậm hơn vòng lặp một chút.

**Trường hợp áp dụng**: Đệ quy giỏi xử lý các vấn đề mà bản thân chúng đã có cấu trúc đệ quy (như cây tệp, cây DOM); vòng lặp giỏi xử lý các phép toán lặp đơn giản (như duyệt mảng).
:::

::: warning ⚠️ Cạm bẫy của đệ quy
**Stack overflow**: Chiều sâu đệ quy quá lớn, không gian call stack bị cạn.

**Cách giải quyết**:
- Chuyển sang dùng lặp
- Sử dụng tối ưu hóa đệ quy đuôi (một số ngôn ngữ hỗ trợ)
- Giới hạn chiều sâu đệ quy
:::

👇 **Hãy thử**:
Phần trình diễn dưới đây cho thấy quá trình gọi đệ quy, quan sát cách hàm tự gọi chính nó:

<RecursiveThinkingDemo />

---

## 4. Thuật toán tham lam: Chọn tối ưu mỗi bước

### 4.1 Tư duy tham lam

::: tip 💡 Thuật toán tham lam là gì?
**Thuật toán tham lam** chọn lựa chọn tốt nhất hiện tại ở mỗi bước, hy vọng cuối cùng sẽ có được giải pháp tối ưu toàn cục.

**Điều kiện áp dụng**:
1. **Tính chất lựa chọn tham lam**: Tối ưu cục bộ có thể dẫn đến tối ưu toàn cục
2. **Cấu trúc con tối ưu**: Giải pháp tối ưu của vấn đề chứa giải pháp tối ưu của các vấn đề con

**Ví dụ cổ điển: Tìm tiền**
- Mục tiêu: Dùng ít đồng tiền nhất để trả một số tiền nhất định
- Chiến lược tham lam: Mỗi lần chọn đồng tiền lớn nhất
- Kết quả: 67 đồng = 50 + 10 + 5 + 1 + 1 (5 đồng)

**Analogía trong cuộc sống**: Khi leo núi, mỗi lần chọn con đường dốc nhất để lên. Mặc dù có thể không đến được đỉnh cao nhất, nhưng thường có thể đến một vị trí khá tốt.
:::

### 4.2 Những hạn chế của tham lam

::: warning ⚠️ Tham lam không phải lúc nào cũng cho ra giải pháp tối ưu
**Ví dụ phản chứng: Tìm tiền**

Nếu các đồng tiền có mệnh giá là [1, 3, 4], cần trả 6 đồng:
- Tham lam: 4 + 1 + 1 = 3 đồng
- Tối ưu: 3 + 3 = 2 đồng

Thuật toán tham lam thất bại ở đây!

**Bài học**: Thuật toán tham lam đơn giản và hiệu quả, nhưng không phải lúc nào cũng cho ra giải pháp tối ưu. Trước khi sử dụng, hãy chứng minh vấn đề thỏa mãn các điều kiện tham lam.
:::

👇 **Hãy thử**:
Phần trình diễn dưới đây cho thấy hiệu quả thực tế của thuật toán tham lam, bạn có thể thử các tổ hợp đồng tiền khác nhau, quan sát hiệu quả của chiến lược tham lam:

<GreedyThinkingDemo />

---

## 5. Các mô hình thiết kế thuật toán

| Mô hình | Tư duy | Thuật toán điển hình | Các vấn đề áp dụng |
|---|---|---|---|
| **Chia để trị** | Phân tách vấn đề thành vấn đề con | Quicksort, mergesort | Các vấn đề có thể phân tách |
| **Tham lam** | Mỗi bước chọn tối ưu | Cây khung nhỏ nhất, mã hóa Huffman | Các vấn đề có tính chất tham lam |
| **Quy hoạch động** | Ghi lại giải pháp của các vấn đề con | Bài toán cái ba lô, đường đi ngắn nhất | Các vấn đề có vấn đề con trùng lặp |
| **Quay lui** | Thử sai, không thể tiếp tục thì quay lại | Bài toán tám hậu, hoán vị toàn bộ | Các bài toán tìm kiếm |

::: tip 📊 Đọc kỹ bảng này
**Chia để trị**: Phân tách vấn đề lớn thành vấn đề con, giải quyết riêng rồi kết hợp. Giống như sắp xếp phòng, chia thành phòng khách, phòng ngủ, bếp rồi dọn từng phòng, cuối cùng toàn bộ sạch sẽ.

**Tham lam**: Mỗi bước chọn tốt nhất hiện tại, không cân nhắc hậu quả dài hạn. Giống như ăn cơm, chọn ăn những món ưa thích trước, có thể không phải cách ăn tối ưu, nhưng nhanh.

**Quy hoạch động**: Ghi nhớ kết quả trung gian, tránh tính toán lặp lại. Giống như ghi chép, lần sau gặp cùng vấn đề thì tra đáp án, không cần suy đoán lại.

**Quay lui**: Không thể tiếp tục thì quay lại thử đường khác. Giống như đi trong mê cung, con đường này đi không được thì quay lại ngã tư trước thử con đường khác.
:::

👇 **Hãy thử**:
Phần trình diễn dưới đây cho thấy đặc điểm và trường hợp ứng dụng của các mô hình thiết kế thuật toán khác nhau:

<AlgorithmParadigmDemo />

---

## 6. Tóm tắt: Thuật toán là nghệ thuật giải quyết vấn đề

Hãy dùng các so sánh để tóm tắt các tư duy thuật toán khác nhau:

| Tư duy | So sánh | Điểm chính |
|---|---|---|
| **Tìm kiếm nhị phân** | Trò chơi đoán số | Mỗi lần loại bỏ một nửa |
| **Sắp xếp** | Sắp xếp sách trên kệ | Thiết lập trật tự |
| **Đệ quy** | Búp bê lồng Nga | Biến vấn đề lớn thành vấn đề nhỏ |
| **Tham lam** | Chọn đường leo núi | Tối ưu cục bộ |

::: tip 💡 Những hiểu biết cốt lõi
**Bản chất của thuật toán là cân bằng giữa "hiệu suất" và "tính chính xác".**

- Thuật toán tốt có thể cải thiện hiệu suất chương trình lên vài mức độ
- Nhưng tối ưu hóa quá mức có thể đưa vào sự phức tạp
- Trước tiên đảm bảo tính chính xác, rồi mới theo đuổi hiệu suất

Hiểu rõ tư duy thuật toán quan trọng hơn nhớ những thuật toán cụ thể:
- Chia để trị: Phân tách vấn đề lớn thành vấn đề con
- Tham lam: Mỗi bước chọn tối ưu
- Quy hoạch động: Ghi lại giải pháp của các vấn đề con
- Quay lui: Thử sai, không thể tiếp tục thì quay lại
:::

---

## Đọc thêm

- **Các giới thiệu về thuật toán**: Học thuật toán theo hệ thống từ sách giáo khoa cổ điển
- **LeetCode**: Cải thiện khả năng thuật toán bằng cách làm bài tập
- **Trực quan hóa thuật toán**: Hiểu rõ quá trình thực thi thuật toán một cách trực quan
- **Thuật toán cạnh tranh**: Học các kỹ thuật thuật toán nâng cao hơn
