# CI / CD Tự động hóa
::: tip 🎯 Vấn đề cốt lõi
**Code chạy tốt trên máy tính cá nhân, làm sao để mọi người trên thế giới có thể truy cập?**
:::

---

## 1. Tại sao phải "triển khai dịch vụ"?

Hãy tưởng tượng bạn đã nấu một bàn cơm rất ngon ở nhà. Nhưng vấn đề là, chỉ có gia đình bạn mới có thể ăn. Hàng xóm, bảo vệ, người lạ đều không thể nếm được.

Phải làm sao? Bạn cần **mang cơm ra nhà hàng**. Đó chính là những gì "triển khai dịch vụ" làm - chuyển code bạn viết, từ máy tính cá nhân sang một chiếc "máy tính công cộng" hoạt động 7×24 giờ không ngừng. Như vậy, bất cứ ai có kết nối internet cũng có thể truy cập website của bạn.

<DeploymentOverviewDemo />

Triển khai dịch vụ liên quan đến nhiều khâu. Giống như mở nhà hàng không chỉ đơn thuần là mang cơm ra. Bạn còn phải thuê cửa hàng, trang trí, xin giấy phép, thuê nhân viên phục vụ, v.v. Tương tự, từ code đến website mà người dùng có thể truy cập, phải trải qua rất nhiều bước. Cần hoàn thành từng bước: xây dựng, triển khai, cấu hình mạng, đảm bảo bảo mật, v.v.

Dưới đây, tôi sẽ tách cả quy trình ra và giải thích chi tiết. Mỗi khâu đều được phân tích kỹ lưỡng. Bảo đảm cả những người hoàn toàn mới cũng có thể hiểu.

---

## 2. Xây dựng: Biến code thành "gói hàng có thể vận chuyển"

### 2.1 Tại sao phải xây dựng?

Người mới thường hỏi: Code viết xong, tại sao không thể đặt trực tiếp trên server để người dùng truy cập?

Để trả lời câu hỏi này, trước tiên cần hiểu định dạng của code bạn viết. Bạn có thể sử dụng các framework như Vue, React, Express, Koa. Các framework này có một đặc điểm chung: **chúng không phải để trình duyệt hoặc server sử dụng trực tiếp**.

Lấy một ví dụ. Khi viết code Vue, bạn có dùng các tag như `<template>`, `<script setup>` không? Cú pháp này chỉ có Vue hiểu. Trình duyệt hoàn toàn không hiểu được. Trình duyệt chỉ hiểu ba loại ngôn ngữ: HTML (cấu trúc trang web), CSS (kiểu dáng trang web), JavaScript (logic trang web). Cú pháp component Vue đối với trình duyệt giống như chữ tượng hình, hoàn toàn không thể hiểu được.

Vì vậy, trước khi đặt code trên server, phải làm một việc quan trọng: **dịch nó sang ngôn ngữ mà trình duyệt có thể hiểu**. Quá trình dịch này gọi là "xây dựng" (Build).

### 2.2 Xây dựng làm những gì cụ thể?

Xây dựng không chỉ là dịch. Nó còn làm rất nhiều tối ưu hóa. Làm cho website chạy nhanh hơn, tiết kiệm tài nguyên hơn. Chi tiết về những công việc nó thực hiện:

**Bước một: Phân tích phụ thuộc**

Khi viết code, sẽ sử dụng các thư viện bên thứ ba. Ví dụ Vue, Vue Router, Axios, Vite, v.v. Không thể để người dùng tải về các thư viện này từ npm mỗi lần. Điều đó quá chậm. Công cụ xây dựng sẽ phân tích code, tìm ra tất cả các phụ thuộc. Sau đó "đóng gói" chúng lại với nhau.

**Bước hai: Biên dịch chuyển đổi**

Đây là bước cốt lõi nhất. Biên dịch component Vue thành HTML và JavaScript. Biên dịch SASS/LESS thành CSS. Chuyển đổi cú pháp ES6+ mới thành code ES5 có khả năng tương thích tốt hơn. Sau bước này, code chuyển từ "định dạng mà lập trình viên hiểu" sang "định dạng mà máy có thể thực thi".

**Bước ba: Nén và xáo trộn**

Nén là xóa bỏ tất cả khoảng trắng, dòng mới, bình luận. Đổi tên biến từ các từ tiếng Anh sang các ký tự đơn lẻ. Ví dụ `userName` thành `a`, `calculateTotalPrice` thành `b`. Như vậy kích thước file giảm đáng kể. Người dùng có thể tải xuống nhanh hơn. Code đã bị xáo trộn thì con người cơ bản không thể hiểu. Cũng có thể bảo vệ code một chút.

**Bước bốn: Chia tách code**

Có thể bạn viết 10 trang. Mỗi trang có code riêng của nó. Nhưng người dùng có thể chỉ truy cập một trong số chúng. Tại sao phải tải code của 9 trang khác? Công cụ xây dựng sẽ chia code thành nhiều phần nhỏ. Người dùng truy cập trang nào sẽ tải code của trang đó. Đây là "tải theo nhu cầu". Có thể cải thiện đáng kể tốc độ truy cập lần đầu.

**Bước năm: Tạo hash**

Đây là một bước rất quan trọng. Nhưng nhiều người bỏ qua. Sau khi xây dựng xong, tên file sẽ thành các định dạng như `app.abc123.js`, `vendor.def456.css`. Chuỗi ký tự kỹ tự hỗn hợp đó gọi là "hash".

