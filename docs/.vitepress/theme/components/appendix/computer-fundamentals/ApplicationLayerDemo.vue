<template>
  <div class="application-layer-demo">
    <div class="demo-header">
      <span class="title">Tầng ứng dụng: các giao thức phục vụ bạn</span>
      <span class="subtitle">HTTP, DNS, DHCP và các giao thức khác hoạt động như thế nào</span>
    </div>

    <div class="protocol-gallery">
      <div
        v-for="protocol in protocols"
        :key="protocol.id"
        :class="['protocol-card', { active: activeProtocol === protocol.id }]"
        @click="activeProtocol = protocol.id"
      >
        <div class="card-icon">{{ protocol.icon }}</div>
        <div class="card-name">{{ protocol.name }}</div>
        <div class="card-desc">{{ protocol.desc }}</div>
      </div>
    </div>

    <!-- Chi tiết giao thức -->
    <div class="protocol-detail">
      <div class="detail-header">
        <span class="detail-icon">{{ currentProtocol.icon }}</span>
        <span class="detail-title">Giao thức {{ currentProtocol.name }}</span>
      </div>

      <div class="detail-content">
        <div class="detail-section">
          <div class="section-title">Vai trò</div>
          <div class="section-text">{{ currentProtocol.purpose }}</div>
        </div>

        <div class="detail-section">
          <div class="section-title">Nguyên lý hoạt động</div>
          <div class="section-steps">
            <div
              v-for="(step, index) in currentProtocol.steps"
              :key="index"
              class="step-item"
            >
              <span class="step-num">{{ index + 1 }}</span>
              <span class="step-text">{{ step }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">Ứng dụng thường ngày</div>
          <div class="app-list">
            <div
              v-for="(app, index) in currentProtocol.apps"
              :key="index"
              class="app-tag"
            >
              {{ app.icon }} {{ app.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ví dụ HTTP request/response -->
    <div v-if="activeProtocol === 'http'" class="http-example">
      <div class="example-title">Ví dụ HTTP Request/Response</div>
      <div class="example-content">
        <div class="request-response">
          <div class="request-box">
            <div class="box-header">📤 Yêu cầu (Request)</div>
            <div class="box-body">
              <div class="line method">GET /index.html HTTP/1.1</div>
              <div class="line header">Host: www.example.com</div>
              <div class="line header">User-Agent: Mozilla/5.0</div>
              <div class="line header">Accept: text/html</div>
            </div>
          </div>

          <div class="arrow">→</div>

          <div class="response-box">
            <div class="box-header">📥 Phản hồi (Response)</div>
            <div class="box-body">
              <div class="line status">HTTP/1.1 200 OK</div>
              <div class="line header">Content-Type: text/html</div>
              <div class="line header">Content-Length: 1234</div>
              <div class="line empty"></div>
              <div class="line body">&lt;html&gt;...&lt;/html&gt;</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ví dụ truy vấn DNS -->
    <div v-if="activeProtocol === 'dns'" class="dns-example">
      <div class="example-title">Quá trình truy vấn DNS</div>
      <div class="dns-flow">
        <div class="flow-step">
          <div class="step-icon">💻</div>
          <div class="step-text">Người dùng nhập www.example.com</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">
          <div class="step-icon">🔍</div>
          <div class="step-text">Truy vấn máy chủ DNS</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">
          <div class="step-icon">📍</div>
          <div class="step-text">Trả về IP: 93.184.216.34</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeProtocol = ref('http')

const protocols = [
  {
    id: 'http',
    name: 'HTTP',
    icon: '🌐',
    desc: 'Nền tảng cho duyệt web'
  },
  {
    id: 'https',
    name: 'HTTPS',
    icon: '🔐',
    desc: 'Kết nối an toàn được mã hóa'
  },
  {
    id: 'dns',
    name: 'DNS',
    icon: '🔍',
    desc: 'Dịch vụ phân giải tên miền'
  },
  {
    id: 'dhcp',
    name: 'DHCP',
    icon: '📡',
    desc: 'Tự động cấp phát địa chỉ IP'
  },
  {
    id: 'smtp',
    name: 'SMTP',
    icon: '📧',
    desc: 'Gửi email'
  },
  {
    id: 'ftp',
    name: 'FTP',
    icon: '📁',
    desc: 'Truyền tệp'
  }
]

const protocolDetails = {
  http: {
    name: 'HTTP',
    icon: '🌐',
    purpose: 'Giao thức truyền siêu văn bản, dùng để truyền dữ liệu trang web giữa trình duyệt và máy chủ',
    steps: [
      'Trình duyệt gửi yêu cầu HTTP',
      'Máy chủ nhận và xử lý yêu cầu',
      'Máy chủ trả về phản hồi HTTP',
      'Trình duyệt phân tích và hiển thị trang web'
    ],
    apps: [
      { icon: '🌍', name: 'Duyệt web' },
      { icon: '📱', name: 'API ứng dụng di động' },
      { icon: '🔌', name: 'Dịch vụ RESTful' }
    ]
  },
  https: {
    name: 'HTTPS',
    icon: '🔐',
    purpose: 'HTTP Secure, bổ sung lớp mã hóa SSL/TLS trên nền HTTP',
    steps: [
      'Client yêu cầu kết nối HTTPS',
      'Máy chủ gửi chứng chỉ số',
      'Client xác thực chứng chỉ và sinh khóa phiên',
      'Truyền dữ liệu qua kênh đã mã hóa'
    ],
    apps: [
      { icon: '🏦', name: 'Ngân hàng trực tuyến' },
      { icon: '🛒', name: 'Thanh toán online' },
      { icon: '🔑', name: 'Xác thực đăng nhập' }
    ]
  },
  dns: {
    name: 'DNS',
    icon: '🔍',
    purpose: 'Hệ thống tên miền, chuyển tên miền dễ đọc cho người thành địa chỉ IP máy đọc được',
    steps: [
      'Người dùng nhập tên miền',
      'Truy vấn DNS cache cục bộ',
      'Nếu cache miss, truy vấn máy chủ DNS',
      'Trả về địa chỉ IP tương ứng'
    ],
    apps: [
      { icon: '🌐', name: 'Truy cập địa chỉ web' },
      { icon: '📧', name: 'Máy chủ email' },
      { icon: '🎮', name: 'Kết nối game' }
    ]
  },
  dhcp: {
    name: 'DHCP',
    icon: '📡',
    purpose: 'Giao thức cấu hình host động, tự động cấp địa chỉ IP và cấu hình mạng cho thiết bị',
    steps: [
      'Thiết bị gửi DHCP Discover',
      'Máy chủ DHCP gửi Offer',
      'Thiết bị gửi Request',
      'Máy chủ gửi ACK, hoàn tất cấp phát'
    ],
    apps: [
      { icon: '📱', name: 'Điện thoại kết nối WiFi' },
      { icon: '💻', name: 'Máy tính vào mạng' },
      { icon: '🏠', name: 'Mạng gia đình' }
    ]
  },
  smtp: {
    name: 'SMTP',
    icon: '📧',
    purpose: 'Giao thức truyền email đơn giản, dùng để gửi thư điện tử',
    steps: [
      'Email client kết nối máy chủ SMTP',
      'Xác thực danh tính người gửi',
      'Truyền nội dung email và tệp đính kèm',
      'Máy chủ chuyển email tới máy chủ của người nhận'
    ],
    apps: [
      { icon: '📬', name: 'Gửi email' },
      { icon: '🔔', name: 'Thông báo email' },
      { icon: '📋', name: 'Mailing list' }
    ]
  },
  ftp: {
    name: 'FTP',
    icon: '📁',
    purpose: 'Giao thức truyền file, dùng để truyền file qua mạng',
    steps: [
      'Client tạo kết nối điều khiển FTP',
      'Xác thực người dùng (username, mật khẩu)',
      'Thiết lập kết nối dữ liệu để truyền file',
      'Đóng kết nối sau khi truyền xong'
    ],
    apps: [
      { icon: '⬆️', name: 'Tải tệp lên' },
      { icon: '⬇️', name: 'Tải tệp xuống' },
      { icon: '📂', name: 'Quản lý tệp' }
    ]
  }
}

const currentProtocol = computed(() => protocolDetails[activeProtocol.value])
</script>

<style scoped>
.application-layer-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .title {
  font-weight: 700;
  font-size: 1.1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.protocol-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.protocol-card {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.protocol-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-3px);
}

.protocol-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.card-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
}

.card-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.protocol-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section {
}

.section-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.section-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.section-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.step-item {
  display: flex;
  gap: 0.75rem;
  align-items: start;
}

.step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-text {
  font-size: 0.85rem;
  line-height: 1.5;
  padding-top: 0.15rem;
}

.app-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.app-tag {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 0.85rem;
}

.http-example,
.dns-example {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.example-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.request-response {
  display: flex;
  align-items: stretch;
  gap: 1rem;
}

.request-box,
.response-box {
  flex: 1;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.box-header {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}

.box-body {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  line-height: 1.6;
}

.line {
  padding: 0.25rem 0;
}

.line.method {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.line.status {
  color: #10b981;
  font-weight: 600;
}

.line.header {
  color: var(--vp-c-text-2);
}

.line.body {
  color: var(--vp-c-text-1);
}

.arrow {
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: var(--vp-c-brand);
}

.dns-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.flow-step {
  flex: 1;
  min-width: 150px;
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.step-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.step-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.flow-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .request-response {
    flex-direction: column;
  }

  .arrow {
    transform: rotate(90deg);
  }
}
</style>
