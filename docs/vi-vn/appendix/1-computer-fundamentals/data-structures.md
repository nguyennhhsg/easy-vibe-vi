# Cấu trúc dữ liệu

::: tip Lời mở đầu
**Chương trình = Cấu trúc dữ liệu + Thuật toán.** Trước đó, chúng ta đã học cách CPU thực thi lệnh, cách hệ điều hành quản lý tài nguyên. Nhưng lõi của chương trình là xử lý **dữ liệu**——thông tin người dùng, danh sách sản phẩm, mối quan hệ xã hội... Cách những dữ liệu này được tổ chức trong bộ nhớ trực tiếp quyết định tốc độ của chương trình. Bạn có thể đã gặp phải những thắc mắc như vậy: tại sao một số chương trình xử lý hàng chục nghìn dữ liệu rất nhanh, nhưng có những cái xử lý vài trăm dữ liệu lại bị lag? Câu trả lời thường nằm ở **lựa chọn cấu trúc dữ liệu**.
:::

**Bạn sẽ học gì từ chương này?**

Sau khi hoàn thành chương này, bạn sẽ có được:

- **Khả năng phán đoán trực quan**: Khi nhìn thấy một yêu cầu, bạn sẽ tự động nghĩ đến cấu trúc dữ liệu nào nên dùng
- **Góc nhìn phân tích hiệu suất**: Có thể đánh giá liệu nút thắt về hiệu suất là do chọn sai cấu trúc dữ liệu hay là thuật toán chậm
- **Tư duy cân bằng**: Hiểu về "đổi không gian lấy thời gian" và "đổi thời gian lấy không gian", biết rằng không có cấu trúc dữ liệu hoàn hảo
- **Khả năng đọc code**: Khi nhìn thấy HashMap, Stack, Queue không còn lạ lẫm
- **Nền tảng cho học tiếp**: Chuẩn bị tốt cho việc học về chỉ mục cơ sở dữ liệu, hệ thống cache, search engine, v.v.

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|------------------|
| **Chương 1** | Toàn cảnh | Bốn loại cấu trúc dữ liệu, tiêu chí phân loại |
| **Chương 2** | Cấu trúc tuyến tính | Mảng, danh sách liên kết, stack, queue |
| **Chương 3** | Bảng hash | Hàm hash, xử lý va chạm, tìm kiếm O(1) |
| **Chương 4** | Cấu trúc cây | Cây nhị phân, cây hệ thống tệp, cây DOM |
| **Chương 5** | Cấu trúc đồ thị | Đồ thị có hướng, vô hướng, thuật toán duyệt |
| **Chương 6** | So sánh hiệu suất | Độ phức tạp thời gian, độ phức tạp không gian |
| **Chương 7** | Hướng dẫn lựa chọn | Phân tích trường hợp, quy trình quyết định |

---

## 1. Toàn cảnh: Cấu trúc dữ liệu là gì?

Hãy tưởng tượng bạn cần sắp xếp một đống sách:

- **Chồng trên mặt đất**: Tìm sách phải lật từng cuốn——đây là cách lưu trữ nguyên thủy nhất
- **Xếp theo số hiệu lên giá sách**: Đi trực tiếp đến vị trí tương ứng lấy——đây là **mảng**
- **Sắp xếp theo danh mục vào các tủ**: Trước tiên xác định tủ rồi tìm sách——đây là **bảng hash**
- **Sắp xếp theo tên sách trên nhiều tầng**: Mỗi lần loại bỏ một nửa——đây là **cây**

Các cách sắp xếp khác nhau, hiệu suất tìm sách sẽ khác nhau rất nhiều. **Cấu trúc dữ liệu chính là "cách sắp xếp" dữ liệu**——nó quyết định cách dữ liệu được lưu trữ, cách tìm kiếm, cách chỉnh sửa.

<DataStructureOverviewDemo />

Tất cả các cấu trúc dữ liệu có thể chia thành bốn loại chính:

