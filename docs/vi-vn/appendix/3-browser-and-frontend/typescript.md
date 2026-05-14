# Hướng dẫn TypeScript Toàn Diện

::: tip Lời Tựa
Bạn đã biết viết JavaScript, nhưng có thể gặp phải những vấn đề này:
- Gán kiểu dữ liệu sai cho biến, chỉ phát hiện lúc chạy
- Viết tên thuộc tính của đối tượng sai, debug cả ngày
- Kiểu dữ liệu tham số hàm không đúng, sửa hoài

TypeScript là công cụ giúp bạn phát hiện những lỗi này trước khi code chạy. Sau khi đọc bài này, bạn sẽ hiểu tại sao TypeScript nâng cao chất lượng code, nắm vững các khái niệm cốt lõi như type annotation, interface, generic, và dùng tốt hơn những code AI tạo ra trong vibe coding.
:::

**Bài viết này sẽ dạy bạn những gì?**

| Chương | Nội dung | Sau khi học, bạn có thể |
|--------|---------|----------------------|
| **Chương 1** | TypeScript là gì | Hiểu quan hệ giữa nó và JavaScript |
| **Chương 2** | Type annotation cơ bản | Biết cách ghi type cho biến |
| **Chương 3** | Kiểu đối tượng và interface | Định nghĩa kiểu dữ liệu của cấu trúc dữ liệu |
| **Chương 4** | Kiểu hàm | Ghi type cho tham số và giá trị trả về của hàm |
| **Chương 5** | Generic | Viết code có thể tái sử dụng và type-safe |
| **Chương 6** | Type inference và mẹo thực dụng | Biết khi nào cần ghi type rõ ràng |

---

## 1. TypeScript là gì

::: tip 🤔 Câu hỏi cốt lõi
**JavaScript đã đủ dùng rồi, sao còn cần TypeScript?** Học thêm một cú pháp có đáng không?
:::

### 1.1 Từ "lỗi khi chạy" đến "phát hiện khi biên dịch"

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🔴 Điểm yếu của JavaScript**
- Chỉ phát hiện lỗi kiểu dữ liệu khi chạy
- Lỗi đánh vần khó phát hiện
- Refactor dễ sót đi
- IDE gợi ý không chính xác

*Giống như trình soạn thảo văn bản không có kiểm tra chính tả*

</div>
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**✅ Ưu điểm của TypeScript**
- Phát hiện lỗi khi viết code
- Gợi ý thông minh hơn
- Refactor an toàn hơn
- Code dễ bảo trì hơn

*Giống như trình soạn thảo có kiểm tra chính tả và tô sáng cú pháp*

</div>
</div>

**Hiểu quan hệ hai công nghệ bằng một câu:**

| Công nghệ | So sánh | Tác dụng |
|-----------|---------|---------|
| **JavaScript** | Nguyên liệu thô | Code có thể chạy trực tiếp |
| **TypeScript** | Bản thiết kế + kiểm chất | Thêm type checking vào JavaScript, cuối cùng biên dịch thành JavaScript |

### 1.2 Tại sao vibe coding cũng cần TypeScript?

::: warning AI cũng có thể viết code sai
Một lập trình viên dùng AI để tạo chức năng quản lý người dùng. Code JavaScript do AI viết có thể chạy, nhưng có một vấn đề: tuổi người dùng nên là số, nhưng đôi khi bị gán sai thành chuỗi.

Kết quả khi tính "có phải người lớn không", chuỗi "25" bị xử lý như chuỗi, dẫn đến kiểm tra bị lỗi. Lỗi này ẩn lâu, cho đến khi có người dùng nhập ký tự không phải số thì mới lộ.

Nếu dùng TypeScript, đoạn code này sẽ báo lỗi khi viết: `không thể gán kiểu "string" cho kiểu "number"`.

**Đó là giá trị của TypeScript—bạn phát hiện ngay lập tức khi AI viết sai kiểu dữ liệu.**
:::

### 1.3 TypeScript thực chất là như vậy

TypeScript không phải ngôn ngữ hoàn toàn mới, nó chỉ là "tập siêu" của JavaScript:

