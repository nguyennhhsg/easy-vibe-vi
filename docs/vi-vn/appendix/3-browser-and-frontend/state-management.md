# Triết lý Quản lý Trạng thái
::: tip 🎯 Câu hỏi cốt lõi
**Khi ứng dụng ngày càng lớn, các component nên chia sẻ và đồng bộ hóa dữ liệu như thế nào một cách tao nhã?** Bạn có thể gặp phải tình huống như thế này: người dùng thêm sản phẩm vào giỏ hàng trong trang chi tiết sản phẩm, nhưng số lượng giỏ hàng ở header không được cập nhật; hai component không liên quan cần cùng một bộ dữ liệu, nhưng bạn không biết cách truyền nó. Chương này sẽ giúp bạn tiến hóa từ "truyền dữ liệu hỗn loạn" thành "quản lý trạng thái rõ ràng".
:::

---

## 1. Tại sao phải "componentization và state management"?

### 1.1 Từ tiệm nhỏ đến nhà máy: Sự tiến hóa của phát triển frontend

Trước khi bắt đầu chính thức, hãy để tôi hỏi bạn một câu hỏi: **Bạn có bao giờ cố gắng nấu một bữa ăn lớn trong bếp không?**

Nếu bạn chỉ nấu một bát mì cho riêng mình, điều đó rất đơn giản—một cái nồi, một ít mì, một chút gia vị, mười giây là xong. Nhưng nếu bạn muốn mở một nhà hàng, phục vụ hàng trăm khách hàng mỗi ngày, bạn không thể tiếp tục "làm bất cứ điều gì bạn muốn". Bạn cần những công thức tiêu chuẩn, sự phân chia công việc rõ ràng, quy trình mua sắm thống nhất, để đảm bảo chất lượng của mỗi món ăn ổn định và hiệu suất phục vụ cao.

Phát triển frontend cũng vậy. Một người viết dự án nhỏ, mã có thể đặt ở bất cứ đâu. Nhưng khi đội ngũ lớn hơn và dự án phức tạp hơn, bạn cần một phương pháp có hệ thống để tổ chức mã và quản lý dữ liệu. Đây là vấn đề mà **componentization và state management** cần giải quyết.

::: tip 🤔 "Component" và "state" là gì?
Trước khi tiếp tục, hãy để tôi giải thích hai khái niệm cốt lõi:

**Component (Thành phần)**:Giống như những viên gạch Lego, mỗi viên gạch là một phần độc lập, có hình dáng, màu sắc và chức năng riêng của nó. Bạn có thể ghép nhiều viên gạch lại với nhau để xây dựng một lâu đài phức tạp. Trong phát triển frontend, một nút, một biểu mẫu, một thanh điều hướng, tất cả đều có thể là một component.

**State (Trạng thái)**:Là "bộ nhớ" của component. Ví dụ, một nút "nhớ" rằng nó đang ở trạng thái "vô hiệu hóa" hay "kích hoạt"; một component giỏ hàng "nhớ" những sản phẩm nào trong đó. Trạng thái sẽ thay đổi, và sự thay đổi trạng thái sẽ kích hoạt cập nhật giao diện.

**Componentization + State management = Mã được tổ chức + Luồng dữ liệu rõ ràng**
:::

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🏠 Chế độ tiệm nhỏ**
- Mã được viết trong một tệp, giống như nấu tất cả các món ăn trong một cái nồi
- Dữ liệu được truyền khắp nơi, giống như nhân viên phục vụ mang theo các đĩa chạy khắp nhà hàng
- Thay đổi ở một nơi có thể ảnh hưởng đến nơi khác, giống như thêm quá nhiều muối sẽ làm hỏng cả bộ mon

</div>
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🏭 Chế độ nhà máy**
- Mã được chia thành các component, giống như nhà hàng được chia thành phòng khách, bếp, bộ phận mua sắm
- Dữ liệu được quản lý tập trung, giống như có một kho lưu trữ và hệ thống phân phối thống nhất
- Tác động của sự thay đổi rõ ràng, giống như thay đổi một món ăn không ảnh hưởng đến toàn bộ nhà hàng

</div>
</div>

### 1.2 Một câu chuyện thực tế về lỗi: Tại sao bạn cần hiểu về quản lý trạng thái

Bạn có thể nói: "Tôi không sử dụng Vue/React sao? Chúng không đã có quản lý trạng thái rồi sao?" Hãy để tôi kể một câu chuyện thực tế, bạn sẽ hiểu tại sao việc hiểu một cách có hệ thống về componentization và state management lại quan trọng như vậy.

::: warning Câu chuyện lỗi của Tiểu Mỹ
Tiểu Mỹ là một quản lý sản phẩm chuyển thành phát triển frontend tại một công ty thương mại điện tử, vừa tiếp quản việc cấu trúc lại chức năng giỏ hàng. Cô ấy từng sử dụng dự án jQuery thời đó, bây giờ cần cải tạo bằng Vue 3.

Tiểu Mỹ nghĩ: "Logic giỏ hàng rất đơn giản, chỉ cần lưu trữ một mảng." Vì vậy cô ấy bắt đầu viết mã:
- Trong component trang chi tiết sản phẩm, sử dụng một mảng `cart` để lưu trữ dữ liệu giỏ hàng
- Trong component trang giỏ hàng, cô ấy lại định nghĩa một mảng `cartItems`
- Trong component thanh điều hướng header, còn có một biến `cartCount`

Vấn đề nhanh chóng xuất hiện:
1. **Dữ liệu không đồng bộ**: Người dùng thêm sản phẩm vào giỏ hàng trong trang chi tiết, nhưng dữ liệu ở trang giỏ hàng không được cập nhật
2. **Mã lặp lại**: Tiểu Mỹ phải viết nhiều hàm "thêm vào giỏ hàng", mỗi hàm được đặt trong các component khác nhau
3. **Khó bảo trì**: Nhân viên vận hành nói muốn thêm chức năng "xóa giỏ hàng", Tiểu Mỹ phát hiện phải sửa ba nơi

Sau đó cô ấy hỏi ý kiến của kiến trúc sư frontend A Cường, A Cường nhìn vào mã và nói: "Cô đã vi phạm lệnh cấm của state management—cùng một bộ dữ liệu được lưu trữ ở nhiều nơi."

