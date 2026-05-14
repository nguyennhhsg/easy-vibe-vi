# Phương Pháp Luận Lựa Chọn Công Nghệ

::: tip Lời tựa
**React hay Vue? MySQL hay PostgreSQL?** Lựa chọn công nghệ là một trong những quyết định quan trọng nhất khi bắt đầu một dự án. Chọn sai, bạn có thể phải mất vài tháng để viết lại; chọn đúng, hiệu suất của nhóm tăng gấp đôi.

Chương này sẽ giúp bạn xây dựng tư duy lựa chọn công nghệ có hệ thống, không còn chọn công nghệ dựa vào cảm giác nữa.
:::

**Bài viết này sẽ dạy bạn những gì?**

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|-----------------|
| **Chương 1** | Bản đồ công nghệ | Hiểu được mức độ trưởng thành của công nghệ |
| **Chương 2** | Các chiều lựa chọn | Từ những góc độ nào để đánh giá công nghệ |
| **Chương 3** | Ma trận quyết định | Định lượng so sánh để đưa ra quyết định |
| **Chương 4** | Những cạm bẫy phổ biến | Tránh những lỗ hổng trong lựa chọn |

Sau khi học xong chương này, bạn sẽ nắm vững một bộ phương pháp luận lựa chọn công nghệ có hệ thống, có khả năng đưa ra những quyết định công nghệ hợp lý cho dự án của mình.

---

## 0. Bức tranh toàn cảnh: Bản chất của lựa chọn công nghệ

Lựa chọn công nghệ không phải là câu hỏi "công nghệ nào tốt nhất", mà là "công nghệ nào phù hợp nhất với tình huống hiện tại". Giống như chọn phương tiện giao thông — máy bay nhanh nhất, nhưng để đi qua khu phố bên cạnh, bạn không cần phải đi máy bay.

::: tip Nguyên tắc cốt lõi của lựa chọn
- **Không có giải pháp tối ưu tuyệt đối**: Không có một công nghệ nào phù hợp với tất cả các tình huống
- **Kịch bản dẫn dắt**: Trước tiên hãy làm rõ nhu cầu, sau đó chọn công nghệ
- **Nhóm được ưu tiên**: Công nghệ mà nhóm đã quen thuộc thường là lựa chọn tốt nhất
- **Khả năng đảo chiều**: Ưu tiên chọn những giải pháp dễ thay thế
:::

Thông qua thành phần tương tác dưới đây, hãy hiểu rõ toàn cảnh của hệ sinh thái công nghệ hiện tại:

<TechRadarDemo />

---

## 1. Các chiều lựa chọn

### 1.1 Các chiều đánh giá cốt lõi

| Chiều | Điểm tập trung | Gợi ý về trọng số |
|------|---|---|
| **Khả năng của nhóm** | Nhóm có quen với điều này không? Chi phí học tập là bao nhiêu? | Cao |
| **Hệ sinh thái cộng đồng** | Chất lượng tài liệu, thư viện của bên thứ ba, số câu trả lời trên Stack Overflow | Cao |
| **Nhu cầu về hiệu suất** | Có đáp ứng yêu cầu hiệu suất không? | Trung-cao |
| **Trạng thái bảo trì** | Có được bảo trì tích cực không? Lần phát hành gần nhất là khi nào? | Trung |
| **Giấy phép** | Có tương thích với mô hình kinh doanh của dự án không? | Trung |
| **Thị trường tuyển dụng** | Có thể tuyển được người quen thuộc công nghệ này không? | Trung |

### 1.2 Trường hợp thực tế: Lựa chọn frontend framework

```
Dự án: Hệ thống quản lý nội bộ của công ty
Nhóm: 5 người, 3 người quen với Vue, 1 người quen với React, 1 người mới
Nhu cầu: Tập trung vào biểu mẫu, quyền hạn phức tạp, không cần SEO

Phân tích:
- Nhóm 60% quen với Vue → Vue được ưu tiên
- Tập trung vào biểu mẫu → Hệ sinh thái Element Plus trưởng thành
- Không cần SSR → Không cần Next.js/Nuxt
- Kết luận: Vue 3 + Element Plus
```

