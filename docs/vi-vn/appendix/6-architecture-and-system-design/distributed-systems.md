# Những Thách Thức của Hệ Thống Phân Tán

::: tip Lời Nói Đầu
**Khi một máy không đủ, những vấn đề mới thực sự bắt đầu.** Hệ thống phân tán là nền tảng của Internet hiện đại — từ tin nhắn WeChat đến đơn hàng trên Taobao, phía sau là hàng trăm ngàn máy hoạt động phối hợp với nhau. Nhưng "phân tán" không phải là bữa ăn miễn phí, nó mang lại một loạt các thách thức mà hệ thống đơn máy chưa bao giờ gặp phải.
:::

**Bài viết này sẽ dạy bạn cái gì?**

Sau khi hoàn thành chương này, bạn sẽ nắm được:

- **Định lý cốt lõi**: Hiểu định lý CAP và ảnh hưởng của nó đến thiết kế hệ thống
- **Mô hình nhất quán**: Phân biệt nhất quán mạnh, nhất quán cuối cùng, nhất quán nhân quả
- **Tám thách thức chính**: Nắm vững những vấn đề cốt lõi mà hệ thống phân tán phải đối mặt
- **Thuật toán đồng thuận**: Hiểu ý tưởng cơ bản của Paxos, Raft và các thuật toán khác
- **Mô hình thực tế**: Làm quen với 2PC, Saga, CRDT và các giải pháp phổ biến khác

| Chương | Nội Dung | Khái Niệm Cốt Lõi |
|--------|---------|------------------|
| **Chương 1** | Tại sao cần hệ thống phân tán | Khả năng mở rộng, tính khả dụng, phân bố địa lý |
| **Chương 2** | Định lý CAP | Tính nhất quán, tính khả dụng, khả năng chịu đựng phân vùng |
| **Chương 3** | Mô hình nhất quán | Nhất quán mạnh, nhất quán cuối cùng, nhất quán nhân quả |
| **Chương 4** | Tám thách thức | Mạng, đồng hồ, phân vùng, phân tách não, v.v. |
| **Chương 5** | Thuật toán đồng thuận | Paxos, Raft, ZAB |
| **Chương 6** | Giao dịch phân tán | 2PC, Saga, TCC |

---

## 0. Toàn Cảnh: Tại Sao Cần Hệ Thống Phân Tán?

Hệ thống đơn máy đơn giản và đáng tin cậy, nhưng có ba cổ chai không thể vượt qua:

| Cổ Chai | Giải Thích | Giải Pháp Phân Tán |
|---------|-----------|------------------|
| Giới hạn hiệu năng | Đơn máy có CPU, bộ nhớ, ổ đĩa với giới hạn vật lý | Mở rộng ngang: thêm nhiều máy hơn để phân chia tải |
| Lỗi điểm duy nhất | Một máy gặp sự cố, toàn bộ dịch vụ gặp sự cố | Bản sao dự phòng: nhiều máy làm bản sao lưu cho nhau |
| Độ trễ địa lý | Người dùng ở khắp nơi trên thế giới, đơn máy chỉ ở một nơi | Triển khai nhiều nơi: phục vụ người dùng gần nhất |

::: tip Chi Phí của Phân Tán
Hệ thống phân tán giải quyết các vấn đề trên, nhưng lại giới thiệu độ phức tạp mới: mạng không đáng tin cậy, đồng hồ không đồng bộ, lỗi một phần, nhất quán dữ liệu... đây là những "thách thức" mà bài viết sẽ thảo luận.

**Tám Sai Lầm về Điện Toán Phân Tán của Peter Deutsch** cho chúng ta biết rằng các giả định sau đều sai trong môi trường phân tán:
1. Mạng là đáng tin cậy
2. Độ trễ bằng không
3. Băng thông là vô hạn
4. Mạng là an toàn
5. Cấu trúc không thay đổi
6. Chỉ có một quản trị viên
7. Chi phí truyền tải bằng không
8. Mạng là đồng nhất
:::

---

