# Quy trình phát triển hỗ trợ bởi AI

Trong các chương trước, bạn đã học cách sử dụng AI IDE để viết code, cách dùng Git quản lý phiên bản, cách thiết kế và xây dựng giao diện API. Nhưng khi đối mặt với một nhiệm vụ phát triển thực tế, bạn có thể gặp phải những vấn đề này:

- "Dự án này có hàng ngàn file, tôi nên bắt đầu từ đâu?"
- "Boss yêu cầu tôi thêm một tính năng mới, nhưng tôi chưa quen với phần code này"
- "Bug này nằm ở đâu đó, code quá nhiều"
- "Cần refactor đống code này, nhưng sợ làm hỏng"

Bản chất của những vấn đề này là: **Làm thế nào để sử dụng công cụ AI một cách hiệu quả trong các tình huống phát triển thực tế?**

Trong phần này, bạn sẽ học cách xây dựng một quy trình phát triển hỗ trợ bởi AI có hệ thống, giúp bạn có thể sử dụng công cụ AI một cách hiệu quả trong các tình huống phát triển khác nhau. Chúng ta sẽ đi qua các trường hợp cụ thể và minh họa cách sử dụng AI trong phát triển tính năng mới, sửa lỗi, refactor code, v.v.

> 💡 **Kiến thức tiên quyết**
> 
> Trước khi học phần này, bạn nên tìm hiểu về:
> - [Cơ bản về AI IDE](../../stage-1/ai-ide/) - Nắm vững cách sử dụng AI IDE
> - [Quy trình làm việc Git và GitHub](../../stage-2/backend/git-workflow/) - Hiểu rõ về quản lý phiên bản code
> - [Viết code giao diện API với hỗ trợ từ mô hình lớn](../../stage-2/backend/ai-interface-code/) - Hiểu các khái niệm cơ bản về phát triển hỗ trợ bởi AI

::: info 📚 Bạn sẽ học được

1. Hiểu vị trí và giới hạn khả năng của AI trong quy trình phát triển
2. Nắm vững chiến lược phát triển hỗ trợ bởi AI cho các loại dự án khác nhau
3. Học cách sử dụng Claude Code trong các tình huống phát triển tính năng mới, sửa lỗi, refactor code
4. Xây dựng kho kiến thức dự án để tăng hiệu quả hợp tác với Claude Code
5. Nắm vững các kỹ thuật thực tế để nâng cao hiệu quả hợp tác với AI

:::

# 1. Hiểu giới hạn khả năng của AI

Trước khi bắt đầu sử dụng AI hỗ trợ phát triển, chúng ta cần hiểu rõ AI có thể làm gì và không thể làm gì. Chỉ khi đó mới có thể xây dựng cách hợp tác phù hợp.

## 1.1 AI giỏi ở điều gì

Hãy tưởng tượng AI như một trợ lý rất thông minh nhưng cần những lệnh rõ ràng. Nó có thể tạo ra khung code nhanh chóng dựa trên mô tả của bạn, và trong vài giây có thể đọc xong hàng ngàn dòng code để tìm phần bạn cần. Khi gặp phải lỗi cú pháp rõ ràng hoặc lỗ hổng bảo mật phổ biến, nó cũng có thể giúp bạn phát hiện. Những công việc lặp đi lặp lại, như đổi tên biến hàng loạt, định dạng code, tạo tài liệu chú thích, giao cho nó là tốt nhất.

Nói đơn giản, AI giỏi ở những công việc có quy tắc rõ ràng và có thể tự động hóa được.

## 1.2 AI không giỏi ở điều gì

Nhưng AI cũng có những hạn chế. Nó không hiểu logic kinh doanh của bạn — trừ khi bạn kể chi tiết, nó không biết quy trình đơn hàng của công ty bạn hoạt động như thế nào. Lựa chọn công nghệ, thiết kế kiến trúc, những quyết định cần cân nhắc lợi ích, nó cũng không thể làm được vì những việc này đòi hỏi kinh nghiệm và sự hiểu biết của bạn về dự án. Các quy tắc đặc biệt của nhóm bạn, chẳng hạn "tất cả API phải thêm log", "mã lỗi phải dùng enum", AI cũng sẽ không biết, cần bạn cấu hình hoặc yêu cầu rõ ràng.

Quan trọng nhất là code được AI tạo ra không thể sử dụng trực tiếp, bạn phải kiểm tra và thử nghiệm. Nó có thể viết ra code trông đúng nhưng thực tế có vấn đề, hoặc có thể bỏ qua một số trường hợp biên.

## 1.3 Làm thế nào để hợp tác với AI

Khi hiểu rõ giới hạn khả năng của AI, cách hợp tác sẽ rõ ràng: bạn chịu trách nhiệm tìm hiểu rõ cần làm gì, đưa ra quyết định, kiểm soát chất lượng; AI chịu trách nhiệm thực hiện code cụ thể, tìm kiếm thông tin, phát hiện các vấn đề rõ ràng.

