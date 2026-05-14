# Cách xây dựng chương trình iOS - Phát triển SwiftUI gốc

## Chương 1: iOS App là gì và phát triển iOS App

Trong hướng dẫn này, chúng ta sẽ hoàn thành một vòng kín toàn bộ: **từ một ý tưởng trong đầu bạn, đến ứng dụng iOS thực tế có thể được cài đặt và chạy thành công trên iPhone.**

Để theo dõi hướng dẫn này, bạn cần có ít nhất:

1. Một chiếc Mac chạy phiên bản macOS khá mới
2. Một chiếc iPhone chạy iOS khá mới và đã bật chế độ nhà phát triển
3. Đã cài đặt thành công Xcode
4. Đã cài đặt và mở Trae
5. Một Apple ID hợp lệ

![](images/image1.png)

### 1.1 iOS App

iOS App là ứng dụng gốc chạy trên hệ điều hành iPhone, nó khởi động nhanh, tương tác mượt mà, và có thể sử dụng sâu các tính năng hệ thống như thông báo, camera, lưu trữ cục bộ, v.v.

![](images/image2.png)

### 1.2 Phát triển iOS App

Phát triển một iOS App, cốt lõi chỉ bao gồm một số điều:

1. Làm rõ vấn đề mà ứng dụng sẽ giải quyết
2. Thiết kế giao diện mà người dùng có thể nhìn thấy và thao tác
3. Xác định hành vi của ứng dụng trong các hoạt động khác nhau
4. Xây dựng ứng dụng chính xác và cài đặt nó vào iPhone

### 1.3 Một số cách phát triển iOS App phổ biến

Trong phát triển thực tế, iOS App không chỉ có một cách triển khai. Ở đây không đi sâu, chỉ cung cấp nhận thức tổng thể.

Cách thứ nhất là sử dụng giải pháp phát triển gốc được Apple khuyến nghị, tạo dự án thông qua Xcode, viết giao diện và logic bằng Swift và SwiftUI.

![](images/image3.png)

Cách thứ hai là sử dụng framework đa nền tảng, chẳng hạn như React Native, Flutter, v.v., thích ứng nhiều nền tảng thông qua một bộ mã.

![](images/image4.png)

Dựa trên các cách trên, hướng dẫn này chọn: **phát triển gốc SwiftUI làm cơ sở, kết hợp với công cụ AI hoàn thành công việc viết mã chính** .

![](images/image5.png)

### 1.4 Các bước phát triển iOS App được giới thiệu trong bài viết này (xem trước sơ lược)

Ứng dụng mẫu được sử dụng trong hướng dẫn này là "FridgeChef (Đầu bếp Tủ lạnh)".

Người dùng nhập các nguyên liệu còn sót lại trong tủ lạnh, ứng dụng sẽ gọi giao diện AI thực tế để tạo một công thức nấu ăn khả thi, và lưu kết quả cục bộ để xem sau. Ví dụ này bao gồm đầy đủ các phần cốt lõi mà một ứng dụng iOS thực tế cần, bao gồm nhập và hiển thị giao diện, yêu cầu mạng, phân tích dữ liệu, lưu trữ cục bộ, cũng như cài đặt và chạy cuối cùng trên thiết bị thực.

![](images/image6.png)

- Từ nguyên mẫu đến tư duy tổng thể gốc

Trong triển khai cụ thể, hướng dẫn này sử dụng phương pháp tiến hành từng giai đoạn. Trước tiên chúng ta sẽ sử dụng AI để nhanh chóng tạo nguyên mẫu giao diện bằng HTML và CSS, xác nhận cấu trúc bố cục và thứ bậc thông tin trong trình duyệt.

- Xem trước quy trình phát triển tổng thể

Nhìn chung, các chương tiếp theo sẽ lần lượt trải qua các giai đoạn sau:

1. Thiết lập nhận thức cơ bản
   Làm rõ hình thức iOS App, các cách phát triển phổ biến, và vấn đề mà ứng dụng mẫu này giải quyết.
2. Hoàn thành chuẩn bị môi trường
   Chuẩn bị một Mac và một iPhone, nâng cấp phiên bản hệ thống, cài đặt Xcode và Trae, và tạo dự án iOS cơ bản có thể chạy thành công trong trình mô phỏng.
3. Vào phát triển chính thức
   Mở dự án trong Trae, thông qua cuộc trò chuyện với AI, từng bước tạo bố cục giao diện và tương tác cơ bản, biến ứng dụng từ vỏ trống thành có thể sử dụng.
4. Gỡ lỗi và sắp xếp
   Khi xảy ra lỗi biên dịch hoặc hành vi không phù hợp với kỳ vọng, hãy để AI hỗ trợ xử lý sự cố; khi cấu trúc bắt đầu lộn xộn, hãy sử dụng AI để tái cấu trúc và đơn giản hóa.
5. Chạy trên thiết bị thực
   Cấu hình chữ ký, cài đặt ứng dụng vào iPhone thực tế, hoàn thành xác thực toàn bộ từ mã đến thiết bị.