Giải pháp rất đơn giản: sử dụng Pinia để tạo quản lý trạng thái giỏ hàng toàn cục, tất cả các component đều đọc và ghi dữ liệu từ cùng một nơi. Sau khi cải tạo, tất cả vấn đề đều được giải quyết.

Tiểu Mỹ kể từ đó hiểu rằng một bài học: **Nếu không hiểu về componentization và state management, bạn sẽ viết ra "mã sợi mì" khó bảo trì.**
:::

::: info 💡 Cái nhìn sâu sắc cốt lõi
Componentization và state management không phải là "tính năng bổ sung" của framework, mà là nền tảng của phát triển frontend hiện đại. Khi bạn hiểu chúng, bạn mới có thể thiết kế một kiến trúc rõ ràng, viết mã dễ bảo trì, và hoạt động hiệu quả trong sự hợp tác nhóm.
:::

---

## 2. Khái niệm cốt lõi: Hiểu bản chất của componentization

::: tip 🤔 "Tư duy componentization" là gì?
Tư duy componentization là một phương pháp để chia nhỏ giao diện phức tạp thành các đơn vị mã độc lập, có thể tái sử dụng, với trách nhiệm duy nhất.

Hãy sử dụng một phép so sánh: Tưởng tượng bạn đang lắp ráp một máy tính. Bạn sẽ mua các bộ phận CPU, bộ nhớ, ổ cứng, card đồ họa một cách riêng biệt, sau đó lắp ráp chúng lại với nhau. Mỗi bộ phận có chức năng rõ ràng, bạn có thể thay thế bất kỳ bộ phận nào bất kỳ lúc nào mà không ảnh hưởng đến các phần khác.

Componentization chính là làm cho mã frontend cũng có thể "module hóa" như vậy—mỗi component chịu trách nhiệm cho việc của nó, thông qua các giao diện rõ ràng và hợp tác với các component khác.
:::

### 2.1 Sử dụng phép so sánh nhà hàng để hiểu componentization

Hãy sử dụng phép so sánh nhà hàng để hiểu rõ ràng tư duy cốt lõi của componentization:

| Khái niệm | 🍽️ Phép so sánh nhà hàng | Tác dụng thực tế | Ví dụ cụ thể |
|------|-------------|----------|----------|
| **Component** | Các bộ phận khác nhau của nhà hàng (phòng khách, bếp, bộ phận mua sắm) | Mỗi bộ phận chịu trách nhiệm cho việc của nó | Component nút chịu trách nhiệm cho click, component biểu mẫu chịu trách nhiệm cho input |
| **Props (Thuộc tính)** | Thực đơn mà khách hàng nói với nhân viên phục vụ | Component cha truyền dữ liệu đến component con | Component cha truyền "tên người dùng" đến component avatar |
| **Events (Sự kiện)** | Nhân viên phục vụ thông báo cho bếp "có đơn hàng mới" | Component con thông báo cho component cha về điều đã xảy ra | Component nút nói với component cha "tôi đã được click" |
| **State (Trạng thái)** | "Danh sách đơn hàng hiện tại" của bếp | Dữ liệu được lưu trữ bên trong component | Component giỏ hàng nhớ những sản phẩm nào trong đó |

::: tip 📊 Bạn có thể thấy gì từ bảng?
Hãy giải thích từng hàng của bảng này:

**Component**: Giống như nhà hàng có các bộ phận khác nhau, trang frontend cũng được tạo thành từ các component khác nhau. Mỗi component là một phần độc lập, có trách nhiệm riêng.

**Props**: Đây là cách component cha "truyền dữ liệu" đến component con. Giống như khách hàng nói với nhân viên phục vụ họ muốn ăn gì, component cha cũng có thể truyền dữ liệu (như tên người dùng, thông tin sản phẩm) đến component con qua props. Lưu ý: props là "một chiều", chỉ có thể từ cha xuống con, không thể ngược lại.

**Events**: Khi component con cần thông báo cho component cha (ví dụ như nút được click, biểu mẫu được gửi), nó sẽ kích hoạt một event. Giống như nhân viên phục vụ nhận được đơn hàng rồi thông báo cho bếp "bắt đầu nấu ăn". Điều này duy trì tính một chiều của luồng dữ liệu—component con không thể trực tiếp sửa đổi dữ liệu của component cha, chỉ có thể "gửi thông điệp".

**State**: Đây là "bộ nhớ" bên trong component. Giống như bếp cần nhớ những đơn hàng nào hiện tại, component cũng cần nhớ trạng thái của nó (ví dụ như giỏ hàng có những sản phẩm nào, nút có bị vô hiệu hóa không). Khi trạng thái thay đổi, component sẽ tự động cập nhật giao diện.
:::

<ComponentHierarchyDemo />

### 2.2 Props và Events: "Kênh chính thức" của component cha con

Trong các framework frontend (Vue, React), **Props và Events là cách tiêu chuẩn để component cha con giao tiếp**.

**Ví dụ Vue:**

```vue
<!-- Parent.vue - Component cha -->
<template>
  <div>
    <!-- Giống như trao thực đơn cho nhân viên, truyền dữ liệu qua props -->
    <Child
      :user-name="currentUser.name"
      :is-admin="currentUser.isAdmin"
      @delete-user="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const currentUser = ref({
  name: '张三',
  isAdmin: true
})

const handleDelete = (userId) => {
  console.log('删除用户:', userId)
  // 处理删除逻辑
}
</script>
```

```vue
<!-- Child.vue - Component con -->
<template>
  <div class="user-card">
    <h3>{{ userName }}</h3>
    <span v-if="isAdmin" class="badge">管理员</span>
    <button @click="requestDelete">删除用户</button>
  </div>
</template>

<script setup>
// Nhận dữ liệu được truyền từ component cha
const props = defineProps({
  userName: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
})

// Định nghĩa các event có thể kích hoạt
const emit = defineEmits(['delete-user'])

const requestDelete = () => {
  // Thông báo cho component cha thông qua event
  emit('delete-user', props.userName)
}
</script>
```

::: tip 💡 Nguyên tắc cốt lõi
**Props xuống, Events lên**—đây là quy tắc vàng của giao tiếp component.

