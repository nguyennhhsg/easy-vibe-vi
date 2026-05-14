# Lưu trữ tệp và Lưu trữ đối tượng

::: tip Lời nói đầu
**Người dùng tải lên một ảnh đại diện, bạn lưu nó vào thư mục `/uploads` trên máy chủ——rồi đĩa cứng server đầy, hoặc bạn thêm máy chủ thứ hai, người dùng phát hiện ảnh đại diện thỉnh thoảng biến mất.** Lưu trữ tệp có vẻ đơn giản, nhưng trong môi trường phân tán, nó là một vấn đề kiến trúc cần được xem xét kỹ lưỡng. Lưu trữ đối tượng chính là câu trả lời tiêu chuẩn để giải quyết vấn đề này trong thời đại Internet.
:::

**Bạn sẽ học được gì khi hoàn thành chương này?**

Sau khi hoàn thành chương này, bạn sẽ có được:

- **Nhận thức về loại lưu trữ**：Hiểu rõ sự khác biệt giữa lưu trữ khối, lưu trữ tệp, lưu trữ đối tượng và các trường hợp sử dụng phù hợp
- **Các khái niệm cốt lõi của lưu trữ đối tượng**：Nắm vững Bucket, Object, Key, Pre-signed URL và các khái niệm cốt lõi
- **Thiết kế phương án tải lên**：Biết cách lựa chọn giữa tải lên trực tiếp từ client vs chuyển tiếp qua server
- **Nguyên lý tăng tốc CDN**：Hiểu cách CDN tăng tốc phân phối tài nguyên tĩnh toàn cầu
- **Thực hành tốt nhất**：Nắm vững quy tắc đặt tên tệp, kiểm soát quyền truy cập, quản lý vòng đời

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|-------------------|
| **Chương 1** | So sánh loại lưu trữ | Lưu trữ khối, lưu trữ tệp, lưu trữ đối tượng |
| **Chương 2** | Các khái niệm cốt lõi của lưu trữ đối tượng | Bucket, Object, Key, Siêu dữ liệu |
| **Chương 3** | Phương án tải lên tệp | Tải lên trực tiếp từ client, Pre-signed URL |
| **Chương 4** | Tăng tốc CDN | Nút biên, chiến lược bộ nhớ đệm, nguồn gốc |
| **Chương 5** | Thực hành tốt nhất | Quy tắc đặt tên, quyền, vòng đời |

---

## 0. Toàn cảnh：Tại sao không thể lưu trữ tệp trên server cục bộ?

Khi mới bắt đầu dự án, việc lưu trữ tệp do người dùng tải lên trên thư mục cục bộ của máy chủ là cách trực quan nhất. Nhưng khi dự án phát triển, bạn sẽ gặp phải một loạt vấn đề:

- **Không gian đĩa hạn chế**：Đĩa server luôn đầy, mở rộng rất phiền phức
- **Nhiều server không chia sẻ**：Sau khi cân bằng tải, yêu cầu của người dùng có thể được định tuyến đến các server khác nhau, không thể tìm thấy tệp
- **Không có bản sao lưu**：Nếu server bị sập, tệp sẽ mất
- **Không có CDN**：Người dùng trên toàn cầu truy cập cùng một server, tốc độ chậm

::: tip Giá trị cốt lõi của lưu trữ đối tượng
Lưu trữ đối tượng (như AWS S3, Aliyun OSS) giải quyết tất cả các vấn đề này: **dung lượng vô hạn, có thể truy cập toàn cầu, sao lưu tự động, hỗ trợ CDN một cách tự nhiên**. Nó đã trở thành tiêu chuẩn thực tế cho lưu trữ tệp của ứng dụng Internet.
:::

---

## 1. So sánh loại lưu trữ：khối, tệp, đối tượng

Thế giới máy tính có ba cách lưu trữ chính, chúng giải quyết các vấn đề ở các cấp độ khác nhau.

<FileStorageTypeDemo />

