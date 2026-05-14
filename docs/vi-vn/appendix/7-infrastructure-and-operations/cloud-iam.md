# Quản lý Danh tính và Quyền hạn Trên Đám mây
> **Hướng dẫn học tập**: Kỹ thuật viết prompt giải quyết vấn đề "làm sao nói rõ ràng", quản lý quyền hạn tài khoản đám mây giải quyết vấn đề "ai được làm gì". Chương này sẽ xoay quanh một câu hỏi: **Trong thế giới đám mây, làm sao vừa có thể cấp quyền dễ dàng, vừa không đưa chìa khóa cho những người không nên có?**

Trước khi bắt đầu, bạn nên bổ sung hai "viên gạch nền tảng":

- **Token là gì**: Bạn có thể đọc phần 「Tokenization & Token」 của [Giới thiệu Mô hình Ngôn ngữ Lớn](./llm-intro.md).
- **Prompt là gì**: Nếu bạn chưa quen với cấu trúc cơ bản của System / User / Assistant, hãy xem [Kỹ thuật viết Prompt](./prompt-engineering/).

---

## 0. Mở đầu: Tại sao vừa lên đám mây đã gặp sự cố?

<IamRamComparisonDemo />

Nhiều người khi bắt đầu sử dụng dịch vụ đám mây đều gặp phải tình huống tương tự:

- Để tiện, họ trực tiếp viết AccessKey vào code rồi commit lên GitHub;
- Cấp quyền "quản trị viên" cho tất cả nhân viên, kết quả có người xóa nhầm database production;
- Sau khi bàn giao dự án, không biết ai tay còn giữ tài khoản/mật khẩu nhân viên cũ;
- Nghe nói phải bật MFA, nhưng thấy "phức tạp" nên lãng quên không bật.

Trực giác chúng ta sẽ nghĩ: **"Những nhân viên này không có ý thức bảo mật"**.

Nhưng phần lớn thời gian, vấn đề không nằm ở con người, mà ở **chưa xây dựng được hệ thống quản lý quyền hạn đúng đắn**.

<IntroProblemReasonSolution />

Đối mặt với những thách thức này, chỉ dựa vào "cẩn thận khi thao tác" là không đủ. Chúng ta cần một phương pháp quản lý quyền hạn có hệ thống, đây chính là vấn đề mà **IAM (Identity and Access Management, Quản lý Danh tính và Quyền hạn)** cố gắng giải quyết.

---

## 1. IAM/RAM là gì? Bắt đầu từ "hệ thống kiểm soát truy cập"

### 1.1 Sự tương tự: Hệ thống kiểm soát truy cập thông minh của công ty

Hãy tưởng tượng công ty bạn chuyển vào một tòa nhà văn phòng mới:

| Tình huống         | Cách làm mà không có IAM           | Cách làm khi có IAM                             |
| :----------------- | :--------------------------------- | :---------------------------------------------- |
| Nhân viên mới vào  | Cấp cho anh ta một chìa khóa chủ   | Cấp thẻ kiểm soát, chỉ mở được cửa khu vực anh |
| Nhân viên nghỉ việc | Chìa khóa mất, không biết ai còn giữ | Vô hiệu hóa thẻ ngay, tất cả cửa đều không mở |
| Nhân viên ngoài    | Cho mượn chìa khóa vài ngày        | Cấp thẻ tạm thời, tự động hết hiệu lực sau 3 ngày |
| Khách              | Lễ tân cấp chìa khóa               | Cấp mã khách một lần, chỉ vào được phòng họp   |

**IAM (Identity and Access Management, Quản lý Danh tính và Quyền hạn)**, giống như "hệ thống kiểm soát truy cập thông minh" này:

- **Danh tính (Identity)**: Ai? Nhân viên, ngoài, khách, ứng dụng
- **Quyền hạn (Access)**: Được vào những cửa nào? Được làm gì?
- **Quản lý (Management)**: Làm sao cấp chìa khóa, thu hồi, kiểm tra hồ sơ?

### 1.2 AWS IAM vs Aliyun RAM

<IamRamComparisonDemo />

Các nhà cung cấp dịch vụ đám mây khác nhau có những triển khai IAM riêng:

| Nhà cung cấp   | Tên dịch vụ                           | Khái niệm cơ bản            |
| :------------- | :------------------------------------ | :------------------------- |
| **AWS**        | IAM (Identity and Access Management)  | User, Group, Role, Policy  |
| **Aliyun**     | RAM (Resource Access Management)      | User, Group, Role, Policy  |
| **Tencent**    | CAM (Cloud Access Management)         | User, Group, Role, Policy  |
| **Huawei**     | IAM                                   | User, Group, Delegate, Policy |
| **Azure**      | Azure AD + RBAC                       | User, Group, Role, RBAC    |

Mặc dù tên gọi khác nhau, nhưng **các khái niệm cơ bản đều tương tự nhau**:

- **Người dùng (User)**: Đại diện cho một người hoặc ứng dụng cụ thể
- **Nhóm người dùng (Group)**: Quản lý quyền hạn cho một nhóm người dùng
- **Vai trò (Role)**: Định nghĩa một tập hợp quyền hạn, có thể được "đóng vai"
- **Chính sách (Policy)**: Quy tắc quyền hạn cụ thể (cho phép/từ chối làm gì)

