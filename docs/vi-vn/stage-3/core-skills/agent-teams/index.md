a cao.

### Thực hành bốn: Tránh xung đột tệp

Nhiều thành viên sửa đổi cùng một tệp sẽ gây ra xung đột hợp nhất, đây là vấn đề thường gặp nhất của Agent Teams.

**Nguyên tắc phân bổ**:

Cố gắng để các thành viên khác nhau chịu trách nhiệm **các tệp khác nhau**:

```
Tốt:
- Teammate A: Chịu trách nhiệm tất cả tệp trong thư mục src/auth/
- Teammate B: Chịu trách nhiệm tất cả tệp trong thư mục src/api/
- Teammate C: Chịu trách nhiệm tất cả tệp trong thư mục tests/auth/

Không tốt:
- Teammate A và Teammate B đều cần sửa src/app.js
```

**Nếu phải sửa cùng một tệp**:

Thiết kế giai đoạn sửa đổi tuần tự:

```
Giai đoạn 1 (song parallel):
- Teammate A: Phân tích auth.js cần thêm chức năng gì
- Teammate B: Thiết kế giao diện chức năng mới
- Teammate C: Viết các trường hợp kiểm tra

Giai đoạn 2 (tuần tự):
- Team Lead tổng hợp tất cả đầu vào
- Một thành viên thống nhất sửa đổi auth.js
```

### Thực hành năm: Cung cấp ngữ cảnh khởi đầu phong phú

Khi Teammates khởi động, lịch sử cuộc trò chuyện là trống — chúng không biết đây là dự án gì, dùng công nghệ gì.

**Cách làm sai**:

```
Tạo nhóm, để các thành viên bắt đầu làm việc.
```

Các thành viên sẽ bối rối: Dự án gì? Dùng công nghệ gì? Làm chức năng gì?

**Cách làm đúng**:

```
Đây là một dự án thương mại điện tử React + Node.js, dùng TypeScript.

Cấu trúc dự án:
- src/frontend/: Mã frontend React
- src/backend/: Mã backend Node.js
- prisma/: Mô hình cơ sở dữ liệu

Kiểu mã:
- Dùng thành phần hàm và Hooks
- Backend dùng Express.js
- Cơ sở dữ liệu dùng PostgreSQL

Bây giờ tạo một nhóm, để các thành viên thêm chức năng xác thực người dùng vào src/auth/.
```

Cung cấp đầy đủ ngữ cảnh, các thành viên mới có thể làm việc hiệu quả.

### Thực hành sáu: Nghiên cứu trước triển khai

Đừng để các thành viên bắt đầu mã hóa trực tiếp, trước tiên để chúng nghiên cứu và thiết kế phương án.

**Quy trình hai giai đoạn**:

**Giai đoạn 1: Nghiên cứu và thiết kế**

```
Tạo một nhóm, giai đoạn đầu tiên là nghiên cứu:
- Một thành viên điều tra các phương án xác thực hiện có (JWT vs Session)
- Một thành viên phân tích stack công nghệ dự án, xác định thực hành tốt nhất
- Một thành viên thiết kế cấu trúc bảng cơ sở dữ liệu

Sau khi hoàn thành nghiên cứu, các thành viên giao tiếp qua hệ thống nhắn tin, xác định phương án cuối cùng.
```

**Giai đoạn 2: Triển khai**

```
Sau khi xác định phương án, giai đoạn hai bắt đầu triển khai:
- Một thành viên triển khai logic xác thực backend
- Một thành viên triển khai trang đăng nhập frontend
- Một thành viên viết kiểm tra
```

Lợi ích của cách làm này là: **Phát hiện sớm vấn đề kiến trúc không phù hợp**, tránh viết một nửa thì phát hiện phương án không khả thi.

### Thực hành bảy: Chủ động giám sát và can thiệp

Thậm chí cấu hình tự động, bạn vẫn nên chủ động giám sát trạng thái làm việc của nhóm.

**Dùng chế độ chia màn hình**:

Nếu bạn cấu hình split-pane tmux, có thể thấy thực thời kết quả của tất cả các thành viên:

```
┌─────────────────┬─────────────────┐
│  Teammate 1     │  Teammate 2     │
│  Đang phân tích  │  Đang triển khai │
│  mã...          │  API...         │
│                 │                 │
│  Chờ đã, phương  │                 │
│  án này dường như │                 │
│  có vấn đề...    │                 │
└─────────────────┴─────────────────┘
```