Tác dụng của hash là: khi code có bất kỳ thay đổi, giá trị hash sẽ thay đổi. Trình duyệt sẽ biết "file này đã thay đổi, cần tải lại". File không thay đổi, trình duyệt sẽ tiếp tục sử dụng bộ nhớ cache. Không cần tải lại. Như vậy vừa bảo đảm người dùng thấy code mới nhất, vừa tận dụng tối đa bộ nhớ cache để cải thiện tốc độ.

<DeploymentBuildDemo />

### 2.3 Cách thực thi xây dựng?

Hầu hết các dự án frontend hiện đại đã cấu hình sẵn công cụ xây dựng. Chỉ cần nhớ một lệnh:

```bash
# Nếu dùng npm
npm run build

# Nếu dùng yarn
yarn build

# Nếu dùng pnpm
pnpm build
```

Sau khi chạy xong, hãy tìm một thư mục tên là `dist` trong thư mục gốc dự án (đôi khi cũng gọi là `build` hoặc `.output`). Bên trong chứa tất cả các file đã xây dựng. Đây là những file cuối cùng cần tải lên server. Không cần chỉnh sửa thêm. Chỉ cần kéo thả lên server là được.

### 2.4 Sản phẩm xây dựng chứa những gì?

Mở thư mục dist, bạn sẽ thấy bên trong chủ yếu là ba loại file:

- **File HTML**: Thường gọi là `index.html`. Đây là file vào. Trình duyệt tải cái này trước tiên.
- **File JS**: Tất cả code JavaScript. Có thể là 1 file hoặc là vài file.
- **File CSS**: Tất cả code kiểu dáng. Có thể nhúng trong HTML, cũng có thể là file CSS riêng.

Nếu là dự án backend phức tạp hơn (ví dụ Node.js), sản phẩm xây dựng có thể là một file thực thi, hoặc một Docker image. Nhưng nguyên lý là giống nhau: chuyển code thành một dạng mà server có thể chạy trực tiếp.

---

## 3. Server: Tìm một chiếc "nhà" không bao giờ đóng cửa

### 3.1 Server chính xác là gì?

Nhiều người lần đầu nghe "server" cảm thấy nó là một thiết bị bí ẩn cao cấp nào đó. Thực tế không phức tạp thế. **Server chỉ là một máy tính**. Một chiếc máy tính không bao giờ tắt, luôn cắm vào internet.

Có thể bạn sẽ hỏi: Tôi có máy tính ở nhà rồi, tại sao phải thuê server?

Câu hỏi hay. Hãy để tôi phân tích cho bạn:

Thứ nhất, máy tính ở nhà không thể hoạt động 24/7. Bạn phải ra ngoài, phải ngủ, đôi khi lại bị treo phải khởi động lại. Nhưng server khác. Nó được dùng riêng cho việc này. Có thể chạy 365 ngày không nghỉ trong năm. Website có thể truy cập bất cứ lúc nào.

Thứ hai, mạng ở nhà cũng không tốt. Tốc độ tải lên của đường truyền hợp đồng thường rất chậm. Hơn nữa, IP của đường truyền hợp đồng thay đổi động. Hôm nay là IP này, ngày mai có thể là IP khác. Hoàn toàn không thể dùng làm server website. Server dùng mạng tốc độ cao của data center. IP cố định, tốc độ mạng nhanh hơn.

Thứ ba, máy tính ở nhà không có "IP công cộng". Cái gọi là IP công cộng là gì? Là địa chỉ duy nhất trên toàn thế giới. Chỉ có địa chỉ này, người khác mới có thể tìm thấy máy tính bạn trên internet. IP của máy tính ở nhà thường chỉ có thể dùng trong mạng nội bộ nhà bạn. Người bên ngoài hoàn toàn tìm không thấy. Server thì khác. Nó có một IP công cộng cố định. Mọi người trên thế giới đều có thể qua IP này để tìm thấy nó.

<DeploymentServerDemo />

### 3.2 Cách chọn server?

Chọn server chủ yếu xem ba chỉ số: **số nhân CPU**, **dung lượng bộ nhớ**, **dung lượng ổ cứng**. Ba chỉ số này càng cao, hiệu suất server càng tốt, giá cũng càng đắt.

Đối với người mới bắt đầu, hoàn toàn không cần mua cấu hình đắt. Nhớ một cách chọn đơn giản:

- **Dự án cá nhân, học tập thực hành**: 1 nhân 2G bộ nhớ, đủ dùng. Mỗi tháng khoảng vài chục đô la.
- **Dự án thương mại nhỏ**: 2 nhân 4G bộ nhớ. Có thể chịu được mỗi ngày vài nghìn đến vài chục nghìn lần truy cập.
- **Dự án quy mô trung bình**: 4 nhân 8G hoặc cao hơn. Cần đội ngũ chuyên nghiệp vận hành rồi.

Còn một điểm cần xem xét: **vị trí địa lý**. Nếu người dùng chủ yếu ở Trung Quốc, hãy mua server nước ngoài (Aliyun, Tencent Cloud), tốc độ truy cập nhanh. Nếu người dùng chủ yếu ở nước ngoài, hãy mua server nước ngoài (AWS, Google Cloud, DigitalOcean), hoặc mua server Hong Kong. Tốc độ nhanh và không cần phải thực hiện một số thủ tục hành chính.

### 3.3 Nước ngoài hay nước trong?

Đây là một câu hỏi rất quan trọng. Nhiều người lúc đầu không suy nghĩ rõ. Sau này sẽ gặp rắc rối.

