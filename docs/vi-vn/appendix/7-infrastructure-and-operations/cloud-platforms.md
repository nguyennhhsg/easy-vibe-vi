# Thực hành Nền tảng Đám mây
> **Hướng dẫn Học tập**: Nhà cung cấp dịch vụ đám mây không phải là "website bán máy chủ", mà là "cơ sở hạ tầng cung cấp khả năng tính toán giống như công ty nước điện". Chương này sẽ xoay quanh một câu hỏi lõi: **Từ con số không, làm thế nào để hiểu và sử dụng dịch vụ đám mây?** Chúng ta sẽ sử dụng các tình huống thực tế, so sánh sinh động và các bước thực hành để giúp bạn xây dựng bản đồ nhận thức hoàn chỉnh về dịch vụ đám mây.

Trước khi bắt đầu, bạn nên tìm hiểu:

- **Khái niệm mạng lưới cơ bản**: Nếu bạn chưa quen với các khái niệm như địa chỉ IP, cổng, tên miền, tôi khuyên bạn nên đọc [Kiến thức cơ bản về mạng](/vi-vn/appendix/1-computer-fundamentals/computer-networks)
- **API là gì**: Nếu bạn chưa hiểu về API, bạn có thể xem [Giới thiệu API](/vi-vn/appendix/4-server-and-backend/api-intro)

---

## 0. Mở đầu: Tại sao ngày càng nhiều công ty không mua máy chủ nữa?

Hãy tưởng tượng tình huống này:

Tiểu Minh khởi nghiệp năm 2010, muốn tạo một trang web. Anh ấy trải qua điều gì?

Anh ấy trước tiên bỏ ra 20.000 nhân dân tệ để mua một máy chủ Dell, sau đó liên hệ với IDC, trả 3.000 nhân dân tệ mỗi tháng cho tiền lưu trữ. Tiếp theo, anh ấy tự cài đặt Linux, cấu hình môi trường, và phải lo lắng về các vấn đề phần cứng - ổ cứng hỏng phải tự thay, máy quá nóng phải tự giải quyết. Điều đau khổ nhất là khi lượng người dùng tăng đột ngột, hệ thống không thể chịu được, anh ấy phải mua máy chủ mới. Một năm sau, Tiểu Minh đã chi 50.000 nhân dân tệ, nhưng tỷ lệ sử dụng máy chủ chỉ là 10%.

Còn công ty của Tiểu Hồng năm 2024 thì sao?

Cô ấy mở trang web của nhà cung cấp dịch vụ đám mây, đăng ký tài khoản, chỉ cần click vài cái là tạo được một máy chủ đám mây, hoàn thành trong 2 phút. Dùng bao nhiêu thì trả bấy nhiêu, không dùng thì không tốn tiền. Lưu lượng tăng, chỉ cần click để nâng cấp cấu hình. Muốn mở chi nhánh ở Mỹ? Chỉ cần chuyển khu vực là được. Một tháng sau, Tiểu Hồng chi 500 nhân dân tệ, tỷ lệ sử dụng máy chủ 80%.

**Trực giác chúng ta sẽ có cảm tưởng: "Dịch vụ đám mây chỉ là thuê máy chủ".**

Nhưng bản chất của dịch vụ đám mây còn hơn thế nhiều - đó là một **cuộc cách mạng khả năng tính toán**.

Trước đây, doanh nghiệp phải trải qua quá trình mua máy chủ, tìm kiếm trung tâm dữ liệu, cài đặt hệ thống, lo lắng về phần cứng, không có cách nào khi lưu lượng tăng đột ngột. Bây giờ, chỉ cần đăng ký tài khoản, click vài cái, trả tiền theo nhu cầu, tự động mở rộng, triển khai trên toàn cầu. Sự thay đổi này giống như từ việc tự đào giếng lấy nước, chuyển thành mở vòi nước là có nước.

---

## 1. Nền tảng đám mây là gì?

