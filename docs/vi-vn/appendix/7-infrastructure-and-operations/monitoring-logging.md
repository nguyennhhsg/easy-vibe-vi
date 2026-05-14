# Giám sát, Nhật ký và Cảnh báo
> 💡 **Hướng dẫn học tập**：Chương này không yêu cầu kiến thức lập trình cơ bản, thông qua các bài demo tương tác giúp bạn hiểu rõ toàn bộ hệ thống kiến thức vận hành. Từ giám sát cảnh báo đến xử lý sự cố, từ kế hoạch năng lực đến vận hành tự động hóa, bạn sẽ nắm vững hoàn toàn các kỹ năng vận hành hệ thống trực tuyến.

## 0. Mở đầu: Hệ thống phát hành chỉ là bắt đầu

Nhiều người mới bắt đầu cho rằng: "Code được triển khai trực tuyến, nhiệm vụ hoàn thành rồi."

**Sai to lớn!**

Hệ thống phát hành chỉ là **điểm khởi đầu của công việc vận hành**. Giống như mua một chiếc xe mới, việc bảo dưỡng, sửa chữa, đổ xăng là điều bình thường.

Mục tiêu vận hành có ba điểm:

1. **Ổn định (Stability)**：Hệ thống không bị sập, dịch vụ luôn có sẵn
2. **Hiệu năng (Performance)**：Phản hồi nhanh chóng, trải nghiệm người dùng tốt
3. **Bảo mật (Security)**：Dữ liệu không bị rò rỉ, phòng chống bị tấn công

---

## 1. Hệ thống giám sát (Monitoring)

Giám sát là "đôi mắt" của vận hành. Hệ thống không có giám sát giống như người mù lái xe, không biết có vấn đề gì.

### 1.1 Ba cấp độ của giám sát

<MonitoringDashboardDemo />

**Giám sát cơ sở hạ tầng**：Chú ý đến tài nguyên phần cứng máy chủ

- CPU usage
- Memory usage
- Dung lượng đĩa và I/O
- Băng thông mạng

**Giám sát ứng dụng**：Chú ý đến trạng thái vận hành phần mềm

- QPS (requests per second)
- Thời gian phản hồi (latency)
- Error rate
- Gọi dịch vụ phụ thuộc

**Giám sát kinh doanh**：Chú ý đến sức khỏe kinh doanh

- DAU/MAU (Daily Active Users / Monthly Active Users)
- Lượng đơn hàng
- Tỉ lệ thanh toán thành công
- Tỉ lệ giữ chân người dùng

### 1.2 Bộ công cụ giám sát

| Công cụ        | Mục đích           | Đặc điểm                     |
| :------------- | :------------- | :----------------------- |
| **Prometheus** | Thu thập và lưu trữ chỉ số | Time series database, thích hợp cho dữ liệu giám sát |
| **Grafana**    | Dashboard trực quan     | Biểu đồ mạnh mẽ và dashboard   |
| **Zabbix**     | Giám sát toàn diện       | Công cụ lâu năm, chức năng đầy đủ       |
| **Datadog**    | SaaS monitoring platform  | Giải pháp một cửa, có phí     |

**Điểm chính**：Giám sát phải phân tầng, từ cơ sở hạ tầng đến kinh doanh phủ sóng toàn bộ, tránh "điểm mù".

---

## 2. Hệ thống cảnh báo (Alerting)

Sau khi giám sát phát hiện sự cố, cần thông báo kịp thời cho nhân viên vận hành, đó là **cảnh báo**.

### 2.1 Quy trình cảnh báo

<AlertFlowDemo />

### 2.2 Thiết kế mức độ cảnh báo

Phân cấp cảnh báo hợp lý có thể tránh "cảnh báo mệt mỏi":

| Mức   | Thời gian phản hồi        | Tình huống điển hình                   | Kênh thông báo           |
| :----- | :-------------- | :------------------------- | :----------------- |
| **P0** | Ngay lập tức (trong 5 phút) | Dịch vụ cốt lõi sập, thanh toán thất bại     | Gọi + SMS + Ding Talk |
| **P1** | Trong 30 phút        | Chức năng một phần bất thường, hiệu năng giảm mạnh | SMS + Ding Talk + Email |
| **P2** | Xử lý trong ngày        | Sử dụng tài nguyên cao, lỗi giá trị nhỏ   | Ding Talk + Email        |
| **P3** | Xử lý trong tuần        | Vấn đề không cốt lõi, gợi ý tối ưu hóa       | Email               |