## Chương 2: Chuẩn bị môi trường phát triển

### 2.1 Thiết bị và hệ thống cần chuẩn bị

Trong thực hành này, có hai loại phần cứng là không thể thay thế được: một chiếc máy tính Mac và một chiếc iPhone.
Đồng thời, cả hai thiết bị này đều cần chạy **phiên bản hệ thống chính thức khá mới** .

#### 2.1.1 Máy tính Mac

Ứng dụng iOS chỉ có thể được phát triển và biên dịch trên hệ thống macOS, đây là yêu cầu bắt buộc của nền tảng Apple.

Để đảm bảo Xcode có thể cài đặt và sử dụng bình thường, bạn nên nâng cấp macOS lên phiên bản chính thức khá mới trước khi bắt đầu. Bạn có thể kiểm tra và hoàn thành nâng cấp trong "Cài đặt Hệ thống → Chung → Cập nhật Phần mềm".

![](images/image7.png)

#### 2.1.2 iPhone thiết bị thực

Ngoài Mac, hướng dẫn này còn cần một chiếc iPhone thiết bị thực để xác minh xem ứng dụng có thể được hệ thống cài đặt và khởi động bình thường hay không.

Để đảm bảo quá trình gỡ lỗi diễn ra suôn sẻ, iPhone cần chạy phiên bản iOS khá mới. Bạn có thể kiểm tra và hoàn thành nâng cấp trong "Cài đặt → Chung → Cập nhật Phần mềm".

![](images/image8.png)

Sau này trong quá trình phát triển, chiếc iPhone này sẽ được kết nối với Mac thông qua cáp dữ liệu để gỡ lỗi trên thiết bị thực.

#### 2.1.3 Bật chế độ nhà phát triển trên iPhone

Để có thể cài đặt và chạy ứng dụng gỡ lỗi từ Xcode trên thiết bị thực, cần phải bật chế độ nhà phát triển trên iPhone.

Các bước kích hoạt như sau:

1. Mở "Cài đặt"
2. Vào "Quyền riêng tư và Bảo mật"
3. Cuộn xuống cuối trang, tìm "Chế độ Nhà phát triển"
4. Bật công tắc và khởi động lại thiết bị theo hướng dẫn
5. Sau khi khởi động lại, mở khóa thiết bị và xác nhận bật chế độ Nhà phát triển

![](images/image9.png)

Nếu iPhone của bạn trước đây chưa bao giờ kết nối với Xcode hoặc các công cụ phát triển khác, bạn có thể gặp trường hợp "không thể tìm thấy Chế độ Nhà phát triển trong 'Quyền riêng tư và Bảo mật'". Đây không phải là vấn đề hệ thống, mà là vì chế độ nhà phát triển chưa được hệ thống kích hoạt.

Khi đó, bạn có thể kích hoạt hiển thị Chế độ Nhà phát triển bằng cách sau:

1. Mở "Cài đặt" → "Quyền riêng tư và Bảo mật" → "Phân tích và Cải thiện"
2. Bật "Chia sẻ với Nhà phát triển"
3. Quay lại trang cài đặt trước, vào lại "Quyền riêng tư và Bảo mật", cuộn xuống cuối trang
4. Lúc này bạn sẽ thấy tùy chọn "Chế độ Nhà phát triển", bật theo hướng dẫn và khởi động lại thiết bị

Sau khi hoàn thành các hoạt động trên, chế độ nhà phát triển chỉ cần bật một lần, không cần cấu hình lại khi sử dụng Xcode để gỡ lỗi trên thiết bị thực sau này.

![](images/image10.png)

### 2.2 Phần mềm cần cài đặt

Sau khi hoàn thành chuẩn bị thiết bị và hệ thống, bạn vẫn cần cài đặt phần mềm liên quan để phát triển. Hướng dẫn này chỉ sẽ sử dụng hai loại công cụ: công cụ phát triển iOS chính thức và công cụ phát triển hỗ trợ AI.

#### 2.2.1 Xcode

Xcode là công cụ phát triển iOS chính thức được Apple cung cấp. Trong hướng dẫn này, nó được sử dụng chủ yếu để tạo dự án iOS, biên dịch mã Swift / SwiftUI và chạy ứng dụng vào trình mô phỏng hoặc thiết bị thực.

![](images/image11.png)

Xcode có thể được tìm kiếm và cài đặt trực tiếp trong App Store. Sau khi cài đặt xong, lần đầu tiên mở sẽ thấy giao diện chào mừng, việc tạo dự án sẽ bắt đầu từ đây.

![](images/image12.png)

#### 2.2.2 Trae

Trae là môi trường thực hiện công việc phát triển chính trong hướng dẫn này. Bạn sẽ đặt toàn bộ dự án iOS vào Trae, và thông qua các cuộc trò chuyện, cộng tác với AI để hoàn thành phát triển.

![](images/image13.png)