### 1.1 Dịch vụ tính toán giống như công ty nước điện

Bản chất của nhà cung cấp dịch vụ đám mây là **đóng gói khả năng tính toán, khả năng lưu trữ, khả năng mạng lưới thành các dịch vụ chuẩn hóa**, giống như công ty nước cung cấp nước, công ty điện cung cấp điện, thông qua Internet cung cấp cho người dùng sử dụng.

Điểm thông minh của mô hình này là **sử dụng theo nhu cầu**. Bạn không cần mua trước một lượng lớn phần cứng, chỉ cần trả tiền theo lượng sử dụng thực tế. Cần thêm tài nguyên? Chỉ cần click là được. Và một số dịch vụ thậm chí tính phí theo giây, cực kỳ linh hoạt. Hơn nữa, nhà cung cấp dịch vụ đám mây có trung tâm dữ liệu ở hơn 30 quốc gia, bạn có thể triển khai ứng dụng trên toàn cầu, tất cả các hoạt động đều là dịch vụ tự phục vụ, 24 giờ một ngày có thể thực hiện, không cần phê duyệt thủ công.

### 1.2 Sự khác biệt giữa dịch vụ đám mây và lưu trữ truyền thống

Lưu trữ IDC truyền thống giống như tự mua máy phát điện. Bạn cần mua phần cứng trước (máy chủ), sau đó tìm nơi để đặt (lưu trữ trong trung tâm dữ liệu), và phải tự bảo trì (cài đặt hệ thống, sửa phần cứng). Nếu sức mạnh điện không đủ, bạn phải mua một máy phát điện khác. Quá trình này có thể mất từ vài ngày đến vài tuần, chi phí là cố định, dù sử dụng hay không cũng phải trả tiền.

Dịch vụ đám mây giống như kết nối vào lưới điện. Bạn không cần mua máy phát điện, chỉ cần kéo một sợi dây điện (đăng ký tài khoản), sau đó trả tiền theo lượng điện sử dụng. Cần thêm sức mạnh điện? Chỉ cần nâng cấp gói dịch vụ thành gói lớn hơn là được, hoàn thành trong vài phút. Trong mô hình này, chi phí là có thể thay đổi, dùng bao nhiêu trả bấy nhiêu, và nhà cung cấp đám mây chịu trách nhiệm về tất cả các phần cứng, bạn chỉ cần tập trung vào kinh doanh của mình.

### 1.3 Đám mây công cộng, đám mây riêng tư và đám mây lai

Giống như nhà hàng có các mô hình kinh doanh khác nhau, dịch vụ đám mây cũng có ba loại.

**Đám mây công cộng** giống như nhà hàng công cộng, ai cũng có thể sử dụng, tài nguyên được chia sẻ. AWS, Aliyun, Azure đều là đám mây công cộng, phù hợp với hầu hết các doanh nghiệp và cá nhân. Đây là trọng tâm của cuốn sách này, vì nó được sử dụng nhiều nhất, phù hợp nhất với việc học tập.

**Đám mây riêng tư** giống như bếp riêng, tự xây dựng, tài nguyên độc quyền. OpenStack, VMware là các ví dụ điển hình, phù hợp với các doanh nghiệp lớn, chính phủ, ngân hàng và những nơi có yêu cầu cao về bảo mật dữ liệu.

**Đám mây lai** là sự kết hợp của cả hai, một phần kinh doanh sử dụng đám mây công cộng, một phần sử dụng đám mây riêng tư. Tất cả các nhà cung cấp đều có giải pháp, phù hợp với các tình huống vừa cần tuân thủ quy định vừa cần tính linh hoạt.

👇 **Hãy thử bấm xem nào**:
Nhấp vào thẻ dịch vụ dưới đây để tìm hiểu sáu danh mục dịch vụ đám mây cốt lõi.

<CloudServicesOverview />

---

## 2. Các nhà cung cấp dịch vụ đám mây nổi tiếng là những ai?