Giống như bạn hợp tác với một lập trình viên mới — bạn nói cho họ biết cần làm gì, họ thực hiện, sau đó bạn kiểm tra code. Khác biệt là AI thực hiện nhanh hơn rất nhiều, nhưng khả năng phán đoán không bằng con người.

# 2. Chiến lược phát triển cho các loại dự án khác nhau

Các loại dự án khác nhau có cách phát triển và chiến lược sử dụng AI khác nhau. Chọn chiến lược phù hợp có thể tăng hiệu quả phát triển rất nhiều.

## 2.1 Dự án mới (từ con số 0)

**Đặc điểm dự án:**
- Không có gánh nặng lịch sử, có thể thiết kế tự do
- Cần xây dựng cấu trúc dự án và quy tắc code
- Phù hợp với lặp lại nhanh và thử nghiệm

**Quy trình làm việc được đề xuất:**

**Bước 1: Lập kế hoạch cấu trúc dự án**

Trước khi bắt đầu coding, hãy để AI giúp bạn lập kế hoạch cấu trúc dự án và lựa chọn công nghệ:

```
Tôi muốn làm một ứng dụng quản lý nhiệm vụ với các chức năng:
- Đăng ký và đăng nhập người dùng
- Tạo, chỉnh sửa, xóa nhiệm vụ
- Phân loại nhiệm vụ và thẻ
- Nhắc nhở nhiệm vụ

Vui lòng giúp tôi:
1. Đề xuất stack công nghệ phù hợp
2. Thiết kế cấu trúc thư mục dự án
3. Lập kế hoạch cấu trúc bảng cơ sở dữ liệu
```

**Bước 2: Xây dựng khung cơ bản**

Dựa trên kế hoạch, để AI tạo cấu trúc dự án cơ bản:

```
Theo kế hoạch vừa rồi, vui lòng giúp tôi:
1. Tạo cấu trúc thư mục dự án
2. Khởi tạo tệp cấu hình (package.json, .env, v.v.)
3. Tạo code máy chủ cơ bản
```

**Bước 3: Triển khai từng chức năng**

Theo độ ưu tiên, triển khai từng mô-đun chức năng:

```
Bây giờ hãy triển khai chức năng đăng ký người dùng, với yêu cầu:
- Đăng ký bằng email và mật khẩu
- Mã hóa mật khẩu trước lưu trữ
- Xác minh email
```

**Điểm chính:**
- Ngay từ đầu hãy thiết lập quy tắc code, để AI tạo code theo quy tắc
- Sau khi hoàn thành từng mô-đun chức năng hãy kiểm tra xác minh
- Cập nhật tài liệu dự án kịp thời

## 2.2 Dự án trưởng thành (đã có rất nhiều code)

**Đặc điểm dự án:**
- Lượng code lớn, có quy tắc lịch sử
- Cần giữ tính nhất quán của phong cách code
- Thay đổi cần xem xét phạm vi tác động

**Quy trình làm việc được đề xuất:**

**Bước 1: Tìm hiểu cấu trúc dự án**

Trước khi sửa code, hãy để AI giúp bạn tìm hiểu dự án:

```
Đây là một dự án thương mại điện tử, tôi cần thêm chức năng mã giảm giá.
Vui lòng giúp tôi:
1. Phân tích cấu trúc tổng thể của dự án
2. Tìm code liên quan đến đơn hàng
3. Xem các tính năng tương tự khác được triển khai như thế nào
```

**Bước 2: Tìm code tham chiếu**

Để AI tìm code tương tự trong dự án để làm tham chiếu:

```
Tìm cách dự án triển khai các hoạt động khuyến mại khác (như giảm giá, chiết khấu)
```

**Bước 3: Bắt chước phong cách hiện có**

Để AI tham chiếu phong cách code hiện có để triển khai tính năng mới:

```
Tham chiếu cách triển khai hoạt động giảm giá, vui lòng triển khai chức năng mã giảm giá
Giữ nguyên phong cách code và cấu trúc thư mục
```

**Điểm chính:**
- Hiểu rõ trước khi động, tránh phá hủy kiến trúc hiện có
- Giữ tính nhất quán của phong cách code
- Sau khi sửa phải kiểm tra các chức năng liên quan

## 2.3 Mẫu nhanh (xác minh ý tưởng)

**Đặc điểm dự án:**
- Ưu tiên tốc độ, không quá quan tâm đến chất lượng code
- Dùng để xác minh ý tưởng sản phẩm hoặc giải pháp kỹ thuật
- Có thể sẽ bị loại bỏ hoặc viết lại

**Quy trình làm việc được đề xuất:**

**Mô tả nhu cầu trực tiếp, triển khai nhanh:**

```
Làm một ứng dụng để-làm việc đơn giản, yêu cầu:
- Có thể thêm, xóa, đánh dấu hoàn thành nhiệm vụ
- Dữ liệu được lưu trữ cục bộ
- Giao diện đơn giản, có thể dùng được
```

**Lặp lại nhanh:**

```
Thêm chức năng tìm kiếm
Đổi sang chủ đề tối
Thêm phân loại nhiệm vụ
```

