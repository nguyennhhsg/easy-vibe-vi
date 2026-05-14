# Các tầng và chiến lược bộ nhớ đệm
::: tip 🎯 Câu hỏi cốt lõi
**Tại sao một số trang web chỉ cần 50 mili giây để mở, nhưng một số khác phải chờ 5 giây?** Điều này giống như hỏi: Tại sao lấy sách từ ba lô chỉ mất 1 giây, nhưng đi tìm sách ở thư viện mất 10 phút? Câu trả lời là——bộ nhớ đệm. Chương này sẽ giúp bạn hiểu sâu về nguyên lý cốt lõi, mô hình thiết kế và mẹo thực chiến của bộ nhớ đệm, giúp hiệu suất hệ thống của bạn tăng 100 lần.
:::

---

## 1. Tại sao phải "bộ nhớ đệm"?

### 1.1 Từ "luôn truy vấn" đến "ghi nhớ dữ liệu thường dùng"

Thời kỳ đầu của thế giới máy tính, bất cứ khi nào lập trình viên cần dữ liệu, họ đều phải truy vấn ổ cứng hoặc cơ sở dữ liệu. Điều này giống như bạn phải mở sách mỗi lần làm bài tập toán để tìm công thức, mặc dù chính xác nhưng hiệu suất rất thấp. Khi quy mô hệ thống lớn lên, phương pháp "luôn truy vấn" này bắt đầu bộc lộ những vấn đề nghiêm trọng: CPU cơ sở dữ liệu tăng lên 95%, thời gian phản hồi tăng từ 100 mili giây lên 8 giây, cuối cùng toàn bộ hệ thống sụp đổ.

Điều này giống như một sinh viên mỗi ngày phải chạy từ ký túc xá đến thư viện để tìm tài liệu, chạy 50 lần một ngày, cuối cùng kiệt sức giữa đường. Giải pháp rất đơn giản: chuẩn bị một cuốn hướng dẫn công thức thường dùng trong ba lô, khi cần, chỉ cần mở ba lô để xem, không cần chạy đến thư viện mỗi lần. Bộ nhớ đệm chính là "hướng dẫn công thức" của hệ thống máy tính, nó lưu trữ dữ liệu thường dùng ở nơi có thể truy cập nhanh, giúp hệ thống không cần mỗi lần chạy đến "thư viện" (cơ sở dữ liệu).

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🐌 Không có bộ nhớ đệm**
- Mỗi yêu cầu đều truy vấn cơ sở dữ liệu
- Tỷ lệ sử dụng CPU cơ sở dữ liệu 95%
- Thời gian phản hồi 5-8 giây
- Hệ thống dễ bị sập

</div>
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🚀 Có bộ nhớ đệm**
- 95% yêu cầu trả về trực tiếp
- Tỷ lệ sử dụng CPU cơ sở dữ liệu < 20%
- Thời gian phản hồi 50 mili giây
- Hệ thống chạy ổn định

</div>
</div>

**Đây chính là vấn đề cốt lõi mà "bộ nhớ đệm" cần giải quyết: bằng cách lưu trữ bản sao của dữ liệu thường dùng, giảm thiểu truy cập đến bộ nhớ chậm (cơ sở dữ liệu), giúp hệ thống nhanh hơn và ổn định hơn.**

<CachePerformanceComparisonDemo />

### 1.2 Một câu chuyện thực tế về sai lầm: Tại sao bộ nhớ đệm là lá cứu mệnh

Bạn có thể nghĩ: "Hệ thống của tôi hiện tại vẫn tốt, tại sao phải thiết kế bộ nhớ đệm sớm?" Hãy để tôi kể một câu chuyện thực tế, bạn sẽ hiểu tại sao bộ nhớ đệm không phải là "tùy chọn" mà là "bắt buộc".

::: warning A Cường bị hỏng cơ sở dữ liệu
A Cường là một kỹ sư full-stack ở một công ty khởi nghiệp, công ty làm một ứng dụng mạng xã hội. Thời kỳ đầu có ít người dùng (vài trăm người), hệ thống chạy bình thường, A Cường cảm thấy không cần thiết phải làm bộ nhớ đệm, truy vấn cơ sở dữ liệu trực tiếp là được.

Sáu tháng sau, số lượng người dùng tăng lên 10 vạn người, một ngày nào đó một người nổi tiếng đăng một bài trên Ứng dụng, đột nhiên có 10 vạn lượt truy cập. Kết quả là cơ sở dữ liệu trực tiếp bị nổ: CPU 100%, thời gian phản hồi từ 100ms thành 30 giây, cuối cùng toàn bộ Ứng dụng sập, mất rất nhiều người dùng.

Sau khi rút kinh nghiệm: nếu lúc đó có một lớp bộ nhớ đệm đơn giản (chẳng hạn Redis), caching những bài viết nóng, áp lực cơ sở dữ liệu ít nhất sẽ giảm 95%, hệ thống hoàn toàn có thể chịu được loạt lưu lượng này.

A Cường từ đó hiểu được một điều: **bộ nhớ đệm không phải là lợi thêm, mà là ký sinh bảo mệnh của hệ thống đồng thời cao. Không thêm bộ nhớ đệm, giống như lái xe không thắt dây an toàn——bình thường thì không sao, nhưng gặp sự cố thì quá muộn.**
:::

::: info 💡 Hiểu biết cốt lõi
Giá trị của bộ nhớ đệm không chỉ là "nhanh hơn", mà quan trọng hơn là "bảo vệ". Nó bảo vệ cơ sở dữ liệu khỏi bị áp đảo, bảo vệ hệ thống vẫn chạy ổn định dưới lưu lượng cao. Khi thiết kế hệ thống, đừng chờ đến khi có sự cố mới nghĩ đến bộ nhớ đệm, mà phải coi nó là một phần của kiến trúc cốt lõi ngay từ đầu.
:::

---

## 2. Khái niệm cốt lõi: Bộ nhớ đệm là gì?

::: tip 🤔 Bộ nhớ đệm thực sự là gì?
Nói đơn giản, **bộ nhớ đệm là một không gian lưu trữ bản sao dữ liệu**. Giống như bạn dán một tờ giấy nhắc nhở trên bàn học, ghi những số điện thoại thường dùng, như vậy không cần mỗi lần lật danh bạ điện thoại.

**Ba điểm chính**:
1. **Bản sao**: dữ liệu trong bộ nhớ đệm là bản sao của dữ liệu gốc (cơ sở dữ liệu), không phải dữ liệu chính
2. **Truy cập nhanh**: bộ nhớ đệm thường ở trong bộ nhớ, tốc độ đọc nhanh 100 vạn lần so với ổ cứng
3. **Dung lượng hạn chế**: không gian bộ nhớ đệm có hạn, chỉ có thể lưu trữ dữ liệu thường dùng nhất

Vì vậy, **bộ nhớ đệm là dùng không gian để đổi lấy thời gian**——hy sinh một ít dung lượng bộ nhớ, đổi lấy tốc độ truy cập dữ liệu cực nhanh.
:::

Trước khi đi sâu vào các công nghệ cụ thể, chúng ta cần hiểu rõ một số khái niệm cốt lõi. Để giúp bạn dễ hiểu, chúng tôi dùng "ba lô học sinh" để so sánh với hệ thống bộ nhớ đệm.

### 2.1 Hiểu rõ các khái niệm cốt lõi của bộ nhớ đệm bằng "so sánh ba lô"

Tưởng tượng bạn là một sinh viên, mỗi ngày cần tìm các tài liệu. Quy trình này kỳ lạ giống với hệ thống bộ nhớ đệm:

| Khái niệm | 🎒 So sánh ba lô | Ý nghĩa kỹ thuật | Ví dụ thực tế |
|------|-----------|----------|----------|
| **Cache Hit (Bộ nhớ đệm trúng)** | Công thức mà bạn cần tìm chính xác là trên giấy nhắc nhở | Dữ liệu được yêu cầu tìm thấy trong bộ nhớ đệm | Truy vấn thông tin người dùng, Redis có, trả về trực tiếp |
| **Cache Miss (Bộ nhớ đệm trượt)** | Giấy nhắc nhở không có, phải mở sách | Dữ liệu được yêu cầu không có trong bộ nhớ đệm | Truy vấn thông tin người dùng, Redis không có, cần truy vấn cơ sở dữ liệu |
| **Hit Ratio (Tỷ lệ trúng)** | Trong 100 lần tìm công thức, có 95 lần trên giấy nhắc nhở | Tỷ lệ cache hit | Tỷ lệ trúng 95%, nghĩa là 95% yêu cầu không cần truy vấn cơ sở dữ liệu |
| **TTL (Time To Live)** | Giấy nhắc nhở ghi "sau 3 ngày xé đi" | Thời gian sống của bộ nhớ đệm | Đặt bộ nhớ đệm thông tin người dùng hết hạn tự động sau 30 phút |
| **Eviction (Loại bỏ)** | Ba lô đầy, xé tờ giấy nhắc nhở cũ nhất đi | Xóa dữ liệu cũ khi bộ nhớ đệm đầy | Bộ nhớ Redis đầy, tự động xóa dữ liệu được sử dụng ít nhất |