**Mua server nước trong** có ưu điểm là tốc độ nhanh, độ trễ thấp. Nhưng nhược điểm là cần phải thực hiện quy trình cấp phép (gửi thông tin website cho các bộ phận chính phủ để xem xét). Thường phải đợi từ một tuần đến một tháng. Hơn nữa, giá server nước trong tương đối đắt hơn.

**Mua server nước ngoài** có ưu điểm là không cần cấp phép. Mua rồi có thể dùng ngay. Giá có thể rẻ hơn. Nhưng nhược điểm là người dùng ở khu vực Đại lục Trung Quốc truy cập có thể chậm hơn. Nếu là kho dữ liệu Hong Kong hoặc Singapore sẽ tốt hơn nhiều.

Lời khuyên là: nếu là dự án cá nhân, website để học tập trưng bày, hãy mua server Hong Kong hoặc nước ngoài. Tránh rắc rối cấp phép. Nếu làm dự án thương mại chính thức, cần hoạt động lâu dài, hãy mua server nước trong. Hãy thực hiện quy trình cấp phép một cách cẩn thận, sau này sẽ tiết kiệm rất nhiều rắc rối.

### 3.4 So sánh các nhà cung cấp đám mây chính

| Nhà cung cấp | Phù hợp với ai | Đặc điểm | Giá mới người dùng |
|------|---------|------|-----------|
| Aliyun | Kinh doanh nước trong | Thị phần hàng đầu, hệ sinh thái hoàn thiện | Năm đầu vài chục đến hơn một trăm |
| Tencent Cloud | Applet nhỏ, game | Hỗ trợ phát triển cloud applet tốt | Giảm giá mạnh cho người dùng mới |
| Huawei Cloud | Doanh nghiệp | Lựa chọn hàng đầu cho dự án chính phủ, chính trị | Giá tương đối cao |
| DigitalOcean | Lập trình viên | Đơn giản, dễ dùng, giá cả minh bạch | Từ $4/tháng |
| Vercel | Dự án frontend | Không cần cấu hình, đẩy code là triển khai | Hạn mức miễn phí đủ dùng |

Lời khuyên cho người mới nhất là **Aliyun** hoặc **Tencent Cloud** chương trình sinh viên/người dùng mới. Thường chỉ cần vài chục đô la trong một năm. Tỷ lệ giá trị rất cao. Nếu làm dự án purely frontend, muốn tiện, cũng có thể dùng **Vercel** hoặc **Netlify**. Thậm chí không cần mua server. Chỉ cần đẩy code lên là tự động triển khai.

### 3.5 Sau khi lấy được server phải làm gì?

Sau khi mua server, sẽ nhận được một email. Bên trong chứa một vài thông tin quan trọng:

- **Địa chỉ IP**: Một chuỗi số giống như `123.45.67.89`. Đây là số nhà của server trên internet.
- **Tên đăng nhập**: Thường là `root` (tài khoản quản trị viên).
- **Mật khẩu đăng nhập**: Mật khẩu ban đầu, hoặc là liên kết để bạn đặt mật khẩu.

Có thông tin này, có thể dùng **SSH (Secure Shell)** để đăng nhập từ xa vào server. Thực hiện các cấu hình khác nhau. SSH giống như một lệnh điều khiển từ xa được mã hóa được gửi cho server. Cho phép máy tính của bạn kiểm soát server ở xa.

Lệnh đăng nhập như sau:

```bash
ssh root@123.45.67.89
# Sau khi nhấn Enter, sẽ được yêu cầu nhập mật khẩu. Nhập mật khẩu chính xác sẽ đăng nhập thành công.
```

Đăng nhập thành công, sẽ vào giao diện dòng lệnh của server. Giống như bạn mở một cửa sổ terminal trên máy tính cá nhân của bạn. Có thể cài đặt phần mềm, tạo thư mục, sửa đổi cấu hình. Mọi thao tác đều giống như máy tính cá nhân.

---

## 4. Triển khai: Chuyển code vào "nhà"

### 4.1 Triển khai là gì?

Triển khai là sau khi thuê server (nhà), di chuyển code (hành lý, đồ đạc) vào. Sau đó mở cửa bắt đầu kinh doanh.

Cụ thể, triển khai bao gồm các bước sau:

1. **Tải code lên server**: Chuyển sản phẩm xây dựng từ máy tính cá nhân lên server.
2. **Cài đặt phụ thuộc**: Server có thể không có các gói mà dự án cần. Cần cài đặt.
3. **Cấu hình biến môi trường**: Ví dụ như mật khẩu database, API key, v.v. Thông tin nhạy cảm.
4. **Khởi động dịch vụ**: Để chương trình ứng dụng chạy. Bắt đầu lắng nghe yêu cầu của người dùng.

Bốn bước này nghe có vẻ phức tạp. Nhưng thực tế làm không khó. Dưới đây sẽ giải thích chi tiết cách làm từng bước.

<DeploymentServerDemo />

### 4.2 Cách tải code lên server?

**Phương pháp một: Tải lên FTP/SFTP**

Đây là cách trực quan nhất. Giống như dùng trang web chia sẻ tệp vậy. Kéo thả file lên server. Có thể tải về một phần mềm miễn phí tên là **FileZilla** trên máy tính của bạn. Điền IP, tên đăng nhập, mật khẩu của server. Rồi có thể quản lý file trên server giống như quản lý file cục bộ.

**Phương pháp hai: Lấy từ Git**

Đây là cách được khuyến khích hơn. Trước tiên, tạo một kho lưu trữ code trên GitHub, GitLab hoặc Gitee. Đẩy code lên đám mây. Sau đó, trên server, dùng lệnh `git clone` để kéo code xuống.

