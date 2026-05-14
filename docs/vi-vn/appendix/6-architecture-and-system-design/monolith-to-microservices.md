# Từ Đơn thể đến Vi dịch vụ: Quá trình Tiến hóa

::: tip Lời mở đầu
**Không có kiến trúc nào là "tốt nhất", chỉ có "phù hợp nhất với giai đoạn hiện tại".** Từ đơn thể đến vi dịch vụ không phải là một bước nhảy vãng một, mà là quá trình tiến hóa từng bước theo sự tăng trưởng của quy mô kinh doanh và quy mô đội ngũ. Tách nhỏ vi dịch vụ quá sớm và quá muộn đều nguy hiểm.
:::

**Bài viết này sẽ dạy bạn những gì?**

Sau khi học xong chương này, bạn sẽ có được:

- **Đường dẫn tiến hóa**: Hiểu bốn giai đoạn từ đơn thể đến vi dịch vụ
- **Thời điểm tách nhỏ**: Biết khi nào nên tách, khi nào không nên tách
- **Chiến lược tách nhỏ**: Nắm vững phương pháp luận tách theo miền kinh doanh
- **Mô hình giao tiếp**: Hiểu sự lựa chọn giữa giao tiếp đồng bộ và không đồng bộ giữa các dịch vụ
- **Tách dữ liệu**: Hiểu những thách thức và giải pháp của tách cơ sở dữ liệu

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|-----------------|
| **Chương 1** | Đường dẫn tiến hóa kiến trúc | Đơn thể → Modular hóa → SOA → Vi dịch vụ |
| **Chương 2** | Thời điểm và nguyên tắc tách nhỏ | Định luật Conway, Tự chủ đội ngũ |
| **Chương 3** | Chiến lược tách nhỏ | DDD Bounded Context, Mô hình Strangler |
| **Chương 4** | Giao tiếp dịch vụ | REST, gRPC, Message Queue |
| **Chương 5** | Tách dữ liệu | Tách cơ sở dữ liệu, Đồng bộ dữ liệu |

---

## 1. Đường dẫn tiến hóa kiến trúc

Tiến hóa kiến trúc không phải là do công nghệ thúc đẩy, mà là **do quy mô tổ chức thúc đẩy**. Khi đội ngũ phát triển từ 5 người lên 500 người, hiệu quả hợp tác của kiến trúc đơn thể sẽ giảm mạnh.

| Giai đoạn | Kiến trúc | Quy mô đội ngũ | Đặc điểm |
|-----------|----------|----------------|---------|
| Giai đoạn khởi động | Ứng dụng đơn thể | 1~10 người | Tất cả mã trong một dự án, triển khai đơn giản |
| Giai đoạn tăng trưởng | Đơn thể được modular hóa | 10~50 người | Mã chia theo module, nhưng vẫn triển khai cùng nhau |
| Giai đoạn mở rộng | SOA (Hướng dịch vụ) | 50~200 người | Tách theo dòng kinh doanh thành dịch vụ hạt thô |
| Giai đoạn quy mô | Vi dịch vụ | 200+ người | Dịch vụ hạt mịn, mỗi đội ngũ phát triển và triển khai độc lập |

<ArchEvolutionDemo />

::: tip Định luật Conway
"Tổ chức thiết kế hệ thống, kiến trúc do chúng tạo ra sẽ tương đương với cấu trúc giao tiếp của tổ chức đó."——Melvin Conway

Nói cách khác: 3 đội ngũ làm một hệ thống, cuối cùng sẽ thành 3 dịch vụ. Bản chất của tách nhỏ kiến trúc là **tách nhỏ tổ chức**.

**Định luật Conway ngược**: Vì cấu trúc tổ chức xác định kiến trúc hệ thống, vậy thì muốn kiến trúc như thế nào, trước tiên hãy điều chỉnh cấu trúc tổ chức như vậy. Ví dụ, bạn muốn tách ra một dịch vụ thanh toán độc lập, thì trước tiên hãy thành lập một đội ngũ thanh toán độc lập. Nhiều công ty thất bại trong tách vi dịch vụ, không phải do vấn đề công nghệ, mà do tổ chức không điều chỉnh theo.
:::