### 2.2 Cache Hit vs Cache Miss

Sự khác biệt hiệu suất giữa cache hit và cache miss là rất lớn. Hãy xem dữ liệu cụ thể:

| Loại thao tác | Thời gian phản hồi | Tốc độ tương đối | Tình huống phù hợp |
|---------|---------|----------|----------|
| **L1 Cache CPU** | ~0.5 nanosecond | Siêu nhanh (tiêu chuẩn) | Phép tính CPU nội bộ |
| **Đọc bộ nhớ** | ~100 nanosecond | Nhanh 200 lần | Bộ nhớ đệm cục bộ (như Caffeine) |
| **Truy vấn Redis** | ~1 mili giây | Chậm 2 triệu lần | Bộ nhớ đệm phân tán |
| **Truy vấn MySQL** | ~10 mili giây | Chậm 20 triệu lần | Truy vấn cơ sở dữ liệu ổ cứng |

::: tip 📊 Bạn có thể thấy điều gì từ bảng?
**Sự chênh lệch hiệu suất đáng sợ**: thao tác bộ nhớ nhanh hơn truy vấn MySQL 100 vạn lần! Điều này giống như lấy sách từ bàn học (1 giây) và đi tìm sách ở thư viện (100 vạn giây, khoảng 28 giờ) có sự khác biệt.

**Ba bậc hiệu suất**:
1. **Bộ nhớ đệm cục bộ (bộ nhớ)**: nhanh nhất, nhưng dung lượng nhỏ, phù hợp với dữ liệu nóng
2. **Bộ nhớ đệm Redis**: tốc độ trung bình, dung lượng lớn, phù hợp với tình huống phân tán
3. **Cơ sở dữ liệu**: chậm nhất, nhưng dung lượng vô hạn, là nguồn dữ liệu cuối cùng

**Cảnh báo thực chiến**: hệ thống của bạn nên để 95% yêu cầu trở lại từ lớp bộ nhớ đệm, chỉ dưới 5% yêu cầu cần truy vấn cơ sở dữ liệu. Như vậy áp lực cơ sở dữ liệu sẽ nhỏ, hiệu suất toàn hệ thống sẽ tăng lên đáng kể.
:::

::: details 🔍 Hãy xem "cache hit" thực tế và "cache miss" trong mã
Hãy so sánh hai tình huống này bằng mã:

```javascript
// Tình huống: Truy vấn thông tin người dùng

// ===== Cache Hit =====
// 1. Trước tiên truy vấn bộ nhớ đệm Redis
const userFromCache = await redis.get('user:123')
if (userFromCache) {
  // Trúng! Trả về trực tiếp, mất khoảng 1 mili giây
  return JSON.parse(userFromCache)
}

// ===== Cache Miss =====
// 2. Bộ nhớ đệm không có, truy vấn cơ sở dữ liệu
const userFromDB = await db.query('SELECT * FROM users WHERE id = 123')
// Trượt! Cần truy vấn cơ sở dữ liệu, mất khoảng 10 mili giây, chậm hơn 10 lần

// 3. Sau khi tìm thấy, ghi vào bộ nhớ đệm, lần sau sẽ trúng
await redis.set('user:123', JSON.stringify(userFromDB), 'EX', 1800)
return userFromDB
```

**Điểm chính**:
- Cache hit: 1 mili giây trả về, trải nghiệm người dùng tuyệt vời
- Cache miss: 10 mili giây trả về, trải nghiệm người dùng hơi kém
- **Giá trị bộ nhớ đệm**: biến cache miss thành cache hit, cải thiện hiệu suất 10 lần
:::

### 2.3 Vòng đời của bộ nhớ đệm

Từ khi được tạo đến khi bị xóa, một mục bộ nhớ đệm sẽ trải qua vòng đời hoàn chỉnh. Hiểu quá trình này rất quan trọng để thiết kế hệ thống bộ nhớ đệm.

**Bốn giai đoạn**:

**Giai đoạn một: Ghi (Write)**
- **Ghi chủ động**: khi hệ thống khởi động, tự động tải dữ liệu nóng vào bộ nhớ đệm (làm ấm bộ nhớ đệm)
- **Lazy Loading**: lần truy cập đầu tiên sẽ tải từ cơ sở dữ liệu và ghi vào bộ nhớ đệm (cách phổ biến nhất)

**Giai đoạn hai: Trúng/Trượt (Hit/Miss)**
- Mỗi yêu cầu sẽ trước tiên truy vấn bộ nhớ đệm
- Nếu trúng thì trả về trực tiếp, nếu trượt thì truy vấn cơ sở dữ liệu

**Giai đoạn ba: Hết hạn (Expiration)**
- **TTL (Time To Live)**: đặt thời gian sống của bộ nhớ đệm (chẳng hạn 30 phút)
- Khi hết hạn, bộ nhớ đệm tự động bị vô hiệu, lần truy cập tiếp theo cần tải lại

**Giai đoạn bốn: Loại bỏ (Eviction)**
- Dung lượng bộ nhớ đệm hạn chế, khi đầy cần xóa dữ liệu cũ
- Chiến lược loại bỏ thường dùng:
  - **LRU (Least Recently Used)**: xóa dữ liệu được sử dụng lâu nhất (phổ biến nhất)
  - **LFU (Least Frequently Used)**: xóa dữ liệu có tần suất truy cập thấp nhất
  - **FIFO (First In First Out)**: xóa dữ liệu được ghi vào sớm nhất

👇 **Hãy thử**:
Bản demo dưới đây cho thấy vòng đời của bộ nhớ đệm. Nhấp vào "Thêm bộ nhớ đệm", quan sát cách bộ nhớ đệm trải qua quá trình ghi, trúng, hết hạn, loại bỏ:

<CacheLifecycleDemo />

---

## 3. Con đường tiến hóa của bộ nhớ đệm: Từ đơn máy đến phân tán

::: tip 🤔 Tại sao cần các loại bộ nhớ đệm khác nhau?
Giống như khi học, bạn sẽ đặt tài liệu ở những nơi khác nhau: trên bàn học đặt cái thường dùng nhất (giấy nhắc nhở), trong ba lô đặt cái thường dùng (sổ tay), ở thư viện đặt tất cả tài liệu (kho sách).

**Hệ thống bộ nhớ đệm cũng vậy**:
- **Bộ nhớ đệm cục bộ (bàn học)**: nhanh nhất, dung lượng nhỏ, đặt dữ liệu siêu nóng
- **Bộ nhớ đệm phân tán (tủ đồ công cộng)**: nhanh hơn, dung lượng lớn, đặt dữ liệu thường dùng
- **Cơ sở dữ liệu (thư viện)**: chậm nhất, dung lượng vô hạn, đặt tất cả dữ liệu

**Tại sao cần phân tầng?** Vì tính năng hiệu suất và chi phí khác nhau ở mỗi tầng, kết hợp hợp lý mới đạt được hiệu quả tối ưu.
:::

Sau khi nói rất nhiều khái niệm, hãy xem một trường hợp thực tế: cách một hệ thống thương mại điện tử tiến hóa từ "không có bộ nhớ đệm" thành "kiến trúc bộ nhớ đệm nhiều tầng". Qua trường hợp này, bạn sẽ hiểu rõ hơn về tầm quan trọng của thiết kế bộ nhớ đệm.

### 3.1 Giai đoạn một: Thời đại không bộ nhớ đệm——cơ sở dữ liệu chạy trần

**Bối cảnh**: hệ thống thời kỳ đầu có ít người dùng (vài trăm người), tất cả yêu cầu truy vấn trực tiếp cơ sở dữ liệu, không có lớp bộ nhớ đệm nào.

**Stack công nghệ**:
- Cơ sở dữ liệu: MySQL
- Không bộ nhớ đệm: không có Redis, không có bộ nhớ đệm cục bộ

**Kiến trúc hệ thống**:
```
Yêu cầu người dùng → Máy chủ ứng dụng → Cơ sở dữ liệu MySQL
```

**Đặc điểm của giai đoạn này**:
- ✅ **Ưu điểm**: kiến trúc đơn giản, phát triển nhanh
- ❌ **Nhược điểm**: áp lực cơ sở dữ liệu lớn, hiệu suất kém, hàng nghìn người dùng sẽ sập

::: details Xem mã lúc đó và các vấn đề gặp phải
**Ví dụ mã** (mỗi lần truy vấn cơ sở dữ liệu):

```javascript
// Lấy chi tiết sản phẩm——mỗi lần truy vấn cơ sở dữ liệu
async function getProduct(productId) {
  // Truy vấn cơ sở dữ liệu trực tiếp, không có bộ nhớ đệm
  const product = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId]
  )
  return product
}
```

