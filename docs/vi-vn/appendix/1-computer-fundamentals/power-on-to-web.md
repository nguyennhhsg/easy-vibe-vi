# Chuyện gì xảy ra từ lúc bấm nút power đến lúc xem website

::: tip Lời nói đầu
Bạn có bao giờ tự hỏi, khi bấm nút power của máy tính, cho đến khi cuối cùng nhìn thấy trang web trên trình duyệt, giữa đó đã xảy ra những gì?

Quá trình này giống như một **cuộc tiếp sức** — sau khi phần cứng được cấp điện sẽ đánh thức firmware, firmware kiểm tra xong sẽ trao quyền cho hệ điều hành, hệ điều hành chuẩn bị xong môi trường rồi mới chạy được trình duyệt, trình duyệt lại phải qua mạng để lấy trang web từ server ở xa. Mỗi một khâu đều **phụ thuộc vào sự hoàn thành thành công của khâu trước**, bất kỳ một khâu nào gián đoạn thì những bước sau cũng không thể tiến hành được.

Hiểu được toàn bộ chuỗi kết nối này, có thể giúp bạn xây dựng nhận thức toàn cảnh về hệ thống máy tính, cũng là con đường bắt buộc để trở thành một kỹ sư full-stack.
:::

**Bạn sẽ học được gì?**

Bài viết này theo đúng thứ tự thực tế xảy ra sự kiện, đưa bạn đi qua năm giai đoạn từ lúc bấm power đến nhìn thấy trang web:

1. **Khởi động phần cứng** (Phần 1) → Dòng điện như thế nào đánh thức CPU
2. **Tự kiểm tra firmware** (Phần 2) → BIOS/UEFI như thế nào xác nhận phần cứng bình thường và tìm thiết bị khởi động
3. **Khởi động hệ điều hành** (Phần 3) → Kernel như thế nào được tải, desktop như thế nào xuất hiện
4. **Mở trình duyệt** (Phần 4) → Ứng dụng như thế nào được hệ điều hành chạy
5. **Yêu cầu mạng** (Phần 5) → Từ nhập URL cho đến trang web được render, quá trình mạng hoàn chỉnh

Mỗi một bước đều xây dựng trên cơ sở của bước trước đó, không thể thiếu một bước nào.

---

## 1. Bấm công tắc: Phần cứng thức dậy

### 1.1 Khởi động nguồn điện

Khi bạn bấm nút power, **đơn vị nguồn điện (PSU)** bắt đầu hoạt động, chuyển đổi dòng điện xoay chiều (220V) thành dòng điện một chiều (12V, 5V, 3.3V, v.v.), cung cấp điện cho các linh kiện phần cứng.

```
Nút power → Đơn vị nguồn(PSU) → Đầu ra dòng điện một chiều → Cung cấp cho các linh kiện trên bo mạch chính
```

### 1.2 Chipset trên bo mạch chính thức dậy

Sau khi nguồn ổn định, **chipset trên bo mạch chính** bắt đầu hoạt động, nó giống như "nhân viên điều phối" của máy tính, chịu trách nhiệm phối hợp các linh kiện phần cứng.

### 1.3 CPU reset

CPU nhận được tín hiệu reset, xóa sạch tất cả các thanh ghi và bộ đệm bên trong, bắt đầu thực thi lệnh từ một địa chỉ được đặt trước. Địa chỉ này thường trỏ đến chip **BIOS/UEFI**.

<PowerOnDemo />

---

> **Hoàn thành đoạn tiếp sức thứ nhất** ⛳ Ở đây, phần công việc ở cấp độ phần cứng đã hoàn thành: nguồn điện chuyển đổi dòng điện xoay chiều thành dòng điện một chiều ổn định, chipset trên bo mạch chính được đánh thức và bắt đầu phối hợp các linh kiện, CPU cũng đã hoàn thành reset, xóa sạch các thanh ghi, sẵn sàng thực thi lệnh đầu tiên.
>
> Nhưng chú ý — lúc này CPU giống như một "em bé vừa mở mắt". Nó có thể thực thi lệnh, nhưng không biết gì về môi trường xung quanh: máy tính có bao nhiêu bộ nhớ? Card đồ họa có sử dụng được không? Ổ cứng ở đâu? Nên khởi động hệ điều hành từ thiết bị nào? Những câu hỏi này CPU không thể tự trả lời.
>
> Vì vậy, lệnh đầu tiên mà CPU thực thi sau khi reset, là nhảy đến một **địa chỉ bộ nhớ cố định** — địa chỉ này trỏ đến chip firmware BIOS/UEFI được hàn trực tiếp trên bo mạch chính. Từ lúc này, quyền kiểm soát chuyển từ phần cứng thuần túy sang firmware. Nhiệm vụ của BIOS/UEFI rất rõ ràng: **kiểm tra tất cả phần cứng có hoạt động bình thường không, sau đó tìm hệ điều hành và khởi động nó**. Đây là đoạn tiếp sức thứ hai.

