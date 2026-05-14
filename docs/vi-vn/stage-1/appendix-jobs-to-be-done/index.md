---
title: 'Tìm kiếm công việc người dùng thực sự muốn hoàn thành bằng Jobs to Be Done'
description: 'Bài viết nhập môn Jobs to Be Done dành cho độc giả không có kiến thức nền tảng. Hiểu rằng người dùng không mua tính năng, mà trong một kịch bản cụ thể "thuê" sản phẩm của bạn để hoàn thành tiến độ, và học cách sử dụng JTBD để phân tích hướng sản phẩm, câu hỏi phỏng vấn và lời nhắc AI.'
---

<script setup>
const duration = 'khoảng <strong>1,5 giờ</strong>'
</script>

# Tìm kiếm công việc người dùng thực sự muốn hoàn thành bằng Jobs to Be Done

<a id="top-jtbd"></a>

## Hướng dẫn chương này

<ChapterIntroduction
  :duration="duration"
  :tags="['JTBD', 'Nhu cầu người dùng', 'Tư duy sản phẩm', 'Hiểu biết nhu cầu']"
  coreOutput="1 câu JTBD giống như nhu cầu thực tế hơn"
  expectedOutput="Có thể chuyển ý tưởng mơ hồ thành một kịch bản người dùng cụ thể hơn và hướng MVP"
>

Khi mới bắt đầu làm sản phẩm, lỗi dễ mắc nhất của nhiều người là tập trung toàn bộ chú ý vào "tôi sẽ làm gì tính năng". Thấy người khác có phân loại thông minh, bạn cũng muốn thêm; thấy người khác có tóm tắt tự động, bạn cũng muốn; thấy người khác làm Agent, đa phương thức, quy trình công việc, bạn cũng cảm thấy mình không thể thiếu.

Nhưng trong thực tế, người dùng hiếm khi quyết định dùng một sản phẩm vì "tên tính năng này nghe cool". Họ thường ở một thời điểm cụ thể, muốn đẩy một việc tiến lên, nên tạm thời "thuê" một công cụ, một dịch vụ, thậm chí một người để giúp mình hoàn thành bước đó.

Đó chính xác là điều **Jobs to Be Done (JTBD)** muốn nhắc nhở chúng ta: **Người dùng không phải mua tính năng, mà thuê một giải pháp nào đó để giúp mình hoàn thành một tiến độ.**

Bài viết này sẽ dùng ngôn ngữ thẳng thắn nhất có thể để giúp bạn từ không biết gì cũng hiểu được JTBD, và biến nó thành công cụ phân tích mà bạn có thể sử dụng trực tiếp khi làm ứng dụng AI.

</ChapterIntroduction>

::: info SOP tối thiểu
**Mục đích**: Sau khi đọc xong, bạn sẽ hiểu rõ hơn cách chuyển một ý tưởng mơ hồ thành một nhu cầu thực sự có kịch bản người dùng, thay vì chỉ có một đống tên tính năng trong đầu.

**Hành động**: Viết 1 ý tưởng mơ hồ, nói chuyện với 3 người dùng tiềm năng về "lần gần đây nhất bạn xử lý như thế nào", rồi tổng hợp thành 1 câu JTBD.

**Kết quả**: Bạn sẽ có một giả định nhu cầu rõ ràng hơn, biết phiên bản đầu tiên nên giải quyết cái gì trước.