Khi phát hiện thành viên nào đó đi lạc đường, có thể can thiệp kịp thời:

```
@Teammate1 Dừng lại một chút, hướng phân tích của bạn không đúng. Mô-đun xác thực nên ở src/auth/, không phải src/user/.
```

**Kiểm tra định kỳ trạng thái nhiệm vụ**:

Dùng lệnh TaskList xem trạng thái tất cả nhiệm vụ:

```
/tasks
```

Điều này sẽ hiển thị trạng thái hiện tại của tất cả nhiệm vụ, bạn có thể thấy nhiệm vụ nào hoàn thành, nhiệm vụ nào còn đang tiến hành, nhiệm vụ nào bị chặn.

---

## Kịch bản áp dụng

Agent Teams rất mạnh mẽ, nhưng không phải tất cả các nhiệm vụ đều thích hợp dùng nó. Hiểu được kịch bản áp dụng của nó, có thể giúp bạn đưa ra quyết định đúng.

### Kịch bản phù hợp với Agent Teams

**Tái cấu trúc hệ thống phức tạp**

Khi tái cấu trúc liên quan đến nhiều mô-đun, và các mô-đun có ranh giới rõ ràng:

```
Kịch bản: Tái cấu trúc ứng dụng đơn lẻ thành microservice

Tạo nhóm:
- Teammate A: Phân tích mối quan hệ phụ thuộc của mô-đun người dùng
- Teammate B: Phân tích mối quan hệ phụ thuộc của mô-đun đơn hàng
- Teammate C: Phân tích mối quan hệ phụ thuộc của mô-đun thanh toán
- Teammate D: Thiết kế giao thức giao tiếp giữa các dịch vụ
```

Ba mô-đun có thể được phân tích cùng một lúc, nhanh hơn phân tích tuần tự nhiều.

**Xem xét mã từ nhiều góc độ**

Khi cần xem xét mã từ nhiều chiều độ:

```
Kịch bản: Xem xét mô-đun thanh toán một cách toàn diện để an toàn

Tạo nhóm:
- Teammate A: Tập trung vào lỗ hổng an ninh (SQL injection, XSS, v.v.)
- Teammate B: Kiểm tra vấn đề hiệu suất (truy vấn N+1, rò rỉ bộ nhớ, v.v.)
- Teammate C: Xác minh tính hoàn chỉnh của xử lý lỗi
- Teammate D: Đánh giá tỷ lệ bao phủ kiểm tra
```

Mỗi thành viên chuyên tâm vào một chiều độ, xem xét sâu hơn, báo cáo cuối cùng hoàn chỉnh.

**Phát triển frontend và backend song parallel**

Khi cần phát triển frontend và backend cùng một lúc:

```
Kịch bản: Phát triển chức năng quản lý người dùng

Tạo nhóm:
- Teammate A (frontend): Triển khai trang danh sách người dùng
- Teammate B (frontend): Triển khai trang sửa người dùng
- Teammate C (backend): Triển khai CRUD API
- Teammate D (phối hợp): Thiết kế giao diện API, chắc chắn frontend và backend phù hợp
```

Frontend và backend có thể phát triển cùng một lúc, chỉ cần giao diện API xác định trước.

**Gỡ lỗi cạnh tranh**

Khi có nhiều giải pháp khả thi cho một lỗi:

```
Kịch bản: Sửa một lỗi phức tạp, có hai giải pháp có thể

Tạo nhóm:
- Teammate A: Triển khai giải pháp 1
- Teammate B: Triển khai giải pháp 2
- Teammate C: Đánh giá ưu nhược của hai giải pháp
```

Hai giải pháp được triển khai và kiểm tra cùng một lúc, cuối cùng chọn cái tốt hơn.

**Tạo tài liệu**

Khi cần tạo rất nhiều tài liệu:

```
Kịch bản: Viết tài liệu cho toàn bộ dự án

Tạo nhóm:
- Teammate A: Viết tài liệu API
- Teammate B: Viết hướng dẫn triển khai
- Teammate C: Viết hướng dẫn phát triển
- Teammate D: Viết sách hướng dẫn khắc phục sự cố
```

Nhiều tài liệu có thể viết cùng một lúc, tăng hiệu suất rất nhiều.

