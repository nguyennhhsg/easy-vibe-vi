# Dữ liệu trực quan hóa và bảng điều khiển

::: tip Lời nói đầu
**Một biểu đồ tốt hơn một nghìn dòng dữ liệu.** Dữ liệu trực quan hóa là việc chuyển đổi những con số trừu tượng thành biểu đạt trực quan dễ hiểu, cho phép mọi người hiểu được câu chuyện đằng sau dữ liệu chỉ trong vài giây. Từ biểu đồ Excel đến bảng điều khiển giám sát Grafana, trực quan hóa có mặt ở khắp mọi nơi.
:::

**Bạn sẽ học những gì trong bài viết này?**

Sau khi hoàn thành chương này, bạn sẽ có được:

- **Lựa chọn biểu đồ**: Chọn loại biểu đồ phù hợp nhất dựa trên mục đích dữ liệu
- **Nguyên tắc trực quan hóa**: Nắm vững các nguyên tắc thiết kế cốt lõi của dữ liệu trực quan hóa
- **Thiết kế bảng điều khiển**: Hiểu các mẫu bố cục của các loại bảng điều khiển khác nhau
- **Hệ sinh thái công cụ**: Làm quen với vị trí và lựa chọn các công cụ trực quan hóa chính
- **Những cạm bẫy phổ biến**: Tránh các biểu đồ gây hiểu lầm và lỗi trực quan hóa thường gặp

| Chương | Nội dung | Khái niệm cốt lõi |
|-----|------|---------|
| **Chương 1** | Lựa chọn loại biểu đồ | So sánh, xu hướng, tỷ lệ, phân bố, mối quan hệ |
| **Chương 2** | Nguyên tắc thiết kế trực quan hóa | Tỷ lệ mực dữ liệu, nhất quán, khả năng đọc |
| **Chương 3** | Bố cục bảng điều khiển | Loại tổng quan, loại so sánh, loại khoan sâu, loại thời gian thực |
| **Chương 4** | Lựa chọn công cụ | ECharts, D3, Grafana, Metabase |
| **Chương 5** | Những cạm bẫy phổ biến | Cắt đứt trục, biểu đồ tròn 3D, lạm dụng màu sắc |

---

## 0. Toàn cảnh: Tại sao cần dữ liệu trực quan hóa?

Bộ não con người xử lý thông tin hình ảnh nhanh hơn 60,000 lần so với xử lý văn bản. Một biểu đồ đường có thể cho bạn biết "doanh số bán hàng tháng trước đang giảm" chỉ trong 1 giây, trong khi nếu thông tin đó được trình bày dưới dạng bảng, bạn có thể mất 30 giây để đưa ra kết luận.

Giá trị cốt lõi của trực quan hóa:

- **Phát hiện mẫu**: Xu hướng, chu kỳ, các giá trị ngoại lệ một cách rõ ràng trong biểu đồ
- **Hỗ trợ ra quyết định**: Cho phép những người không có kỹ thuật cũng có thể hiểu dữ liệu và tham gia vào quyết định
- **Hiệu quả giao tiếp**: Một hình ảnh thắng ngàn lời, giảm sự mơ hồ trong giải thích dữ liệu

::: tip Trực quan hóa ≠ Đẹp
Mục tiêu của trực quan hóa là **truyền đạt thông tin**, không phải để khoe kỹ năng. Một biểu đồ cột đơn giản nhưng chính xác, giá trị hơn nhiều so với một biểu đồ 3D lóe loẹt nhưng khó hiểu.
:::

---

## 1. Lựa chọn loại biểu đồ: Dùng đúng biểu đồ để kể đúng câu chuyện

Bước đầu tiên trong lựa chọn biểu đồ không phải là "tôi thích biểu đồ nào", mà là "tôi muốn truyền đạt thông tin gì". Các mục đích dữ liệu khác nhau tương ứng với các loại biểu đồ tốt nhất khác nhau.

<ChartTypeSelectorDemo />

### Bảng tra cứu nhanh lựa chọn biểu đồ

