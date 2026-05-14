# Hướng dẫn JavaScript chi tiết

::: tip Lời tựa
Bạn đã học xong HTML và CSS, có thể tạo ra những trang web đẹp mắt rồi. Nhưng bạn có thể sẽ phát hiện: click vào nút không có phản ứng, điền biểu mẫu không gửi được, trang web giống như một bức "ảnh tĩnh".

Đó là lý do tại sao chúng ta cần JavaScript——nó làm cho trang web "sống động" lên. Click vào nút có thể bật ra menu, nhập văn bản có thể tìm kiếm theo thời gian thực, cuộn trang có thể tải thêm nội dung……những hiệu ứng tương tác này đều nhờ JavaScript.

Trong vibe coding, AI sẽ giúp bạn viết hầu hết mã code. Nhưng bạn ít nhất phải có thể hiểu mã code đang làm gì, nếu không AI viết sai bạn cũng không phát hiện được. Đọc xong bài này, bạn sẽ có thể:

- Hiểu mã code mà AI viết đang làm gì
- Nhìn ra mã code có vấn đề ở đâu
- Nói rõ ràng với AI phải sửa thế nào
:::

**Bài viết này sẽ dạy bạn những gì?**

| Chương | Nội dung | Học xong có thể làm gì |
|--------|---------|------------------------|
| **Chương 1** | JavaScript là gì | Hiểu rõ nó đóng vai trò gì trong trang web |
| **Chương 2** | Dữ liệu và biến | Biết chương trình lưu trữ thế nào, sử dụng thế nào |
| **Chương 3** | Hàm và logic | Hiểu mã code có điều kiện, vòng lặp và logic tái sử dụng |
| **Chương 4** | DOM và sự kiện | Biết mã code điều khiển trang web thế nào, phản ứng với hành động người dùng thế nào |
| **Chương 5** | Kỹ năng thực chiến | Làm thế nào để đọc mã code AI, khi gặp lỗi phải nói thế nào |

Mỗi chương đều bắt đầu từ "có thể nhận diện mã code", không cần bạn viết tay. Gặp mã code không hiểu, bất cứ lúc nào cũng có thể quay lại xem.

---

## 1. JavaScript là gì

::: tip 🤔 Câu hỏi cốt lõi
**Tại sao trang web cần JavaScript?** HTML và CSS đã có thể làm cho trang web có nội dung, có phong cách rồi, tại sao còn phải học một ngôn ngữ mới?
:::

### 1.1 Từ "trang web tĩnh" đến "ứng dụng động"

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**📄 Trang web không có JavaScript**
- Nội dung cố định, không tương tác được
- Click vào nút không có phản ứng
- Điền biểu mẫu không gửi được
- Trang không tự động cập nhật

*Giống như một tờ poster giấy, chỉ có thể xem*

</div>
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🚀 Trang web có JavaScript**
- Click vào nút bật ra menu
- Nhập văn bản tìm kiếm theo thời gian thực
- Cuộn tự động tải thêm nội dung
- Dữ liệu cập nhật hiển thị theo thời gian thực

*Giống như một ứng dụng thực sự*

</div>
</div>

**Hiểu bằng một câu mối quan hệ giữa ba công nghệ:**

| Công nghệ | Ví von | Tác dụng |
|-----------|--------|---------|
| **HTML** | Bộ xương | Định nghĩa cấu trúc và nội dung của trang web |
| **CSS** | Làn da | Định nghĩa giao diện và phong cách của trang web |
| **JavaScript** | Cơ bắp và hệ thần kinh | Làm cho trang web có thể phản ứng, tương tác, suy nghĩ |

### 1.2 Tại sao vibe coding cũng cần hiểu JavaScript?

::: warning Ghi chép người học JS gặp khó khăn
Một lập trình viên mới học JavaScript dùng AI làm một ứng dụng "bộ đếm": click vào nút, con số cộng 1. Mã code do AI tạo hoạt động bình thường.

Nhưng anh ấy muốn thay đổi thành "mỗi lần click cộng 2", anh nói với AI: "Hãy làm mỗi lần click cộng 2." AI sửa mã code, nhưng con số vẫn chỉ cộng 1.

Anh ấy hỏi AI tại sao không hoạt động, AI giải thích, nhưng anh không hiểu mã code `count = count + 1` là gì, cũng không biết AI sửa cái gì. Chỉ có thể nói lặp lại "cộng 2 không hoạt động", AI lại sửa mã nhiều lần, lúc thì đổi giá trị ban đầu thành 2, lúc thì cộng 2 ở chỗ hoàn toàn không liên quan.

