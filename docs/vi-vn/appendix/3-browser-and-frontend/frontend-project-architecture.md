# Thiết kế kiến trúc dự án Frontend

::: tip 🎯 Câu hỏi cốt lõi
**Từ những trang HTML đơn giản đến các ứng dụng cấp doanh nghiệp phức tạp, làm thế nào để chọn kiến trúc phù hợp cho các dự án có quy mô khác nhau?** Nó giống như hỏi: từ căn hộ độc thân đến một trung tâm thương mại lớn, làm thế nào để thiết kế bố cục không gian khác nhau dựa trên nhu cầu? Kiến trúc tốt nên tiến hóa cùng sự phát triển của dự án, không phải quá thiết kế từ đầu.
:::

---

## 1. Sự tiến hóa kiến trúc: từ đơn giản đến phức tạp

### 1.1 Tổng quan ba mức độ phức tạp

Kiến trúc của dự án frontend nên phù hợp với độ phức tạp của dự án. Chúng ta chia dự án thành ba mức dựa trên hai chiều: **độ phức tạp kỹ thuật** và **quy mô người dùng**:

| Mức độ | Tech Stack | Quy mô người dùng | Trường hợp điển hình | Tâm điểm chính |
|------|--------|----------|----------|------------|
| **Cơ bản** | HTML/CSS/JS | Cá nhân/Nhóm nhỏ | Blog cá nhân, trang quảng cáo, công cụ đơn giản | Triển khai nhanh, bảo trì đơn giản |
| **Trung bình** | Vue/React + công cụ xây dựng | Doanh nghiệp nhỏ và vừa | Hệ thống quản lý, sàn thương mại điện tử, SaaS | Tái sử dụng thành phần, quản lý trạng thái |
| **Cấp doanh nghiệp** | Framework + micro frontend/SSR | Ứng dụng lớn | Nền tảng lớn, hệ thống kinh doanh phức tạp | Tối ưu hóa hiệu suất, hợp tác nhóm, khả năng mở rộng |

::: tip 💡 Làm thế nào để chọn?
**Đừng quá thiết kế!** Nhiều dự án bắt đầu từ HTML đơn giản, khi nhu cầu tăng lên, dần dần giới thiệu framework và công cụ.

- Dự án cá nhân → Cơ bản
- MVP của startup → Cơ bản hoặc trung bình
- Hệ thống quản lý doanh nghiệp → Trung bình
- Nền tảng internet lớn → Cấp doanh nghiệp
:::

---

## 2. Cấp độ cơ bản: Dự án HTML/CSS/JS

### 2.1 Trường hợp phù hợp

- Blog cá nhân, trang sơ yếu lý lịch
- Trang quảng cáo sản phẩm (Landing Page)
- Trang công cụ đơn giản (máy tính, trình chuyển đổi, v.v.)
- Xác minh nguyên mẫu, Demo nhanh

### 2.2 Cấu trúc thư mục được đề xuất

```
my-simple-project/
├── index.html              # Trang chủ
├── about.html              # Trang giới thiệu (nếu có)
├── css/
│   ├── reset.css           # Đặt lại kiểu
│   ├── variables.css       # CSS biến (màu sắc, phông chữ, v.v.)
│   ├── components.css      # Kiểu thành phần (nút, thẻ, v.v.)
│   └── main.css            # Tệp kiểu chính
├── js/
│   ├── utils.js            # Hàm tiện ích
│   ├── api.js              # Gọi API đơn giản
│   └── main.js             # Logic chính
├── assets/
│   ├── images/             # Tài nguyên hình ảnh
│   └── fonts/              # Tệp phông chữ
└── README.md               # Mô tả dự án
```

### 2.3 Nguyên tắc tổ chức code

**HTML**: Thẻ ngữ nghĩa, cấu trúc rõ ràng

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog cá nhân của tôi</title>
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <header class="site-header">
    <nav class="main-nav">
      <a href="index.html">Trang chủ</a>
      <a href="about.html">Giới thiệu</a>
    </nav>
  </header>
  
  <main class="content">
    <article class="blog-post">
      <h1>Tiêu đề bài viết</h1>
      <p>Nội dung bài viết...</p>
    </article>
  </main>
  
  <footer class="site-footer">
    <p>&copy; 2024 Blog của tôi</p>
  </footer>
  
  <script src="js/utils.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

