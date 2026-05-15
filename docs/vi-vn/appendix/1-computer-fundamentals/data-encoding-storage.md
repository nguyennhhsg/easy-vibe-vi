# Mã hóa và truyền tải dữ liệu là gì?

::: tip Lời mở đầu
Khi bạn gửi một bức ảnh cho bạn bè, gửi một tin nhắn WeChat, hoặc tải xuống một game có dung lượng vài GB, thông tin đó như thế nào có thể vượt qua nửa địa cầu và xuất hiện hoàn hảo trên màn hình của bạn? Chương này sẽ xoay quanh một câu hỏi thường làm khó các bạn mới học: **Tại sao tệp mà tôi nhận được lại biến thành mã hóa rối?** Theo dõi câu hỏi này, chúng ta sẽ hoàn toàn vạch mở ba nền tảng cốt lõi nhất ở tầng dưới của máy tính: **mã hóa, lưu trữ và truyền tải**.
:::

**Bài viết này sẽ dạy cho bạn cái gì?**

Sau khi học xong chương này, bạn sẽ có được:

- **Khả năng xử lý mã hóa rối**: Khi gặp "tệp mở là mã hóa rối", bạn có thể phân tích nguyên nhân từ góc độ mã hóa, thay vì đơn giản cho rằng "tệp hỏng rồi"
- **Nhận thức đa nền tảng**: Khi xử lý trao đổi dữ liệu, biết tại sao phải quan tâm đến định dạng mã hóa và byte order
- **Thế giới quan về mã hóa**: Hiểu cách máy tính biểu diễn tất cả mọi thứ bằng 0 và 1 — từ văn bản đến hình ảnh đến các đối tượng phức tạp
- **Nền tảng cho các bài học tiếp theo**: Chuẩn bị cho các giao thức mạng, định dạng tệp, công nghệ tuần tự hóa

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|----------|------------------|
| **Chương 1** | Mã hóa ký tự | ASCII, UTF-8, GBK |
| **Chương 2** | Lưu trữ dữ liệu | Nhị phân, byte order |
| **Chương 3** | Truyền tải dữ liệu | Tuần tự hóa, nén |

Trước khi bắt đầu, chúng ta cần làm rõ một sự thật vật lý mà những người mới học thường bỏ qua:

Máy tính thực sự rất "cứng nhắc". Nó không biết ký tự Trung Quốc, không nhận ra màu sắc, cũng không nghe được bài hát của Châu Kiệt Luân.

Phần dưới cùng của nó toàn là các công tắc bán dẫn vi mô vô số, **nó chỉ có thể lặp đi lặp lại để phán đoán "cấp điện (1)" hoặc "cắt điện (0)"**.

Vì máy tính chỉ biết 0 và 1, vậy làm thế nào chúng ta khiến nó hiển thị các bức ảnh đầy sắc màu và văn bản phức tạp?

Câu trả lời là: **quy định một "cuốn sách mật mã"**.

Chúng tôi và máy tính thỏa thuận rằng: nếu tầng dưới gửi một chuỗi tín hiệu điện nhỏ `01000001`, nó sẽ vẽ chuyên biệt chữ `A` bằng tiếng Anh trên màn hình; nếu gửi một tín hiệu khác, nó sẽ hiển thị màu đỏ.

Quá trình **quy định và sử dụng sách mật mã để dịch lại thành phía trước và phía sau này được gọi là "mã hóa (Encoding)"**.

Khi bạn hiểu rõ "tất cả trong máy tính về cơ bản đều là mã mật" từ điểm khởi đầu logic này, bạn sẽ ngay lập tức hiểu hiện tượng ma quỷ dễ gặp nhất trong hàng ngày — mã hóa rối, thực sự được tạo ra như thế nào.

---

## 0. Mở đầu: Tại sao tệp lại biến thành "sách vô thụ"?

Hãy tưởng tượng bạn nhận được một tệp quan trọng từ đồng nghiệp, nhấp đúp mở xem, bên trong toàn là những ký tự lạ lùng giống như `浣犲ソ` hoặc `ä½ å¥½` (chữ "Xin chào" bị lỗi mã hóa).

