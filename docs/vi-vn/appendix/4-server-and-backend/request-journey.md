# Hành trình hoàn chỉnh của một yêu cầu

::: tip Lời tựa
**Khi bạn nhập một URL trong trình duyệt và nhấn Enter, cho đến khi trang được hiển thị, chuyện gì đã xảy ra ở giữa?** Đây là câu hỏi kinh điển trong phỏng vấn, nhưng quan trọng hơn, nó là chìa khóa để hiểu toàn bộ kiến trúc Web. Khi bạn hiểu rõ đường dẫn này, bạn sẽ hiểu cách frontend, backend, mạng, và cơ sở dữ liệu hoạt động cùng nhau.
:::

**Bài viết này sẽ dạy bạn những gì?**

Sau khi hoàn thành chương này, bạn sẽ có được:

- **Góc nhìn toàn chuỗi**: Hiểu quá trình hoàn chỉnh của một yêu cầu HTTP từ khi gửi đến khi nhận phản hồi
- **Nhận thức về trách nhiệm từng tầng**: DNS, TCP, cân bằng tải, máy chủ Web, máy chủ ứng dụng, cơ sở dữ liệu mỗi cái làm gì
- **Khả năng định vị vấn đề**: Khi yêu cầu chậm hoặc thất bại, biết bắt đầu từ tầng nào để kiểm tra
- **Ý tưởng tối ưu hóa hiệu suất**: Mỗi tầng đều có không gian để tối ưu hóa, biết điểm tối ưu ở đâu

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|-----------------|
| **Chương 1** | Trình duyệt gửi yêu cầu | DNS resolution, TCP connection, HTTP request |
| **Chương 2** | Truyền tải mạng | Routing, CDN, load balancing |
| **Chương 3** | Xử lý máy chủ | Web server, application logic, database queries |
| **Chương 4** | Phản hồi trả về | Serialization, compression, rendering |
| **Chương 5** | Tối ưu hóa toàn chuỗi | Caching, connection reuse, asynchronous processing |

---

## 0. Toàn cảnh: Một yêu cầu trải qua những gì?

Để hiểu, hãy dùng một phép so sánh: bạn mua sách trực tuyến, quá trình này lạ lùng giống với một yêu cầu HTTP.

| Giai đoạn yêu cầu | So sánh mua sách | Tương ứng kỹ thuật |
|-------------------|-----------------|-------------------|
| Nhập URL | Bạn nói "Tôi muốn đi đến một cửa hàng sách nào đó" | Trình duyệt phân tích URL |
| DNS resolution | Tìm địa chỉ cửa hàng bằng bản đồ | Domain name → IP address |
| TCP connection | Đi đến cửa hàng, mở cửa | Ba lần bắt tay thiết lập kết nối |
| Gửi yêu cầu | Nói với nhân viên "Tôi muốn quyển sách 'xxx'" | HTTP request message |
| Xử lý máy chủ | Nhân viên đi kho tìm sách, kiểm tra hàng, tính giá | Application logic + database queries |
| Trả về phản hồi | Nhân viên đưa sách cho bạn | HTTP response message |
| Rendering trình duyệt | Bạn mở sách và bắt đầu đọc | HTML/CSS/JS parsing and rendering |

<RequestJourneyFlow />

---

## 1. Trình duyệt gửi yêu cầu

### 1.1 Phân tích URL

Khi bạn nhập `https://api.example.com/books?id=123`, trình duyệt sẽ tách nó thành các phần:

| Phần | Giá trị | Ý nghĩa |
|-----|--------|---------|
| Protocol | `https` | Giao tiếp bằng cách mã hóa |
| Domain | `api.example.com` | "Tên" của máy chủ |
| Path | `/books` | Tài nguyên cần truy cập |
| Query parameters | `id=123` | Điều kiện bổ sung |

### 1.2 DNS resolution: Domain → IP address

Máy tính không nhận biết tên miền, chỉ nhận biết địa chỉ IP (như `93.184.216.34`). DNS là "danh bạ điện thoại" của Internet.

```
Browser cache → System cache → Router cache → ISP DNS → Root nameserver
     ↓ Nếu trúng thì dùng trực tiếp, nếu không thì tiếp tục tìm
```

::: tip Ý nghĩa của DNS caching

Nếu mỗi lần yêu cầu đều phải truy vấn từ máy chủ tên miền gốc, Internet toàn cầu sẽ bị DNS queries nghẽn. Vì vậy, mỗi tầng đều có bộ đệm, và hầu hết các yêu cầu có thể được giải quyết ở tầng trình duyệt hoặc hệ thống.

:::

### 1.3 TCP three-way handshake

Sau khi tìm thấy địa chỉ IP, trình duyệt cần "thiết lập kết nối" với máy chủ. TCP sử dụng ba lần bắt tay để đảm bảo cả hai bên đã sẵn sàng:

```
Client → Server: Xin chào, tôi muốn kết nối (SYN)
Server → Client: Được, tôi đã sẵn sàng (SYN + ACK)
Client → Server: Đã nhận, bắt đầu giao tiếp (ACK)
```

Nếu là HTTPS, cần thêm bắt tay TLS để thương lượng phương thức mã hóa.

### 1.4 Gửi yêu cầu HTTP

Sau khi kết nối được thiết lập, trình duyệt gửi thông báo yêu cầu HTTP:

```http
GET /books?id=123 HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer eyJhbGci...
User-Agent: Chrome/120.0
```

| Thành phần | Nội dung |
|-----------|---------|
| Request line | Method (GET) + path + protocol version |
| Request headers | Metadata: authentication, expected data format, etc. |
| Request body | Chỉ POST/PUT requests có, mang dữ liệu cần gửi |

---

## 2. Network transmission: Request on the way

### 2.1 Router forwarding

Sau khi yêu cầu rời khỏi máy tính của bạn, nó sẽ được chuyển tiếp qua nhiều bộ định tuyến, giống như hàng gửi qua nhiều trung tâm chuyển tiếp:

```
Máy tính của bạn → Bộ định tuyến gia đình → Mạng nhà cung cấp → Mạng lõi → Trung tâm dữ liệu mục tiêu
```

Mỗi bộ định tuyến quyết định "bước nhảy tiếp theo" dựa trên địa chỉ IP. Bạn có thể dùng lệnh `traceroute` để xem yêu cầu đã đi qua những nút nào.

### 2.2 CDN acceleration

Nếu trang web đích sử dụng CDN (Content Delivery Network), yêu cầu có thể không cần đến máy chủ nguồn:

| Tình huống | Hướng đi |
|-----------|---------|
| Yêu cầu tài nguyên tĩnh (hình ảnh, CSS, JS) | Nút edge CDN trả về trực tiếp |
| Yêu cầu dữ liệu động (API) | Xuyên qua CDN, đến máy chủ nguồn |

Bản chất của CDN là "đặt nội dung trước ở vị trí gần nhất với người dùng".

### 2.3 Load balancing

Các trang web lớn không chỉ có một máy chủ. Bộ cân bằng tải chịu trách nhiệm phân phối yêu cầu tới nhiều máy chủ:

```
User request → Load balancer → Server A (30% traffic)
                            → Server B (30% traffic)
                            → Server C (40% traffic)
```

Các chiến lược phân phối phổ biến:

| Chiến lược | Nguyên lý | Tình huống áp dụng |
|-----------|---------|-------------------|
| Round robin | Phân phối tuần tự | Cấu hình máy chủ giống nhau |
| Weighted round robin | Phân phối theo trọng số | Cấu hình máy chủ khác nhau |
| IP hash | Cùng một người dùng cố định ở một máy | Cần duy trì phiên |
| Least connections | Gán cho cái có kết nối ít nhất hiện tại | Thời gian xử lý yêu cầu khác nhau lớn |

---

## 3. Server processing: Điều gì xảy ra trong bếp

Sau khi yêu cầu đến máy chủ, nó sẽ trải qua nhiều lớp xử lý.

### 3.1 Web server (Nginx / Apache)

Thứ đầu tiên nhận yêu cầu thường là máy chủ Web, nó chịu trách nhiệm:

| Trách nhiệm | Giải thích |
|-----------|-----------|
| Cung cấp tệp tĩnh | Trả về trực tiếp HTML, CSS, JS, hình ảnh |
| Reverse proxy | Chuyển tiếp các yêu cầu API cho ứng dụng backend |
| SSL termination | Xử lý mã hóa/giải mã HTTPS |
| Request filtering | Chặn các yêu cầu độc hại, giới hạn tốc độ |

### 3.2 Application server processing

Máy chủ Web chuyển tiếp yêu cầu cho máy chủ ứng dụng (Node.js, Spring, Django, v.v.), quy trình xử lý:

```
Request enters → Middleware chain → Route matching → Controller → Service layer → Data access layer
```

**Middleware** làm những gì:

1. Phân tích phần thân yêu cầu (JSON, dữ liệu biểu mẫu)
2. Xác thực danh tính (kiểm tra Token)
3. Kiểm tra quyền (người dùng này có thể truy cập interface này không?)
4. Ghi nhật ký (ai truy cập cái gì vào lúc nào)

### 3.3 Database queries

Hầu hết các yêu cầu cuối cùng đều phải tương tác với cơ sở dữ liệu:

```
Application code: SELECT * FROM books WHERE id = 123
    ↓
Database engine: Parse SQL → Optimize query → Execution plan → Read data
    ↓
Return result: { id: 123, title: "xxx", price: 59.9 }
```

