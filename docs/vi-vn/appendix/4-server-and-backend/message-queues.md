# Hàng đợi tin nhắn và Kiến trúc hướng theo sự kiện
::: tip 🎯 Vấn đề cốt lõi
**Khi hệ thống bị liên kết chặt chẽ và lưu lượng tăng đột ngột, làm cách nào để đảm bảo tính ổn định của luồng công việc cốt lõi?** Hàng đợi tin nhắn là "bộ đệm" và "bộ tách khớp" của hệ thống phân tán hiện đại. Bài viết này sẽ đi sâu vào phải học và thực tiễn kỹ thuật của thiết kế hàng đợi tin nhắn thông qua các trường hợp thực tế (hệ thống gọi khách hàng ở nhà hàng, phân loại bưu kiện, hệ thống mua hàng trong tích tắc).
:::

---

## 1. Tại sao bạn cần "Hàng đợi tin nhắn"?

### 1.1 Bắt đầu từ một trường hợp thực tế: Sự phát triển hệ thống đơn hàng của Taobao

Năm 2012, hệ thống đơn hàng của Taobao gặp phải một sự cố nghiêm trọng. Vào lúc 0 giờ ngày 11/11, lưu lượng truy cập tăng vọt, dịch vụ đơn hàng gọi trực tiếp dịch vụ tồn kho, dịch vụ thanh toán, dịch vụ vận chuyển... toàn bộ luồng công việc sụp đổ như những quân cờ domino liên tiếp.

**Kiến trúc lúc đó (liên kết chặt chẽ):**

```
Người dùng đặt hàng → Dịch vụ đơn hàng → Gọi dịch vụ tồn kho một cách đồng bộ → Gọi dịch vụ thanh toán một cách đồng bộ → Gọi dịch vụ vận chuyển một cách đồng bộ
                    ↓                    ↓                    ↓
                 Phản hồi 200ms     Phản hồi 500ms     Phản hồi 300ms
```

::: warning ⚠️ Vấn đề chết người của liên kết chặt chẽ

- **Tổng thời gian phản hồi** = 200 + 500 + 300 = 1000ms (người dùng chờ 1 giây)
- **Dịch vụ tồn kho sập** → dịch vụ đơn hàng cũng sập (nhóm luồng cạn kiệt)
- **Dịch vụ thanh toán chậm** → toàn bộ luồng công việc bị kéo xuống
- **Không thể mở rộng theo chiều ngang** → chỉ có thể thêm máy (đắt tiền và có giới hạn)
  :::

**Kiến trúc được cải thiện (giới thiệu hàng đợi tin nhắn):**

```
Người dùng đặt hàng → Dịch vụ đơn hàng → Gửi tin nhắn "Đơn hàng đã tạo" → Trả lại ngay (50ms)
                              ↓
                        Hàng đợi tin nhắn (Kafka)
                              ↓
        ┌─────────────┬─────────────┬─────────────┐
        ▼             ▼             ▼             ▼
   Dịch vụ tồn kho  Dịch vụ thanh toán  Dịch vụ vận chuyển  Dịch vụ thông báo
   (trừ dần không đồng bộ)  (xử lý không đồng bộ)  (tạo không đồng bộ)  (gửi không đồng bộ)
```

::: tip ✨ Hiệu quả sau khi cải thiện

- **Thời gian phản hồi người dùng** = 50ms (cải thiện trải nghiệm 20 lần)
- **Dịch vụ tồn kho sập** → tin nhắn được lưu trữ tạm thời trong hàng đợi, tiếp tục xử lý sau khi khôi phục
- **Dịch vụ thanh toán chậm** → không ảnh hưởng đến việc tạo đơn hàng
- **Có thể mở rộng theo chiều ngang** → thêm thực thể tiêu dùng
  :::

### 1.2 Ẩn dụ cuộc sống của hàng đợi tin nhắn

**Hệ thống gọi khách hàng ở nhà hàng**

Tưởng tượng bạn đi đến một nhà hàng nổi tiếng:

- **Không có hệ thống gọi khách hàng**: Khách phải đứng chờ tại cửa sổ, cửa sổ có giới hạn, những người phía sau xếp hàng dài, nhà hàng chịu áp lực lớn
- **Có hệ thống gọi khách hàng**: Sau khi gọi món, bạn nhận được một số, có thể ngồi xuống trước, khi gọi số của bạn thì tới lấy thức ăn

**Hàng đợi tin nhắn chính là "hệ thống gọi khách hàng" của hệ thống phần mềm**:

- **Người sản xuất** (khách gọi món) → đặt tin nhắn (đơn hàng) vào hàng đợi
- **Hàng đợi** (máy gọi khách hàng) → lưu trữ tin nhắn tạm thời
- **Người tiêu dùng** (đầu bếp) → xử lý tin nhắn theo tốc độ của riêng mình

<PeakShavingDemo />

---

## 2. Hàng đợi tin nhắn là gì? (Định nghĩa + Ba yếu tố cốt lõi)

### 2.1 "Hàng đợi tin nhắn" là gì?

::: tip 🤔 Giải thích thuật ngữ
**Hàng đợi tin nhắn (Message Queue, MQ)** là một vùng chứa lưu trữ tin nhắn, người sản xuất đặt tin nhắn vào đó, người tiêu dùng lấy tin nhắn từ đó để xử lý. Nó thực hiện "giao tiếp không đồng bộ" — bên gửi không cần chờ bên nhận xử lý xong.

**Đồng bộ vs Không đồng bộ**:

- **Đồng bộ**: Giống như gọi điện, đối phương phải nghe máy mới có thể giao tiếp
- **Không đồng bộ**: Giống như gửi tin nhắn, gửi rồi thôi, đối phương có thời gian rảnh rồi xem

Điều này giống như gọi điện cho bạn (đồng bộ) vs gửi tin nhắn (không đồng bộ).
:::

### 2.2 Ba yếu tố cốt lõi của hàng đợi tin nhắn

#### Yếu tố thứ nhất: Người sản xuất (Producer)

**Trách nhiệm**: Tạo và gửi tin nhắn đến hàng đợi.

**Ẩn dụ cuộc sống**: Người sản xuất giống như "người gửi", đặt thư (tin nhắn) vào bưu điện (hàng đợi).

::: details Điểm thiết kế chính

- **Cách gửi**: Gửi đồng bộ (đáng tin cậy nhưng chặn) vs gửi không đồng bộ (hiệu năng cao nhưng cần xử lý callback)
- **Xác nhận tin nhắn**: Chờ xác nhận Broker (At Least Once) vs gửi và quên (At Most Once)
- **Xử lý lỗi**: Chiến lược thử lại, sao lưu nhật ký cục bộ, hàng đợi thư chết
  :::

#### Yếu tố thứ hai: Người tiêu dùng (Consumer)

**Trách nhiệm**: Lấy tin nhắn từ hàng đợi và xử lý.

**Ẩn dụ cuộc sống**: Người tiêu dùng giống như "người nhận", lấy thư (tin nhắn) từ hộp thư (hàng đợi) và xử lý.

::: details Điểm thiết kế chính

- **Chế độ tiêu thụ**: Chế độ Push (Broker chủ động đẩy) vs chế độ Pull (người tiêu dùng chủ động kéo)
- **Xác nhận tiêu thụ**: Tự động ACK (hiệu quả nhưng có thể mất tin nhắn) vs ACK thủ công (đáng tin cậy nhưng cần xử lý hết thời gian chờ)
- **Kiểm soát đồng thời**: Tiêu thụ tuần tự luồng duy nhất vs tiêu thụ song song đa luồng
- **Xử lý lỗi**: Chiến lược thử lại, hàng đợi thư chết, cơ chế bù đắp
  :::

#### Yếu tố thứ ba: Broker (Bộ trung gian tin nhắn)