Cuối cùng anh ấy đọc chương 2 "Biến" của hướng dẫn này, hiểu rằng `count = count + 1` là lưu lại giá trị của count sau khi cộng 1. Sau đó anh nói với AI: "Sửa `count + 1` thành `count + 2`."

Một lần là xong.

**Đó là lý do tại sao phải hiểu JavaScript——không phải để viết code tay, mà để khi AI viết sai, bạn có thể nhìn thấy ngay vấn đề ở đâu, một câu nói trúng điểm.**
:::

### 1.3 Xem trước: một đoạn mã code thực tế do AI tạo

Trước khi đi sâu vào học, hãy xem một đoạn mã code thực tế do AI tạo. Đừng lo lắng nếu không hiểu, chỉ cần có ấn tượng, sau này chúng ta sẽ giải thích từng phần.

**Tình huống**: Tạo một chức năng "click vào nút thay đổi màu nền"

```javascript
// Định nghĩa một tập hợp màu sắc
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']
let currentIndex = 0

// Tìm nút trên trang
const button = document.querySelector('#changeBtn')

// Thêm sự kiện click vào nút
button.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % colors.length
  document.body.style.backgroundColor = colors[currentIndex]
})
```

**Đoạn mã code đang làm gì?**

| Mã code | Tác dụng | Chương tương ứng |
|---------|---------|-----------------|
| `const colors = [...]` | Định nghĩa một tập hợp dữ liệu màu sắc | Chương 2: Mảng |
| `let currentIndex = 0` | Ghi nhớ đang hiển thị màu thứ mấy | Chương 2: Biến |
| `document.querySelector(...)` | Tìm nút trên trang | Chương 4: Truy vấn DOM |
| `button.addEventListener(...)` | Thêm sự kiện click vào nút | Chương 4: Lắng nghe sự kiện |
| `() => {...}` | Định nghĩa mã code cần thực hiện sau khi click | Chương 3: Hàm mũi tên |

::: info 💡 Hiểu biết cốt lõi
Bạn không cần hiểu ngay mỗi dòng mã code. Chỉ cần nhớ: **Mã code JavaScript là một chuỗi các hướng dẫn, nói cho trình duyệt biết "khi người dùng làm việc gì, phải xảy ra việc gì".**
:::

---

## 2. Phần dữ liệu: Biến và kiểu dữ liệu

::: tip 🤔 Câu hỏi cốt lõi
**Chương trình lưu trữ thông tin thế nào?** Nội dung người dùng nhập, dữ liệu lấy từ máy chủ, kết quả trung gian trong quá trình tính toán——những thông tin này được lưu ở đâu?
:::

### 2.1 Biến: Đặt tên cho dữ liệu

**Biến giống như một cái hộp có nhãn**——bạn có thể bỏ dữ liệu vào, sau này lấy theo nhãn.

```javascript
const name = "Trần Văn A"   // Tên không thay đổi, dùng const
let age = 25          // Tuổi có thể thay đổi, dùng let
```

**Tại sao phải phân biệt const và let?**

Tưởng tượng: số CMND của bạn (const) suốt đời cũng không thay đổi, nhưng tuổi của bạn (let) mỗi năm lại tăng một tuổi. JavaScript cho phép bạn dùng những từ khóa khác nhau để thể hiện ý định "thay đổi hay không thay đổi" này.

| Từ khóa | Có thể sửa | Tình huống sử dụng | Ví dụ |
|--------|-----------|-------------------|-------|
| `const` | ❌ Không | Dữ liệu không thay đổi | Số CMND, các mục cấu hình, danh sách màu |
| `let` | ✅ Có | Dữ liệu thay đổi | Bộ đếm, tùy chọn đang chọn hiện tại, dữ liệu người dùng nhập |

::: details 🔍 Xem một ví dụ cụ thể
```javascript
// Dùng const: những giá trị không thay đổi
const PI = 3.14159
const MAX_USERS = 100
const APP_NAME = "TodoList"

// Dùng let: những giá trị thay đổi
let count = 0
count = 1  // ✅ Có thể sửa

count = count + 1  // ✅ Có thể tính toán dựa trên giá trị cũ

// Nếu dùng const sẽ thế nào?
const fixedCount = 0
fixedCount = 1  // ❌ Lỗi! const không thể gán lại
```
:::

👇 **Hãy thử**: Sửa mã code bên dưới, xem sự khác biệt giữa const và let

<VariableBoxDemo />

### 2.2 Kiểu dữ liệu: Mấy loại "thứ" trong JavaScript

JavaScript phân chia dữ liệu thành vài loại, loại được dùng nhiều nhất có ba loại:

| Loại | Giải thích | Ví dụ | Tình huống thực tế |
|------|-----------|-------|-------------------|
| `string`（chuỗi）| Nội dung văn bản | `"hello"`, `'xin chào'` | Tên người dùng, mô tả sản phẩm, tin nhắn gợi ý |
| `number`（số）| Giá trị số | `42`, `3.14` | Giá tiền, số lượng, đánh giá |
| `boolean`（giá trị boolean）| Đúng/sai | `true`, `false` | Đã đăng nhập chưa, hoàn thành chưa, hiển thị chưa |

**Còn hai giá trị đặc biệt cần biết:**

- `undefined` → Biến được khai báo, nhưng chưa gán giá trị
- `null` → Được gán thành rỗng (biểu thị "không có giá trị ở đây")

::: details 🔍 Chuỗi mẫu: cách tiện hơn để nối văn bản
Trong mã code AI, bạn hay thấy chuỗi được bao bằng dấu backtick (`` ` ``), bên trong còn có `${...}`:

```javascript
const name = "Trần Văn A"
const age = 25

// Cách viết truyền thống (phiền phức)
const message = "Tôi tên " + name + ", năm nay " + age + " tuổi"

// Chuỗi mẫu (gọn gàng)
const message = `Tôi tên ${name}, năm nay ${age} tuổi`
// Kết quả: "Tôi tên Trần Văn A, năm nay 25 tuổi"
```

**Cách nhận diện**: Thấy dấu backtick và `${}`, biết rằng đang chèn biến vào trong văn bản.
:::

### 2.3 Đối tượng và mảng: Tổ chức dữ liệu

**Đối tượng = một tập hợp các thuộc tính có tên**（giống một bảng thông tin cá nhân）

```javascript
const user = {
  name: "Trần Văn A",
  age: 25,
  isVIP: true
}

// Truy cập thuộc tính bằng dấu chấm
console.log(user.name)    // "Trần Văn A"
console.log(user.age)     // 25
```

**Mảng = một tập hợp dữ liệu có thứ tự**（giống một danh sách）

```javascript
const colors = ['đỏ', 'xanh', 'xanh dương']

// Truy cập bằng chỉ số (bắt đầu từ 0)
console.log(colors[0])  // "đỏ"
console.log(colors[1])  // "xanh"
```

**Cấu trúc lồng nhau: đối tượng chứa mảng, mảng chứa đối tượng**

Đây là cấu trúc dữ liệu phổ biến nhất trong mã code AI:

```javascript
const todos = [
  { id: 1, text: "Học JavaScript", done: false },
  { id: 2, text: "Làm dự án", done: true },
  { id: 3, text: "Viết tài liệu", done: false }
]

// Truy cập: trước tiên lấy phần tử thứ 0 của mảy, rồi lấy thuộc tính text của nó
console.log(todos[0].text)  // "Học JavaScript"
```

::: info 💡 Cách nhận diện
- Thấy `{}` → đây là một đối tượng, bên trong là một tập hợp `tên: giá trị`
- Thấy `[]` → đây là một mảy, bên trong là một tập hợp các giá trị được sắp xếp theo thứ tự
- Thấy `data[0].name` → trước tiên lấy phần tử thứ 0 của mảy, rồi lấy thuộc tính name của nó
:::

### 2.4 Giá trị và tham chiếu: Một cái bẫy dễ sa chân

Đây là vấn đề mà người mới học thường gặp!

**Loại cơ bản (string、number、boolean) gán giá trị = sao chép một bản hoàn toàn mới:**

```javascript
let a = 10
let b = a      // b nhận được bản sao của a
b = 20
console.log(a) // 10（a không bị ảnh hưởng）
```

**Đối tượng và mảy gán giá trị = sao chép "địa chỉ" (chỉ vào cùng một thứ):**

```javascript
let user1 = { name: "Trần Văn A" }
let user2 = user1      // user2 chỉ vào cùng một đối tượng
user2.name = "Lý Tứ"     // Sửa user2 sẽ ảnh hưởng đến user1
console.log(user1.name) // "Lý Tứ"（user1 cũng thay đổi！）
```

**Tại sao phải tạo bản sao?**

Trong React/Vue, sửa dữ liệu trực tiếp sẽ dẫn đến giao diện không cập nhật. Vì vậy mã code AI thường thấy `[...array]` hoặc `{...obj}`——nó đang tạo bản sao, tránh ảnh hưởng lẫn nhau.

```javascript
// Dùng toán tử spread tạo bản sao
const arr1 = [1, 2, 3]
const arr2 = [...arr1]     // Tạo mảy mới
arr2.push(4)
console.log(arr1)          // [1, 2, 3]（không bị ảnh hưởng）
console.log(arr2)          // [1, 2, 3, 4]
```

👇 **Hãy thử**: Quan sát sự thay đổi của dữ liệu gốc khi sửa bản sao

<ReferenceDemo />

### 2.5 Giải cấu trúc và spread: Cách viết tắt của JavaScript hiện đại

Hai cú pháp này xuất hiện khắp nơi trong mã code AI, không biết là không đọc được mã code.

**Giải cấu trúc: Nhanh chóng trích xuất dữ liệu từ đối tượng hoặc mảy**

```javascript
const user = { name: "Trần Văn A", age: 25, city: "Hà Nội" }

// Cách viết truyền thống (phiền phức)
const name = user.name
const age = user.age

// Giải cấu trúc (gọn gàng)
const { name, age } = user
// Hiệu quả giống nhau, nhưng một dòng là xong
```

**Spread: Sao chép và mở rộng dữ liệu**

```javascript
// Sao chép mảy và thêm phần tử mới
const arr1 = [1, 2, 3]
const arr2 = [...arr1, 4, 5]  // [1, 2, 3, 4, 5]

// Sao chép đối tượng và thêm thuộc tính mới
const user1 = { name: "Trần Văn A", age: 25 }
const user2 = { ...user1, city: "Hà Nội" }
// { name: "Trần Văn A", age: 25, city: "Hà Nội" }
```

::: info 💡 Cách nhận diện
- Thấy `const { name, age } = person` → Trích xuất name và age từ đối tượng person
- Thấy `...array` hoặc `...obj` → Mở rộng mảy hoặc đối tượng
- Bạn không cần viết được, nhưng phải đọc được
:::

---

## 3. Phần logic: Hàm và kiểm soát luồng

::: tip 🤔 Câu hỏi cốt lõi
**Mã code "đưa ra quyết định" và "lặp lại công việc" thế nào?** Chương trình cần thực hiện các phép toán khác nhau dựa trên điều kiện, cũng cần lặp lại công việc nhất định——những logic này biểu thị thế nào?
:::

### 3.1 Điều kiện: Nếu...thì...nếu không...

**if/else: Kiểm tra điều kiện cơ bản nhất**

```javascript
const age = 18

if (age >= 18) {
  console.log("Người lớn")
} else {
  console.log("Chưa thành niên")
}
```

**Toán tử ba ngôi: Viết tắt if/else**

```javascript
// Cách viết đầy đủ (4 dòng)
let message
if (age >= 18) {
  message = "Người lớn"
} else {
  message = "Chưa thành niên"
}

// Toán tử ba ngôi (1 dòng)
const message = age >= 18 ? "Người lớn" : "Chưa thành niên"
// Định dạng: điều kiện ? giá trị khi đúng : giá trị khi sai
```

**Viết tắt &&: Thường thấy trong code React**

```javascript
// Chỉ khi isLoggedIn là true mới hiển thị bảng điều khiển người dùng
isLoggedIn && <UserPanel />

// Tương đương
if (isLoggedIn) {
  return <UserPanel />
}
```

::: info 💡 Cách nhận diện
- Thấy `? :` → đây là toán tử ba ngôi, viết tắt if/else
- Thấy `&&` → nếu phía trước là true thì thực hiện phía sau
:::

### 3.2 Hàm: Đóng gói hành động

**Hàm = một công thức nấu ăn**

- Định nghĩa hàm = viết công thức
- Gọi hàm = nấu theo công thức
- Tham số = nguyên liệu
- Giá trị trả về = thành phẩm

```javascript
// Định nghĩa hàm (viết công thức)
function greet(name) {
  return "Xin chào " + name
}

// Gọi hàm (nấu theo công thức)
console.log(greet("Trần Văn A"))  // "Xin chào Trần Văn A"
console.log(greet("Lý Tứ"))  // "Xin chào Lý Tứ"
```

**Ba cách viết, một mắt nhận diện:**

```javascript
// 1. Khai báo function (cách viết truyền thống)
function greet(name) {
  return "Xin chào " + name
}

// 2. Hàm mũi tên (cách viết được dùng nhiều nhất trong mã code AI)
const greet = (name) => {
  return "Xin chào " + name
}

// 3. Hàm mũi tên viết tắt (chỉ khi có một dòng)
const greet = (name) => "Xin chào " + name
```

👇 **Hãy thử**: Nhập tên khác nhau, xem hàm hoạt động thế nào

<FunctionMachineDemo />

::: info 💡 Cách nhận diện
- Thấy `function` hoặc `=>` → đây là một hàm
- Thấy `fn()` → đang gọi hàm này
- Thấy `() => {}` → hàm mũi tên, cách viết hiện đại của JS
:::

### 3.3 Phương thức mảy: Công cụ xử lý danh sách

Trong React/Vue, hầu như mỗi lần render danh sách đều dùng những phương thức này.

```javascript
const todos = [
  { id: 1, text: "Học", done: false },
  { id: 2, text: "Làm việc", done: true }
]

// .map(): Biến đổi từng phần tử của mảy thành cái khác
const texts = todos.map(todo => todo.text)
// ["Học", "Làm việc"]

// .filter(): Lọc ra những phần tử thỏa mãn điều kiện
const unfinished = todos.filter(todo => !todo.done)
// [{ id: 1, text: "Học", done: false }]

// .find(): Tìm phần tử đầu tiên thỏa mãn điều kiện
const found = todos.find(todo => todo.id === 1)
// { id: 1, text: "Học", done: false }
```

::: info 💡 Cách nhận diện
- Thấy `.map()` → biến đổi mảy, trả về mảy mới
- Thấy `.filter()` → lọc mảy
- Thấy `items.map(item => <li>{item.name}</li>)` → biến mỗi dữ liệu thành một thẻ danh sách
:::

### 3.4 Phạm vi: "Vùng nhìn thấy" của biến

**Dùng "phòng" làm ví dụ:**

- Biến bên trong hàm giống như đồ vật trong phòng, bên ngoài không thấy được
- Nhưng người trong phòng có thể thấy hành lang (phạm vi bên ngoài)

```javascript
const global = "Biến toàn cục"  // Đồ vật trên hành lang

function room() {
  const local = "Đồ vật trong phòng"  // Đồ vật trong phòng
  console.log(global)  // ✅ Thấy được hành lang
}

console.log(local)  // ❌ Lỗi! Bên ngoài không thấy được đồ vật trong phòng
```

**Trực giác cốt lõi:** Mã code được viết ở đâu quyết định nó có thể thấy biến nào.

👇 **Hãy thử**: Click vào những phạm vi khác nhau, xem có thể truy cập biến nào

<ScopeDemo />

### 3.5 Closure: Hàm "nhớ" môi trường nó được tạo

**Đừng xem nó như một khái niệm riêng lẻ, hãy hiểu từ một tình huống cụ thể:**

```javascript
function setupCounter() {
  let count = 0  // Biến này bên trong hàm

  return {
    add: () => { count++; return count },
    getCount: () => count
  }
}

const counter = setupCounter()
console.log(counter.add())      // 1
console.log(counter.add())      // 2
console.log(counter.getCount()) // 2
```

**Trực giác cốt lõi:** Hàm khi được tạo sẽ "nhớ" những biến xung quanh nó, ngay cả khi hàm bên ngoài đã thực hiện xong.

👇 **Hãy thử**: Quan sát cách closure làm cho hàm "nhớ" trạng thái

<ClosureDemo />

### 3.6 this: Hàm được ai gọi

**Không nói những luật ràng buộc phức tạp, chỉ nói những tình huống phổ biến nhất:**

**Tình huống 1: Trong phương thức của đối tượng, this chỉ vào đối tượng này**

```javascript
const user = {
  name: "Trần Văn A",
  sayHi() {
    console.log("Xin chào, tôi là " + this.name)  // this chỉ vào user
  }
}
user.sayHi()  // "Xin chào, tôi là Trần Văn A"
```

**Tình huống 2: Trong lắng nghe sự kiện, this chỉ vào phần tử phát sự kiện**

```javascript
button.addEventListener('click', function() {
  console.log(this)  // this chỉ vào phần tử button
})

// Nhưng hàm mũi tên không thay đổi this
button.addEventListener('click', () => {
  console.log(this)  // this chỉ vào this bên ngoài
})
```

::: info 💡 Gặp vấn đề thế nào?
Nếu mã code AI có lỗi liên quan đến this（ví dụ `Cannot read property of undefined`），hãy nói với AI："Phương thức này có this không đúng, hãy đổi thành hàm mũi tên hoặc dùng bind"
:::

---

## 4. Phần tương tác: DOM, sự kiện và bất đồng bộ

::: tip 🤔 Câu hỏi cốt lõi
**JavaScript "tương tác" với trang web thế nào?** Làm thế nào để tìm phần tử trên trang? Làm thế nào để phản ứng với click, nhập liệu của người dùng? Làm thế nào để lấy dữ liệu từ máy chủ?
:::

### 4.1 DOM: Trang web trong mắt JavaScript

Trang web trong JavaScript là một "cây", mỗi thẻ HTML là một "nút" trên cây.

```html
<html>
  <body>
    <h1>Tiêu đề</h1>
    <p>Đoạn văn</p>
    <ul>
      <li>Mục 1</li>
      <li>Mục 2</li>
    </ul>
  </body>
</html>
```

**JS điều khiển trang web = tìm nút + sửa nút + tạo/xóa nút**

👇 **Hãy thử**: Click vào nút, xem cây DOM được tổ chức thế nào

<DOMTreeDemo />

### 4.2 Tìm kiếm và sửa phần tử

**Tìm kiếm phần tử:**

```javascript
// Tìm theo CSS selector (cách được dùng nhiều nhất)
const title = document.querySelector('h1')      // Tìm h1 đầu tiên
const button = document.querySelector('#btn')   // Tìm phần tử có id="btn"
const items = document.querySelectorAll('.item') // Tìm tất cả phần tử có class="item"
```

**Sửa phần tử:**

```javascript
// Sửa văn bản
title.textContent = "Tiêu đề mới"

// Sửa phong cách
element.style.color = "đỏ"
element.style.fontSize = "20px"

// Sửa CSS class
element.classList.add('active')      // Thêm class
element.classList.remove('hidden')   // Xóa class
element.classList.toggle('open')     // Chuyển đổi class（có thì xóa, không thì thêm）
```

::: info 💡 Cách nhận diện
- Thấy `document.querySelector` → đang tìm phần tử trên trang
- Thấy `.textContent` → sửa văn bản
- Thấy `.style.xxx` → sửa phong cách
- Thấy `.classList.add/remove/toggle` → sửa CSS class
:::

### 4.3 Sự kiện: Khi người dùng làm việc gì thì...

**addEventListener: Thêm lắng nghe sự kiện vào phần tử**

```javascript
button.addEventListener('click', () => {
  console.log("Nút được click")
})
```

**Sự kiện phổ biến:**

| Sự kiện | Kích hoạt khi | Tình huống thực tế |
|--------|---------------|-------------------|
| `click` | Click | Click nút, click liên kết |
| `input` | Nội dung ô nhập thay đổi | Tìm kiếm theo thời gian thực, kiểm tra biểu mẫu |
| `submit` | Gửi biểu mẫu | Đăng nhập, đăng ký, gửi dữ liệu |
| `scroll` | Cuộn trang | Lazy load, nút quay lên đầu |

**Đối tượng sự kiện: Lấy thêm thông tin**

```javascript
input.addEventListener('input', (e) => {
  console.log(e.target.value)  // Lấy giá trị ô nhập
  e.preventDefault()            // Ngăn hành động mặc định（ví dụ biểu mẫu refresh trang）
})
```

::: info 💡 Ứng dụng thực tế
Khi bạn muốn thêm chức năng cho nút, bản chất là nói với AI："Thêm sự kiện click vào nút này, khi click thực hiện công việc nào đó"
:::

### 4.4 Bất đồng bộ: Tại sao một số phép toán không hoàn thành ngay

**Ví dụ nhà hàng:**

Sau khi gọi món, bạn không cần đứng ở cửa bếp chờ, có thể làm việc khác, khi đồ ăn sẵn sàng bồi bàn sẽ mang đến.

**Tình huống phổ biến nhất: Lấy dữ liệu từ máy chủ**

```javascript
// Cách đồng bộ (sẽ làm cho trang bị treo, không dùng)
const data = fetch('/api/data')  // ❌ Cách này sẽ làm trang bị treo

// Cách bất đồng bộ (đúng)
async function loadData() {
  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Có lỗi:', error)
  }
}
```

**Cú pháp async/await:**

- `async` → Đánh dấu hàm này có phép toán bất đồng bộ
- `await` → Chờ phép toán này hoàn thành（nhưng không làm trang bị treo）
- `try/catch` → Xử lý lỗi có thể xảy ra

👇 **Hãy thử**: Quan sát thứ tự thực hiện của phép toán bất đồng bộ

<AsyncRestaurantDemo />

::: info 💡 Cách nhận diện
- Thấy `async/await` → đang chờ phép toán chậm
- Thấy `fetch()` → đang lấy dữ liệu từ máy chủ
- Thấy `try/catch` → đang xử lý lỗi có thể xảy ra
:::

### 4.5 Vòng lặp sự kiện: JavaScript hoạt động thế nào

**Không dùng thuật ngữ "micro task/macro task", dùng một mô hình đơn giản:**

**JS là một "bàn làm việc người duy nhất"**, chỉ làm một việc tại một thời điểm, nhưng có một "thanh để ghi chú công việc"（hàng đợi công việc）.

Khi gặp phép toán phải chờ（yêu cầu mạng, bộ đếm thời gian）, JS không ngơ ngác chờ, mà viết "khi chờ xong làm gì" vào thanh ghi chú, rồi tiếp tục thực hiện code phía dưới. Khi code hiện tại thực hiện xong mới nhìn thanh ghi chú.

```javascript
console.log("1")

