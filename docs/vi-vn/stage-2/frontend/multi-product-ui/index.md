# Tham khảo quy chuẩn thiết kế UI để thiết kế trang và nút bấm

Nhiều người nói "tôi muốn trang web trông giống Apple hơn" hay "tôi muốn nút bấm trông cao cấp hơn", nhưng khi thực sự bắt đầu làm, họ thường gặp một vấn đề:

**Thực sự nên tham khảo cái gì?**

Chỉ nhìn vào ảnh chụp để bắt chước, bạn chỉ học được "giống hay không giống". Nhưng khi mở quy chuẩn thiết kế của Apple, Google, Microsoft, Atlassian, bạn sẽ thấy điều thực sự tuyệt vời của họ không phải là phong cách hình ảnh, mà là **cách giải thích rõ ràng các vấn đề thiết kế**: trang nào nên nổi bật trước, nút bấm cần phân cấp như thế nào, cách nhấn mạnh hoạt động — những tiêu chuẩn ra quyết định này mới là cốt lõi.

> Tham khảo quy chuẩn thiết kế không phải để trông "giống ai", mà là để học cách mà người khác đưa ra quyết định.

:::: info Tại sao bây giờ vẫn cần học những cái này
Những quy tắc thiết kế đã được đưa vào mô hình, được công cụ thiết kế mặc định hấp thụ, thậm chí chỉ cần dán vài ảnh chụp, AI đã có thể học được. Nhưng chúng ta vẫn cần biết những quy tắc này từ đâu mà ra, tại sao lại định như vậy.
::::

## Trước hết hãy xem vài đoạn văn bản gốc, cảm nhận khoảng cách

Nếu bạn trước đây nghĩ rằng "quy chuẩn thiết kế chỉ là nói về phong cách", hãy xem vài dòng văn bản gốc từ các công ty chính thức.

Thường thường trong đội ngũ, chúng ta nói như thế này:

- Làm một hộp thả xuống
- Đặt một menu ở đây
- Thanh menu thêm vài chức năng
- Đặt hai nút ở đây, một xác nhận một hủy

Nghe có vẻ ổn, nhưng trong quy chuẩn của các công ty lớn, những từ này không phải là khái niệm mơ hồ, mà được chia tách rất chi tiết.

