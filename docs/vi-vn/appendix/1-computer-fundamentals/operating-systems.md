# Hệ điều hành: Thuê một "quản gia" cho máy tính

::: tip Lời mở đầu
**Có CPU hoàn hảo và bộ nhớ vô hạn, điều này có nghĩa là máy tính có thể sử dụng trực tiếp không?** 
Trong chương trước, chúng ta đã thấy cách các transistor kết hợp lại thành một CPU mạnh mẽ. Tuy nhiên, ngay cả khi bạn có phần cứng tốt nhất, nếu để chúng hoạt động trực tiếp, chỉ việc hiển thị một chữ cái trên màn hình cũng cần viết hàng trăm dòng lệnh máy khó hiểu. Không chỉ phức tạp, còn cực kỳ nguy hiểm - chỉ cần sơ suất một chút, mã của bạn có thể ghi đè dữ liệu của người khác.

Để giải quyết những cơn ác mộng này, **hệ điều hành (Operating System, viết tắt là OS)** ra đời. Nó là một lớp "phần mềm" vĩ đại nhất nằm giữa bạn và phần cứng lạnh lùng. Trong chương này, chúng ta sẽ bỏ qua mã phức tạp và dùng những so sánh dễ hiểu để xem cách "quản gia" này huấn luyện phần cứng lộn xộn thành ngoan ngoãn như thế nào.
:::

**Bài viết này sẽ dạy bạn cái gì?**

Sau khi học xong chương này, bạn sẽ có được:

- **Khả năng khắc phục sự cố**: Khi gặp "chương trình bị treo", "bộ nhớ không đủ", bạn có thể phân tích nguyên nhân ở cấp độ hệ điều hành
- **Độ sâu hiểu biết về các thuật ngữ**: Hiểu "đa tiến trình", "bộ nhớ ảo", "quyền truy cập tệp" giải quyết những vấn đề gì
- **Tư duy hệ thống**: Hiểu rằng chương trình không chạy độc lập mà tương tác chặt chẽ với hệ điều hành, các tiến trình khác và tài nguyên phần cứng
- **Nền tảng cho học tập tiếp theo**: Đặt nền tảng cho lập trình đồng thời, tối ưu hóa hệ thống, công nghệ container

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|-------------------|
| **Chương 1** | Quản lý tiến trình | Ghép kênh thời gian CPU, lập lịch thời gian chia sẻ |
| **Chương 2** | Quản lý bộ nhớ | Bộ nhớ ảo, cơ chế phân trang |
| **Chương 3** | Hệ thống tệp | Tổ chức tệp, cấu trúc thư mục |

---

## 0. Toàn cảnh: Nếu không có hệ điều hành sẽ thế nào?

Hãy tưởng tượng bạn mở một "nhà máy tính toán" (máy tính của bạn) có tiềm năng khổng lồ, trong đó có một nhân viên hàng đầu toàn năng, không biết mệt mỏi (CPU), một kho lưu trữ khổng lồ (bộ nhớ) và vô số thùng chứa (ổ cứng).

Nếu bạn **không thuê** một nhà quản lý nhà máy (hệ điều hành) để quản lý:
1. **Khủng hoảng độc quyền CPU**: CPU chỉ có thể làm một việc cùng một lúc. Nếu ai đó đang dùng nó nghe nhạc, bạn muốn xem trang web? Xin lỗi, mọi người phải xếp hàng chờ người nghe nhạc chủ động nhượng CPU.
2. **Sự cố giẫm đạp bộ nhớ**: WeChat và trò chơi đều sử dụng kho lưu trữ (bộ nhớ). Nếu không có bảo vệ quy hoạch vùng, trò chơi vô tình đặt dữ liệu trang bị vào hộp của WeChat, WeChat sẽ sập ngay lập tức.
3. **Mê cung ổ cứng**: Phần cứng ổ cứng chỉ là những đĩa quang khổng lồ chứa đầy 0 và 1. Để tìm thấy bức ảnh bạn lưu hôm qua, bạn phải nhớ chính xác nó được lưu ở "mặt 1, bộ 56, cung 8", không ai có thể nhớ những tọa độ phi nhân tính như vậy.

<OSArchitectureDemo />

Để giải quyết ba cơn ác mộng trên, hệ điều hành đã tung ra ba vũ khí tối thượng của nó: **quản lý tiến trình**, **quản lý bộ nhớ** và **hệ thống tệp**.

---

## 1. Quản lý tiến trình: Ghép kênh thời gian CPU

Khi sử dụng máy tính hàng ngày, bạn thường mở WeChat, nghe nhạc và gõ chữ cùng lúc. Nhưng nếu máy tính của bạn thực tế chỉ có một lõi CPU, nó làm thế nào để làm ba việc cùng lúc?