### Kịch bản không thích hợp với Agent Teams

**Nhiệm vụ sửa đổi đơn giản**

```
Không thích hợp: Đổi tên biến, sửa một lỗi nhỏ, thêm một chức năng nhỏ
```

Chi phí khởi động nhóm lớn hơn thời gian làm việc thực tế, không đáng giá.

**Nhiệm vụ có tính tuần tự cao**

```
Không thích hợp: Các bước phải thực hiện theo thứ tự
```

Nếu nhiệm vụ B phải chờ nhiệm vụ A hoàn thành mới có thể bắt đầu, không có chỗ cho phát triển song parallel.

**Nhiệm vụ nhạy cảm chi phí**

Agent Teams tiêu thụ token **2-4 lần** so với thực thể đơn lẻ (tùy vào quy mô nhóm). Nếu chi phí là ưu tiên hàng đầu, thực thể đơn lẻ có thể là lựa chọn tốt hơn.

### Sơ đồ quyết định

```
Có nhiều tác vụ con độc lập?
    │
    ├─ Không → Dùng thực thể đơn lẻ
    │
    └─ Có →
         │
         Các tác vụ con có thể gán cho các tệp khác nhau?
         │
         ├─ Không → Xem xét thực hiện tuần tự hoặc chia nhỏ nhiệm vụ
         │
         └─ Có →
              │
              Chi phí có thể chấp nhận được (2-4x)?
              │
              ├─ Không → Dùng thực thể đơn lẻ
              │
              └─ Có → Dùng Agent Teams ✓
```

---

## Chi phí và hiệu suất

Dùng Agent Teams sẽ tăng chi phí, nhưng cũng có thể mang lại cải thiện hiệu suất đáng kể. Hiểu được sự cân bằng này, giúp bạn đưa ra quyết định sáng suốt.

### Phân tích chi phí

**Tiêu thụ Token và quy mô nhóm**

Tiêu thụ Token của Agent Teams đại thể tỷ lệ **tuyến tính** với quy mô nhóm:

| Quy mô nhóm | Chi phí tương đối | Kịch bản áp dụng |
|---------|---------|---------|
| 1 người (thực thể đơn lẻ) | 1x | Nhiệm vụ đơn giản |
| Nhóm 2 người | 2-2.5x | Độ phức tạp trung bình |
| Nhóm 3 người | 3-4x | Nhiệm vụ phức tạp |
| Nhóm 5+ người | 5-6x+ | Dự án lớn |

**Tại sao không phải mối quan hệ tuyến tính chính xác**:

- **Chi phí khởi động**: Mỗi thành viên khởi động cần nhận ngữ cảnh khởi đầu
- **Chi phí phối hợp**: Giao tiếp giữa các thành viên qua hệ thống nhắn tin cũng tiêu thụ token
- **Chi phí Team Lead**: Team Lead thường dùng Opus, chi phí cao hơn

**Ví dụ số cụ thể** (Claude 4.5 Sonnet):

- Đầu vào: $3/triệu token
- Đầu ra: $15/triệu token

Giả sử một nhiệm vụ cần:
- Team Lead (Opus): 50K đầu vào + 20K đầu ra ≈ $2.25
- 3 Teammates (Sonnet): mỗi người 30K đầu vào + 15K đầu ra ≈ $2.7 × 3 = $8.1
- **Tổng cộng**: khoảng $10.35

Cùng một nhiệm vụ dùng thực thể đơn lẻ (Sonnet):
- 100K đầu vào + 50K đầu ra ≈ $1.05

**Bội số chi phí**: khoảng 10 lần

**Nhưng tiết kiệm thời gian**: có thể từ 3 giờ giảm xuống 1 giờ

### Cải thiện hiệu suất

**Dữ liệu kiểm tra nội bộ của Anthropic**:

- Tái cấu trúc dự án lớn: cải thiện hiệu suất khoảng **50%**
- Phát triển song parallel đa mô-đun: cải thiện khoảng **60-70%**
- Tạo tài liệu: cải thiện khoảng **80%**

**Ví dụ thực tế**:

Nhóm kỹ thuật Anthropic từng dùng **16 đại lý song parallel**, trong khoảng **2 tuần** xây dựng được trình biên dịch C có thể biên dịch Linux 6.9 (khoảng 10 vạn dòng Rust), vượt qua **99%** kiểm tra GCC.