## 2. BIOS/UEFI: Tự kiểm tra phần cứng

<BiosUefiInteractiveDemo />

---

> **Hoàn thành đoạn tiếp sức thứ hai** ⛳ BIOS/UEFI đã hoàn thành xuất sắc ba nhiệm vụ của nó: thông qua tự kiểm tra POST xác nhận bộ nhớ, card đồ họa, bàn phím, v.v. tất cả hoạt động bình thường; khởi tạo chế độ hoạt động của các phần cứng; theo thứ tự khởi động tìm thấy khối khởi động trên ổ cứng.
>
> Nhưng vai trò của BIOS/UEFI kết thúc ở đây — bản chất nó là một "bác sỹ kiểm tra + nhân viên điều phối". Nó có thể kiểm tra phần cứng có khỏe hay không, có thể quyết định khởi động từ thiết bị nào, nhưng nó không quản lý tập tin của bạn, không chạy ứng dụng của bạn, cũng không hiển thị cho bạn một desktop đẹp mắt. Những tác vụ phức tạp này cần một phần mềm mạnh mẽ hơn để tiếp quản — đó là **hệ điều hành**.
>
> Cách giao phó rất cụ thể: BIOS/UEFI đọc code chương trình khởi động trong khối đầu tiên của ổ cứng (khối khởi động), tải nó vào bộ nhớ, sau đó để CPU nhảy đến code này bắt đầu thực thi. Từ lúc này, quyền kiểm soát chính thức chuyển từ firmware sang chương trình khởi động của hệ điều hành. Chương trình khởi động sẽ từng bước tải kernel của hệ điều hành vào, khởi động các dịch vụ hệ thống, cuối cùng trình bày desktop mà bạn quen thuộc. Đoạn tiếp sức phức tạp nhất trong chuỗi kết nối này bắt đầu rồi.

## 3. Khởi động hệ điều hành: Từ kernel đến desktop

<OSBootInteractiveDemo />

---

> **Hoàn thành đoạn tiếp sức thứ ba** ⛳ Hệ điều hành đã khởi động hoàn toàn, desktop hiện lên trước mắt bạn. Hãy xem lại đoạn tiếp sức này đã làm gì: chương trình khởi động đọc kernel từ ổ cứng, kernel tiếp quản quyền kiểm soát CPU và bộ nhớ, các dịch vụ hệ thống khởi động từng cái (mạng, âm thanh, trung tâm bảo mật, ...), cuối cùng giao diện đồ họa render desktop.
>
> Lúc này hệ điều hành giống như một tòa nhà đã được cấp nước cấp điện, ban quản lý đã có mặt — **quản lý tiến trình** chịu trách nhiệm phân bổ phòng cho mỗi cư dân (chương trình), **quản lý bộ nhớ** chịu trách nhiệm phân bổ không gian, **hệ thống tệp** chịu trách nhiệm quản lý kho, **ngăn xếp giao thức mạng** chịu trách nhiệm liên lạc với bên ngoài. Những "dịch vụ công cộng" này là cơ sở hạ tầng để mọi ứng dụng hoạt động, không có chúng, không có chương trình nào có thể khởi động.
>
> Bây giờ bạn muốn truy cập mạng, vì vậy đã nhấp đôi vào biểu tượng trình duyệt trên desktop. Đằng sau hành động đơn giản này, hệ điều hành phải thực hiện một loạt công việc: tìm file thực thi của trình duyệt ở vị trí nào trên ổ cứng, tạo một tiến trình độc lập cho nó, phân bổ không gian bộ nhớ, tải code chương trình ... Đây là biểu hiện trực tiếp của khả năng "quản lý tiến trình" của hệ điều hành. Tiếp theo, hãy xem trình duyệt được khởi động như thế nào.