**Điểm chính:**
- Không cần quá quan tâm đến chất lượng code và quy tắc
- Xác minh ý tưởng nhanh, điều chỉnh hướng kịp thời
- Nếu mẫu thành công, cần refactor sau

## 2.4 Dự án bảo trì (chủ yếu sửa lỗi)

**Đặc điểm dự án:**
- Code đã ổn định, chủ yếu là sửa lỗi
- Cần định vị nhanh chóng vấn đề
- Thay đổi cần thận trọng, tránh gây ra vấn đề mới

**Quy trình làm việc được đề xuất:**

**Bước 1: Định vị vấn đề**

```
Người dùng phản hồi: Sau khi nhấn nút "Gửi đơn hàng", trang bị treo
Lỗi trên bảng điều khiển: TypeError: Cannot read property 'id' of undefined

Vui lòng giúp tôi:
1. Phân tích các nguyên nhân có thể
2. Tìm code liên quan
```

**Bước 2: Phân tích nguyên nhân gốc**

```
Xem lỗi này được tạo ra trong hoàn cảnh nào
Kiểm tra luồng dữ liệu
```

**Bước 3: Thực hiện sửa chữa**

```
Sửa vấn đề này, với yêu cầu:
1. Thêm code phòng vệ, kiểm tra xem user có tồn tại không
2. Nếu user không tồn tại, chuyển hướng sang trang đăng nhập
3. Thêm thông báo lỗi thân thiện
```

**Điểm chính:**
- Sau khi sửa phải kiểm tra kỹ lưỡng, đảm bảo không ảnh hưởng tính năng khác
- Thêm code phòng vệ, cải thiện độ bền của hệ thống
- Ghi chép lỗi và giải pháp, tiện tham khảo sau

# 3. Quy trình làm việc cho các nhiệm vụ phát triển phổ biến

Trong phát triển hàng ngày, bạn sẽ gặp phải các loại nhiệm vụ khác nhau. Dưới đây là giới thiệu quy trình AI hỗ trợ cho một số nhiệm vụ phổ biến nhất.

## 3.1 Phát triển tính năng mới

**Tình huống:** Nhà quản lý sản phẩm đã cho bạn một yêu cầu mới, cần triển khai một tính năng mới.

**Quy trình hoàn chỉnh:**

**Bước 1: Hiểu yêu cầu** (Bạn tự hoàn thành)

Trước khi bắt đầu coding, hãy làm rõ:
- Cần triển khai chức năng gì?
- Đầu vào và đầu ra là gì?
- Có những điều kiện biên và tình huống ngoại lệ nào?
- Yêu cầu về hiệu suất và bảo mật là gì?

**Bước 2: Tìm hiểu code hiện có** (Để AI giúp bạn)

```
Tôi cần triển khai chức năng bình luận người dùng, vui lòng giúp tôi:
1. Xem trong dự án có chức năng tương tự không
2. Tìm cách lưu trữ dữ liệu người dùng và bài viết
3. Tìm hiểu quy tắc hoạt động cơ sở dữ liệu của dự án
```

**Bước 3: Lập kế hoạch triển khai** (Cùng AI)

```
Dựa trên phân tích vừa rồi, triển khai chức năng bình luận cần:
1. Tạo mô hình dữ liệu bình luận
2. Triển khai API thêm, xóa, sửa, xem bình luận
3. Thêm chức năng hiển thị và gửi bình luận vào frontend

Vui lòng xác minh kế hoạch này có hợp lý không, có thiếu gì không
```

**Bước 4: Triển khai chức năng** (AI tạo, bạn kiểm tra)

```
Theo kế hoạch, trước tiên hãy triển khai mô hình dữ liệu bình luận
Yêu cầu:
- Chứa nội dung bình luận, tác giả, ID bài viết, thời gian tạo
- Hỗ trợ trả lời bình luận lồng nhau
- Thêm các chỉ mục cần thiết
```

```
Bây giờ hãy triển khai giao diện API bình luận
Yêu cầu:
- Gửi bình luận
- Xóa bình luận (chỉ có thể xóa bình luận của chính mình)
- Lấy tất cả bình luận của bài viết
- Hỗ trợ phân trang
```

```
Cuối cùng hãy triển khai component bình luận trên frontend
Yêu cầu:
- Hiển thị danh sách bình luận
- Biểu mẫu gửi bình luận
- Hỗ trợ trả lời bình luận
```

**Bước 5: Kiểm tra xác minh** (Bạn tự hoàn thành)

- Thử nghiệm luồng chính bằng tay
- Kiểm tra trường hợp biên (nội dung trống, nội dung quá dài, v.v.)
- Kiểm tra kiểm soát quyền (không thể xóa bình luận của người khác)
- Để AI giúp bạn viết kiểm tra tự động

**Ví dụ đối thoại thực tế:**