| Mục đích dữ liệu | Biểu đồ được khuyến nghị | Không khuyên | Lý do |
|---------|---------|--------|------|
| So sánh kích thước | Biểu đồ cột, biểu đồ thanh | Biểu đồ tròn | Mắt người nhạy cảm với sự khác biệt về độ dài hơn là góc |
| Hiển thị xu hướng | Biểu đồ đường, biểu đồ diện tích | Biểu đồ cột | Sự liên tục của đường gợi ý tính liên tục của thời gian |
| Hiển thị tỷ lệ | Biểu đồ tròn (≤5 loại), biểu đồ cột xếp chồng | Biểu đồ tròn 3D | Phối cảnh 3D sẽ làm biến dạng tỷ lệ diện tích |
| Hiển thị phân bố | Biểu đồ tần suất, biểu đồ hộp | Biểu đồ đường | Phân bố cần nhìn tần suất, không phải xu hướng |
| Hiển thị mối quan hệ | Biểu đồ tán xạ, biểu đồ bong bóng | Biểu đồ cột | Mối quan hệ của hai biến liên tục cần không gian hai chiều |

::: tip Một quy tắc ra quyết định đơn giản
- **Một biến** → Biểu đồ tần suất (phân bố) hoặc thẻ số (KPI)
- **Hai biến** → Biểu đồ đường (thời gian vs giá trị) hoặc biểu đồ tán xạ (giá trị vs giá trị)
- **Nhiều danh mục** → Biểu đồ cột (so sánh) hoặc biểu đồ tròn (tỷ lệ, ≤5 loại)
- **Nhiều chiều** → Biểu đồ radar hoặc biểu đồ tọa độ song song
:::

---

## 2. Nguyên tắc thiết kế trực quan hóa

Edward Tufte đã đề xuất các nguyên tắc cốt lõi của dữ liệu trực quan hóa trong "The Visual Display of Quantitative Information", vẫn là tiêu chuẩn ngành cho đến nay.

| Nguyên tắc | Giải thích | Trường hợp ngược lại |
|------|------|---------|
| Tỷ lệ mực dữ liệu | "Mực" được sử dụng để hiển thị dữ liệu trong biểu đồ nên chiếm tỷ lệ cao nhất | Quá nhiều đường lưới, các yếu tố trang trí |
| Tối thiểu hóa các yếu tố không phải dữ liệu | Loại bỏ các yếu tố hình ảnh không truyền đạt thông tin | Hiệu ứng 3D, bóng, nền gradient |
| Thang đo tỷ lệ nhất quán | Trục tọa độ bắt đầu từ không, các vạch chia đều | Trục Y bắt đầu từ 95 (phóng đại sự khác biệt) |
| Sử dụng màu sắc hợp lý | Sử dụng màu sắc để mã hóa thông tin, không phải trang trí | Cầu vồng (không có thứ tự) để biểu thị dữ liệu có thứ tự |
| Ghi chú rõ ràng | Tiêu đề, nhãn trục, chú thích đủ | Không có đơn vị, không có phạm vi thời gian |

::: tip Ba quy tắc sử dụng màu sắc
1. **Cùng một chỉ số dùng cùng một màu**: Doanh thu ở tất cả biểu đồ đều dùng xanh lam, không phải lúc xanh lúc xanh lục
2. **Dữ liệu có thứ tự dùng màu gradient**: Nhiệt độ từ thấp đến cao dùng gradient xanh → đỏ, không dùng màu rời rạc
3. **Xem xét thân thiện với người mù màu**: Khoảng 8% nam giới bị mù màu đỏ-xanh, tránh dùng chỉ màu đỏ-xanh để phân biệt thông tin quan trọng
:::

---

## 2. Nguyên tắc thiết kế trực quan hóa: Để dữ liệu nói lên

Trực quan hóa tốt không phải là "đẹp", mà là "dễ hiểu". Edward Tufte đã đề xuất một số nguyên tắc cổ điển trong "The Visual Display of Quantitative Information", vẫn là tiêu chuẩn vàng của thiết kế trực quan hóa cho đến nay.

### 2.1 Tỷ lệ mực dữ liệu (Data-Ink Ratio)

> Tỷ lệ "mực" được sử dụng để biểu đạt dữ liệu trên tổng "mực" trong biểu đồ nên cao nhất có thể.

Nói đơn giản: **Xóa mọi yếu tố không truyền đạt thông tin**.

| Nên xóa đi | Nên giữ lại |
|-----------|-----------|
| Hiệu ứng 3D, bóng, gradient | Điểm dữ liệu, nhãn trục |
| Đường lưới dư thừa | Đường tham chiếu quan trọng (như giá trị mục tiêu) |
| Biểu tượng trang trí | Chú thích (khi có nhiều chuỗi) |
| Màu nền lóe loẹt | Tiêu đề rõ ràng và đơn vị |