**Trách nhiệm**: Nhận, lưu trữ, chuyển tiếp tin nhắn.

**Ẩn dụ cuộc sống**: Broker giống như "bưu điện" hoặc "trạm trung chuyển bưu kiện", chịu trách nhiệm nhận, phân loại, gửi thư.

::: details Điểm thiết kế chính

- **Mô hình lưu trữ**: Lưu trữ bộ nhớ (độ trễ thấp) vs lưu trữ đĩa (độ tin cậy cao)
- **Chiến lược nhân bản**: Nhân bản master-slave, đồng bộ đa bản sao
- **Cơ chế khả dụng cao**: Triển khai cụm, chuyển đổi dự phòng tự động
- **Khả năng mở rộng**: Phân vùng (Partition), chia nhỏ (Sharding)
  :::

---

## 3. Vấn đề cốt lõi thứ nhất: Làm cách nào để tách khớp hệ thống, tránh "rung động khắp nơi"?

### 3.1 Thảm họa liên kết chặt chẽ: một dịch vụ sập, tất cả đều thua

**Khôi phục lại tình huống**: Kiến trúc sơ kỳ của nền tảng thương mại điện tử nhất định

```
Dịch vụ đơn hàng gọi trực tiếp dịch vụ hạ nguồn:
┌─────────────┐
│  Dịch vụ    │
│   đơn hàng  │
└──────┬──────┘
       │
       ├───────────┬───────────┬───────────┐
       ▼           ▼           ▼           ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│Dịch vụ   │ │Dịch vụ   │ │Dịch vụ   │ │Dịch vụ   │
│ tồn kho  │ │thanh toán│ │vận chuyển│ │   SMS    │
│ 200ms    │ │ 500ms    │ │ 300ms    │ │ 100ms    │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

::: tip 📊 Bảng phân tích điểm đau
| Điểm đau | Biểu hiện cụ thể | Hậu quả |
|------|----------|------|
| **Lỗi thác nước** | Dịch vụ tồn kho sập, dịch vụ đơn hàng gọi không đồng bộ hết thời gian chờ | Nhóm luồng dịch vụ đơn hàng cạn kiệt, không thể xử lý yêu cầu mới |
| **Độ trễ phản hồi** | Phải chờ tất cả dịch vụ hạ nguồn phản hồi | Người dùng chờ hơn 1 giây, trải nghiệm rất tệ |
| **Khó khăn mở rộng** | Thêm dịch vụ tích lũy điểm, cần sửa đổi mã dịch vụ đơn hàng | Chu kỳ phát hành kéo dài, rủi ro tăng |
| **Lãng phí tài nguyên** | Dịch vụ đơn hàng phải chờ dịch vụ SMS | Kết nối cơ sở dữ liệu bị chiếm dụng lâu |
:::

### 3.2 Giải pháp tách khớp: Giới thiệu hàng đợi tin nhắn làm "lớp trung gian"

**Kiến trúc sau khi tách khớp:**

```
Dịch vụ đơn hàng chỉ chịu trách nhiệm gửi tin nhắn, không quan tâm ai tiêu dùng:

┌─────────────┐
│  Dịch vụ    │ ──gửi tin nhắn "Đơn hàng đã tạo"──┐
│   đơn hàng  │                       │
└─────────────┘                       ▼
                            ┌───────────────────┐
                            │   Hàng đợi tin    │
                            │  nhắn             │
                            │ (Kafka/RabbitMQ)  │
                            │  - Lưu trữ đáng   │
                            │    tin cậy        │
                            │  - Đa bản sao     │
                            │  - Đảm bảo thứ tự │
                            └─────────┬─────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
              ▼                       ▼                       ▼
       ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
       │ Dịch vụ      │      │ Dịch vụ      │      │ Dịch vụ      │
       │ tồn kho      │      │thanh toán    │      │vận chuyển    │
       │ Đăng ký sự   │      │ Đăng ký sự   │      │ Đăng ký sự   │
       │kiện đơn hàng │      │kiện đơn hàng │      │kiện đơn hàng │
       └──────────────┘      └──────────────┘      └──────────────┘
