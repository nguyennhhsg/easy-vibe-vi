# Cách chọn nền tảng phát triển cho ứng dụng của bạn

Bạn có một ý tưởng và muốn biến nó thành một sản phẩm thực sự. Nhưng đối mặt với rất nhiều lựa chọn nền tảng——mini program WeChat, iOS App, Android App, website, browser extension, desktop program……bạn nên bắt đầu từ đâu?

::: tip 💡 Điều hướng nhanh
Nếu bạn đã biết các đặc điểm của từng nền tảng, bạn có thể nhảy trực tiếp đến [Phần 2](#2-trước-tiên-hãy-trả-lời-ba-câu-hỏi) để bắt đầu quy trình quyết định, hoặc xem [sơ đồ quyết định ở Phần 7](#7-tóm-tắt-quy-trình-quyết-định-chọn-nền-tảng).
:::

Bài viết này sẽ giúp bạn làm rõ suy nghĩ, dựa trên tình huống cụ thể của bạn, để tìm ra nền tảng phù hợp nhất.

## 1 Trước tiên hãy tìm hiểu các nền tảng này

Trước khi thảo luận về "chọn cái nào", hãy làm rõ "có những cái nào". Dưới đây là phân loại các nền tảng phát triển chính hiện tại:

### 1.1 Nền tảng di động

#### iOS Native App

Những phần mềm mà bạn tải từ App Store trên iPhone của bạn chính là iOS Native App. Đặc điểm của chúng là: tốc độ mở nhanh, sử dụng mượt mà, có thể gọi tất cả các chức năng của điện thoại (camera, định vị, dữ liệu sức khỏe, v.v.). Nhưng để phát triển nó, bạn phải sử dụng máy tính Apple, và phải được Apple phê duyệt trước khi có thể phát hành.

**Ví dụ phổ biến**: WeChat, TikTok, Little Red Book, Keep, Meituan, Alipay

#### Android Native App

Phần mềm tải từ cửa hàng ứng dụng trên điện thoại Android hoặc APK mà bạn bạn gửi cho bạn để cài đặt, tất cả đều là Android Native App. Tương tự như iOS App, nhưng có nhiều người dùng Android hơn và các kênh phân phối đa dạng hơn. Nhược điểm là loại điện thoại Android quá nhiều, nhà phát triển phải thích ứng với nhiều kích thước màn hình và phiên bản hệ thống khác nhau.

**Ví dụ phổ biến**: Tasker (công cụ tự động hóa), MX Player (trình phát video), AirDroid (quản lý điện thoại), Greenify (tiết kiệm pin), Xposed Framework (tùy chỉnh hệ thống)

#### WeChat Mini Program

Những "mini ứng dụng" mà bạn có thể quét mã, tìm kiếm tên và sử dụng trực tiếp trong WeChat mà không cần tải xuống cài đặt. Ưu điểm của nó là ngưỡng người dùng thấp——mọi người đều có WeChat, chỉ cần nhấp là có thể sử dụng. Nhược điểm là chức năng hạn chế, và chỉ có thể chạy trong WeChat, nếu rời khỏi WeChat sẽ không thể sử dụng.

**Ví dụ phổ biến**: Pinduoduo (e-commerce nhóm mua), Meituan Waimai (đặt hàng), Mobike (quét mã để đạp xe), Jump Jump (mini game), Zhou Heiya (đặt hàng mua sắm)

#### PWA (Progressive Web App)

Nghe có vẻ rất kỹ thuật, nhưng thực chất chỉ là "trang web có thể được cài đặt như một App". Bạn mở một trang web nào đó trên trình duyệt điện thoại, nó sẽ hiển thị thông báo "Thêm vào màn hình chính", nhấp một cái, biểu tượng xuất hiện trên desktop, và khi nhấp vào, nó trông giống như một App. Ưu điểm của nó là một bộ code có thể chạy trên cả điện thoại lẫn máy tính, nhược điểm là rất nhiều người không biết có thể sử dụng cách này.

**Ví dụ phổ biến**: Twitter Lite, Starbucks, Pinterest, Uber, Spotify Web Player

### 1.2 Nền tảng desktop

#### Electron Desktop Program

Bạn có thể sử dụng hàng ngày: VS Code, Slack, Discord, Notion, Figma——những phần mềm này đều được phát triển với Electron. Đặc điểm của nó là: sử dụng công nghệ viết trang web (HTML, CSS, JavaScript) để viết phần mềm desktop, một bộ code có thể chạy trên Windows, Mac, Linux. Nhược điểm là gói cài đặt tương đối lớn, tiêu thụ bộ nhớ nhiều hơn khi chạy.

**Ví dụ phổ biến**: VS Code, Slack, Discord, Notion, Figma, WeChat Developer Tools

#### Qt Desktop Application

Nếu bạn đã sử dụng WPS, VirtualBox, OBS, thì rất có thể nó được phát triển bằng Qt. Nó được viết bằng ngôn ngữ C++, hiệu suất tốt, tính ổn định cao, đặc biệt phù hợp với các tình huống công nghiệp. Nhưng ngưỡng học tập cao, cần hiểu C++.

**Ví dụ phổ biến**: WPS Office, VirtualBox, Autodesk Maya, Telegram Desktop, OBS Studio

#### Native Desktop Application

Những phần mềm "nặng" này thường được phát triển bằng công nghệ gốc. Windows sử dụng C# hoặc C++, Mac sử dụng Swift. Hiệu suất tốt nhất, trải nghiệm mượt mà nhất, nhưng phiên bản Windows và Mac phải được phát triển riêng biệt, chi phí rất cao.

**Ví dụ phổ biến**: Microsoft Office, Adobe Photoshop, Final Cut Pro, WeChat (phiên bản Windows/Mac), QQ Music

### 1.3 Các nền tảng liên quan đến Web

#### Website

Chính là những trang bạn mở bằng cách nhập URL vào trình duyệt. Ưu điểm của nó là: bất cứ thiết bị nào cũng có thể truy cập (điện thoại, máy tính, máy tính bảng), không cần cài đặt, công cụ tìm kiếm có thể tìm thấy. Nhược điểm là phải kết nối Internet, nếu ngoại tuyến sẽ không thể sử dụng.

**Ví dụ phổ biến**: Taobao, Zhihu, GitHub, Bilibili, Juejin, CSDN

#### Browser Extension

Bạn đã cài đặt trình chặn quảng cáo, công cụ dịch, trình quản lý mật khẩu? Đó chính là browser extension. Chúng sống trong trình duyệt, có thể đọc và sửa đổi nội dung trang web mà bạn đang xem. Ví dụ, cài đặt plugin dịch, mở trang web tiếng Anh sẽ có thể dịch một cái. Ưu điểm của nó là nhẹ, khởi động cùng với trình duyệt; nhược điểm là chỉ có thể hoạt động trong trình duyệt, và các plugin trên các trình duyệt khác nhau (Chrome, Edge, Firefox) vẫn không tương thích.

**Ví dụ phổ biến**: AdBlock Plus, Immersive Translate, 1Password, Grammarly, Tampermonkey, Dark Reader

### 1.4 Các nền tảng khác

#### VS Code Extension

Nếu bạn là lập trình viên, có khả năng bạn đã sử dụng trình soạn thảo VS Code. VS Code extension chính là những chương trình nhỏ để "thêm chức năng" cho nó. Ưu điểm của nó là những người dùng là nhà phát triển rất chính xác, nhược điểm là chỉ hữu ích cho lập trình viên.

**Ví dụ phổ biến**: Prettier, GitLens, GitHub Copilot, ESLint, Live Server, Chinese Language Pack

#### NFT Smart Contract

Bạn có thể đã nghe nói về NFT——những "avatar kỹ thuật số" bán với giá hàng trăm triệu đô la. Bản chất của NFT là một "chứng chỉ sở hữu" trên blockchain, chứng minh rằng một mục kỹ thuật số nào đó thuộc về bạn. Smart contract là một chương trình chạy trên blockchain, được sử dụng để tạo và quản lý các NFT này. Ưu điểm của nó là không thể sửa đổi, có thể giao dịch; nhược điểm là ngưỡng kỹ thuật cao, thị trường biến động lớn.

**Ví dụ phổ biến**: Bored Ape Yacht Club, CryptoPunks, NBA Top Shot, Azuki, Moonbirds

### 1.5 Có những lựa chọn khác không?

Ngoài những cái trên, vẫn còn một số "con đường trung gian" và nhiều khả năng khác:

#### Cross-platform Development Framework

::: details Nhấp để xem chi tiết về các framework cross-platform

**React Native / Flutter**: Muốn làm cả iOS và Android App cùng một lúc, nhưng không muốn viết hai bộ code? Hai framework này có thể cho phép bạn viết một bộ code, sau đó tự động tạo ra App cho hai nền tảng. Rất nhiều công ty đang sử dụng, chẳng hạn như Airbnb, Instagram.

**Tauri**: "Phiên bản nhẹ" của Electron. Giống như sử dụng công nghệ web để phát triển phần mềm desktop, nhưng gói cài đặt nhỏ hơn, chạy nhanh hơn. Nhược điểm là hệ sinh thái vẫn chưa đủ trưởng thành.

**uni-app**: Framework rất phổ biến tại Trung Quốc, viết một bộ code có thể phát hành đến WeChat mini program, iOS App, Android App, H5 website. Phù hợp với các đội muốn "phát triển một lần, chạy ở khắp nơi".

**Capacitor / Ionic**: Đã có một website, muốn nhanh chóng biến nó thành App? Hai công cụ này có thể "gói" website của bạn thành một App, người dùng tải xuống cài đặt từ cửa hàng ứng dụng.

Bản chất của các framework này là tìm sự cân bằng giữa "phát triển gốc" và "phát triển Web"——hiệu suất phát triển cao hơn một chút, nhưng hiệu suất và trải nghiệm sẽ bị đánh đổi một chút.
:::

#### Hệ sinh thái Mini Program nội địa

::: details Nhấp để xem chi tiết về mini program nội địa

**Alipay Mini Program**: Các tình huống tài chính, dịch vụ cuộc sống. Người dùng của bạn đang sử dụng Alipay để trả tiền điện nước, đặt hàng ăn, đi xe buýt? Sau đó làm Alipay mini program. Các khả năng như điểm tín dụng, xác thực Sesame, chỉ có Alipay mới có.

**Douyin Mini Program**: Thương mại nội dung, bán hàng trực tiếp. Bạn bán hàng trên Douyin? Mini program có thể được gắn trực tiếp dưới video, người dùng có thể mua khi cuộn tới.

**Kuaishou Mini Program**: Thị trường hạ tầng, kinh tế bạn bè. Người dùng Kuaishou có độ gắn bó cao, phù hợp với nhóm mua cộng đồng, dịch vụ địa phương.

**Baidu Mini Program**: Cánh cửa dòng chảy tìm kiếm. Người dùng tìm kiếm "nhà hàng gần đây", mini program của bạn có thể xuất hiện trực tiếp trong kết quả tìm kiếm.
:::

#### Hệ sinh thái HarmonyOS

**HarmonyOS Application**: Điện thoại, máy tính bảng, đồng hồ thông minh, thiết bị nhà thông minh của Huawei đều có thể chạy. Phát triển bằng ArkTS (tương tự TypeScript), một bộ code có thể chạy trên nhiều thiết bị. Nếu người dùng của bạn là người dùng hệ sinh thái Huawei, hoặc muốn làm các thiết bị IoT liên kết, HarmonyOS là lựa chọn bắt buộc.

#### Các công cụ nhà phát triển khác

::: details Nhấp để xem chi tiết về các công cụ nhà phát triển khác

**Command Line Tool (CLI)**: Lập trình viên sử dụng terminal mỗi ngày. Tạo một công cụ dòng lệnh, có thể tự động hóa công việc lặp lại, tạo mẫu code, triển khai dự án. Ví dụ, `create-react-app`, `git`, `npm` đều là công cụ dòng lệnh. Phù hợp với các công cụ hiệu suất nhà phát triển, tự động hóa DevOps.

**JetBrains Plugin**: Ngoài VS Code, nhiều nhà phát triển sử dụng IntelliJ IDEA, PyCharm, WebStorm. Nếu công cụ của bạn dành cho nhà phát triển Java, Python, front-end, thì thị trường plugin JetBrains cũng đáng xem xét.

**Cursor / Windsurf Plugin**: Hệ sinh thái mới của công cụ lập trình AI. Nếu bạn muốn làm chức năng liên quan đến lập trình hỗ trợ AI, hệ sinh thái plugin của các IDE mới này đang phát triển nhanh chóng.
:::

#### Social Media Bot

::: details Nhấp để xem chi tiết về social media bot

**Telegram Bot**: Nhóm người dùng nước ngoài lớn, API thân thiện. Phù hợp với thông báo đẩy, tự động hóa tác vụ, quản lý cộng đồng. Rất nhiều dự án tiền điện tử, cộng đồng nhà phát triển đang sử dụng Telegram.

**Discord Bot**: Cơ sở chính của cộng đồng game, cộng đồng nhà phát triển. Có thể phát hành nhạc, truy vấn dữ liệu game, quản lý máy chủ. Nếu người dùng của bạn là game thủ hoặc nhà phát triển nước ngoài, Discord Bot là điều cần thiết.
:::

#### Design and Productivity Tools

::: details Nhấp để xem chi tiết về các công cụ thiết kế

**Figma Plugin**: Nhà thiết kế sử dụng Figma mỗi ngày. Tạo một plugin có thể tự động hóa quy trình thiết kế, tạo code, quản lý hệ thống thiết kế. Phù hợp với các công cụ thiết kế, hỗ trợ phát triển front-end.

**Notion Plugin**: Thông qua Notion API có thể tự động hóa quy trình làm việc, đồng bộ dữ liệu, tạo báo cáo. Phù hợp với các công cụ quản lý kiến thức, quản lý dự án.
:::

#### Spatial Computing

**visionOS Application (Apple Vision Pro)**: Thời đại mới của spatial computing. Phù hợp với hiển thị nội dung 3D, trải nghiệm nhập vai, đào tạo giáo dục, hợp tác ảo. Ngưỡng kỹ thuật cao, nhưng nếu bạn muốn khám phá những điều tiên phong, đây là hướng tương lai.

---

## 2 Trước tiên hãy trả lời ba câu hỏi

Trước khi chọn nền tảng, hãy trả lời ba câu hỏi cốt lõi:

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #409EFF;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">🎯</span>
      <span style="font-weight: bold; font-size: 16px;">Câu hỏi một: Người dùng của bạn ở đâu?</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>Người dùng có cần sử dụng mọi lúc mọi nơi không? (ưu tiên di động)</li>
      <li>Người dùng có thói quen hoàn thành hoạt động trong WeChat không? (mini program)</li>
      <li>Người dùng có sử dụng desktop kéo dài trong các tình huống văn phòng không? (chương trình desktop)</li>
      <li>Người dùng có cần tìm thấy bạn thông qua công cụ tìm kiếm không? (website)</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #67C23A;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">⚡</span>
      <span style="font-weight: bold; font-size: 16px;">Câu hỏi hai: Ứng dụng của bạn cần những khả năng gì?</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>Có cần gọi camera, microphone, GPS và các phần cứng khác không?</li>
      <li>Có cần sử dụng ngoại tuyến không?</li>
      <li>Có cần thông báo đẩy không?</li>
      <li>Có cần xử lý dữ liệu cục bộ lớn không?</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #E6A23C;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">💰</span>
      <span style="font-weight: bold; font-size: 16px;">Câu hỏi ba: Bạn có bao nhiêu tài nguyên?</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>Ngân sách thời gian phát triển?</li>
      <li>Bạn có thiết bị Mac không (cần thiết cho phát triển iOS)?</li>
      <li>Bạn có cần bao phủ nhiều nền tảng cùng một lúc không?</li>
    </ul>
  </div>
</el-card>

---

## 3 Biểu đồ quyết định chọn nền tảng

Bảng dưới đây giúp bạn định vị nhanh chóng:

| Tình huống sử dụng của bạn | Nền tảng được đề xuất | Lý do |
|---------|----------|------|
| Người dùng trong hệ sinh thái WeChat, muốn có được khách hàng nhanh chóng | <el-tag type="success">WeChat Mini Program</el-tag> | Không cần tải xuống, truyền bá trong WeChat, chi phí có được khách hàng thấp |
| Cần ghi nhận liên tục GPS, đọc dữ liệu sức khỏe sau lưng | <el-tag type="primary">iOS / Android Native</el-tag> | Gọi API hệ thống trực tiếp, hiệu suất tối ưu |
| Muốn một bộ code bao phủ nhiều nền tảng | <el-tag type="warning">PWA / Electron</el-tag> | Hiệu suất phát triển cao, chi phí bảo trì thấp |
| Người dùng cần sử dụng desktop kéo dài | <el-tag type="primary">Desktop Program</el-tag> (Electron / Qt) | Cửa sổ độc lập, ngoại tuyến, mức độ tích hợp hệ thống cao |
| Muốn tự động tóm tắt, dịch hoặc quản lý mật khẩu khi xem trang web | <el-tag type="info">Browser Extension</el-tag> | Có thể đọc và sửa đổi nội dung trang web, khởi động cùng với trình duyệt |
| Muốn bài viết kỹ thuật, giới thiệu dự án được Google tìm thấy | <el-tag type="warning">Website / Personal Blog</el-tag> | Thân thiện với SEO, nội dung có thể được tìm thấy |
| Muốn phát hành thẻ thành viên kỹ thuật số có thể giao dịch hoặc bộ sưu tập | <el-tag type="danger">NFT Smart Contract</el-tag> | Xác nhận quyền trên chuỗi, có thể giao dịch chuyển nhượng |

---

## 4 Ví dụ về các tình huống cụ thể

### Tình huống một: Tôi muốn tạo một công cụ nhóm mua cộng đồng

**💡 Đề xuất: WeChat Mini Program**

Tại sao chọn mini program?

- **Người dùng đã ở trong WeChat**: Những người phụ nữ già, chủ nhân nhà ở hoạt động trên nhóm WeChat, mini program có thể chia sẻ trực tiếp vào nhóm
- **Dùng xong là rời**: Mua rau quả, không ai muốn tải một App chuyên dụng
- **Thanh toán liền mạch**: WeChat Pay hoàn thành chỉ một cái, không cần chuyển hướng
- **Chi phí có được khách hàng thấp**: Một nhóm đưa ra liệt kê có thể mang lại hàng chục người dùng mới

::: tip 💡 Tình huống áp dụng
Nếu bạn làm những thứ tương tự——nhóm mua, đặt chỗ, khảo sát, đăng ký sự kiện——mini program đều là lựa chọn hàng đầu.
:::

---

### Tình huống hai: Tôi muốn tạo một App ghi nhận chạy bộ

**⚡ Đề xuất: iOS / Android Native Development**

Tại sao chọn Native App?

- **Chạy nền**: Khi chạy bộ, App cần ghi nhận liên tục quỹ đạo ở nền, mini program và web không thể làm được
- **Độ chính xác GPS**: Native App có thể truy cập định vị độ chính xác cao, sai số trong vài mét
- **Dữ liệu sức khỏe**: Muốn đọc bước đi, nhịp tim? Chỉ có Native App mới có thể gọi Apple HealthKit và Google Fit
- **Thông báo đẩy nhắc nhở**: Nhắc nhở hàng ngày "nên chạy bộ rồi", thông báo push gốc là đáng tin cậy nhất

::: warning ⚠️ Lưu ý quan trọng
Bất kỳ ứng dụng nào cần **chạy nền lâu dài** hoặc **truy cập sâu phần cứng**, đều nên chọn phát triển gốc.
:::

---

### Tình huống ba: Tôi muốn tạo một ứng dụng ghi chép chi tiêu

**⚡ Đề xuất: iOS / Android Native Development**

Tại sao?

- **Tốc độ khởi động nhanh**: Tình huống ghi chép chi tiêu cần mở nhanh, ghi lại nhanh, đóng nhanh, tốc độ khởi động Native App là đảm bảo trải nghiệm tốt nhất
- **Tần suất sử dụng cao nhưng thời gian đơn ngắn**: Ghi mỗi ngày, 30 giây là xong, trải nghiệm mượt mà của Native App làm cho người dùng sẵn sàng kiên trì hơn
- **Thông báo đẩy nhắc nhở**: Nhắc nhở hàng ngày người dùng ghi chép chi tiêu, tạo thói quen, thông báo push gốc là đáng tin cậy nhất
- **Bảo mật dữ liệu**: Native App có thể sử dụng mã hóa cấp thiết bị, bảo vệ quyền riêng tư tài chính của người dùng

Mặc dù PWA và mini program cũng có thể thực hiện chức năng cơ bản, nhưng đối với tình huống ghi chép chi tiêu có tần suất cao, tốc độ nhanh, chú trọng trải nghiệm, phát triển gốc của tốc độ khởi động và mượt mà là không thể thay thế.

---

### Tình huống bốn: Tôi muốn tạo một mini program đăng ký sự kiện

**📝 Đề xuất: WeChat Mini Program hoặc PWA**

Tại sao?

- **Dùng xong là rời**: Người dùng quét mã đăng ký, điền thông tin xong là rời, không cần cài đặt thường xuyên
- **Truyền bá xã hội**: Sự kiện tự nhiên phù hợp để chia sẻ, hiệu quả truyền bá hệ sinh thái WeChat là tốt nhất
- **Chi phí phát triển thấp**: Một bộ code bao phủ iOS và Android, chu kỳ phát triển ngắn
- **Không cần phê duyệt phát hành**: PWA có thể triển khai trực tiếp, cập nhật tức thì

Mini program phù hợp với tình huống dựa vào xã hội WeChat, PWA phù hợp với tình huống cần cross-platform, lặp lại nhanh chóng.

---

### Tình huống năm: Tôi muốn tạo một nền tảng giáo dục trực tuyến

**📚 Đề xuất: Website + Mini Program Combo**

Tại sao?

- **Website chuyên trách có được khách hàng**: Giới thiệu khóa học, giới thiệu giáo viên, tối ưu hóa SEO, để người dùng tìm thấy bạn trong công cụ tìm kiếm
- **Mini program chuyên trách chuyển đổi**: Người dùng quét mã dùng thử, đăng ký trả tiền, tham gia nhóm học tập
- **Website chuyên trách chuyển giao**: Phát hành khóa học video trên trang web, trải nghiệm màn hình lớn tốt hơn
- **Mini program chuyên trách kết nối**: Nhắc nhở giờ học, thông báo bài tập thông qua mini program push

::: tip 💡 Chiến lược kết hợp
Kinh doanh phức tạp thường cần **kết hợp nhiều nền tảng**, chứ không phải chỉ chọn một.
:::

---

### Tình huống sáu: Tôi muốn tạo một công cụ hợp tác nhóm

**🤝 Đề xuất: Electron Desktop Program + Web Version**

Tại sao?

- **Phiên bản desktop**: Người dùng ngồi trên máy tính, chương trình desktop có thể thường trú nền, nhận tin nhắn bất cứ lúc nào
- **Phiên bản web**: Tạm thời trên máy tính khác, mở trình duyệt là được, không cần cài đặt
- **Tích hợp hệ thống**: Chương trình desktop có thể truy cập tập tin cục bộ, thông báo hệ thống, phím tắt
- **Một bộ code**: Electron sử dụng công nghệ Web phát triển, phiên bản desktop và web có thể tái sử dụng 80% code

Slack, Notion, Discord đều làm như vậy.

---

### Tình huống bảy: Tôi muốn tạo một trình quản lý mật khẩu

**🔐 Đề xuất: Desktop Program + Browser Extension**

Tại sao?

- **Chương trình desktop**: Lưu trữ an toàn cơ sở dữ liệu mật khẩu, hỗ trợ mở khóa vân tay/khuôn mặt
- **Browser extension**: Tự động điền khi đăng nhập trang web, người dùng không cần chuyển cửa sổ
- **Có thể sử dụng ngoại tuyến**: Dữ liệu mật khẩu được lưu trữ cục bộ, không dựa vào mạng
- **Bảo mật có thể kiểm soát**: Người dùng biết dữ liệu ở đâu, không cần lo lắng rò rỉ đám mây

1Password, Bitwarden đều là sự kết hợp của chương trình desktop + browser extension.

---

### Tình huống tám: Tôi muốn tạo một nền tảng tạo nội dung

**✍️ Đề xuất: Website + Personal Blog**

Tại sao?

- **SEO là đường sống**: Người dùng tìm thấy nội dung của bạn thông qua tìm kiếm, đây là nguồn lưu lượng lớn nhất
- **Nội dung là sản phẩm**: Bài viết, hướng dẫn, video, những nội dung này chính là giá trị
- **Tài sản dài hạn**: Website có thể vận hành 10 năm, tài khoản mạng xã hội có thể bị khóa bất cứ lúc nào
- **Biến thể linh hoạt**: Quảng cáo, đăng ký trả tiền, kiến thức trả tiền, website có thể hỗ trợ tất cả

Medium, Zhihu Zhuanlan, blog kỹ thuật cá nhân, bản chất đều là các nền tảng nội dung.

---

### Tình huống chín: Tôi muốn tạo một công cụ hiệu suất nhà phát triển

**🛠️ Đề xuất: VS Code Extension hoặc Command Line Tool**

Tại sao?

- **Người dùng đã ở trong trình soạn thảo**: Nhà phát triển không muốn chuyển cửa sổ, công cụ cần tích hợp vào quy trình làm việc của họ
- **Nhận thức ngữ cảnh**: Có thể đọc mã hiện tại, cung cấp đề xuất chính xác
- **Phân phối đơn giản**: Phát hành tới thị trường plugin, người dùng cài đặt một cái
- **Lặp lại nhanh chóng**: Không cần chờ phê duyệt cửa hàng ứng dụng, phát hành hôm nay cập nhật hôm nay

Prettier, ESLint, GitHub Copilot đều là VS Code extension.

---

### Tình huống mười: Tôi muốn tạo một bảng giám sát công nghiệp

**🏭 Đề xuất: Qt Desktop Application**

Tại sao?

- **Ổn định áp chế tất cả**: Nhà máy chạy 24 giờ, phần mềm không thể gặp sự cố
- **Giao tiếp phần cứng**: Cần đọc dữ liệu cảm biến thông qua cổng nối tiếp, giao thức Modbus
- **Biểu đồ thời gian thực**: Áp lực, nhiệt độ, lưu lượng, cần làm mới ở mức mili giây
- **Môi trường điều khiển công nghiệp**: Máy tính điều khiển công nghiệp thường chạy Windows, tương thích Qt là tốt nhất

::: warning ⚠️ Tình huống công nghiệp
Yêu cầu của tình huống công nghiệp đối với tính ổn định và giao diện phần cứng, là những gì công nghệ Web không thể đáp ứng.
:::

---

### Tình huống mười một: Tôi muốn phát hành một thẻ thành viên kỹ thuật số

**🎫 Đề xuất: NFT Smart Contract**

Tại sao?

- **Không thể giả mạo**: Bản ghi trên blockchain không thể sửa đổi, danh tính thành viên thực sự đáng tin cậy
- **Có thể chuyển nhượng**: Thẻ thành viên có thể chuyển nhượng hoặc giao dịch thị trường phụ
- **Có thể lập trình**: Smart contract có thể tự động thực hiện quyền lợi, ví dụ giữ trên một năm tự động nâng cấp
- **Toàn cầu**: Không có giới hạn quốc gia, toàn bộ người dùng thế giới có thể tham gia

Starbucks Odyssey, NBA Top Shot đang sử dụng NFT để xây dựng hệ thống thành viên

---

## 5 Bảng so sánh khả năng nền tảng tra cứu nhanh

### 5.1 So sánh giải pháp di động

| Khả năng | WeChat Mini Program | iOS Native | Android Native | PWA |
|-----|----------|---------|-------------|-----|
| Chi phí có được khách hàng | <el-tag type="success">Thấp</el-tag> (truyền bá WeChat) | <el-tag type="danger">Cao</el-tag> (app store) | <el-tag type="danger">Cao</el-tag> (app store) | <el-tag type="warning">Trung bình</el-tag> (công cụ tìm kiếm) |
| Sử dụng ngoại tuyến | <el-tag type="warning">Hỗ trợ hạn chế</el-tag> | <el-tag type="success">Hỗ trợ hoàn toàn</el-tag> | <el-tag type="success">Hỗ trợ hoàn toàn</el-tag> | <el-tag type="success">Hỗ trợ</el-tag> |
| Thông báo đẩy | <el-tag type="success">Hỗ trợ</el-tag> | <el-tag type="success">Hỗ trợ</el-tag> | <el-tag type="success">Hỗ trợ</el-tag> | <el-tag type="warning">Hỗ trợ riêng phần</el-tag> |
| Truy cập phần cứng | <el-tag type="warning">Bị hạn chế</el-tag> | <el-tag type="success">Truy cập hoàn toàn</el-tag> | <el-tag type="success">Truy cập hoàn toàn</el-tag> | <el-tag type="warning">Bị hạn chế</el-tag> |
| Chạy nền | <el-tag type="warning">Bị hạn chế</el-tag> | <el-tag type="success">Hỗ trợ</el-tag> | <el-tag type="success">Hỗ trợ</el-tag> | <el-tag type="warning">Bị hạn chế</el-tag> |
| Chi phí phát triển | <el-tag type="success">Thấp</el-tag> | <el-tag type="danger">Cao</el-tag> | <el-tag type="danger">Cao</el-tag> | <el-tag type="success">Thấp</el-tag> |
| Cần phê duyệt | <el-tag type="warning">Có</el-tag> | <el-tag type="warning">Có</el-tag> | <el-tag type="warning">Có</el-tag> | <el-tag type="success">Không</el-tag> |

### 5.2 So sánh giải pháp desktop

| Khả năng | Electron | Qt | Browser Extension |
|-----|----------|-----|-----------|
| Đa nền tảng | Win/Mac/Linux | Win/Mac/Linux | Chrome/Edge/Firefox |
| Tích hợp hệ thống | <el-tag type="warning">Trung bình</el-tag> | <el-tag type="success">Cao</el-tag> | <el-tag type="warning">Thấp</el-tag> |
| Sử dụng ngoại tuyến | <el-tag type="success">Hỗ trợ</el-tag> | <el-tag type="success">Hỗ trợ</el-tag> | <el-tag type="warning">Hỗ trợ riêng phần</el-tag> |
| Truy cập phần cứng | <el-tag type="warning">Thông qua Node.js</el-tag> | <el-tag type="success">Truy cập hoàn toàn</el-tag> | <el-tag type="warning">Bị hạn chế</el-tag> |
| Phương pháp cài đặt | Gói cài đặt | Gói cài đặt | Cửa hàng extension trình duyệt |
| Ngôn ngữ phát triển | Công nghệ Web | C++/QML | JavaScript |

---

## 6 Những sai lầm phổ biến

<el-collapse accordion style="margin: 20px 0;">
  <el-collapse-item name="1">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ Sai lầm một: "Tôi muốn làm một App, vì vậy tôi phải phát triển iOS và Android"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      Không nhất thiết. Nếu ứng dụng của bạn là nhẹ, dùng xong là rời, mini program hoặc PWA có thể phù hợp hơn. Chỉ khi bạn cần truy cập sâu khả năng hệ thống, theo đuổi hiệu suất cực đại, mới đáng giá đầu tư vào phát triển gốc.
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="2">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ Sai lầm hai: "Website đã lỗi thời, không ai xem"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      Ngược lại. Website là nền tảng duy nhất có thể được công cụ tìm kiếm lập chỉ mục. Nếu bạn muốn có được khách hàng thông qua nội dung, website và blog cá nhân là lựa chọn tốt nhất. Bài viết kỹ thuật, giới thiệu dự án của bạn, đều có thể mang lại lưu lượng liên tục thông qua SEO.
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="3">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ Sai lầm ba: "Chương trình desktop không có ai dùng"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      Trong các tình huống văn phòng, chương trình desktop vẫn là chủ dòng. VS Code, Slack, Notion đều là chương trình desktop. Nếu ứng dụng của bạn cần sử dụng lâu dài, xử lý dữ liệu lớn, hoặc cần tích hợp hệ thống, chương trình desktop là lựa chọn tốt nhất.
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="4">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ Sai lầm bốn: "Trải nghiệm PWA không bằng gốc"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      PWA hiện đại đã rất gần gốc. Starbucks, Pinterest, Uber đều có phiên bản PWA. Nếu ứng dụng của bạn không cần các gọi phần cứng phức tạp, PWA là giải pháp đa nền tảng hiệu quả nhất.
    </div>
  </el-collapse-item>
</el-collapse>

---

## 7 Tóm tắt: Quy trình quyết định chọn nền tảng

```
Bắt đầu
  │
  ├─ Người dùng trong hệ sinh thái WeChat? ───────────────────→ WeChat Mini Program
  │
  ├─ Cần hiệu suất tốt nhất và truy cập phần cứng? ────────────→ iOS / Android Native
  │
  ├─ Cần sử dụng desktop kéo dài? ────────────────────────────→ Chương trình desktop
  │     │
  │     ├─ Tình huống công nghiệp? ────────────────────────────→ Qt
  │     └─ Tình huống chung? ──────────────────────────────────→ Electron
  │
  ├─ Cần xử lý nội dung trình duyệt? ────────────────────────→ Browser Extension
  │
  ├─ Công cụ nhẹ + đa nền tảng + ngoại tuyến? ────────────────→ PWA
  │
  ├─ Cần được tìm kiếm? ───────────────────────────────────→ Website / Blog
  │
  ├─ Công cụ nhà phát triển? ───────────────────────────────→ VS Code Extension
  │
  └─ Tài sản blockchain? ──────────────────────────────────→ NFT Smart Contract
```

---

## 8 Bước tiếp theo

::: tip 🎯 Bắt đầu hành động
Dựa trên phân tích ở trên, bạn đã có câu trả lời ban đầu về "chọn nền tảng nào". Tiếp theo, nhấp vào hướng dẫn tương ứng để bắt đầu học:
:::

<NavGrid>
  <NavCard
    href="/vi-vn/stage-3/cross-platform/wechat-miniprogram/"
    title="Cách xây dựng WeChat Mini Program"
    description="Phát triển WeChat mini program từ đầu, nắm vững quy trình phát triển cốt lõi của mini program"
  />
  <NavCard
    href="/vi-vn/stage-3/cross-platform/android-app/"
    title="Cách xây dựng chương trình Android"
    description="Sử dụng framework đa nền tảng hiện đại để xây dựng ứng dụng gốc Android"
  />
  <NavCard
    href="/vi-vn/stage-3/cross-platform/ios-app/"
    title="Cách xây dựng chương trình iOS"
    description="Phát triển và phát hành ứng dụng iOS, nắm vững các quy chuẩn phát triển của hệ sinh thái iOS"
  />
  <NavCard
    href="/vi-vn/stage-3/cross-platform/pwa-local-app/"
    title="Cách phát triển ứng dụng cục bộ PWA"
    description="Biến trang web thành App thực sự, hỗ trợ sử dụng ngoại tuyến và cài đặt desktop"
  />
  <NavCard
    href="/vi-vn/stage-3/cross-platform/browser-ai-extension/"
    title="Cách phát triển plugin trợ lý AI trình duyệt"
    description="Tóm tắt bất kỳ trang web nào chỉ bằng một cái, tạo trợ lý AI trình duyệt của bạn"
  />
  <NavCard
    href="/vi-vn/stage-3/cross-platform/electron-voice-to-text/"
    title="Cách phát triển chương trình desktop Electron đa nền tảng"
    description="Xây dựng ứng dụng chuyển đổi giọng nói thành chữ, hỗ trợ Windows, macOS, Linux"
  />
  <NavCard
    href="/vi-vn/stage-3/cross-platform/vscode-extension/"
    title="Cách phát triển VS Code extension"
    description="Tạo trợ lý dự án AI của bạn, hỗ trợ hỏi đáp đa tệp và phím tắt tùy chỉnh"
  />
  <NavCard
    href="/vi-vn/stage-3/cross-platform/qt-industrial-hmi/"
    title="Cách phát triển Qt Industrial HMI"
    description="Xây dựng giao diện tương tác cấp công nghiệp, kết nối thiết bị phần cứng thực sự"
  />
</NavGrid>
