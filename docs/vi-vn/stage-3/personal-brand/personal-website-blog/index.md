địa riêng" của bạn trên internet.

Khác với WeChat Moments, Zhihu hay LinkedIn, nó không phụ thuộc vào thuật toán gợi ý của bất kỳ nền tảng mạng xã hội nào, và cũng không biến mất khi nền tảng đó sụp đổ. Đây là một **không gian giới thiệu cá nhân** ổn định lâu dài, có thể được Google/Google Scholar lập chỉ mục. Nó thường bao gồm tiểu sử (Bio), các bài báo đã xuất bản (Publications), các dự án tham gia (Projects) và blog kỹ thuật (Blog).

![](images/image1.png)

## 1.2 Tại Sao Nên Xây Dựng Trang Web Riêng

Trong mô hình phát triển Vibe Coding, chúng ta không còn cần phải đọc những cuốn sách HTML/CSS dày cộp như mười năm trước nữa. Nhờ AI, chúng ta đã chuyển đổi vai trò xây dựng website từ "lập trình viên vất vả" thành "tổng biên tập website":

1. **Bạn (Tổng biên tập / PM)**: Chịu trách nhiệm quyết định "phong cách" và nội dung của website. Ví dụ: "Chỗ này cần đặt bản trình bày về kế hoạch di dân lên sao Hỏa của Musk", "Đổi nút này thành màu đỏ Tesla".
2. **Trae (AI Engineer)**: Chịu trách nhiệm làm những việc vất vả. Nó chuyển đổi các lệnh ngôn ngữ tự nhiên của bạn thành code phức tạp, xử lý bố cục, màu sắc và hiển thị trên thiết bị di động.
3. **GitHub Pages (Sân khấu)**: Cung cấp server và tên miền miễn phí, để cả thế giới có thể thấy tác phẩm của bạn.

**Tại sao giới học thuật (hoặc dân kỹ thuật) nên có nó?**

* **Hướng ngoại (Xây dựng ảnh hưởng)**: Đây là **"tấm danh thiếp không bao giờ hết hạn"** của bạn. Khi xin học tiến sĩ, tìm việc hay tìm kiếm cộng tác, một trang web được tổ chức gọn gàng sẽ thuyết phục hơn nhiều so với một file PDF CV.
* **Hướng nội (Tích lũy kiến thức)**: Đây là **"bộ não thứ hai"** của bạn. Bạn có thể dùng nó để ghi chép bài học, suy nghĩ kỹ thuật, xây dựng hệ thống kiến thức của riêng mình.
* **Hướng tương lai (Được nhìn thấy)**: Công cụ tìm kiếm ưa thích nội dung có cấu trúc. Có trang web riêng nghĩa là khi người khác tìm kiếm tên bạn, **nội dung bạn định nghĩa** sẽ xuất hiện đầu tiên, chứ không phải người trùng tên.

## 1.3 Bốn Cách Điển Hình Để Xây Dựng Trang Web Cá Nhân

Trong thực tế có vô số cách để xây dựng website, chúng ta chỉ giới thiệu bốn cách phổ biến nhất:

**Cách 1: Viết tay từ đầu (HTML/CSS/JS)** Đây là con đường truyền thống của ngành Khoa học Máy tính. Bạn phải gõ code từng ký tự một. Ưu điểm là cực kỳ linh hoạt, muốn làm gì cũng được; nhược điểm là ngưỡng vào rất cao, dễ "sụp đổ" khi chỉnh CSS, không phù hợp với những người tập trung vào nội dung như chúng ta.

![](images/image2.png)

**Cách 2: Xây dựng website bằng giao diện kéo thả (Wix/WordPress)** Giống như "xếp Lego". Ưu điểm là kéo thả đơn giản; nhược điểm là thường phải trả phí, code sinh ra cồng kềnh, thiếu "cảm giác geek học thuật", khó tùy chỉnh sâu.

![](images/image3.png)

**Cách 3: Dựa trên template GitHub (Static Site Generator)** Đây là con đường chủ lưu được **khuyến nghị nhất** trong giới học thuật và geek. Chúng ta trực tiếp Fork template có sẵn của người khác (như Jekyll hoặc Hugo framework), rồi chỉ cần chỉnh sửa file cấu hình và nội dung.

![](images/image4.png)

**Cách 4: Vibe Coding (Luồng tạo hình ảnh bằng AI)** Dựa vào AI Agent với khả năng hiểu hình ảnh đa phương thức mạnh mẽ, bạn chỉ cần thấy một phong cách trang web mình thích trên mạng, chụp màn hình rồi gửi cho AI: "Hãy viết cho tôi một trang web theo hình này". AI có thể ngay lập tức phân tích các yếu tố hình ảnh trong ảnh và tạo ra code tương ứng.

![](images/image5.png)

**Lựa chọn của hướng dẫn này: GitHub Pages + template học thuật + AI chỉnh sửa.** Lý do rất đơn giản:

* **Miễn phí hoàn toàn**: Không cần mua server, không cần mua tên miền.
* **Chuyên nghiệp**: Template thường được thiết kế bởi các lập trình viên hàng đầu, tối giản, chuyên nghiệp, tốc độ tải nhanh.
* **Dễ bảo trì**: Bạn chỉ cần viết Markdown (giống như viết tài liệu trên Notion), AI sẽ tự động tạo trang web cho bạn.

## 1.4 Lộ Trình Hoàn Chỉnh Của Hướng Dẫn Này

Để quá trình cấu hình nhàm chán trở nên trực quan, hướng dẫn này sẽ triển khai thực hành thông qua một **case thú vị — "Làm trang học thuật cho Musk"**.

Elon Musk không phải giáo sư đại học truyền thống, nhưng ông cũng có nhiều "sách trắng kỹ thuật" (như Hyperloop Alpha) và các dự án nổi tiếng (như SpaceX/Tesla) được công khai. Chúng ta sẽ lấy những tài liệu này làm dữ liệu thử nghiệm, kết hợp với chế độ Vibe Coding của Trae, để dẫn bạn qua một quy trình xây dựng website có thể tái sử dụng:

1. **Tìm khung xương**: Tìm template chất lượng cao trên GitHub và "Fork" (sao chép) vào repository của mình.
2. **Chuẩn bị môi trường**: Kéo code về máy cục bộ và cấu hình Trae, đảm bảo AI có thể đọc dự án của bạn.
3. **AI lặp chỉnh sửa**: Thông qua đối thoại với AI, thay thế "người mẫu" trong template bằng "Elon Musk", tải lên CV của ông, đổi "danh sách luận văn" thành "trưng bày sách trắng kỹ thuật", thậm chí nhờ AI đổi màu sắc website thành "đỏ sao Hỏa".
4. **Triển khai lên mạng**: Đẩy code đã chỉnh sửa lên GitHub, ngay lập tức có một URL có thể truy cập.

Phần này chỉ phụ trách vẽ bức tranh toàn cảnh. Bây giờ chỉ cần nhớ chuỗi chính này: **Fork template → AI trang trí → Đẩy lên mạng**. Các chương tiếp theo sẽ hướng dẫn bạn từng bước một.

# 2 Chuẩn Bị Môi Trường

## 2.1 Các Công Cụ Cần Dùng Trong Hướng Dẫn Này

Toàn bộ quá trình xây dựng cần kết hợp sử dụng bốn công cụ (hay tài nguyên), chúng đảm nhận lần lượt vai trò "thiết kế thi công", "đất đai miễn phí" và "vận chuyển logistics".

* **Một máy tính**: Windows hoặc Mac đều được. Khác với phát triển Android đòi hỏi bộ nhớ cao, phát triển web rất nhẹ nhàng, laptop văn phòng thông thường cũng chạy mượt mà.
* **Trae**: Đây là **AI coding partner** của bạn (năng suất cốt lõi). Trong chế độ Vibe Coding, bạn không cần thành thạo HTML hay CSS, mà chủ yếu dùng ngôn ngữ tự nhiên trong Trae để ra lệnh cho AI: "Đổi thanh điều hướng thành màu đen", "Đặt ảnh của Musk lên đây", để nó lo việc viết và sửa code.
* **Tài khoản GitHub**: Đây là **"server miễn phí" và "két an toàn code"** của bạn. Chúng ta cần nó để lưu trữ tất cả các file website, quan trọng nhất là tận dụng tính năng **GitHub Pages** mà nó cung cấp, chúng ta có thể miễn phí biến code thành một URL có thể truy cập toàn cầu, tiết kiệm chi phí mua server và tên miền.
* **Môi trường Git**: Đây là **"người giao hàng"** hậu trường. Dù chúng ta đã viết code trong Trae, nhưng cần Git để "đẩy" code từ máy tính lên GitHub (kho lưu trữ cloud). Bạn không cần thành thạo lệnh Git, Trae sẽ giúp chúng ta gọi nó, nhưng máy tính của bạn phải cài đặt sẵn môi trường cơ bản này.
* **Môi trường Ruby**: Đây là **"xưởng chế biến trang web"** cục bộ. Vì template học thuật ví dụ chúng ta dùng (Jekyll) được xây dựng trên ngôn ngữ lập trình Ruby, có nó chúng ta mới có thể xem trước "hiệu quả trang trí" trên máy tính của mình trước khi tải code lên mạng cho cả thế giới xem.