### 2.1 Ba gã khổng lồ quốc tế: AWS, Azure, Google Cloud

Trên thị trường dịch vụ đám mây toàn cầu, ba công ty này chiếm vị trí dẫn đầu.

**AWS (Amazon Web Services)** là dịch vụ đám mây do Amazon phát hành năm 2006, chiếm khoảng 32% thị phần toàn cầu. Nó giống như một "cửa hàng bách hóa" trong lĩnh vực dịch vụ đám mây, có loại dịch vụ nhiều nhất, có hơn 200 dịch vụ, chức năng trưởng thành và ổn định nhất, tài liệu và tài nguyên cộng đồng cũng dồi dào nhất. Giá cả mặc dù hơi cao, nhưng tỷ lệ hiệu quả giá rất tốt, đặc biệt phù hợp với các doanh nghiệp ra nước ngoài, công ty khởi nghiệp và các công ty Internet lớn.

**Microsoft Azure** là dịch vụ đám mây do Microsoft phát hành năm 2010, chiếm khoảng 23% thị phần toàn cầu. Ưu điểm lớn nhất của nó là tích hợp sâu với hệ sinh thái Windows, Office, có nhiều tài nguyên khách hàng cấp doanh nghiệp, khả năng đám mây lai mạnh, rất thân thiện với các nhà phát triển .NET. Nếu công ty bạn đã sử dụng công nghệ của Microsoft, Azure là lựa chọn tự nhiên.

**Google Cloud Platform (GCP)** là dịch vụ đám mây do Google phát hành năm 2011, chiếm khoảng 10% thị phần toàn cầu. Nó dẫn đầu trong Kubernetes, phân tích dữ liệu, lĩnh vực AI, khả năng đổi mới công nghệ mạnh, giá tương đối rẻ. Nhưng thị phần nhỏ hơn, hệ sinh thái không bằng hai công ty đó, phù hợp với các công ty theo đuổi công nghệ, ứng dụng container hóa và dự án AI.

### 2.2 Ba gã khổng lồ trong nước: Aliyun, Tencent Cloud, Huawei Cloud

Trên thị trường dịch vụ đám mây Trung Quốc, cũng có ba nhà cung cấp chính.

**Aliyun** là bộ phận tính toán đám mây do Alibaba thành lập năm 2009, chiếm khoảng 40% thị phần Trung Quốc. Là nhà cung cấp dịch vụ đám mây sớm nhất, trưởng thành nhất trong nước, Aliyun có loại dịch vụ đầy đủ, tích lũy công nghệ thương mại điện tử sâu, bao gồm lưu lượng cao của ngày Mua sắm kép. Mặc dù giá tương đối cao hơn, nhưng độ ổn định và tính hoàn thiện của chức năng đều hàng đầu, đặc biệt phù hợp với các doanh nghiệp trong nước và các dự án liên quan đến thương mại điện tử.

**Tencent Cloud** là bộ phận dịch vụ đám mây do Tencent thành lập năm 2013, chiếm khoảng 15% thị phần Trung Quốc. Nó có khả năng mạnh trong trò chơi, âm thanh và video, tích hợp tốt với hệ sinh thái WeChat, QQ, giá tương đối rẻ, phát triển nhanh trong những năm gần đây. Nếu bạn làm dự án trò chơi, mạng xã hội hoặc phát trực tiếp, Tencent Cloud là một lựa chọn tốt.

**Huawei Cloud** là bộ phận dịch vụ đám mây do Huawei thành lập năm 2015, chiếm khoảng 10% thị phần Trung Quốc. Nó có tích lũy công nghệ phần cứng mạnh, có nhiều tài nguyên khách hàng chính phủ và doanh nghiệp, khả năng bảo mật tuân thủ quy định mạnh, chip AI (Ascend) có đặc sắc. Phù hợp với các dự án chính phủ, các doanh nghiệp nhà nước lớn và lĩnh vực sản xuất.

### 2.3 Làm thế nào để chọn nhà cung cấp dịch vụ đám mây?