Trực giác, bạn chắc chắn cảm thấy: có phải tệp bị hỏng khi gửi không? Có phải gói tin bị mất không?

Nhưng thực tế, phần lớn cái gọi là "tệp bị hỏng", sự thật chỉ có một — **máy tính của bạn "không tìm đúng quy tắc đọc"**.

👇 **Hãy thử tương tác**:

Hãy thử chuyển đổi "sách mật mã giải mã" khác nhau ở bộ mô phỏng dưới đây để đọc chuỗi tín hiệu điện byte ở tầng dưới tương tự.

<GarbledTextDemo />

**🎯 Hiểu biết cốt lõi: Sách mật mã không căn chỉnh**

Byte (chuỗi 0 và 1) chính nó không có ý nghĩa tuyệt đối, **"quy tắc mã hóa"** do con người quy định đã trao cho chúng ý nghĩa.

Nó giống như một chuỗi mã Morse "tít tít tát", nếu bạn sử dụng sách mật mã điện báo Trung Quốc để tra cứu, nó là một ký tự; nếu sử dụng sách mật mã của quân đội Mỹ để tra cứu, nó lại là một ký tự khác.

**Người gửi sử dụng sách mật mã UTF-8 để dịch ký tự Trung Quốc thành số để gửi cho bạn, nếu bạn cứ muốn dùng sách mật mã GBK để giải mã những con số này, những gì ghép lại chắc chắn toàn là mã hóa rối.**

Để hoàn toàn hiểu tại sao dữ liệu không bị hỏng lại biến thành mã hóa rối, chúng ta cần hiểu toàn bộ chuỗi xử lý dữ liệu. Tức là "một đời" của dữ liệu: **mã hóa**, **lưu trữ**, **truyền tải**.

---

## 1. Mã hóa dữ liệu là gì? (Biến tất cả mọi thứ thành số)

Nói đơn giản:

> **Mã hóa dữ liệu (Encoding)**, chỉ là xây dựng một "từ điển dịch hai chiều", ánh xạ cưỡng bức thông tin phong phú đa dạng trong thế giới thực (văn bản, màu sắc, âm thanh) thành quy tắc mà máy tính có thể hiểu được là 0 và 1.

### 1.1 Biến văn bản thành số: Từ ASCII đến mã Unicode

Chúng tôi gõ chữ mỗi ngày trong WeChat, mỗi lần nhấn một phím, máy tính thực sự đang làm một việc ẩn dưới: **tra bảng thay thế**.

**Giai đoạn đầu tiên: Thế giới nhỏ bé của ASCII**

Thời kỳ phát minh máy tính sơ khai, người Mỹ cảm thấy trên thế giới chỉ có 26 chữ cái tiếng Anh, chữ số và một số ký hiệu, nên quy định một cuốn sách mật mã rất mỏng được gọi là **mã ASCII**.

Nó chỉ quy định 128 ký hiệu, chẳng hạn như quy định số `65` đại diện cho chữ cái viết hoa `A`. Vì ký tự rất ít, **1 byte (Byte, bằng 8 bit) ** không gian có thể chứa 256 biến thể, rất dư dả.

**Giai đoạn hai: Thế kỷ Chiến quốc của các nước cạnh tranh**

Nhưng sau này, máy tính lan khắp thế giới. Mọi người nhận ra: **Trung Quốc có hàng chục nghìn ký tự, Nhật Bản còn có kana, chỉ dựa vào 1 byte hoàn toàn không đủ!**

Vì vậy, Trung Quốc tạo ra sách mật mã GBK (sử dụng 2 byte để lưu trữ một ký tự Trung Quốc), Nhật Bản tạo ra Shift_JIS … thế giới rơi vào hỗn loạn. Trang web mà bạn làm ở Trung Quốc, gửi cho khách hàng ở Mỹ, máy tính của họ không có từ điển GBK, mở ra toàn là mã hóa rối.

