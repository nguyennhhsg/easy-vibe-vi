# Xử lý Sự Cố và Ứng Phó Khẩn Cấp

::: tip Lời nói đầu
**Ba giờ sáng, điện thoại rung liên tục, dịch vụ trực tuyến toàn bộ bị ngừng hoạt động——bạn sẽ làm gì?** Đối với bất kỳ đội ngũ Internet nào, sự cố không phải là vấn đề "sẽ xảy ra hay không", mà là "khi nào xảy ra". Các đội xuất sắc không phải là những đội không gặp sự cố, mà là những đội có thể phản ứng nhanh chóng khi sự cố xảy ra, hồi phục hiệu quả, và học hỏi từ đó để tránh lặp lại những sai lầm.
:::

**Bạn sẽ học được gì từ bài viết này?**

Sau khi hoàn thành chương này, bạn sẽ có được:

- **Ý thức phân cấp**: Nắm vững tiêu chuẩn phân loại mức độ nghiêm trọng của sự cố P0~P4
- **Quy trình ứng phó**: Hiểu được dòng thời gian ứng phó sự cố hoàn chỉnh từ phát hiện đến khôi phục
- **Hợp tác tổ chức**: Hiểu rõ vai trò phân chia và cơ chế hợp tác trong hệ thống chỉ huy sự cố
- **Hệ thống cảnh báo**: Nắm vững chiến lược nâng cấp cảnh báo, đảm bảo các vấn đề quan trọng không bị bỏ sót
- **Phương pháp rút kinh nghiệm**: Học cách sử dụng "năm lý do tại sao" để khai thác nguyên nhân gốc rễ, viết báo cáo rút kinh nghiệm có giá trị

| Chương | Nội dung | Khái niệm chính |
|--------|----------|------------------|
| **Chương 1** | Phân loại mức độ nghiêm trọng | P0~P4、Đánh giá phạm vi ảnh hưởng |
| **Chương 2** | Dòng thời gian ứng phó | Phát hiện→Ứng phó→Khôi phục→Rút kinh nghiệm |
| **Chương 3** | Hệ thống chỉ huy | IC、Người phụ trách truyền thông、Người chịu trách nhiệm kỹ thuật |
| **Chương 4** | Nâng cấp cảnh báo | Phân cấp cảnh báo、Nâng cấp từng bước |
| **Chương 5** | Rút kinh nghiệm sau sự cố | Năm lý do tại sao、Văn hóa không trách cứ |

---

## 0. Toàn cảnh: Sự cố là giáo viên tốt nhất

Netflix có một công cụ nổi tiếng gọi là Chaos Monkey——nó sẽ ngẫu nhiên tắt các máy chủ trong môi trường sản xuất. Nghe có vẻ điên rồ, nhưng logic đằng sau rất rõ ràng: **Thay vì chờ sự cố đến, tốt hơn là chủ động tạo ra sự cố để rèn luyện khả năng ứng phó khẩn cấp của đội ngũ**.

Ứng phó khẩn cấp không phải dựa vào sự phát huy tức thời, mà dựa vào **quy trình, vai trò, công cụ** ba yếu tố thống nhất trong xây dựng hệ thống. Giống như lực lượng cứu hỏa không được thành lập khi có cháy—họ luyện tập, diễn tập và bảo trì thiết bị ngay từ hàng ngày.

::: tip Bốn yếu tố cốt lõi của ứng phó khẩn cấp
- **Phát hiện nhanh chóng**: Hệ thống giám sát và cảnh báo hoàn thiện, đảm bảo vấn đề được phát hiện trước khi người dùng nhận thấy
- **Hợp tác hiệu quả**: Phân chia vai trò rõ ràng và cơ chế truyền thông, tránh lao động lặp lại trong hỗn loạn
- **Khôi phục nhanh chóng**: Ưu tiên khôi phục dịch vụ, không ưu tiên tìm nguyên nhân gốc rễ. Trước tiên cứu tắc, sau đó mới chữa bệnh
- **Cải tiến liên tục**: Mỗi lần xảy ra sự cố là cơ hội học tập, liên tục cải thiện hệ thống và quy trình thông qua rút kinh nghiệm
:::

---

