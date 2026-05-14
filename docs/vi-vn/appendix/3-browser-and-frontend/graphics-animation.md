# Đồ họa và Hoạt hình (Canvas và Những Người Bạn)

::: tip 🎯 Vấn đề Lõi

Trước đây, các trang web chỉ có thể hiển thị các chữ cái khô khan và hình ảnh. Nhưng nếu bạn muốn tạo trò chơi phá gạch, hiệu ứng động lộng lẫy hoặc bảng dữ liệu có thể kéo tự do, chỉ có `<div>` là hoàn toàn không đủ. Đó là lý do **Canvas (Vải vẽ)** ra đời.

Hướng dẫn này sẽ đưa bạn từ vẽ dòng đầu tiên, chinh chiến hạ gục quái vật, cho đến cuối cùng tự tay viết công cụ tạo hạt có thể chạy mượt mà 60 khung hình mỗi giây trong trình duyệt.

:::

---

## 1. Canvas Là Gì?

Nếu các trang web sơ khai giống như các mô hình tĩnh được xếp từ **các khối Lego** (thẻ HTML), thì thẻ `<canvas>` của HTML5 giống như đặt cho bạn một **tờ giấy trắng kỹ thuật số khổng lồ**, rồi trao cho bạn một **cọ vẽ** được điều khiển bằng mã, phần còn lại để bạn phát huy sáng tạo.

Các bức vẽ này không có cấu trúc thẻ nào. Những gì bạn vẽ bằng cọ một khi rơi lên giấy sẽ trở thành **"sơn pixel"** thuần khiết nhất.

### 1.1 Canvas vs SVG: Hai Trường Phái Nghệ Sĩ Khác Nhau

Trong thế giới vẽ hình front-end, Canvas có một kẻ thù tên là **SVG**. Chúng đại diện cho hai quan niệm vẽ hoàn toàn khác nhau:

- **Canvas (Bảng vẽ Bitmap):**
  - **Nguyên tắc**: Giống như vẽ thực tế trên giấy, vài nét vẽ là vài đốm sơn (điểm ảnh).
  - **Ưu điểm**: Máy tính chỉ cần "phun sơn" lên màn hình, hiệu suất bay cao! Có thể vẽ hàng nghìn hạt lấp loé nhảy múa cùng một lúc.
  - **Nhược điểm**: Sau khi vẽ không thể hối hận từng phần (không thể chọn thông qua nút DOM), và phóng to sẽ gây mờ nhòe.
- **SVG (Vectơ kết nối):**
  - **Nguyên tắc**: Giống như làm PowerPoint. Bạn vẽ một hình tròn, nó sẽ tạo một "thực thể hình tròn" với thẻ độc lập trên màn hình.
  - **Ưu điểm**: Dù phóng to 100 lần hay 10 vạn lần, luôn cực kỳ sắc nét. Mỗi hình dạng là một nút DOM độc lập, bạn có thể bất cứ lúc nào dùng CSS và JS để thay đổi màu sắc hoặc gắn sự kiện nhấp chuột.
  - **Nhược điểm**: Nếu bạn cố gắng vẽ hàng vạn đối tượng bay lượn, cây DOM nặng nề và công cụ bố cục sẽ trực tiếp làm đóng cứng trình duyệt.

**🎮 Tóm tắt: Dùng Canvas cho trò chơi động, hiệu ứng hạt lộng lẫy; dùng SVG cho logo chính xác, biểu đồ tương tác rõ ràng.**

---

## 2. Nét Đầu Tiên: Hiểu Hệ Tọa Độ Phản Trực Giác

### 2.1 Tờ Giấy Này Có Chiều Nào Bị Lật Ngược?

Khi chuẩn bị bắt đầu vẽ, trước tiên bạn phải hiểu rằng thước đo trong Canvas bị đảo ngược. Với hệ tọa độ toán học truyền thống, điểm gốc ở giữa, càng lên trên càng lớn. Nhưng trong lĩnh vực hiển thị màn hình máy tính, hầu hết các thiết bị đều đặt "điểm gốc (0, 0)" ở **góc trên cùng bên trái của màn hình**. Đi sang phải X tăng không sao, nhưng **đi xuống dưới, Y tăng.**

