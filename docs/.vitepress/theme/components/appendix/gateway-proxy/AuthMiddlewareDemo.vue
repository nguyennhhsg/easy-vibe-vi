<!--
  AuthMiddlewareDemo.vue
  Middleware xác thực - JWT/OAuth/xác thực chữ ký
-->
<template>
  <div class="auth-middleware-demo">
    <div class="header">
      <div class="title">
        🔐 Middleware xác thực: Ai được vào cổng?
      </div>
      <div class="subtitle">
        Hãy hình dung như kiểm soát ra vào toà nhà văn phòng — kiểm tra thẻ, xác minh danh tính, không có quyền không vào được
      </div>
    </div>

    <div class="auth-tabs">
      <button
        v-for="method in authMethods"
        :key="method.id"
        :class="['auth-tab', { active: currentAuth === method.id }]"
        @click="currentAuth = method.id"
      >
        <span class="tab-icon">{{ method.icon }}</span>
        <span class="tab-name">{{ method.name }}</span>
      </button>
    </div>

    <div class="auth-flow">
      <div class="flow-title">
        {{ currentAuthData.title }}
      </div>

      <div class="flow-diagram">
        <div
          v-for="(step, index) in currentAuthData.steps"
          :key="index"
          class="flow-step"
        >
          <div class="step-number">
            {{ index + 1 }}
          </div>
          <div class="step-content">
            <div class="step-actor">
              {{ step.actor }}
            </div>
            <div class="step-action">
              {{ step.action }}
            </div>
            <div
              v-if="index < currentAuthData.steps.length - 1"
              class="step-arrow"
            >
              ↓
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="currentAuth === 'jwt'"
        class="token-display"
      >
        <div class="token-header">
          🔑 Cấu trúc JWT Token (mã hoá Base64)
        </div>
        <div class="token-parts">
          <div class="token-part header">
            <div class="part-label">
              HEADER
            </div>
            <div class="part-content">
              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
            </div>
            <div class="part-decoded">
              { "alg": "HS256", "typ": "JWT" }
            </div>
          </div>
          <div class="token-separator">
            .
          </div>
          <div class="token-part payload">
            <div class="part-label">
              PAYLOAD
            </div>
            <div class="part-content">
              eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
            </div>
            <div class="part-decoded">
              { "sub": "1234567890", "name": "John Doe", "iat": 1516239022 }
            </div>
          </div>
          <div class="token-separator">
            .
          </div>
          <div class="token-part signature">
            <div class="part-label">
              SIGNATURE
            </div>
            <div class="part-content">
              SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
            </div>
            <div class="part-decoded">
              HMACSHA256(base64Url(header) + "." + base64Url(payload), secret)
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="implementation-comparison">
      <div class="section-title">
        🛠️ So sánh ba phương án triển khai
      </div>

      <table class="comparison-table">
        <thead>
          <tr>
            <th>Tiêu chí so sánh</th>
            <th>Session + Cookie</th>
            <th>JWT</th>
            <th>OAuth2.0</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="dim">
              Vị trí lưu trữ
            </td>
            <td>Server lưu Session, client lưu Cookie</td>
            <td>Client lưu Token, server stateless</td>
            <td>Authorization server lưu, client lưu Access Token</td>
          </tr>
          <tr>
            <td class="dim">
              Khả năng mở rộng
            </td>
            <td>❌ Cần share Session, scale phức tạp</td>
            <td>✅ Stateless, dễ scale ngang</td>
            <td>✅ Kiến trúc phân tán, hỗ trợ hệ thống lớn</td>
          </tr>
          <tr>
            <td class="dim">
              Bảo mật
            </td>
            <td>⚠️ Cookie có thể bị trộm, cần phòng CSRF</td>
            <td>⚠️ Rủi ro lộ Token, cần HTTPS + ngắn hạn</td>
            <td>✅ Best practice của ngành, hỗ trợ nhiều cơ chế</td>
          </tr>
          <tr>
            <td class="dim">
              Độ phức tạp khi triển khai
            </td>
            <td>🟢 Đơn giản, dùng được ngay</td>
            <td>🟡 Trung bình, cần quản lý Token</td>
            <td>🔴 Phức tạp, cần authorization server</td>
          </tr>
          <tr>
            <td class="dim">
              Tình huống áp dụng
            </td>
            <td>Web app truyền thống, hệ thống quản trị</td>
            <td>SPA, API mobile, microservices</td>
            <td>Login bằng tài khoản bên thứ ba, open platform, SSO</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="security-tips">
      <div class="tips-title">
        🔒 Best practice xác thực tại tầng gateway
      </div>
      <div class="tips-list">
        <div class="tip-item">
          <div class="tip-icon">
            1
          </div>
          <div class="tip-content">
            <div class="tip-heading">
              Xác thực thống nhất ở tầng gateway
            </div>
            <div class="tip-desc">
              Đừng viết lại logic xác thực ở mỗi microservice, hãy thống nhất kiểm tra JWT hoặc Session ở tầng gateway
            </div>
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-icon">
            2
          </div>
          <div class="tip-content">
            <div class="tip-heading">
              Bắt buộc HTTPS
            </div>
            <div class="tip-desc">
              Tầng gateway bắt buộc HTTPS, tránh Token bị đánh cắp trên đường truyền (man-in-the-middle)
            </div>
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-icon">
            3
          </div>
          <div class="tip-content">
            <div class="tip-heading">
              Chiến lược hết hạn Token
            </div>
            <div class="tip-desc">
              Access Token ngắn hạn (15 phút), kết hợp Refresh Token để gia hạn liền mạch không phiền user
            </div>
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-icon">
            4
          </div>
          <div class="tip-content">
            <div class="tip-heading">
              Cơ chế blacklist
            </div>
            <div class="tip-desc">
              Khi user logout hoặc Token bị lộ, đưa Token vào blacklist (lưu trong Redis)
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentAuth = ref('jwt')