| Khía cạnh | Lưu trữ khối | Lưu trữ tệp | Lưu trữ đối tượng |
|----------|-------------|-----------|-------------------|
| Đơn vị dữ liệu | Khối có kích thước cố định | Tệp + Thư mục | Đối tượng (Key-Value) |
| Giao thức truy cập | iSCSI/FC | NFS/SMB | HTTP REST API |
| Hiệu suất | Cao nhất (mức mili giây) | Trung bình | Khá thấp (nhưng đủ dùng) |
| Khả năng mở rộng | Hạn chế | Trung bình | Gần như vô hạn |
| Chi phí | Cao nhất | Trung bình | Thấp nhất |
| Trường hợp sử dụng điển hình | Cơ sở dữ liệu | Chia sẻ tệp | Ảnh/Video/Bản sao lưu |

::: tip Cách ghi nhớ đơn giản
- **Lưu trữ khối** giống như ổ cứng——sử dụng cho cơ sở dữ liệu
- **Lưu trữ tệp** giống như thư mục chia sẻ trên mạng——sử dụng cho các máy chủ chia sẻ cấu hình
- **Lưu trữ đối tượng** giống như cloud storage——sử dụng cho ảnh, video do người dùng tải lên
:::

---

## 2. Các khái niệm cốt lõi của lưu trữ đối tượng

Mô hình dữ liệu của lưu trữ đối tượng rất đơn giản: **Bucket（Bucket）** là container, **Object（Đối tượng）** là tệp, mỗi đối tượng được xác định bằng **Key（Khóa）** duy nhất.

```
my-app-bucket/                    ← Bucket（Bucket）
├── avatars/user-123.jpg          ← Object Key
├── avatars/user-456.png          ← Object Key
├── reports/2024/q1-report.pdf    ← Object Key（"Thư mục" chỉ là tiền tố của Key）
└── uploads/temp/file.zip         ← Object Key
```

| Khái niệm | Giải thích | Ví dụ |
|----------|-----------|-------|
| Bucket | Container lưu trữ, đặt tên duy nhất toàn cầu | `my-app-prod`、`company-assets` |
| Object | Phần thân tệp được lưu trữ + siêu dữ liệu | Một ảnh, một PDF |
| Key | Định danh duy nhất của đối tượng | `avatars/user-123.jpg` |
| Siêu dữ liệu | Thông tin bổ sung của đối tượng | Content-Type, thẻ tùy chỉnh |
| ACL | Danh sách kiểm soát truy cập | public-read、private |
| Pre-signed URL | Liên kết truy cập được ủy quyền tạm thời | Liên kết tải lên/tải xuống có hiệu lực 15 phút |

::: tip Lưu trữ đối tượng không có "thư mục" thực sự
`avatars/user-123.jpg` trong `avatars/` không phải là thư mục, chỉ là tiền tố của Key. Lưu trữ đối tượng là cấu trúc phẳng, tất cả các đối tượng nằm trong cùng một cấp. "Thư mục" được hiển thị trên bảng điều khiển chỉ là hiệu ứng trực quan theo tiền tố nhóm.
:::

---

## 3. Phương án tải lên tệp：Ai tải lên tệp?

Tải lên tệp có hai phương án chính: chuyển tiếp qua server và tải lên trực tiếp từ client. Đối với hầu hết các trường hợp, **tải lên trực tiếp từ client** là lựa chọn tốt hơn.

<FileUploadFlowDemo />

::: tip Lợi thế của tải lên trực tiếp từ client
1. **Tiết kiệm băng thông server**：Tệp không đi qua server của bạn, đi trực tiếp đến OSS
2. **Tránh hết thời gian chờ**：Tải lên tệp lớn sẽ không kích hoạt giới hạn thời gian chờ của Nginx/gateway
3. **Giảm tải server**：Server chỉ cần ký các thông tin xác thực, không cần xử lý luồng tệp
4. **Hỗ trợ tải lên tiếp tục**：OSS hỗ trợ tải lên theo từng phần một cách tự nhiên, frontend có thể thực hiện tải lên tiếp tục

Các bước thực hiện: frontend yêu cầu backend lấy Pre-signed URL → frontend tải lên trực tiếp đến OSS bằng URL này → OSS gọi lại thông báo backend
:::

---

## 4. Tăng tốc CDN：Giúp tất cả người dùng toàn cầu được nhanh

Khi người dùng của bạn phân tán trên toàn cầu, tải xuống tệp từ một nguồn duy nhất sẽ rất chậm. CDN (Content Delivery Network) bằng cách triển khai các nút biên trên toàn cầu, lưu trữ tệp vào các nút gần nhất với người dùng, giảm đáng kể độ trễ truy cập.

