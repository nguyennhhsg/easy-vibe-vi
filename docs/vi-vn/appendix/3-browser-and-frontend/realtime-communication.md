# Cơ chế Truyền Thông Thời Gian Thực (Polling / SSE / WebSocket)

::: tip Hướng Dẫn Cốt Lõi
**Trình duyệt thực hiện cập nhật dữ liệu thời gian thực như thế nào?** 
Giao thức HTTP truyền thống dựa trên mô hình "yêu cầu-phản hồi", khách hàng phải chủ động gửi yêu cầu, máy chủ mới có thể trả về dữ liệu. Nếu chúng ta cần triển khai các kịch bản thời gian thực như phòng trò chuyện, đẩy giá cổ phiếu, v.v., mô hình này sẽ phải đối mặt với những thách thức.

Chương này sẽ giới thiệu ba kỹ thuật chính mà giao diện người dùng sử dụng để ứng phó với truyền thông dữ liệu thời gian thực: Polling (Kiểm tra định kỳ), SSE (Sự kiện đẩy máy chủ) và WebSocket lưỡng chiều đầy đủ, đồng thời khám phá các nguyên tắc và tình huống áp dụng của chúng.
:::

---

## 1. Hạn Chế của HTTP Truyền Thống

Giao thức HTTP được thiết kế ban đầu để truy xuất tài liệu, nó có các đặc điểm **không trạng thái (Stateless)** và **được khách hàng khởi tạo một chiều**:
1. Khách hàng gửi yêu cầu HTTP.
2. Máy chủ xử lý yêu cầu và trả về phản hồi.
3. Sau khi kết nối hoàn thành tác vụ, nó thường sẽ giải phóng yêu cầu lôgic tương ứng (mặc dù HTTP/1.1 hỗ trợ tái sử dụng kết nối lâu dài, nhưng mô hình yêu cầu-phản hồi ở cấp kinh doanh không thay đổi).

Trong chế độ này, máy chủ không thể chủ động thông báo cho khách hàng đang chờ đợi về những thay đổi trạng thái bất cứ lúc nào. Để lấy dữ liệu mới nhất, cần phải tìm các giải pháp kiến trúc kỹ thuật khác.

---

## 2. Kiểm Tra Định Kỳ (Polling)

Giải pháp trực tiếp nhất là **kiểm tra định kỳ ngắn hạn**. Tức là khách hàng sử dụng bộ hẹn giờ (chẳng hạn như `setInterval`), cứ sau một khoảng thời gian cố định, tự động gửi yêu cầu HTTP đến máy chủ để hỏi xem có dữ liệu mới đến hay không.

<PollingDemo />

**Đặc điểm Kỹ Thuật và Hạn Chế:**
- **Ưu điểm**: Cơ chế triển khai cực kỳ đơn giản, hoàn toàn dựa trên giao thức HTTP tiêu chuẩn và công nghệ AJAX/Fetch.
- **Nhược điểm**: Có thể gây ra chi phí mạng khổng lồ và lãng phí tài nguyên. Hầu hết thời gian, phản hồi từ máy chủ có thể là "không có dữ liệu mới". Bất kể có hay không có dữ liệu, mỗi yêu cầu đều cần phải mang theo tiêu đề HTTP đầy đủ (Headers, Cookies, v.v.), trong các tình huống có lượng đồng thời cao, nó sẽ dẫn đến tài nguyên mạng bị chiếm dụng bởi một lượng lớn các truy vấn vô nghĩa.

---

## 3. Sự Kiện Đẩy Máy Chủ (Server-Sent Events)

Để giảm chi phí thiết lập kết nối HTTP thường xuyên, **Sự Kiện Đẩy Máy Chủ (SSE)** cung cấp một kiến trúc đẩy luồng dữ liệu một chiều nhẹ nhàng.

SSE được xây dựng trên giao thức HTTP. Sau khi khách hàng gửi yêu cầu HTTP chứa tiêu đề yêu cầu đặc biệt (`Accept: text/event-stream`), máy chủ sẽ giữ cho kết nối TCP cơ bản không bị ngắt khi trả về phản hồi. Sau đó, máy chủ có thể thông qua kênal duy trì này, liên tục đẩy dữ liệu ở định dạng văn bản cho khách hàng.

<SSEDemo />