### Chiến lược tối ưu hóa chi phí

**Chiến lược 1: Hỗn hợp dùng mô hình**

```
Team Lead: Opus (cần suy luận mạnh)
Teammates: Sonnet (hiệu suất/giá tốt)
Nhiệm vụ đơn giản: Haiku (rẻ nhất)
```

**Chiến lược 2: Điều chỉnh động quy mô nhóm**

```
Giai đoạn phân tích: Nhóm 5 người (phân tích đa góc độ)
Giai đoạn triển khai: Nhóm 3 người (mã hóa song parallel)
Giai đoạn kiểm tra: Nhóm 2 người (kiểm tra và sửa)
```

**Chiến lược 3: Dùng Agent Teams giai đoạn**

Không dùng Agent Teams cho toàn bộ dự án, chỉ dùng ở giai đoạn phức tạp nhất:

```
Giai đoạn 1 (phân tích yêu cầu): Thực thể đơn lẻ
Giai đoạn 2 (thiết kế kiến trúc): Agent Teams (phân tích đa phương án song parallel)
Giai đoạn 3 (mã hóa): Thực thể đơn lẻ
Giai đoạn 4 (xem xét mã): Agent Teams (xem xét đa chiều)
Giai đoạn 5 (viết tài liệu): Agent Teams (viết song parallel)
```

### Khi nào đáng giá

**Đáng giá:**

- Thời gian dự án cấp bách, cải thiện hiệu suất mang lại giá trị lớn hơn chi phí token
- Độ phức tạp nhiệm vụ cao, thực thể đơn lẻ dễ bỏ sót chi tiết
- Cần phân tích đa góc độ và xác minh

**Không đáng giá:**

- Nhiệm vụ đơn giản, chi phí khởi động nhóm lớn hơn làm việc thực tế
- Nhạy cảm chi phí, ngân sách token có hạn
- Nhiệm vụ có tính tuần tự cao, không có chỗ song parallel

---

## Câu hỏi thường gặp

### Q1: Agent Teams có ổn định không? Có thể dùng ở môi trường sản xuất không?

Agent Teams hiện tại là **tính năng thử nghiệm**, có thể có một số lỗi và tình huống không ổn định. Khuyến khích:

- Dự án quan trọng trước hãy sao lưu
- Kiểm tra trên dự án nhỏ trước, quen thuộc
- Theo dõi nhật ký phát hành chính thức, hiểu những cải thiện của phiên bản mới
- Gặp vấn đề cần phản hồi kịp thời cho nhà phát triển chính thức

### Q2: Tối đa có thể tạo bao nhiêu thành viên?

Về mặt lý thuyết không có giới hạn cứng, nhưng từ góc độ thực hành:

- Dự án nhỏ: 2-3 người
- Dự án trung bình: 3-5 người
- Dự án lớn: 5-10 người

Quá nhiều thành viên sẽ gây ra:

- Chi phí phối hợp tăng vọt
- Tiêu thụ token tăng tuyến tính
- Xác suất xung đột tệp tăng
- Khó giám sát và quản lý

### Q3: Các thành viên nhóm có thể nhìn thấy ngữ cảnh của nhau không?

**Không**. Mỗi Teammate có cửa sổ ngữ cảnh hoàn toàn độc lập, chúng giao tiếp qua hệ thống nhắn tin, không chia sẻ ngữ cảnh.

Đây là lựa chọn thiết kế, lợi ích là:

- Tư duy của mỗi thành viên không bị ảnh hưởng bởi thành viên khác
- Ngữ cảnh không bị hỗn loạn vì cuộc trò chuyện dài
- Gần hơn với cách làm việc thực sự của nhóm (mỗi người có bộ não riêng)

### Q4: Cách chuyển đổi giữa các thành viên khác nhau?

Nếu không cấu hình chế độ chia màn hình, có thể dùng phím tắt:

- `Shift+Up`: Chuyển đến thành viên trước
- `Shift+Down`: Chuyển đến thành viên tiếp theo
- `Ctrl+O`: Quay lại Team Lead

### Q5: Nếu một nhiệm vụ thất bại thì sao?

Nếu một thành viên thất bại:

1. Xem lý do thất bại: Đọc nhật ký đầu ra của thành viên đó
2. Phân công lại: Có thể phân công lại nhiệm vụ cho thành viên khác
3. Can thiệp thủ công: Có thể tự trực tiếp giúp giải quyết vấn đề bị chặn