| Những gì chúng ta thường nói | Văn bản gốc từ hãng | Nói đơn giản |
| :--- | :--- | :--- |
| "Làm một menu" | Apple: ["A menu reveals its options..."](https://developer.apple.com/design/human-interface-guidelines/menus) | `Menu` được dùng để làm thao tác |
| "Thanh menu chứa chức năng" | Apple: ["menu bar menus contain all the commands..."](https://developer.apple.com/design/human-interface-guidelines/menus) | Đây là menu lệnh ở phía trên ứng dụng |
| "Làm một hộp thả xuống" | Apple: ["A pop-up list lets the user choose one option among several."](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pop-up` được dùng để chọn một tùy chọn từ danh sách |
| "Cũng làm một hộp thả xuống" | Apple: ["A pull-down list is generally used for selecting commands in a specific context."](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pull-down` được dùng để mở ra và thực hiện thao tác hiện tại |
| "Menu cũng có thể dùng để lọc được không" | Fluent: ["If you need to collect information from people, try a select, dropdown, or combobox instead."](https://fluent2.microsoft.design/components/web/react/core/menu/usage) | `Menu` không được dùng để chọn giá trị |
| "Menu cũng có thể dùng làm điều hướng được không" | Material: ["Menus should not be used as a primary method for navigation within an app."](https://m1.material.io/components/menus.html) | `Menu` không phải là phương tiện điều hướng chính |
| "Văn bản nút bấm cứ viết OK / Cancel tùy ý" | Apple: ["Always use 'Cancel' to title a button that cancels the alert's action."](https://developer.apple.com/design/human-interface-guidelines/alerts) | Văn bản nút không thể viết tùy tiện |

> Những trích dẫn trong bảng có thể nhấp trực tiếp để đi đến trang chính thức tương ứng.

Đây chính là điều dễ làm bạn ngạc nhiên nhất khi lần đầu tiên thực sự xem quy chuẩn thiết kế:

> Chúng ta thường nghĩ rằng mình đang thảo luận về UI, nhưng thực tế nhiều lúc chỉ đang giao tiếp với một loạt những từ mơ hồ.

Apple sẽ không chỉ nói "làm một menu"; nó sẽ tiếp tục phân biệt:

- `menu`
- `menu bar menu`
- `pop-up button`
- `pull-down button`
- `context menu`

Fluent sẽ không chỉ nói "hộp thả xuống"; nó sẽ tiếp tục phân biệt:

- `menu`
- `dropdown`
- `select`
- `combobox`

Đây chính là lý do tồn tại của quy chuẩn thiết kế.

Nó không phải để làm cho trang trông chuyên nghiệp hơn, mà là để khi thảo luận UI trong đội ngũ, không phải mỗi người lại có một ý tưởng khác nhau.

## Bạn sẽ học được gì

1. Tại sao khi thiết kế trang và nút bấm, cần xem quy chuẩn thiết kế trước
2. Trong quy chuẩn của Apple, Material, Fluent, Atlassian, nội dung nào đáng học nhất
3. Cách thiết kế rõ ràng "cấp bậc trang" và "cấp bậc nút bấm"
4. Cách để AI tham khảo quy chuẩn của người khác để tạo trang và nút bấm

## 1. Tại sao quy chuẩn thiết kế có thể giúp bạn tạo trang rõ ràng

Sau khi xem qua những đoạn văn bản gốc trên, bạn sẽ nhận thấy một điểm chính:

**Quy chuẩn thiết kế không phải vinh dự thêm, mà là để nói rõ các từ.**

Nhiều trang không đẹp, không phải vì màu sắc không cao cấp, mà vì cấp bậc thông tin lộn xộn.

Nhiều nút bấm không dễ dùng, cũng không phải vì bán kính góc không đúng, mà vì:

- Quá nhiều nút chính, người dùng không biết nên nhấp vào cái nào
- Nút nguy hiểm và nút thường trông giống nhau
- Tất cả nút trên trang đều tranh giành sự chú ý
- Các nút ở những trang khác nhau có phong cách và ngữ nghĩa không nhất quán

Quy chuẩn thiết kế trưởng thành chính là giải quyết những vấn đề này. Thường chúng sẽ định nghĩa:

| Nội dung quy chuẩn | Nó giải quyết vấn đề gì |
| :--- | :--- |
| **Cấp bậc trang** | Xem cái gì trước, cái gì sau, thông tin được tổ chức như thế nào |
| **Nền tảng hình ảnh** | Màu sắc, khoảng cách, phông chữ, bán kính góc, bóng đổ thống nhất thế nào |
| **Cấp bậc nút bấm** | Nút chính, nút phụ, nút văn bản, nút nguy hiểm được phân biệt thế nào |
| **Quy tắc trạng thái** | Khi di chuột, tiêu điểm, bị vô hiệu hóa, đang tải sẽ biểu hiện như thế nào |
| **Ngữ nghĩa giao tác** | Nút nào là "xác nhận", nút nào là "hủy", nút nào là "thêm thao tác" |

Vì vậy, quy chuẩn thiết kế thực sự cung cấp không phải một bộ "da ngoài", mà là một bộ **tiêu chuẩn ra quyết định**.

## 2. Khi tham khảo quy chuẩn của các công ty lớn, nên xem cái gì

### 2.1 Tham khảo Apple: Học "định nghĩa đủ chi tiết" điều này

Điều thực sự đáng học từ Apple, không chỉ là sự tiết chế về hình ảnh, mà là nó định nghĩa các khái niệm rất chi tiết.

Cùng với "menu" hay "hộp thả xuống" mà nhiều đội thường nói, Apple sẽ tiếp tục chia nhỏ:

- `menu`: một tập hợp lệnh, tùy chọn hoặc trạng thái
- `menu bar menu`: tập hợp lệnh cấp ứng dụng
- `pop-up button`: chọn một giá trị
- `pull-down button`: kích hoạt lệnh trong ngữ cảnh hiện tại
- `context menu`: các thao tác phổ biến liên quan đến đối tượng hoặc tác vụ hiện tại

Cách phân biệt này rất quan trọng, vì nó sẽ ảnh hưởng trực tiếp đến:

- Thành phần này được dùng để chọn giá trị hay để thực hiện hành động
- Nó thuộc phần trang cục bộ hay thuộc cấp ứng dụng
- Nó nên hiển thị dài hạn giá trị được chọn hiện tại hay chỉ tạm khai triển lệnh

Khi bạn bắt đầu suy nghĩ theo mức độ chi tiết này, trang mà bạn thiết kế sẽ rõ ràng hơn rất nhiều.

### 2.2 Tham khảo Apple: Học cấp bậc trang và sự tiết chế

Apple Human Interface Guidelines đặc biệt phù hợp để học hai điều:

- Trang thực hiện cấp bậc rõ ràng như thế nào
- Kiểm soát cách mà không khiến nó thành nhân vật chính

Apple nhấn mạnh `Hierarchy`, `Harmony`, `Consistency`. Điều này có nghĩa là khi thiết kế trang, bạn cần trả lời:

- Thông tin quan trọng nhất trên trang hiện tại là gì
- Tác vụ chính của người dùng là gì
- Thao tác nào nên nổi bật nhất, thao tác nào nên lùi lại

Nếu bạn tham khảo Apple để thiết kế trang, có thể trọng tâm vào:

- Thông tin trên màn hình đầu tiên không nên quá rời rạc, nội dung cốt lõi nên được tập trung trước
- Dùng khoảng trắng, kích thước chữ, nhóm để tạo thứ tự, không phải dựa vào việc xếp nhiều viền
- Nút không nên nhấn mạnh toàn bộ, chỉ hành động chính mới nên nổi bật nhất

### 2.3 Tham khảo Material: Học cấu trúc trang rõ ràng

Material Design rất phù hợp để học "cách tổ chức tác vụ trang".

Nhiều quy chuẩn về thành phần và bố cục của nó, về cơ bản đều giúp bạn làm rõ:

- Trang là loại duyệt, hay loại thực hiện tác vụ
- Trang hiện tại có cho phép người dùng đọc, chọn hay gửi
- Những phần tử nào trên trang nên ổn định lặp lại, phần tử nào nên phản ứng với những thay đổi ngữ cảnh

Nếu bạn tham khảo Material để thiết kế trang, có thể trọng tâm vào:

- Khối trang rõ ràng, trách nhiệm mô-đun rõ ràng
- Điều hướng, vùng nội dung, vùng hoạt động phân công rõ ràng
- Kiểu nút khác nhau tương ứng với mức độ ưu tiên hoạt động khác nhau

### 2.4 Tham khảo Fluent: Học ranh giới thành phần và cấp bậc nút bấm

Fluent 2 rất phù hợp cho sản phẩm back-office, công cụ và hệ thống biểu mẫu phức tạp. Điều đáng học nhất của nó là nó sẽ trực tiếp nói với bạn "không nên trộn các khái niệm".

Ví dụ, nó viết rõ: nếu bạn muốn "collect information", thì không nên tiếp tục dùng `menu`, mà nên xem xét `select`, `dropdown`, `combobox`.

Câu này rất quan trọng, vì nó phá vỡ nhận thức "tất cả đều giống nhau" của nhiều người.

Fluent 2 cũng rất coi trọng:

- Mức độ hoạt động
- Ranh giới ngữ nghĩa thành phần
- Rõ ràng trong tình huống thông tin dày đặc

Nếu bạn tham khảo Fluent để thiết kế nút bấm, có thể trọng tâm vào:

- `Primary button` được dùng để chứa hành động quan trọng nhất hiện tại
- `Secondary button` được dùng để chứa hành động hỗ trợ
- `Subtle`, `Transparent` loại nút nhấn mạnh yếu được dùng cho các thao tác không nên tranh quy trình chính
- Càng nhiều nút trên trang, càng cần kiểm soát mức độ ưu tiên hình ảnh

### 2.5 Tham khảo Atlassian: Học quản lý hệ thống trang và nút bấm

Atlassian Design System đặc biệt phù hợp cho "một đội xây dựng nhiều trang" tình huống. Nó nhấn mạnh:

- foundations là nền tảng được chia sẻ
- tokens là phương pháp thống nhất các quyết định hình ảnh
- components là những thành phần giao tác được sử dụng lại nhiều lần

Nếu bạn tham khảo Atlassian để tạo trang và nút bấm, giá trị lớn nhất là:

- Tạo kích thước nút, màu sắc, bán kính góc, khoảng cách thành quy tắc thống nhất
- Cố định nhịp độ bố cục trang
- Tuy nội dung khác nhau, nhưng ngôn ngữ cấu trúc trang ở những trang khác nhau phải nhất quán

## 3. Khi thiết kế trang, nên tham khảo điểm nào trong quy chuẩn

Khi xem một hệ thống thiết kế, không nên hỏi trước "trang này có đẹp không", mà nên hỏi vài câu hỏi dưới đây.

### 3.1 Lần nhìn đầu tiên trên trang, chính phụ có rõ ràng không

Một trang thường phải có ít nhất ba lớp:

- **Thông tin chính**: nội dung quan trọng nhất trên trang hiện tại
- **Thông tin phụ**: giúp hiểu hoặc bổ sung nội dung
- **Hoạt động cấp thứ cấp**: không nên làm gián đoạn tác vụ chính

Nếu ba lớp không được kéo dãn, trang sẽ "đều quan trọng", tức "đều không quan trọng".

### 3.2 Bố cục trang, có phục vụ tác vụ hay chỉ xếp mô-đun

Khi tham khảo quy chuẩn, có thể đặc biệt chú ý:

- Vùng tiêu đề có nêu rõ mục tiêu trang không
- Vùng nội dung chính có tổ chức quanh tác vụ không
- Nút hoạt động có gần với nội dung liên quan không
- Thông tin thứ yếu có bị làm yếu không

### 3.3 Hoạt động trên trang, có mức độ ưu tiên không

Nhiều trang nhìn qua có 6 nút, kết quả mỗi nút đều giống CTA, đây là trường hợp điển hình của mất kiểm soát cấp bậc.

Cách hợp lý hơn là:

- Một vùng thường chỉ có một hành động chính
- Hành động cấp thứ hai có thể dùng viền, nút văn bản hoặc kiểu yếu hơn
- Hành động có rủi ro không nên trông giống hành động chính

## 4. Khi thiết kế nút bấm, nên tham khảo điểm nào trong quy chuẩn

Nút bấm là phần dễ "thiết kế ngay tức khắc" nhất, nhưng cũng là phần dễ lộ ra liệu hệ thống có trưởng thành hay không nhất.

### 4.1 Nút trước hết phân "ngữ nghĩa", sau đó phân "kiểu dáng"

Đừng suy nghĩ trước "nút màu xanh hay màu đen", trước hết suy nghĩ nút này có vai trò gì.

Vai trò nút bấm phổ biến có thể phân chia như thế này:

| Loại nút | Tác dụng | Chiến lược kiểu dáng phổ biến |
| :--- | :--- | :--- |
| **Primary** | Hành động quan trọng nhất trong vùng | Thể đặc, tương phản cao, nổi bật nhất |
| **Secondary** | Hành động hỗ trợ | Viền hoặc nhấn mạnh thấp hơn một bậc |
| **Tertiary / Text** | Hoạt động yếu | Văn bản hoặc chiếm dụng hình ảnh thấp |
| **Destructive** | Xóa, vô hiệu hóa, xóa sạch và các thao tác rủi ro khác | Màu cảnh báo hoặc kiểu rủi ro rõ ràng |
| **Icon button** | Hoạt động công cụ cục bộ | Đơn giản, gần với ngữ cảnh |

### 4.2 Một trang không nên có quá nhiều Primary Button

Đây là cái bẫy mà rất nhiều người mới dễ mắc phải.

Nếu trang có 4 nút chính, thì bằng không có nút chính. Ý nghĩa của nút chính chính là "báo cho người dùng biết bây giờ nên làm gì nhất".

Bạn có thể học theo cách chung của nhiều hệ thống thiết kế:

- Một vùng chính thường chỉ giữ lại một nút chính
- Hủy, quay lại, đóng thường không tranh cấp bậc với nút xác nhận
- Thêm thao tác đặt vào nút cấp thứ hai hoặc menu

### 4.3 Nút phải có thể biểu hiện sự thay đổi trạng thái

Quy chuẩn thiết kế thường viết rất rõ ràng về các trạng thái nút:

- Trạng thái mặc định
- Trạng thái di chuột
- Trạng thái tiêu điểm
- Trạng thái bị vô hiệu hóa
- Trạng thái tải
- Trạng thái nguy hiểm

Điều này rất quan trọng, vì nút không phải là ảnh tĩnh, mà là một trong những kiểm soát được kích hoạt thường xuyên nhất trong quá trình người dùng tương tác.

### 4.4 Văn bản nút cũng là một phần của thiết kế

Văn bản nút không chỉ là "vấn đề văn bản", nó ảnh hưởng trực tiếp đến sự hiểu biết của người dùng.

Ví dụ:

- `Lưu`
- `Lưu thay đổi`
- `Xuất bản ngay`
- `Xóa dự án`
- `Chuyển đến thùng rác`

Những văn bản này truyền đạt kỳ vọng tâm lý hoàn toàn khác nhau. Quy chuẩn trưởng thành thường yêu cầu nhãn nút rõ ràng biểu hiện hành động, thay vì dùng những từ mơ hồ.

## 5. Một danh sách kiểm tra thiết kế trang và nút bấm rất thực tế

Khi tự mình thiết kế trang, bạn có thể nhanh chóng đi qua danh sách này:

### Danh sách kiểm tra trang

- Tiêu đề trang có rõ ràng nêu tác vụ hiện tại không
- Thông tin quan trọng nhất trên màn hình đầu tiên có nhìn thấy ngay không
- Trang có được tổ chức theo quy trình tác vụ hay chỉ xếp ngẫu nhiên
- Trong cùng một vùng, có chỉ một hành động chính không
- Nội dung thứ yếu có bị làm yếu thích hợp không

### Danh sách kiểm tra nút

- Nút này là hành động chính hay hành động phụ
- Tại sao nó xứng đáng nổi bật hơn những nút khác
- Trang có quá nhiều nút chính không
- Thao tác nguy hiểm có được đánh dấu rõ ràng không
- Văn bản nút có đủ cụ thể không

## 6. Cách dùng AI tham khảo quy chuẩn của người khác để thiết kế trang

Phần này là thực tế nhất.

Nhiều người khi yêu cầu AI thiết kế trang, thường chỉ nói:

```md
Giúp tôi tạo một trang cài đặt, trông cao cấp một chút, tham khảo phong cách Apple
```

Loại gợi ý này quá mơ hồ, AI cuối cùng thường chỉ có thể bắt chước "nền trắng, góc cong, bóng đổ".

Với người mới, cách thực tế hơn không phải tự mình tóm tắt một đoạn dài, mà **trực tiếp dán những câu chính từ quy chuẩn gốc** cho AI.

Cách này có hai lợi:

- Bạn không cần tự mình "dịch" một lần tư duy thiết kế
- AI dễ dàng theo định nghĩa chính thức để hiểu trang và nút

### 6.1 Ví dụ một: Để AI tham khảo Apple thiết kế một trang cài đặt

Trước hết tìm một câu từ Apple:

> ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)

Bạn có thể trực tiếp dán cho AI như thế này:

```md
Tham khảo Human Interface Guidelines của Apple, câu này:
"Establish a clear visual hierarchy..."

Giúp tôi thiết kế một trang cài đặt bảo mật tài khoản.
Yêu cầu cấp bậc trang rõ ràng, thông tin quan trọng đặt trước, nhóm gọn một chút.
```

Điểm nhấn của cách viết này là: không cần bạn giải thích quá nhiều, trực tiếp dán lời Apple gốc.

### 6.2 Ví dụ hai: Để AI tham khảo Fluent thiết kế nút back-office

Trước hết tìm một câu từ Fluent:

> ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Bạn có thể trực tiếp dán cho AI như thế này:

```md
Tham khảo Fluent 2, câu này:
"Only use one primary button in a layout..."

Giúp tôi thiết kế một nút back-office quản lý đội.
Nút thêm thành viên nổi bật nhất, xuất, lọc, thêm thao tác yếu một chút, nút xóa riêng nổi bật.
```

Câu này đặc biệt phù hợp với người mới, vì nó trực tiếp nói với AI: không nên đặt quá nhiều nút chính trong một vùng.

### 6.3 Ví dụ ba: Để AI cùng tham khảo quy chuẩn trang và nút

Bạn cũng có thể cùng lúc dán hai câu gốc, để AI cùng tham khảo trang và nút:

> Apple: ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)
>
> Fluent: ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Sau đó trực tiếp viết như thế này:

```md
Tham khảo hai câu quy chuẩn thiết kế dưới đây:
Apple: "Establish a clear visual hierarchy..."
Fluent: "Only use one primary button in a layout..."

Giúp tôi thiết kế một trang chi tiết dự án.
Trang chứa giới thiệu dự án, thành viên, hoạt động gần đây và lối vào cài đặt.
Cấp bậc trang rõ ràng một chút, nút chính chỉ giữ lại một, nút khác yếu một chút.
```

Kiểu cách này đặc biệt phù hợp với người mới, vì bạn chỉ cần biết sao chép văn bản gốc, rồi thêm vài dòng nhu cầu của mình là đủ.

## 7. Cách dùng AI tham khảo quy chuẩn nút để trực tiếp tạo ra thiết kế nút

Nếu bạn chỉ muốn trước hết làm nút, cũng có thể trực tiếp dán quy chuẩn nút.

Ví dụ, Atlassian định nghĩa nút rất ngắn:

> ["A button triggers an event or action."](https://atlassian.design/components/button/)

Bạn có thể hỏi AI như thế này:

```md
Tham khảo câu này của Atlassian:
"A button triggers an event or action."

Giúp tôi thiết kế một bộ kiểu nút back-office.
Tôi muốn có nút chính, nút phụ, nút xóa, vừa đi kèm nói cho tôi biết tương ứng dùng trong tình huống nào.
```

Loại gợi ý này đặc biệt phù hợp với người mới, về cơ bản là "dán văn bản gốc + nêu nhu cầu".

## 8. Tóm tắt

Tham khảo quy chuẩn thiết kế UI để thiết kế trang và nút bấm, điều quan trọng nhất không phải "trông giống ai", mà là học cách làm những điều dưới đây:

1. Dùng cấp bậc để tổ chức trang, không phải xếp nội dung
2. Dùng phân cấp nút để biểu hiện mức độ ưu tiên hoạt động, không phải khiến tất cả nút đều tranh sự chú ý
3. Dùng định nghĩa, ranh giới và tiêu chuẩn ra quyết định từ quy chuẩn thiết kế để hướng dẫn thiết kế
4. Khi để AI tham khảo quy chuẩn của người khác, tham khảo là "nguyên tắc và cấu trúc", không chỉ là da ngoài

Khi dùng quy chuẩn theo cách này, bạn tham khảo không chỉ là một phong cách, mà là một cách suy nghĩ thiết kế trưởng thành.

---

## Tài liệu tham khảo

Tất cả các liên kết dưới đây đến từ các hệ thống thiết kế chính thức hoặc tài liệu chính thức:

- Apple Human Interface Guidelines: [Tổng quan](https://developer.apple.com/design/human-interface-guidelines/)
- Apple Human Interface Guidelines: [Menu](https://developer.apple.com/design/human-interface-guidelines/menus)
- Apple Human Interface Guidelines: [Cảnh báo](https://developer.apple.com/design/human-interface-guidelines/alerts)
- Apple Human Interface Guidelines: [Nút](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Apple Archive: [Cách hoạt động của Menu](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/HowMenusWork.html)
- Apple Archive: [Quản lý Pop-Up Buttons và Pull-Down Lists](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html)
- Material Design: [Tổng quan nút](https://m3.material.io/components/buttons/overview)
- Material Design: [Menu](https://m1.material.io/components/menus.html)
- Microsoft Fluent 2: [Bắt đầu thiết kế](https://fluent2.microsoft.design/get-started/design)
- Microsoft Fluent 2: [Cách sử dụng Menu](https://fluent2.microsoft.design/components/web/react/core/menu/usage)
- Microsoft Fluent 2: [Cách sử dụng Button](https://fluent2.microsoft.design/components/web/react/core/button/usage)
- Atlassian Design System: [Nền tảng](https://atlassian.design/foundations/)
- Atlassian Design System: [Nút](https://atlassian.design/components/button/)
