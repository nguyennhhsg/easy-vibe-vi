# Mẫu Thiết Kế

::: tip Lời dẫn
**Tại sao code của bạn luôn là "chạy được nhưng rối tung"?** Bạn có thể đã gặp tình huống này: yêu cầu thay đổi, code phải sửa lớn; muốn tái sử dụng một đoạn logic, nhưng nó lại vướng víu với code khác. Mẫu thiết kế chính là "công thức tổ chức code" mà những người đi trước đã tổng kết, giúp bạn viết code linh hoạt và dễ bảo trì.

Chương này sẽ giúp bạn hiểu những mẫu thiết kế thực dụng nhất, không phải học thuộc lòng, mà là hiểu "tình huống nào dùng công thức nào".
:::

**Bài viết này sẽ dạy bạn những gì?**

| Chương | Nội dung | Khái niệm cốt lõi |
|--------|---------|-----------------|
| **Chương 1** | Mẫu thiết kế là gì | Bản chất và phân loại mẫu |
| **Chương 2** | Mẫu tạo lập | Cách tạo đối tượng một cách thanh lịch |
| **Chương 3** | Mẫu cấu trúc | Cách tổ chức cấu trúc code |
| **Chương 4** | Mẫu hành vi | Cách quản lý tương tác giữa các đối tượng |

Sau chương này, bạn sẽ nắm vững những mẫu thiết kế thường dùng nhất, có khả năng nhận diện các tình huống áp dụng và sử dụng linh hoạt trong dự án thực tế.

---

## 0. Bức tranh toàn cảnh: Bản chất của Mẫu Thiết Kế

Hãy tưởng tượng bạn đang học nấu ăn. Bạn có thể mỗi lần đều bắt đầu từ đầu để tìm cách, hoặc có thể học những công thức nổi tiếng — công thức không sẽ hạn chế sáng tạo của bạn, mà ngược lại, nó giúp bạn đứng trên vai những người đi trước. Mẫu thiết kế chính là "công thức kinh điển" trong thế giới lập trình.

::: tip Giá trị của Mẫu Thiết Kế
- **Ngôn ngữ chung**: Nói "ở đây dùng mẫu Observer", team lập tức hiểu ý định thiết kế của bạn
- **Tái sử dụng kinh nghiệm**: Không phải bước lại những cái bẫy mà người trước đã bước vào
- **Mở rộng linh hoạt**: Mẫu tốt giúp code chỉ cần sửa nhỏ khi đối mặt với thay đổi, thay vì sửa lớn
:::

Hãy khám phá các mẫu thiết kế phổ biến và mục đích sử dụng qua thành phần tương tác dưới đây:

<DesignPatternCatalogDemo />

---

## 1. Mẫu Tạo Lập: Cách Tạo Đối Tượng Một Cách Thanh Lịch

### 1.1 Mẫu Singleton (Singleton)

**Tình huống**: Toàn bộ chương trình chỉ cần một instance duy nhất, ví dụ như trình quản lý cấu hình, logger, hoặc connection pool cơ sở dữ liệu.

```javascript
class ConfigManager {
  static instance = null

  static getInstance() {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  constructor() {
    this.config = {}
  }
}

// Dù gọi bao nhiêu lần, vẫn là cùng một instance
const a = ConfigManager.getInstance()
const b = ConfigManager.getInstance()
console.log(a === b) // true
```

### 1.2 Mẫu Factory (Factory)

**Tình huống**: Tạo các loại đối tượng khác nhau dựa trên các điều kiện khác nhau, phía gọi không cần biết chi tiết tạo lập cụ thể.

```javascript
function createNotification(type, message) {
  switch (type) {
    case 'email':
      return { send: () => console.log(`Gửi email: ${message}`) }
    case 'sms':
      return { send: () => console.log(`Gửi tin nhắn: ${message}`) }
    case 'push':
      return { send: () => console.log(`Gửi thông báo: ${message}`) }
    default:
      throw new Error(`Loại thông báo không xác định: ${type}`)
  }
}

// Phía gọi không quan tâm đến cài đặt cụ thể
const notification = createNotification('email', 'Xin chào')
notification.send()
```

---

## 2. Mẫu Cấu Trúc: Cách Tổ Chức Cấu Trúc Code

### 2.1 Mẫu Adapter (Adapter)

**Tình huống**: Hai interface không tương thích, cần một "adaptor chuyển đổi". Ví dụ như dữ liệu trả về từ API cũ và định dạng mà component mới kỳ vọng không khớp nhau.