Chọn nhà cung cấp dịch vụ đám mây giống như chọn nhà cho thuê, cần xem xét vị trí, giá cả, các tiện ích kèm theo và nhiều yếu tố khác.

**Trước tiên hãy xem thị trường mục tiêu**. Người dùng chính của bạn ở đâu? Nếu người dùng ở Trung Quốc, chọn Aliyun hoặc Tencent Cloud; nếu người dùng ở nước ngoài, chọn AWS hoặc Azure; nếu là kinh doanh toàn cầu, chọn nhà cung cấp có phạm vi đa địa chỉ.

**Tiếp theo xem công nghệ của bạn**. Bạn dùng công nghệ gì? Nếu dùng công nghệ Microsoft, chọn Azure; nếu dùng Kubernetes, dữ liệu lớn, chọn Google Cloud; nếu là tình huống chung, AWS là một lựa chọn an toàn.

**Sau đó xem chi phí**. Dự án nhỏ thử nghiệm có thể chọn giá rẻ, ví dụ như Tencent Cloud hoặc UCloud; quy mô lớn sản xuất thì phải xem tổng chi phí, AWS có thể tiết kiệm tiền hơn về lâu dài.

**Cuối cùng xem hệ sinh thái**. Nếu bạn đã sử dụng các dịch vụ khác, ví dụ như GitHub, Office 365, chọn nhà cung cấp cùng hệ sinh thái sẽ thuận tiện hơn.

Lời khuyên thực tế là: người mới bắt đầu hoặc dự án nhỏ chọn Aliyun hoặc Tencent Cloud, vì tài liệu là tiếng Trung Quốc, dịch vụ khách hàng ở trong nước; dự án ra nước ngoài chọn AWS, vì nó trưởng thành nhất, phạm vi toàn cầu tốt nhất; doanh nghiệp lớn có thể cần chiến lược đa đám mây, các kinh doanh khác nhau dùng các đám mây khác nhau.

---

## 3. Thông thường sử dụng dịch vụ đám mây như thế nào?

### 3.1 Quy trình hoàn chỉnh từ đăng ký đến đi online

Bước đầu tiên sử dụng dịch vụ đám mây là đăng ký tài khoản. Quá trình này giống như mở tài khoản ngân hàng, cần xác minh danh tính của bạn. Mở trang web của nhà cung cấp dịch vụ đám mây, click vào "Đăng ký miễn phí", điền email và mật khẩu, xác minh số điện thoại, sau đó tải lên CMND hoặc giấy phép kinh doanh để xác nhận danh tính thật, cuối cùng liên kết với phương thức thanh toán. Toàn bộ quá trình mất khoảng 10 đến 20 phút.

Sau khi đăng ký, bạn cần hiểu một vài khái niệm lõi. **Khu vực (Region)** là nơi đặt trung tâm dữ liệu của dịch vụ đám mây, ví dụ như Đông Hoa (Hàng Châu), Đông Mỹ (Virginia), Châu Á Thái Bình Dương (Singapore). Nguyên tắc lựa chọn là càng gần người dùng của bạn càng tốt, vì độ trễ thấp hơn. **Vùng khả dụng (Availability Zone, AZ)** là nhiều trung tâm dữ liệu trong một khu vực, cách ly với nhau, cải thiện tính khả dụng. Nếu một vùng khả dụng ngừng hoạt động, vùng khác vẫn có thể sử dụng được. **Thực thể (Instance)** là một máy chủ ảo, ví dụ như một máy chủ đám mây 2 lõi 4GB, cách tính phí là theo thời gian hoặc theo lượng.

### 3.2 Tạo máy chủ đám mây đầu tiên

