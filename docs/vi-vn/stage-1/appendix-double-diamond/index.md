---
title: 'Double Diamond: Làm đúng việc trước, rồi làm việc đúng'
description: 'Bài viết nhập môn Double Diamond dành cho người mới bắt đầu. Hiểu được bốn giai đoạn Discover, Define, Develop, Deliver, tránh vội vàng làm prototype khi chưa làm rõ vấn đề.'
---

<script setup>
const duration = 'khoảng <strong>1.5 giờ</strong>'
</script>

# Double Diamond: Làm đúng việc trước, rồi làm việc đúng

<a id="top-dd"></a>

## Hướng dẫn chương

<ChapterIntroduction
  :duration="duration"
  :tags="['Double Diamond', 'Tư duy thiết kế', 'Phân tích nhu cầu', 'Thiết kế giải pháp']"
  coreOutput="1 định nghĩa vấn đề rõ ràng hơn và 1 cách tiếp cận xác thực hợp lý hơn"
  expectedOutput="Không vội vàng vẽ prototype ngay, mà biết cần suy nghĩ rõ vấn đề trước, rồi so sánh các giải pháp"
>

Khi làm sản phẩm lần đầu, lỗi dễ gặp nhất không phải là "không nỗ lực đủ", mà là vội vàng bước vào giải pháp.

Vừa có một ý tưởng, bạn đã bắt đầu nghĩ cách vẽ trang, đặt nút ở đâu, có cần kết nối AI không, có cần đăng ký không, dùng công cụ gì vẽ prototype. Sau một vòng bận rộn, mới phát hiện ra vấn đề cốt lõi chưa được suy nghĩ rõ: liệu người dùng có thực sự gặp vấn đề này không? Vấn đề này có đáng giải quyết bây giờ không? Bạn tưởng mình đang thúc đẩy dự án, nhưng thực ra chỉ đang tăng tốc độ đi sai hướng.

Double Diamond chính là để tránh tình huống này.

Giá trị lớn nhất của nó là: **"Làm đúng việc" và "làm việc đúng" là hai giai đoạn hoàn toàn khác nhau.** Nếu bạn chưa hiểu rõ vấn đề, mà vội vàng làm prototype, thường chỉ làm hoàn chỉnh hơn hướng sai.

</ChapterIntroduction>

::: info SOP tối thiểu
**Mục đích**: Sau khi đọc xong, bạn sẽ rõ hơn khi nào nên suy nghĩ vấn đề, khi nào mới bắt đầu suy nghĩ giải pháp và prototype, tránh bị vào tình trạng làm việc rất nghiêm túc nhưng theo hướng sai.

**Các hành động**: Đi theo `Discover → Define → Develop → Deliver`, mỗi bước chỉ làm việc phù hợp với giai đoạn hiện tại.

**Kết quả**: Bạn sẽ có một định nghĩa vấn đề rõ ràng hơn, một vài giải pháp có thể so sánh, và một phiên bản tối thiểu có thể xác thực.