## 1. Phân loại mức độ nghiêm trọng: Không phải mọi sự cố đều cần "tất cả mọi người ra quân"

Một lỗi hiển thị màu nút và toàn bộ hệ thống thanh toán bị tê liệt rõ ràng không phải là cùng một mức độ vấn đề. **Phân loại sự cố** nhằm mục đích cho phép đội ngũ sử dụng lực lượng phù hợp để ứng phó với mức độ vấn đề thích hợp——không phản ứng quá mức lãng phí tài nguyên, cũng không coi thường vấn đề làm mất mát tăng đó.

<SeverityLevelDemo />

| Cấp độ | Tên | Phạm vi ảnh hưởng | Yêu cầu ứng phó | Ví dụ |
|--------|------|---------|---------|------|
| P0 | Tử tế | Kinh doanh cốt lõi hoàn toàn không khả dụng | Ứng phó ngay lập tức, tất cả mọi người chờ lệnh | Hệ thống thanh toán bị tê liệt、Rò rỉ dữ liệu |
| P1 | Nghiêm trọng | Chức năng cốt lõi bị hư hại nghiêm trọng | Ứng phó trong vòng 15 phút | Tỷ lệ thất bại đăng nhập > 50%、API hết thời gian chờ trên diện rộng |
| P2 | Quan trọng | Một số chức năng bị lỗi | Ứng phó trong vòng 1 giờ | Kết quả tìm kiếm không chính xác、một số trang 500 |
| P3 | Tổng quát | Chức năng không cốt lõi bị lỗi | Xử lý trong giờ làm việc | Tải ảnh đại diện thất bại、thông báo không quan trọng bị trễ |
| P4 | Nhẹ | Vấn đề trải nghiệm | Đưa vào kế hoạch lặp lại | UI bị lệch、lỗi trong bản sao |

::: tip Các nguyên tắc chính trong phân loại
- **Số lượng người dùng bị ảnh hưởng**: P2 ảnh hưởng 100% người dùng có thể khẩn cấp hơn P1 ảnh hưởng 1% người dùng
- **Tổn thất kinh doanh**: Các vấn đề ảnh hưởng trực tiếp đến doanh thu (thanh toán、đặt hàng) có mức ưu tiên cao hơn
- **Xử lý giảm cấp có thể được**: Nếu có giải pháp tạm thời có thể giảm thiểu ảnh hưởng, có thể giảm cấp xử lý một cách thích hợp
- **Điều chỉnh động**: Khi việc điều tra sâu hơn, cấp độ có thể được nâng lên hoặc hạ xuống
:::

---

## 2. Dòng thời gian ứng phó: Quy trình hoàn chỉnh từ phát hiện đến rút kinh nghiệm

Một lần ứng phó sự cố giống như một cuộc chạy tiếp sức, mỗi giai đoạn đều có mục tiêu rõ ràng và điểm bàn giao. Một dòng thời gian rõ ràng có thể giúp đội ngũ duy trì trật tự giữa hỗn loạn.

<IncidentTimelineDemo />

::: tip Năm giai đoạn của ứng phó sự cố
1. **Phát hiện (Detection)**: Phát hiện bất thường thông qua cảnh báo giám sát、phản hồi của người dùng hoặc kiểm tra nội bộ. Mục tiêu: Phát hiện sớm, rút ngắn MTTD (Thời gian phát hiện trung bình).
2. **Ứng phó (Response)**: Xác nhận sự cố、đánh giá mức độ nghiêm trọng、tập hợp đội ứng phó、thiết lập kênh truyền thông. Mục tiêu: Nhanh chóng tổ chức lực lượng ứng phó hiệu quả.
3. **Giảm thiểu (Mitigation)**: Áp dụng các biện pháp tạm thời để khôi phục dịch vụ, chẳng hạn như hoàn lại triển khai、chuyển đổi nút dự phòng、giới hạn lưu lượng giảm cấp. Mục tiêu: Trước tiên cứu tắc, khôi phục trải nghiệm người dùng.
4. **Sửa chữa (Resolution)**: Tìm thấy nguyên nhân gốc rễ và sửa chữa triệt để. Mục tiêu: Loại bỏ các mối nguy ẩn, ngăn chặn tái phát.
5. **Rút kinh nghiệm (Postmortem)**: Xem xét toàn bộ quá trình、phân tích nguyên nhân gốc rễ、đưa ra các biện pháp cải tiến. Mục tiêu: Học từ sự cố, làm cho hệ thống mạnh mẽ hơn.
:::