**Đặc điểm Kỹ Thuật và Hạn Chế:**
- **Ưu điểm**: Kết nối liên tục, chi phí mạng thấp; trình duyệt hỗ trợ cơ chế kết nối lại tự động khi ngắt kết nối; rất phù hợp để truyền dữ liệu luồng **một chiều** từ máy chủ đến khách hàng (ví dụ như đầu ra từng ký tự của mô hình ngôn ngữ lớn, đẩy giá giao dịch thời gian thực).
- **Nhược điểm**: Kênal truyền thông là một chiều. Nếu khách hàng cần gửi lệnh kiểm soát hoặc gửi dữ liệu mới đến máy chủ, phải thiết lập một yêu cầu HTTP thông thường riêng biệt.

---

## 4. WebSocket: Giao Thức Truyền Thông Lưỡng Chiều Đầy Đủ

Khi tình huống ứng dụng liên quan đến tương tác hai chiều tần suất cao (chẳng hạn như trò chơi hành động nhiều người chơi trực tuyến, chỉnh sửa tài liệu hợp tác chính xác), chúng ta cần một kỹ thuật vừa có thể giảm chi phí truyền thông vừa có thể thực hiện truyền thông lưỡng chiều thực sự — **WebSocket**.

WebSocket là một giao thức truyền thông mạng độc lập. Nó một cách khéo léo đã tận dụng giao thức HTTP để hoàn thành kết nối ban đầu:
1. **Giai đoạn Bắt Tay**: Khách hàng gửi yêu cầu HTTP đặc biệt, tuyên bố muốn nâng cấp nó thành giao thức mới (mang theo tiêu đề `Upgrade: websocket`).
2. **Thay Đổi Kết Nối**: Nếu máy chủ hỗ trợ và đồng ý giao thức đó, nó sẽ trả lời mã trạng thái `101 Switching Protocols`.
3. **Tự Do Hoàn Toàn**: Lúc này, nhiệm vụ quy chuẩn của HTTP kết thúc, kết nối TCP cơ bản được chuyển giao cho giao thức WebSocket. Kể từ đó, khách hàng và máy chủ có quyền truyền thông lưỡng chiều đầy đủ (Full-Duplex) bằng nhau, cả hai bên có thể gửi và nhận các khung dữ liệu ở định dạng cực đơn giản bất kỳ lúc nào.

<WebSocketDemo />

**Đặc điểm Kỹ Thuật và Hạn Chế:**
- **Ưu điểm**: Hỗ trợ truyền thông thời gian thực hai chiều có nghĩa thực sự; thông tin tiêu đề của khung dữ liệu cực kỳ nhỏ, độ trễ truyền thông thấp, hiệu suất thông lượng cao; hỗ trợ truyền dữ liệu nhị phân gốc (ArrayBuffer).
- **Nhược điểm**: Độ phức tạp của kiến trúc và phát triển khá cao; do duy trì kết nối lâu dài liên tục, nó đặt ra các yêu cầu kỹ thuật khắt khe hơn đối với kiến trúc hệ thống phía máy chủ, chiến lược cân bằng tải và thiết kế giám sát nhịp tim.

---

## 5. Tóm Tắt: So Sánh Lựa Chọn Kỹ Thuật

| Khía Cạnh | Kiểm Tra Định Kỳ (Polling) | Sự Kiện Đẩy Máy Chủ (SSE) | WebSocket |
| :--- | :--- | :--- | :--- |
| **Hướng Truyền Thông** | Khách hàng chủ động kiểm tra định kỳ (một chiều) | Máy chủ liên tục chủ động đẩy (một chiều) | Khách hàng và máy chủ có quyền gửi và nhận bằng nhau (lưỡng chiều đầy đủ) |
| **Giao Thức Cơ Sở** | HTTP tiêu chuẩn | HTTP tiêu chuẩn | Giao thức WebSocket độc lập (dựa trên TCP) |
| **Chi Phí Dữ Liệu** | Cực cao (bao gồm tiêu đề HTTP đầy đủ) | Tương đối thấp | Cực thấp (tiêu đề khung dữ liệu cực đơn giản) |
| **Tình Huống Ứng Dụng Điển Hình** | Kiểm tra định kỳ trạng thái hoàn thành của tác vụ không đồng bộ trong nền | Đầu ra luồng một chiều hội thoại mô hình lớn, đẩy tin tức hoặc thông báo hệ thống | Tín hiệu âm thanh và video thời gian thực, trò chơi đối kháng nhiều người chơi trực tuyến, bảng trắng hợp tác và chỉnh sửa |

Trong kỹ thuật thực tế, các nhà phát triển nên dựa trên yêu cầu về tính thời gian thực và tần suất tương tác hai chiều của tình huống kinh doanh cụ thể, cân bằng giữa độ phức tạp bảo trì hệ thống và hiệu quả truyền thông, và chọn ngăn xếp kỹ thuật phù hợp nhất.
