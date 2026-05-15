<!--
  ApiGatewayDemo.vue
  Kiến trúc API Gateway - Cổng vào thống nhất / chuyển đổi protocol
-->
<template>
  <div class="api-gateway-demo">
    <div class="header">
      <div class="title">
        🚪 API Gateway: "Cổng chính thống nhất" của hệ thống
      </div>
      <div class="subtitle">
        Hãy hình dung như "lễ tân" của toà nhà văn phòng — mọi khách đến đều phải qua đây trước khi vào các phòng ban
      </div>
    </div>

    <div class="architecture-view">
      <div class="layer client-layer">
        <div class="layer-title">
          Client (Khách đến)
        </div>
        <div class="clients">
          <div class="client-item">
            📱 App
          </div>
          <div class="client-item">
            💻 Web
          </div>
          <div class="client-item">
            🔧 Bên thứ ba
          </div>
        </div>
      </div>

      <div class="arrow-down">
        ⬇️ Cổng vào thống nhất
      </div>

      <div class="layer gateway-layer">
        <div class="layer-title">
          🚪 API Gateway (Lễ tân)
        </div>
        <div class="gateway-box">
          <div
            class="gateway-function"
            :class="{ active: activeFunc === 'auth' }"
            @click="setActive('auth')"
          >
            <span class="func-icon">🔐</span>
            <span class="func-name">Xác thực</span>
          </div>
          <div
            class="gateway-function"
            :class="{ active: activeFunc === 'rate' }"
            @click="setActive('rate')"
          >
            <span class="func-icon">⚡</span>
            <span class="func-name">Rate limit & circuit break</span>
          </div>
          <div
            class="gateway-function"
            :class="{ active: activeFunc === 'route' }"
            @click="setActive('route')"
          >
            <span class="func-icon">🧭</span>
            <span class="func-name">Routing & forwarding</span>
          </div>
          <div
            class="gateway-function"
            :class="{ active: activeFunc === 'transform' }"
            @click="setActive('transform')"
          >
            <span class="func-icon">🔄</span>
            <span class="func-name">Chuyển đổi protocol</span>
          </div>
        </div>
      </div>

      <div class="arrow-down">
        ⬇️ Phân phối request
      </div>

      <div class="layer backend-layer">
        <div class="layer-title">
          ⚙️ Backend services (Các phòng ban)
        </div>
        <div class="services">
          <div class="service-card">
            <div class="service-icon">
              👤
            </div>
            <div class="service-name">
              Dịch vụ user
            </div>
            <div class="service-tech">
              /api/users
            </div>
          </div>
          <div class="service-card">
            <div class="service-icon">
              📦
            </div>
            <div class="service-name">
              Dịch vụ đơn hàng
            </div>
            <div class="service-tech">
              /api/orders
            </div>
          </div>
          <div class="service-card">
            <div class="service-icon">
              💳
            </div>
            <div class="service-name">
              Dịch vụ thanh toán
            </div>
            <div class="service-tech">
              /api/pay
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="activeFunc"
      class="function-detail"
    >
      <div class="detail-header">
        <span class="detail-icon">{{ currentFunction.icon }}</span>
        <span class="detail-name">{{ currentFunction.name }}</span>
      </div>
      <div class="detail-desc">
        {{ currentFunction.desc }}
      </div>
      <div class="detail-example">
        <div class="example-title">
          💡 Tình huống thực tế
        </div>
        <div class="example-content">
          {{ currentFunction.example }}
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">
        🤔 Khác biệt khi không có gateway vs có gateway
      </div>
      <table>
        <thead>
          <tr>
            <th>Nhu cầu</th>
            <th>Không có gateway (truy cập trực tiếp)</th>
            <th>Có API Gateway</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Xác thực</td>
            <td>Mỗi service phải tự viết check login</td>
            <td>✅ Thống nhất kiểm tra JWT ở tầng gateway</td>
          </tr>
          <tr>
            <td>Rate limit</td>
            <td>Mỗi service tự cài đặt rate limit</td>
            <td>✅ Gateway rate limit thống nhất, bảo vệ backend</td>
          </tr>
          <tr>
            <td>Chuyển đổi protocol</td>
            <td>HTTP, gRPC, WebSocket xử lý riêng</td>
            <td>✅ Gateway expose HTTP ra ngoài thống nhất</td>
          </tr>
          <tr>
            <td>Canary release</td>
            <td>Phải sửa cấu hình load balancer</td>
            <td>✅ Routing ở tầng gateway theo Header</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFunc = ref('auth')