### 2.3 Thu gọn và giảm nhiễu cảnh báo

**Vấn đề**：Một vấn đề nhỏ có thể kích hoạt hàng trăm hay hàng ngàn cảnh báo, khiến nhân viên bị chứng mệt mỏi từ cảnh báo.

**Giải pháp**：

1. **Nhóm cảnh báo**：Hợp nhất cảnh báo tương tự (như các vấn đề trên cùng một máy chủ hợp nhất thành một)
2. **Cảnh báo được chế tạo**：Nếu vấn đề mẹ đã được kích hoạt, vấn đề con không cảnh báo lặp lại
3. **Quy tắc im lặng**：Tự động tạm dừng cảnh báo trong thời gian bảo trì
4. **Giới hạn tần suất**：Cánh báo tương tự không thông báo lặp lại trong thời gian ngắn

**Điểm chính**：Cảnh báo phải "ít mà chất", mỗi cảnh báo đều đáng để xử lý.

---

## 3. Quản lý nhật ký (Logging)

Nhật ký là "hộp đen" để xử lý sự cố.

### 3.1 Phân cấp nhật ký

```javascript
console.debug('Thông tin debug chi tiết') // Sử dụng khi phát triển
console.info('Thông tin chung') // Ghi lại quy trình bình thường
console.warn('Cảnh báo') // Vấn đề tiềm ẩn
console.error('Lỗi') // Lỗi cần chú ý
```

### 3.2 Nhật ký có cấu trúc

Nhật ký truyền thống (không tốt)：

```
2024-01-15 10:23:45 ERROR User john failed to login, attempts=3, ip=192.168.1.100
```

Nhật ký có cấu trúc (được khuyến nghị)：

```json
{
  "timestamp": "2024-01-15T10:23:45Z",
  "level": "ERROR",
  "message": "User login failed",
  "user": "john",
  "attempts": 3,
  "ip": "192.168.1.100",
  "service": "auth-service"
}
```

### 3.3 Stack ELK

**ELK = Elasticsearch + Logstash + Kibana**

- **Logstash**：Thu thập và lọc nhật ký
- **Elasticsearch**：Lưu trữ và tìm kiếm nhật ký
- **Kibana**：Trực quan hóa và truy vấn nhật ký

**Best practices**：

- ✅ Thông tin nhạy cảm (mật khẩu, token) không ghi vào nhật ký
- ✅ Các hoạt động quan trọng (đăng nhập, thanh toán, thay đổi quyền) phải ghi lại
- ✅ Nhật ký phải chứa ngữ cảnh (user ID, request ID, timestamp)
- ✅ Dọn sạch nhật ký cũ định kỳ, tránh đĩa bị quá tải

---

## 4. Tracing phân tán (Tracing)

Trong kiến trúc microservice, một yêu cầu có thể đi qua hàng chục dịch vụ, làm sao để theo dõi đường dẫn hoàn chỉnh của nó?

**Trace ID và Span ID**

- **Trace ID**：Mã nhận dạng duy nhất cho toàn bộ đường dẫn yêu cầu (giống như số theo dõi giao hàng)
- **Span ID**：Mã nhận dạng cho lệnh gọi dịch vụ đơn lẻ (giống như mỗi trạm chuyển tiếp)

### 4.1 Demo tracing phân tán

<TraceVisualizationDemo />

### 4.2 Tiêu chuẩn OpenTelemetry

OpenTelemetry (OTel) là **tiêu chuẩn ngành** cho tracing, cung cấp API và SDK thống nhất.

```javascript
// Ví dụ：Sử dụng OpenTelemetry để ghi Span
import { trace } from '@opentelemetry/api'

const tracer = trace.getTracer('my-service')

async function processOrder(orderId) {
  // Tạo một Span
  const span = tracer.startSpan('processOrder')

  try {
    // Đặt thuộc tính
    span.setAttribute('order.id', orderId)

    // Logic kinh doanh...
    await validateOrder(orderId)
    await saveToDatabase(orderId)

    span.setStatus({ code: SpanStatusCode.OK })
  } catch (error) {
    span.recordException(error)
    span.setStatus({ code: SpanStatusCode.ERROR, message: error.message })
  } finally {
    span.end() // Kết thúc Span
  }
}
```