Ưu điểm là: cập nhật code sau này chỉ cần chạy lệnh `git pull` trên server. Không cần tải lên thủ công mỗi lần. Hơn nữa, code lưu trên đám mây cũng an toàn. Ngay cả khi server được cài đặt lại cũng không sợ.

**Phương pháp ba: Triển khai tự động CI/CD**

Đây là cách chuyên nghiệp nhất. Cũng được khuyến khích nhiều nhất. Bằng cách cấu hình CI/CD (tích hợp liên tục/triển khai liên tục), chỉ cần đẩy code lên GitHub. Hệ thống CI/CD sẽ tự động giúp bạn hoàn thành: lấy code → cài đặt phụ thuộc → xây dựng → triển khai trong toàn bộ quy trình. Thậm chí không cần đăng nhập server. Mọi thứ được hoàn thành tự động.

### 4.3 Các bước cụ thể triển khai

Giả sử dùng cách đơn giản nhất — triển khai thủ công bằng Git. Từng bước hướng dẫn quy trình:

**Bước một: Kết nối với server**

```bash
ssh root@123.45.67.89
```

**Bước hai: Cài đặt phần mềm cần thiết**

Nếu là dự án Node.js, cần cài đặt Node.js trước:

```bash
# Ví dụ hệ điều hành Ubuntu
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

**Bước ba: Lấy code**

```bash
# Tạo thư mục để lưu website
mkdir -p /var/www/my-website
cd /var/www/my-website

# Clone kho lưu trữ code (cần tạo kho lưu trữ trên GitHub trước)
git clone https://github.com/tên-người-dùng-của-bạn/tên-kho-của-bạn.git .
```

**Bước bốn: Cài đặt phụ thuộc và xây dựng**

```bash
# Cài đặt phụ thuộc dự án
npm install

# Xây dựng dự án (tạo thư mục dist)
npm run build
```

**Bước năm: Dùng PM2 để khởi động dịch vụ**

Tại sao dùng PM2? Nó là một công cụ quản lý tiến trình. Có thể để website chạy liên tục ở nền tảng. Ngay cả khi server khởi động lại cũng có thể tự động khởi động.

```bash
# Cài đặt PM2 toàn cầu
sudo npm install -g pm2

# Khởi động website (giả sử file vào là index.js)
pm2 start index.js

# Thiết lập tự động khởi động lúc khởi động
pm2 startup
pm2 save
```

**Bước sáu: Cấu hình Nginx proxy ngược**

Ứng dụng Node.js thường chạy trên cổng 3000 hoặc 8080. Nhưng người dùng truy cập cổng 80 (cổng mặc định HTTP). Cần dùng Nginx để chuyển hướng yêu cầu từ cổng 80 sang cổng ứng dụng.

```bash
# Cài đặt Nginx
sudo apt install -y nginx

# Tạo tệp cấu hình Nginx
sudo nano /etc/nginx/sites-available/my-website
```

Trong trình chỉnh sửa đã mở, viết cấu hình sau:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    # File tĩnh (sản phẩm xây dựng) trả lời trực tiếp
    location / {
        root /var/www/my-website/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Chuyển hướng yêu cầu API tới backend Node.js
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Lưu và thoát, rồi kích hoạt cấu hình:

```bash
# Kích hoạt cấu hình
sudo ln -s /etc/nginx/sites-available/my-website /etc/nginx/sites-enabled/

# Kiểm tra xem cấu hình có lỗi không
sudo nginx -t

# Khởi động lại Nginx
sudo systemctl restart nginx
```

Bây giờ truy cập `http://example.com` (hãy nhớ giải quyết tên miền này đến IP server này trước), sẽ thấy website!

---

## 5. Tên miền và DNS: Đặt tên hay cho website

### 5.1 Tại sao phải mua tên miền?

Có IP server rồi, tại sao lại phải mua tên miền?

Hãy nghĩ về nó. Có dễ nhớ một chuỗi số `123.45.67.89` không? Dễ gõ sai không? Nhưng nhớ một tên như `baidu.com`, `taobao.com` không phải là dễ dàng sao? 

Tên miền là tên của website. Dễ nhớ, chuyên nghiệp. Còn có thể thể hiện hình ảnh thương hiệu. Hãy tưởng tượng một chút. Bảo mọi người "truy cập website tôi làm, IP là 123.45.67.89", và "truy cập woshishuaige.com", cái nào trông chuyên nghiệp hơn?

<DeploymentDnsDemo />

### 5.2 DNS là gì?

Tốt. Bây giờ mua một tên miền. Ví dụ gọi là `my-awesome-website.com`. Nhưng vấn đề là: máy tính chỉ hiểu địa chỉ IP. Không hiểu "my-awesome-website.com" kiểu ngôn ngữ của con người.

Đây là lúc DNS xuất hiện. Tên đầy đủ của DNS là "Domain Name System". Dịch lại là "hệ thống tên miền". Có thể coi nó là một cuốn "danh bạ" khổng lồ. Chuyên trách đổi tên miền con người dễ nhớ thành địa chỉ IP mà máy tính hiểu.

Khi gõ `my-awesome-website.com` vào trình duyệt và nhấn Enter. Những điều này xảy ra phía sau:

1. Trình duyệt hỏi DNS: "Hey, địa chỉ IP của my-awesome-website.com là gì?"
2. DNS tra cứu "danh bạ", báo cho trình duyệt: "Địa chỉ IP của nó là 123.45.67.89"
3. Trình duyệt dựa vào IP này tìm server, gửi yêu cầu

Cả quá trình thường chỉ mất vài chục mili giây. Người dùng hoàn toàn không nhận thấy.