**Giai đoạn ba: Unification của Unicode (Mã vạn quốc)**

Cuối cùng, các thần tượng trong thế giới máy tính ngồi lại với nhau bàn bạc: "Mọi người đừng có chơi riêng lẻ, chúng ta tạo một cuốn từ điển siêu to lớn chứa tất cả các ký hiệu trên Trái đất nhé!" Đó chính là nổi tiếng **Unicode (Mã vạn quốc)**. Nó phân bổ một mã duy nhất cho mỗi ký tự trên thế giới, thậm chí là mỗi biểu tượng Emoji mà bạn thường sử dụng.

Và **UTF-8** mà bạn thường nghe, chính là một bộ "quy tắc lưu trữ" phổ biến nhất hiện nay của từ điển Unicode. Điểm hay nhất của nó là nó **có độ dài thay đổi**: gặp tiếng Anh chỉ dùng 1 byte, gặp tiếng Trung dùng 3 byte, rất tiết kiệm không gian.

👇 **Hãy thử tương tác**:

Gõ vào ô nhập liệu dưới đây một vài ký tự đa ngôn ngữ hoặc Emoji (ví dụ: `Xin chào Hello 你好 🎉`), xem máy tính tầng dưới "tra bảng" chiếm dung lượng như thế nào.

<CharacterEncodingExplorer />

**💡 Khám phá đáng ngạc nhiên**:

- Một chữ tiếng Anh trong UTF-8 chỉ chiếm **1 byte**.
- Một ký tự Trung Quốc thông thường chiếm **3 byte**.
- Một biểu tượng Emoji (🎉), lại cần **4 byte**!

> **Kiến thức lạnh**: Tại sao nhiều người cảm thấy gửi tin nhắn có cùng độ dài, tiếng Anh thuần có thể gửi đoạn dài, tiếng Trung thuần chỉ có thể gửi vài câu? Vì ở tầng dưới cùng của chuỗi tín hiệu điện, kích thước vật lý của tiếng Trung gấp 3 lần tiếng Anh!

### 1.2 Màu sắc và âm thanh biến thành số như thế nào?

Văn bản có thể tra bảng, vậy nụ cười của Mona Lisa, bài hát của Châu Kiệt Luân biến thành 0 và 1 như thế nào?

Phương pháp cũng giống nhau: **cắt nhỏ và ánh xạ**.

*   **Mã hóa hình ảnh**:
    Phóng to vô hạn một bức ảnh, nó thực sự bao gồm hàng triệu hình vuông phát sáng nhỏ (pixel). Chúng tôi chỉ cần quy định mã số của mỗi màu sắc (ví dụ `#FF0000` đại diện cho màu đỏ), sau đó lưu trữ mã số của hàng triệu hình vuông, bức ảnh sẽ biến thành số.
    
    👇 **Hãy thử tương tác**: Di chuyển qua các hình vuông trên canvas bên trái, xem cách màu hình ảnh được ánh xạ thành mã thập lục phân.
    <ImageEncodingDemo />

*   **Mã hóa âm thanh**:
    Âm thanh về cơ bản là sóng rung động của không khí. Nếu chúng tôi đo lường độ cao của sóng này 44100 lần mỗi giây (lấy mẫu), ghi lại giá trị đại diện cho độ cao. Lưu trữ liên tục, sóng âm liên tục sẽ biến thành mảng số rời rạc.
    
    👇 **Hãy thử tương tác**: Kéo thanh trượt, xem sóng âm mô phỏng liên tục được "cắt lát" thành âm thanh kỹ thuật số như thế nào.
    <AudioEncodingDemo />

---

## 2. Cầu nối lưu trữ: Trước khi gửi, phải lưu trữ ở một nơi nào đó

Sau khi mã hóa dữ liệu, chuẩn bị gửi cho người khác. Nhưng trước đó, phải đặt nó vào một phương tiện vật lý của máy tính. Điều này liên quan đến một định luật phần cứng không thể tránh khỏi.

