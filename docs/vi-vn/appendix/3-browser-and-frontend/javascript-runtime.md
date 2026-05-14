# Hướng dẫn chuyên sâu về JavaScript Runtime

::: tip Lời nói đầu
Bạn đã học được cú pháp cơ bản của JavaScript, nhưng bạn có bao giờ tự hỏi:
- Mã được chạy ở đâu?
- Tại sao cùng một mã lại có hành vi khác nhau trên trình duyệt và Node.js?
- Tại sao lúc nào mã "bị treo", lúc nào lại có thể "chạy song song"?

Bài viết này sẽ giúp bạn hiểu sâu hơn về môi trường runtime của JavaScript, bao gồm event loop, call stack, quản lý bộ nhớ, v.v. Sau khi đọc xong, bạn sẽ hiểu tại sao mã được thực hiện theo một thứ tự nhất định, nhanh chóng xác định được các lỗi liên quan đến bất đồng bộ, tối ưu hóa hiệu suất mã và tránh rò rỉ bộ nhớ.
:::

**Bài viết sẽ dạy bạn những gì?**

| Chương | Nội dung | Sau khi học xong bạn có thể |
|--------|---------|---------------------------|
| **Chương 1** | Tổng quan về Runtime | Hiểu mã JavaScript chạy ở đâu |
| **Chương 2** | Runtime Trình duyệt | Biết trình duyệt cung cấp những Web API nào |
| **Chương 3** | Runtime Node.js | Hiểu môi trường JavaScript phía máy chủ |
| **Chương 4** | Event Loop Chuyên sâu | Nắm được thứ tự thực hiện của macro task và micro task |
| **Chương 5** | Call Stack & Bộ nhớ | Hiểu quá trình thực hiện mã và quản lý bộ nhớ |
| **Chương 6** | Kỹ thuật thực chiến | Tối ưu hóa hiệu suất, gỡ lỗi rò rỉ bộ nhớ |

---

## 1. Tổng quan về Runtime

::: tip 🤔 Câu hỏi lõi
**"Runtime" là gì?** JavaScript chỉ là một ngôn ngữ, tại sao cùng một mã lại có hành vi khác nhau trong các môi trường khác nhau?
:::

### 1.1 Runtime là gì

**Runtime = JavaScript Engine + API mà môi trường cung cấp**

Nếu xem JavaScript như "ngôn ngữ lập trình", thì runtime giống như "hệ điều hành" — nó quyết định mã của bạn có thể làm gì, không thể làm gì.

```
┌─────────────────────────────────────┐
│         JavaScript Code             │
├─────────────────────────────────────┤
│    JavaScript Engine (V8)           │  ← Phân tích và thực hiện mã
├─────────────────────────────────────┤
│  Runtime Environment (Browser/Node)  │  ← Cung cấp khả năng bổ sung
└─────────────────────────────────────┘
```

**Một phép so sánh: JavaScript là "tiếng Phổ thông", runtime là "thành phố"**

- Cú pháp JavaScript (tiếng Phổ thông) thì giống nhau ở mọi nơi
- Nhưng các thành phố khác nhau cung cấp các tiện ích khác nhau:
  - Trình duyệt = có DOM, window, fetch (giống như thành phố có trung tâm thương mại, thư viện)
  - Node.js = có fs, http, path (giống như thành phố có nhà máy, đường cao tốc)

### 1.2 Hai runtime chính

| Đặc điểm | Trình duyệt | Node.js |
|----------|---------|---------|
| **Mục đích chính** | Tương tác web, giao diện người dùng | Ứng dụng máy chủ, công cụ dòng lệnh |
| **Đối tượng toàn cục** | `window` | `global` |
| **DOM API** | ✅ Hỗ trợ | ❌ Không hỗ trợ |
| **Hệ thống tệp** | ❌ Bị hạn chế | ✅ Hỗ trợ đầy đủ |
| **Hệ thống mô-đun** | ES Modules | CommonJS + ES Modules |
| **Định thời** | `setTimeout`, `setInterval` | `setTimeout`, `setInterval` |
| **Yêu cầu mạng** | `fetch`, `XMLHttpRequest` | `http`, `https` modules |

