---
title: 'Thực Chiến Dự Án Hoàn Chỉnh - Từ Demo Đến Nguyên Mẫu Cấp Sản Phẩm'
description: 'Thoát khỏi giai đoạn Demo, học cách hoàn thiện toàn bộ vòng lặp sản phẩm, xây dựng dữ liệu mô phỏng thực tế, lặp lại nhanh chóng dựa trên phản hồi, cuối cùng hoàn thành một nguyên mẫu sản phẩm AI có thể trình bày và tương tác.'
---

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'khoảng <strong>3 ngày</strong>'
const relatedArticles =
  relatedArticlesMap['vi-vn/stage-1/complete-project-practice'] ?? []
</script>

# Cấp Độ 1 - Phần 5: Thực Chiến Dự Án Hoàn Chỉnh

## Hướng Dẫn Chương

<ChapterIntroduction :duration="duration" :tags="['Tư Duy Sản Phẩm', 'Dữ Liệu Mô Phỏng', 'Tối Ưu Tương Tác', 'LocalStorage']" coreOutput="1 nguyên mẫu sản phẩm AI đầy đủ chức năng" expectedOutput="Ứng dụng Web với vòng lặp hoàn chỉnh và dữ liệu thực tế">

Chương trước đã tích hợp khả năng AI, Demo chạy được rồi, nhưng so với một "sản phẩm" thật sự thì vẫn <strong>còn khoảng cách xa</strong>：trang <strong>mất dữ liệu ngay khi làm mới</strong>, gặp lỗi là <strong>màn hình trắng</strong>, danh sách chỉ có "dữ liệu kiểm tra 1, dữ liệu kiểm tra 2", người dùng click sai là <strong>không có cách hoàn tác</strong>...

Chương này sẽ <strong>lấp đầy tất cả những lỗ hổng đó</strong>：chúng ta sẽ <strong>hoàn thiện toàn bộ vòng lặp sản phẩm</strong>, dùng AI tạo <strong>dữ liệu kinh doanh chân thực</strong> để thay thế dữ liệu giả, thêm <strong>xử lý lỗi và phản hồi người dùng</strong>, cuối cùng tạo ra một <strong>nguyên mẫu hoàn chỉnh có thể trình bày cho người khác</strong>.

Đây là <strong>chương cuối cùng của giai đoạn cơ bản</strong>, hoàn thành phần này, bạn sẽ có được sự chuyển đổi từ "không biết lập trình gì cả" sang "<strong>có khả năng tự độc lập tạo nguyên mẫu sản phẩm AI</strong>".

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Hoàn Thiện Vòng Lặp', description: 'Từ chức năng đơn lẻ đến vòng lặp hoàn chỉnh' },
      { title: 'Tiêm Tinh Thần', description: 'Dữ liệu kinh doanh thực tế' },
      { title: 'Lặp Lại Dựa Trên Phản Hồi', description: 'Tối ưu trải nghiệm dựa trên phản hồi thực tế' },
      { title: 'Bài Tập Lớn Cuối Cùng', description: 'Thiết kế tốt nghiệp của bạn' }
    ]" />
  </ClientOnly>
</div>

## 1. Từ Chối "Happy Path"：Hoàn Thiện Vòng Lặp Cốt Lõi

Nhiều người mới bắt đầu khi làm nguyên mẫu, thường chỉ làm "Happy Path" (con đường lý tưởng nhất)：người dùng click -> API phản hồi thành công -> hiển thị kết quả.
Nhưng trong thế giới thực, mọi việc hiếm khi diễn ra suôn sẻ như thế. Để cho nguyên mẫu của bạn trông như một sản phẩm thực sự, bạn cần xem xét một số "khâu ẩn" sau.

### 1.1 Thêm "Chờ Đợi" Và "Phản Hồi"

Khi người dùng click "Tạo Nội Dung", AI thường cần vài giây để phản hồi. Nếu giao diện không phản ứng gì, người dùng sẽ nghĩ chương trình bị hỏng.
**Bạn cần để IDE AI giúp bạn thêm trạng thái Loading：**