Bạn có thể sẽ nghĩ: **"Vì dù sao cũng phải lưu trữ, tại sao không lưu trữ ở nơi đọc-ghi nhanh nhất?"**

Tuy nhiên, trong thế giới phần cứng, luôn tồn tại một lời nguyền: **Điều lưu trữ càng nhanh, chi phí sản xuất thường càng đắt, dung lượng có thể tạo ra càng nhỏ.**

Để dùng tiền ít nhất để đổi lấy tốc độ chạy máy tính nhanh nhất có thể, các nhà khoa học máy tính không đành phải thiết kế **"cấu trúc phân tầng lưu trữ"** (hay là tháp lưu trữ).

👇 **Hãy thử tương tác**:

Nhấp vào các tầng khác nhau của tháp, xem máy tính hiện đại sắp xếp tài chính như thế nào.

<StoragePyramidDemo />

**🎯 Hiểu biết cốt lõi: Triết lý người vận chuyển của hệ điều hành**

Không có bộ nhớ hoàn hảo trên thế giới. Do đó, hệ điều hành (như Windows, macOS) giống như một nhân viên quản lý kho hàng vô cùng thông minh, không bao giờ dừng:

1. Nó nhét hàng tấn các bộ phim, trò chơi vào kho lưu trữ chậm, dung lượng lớn (rẻ) — **SSD hoặc ổ cứng cơ học**.
2. Khi bạn muốn chơi trò chơi, nó vội vã vận chuyển các tệp hình ảnh độ phân giải cao liên quan từ ổ cứng đến bàn làm việc tốc độ cực nhanh nhưng dung lượng hạn chế — **bộ nhớ (RAM)**.
3. Khi bạn đóng trò chơi, nó lại xóa sạch bộ nhớ, giải phóng bàn làm việc cho các tệp khác.

> **Giải thích**: Khi bạn chơi trò chơi thế giới mở lớn, gặp chuyển cảnh phải màn hình đen rất lâu (đang tải), bản chất là vì kho lưu trữ ổ cứng quá chậm, nhân viên vận chuyển (hệ thống) đang cố gắng vận chuyển dữ liệu bản đồ tiếp theo đến bàn làm việc bộ nhớ.

---

## 3. Truyền tải dữ liệu là gì? (Để 0 và 1 bắt đầu chuyến du hành)

Dữ liệu được mã hóa, lưu trữ trong bộ nhớ, tiếp theo là gửi cho bạn bè.

> **Truyền tải dữ liệu**, chính là quy trình gửi tín hiệu điện (hoặc tín hiệu ánh sáng) đại diện cho 0 và 1, dọc theo dây mạng, cáp hoặc sóng vô tuyến, chính xác không sai sót từ một máy sang máy khác.

### 3.1 Truyền tải phần cứng và LAN: Giới hạn vật lý của một dây dẫn

Bên trong thùng máy, hoặc giữa hai máy tính gần nhau, chúng ta phải đối mặt với **thách thức vật lý thuần túy**.

Nhiều người lần đầu tiên nghĩ tới: "Một sợi dây truyền 1 tín hiệu mỗi lần, nếu tôi sắp xếp song song 8 sợi dây, tốc độ không phải gấp 8 lần sao?"
Đó chính là ý tưởng **truyền tải song song (Parallel)** được sử dụng sớm để cắm ổ cứng.

Tuy nhiên, ngày nay Type-C của điện thoại, USB bên ngoài và giao diện PCIe bên trong mainboard, tất cả đều sử dụng **truyền tải tuần tự (Serial, chỉ có một kênh chính để gửi dữ liệu)**.

👇 **Hãy thử tương tác**:
So sánh hoạt ảnh của truyền tải tuần tự và song song.

<DataTransmissionDemo />

**💡 Tại sao "một con đường nhỏ" lại đánh bại "tám làn đường"?**

Khi tốc độ không nhanh, 8 sợi dây thực sự mạnh. Nhưng khi chúng tôi cần gửi hàng tỷ tín hiệu mỗi giây, vấn đề xuất hiện:

Dòng điện yếu trên vài sợi dây song song sẽ tạo ra sóng điện từ rất mạnh can nhiễu lẫn nhau (nhiễu tương hỗ Crosstalk); hơn nữa bạn hoàn toàn không thể đảm bảo rằng 8 tín hiệu được phát đồng thời từ phía gửi, sẽ đến đầu tiên cùng một lúc. Chỉ cần một sợi dây bị chậm lại một chút do tạp chất cản trở, 8 cái ghép lại sẽ hoàn toàn rối tung.

Vì vậy, thay vì tiêu tốn hàng tỷ để làm bằng phẳng 8 làn đường, không như đổ tất cả nguồn lực kỹ thuật vào 1 chiếc xe hơi, kéo nó đến tốc độ ánh sáng. Đó chính là sự thật vật lý của giao diện tuần tự thống nhất trên thế giới.

### 3.2 Truyền tải WAN và Internet: Nghệ thuật không mất mát vượt biển

Nếu dữ liệu của bạn không phải gửi cho card đồ họa một inch bên trong thùng máy, mà là gửi cho máy chủ ở phía bên kia Đại Tây Dương của Mỹ thì sao?

Một dây dẫn liên tục là không thể. Dữ liệu phải đi qua cáp quang, trạm cơ sở dưới biển, vô số bộ định tuyến cũ kỹ. Lúc này, đối mặt không còn là giới hạn vật lý nữa, mà là **thách thức đảm bảo dung sai**.

Khi bạn gửi video 1GB siêu lớn qua WeChat, logic ở tầng dưới giống hệt như chuyển nhà quốc tế — bạn không thể ném cả khối container trực tiếp cho bưu chính.

1. **Chia gói (Packetization)**: Mạng sẽ cắt video thành hàng chục nghìn "gói dữ liệu" kích thước phong bì (thường là 1500 byte).
2. **Kiểm tra (Checksum)**: Để phòng ngừa cáp quang dưới biển bị cá mập cắn gãy một sợi, dẫn đến một số `0` trong gói bị lật thành `1`, hệ thống sẽ sử dụng công thức toán học phức tạp để tính "mã đặc trưng" cho những lá thư trong phong bì trước khi gửi.
3. **TCP tái gửi và xác nhận**: Người nhận nhận được phong bì, tự tính lại mã đặc trưng trên giấy. Nếu sai (bị hỏng trên đường), hoặc phát hiện thứ tự nhảy từ 31 thẳng sang 33 (mất gói), sẽ gọi lên mạng lớn tiếng: **"Tôi không nhận được 32, xin vui lòng gửi lại 32 cho tôi!"**

Chính nhờ vào cơ chế cắt gói, đối chiếu tài khoản cực kỳ chặt chẽ ở tầng dưới gọi là **TCP (Giao thức điều khiển truyền tải)**, bạn tải tệp WeChat ở hầm hoặc WiFi không ổn định, ngay cả khi tải trong nửa giờ, vào thời điểm tải xong, tệp cũng nhất định phải hoàn toàn, 0 hỏng hóc.

---

## 4. Kết cục thực tế: Từ nhấn nút chụp đến đăng lên feed bạn bè

Trước đây chúng tôi chia nhỏ "làm thế nào để dịch thành số (mã hóa)", "lưu trữ ở đâu (lưu trữ)", "làm thế nào để hoàn thành chuyến du hành (truyền tải)" rồi giảng một lần. 

Bây giờ, hãy xếp các tảng đá lego này lại, đắm chìm quan sát toàn bộ chu trình một hoạt động vô cùng bình thường hàng ngày: **Chụp ảnh tự động sao lưu lên đám mây.**

Khi bạn nhấn nút chụp, bên trong điện thoại thực sự đã bắt đầu một trận chiến số vô cùng hoành tráng.

👇 **Hãy thử tương tác**:

Nhấp vào "Thực hiện bước này", theo dõi toàn bộ chuyến du hành hoàn chỉnh đầy rủi ro của dữ liệu này.

<PhotoUploadJourneyDemo />

---

## 5. Bảng đối chiếu thuật ngữ

