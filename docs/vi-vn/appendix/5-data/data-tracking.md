# Theo dõi dữ liệu: Ghi lại những gì người dùng làm trong ứng dụng

::: tip 🎯 Vấn đề mà chương này cần giải quyết
**Chúng ta làm cách nào để biết người dùng đang làm gì trong ứng dụng?**

Hãy tưởng tượng bạn mở một cửa hàng trà sữa ngoài đời thực. Bạn có thể đứng phía sau quầy hàng và quan sát trực tiếp từng khách hàng: họ dành bao lâu để xem menu sau khi bước vào? Họ gọi loại thức uống nào? Có bao nhiêu người rút lui mà không gọi gì?

Nhưng nếu "cửa hàng" của bạn là một ứng dụng di động hoặc trang web, bạn không thể nhìn thấy các hoạt động của người dùng. Lúc này bạn cần một công nghệ, tại các vị trí quan trọng trong ứng dụng "nhúng" các điểm ghi nhận, tự động ghi lại mọi bước của người dùng. Đó chính là **theo dõi dữ liệu (Event Tracking)**.

Từ "nhúng" nghe có vẻ chuyên môn, nhưng ý tưởng cốt lõi rất đơn giản: **ở những nơi người dùng có thể tương tác, hãy đặt một "máy ghi", ghi lại những gì người dùng làm.**

Chương này sẽ giải thích quá trình này trong bốn bước:

1. **Chọn phương pháp thu thập** — Quyết định đặt máy ghi ở đâu và cách đặt
2. **Thiết kế định dạng dữ liệu** — Quyết định mỗi bản ghi nên chứa những thông tin nào
3. **Truyền tải và bộ đệm** — Đưa bản ghi từ điện thoại người dùng an toàn đến máy chủ
4. **Làm sạch và lưu vào cơ sở dữ liệu** — Sắp xếp dữ liệu, xóa bản trùng lặp và lỗi, lưu vào cơ sở dữ liệu
:::

---

## Bước đầu tiên: Chọn phương pháp thu thập — Đặt máy ghi ở đâu?

**Mục tiêu**: Quyết định cách nào để ghi lại hoạt động của người dùng.

Ví dụ: Một sản phẩm mục tiêu muốn biết "có bao nhiêu người dùng nhấp vào nút mua". Để trả lời câu hỏi này, nhà phát triển cần thêm một đoạn logic ghi lại vào mã của "nút mua" — mỗi khi người dùng nhấp vào nút này, nó sẽ tự động ghi lại một lần.

Nhưng ở đây có một lựa chọn: chúng ta **chỉ đặt máy ghi ở những nơi quan trọng** (chẳng hạn, chỉ ghi "mua hàng" và "đăng ký"), hay là **đặt máy ghi ở mọi nơi** (ghi lại mỗi lần nhấp, cuộn, và dừng lại của người dùng)?

Những lựa chọn khác nhau tương ứng với các phương pháp nhúng khác nhau.

<DataTrackingDemo tab="methods" />

**💡 Ba phương pháp nhúng phổ biến nhất**

Ngành thường sử dụng ba phương pháp nhúng, mỗi phương pháp đều có ưu và nhược điểm:

**Phương pháp một: Nhúng mã (Code Tracking) — Ghi lại chi tiết bằng tay**

Nhà phát triển chỉ định thủ công trong mã: khi người dùng thực hiện một hoạt động nào đó, ghi lại một bản ghi dữ liệu.

Ví dụ: Giống như ở cửa hàng trà sữa, bạn sắp xếp một người chuyên ghi "ai mua gì, chi bao nhiêu". Thông tin được ghi rất chi tiết và chính xác.

- *Ưu điểm*: Có thể ghi lại thông tin kinh doanh rất chi tiết, chẳng hạn như người dùng sử dụng phiếu giảm giá nào, số dư tài khoản là bao nhiêu
- *Nhược điểm*: Mỗi lần thêm một điểm ghi lại mới, nhà phát triển cần viết mã, kiểm tra và phát hành phiên bản mới, quy trình tương đối dài

**Phương pháp hai: Nhúng trực quan (Visual Tracking) — Vẽ vòng tròn để chọn**

Không cần viết mã. Hệ thống cung cấp một công cụ trực quan, nhân viên vận hành có thể "vẽ vòng tròn" trực tiếp trên giao diện ứng dụng để chọn nút hoặc khu vực muốn theo dõi, hệ thống tự động bắt đầu ghi lại.

Ví dụ: Giống như ở cửa hàng trà sữa, bạn dùng chuột vẽ vòng tròn "vùng quầy hàng" trên màn hình giám sát, hệ thống tự động bắt đầu thống kê lưu lượng người trong khu vực này.

