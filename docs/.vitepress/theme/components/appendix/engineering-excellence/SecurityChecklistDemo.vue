<template>
  <div class="checklist-demo">
    <div class="header">
      <div class="title">Checklist security cho dự án</div>
      <div class="subtitle">Tick các biện pháp bảo mật đã hoàn thành, xem điểm security của dự án</div>
    </div>

    <div class="score-bar">
      <div class="score-label">Security score</div>
      <div class="score-track">
        <div
          class="score-fill"
          :style="{ width: score + '%', background: scoreColor }"
        />
      </div>
      <div class="score-value" :style="{ color: scoreColor }">
        {{ score }} điểm
      </div>
      <div class="score-level" :style="{ color: scoreColor }">
        {{ scoreLevel }}
      </div>
    </div>

    <div v-for="(cat, ci) in categories" :key="ci" class="category">
      <div class="cat-header" @click="cat.open = !cat.open">
        <span class="cat-icon">{{ cat.icon }}</span>
        <span class="cat-name">{{ cat.name }}</span>
        <span class="cat-progress">
          {{ checkedCount(ci) }}/{{ cat.items.length }}
        </span>
        <span class="cat-arrow">{{ cat.open ? '▾' : '▸' }}</span>
      </div>
      <div v-if="cat.open" class="cat-items">
        <div
          v-for="(item, ii) in cat.items"
          :key="ii"
          class="check-item"
        >
          <div class="item-row" @click="item.checked = !item.checked">
            <input type="checkbox" v-model="item.checked" @click.stop />
            <span :class="['item-text', { done: item.checked }]">
              {{ item.label }}
            </span>
          </div>
          <div
            class="item-detail"
            v-if="item.showDetail"
          >
            {{ item.detail }}
          </div>
          <button
            class="detail-toggle"
            @click="item.showDetail = !item.showDetail"
          >
            {{ item.showDetail ? 'Thu gọn' : 'Xem best practice' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const categories = reactive([
  {
    icon: '🔍',
    name: 'Input validation',
    open: true,
    items: [
      { label: 'Tất cả input từ user được validate phía server', checked: false, showDetail: false, detail: 'Đừng bao giờ chỉ dựa vào validate phía frontend. Attacker có thể bypass browser và gửi request trực tiếp, server phải validate lại độ dài, type, format, range.' },
      { label: 'Dùng whitelist thay vì blacklist để filter', checked: false, showDetail: false, detail: 'Blacklist dễ bị bỏ sót. Nên định nghĩa rõ "cho phép cái gì" thay vì "cấm cái gì", ví dụ chỉ cho phép alphanumeric thay vì cố filter mọi ký tự đặc biệt.' },
      { label: 'Giới hạn type và size khi upload file', checked: false, showDetail: false, detail: 'Validate MIME type và extension, giới hạn file size, lưu file upload ngoài web root, dùng tên file random.' }
    ]
  },
  {
    icon: '🔐',
    name: 'Authentication & authorization',
    open: false,
    items: [
      { label: 'Lưu password đã hash bằng bcrypt/argon2', checked: false, showDetail: false, detail: 'Tuyệt đối không lưu password plaintext. Dùng slow hash algorithm có sẵn salt (bcrypt cost >=10 hoặc argon2id) để chống rainbow table và brute force.' },
      { label: 'Triển khai Multi-Factor Authentication (MFA)', checked: false, showDetail: false, detail: 'Thêm factor thứ 2 ngoài password (TOTP, SMS, hardware key), ngăn đăng nhập trái phép ngay cả khi password bị lộ.' },
      { label: 'API có access control với least privilege', checked: false, showDetail: false, detail: 'Mỗi API endpoint nên check role và permission của user, đảm bảo user chỉ truy cập được resource mình có quyền (RBAC / ABAC).' },
      { label: 'Session management an toàn (timeout, rotation)', checked: false, showDetail: false, detail: 'Regen Session ID sau khi login, set thời gian hết hạn hợp lý, destroy session server khi logout.' }
    ]
  },
  {
    icon: '🛡️',
    name: 'Data protection',
    open: false,
    items: [
      { label: 'Encrypt dữ liệu nhạy cảm khi lưu', checked: false, showDetail: false, detail: 'Encrypt các field nhạy cảm trong database (số điện thoại, CCCD...) bằng AES-256, key lưu tách khỏi data.' },
      { label: 'Không log thông tin nhạy cảm', checked: false, showDetail: false, detail: 'Log không được chứa password, Token, số thẻ tín dụng... Dùng masking, ví dụ chỉ log 4 số cuối điện thoại.' },
      { label: 'Phòng chống SQL injection (parameterized query)', checked: false, showDetail: false, detail: 'Mọi thao tác database dùng parameterized query hoặc ORM, tuyệt đối không concat SQL string.' }
    ]
  },
  {
    icon: '🌐',
    name: 'Communication security',
    open: false,
    items: [
      { label: 'Bật HTTPS toàn site', checked: false, showDetail: false, detail: 'Dùng TLS 1.2+ encrypt mọi communication, config HSTS header để force HTTPS, ngăn MITM và eavesdropping.' },
      { label: 'Set security response headers (CSP, X-Frame-Options)', checked: false, showDetail: false, detail: 'Config Content-Security-Policy để giới hạn nguồn resource, X-Frame-Options ngăn clickjacking, X-Content-Type-Options ngăn MIME sniffing.' },
      { label: 'Cookie set HttpOnly / Secure / SameSite', checked: false, showDetail: false, detail: 'HttpOnly ngăn JS đọc cookie, Secure đảm bảo chỉ truyền qua HTTPS, SameSite=Lax ngăn CSRF.' }
    ]
  }
])

const totalItems = computed(() =>
  categories.reduce((sum, c) => sum + c.items.length, 0)
)

const totalChecked = computed(() =>
  categories.reduce(
    (sum, c) => sum + c.items.filter((i) => i.checked).length,
    0
  )
)

const score = computed(() =>
  Math.round((totalChecked.value / totalItems.value) * 100)
)

const scoreColor = computed(() => {
  if (score.value >= 80) return '#27ae60'
  if (score.value >= 50) return '#f39c12'
  return '#e74c3c'
})

const scoreLevel = computed(() => {
  if (score.value >= 80) return 'Tốt'
  if (score.value >= 50) return 'Đạt'
  return 'Nguy hiểm'
})

const checkedCount = (ci) =>
  categories[ci].items.filter((i) => i.checked).length
</script>

<style scoped>
.checklist-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1.5rem;
  margin: 0.5rem 0;
}

.header { margin-bottom: 1rem; }

.title {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.score-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.score-label {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.score-track {
  flex: 1;
  height: 8px;
  background: var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s, background 0.4s;
}

.score-value {
  font-weight: 800;
  font-size: 1.1rem;
  white-space: nowrap;
}

.score-level {
  font-weight: 700;
  font-size: 0.85rem;
  white-space: nowrap;
}

.category {
  margin-bottom: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.cat-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg);
  cursor: pointer;
  user-select: none;
}

.cat-icon { font-size: 1rem; }

.cat-name {
  font-weight: 700;
  color: var(--vp-c-text-1);
  flex: 1;
}

.cat-progress {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.cat-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

.cat-items {
  border-top: 1px solid var(--vp-c-divider);
}

.check-item {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.check-item:last-child {
  border-bottom: none;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.item-text {
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.item-text.done {
  text-decoration: line-through;
  color: var(--vp-c-text-3);
}

.item-detail {
  margin-top: 0.4rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.7;
}

.detail-toggle {
  margin-top: 0.3rem;
  background: none;
  border: none;
  color: var(--vp-c-brand);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0;
}

@media (max-width: 720px) {
  .score-bar { flex-wrap: wrap; }
}
</style>
