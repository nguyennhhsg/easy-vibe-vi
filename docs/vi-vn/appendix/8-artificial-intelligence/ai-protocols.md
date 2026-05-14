# Giao thức AI Agent (MCP & A2A)

::: tip Câu hỏi cốt lõi
**AI Agent giao tiếp với thế giới bên ngoài như thế nào?** Giống như Internet cần giao thức HTTP, AI Agent cũng cần các giao thức giao tiếp tiêu chuẩn. Chương này giới thiệu hai giao thức Agent phổ biến nhất: MCP và A2A, chúng lần lượt giải quyết vấn đề giao tiếp giữa AI và công cụ, cũng như giữa Agent và Agent.
:::

---

## 0. Giao thức là gì?

Trong lĩnh vực máy tính, **giao thức (Protocol)** là một bộ quy tắc và quy ước tiêu chuẩn, cho phép các hệ thống, chương trình khác nhau có thể "hiểu" và "giao tiếp" với nhau.

### 0.1 Tại sao cần giao thức?

Hãy tưởng tượng một tình huống: bạn gửi bưu kiện cho bạn bè, cần phải điền địa chỉ. Nếu mỗi người viết địa chỉ theo một cách khác nhau, nhân viên giao hàng sẽ không thể giao được. Giao thức chính là quy định tiêu chuẩn "cách viết địa chỉ" — tỉnh, thành phố, quận, phố, số nhà, theo thứ tự này, ai cũng có thể hiểu.

Máy tính cũng giống vậy. Hai chương trình muốn giao tiếp, phải thỏa thuận trước:
- Dữ liệu có định dạng gì? (JSON? Nhị phân?)
- Làm thế nào để thiết lập kết nối? (Quy trình bắt tay)
- Nếu có lỗi thì sao? (Xử lý lỗi)

### 0.2 Các giao thức phổ biến trong máy tính

| Giao thức | Chức năng | Bạn dùng hàng ngày |
|-----------|----------|-------------------|
| **HTTP** | Giao thức truyền trang web | Mở trang web bằng trình duyệt |
| **HTTPS** | HTTP được mã hóa | Ngân hàng trực tuyến, trang thanh toán |
| **TCP/IP** | Giao thức cơ bản của Internet | Tất cả giao tiếp mạng |
| **DNS** | Giao thức phân giải tên miền | Chuyển `google.com` thành địa chỉ IP |
| **SMTP** | Giao thức gửi email | Gửi email |
| **WebSocket** | Giao tiếp hai chiều thời gian thực | Phần mềm chat, trò chơi trực tuyến |
| **SSH** | Đăng nhập từ xa an toàn | Kết nối máy chủ |
| **FTP** | Giao thức truyền tệp | Tải lên/tải xuống tệp |

Những giao thức này tạo thành nền tảng của Internet. Không có chúng, bạn không thể duyệt web, gửi email, xem video.

### 0.3 Giá trị của giao thức

Giá trị cốt lõi của giao thức là **tiêu chuẩn hóa** và **khả năng tương tác**:

- **Tiêu chuẩn hóa**: Mọi người tuân theo cùng một bộ quy tắc, giảm chi phí giao tiếp
- **Khả năng tương tác**: Các hệ thống từ các nhà cung cấp khác nhau, với các công nghệ khác nhau có thể kết nối mà không có vấn đề gì

Chẳng hạn giao thức HTTP, cho phép trình duyệt Chrome truy cập máy chủ Nginx, cho phép trình thu thập dữ liệu Python lấy dữ liệu từ trang web Java. Chrome và Nginx không cần "biết" nhau, chỉ cần cả hai tuân theo giao thức HTTP là được.

### 0.4 AI Agent cũng cần giao thức

Để AI Agent thực sự "làm việc", nó cần:
- Gọi các công cụ bên ngoài (kiểm tra thời tiết, gửi email, thao tác cơ sở dữ liệu)
- Hợp tác với các Agent khác (phân chia công việc để hoàn thành các tác vụ phức tạp)