> Ví dụ prompt：
> "Khi tôi click nút tạo, vui lòng đổi nút thành 'Đang tạo...' và tắt khả năng click, đồng thời hiển thị animation loading ở bên phải. Cho đến khi API trả về kết quả, mới khôi phục lại trạng thái bình thường."

### 1.2 Xử Lý "Thất Bại" Và "Ngoại Lệ"

API Key có thể hết hạn, mạng có thể bị ngắt kết nối.
**Bạn cần để IDE AI giúp bạn xử lý lỗi：**

> Ví dụ prompt：
> "Nếu yêu cầu API thất bại, đừng báo lỗi trực tiếp trong console, vui lòng bật một hộp thông báo màu đỏ ở đầu trang (Toast), báo cho người dùng 'Tạo thất bại, vui lòng thử lại sau', và cho phép người dùng click lại tạo."

### 1.3 Lưu Trữ Bền Vững Lịch Sử Hội Thoại

Trong quá trình tương tác với AI, chúng ta cần lưu trữ nội dung hội thoại để người dùng có thể xem lại lịch sử, tiếp tục cuộc trò chuyện trước đó. Ở giai đoạn hiện tại chúng ta tạm không giới thiệu cơ sở dữ liệu, có thể chọn một trong những giải pháp nhẹ sau：

**Lựa Chọn Phương Án Lưu Trữ：**

| Phương Án        | Trường Hợp Sử Dụng                         | Đặc Điểm                                     |
| ---------------- | ------------------------------------------ | -------------------------------------------- |
| **LocalStorage** | Dự án toàn frontend, dữ liệu người dùng lưu trong trình duyệt | Cài đặt đơn giản, không mất dữ liệu khi làm mới, không thể đồng bộ giữa các thiết bị |
| **Tệp JSON**    | Nguyên mẫu cục bộ, dữ liệu lưu dưới dạng tệp | Cấu trúc rõ ràng, thuận tiện debug, có thể chỉnh sửa thủ công |
| **Tệp TXT**     | Phương án đơn giản nhất, ghi nhanh nội dung văn bản | Định dạng tự do, khả năng tương thích tốt |

**Ví Dụ Nội Dung Hội Thoại：**
Lịch sử hội thoại được lưu thường chứa nội dung sau：

```json
[
  {
    "role": "user",
    "content": "Giúp tôi tạo nội dung bán hàng TikTok cho tai nghe Bluetooth",
    "timestamp": "2026-01-20 10:30:00"
  },
  {
    "role": "assistant",
    "content": "【Nội Dung Bán Hàng Tai Nghe Bluetooth】\n\n🎧 Từ Biệt Độ Trễ, Trải Nghiệm Nghe Nhạc Nhập Tâm\n\nCác chị em! Cặp tai nghe này thực sự tuyệt vời👇\n\n✅ Khử tiếng ồn chủ động 40dB, lập tức vào thế giới âm nhạc\n✅ Tuổi thọ siêu dài 30 giờ, một tuần đi làm không cần sạc\n✅ Chất lượng cuộc gọi rõ ràng như nói mặt đối mặt, ngay cả trên tàu điện ngầm ồn ào cũng có thể trò chuyện\n✅ Thiết kế bán vào tai, đeo lâu không đau tai không nghe ngạc\n\n💰 Khuyến mãi thời hạn, click link dưới để mua ngay!",
    "timestamp": "2026-01-20 10:30:05"
  }
]
```

**Gợi ý prompt：**

> "Vui lòng giúp tôi cài đặt chức năng lưu trữ lịch sử hội thoại. Hỗ trợ lưu bản ghi hội thoại giữa người dùng và AI dưới dạng tệp JSON (hoặc sử dụng LocalStorage). Mỗi lần vào trang sẽ tự động tải lịch sử hội thoại, hỗ trợ xem và xóa bản ghi hội thoại từng cái."

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Hoàn Thiện Vòng Lặp', description: 'Từ chức năng đơn lẻ đến vòng lặp hoàn chỉnh' },
      { title: 'Tiêm Tinh Thần', description: 'Dữ liệu kinh doanh thực tế' },
      { title: 'Lặp Lại Dựa Trên Phản Hồi', description: 'Tối ưu trải nghiệm dựa trên phản hồi thực tế' },
      { title: 'Bài Tập Lớn Cuối Cùng', description: 'Thiết kế tốt nghiệp của bạn' }
    ]" />
  </ClientOnly>