👇 **Thử sức**: So sánh sự khác biệt giữa môi trường trình duyệt và Node.js

<RuntimeEnvironmentDemo />

::: info 💡 Hiểu biết cốt lõi
Runtime quyết định những API nào bạn có thể dùng. API DOM mà bạn dùng được trên trình duyệt thì dùng không được trên Node.js; API tệp mà bạn dùng được trên Node.js thì cũng không dùng được trên trình duyệt. Đó là lý do tại sao một số mã cần "kiểm tra môi trường".
:::

---

## 2. Runtime Trình duyệt

::: tip 🤔 Câu hỏi lõi
**Trình duyệt cung cấp những khả năng nào để JavaScript thao tác trang web?**
:::

### 2.1 Thành phần của runtime trình duyệt

```
┌─────────────────────────────────────────────┐
│         JavaScript Engine                   │
│       (V8 / SpiderMonkey)                   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│            Web APIs                          │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐     │
│  │   DOM   │ │   BOM    │ │ Network  │     │
│  │ Thao tác │ │ Thao tác  │ │ Yêu cầu  │     │
│  │  trang web│ │ trình duyệt│ │  mạng    │     │
│  └─────────┘ └──────────┘ └──────────┘     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│       Event Loop (Vòng lặp sự kiện)         │
│   Chịu trách nhiệm điều phối thực hiện mã,  │
│    xử lý sự kiện, lên lịch tác vụ          │
└─────────────────────────────────────────────┘
```

### 2.2 Ba loại Web API chính

**1. DOM API - Thao tác nội dung trang web**

```javascript
// Tìm phần tử
const title = document.querySelector('h1')

// Thay đổi nội dung
title.textContent = 'Tiêu đề mới'

// Thêm kiểu
title.style.color = 'red'
```

**2. BOM API - Thao tác trình duyệt**

```javascript
// Điều hướng trang
window.location.href = 'https://example.com'

// Lưu trữ trình duyệt
localStorage.setItem('key', 'value')

// Lịch sử trình duyệt
history.back()
```

**3. Network API - Yêu cầu mạng**

```javascript
// Gửi yêu cầu HTTP
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
```

### 2.3 Cơ chế sự kiện độc đáo của trình duyệt

Một trong những tính năng mạnh nhất của runtime trình duyệt là "hướng sự kiện" — mã không cần chạy liên tục, mà chỉ thực hiện khi người dùng tương tác.

```javascript
button.addEventListener('click', () => {
  console.log('Nút được nhấp')
})
```

**Các loại sự kiện phổ biến:**

| Loại sự kiện | Khi nào kích hoạt | Tình huống thực tế |
|-------------|------------------|------------------|
| `click` | Nhấp chuột | Tương tác nút |
| `input` | Nội dung hộp nhập thay đổi | Tìm kiếm thời gian thực |
| `scroll` | Cuộn trang | Tải lười biếng |
| `load` | Tài nguyên tải xong | Khởi tạo dữ liệu |
| `error` | Xảy ra lỗi | Xử lý lỗi |

---

## 3. Runtime Node.js

::: tip 🤔 Câu hỏi lõi
**JavaScript có thể chạy trên máy chủ, nhờ cái gì?**
:::

### 3.1 Thành phần của Node.js

```
┌─────────────────────────────────────────────┐
│         JavaScript Engine                   │
│                (V8)                         │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│       Các mô-đun tích hợp Node.js            │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐     │
│  │   fs    │ │   http   │ │   path   │     │
│  │ Thao tác │ │ Máy chủ  │ │ Xử lý    │     │
│  │   tệp   │ │   mạng   │ │   đường  │     │
│  └─────────┘ └──────────┘ └──────────┘     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│      Thư viện event loop libuv              │
│  Hỗ trợ I/O bất đồng bộ đa nền tảng        │
└─────────────────────────────────────────────┘
```

### 3.2 Khả năng độc đáo của Node.js

**1. Thao tác hệ thống tệp**

```javascript
const fs = require('fs')

// Đọc tệp
fs.readFile('./data.txt', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})

// Ghi tệp
fs.writeFile('./output.txt', 'Hello', (err) => {
  if (err) throw err
  console.log('Ghi thành công')
})
```

