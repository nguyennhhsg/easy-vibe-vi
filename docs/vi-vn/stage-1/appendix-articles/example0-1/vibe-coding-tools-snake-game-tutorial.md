# So sánh bảy công cụ lập trình AI

## Hướng dẫn chương này

Đứng trước vô số công cụ lập trình AI, công cụ nào thích hợp nhất cho bạn? Chương này thông qua một nhiệm vụ thực tế thống nhất—phát triển trò chơi "Rắn ăn mồi + AI viết thơ", đã tiến hành đánh giá ngang hàng sâu sắc về 7 nền tảng Web Vibe Coding chính như Lovable, Replit, Z.ai, v.v. Chúng tôi sẽ so sánh từ nhiều chiều như mức độ thân thiện với người mới bắt đầu, khả năng kiểm soát mã, tính tiện lợi của triển khai, giúp bạn nhanh chóng chọn được công cụ hỗ trợ phát triển mạnh mẽ nhất.

---

# 1. Xây dựng trò chơi rắn ăn mồi bằng Vibe Coding: Hướng dẫn thực hành toàn diện

Bài viết này giới thiệu một thực hành phát triển phần mềm mới nổi—"Vibe Coding (lập trình hướng không khí)", nó tận dụng trí tuệ nhân tạo để tăng tốc quá trình xây dựng ứng dụng.

Tiếp theo, chúng tôi sẽ lần lượt giới thiệu các khái niệm cốt lõi của Vibe Coding, giải thích AI Agent là gì, và cung cấp các phương pháp viết prompt thực tiễn. Cuối cùng, thông qua việc xây dựng hoàn chỉnh trò chơi "Rắn ăn mồi (Snake)" từ đầu, sẽ so sánh chi tiết các nền tảng Vibe Coding chính, giúp bạn chọn được bộ công cụ phù hợp nhất.

## Bạn sẽ học được:

- **Vibe Coding là gì:** Hiểu rõ định nghĩa, luồng công việc và các lợi thế chính của nó.
- **Vai trò của AI Agent:** Hiểu cách hoạt động của AI Agent, cũng như sự khác biệt với chương trình truyền thống.
- **Cách viết prompt tốt:** Nắm bắt cách viết prompt rõ ràng, cụ thể để có kết quả tốt hơn.
- **Công cụ Vibe Coding:** Tìm hiểu một loạt các nền tảng lập trình AI và thiết kế chính.
- **So sánh nền tảng:** Từ góc nhìn của người mới bắt đầu, so sánh và đánh giá ưu nhược điểm của 7 nền tảng AI Agent khác nhau.
- **Công cụ UI / UX:** Học cách tích hợp các công cụ UI/UX như Figma, Mastergo vào toàn bộ luồng công việc.

## 1. Lời dẫn

Trong các bài học trước, chúng ta đã liên tục sử dụng mô hình phát triển full-stack của z.ai để hoàn thành các tác vụ lập trình.

Tuy nhiên, có khi chúng ta tự hỏi: bản chất của nó thực tế là gì—"AI Agent" (khác với AI trò chuyện thông thường, và thông minh hơn nhiều)? Điều này là vì nó không chỉ trò chuyện với bạn, mà còn có thể suy nghĩ (khi bạn giao cho nó một nhiệm vụ, nó sẽ lập kế hoạch trước), và cũng có thể chủ động thực hiện hành động (chẳng hạn như gọi tìm kiếm web, thực hiện lệnh máy tính, mở trang web, v.v.). Chúng tôi sẽ giải thích chi tiết sau.

## 1. Vibe Coding là gì?

Vibe Coding là một cách phát triển phần mềm mới tận dụng AI để tăng tốc quy trình phát triển ứng dụng. Nó không phải là sự thay thế cho lập trình truyền thống, mà là một chế độ lập trình "hội thoại" hơn. Khái niệm này được đề xuất bởi nhà nghiên cứu AI Andrej Karpathy: dưới luồng công việc này, các nhà phát triển không còn viết mã từng dòng nữa, mà chủ yếu thông qua hướng dẫn AI Agent để tạo, tối ưu hóa và gỡ lỗi ứng dụng.

Ý tưởng cốt lõi của Vibe Coding là chuyển từ **"hướng mã (code-first)"** sang **"hướng ý định (intent-first)"**. Bạn không cần phải suy nghĩ từ dòng mã đầu tiên nữa, mà thay vào đó mô tả kết quả mà bạn muốn bằng ngôn ngữ tự nhiên.

Luồng công việc Vibe Coding điển hình là một vòng lặp lặp đi lặp lại:

- **Mô tả mục tiêu:** Trước tiên, mô tả tính năng mà bạn muốn thực hiện bằng một hoặc một vài câu, chẳng hạn: "Tạo một trò chơi rắn ăn mồi đơn giản với backend Python, có thể tạo thơ."
- **AI tạo mã:** AI Agent phân tích yêu cầu của bạn, tạo phiên bản mã ban đầu, bao gồm cấu trúc cơ bản, trang web giao diện người dùng và logic backend.
- **Chạy và quan sát:** Chạy mã được tạo, kiểm tra xem nó có hoạt động như dự kiến hay không, đồng thời phát hiện các lỗi hoặc thiếu sót.
- **Phản hồi và lặp lại:** Nếu có lỗi hoặc kết quả không lý tưởng, hãy tiếp tục đưa ra hướng dẫn trong cuộc trò chuyện, chẳng hạn như: "Rắn di chuyển quá chậm, hãy tăng tốc độ", hoặc "Hiện tại API Key trong tệp `.env` không được đọc đúng cách, vui lòng sửa mã backend."
- **Lặp lại các bước trên:** Liên tục lặp lại trong vòng lặp "mô tả → tạo → chạy → phản hồi", cho đến khi ứng dụng đạt trạng thái mà bạn hài lòng.

### Các lợi thế chính của Vibe Coding:

- **Giảm rào cản:** Cho phép các nhà thiết kế, nhà khởi nghiệp, học sinh, v.v. thiếu kinh nghiệm lập trình có thể tham gia phát triển ứng dụng thông qua ngôn ngữ tự nhiên.
- **Nguyên mẫu nhanh:** Thời gian từ ý tưởng đến sản phẩm tối thiểu khả thi (MVP) giảm đáng kể.
- **Tăng hiệu suất:** Tự động xử lý rất nhiều công việc lập mã lặp đi lặp lại, cơ học (như mã mẫu), cho phép các nhà phát triển tập trung vào thiết kế kiến ​​trúc và tóm tắt vấn đề.
- **Thuận tiện thử nghiệm:** Khuyến khích phương pháp sản xuất nhanh trước, sau đó cải tiến liên tục, thuận tiện hơn cho việc thử các ý tưởng và tính năng mới.

## 2. Nền tảng trực tuyến Vibe Coding là gì (Web-based)?

Trong bài kiểm tra thực tế này, bạn sẽ thấy rằng các công cụ mà chúng tôi đánh giá được chia thành hai loại: **Web-based (nền tảng trực tuyến)** và **IDE (môi trường phát triển cục bộ)**.

Mặc dù lõi của chúng đều là sử dụng AI để giúp bạn viết mã, nhưng chúng có sự khác biệt rất lớn về trải nghiệm sử dụng và kịch bản áp dụng:

### Nền tảng Vibe Coding trực tuyến (Web-based)

**Công cụ đại diện:** Lovable, Replit, Z.ai, v0

Điều này giống như một "căn hộ kiểu khách sạn" mà bạn có thể dọn vào ngay lập tức.

- **Không cần cấu hình môi trường:** Bạn không cần lo lắng về môi trường Python, phiên bản Node.js là gì, cũng không cần quản lý việc cài đặt phụ thuộc. Mở trình duyệt, nhập địa chỉ URL, bạn có thể bắt đầu viết mã ngay lập tức.
- **Xem trước và triển khai chỉ bằng một cú nhấp chuột:** Sau khi mã được tạo, nền tảng thường sẽ tự động hiển thị hiệu ứng chạy trong cửa sổ bên phải. Khi hoàn thành, chỉ cần nhấp một nút để tạo một liên kết chia sẻ với bạn bè.
- **Kịch bản thích hợp:**
  - **Xác minh nhanh các ý tưởng (MVP):** Có một ý tưởng trong đầu, muốn dành nửa giờ để xem liệu bạn có thể thực hiện được không.
  - **Người mới bắt đầu:** Hoàn toàn không muốn bị các lỗi môi trường phức tạp làm nản lòng, chỉ muốn trải nghiệm niềm vui của lập trình AI.
  - **Ứng dụng nhẹ:** Tạo một trang web công cụ đơn giản, trò chơi nhỏ hoặc trang giới thiệu cá nhân.

### AI IDE (môi trường phát triển cục bộ)

**Công cụ đại diện:** Cursor, Trae, VS Code + plugin AI

Điều này giống như "nhà riêng được cải tạo hoàn thiện".