---

## 2. Khi nào nên tách vi dịch vụ?

Không phải tất cả các hệ thống đều cần vi dịch vụ. Tách quá sớm sẽ gây ra độ phức tạp không cần thiết.

| Tín hiệu | Giải thích | Khuyến nghị |
|---------|-----------|-----------|
| Xung đột triển khai thường xuyên | Nhiều đội ngũ sửa đổi cùng một kho mã, thường xuyên xung đột | Xem xét tách nhỏ |
| Module nào đó cần mở rộng độc lập | Module tìm kiếm cần 10 lần tài nguyên so với các module khác | Xem xét tách nhỏ |
| Cần phân hóa ngôn ngữ lập trình | Module AI dùng Python, trang chính dùng Java | Xem xét tách nhỏ |
| Đội ngũ < 10 người | Chi phí giao tiếp thấp, đơn thể đủ | Đừng tách |
| Kinh doanh vẫn còn giai đoạn khám phá | Nhu cầu thay đổi nhanh, ranh giới không rõ ràng | Đừng tách |
| Không có khả năng DevOps | Không có CI/CD, container hóa, hệ thống giám sát | Đừng tách |

---

## 3. Chiến lược tách nhỏ

### 3.1 Tách theo miền kinh doanh (Bounded Context của DDD)

DDD (Thiết kế hướng miền) Bounded Context (Ngữ cảnh giới hạn) là nguyên tắc hướng dẫn tốt nhất để tách vi dịch vụ. Mỗi Bounded Context tương ứng với một miền kinh doanh độc lập, có mô hình dữ liệu và quy tắc kinh doanh riêng.