### 2.3 Apple ID và Ghi chú Gỡ lỗi Phát triển

Trên nền tảng iOS, để cài đặt ứng dụng vào thiết bị thực, bắt buộc phải qua ký hiệu nhà phát triển. Hướng dẫn này không yêu cầu tham gia trả phí Apple Developer Program, chỉ cần chuẩn bị Apple ID cá nhân.

### 2.4 Xác nhận trạng thái trước khi chuyển sang bước tiếp theo

Trước khi chuyển sang chương tiếp theo, bạn có thể đối chiếu danh sách dưới đây để xác nhận rằng môi trường đã được chuẩn bị xong.

Hiện tại bạn nên đã có:

1. Một chiếc Mac chạy phiên bản macOS khá mới
2. Một chiếc iPhone chạy iOS khá mới và đã bật chế độ nhà phát triển
3. Đã cài đặt thành công Xcode
4. Đã cài đặt và mở Trae
5. Một Apple ID hợp lệ

Nếu tất cả các điều kiện trên đều được đáp ứng, bạn có thể tiếp tục tạo và chạy iOS App đầu tiên của mình.

## Chương 3: Tạo dự án iOS đầu tiên

### 3.1 Tạo dự án mới bằng Xcode

Mở Xcode. Trong giao diện chào mừng, chọn tạo dự án mới.

![](images/image14.png)

Nhấp vào **Create new project** , vào giao diện chọn mẫu dự án.

### 3.2 Chọn mẫu ứng dụng và ngôn ngữ lập trình

Trong giao diện chọn mẫu, chọn theo cấu hình sau:

1. Platform: iOS
2. Loại Application: App

![](images/image15.png)

Nhấp vào **Next** , vào cấu hình thông tin dự án.

### 3.3 Cấu hình thông tin dự án

Trong giao diện thông tin dự án, chỉ cần điền cấu hình cơ bản của dự án:

1. Product Name: Tên ứng dụng (ví dụ: FridgeChef)
2. Team: Chọn Apple ID cá nhân của bạn
3. Organization Identifier: Dạng tên miền đảo ngược (ví dụ: com.example)
4. Bundle Identifier: Được tạo tự động, giữ mặc định
5. Testing System: Swift Testing with XCTest UI Tests
6. Storage: Chọn Core Data (để lưu dữ liệu lịch sử sau)
7. Các tùy chọn khác giữ mặc định

![](images/image16.png)

Nhấp vào **Next** , chọn vị trí lưu dự án.

![](images/image17.png)

### 3.4 Nhận biết cấu trúc sau khi dự án được tạo

Sau khi dự án được tạo, Xcode sẽ tự động mở dự án. Lúc này không cần hiểu tất cả các tệp, chỉ cần nhận biết một vài điểm chính.

![](images/image18.png)

Trong dự án mặc định, bạn sẽ thấy:

- Một thư mục được đặt tên theo tên dự án
- Một tệp Swift kết thúc bằng `App` (điểm vào ứng dụng)
- Một tệp `ContentView.swift` (trang mặc định)

Đây chính là một iOS App có thể chạy tối thiểu.

### 3.5 Chạy iOS App đầu tiên

Trước khi sửa bất kỳ mã nào, trước tiên hãy chạy trực tiếp dự án nguyên bản này.

Trong thanh công cụ trên cùng của Xcode, hãy giữ tùy chọn trình mô phỏng iPhone mặc định, nhấp vào nút ▶︎ **Run** ở góc trên cùng bên trái.

![](images/image19.png)

![](images/image20.png)

Nếu mọi thứ bình thường, trình mô phỏng sẽ hiển thị một App trống có thể khởi động bình thường. Lần đầu biên dịch có thể mất thời gian lâu, trong các chương tiếp theo chúng ta sẽ giảm thời gian chờ biên dịch bằng cách sử dụng nguyên mẫu HTML.

![](images/image21.png)

Nếu cần dừng, nhấp vào **Stop** bên cạnh nút ▶︎.

### 3.6 Điều bạn thực sự đã hoàn thành ở giai đoạn này

Mặc dù giao diện vẫn rất đơn giản, nhưng giai đoạn này đã hoàn thành một số xác nhận chính:

1. Dự án có thể biên dịch thành công
2. Trình mô phỏng có thể chạy App bình thường
3. Quy trình phát triển đã chạy thông suốt

Điều này có nghĩa là các vấn đề gặp phải sau sẽ tập trung vào **mã và logic chính nó** , không phải là vấn đề môi trường.

### 3.7 Giao dự án cho Trae quản lý

Từ phần tiếp theo, công việc phát triển chính sẽ dần chuyển sang hoàn thành trong Trae.

Tất cả những gì bạn cần làm là: **mở thư mục dự án iOS vừa tạo bằng Trae.**

![](images/image22.png)

## Chương 4: Phát triển hỗ trợ AI thực tế —— Tạo "FridgeChef (Đầu bếp Tủ lạnh)" từ đầu