### 5.3 Cách cấu hình DNS?

Cấu hình DNS thường có thể làm ở hai nơi:

**Cách một: Cấu hình ở nhà cung cấp tên miền**

Mua tên miền ở đâu thì cấu hình ở đó. Loại bản ghi phổ biến nhất là **bản ghi A**:

- **Loại bản ghi**: A
- **Tên máy chủ**: Thường điền `@` (đại diện tên miền chính, như my-awesome-website.com) hoặc `www` (đại diện www.my-awesome-website.com)
- **Giá trị bản ghi**: Địa chỉ IP server, ví dụ `123.45.67.89`

**Cách hai: Dùng dịch vụ DNS bên thứ ba**

Nhiều chuyên gia không dùng DNS của nhà bán tên miền. Thay vào đó dùng Cloudflare, Aliyun DNSPod, Tencent Cloud DNS. Những dịch vụ DNS chuyên nghiệp này thường ổn định hơn, tốc độ giải quyết nhanh hơn. Còn tự động bao gồm CDN, bảo vệ DDoS, v.v.

### 5.4 DNS mất bao lâu để có hiệu lực?

Đây là câu hỏi mà nhiều người quan tâm. Câu trả lời là: **không chắc chắn. Thường vài phút đến 24 giờ**.

Sau khi chỉnh sửa DNS, tất cả các server DNS trên toàn cầu cần đồng bộ hóa thay đổi này. Giống như ném một hòn đá vào biển. Sóng mất thời gian để lan đến xa. Một số server DNS cập nhật nhanh, vài phút sẽ có hiệu lực. Một số chậm hơn, có thể cần chờ lâu.

Có thể dùng lệnh sau để kiểm tra xem DNS có hiệu lực chưa:

```bash
# Windows
ping tên-miền-của-bạn

# Mac/Linux
ping tên-miền-của-bạn
```

Nếu ping được, hiển thị IP của server. Điều đó có nghĩa DNS đã có hiệu lực.

---

## 6. HTTPS: Lắp một chiếc "khóa" cho website

### 6.1 Sự khác biệt giữa HTTP và HTTPS

Có thể đã để ý. Một số website bắt đầu bằng `http://`. Một số bắt đầu bằng `https://`. Cái "s" này rất quan trọng. Nó đại diện cho "bảo mật" (Secure).

**HTTP (HyperText Transfer Protocol)** là giao thức để truyền tải trang web. Có thể coi nó như một chiếc xe tải vận chuyển dữ liệu. Nhưng chiếc xe tải này là **trong suốt**. Mọi người bên trong đều có thể nhìn thấy. Trên trang web HTTP, khi gõ mật khẩu, điền thông tin cá nhân. Trong quá trình truyền tải có thể bị bất kỳ ai can thiệp trộm nhìn.

**HTTPS (HTTP Secure)** là cho chiếc xe tải này một **thùng chứa được niêm phong**. Còn có một chìa khóa. Chỉ có người gửi và người nhận mới có chìa khóa. Người ở giữa ngay cả khi chặn lại cũng không hiểu bên trong là gì. Đó là truyền tải được mã hóa.

<DeploymentHttpsDemo />

### 6.2 Tại sao phải HTTPS?

Lý do thứ nhất: **Bảo mật**. Không có HTTPS, mật khẩu người dùng nhập trên website là rõ ràng. Bất kỳ người nào có kỹ năng một chút cũng có thể chặn lại. Ai dám dùng website không có HTTPS?

Lý do thứ hai: **Cảnh báo trình duyệt**. Bây giờ các trình duyệt chính như Chrome, Edge sẽ hiển thị cảnh báo "không an toàn" cho website không có HTTPS. Người dùng thấy biểu tượng cảnh báo. Chạy ngay. Nói gì đó về đăng ký, sạc tiền cũng không được.

Lý do thứ ba: **SEO**. Google, Baidu, v.v. các công cụ tìm kiếm sẽ ưu tiên lập chỉ mục website HTTPS. Hiệu quả SEO sẽ tốt hơn.

### 6.3 Cách lấy chứng chỉ HTTPS?

Trước đây, chứng chỉ HTTPS rất đắt. Mỗi năm phải chi vài trăm thậm chí vài nghìn đô la. Bây giờ tốt rồi. Có một tổ chức gọi là **Let's Encrypt**. Cung cấp chứng chỉ SSL/TLS hoàn toàn miễn phí. Hơn nữa, cộng đồng có rất nhiều công cụ tự động giúp bạn cài đặt và gia hạn.

**Cách một: Dùng Certbot (Được khuyến khích)**

Certbot là một công cụ tự động xin cấp và cấu hình chứng chỉ Let's Encrypt. Rất đơn giản:

```bash
# Cài đặt Certbot
sudo apt install -y certbot python3-certbot-nginx

# Một lần nhấn nút để xin chứng chỉ và cấu hình Nginx
sudo certbot --nginx -d example.com -d www.example.com
```

Trong quá trình chạy sẽ hỏi vài câu hỏi. Ví dụ email (để nhắc nhở khi chứng chỉ sắp hết hạn). Trả lời xong, chứng chỉ sẽ tự động cấu hình. Truy cập website sẽ thấy thanh địa chỉ có thêm một chiếc khóa nhỏ 🔒.

Chứng chỉ có hiệu lực 90 ngày. Nhưng Certbot sẽ giúp bạn thiết lập một tác vụ định kỳ tự động gia hạn. Cơ bản không cần lo.

**Cách hai: Dùng Cloudflare**