---

## 2. Ma trận quyết định

Khi có nhiều lựa chọn khó xác định bằng trực giác, hãy sử dụng ma trận quyết định để so sánh định lượng.

Thông qua thành phần tương tác dưới đây, hãy trải nghiệm cách sử dụng ma trận quyết định:

<DecisionMatrixDemo />

### 2.1 Cách sử dụng ma trận quyết định

1. **Liệt kê các phương án ứng cử viên**: Ví dụ React vs Vue vs Svelte
2. **Xác định các chiều đánh giá**: Khả năng nhóm, hệ sinh thái, hiệu suất, đường cong học tập
3. **Gán trọng số**: Dựa trên nhu cầu của dự án, gán trọng số cho từng chiều (tổng 100%)
4. **Chấm điểm từng mục**: Mỗi phương án được chấm 1-5 điểm cho mỗi chiều
5. **Tính tổng có trọng số**: Đạt được điểm số cuối cùng

### 2.2 Ví dụ

| Chiều | Trọng số | React | Vue | Svelte |
|------|---------|-------|-----|--------|
| Khả năng nhóm | 30% | 3 | 5 | 1 |
| Hệ sinh thái cộng đồng | 25% | 5 | 4 | 2 |
| Đường cong học tập | 20% | 3 | 4 | 5 |
| Hiệu suất | 15% | 4 | 4 | 5 |
| Thị trường tuyển dụng | 10% | 5 | 4 | 2 |
| **Tổng điểm có trọng số** | | **3.75** | **4.35** | **2.75** |

---

## 3. Những cạm bẫy phổ biến

### 3.1 Phát triển dựa trên sơ yếu lý lịch

> "Dùng công nghệ mới này, lý lịch của tôi sẽ lại có thêm một dòng nữa"

Lựa chọn công nghệ nên dựa trên nhu cầu của dự án, không phải dựa trên lý lịch cá nhân. Công nghệ mới có nghĩa là nhiều rủi ro chưa biết hơn và ít sự hỗ trợ của cộng đồng hơn.

### 3.2 Theo đuổi những cái mới một cách mù quáng

| Tâm thế | Hiện thực |
|--------|----------|
| "Cái mới chắc chắn tốt hơn cái cũ" | Công nghệ mới có thể có Bug chưa được phát hiện |
| "Các công ty lớn đang dùng, chúng ta cũng nên dùng" | Tình huống của các công ty lớn và của bạn có thể hoàn toàn khác |
| "Công nghệ này có số Star nhiều nhất" | Số Star không bằng công nghệ phù hợp với dự án của bạn |

### 3.3 Bỏ qua chi phí di chuyển

Khi lựa chọn, không chỉ nhìn vào "sử dụng thế nào", mà còn nhìn vào "nếu muốn thay đổi, giá cả là bao nhiêu". Ưu tiên chọn:
- Các giải pháp tuân theo các tiêu chuẩn (như SQL vs ngôn ngữ truy vấn riêng tư)
- Các giải pháp có con đường di chuyển rõ ràng
- Các giải pháp sẽ không khóa sâu

---

## 4. Hỗ trợ từ AI: Sử dụng mô hình lớn để hỗ trợ lựa chọn công nghệ

Mô hình lớn có thể giúp bạn nhanh chóng điều tra các phương án công nghệ, so sánh ưu và nhược điểm, tạo báo cáo quyết định.

### 4.1 So sánh phương án công nghệ

> **Prompt**:
> ```
> Tôi cần chọn cơ sở dữ liệu cho một dự án thương mại điện tử, các phương án ứng cử viên:
> MySQL, PostgreSQL, MongoDB.
> Đặc điểm của dự án: đọc nhiều ghi ít, cần truy vấn phức tạp, dự kiến dữ liệu hàng chục triệu.
>
> Hãy so sánh ba phương án từ những khía cạnh sau:
> Hiệu suất, hệ sinh thái, đường cong học tập, chi phí vận hành, khả năng mở rộng.
> Trình bày dưới dạng bảng và đưa ra khuyến cáo cuối cùng cùng với lý do.
> ```