```
Bạn: Tôi cần thêm chức năng bình luận người dùng, người dùng có thể bình luận về bài viết

AI: Tôi sẽ tìm hiểu cấu trúc dự án trước.
    [AI phân tích code dự án]
    Tôi thấy dự án đã có hệ thống người dùng (models/user.js) và hệ thống bài viết (models/article.js).
    
    Triển khai chức năng bình luận cần:
    1. Tạo mô hình dữ liệu bình luận (models/comment.js)
    2. Thêm API liên quan đến bình luận (routes/comment.js)
    3. Thêm chức năng hiển thị bình luận và gửi bình luận vào trang chi tiết bài viết
    
    Bạn muốn tôi bắt đầu không?

Bạn: Được, bắt đầu đi. Trước tiên hãy tạo mô hình dữ liệu

AI: [Tạo code models/comment.js]
    Tôi đã tạo mô hình dữ liệu bình luận, với các trường sau:
    - id: ID bình luận
    - content: nội dung bình luận
    - userId: ID tác giả
    - articleId: ID bài viết
    - parentId: ID bình luận cha (dùng cho trả lời lồng nhau)
    - createdAt: thời gian tạo
    
    Tiếp theo hãy triển khai giao diện API không?

Bạn: Được, triển khai giao diện API
```

## 3.2 Sửa lỗi

**Tình huống:** Người dùng báo cáo một vấn đề, cần định vị và sửa nhanh chóng.

**Quy trình hoàn chỉnh:**

**Bước 1: Thu thập thông tin** (Bạn tự hoàn thành)

Ghi lại các thông tin sau:
- Thông báo lỗi là gì?
- Làm thế nào để lặp lại vấn đề này?
- Khi nào bắt đầu xuất hiện?
- Phạm vi ảnh hưởng lớn đến mức nào?

**Bước 2: Định vị vấn đề** (Để AI giúp bạn)

```
Người dùng phản hồi: Sau khi nhấn nút "Gửi đơn hàng", trang treo
Lỗi trên bảng điều khiển: TypeError: Cannot read property 'id' of undefined
Lỗi xuất hiện ở dòng 45 của checkout.js

Vui lòng giúp tôi:
1. Phân tích các nguyên nhân có thể
2. Tìm code liên quan
3. Kiểm tra luồng dữ liệu
```

**Bước 3: Phân tích nguyên nhân gốc** (Cùng AI)

```
Xem object user này đến từ đâu
Kiểm tra xem trong tình huống nào user sẽ là undefined
```

**Bước 4: Thực hiện sửa chữa** (AI tạo, bạn kiểm tra)

```
Sửa vấn đề này, yêu cầu:
1. Thêm code phòng vệ, kiểm tra xem user có tồn tại không
2. Nếu user không tồn tại, chuyển hướng sang trang đăng nhập
3. Thêm thông báo lỗi thân thiện
```

**Bước 5: Xác minh sửa chữa** (Bạn tự hoàn thành)

- Lặp lại theo các bước ban đầu, xác nhận vấn đề được giải quyết
- Kiểm tra các chức năng liên quan, đảm bảo không gây ra vấn đề mới
- Suy nghĩ xem có nơi nào khác gặp vấn đề tương tự không

**Ví dụ đối thoại thực tế:**

```
Bạn: Người dùng phản hồi sau khi đăng nhập và làm mới trang thì bị đăng xuất

AI: Đây thường là vấn đề về lưu trữ hoặc xác minh token. Hãy cho tôi kiểm tra:
    1. Token được lưu trữ ở đâu? localStorage hay cookie?
    2. Khi làm mới trang có tái đọc token không?
    
    Vui lòng cho tôi biết code liên quan đến token ở file nào

Bạn: Ở utils/auth.js

AI: [Phân tích utils/auth.js]
    Tôi tìm thấy vấn đề: token được lưu trong sessionStorage,
    sau khi làm mới trang sessionStorage sẽ được xóa.
    
    Giải pháp: Thay đổi để lưu token vào localStorage
    
    Bạn muốn tôi sửa không?

Bạn: Được, sửa đi

AI: [Sửa code]
    Sửa xong. Bây giờ token sẽ được lưu trong localStorage,
    sau khi làm mới trang sẽ không bị mất.
    
    Tôi đề xuất bạn kiểm tra:
    1. Đăng nhập rồi làm mới trang, xác nhận vẫn ở trạng thái đã đăng nhập
    2. Đóng trình duyệt rồi mở lại, xác nhận vẫn ở trạng thái đã đăng nhập
```

## 3.3 Refactor code

**Tình huống:** Code trở nên khó bảo trì, cần refactor để cải thiện chất lượng code.

**Quy trình hoàn chỉnh:**

**Bước 1: Xác định mục tiêu refactor** (Bạn tự hoàn thành)

Làm rõ các vấn đề sau:
- Cần giải quyết vấn đề gì? (Code lặp lại? Cấu trúc hỗn loạn? Vấn đề hiệu suất?)
- Phạm vi refactor lớn đến mức nào?
- Mức độ rủi ro có thể chấp nhận là bao nhiêu?

**Bước 2: Lập kế hoạch refactor** (Cùng AI)