<CDNAccelerationDemo />

| Khái niệm CDN | Giải thích |
|---------------|-----------|
| Nút biên | Máy chủ bộ nhớ đệm được triển khai ở các địa điểm trên toàn cầu |
| Nguồn gốc | Khi nút biên không có bộ nhớ đệm, yêu cầu tệp từ nguồn |
| Tỷ lệ nhất trúng bộ nhớ đệm | Tỷ lệ yêu cầu được nút biên phản hồi trực tiếp, càng cao càng tốt |
| TTL | Thời hạn có hiệu lực của bộ nhớ đệm, sau đó cần yêu cầu lại từ nguồn |
| Làm tươi bộ nhớ đệm | Xóa bộ nhớ đệm trên nút biên một cách chủ động, để tệp mới có hiệu lực |

::: tip Thực hành tốt nhất CDN
- **Tên tệp có hash**：`logo.a3f2b1.png` thay vì `logo.png`, như vậy khi cập nhật tệp không cần làm tươi bộ nhớ đệm
- **Đặt TTL hợp lý**：Tài nguyên tĩnh (JS/CSS/Ảnh) đặt TTL dài (1 năm), HTML đặt TTL ngắn (5 phút)
- **Bật nén Gzip/Brotli**：Tài nguyên dạng văn bản sau nén giảm 60-80% kích thước
:::

---

## 5. Thực hành tốt nhất

| Thực hành | Giải thích | Ví dụ |
|----------|-----------|--------|
| Quy tắc đặt tên Key | Sử dụng tiền tố có ý nghĩa để tổ chức tệp | `{type}/{date}/{uuid}.{ext}` |
| Tránh Key nóng | Không sử dụng số tăng dần ở đầu | Sử dụng tiền tố UUID hoặc hash |
| Quyền tối thiểu hóa | Bucket mặc định private | Chỉ đặt public-read cho tệp cần công khai |
| Quy tắc vòng đời | Tự động xóa tệp hết hạn | Tệp tạm thời tự động xóa sau 7 ngày |
| Cấu hình CORS | Tải lên trực tiếp từ client cần cấu hình CORS | Cho phép domain của bạn PUT/POST |
| Mã hóa phía server | Tệp nhạy cảm bật SSE | SSE-S3 hoặc SSE-KMS |

---

## Tóm tắt

Lưu trữ tệp là vấn đề cơ bản mà mỗi ứng dụng Web sẽ gặp phải. Lưu trữ đối tượng với đặc điểm dung lượng vô hạn, chi phí thấp, tính khả dụng cao, đã trở thành lựa chọn tiêu chuẩn cho ứng dụng Internet.

Ôn lại các điểm chính của chương này:

1. **Ba loại lưu trữ**：Lưu trữ khối cho cơ sở dữ liệu, lưu trữ tệp cho chia sẻ, lưu trữ đối tượng cho tệp do người dùng tải lên
2. **Mô hình lưu trữ đối tượng**：Bucket + Key + Object, cấu trúc phẳng, truy cập qua HTTP API
3. **Tải lên trực tiếp từ client**：Phương án Pre-signed URL, tệp không đi qua server, hiệu quả tiết kiệm tài nguyên
4. **Tăng tốc CDN**：Lưu trữ đệm nút biên + hash tên tệp, giúp tất cả người dùng toàn cầu được nhanh
5. **Bảo mật và quản lý**：Quyền tối thiểu hóa, quy tắc vòng đời, mã hóa phía server

## Đọc thêm

- [AWS S3 Developer Guide](https://docs.aws.amazon.com/s3/) - Tài liệu tiêu chuẩn của lưu trữ đối tượng
- [Aliyun OSS Best Practices](https://help.aliyun.com/document_detail/31853.html) - Lưu trữ đối tượng được sử dụng phổ biến nhất trong nước
- [MinIO Documentation](https://min.io/docs/minio/linux/index.html) - Lưu trữ đối tượng tương thích S3 mã nguồn mở
- [Cloudflare R2](https://developers.cloudflare.com/r2/) - Lưu trữ đối tượng không có phí đầu ra
- [Pre-signed URL Chi tiết](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html) - Cơ chế cốt lõi của tải lên trực tiếp từ client