- *Ưu điểm*: Không cần nhà phát triển tham gia, nhân viên vận hành có thể tự cấu hình, hiệu quả cao
- *Nhược điểm*: Chỉ có thể ghi "người dùng nhấp vào cái gì" kiểu hoạt động giao diện, không thể ghi thông tin kinh doanh sâu như "số tiền đặt hàng"

**Phương pháp ba: Nhúng toàn bộ (Auto Tracking) — Tự động ghi lại tất cả**

Tích hợp một SDK (hiểu đơn giản là một "bộ công cụ") vào ứng dụng, nó sẽ tự động ghi lại tất cả hoạt động của người dùng: mỗi lần nhấp, mỗi lần cuộn, thời gian dừng lại trên mỗi trang.

Ví dụ: Giống như bạn lắp đặt camera ở mỗi góc của cửa hàng trà sữa, ghi lại mọi hành động của khách hàng.

- *Ưu điểm*: Không bỏ sót bất kỳ hoạt động nào, phạm vi bao phủ toàn diện nhất
- *Nhược điểm*: Lượng dữ liệu rất lớn, rất nhiều thông tin vô dụng (chẳng hạn như các cuộn vô thức của người dùng), sau này cần dành nhiều công sức để lọc và làm sạch

**Tóm tắt bước này**: Sau khi chọn phương pháp nhúng, ứng dụng của chúng ta đã có khả năng "ghi lại hoạt động của người dùng".

**Nhưng ở đây có một vấn đề mới**: Máy ghi có thể bắt được hoạt động của người dùng, nhưng nếu định dạng dữ liệu mà mỗi máy ghi ghi lại khác nhau (chẳng hạn như có máy ghi "ID người dùng", có máy ghi "userID", có máy ghi không ghi gì), sau này sẽ không thể phân tích hợp nhất. Vì vậy, bước tiếp theo, chúng ta cần quy định một định dạng ghi lại thống nhất.

---

## Bước thứ hai: Thiết kế định dạng dữ liệu — Mỗi bản ghi nên chứa cái gì?

**Điều kiện tiên quyết**: Chúng ta đã chọn phương pháp nhúng (chẳng hạn như nhúng mã), ứng dụng đã có khả năng bắt hoạt động của người dùng.

**Mục tiêu bước này**: Quy định một "mẫu ghi lại" thống nhất, giữ cho định dạng của tất cả bản ghi nhúng giống nhau.

**Tại sao cần định dạng thống nhất?** Tưởng tượng: nếu ở cửa hàng trà sữa có ba nhân viên ghi thông tin bán hàng cùng lúc, một người viết "Tiểu Minh mua nước trà sữa trân châu 15 yuan", người khác viết "15, nước trà sữa, trân châu", người thứ ba viết "một tách nước trà sữa trân châu". Khi đến cuối tháng tổng hợp, những bản ghi này có định dạng hoàn toàn khác nhau, sẽ rất khó chịu khi sắp xếp. Vì vậy chúng ta cần một "biểu ghi lại" thống nhất, quy định mỗi bản ghi phải điền những ô nào.

<DataTrackingDemo tab="model" />

**💡 Nguyên tắc cốt lõi: Mẫu ghi lại 4W1H**

Cho dù ghi lại hoạt động gì, mỗi bản dữ liệu đều cần trả lời năm câu hỏi sau (gọi tắt là 4W1H):

**Who — Ai làm?**

Chúng ta cần biết bản ghi này do người dùng nào tạo ra.

- Nếu người dùng đã đăng nhập, hãy dùng ID tài khoản của họ (chẳng hạn như `user_id: "zhangsan123"`)
- Nếu người dùng chưa đăng nhập, hãy dùng mã định danh duy nhất của thiết bị (chẳng hạn như số sê-ri điện thoại), như vậy ít nhất cũng có thể phân biệt "đây là các hoạt động trên cùng một điện thoại"

**When — Khi nào làm?**

Ghi lại thời gian chính xác khi hoạt động diễn ra, chính xác đến miligiây.

Ở đây có một chi tiết: nếu ứng dụng của bạn có người dùng nước ngoài, 3 giờ chiều giờ Bắc Kinh và 3 giờ chiều giờ New York thực chất khác nhau 13 giờ. Để tránh nhầm lẫn, tất cả thời gian thống nhất chuyển đổi thành giờ UTC tiêu chuẩn (hiểu đơn giản là "giờ thế giới thống nhất").

**Where & How — Làm trong môi trường gì?**