## 2.2 Tải Xuống Trae

**Trae** là chiến trường chính để chúng ta thực hiện Vibe Coding. Bạn có thể hiểu đơn giản nó là một **"trình soạn thảo code tích hợp siêu AI"**. Nó không lạnh lùng như các trình soạn thảo truyền thống, mà giống như một lập trình viên kỳ cựu luôn sẵn sàng, ngồi cạnh bạn giúp viết code.

* **Link tải**: Truy cập trang chủ [https://www.trae.cn](https://www.trae.cn), tải phiên bản tương ứng với hệ điều hành của bạn (Windows hoặc Mac).
* **Cài đặt**: Quá trình cài đặt rất đơn giản, giống như cài WeChat hay QQ, chỉ cần nhấp đôi vào file cài đặt và làm theo hướng dẫn "Next" là xong.

Sau khi chuẩn bị xong công cụ này, trong thực hành tiếp theo, chúng ta không cần ngồi thẫn thờ nhìn những dòng code nhàm chán nữa, mà trực tiếp mở dự án ở đây, dùng ngôn ngữ tự nhiên qua hộp thoại bên phải để chỉ huy AI giúp viết code, sửa bug, thậm chí tái cấu trúc toàn bộ trang.

![](images/image6.png)

## 2.3 Tải Xuống Git

**Git là gì?** Nếu trong Vibe Coding, Trae là "AI Engineer" viết code, thì **Git là "người giao hàng" vận chuyển code**. Bạn cần nó để đóng gói code đã viết trên máy tính cục bộ và "đẩy" an toàn lên kho lưu trữ cloud GitHub. Không có nó, website của bạn chỉ chạy được trên máy tính của bạn, người khác không thể xem được.

Trước đây bạn cần tải file cài đặt từ trang chủ, còn phải cấu hình biến môi trường, rất phức tạp. Bây giờ, chúng ta để Trae giúp chúng ta kiểm tra và cài đặt trực tiếp.

**Bước 1: Kiểm tra xem đã cài đặt chưa**

Mở Trae, trong hộp Chat (hộp thoại) ở góc dưới bên phải, nhập lệnh sau:

```markdown
Hãy giúp tôi kiểm tra xem máy tính hiện tại đã cài đặt Git chưa. Hãy chạy lệnh git --version trong terminal.
```

* **Trường hợp A (Đã cài đặt)**: Nếu bạn thấy phản hồi tương tự `git version 2.xx.x`, chúc mừng bạn, có thể bỏ qua bước tải xuống!
* **Trường hợp B (Chưa cài đặt)**: Nếu bạn thấy "command not found" hoặc một loạt thông báo lỗi màu đỏ, hãy tiếp tục đọc.

![](images/image7.png)

**Bước 2: Cài đặt với sự hỗ trợ của AI**

Đừng đóng Trae, tiếp tục nhập vào hộp thoại:

**Lệnh (Người dùng Windows)**:

```markdown
Tôi chưa cài đặt Git. Hãy giúp tôi viết lệnh sử dụng công cụ dòng lệnh winget để tự động cài đặt Git, và cho tôi biết cách chạy nó trong terminal.
```

**Lệnh (Người dùng Mac)**:

```markdown
Tôi chưa cài đặt Git. Hãy cho tôi biết cách cài đặt nhanh Git qua dòng lệnh terminal (ví dụ sử dụng git hoặc brew).
```

Trae sẽ cho bạn một đoạn code (thường là `winget install --id Git.Git`).

Bạn chỉ cần nhấp vào nút **"Run in Terminal" (Chạy trong terminal)** ở góc trên bên phải của khối code, hoặc sao chép vào terminal phía dưới và nhấn Enter, nó sẽ tự động tải xuống và cài đặt Git cho bạn.

Nếu bạn cho rằng quá trình hỗ trợ AI ở trên vẫn còn chỗ chưa hoàn thiện, bạn có thể tham khảo hướng dẫn này để tải và cài đặt thủ công [Git下载及安装保姆级教程](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

## 2.4 Tải Xuống Môi Trường Ruby

Trước khi bắt tay vào viết code, chúng ta cần mảnh ghép cuối cùng. Template trang web học thuật dùng trong hướng dẫn này (dựa trên Jekyll framework) được xây dựng bằng ngôn ngữ lập trình Ruby.

Để có thể xem trước và debug "hiệu quả trang trí" trên máy tính của mình trước khi tải code lên GitHub cho cả thế giới xem, chúng ta phải cài đặt môi trường Ruby trên máy tính. Điều này giống như thuê một "phiên dịch viên" biết ngôn ngữ Ruby cho máy tính của bạn. Đừng lo lắng, bạn hoàn toàn không cần học cách viết code Ruby, chỉ cần cài xong là tất cả việc còn lại giao cho Trae.

### 2.4.1 Cài Đặt Trên Windows

**Bước 1: Tải file cài đặt (Chọn mirror trong nước)**

Đối với người dùng Windows, trang chủ https://rubyinstaller.org/downloads/ cung cấp file cài đặt một click, nhưng do sự khác biệt về môi trường mạng, chúng ta cần một mẹo nhỏ. Trang chủ khuyến nghị người mới dùng phiên bản **`Ruby+Devkit 3.X.X (x64)`**, vì nó đi kèm bộ công cụ biên dịch cần thiết.

*Lưu ý đặc biệt cho người mới*: Thực tế là nếu tải trực tiếp từ trang chủ, thường sẽ bị treo hoặc tải thất bại. Do đó, chúng tôi khuyến nghị truy cập trực tiếp vào [RubyInstaller for Windows - Mirror trong nước](https://rubyinstaller.cn/) để tải xuống, tốc độ sẽ nhanh hơn nhiều.

![](images/image8.png)

**Bước 2: Thực hiện cài đặt**

Nhấp đôi vào file cài đặt đã tải. Trong hướng dẫn cài đặt hiện ra, hãy đảm bảo tích vào **"Add Ruby executables to your PATH"** (Thêm vào biến môi trường hệ thống). Đây là bước quan trọng nhất, nếu không máy tính sẽ "không tìm thấy" phiên dịch viên bạn vừa cài đặt.

Sau khi tích chọn, nhấp "Next" theo mặc định để hoàn thành cài đặt.

![](images/image9.png)

**Bước 3: Cấu hình Development Kit**

Sau khi thanh tiến trình cài đặt chạy xong, một cửa sổ dòng lệnh màu đen sẽ tự động hiện ra. Đừng hoảng loạn, trực tiếp nhập số `3` (đại diện cho cài đặt môi trường cơ bản MSYS2 và bộ công cụ MINGW) vào vị trí con trỏ, rồi nhấn Enter. Kiên nhẫn đợi code trên màn hình chạy xong, cửa sổ tự đóng lại là được.

![](images/image10.png)

**Bước 4: Kiểm tra kết quả**

Đến lúc nhờ AI giúp chúng ta kiểm tra rồi! Mở Trae, trong hộp Chat (hộp thoại) bên phải, nhập trực tiếp đoạn lệnh ngôn ngữ tự nhiên sau:

```markdown
Hãy giúp tôi kiểm tra xem máy tính hiện tại đã cài đặt đúng môi trường Ruby chưa. Hãy chạy lệnh ruby -v trong terminal phía dưới và cho tôi biết kết quả.
```

Nếu bạn thấy Trae phản hồi số phiên bản tương tự `ruby 3.x.x`, chúc mừng bạn, cấu hình môi trường Ruby trên Windows đã thành công hoàn toàn!

![](images/image11.png)

### 2.4.2 Cài Đặt Trên Mac

Cấu hình trên Mac mang phong cách "geek" hơn, thường cần gõ lệnh dòng lệnh như hacker. Nhưng trong chế độ Vibe Coding, chúng ta thậm chí không cần tự mở terminal, chỉ cần để Trae đóng vai IT vận hành riêng của bạn.

**Bước 1: Ra lệnh "Cấu hình một click"**

Mở Trae, trong hộp Chat (hộp thoại) bên phải, trực tiếp sao chép và gửi đoạn lệnh ngôn ngữ tự nhiên dưới đây. Chúng ta giao ba bước "kiểm tra môi trường", "cài đặt Homebrew" và "cài đặt Ruby" một lần:

```markdown
Tôi dùng máy Mac, hiện cần cấu hình môi trường phát triển Ruby. Hãy giúp tôi hoàn thành các bước sau:
1. Kiểm tra xem máy tính của tôi đã cài đặt Homebrew chưa. Nếu chưa, hãy giúp tôi chạy script cài đặt chính thức của Homebrew trong terminal.
2. Sau khi xác nhận Homebrew đã sẵn sàng, hãy chạy brew install ruby trong terminal để cài đặt Ruby.
3. Sau khi hoàn thành tất cả, chạy lệnh ruby -v để kiểm tra cài đặt có thành công không.
Hãy hướng dẫn tôi từng bước, và khi cần hãy cung cấp trực tiếp các lệnh terminal có thể nhấp để chạy.
```

Sau khi nhận lệnh, Trae sẽ bắt đầu làm việc và tạo ra các khối code có nút chạy trong hộp thoại. Bạn chỉ cần thực hiện theo.

**⚠️ Người mới phải đọc:**

Khi cài đặt Homebrew, terminal thường sẽ hiện một dòng tiếng Anh (ví dụ `Password:`), yêu cầu bạn nhập mật khẩu đăng nhập Mac.

**Chú ý!** Khi nhập mật khẩu trong terminal Mac, màn hình sẽ không hiển thị bất kỳ ký tự hay dấu sao nào (trông như không nhập gì). Đừng hoảng loạn, đây là cơ chế chống nhìn trộm bình thường. Cứ nhập mật khẩu đăng nhập máy của bạn, rồi nhấn Enter.

**Bước 2: Kiểm tra kết quả**

Tương tự, sau khi cài đặt xong, chúng ta có thể quay lại Trae. Trong hộp Chat (hộp thoại) bên phải nhập lệnh:

```markdown
Tôi vừa cài đặt Ruby trên Mac qua brew. Hãy giúp tôi chạy lệnh ruby -v trong terminal, kiểm tra xem đã cài đặt đúng và cấu hình biến môi trường chưa.
```

Khi bạn thấy dòng chữ tương tự `ruby 3.x.x` trên màn hình terminal phía dưới, nghĩa là "xưởng chế biến trang web cục bộ" đã hoàn thành. Mac của bạn đã sẵn sàng bắt đầu Vibe Coding bất cứ lúc nào!

## 2.5 Đăng Ký Tài Khoản GitHub

**GitHub là gì?** Nếu Git là người giao hàng, thì **GitHub là "kho lưu trữ cloud" kiêm "phòng trưng bày"**. Nó không chỉ giúp chúng ta host code miễn phí, quan trọng nhất là tính năng **GitHub Pages** mà nó cung cấp có thể miễn phí biến code của chúng ta thành một URL có thể truy cập toàn cầu. Đây là nền tảng host code lớn nhất thế giới hiện nay, có tài khoản GitHub cũng là "giấy thông hành" để bước vào giới công nghệ.

**Các bước đăng ký:**

1. **Truy cập trang chủ**: Mở [https://github.com/](https://github.com/).
2. **Nhấp đăng ký**: Nhấp vào **"Sign up"** ở góc trên bên phải.

![](images/image12.png)

3. **Điền thông tin**:
4. **Email**: Nhập địa chỉ email thật của bạn.
5. **Password**: Đặt mật khẩu mạnh.
6. **Username (Quan trọng!)**: **Hãy đặt tên cẩn thận!** Vì URL trang chủ cá nhân của bạn sẽ là **`https://tên_người_dùng_của_bạn.github.io`**. Nên dùng tên tiếng Anh, ID thường dùng hoặc tên ngắn gọn gồm chữ và số, **đừng** đặt tên như `a1b2c3d4` kiểu mã ngẫu nhiên, vì link trang chủ cá nhân của bạn sẽ rất khó nhớ.
7. **Xác minh & Khởi động**: Hoàn thành xác minh CAPTCHA (thường là xoay hình ảnh hoặc chọn thiên hà xoắn ốc), vào hộp thư nhận mã xác minh.

![](images/image13.png)

Sau khi đăng ký xong, bạn đã có một "mảnh đất" của riêng mình trên internet, các chương tiếp theo chúng ta sẽ bắt đầu xây dựng trên mảnh đất này!

![](images/image14.png)

# 3 Từ Template Đến Trang Đầu Tiên Có Thể Truy Cập

Mọi thứ đã sẵn sàng. Hai chương trước chúng ta đã chuẩn bị xong công cụ, chương này chúng ta sẽ chính thức "chiếm đất" trên internet. Nhiệm vụ của chương này rất đơn giản: **Chưa cần quan tâm đến "trang trí" và nội dung, hãy dựng "khung xương" của website lên trước, và lấy link truy cập.**

Chúng ta sẽ trực tiếp Fork một template học thuật hoàn chỉnh, tận dụng khả năng tự động hóa của GitHub Pages, để nó chạy được trong 20 phút. Sau khi hoàn thành, bạn sẽ có một link có thể truy cập toàn cầu.

## 3.1 Lấy Template Trang Web

Trong chế độ Vibe Coding, chúng ta không cần viết HTML từ đầu. GitHub có hàng nghìn template open-source xuất sắc, chúng ta chỉ cần "mượn" một cái về và đổi thành tên của mình.

**Bước 1: Tìm template**

Ở đây chúng tôi đã chọn lọc cho bạn một template cổ điển có cấu trúc rõ ràng, phù hợp để trình bày học thuật: https://github.com/luost26/academic-homepage?tab=readme-ov-file (dựa trên Jekyll framework). *(Tất nhiên, bạn cũng có thể tìm kiếm `academic-homepage` trên **GitHub** để tìm phong cách khác bạn thích, nhưng để theo dõi hướng dẫn, nên dùng template trên trước)*

Chúng tôi cũng chuẩn bị một số template khác để bạn tham khảo:

* Minimal Light personal homepage theme (tối giản, có thể tự dùng): https://github.com/yaoyao-liu/minimal-light?
* Minimal Mistakes (linh hoạt đa năng): [https://github.com/mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes?utm_source=chatgpt.com)
* Pixyll (tối giản nhẹ nhàng): https://github.com/johno/pixyll
* Hydejack (trưng bày cá nhân toàn diện): https://github.com/hydecorp/hydejack
* Forty Jekyll Theme (phong cách lưới): https://github.com/andrewbanchich/forty-jekyll-theme
* Leonids (blog hai cột cổ điển): https://github://github.com/renyuanz/leonids
* YAT (phong cách phẳng hiện đại): https://github.com/jeffreytse/jekyll-theme-yat

**Bước 2: Fork dự án**

Truy cập trang chủ repository mục tiêu, nhấp vào nút **Fork** ở góc trên bên phải trang. Lúc này sẽ hiện hộp xác nhận, nhấp thẳng vào **Create Fork**.

* Giải thích: Thao tác này tương đương với việc sao chép hoàn toàn "kho code" của người khác vào tài khoản GitHub của bạn. Bây giờ, bạn đã sở hữu toàn bộ website này.

![](images/image15.png)

**Bước 3: Đổi tên repository (Bước quan trọng nhất)**

Đổi tên repository (Repository name) thành: `tên_người_dùng_của_bạn.github.io`

**⚠️ Người mới phải đọc**: Đây là quy tắc bất di bất dịch của GitHub Pages! Ví dụ, nếu tên người dùng GitHub của bạn là `musk-fan`, thì tên repository **bắt buộc phải** là `musk-fan.github.io`. Chỉ như vậy GitHub mới tự động cấp tên miền miễn phí cho bạn. Nếu tên không đúng, trang web sau này sẽ không mở được.

![](images/image16.png)

## 3.2 Lấy URL Dự Án GitHub

Sau khi đổi tên xong, chúng ta cần lấy "giấy nhận hàng" của repository này.

1. Quay lại trang chủ repository (nhấp tab Code ở góc trên bên trái).
2. Nhấp nút **Code** màu xanh.
3. Đảm bảo chọn tab **HTTPS**.
4. Nhấp nút copy, sao chép URL kết thúc bằng `.git` (ví dụ `https://github.com/musk-fan/musk-fan.github.io.git`).

![](images/image17.png)

## 3.3 Kéo Dự Án Về Máy

Trước đây, lập trình viên cần gõ các lệnh Git phức tạp trong cửa sổ đen để tải code. Nhưng trong thời đại Vibe Coding, chúng ta có Trae. Chúng ta chỉ cần nói với AI: "Tôi muốn cái này, giúp tôi lấy về."

**Bước 1: Chuẩn bị**

Tạo một folder mới trên máy tính (ví dụ đặt tên là `MyWebsite`), rồi nhấp chuột phải chọn "Mở bằng Trae" (hoặc mở Trae rồi chọn Open Folder).

![](images/image18.png)

**Bước 2: Ra lệnh clone**

Sau khi Trae mở, gọi hộp thoại AI bên phải (Chat), nhập lệnh ngôn ngữ tự nhiên sau:

```
Hãy giúp tôi clone repository GitHub từ xa về folder hiện tại.
Địa chỉ repository: dán URL bạn vừa copy, ví dụ https://github.com/musk-fan/musk-fan.github.io.git
Yêu cầu thực hiện: Hãy chạy trực tiếp lệnh git clone trong terminal.
```

**Bước 3: Xác nhận tải xuống**

Trae sẽ tự động khởi động terminal phía dưới và chạy lệnh. Chờ vài giây, khi bạn thấy trong danh sách file bên trái xuất hiện thêm `_config.yml`, `index.html` và các file khác, nghĩa là dự án đã được "chuyển" thành công về máy tính của bạn!

![](images/image19.png)

## 3.4 Xem Trước Trang Web Cục Bộ

Code đã kéo về máy, môi trường (Ruby) cũng đã cài xong. Trước khi chính thức chỉnh sửa website, chúng ta phải "nghiệm thu" trước trên máy tính của mình. Điều này giống như trang trí nhà, bạn phải sắp xếp nội thất trong phòng mẫu trước, thấy ổn rồi mới chính thức mở cửa.

Nhờ môi trường Ruby đã cài đặt ở **mục 2.4**, quá trình này bây giờ rất đơn giản.

**Bước 1: Cài đặt dependencies**

Website Jekyll cần nhiều plugin (Gems) mới chạy được. Thao tác này giống như mua đủ đồ nội thất theo danh sách. **Nhưng lưu ý**, do vấn đề mạng, tải trực tiếp có thể bị treo. Hãy nhờ Trae giúp chúng ta **chuyển sang mirror tốc độ cao trong nước** và cài đặt.

Trong hộp Chat của Trae, nhập lệnh sau:

```markdown
Tôi cần cài đặt dependencies Jekyll. Xét đến môi trường mạng, hãy giúp tôi đổi source trong file Gemfile thành mirror trong nước https://gems.ruby-china.com/ trước. Sau khi chỉnh sửa xong, hãy chạy lệnh bundle install trong terminal để cài đặt tất cả dependencies.
```

**Bước 2: Khởi động dịch vụ cục bộ**

Bây giờ chúng ta sẽ khởi động một "server nhỏ cục bộ", mô phỏng trạng thái website đang chạy. Tiếp tục ra lệnh cho Trae:

```markdown
Đã cài đặt xong dependencies. Hãy giúp tôi khởi động dịch vụ xem trước Jekyll cục bộ trong terminal. Hãy chạy lệnh bundle exec jekyll serve.
```

Sau khi terminal chạy vài giây, bạn sẽ thấy thông báo tương tự `Server address: http://127.0.0.1:4000/academic-homepage/`.

1. **Mở trình duyệt**: Nhấp vào link đó, hoặc trực tiếp nhập link này vào thanh địa chỉ trình duyệt `http://127.0.0.1:4000/academic-homepage/`.
2. **Chứng kiến kỳ diệu**: Nhìn xem! Website của bạn đã chạy trong trình duyệt rồi. Dù tên lúc này vẫn là của tác giả template, nhưng nó đã thực sự chạy trên máy tính của bạn.

Từ nay, những thay đổi chúng ta thực hiện, chỉ cần nhấn `Ctrl+S` lưu lại, rồi làm mới trình duyệt, bạn sẽ thấy **nội dung trang web thay đổi theo**.

![](images/image20.png)

Sau khi xác nhận ổn định ở cục bộ, chúng ta có thể bước sang chương tiếp theo, bắt đầu đại tu website này thành hình dạng của "Musk".

# 4 AI Hỗ Trợ Chỉnh Sửa Nội Dung

Để mọi người nhanh chóng trải nghiệm toàn bộ quy trình, chúng ta không dùng thông tin thật của bản thân (tránh lo lắng về lộ thông tin cá nhân), mà lấy **Elon Musk làm ví dụ**, giúp ông làm một trang web học thuật. Điều này không chỉ giúp chúng ta bỏ qua áp lực nhàm chán của "viết CV", tập trung trải nghiệm niềm vui xây dựng website với Vibe Coding, mà còn có thể xem các sách trắng kỹ thuật của "Iron Man thung lũng Silicon" (như Hyperloop Alpha) treo trên website học thuật trông cool đến mức nào. Chúng ta sẽ hoàn thiện vòng khép kín từ "lấy template" đến "website lên mạng", tự tay xây dựng một không gian trưng bày cá nhân đẳng cấp thế giới.

Tiếp theo, hãy theo nhịp của tôi và gửi lệnh đầu tiên đến AI.

## 4.1 Ràng Buộc Tiền Đề Thống Nhất

Đây là "Prompt tiền đề tổng", chỉ cần gửi một lần. Tác dụng của nó là đặt quy tắc cho AI, ngăn nó "tự do sáng tạo" làm sập cấu trúc website. Hãy sao chép và gửi trực tiếp cho Trae:

```
Bạn hiện là người bảo trì site cho một "template trang học thuật cá nhân dùng GitHub Pages + Jekyll".
Repository hiện tại là trang học thuật cá nhân được điều khiển bởi Jekyll (bao gồm _config.yml, _data, _layouts, v.v.).
Các chỉnh sửa của bạn phải tuân theo các nguyên tắc sau:
1. Mỗi bước chỉnh sửa chỉ làm "mục tiêu giai đoạn hiện tại", cấm làm trước nội dung các giai đoạn sau
2. Không chỉnh sửa cấu trúc site, không thêm plugin mới, không thay đổi phong cách theme
3. Tất cả nội dung phải được Jekyll render bình thường
4. Tất cả thông tin danh tính là "mô phỏng phong cách học thuật", không dùng ngôi thứ nhất
5. Không đưa vào các bài báo IEEE / Nature hư cấu rõ ràng
6. Nếu thông tin không chắc chắn, hãy dùng "sự thật được công nhận rộng rãi công khai" hoặc "ghi chú mô phỏng học thuật hợp lý"
```

## 4.2 Tạo Trang Chủ Musk (Phần Nội Dung)

### 4.2.1 "Lệnh Tổng" Lần Đầu: Thay Thế Danh Tính

Điều đầu tiên chúng ta cần giải quyết là vấn đề "tôi là ai". Template chứa đầy thông tin của tác giả gốc, chúng ta cần nhờ AI thay thế chúng bằng một lệnh duy nhất.

**Bước 1: Chuẩn bị tư liệu**

Đặt các file ảnh tôi cung cấp (`University_of_Pennsylvania.jpg`, `Queen_University.jpg`) vào vị trí tương ứng trong folder dự án (thường là `/assets/images/badges/`).

![](images/image21.png)![](images/image22.png)

**Bước 2: Ra lệnh**

Trong hộp Chat bên phải Trae, nhập đoạn Prompt dưới đây. Lưu ý, chúng ta không cần tự đi tìm từng dòng code, chỉ cần nói thẳng yêu cầu với AI:

```
Một, Mục tiêu: Thay thế "danh tính nhân vật" của trang học thuật cá nhân hiện tại thành Elon Musk, chỉ chỉnh sửa thông tin cơ bản.
Hai, Yêu cầu cụ thể:
1. Tên: Elon Musk
2. Định vị danh tính nghề nghiệp:
    Technology Entrepreneur
    Engineer
    Founder & CEO of SpaceX
    CEO of Tesla, Inc.
3. Học vấn (Education):
    Queen's University (Vật lý & Kinh tế, chưa hoàn thành) (đường dẫn ảnh tại /assets/images/badges/Queen_University.jpg)
    University of Pennsylvania (B.S. in Physics, B.A. in Economics) (đường dẫn ảnh tại /assets/images/badges/University_of_Pennsylvania.jpg)
4. Hướng nghiên cứu / quan tâm (Research Interests, có thể mô phỏng):
    Space Systems Engineering
    Sustainable Energy Systems
    Artificial Intelligence & Robotics
    Large-scale Technological Innovation
5. Danh hiệu (Honors & Recognition):
    Time Person of the Year (2021)
    Fellow of the Royal Society (FRS)
    Listed in Forbes Billionaires (multiple years)
6. Ràng buộc:
    Không thêm "luận văn / publications"
    Không hư cấu bài báo IEEE, Nature, Science
    Diễn đạt theo phong cách học thuật, tránh giọng điệu quảng cáo thương mại
    Giữ nguyên cấu trúc trường dữ liệu gốc, chỉ thay thế nội dung
```

Chúng ta có thể thấy lúc này Trae đã hoàn thành tất cả các yêu cầu chỉnh sửa của chúng ta.

![](images/image23.png)

**Bước 3: Làm mới trình duyệt cục bộ**

Lúc này chúng ta làm mới trình duyệt cục bộ, thấy tất cả đã được thay thế đúng.

![](images/image24.png)

### 4.2.2 Tối Ưu Lặp: Thêm "Luận Văn" Và Dự Án

Vì Elon Musk không phải giáo sư đại học truyền thống, ông ít khi đăng bài trên *Nature* hay *Science*. Nhưng với vai trò "kỹ sư trưởng", ông đã phát hành nhiều "sách trắng" (White Papers) và "kế hoạch vĩ đại" (Master Plans) có hàm lượng kỹ thuật cao.

Trong ngữ cảnh trang học thuật, chúng ta có thể tái định nghĩa khái niệm "Publications" (xuất bản phẩm) thành **`"Technical White Papers & Visionary Plans"`** (Sách trắng kỹ thuật & Kế hoạch tầm nhìn). Điều này không chỉ không mâu thuẫn, mà còn rất phù hợp với hình ảnh "người thực dụng" của ông.

![](images/image25.png)

**Bước 1: Chuẩn bị tư liệu**

Tải các ảnh bìa tôi cung cấp (`Hyperloop_Alpha_sketch.jpg`, `SpaceX_Starship.jpg`, `Neuralink_sewing_machine_robot.jpg`) về, đặt vào folder `/assets/images/covers/` (và xóa các ảnh mẫu gốc trong folder đó).

![img](images/image26.png)![img](images/image27.png)![](images/image28.png)

**Bước 2: Ra lệnh**

Gửi đoạn Prompt dưới đây cho Trae, nhờ nó giúp chúng ta tái cấu trúc data:

```
Một, Định vị vai trò: Bạn là chuyên gia phát triển website tĩnh thành thạo cú pháp Jekyll và Liquid.
Hai, Mục tiêu nhiệm vụ:
Chỉnh sửa tiêu đề phần trên trang chủ hoặc thanh điều hướng của website.
Cấu trúc file hiện tại được chia thành các subfolder theo năm (ví dụ _publications/2023/xxx.md). Theo định dạng chỉ định, tạo ba file Markdown mới để trưng bày các sách trắng kỹ thuật và kế hoạch tầm nhìn của Elon Musk.
Ba, Các bước cụ thể và yêu cầu:
1. Chỉnh sửa tiêu đề phần
    Hãy tìm kiếm toàn cục chuỗi "Selected Publications" (có thể xuất hiện trong index.html, _config.yml hoặc _pages/publications.md). Hãy thay thế bằng: "Technical White Papers & Visionary Plans".
2. Tái cấu trúc dữ liệu xuất bản (Bước quan trọng)
    Xóa toàn bộ nội dung cũ trong folder _publications (hãy xóa các folder năm cũ như 2023, 2024, v.v.).
    Tạo ba folder năm mới: _publications/2013/, _publications/2017/, _publications/2019/.
    Trong các folder năm tương ứng, tạo lần lượt ba file Markdown sau.
3. Tuân thủ nghiêm ngặt định dạng file
Quan trọng: Phải tuân thủ nghiêm ngặt định dạng YAML Front Matter sau, không tự tạo tên trường mới:
    - title:          "tiêu đề bài báo"
    - date:           YYYY-MM-DD HH:MM:SS +0800
    - selected:       true
    - pub:            "nơi đăng/tên tạp chí"
    - pub_date:       "năm"
    - abstract: >-    nội dung tóm tắt...
    - cover:          /assets/images/covers/cover_name.jpg
    - authors:        - tác giả 1 - tác giả 2
    - links:Paper:    https://link bài báo
4. Hãy tạo code hoàn chỉnh cho ba file sau (bao gồm chú thích đường dẫn):
(1) Đường dẫn: _publications/2013/2013-hyperloop.md
    Title: Hyperloop Alpha
    Date: 2013-08-12
    Pub: Tesla Blog (Open Source)
    Pub_date: "2013"
    Abstract: A proposal for a fifth mode of transport, utilizing a low-pressure tube and air bearings to achieve subsonic speeds.
    cover: /assets/images/covers/Hyperloop_Alpha_sketch.jpg
    Authors: Elon Musk, SpaceX & Tesla Teams
    Link: https://www.tesla.com/sites/default/files/blog_images/hyperloop-alpha.pdf
(2) Đường dẫn: _publications/2017/2017-mars.md
    Title: Making Humans a Multi-Planetary Species
    Date: 2017-06-01
    Pub: New Space
    Pub_date: "2017"
    Abstract: Detailed architecture of the Starship system designed to colonize Mars. This paper outlines the technical challenges to establish a self-sustaining city.
    cover: /assets/images/covers/SpaceX_Starship.jpg
    Authors: Elon Musk
    Link: https://www.liebertpub.com/doi/10.1089/space.2017.29009.emu
(3) Đường dẫn: _publications/2019/2019-neuralink.md
    Title: An Integrated Brain-Machine Interface Platform
    Date: 2019-10-16
    Pub: Journal of Medical Internet Research
    Pub_date: "2019"
    Abstract: We have built arrays of small and flexible electrode threads, with as many as 3,072 electrodes per array, and a neurosurgical robot.
    cover: /assets/images/covers/Neuralink_sewing_machine_robot.jpg
    Authors: Elon Musk, Neuralink
    Link: https://www.jmir.org/2019/10/e16194/
Yêu cầu thực hiện: Hãy đưa ra code nội dung hoàn chỉnh của ba file đó, cũng như code chỉnh sửa của file liên quan đến việc bạn thay đổi tiêu đề.
```

**Bước 3: Làm mới trình duyệt cục bộ**

Sau khi chờ quá trình build hoàn thành, bạn sẽ thấy danh sách luận văn nhàm chán trước đây đã biến thành "trưng bày công nghệ đậm chất tương lai".

![](images/image33.png)

### 4.2.3 Đánh Bóng Cuối Cùng: Link Mạng Xã Hội & Ảnh Đại Diện

Đây là bước quan trọng "từ 90 điểm lên 100 điểm". Thanh bên (sidebar) lúc này có thể vẫn còn link GitHub từ template hoặc email sai. Chúng ta cần trỏ chúng đến tài khoản mạng xã hội thật của Musk (chủ yếu là X.com).

**Bước 1: Chuẩn bị**

Lên Google tìm một tấm ảnh đẹp của Musk, lưu lại với tên `portrait.png` (hoặc kéo ảnh vào folder `images/photo` bên trái Trae, ghi đè ảnh gốc).

**Bước 2: Sao chép Prompt sau gửi cho Trae**

```
Một, Định vị vai trò: Bạn là chuyên gia phát triển website Jekyll chú trọng từng chi tiết.
Hai, Mục tiêu nhiệm vụ: Hoàn thành chỉnh sửa cuối cùng cho thanh bên (Sidebar) và cấu hình thông tin cá nhân của website. Chúng ta cần cập nhật ảnh đại diện tác giả, tiểu sử và link mạng xã hội thành thông tin thật của Elon Musk.
    Hãy quét cấu trúc dự án trước, tìm file cấu hình kiểm soát thông tin tác giả.
Ba, Hãy thực hiện các chỉnh sửa sau:
1. Sửa đường dẫn ảnh đại diện (Avatar)
    Tôi đã tải lên một ảnh mới tên portrait.png vào folder images/ hoặc assets/images/.
Hãy chỉnh sửa đường dẫn avatar trong file cấu hình để trỏ đến ảnh mới này (đảm bảo đường dẫn tương đối đúng, ví dụ /images/portrait.png).
2. Làm sạch link mạng xã hội (Social Links) Hãy cập nhật hoặc xóa các icon link mạng xã hội trên thanh bên:
    Email: Đổi thành elon@spacex.com (hoặc nếu trường cho phép, hãy comment out/xóa trường đó để tránh làm phiền).
    Twitter / X: Đổi thành https://x.com/elonmusk (đây là link cốt lõi).
    GitHub: Đổi thành https://github.com/tesla (trỏ đến repository open source của Tesla) hoặc xóa thẳng.
    Google Scholar: Phải xóa (ông ấy không duy trì cái này).
    LinkedIn / ResearchGate: Nếu có, hãy xóa tất cả.
Yêu cầu đầu ra: Hãy đưa ra trực tiếp đoạn code hoàn chỉnh sau khi chỉnh sửa file cấu hình.
```

**Bước 3: Làm mới trình duyệt cục bộ**

1. Nhìn vào thanh bên có phải là tấm ảnh đẹp đó không? Nhấp vào icon Twitter có nhảy sang X.com không?

Lúc này ở cục bộ, bạn đã có một trang học thuật cá nhân hoàn chỉnh, chuyên nghiệp, và đậm chất "phong cách Musk".

![](images/image34.png)

## 4.3 Tùy Chỉnh UI Truyền Hồn (Phần Phong Cách)

Nội dung trang web lúc này đã đúng rồi, nhưng trông vẫn như "bản in ra của một tờ CV", thiếu cảm giác công nghệ. Trong chế độ Vibe Coding, chúng ta không cần biết CSS, chỉ cần nói với AI "cảm giác" chúng ta muốn.

**Ví dụ tình huống**: Nếu bạn thấy nền xám quá ảm đạm, muốn đổi thành "đỏ sao Hỏa". Trực tiếp hỏi Trae: *"Tôi muốn đổi màu nền thanh bên thành màu đỏ tối (#8B0000), thể hiện cảm giác sao Hỏa. Tôi nên chỉnh sửa file **CSS** hoặc SCSS nào? Hãy đưa code trực tiếp cho tôi."*

![](images/image35.png)

Nếu bạn thích phong cách "SpaceX Dashboard" trong ảnh trên, có thể sao chép trực tiếp đoạn Prompt "cấp độ designer" sau:

```
Một, Định vị vai trò: Bạn là UI designer hàng đầu theo trường phái "Swiss International Style", thành thạo thiết kế giao diện phong cách Notion, Linear hoặc Apple.
Hai, Mục tiêu nhiệm vụ: Hãy viết lại hoàn toàn CSS/SCSS, tạo phong cách trang học thuật tối giản kiểu "SpaceX Dashboard". Từ khóa cốt lõi là: thông thoáng, tiết chế, chính xác.
Ba, Hãy thực hiện các ghi đè style (Override) cụ thể sau:
1. Typography toàn cục (Typography is King)
Font chữ: Từ bỏ font serif gốc. Bắt buộc đổi font toàn site sang system-level sans-serif stack: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif.
Chiều cao dòng: Tăng khoảng thở cho văn bản, đặt line-height: 1.75.
Màu sắc:
    Màu tiêu đề chính: #111111 (gần đen thuần).
    Màu văn bản chính: #333333 (xám đậm).
    Thông tin phụ (ngày tháng/trích dẫn): #666666 (xám vừa).
2. Thanh điều hướng tối giản (Clean Header)
Nền: Bỏ nền đen trước đó, đổi thành nền trắng thuần (#FFFFFF) hoặc nền trắng bán trong suốt có Gaussian blur (rgba(255, 255, 255, 0.9) + backdrop-filter: blur(10px) nếu hỗ trợ).
Viền: Chỉ giữ một viền đáy cực mỏng border-bottom: 1px solid #EAEAEA.
Văn bản: Link điều hướng dùng màu xám đậm #333333, chỉ đổi đen và in đậm khi hover.
3. Bỏ card, quay về nội dung (Remove Cards)
Bỏ nền và bóng của thanh bên trái và card [About me] (box-shadow: none, background: transparent). Để văn bản nổi trực tiếp trên nền trang, đây là cách làm đẳng cấp nhất.
Tăng khoảng cách: Tăng đáng kể margin-bottom giữa các phần (ví dụ 80px), dùng khoảng trắng để phân tách nội dung thay vì viền.
4. Sử dụng màu thương hiệu tiết chế (Accent Color)
Toàn site chỉ dùng Tesla Red (#E82127) trên links và nút quan trọng.
Style link: Bỏ gạch chân, chỉ đổi màu. Khi hover thêm khối nền đỏ nhạt (background: rgba(232, 33, 39, 0.05)).
5. Tinh chỉnh ảnh đại diện
Giữ hình tròn (border-radius: 50%).
Bỏ viền: Tối giản thật sự không cần viền.
Chỉ giữ một bóng đổ rất nhạt: box-shadow: 0 10px 30px rgba(0,0,0,0.08).
Yêu cầu thực hiện: Hãy phân tích các file _sass hoặc CSS, không vá code cũ, mà đưa ra trực tiếp khối code reset và ghi đè các style trên.
```

## 4.4 Thay Thế Thành Thông Tin Của Bạn (Phần Tùy Chỉnh)

Chúc mừng bạn! Đã chạy thông quy trình "trang Musk" ở trên, thực ra bạn đã nắm được tâm pháp cốt lõi của Vibe Coding để xây dựng website. Bây giờ, để biến "căn phòng mẫu" này thành ngôi nhà của chính bạn, thực sự dễ như trở bàn tay.

Bạn không cần bắt đầu lại từ đầu, chỉ cần lặp lại các bước trên, nhưng về chiến lược chúng ta có thể linh hoạt hơn một chút:

**Bước 1: Thay thế vật lý (Ảnh đại diện & Thông tin cơ bản)**

Đây là bước đơn giản nhất, vẫn theo quy tắc cũ:

1. **Đổi ảnh**: Trong thanh file bên trái Trae, tìm `assets/images/`, trực tiếp kéo ảnh chứng minh thư của bạn vào, ghi đè `portrait.png` đó.
2. **Đổi tên**: Nói với Trae: "Giúp tôi thay thế toàn bộ Elon Musk trong website thành [tên của bạn]".

**Bước 2: AI xử lý trước (Nhờ ChatGPT/Gemini giúp bạn sắp xếp)**

Trae giỏi viết code, nhưng nếu bạn ném thẳng một file PDF CV lộn xộn cho nó, nó có thể sẽ bị rối.

**Vì vậy cách hiệu quả hơn là:** Trước tiên dùng AI giỏi xử lý văn bản dài (như ChatGPT, Gemini, Kimi) để "định dạng" CV của bạn.

Bạn có thể gửi lệnh này cho ChatGPT:

```
Định vị vai trò: Bạn là chuyên gia lên kế hoạch nội dung trang web học thuật.
Mục tiêu nhiệm vụ: Tôi sẽ gửi cho bạn CV cá nhân của tôi (Resume/CV). Hãy giúp tôi trích xuất thông tin quan trọng và sắp xếp thành định dạng Markdown có cấu trúc rõ ràng, phù hợp để điền trực tiếp vào website tĩnh.
Hãy sắp xếp và trau chuốt theo đúng 5 module sau (nếu không có nội dung liên quan, hãy để trống):
1. Thông tin cơ bản (Profile)
Name: Họ tên đầy đủ của tôi.
Tagline: Nhãn nghề nghiệp một câu (ví dụ: CS Student @ XX Univ | AI Enthusiast).
Bio: Tiểu sử ngôi thứ ba 50-100 chữ, tóm tắt background và kỹ năng cốt lõi của tôi (giọng điệu chuyên nghiệp, học thuật).
Socials: Trích xuất email, GitHub, LinkedIn, link blog, v.v.
2. Học vấn (Education)
Liệt kê: Tên trường, bằng cấp (ví dụ B.S. in CS), thời gian.
Bổ sung: Nếu có GPA hoặc khóa học cốt lõi, hãy liệt kê riêng một dòng.
3. Dự án cốt lõi (Selected Projects) — Quan trọng! Trích xuất 2-3 dự án nổi bật nhất, mỗi dự án gồm:
Title: Tên dự án.
Tech Stack: Tech stack sử dụng (ví dụ Python, React, PyTorch).
TL;DR: Tóm tắt một câu dự án làm gì.
Description: 2-3 điểm đóng góp cốt lõi (dùng quy tắc STAR để trau chuốt: Tình huống+Nhiệm vụ+Hành động+Kết quả).
Image Placeholder: Đặt tên file ảnh (ví dụ project_name.jpg).
4. Bài báo/Xuất bản phẩm (Publications/Articles) Nếu có bài báo hoặc bài viết kỹ thuật, hãy trích xuất:
Title: Tiêu đề.
Venue: Tên hội nghị/tạp chí/nền tảng đăng.
Date: Thời gian đăng (chỉ cần năm).
Abstract: Tóm tắt một câu.
5. Tech stack (Skills)
Hãy phân loại sắp xếp: Ngôn ngữ lập trình, framework/công cụ, kỹ năng khác.
Yêu cầu đầu ra: Không giải thích quá trình, đưa ra trực tiếp nội dung Markdown đã sắp xếp.
```

Sau khi lấy được **văn bản thuần sạch** này, rồi mới feed cho Trae, độ chính xác sẽ tăng 100%.

![](images/image36.png)![](images/image37.png)

**Bước 3: Thay thế nội dung cốt lõi (Hai con đường)**

Ở bước này, tùy theo sở thích của bạn, bạn có thể chọn hai chế độ Vibe Coding khác nhau:

1. **Chế độ A: Điều hướng qua AI, chỉnh sửa thủ công (Phù hợp với bạn muốn hiểu cấu trúc)**

Nếu bạn muốn biết mỗi chữ được thay đổi ở đâu, có thể hỏi Trae:

```markdown
"Tôi muốn chỉnh sửa phần 'học vấn', hãy cho tôi biết đường dẫn file tương ứng ở đâu? Code ở những dòng nào?"
```

Trae sẽ cho bạn biết **trong hộp thoại**: "File bạn cần chỉnh sửa là `_pages/about.md`, code nằm ở dòng XX..." và hiển thị preview code sau khi chỉnh sửa.

Bạn cần tự tìm và mở file đó trong thanh file bên trái, rồi tham khảo gợi ý của Trae, như làm bài điền vào chỗ trống, điền nội dung ChatGPT đã sắp xếp cho bạn vào.

![](images/image38.png)

2. **Chế độ B: Ủy thác toàn tự động (Phù hợp với bạn theo đuổi hiệu quả)**

Nếu bạn thấy tìm file quá phiền, hãy ném thẳng thông tin đã sắp xếp cho Trae:

```markdown
"Đây là 'học vấn' và 'kinh nghiệm dự án' tôi đã sắp xếp (dán nội dung Markdown). Hãy giúp tôi thay thế trực tiếp nội dung tương ứng trong website hiện tại, giữ nguyên định dạng bố cục gốc."
```

# 5 Triển Khai Lên Mạng

## 5.1 Triển Khai Lên GitHub Pages

**Bước 1: Bật GitHub Actions (Build trên cloud)**

Quay lại phía web GitHub của bạn:

1. Nhấp vào **Settings** ở trên cùng repository.
2. Tìm và nhấp **Pages** trong thanh bên trái.
3. Bên dưới **Build and deployment**, chuyển tùy chọn **Source** từ `Deploy from a branch` sang **`GitHub Actions`**.

![](images/image39.png)

**Bước 2: Tự động cấu hình workflow Jekyll**

Sau khi chuyển đổi, bạn sẽ thấy giao diện thay đổi. GitHub sẽ thông minh nhận ra đây là dự án Jekyll.

1. Tìm card **Jekyll** (By GitHub Actions).
2. Nhấp nút **Configure** trên card.

![](images/image40.png)

**Bước 3: Commit file cấu hình**

Sau khi nhấp, bạn sẽ được chuyển đến trang đầy code (đây là file cấu hình `.yml`, GitHub đã viết sẵn cho bạn, chuyên dùng để build website Jekyll).

1. **Không chỉnh sửa bất kỳ code nào**.
2. Trực tiếp nhấp nút xanh **`Commit changes...`** ở góc trên bên phải trang.
3. Trong hộp xác nhận hiện ra, nhấp lại **`Commit changes`**.

![](images/image41.png)

![](images/image42.png)

**Bước 4: Chờ và nghiệm thu**

Sau khi commit xong, server của GitHub sẽ bắt đầu tự động làm việc.

1. Nhấp tab **Actions** trên thanh menu trên cùng.
2. Bạn sẽ thấy một task tên `Deploy Jekyll site to Pages` đang quay vòng.
3. Kiên nhẫn chờ 1-2 phút cho đến khi vòng tròn vàng đó chuyển thành **dấu tích xanh (✅)**.

![](images/image43.png)

**Bước 5: Truy cập website của bạn**

Khi vòng tròn đó chuyển thành **dấu tích xanh**, chúng ta có thể truy cập địa chỉ **`https://tên_người_dùng_của_bạn.github.io/`** để **xem** hiệu ứng mặc định của template này.

Chúc mừng! Bạn đã triển khai thành công một trang học thuật cá nhân thuộc về bạn, có thể truy cập toàn cầu.

## 5.2 Commit Thay Đổi & Cập Nhật Trang Chủ

Chúng ta sẽ commit toàn bộ nội dung đã chỉnh sửa cục bộ ở trên lên GitHub, để trang cá nhân của Musk này có thể được cả thế giới nhìn thấy.

1. Nhấp vào Source Control (Quản lý mã nguồn) bên trái.
2. Thêm tất cả nội dung **[Thay đổi]** vào **[Thay đổi đã stage]**.
3. Nhờ Trae giúp chúng ta tạo nội dung commit, nhấp **Commit**.
4. Nhấp **Sync Changes (Push)** để đẩy lên nhánh main.
5. Chờ một lúc, đến khi tất cả tiến trình dưới tab **Actions** hoàn thành.

![](images/image44.png)

Bây giờ, chúc mừng bạn! Mở **`https://tên_người_dùng_của_bạn.github.io/`**, bạn đã có một trang học thuật cá nhân hoàn chỉnh, chuyên nghiệp và đậm chất "phong cách Musk".

![](images/image45.png)

# 6 Cách Chơi Nâng Cao: Viết Trang Chủ Cá Nhân Từ Đầu

Nếu bạn cảm thấy template học thuật quá cứng nhắc, hoặc muốn làm một trang web single-page cool như "Ma Trận", thì chào mừng đến với **Khu DIY**.

Ở đây, chúng ta không Fork code của ai cả. Chúng ta sẽ dùng Trae, đứng trước một folder trống, như Chúa tạo ra thế giới, dùng một câu tạo ra một website hoàn chỉnh và triển khai nó lên mạng.

## 6.1 Tại Sao Phải "Tự Làm"

* **Tự do tuyệt đối**: Không bị ràng buộc bởi template. Bạn muốn thanh điều hướng ở bên phải? Muốn nền có pháo hoa? Chỉ cần nói với AI.
* **Chủ nghĩa tối giản**: Template thường chứa hàng trăm file, trong khi website tự làm có thể chỉ cần một `index.html`.
* **Kiểm soát kỹ thuật**: Đây là cách tốt nhất để hiểu "trang web thực ra chạy như thế nào".

Chúng ta sẽ demo luồng **HTML thuần** cổ điển nhất: không cần biên dịch, GitHub Pages hỗ trợ gốc, rất phù hợp để làm trang giới thiệu cá nhân (Landing Page).

## 6.2 Thực Hành: Nhờ AI Viết Trang Chủ Phong Cách "Trung Tâm Chỉ Huy Sao Hỏa"

Lần này chúng ta không làm kiểu học thuật nữa. Giả sử Musk muốn một trang chủ cá nhân tối giản, đậm chất tương lai, để trưng bày "Kế hoạch sao Hỏa" của ông.

**Bước 1: Tạo dự án rỗng**

Tạo một folder mới trên máy tính, rồi mở folder đó bằng Trae. Lúc này danh sách bên trái trống rỗng, không có gì cả.

*(Gợi ý: Bạn có thể đặt sẵn ảnh đại diện của Musk vào, đặt tên là `portrait.png`)*

**Bước 2: Dựng khung**

Trong hộp thoại Trae, nhập đoạn Prompt (gợi ý) sau. Lưu ý, chúng ta yêu cầu AI viết tất cả code trong một file, thuận tiện cho người mới quản lý:

```
Tôi muốn làm từ đầu một trang chủ cá nhân phong cách tối giản cho Elon Musk, không dùng bất kỳ framework phức tạp nào, chỉ dùng HTML+CSS+JS.
Phong cách thiết kế: Phong cách SpaceX dashboard.
    Nền: Dùng màu đen vũ trụ sâu thẳm (#000000), điểm xuyết animation ánh sao.
    Màu chủ đạo: Dùng "đỏ sao Hỏa" (#E82127) làm màu nhấn.
    Font chữ: Dùng font monospace, mô phỏng cảm giác terminal code.
Nội dung trang:
    Ở giữa là ảnh đại diện của Elon Musk (hình tròn, có viền xoay) (đường dẫn ảnh là portrait.png).
    Tên: Elon Musk (Technoking of Tesla).
    Tiểu sử: "Occupying Mars... 99% Loading."
    Phía dưới có ba nút phát sáng, lần lượt link đến: X (Twitter), SpaceX, Tesla.
Yêu cầu kỹ thuật: Hãy viết tất cả style CSS và cấu trúc HTML vào một file index.html. Hãy tạo ra code hoàn chỉnh trực tiếp.
```

![](images/image46.png)

**Bước 3: Tạo và xem trước**

Ở bước trước, Trae đã giúp chúng ta tạo file index.html, vậy chúng ta xem hiệu quả hiện tại của trang này như thế nào?

Nói với Trae trong Chat:

```markdown
Hãy giúp tôi khởi động một server cục bộ để xem trước trang web này.
```

Bạn sẽ nhận được một link tương tự `http://localhost:8000`, sao chép và mở link đó trong trình duyệt, bạn sẽ thấy một "trang chủ sao Hỏa" cool ngầu, nền có thể có các ngôi sao nhấp nháy.

![](images/image47.png)

Nhưng chúng ta nhận thấy trang hiện tại chỉ là một "landing page" hoặc "màn hình giới thiệu" rất cool, nhưng với tư cách là một trang chủ cá nhân hoàn chỉnh, lượng thông tin quá ít, thiếu chiều sâu mà một trang học thuật cần có. Do đó dựa trên phong cách khung này, chúng ta bắt đầu bổ sung và hoàn thiện thông tin học thuật của Elon Musk.

![](images/image48.png)

**Bước 4: Tiếp tục hoàn thiện thông tin**

Chúng ta muốn Trae giữ nguyên phong cách sao Hỏa hiện tại, nhưng đổi cấu trúc thành giống template học thuật **đó**. Chúng ta cần hướng dẫn rõ ràng để nó chuyển các phần tử hiện có sang bên trái, và tạo một khu vực nội dung mới bên phải để đặt CV và sách trắng, đồng thời tất cả nội dung mới thêm vào đều phải tuân theo phong cách cyberpunk "nền đen chữ đỏ".

Sao chép toàn bộ đoạn prompt sau gửi cho Trae:

```
Nguyên tắc cốt lõi:
Phải giữ nguyên nghiêm ngặt phong cách thiết kế "SpaceX/sao Hỏa" hiện tại (nền đen thuần, điểm xuyết vũ trụ, màu nhấn đỏ neon, font monospace), tuyệt đối không dùng nền trắng trong ảnh tham khảo.
Các bước chỉnh sửa cụ thể:
1. Tạo cấu trúc hai cột (Two-Column Layout)
Chia trang thành hai cột trái phải. Thanh bên trái chiếm khoảng 30%-35%, khu vực nội dung bên phải chiếm khoảng 65%-70%.
2. Thanh bên trái (Left Sidebar) - Di chuyển thông tin hiện có
Chuyển tất cả các phần tử hiện có sang thanh bên trái và cố định:
    - Ảnh đại diện: Giữ nguyên ảnh đại diện tròn của Elon Musk.
    - Tên và chức danh: Giữ hiệu ứng neon đỏ "ELON MUSK" và "Technoking of Tesla".
    - Thanh tải: "Occupying Mars... 99% Loading" giữ lại, làm chữ ký cá nhân.
    - Nút mạng xã hội: Ba nút đỏ phía dưới (X, SPACE X, TESLA) chuyển xuống dưới cùng thanh bên trái.
3. Khu vực nội dung bên phải (Right Content Area) - Thêm thông tin chi tiết
Thêm giới thiệu cá nhân chi tiết và trưng bày thành tích ở khu vực bên phải. Tất cả văn bản mới thêm mặc định dùng màu trắng hoặc xám nhạt, tiêu đề dùng nhấn mạnh phong cách neon đỏ. Hãy tạo các phần sau:
- About Me (Về tôi):
    Viết một đoạn giới thiệu ngắn, ví dụ: "Technology entrepreneur and engineer focused on multi-planetary expansion, sustainable energy, and artificial intelligence."
- Focus Areas (Lĩnh vực quan tâm):
    Liệt kê Space Systems Engineering, Mars Colonization Architecture, Brain-Machine Interfaces.
- Visionary Plans & White Papers (Kế hoạch tầm nhìn & Sách trắng kỹ thuật):
    Đây là trọng tâm, tham khảo phong cách danh sách nhưng đổi thành phong cách đen. Tạo một danh sách trưng bày các kế hoạch kỹ thuật quan trọng của ông (dùng viền đỏ hoặc hiệu ứng phát sáng để phân biệt từng mục).
    Mục 1: "Making Humans a Multi-Planetary Species" (Starship Architecture, 2017).
    Mục 2: "Hyperloop Alpha" (High-speed transportation proposal, 2013).
    Mục 3: "Neuralink: An Integrated Brain-Machine Interface Platform" (2019).
- Notable Achievements (Thành tựu nổi bật):
    Liệt kê đơn giản vài cột mốc, ví dụ: First private liquid-propellant rocket to reach orbit (Falcon 1); First reusable orbital class rocket (Falcon 9).
4. Yêu cầu chi tiết style
Tất cả tiêu đề phần bên phải (như "About Me"), dùng phong cách font đỏ phát sáng giống "ELON MUSK" bên trái.
Đảm bảo toàn trang hiển thị tốt ở các kích thước màn hình khác nhau (responsive design).
```

Quay lại trình duyệt làm mới trang, trang học thuật phong cách cyberpunk này đã hoàn thành! Tất nhiên, bạn cũng có thể tiếp tục hoàn thiện theo sở thích của mình, chỉ cần nói rõ mục tiêu yêu cầu với Trae như quá trình trên, nó sẽ tự nhiên giúp bạn thực hiện quá trình coding phức tạp.

![](images/image49.png)

## 6.3 Cách Triển Khai Website "Tự Làm"

Khác với template đã Fork trước đó (đó là sao chép repository của người khác), dự án này là bạn tự tạo mới, trên GitHub chưa có chỗ cho nó. Chúng ta cần thủ công "liên kết" chúng.

**Bước 1: Tạo repository mới trên GitHub**

1. Đăng nhập vào phía web GitHub.
2. Nhấp dấu **+** ở góc trên bên phải -> **New repository**.

![](images/image50.png)

3. **Repository name**: Điền `mars-profile` (hoặc tên bạn thích).

**Lưu ý:** Nếu bạn đã dùng tên **`tên_người_dùng_của_bạn.github.io`** trước đó, thì ở đây không thể dùng lại. Bạn có thể đặt tên khác, **GitHub** sẽ tạo cho bạn một link, ví dụ *`tên_người_dùng_của_bạn.github.io/mars-link`*.

4. **Public/Private**: Chọn **Public**.
5. **⚠️ Tuyệt đối không tích "Add a README file"!** (Các tùy chọn còn lại giữ mặc định)
6. Nhấp **Create repository**.

![](images/image51.png)

**Bước 2: Đẩy code cục bộ lên cloud**

Sau khi tạo xong, GitHub sẽ chuyển đến một trang có đầy code lộn xộn. Đừng hoảng, chúng ta sao chép link repository trong ảnh dưới đây.

![](images/image52.png)

Quay lại Trae, trong hộp Chat nhập:

```markdown
Tôi đã tạo một repository rỗng trên GitHub, địa chỉ là: https://github.com/tên_người_dùng_của_bạn/mars-link.git (hãy thay thế bằng địa chỉ repository bạn vừa tạo).
Bây giờ, hãy giúp tôi khởi tạo dự án cục bộ hiện tại thành Git repository, và đẩy code lên nhánh main của địa chỉ remote này.
```

Trae thường sẽ giúp bạn thực hiện "ba thao tác chuẩn" sau (bạn có thể chỉ cần nhấp chạy):

1. `git init` (Khởi tạo repository)
2. `git add .` và `git commit -m "First commit"` (Đóng gói hành lý)
3. `git branch -M main` và `git remote add origin [địa chỉ của bạn]` (Liên kết cloud)
4. `git push -u origin main` (Xuất phát!)

Sau khi Trae hoàn thành commit, chúng ta quay lại GitHub làm mới trang, nhấp **Code** phía trên, có thể thấy code viết trong Trae đã được đẩy thành công lên GitHub repository.

![](images/image53.png)

**Bước 3: Bật GitHub Pages**

Sau khi đẩy code lên, trang web sẽ không tự động tạo, cần bật thủ công:

1. Quay lại trang GitHub repository, nhấp **Settings** phía trên.
2. Nhấp **Pages** ở thanh bên trái.
3. Bên dưới **Build and deployment**:
   1. **Source**: Chọn `Deploy from a branch`.
   2. **Branch**: Chọn nhánh `main`, folder chọn `/(root)`.
4. Nhấp **Save**.

![](images/image54.png)

Khi bạn nhấp Save, trang web sẽ không "xuất hiện" trong một giây. Phía hậu trường của GitHub giống như một nhà máy robot nhỏ, cần khoảng **1 đến 2 phút** để đóng gói code bạn tải lên, biên dịch, rồi xuất bản lên server toàn cầu.

Sau khi chờ kiên nhẫn và làm mới trang, bạn sẽ thấy ngay dưới tiêu đề lớn **GitHub Pages**, xuất hiện một dòng có URL, thường ghi: **"Your site is live at `https://tên_người_dùng_của_bạn.github.io/mars-link/`"**.

![](images/image55.png)

Nhấp vào đó, "Trung tâm chỉ huy sao Hỏa" của bạn đã lên mạng!

![](images/image56.png)

# 7 Lời Kết

Hướng dẫn kết thúc rồi. Bây giờ, nhìn vào địa chỉ `.github.io` sáng lên trên thanh địa chỉ trình duyệt, bạn có cảm giác "mình đã cắm được một lá cờ trên internet" không?

Trong hướng dẫn này, chúng ta mượn danh nghĩa của Elon Musk, xây dựng như chơi Lego một website trông rất ấn tượng. Nhưng đây chỉ là bước khởi đầu. Điều quyến rũ nhất của Vibe Coding không phải là nó giúp bạn tiết kiệm bao nhiêu thời gian gõ code, mà là nó **đập tan hoàn toàn bức tường ngăn cách giữa "ý tưởng" và "hiện thực"**.

Trước đây, bạn có thể từ bỏ ý định trưng bày một dự án vì "không biết viết CSS"; bây giờ, giới hạn duy nhất còn lại chỉ là **trí tưởng tượng** và **thẩm mỹ** của bạn.

**Đừng để website này dừng ở "phiên bản Musk"**. Link Tesla đó dùng để luyện tay, sách trắng di dân lên sao Hỏa đó, dù sao cũng là câu chuyện của người khác. Trang chủ của bạn nên là danh thiếp của chính bạn trong thế giới số.

Hãy ghi lên đó kinh nghiệm của dự án đầu tiên bạn học được, đăng lên suy nghĩ độc đáo của bạn về một công nghệ nào đó, thậm chí danh sách sách yêu thích, những bức ảnh bạn đã chụp cũng có thể treo lên. Những suy nghĩ bị cuốn trôi trên Moments sẽ được lưu lại mãi mãi ở đây; niềm đam mê không viết hết trong CV có thể được trải rộng tự do ở đây.

Đừng để mảnh đất này bỏ hoang. Hãy tìm tòi, phá vỡ, xây dựng lại, cho đến khi nó trở thành hình dạng bạn yêu thích nhất.

![](images/image57.png)

***Hãy đi thôi, để thế giới nhìn thấy bạn!***

# Tài Liệu Tham Khảo

CSDN：[【2025最新保姆级教程】手把手教你用github制作个人主页（申学找工作必备）](https://blog.csdn.net/qq_45743991/article/details/145505150?ops_request_misc=&request_id=&biz_id=102&utm_term=github%E6%9E%84%E5%BB%BA%E4%B8%AA%E4%BA%BA%E4%B8%BB%E9%A1%B5&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-145505150.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN：[Git下载及安装保姆级教程](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

CSDN：[Windows环境下安装Ruby教程](https://blog.csdn.net/alive_tree/article/details/103043158?ops_request_misc=elastic_search_misc&request_id=ad7e29ea7f702554d785c2fc82ec6e95&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~ElasticSearch~search_v2-11-103043158-null-null.142^v102^pc_search_result_base4&utm_term=ruby%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B&spm=1018.2226.3001.4187)