## 1. Định Lý CAP: "Tam Giác Không Thể" của Hệ Thống Phân Tán

Năm 2000, Eric Brewer đưa ra giả thuyết CAP (sau này được chứng minh là định lý): một hệ thống phân tán có thể đáp ứng tối đa hai trong ba tính chất sau.

| Tính Chất | Ý Nghĩa | Cách Hiểu Thông Tục |
|-----------|---------|-------------------|
| **C**onsistency (Nhất Quán) | Tất cả các nút thấy cùng một dữ liệu tại cùng một thời điểm | Bạn kiểm tra số dư trên bất kỳ ATM nào, kết quả đều giống nhau |
| **A**vailability (Tính Khả Dụng) | Mỗi yêu cầu đều nhận được phản hồi không lỗi | Hệ thống luôn có thể trả lời bạn, không bao giờ nói "dịch vụ không có sẵn" |
| **P**artition tolerance (Khả Năng Chịu Đựng Phân Vùng) | Hệ thống vẫn hoạt động khi mạng bị phân vùng | Ngay cả khi một số cáp quang bị cắt, hệ thống vẫn hoạt động |

<CAPTheoremDemo />

### Tại Sao Chỉ Có Thể Chọn Hai Cái?

Trong môi trường phân tán, phân vùng mạng (P) không thể tránh được — cáp quang sẽ bị cắt, công tắc sẽ gặp sự cố, trung tâm dữ liệu sẽ mất kết nối. Vì vậy P là lựa chọn bắt buộc, lựa chọn thực tế là sự cân bằng giữa C và A:

- **Chọn CP**: Từ chối các yêu cầu không chắc chắn trong quá trình phân vùng, đảm bảo dữ liệu chính xác → Thích hợp cho tài chính, hàng tồn kho
- **Chọn AP**: Tiếp tục phục vụ trong quá trình phân vùng, nhưng dữ liệu có thể không nhất quán tạm thời → Thích hợp cho xã hội, nội dung

::: tip CAP Không Phải Đen Trắng
Trong thực tế, hệ thống không phải là "CP hoặc AP" đơn giản. Nhiều hệ thống đưa ra những lựa chọn khác nhau cho các hoạt động khác nhau — ví dụ, cùng một cơ sở dữ liệu, các hoạt động đọc có thể là AP (cho phép đọc dữ liệu cũ), các hoạt động ghi có thể là CP (yêu cầu xác nhận đa số).
:::

---

## 2. Mô Hình Nhất Quán: "Mức Độ Nghiêm Ngặt" của Đồng Bộ Dữ Liệu

Nhất quán không phải là một công tắc (có hoặc không có), mà là một phổ. Các mô hình nhất quán khác nhau thực hiện những sự cân bằng khác nhau giữa "tính đúng đắn" và "hiệu năng".

<ConsistencyModelsDemo />

### So Sánh Các Mô Hình Nhất Quán

| Mô Hình | Đảm Bảo | Độ Trễ | Trường Hợp Sử Dụng |
|---------|---------|--------|-------------------|
| Nhất quán mạnh | Giá trị được đọc chắc chắn là giá trị ghi mới nhất | Cao (cần chờ đồng bộ hóa) | Chuyển khoản ngân hàng, giảm hàng tồn kho |
| Nhất quán cuối cùng | Cuối cùng tất cả các bản sao sẽ nhất quán, nhưng ở giữa có thể đọc giá trị cũ | Thấp (ghi ngay lập tức trả về) | Động lực xã hội, DNS |
| Nhất quán nhân quả | Các hoạt động có quan hệ nhân quả được đảm bảo theo thứ tự | Vừa phải | Trả lời bình luận, chỉnh sửa hợp tác |
| Nhất quán tuyến tính | Tất cả các hoạt động có vẻ như thực hiện tuần tự trên một máy đơn | Cao nhất | Khóa phân tán, bầu cử |
| Nhất quán phiên | Trong cùng một phiên, đảm bảo đọc giá trị mình đã ghi | Thấp-vừa phải | Dữ liệu cá nhân của người dùng |