Phần này ghi lại thiết bị và môi trường mạng khi người dùng thực hiện hoạt động, được gọi là **thuộc tính công cộng**. Lý do gọi là "công cộng", vì bất kể người dùng làm gì, thông tin này sẽ tự động đi kèm theo. Ví dụ:

- Mẫu thiết bị: iPhone 15 / Xiaomi 14
- Loại mạng: WiFi / 5G / 4G
- Số phiên bản ứng dụng: v1.2.3
- Hệ điều hành: iOS 18 / Android 15

Giá trị của những thông tin này là: nếu phát hiện một lỗi chỉ xuất hiện trên một mẫu thiết bị nhất định, thuộc tính công cộng có thể giúp nhanh chóng xác định vấn đề.

**What — Cụ thể làm gì?**

Phần này ghi lại chi tiết kinh doanh cụ thể của hoạt động, được gọi là **thuộc tính tùy chỉnh**. Các hoạt động khác nhau cần ghi lại thông tin khác nhau. Ví dụ:

- Người dùng nhấp "thêm vào giỏ hàng": cần ghi lại tên sản phẩm, giá sản phẩm, số lượng sản phẩm
- Người dùng hoàn thành thanh toán: cần ghi lại số tiền đơn hàng, phương thức thanh toán, số phiếu giảm giá

**Tóm tắt bước này**: Thông qua mẫu 4W1H, chúng ta chuyển đổi mỗi hoạt động của người dùng thành một bản ghi dữ liệu có định dạng thống nhất. Trong triển khai kỹ thuật, bản ghi này thường được lưu dưới định dạng JSON (JSON là một định dạng dữ liệu phổ biến, thành phần tương tác ở trên hiển thị hình ảnh của nó).

**Nhưng ở đây lại có một vấn đề mới**: Định dạng dữ liệu đã thống nhất, nhưng nếu lượng người dùng của ứng dụng rất lớn (chẳng hạn như trong một chiến dịch khuyến mãi, có thể tạo ra hàng chục nghìn bản ghi mỗi giây), điện thoại của người dùng không thể gửi một lần mỗi khi tạo bản ghi — điều này không chỉ tốn pin mà còn tốn lưu lượng, máy chủ cũng không chịu được. Vì vậy, bước tiếp theo, chúng ta cần thiết kế một cách truyền tải thông minh hơn.

---

## Bước thứ ba: Truyền tải và bộ đệm — Làm cách nào để đưa dữ liệu an toàn đến máy chủ?

**Điều kiện tiên quyết**: Mỗi hoạt động của người dùng đã được ghi lại thành dữ liệu JSON có định dạng thống nhất.

**Mục tiêu bước này**: Đưa những dữ liệu này từ điện thoại của người dùng (hoặc trình duyệt) một cách đáng tin cậy đến máy chủ của chúng ta, ngay cả khi mạng không tốt cũng không mất dữ liệu.

**Tại sao không thể gửi trực tiếp?** Nếu mỗi khi tạo bản ghi thì gửi ngay một yêu cầu mạng, giống như mỗi viết một lá thư thì chạy một chuyến bưu điện — hiệu quả quá thấp. Cách hợp lý hơn là: tích lũy một lô, gửi cùng một lần.

<DataTrackingDemo tab="pipeline" />

**💡 Nguyên tắc cốt lõi: Ba dòng bảo vệ truyền tải dữ liệu**

Dữ liệu từ điện thoại người dùng đến máy chủ cần phải trải qua ba cơ chế bảo vệ, đảm bảo vừa hiệu quả vừa không mất dữ liệu:

**Dòng bảo vệ thứ nhất: Tích lũy rồi gửi (Kết hợp theo lô)**

SDK (bộ công cụ nhúng) sẽ không gửi mỗi khi tạo bản ghi, mà trước tiên tạm lưu bản ghi trong bộ nhớ điện thoại. Khi tích lũy đủ một số lượng nhất định (chẳng hạn như 30 bản ghi), hoặc chờ vượt quá một khoảng thời gian nhất định (chẳng hạn như 5 giây), thì đóng gói lô dữ liệu này, gửi cùng một lần.

Giống như gửi quà: bạn sẽ không mua một thứ rồi chạy đến bưu điện, mà tích lũy vài thứ rồi gửi cùng lúc, tiết kiệm thời gian và công sức. Đối với điện thoại, cách làm này có thể giảm số lần yêu cầu mạng, tiết kiệm pin và lưu lượng.

**Dòng bảo vệ thứ hai: Mất kết nối cũng không mất dữ liệu (Lưu trữ cục bộ)**