| Loại | Mối quan hệ dữ liệu | Đại diện điển hình | Ví dụ trong đời sống |
|------|------------------|------------------|------------------|
| **Cấu trúc tuyến tính** | Một-một, xếp thành hàng | Mảng, danh sách liên kết, stack, queue | Toa xe lửa, người xếp hàng |
| **Cấu trúc hash** | Khóa → giá trị ánh xạ | Bảng hash, từ điển, tập hợp | Thẻ chỉ mục thư viện |
| **Cấu trúc cây** | Một-nhiều, mối quan hệ phân cấp | Cây nhị phân, cây B, heap | Sơ đồ gia phả, thư mục tệp |
| **Cấu trúc đồ thị** | Nhiều-nhiều, mối quan hệ lưới | Đồ thị có hướng, vô hướng | Sơ đồ tuyến đường tàu, mạng xã hội |

::: tip Tại sao phải học rất nhiều loại?
Bởi vì **không có cấu trúc dữ liệu vạn năng**. Mỗi loại cấu trúc đều là sự cân bằng giữa "tốc độ tìm kiếm", "tốc độ chèn", "sử dụng bộ nhớ". Giống như bạn không dùng ba lô để đóng gói đồ nội thất, cũng không dùng xe tải để gửi một lá thư——chọn đúng công cụ, sự việc sẽ gấp đôi thành công.
:::

---

## 2. Cấu trúc tuyến tính: Cách tổ chức cơ bản nhất

Cấu trúc tuyến tính là cách tổ chức dữ liệu trực quan nhất——dữ liệu xếp thành hàng, giống như toa xe lửa. Nhưng "cách kết nối" và "cách vận hành từ đầu nào" khác nhau sẽ tạo ra bốn biến thể, mỗi loại có những điểm mạnh riêng.

<LinearStructuresDemo />

### 2.1 Mảng vs Danh sách liên kết: Hai cách lưu trữ hoàn toàn khác nhau

Mảng và danh sách liên kết là hai cấu trúc tuyến tính cơ bản nhất, khác biệt cốt lõi nằm ở **bố cục bộ nhớ**:

| Khía cạnh so sánh | Mảng | Danh sách liên kết |
|------------------|------|-------------------|
| **Bố cục bộ nhớ** | Một khối liên tục | Rải rác ở nhiều nơi, được nối với nhau bằng con trỏ |
| **Truy cập phần tử thứ n** | Tính địa chỉ trực tiếp, O(1) | Tìm từ đầu, O(n) |
| **Chèn ở giữa** | Phải dịch chuyển các phần tử sau, O(n) | Chỉ thay đổi hai con trỏ, O(1) |
| **Kích thước** | Kích thước cố định khi tạo | Có thể tăng bất kỳ lúc nào |
| **Ví dụ trong đời sống** | Một hàng tủ đánh số | Xâu chuỗi gợi ý của trò chơi tìm kho báu |

::: tip Khi nào dùng mảng? Khi nào dùng danh sách liên kết?
- **Lượng dữ liệu đã biết, thường xuyên truy cập theo vị trí** → Mảng (ví dụ: bảng điểm học sinh, ma trận pixel)
- **Lượng dữ liệu chưa biết, thường xuyên chèn xóa** → Danh sách liên kết (ví dụ: danh sách phát nhạc, lịch sử hoàn tác)
- **Không chắc chắn?** → Dùng mảng trước. Trong hầu hết các trường hợp, tính thân thiện với cache của mảng mang lại lợi thế hiệu suất lớn hơn
:::

### 2.2 Stack và Queue: Cấu trúc tuyến tính có "quy tắc"

Stack và Queue thực chất chỉ là mảng hoặc danh sách liên kết, nhưng **giới hạn cách vận hành**. Nghe có vẻ chức năng giảm, nhưng chính giới hạn này giúp chúng có mục đích rõ ràng:

| Cấu trúc | Quy tắc | Thao tác | Ví dụ | Xuất hiện ở đâu trong code của bạn? |
|---------|--------|---------|-------|-------------------------------------|
| **Stack** | Vào sau ra trước (LIFO) | push / pop | Chồng đĩa | Hàm call stack, quay lại trình duyệt, Ctrl+Z hoàn tác |
| **Queue** | Vào trước ra trước (FIFO) | enqueue / dequeue | Xếp hàng mua vé | Lập lịch công việc, hàng chờ tin nhắn, hàng chờ in |

::: tip Tại sao "giới hạn" lại là điều tốt?
Hãy tưởng tượng một stack chỉ có hai thao tác "đặt đĩa" và "lấy đĩa"——bạn sẽ không bao giờ lấy sai thứ tự. **Giới hạn mang lại sự chắc chắn, chắc chắn mang lại độ tin cậy.** Hàm call stack dựa vào "vào sau ra trước" để đảm bảo hàm gọi sau cùng sẽ kết thúc đầu tiên. Nếu cho phép truy cập tùy ý vào các hàm ở giữa, chương trình sẽ hỗn loạn.
:::

---

## 3. Bảng hash: Tìm kiếm nhanh nhất

Tìm kiếm trong cấu trúc tuyến tính đều chưa đủ nhanh——mảng phải duyệt O(n), thậm chí dùng tìm kiếm nhị phân trên dữ liệu đã sắp xếp cũng chỉ O(log n). Có cấu trúc nào có thể **tìm được ngay lập tức O(1)**? Có, đó là bảng hash.

<HashTableDemo />

### 3.1 Ý tưởng cốt lõi của bảng hash

Nguyên lý của bảng hash thực ra rất đơn giản:

1. Bạn đưa một **khóa** (ví dụ "apple")
2. **Hàm hash** tính khóa thành một số (ví dụ `hash("apple") = 3`)
3. Đi trực tiếp đến vị trí thứ 3 của mảng tìm——không cần duyệt, chỉ một bước

Giống như hệ thống chỉ mục của thư viện: bạn không cần tìm từng tầng giá sách, chỉ cần tra thẻ chỉ mục là có thể xác định vị trí cuốn sách ngay.

### 3.2 Va chạm hash: Hai khóa cùng chỉ một vị trí thì sao?

Hai khóa khác nhau có thể tính ra cùng một chỉ mục——đây gọi là **va chạm hash**. Giống như hai cuốn sách có cùng số chỉ mục, cùng chỉ đến một vị trí.

| Cách giải quyết | Nguyên lý | Ví dụ |
|-----------------|----------|-------|
| **Phương pháp dây chuyền địa chỉ** | Dùng danh sách liên kết lưu nhiều giá trị ở cùng một vị trí | Một tủ chứa nhiều cuốn sách |
| **Phương pháp địa chỉ mở** | Va chạm rồi tìm vị trí trống tiếp theo | Tủ đầy rồi đặt vào tủ bên cạnh |

### 3.3 Hiệu suất của bảng hash

| Thao tác | Trường hợp trung bình | Trường hợp xấu nhất (tất cả va chạm) |
|----------|---------------------|--------------------------------------|
| **Tìm kiếm** | O(1) | O(n) |
| **Chèn** | O(1) | O(n) |
| **Xóa** | O(1) | O(n) |

::: warning Khi nào sẽ suy giảm?
Khi tất cả khóa đều ánh xạ đến cùng một chỉ mục, bảng hash suy giảm thành danh sách liên kết, tất cả thao tác trở thành O(n). Cách tránh: chọn hàm hash tốt + mở rộng động (khi tỷ lệ tải vượt ngưỡng thì mở rộng).
:::

::: tip Bảng hash có mặt khắp nơi trong code của bạn
- JavaScript object `{}` và `Map` → bảng hash
- Python `dict` → bảng hash
- Java `HashMap` → bảng hash
- Chỉ mục cơ sở dữ liệu → dưới nước cũng dùng hash

Mỗi lần bạn viết `user["name"]` hoặc `map.get("key")`, phía sau là bảng hash đang hoạt động.
:::

---

## 4. Cấu trúc cây: Biểu diễn mối quan hệ phân cấp