::: tip Tính Nhất Quán "Đọc Giá Trị Của Chính Mình"
Nhu cầu thực tế phổ biến nhất là: sau khi người dùng sửa đổi dữ liệu của họ, họ có thể thấy cập nhật ngay lập tức (nhưng các người dùng khác có thể thấy sau). Đây được gọi là nhất quán "Read Your Own Writes", là một cải tiến thực tế của nhất quán cuối cùng.
:::

---

## 3. Tám Thách Thức: "Trường Mìn" của Hệ Thống Phân Tán

Độ phức tạp của hệ thống phân tán không đến từ một vấn đề nào, mà từ nhiều vấn đề xen kẽ với nhau. Dưới đây là tám thách thức lõi nhất.

<DistributedChallengesDemo />

### Liên Kết Giữa Các Thách Thức

Tám thách thức này không phải là độc lập, chúng liên kết với nhau:

- **Mạng không đáng tin cậy** → dẫn đến **phân vùng mạng** → kích hoạt **sự cân bằng CAP**
- **Đồng hồ không đồng bộ** → khiến **sắp xếp sự kiện khó khăn** → ảnh hưởng đến **nhất quán dữ liệu**
- **Lỗi một phần** → có thể dẫn đến **phân tách não** → cần **thuật toán đồng thuận** để giải quyết
- **Nhất quán dữ liệu** → cần **giao dịch phân tán** → nhưng giao dịch lại bị ảnh hưởng bởi **mạng không đáng tin cậy**

::: tip Không Có Giải Pháp Vạn Năng
Hệ thống phân tán không có giải pháp "hoàn hảo", chỉ có những sự cân bằng "phù hợp". Chỉ khi hiểu bản chất của những thách thức này, bạn mới có thể đưa ra những quyết định lựa chọn đúng khi thiết kế hệ thống.
:::

---

## 4. Thuật Toán Đồng Thuận: Làm Sao Để Nhiều Máy "Đạt Được Sự Thống Nhất"

Thuật toán đồng thuận là cốt lõi của hệ thống phân tán — nó giải quyết vấn đề: nhiều nút làm cách nào để đạt được sự thống nhất về một giá trị nào đó? Ngay cả khi một số nút gặp sự cố hoặc mạng bị trễ.

### 4.1 Paxos

Leslie Lamport đưa ra vào năm 1990, là thuật toán đồng thuận đầu tiên được chứng minh chặt chẽ là đúng.

| Vai Trò | Trách Nhiệm |
|---------|-----------|
| Proposer | Đề xuất các đề xuất (giá trị) |
| Acceptor | Bỏ phiếu chấp nhận hoặc từ chối các đề xuất |
| Learner | Học giá trị được chọn cuối cùng |

**Quy Trình Hai Giai Đoạn**:
1. **Giai Đoạn Prepare**: Proposer gửi số hiệu đề xuất, Acceptor cam kết không chấp nhận bất kỳ đề xuất nào có số hiệu nhỏ hơn
2. **Giai Đoạn Accept**: Proposer gửi giá trị cụ thể, nếu đa số Acceptor chấp nhận thì đề xuất được phê duyệt

::: tip Vấn Đề của Paxos
Mặc dù Paxos là đúng đắn, nhưng nó nổi tiếng là khó hiểu và khó thực hiện. Bản thân Lamport trong bài báo của mình đã sử dụng một ẩu dụ về một hội đồng Hy Lạp, kết quả là càng khiến nhiều người bối rối hơn.
:::

### 4.2 Raft: Được Sinh Ra Để Dễ Hiểu

Năm 2014, Diego Ongaro đưa ra Raft, với mục tiêu là tạo ra "Paxos dễ hiểu". Nó chia vấn đề đồng thuận thành ba vấn đề con:

| Vấn Đề Con | Giải Thích |
|-----------|-----------|
| Bầu cử Leader | Chọn một Leader trong cụm, tất cả ghi nhập đều đi qua Leader |
| Sao chép nhật ký | Leader sao chép nhật ký hoạt động đến tất cả Follower |
| Tính An Toàn | Đảm bảo nhật ký đã cam kết không bị ghi đè |