**Vấn đề gặp phải**:
1. **CPU cơ sở dữ liệu tăng vọt**: mỗi yêu cầu đều truy vấn cơ sở dữ liệu, CPU sử dụng > 80%
2. **Phản hồi chậm**: truy vấn phức tạp mất 50-100 mili giây, trải nghiệm người dùng kém
3. **Khả năng xử lý đồng thời kém**: QPS cơ sở dữ liệu (truy vấn mỗi giây) tối đa chỉ 2000, quá đó sẽ sập
4. **Vấn đề sản phẩm nóng**: trang chi tiết sản phẩm nóng được truy vấn thường xuyên, cơ sở dữ liệu trở thành nút thắt

**Giải pháp tạm thời lúc đó**:
- Mua máy chủ đắt hơn (thêm CPU, bộ nhớ)——chi phí cao, hiệu quả hạn chế
- Đọc-ghi tách riêng cơ sở dữ liệu——có thể giảm nhẹ áp lực đọc, nhưng áp lực ghi vẫn tồn tại
- Tối ưu SQL——có thể cải thiện 20-30%, nhưng không giải quyết được vấn đề gốc
:::

Kiểu "chạy trần" này vẫn ổn khi số lượng người dùng < 1000, nhưng khi số người dùng tăng lên 10 vạn, 100 vạn, cơ sở dữ liệu thường xuyên sập, đội ngũ cần ngay lập tức đưa vào bộ nhớ đệm.

### 3.2 Giai đoạn hai: Đưa vào bộ nhớ đệm Redis——cải thiện hiệu suất 10 lần

**Bối cảnh**: số lượng người dùng tăng lên 10 vạn, cơ sở dữ liệu chịu không nổi, đội ngũ quyết định đưa vào Redis làm lớp bộ nhớ đệm.

**Stack công nghệ**:
- Cơ sở dữ liệu: MySQL
- Bộ nhớ đệm: Redis (phiên bản đơn máy)

**Kiến trúc hệ thống**:
```
Yêu cầu người dùng → Máy chủ ứng dụng → Bộ nhớ đệm Redis (trượt mới truy vấn) → Cơ sở dữ liệu MySQL
```

**Đặc điểm của giai đoạn này**:
- ✅ **Ưu điểm**: cải thiện hiệu suất 10 lần, áp lực cơ sở dữ liệu giảm 90%
- ❌ **Nhược điểm**: Redis là một điểm lỗi duy nhất, bộ nhớ đệm và cơ sở dữ liệu có thể không đồng bộ

::: details Xem mã triển khai bộ nhớ đệm Redis
**Ví dụ mã** (thêm bộ nhớ đệm Redis):

```javascript
// Lấy chi tiết sản phẩm——trước tiên truy vấn Redis, không có mới truy vấn cơ sở dữ liệu
async function getProduct(productId) {
  // 1. Trước tiên truy vấn bộ nhớ đệm Redis
  const cacheKey = `product:${productId}`
  const cached = await redis.get(cacheKey)

  if (cached) {
    // Cache hit! Trả về trực tiếp, khoảng 1 mili giây
    return JSON.parse(cached)
  }

  // 2. Cache miss, truy vấn cơ sở dữ liệu
  const product = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId]
  )

  // 3. Sau khi tìm thấy, ghi vào Redis, đặt hết hạn sau 30 phút
  await redis.setex(
    cacheKey,
    1800,  // 30 phút = 1800 giây
    JSON.stringify(product)
  )

  return product
}
```

**So sánh cải thiện hiệu suất**:

| Tình huống | Không bộ nhớ đệm | Bộ nhớ đệm Redis | Cải thiện bao nhiêu lần |
|------|-------|--------------|---------|
| Truy vấn sản phẩm bình thường | 50ms | 5ms (cache hit) | **10 lần** |
| Truy vấn sản phẩm nóng | 80ms | 1ms (tỷ lệ trúng 95%) | **80 lần** |
| QPS cơ sở dữ liệu | 2000 (tối đa) | 200 (bộ nhớ đệm chặn 90%) | **Áp lực cơ sở dữ liệu giảm 10 lần** |
| Người dùng đồng thời tối đa | 2000 người | 20000 người | **10 lần** |

**Những cải thiện mang lại**:
1. **Tốc độ phản hồi**: cache hit, thời gian phản hồi từ 50ms giảm xuống 1-5ms
2. **Khả năng xử lý đồng thời**: hệ thống có thể hỗ trợ người dùng từ 2000 tăng lên 20000
3. **Áp lực cơ sở dữ liệu**: 90% yêu cầu bị Redis chặn, CPU cơ sở dữ liệu từ 80% giảm xuống 20%
4. **Trải nghiệm người dùng**: tốc độ tải trang cải thiện đáng kể, khiếu nại người dùng giảm

**Những thách thức mới**:
1. **Vấn đề tính nhất quán bộ nhớ đệm**: giá sản phẩm đã thay đổi, cơ sở dữ liệu cập nhật, nhưng bộ nhớ đệm vẫn là cũ
2. **Lỗ hổng bộ nhớ đệm**: có người cố ý truy vấn ID sản phẩm không tồn tại (như id=-1), mỗi lần đều xuyên qua bộ nhớ đệm đến cơ sở dữ liệu
3. **Bão bộ nhớ đệm**: khi hệ thống khởi động lại, tất cả bộ nhớ đệm hết hạn cùng lúc, lượng lớn yêu cầu đổ xuống cơ sở dữ liệu
4. **Lỗi Redis đơn điểm**: Redis bị ngừng hoạt động, tất cả yêu cầu trực tiếp đổ vào cơ sở dữ liệu, hệ thống có thể sập

**Giải pháp**:
- **Tính nhất quán bộ nhớ đệm**: khi cập nhật cơ sở dữ liệu, đồng bộ xóa bộ nhớ đệm
- **Lỗ hổng bộ nhớ đệm**: cũng caching dữ liệu không tồn tại vào Redis (giá trị rỗng, đặt TTL ngắn hơn, chẳng hạn 5 phút)
- **Bão bộ nhớ đệm**: thêm giá trị ngẫu nhiên vào thời gian hết hạn bộ nhớ đệm, tránh hết hạn cùng lúc
:::

Sau khi đưa vào Redis, hiệu suất hệ thống cải thiện đáng kể, nhưng những vấn đề mới cũng xuất hiện. Đội ngũ bắt đầu nghiên cứu cách giải quyết các vấn đề liên quan đến bộ nhớ đệm.

### 3.3 Giai đoạn ba: Kiến trúc bộ nhớ đệm nhiều tầng——cải thiện hiệu suất thêm 5 lần

**Bối cảnh**: số lượng người dùng tăng lên 100 vạn, ngay cả bộ nhớ đệm Redis cũng bắt đầu trở thành nút thắt (QPS Redis đơn máy tối đa khoảng 100 vạn), đội ngũ quyết định đưa vào bộ nhớ đệm nhiều tầng.

**Stack công nghệ**:
- Bộ nhớ đệm L1: bộ nhớ đệm cục bộ ứng dụng (Caffeine)
- Bộ nhớ đệm L2: cụm Redis
- Cơ sở dữ liệu: cụm MySQL chính-phụ

**Kiến trúc hệ thống**:
```
Yêu cầu người dùng → CDN bộ nhớ đệm (tài nguyên tĩnh) → Máy chủ ứng dụng
                                        ↓
                          L1: Bộ nhớ đệm cục bộ (Caffeine) → Trượt → L2: Redis → Trượt → MySQL
```

**Đặc điểm của giai đoạn này**:
- ✅ **Ưu điểm**: hiệu suất cực đoan (bộ nhớ đệm cục bộ chỉ cần 0.1 mili giây), độ khả dụng cao (Redis sập không ảnh hưởng đến dữ liệu nóng)
- ❌ **Nhược điểm**: kiến trúc phức tạp, tính nhất quán bộ nhớ đệm nhiều tầng khó đảm bảo

::: details Xem mã triển khai bộ nhớ đệm nhiều tầng
**Ví dụ mã** (bộ nhớ đệm cục bộ + Redis hai tầng bộ nhớ đệm):