```
Ba hàm này (getUserList, getArticleList, getCommentList)
có rất nhiều code lặp lại, đều làm phân trang, sắp xếp, lọc.

Vui lòng giúp tôi:
1. Phân tích phần lặp lại
2. Đề xuất phương án refactor
3. Đánh giá rủi ro refactor
```

**Bước 3: Chuẩn bị "lưới an toàn"** (Để AI giúp bạn)

```
Trước khi refactor, hãy viết test case cho tôi
Đảm bảo sau refactor chức năng vẫn không thay đổi
```

**Bước 4: Refactor từng bước** (AI thực hiện, bạn xác minh)

```
Theo phương án vừa rồi, trước tiên hãy trích xuất hàm chung
```

```
Bây giờ tối ưu hóa cấu trúc dữ liệu
```

```
Cuối cùng cập nhật nơi gọi hàm
```

**Bước 5: Xác minh kết quả** (Bạn tự hoàn thành)

- Chạy tất cả test, đảm bảo đạt
- Thử nghiệm chức năng chính bằng tay
- Kiểm tra xem chất lượng code có được cải thiện không

**Ví dụ đối thoại thực tế:**

```
Bạn: Ba hàm này có rất nhiều code lặp lại, có thể giúp tôi refactor không?
    [Dán code của ba hàm]

AI: Tôi phân tích thấy ba hàm này khác nhau ở:
    - getUserList: lấy danh sách người dùng
    - getArticleList: lấy danh sách bài viết
    - getCommentList: lấy danh sách bình luận
    
    Logic chung là: phân trang, sắp xếp, lọc
    
    Phương án refactor:
    1. Trích xuất hàm getList chung
    2. Đặt phần khác nhau thành tham số truyền vào
    
    Cách này có thể giảm 80% code lặp lại.
    
    Bạn muốn tôi triển khai không?

Bạn: Được, nhưng trước tiên viết test case cho tôi

AI: [Tạo test case]
    Tôi đã viết test case cho ba hàm này,
    bao phủ các tình huống sử dụng chính.
    
    Bây giờ có thể bắt đầu refactor không?

Bạn: Được, bắt đầu refactor

AI: [Refactor code]
    Refactor xong. Tôi đã tạo hàm getList chung,
    ba hàm ban đầu bây giờ đều gọi hàm chung này.
    
    Vui lòng chạy test để xác nhận chức năng bình thường: npm test
```

## 3.4 Kiểm tra code

**Tình huống:** Đồng nghiệp gửi code, cần bạn kiểm tra.

**Quy trình hoàn chỉnh:**

**Bước 1: Tìm hiểu nhanh thay đổi** (Để AI giúp bạn)

```
Tóm tắt PR này làm những gì
Tệp nào đã thay đổi chủ yếu
```

**Bước 2: Kiểm tra vấn đề thường gặp** (Để AI giúp bạn)

```
Kiểm tra thay đổi này:
1. Có vấn đề bảo mật không (SQL injection, XSS, v.v.)
2. Có vấn đề hiệu suất không (truy vấn N+1, rò rỉ bộ nhớ, v.v.)
3. Có Bug rõ ràng không
4. Phong cách code có phù hợp với quy tắc dự án không
```

**Bước 3: Kiểm tra sâu** (Bạn tự hoàn thành)

- Logic kinh doanh có đúng không
- Có xem xét trường hợp biên không
- Có cách triển khai tốt hơn không
- Có cần thêm kiểm tra không

**Bước 4: Đưa ra phản hồi** (Bạn tự hoàn thành)

- Chỉ ra chỗ cần sửa
- Giải thích tại sao cần sửa
- Đề xuất cải tiến

**Ví dụ đối thoại thực tế:**

```
Bạn: Giúp tôi kiểm tra PR này
    [Cung cấp liên kết PR hoặc code]

AI: Tôi đã kiểm tra thay đổi, phát hiện vấn đề sau:
    
    1. Vấn đề bảo mật:
       - Dòng 23: Đầu vào người dùng chưa được chuyển đổi, có rủi ro XSS
       - Dòng 45: Truy vấn SQL nối chuỗi trực tiếp, có rủi ro injection
    
    2. Vấn đề hiệu suất:
       - Dòng 67: Truy vấn cơ sở dữ liệu trong vòng lặp, gây vấn đề N+1
    
    3. Chất lượng code:
       - Hàm handleSubmit quá dài (200 dòng), nên tách nhỏ
       - Thiếu xử lý lỗi
    
    Bạn muốn tôi giải thích chi tiết các vấn đề này không?

Bạn: Giải thích chi tiết vấn đề SQL injection

AI: Ở dòng 45:
    ```javascript
    const query = `SELECT * FROM users WHERE name = '${userName}'`;
    ```
    
    Cách viết này nối trực tiếp đầu vào người dùng vào câu lệnh SQL,
    nếu người dùng nhập `' OR '1'='1`, sẽ trở thành:
    ```sql
    SELECT * FROM users WHERE name = '' OR '1'='1'
    ```
    Điều này sẽ trả về dữ liệu tất cả người dùng.
    
    Cách đúng là dùng truy vấn tham số:
    ```javascript
    const query = 'SELECT * FROM users WHERE name = ?';
    db.query(query, [userName]);
    ```
    
    Bạn muốn tôi sửa không?
```