**Quy Trình Cốt Lõi của Raft**:
1. Khi cụm khởi động, tất cả các nút đều là Follower
2. Nếu Follower hết thời gian chờ mà không nhận được nhịp tim của Leader, nó trở thành Candidate và phát động bầu cử
3. Candidate nhận được đa số phiếu trở thành Leader mới
4. Leader tiếp nhận yêu cầu từ máy khách, sao chép nhật ký đến đa số nút rồi cam kết

### 4.3 So Sánh Các Thuật Toán Đồng Thuận

| Thuật Toán | Thời Gian Đề Xuất | Khả Năng Hiểu Biết | Hệ Thống Sử Dụng |
|-----------|------------------|------------------|-----------------|
| Paxos | 1990 | Khó | Google Chubby |
| Raft | 2014 | Dễ | etcd, Consul, TiKV |
| ZAB | 2011 | Vừa phải | ZooKeeper |
| EPaxos | 2013 | Khó | Chủ yếu là nghiên cứu học tập |

---

## 5. Giao Dịch Phân Tán: "Tất Cả Hoặc Không" Giữa Các Nút

Giao dịch cơ sở dữ liệu đơn máy dựa vào khóa cục bộ và nhật ký để thực hiện ACID. Nhưng khi một hoạt động kinh doanh liên quan đến nhiều dịch vụ/cơ sở dữ liệu, làm sao để đảm bảo tính nguyên tố?

### 5.1 Cam Kết Hai Giai Đoạn (2PC)

Giao thức giao dịch phân tán kinh điển nhất, chia thành hai giai đoạn:

| Giai Đoạn | Hành Động Của Người Điều Phối | Hành Động Của Người Tham Gia |
|-----------|-------|------------------|
| Prepare | Hỏi tất cả người tham gia "có thể cam kết không?" | Thực hiện hoạt động nhưng không cam kết, trả lời Yes/No |
| Commit | Nếu tất cả Yes, gửi Commit | Cam kết chính thức; nếu có No, toàn bộ rollback |

**Vấn Đề của 2PC**:
- **Chặn**: Sau Prepare nếu người điều phối gặp sự cố, người tham gia sẽ chờ mãi mãi
- **Lỗi điểm duy nhất**: Người điều phối là điểm duy nhất, nếu gặp sự cố toàn bộ giao dịch bị kẹt
- **Hiệu năng kém**: Cần nhiều lần liên lạc mạng, thời gian giữ khóa dài

### 5.2 Mô Hình Saga

Saga chia một giao dịch lớn thành nhiều giao dịch cục bộ, mỗi giao dịch cục bộ có hoạt động bù trừ tương ứng. Nếu một bước thất bại, thực hiện bù trừ theo thứ tự ngược.

**Ví Dụ Saga Đặt Hàng Thương Mại Điện Tử**:

| Bước | Hoạt Động Tiến | Hoạt Động Bù Trừ |
|------|---------|---------|
| T1 | Tạo đơn hàng (chờ thanh toán) | Hủy đơn hàng |
| T2 | Giảm hàng tồn kho | Khôi phục hàng tồn kho |
| T3 | Trừ số dư | Hoàn trả số dư |
| T4 | Xác nhận đơn hàng (đã thanh toán) | — |

Nếu T3 (trừ số dư) thất bại: thực hiện C2 (khôi phục hàng tồn kho) → C1 (hủy đơn hàng).

**Hai Cách Sắp Xếp**:
- **Sắp Xếp (Choreography)**: Mỗi dịch vụ lắng nghe sự kiện, tự quyết định bước tiếp theo. Đơn giản nhưng khó theo dõi trạng thái toàn cục
- **Điều Phối (Orchestration)**: Có một người điều phối trung tâm kiểm soát quy trình. Rõ ràng nhưng người điều phối là điểm duy nhất

### 5.3 TCC (Try-Confirm-Cancel)