const authMethods = [
  {
    id: 'jwt',
    icon: '🔑',
    name: 'JWT Token'
  },
  {
    id: 'oauth',
    icon: '🔐',
    name: 'OAuth 2.0'
  },
  {
    id: 'signature',
    icon: '✍️',
    name: 'Xác thực chữ ký'
  }
]

const authData = {
  jwt: {
    title: 'Luồng xác thực JWT (JSON Web Token)',
    steps: [
      { actor: 'User', action: 'Nhập username/password, click đăng nhập' },
      { actor: 'Gateway/Nginx', action: 'Forward request đăng nhập sang dịch vụ xác thực' },
      { actor: 'Dịch vụ xác thực', action: 'Xác minh mật khẩu, sinh JWT Token (gồm Header, Payload, Signature)' },
      { actor: 'User/Client', action: 'Lưu Token (LocalStorage hoặc Cookie)' },
      { actor: 'Các request sau', action: 'Mang theo trong HTTP Header: Authorization: Bearer <Token>' },
      { actor: 'Gateway/Nginx', action: 'Xác minh chữ ký Token và hạn dùng, hợp lệ thì forward request' },
      { actor: 'Backend service', action: 'Đọc thông tin user từ Token, xử lý business logic' }
    ]
  },
  oauth: {
    title: 'Luồng đăng nhập OAuth 2.0 bên thứ ba (ví dụ login bằng Google)',
    steps: [
      { actor: 'User', action: 'Click nút "Đăng nhập bằng Google"' },
      { actor: 'Ứng dụng của chúng ta', action: 'Redirect tới trang authorize của Google, mang theo client_id và callback URL' },
      { actor: 'Google/Authorization server', action: 'Hiển thị trang authorize, hỏi user có đồng ý không' },
      { actor: 'User', action: 'Xác nhận uỷ quyền (hoặc quét mã đăng nhập)' },
      { actor: 'Google/Authorization server', action: 'Redirect về ứng dụng của chúng ta, mang theo authorization code' },
      { actor: 'Backend của chúng ta', action: 'Dùng code đổi lấy Access Token (client không nhìn thấy)' },
      { actor: 'Backend của chúng ta', action: 'Dùng Access Token gọi user info service của Google' },
      { actor: 'Google/Resource server', action: 'Trả về thông tin user cơ bản (openid, nickname, avatar)' },
      { actor: 'Backend của chúng ta', action: 'Tạo/liên kết user local, sinh Session/JWT của riêng mình' },
      { actor: 'User', action: 'Đăng nhập thành công, vào trang chủ ứng dụng' }
    ]
  },
  signature: {
    title: 'Luồng xác thực chữ ký API (dùng nhiều cho open platform và API thanh toán)',
    steps: [
      { actor: 'Developer', action: 'Đăng ký AppKey và AppSecret trên open platform' },
      { actor: 'Trước khi gửi request', action: 'Sắp xếp các tham số theo thứ tự từ điển, nối thành chuỗi' },
      { actor: 'Client', action: 'Dùng AppSecret để ký HMAC-SHA256 lên chuỗi' },
      { actor: 'Tham số request', action: 'Mang theo AppKey, chữ ký (Sign), timestamp, nonce' },
      { actor: 'Gateway/Nginx', action: 'Lấy AppKey, tra ra AppSecret tương ứng' },
      { actor: 'Gateway/Nginx', action: 'Dùng cùng thuật toán tính chữ ký, so sánh xem có khớp không' },
      { actor: 'Gateway/Nginx', action: 'Kiểm tra timestamp (chống replay attack, thường có hiệu lực trong 5 phút)' },
      { actor: 'Gateway/Nginx', action: 'Kiểm tra nonce đã được dùng chưa (Redis lưu để chống replay)' },
      { actor: 'Xác thực OK', action: 'Forward request sang backend service' },
      { actor: 'Xác thực fail', action: 'Trả 401/403, không lộ chi tiết thuật toán chữ ký' }
    ]
  }
}