Nếu đã dùng dịch vụ DNS của Cloudflare. Thì chứng chỉ HTTPS hoàn toàn không cần tự cấu hình. Cloudflare sẽ tự động cung cấp hỗ trợ HTTPS cho tên miền. Thậm chí vấn đề gia hạn 90 ngày cũng được giải quyết.

### 6.4 Sau khi cấu hình HTTPS, điều gì đã thay đổi?

Sau khi cấu hình HTTPS, người dùng truy cập từ `http://example.com` thành `https://example.com`. Thay đổi này mang lại một loạt bảo vệ bảo mật:

1. **Truyền tải được mã hóa**: Tất cả giao tiếp giữa người dùng và server đều được mã hóa.
2. **Xác minh danh tính**: Chứng chỉ có thể chứng minh "tôi thực sự là website này". Ngăn chặn website giả mạo.
3. **Toàn vẹn dữ liệu**: Có thể phát hiện xem dữ liệu có bị chỉnh sửa không.

---

## 7. CI/CD: Để robot giúp bạn làm việc

### 7.1 CI/CD là gì?

CI/CD là chữ viết tắt của hai từ: **C**ontinuous **I**ntegration (Tích hợp liên tục) và **C**ontinuous **D**eployment (Triển khai liên tục). Có thể hiểu là một hệ thống robot tự động làm việc cho bạn.

Trước khi có CI/CD. Mỗi khi phát hành tính năng mới. Quy trình như thế này:

1. Mở máy tính, đăng nhập GitHub
2. Kéo code mới nhất
3. Chạy test, xem có lỗi không
4. Xây dựng dự án thủ công
5. Đăng nhập server
6. Kéo code mới nhất
7. Cài đặt phụ thuộc
8. Xây dựng dự án
9. Khởi động lại dịch vụ

9 bước này. Mỗi lần phát hành phải làm thủ công một lần. Phiền quá. Hơn nữa, rất dễ bỏ qua một bước. Ví dụ quên chạy test, quên khởi động lại dịch vụ, v.v.

Sau khi có CI/CD. Quy trình thành:

1. Đẩy code lên GitHub
2. Uống trà ngồi chờ
3. (Robot tự động hoàn thành 9 bước trên)
4. Website tự động cập nhật

<DeploymentCicdDemo />

Đó là sức hấp dẫn của CI/CD: **Chỉ cần đẩy code lên. Phần còn lại hoàn toàn tự động**.

### 7.2 Quy trình làm việc CI/CD

Một quy trình CI/CD điển hình như thế này:

**Bước một: Đẩy code (Push)**

Hoàn thành phát triển tính năng mới. Đẩy code lên GitHub.

**Bước hai: CI (Tích hợp liên tục) được kích hoạt**

GitHub phát hiện thay đổi code. Thông báo cho hệ thống CI (GitHub Actions, GitLab CI, v.v.) bắt đầu làm việc.

**Bước ba: Cài đặt phụ thuộc và test**

Hệ thống CI khởi động một máy tính ảo. Trên đó:
- Cài đặt các phụ thuộc mà dự án cần
- Chạy code test, bảo đảm không có lỗi
- Xây dựng dự án, tạo sản phẩm

Nếu test thất bại. CI sẽ gửi email thông báo. Lần triển khai này sẽ dừng. Sẽ không đẩy code có vấn đề lên môi trường sản xuất.

**Bước bốn: CD (Triển khai liên tục) được thực thi**

Tất cả test thành công. Hệ thống CI sẽ:
- Kết nối với server qua SSH
- Kéo code mới nhất
- Cài đặt phụ thuộc
- Xây dựng dự án
- Khởi động lại dịch vụ

Toàn bộ quá trình có thể chỉ mất vài phút. Hoàn toàn tự động.

### 7.3 Cách cấu hình GitHub Actions?

GitHub Actions là tính năng CI/CD được tích hợp sẵn của GitHub. Không cần trả thêm phí (hạn mức miễn phí đủ cho dự án cá nhân). Cấu hình cũng rất đơn giản.

Tạo tệp `.github/workflows/deploy.yml` trong thư mục gốc dự án. Viết cấu hình sau:

```yaml
name: Deploy to Production

# Điều kiện kích hoạt: Mỗi khi main branch có code được đẩy lên
on:
  push:
    branches: [main]

# Danh sách các công việc
jobs:
  # Công việc triển khai
  deploy:
    # Chạy trên hệ điều hành nào
    runs-on: ubuntu-latest
    
    # Các bước cụ thể
    steps:
      # 1. Lấy code
      - name: Checkout code
        uses: actions/checkout@v3

      # 2. Cài đặt môi trường Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      # 3. Cài đặt phụ thuộc và xây dựng
      - name: Install and Build
        run: |
          npm ci
          npm run build

      # 4. Triển khai tới server
      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/my-website
            git pull origin main
            npm install
            npm run build
            pm2 restart all
```

Tệp cấu hình này báo cho GitHub Actions:

- Khi main branch có code mới được đẩy lên thì kích hoạt
- Chạy trên một máy tính Ubuntu
- Trước tiên cài đặt Node.js 18
- Rồi cài đặt phụ thuộc và xây dựng dự án
- Cuối cùng kết nối với server qua SSH, thực thi một loạt lệnh triển khai

Sau khi cấu hình xong. Mỗi lần `git push origin main`. GitHub sẽ tự động bắt đầu triển khai. Rất tiện.

---

## 8. Giám sát và nhật ký: Làm "bảo vệ đêm" cho website

### 8.1 Tại sao phải giám sát?

