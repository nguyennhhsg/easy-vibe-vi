# Hướng dẫn Trình gỡ lỗi Trình duyệt (DevTools)

::: tip 💡 Vai trò cốt lõi
Công cụ nhà phát triển trình duyệt (DevTools) là "máy chụp X" và "bàn phẫu thuật" của phát triển frontend. Nó cho phép bạn nhìn xuyên qua bộ xương trang web (HTML), da (CSS) và hệ thần kinh (JavaScript), đồng thời cho phép bạn sửa đổi và gỡ lỗi chúng trong thời gian thực.
:::

## 1. DevTools là gì?

**DevTools** là một bộ công cụ phát triển Web và gỡ lỗi được tích hợp sẵn trong các trình duyệt hiện đại (Chrome, Edge, Firefox, Safari, v.v.). Đối với các nhà phát triển, nó gần với "sự thật" hơn so với trình soạn thảo mã vì **nó hiển thị cách mã thực sự chạy trong trình duyệt**.

**Làm thế nào để mở DevTools?**

- **Phím tắt**: `F12` hoặc `Ctrl + Shift + I` (Mac: `Cmd + Option + I`)
- **Chuột**: **Nhấp chuột phải** vào bất kỳ phần tử nào trên trang web, chọn **"Kiểm tra (Inspect)"**.
- **Menu**: Trình đơn góc trên bên phải của trình duyệt -> Công cụ thêm -> Công cụ nhà phát triển.

---

## 2. Bản demo tương tác: Trình mô phỏng DevTools

Để bạn có thể bắt đầu nhanh chóng, chúng tôi đã tạo một bảng điều khiển DevTools mô phỏng, sao chép giao diện gỡ lỗi của trình duyệt Chrome.
**Vui lòng cố gắng nhấp vào nút "▶ Bắt đầu hướng dẫn tự động" bên dưới, theo dõi con trỏ để hiểu chức năng của mỗi khu vực.**

<ClientOnly>
  <BrowserDevToolsDemo />
</ClientOnly>

### 2.1 Bản demo nâng cao: Sửa đổi trang web trong thời gian thực (Live Edit)

Một trong những tính năng mạnh mẽ nhất của DevTools là **sửa đổi trong thời gian thực**. Bản demo dưới đây bao gồm một "trang web ảo" (ở trên) và một "DevTools" (ở dưới).

**Vui lòng thử:**

1.  Trong bảng Elements ở dưới, nhấp vào phần tử `h1` hoặc `button` trong cây DOM.
2.  Trong bảng Styles ở bên phải, sửa đổi giá trị thuộc tính trong `element.style` (ví dụ: thay đổi `color` thành `red`).
3.  Quan sát cách trang web ảo ở trên **thay đổi trong thời gian thực**.

<ClientOnly>
  <BrowserDevToolsLiveDemo />
</ClientOnly>

### 2.2 Thách thức thực hành: Sửa đổi văn bản trang web thực

Bây giờ bạn đã nắm vững kỹ thuật sửa đổi kiểu, hãy thử điều gì đó kỳ thú hơn—**sửa đổi trực tiếp trang web bạn đang xem!**

1.  **Mở DevTools thực**: Nhấn `F12` (hoặc nhấp chuột phải vào dòng này -> chọn "Kiểm tra").
2.  **Định vị phần tử**: Trong bảng Elements, bạn sẽ thấy một dòng mã được đánh dấu, đó chính là văn bản bạn vừa nhấp.
3.  **Sửa đổi nội dung**: **Nhấp đôi** vào phần văn bản màu đen trong dòng mã này, thay đổi nó thành "**Tôi là một hacker!**", sau đó nhấn Enter.
4.  **Chứng kiến phép màu**: Nhìn kìa! Văn bản trên trang web có thay đổi không?

::: info 🤔 Tại sao nó biến mất sau khi làm mới?
Bạn có thể nhận thấy rằng khi làm mới trang, tất cả các sửa đổi biến mất và trang web quay trở lại trạng thái cũ.

Điều này là do các sửa đổi trong DevTools chỉ xảy ra **trong bộ nhớ cục bộ của trình duyệt bạn**.

- Khi bạn truy cập một trang web, trình duyệt tải xuống mã HTML từ **máy chủ từ xa** và hiển thị nó cục bộ.
- Bạn chỉ sửa đổi **bản sao cục bộ** và không có quyền sửa đổi **mã nguồn** trên máy chủ.
- Vì vậy, mỗi khi làm mới, trình duyệt sẽ lấy lại mã mới nhất (chưa được sửa đổi) từ máy chủ, mọi thứ sẽ quay trở lại trạng thái cũ.
:::

---

## 3. Giải thích chi tiết các bảng điều khiển cốt lõi

### 3.1 Elements (Bảng phần tử)

<ClientOnly>
  <DevToolsElementsDemo />
</ClientOnly>

**Tác dụng**: Xem và chỉnh sửa HTML và CSS của trang trong thời gian thực.

- **Bên trái (Cây DOM)**: Hiển thị cấu trúc HTML của trang web. Bạn có thể nhấp đôi vào các thẻ hoặc văn bản để sửa đổi, thậm chí kéo các nút để thay đổi vị trí.
- **Bên phải (Kiểu)**: Hiển thị kiểu CSS của phần tử được chọn. Bạn có thể đánh dấu/bỏ đánh dấu kiểu để xem thay đổi, hoặc sửa đổi trực tiếp các giá trị (chẳng hạn như màu sắc, lề).
- **Trường hợp sử dụng**:
  - "Tại sao nút này không căn chỉnh?" -> Kiểm tra kiểu CSS.
  - "Tôi muốn thử xem tiêu đề này có trông đẹp không khi thay đổi thành màu đỏ?" -> Sửa đổi `color: red` trực tiếp trong Kiểu.