## 4. Mở trình duyệt: Khởi động ứng dụng

### 4.1 Quá trình khởi động ứng dụng

Khi bạn nhấp đôi vào biểu tượng trình duyệt, hệ điều hành sẽ:

1. **Tìm file thực thi**: Dựa trên liên kết tệp, tìm `.exe` của trình duyệt (Windows) hoặc file thực thi
2. **Tạo tiến trình**: Tạo một **tiến trình** mới cho trình duyệt
3. **Tải chương trình**: Tải code trình duyệt từ ổ cứng vào bộ nhớ
4. **Khởi tạo**: Khởi động thread chính của trình duyệt, engine render, engine mạng, v.v.

```
Quá trình khởi động trình duyệt:
┌─────────────────────────────────────┐
│  1. Nhấp đôi vào biểu tượng         │
│  2. OS tìm file thực thi trình duyệt│
│  3. Tạo tiến trình trình duyệt      │
│  4. Tải code trình duyệt vào bộ nhớ │
│  5. Khởi tạo các module (render, mạng, JS) │
│  6. Hiển thị cửa sổ trình duyệt     │
└─────────────────────────────────────┘
```

### 4.2 Các thành phần chính của trình duyệt

Trình duyệt hiện đại là một "hệ điều hành" phức tạp, được bao gồm các phần chính sau:

| Module | Chức năng |
|-----|------|
| **Giao diện người dùng** | Thanh địa chỉ, tab, bookmark, v.v. |
| **Engine trình duyệt** | Phối hợp UI và engine render |
| **Engine render** | Phân tích HTML/CSS, hiển thị trang web |
| **Engine JavaScript** | Thực thi code JavaScript |
| **Module mạng** | Gửi HTTP request |
| **Backend UI** | Vẽ các thành phần UI cơ bản |
| **Lưu trữ dữ liệu** | Cookie, LocalStorage, v.v. |

<BrowserArchitectureDemo />

---

> **Hoàn thành đoạn tiếp sức thứ tư** ⛳ Trình duyệt đã khởi động thành công. Hệ điều hành tạo một tiến trình độc lập cho nó, phân bổ không gian bộ nhớ, các module của trình duyệt cũng đã khởi tạo xong: engine render sẵn sàng phân tích HTML/CSS, engine JavaScript sẵn sàng thực thi script, module mạng sẵn sàng gửi và nhận dữ liệu.
>
> Bạn có thể hình dung trình duyệt lúc này như một chiếc xe đã khởi động — động cơ đang chạy, bảng đèn sáng, hệ thống định vị đã sẵn sàng, nhưng chiếc xe vẫn đứng yên vì tài xế (bạn) chưa nói với nó "đi đâu". Cửa sổ trình duyệt lúc này trống trơn, thanh địa chỉ nhấp nháy chờ bạn nhập liệu.
>
> Khi bạn gõ `https://www.example.com` vào thanh địa chỉ và bấm Enter, một cuộc hành trình vượt qua toàn bộ Internet bắt đầu rồi. Module mạng của trình duyệt sẽ tiếp quản yêu cầu này: trước tiên phân tích cấu trúc URL, sau đó qua DNS dịch tên miền thành địa chỉ IP, rồi vượt qua mạng để thiết lập kết nối TCP với server ở xa, thương lượng kênh mã hóa, gửi HTTP request, chờ đợi phản hồi của server, cuối cùng giao code HTML/CSS/JS mà nhận được cho engine render để vẽ thành trang web bạn nhìn thấy. Đây là đoạn tiếp sức có bước đi nhiều nhất, liên quan đến protocol phong phú nhất trong toàn bộ chuỗi tiếp sức — và cũng là phần mà lập trình viên web cần hiểu rõ nhất.

## 5. Truy cập URL: Toàn bộ quá trình yêu cầu mạng

### 5.1 URL là gì?

**URL (Uniform Resource Locator)** là địa chỉ của tài nguyên, giống như địa chỉ trong đời sống, dùng để định vị tài nguyên trên Internet.