Sau khi website lên sóng. Lý thuyết là nó phải chạy không ngừng 7×24 giờ. Nhưng thế giới thực không có điều đó. Server có thể sẽ bị lỗi. Mạng có thể sẽ gặp trục trặc. Code có thể sẽ có bug. Trong môi trường sản xuất thực tế. Mọi tình huống ngoài dự tính đều có thể xảy ra.

Nếu không giám sát. Chỉ có thể chờ người dùng gọi điện báo "website không vào được". Lúc đó thường đã quá muộn. Người dùng có thể đã bỏ đi rồi.

Nếu có giám sát. Có thể:

- **Phát hiện vấn đề sớm**: CPU 90% rồi. Nhanh chóng bổ sung server.
- **Định vị vấn đề nhanh**: Website chậm. Xem giám sát để tìm ra chỗ tắc.
- **Yên tâm**: Mỗi ngày bao nhiêu lượt truy cập, thời gian cao điểm khi nào.

<DeploymentMonitorDemo />

### 8.2 Giám sát những chỉ số nào?

Những chỉ số giám sát quan trọng nhất chỉ có một vài cái:

| Chỉ số | Phạm vi bình thường | Vượt quá phải làm sao |
|------|---------|-----------|
| Sử dụng CPU | < 70% | Nâng cấp cấu hình server hoặc tối ưu code |
| Sử dụng bộ nhớ | < 80% | Kiểm tra có rò rỉ bộ nhớ không |
| Sử dụng ổ cứng | < 80% | Xóa log hoặc file không cần thiết |
| Khả dụng website | 100% | Kiểm tra dịch vụ có chạy bình thường không |
| Thời gian phản hồi | < 2 giây | Tối ưu truy vấn database hoặc thêm cache |
| Tỷ lệ lỗi | < 1% | Xem log lỗi để định vị vấn đề |

### 8.3 Cách cấu hình giám sát?

**Phương án đơn giản nhất: Uptime Robot**

Đăng ký uptimerobot.com. Thêm URL website. Nó sẽ tự động kiểm tra website mỗi 5 phút. Nếu website sập sẽ gửi email thông báo. Phiên bản miễn phí có thể giám sát 50 website. Đối với dự án cá nhân hoàn toàn đủ dùng.

**Phương án nâng cao: Giám sát Aliyun/Tencent Cloud**

Nếu server mua từ Aliyun hoặc Tencent Cloud. Nó đã tích hợp sẵn tính năng giám sát. Chỉ cần cấu hình ngưỡng cảnh báo là được.

**Phương án chuyên nghiệp: Prometheus + Grafana**

Hai cái này là "dao quân đa năng" trong lĩnh vực giám sát. Tính năng cực kỳ mạnh mẽ. Có thể giám sát bất kỳ chỉ số nào. Còn có thể tạo biểu đồ trực quan rất đẹp. Tuy nhiên cấu hình hơi phức tạp. Thích hợp cho những lập trình viên có kinh nghiệm.

### 8.4 Nhật ký: Khi có vấn đề, làm cách nào để tìm?

Giám sát báo "website có vấn đề". Nhưng cụ thể vấn đề gì, tại sao xảy ra. Cần dựa vào **nhật ký** để định vị.

Nhật ký giống như "nhật kỳ" của chương trình. Ghi lại chi tiết từng bước khi chương trình chạy:

- Lúc nào người dùng nào truy cập trang nào
- Query database mất bao lâu
- Có lỗi không, thông báo lỗi là gì

**Cách dùng nhật ký cơ bản nhất**

Xem nhật ký ứng dụng trên server:

```bash
# Xem nhật ký PM2
pm2 logs

# Xem nhật ký truy cập Nginx
tail -f /var/log/nginx/access.log

# Xem nhật ký lỗi Nginx
tail -f /var/log/nginx/error.log
```

**Phương án nhật ký nâng cao**

Nếu dự án phức tạp. Nên dùng công cụ thu thập nhật ký chuyên nghiệp:

- **Loki**: Miễn phí mã nguồn mở. Cùng gia đình với Prometheus.
- **ELK (Elasticsearch + Logstash + Kibana)**: Tính năng mạnh mẽ. Nhưng cấu hình phức tạp.
- **Sentry**: Công cụ chuyên để thu thập lỗi ứng dụng. Tự động thu thập thông tin lỗi.

### 8.5 Cảnh báo: Khi có vấn đề, làm sao biết ngay lập tức?

Giám sát báo có vấn đề. Nhưng nếu không luôn nhìn vào bảng điều khiển giám sát, làm sao biết? Đó là lúc cần **cảnh báo**.

Cảnh báo là khi hệ thống giám sát phát hiện bất thường, tự động gửi thông báo cho bạn qua SMS, WeChat, DingTalk, email, v.v. Có thể thiết lập các mức cảnh báo khác nhau:

- **Khẩn cấp (website sập hoàn toàn)**: Gửi SMS + gọi điện. Phải biết ngay lập tức.
- **Nghiêm trọng (tỷ lệ lỗi cao)**: Gửi tin DingTalk/WeChat. Thấy là xử lý.
- **Thông thường (CPU cao)**: Gửi email tổng hợp. Một ngày xem một lần là được.

Nguyên tắc cảnh báo cơ bản là: **Phân cấp cảnh báo, đừng làm bạn khó chịu**. Nếu cảnh báo mọi chuyện nhỏ xíu, thời gian không lâu bạn sẽ tắt cảnh báo đi.

---

## 9. Bảng tra cứu nhanh các vấn đề phổ biến