Bảng hash tìm kiếm nhanh, nhưng dữ liệu không có thứ tự. Nếu bạn cần **vừa tìm kiếm nhanh, vừa giữ dữ liệu có thứ tự**, bạn cần cấu trúc cây.

Đặc điểm cốt lõi của cây: mỗi nút có thể có nhiều "con", nhưng chỉ có một "cha" (trừ nút gốc). Mối quan hệ một-nhiều phân cấp này xuất hiện khắp nơi trong thực tế.

<TreeStructureDemo />

### 4.1 Cây tìm kiếm nhị phân: Cây có thứ tự

Cây tìm kiếm nhị phân có một quy tắc đơn giản nhưng mạnh mẽ: **trái nhỏ phải lớn**.

- Tất cả các giá trị trong cây con trái < nút gốc
- Tất cả các giá trị trong cây con phải > nút gốc

Khi tìm kiếm, mỗi lần so sánh đều loại bỏ được một nửa nút, độ phức tạp thời gian O(log n). Giống như trò chơi đoán số——"lớn hơn 50 hay nhỏ hơn?"——"lớn hơn."——"lớn hơn 75 hay nhỏ hơn?"——mỗi lần loại bỏ một nửa.

### 4.2 Cây cân bằng: Phòng chống suy giảm

Cây tìm kiếm nhị phân có một vấn đề: nếu dữ liệu được chèn theo thứ tự (1, 2, 3, 4, 5), cây sẽ suy giảm thành một đường thẳng, tìm kiếm lại trở thành O(n). Cây cân bằng tránh vấn đề này bằng cách tự động điều chỉnh cấu trúc:

| Loại | Chiến lược cân bằng | Đặc điểm | Ứng dụng điển hình |
|------|-------------------|---------|------------------|
| **Cây AVL** | Cân bằng nghiêm ngặt (chênh lệch chiều cao ≤ 1) | Tìm kiếm nhanh nhất, chèn xóa chậm hơn | Cần tìm kiếm thường xuyên |
| **Cây đỏ đen** | Cân bằng gần đúng | Hiệu suất tổng hợp tốt | Java TreeMap, Linux kernel |
| **Cây B** | Cân bằng nhiều đường, một nút lưu nhiều giá trị | Giảm I/O đĩa | Chỉ mục cơ sở dữ liệu |

::: tip Cây xuất hiện ở đâu trong code của bạn?
- **Hệ thống tệp**: Thư mục lồng nhau chính là cấu trúc cây
- **HTML DOM**: `<html>` → `<body>` → `<div>` → `<p>` chính là một cây
- **Chỉ mục cơ sở dữ liệu**: Cây B+ giúp dữ liệu hàng triệu chỉ cần 3-4 lần đọc đĩa để tìm
- **JSON/XML**: Định dạng dữ liệu lồng nhau thực chất chính là cây
:::

---

## 5. Cấu trúc đồ thị: Mạng lưới các mối quan hệ phức tạp

Cây chỉ biểu diễn được mối quan hệ "một-nhiều" phân cấp. Nhưng trong thực tế, nhiều mối quan hệ là "nhiều-nhiều"——bạn bè của bạn cũng có bạn bè, giữa các thành phố có nhiều con đường để đi. Loại cấu trúc **bất kỳ nút nào cũng có thể kết nối với nhau**, chính là đồ thị.

<GraphStructureDemo />

### 5.1 Ba hình thái của đồ thị

| Loại | Đặc điểm | Ví dụ | Ứng dụng điển hình |
|------|---------|-------|------------------|
| **Đồ thị vô hướng** | Cạnh không có hướng, A→B bằng B→A | Bạn bè WeChat (lẫn nhau) | Mạng xã hội, mạng thông tin |
| **Đồ thị có hướng** | Cạnh có hướng, A→B khác B→A | Theo dõi Weibo (một chiều) | Liên kết trang web, mối quan hệ phụ thuộc |
| **Đồ thị có trọng số** | Cạnh có trọng số (khoảng cách, chi phí, v.v.) | Quốc lộ giữa các thành phố (có số km) | Dẫn đường bản đồ, đường đi ngắn nhất |

