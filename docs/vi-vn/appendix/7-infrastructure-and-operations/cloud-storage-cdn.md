# Lưu trữ đối tượng và CDN
> 💡 **Hướng dẫn học tập**：Bài viết này sẽ đưa bạn đi qua toàn bộ một chuỗi hoàn chỉnh——từ tải lên tệp đến tải xuống của người dùng. Bạn sẽ thấy cách lưu trữ đối tượng quản lý khối lượng tệp khổng lồ giống như một "kho hàng thông minh", CDN đưa nội dung đến người dùng giống như "điểm giao hàng nhanh", và những cái "bẫy" nào đang chờ bạn rơi vào. Gợi ý: trước hết nên hiểu những nguyên tắc cơ bản về HTTP request và DNS resolution.

Trước khi bắt đầu, gợi ý bạn nên dự phòng một số "viên gạch cơ bản":

- **Quy trình HTTP request**：Bạn có thể đọc trước [Điều gì xảy ra sau khi nhập URL vào trình duyệt](./web-basics/url-to-browser.md) để hiểu được toàn bộ chuỗi request.
- **Nguyên tắc DNS resolution**：Nếu bạn chưa quen với domain name resolution, có thể xem [Quy trình DNS query](./deployment/dns-flow.md) phần hình ảnh.

---

## 0. Lời mở đầu: Tại sao tải lên và tải xuống tệp lại "chậm" như vậy?

Hãy tưởng tượng kịch bản này: bạn tải lên một bức ảnh HD 10MB lên một cộng đồng chia sẻ ảnh, kết quả chờ nửa phút mới xong; còn bạn bè của bạn ở Bắc Kinh, khi nhấp vào tải xuống chỉ cần 2 giây. Tại sao cùng một tệp, tải lên và tải xuống lại có trải nghiệm khác nhau như vậy?

Hoặc hãy nghĩ lại: trang web thương mại điện tử của bạn tổ chức khuyến mại ngày khai bán, trang chi tiết sản phẩm bỗng dưng có lưu lượng hàng triệu, máy chủ ngay lập tức "nằm yên". Đó là do không đủ băng thông? Hay là có vấn đề trong thiết kế kiến trúc?

Câu trả lời cho những câu hỏi này đều nằm trong cặp "bộ đôi vàng"——**lưu trữ đối tượng** và **CDN**.

---

## 1. Lưu trữ đối tượng: Bạn có "kho hàng mây thông minh"

### 1.1 Lưu trữ đối tượng là gì?

Hệ thống tệp truyền thống giống như tủ quần áo nhà bạn: quần áo được xếp theo "áo sơ mi/quần/váy" theo tầng, bạn muốn tìm một chiếc áo sơ mi phải mở tủ→khu vực áo sơ mi→khoảng áo sơ mi. Phương thức "phân cấp lồng nhau" này trở nên cực kỳ cồng kềnh khi số lượng tệp tăng vọt.

Lưu trữ đối tượng giống như logistics kho hàng hiện đại: mỗi gói hàng đều có một "số đơn vận chuyển" duy nhất (khóa đối tượng), bạn chỉ cần báo cáo số đơn, robot kho sẽ chính xác lấy ra từ vô số gói hàng.

<ObjectStorageDemo />

**Bảng so sánh sự khác biệt cốt lõi**：

| Chiều kích | Hệ thống tệp truyền thống | Lưu trữ đối tượng |
| :----------- | :----------------------- | :---------------------- |
| **Cách tổ chức** | Cây thư mục phân cấp | Cặp khóa-giá trị phẳng |
| **Giao thức truy cập** | POSIX (hoạt động tệp cục bộ) | HTTP/REST API |
| **Khả năng mở rộng** | Dung lượng máy đơn bị giới hạn | Mở rộng ngang gần như vô hạn |
| **Metadata** | Thuộc tính cơ bản (kích thước, thời gian) | Metadata tùy chỉnh phong phú |
| **Trường hợp điển hình** | Tài liệu văn phòng cục bộ | Ảnh/video/sao lưu/tài nguyên tĩnh |

### 1.2 Các khái niệm cốt lõi của lưu trữ đối tượng

#### Bucket (Thùng chứa): Bạn có "vùng kho hàng"

Bucket là thùng chứa cấp cao nhất của lưu trữ đối tượng, tương đương với một không gian tên độc lập. Tất cả các đối tượng phải được lưu trữ trong một bucket nào đó.

**Quy tắc đặt tên** (lấy Alibaba Cloud OSS làm ví dụ):

- Toàn cầu duy nhất: không thể trùng lặp giữa tất cả người dùng của nhà cung cấp dịch vụ
- Chỉ có thể chứa chữ cái viết thường, số và dấu gạch ngang
- Phải bắt đầu và kết thúc bằng chữ cái viết thường hoặc số
- Độ dài từ 3-63 ký tự

**Thực tế bước vào cạm bẫy**: Từng có một team tạo vài chục bucket theo dòng kinh doanh, kết quả tới cuối tháng hóa đơn ra mà ngơ ngác——mỗi bucket đều có phí lưu trữ tối thiểu và phí yêu cầu. Gợi ý: hãy lên kế hoạch bucket theo sự kết hợp "môi trường + mục đích", chẳng hạn `prod-static-assets`、`dev-backup-archive`.

#### Đối tượng (Object): Bạn có "gói dữ liệu"

Đối tượng là đơn vị cơ bản của lưu trữ, bao gồm ba phần:

1. **Khóa (Key)**：Mã định danh duy nhất của đối tượng, tương đương với "số đơn vận chuyển"
   - Ví dụ：`images/avatar/2024/user123.jpg`
   - Mặc dù trông giống như đường dẫn, nhưng bản chất chỉ là một chuỗi ký tự

2. **Dữ liệu (Data)**：Nội dung của chính đối tượng
   - Có thể là bất kỳ dữ liệu nhị phân nào
   - Giới hạn kích thước phụ thuộc vào nhà cung cấp dịch vụ (thông thường đối tượng đơn lẻ < 5TB)

3. **Metadata (Metadata)**：Thông tin bổ sung mô tả đối tượng
   - Metadata hệ thống: Content-Type、ETag、Last-Modified v.v.
   - Metadata tùy chỉnh: chẳng hạn như `x-oss-meta-owner`、`x-oss-meta-project`

#### Kiểm soát truy cập: Ai có thể động vào "kho hàng" của tôi?

Lưu trữ đối tượng cung cấp kiểm soát quyền hạn nhiều tầng:

| Tầng | Cách kiểm soát | Trường hợp điển hình |
| :----------- | :------------------------ | :------------------------------ |
| **Tầng bucket** | Bucket Policy (chính sách tài nguyên) | Cấm tất cả truy cập mạng ngoài, chỉ cho phép IP cụ thể |
| **Tầng đối tượng** | ACL (danh sách kiểm soát truy cập) | Ảnh công khai, tài liệu riêng tư |
| **Cấp phát tạm thời** | STS (Dịch vụ mã bảo mật) | Tải lên trực tiếp giao diện trước, tải lên thiết bị di động |

**Đường đỏ bảo mật**: Không bao giờ viết AccessKey ID và AccessKey Secret vào mã giao diện trước! Cách làm đúng là: giao diện trước yêu cầu từ máy chủ back-end của bạn xin thông tin STS tạm thời, back-end xác thực danh tính rồi trả về thông tin tạm thời có thời hạn hết hạn.

---

## 2. CDN: Bạn có "mạng lưới giao hàng toàn cầu"

### 2.1 Tại sao lại cần CDN?

Hãy tưởng tượng bạn mở một cửa hàng trực tuyến, máy chủ được đặt ở Thâm Quyến. Bây giờ có một người dùng ở Bắc Kinh truy cập ảnh của bạn:

- **Không có CDN**：Yêu cầu đi từ Bắc Kinh→Hà Bắc→Hà Nam→Hồ Bắc→Hồ Nam→Quảng Đông→Thâm Quyến, băng ngang hơn 2000 km, đi về cũng hơn 4000 km. Chỉ truyền mạng đã phải mất hàng chục miligiây, gặp tắc mạng càng kinh khủng.

- **Có CDN**：Yêu cầu đi trực tiếp từ Bắc Kinh đến nút CDN Bắc Kinh (có thể ở ngay trong phòng máy liên thông), khoảng cách từ 2000 km giảm xuống 20 km, độ trễ từ 50ms giảm xuống 5ms.

Đó chính là giá trị cốt lõi của CDN：**Để nội dung gần người dùng hơn**.

<CdnAccelerationDemo />

### 2.2 Kiến trúc cốt lõi của CDN

#### Nút biên (Edge Node): "Trạm giao hàng" gần người dùng nhất

Nút biên là tầng gần người dùng nhất trong mạng lưới CDN, thường được triển khai ở:

- Phòng máy nhà cung cấp (Liên thông/Điện tín/Di động)
- Trung tâm trao đổi Internet thành phố lớn
- Các trung tâm giao thông quan trọng

**Phân bố nút CDN chính ở Trung Quốc**：

- Thành phố hạng nhất: Bắc Kinh, Thượng Hải, Quảng Châu, Thâm Quyến
- Thành phố hạng hai: Hàng Châu, Nam Kinh, Thành Đô, Vũ Hán, Tây An
- Nước ngoài: Hồng Kông, Singapo, Tokyo, Thung lũng Silicông, Frankfurt

<EdgeNodeDistributionDemo />

#### Máy chủ nguồn (Origin): "Tổng kho hàng" của nội dung

Máy chủ nguồn là nơi nút CDN lấy nội dung, có thể là:

- Lưu trữ đối tượng (OSS/COS/S3)
- Máy chủ tự xây dựng (ECS/máy tính vật lý)
- Cân bằng tải (SLB/CLB)

**Cấu hình chính**:

- **Return to Origin HOST**：Tên miền/IP mà nút CDN sử dụng khi truy cập máy chủ nguồn
- **Giao thức trả về nguồn gốc**: HTTP hay HTTPS
- **Cổng trả về nguồn gốc**: 80、443 hay cổng tùy chỉnh

#### Nút tầng trung gian: "Trung tâm phân phối khu vực"