</div>

## 2. Tiêm Tinh Thần：Mô Phỏng Dữ Liệu Thực Tế (Mock Data)

Một trang trống rỗng không thể tạo được cảm hứng cho người khác. Hãy tưởng tượng, bạn trình bày "bảng điều khiển tài liệu bán hàng TikTok" cho ai đó, kết quả lịch sử bản ghi trống rỗng, hoặc chỉ có một dòng "test / test / test".
Để hiệu ứng trình bày tốt nhất, chúng ta cần "giả mạo" một số dữ liệu chân thực, làm cho nguyên mẫu của bạn trông giống như một sản phẩm thực sự đã hoạt động được nửa năm.

### 2.1 Để AI Giúp Bạn Thiết Kế Cấu Trúc Dữ Liệu

Chúng ta không cần tự suy nghĩ từng trường dữ liệu tên gì (chẳng hạn như `name` hay `title`), việc này hoàn toàn có thể giao cho AI.

Bạn chỉ cần báo cho AI biết **tình huống kinh doanh** của bạn：

> **Ví Dụ Prompt：**
> "Tôi đang làm nguyên mẫu cho một **bảng điều khiển tài liệu bán hàng TikTok**.
> Vui lòng giúp tôi thiết kế một cấu trúc dữ liệu JSON, dùng để mô tả một 'nhiệm vụ sản phẩm'.
> Nhiệm vụ này nên bao gồm：thông tin cơ bản sản phẩm (tên, danh mục), tài liệu đầu vào (liên kết hình ảnh), và kết quả do AI tạo (tiêu đề, nội dung bán hàng, hình ảnh poster).
> Vui lòng cho tôi trực tiếp một ví dụ JSON."

AI sẽ dựa vào mô tả của bạn, tự động giúp bạn suy nghĩ ra những trường như `productName`, `generatedContent` như vậy.

### 2.2 Để AI Sản Xuất Hàng Loạt Dữ Liệu "Chân Thực"

Có cấu trúc dữ liệu rồi, bước tiếp theo là để AI giúp bạn "điền khuyết", tạo một loạt dữ liệu trông chân thực.

**Mẹo Tạo Prompt：**
Bạn không thể chỉ nói với AI "giúp tôi tạo dữ liệu", bạn cần như giao việc cho thực tập sinh vậy, báo cho nó **bối cảnh kinh doanh** và **yêu cầu nội dung**：

- **Bối Cảnh Kinh Doanh**：báo cho AI rằng chúng ta đang làm "thương mại điện tử TikTok", nên tiêu đề sản phẩm phải hấp dẫn (chẳng hạn như "bí kíp giảm béo", "phải mua khi là sinh viên"), nội dung bán hàng phải theo lối nói chuyện hàng ngày.
- **Yêu Cầu Hình Ảnh**：để nguyên mẫu trông đẹp, hình ảnh không thể là chỗ để hình ảnh đen trắng, tốt nhất là hình ảnh phong cảnh hoặc sản phẩm thực tế ngẫu nhiên có màu sắc.

