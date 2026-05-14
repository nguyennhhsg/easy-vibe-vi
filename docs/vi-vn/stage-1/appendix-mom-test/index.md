---
title: 'The Mom Test: Cách Xác Minh Nhu Cầu Thông Qua Phỏng Vấn Người Dùng'
description: 'Bài viết nhập môn The Mom Test dành cho người mới bắt đầu. Học cách tránh phản hồi lịch sự, thực hiện phỏng vấn người dùng dựa trên hành vi thực tế, sự kiện cụ thể và vấn đề hiện có, để biến "nghe có vẻ tốt" thành những bằng chứng xác minh nhu cầu đáng tin cậy hơn.'
---

<script setup>
const duration = 'khoảng <strong>1,5 giờ</strong>'
</script>

# The Mom Test: Cách Xác Minh Nhu Cầu Thông Qua Phỏng Vấn Người Dùng

<a id="top-mom"></a>

## Giới Thiệu Chương

<ChapterIntroduction
  :duration="duration"
  :tags="['Phỏng vấn người dùng', 'Xác minh nhu cầu', 'Nghiên cứu người dùng', 'Điều tra thị trường']"
  coreOutput="1 tập hợp câu hỏi phỏng vấn tốt hơn để đặt ra thông tin thực tế"
  expectedOutput="Không còn lấy sự khích lệ lịch sự của người dùng làm bằng chứng xác minh, mà có thể đưa ra phán đoán dựa trên hành vi thực tế"
>

Lần đầu tiên làm nghiên cứu sản phẩm, nhiều người tưởng rằng điều quan trọng nhất là "tìm người để nói chuyện". Vì thế họ đi hỏi bạn bè, đồng nghiệp, thậm chí cả gia đình:

- Bạn nghĩ gì về ý tưởng này của tôi?
- Nếu có một sản phẩm như vậy, bạn có sử dụng không?
- Chức năng này nghe có vẻ tốt không?

Người kia thường sẽ đưa ra những phản hồi rất khích lệ:

- Khá tốt mà
- Nghe có vẻ hữu ích
- Tôi nghĩ bạn có thể thử

Vấn đề là những câu trả lời này thường không giúp bạn đưa ra phán đoán. Chúng giống như sự lịch sự, sự hỗ trợ, hay phản ứng tự nhiên của việc không muốn làm lạnh lùng ý tưởng của bạn tại chỗ. Bạn tưởng mình đã nhận được "xác minh thị trường", nhưng thực tế chỉ là sưu tập được một đống lời nói an ủi rất khó dùng để đưa ra quyết định.

The Mom Test - đây chính là phương pháp được thiết kế để giải quyết vấn đề này. Nó nhắc nhở chúng ta rằng: **không phải người dùng cố ý lừa bạn, mà là cách bạn đặt câu hỏi tự nhiên sẽ hướng họ tới những câu trả lời nghe tốt nhưng vô dụng.**

</ChapterIntroduction>

::: info Quy Trình Tối Thiểu
**Mục đích**: Sau khi đọc xong, bạn sẽ rõ ràng hơn cách nói chuyện với người dùng để không chỉ nghe được "nghe có vẻ tốt", mà thực sự hỏi được thông tin giúp bạn đưa ra phán đoán về hướng đi.

**Hành động**: Lấy 5 câu hỏi bạn dự định hỏi và thay đổi chúng, ưu tiên hỏi "lần cuối cùng điều này xảy ra là khi nào" và "bạn đã xử lý nó như thế nào".

**Kết quả**: Bạn sẽ dễ dàng hơn trong việc phân biệt ý kiến và những bằng chứng thực sự có thể hỗ trợ phán đoán.