Giữa nút biên và máy chủ nguồn, CDN thường còn có một hay nhiều tầng nút trung gian:

- **Nút tập hợp**: Tập hợp yêu cầu trả về nguồn từ nhiều nút biên, giảm áp lực máy chủ nguồn
- **Trung tâm khu vực**: Chịu trách nhiệm phân phối nội dung và điều phối của một khu vực lớn

Ưu điểm của kiến trúc phân tầng này:

1. **Giảm áp lực máy chủ nguồn**: Yêu cầu từ 1000 nút biên có thể chỉ cần đến máy chủ nguồn 10 lần
2. **Tăng tỉ lệ trúng**: Nội dung phổ biến bị chặn ở tầng trung gian, không cần trả về nguồn
3. **Cách ly lỗi**: Khi một đường link có vấn đề, có thể tự động chuyển sang đường khác

### 2.3 Quy trình hoàn chỉnh của gia tốc CDN

Hãy theo dõi một yêu cầu người dùng thực tế:

<CachePolicyDemo />

**Step 1：DNS resolution**（Điều phối thông minh）

```
Người dùng nhập：cdn.example.com/image.jpg
↓
Máy chủ DNS trả về：Nút CDN liên thông Bắc Kinh IP (1.2.3.4)
```

Chìa khóa ở đây là **DNS thông minh**：dựa trên nhà cung cấp, vị trí địa lý, tải của nút người dùng để trả về nút CDN tối ưu nhất IP.

**Step 2：Tìm kiếm nút biên**（Trúng cache?）

```
Yêu cầu đến nút CDN liên thông Bắc Kinh (1.2.3.4)
↓
Nút kiểm tra cache cục bộ:
├─ Trúng? Trả về nội dung trực tiếp ✓
└─ Không trúng? Tiếp tục bước tiếp theo
```

**Step 3：Trả về nguồn gốc để lấy nội dung**（Tầng tầng hướng lên）

```
Nút biên không trúng
↓
Yêu cầu từ nút cha (chẳng hạn: Trung tâm Hoa Bắc)
├─ Nút cha trúng? Trả về nội dung
└─ Nút cha không trúng? Tiếp tục hướng lên
    ↓
    Yêu cầu từ máy chủ nguồn
    ↓
    Máy chủ nguồn trả về nội dung
```

**Step 4：Cache và trả về**（Lần sau nhanh hơn）

```
Nội dung trả về theo đường
↓
Mỗi tầng nút đều cache một bản sao
↓
Cuối cùng đến người dùng
```

Như vậy, lần tiếp theo có người dùng yêu cầu cùng một tệp, có thể trả về trực tiếp từ nút biên, đạt được "mở tức thì".

---

## 3. Từ tải lên đến truy cập: Phân tích chuỗi hoàn chỉnh

### 3.1 Ba cách tải lên tệp

<UploadProcessDemo />

#### Cách 1：Client → Server → Object Storage (Chế độ truyền thống)

```
Trình duyệt → Máy chủ back-end của bạn → Lưu trữ đối tượng
```

**Quy trình**:

1. Người dùng chọn tệp, nhấp tải lên
2. Tệp trước tiên được tải lên máy chủ back-end của bạn
3. Back-end nhận toàn bộ tệp, sau đó tải lên lưu trữ đối tượng
4. Trả về kết quả tải lên cho người dùng

**Ưu điểm**:

- Thực hiện đơn giản, dễ kiểm soát ở cả front-end và back-end
- Có thể xác thực tệp ở back-end, chuyển đổi định dạng
- Các hoạt động nhạy cảm có thể ghi nhật ký, xác thực quyền hạn

**Nhược điểm**:

- **Mất gấp đôi băng thông**: Tải lên người dùng chiếm một lần băng thông, máy chủ chuyển giao lại chiếm một lần
- **Áp lực máy chủ lớn**: Tệp lớn chiếm dung lượng bộ nhớ và CPU lớn
- **Tải lên chậm**: Tương đương thêm một bước chuyển tiếp, người dùng cảm nhận thời gian tải lên dài hơn

**Trường hợp phù hợp**：Tệp nhỏ (<10MB)、cần xử lý back-end (chẳng hạn nén ảnh, thêm hình mờ)、hệ thống quản lý nội bộ.

#### Cách 2：Client trực tiếp tải lên Object Storage (Khuyên dùng hiện đại)

```
Trình duyệt ───────→ Lưu trữ đối tượng
        ↑
        Back-end chỉ cấp thông tin tạm thời
```

**Quy trình**:

1. Người dùng chọn tệp, front-end trước tiên yêu cầu "thông tin tải lên" từ back-end
2. Back-end xác thực danh tính người dùng, yêu cầu **thông tin tạm thời STS** từ dịch vụ lưu trữ đối tượng (có thời hạn hết hạn)
3. Back-end trả lại thông tin tạm thời cho front-end
4. Front-end mang thông tin tạm thời, **tải lên tệp trực tiếp lên lưu trữ đối tượng**
5. Lưu trữ đối tượng trả về kết quả tải lên, front-end thông báo back-end "tải lên hoàn tất"

**Ưu điểm**:

- **Tải lên nhanh**: Ít bước chuyển tiếp, cảm nhận tốc độ người dùng nhanh nhất
- **Áp lực máy chủ nhỏ**: Chỉ xử lý cấp phát thông tin tạm thời, không xử lý luồng tệp
- **Tiết kiệm băng thông**: Chỉ một lần tải lên
- **Bảo mật cao**: Thông tin tạm thời có thời hạn hết hạn, nếu rò rỉ cũng gây hại hạn chế

**Nhược điểm**:

- Thực hiện hơi phức tạp, cần hiểu STS、cơ chế ký
- Front-end cần xử lý tải lên phân đoạn, tiếp tục từ nơi gián đoạn v.v.
-跨域 (CORS) cần cấu hình

**Trường hợp phù hợp**：Tải lên tệp lớn、nội dung do người dùng tạo (UGC)、kinh doanh cần tải lên cùng lúc cao.

#### Cách 3：Tải lên phân đoạn + Tiếp tục từ nơi gián đoạn (Tệp lớn bắt buộc)

```
Tệp video 10GB
↓
Chia thành 1000 đoạn 10MB
↓
Tải lên song song (cùng lúc tải 5 đoạn)
↓
Mạng gián đoạn! Đã tải 600 đoạn
↓
Khôi phục mạng, tiếp tục từ đoạn thứ 601
↓
Tất cả đoạn tải xong, gửi yêu cầu "hợp nhất"
```

**Tại sao lại cần tải lên phân đoạn?**

| Kịch bản | Không phân đoạn | Phân đoạn |
| :----------- | :---------------------- | :------------------- |
| **Sóng mạng** | Tải được 99% mạng gián đoạn, tải lại từ đầu | Chỉ tải lại đoạn bị lỗi |
| **Tốc độ tải lên** | Luồng đơn, tốc độ chậm | Nhiều luồng song song, tốc độ nhanh |
| **Mất bộ nhớ** | Cần cache toàn bộ tệp | Chỉ cần cache đoạn hiện tại |
| **Hiển thị tiến độ** | Chỉ có 0% và 100% | Chính xác đến từng đoạn tiến độ |

**Tiêu chuẩn phân đoạn của các nhà cung cấp dịch vụ chủ yếu**：

| Nhà cung cấp | Giới hạn kích thước phân đoạn | Số phân đoạn tối đa | Kích thước phân đoạn tối thiểu |
| :------------- | :----------- | :--------- | :----------- |
| **Alibaba Cloud OSS** | 100MB | 10000 | 100KB |
| **Tencent Cloud COS** | 5GB | 10000 | 1MB |
| **AWS S3** | 5GB | 10000 | 5MB (được khuyên dùng) |
| **Qiniu** | 100MB | 10000 | 4MB |

### 3.2 Phân tích chi tiết chiến lược trả về nguồn CDN

<CachePolicyDemo />

#### "Trả về nguồn" là gì?

Nút biên CDN đã cache nội dung từ máy chủ nguồn, nhưng khi:

- Nội dung người dùng yêu cầu **lần đầu tiên được truy cập**
- Nội dung cache **đã hết hạn (TTL hết hạn)**
- Cache được **làm mới/tải trước bằng tay**

Nút CDN cần yêu cầu nội dung mới nhất từ **máy chủ nguồn**, quá trình này được gọi là "trả về nguồn".

#### Ba chế độ trả về nguồn

| Chế độ | Nguyên lý | Trường hợp phù hợp | Ưu nhược điểm |
| :-------------------- | :----------------------- | :------------------------ | :----------------------- |
| **Trả về nguồn trực tiếp** | Nút CDN → Máy chủ nguồn | Máy chủ nguồn có IP công cộng, lưu lượng không lớn | Đơn giản trực tiếp, nhưng áp lực máy chủ nguồn lớn |
| **Trả về nguồn từ tầng trung gian** | Nút CDN → Tầng trung gian → Máy chủ nguồn | Trang web lớn, kiến trúc cache nhiều tầng | Chia sẻ áp lực máy chủ nguồn, kiến trúc phức tạp |
| **Lưu trữ đối tượng/COS làm nguồn** | Nút CDN → Lưu trữ đối tượng | Tài nguyên tĩnh, ảnh, video | Thực hành tốt nhất, chi phí thấp, hiệu suất tốt |

#### Thực hành cấu hình trả về nguồn

**Kịch bản 1：Lưu trữ đối tượng làm máy chủ nguồn (Được khuyên dùng)**

```
Người dùng truy cập：cdn.example.com/images/photo.jpg
                    ↓
            Nút biên CDN (Bắc Kinh)
                    ↓
            Không trúng, trả về nguồn
                    ↓
            Máy chủ nguồn：bucket-name.oss-cn-beijing.aliyuncs.com
                    ↓
            Trả về ảnh, CDN cache và phản hồi người dùng
```

Các mục cấu hình chính:

- **Loại máy chủ nguồn**：Tên miền OSS/COS hoặc máy chủ nguồn tùy chỉnh
- **Giao thức trả về nguồn**：HTTP hay HTTPS (khuyên dùng HTTPS)
- **Return to Origin HOST**：Host header được sử dụng khi truy cập máy chủ nguồn
- **Return to Origin SNI**：Server Name Indication khi trả về nguồn HTTPS