### 2.2 Nguyên tắc nhất quán

- **Nhất quán về màu**: Cùng một chiều trong các biểu đồ khác nhau dùng cùng một màu (ví dụ "doanh thu" luôn dùng xanh lam)
- **Nhất quán về tỷ lệ**: Trục tọa độ bắt đầu từ 0 (trừ khi có lý do chính đáng), tránh gây hiểu lầm
- **Nhất quán về thời gian**: Khoảng cách trục thời gian nên đều, không bỏ qua

### 2.3 Nguyên tắc khả năng đọc

- **Tiêu đề phải nói kết luận**: Không phải "Doanh số bán hàng hàng tháng", mà là "Doanh số bán hàng giảm liên tục 3 tháng"
- **Ghi chú những điểm quan trọng**: Thêm ghi chú ở các giá trị bất thường, điểm uốn, hướng dẫn sự chú ý của người đọc
- **Kiểm soát mật độ thông tin**: Một biểu đồ truyền đạt 1-2 thông tin cốt lõi, không nhồi nhét quá nhiều

::: tip Tên tuổi của Tufte
"Excellence in statistical graphics consists of complex ideas communicated with clarity, precision, and efficiency."（Sự xuất sắc trong biểu đồ thống kê, là cách truyền đạt những ý tưởng phức tạp một cách rõ ràng, chính xác, hiệu quả.）
:::

---

## 3. Bố cục bảng điều khiển: Mỗi tình huống khác nhau, mỗi mẫu khác nhau

Bảng điều khiển (Dashboard) là sự kết hợp hữu cơ của nhiều biểu đồ. Bảng điều khiển tốt không phải là xếp chồng các biểu đồ lại với nhau, mà là chọn mẫu bố cục thích hợp dựa trên tình huống sử dụng.

<DashboardLayoutDemo />

### Bốn mẫu bố cục phổ biến

| Mẫu bố cục | Cấu trúc cốt lõi | Tình huống áp dụng | Điểm thiết kế |
|---------|---------|---------|---------|
| Loại tổng quan toàn cầu | Thẻ KPI + biểu đồ xu hướng + bảng chi tiết | Báo cáo hàng ngày cấp quản lý, bảng điều khiển vận hành | Đặt chỉ số cốt lõi ở phía trên cùng, nhìn thấy các con số quan trọng trong nháy mắt |
| Loại phân tích so sánh | Bố cục đối xứng trái-phải | Kiểm tra A/B, phân tích so sánh cùng kỳ | Giữ nhất quán các chiều so sánh, làm nổi bật sự khác biệt |
| Loại khoan sâu phân tích | Từ tóm tắt đến chi tiết từng lớp mở rộng | Phân tích bán hàng, phân tích hành vi người dùng | Hỗ trợ tương tác nhấp chuột, khoan sâu từng lớp |
| Loại giám sát thời gian thực | Con số lớn + đường cong thời gian thực + trạng thái cảnh báo | Bàn điều khiển lớn ngày hội mua sắm, giám sát máy chủ | Tự động làm mới, nền tối, phù hợp với chiếu màn hình |

### 5 nguyên tắc thiết kế bảng điều khiển

1. **Trước tiên hỏi "ai đang xem"**: CEO xem chỉ số chiến lược, vận hành xem chỉ số quá trình, kỹ sư xem chỉ số kỹ thuật
2. **Quy tắc 5 giây**: Người dùng nên hiểu thông tin cốt lõi của bảng điều khiển trong 5 giây
3. **Phân cấp thông tin**: Đặt quan trọng nhất ở góc trên cùng bên trái (chế độ đọc F), bớt quan trọng ở phía dưới
4. **Giảm cuộn lên xuống**: Hiển thị nội dung cốt lõi trên một màn hình, tránh người dùng phải cuộn để xem dữ liệu chính
5. **Để lại khoảng trống**: Không nhồi nhét từng đơn vị không gian, để lại khoảng trống thích hợp để mắt sảng khoái hơn

::: tip Bảng điều khiển vs Báo cáo
- **Bảng điều khiển**: Thời gian thực/bán thời gian thực, tương tác, hướng tới giám sát và ra quyết định nhanh
- **Báo cáo**: Được tạo định kỳ (ngày/tuần/tháng), tĩnh, hướng tới phân tích chi tiết và lưu trữ

Hai cái không là thay thế, mà là bổ sung. Bảng điều khiển phát hiện vấn đề, báo cáo phân tích sâu.
:::