const currentAuthData = computed(() => authData[currentAuth.value])

// Dữ liệu so sánh
const comparisonData = [
  {
    dimension: 'Vị trí lưu trữ',
    session: 'Server lưu Session, client lưu Cookie',
    jwt: 'Client lưu Token, server stateless',
    oauth: 'Authorization server lưu, client lưu Access Token'
  },
  {
    dimension: 'Khả năng mở rộng',
    session: '❌ Cần share Session, scale phức tạp',
    jwt: '✅ Stateless, dễ scale ngang',
    oauth: '✅ Kiến trúc phân tán, hỗ trợ hệ thống lớn'
  },
  {
    dimension: 'Bảo mật',
    session: '⚠️ Cookie có thể bị trộm, cần phòng CSRF',
    jwt: '⚠️ Rủi ro lộ Token, cần HTTPS + ngắn hạn',
    oauth: '✅ Best practice của ngành, hỗ trợ nhiều cơ chế'
  },
  {
    dimension: 'Độ phức tạp khi triển khai',
    session: '🟢 Đơn giản, dùng được ngay',
    jwt: '🟡 Trung bình, cần quản lý Token',
    oauth: '🔴 Phức tạp, cần authorization server'
  },
  {
    dimension: 'Tình huống áp dụng',
    session: 'Web app truyền thống, hệ thống quản trị',
    jwt: 'SPA, API mobile, microservices',
    oauth: 'Login bằng tài khoản bên thứ ba, open platform, SSO'
  }
]