- Component cha truyền dữ liệu qua **props** đến component con (giống như giao vụ cho cấp dưới)
- Component con thông báo cho component cha qua **events** về điều đã xảy ra (giống như cấp dưới báo cáo công việc)

Điều này duy trì sự rõ ràng và tính một chiều của luồng dữ liệu, tránh tình huống "ai cũng có thể sửa dữ liệu" hỗn loạn.
:::

<PropsFlowDemo />

### 2.3 Luồng dữ liệu một chiều: Tại sao không thể trực tiếp sửa đổi props?

Nhiều người mới bắt đầu sẽ mắc một lỗi: trực tiếp sửa đổi giá trị của props trong component con.

```vue
<!-- ❌ Cách làm sai -->
<script setup>
const props = defineProps({
  count: { type: Number, default: 0 }
})

// Trực tiếp sửa đổi props - điều này bị cấm!
props.count = 10  // Sẽ gây lỗi
</script>
```

**Tại sao không thể trực tiếp sửa đổi props?**

Hãy tưởng tượng: Bạn mượn một cuốn sách từ thư viện (props), rồi vẽ bậy trên sách (sửa đổi props). Những người khác mượn cuốn sách này (các component khác) cũng sẽ thấy vẽ bậy của bạn, điều này sẽ gây ra sự hỗn loạn. Cách làm đúng là: nếu bạn cần sửa đổi dữ liệu, hãy để component cha sửa đổi, component con chỉ là "yêu cầu sửa đổi".

```vue
<!-- ✅ Cách làm đúng -->
<script setup>
const props = defineProps({
  count: { type: Number, default: 0 }
})

const emit = defineEmits(['update-count'])

// Thông qua event để yêu cầu component cha sửa đổi
const increment = () => {
  emit('update-count', props.count + 1)
}
</script>
```

---

## 3. Từ "hỗn loạn" đến "có trật tự": Sự tiến hóa của giao tiếp component

::: tip 🤔 Tại sao cần tiến hóa?
Khi dự án lớn hơn, giao tiếp giữa các component sẽ trở nên phức tạp hơn. Hãy xem một nhóm thực tế đã tiến hóa như thế nào để có một giải pháp quản lý trạng thái rõ ràng.

Đây không chỉ là "nâng cấp công cụ", mà là **sự thay đổi của toàn bộ cách tư duy**—từ "truyền dữ liệu tùy tiện" đến "thiết kế luồng dữ liệu rõ ràng".
:::

### 3.1 Toàn cảnh sự tiến hóa

Bảng dưới đây cho thấy bốn giai đoạn tiến hóa của cách giao tiếp component, bạn có thể thấy vấn đề được giải quyết như thế nào từng bước:

| Giai đoạn | Cách giao tiếp | Vấn đề điển hình | Sự thay đổi cốt lõi |
|------|---------|----------|----------|
| **Giai đoạn một: Truyền tự do** | Sửa đổi trực tiếp, biến toàn cục | Dữ liệu không đồng bộ, khó gỡ lỗi | Không có quy chuẩn, truyền dữ liệu tùy tiện |
| **Giai đoạn hai: Props/Events** | Giao tiếp tiêu chuẩn component cha con | Props Drilling (truyền từng lớp) | Có quy chuẩn, nhưng lồng ghép sâu rất phiền phức |
| **Giai đoạn ba: Thư viện quản lý trạng thái** | Vuex/Redux/Pinia | Chi phí học tập, mã tấm lót | Quản lý dữ liệu tập trung, gỡ lỗi tiện lợi |
| **Giai đoạn bốn: Giải pháp hiện đại** | Hàm composite/Nguyên tử hóa | Cần hiểu các khái niệm mới | Linh hoạt hơn, gọn gàng hơn |

<EventBusDemo />

::: tip 📊 Bạn có thể thấy gì từ bảng?
Hãy giải thích từng hàng của bảng này:

**Giai đoạn một → Giai đoạn hai**: Từ "không có quy chuẩn" đến "có quy chuẩn". Đây là một bước nhảy về chất—bạn bắt đầu sử dụng giao tiếp tiêu chuẩn props/events, luồng dữ liệu trở nên rõ ràng. Nhưng giá là khi component lồng ghép sâu, dữ liệu phải truyền từng lớp, rất phiền phức (Props Drilling).

**Giai đoạn hai → Giai đoạn ba**: Từ "quản lý phân tán" đến "quản lý tập trung". Bạn bắt đầu sử dụng thư viện quản lý trạng thái (Vuex/Redux), đặt dữ liệu chung vào một "kho lưu trữ" toàn cục, tất cả các component đều đọc và ghi dữ liệu từ đây. Điều này giải quyết Props Drilling, nhưng chi phí học tập tăng lên.

**Giai đoạn ba → Giai đoạn bốn**: Từ "nặng" đến "nhẹ". Các giải pháp mới (như Composition API của Vue 3, Hooks của React) làm cho quản lý trạng thái linh hoạt hơn, gọn gàng hơn. Bạn không còn nhất thiết phải sử dụng store toàn cục, có thể kết hợp các đơn vị trạng thái nhỏ theo nhu cầu.

**Tóm lại**: Tiến hóa không chỉ là "thay đổi sang công cụ tốt hơn", mà là **sự nâng cấp của toàn bộ cách tư duy**—từ truyền dữ liệu tùy tiện, đến thiết kế luồng dữ liệu rõ ràng.
:::

### 3.2 Giai đoạn một: Truyền tự do—sự khởi đầu hỗn loạn

Tại sao gọi là "truyền tự do"? Vì giai đoạn này không có bất kỳ quy chuẩn nào, dữ liệu muốn truyền kiểu gì cũng được—biến toàn cục, sửa đổi trực tiếp, event bus rải rác khắp nơi.

**Kịch bản điển hình: Dữ liệu giỏ hàng phân tán ở nhiều nơi**