```javascript
// Sử dụng bộ nhớ đệm cục bộ Caffeine
const caffeine = require('caffeine')
const localCache = new caffeine.Cache({
  max: 1000,              // Tối đa 1000 mục
  ttl: 30,                // Hết hạn sau 30 giây
})

// Lấy chi tiết sản phẩm——hai tầng bộ nhớ đệm
async function getProduct(productId) {
  const cacheKey = `product:${productId}`

  // L1: Trước tiên truy vấn bộ nhớ đệm cục bộ (nhanh nhất, khoảng 0.1 mili giây)
  const localCached = localCache.get(cacheKey)
  if (localCached) {
    console.log('L1 trúng')
    return localCached
  }

  // L2: Bộ nhớ đệm cục bộ trượt, truy vấn Redis (nhanh hơn, khoảng 1 mili giây)
  const redisCached = await redis.get(cacheKey)
  if (redisCached) {
    console.log('L2 trúng, lấp L1')
    const product = JSON.parse(redisCached)
    // Lấp lại bộ nhớ đệm cục bộ
    localCache.set(cacheKey, product)
    return product
  }

  // L3: Redis cũng trượt, truy vấn cơ sở dữ liệu (chậm nhất, khoảng 10 mili giây)
  console.log('L3 trúng, lấp lại L2 và L1')
  const product = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId]
  )

  // Lấp lại Redis (hết hạn sau 30 phút)
  await redis.setex(cacheKey, 1800, JSON.stringify(product))
  // Lấp lại bộ nhớ đệm cục bộ
  localCache.set(cacheKey, product)

  return product
}
```

**So sánh hiệu suất bộ nhớ đệm nhiều tầng**:

| Tầng bộ nhớ đệm | Thời gian phản hồi | Tỷ lệ trúng | Dữ liệu phù hợp để lưu trữ |
|---------|---------|--------|--------------|
| **L1: Bộ nhớ đệm cục bộ** | ~0.1 mili giây | 70% (siêu nóng) | Sản phẩm nóng, cấu hình hệ thống, phiên người dùng |
| **L2: Bộ nhớ đệm Redis** | ~1 mili giây | 25% (nóng bình thường) | Hầu hết dữ liệu sản phẩm, tổng hợp bình luận |
| **L3: Cơ sở dữ liệu** | ~10 mili giây | 5% (dữ liệu lạnh) | Dữ liệu đầy đủ của tất cả sản phẩm |

**Cải thiện hiệu suất toàn diện**:
- **Thời gian phản hồi trung bình**: 5ms (giai đoạn hai) → 1ms (giai đoạn ba), **cải thiện thêm 5 lần**
- **Xử lý đồng thời tối đa**: 20 vạn người dùng (giai đoạn hai) → 100 vạn người dùng (giai đoạn ba), **cải thiện 5 lần**
- **QPS cơ sở dữ liệu**: 200 (giai đoạn hai) → 50 (giai đoạn ba), **áp lực thêm giảm 4 lần**

**Vấn đề mới được giải quyết ở giai đoạn này**:
1. **Tính nhất quán bộ nhớ đệm cục bộ**: bộ nhớ đệm cục bộ nhiều thể hiện ứng dụng có thể không nhất quán (thể hiện A cache giá cũ, thể hiện B là giá mới)
   - **Giải pháp**: đặt TTL bộ nhớ đệm cục bộ ngắn (30 giây), giảm thiểu cửa sổ thời gian không nhất quán
2. **Làm ấm bộ nhớ đệm**: khi hệ thống khởi động lại, bộ nhớ đệm cục bộ là trống, lượng lớn yêu cầu xuyên qua đến Redis
   - **Giải pháp**: khi khởi động hệ thống, chủ động tải dữ liệu nóng vào bộ nhớ đệm cục bộ
:::

Kiến trúc bộ nhớ đệm nhiều tầng được sử dụng rộng rãi ở các công ty công nghệ lớn (như Taobao, JD.com), nó có thể hỗ trợ truy cập hàng triệu QPS.

### 3.4 Bảng toàn cảnh tiến hóa kiến trúc bộ nhớ đệm

| Giai đoạn | Kiến trúc | Thời gian phản hồi | Xử lý đồng thời tối đa | Thay đổi cốt lõi |
|------|------|---------|---------|---------|
| **Giai đoạn một: Không bộ nhớ đệm** | Ứng dụng → Cơ sở dữ liệu | 50ms | 2000 người dùng | Cơ sở dữ liệu chạy trần, hiệu suất kém |
| **Giai đoạn hai: Bộ nhớ đệm đơn tầng** | Ứng dụng → Redis → Cơ sở dữ liệu | 5ms | 20000 người dùng | Đưa vào Redis, hiệu suất cải thiện 10 lần |
| **Giai đoạn ba: Bộ nhớ đệm nhiều tầng** | Ứng dụng → Bộ nhớ đệm cục bộ → Redis → Cơ sở dữ liệu | 1ms | 100000 người dùng | Bộ nhớ đệm cục bộ + Redis, hiệu suất cải thiện thêm 5 lần |

::: tip 📊 Bạn có thể thấy điều gì từ bảng?
**Giai đoạn một → Giai đoạn hai**: bước ngoặt. Sau khi đưa vào Redis, hiệu suất cải thiện 10 lần, áp lực cơ sở dữ liệu giảm 90%. Đây là bước chuyển từ "có thể dùng" sang "có thể dùng được".

**Giai đoạn hai → Giai đoạn ba**: tinh chỉnh cực đoan. Sau khi đưa vào bộ nhớ đệm cục bộ, hiệu suất cải thiện thêm 5 lần. Đây là bước nâng cao từ "có thể dùng được" lên "cực tốt", phù hợp với tình huống lưu lượng siêu lớn.

**Cảnh báo thực chiến**:
- **Số người dùng < 10 vạn**: giai đoạn một (không bộ nhớ đệm) đủ dùng, nhưng nên đưa vào Redis (giai đoạn hai)
- **Số người dùng 10-100 vạn**: giai đoạn hai (bộ nhớ đệm Redis) là lựa chọn tốt nhất
- **Số người dùng > 100 vạn**: cân nhắc giai đoạn ba (bộ nhớ đệm nhiều tầng), nhưng chú ý độ phức tạp tính nhất quán

**Tóm tắt lại**: tiến hóa kiến trúc bộ nhớ đệm không chỉ là "thêm nhiều lớp bộ nhớ đệm", mà là **chọn kiến trúc phù hợp dựa trên quy mô lưu lượng**——thiết kế quá mức sẽ tăng độ phức tạp, thiết kế thiếu sẽ dẫn đến nút thắt hiệu suất.
:::

---

## 4. Ba vấn đề kinh điển của bộ nhớ đệm: Lỗ hổng, đánh thủng, bão

Trong thực chiến, bộ nhớ đệm sẽ gây ra ba loại vấn đề kinh điển. Nếu không hiểu chúng, hệ thống của bạn có thể đột nhiên sập vào một lúc nào đó. Hãy dùng so sánh đời thường để hiểu những vấn đề này.

### 4.1 Lỗ hổng bộ nhớ đệm: Truy vấn dữ liệu không tồn tại

**Định nghĩa vấn đề**: truy vấn một **dữ liệu không tồn tại** (như id=-1), không có trong bộ nhớ đệm (vì không lưu), cơ sở dữ liệu cũng không có, dẫn đến mỗi yêu cầu đều xuyên qua trực tiếp đến cơ sở dữ liệu.

::: tip 🤔 So sánh lỗ hổng bộ nhớ đệm bằng "tìm sách"
Tưởng tượng bạn tìm một cuốn sách ở thư viện, bạn hỏi nhân viên: "Có cuốn 《Sách không tồn tại》 không?"

**Quy trình bình thường**:
- Nhân viên kiểm tra mục lục: "Không có cuốn này"
- Bạn rời đi

**Tình huống lỗ hổng bộ nhớ đệm**:
- Lần 1 bạn đến hỏi, nhân viên kiểm tra cơ sở dữ liệu: "Không có", báo cho bạn
- Lần 2 bạn đến hỏi, nhân viên lại kiểm tra cơ sở dữ liệu một lần: "Không có"
- Lần 100 bạn đến hỏi, nhân viên vẫn kiểm tra cơ sở dữ liệu: "Không có"

**Vấn đề**: nhân viên (cơ sở dữ liệu) bị làm phiền, mỗi lần đều phải kiểm tra cơ sở dữ liệu, mặc dù câu trả lời luôn là "không có".

**Giải pháp**: nhân viên ghi nhớ "《Sách không tồn tại》 không tồn tại", lần tiếp theo bạn hỏi, nhân viên trực tiếp nói "không có", không cần kiểm tra cơ sở dữ liệu. Đây chính là **cache dữ liệu rỗng**.
:::

**Tình huống thực tế**:
- Hacker tấn công bằng cách tạo lượng lớn yêu cầu với ID không tồn tại (như id=-1, id=999999999)
- Crawler xuyên qua các đường dẫn tài nguyên không tồn tại (như /api/products/invalid-id)
- Lỗi logic nghiệp vụ dẫn đến truy vấn dữ liệu không hợp lệ

**Giải pháp 1: Cache dữ liệu rỗng**