// Ví dụ cấu hình Nginx
const nginxConfigs = [
  {
    id: 'basic',
    name: 'Rate limit cơ bản',
    config: `# Định nghĩa zone rate limit
# $binary_remote_addr: rate limit theo IP
# zone=mylimit:10m: tên và kích thước zone
# rate=10r/s: tối đa 10 request mỗi giây
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

server {
    listen 80;
    server_name api.example.com;

    location / {
        # Áp rate limit
        # burst=20: dung lượng bucket, cho phép 20 request burst
        # nodelay: không delay request burst
        limit_req zone=mylimit burst=20 nodelay;

        proxy_pass http://backend;
    }
}`,
    explanation: [
      'limit_req_zone: định nghĩa zone rate limit trong khối http',
      '$binary_remote_addr: dùng IP nhị phân làm key rate limit (tiết kiệm memory)',
      'zone=mylimit:10m: zone tên mylimit, cấp 10MB memory',
      'rate=10r/s: cho phép 10 request mỗi giây (thuật toán leaky bucket)',
      'burst=20: bucket có dung lượng 20, cho phép một mức burst nhất định',
      'nodelay: không delay request burst (xử lý ngay hoặc từ chối ngay)'
    ]
  },
  {
    id: 'connection',
    name: 'Giới hạn số connection',
    config: `# Giới hạn số connection đồng thời
# zone=addr:10m: zone tên addr, kích thước 10MB
limit_conn_zone $binary_remote_addr zone=addr:10m;

server {
    listen 80;
    server_name download.example.com;

    location / {
        # Mỗi IP tối đa 5 connection đồng thời
        limit_conn addr 5;

        # Áp luôn rate limit: 1 request mỗi giây
        limit_req zone=mylimit rate=1r/s;

        proxy_pass http://fileserver;
    }
}`,
    explanation: [
      'limit_conn_zone: định nghĩa zone giới hạn connection',
      'limit_conn addr 5: mỗi IP giữ tối đa 5 connection đồng thời',
      'Phù hợp cho download file, video streaming và các long connection khác',
      'Có thể dùng cùng limit_req (bảo vệ kép)',
      'Vượt giới hạn connection sẽ trả 503 Service Unavailable'
    ]
  },
  {
    id: 'whiteblack',
    name: 'Whitelist & blacklist',
    config: `# Kết hợp whitelist + rate limit
# IP nội bộ công ty không bị rate limit
geo $limit {
    default 1;
    10.0.0.0/8 0;     # Dải IP nội bộ
    172.16.0.0/12 0;  # Dải IP nội bộ
    192.168.0.0/16 0; # Dải IP nội bộ
}

map $limit $limit_key {
    0 "";
    1 $binary_remote_addr;
}

# Chỉ IP bên ngoài mới bị rate limit
limit_req_zone $limit_key zone=sensitive:10m rate=1r/s;

server {
    listen 80;
    server_name api.example.com;

    location /admin {
        # Rate limit nghiêm ngặt cho admin panel
        limit_req zone=sensitive burst=5 nodelay;

        # Chặn IP cụ thể
        deny 1.2.3.4;
        deny 5.6.7.8;

        proxy_pass http://backend;
    }
}`,
    explanation: [
      'Module geo: gán giá trị biến theo địa chỉ IP',
      'IP nội bộ đặt là 0, IP bên ngoài mặc định là 1',
      'Module map: map 0 thành chuỗi rỗng (không rate limit), 1 thành IP',
      'Chỉ IP bên ngoài bị rate limit, truy cập nội bộ thông suốt',
      'Lệnh deny: chặn thẳng IP cụ thể',
      'Phù hợp bảo vệ admin panel, API nhạy cảm'
    ]
  }
]

const currentNginxConfig = computed(() => nginxConfigs.find(c => c.id === currentAuth.value))
</script>

<style scoped>
.auth-middleware-demo {
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
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.auth-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.auth-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.auth-tab:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.auth-tab.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.2);
}

.tab-icon {
  font-size: 2rem;
}

.tab-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.auth-flow {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.flow-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.flow-step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-number {
  width: 32px;
  height: 32px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.step-actor {
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
}

.step-action {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.5;
}

.step-arrow {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  margin: 0.25rem 0;
}

.token-display {
  margin-top: 1.5rem;
  background: #1a1a2e;
  border-radius: 12px;
  padding: 1.5rem;
  color: #eaeaea;
}

.token-header {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #ffd700;
}

.token-parts {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.token-part {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 0.75rem;
}

.part-label {
  font-weight: 700;
  font-size: 0.75rem;
  color: #ffd700;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
}

.part-content {
  font-family: monospace;
  font-size: 0.8rem;
  color: #a78bfa;
  word-break: break-all;
  margin-bottom: 0.5rem;
}

.part-decoded {
  font-family: monospace;
  font-size: 0.75rem;
  color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
  padding: 0.5rem;
  border-radius: 4px;
}

.token-separator {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd700;
}

.implementation-comparison {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.section-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.comparison-table th,
.comparison-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
  vertical-align: top;
}

.comparison-table th {
  font-weight: 600;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.comparison-table td.dim {
  font-weight: 600;
  background: var(--vp-c-bg-soft);
  white-space: nowrap;
}

.security-tips {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
  border: 2px solid #22c55e;
  border-radius: 12px;
  padding: 1.5rem;
}

.tips-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #15803d;
  text-align: center;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tip-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: white;
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid #22c55e;
}

.tip-icon {
  width: 32px;
  height: 32px;
  background: #22c55e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
}

.tip-heading {
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-1);
}

.tip-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .auth-tabs {
    grid-template-columns: 1fr;
  }

  .flow-step {
    flex-direction: column;
    gap: 0.5rem;
  }

  .step-content {
    width: 100%;
  }

  .token-parts {
    font-size: 0.75rem;
  }

  .comparison-table {
    font-size: 0.75rem;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 0.5rem;
  }
}
</style>
