# Cơ sở hạ tầng dưới dạng mã

::: tip Lời mở đầu
**Bạn có bao giờ trải qua cơn ác mộng: máy chủ trực tuyến bị sập, nhưng không ai nhớ nó được cấu hình như thế nào?** Đăng nhập thủ công vào máy chủ, gõ lệnh dựa vào trí nhớ, cầu nguyện không gõ sai — đó là công việc hằng ngày của vận hành truyền thống. Cơ sở hạ tầng dưới dạng mã (Infrastructure as Code, IaC) đã thay đổi hoàn toàn tình hình này: sử dụng mã để xác định và quản lý cơ sở hạ tầng, cho phép cấu hình máy chủ giống như phần mềm — có thể kiểm soát phiên bản, có thể tái hiện, có thể kiểm toán.
:::

**Bài viết này sẽ dạy bạn những gì?**

Sau khi hoàn thành chương này, bạn sẽ có được:

- **Khái niệm cốt lõi**: Hiểu IaC là gì, tại sao nó là nền tảng của vận hành hiện đại
- **Nhận thức quy trình làm việc**: Nắm vững quy trình bốn giai đoạn của Terraform: Write → Plan → Apply → Destroy
- **Lựa chọn công cụ**: Tìm hiểu những ưu điểm và nhược điểm của các công cụ chính như Terraform, Pulumi, CloudFormation
- **Ý thức về rủi ro**: Hiểu rõ nguy hại của sai lệch cấu hình và phương pháp phát hiện
- **Thực hành tốt nhất**: Nắm vững phương pháp quản lý kỹ thuật của dự án IaC

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|----------|------------------|
| **Chương 1** | Khái niệm IaC | Vận hành thủ công vs Quản lý mã hóa |
| **Chương 2** | Quy trình làm việc Terraform | Write → Plan → Apply |
| **Chương 3** | So sánh công cụ | Terraform, Pulumi, CDK |
| **Chương 4** | Sai lệch cấu hình | Phát hiện, Phòng chống, Sửa chữa |
| **Chương 5** | Thực hành tốt nhất | Mô-đun hóa, Quản lý trạng thái, CI/CD |

---

## 0. Toàn cảnh: Tại sao cơ sở hạ tầng cũng cần "mã nguồn"?

Hãy tưởng tượng bạn là một đầu bếp. Nếu mỗi món ăn đều được làm dựa vào cảm giác, hôm nay thêm một muỗng muối, ngày mai thêm hai muỗng, hương vị sẽ không bao giờ ổn định. Nhưng nếu bạn viết công thức — chính xác đến từng gram của mỗi gia vị — bất kỳ ai cũng có thể tái hiện cùng một hương vị.

Quản lý cơ sở hạ tầng phải đối mặt với vấn đề tương tự. Cấu hình của một máy chủ có thể liên quan đến hệ điều hành, quy tắc mạng, nhóm bảo mật, khối lưu trữ, biến môi trường và hàng chục tham số khác. Cấu hình thủ công không chỉ dễ mắc lỗi, mà còn **không thể tái hiện, không thể kiểm toán, không thể quay lại**.

::: tip Giá trị cốt lõi của IaC
- **Có thể tái hiện**: Cùng một đoạn mã, bất kể thực thi bao nhiêu lần, kết quả đều giống nhau (tính lũy đẳng)
- **Có thể kiểm soát phiên bản**: Thay đổi cơ sở hạ tầng được quản lý thông qua Git, ai thay đổi cái gì, tại sao thay đổi, tất cả đều rõ ràng
- **Có thể kiểm toán**: Tất cả các thay đổi đều được ghi lại, đáp ứng yêu cầu tuân thủ
- **Có thể tự động hóa**: Triển khai tự động thông qua quy trình CI/CD, loại bỏ rủi ro hoạt động thủ công
- **Có thể cộng tác**: Các thành viên nhóm xem xét các thay đổi cơ sở hạ tầng thông qua Pull Request, giống như xem xét mã
:::

---

## 1. Khái niệm IaC: Từ "nhấp chuột thủ công" đến "khai báo mã"

Cách làm việc của vận hành truyền thống là: đăng nhập vào bảng điều khiển nền tảng đám mây, nhấp chuột thủ công để tạo máy chủ, cấu hình mạng, đặt nhóm bảo mật. Cách làm này có thể chịu được khi quản lý một vài máy chủ, nhưng khi quy mô mở rộng đến hàng chục, hàng trăm máy, nó sẽ trở thành cơn ác mộng.