```javascript
// Định dạng trả về từ API cũ
const oldApi = {
  getUserInfo: () => ({ user_name: 'Nguyễn Văn A', user_age: 25 })
}

// Adaptor: Chuyển đổi sang định dạng mới
function adaptUser(oldUser) {
  return { name: oldUser.user_name, age: oldUser.user_age }
}

const user = adaptUser(oldApi.getUserInfo())
// { name: 'Nguyễn Văn A', age: 25 }
```

### 2.2 Mẫu Decorator (Decorator)

**Tình huống**: Thêm chức năng mới vào đối tượng mà không sửa code hiện có. Giống như đặt ốp lưng cho điện thoại — chức năng điện thoại không đổi, nhưng được bảo vệ hơn.

```javascript
// Hàm log cơ bản
function log(message) {
  console.log(message)
}

// Trang trí: Thêm timestamp
function withTimestamp(fn) {
  return (message) => fn(`[${new Date().toISOString()}] ${message}`)
}

// Trang trí: Thêm mức độ log
function withLevel(fn, level) {
  return (message) => fn(`[${level}] ${message}`)
}

const enhancedLog = withTimestamp(withLevel(log, 'INFO'))
enhancedLog('Dịch vụ khởi động thành công')
// [2025-01-15T10:30:00.000Z] [INFO] Dịch vụ khởi động thành công
```

---

## 3. Mẫu Hành Vi: Cách Quản Lý Tương Tác Giữa Các Đối Tượng

### 3.1 Mẫu Observer (Observer)

**Tình huống**: Khi trạng thái của một đối tượng thay đổi, cần tự động thông báo cho các đối tượng khác. Ví dụ như sau khi người dùng đặt hàng, cần gửi email xác nhận, trừ tồn kho, và ghi nhật ký cùng lúc.

```javascript
class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = []
    this.listeners[event].push(callback)
  }

  emit(event, data) {
    (this.listeners[event] || []).forEach(cb => cb(data))
  }
}

const bus = new EventEmitter()
bus.on('order:created', (order) => console.log('Gửi email xác nhận', order.id))
bus.on('order:created', (order) => console.log('Trừ tồn kho', order.id))
bus.emit('order:created', { id: 'ORD-001' })
```

### 3.2 Mẫu Strategy (Strategy)

**Tình huống**: Cùng một phép toán có nhiều thuật toán/chiến lược khác nhau, cần chuyển đổi lúc chạy chương trình. Ví dụ như các cách sắp xếp khác nhau, các quy tắc tính giá khác nhau.

```javascript
const pricingStrategies = {
  normal: (price) => price,
  vip: (price) => price * 0.8,
  svip: (price) => price * 0.6
}

function calculatePrice(price, memberLevel) {
  const strategy = pricingStrategies[memberLevel] || pricingStrategies.normal
  return strategy(price)
}

calculatePrice(100, 'vip')  // 80
calculatePrice(100, 'svip') // 60
```

Hãy trải nghiệm hiệu quả của các mẫu thiết kế khác nhau thông qua thành phần tương tác dưới đây:

<PatternPlaygroundDemo />

---

## 4. Làm Thế Nào Để Chọn Mẫu Thiết Kế?

| Vấn đề bạn gặp | Mẫu Đề Xuất | Tư Tưởng Cốt Lõi |
|----------------|-----------|-----------------|
| Toàn bộ chỉ cần một instance | Singleton | Kiểm soát số lượng instance |
| Tạo các đối tượng khác nhau dựa trên điều kiện | Factory | Đóng gói logic tạo lập |
| Interface không tương thích cần chuyển đổi | Adapter | Bọc một lớp chuyển đổi |
| Thêm chức năng động | Decorator | Bọc nhiều lớp để tăng cường |
| Thay đổi trạng thái cần thông báo cho nhiều bên | Observer | Giải nén Publish-Subscribe |
| Nhiều thuật toán cần chuyển đổi lúc chạy | Strategy | Đóng gói thuật toán thành đối tượng |

::: tip Nguyên tắc Cốt Lõi
Mẫu thiết kế không phải càng nhiều càng tốt. **Thiết kế quá mức** cũng tồi tệ như **không thiết kế**. Chỉ sử dụng mẫu nơi thực sự cần linh hoạt, các vấn đề đơn giản dùng phương pháp đơn giản. Hãy nhớ nguyên tắc KISS: Keep It Simple, Stupid.
:::