```javascript
async function getProduct(productId) {
  const cacheKey = `product:${productId}`

  // 1. Trước tiên truy vấn bộ nhớ đệm
  const cached = await redis.get(cacheKey)
  if (cached !== null) {
    // Chú ý: cached có thể là chuỗi "null"
    if (cached === 'null') {
      // Cache lưu "dữ liệu rỗng", nói rằng dữ liệu không tồn tại trong cơ sở dữ liệu
      return null
    }
    return JSON.parse(cached)
  }

  // 2. Truy vấn cơ sở dữ liệu
  const product = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId]
  )

  // 3. Ngay cả cơ sở dữ liệu không có, cũng cache "null", đặt TTL ngắn hơn (như 5 phút)
  if (!product) {
    await redis.setex(cacheKey, 300, 'null')
    return null
  }

  // 4. Tìm thấy dữ liệu, cache bình thường
  await redis.setex(cacheKey, 1800, JSON.stringify(product))
  return product
}
```

**Giải pháp 2: Bộ lọc Bloom (Bloom Filter)**

Bộ lọc Bloom là một công cụ "nhanh kiểm tra xem dữ liệu có tồn tại không", nó giống như "chỉ mục siêu":

::: tip 📖 Bộ lọc Bloom là gì?
Tưởng tượng bạn có một "hộp đen thần kỳ":
- Bạn hỏi nó: "ID sản phẩm 123 có tồn tại không?"
- Nó nói: "**Chắc chắn không tồn tại**" → Thế thì thực sự không tồn tại, không cần truy vấn cơ sở dữ liệu
- Nó nói: "**Có thể tồn tại**" → Thế thì đi truy vấn cơ sở dữ liệu để xác nhận

**Đặc điểm**:
- **Không bao giờ bỏ sót**: nếu nó nói không tồn tại, thì thực sự không tồn tại
- **Có thể nhầm**: nếu nó nói có thể tồn tại, có khả năng thực tế không tồn tại (xác suất rất thấp, có thể điều chỉnh)

**Giá trị**: bộ lọc Bloom có thể chặn 99% yêu cầu "không tồn tại" trước khi truy vấn bộ nhớ đệm, bảo vệ cơ sở dữ liệu.
:::

```javascript
// Sử dụng bộ lọc Bloom
const { BloomFilter } = require('bloom-filters')

// Khởi tạo bộ lọc Bloom (giả sử tối đa 100 vạn ID sản phẩm)
const bloomFilter = new BloomFilter(1000000, 0.01)  // Tỷ lệ nhầm 1%

// Khi hệ thống khởi động, thêm tất cả ID sản phẩm vào bộ lọc Bloom
async function initBloomFilter() {
  const allIds = await db.query('SELECT id FROM products')
  allIds.forEach(row => {
    bloomFilter.add(row.id)
  })
}

// Trước khi truy vấn sản phẩm, sử dụng bộ lọc Bloom để kiểm tra
async function getProduct(productId) {
  // 1. Trước tiên sử dụng bộ lọc Bloom để kiểm tra
  if (!bloomFilter.has(productId)) {
    // Chắc chắn không tồn tại, trả về null trực tiếp, không cần truy vấn cơ sở dữ liệu
    console.log('Bộ lọc Bloom chặn: sản phẩm không tồn tại')
    return null
  }

  // 2. Bộ lọc Bloom nói "có thể tồn tại", truy vấn bộ nhớ đệm
  const cached = await redis.get(`product:${productId}`)
  if (cached) {
    return JSON.parse(cached)
  }

  // 3. Bộ nhớ đệm trượt, truy vấn cơ sở dữ liệu
  const product = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId]
  )

  if (!product) {
    // Bộ lọc Bloom nhầm (xác suất rất thấp), thực tế không tồn tại
    await redis.setex(`product:${productId}`, 300, 'null')
    return null
  }

  // 4. Tìm thấy dữ liệu, ghi vào bộ nhớ đệm
  await redis.setex(`product:${productId}`, 1800, JSON.stringify(product))
  return product
}
```

### 4.2 Đánh thủng bộ nhớ đệm: Dữ liệu nóng hết hạn

**Định nghĩa vấn đề**: một **dữ liệu nóng** (như sản phẩm nóng, tin tức nóng) trong bộ nhớ đệm hết hạn (TTL hết), lúc này lượng lớn yêu cầu đồng thời đến, tất cả đều truy vấn cơ sở dữ liệu, dẫn đến áp lực cơ sở dữ liệu tăng vọt.

::: tip 🤔 So sánh đánh thủng bộ nhớ đệm bằng "xoành cuốn sách"
Tưởng tượng thư viện có cuốn 《Harry Potter》, siêu nổi tiếng, 100 người muốn mượn.

**Tình huống bình thường**:
- Thư viện đặt 《Harry Potter》 ở "bàn mượn sách" (bộ nhớ đệm)
- Mọi người trực tiếp lấy từ bàn mượn sách, không cần tìm ở kệ sách

**Tình huống đánh thủng bộ nhớ đệm**:
- Cuốn 《Harry Potter》 ở bàn mượn sách hết hạn (được trả về kệ sách)
- 100 người cùng đến mượn, phát hiện bàn mượn sách không có
- 100 người cùng xoành đến kệ sách tìm (cơ sở dữ liệu)
- Nhân viên quản lý kệ sách (cơ sở dữ liệu) bị vây quanh

**Vấn đề**: không phải "sách không tồn tại", mà là "sách siêu nổi tiếng" đột nhiên biến mất từ bộ nhớ đệm, dẫn đến lượng lớn yêu cầu đổ xuống cơ sở dữ liệu.
:::

**Tình huống thực tế**:
- Bảng xếp hạng Twitter/X hết hạn, hàng chục vạn người truy cập cùng lúc
- Tin tức nổi tiếng của người nổi tiếng, fan đổ xô truy cập
- Dữ liệu số lượng hàng tồn kho trong hoạt động khuyến mại hết hạn

**Giải pháp 1: Khóa loại trừ (Mutex Lock)**

```javascript
async function getProduct(productId) {
  const cacheKey = `product:${productId}`

  // 1. Trước tiên truy vấn bộ nhớ đệm
  const cached = await redis.get(cacheKey)
  if (cached) {
    return JSON.parse(cached)
  }

  // 2. Bộ nhớ đệm trượt, lấy khóa phân tán
  const lockKey = `lock:${productId}`
  const lock = await redis.set(lockKey, '1', 'NX', 'EX', 10)  // Khóa 10 giây

  if (lock === 'OK') {
    // 3. Lấy khóa thành công, truy vấn cơ sở dữ liệu
    console.log('Lấy khóa thành công, truy vấn cơ sở dữ liệu')
    const product = await db.query(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    )

    // 4. Ghi vào bộ nhớ đệm
    await redis.setex(cacheKey, 1800, JSON.stringify(product))

    // 5. Giải phóng khóa
    await redis.del(lockKey)
    return product
  } else {
    // 6. Không lấy được khóa, chờ 50ms rồi thử lại
    console.log('Không lấy được khóa, chờ rồi thử lại')
    await new Promise(resolve => setTimeout(resolve, 50))
    return getProduct(productId)  // Thử lại đệ quy
  }
}
```

**Giải pháp 2: Hết hạn logic (Logical Expiration)**

```javascript
async function getProduct(productId) {
  const cacheKey = `product:${productId}`

  // 1. Truy vấn bộ nhớ đệm
  const cached = await redis.get(cacheKey)
  if (cached) {
    const data = JSON.parse(cached)

    // 2. Kiểm tra thời gian hết hạn logic
    if (Date.now() < data.expireTime) {
      // Chưa hết hạn, trả về trực tiếp
      return data.product
    } else {
      // 3. Hết hạn logic, xây dựng lại bộ nhớ đệm không đồng bộ, vừa trả về dữ liệu cũ
      console.log('Hết hạn logic, xây dựng lại bộ nhớ đệm không đồng bộ')
      rebuildCacheAsync(productId)  // Xây dựng lại không đồng bộ
      return data.product  // Trả về dữ liệu cũ
    }
  }

  // 4. Bộ nhớ đệm không tồn tại (lần tải đầu tiên), đồng bộ truy vấn cơ sở dữ liệu
  const product = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId]
  )

  // 5. Ghi vào bộ nhớ đệm (bao gồm thời gian hết hạn logic)
  const cacheData = {
    product: product,
    expireTime: Date.now() + 30 * 60 * 1000  // Hết hạn logic sau 30 phút
  }
  await redis.set(cacheKey, JSON.stringify(cacheData))

  return product
}

// Xây dựng lại bộ nhớ đệm không đồng bộ
async function rebuildCacheAsync(productId) {
  const lockKey = `rebuild:${productId}`
  const lock = await redis.set(lockKey, '1', 'NX', 'EX', 10)

  if (lock === 'OK') {
    console.log('Xây dựng lại bộ nhớ đệm bắt đầu')
    const product = await db.query(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    )

    const cacheData = {
      product: product,
      expireTime: Date.now() + 30 * 60 * 1000
    }
    await redis.set(`product:${productId}`, JSON.stringify(cacheData))
    await redis.del(lockKey)
    console.log('Xây dựng lại bộ nhớ đệm hoàn tất')
  }
}
```