```
Cấu trúc URL:
┌─────────────────────────────────────────────────────────┐
│  https://  │  www.example.com  │  /path/to/page  │ ?query=1 │
│  Protocol  │    Tên miền       │      Đường dẫn  │   Truy vấn│
└─────────────────────────────────────────────────────────┘
```

- **Protocol**: Cách thức truy cập (http, https, ftp, v.v.)
- **Tên miền**: Địa chỉ server
- **Đường dẫn**: Vị trí tài nguyên trên server
- **Truy vấn**: Tham số bổ sung

### 5.2 Quá trình hoàn chỉnh khi truy cập URL

Khi bạn truy cập `https://www.example.com`, những điều này xảy ra:

<URLRequestDemo />

#### Bước đầu tiên: Phân tích URL

Trình duyệt trước tiên **phân tích URL**, trích xuất protocol, tên miền, đường dẫn, v.v.

```
Quá trình phân tích URL:
https://www.example.com/index.html
  ↓
Protocol: https
Tên miền: www.example.com
Đường dẫn: /index.html
```

#### Bước thứ hai: DNS resolution

Máy tính truy cập server qua mạng, nhưng mạng dùng **địa chỉ IP** (ví dụ như 93.184.216.34), chứ không phải tên miền. Vì vậy cần chuyển đổi tên miền thành địa chỉ IP, quá trình này gọi là **DNS resolution**.

```
Quy trình DNS resolution:
┌─────────────────────────────────────────────────────────┐
│  Bộ nhớ đệm trình duyệt → Tệp hosts → Bộ nhớ đệm DNS địa phương → Server DNS  │
└─────────────────────────────────────────────────────────┘

Quá trình thực tế:
1. Trình duyệt kiểm tra bộ nhớ đệm (đã truy cập trước đó chưa?)
2. Hệ điều hành kiểm tra bộ nhớ đệm DNS
3. Gửi yêu cầu truy vấn đến server DNS
4. Server DNS trả về địa chỉ IP
```

#### Bước thứ ba: Thiết lập kết nối TCP

Sau khi có địa chỉ IP, trình duyệt cần thiết lập **kết nối TCP** với server. TCP là giao thức tầng vận chuyển, đảm bảo truyền dữ liệu một cách tin cậy.

```
Bắt tay ba chiều TCP:
┌─────────────────────────────────────────────────────────┐
│  Client → Server: SYN (yêu cầu đồng bộ)                 │
│  Server → Client: SYN-ACK (xác nhận và đồng bộ)         │
│  Client → Server: ACK (xác nhận)                         │
│                        ↓                                │
│  Kết nối được thiết lập!                               │
└─────────────────────────────────────────────────────────┘
```

Nếu là **HTTPS**, cần phải thực hiện **bắt tay TLS/SSL**, thiết lập kênh mã hóa.

#### Bước thứ tư: Gửi HTTP request

Sau khi kết nối được thiết lập, trình duyệt gửi **HTTP request** đến server:

```
Định dạng HTTP request:
┌─────────────────────────────────────────────────────────┐
│  GET /index.html HTTP/1.1                              │
│  Host: www.example.com                                 │
│  User-Agent: Mozilla/5.0...                             │
│  Accept: text/html                                     │
│                                                         │
│  (dòng trống)                                           │
└─────────────────────────────────────────────────────────┘
```

Các HTTP method thường gặp:

| Method | Ý nghĩa | Mục đích |
|-----|------|-----|
| **GET** | Lấy tài nguyên | Duyệt trang web |
| **POST** | Gửi dữ liệu | Đăng nhập, gửi form |
| **PUT** | Upload tài nguyên | Upload file |
| **DELETE** | Xóa tài nguyên | Xóa dữ liệu |

#### Bước thứ năm: Server xử lý request

Server (thường là **web server** như Nginx, Apache) nhận yêu cầu:

1. **Phân tích request**: Hiểu client muốn gì
2. **Xử lý business logic**: Gọi chương trình backend (như Python, Node.js, Java)
3. **Truy vấn database**: Lấy dữ liệu cần thiết
4. **Tạo response**: Sắp xếp dữ liệu thành HTML, JSON, v.v.