```javascript
// Component trang chi tiết sản phẩm
export default {
  data() {
    return {
      localCart: []  // Tự duy trì một bản giỏ hàng
    }
  },
  methods: {
    addToCart(product) {
      this.localCart.push(product)
      // Cố gắng đồng bộ đến các component khác
      window.cart = this.localCart  // ❌ Biến toàn cục!
    }
  }
}

// Component trang giỏ hàng
export default {
  data() {
    return {
      cartItems: []  // Lại có một bản giỏ hàng
    }
  },
  mounted() {
    // Cố gắng đọc từ biến toàn cục
    this.cartItems = window.cart || []  // ❌ Không đáng tin cậy!
  }
}

// Component thanh điều hướng header
export default {
  data() {
    return {
      cartCount: 0  // Vẫn có bản giỏ hàng thứ ba!
    }
  },
  mounted() {
    // Thăm dò kiểm tra sự thay đổi (thật đó là cách làm tồi tệ)
    setInterval(() => {
      this.cartCount = window.cart?.length || 0
    }, 1000)  // ❌ Hiệu năng kém!
  }
}
```

**Đặc điểm của giai đoạn này:**
- ✅ **Ưu điểm**: Đơn giản trực tiếp, không có chi phí học tập
- ❌ **Nhược điểm**: Dữ liệu phân tán, khó đồng bộ, khó gỡ lỗi, một mớ hỗn loạn

### 3.3 Giai đoạn hai: Props/Events—sự thiết lập quy chuẩn

Sự hỗn loạn của truyền tự do làm cho nhóm nhận ra: **chúng ta cần quy chuẩn**. Vì vậy bắt đầu sử dụng cách giao tiếp tiêu chuẩn do framework cung cấp: props và events.

**Kịch bản điển hình: Props Drilling (khoan prop)**

```vue
<!-- Ancestor component: App.vue -->
<template>
  <div class="app">
    <!-- Truyền thông tin người dùng từng lớp -->
    <Layout :user-name="userName" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Layout from './Layout.vue'

const userName = ref('张三')
</script>
```

```vue
<!-- Lớp trung gian: Layout.vue -->
<template>
  <div class="layout">
    <Header :user-name="userName" />  <!-- Chỉ truyền, không sử dụng -->
    <Main>
      <Page :user-name="userName" />  <!-- Chỉ truyền, không sử dụng -->
    </Main>
  </div>
</template>

<script setup>
const props = defineProps({
  userName: String
})
</script>
```

```vue
<!-- Nơi thực sự cần: Header.vue -->
<template>
  <header>
    <span>{{ userName }}</span>  <!-- Cuối cùng cũng được sử dụng -->
  </header>
</template>

<script setup>
const props = defineProps({
  userName: String
})
</script>
```

**Đặc điểm của giai đoạn này:**
- ✅ **Ưu điểm**: Luồng dữ liệu rõ ràng, dòng chảy một chiều, dễ hiểu
- ❌ **Nhược điểm**: Props Drilling (truyền từng lớp rất phiền phức), giao tiếp giữa các component khó khăn

::: tip 🤔 Props Drilling là gì?
Props Drilling đề cập đến: **Dữ liệu phải đi qua nhiều component trung gian, từng lớp truyền xuống, nhưng những component trung gian này không thực sự sử dụng dữ liệu đó**.

Giống như bạn cần giao đơn hàng cho người ở tầng năm, nhưng quy định phải có chữ ký xác nhận ở mỗi tầng. Những người ở tầng một, hai, ba, bốn chỉ là "giúp bạn chuyển giao", họ không cần đơn hàng này, nhưng phải tham gia vào. Điều này rõ ràng rất phiền phức.
:::

### 3.4 Giai đoạn ba: Thư viện quản lý trạng thái—quản lý tập trung

Khó khăn của Props Drilling đã tạo ra các thư viện quản lý trạng thái (Vuex, Redux, Pinia). Ý tưởng cốt lõi của chúng là: **đặt dữ liệu chung vào một "kho lưu trữ" toàn cục, tất cả các component đều đọc và ghi dữ liệu từ đây**.

**Kịch bản điển hình: Sử dụng Pinia để quản lý giỏ hàng**

```javascript
// stores/cart.js - Trạng thái giỏ hàng toàn cục
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // Tất cả dữ liệu giỏ hàng được tập trung vào đây
  const items = ref([])

  // Tính toán: số lượng sản phẩm
  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  // Phương pháp: thêm sản phẩm
  const addItem = (product) => {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  return {
    items,
    itemCount,
    addItem
  }
})
```

```vue
<!-- Component trang chi tiết sản phẩm -->
<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

const addToCart = (product) => {
  cart.addItem(product)  // Gọi trực tiếp, không cần truyền từng lớp
}
</script>
```

```vue
<!-- Component thanh điều hướng header -->
<template>
  <header>
    <span>Giỏ hàng ({{ cart.itemCount }})</span>
  </header>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()  // Đọc trực tiếp, tự động đồng bộ
</script>
```

**Đặc điểm của giai đoạn này:**
- ✅ **Ưu điểm**: Quản lý dữ liệu tập trung, giải quyết Props Drilling, công cụ gỡ lỗi mạnh mẽ
- ❌ **Nhược điểm**: Chi phí học tập, cần viết mã tấm lót thêm, có thể thiết kế quá mức cho dự án đơn giản

### 3.5 Giai đoạn bốn: Giải pháp hiện đại—linh hoạt và gọn gàng

Mặc dù thư viện quản lý trạng thái rất mạnh, nhưng cũng có vấn đề "bắn voi bằng súng máy". Đối với dự án nhỏ và vừa, các giải pháp linh hoạt hơn, nhẹ hơn đã xuất hiện.

**Kịch bản điển hình: Sử dụng Composable/Hooks để tái sử dụng logic trạng thái**

```javascript
// composables/useCart.js - Logic giỏ hàng có thể tái sử dụng
import { ref, computed } from 'vue'

export function useCart() {
  const items = ref([])

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const addItem = (product) => {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  return {
    items,
    itemCount,
    addItem
  }
}
```

```vue
<!-- Sử dụng trong bất kỳ component nào -->
<script setup>
import { useCart } from '@/composables/useCart'

// Mỗi lần gọi sẽ tạo một phiên bản trạng thái mới
// Thích hợp cho trạng thái cục bộ bên trong component
const { items, itemCount, addItem } = useCart()
</script>
```