---

## 4. Lựa chọn công cụ: Từ mã đến kéo thả

| Công cụ | Loại | Đặc điểm | Tình huống áp dụng |
|------|------|------|---------|
| ECharts | Thư viện biểu đồ JS | Mã nguồn mở của Baidu, loại biểu đồ phong phú, tài liệu tiếng Trung hoàn chỉnh | Nhúng biểu đồ trong dự án frontend |
| D3.js | Thư viện trực quan hóa JS | Linh hoạt ở cấp độ thấp, có thể tùy chỉnh bất kỳ hiệu ứng trực quan hóa nào | Yêu cầu tùy chỉnh cao |
| Chart.js | Thư viện biểu đồ JS | Nhẹ, đơn giản, dễ bắt đầu | Yêu cầu biểu đồ đơn giản |
| Grafana | Bảng điều khiển giám sát | Hỗ trợ nhiều nguồn dữ liệu, làm mới thời gian thực, tích hợp cảnh báo | Giám sát máy chủ/ứng dụng |
| Metabase | Công cụ BI | Mã nguồn mở, truy vấn SQL + kéo thả xây dựng biểu đồ | Phân tích dữ liệu kinh doanh |
| Superset | Công cụ BI | Apache mã nguồn mở, hỗ trợ nguồn dữ liệu lớn | Khám phá dữ liệu cấp doanh nghiệp |
| Tableau | BI thương mại | Kéo thả, khả năng tương tác mạnh | Báo cáo cấp doanh nghiệp |

::: tip Làm sao để chọn?
- **Nhà phát triển nhúng biểu đồ trong dự án** → ECharts (đầy đủ tính năng) hoặc Chart.js (nhẹ)
- **Cần trực quan hóa độ tùy chỉnh cao** → D3.js (đường cong học tập dốc nhưng vô hạn khả năng)
- **Bàn điều khiển giám sát vận hành** → Grafana (tiêu chuẩn ngành)
- **Đội ngũ kinh doanh tự phục vụ phân tích** → Metabase (đơn giản) hoặc Superset (tính năng mạnh)
:::

---

## 4. Lựa chọn công cụ: Từ thư viện mã đến nền tảng BI

Các công cụ trực quan hóa có thể chia thành ba cấp độ: thư viện liên kết cấp dưới, thư viện biểu đồ cấp cao, nền tảng BI. Lựa chọn cái nào tùy thuộc vào độ phức tạp nhu cầu của bạn và khả năng kỹ thuật của đội.

### 4.1 Thư viện biểu đồ cấp mã

| Công cụ | Ngôn ngữ/Nền tảng | Đặc điểm | Tình huống áp dụng |
|------|----------|------|---------|
| ECharts | JavaScript | Sẵn sàng dùng, loại biểu đồ phong phú, tài liệu tiếng Trung hoàn chỉnh | Nhúng biểu đồ trong hệ thống kinh doanh |
| D3.js | JavaScript | Linh hoạt ở cấp độ thấp, có thể tùy chỉnh bất kỳ hiệu ứng trực quan hóa nào | Dữ liệu trực quan hóa độ tùy chỉnh cao |
| Chart.js | JavaScript | Nhẹ, đơn giản, dễ bắt đầu | Yêu cầu biểu đồ đơn giản |
| Matplotlib | Python | Thư viện tiêu chuẩn tính toán khoa học, biểu đồ tĩnh | Phân tích dữ liệu, biểu đồ bài báo |
| Plotly | Python/JS | Biểu đồ tương tác, hỗ trợ 3D | Khám phá dữ liệu, Jupyter Notebook |

### 4.2 Nền tảng BI (không mã/mã thấp)

| Công cụ | Định vị | Ưu điểm cốt lõi | Đội ngũ áp dụng |
|------|------|---------|---------|
| Grafana | Trực quan hóa giám sát | Hỗ trợ dữ liệu chuỗi thời gian tốt, tích hợp cảnh báo | Đội ngũ vận hành/SRE |
| Metabase | BI nhẹ | Mã nguồn mở miễn phí, SQL là đủ để xuất biểu đồ | Đội ngũ nhỏ xây dựng nhanh |
| Apache Superset | BI doanh nghiệp | Mã nguồn mở, hỗ trợ nguồn dữ liệu lớn | Công ty có đội ngũ dữ liệu |
| Tableau | BI thương mại | Hoạt động kéo thả, hiệu ứng trực quan hóa tốt | Chuyên gia phân tích kinh doanh |
| Power BI | BI thương mại | Tích hợp tốt với hệ sinh thái Microsoft | Doanh nghiệp sử dụng công nghệ Microsoft |