**Kịch bản 2：Cân bằng tải nhiều máy chủ nguồn**

Khi một máy chủ nguồn không thể chịu được áp lực trả về nguồn, có thể cấu hình nhiều máy chủ nguồn:

```
Nút biên CDN
    ├─ Máy chủ nguồn A (trọng số 50%)
    ├─ Máy chủ nguồn B (trọng số 30%)
    └─ Máy chủ nguồn C (trọng số 20%)
```

Chế độ chính-phụ:

```
Nút biên CDN
    ├─ Máy chủ nguồn chính A (khi khỏe mạnh toàn bộ lưu lượng)
    └─ Máy chủ nguồn phụ B (khi máy chủ chính gặp sự cố chuyển sang)
```

#### Băng thông trả về nguồn vs Băng thông CDN

Có một khái niệm dễ nhầm lẫn ở đây:

| Chỉ số | Định nghĩa | Quan hệ tính phí |
| :--------------- | :---------------------- | :--------------------------- |
| **Băng thông hạ xuống CDN** | Lưu lượng từ nút CDN đến người dùng | Thường phí CDN theo lưu lượng |
| **Băng thông trả về nguồn** | Lưu lượng từ máy chủ nguồn đến nút CDN | Thường phí lưu lượng đi của lưu trữ đối tượng hoặc máy chủ nguồn |

**Thủ thuật tiết kiệm tiền**:

- Tăng tỉ lệ trúng CDN (để nhiều yêu cầu hơn trúng cache, giảm trả về nguồn)
- Đặt thời gian cache hợp lý (TTL)
- Sử dụng tính năng tải trước, cache nội dung phổ biến trước khi người dùng truy cập
- Bật "theo dõi 301/302", tránh trả về nguồn không cần thiết

### 3.3 Cấu hình chiến lược cache

<CachePolicyDemo />

#### Cache Key (Khóa cache): Quyết định "tệp nào được coi là cùng một tệp"

CDN làm thế nào để xác định hai yêu cầu có nên trả về cùng một bản sao cache? Dựa vào **khóa cache**.

**Khóa cache mặc định thường bao gồm**:

- Đường dẫn URL (không bao gồm tham số truy vấn)
- Ví dụ：`/images/photo.jpg`

**Kịch bản vấn đề**:

```
Người dùng A yêu cầu：/images/photo.jpg?w=100&h=100  (ảnh thu nhỏ 100x100)
Người dùng B yêu cầu：/images/photo.jpg?w=800&h=600  (ảnh lớn 800x600)
```

Nếu khóa cache chỉ bao gồm đường dẫn, hai ảnh kích thước khác nhau sẽ được coi là cùng một tệp, gây nhầm lẫn.

**Giải pháp：Quy tắc khóa cache tùy chỉnh**

| Quy tắc | Ví dụ | Hiệu quả |
| :------------------- | :--------------------------- | :--------------------------- |
| **Giữ lại tham số truy vấn chỉ định** | Giữ lại `w`、`h` | Kích thước khác nhau cache riêng |
| **Giữ lại tất cả tham số truy vấn** | Giữ lại toàn bộ | Khớp hoàn toàn chính xác |
| **Bỏ qua tham số truy vấn cụ thể** | Bỏ qua `token`、`timestamp` | URL có dấu thời gian có thể trúng cache |
| **Bao gồm header yêu cầu** | Bao gồm `Accept-Language` | Ngôn ngữ khác nhau trả về nội dung khác |

**Ví dụ cấu hình thực hành** (Alibaba Cloud CDN)：

```
Quy tắc khóa cache:
- Đường dẫn URL：/images/*
- Giữ lại tham số truy vấn：w, h, format
- Bỏ qua tham số truy vấn：token, timestamp, utm_source
```

#### Thời gian cache (TTL)：Sự cân bằng "tính mới" của nội dung

TTL (Time To Live) quyết định nội dung được cache tại nút CDN bao lâu. Đặt quá ngắn, trả về nguồn nhiều, chi phí cao; đặt quá dài, sau khi cập nhật nội dung người dùng vẫn thấy nội dung cũ.

**Gợi ý đặt TTL theo loại tệp**:

| Loại tệp | TTL được khuyên dùng | Lý do |
| :---------- | :---------------------- | :----------------------------- |
| Trang HTML | 0-5 phút | Nội dung cập nhật thường xuyên, cần thực tế |
| JS/CSS | 1 năm (kèm hash tên tệp) | Nội dung không thay đổi, tên tệp thay đổi thì cache hết hạn |
| Ảnh/video | 7-30 ngày | Tần suất cập nhật thấp, có thể cache lâu |
| Tệp font | 1 năm | Gần như không thay đổi |
| Phản hồi API | 0-5 phút (tùy kinh doanh) | Yêu cầu tính thực tế dữ liệu cao |

**Thực hành tốt nhất khi công nghệ front-end hợp với CDN**:

```javascript
// webpack/vite configuration
output: {
  filename: 'js/[name]-[contenthash:8].js',
  chunkFilename: 'js/[name]-[contenthash:8].chunk.js',
}
```

Tệp được tạo ra：`app-a3f2b1c9.js`

- Nội dung tệp thay đổi → hash thay đổi → URL mới → cache tự nhiên hết hạn
- Nội dung tệp không thay đổi → hash không thay đổi → URL không thay đổi → cache lâu dài trúng

#### Làm mới cache và tải trước

**Làm mới bằng tay (Kịch bản khẩn cấp)**:

Khi bạn cập nhật nội dung máy chủ nguồn, nhưng cache CDN chưa hết hạn, người dùng vẫn thấy nội dung cũ:

| Loại làm mới | Hiệu quả | Thời gian chờ | Trường hợp phù hợp |
| :----------- | :----------------------- | :---------- | :----------- |
| **Làm mới URL** | Cache URL chỉ định hết hạn | 5-10 phút | Cập nhật tệp đơn |
| **Làm mới thư mục** | Cache tất cả nội dung thư mục hết hạn | 10-30 phút | Cập nhật hàng loạt |
| **Làm mới toàn trang** | Cache toàn bộ tên miền hết hạn | 30 phút trở lên | Khôi phục khẩn cấp |

**Lưu ý quan trọng**: Làm mới chỉ là để cache hết hạn, yêu cầu tiếp theo sẽ trả về nguồn lấy nội dung mới. Không nên làm mới hàng loạt lớn ở giờ cao điểm, nếu không có thể làm máy chủ nguồn bị quá tải.

**Tải trước (Tối ưu chủ động)**:

Làm mới là bị động (nội dung đã cập nhật), tải trước là chủ động (cache trước).

```
Kịch bản：Ngày mai sáng 10h sẽ phát một bài viết siêu hot

Hôm nay gửi yêu cầu tải trước：
- URL: https://cdn.example.com/articles/bài-viết-siêu-hot.html
- Phạm vi tải trước：Tất cả nút biên toàn quốc

Hiệu quả：
Ngày mai 10h người dùng truy cập, nội dung đã chờ sẵn ở nút biên
→ Không cần trả về nguồn, tốc độ mở tức thì
```

---

## 4. Điều phối lưu lượng: Giúp người dùng truy cập nút "gần nhất"

<TrafficSchedulingDemo />

### 4.1 Điều phối DNS thông minh

Giải quyết DNS truyền thống:

```
Người dùng hỏi：IP của cdn.example.com là gì?
DNS trả lời：1.2.3.4 (cố định)
```

Giải quyết DNS thông minh:

```
Người dùng (liên thông Bắc Kinh) hỏi：IP của cdn.example.com là gì?
DNS thông minh：Tôi xem... nút CDN liên thông Bắc Kinh là 1.2.3.4

Người dùng (điện tín Thượng Hải) hỏi：IP của cdn.example.com là gì?
DNS thông minh：Nút CDN điện tín Thượng Hải là 5.6.7.8
```

**Các chiều điều phối**:
| Chiều | Mô tả | Hiệu quả |
| :--- | :--- | :--- |
| **Vị trí địa lý** | Phân bổ theo tỉnh/thành phố/quốc gia | Truy cập gần nhất, giảm độ trễ |
| **Nhà cung cấp** | Liên thông/Điện tín/Di động/BGP | Cùng nhà cung cấp truyền tải, tránh băng thông chéo |
| **Tải nút** | CPU/băng thông/QPS thực tế | Tránh nút quá tải |
| **Sức khỏe nút** | Dò tìm tính khả dụng | Tự động loại bỏ nút gặp sự cố |
| **Nhân tố chi phí** | Chênh lệch giá băng thông | Cân bằng hiệu suất và chi phí |

### 4.2 HTTP DNS và IP trực tiếp kết nối

DNS truyền thống có vấn đề: **Che chắn DNS và độ trễ giải quyết**.

**Phương án HTTP DNS**:

```
Client → Bỏ qua hệ thống DNS → Hỏi trực tiếp dịch vụ HTTP DNS (chẳng hạn 223.5.5.5:80)
         ↓
    Trả về danh sách IP tối ưu (có trọng số)
         ↓
    Client dựa trên chất lượng mạng dò tìm, chọn IP tối ưu
```

Lợi ích:

- Chống che chắn: Không qua DNS nhà cung cấp
- Chính xác hơn: Có thể chọn IP dựa trên chất lượng mạng client
- Tính thực tế: Chuyển đổi sự cố nhanh hơn

**Gợi ý thực hành**:

- APP di động khuyên dùng mạnh để kết nối HTTP DNS
- Web có thể sử dụng CNAME điều phối được cung cấp bởi CDN
- Kinh doanh quan trọng có thể làm dự phòng nhiều IP (một tên miền trả về nhiều IP)

---

## 5. Tối ưu HTTPS: Sự cân bằng giữa bảo mật và hiệu suất

<HttpsOptimizationDemo />

### 5.1 Tại sao HTTPS trên CDN rất quan trọng?

**So sánh kịch bản**:

```
Không HTTPS:
Người dùng truy cập http://cdn.example.com/image.jpg
↓
Thanh địa chỉ trình duyệt hiển thị "không an toàn"
↓
Một số trình duyệt/APP chặn trực tiếp truy cập
↓
Xếp hạng SEO giảm
```

```
Có HTTPS:
Người dùng truy cập https://cdn.example.com/image.jpg
↓
Trình duyệt hiển thị biểu tượng khóa xanh
↓
Multiplexing HTTP/2 có hiệu lực
↓
Hiệu suất + bảo mật cải thiện kép
```

### 5.2 Điểm quan trọng cấu hình HTTPS CDN

#### Quản lý chứng chỉ

| Phương án | Mô tả | Chi phí | Trường hợp phù hợp |
| :--------------------- | :---------------------- | :------------- | :--------------- |
| **Chứng chỉ miễn phí của nhà cung cấp dịch vụ** | Được cung cấp bởi Alibaba Cloud/Tencent Cloud v.v. | Miễn phí | Tên miền đơn, bắt đầu nhanh |
| **Let's Encrypt** | Chứng chỉ miễn phí cộng đồng | Miễn phí | Triển khai tự động |
| **Chứng chỉ DV/OV/EV thương mại** | Symantec, GeoTrust v.v. | Hàng trăm đến hàng vạn ￥/năm | Cấp doanh nghiệp, cần thanh xanh |
| **Chứng chỉ tên miền wildcard** | *.example.com | Hàng ngàn ￥/năm | Tên miền con nhiều |

**Gợi ý thực hành**:

- Môi trường test: Let's Encrypt hoặc chứng chỉ miễn phí nhà cung cấp dịch vụ
- Môi trường sản xuất: Chứng chỉ tên miền wildcard (tiện) hoặc chứng chỉ OV tên miền đơn (tiết kiệm)
- Chú ý thời hạn chứng chỉ, đặt nhắc nhở gia hạn tự động

#### Cấu hình tối ưu HTTPS

**Lựa chọn phiên bản TLS**:

```
Cấu hình được khuyên dùng：Chỉ TLS 1.2 và TLS 1.3
Cấu hình tương thích：TLS 1.1 + TLS 1.2 + TLS 1.3 (tương thích trình duyệt cũ)
```

**Bộ mật mã**:

```
Được khuyên dùng：ECDHE trao đổi khóa + mã hóa AES-GCM
Cấm：DES、RC4、MD5、SHA1
```

**OCSP Stapling**:

```
Tính năng：Nút CDN tước xin trước trạng thái thu hồi chứng chỉ
Hiệu quả：Giảm thời gian xác thực client 200-500ms
Gợi ý：Nhất định bật
```

**Tái sử dụng phiên TLS**:

```
Tái sử dụng Session ID：Client mang Session ID lần trước, máy chủ phục hồi phiên
Tái sử dụng Session Ticket：Máy chủ mã hóa trạng thái phiên gửi client, lần sau mang theo
Hiệu quả：Tránh bắt tay TLS hoàn chỉnh, giảm 1-RTT
```

### 5.3 Ứng dụng HTTP/2 và HTTP/3 trên CDN

**Multiplexing HTTP/2**:

```
HTTP/1.1:
Yêu cầu 1 (index.html) ────────────────→
Phản hồi 1 ←──────────────────────────────
Yêu cầu 2 (style.css) ─────────────────→
Phản hồi 2 ←──────────────────────────────
Yêu cầu 3 (script.js) ─────────────────→
Phản hồi 3 ←──────────────────────────────
(Nối tiếp, một xong tiếp một)

HTTP/2:
Yêu cầu 1 ──→
Yêu cầu 2 ──→   Hợp nhất vào một kết nối TCP, khung chéo truyền
Yêu cầu 3 ──→
Phản hồi 1 ←──   Trả về theo mức độ ưu tiên dòng chữ
Phản hồi 2 ←──
Phản hồi 3 ←──
(Song song, một kết nối multiplexing nhiều)
```

**Đẩy phía máy chủ HTTP/2**:

```
Kịch bản：Người dùng yêu cầu index.html, bên trong tham chiếu style.css và script.js

Cách truyền thống:
1. Người dùng tải index.html
2. Phân tích thấy cần style.css và script.js
3. Lại gửi hai yêu cầu lấy

Đẩy HTTP/2:
1. Người dùng yêu cầu index.html
2. Nút CDN trả về index.html cùng lúc, chủ động đẩy style.css và script.js
3. Khi người dùng phân tích html, tài nguyên đã ở cache rồi

Chú ý：Đẩy cần cẩn thận, đẩy nhiều lãng phí băng thông, đẩy ít không có hiệu quả
```

**HTTP/3 (QUIC)**:

```
Vấn đề HTTP/2: Dựa trên TCP, tắc đầu hàng
→ Một gói TCP bị mất, toàn kết nối chờ truyền lại

Giải pháp HTTP/3: Dựa trên QUIC (truyền tải đáng tin cậy trên UDP)
→ Mỗi dòng chữ độc lập, một dòng tắc không ảnh hưởng dòng khác
→ Chuyển đổi kết nối: WiFi chuyển 4G, kết nối không gián đoạn
→ Bắt tay 0-RTT: Truy cập lần đầu cũng kết nối nhanh

Hiện tạo：2024 CDN chủ yếu đã hỗ trợ HTTP/3, gợi ý bật
```

---

## 6. Phân tích truy cập: Hiểu rõ báo cáo CDN của bạn

<AccessAnalyticsDemo />

### 6.1 Giải thích chỉ số cốt lõi

#### Băng thông (Bandwidth)

```
Định nghĩa：Lượng dữ liệu được truyền tải trong đơn vị thời gian
Đơn vị：bps (bit mỗi giây)、Mbps、Gbps

Băng thông CDN = Tổng lưu lượng đi của tất cả nút biên

Chú ý phân biệt:
- Băng thông tính phí: Thường tính phí theo 95 đỉnh hoặc đỉnh hàng ngày
- Băng thông thực tế: Tốc độ truyền tải thực tế
```

**Quan hệ giữa băng thông và lưu lượng**:

```
1 Mbps băng thông chạy liên tục 1 giờ = 450 MB lưu lượng
(Tính toán: 1,000,000 bps × 3600s ÷ 8 ÷ 1024 ÷ 1024 ≈ 429 MB)
```

#### QPS (Queries Per Second)

```
Định nghĩa：Số truy vấn/yêu cầu mỗi giây

CDN QPS = Tổng số HTTP request mỗi giây xử lý bởi tất cả nút biên

Chú ý：QPS cao không chứng tỏ băng thông cao
- Kịch bản tệp nhỏ：QPS cao, băng thông không cao
- Kịch bản tệp lớn：QPS không cao, băng thông cao
```

#### Tỉ lệ trúng (Hit Ratio)

```
Định nghĩa：Tỉ lệ yêu cầu trúng nút biên CDN chiếm tổng yêu cầu

Công thức tính toán:
Tỉ lệ trúng = (số trúng / tổng yêu cầu) × 100%
hoặc
Tỉ lệ trúng = (1 - lưu lượng trả về nguồn / tổng lưu lượng đi) × 100%

Tiêu chuẩn ngành:
- Ảnh/video/JS/CSS：> 95%
- Trang HTML：50-80% (tùy tần suất cập nhật)
- Giao diện API：thường không cache hoặc cực thấp
```

**Nguyên nhân phổ biến tỉ lệ trúng thấp**:

| Nguyên nhân | Hiện tượng | Giải pháp |
| :------------- | :----------------- | :----------------------- |
| TTL quá ngắn | TTL chỉ vài phút | Điều chỉnh TTL theo loại tệp |
| Tham số truy vấn thay đổi | URL mang số ngẫu nhiên | Cấu hình bỏ qua tham số chỉ định |
| Cài đặt khóa cache không đúng | Không nên phân biệt bị phân biệt | Tối ưu quy tắc khóa cache |
| Cập nhật nội dung thường xuyên | Tệp thường bị ghi đè | Sử dụng số phiên bản hoặc tên tệp hash |
| Truy cập mới nhiều | Nội dung hoặc nút mới | Tải trước trước |

### 6.2 Phân tích nhật ký và xử lý sự cố

#### Phân tích trường nhật ký CDN

Nhật ký truy cập CDN điển hình chứa các trường sau:

```
Thời gian | Client IP | Phương thức yêu cầu | URL | Mã trạng thái HTTP | Kích thước phản hồi | Trạng thái cache | Thời gian phản hồi | Referer | User-Agent

Ví dụ:
2024-01-15 14:32:01 | 114.114.114.114 | GET | https://cdn.example.com/images/photo.jpg | 200 | 153600 | HIT | 23 | https://example.com/ | Mozilla/5.0...
```

Giải thích trường chính:

| Trường | Mô tả | Giá trị phân tích |
| :-------------- | :------------- | :------------------------------------------- |
| `cache_status` | Trạng thái cache | HIT (trúng)、MISS (không trúng)、EXPIRED (hết hạn) |
| `response_time` | Thời gian phản hồi (ms) | Xác định trải nghiệm người dùng, >500ms cần tối ưu |
| `http_status` | Mã trạng thái HTTP | Xử lý sự cố lỗi 404/500 |
| `bytes_sent` | Byte được gửi | Thống kê băng thông |

#### Xử lý sự cố phổ biến

**Vấn đề 1：Người dùng phản ánh truy cập chậm**

Bước xử lý sự cố:

```
1. Xem nhật ký response_time
   - Nếu rất lớn (>500ms): Kiểm tra là cache MISS hay máy chủ nguồn chậm

2. Kiểm tra cache_status
   - HIT: Cache trúng, chậm có thể là tệp quá lớn hoặc vấn đề nút
   - MISS: Không trúng, cần tối ưu chiến lược cache hoặc tỉ lệ trúng

3. Kiểm tra phân bố Client IP
   - Một số địa phương chậm: Có thể nút đó tải cao hoặc phạm vi không đủ
```

**Vấn đề 2：Cache không có tác dụng, mỗi lần trả về nguồn**

Danh sách kiểm tra xử lý sự cố:

```
□ Response header máy chủ nguồn có Cache-Control: no-cache / private không?
□ URL có mang tham số ngẫu nhiên không (chẳng hạn ?_=123456)?
□ Cấu hình khóa cache có đúng không?
□ Cài đặt TTL có quá ngắn không?
□ Có trúng cache cục bộ trình duyệt thay vì CDN không?
```

**Vấn đề 3：Chi phí tăng vọt**

Hướng xử lý sự cố:

```
1. Xem chi tiết hóa đơn
   - Chi phí lưu lượng CDN cao: Kiểm tra tệp lớn được truy cập thường xuyên không, hoặc bị đánh cắp liên kết
   - Chi phí lưu lượng trả về nguồn cao: Kiểm tra tỉ lệ trúng có giảm đột ngột không
   - Chi phí yêu cầu cao: Kiểm tra có CC attack hoặc crawler không

2. Xem nhật ký truy cập
   - Có rất nhiều yêu cầu 404 không (có thể scan hoặc cấu hình sai)
   - Referer có bất thường không (xác định bị đánh cắp liên kết)

3. Cài đặt bảo mật
   - Bật chống liên kết (danh sách trắng Referer)
   - Bật danh sách đen/trắng IP
   - Cấu hình bảo vệ CC
```

---

## 7. Trường hợp thực hành: Xây dựng giải pháp gia tốc ảnh từ 0

### 7.1 Kịch bản kinh doanh

Giả sử bạn là người chịu trách nhiệm kỹ thuật của cộng đồng chia sẻ ảnh, đối mặt với những thách thức sau:

- **Tải lên người dùng**：Người dùng mỗi ngày tải lên 1 triệu ảnh (trung bình 2MB/ảnh)
- **Truy cập người dùng**：Mỗi ngày 50 triệu yêu cầu xem ảnh
- **Phân bố truy cập**：Người dùng rải rác khắp cả nước, cũng có truy cập nước ngoài ít
- **Yêu cầu hiệu suất**：Thời gian tải ảnh < 500ms
- **Ngân sách chi phí**：Cố gắng kiểm soát dưới 50,000 ￥/tháng

### 7.2 Thiết kế kiến trúc

```
                         ┌──────────────────────────────────────┐
                         │           Quy trình tải lên người dùng│
                         └──────────────────────────────────────┘

   Trình duyệt người dùng                Back-end server                 Object Storage
       │                                            │                            │
       │  1. Yêu cầu thông tin tải lên              │                            │
       │───────────────────────────────────────────>│                            │
       │                                            │                            │
       │                                            │  2. Yêu cầu thông tin STS  │
       │                                            │───────────────────────────>│
       │                                            │                            │
       │                                            │  3. Trả về thông tin STS   │
       │                                            │<───────────────────────────│
       │                                            │                            │
       │  4. Trả về thông tin tải lên (chứa STS)    │
       │<───────────────────────────────────────────│                            │
       │                                            │                            │
       │  5. Tải lên trực tiếp tệp (sử dụng chữ ký STS) │
       │──────────────────────────────────────────────────────────────────────>│
       │                                            │                            │
       │  6. Trả về kết quả tải lên (URL, ETag v.v.) │
       │<──────────────────────────────────────────────────────────────────────│
       │                                            │                            │
       │  7. Thông báo back-end tải lên hoàn tất (lưu DB) │
       │───────────────────────────────────────────>│                            │


                         ┌──────────────────────────────────────┐
                         │           Quy trình truy cập người dùng│
                         └──────────────────────────────────────┘

   Trình duyệt người dùng DNS resolution Nút CDN Origin (Object Storage)
       │                     │                     │                     │
       │  1. Yêu cầu ảnh URL │                     │                     │
       │────────────────────────────────────────>│                     │
       │                     │                     │                     │
       │                     │  2. Truy vấn DNS    │                     │
       │                     │────────────────────>│                     │
       │                     │                     │                     │
       │                     │  3. Trả về IP nút tối ưu │                     │
       │                     │<────────────────────│                     │
       │                     │                     │                     │
       │  4. Kết nối nút CDN │                     │                     │
       │────────────────────────────────────────>│                     │
       │                     │                     │                     │
       │                     │  5. Kiểm tra cache │                     │
       │                     │                     ├─ Trúng? Trả về trực tiếp
       │                     │                     └─ Không trúng? Tiếp tục     │
       │                     │                     │                     │
       │                     │                     │  6. Trả về nguồn    │
       │                     │                     │──────────────────>│
       │                     │                     │                     │
       │                     │                     │  7. Trả về tệp     │
       │                     │                     │<──────────────────│
       │                     │                     │                     │
       │                     │  8. Cache và phản hồi │                     │
       │<────────────────────────────────────────│                     │
```

### 7.3 Giải thích cấu hình chính

#### Cấu hình Bucket lưu trữ đối tượng

**Lập kế hoạch bucket lưu trữ**:

```
 Bucket: myapp-images-prod
 ├─ Cấu trúc thư mục:
 │   ├─ uploads/           # Ảnh gốc được tải lên
 │   │   ├─ 2024/01/15/user123-abc.jpg
 │   │   └─ 2024/01/15/user456-def.png
 │   ├─ thumbnails/        # Ảnh thu nhỏ
 │   │   ├─ small/         # 100x100
 │   │   ├─ medium/        # 400x300
 │   │   └─ large/         # 800x600
 │   └─ processed/         # Ảnh đã xử lý (thêm hình mờ v.v.)
 │
 ├─ Quyền truy cập:
 │   ├─ Thư mục ảnh gốc：Riêng tư (cần truy cập có chữ ký)
 │   ├─ Thư mục ảnh thu nhỏ：Công khai đọc
 │   └─ CORS liên miền：Cho phép truy cập từ *.myapp.com
 │
 └─ Chính sách vòng đời:
     ├─ 7 ngày sau tải lên：Lưu trữ tần suất thấp (tiết kiệm 40% chi phí)
     ├─ 90 ngày sau tải lên：Lưu trữ archive (tiết kiệm 70% chi phí)
     └─ 3 năm sau tải lên：Xóa tự động (hoặc chuyển sang lưu trữ lạnh rẻ hơn)
```

**Cấu hình CORS liên miền**:

```xml
<CORSConfiguration>
  <CORSRule>
    <AllowedOrigin>https://myapp.com</AllowedOrigin>
    <AllowedOrigin>https://www.myapp.com</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>HEAD</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
    <ExposeHeader>ETag</ExposeHeader>
    <ExposeHeader>x-oss-request-id</ExposeHeader>
    <MaxAgeSeconds>3600</MaxAgeSeconds>
  </CORSRule>
</CORSConfiguration>
```

#### Cấu hình gia tốc CDN

**Cấu hình chiến lược cache**:

```
Quy tắc mặc định toàn cầu:
├─ Khóa cache: Đường dẫn URL + giữ lại w, h, format tham số truy vấn
├─ TTL mặc định: 7 ngày
└─ Return to Origin HOST: Tự động theo

Phân chia chi tiết theo loại tệp:
├─ *.html:
│   ├─ TTL: 5 phút
│   └─ Ưu tiên đọc từ cache bộ nhớ
│
├─ *.js, *.css:
│   ├─ TTL: 1 năm
│   └─ Bỏ qua tham số truy vấn (vì tên tệp có hash)
│
├─ *.jpg, *.png, *.gif, *.webp:
│   ├─ TTL: 30 ngày
│   ├─ Giữ lại tham số truy vấn (w, h, format dùng cho cắt động)
│   └─ Bật tối ưu nén ảnh tự động
│
└─ /api/*:
    ├─ TTL: 0 (không cache)
    └─ Trả về nguồn trực tiếp
```

**Cấu hình tối ưu HTTPS**:

```
Cấu hình chứng chỉ:
├─ Loại chứng chỉ: Chứng chỉ tên miền wildcard *.myapp.com
├─ Cách triển khai: Tải lên bảng điều khiển CDN, tự động gia hạn
└─ Chứng chỉ sao lưu: Chứng chỉ EV cho tên miền chính (hiển thị thanh xanh)

Cấu hình TLS:
├─ Phiên bản TLS tối thiểu: 1.2 (cân bằng tương thích và bảo mật)
├─ Phiên bản TLS tối đa: 1.3
├─ Bộ mật mã: Chỉ bật các bộ mã hóa mạnh
├─ OCSP Stapling: Bật
├─ Tái sử dụng phiên TLS: Bật Session Ticket
└─ HSTS: Bật (max-age=31536000)

HTTP/2 và HTTP/3:
├─ HTTP/2: Bật (multiplexing, nén header)
├─ Đẩy máy chủ HTTP/2: Bật theo nhu cầu (gợi ý dùng Preload thay thế)
└─ HTTP/3 (QUIC): Bật (tính năng thử nghiệm, giải phóng dần)
```

### 7.4 Chiến lược kiểm soát chi phí

#### Phân tích thành phần chi phí

```
Cấu thành chi phí CDN + lưu trữ đối tượng hàng tháng:

Phần CDN:
├─ Chi phí lưu lượng hạ xuống (phần lớn nhất, khoảng 60%)
│   ├─ Đại lục Trung Quốc: 0.15-0.30 ￥/GB
│   ├─ Khu vực Châu Á Thái Bình Dương: 0.40-0.80 ￥/GB
│   └─ Châu Âu Mỹ: 0.30-0.60 ￥/GB
│
├─ Chi phí yêu cầu (phần nhỏ, khoảng 5%)
│   ├─ HTTP: 0.01-0.05 ￥/vạn lần
│   └─ HTTPS: 0.05-0.15 ￥/vạn lần (vì bắt tay TLS tiêu tốn tài nguyên)
│
├─ Chi phí đỉnh băng thông (phương thức tính phí tùy chọn)
│   └─ Tính phí 95 đỉnh: Phù hợp kịch bản lưu lượng biến động lớn
│
└─ Chi phí tính năng bổ sung (khoảng 5%)
    ├─ Quản lý chứng chỉ HTTPS
    ├─ Bảo vệ WAF
    ├─ Gửi nhật ký thực tế
    └─ Kịch bản edge/hàm

Phần lưu trữ đối tượng:
├─ Chi phí dung lượng lưu trữ (khoảng 15%)
│   ├─ Lưu trữ tiêu chuẩn: 0.12-0.15 ￥/GB/tháng
│   ├─ Lưu trữ tần suất thấp: 0.08-0.10 ￥/GB/tháng
│   └─ Lưu trữ archive: 0.03-0.05 ￥/GB/tháng
│
├─ Chi phí yêu cầu (khoảng 5%)
│   ├─ PUT: 0.01-0.05 ￥/vạn lần
│   └─ GET: 0.005-0.01 ￥/vạn lần
│
├─ Chi phí lấy dữ liệu (tần suất thấp/archive)
│   └─ Xóa sớm hoặc lấy mất chi phí bổ sung
│
└─ Chi phí lưu lượng trả về nguồn (khoảng 10%)
    └─ Chi phí lưu lượng trả về nguồn CDN đến lưu trữ đối tượng
```

