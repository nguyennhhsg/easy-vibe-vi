# Cách xây dựng trang web cá nhân và blog học thuật của riêng bạn - Triển khai tĩnh với GitHub Pages

# 1 Trang web cá nhân và blog học thuật là gì?

Trong hướng dẫn này, chúng ta sẽ hoàn thành trọn vẹn một vòng khép kín: **từ việc tìm một template trang web có sẵn, đến chỉnh sửa nó thành trang chủ cá nhân của Elon Musk**, và cuối cùng xuất bản miễn phí lên internet.

Để thực hiện hướng dẫn này, bạn cần có ít nhất:

* **Một chiếc máy tính** (Windows hoặc Mac đều được)
* **Tài khoản GitHub của bạn** (dùng để lưu trữ code trang web và host miễn phí)
* **Đã tải Trae** (trợ lý lập trình AI của bạn)
* **Môi trường Git**
* **Môi trường Ruby**
## 1.1 Định nghĩa Trang chủ Học thuật Cá nhân

**Trang chủ học thuật cá nhân (Academic Homepage)** là một "lãnh địa riêng" của bạn trên internet.

Khác với WeChat Moments, Zhihu hay LinkedIn, nó không phụ thuộc vào thuật toán gợi ý của bất kỳ nền tảng mạng xã hội nào, cũng không biến mất chỉ vì nền tảng đó đóng cửa. Đây là một **không gian giới thiệu cá nhân** ổn định lâu dài, có thể được Google/Google Scholar lập chỉ mục. Nó thường bao gồm phần giới thiệu bản thân (Bio), các bài báo đã đăng (Publications), các dự án đã tham gia (Projects) và blog kỹ thuật (Blog).

![](images/image1.png)
## 1.2 Tại sao nên xây dựng trang web của riêng bạn

Trong mô hình phát triển Vibe Coding, bạn không còn cần phải vùi đầu vào những cuốn sách HTML/CSS dày cộp như mười năm trước nữa. Nhờ AI, chúng ta chuyển đổi vai trò từ "lập trình viên cực khổ" thành "tổng biên tập website":

1. **Bạn (Tổng biên tập / PM)**: Chịu trách nhiệm quyết định "phong cách" và nội dung của website. Ví dụ: "Chỗ này đặt bản trình bày kế hoạch thuộc địa hóa Sao Hỏa của Musk", "Đổi nút này sang màu đỏ Tesla".
2. **Trae (AI engineer)**: Chịu trách nhiệm những việc nặng nhọc. Nó chuyển đổi các lệnh ngôn ngữ tự nhiên của bạn thành code phức tạp, xử lý bố cục, phối màu và tương thích mobile.
3. **GitHub Pages (sân khấu trình diễn)**: Cung cấp server và tên miền miễn phí, để cả thế giới có thể thấy tác phẩm của bạn.

**Tại sao người làm học thuật (hoặc người làm kỹ thuật) xứng đáng có nó?**

* **Hướng ngoại (xây dựng tầm ảnh hưởng)**: Đây là **"danh thiếp không bao giờ hết hạn"** của bạn. Khi nộp đơn tiến sĩ, xin việc hay tìm kiếm cơ hội hợp tác, một trang chủ được sắp xếp gọn gàng, mạch lạc thuyết phục hơn nhiều so với một file PDF CV.
* **Hướng nội (tích lũy tri thức)**: Đây là **"bộ não thứ hai"** của bạn. Bạn có thể dùng nó để ghi chép bài học, suy nghĩ kỹ thuật, xây dựng hệ thống kiến thức của riêng mình.
* **Hướng tương lai (được nhìn thấy)**: Các công cụ tìm kiếm ưa thích nội dung có cấu trúc. Sở hữu trang chủ có nghĩa là khi người khác tìm kiếm tên bạn, **nội dung bạn định nghĩa** sẽ xuất hiện đầu tiên, chứ không phải người trùng tên nào đó.
## 1.3 Bốn Cách Điển Hình Để Xây Dựng Trang Web Cá Nhân

Trong thực tế, có vô số cách để xây dựng website, chúng ta chỉ giới thiệu bốn cách phổ biến nhất:

**Cách thứ nhất: Viết từ đầu (HTML / CSS / JS)** Đây là con đường truyền thống của ngành khoa học máy tính. Bạn cần gõ code từng chữ một. Ưu điểm là cực kỳ linh hoạt, muốn làm gì cũng được; nhược điểm là ngưỡng vào rất cao, dễ "sụp đổ" khi căn chỉnh style (CSS), không phù hợp với những bạn tập trung vào nội dung.

![](images/image2.png)

**Cách thứ hai: Xây dựng website trực quan (Wix / WordPress)** Giống như "xếp lego". Ưu điểm là kéo thả đơn giản; nhược điểm là thường phải trả phí, code được tạo ra cồng kềnh, không có "chất geek học thuật", rất khó tùy chỉnh sâu.

![](images/image3.png)

**Cách thứ ba: Dựa trên template GitHub (Static Site Generator)** Đây là con đường chủ lưu **được khuyến nghị nhất** trong giới học thuật và geek. Bạn trực tiếp fork template hoàn chỉnh của người khác (như framework Jekyll hoặc Hugo), sau đó chỉ cần chỉnh sửa file cấu hình và nội dung.

![](images/image4.png)

**Cách thứ tư: Vibe Coding (Luồng tạo sinh trực quan bằng AI)** Dựa vào AI Agent có khả năng hiểu thị giác đa phương thức mạnh mẽ, bạn chỉ cần thấy một phong cách trang web nào đó ưa thích trên mạng, chụp màn hình rồi gửi cho AI: "Viết cho tôi một trang web theo hình này". AI có thể ngay lập tức phân tích các yếu tố thị giác trong ảnh và tạo ra code nền tương ứng.

![](images/image5.png)

**Lựa chọn của khóa học này: GitHub Pages + template học thuật + chỉnh sửa bằng AI.** Lý do rất đơn giản:

* **Không tốn chi phí**: Bạn không cần mua server, không cần mua tên miền.
* **Chuyên nghiệp, đẳng cấp**: Template thường được thiết kế bởi các nhà phát triển hàng đầu — tối giản, chuyên nghiệp, tốc độ tải nhanh.
* **Dễ bảo trì**: Bạn chỉ cần viết Markdown (tương tự viết tài liệu trên Notion), AI sẽ tự động tạo trang web cho bạn.
## 1.4 Lộ trình đầy đủ của bài hướng dẫn này

Để quá trình cấu hình vốn khô khan trở nên trực quan hơn, bài hướng dẫn này sẽ triển khai thực hành qua một **case thú vị — "Làm một trang chủ học thuật cho Musk"**.

Elon Musk tuy không phải giáo sư đại học, nhưng ông cũng có không ít "bản trắng kỹ thuật" công khai (như Hyperloop Alpha) và các dự án nổi tiếng (như SpaceX/Tesla). Chúng ta sẽ lấy những tài liệu này làm dữ liệu thử nghiệm, kết hợp với chế độ Vibe Coding của Trae, dẫn bạn chạy thông một lộ trình xây dựng trang web có thể tái sử dụng nhiều lần:

1. **Tìm khung sườn**: Tìm template trang web chất lượng cao trên GitHub và "Fork" (sao chép) về repository của bạn.
2. **Chuẩn bị môi trường**: Kéo code về máy local và cấu hình Trae, đảm bảo AI có thể đọc được project của bạn.
3. **AI lặp và chỉnh sửa**: Thông qua hội thoại với AI, thay "Nguyễn Văn A" trong template bằng "Elon Musk", tải lên CV của ông, đổi "danh sách luận văn" thành "trưng bày bản trắng kỹ thuật", thậm chí nhờ AI đổi màu sắc trang web thành "đỏ sao Hỏa".
4. **Deploy lên mạng**: Đẩy code đã chỉnh sửa trở lại GitHub, lập tức có được một địa chỉ URL có thể truy cập.

Phần này chỉ chịu trách nhiệm vẽ ra bức tranh toàn cảnh. Bây giờ bạn chỉ cần nhớ mạch chính này: **Fork template → AI trang trí → Push lên mạng**. Các chương tiếp theo sẽ hướng dẫn bạn từng bước một.

# 2 Chuẩn bị môi trường
## 2.1 Các công cụ sẽ dùng trong hướng dẫn này

Trong toàn bộ quá trình xây dựng, bạn cần phối hợp sử dụng bốn công cụ (hay nói cách khác là bốn tài nguyên), chúng đảm nhận lần lượt các vai trò "thiết kế thi công", "mặt bằng miễn phí" và "vận chuyển hàng hóa".