setTimeout(() => console.log("2"), 0)  // Dù là 0 giây, cũng sẽ trì hoãn

console.log("3")

// In ra: 1, 3, 2（không phải 1, 2, 3！）
```

**Tại sao?**
1. Thực hiện `console.log("1")` → In ra 1
2. Gặp `setTimeout` → Viết vào thanh ghi chú, tiếp tục phía dưới
3. Thực hiện `console.log("3")` → In ra 3
4. Code hiện tại thực hiện xong, nhìn thanh ghi chú
5. Thực hiện callback của `setTimeout` → In ra 2

👇 **Hãy thử**: Quan sát thứ tự thực hiện mã code

<JSEventLoopDemo />

::: info 💡 Gặp vấn đề thế nào?
Nếu mã code AI dữ liệu chưa tải xong nhưng đã render trang, hãy nói với AI："Dữ liệu chưa tải xong trang đã render rồi, cần thêm trạng thái loading, chỉ khi dữ liệu tới mới render"
:::

### 4.6 Module: import và export

Hầu như dòng code đầu tiên trong mã code React/Vue do AI tạo đều là `import`.

**import = Lấy chức năng từ tập tin khác**

```javascript
// Lấy hàm từ tập tin công cụ
import { formatDate } from './utils'

// Lấy từ gói bên thứ ba
import React from 'react'
import { useState } from 'react'
```

**export = Để lộ chức năng để người khác dùng**

```javascript
// utils.js
export function formatDate(date) {
  // ...
}