const functions = {
  auth: {
    icon: '🔐',
    name: 'Xác thực',
    desc: 'Kiểm tra danh tính user thống nhất, không cần mỗi backend service tự viết logic login. Hỗ trợ JWT, OAuth2, API Key và nhiều phương thức khác.',
    example: 'Request của user mang theo JWT Token, gateway xác minh chữ ký và hạn token, hợp lệ thì thêm user ID vào header rồi forward sang backend service.'
  },
  rate: {
    icon: '⚡',
    name: 'Rate limit & circuit break',
    desc: 'Ngăn lưu lượng đột biến đè bẹp backend. Hỗ trợ thuật toán token bucket, leaky bucket, khi vượt ngưỡng sẽ tự động từ chối hoặc xếp hàng.',
    example: 'Đặt tối đa 1000 request mỗi giây, vượt ngưỡng trả 429 Too Many Requests, bảo vệ database backend không bị đè sập.'
  },
  route: {
    icon: '🧭',
    name: 'Routing & forwarding',
    desc: 'Dựa vào URL path, header request, Query param, v.v. để forward request sang các backend service khác nhau.',
    example: '/api/users → dịch vụ user, /api/orders → dịch vụ đơn hàng, /api/admin → dịch vụ quản trị (cần quyền admin).'
  },
  transform: {
    icon: '🔄',
    name: 'Chuyển đổi protocol',
    desc: 'Expose HTTP/HTTPS thống nhất ra ngoài, bên trong có thể chuyển thành gRPC, GraphQL, WebSocket, v.v.',
    example: 'Client gửi HTTP POST thông thường, gateway chuyển thành gRPC call đến microservice nội bộ, kết quả trả về lại chuyển thành JSON.'
  }
}

const currentFunction = computed(() => functions[activeFunc.value])

const setActive = (func) => {
  activeFunc.value = func
}
</script>

<style scoped>
.api-gateway-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.title {
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.5;
}

.mode-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.mode-btn {
  flex: 1;
  min-width: 200px;
  padding: 0.75rem 1rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  font-size: 0.9rem;
}

.mode-btn:hover {
  border-color: var(--vp-c-brand);
}

.mode-btn.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
}

.architecture-view {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.layer {
  margin-bottom: 1rem;
}

.layer-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.clients {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.client-item {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border: 2px solid #3b82f6;
  border-radius: 10px;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.arrow-down {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  margin: 0.5rem 0;
  font-weight: 600;
}

.gateway-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.gateway-function {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.gateway-function:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.gateway-function.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.2);
}

.func-icon {
  font-size: 1.5rem;
}

.func-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.services {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.service-card {
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
  border: 2px solid #a855f7;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  text-align: center;
  min-width: 100px;
}

.service-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.service-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.service-tech {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.function-detail {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-name {
  font-weight: 700;
  font-size: 1.1rem;
}

.detail-desc {
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.detail-example {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.example-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.example-content {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.table-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

th {
  font-weight: 600;
  background: var(--vp-c-bg-soft);
}

@media (max-width: 768px) {
  .gateway-box {
    grid-template-columns: 1fr;
  }

  table {
    font-size: 0.8rem;
  }

  th, td {
    padding: 0.5rem;
  }
}
</style>