### 5.2 Duyệt đồ thị

Duyệt đồ thị phức tạp hơn cấu trúc tuyến tính, bởi vì có thể có chu trình (A→B→C→A), cần ghi nhớ các nút "đã truy cập":

| Phương pháp duyệt | Chiến lược | Ví dụ | Trường hợp áp dụng |
|------------------|----------|-------|------------------|
| **BFS (duyệt theo chiều rộng)** | Truy cập tất cả hàng xóm trước, rồi hàng xóm của hàng xóm | Sóng nước lan tỏa | Đường đi ngắn nhất, duyệt theo tầng |
| **DFS (duyệt theo chiều sâu)** | Đi một con đường đến cùng, không thể rồi quay lại | Đi trong mê cung | Tìm kiếm đường đi, kiểm tra kết nối |

::: tip Ứng dụng của đồ thị trong thực tế
- **Dẫn đường bản đồ**: Thành phố là nút, đường là cạnh, dẫn đường là tìm đường đi ngắn nhất trên đồ thị
- **Mạng xã hội**: Người dùng là nút, theo dõi/bạn bè là cạnh, "những người bạn có thể biết" là gợi ý của thuật toán đồ thị
- **Trình quản lý gói**: Mối quan hệ phụ thuộc trong npm/pip chính là đồ thị có hướng, `npm install` chính là sắp xếp tô pô của đồ thị
:::

---

## 6. So sánh hiệu suất: Một bảng để xem rõ tất cả cấu trúc dữ liệu

Học rất nhiều cấu trúc dữ liệu, hiệu suất của chúng khác nhau bao nhiêu? Bảng so sánh tương tác dưới đây sẽ giúp bạn xây dựng trực giác:

<DataStructureDemo />

**Bảng so sánh hiệu suất cốt lõi:**

| Cấu trúc dữ liệu | Truy cập | Tìm kiếm | Chèn | Xóa | Không gian |
|-----------------|---------|----------|------|-----|-----------|
| **Mảng** | O(1) | O(n) | O(n) | O(n) | O(n) |
| **Danh sách liên kết** | O(n) | O(n) | O(1) | O(1) | O(n) |
| **Stack/Queue** | O(n) | O(n) | O(1) | O(1) | O(n) |
| **Bảng hash** | — | O(1) | O(1) | O(1) | O(n) |
| **Cây tìm kiếm nhị phân** | — | O(log n) | O(log n) | O(log n) | O(n) |
| **Đồ thị** | — | O(V+E) | O(1) | O(E) | O(V+E) |

::: tip Cách đọc bảng này?
- **O(1)**: Bất kể dữ liệu lớn đến đâu, thời gian thao tác không đổi——nhanh nhất
- **O(log n)**: Dữ liệu tăng gấp đôi, thời gian chỉ thêm một bước——rất nhanh
- **O(n)**: Dữ liệu tăng gấp đôi, thời gian cũng tăng gấp đôi——bình thường
- **O(V+E)**: Phụ thuộc vào số nút và số cạnh——biểu diễn đặc biệt của đồ thị

Lưu ý: đây là **trường hợp trung bình**. Trong trường hợp xấu nhất, bảng hash suy giảm thành O(n), cây tìm kiếm nhị phân cũng suy giảm thành O(n).
:::

---

## 7. Hướng dẫn lựa chọn: Nên dùng cấu trúc dữ liệu nào?

Học rất nhiều cấu trúc dữ liệu, khi đối mặt với yêu cầu thực tế thì chọn như thế nào? Chìa khóa là **xuất phát từ yêu cầu**, tự hỏi bạn một vài câu hỏi:

1. **Thao tác thường xuyên nhất là gì?** Tìm kiếm? Chèn? Xóa? Duyệt?
2. **Mối quan hệ giữa các dữ liệu là gì?** Một-một? Một-nhiều? Nhiều-nhiều?
3. **Dữ liệu có lớn đến đâu?** Vài chục dữ liệu và vài triệu dữ liệu có thể có lựa chọn tối ưu hoàn toàn khác
4. **Có cần có thứ tự không?** Có cần duyệt dữ liệu theo một thứ tự nào đó không?