> **Ví Dụ Prompt：**
> "Vui lòng dựa trên cấu trúc vừa thiết kế, giúp tôi tạo 10 dữ liệu mô phỏng chân thực.
> (Chú ý：không nhất thiết phải định dạng JSON. Nếu bạn đang viết frontend, có thể để nó tạo trực tiếp mảng JavaScript；nếu bạn dùng Python, có thể để nó tạo List.)
>
> **Yêu Cầu Tình Huống Kinh Doanh**：
>
> 1. Giả định đây là một cửa hàng bán các mặt hàng tổng hợp, sản phẩm bao gồm 'quần áo nữ', 'thiết bị điện tử', 'mỹ phẩm' ba danh mục.
> 2. **Tiêu đề và nội dung bán hàng được tạo phải rất 'theo phong cách TikTok'**：ví dụ tiêu đề nên bao gồm Emoji (🔥, ✨), nội dung nên dùng 'tuyệt vời', 'đã kiểm tra tốt' kiểu gọi này.
> 3. **Trường Hình Ảnh**：vui lòng thống nhất sử dụng định dạng `https://picsum.photos/seed/{random_id}/300/400`, đảm bảo từng ảnh đều khác nhau."

**Ví Dụ Mock Data Được Tạo：**

```javascript
export const mockProductTasks = [
  {
    id: 'task_001',
    name: 'Váy Hoa Cổ Điển Pháp Mùa Hè',
    status: 'completed',
    input: {
      category: 'quần áo nữ',
      features: ['cạp hẹp', 'che dáng', 'tinh tế'],
      originalImage: 'https://picsum.photos/seed/dress_input/300/400'
    },
    output: {
      generatedTitle: '✨Ai mặc ai đẹp! Chiếc váy hoa cổ điển Pháp này thực sự tuyệt vời🔥',
      generatedCopy:
        'Chị em! Chiếc váy này thực sự quá che dáng! Thiết kế cạp hẹp tuyệt vời, mặc lên lập tức có vòng eo. Chất vải rất thoáng mát, mặc vào mùa hè hoàn toàn không bực. Hẹn hò dạo phố là lựa chọn hàng đầu! 👗',
      generatedPosterImage: 'https://picsum.photos/seed/dress_output/300/400'
    },
    createdAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'task_002',
    name: 'Tai Nghe Bluetooth Khử Tiếng Ồn Siêu Mạnh Pro',
    status: 'completed',
    input: {
      category: 'thiết bị điện tử',
      features: ['khử tiếng ồn', 'tuổi thọ siêu dài', 'độ trễ thấp'],
      originalImage: 'https://picsum.photos/seed/tech_input/300/400'
    },
    output: {
      generatedTitle: '🎧 Cuối cùng tôi cũng tìm thấy rồi! Tai nghe này khử tiếng ồn mạnh quá! 🔇',
      generatedCopy:
        'Đeo lên nó, thế giới lập tức yên tĩnh. Chất lượng âm thanh tuyệt vời, nghe nhạc như ở sân khấu trực tiếp. Tuổi thọ cũng rất tốt, sạc một lần pin dùng cả tuần! Sinh viên phải mua!',
      generatedPosterImage: 'https://picsum.photos/seed/tech_output/300/400'
    },
    createdAt: '2026-01-21T14:30:00Z'
  }
  // ... thêm dữ liệu
]
```

### 2.3 (Nâng Cao) Sử Dụng LocalStorage Để Hiện Thực Hóa "Giả Thêm Xóa Sửa"

Nếu bạn muốn "dữ liệu mô phỏng" vừa nói không chỉ có thể xem, mà còn có thể xóa, có thể sửa, thậm chí các nhiệm vụ mới tạo sau khi làm mới trang vẫn còn, bạn có thể kết hợp với `LocalStorage`.

> **Ví Dụ Prompt：**
> "Vui lòng giúp tôi cài đặt chức năng lưu trữ dữ liệu.
>
> 1. Ưu tiên đọc dữ liệu từ `localStorage`.
> 2. Nếu `localStorage` trống, thì dùng Mock data vừa được tạo để khởi tạo, và lưu chúng vào `localStorage`.
> 3. Đồng thời giúp tôi viết các hàm `addProductTask` và `deleteProductTask`, mỗi lần thao tác đều phải đồng bộ cập nhật `localStorage`."