**Điểm chính**：Tracing phân tán có thể xác định nhanh chóng các tắc nghẽn hiệu năng và điểm lỗi, là công cụ bắt buộc cho microservice.

---

## 5. Quy trình xử lý sự cố

Sự cố trực tuyến là không thể tránh khỏi, chìa khóa là **phản hồi nhanh chóng, phục hồi nhanh chóng**.

### 5.1 Quy trình xử lý sự cố

<IncidentResponseDemo />

### 5.2 Các công cụ xử lý thường dùng

| Công cụ      | Mục đích         | Tình huống điển hình                 |
| :----------- | :----------- | :----------------------- |
| **tcpdump**  | Bắt gói tin phân tích     | Mạng bị ngắt, gói tin bị mất     |
| **strace**   | Theo dõi lệnh gọi hệ thống | Tiến trình bị treo, vấn đề quyền tệp   |
| **Arthas**   | Chẩn đoán Java    | CPU cao, rò rỉ bộ nhớ, deadlock |
| **top/htop** | Giám sát tài nguyên hệ thống | CPU/memory usage cao           |
| **netstat**  | Xem kết nối mạng | Port bị chiếm, số kết nối bất thường     |
| **lsof**     | Xem tệp đang mở | Tệp bị chiếm, đĩa quá tải       |

**Ví dụ Arthas** (công cụ chẩn đoán Java mã nguồn mở của Alibaba)：

```bash
# Xem 5 thread có CPU cao nhất
$ top -H -p 12345

# Xem thời gian gọi của một phương thức cụ thể
$ trace com.example.OrderService createOrder

# Xem các trường tĩnh của lớp
$ getstatic com.example.Config MAX_CONNECTIONS

# Cập nhật mã nóng (không cần khởi động lại)
$ mc /tmp/Test.java
$ redefine /tmp/Test.class
```

### 5.3 Phân tích sự cố (Post-mortem)

**Phân tích không phải là cuộc họp truy cứu trách nhiệm!**

Mục đích của phân tích là:

1. Sắp xếp dòng thời gian sự cố
2. Tìm nguyên nhân gốc (Root Cause Analysis)
3. Tổng kết kinh nghiệm bài học
4. Đưa ra các biện pháp cải tiến

**Phương pháp 5 Why**：

Đặt câu hỏi "Tại sao" ít nhất 5 lần để tìm nguyên nhân gốc:

- Tại sao dịch vụ bị sập?
  - Vì bộ nhớ bị tràn
- Tại sao bộ nhớ bị tràn?
  - Vì dữ liệu cache quá nhiều
- Tại sao dữ liệu cache quá nhiều?
  - Vì không có đặt thời gian hết hạn
- Tại sao không đặt thời gian hết hạn?
  - Vì bỏ qua khi phát triển
- **Nguyên nhân gốc**：Thiếu review code và test cases

**Điểm chính**：Xây dựng nền văn hóa không trách móc, tập trung vào cải tiến quy trình chứ không phải trách nhiệm cá nhân.

---

## 6. Tối ưu hóa hiệu năng

### 6.1 Phân tích tắc nghẽn hiệu năng

**Hướng tối ưu hóa từ trên xuống**：

```
Cảm nhận người dùng
  ↓
Tối ưu hóa frontend (giảm yêu cầu, CDN, lazy loading)
  ↓
Tối ưu hóa mạng (HTTP/2, nén, long connection)
  ↓
Tối ưu hóa backend (cache, async, batch processing)
  ↓
Tối ưu hóa database (index, query optimization, sharding)
  ↓
Tối ưu hóa hệ thống (kernel parameters, JVM tuning)
```

### 6.2 Tối ưu hóa database

**Tối ưu hóa index**：

```sql
-- Truy vấn chậm (không có index)
SELECT * FROM orders WHERE user_id = 12345;

-- Nhanh 100 lần sau khi tạo index
CREATE INDEX idx_user_id ON orders(user_id);
```

**Tối ưu hóa truy vấn**：

```sql
-- ❌ Tránh SELECT *
SELECT * FROM users WHERE id = 123;

-- ✅ Chỉ truy vấn các trường cần thiết
SELECT id, name, email FROM users WHERE id = 123;

-- ❌ Tránh IN clause quá nhiều
SELECT * FROM orders WHERE user_id IN (1, 2, 3, ..., 10000);

-- ✅ Sử dụng JOIN hoặc truy vấn theo batch
SELECT * FROM orders o JOIN user_ids u ON o.user_id = u.id;
```