---

## 2. Người dùng, Nhóm, Vai trò: Nên dùng cái nào?

### 2.1 Sự khác biệt giữa ba "danh tính"

<IdentityProviderDemo />

Dùng một tình huống văn phòng để làm sáng tỏ:

| Khái niệm              | Sự tương tự                                 | Trường hợp sử dụng     | Đặc điểm                                   |
| :--------------------- | :------------------------------------------ | :--------------------- | :----------------------------------------- |
| **Người dùng (User)**  | Nhân viên chính thức, có chỗ ngồi riêng    | Thành viên đội lâu dài | Có thông tin đăng nhập vĩnh viễn           |
| **Nhóm (Group)**       | Bộ phận như "kỹ thuật", "bán hàng"        | Quản lý quyền hạn tập thể | Không thể đăng nhập, chỉ là vùng chứa quyền |
| **Vai trò (Role)**     | Thẻ tạm thời cho khách, thẻ ngoài tạm thời | Cấp quyền tạm thời, truy cập xuyên tài khoản | Không có thông tin đăng nhập vĩnh viễn      |

### 2.2 Trường hợp thực: Sự phát triển quyền hạn của một startup

**Giai đoạn một: Đội sáng lập (2-3 người)**

```
Vấn đề: Trực tiếp sử dụng tài khoản gốc để đăng nhập vào bảng điều khiển
Rủi ro: Tài khoản gốc có tất cả quyền hạn, khi bị lộ toàn bộ tài khoản bị mất
```

**Giai đoạn hai: Mở rộng đội (5-10 người)**

```
Cải thiện: Tạo IAM User riêng cho từng người, cấp quyền khác nhau
Vấn đề:
- Người vận hành Wang vừa nghỉ, không biết AK/SK của anh ấy còn nằm ở đâu
- Frontend mới cần quyền chỉ đọc S3, backend cần quyền RDS, cấu hình thủ công quá phức tạp
```

**Giai đoạn ba: Chuẩn hóa (10-30 người)**

```
Cải thiện:
1. Tạo IAM Group theo vai trò:
   - Developers: Quyền S3, EC2, RDS đọc-ghi
   - DevOps: Quyền toàn phần, nhưng bắt buộc MFA
   - ReadOnly: Xem tất cả tài nguyên, không chỉnh sửa
   - QAs: Truy cập tài nguyên môi trường test

2. Sử dụng IAM Role:
   - Thực thể EC2 sử dụng Instance Profile, không cần để AK/SK trên server
   - Truy cập xuyên tài khoản dùng Role Assume, không chia sẻ AK/SK
   - CI/CD dùng OIDC Federation, không lưu thông tin đăng nhập dài hạn
```

**Giai đoạn bốn: Đa tài khoản/Cấp độ doanh nghiệp (30+ người)**

```
Kiến trúc:
- Tài khoản chính (Master Account): Chỉ quản lý hóa đơn và cấu trúc tổ chức, không đặt bất kỳ tài nguyên nào
- Tài khoản kiểm toán (Audit Account): Thu thập nhật ký từ tất cả tài khoản
- Tài khoản phát triển (Dev Account): Môi trường phát triển
- Tài khoản staging (Staging Account): Môi trường test
- Tài khoản sản xuất (Prod Account): Môi trường sản xuất, quyền hạn nghiêm ngặt nhất

Luồng quyền hạn:
- Nhân viên phát triển mặc định chỉ có quyền chỉ đọc tài khoản Dev
- Khi cần chỉnh sửa môi trường sản xuất, tạo phiếu yêu cầu để Assume vai trò tạm thời trên Prod
- Tất cả hoạt động Assume được CloudTrail ghi nhận, kiểm toán thường xuyên
```

---

## 3. Vai trò và Chính sách: "Linh hồn" của quản lý quyền hạn

### 3.1 Bản chất của vai trò: Tin tưởng + Quyền hạn

<RolePolicyDemo />

IAM Role có hai phần cốt lõi:

1. **Chính sách tin tưởng (Trust Policy)**: Ai có thể đóng vai trò này?
2. **Chính sách quyền hạn (Permission Policy)**: Sau khi đóng vai, có thể làm gì?

Dùng một sự tương tự về diễn kịch:

| Khái niệm                  | Sự tương tự              | Giải thích                                                                                     |
| :------------------------- | :----------------------- | :--------------------------------------------------------------------------------------------- |
| **Vai trò (Role)**         | "Hamlet" trong kịch bản  | Định nghĩa diễn gì (quyền hạn)                                                                |
| **Trust Policy**           | "Ai có thể đóng vai Hamlet" | Có thể là "diễn viên trong đoàn" (người dùng tài khoản này), "diễn viên mượn từ đoàn khác" (xuyên tài khoản), "khách mời đặc biệt" (IdP bên ngoài) |
| **Permission Policy**      | Nội dung kịch bản        | Hamlet có thể làm gì: nói thoại, đấu kiếm, điên cuồng (quyền hạn cụ thể)                       |
| **Assume Role**            | Diễn viên lên sân khấu   | Tiểu Lý được đạo diễn chọn đóng Hamlet, lên sân khấu rồi có tất cả quyền trong kịch bản         |
| **Thông tin đăng nhập tạm** | Giấy chép diễn          | Tiểu Lý nhận "giấy chép diễn tạm thời", hết diễn là hết hiệu lực                              |