Qua bước này, nguyên mẫu của bạn sẽ có "ký ức", trải nghiệm người dùng gần như không khác gì so với sản phẩm thực sự.

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Hoàn Thiện Vòng Lặp', description: 'Từ chức năng đơn lẻ đến vòng lặp hoàn chỉnh' },
      { title: 'Tiêm Tinh Thần', description: 'Dữ liệu kinh doanh thực tế' },
      { title: 'Lặp Lại Dựa Trên Phản Hồi', description: 'Tối ưu trải nghiệm dựa trên phản hồi thực tế' },
      { title: 'Bài Tập Lớn Cuối Cùng', description: 'Thiết kế tốt nghiệp của bạn' }
    ]" />
  </ClientOnly>
</div>

## 3. Thu Thập Phản Hồi Và Lặp Lại Nhanh Chóng

Đóng cửa sáng tạo là không thể tạo ra sản phẩm tốt. Bây giờ nguyên mẫu của bạn đã có "chức năng cốt lõi" + "vòng lặp hoàn chỉnh" + "dữ liệu trình bày", đã đến lúc cho người khác xem rồi.

### 3.1 Tìm Ai Để Kiểm Tra? Kiểm Tra Như Thế Nào?

- **Tìm bạn/đồng nghiệp**：không cần họ hiểu công nghệ, chỉ cần để họ thử dùng một lần.
- **Quan sát chứ không hướng dẫn**：đừng nói "click vào đây", mà là xem họ sẽ click vào đâu. Nếu họ không tìm thấy nút, điều đó có nghĩa thiết kế có vấn đề.
- **"Wizard of Oz" (Phương Pháp Phù Thủy Phương Tây)**：nếu AI của bạn chưa kết nối, bạn có thể tự tay ở backend (hoặc cơ sở dữ liệu) chỉnh sửa dữ liệu để mô phỏng kết quả AI trả về, trước tiên xác minh xem người dùng có thực sự cần chức năng này không.

### 3.2 Đối Mặt Với Bug Và Lời Chê Bai

- **Giao diện lộn xộn**：ở các kích thước màn hình khác nhau có thể bị lộn xộn.
  - **Hành Động**：chụp ảnh màn hình gửi IDE AI -> "Ở kích thước màn hình này bị lộn xộn, vui lòng sửa giúp tôi."
- **Thao tác khó chịu**："quy trình này quá phức tạp".
  - **Hành Động**：báo gợi ý cho IDE AI -> "Người dùng cảm thấy tải lên rồi mới tạo quá chậm, có thể đổi thành tạo một lần không?"
- **Nhu Cầu Mới**："nếu có chức năng này thì tốt quá".
  - **Hành Động**：đánh giá xem nó có phải là chức năng cốt lõi không, nếu có, để AI nhanh chóng cài đặt một phiên bản đơn giản hóa.

**Nhớ rằng：ở giai đoạn này, AI là trợ thủ tốt nhất của bạn để sửa đổi. Bạn chỉ cần chịu trách nhiệm phát hiện vấn đề, để AI sửa code.**

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: 'Hoàn Thiện Vòng Lặp', description: 'Từ chức năng đơn lẻ đến vòng lặp hoàn chỉnh' },
      { title: 'Tiêm Tinh Thần', description: 'Dữ liệu kinh doanh thực tế' },
      { title: 'Lặp Lại Dựa Trên Phản Hồi', description: 'Tối ưu trải nghiệm dựa trên phản hồi thực tế' },
      { title: 'Bài Tập Lớn Cuối Cùng', description: 'Thiết kế tốt nghiệp của bạn' }
    ]" />
  </ClientOnly>
</div>

## 4. 🎓 Bài Tập Lớn Giai Đoạn：Hoàn Thành "Thiết Kế Tốt Nghiệp" Của Bạn

Chúc mừng! Bạn đã đi qua toàn bộ quy trình từ "yêu cầu" đến "nguyên mẫu" rồi đến "tích hợp AI". Bây giờ, đã đến lúc trình bày kết quả cuối cùng của bạn rồi.

**Bài tập lớn lần này không còn bị giới hạn trong "bảng điều khiển tài liệu bán hàng TikTok"**. Bạn cần kết hợp với sở thích của mình hoặc nền tảng công nghiệp, tạo ra một nguyên mẫu sản phẩm AI độc nhất vô nhị.