| Hiện tượng vấn đề | Nguyên nhân có thể | Cách khắc phục |
|---------|---------|---------|
| Website không vào được | Tên miền không giải quyết / Server sập / Nginx không chạy | `ping tên-miền` xem có kết nối không; `pm2 list` xem trạng thái dịch vụ; `systemctl status nginx` xem Nginx |
| Mở ra là trang trắng | Đường dẫn sản phẩm xây dựng không đúng / File tĩnh không cấu hình đúng | Kiểm tra đường dẫn root của Nginx có chỉ tới thư mục dist không |
| Trang 404 không tìm thấy | Route không cấu hình đúng / Đường dẫn gõ sai | Thêm `try_files $uri $uri/ /index.html` vào cấu hình Nginx |
| 502 Bad Gateway | Dịch vụ backend sập / Port không mở | `pm2 list` xem process có chạy không; Kiểm tra port có đúng không |
| 403 Forbidden | Quyền truy cập không đúng / Thư mục chỉ mục không bật | Kiểm tra quyền file `chmod -R 755`; Cấu hình Nginx thêm `autoindex on` |
| Chứng chỉ HTTPS hết hạn | Chứng chỉ hết hạn không gia hạn | `certbot renew` gia hạn thủ công; Kiểm tra tác vụ định kỳ tự động gia hạn |
| Cập nhật rồi vẫn không thấy thay đổi | Cache trình duyệt / Cache CDN | Ctrl+Shift+R làm mới mạnh mẽ; Vào bảng điều khiển CDN "làm mới cache" |
| Website mở chậm | Băng thông không đủ / Không bật cache / Chưa cấu hình CDN | Nâng cấp băng thông server; Cấu hình Redis cache; Kết nối CDN |
| Database kết nối không được | Database không chạy / Mật khẩu sai / Vấn đề quyền truy cập | Kiểm tra trạng thái dịch vụ database; Xác nhận thông tin kết nối trong cấu hình |

---

## Tóm tắt

Triển khai dịch vụ là một công trình hệ thống lớn. Liên quan tới xây dựng code, triển khai server, cấu hình mạng, bảo vệ bảo mật, giám sát cảnh báo, phân tích nhật ký, rất nhiều khía cạnh. Đối với người mới bắt đầu. Không cần phải hoàn hảo từ đầu. Hãy đưa phiên bản tối thiểu có thể dùng (MVP) lên trước. Sau đó dần dần hoàn thiện trên cơ sở đó.

Có thể tóm tắt những điểm chính của cả quy trình như sau:

### Quy trình cốt lõi

1. **Xây dựng** → Dùng `npm run build` để biến code thành HTML/CSS/JS mà trình duyệt hiểu
2. **Triển khai** → Tải sản phẩm xây dựng lên server. Dùng Nginx cấu hình proxy ngược.
3. **Tên miền** → Mua tên miền và cấu hình DNS giải quyết tới IP server
4. **HTTPS** → Dùng Let's Encrypt xin chứng chỉ miễn phí. Bảo vệ truyền tải dữ liệu.
5. **CI/CD** → Cấu hình triển khai tự động. Sau khi code được đẩy lên sẽ tự động triển khai.
6. **Giám sát** → Cấu hình giám sát và cảnh báo. Khi có vấn đề sẽ biết ngay.

### Lời khuyên học tập

- **Ngày 1**: Dùng Vercel/Netlify triển khai một trang web tĩnh. Trải nghiệm cảm giác "code thành website".
- **Tuần 1**: Thuê một server đám mây. Triển khai thủ công một dự án Node.js. Cấu hình tên miền và HTTPS.
- **Tuần 2-4**: Cấu hình quy trình CI/CD hoàn chỉnh. Xây dựng hệ thống giám sát và cảnh báo.
- **Học tập liên tục**: Học Docker container hóa, Kubernetes cụm, kiến trúc microservices.

---

## Bảng tra cứu nhanh các thuật ngữ

| Thuật ngữ | Tiếng Anh | Giải thích bằng ngôn ngữ dân thường |
|------|------|-----------|
| Xây dựng | Build | Dịch code nguồn và đóng gói thành định dạng mà trình duyệt có thể thực thi |
| Triển khai | Deploy | Đặt code trên server để người dùng có thể truy cập |
| Server | Server | Máy tính 7×24 không tắt, kết nối mạng |
| Tên miền | Domain | Tên dễ nhớ của website (như baidu.com) |
| DNS | Domain Name System | "Danh bạ điện thoại" chuyển tên miền thành địa chỉ IP |
| HTTP | HyperText Transfer Protocol | Giao thức truyền tải trang web (không an toàn, truyền văn bản rõ) |
| HTTPS | HTTP Secure | Giao thức truyền tải trang web được mã hóa (an toàn) |
| Nginx | Engine X | Web server hiệu suất cao. Dùng để làm proxy ngược. |
| Proxy ngược | Reverse Proxy | Nhân viên phục vụ đứng ở cửa. Chuyển tiếp yêu cầu tới backend. |
| SSH | Secure Shell | Công cụ mã hóa để đăng nhập từ xa vào server |
| CDN | Content Delivery Network | Mạng máy chủ phân tán trên toàn cầu. Tăng tốc độ truy cập. |
| CI/CD | Continuous Integration/Deployment | Đường ống tự động hóa. Code được đẩy lên sẽ tự động test và triển khai. |
| SSL/TLS | Secure Sockets Layer / Transport Layer Security | Giao thức mã hóa. Cung cấp bảo mật cho HTTPS. |
| PM2 | Process Manager 2 | Trình quản lý tiến trình Node.js. Để ứng dụng chạy liên tục. |