```typescript
// Đây là code JavaScript hợp lệ, cũng là TypeScript hợp lệ
const name = "Trần Văn A"
const age = 25
function greet(user) {
  return `Hello ${user}`
}

// Đây là type annotation riêng của TypeScript
const name2: string = "Lý Tứ"
const age2: number = 30
function greet2(user: string): string {
  return `Hello ${user}`
}
```

**Hiểu quan trọng:**
- Mọi code JavaScript đều là code TypeScript hợp lệ
- TypeScript thêm **type annotation** tùy chọn
- TypeScript cuối cùng biên dịch thành JavaScript để chạy

::: info 💡 Nhận thức cốt lõi
TypeScript sẽ không thay đổi cách code chạy, nó chỉ giúp kiểm tra kiểu dữ liệu khi biên dịch. **Bạn có thể áp dụng TypeScript dần dần**—bắt đầu từ ghi type cho các biến quan trọng.
:::

---

## 2. Type Annotation Cơ Bản

::: tip 🤔 Câu hỏi cốt lõi
**Làm sao để báo cho TypeScript biết biến nên có kiểu gì?** Cú pháp type annotation là gì?
:::

### 2.1 Cú pháp type annotation

Type annotation là thêm `: kiểu` sau tên biến:

```typescript
// Cú pháp: tên_biến: kiểu = giá_trị
const name: string = "Trần Văn A"
let age: number = 25
let isStudent: boolean = true
```

👇 **Hãy thử**: thêm type annotation cho biến

<TypeAnnotationDemo />

::: details 🔍 Tại sao có những nơi không cần type annotation?
TypeScript có thể tự suy ra kiểu dựa trên giá trị được gán:

```typescript
// Cái này không cần type annotation, TypeScript tự suy ra
const name = "Trần Văn A"      // suy ra là string
const age = 25          // suy ra là number
const isActive = true   // suy ra là boolean

// Những trường hợp này cần ghi rõ type
let data  // ❌ Lỗi: không thể suy ra kiểu
let data: any  // ✅ Được, nhưng mất đi lợi ích type checking

function add(a, b) {  // ❌ Kiểu tham số không rõ
  return a + b
}

function add2(a: number, b: number): number {  // ✅ Kiểu rõ ràng
  return a + b
}
```
:::

### 2.2 Các kiểu cơ bản

TypeScript hỗ trợ mọi kiểu cơ bản của JavaScript:

| Kiểu | Giải thích | Ví dụ |
|------|-----------|-------|
| `string` | Chuỗi ký tự | `"hello"`, `'xin chào'` |
| `number` | Số (nguyên và thập phân) | `42`, `3.14` |
| `boolean` | Giá trị boolean | `true`, `false` |
| `null` / `undefined` | Giá trị rỗng | `null`, `undefined` |
| `array` | Mảng | `number[]`, `string[]` |
| `object` | Đối tượng | `{ name: string; age: number }` |

**Hai cách ghi kiểu mảng:**

```typescript
// Cách 1: kiểu[] (dùng nhiều hơn)
const numbers: number[] = [1, 2, 3, 4, 5]
const names: string[] = ["Trần Văn A", "Lý Tứ", "Vương Năm"]

// Cách 2: Array<kiểu>
const numbers2: Array<number> = [1, 2, 3, 4, 5]
const names2: Array<string> = ["Trần Văn A", "Lý Tứ", "Vương Năm"]
```

**Kiểu đặc biệt:**

```typescript
// any: bất kỳ kiểu nào (cẩn trọng dùng, tương đương tắt type checking)
let data: any = 42
data = "bây giờ có thể là chuỗi"
data = { name: "Trần Văn A" }  // cũng được là đối tượng

// unknown: any an toàn về kiểu
let value: unknown = 42
// if (typeof value === "number") {
//   console.log(value + 10)  // cần kiểm tra kiểu trước khi dùng
// }

// void: không có giá trị trả về
function log(message: string): void {
  console.log(message)
}

// never: không bao giờ trả về
function error(message: string): never {
  throw new Error(message)
}
```

::: info 💡 Mẹo nhận biết
- Thấy `: string` → đây là type annotation cho string
- Thấy `: number[]` → đây là type annotation cho mảng số
- Thấy `: void` → hàm này không có giá trị trả về
:::

