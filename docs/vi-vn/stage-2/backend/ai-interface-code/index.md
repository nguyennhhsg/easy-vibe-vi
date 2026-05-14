# Viết mã API và tài liệu API với hỗ trợ mô hình ngôn ngữ lớn

Trong các bài học trước, chúng ta đã học cách sử dụng các công cụ như Figma để hoàn thành bản thiết kế UI, cách tận dụng AI để nhanh chóng tạo các trang frontend tĩnh, và cách sử dụng Supabase để xây dựng cơ sở dữ liệu và thực hiện xác thực người dùng ban đầu. Bây giờ, một câu hỏi tự nhiên nảy sinh: sau khi nhấp vào các nút tràn đầy năng lượng trong trang frontend, dữ liệu được đẩy vào Supabase như thế nào? Khi chúng ta cần thực hiện các logic kinh doanh phức tạp hơn (chẳng hạn như thanh toán đồng thời, đẩy thông báo theo lịch, xử lý dữ liệu nhạy cảm), có an toàn không nếu để frontend kết nối trực tiếp với cơ sở dữ liệu?

Điều này dẫn đến một khía cạnh quan trọng trong kiến trúc phát triển Web hiện đại - **giao diện API backend**.

Thay vì phải viết thủ công hàng trăm hay hàng nghìn dòng mã định tuyến backend, controller và logic xác thực tham số, ngày nay chúng ta hoàn toàn có thể tận dụng khả năng tạo mã mạnh mẽ của mô hình ngôn ngữ lớn, để AI xử lý mã boilerplate tẻ nhạt. Trong bài học này, chúng ta sẽ thoát khỏi vòng lặp "mã AI vừa mơ hồ vừa bề ngoài" và chỉ cho bạn, dựa trên các tình huống kinh doanh thực tế, cách hướng dẫn mô hình ngôn ngữ lớn viết các giao diện backend Node.js mạnh mẽ, tuân thủ tiêu chuẩn ngành thông qua các prompt chất lượng cao, và tự động hoàn thành tạo tài liệu giao diện và các test case.

> 💡 **Kiến thức tiên quyết**
> 
> Trước khi học bài này, chúng tôi khuyến nghị bạn làm quen với các nội dung sau:
> - [Từ cơ sở dữ liệu đến Supabase](../database-supabase/) - Hiểu được khái niệm cơ sở dữ liệu và mô hình dữ liệu.
> - [Quy trình làm việc Git và GitHub](../git-workflow/) - Làm quen với cách thực hiện kiểm soát phiên bản trong phát triển dự án.
> - [Cái gì là terminal/dòng lệnh](/vi-vn/appendix/2-development-tools/command-line-shell) - Khởi tạo và khởi chạy dự án không thể thiếu các thao tác lệnh cơ bản.

# Bạn sẽ học được

1. **Giao diện API là cái gì**: Hiểu được cầu nối giữa frontend và backend cũng như tiêu chuẩn thiết kế RESTful.
2. **AI giúp xây dựng dịch vụ**: Cách hướng dẫn AI xây dựng công trình Node.js + Express cơ sở thông qua các Prompt có cấu trúc.
3. **Phát triển logic giao diện**: Hướng dẫn mô hình ngôn ngữ lớn tạo các giao diện CRUD chứa xác thực kinh doanh nghiêm chỉnh, kết nối cơ sở dữ liệu Supabase.
4. **Tài liệu giao diện tự động**: Để mô hình ngôn ngữ lớn tạo tài liệu OpenAPI/Swagger ngược từ mã, là tiêu chuẩn hợp tác đội nhóm.
5. **Kiểm thử và liên động**: Tận dụng mô hình ngôn ngữ lớn để tạo bộ sưu tập kiểm thử Postman và test case Jest, đảm bảo chất lượng mã.

---

# 1. Tại sao chúng ta cần giao diện API?