**Đặc điểm của giai đoạn này:**
- ✅ **Ưu điểm**: Linh hoạt, nhẹ, có thể kết hợp, sử dụng theo nhu cầu
- ❌ **Nhược điểm**: Cần hiểu cách tư duy hợp thành, chia sẻ giữa các component cần xử lý bổ sung

---

## 4. Giải thích chi tiết thư viện quản lý trạng thái: Vuex vs Pinia vs Redux

::: tip 🤔 Làm thế nào để chọn thư viện quản lý trạng thái?
Khi đối mặt với các thư viện quản lý trạng thái khác nhau, bạn có thể cảm thấy bối rối: sau cùng nên chọn cái nào?

Thực ra không có "thư viện tốt nhất", chỉ có "thư viện phù hợp nhất". Hãy xem xét những yếu tố này khi chọn:
- **Bạn sử dụng framework nào?** Vue dùng Pinia, React dùng Redux/Zustand
- **Dự án lớn cỡ nào?** Dự án nhỏ dùng Composable, dự án lớn dùng thư viện quản lý trạng thái
- **Đội ngũ có kinh nghiệm gì?** Chọn cái mà đội ngũ quen thuộc, hoặc có chi phí học tập thấp

Nội dung tiếp theo sẽ giới thiệu chi tiết các đặc điểm và tình huống sử dụng của các thư viện quản lý trạng thái chính.
:::

### 4.1 So sánh các thư viện quản lý trạng thái chính

| Tính năng | Redux | Vuex | Pinia | Zustand |
| :--- | :--- | :--- | :--- | :--- |
| **Framework phù hợp** | React | Vue | Vue | React |
| **Đường cong học tập** | Dốc | Trung bình | Nhẹ | Nhẹ |
| **Mã tấm lót** | Nhiều | Trung bình | Ít | Cực ít |
| **TypeScript** | Tốt | Tốt | Xuất sắc | Xuất sắc |
| **Công cụ gỡ lỗi** | Mạnh mẽ | Tốt | Xuất sắc | Tốt |
| **Tình huống sử dụng** | Dự án lớn | Dự án Vue 2/3 vừa và lớn | Dự án Vue 3 mới | Dự án React vừa và nhỏ |

::: tip 📊 Bạn có thể thấy gì từ bảng?
Hãy giải thích từng hàng của bảng này:

**Redux**: Thư viện quản lý trạng thái hàng đầu của hệ sinh thái React. Ưu điểm là những quy chuẩn nghiêm ngặt, công cụ gỡ lỗi mạnh mẽ, nhưng nhược điểm là mã tấm lót nhiều, đường cong học tập dốc. Thích hợp cho các dự án lớn và các đội yêu cầu quy chuẩn nghiêm ngặt.

**Vuex**: Thư viện quản lý trạng thái chính thức của Vue thời đại Vue 2. Ý tưởng thiết kế tương tự Redux, nhưng phù hợp hơn với hệ thống phản ứng của Vue. Hiện tại vẫn có thể sử dụng, nhưng các dự án mới được khuyến cáo sử dụng Pinia.

**Pinia**: Thư viện quản lý trạng thái thế hệ mới do chính thức được khuyến cáo của Vue 3. Cú pháp gọn gàng, hỗ trợ TypeScript tốt, chi phí học tập thấp. **Đây là sự lựa chọn hàng đầu cho các dự án Vue 3**.

**Zustand**: Thư viện quản lý trạng thái nhẹ của hệ sinh thái React. API cực đơn giản, hầu như không có mã tấm lót. Thích hợp cho các dự án React vừa và nhỏ.
:::

<StateManagementComparisonDemo />

### 4.2 Thực chiến Pinia: Sự lựa chọn được khuyến cáo cho Vue 3

Pinia là thư viện quản lý trạng thái được chính thức khuyến cáo của đội Vue, được thiết kế đặc biệt cho Vue 3. Nó gọn gàng hơn Vuex, dễ sử dụng hơn.

**Tại sao gọi là Pinia?**

Pinia là từ tiếng Tây Ban Nha có nghĩa là "dứa". Dứa là một loại trái cây được tạo thành từ nhiều bông nhỏ, mỗi bông đều độc lập, nhưng nó tạo thành một tổng thể thống nhất. Điều này chính xác so sánh với ý tưởng thiết kế của Pinia—**mỗi store là độc lập, nhưng có thể được sử dụng kết hợp**.

**Khái niệm cốt lõi:**

::: details Xem ví dụ mã hoàn chỉnh
```javascript
// stores/user.js - Quản lý trạng thái người dùng
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 1. State: Lưu trữ dữ liệu
  const userInfo = ref(null)
  const isLoggedIn = computed(() => !!userInfo.value)

  // 2. Actions: Phương pháp để sửa đổi dữ liệu
  const login = async (username, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
    const user = await response.json()
    userInfo.value = user  // Sửa đổi trực tiếp, Pinia sẽ xử lý phản ứng
  }

  const logout = () => {
    userInfo.value = null
  }

  // 3. Getters: Thuộc tính tính toán
  const displayName = computed(() => {
    return userInfo.value?.name || 'Khách'
  })

  return {
    userInfo,
    isLoggedIn,
    login,
    logout,
    displayName
  }
})
```
:::

**Sử dụng trong component:**

```vue
<template>
  <div class="user-panel">
    <span v-if="user.isLoggedIn">Chào mừng, {{ user.displayName }}</span>
    <button v-if="user.isLoggedIn" @click="user.logout">Đăng xuất</button>
    <button v-else @click="showLoginDialog">Đăng nhập</button>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

// Trực tiếp lấy store, tất cả nội dung đều phản ứng
const user = useUserStore()

const showLoginDialog = () => {
  // Hiển thị hộp thoại đăng nhập...
}
</script>
```

**Ưu điểm của Pinia:**

| Ưu điểm | Giải thích | So với Vuex |
|------|------|----------|
| **API đơn giản** | Không cần mutations, sửa đổi state trực tiếp | Vuex cần phân tách mutations và actions |
| **Thân thiện với TypeScript** | Suy luận kiểu dụ tự động, không cần cấu hình bổ sung | Vuex cần định nghĩa kiểu phức tạp |
| **Module hóa tự động** | Mỗi tệp store tự động trở thành module | Vuex cần cấu hình namespaced thủ công |
| **Kích thước nhỏ hơn** | Sau khi đóng gói khoảng 1KB | Vuex khoảng 3KB |