| Chỉ số | Ý nghĩa | Hướng tối ưu hóa |
|--------|---------|-----------------|
| MTTD | Thời gian phát hiện trung bình | Hoàn thiện phạm vi giám sát、giảm ngưỡng cảnh báo |
| MTTR | Thời gian khôi phục trung bình | Khôi phục tự động、diễn tập kế hoạch |
| MTBF | Khoảng thời gian giữa các sự cố trung bình | Nâng cao độ tin cây của hệ thống、loại bỏ điểm lỗi duy nhất |

---

## 3. Hệ thống chỉ huy: Ai sẽ chỉ huy "trận chiến" này?

Điều tồi tệ nhất trong các sự cố lớn không phải là các vấn đề kỹ thuật, mà là **hỗn loạn**——mười mấy người cùng lúc đang điều tra, không ai biết người khác đang làm gì, thông tin chính được chia sẻ rải rác trong các nhóm khác nhau. Hệ thống Chỉ huy Sự cố (Incident Command System) được tạo ra để giải quyết vấn đề này.

<IncidentCommandDemo />

::: tip Ba vai trò cốt lõi
1. **Chỉ huy Sự cố (Incident Commander, IC)**: Người chịu trách nhiệm tổng thể cho toàn bộ ứng phó sự cố. Chịu trách nhiệm quyết định、điều phối tài nguyên、kiểm soát nhịp độ. IC không nhất thiết phải là người mạnh nhất về kỹ thuật, nhưng phải là người bình tĩnh nhất và có tầm nhìn toàn cục nhất.
2. **Người phụ trách Truyền thông (Communication Lead)**: Chịu trách nhiệm truyền thông bên ngoài——cập nhật trang trạng thái、thông báo cho khách hàng、đồng bộ hóa lớp quản lý. Cho phép IC và nhân viên kỹ thuật tập trung vào giải quyết vấn đề, không bị gián đoạn bởi các công việc truyền thông.
3. **Người chịu trách nhiệm Kỹ thuật (Tech Lead)**: Chịu trách nhiệm điều tra và sửa chữa ở cấp độ kỹ thuật. Tổ chức nhân viên kỹ thuật phân chia công việc hợp tác, báo cáo tiến độ và phương án cho IC.
:::

---

## 4. Nâng cấp cảnh báo: Đảm bảo các vấn đề quan trọng không bị bỏ sót

Hệ thống cảnh báo là "mắt" của ứng phó sự cố. Nhưng quá ít cảnh báo sẽ dẫn đến báo cáo bỏ sót, quá nhiều cảnh báo sẽ gây ra "mệt mỏi cảnh báo"——khi nhận được hàng trăm cảnh báo mỗi ngày, cảnh báo thực sự quan trọng đó rất dễ bị chìm trong biển cảnh báo. **Chiến lược nâng cấp cảnh báo** là chìa khóa để giải quyết vấn đề này.

<AlertEscalationDemo />

::: tip Ba cấp độ cơ chế nâng cấp cảnh báo
1. **Ứng phó Hàng một (L1)**: Sau khi cảnh báo được kích hoạt, trước tiên thông báo cho kỹ sư trực. Nếu không được xác nhận trong vòng 15 phút, tự động nâng cấp.
2. **Nâng cấp Hàng hai (L2)**: Thông báo cho người chịu trách nhiệm nhóm và các chuyên gia lĩnh vực liên quan. Nếu không được giảm thiểu trong vòng 30 phút, tiếp tục nâng cấp.
3. **Nâng cấp Hàng ba (L3)**: Thông báo cho Giám đốc Kỹ thuật và lớp quản lý, khởi động ứng phó khẩn cấp toàn diện.
:::