::: tip Đề xuất lựa chọn
- **Nhà phát triển nhúng biểu đồ trong sản phẩm** → ECharts (hệ sinh thái tiếng Trung tốt) hoặc Chart.js (tình huống đơn giản)
- **Chuyên gia phân tích dữ liệu làm phân tích khám phá** → Plotly + Jupyter hoặc Metabase
- **Bàn điều khiển giám sát vận hành** → Grafana (tiêu chuẩn thực tế)
- **Đội ngũ kinh doanh tự phục vụ phân tích** → Metabase (mã nguồn mở) hoặc Tableau (thương mại)
- **Cần độ tùy chỉnh cao** → D3.js (đường cong học tập dốc, nhưng vô hạn khả năng)
:::

---

## 5. Những cạm bẫy phổ biến: Những biểu đồ này đang lừa bạn

Dữ liệu trực quan hóa là một thanh kiếm hai lưỡi — dùng tốt có thể lật tẩy sự thật, dùng không tốt sẽ tạo ra dối trá. Dưới đây là những cạm bẫy trực quan hóa phổ biến nhất, mỗi nhà làm việc với dữ liệu đều phải biết nhận ra.

### 5.1 Cắt đứt trục tọa độ

Đổi điểm bắt đầu của trục Y từ 0 thành một số lớn hơn sẽ làm cho sự khác biệt nhỏ có vẻ như là một thay đổi lớn.

| Tình huống | Sự khác biệt thực | Cảm nhận trực quan |
|------|---------|---------|
| Trục Y bắt đầu từ 0 | Sản phẩm A 98 điểm, sản phẩm B 95 điểm | Chênh lệch rất nhỏ |
| Trục Y bắt đầu từ 90 | Cùng dữ liệu | A có vẻ tốt hơn B nhiều lần |

**Khi nào có thể cắt đứt?** Khi giá trị tuyệt đối của dữ liệu rất lớn nhưng thay đổi rất nhỏ (chẳng hạn như giá cổ phiếu từ 100 đến 105), cắt đứt là hợp lý — nhưng phải ghi chú rõ ràng.

### 5.2 Cạm bẫy phối cảnh biểu đồ tròn 3D

Phối cảnh 3D sẽ làm cho các phần quạt gần người quan sát có vẻ lớn hơn. Một phần quạt 25% với góc nhìn 3D có thể có vẻ như là 35%.

**Giải pháp**: Không bao giờ dùng biểu đồ tròn 3D. Dùng biểu đồ tròn thường hay biểu đồ vòng, hoặc dùng biểu đồ cột.

### 5.3 Lạm dụng màu sắc

| Cách làm sai | Cách làm đúng |
|---------|---------|
| Dùng đỏ-xanh lục để biểu thị dữ liệu (không thân thiện với mù màu) | Dùng xanh-cam và các sơ đồ màu an toàn cho mù màu |
| Mỗi danh mục dùng màu khác (biểu đồ cầu vồng) | Cùng một chuỗi dùng sâu-nhạt của cùng tông màu |
| Dùng màu mã hóa dữ liệu liên tục nhưng không có chú thích | Luôn cung cấp chú thích màu và ghi chú giá trị |
| Độ tương phản nền và màu dữ liệu không đủ | Đảm bảo độ tương phản cấp WCAG AA |

### 5.4 Những lỗi phổ biến khác

| Cạm bẫy | Vấn đề | Sửa |
|------|------|------|
| Trục Y kép | Hai chỉ số không liên quan chia sẻ trục X, gợi ý mối quan hệ nhân quả | Tách thành hai biểu đồ, hoặc rõ ràng nói không có nhân quả |
| Sai lệch diện tích | Dùng bán kính của hình tròn thay vì diện tích để biểu thị giá trị | Khi giá trị tăng gấp đôi, diện tích tăng gấp đôi, không phải bán kính |
| Trục thời gian không đều | Khoảng cách của tháng 1, 3, 12 là như nhau | Sắp xếp theo tỷ lệ thời gian thực tế |
| Quá nhiều danh mục | Biểu đồ tròn có 15 phần quạt | Trên 5 danh mục dùng biểu đồ cột hoặc gộp "khác" |