**Nhảy tới từ khóa**: [The Mom Test Là Gì](#mom-what) · [Ba Nguyên Tắc Cốt Lõi](#mom-principles) · [AI Giúp Bạn Như Thế Nào](#mom-ai)
:::

## Bạn Sẽ Học Được Nội Dung Sau Đây

1. The Mom Test thực sự đang giải quyết vấn đề gì, tại sao nhiều "nghiên cứu người dùng" không thực sự hiểu được thông tin thực tế
2. Một vài nguyên tắc cốt lõi nhất của phương pháp này: hỏi ít ý kiến, hỏi nhiều hành vi; hỏi ít giả thuyết, hỏi nhiều sự thật
3. Cách biến một câu hỏi dễ nhận được phản hồi dương tính giả mạo thành câu hỏi phỏng vấn có giá trị hơn
4. Cách kết hợp The Mom Test với JTBD, xác minh nhu cầu và phán đoán MVP

<a id="mom-what"></a>
## [1. The Mom Test Thực Sự Là Gì](#top-mom)

The Mom Test xuất phát từ cuốn sách cùng tên của Rob Fitzpatrick. Tên gọi nghe có vẻ như một trò đùa, nhưng nó đúc kết rất đúng:

**Ngay cả mẹ của bạn, cũng rất khó mà nói trực tiếp rằng "đây là một ý tưởng tồi".**

Lý do không phải vì cô ấy không trung thực, mà vì:

- Cô ấy không muốn làm bạn tổn thương
- Cô ấy sẽ tự động khích lệ bạn
- Cô ấy rất dễ tuân theo cách bạn nói

Trên thực tế, không chỉ mẹ, bạn bè, đồng nghiệp, cựu giáo viên, thậm chí nhiều người lạ, khi đối mặt với ý tưởng sản phẩm của bạn, cũng thường đưa ra "phản hồi tích cực" tương tự. Điều này không có nghĩa là nhu cầu thực sự tồn tại, chỉ có nghĩa là bạn đã đặt câu hỏi theo một cách rất dễ nhận được câu trả lời hay nghe.

Vì vậy, trọng tâm của The Mom Test không bao giờ là "đừng hỏi mẹ", mà là:

**Đừng đặt câu hỏi theo cách mà ai cũng sẽ tuân theo bạn để trả lời.**

Phương pháp này thực sự muốn dạy bạn cách nào để thông qua đối thoại, tìm được thông tin gần hơn với nhu cầu thực tế, thay vì sưu tập một đống bình luận khiến bạn cảm thấy tốt.

## 2. Vấn Đề Cốt Lõi Nó Giải Quyết Là Gì

The Mom Test chủ yếu giải quyết một ảo tưởng nhận thức rất phổ biến:

**Lấy phản hồi tích cực lịch sự làm nhu cầu thực tế.**

Ví dụ, bạn hỏi:

- Bạn nghĩ gì về ý tưởng ứng dụng này?
- Nếu tôi làm một công cụ AI giúp bạn viết đơn xin việc, bạn có sử dụng không?
- Chức năng này có giá trị không?

Điểm chung của những câu hỏi này là:

- Chúng đều hỏi "ý kiến"
- Chúng đều gợi ý một chút
- Chúng đều nói về một tương lai chưa xảy ra

Và phản ứng của người đối với "ý kiến" và "giả thuyết tương lai" thường không ổn định. Nhiều người sẽ quá cao lên sở thích của mình, quá cao mức độ thực hiện của mình, và cũng quá cao nhu cầu mua hàng trong tương lai của mình.

Vì vậy The Mom Test nhắc nhở bạn:

- Đừng quá tin vào cách người khác đánh giá ý tưởng của bạn
- Đừng quá tin vào cách người khác dự đoán hành vi tương lai của mình
- Hãy cố gắng quay trở lại hành vi thực tế đã xảy ra của người dùng

Bởi vì so với "bạn có sử dụng không", "bạn đã xử lý cái này như thế nào lần cuối cùng" thường gần hơn với sự thật.

<a id="mom-principles"></a>
## [3. Ba Nguyên Tắc Cốt Lõi Nhất](#top-mom)

Nếu bạn chỉ muốn ghi nhớ phần quan trọng nhất trước, hãy ghi nhớ ba nguyên tắc dưới đây.

### 3.1 Ít nói về ý tưởng của bạn, nhiều nói về trải nghiệm thực tế quá khứ của người dùng

Nhiều phỏng vấn vô hiệu bắt đầu bằng cách giới thiệu giải pháp của bạn, nói về mức độ hào hứng của bạn, nói về sản phẩm bạn chuẩn bị làm. Vấn đề là, một khi bạn nói quá nhiều, người kia sẽ dễ dàng chuyển sang trạng thái "cộng tác với bạn" hay "khích lệ bạn".

Ngược lại, cách tốt hơn là đặt trọng tâm vào trải nghiệm của người kia:

- Lần gần đây nhất bạn gặp phải vấn đề này là khi nào?
- Bạn đang làm gì lúc đó?
- Bạn đã xử lý nó như thế nào ở cuối?
- Bước nào là phiền phức nhất?

Bạn sẽ phát hiện ra, loại câu hỏi này có thể tự nhiên đưa cuộc đối thoại quay lại với thực tế, thay vì dừng lại trong tưởng tượng.

### 3.2 Ít hỏi ý kiến trừu tượng, nhiều hỏi sự kiện cụ thể

"Tôi nghĩ chức năng này khá tốt" "nghe có vẻ tốt" "có vẻ hữu ích một chút", những cách nói này quá trừu tượng, rất khó hướng dẫn quyết định sản phẩm.

Thông tin có giá trị hơn thường như thế này:

- Tuần trước tôi vừa mất 2 giờ vì cái này
- Bây giờ tôi đang dùng Excel cộng tin nhắn để tạm thời sử dụng
- Tháng trước tôi đã chi tiền cho công cụ tương tự
- Điều tôi sợ nhất là làm sai, không phải làm chậm

Đây là những điều thực sự có thể giúp bạn phán đoán độ mạnh của vấn đề, tần suất và khả năng trả tiền.

### 3.3 Ít hỏi người dùng muốn giải pháp nào, nhiều xem họ giải quyết vấn đề như thế nào bây giờ

Người dùng rất giỏi mô tả sự khó chịu của họ, nhưng không nhất thiết giỏi thiết kế giải pháp.

Nếu bạn hỏi:

- Bạn có muốn một AI tự động làm cái này không?
- Bạn có nghĩ thêm một chức năng thông minh có giúp đỡ không?

Bạn nhận được thường chỉ là một thái độ mơ hồ đối với một giải pháp nào đó, thay vì bản thân nhu cầu.

Câu hỏi tốt hơn là:

- Bây giờ bạn xử lý vấn đề này bằng cách nào?
- Tại sao bạn chọn cách này?
- Nó ở đâu là không đủ tốt?

Hiểu rõ giải pháp thay thế hiện có thường quan trọng hơn hỏi trực tiếp "bạn muốn gì".

## 4. Tại Sao Mọi Người Luôn Cho Bạn Những Câu Trả Lời Hay Nghe Nhưng Vô Dụng

Nếu bạn hiểu điều này, bạn sẽ có ít sự đánh giá sai hơn khi thực hiện phỏng vấn.

### 4.1 Người sẽ tự động duy trì lịch sự

Đặc biệt khi đối thoại với ai đó có mối quan hệ với bạn, người kia rất khó nói trực tiếp:

- Hướng này nghe không tốt lắm
- Tôi không sử dụng nó
- Vấn đề này không quan trọng với tôi

Họ có khả năng nói "khá tốt" "có cơ hội có thể làm". 

### 4.2 Người sẽ quá cao lên tương lai của bản thân

Nhiều người thực sự tin rằng bản thân tương lai sẽ:

- Tự định hơn
- Sẵn sàng học hỏi hơn
- Sẵn sàng trả tiền hơn
- Sẵn sàng thử công cụ mới hơn

Vì vậy "nếu có thì tôi có lẽ sẽ sử dụng" câu nói này, thường không bằng với việc thực sự sẽ sử dụng trong tương lai.

### 4.3 Cách bạn đặt câu hỏi chính nó đã hướng dẫn câu trả lời

Khi bạn hỏi:

- Ý tưởng này của tôi có khá không?
- Chức năng này có rất hữu ích cho bạn không?

Bạn thực sự đã lén lút nhét "câu trả lời đúng" vào câu hỏi.

Đây cũng là lý do tại sao The Mom Test đặc biệt nhấn mạnh: **đừng thực hiện phỏng vấn theo cách bạn đang tìm kiếm sự công nhân.**

## 5. So Sánh Trực Tiếp: Câu Hỏi Nào Dễ Tạo Hỏng, Câu Hỏi Nào Có Giá Trị Hơn

Những so sánh dưới đây hầu như là mỗi người mới đều sẽ sử dụng.

| Câu hỏi dễ tạo hỏng | Câu hỏi có giá trị hơn |
| --- | --- |
| Bạn nghĩ gì về ý tưởng này của tôi? | Lần gần đây nhất bạn gặp phải vấn đề này là khi nào? |
| Nếu có sản phẩm này bạn có sử dụng không? | Bây giờ bạn xử lý cái này như thế nào? |
| Bạn có sẵn sàng trả tiền cho chức năng này không? | Lần trước bạn có chi tiền cho vấn đề này không? Chi tiền vào cái gì? |
| Bạn có nghĩ chức năng này quan trọng không? | Bước nào trong quy trình này là phiền phức nhất, chậm nhất, không chắc chắn nhất? |
| Bạn có muốn một AI tự động làm không? | Tại sao bây giờ bạn vẫn chưa tìm được giải pháp thuận tiện hơn? |

Điều quan trọng nhất trong bảng này không phải là các câu cụ thể, mà là hướng đi đằng sau nó:

- Từ ý kiến đến sự thật
- Từ tương lai đến quá khứ
- Từ giải pháp của bạn đến vấn đề của người dùng

## 6. Một Nhịp Phỏng Vấn Dễ Sử dụng Ngay Cả Khi Người Mới Bắt Đầu

Nếu bạn muốn đi tìm người để nói chuyện ngay bây giờ, bạn có thể tuân theo thứ tự dưới đây.

### 6.1 Mở đầu: Nói rằng bạn đang học, không phải đang bán

Ví dụ:

> Gần đây tôi đang nghiên cứu cách mọi người xử lý loại vấn đề này, tôi muốn hiểu rõ tình hình thực tế, không phải để bán cái gì cả.

Cách nói này sẽ giúp người kia dễ dàng bỏ bớt gánh nặng tâm lý "tôi phải đưa ra phản hồi tích cực cho bạn".

### 6.2 Bắt đầu từ trải nghiệm thực tế gần đây nhất

Bạn có thể bắt đầu với loại câu hỏi này:

- Lần gần đây nhất bạn gặp phải vấn đề này là khi nào?
- Khi đó điều gì đã xảy ra cụ thể?
- Phản ứng đầu tiên của bạn là gì khi xử lý?

Một khi cuộc đối thoại bước vào sự kiện cụ thể, chất lượng thông tin thường sẽ cải thiện rõ rệt.

### 6.3 Tiếp tục hỏi về hành vi, chi phí và giải pháp thay thế

Tiếp tục hỏi:

- Bây giờ bạn xử lý bằng cách nào?
- Điểm không thoải mái nhất của cách này là gì?
- Bạn đã dành bao nhiêu thời gian, tiền bạc hay nỗ lực cho nó?
- Bạn có thử phương pháp khác không? Tại sao sau đó lại không dùng nữa?

### 6.4 Cuối cùng mới phán đoán độ đau và ưu tiên

Bạn không cần phải hỏi trực tiếp "có đau không", bạn có thể phán đoán từ chi tiết:

- Anh ta có gặp phải thường xuyên không
- Anh ta có đang chủ động khắc phục không
- Anh ta có sẵn sàng chi trả chi phí cho nó không
- Khi nói về điều này anh ta có cảm xúc rõ ràng không

Những điều này đều hữu ích hơn một câu "đây có phải điểm đau của bạn không".

## 7. Một Ví Dụ Hoàn Chỉnh Hơn

Giả sử bạn muốn làm một "AI giúp sinh viên đại học chỉnh sửa đơn xin việc".

### Cách Hỏi Sai

Bạn đi hỏi bạn cùng lớp:

> Tôi muốn làm một công cụ tối ưu hóa đơn xin việc bằng AI, bạn nghĩ sao?  
> Nếu nó có thể tự động sửa đơn dựa trên vị trí công việc, bạn có sử dụng không?

Lúc này, người kia rất có thể sẽ nói:

- Nghe có vẻ tốt
- Tôi nghĩ nó có thể hữu ích
- Nếu miễn phí tôi sẽ thử

Những câu trả lời này hầu như không có cách nào giúp bạn phán đoán xem nhu cầu có mạnh không.

### Cách Hỏi Tốt Hơn

Bạn có thể đổi thành:

> Lần gần đây nhất bạn chỉnh sửa đơn xin việc là khi nào?  
> Lúc đó tại sao bạn phải chỉnh sửa?  
> Bạn đã chỉnh sửa như thế nào?  
> Bước nào là phiền phức nhất?  
> Bạn có tìm người khác xem giúp không?  
> Trước đây bạn có chi tiền hoặc chi nhiều thời gian cho đơn xin việc không?

Qua những câu hỏi này, thông tin bạn nhận được có thể sẽ là:

- Nhiều người không phải không biết viết, mà là không biết cách sửa đổi cho vị trí công việc khác nhau
- Điều họ đau đớn nhất không phải định dạng, mà là "không biết những trải nghiệm nào đáng để viết"
- Họ sẽ trì hoãn, không phải vì lười, mà vì mỗi lần chỉnh sửa đơn xin việc rất mất năng lượng
- Họ đang dùng lời khuyên từ người học phổ thông, trang web mẫu, công cụ AI và bạn bè xem để cường quỳ tạm

Lúc này, bạn đã gần với vấn đề thực tế hơn nhiều.

## 8. Cách Sử Dụng The Mom Test Và JTBD Cùng Nhau

Nếu JTBD giúp bạn nhìn rõ "người dùng muốn hoàn thành tiến bộ gì", thì The Mom Test giống như đang dạy bạn:

**Cách xác minh thông qua phỏng vấn, xem job này có thực sự tồn tại không.**

Bạn hoàn toàn có thể sử dụng cả hai:

1. Trước tiên dùng JTBD giả định một job
2. Rồi dùng phương pháp The Mom Test, hỏi người dùng lần gần đây nhất thực tế
3. Xem job này có thực sự cao tần, thực tế, có giá trị để ưu tiên không

Ví dụ, giả định JTBD của bạn là:

> Khi tôi chuẩn bị nộp đơn thực tập, tôi muốn nhanh chóng sửa đơn cũ thành phiên bản phù hợp với vị trí, để hoàn thành nộp đơn sớm.

Rồi bạn có thể dùng câu hỏi kiểu The Mom Test để xác minh:

- Lần gần đây nhất bạn nộp đơn là khi nào?
- Lúc đó bạn sửa đơn như thế nào?
- Bước nào là khó viết nhất?
- Sau khi sửa bạn làm sao để phán đoán nó đủ tốt?

Bằng cách này, phương pháp sẽ kết nối:

- JTBD giúp bạn định nghĩa giả định nhu cầu
- The Mom Test giúp bạn phỏng vấn xác minh giả định

## 9. Lầm Tưởng Phổ Biến Nhất Khi Người Mới Làm Phỏng Vấn Người Dùng

### 9.1 Biến phỏng vấn thành buổi giới thiệu sản phẩm

Bạn nói quá nhiều ý tưởng của mình, người kia sẽ dễ bắt đầu cộng tác với bạn, thay vì nói lên tình hình thực tế.

### 9.2 Tất cả đối tượng phỏng vấn đều là quen biết

Người quen không phải không thể nói chuyện, nhưng người quen dễ khích lệ bạn hơn. Bạn ít nhất cần trộn lẫn một số người gần hơn với người dùng thực tế, thay vì chỉ tìm những người ủng hộ bạn.

### 9.3 Quá sớm rượt theo hỏi về chức năng

Nếu bạn vẫn chưa làm rõ vấn đề, mà đã bắt đầu rượt theo hỏi chi tiết nút, giao diện, chức năng, thường là bạn đã bước vào giải pháp quá sớm.

### 9.4 Lấy một câu "tôi sẽ sử dụng" làm kết quả xác minh

Phỏng vấn tối đa giúp bạn phán đoán hướng, không bằng với hoàn tất xác minh. Xác minh thực sự, cuối cùng vẫn phải xem người dùng có sẵn sàng chi trả chi phí thực tế không, như thời gian, chi phí chuyển đổi, hành vi thử, thậm chí trả tiền.

### 9.5 Sau khi phỏng vấn không tổng hợp

Nếu bạn nói xong rồi để đó, thông tin sẽ nhanh chóng trở thành ấn tượng mơ hồ. Tốt nhất là nhanh chóng tổng hợp:

- Vấn đề nào xuất hiện tần suất cao
- Lời nói thực của người dùng có từ nào cảm xúc
- Giải pháp thay thế hiện tại
- Chi phí mà người dùng đã chi trả
- Phán đoán mới của bạn

## 10. Danh Sách Câu Hỏi Có Thể Sao Chép Và Sử Dụng Trực Tiếp

Nếu bạn muốn bắt đầu nhanh, đây là một tập hợp câu hỏi đủ phổ quát.

### Câu Hỏi Mở Đầu

- Lần gần đây nhất bạn gặp phải vấn đề này là khi nào?
- Lúc đó điều gì đã xảy ra cụ thể?

### Câu Hỏi Về Hành Vi

- Lúc đó bạn xử lý như thế nào?
- Tại sao bạn chọn cách này?

### Câu Hỏi Về Chi Phí

- Việc này thường mất bạn bao nhiêu thời gian hoặc năng lượng?
- Bạn có từng chi tiền để giải quyết nó không?

### Câu Hỏi Về Giải Pháp Thay Thế

- Bạn có thử công cụ hoặc phương pháp khác không?
- Tại sao sau đó lại không tiếp tục sử dụng?

### Câu Hỏi Kết Thúc

- Nếu sau này lại gặp vấn đề tương tự, bạn nghĩ giải pháp lý tưởng sẽ là như thế nào?

Chú ý, câu hỏi kết thúc này có thể hỏi, nhưng tốt nhất nên hỏi ở cuối. Vì trước đó bạn cần lấy sự thật hơn là mong muốn.

## 11. Tóm Tắt

Đóng góp quan trọng nhất của The Mom Test không phải là cho bạn một tập "nói chuyện giỏi hơn", mà là giúp bạn thiết lập một cách suy nghĩ tỉnh thức hơn:

- Đừng quá nhanh tin vào lời khen của người khác cho ý tưởng của bạn
- Đừng lấy "nếu có tôi sẽ sử dụng" làm nhu cầu thực tế
- Đừng để phỏng vấn biến thành việc bạn tìm kiếm sự công nhân

Phỏng vấn có giá trị thực sự, cần cố gắng quay trở lại những điều này:

- Trải nghiệm thực tế gần đây nhất của người dùng
- Anh ta hiện đang xử lý như thế nào
- Anh ta đã chi trả chi phí gì
- Anh ta rõ ràng không thoải mái ở những đâu

Khi bạn bắt đầu hỏi như thế, thông tin bạn nhận được dù lúc nào đó không nghe tốt lắm, nhưng thường hữu ích hơn.  
Và khi làm sản phẩm, **sự thật hữu ích, luôn quan trọng hơn lời khích lệ hay nghe.**

<a id="mom-ai"></a>
## [12. Cách Sử Dụng AI Để Giúp Bạn Phỏng Vấn Người Dùng](#top-mom)

The Mom Test về bản chất vẫn là một phương pháp "nói chuyện với người thực", vì vậy AI không thể thay thế phỏng vấn thực. Nhưng AI rất thích hợp để giúp bạn trước, trong và sau phỏng vấn, đặc biệt phù hợp để giúp người mới bắt đầu giảm bớt rào cản.

### 12.1 Để AI Giúp Bạn Viết Lại Những Câu Hỏi "Dễ Tạo Hỏng"

Nhiều người biết mình không nên hỏi "bạn nghĩ gì về ý tưởng này của tôi", nhưng khi mở miệng vẫn sẽ quay về câu nói kiểu này. Bạn có thể trước hết đưa câu hỏi mình chuẩn bị hỏi cho AI, để nó giúp bạn viết lại:

```text
Dưới đây là những câu hỏi tôi chuẩn bị hỏi khi phỏng vấn người dùng:
[dán câu hỏi của bạn]

Hãy giúp tôi viết lại theo nguyên tắc The Mom Test:
1. Xóa câu hỏi hỏi ý kiến
2. Xóa câu hỏi giả định tương lai
3. Hết sức có thể sửa thành hỏi về hành vi thực tế quá khứ, giải pháp hiện tại và chi phí đã chi
4. Cuối cùng tổng hợp thành 8-10 câu hỏi có thể sử dụng trực tiếp trong phỏng vấn
```

Một đầu vào rất sơ cấp cũng hoàn toàn được:

```text
Tôi muốn hỏi người dùng:
1. Bạn nghĩ gì về ý tưởng AI chỉnh sửa đơn xin việc của tôi?
2. Bạn có sử dụng không?
3. Bạn có sẵn sàng trả tiền không?

Hãy giúp tôi viết lại thành cách hỏi tốt hơn.
```

AI có thể đưa ra đầu ra hữu ích giống thế này:

```text
Câu hỏi sau khi viết lại:

1. Lần gần đây nhất bạn chỉnh sửa đơn xin việc là khi nào?
2. Lúc đó tại sao bạn phải chỉnh sửa?
3. Bạn là cách nào để chỉnh sửa?
4. Bước nào mất nhiều thời gian nhất?
5. Bạn có tìm người khác xem giúp không?
6. Trước đây bạn có chi tiền hoặc chi nhiều thời gian cho chỉnh sửa đơn xin việc không?
```

Đầu ra này rất hữu ích, vì nó trực tiếp biến những câu hỏi bạn "đang hỏi ý kiến" thành câu hỏi "đang hỏi hành vi thực tế".

### 12.2 Để AI Giúp Bạn Tạo Đề Cương Phỏng Vấn Cho Các Đối Tượng Khác Nhau

Cùng một hướng, đối mặt các nhóm người khác nhau, trọng tâm phỏng vấn sẽ khác. Ví dụ sinh viên, nhân viên nhân sự, lao động tự do, quan tâm hoàn toàn khác. Bạn có thể để AI giúp bạn làm ra một bản đề cương cho mỗi đối tượng:

- Hướng tới người dùng mới, trọng tâm là hiểu lần gần đây nhất thực tế xảy ra
- Hướng tới người dùng nặng, trọng tâm là giải pháp thay thế và độ đau
- Hướng tới người dùng trả tiền, trọng tâm là xem liệu đã từng chi tiền cho nó chưa

Cách này khi bạn thực sự nói chuyện sẽ có nhịp độ hơn, thay vì hỏi cùng một tập câu hỏi cho mọi người.

Ví dụ, bạn có thể trực tiếp nhập:

```text
Tôi sẽ nói chuyện với hai loại người:
1. Sinh viên lần đầu tìm thực tập
2. Người học phổ thông đã giúp nhiều người xem đơn

Hãy cho tôi một bộ đề cương phỏng vấn cho mỗi loại, mỗi bộ 6 câu hỏi.
```

AI có thể đưa ra:

```text
Cho sinh viên:
1. Lần gần đây nhất bạn nộp thực tập là khi nào?
2. Lúc đó điều gì là phiền phức nhất?
3. Bạn làm cách nào để biết đơn của mình có đủ tốt để nộp?
...

Cho người học phổ thông:
1. Lần gần đây nhất bạn giúp người khác xem đơn là khi nào?
2. Bạn thường thấy vấn đề nào rõ ràng nhất?
3. Người học phổ thông thường kẹt ở bước nào?
...
```

Bằng cách này, bạn không phải tự mình từ không tạo câu hỏi, chuẩn bị phỏng vấn sẽ nhẹ nhàng hơn nhiều.

### 12.3 Để AI Giúp Bạn Tổng Hợp Ghi Chép Phỏng Vấn

Sau khi phỏng vấn xong, vấn đề dễ xuất hiện nhất không phải "không có thông tin", mà "thông tin quá phân tán". AI rất phù hợp để giúp bạn biến đối thoại vụn vặt thành ghi chép có cấu trúc:

```text
Dưới đây là ghi chép phỏng vấn của tôi với 3 người dùng.
Hãy sắp xếp theo góc độ The Mom Test:
1. Phần nào là sự thật, phần nào chỉ là ý kiến
2. Hành vi thực tế gần đây nhất của người dùng là gì
3. Giải pháp thay thế hiện tại là gì
4. Chi phí về thời gian, tiền bạc hay năng lượng mà người dùng đã chi là gì
5. Vấn đề nào được nhắc lặp lại
6. Những phát biểu nào nghe tích cực, nhưng bằng chứng không đủ
```

Bước này đặc biệt có giá trị, vì nó giúp bạn tách "nghe có vẻ tốt" và "thực sự có thể hỗ trợ phán đoán".

Một đầu vào đơn giản có thể là:

```text
Đây là ghi chép của tôi sau khi nói chuyện xong với một người dùng:

- Cô ấy nói nếu có công cụ có lẽ sẽ thử
- Tuần trước cô ấy dành một tối để chỉnh sửa đơn xin việc
- Bây giờ cô ấy chủ yếu phụ thuộc vào bạn bè xem
- Cô ấy nói điều khó nhất là không biết chỉnh sửa tới mức nào thì có thể nộp

Hãy giúp tôi tách, phần nào là ý kiến, phần nào là sự thật.
```

AI có thể đưa ra:

```text
Ý kiến:
- Nếu có công cụ có lẽ sẽ thử

Sự thật:
- Tuần trước dành một tối để chỉnh sửa đơn xin việc
- Giải pháp thay thế hiện tại là nhờ bạn bè xem
- Điểm khó nhất là không biết "có thể nộp" là mức nào

Có thể dùng để phán đoán nhu cầu:
- Vấn đề này vừa mới xảy ra
- Người dùng đã chi thời gian đáng kể
- Cách xử lý hiện tại phụ thuộc người khác, không ổn định
```

Đầu ra này có thể giúp người mới dễ dàng nhìn thấy: câu nào có thể dùng phán đoán, câu nào chỉ là lời nói.

### 12.4 Để AI Trước Tiên Làm Một Vòng Điều Tra Mạng Nhẹ

Nếu bạn vẫn chưa bắt đầu phỏng vấn, bạn có thể để AI trước tiên giúp bạn làm một số điều tra ngoài rất nhẹ, ví dụ:

- Trên cộng đồng công khai, mọi người gần đây phàn nàn vấn đề này như thế nào
- Công cụ hiện tại bị chỉ trích nhiều nhất ở đâu
- Người dùng có từng chi tiền cho vấn đề tương tự không
- Trên thị trường có những giải pháp thay thế nào tồn tại

Loại thông tin này không thể thay thế phỏng vấn người thực, nhưng giúp bạn vào trạng thái nhanh hơn, biết nên từ đâu khai thác vấn đề.

Ví dụ, một đầu vào đơn giản có thể là:

```text
Hãy giúp tôi tìm kiếm:
"Sinh viên phàn nàn gì nhiều nhất khi sửa đơn xin việc"
Giúp tôi tổng hợp 5 phàn nàn phổ biến nhất, viết bằng lời rất sơ cấp.
```

AI có thể đưa ra:

```text
Phàn nàn phổ biến:

1. Không biết nên viết gì lên đơn xin việc
2. Mỗi nộp một vị trí đều phải sửa, quá mệt
3. Sửa rồi vẫn không chắc có tốt không
4. Không ai có thể cho ý kiến đáng tin
5. Luôn cảm thấy chưa sẵn sàng, nên luôn trì hoãn
```

Giá trị của kết quả này là nó sẽ giúp bạn dễ dàng tìm được điểm cắt phỏng vấn.

### 12.5 Để AI Làm "Huấn Luyện Viên Phân Tích Lại Phỏng Vấn"

Bạn cũng có thể đưa ghi chép phỏng vấn vừa làm xong cho AI, để nó giúp bạn kiểm tra:

```text
Dưới đây là một đoạn ghi chép phỏng vấn của tôi với người dùng.
Hãy từ góc độ The Mom Test giúp tôi phân tích lại:
1. Câu hỏi nào của tôi quá hướng tới việc tìm kiếm sự công nhân
2. Câu hỏi nào có gợi ý rõ ràng
3. Chỗ nào tôi lẽ ra có thể tiếp tục hỏi sự thật
4. Nếu làm lại, đoạn đối thoại này có thể hỏi tốt hơn như thế nào
```

Điều này đặc biệt hữu ích cho người mới, vì bạn sẽ nhanh chóng xây dựng một nhạy cảm "tôi đang sưu tập bằng chứng, hay sưu tập khích lệ".

## 📚 Bài Tập

Hãy dựa trên nội dung trên, hoàn thành các bài tập sau:

1. Chọn một hướng sản phẩm mà bạn gần đây muốn làm, trước tiên viết 5 câu hỏi "dễ tạo hỏng" bạn sẽ hỏi
2. Viết lại 5 câu hỏi đó thành những câu hỏi phù hợp hơn với phong cách The Mom Test
3. Tìm 3 người dùng tiềm năng, ít nhất hỏi được một lần "lần cuối cùng bạn gặp vấn đề này là khi nào"
4. Sau khi phỏng vấn xong, tổng hợp 4 loại thông tin: hành vi thực tế, giải pháp thay thế, chi phí đã chi, khó khăn xuất hiện lặp lại

## Mở Rộng Đọc

- [Trang web chính thức The Mom Test](https://momtestbook.com/)
- [Rob Fitzpatrick: The Mom Test](https://www.robfitz.com/the-mom-test/)