Quá trình tạo máy chủ đám mây giống như lắp ráp một máy tính, nhưng là click chọn cấu hình trên trang web. Trước tiên chọn chế độ trả tiền, môi trường thử nghiệm dùng trả tiền theo nhu cầu, chạy lâu dài dùng trả theo năm tháng. Sau đó chọn khu vực, chọn cái gần bạn nhất, ví dụ như Đông Hoa - Hàng Châu. Về cấu hình thực thể, 2 lõi 4GB đủ cho môi trường thử nghiệm. Lựa chọn hình ảnh là hệ điều hành, ví dụ như CentOS 7.9 hoặc Ubuntu 20.04. Lưu trữ dùng ổ đĩa hệ thống 40GB, mạng dùng mạng VPC mặc định, băng thông trả tiền theo lưu lượng sử dụng tiết kiệm hơn. Cuối cùng thiết lập mật khẩu người dùng root, nhớ lưu lại. Toàn bộ quá trình mất khoảng 5 phút, sau khi tạo thực thể xong chỉ cần chờ 1 đến 2 phút là có thể sử dụng.

👇 **Hãy thử bấm xem nào**:
Chọn cấu hình, hiểu được giá cả và các trường hợp sử dụng của các cấu hình khác nhau.

<ComputeInstanceDemo />

### 3.3 Kết nối máy chủ đám mây và triển khai ứng dụng

Kết nối máy chủ Linux khuyên dùng SSH. Cách đăng nhập bằng mật khẩu là `ssh root@địa chỉ IP công khai của máy chủ của bạn`, sau đó nhập mật khẩu. Đăng nhập bằng khóa an toàn hơn, cách là `ssh -i khóa riêng của bạn.pem root@địa chỉ IP công khai của máy chủ của bạn`.

Sau khi kết nối với máy chủ, bạn có thể triển khai ứng dụng. Trước tiên cập nhật hệ thống, CentOS dùng `sudo yum update -y`, Ubuntu dùng `sudo apt update && sudo apt upgrade -y`. Sau đó cài đặt phần mềm cần thiết, ví dụ như Node.js. Tiếp theo tải lên mã, có thể dùng git hoặc scp. Cuối cùng cài đặt phụ thuộc và khởi động ứng dụng.

### 3.4 Các tình huống sử dụng phổ biến

**Lưu trữ website hoặc blog cá nhân** cần máy chủ đám mây cộng với tên miền, 1 lõi 2GB đủ dùng, chi phí khoảng 50 đến 100 nhân dân tệ mỗi tháng, công nghệ có thể dùng Nginx cộng tập tin tĩnh hoặc WordPress.

**Triển khai backend API** cần máy chủ đám mây cộng với cơ sở dữ liệu, 2 lõi 4GB bắt đầu, chi phí khoảng 200 đến 500 nhân dân tệ mỗi tháng, công nghệ có thể dùng Node.js hoặc Python kết hợp với MySQL hoặc PostgreSQL.

**Lưu trữ hình ảnh hoặc video** khuyên dùng lưu trữ đối tượng, tính phí theo lượng lưu trữ và lưu lượng, chi phí từ vài nhân dân tệ đến vài trăm nhân dân tệ mỗi tháng. Ưu điểm là không cần quản lý ổ cứng, sao lưu tự động, còn có thể kết hợp với CDN để tăng tốc.

👇 **Hãy thử bấm xem nào**:
Tìm hiểu các loại dịch vụ lưu trữ đám mây khác nhau và các tình huống sử dụng của chúng.

<StorageTypeDemo />

---

## 4. Làm thế nào để mua và gọi API?

### 4.1 Mô hình tính phí của dịch vụ đám mây

Có nhiều cách tính phí dịch vụ đám mây, hiểu rõ chúng có thể giúp bạn tiết kiệm nhiều tiền.

**Trả tiền theo nhu cầu (Pay-as-you-go)** giống như mua vé xem phim từng cái, dùng bao nhiêu trả bấy nhiêu, không dùng không tốn tiền. Phù hợp với môi trường thử nghiệm, các dự án có lưu lượng không ổn định. Máy chủ đám mây tính phí theo giờ, lưu trữ đối tượng tính phí theo GB cộng số lần yêu cầu, API AI tính phí theo số lần gọi.