### 6.3 Tối ưu hóa cache

**Kiến trúc cache nhiều cấp độ**：

```
Browser cache (CDN)
  ↓
Local cache (memory/Guava)
  ↓
Distributed cache (Redis/Memcached)
  ↓
Database (MySQL/PostgreSQL)
```

**Chiến lược cập nhật cache**：

| Chiến lược              | Ưu điểm         | Nhược điểm         | Tình huống áp dụng                 |
| :---------------- | :----------- | :----------- | :----------------------- |
| **Cache-Aside**   | Đơn giản, đáng tin cậy   | Truy vấn đầu tiên chậm   | Đọc nhiều ghi ít                 |
| **Write-Through** | Tính nhất quán dữ liệu tốt | Ghi chậm       | Đọc ghi cân bằng                 |
| **Write-Behind**  | Ghi cực nhanh     | Có thể mất dữ liệu | Ghi nhiều đọc ít, cho phép không nhất quán ngắn hạn |

**Điểm chính**：Cache không phải giải pháp thần kỳ, phải xem xét tính nhất quán, sự cố tuyết lở, xuyên qua, v.v. (tham khảo chương "Thiết kế cache hệ thống").

---

## 7. Kế hoạch năng lực

### 7.1 Đánh giá năng lực

<CapacityPlanningDemo />

### 7.2 Kiểm tra áp lực

**Lựa chọn công cụ**：

| Công cụ    | Đặc điểm                | Tình huống áp dụng      |
| :--------- | :------------------ | :------------ |
| **JMeter** | Chức năng mạnh, trực quan    | Stress test HTTP endpoint |
| **wrk/ab** | Nhẹ, command line        | Benchmark test nhanh  |
| **Locust** | Script Python, phân tán | Stress test tình huống phức tạp  |
| **K6**     | Hiện đại, JS script       | Tích hợp CI/CD    |

**Ví dụ wrk**：

```bash
# Cài đặt wrk
$ brew install wrk  # macOS
$ apt install wrk   # Ubuntu

# Stress test HTTP endpoint (10 threads, 30 giây)
$ wrk -t10 -c100 -d30s http://example.com/api/users

# Đầu ra：
# Running 30s test @ http://example.com/api/users
#   10 threads and 100 connections
#   Thread Stats   Avg      Stdev     Max   +/- Stdev
#     Latency    45.32ms   12.45ms 120.50ms   87.56%
#     Req/Sec     2.12k   123.45    3.45k    89.01%
#   632450 requests in 30.00s, 1.23GB read
# Requests/sec:  21081.67
```

### 7.3 Mở rộng và co lại tự động

**Tự động mở rộng và co lại trong thời đại cloud native**：

```yaml
# Kubernetes HPA (Horizontal Pod Autoscaler)
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

**Khi CPU usage vượt quá 70%, tự động mở rộng Pod (tối đa 10 cái)**

**Điểm chính**：Kết hợp dự báo kinh doanh (như Double 11) để mở rộng trước, tránh kịp thời.

---

## 8. Vận hành bảo mật

### 8.1 Kiểm soát truy cập

**Nguyên tắc quyền lực tối thiểu**：

- Nhân viên phát triển chỉ có thể truy cập môi trường phát triển
- Nhân viên vận hành chỉ có thể truy cập môi trường sản xuất, cần phê duyệt
- Hoạt động nhạy cảm database cần xác nhận lần thứ hai

**Jump Server (Bastion Host)**：

Tất cả hoạt động vận hành thông qua bastion, ghi lại nhật ký hoạt động đầy đủ.

### 8.2 Sao lưu dữ liệu

**Quy tắc sao lưu 3-2-1**：

- **3** bản sao dữ liệu (1 bản gốc + 2 bản sao lưu)
- **2** loại phương tiện lưu trữ khác nhau (đĩa cục bộ + cloud storage)
- **1** bản sao lưu ngoài trang (chống thảm họa đơn điểm)

**Chiến lược sao lưu**：

| Loại         | Tần suất | Thời gian giữ | RTO    | RPO     |
| :----------- | :--- | :------- | :----- | :------ |
| **Full Backup** | Hàng tuần | 1 tháng   | 4 tiếng | 24 tiếng |
| **Incremental Backup** | Mỗi ngày | 1 tuần     | 2 tiếng | 1 tiếng  |
| **Real-time Backup** | Mỗi giây | 7 ngày     | Phút | Giây    |

**RTO (Recovery Time Objective)**：Mục tiêu thời gian phục hồi (dịch vụ bị gián đoạn tối đa bao lâu)
**RPO (Recovery Point Objective)**：Mục tiêu điểm phục hồi (mất tối đa bao nhiêu dữ liệu)

### 8.3 Quét lỗ hổng

**Quét định kỳ**：

- **Code Scanning**：SonarQube, ESLint (phát hiện lỗ hổng tiềm ẩn)
- **Dependency Scanning**：npm audit, Snyk (kiểm tra lỗ hổng thư viện bên thứ ba)
- **Container Scanning**：Trivy, Clair (kiểm tra lỗ hổng image)

```bash
# Ví dụ npm audit
$ npm audit