Chương này là phần cốt lõi của toàn bộ hướng dẫn.

Hướng dẫn này sẽ không sử dụng cách truyền thống "viết SwiftUI trước, biên dịch liên tục, điều chỉnh liên tục phía trước", mà sử dụng một quy trình hiệu quả hơn:
**Trước tiên sử dụng HTML để xác minh nhanh cấu trúc giao diện, sau đó di chuyển kết quả sang SwiftUI, cuối cùng dần bổ sung logic kinh doanh, dữ liệu cục bộ và chi tiết trải nghiệm.**

### 4.1 Giai đoạn thứ nhất: Làm rõ yêu cầu

Trước khi bắt đầu viết mã, bước đầu tiên không phải là xây dựng trang, mà là làm rõ những gì cần làm. **Trước tiên hãy để AI hoạt động như một nhà sản xuất sản phẩm, sắp xếp yêu cầu thành một tài liệu giải thích rõ ràng, có cấu trúc.**

Trong cửa sổ trò chuyện của Trae, nhập đoạn chỉ dẫn dưới đây. Trae sẽ tạo một tệp `REQUIREMENTS.md` trong thư mục gốc dự án để mô tả chức năng và cấu trúc của toàn bộ App.

📋 **Sao chép Hướng dẫn (Prompt)** ：

```
我们现在要开发一个名为「冰箱大厨（FridgeChef）」的 iOS App。

1. 核心理念
这是一个解决"冰箱剩菜不知道怎么做"的 AI 助手。
用户输入冰箱里剩余的食材，App 调用大模型生成可执行的食谱。

2. 核心功能
- 首页（Home）：
  显示一个明显的「开始烹饪」入口，下方以卡片或列表形式展示历史生成过的食谱记录。
- 输入页（Input）：
  用户输入食材，支持文本输入或简单的快捷标签。
- 结果页（Result）：
  展示 AI 生成的食谱，包括菜名、食材列表和制作步骤。

3. 技术要求
- 使用 SwiftUI
- 数据保存在本地（Core Data）
- 支持基础的页面跳转与状态更新

请你以产品经理的视角，帮我整理一份清晰、结构化的 REQUIREMENTS.md 文档，并保存在项目根目录。
```

Sau khi tạo xong, chỉ cần duyệt qua tài liệu một lần nhanh, xác nhận rằng các điểm chức năng có phù hợp với kỳ vọng của bạn hay không.

![](images/image23.png)

### 4.2 Giai đoạn thứ hai: Nguyên mẫu hình ảnh

Để AI sử dụng **HTML + CSS** để nhanh chóng vẽ một nguyên mẫu giao diện độ trung thực cao, để xác nhận bố cục tổng thể và phong cách. Tiếp tục nhập hướng dẫn trong Trae:

📋 **Sao chép Hướng dẫn (Prompt)** ：

```
需求已经确认。
请使用 HTML + Tailwind CSS，为我生成一个高保真的界面原型。

设计风格：Neo-Pop（新波普风格）
配色：
- 背景：淡奶油色 #FFFDF5
- 强调色：酸性绿 #CCFF00、热粉色

视觉特征：
- 3px 粗黑色描边
- 不带模糊的硬阴影（偏移 4px）
- 大圆角卡片，整体偏贴纸 / 漫画感

布局要求：
- 首页使用类似 Bento Grid 的布局
- 包含首页和输入页两个界面

请生成一个单文件 index.html，并模拟 iPhone 屏幕比例包裹内容。
```

Sau khi tạo xong, tìm `index.html` trong danh sách tệp và mở trực tiếp trong trình duyệt.

![](images/image24.png)

Trọng tâm hiện tại không phải là chi tiết có hoàn hảo hay không, mà là phán đoán: **cấu trúc trang có hợp lý hay không, các phần tử chính có đầy đủ hay không, hướng tổng thể có đúng hay không.**

### 4.3 Giai đoạn thứ ba: Sao chép gốc

Khi nguyên mẫu HTML đã được xác định, **chuyển giao diện đã được xác nhận thành SwiftUI.**

Các bước hoạt động như sau:

1. Tải tệp `index.html` (hoặc ảnh chụp màn hình trình duyệt) lên Trae
2. Cho AI biết tham khảo tệp đó, tạo mã SwiftUI

📋 **Sao chép Hướng dẫn (Prompt)** ：

```
【已上传 index.html】

请阅读这个 HTML 文件的布局和样式。

任务：使用 SwiftUI 在当前项目中复刻这个界面。

要求：
1. 封装一个 NeoPopStyle 修饰符，包含背景色、粗描边和硬阴影
2. 创建 HomeView.swift，对应首页布局
3. 创建 InputView.swift，对应输入页面
4. 目前使用 Mock Data 填充内容，确保在 Xcode 预览和模拟器中可以正常显示
```

Sau khi hoàn thành, mở Xcode và chạy trình mô phỏng, bạn sẽ thấy một App đã có cấu trúc hình ảnh hoàn chỉnh.