---

## 3. Kiểu Đối Tượng và Interface

::: tip 🤔 Câu hỏi cốt lõi
**Làm sao để định nghĩa kiểu dữ liệu của một đối tượng?** Các thuộc tính của đối tượng nên có kiểu nào?
:::

### 3.1 Interface: định nghĩa "hình dạng" của đối tượng

Interface là cách chính trong TypeScript để định nghĩa kiểu dữ liệu của đối tượng:

```typescript
// Định nghĩa một interface User
interface User {
  id: number
  name: string
  email: string
  age?: number  // thuộc tính tùy chọn
}

// Dùng interface
const user: User = {
  id: 1,
  name: "Trần Văn A",
  email: "trananvan@example.com",
  age: 25
}

// age là tùy chọn, có thể không cung cấp
const user2: User = {
  id: 2,
  name: "Lý Tứ",
  email: "lytu@example.com"
}
```

👇 **Hãy thử**: tạo đối tượng phù hợp với định nghĩa interface

<InterfaceDemo />

::: details 🔍 Các tính năng khác của interface
```typescript
// Thuộc tính chỉ đọc
interface User {
  readonly id: number  // id không thể sửa sau khi tạo
  name: string
}

const user: User = {
  id: 1,
  name: "Trần Văn A"
}

user.id = 2  // ❌ Lỗi: không thể sửa thuộc tính chỉ đọc
user.name = "Lý Tứ"  // ✅ Có thể sửa

// Kiểu hàm
interface User {
  name: string
  greet: () => string  // greet là một hàm, trả về string
}

const user: User = {
  name: "Trần Văn A",
  greet: () => "Hello"
}

// Kế thừa interface
interface Admin extends User {
  permissions: string[]
}

const admin: Admin = {
  name: "Quản trị viên",
  greet: () => "Hello Admin",
  permissions: ["read", "write", "delete"]
}
```
:::

### 3.2 Type Alias: định nghĩa kiểu dữ liệu

Ngoài interface, có thể dùng `type` để định nghĩa type alias:

```typescript
// Type alias
type User = {
  id: number
  name: string
  email: string
}

// Kiểu union
type Status = "pending" | "success" | "error"

const status: Status = "success"  // ✅
// const status2: Status = "failed"  // ❌ Lỗi: không trong union type

// Kiểu giao (hợp nhất các kiểu)
type User = {
  id: number
  name: string
}

type Timestamp = {
  createdAt: Date
  updatedAt: Date
}

type UserWithTimestamp = User & Timestamp

const user: UserWithTimestamp = {
  id: 1,
  name: "Trần Văn A",
  createdAt: new Date(),
  updatedAt: new Date()
}
```

**Interface vs Type Alias:**

| Tính năng | interface | type |
|----------|-----------|------|
| Mở rộng | `extends` | `&` kiểu giao |
| Khai báo lặp | Tự động hợp nhất | Báo lỗi |
| Trường hợp dùng | Hình dạng đối tượng, class | Kiểu union, kiểu giao, type alias |

::: info 💡 Mẹo nhận biết
- Thấy `interface` → định nghĩa kiểu đối tượng
- Thấy `type` → tạo type alias
- Thấy `?` → thuộc tính tùy chọn
- Thấy `readonly` → thuộc tính chỉ đọc
:::

---

## 4. Kiểu Hàm

::: tip 🤔 Câu hỏi cốt lõi
**Làm sao để ghi type cho tham số và giá trị trả về của hàm?**
:::

### 4.1 Kiểu tham số và kiểu trả về

```typescript
// Type annotation đầy đủ cho hàm
function add(a: number, b: number): number {
  return a + b
}

// Arrow function
const multiply = (a: number, b: number): number => {
  return a * b
}

// Không có giá trị trả về
function log(message: string): void {
  console.log(message)
}

// Trả về nhiều kiểu (kiểu union)
function parseInput(input: string): number | string {
  const num = parseFloat(input)
  return isNaN(num) ? input : num
}
```

### 4.2 Tham số tùy chọn và tham số mặc định