### 3.2 Console (Bảng console)

<ClientOnly>
  <DevToolsConsoleDemo />
</ClientOnly>

**Tác dụng**: Xem thông tin nhật ký, chạy mã JavaScript.

- **Đầu ra nhật ký**: Thông tin `console.log()`, cảnh báo (màu vàng) và lỗi (màu đỏ) khi trang web chạy sẽ được hiển thị ở đây.
- **Môi trường tương tác**: Bạn có thể nhập bất kỳ mã JS nào và thực thi ngay lập tức. Ví dụ: nhập `alert('Hello')` sẽ hiển thị cửa sổ bật lên, nhập `document.body.style.background = 'red'` sẽ làm nền chuyển thành màu đỏ.
- **Trường hợp sử dụng**:
  - "Tại sao nhấp vào nút không có phản ứng?" -> Kiểm tra xem có thông báo lỗi màu đỏ không.
  - "Xác thực giá trị trả về của một hàm JS." -> Chạy bài kiểm tra trực tiếp trên console.

### 3.3 Network (Bảng mạng)

<ClientOnly>
  <DevToolsNetworkDemo />
</ClientOnly>

**Tác dụng**: Giám sát tất cả các yêu cầu mạng.

- **Chế độ xem danh sách**: Hiển thị tất cả các tài nguyên được tải (HTML, CSS, JS, hình ảnh, yêu cầu API).
- **Chi tiết tương tác**: Nhấp vào bất kỳ dòng yêu cầu nào, bảng chi tiết sẽ trượt ra ở bên phải:
  - **Headers (Tiêu đề)**: Xem tiêu đề yêu cầu, tiêu đề phản hồi (như `Content-Type`).
  - **Response (Phản hồi)**: Xem dữ liệu thô được máy chủ trả về (JSON, mã HTML, v.v.).
  - **Preview (Xem trước)**: Xem trước nội dung phản hồi ở định dạng dễ đọc hơn.
- **Các số liệu chính**:
  - **Status**: Mã trạng thái (200 thành công, 404 không tìm thấy, 500 lỗi máy chủ).
  - **Type**: Loại tài nguyên (fetch/xhr đại diện cho yêu cầu API).
  - **Time**: Thời gian tải.
- **Trường hợp sử dụng**:
  - "API có bị lỗi không?" -> Kiểm tra xem yêu cầu API có màu đỏ 500 không.
  - "Tại sao trang tải chậm như vậy?" -> Tìm xem hình ảnh hoặc tệp nào tải lâu nhất.

### 3.4 Sources (Bảng mã nguồn)

<ClientOnly>
  <DevToolsSourcesDemo />
</ClientOnly>

**Tác dụng**: Xem mã nguồn, gỡ lỗi JavaScript.

- **Gỡ lỗi điểm ngắt**: Nhấp vào số dòng để đặt "điểm ngắt (Breakpoint)". Khi mã chạy đến dòng này, nó sẽ **tạm dừng**, cho bạn cơ hội xem giá trị biến hiện tại và thực thi mã từng bước.
- **Trường hợp sử dụng**:
  - "Logic của mã ở đâu bị sai?" -> Đặt điểm ngắt, xem mã chạy từng bước, kiểm tra xem giá trị biến có khớp với dự kiến không.

### 3.5 Application (Bảng ứng dụng)

<ClientOnly>
  <DevToolsApplicationDemo />
</ClientOnly>

**Tác dụng**: Xem và quản lý lưu trữ trình duyệt.

- **Storage**:
  - **Local Storage**: Dữ liệu được lưu trữ lâu dài.
  - **Session Storage**: Lưu trữ cấp phiên (biến mất khi đóng thẻ).
  - **Cookies**: Dữ liệu văn bản nhỏ được sử dụng cho xác thực, v.v.
- **Trường hợp sử dụng**:
  - "Xóa trạng thái đăng nhập" -> Xóa mã thông báo trong Cookies hoặc Local Storage.
  - "Xem dữ liệu được lưu vào bộ nhớ đệm" -> Kiểm tra Local Storage chứa những gì.

---

## 4. Mẹo thực hành

1.  **Gỡ lỗi chế độ di động**: Nhấp vào "biểu tượng điện thoại" 📱 ở góc trên bên trái của DevTools, bạn có thể mô phỏng kích thước màn hình của các điện thoại khác nhau (iPhone, Pixel, v.v.), kiểm tra hiệu ứng đáp ứng của trang web.
2.  **Trạng thái cưỡng chế**: Trong bảng Elements, nhấp chuột phải vào một phần tử, chọn `Force state` -> `:hover`, bạn có thể cưỡng chế phần tử ở trạng thái di chuột, dễ dàng gỡ lỗi kiểu khi di chuột.
3.  **Chụp nút**: Chọn một nút trong bảng Elements, nhấn `Ctrl + Shift + P` (Mac: `Cmd + Shift + P`) để mở menu lệnh, nhập `screenshot`, chọn `Capture node screenshot`, bạn có thể chụp nút DOM này trực tiếp và lưu dưới dạng hình ảnh.

::: warning ⚠️ Lưu ý
Tất cả các sửa đổi trong DevTools (sửa đổi HTML, CSS, JS) đều **tạm thời**, chỉ có hiệu lực trên trang trình duyệt hiện tại. Khi làm mới trang, tất cả các sửa đổi sẽ bị mất. Nếu bạn muốn sửa đổi vĩnh viễn, bạn phải sửa đổi tệp mã nguồn của mình.
:::