### 4.3 Bão bộ nhớ đệm: Lượng lớn dữ liệu hết hạn cùng lúc

**Định nghĩa vấn đề**: lượng lớn dữ liệu bộ nhớ đệm **hết hạn tập trung vào cùng một thời điểm** (hoặc Redis ngừng hoạt động), dẫn đến tất cả yêu cầu xuyên qua trực tiếp đến cơ sở dữ liệu, đột nhiên áp lực cơ sở dữ liệu tăng vọt.

::: tip 🤔 So sánh bão bộ nhớ đệm bằng "thư viện trả sách hàng loạt"
Tưởng tượng thư viện có 1000 cuốn sách ở "bàn mượn sách" (bộ nhớ đệm).

**Tình huống bình thường**:
- 1000 cuốn sách có thời gian trả hạn khác nhau: có ngày hôm nay trả, có ngày mai, có ngày kia
- Mỗi ngày chỉ vài chục cuốn hết hạn, nhân viên quản lý (cơ sở dữ liệu) dễ dàng xử lý

**Tình huống bão bộ nhớ đệm**:
- Hệ thống khởi động lại, nhân viên đặt 1000 cuốn sách "30 ngày sau hết hạn"
- 30 ngày sau, 1000 cuốn sách hết hạn cùng lúc
- 1000 người cùng đến mượn, phát hiện bàn mượn sách trống
- 1000 người cùng xoành đến kệ sách tìm (cơ sở dữ liệu)
- Nhân viên quản lý kệ sách (cơ sở dữ liệu) bị vây quanh

**Vấn đề**: không phải vấn đề của một cuốn sách, mà là **lượng lớn dữ liệu hết hạn cùng lúc**, dẫn đến cơ sở dữ liệu áp lực đột tăng.
:::

**Tình huống thực tế**:
- Hệ thống khởi động lại, tất cả bộ nhớ đệm từ 0 bắt đầu xây dựng, cùng đặt TTL là 30 phút
- Tác vụ định kỳ xây dựng lại bộ nhớ đệm, đặt thời gian hết hạn giống nhau
- Dịch vụ bộ nhớ đệm (Redis) sập hoặc có lỗi mạng

**Giải pháp 1: TTL ngẫu nhiên**

```javascript
async function getProduct(productId) {
  const cacheKey = `product:${productId}`

  const cached = await redis.get(cacheKey)
  if (cached) {
    return JSON.parse(cached)
  }

  const product = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId]
  )

  // Chính yếu: thêm giá trị ngẫu nhiên vào TTL cơ sở (30 phút ± 5 phút)
  const baseTTL = 1800  // 30 phút
  const randomOffset = Math.floor(Math.random() * 600) - 300  // -5 đến +5 phút
  const finalTTL = baseTTL + randomOffset

  console.log(`TTL bộ nhớ đệm: ${finalTTL} giây (${Math.floor(finalTTL / 60)} phút)`)
  await redis.setex(cacheKey, finalTTL, JSON.stringify(product))

  return product
}
```

**Giải pháp 2: Làm ấm bộ nhớ đệm (Cache Preheating)**

```javascript
// Khi hệ thống khởi động, chủ động tải dữ liệu nóng vào bộ nhớ đệm
async function cacheWarmup() {
  console.log('Bắt đầu làm ấm bộ nhớ đệm...')

  // 1. Truy vấn 1000 sản phẩm nóng nhất (sắp xếp theo lượt xem)
  const hotProducts = await db.query(`
    SELECT * FROM products
    ORDER BY view_count DESC
    LIMIT 1000
  `)

  // 2. Ghi hàng loạt vào Redis
  for (const product of hotProducts) {
    const cacheKey = `product:${product.id}`
    const ttl = 1800 + Math.floor(Math.random() * 600)  // 30 phút ± 5 phút
    await redis.setex(cacheKey, ttl, JSON.stringify(product))
  }

  console.log(`Làm ấm bộ nhớ đệm hoàn tất, đã tải ${hotProducts.length} sản phẩm nóng`)
}

// Khi ứng dụng khởi động, chạy
cacheWarmup()
```

**Giải pháp 3: Cắt mạch hạ cấp (Circuit Breaker)**

```javascript
// Sử dụng cắt mạch để bảo vệ cơ sở dữ liệu
const CircuitBreaker = require('opossum')

// Thiết lập cắt mạch
const dbQueryBreaker = new CircuitBreaker(
  async (productId) => {
    return await db.query('SELECT * FROM products WHERE id = ?', [productId])
  },
  {
    timeout: 3000,  // 3 giây timeout
    errorThresholdPercentage: 50,  // Tỷ lệ lỗi vượt 50% thì cắt mạch
    resetTimeout: 30000  // 30 giây sau sẽ cố gắng phục hồi
  }
)

// Xử lý hạ cấp khi cắt mạch
dbQueryBreaker.fallback(() => {
  console.log('Cơ sở dữ liệu bị cắt mạch, trả về dữ liệu hạ cấp')
  return {
    id: productId,
    name: 'Dịch vụ bận, vui lòng thử lại sau',
    status: 'degraded'
  }
})

async function getProduct(productId) {
  const cacheKey = `product:${productId}`

  const cached = await redis.get(cacheKey)
  if (cached) {
    return JSON.parse(cached)
  }

  // Truy vấn cơ sở dữ liệu qua cắt mạch
  const product = await dbQueryBreaker.fire(productId)

  if (product.status === 'degraded') {
    return product  // Trả về dữ liệu hạ cấp
  }

  await redis.setex(cacheKey, 1800, JSON.stringify(product))
  return product
}
```

👇 **Hãy thử**:
Bản demo dưới đây so sánh ba vấn đề lỗ hổng, đánh thủng, bão bộ nhớ đệm và các giải pháp:

<CacheProblemsDemo />

---

## 5. Chiến lược tính nhất quán bộ nhớ đệm: Cách giữ bộ nhớ đệm và cơ sở dữ liệu đồng bộ

Bản chất bộ nhớ đệm là bản sao dữ liệu, bản sao và dữ liệu gốc (cơ sở dữ liệu) không thể tránh khỏi sự không nhất quán trong một cửa sổ thời gian. Cách kiểm soát cửa sổ thời gian này chính là thách thức cốt lõi của thiết kế bộ nhớ đệm.

### 5.1 Tại sao bộ nhớ đệm và cơ sở dữ liệu lại không đồng bộ?

::: tip 🤔 So sánh không đồng bộ bằng "giấy nhắc nhở và sổ danh bạ"
Tưởng tượng bạn ghi số điện thoại của A Minh trên giấy nhắc nhở: "A Minh: 123456", đây là bản sao của danh bạ (cơ sở dữ liệu).

**Tình huống không đồng bộ**:
- Bạn cập nhật danh bạ, số A Minh đổi thành "7654321"
- Nhưng bạn quên cập nhật giấy nhắc nhở
- Lần tới bạn tìm số điện thoại, xem giấy nhắc nhở, vẫn là số cũ "123456"

**Vấn đề**: giấy nhắc nhở (bộ nhớ đệm) và danh bạ (cơ sở dữ liệu) không đồng bộ.

**Nguyên nhân**: cập nhật dữ liệu gốc (cơ sở dữ liệu) nhưng quên cập nhật bản sao (bộ nhớ đệm). Trong hệ thống máy tính, đó là vì "cập nhật cơ sở dữ liệu" và "cập nhật bộ nhớ đệm" là hai thao tác độc lập, giữa chúng có cửa sổ thời gian, có thể bị các thao tác khác xáo trộn.
:::

**Tình huống đồng thời thực tế**:

| Thời gian | Thread A (cập nhật tuổi người dùng) | Thread B (truy vấn người dùng) | Cơ sở dữ liệu | Bộ nhớ đệm |
|------|---------------------|------------------|--------|------|
| T1 | Bắt đầu cập nhật cơ sở dữ liệu | - | age=20 | age=20 |
| T2 | Cơ sở dữ liệu cập nhật age=25 | Truy vấn bộ nhớ đệm, trúng age=20 | age=25 | age=20 ❌ |
| T3 | Xóa bộ nhớ đệm | - | age=25 | - |
| T4 | - | - | age=25 | Tải từ DB age=25 ✅ |

**Vấn đề**: ở thời điểm T2, Thread B đọc từ bộ nhớ đệm là giá trị cũ 20, nhưng cơ sở dữ liệu đã là 25. Đây chính là **không đồng bộ bộ nhớ đệm**.

### 5.2 Thực tiễn tốt nhất: Cập nhật cơ sở dữ liệu trước, rồi xóa bộ nhớ đệm

::: tip 🤔 Tại sao là "xóa" mà không phải "cập nhật" bộ nhớ đệm?
Bạn có thể tự hỏi: Tại sao không trực tiếp "cập nhật bộ nhớ đệm", mà lại "xóa bộ nhớ đệm"?