- **Khả năng cục bộ mạnh mẽ:** Nó chạy trên máy tính của bạn, có thể trực tiếp truy cập tất cả các tệp cục bộ của bạn, tận dụng sức mạnh tính toán của máy tính bạn.
- **Tích hợp liền mạch vào luồng công việc chuyên nghiệp:** Thích hợp cho các dự án lớn, có thể cài đặt tự do các plugin khác nhau, kết nối với cơ sở dữ liệu cục bộ, thực hiện gỡ lỗi phức tạp.
- **Kịch bản thích hợp:**
  - **Phát triển dự án chuyên nghiệp:** Cần duy trì lâu dài, cấu trúc phức tạp, dự án thương mại.
  - **Tùy chỉnh sâu:** Cần kiểm soát chi tiết các chi tiết mã, hoặc cần tích hợp sâu với luồng công việc cục bộ hiện tại (như Git, Docker).
  - **Bảo mật dữ liệu:** Mã hoàn toàn ở cục bộ, phù hợp hơn với các quy tắc bảo mật của một số doanh nghiệp.

**Tóm lại:** Nếu bạn mới bắt đầu tiếp xúc với lập trình AI, hoặc chỉ muốn nhanh chóng tạo một thứ nhỏ để chơi, **nền tảng trực tuyến** là điểm khởi đầu tuyệt vời. Nếu bạn là một nhà phát triển chuyên nghiệp, hoặc dự án ngày càng phức tạp, **IDE cục bộ** sẽ cung cấp một giới hạn cao hơn.

---

## 3. AI Agent là gì?

### AI Agent là gì?

AI Agent là một hệ thống phần mềm có thể cảm nhận môi trường, đưa ra quyết định và chủ động thực hiện hành động để đạt được các mục tiêu cụ thể. So với phần mềm truyền thống tuân theo hướng dẫn cố định, quy trình đơn lẻ, AI Agent linh hoạt và thích ứng hơn.

Dưới đây là một số đặc điểm chính phân biệt AI Agent với chương trình truyền thống:

- **Tự chủ (Autonomy):** AI Agent có mức độ độc lập cao. Chương trình truyền thống thường cần người kích hoạt từng bước, trong khi Agent có thể tự quyết định bước tiếp theo cần làm gì dựa trên mục tiêu.
- **Cảm nhận và bộ nhớ (Perception & Memory):** Agent sẽ thu thập dữ liệu từ môi trường (ví dụ như phản hồi API, dữ liệu cảm biến, đầu vào người dùng, v.v.), và thông qua "bộ nhớ" giữ lại bối cảnh, từ đó tái sử dụng kinh nghiệm trong các hành động sau, liên tục cải thiện hiệu ứng.
- **Lý trí và hướng mục tiêu (Rationality & Goal-Orientation):** Agent sẽ phân tích và lập kế hoạch xung quanh các mục tiêu đã cho, chọn chuỗi hành động phù hợp nhất để theo đuổi "chỉ số hiệu suất" cao hơn.
- **Sử dụng công cụ (Tool Use):** Một đặc điểm lớn của AI Agent hiện đại là có thể gọi các công cụ bên ngoài, không còn giới hạn ở "tạo văn bản". Ví dụ, nó có thể duyệt web, chạy mã, truy vấn cơ sở dữ liệu, gửi email, v.v., là một "bộ não" biết cách "điều phối công cụ".

Bạn có thể hiểu điều này bằng cách loại suy:

- Một **chương trình truyền thống** giống như một máy tính. Bạn nhập số và toán tử cho nó, nó chỉ thực hiện tính toán khi bạn nhấn nút.
- Một **trợ lý AI** giống như một trợ lý con người. Bạn yêu cầu nó "tìm nhà hàng gần đây", nó sẽ cung cấp kết quả tìm kiếm và liệt kê các tùy chọn, nhưng cuối cùng là bạn quyết định.
- Một **AI Agent** tương tự như một đội nghiên cứu tự động hóa. Bạn chỉ cần đưa ra mục tiêu cấp cao (chẳng hạn như "giúp tôi lập kế hoạch cho một chuyến du lịch ở Nhật Bản"), nó sẽ chia nhỏ nhiệm vụ, tìm kiếm tài liệu trực tuyến, đặt vé máy bay và khách sạn (thông qua API), sắp xếp lịch trình, cuối cùng giao kết quả cho bạn, gần như không cần bạn can thiệp vào chi tiết.

---

# 2. Về việc viết prompt

## 1. Có nên viết prompt một lần, hay nên chia thành nhiều bước?