```

<DecouplingDemo />

::: tip ✨ Lợi ích tách khớp
| Chiều kích | Trước tách khớp | Sau tách khớp |
|------|--------|--------|
| **Cách ly lỗi** | Tồn kho sập = đơn hàng sập | Tồn kho sập, tin nhắn lưu trữ tạm thời trong hàng đợi, xử lý tiếp tục sau khi phục hồi |
| **Thời gian phản hồi** | 1000ms (chờ đồng bộ) | 50ms (gửi tin nhắn thì trả lại) |
| **Khả năng mở rộng** | Thêm dịch vụ cần sửa đổi mã đơn hàng | Thêm dịch vụ chỉ cần đăng ký chủ đề |
| **Độ phức tạp hệ thống** | Dịch vụ đơn hàng phụ thuộc mạnh vào hạ nguồn | Dịch vụ đơn hàng chỉ phụ thuộc vào hàng đợi tin nhắn |
:::

### 3.3 Bản chất tách khớp: từ "gọi trực tiếp" đến "kiến trúc hướng theo sự kiện"

**Sự thay đổi tư duy:**

```
Tư duy truyền thống (mệnh lệnh):
"Dịch vụ đơn hàng lệnh dịch vụ tồn kho: hãy trừ tồn kho cho tôi!"
  ↓ Gọi trực tiếp
  ↓ Độ liên kết cao, bên được gọi phải trực tuyến
  ↓ Bên gọi cần biết giao diện của bên được gọi

Tư duy kiến trúc hướng theo sự kiện (khai báo):
"Dịch vụ đơn hàng tuyên bố: đơn hàng đã tạo, ai quan tâm hãy xử lý."
  ↓ Gửi sự kiện đến hàng đợi tin nhắn
  ↓ Tách khớp, người tiêu dùng có thể ngoại tuyến
  ↓ Người sản xuất không cần biết sự tồn tại của người tiêu dùng
```

---

## 4. Vấn đề cốt lõi thứ hai: Làm cách nào để cắt đỉnh làm trơn đáy, ứng phó với sự tăng đột ngột lưu lượng?

### 4.1 Tình huống mua hàng trong tích tắc: 10 vạn QPS được xử lý trơn tru như thế nào?

**Khôi phục lại tình huống**: Một nền tảng thương mại điện tử hoạt động mua hàng trong tích tắc vào ngày 11/11, dự kiến đỉnh là 10 vạn QPS, nhưng cơ sở dữ liệu chỉ có thể chịu được 1000 QPS.

**Hậu quả tác động trực tiếp:**

```
Yêu cầu người dùng ──→ Máy chủ ứng dụng ──→ Cơ sở dữ liệu
  10 vạn/s       10 vạn/s          1000/s (giới hạn)
                              ↓
                         Nhóm kết nối cạn kiệt
                         Phản hồi hết thời gian chờ
                         Cơ sở dữ liệu sập
                              ↓
                         Hiệu ứng tuyết lở (tất cả dịch vụ phụ thuộc cơ sở dữ liệu đều sập)