```typescript
// Tham số tùy chọn (dùng ?)
function greet(name: string, title?: string): string {
  return title ? `${title} ${name}` : name
}

greet("Trần Văn A")  // "Trần Văn A"
greet("Trần Văn A", "Ông")  // "Ông Trần Văn A"

// Tham số mặc định
function greet2(name: string, title: string = "Bạn"): string {
  return `${title} ${name}`
}

greet2("Lý Tứ")  // "Bạn Lý Tứ"
greet2("Lý Tứ", "Tiến sĩ")  // "Tiến sĩ Lý Tứ"
```

### 4.3 Hàm làm tham số

```typescript
// Nhận hàm làm tham số
function calculate(
  a: number,
  b: number,
  operation: (x: number, y: number) => number
): number {
  return operation(a, b)
}

calculate(10, 5, (x, y) => x + y)  // 15
calculate(10, 5, (x, y) => x * y)  // 50

// Cách ghi rõ hơn: định nghĩa kiểu hàm trước
type Operation = (x: number, y: number) => number

function calculate2(
  a: number,
  b: number,
  operation: Operation
): number {
  return operation(a, b)
}
```

::: info 💡 Mẹo nhận biết
- Thấy `(a: number, b: number) => number` → đây là kiểu hàm, mô tả tham số và giá trị trả về
- Thấy `: void` → hàm không có giá trị trả về
- Thấy `?` → tham số là tùy chọn
:::

---

## 5. Generic

::: tip 🤔 Câu hỏi cốt lõi
**Làm sao để viết code xử lý nhiều kiểu, nhưng vẫn giữ type-safety?**
:::

### 5.1 Khái niệm cơ bản về generic

Generic giúp bạn định nghĩa hàm, interface hay class mà không cần chỉ rõ kiểu cụ thể từ trước, mà chỉ định khi sử dụng:

```typescript
// Hàm generic: T là biến kiểu
function identity<T>(arg: T): T {
  return arg
}

// Chỉ định kiểu khi sử dụng
const num1 = identity<number>(42)  // kiểu là number
const str1 = identity<string>("hello")  // kiểu là string

// Suy luận kiểu: TypeScript có thể tự suy ra
const num2 = identity(42)  // suy ra là number
const str2 = identity("hello")  // suy ra là string
```

👇 **Hãy thử**: dùng generic để xử lý các kiểu dữ liệu khác nhau

<GenericDemo />

### 5.2 Ràng buộc generic

Hạn chế generic phải thỏa mãn một số điều kiện:

```typescript
// Ràng buộc T phải có thuộc tính length
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(arg: T): void {
  console.log(arg.length)
}

logLength("hello")  // ✅ chuỗi có length
logLength([1, 2, 3])  // ✅ mảng có length
// logLength(42)  // ❌ số không có thuộc tính length
```

### 5.3 Interface và class generic

```typescript
// Interface generic
interface Box<T> {
  value: T
  getValue(): T
}

const numberBox: Box<number> = {
  value: 42,
  getValue: () => 42
}

const stringBox: Box<string> = {
  value: "hello",
  getValue: () => "hello"
}

// Class generic
class Storage<T> {
  private items: T[] = []

  add(item: T): void {
    this.items.push(item)
  }

  get(index: number): T {
    return this.items[index]
  }
}

const numberStorage = new Storage<number>()
numberStorage.add(1)
numberStorage.add(2)
// numberStorage.add("string")  // ❌ Lỗi

const stringStorage = new Storage<string>()
stringStorage.add("hello")
// stringStorage.add(1)  // ❌ Lỗi
```

::: info 💡 Mẹo nhận biết
- Thấy `<T>` → đây là biến kiểu generic
- Thấy `<T extends SomeType>` → ràng buộc generic
- Thấy `Array<T>` hay `Promise<T>` → kiểu generic có sẵn
:::

---

## 6. Type Inference và Mẹo Thực Dụng

::: tip 🤔 Câu hỏi cốt lõi
**Khi nào cần ghi type rõ ràng? Khi nào có thể dựa vào suy luận?**
:::

### 6.1 Type inference

TypeScript có thể tự động suy ra kiểu dựa trên ngữ cảnh:

```typescript
// Suy luận khi gán giá trị biến
const name = "Trần Văn A"  // suy ra là string
const age = 25  // suy ra là number
const isActive = true  // suy ra là boolean

// Suy luận mảng
const numbers = [1, 2, 3]  // suy ra là number[]
const mixed = [1, "hello", true]  // suy ra là (number | string | boolean)[]

// Suy luận giá trị trả về hàm
function add(a: number, b: number) {
  return a + b  // suy ra giá trị trả về là number
}
```

👇 **Hãy thử**: quan sát cách TypeScript suy luận kiểu

<TypeInferenceDemo />

### 6.2 Khi nào dùng type annotation rõ ràng

::: details Khuyến khích dùng type inference trong trường hợp này
```typescript
// ✅ Khuyến khích: gán giá trị đơn giản
const count = 0
const name = "Trần Văn A"
const isActive = true

// ✅ Khuyến khích: giá trị trả về hàm có thể suy ra
function getUserId(user: User) {
  return user.id  // suy ra là number
}
```
:::

::: details Khuyến khích dùng type annotation rõ ràng trong trường hợp này
```typescript
// ✅ Khuyến khích: tham số hàm (bắt buộc)
function add(a: number, b: number) {
  return a + b
}

// ✅ Khuyến khích: kiểu thuộc tính đối tượng không rõ
const user: {
  id: number
  name: string
  metadata: Record<string, any>
} = {
  id: 1,
  name: "Trần Văn A",
  metadata: {}  // có thể suy ra là {}, cần ghi rõ
}

// ✅ Khuyến khích: kiểu trả về hàm phức tạp
function getUser(): User | null {
  // ...
  return null
}

// ✅ Khuyến khích: API công khai
export function calculateTotal(prices: number[]): number {
  return prices.reduce((sum, price) => sum + price, 0)
}
```
:::

### 6.3 Type guard

Kiểm tra kiểu khi chạy:

```typescript
// typeof type guard
function processValue(value: string | number) {
  if (typeof value === "string") {
    // Ở đây TypeScript biết value là string
    console.log(value.toUpperCase())
  } else {
    // Ở đây TypeScript biết value là number
    console.log(value * 2)
  }
}

// instanceof type guard
class Dog {
  bark() {
    console.log("Gâu gâu")
  }
}

class Cat {
  meow() {
    console.log("Mèo mèo")
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark()  // TypeScript biết đây là Dog
  } else {
    animal.meow()  // TypeScript biết đây là Cat
  }
}

// Custom type guard
interface User {
  name: string
  email: string
}

function isUser(value: any): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.name === "string" &&
    typeof value.email === "string"
  )
}

function processValue(value: unknown) {
  if (isUser(value)) {
    // Ở đây value là User
    console.log(value.name)
  }
}
```

### 6.4 Các kiểu tiện dụng

TypeScript cung cấp một số kiểu tiện dụng có sẵn:

```typescript
// Partial: làm tất cả thuộc tính thành tùy chọn
interface User {
  id: number
  name: string
  email: string
}

type PartialUser = Partial<User>
// Tương đương: { id?: number; name?: string; email?: string }

// Required: làm tất cả thuộc tính bắt buộc
type RequiredUser = Required<PartialUser>
// Tương đương: { id: number; name: number; email: string }

// Pick: chỉ giữ các thuộc tính chỉ định
type UserBasicInfo = Pick<User, "id" | "name">
// Tương đương: { id: number; name: string }

// Omit: loại bỏ các thuộc tính chỉ định
type UserWithoutEmail = Omit<User, "email">
// Tương đương: { id: number; name: string }

// Record: tạo kiểu đối tượng
type UserRoles = Record<string, boolean>
// Tương đương: { [key: string]: boolean }
```

---

## 7. Mẹo Thực Chiến: Dùng TypeScript trong vibe coding

::: tip 🤔 Câu hỏi cốt lõi
**Làm sao để tận dụng tốt hơn TypeScript trong phát triển có hỗ trợ AI?**
:::

### 7.1 Để AI tạo code type-safe

**❌ Yêu cầu không tốt:**
```
Viết hàm quản lý người dùng cho tôi
```