**Nhảy đến từ khóa**: [JTBD là gì](#jtbd-what) · [Công thức một câu](#jtbd-formula) · [AI giúp bạn như thế nào](#jtbd-ai)
:::

## Bạn sẽ học được nội dung sau

1. Jobs to Be Done là gì, tại sao nó gần với nhu cầu thực tế hơn "lên ý tưởng tính năng"
2. Cách phân biệt "tính năng mà người dùng nói muốn" và "công việc mà người dùng thực sự muốn hoàn thành"
3. Cách sử dụng một mẫu đơn giản để tách một ý tưởng mơ hồ thành kịch bản, kích hoạt, rào cản và tiêu chuẩn thành công
4. Cách áp dụng JTBD trong sản phẩm AI, phỏng vấn và tổ chức lời nhắc

<a id="jtbd-what"></a>
## [1. Jobs to Be Done là gì](#top-jtbd)

Jobs to Be Done thường được viết tắt là **JTBD**. Ý tưởng cốt lõi đằng sau nó liên quan đến một cách diễn đạt kinh điển được nhóm Clayton Christensen quảng bá: **Người dùng sẽ "thuê" một sản phẩm nào đó để hoàn thành một việc.**

"Việc" ở đây không phải là động tác bề ngoài trong danh sách việc cần làm, mà là một **tiến độ** mà người dùng hy vọng trạng thái của mình sẽ thay đổi. Ví dụ:

- Không phải "tôi muốn một công cụ tóm tắt cuộc họp AI", mà là "tôi muốn trong vòng 10 phút sau cuộc họp có thể sắp xếp rõ ràng các điểm chính, việc cần làm và người chịu trách nhiệm, thay vì phải dựa vào ký ức bổ sung ghi chú"
- Không phải "tôi muốn một ứng dụng ghi chi tiêu", mà là "tôi muốn biết tiền đã chi vào đâu, để vào cuối tháng tôi không phải lo lắng nữa"
- Không phải "tôi muốn một công cụ tối ưu hóa CV", mà là "tôi muốn tự tin hơn khi gửi một CV tốt, không muốn mỗi lần gửi đều hoài nghi liệu mình viết có quá tệ"

Vì vậy, **JTBD quan tâm không phải sản phẩm trông như thế nào, mà tại sao người dùng cần nó lúc này.**

Đó cũng là lý do tại sao nhiều sản phẩm trông khác nhau lại cạnh tranh cho cùng một công việc. Người dùng muốn "không bị chán khi đi làm", có thể thuê video ngắn, podcast, game, chat, thậm chí ngủ gật. Người dùng muốn "nhanh chóng hiểu một PDF rất dài", có thể thuê công cụ tóm tắt AI, thực tập sinh, đồng nghiệp, tự cắn răng đọc, hoặc đơn giản là không đọc.

Khi bạn bắt đầu nhìn vấn đề theo cách này, bạn sẽ phát hiện ra rằng đối thủ thực tế của mình thường không chỉ là "một ứng dụng khác trông giống như bạn", mà là **tất cả những giải pháp thay thế mà người dùng hiện chấp nhận được**.

## 2. JTBD khác gì với người dùng lý tưởng, danh sách tính năng

Khi mới bắt đầu phân tích nhu cầu, nhiều người sẽ viết người dùng lý tưởng trước: 25 tuổi, nữ, thành phố một tuyến, nhân viên văn phòng, thích công cụ hiệu suất cao, sẵn sàng thử những sản phẩm mới. Thông tin như vậy không thể nói hoàn toàn vô dụng, nhưng nó thường **không đủ giải thích tại sao một người sẽ hành động vào lúc này.**

JTBD quan tâm hơn đến những câu hỏi này:

- Anh ta ở trong kịch bản nào khi quyết định tìm giải pháp
- Lúc đó chính xác là cái gì khiến anh ta bị kẹt
- Anh ta muốn đẩy điều gì tiến lên bước tiếp theo
- Hiện tại đang sử dụng cách nào để chịu đựng
- Nếu giải quyết tốt, kết quả nào sẽ khiến anh ta cảm thấy "đáng đó"

Nói cách khác, **người dùng lý tưởng giống như "người này là ai", JTBD giống "người này bây giờ muốn hoàn thành gì".**

Danh sách tính năng cũng dễ đưa người ta lạc đường. Người dùng nói "tôi muốn xuất Word""tôi muốn AI viết lại""tôi muốn nhập bằng giọng nói", những cái này chỉ là biểu đạt bề ngoài. JTBD sẽ tiếp tục hỏi sâu:

- Tại sao bây giờ bạn cần xuất Word, không phải PDF?
- Bạn muốn viết lại vì văn phong quá tệ, hay vì cần thích ứng với nhiều đối tượng khác nhau?
- Bạn muốn nhập bằng giọng nói vì lười gõ, hay vì thường xuyên đi bộ, lái xe, hoặc sau cuộc họp rồi ghi chép ngay?

Rất nhiều lần, **tính năng chỉ là một bản dịch tạm thời của job**. Nếu bạn chỉ thu thập tính năng, rất dễ biến sản phẩm thành "người dùng nói gì thì thêm gì"; nếu bạn có thể thấy phía sau job, bạn mới có cơ hội thực hiện một giải pháp thực sự tinh tế và có sức cạnh tranh.

## 3. Một ví dụ mà kể cả người mới vào cũng hiểu được

Chưa vội nghĩ những sản phẩm AI phức tạp, hãy bắt đầu từ một ví dụ cuộc sống.

Giả sử một người mỗi sáng trước khi ra ngoài luôn không kịp ăn sáng, nên thường mua bánh mì sandwich và cà phê ở cửa hàng địa phương. Nhìn bề ngoài, anh ta "mua" bữa sáng; nhưng nếu dùng JTBD nhìn, anh ta thực sự muốn hoàn thành có thể là:

- Vào buổi sáng bận rộn, giải quyết một bữa ăn bằng cách tiêu tốn lực suy nghĩ tối thiểu
- Khiến cho mình không bị đói tới công ty
- Không vì ăn sáng mà ảnh hưởng đến nhịp độ đi làm

Lúc này, người dùng thuê không phải "một loại bánh mì sandwich của một thương hiệu cụ thể", mà là một giải pháp có thể giúp anh ta đẩy buổi sáng tiến lên mượt mà. Nếu cửa hàng tiện lợi bên cạnh nhanh hơn, gần hơn, ổn định hơn, anh ta có thể lập tức đổi lựa chọn cũ.

Dịch logic này sang sản phẩm AI thì rõ ràng hơn.

Ví dụ bạn muốn làm "công cụ tóm tắt cuộc họp AI". Nếu chỉ ở mức tính năng, bạn sẽ dễ dàng bắt đầu nghĩ:

- Có nên hỗ trợ tải lên âm thanh không
- Có nên tích hợp tách biệt người nói không
- Có nên xuất Markdown không
- Có nên tự động tạo việc cần làm không

Những cái này đều đúng, nhưng chưa đủ. Khi dùng JTBD hỏi lần nữa, công việc mà người dùng thực sự muốn hoàn thành có thể là:

- Tôi muốn trong vòng 10 phút sau cuộc họp, đồng bộ kết quả thảo luận cho những người không tham dự
- Tôi muốn sắp xếp rõ ràng việc cần làm, người chịu trách nhiệm và thời hạn, không để team phải dựa vào ký ức hợp tác
- Tôi muốn giảm bớt thời gian sắp xếp lại nội dung cuộc họp, để dành sức lực cho quyết định và thúc đẩy

Khi công việc được nói rõ ràng, rất nhiều độ ưu tiên tính năng sẽ tự động nổi lên. Phiên bản đầu tiên có thể quan trọng nhất không phải "hỗ trợ 12 định dạng xuất khác nhau", mà:

- Cấu trúc ghi chú cần đủ rõ ràng
- Trích xuất việc cần làm cần ổn định
- Chia sẻ liên kết cần tiện lợi
- Kết quả đầu ra cần khiến người ta dám gửi thẳng cho team

Đó chính là giá trị JTBD: **nó có thể giúp bạn từ "tôi muốn xếp chồng khả năng nào" quay lại "tôi muốn giúp người dùng đẩy tiến độ gì".**

## 4. Một mẫu JTBD dễ dùng

Nếu bạn là người mới bắt đầu, có thể chưa cần cố tính toán JTBD theo học thuật. Chỉ cần nắm 5 yếu tố thực tế nhất là đủ.

### 4.1 Kịch bản

Người dùng ở thời điểm nào, môi trường nào khi nhớ đến sản phẩm này?

- Là sau khi họp xong
- Là lúc sếp yêu cầu tài liệu đột ngột
- Là tối khi chuẩn bị gửi CV
- Là cuối tháng khi phát hiện tiền lại không đủ

**Nhu cầu không có kịch bản thường đều chưa thực sự thực tế.**

### 4.2 Kích hoạt

Cái gì khiến anh ta quyết định lập tức tìm giải pháp?

- Bị một tài liệu dài áp chế, không biết từ đâu bắt đầu
- Ngày mai phải nộp tài liệu, hôm nay mới phát hiện định dạng lộn xộn
- Vừa bị sếp đôi mách tiến độ, nhận ra mình chưa sắp xếp rõ ràng
- Muốn kiên trì ghi chép, nhưng viết tay, sao chép, sắp xếp đều quá phức tạp

Điểm kích hoạt thường mang theo cảm xúc. Cảm xúc này rất quan trọng, vì nó quyết định tại sao người dùng sẽ hành động lúc này.

### 4.3 Tiến độ muốn hoàn thành

Anh ta không chỉ muốn "làm một động tác", mà muốn được đẩy sang trạng thái mới nào?

- Từ lộn xộn sang rõ ràng
- Từ lo lắng sang yên tâm
- Từ trì hoãn sang khởi động
- Từ kém hiệu quả sang tinh tế
- Từ nói không rõ sang có thể giao ngay

Bước này, từ "tiến độ" là rất quan trọng. Vì rất nhiều người thực sự mua không phải công cụ, mà **thay đổi trạng thái**.

### 4.4 Giải pháp thay thế hiện tại

Bây giờ không có sản phẩm của bạn, anh ta sẽ làm gì?

- Sao chép dán tay
- Dùng Excel hoặc ghi chú để chịu đựng
- Nhờ đồng nghiệp giúp
- Kéo dài không làm
- Chuyển lại giữa nhiều công cụ

Ai là giải pháp thay thế, ai chính là môi trường cạnh tranh thực tế của bạn.

### 4.5 Tiêu chuẩn thành công

Khi nào công việc được coi là thực sự giải quyết xong?

- Lấy kết quả có thể chia sẻ trong vòng 10 phút
- Không cần sửa lớn thêm lần nữa mới có thể gửi cho người khác
- Không dễ bỏ sót, mắc lỗi, quên việc gì
- Lần đầu dùng cũng biết bước tiếp theo phải làm gì

Nếu bạn thậm chí nói không rõ "người dùng cách nào để chứng tỏ đáng đó", hướng này có lẽ vẫn chưa hội tụ tốt.

<a id="jtbd-formula"></a>
## [5. Công thức một câu mà bạn có thể dùng trực tiếp](#top-jtbd)

Khi muốn sắp xếp hướng sản phẩm, bạn có thể sử dụng cách viết rất hữu dụng này:

> Khi __________, tôi muốn __________, để __________. 
> Hiện tại tôi chỉ có thể __________ để giải quyết chuyện này một cách gượng ép.

Ví dụ:

> Khi tôi họp xong một cuộc họp dự án có nhiều thông tin, tôi muốn nhanh chóng nhận được ghi chú có việc cần làm, người chịu trách nhiệm và thời hạn, để tôi có thể đồng bộ team ngay và thúc đẩy thực hiện. 
> Hiện tại tôi chỉ có thể dựa vào ký ức, lục lại tin nhắn và sắp xếp tay để giải quyết chuyện này một cách gượng ép.

Ví dụ khác:

> Khi tôi chuẩn bị gửi CV cho một vị trí mới, tôi muốn nhanh chóng viết lại kinh nghiệm hiện có thành phiên bản phù hợp hơn với vị trí, để tôi tự tin hơn khi gửi CV chất lượng tốt. 
> Hiện tại tôi chỉ có thể sao chép CV cũ, sửa cách diễn đạt thủ công, sửa đến cuối cùng càng không chắc chắn.

Nếu bạn có thể viết một câu rõ ràng đến mức này, thiết kế trang, thiết kế lời nhắc, phán xét ưu tiên tính năng phía sau sẽ dễ hơn nhiều.

## 6. Khi làm sản phẩm AI, đặc biệt phải xem ba tầng công việc

Rất nhiều sản phẩm AI khi demo tính năng trông rất mạnh, nhưng thực sự lên sản xuất lại giữ không được người, nguyên nhân thường là chỉ giải quyết động tác bề ngoài, chưa giải quyết công việc sâu hơn.

Bạn có thể chia một job thành ba tầng để xem:

### 6.1 Tầng tính năng

Nhiệm vụ bề ngoài nhất là gì?

- Tóm tắt tài liệu
- Viết lại nội dung
- Trích xuất việc cần làm
- Tạo hình ảnh

Đây là tầng mà người dùng dễ dàng nói ra nhất.

### 6.2 Tầng cảm xúc

Người dùng hy vọng giảm bớt cảm giác tệ nào, hay có được cảm giác gì?

- Không muốn lo lắng
- Không muốn trông không chuyên nghiệp
- Không muốn mỗi lần từ đầu
- Muốn cảm thấy kiểm soát hơn

Rất nhiều ý chí trả tiền thực sự liên quan nhiều đến tầng cảm xúc.

### 6.3 Tầng xã hội

Người dùng hy vọng trở nên thế nào trong mắt người khác?

- Trông ổn định hơn
- Trong team có khả năng tổ chức hơn
- Với khách hàng chuyên nghiệp hơn
- Trên mạng xã hội diễn đạt tốt hơn

Nếu bạn chỉ làm tầng tính năng, sản phẩm dễ bị thay thế; nếu bạn đồng thời hiểu tầng cảm xúc và xã hội, bạn sẽ dễ tìm được giá trị thực sự có sức dính.

## 7. Dùng JTBD để sàng lọc hướng sản phẩm

Đôi khi không phải bạn đã có sản phẩm, mà bạn có 3 đến 5 ý tưởng, không biết làm cái nào. Lúc này JTBD rất phù hợp để sàng lọc.

Bạn có thể lấy từng ý tưởng, lần lượt tự hỏi 5 câu hỏi:

1. Kịch bản mà ý tưởng này tương ứng với có đủ cụ thể không?
2. Người dùng bây giờ đã đang dùng cách nào để giải quyết chưa?
3. Cảm giác khó chịu của công việc này có đủ mạnh, hay đủ thường xuyên không?
4. Nếu tôi làm tốt, người dùng có rõ ràng cảm thấy "trạng thái tốt hơn" không?
5. Phiên bản đầu tiên có thể chỉ tập trung vào một bước then chốt của công việc này, tạo ra một phiên bản rất nhỏ nhưng có ích không?

Nếu một hướng giải thích đến cuối chỉ còn có thể nói "cảm thấy khá hay", nhưng nói không rõ kích hoạt, giải pháp thay thế và tiêu chuẩn thành công, thì nó chắc chắn chỉ là một linh cảm mơ hồ, không phải hướng trưởng thành.

## 8. Câu hỏi mà bạn có thể dùng trực tiếp khi phỏng vấn người dùng

Rất nhiều người khi làm nghiên cứu sẽ hỏi: "Bạn muốn gì tính năng?" Cách hỏi này dễ dàng nhận được câu trả lời bề ngoài.

JTBD phù hợp hơn để hỏi những câu dưới:

- Lần gần đây nhất bạn gặp vấn đề này là khi nào?
- Lúc đó bạn đang làm gì, tại sao lại bị kẹt?
- Cuối cùng bạn giải quyết như thế nào?
- Trong quá trình này, cái gì khó chịu nhất, chậm nhất, không an tâm nhất?
- Nếu có một công cụ có thể giúp, kết quả nào sẽ khiến bạn cảm thấy thực sự có ích?
- Bạn đã thử những cách thay thế nào? Tại sao chúng không đủ?

Cách hỏi này có một lợi thế: nó sẽ đưa cuộc trò chuyện trở lại kinh nghiệm thực tế, thay vì ở lại ở mức sở thích tưởng tượng.

## 9. Dùng AI giúp bạn phân tích JTBD

JTBD không phải do AI phát minh ra, nhưng AI rất phù hợp để giúp bạn tổ chức và tinh chỉnh JTBD.

Ví dụ bạn đã thu thập được 5 đến 10 phản hồi từ người dùng, bạn có thể ném chúng cho mô hình, và để nó tóm tắt theo cấu trúc dưới:

```text
Vui lòng đóng vai là trợ lý nghiên cứu sản phẩm.
Tôi sẽ cho bạn một số lời nguyên gốc từ người dùng, vui lòng không gợi ý tính năng trước,
mà hãy tổ chức trước theo JTBD:

1. Người dùng ở kịch bản nào
2. Sự kiện kích hoạt hành động của họ là gì
3. Tiến độ mà họ thực sự muốn hoàn thành là gì
4. Giải pháp thay thế hiện tại là gì
5. Tiêu chuẩn thành công mà họ quan tâm nhất là gì
6. Những từ chỉ cảm xúc nào xuất hiện lặp đi lặp lại trong phản hồi

Cuối cùng, vui lòng tổ chức thành 3 giả định JTBD giá trị nhất để kiểm chứng ưu tiên.
```

Nếu bạn đã có một ý tưởng, bạn cũng có thể để AI giúp bạn hội tụ vòng đầu tiên:

```text
Tôi muốn làm một [ý tưởng sản phẩm của bạn].
Vui lòng không gợi ý danh sách tính năng trực tiếp, mà dùng phương pháp JTBD giúp tôi phân tích:

1. Sản phẩm này có thể phục vụ những kịch bản cụ thể nào
2. Trong mỗi kịch bản, công việc cốt lõi mà người dùng muốn hoàn thành là gì
3. Giải pháp thay thế hiện có là gì
4. Công việc nào phù hợp nhất làm MVP, tại sao
5. Vui lòng viết công việc được đề xuất cuối cùng thành một câu JTBD rõ ràng
```

Lợi thế của làm như vậy là bạn sẽ không bị dẫn đi "suy luận 50 tính năng" ngay lúc đầu, mà trước hết sắp xếp hướng rõ ràng.

## 10. 4 sai lầm phổ biến nhất mà người mới hay mắc

### 10.1 Viết job như tên tính năng

"Tóm tắt AI""phân loại thông minh""tự động tạo" không phải job, chúng chỉ là cách thực hiện có thể.

### 10.2 Viết người dùng quá rộng

"Mọi người làm việc""mọi sinh viên""mọi người khởi nghiệp" thường quá rộng. Càng rộng, càng khó thấy kịch bản thực tế.

### 10.3 Chỉ nghe người dùng nói, không nhìn họ làm gì

Người dùng sẽ mô tả mình muốn gì, nhưng ưu tiên thực sự của họ thường ẩn trong cách họ hiện đang giải quyết chuyện gượng ép.

### 10.4 Muốn làm nền tảng hoàn chỉnh từ lúc đầu

Cách mở JTBD đúng thường không phải "tôi sẽ làm một nền tảng lớn bao quát mọi thứ", mà trước hết nhắm một kịch bản, một bước then chốt, làm nó tinh tế cực kỳ.

## 11. Tóm lại

Giá trị quý nhất của Jobs to Be Done không phải cho bạn một từ mới, mà giúp bạn đổi một góc nhìn: **Không chỉ nhắm vào tính năng sản phẩm, mà nhắm vào công việc mà người dùng muốn đẩy tiến lên bước tiếp.**

Khi bạn bắt đầu liên tục tự hỏi:

- Người dùng ở kịch bản nào khi thuê sản phẩm này
- Anh ta kẹt ở cái gì đúng
- Hiện tại đang giữ chuyện bằng cách nào
- Sau khi giải quyết, trạng thái sẽ thay đổi thế nào

Bạn sẽ phát hiện ra, rất nhiều ý tưởng ban đầu mơ hồ đột ngột trở nên rõ ràng, và rất nhiều tính năng ban đầu rất phô trương cũng không còn quan trọng lắm.

Làm sản phẩm, nhất là làm sản phẩm AI, cái khiến người ta sợ nhất là mê mẩn trình diễn khả năng từ đầu. JTBD có thể giúp bạn kéo chú ý trở lại chỗ thực sự quan trọng: **Tại sao người dùng cần bạn, và bạn thực sự đang giúp anh ta hoàn thành tiến độ gì.**

<a id="jtbd-ai"></a>
## [12. Cách sử dụng AI để thực hành JTBD](#top-jtbd)

JTBD không phải do AI phát minh ra, nhưng AI rất phù hợp để làm trợ lý nghiên cứu, trợ lý tổ chức và trợ lý đối chiếu trong phương pháp này. Chìa khóa là: **Để AI giúp bạn tổ chức và mở rộng, chứ không phải thay bạn đoán người dùng.**

Bạn có thể sử dụng như sau:

### 12.1 Để AI giúp bạn viết lại ý tưởng mơ hồ thành giả định JTBD

Khi đầu bạn chỉ có một cách diễn đạt mơ hồ, ví dụ "tôi muốn làm một công cụ giúp sinh viên tìm việc làm thêm", bạn có thể để AI giúp bạn tách nó thành nhiều công việc có thể:

```text
Bây giờ tôi có một ý tưởng sản phẩm mơ hồ: [ý tưởng của bạn]
Vui lòng không gợi ý danh sách tính năng trực tiếp, mà dùng JTBD giúp tôi phân tích:
1. Có thể tương ứng với những kịch bản cụ thể nào
2. Trong mỗi kịch bản, công việc mà người dùng thực sự muốn hoàn thành là gì
3. Giải pháp thay thế hiện tại có thể là gì
4. Công việc nào phù hợp nhất để làm MVP
Vui lòng cuối cùng viết mỗi công việc thành một câu JTBD rõ ràng.
```

Bạn thậm chí có thể viết phần nhập rất đơn giản:

```text
Tôi muốn làm một công cụ giúp sinh viên tìm việc làm thêm.
Bây giờ tôi cũng nói không rõ cái gì chính xác, bạn giúp tôi nghĩ xem người dùng thực sự muốn hoàn thành gì.
```

AI có thể xuất ra những phần có ích sẽ trông như này:

```text
Hướng JTBD có thể:

1. Khi tôi lần đầu chuẩn bị tìm việc làm thêm, tôi muốn nhanh chóng biết nên chuẩn bị những tài liệu gì,
để tôi không bị thông tin lộn xộn, luôn trì hoãn gửi đơn.

2. Khi tôi thấy một vị trí việc làm thêm, tôi muốn nhanh chóng xác định liệu tôi có đáng gửi hay không,
để tôi không dành quá nhiều thời gian vào những vị trí không phù hợp.

3. Khi tôi bắt đầu gửi đơn, tôi muốn viết lại CV hiện có thành phiên bản phù hợp hơn với vị trí,
để tôi hoàn thành gửi đơn nhanh hơn và tăng tỉ lệ duyệt.
```

Giá trị của kết quả này là, nó sẽ tách ý tưởng ban đầu của bạn chỉ có một câu rất rộng thành những hướng gần với kịch bản thực tế hơn.

### 12.2 Để AI giúp tổ chức lời nguyên gốc từ phỏng vấn

Nếu bạn đã làm vài lần phỏng vấn người dùng, bạn có thể ném ghi chép phỏng vấn cho AI, để nó giúp bạn trích xuất kịch bản, điểm kích hoạt, giải pháp thay thế và tiêu chuẩn thành công xuất hiện lặp đi lặp lại.

```text
Dưới đây là lời nguyên gốc từ 5 người dùng.
Vui lòng không gợi ý giải pháp trước, mà tổ chức trước theo JTBD:
1. Người dùng ở kịch bản nào
2. Sự kiện kích hoạt họ hành động là gì
3. Tiến độ mà họ thực sự muốn hoàn thành là gì
4. Giải pháp thay thế hiện tại là gì
5. Tiêu chuẩn thành công mà họ quan tâm nhất là gì
6. Những thông tin nào lặp lại giữa nhiều người dùng
Cuối cùng tổ chức thành 3 giả định JTBD giá trị nhất để kiểm chứng ưu tiên.
```

Một phần nhập đơn giản dành cho người mới cũng có thể viết như này:

```text
Tôi hỏi 3 người, họ nói khoảng như vậy:

1. Mỗi lần gửi đơn xin việc làm thêm tôi phải viết lại CV, rất phiền.
2. Tôi thực sự sợ nhất là không biết liệu mình viết có đúng không.
3. Hiện tại tôi sẽ tìm người anh chị năm trước giúp xem, nhưng mỗi lần đều không tiện tiến tục làm phiền người khác.

Bạn giúp tôi tổ chức lại, họ thực sự muốn hoàn thành gì.
```

AI có thể xuất ra:

```text
Kết quả tổ chức:

- Kịch bản chung: Chuẩn bị gửi đơn xin việc làm thêm, cần xử lý CV
- Khó khăn chung: Không biết cách sửa để "đủ tốt"
- Giải pháp thay thế hiện tại: Tìm người anh chị xem, tự sửa lại nhiều lần
- JTBD có thể:
  Khi tôi chuẩn bị gửi đơn xin việc làm thêm, tôi muốn nhanh chóng xác định CV của tôi đã đủ tốt để có thể gửi,
  để tôi không kéo dài trong tình trạng "còn sửa nữa" mà không bao giờ gửi đơn được.
```

Kết quả này rất có ích, vì nó giúp bạn từ những lời nói rải rác, trích xuất những thứ giống như "nhu cầu" hơn.

### 12.3 Để AI giúp bạn làm một vòng kiểm tra thông tin nhạc nhẹ

Trước khi bắt đầu phỏng vấn ở quy mô lớn, bạn có thể để AI giúp bạn làm một số quét thông tin bên ngoài rất nhẹ, ví dụ:

- Trên diễn đàn công khai hay cộng đồng, người ta nói bình luận gì về vấn đề này
- Sản phẩm hiện có chủ yếu đang giải quyết tầng vấn đề nào
- Giải pháp thay thế mà người dùng thường dùng nhất là gì
- Trong đánh giá chung, mọi người thỏa mãn nhất và không thỏa mãn nhất cái gì

Kiểu kiểm tra này không thể thay thế phỏng vấn người dùng thực tế, nhưng rất phù hợp làm phần khởi động ở giai đoạn Discover, giúp bạn xây dựng bản đồ vấn đề trước.

Một phần nhập đơn giản có thể là:

```text
Vui lòng giúp tôi tìm kiếm một chút:
"Khi sinh viên sửa CV, gửi đơn xin việc làm thêm, những vấn đề khó chịu phổ biến nhất là gì?"
Ưu tiên xem diễn đàn công khai, bài viết kinh nghiệm, cộng đồng tìm việc mà mọi người tự nói.
Giúp tôi tổ chức thành 5 vấn đề phổ biến nhất.
```

AI có thể xuất ra:

```text
Tổ chức vấn đề phổ biến nhất:

1. Không biết CV nên viết gì, kinh nghiệm quá ít
2. Không biết cách sửa để phù hợp với từng vị trí khác nhau
3. Sửa rất nhiều lần, nhưng vẫn luôn không chắc liệu có đủ tốt không
4. Tìm không được người tin tưởng để giúp xem
5. Quá trình gửi đơn phức tạp, dễ trì hoãn
```

Kiểu kết quả này không thể dùng làm kết luận cuối cùng, nhưng rất phù hợp giúp bạn lúc đầu quyết định nên ưu tiên phỏng vấn những vấn đề nào.

### 12.4 Để AI làm "bên phản đối"

Rất nhiều lúc, chúng ta quá tình cảm với ý tưởng của mình. Bạn có thể chuyên biệt để AI đóng vai người chỉ trích gay gắt, ép bạn nói rõ vấn đề:

```text
Vui lòng đóng vai một cố vấn nghiên cứu sản phẩm rất khắc khe.
Dưới đây là giả định JTBD của tôi: [giả định của bạn]
Vui lòng chỉ trích nó từ những góc này:
1. Kịch bản này có quá rộng không
2. Công việc này có được viết thành tính năng chứ không phải tiến độ thực sự không
3. Giải pháp thay thế có quá yếu không
4. Tiêu chuẩn thành công có đủ rõ ràng không
5. Rủi ro lớn nhất mà giả định này cần được kiểm chứng là gì
```

Lợi thế của cách này là, bạn có thể nhanh chóng phát hiện liệu mình đang nhìn nhu cầu, hay chỉ là nhìn giải pháp mà mình thích.

## 📚 Bài tập

Vui lòng dựa trên nội dung trên, hoàn thành các bài tập dưới:

1. Chọn một ý tưởng sản phẩm mà bạn muốn làm gần đây, dùng một câu công thức JTBD viết rõ ràng
2. Bổ sung 5 yếu tố cho ý tưởng này: kịch bản, kích hoạt, tiến độ, giải pháp thay thế, tiêu chuẩn thành công
3. Tìm 3 người dùng tiềm năng, ít nhất hỏi một lần "lần gần đây nhất bạn gặp vấn đề này là khi nào"
4. Ném lời nguyên gốc từ phỏng vấn cho AI, tổ chức thành 3 giả định JTBD giá trị nhất để kiểm chứng ưu tiên

## Đọc thêm

- [Christensen Institute: Jobs to Be Done](https://www.christenseninstitute.org/theory/jobs-to-be-done/)
- [Harvard Business School Online: What Is Jobs to Be Done?](https://online.hbs.edu/blog/post/jobs-to-be-done)
- [Intercom: Jobs-to-be-Done: A framework for customer needs](https://www.intercom.com/blog/jobs-to-be-done-framework/)
- [Mural: Jobs to Be Done framework guide](https://www.mural.co/blog/jobs-to-be-done-framework)