// Hoặc xuất mặc định
export default function formatDate(date) {
  // ...
}
```

**gói npm = Công cụ do người khác viết sẵn, cài đặt rồi dùng được**

```javascript
// Cài gói: npm install lodash
// Dùng gói
import _ from 'lodash'
```

::: info 💡 Cách nhận diện
- Thấy `import` → lấy chức năng từ tập tin khác
- Thấy `export` → để lộ chức năng để người khác dùng
- Thấy `from 'react'` → lấy từ gói React
- Thấy `from './utils'` → lấy từ tập tin cục bộ
:::

---

## 5. Phần thực chiến: Đọc mã code, hiểu lỗi, diễn tả rõ ràng

::: tip 🤔 Câu hỏi cốt lõi
**Sau khi học hết những cú pháp này, khi có mã code AI thì dùng thế nào?** Làm thế nào để nhanh chóng hiểu mã code? Gặp lỗi thì sao? Làm thế nào để AI chính xác giúp bạn sửa mã code?
:::

### 5.1 Khi nhận mã code AI làm thế nào để đọc

**Bốn bước:**

| Bước | Xem cái gì | Ví dụ |
|------|-----------|-------|
| **Bước 1: Xem cấu trúc chung** | Có mấy hàm? Từng hàm làm gì? | `loadData()` tải dữ liệu, `renderList()` render danh sách |
| **Bước 2: Tìm điểm bắt đầu** | Chương trình bắt đầu từ đâu? | `addEventListener('click', ...)` khi click thì bắt đầu |
| **Bước 3: Theo dõi dòng dữ liệu** | Dữ liệu từ đâu? Đi đâu? | Từ API lấy → phân tích → render vào trang |
| **Bước 4: Xem logic chi tiết** | Trong mỗi hàm xử lý như nào? | Vòng lặp, điều kiện, tính toán |

**Làm một lần "demo đọc" hoàn chỉnh dùng mã code ở chương 1:**

```javascript
// Bước 1: Cấu trúc chung
// - Một mảy màu sắc
// - Một biến nhớ chỉ số hiện tại
// - Sự kiện click nút