Trong hiểu biết truyền thống, frontend là "phần nhìn thấy được", cơ sở dữ liệu là "kho chứa đồ". Nhưng phía giữa thiếu một điều phối viên. Nếu bạn tưởng tượng toàn bộ ứng dụng như một nhà hàng:
- **Frontend (phía khách hàng)** là menu và bàn đặt hàng của nhà hàng, nơi khách hàng xem các món ăn và nêu nhu cầu.
- **Cơ sở dữ liệu (Supabase, v.v.)** là kho lạnh phía sau của nhà hàng, nơi lưu trữ tất cả nguyên liệu và sổ sách.
- **Giao diện API backend** giống như một nhân viên phục vụ nhà hàng. Khách không thể chạy vào phía sau để lấy nguyên liệu (không chỉ lộn xộn mà còn dễ gây ra vấn đề bảo mật), mà cần nói cho nhân viên biết "yêu cầu đặt hàng" (HTTP Request). Nhân viên kiểm tra (xác thực tham số, kiểm tra quyền) rồi vào phía sau để lấy nội dung tương ứng, sau đó mang "món ăn đã làm xong" (HTTP Response, thường là dữ liệu định dạng JSON) trở lại cho khách.

Thông qua giao diện API, chúng ta thực hiện **tách biệt frontend và backend** rõ ràng: frontend chỉ quan tâm cách render trang, backend chỉ tập trung vào logic kinh doanh, xử lý dữ liệu và bảo mật.

---

# 2. Thiết kế và khởi tạo kiến trúc dự án

Một bộ xương dự án có cấu trúc rõ ràng là điều kiện tiên quyết để mô hình ngôn ngữ lớn viết mã tốt. Trước khi để AI viết mã, chúng ta phải tự hiểu rõ cấu trúc kỹ thuật.

## 2.1 Cấu trúc dự án API phổ biến
Ngay cả khi sử dụng mô hình ngôn ngữ lớn để tạo mã, chúng ta cũng không nên nhồi tất cả mã vào một tệp `server.js` duy nhất. Kiến trúc backend Node.js dễ bảo trì thường như sau:

```text
my-api-project/
├── .env                  # Các biến môi trường nhạy cảm (như API Keys, chuỗi kết nối cơ sở dữ liệu)
├── server.js             # Điểm vào dự án (khởi động máy chủ, đăng ký middleware toàn cục)
├── package.json          # Tệp quản lý phụ thuộc
├── src/
│   ├── routes/           # Lớp định tuyến: định nghĩa đường dẫn URL và phương thức yêu cầu
│   ├── controllers/      # Lớp controller: xử lý tham số yêu cầu kinh doanh, gọi dịch vụ và trả về phản hồi
│   ├── services/         # Lớp dịch vụ: đóng gói tương tác cơ sở dữ liệu và logic kinh doanh cốt lõi
│   └── middlewares/      # Middleware: xác thực đăng nhập, bắt lỗi toàn cục
└── docs/                 # Thư mục lưu trữ tài liệu API
```

## 2.2 Hoàn thành khởi tạo dự án với AI
Thay vì thủ công chạy `npm init` và cài đặt từng phụ thuộc, tốt hơn hãy đưa tiêu chuẩn trên vào Prompt cho mô hình ngôn ngữ lớn:

> 🗣️ **Prompt mẫu cho mô hình ngôn ngữ lớn:**
> "Giúp mình xây dựng một dự án backend Node.js, có khả năng kết nối cơ sở dữ liệu Supabase, cấu trúc rõ ràng một chút, tiện cho bảo trì sau này."

Sau khi chạy mã mà AI trả về, bạn sẽ có được một ứng dụng backend với ranh giới enterprise ngay tại `localhost:3000`.

---

# 3. Thực hành cốt lõi: phát triển giao diện với hỗ trợ mô hình ngôn ngữ lớn

Đây là phần cốt lõi nhất của chương này. Mã do mô hình ngôn ngữ lớn viết thường dễ có "lỗ hổng logic" hoặc "bề ngoài nông cạn", lý do là vì nhà phát triển không cung cấp đủ ngữ cảnh. **Mô hình ngôn ngữ lớn không sợ nhu cầu phức tạp, mà sợ nhu cầu mơ hồ nhất.**