TCC là thực hiện 2PC ở tầng kinh doanh, chia mỗi hoạt động thành ba giai đoạn:

| Giai Đoạn | Giải Thích | Ví Dụ (Trừ Hàng Tồn Kho) |
|-----------|----------|----------------------|
| Try | Dành riêng tài nguyên, nhưng không thực sự thực hiện | Làm đông cứng 10 cái hàng tồn kho (hàng tồn kho có sẵn -10, hàng tồn kho đông cứng +10) |
| Confirm | Xác nhận thực hiện, tiêu thụ tài nguyên dành riêng | Hàng tồn kho đông cứng -10 (thực sự trừ) |
| Cancel | Hủy dành riêng, giải phóng tài nguyên | Hàng tồn kho đông cứng -10, hàng tồn kho có sẵn +10 (khôi phục) |

### 5.4 So Sánh Ba Giải Pháp

| Giải Pháp | Nhất Quán | Hiệu Năng | Độ Phức Tạp | Trường Hợp Sử Dụng |
|----------|---------|---------|----------|------------------|
| 2PC | Nhất quán mạnh | Thấp | Vừa phải | Giao dịch giữa các cơ sở dữ liệu ở tầng cơ sở dữ liệu |
| Saga | Nhất quán cuối cùng | Cao | Cao | Quy trình dài (đơn hàng, logistics) |
| TCC | Nhất quán cuối cùng | Vừa phải | Cao nhất | Tình huống tài chính đáng tin cậy cao |

::: tip Gợi Ý Lựa Chọn Thực Tế
- Nếu có thể dùng giao dịch đơn cơ sở dữ liệu thì không dùng giao dịch phân tán
- Hầu hết các trường hợp kinh doanh dùng Saga + hàng đợi tin nhắn là đủ
- TCC phù hợp với các tình huống tài chính yêu cầu tính nhất quán cực cao, nhưng chi phí phát triển rất cao
- 2PC phù hợp để phần mềm trung gian cơ sở dữ liệu (như ShardingSphere) xử lý tự động
:::

---

## Tóm Tắt

Hệ thống phân tán là cơ sở hạ tầng của Internet hiện đại, nhưng độ phức tạp của nó vượt xa hệ thống đơn máy. Hiểu những thách thức này không phải để "giải quyết" chúng (nhiều thứ là cơ bản), mà để đưa ra những sự cân bằng đúng đắn khi thiết kế hệ thống.

Nhìn lại những điểm chính của chương này:

1. **Định Lý CAP**: Phân vùng mạng không thể tránh, lựa chọn thực tế là cân bằng giữa nhất quán và tính khả dụng
2. **Mô Hình Nhất Quán**: Từ nhất quán mạnh đến nhất quán cuối cùng là một phổ, chọn dựa trên nhu cầu kinh doanh
3. **Tám Thách Thức**: Mạng không đáng tin cậy, đồng hồ không đồng bộ, phân vùng mạng, phân tách não, v.v. liên kết với nhau
4. **Thuật Toán Đồng Thuận**: Raft hiện là thuật toán đồng thuận thực tế nhất, etcd/Consul đều dựa trên nó
5. **Giao Dịch Phân Tán**: Saga phù hợp với hầu hết các trường hợp, TCC phù hợp với tài chính, 2PC phù hợp với tầng cơ sở dữ liệu

## Đọc Thêm

- [Designing Data-Intensive Applications](https://dataintensive.net/) - Kinh điển về hệ thống phân tán của Martin Kleppmann
- [The Raft Consensus Algorithm](https://raft.github.io/) - Trình diễn hình ảnh chính thức của Raft
- [CAP Twelve Years Later](https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/) - Xem xét lại CAP của Brewer
- [Jepsen](https://jepsen.io/) - Khung kiểm tra tính đúng đắn của hệ thống phân tán
- [Mô hình Hệ Thống Phân Tán](https://martinfowler.com/articles/patterns-of-distributed-systems/) - Tuyển tập mô hình phân tán của Martin Fowler