### 4.2 Tạo bản ghi quyết định kiến trúc (ADR)

> **Prompt**:
> ```
> Giúp tôi viết một bản ghi quyết định kiến trúc (ADR), theo định dạng:
> - Tiêu đề: Chọn Vue 3 làm framework frontend
> - Bối cảnh: [Bối cảnh dự án và nhu cầu]
> - Các phương án ứng cử viên: React, Vue 3, Svelte
> - Quyết định: Vue 3
> - Lý do: [Dựa trên khả năng nhóm, hệ sinh thái, hiệu suất, v.v.]
> - Hậu quả: [Ảnh hưởng và rủi ro sau khi lựa chọn]
> ```

### 4.3 Điều tra công nghệ mới

> **Prompt**:
> ```
> Tôi đang xem xét có nên giới thiệu Bun thay thế Node.js trong dự án hay không, hãy giúp tôi phân tích:
> 1. Những ưu điểm cốt lõi và nhược điểm của Bun so với Node.js
> 2. Mức độ trưởng thành của hệ sinh thái hiện tại (khả năng tương thích npm, hỗ trợ framework chính)
> 3. Những điểm rủi ro khi sử dụng trong môi trường sản xuất
> 4. Những tình huống phù hợp và không phù hợp để sử dụng Bun
> Hãy đưa ra đánh giá khách quan, không chỉ nói những ưu điểm.
> ```

::: tip Gợi ý sử dụng AI
Kiến thức của AI có tính thời hạn — nó có thể không biết những thay đổi trong các phiên bản mới nhất. Đối với các công nghệ lặp lại nhanh, sau khi sử dụng AI để nghiên cứu sơ bộ, hãy nhất định kiểm tra tài liệu chính thức để xác nhận thông tin mới nhất.
:::

---

## 5. Tóm tắt

1. **Bản đồ công nghệ**: Hiểu được mức độ trưởng thành của công nghệ, phân biệt giữa áp dụng/thử nghiệm/đánh giá/tạm hoãn
2. **Các chiều lựa chọn**: Khả năng nhóm > Hệ sinh thái cộng đồng > Nhu cầu hiệu suất > Trạng thái bảo trì
3. **Ma trận quyết định**: Định lượng so sánh, giảm thiểu thiên vị chủ quan
4. **Tránh những cạm bẫy**: Không theo đuổi những cái mới, không bắt chước, xem xét chi phí di chuyển

::: tip Suy nghĩ cứu cánh
Lựa chọn công nghệ tốt nhất thường là **lựa chọn công nghệ buồn nhất**. Chọn những công nghệ trưởng thành, ổn định, mà nhóm đã quen thuộc, để lại năng lượng sáng tạo cho chính bản thân sản phẩm. Hãy nhớ: **công nghệ là phương tiện, không phải là mục đích. Người dùng không quan tâm bạn dùng framework nào, họ chỉ quan tâm sản phẩm có dễ sử dụng hay không.**
:::

---

## Đọc thêm

- **Bản đồ công nghệ ThoughtWorks**: Được phát hành mỗi sáu tháng một lần, là tài liệu tham khảo có thẩm quyền để hiểu xu hướng công nghệ.
- **Gợi ý thực tế**: Lần sau lựa chọn, hãy thử sử dụng ma trận quyết định để thực hiện so sánh định lượng.
- **Bản ghi quyết định kiến trúc (ADR)**: Sử dụng tài liệu để ghi lại lý do và sự cân bằng trong mỗi lần lựa chọn công nghệ.
- **Bài học phản diện**: Hiểu rõ một số trường hợp mà các dự án thất bại do lựa chọn công nghệ sai lầm.