**Bounded Context là gì?** Cùng một từ trong các miền kinh doanh khác nhau có ý nghĩa khác nhau. Chẳng hạn, "người dùng" trong miền người dùng là thông tin đăng ký (tên, email), trong miền đơn hàng là người đặt hàng (địa chỉ giao hàng, phương thức thanh toán), trong miền đề xuất là hồ sơ hành vi (lịch sử duyệt, thẻ ưu tiên). Bounded Context chính là xác định một ranh giới, trong ranh giới đó, các thuật ngữ và mô hình có ý nghĩa rõ ràng và thống nhất.

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ Miền người dùng│  │ Miền đơn hàng │  │ Miền thanh toán│
│             │  │             │  │             │
│ User        │  │ Order       │  │ Payment     │
│ Profile     │  │ OrderItem   │  │ Refund      │
│ Address     │  │ Cart        │  │ Transaction │
│             │  │             │  │             │
│ Dịch vụ người dùng│ Dịch vụ đơn hàng│ Dịch vụ thanh toán│
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       └────── Gọi API / Giao tiếp sự kiện ───────┘
```

| Bounded Context | Thực thể cốt lõi | Dịch vụ tương ứng |
|----------------|-----------------|-----------------|
| Miền người dùng | User, Profile, Address | Dịch vụ người dùng |
| Miền sản phẩm | Product, Category, SKU | Dịch vụ sản phẩm |
| Miền đơn hàng | Order, OrderItem | Dịch vụ đơn hàng |
| Miền thanh toán | Payment, Refund | Dịch vụ thanh toán |
| Miền vận chuyển | Shipment, Tracking | Dịch vụ vận chuyển |

### 3.2 Mô hình Strangler (Mô hình Cổ Thụ Siết Chết)

Đừng viết lại toàn bộ đơn thể một lần, mà hãy từng bước thay thế các module cũ bằng các dịch vụ mới, giống như cổ thụ siết chết:

1. Tạo dịch vụ mới bên ngoài đơn thể
2. Định tuyến một phần lưu lượng đến dịch vụ mới thông qua lớp proxy
3. Sau khi xác minh dịch vụ mới ổn định, dần dần di chuyển lưu lượng nhiều hơn
4. Cuối cùng hoàn toàn thay thế module cũ

---

## 4. Mô hình giao tiếp dịch vụ

| Cách | Giao thức | Đặc điểm | Trường hợp sử dụng |
|-----|---------|---------|-----------------|
| REST | HTTP/JSON | Đơn giản, phổ quát, hệ sinh thái tốt | API đối ngoại, thao tác CRUD |
| gRPC | HTTP/2 + Protobuf | Hiệu suất cao, kiểu mạnh | Gọi thường xuyên giữa các dịch vụ nội bộ |
| Message Queue | AMQP/Kafka | Không đồng bộ, giải hợp tác, cắt đỉnh làm chậm | Thông báo sự kiện, tác vụ không đồng bộ |
| GraphQL | HTTP/JSON | Khách hàng truy vấn theo nhu cầu | Lớp BFF, điện thoại di động |

::: tip Lựa chọn giữa đồng bộ vs không đồng bộ
- **Cần trả lại kết quả ngay lập tức** → Đồng bộ (REST/gRPC)
- **Không cần trả lại ngay lập tức** → Không đồng bộ (Message Queue)
- **Một sự kiện kích hoạt nhiều hành động** → Không đồng bộ (Phát hành-Đăng ký)

Quy tắc kinh nghiệm: Có thể không đồng bộ thì không đồng bộ, chuỗi gọi đồng bộ càng dài, hệ thống càng yếu.
:::

---

## 5. Tách dữ liệu: Phần khó nhất

Phần đau khổ nhất khi tách vi dịch vụ không phải là tách mã, mà là tách cơ sở dữ liệu. Mỗi dịch vụ nên sở hữu cơ sở dữ liệu riêng, nhưng điều này có nghĩa là truy vấn giữa các dịch vụ trở nên khó khăn.

| Thách thức | Miêu tả | Giải pháp |
|-----------|--------|---------|
| JOIN qua dịch vụ | Không thể JOIN trực tiếp bảng của hai dịch vụ | Kết hợp API, dư thừa dữ liệu |
| Giao dịch phân tán | Giao dịch qua nhiều cơ sở dữ liệu không thể dùng giao dịch cục bộ | Saga, bảng thông báo cục bộ |
| Tính nhất quán dữ liệu | Dữ liệu của nhiều dịch vụ có thể tạm thời không nhất quán | Tính nhất quán cuối cùng, hướng sự kiện |
| Di chuyển dữ liệu | Di chuyển từ thư viện chung sang thư viện độc lập | Ghi kép quá độ, công cụ đồng bộ dữ liệu |

---

## Tóm tắt

Từ đơn thể đến vi dịch vụ là một quá trình dần dần, không phải một cuộc cách mạng trong một bước.

Hãy nhìn lại những điểm chính của chương này:

1. **Đường dẫn tiến hóa**: Đơn thể → Đơn thể được modular hóa → SOA → Vi dịch vụ, mỗi bước đều có động lực rõ ràng
2. **Thời điểm tách nhỏ**: Quy mô đội ngũ, xung đột triển khai, nhu cầu mở rộng là những tín hiệu tách nhỏ
3. **Chiến lược tách nhỏ**: Dùng Bounded Context của DDD để hướng dẫn tách nhỏ, dùng mô hình Strangler để di chuyển dần dần
4. **Lựa chọn giao tiếp**: Có thể không đồng bộ thì không đồng bộ, chuỗi gọi đồng bộ càng ngắn càng tốt
5. **Tách dữ liệu**: Khó nhất nhưng cũng quan trọng nhất, chấp nhận tính nhất quán cuối cùng là thay đổi tâm thế chính

## Đọc thêm

- [Building Microservices](https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/) - Kinh điển vi dịch vụ của Sam Newman
- [Monolith to Microservices](https://www.oreilly.com/library/view/monolith-to-microservices/9781492047834/) - Hướng dẫn di chuyển dần dần
- [Domain-Driven Design](https://www.domainlanguage.com/ddd/) - Kinh điển DDD của Eric Evans
- [The Strangler Fig Pattern](https://martinfowler.com/bliki/StranglerFigApplication.html) - Mô hình Strangler của Martin Fowler