### 3.2 Chính sách (Policy): "Cú pháp" của quyền hạn

<PermissionHierarchyDemo />

IAM Policy là một tài liệu JSON, định nghĩa "ai có thể làm gì trên tài nguyên nào".

**Ví dụ Policy hoàn chỉnh**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3ReadWrite",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-app-bucket/*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "ap-northeast-1"
        },
        "Bool": {
          "aws:MultiFactorAuthPresent": "true"
        }
      }
    },
    {
      "Sid": "DenySensitiveData",
      "Effect": "Deny",
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::my-app-bucket/sensitive/*"
    }
  ]
}
```

**Giải thích các trường**:

| Trường        | Ý nghĩa                                    | Ví dụ                        |
| :------------ | :----------------------------------------- | :-------------------------- |
| **Version**   | Phiên bản cú pháp Policy                   | "2012-10-17"                |
| **Statement** | Mảng khai báo quyền hạn, có thể nhiều quy tắc | [...] |
| **Sid**       | ID khai báo, tùy chọn, dùng để xác định quy tắc | "AllowS3ReadWrite" |
| **Effect**    | Hiệu ứng: Allow (cho phép) hoặc Deny (từ chối) | "Allow" |
| **Action**    | Hoạt động cho phép/từ chối, hỗ trợ ký tự đại diện | "s3:GetObject", "s3:\*" |
| **Resource**  | Tài nguyên áp dụng, xác định bằng ARN     | "arn:aws:s3:::bucket/\*" |
| **Condition** | Tùy chọn, chỉ có hiệu lực khi thỏa điều kiện | Giới hạn vùng, yêu cầu MFA |

### 3.3 Ưu tiên quyền hạn: Deny > Allow > Từ chối mặc định

Logic đánh giá quyền hạn IAM có thể tóm tắt thành một câu: **Deny rõ ràng luôn thắng, không có Allow là từ chối**.

Luồng đánh giá như sau:

```
1. Kiểm tra có Deny policy không
   ├─ Có Deny → Từ chối (bất kể có Allow hay không)
   └─ Không có Deny → Tiếp tục kiểm tra

2. Kiểm tra có Allow policy không
   ├─ Có Allow → Cho phép
   └─ Không có Allow → Từ chối (nguyên tắc từ chối mặc định)
```

**Trường hợp thực: Bảo vệ dữ liệu nhạy cảm**

```json
// Chính sách 1: Quyền chung cho nhà phát triển
{
  "Effect": "Allow",
  "Action": ["s3:*"],
  "Resource": "arn:aws:s3:::company-data/*"
}

// Chính sách 2: Bảo vệ thư mục nhạy cảm (ngay cả nếu nhà phát triển có s3:* cũng không được vào)
{
  "Effect": "Deny",
  "Action": ["s3:*"],
  "Resource": "arn:aws:s3:::company-data/sensitive/*"
}
```

**Điểm chính**:

- Nhà phát triển dù có quyền `s3:*` từ Allow
- Nhưng thư mục nhạy cảm có Deny rõ ràng
- Ưu tiên Deny cao hơn, nên nhà phát triển không thể vào
- Ngay cả khi nhà phát triển là quản trị viên, Deny này cũng có hiệu lực (trừ tài khoản gốc)

---

## 4. Khóa truy cập (AK/SK): Một "chìa khóa" cần cẩn thận

### 4.1 AK/SK là gì?

<AccessKeyManagementDemo />

Access Key (Khóa truy cập) là một thông tin xác thực dài hạn do nhà cung cấp dịch vụ đám mây cấp, dùng cho gọi API lập trình. Nó gồm hai phần:

| Phần               | Tên           | Tác dụng                       | Sự tương tự   |
| :----------------- | :------------ | :----------------------------- | :------------ |
| **Access Key ID**  | ID khóa       | Xác định bạn là ai (tên người dùng) | Số thẻ ngân hàng |
| **Secret Access Key** | Khóa bí mật | Chứng minh bạn là bạn (mật khẩu) | Mã PIN thẻ |

### 4.2 Tại sao AK/SK là "hàng nguy hiểm"?

**Trường hợp thực: Bài học của một startup**

Tiểu Lý là một kỹ sư backend mới của một startup. Tuần đầu, nhiệm vụ của anh là gỡ lỗi chức năng tải lên tệp.

```python
# Code của Tiểu Lý (có vấn đề bảo mật nghiêm trọng!)
import boto3

# Để tiện gỡ lỗi, trực tiếp viết AK/SK vào code
s3 = boto3.client(
    's3',
    aws_access_key_id='AKIAIOSFODNN7EXAMPLE',
    aws_secret_access_key='wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    region_name='ap-northeast-1'
)

def upload_file(file_path, bucket_name, object_name):
    s3.upload_file(file_path, bucket_name, object_name)
    print(f"Tệp đã tải lên s3://{bucket_name}/{object_name}")

# Test upload
upload_file('./test.jpg', 'my-company-bucket', 'uploads/test.jpg')
```

**Điều xảy ra một tuần sau**:

1. Tiểu Lý commit code lên GitHub (kèm theo AK/SK)
2. Code trên GitHub bị crawler quét, AK/SK bị lấy
3. Kẻ tấn công dùng thông tin xác thực này, tạo nhiều thực thể EC2 trong tài khoản công ty để đào tiền điện tử
4. Cuối tháng nhận hóa đơn: Chi phí thêm 12.000 đô la Mỹ
5. Kiểm toán phát hiện AK/SK bị lộ, Tiểu Lý bị gọi nói chuyện...

**Bài học từ trường hợp này?**

| Cách sai                    | Cách đúng                                      |
| :-------------------------- | :-------------------------------------------- |
| Viết AK/SK cứng trong code  | Dùng IAM Role, ứng dụng tự động nhận thông tin xác thực tạm |
| Commit AK/SK vào Git        | Dùng `.gitignore` bỏ qua cấu hình, dùng dịch vụ quản lý khóa |
| Dùng cùng AK/SK lâu, không đổi | Đổi AK/SK định kỳ, dùng thông tin xác thực tạm thay cho dài hạn |
| Cấp AK/SK quá nhiều quyền   | Tuân theo nguyên tắc quyền tối thiểu, chỉ cấp quyền cần thiết |

### 4.3 Hướng dẫn sử dụng an toàn AK/SK

**Tình huống một: Phát triển cục bộ**

```bash
# Cách đúng: Dùng cấu hình AWS CLI, không viết trong code
aws configure
# Rồi nhập Access Key ID và Secret Access Key theo yêu cầu
# Thông tin này sẽ lưu vào ~/.aws/credentials, quyền truy cập 600

# Code không cần bất kỳ cấu hình thông tin xác thực nào
import boto3
s3 = boto3.client('s3')  # Tự động đọc từ ~/.aws/credentials
```

**Tình huống hai: Server/EC2**

```python
# Cách đúng: Dùng IAM Instance Profile
# 1. Tạo IAM Role, gắn quyền cần thiết (như S3ReadOnly)
# 2. Tạo Instance Profile, liên kết Role này
# 3. Khi khởi động EC2, chọn Instance Profile này

# Code hoàn toàn không cần thông tin xác thực
import boto3
s3 = boto3.client('s3')  # Tự động lấy thông tin xác thực tạm từ dịch vụ metadata EC2

# Thông tin xác thực tạm sẽ tự động đổi, không lo hết hiệu lực
```

**Tình huống ba: Đường ống CI/CD**

```yaml
# Cách đúng: Dùng OIDC Federation (OpenID Connect)
# Ví dụ GitHub Actions:

# 1. Trong AWS tạo OIDC Identity Provider, tin tưởng GitHub
# 2. Tạo IAM Role, chính sách tin tưởng cho phép GitHub repo cụ thể đóng vai
# 3. Cấu hình GitHub Actions

name: Deploy
on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write # Quan trọng: cho phép yêu cầu OIDC token
      contents: read
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsRole
          aws-region: ap-northeast-1
          # Lưu ý: Không có Access Key ở đây! Hoàn toàn dùng thông tin xác thực tạm

      - name: Deploy
        run: aws s3 sync ./build s3://my-bucket/
```

**Tóm tắt: Mức độ an toàn khi sử dụng AK/SK**

| Mức độ an toàn | Cách làm                      | Trường hợp sử dụng          | Mức rủi ro |
| :------------- | :---------------------------- | :------------------------- | :--------- |
| Cao nhất       | Dùng IAM Role (không thông tin xác thực dài hạn) | EC2, Lambda, ECS, CI/CD | Cực thấp |
| Cao            | Dùng OIDC Federation          | GitHub Actions, GitLab CI | Thấp |
| Trung bình     | Dùng dịch vụ quản lý khóa     | Phát triển cục bộ, đội nhỏ | Trung bình |
| Thấp           | Dùng biến môi trường          | Nguyên mẫu nhanh, dự án cá nhân | Cao |
| Cực thấp       | Viết cứng trong code          | Không nên trong bất kỳ trường hợp nào | Cực cao |

---

## 5. Xác thực đa yếu tố (MFA): Thêm một "khóa" cho tài khoản của bạn

### 5.1 MFA là gì?

<MfaSecurityDemo />

MFA (Multi-Factor Authentication, Xác thực đa yếu tố), còn gọi 2FA (Two-Factor Authentication, Xác thực hai yếu tố), là một cơ chế bảo mật yêu cầu người dùng cung cấp **hai hay nhiều hơn** các yếu tố xác thực khác nhau khi đăng nhập:

| Loại yếu tố                 | Đó là gì              | Ví dụ          |
| :--------------------------- | :-------------------- | :------------- |
| **Yếu tố kiến thức**         | Thông tin chỉ bạn biết | Mật khẩu, PIN |
| **Yếu tố sở hữu**           | Thiết bị bạn sở hữu    | Điện thoại, khóa phần cứng |
| **Yếu tố sinh trắc học**     | Đặc điểm sinh học của bạn | Dấu vân tay, khuôn mặt |

### 5.2 Tại sao MFA lại quan trọng?

**Dữ liệu thực tế cho bạn biết:**

| Cách tấn công                | Tỉ lệ thành công mà không MFA | Tỉ lệ thành công khi có MFA |
| :-------------------------- | :----------------------------- | :-------------------------- |
| Đoán mật khẩu/tấn công vũ phu | Rất cao | Cực thấp (cần yếu tố thứ hai) |
| Tấn công lừa đảo lấy mật khẩu | Rất cao | Cực thấp (trang lừa không lấy được mã MFA) |
| Mật khẩu bị lộ (từ trang khác) | Rất cao | Cực thấp (không biết yếu tố thứ hai) |

**Báo cáo bảo mật Microsoft (2020)**: Bật MFA có thể chặn **99,9%** các cuộc tấn công tự động hóa.

### 5.3 MFA thực tế: Bật MFA cho tài khoản gốc AWS

**Bước một: Đăng nhập vào bảng điều khiển AWS**

1. Dùng email tài khoản gốc và mật khẩu để đăng nhập
2. Ở góc trên phải, nhấp vào tên tài khoản, chọn "Security Credentials"

**Bước hai: Bật MFA**

1. Tìm vùng "Multi-factor authentication (MFA)"
2. Nhấp "Assign MFA device"
3. Chọn loại thiết bị MFA (khuyến nghị "Authenticator app")

**Bước ba: Cấu hình MFA ảo**

1. Trên điện thoại, cài đặt Google Authenticator hoặc Microsoft Authenticator
2. Quét mã QR hoặc nhập khóa thủ công
3. Nhập 6 chữ số hiển thị trên ứng dụng (nhập liên tiếp hai cái, vì mã đổi mỗi 30 giây)

**Hoàn tất!** Tài khoản gốc của bạn giờ có bảo vệ MFA.

---

## 6. Truy cập xuyên tài khoản: Làm sao "ghé thăm" an toàn?

### 6.1 Tại sao cần truy cập xuyên tài khoản?

<CrossAccountAccessDemo />

Khi doanh nghiệp phát triển, nhiều công ty sẽ dùng **kiến trúc đa tài khoản** để cách ly các môi trường:

| Loại tài khoản            | Mục đích                   | Yêu cầu quyền hạn      |
| :------------------------ | :------------------------- | :--------------------- |
| **Master Account**        | Quản lý tổ chức, thanh toán | Gần như không sử dụng   |
| **Security Audit**        | Thu thập nhật ký tất cả    | Chỉ đọc tài khoản khác |
| **Shared Services**       | Tài nguyên chia sẻ (kho ảnh) | Tài khoản khác chỉ đọc |
| **Development**           | Môi trường phát triển      | Quyền đầy đủ nhà phát triển |
| **Staging**               | Môi trường test/staging    | Quyền nhân viên test    |
| **Production**            | Môi trường sản xuất        | Hạn chế nghiêm ngặt     |

**Vấn đề: Ảnh trong tài khoản Shared Services, làm sao EC2 trong Production kéo xuống?**

- Phương án A: Viết AK/SK vào user data của Production (nguy hiểm! AK/SK bị lộ)
- Phương án B: Dùng Role Assume xuyên tài khoản (khuyến nghị! Thông tin xác thực tạm, tự động đổi)

### 6.2 Nguyên lý Role Assume xuyên tài khoản

```
Tài khoản A (Production)                Tài khoản B (Shared Services)
    |                                           |
    |  1. Yêu cầu Assume Role                   |
    |  "Tôi muốn đóng vai ECRReadRole của bạn" |
    |----------------------------------------->|
    |                                           |
    |                    2. Kiểm tra chính sách tin tưởng |
    |                    "Tài khoản A có được đóng vai không?" |
    |                                           |
    |  3. Trả về thông tin xác thực tạm         |
    |  AccessKeyId, SecretKey, SessionToken    |
    |<------------------------------------------|
    |                                           |
    |  4. Dùng thông tin xác thực tạm truy cập ECR |
    |  docker pull tài khoanhB.dkr.ecr...       |
```

**Điểm chính**:

- Thông tin xác thực tạm có hiệu lực mặc định 1 giờ, tối đa cấu hình 12 giờ
- Không cần lưu bất kỳ thông tin xác thực dài hạn nào trong code
- Chính sách tin tưởng có thể hạn chế ai được đóng vai (như tài khoản cụ thể, ID bên ngoài cụ thể)

### 6.3 Thực tế: Cấu hình truy cập xuyên tài khoản ECR

**Tình huống**: EC2 trong tài khoản Production cần kéo Docker image từ Shared Services.

**Bước một: Trong tài khoản Shared Services tạo IAM Role**

1. Đăng nhập vào bảng điều khiển AWS của tài khoản Shared Services
2. Vào IAM -> Roles -> Create role
3. Chọn "Another AWS account"
4. Nhập Account ID của Production
5. Tùy chọn: Chọn "Require external ID" và nhập chuỗi ngẫu nhiên (tăng bảo mật)
6. Gắn quyền: AmazonEC2ContainerRegistryReadOnly
7. Đặt tên Role: CrossAccountECRReadRole

**Bước hai: Lấy Role ARN**

Sau khi tạo xong, sao chép ARN của Role:

```
arn:aws:iam::SHARED_SERVICES_ACCOUNT_ID:role/CrossAccountECRReadRole
```

**Bước ba: Cấu hình EC2 trong tài khoản Production**

Cách A: Dùng Instance Profile (khuyến nghị)

1. Trong tài khoản Production tạo IAM Role (dùng cho EC2)
2. Chính sách tin tưởng: Tin tưởng dịch vụ EC2
3. Chính sách quyền hạn: Cho phép Assume Role xuyên tài khoản

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Resource": "arn:aws:iam::SHARED_SERVICES_ACCOUNT_ID:role/CrossAccountECRReadRole"
    }
  ]
}
```

4. Tạo Instance Profile, liên kết Role này
5. Khi khởi động EC2, chọn Instance Profile này

Cách B: Động Assume Role trong user data của EC2

```bash
#!/bin/bash
# Cài đặt AWS CLI
yum install -y aws-cli

# Assume Role xuyên tài khoản
CREDS=$(aws sts assume-role \
  --role-arn arn:aws:iam::SHARED_SERVICES_ACCOUNT_ID:role/CrossAccountECRReadRole \
  --role-session-name EC2PullSession)

# Trích thông tin xác thực tạm
export AWS_ACCESS_KEY_ID=$(echo $CREDS | jq -r '.Credentials.AccessKeyId')
export AWS_SECRET_ACCESS_KEY=$(echo $CREDS | jq -r '.Credentials.SecretAccessKey')
export AWS_SESSION_TOKEN=$(echo $CREDS | jq -r '.Credentials.SessionToken')

# Đăng nhập ECR
aws ecr get-login-password --region ap-northeast-1 | \
  docker login --username AWS --password-stdin SHARED_SERVICES_ACCOUNT_ID.dkr.ecr.ap-northeast-1.amazonaws.com

# Kéo ảnh
docker pull SHARED_SERVICES_ACCOUNT_ID.dkr.ecr.ap-northeast-1.amazonaws.com/my-app:latest
```

**Bước bốn: Kiểm tra truy cập xuyên tài khoản**

Trên EC2 của Production, chạy:

```bash
# Kiểm tra có Assume Role được không
aws sts get-caller-identity
# Nên hiển thị: arn:aws:sts::PRODUCTION_ACCOUNT_ID:assumed-role/CrossAccountECRReadRole/EC2PullSession

# Kiểm tra có liệt kê được ECR của Shared Services không
aws ecr describe-repositories --registry-id SHARED_SERVICES_ACCOUNT_ID
```

**Hoàn tất!** Giờ EC2 trong Production có thể an toàn kéo ảnh từ Shared Services, mà không cần chia sẻ bất kỳ thông tin xác thực dài hạn nào.

---

## 7. Thực tế: Xây dựng hệ thống quyền hạn an toàn

### 7.1 Từ không có gì xây dựng kiến trúc quyền hạn

<BestPracticesDemo />

Giả sử bạn là người chịu trách nhiệm kỹ thuật của một startup 10 người, cần thiết kế kiến trúc quyền hạn AWS từ đầu. Dưới đây là các bước triển khai được khuyến nghị:

**Giai đoạn một: Bảo vệ tài khoản gốc (Ngày 1)**

```
Mục tiêu: Bảo vệ tài khoản gốc, đây là tài khoản quan trọng nhất

1. Bật MFA cho tài khoản gốc (bắt buộc)
   - Khuyến nghị MFA phần cứng (YubiKey), hoặc Google Authenticator

2. Tạo tài khoản quản trị viên IAM
   - Tên người dùng: admin (hoặc tên của bạn)
   - Quyền hạn: AdministratorAccess (nhưng sau sẽ hạn chế)
   - Bật MFA

3. Xóa Access Key của tài khoản gốc (nếu tạo rồi)
   - Tài khoản gốc không bao giờ nên có AK/SK

4. Cấu hình cảnh báo cho tài khoản gốc
   - Dùng CloudWatch + SNS, khi tài khoản gốc đăng nhập thì gửi email/SMS
```

**Giai đoạn hai: Phân nhóm quyền hạn cho đội (Tuần 1)**

```
Mục tiêu: Phân nhóm thành viên, quản lý quyền hạn tập thể

1. Phân tích vai trò trong đội:
   - Backend (2 người)
   - Frontend (1 người)
   - Mobile (1 người)
   - Sản phẩm (1 người)
   - Thiết kế (1 người)
   - Sáng lập/Quản lý (3 người)

2. Tạo IAM Group:

   Group: Developers
   ├── Thành viên: Tất cả nhà phát triển (backend, frontend, mobile)
   ├── Quyền hạn:
   │   ├── EC2: Khởi động, dừng, xem (nhưng không xóa của người khác)
   │   ├── S3: Đọc-ghi thư mục môi trường phát triển
   │   ├── RDS: Chỉ đọc (không chỉnh sửa database sản xuất)
   │   └── CloudWatch: Xem nhật ký
   └── Giới hạn: Chỉ hoạt động trên vùng ap-northeast-1

   Group: ProductTeam
   ├── Thành viên: Sản phẩm, thiết kế
   ├── Quyền hạn:
   │   ├── S3: Chỉ đọc (xem tệp dữ liệu)
   │   ├── CloudWatch Dashboard: Xem biểu đồ giám sát
   │   └── Cost Explorer: Xem hóa đơn (nhưng không chỉnh sửa)
   └── Giới hạn: Chỉ quyền đọc, không chỉnh sửa tài nguyên

   Group: Administrators
   ├── Thành viên: Sáng lập, kỹ sư trưởng
   ├── Quyền hạn: AdministratorAccess
   └── Yêu cầu: Bắt buộc dùng MFA mới hoạt động

3. Tạo IAM User cho từng người, thêm vào Group tương ứng
   - Không cấp quyền trực tiếp cho cá nhân, tất cả qua Group
   - Bắt buộc bật MFA
```

**Giai đoạn ba: Tối ưu quyền hạn ứng dụng (Tuần 2-4)**

```
Mục tiêu: Ứng dụng truy cập tài nguyên AWS một cách an toàn

1. EC2 dùng Instance Profile
   - Không cấu hình AK/SK trên server nữa
   - Tạo IAM Role, gắn quyền cần thiết (như S3 đọc-ghi)
   - Tạo Instance Profile, liên kết Role này
   - Khởi động EC2 khi chọn Instance Profile này
   - Code ứng dụng trực tiếp dùng boto3, không cần cấu hình thông tin xác thực

2. Nếu bắt buộc dùng AK/SK (tích hợp bên thứ ba)
   - Dùng AWS Secrets Manager lưu trữ AK/SK
   - Ứng dụng khởi động từ Secrets Manager đọc lấy
   - Đặt lịch đổi định kỳ (90 ngày)
   - Giám sát cách sử dụng AK/SK

3. Cấu hình CloudTrail ghi nhận tất cả lệnh gọi API
   - Tạo bucket S3 riêng lưu trữ nhật ký
   - Cấu hình kiểm tra tệp nhật ký (chống giả mạo)
   - Cấu hình SNS thông báo sự kiện quan trọng (tài khoản gốc dùng, thay đổi chính sách)
```

**Giai đoạn bốn: Gia cố bảo mật (Liên tục)**

```
Mục tiêu: Xây dựng cơ chế giám sát và cải thiện bảo mật liên tục

1. Bật AWS Config
   - Giám sát thay đổi cấu hình tài nguyên
   - Kiểm tra tuân thủ (như security group có mở 0.0.0.0/0 không)

2. Bật IAM Access Analyzer
   - Phân tích chính sách tài nguyên liên tục
   - Phát hiện truy cập bên ngoài (như S3 bucket công khai)

3. Thường xuyên kiểm tra cấu hình IAM
   - Mỗi tháng kiểm tra IAM User, Role không dùng
   - Kiểm tra lịch sử sử dụng Access Key
   - Xác minh thành viên Group có hợp lý không

4. Xây dựng quy trình ứng phó sự cố bảo mật
   - Nếu phát hiện AK/SK bị lộ: Xóa ngay, đổi, kiểm tra ảnh hưởng
   - Nếu phát hiện gọi API bất thường: Điều tra ngay, hạn chế quyền
```

---

## 8. Những cạm bẫy thường gặp và hướng dẫn tránh

### 8.1 Mười mẫu phản chứng IAM

| # | Mẫu phản chứng | Tại sao không tốt | Cách đúng |
| :-- | :------------ | :-------------- | :------ |
| 1 | Dùng tài khoản gốc hàng ngày | Tài khoản gốc có tất cả quyền, nếu lộ không giới hạn được hệ quả | Tạo tài khoản quản trị IAM, tài khoản gốc chỉ dùng khi cần |
| 2 | Cấp AdministratorAccess cho tất cả | Phạm quyền tối thiểu, tăng rủi ro sai thao tác và đe dọa nội bộ | Phân nhóm theo vai trò, chỉ cấp quyền cần thiết |
| 3 | Viết cứng AK/SK trong code | AK/SK dễ bị lộ qua GitHub, khó đổi | Dùng IAM Role, biến môi trường, hay dịch vụ quản lý khóa |
| 4 | Lâu không đổi AK/SK | Khi bị lộ, cửa sổ rủi ro dài | Đặt lịch đổi 90 ngày, hoặc tốt hơn là dùng thông tin xác thực tạm |
| 5 | Bỏ qua MFA | Mật khẩu bị lộ thì tài khoản ngay sập | Bắt buộc bật MFA cho tất cả IAM user, đặc biệt là cao quyền |
| 6 | Không dùng CloudTrail | Không kiểm toán ai làm gì, sự cố không có cách truy nguyên | Bật CloudTrail, lưu nhật ký vào tài khoản kiểm toán riêng |
| 7 | Chính sách IAM quá rộng | Như `Resource: "*"`, `Action: "*"`, tăng diện tấn công | Chỉ rõ ARN tài nguyên, action cụ thể |
| 8 | Không dọn sạch IAM User nhân viên cũ | Tài khoản phác có thể thành cửa ngõ | Xây dựng quy trình nghỉ việc, vô hiệu hóa và xóa IAM User |
| 9 | Không dùng IAM Access Analyzer | Không biết có tài nguyên nào công khai (S3 bucket công khai) | Bật IAM Access Analyzer, thường xuyên kiểm tra truy cập bên ngoài |
| 10 | Không kiểm tra Policy trên test trước | Áp dụng trực tiếp trên sản xuất, có thể ngừng dịch vụ | Dùng IAM Policy Simulator kiểm tra, test trên môi trường staging trước |

---

## 9. Bảng đối chiếu từ vựng

| Thuật ngữ tiếng Anh                      | Dịch tiếng Việt     | Giải thích                                     |
| :--------------------------------------- | :------------------ | :-------------------------------------------- |
| **IAM (Identity and Access Management)** | Quản lý Danh tính và Quyền hạn | Dịch vụ quản lý danh tính người dùng và quyền truy cập |
| **RAM (Resource Access Management)**     | Quản lý Truy cập Tài nguyên | Tên dịch vụ IAM của Aliyun |
| **Root Account**                         | Tài khoản gốc      | Tài khoản chủ sở hữu được tạo khi đăng ký tài khoản đám mây |
| **IAM User**                             | Người dùng IAM/Tài khoản con | Danh tính con do tài khoản gốc tạo, dùng cho hoạt động hàng ngày |
| **IAM Role**                             | Vai trò IAM        | Vùng quyền hạn tạm thời, không có thông tin xác thực dài hạn |
| **IAM Policy**                           | Chính sách IAM     | Quy tắc quyền hạn định nghĩa bằng JSON |
| **ARN**                                  | Tên Tài nguyên AWS | Định danh duy nhất toàn cầu cho tài nguyên |
| **AK/SK**                                | Khóa truy cập/Khóa | Thông tin xác thực để truy cập API đám mây |
| **STS**                                  | Dịch vụ Token Bảo mật | Dịch vụ cung cấp thông tin xác thực tạm |
| **MFA**                                  | Xác thực Đa yếu tố | Phương pháp xác thực cần hai hay nhiều yếu tố |
| **SSO**                                  | Đăng nhập Một lần   | Phương pháp xác thực cho phép đăng nhập một lần, truy cập nhiều hệ thống |
| **ExternalId**                           | ID Bên ngoài       | Định danh bảo mật để chống tấn công proxy lẫn lộn |
| **CloudTrail**                           | Dịch vụ Kiểm toán Đám mây | Dịch vụ ghi nhận tất cả lệnh gọi API và hoạt động |

---

## Tóm tắt: Các nguyên tắc cốt lõi quản lý quyền hạn tài khoản đám mây

Quản lý quyền hạn tài khoản đám mây không phải điều có thể hoàn thành một lần, mà cần phát triển liên tục dựa trên quy mô đội và nhu cầu doanh nghiệp:

1. **Giai đoạn khởi đầu** (1-10 người):
   - Bảo vệ tài khoản gốc (MFA + không dùng tài khoản gốc hàng ngày)
   - Tạo tài khoản quản trị viên IAM
   - Phân nhóm cơ bản (Developers, Admins)

2. **Giai đoạn tăng trưởng** (10-50 người):
   - Phân nhóm quyền hạn chi tiết (frontend, backend, vận hành, sản phẩm)
   - Dùng IAM Role thay cho AK/SK
   - Bật CloudTrail kiểm toán
   - Thường xuyên kiểm tra quyền hạn

3. **Giai đoạn trưởng thành** (50+ người / Đa tài khoản):
   - Kiến trúc đa tài khoản (Dev, Staging, Prod riêng)
   - Tài khoản kiểm toán tập trung
   - Tự động kiểm tra và cảnh báo quyền hạn
   - Quy trình yêu cầu và phê duyệt quyền hạn hoàn chỉnh

**Hãy nhớ ba nguyên tắc cốt lõi**:

1. **Nguyên tắc quyền tối thiểu**: Chỉ cấp quyền cần thiết, không cấp AdministratorAccess
2. **Không dùng thông tin xác thực dài hạn**: Ưu tiên dùng IAM Role và thông tin xác thực tạm, tránh lộ AK/SK
3. **Bật MFA**: Đặc biệt là tài khoản gốc và tài khoản cao quyền, đây là biện pháp bảo mật hiệu quả nhất

---

> **Đọc thêm**:
>
> - [Tài liệu chính thức AWS IAM](https://docs.aws.amazon.com/iam/)
> - [Tài liệu chính thức Aliyun RAM](https://www.aliyun.com/product/ram)
> - [Thực hành tốt nhất AWS IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