```

::: tip 🌊 Giải thích thuật ngữ
**QPS (Queries Per Second)**: Số lượng truy vấn mỗi giây, chỉ tiêu đo lường khả năng xử lý của hệ thống.

**10 vạn QPS** có nghĩa là mỗi giây có 10 vạn yêu cầu, giống như 10 vạn người cùng một lúc chạy vào cửa hàng.
:::

### 4.2 Giải pháp cắt đỉnh làm trơn đáy: hàng đợi tin nhắn làm "bể chứa nước"

**Thiết kế kiến trúc:**

```
┌───────────────────────────────────────────────────────────────────────┐
│                        Kiến trúc hệ thống mua hàng trong tích tắc        │
├───────────────────────────────────────────────────────────────────────┤
│                                                               │
│  Lớp thứ nhất: Lớp cổng (Giới hạn lưu lượng cứng)                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  - Giới hạn bộ token: 10 vạn/s → 1 vạn/s (loại bỏ 90% yêu cầu)│  │
│  │  - CDN lưu cache tài nguyên tĩnh (trang chi tiết sản phẩm)     │  │
│  │  - Trang xác minh mã / hàng chờ (cắt đỉnh lần thứ nhất)        │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                            │                                 │
│                            ▼                                 │
│  Lớp thứ hai: Lớp dịch vụ (Giới hạn lưu lượng mềm)                   │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  - Giới hạn Nginx: 1 vạn/s → 5000/s                          │  │
│  │  - Tồn kho sơ cấp Redis (hoạt động nguyên tử):              │  │
│  │    * Sử dụng tập lệnh Lua đảm bảo tính nguyên tử              │  │
│  │    * Tồn kho không đủ trả về ngay "Đã bán hết"              │  │
│  │  - Tạo thẻ đơn hàng (chứng chỉ hàng chờ)                     │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                            │                                 │
│                            ▼                                 │
│  Lớp thứ ba: Lớp hàng đợi tin nhắn (Cắt đỉnh cốt lõi)               │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Kafka/RocketMQ:                                              │  │
│  │  - Ghi hàng loạt: 5000/s → 1000/s (khả năng cơ sở dữ liệu)  │  │
│  │  - Tin nhắn tồn tại lâu dài: đảm bảo không mất tin nhắn      │  │
│  │  - Tiêu thụ song song đa phân vùng: tăng thông lượng         │  │
│  │  - Quản lý vị trí tiêu thụ: hỗ trợ phục hồi lỗi              │  │
│  │                                                               │  │
│  │  Chỉ tiêu quan trọng để theo dõi:                             │  │
│  │  - Tỉ lệ sản xuất (Produce Rate)                              │  │
│  │  - Tỉ lệ tiêu thụ (Consume Rate)                              │  │
│  │  - Tích lũy tin nhắn (Lag)                                    │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                            │                                 │
│                            ▼                                 │
│  Lớp thứ tư: Lớp tiêu thụ (Xử lý không đồng bộ)                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Người tiêu dùng xử lý đơn hàng (đa thực thể):               │  │
│  │  - Kéo tin nhắn từ Kafka (1000/s, khớp với khả năng cơ sở dữ liệu)│
│  │  - Giao dịch cơ sở dữ liệu: tạo đơn hàng + trừ tồn kho       │  │
│  │  - Cập nhật trạng thái đơn hàng thành "Đã tạo"               │  │
│  │  - Gửi thông báo tạo đơn hàng thành công (email/SMS/đẩy)    │  │
│  │  - Xác nhận tin nhắn được tiêu thụ (ACK)                     │  │
│  │                                                               │  │
│  │  Chiến lược mở rộng người tiêu dùng:                         │  │
│  │  - Khi Lag > 10000, tự động thêm thực thể người tiêu dùng    │  │
│  │  - Khi Lag < 1000, giảm thực thể người tiêu dùng (tiết kiệm) │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                               │
└───────────────────────────────────────────────────────────────────────┘
```

<PeakShavingDemo />

### 4.3 Nguyên tắc toán học của cắt đỉnh làm trơn đáy

**Hiệu quả làm trơn lưu lượng:**

```
Lưu lượng ban đầu (đỉnh sắc):                Lưu lượng sau làm trơn:

10 vạn/s │    ╱╲                  1000/s │████████████████
       │   ╱  ╲                        │
       │  ╱    ╲                       │
 1000/s│╱        ╲                 0/s │
       └───────────────               └────────────────
       0s   1s   2s                   0s              20s

Ban đầu: 10 vạn/s đỉnh, kéo dài 1 giây
Làm trơn: 1000/s tốc độ không đổi, kéo dài 100 giây
```

**Công thức chính:**

```
Độ dài hàng đợi = Tỉ lệ nhà sản xuất × Thời gian kéo dài - Tỉ lệ nhà tiêu dùng × Thời gian kéo dài
        = 100,000 × 1 - 1,000 × 1
        = 99,000 tin nhắn (tích lũy đỉnh trong hàng đợi)