<VuexPiniaDemo />

### 4.3 Thực chiến Redux: Lựa chọn cổ điển của React

Redux là thư viện quản lý trạng thái cổ điển nhất của hệ sinh thái React, được biết đến với luồng dữ liệu một chiều nghiêm ngặt.

**Tại sao gọi là Redux?**

Redux là viết tắt của "Reduced Flux". Flux là mô hình kiến trúc ứng dụng mà Facebook đề xuất sớm, Redux đơn giản hóa các khái niệm của Flux, vì vậy được gọi là "Reduced Flux".

**Nguyên tắc cốt lõi:**

1. **Nguồn dữ liệu duy nhất**: Trạng thái của toàn bộ ứng dụng được lưu trữ trong một cây đối tượng
2. **State chỉ đọc**: Cách duy nhất để thay đổi state là kích hoạt action
3. **Sử dụng hàm thuần túy để sửa đổi**: Reducer phải là hàm thuần túy

::: details Xem ví dụ mã hoàn chỉnh
```javascript
// 1. Định nghĩa loại Action
const ADD_TODO = 'ADD_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

// 2. Định nghĩa Action Creators
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), text, completed: false }
})

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id }
})

// 3. Định nghĩa Reducer (hàm thuần túy)
const initialState = {
  todos: []
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    default:
      return state
  }
}

// 4. Tạo Store
import { createStore } from 'redux'
const store = createStore(todoReducer)
```
:::

**Sử dụng trong React:**

```jsx
import { useSelector, useDispatch } from 'react-redux'

function TodoList() {
  // Đọc state
  const todos = useSelector(state => state.todos)

  // Lấy hàm dispatch
  const dispatch = useDispatch()

  return (
    <ul>
      {todos.map(todo => (
        <li
          key={todo.id}
          onClick={() => dispatch(toggleTodo(todo.id))}
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  )
}
```

**Ưu và nhược điểm của Redux:**

| Ưu điểm | Nhược điểm |
| :--- | :--- |
| Luồng dữ liệu nghiêm ngặt, dễ gỡ lỗi | Mã tấm lót nhiều, đường cong học tập dốc |
| Gỡ lỗi du lịch thời gian (Time Travel) | Ngay cả trạng thái đơn giản cũng cần viết nhiều mã |
| Hệ sinh thái middleware phong phú | Không thích hợp cho dự án nhỏ |
| Cập nhật trạng thái có thể dự đoán | Cần hiểu khái niệm lập trình hàm |

<ReduxFlowDemo />

<MobxReactivityDemo />

<ZustandJotaiDemo />

---

## 5. Hướng dẫn thực chiến: Làm thế nào để thiết kế quản lý trạng thái?

::: tip 🤔 Khi nào cần thư viện quản lý trạng thái?
Không phải tất cả các dự án đều cần thư viện quản lý trạng thái. Trước khi giới thiệu, hãy tự hỏi bạn một vài câu hỏi:

1. **Có bao nhiêu component cần chia sẻ dữ liệu này?**
   - Nếu chỉ có 2-3 component, props/events là đủ
   - Nếu có 5+ component, hãy xem xét thư viện quản lý trạng thái

2. **Dữ liệu này có thay đổi thường xuyên không?**
   - Nếu hầu như không thay đổi (như thông tin người dùng), sử dụng Provide/Inject
   - Nếu thay đổi thường xuyên (như giỏ hàng), sử dụng thư viện quản lý trạng thái

3. **Đội ngũ lớn đến mức nào?**
   - Một cá nhân hoặc nhóm nhỏ: phương pháp đơn giản là đủ
   - Đội ngũ lớn: cần quy chuẩn nghiêm ngặt và công cụ gỡ lỗi mạnh mẽ

**Hãy nhớ: bắt đầu từ cơ sở đơn giản, nâng cấp theo nhu cầu.**
:::

### 5.1 Các nguyên tắc thiết kế trạng thái

Bất kể bạn chọn giải pháp quản lý trạng thái nào, bạn nên tuân theo các nguyên tắc sau:

**Nguyên tắc một: Nguồn dữ liệu duy nhất**

Cùng một bộ dữ liệu chỉ nên được lưu trữ ở một nơi. Không lặp lại định nghĩa dữ liệu tương tự ở nhiều component.

```javascript
// ❌ Sai: Dữ liệu phân tán ở nhiều nơi
const ProductDetail = { cart: [] }
const CartPage = { items: [] }
const Header = { count: 0 }

// ✅ Đúng: Dữ liệu được quản lý tập trung
const cartStore = { items: [] }  // Nguồn dữ liệu duy nhất
```

**Nguyên tắc hai: Tính không thay đổi**

Khi sửa đổi trạng thái, bạn nên tạo đối tượng mới thay vì sửa đổi đối tượng gốc.

```javascript
// ❌ Sai: Sửa đổi trực tiếp
state.items.push(newItem)

// ✅ Đúng: Tạo đối tượng mới
state.items = [...state.items, newItem]
```

**Nguyên tắc ba: Trạng thái lên, sự kiện xuống**

Trạng thái chia sẻ nên được đặt trong component tổ tiên chung gần nhất hoặc store toàn cục, chứ không phải phân tán ở các component con.

```vue
<!-- ❌ Sai: Trạng thái trong component con -->
<Parent>
  <Child :data="childData" @update="childData = $event" />
</Parent>

<!-- ✅ Đúng: Trạng thái trong component cha -->
<Parent>
  <Child :data="parentData" @update="parentData = $event" />
</Parent>
```

### 5.2 Trường hợp thực chiến: Thiết kế trạng thái giỏ hàng thương mại điện tử

Hãy sử dụng kết hợp kiến thức trước đó để thiết kế một giải pháp quản lý trạng thái giỏ hàng thương mại điện tử.

**Phân tích yêu cầu:**

- Trang danh sách sản phẩm có thể thêm sản phẩm vào giỏ hàng
- Trang giỏ hàng có thể xem, sửa đổi số lượng, xóa sản phẩm
- Thanh điều hướng header hiển thị số lượng sản phẩm trong giỏ hàng
- Hỗ trợ chọn/bỏ chọn sản phẩm, tính tổng giá sản phẩm được chọn
- Lưu trữ dữ liệu vĩnh viễn vào localStorage