Lấy ví dụ về giao diện thêm mới bảng `menu_items` (bảng menu) mà chúng ta đề cập trong [chương cơ sở dữ liệu](../database-supabase/), hãy xem cách viết một Prompt chất lượng cao.

## 3.1 Cung cấp AI bối cảnh hoàn chỉnh
Trước khi yêu cầu AI viết giao diện, bạn phải cung cấp **định nghĩa trường cơ sở dữ liệu (Schema)** và **các điều kiện ràng buộc cụ thể**.

> 🗣️ **Mẫu Prompt chất lượng cao:**
> "Giúp mình viết một giao diện thêm mới menu, menu có tên sản phẩm, giá, danh mục (burger, đồ ăn nhẹ, đồ uống), có phải hàng bán không. Tên sản phẩm và giá phải điền, giá không thể âm. Khi người dùng nhập sai phải có lỗi gợi ý."

## 3.2 Kiểm tra mã do mô hình ngôn ngữ lớn tạo
Mã do mô hình ngôn ngữ lớn tạo thường chia tách trách nhiệm rõ ràng như dưới đây:

```javascript
// services/menuService.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.createMenuItem = async (menuData) => {
    // Gọi Supabase SDK để đẩy dữ liệu vào bảng
    const { data, error } = await supabase
        .from('menu_items')
        .insert([menuData])
        .select();

    if (error) throw new Error(`Lỗi chèn cơ sở dữ liệu: ${error.message}`);
    return data[0];
};
```

Bạn có thể thấy, thông qua cách này tạo mã, không chỉ cấu trúc hợp lý, mà còn xem xét khởi tạo Supabase, bắt lỗi và xử lý ngoại lệ, điều này khác biệt hoàn toàn so với mã noodle (Spaghetti Code) nhận được từ yêu cầu đơn giản "viết giao diện thêm mới".

---

# 4. Giải phóng tay: tạo tài liệu giao diện tự động

Đối với nhóm phát triển, API không có tài liệu giống như một hộp quà bất ngờ. Kỹ sư frontend không thể đoán bạn cần truyền vào tham số gì, cũng không thể dự đoán sẽ trả về cấu trúc nào. Tiêu chuẩn mô tả API phổ biến nhất ngành là **OpenAPI (trước đây còn gọi là Swagger)**.

Trước đây, viết thủ công tài liệu Swagger định dạng YAML hoặc JSON cực kỳ khó chịu và dễ sai lầm. Bây giờ, đây cũng trở thành lĩnh vực mô hình ngôn ngữ lớn giỏi nhất.

Bạn có thể chọn trực tiếp mã `routes` và `controllers` vừa viết xong, rồi trao cho mô hình ngôn ngữ lớn:

> 🗣️ **Prompt tạo tài liệu:**
> "Giúp mình tạo tài liệu giao diện dựa trên mã trên, viết rõ mỗi tham số là gì, trả về dữ liệu gì, để các bạn frontend dễ dàng kết nối."

Trong quá trình này, bạn thậm chí có thể yêu cầu AI bổ sung mô tả trường (Description) và dữ liệu Mock (chẳng hạn như `price_cents: 1200` đại diện cho 12 đô la), giảm chi phí giao tiếp đáng kể.

---

# 5. Bảo vệ toàn diện: tạo mã kiểm thử và bộ sưu tập Postman

Mã được viết, tài liệu hoàn tất, còn bước cuối: xác minh mã có chạy được không.

## 5.1 Tạo cấu hình kiểm thử Postman / Apifox
Trong phát triển giao diện, chúng ta thường sử dụng công cụ trực quan như Postman để mô phỏng frontend gửi yêu cầu HTTP. Nếu không sử dụng mô hình ngôn ngữ lớn, bạn cần điền thủ công URL, từng cái thêm Header (yêu cầu header) và ghép nối phần thân yêu cầu JSON.