Thời gian cần thiết để tiêu thụ tất cả tin nhắn = Độ dài hàng đợi / Tỉ lệ nhà tiêu dùng
                      = 99,000 / 1,000
                      = 99 giây
```

---

## 5. Vấn đề cốt lõi thứ ba: Làm cách nào để đảm bảo tin nhắn không bị mất, không bị lặp, có thứ tự?

### 5.1 Độ tin cậy tin nhắn: ba tuyến phòng thủ

Tin nhắn có thể bị mất trong ba giai đoạn: khi nhà sản xuất gửi, khi Broker lưu trữ, khi nhà tiêu dùng xử lý.

::: warning 🛡️ Ba tuyến phòng thủ
**Tuyến phòng thủ thứ nhất: Xác nhận nhà sản xuất (Producer ACK)**

- Khi gửi tin nhắn, chờ Broker xác nhận đã nhận
- Nếu không nhận được xác nhận, thử lại hoặc ghi nhật ký cục bộ

**Tuyến phòng thủ thứ hai: Tồn tại lâu dài của Broker**

- Tin nhắn được ghi vào đĩa, không chỉ ở bộ nhớ
- Đa bản sao đồng bộ, đảm bảo không mất dữ liệu

**Tuyến phòng thủ thứ ba: Xác nhận nhà tiêu dùng (Consumer ACK)**

- Sau khi xử lý tin nhắn, xác nhận thủ công (ACK)
- Nếu xử lý thất bại, không xác nhận, Broker gửi lại
  :::

<ReliabilityDemo />

### 5.2 Làm cách nào để xử lý tiêu thụ lặp lại tin nhắn?

**Tiêu thụ lặp lại tin nhắn có thể xảy ra trong các tình huống sau:**

1. **Nhà sản xuất thử lại**: Nhà sản xuất gửi tin nhắn nhưng không nhận được ACK, thử lại gửi cùng một tin nhắn
2. **Hết thời gian chờ ACK người tiêu dùng**: Người tiêu dùng xử lý xong nhưng ACK hết thời gian chờ, Broker gửi lại
3. **Rung động mạng**: ACK của người tiêu dùng không tới Broker, Broker cho rằng chưa tiêu thụ
4. **Khởi động lại người tiêu dùng**: Người tiêu dùng khởi động lại, tiêu thụ lại cùng một loạt tin nhắn

::: tip 💡 Tính chất lũy đẳng (Idempotence)
**Tính chất lũy đẳng**: Cùng một hoạt động thực hiện nhiều lần và thực hiện một lần có hiệu quả giống nhau.

**Tính chất lũy đẳng trong cuộc sống**:

- **Lũy đẳng**: Nhấn nút thang máy (nhấn 10 lần và nhấn 1 lần, thang máy đều sẽ tới)
- **Không lũy đẳng**: Chuyển tiền (chuyển 10 đồng, thực hiện hai lần sẽ chuyển 20 đồng)

**Giải pháp kỹ thuật**: Tạo ID duy nhất cho mỗi tin nhắn, kiểm tra xem đã được xử lý chưa trước khi xử lý.
:::

<IdempotenceDemo />

---

## 6. Thực tiễn: Làm cách nào để chọn hàng đợi tin nhắn?

### 6.1 So sánh bốn hàng đợi tin nhắn chủ yếu

| Tính năng         | RabbitMQ     | Kafka        | RocketMQ       | Redis Stream |
| ------------ | ------------ | ------------ | -------------- | ------------ |
| **Vị trí**     | Hàng đợi tin nhắn truyền thống | Luồng nhật ký phân tán | Hàng đợi tin nhắn cấp độ thương mại điện tử | Hàng đợi nhẹ   |
| **Thông lượng**   | ~1 vạn/giây      | ~100 vạn/giây    | ~10 vạn/giây       | ~5 vạn/giây      |
| **Độ trễ**     | Mức micro giây       | Mức milli giây       | Mức milli giây         | Mức milli giây      |
| **Độ tin cậy**   | Cao (tồn tại lâu dài)   | Cao (đa bản sao)   | Cao (xả đĩa đồng bộ)   | Trung bình (AOF)      |
| **Quay lại tin nhắn** | Không hỗ trợ       | Hỗ trợ         | Hỗ trợ           | Hỗ trợ         |
| **Tin nhắn giao dịch** | Hỗ trợ (yếu)     | Không hỗ trợ       | Hỗ trợ (mạnh)       | Không hỗ trợ       |
| **Tin nhắn trì hoãn** | Hỗ trợ         | Không hỗ trợ       | Hỗ trợ           | Không hỗ trợ       |
| **Tình huống áp dụng** | Ứng dụng doanh nghiệp truyền thống | Nhật ký, dữ liệu lớn | Thương mại điện tử, tài chính     | Ứng dụng quy mô nhỏ   |

::: tip 💡 Gợi ý lựa chọn
**Cây quyết định:**

```
Lựa chọn hàng đợi tin nhắn:
│
├─ Cần tin nhắn giao dịch (giao dịch phân tán)?
│  ├─ Có → RocketMQ (lựa chọn hàng đầu) hoặc RabbitMQ
│  └─ Không → Tiếp tục
│
├─ Cần xử lý nhật ký/luồng lớn thời gian thực?
│  ├─ Có → Kafka (lựa chọn hàng đầu)
│  └─ Không → Tiếp tục
│
├─ QPS > 1 vạn/giây?
│  ├─ Có → RocketMQ hoặc Kafka
│  └─ Không → Tiếp tục
│
├─ Cần định tuyến phức tạp (như kết hợp headers)?
│  ├─ Có → RabbitMQ
│  └─ Không → Tiếp tục
│
├─ Đã có cơ sở hạ tầng Redis?
│  ├─ Có → Redis Stream (khởi động nhanh)
│  └─ Không → RabbitMQ (chức năng đầy đủ, đường cong học tập phù hợp)
```

:::

---

## 7. Tóm tắt: Tâm pháp thiết kế hàng đợi tin nhắn

### 7.1 Ôn lại nguyên tắc cốt lõi

| Nguyên tắc     | Ý nghĩa             | Điểm thực tiễn chính                                |
| -------- | ---------------- | --------------------------------------- |
| **Tách khớp** | Dịch vụ không phụ thuộc trực tiếp | Giao tiếp qua hàng đợi tin nhắn, lỗi nhà tiêu dùng không ảnh hưởng nhà sản xuất |
| **Cắt đỉnh** | Làm trơn lưu lượng biến động     | Hàng đợi tin nhắn làm bể chứa, nhà tiêu dùng xử lý ở tốc độ không đổi |
| **Tin cậy** | Tin nhắn không bị mất       | Xác nhận nhà sản xuất + tồn tại lâu dài Broker + xác nhận nhà tiêu dùng  |
| **Lũy đẳng** | Tiêu thụ lặp lại không ảnh hưởng   | Đảm bảo lũy đẳng ở lớp kinh doanh (khóa duy nhất, máy trạng thái)      |
| **Có thứ tự** | Đảm bảo thứ tự tin nhắn     | Phân vùng duy nhất có thứ tự hoặc sắp xếp ở lớp nhà tiêu dùng                |

### 7.2 Danh sách kiểm tra thiết kế

Trước khi giới thiệu hàng đợi tin nhắn, hãy tự hỏi mình những câu hỏi sau:

- [ ] Bạn có thực sự cần hàng đợi tin nhắn không? (xử lý không đồng bộ đơn giản có thể dùng nhóm luồng)
- [ ] Mất tin nhắn có thể chấp nhận được không? (quyết định mức độ độ tin cậy)
- [ ] Lặp lại tin nhắn có ảnh hưởng kinh doanh không? (quyết định đầu tư vào tính chất lũy đẳng)
- [ ] Thứ tự tin nhắn có quan trọng không? (quyết định chiến lược phân vùng)
- [ ] Khả năng xử lý của nhà tiêu dùng như thế nào? (quyết định kích thước hàng đợi và ngưỡng cảnh báo)
- [ ] Xử lý lỗi tiêu thụ như thế nào? (quyết định chiến lược thử lại và hàng đợi thư chết)

---

## 8. Bảng tra cứu thuật ngữ

| Thuật ngữ                    | Viết tắt              | Giải thích                                                            |
| ----------------------- | ----------------- | --------------------------------------------------------------- |
| **MQ**                  | Message Queue     | **Hàng đợi tin nhắn**. Phần mềm trung gian được sử dụng để giao tiếp không đồng bộ, thực hiện tách khớp giữa nhà sản xuất và nhà tiêu dùng.   |
| **Producer**            | -                 | **Nhà sản xuất**. Bên gửi tin nhắn.                                    |
| **Consumer**            | -                 | **Nhà tiêu dùng**. Bên nhận và xử lý tin nhắn.                              |
| **Broker**              | -                 | **Bộ trung gian tin nhắn**. Chương trình phía máy chủ lưu trữ và chuyển tiếp tin nhắn.                      |
| **Topic**               | -                 | **Chủ đề**. Phân loại logic của tin nhắn (như "orders").                         |
| **Queue**               | -                 | **Hàng đợi**. Vùng chứa vật lý lưu trữ tin nhắn.                                  |
| **Partition**           | -                 | **Phân vùng**. Khái niệm của Kafka, một Topic có thể được chia thành nhiều Partition, tăng tính đồng thời. |
| **ACK**                 | Acknowledgment    | **Xác nhận**. Nhà tiêu dùng xác nhận đã xử lý xong tin nhắn với Broker.                     |
| **Pub/Sub**             | Publish/Subscribe | **Xuất bản/Đăng ký**. Một mô hình tin nhắn, một tin nhắn có thể được nhiều nhà tiêu dùng nhận.         |
| **P2P**                 | Point-to-Point    | **Điểm-để-điểm**. Một mô hình tin nhắn, một tin nhắn chỉ có thể được một nhà tiêu dùng nhận.         |
| **DLQ**                 | Dead Letter Queue | **Hàng đợi thư chết**. Lưu trữ tin nhắn không thể tiêu thụ.                              |
| **Idempotence**         | -                 | **Tính chất lũy đẳng**. Kết quả của việc thực hiện nhiều lần giống như thực hiện một lần.                                  |
| **Throughput**          | -                 | **Thông lượng**. Số lượng tin nhắn được xử lý trong một đơn vị thời gian.                          |
| **Latency**             | -                 | **Độ trễ**. Khoảng thời gian từ khi tin nhắn được gửi đến khi được nhận.                          |
| **Persistence**         | -                 | **Tồn tại lâu dài**. Tin nhắn được ghi vào đĩa thay vì chỉ ở bộ nhớ.                         |
| **Replication**         | -                 | **Bản sao**. Để khả dụng cao, tin nhắn được sao chép đến nhiều nút.                     |
| **Transaction Message** | -                 | **Tin nhắn giao dịch**. Đảm bảo tính nhất quán giữa giao dịch cục bộ và gửi tin nhắn.                  |
| **Backpressure**        | -                 | **Áp lực ngược**. Khi nhà tiêu dùng không thể xử lý, thông báo cho nhà sản xuất giảm tốc độ.                   |
| **Offset**              | -                 | **Độ lệch**. Vị trí tiêu thụ của nhà tiêu dùng trong phân vùng.                          |
| **Rebalance**           | -                 | **Cân bằng lại**. Khi thành viên nhóm nhà tiêu dùng thay đổi, phân bổ lại phân vùng.                   |