Khi đọc tài liệu khác, bạn có thể gặp những từ lóng dưới đây, tôi đã chuẩn bị một bảng tra cứu nhanh cho bạn:

| Thuật ngữ / Viết tắt | Dịch tiếng Việt | Giải thích đơn giản |
| :--- | :--- | :--- |
| **Bit (b)** | Bit / Phần tử nhị phân | Đơn vị nhỏ nhất trong thế giới máy tính, chỉ có thể là 0 hoặc 1. |
| **Byte (B)** | Byte / Octet | 8 Bit buộc lại với nhau là một Byte. Đó là đơn vị đo lường cơ bản nhất của kích thước tệp. |
| **Character Set** | Bộ ký tự | Giống như "mục lục của từ điển", quy định một ký tự nào đó tồn tại, không quy định cách viết cụ thể ở ổ cứng. |
| **Encoding** | Mã hóa | "Quy tắc lưu trữ" cụ thể, quyết định ký tự trong từ điển tương ứng với chính xác bao nhiêu byte ở tầng dưới (như UTF-8). |
| **RAM** | Bộ nhớ / RAM | Bàn làm việc cực kỳ nhanh nhưng xóa sạch khi mất điện. RAM 8G/16G mà điện thoại bạn chỉ chính là cái này. |
| **SSD** | Ổ cứng thể rắn | Kho lưu trữ vĩnh viễn dữ liệu của máy tính hiện đại, dựa trên chip bộ nhớ flash, nhanh hơn ổ cứng cơ học cũ hàng chục lần. |
| **Serial / Parallel** | Tuần tự / Song song | Tuần tự là một kênh xếp hàng bay nhanh; song song là nhiều kênh tiến cùng lúc (nhưng không phù hợp với tần số cực cao). |
| **Checksum** | Tổng kiểm tra | Mã xác minh đính kèm khi truyền tải dữ liệu. Người nhận tính lại, nếu trùng với cái viết trên gói, chứng tỏ không hỏng. |
| **TCP** | Giao thức điều khiển truyền tải | Giao thức nền tảng của Internet. Chịu trách nhiệm cắt lát tệp lớn, dán số thứ tự, tái gửi gói mất, đảm bảo dữ liệu 100% hoàn thành. |

---

## Tổng kết

Những câu hỏi được đặt ra ở đầu bài viết, giờ bạn đã đứng ở góc độ tầng dưới cùng của hệ thống đã có câu trả lời:

- **Tại sao cùng một tệp bạn nhận được lại biến thành mã hóa rối?**
  Dữ liệu không hỏng, chỉ là phần mềm đọc của bạn không chọn đúng cuốn sách mật mã (vấn đề mã hóa).
  
- **Tại sao ngày nay dây sau lưng máy tính phần lớn là một sợi Type-C nhỏ xíu, lại truyền tải nhanh hơn dây rất rộng lúc trước?**
  Vì lúc trước là vài chiếc xe ngựa song song chạy chậm dễ va chạm (song song), bây giờ là một tàu cao tốc chạy cực nhanh trên đường riêng (tuần tự).
  
- **Tại sao trò chơi lớn khi đọc cảnh lại phải màn hình đen rất lâu?**
  Vì nó cần vận chuyển hàng chục GB dữ liệu lớn, từ ổ cứng chậm (khu vực lưu trữ), vận chuyển gắp gáp ghép nối đến bộ nhớ nhanh nhưng đắt tiền (bàn làm việc cốt lõi).

Bản chất của máy tính thực sự rất đơn giản:

**Nó không quá là một cái máy giỏi "chuyển đổi (mã hóa)" tất cả ánh sáng bóng tối chữ, "lưu giữ (lưu trữ)" nó ở trên một chip silicon, rồi lại "gửi bưu điện (truyền tải)" nó cắt thành xung điện**.

Khi bạn hiểu rõ chu trình lặp đi lặp lại này, bạn thực sự đã nắm chặt chìa khóa mở cánh cửa nguyên tắc tầng dưới của máy tính.