### Q6: Có thể thêm hoặc xóa thành viên giữa chừng không?

Được. Bạn bất cứ lúc nào có thể hướng dẫn Team Lead:

```
Thêm một thành viên mới, để nó chịu trách nhiệm XXX.
```

```
Để Teammate 3 hoàn thành nhiệm vụ hiện tại rồi thoát khỏi nhóm.
```

### Q7: Agent Teams có thể dùng kèm MCP và Skills học trước không?

Hoàn toàn được! Kết hợp dùng hiệu quả còn tốt hơn:

- **Agent Teams + Skills**: Mỗi thành viên có thể mang theo những Skills khác nhau
- **Agent Teams + MCP**: Các thành viên khác nhau có thể truy cập các MCP server khác nhau để lấy tài nguyên bên ngoài

```
Tạo một nhóm:
- Teammate A: Mang frontend-design Skill, chịu trách nhiệm UI
- Teammate B: Qua GitHub MCP truy cập kho, chịu trách nhiệm quản lý PR
- Teammate C: Qua Database MCP truy vấn dữ liệu, chịu trách nhiệm phân tích dữ liệu
```

---

## Tài liệu tham khảo

### Tài nguyên chính thức

- [Tài liệu chính thức Claude Code](https://docs.anthropic.com/en/docs/claude-code) - Tài liệu hoàn chỉnh Claude Code
- [Blog kỹ thuật chính thức Anthropic](https://www.anthropic.com/engineering) - Blog công nghệ và cập nhật chính thức

### Hướng dẫn chuyên đề Agent Teams

**Hướng dẫn hoàn chỉnh tiếng Việt**:

- [Hướng dẫn hoàn chỉnh Claude Code Agent Teams: Từ nhập môn đến thực hành] - Bao gồm chi tiết cấu hình và ví dụ thực hành, trường hợp sốc xây dựng trình biên dịch C với 16 đại lý song parallel
- [Hướng dẫn hoàn chỉnh cộng tác phát triển dự án dùng Claude Code Agent Team] - Quy trình cộng tác phát triển dự án hoàn chỉnh
- [Hướng dẫn chi tiết cấu hình và dùng Claude Code Agent Teams] - Hướng dẫn cấu hình chi tiết cho người mới

**Thực hành lên tay**:

- [Thực hành lên tay Agent Teams Claude Code: Từ bật đến chạy xuyên suốt nhóm ba người] - Thực hành nhóm ba người
- [Nhập môn mới Claude Code Agent Teams] - Nhập môn cho người mới, bao gồm hợp đồng trước và các thực hành tốt nhất
- [Không còn đơn độc! Để 7 Claude giúp bạn phát triển cùng một lúc] - Ví dụ cộng tác nhóm 7 người

**Thực hành tốt nhất**:

- [Thực hành tốt nhất Agent Teams: Hợp đồng trước, hạt độ nhiệm vụ, phân bổ mô hình] - Giải thích chi tiết 7 thực hành tốt nhất
- [Sách tay thực hành Claude Code cựu binh 7 năm kỹ sư công ty lớn: Tám quy tắc quân sự từ nhập môn đến thông thạo] - Kinh nghiệm thực hành ở cấp độ doanh nghiệp

**Nguyên lý và so sánh**:

- [Claude Code Agent Teams: Cách mở đúng cho cộng tác đa đại lý] - Phân tích sâu cộng tác đa đại lý
- [Toàn bộ hướng dẫn Claude Code đa Agent tập hợp: Từ nguyên lý đến bẫy thường gặp] - Phân tích nguyên lý và kinh nghiệm bẫy

**Dịch hướng dẫn chính thức**:

- [Claude chính thức phát hành 《Hướng dẫn xây dựng Agent》(Tải PDF)] - Hướng dẫn xây dựng Agent chính thức
- [Claude chính thức phát hành 《Hướng dẫn xây dựng Agents hiệu quả》Phiên bản dịch đầy đủ tiếng Việt] - Dịch đầy đủ chính thức

### Công nghệ liên quan

- [Tiêu chuẩn Agent Skills](https://agentskills.io/) - Hệ sinh thái Skills
- [skills.sh - Cửa hàng ứng dụng Agent Skills](https://skills.sh/) - Thư viện 70.000+ Skills