### Chọn Đề Tài Và Yêu Cầu

Bạn cần chọn một kịch bản gần nhất từ **[Tham Khảo Hướng Dẫn Kịch Bản Đa Phân Loại Công Nghiệp](../appendix-industry-scenarios/index.md)**, hoặc suy nghĩ ra một kịch bản hoàn toàn mới dựa trên ý tưởng của mình.

**Dự Án Phải Kết Hợp Toàn Bộ Nội Dung Bạn Đã Học Từ Các Phần Trước：**

1.  **Xây Dựng Nguyên Mẫu**：sử dụng kỹ thuật frontend để xây dựng giao diện đẹp và dễ sử dụng.
2.  **Kiểm Soát Yêu Cầu**：không cần lớn mà tất cả, nhưng logic chức năng cốt lõi phải kín kẽ.
3.  **Tích Hợp API**：tích hợp mô hình AI thực sự (LLM/VLM vv), mang đến trí thông minh thực sự cho ứng dụng.
4.  **Tạo Một Ứng Dụng Có Thể Chơi Được**：không chỉ trang tĩnh, mà là ứng dụng động với dòng dữ liệu, có phản hồi tương tác.

### Sản Phẩm Bài Tập Lớn

Cuối cùng bạn cần nộp hai thứ sau：

1.  **Một Ứng Dụng Nguyên Mẫu Hoàn Chỉnh**：triển khai trực tuyến hoặc có thể chạy cục bộ, có vòng lặp sử dụng hoàn chỉnh.
2.  **Video Trình Bày Kéo Dài 30 Giây**：quay một video, giới thiệu sơ qua tình huống ứng dụng của bạn, và trình bày thao tác chức năng cốt lõi thực tế.

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">🚀 Danh Sách Kiểm Tra Thử Thách Cuối Cùng</div>
  </template>

  <p>
    Đây là trận chiến cuối cùng của Stage 1. Vui lòng kiểm tra tác phẩm của bạn theo danh sách dưới đây：
  </p>

  <div style="font-weight: bold; margin-bottom: 10px;">Kiểm Tra Chức Năng Cốt Lõi</div>
  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> <strong>Tình Huống Rõ Ràng</strong>：đã chọn một kịch bản công nghiệp hoặc ứng dụng cụ thể</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Logic Kín Kẽ</strong>：quy trình cốt lõi có thể chạy được, không chỉ Happy Path</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Được Thúc Đẩy Bởi AI</strong>：thực sự gọi API mô hình lớn, không phải trả lời được cài đặt sẵn</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Trải Nghiệm Hoàn Chỉnh</strong>：bao gồm Loading, xử lý lỗi và dữ liệu mô phỏng</label></li>
  </ul>

  <div style="font-weight: bold; margin: 20px 0 10px;">Chuẩn Bị Sản Phẩm</div>
  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> <strong>Ứng Dụng Nguyên Mẫu</strong>：code đã hoàn thành và có thể chạy được</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Video Trình Bày</strong>：khoảng 30 giây, trình bày rõ ràng các điểm nổi bật cốt lõi</label></li>
  </ul>
</el-card>

## Bước Tiếp Theo

Sau khi hoàn thành bài tập lớn, bạn đã có khả năng "phát triển độc lập nguyên mẫu ứng dụng AI".
Trong Stage 2 sắp tới, chúng ta sẽ tìm hiểu sâu hơn vào phát triển toàn ngăn xếp phức tạp hơn, tìm hiểu cách chuyển nguyên mẫu này thành một ứng dụng cấp thương mại thực sự có thể triển khai trực tuyến, có cơ sở dữ liệu, có hệ thống người dùng.

Hẹn gặp lại bạn ở giai đoạn tiếp theo!

<RelatedArticlesSection
  title="Tiếp Tục Tiến Bộ"
  description="Chúc mừng hoàn thành Stage 1, các chương dưới đây có thể giúp bạn bước vào phát triển kỹ thuật."
  :items="relatedArticles"
/>