**Thiết kế trạng thái (Pinia):**

```javascript
// stores/cart.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // ============ State (Trạng thái) ============
  const items = ref([])  // Danh sách sản phẩm trong giỏ hàng
  const selectedIds = ref([])  // ID của sản phẩm được chọn

  // Khôi phục dữ liệu từ localStorage
  const initFromStorage = () => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        items.value = data.items || []
        selectedIds.value = data.selectedIds || []
      } catch (e) {
        console.error('Lỗi đọc dữ liệu giỏ hàng:', e)
      }
    }
  }

  // Lưu vào localStorage
  const persist = () => {
    localStorage.setItem('cart', JSON.stringify({
      items: items.value,
      selectedIds: selectedIds.value
    }))
  }

  // ============ Getters (Thuộc tính tính toán) ============
  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const selectedItems = computed(() =>
    items.value.filter(item => selectedIds.value.includes(item.id))
  )

  const selectedTotalPrice = computed(() =>
    selectedItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  // ============ Actions (Phương pháp) ============
  const addItem = (product) => {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += product.quantity || 1
    } else {
      items.value.push({
        ...product,
        quantity: product.quantity || 1
      })
    }
    persist()
  }

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
        persist()
      }
    }
  }

  const removeItem = (productId) => {
    items.value = items.value.filter(item => item.id !== productId)
    selectedIds.value = selectedIds.value.filter(id => id !== productId)
    persist()
  }

  const toggleSelection = (productId) => {
    const index = selectedIds.value.indexOf(productId)
    if (index > -1) {
      selectedIds.value.splice(index, 1)
    } else {
      selectedIds.value.push(productId)
    }
    persist()
  }

  // Khởi tạo
  initFromStorage()

  return {
    // State
    items,
    selectedIds,
    // Getters
    itemCount,
    totalPrice,
    selectedItems,
    selectedTotalPrice,
    // Actions
    addItem,
    updateQuantity,
    removeItem,
    toggleSelection
  }
})
```

**Sử dụng trong component:**

```vue
<!-- Trang chi tiết sản phẩm: ProductDetail.vue -->
<template>
  <div class="product-detail">
    <h2>{{ product.name }}</h2>
    <p class="price">¥{{ product.price }}</p>
    <button @click="addToCart">Thêm vào giỏ hàng</button>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  product: Object
})

const cart = useCartStore()

const addToCart = () => {
  cart.addItem({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price
  })
}
</script>
```

```vue
<!-- Thanh điều hướng header: Header.vue -->
<template>
  <header class="header">
    <div class="logo">Cửa hàng của tôi</div>
    <nav>
      <RouterLink to="/">Trang chủ</RouterLink>
      <RouterLink to="/cart">
        Giỏ hàng ({{ cart.itemCount }})
      </RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()  // Sử dụng trực tiếp, tự động phản ứng với sự thay đổi
</script>
```

---

## 6. Những cạm bẫy thường gặp và hướng dẫn tránh chúng

::: warning ⚠️ Những cạm bẫy này, 90% người mới bắt đầu đều sẽ mắc
Trong thực chiến quản lý trạng thái, có những lỗi khá phổ biến. Hãy để tôi tổng hợp những cạm bẫy phổ biến nhất và cách tránh chúng.
:::

### 6.1 Cạm bẫy một: Sửa đổi trực tiếp Props hoặc State

**Mã sai:**

```javascript
// ❌ Sửa đổi trực tiếp props
props.user.name = '李四'

// ❌ Sửa đổi trực tiếp state của Vuex
store.state.user.name = '李四'

// ❌ Sửa đổi trực tiếp phần tử mảng
state.items[0].name = 'Tên mới'
```

**Tại sao điều này không hoạt động?**

Framework frontend (Vue/React) cần "theo dõi" sự thay đổi dữ liệu, mới có thể tự động cập nhật giao diện. Nếu bạn sửa đổi đối tượng hoặc mảng trực tiếp, framework có thể không phát hiện được sự thay đổi, dẫn đến giao diện không cập nhật.

**Cách làm đúng:**

```javascript
// ✅ Vue 3 / Pinia: Sửa đổi trực tiếp thuộc tính cấp cao nhất
store.user.name = '李四'  // Pinia sẽ xử lý phản ứng tự động

// ✅ Vue 2 / Vuex: Thông qua mutation
mutations: {
  UPDATE_USER_NAME(state, newName) {
    state.user.name = newName
  }
}

// ✅ Sửa đổi mảng: Tạo mảng mới
state.items = state.items.map((item, index) =>
  index === 0 ? { ...item, name: 'Tên mới' } : item
)
```

### 6.2 Cạm bẫy hai: Sửa đổi trạng thái trong Getter

**Mã sai:**

```javascript
// ❌ Sửa đổi trạng thái trong getter
getters: {
  doubleCount(state) {
    state.count *= 2  // Tác dụng phụ!
    return state.count
  }
}
```

**Tại sao điều này không hoạt động?**

Getter nên là "hàm thuần túy", chỉ chịu trách nhiệm tính toán và trả về giá trị, không nên có bất kỳ tác dụng phụ nào (sửa đổi trạng thái). Nếu bạn sửa đổi trạng thái trong getter, nó sẽ dẫn đến vòng lặp vô hạn, vấn đề khó gỡ lỗi.

**Cách làm đúng:**

```javascript
// ✅ Getter chỉ tính toán, không sửa đổi
getters: {
  doubleCount(state) {
    return state.count * 2
  }
}

// ✅ Nếu cần sửa đổi, sử dụng action
actions: {
  doubleCountAndSave({ commit }) {
    commit('SET_DOUBLE_COUNT')
  }
}
```

### 6.3 Cạm bẫy ba: Quên xóa bỏ các trình lắng nghe sự kiện

**Mã sai:**

```javascript
// ❌ Quên hủy đăng ký
export default {
  created() {
    EventBus.$on('cart-updated', this.handleCartUpdate)
  }
  // Component bị hủy, nhưng trình lắng nghe vẫn ở đó!
}
```