* **Một chiếc máy tính**: Windows hoặc Mac đều được. Khác với lập trình Android đòi hỏi bộ nhớ cao, lập trình web rất nhẹ nhàng, một chiếc laptop văn phòng bình thường là đủ để chạy mượt mà.
* **Trae**: Đây là **AI lập trình đồng hành** của bạn (năng suất cốt lõi). Ở chế độ Vibe Coding, bạn không cần thành thạo cú pháp HTML hay CSS, mà chủ yếu dùng ngôn ngữ tự nhiên trong Trae để nói với AI: "Đổi thanh điều hướng thành màu đen", "Đặt ảnh của Musk lên đây" — AI sẽ chịu trách nhiệm viết và chỉnh sửa code.
* **Tài khoản GitHub**: Đây là **"máy chủ miễn phí" và "két an toàn cho code"** của bạn. Bạn cần nó để lưu trữ toàn bộ file của trang web; quan trọng hơn, nhờ tính năng **GitHub Pages** mà nó cung cấp, bạn có thể miễn phí biến code thành một địa chỉ URL có thể truy cập toàn cầu, tiết kiệm chi phí mua máy chủ và tên miền.
* **Môi trường Git**: Đây là **"người giao hàng"** hoạt động phía sau. Dù bạn đã viết xong code trong Trae, bạn vẫn cần Git để "đẩy" code từ máy tính của bạn lên GitHub. Bạn không cần thành thạo các lệnh Git — Trae sẽ gọi Git thay bạn — nhưng máy tính của bạn phải cài sẵn môi trường nền tảng này.
* **Môi trường Ruby**: Đây là **"xưởng gia công trang web"** trên máy tính của bạn. Vì template học thuật mẫu (Jekyll) mà chúng ta dùng chạy dựa trên Ruby, nên có nó bạn mới có thể xem trước "hiệu quả trang trí" của trang web ngay trên máy tính trước khi đưa code lên mạng.
## 2.2 Tải xuống Trae

**Trae** là chiến trường chính để bạn thực hành Vibe Coding. Bạn có thể hiểu đơn giản đây là một **"trình soạn thảo code tích hợp AI siêu mạnh"**. Nó không lạnh lùng như các trình soạn thảo truyền thống, mà giống như một lập trình viên kỳ cựu luôn sẵn sàng ngồi bên cạnh giúp bạn viết code.