#### Thủ thuật tiết kiệm tiền thực hành

**Thủ thuật 1：Phân cấp lưu trữ, quản lý vòng đời tự động**

```yaml
# Ví dụ quy tắc vòng đời
rules:
  - id: image-lifecycle
    prefix: uploads/
    transitions:
      # 7 ngày sau chuyển sang lưu trữ tần suất thấp, tiết kiệm 30% chi phí
      - days: 7
        storageClass: IA
      # 90 ngày sau chuyển sang lưu trữ archive, tiết kiệm 70% chi phí
      - days: 90
        storageClass: Archive
    # 3 năm sau xóa tự động
    expiration:
      days: 1095
```

**Thủ thuật 2：Tăng tỉ lệ trúng CDN, giảm trả về nguồn**

```
Tỉ lệ trúng từ 90% tăng lên 95% có nghĩa gì?

Giả sử:
- Lưu lượng hàng ngày: 10 TB
- Tỉ lệ trúng 90%: Trả về nguồn 1 TB
- Tỉ lệ trúng 95%: Trả về nguồn 0.5 TB

Tiết kiệm lưu lượng trả về nguồn: 0.5 TB/ngày × 0.15 ￥/GB × 30 ngày = 2250 ￥/tháng
```

**Thủ thuật 3：Nén và tối ưu định dạng**

```
Phương án tối ưu ảnh:
├─ Ảnh gốc lưu trữ tại lưu trữ đối tượng (không trực tiếp công khai)
├─ CDN bật tính năng xử lý ảnh:
│   ├─ Chuyển đổi định dạng tự động: JPEG → WebP/AVIF (tiết kiệm 30-50%)
│   ├─ Nén chất lượng tự động: Nén không mất hiển thị (tiết kiệm 20-40%)
│   ├─ Kích thước tự thích ứng: Trả về kích thước phù hợp theo thiết bị
│   └─ Tải dần dần: Trước mờ sau rõ
└─ Hiệu quả: Chi phí băng thông giảm 50-70%
```

**Thủ thuật 4：Đỉnh băng thông cấp và cảnh báo**

```yaml
# Cấu hình đỉnh băng thông
bandwidth_cap:
  daily_limit: 500 # Mbps, đỉnh hàng ngày vượt quá tắt CDN tự động
  monthly_limit: 10000 # GB, lưu lượng tháng vượt quá tắt CDN

  # Ngưỡng cảnh báo
  alerts:
    - threshold: 70% # Đạt 70% gửi cảnh báo
      channels: [sms, email]
    - threshold: 90% # Đạt 90% gọi điện thoại
      channels: [phone]
```

---

## 8. Tóm tắt: Quy tắc vàng của lưu trữ đối tượng + CDN

### 8.1 Nguyên tắc thiết kế kiến trúc

**Nguyên tắc 1：Phân chia động tĩnh**

```
Nội dung động (API, HTML) → Đi máy chủ nguồn hoặc hàm edge
Nội dung tĩnh (ảnh, JS, CSS, video) → Đi CDN + lưu trữ đối tượng
```

**Nguyên tắc 2：Phục vụ gần nhất**

```
Người dùng ở đâu, nội dung cache ở đó
→ Lựa chọn nhà cung cấp CDN phạm vi rộng
→ Bật điều phối DNS thông minh
→ Tải trước nội dung quan trọng trước
```

**Nguyên tắc 3：Phân tầng cache**

```
Cache cục bộ trình duyệt (mạnh nhất)
    ↓
Cache nút biên CDN (kế mạnh)
    ↓
Cache nút tầng trung gian/khu vực CDN (dự phòng)
    ↓
Lưu trữ đối tượng/máy chủ nguồn (phòng tuyến cuối cùng)
```

**Nguyên tắc 4：Cân bằng chi phí và trải nghiệm**

```
Phân cấp lưu trữ: Dữ liệu nóng lưu trữ tiêu chuẩn, dữ liệu lạnh lưu trữ archive
Chiến lược cache: Nội dung tần suất cao TTL dài, nội dung tần suất thấp TTL ngắn
Tối ưu nén: Định dạng WebP/AVIF, nén chất lượng thông minh
Giám sát cảnh báo: Đặt đỉnh băng thông, ngăn lưu lượng bất thường
```

### 8.2 Danh sách kiểm tra tránh cạm bẫy

**Đặt tên bucket và quyền hạn**

- [ ] Tên bucket toàn cầu duy nhất, tránh bị chiếm
- [ ] Tệp riêng tư không được đặt thành công khai đọc
- [ ] AccessKey ID và AccessKey Secret không được viết vào mã front-end, sử dụng thông tin tạm thời STS
- [ ] Bật mã hóa phía máy chủ (SSE) bảo vệ dữ liệu nhạy cảm

**Cấu hình cache CDN**

- [ ] TTL tệp HTML không nên quá dài (gợi ý < 5 phút)
- [ ] JS/CSS gợi ý dùng tên tệp có hash, TTL đặt 1 năm
- [ ] Khóa cache phải hợp lý, không nên để thông tin người dùng v.v. vào
- [ ] Cập nhật quan trọng sau nhớ làm mới cache hoặc tải trước

**Bảo mật HTTPS**

- [ ] Chứng chỉ không được hết hạn, đặt gia hạn tự động
- [ ] Phiên bản TLS tối thiểu gợi ý 1.2
- [ ] Bật HSTS ngăn chặn tấn công hạ cấp
- [ ] Cookie nhạy cảm đặt Secure và HttpOnly

**Kiểm soát chi phí**

- [ ] Bật cảnh báo đỉnh băng thông, ngăn lưu lượng bất thường
- [ ] Lưu trữ tần suất thấp/archive có thời gian lưu trữ tối thiểu và chi phí xóa sớm, chú ý quy tắc
- [ ] Chi phí lưu lượng trả về nguồn cũng rất đắt, cố gắng tăng tỉ lệ trúng CDN
- [ ] Phân tích nhật ký truy cập thường xuyên, dọn dẹp tài nguyên giả

---

## 9. Mẫu mã thực hành

### 9.1 Trực tiếp tải lên object storage giao diện trước (JavaScript)