**Vấn đề của cập nhật bộ nhớ đệm**:
- Khi cập nhật đồng thời, có thể xảy ra thread A cập nhật bộ nhớ đệm trước, thread B cập nhật cơ sở dữ liệu sau nhưng bộ nhớ đệm không cập nhật
- Chi phí cập nhật bộ nhớ đệm có thể rất cao (chẳng hạn cần tập hợp dữ liệu từ nhiều bảng)
- Nếu sau đó dữ liệu bị xóa, cập nhật bộ nhớ đệm là vô ích

**Ưu điểm xóa bộ nhớ đệm**:
- Lần truy cập tiếp theo sẽ tự động tải từ cơ sở dữ liệu dữ liệu mới nhất (lazy loading)
- Tránh được tình huống cập nhật đồng thời dẫn đến dữ liệu bẩn
- Đơn giản đáng tin cậy, là thực tiễn tốt nhất của ngành
:::

**Quy trình chuẩn**:

```javascript
// Cập nhật thông tin sản phẩm
async function updateProduct(productId, updateData) {
  // 1. Cập nhật cơ sở dữ liệu trước
  await db.query(
    'UPDATE products SET name = ?, price = ? WHERE id = ?',
    [updateData.name, updateData.price, productId]
  )

  // 2. Rồi xóa bộ nhớ đệm (không phải cập nhật!)
  await redis.del(`product:${productId}`)

  // 3. Lần truy vấn tiếp theo, bộ nhớ đệm trượt, sẽ tự động tải dữ liệu mới nhất từ cơ sở dữ liệu
  console.log('Cập nhật hoàn tất, bộ nhớ đệm đã xóa')
}
```

::: details Xem tại sao "cập nhật DB trước, rồi xóa cache" là phương án tối ưu
So sánh ba chiến lược cập nhật:

**Chiến lược 1: Cập nhật bộ nhớ đệm trước, rồi cập nhật cơ sở dữ liệu** ❌ Không nên
```javascript
// Vấn đề: nếu cập nhật cơ sở dữ liệu thất bại, bộ nhớ đệm là giá trị mới, cơ sở dữ liệu là giá trị cũ, vĩnh viễn không đồng bộ
await redis.set('product:1', newProduct)  // Cập nhật bộ nhớ đệm thành công
await db.query('UPDATE products SET ...')  // Cập nhật cơ sở dữ liệu thất bại!
// Kết quả: bộ nhớ đệm giá trị mới, cơ sở dữ liệu giá trị cũ, không đồng bộ vĩnh viễn!
```

**Chiến lược 2: Xóa bộ nhớ đệm trước, rồi cập nhật cơ sở dữ liệu** ❌ Không nên
```javascript
// Vấn đề: xóa và cập nhật giữa, có thread khác truy vấn, sẽ tải dữ liệu cũ vào bộ nhớ đệm
await redis.del('product:1')  // Xóa bộ nhớ đệm
// Lúc này thread B đến truy vấn, phát hiện bộ nhớ đệm không có, truy vấn cơ sở dữ liệu (vẫn giá trị cũ), ghi vào bộ nhớ đệm
await db.query('UPDATE products SET ...')  // Cập nhật cơ sở dữ liệu
// Kết quả: bộ nhớ đệm giá trị cũ, cơ sở dữ liệu giá trị mới, không đồng bộ!
```

**Chiến lược 3: Cập nhật cơ sở dữ liệu trước, rồi xóa bộ nhớ đệm** ✅ Nên dùng
```javascript
// Ưu điểm: cập nhật cơ sở dữ liệu sẽ khóa dòng, thread khác phải chờ, tránh dữ liệu bẩn
await db.query('UPDATE products SET ...')  // Cập nhật cơ sở dữ liệu (khóa dòng)
await redis.del('product:1')  // Xóa bộ nhớ đệm
// Ngay cả nếu xóa bộ nhớ đệm thất bại, lần truy vấn tiếp theo cũng sẽ quay lại (back source), không dẫn đến dữ liệu bẩn lâu dài
```

**Tại sao chiến lược 3 tối ưu nhất?**
1. **Khóa cơ sở dữ liệu bảo vệ**: thao tác cập nhật sẽ lấy khóa dòng, thread khác phải chờ
2. **Xóa thất bại ảnh hưởng nhỏ**: ngay cả xóa bộ nhớ đệm thất bại, lần truy vấn tiếp theo cũng sẽ quay lại, không dẫn đến dữ liệu bẩn
3. **Đơn giản đáng tin cậy**: không cần logic phức tạp thêm
:::

### 5.3 Xóa đôi lần với trễ: Bảo đảm tính nhất quán cực hạn ở tình huống cực đoan

**Tình huống**: trong tình huống đồng thời cao, ngay cả "cập nhật DB trước, rồi xóa cache", vẫn có xác suất rất nhỏ xảy ra không đồng bộ. Xóa đôi lần với trễ giúp giảm thiểu rủi ro này bằng cách xóa hai lần.

**Quy trình**:
```
1. Xóa bộ nhớ đệm
2. Cập nhật cơ sở dữ liệu
3. Chờ một khoảng thời gian (như 500ms)
4. Xóa lại bộ nhớ đệm
```

```javascript
async function updateProduct(productId, updateData) {
  const cacheKey = `product:${productId}`

  // 1. Xóa bộ nhớ đệm lần đầu
  await redis.del(cacheKey)

  // 2. Cập nhật cơ sở dữ liệu
  await db.query(
    'UPDATE products SET name = ?, price = ? WHERE id = ?',
    [updateData.name, updateData.price, productId]
  )

  // 3. Chờ 500ms (để các thread khác hoàn tất truy vấn)
  await new Promise(resolve => setTimeout(resolve, 500))

  // 4. Xóa lại bộ nhớ đệm (xóa dữ liệu cũ có thể bị các thread khác tải lại)
  await redis.del(cacheKey)

  console.log('Xóa đôi lần với trễ hoàn tất, dữ liệu đã đồng bộ')
}
```

**So sánh ba chiến lược tính nhất quán**:

| Chiến lược | Mức tính nhất quán | Ảnh hưởng hiệu suất | Độ phức tạp | Tình huống phù hợp |
|------|-----------|---------|--------|---------|
| **Cập nhật DB trước, xóa cache** | Nhất quán cuối cùng (cửa sổ không đồng bộ < 100ms) | Thấp | Thấp | Hầu hết tình huống, nên dùng mặc định |
| **Xóa đôi lần với trễ** | Nhất quán cuối cùng mạnh (cửa sổ không đồng bộ < 10ms) | Trung bình (trễ 500ms) | Trung bình | Tình huống yêu cầu tính nhất quán cao hơn (tài chính, kho tàng) |
| **Xóa cache trước, cập nhật DB** | Yếu (cửa sổ không đồng bộ lớn) | Thấp | Thấp | ❌ Không nên dùng, dễ có không đồng bộ |

👇 **Hãy thử**:
Bản demo dưới đây so sánh hiệu quả của ba chiến lược tính nhất quán. Nhấp vào "Cập nhật dữ liệu", quan sát sự thay đổi tính nhất quán giữa bộ nhớ đệm và cơ sở dữ liệu:

<CacheConsistencyDemo />

---

## 6. Thực chiến: Xây dựng một hệ thống bộ nhớ đệm hoàn chỉnh

Nói rất nhiều lý thuyết rồi, hãy xem một trường hợp thực tế: cách thiết kế hệ thống bộ nhớ đệm hoàn chỉnh cho trang chi tiết sản phẩm thương mại điện tử.

### 6.1 Phân tích tình huống nghiệp vụ

**Yêu cầu**: người dùng truy cập trang chi tiết sản phẩm, cần hiển thị thông tin cơ sở sản phẩm, giá, kho tàng, đánh giá v.v.

**Đặc điểm**:
- **Đọc nhiều ghi ít**: 100 lần truy vấn, 1 lần cập nhật (tỷ lệ đọc-ghi 100:1)
- **Dữ liệu nóng tập trung**: 20% sản phẩm chiếm 80% lưu lượng
- **Dữ liệu phức tạp**: thông tin cơ sở sản phẩm + giá + kho tàng + đánh giá tổng hợp
- **Yêu cầu tính nhất quán**: giá, kho tàng nhất quán mạnh, những cái khác nhất quán cuối cùng

**Chỉ số hiệu suất**:
- Thời gian phản hồi P99 < 100ms (99% yêu cầu trong 100ms)
- QPS cơ sở dữ liệu pik < 5000
- Tỷ lệ cache hit > 95%

### 6.2 Thiết kế kiến trúc

**Kiến trúc bộ nhớ đệm nhiều tầng**:

```
Yêu cầu người dùng
  ↓
CDN bộ nhớ đệm (tài nguyên tĩnh: ảnh, CSS, JS)
  ↓ Trượt
Nginx bộ nhớ đệm cục bộ (tổng hợp thông tin sản phẩm)
  ↓ Trượt
Máy chủ ứng dụng
  ↓
  ├─ L1: Bộ nhớ đệm cục bộ (Caffeine, sản phẩm nóng)
  │   ↓ Trượt
  ├─ L2: Bộ nhớ đệm Redis (tất cả dữ liệu sản phẩm)
  │   ↓ Trượt
  └─ L3: Cơ sở dữ liệu MySQL (dữ liệu đầy đủ)
```

### 6.3 Triển khai mã cốt lõi

**Triển khai bộ nhớ đệm nhiều tầng hoàn chỉnh (phiên bản rút gọn)**:

```javascript
const caffeine = require('caffeine')

// L1: Bộ nhớ đệm cục bộ (hết hạn sau 30 giây)
const localCache = new caffeine.Cache({
  max: 1000,
  ttl: 30,
})

// Lấy chi tiết sản phẩm (bộ nhớ đệm nhiều tầng)
async function getProduct(productId) {
  const cacheKey = `product:${productId}`

  // L1: Bộ nhớ đệm cục bộ (khoảng 0.1 mili giây)
  const localCached = localCache.get(cacheKey)
  if (localCached) {
    console.log('L1 trúng')
    return localCached
  }

  // L2: Bộ nhớ đệm Redis (khoảng 1 mili giây)
  const redisCached = await redis.get(cacheKey)
  if (redisCached) {
    console.log('L2 trúng, lấp L1')
    const product = JSON.parse(redisCached)
    localCache.set(cacheKey, product)
    return product
  }

  // L3: Cơ sở dữ liệu (khoảng 10 mili giây, có khóa phân tán chống đánh thủng)
  const lockKey = `lock:${productId}`
  const lock = await redis.set(lockKey, '1', 'NX', 'EX', 10)

  if (lock === 'OK') {
    console.log('L3 trúng, truy vấn cơ sở dữ liệu')
    const product = await db.query(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    )

    if (product) {
      // Ghi vào Redis (30 phút + TTL ngẫu nhiên)
      const ttl = 1800 + Math.floor(Math.random() * 600) - 300
      await redis.setex(cacheKey, ttl, JSON.stringify(product))
      // Lấp lại bộ nhớ đệm cục bộ
      localCache.set(cacheKey, product)
    }

    await redis.del(lockKey)
    return product
  } else {
    // Không lấy được khóa, chờ rồi thử lại
    await new Promise(resolve => setTimeout(resolve, 50))
    return getProduct(productId)
  }
}

// Cập nhật thông tin sản phẩm (cập nhật DB trước, rồi xóa cache)
async function updateProduct(productId, updateData) {
  const cacheKey = `product:${productId}`

  // 1. Cập nhật cơ sở dữ liệu
  await db.query(
    'UPDATE products SET name = ?, price = ? WHERE id = ?',
    [updateData.name, updateData.price, productId]
  )

  // 2. Xóa bộ nhớ đệm cục bộ
  localCache.del(cacheKey)

  // 3. Xóa bộ nhớ đệm Redis
  await redis.del(cacheKey)

  console.log('Cập nhật hoàn tất, bộ nhớ đệm đã xóa')
}
```

👇 **Hãy thử**:
Bản demo dưới đây cho thấy quy trình làm việc hoàn chỉnh của hệ thống bộ nhớ đệm nhiều tầng. Nhấp vào "Truy vấn sản phẩm", quan sát yêu cầu cách nó chạy qua các tầng bộ nhớ đệm:

<EcommerceCacheArchitectureDemo />

---

## 7. Tóm tắt và đường học tập

### 7.1 Ôn lại các điểm kiến thức cốt lõi

| Điểm kiến thức | Giải thích một câu | Vấn đề được giải quyết | Điểm cảnh báo thực chiến |
|--------|-----------|-----------|----------|
| **Cache hit** | Dữ liệu tìm thấy trong bộ nhớ đệm | Cải thiện hiệu suất 10-100 lần | Tỷ lệ trúng mục tiêu > 95% |
| **Lỗ hổng bộ nhớ đệm** | Truy vấn dữ liệu không tồn tại, mỗi lần đều truy vấn cơ sở dữ liệu | Cơ sở dữ liệu bị truy vấn độc hại kéo xuống | Bộ lọc Bloom + cache dữ liệu rỗng |
| **Đánh thủng bộ nhớ đệm** | Dữ liệu nóng hết hạn, lượng lớn yêu cầu đổ xuống cơ sở dữ liệu | Áp lực cơ sở dữ liệu tăng vọt | Khóa loại trừ + hết hạn logic |
| **Bão bộ nhớ đệm** | Lượng lớn dữ liệu hết hạn cùng lúc | Cơ sở dữ liệu bị áp đảo | TTL ngẫu nhiên + làm ấm bộ nhớ đệm |
| **Bộ nhớ đệm nhiều tầng** | Bộ nhớ đệm cục bộ + Redis + cơ sở dữ liệu | Cải thiện hiệu suất cực đoan | Tỷ lệ trúng L1 70%, L2 25% |
| **Tính nhất quán bộ nhớ đệm** | Giữ đồng bộ giữa bộ nhớ đệm và cơ sở dữ liệu | Dữ liệu chính xác | Cập nhật DB trước, xóa cache |
| **Xóa đôi lần với trễ** | Cập nhật trước sau, xóa bộ nhớ đệm hai lần | Tính nhất quán tình huống cực đoan | Chờ 500ms giữa hai lần xóa |

### 7.2 Đề xuất đường học tập

**Giai đoạn 1: Hiểu lý thuyết (1-2 ngày)**
- Nắm bản chất bộ nhớ đệm (bản sao dữ liệu, dùng không gian đổi lấy thời gian)
- Hiểu tỷ lệ trúng, TTL, loại bỏ và những khái niệm cốt lõi khác
- Hiểu sự khác biệt hiệu suất của các phương tiện lưu trữ khác nhau (bộ nhớ vs ổ cứng)

**Giai đoạn 2: Nắm cơ bản (2-3 ngày)**
- Học dùng Redis làm bộ nhớ đệm (lệnh SET, GET, SETEX)
- Triển khai logic đọc-ghi bộ nhớ đệm đơn giản (trước tiên truy vấn bộ nhớ đệm, trượt mới truy vấn cơ sở dữ liệu)
- Hiểu tại sao "khi cập nhật xóa bộ nhớ đệm" chứ không phải "cập nhật bộ nhớ đệm"

**Giai đoạn 3: Giải quyết vấn đề kinh điển (1 tuần)**
- Giải quyết lỗ hổng bộ nhớ đệm: triển khai bộ lọc Bloom hoặc cache dữ liệu rỗng
- Giải quyết đánh thủng bộ nhớ đệm: triển khai khóa loại trừ hoặc hết hạn logic
- Giải quyết bão bộ nhớ đệm: triển khai TTL ngẫu nhiên và làm ấm bộ nhớ đệm

**Giai đoạn 4: Bộ nhớ đệm nhiều tầng (1-2 tuần)**
- Đưa vào bộ nhớ đệm cục bộ (Caffeine/Guava)
- Thiết kế kiến trúc hai tầng bộ nhớ đệm cục bộ + Redis
- Xử lý vấn đề tính nhất quán bộ nhớ đệm nhiều tầng

**Giai đoạn 5: Thực chiến cấp sản xuất (liên tục)**
- Thiết kế hệ thống bộ nhớ đệm hoàn chỉnh cho trang chi tiết sản phẩm
- Xây dựng giám sát (tỷ lệ cache hit, thời gian phản hồi)
- Kiểm tra tải và điều chỉnh hiệu suất

::: info 💡 Lời cuối
Bộ nhớ đệm là viên đá tảng của hệ thống đồng thời cao. Từ trang chi tiết sản phẩm Taobao đến bảng xếp hạng Twitter, từ bảng tin bạn bè Wechat đến luồng video Douyin, tất cả các hệ thống hiệu suất cao đều có một kiến trúc bộ nhớ đệm được thiết kế tỉ mỉ phía sau.

Hiểu bộ nhớ đệm không chỉ là học một công nghệ, mà là hiểu **dùng không gian đổi lấy thời gian, dùng bản sao bảo vệ dữ liệu chính** của tư duy kiến trúc. Khi bạn thực sự làm chủ bộ nhớ đệm, hiệu suất hệ thống của bạn sẽ vượt bước từ "có thể dùng" sang "có thể dùng được", cuối cùng tới "cực tốt".

Hy vọng bài viết này có thể giúp bạn xây dựng hiểu biết hoàn chỉnh về hệ thống bộ nhớ đệm. Khi bạn gặp vấn đề hiệu suất trong dự án thực tế, bạn sẽ có thể nghĩ: "Liệu có thể dùng bộ nhớ đệm để giải quyết?"
:::
