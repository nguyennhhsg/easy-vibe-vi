# Từ Vibe Coding đến Spec Coding: Con Đường Tiến Hoá của Lập Trình AI

> "Code is a lossy projection of intent."
> Mã là hình chiếu không đầy đủ của ý định.
> —— Sean Grove, OpenAI, AI Engineer World's Fair 2025

## Khái Niệm Cốt Lõi của Spec Coding: Tất Cả Đều Là Markdown

Trước khi đi sâu vào Spec Coding, hãy hiểu triết học nền tảng của Claude Code: **tất cả đều là Markdown**.

Trong triết học thiết kế của Claude Code, tất cả quá trình ghi chép, truyền tải thông tin, thậm chí cả những cuộc đối thoại với mô hình, đều có thể là Markdown:

- **CLAUDE.md**: Tài liệu Markdown về quy chuẩn dự án
- **.claude/rules/**: Bộ sưu tập các tệp Markdown của quy chuẩn phân lớp
- **specs/**: Mô tả yêu cầu tính năng bằng Markdown
- **Lịch sử đối thoại**: Hồ sơ đối thoại của Claude Code tự nó là định dạng Markdown
- **AGENTS.md**: Hướng dẫn Markdown về hành vi của Agent

Đây chính là lõi của Spec Coding: **chính bản thân quy chuẩn là mã**. Khi bạn viết yêu cầu, thiết kế, tiêu chuẩn chấp nhận bằng Markdown, bạn đã đang viết "mã" rồi—AI sẽ đọc những Markdown này, rồi tạo ra thực hiện mã thực sự.

Josh Beckman đã tóm tắt bài nói của Grove một cách chính xác:

> "Software engineering (and lawmaking and legal review) is specification repair."
> Kỹ thuật phần mềm (cũng như lập pháp và xem xét pháp lý) là việc sửa chữa quy chuẩn.

Trong Claude Code, quá trình "sửa chữa quy chuẩn" này chính là: **sửa đổi Markdown → AI đọc Markdown → tạo/sửa mã → xác minh kết quả**. Toàn bộ quá trình được điều khiển bởi Markdown.

---

## 1. "The New Code" của Sean Grove: Một Bài Nói Làm Thay Đổi Tư Duy

Năm 2025, nhà nghiên cứu OpenAI **Sean Grove** đã phát biểu tại AI Engineer World's Fair một bài nói có tên **"The New Code"** đã gây chấn động toàn bộ cộng đồng nhà phát triển. Ông đã đưa ra một quan điểm đầy tính chất phá hoại: **trong 70 năm chúng ta đã viết mã để giải quyết vấn đề, nhưng mã chỉ là hình chiếu không đầy đủ của ý định—quy chuẩn mới là "mã mới" thực sự**.

Bài nói này đã sinh ra một mô thức phát triển mới: **Spec Coding** (lập trình dựa trên quy chuẩn)—sử dụng tài liệu quy chuẩn thay vì mã làm sản phẩm cốt lõi của phát triển, để AI tạo mã dựa trên quy chuẩn.

Bài viết này sẽ bắt đầu từ bài nói của Grove, giúp bạn hiểu các ý tưởng cốt lõi của Spec Coding, xem lại những hạn chế của Vibe Coding, và kết hợp thực hành với Claude Code để hiển thị cách áp dụng phương pháp luận này trong phát triển thực tế.

::: info 📚 Bạn sẽ học được

1. Hiểu các ý tưởng chính trong bài nói "The New Code" của Sean Grove
2. Nắm vững khái niệm cốt lõi và phương pháp luận của Spec Coding
3. Nhận ra giá trị và những hạn chế của Vibe Coding
4. Học cách thực hành quy trình làm việc Spec Coding trong Claude Code
5. Nắm vững chiến lược chuyển đổi dần dần từ Vibe Coding sang Spec Coding

:::

---

## 1. "The New Code" của Sean Grove: Một Bài Nói Làm Thay Đổi Tư Duy

Năm 2025, nhà nghiên cứu OpenAI Sean Grove đã phát biểu tại AI Engineer World's Fair một bài nói có tên **"The New Code"**. Bài nói này được công nhận rộng rãi là nguồn gốc tư tưởng của phong trào Spec Coding.

Grove trước đây đã thành lập OneGraph (một công ty phát triển công cụ GraphQL, sau đó được Netlify mua lại), hiện tại làm việc tại OpenAI về alignment reasoning—giúp chuyển đổi ý định cấp cao thành quy chuẩn và tiêu chuẩn đánh giá có thể thực thi.

### 1.1 Lập Luận Cốt Lõi: Mã Là Hình Chiếu Không Đầy Đủ của Ý Định

Khái niệm cốt lõi của bài nói Grove có thể được tóm tắt trong một câu:

> **Code is a lossy projection of intent.**
> Mã là hình chiếu không đầy đủ của ý định.

Ý nghĩa là gì? Khi bạn có một ý tưởng trong đầu, quá trình chuyển đổi nó thành mã sẽ mất rất nhiều thông tin bối cảnh—**tại sao** phải làm như vậy, **những giải pháp nào** đã được xem xét, **những ràng buộc nào** đã được cân nhắc. Mã cuối cùng chỉ giữ lại "cách làm", nhưng mất đi "tại sao lại làm như vậy".

Nó giống như nén một cuốn sách thành một tweet—lượng thông tin giảm drastically, ý định ban đầu bị mất mát nghiêm trọng.

### 1.2 Bản Chất của Lập Trình Là Giao Tiếp

Grove đã đưa ra một quan điểm thoạt nhìn đơn giản nhưng sâu sắc:

> "If you can communicate effectively, you can program."
> Nếu bạn có thể giao tiếp hiệu quả, bạn có thể lập trình.

Ông cho rằng, công việc viết mã thực tế chỉ chiếm **10-20%** phát triển, phần còn lại **80%** xoay quanh **giao tiếp có cấu trúc** về nhu cầu và mục tiêu—hiểu người dùng muốn gì, thống nhất phương án với nhóm, định nghĩa tiêu chuẩn chấp nhận, xử lý các trường hợp biên.

Điều này có nghĩa là lõi của khả năng lập trình không phải là thành thạo cú pháp của một ngôn ngữ nào đó, mà là **khả năng chuyển đổi ý định mơ hồ thành mô tả chính xác**.

### 1.3 Người Viết Quy Chuẩn Chính Là Lập Trình Viên

Đây là quan điểm phá hoại nhất của Grove:

> "Whoever writes the spec — be it a PM, a lawmaker, an engineer, a marketer — is now the programmer."
> Không cần biết là nhà quản lý sản phẩm, luật sư, kỹ sư hay nhân viên tiếp thị, người viết quy chuẩn chính là lập trình viên.

Khi AI ngày càng tài giỏi hơn trong việc chuyển đổi quy chuẩn thành mã, **công việc lập trình thực sự** chuyển từ "viết mã" sang "viết quy chuẩn". Ai có thể biểu đạt ý định một cách chính xác nhất, thì ai chính là "lập trình viên" có giá trị nhất.

### 1.4 Quy Chuẩn Sở Hữu Chuỗi Công Cụ Tương Tự Như Mã

Grove chỉ ra rằng, quy chuẩn có thể sở hữu chuỗi công cụ hoàn chỉnh như mã:

> "Specs actually give us a very similar toolchain, but it's targeted at intentions rather than syntax."

- **Kết hợp**: Quy chuẩn có thể được module hóa kết hợp, giống như các module mã
- **Kiểm tra**: Quy chuẩn có thể nhúng kiểm tra đơn vị, xác minh hành vi có tuân theo dự kiến không
- **Kiểm tra Lint**: Có thể phát hiện ngôn ngữ mơ hồ trong quy chuẩn, giống như linter mã phát hiện vấn đề cú pháp
- **Xác minh Tính Nhất Quán**: Quy chuẩn xuyên phòng ban có thể làm kiểm tra nhất quán, tương tự như trình kiểm tra kiểu

### 1.5 Model Spec của OpenAI: Bằng Chứng Sống

Grove đã sử dụng tài liệu **Model Spec** của chính OpenAI làm bằng chứng thực nghiệm.

Khi OpenAI phát hiện mô hình có vấn đề sycophancy (quá vâng lời người dùng), họ không huấn luyện lại mô hình, mà **sửa đổi tài liệu quy chuẩn**. Những thay đổi tự động lan truyền trên toàn hệ thống, vấn đề được khắc phục.

Điều này chứng minh một điểm chính: **chính bản thân quy chuẩn có thể hoạt động như "mã có thể thực thi"**. Sửa đổi quy chuẩn tương đương với sửa đổi hành vi, không cần phải chạm vào một dòng mã truyền thống.

Josh Beckman đã tóm tắt bài nói của Grove một cách chính xác:

> "Software engineering (and lawmaking and legal review) is specification repair."
> Kỹ thuật phần mềm (cũng như lập pháp và xem xét pháp lý) là việc sửa chữa quy chuẩn.

---

## 2. Spec Coding: Quy Chuẩn Là Mã

### 2.1 Spec Coding Là Gì?

Spec Coding (lập trình dựa trên quy chuẩn), còn gọi là Spec-Driven Development (SDD), là phương pháp luận sử dụng **tài liệu quy chuẩn làm sản phẩm cốt lõi của phát triển**.

Ý tưởng cốt lõi: **trước tiên viết rõ ràng quy chuẩn, rồi để AI tạo mã dựa trên quy chuẩn. Quy chuẩn là nguồn sự thật, mã chỉ là sản phẩm thực hiện của quy chuẩn.**

Robert C. Martin trong cuốn "Clean Code" đã đưa ra một luận điểm kinh điển được kích hoạt lại ở thời đại AI:

> "Specifying requirements so precisely that a machine can execute them is programming."
> Mô tả yêu cầu một cách đủ chính xác để máy có thể thực thi chúng—đây là lập trình.

### 2.2 So Sánh Vibe Coding vs Spec Coding

| Khía Cạnh | Vibe Coding | Spec Coding |
|----------|------------|-----------|
| **Phương Pháp** | Prompt tức thì, lặp lại từng bước | Viết quy chuẩn hoàn chỉnh trước, rồi tạo mã |
| **Trường Hợp Áp Dụng** | Nguyên mẫu, hackathon, khám phá | Hệ thống sản xuất, cộng tác đội, doanh nghiệp |
| **Chất Lượng Mã** | Nhanh nhưng dễ vỡ | Có cấu trúc, có thể kiểm tra, có thể kiểm tra |
| **Tỷ Lệ Thành Công Lần Đầu** | Không ổn định | Mục tiêu 95%+ |
| **Tái Sử Dụng** | Prompt một lần | Quy chuẩn có thể tái sử dụng xuyên dự án |
| **An Toàn** | Dễ bỏ sót | Được xây dựng sẵn từ cấp quy chuẩn |
| **Tài Liệu** | Không hoặc chậm | Quy chuẩn là tài liệu, tự duy trì |
| **Cộng Tác Đội** | Phụ thuộc kỹ năng prompt cá nhân | Quy chuẩn chung, tiêu chuẩn thống nhất |

Hai cách này không đối lập. Brad Jolicoeur chỉ ra:

> "Clever engineers will even use vibe coding as a first step to generate the initial draft of a specification."
> Các kỹ sư thông minh thậm chí còn sử dụng Vibe Coding làm bước đầu tiên để tạo bản nháp quy chuẩn.

### 2.3 Cấu Trúc Quy Chuẩn Ba Lớp của Spec Coding

Các kỹ sư Red Hat đã tóm tắt một mô hình quy chuẩn ba lớp thực dụng:

**Lớp Một: Quy Chuẩn Chức Năng (Là Gì?)**

Mô tả kết quả dự kiến bằng ngôn ngữ tự nhiên, trả lời "làm cái gì":

```markdown
## Tính Năng Xác Thực Người Dùng

### Tình Huống Người Dùng
- Như một người dùng mới, tôi muốn có thể đăng ký tài khoản qua email
- Như một người dùng đã đăng ký, tôi muốn có thể đăng nhập bằng email và mật khẩu
- Như một người dùng quên mật khẩu, tôi muốn có thể đặt lại mật khẩu qua email

### Tiêu Chuẩn Chấp Nhận
- Khi đăng ký, xác minh định dạng email và độ mạnh mật khẩu
- Sau 5 lần đăng nhập thất bại, khóa tài khoản trong 15 phút
- Liên kết đặt lại mật khẩu có hiệu lực trong 30 phút
```

**Lớp Hai: Quy Chuẩn Không Phụ Thuộc Ngôn Ngữ (Làm Sao - Cấp Kiến Trúc)**

Định nghĩa cấu trúc dữ liệu, mô thức kiến trúc, yêu cầu an ninh:

```markdown
## Thiết Kế Kỹ Thuật

### Mô Hình Dữ Liệu
- Bảng users: id, email, password_hash, created_at, locked_until
- Bảng sessions: id, user_id, token, expires_at

### Thiết Kế API
- POST /api/auth/register → 201 Created
- POST /api/auth/login → 200 OK + JWT
- POST /api/auth/reset-password → 202 Accepted

### Yêu Cầu An Ninh
- Mật khẩu sử dụng mã hóa bcrypt, cost factor ≥ 12
- JWT hợp lệ 15 phút, refresh token 7 ngày
- Tất cả các điểm cuối bật giới hạn tốc độ
```

**Lớp Ba: Quy Chuẩn Cụ Thể Từng Ngôn Ngữ (Làm Sao - Cấp Thực Hiện)**

Yêu cầu phiên bản, khung kiểm tra, tiêu chuẩn tài liệu:

```markdown
## Ràng Buộc Thực Hiện

### Ngăn Xếp Công Nghệ
- Runtime: Node.js 20+
- Framework: Express 5
- ORM: Prisma
- Testing: Vitest

### Quy Chuẩn Mã
- Sử dụng TypeScript strict mode
- Xử lý lỗi sử dụng lớp AppError tùy chỉnh
- Tất cả các điểm cuối API cần nhận xét JSDoc
```

---

## 3. Thực Hành Spec Coding Trong Claude Code

Sau khi hiểu lý thuyết, bây giờ hãy xem cách áp dụng nó trong Claude Code. Triết học thiết kế của Claude Code tự nhiên phù hợp với Spec Coding—`CLAUDE.md` của nó, thư mục Rules, lệnh `/plan`, về bản chất đều là trong "phát triển dựa trên quy chuẩn".

Chính OpenAI khi xây dựng dự án bằng Codex cũng đã áp dụng phương pháp tương tự: sử dụng tệp `AGENTS.md` làm quy chuẩn để hướng dẫn AI agent. Kinh nghiệm cốt lõi của họ là—**khi agent gặp khó khăn, hãy coi đó là tín hiệu: tìm ra những gì bị thiếu (công cụ, hàng rào bảo vệ, tài liệu), rồi bổ sung vào kho**. Điều này hoàn toàn phù hợp với ý tưởng Spec Coding: quy chuẩn là sống động, cần phát triển liên tục.

Nghiên cứu của Augment Code cũng xác nhận điều này: **quy chuẩn có thể thực thi được chính xác bởi vì AI agent trực tiếp tạo mã từ quy chuẩn, tạo thành một hàm bắt buộc—quy chuẩn cũ sẽ tạo ra những thực hiện xấu**. Điều này có nghĩa quy chuẩn không sẽ bị chết như tài liệu truyền thống.

### 3.1 Bước Một: Dùng CLAUDE.md Thiết Lập Quy Chuẩn Dự Án

`CLAUDE.md` chính là "quy chuẩn sống" của dự án bạn. Mỗi lần Claude Code khởi động, nó sẽ đọc tệp này, tương đương với việc cung cấp cho AI một cuốn hướng dẫn dự án bền vững.

Trong các phần trước của [Hướng Dẫn Cốt Lõi Khởi Động Nhanh Claude Code](../basics/), chúng ta đã học cách tạo `CLAUDE.md`. Trong ngữ cảnh Spec Coding, vai trò của nó càng quan trọng—**nó không chỉ là tệp cấu hình, mà là lối vào của quy chuẩn dự án**.

Các kỹ sư LogRocket nhấn mạnh: **bối cảnh vững chắc cực kỳ quan trọng đối với AI agent, nó có thể ngăn chặn ảo giác và thiếu hiệu quả**. Không có quy chuẩn của AI agent, nó có thể thực hiện những thay đổi rộng lớn, không được kiểm soát đối với dự án. `CLAUDE.md` chính là tuyến phòng thủ đầu tiên cung cấp "bối cảnh vững chắc" này.

```markdown
# Quy Chuẩn Dự Án Thương Mại Điện Tử

## Vị Trí Dự Án
Nền tảng SaaS thương mại điện tử hướng đến các nhà bán hàng vừa và nhỏ, hỗ trợ nhiều cửa hàng, nhiều kênh thanh toán.

## Quyết Định Kiến Trúc
- Tách biệt trước-sau, thiết kế API-first
- Kiến trúc microservices backend, giao tiếp giữa các dịch vụ thông qua hàng đợi tin nhắn
- Tách biệt đọc-ghi cơ sở dữ liệu

## Ràng Buộc Cốt Lõi
- Tất cả các số tiền sử dụng số nguyên (đơn vị cent) để lưu trữ, tránh vấn đề chính xác dấu phẩy động
- Máy trạng thái đơn hàng tuân thủ nghiêm ngặt: chờ thanh toán → đã thanh toán → đã gửi → hoàn thành
- Các điểm cuối liên quan thanh toán phải có tính chất idempotent
```

Đội ngũ Aviator đã tóm tắt các thông tin chính mà quy chuẩn nên nắm bắt—đây cũng là những gì bạn nên đề cập khi viết `CLAUDE.md`:

- Định dạng input/output và kiểu dữ liệu
- Quy tắc kinh doanh và trường hợp biên
- Phụ thuộc hệ thống và ràng buộc
- Yêu cầu hiệu suất và mở rộng
- Xử lý lỗi và yêu cầu an ninh

### 3.2 Bước Hai: Dùng Thư Mục Rules Quản Lý Quy Chuẩn Phân Lớp

Khi dự án phát triển lớn, một tệp `CLAUDE.md` không đủ. Khi đó, dùng thư mục `.claude/rules/` để tổ chức quy chuẩn phân lớp.

Đây chính là ý tưởng "quy chuẩn có thể thực thi" mà Augment Code nói tới: **quy chuẩn không phải là tài liệu tĩnh, mà là hướng dẫn sống động mà AI agent trực tiếp sử dụng**. Khi bạn chia quy chuẩn thành các tệp Rules, mỗi tệp quy chuẩn chỉ được tải khi tệp liên quan được chỉnh sửa, vừa tiết kiệm token vừa đảm bảo chính xác.

Các kỹ sư Tessl phát hiện ra, phân chia yêu cầu thành các tài liệu có cấu trúc—PRD định nghĩa "làm cái gì và tại sao", quy chuẩn kỹ thuật định nghĩa "làm sao"—có thể ngăn chặn hiệu quả AI "bộ nhớ tích tụ hỗn loạn" trong cuộc đối thoại dài, nâng cao đáng kể sự nhất quán của đầu ra.

```
.claude/rules/
├── 00-architecture.md      # Quy chuẩn kiến trúc (toàn cục)
├── 01-security.md           # Quy chuẩn an ninh (toàn cục)
├── 10-api-design.md         # Quy chuẩn thiết kế API
├── 11-frontend-patterns.md  # Quy chuẩn mô thức frontend
├── 12-database.md           # Quy chuẩn cơ sở dữ liệu
└── 20-testing.md            # Quy chuẩn kiểm tra
```

Mỗi tệp quy chuẩn có thể chỉ định phạm vi áp dụng thông qua frontmatter:

```markdown
---
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"
---

# Quy Chuẩn Thiết Kế API

## Thiết Kế Tuyến Đường
- Phong cách RESTful, sử dụng danh từ số nhiều: /api/v1/orders
- Tài nguyên lồng nhau tối đa hai lớp: /api/v1/users/123/orders

## Định Dạng Phản Hồi
- Thành công: { data, pagination? }
- Lỗi: { error: { code, message, details? } }

## Phải Tuân Thủ
- Tất cả các hoạt động ghi yêu cầu xác thực
- Điểm cuối liệt kê phải hỗ trợ phân trang
- Các hoạt động nhạy cảm ghi nhật ký kiểm tính
```

Bằng cách này, khi Claude Code chỉnh sửa các tệp liên quan đến API, nó sẽ tự động tải quy chuẩn này, đảm bảo mã được tạo ra tuân thủ tiêu chuẩn.

### 3.3 Bước Ba: Dùng /plan Thực Hiện Specify → Plan → Tasks → Implement

Quy trình làm việc tiêu chuẩn Spec Coding là vòng lặp bốn giai đoạn. GitHub Spec Kit đã tiêu chuẩn hóa nó thành Specify → Plan → Tasks → Implement, và lệnh `/plan` của Claude Code tự nhiên hỗ trợ quy trình này.

Đội ngũ SpecThis nhấn mạnh một nguyên tắc chính: **định nghĩa ranh giới trước khi agent chạy—biết những gì nên thay đổi trước khi mã thay đổi**. Đây chính là giá trị của `/plan`.

**Giai Đoạn Một: Specify (Định Nghĩa Quy Chuẩn)**

Trước tiên viết rõ ràng cần làm gì, không vội viết mã:

```
/plan
Tôi cần triển khai tính năng hoàn tiền đơn hàng, quy chuẩn như sau:

Yêu Cầu Chức Năng:
- Người dùng có thể yêu cầu hoàn tiền toàn bộ trước khi gửi hàng
- Sau khi gửi hàng, có thể yêu cầu hoàn tiền trong vòng 7 ngày
- Hoàn tiền cần phê duyệt của quản trị viên

Tiêu Chuẩn Chấp Nhận:
- Số tiền hoàn tiền không thể vượt quá số tiền thực tế thanh toán
- Máy trạng thái hoàn tiền: chờ xử lý → phê duyệt → đang hoàn tiền → đã hoàn tiền
- Hoàn tiền hoàn thành sau khi khôi phục hàng tồn kho
- Toàn bộ quá trình ghi lại nhật ký hoạt động
```

**Giai Đoạn Hai: Plan (Lập Kế Hoạch Kỹ Thuật)**

Claude sẽ tạo phương án kỹ thuật dựa trên quy chuẩn của bạn:

```
📋 Kế Hoạch Triển Khai Tính Năng Hoàn Tiền

1. Thiết Kế Mô Hình Dữ Liệu
   - Tạo bảng refunds
   - Thêm trạng thái liên quan hoàn tiền vào máy trạng thái đơn hàng

2. Thiết Kế API
   - POST /api/orders/:id/refund - Yêu cầu hoàn tiền
   - PUT /api/refunds/:id/approve - Phê duyệt hoàn tiền
   - GET /api/refunds - Danh sách hoàn tiền

3. Logic Kinh Doanh
   - Xác thực điều kiện hoàn tiền
   - Tính toán số tiền hoàn tiền
   - Logic khôi phục hàng tồn kho

4. Tích Hợp
   - Kết nối API hoàn tiền kênh thanh toán
   - Gửi thông báo hoàn tiền
```

**Giai Đoạn Ba: Tasks (Phân Chia Nhiệm Vụ)**

Chia kế hoạch thành các nhiệm vụ nhỏ có thể thực thi độc lập, mỗi nhiệm vụ có tiêu chuẩn hoàn thành rõ ràng.

**Giai Đoạn Bốn: Implement (Triển Khai Từng Bước)**

Thực hiện từng nhiệm vụ, sau khi hoàn thành mỗi cái hãy xác minh một lần.

### 3.4 Tình Huống Thực Tế: Xây Dựng Hệ Thống Thông Báo Người Dùng Bằng Spec Coding

Hãy xem qua một ví dụ hoàn chỉnh để so sánh khác biệt giữa Vibe Coding và Spec Coding. Dữ liệu từ Orchestrator.dev cho thấy, trong khảo sát 2025 Stack Overflow, 84% nhà phát triển sử dụng hoặc dự định sử dụng công cụ AI, nhưng chỉ 22% hài lòng với kết quả, 46% cho rằng có vấn đề về chính xác. Spec Coding chính là chìa khóa để giải quyết khoảng cách hài lòng này.

**Phương Pháp Vibe Coding:**

```
Bạn: Làm tính năng thông báo
AI: [Bắt đầu viết mã trực tiếp, tạo danh sách thông báo đơn giản]

Bạn: Cần hỗ trợ đã đọc/chưa đọc
AI: [Sửa mã, thêm trường read]

Bạn: Còn cần hỗ trợ các loại thông báo khác nhau
AI: [Lại sửa, thêm trường type]

Bạn: Cần có thể đẩy tới điện thoại
AI: [Sửa lớn, cấu trúc cũ không thích hợp...]
```

Kết quả: Sửa 4 lần, kiến trúc bị đảo lộn, mã ngày càng lộn xộn.

**Phương Pháp Spec Coding:**

Trước tiên viết tài liệu quy chuẩn `specs/notification.md`:

```markdown
# Quy Chuẩn Hệ Thống Thông Báo Người Dùng

## Yêu Cầu Chức Năng
1. Hỗ trợ ba kênh thông báo: thông báo trong trang, thông báo email, thông báo đẩy
2. Loại thông báo: thông báo hệ thống, trạng thái đơn hàng, hoạt động khuyến mãi, cảnh báo an ninh
3. Người dùng có thể cấu hình tùy chọn thông báo theo kênh và loại
4. Hỗ trợ trạng thái đã đọc/chưa đọc, hỗ trợ đánh dấu hàng loạt đã đọc

## Mô Hình Dữ Liệu
- Bảng notifications: id, user_id, type, channel, title, content,
  is_read, created_at
- Bảng notification_preferences: user_id, type, channel, enabled

## Thiết Kế API
- GET /api/notifications?type=&is_read= - Lấy danh sách thông báo (phân trang)
- PUT /api/notifications/:id/read - Đánh dấu đã đọc
- PUT /api/notifications/read-all - Đánh dấu toàn bộ đã đọc
- GET /api/notification-preferences - Lấy tùy chọn
- PUT /api/notification-preferences - Cập nhật tùy chọn

## Tiêu Chuẩn Chấp Nhận
- Số lượng thông báo chưa đọc cập nhật thực thời
- Danh sách thông báo hỗ trợ cuộn vô hạn
- Trễ thông báo đẩy < 3 giây
- Thay đổi tùy chọn có hiệu lực ngay lập tức
```

Sau đó trong Claude Code:

```
@specs/notification.md
Triển khai hệ thống thông báo người dùng theo quy chuẩn này.
Bắt đầu từ mô hình dữ liệu, rồi triển khai API, cuối cùng làm thành phần giao diện.
Sau khi hoàn thành mỗi module, tạm dừng một chút để tôi xác nhận rồi tiếp tục.
```

Kết quả: Hoàn thành ngay từ lần đầu, kiến trúc rõ ràng, không cần đảo lộn lại.

### 3.5 Kết Hợp Superpowers Để Tăng Cường Spec Coding

Trong phần trước [Phát Triển Kỹ Thuật Superpowers](../superpowers/), chúng ta đã học về hệ thống kỹ năng Superpowers. Spec Coding và Superpowers là những bạn đồng hành tự nhiên:

| Giai Đoạn Spec Coding | Kỹ Năng Superpowers Tương Ứng |
|---------------------|------------------------------|
| Định Nghĩa Quy Chuẩn | `brainstorming` — Câu hỏi Socratic để làm rõ yêu cầu |
| Lập Kế Hoạch Kỹ Thuật | `writing-plans` — Chia quy chuẩn thành nhiệm vụ nhỏ |
| Triển Khai Từng Bước | `test-driven-development` — Vòng lặp TDD đỏ-xanh-tái cấu trúc |
| Xác Minh Chất Lượng | `code-review` + `verification-before-completion` |

**Ví Dụ Sử Dụng Kết Hợp:**

```
@specs/notification.md
Sử dụng phương pháp TDD để triển khai hệ thống thông báo theo quy chuẩn này,
hoàn thành sau đó hãy giúp tôi xem xét mã
```

Lệnh này đồng thời kích hoạt quy trình làm việc Spec Coding và kỹ năng TDD + Code Review của Superpowers, tạo thành quy trình phát triển kỹ thuật hoàn chỉnh.

### 3.6 Kiểm Soát Phiên Bản và Phát Triển Liên Tục của Quy Chuẩn

The Vibe Coding Substack đã đưa ra một quan điểm quan trọng: **Specs are now code**. Vì quy chuẩn là mã, nên nên quản lý như mã:

- **Kiểm soát phiên bản**: Các tệp quy chuẩn được đặt trong kho Git, được commit cùng với mã
- **Theo dõi thay đổi**: Mỗi lần sửa quy chuẩn đều có hồ sơ commit, biết ai sửa gì, tại sao sửa
- **Xem xét mã**: Thay đổi quy chuẩn cũng cần PR review, đảm bảo đội thống nhất
- **Tích hợp CI**: Thay đổi quy chuẩn kích hoạt kiểm tra tự động, xác minh xem thực hiện có còn phù hợp với quy chuẩn không

Trong Claude Code, điều này có nghĩa là `CLAUDE.md`, thư mục `.claude/rules/` và thư mục `specs/` của bạn đều nên nằm trong kiểm soát phiên bản. Kinh nghiệm từ Robomotion: **quy chuẩn và thực hiện được phiên bản hóa cùng nhau, ngăn chặn sự trôi dạt, duy trì tính có thể kiểm tra**.

Thực hành Harness Engineering của OpenAI cũng xác nhận điều này: tệp `AGENTS.md` của họ tự nó được Codex viết, và liên tục cập nhật khi dự án phát triển. Khi agent gặp khó khăn, giải pháp không phải là sửa mã, mà là **để chính Codex cập nhật quy chuẩn**—hình thành vòng lặp tự sửa chữa quy chuẩn.

---

## 4. Chiến Lược Hỗn Hợp: Chuyển Đổi Dần Dần Từ Vibe Sang Spec

Sự đồng thuận của ngành không phải là "bỏ đi Vibe Coding", mà là **chọn phương pháp phù hợp tùy theo tình huống**.

### 4.1 Khi Nào Dùng Vibe Coding

- Xác minh xem một ý tưởng có khả thi không (nguyên mẫu trong 30 phút)
- Khám phá công nghệ hoặc framework không quen thuộc
- Hackathon hoặc demo nội bộ
- Script hoặc công cụ một lần

### 4.2 Khi Nào Dùng Spec Coding

- Phát triển tính năng sản xuất
- Dự án cộng tác đa người
- Mã cần bảo trì lâu dài
- Liên quan đến bảo mật, thanh toán, dữ liệu v.v.
- Thiết kế API và tích hợp hệ thống

### 4.3 Quy Trình Làm Việc Chuyển Đổi Dần Dần Được Khuyến Nghị

**Giai Đoạn Một: Khám Phá Bằng Vibe**

Dùng Vibe Coding để xác minh ý tưởng nhanh chóng, không viết quy chuẩn, không quan tâm chất lượng mã:

```
Làm một cửa sổ thông báo đơn giản, xem hiệu ứng thế nào
```

**Giai Đoạn Hai: Trích Xuất Quy Chuẩn**

Sau khi xác minh khả thi, hãy sắp xếp những phát hiện trong quá trình khám phá thành quy chuẩn. Thậm chí bạn có thể để AI giúp:

```
Dựa trên nguyên mẫu tính năng thông báo vừa làm,
hãy giúp tôi sắp xếp một tài liệu quy chuẩn chính thức,
bao gồm mô hình dữ liệu, thiết kế API và tiêu chuẩn chấp nhận
```

**Giai Đoạn Ba: Xây Dựng Lại Theo Spec**

Dựa trên quy chuẩn, dùng phương pháp Spec Coding để xây dựng lại phiên bản sản xuất:

```
@specs/notification.md
Triển khai từ đầu theo quy chuẩn này, không tham khảo mã nguyên mẫu cũ
```

Lợi ích của quy trình này là: **dùng tốc độ Vibe Coding để xác minh hướng, dùng chất lượng Spec Coding để phát hành sản phẩm**.

Tóm tắt của Robomotion rất chính xác:

> "The spec is the source of truth. The AI generated output is the draft implementation. Validation is not optional."
> Quy chuẩn là nguồn sự thật duy nhất. Mã tạo bởi AI chỉ là bản nháp thực hiện. Xác minh không phải tùy chọn.

---

## 5. Các Câu Hỏi Thường Gặp

### Q1: Spec Coding Có Quá Chậm Không?

Viết quy chuẩn thực sự cần đầu tư trước. Nhưng đội ngũ Greg Ceccarelli, sử dụng Spec Coding, **3 người trong 4 tuần đã hoàn thành một sản phẩm macOS hoàn chỉnh**—điều này gần như không thể trong phát triển truyền thống.

Thời gian viết quy chuẩn trước sẽ được hoàn trả bằng việc giảm công sửa lại, giảm lỗi, giảm chi phí giao tiếp ở giai đoạn sau.

### Q2: Quy Chuẩn Nên Chi Tiết Đến Mức Nào?

Khuyến nghị của Robomotion là: **một quy chuẩn chất lượng cao có thể chỉ có một trang**. Chìa khóa là trả lời 8 câu hỏi:

1. Chúng ta đang tự động hóa cái gì?
2. Input là gì?
3. Output là gì?
4. Các ràng buộc là gì?
5. Các chế độ thất bại nào?
6. Yêu cầu an ninh là gì?
7. Yêu cầu hiệu suất là gì?
8. Kiểm tra nào có thể chứng minh nó hoạt động?

### Q3: AI Chỉ Làm Những Gì Trong Quy Chuẩn, Bỏ Qua Những Gì "Hiển Nhiên" Thì Sao?

Đây thực sự là một hạn chế của Spec Coding. Phản hồi người dùng từ GitHub Spec Kit: AI sẽ "exactly and only" làm những gì trong quy chuẩn.

Giải pháp: Thêm phần "yêu cầu không chức năng" trong quy chuẩn, liệt kê các kỳ vọng phổ biến (xử lý lỗi, nhật ký, khả năng tiếp cận v.v.). Hoặc đặt quy tắc toàn cục trong `CLAUDE.md`.

### Q4: Dự Án Nhỏ Cũng Cần Spec Coding Không?

Không cần. Spec Coding phù hợp với:
- Dự án sản xuất
- Dự án cộng tác đa người
- Dự án cần bảo trì lâu dài

Đối với nguyên mẫu nhanh, script một lần, thí nghiệm học tập, Vibe Coding phù hợp hơn.

### Q5: Làm Sao Để Đội Chấp Nhận Spec Coding?

Bắt đầu với một tính năng nhỏ để thử. Để đội thấy Spec Coding giảm sửa lại, nâng cao tỷ lệ thành công lần đầu. Khảo sát Stack Overflow 2025 cho thấy 84% nhà phát triển sử dụng hoặc dự định sử dụng công cụ AI, nhưng chỉ 22% hài lòng với kết quả—Spec Coding chính là chìa khóa nâng cao độ hài lòng.

---

## 6. Tóm Tắt

Từ Vibe Coding đến Spec Coding, không phải một cuộc cách mạng, mà là một quá trình tiến hoá.

Sean Grove trong "The New Code" nói rõ: **trong 70 năm chúng ta viết mã để giải quyết vấn đề, bây giờ nên viết quy chuẩn để tạo mã**. Mã là hình chiếu không đầy đủ của ý định, trong khi quy chuẩn mới có thể nắm bắt hoàn chỉnh ý định, bối cảnh và ràng buộc.

Đối với các nhà phát triển sử dụng Claude Code, sự chuyển đổi này thực sự đã xảy ra:

- `CLAUDE.md` bạn viết chính là quy chuẩn dự án
- Thư mục Rules bạn cấu hình chính là quy chuẩn phân lớp
- `/plan` mà bạn dùng chính là quy trình Specify → Plan → Tasks
- Kết hợp TDD và Code Review của Superpowers chính là quy trình Spec Coding hoàn chỉnh

**Các Điểm Chính:**

- Vibe Coding phù hợp với khám phá và nguyên mẫu, Spec Coding phù hợp với sản xuất và cộng tác
- Quy chuẩn là nguồn sự thật, mã là sản phẩm thực hiện của quy chuẩn
- Khả năng viết quy chuẩn = khả năng lập trình, khả năng giao tiếp > khả năng cú pháp
- Bắt đầu từ những nơi nhỏ: viết `CLAUDE.md` tốt, đã bước đầu vào Spec Coding

::: tip 💡 Bước Tiếp Theo
Trong chương tiếp theo, chúng ta sẽ học cách sử dụng tính năng Agent Teams của Claude Code, để cho phép nhiều thực thể AI làm việc cộng tác như một đội phát triển thực sự.
:::

---

## Tài Liệu Tham Khảo

### Liên Quan đến Bài Nói "The New Code" của Sean Grove

- [Code is just a lossy projection of intent — The Decoder](https://the-decoder.com/code-is-just-a-lossy-projection-of-intent-according-to-openai-researcher-sean-grove/)
- [The End of Coding? How Specifications Are Becoming the New Source Code — Implicator](https://www.implicator.ai/the-end-of-coding-how-specifications-are-becoming-the-new-source-code/)
- [OpenAI: Intent, Not Code, Drives Future Software Development — AI Tech Suite](https://www.aitechsuite.com/ai-news/openai-intent-not-code-drives-future-software-development)
- [Note on The New Code — Josh Beckman](https://www.joshbeckman.org/notes/914234100)
- [Toàn Bộ Bản Ghi Chép Bài Nói "The New Code"](https://lawwu.github.io/transcripts/8rABwKRsec4.html)

### Phương Pháp Luận Spec Coding

- [How spec-driven development improves AI coding quality — Red Hat](https://developers.redhat.com/articles/2025/10/22/how-spec-driven-development-improves-ai-coding-quality)
- [Spec-Driven Development with AI: Complete 2025 Guide — Dplooy](https://www.dplooy.com/blog/spec-driven-development-with-ai-complete-2025-guide)
- [Spec-Driven Development: Building Production-Ready Software with AI — Orchestrator.dev](https://orchestrator.dev/blog/2025-12-16-spec_driven_dev_article)
- [Agents Code but the Problem of Clear Specification Remains — Greg Ceccarelli](https://www.gregceccarelli.com/writing/beyond-code-centric)

### Vibe Coding vs Spec Coding

- [Vibe Coding vs Spec Driven — Cosmo Edge](https://cosmo-edge.com/vibe-coding-vs-spec-driven-ai-development/)
- [Master AI in Software Engineering: Vibe vs. Spec Coding — Brad Jolicoeur](https://bradjolicoeur.com/article/ai-software-engineering-vibe-spec-prompting)
- [From Vibe Coding to Spec-Driven Development — Tessl](https://tessl.io/blog/from-vibe-coding-to-spec-driven-development/)
- [Spec first approach for enterprise — Robomotion](https://robomotion.io/blog/spec-first-approach-the-way-to-adapt-vibe-coding-for-enterprise-work)

### Công Cụ Và Thực Hành

- [GitHub Spec Kit vs Vibe Coding — Ossels](https://ossels.ai/github-spec-kit-spec-driven-development/)
- [A spec-first workflow for agentic AI — LogRocket](https://blog.logrocket.com/spec-first-workflow-agentic-ai/)
- [Specs Are Now Code — The Vibe Coding Substack](https://thevibecoding.substack.com/p/specs-are-now-code)
- [Harness Engineering — Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)
- [Spec-Driven Development & AI Agents Explained — Augment Code](https://www.augmentcode.com/guides/spec-driven-development-ai-agents-explained)
- [Spec-Driven Development: The Key to Scalable AI Agents — Aviator](https://www.aviator.co/blog/spec-driven-development/)
