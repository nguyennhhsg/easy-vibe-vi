<!--
  RateLimitingDemo.vue
  Thuật toán rate limit - Token bucket/Leaky bucket/Sliding window
-->
<template>
  <div class="rate-limiting-demo">
    <div class="header">
      <div class="title">
        ⚡ Thuật toán rate limit: bí quyết để hệ thống không bị "lũ traffic" cuốn trôi
      </div>
      <div class="subtitle">
        Hãy hình dung như cửa xả của đập nước — điều tiết tốc độ dòng chảy, tránh hạ lưu bị ngập
      </div>
    </div>

    <div class="algorithm-selector">
      <div class="selector-title">
        Chọn thuật toán rate limit
      </div>
      <div class="algorithm-tabs">
        <button
          v-for="algo in algorithms"
          :key="algo.id"
          :class="['algo-tab', { active: currentAlgo === algo.id }]"
          @click="currentAlgo = algo.id"
        >
          <span class="algo-icon">{{ algo.icon }}</span>
          <span class="algo-name">{{ algo.name }}</span>
        </button>
      </div>
    </div>

    <div class="visualization-area">
      <div class="vis-header">
        <div class="vis-title">
          {{ currentAlgoData.visualTitle }}
        </div>
        <div class="vis-controls">
          <button
            class="control-btn"
            :disabled="isSimulating"
            @click="toggleSimulation"
          >
            {{ isSimulating ? 'Đang mô phỏng...' : '▶ Bắt đầu mô phỏng' }}
          </button>
          <button
            class="control-btn reset"
            @click="resetSimulation"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      <!-- Trực quan hoá token bucket -->
      <div
        v-if="currentAlgo === 'token'"
        class="token-bucket-vis"
      >
        <div class="bucket-container">
          <div class="bucket">
            <div class="bucket-label">
              Token bucket
            </div>
            <div class="tokens-area">
              <div
                v-for="n in bucketState.tokens"
                :key="n"
                class="token"
                :style="{ animationDelay: `${n * 0.1}s` }"
              >
                🪙
              </div>
            </div>
            <div class="bucket-capacity">
              {{ bucketState.tokens }} / {{ bucketState.capacity }} token
            </div>
          </div>
          <div class="token-producer">
            <div class="producer-label">
              ⏰ Bộ sinh token ({{ bucketState.rate }}/giây)
            </div>
            <div class="producer-stream">
              <div
                v-for="n in 3"
                :key="n"
                class="producing-token"
                :style="{ animationDelay: `${n * 0.3}s` }"
              >
                🪙
              </div>
            </div>
          </div>
        </div>
        <div class="requests-queue">
          <div class="queue-title">
            📥 Hàng đợi request
          </div>
          <div class="requests">
            <div
              v-for="(req, index) in requestQueue"
              :key="index"
              class="request-item"
              :class="{ processing: req.status === 'processing', allowed: req.status === 'allowed', rejected: req.status === 'rejected' }"
            >
              <span class="req-method">{{ req.method }}</span>
              <span class="req-path">{{ req.path }}</span>
              <span class="req-status">{{ getStatusEmoji(req.status) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Trực quan hoá leaky bucket -->
      <div
        v-if="currentAlgo === 'leaky'"
        class="leaky-bucket-vis"
      >
        <div class="leaky-container">
          <div class="leaky-bucket">
            <div class="bucket-label">
              Leaky bucket
            </div>
            <div class="bucket-content">
              <div
                class="water-level"
                :style="{ height: `${(leakyState.current / leakyState.capacity) * 100}%` }"
              />
            </div>
            <div class="bucket-stats">
              {{ leakyState.current }} / {{ leakyState.capacity }} request
            </div>
          </div>
          <div class="leak-hole">
            <div class="hole">
              🔘
            </div>
            <div class="leak-rate">
              ⏱️ Tốc độ chảy ra: {{ leakyState.rate }}/giây
            </div>
          </div>
        </div>
        <div class="leaky-legend">
          <div class="legend-item">
            <span class="legend-color water" />
            <span>Request trong bucket (đang chờ)</span>
          </div>
          <div class="legend-item">
            <span class="legend-color hole" />
            <span>Chảy ra đều (đang xử lý)</span>
          </div>
          <div class="legend-item">
            <span class="legend-color overflow" />
            <span>Bucket đầy, tràn ra (bị từ chối)</span>
          </div>
        </div>
      </div>

      <!-- Trực quan hoá sliding window -->
      <div
        v-if="currentAlgo === 'sliding'"
        class="sliding-window-vis"
      >
        <div class="window-container">
          <div class="window-label">
            ⏰ Khung thời gian (1 phút trước)
          </div>
          <div class="window-timeline">
            <div class="time-marks">
              <span
                v-for="n in 6"
                :key="n"
              >{{ 60 - (n - 1) * 10 }}s</span>
            </div>
            <div class="window-bars">
              <div
                v-for="(slot, index) in slidingWindow.slots"
                :key="index"
                class="time-slot"
                :class="{ active: slot.count > 0, current: index === slidingWindow.currentSlot }"
                :style="{ height: `${Math.min((slot.count / 20) * 100, 100)}%` }"
              >
                <span
                  v-if="slot.count > 0"
                  class="slot-count"
                >{{ slot.count }}</span>
              </div>
            </div>
          </div>
          <div class="window-stats">
            <div class="stat">
              <span class="stat-label">Số request trong khung hiện tại:</span>
              <span class="stat-value">{{ slidingWindow.totalRequests }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Ngưỡng rate limit:</span>
              <span class="stat-value">{{ slidingWindow.limit }}/phút</span>
            </div>
            <div class="stat">
              <span class="stat-label">Quota còn lại:</span>
              <span
                class="stat-value"
                :class="{ warning: slidingWindow.remaining < 20 }"
              >{{ slidingWindow.remaining }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <div class="section-title">
        📊 So sánh ba thuật toán
      </div>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Tiêu chí</th>
            <th>Token Bucket</th>
            <th>Leaky Bucket</th>
            <th>Sliding Window</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="dim">
              Ý tưởng cốt lõi
            </td>
            <td>Bucket chứa token, có token mới được đi qua</td>
            <td>Request vào bucket, chảy ra đều để xử lý</td>
            <td>Thống kê số request trong khung thời gian</td>
          </tr>
          <tr>
            <td class="dim">
              Lưu lượng burst
            </td>
            <td>✅ Cho phép burst ở mức nhất định (khi bucket có token)</td>
            <td>❌ Bắt buộc mượt, burst sẽ bị buffer hoặc từ chối</td>
            <td>❌ Đếm chặt theo khung, vượt là từ chối hết</td>
          </tr>
          <tr>
            <td class="dim">
              Tình huống áp dụng
            </td>
            <td>Rate limit API, kiểm soát băng thông (cho phép burst)</td>
            <td>Cần xử lý đều tuyệt đối (như message queue)</td>
            <td>Thống kê chính xác (ví dụ "tối đa 100 lần trong 1 phút")</td>
          </tr>
          <tr>
            <td class="dim">
              Độ phức tạp triển khai
            </td>
            <td>Trung bình</td>
            <td>Trung bình</td>
            <td>Khá cao (cần ghi lại request từng khung thời gian)</td>
          </tr>
          <tr>
            <td class="dim">
              Cấu hình Nginx
            </td>
            <td>limit_req_zone (leaky bucket)</td>
            <td>limit_req_zone (leaky bucket)</td>
            <td>Cần module bên thứ ba hoặc Lua</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="nginx-config">
      <div class="config-title">
        📝 Ví dụ cấu hình rate limit Nginx
      </div>
      <div class="config-tabs">
        <button
          v-for="config in nginxConfigs"
          :key="config.id"
          :class="['config-tab', { active: currentConfig === config.id }]"
          @click="currentConfig = config.id"
        >
          {{ config.name }}
        </button>
      </div>
      <pre class="config-code"><code>{{ currentNginxConfig.code }}</code></pre>
      <div class="config-explanation">
        <div class="exp-title">
          💡 Giải thích cấu hình
        </div>
        <ul>
          <li
            v-for="(item, index) in currentNginxConfig.explanation"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'

const currentAlgo = ref('token')
const isMatching = ref(false)
const isSimulating = ref(false)

const algorithms = [
  {
    id: 'token',
    icon: '🪙',
    name: 'Token bucket',
    visualTitle: '🪙 Trực quan hoá thuật toán Token bucket'
  },
  {
    id: 'leaky',
    icon: '🚿',
    name: 'Leaky bucket',
    visualTitle: '🚿 Trực quan hoá thuật toán Leaky bucket'
  },
  {
    id: 'sliding',
    icon: '📊',
    name: 'Sliding window',
    visualTitle: '📊 Trực quan hoá thuật toán Sliding window'
  }
]

const currentAlgoData = computed(() => algorithms.find(a => a.id === currentAlgo.value))

// Trạng thái token bucket
const bucketState = reactive({
  tokens: 5,
  capacity: 10,
  rate: 2,
  totalRequests: 0
})

// Hàng đợi request
const requestQueue = ref([])

// Trạng thái leaky bucket
const leakyState = reactive({
  current: 3,
  capacity: 8,
  rate: 1
})

// Trạng thái sliding window
const slidingWindow = reactive({
  slots: Array(12).fill(0).map(() => ({ count: Math.floor(Math.random() * 10) })),
  currentSlot: 11,
  totalRequests: 45,
  limit: 100,
  remaining: 55
})

const currentConfig = ref('basic')

const nginxConfigs = [
  {
    id: 'basic',
    name: 'Rate limit cơ bản',
    code: `# Định nghĩa zone rate limit
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
    code: `# Giới hạn số connection đồng thời
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
    code: `# Kết hợp whitelist + rate limit
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

const currentNginxConfig = computed(() => nginxConfigs.find(c => c.id === currentConfig.value))

const toggleSimulation = async () => {
  isSimulating.value = true

  // Mô phỏng sinh request
  for (let i = 0; i < 5; i++) {
    await new Promise(resolve => setTimeout(resolve, 800))

    const methods = ['GET', 'POST', 'GET', 'GET', 'DELETE']
    const paths = ['/api/users', '/api/orders', '/api/products', '/health', '/api/pay']

    const newRequest = {
      id: Date.now() + i,
      method: methods[Math.floor(Math.random() * methods.length)],
      path: paths[Math.floor(Math.random() * paths.length)],
      status: 'processing'
    }

    requestQueue.value.unshift(newRequest)

    // Mô phỏng xử lý
    setTimeout(() => {
      const req = requestQueue.value.find(r => r.id === newRequest.id)
      if (req) {
        if (currentAlgo.value === 'token') {
          // Logic token bucket
          if (bucketState.tokens > 0) {
            bucketState.tokens--
            req.status = 'allowed'
            bucketState.totalRequests++
          } else {
            req.status = 'rejected'
          }
        } else {
          req.status = Math.random() > 0.3 ? 'allowed' : 'rejected'
        }
      }
    }, 500)
  }

  isSimulating.value = false
}

const resetSimulation = () => {
  requestQueue.value = []
  bucketState.tokens = 5
  bucketState.totalRequests = 0
  leakyState.current = 3
  isSimulating.value = false
}

const getStatusEmoji = (status) => {
  switch (status) {
    case 'processing': return '⏳'
    case 'allowed': return '✅'
    case 'rejected': return '❌'
    default: return '⏳'
  }
}

let tokenInterval = null
let leakyInterval = null

onMounted(() => {
  tokenInterval = setInterval(() => {
    if (bucketState.tokens < bucketState.capacity) {
      bucketState.tokens = Math.min(
        bucketState.tokens + bucketState.rate,
        bucketState.capacity
      )
    }
  }, 1000)

  leakyInterval = setInterval(() => {
    if (leakyState.current > 0) {
      leakyState.current = Math.max(0, leakyState.current - leakyState.rate)
    }
  }, 1000)
})

onUnmounted(() => {
  if (tokenInterval) {
    clearInterval(tokenInterval)
    tokenInterval = null
  }
  if (leakyInterval) {
    clearInterval(leakyInterval)
    leakyInterval = null
  }
})
</script>

<style scoped>
.rate-limiting-demo {
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

.algorithm-selector {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.selector-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.algorithm-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.algo-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.algo-tab:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.algo-tab.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.2);
}

.algo-icon {
  font-size: 2rem;
}

.algo-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.visualization-area {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.vis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.vis-title {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.vis-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}

.control-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.control-btn.reset {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

/* Token bucket visualization */
.token-bucket-vis {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.bucket-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bucket {
  background: linear-gradient(180deg, #fef3c7, #fde68a);
  border: 3px solid #f59e0b;
  border-radius: 12px;
  padding: 0.75rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;
}

.bucket-label {
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #92400e;
}

.tokens-area {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-content: flex-start;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
}

.token {
  font-size: 1.5rem;
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.bucket-capacity {
  text-align: center;
  font-weight: 600;
  margin-top: 0.5rem;
  color: #92400e;
}

.token-producer {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.75rem;
  text-align: center;
}

.producer-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.producer-stream {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  height: 30px;
}

.producing-token {
  font-size: 1.25rem;
  animation: drop 1.5s ease-in infinite;
}

@keyframes drop {
  0% { transform: translateY(-20px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(10px); opacity: 0; }
}

.requests-queue {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.75rem;
}

.queue-title {
  font-weight: 700;
  margin-bottom: 0.75rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.requests {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 250px;
  
}

.request-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: white;
  border-radius: 6px;
  font-size: 0.85rem;
  border-left: 3px solid var(--vp-c-divider);
}

.request-item.processing {
  border-left-color: #f59e0b;
  background: #fffbeb;
}

.request-item.allowed {
  border-left-color: #22c55e;
  background: #f0fdf4;
}

.request-item.rejected {
  border-left-color: #ef4444;
  background: #fef2f2;
}

.req-method {
  font-weight: 700;
  color: var(--vp-c-brand);
  min-width: 50px;
}

.req-path {
  flex: 1;
  font-family: monospace;
  color: var(--vp-c-text-1);
}

.req-status {
  font-size: 1.1rem;
}

/* Leaky bucket visualization */
.leaky-bucket-vis {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.leaky-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: flex-end;
}

.leaky-bucket {
  width: 200px;
  background: linear-gradient(180deg, #dbeafe, #bfdbfe);
  border: 3px solid #3b82f6;
  border-radius: 12px;
  padding: 0.75rem;
  position: relative;
}

.bucket-content {
  height: 150px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.water-level {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, #60a5fa, #3b82f6);
  transition: height 0.5s ease;
}

.leak-hole {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.hole {
  font-size: 3rem;
  animation: drip 1s ease-in-out infinite;
}

@keyframes drip {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.leak-rate {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.leaky-legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.legend-color.water {
  background: #3b82f6;
}

.legend-color.hole {
  background: #6b7280;
}

.legend-color.overflow {
  background: #ef4444;
}

/* Sliding window visualization */
.sliding-window-vis {
  padding: 0.75rem;
}

.window-container {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid var(--vp-c-divider);
}

.window-label {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.window-timeline {
  margin-bottom: 1.5rem;
}

.time-marks {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.window-bars {
  display: flex;
  gap: 0.25rem;
  height: 120px;
  align-items: flex-end;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}

.time-slot {
  flex: 1;
  background: #e5e7eb;
  border-radius: 4px 4px 0 0;
  min-height: 5px;
  position: relative;
  transition: all 0.3s;
}

.time-slot.active {
  background: #3b82f6;
}

.time-slot.current {
  box-shadow: 0 0 0 2px #f59e0b;
}

.slot-count {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.window-stats {
  display: flex;
  justify-content: space-around;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.stat {
  text-align: center;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--vp-c-brand);
}

.stat-value.warning {
  color: #ef4444;
}

.comparison-section {
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
  overflow-x: auto;
  display: block;
}

.comparison-table thead,
.comparison-table tbody {
  display: table;
  width: 100%;
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

.nginx-config {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.config-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.config-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.config-tab {
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 0.85rem;
}

.config-tab:hover {
  border-color: var(--vp-c-brand);
}

.config-tab.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.config-code {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.config-explanation {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
}

.exp-title {
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.config-explanation ul {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .algorithm-tabs {
    grid-template-columns: 1fr;
  }

  .input-section {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    font-size: 0.75rem;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 0.5rem;
  }

  .window-bars {
    height: 80px;
  }
}
</style>
