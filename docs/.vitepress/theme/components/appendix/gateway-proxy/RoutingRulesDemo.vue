<!--
  RoutingRulesDemo.vue
  Quy tắc routing - Path matching/rewrite/forward
-->
<template>
  <div class="routing-rules-demo">
    <div class="header">
      <div class="title">
        🧭 Quy tắc routing: làm sao đưa request đến đúng dịch vụ?
      </div>
      <div class="subtitle">
        Hãy hình dung như trung tâm phân loại hàng — theo địa chỉ phân gói hàng về các trạm phát khác nhau
      </div>
    </div>

    <div class="playground">
      <div class="playground-header">
        <div class="playground-title">
          🎮 Phòng thí nghiệm quy tắc routing
        </div>
        <div class="playground-subtitle">
          Nhập một URL, xem nó được route về service nào
        </div>
      </div>

      <div class="input-section">
        <div class="input-group">
          <label>HTTP method</label>
          <select v-model="request.method">
            <option value="GET">
              GET
            </option>
            <option value="POST">
              POST
            </option>
            <option value="PUT">
              PUT
            </option>
            <option value="DELETE">
              DELETE
            </option>
          </select>
        </div>
        <div class="input-group flex-2">
          <label>URL path</label>
          <input
            v-model="request.path"
            type="text"
            placeholder="/api/users/123"
            @keyup.enter="matchRoute"
          >
        </div>
        <div class="input-group">
          <label>Header (tuỳ chọn)</label>
          <input
            v-model="request.header"
            type="text"
            placeholder="X-Version: v2"
          >
        </div>
      </div>

      <button
        class="match-btn"
        :disabled="isMatching"
        @click="matchRoute"
      >
        {{ isMatching ? 'Đang match...' : '🔍 Bắt đầu match' }}
      </button>

      <div
        v-if="matchResult"
        class="result-section"
      >
        <div :class="['result-card', matchResult.found ? 'success' : 'fail']">
          <div class="result-header">
            <div class="result-icon">
              {{ matchResult.found ? '✅' : '❌' }}
            </div>
            <div class="result-title">
              {{ matchResult.found ? 'Match thành công' : 'Không tìm thấy rule khớp' }}
            </div>
          </div>
          <div
            v-if="matchResult.found"
            class="result-detail"
          >
            <div class="detail-row">
              <span class="label">Dịch vụ đích:</span>
              <span class="value service">{{ matchResult.service }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Rule khớp:</span>
              <span class="value">{{ matchResult.rule }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Path sau rewrite:</span>
              <span class="value path">{{ matchResult.rewrittenPath }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Địa chỉ đích:</span>
              <span class="value url">{{ matchResult.targetUrl }}</span>
            </div>
          </div>
          <div
            v-else
            class="result-suggestion"
          >
            <p>💡 Gợi ý kiểm tra:</p>
            <ul>
              <li>Path có bắt đầu bằng /api không?</li>
              <li>HTTP method có khớp không? (GET/POST)</li>
              <li>Điều kiện Header có thoả không?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="rules-table">
      <div class="table-title">
        📋 Bảng quy tắc routing hiện tại
      </div>
      <table>
        <thead>
          <tr>
            <th>Độ ưu tiên</th>
            <th>Rule match</th>
            <th>Dịch vụ đích</th>
            <th>Rewrite path</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(rule, index) in routingRules"
            :key="index"
            :class="{ active: matchResult && matchResult.ruleIndex === index }"
          >
            <td>{{ index + 1 }}</td>
            <td><code>{{ rule.match }}</code></td>
            <td><span class="service-tag">{{ rule.service }}</span></td>
            <td>
              <code v-if="rule.rewrite">{{ rule.rewrite }}</code><span
                v-else
                class="no-rewrite"
              >Không</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="quick-presets">
      <div class="presets-title">
        🚀 Ví dụ test nhanh
      </div>
      <div class="preset-buttons">
        <button
          v-for="preset in presets"
          :key="preset.name"
          class="preset-btn"
          @click="applyPreset(preset)"
        >
          {{ preset.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const request = reactive({
  method: 'GET',
  path: '/api/users/123',
  header: ''
})

const isMatching = ref(false)
const matchResult = ref(null)

const routingRules = [
  {
    match: 'Header: X-Version=v2',
    service: 'Dịch vụ user V2',
    rewrite: null
  },
  {
    match: 'Path: /api/users/*',
    service: 'Dịch vụ user',
    rewrite: '/users/*'
  },
  {
    match: 'Path: /api/orders/*',
    service: 'Dịch vụ đơn hàng',
    rewrite: '/orders/*'
  },
  {
    match: 'Path: /api/pay/*',
    service: 'Dịch vụ thanh toán',
    rewrite: '/payments/*'
  },
  {
    match: 'Method: GET, Path: /health',
    service: 'Health check',
    rewrite: null
  }
]

const presets = [
  { name: '👤 Truy vấn user', method: 'GET', path: '/api/users/123', header: '' },
  { name: '📦 Tạo đơn hàng', method: 'POST', path: '/api/orders', header: '' },
  { name: '💳 Khởi tạo thanh toán', method: 'POST', path: '/api/pay/checkout', header: '' },
  { name: '🔍 Health check', method: 'GET', path: '/health', header: '' },
  { name: '🆕 Bản V2', method: 'GET', path: '/api/users/456', header: 'X-Version: v2' }
]

const matchRoute = async () => {
  isMatching.value = true
  matchResult.value = null

  await new Promise(resolve => setTimeout(resolve, 500))

  const path = request.path
  const method = request.method
  const header = request.header

  let found = false
  let matchedIndex = -1
  let service = ''
  let rule = ''
  let rewrittenPath = path
  let targetUrl = ''

  if (header.includes('X-Version=v2')) {
    found = true
    matchedIndex = 0
    service = 'Dịch vụ user V2 (bản mới)'
    rule = 'Header: X-Version=v2'
    targetUrl = 'http://user-service-v2:8080' + path
  } else if (path.startsWith('/api/users/')) {
    found = true
    matchedIndex = 1
    service = 'Dịch vụ user'
    rule = 'Path: /api/users/*'
    rewrittenPath = path.replace('/api/users/', '/users/')
    targetUrl = 'http://user-service:8080' + rewrittenPath
  } else if (path.startsWith('/api/orders')) {
    found = true
    matchedIndex = 2
    service = 'Dịch vụ đơn hàng'
    rule = 'Path: /api/orders/*'
    rewrittenPath = path.replace('/api/orders/', '/orders/')
    targetUrl = 'http://order-service:8080' + rewrittenPath
  } else if (path.startsWith('/api/pay/')) {
    found = true
    matchedIndex = 3
    service = 'Dịch vụ thanh toán'
    rule = 'Path: /api/pay/*'
    rewrittenPath = path.replace('/api/pay/', '/payments/')
    targetUrl = 'http://payment-service:8080' + rewrittenPath
  } else if (method === 'GET' && path === '/health') {
    found = true
    matchedIndex = 4
    service = 'Health check'
    rule = 'Method: GET, Path: /health'
    targetUrl = 'http://health-check-service:8080/health'
  }

  matchResult.value = {
    found,
    service,
    rule,
    ruleIndex: matchedIndex,
    originalPath: path,
    rewrittenPath,
    targetUrl
  }

  isMatching.value = false
}

const applyPreset = (preset) => {
  request.method = preset.method
  request.path = preset.path
  request.header = preset.header
  matchResult.value = null
}
</script>

<style scoped>
.routing-rules-demo {
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

.playground {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.playground-header {
  margin-bottom: 1.5rem;
}

.playground-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-1);
}

.playground-subtitle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.input-section {
  display: grid;
  grid-template-columns: auto 2fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group.flex-2 {
  flex: 2;
}

.input-group label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
}

.input-group input,
.input-group select {
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.95rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.input-group input:focus,
.input-group select:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.match-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.match-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.3);
}

.match-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result-section {
  margin-top: 1.5rem;
}

.result-card {
  border-radius: 10px;
  padding: 1.25rem;
  border: 2px solid;
}

.result-card.success {
  background: rgba(34, 197, 94, 0.1);
  border-color: #22c55e;
}

.result-card.fail {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.result-icon {
  font-size: 1.5rem;
}

.result-title {
  font-weight: 700;
  font-size: 1.1rem;
}

.result-detail {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.detail-row .label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 100px;
}

.detail-row .value {
  font-family: monospace;
  background: var(--vp-c-bg-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.detail-row .value.service {
  background: rgba(34, 197, 94, 0.2);
  color: #15803d;
}

.detail-row .value.path {
  background: rgba(59, 130, 246, 0.2);
  color: #1d4ed8;
}

.detail-row .value.url {
  background: rgba(168, 85, 247, 0.2);
  color: #7c3aed;
}

.result-suggestion {
  color: var(--vp-c-text-2);
}

.result-suggestion ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
}

.result-suggestion li {
  margin: 0.25rem 0;
}

.rules-table {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.table-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

th {
  font-weight: 600;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

tr:hover {
  background: var(--vp-c-bg-soft);
}

tr.active {
  background: rgba(34, 197, 94, 0.1);
}

.service-tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

code {
  font-family: monospace;
  background: var(--vp-c-bg-soft);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85em;
}

.quick-presets {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.presets-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.preset-btn {
  padding: 0.6rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.preset-btn:hover {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
}

@media (max-width: 768px) {
  .input-section {
    grid-template-columns: 1fr;
  }

  .detail-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .detail-row .label {
    min-width: auto;
  }

  table {
    font-size: 0.75rem;
  }

  th, td {
    padding: 0.5rem;
  }
}
</style>