<DataStructureSelectorDemo />

**Quy trình quyết định nhanh:**

| Yêu cầu của bạn | Cấu trúc được đề xuất | Lý do |
|-----------------|----------------------|-------|
| Truy cập nhanh theo vị trí | Mảng | Truy cập ngẫu nhiên O(1) |
| Chèn xóa thường xuyên ở giữa | Danh sách liên kết | Chèn xóa O(1), không cần dịch chuyển phần tử |
| Vào sau ra trước (hoàn tác, đệ quy) | Stack | Ngữ nghĩa LIFO tự nhiên phù hợp |
| Vào trước ra trước (hàng chờ công việc) | Queue | Ngữ nghĩa FIFO tự nhiên phù hợp |
| Tìm kiếm nhanh theo khóa | Bảng hash | Tìm kiếm trung bình O(1) |
| Dữ liệu có thứ tự + tìm kiếm nhanh | Cây tìm kiếm nhị phân | Tìm kiếm O(log n) và giữ có thứ tự |
| Mối quan hệ phức tạp nhiều-nhiều | Đồ thị | Có thể biểu diễn bất kỳ kết nối nút nào |

::: tip Kinh nghiệm thực tế khi phát triển
- **80% trường hợp** dùng mảng và bảng hash là đủ
- **Cần có thứ tự** thì xem xét cây
- **Quan hệ phức tạp** thì xem xét đồ thị
- **Không chắc chắn?** Dùng cách đơn giản nhất trước, gặp vấn đề hiệu suất rồi thay đổi. Tối ưu hóa quá sớm là gốc của tất cả tội lỗi
:::

---

## Tổng kết

> Cấu trúc dữ liệu là bộ khung của chương trình. **Mảng** giống một hàng tủ đánh số, lấy theo vị trí nhanh nhất; **Danh sách liên kết** giống xâu chuỗi gợi ý tìm kho báu, chèn xóa linh hoạt nhất; **Bảng hash** giống chỉ mục thư viện, tìm theo tên nhanh nhất; **Cây** giống sơ đồ gia phả, biểu diễn mối quan hệ phân cấp và giữ có thứ tự; **Đồ thị** giống sơ đồ tuyến đường tàu, biểu diễn bất kỳ mối quan hệ lưới phức tạp nào. Không có cấu trúc dữ liệu tốt nhất, chỉ có cấu trúc phù hợp nhất——chìa khóa là hiểu ưu điểm và chi phí của mỗi cấu trúc, dựa vào yêu cầu thực tế để cân bằng.

---

## Đọc thêm

| Chủ đề | Tài nguyên được đề xuất |
|--------|------------------------|
| Trực quan hóa cấu trúc dữ liệu | [VisuAlgo](https://visualgo.net/) - Minh họa hoạt ảnh các cấu trúc dữ liệu và thuật toán |
| Thuật toán và cấu trúc dữ liệu | Grokking Algorithms - Aditya Bhargava, hình ảnh minh họa phù hợp cho người mới bắt đầu |
| Hiểu sâu sắc | Data Structures and Algorithm Analysis - Mark Allen Weiss |
| Luyện tập | [LeetCode](https://leetcode.cn/) - Luyện tập phân loại theo cấu trúc dữ liệu |

---

## Bước tiếp theo

Bây giờ bạn đã nắm vững kiến thức cốt lõi về cấu trúc dữ liệu. Bạn có thể tiếp tục học:

- **[Tư duy thuật toán](./algorithm-thinking.md)**: Học cách dùng sắp xếp, tìm kiếm, đệ quy, lập trình động để giải quyết vấn đề
- **[Ngôn ngữ lập trình](./programming-languages.md)**: Hiểu cách các ngôn ngữ lập trình khác nhau cài đặt các cấu trúc dữ liệu này