Ý tưởng cốt lõi của IaC là: **sử dụng mã khai báo mô tả trạng thái cơ sở hạ tầng mà bạn muốn, để công cụ tự động giúp bạn thực hiện**. Bạn không cần bảo công cụ "trước tiên tạo VPC, rồi tạo subnet, rồi tạo nhóm bảo mật" (mệnh lệnh), chỉ cần nói "tôi muốn một môi trường mạng như vậy" (khai báo), công cụ sẽ tự động tính toán các bước cần thực thi.

<IaCConceptDemo />

| Khía cạnh | Vận hành thủ công | Cơ sở hạ tầng dưới dạng mã |
|----------|-----------------|------------------------|
| Cách hoạt động | Đăng nhập bảng điều khiển nhấp chuột | Viết tập tin mã |
| Tính tái hiện | Phụ thuộc vào tài liệu và trí nhớ | Mã là tài liệu, 100% tái hiện được |
| Theo dõi thay đổi | Không có ghi chép hoặc ghi chép không đầy đủ | Kiểm soát phiên bản Git, lịch sử đầy đủ |
| Cách cộng tác | Giao tiếp bằng lời nói, chuyển tài liệu | Xem xét Pull Request |
| Khả năng quay lại | Hoạt động ngược lại thủ công | git revert + apply lại |
| Tính nhất quán | Sự khác biệt lớn giữa các môi trường | Phát triển/kiểm tra/sản xuất hoàn toàn giống nhau |

::: tip Khai báo vs Mệnh lệnh
- **Khai báo (Declarative)**: Mô tả "tôi muốn gì", công cụ tự động tính toán "cách làm". Terraform, CloudFormation sử dụng phương pháp này. Ưu điểm là tính lũy đẳng tốt, nhược điểm là tính linh hoạt bị hạn chế.
- **Mệnh lệnh (Imperative)**: Mô tả "cách làm", thực thi từng bước. Ansible, Shell script sử dụng phương pháp này. Ưu điểm là linh hoạt, nhược điểm là khó đảm bảo tính lũy đẳng.
- **Hỗn hợp**: Pulumi, AWS CDK sử dụng ngôn ngữ lập trình phổ quát để viết, kết hợp quản lý trạng thái khai báo và tính linh hoạt mệnh lệnh.
:::

---

## 2. Quy trình làm việc Terraform: Write → Plan → Apply

Terraform là công cụ IaC phổ biến nhất hiện nay, được phát triển bởi HashiCorp. Quy trình làm việc của nó rõ ràng và trực quan, chia thành bốn giai đoạn, giống như "mã hóa → xem xét → triển khai → dọn dẹp" của phát triển phần mềm.

<TerraformWorkflowDemo />

::: tip Quy trình bốn giai đoạn
1. **Write (Viết)**: Sử dụng HCL (HashiCorp Configuration Language) để viết tập tin định nghĩa cơ sở hạ tầng (.tf). Khai báo các tài nguyên bạn cần: máy chủ, cơ sở dữ liệu, mạng, v.v.
2. **Plan (Lập kế hoạch)**: Chạy `terraform plan`, Terraform sẽ so sánh trạng thái hiện tại và trạng thái mục tiêu, tạo ra "kế hoạch thực thi" — cho bạn biết nó định tạo, sửa đổi, xóa những tài nguyên nào. Đây là lưới an toàn, cho phép bạn xác nhận các thay đổi trước khi thực sự thực thi.
3. **Apply (Thực thi)**: Sau khi xác nhận kế hoạch không có vấn đề, chạy `terraform apply`, Terraform sẽ tạo hoặc sửa đổi tài nguyên theo kế hoạch. Sau khi thực thi, trạng thái hiện tại sẽ được lưu vào tập tin trạng thái (terraform.tfstate).
4. **Destroy (Phá hủy)**: Khi không cần nữa, chạy `terraform destroy` để dọn dẹp tất cả tài nguyên, tránh tạo chi phí không cần thiết.
:::

