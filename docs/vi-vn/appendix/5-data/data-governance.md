# Quản trị Dữ liệu và Chất lượng Dữ liệu

::: tip Lời mở đầu
**Bạn có bao giờ gặp phải tình huống này không: các con số trên báo cáo không khớp với hoạt động kinh doanh thực tế, thông tin cùng một người dùng trong hai hệ thống khác nhau, hoặc kết quả phân tích hoàn toàn không đáng tin cậy vì dữ liệu bẩn?** Quản trị dữ liệu chính là phương pháp hệ thống để giải quyết những vấn đề này. Trong thời đại "quyết định dựa trên dữ liệu", chất lượng dữ liệu trực tiếp quyết định chất lượng quyết định — Garbage In, Garbage Out.
:::

**Bài viết này sẽ dạy bạn những gì?**

Sau khi hoàn thành chương này, bạn sẽ nhận được:

- **Các chiều của chất lượng dữ liệu**: Hiểu tính đầy đủ, độ chính xác, tính nhất quán và năm chiều khác
- **Hệ thống quản trị dữ liệu**: Tìm hiểu khung quản trị từ tổ chức, quy trình đến công nghệ
- **Hóa thạch dữ liệu**: Nắm vững theo dõi toàn chuỗi dữ liệu từ nguồn gốc đến tiêu thụ
- **Quản lý siêu dữ liệu**: Hiểu tầm quan trọng của "dữ liệu mô tả dữ liệu"
- **Kiến trúc phân tầng dữ liệu**: Nắm vững mô hình phân tầng kho dữ liệu ODS → DWD → DWS → ADS
- **Khả năng ứng dụng thực tế**: Biết cách triển khai quản trị dữ liệu trong dự án

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|-----------------|
| **Chương 1** | Chiều của chất lượng dữ liệu | Tính đầy đủ, độ chính xác, tính nhất quán, tính kịp thời |
| **Chương 2** | Khung quản trị dữ liệu | Tổ chức, quy trình, công nghệ, văn hóa |
| **Chương 3** | Theo dõi hóa thạch dữ liệu | Phân tích tác động, khắc phục sự cố, kiểm toán tuân thủ |
| **Chương 4** | Quản lý siêu dữ liệu | Siêu dữ liệu kỹ thuật, siêu dữ liệu kinh doanh, siêu dữ liệu vận hành |
| **Chương 5** | Kiến trúc phân tầng dữ liệu | ODS、DWD、DWS、ADS |
| **Chương 6** | Công cụ và thực hành quản trị | Great Expectations、dbt、DataHub |

---

## 0. Toàn cảnh: Tại sao cần quản trị dữ liệu?

Quản trị dữ liệu không phải vấn đề công nghệ, mà là vấn đề **quản lý**. Nó trả lời câu hỏi cốt lõi: **Ai chịu trách nhiệm với dữ liệu? Tiêu chuẩn dữ liệu là gì? Làm thế nào để đảm bảo dữ liệu đáng tin cậy liên tục?**

Hãy tưởng tượng một công ty có 100 bảng dữ liệu, mỗi bảng được duy trì bởi các nhóm khác nhau, không có quy chuẩn đặt tên thống nhất, không có từ điển dữ liệu, không có kiểm tra chất lượng. Kết quả là: cùng một chỉ số "người dùng hoạt động hàng tháng", bộ phận marketing tính được 5 triệu, bộ phận sản phẩm tính được 3 triệu — vì định nghĩa khác nhau.

::: tip Bốn trụ cột của quản trị dữ liệu
1. **Tổ chức**: Xác định rõ vai trò và trách nhiệm của data Owner và quản lý dữ liệu
2. **Quy trình**: Thiết lập quy trình tiêu chuẩn cho tiếp nhận, thay đổi và loại bỏ dữ liệu
3. **Công nghệ**: Triển khai giám sát chất lượng dữ liệu, quản lý siêu dữ liệu, theo dõi hóa thạch
4. **Văn hóa**: Giúp toàn công ty chấp nhận "dữ liệu là tài sản", chứ không phải "sản phẩm phụ"
:::