Nhiều người sẽ không thể cưỡng lại việc cố gắng nói rõ "xây dựng một ứng dụng full-stack hoàn chỉnh" trong một prompt duy nhất. Thực tế là, công cụ hiện tại đã đủ mạnh, quả thực có cơ hội nhận được kết quả nhìn khá tốt một lần. Nhưng từ trải nghiệm tổng thể và tỷ lệ thành công, việc chia công việc thành các bước nhỏ, lặp lại theo từng giai đoạn, thường sẽ có kết quả tốt hơn, đồng thời cũng ít khó khăn hơn với "không thể sửa" vào ngõ cụt.

> **Mẹo nhỏ:** Thay vì mong đợi "hoàn thành một lần", tốt hơn là chia mục tiêu lớn thành các công việc nhỏ có thể thực hiện được. 
> Ví dụ, thay vì nói trực tiếp "build me a Snake game", hãy chia thành:
> "1. Trước tiên hãy làm giao diện người dùng của trò chơi rắn ăn mồi",
> "2. Sau đó triển khai backend ghi lại điểm số",
> "3. Cuối cùng kết nối frontend và backend lại với nhau".
> Điều này giúp AI hiểu rõ hơn về yêu cầu của bạn và cung cấp kết quả đáng tin cậy hơn.

## 2. Càng rõ ràng, càng tốt

- Trong Vibe Coding, prompt mà bạn viết cũng quan trọng như mã mà bạn viết. Prompt càng rõ ràng và cụ thể, kết quả sẽ càng gần với những gì bạn nghĩ.
- Nói rõ mục tiêu và điều kiện ràng buộc ngay từ đầu có thể giảm số lần sửa đổi sau, điều này không chỉ tiết kiệm thời gian, mà còn tiết kiệm hạn mức sử dụng và chi phí.

---

# 3. Tổng quan công cụ (Vibe Coding / công cụ UIUX)

## 1. Nền tảng AI Agent