**Chuyển đến từ khóa**: [Double Diamond là gì](#dd-what) · [Hình kim thứ nhất](#dd-first) · [AI giúp bạn như thế nào](#dd-ai)
:::

## Bạn sẽ học được những gì

1. Double Diamond là gì, tại sao nó phù hợp khi bạn bắt đầu làm sản phẩm từ con số không
2. Bốn giai đoạn Discover, Define, Develop, Deliver lần lượt làm gì
3. Cách phân biệt "bây giờ nên tiếp tục mở rộng" hay "bây giờ nên bắt đầu thu hẹp"
4. Cách áp dụng Double Diamond trong sản phẩm AI, thiết kế prototype và xác thực nhu cầu

<a id="dd-what"></a>
## [1. Double Diamond là gì](#top-dd)

Double Diamond là một khung quy trình thiết kế cổ điển được **Design Council** (Anh) phổ biến. Nó vẽ một quá trình thiết kế và đổi mới hoàn chỉnh thành hai hình kim nối tiếp.

Lý do là "kim" là vì mỗi hình kim chứa hai động tác trái ngược nhưng đều quan trọng:

- **Mở rộng**: Mở rộng tầm nhìn, xem thêm nhiều khả năng
- **Thu hẹp**: Thu nhỏ phạm vi, đưa ra quyết định và lựa chọn

Toàn bộ quá trình gồm bốn bước:

1. **Discover**: Hiểu rộng về người dùng, vấn đề, môi trường và thị trường
2. **Define**: Từ một lượng lớn thông tin, rút ra vấn đề cốt lõi thực sự đáng giải quyết
3. **Develop**: Mở rộng nhiều giải pháp khác nhau xung quanh vấn đề cốt lõi
4. **Deliver**: Lọc lọc, tạo prototype, kiểm tra và phân phối giải pháp phù hợp hơn

Nếu nén bốn bước này thành một câu dễ nhớ nhất, đó là:

- **Hình kim thứ nhất**: Làm rõ vấn đề cần giải quyết
- **Hình kim thứ hai**: Quyết định dùng giải pháp gì để giải quyết

Đó cũng chính là câu bạn vừa nói rất chính xác:

- **Hình kim thứ nhất: Làm đúng việc**
- **Hình kim thứ hai: Làm việc đúng**

## 2. Tại sao Double Diamond đặc biệt phù hợp cho người mới

Nhịp độ làm sản phẩm thường gặp ở người mới là như thế này:

- Có một ý tưởng
- Cảm thấy hướng này rất hay
- Ngay lập tức bắt đầu vẽ prototype
- Làm đến khi hàm lượng chức năng ngày càng tăng
- Cuối cùng không biết mình đang giải quyết vấn đề gì

Giá trị của Double Diamond không phải làm quy trình phức tạp hơn, mà **buộc bạn tách "hiểu vấn đề" và "thiết kế giải pháp"**.

Nghe có vẻ bình thường, nhưng thực tế rất quan trọng. Vì nhiều sản phẩm thất bại không phải vì không thực hiện tâm huyết, mà vì:

- Chọn sai vấn đề
- Hiểu sai người dùng
- Khóa giải pháp quá sớm
- Dành nhiều thời gian chỉnh chi tiết, nhưng không xác thực hướng đi

Double Diamond lúc nào cũng nhắc bạn:

- Đừng vì ý tưởng được chuẩn bị mà giả định vấn đề đã tồn tại
- Đừng vì giải pháp có thể làm được mà giả định nó đáng làm
- Đừng vì prototype có vẻ hoàn chỉnh mà giả định người dùng sẽ thực sự cần

<a id="dd-first"></a>
## [3. Hình kim thứ nhất: Làm đúng việc](#top-dd)

Hình kim thứ nhất tập trung vào **vấn đề**, không phải giải pháp.

Bạn có thể hiểu nó thành một câu: **Đừng vội làm, trước tiên làm rõ có đáng làm không.**

### 3.1 Discover: Mở rộng không gian vấn đề

Nhiệm vụ cốt lõi của giai đoạn Discover là **điều tra rộng rãi, không phải kết luận nhanh.**

Bước này thường làm những việc sau:

- Quan sát người dùng làm gì trong tình huống thực
- Phỏng vấn người dùng tiềm năng, hiểu lần gần nhất họ gặp vấn đề là khi nào
- Quan sát họ đang cách nào giải quyết lóc cóc
- Xem các sản phẩm cạnh tranh và giải pháp thay thế xử lý như thế nào
- Thu thập thông tin về thị trường, quy trình, ràng buộc, và các bên liên quan

Nhiều người nhầm Discover là "xem thêm tài liệu". Thực ra quan trọng hơn là: **bạn phải hiểu người và tình huống, không chỉ tìm kiếm một lượng thông tin.**

Ví dụ bạn muốn làm một công cụ "AI giúp tổng hợp biên bản cuộc họp", ở giai đoạn Discover bạn nên tập trung vào:

- Sau cuộc họp, người dùng khó khăn nhất ở chỗ nào
- Là ghi chép khó, hay tổng hợp khó, hay đồng bộ khó
- Họ hiện đang tự viết, để sinh viên viết, nghe lại ghi âm, hay đơn giản là không tổng hợp
- Tình huống cuộc họp nào nhất cần biên bản, tình huống nào không cần

Mục tiêu quan trọng nhất ở bước này không phải tìm câu trả lời, mà là **đừng quá sớm nghĩ rằng mình đã biết câu trả lời.**

### 3.2 Define: Rút ra vấn đề cốt lõi từ một lượng thông tin lớn

Nếu Discover là mở rộng tầm nhìn, Define là bắt đầu thu hẹp.

Giai đoạn Define phải làm, không phải giữ lại toàn bộ quan sát, mà hỏi:

- Vấn đề thực sự đáng ưu tiên giải quyết là vấn đề nào
- Vấn đề nào xuất hiện thường xuyên nhất, cấp bách nhất, có giá trị nhất
- Phiên bản đầu tiên của chúng ta chỉ tập trung vào tình huống nào

Cốt lõi của bước này là kéo một chủ đề rộng thành một định nghĩa vấn đề rõ ràng.

Ví dụ bạn lúc đầu nói:

> Tôi muốn làm một công cụ AI để cải thiện hiệu suất họp.

Đến giai đoạn Define, cách diễn đạt tốt hơn có thể trở thành:

> Chúng tôi trước tiên giải quyết vấn đề nhóm dự án không thể xuất ra biên bản có công việc cần làm, người chịu trách nhiệm và thời hạn trong vòng 10 phút sau buổi họp cộng tác kéo dài từ 30 đến 60 phút.

Lúc này vấn đề bắt đầu rõ ràng:

- Người dùng là ai
- Tình huống là gì
- Nút cổ chai là gì
- Tiêu chí thành công là gì

Bản chất của Define là **từ "nhiều vấn đề" thu hẹp thành "lần này giải quyết vấn đề nào".**

## 4. Hình kim thứ hai: Làm việc đúng

Khi bạn hoàn thành hình kim thứ nhất, mới thực sự phù hợp bước vào hình kim thứ hai. Vì lúc này bạn giải quyết không phải một hướng mơ hồ, mà là một vấn đề cụ thể được thu hẹp.

### 4.1 Develop: Mở rộng nhiều giải pháp xung quanh vấn đề cốt lõi

Trọng tâm của giai đoạn Develop là **xung quanh cùng một vấn đề, khám phá nhiều giải pháp khả thi.**

Chú ý, sự mở rộng ở đây khác với giai đoạn Discover.

- Mở rộng của Discover là khám phá không gian vấn đề
- Mở rộng của Develop là khám phá không gian giải pháp

Ví dụ vẫn với biên bản cuộc họp, đến giai đoạn Develop, bạn có thể bắt đầu suy nghĩ:

- Là công cụ web, hay plugin cuộc họp
- Là tải lên ghi âm rồi xử lý, hay ghi âm thực tế
- Chỉ làm tóm tắt, hay tập trung vào trích xuất công việc cần làm
- Nhấn mạnh hiệu suất cá nhân, hay nhấn mạnh đồng bộ nhóm
- Cho người dùng tự do chỉnh sửa, hay xuất ra mẫu có cấu trúc trực tiếp

Bước này rất phù hợp với brainstorm, cũng rất phù hợp khi cùng nhóm mở rộng các giải pháp.

Nhưng có một tiền đề: **tất cả giải pháp phải phục vụ cùng một vấn đề đã định nghĩa.**  
Nếu vấn đề chưa định nghĩa rõ, Develop dễ lại trở thành chức năng lộn xộn.

### 4.2 Deliver: Chọn giải pháp, làm prototype, kiểm tra và phân phối

Giai đoạn Deliver là bước thu hẹp trong hình kim thứ hai.

Lúc này bạn phải làm không phải tiếp tục suy nghĩ thêm, mà bắt đầu đánh giá:

- Giải pháp nào phù hợp nhất ở giai đoạn hiện tại
- Phiên bản nào tối thiểu nhưng hữu ích nhất
- Chức năng nào phải làm trước, chức năng nào có thể để sau
- Cách làm prototype, kiểm tra và xác thực ở quy mô nhỏ

Nhiều người tưởng Deliver tương đương với "lên sản phẩm". Thực ra ý nghĩa chính xác hơn là: **biến một giải pháp thành thứ có thể kiểm tra, xác thực, và lặp lại.**

Nó có thể là:

- Một sơ đồ quy trình độ trung thực thấp
- Một prototype Figma
- Một MVP có thể chạy
- Một lần kiểm tra người dùng ở quy mô nhỏ
- Một phiên bản lặp lại sau khi có phản hồi thực

Trọng tâm của Deliver không phải "phân phối hoàn hảo", mà **đưa giải pháp vào môi trường thực để xác thực sớm nhất.**

## 5. Một bảng đối chiếu dễ nhớ nhất

Nếu bạn luôn phân biệt không được bốn giai đoạn, có thể ghi nhớ phiên bản dưới đây:

| Giai đoạn | Bạn đang làm gì | Từ khóa | Kết quả thường gặp |
| --- | --- | --- | --- |
| Discover | Hiểu vấn đề | Điều tra, quan sát, phỏng vấn, thu thập thông tin | Nhận thức người dùng, ghi chép tình huống, danh sách vấn đề |
| Define | Định nghĩa vấn đề | Rút ra, tập trung, lựa chọn, viết lại vấn đề | Định nghĩa vấn đề, ưu tiên, cách tiếp cận MVP |
| Develop | Khám phá giải pháp | Brainstorm, so sánh, cộng tác, hình dung prototype | Danh sách giải pháp, bản phác thảo quy trình, hướng prototype |
| Deliver | Xác thực giải pháp | Prototype, kiểm tra, lặp lại, phân phối | Prototype, phản hồi kiểm tra, phiên bản tối ưu |

Nén thêm một chút, có thế là:

- **Discover / Define**: Giải quyết "làm đúng việc"
- **Develop / Deliver**: Giải quyết "làm việc đúng"

## 6. Những sai lầm phổ biến nhất của Double Diamond

### 6.1 Chưa Discover, đã Deliver

Đây là tình huống phổ biến nhất. Nhiều người vừa có ý tưởng đã bắt đầu vẽ prototype, viết PRD, kết nối mô hình, làm trang.

Vấn đề không phải bạn làm không tâm huyết, mà là bạn có thể chưa xác nhận vấn đề có đáng giải quyết không.

### 6.2 Discover lâu, nhưng không bao giờ Define

Một cực đoan khác là lúc nào cũng điều tra, lúc nào cũng xem tài liệu, lúc nào cũng phỏng vấn, nhưng chưa bao giờ dám thu hẹp.

Double Diamond không phải để bạn mở rộng vô hạn, mà nhắc bạn: mở rộng xong thì phải quyết định và lựa chọn.

### 6.3 Sau Define, lại thay đổi vấn đề bí mật

Nhiều nhóm sẽ vì một giải pháp dễ làm hơn, nên quay lại sửa định nghĩa vấn đề, để nó phù hợp với giải pháp hiện tại.

Điều này rất nguy hiểm. Vì bạn có thể không phải giải quyết vấn đề, mà tìm lý do cho giải pháp mình ưa thích.

### 6.4 Hiểu sai Deliver thành "lên sản phẩm hoàn toàn"

Deliver không phải nói phải làm xong toàn bộ sản phẩm mới tính. Rất nhiều khi, một prototype có thể kiểm tra, một lần dùng thử với người dùng thực, đã là một deliver tốt.

## 7. Trong sản phẩm AI, Double Diamond dùng như thế nào

Sản phẩm AI rất dễ rơi vào bẫy "khả năng trước", vì khả năng mô hình trông quá hấp dẫn. Bạn sẽ rất muốn trực tiếp suy nghĩ:

- Có cần kết nối đa phương thức không
- Có cần làm Agent không
- Có cần thêm workflow không
- Có cần kết nối giọng nói, hình ảnh, tìm kiếm web không

Nhưng Double Diamond sẽ buộc bạn hỏi trước:

- Người dùng thực sự kẹt ở khâu nào
- Kẹt này có bắt buộc phải dùng AI không
- Nếu không dùng AI, cách hiện tại tệ nhất ở đâu
- AI thêm vào, tiến bộ cốt lõi là gì

Điều này giúp tránh được một tình huống phổ biến: **khả năng rất mạnh, giá trị rất yếu.**

Một thứ tự thực dụng là:

1. Ở giai đoạn Discover quan sát người dùng đang xử lý tác vụ như thế nào
2. Ở giai đoạn Define viết vấn đề phổ biến nhất thành một câu định nghĩa rõ ràng
3. Ở giai đoạn Develop rồi so sánh khả năng AI nào phù hợp nhất để phục vụ vấn đề này
4. Ở giai đoạn Deliver làm phiên bản tối thiểu, để người dùng thực tế kiểm tra

## 8. Mẫu Double Diamond có thể dùng trực tiếp

Nếu bạn đang làm sản phẩm riêng, có thể theo thứ tự này viết:

### Discover

- Người dùng tôi quan sát là ai?
- Lần gần nhất họ gặp vấn đề này là khi nào?
- Họ hiện đang giải quyết như thế nào?
- Điều họ thấy phiền phức nhất, chậm nhất, bất an nhất là gì?

### Define

- Trong hàng loạt vấn đề này, vấn đề đáng ưu tiên giải quyết trước là vấn đề nào?
- Tình huống nào thường gặp nhất, hoặc quan trọng nhất?
- Phiên bản đầu tiên của chúng tôi chỉ phục vụ ai, chỉ giải quyết gì?
- Khi giải quyết thành công, trạng thái người dùng sẽ thay đổi thế nào?

### Develop

- Đối với vấn đề này, có những giải pháp khả thi nào?
- Giải pháp nào nhẹ nhất, nhanh nhất, dễ xác thực nhất?
- Cái nào bắt buộc phải làm, cái nào để sau?

### Deliver

- Tối thiểu chúng ta có thể phân phối gì để xác thực hướng này?
- Là biểu đồ quy trình, prototype, hay MVP?
- Cần tìm ai để kiểm tra?
- Sau khi kiểm tra, cách quyết định là tiếp tục, sửa, hay dừng?

## 9. Một ví dụ người mới cũng hiểu được

Giả sử bạn muốn làm một công cụ "AI giúp sinh viên chuẩn bị hồ sơ xin việc".

Nhiều người lúc đầu sẽ trực tiếp bước vào hình kim thứ hai, bắt đầu suy nghĩ:

- Có cần một nút làm đẹp không
- Có cần viết lại thông minh không
- Có cần tự động match JD không
- Có cần tạo giới thiệu bản thân không

Nhưng theo Double Diamond, quy trình tốt hơn sẽ là:

### Hình kim thứ nhất

**Discover**

- Đi trao đổi sinh viên sắp ra trường lần gần nhất sửa hồ sơ là khi nào
- Xem họ cách nào từ hồ sơ cũ sửa thành phiên bản mới
- Hiểu rõ họ khó khăn nhất là "không biết viết", "không biết sửa", hay "không biết có tốt không"

**Define**

- Cuối cùng thu hẹp thành một vấn đề cụ thể hơn:
- Không phải "sinh viên không biết làm hồ sơ"
- Mà "sinh viên lần đầu nộp đơn thực tập, rất khó viết lại kinh nghiệm sẵn có thành cách diễn đạt phù hợp với vị trí, nên kéo dài quá trình nộp đơn"

### Hình kim thứ hai

**Develop**

- Suy nghĩ một vài giải pháp: thư viện mẫu, viết lại bằng AI, so sánh vị trí, chấm điểm hồ sơ, cung cấp tài liệu tham khảo

**Deliver**

- Phiên bản đầu tiên chỉ làm "dựa vào mô tả vị trí, viết lại bullet points kinh nghiệm"
- Cho 5 sinh viên thử, xem họ có nộp đơn nhanh hơn không

Bạn sẽ thấy, khi hình kim thứ nhất làm vững chắc, hình kim thứ hai sẽ rõ ràng nhiều.

## 10. Tóm tắt

Sức mạnh lớn nhất của Double Diamond là nó giúp bạn từ một đống lộn xộn tách thành bốn động tác rõ ràng hơn:

- Mở rộng hiểu vấn đề trước
- Rồi thu hẹp định nghĩa vấn đề
- Rồi mở rộng khám phá giải pháp
- Cuối cùng thu hẹp phân phối giải pháp

Nó không làm bạn chậm lại, mà giúp bạn **tránh được nhiều vòng tròn nhìn bận rộn, nhưng thực ra hướng không đúng.**

Đặc biệt ở thời đại AI, làm việc ngày càng nhanh, Double Diamond lại càng quan trọng. Vì khi "làm xong" ngày càng dễ, kỹ năng thực sự sẽ hướng tới: **bạn có phải là đang giải quyết một vấn đề đáng giải quyết, và bạn có dùng cách phù hợp để giải quyết nó không.**

Nhớ một câu này là đủ:

**Làm đúng việc, rồi làm việc đúng.**

<a id="dd-ai"></a>
## [11. Cách tận dụng AI để chạy quy trình Double Diamond](#top-dd)

Double Diamond không phải công cụ AI, nhưng AI rất phù hợp để đóng vai trò "tăng tốc độ" ở bốn giai đoạn. Chìa khóa không phải để AI thay bạn quyết định, mà để nó giúp bạn mở rộng tầm nhìn, sắp xếp thông tin, so sánh giải pháp và tạo tài liệu xác thực.

### 11.1 Ở giai đoạn Discover, dùng AI làm một lần lót nền thông tin

Trước khi phỏng vấn và điều tra chính thức, bạn có thể để AI giúp làm một số quét vấn đề nhẹ, ví dụ:

- Giải pháp thay thế thường gặp ở thị trường là gì
- Người dùng ở cộng đồng công khai phàn nàn gì nhất
- Vấn đề này thường gặp ở tình huống và nhóm người nào
- Sản phẩm hiện tại thường bỏ qua cái gì

Bước này không thể thay thế điều tra thực, nhưng rất phù hợp để bạn nhanh chóng xây một bản đồ vấn đề.

Một input đơn giản cho người mới có thể là:

```text
Tôi muốn làm một công cụ giúp sinh viên sửa hồ sơ xin việc.
Bạn đừng giúp tôi suy nghĩ chức năng, trước tiên giúp tôi xem mọi người gặp phiền phức gì nhất khi làm việc này.
```

AI có thể xuất ra:

```text
Bản đồ vấn đề sơ bộ:

1. Không biết nên viết kinh nghiệm gì
2. Không biết cách sửa phù hợp từng vị trí
3. Sửa nhiều lần rồi vẫn không chắc có đủ tốt
4. Cần người khác xem, nhưng không tiện mãi cậy mọi người
5. Vì không chắc, nên kéo dài quá trình nộp
```

Tác dụng của output này không phải thay bạn kết luận, mà giúp bạn nhanh chóng bước vào Discover.

### 11.2 Ở giai đoạn Define, để AI giúp thu hẹp định nghĩa vấn đề

Rất nhiều người sau khi sưu tầm xong một đống tài liệu, khó khăn nhất là nén vấn đề thành một câu thực sự rõ ràng. Bạn có thể đưa ghi chép điều tra cho AI, để nó giúp bạn nén thành một vài định nghĩa vấn đề ứng cử:

```text
Dưới đây là phản hồi người dùng và ghi chép điều tra tôi sưu tầm ở giai đoạn Discover:
[dán nội dung]

Vui lòng giúp tôi làm ba việc:
1. Tóm tắt những mẫu vấn đề phổ biến nhất
2. Sắp xếp theo tần suất vấn đề, mức độ cấp bách và khả năng xác thực, liệt kê 3 vấn đề đáng ưu tiên giải quyết
3. Viết mỗi vấn đề thành một câu định nghĩa cụ thể
```

Cách này giúp bạn dễ dàng bước vào Define, thay vì mãi ở trạng thái "có nhiều vấn đề".

Bạn thậm chí có thể viết input rất đơn giản:

```text
Những vấn đề tôi thu thập được là:
1. Mọi người không biết hồ sơ nên viết gì
2. Mọi người không biết cách sửa
3. Mọi người luôn cảm thấy chưa sửa tốt, không dám nộp

Bạn giúp tôi xem, phiên bản đầu tiên nên giải quyết vấn đề nào trước.
```

AI có thể xuất ra:

```text
Gợi ý vấn đề ưu tiên:

"Sinh viên lần đầu nộp đơn thực tập không chắc hồ sơ đã đủ tốt, nên liên tục sửa và kéo dài quá trình nộp."

Lý do:
1. Vấn đề này cụ thể hơn
2. Nó giải thích hành vi kéo dài
3. Dễ dàng thiết kế phiên bản nhỏ để xác thực
```

Output loại này rất hữu ích, vì giúp bạn từ một đống vấn đề mơ hồ thu hẹp thành một định nghĩa giống như điểm bắt đầu MVP.

### 11.3 Ở giai đoạn Develop, dùng AI mở rộng nhiều giải pháp

Rất nhiều người khi định nghĩa xong vấn đề, chỉ kìm giải pháp đầu tiên thoáng qua trong đầu. AI rất phù hợp để giúp bạn buộc mở rộng ở bước này:

```text
Tôi đã định nghĩa một vấn đề cốt lõi: [định nghĩa vấn đề của bạn]
Vui lòng đừng cho tôi một câu trả lời cuối cùng, mà từ các góc độ sau, mỗi góc đề xuất 2-3 hướng giải quyết:
1. MVP nhẹ nhất
2. Giải pháp phù hợp nhất để xác thực nhu cầu
3. Giải pháp phù hợp nhất để tăng trải nghiệm
4. Giải pháp không dùng AI
5. Giải pháp dùng AI
Cuối cùng, hãy so sánh ưu điểm, rủi ro và chi phí xác thực của từng giải pháp.
```

Cách này giúp bạn không bị khóa quá sớm ở một giải pháp duy nhất.

Một input đơn giản có thể là:

```text
Định nghĩa vấn đề của tôi bây giờ là:
"Sinh viên không chắc hồ sơ đã đủ tốt nên không dám nộp."

Vui lòng giúp tôi suy nghĩ 4 giải pháp khác nhau, đừng chỉ cho tôi một cách.
```

AI có thể xuất ra:

```text
Giải pháp 1: Danh sách kiểm tra "có thể nộp hồ sơ"
Giải pháp 2: Viết lại bullet points dựa vào mô tả vị trí
Giải pháp 3: Cho người dùng tải hồ sơ lên và đưa ra cảnh báo rủi ro
Giải pháp 4: Cung cấp các ví dụ hay, giúp người dùng so sánh khoảng cách
```

Lúc này bạn dễ dàng bước vào "so sánh giải pháp", thay vì chỉ kìm một hướng.

### 11.4 Ở giai đoạn Deliver, dùng AI giúp tạo text prototype và tài liệu kiểm tra

Khi bạn bước vào giai đoạn Deliver, AI rất phù hợp để tăng tốc độ những công việc:

- Tạo text trang trong prototype độ trung thực thấp
- Sắp xếp kịch bản kiểm tra người dùng
- Tạo nhiều phiên bản tiêu đề, nút, giải thích có thể so sánh
- Tóm tắt phản hồi người dùng và tiêu chí "tiếp tục / sửa / dừng"

Ví dụ bạn có thể để AI giúp tạo một kịch bản kiểm tra 20 phút, hoặc giúp tóm tắt phản hồi 5 người dùng thành "tiếp tục làm / sửa hướng / tạm dừng".

Ví dụ một input tối thiểu có thể là:

```text
Tôi làm một prototype rất đơn giản:
Người dùng tải hồ sơ lên, hệ thống nói cho họ những chỗ vẫn chưa phù hợp nên nộp.

Vui lòng giúp tôi tạo một kịch bản kiểm tra người dùng 15 phút.
```

AI có thể xuất ra:

```text
Kịch bản kiểm tra 15 phút:

1. Trước, xin người dùng mô tả lần gần nhất nộp hồ sơ
2. Để người dùng tải hồ sơ lên độc lập
3. Quan sát xem họ có hiểu được kết quả phản hồi không
4. Hỏi: Những gợi ý nào trong đó có giúp nhất, cái nào khó hiểu
5. Hỏi: Nếu lần tới nộp, bạn có muốn dùng lại công cụ này không
```

Output loại này rất thực dụng, vì giúp bạn từ "tôi làm xong prototype" đến "tôi kiểm tra thế nào tiếp".

### 11.5 Để AI đóng vai "thủ gác giai đoạn"

Vấn đề phổ biến nhất của Double Diamond là người ta sẽ bỏ qua giai đoạn. Bạn có thể để AI đóng vai một huấn luyện viên quy trình, nhắc bạn hiện tại đang ở giai đoạn nào:

```text
Vui lòng đóng vai một huấn luyện viên quy trình sản phẩm.
Dưới đây là trạng thái dự án hiện tại của tôi: [mô tả của bạn]
Vui lòng đánh giá tôi hiện tại như đang ở Discover, Define, Develop hay Deliver.
Và nói cho tôi:
1. Tôi có bỏ qua giai đoạn quá sớm không
2. Công việc phải làm nhất ở giai đoạn hiện tại là gì
3. Cái nào hiện giờ nên dừng làm
```

Điều này rất hữu ích cho người mới, vì bạn rất dễ rơi vào "chưa hiểu rõ vấn đề mà vội vẽ prototype".

## 📚 Bài tập

Vui lòng dựa vào nội dung bài viết, hoàn thành những bài tập sau:

1. Chọn một ý tưởng sản phẩm bạn muốn làm gần đây, viết phác thảo bốn bước Discover, Define, Develop, Deliver
2. Ở giai đoạn Define, buộc bản thân nén vấn đề thành một câu rõ ràng
3. Ở giai đoạn Develop, liệt kê ít nhất 3 giải pháp khác nhau, thay vì chỉ kìm cách làm đầu tiên
4. Ở giai đoạn Deliver, viết phiên bản xác thực tối thiểu có thể phân phối trong một tuần

## Đọc thêm

Bài viết này chủ yếu tham khảo tài liệu chính thức của Design Council về Double Diamond, rất phù hợp để tiếp tục xem:

- [Design Council: The Double Diamond](https://www.designcouncil.org.uk/our-resources/the-double-diamond/)
- [Design Council: Framework for Innovation](https://www.designcouncil.org.uk/our-work/skills-learning/tools-frameworks/framework-for-innovation-design-councils-evolved-double-diamond/)
- [Design Council: History of the Double Diamond](https://www.designcouncil.org.uk/our-resources/the-double-diamond/history-of-the-double-diamond/)