| Lệnh | Chức năng | Có sửa đổi cơ sở hạ tầng | Trường hợp sử dụng |
|-----|----------|----------------------|------------------|
| `terraform init` | Khởi tạo dự án, tải Provider | Không | Lần đầu sử dụng hoặc thêm Provider mới |
| `terraform plan` | Xem trước thay đổi, tạo kế hoạch thực thi | Không | Phải thực thi trước mỗi thay đổi |
| `terraform apply` | Thực thi thay đổi, tạo/sửa đổi tài nguyên | Có | Thực thi sau khi xác nhận plan |
| `terraform destroy` | Phá hủy tất cả tài nguyên | Có | Dọn dẹp môi trường kiểm tra, ngừng dịch vụ |
| `terraform state` | Xem/quản lý tập tin trạng thái | Tùy thuộc vào hoạt động | Di chuyển trạng thái, nhập tài nguyên |

---

## 3. So sánh công cụ: Chọn công cụ IaC phù hợp với bạn

Lĩnh vực IaC có nhiều công cụ khác nhau, mỗi công cụ có những ưu tiên riêng. Khi lựa chọn công cụ, cần xem xét ngôn ngữ lập trình của nhóm, nền tảng đám mây, quy mô dự án, v.v. Không có "công cụ tốt nhất", chỉ có công cụ phù hợp nhất với tình huống của bạn.

<IaCToolComparisonDemo />

| Công cụ | Ngôn ngữ | Hỗ trợ nền tảng đám mây | Đường cong học tập | Trường hợp áp dụng |
|--------|----------|---------------------|------------------|------------------|
| Terraform | HCL | Đa nền tảng (AWS/Azure/GCP) | Trung bình | Môi trường đa nền tảng, cộng tác nhóm |
| Pulumi | Python/TS/Go | Đa nền tảng | Thấp (quen thuộc ngôn ngữ lập trình) | Thân thiện với nhà phát triển, logic phức tạp |
| AWS CloudFormation | JSON/YAML | Chỉ AWS | Trung bình | Môi trường AWS thuần túy |
| AWS CDK | Python/TS/Java | Chỉ AWS | Thấp | AWS + sở thích ngôn ngữ lập trình |
| Ansible | YAML | Đa nền tảng + máy trần | Thấp | Quản lý cấu hình, môi trường hỗn hợp |

::: tip Cách lựa chọn?
- **Nhóm khởi nghiệp / Nền tảng duy nhất**: CloudFormation (AWS) hoặc công cụ gốc của nền tảng đám mây tương ứng, tích hợp hệ sinh thái tốt nhất
- **Đa nền tảng / Nhóm vừa và lớn**: Terraform, cộng đồng lớn nhất, Provider phong phú nhất, tuyển dụng dễ nhất
- **Nhóm do nhà phát triển dẫn đầu**: Pulumi hoặc CDK, viết cơ sở hạ tầng bằng ngôn ngữ lập trình quen thuộc, hỗ trợ IDE tốt
- **Cần quản lý cấu hình**: Ansible, chuyên về cấu hình bên trong máy chủ (cài đặt phần mềm, sửa đổi tập tin cấu hình)
:::

---

## 4. Sai lệch cấu hình: Quả bom hẹn giờ âm thầm

Sai lệch cấu hình (Configuration Drift) là kẻ thù ẩn giấu nhất trong thực hành IaC. Nó chỉ **sự chênh lệch dần dần giữa trạng thái cơ sở hạ tầng thực tế và trạng thái được định nghĩa trong mã**.

Sự chênh lệch này thường được tạo ra như thế nào? Có người để "sửa chữa nhanh" một vấn đề trực tuyến, đã đăng nhập trực tiếp vào bảng điều khiển và sửa đổi quy tắc nhóm bảo mật; có người để gỡ lỗi, tạm thời tăng cấu hình của máy chủ nhất định nhưng quên thay đổi lại. Những "sửa đổi nhỏ" này tích lũy theo thời gian, cuối cùng dẫn đến mã và môi trường thực tế bị tách rời nghiêm trọng.

<ConfigDriftDemo />

::: tip Nguy hại của sai lệch cấu hình
1. **Không thể tái hiện**: Môi trường được mô tả bởi mã và môi trường thực tế không nhất quán, tạo môi trường mới sẽ có vấn đề
2. **Quay lại thất bại**: Nghĩ rằng quay lại phiên bản trước sẽ phục hồi, nhưng môi trường thực tế đã bị sửa đổi thủ công
3. **Lỗ hổng bảo mật**: Các cổng được mở hoặc quyền được nới lỏng thủ công có thể bị quên lãng, trở thành lỗ hổng tấn công
4. **Kiểm toán thất bại**: Kiểm toán tuân thủ dựa trên mã, nhưng mã không phản ánh trạng thái thực tế
:::