```
Quy trình xử lý server:
┌─────────────────────────────────────────────────────────┐
│  1. Web server nhận request (Nginx/Apache)              │
│  2. Theo đường dẫn tìm chương trình xử lý tương ứng     │
│  3. Thực thi code backend (API, business logic)         │
│  4. Nếu cần truy vấn database, lấy dữ liệu             │
│  5. Sắp xếp response (HTML/JSON/CSS/JS)               │
│  6. Trả về HTTP response                               │
└─────────────────────────────────────────────────────────┘
```

#### Bước thứ sáu: Trả về HTTP response

Server trả về **HTTP response**, bao gồm status code, response headers và response body:

```
Định dạng HTTP response:
┌─────────────────────────────────────────────────────────┐
│  HTTP/1.1 200 OK                                       │
│  Content-Type: text/html                               │
│  Content-Length: 1234                                  │
│                                                         │
│  <!DOCTYPE html>                                       │
│  <html>...</html>                                      │
└─────────────────────────────────────────────────────────┘
```

Status codes thường gặp:

| Status code | Ý nghĩa |
|-------|------|
| **200** | Thành công |
| **301/302** | Chuyển hướng |
| **404** | Không tìm thấy tài nguyên |
| **500** | Lỗi server |

#### Bước thứ bảy: Trình duyệt render trang

Trình duyệt nhận response, bắt đầu **render trang**:

<RenderingDemo />

1. **Phân tích HTML**: Xây dựng DOM tree
2. **Phân tích CSS**: Tính toán style, xây dựng render tree
3. **Thực thi JavaScript**: Chạy code JS trên trang
4. **Vẽ trang**: Hiển thị nội dung lên màn hình

```
Quá trình render trình duyệt:
┌─────────────────────────────────────────────────────────┐
│  1. Phân tích HTML → DOM tree                          │
│  2. Phân tích CSS → Quy tắc style                      │
│  3. DOM + CSS → Render tree                            │
│  4. Tính toán layout → Kích thước và vị trí của mỗi phần tử │
│  5. Vẽ → Hiển thị pixel lên màn hình                   │
│  6. Composite → Kết hợp nhiều lớp hiển thị             │
└─────────────────────────────────────────────────────────┘
```

---

> **Hoàn thành đoạn tiếp sức cuối cùng** ⛳ Trang web cuối cùng cũng hiển thị trước mắt bạn rồi! Hãy xem lại đoạn tiếp sức cuối cùng trải qua bao nhiêu bước: trình duyệt phân tích URL trích xuất protocol và tên miền, qua DNS từng bước truy vấn dịch tên miền thành địa chỉ IP, sau bắt tay ba chiều TCP với server thiết lập kết nối tin cậy, rồi qua bắt tay TLS thiết lập kênh mã hóa, sau đó gửi HTTP request, server xử lý business logic, truy vấn database, sắp xếp dữ liệu response trả về, cuối cùng engine render của trình duyệt phân tích HTML thành DOM tree, CSS tính toán thành quy tắc style, hai thứ này kết hợp thành render tree, tính toán layout, vẽ pixel từng cái lên màn hình.
>
> Bây giờ, hãy kéo xa góc nhìn, từ đầu đến cuối xem xét toàn bộ cuộc tiếp sức này. Tính từ lúc bấm công tắc power: dòng điện đánh thức phần cứng (đoạn thứ 1) → firmware kiểm tra thiết bị và tìm ổ khởi động (đoạn thứ 2) → hệ điều hành từ kernel đến desktop khởi động hoàn chỉnh (đoạn thứ 3) → trình duyệt là ứng dụng được hệ điều hành chạy (đoạn thứ 4) → yêu cầu mạng vượt Internet lấy dữ liệu và render thành trang (đoạn thứ 5). Năm đoạn liên kết với nhau, mỗi đoạn đều xây dựng trên thành quả của đoạn trước, thiếu bất kỳ một khâu nào, bạn cũng không thể nhìn thấy trang web trước mắt này.
>
> Tiếp theo, hãy dùng một sơ đồ quy trình hoàn chỉnh để nối năm giai đoạn này lại, trực quan xem qua mối liên hệ phụ thuộc giữa chúng.

## 6. Tổng kết quá trình hoàn chỉnh

Hãy nối toàn bộ quá trình lại:

<FullProcessDemo />