---

## 5. Trợ Giúp từ AI: Học Tập và Áp Dụng Mẫu Thiết Kế với Large Language Model

Large language model có thể giúp bạn nhận diện các tình huống trong code phù hợp để sử dụng mẫu thiết kế, và cung cấp các phương án tái cấu trúc cụ thể.

### 5.1 Nhận Diện Mẫu Phù Hợp

> **Prompt**:
> ```
> Phân tích code dưới đây, xác định xem có những chỗ có thể cải tiến bằng mẫu thiết kế không.
> Nếu có, vui lòng giải thích:
> 1. Vấn đề của code hiện tại
> 2. Nên sử dụng mẫu thiết kế nào
> 3. Ví dụ code sau khi tái cấu trúc
> 4. Tại sao mẫu này phù hợp với tình huống này
>
> [Dán code của bạn vào đây]
> ```

### 5.2 Học Mẫu Thông Qua Tình Huống Cụ Thể

> **Prompt**:
> ```
> Sử dụng tình huống thực tế về "hệ thống đặt hàng ăn", hãy lần lượt trình diễn ứng dụng của các mẫu thiết kế sau:
> - Mẫu Factory: Tạo các loại đơn hàng khác nhau
> - Mẫu Observer: Thông báo khi trạng thái đơn hàng thay đổi
> - Mẫu Strategy: Các quy tắc tính phí giao hàng khác nhau
>
> Sử dụng ví dụ code JavaScript, mỗi mẫu trước hết hiển thị vấn đề khi không dùng mẫu,
> rồi hiển thị cải tiến sau khi áp dụng mẫu.
> ```

### 5.3 Xác Định Liệu Có Thiết Kế Quá Mức Không

> **Prompt**:
> ```
> Kiểm tra code dưới đây, xác định xem có vấn đề thiết kế quá mức không.
> Có những trừu tượng hóa không cần thiết, mẫu thiết kế không dùng đến, hoặc tối ưu hóa sớm không?
> Nếu có, vui lòng đề xuất cách đơn giản hóa, tuân theo nguyên tắc KISS.
>
> [Dán code của bạn vào đây]
> ```

::: tip Lời Khuyên Sử Dụng AI
Hãy để AI giải thích mẫu thiết kế sử dụng tình huống kinh doanh mà bạn quen thuộc, thay vì nhìn những sơ đồ UML trừu tượng. Nhưng hãy nhớ: AI có thể có xu hướng đề xuất các phương án phức tạp hơn, bạn cần tự mình quyết định xem có thực sự cần thiết không.
:::

---

## 6. Tổng Kết

1. **Mẫu Tạo Lập**: Giải quyết vấn đề "làm thế nào để tạo đối tượng", giúp quá trình tạo lập linh hoạt hơn
2. **Mẫu Cấu Trúc**: Giải quyết vấn đề "làm thế nào để tổ chức code", giúp cấu trúc rõ ràng hơn
3. **Mẫu Hành Vi**: Giải quyết vấn đề "các đối tượng tương tác như thế nào", giúp hợp tác gắng coupling thấp hơn
4. **Sử Dụng Linh Hoạt**: Chọn dựa trên tình huống thực tế, đừng dùng mẫu chỉ vì dùng mẫu

::: tip Suy Tư Cuối Cùng
Bản chất của mẫu thiết kế là **quản lý sự thay đổi**. Thiết kế tốt giúp phần thay đổi dễ sửa, phần không đổi giữ ổn định. Khi viết code, hãy tự hỏi bản thân: "Nếu yêu cầu thay đổi, tôi cần sửa bao nhiêu chỗ?" — nếu câu trả lời là "rất nhiều chỗ", thì có thể bạn cần một mẫu thiết kế để giúp đỡ.
:::

---

## Đọc Thêm

- **Sách Kinh Điển**: GoF "Design Patterns: Elements of Reusable Object-Oriented Software" là tác phẩm khai phá về mẫu thiết kế.
- **Góc Nhìn Hiện Đại**: Trong JavaScript, nhiều mẫu trở nên đơn giản hơn nhờ đặc tính ngôn ngữ (closure, higher-order functions).
- **Lời Khuyên Thực Hành**: Trước hết hiểu vấn đề, rồi mới xem xét mẫu. Đừng tìm đinh vì đã có búa.
- **Học Nâng Cao**: Tìm hiểu nguyên tắc SOLID, nó là tư tưởng hướng dẫn đằng sau các mẫu thiết kế.