Điều này yêu cầu các giao thức tiêu chuẩn để quy định "AI gọi công cụ như thế nào", "Agent giao tiếp với nhau như thế nào". Đây là nguồn gốc của **MCP** và **A2A**.

---

## 1. Các tầng của giao thức Agent

Trước khi tìm hiểu sâu về các giao thức cụ thể, hãy xem các tầng giao tiếp trong hệ sinh thái Agent:

| Tầng | Giao thức | Vấn đề được giải quyết | Loại so sánh |
|------|-----------|----------------------|-------------|
| **1** | Function Call | AI gọi hàm cục bộ như thế nào | Bộ não phát hành lệnh |
| **2** | **MCP** | AI kết nối các công cụ và nguồn dữ liệu bên ngoài như thế nào | Cổng USB-C |
| **3** | **A2A** | Agent hợp tác giao tiếp như thế nào | WeChat doanh nghiệp |

::: tip Giải thích từng dòng trong bảng
**Tầng 1 (Function Call)**: Đây là khả năng cơ bản nhất của mô hình lớn — phát ra dữ liệu có cấu trúc (JSON) để kích hoạt thực thi hàm. Đây là "nền tảng" của giao thức, nhưng bản thân nó giống như một khả năng hơn là một giao thức tiêu chuẩn.

**Tầng 2 (MCP)**: Model Context Protocol, được Anthropic phát hành vào tháng 11 năm 2024. Nó tiêu chuẩn hóa cách AI kết nối với các công cụ bên ngoài và nguồn dữ liệu, giống như USB-C đã thống nhất cách sạc các thiết bị khác nhau.

**Tầng 3 (A2A)**: Agent-to-Agent Protocol, được Google phát hành vào tháng 4 năm 2025. Nó cho phép các Agent khác nhau có thể phát hiện lẫn nhau, giao tiếp và hợp tác, giống như WeChat doanh nghiệp cho phép các đồng nghiệp có thể gửi nhiệm vụ, trò chuyện.
:::

Chương này tập trung vào hai giao thức chính thức của tầng 2, 3: MCP và A2A.

---

## 2. MCP (Model Context Protocol)

### 2.1 Thông tin cơ bản giao thức