Người dùng ở thang máy, đường hầm tàu điện ngầm, điện thoại thường không có tín hiệu mạng. Nếu dữ liệu chỉ lưu trữ trong bộ nhớ, người dùng một đóng ứng dụng, dữ liệu sẽ mất.

Vì vậy SDK sẽ lưu dữ liệu chưa gửi vào bộ lưu trữ cục bộ của điện thoại (giống như lấy lá thư đặt vào ngăn kéo trước). Sau khi mạng phục hồi, nó sẽ tự động gửi lại những dữ liệu này. Như vậy ngay cả khi người dùng tạm thời mất kết nối, dữ liệu cũng sẽ không bị mất.

**Dòng bảo vệ thứ ba: Máy chủ không bị quá tải (Hàng đợi tin nhắn)**

Sau khi dữ liệu đến máy chủ, nó sẽ không trực tiếp ghi vào cơ sở dữ liệu. Tại sao? Vì trong thời gian cao điểm như các chiến dịch khuyến mãi, có thể hàng chục nghìn bản ghi đồng thời đổ vào mỗi giây, nếu cơ sở dữ liệu xử lý trực tiếp một lượng lớn như vậy, có thể sẽ sập.

Giải pháp là thêm một "vùng đệm" ở giữa, về mặt kỹ thuật gọi là **hàng đợi tin nhắn** (công cụ thường dùng gọi là Kafka). Chức năng của nó giống như hệ thống lấy số xếp hàng ở nhà hàng: vào các thời gian cao điểm, khách hàng (dữ liệu) trước tiên xếp hàng chờ, bếp (cơ sở dữ liệu) xử lý từng cái theo tốc độ của mình, sẽ không bị áp đảo bởi những đơn hàng đổ vào cùng lúc.

**Tóm tắt bước này**: Thông qua "tích lũy rồi gửi → mất kết nối lưu trữ cục bộ → hàng đợi tin nhắn đệm" ba dòng bảo vệ này, dữ liệu đã an toàn tới máy chủ.

**Nhưng vẫn còn một vấn đề**: Vì mất kết nối rồi kết nối lại sẽ tự động gửi lại dữ liệu, cùng một bản ghi có thể bị gửi hai lần. Nếu không xử lý thì trực tiếp lưu vào cơ sở dữ liệu, dữ liệu sẽ bị trùng lặp (chẳng hạn như một đơn hàng 100 yuan bị ghi thành hai đơn, doanh số sẽ tăng lên giả tạo). Vì vậy, bước tiếp theo, chúng ta cần "làm sạch" dữ liệu.

---

## Bước thứ tư: Làm sạch và lưu vào cơ sở dữ liệu — Sắp xếp dữ liệu, xóa bỏ "dữ liệu bẩn"

**Điều kiện tiên quyết**: Dữ liệu đã an toàn tới máy chủ thông qua đường ống truyền tải.

**Mục tiêu bước này**: Trước khi dữ liệu chính thức được lưu vào cơ sở dữ liệu, trước tiên hãy làm một lần "kiểm tra sức khỏe" — xóa bỏ những dữ liệu trùng lặp, sửa chữa những dữ liệu có vấn đề định dạng, đảm bảo dữ liệu cuối cùng được lưu trữ là sạch sẽ và chính xác.

**Tại sao cần làm sạch?** Giống như nhận được một thùng gói sau khi nhận hàng, bạn cần kiểm tra một cách: có bị gửi trùng lặp không? Có bị gửi nhầm không? Có bị hư hỏng không? Dữ liệu cũng vậy, trước khi trực tiếp lưu vào cơ sở dữ liệu, cần phải kiểm tra và sắp xếp.

Quá trình này về mặt kỹ thuật được gọi là **ETL**, là viết tắt của ba từ tiếng Anh:
- **E**xtract (Trích xuất): Lấy dữ liệu từ hàng đợi tin nhắn
- **T**ransform (Chuyển đổi): Kiểm tra và sửa định dạng dữ liệu
- **L**oad (Tải): Ghi dữ liệu đã làm sạch vào cơ sở dữ liệu

<DataTrackingDemo tab="overview" />

**💡 Nguyên tắc cốt lõi: Hai động tác chính khi làm sạch dữ liệu**

**Động tác một: Loại bỏ trùng lặp — Loại bỏ bản ghi trùng lặp**

Như đã đề cập trước đây, sau khi mất kết nối rồi kết nối lại SDK sẽ tự động gửi lại dữ liệu, điều này có thể dẫn đến cùng một bản ghi bị gửi nhiều lần. Làm cách nào để xác định những bản ghi nào là trùng lặp?