**Nguyên tắc cốt lõi hệ tọa độ Canvas:**
- **Đơn vị gốc:** Pixel (px), tương ứng 1:1 với pixel vật lý màn hình.
- **Trục X:** Hướng dương là sang phải, từ `0` đến `canvas.width`.
- **Trục Y:** Hướng dương là xuống dưới, từ `0` đến `canvas.height`.

👇 Kéo các chấm tròn nhỏ bên dưới để cảm nhận trực quan điểm gốc tọa độ và hướng đi trong đồ họa máy tính:

<CoordinateSystemDemo />

### 2.2 Thêm Gia Vị Cho Cọ Vẽ Phép Thuật Của Bạn

Với hệ tọa độ, chúng ta có thể gọi triệu tập cọ vẽ (trong mã gọi là `Context`, hoặc viết tắt `ctx`). Giống như vẽ với bảng màu thực tế, thiết kế API Canvas hoàn hảo tuân theo ba bước vẽ vật lý:

1. **Pha trộn màu (State):** Đặt màu tô qua `fillStyle`, đặt màu đường viền qua `strokeStyle`.
2. **Tạo hình dạng (Path):** Suy nghĩ bạn muốn vẽ một đường (`lineTo`), một hình tròn (`arc`) hay một hình chữ nhật (`rect`).
3. **Vẽ cực kỳ đơn giản (Render):** Quyết định là tô bên trong (`fill()`) hay chỉ vẽ viền (`stroke()`).

Vì Canvas là vải vẽ bitmap thuần túy, "một khi vẽ là lưu lại", bạn vẽ xong nó lập tức khô thành pixel, không thể hối hận thành đối tượng độc lập.

👇 Hãy thử chọn các hình dạng và màu sắc khác nhau trong bản demo bên dưới, xem cách mã phía sau thực hiện ba bước "đi theo kế hoạch":

<CanvasBasicsDemo />

---

## 3. Lật Trang Sách Hoạt Hình: Làm Sao Để Hình Ảnh Chuyển Động Mượt Mà Cực Kỳ

Vì Canvas chỉ cần tô màu là trở thành pixel vĩnh viễn, thì các nhân vật chạy khắp nơi trong những trò chơi HTML5 được tạo như thế nào?

Câu trả lời là **"đánh lừa mắt bạn"**. Nó giống hệt như lật trang sách hoạt hình hoặc cuộn phim.

1. **Xóa bảng đen (Clear):** Dùng `clearRect()` xóa sạch nội dung trên toàn bộ vải vẽ.
2. **Tính vị trí mới (Update):** Để nhân vật tọa độ X tiến tới âm thầm thêm 2 pixel.
3. **Vẽ lại (Render):** Vẽ lại nhân vật ở vị trí mới.
4. **Vòng lặp điên cuồng (Loop):** Kết hợp với máy đếm thời gian cực chính xác tích hợp sẵn trong trình duyệt `requestAnimationFrame`. Nó sẽ lặp lại ba hành động này theo tốc độ làm tươi màn hình (thường là 60 lần mỗi giây, tức 60 FPS).

Vì mắt người có "sự tồn tại hình ảnh", trong 60 lần mỗi giây của [xóa -> cập nhật -> vẽ lại], bạn không chỉ không thấy bảng đen chớp chớp mà còn thấy hoạt hình mượt mà như lụa.

👇 Điều chỉnh tốc độ phát lại trong bản demo bên dưới, quan sát cách mỗi khung hình dịch chuyển kết nối thành chuyển động mượt mà:

<AnimationLoopDemo />

---

## 4. Người Mù Sờ Voi: Làm Sao Để Tương Tác Nhấp Chuột Trong Canvas?