**Trả theo năm tháng hoặc thực thể dự trữ** giống như mua vé tháng hoặc vé năm, cam kết sử dụng một khoảng thời gian nhất định, được hưởng chiết khấu, thường có thể tiết kiệm 30% đến 60%. Phù hợp với môi trường sản xuất chạy dài hạn ổn định. Ví dụ một máy chủ 2 lõi 4GB, trả tiền theo nhu cầu 200 nhân dân tệ mỗi tháng, trả theo năm có thể chỉ 140 nhân dân tệ mỗi tháng.

**Thực thể cạnh tranh hoặc thực thể chiếm giữ** giống như vé dự phòng, giá rất rẻ, có thể tiết kiệm tới 90%, nhưng có thể bị buộc thu hồi. Phù hợp với tác vụ xử lý hàng loạt, tác vụ có khả năng chịu lỗi cao, ví dụ như xử lý dữ liệu, tác vụ kết xuất. Rủi ro là khi tài nguyên của nhà cung cấp đám mây căng thẳng sẽ buộc thu hồi thực thể.

**Serverless tính phí theo số lần gọi** giống như taxi, không cần lo lắng về máy chủ, chỉ cần lo lắng về số lần gọi. Cách tính phí là số lần gọi cộng thời gian tính toán cộng lưu lượng, phù hợp với giao diện API, tác vụ được kích hoạt bởi sự kiện. Ví dụ tính toán chức năng Aliyun, 1 triệu lần gọi đầu tiên miễn phí, vượt quá thì 1,33 nhân dân tệ mỗi triệu lần.

👇 **Hãy thử bấm xem nào**:
Dùng máy tính tính phí, so sánh sự khác biệt chi phí giữa các mô hình tính phí khác nhau.

<PricingCalculator />

### 4.2 Quy trình hoàn chỉnh mua dịch vụ gọi API

Lấy gọi API Thông Nghị Thiên Vấn làm ví dụ, toàn bộ quy trình chia thành bốn bước.

**Bước thứ nhất là bật dịch vụ**. Mở nền tảng mở AI của nhà cung cấp dịch vụ đám mây hoặc nền tảng học máy PAI, tìm Thông Nghị Thiên Vấn hoặc DashScope, click vào "Bật ngay" hoặc "Dùng thử miễn phí", mất khoảng 2 phút hoàn thành.

**Bước thứ hai là lấy API Key**. Vào bảng điều khiển quản lý API-KEY, click vào "Tạo API-KEY của tôi", sao chép và lưu lại Key này. Lưu ý quan trọng: API Key chỉ hiển thị một lần, vui lòng lưu lại ngay lập tức.

**Bước thứ ba là cấu hình quyền hạn**. Vào kiểm soát truy cập (RAM) hoặc quản lý quyền hạn (IAM), tạo một người dùng hoặc vai trò, chỉ cấp những quyền hạn cần thiết, ví dụ như chỉ có thể gọi Thông Nghị Thiên Vấn, không thể xóa máy chủ. Đây là nguyên tắc quyền hạn tối thiểu.

**Bước thứ tư là gọi để kiểm tra**. Dùng Python hoặc JavaScript phát hành lần gọi đầu tiên, xác nhận API có hoạt động bình thường hay không.

---

## 5. Thực hành: Triển khai một website từ con số không

### 5.1 Tình huống và lựa chọn giải pháp

Giả sử bạn là một nhà phát triển giao diện trước, muốn triển khai một website blog cá nhân. Yêu cầu là website tĩnh (HTML/CSS/JS), có tên miền của riêng mình, tốc độ truy cập toàn cầu nhanh, chi phí thấp nhất có thể.