// Bước 2: Điểm bắt đầu
// button.addEventListener('click', ...) → khi click nút thì thực hiện

// Bước 3: Dòng dữ liệu
// colors（mảy màu）→ currentIndex（chỉ số hiện tại）→ backgroundColor（màu nền）

// Bước 4: Logic chi tiết
// currentIndex = (currentIndex + 1) % colors.length
// Công thức này: mỗi lần cộng 1, nhưng không vượt quá độ dài mảy（vòng tròn）
```

### 5.2 Tra cứu lỗi nhanh

| Lỗi | Nói bằng lời thường | Nói với AI thế nào |
|-----|-------------------|-------------------|
| `TypeError: Cannot read properties of undefined` | Bạn muốn lấy giá trị từ cái không tồn tại | "Dòng X báo lỗi, biến nào đó là undefined, kiểm tra logic gán giá trị" |
| `ReferenceError: xxx is not defined` | Dùng biến chưa khai báo | "Biến xxx chưa được định nghĩa, có phải viết sai hoặc quên import không" |
| `TypeError: xxx is not a function` | Xử lý cái không phải hàm như hàm | "xxx không phải hàm, kiểm tra kiểu và nguồn gốc của nó" |
| `SyntaxError: Unexpected token` | Lỗi cú pháp（ngoặc không khớp, thiếu dấu phẩy）| "Dòng X lỗi cú pháp, kiểm tra ngoặc và dấu câu" |
| `CORS error` | Trình duyệt chặn yêu cầu qua miền khác | "Gặp lỗi CORS, cần cấu hình chia sẻ tài nguyên qua miền" |
| `404 Not Found` | Tài nguyên được yêu cầu không tồn tại | "API trả về 404, kiểm tra địa chỉ API có đúng không" |

### 5.3 Làm thế nào để diễn tả vấn đề chính xác

Sự khác biệt giữa người mới và lập trình viên có kinh nghiệm thường nằm ở **độ chính xác khi diễn tả vấn đề**.

| ❌ Diễn tả kém | ✅ Diễn tả tốt |
|-------------|--------------|
| "Mã có bug" | "Khi click nút xóa, xóa của không phải mục hiện tại mà xóa mục cuối cùng" |
| "Phong cách sai" | "Tiêu đề nên ở giữa, nhưng hiện nay ở bên trái" |
| "Dữ liệu không hiển thị" | "Yêu cầu fetch trả về dữ liệu（thấy trong console）, nhưng trang không render lại" |
| "Thêm một chức năng" | "Trang danh sách người dùng thêm ô tìm kiếm, khi nhập thì lọc danh sách theo thời gian thực, tìm kiếm mờ theo trường name" |
| "Click không có phản ứng" | "Khi click nút báo lỗi trong console 'Cannot read property of undefined', lỗi ở dòng X" |

**Một bài tập thực chiến:**

```javascript
// Mã code có bug
function deleteTodo(index) {
  todos.splice(index, 1)  // Luôn xóa mục cuối cùng
}