```
Quy trình hoàn chỉnh từ bấm nút power đến truy cập website:

┌──────────────────────────────────────────────────────────────────┐
│  1. Bấm nút power                                                 │
│     └── Khởi động power → Đánh thức bo mạch → CPU reset → Chạy BIOS/UEFI │
├──────────────────────────────────────────────────────────────────┤
│  2. BIOS/UEFI khởi động                                          │
│     └── Tự kiểm tra hardware → Tìm thiết bị khởi động → Đọc boot loader │
├──────────────────────────────────────────────────────────────────┤
│  3. Hệ điều hành khởi động                                       │
│     └── Boot loader → Tải kernel → Khởi động service → Hiển thị desktop │
├──────────────────────────────────────────────────────────────────┤
│  4. Mở trình duyệt                                               │
│     └── Nhấp đôi biểu tượng → Tạo process → Tải chương trình → Hiển thị cửa sổ │
├──────────────────────────────────────────────────────────────────┤
│  5. Truy cập URL                                                 │
│     └── Phân tích URL → DNS resolution → TCP connection → HTTP request │
│         → Xử lý server → HTTP response → Render trình duyệt → Hiển thị trang │
└──────────────────────────────────────────────────────────────────┘
```

---

> Nhìn toàn bộ chuỗi kết nối, bạn sẽ phát hiện một quy luật thú vị: mỗi giai đoạn giải quyết các vấn đề hoàn toàn khác nhau, công nghệ phía sau cũng hoàn toàn khác. Đoạn thứ 1 là lĩnh vực **kỹ thuật điện tử** — chuyển đổi nguồn điện, thiết kế mạch điện, truyền tín hiệu; đoạn thứ 2 thuộc **lập trình firmware** — dùng code bậc thấp để kiểm soát trực tiếp phần cứng; đoạn thứ 3 là thế giới **hệ điều hành** — lập lịch tiến trình, quản lý bộ nhớ, hệ thống tệp, đây là chủ đề cơ bản của khoa học máy tính; đoạn thứ 4 liên quan **phát triển ứng dụng** — làm thế nào để thiết kế một kiến trúc phần mềm phức tạp như trình duyệt; đoạn thứ 5 vượt qua **mạng máy tính** và **phát triển frontend** — từ các giao thức mạng như DNS, TCP/IP, HTTP, đến phân tích và render HTML/CSS/JS.
>
> Điều này cũng giải thích tại sao "kỹ sư full-stack" cần một kiến thức rộng: mỗi dòng code frontend của bạn, cuối cùng cũng phải đi qua toàn bộ chuỗi kết nối này mới có thể hiển thị cho người dùng. Hiểu được mỗi khâu trong chuỗi, có thể giúp bạn nhanh chóng định vị vấn đề khi gặp lỗi — là vấn đề ở tầng mạng? Vấn đề ở server? Hay là vấn đề ở render của trình duyệt?
>
> Sơ đồ kiến thức dưới đây sắp xếp rõ những lĩnh vực công nghệ này, cũng chỉ rõ hướng cho bạn học sâu sau này.

## 7. Sơ đồ kiến thức

Lĩnh vực kiến thức liên quan trong chương này:

```
Tổng quan hệ thống máy tính
├── Cơ sở phần cứng
│   ├── Nguồn điện (PSU)
│   ├── Chipset trên bo mạch chính
│   └── CPU
├── BIOS/UEFI
│   ├── POST self-check
│   ├── Thứ tự khởi động
│   └── Boot loader
├── Hệ điều hành
│   ├── Kernel
│   ├── Dịch vụ hệ thống
│   └── Môi trường desktop
├── Ứng dụng
│   ├── Quản lý tiến trình
│   └── Tải chương trình
└── Liên lạc mạng
    ├── DNS resolution
    ├── Giao thức TCP/IP
    ├── Giao thức HTTP
    └── Render trình duyệt
```

::: tip Tiếp tục học tập
Nếu bạn muốn hiểu sâu một khâu nào đó, có thể tiếp tục học:

- **Từ bóng bán dẫn đến CPU**: Tìm hiểu cơ sở phần cứng máy tính
- **Hệ điều hành (tiến trình/bộ nhớ/hệ thống tệp)**: Hiểu sâu hơn về hệ điều hành
- **Mạng máy tính**: Hiểu sâu hơn về giao thức mạng
:::