**2. Máy chủ HTTP**

```javascript
const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end('<h1>Hello World</h1>')
})

server.listen(3000)
```

**3. Hệ thống mô-đun**

```javascript
// CommonJS (mặc định Node.js)
const fs = require('fs')
module.exports = { myFunction }

// ES Modules (cách hiện đại)
import fs from 'fs'
export { myFunction }
```

### 3.3 So sánh Trình duyệt vs Node.js

| Đặc điểm | Trình duyệt | Node.js |
|----------|---------|---------|
| **Tệp khởi động** | Tệp HTML | Tệp JavaScript |
| **Đối tượng toàn cục** | `window`, `document` | `global`, `process` |
| **Tải mô-đun** | Thẻ `<script>` | `require()` / `import` |
| **Bảo mật** | Môi trường sandbox, bị hạn chế | Có thể truy cập tài nguyên hệ thống |
| **Mục đích** | Giao diện người dùng | Dịch vụ backend, công cụ |

---

## 4. Event Loop Chuyên sâu

::: tip 🤔 Câu hỏi lõi
**JavaScript là đơn luồng, tại sao nó lại có thể "không bị chặn"?**
:::

### 4.1 Event Loop là gì

**Event Loop = "Trung tâm lên lịch tác vụ" của JavaScript**

JavaScript là đơn luồng, một lần chỉ có thể làm một việc. Nhưng event loop khiến nó có vẻ như có thể "làm nhiều việc cùng lúc".

**Cơ chế cốt lõi:**

1. **Thực hiện mã đồng bộ** (call stack)
2. **Xử lý tác vụ bất đồng bộ** (task queue)
3. **Chờ đợi tác vụ mới** (lặp lại)

```
Call Stack              Task Queue
┌─────────┐            ┌──────────┐
│ Task 1  │            │ Macro 1  │
│ Task 2  │ ←────────── │ Macro 2  │
│ Task 3  │  Hoàn thành │ Macro 3  │
└─────────┘  một tác vụ └──────────┘
      ↓                     ↑
      └─────────────────────┘
       Event loop liên tục kiểm tra
```

### 4.2 Macro Task vs Micro Task

Đây là khái niệm dễ gây nhầm lẫn nhất trong phỏng vấn và phát triển thực tế!

**Macro Task:**
- `setTimeout`, `setInterval`
- Thao tác I/O
- Vẽ lại giao diện

**Micro Task:**
- `Promise.then`
- `MutationObserver`
- `queueMicrotask`

**Thứ tự thực hiện: Mã đồng bộ → Micro Task → Macro Task**

👇 **Thử sức**: Quan sát thứ tự thực hiện của macro task và micro task

<TaskQueueDemo />

### 4.3 Câu hỏi phỏng vấn kinh điển

```javascript
console.log('1')

setTimeout(() => console.log('2'), 0)

Promise.resolve().then(() => console.log('3'))

console.log('4')

// Đầu ra: 1, 4, 3, 2
```

**Tại sao lại là thứ tự này?**

1. Thực hiện mã đồng bộ: `console.log('1')`, `console.log('4')` → in ra 1, 4
2. Kiểm tra hàng đợi micro task: `Promise.then` → in ra 3
3. Kiểm tra hàng đợi macro task: `setTimeout` → in ra 2

::: info 💡 Kỹ thuật thực chiến
- Nếu muốn mã được thực hiện nhanh nhất, dùng micro task (`Promise.then`)
- Nếu muốn trì hoãn thực hiện, dùng macro task (`setTimeout`)
- Không bao giờ nên trộn quá nhiều thao tác bất đồng bộ, nếu không sẽ rơi vào "callback hell"
:::

---

## 5. Call Stack & Bộ nhớ

::: tip 🤔 Câu hỏi lõi
**Mã được thực hiện như thế nào? Biến được lưu ở đâu? Khi nào nó được xóa sạch?**
:::

### 5.1 Call Stack: "Dấu chân" của thực hiện hàm

**Call Stack = "Sổ ghi chú" ghi lại các lần gọi hàm**

Mỗi khi gọi một hàm, một bản ghi mới sẽ được thêm vào stack; khi hàm hoàn thành, bản ghi sẽ bị loại bỏ.