# 4. Xây dựng kho kiến thức dự án

Để AI hiểu rõ hơn về dự án của bạn, nên xây dựng kho kiến thức trong dự án. Như vậy AI có thể làm việc theo quy tắc và thói quen của bạn.

## 4.1 Tạo tệp hướng dẫn dự án

Tạo tệp `CLAUDE.md` hoặc `AGENTS.md` ở thư mục gốc dự án, ghi lại các thông tin chính của dự án:

```markdown
# Hướng dẫn dự án

## Tổng quan dự án
Đây là một nền tảng giáo dục trực tuyến, cung cấp quản lý khóa học, học tập người dùng, gửi bài tập, v.v.

## Stack công nghệ
- Frontend: React 18 + TypeScript + Vite
- Backend: Node.js + Express + PostgreSQL
- Triển khai: Vercel (frontend) + Railway (backend)

## Cấu trúc dự án
```
src/
├── components/     # Component React
├── pages/         # Component trang
├── api/           # Gọi API
├── utils/         # Hàm tiện ích
└── types/         # Định nghĩa kiểu TypeScript
```

## Quy tắc code
- Dùng ESLint và Prettier định dạng code
- File component dùng PascalCase (ví dụ UserProfile.tsx)
- Hàm tiện ích dùng camelCase (ví dụ formatDate.ts)
- Hằng số dùng UPPER_SNAKE_CASE (ví dụ API_BASE_URL)

## Quy trình phát triển
1. Tạo nhánh tính năng từ nhánh main
2. Phát triển xong gửi PR
3. Sau khi kiểm tra code được duyệt thì hợp nhất

## Nhiệm vụ thường gặp
- Khởi động máy chủ phát triển: `npm run dev`
- Chạy kiểm tra: `npm test`
- Xây dựng phiên bản sản phẩm: `npm run build`
- Định dạng code: `npm run format`

## Lưu ý
- Tất cả gọi API đều phải thêm xử lý lỗi
- Đầu vào người dùng phải xác thực và chuyển đổi
- Hoạt động cơ sở dữ liệu dùng truy vấn tham số, tránh SQL injection
- Thông tin nhạy cảm (mật khẩu, token) không được ghi vào nhật ký

## Cấu trúc bảng cơ sở dữ liệu
- users: Bảng người dùng (id, email, password_hash, created_at)
- courses: Bảng khóa học (id, title, description, teacher_id)
- enrollments: Bảng đăng ký khóa học (id, user_id, course_id, enrolled_at)
```

## 4.2 Ghi chép vấn đề thường gặp và giải pháp

Tạo `docs/troubleshooting.md` trong dự án, ghi lại vấn đề thường gặp:

```markdown
# Vấn đề thường gặp

## Vấn đề môi trường phát triển

### Vấn đề: npm install bị lỗi
**Nguyên nhân:** Phiên bản Node không tương thích
**Giải pháp:** Dùng Node.js 18 hoặc phiên bản cao hơn

### Vấn đề: Kết nối cơ sở dữ liệu bị lỗi
**Nguyên nhân:** Biến môi trường chưa được cấu hình
**Giải pháp:** Copy `.env.example` thành `.env`, điền thông tin kết nối cơ sở dữ liệu

## Vấn đề chức năng

### Vấn đề: Sau khi đăng nhập và làm mới trang thì bị đăng xuất
**Nguyên nhân:** Token được lưu trong sessionStorage
**Giải pháp:** Đổi sang lưu token trong localStorage

### Vấn đề: Upload ảnh bị lỗi
**Nguyên nhân:** Kích thước tệp vượt quá giới hạn
**Giải pháp:** Thêm kiểm tra kích thước tệp ở frontend, giới hạn 5MB
```

## 4.3 Bảo trì bản ghi quyết định kỹ thuật

Tạo thư mục `docs/decisions/`, ghi lại các quyết định kỹ thuật quan trọng:

```markdown
# ADR-001: Chọn PostgreSQL làm cơ sở dữ liệu

## Trạng thái
Đã được áp dụng

## Nền tảng
Dự án cần chọn một cơ sở dữ liệu quan hệ, các phương án ứng cử là MySQL và PostgreSQL.

## Quyết định
Chọn PostgreSQL

## Lý do
1. Hỗ trợ JSON tốt hơn, phù hợp lưu trữ nội dung khóa học
2. Chức năng tìm kiếm toàn văn bản mạnh mẽ hơn
3. Các thành viên nhóm quen thuộc với PostgreSQL hơn

## Hệ quả
- Cần tìm hiểu các chức năng đặc biệt của PostgreSQL
- Khi triển khai cần có môi trường PostgreSQL
```

# 5. Mẹo để nâng cao hiệu quả hợp tác với AI

Nắm vững một số mẹo thực tế có thể làm cho hợp tác với AI của bạn hiệu quả hơn.

## 5.1 Mô tả rõ ràng và cụ thể