```javascript
/**
 * Lớp công cụ tải lên trực tiếp object storage
 * Hỗ trợ: Alibaba Cloud OSS、Tencent Cloud COS、AWS S3
 */
class DirectUploader {
  constructor(config) {
    this.provider = config.provider // 'oss' | 'cos' | 's3'
    this.region = config.region
    this.bucket = config.bucket
    this.getCredentials = config.getCredentials // Hàm lấy thông tin tạm thời
  }

  /**
   * Lấy thông tin tạm thời STS
   */
  async fetchCredentials() {
    // Yêu cầu back-end xin thông tin tạm thời
    const credentials = await this.getCredentials()
    return {
      accessKeyId: credentials.accessKeyId,
      accessKeySecret: credentials.accessKeySecret,
      sessionToken: credentials.securityToken || credentials.sessionToken,
      expiration: credentials.expiration
    }
  }

  /**
   * Tạo chữ ký tải lên (phù hợp tính chữ ký phía client)
   */
  generateSignature(credentials, fileKey, fileType, options = {}) {
    const timestamp = new Date().toISOString()
    const date = timestamp.slice(0, 10).replace(/-/g, '')

    // Thuật toán chữ ký các nhà cung cấp dịch vụ khác nhau hơi khác
    switch (this.provider) {
      case 'oss':
        return this._ossSignature(credentials, fileKey, date, options)
      case 'cos':
        return this._cosSignature(credentials, fileKey, date, options)
      case 's3':
        return this._s3Signature(credentials, fileKey, date, options)
      default:
        throw new Error('Unknown provider')
    }
  }

  /**
   * Tải lên tệp đơn (tệp nhỏ < 100MB)
   */
  async upload(file, options = {}) {
    const credentials = await this.fetchCredentials()
    const fileKey = this._generateFileKey(file, options.directory)

    const formData = new FormData()

    // Xây dựng trường form (tên trường khác nhau giữa các nhà cung cấp)
    const formFields = this._buildFormFields(
      credentials,
      fileKey,
      file.type,
      options
    )
    Object.entries(formFields).forEach(([key, value]) => {
      formData.append(key, value)
    })

    formData.append('file', file)

    // Gửi yêu cầu tải lên
    const uploadUrl = this._getUploadUrl()
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
      // Nếu tải lên tệp lớn, có thể cần đặt timeout dài hơn
      signal: options.signal // Hỗ trợ AbortController hủy tải lên
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Upload failed: ${response.status} ${errorText}`)
    }

    return {
      url: this._getFileUrl(fileKey),
      key: fileKey,
      etag: response.headers.get('ETag'),
      size: file.size
    }
  }

  /**
   * Tải lên phân đoạn (tệp lớn > 100MB)
   */
  async multipartUpload(file, options = {}) {
    const partSize = options.partSize || 10 * 1024 * 1024 // Mặc định 10MB/đoạn
    const parallel = options.parallel || 3 // Mặc định 3 song song

    const credentials = await this.fetchCredentials()
    const fileKey = this._generateFileKey(file, options.directory)

    // 1. Khởi tạo tải lên phân đoạn
    const uploadId = await this._initMultipartUpload(
      credentials,
      fileKey,
      file.type
    )

    // 2. Tính toán phân đoạn
    const parts = []
    const totalParts = Math.ceil(file.size / partSize)
    for (let i = 0; i < totalParts; i++) {
      const start = i * partSize
      const end = Math.min(start + partSize, file.size)
      parts.push({
        number: i + 1,
        start,
        end,
        blob: file.slice(start, end)
      })
    }

    // 3. Tải lên phân đoạn (kiểm soát song song và tiếp tục từ nơi gián đoạn)
    const uploadedParts = []
    const failedParts = []

    // Hỗ trợ tiếp tục từ nơi gián đoạn: kiểm tra những phân đoạn nào đã tải
    if (options.resume) {
      const existingParts = await this._listParts(
        credentials,
        fileKey,
        uploadId
      )
      for (const part of existingParts) {
        uploadedParts.push(part)
      }
    }

    // Lọc ra những phân đoạn chưa tải
    const pendingParts = parts.filter(
      (p) => !uploadedParts.some((up) => up.partNumber === p.number)
    )

    // Tải lên song song
    const uploadPart = async (part) => {
      try {
        const etag = await this._uploadPart(
          credentials,
          fileKey,
          uploadId,
          part
        )
        return { partNumber: part.number, etag }
      } catch (error) {
        failedParts.push({ part, error })
        throw error
      }
    }

    // Sử dụng Promise.all kiểm soát song parallel
    const chunks = []
    for (let i = 0; i < pendingParts.length; i += parallel) {
      chunks.push(pendingParts.slice(i, i + parallel))
    }

    for (const chunk of chunks) {
      const results = await Promise.allSettled(chunk.map(uploadPart))
      for (const result of results) {
        if (result.status === 'fulfilled') {
          uploadedParts.push(result.value)
        }
      }
    }

    // Kiểm tra xem tất cả đoạn có tải thành công không
    if (uploadedParts.length !== totalParts) {
      throw new Error(
        `Upload incomplete: ${uploadedParts.length}/${totalParts} parts uploaded`
      )
    }

    // 4. Hoàn tất tải lên phân đoạn (hợp nhất đoạn)
    await this._completeMultipartUpload(
      credentials,
      fileKey,
      uploadId,
      uploadedParts
    )

    return {
      url: this._getFileUrl(fileKey),
      key: fileKey,
      size: file.size,
      parts: totalParts
    }
  }

  /**
   * Tạo đường dẫn lưu trữ tệp
   */
  _generateFileKey(file, directory = '') {
    const date = new Date()
    const datePath = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`
    const random = Math.random().toString(36).substring(2, 10)
    const ext = file.name.split('.').pop() || 'bin'
    const key = directory
      ? `${directory}/${datePath}/${random}.${ext}`
      : `${datePath}/${random}.${ext}`
    return key
  }

  // ============ Phương thức nhà cung cấp dịch vụ cụ thể ============

  _getUploadUrl() {
    switch (this.provider) {
      case 'oss':
        return `https://${this.bucket}.oss-${this.region}.aliyuncs.com`
      case 'cos':
        return `https://${this.bucket}.cos.${this.region}.myqcloud.com`
      case 's3':
        return `https://${this.bucket}.s3.${this.region}.amazonaws.com`
      default:
        throw new Error('Unknown provider')
    }
  }

  _getFileUrl(key) {
    return `https://${this.bucket}.${this.provider === 'oss' ? 'oss' : 'cos'}-${this.region}.${
      this.provider === 'oss'
        ? 'aliyuncs.com'
        : this.provider === 'cos'
          ? 'myqcloud.com'
          : 'amazonaws.com'
    }/${key}`
  }

  // Phương thức nhà cung cấp dịch vụ khác... (thực hiện theo nhu cầu thực tế)
  _buildFormFields(credentials, fileKey, fileType, options) {
    // Logic xây dựng trường form nhà cung cấp dịch vụ khác nhau
    // Cần thực hiện dựa trên tài liệu nhà cung cấp dịch vụ cụ thể
    return {}
  }

  async _initMultipartUpload(credentials, fileKey, fileType) {
    // Logic khởi tạo tải lên phân đoạn nhà cung cấp dịch vụ khác nhau
    return 'upload-id'
  }

  async _uploadPart(credentials, fileKey, uploadId, part) {
    // Logic tải lên phân đoạn nhà cung cấp dịch vụ khác nhau
    return 'etag'
  }

  async _completeMultipartUpload(credentials, fileKey, uploadId, parts) {
    // Logic hoàn tất tải lên phân đoạn nhà cung cấp dịch vụ khác nhau
  }

  async _listParts(credentials, fileKey, uploadId) {
    // Logic liệt kê phân đoạn đã tải nhà cung cấp dịch vụ khác nhau
    return []
  }
}

// Ví dụ sử dụng
const uploader = new DirectUploader({
  provider: 'oss',
  region: 'cn-beijing',
  bucket: 'myapp-images-prod',
  getCredentials: async () => {
    // Yêu cầu back-end xin thông tin tạm thời
    const res = await fetch('/api/upload/credentials')
    return res.json()
  }
})

// Tải lên tệp nhỏ
async function uploadAvatar(file) {
  try {
    const result = await uploader.upload(file, {
      directory: 'avatars',
      onProgress: (progress) => {
        console.log(`Tiến độ tải lên: ${progress.percent}%`)
      }
    })
    console.log('Tải lên thành công:', result.url)
    return result
  } catch (error) {
    console.error('Tải lên thất bại:', error)
    throw error
  }
}

// Tải lên phân đoạn tệp lớn
async function uploadVideo(file) {
  try {
    const result = await uploader.multipartUpload(file, {
      directory: 'videos',
      partSize: 10 * 1024 * 1024, // 10MB mỗi đoạn
      parallel: 3, // 3 song song
      resume: true, // Hỗ trợ tiếp tục từ nơi gián đoạn
      onProgress: (progress) => {
        console.log(
          `Tiến độ tải lên: ${progress.percent}%, đã tải ${progress.loaded}/${progress.total}`
        )
      },
      onPartComplete: (part) => {
        console.log(`Phân đoạn ${part.number} tải hoàn tất`)
      }
    })
    console.log('Tải lên thành công:', result.url)
    return result
  } catch (error) {
    console.error('Tải lên thất bại:', error)
    // Có thể thực hiện logic thử lại hoặc lưu thông tin điểm gián đoạn
    throw error
  }
}
```

### 9.2 Dịch vụ thông tin tạm thời back-end (Node.js/Express)

```javascript
/**
 * Dịch vụ thông tin tạm thời STS object storage
 * Hỗ trợ: Alibaba Cloud OSS、Tencent Cloud COS、AWS S3
 */
const express = require('express')
const STS = require('ali-oss').STS // Alibaba Cloud
// const COS = require('cos-nodejs-sdk-v5') // Tencent Cloud
const router = express.Router()

// Cấu hình
const config = {
  // Cấu hình Alibaba Cloud OSS
  oss: {
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    region: 'oss-cn-beijing',
    bucket: 'myapp-images-prod',
    // ARN vai trò STS (cần tạo trong bảng điều khiển RAM)
    roleArn: process.env.OSS_STS_ROLE_ARN
  }
}

/**
 * Lấy thông tin tạm thời STS (Alibaba Cloud OSS)
 * POST /api/upload/credentials
 */
router.post('/credentials', async (req, res) => {
  try {
    // 1. Xác thực danh tính người dùng (thực hiện theo tình huống thực tế)
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // 2. Tạo tiền tố đường dẫn tệp duy nhất (dùng cho cách ly quyền hạn)
    const date = new Date()
    const prefix = `uploads/${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${userId}/`

    // 3. Tạo client STS
    const sts = new STS({
      accessKeyId: config.oss.accessKeyId,
      accessKeySecret: config.oss.accessKeySecret
    })

    // 4. Yêu cầu thông tin tạm thời
    const result = await sts.assumeRole(
      config.oss.roleArn,
      {
        // Policy giới hạn phạm vi quyền hạn (nguyên tắc quyền hạn tối thiểu)
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'oss:PutObject',
              'oss:InitiateMultipartUpload',
              'oss:UploadPart',
              'oss:CompleteMultipartUpload',
              'oss:AbortMultipartUpload',
              'oss:ListParts'
            ],
            Resource: [`acs:oss:*:*:${config.oss.bucket}/${prefix}*`]
          }
        ],
        Version: '1'
      },
      3600, // Thông tin tạm thời hết hạn 1 giờ
      'web-upload-session-' + Date.now()
    )

    // 5. Trả về thông tin tạm thời và cấu hình
    res.json({
      success: true,
      data: {
        // Thông tin tạm thời STS
        credentials: {
          accessKeyId: result.credentials.AccessKeyId,
          accessKeySecret: result.credentials.AccessKeySecret,
          sessionToken: result.credentials.SecurityToken,
          expiration: result.credentials.Expiration
        },
        // Cấu hình tải lên
        config: {
          provider: 'oss',
          region: config.oss.region,
          bucket: config.oss.bucket,
          endpoint: `https://${config.oss.bucket}.${config.oss.region}.aliyuncs.com`,
          prefix: prefix, // Tiền tố đường dẫn tệp
          // Giới hạn bảo mật
          maxSize: 100 * 1024 * 1024, // Tối đa 100MB
          allowedTypes: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'video/mp4'
          ]
        }
      }
    })
  } catch (error) {
    console.error('Get credentials failed:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get upload credentials',
      message: error.message
    })
  }
})

/**
 * Thông báo hồi phục: Front-end thông báo back-end tải lên hoàn tất
 * POST /api/upload/callback
 */
router.post('/callback', async (req, res) => {
  try {
    const { key, etag, size, mimeType, originalName } = req.body
    const userId = req.user?.id

    // 1. Xác thực tệp có tồn tại không
    // 2. Lưu thông tin tệp vào cơ sở dữ liệu
    const fileRecord = await db.files.create({
      userId,
      key,
      etag,
      size,
      mimeType,
      originalName,
      url: `https://cdn.example.com/${key}`,
      createdAt: new Date()
    })

    // 3. Xử lý không đồng bộ: tạo ảnh thu nhỏ, trích xuất metadata, xét duyệt nội dung v.v.
    await processFileAsync(fileRecord)

    res.json({
      success: true,
      data: {
        fileId: fileRecord.id,
        url: fileRecord.url,
        size: fileRecord.size
      }
    })
  } catch (error) {
    console.error('Upload callback failed:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to process uploaded file'
    })
  }
})