| Cấp độ cảnh báo | Phương thức thông báo | Thời hạn ứng phó | Điều kiện nâng cấp |
|---------|---------|---------|---------|
| Cảnh báo | Tin nhắn IM | Xử lý trong giờ làm việc | Không khôi phục trong vòng 30 phút |
| Nghiêm trọng | Điện thoại + IM | Xác nhận trong vòng 15 phút | Không được xác nhận hoặc không được giảm thiểu |
| Tử tế | Gọi điện thoại liên tục + SMS | Ứng phó trong vòng 5 phút | Tự động nâng cấp lên lớp quản lý |

---

## 5. Rút kinh nghiệm sau sự cố: Học từ sự cố

Sau khi sự cố được khôi phục, bước quan trọng nhất là **rút kinh nghiệm (Postmortem)**. Rút kinh nghiệm không phải để trách cứ, mà để tìm các cơ hội cải tiến có tính hệ thống. Các công ty như Google, Meta đều thực hiện văn hóa "rút kinh nghiệm không trách cứ"——tập trung vào "tại sao hệ thống lại cho phép sai lầm này xảy ra", chứ không phải "ai đã gây ra sai lầm này".

<PostmortemDemo />

::: tip Phương pháp phân tích "Năm lý do tại sao"
Bắt đầu từ hiện tượng bề mặt, liên tục đặt câu hỏi "tại sao" cho đến khi tìm thấy nguyên nhân gốc rễ:
1. **Tại sao dịch vụ bị ngừng?** → Nhóm kết nối cơ sở dữ liệu bị cạn kiệt
2. **Tại sao nhóm kết nối bị cạn kiệt?** → Truy vấn chậm chiếm dụng kết nối và không giải phóng
3. **Tại sao lại có truy vấn chậm?** → Thiếu chỉ mục, quét toàn bộ bảng
4. **Tại sao thiếu chỉ mục?** → Không có DBA xem xét khi bảng mới được triển khai
5. **Tại sao không có xem xét?** → Không có quy trình xem xét SQL bắt buộc

Nguyên nhân gốc rễ không phải là "ai đó quên thêm chỉ mục", mà là "thiếu quy trình xem xét SQL". Sửa chữa nguyên nhân gốc rễ mới có thể ngăn chặn tái phát.
:::

---

## Tóm lại

Xử lý sự cố và ứng phó khẩn cấp là kỹ năng bắt buộc của mỗi đội kỹ thuật. Nó không dựa vào sự phát huy của các cá nhân anh hùng, mà dựa vào quy trình có hệ thống、phân chia vai trò rõ ràng và cải tiến rút kinh nghiệm liên tục.

Xem xét lại các điểm chính của chương:

1. **Ứng phó phân cấp**: Phân loại P0~P4 đảm bảo sử dụng lực lượng phù hợp để ứng phó với mức độ vấn đề thích hợp
2. **Dòng thời gian rõ ràng**: Phát hiện→Ứng phó→Giảm thiểu→Sửa chữa→Rút kinh nghiệm, mỗi giai đoạn có mục tiêu rõ ràng
3. **Hệ thống chỉ huy**: IC + Người phụ trách Truyền thông + Người chịu trách nhiệm Kỹ thuật, phân chia công việc hợp tác tránh hỗn loạn
4. **Nâng cấp cảnh báo**: Phân cấp cảnh báo + Nâng cấp tự động, đảm bảo các vấn đề quan trọng không bị bỏ sót
5. **Rút kinh nghiệm không trách cứ**: Sử dụng "Năm lý do tại sao" để khai thác nguyên nhân gốc rễ, tập trung vào cải tiến hệ thống chứ không phải trách cứ cá nhân

## Phần mở rộng

- [Google SRE Book - Incident Response](https://sre.google/sre-book/managing-incidents/) - Thực hành quản lý sự cố của Google
- [PagerDuty Incident Response Guide](https://response.pagerduty.com/) - Hướng dẫn ứng phó sự cố mã nguồn mở của PagerDuty
- [Atlassian Incident Management](https://www.atlassian.com/incident-management) - Các thực tiễn tốt nhất về quản lý sự cố của Atlassian
- [Learning from Incidents](https://www.learningfromincidents.io/) - Tài nguyên cộng đồng để học từ các sự cố
- [Chaos Engineering (O'Reilly)](https://www.oreilly.com/library/view/chaos-engineering/9781492043850/) - Nguyên lý và thực hành kỹ thuật hỗn loạn