**Mô tả không tốt:**
```
Chức năng này bị lỗi
Giúp tôi tối ưu hóa một chút
```

**Mô tả tốt:**
```
Sau khi người dùng nhấn nút "Gửi", biểu mẫu không được gửi
Lỗi trên bảng điều khiển: Uncaught TypeError: Cannot read property 'value' of null
Lỗi xuất hiện ở dòng 23 của form.js

Danh sách này tải rất chậm, có 1000 mục dữ liệu
Vui lòng thêm chức năng phân trang, hiển thị 20 mục một trang
```

**Điểm chính:**
- Cung cấp thông báo lỗi cụ thể
- Nói rõ kết quả mong muốn
- Cung cấp bối cảnh liên quan

## 5.2 Chỉ làm một việc một lần

**Cách không tốt:**
```
Giúp tôi triển khai đăng nhập, đăng ký, quên mật khẩu, trung tâm cá nhân,
đổi mật khẩu, xác minh email các chức năng này
```

**Cách tốt:**
```
Trước tiên triển khai chức năng đăng nhập, yêu cầu:
- Đăng nhập bằng email và mật khẩu
- Nhớ trạng thái đăng nhập
- Thông báo lỗi

(Hoàn thành) Bây giờ triển khai chức năng đăng ký

(Hoàn thành) Bây giờ triển khai chức năng quên mật khẩu
```

**Điểm chính:**
- Chia nhỏ nhiệm vụ lớn thành nhiệm vụ nhỏ
- Sau mỗi hoàn thành một nhiệm vụ hãy kiểm tra xác minh
- Xác nhận không có vấn đề rồi tiếp tục

## 5.3 Xác minh kết quả kịp thời

**Cách không tốt:**
- Để AI sửa liên tục 10 file
- Cuối cùng phát hiện file đầu tiên bị lỗi
- Lãng phí rất nhiều thời gian

**Cách tốt:**
- Sửa một file, kiểm tra ngay
- Xác nhận không có vấn đề rồi tiếp tục
- Phát hiện vấn đề thì sửa kịp

**Điểm chính:**
- Bước nhỏ, phản hồi nhanh
- Không tin mù quạng AI
- Giữ quyền kiểm soát code

## 5.4 Tận dụng bối cảnh

**Mẹo 1: Tham chiếu đối thoại trước đó**
```
Triển khai theo phương án vừa rồi
Tham chiếu hàm getUserList trước đó
```

**Mẹo 2: Cung cấp code liên quan**
```
Đây là code mô hình người dùng hiện có:
[Dán code]

Vui lòng tham chiếu phong cách này triển khai mô hình bài viết
```

**Mẹo 3: Nói rõ nền tảng dự án**
```
Đây là dự án thương mại điện tử, dùng React + Node.js
Đã có hệ thống người dùng và hệ thống sản phẩm
Bây giờ cần thêm chức năng giỏ hàng
```

## 5.5 Lưu lại đối thoại hữu ích

**Tình huống:** Giải quyết được một vấn đề phức tạp

**Cách làm:**
1. Ghi chép giải pháp vào tài liệu dự án
2. Lần sau gặp vấn đề tương tự có thể tham khảo
3. Chia sẻ cho các thành viên nhóm khác

**Ví dụ:**

Tạo tài liệu ở thư mục `docs/solutions/`:

```markdown
# Giải quyết vấn đề truy vấn N+1

## Mô tả vấn đề
Khi lấy danh sách bài viết, mỗi bài viết đều truy vấn thông tin tác giả một lần,
gây vấn đề hiệu suất.

## Giải pháp
Dùng truy vấn JOIN, lấy tất cả dữ liệu một lần:

```sql
SELECT articles.*, users.name as author_name
FROM articles
LEFT JOIN users ON articles.author_id = users.id
```

**Hiệu quả:** Thời gian truy vấn giảm từ 2000ms xuống 50ms

## 5.6 Học cách đặt câu hỏi

**Mẹo 1: Trước tiên hỏi "tại sao"**
```
Tại sao đoạn code này gây rò rỉ bộ nhớ?
Tại sao lại dùng useCallback thay vì hàm bình thường?
```

**Mẹo 2: Yêu cầu nhiều phương án**
```
Có những phương án nào để triển khai xác thực người dùng?
Mỗi phương án có ưu điểm và nhược điểm gì?
```

**Mẹo 3: Yêu cầu giải thích**
```
Đoạn code này hoạt động như thế nào?
Có thể giải thích chi tiết thuật toán này không?
```

# 6. Câu hỏi thường gặp

## Q1: Code được AI tạo có thể dùng trực tiếp không?

**A:** Không thể dùng trực tiếp, cần kiểm tra và thử nghiệm.

Code được AI tạo có thể gặp vấn đề sau:
- Lỗi logic hoặc xử lý trường hợp biên không tốt
- Không tuân theo quy tắc code của dự án
- Có lỗ hổng bảo mật
- Hiệu suất không tốt

Bạn cần:
- Đọc kỹ code được tạo
- Hiểu logic của code
- Thử nghiệm các trường hợp khác nhau
- Xác nhận tuân theo quy tắc dự án

## Q2: Nếu AI hiểu sai ý tôi thì sao?

**A:** Sửa kịp thời, mô tả lại yêu cầu.

```
Không phải, ý tôi là...
Hiểu lầm rồi, nên là...
Để tôi mô tả lại yêu cầu...
```

Nếu sửa nhiều lần vẫn không đúng, có thể:
- Cung cấp thêm thông tin bối cảnh
- Cho ví dụ code cụ thể
- Chia nhỏ thành nhiệm vụ nhỏ hơn

## Q3: Gặp vấn đề AI không giải quyết được thì sao?

**A:** AI không phải là tất cả, một số vấn đề cần bạn giải quyết.

Vấn đề AI có thể không giải quyết được:
- Công nghệ quá mới (kiến thức AI có hạn ngày)
- Logic kinh doanh đặc biệt của nhóm bạn
- Vấn đề cần truy cập hệ thống bên ngoài
- Vấn đề tối ưu hóa hiệu suất phức tạp

Lúc này bạn cần:
- Xem tài liệu chính thức
- Tìm kiếm giải pháp liên quan
- Hỏi đồng nghiệp có kinh nghiệm
- Hỏi trên cộng đồng

## Q4: Làm thế nào để biết lời đề xuất của AI có hợp lý không?

**A:** Dùng kinh nghiệm và kiến thức của bạn để đánh giá.

Tiêu chuẩn đánh giá:
- Có tuân theo phương pháp tốt nhất không
- Có xem xét trường hợp biên không
- Có rủi ro bảo mật không
- Có phù hợp với stack công nghệ dự án không
- Hiệu suất có chấp nhận được không

Nếu không chắc, có thể:
- Để AI giải thích tại sao phải làm như vậy
- Yêu cầu cung cấp các phương án khác
- Hỏi ý kiến các thành viên nhóm

## Q5: Khi hợp tác với nhóm, dùng AI như thế nào?

**A:** Xây dựng quy tắc và kho kiến thức chung.

Đề xuất hợp tác nhóm:
- Chia sẻ cấu hình CLAUDE.md của dự án
- Thống nhất quy tắc code và phong cách
- Ghi chép giải pháp chung cho vấn đề thường gặp
- Chia sẻ định kỳ các mẹo hữu ích
- Kiểm tra code được AI tạo trong quá trình kiểm duyệt

## Q6: Làm thế nào để tránh phụ thuộc quá vào AI?

**A:** Tiếp tục học và suy nghĩ, AI là công cụ hỗ trợ chứ không phải thay thế.

Đề xuất:
- Hiểu code AI tạo ra, không chép mù quạng
- Chủ động tìm hiểu các khái niệm không rõ
- Ôn lại kiến thức cơ bản thường xuyên
- Cố gắng tự giải quyết vấn đề, sau đó dùng AI xác minh
- Tham gia kiểm tra code, học kinh nghiệm của người khác

# 7. Tóm tắt

Thông qua phần này, bạn đã nắm vững:

1. **Giới hạn khả năng của AI**: Hiểu rõ AI giỏi ở điều gì, không giỏi ở điều gì, xây dựng cách hợp tác đúng đắn
2. **Chiến lược cho các loại dự án**: Có chiến lược phát triển hỗ trợ bởi AI khác nhau cho dự án mới, dự án trưởng thành, mẫu nhanh, dự án bảo trì
3. **Quy trình nhiệm vụ thường gặp**: Nắm vững quy trình hoàn chỉnh cho phát triển tính năng mới, sửa lỗi, refactor code, kiểm tra code
4. **Kho kiến thức dự án**: Học cách xây dựng tài liệu dự án để AI hiểu rõ hơn
5. **Kỹ thuật hợp tác**: Nắm vững các mẹo thực tế để nâng cao hiệu quả hợp tác với AI

**Điểm chính:**

- **Rõ ràng về phân công**: Bạn làm quyết định và kiểm soát chất lượng, AI giúp thực hiện và hỗ trợ
- **Giao tiếp rõ ràng**: Mô tả rõ ràng, một lần làm một việc
- **Xác minh kịp thời**: Không tin tưởng mù quạng, cần kiểm tra xác minh
- **Học tập liên tục**: Tìm hiểu giới hạn khả năng của AI, không ngừng tối ưu hóa cách hợp tác

Hãy nhớ: AI là công cụ, không phải thay thế. Nó có thể giúp bạn làm việc hiệu quả hơn, nhưng chất lượng code cuối cùng vẫn phụ thuộc vào bạn kiểm soát. Hãy bắt đầu từ các nhiệm vụ đơn giản, từng bước xây dựng sự tin tưởng, bạn sẽ phát hiện AI có thể tiết kiệm rất nhiều thời gian cho bạn, để bạn tập trung vào công việc có giá trị hơn.

::: tip 💡 Bước tiếp theo
Trong phần tiếp theo, chúng ta sẽ học cách dùng AI để kiểm tra code và đảm bảo chất lượng, đảm bảo code có thể bảo trì và an toàn.
:::