Câu trả lời là: **Nó không làm cùng lúc. Mà là hệ điều hành đang thực hiện "quản lý thời gian" điên cuồng.**

<ProcessDemo />

### 1.1 "Tiến trình" là gì?
Mỗi chương trình đang chạy được gọi là một **tiến trình**. Bạn có thể hiểu nó là một "nhóm dự án", có mã của riêng nó (danh sách công việc), dữ liệu bộ nhớ của riêng nó (quỹ dự án), xếp hàng chờ CPU tiếp xúc.

### 1.2 Lập lịch thời gian chia sẻ
Để không cho phần mềm độc hại nào chiếm dụng CPU mãi mãi, hệ điều hành cắt thời gian CPU thành các mảnh cực nhỏ (khoảng 10 mili giây), lần lượt phân bổ cho các tiến trình. Vì tốc độ chuyển đổi quá nhanh, bạn cảm thấy "chạy cùng lúc".

---

## 2. Quản lý bộ nhớ: Không gian địa chỉ ảo

Giải quyết vấn đề CPU sử dụng lần lượt, tiếp theo là không gian bộ nhớ. Nếu không quản lý, tất cả phần mềm đều ghi dữ liệu trực tiếp vào thanh bộ nhớ vật lý, chắc chắn sẽ xảy ra thảm kịch giẫm đạp **ghi đè lẫn nhau**.

<MemoryDemo />

### 2.1 Bộ nhớ ảo (Virtual Memory)
Hệ điều hành nói dối mỗi tiến trình: "Này, bạn độc quyền tất cả bộ nhớ khả dụng của toàn bộ máy tính, dùng thoải mái!"

Từ góc độ của tiến trình, thanh bộ nhớ của nó luôn **liên tục** và **sạch sẽ**. Nó yên tâm ghi dữ liệu vào đó.

### 2.2 Ánh xạ bảng trang (Page Table)
Thực tế thì sao? Hệ điều hành lén lút nhét dữ liệu vào các khe hở rải rác trong **bộ nhớ vật lý thực sự**. Cách này có hai lợi ích thiên tài:
1. **Tuyệt đối an toàn**: WeChat chỉ có thể thấy không gian của riêng nó, không thể sửa đổi dữ liệu của người khác
2. **Sử dụng mảnh vỡ**: Dù bộ nhớ vật lý lộn xộn như thế nào, không gian ảo ánh xạ cho tiến trình vẫn gọn gàng

---

## 3. Hệ thống tệp: Tổ chức lưu trữ bền vững

Nếu bạn mua một ổ cứng mới tinh, bên trong nó thực tế là các đơn vị lưu trữ hoang vu. Nếu bạn muốn lưu một bức ảnh, ổ cứng sẽ hỏi bạn: "Vui lòng cho tôi biết bạn muốn lưu ở byte thứ bao nhiêu?"

<FilesystemDemo />

### 3.1 Hệ thống tệp đã làm gì?
1. **Cắt ổ cứng**: Cắt ổ cứng thành vô số **khối** có kích thước cố định (thường là 4KB)
2. **Thiết lập sổ cái**: Ghi lại khối nào đầy, khối nào trống
3. **Dịch đường dẫn**: Dịch `D:/Ảnh/thú cưng.jpg` thành "khối 3, 7, 11"

Đó là lý do tại sao bạn có thể đổi tên tệp ngay lập tức (chỉ thay đổi tên trên sổ cái), nhưng sao chép tệp mất lâu (phải thực sự đọc/ghi các khối dữ liệu ổ cứng).

---

## 4. Sự phối hợp của ba yếu tố: Quy trình hoàn chỉnh khởi động chương trình

Chúng ta đã tìm hiểu riêng ba mô-đun lớn của hệ điều hành, bây giờ hãy xem cách chúng hoạt động phối hợp khi bạn **nhấp đôi để mở một chương trình**:

<ProgramLaunchDemo />

Cho dù bạn nhấp vào biểu tượng trên bàn làm việc hay một dòng `print("Hello World")` trong mã, đều không thể tách rời khỏi bộ máy phức tạp này. Lý do chúng ta có thể lướt sóng thế giới kỹ thuật số một cách dễ dàng là do hệ điều hành cấp dưới đang chịu khó cho chúng ta.

---

## Đọc thêm

Nếu bạn cảm thấy các "kỹ thuật quản lý và quy tắc" của hệ điều hành rất thú vị, bạn có thể xem những chủ đề nâng cao này:
- **Tiến trình và luồng**: Nếu tiến trình là nhóm dự án, thì "luồng" là nhân viên làm việc trong nhóm
- **Tính đồng thời và khóa**: Khi hai tiến trình cạnh tranh cùng một tài nguyên, làm thế nào để ngăn chặn deadlock
- **Gọi hệ thống**: "Cửa sổ dịch vụ" mà hệ điều hành cung cấp cho các ứng dụng cấp trên