Cách rất đơn giản: khi đóng gói dữ liệu ở bên máy khách, cấp cho mỗi bản ghi một số định danh duy nhất toàn cầu (gọi là `dedup_id`, giống như số đơn giao hàng). Máy chủ trước khi lưu trữ dữ liệu, trước tiên kiểm tra xem số định danh này đã tồn tại chưa — nếu đã tồn tại, cho biết đó là dữ liệu trùng lặp, thẳng đơn giản loại bỏ.

**Động tác hai: Kiểm tra và thống nhất định dạng — Sửa chữa bản ghi không chuẩn**

Ứng dụng sẽ liên tục cập nhật phiên bản, mã nhúng ở các phiên bản khác nhau có thể có những khác biệt tinh tế. Ví dụ:

- Phiên bản cũ đặt tên trường ID người dùng là `userId`, phiên bản mới thay đổi thành `user_id`
- Một số bản ghi có dấu thời gian rõ ràng không hợp lý (chẳng hạn hiển thị năm 1970)
- Một số trường không thể xác định giá trị

Trong bước này, hệ thống sẽ viết các quy tắc chuyển đổi để xử lý thống nhất những vấn đề này: tên trường không nhất quán thì thống nhất căn chỉnh, dấu thời gian bất thường thì loại bỏ bản ghi, không thể xác định giá trị thì đánh dấu là `unknown`.

**Tóm tắt bước này**: Sau khi loại bỏ trùng lặp và kiểm tra định dạng, dữ liệu được ghi vào **kho dữ liệu** (một loại cơ sở dữ liệu dành riêng để lưu trữ và phân tích một lượng lớn dữ liệu, những loại phổ biến như ClickHouse, Hive, v.v.) dưới dạng sạch sẽ và thống nhất. Nhà phân tích dữ liệu có thể trực tiếp truy vấn những dữ liệu này bằng câu lệnh SQL, nhận được kết quả phân tích đáng tin cậy.

---

## Tóm tắt quy trình hoàn chỉnh

Dưới đây là tóm tắt bốn bước từ thu thập dữ liệu nhúng đến lưu vào cơ sở dữ liệu:

| Bước | Làm gì | Được gì | Còn vấn đề gì |
|------|----------|-----------|-------------|
| **1. Chọn phương pháp thu thập** | Quyết định cách nào để ghi hoạt động người dùng | Ứng dụng có khả năng ghi lại | Định dạng dữ liệu các máy ghi không thống nhất |
| **2. Thiết kế định dạng dữ liệu** | Dùng mẫu 4W1H để thống nhất định dạng ghi | Mỗi bản ghi là JSON tiêu chuẩn | Lượng người dùng lớn không chịu được gửi từng bản ghi |
| **3. Truyền tải và bộ đệm** | Tích lũy gửi, lưu trữ cục bộ khi mất kết nối, hàng đợi đệm | Dữ liệu an toàn tới máy chủ | Thử lại có thể dẫn đến dữ liệu trùng lặp |
| **4. Làm sạch và lưu vào cơ sở dữ liệu** | Loại bỏ trùng lặp, kiểm tra, thống nhất định dạng | ✅ Dữ liệu sạch được lưu vào kho dữ liệu | — |

---

## Kết luận

Khi người dùng nhấp vào một nút trong ứng dụng, trên bề mặt, đó chỉ là một hành động trong chốc lát. Nhưng phía sau, một đường ống dữ liệu hoàn chỉnh đã bắt đầu hoạt động:

1. Mã nhúng bắt được cái nhấp này, theo mẫu 4W1H tạo ra một bản ghi tiêu chuẩn
2. Bản ghi được tạm lưu trữ cục bộ trên điện thoại, tích lũy một lô rồi gửi thống nhất đến máy chủ
3. Máy chủ nhận qua hàng đợi tin nhắn một cách mềm mại, sau đó loại bỏ trùng lặp và kiểm tra định dạng
4. Cuối cùng, một bản dữ liệu sạch sẽ, chính xác được ghi vào kho dữ liệu

Đó là quy trình hoàn chỉnh của theo dõi dữ liệu. Nó chuyển đổi hành vi hoạt động của người dùng phân tán, không nhìn thấy được, thành dữ liệu có cấu trúc có thể truy vấn, có thể phân tích. Nhà sản phẩm có thể dựa vào đó hiểu người dùng thích chức năng gì, ở đâu rơi rơi; nhân viên vận hành có thể đánh giá hiệu quả hoạt động; nhà phát triển có thể xác định vấn đề xuất hiện ở phiên bản nào.

Hệ thống "thu thập → mô hình hóa → truyền tải → làm sạch" này là cơ sở hạ tầng để ra quyết định dựa trên dữ liệu.
