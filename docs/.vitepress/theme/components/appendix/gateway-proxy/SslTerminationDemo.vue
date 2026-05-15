<!--
  SslTerminationDemo.vue
  SSL termination - HTTPS offload / quản lý chứng chỉ
-->
<template>
  <div class="ssl-termination-demo">
    <div class="header">
      <div class="title">
        🔒 SSL termination: "Người giải mã" luồng HTTPS
      </div>
      <div class="subtitle">
        Hãy hình dung như lễ tân công ty — đối ngoại dùng danh xưng chính thức (HTTPS), đối nội dùng cách gọi nội bộ (HTTP), kiêm nhiệm "dịch" danh tính
      </div>
    </div>

    <div class="ssl-flow">
      <div class="flow-title">
        🔐 Luồng giải mã traffic HTTPS
      </div>

      <div class="flow-diagram">
        <!-- Client -->
        <div class="flow-node client">
          <div class="node-icon">
            👤
          </div>
          <div class="node-label">
            Client (browser)
          </div>
          <div class="node-detail">
            Gửi request HTTPS
          </div>
        </div>

        <div class="flow-arrow encrypted">
          <div class="arrow-line" />
          <div class="arrow-label">
            <span class="lock-icon">🔒</span>
            <span>Kết nối mã hoá TLS</span>
          </div>
          <div class="cert-info">
            <div class="cert-item">
              <span class="cert-label">Cert:</span> *.example.com
            </div>
            <div class="cert-item">
              <span class="cert-label">Giao thức:</span> TLS 1.3
            </div>
            <div class="cert-item">
              <span class="cert-label">Mã hoá:</span> AES-256-GCM
            </div>
          </div>
        </div>

        <!-- Nginx -->
        <div class="flow-node nginx">
          <div class="node-icon">
            🚪
          </div>
          <div class="node-label">
            Nginx (SSL termination)
          </div>
          <div class="node-actions">
            <div class="action">
              <span class="action-icon">📜</span> Xác minh chứng chỉ
            </div>
            <div class="action">
              <span class="action-icon">🔓</span> Giải mã traffic
            </div>
            <div class="action">
              <span class="action-icon">📝</span> Thêm X-Forwarded-*
            </div>
          </div>
        </div>

        <div class="flow-arrow plain">
          <div class="arrow-line" />
          <div class="arrow-label">
            <span class="unlock-icon">🔓</span>
            <span>HTTP plaintext</span>
          </div>
          <div class="headers-info">
            <div class="header-item">
              X-Forwarded-For: 203.0.113.42
            </div>
            <div class="header-item">
              X-Forwarded-Proto: https
            </div>
            <div class="header-item">
              X-Real-IP: 203.0.113.42
            </div>
          </div>
        </div>

        <!-- Backend service -->
        <div class="flow-node backend">
          <div class="node-icon">
            ⚙️
          </div>
          <div class="node-label">
            Cluster backend service
          </div>
          <div class="node-detail">
            Chỉ tập trung business logic, không cần xử lý TLS
          </div>
        </div>
      </div>
    </div>

    <div class="cert-management">
      <div class="section-title">
        📜 Quản lý chứng chỉ SSL
      </div>

      <div class="cert-tabs">
        <button
          v-for="tab in certTabs"
          :key="tab.id"
          :class="['cert-tab', { active: currentCertTab === tab.id }]"
          @click="currentCertTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>

      <div class="cert-content">
        <!-- Luồng xin chứng chỉ -->
        <div
          v-if="currentCertTab === 'apply'"
          class="apply-flow"
        >
          <div class="flow-steps">
            <div
              v-for="(step, index) in certSteps"
              :key="index"
              class="cert-step"
            >
              <div class="step-badge">
                {{ index + 1 }}
              </div>
              <div class="step-content">
                <div class="step-title">
                  {{ step.title }}
                </div>
                <div class="step-desc">
                  {{ step.desc }}
                </div>
                <div
                  v-if="step.command"
                  class="step-command"
                >
                  <code>{{ step.command }}</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cấu hình Nginx -->
        <div
          v-if="currentCertTab === 'config'"
          class="nginx-config"
        >
          <pre class="config-block"><code>server {
    listen 443 ssl http2;
    server_name api.example.com;

    # Cấu hình chứng chỉ SSL
    ssl_certificate /etc/nginx/ssl/api.example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/api.example.com.key;

    # Giao thức SSL và bộ mã hoá
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # Cache session SSL
    ssl_session_cache shared:SSL:50m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_trusted_certificate /etc/nginx/ssl/chain.crt;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;

    # Header bảo mật response
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Redirect HTTP sang HTTPS
server {
    listen 80;
    server_name api.example.com;
    return 301 https://$server_name$request_uri;
}</code></pre>
        </div>

        <!-- Best practice -->
        <div
          v-if="currentCertTab === 'bestpractice'"
          class="best-practices"
        >
          <div class="practices-grid">
            <div
              v-for="practice in bestPractices"
              :key="practice.id"
              class="practice-card"
            >
              <div class="practice-header">
                <span class="practice-icon">{{ practice.icon }}</span>
                <span class="practice-title">{{ practice.title }}</span>
              </div>
              <div class="practice-content">
                {{ practice.content }}
              </div>
              <div
                v-if="practice.code"
                class="practice-code"
              >
                <code>{{ practice.code }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="benefits-section">
      <div class="section-title">
        ✨ Ưu điểm cốt lõi của SSL termination
      </div>

      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">
            🚀
          </div>
          <div class="benefit-title">
            Tăng hiệu năng
          </div>
          <div class="benefit-desc">
            TLS handshake và mã hoá/giải mã đều ngốn CPU, gom về Nginx xử lý, backend chỉ tập trung business logic, throughput tổng thể tăng 2-5 lần
          </div>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            🔧
          </div>
          <div class="benefit-title">
            Đơn giản vận hành
          </div>
          <div class="benefit-desc">
            Chứng chỉ quản lý thống nhất, chỉ cần cấu hình một lần ở Nginx, không phải lặp lại ở mỗi backend service, gia hạn và thay chứng chỉ làm trong một phát
          </div>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            🛡️
          </div>
          <div class="benefit-title">
            Bảo mật tập trung
          </div>
          <div class="benefit-desc">
            Cấu hình SSL/TLS quản lý thống nhất, bắt buộc dùng giao thức và cipher suite mới nhất, thêm header bảo mật (HSTS, CSP, v.v.) thống nhất
          </div>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            📊
          </div>
          <div class="benefit-title">
            Monitor thống nhất
          </div>
          <div class="benefit-desc">
            Mọi traffic HTTPS đều qua Nginx, có thể ghi access log, phân tích hiệu năng TLS handshake, giám sát hạn chứng chỉ, dễ audit và troubleshoot
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Tab quản lý chứng chỉ
const certTabs = [
  { id: 'apply', name: 'Xin chứng chỉ' },
  { id: 'config', name: 'Cấu hình Nginx' },
  { id: 'bestpractice', name: 'Best practice' }
]

const currentCertTab = ref('apply')

// Các bước xin chứng chỉ
const certSteps = [
  {
    title: 'Sinh private key',
    desc: 'Dùng OpenSSL sinh RSA private key, đây là nền tảng của chứng chỉ',
    command: 'openssl genrsa -out private.key 2048'
  },
  {
    title: 'Tạo CSR',
    desc: 'Sinh certificate signing request, bao gồm domain và thông tin tổ chức',
    command: 'openssl req -new -key private.key -out csr.pem'
  },
  {
    title: 'Xác minh domain',
    desc: 'CA xác minh quyền sở hữu domain (DNS record hoặc file HTTP)',
    command: '# Thêm DNS TXT record hoặc upload file xác minh tới /.well-known/'
  },
  {
    title: 'Cấp chứng chỉ',
    desc: 'Sau khi xác minh OK, CA cấp file chứng chỉ',
    command: '# Tải certificate.crt và chain.crt'
  },
  {
    title: 'Deploy cấu hình',
    desc: 'Cấu hình chứng chỉ vào Nginx và test',
    command: 'nginx -t && systemctl reload nginx'
  }
]

// Best practice
const bestPractices = [
  {
    id: 'protocol',
    icon: '🔐',
    title: 'Dùng TLS 1.2+',
    content: 'Tắt SSLv3, TLS 1.0/1.1 và các giao thức cũ, chỉ bật TLS 1.2 và 1.3',
    code: 'ssl_protocols TLSv1.2 TLSv1.3;'
  },
  {
    id: 'cipher',
    icon: '🛡️',
    title: 'Cipher suite mạnh',
    content: 'Tắt thuật toán mã hoá yếu, ưu tiên ECDHE và AES-GCM',
    code: 'ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;'
  },
  {
    id: 'hsts',
    icon: '🔒',
    title: 'Header HSTS',
    content: 'Bắt browser luôn dùng HTTPS, phòng chống SSL stripping',
    code: 'add_header Strict-Transport-Security "max-age=63072000" always;'
  },
  {
    id: 'ocsp',
    icon: '✅',
    title: 'OCSP Stapling',
    content: 'Bật OCSP stapling để tăng tốc SSL handshake và bảo vệ quyền riêng tư user',
    code: 'ssl_stapling on; ssl_stapling_verify on;'
  }
]
</script>

<style scoped>
.ssl-termination-demo {
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

.ssl-flow {
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
  gap: 1rem;
}

.flow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  text-align: center;
}

.flow-node.client {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
}

.flow-node.nginx {
  border-color: #22c55e;
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
}

.flow-node.backend {
  border-color: #8b5cf6;
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
}

.node-icon {
  font-size: 2rem;
}

.node-label {
  font-weight: 700;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.node-detail {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.node-actions {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.action {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.action-icon {
  font-size: 0.9rem;
}

.flow-arrow {
  position: relative;
  padding: 0.5rem 0;
}

.arrow-line {
  height: 2px;
  background: var(--vp-c-divider);
  position: relative;
}

.arrow-line::after {
  content: '▼';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--vp-c-divider);
  font-size: 0.75rem;
}

.flow-arrow.encrypted .arrow-line {
  background: linear-gradient(90deg, #22c55e, #3b82f6);
  height: 3px;
}

.flow-arrow.encrypted .arrow-line::after {
  color: #22c55e;
}

.arrow-label {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-bg);
  padding: 0 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
}

.lock-icon {
  color: #22c55e;
}

.unlock-icon {
  color: #f59e0b;
}

.cert-info,
.headers-info {
  position: absolute;
  top: 15px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
  font-size: 0.7rem;
  font-family: monospace;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  z-index: 10;
}

.cert-info {
  left: 0;
}

.headers-info {
  right: 0;
}

.cert-item,
.header-item {
  margin: 0.15rem 0;
}

.cert-label {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.cert-management {
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

.cert-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.cert-tab {
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.cert-tab:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.cert-tab.active {
  color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
}

.cert-content {
  min-height: 200px;
}

.apply-flow {
  padding: 1rem 0;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cert-step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.step-badge {
  width: 28px;
  height: 28px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-1);
}

.step-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.step-command {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.nginx-config {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  overflow-x: auto;
}

.config-block {
  margin: 0;
  font-family: monospace;
  font-size: 0.8rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  white-space: pre;
}

.best-practices {
  padding: 1rem 0;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.practice-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.practice-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.practice-icon {
  font-size: 1.25rem;
}

.practice-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.practice-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.practice-code {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
}

.benefits-section {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.benefit-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.25rem;
  text-align: center;
  transition: all 0.3s;
}

.benefit-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.benefit-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.benefit-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.benefit-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .strategy-tabs {
    grid-template-columns: 1fr;
  }

  .cert-tabs {
    flex-direction: column;
    gap: 0.25rem;
  }

  .pool-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .servers-grid {
    grid-template-columns: 1fr;
  }

  .flow-node {
    padding: 0.75rem;
  }

  .cert-info,
  .headers-info {
    position: static;
    margin-top: 0.5rem;
  }
}
</style>