Có ba giải pháp có thể lựa chọn. Giải pháp máy chủ đám mây có chi phí vừa, độ khó vừa, phù hợp với tình huống cần dịch vụ backend. Giải pháp lưu trữ đối tượng cộng CDN có chi phí thấp, độ khó thấp, phù hợp với website tĩnh thuần, đây là giải pháp khuyên dùng của chúng tôi. Giải pháp Serverless có chi phí cực thấp, độ khó vừa, phù hợp với nội dung động.

Lý do khuyên dùng lưu trữ đối tượng cộng CDN là: chi phí thấp nhất (có thể miễn phí), cấu hình đơn giản nhất, tốc độ nhanh nhất (tăng tốc CDN).

👇 **Hãy thử bấm xem nào**:
Theo hướng dẫn từng bước, hiểu được quy trình hoàn chỉnh triển khai website.

<DeployWorkflowDemo />

### 5.2 Bước thực hiện

**Bước thứ nhất: Chuẩn bị tập tin website**. Tạo một index.html đơn giản:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Blog của tôi</title>
</head>
<body>
  <h1>Chào mừng bạn đến blog của tôi</h1>
  <p>Đây là bài viết đầu tiên của tôi.</p>
</body>
</html>
```

**Bước thứ hai: Tạo Bucket lưu trữ đối tượng**. Đăng nhập bảng điều khiển đám mây, tìm lưu trữ đối tượng (OSS/S3), click vào "Tạo Bucket". Cấu hình tên (ví dụ như my-blog-2024, toàn cầu độc nhất), chọn khu vực (gần bạn nhất), thiết lập quyền hạn là đọc công khai (website cần được truy cập).

**Bước thứ ba: Tải lên tập tin**. Vào Bucket, click vào "Tải lên tập tin", chọn index.html, chờ tải lên hoàn thành.

**Bước thứ tư: Cấu hình lưu trữ trang tĩnh**. Vào cài đặt Bucket, tìm "Trang tĩnh" hoặc "Lưu trữ website", bật chức năng, thiết lập trang chủ mặc định là index.html, lưu cấu hình.

**Bước thứ năm: Liên kết tên miền (tùy chọn)**. Mua tên miền (ví dụ như Aliyun 万网), thêm bản ghi CNAME chỉ tới tên miền Bucket, liên kết tên miền tùy chỉnh trong Bucket, cấu hình HTTPS.

**Bước thứ sáu: Cấu hình CDN (khuyên dùng)**. Bật dịch vụ CDN, thêm tên miền tăng tốc, chọn nguồn (Bucket của bạn), chờ CDN có hiệu lực (vài phút đến vài giờ).

### 5.3 Ước tính chi phí

Ước tính chi phí hàng tháng: lưu trữ đối tượng 0 đến 5 nhân dân tệ (tính phí theo lượng lưu trữ), lưu lượng CDN 0 đến 10 nhân dân tệ (tính phí theo lưu lượng, có hạn mức miễn phí), tên miền 5 đến 10 nhân dân tệ (tính theo năm). Tổng cộng 5 đến 25 nhân dân tệ mỗi tháng, website nhỏ có thể hoàn toàn miễn phí.

---

## 6. Tổng kết và bước tiếp theo

### 6.1 Ôn tập các điểm chính

Bản chất của dịch vụ đám mây có thể tóm tắt như sau: nhà cung cấp dịch vụ đám mây là công ty nước điện của khả năng tính toán, cung cấp khả năng sử dụng theo nhu cầu, triển khai toàn cầu, dịch vụ tự phục vụ. Quy trình sử dụng là chọn nhà cung cấp, đăng ký tài khoản, tạo tài nguyên, cấu hình quyền hạn, giám sát chi phí.

Các điểm quyết định chính bao gồm: chọn nhà cung cấp xem thị trường, công nghệ, chi phí; chọn mô hình tính phí cân bằng giữa trả tiền theo nhu cầu, trả theo năm tháng, Serverless; cấu hình quyền hạn tuân theo nguyên tắc quyền hạn tối thiểu, bật xác thực đa yếu tố, thường xuyên kiểm toán; kiểm soát chi phí giám sát mức sử dụng, dùng chiết khấu, kịp thời giải phóng tài nguyên không cần thiết.

### 6.2 Đề xuất đường đi học tập

Tuần thứ nhất học nền tảng lý thuyết, hiểu khái niệm cơ bản về dịch vụ đám mây, đăng ký một tài khoản đám mây, tạo máy chủ đám mây đầu tiên. Tuần thứ hai thực hành động, triển khai một website tĩnh, cấu hình tên miền và CDN, học lệnh Linux cơ bản. Tuần thứ ba học kỹ năng nâng cao, bao gồm quản lý quyền hạn (IAM), giám sát và cảnh báo, tối ưu hóa chi phí. Tuần thứ tư thực hành dự án, triển khai một ứng dụng hoàn chỉnh, cấu hình cơ sở dữ liệu và lưu trữ, thực hiện tự động mở rộng.

### 6.3 Tài nguyên khuyên dùng

Tài liệu chính thức bao gồm Trung tâm tài liệu Aliyun, Tài liệu tiếng Trung AWS, Tài liệu Tencent Cloud. Nền tảng học tập có Đại học Aliyun, Gói miễn phí AWS, Phòng thí nghiệm Tencent Cloud. Tài nguyên cộng đồng có Cộng đồng Đám mây Native, Mạng Serverless Tiếng Trung, Chuyên mục Tính toán Đám mây InfoQ.

---

## 7. Bảng đối chiếu Danh từ

| Thuật ngữ Tiếng Anh | Đối chiếu Tiếng Trung | Giải thích |
| :--- | :--- | :--- |
| **Cloud Provider** | Nhà cung cấp dịch vụ đám mây | Công ty cung cấp dịch vụ điện toán đám mây, ví dụ như AWS, Aliyun |
| **Region** | Khu vực | Khu vực địa lý nơi đặt trung tâm dữ liệu |
| **Availability Zone** | Vùng khả dụng | Nhiều trung tâm dữ liệu trong một khu vực |
| **Instance** | Thực thể | Một máy chủ ảo |
| **Image/AMI** | Hình ảnh | Mẫu hệ điều hành được cấu hình trước |
| **VPC** | Đám mây riêng tư ảo | Môi trường mạng ảo cách ly |
| **IAM/RAM** | Quản lý Danh tính và Truy cập | Hệ thống quản lý quyền hạn |
| **User** | Người dùng | Một danh tính cụ thể |
| **Group** | Nhóm người dùng | Bộ sưu tập người dùng |
| **Role** | Vai trò | Danh tính tạm thời |
| **Policy** | Chính sách | Tài liệu JSON xác định quyền hạn |
| **API Key** | Khóa API | Chứng chỉ gọi API |
| **AccessKey** | Khóa Truy cập | Chứng chỉ truy cập lập trình (ID + Secret) |
| **MFA** | Xác thực Đa Yếu Tố | Cách đăng nhập cần mật khẩu cộng mã xác minh |
| **CDN** | Mạng Phân phối Nội dung | Dịch vụ tăng tốc toàn cầu, lưu trong bộ nhớ đệm tài nguyên tĩnh |
| **OSS/S3** | Lưu trữ Đối tượng | Dịch vụ lưu trữ tập tin |
| **ECS/EC2** | Máy chủ Đám mây | Dịch vụ máy chủ ảo |
| **RDS** | Dịch vụ Cơ sở Dữ liệu Quan hệ | Cơ sở dữ liệu được quản lý |
| **Serverless** | Không Máy chủ | Chế độ tính toán không cần quản lý máy chủ |
| **Pay-as-you-go** | Trả tiền theo Nhu cầu | Mô hình tính phí dùng bao nhiêu trả bấy nhiêu |
| **Reserved Instance** | Thực thể Dự trữ | Mô hình tính phí trả theo năm tháng |
| **Spot Instance** | Thực thể Cạnh tranh | Thực thể giá rẻ nhưng có thể bị thu hồi |