| **Tên**                                    | **Nền tảng** |
| ------------------------------------------ | ------------ |
| **[Lovable](https://lovable.dev/)**        | Web-based    |
| **[Cursor](https://cursor.com/cn/agents)** | PC           |
| **[Z.ai](https://chat.z.ai/)**             | Web-based    |
| **[Replit](https://replit.com/~)**         | Web-based    |
| **[Minimax](https://agent.minimaxi.com/)** | Web-based    |
| **[Trae](https://www.trae.ai/)**           | PC           |
| **[V0](https://v0.app/)**                  | Web-based    |

## 2. Nền tảng AI UIUX

| **Tên**                              | **Nền tảng**         |
| ------------------------------------- | -------------------- |
| **[Mastergo](https://mastergo.com/)** | Web-based            |
| **[Figma](https://www.figma.com/)**   | Web-based, PC Plugin |

---

# 4. Hướng dẫn thực hành (Vibe Coding + UI kết hợp)

1. Trong cửa sổ trò chuyện của nền tảng mà bạn chuẩn bị thực hiện Vibe Coding, hãy nhập mô tả của chương trình mà bạn muốn.
   Ví dụ:

   > Vui lòng xây dựng một ứng dụng web rắn ăn mồi (Snake) đơn giản với frontend và backend.
   >
   > 1. Frontend
   >
   > - Trang 1: Trang trò chơi
   >   - Sử dụng bàn phím để điều khiển chuyển động của rắn.
   >   - Rắn không ăn thức ăn, mà là các từ tiếng Anh.
   >   - Thanh bên trang hiển thị các từ đã thu thập và số lượng của chúng.
   >   - Sau khi trò chơi kết thúc, các từ đã thu thập vẫn còn lại và tiếp tục trong trận đấu tiếp theo.
   > - Trang 2: Trang viết thơ (Make Poem)
   >   - Hiển thị danh sách từ giống với trang trò chơi (dữ liệu nhất quán).
   >   - Cung cấp một nút để gửi các từ hiện tại được thu thập tới backend để tạo một bài thơ.
   >   - Sau khi tạo bài thơ, xóa hoặc giảm số lượng của các từ được sử dụng khỏi danh sách.
   >
   > * Thêm điều hướng đơn giản, chuyển đổi giữa hai trang Game và Make Poem.
   > * Đảm bảo rằng các từ được thu thập có thể được nhìn thấy trên cả hai trang.
   >
   > 2. Backend
   >
   > - Cung cấp giao diện backend, nhận các từ được thu thập và trả về một bài thơ.
   > - Sử dụng API DeepSeek để tạo bài thơ.
   > - Đặt API Key trong tệp `.env` và bỏ qua tệp đó trong `.gitignore`.

2. Nhập API Key DeepSeek của bạn. (Bạn có thể lấy nó tại [https://platform.deepseek.com/](https://platform.deepseek.com/))
   1. API Key của LLM được sử dụng để gọi mô hình lớn trong dự án của riêng bạn. Vì đây là thông tin nhạy cảm, không thể công khai, nên cần viết riêng trong tệp cấu hình.
      **Tại sao phải sử dụng tệp `.env` và không tải lên GitHub?**
   - Tệp `.env` dành riêng để lưu trữ **khóa hoặc mật khẩu** (ví dụ như API Key DeepSeek).
   - Nếu tệp này được tải lên GitHub, toàn bộ thế giới có thể thấy khóa của bạn và lạm dụng nó.
   - Vì lý do bảo mật, chúng ta cần khai báo bỏ qua `.env` trong tệp `.gitignore`, giúp Git không theo dõi nó.
   - Bằng cách này, dự án của bạn vẫn có thể sử dụng bình thường các khóa này trên máy cục bộ, nhưng sẽ không rò rỉ trong kho lưu trữ.

3. Sau khi xem kết quả được tạo, nếu phát hiện lỗi hoặc có cần sửa đổi, bạn có thể nhập yêu cầu sửa đổi trực tiếp trong cửa sổ trò chuyện.
4. Nếu bạn không hài lòng với thiết kế trang, bạn cũng có thể chọn thiết kế lại giao diện trong Figma hoặc Mastergo, sau đó phản hồi ý tưởng thiết kế cho Agent.

- **Ví dụ**

> Vui lòng thiết kế một **ứng dụng Web hai trang** có tên _Word-Snake_.
>
> - **Trang Game:**
> - Rắn được điều khiển di chuyển bằng bàn phím.
> - Rắn ăn các từ tiếng Anh chứ không phải thức ăn thông thường.
> - Bảng điều khiển bên phải hiển thị các từ đã thu thập và số lượng.
> - Sau khi trò chơi kết thúc, kho từ sẽ không bị xóa, tiếp tục sử dụng trong vòng mới.
> - **Trang Make Poem:**
> - Hiển thị kho từ được chia sẻ giống nhau.
> - Người dùng chọn một số từ và nhấp nút **Generate Poem**.
> - Gửi các từ này tới backend, được API DeepSeek tạo một bài thơ.
> - Sau khi tạo bài thơ, xóa hoặc giảm các từ được sử dụng khỏi kho.
> - **Điều hướng:** Chuyển đổi giữa hai trang thông qua Tab hoặc menu trên cùng đơn giản.
> - **Trạng thái được chia sẻ:** Đảm bảo các từ được thu thập luôn được đồng bộ hóa và hiển thị trên cả hai trang.

- **Ví dụ hiệu ứng**

![](images/image1.png)![](images/image2.png)

---

# 5. So sánh nền tảng AI Agent (Cách chọn bộ tổ hợp tốt nhất cho các dự án đơn giản)

Các nền tảng Vibe Coding khác nhau đều có các đặc điểm riêng và luồng công việc. Chúng tôi sử dụng cùng một bộ yêu cầu "trò chơi rắn ăn mồi với API DeepSeek", tiến hành bài kiểm tra thực tế trên nhiều nền tảng, đánh giá ưu nhược điểm của chúng từ góc nhìn của người mới bắt đầu. Dưới đây là tóm tắt.

## 1. Tiêu chuẩn so sánh

1. **Mục tiêu (Goal)**
   Xây dựng một ứng dụng web rắn ăn mồi (Snake) kết nối với API DeepSeek.
2. **Chi tiết trò chơi (Game Details)**
   1. Trò chơi tạo bài thơ thông qua API LLM DeepSeek.
   2. Rắn ăn các từ tiếng Anh, các từ được thu thập sẽ được giữ lại sau khi trò chơi kết thúc, và tiếp tục sử dụng trong vòng mới. Cùng một từ có thể được thu thập nhiều lần, và được tính riêng biệt.
   3. Khi tạo một bài thơ, các từ được sử dụng sẽ bị xóa khỏi kho.

3. **Chức năng bắt buộc (Must-Haves)**
   1. Một trang giao diện người dùng có thể chạy được, bao gồm trò chơi rắn ăn mồi (điều khiển bàn phím, Canvas rendereing).
   2. Cơ chế thu thập từ (từ xuất hiện trên bảng, rắn ăn từ, danh sách thanh bên được cập nhật).
   3. Duy trì tính kiên trì của kho từ giữa các vòng chơi nhiều.
   4. Backend sử dụng API DeepSeek (nếu không có API Key, có thể trả về bài thơ giả để thay thế).
   5. Nút "Tạo bài thơ": Nhấp để gọi backend, hiển thị bài thơ, và cập nhật kho từ dựa trên mức sử dụng.
   6. Hỗ trợ `.env` cho API Key, và tránh rò rỉ khóa thông qua `.gitignore`.

4. **Điểm cộng (Nice-to-Haves)**
   1. Người dùng có thể chọn từ nào để tạo bài thơ.
   2. Trải nghiệm người dùng thân thiện (ví dụ, thanh bên hiển thị rõ ràng danh sách từ, bố cục vùng hiển thị bài thơ hợp lý).
   3. Thêm nhận xét cho người mới bắt đầu trong mã, giải thích logic chính.

## 2. So sánh đầu ra mã hóa

### 1. Lovable (Web-based)

- **Loại nền tảng:** Web
- **Đặc điểm chính và luồng công việc:** Lovable làm rất tốt trong tích hợp và hợp tác, nó tự động hoàn thành các công việc khởi tạo như kết nối cơ sở dữ liệu Supabase, làm cho quá trình xây dựng dự án rất suôn sẻ. Bạn chỉ cần mô tả yêu cầu dự án, Agent sẽ giúp bạn kết nối các dịch vụ khác nhau, xây dựng cấu trúc cơ bản.
- **Người dùng phù hợp:** Đối với những người lần đầu tiên thử Vibe Coding, Lovable là một lựa chọn rất thân thiện. Nó đơn giản hóa độ phức tạp của phối hợp nhiều dịch vụ, cho phép bạn tập trung vào prompt và lặp lại, thay vì cấu hình môi trường. Nhờ tự động hóa cao, bạn có thể nhận được một nguyên mẫu có thể chạy được nhanh chóng.
- **Quá trình prompt:**
  ![](images/image3.png)
- **Hiệu ứng trò chơi rắn ăn mồi:**

![](images/image4.png)![](images/image5.png)

- **Giá cả:** Tương đối đắt, nhưng nếu bạn có email trường học, bạn có thể xác minh học sinh để sử dụng với giá giảm một nửa.
  ![](images/image6.png)

### 2. Cursor (IDE)

- **Loại nền tảng:** Ứng dụng máy tính (PC)
- **Đặc điểm chính và luồng công việc:** Cursor là một IDE chuyên biệt tích hợp khả năng AI, hỗ trợ Windows, macOS và Linux. Nó nhúng các chức năng như tạo mã, viết lại thông minh, truy vấn cơ sở dữ liệu mã trực tiếp vào môi trường phát triển. So với các công cụ Web, nó gần gũi hơn với trải nghiệm phát triển cục bộ truyền thống. Vì đây là môi trường cục bộ, cấu hình của các máy tính khác nhau khác nhau, đôi khi sẽ gặp phải vấn đề liên quan đến môi trường. Ưu điểm là dự án ở máy cục bộ của bạn, không cần tải xuống hoặc cấu hình thêm môi trường chạy, Cursor sẽ giúp bạn xử lý rất nhiều bước phức tạp.
- **Người dùng phù hợp:** Đối với các nhà phát triển có nền tảng lập trình nhất định, Cursor là một môi trường vô cùng mạnh mẽ và quen thuộc. Nhưng đối với những người hoàn toàn mới bắt đầu, cần phải tự hiểu được cấu trúc dự án, quản lý phụ thuộc và tổ chức tệp, v.v., đường cong học tập sẽ dốc hơn. Thích hợp hơn cho các nhà phát triển muốn thêm trợ lý AI vào quy trình mã hóa truyền thống.
- **Quá trình prompt:**
  ![](images/image7.png)
- **Hiệu ứng trò chơi rắn ăn mồi:**

![](images/image8.png)![](images/image9.png)

- **Giá cả:**
  ![](images/image10.png)

### 3. Z.ai (Web-based)

- **Loại nền tảng:** Web
- **Đặc điểm chính và luồng công việc:** Cách sử dụng Z.ai khá trực tiếp, nhưng một thách thức rõ ràng là: bạn cần **sao chép và dán thủ công mã được tạo**. Nền tảng thiếu cửa sổ xem trước thời gian thực, vì vậy rất khó để thấy kết quả chạy mã ngay lập tức.
- **Người dùng phù hợp:** Nền tảng này yêu cầu một phong cách sử dụng "động tay" tương đối. Thiếu tự động hóa có nghĩa là bạn phải xử lý trực tiếp với mã, điều này lại có thể là một bài tập cho những người muốn tìm hiểu sâu về nội dung đầu ra của AI. Nhưng việc sao chép dán thường xuyên sẽ mang lại vấn đề hiệu suất và rủi ro lỗi. Thích hợp hơn cho những học sinh muốn xem "mã đầu ra AI gốc", chứ không phải những người tìm kiếm trải nghiệm một cú nhấp chuột.
- **Quá trình prompt:**
  ![](images/image11.png)
- **Hiệu ứng trò chơi rắn ăn mồi:**

![](images/image12.png)![](images/image13.png)

- **Giá cả:**
  ![](images/image14.png)

### 4. Replit (Web-based)

- **Loại nền tảng:** Web
- **Đặc điểm chính và luồng công việc:** Replit là một môi trường phát triển và triển khai tích hợp trực tuyến, bạn có thể viết mã, chạy chương trình, tạo địa chỉ truy cập trực tuyến trong trình duyệt. Trước khi bắt đầu mã hóa, nó cung cấp một kế hoạch hành động rõ ràng; đồng thời cũng cung cấp trình chỉnh sửa trực quan, bạn có thể chỉnh sửa trực tiếp giao diện người dùng trong cửa sổ xem trước, mã nguồn sẽ tự động đồng bộ hóa. Bằng cách này, bạn có thể kiểm tra bất cứ lúc nào liệu đầu ra của AI có phù hợp với dự kiến không, giảm đáng kể số lần sửa đổi lại.

  ![](images/image15.png)

- **Người dùng phù hợp:** Replit rất thân thiện với người mới bắt đầu. Nó đơn giản hóa vòng lặp hoàn chỉnh từ mã hóa đến triển khai, không cần tự cấu hình dịch vụ máy chủ hoặc dịch vụ lưu trữ bổ sung. Tính năng hợp tác cũng rất mạnh, phù hợp cho các học sinh làm dự án cùng nhau hoặc yêu cầu ai đó từ xa giúp xem mã.
- **Quá trình prompt:** Trong quá trình xây dựng, AI không hiểu hết nhu cầu ngay từ đầu, đã trải qua khoảng 3 lần lặp lại, kết quả cuối cùng mới đạt được hiệu ứng lý tưởng.
  ![](images/image16.png)
- **Hiệu ứng trò chơi rắn ăn mồi:**

![](images/image17.png)![](images/image18.png)

- **Giá cả:**
  ![](images/image19.png)

### 5. Minimax (Web-based)

- **Loại nền tảng:** Web
- **Đặc điểm chính và luồng công việc:** Minimax thường khá tốn thời gian khi thực hiện các tác vụ. Quá trình của nó thường bao gồm: AI tự động phát hiện và sửa chữa lỗi, do đó toàn bộ quá trình có thể chậm hơn, thậm chí hơi mệt. Với dự án này làm ví dụ, Agent thường sẽ tạo một kế hoạch chi tiết trước, sau đó từng bước xây dựng backend, cơ sở dữ liệu và logic frontend.
- **Người dùng phù hợp:** Vì nó sẽ tự động chạy các bài kiểm tra và sửa chữa lỗi, tiêu thụ thời gian và Token đều khá lớn, nhưng bạn có thể rõ ràng thấy AI cách xác định và giải quyết vấn đề như thế nào, từ góc độ học tập rất có giá trị.
- **Quá trình prompt:**

![](images/image20.png)![](images/image21.png)![](images/image22.png)![](images/image23.png)

- **Hiệu ứng trò chơi rắn ăn mồi:**

![](images/image24.png)![](images/image25.png)

- **Giá cả:** Phiên bản miễn phí rất có thể không thể chạy trơn tru từ đầu đến cuối trong các dự án phức tạp, do đó được khuyến nghị nâng cấp thanh toán để đảm bảo dự án có thể được xây dựng hoàn chỉnh.
  ![](images/image26.png)

### 6. Trae (IDE)

- **Loại nền tảng:** Ứng dụng máy tính (PC)
- **Đặc điểm chính và luồng công việc:** Là một ứng dụng máy tính, Trae thường có lợi thế hơn trong hiệu suất và tốc độ phản ứng so với các công cụ Web. Nhưng nó cần tải xuống và cài đặt, điều này sẽ tăng một chút ngưỡng nhập cảnh cho một số người dùng. Tương tự như vậy, vì đây là một môi trường cục bộ, sự khác biệt trong cấu hình máy tính khác nhau và môi trường phụ thuộc sẽ mang lại một số tính không chắc chắn. Ưu điểm là Trae sẽ giúp bạn hoàn thành việc tạo dự án và cấu hình chạy ở cục bộ, bạn có thể phát triển và gỡ lỗi trực tiếp trên máy bạn.
- **Người dùng phù hợp:** Thích hợp hơn cho các người dùng có kế hoạch thực hiện dài hạn các dự án Vibe Coding và hy vọng sử dụng một công cụ máy tính chuyên dụng. Đối với các học sinh chỉ muốn "chơi một cách tình cờ", nó có thể không phải là lựa chọn nhẹ nhất.
- **Quá trình prompt:**
  ![](images/image27.png)
- **Hiệu ứng trò chơi rắn ăn mồi:**

![](images/image28.png)![](images/image29.png)

- **Giá cả:** Giá cả tương đối hợp lý, thậm chí phiên bản miễn phí cũng đủ để hoàn thành các dự án nhỏ có chất lượng tốt.
  ![](images/image30.png)

### 7. V0 (Web-based)

- **Loại nền tảng:** Web
- **Đặc điểm chính và luồng công việc:** V0 là một công cụ tập trung vào việc tạo các thành phần giao diện người dùng React, được cung cấp bởi Vercel. Nó thể hiện sức mạnh xuất sắc trong việc tạo giao diện chất lượng cao và có thể sử dụng cho môi trường sản xuất. Nhưng trong việc sử dụng thực tế, sẽ gặp phải các vấn đề như "khó tìm cửa sổ mã", "không có hướng dẫn rõ ràng về nơi nên cấu hình API Key", v.v.
- **Người dùng phù hợp:** V0 rất thích hợp cho các sinh viên hoặc nhà thiết kế tập trung vào frontend và UI/UX. Nhưng nó không phải là một giải pháp full-stack hoàn chỉnh, bạn vẫn cần sử dụng các nền tảng khác để thực hiện logic backend và tích hợp API, do đó nếu mục tiêu của bạn là "xây dựng một ứng dụng hoàn chỉnh một lần", nó có thể không phải là lựa chọn tốt nhất.
- **Quá trình prompt:**
  ![](images/image31.png)

  ![](images/image32.png)

- **Hiệu ứng trò chơi rắn ăn mồi:**
  ![](images/image33.png)![](images/image34.png)
- **Giá cả:** Người dùng miễn phí có thể xây dựng khoảng 4–5 dự án đơn giản.
  ![](images/image35.png)

## 3. Tóm tắt so sánh nền tảng

| **Nền tảng**                               | **Đánh giá**                                                                   | **Nền tảng** | **Ghi chú**                                                                    |
| ------------------------------------------ | ------------------------------------------------------------------------------ | ------------ | ------------------------------------------------------------------------------ |
| **[Lovable](https://lovable.dev/)**        | Rất thân thiện với những người mới lập trình AI, dễ bắt đầu, trải nghiệm mượt. | Web-based    | Tự động hoàn thành kết nối dịch vụ Supabase, giảm chi phí cấu hình.            |
| **[Cursor](https://cursor.com/cn/agents)** | Thích hợp cho các nhà phát triển có kinh nghiệm, đáng kể nâng cao năng suất.  | PC           | Cần có nền tảng lập trình nhất định, tự hiểu cấu trúc dự án và phụ thuộc cục bộ. |
| **[Z.ai](https://chat.z.ai/)**             | Phù hợp hơn với người dùng có nền tảng lập trình, muốn tìm hiểu chi tiết.     | Web-based    | Không có cửa sổ xem trước, kiểm tra kết quả phiền phức; cần sao chép dán, tạo thư mục và tệp, chạy dịch vụ thủ công. |
| **[Replit](https://replit.com/~)**         | Được khuyến nghị cho những người muốn biến ý tưởng thành dịch vụ trực tuyến. | Web-based    | Phát triển và triển khai tích hợp trực tuyến, hỗ trợ hợp tác và trình chỉnh sửa trực quan. |
| **[Minimax](https://agent.minimaxi.com/)** | Thích hợp cho những người muốn thấy toàn bộ quy trình kiểm tra và sửa chữa AI. | Web-based    | Toàn bộ quá trình khá dài, AI sẽ chạy kiểm tra và sửa chữa lỗi nhiều lần.      |
| **[Trae](https://www.trae.ai/)**           | Dành cho những người có kinh nghiệm, muốn sử dụng kết hợp IDE máy tính + AI. | PC           | Cần cài đặt và cấu hình cục bộ, nhưng hiệu suất tốt hơn, thích hợp dài hạn.    |
| **[V0](https://v0.app/)**                  | Tối ưu hóa cho các nhà thiết kế/sinh viên muốn tạo nhanh React UI hiệu ứng.  | Web-based    | Tập trung tạo React UI, cần kết hợp với nền tảng khác để hoàn thành backend.  |