---

## 1. Sáu chiều của chất lượng dữ liệu

Chất lượng dữ liệu không phải khái niệm mờ mờ, mà có thể đo lường cụ thể từ sáu chiều. Mỗi chiều đều có định nghĩa rõ ràng và phương pháp phát hiện.

<DataQualityDemo />

| Chiều | Định nghĩa | Phương pháp phát hiện | Vấn đề phổ biến |
|-------|-----------|-------------------|-----------------|
| Tính đầy đủ | Dữ liệu có thiếu không | Kiểm tra tỷ lệ giá trị null | Trường bắt buộc để trống, dữ liệu liên quan thiếu |
| Độ chính xác | Dữ liệu có chính xác không | Xác thực quy tắc, so sánh mẫu | Số tiền âm, ngày tháng không hợp lệ |
| Tính nhất quán | Dữ liệu từ nhiều nguồn có nhất quán không | So sánh trên các hệ thống | Tên người dùng CRM và hệ thống đơn hàng khác |
| Tính kịp thời | Dữ liệu có được cập nhật kịp thời không | Kiểm tra thời gian cập nhật | Dữ liệu hàng tồn kho trễ, giá không được đồng bộ |
| Tính duy nhất | Có bản ghi trùng lặp không | Kiểm tra trùng lặp | Cùng một người dùng đăng ký hai lần |
| Hiệu lực | Có phù hợp với quy tắc định dạng không | Xác thực biểu thức chính quy/phạm vi | Email sai định dạng, tuổi số âm |

::: tip Quy tắc 1-10-100 của chất lượng dữ liệu
- **1 đồng**: Xác thực tại điểm vào dữ liệu, phòng ngừa dữ liệu bẩn xâm nhập
- **10 đồng**: Làm sạch dữ liệu bẩn hiện tại trong kho dữ liệu
- **100 đồng**: Mất mát từ quyết định sai do dữ liệu bẩn

Phát hiện và sửa chữa vấn đề chất lượng dữ liệu càng sớm càng tốt, chi phí càng thấp.
:::

---

## 2. Khung quản trị dữ liệu: Quản lý vòng đời toàn bộ

Quản trị dữ liệu không phải dự án một lần, mà là quá trình liên tục xuyên suốt vòng đời toàn bộ của dữ liệu. Từ tạo dữ liệu cho đến hủy, mỗi giai đoạn cần quy chuẩn rõ ràng và người chịu trách nhiệm.

<DataGovernanceFrameworkDemo />

| Giai đoạn | Đầu ra cốt lõi | Vai trò chính |
|-----------|--------------|-----------|
| Định nghĩa tiêu chuẩn | Từ điển dữ liệu, quy chuẩn đặt tên, tiêu chuẩn phân loại | Kiến trúc sư dữ liệu |
| Tiếp nhận | Quy chuẩn tiếp nhận, quy tắc xác thực, bản ghi hóa thạch | Kỹ sư dữ liệu |
| Quản lý lưu trữ | Mô hình phân tầng, ma trận quyền, chính sách vòng đời | DBA / kỹ sư nền tảng |
| Tiêu thụ | Danh mục dữ liệu, quy tắc che mắt, báo cáo chất lượng | Nhà phân tích dữ liệu / bên kinh doanh |
| Lưu trữ và hủy | Chính sách lưu trữ, nhật ký xóa, nhật ký kiểm toán | Đội bảo mật tuân thủ |

## 2. Khung quản trị dữ liệu

Quản trị dữ liệu không phải mua một công cụ có thể giải quyết, nó cần một bộ khung hoàn chỉnh để hỗ trợ. Khung tham khảo thường được dùng nhất trong ngành là DAMA-DMBOK (Hệ thống kiến thức quản lý dữ liệu).