module.exports = router
```

### 9.3 Chống đánh cắp liên kết và cấu hình bảo mật

```javascript
/**
 * Cấu hình chống đánh cắp liên kết và bảo mật CDN ví dụ
 */

// 1. Chống đánh cắp liên kết Referer (ngăn các trang web khác trực tiếp tham chiếu tài nguyên của bạn)
const refererConfig = {
  // Chế độ danh sách trắng: chỉ cho phép các Referer sau truy cập
  allowList: [
    '*.myapp.com', // Trang web chính
    '*.myapp.cn', // Trang web nước trong nước
    'localhost:*', // Phát triển cục bộ
    '127.0.0.1:*'
  ],

  // Chế độ danh sách đen (tùy chọn): cấm các Referer sau
  blockList: [
    '*.competitor.com', // Đối thủ cạnh tranh
    'spam-site.com'
  ],

  // Xử lý Referer trống: có cho phép truy cập trực tiếp (nhập URL trực tiếp)
  allowEmptyReferer: false // Môi trường sản xuất khuyên dùng false, môi trường test có thể true
}

// 2. Xác thực URL (chống đánh cắp liên kết an toàn hơn, có dấu thời gian và chữ ký)
class URLAuth {
  constructor(config) {
    this.key = config.key // Khóa xác thực, chỉ lưu trữ ở back-end
    this.expireTime = config.expireTime || 3600 // Mặc định 1 giờ hết hạn
  }

  /**
   * Tạo URL có xác thực
   * @param {string} url - URL gốc, chẳng hạn https://cdn.example.com/images/photo.jpg
   * @param {number} expireIn - Thời hạn hết hạn (giây)
   * @returns {string} URL có tham số xác thực
   */
  sign(url, expireIn = this.expireTime) {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const timestamp = Math.floor(Date.now() / 1000) + expireIn

    // Xây dựng chuỗi chữ ký (định dạng khác nhau giữa các nhà cung cấp, đây là ví dụ chung)
    const signStr = `${pathname}-${timestamp}-${this.key}`
    const signature = this._md5(signStr)

    // Thêm tham số xác thực
    urlObj.searchParams.set('sign', signature)
    urlObj.searchParams.set('t', timestamp.toString())

    return urlObj.toString()
  }

  /**
   * Xác thực chữ ký URL (sử dụng ở edge CDN hoặc máy chủ nguồn)
   */
  verify(url) {
    const urlObj = new URL(url)
    const signature = urlObj.searchParams.get('sign')
    const timestamp = parseInt(urlObj.searchParams.get('t'))
    const pathname = urlObj.pathname

    // Kiểm tra xem có hết hạn không
    if (timestamp < Math.floor(Date.now() / 1000)) {
      return { valid: false, error: 'URL expired' }
    }

    // Xác thực chữ ký
    const signStr = `${pathname}-${timestamp}-${this.key}`
    const expectedSign = this._md5(signStr)

    if (signature !== expectedSign) {
      return { valid: false, error: 'Invalid signature' }
    }

    return { valid: true }
  }

  _md5(str) {
    // Dự án thực tế sử dụng crypto-js hoặc thư viện MD5 khác
    // Đây chỉ là ví dụ
    return require('crypto').createHash('md5').update(str).digest('hex')
  }
}

// Ví dụ sử dụng
const auth = new URLAuth({
  key: 'your-secret-key-only-known-by-server',
  expireTime: 3600 // 1 giờ hết hạn
})

// Back-end tạo URL có chữ ký
const signedUrl = auth.sign(
  'https://cdn.example.com/private/document.pdf',
  7200
)
// Kết quả: https://cdn.example.com/private/document.pdf?sign=xxxxx&t=1699123456

// Edge CDN hoặc máy chủ nguồn xác thực
const result = auth.verify(signedUrl)
if (!result.valid) {
  // Trả về 403 Forbidden
}

// 3. Danh sách đen/trắng IP
const ipConfig = {
  // Chỉ cho phép IP cụ thể truy cập (phù hợp hệ thống nội bộ)
  whiteList: [
    '192.168.1.0/24', // Dải mạng nội bộ
    '10.0.0.0/8'
  ],

  // Cấm IP cụ thể truy cập (chặn người tấn công)
  blackList: ['1.2.3.4', '5.6.7.8']
}

// 4. Danh sách đen/trắng UA (User-Agent)
const uaConfig = {
  // Cấm bot/công cụ tải xuống
  blackList: [
    'Wget',
    'curl',
    'python-requests',
    'Scrapy',
    'AhrefsBot',
    'SemrushBot'
  ],

  // Chỉ cho phép trình duyệt truy cập (chế độ nghiêm ngặt)
  whiteList: [
    'Mozilla/*', // Trình duyệt hiện đại
    'AppleWebKit/*'
  ]
}
```

---

## 10. Bảng thuật ngữ đối chiếu

| Thuật ngữ tiếng Anh | Đối chiếu tiếng Việt | Giải thích |
| :------------------------- | :---------------- | :--------------------------------------------------------------------------------------------------- |
| **Object Storage** | Lưu trữ đối tượng | Kiến trúc lưu trữ dữ liệu quản lý dữ liệu dưới dạng đối tượng, chứ không phải cấu trúc phân cấp hệ thống tệp. Phù hợp lưu trữ ảnh, video, sao lưu v.v. dữ liệu phi cấu trúc. |
| **Bucket** | Thùng chứa | Thùng chứa cấp cao nhất trong lưu trữ đối tượng, dùng tổ chức và cách ly dữ liệu. Mỗi bucket có kiểm soát quyền hạn và cấu hình độc lập. |
| **Object** | Đối tượng/Tệp đối tượng | Đơn vị cơ bản của lưu trữ đối tượng, bao gồm dữ liệu tự thân, metadata (Metadata) và khóa toàn cầu duy nhất (Key). |
| **CDN** | Mạng phân phối nội dung | Content Delivery Network, bằng cách triển khai nút biên toàn cầu, cache nội dung trang web đến vị trí gần người dùng nhất, tăng tốc độ truy cập. |
| **Edge Node** | Nút biên | Máy chủ cache triển khai ở mọi nơi trong mạng lưới CDN, cung cấp trực tiếp dịch vụ truy cập nội dung cho người dùng. |
| **Origin** | Máy chủ nguồn | Máy chủ CDN trả về nguồn lấy nội dung, có thể là lưu trữ đối tượng, ECS hoặc máy chủ tự xây dựng. |
| **Cache Hit** | Trúng cache | Nội dung người dùng yêu cầu đã tồn tại tại nút biên CDN, trả về trực tiếp, không cần trả về nguồn. |
| **Cache Miss** | Không trúng cache | Nút biên không có nội dung yêu cầu, cần trả về nguồn lấy. |
| **Hit Ratio** | Tỉ lệ trúng | Tỉ lệ số lần trúng cache chiếm tổng số yêu cầu. Tỉ lệ trúng cao hơn, trả về nguồn ít hơn, chi phí thấp hơn. |
| **TTL** | Thời gian sống/Thời gian cache | Time To Live, thời gian nội dung hiệu lực trên nút CDN. Hết hạn cần trả về nguồn lấy lại. |
| **Back to Source** | Trả về nguồn | Quá trình nút biên CDN yêu cầu nội dung từ máy chủ nguồn. |
| **Purge/Refresh** | Làm mới cache | Buộc cache CDN hết hạn, lần yêu cầu tiếp theo trả về nguồn lấy nội dung mới. |
| **Preheat** | Tải trước | Trước khi phát hành chính thức, chủ động đẩy nội dung đến nút CDN, để người dùng truy cập lần đầu trúng cache. |
| **CORS** | Chia sẻ tài nguyên liên miền | Cross-Origin Resource Sharing, cơ chế bảo mật trình duyệt, kiểm soát truy cập tài nguyên giữa các miền khác nhau. |
| **Referer** | Trang nguồn | Trường header HTTP request, chỉ định yêu cầu từ trang nào liên kết đến. Dùng để chống đánh cắp liên kết. |
| **STS** | Dịch vụ mã bảo mật | Security Token Service, dịch vụ cấp thông tin tạm thời truy cập, dùng cho trường hợp tải lên trực tiếp giao diện trước v.v. |
| **Multipart Upload** | Tải lên phân đoạn | Chia tệp lớn thành nhiều đoạn nhỏ tải lên song parallel, hỗ trợ tiếp tục từ nơi gián đoạn, tăng hiệu suất tải lên và độ tin cậy. |
| **ETag** | Thẻ thực thể | HTTP response header, dùng xác định phiên bản cụ thể của tài nguyên, thường dùng để xác thực cache. |
| **S3 API** | Giao diện tương thích S3 | Tiêu chuẩn API lưu trữ đối tượng AWS S3, hầu hết nhà cung cấp dịch vụ điện toán đám mây đều tương thích giao diện này. |
| **Canonical Query String** | Chuỗi truy vấn quy chuẩn | Phần của chuỗi chữ ký, dùng tính toán chữ ký yêu cầu, đảm bảo yêu cầu không bị giả mạo. |

---

## Tóm tắt: Quy tắc vàng của lưu trữ đối tượng + CDN

1. **Tải lên đi tải lên trực tiếp**：Tệp lớn dùng phân đoạn, bảo mật dùng STS
2. **Cache chia tầng**: Trình duyệt -> CDN -> Máy chủ nguồn, cache từng tầng
3. **Phục vụ gần nhất**: DNS thông minh + phạm vi phủ nút toàn cầu
4. **Bảo mật không lơi lỏng**: HTTPS + chống đánh cắp liên kết + kiểm soát truy cập
5. **Giám sát chi phí**: Tỉ lệ trúng, băng thông, phân cấp lưu trữ, liên tục tối ưu

Kiến trúc này hỗ trợ phần lớn số lượng truy cập tài nguyên tĩnh của Internet, hiểu nó, bạn sẽ hiểu nền tảng tối ưu hiệu suất Web hiện đại.