Bởi vì vải vẽ Canvas trong mắt trình duyệt chỉ là một "vải sơn" không có cấu trúc. Giả sử bạn vẽ một con quái vật bằng `arc()` trên vải vẽ, khi bạn muốn thực hiện "nhấp chuột vào quái vật để trừ máu", bạn **hoàn toàn không thể** dùng `document.getElementById` truyền thống để lấy quái vật này. Bởi vì trong cấu trúc HTML, chỉ có thẻ `<canvas>` cứng nhắc rộng 600 pixel.

Đây là vấn đề cổ điển nhất trong lập trình đồ họa: **Phát Hiện Va Chạm (Collision Detection) và Ủy Quyền Sự Kiện**.

Vì trình duyệt chỉ biết bạn nhấp chuột vào tọa độ màn hình `(x, y)` của Canvas, bạn cần tự tính toán ngược bằng toán học hình học lớp 7:
- **Với hình tròn:** Tính khoảng cách từ `vị trí nhấp chuột` đến `tâm hình tròn` bằng định lý Pythagorean, nếu khoảng cách nhỏ hơn bán kính, thì "bị trúng".
- **Với hình chữ nhật:** Kiểm tra xem `x` nhấp chuột có nằm trong biên trái-phải hình chữ nhật không, cùng lúc `y` có nằm trong biên trên-dưới không.

Dù vải vẽ có bao nhiêu phần tử, sự kiện rê chuột hoặc nhấp chuột luôn được gắn trên hộp chứa Canvas duy nhất này, đó là "ủy quyền sự kiện" tối cực.

👇 Hãy thử dùng chuột (nhấp, kéo, rê) hoặc bàn phím (mũi tên di chuyển) trong bản demo bên dưới, trải nghiệm logic tương tác "tính khoảng cách thủ công" cơ bản:

<EventHandlingDemo />

---

## 5. Giải Phóng Sức Mạnh Tính Toán: Hệ Thống Hạt và Phép Thuật Hình Ảnh

Đến bước này, khi chúng ta hợp nhất "hệ tọa độ", "vòng lặp hoạt hình" và "màu sắc với hình dạng", và tăng số lượng của chúng lên hàng trăm hàng nghìn mảnh nhỏ, bạn sẽ nắm được kỹ năng cuối cùng để nổ sáng hình ảnh: **Hệ Thống Hạt (Particle System)**.

Suy nghĩ cốt lõi cực kỳ thô bạo và hiệu quả:
1. Tạo một mảng khổng lồ, nhét đầy hàng trăm "đối tượng hạt" độc lập.
2. Mỗi đối tượng có vòng đời riêng (`life`), gia tốc riêng (`vx/vy`), trọng lực cản (`gravity`).
3. Mỗi khi `requestAnimationFrame` kích hoạt, duyệt cập nhật hàng trăm hạt, rồi vẽ, cuối cùng âm thầm xóa sạch những hạt "chết" (hết mạng/rơi ra ngoài màn hình).

Trình duyệt của bạn một thoáng trở thành nhà máy mơ tạo pháo hoa, tuyết lớn và vụ nổ.

👇 Nhấp các hiệu ứng khác nhau, điều chỉnh trọng lực và số lượng hạt, quan sát chúng tạo nên hình ảnh nhóm phức tạp từ những công thức toán học vật lý đơn giản nhất:

<ParticleSystemDemo />

---

## 6. Bảo Vệ Vinh Quang FPS: Làm Sao Để Đối Phó với CPU Sốt Cao?

Để hàng nghìn đối tượng tính toán và vẽ lại 60 lần mỗi giây là rất tốn hiệu suất. Nếu vô tổ chức, quạt máy tính của bạn sẽ sớm phát động.

Dưới đây là "kỹ năng bảo vệ cơ thể" mà những anh chị em engine thực sự dùng để cứu khung hình:

1. **Xóa bảng đen cục bộ (Hình Chữ Nhật Bẩn Dirty Rect):**
   Một nhân vật chạy trên bãi cỏ rộng lớn, bạn tuyệt đối không nên mỗi khung xóa sạch toàn bộ bãi cỏ! Nhân vật đi qua chỗ nào, bạn chỉ dùng "cục tẩy nhỏ" xóa chỗ đó rồi vẽ lại, hiệu suất lập tức bay lên gấp nhiều lần.

2. **Phép Thuật Thân Thế Hậu Trường (Canvas Ngoài Màn Hình):**
   Nếu nền là sao lấp lánh, có những dãy núi phức tạp lộng lẫy, mỗi lần vẽ thực thời quá ngu. Chúng ta thường tạo một `<canvas>` vô hình trong bộ nhớ, vẽ nó đẹp đẽ một lần. Sau đó mỗi khung làm tươi, chỉ cần dùng `drawImage()` dán "tấm âm bản tĩnh" đã hợp nhất này ra, loại bỏ tất cả tính toán cơ sở.

3. **Rửa Cọ Vẽ Hàng Loạt (Batching):**
   Đổi từ màu đỏ sang xanh lam trong cơ sở là tốn kém. Nếu trên vải vẽ có 1000 hình tròn đỏ và 1000 hình tròn xanh lam rải rác xen kẽ. Cách nhanh nhất là: chuẩn bị xong sơn đỏ, duyệt vẽ xong tất cả hình tròn đỏ, rồi đổi sang sơn xanh lam vẽ tất cả hình tròn xanh. Đây là tư tưởng Vẽ Hàng Loạt (Batch Rendering) nổi tiếng.

👇 Kéo số lượng đối tượng lên 3000 trở lên, xem trang web chìm vào vực sâu lag, rồi lần lượt bật các công tắc "kỹ thuật tối ưu" ở dưới bên phải, chứng kiến cứu rỗi khung hình thực thụ:

<PerformanceDemo />

---

## 7. Tóm Tắt Thuật Ngữ Chuyên Môn

| Thuật Ngữ | Giải Thích Đơn Giản |
| --- | --- |
| **Canvas** | Vải vẽ 2D do HTML5 cung cấp. Vẽ cực nhanh, nhưng vẽ xong trở thành pixel sơn, không hỗ trợ thao tác nội dung qua DOM. |
| **SVG** | Hình vectơ. Phóng to không bao giờ mờ, mỗi hình dạng là một phần tử thẻ độc lập, có thể dễ dàng gắn các phong cách CSS và tương tác. |
| **Context (ctx)** | "Cọ vẽ phép thuật 2D" bạn đã yêu cầu, dùng để pha trộn màu, đặt hình dạng và vẽ các hiệu ứng đặc biệt. |
| **requestAnimationFrame** | Máy đếm thời gian cấp thần kỳ tích hợp sẵn trong trình duyệt, sẽ thực thi hàm gọi lại theo tốc độ làm tươi màn hình, là lựa chọn không hai để tạo hoạt hình mượt mà. |
| **FPS (Tốc Độ Khung Hình)** | Tốc độ khung hình. 60 FPS có nghĩa là trong một giây trình duyệt xóa sạch vải vẽ 60 lần và vẽ 60 bức tranh mới liền mạch. |
| **Hình Chữ Nhật Bẩn (Dirty Rect)** | Chỉ xóa sạch và vẽ lại chính xác ở vùng nhỏ xảy ra thay đổi, từ đó bảo tồn mạnh mẽ hiệu suất. |
| **Canvas Ngoài Màn Hình** | "Vải vẽ bóng" ẩn trong bộ nhớ. Vẽ đẹp đẽ trước các vật cảnh cực kỳ phức tạp nhưng tĩnh, sau đó cứ xem như dán ảnh chết để sử dụng lại. |

> Từ một đoạn đường thẳng đơn giản, đến công cụ hệ thống hạt lộng lẫy vĩ đại; tất cả các hiệu ứng bao vây phép thuật, không quá là 60 lần mỗi giây của vòng luân hồi tính toán tọa độ và vẽ lại.