found 3 vulnerabilities (1 moderate, 2 high)

Package         Severity  Vulnerable versions
lodash          high      <4.17.21
express         moderate  4.0.0 - 4.18.2

# Tự động sửa
$ npm audit fix
```

---

## 9. Vận hành tự động hóa (DevOps)

### 9.1 Pipeline CI/CD

```yaml
# .gitlab-ci.yml ví dụ
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm install
    - npm test
  tags:
    - docker

build:
  stage: build
  script:
    - docker build -t myapp:$CI_COMMIT_SHA .
    - docker push registry.example.com/myapp:$CI_COMMIT_SHA
  only:
    - main

deploy:
  stage: deploy
  script:
    - kubectl set image deployment/myapp myapp=registry.example.com/myapp:$CI_COMMIT_SHA
  environment:
    name: production
  when: manual # Triển khai thủ công
```

### 9.2 Infrastructure as Code (IaC)

**Ví dụ Terraform** (quản lý tài nguyên cloud)：

```hcl
# main.tf
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "WebServer"
    Env  = "production"
  }
}

resource "aws_security_group" "web" {
  name = "web-sg"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

**Ưu điểm**：

- ✅ Version control：Tất cả cấu hình trong Git
- ✅ Có thể lặp lại：Tính nhất quán môi trường
- ✅ Có thể kiểm toán：Lịch sử thay đổi rõ ràng
- ✅ Có thể rollback：Phục hồi nhanh về phiên bản trước

### 9.3 Thực hành GitOps

**GitOps = Git + IaC + Automation**

Ý tưởng cốt lõi：**Git repository là nguồn sự thật duy nhất của cơ sở hạ tầng**

Quy trình làm việc：

```
1. Sửa tệp cấu hình (push tới Git)
   ↓
2. Thay đổi Git repository kích hoạt CI/CD
   ↓
3. Tự động thực thi terraform apply/kubectl apply
   ↓
4. Cơ sở hạ tầng tự động cập nhật
   ↓
5. Giám sát so sánh trạng thái thực tế với trạng thái mong muốn
```

**Công cụ**：ArgoCD, Flux (triển khai Kubernetes)

---

## 10. Tóm tắt và Best Practices

Vận hành là một hệ thống khổng lồ, nhưng cốt lõi có thể tóm gọn thành：

### 10.1 Mô hình trưởng thành vận hành

| Cấp độ     | Đặc điểm               | Thực hành                           |
| :------- | :----------------- | :----------------------------- |
| **Sơ cấp** | Phản hồi thụ động, vận hành thủ công | Xử lý khi có vấn đề, triển khai thủ công         |
| **Trung cấp** | Tự động hóa, chuẩn hóa     | CI/CD, giám sát cảnh báo, tài liệu hóa        |
| **Cao cấp** | Phòng chống chính, tự chữa lành     | Kế hoạch năng lực, tập nạo sự cố, tự động mở rộng co lại |
| **Chuyên gia** | Trí tuệ nhân tạo hóa, không người trực     | AIOps, chaos engineering, Serverless    |

### 10.2 Một ngày của kỹ sư vận hành

```
09:00 - Kiểm tra cảnh báo ban đêm, xác nhận trạng thái hệ thống
10:00 - Xử lý phản hồi người dùng về vấn đề
11:00 - Tham gia cuộc họp tuần của R&D, đánh giá rủi ro vận hành của kế hoạch mới
14:00 - Tối ưu hóa slow query, cải thiện hiệu năng
15:00 - Code Review
16:00 - Viết tài liệu triển khai, cập nhật quy tắc giám sát
17:00 - Tập nạo sự cố (Chaos Engineering)
18:00 - Bàn giao ca trực
```

### 10.3 Hành trình học tập

**Giai đoạn sơ cấp** (1-3 tháng)：

- Học lệnh Linux phổ biến
- Hiểu hệ thống giám sát (Prometheus + Grafana)
- Nắm vững truy vấn nhật ký (ELK)

**Giai đoạn trung cấp** (3-6 tháng)：

- Hiểu sâu công nghệ container (Docker + K8s)
- Nắm vững một công cụ chẩn đoán (Arthas, tcpdump)
- Thực hành pipeline CI/CD

**Giai đoạn cao cấp** (6-12 tháng)：

- Tuning hiệu năng (database, JVM, mạng)
- Kế hoạch năng lực và tối ưu hóa chi phí
- Phân tích sự cố và cải tiến quy trình

**Giai đoạn chuyên gia** (trên 1 năm)：

- Thiết kế kiến trúc (high availability, disaster recovery)
- Chaos engineering (chủ động gây sự cố)
- AIOps (intelligent operations)

---

## 11. Bảng tra cứu nhanh thuật ngữ (Glossary)

| Thuật ngữ            | Giải thích đầy đủ                              | Ý nghĩa                                           |
| :-------------- | :-------------------------------- | :--------------------------------------------- |
| **Monitoring**  | -                                 | Giám sát, quan sát thời gian thực trạng thái hoạt động hệ thống.                   |
| **Alerting**    | -                                 | Cảnh báo, thông báo cho người liên quan khi bất thường.                     |
| **Logging**     | -                                 | Nhật ký, ghi lại các sự kiện trong quá trình hoạt động hệ thống.               |
| **Tracing**     | -                                 | Tracing, theo dõi đường dẫn hoàn chỉnh của yêu cầu trong hệ thống phân tán.   |
| **QPS**         | Queries Per Second                | Số yêu cầu mỗi giây, đo lường thông lượng hệ thống.                   |
| **Latency**     | -                                 | Độ trễ, thời gian từ khi yêu cầu được gửi đến phản hồi.                 |
| **RTO**         | Recovery Time Objective           | Mục tiêu thời gian phục hồi, dịch vụ bị gián đoạn tối đa bao lâu.               |
| **RPO**         | Recovery Point Objective          | Mục tiêu điểm phục hồi, mất tối đa bao nhiêu dữ liệu.                 |
| **Post-mortem** | -                                 | Phân tích sự cố, phân tích nguyên nhân sự cố và biện pháp cải tiến.             |
| **CI/CD**       | Continuous Integration/Delivery   | Tích hợp liên tục/Giao hàng liên tục, test và triển khai tự động.         |
| **IaC**         | Infrastructure as Code            | Cơ sở hạ tầng như mã, dùng code quản lý máy chủ, mạng, v.v. |
| **GitOps**      | -                                 | Git vận hành, Git repository là nguồn sự thật duy nhất của cơ sở hạ tầng.   |
| **ELK**         | Elasticsearch + Logstash + Kibana | Thu thập, lưu trữ, trực quan hóa nhật ký ba bộ công cụ.                 |
| **SLA**         | Service Level Agreement           | Thỏa thuận mức dịch vụ, cam kết tính sẵn sàng dịch vụ (như 99.9%).   |
| **Blameless**   | -                                 | Văn hóa không trách móc, phân tích tập trung vào cải tiến quy trình chứ không phải trách nhiệm cá nhân.     |

---

## 12. Đọc thêm

- **[Thiết kế cache hệ thống](/vi-vn/appendix/4-server-and-backend/caching)** - Nguyên lý cache, mô hình và best practices
- **[Thiết kế hàng đợi tin nhắn](/vi-vn/appendix/4-server-and-backend/message-queues)** - Đỉnh cao điền thấp, giải nén bất đồng bộ
- **[Nguyên tắc xác thực và thực hành](/vi-vn/appendix/4-server-and-backend/auth-authorization)** - Xác thực ủy quyền, gia cố bảo mật
- **[Lịch sử phát triển backend](/vi-vn/appendix/4-server-and-backend/backend-layered-architecture)** - Từ đơn thể đến microservice đến Serverless
- **[Triển khai và phát hành](/vi-vn/appendix/7-infrastructure-and-operations/ci-cd)** - Bước cuối cùng từ phát triển đến sản xuất