**✅ Yêu cầu tốt:**
```
Viết hàm quản lý người dùng với TypeScript.

Cấu trúc dữ liệu như sau:
interface User {
  id: number
  name: string
  email: string
  age: number
}

Cần viết:
1. Lấy danh sách người dùng: trả về User[]
2. Tạo người dùng: nhận Partial<User>, trả về User
3. Cập nhật người dùng: nhận id và Partial<User>, trả về User
4. Xóa người dùng: nhận id, trả về void

Đảm bảo tất cả hàm đều có type annotation đầy đủ.
```

### 7.2 Hiểu thông điệp lỗi TypeScript

**Lỗi phổ biến và ý nghĩa:**

| Thông điệp lỗi | Ý nghĩa | Cách khắc phục |
|----------------|---------|----------------|
| `Type 'X' is not assignable to type 'Y'` | Kiểu X không thể gán cho kiểu Y | Kiểm tra kiểu có khớp không, hoặc chuyển đổi kiểu |
| `Property 'X' does not exist on type 'Y'` | Kiểu Y không có thuộc tính X | Kiểm tra tên thuộc tính, hoặc định nghĩa thuộc tính |
| `Argument of type 'X' is not assignable to parameter of type 'Y'` | Kiểu tham số không khớp | Kiểm tra kiểu tham số khi gọi hàm |
| `Type 'X' is missing the following properties from type 'Y'` | Kiểu X thiếu một số thuộc tính của kiểu Y | Bổ sung các thuộc tính còn thiếu |

### 7.3 Áp dụng TypeScript dần dần

Nếu bạn có dự án JavaScript, có thể chuyển qua TypeScript từng bước:

1. **Bước 1: Đổi tên file thành `.ts`**
   ```bash
   # Từ utils.js sang utils.ts
   mv utils.js utils.ts
   ```

2. **Bước 2: Sửa các lỗi kiểu rõ ràng**
   ```typescript
   // Nếu báo lỗi: Parameter 'a' implicitly has an 'any' type
   // Thêm type annotation
   function add(a: number, b: number) {
     return a + b
   }
   ```

3. **Bước 3: Từng bước thêm định nghĩa kiểu**
   ```typescript
   // Dùng any tạm để sửa nhanh
   function processUser(user: any) {
     // ...
   }

   // Sau đó hoàn thiện kiểu
   interface User {
     id: number
     name: string
   }

   function processUser(user: User) {
     // ...
   }
   ```

4. **Bước 4: Bật type checking nghiêm ngặt hơn**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true,  // Bật chế độ nghiêm ngặt
       "noImplicitAny": true,  // Cấm any ẩn
       "strictNullChecks": true  // Kiểm tra null nghiêm ngặt
     }
   }
   ```

---

## 8. Code bạn sẽ nhận biết được từ giờ

- Thấy `: string` → đây là type annotation cho string
- Thấy `: number[]` → đây là type annotation cho mảng số
- Thấy `interface User` → định nghĩa kiểu đối tượng
- Thấy `type User =` → type alias
- Thấy `<T>` → generic
- Thấy `extends` → kế thừa interface hoặc ràng buộc generic
- Thấy `?` → thuộc tính tùy chọn
- Thấy `readonly` → thuộc tính chỉ đọc
- Thấy `|` → kiểu union
- Thấy `&` → kiểu giao

**Nếu bạn có duyên đọc phần "Sâu hơn" của mỗi chương, bạn đã nắm vững những khái niệm cốt lõi này:**

- **Type annotation**: báo rõ cho TypeScript kiểu dữ liệu của biến
- **Interface**: định nghĩa cấu trúc và kiểu của đối tượng
- **Generic**: viết code có thể tái sử dụng và type-safe
- **Type inference**: TypeScript tự suy ra kiểu
- **Type guard**: kiểm tra kiểu khi chạy
- **Utility types**: Partial, Required, Pick, Omit...

::: info 💡 Khi gặp vấn đề, nói với AI như thế này
- "Type annotation cho hàm này phải viết thế nào? Tham số là X, trả về là Y"
- "Giúp tôi định nghĩa interface cho cấu trúc dữ liệu này: ..."
- "Lỗi TypeScript này là gì? Sửa thế nào?"
- "Làm sao thêm ràng buộc cho generic function này, để T bắt buộc có một thuộc tính nào đó?"
:::