| Lĩnh vực quản trị | Nội dung cốt lõi | Đầu ra chính |
|-----------------|-----------------|------------|
| Kiến trúc dữ liệu | Định nghĩa mô hình dữ liệu, luồng dữ liệu, chiến lược lưu trữ | Sơ đồ kiến trúc, sơ đồ ER |
| Tiêu chuẩn dữ liệu | Thống nhất quy chuẩn đặt tên, quy chuẩn mã hóa, định nghĩa chỉ số | Từ điển dữ liệu, thư viện chỉ số |
| Chất lượng dữ liệu | Thiết lập quy tắc chất lượng, giám sát cảnh báo, quy trình sửa chữa | Báo cáo chất lượng, bảng điều khiển SLA |
| Bảo mật dữ liệu | Phân loại và phân cấp, kiểm soát truy cập, che mắt mã hóa | Chính sách bảo mật, nhật ký kiểm toán |
| Quản lý dữ liệu chủ | Thống nhất "bản ghi vàng" của khách hàng, sản phẩm và các thực thể cốt lõi khác | Trung tâm dữ liệu chủ |
| Vòng đời dữ liệu | Quản lý toàn bộ quá trình từ tạo dữ liệu cho đến lưu trữ cho đến hủy | Chính sách lưu giữ, quy tắc lưu trữ |

::: tip Mô hình trưởng thành của quản trị dữ liệu
- **Cấp 1 - Ban đầu**: Không có tiêu chuẩn thống nhất, mỗi nhóm tự quản lý
- **Cấp 2 - Có thể lặp lại**: Có tài liệu quy chuẩn cơ bản, nhưng thực thi không nhất quán
- **Cấp 3 - Được xác định**: Có quy trình và công cụ quản trị thống nhất, đa số nhóm tuân theo
- **Cấp 4 - Được quản lý**: Có chỉ số chất lượng định lượng và giám sát tự động
- **Cấp 5 - Tối ưu**: Liên tục cải thiện, quản trị dữ liệu tích hợp vào quy trình phát triển hàng ngày
:::

---

## 3. Hóa thạch dữ liệu: Từ đâu đến đâu

Hóa thạch dữ liệu ghi lại đường dẫn chuyên chuyển hoàn chỉnh của dữ liệu từ nơi gốc cho đến tiêu thụ cuối cùng. Nó giống như "gia phả" của dữ liệu, cho phép bạn truy vết bất cứ dữ liệu nào từ nơi tới nơi.

<DataLineageDemo />

Hóa thạch dữ liệu có ba kịch bản ứng dụng cốt lõi trong công việc thực tế:

| Kịch bản | Vấn đề | Cách hóa thạch giúp |
|---------|------|------------------|
| Phân tích tác động | Muốn sửa đổi trường bảng người dùng, sẽ ảnh hưởng đến những báo cáo hạ lưu nào? | Theo dõi hạ lưu xuyên suốt hóa thạch để tìm tất cả phụ thuộc |
| Xác định nguyên nhân gốc rễ | Dữ liệu báo cáo GMV hôm nay bất thường, vấn đề ở bước nào? | Truy ngược xuyên suốt hóa thạch mỗi khâu |
| Kiểm toán tuân thủ | Số điện thoại người dùng đã đi qua những hệ thống nào? Tất cả đều được che mắt chưa? | Theo dõi toàn chuỗi luồng trường nhạy cảm |

::: tip Hai cách thu thập hóa thạch
- **Chủ động**: Phân tích câu lệnh SQL, cấu hình ETL, tự động trích xuất mối quan hệ hóa thạch cấp bảng/trường
- **Thụ động**: Qua Hook chặn công cụ truy vấn (như Hive、Spark) kế hoạch thực thi, ghi lại hóa thạch thời gian thực

Công cụ chủ lưu như Apache Atlas、DataHub、OpenLineage đều hỗ trợ thu thập hóa thạch tự động.
:::

---

## 4. Quản lý siêu dữ liệu: "Dữ liệu mô tả dữ liệu"

Siêu dữ liệu là dữ liệu về dữ liệu. Nếu dữ liệu là nội dung cuốn sách, siêu dữ liệu là danh mục, tác giả, ngày xuất bản, số ISBN. Không có siêu dữ liệu, dữ liệu chỉ là đống số và chuỗi không thể hiểu.