| Biện pháp phòng chống | Mô tả |
|-------------------|------|
| Cấm thay đổi thủ công | Hạn chế quyền hoạt động bảng điều khiển thông qua chính sách IAM |
| Phát hiện sai lệch định kỳ | Chạy `terraform plan` định kỳ để kiểm tra sự khác biệt |
| Sửa chữa tự động | Phát hiện sai lệch sau đó tự động thực thi apply để khôi phục nhất quán |
| Kiểm toán thay đổi | Bật nhật ký kiểm toán như CloudTrail để theo dõi nguồn gốc tất cả các thay đổi |

---

## 5. Thực hành tốt nhất: Cho phép dự án IaC phát triển bền vững

Mã IaC giống như mã ứng dụng, cần có những thực hành kỹ thuật tốt để đảm bảo tính bảo trì. Khi quy mô cơ sở hạ tầng tăng lên, mã IaC không có quy định sẽ trở thành một hình thức "nợ kỹ thuật" khác.

<IaCBestPracticeDemo />

::: tip Sáu thực hành cốt lõi tốt nhất
1. **Mô-đun hóa**: Trích xuất cơ sở hạ tầng có thể tái sử dụng thành các mô-đun (chẳng hạn như mô-đun VPC, mô-đun cơ sở dữ liệu), tránh sao chép dán. Giống như viết hàm, định nghĩa một lần, sử dụng nhiều lần.
2. **Cách ly môi trường**: Phát triển, kiểm tra, sản xuất sử dụng các tập tin trạng thái và tập tin biến riêng biệt, cách ly thông qua workspace hoặc cấu trúc thư mục.
3. **Quản lý trạng thái từ xa**: Tập tin trạng thái (tfstate) được lưu trữ ở back-end từ xa (S3 + DynamoDB), hỗ trợ cộng tác nhóm và khóa trạng thái, tránh xung đột đồng thời.
4. **Quản lý thông tin nhạy cảm**: Mật khẩu, khóa và thông tin nhạy cảm khác không được viết trong mã, sử dụng các công cụ như Vault, AWS Secrets Manager để quản lý.
5. **Tích hợp CI/CD**: Tích hợp terraform plan vào quy trình PR, apply được thực thi tự động thông qua quy trình, từ bỏ hoạt động thủ công cục bộ.
6. **Xem xét mã**: Các thay đổi cơ sở hạ tầng cần xem xét mã giống như mã ứng dụng, đặc biệt là các thay đổi liên quan đến nhóm bảo mật, chính sách IAM.
:::

---

## Tóm tắt

Cơ sở hạ tầng dưới dạng mã là nền tảng của vận hành cloud-native hiện đại. Nó biến "hoạt động thủ công không thể mô tả" thành "mã có thể kiểm soát phiên bản", cho phép quản lý cơ sở hạ tầng từ "nghệ thuật" chuyển thành "kỹ thuật".

Nhớ lại các điểm chính của chương:

1. **Bản chất của IaC**: Sử dụng mã khai báo trạng thái mong muốn của cơ sở hạ tầng, để công cụ tự động thực hiện
2. **Quy trình làm việc Terraform**: Write → Plan → Apply ba bước, Plan là lưới an toàn
3. **Lựa chọn công cụ**: Chọn Terraform cho đa nền tảng, công cụ gốc cho nền tảng duy nhất, Pulumi cho nhóm nhà phát triển
4. **Sai lệch cấu hình**: Rủi ro ẩn giấu nhất, cần bảo vệ kép thông qua quy trình và công cụ
5. **Quản lý kỹ thuật**: Mô-đun hóa, cách ly môi trường, quản lý trạng thái từ xa, tích hợp CI/CD không thể thiếu

## Đọc thêm

- [Hướng dẫn chính thức Terraform](https://developer.hashicorp.com/terraform/tutorials) - Học Terraform từ đầu
- [Tài liệu Pulumi](https://www.pulumi.com/docs/) - Viết cơ sở hạ tầng bằng ngôn ngữ lập trình
- [Hội thảo AWS CDK](https://cdkworkshop.com/) - Hướng dẫn thực hành AWS CDK
- [Infrastructure as Code (O'Reilly)](https://www.oreilly.com/library/view/infrastructure-as-code/9781098114664/) - Sách kinh điển trong lĩnh vực IaC
- [Blog Spacelift](https://spacelift.io/blog) - Các thực hành tốt nhất IaC và xu hướng ngành