* **Địa chỉ tải xuống**: Truy cập trang chủ [https://www.trae.cn](https://www.trae.cn), tải phiên bản phù hợp với hệ điều hành của bạn (Windows hoặc Mac).
* **Cài đặt**: Quá trình cài đặt rất đơn giản, giống như cài bất kỳ phần mềm thông thường nào — chỉ cần nhấp đúp vào file cài đặt rồi nhấn "Tiếp theo" theo hướng dẫn là hoàn tất.

Sau khi chuẩn bị xong công cụ này, trong các bài thực hành tiếp theo, bạn sẽ không còn phải ngồi nhìn chằm chằm vào màn hình code nhàm chán nữa — thay vào đó, bạn mở dự án trực tiếp tại đây, dùng ngôn ngữ tự nhiên trong hộp hội thoại bên phải để điều khiển AI giúp bạn viết code, sửa Bug, thậm chí tái cấu trúc toàn bộ trang.

![](images/image6.png)
## 2.3 Tải xuống Git

**Git là gì?** Nếu trong Vibe Coding, Trae là "AI kỹ sư" chịu trách nhiệm viết code, thì **Git chính là "người đưa hàng" chịu trách nhiệm vận chuyển code**. Bạn cần nó để đóng gói và "đẩy" code bạn đã viết trên máy tính cá nhân lên kho lưu trữ đám mây GitHub một cách an toàn. Nếu không có nó, website của bạn chỉ chạy được trên máy của bạn, người khác sẽ không thể xem được.

Trước đây bạn cần vào trang web chính thức để tải file cài đặt, rồi còn phải cấu hình biến môi trường, rất phiền phức. Bây giờ, chúng ta sẽ để Trae trực tiếp giúp bạn kiểm tra và cài đặt.

**Bước 1: Kiểm tra xem đã cài đặt chưa**

Mở Trae, trong ô Chat (hộp thoại) ở góc dưới bên phải, nhập lệnh sau:

```markdown
请帮我检查当前电脑是否已经安装了 Git。请在终端执行 git --version 命令。
```

* **Trường hợp A (Đã cài đặt)**: Nếu bạn thấy phản hồi dạng `git version 2.xx.x`, xin chúc mừng, bạn có thể bỏ qua bước tải xuống!
* **Trường hợp B (Chưa cài đặt)**: Nếu bạn thấy thông báo "lệnh không tìm thấy" hoặc một loạt thông báo lỗi màu đỏ, hãy tiếp tục đọc phần bên dưới.

![](images/image7.png)

**Bước 2: Cài đặt với sự hỗ trợ của AI**

Đừng đóng Trae, tiếp tục nhập vào hộp thoại:

**Lệnh** **(dành cho người dùng Windows)**:

```markdown
我没有安装 Git。请帮我写出使用 winget 命令行工具自动安装 Git 的指令，并告诉我如何在终端运行它。 
```

**Lệnh (dành cho người dùng Mac):**

```markdown
我没有安装 Git。请告诉我如何通过终端命令行快速安装 Git（例如使用 git 或者是 brew）。
```

Trae sẽ đưa cho bạn một đoạn code (thường là `winget install --id Git.Git`).

Bạn chỉ cần nhấn nút "**Run in Terminal** **(Chạy trong Terminal)**" ở góc trên bên phải của khối code, hoặc sao chép vào terminal ở phía dưới rồi nhấn Enter, nó sẽ tự động tải xuống và cài đặt Git cho bạn như trong phim hacker vậy.

Nếu bạn cho rằng quá trình hỗ trợ bằng AI ở trên vẫn còn chỗ chưa hoàn thiện, bạn có thể tham khảo hướng dẫn này để tải xuống và cài đặt thủ công: [Hướng dẫn chi tiết tải xuống và cài đặt Git](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)
## 2.4 Tải Môi Trường Ruby

Trước khi bắt tay vào viết code, chúng ta còn cần một mảnh ghép cuối cùng. Template trang chủ học thuật được sử dụng trong hướng dẫn này (dựa trên framework Jekyll) được xây dựng bằng ngôn ngữ lập trình Ruby.

Để có thể xem trước và kiểm tra "hiệu ứng trang trí" ngay trên máy tính của mình trước khi đẩy code lên GitHub cho cả thế giới xem, bạn cần cài đặt môi trường Ruby trên máy. Điều này giống như thuê một "phiên dịch viên" thông thạo ngôn ngữ Ruby cho máy tính của bạn. Đừng lo lắng, bạn hoàn toàn không cần học cách viết code Ruby — chỉ cần cài xong là mọi việc còn lại đã có Trae lo.

### 2.4.1 Cài Đặt Trên Windows

**Bước 1: Tải gói cài đặt (chọn mirror trong nước)**

Đối với người dùng Windows, trang chính thức https://rubyinstaller.org/downloads/ cung cấp gói cài đặt một clic, nhưng do môi trường mạng khác nhau, bạn cần nắm một mẹo nhỏ. Trang chính thức khuyên người mới dùng phiên bản **`Ruby+Devkit 3.X.X (x64)`** vì nó đi kèm toolchain biên dịch cần thiết.

*Lưu ý đặc biệt cho người mới*: Thực tế là nếu tải trực tiếp từ trang chính thức, thường bị treo hoặc tải thất bại. Vì vậy, chúng tôi khuyến nghị bạn truy cập trực tiếp vào trang [RubyInstaller for Windows - Mirror trong nước](https://rubyinstaller.cn/) để tải về, tốc độ sẽ nhanh hơn nhiều.

![](images/image8.png)

**Bước 2: Thực hiện cài đặt**

Nhấp đôi vào gói cài đặt đã tải về. Trong trình hướng dẫn cài đặt hiện ra, hãy nhớ tích vào ô **"Add Ruby executables to your PATH"** (Thêm vào biến môi trường hệ thống). Đây là bước quan trọng nhất, nếu không máy tính sẽ "không tìm thấy" phiên dịch viên bạn vừa cài.

Sau khi tích vào, cứ theo hướng dẫn nhấp "Next" mặc định để hoàn tất cài đặt.

![](images/image9.png)

**Bước 3: Cấu hình bộ công cụ phát triển**

Sau khi thanh tiến trình cài đặt chạy xong, một cửa sổ dòng lệnh màu đen sẽ tự động bật lên. Đừng hoảng, chỉ cần gõ số `3` vào vị trí con trỏ (đại diện cho việc cài đặt môi trường cơ bản MSYS2 và toolchain MINGW), rồi nhấn Enter. Kiên nhẫn chờ code trên màn hình chạy xong, cửa sổ sẽ tự đóng.

![](images/image10.png)

**Bước 4: Kiểm tra kết quả**

Đã đến lúc nhờ AI kiểm tra bài cho chúng ta! Mở Trae, trong ô Chat (hộp thoại) ở bên phải, nhập trực tiếp câu lệnh ngôn ngữ tự nhiên sau:

```markdown
Hãy giúp tôi kiểm tra xem máy tính hiện tại đã cài đặt đúng môi trường Ruby chưa. Hãy thực thi lệnh ruby -v trong terminal ở phía dưới và cho tôi biết kết quả.
```

Nếu bạn thấy Trae trả về số phiên bản dạng `ruby 3.x.x`, chúc mừng bạn, cấu hình môi trường Ruby trên Windows đã thành công hoàn toàn!

![](images/image11.png)

### 2.4.2 Cài Đặt Trên Mac

Cấu hình trên hệ thống Mac tương đối có "chất hacker" hơn, thường cần gõ các lệnh dòng lệnh như hacker thực thụ. Nhưng trong chế độ Vibe Coding, bạn không cần tự mở terminal, chỉ cần để Trae đóng vai trò IT vận hành riêng cho bạn là được.

**Bước 1: Đưa ra lệnh "cấu hình một clic"**

Mở Trae, trong ô Chat (hộp thoại) ở bên phải, sao chép và gửi trực tiếp câu lệnh ngôn ngữ tự nhiên dưới đây. Chúng ta giao ba bước "kiểm tra môi trường", "cài trình quản lý (Homebrew)" và "cài Ruby" cho Trae xử lý một lúc:

```markdown
Tôi đang dùng máy Mac, hiện cần cấu hình môi trường phát triển Ruby. Hãy giúp tôi hoàn thành các bước sau:
1. Kiểm tra xem máy tôi đã cài Homebrew chưa. Nếu chưa, hãy giúp tôi thực thi script cài đặt chính thức của Homebrew trong terminal.
2. Sau khi xác nhận Homebrew đã sẵn sàng, hãy thực thi brew install ruby trong terminal để cài Ruby.
3. Sau khi hoàn tất, thực thi lệnh ruby -v để kiểm tra xem đã cài thành công chưa.
Hãy hướng dẫn tôi từng bước, và khi cần hãy trực tiếp cung cấp cho tôi các lệnh terminal có thể nhấp để chạy.
```

Sau khi nhận lệnh, Trae sẽ bắt đầu làm việc và tạo ra các khối code có nút chạy trong hộp thoại. Bạn chỉ cần thực hiện theo từng bước là xong.

**⚠️ Người mới bắt buộc phải đọc:**

Khi cài Homebrew, terminal thường sẽ hiện một dòng chữ tiếng Anh (ví dụ `Password:`), yêu cầu bạn nhập mật khẩu đăng nhập Mac.

**Chú ý!** Khi nhập mật khẩu trong terminal Mac, màn hình sẽ không hiển thị bất kỳ ký tự hay dấu hoa thị nào (trông như chưa nhập gì). Đừng hoảng loạn, đây là cơ chế chống nhòm mật khẩu bình thường. Cứ gõ mù mật khẩu đăng nhập của bạn rồi nhấn Enter là được.

**Bước 2: Kiểm tra kết quả**

Tương tự, sau khi cài đặt xong, bạn có thể quay lại Trae. Trong ô Chat (hộp thoại) ở bên phải, nhập lệnh:

```markdown
Tôi vừa cài Ruby trên Mac thông qua brew. Hãy giúp tôi thực thi lệnh ruby -v trong terminal, kiểm tra xem đã cài đúng và cấu hình biến môi trường chưa.
```

Khi bạn thấy dòng chữ dạng `ruby 3.x.x` xuất hiện trên màn hình terminal phía dưới, có nghĩa là "nhà máy trang web cục bộ" đã hoàn công. Mac của bạn đã sẵn sàng bắt đầu Vibe Coding bất cứ lúc nào!
## 2.5 Đăng ký tài khoản GitHub

**GitHub là gì?** Nếu Git là người đưa thư, thì **GitHub chính là "kho lưu trữ đám mây" kiêm "phòng trưng bày"**. Nó không chỉ giúp bạn lưu trữ code miễn phí, mà quan trọng hơn, tính năng **GitHub Pages** của nó có thể biến code của bạn thành một URL có thể truy cập toàn cầu hoàn toàn miễn phí. Đây là nền tảng lưu trữ code lớn nhất thế giới hiện nay, và sở hữu một tài khoản GitHub cũng là "thẻ thông hành" để bước vào cộng đồng công nghệ.

**Các bước đăng ký:**

1. **Truy cập trang chủ**: Mở [https://github.com/](https://github.com/).
2. **Nhấn đăng ký**: Nhấn vào **"Sign up"** ở góc trên bên phải.

![](images/image12.png)

3. **Điền thông tin**:
4. **Email**: Nhập địa chỉ email thật của bạn.
5. **Password**: Đặt một mật khẩu mạnh.
6. **Username (quan trọng!)**: **Hãy đặt tên thật cẩn thận!** Vì URL trang cá nhân của bạn sẽ là **`https://tên-người-dùng-của-bạn.github.io`**. Nên dùng phiên âm tên tiếng Anh, ID quen dùng hoặc tên ngắn gọn gồm chữ cái và số, **đừng** đặt kiểu `a1b2c3d4` lộn xộn, nếu không URL trang cá nhân của bạn sẽ rất khó nhớ.
7. **Xác minh và kích hoạt**: Hoàn thành xác minh captcha (thường là xoay hình ảnh hoặc chọn thiên hà xoắn ốc), sau đó vào hộp thư kiểm tra mã xác minh.

![](images/image13.png)

Sau khi đăng ký xong, bạn đã sở hữu một "mảnh đất" riêng trên Internet — các chương tiếp theo, chúng ta sẽ bắt đầu xây dựng trên mảnh đất đó!

![](images/image14.png)

# 3 Từ template đến trang đầu tiên có thể truy cập

Mọi thứ đã sẵn sàng. Hai chương trước chúng ta đã chuẩn bị xong công cụ, chương này chúng ta sẽ chính thức "cắm cờ" trên Internet. Nhiệm vụ của chương này rất đơn giản: **chưa cần quan tâm đến "trang trí" hay nội dung, hãy dựng xong "bộ khung" của website và lấy được đường link truy cập trước.**

Chúng ta sẽ trực tiếp Fork một template học thuật hoàn chỉnh, tận dụng khả năng tự động hóa của GitHub Pages để khởi chạy nó trong vòng 20 phút. Sau khi hoàn thành, bạn sẽ có một đường link có thể truy cập toàn cầu.
## 3.1 Lấy Template Trang Web

Trong chế độ Vibe Coding, bạn không cần viết HTML từ đầu. Trên GitHub có hàng nghìn template mã nguồn mở chất lượng cao, bạn chỉ cần "mượn" một cái về và chỉnh sửa thành tên của mình là xong.

**Bước 1: Tìm template**

Ở đây, chúng tôi đã tuyển chọn cho bạn một template cổ điển có cấu trúc rõ ràng, phù hợp để trình bày học thuật: https://github.com/luost26/academic-homepage?tab=readme-ov-file (dựa trên framework Jekyll). *(Tất nhiên, bạn cũng có thể tìm kiếm **`academic-homepage`** trên **GitHub** để tìm phong cách khác mà bạn yêu thích, nhưng để theo sát hướng dẫn, nên dùng template trên trước)*

Chúng tôi cũng chuẩn bị cho bạn một số gợi ý template khác:

* Minimal Light – theme trang cá nhân (đơn giản, dùng được ngay): https://github.com/yaoyao-liu/minimal-light?
* Minimal Mistakes (linh hoạt, đa dụng): [https://github.com/mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes?utm_source=chatgpt.com)
* Pixyll (đơn giản, nhẹ nhàng): https://github.com/johno/pixyll
* Hydejack (toàn năng cho trang cá nhân): https://github.com/hydecorp/hydejack
* Forty Jekyll Theme (phong cách lưới ô): https://github.com/andrewbanchich/forty-jekyll-theme
* Leonids (blog hai cột cổ điển): https://github://github.com/renyuanz/leonids
* YAT (phong cách phẳng hiện đại): https://github.com/jeffreytse/jekyll-theme-yat

**Bước 2: Fork (nhân bản) dự án**

Truy cập trang chủ repository đích, nhấn nút **Fork** ở góc trên bên phải của trang. Một hộp xác nhận sẽ hiện ra, bạn nhấn trực tiếp vào **Create Fork**.

* Giải thích: Thao tác này tương đương với việc sao chép toàn bộ "kho mã nguồn" của người khác về tài khoản GitHub của bạn. Từ lúc này, bạn là chủ sở hữu của trang web đó.

![](images/image15.png)

**Bước 3: Đổi tên repository (bước quan trọng nhất)**

Đổi tên repository (Repository name) thành: `tên-người-dùng-của-bạn.github.io`

**⚠️ Người mới bắt buộc phải đọc**: Đây là quy tắc bắt buộc của GitHub Pages! Ví dụ, nếu tên người dùng GitHub của bạn là `musk-fan`, thì tên repository **bắt buộc** phải là `musk-fan.github.io`. Chỉ như vậy GitHub mới tự động cấp cho bạn tên miền miễn phí. Nếu tên không đúng, trang web sẽ không thể mở được về sau.

![](images/image16.png)
## 3.2 Lấy URL dự án Github

Sau khi chỉnh sửa tên xong, bạn cần lấy "phiếu nhận hàng" của kho lưu trữ này.

1. Quay lại trang chủ kho lưu trữ (nhấn vào tab **Code** ở góc trên bên trái).
2. Nhấn vào nút **Code** màu xanh lá.
3. Đảm bảo chọn tab **HTTPS**.
4. Nhấn nút sao chép, sao chép URL kết thúc bằng `.git` (ví dụ: `https://github.com/musk-fan/musk-fan.github.io.git`).

![](images/image17.png)
## 3.3 Kéo dự án về máy local

Trong quá khứ, lập trình viên cần gõ các lệnh Git phức tạp trong cửa sổ đen để tải code về. Nhưng trong thời đại Vibe Coding, chúng ta có Trae. Bạn chỉ cần nói với AI: "Tôi muốn cái này, giúp tôi lấy về."

**Bước 1: Chuẩn bị**

Tạo một thư mục mới trên máy tính của bạn (ví dụ đặt tên là `MyWebsite`), sau đó nhấp chuột phải và chọn "Mở bằng Trae" (hoặc mở Trae rồi chọn Open Folder).

![](images/image18.png)

**Bước 2: Thực hiện lệnh clone**

Sau khi Trae mở, gọi hộp thoại AI ở bên phải (Chat) và nhập lệnh ngôn ngữ tự nhiên sau:

```
请帮我把远程 GitHub 仓库克隆到当前文件夹。 
仓库地址：粘贴你刚才复制的 URL，例如 https://github.com/musk-fan/musk-fan.github.io.git
执行要求：请直接在终端执行 git clone 命令。
```

**Bước 3: Xác nhận tải về**

Trae sẽ tự động mở terminal ở phía dưới và thực thi lệnh. Chờ vài giây, khi bạn thấy thư mục bên trái xuất hiện thêm các file như `_config.yml`, `index.html`, đó là dấu hiệu dự án đã được "chuyển" thành công về máy tính của bạn!

![](images/image19.png)
## 3.4 Xem trước trang web trên máy tính cục bộ

Mã nguồn đã được kéo về máy, môi trường (Ruby) cũng đã cài đặt xong. Trước khi chỉnh sửa trang web chính thức, bạn phải "nghiệm thu" trên máy tính của mình trước. Điều này giống như khi cải tạo nhà, bạn phải sắp xếp nội thất trong phòng mẫu trước, cảm thấy hài lòng rồi mới chính thức mở cửa.

Điều này giống như khi cải tạo nhà, bạn phải sắp xếp nội thất trong phòng mẫu trước, cảm thấy hài lòng rồi mới chính thức mở cửa. Nhờ môi trường Ruby đã cài đặt ở **mục 2.4**, quá trình này trở nên rất đơn giản.

**Bước 1: Cài đặt các phụ thuộc**

Trang web Jekyll cần rất nhiều plugin (Gems) mới có thể chạy được. Bước này giống như mua sắm toàn bộ nội thất theo danh sách. **Tuy nhiên, hãy lưu ý,** do môi trường mạng, việc tải xuống trực tiếp có thể bị treo. Hãy để Trae giúp bạn **chuyển sang mirror tốc độ cao trong nước** và cài đặt.

Nhập lệnh sau vào khung Chat của Trae:

```markdown
我需要安装 Jekyll 依赖。考虑到网络环境，请先帮我将 Gemfile 文件中的 source 修改为国内镜像 https://gems.ruby-china.com/。 修改完成后，请在终端执行 bundle install 命令来安装所有依赖。
```

**Bước 2: Khởi động dịch vụ cục bộ**

Bây giờ, bạn sẽ khởi động một "máy chủ cục bộ nhỏ" để mô phỏng trạng thái hoạt động của trang web. Tiếp tục đưa ra lệnh cho Trae:

```markdown
依赖安装完成了。请帮我在终端启动 Jekyll 本地预览服务。 请执行 bundle exec jekyll serve 命令。
```

Sau khi terminal chạy vài giây, bạn sẽ thấy thông báo tương tự như `Server address: ``http://127.0.0.1:4000/academic-homepage/```.

1. **Mở trình duyệt**: Nhấp vào liên kết đó, hoặc nhập trực tiếp liên kết này `http://127.0.0.1:4000/academic-homepage/` vào thanh địa chỉ trình duyệt.
2. **Chứng kiến điều kỳ diệu**: Nhìn xem! Trang web của bạn đã chạy trong trình duyệt. Dù tên hiển thị hiện tại vẫn là của tác giả template, nhưng nó đã thực sự đang chạy trên máy tính của bạn.

Tiếp theo, bất cứ nội dung nào bạn thay đổi, chỉ cần nhấn `Ctrl+S` để lưu rồi làm mới trình duyệt, bạn sẽ thấy **nội dung trang web thay đổi theo**

![](images/image20.png)

Sau khi xác nhận không có vấn đề gì ở máy cục bộ, bạn có thể chuyển sang chương tiếp theo và bắt đầu "đại tu" trang web này thành hình dạng của "Musk".

# 4 AI hỗ trợ chỉnh sửa nội dung

Để giúp bạn trải nghiệm nhanh toàn bộ quy trình, chúng ta sẽ không sử dụng thông tin thật của bản thân (tránh lo lắng về rò rỉ quyền riêng tư), mà lấy **Elon Musk làm ví dụ**, giúp ông ấy tạo một trang chủ học thuật. Điều này không chỉ giúp bạn thoát khỏi áp lực nhàm chán của việc "viết CV", tập trung vào trải nghiệm niềm vui xây dựng trang web theo phong cách Vibe Coding, mà còn có thể xem thử các tài liệu kỹ thuật hardcore của "Iron Man Thung lũng Silicon" (như Hyperloop Alpha) trông sẽ cool ngầu đến mức nào khi được treo trên trang web học thuật. Chúng ta sẽ hoàn thành toàn bộ vòng khép kín từ "lấy template" đến "trang web ra mắt", tự tay tạo ra một không gian giới thiệu cá nhân đẳng cấp thế giới.

Tiếp theo, hãy theo nhịp của tôi và gửi lệnh đầu tiên tới AI.
## 4.1 Ràng Buộc Tiền Đề Thống Nhất

Đây là "Prompt tiền đề tổng thể", chỉ cần gửi một lần duy nhất. Tác dụng của nó là đặt ra quy tắc cho AI, ngăn AI "tự do sáng tạo" làm sụp đổ cấu trúc website. Hãy sao chép trực tiếp và gửi cho Trae:

```
Bạn hiện là người bảo trì site cho template "GitHub Pages + Jekyll học thuật".
Repository hiện tại là một trang chủ học thuật chạy bằng Jekyll (bao gồm _config.yml, _data, _layouts, v.v.).
Các chỉnh sửa của bạn phải tuân theo các nguyên tắc sau:
1. Mỗi bước chỉ thực hiện "mục tiêu giai đoạn hiện tại", nghiêm cấm làm trước nội dung các giai đoạn sau
2. Không chỉnh sửa cấu trúc site, không giới thiệu plugin mới, không thay đổi phong cách theme
3. Tất cả nội dung phải được Jekyll render bình thường
4. Tất cả thông tin danh tính mang "phong cách mô phỏng học thuật", không được dùng ngôi thứ nhất
5. Không giới thiệu các bài báo IEEE / Nature rõ ràng là hư cấu
6. Nếu thông tin không chắc chắn, hãy sử dụng "sự kiện được công nhận rộng rãi" hoặc "chú thích mô phỏng học thuật hợp lý"
```
## 4.2 Xây dựng trang chủ phong cách Musk (Phần nội dung)

### 4.2.1 "Lệnh tổng" đầu tiên: Thay thế danh tính

Việc đầu tiên bạn cần giải quyết là câu hỏi "Tôi là ai?". Template hiện tại chứa đầy thông tin của tác giả gốc, bạn cần dùng AI để thay thế tất cả chỉ bằng một lệnh.

**Bước 1: Chuẩn bị tài nguyên**

Đặt các file ảnh tôi cung cấp (`University_of_Pennsylvania.jpg`, `Queen_University.jpg`) vào đúng vị trí trong thư mục dự án (thường là `/assets/images/badges/`).

![](images/image21.png)![](images/image22.png)

**Bước 2: Đưa ra lệnh**

Trong hộp chat Chat ở bên phải Trae, nhập đoạn prompt dưới đây. Lưu ý, bạn không cần tự tìm từng dòng code, chỉ cần nói thẳng yêu cầu cho AI:

```
一、目标：将当前学术主页的"人物身份"替换为 Elon Musk（埃隆·马斯克），仅修改基础信息。
二、具体要求：
1.姓名：Elon Musk
2.职业身份定位为：
    Technology Entrepreneur
    Engineer
    Founder & CEO of SpaceX
    CEO of Tesla, Inc.
3.教育背景（Education）：
    Queen's University（物理与经济学，未完成）（图片路径在/assets/images/badges/Queen_University.jpg）
    University of Pennsylvania（B.S. in Physics, B.A. in Economics）（图片路径在/assets/images/badges/University_of_Pennsylvania.jpg）
4.研究 / 关注方向（Research Interests，可模拟为）：
    Space Systems Engineering
    Sustainable Energy Systems
    Artificial Intelligence & Robotics
    Large-scale Technological Innovation
5.荣誉（Honors & Recognition）：
    Time Person of the Year (2021)
    Fellow of the Royal Society (FRS)
    Listed in Forbes Billionaires (multiple years)
6.约束：
    不添加"论文 / publications"
    不虚构 IEEE、Nature、Science 论文
    学术风格表述，避免商业宣传口吻
    保持原有字段结构不变，仅替换内容
```

Bạn có thể thấy lúc này Trae đã hoàn thành tất cả các yêu cầu chỉnh sửa của chúng ta

![](images/image23.png)

**Bước 3: Làm mới trình duyệt local**

Lúc này bạn làm mới trình duyệt local và thấy tất cả đã được thay thế đúng

![](images/image24.png)

### 4.2.2 Tối ưu và lặp lại: Thêm "bài báo" và dự án

Vì Elon Musk không phải giáo sư đại học truyền thống, ông rất ít đăng bài trên《Nature》hay《Science》. Tuy nhiên, với tư cách là "kỹ sư trưởng", ông đã phát hành nhiều "white paper" (bạch thư kỹ thuật) và "master plan" (kế hoạch tổng thể) có hàm lượng kỹ thuật rất cao.

Trong ngữ cảnh trang chủ học thuật, bạn có thể định nghĩa lại khái niệm "Publications" (ấn phẩm) thành **`"Technical White Papers & Visionary Plans"`** (Bạch thư kỹ thuật & Kế hoạch tầm nhìn). Điều này không hề gượng ép, mà còn rất phù hợp với hình tượng "người thực chiến" của ông.

![](images/image25.png)

**Bước 1: Chuẩn bị tài nguyên**

Tải về các ảnh bìa tôi cung cấp (lần lượt là `Hyperloop_Alpha_sketch.jpg`, `SpaceX_Starship.jpg`, `Neuralink_sewing_machine_robot.jpg`), đặt vào thư mục `/assets/images/covers/` (và xóa các ảnh mẫu có sẵn trong thư mục đó).

![img](images/image26.png)![img](images/image27.png)![](images/image28.png)

**Bước 2: Đưa ra lệnh**

Gửi đoạn prompt dưới đây cho Trae để nó giúp bạn tái cấu trúc dữ liệu:

```
一、角色设定：你是一个精通 Jekyll 和 Liquid 语法的静态网站开发专家。
二、任务目标：
修改网站首页或导航栏的板块标题。
当前的文件结构是按年份划分子文件夹的（例如 _publications/2023/xxx.md）。按照指定的格式创建三个新的 Markdown 文件，用于展示 Elon Musk 的技术白皮书和愿景规划。
三、具体步骤与要求：
1.修改板块标题
    请在全局搜索字符串 "Selected Publications"（它可能出现在 index.html、_config.yml 或_pages/publications.md 中）。 请将其替换为："Technical White Papers & Visionary Plans"。
2.重构出版物数据（关键步骤）
    清空 _publications 文件夹下的所有旧内容（请删除 2023, 2024 等旧年份文件夹）。
    创建 三个新的年份文件夹：_publications/2013/，_publications/2017/，_publications/2019/。
    在对应的年份文件夹中，分别创建以下三个 Markdown 文件。
3.严格遵守文件格式
重要：必须严格遵守以下 YAML Front Matter 格式，不要编造新的字段名：
    - title:          "论文标题"
    - date:           YYYY-MM-DD HH:MM:SS +0800
    - selected:       true
    - pub:            "发表场所/期刊名"
    - pub_date:       "年份"
    - abstract: >-    摘要内容... 
    - cover:          /assets/images/covers/cover_name.jpg
    - authors:        - 作者1- 作者2
    - links:Paper:    https://论文链接
4.请生成以下三个文件的完整代码（包含路径说明）：
(1) 路径: _publications/2013/2013-hyperloop.md
    Title: Hyperloop Alpha
    Date: 2013-08-12
    Pub: Tesla Blog (Open Source)
    Pub_date: "2013"
    Abstract: A proposal for a fifth mode of transport, utilizing a low-pressure tube and air bearings to achieve subsonic speeds.
    cover: /assets/images/covers/Hyperloop_Alpha_sketch.jpg
    Authors: Elon Musk, SpaceX & Tesla Teams
    Link: https://www.tesla.com/sites/default/files/blog_images/hyperloop-alpha.pdf
(2) 路径: _publications/2017/2017-mars.md
    Title: Making Humans a Multi-Planetary Species
    Date: 2017-06-01
    Pub: New Space
    Pub_date: "2017"
    Abstract: Detailed architecture of the Starship system designed to colonize Mars. This paper outlines the technical challenges to establish a self-sustaining city.
    cover: /assets/images/covers/SpaceX_Starship.jpg
    Authors: Elon Musk
    Link: https://www.liebertpub.com/doi/10.1089/space.2017.29009.emu
(3) 路径: _publications/2019/2019-neuralink.md
    Title: An Integrated Brain-Machine Interface Platform
    Date: 2019-10-16
    Pub: Journal of Medical Internet Research
    Pub_date: "2019"
    Abstract: We have built arrays of small and flexible electrode threads, with as many as 3,072 electrodes per array, and a neurosurgical robot.
    cover: /assets/images/covers/Neuralink_sewing_machine_robot.jpg
    Authors: Elon Musk, Neuralink
    Link: https://www.jmir.org/2019/10/e16194/
执行要求： 请直接给出这三个文件的完整内容代码，以及你修改标题所涉及的那个文件的修改代码。
```

**Bước 3: Làm mới trình duyệt local**

Sau khi chờ build xong, bạn sẽ thấy danh sách bài báo vốn khô khan trước đây đã biến thành một "triển lãm công nghệ tương lai" đầy ấn tượng.

![](images/image33.png)

### 4.2.3 Hoàn thiện cuối cùng: Liên kết mạng xã hội và ảnh đại diện

Đây là bước quan trọng để đi "từ 90 điểm lên 100 điểm". Thanh sidebar lúc này có thể vẫn còn link GitHub mặc định của template hoặc email sai. Bạn cần trỏ chúng đến tài khoản mạng xã hội thực của Musk (chủ yếu là X.com).

**Bước 1: Chuẩn bị**

Vào Google tìm một tấm ảnh đẹp của Musk, lưu thành `portrait.png` (hoặc kéo ảnh vào thư mục `images/photo` ở bên trái Trae để ghi đè ảnh cũ).

**Bước 2: Sao chép prompt sau và gửi cho Trae**

```
一、角色设定：你是一个追求细节的 Jekyll 网站开发专家。
二、任务目标：完成网站侧边栏（Sidebar）和个人信息配置的最终修改。我们需要将作者头像、简介和社交链接全部更新为 Elon Musk 的真实信息。
    请先扫描项目结构，找到控制作者信息的配置文件。
三、请执行以下修改：
1. 头像路径修正 (Avatar)
    我已经上传了一张名为 portrait.png 的新图片到 images/ 或 assets/images/ 文件夹下。
请将配置文件中的 avatar 路径修改为指向这张新图片（请确保相对路径正确，例如 /images/portrait.png）。
2. 社交链接清洗 (Social Links) 请更新或移除侧边栏的社交图标链接：
    Email: 修改为 elon@spacex.com（或者如果字段允许，请直接注释掉/移除该字段以防骚扰）。
    Twitter / X: 修改为 https://x.com/elonmusk (这是核心链接)。
    GitHub: 修改为 https://github.com/tesla (指向 Tesla 开源仓库) 或直接移除。
    Google Scholar: 必须移除（他不维护这个）。
    LinkedIn / ResearchGate: 如果存在，请全部移除。
输出要求： 请直接给出配置文件修改后的完整代码片段。
```

**Bước 3: Làm mới trình duyệt local**

1. Nhìn vào sidebar xem đã hiện ảnh đẹp chưa? Nhấn vào icon Twitter có chuyển đến X.com không?

Lúc này trên máy local, bạn đã có một trang chủ học thuật cá nhân hoàn chỉnh, chuyên nghiệp và đậm chất "phong cách Musk".

![](images/image34.png)
## 4.3 Tùy Chỉnh UI Thổi Hồn Vào Giao Diện (Phong Cách)

Nội dung trang web hiện tại tuy đã đúng, nhưng trông vẫn như một "bản CV in ra giấy", thiếu cảm giác công nghệ. Trong chế độ Vibe Coding, bạn không cần hiểu CSS, chỉ cần nói với AI "cảm giác" bạn muốn.

**Ví dụ tình huống**: Nếu bạn thấy nền xám quá tẻ nhạt và muốn đổi sang "đỏ sao Hỏa". Hãy hỏi thẳng Trae: *"Tôi muốn đổi màu nền thanh bên thành đỏ đậm (#8B0000) để thể hiện cảm giác sao Hỏa. Tôi cần chỉnh sửa file **CSS** hay SCSS nào? Hãy cho tôi code luôn."*

![](images/image35.png)

Nếu bạn thích phong cách "SpaceX Dashboard" trong hình trên, có thể sao chép trực tiếp đoạn prompt "cấp độ designer" dưới đây:

```
Một, Vai trò: Bạn là một UI designer hàng đầu theo trường phái "Swiss International Style", thành thạo thiết kế giao diện theo phong cách Notion, Linear hoặc Apple.
Hai, Mục tiêu: Hãy viết lại toàn bộ CSS/SCSS, tạo ra một trang chủ học thuật tối giản theo phong cách "SpaceX Dashboard". Từ khóa cốt lõi: trong suốt, kiềm chế, chính xác.
Ba, Thực hiện các Override style cụ thể sau:
1. Typography toàn cục (Typography is King)
Font chữ: Bỏ serif cũ. Bắt buộc đổi font toàn site sang chuỗi sans-serif hệ thống: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif.
Line height: Tăng cảm giác thoáng cho nội dung, đặt line-height: 1.75.
Màu sắc:
    Tiêu đề chính: #111111 (gần đen thuần).
    Màu nội dung: #333333 (xám đậm).
    Thông tin phụ (ngày/trích dẫn): #666666 (xám trung).
2. Thanh điều hướng tối giản (Clean Header)
Nền: Bỏ nền đen cũ, đổi thành nền trắng thuần (#FFFFFF) hoặc trắng bán trong suốt với Gaussian blur (rgba(255, 255, 255, 0.9) + backdrop-filter: blur(10px) nếu được hỗ trợ).
Viền: Chỉ giữ một đường viền dưới cực mỏng border-bottom: 1px solid #EAEAEA.
Chữ: Link điều hướng dùng xám đậm #333333, chỉ đổi thành đen và in đậm khi hover.
3. Bỏ card, trả về nội dung (Remove Cards)
Xóa nền và bóng đổ của thanh bên trái và card【About me】(box-shadow: none, background: transparent). Để chữ nổi thẳng trên nền trang — đây là cách làm cao cấp nhất.
Tăng khoảng cách: Tăng mạnh margin-bottom giữa các section (ví dụ 80px), dùng khoảng trắng để phân tách nội dung thay vì viền.
4. Sử dụng màu thương hiệu một cách kiềm chế (Accent Color)
Toàn site chỉ dùng Tesla Red (#E82127) cho Links và nút quan trọng.
Style link: Bỏ gạch chân, chỉ đổi màu. Khi hover thêm khối nền đỏ nhạt (background: rgba(232, 33, 39, 0.05)).
5. Tinh chỉnh ảnh đại diện
Giữ hình tròn (border-radius: 50%).
Bỏ viền: Tối giản thực sự không cần viền.
Chỉ giữ một bóng đổ rất nhạt: box-shadow: 0 10px 30px rgba(0,0,0,0.08).
Yêu cầu thực thi: Hãy phân tích file _sass hoặc CSS, không vá code cũ, mà trực tiếp đưa ra block code reset và override các style trên.
```
## 4.4 Thay thế bằng thông tin của bạn (Phần tùy chỉnh)

Chúc mừng bạn! Khi đã chạy thông quy trình "trang chủ Elon Musk" ở trên, thực ra bạn đã nắm được bí quyết cốt lõi của Vibe Coding để xây dựng website. Bây giờ, để biến "căn hộ mẫu" này thành ngôi nhà của riêng bạn, thực sự chẳng có gì khó cả.

Bạn không cần làm lại từ đầu, chỉ cần lặp lại các bước trên, nhưng về mặt chiến lược chúng ta có thể linh hoạt hơn một chút:

**Bước 1: Thay thế vật lý (ảnh đại diện và thông tin cơ bản)**

Đây là bước đơn giản nhất, vẫn theo quy tắc cũ:

1. **Đổi ảnh**: Trong thanh file bên trái của Trae, tìm `assets/images/`, kéo ảnh chứng minh thư của bạn vào đó, ghi đè lên file `portrait.png`.
2. **Đổi tên**: Nói với Trae: "Hãy giúp tôi thay thế toàn bộ Elon Musk trên website thành [tên của bạn]".

**Bước 2: Tiền xử lý bằng AI (Nhờ ChatGPT/Gemini giúp sắp xếp)**

Trae giỏi viết code, nhưng nếu bạn ném thẳng một file PDF CV lộn xộn cho nó, nó có thể bị rối.

**Vì vậy cách hiệu quả hơn là:** Dùng AI giỏi xử lý văn bản dài (như ChatGPT, Gemini, Kimi) để "định dạng" CV của bạn trước.

Bạn có thể gửi cho ChatGPT câu lệnh như sau:

```
Thiết lập vai trò: Bạn là một chuyên gia lên kế hoạch nội dung trang web học thuật chuyên nghiệp.
Mục tiêu nhiệm vụ: Tôi sẽ gửi cho bạn CV cá nhân của tôi (Resume/CV). Hãy giúp tôi trích xuất thông tin quan trọng và sắp xếp thành định dạng Markdown có cấu trúc rõ ràng, phù hợp để điền trực tiếp vào website tĩnh.
Hãy sắp xếp và chỉnh sửa theo đúng 5 module sau (nếu không có nội dung liên quan, hãy để trống):
1. Thông tin cơ bản (Profile)
Name: Họ và tên đầy đủ của tôi.
Tagline: Nhãn nghề nghiệp một câu (ví dụ: CS Student @ XX Univ | AI Enthusiast).
Bio: Giới thiệu ngôi thứ ba 50-100 từ, tóm tắt background và kỹ năng cốt lõi của tôi (giọng văn chuyên nghiệp, học thuật).
Socials: Trích xuất email, GitHub, LinkedIn, link blog, v.v.
2. Học vấn (Education)
Liệt kê: tên trường, bằng cấp (ví dụ B.S. in CS), thời gian bắt đầu và kết thúc.
Bổ sung: nếu có GPA hoặc các môn học cốt lõi, hãy liệt kê riêng một dòng.
3. Dự án tiêu biểu (Selected Projects) — Quan trọng! Trích xuất 2-3 dự án nổi bật nhất, mỗi dự án bao gồm:
Title: Tên dự án.
Tech Stack: Công nghệ sử dụng (ví dụ Python, React, PyTorch).
TL;DR: Một câu tóm tắt dự án làm gì.
Description: 2-3 đóng góp cốt lõi (dùng phương pháp STAR để chỉnh sửa: Tình huống + Nhiệm vụ + Hành động + Kết quả).
Image Placeholder: Đặt trước một tên file ảnh (ví dụ project_name.jpg).
4. Bài báo/Xuất bản (Publications/Articles) Nếu có bài báo hoặc bài viết kỹ thuật, hãy trích xuất:
Title: Tiêu đề.
Venue: Tên hội nghị/tạp chí/nền tảng đăng bài.
Date: Thời gian xuất bản (chỉ cần năm).
Abstract: Tóm tắt một câu.
5. Bộ kỹ năng (Skills)
Phân loại và sắp xếp: ngôn ngữ lập trình, framework/công cụ, các kỹ năng khác.
Yêu cầu đầu ra: Không giải thích quá trình, xuất trực tiếp nội dung Markdown đã được sắp xếp.
```

Sau khi có được **văn bản thuần túy** đã được sắp xếp này, hãy đưa cho Trae, độ chính xác sẽ tăng lên 100%.

![](images/image36.png)![](images/image37.png)

**Bước 3: Thay thế nội dung cốt lõi (Hai con đường)**

Ở bước này, tùy theo sở thích của bạn, bạn có thể chọn hai chế độ Vibe Coding khác nhau:

1. **Chế độ A: Điều hướng qua AI, chỉnh sửa thủ công (Dành cho bạn muốn hiểu cấu trúc)**

 Nếu bạn muốn biết từng chữ được sửa ở đâu, có thể hỏi Trae:

```markdown
"Tôi muốn sửa phần 'Học vấn', hãy cho tôi biết đường dẫn file tương ứng ở đâu? Code nằm ở những dòng nào?"
```

Trae sẽ cho bạn biết trong **hộp chat**: "File bạn cần sửa là `_pages/about.md`, code nằm ở dòng XX..." và hiển thị bản xem trước code sau khi sửa.

Bạn tự tìm và mở file đó trong thanh file bên trái, sau đó tham khảo gợi ý của Trae, điền nội dung mà ChatGPT đã giúp bạn sắp xếp vào như làm bài điền chỗ trống.

![](images/image38.png)

2. **Chế độ B: Tự động hoàn toàn (Dành cho bạn đề cao hiệu quả)**

Nếu bạn thấy việc tìm file quá phiền phức, hãy ném thẳng thông tin đã sắp xếp cho Trae:

```markdown
"Đây là phần 'Học vấn' và 'Kinh nghiệm dự án' tôi đã sắp xếp (dán nội dung Markdown). Hãy giúp tôi thay thế trực tiếp nội dung tương ứng trên website hiện có, giữ nguyên định dạng bố cục ban đầu."
```

# 5 Triển khai lên mạng
## 5.1 Triển khai lên Github Pages

**Bước 1: Bật GitHub Actions (build trên đám mây)**

Quay lại trang web GitHub của bạn:

1. Nhấp vào **Settings** ở phía trên cùng của repository.
2. Tìm và nhấp vào **Pages** trong thanh bên trái.
3. Bên dưới **Build and deployment**, chuyển tùy chọn **Source** từ `Deploy from a branch` sang **`GitHub Actions`**.

![](images/image39.png)

**Bước 2: Tự động cấu hình workflow Jekyll**

Sau khi chuyển đổi, bạn sẽ thấy giao diện thay đổi. GitHub sẽ tự động nhận diện đây là một dự án Jekyll.

1. Tìm thẻ **Jekyll** (By GitHub Actions).
2. Nhấp vào nút **Configure** trên thẻ đó.

![](images/image40.png)

**Bước 3: Commit file cấu hình**

Sau khi nhấp, bạn sẽ được chuyển đến một trang toàn mã (đây là file cấu hình `.yml`, GitHub đã viết sẵn cho bạn, dùng để build trang web Jekyll).

1. **Không chỉnh sửa bất kỳ mã nào**.
2. Trực tiếp nhấp vào nút màu xanh lá **`Commit changes...`** ở góc trên bên phải trang.
3. Trong hộp xác nhận hiện ra, nhấp **`Commit changes`** một lần nữa.

![](images/image41.png)

![](images/image42.png)

**Bước 4: Chờ đợi và kiểm tra kết quả**

Sau khi commit xong, máy chủ GitHub sẽ bắt đầu tự động xử lý.

1. Nhấp vào tab **Actions** trên thanh menu phía trên.
2. Bạn sẽ thấy một tác vụ có tên `Deploy Jekyll site to Pages` đang chạy.
3. Kiên nhẫn chờ 1-2 phút cho đến khi vòng tròn màu vàng chuyển thành **dấu tích màu xanh lá (✅)**.

![](images/image43.png)

**Bước 5: Truy cập trang web của bạn**

Khi vòng tròn đã chuyển thành **dấu tích màu xanh lá**, bạn có thể truy cập địa chỉ **`<a data-lark-is-custom="true" href="https://luahan77m.github.io/">https://tên-người-dùng-của-bạn.github.io/</a>`** để **xem** hiệu ứng mặc định của template này.

Chúc mừng bạn! Bạn đã triển khai thành công một trang chủ học thuật của riêng mình, có thể truy cập từ khắp nơi trên thế giới.
## 5.2 Commit thay đổi & Cập nhật trang chủ

Chúng ta sẽ commit tất cả nội dung đã chỉnh sửa ở local lên Github, để trang cá nhân của Musk này có thể được cả thế giới nhìn thấy.

1. Nhấp vào **Source Control** ở thanh bên trái.
2. Thêm tất cả nội dung trong **Changes** vào **Staged Changes**.
3. Để Trae tự động tạo nội dung commit, nhấp vào **Commit**.
4. Nhấp vào **Sync Changes (Push)** để đẩy lên nhánh main.
5. Chờ một lát cho đến khi tất cả các tiến trình trong tab **Actions** đều hoàn thành.

![](images/image44.png)

Bây giờ, chúc mừng bạn! Mở **`https://tên-người-dùng-của-bạn.github.io/`**, bạn đã sở hữu một trang học thuật cá nhân hoàn chỉnh, chuyên nghiệp và đậm chất "phong cách Musk".

![](images/image45.png)

# 6 Nâng cao: Tự tay viết trang cá nhân từ đầu

Nếu bạn cảm thấy template học thuật quá cứng nhắc, hoặc bạn muốn tạo một trang web đơn trang (single-page) ngầu như "Ma Trận", thì chào mừng bạn đến với **Khu vực DIY**.

Ở đây, chúng ta không Fork code của bất kỳ ai. Chúng ta sẽ dùng Trae, đứng trước một thư mục trống, và như Chúa tạo ra vạn vật, dùng một câu lệnh để tạo ra một website hoàn chỉnh rồi deploy lên mạng.
## 6.1 Tại sao phải "tự làm từ đầu"

* **Tự do tuyệt đối**: Không bị ràng buộc bởi template. Bạn muốn thanh điều hướng ở bên phải? Muốn nền có pháo hoa? Chỉ cần nói với AI.
* **Chủ nghĩa tối giản**: Template thường chứa hàng trăm file, trong khi một website tự làm có thể chỉ cần một file `index.html`.
* **Làm chủ công nghệ**: Đây là cách tốt nhất để hiểu "trang web thực sự chạy như thế nào".

Chúng ta sẽ trình bày luồng **HTML thuần** kinh điển nhất: không cần biên dịch, GitHub Pages hỗ trợ nguyên bản, rất phù hợp để làm trang giới thiệu cá nhân (Landing Page).
## 6.2 Thực Chiến: Để AI Viết Một Trang Chủ Phong Cách "Trung Tâm Chỉ Huy Sao Hỏa"

Lần này chúng ta không làm theo kiểu học thuật nữa. Giả sử Musk muốn một trang cá nhân cực kỳ tối giản, đầy cảm giác tương lai, để giới thiệu "Kế Hoạch Sao Hỏa" của mình.

**Bước 1: Tạo dự án trống**

Tạo một thư mục mới trên máy tính, sau đó mở thư mục đó bằng Trae. Lúc này cây thư mục bên trái trống hoàn toàn, chưa có gì cả.

(Gợi ý: Bạn có thể đặt sẵn vào đó một ảnh chân dung của Musk, đặt tên là `portrait.png`)

**Bước 2: Xây dựng khung**

Trong hộp chat của Trae, nhập đoạn prompt này. Lưu ý rằng chúng ta yêu cầu AI viết toàn bộ code vào một file duy nhất để dễ quản lý cho người mới:

```
Tôi muốn làm từ đầu một trang cá nhân phong cách tối giản cho Elon Musk, không dùng bất kỳ framework phức tạp nào, chỉ dùng HTML+CSS+JS.
Phong cách thiết kế: Phong cách bảng điều khiển SpaceX.
    Nền: Sử dụng màu đen vũ trụ sâu thẳm (#000000), điểm xuyết hoạt ảnh ánh sao.
    Màu chủ đạo: Sử dụng "đỏ sao hỏa" (#E82127) làm màu nhấn.
    Font chữ: Dùng font Monospace, mô phỏng cảm giác terminal code.
Nội dung trang:
    Ở giữa là ảnh chân dung Elon Musk (hình tròn, có khung xoay) (đường dẫn ảnh là portrait.png).
    Tên: Elon Musk (Technoking of Tesla).
    Giới thiệu: "Occupying Mars... 99% Loading."
    Phía dưới có ba nút phát sáng, lần lượt liên kết đến: X (Twitter), SpaceX, Tesla.
Yêu cầu kỹ thuật: Hãy viết toàn bộ CSS và HTML vào một file index.html duy nhất. Hãy tạo code đầy đủ ngay.
```

![](images/image46.png)

**Bước 3: Tạo và xem trước**

Ở bước trước, Trae đã giúp chúng ta tạo ra một file index.html, vậy làm sao để xem hiệu ứng hiện tại của trang này?

Hãy nói với Trae trong Chat:

```markdown
Hãy giúp tôi khởi động một server cục bộ để xem trước trang web này.
```

Bạn sẽ nhận được một đường dẫn dạng `http://localhost:8000`, hãy sao chép và mở đường dẫn đó trên trình duyệt, bạn sẽ thấy một "trang sao hỏa" cực kỳ ngầu với nền có thể có những vì sao đang nhấp nháy.

![](images/image47.png)

Nhưng chúng ta nhận thấy trang hiện tại chỉ là một "landing page" hoặc "màn hình giới thiệu" rất bắt mắt, xét về một trang cá nhân hoàn chỉnh thì thông tin còn quá ít, thiếu chiều sâu học thuật cần thiết. Vì vậy dựa trên khung phong cách này, chúng ta bắt đầu bổ sung và hoàn thiện thông tin học thuật về Elon Musk.

![](images/image48.png)

**Bước 4: Hoàn thiện thêm thông tin**

Chúng ta muốn Trae giữ nguyên phong cách sao hỏa hiện tại, nhưng đổi cấu trúc thành dạng template học thuật. Chúng ta cần chỉ dẫn rõ ràng để nó di chuyển các thành phần hiện có sang bên trái, và tạo một vùng nội dung mới ở bên phải để đặt CV và white paper, đồng thời tất cả nội dung mới thêm vào đều phải theo phong cách cyberpunk "nền đen chữ đỏ".

Sao chép toàn bộ đoạn prompt sau và gửi cho Trae:

```
Nguyên tắc cốt lõi:
Phải giữ nguyên nghiêm ngặt phong cách thiết kế "SpaceX/sao hỏa" hiện tại (nền đen thuần, điểm xuyết bầu trời sao, màu nhấn neon đỏ, font code Monospace), tuyệt đối không dùng nền trắng như trong ảnh tham khảo.
Các bước chỉnh sửa cụ thể:
1. Tạo bố cục hai cột (Two-Column Layout)
Chia trang thành cột trái và cột phải. Sidebar bên trái chiếm khoảng 30%-35%, vùng nội dung bên phải chiếm khoảng 65%-70%.
2. Sidebar trái (Left Sidebar) - Di chuyển thông tin hiện có
Chuyển toàn bộ các thành phần hiện có trong hình một sang sidebar trái và cố định ở đó:
    - Ảnh đại diện: Giữ nguyên ảnh tròn của Elon Musk.
    - Tên và chức danh: Giữ nguyên chữ neon đỏ "ELON MUSK" và "Technoking of Tesla".
    - Thanh loading: "Occupying Mars... 99% Loading" giữ nguyên, dùng làm chữ ký cá nhân.
    - Nút mạng xã hội: Ba nút đỏ ở phía dưới (X, SPACE X, TESLA) chuyển xuống cuối sidebar trái.
3. Vùng nội dung phải (Right Content Area) - Thêm thông tin chi tiết
Ở vùng bên phải, thêm phần giới thiệu cá nhân và trình bày thành tựu chi tiết. Tất cả văn bản mới thêm mặc định dùng màu trắng hoặc xám nhạt, tiêu đề dùng phong cách neon đỏ làm nhấn. Hãy tạo các mục sau:
- About Me (Về tôi):
    Viết một đoạn giới thiệu ngắn, ví dụ: "Technology entrepreneur and engineer focused on multi-planetary expansion, sustainable energy, and artificial intelligence."
- Focus Areas (Lĩnh vực quan tâm): 
    Liệt kê Space Systems Engineering, Mars Colonization Architecture, Brain-Machine Interfaces.
- Visionary Plans & White Papers (Tầm nhìn & White Paper kỹ thuật):
    Đây là phần quan trọng, tham khảo kiểu danh sách trong hình ba nhưng đổi thành phong cách tối màu.
    Tạo một danh sách hiển thị các kế hoạch kỹ thuật quan trọng của ông (dùng viền đỏ hoặc hiệu ứng phát sáng để phân biệt từng mục).
    Mục 1: "Making Humans a Multi-Planetary Species" (Starship Architecture, 2017).
    Mục 2: "Hyperloop Alpha" (High-speed transportation proposal, 2013).
    Mục 3: "Neuralink: An Integrated Brain-Machine Interface Platform" (2019).
- Notable Achievements (Thành tựu nổi bật):
    Liệt kê ngắn gọn một vài cột mốc như: First private liquid-propellant rocket to reach orbit (Falcon 1); First reusable orbital class rocket (Falcon 9).
4. Yêu cầu chi tiết về style
Tiêu đề của tất cả các mục bên phải (như "About Me"), dùng cùng kiểu font phát sáng đỏ giống "ELON MUSK" ở bên trái.
Đảm bảo toàn bộ trang hiển thị bố cục hai cột tốt trên các kích thước màn hình khác nhau (responsive design).
```

Quay lại trình duyệt và làm mới trang, trang học thuật phong cách cyberpunk này đã hoàn thành! Tất nhiên, bạn cũng có thể tiếp tục hoàn thiện theo sở thích của mình, chỉ cần nói rõ yêu cầu mục tiêu với Trae như quá trình trên, nó sẽ tự giúp bạn thực hiện phần code rắc rối đó.

![](images/image49.png)
## 6.3 Cách triển khai website tự "tay trần" xây dựng

Khác với template Fork trước đây (đó là sao chép repository của người khác), dự án này do bạn tự tạo mới, trên GitHub chưa có chỗ cho nó. Chúng ta cần thủ công "liên kết" chúng lại với nhau.

**Bước 1: Tạo repository mới trên GitHub**

1. Đăng nhập vào trang web GitHub.
2. Nhấp vào dấu **+** ở góc trên bên phải -> **New repository**.

![](images/image50.png)

3. **Repository name**: Điền `mars-profile` (hoặc bất kỳ tên nào bạn thích).

**Lưu ý:** Nếu trước đây bạn đã dùng tên **`tên-người-dùng-của-bạn.github.io`**, thì ở đây không thể dùng lại tên đó nữa. Bạn có thể đặt tên khác, **GitHub** sẽ tạo cho bạn một đường link, ví dụ *`tên-người-dùng-của-bạn.github.io/mars-link`*.

4. **Public/Private**: Chọn **Public**.
5. **⚠️ Tuyệt đối không tích vào "Add a README file"!** (Các tùy chọn còn lại giữ nguyên mặc định)
6. Nhấp vào **Create repository**.

![](images/image51.png)

**Bước 2: Đẩy code local lên cloud**

Sau khi tạo xong, GitHub sẽ chuyển đến một trang có đầy những đoạn code lộn xộn. Đừng hoảng, chúng ta chỉ cần sao chép đường link repository trong hình ảnh dưới đây

![](images/image52.png)

Quay lại Trae, nhập vào ô Chat:

```markdown
Tôi đã tạo một repository rỗng trên GitHub, địa chỉ là: https://github.com/tên-người-dùng-của-bạn/mars-link.git (hãy thay thế bằng địa chỉ repository bạn vừa tạo).
Bây giờ, hãy giúp tôi khởi tạo dự án local hiện tại thành Git repository và đẩy code lên địa chỉ remote này trên nhánh main.
```

Trae thường sẽ giúp bạn thực hiện "ba chiêu chuẩn" sau (bạn có thể chỉ cần nhấp chạy):

1. `git init` (khởi tạo repository)
2. `git add .` và `git commit -m "First commit"` (đóng gói hành lý)
3. `git branch -M main` và `git remote add origin [địa chỉ của bạn]` (liên kết cloud)
4. `git push -u origin main` (xuất phát!)

Sau khi Trae hoàn thành tác vụ, chúng ta quay lại GitHub làm mới trang, nhấp vào **Code** ở trên cùng, bạn sẽ thấy code đã viết trên Trae được đẩy thành công lên repository GitHub.

![](images/image53.png)

**Bước 3: Bật GitHub Pages**

Sau khi đẩy code lên, trang web sẽ không tự động xuất hiện, bạn cần bật công tắc thủ công:

1. Quay lại trang repository GitHub, nhấp vào **Settings** ở trên cùng.
2. Nhấp vào **Pages** ở thanh bên trái.
3. Bên dưới **Build and deployment**:
   1. **Source**: Chọn `Deploy from a branch`.
   2. **Branch**: Chọn nhánh `main`, thư mục chọn `/(root)`.
4. Nhấp vào **Save**.

![](images/image54.png)

Sau khi bạn nhấp Save, trang web sẽ không "hiện ra" trong một giây. Backend của GitHub giống như một nhà máy robot nhỏ, cần mất khoảng **1 đến 2 phút** để đóng gói, biên dịch code bạn tải lên, rồi phát hành lên các máy chủ toàn cầu.

Kiên nhẫn chờ rồi làm mới trang, bạn sẽ thấy ngay bên dưới tiêu đề lớn **GitHub Pages** một dòng thông báo có đường link, thường ghi: **"Your site is live at `https://tên-người-dùng-của-bạn.github.io/mars-link/`"**.

![](images/image55.png)

Nhấp vào đó, "Trung tâm chỉ huy Sao Hỏa" của bạn đã lên sóng!

![](images/image56.png)

# 7 Lời kết

Hướng dẫn đã kết thúc. Bây giờ, nhìn vào thanh địa chỉ trình duyệt với đường link `.github.io` sáng lên, bạn có cảm giác "mình vừa cắm một lá cờ trên Internet" không?

Trong hướng dẫn này, chúng ta mượn danh Elon Musk, ghép nối như chơi Lego để xây dựng một trang web trông rất hoành tráng. Nhưng đây chỉ là bước khởi đầu. Điều quyến rũ nhất của Vibe Coding không phải là nó giúp bạn tiết kiệm bao nhiêu thời gian gõ code, mà là nó **phá vỡ hoàn toàn bức tường giữa "ý tưởng" và "hiện thực"**.

Trước đây, bạn có thể từ bỏ ý định trình bày một dự án vì "không biết viết CSS"; giờ đây, giới hạn duy nhất còn lại chỉ là **trí tưởng tượng** và **thẩm mỹ** của bạn.

**Đừng để trang web này mãi ở dạng "phiên bản Musk"**. Những đường link Tesla để luyện tay, những bạch thư về di dân Sao Hỏa, xét cho cùng đều là câu chuyện của người khác. Trang chủ của bạn, nên là danh thiếp của chính bạn trong thế giới số.

Hãy viết lên đó trải nghiệm dự án đầu tiên bạn học được, hãy đăng những góc nhìn độc đáo của bạn về một công nghệ nào đó, thậm chí danh sách sách yêu thích, những bức ảnh bạn đã chụp đều có thể treo lên đó. Những suy nghĩ bị cuốn trôi trên Moments WeChat, ở đây sẽ lưu lại mãi mãi; niềm đam mê không thể viết hết trong CV, ở đây có thể trải rộng thoải mái.

Đừng để mảnh đất này bỏ hoang. Hãy mày mò, phá vỡ, xây dựng lại, cho đến khi nó trở thành hình dạng bạn yêu thích nhất.

![](images/image57.png)

***Hãy tiến lên, để thế giới nhìn thấy bạn!***

# Tài liệu tham khảo

CSDN: [【Hướng dẫn chi tiết mới nhất 2025】Hướng dẫn từng bước tạo trang cá nhân bằng GitHub (Cần thiết khi xin học và tìm việc)](https://blog.csdn.net/qq_45743991/article/details/145505150?ops_request_misc=&request_id=&biz_id=102&utm_term=github%E6%9E%84%E5%BB%BA%E4%B8%AA%E4%BA%BA%E4%B8%BB%E9%A1%B5&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-145505150.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN: [Hướng dẫn chi tiết tải và cài đặt Git](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

CSDN: [Hướng dẫn cài đặt Ruby trên môi trường Windows](https://blog.csdn.net/alive_tree/article/details/103043158?ops_request_misc=elastic_search_misc&request_id=ad7e29ea7f702554d785c2fc82ec6e95&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~ElasticSearch~search_v2-11-103043158-null-null.142^v102^pc_search_result_base4&utm_term=ruby%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B&spm=1018.2226.3001.4187)