| Loại siêu dữ liệu | Mô tả | Ví dụ |
|------------------|------|-------|
| Siêu dữ liệu kỹ thuật | Thông tin lưu trữ vật lý của dữ liệu | Tên bảng, loại trường, cách phân vùng, vị trí lưu trữ |
| Siêu dữ liệu kinh doanh | Ý nghĩa kinh doanh của dữ liệu | Tên tiếng Trung, định nghĩa kinh doanh, chuẩn tính toán |
| Siêu dữ liệu vận hành | Trạng thái vận hành của dữ liệu | Thời gian thực thi ETL, lượng dữ liệu, tần suất cập nhật |

::: tip Tầm quan trọng của từ điển dữ liệu
Từ điển dữ liệu là đầu ra quản lý siêu dữ liệu cơ bản nhất. Một từ điển dữ liệu tốt nên bao gồm:
- **Tên trường**: Tên tiếng Anh và tiếng Trung
- **Loại dữ liệu**: VARCHAR(50)、INT、DATETIME v.v.
- **Định nghĩa kinh doanh**: Trường này đại diện cho cái gì? Tính toán như thế nào?
- **Phạm vi giá trị**: Giá trị hợp lệ là gì? Giá trị null có được phép không?
- **Người chịu trách nhiệm**: Ai bảo trì trường này? Có vấn đề thì liên hệ ai?

Đội không có từ điển dữ liệu, nhân viên mới vào việc hiểu ý nghĩa một bảng có thể mất một tuần; đội có từ điển dữ liệu, 10 phút là đủ.
:::

---

## 5. Kiến trúc phân tầng dữ liệu: ODS → DWD → DWS → ADS

Kho dữ liệu không phải tập hợp tất cả dữ liệu lại, mà lưu trữ phân tầng theo **mức độ xử lý**. Mỗi tầng có trách nhiệm rõ ràng, tầng trên phụ thuộc tầng dưới, từng bước chưng cất dữ liệu nguyên thủy thành dữ liệu kinh doanh có thể sử dụng.

| Tầng | Tên đầy đủ | Trách nhiệm | Đặc điểm dữ liệu |
|-----|-----------|-----------|-----------------|
| ODS | Tầng Dữ liệu Hoạt động | Đồng bộ hóa dữ liệu cơ sở dữ liệu kinh doanh nguyên bản | Nguyên thủy nhất, chưa được xử lý |
| DWD | Tầng Dữ liệu Chi tiết | Làm sạch, tiêu chuẩn hóa, loại bỏ trùng lặp | Bản ghi chi tiết sạch sẽ |
| DWS | Tầng Dữ liệu Tóm tắt | Tổng hợp theo chủ đề (ngày/tuần/tháng) | Chỉ số tổng hợp được tính toán trước |
| ADS | Tầng Dữ liệu Ứng dụng | Hướng tới báo cáo/giao diện cụ thể | Dữ liệu kết quả trực tiếp có thể sử dụng |

::: tip Tại sao lại phân tầng?
- **Tái sử dụng**: Tầng DWD làm sạch một lần, tất cả tầng trên chia sẻ, tránh làm sạch lại
- **Tách biệt**: Thay đổi cấu trúc bảng cơ sở dữ liệu kinh doanh chỉ ảnh hưởng tầng ODS, không ảnh hưởng báo cáo
- **Hiệu suất**: Tầng DWS tổng hợp trước, báo cáo đọc trực tiếp, không cần tính toán thời gian thực
- **Có thể truy vết**: Mỗi tầng đều giữ lại, khi có vấn đề có thể kiểm tra từng tầng
:::

---

## 6. Công cụ và Thực hành Quản trị