![](images/image25.png)

### 4.4 Giai đoạn thứ tư: Kết nối API AI

Sau khi giao diện hoàn thành, App vẫn chỉ là một lớp trình bày. Tiếp theo cần kết nối khả năng AI thực tế, hướng dẫn này sử dụng dịch vụ mô hình lớn do **SiliconFlow (Lưu lượng Silic)** cung cấp:
[https://cloud.siliconflow.cn](https://cloud.siliconflow.cn/)

![](images/image26.png)

SiliconFlow cung cấp một giao diện tương thích với thông số kỹ thuật OpenAI API, có thể rất tiện lợi để gọi thông qua các yêu cầu mạng tiêu chuẩn trong dự án iOS.

![](images/image27.png)

Trước khi bắt đầu, bạn cần đăng ký tài khoản trên trang web chính thức và tạo một API Key.

![](images/image28.png)

Key này sẽ được sử dụng để gọi mô hình sau này.

📋 **Sao chép Hướng dẫn (Prompt)** ：

```
现在我们要接入 AI 能力。

请创建 APIService.swift。

配置：
- Base URL: https://api.siliconflow.cn/v1
- Model: Qwen/Qwen2.5-7B-Instruct
- API Key：定义为变量，稍后由我填写

功能：
- 编写 generateRecipe(ingredients: [String]) 方法
- System Prompt 严格要求模型只返回纯 JSON
- JSON 字段包括：dishName, ingredients, steps

请同时定义 RecipeModel 结构体，用于解析返回数据。
```

Sau khi tạo mã, điền API Key của riêng bạn vào `APIService.swift`.

### 4.5 Giai đoạn thứ năm: Lưu trữ cục bộ Core Data

Để App có thể nhớ các công thức đã tạo, cần giới thiệu lưu trữ dữ liệu cục bộ. Giai đoạn này được chia thành hai bước.

**Bước thứ nhất: Cấu hình Core Data thủ công (hoàn thành trong Xcode)**

1. Mở `FridgeChef.xcdatamodeld`
2. Tạo Entity mới, đặt tên là `RecipeEntity`

![](images/image29.png)

3. Thêm thuộc tính:
   1. `id`: **UUID**
   2. `name`: **String**
   3. `cookTime`: **String**
   4. `difficulty`: **String**
   5. `desc`: **String**
   6. `timestamp`: **Date**
   7. `colorIndex`: **Integer 16**
      ![](images/image30.png)

**Bước thứ hai: Để AI viết mã logic**

📋 **Sao chép Hướng dẫn (Prompt)** ：

```
我已经完成了 Core Data 的 Entity 配置。

Entity：RecipeEntity
属性：id, name, difficulty, timestamp,colorindex,cookTime,desc

请完成以下任务：
1. 在生成食谱成功后，将数据保存到 Core Data
2. 首页使用 FetchRequest 读取历史记录并按时间倒序展示
3. 当数据库为空时，显示一个友好的空状态提示
```

### 4.6 Giai đoạn thứ sáu: Tạo biểu tượng ứng dụng

Bước cuối cùng là chuẩn bị một biểu tượng chính thức cho App. Ở đây sử dụng **Lovart** để tạo tài liệu biểu tượng: [https://www.lovart.ai/zh](https://www.lovart.ai/zh)

![](images/image31.png)![](images/image32.png)

📋 **Sao chép vào Lovart Prompt** ：

```
Subject: A cute anthropomorphic fridge character with a happy face
Style: Minimalistic App Icon, Neo-pop style, thick black outlines, vector art
Colors: Acid green (#CCFF00) and deep blue
Background: Solid cream color
Negative Prompt: Text, realistic details, 3D render, complex background
```

Sau khi tạo, cắt hình ảnh thành 1024×1024, kéo vào `Assets.xcassets` của Xcode → `AppIcon`.

![](images/image33.png)

![](images/image34.png)

![](images/image35.png)

Chạy lại App, bạn sẽ thấy một ứng dụng iOS thực tế hoàn chỉnh, có thể nhận biết được.

![](images/image36.png)

### 4.7 Giai đoạn thứ bảy: Trải nghiệm nâng cao

Với điều kiện chức năng đã ổn định, nếu bạn muốn tối ưu hóa thêm phong cách hình ảnh, chỉ cần mô tả cho AI hiệu ứng bạn muốn, để nó tạo ra phương án giao diện mới, và chuyển kết quả đã được xác nhận sang SwiftUI.

📋 Tham khảo Prompt:

```
目前 App 的功能已经完成，但我想尝试一种更有视觉冲击力的 UI 风格。
请先使用 HTML + Tailwind CSS 为我生成一个新的设计稿，文件名为 design_v2.html。
设计风格：Neo-Pop（新波普 / 多巴胺风格）
配色要求：
全屏背景使用 Deep Royal Blue（深皇室蓝）
强调色使用 Acid Green（酸性绿 #CCFF00）
视觉质感：
所有卡片使用 3px 黑色粗描边
使用不带模糊的硬阴影（向右下偏移）
布局要求：
首页结构保持不变
按钮和输入框使用胶囊形状
请生成完整代码，并方便我在浏览器中预览效果。
```

Sau khi tạo xong, mở tệp HTML này trong trình duyệt.

![](images/image37.png)

Khi phiên bản HTML đã được xác định, bạn có thể bắt đầu sửa đổi dự án iOS.

📋 Tham khảo Prompt:

```
【已上传 design_v2.html】
请分析这个 HTML 的视觉风格，并将它移植到当前 iOS 项目中。
任务要求：
新建一个 NeoPopStyle.swift 文件
封装一个 neoPopBlue() 风格修饰符
修饰符需要包含：
圆角
粗黑描边
不透明硬阴影
重构 HomeView：
背景改为 Deep Royal Blue
主按钮使用 Acid Green
历史记录卡片使用白色背景
确保文字颜色在深色背景下依然清晰可读
请给出完整修改代码。
```

Nhấp lại nút Run của Xcode. Nếu mọi thứ bình thường, bạn sẽ thấy:

- Chức năng hoàn toàn giống như trước
- Phong cách hình ảnh đã thay đổi rõ rệt
- Chất lượng tổng thể ứng dụng được cải thiện đáng kể

![](images/image38.png)

## Chương 5: Chạy, Gỡ lỗi và Xử lý lỗi

Trong chương trước, bạn đã hoàn thành phát triển chức năng và chạy thành công App trong trình mô phỏng.
Nhưng đối với một ứng dụng iOS, sự hoàn thành thực sự không chỉ là "có thể biên dịch thông qua", mà là **có thể chạy ổn định và biết cách xử lý khi xảy ra vấn đề** .

### 5.1 Chạy App trong Xcode

Trước tiên, hãy đảm bảo dự án có thể chạy bình thường trong Xcode.

Chọn thiết bị chạy ở góc trên cùng bên trái của Xcode, giữ trình mô phỏng iPhone mặc định, nhấp vào nút ▶︎ Run để biên dịch và chạy. Nếu mọi thứ bình thường, App sẽ khởi động trong trình mô phỏng và hiển thị giao diện đã hoàn thành trong chương thứ tư.

### 5.2 Chạy App trên thiết bị thực

Kết nối iPhone với Mac thông qua cáp dữ liệu.

![](images/image39.png)

Lần đầu kết nối, điện thoại sẽ hiện lên "Bạn có tin tưởng máy tính này không?", chọn tin tưởng và nhập mật khẩu mở khóa.

![](images/image40.png)

Trong danh sách thiết bị của Xcode, chọn iPhone của bạn, sau đó nhấp vào ▶️ Run lần nữa.

Lúc này, bạn sẽ thấy biểu tượng "FridgeChef" trên màn hình chính điện thoại và có thể mở và sử dụng bình thường.

![](images/image41.png)

Bước này đánh dấu rằng một vòng phát triển iOS hoàn chỉnh đã được hoàn thành.

### 5.3 Lỗi trong phát triển iOS đến từ đâu

Trong quá trình phát triển thực tế, **gặp lỗi là bình thường** , không phải ngoại lệ.

Các vấn đề phổ biến thường xuất phát từ các loại sau:

1. **Lỗi biên dịch**
   Cú pháp Swift, không khớp kiểu, thiếu tham số, v.v., Xcode sẽ báo đỏ trực tiếp.
2. **Lỗi thời gian chạy**
   Ứng dụng có thể biên dịch, nhưng bị lỗi khi chạy, chẳng hạn như vượt quá giới hạn mảng, giải nén giá trị null.
3. **Lỗi quyền hoặc cấu hình**
   Yêu cầu mạng bị hệ thống chặn, Info.plist chưa được cấu hình, vấn đề ký hiệu, v.v.
4. **Lỗi logic**
   Chương trình không lỗi, nhưng hành vi không phù hợp với kỳ vọng, chẳng hạn như nút không phản hồi, dữ liệu không được làm mới.

![](images/image42.png)

Khi xảy ra bất kỳ lỗi nào, chỉ cần **sao chép thông báo lỗi hoàn chỉnh vào cửa sổ trò chuyện của Trae.** Trae sẽ, dựa trên sự hiểu biết về bối cảnh dự án, giúp bạn hoàn thành công việc gỡ lỗi.

### 5.4 Phương pháp giải quyết lỗi phổ biến khi gỡ lỗi thiết bị thực

Xảy ra lỗi trong giai đoạn gỡ lỗi trên thiết bị thực là rất phổ biến. Những vấn đề này thường không phải là lỗi mã, mà liên quan đến thiết bị, chính sách bảo mật hoặc cấu hình ký hiệu. Nếu App không thể chạy trơn tru trên iPhone, bạn có thể ưu tiên kiểm tra theo phần này.

#### Một: Vấn đề liên quan đến ký hiệu và đăng ký

**Hiện tượng phổ biến:**

- Xcode báo đỏ, thông báo
  `"Communication with Apple failed"`
  hoặc
  `"No profiles for 'com.xxx.xxx' were found"`
- Thông báo
  `"Your team has no devices which are compatible"`

**Giải thích nguyên nhân:**

- Bundle Identifier không độc nhất hoặc không hợp lệ
- iPhone hiện tại chưa được đăng ký với Apple ID của bạn để gỡ lỗi phát triển

**Phương pháp giải quyết:**

1. **Sửa đổi Bundle Identifier**
   Trong cài đặt dự án Xcode, thay đổi Bundle Identifier thành một giá trị độc nhất hơn, ví dụ:
   `com.yourname.FridgeChef`
2. **Để Xcode tự động đăng ký thiết bị**
   Trong thông báo lỗi, nhấp vào `Try Again` hoặc `Register Device`, để Xcode tự động hoàn thành đăng ký thiết bị và cấu hình chứng chỉ.

#### Hai: Vấn đề ghép nối và kết nối thiết bị

**Hiện tượng phổ biến:**

- Xcode hiển thị
  `"Device is not available because pairing is in progress"`
- Thông báo
  `"Device Locked"`
- Đã nhấp "Tin tưởng", nhưng Xcode vẫn bị treo

![](images/image43.png)

**Giải thích nguyên nhân:**

- iPhone ở chế độ khóa màn hình
- Quy trình ghép nối chưa hoàn thành hoàn toàn
- Trạng thái kết nối Xcode chưa được làm mới

**Phương pháp giải quyết:**

1. Mở khóa điện thoại
   Hãy chắc chắn rằng iPhone đã được mở khóa và dừng lại giao diện desktop.
2. Hoàn thành quy trình tin tưởng
   Khi điện thoại hiện "Bạn có tin tưởng máy tính này không?", nhấp **Tin tưởng** và **nhập mật khẩu khóa màn hình.**
3. Làm mới trạng thái kết nối
   Nếu vẫn treo, bạn có thể rút cáp dữ liệu, chờ 2–3 giây rồi cắm lại; nếu cần, khởi động lại Xcode và thử lại.

#### Ba: Không thể mở App sau khi cài đặt

**Hiện tượng phổ biến:**

- App đã được cài đặt thành công vào màn hình chính iPhone
- Hệ thống thông báo
  "Nhà phát triển không đáng tin cậy (Untrusted Developer)"

![](images/image44.png)

**Giải thích nguyên nhân:**

Đây là cơ chế bảo mật của iOS. App gỡ lỗi được cài đặt thông qua Apple ID cá nhân cần được cấp quyền thủ công.

**Phương pháp giải quyết:**

1. Mở iPhone "Cài đặt"
2. Vào "Chung"
3. Nhấp vào "VPN và Quản lý Thiết bị"
4. Trong "App Nhà phát triển", tìm Apple ID của bạn
5. Nhấp vào **Tin tưởng** và xác nhận lại

![](images/image45.png)

Sau khi hoàn thành, quay lại màn hình chính và nhấp lại App, bạn có thể chạy bình thường.

## Chương 6: Nếu bạn muốn phát hành App lên App Store

Trong hướng dẫn này, chúng ta chủ yếu hoàn thành **vòng kín hoàn chỉnh của phiên bản gỡ lỗi phát triển cá nhân App** : từ tạo dự án, phát triển chức năng, chạy gỡ lỗi, đến cuối cùng có thể cài đặt và sử dụng thành công trên thiết bị thực.

Nếu bạn muốn tiếp tục phát hành App chính thức lên **Apple App Store** , cho phép tất cả người dùng tải xuống và sử dụng, thì bạn cần vào một quy trình phát hành chính thức hơn. Vì quy trình này liên quan đến tài khoản trả phí, quy chuẩn phê duyệt và yêu cầu tuân thủ, và không phải là trọng tâm thực hành của hướng dẫn này, nội dung sau đây chỉ dùng làm **tham khảo tổng thể và hướng dẫn đường đi** .

![](images/image46.png)

> Nội dung sau đây tham khảo yêu cầu phê duyệt chính thức của Apple cũng như các cuộc thảo luận công khai (bao gồm cả chia sẻ kinh nghiệm gốc Zhihu). Liên kết xem phần phụ lục. ※Nếu liên kết hết hạn, bạn có thể tìm kiếm tiêu đề hoặc từ khóa liên quan để xem nội dung gốc.

### 6.1 Apple Developer Program

Để phát hành App lên App Store, bạn phải tham gia kế hoạch nhà phát triển trả phí của Apple:

- **Apple Developer Program** ($ 99 mỗi năm)
- Trang web chính thức: [https://developer.apple.com/](https://developer.apple.com/)

Sau khi tham gia, bạn mới có thể sử dụng **App Store Connect** để tạo App, quản lý phiên bản và phát hành chính thức.

### 6.2 App Store Connect: Tạo mục App

Trong App Store Connect, bạn cần tạo một mục hoàn chỉnh cho App, bao gồm nhưng không giới hạn:

1. Tên App và Bundle ID
2. Mô tả, từ khóa, liên kết chính sách quyền riêng tư
3. Biểu tượng App, ảnh chụp màn hình và tài liệu xem trước
4. Cài đặt định giá và phân phối theo khu vực

Những thông tin này phải được điền đầy đủ, nếu không sẽ không thể gửi để phê duyệt.

### 6.3 Xây dựng và gửi phê duyệt

Sau khi hoàn thành cấu hình thông tin, bạn cần:

1. Sử dụng tài khoản trả phí để ký hiệu Release trong Xcode
2. Xây dựng và tải lên phiên bản chính thức
3. Gửi để phê duyệt trong App Store Connect

Sau khi gửi, App sẽ vào hàng đợi phê duyệt của Apple, thời gian phê duyệt thường là 1–3 ngày, tùy từng trường hợp.

### 6.4 Quy chuẩn phê duyệt và nguyên nhân phổ biến

Apple sẽ phê duyệt App từ các khía cạnh sau:

- Chức năng và tính ổn định
- Quyền riêng tư và tuân thủ dữ liệu
- Tính nhất quán giữa siêu dữ liệu và chức năng thực tế
- Liệu có liên quan đến vi phạm bản quyền hoặc hành vi lừa dối hay không

Nếu không phù hợp với yêu cầu, phê duyệt sẽ bị từ chối và sẽ cung cấp lý do cụ thể, các nhà phát triển cần sửa đổi theo phản hồi rồi gửi lại.

### 6.5 Xử lý và giao tiếp sau khi phê duyệt bị từ chối

Khi phê duyệt bị từ chối, bạn có thể:

- Sửa đổi mã hoặc mô tả dựa trên phản hồi
- Gửi lại phiên bản
- Giao tiếp và giải thích với nhóm phê duyệt thông qua App Store Connect

Đây là một bước rất phổ biến trong quá trình phát hành App, và không có nghĩa là dự án thất bại.

### Tài liệu tham khảo và Nguồn trích dẫn

Nội dung sau tham khảo tài liệu chính thức của Apple cũng như chia sẻ kinh nghiệm công khai:

- App Store Review Guidelines (Apple chính thức)
  [https://developer.apple.com/app-store/review/guidelines/](https://developer.apple.com/app-store/review/guidelines/?utm_source=chatgpt.com)
- Hướng dẫn phê duyệt gửi App chính thức
  [https://developer.apple.com/cn/help/app-store-connect/manage-submissions-to-app-review/submit-for-review](https://developer.apple.com/cn/help/app-store-connect/manage-submissions-to-app-review/submit-for-review?utm_source=chatgpt.com)
- Giải thích chi tiết | Quy trình phát hành iOS App toàn bộ và hướng dẫn tránh các lỗ hổng phê duyệt (Zhihu)
  [https://zhuanlan.zhihu.com/p/146128612](https://zhuanlan.zhihu.com/p/146128612)

## Chương 7: Tóm tắt

![](images/image47.png)

Chúc mừng! Đến đây bạn đã hoàn thành toàn bộ quy trình phát triển iOS App từ 0 đến 1 bằng tay của mình. Từ việc thiết lập môi trường, chạy dự án, sau đó giao diện, chức năng, dữ liệu, chạy trên thiết bị thực, mỗi bước đều được hoàn thành thành công, thực tuyệt vời! Điều quan trọng hơn là bạn không phải ghi nhớ các cú pháp Swift để đạt được điều này, mà bạn đã giao mọi thứ cho AI~ Không quan trọng bạn là chuyên ngành gì, mỗi lần cố gắng sẽ chỉ khiến bạn nhanh hơn và suôn sẻ hơn, bạn nhận thấy phát triển iOS cũng không khó như vậy, ngay cả khi không biết viết một dòng mã, bạn vẫn có thể triển khai ứng dụng của riêng mình.

Nhìn lại, toàn bộ quy trình thực sự không phức tạp: suy nghĩ rõ ràng về những gì cần làm, sử dụng HTML để kiểm tra nhanh giao diện, chuyển đổi sang mã SwiftUI, kết nối API và dữ liệu cục bộ, cuối cùng chạy một lần gỡ lỗi là xong. Dựa trên cơ sở này, trong tương lai bạn vẫn có thể tạo nhanh một ứng dụng đồng hồ báo thức chỉ cho bản thân, một danh sách việc cần làm cực kỳ đơn giản, hoặc tạo một máy trò chuyện giọng nói của ngôi sao yêu thích của bạn.

Đây chính là phần cốt lõi nhất của bộ hướng dẫn này, cũng là điều mà easy-vibe muốn dạy bạn! Mong đợi những tác phẩm mới nhất của các bạn những vibe coding master! Mong được bị "đẹp mê hoặc" bởi tác phẩm của bạn!