Bạn chỉ cần gửi hướng dẫn cho AI:
> "Giúp mình chuyển tài liệu giao diện này sang định dạng Postman có thể nhập, bao gồm ví dụ yêu cầu bình thường lẫn yêu cầu lỗi."

Sau khi nhận được văn bản JSON, lưu thành `menu_api.json` và kéo vào Postman, bạn sẽ có ngay bộ bảng điều khiển kiểm thử sẵn sàng sử dụng.

## 5.2 Viết kiểm thử đơn vị tự động
Nếu bạn theo đuổi chất lượng kỹ thuật nghiêm chỉnh hơn, bạn có thể để mô hình ngôn ngữ lớn giúp bạn sử dụng khung `Jest` để viết kiểm thử đơn vị (Unit Tests), kiểm thử ranh giới logic kinh doanh cốt lõi (chẳng hạn như khi truyền vào giá âm, liệu tầng cơ sở dữ liệu có xác thực không).

---

# 6. Thực tiễn tốt nhất mà backend giao diện phải biết

Ngay cả khi có hỗ trợ AI, với tư cách là "người bảo vệ" toàn bộ hệ thống, bạn vẫn cần hiểu và kiểm tra các nguyên tắc cốt lõi sau:

1. **Đặt tên đường dẫn tuân thủ RESTful:**
   - Thiết kế tốt: `GET /api/users` (lấy danh sách người dùng)、`POST /api/users` (tạo người dùng). URL nên đại diện cho danh từ "tài nguyên".
   - Thiết kế sai: `POST /api/getUser` hoặc `POST /api/createUser`. Động từ nên để HTTP Method (GET/POST/PUT/DELETE) thể hiện.
2. **Mã trạng thái HTTP tiêu chuẩn:**
   - 200/201: Yêu cầu thành công / tài nguyên được tạo thành công.
   - 400: Bad Request, frontend truyền tham số định dạng sai, thiếu trường bắt buộc.
   - 401/403: Unauthorized / Forbidden, người dùng chưa đăng nhập hoặc không có quyền hoạt động.
   - 404: NotFound, tài nguyên không tồn tại.
   - 500: Server Error, mã backend báo lỗi hoặc cơ sở dữ liệu gặp sự cố, tuyệt đối cố gắng tránh để lộ ngăn xếp gọi lỗi cho frontend (sẽ có rủi ro bảo mật).
3. **Không bao giờ tin vào đầu vào của người dùng**: Đầu vào phía frontend có thể bị giả mạo, tất cả xác thực tham số cốt lõi phải thực hiện lại trong giao diện backend.

# 7. Tóm tắt

Thông qua việc học bài này, bạn đã thực hiện thay đổi quan điểm thực sự: bạn không còn bị mắc kẹt trong cú pháp và dấu câu như một "người gõ máy", mà đã nâng cao thành **nhà thiết kế hệ thống và chỉ huy kiến trúc**.
Bạn đã nắm được:
1. **Tư duy hệ thống cốt lõi** của **giao diện API và tách biệt frontend/backend**.
2. **Cách cung cấp ngữ cảnh và ý tưởng phân tầng** để nâng cao đáng kể chất lượng mã dịch vụ do mô hình ngôn ngữ lớn tạo.
3. Biến công việc **viết tài liệu** và **xây dựng test case** tẻ nhạt thành **công việc tự động** mà AI giỏi.
4. Kết hợp kiến thức **Supabase** đã học trước đó, tạo thông suốt luồng dữ liệu hoàn chỉnh từ yêu cầu phía khách hàng đến cập nhật cơ sở dữ liệu phía dưới.

::: tip 💡 Bước tiếp theo
Khi luồng dữ liệu và dịch vụ backend của bạn đã sẵn sàng, nó hiện tại vẫn chỉ có thể "tự tìm vui" trên máy tính cá nhân của bạn. Trong các bài học tiếp theo, chúng ta sẽ học cách **triển khai (Deploy)** bộ dịch vụ được xây dựng chăm chỉ này **lên máy chủ công cộng**, để sản phẩm của bạn có thể được những người dùng trên toàn thế giới truy cập.
:::