::: tip Nguyên tắc đạo đức trực quan hóa
Mục đích của trực quan hóa là **giúp hiểu biết**, không phải **thao túng nhận thức**. Mỗi lần vẽ biểu đồ, hỏi bản thân:
- Nếu tôi là người đọc, biểu đồ này có khiến tôi đưa ra kết luận sai không?
- Tôi có ẩn dữ liệu bất lợi không?
- Trục, tỷ lệ, màu sắc có công bằng biểu thị dữ liệu không?
:::

---

## Tóm tắt

Dữ liệu trực quan hóa là "cách cuối cùng" để truyền tải giá trị dữ liệu. Chọn đúng biểu đồ, tuân theo các nguyên tắc thiết kế, tránh những cạm bẫy phổ biến, và bạn có thể làm cho dữ liệu thực sự "nói chuyện".

Nhìn lại các điểm chính của chương:

1. **Trước tiên hỏi mục đích rồi chọn biểu đồ**: Dùng biểu đồ cột để so sánh, biểu đồ đường để xu hướng, biểu đồ tròn để tỷ lệ
2. **Tỷ lệ mực dữ liệu**: Xóa đi mọi yếu tố hình ảnh không truyền đạt thông tin
3. **Bảng điều khiển có mẫu**: Loại tổng quan, loại so sánh, loại khoan sâu, loại thời gian thực mỗi cái có tình huống áp dụng
4. **Lựa chọn công cụ**: ECharts làm sản phẩm, Grafana làm giám sát, Metabase làm phân tích
5. **Cảnh báo cạm bẫy hình ảnh**: Cắt đứt trục, biểu đồ tròn 3D, lạm dụng màu sắc đều sẽ gây hiểu lầm cho người đọc

## Đọc thêm

- [The Visual Display of Quantitative Information](https://www.edwardtufte.com/tufte/books_vdqi) - Kinh điển trực quan hóa của Edward Tufte
- [Tài liệu chính thức ECharts](https://echarts.apache.org/zh/index.html) - Thư viện biểu đồ tiếng Trung phổ biến nhất
- [D3.js](https://d3js.org/) - Thư viện trực quan hóa cấp dưới mạnh nhất
- [Grafana](https://grafana.com/) - Tiêu chuẩn thực tế trực quan hóa giám sát
- [From Data to Viz](https://www.data-to-viz.com/) - Cây quyết định lựa chọn loại biểu đồ
- [ColorBrewer](https://colorbrewer2.org/) - Công cụ sơ đồ màu an toàn cho mù màu

---

## Tóm tắt

Dữ liệu trực quan hóa là "cách cuối cùng" để truyền tải giá trị dữ liệu. Bất kỳ phân tích nào, nếu không thể được hiểu đúng, cũng bằng không phân tích.

Nhìn lại các điểm chính của chương:

1. **Chọn đúng biểu đồ**: Dựa trên mục đích dữ liệu (so sánh, xu hướng, tỷ lệ, phân bố, mối quan hệ) chọn loại biểu đồ
2. **Nguyên tắc thiết kế**: Tỷ lệ mực dữ liệu cao, nhất quán, khả năng đọc là ba nguyên tắc cốt lõi
3. **Bố cục bảng điều khiển**: Bốn mẫu loại tổng quan, loại so sánh, loại khoan sâu, loại thời gian thực bao gồm hầu hết các tình huống
4. **Lựa chọn công cụ**: Từ ECharts đến Grafana, lựa chọn dựa trên khả năng đội và độ phức tạp nhu cầu
5. **Tránh những cạm bẫy**: Cắt đứt trục, biểu đồ tròn 3D, lạm dụng màu sắc là những cách gây hiểu lầm phổ biến nhất

## Đọc thêm

- [The Visual Display of Quantitative Information](https://www.edwardtufte.com/tufte/books_vdqi) - Kinh điển trực quan hóa của Edward Tufte
- [Tài liệu chính thức ECharts](https://echarts.apache.org/zh/index.html) - Thư viện biểu đồ tiếng Trung phổ biến nhất
- [D3.js](https://d3js.org/) - Thư viện trực quan hóa cấp dưới mạnh mẽ nhất
- [Grafana](https://grafana.com/) - Tiêu chuẩn thực tế trực quan hóa giám sát
- [From Data to Viz](https://www.data-to-viz.com/) - Cây quyết định lựa chọn loại biểu đồ
- [ColorBrewer](https://colorbrewer2.org/) - Công cụ sơ đồ màu an toàn cho mù màu