::: tip Cơ sở dữ liệu là nút cổ chai hiệu suất phổ biến nhất

Truyền tải mạng thường là mức mili giây, logic ứng dụng cũng nhanh, nhưng một truy vấn cơ sở dữ liệu không có chỉ mục có thể mất vài giây thậm chí hàng chục giây. Vì vậy "yêu cầu chậm" có khả năng cao là do truy vấn cơ sở dữ liệu chậm.

:::

---

## 4. Response return: Journey home of data

### 4.1 Constructing HTTP response

Sau khi máy chủ xử lý xong, nó xây dựng thông báo phản hồi:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Encoding: gzip
Cache-Control: max-age=3600

{"id": 123, "title": "xxx", "price": 59.9}
```

| Thành phần | Nội dung |
|-----------|---------|
| Status line | Protocol version + status code (200 success, 404 not found, 500 server error) |
| Response headers | Data format, caching policy, compression method, etc. |
| Response body | Actual data content (JSON, HTML, etc.) |

### 4.2 Data compression

Máy chủ thường sử dụng gzip hoặc brotli nén phần thân phản hồi, giảm lượng truyền tải:

| Thuật toán nén | Tỷ lệ nén | Tốc độ |
|-------------|----------|--------|
| gzip | Khoảng 70% | Nhanh |
| brotli | Khoảng 80% | Chậm hơn nhưng nén tốt hơn |

Một JSON 100KB, sau khi nén có thể chỉ còn 20-30KB.

### 4.3 Browser rendering

Sau khi trình duyệt nhận phản hồi:

1. **Parse HTML** → Build DOM tree
2. **Parse CSS** → Build style tree
3. **Merge** → Generate render tree
4. **Layout** → Calculate position and size of each element
5. **Paint** → Draw pixels on screen

<RequestTimeline />

---

## 5. Full-chain optimization: Every layer can be faster

### 5.1 Optimization techniques for each layer

| Tầng | Kỹ thuật tối ưu | Hiệu quả |
|-----|-----------|---------|
| DNS | DNS prefetching, using fast DNS service | Giảm thời gian truy vấn DNS |
| Network | CDN, HTTP/2, connection reuse | Giảm độ trễ truyền tải |
| Server | Caching (Redis), asynchronous processing | Giảm thời gian xử lý |
| Database | Indexes, query optimization, read-write separation | Giảm thời gian truy vấn |
| Frontend | Lazy loading, code splitting, resource compression | Giảm thời gian render |

### 5.2 Caching: Most effective optimization

Bộ đệm tồn tại ở mỗi tầng của chuỗi yêu cầu:

```
Browser cache → CDN cache → Reverse proxy cache → Application cache (Redis) → Database cache
```

::: tip Bản chất của caching

Tráo đổi không gian lấy thời gian. Lưu kết quả đã tính toán, lần tới dùng trực tiếp, không cần tính lại. Mỗi khi tỷ lệ hit cache tăng 10%, hiệu suất hệ thống có thể cải thiện gấp bội.

:::

### 5.3 Troubleshooting when request fails

| Hiện tượng | Tầng vấn đề có thể | Phương pháp kiểm tra |
|-----------|-----------------|-------------------|
| Không có phản hồi | DNS / Network | ping, nslookup |
| Connection timeout | Network / Server down | telnet, curl |
| Return 4xx | Client request error | Check URL, parameters, Token |
| Return 5xx | Server internal error | Check server logs |
| Response slow | Database / Application logic | Check slow query logs, APM tools |

---

## 6. Tóm tắt

Hành trình hoàn chỉnh của một yêu cầu HTTP:

1. **Browser**: Parse URL → DNS query → TCP connection → Send request
2. **Network**: Router forwarding → CDN decision → Load balancing distribution
3. **Server**: Web server receives → Middleware processing → Business logic → Database query
4. **Return**: Construct response → Compression → Network transmission → Browser rendering

::: tip Giá trị của hiểu rõ toàn chuỗi

Khi bạn có thể vẽ ra đường dẫn hoàn chỉnh của yêu cầu trong đầu, bạn có thể nhanh chóng xác định được vấn đề ở tầng nào. Đây là bước ngoặt quan trọng từ "lập trình viên cấp junior" đến "có khả năng tự xử lý vấn đề".

:::

---

## Đọc thêm

- [Hướng dẫn HTTP Authoritative](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) — Tài liệu HTTP của MDN
- [High Performance Browser Networking](https://hpbn.co/) — Tối ưu hóa hiệu suất mạng trình duyệt
- [What happens when...](https://github.com/alex/what-happens-when) — Chi tiết kinh điển "Điều gì xảy ra sau khi nhập URL"