```javascript
function a() {
  b()
}

function b() {
  c()
}

function c() {
  console.log('Hoàn thành')
}

a()
```

**Sự thay đổi của call stack:**

```
Bước 1: Gọi a()
┌─────────┐
│    a    │
└─────────┘

Bước 2: a() gọi b()
┌─────────┐
│    b    │
│    a    │
└─────────┘

Bước 3: b() gọi c()
┌─────────┐
│    c    │
│    b    │
│    a    │
└─────────┘

Bước 4: c() hoàn thành, lần lượt bị loại bỏ
┌─────────┐
│    b    │
│    a    │
└─────────┘
```

👇 **Thử sức**: Quan sát sự thay đổi của call stack

<CallStackDemo />

### 5.2 Quản lý bộ nhớ: Rác đi đâu hết?

JavaScript có cơ chế "tự động dọn dẹp bộ nhớ" — bạn không cần giải phóng bộ nhớ thủ công, engine sẽ giúp bạn.

**Nguyên lý của garbage collection: Thuật toán đánh dấu-xóa**

1. **Giai đoạn đánh dấu**: Bắt đầu từ "gốc", tìm tất cả các biến có thể truy cập
2. **Giai đoạn xóa**: Các biến không được đánh dấu là "rác", sẽ bị xóa sạch

```javascript
// Ví dụ garbage collection
let obj1 = { name: 'Đối tượng 1' }
let obj2 = { name: 'Đối tượng 2' }

// obj1 được gán lại, đối tượng ban đầu mất tham chiếu
obj1 = null  // Đối tượng { name: 'Đối tượng 1' } sẽ bị xóa sạch

// obj2 vẫn đang được sử dụng, sẽ không bị xóa
console.log(obj2.name)
```

👇 **Thử sức**: Quan sát quá trình garbage collection

<GarbageCollectionDemo />

### 5.3 Rò rỉ bộ nhớ: Hậu quả của quên dọn dẹp

**Rò rỉ bộ nhớ = Bộ nhớ có thể giải phóng nhưng lại bị giữ lại, tích tụ ngày càng nhiều**

Các nguyên nhân phổ biến:

**1. Quá nhiều biến toàn cục**

```javascript
// ❌ Sai: Biến toàn cục sẽ không bị xóa sạch
globalCache = []

function addItem(item) {
  globalCache.push(item)
}
```

**2. Trình lắng nghe sự kiện không bị loại bỏ**

```javascript
// ❌ Sai: Trình lắng nghe không bị loại bỏ
button.addEventListener('click', handleClick)

// ✅ Đúng: Loại bỏ khi không cần
button.removeEventListener('click', handleClick)
```

**3. Closure tham chiếu đối tượng lớn**

```javascript
// ❌ Sai: Closure luôn tham chiếu đối tượng lớn, không bị xóa sạch
function createHandler() {
  const bigData = new Array(1000000).fill('data')
  return function() {
    console.log('Đang xử lý')
  }
}

const handler = createHandler()  // bigData luôn tồn tại trong bộ nhớ
```

👇 **Thử sức**: Quan sát cách rò rỉ bộ nhớ xảy ra

<MemoryLeakDemo />

::: info 💡 Kỹ thuật thực chiến
- **Kiểm tra thường xuyên**: Mở DevTools trình duyệt → Memory → Take Heap Snapshot, xem mức sử dụng bộ nhớ
- **Tránh biến toàn cục**: Dùng `const` và `let`, không dùng `var`
- **Dọn dẹp kịp thời**: Loại bỏ trình lắng nghe sự kiện, bộ đếm thời gian khi không còn cần
- **Tham chiếu yếu**: Dùng `WeakMap` và `WeakSet` để lưu tham chiếu đối tượng
:::

---

## 6. Kỹ thuật thực chiến

::: tip 🤔 Câu hỏi lõi
**Làm thế nào để viết mã JavaScript có hiệu suất cao? Khi gặp vấn đề phải làm sao?**
:::

### 6.1 Kỹ thuật tối ưu hóa hiệu suất

**1. Giảm bố cục lại và vẽ lại**