| Mục | Nội dung |
|-----|---------|
| **Tên đầy đủ** | Model Context Protocol |
| **Bên phát động** | Anthropic |
| **Thời gian phát hành** | Ngày 25 tháng 11 năm 2024 |
| **Tài liệu chính thức** | [modelcontextprotocol.io](https://modelcontextprotocol.io) |
| **Giao thức mã nguồn mở** | MIT License |
| **GitHub** | [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol) |

::: tip Tại sao gọi là "Context Protocol"?
**Context (ngữ cảnh)** là chìa khóa để mô hình lớn hiểu được tác vụ. Ý tưởng cốt lõi của MCP là: **cho phép AI động lấy các thông tin ngữ cảnh cần thiết**, thay vì cho tất cả thông tin vào Prompt.

Chẳng hạn, khi AI cần đọc một tệp, nó không cần bạn sao chép và dán nội dung tệp cho nó, mà có thể truy cập trực tiếp hệ thống tệp thông qua MCP.
:::

### 2.2 Bối cảnh phát hành

Năm 2024, khi Claude 3.5 Sonnet được phát hành, Anthropic phát hiện một vấn đề: **mỗi công cụ phải được tích hợp riêng biệt**.

Hãy tưởng tượng:
- Bạn muốn cho phép AI đọc kho GitHub → phải viết mã tích hợp GitHub
- Bạn muốn cho phép AI truy vấn cơ sở dữ liệu → phải viết mã tích hợp cơ sở dữ liệu
- Bạn muốn cho phép AI thao tác hệ thống tệp → phải viết mã tích hợp hệ thống tệp

Mỗi tích hợp đều phải viết lại mã tương tự: xác thực, xử lý lỗi, chuyển đổi dữ liệu...

Anthropic đã viết trên blog chính thức:
> "We're introducing the Model Context Protocol (MCP), an open protocol that standardizes how applications provide context to LLMs."

**Mục tiêu cốt lõi**: Cho phép nhà phát triển công cụ viết mã một lần, tất cả các ứng dụng AI hỗ trợ MCP đều có thể sử dụng.

### 2.3 MCP là gì?

<McpVisualDemo />

**Ba khả năng cốt lõi**:

| Khả năng | Tiếng Anh | Chức năng | Ví dụ |
|---------|----------|---------|-------|
| **Công cụ** | Tools | Chức năng mà AI có thể gọi | Kiểm tra thời tiết, gửi email |
| **Tài nguyên** | Resources | Dữ liệu mà AI có thể đọc | Nội dung tệp, bản ghi cơ sở dữ liệu |
| **Gợi ý** | Prompts | Mẫu gợi ý được xác định trước | Mẫu đánh giá mã, mẫu viết |

### 2.4 Cách triển khai bên trong MCP

<McpDetailedDemo />

### 2.5 Sự tương tự: Cổng USB-C

MCP giống như **cổng USB-C**:

- **Trước đây**: Mỗi thiết bị có cổng sạc riêng (cổng tròn, cổng phẳng, nam châm...)
- **Bây giờ**: USB-C đã thống nhất sạc và truyền dữ liệu cho tất cả thiết bị
- **MCP**: Thống nhất cách AI kết nối với tất cả các công cụ

Nhà phát triển công cụ chỉ cần triển khai MCP Server một lần, tất cả các ứng dụng AI hỗ trợ MCP (Claude, Cursor, Windsurf, v.v.) đều có thể sử dụng trực tiếp.

### 2.6 Tình huống ứng dụng điển hình của MCP

| Tình huống | Giải thích | Ví dụ |
|-----------|-----------|-------|
| **Thao tác tệp cục bộ** | Cho phép AI đọc/sửa đổi tệp cục bộ | Đọc kho mã, phân tích tệp nhật ký |
| **Truy vấn cơ sở dữ liệu** | Cho phép AI truy vấn cơ sở dữ liệu trực tiếp | Truy vấn SQL, phân tích dữ liệu |
| **Gọi API** | Cho phép AI gọi các dịch vụ bên thứ ba | GitHub API, Slack, email |
| **Tích hợp công cụ phát triển** | Cho phép AI sử dụng công cụ phát triển | Thao tác Git, lệnh terminal |

**Trường hợp thực tế**:
- **Cursor/Windsurf**: Kết nối hệ thống tệp, Git, terminal thông qua MCP
- **Claude Desktop**: Kết nối phần mềm ghi chú, máy khách email thông qua MCP
- **Tập lệnh tự động**: Cho phép AI thực thi các tác vụ tự động (sao lưu, triển khai, đồng bộ dữ liệu)

---

## 3. A2A (Agent-to-Agent Protocol)

### 3.1 Thông tin cơ bản giao thức

| Mục | Nội dung |
|-----|---------|
| **Tên đầy đủ** | Agent-to-Agent Protocol |
| **Bên phát động** | Google |
| **Thời gian phát hành** | Ngày 9 tháng 4 năm 2025 |
| **Tài liệu chính thức** | [google.github.io/A2A](https://google.github.io/A2A) |
| **Giao thức mã nguồn mở** | Apache 2.0 |
| **GitHub** | [github.com/google/A2A](https://github.com/google/A2A) |

::: tip Tại sao Google phát động?
Google phát hành A2A tại hội nghị Cloud Next 2025, liên quan chặt chẽ đến chiến lược AI cấp doanh nghiệp.

Google tin rằng: Tương lai của AI doanh nghiệp không phải là một Agent siêu cấp, mà là **nhiều Agent chuyên biệt hợp tác** — có cái chịu trách nhiệm phân tích dữ liệu, có cái chịu trách nhiệm tạo mã, có cái chịu trách nhiệm xử lý tài liệu.

Những Agent này cần một cách tiêu chuẩn để giao tiếp với nhau, A2A ra đời.
:::

### 3.2 Bối cảnh phát hành

MCP giải quyết vấn đề "AI kết nối công cụ như thế nào", nhưng vẫn còn một vấn đề: **nhiều Agent hợp tác như thế nào?**

Hãy tưởng tượng một tình huống:
- Agent A là "chuyên gia phân tích yêu cầu"
- Agent B là "chuyên gia tạo mã"
- Agent C là "chuyên gia kiểm thử"

Người dùng nói: "Giúp tôi phát triển một tính năng đăng nhập"

Agent A phân tích yêu cầu, sau đó cần giao công việc cho Agent B; Agent B viết xong mã, cần cho Agent C kiểm thử. Chúng giao tiếp với nhau như thế nào?

Google đã viết trên blog chính thức:
> "A2A is an open protocol that enables AI agents to communicate with each other, facilitating collaboration across different frameworks and vendors."

**Mục tiêu cốt lõi**: Cho phép các Agent từ các nhà cung cấp khác nhau, các framework khác nhau hợp tác một cách liền mạch.

### 3.3 A2A là gì?

<A2AVisualDemo />

**Ba khái niệm cốt lõi**:

| Khái niệm | Tiếng Anh | Chức năng | Loại so sánh |
|----------|----------|---------|-------------|
| **Thẻ Agent** | Agent Card | Mô tả khả năng của Agent | Thẻ nhân viên |
| **Nhiệm vụ** | Task | Đơn vị công việc cần thực thi | Phiếu công việc |
| **Tin nhắn** | Message | Nội dung giao tiếp giữa các Agent | Lịch sử trò chuyện |

### 3.4 Cách triển khai bên trong A2A

<A2ADetailedDemo />

### 3.5 Sự tương tự: WeChat doanh nghiệp

A2A giống như **WeChat doanh nghiệp**:

- **Thẻ Agent**: Thẻ tên của mỗi người, hiển thị tên, phòng ban, trách nhiệm
- **Giao nhiệm vụ**: @người nào đó, giao một nhiệm vụ
- **Trò chuyện giao tiếp**: Trong quá trình thực thi nhiệm vụ có thể trò chuyện bất cứ lúc nào
- **Theo dõi nhiệm vụ**: Có thể xem tiến độ và trạng thái của nhiệm vụ

Các Agent khác nhau giống như các đồng nghiệp khác nhau, A2A cho phép chúng hợp tác hoàn thành các dự án phức tạp.

### 3.6 Tình huống ứng dụng điển hình của A2A

| Tình huống | Giải thích | Ví dụ |
|-----------|-----------|-------|
| **Phát triển phần mềm** | Nhiều Agent hợp tác hoàn thành tác vụ phát triển | Phân tích yêu cầu → mã → kiểm thử → triển khai |
| **Quy trình công việc doanh nghiệp** | Các Agent từ các bộ phận khác nhau hợp tác xử lý kinh doanh | Agent HR + Agent tài chính + Agent pháp lý |
| **Dịch vụ khách hàng thông minh** | Nhiều Agent chuyên biệt phân công xử lý | Tiếp nhận → trả lời → chuyển tiếp → ghi lại |
| **Phân tích dữ liệu** | Nhiều Agent hợp tác phân tích dữ liệu | Thu thập → làm sạch → phân tích → trực quan hóa → báo cáo |

**Trường hợp thực tế**:
- **Google Agent Space**: Nhiều Agent bên trong doanh nghiệp hợp tác xử lý tài liệu, email, lịch trình
- **Đội phát triển phần mềm**: Agent yêu cầu → Agent mã → Agent kiểm thử → Agent triển khai
- **Hệ thống dịch vụ khách hàng thông minh**: Agent tiếp nhận → Agent giải đáp chuyên biệt → Agent chuyển tiếp nhân viên

---

## 4. MCP vs A2A: So sánh và mối quan hệ

### 4.1 Sự khác biệt cốt lõi

| Khía cạnh | MCP | A2A |
|----------|-----|-----|
| **Bên phát động** | Anthropic (2024.11) | Google (2025.04) |
| **Định vị** | Kết nối AI và công cụ | Hợp tác Agent và Agent |
| **Phạm vi giao tiếp** | Client-Server | Peer-to-Peer |
| **Định dạng dữ liệu** | JSON-RPC 2.0 | HTTP + JSON |
| **Loại so sánh** | Cổng USB-C | WeChat doanh nghiệp |

### 4.2 Mối quan hệ của hai giao thức

MCP và A2A **không phải là quan hệ cạnh tranh, mà là quan hệ bổ sung**:

<ProtocolComparisonDemo />

### 4.3 Cách chọn?

| Tình huống | Lựa chọn |
|-----------|---------|
| Cho phép AI gọi hàm cục bộ hoặc công cụ | Function Call |
| Sử dụng công cụ bên thứ ba (cơ sở dữ liệu, API, hệ thống tệp) | MCP |
| Xây dựng hệ thống hợp tác đa Agent | A2A |
| Cần cả tích hợp công cụ và hợp tác đa Agent | MCP + A2A |

---

## 5. Xu hướng tương lai của giao thức

### 5.1 Phát triển hệ sinh thái

**Hệ sinh thái MCP** (tính đến đầu năm 2025):
- Server được cung cấp chính thức: Hệ thống tệp, SQLite, Git, PostgreSQL, v.v.
- Server do cộng đồng đóng góp: Slack, Notion, Figma, Stripe, v.v.
- Ứng dụng hỗ trợ MCP: Claude Desktop, Cursor, Windsurf, Zed, v.v.

**Hệ sinh thái A2A** (vừa phát hành):
- Các sản phẩm Agent của Google hỗ trợ trước
- Cộng đồng mã nguồn mở đang phát triển SDK cho các ngôn ngữ khác nhau
- Các ứng dụng cấp doanh nghiệp đang khám phá

### 5.2 Quá trình tiêu chuẩn hóa

Hiện tại các giao thức Agent vẫn còn ở "thời kỳ chiến quốc":
- MCP và A2A là hai cái phổ biến nhất
- Còn các giao thức mới nổi khác như ANP, AGP, v.v.
- Tương lai có thể sẽ hội tụ hoặc thống nhất

Loại so sánh với phát triển của Internet:
- Giai đoạn đầu: Các giao thức mạng cục bộ khác nhau tồn tại cùng một lúc
- Sau đó: TCP/IP trở thành tiêu chuẩn
- Bây giờ: Giao thức Agent có thể cũng sẽ hướng tới sự thống nhất

---

## 6. Tóm tắt

::: tip Những điểm chính
| Giao thức | Hiểu một cách ngắn gọn | Thời gian phát hành | Bên phát động | Tình huống ứng dụng |
|----------|----------------------|------------------|-------------|-------------------|
| **MCP** | "USB-C" của AI kết nối công cụ | 2024.11 | Anthropic | Tích hợp công cụ, kết nối nguồn dữ liệu |
| **A2A** | "WeChat doanh nghiệp" của hợp tác Agent | 2025.04 | Google | Hợp tác đa Agent, phân công nhiệm vụ |

**Những suy luận chính**:
1. MCP giải quyết vấn đề "AI lấy khả năng bên ngoài như thế nào"
2. A2A giải quyết vấn đề "nhiều AI hợp tác như thế nào"
3. Hai giao thức bổ sung nhau, tương lai có thể sẽ được sử dụng kết hợp
4. Lựa chọn giao thức phải dựa trên tình huống cụ thể, không có cách nào toàn năng
:::

---

## Tài liệu tham khảo

1. **Tài liệu chính thức MCP**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
2. **MCP GitHub**: [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)
3. **Blog phát hành của Anthropic**: "Introducing the Model Context Protocol" (2024-11-25)
4. **Tài liệu chính thức A2A**: [google.github.io/A2A](https://google.github.io/A2A)
5. **A2A GitHub**: [github.com/google/A2A](https://github.com/google/A2A)
6. **Google Cloud Blog**: "Announcing the Agent-to-Agent Protocol" (2025-04-09)