**Tại sao điều này không hoạt động?**

Nếu component bị hủy nhưng trình lắng nghe sự kiện vẫn ở đó, sẽ dẫn đến rò rỉ bộ nhớ (bộ nhớ được chiếm dụng không thể được giải phóng). Trong ứng dụng một trang, người dùng không ngừng chuyển đổi trang, những trình lắng nghe chưa được xóa bỏ sẽ tích tụ ngày càng nhiều, cuối cùng dẫn đến trang chậm.

**Cách làm đúng:**

```javascript
// ✅ Hủy đăng ký kịp thời
export default {
  created() {
    EventBus.$on('cart-updated', this.handleCartUpdate)
  },
  beforeUnmount() {  // Vue 3 sử dụng beforeUnmount, Vue 2 sử dụng beforeDestroy
    EventBus.$off('cart-updated', this.handleCartUpdate)
  }
}
```

### 6.4 Cạm bẫy bốn: Sử dụng quá mức quản lý trạng thái

**Mã sai:**

```javascript
// ❌ Đặt tất cả trạng thái vào store
const store = useStore()
store.inputValue = 'Người dùng nhập vào'
store.isModalOpen = true
store.currentTab = 'profile'
```

**Tại sao điều này không hoạt động?**

Không phải tất cả trạng thái đều cần được đặt vào store toàn cục. Nếu trạng thái chỉ được sử dụng trong một component (như giá trị input, trạng thái hiển thị hộp thoại), hãy đặt nó trong component. Sử dụng quá mức quản lý trạng thái sẽ làm mã phức tạp.

**Cách làm đúng:**

```javascript
// ✅ Trạng thái cục bộ sử dụng quản lý bên trong component
const inputValue = ref('')

// ✅ Chỉ đặt trạng thái cần chia sẻ vào store
const userInfo = useUserStore()  // Nhiều component cần thông tin người dùng
const cart = useCartStore()  // Nhiều component cần dữ liệu giỏ hàng
```

---

## 7. Tóm tắt và lời khuyên

### 7.1 Ôn tập các điểm kiến thức cốt lõi

Hãy để chúng tôi sử dụng bảng để ôn tập các khái niệm cốt lõi của componentization và state management:

| Khái niệm | Giải thích một dòng | Giải quyết vấn đề | Công cụ điển hình |
|------|-----------|-----------|----------|
| **Componentization** | Chia nhỏ giao diện thành các phần độc lập, có thể tái sử dụng | Tái sử dụng mã, tách rời trách nhiệm | Component Vue/React |
| **Props** | Component cha truyền dữ liệu đến component con | Giao tiếp cha con | Nội trang Vue/React |
| **Events** | Component con thông báo cho component cha về những gì đã xảy ra | Giao tiếp con cha | Nội trang Vue/React |
| **State** | Dữ liệu được lưu trữ bên trong component | Nhớ trạng thái component | Nội trang Vue/React |
| **Thư viện quản lý trạng thái** | Quản lý tập trung trạng thái chia sẻ toàn cục | Giao tiếp giữa các component, Props Drilling | Pinia, Redux, Zustand |
| **Nguồn dữ liệu duy nhất** | Cùng một bộ dữ liệu chỉ được lưu trữ ở một nơi | Dữ liệu không nhất quán, khó đồng bộ | Nguyên tắc cốt lõi của quản lý trạng thái |

### 7.2 Khuyến cáo lựa chọn cho các tình huống khác nhau

| Tình huống | Giải pháp được khuyến cáo | Lý do |
| :--- | :--- | :--- |
| **Giao tiếp component cha con** | Props + Events | Nội trang, đơn giản trực tiếp |
| **Truyền dữ liệu qua nhiều lớp** | Provide / Inject | Tránh truyền từng lớp |
| **Trạng thái cục bộ component** | ref / useState | Đơn giản, không cần công cụ bổ sung |
| **Dự án Vue vừa** | Pinia | Được khuyến cáo chính thức, chi phí học tập thấp |
| **Dự án React vừa** | Zustand | Cực đơn giản, không có mã tấm lót |
| **Dự án Vue lớn** | Pinia + quy chuẩn | Linh hoạt và có thể mở rộng |
| **Dự án React lớn** | Redux Toolkit | Quy chuẩn nghiêm ngặt, hệ sinh thái phong phú |
| **Tái sử dụng logic giữa các component** | Composable / Hooks | Linh hoạt, có thể kết hợp |

### 7.3 Lời khuyên học tập

**Đối với người mới bắt đầu:**

1. **Trước tiên hãy nắm vững kiến thức cơ sở**: Hiểu rõ các khái niệm props, events, state này
2. **Bắt đầu từ dự án nhỏ**: Đừng giới thiệu thư viện quản lý trạng thái ngay từ đầu
3. **Thực hành nhiều**: Lý thuyết học bao nhiêu cũng không bằng động tay viết mã

**Đối với người phát triển nâng cao:**

1. **Đọc mã nguồn**: Hiểu rõ nguyên lý hoạt động của Pinia/Redux
2. **Tìm hiểu các mô hình**: Học về các mô hình thiết kế phổ biến (như mô hình Observer, mô hình Pub-Sub)
3. **Theo dõi hệ sinh thái**: Cập nhật các công cụ liên quan (như DevTools, middleware)

**Hãy nhớ những nguyên tắc cốt lõi này:**

1. **Bắt đầu từ đơn giản**: Đừng giới thiệu quản lý trạng thái phức tạp quá sớm
2. **Nguồn dữ liệu duy nhất**: Tránh cùng một bộ dữ liệu được lưu trữ ở nhiều nơi
3. **Tính không thay đổi**: Khi sửa đổi trạng thái, hãy tạo đối tượng mới thay vì sửa đổi trực tiếp
4. **Chọn theo nhu cầu**: Chọn giải pháp phù hợp dựa trên quy mô dự án và tình huống đội ngũ

Hy vọng bài viết này giúp bạn xây dựng sự hiểu biết toàn diện về componentization và state management. Khi bạn gặp các vấn đề luồng dữ liệu phức tạp trong dự án thực tế, bạn sẽ biết nơi nào cần bắt đầu, cách thiết kế và cách triển khai.