| Công cụ | Định vị | Khả năng cốt lõi | Ứng dụng phù hợp |
|---------|--------|-----------------|-----------------|
| Great Expectations | Chất lượng dữ liệu | Quy tắc xác thực dữ liệu khai báo, tự động tạo báo cáo chất lượng | Đường ống dữ liệu Python |
| dbt | Chuyển đổi dữ liệu | Phát triển mô hình hóa SQL, kiểm tra và tạo tài liệu tích hợp | Xây dựng mô hình kho dữ liệu |
| DataHub | Quản lý siêu dữ liệu | Danh mục dữ liệu, theo dõi hóa thạch, phát hiện dữ liệu | Quản trị dữ liệu cấp doanh nghiệp |
| Apache Atlas | Quản lý siêu dữ liệu | Theo dõi hóa thạch hệ sinh thái Hadoop | Nền tảng dữ liệu lớn |
| OpenMetadata | Quản lý siêu dữ liệu | Danh mục dữ liệu mã nguồn mở, hỗ trợ nhiều nguồn dữ liệu | Các nhóm vừa và nhỏ |
| Amundsen | Phát hiện dữ liệu | Nền tảng phát hiện dữ liệu dạng tìm kiếm | Dân chủ hóa dữ liệu |

::: tip Đường dẫn quản trị từ con số không
Nếu nhóm của bạn chưa có quản trị dữ liệu, đề nghị thúc đẩy theo thứ tự này:
1. **Trước tiên xây dựng từ điển dữ liệu**: Ghi lại ý nghĩa của bảng và trường hiện tại (ngay cả khi dùng Excel)
2. **Thêm kiểm tra chất lượng**: Thêm quy tắc xác thực cơ bản vào đường ống dữ liệu chính
3. **Thống nhất định nghĩa chỉ số**: Thống nhất chuẩn tính toán của "ngày hoạt động"、"tháng hoạt động"、"GMV" và các chỉ số cốt lõi khác
4. **Giới thiệu công cụ**: Khi chi phí quản lý thủ công quá cao, giới thiệu DataHub hoặc dbt
5. **Thiết lập quy trình**: Thay đổi dữ liệu cần xem xét, vấn đề chất lượng có SLA và cảnh báo
:::

---

## Tóm tắt

Quản trị dữ liệu là kỹ thuật hệ thống giúp dữ liệu từ "có thể sử dụng" trở thành "tốt, đáng tin cậy, có thể truy vết". Nó không phải dự án một lần, mà là quá trình vận hành liên tục.

Ôn lại các điểm chính của chương:

1. **Sáu chiều chất lượng**: Tính đầy đủ, độ chính xác, tính nhất quán, tính kịp thời, tính duy nhất, hiệu lực
2. **Bốn trụ cột quản trị**: Tổ chức, quy trình, công nghệ, văn hóa không thể thiếu
3. **Hóa thạch dữ liệu**: Theo dõi từ nơi tới nơi, hỗ trợ phân tích tác động và khắc phục sự cố
4. **Quản lý siêu dữ liệu**: Từ điển dữ liệu là đầu ra quản lý siêu dữ liệu cơ bản nhất và quan trọng nhất
5. **Kiến trúc phân tầng**: ODS → DWD → DWS → ADS, từng bước chưng cất giá trị dữ liệu
6. **Triển khai dần dần**: Bắt đầu từ từ điển dữ liệu, từng bước giới thiệu công cụ và quy trình

## Đọc thêm

- [DAMA-DMBOK](https://www.dama.org/cpages/body-of-knowledge) - Hệ thống kiến thức quản lý dữ liệu, "kinh thánh" của quản trị dữ liệu
- [DataHub](https://datahubproject.io/) - Nền tảng quản lý siêu dữ liệu mã nguồn mở của LinkedIn
- [Great Expectations](https://greatexpectations.io/) - Khung kiểm tra chất lượng dữ liệu Python
- [dbt](https://www.getdbt.com/) - Công cụ chuyển đổi dữ liệu, kiểm tra và tạo tài liệu tích hợp
- [Apache Atlas](https://atlas.apache.org/) - Khung quản trị siêu dữ liệu hệ sinh thái Hadoop
- [The Data Warehouse Toolkit](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/) - Kinh điển xây dựng mô hình kho dữ liệu của Kimball