```javascript
// ❌ Sai: Mỗi vòng lặp gây ra bố cục lại
for (let i = 0; i < 1000; i++) {
  element.style.top = i + 'px'
}

// ✅ Đúng: Thay đổi hàng loạt
element.style.transform = `translateY(${position}px)`
```

**2. Sử dụng ủy quyền sự kiện**

```javascript
// ❌ Sai: Thêm trình lắng nghe cho mỗi nút
buttons.forEach(btn => {
  btn.addEventListener('click', handleClick)
})

// ✅ Đúng: Chỉ thêm trình lắng nghe cho phần tử cha
container.addEventListener('click', (e) => {
  if (e.target.matches('.button')) {
    handleClick(e)
  }
})
```

**3. Debounce và Throttle**

```javascript
// Debounce: Thực hiện sau khi người dùng dừng nhập
function debounce(fn, delay) {
  let timer
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// Throttle: Giới hạn tần suất thực hiện
function throttle(fn, delay) {
  let lastTime = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}
```

### 6.2 Kỹ thuật gỡ lỗi

**1. Dùng DevTools để xem call stack**

```javascript
function a() {
  b()
}

function b() {
  c()
}

function c() {
  debugger  // Tạm dừng ở đây, xem call stack
}

a()
```

**2. Dùng `console.trace()` để theo dõi đường thực hiện**

```javascript
function trackExecution() {
  console.trace('Đường thực hiện')
  // Sẽ in ra call stack hoàn chỉnh
}
```

**3. Dùng Performance để phân tích hiệu suất**

```javascript
performance.mark('start')

// Thực hiện một số mã
for (let i = 0; i < 10000; i++) {
  // ...
}

performance.mark('end')
performance.measure('Hiệu suất vòng lặp', 'start', 'end')

const measure = performance.getEntriesByName('Hiệu suất vòng lặp')[0]
console.log(`Thời gian thực hiện: ${measure.duration}ms`)
```

### 6.3 Tra cứu nhanh các vấn đề phổ biến

| Vấn đề | Nguyên nhân có thể | Giải pháp |
|------|---------|---------|
| **Mức sử dụng bộ nhớ cao** | Rò rỉ bộ nhớ, lưu trữ quá nhiều | Kiểm tra biến toàn cục, loại bỏ trình lắng nghe |
| **Trang bị treo** | Tác vụ dài chặn luồng chính | Chia nhỏ tác vụ, dùng Web Workers |
| **Sự kiện không kích hoạt** | Trình lắng nghe không được gắn kết, phần tử không tồn tại | Kiểm tra thời điểm tải DOM |
| **Thứ tự bất đồng bộ lộn xộn** | Trộn macro task và micro task | Dùng thống nhất Promise hoặc async/await |
| **Định thời không chính xác** | Luồng chính bị chặn | Dùng Web Workers hoặc requestAnimationFrame |

---

## Tổng kết

Bây giờ bạn phải hiểu được:

- **Runtime = Engine + API môi trường cung cấp**, các runtime khác nhau cung cấp các khả năng khác nhau
- **Event loop** chịu trách nhiệm điều phối thứ tự thực hiện của mã đồng bộ, micro task, macro task
- **Call stack** ghi lại quá trình thực hiện hàm, **stack overflow** xảy ra vì đệ quy quá sâu
- **Garbage collection** tự động xóa sạch các biến không cần dùng, nhưng cần chú ý **rò rỉ bộ nhớ**
- **Tối ưu hóa hiệu suất** quan trọng nhất là giảm bố cục lại và vẽ lại, sử dụng bất đồng bộ hợp lý

::: info 💡 Khi gặp vấn đề, hãy nói với AI như thế này
- "Hàm này thực hiện quá chậm, bạn giúp tôi xem làm sao để tối ưu hóa hiệu suất được không"
- "Mức sử dụng bộ nhớ luôn tăng, có thể là rò rỉ bộ nhớ, bạn kiểm tra giúp tôi"
- "Thứ tự của các thao tác bất đồng bộ sai rồi, phải là trước A rồi tới B, mà bây giờ A và B gần như bắt đầu cùng lúc"
- "Trình lắng nghe sự kiện không kích hoạt, kiểm tra xem phần tử đã được tải lên DOM chưa"
:::