// Lỗi: dù click nút xóa nào, xóa của cũng là mục cuối
```

**❌ Diễn tả kém:** "Xóa có bug"

**✅ Diễn tả tốt:** "Khi click nút xóa, xóa của không phải mục hiện tại mà xóa mục cuối cùng. Mã code dùng splice(index, 1) nhưng index có thể không đúng. Cần sửa thành dùng id duy nhất của mỗi mục để ghép đúng xóa."

### 5.4 Lúc này bạn nên có thể nhận diện được mã code

- Thấy `const/let` → biết biến có thể gán lại không
- Thấy `{}` → đối tượng / thấy `[]` → mảy
- Thấy `{...obj}` hoặc `[...arr]` → đang tạo bản sao
- Thấy `function` hoặc `=>` → định nghĩa một số phép toán có thể tái sử dụng
- Thấy `if/else` hoặc `? :` → mã code đang ra quyết định
- Thấy `.map()` / `.filter()` → đang biến đổi hoặc lọc mảy
- Thấy `document.querySelector` → đang tìm phần tử trên trang
- Thấy `addEventListener` → đang lắng nghe hành động người dùng
- Thấy `async/await` → đang chờ phép toán chậm
- Thấy `import/export` → đang nhập hoặc xuất module
- Gặp lỗi → có thể hiểu ý nghĩa và diễn tả chính xác cho AI

**Nếu bạn đọc kỹ từng phần "Sâu hơn" của mỗi chương, bạn còn nắm được những khái niệm cốt lõi:**

- **Giá trị vs Tham chiếu**: Loại cơ bản sao chép giá trị, đối tượng/mảy sao chép địa chỉ
- **Phạm vi và Closure**: Hàm có thể "nhớ" biến xung quanh nó khi nó được tạo
- **this của bản chất**: Tùy thuộc vào hàm được ai gọi, không phải được viết ở đâu
- **Vòng lặp sự kiện**: JS là luồng đơn, dùng hàng đợi công việc để "không bị treo"

Những khái niệm này sẽ giúp bạn định vị vấn đề nhanh hơn.

::: info 💡 Khi gặp vấn đề nói với AI như thế này
- "Dòng X báo lỗi XXX, bạn kiểm tra xem là gì"
- "Logic của hàm này là XXX, nhưng kết quả sai, phải là XXX"
- "Tôi muốn sửa chức năng XXX, yêu cầu cụ thể là XXX"
:::