**CSS**: Sử dụng biến CSS để quản lý chủ đề

```css
/* variables.css */
:root {
  --primary-color: #3498db;
  --text-color: #333;
  --bg-color: #fff;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --font-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* components.css - kiểu thành phần có thể tái sử dụng */
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: 4px;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
}

.card {
  padding: var(--spacing-md);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

**JavaScript**: Tổ chức theo mô-đun (sử dụng mô-đun ES6 hoặc tách đơn giản)

```javascript
// utils.js
const utils = {
  // Đơn giản hóa thao tác DOM
  $(selector) {
    return document.querySelector(selector);
  },
  
  // Chống sốc đơn giản
  debounce(fn, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },
  
  // Đóng gói lưu trữ địa phương
  storage: {
    get(key) {
      return JSON.parse(localStorage.getItem(key) || 'null');
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
};

// main.js
document.addEventListener('DOMContentLoaded', () => {
  // Logic khởi tạo trang
  initNavigation();
  loadBlogPosts();
});
```

### 2.4 Thực hành tốt nhất

✅ **Nên làm**:
- Sử dụng thẻ HTML ngữ nghĩa
- Biến CSS quản lý màu sắc và khoảng cách
- Nén hình ảnh và tải lười biếng
- Thêm các thẻ meta SEO cơ bản

❌ **Tránh**:
- Kiểu nội tuyến (`style="..."`)
- Ô nhiễm biến toàn cầu
- Code lặp lại (sao chép dán)

---

## 3. Cấp độ trung bình: Dự án Vue/React Framework

### 3.1 Trường hợp phù hợp

- Hệ thống quản lý doanh nghiệp (ERP, CRM, OA)
- Sàn thương mại điện tử frontend/backend
- Ứng dụng SaaS
- Ứng dụng web cần tương tác phức tạp

### 3.2 Cấu trúc dự án Vue được đề xuất

```
my-vue-project/
├── public/                     # Tài nguyên tĩnh
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/                 # Kiểu, hình ảnh, phông chữ
│   │   ├── styles/
│   │   │   ├── variables.scss
│   │   │   ├── mixins.scss
│   │   │   └── global.scss
│   │   └── images/
│   ├── components/             # Thành phần chung
│   │   ├── common/             # Chung toàn cục (Button, Modal, v.v.)
│   │   │   ├── Button/
│   │   │   │   ├── index.vue
│   │   │   │   └── Button.scss
│   │   │   └── Modal/
│   │   └── business/           # Thành phần kinh doanh (UserCard, v.v.)
│   ├── views/                  # Thành phần trang
│   │   ├── Home/
│   │   ├── User/
│   │   │   ├── List.vue
│   │   │   └── Detail.vue
│   │   └── Product/
│   ├── router/                 # Cấu hình định tuyến
│   │   └── index.js
│   ├── stores/                 # Quản lý trạng thái Pinia/Vuex
│   │   ├── user.js
│   │   └── app.js
│   ├── services/               # Dịch vụ API
│   │   ├── request.js          # Đóng gói axios
│   │   ├── user.js
│   │   └── product.js
│   ├── utils/                  # Hàm tiện ích
│   │   ├── format.js
│   │   ├── validate.js
│   │   └── storage.js
│   ├── composables/            # Hàm tổng hợp
│   │   ├── useAuth.js
│   │   └── useLoading.js
│   ├── constants/              # Định nghĩa hằng số
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── tests/                      # Tệp kiểm tra
├── .env                        # Biến môi trường
├── vite.config.js
├── package.json
└── README.md
```

### 3.3 Cấu trúc dự án React được đề xuất

```
my-react-project/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/             # Thành phần chung
│   │   │   ├── Button/
│   │   │   │   ├── index.jsx
│   │   │   │   └── Button.module.css
│   │   │   └── Modal/
│   │   └── business/           # Thành phần kinh doanh
│   ├── pages/                  # Thành phần trang
│   │   ├── Home/
│   │   ├── User/
│   │   └── Product/
│   ├── hooks/                  # Hooks tùy chỉnh
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   ├── services/               # Dịch vụ API
│   │   ├── api.js
│   │   └── userService.js
│   ├── store/                  # Quản lý trạng thái Redux/Zustand
│   │   ├── slices/
│   │   └── index.js
│   ├── utils/
│   ├── constants/
│   ├── App.jsx
│   └── main.jsx
├── tests/
└── package.json
```

### 3.4 Chi tiết các khái niệm chính

#### Nguyên tắc thiết kế thành phần

**Trách nhiệm duy nhất**: một thành phần chỉ làm một việc

```vue
<!-- ❌ Ví dụ xấu: thành phần làm quá nhiều việc -->
<template>
  <div>
    <form @submit="handleSubmit">
      <!-- Nội dung biểu mẫu -->
    </form>
    <table>
      <!-- Bảng dữ liệu -->
    </table>
    <div class="charts">
      <!-- Biểu đồ thống kê -->
    </div>
  </div>
</template>

<!-- ✅ Ví dụ tốt: chia thành các thành phần độc lập -->
<template>
  <div>
    <UserForm @submit="fetchData" />
    <UserTable :data="users" />
    <UserStats :data="users" />
  </div>
</template>
```

#### Chiến lược quản lý trạng thái

| Loại trạng thái | Vị trí lưu trữ | Ví dụ |
|----------|----------|------|
| **Trạng thái toàn cầu** | Pinia/Redux | Thông tin người dùng, trạng thái đăng nhập, cài đặt chủ đề |
| **Trạng thái trang** | Thành phần trang | Điều kiện truy vấn danh sách, thông tin phân trang |
| **Trạng thái thành phần** | Bên trong thành phần | Nhập biểu mẫu, hiển thị/ẩn popup |
| **Trạng thái máy chủ** | TanStack Query/SWR | Dữ liệu máy chủ, bộ nhớ cache |

#### Lựa chọn cách tổ chức thư mục

**Cách 1: Tổ chức theo loại (phù hợp với dự án nhỏ)**

```
src/
├── components/     # Tất cả thành phần
├── views/          # Tất cả trang
├── stores/         # Tất cả trạng thái
└── services/       # Tất cả dịch vụ
```

**Cách 2: Tổ chức theo chức năng (phù hợp với dự án vừa và lớn)**

```
src/
├── features/
│   ├── auth/       # Tất cả code của chức năng xác thực
│   ├── user/       # Tất cả code của chức năng người dùng
│   └── product/    # Tất cả code của chức năng sản phẩm
├── shared/         # Tài nguyên được chia sẻ
└── App.vue
```

::: tip 💡 Làm thế nào để chọn?
- Trang dự án < 10 → Tổ chức theo loại
- Trang dự án > 20 → Tổ chức theo chức năng
- Nhóm > 5 người → Tổ chức theo chức năng, dễ phát triển song song
:::

---

## 4. Kiến trúc cấp doanh nghiệp: Ứng dụng lớn

### 4.1 Trường hợp phù hợp

- Nền tảng internet lớn (thương mại điện tử, mạng xã hội, nền tảng nội dung)
- Ứng dụng cấp doanh nghiệp phức tạp
- Dự án cần hỗ trợ hợp tác đa nhóm
- Dự án có yêu cầu cao về hiệu suất và khả năng bảo trì

### 4.2 Kiến trúc Micro Frontend

Khi quy mô dự án lớn đến mức độ khó bảo trì một kho mã duy nhất, bạn có thể xem xét kiến trúc **Micro Frontend**.

```
Nền tảng thương mại điện tử lớn/
├── Ứng dụng cơ sở (khung chính)
│   ├── Thanh điều hướng trên cùng
│   ├── Menu bên
│   ├── Điểm vào trung tâm người dùng
│   └── Vùng chứa ứng dụng con
├── Ứng dụng con sản phẩm (triển khai độc lập)
│   ├── Danh sách sản phẩm
│   ├── Chi tiết sản phẩm
│   └── Quản lý sản phẩm
├── Ứng dụng con đơn hàng (triển khai độc lập)
│   ├── Giỏ hàng
│   ├── Danh sách đơn hàng
│   └── Quy trình thanh toán
├── Ứng dụng con người dùng (triển khai độc lập)
│   ├── Trung tâm cá nhân
│   ├── Địa chỉ giao hàng
│   └── Phiếu giảm giá
└── Ứng dụng con tiếp thị (triển khai độc lập)
    ├── Trang hoạt động
    ├── Phát hành phiếu giảm giá
    └── Cửa hàng điểm thưởng
```

**Lợi ích của Micro Frontend**:
- Tự chủ nhóm: mỗi ứng dụng con được phát triển, triển khai độc lập
- Không phụ thuộc tech stack: các nhóm khác nhau có thể sử dụng các framework khác nhau
- Nâng cấp dần dần: có thể dần dần tái cấu trúc hệ thống cũ

### 4.3 Cấu trúc thư mục cấp doanh nghiệp

```
enterprise-project/
├── apps/                       # Ứng dụng con Micro Frontend
│   ├── main/                   # Ứng dụng cơ sở
│   ├── product/
│   ├── order/
│   └── user/
├── packages/                   # Gói được chia sẻ (Monorepo)
│   ├── ui-components/          # Thư viện thành phần chung
│   ├── utils/                  # Hàm tiện ích
│   ├── constants/              # Định nghĩa hằng số
│   └── types/                  # Loại TypeScript
├── shared/                     # Cấu hình được chia sẻ
│   ├── eslint-config/
│   ├── ts-config/
│   └── vite-config/
├── docs/                       # Tài liệu dự án
├── scripts/                    # Script xây dựng
└── package.json
```

### 4.4 Kiến trúc tối ưu hóa hiệu suất

Ứng dụng lớn cần chú ý đến tối ưu hóa hiệu suất:

```
Chiến lược tối ưu hóa hiệu suất/
├── Tối ưu hóa thời xây dựng
│   ├── Chia tách code (Code Splitting)
│   ├── Tải lười biếng định tuyến
│   ├── Tree Shaking
│   └── Nén tài nguyên
├── Tối ưu hóa thời chạy
│   ├── Cuộn ảo (danh sách dài)
│   ├── Tải hình ảnh lười biếng
│   ├── Render thành phần theo yêu cầu
│   └── Chiến lược bộ nhớ cache
└── Tối ưu hóa mạng
    ├── Tăng tốc CDN
    ├── Bộ nhớ cache HTTP
    ├── Tải trước tài nguyên
    └── Service Worker
```

### 4.5 Kiến trúc SSR/SSG

Cho các trường hợp cần SEO hoặc hiệu suất trang đầu tiên:

| Giải pháp | Trường hợp phù hợp | Framework đại diện |
|------|----------|----------|
| **SSR** | Cần SEO, render trang đầu nhanh | Next.js, Nuxt.js |
| **SSG** | Nội dung tĩnh, cập nhật không thường xuyên | Astro, VitePress |
| **Hỗn hợp** | Một phần tĩnh, một phần động | Next.js (ISR) |

---

## 5. Lựa chọn kiến trúc dựa trên quy mô người dùng

### 5.1 Cá nhân/Nhóm nhỏ (DAU < 1000)

**Đặc điểm**: Lặp lại nhanh, tài nguyên hạn chế, nhu cầu thay đổi nhanh

**Kiến trúc được đề xuất**:
- Tech Stack: Vue 3 + Vite hoặc React + Vite
- Quản lý trạng thái: Pinia hoặc Zustand (nhẹ)
- Thư viện UI: Element Plus / Ant Design
- Triển khai: Vercel / Netlify / máy chủ đám mây

**Cấu trúc thư mục**: Tổ chức đơn giản theo loại là được

### 5.2 Doanh nghiệp trung bình (DAU 1k-100k)

**Đặc điểm**: Kinh doanh phức tạp, hợp tác nhóm, cần ổn định

**Kiến trúc được đề xuất**:
- Tech Stack: Vue 3 + TypeScript hoặc React + TypeScript
- Quản lý trạng thái: Pinia + hàm tổng hợp hoặc Redux Toolkit
- Thư viện UI: Thư viện thành phần tùy chỉnh + thư viện thành phần kinh doanh
- Kiểm tra: Kiểm tra đơn vị + Kiểm tra E2E
- Triển khai: Đường ống CI/CD + Docker

**Cấu trúc thư mục**: Tổ chức theo chức năng, thiết lập quy chuẩn

### 5.3 Nền tảng lớn (DAU > 100k)

**Đặc điểm**: Lưu lượng cao, hợp tác đa nhóm, bảo trì dài hạn

**Kiến trúc được đề xuất**:
- Tech Stack: React/Vue + TypeScript (chế độ nghiêm ngặt)
- Kiến trúc: Micro Frontend + Monorepo
- Quản lý trạng thái: Quản lý trạng thái chi tiết + bộ nhớ cache trạng thái máy chủ
- Hiệu suất: SSR/SSG + CDN + tính toán biên
- Theo dõi: Theo dõi frontend + theo dõi lỗi + phân tích hiệu suất

**Cấu trúc thư mục**: Monorepo + Micro Frontend

---

## 6. Lộ trình tiến hóa kiến trúc

### 6.1 Ví dụ tiến hóa: từ blog đến nền tảng

```
Giai đoạn 1: Blog cá nhân (HTML/CSS/JS)
    ↓ Nhu cầu: cần backend quản lý
Giai đoạn 2: Thêm backend quản lý (Vue/React + cấu trúc đơn giản)
    ↓ Nhu cầu: hệ thống người dùng, chức năng bình luận
Giai đoạn 3: Mô-đun hóa chức năng (tổ chức theo chức năng)
    ↓ Nhu cầu: hợp tác đa nhóm, triển khai độc lập
Giai đoạn 4: Kiến trúc Micro Frontend (Monorepo)
```

### 6.2 Khi nào nên nâng cấp kiến trúc?

| Tín hiệu | Mô tả | Đề xuất |
|------|------|------|
| Thời gian xây dựng > 5 phút | Dự án quá lớn | Chia tách code, Micro Frontend |
| Xung đột đa người thường xuyên | Khó hợp tác | Tổ chức theo chức năng, tách mô-đun |
| Sửa một chỗ hỏng nhiều chỗ | Liên kết chặt | Tái cấu trúc, tăng cường kiểm tra |
| Tải trang đầu > 3 giây | Vấn đề hiệu suất | Tải lười biếng, SSR, tối ưu hóa |
| Thành viên mới chậm làm quen | Cấu trúc hỗn loạn | Tài liệu, quy chuẩn, tái cấu trúc |

---

## 7. Tóm tắt

::: tip 💡 Ý tưởng cốt lõi
**Không có giải pháp tất cả trong một cho kiến trúc, cái phù hợp mới là tốt nhất.**

- **Dự án nhỏ** không nên quá thiết kế, HTML/CSS/JS là đủ
- **Dự án trung bình** thiết lập quy chuẩn, thành phần hóa, mô-đun hóa
- **Dự án lớn** xem xét Micro Frontend, tối ưu hóa hiệu suất, hợp tác nhóm

**Hãy nhớ những điểm này**:
1. **Tiến hóa dần dần**: bắt đầu từ đơn giản, phát triển theo nhu cầu
2. **Quy ước thống nhất**: đặt tên, cấu trúc, kiểu code giữ nhất quán
3. **Tài liệu trước tiên**: quyết định kiến trúc phải được ghi chép, tiện truyền thừa
4. **Tái cấu trúc định kỳ**: nợ kỹ thuật phải được trả kịp thời

**Mục tiêu cuối cùng**: làm cho code giống như một không gian được sắp xếp gọn gàng, bất kể kích thước, đều hoạt động hiệu quả.
:::

---

## Tài nguyên tham khảo

- [Vue Style Guide](https://vuejs.org/style-guide/)
- [React Project Structure Suggestions](https://react.dev/learn/thinking-in-react)
- [Bulletproof React - Architecture Guide](https://github.com/alan2207/bulletproof-react)
- [Feature Sliced Design](https://feature-sliced.design/)
- [Micro Frontend Architecture](https://micro-frontends.org/)
