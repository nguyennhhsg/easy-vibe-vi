<!--
  CachePatternsDemo.vue
  Demo các mô hình cache - Cache-Aside, Read-Through, Write-Behind
-->
<template>
  <div class="cache-patterns-demo">
    <div class="header">
      <div class="title">
        Các mô hình cache (Caching Patterns)
      </div>
      <div class="subtitle">
        Hiểu cách hoạt động của các mô hình đọc/ghi cache khác nhau
      </div>
    </div>

    <div class="pattern-selector">
      <button
        v-for="pattern in patterns"
        :key="pattern.id"
        class="pattern-btn"
        :class="{ active: activePattern === pattern.id }"
        @click="activePattern = pattern.id"
      >
        {{ pattern.name }}
      </button>
    </div>

    <div class="pattern-content">
      <!-- Cache-Aside -->
      <div
        v-if="activePattern === 'cache-aside'"
        class="pattern-detail"
      >
        <div class="description">
          <div class="pattern-title">
            Cache-Aside (cache đi bên cạnh)
          </div>
          <div class="pattern-subtitle">
            Mô hình phổ biến nhất, code ứng dụng tự kiểm soát cache
          </div>
          <div class="pattern-points">
            <div class="point">
              <span class="icon">📖</span>
              <div>
                <strong>Đọc</strong>: Tra cache trước, miss thì truy vấn database rồi ghi vào cache
              </div>
            </div>
            <div class="point">
              <span class="icon">✏️</span>
              <div>
                <strong>Cập nhật</strong>: Cập nhật database trước, sau đó <strong>xóa</strong> cache (không phải cập nhật!)
              </div>
            </div>
          </div>
        </div>

        <div class="diagram">
          <div class="diagram-title">
            Luồng đọc
          </div>
          <div class="flow-chart">
            <div
              class="flow-step"
              :class="{ active: flowStep >= 1 }"
            >
              <div class="step-number">
                1
              </div>
              <div class="step-text">
                Tra cache
              </div>
            </div>
            <div class="flow-arrow">
              ↓
            </div>
            <div class="flow-decision">
              <div class="decision-label">
                Hit?
              </div>
              <div class="decision-branches">
                <div
                  class="branch yes"
                  :class="{ active: flowStep >= 2 && cacheHit }"
                >
                  <div class="branch-label">
                    Có
                  </div>
                  <div class="branch-result">
                    ✅ Trả về dữ liệu
                  </div>
                </div>
                <div
                  class="branch no"
                  :class="{ active: flowStep >= 2 && !cacheHit }"
                >
                  <div class="branch-label">
                    Không
                  </div>
                  <div class="branch-steps">
                    <div
                      class="flow-step"
                      :class="{ active: flowStep >= 3 }"
                    >
                      <div class="step-number">
                        2
                      </div>
                      <div class="step-text">
                        Truy vấn database
                      </div>
                    </div>
                    <div class="flow-arrow">
                      ↓
                    </div>
                    <div
                      class="flow-step"
                      :class="{ active: flowStep >= 4 }"
                    >
                      <div class="step-number">
                        3
                      </div>
                      <div class="step-text">
                        Ghi vào cache
                      </div>
                    </div>
                    <div class="flow-arrow">
                      ↓
                    </div>
                    <div
                      class="flow-step"
                      :class="{ active: flowStep >= 5 }"
                    >
                      <div class="step-number">
                        4
                      </div>
                      <div class="step-text">
                        Trả về dữ liệu
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="demo-controls">
            <button
              class="demo-btn"
              :disabled="simulating"
              @click="simulateCacheAside"
            >
              {{ simulating ? 'Đang mô phỏng...' : 'Mô phỏng đọc' }}
            </button>
            <label class="checkbox">
              <input
                v-model="cacheHit"
                type="checkbox"
              >
              Cache hit
            </label>
          </div>
        </div>

        <div class="code-example">
          <div class="code-title">
            Ví dụ code
          </div>
          <pre class="code-block"><code>// Mô hình Cache-Aside
def get_user(user_id):
    # 1. Tra cache
    user = cache.get(f'user:{user_id}')
    if user:
        return user  # Hit, trả về ngay

    # 2. Truy vấn database
    user = db.query(f'SELECT * FROM users WHERE id = {user_id}')

    # 3. Ghi vào cache
    cache.set(f'user:{user_id}', user, ttl=600)

    return user

def update_user(user_id, data):
    # 1. Cập nhật database
    db.update('users', data)

    # 2. Xóa cache (không phải cập nhật!)
    cache.delete(f'user:{user_id}')</code></pre>
        </div>
      </div>

      <!-- Read-Through -->
      <div
        v-if="activePattern === 'read-through'"
        class="pattern-detail"
      >
        <div class="description">
          <div class="pattern-title">
            Read-Through / Write-Through
          </div>
          <div class="pattern-subtitle">
            Thư viện cache lo việc giao tiếp với database, ứng dụng chỉ làm việc với cache
          </div>
          <div class="pattern-points">
            <div class="point">
              <span class="icon">📖</span>
              <div>
                <strong>Read-Through</strong>: Thư viện cache tự động load dữ liệu từ database
              </div>
            </div>
            <div class="point">
              <span class="icon">✏️</span>
              <div>
                <strong>Write-Through</strong>: Khi ghi cache cũng đồng thời ghi vào database
              </div>
            </div>
          </div>
        </div>

        <div class="diagram">
          <div class="diagram-title">
            So sánh kiến trúc
          </div>
          <div class="architecture-comparison">
            <div class="arch-block">
              <div class="arch-title">
                Cache-Aside
              </div>
              <div class="arch-flow">
                <div class="flow-box app">
                  Ứng dụng
                </div>
                <div class="flow-arrows">
                  <div>↔️ Cache</div>
                  <div>↔️ Database</div>
                </div>
              </div>
            </div>
            <div class="arch-block">
              <div class="arch-title">
                Read-Through
              </div>
              <div class="arch-flow">
                <div class="flow-box app">
                  Ứng dụng
                </div>
                <div class="flow-arrows">
                  <div>↔️ Thư viện cache</div>
                </div>
                <div class="flow-box cache">
                  Thư viện cache ↔️ Database
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="code-example">
          <div class="code-title">
            Ví dụ code
          </div>
          <pre class="code-block"><code>// Mô hình Read-Through (code gọn hơn)
def get_user(user_id):
    # Thư viện cache tự xử lý truy vấn database
    user = cache.get_or_load(user_id, lambda: db.get_user(user_id))
    return user

// Mô hình Write-Through
def update_user(user_id, data):
    # Thư viện cache tự đồng bộ xuống database
    cache.set(user_id, data)  # tự động ghi vào database</code></pre>
        </div>
      </div>

      <!-- Write-Behind -->
      <div
        v-if="activePattern === 'write-behind'"
        class="pattern-detail"
      >
        <div class="description">
          <div class="pattern-title">
            Write-Behind (ghi trễ bất đồng bộ)
          </div>
          <div class="pattern-subtitle">
            Khi ghi chỉ ghi vào cache, sau đó ghi vào database theo lô và bất đồng bộ
          </div>
          <div class="pattern-points">
            <div class="point">
              <span class="icon">⚡</span>
              <div><strong>Ưu điểm</strong>: Ghi cực nhanh, phù hợp tình huống ghi nhiều</div>
            </div>
            <div class="point">
              <span class="icon">⚠️</span>
              <div>
                <strong>Nhược điểm</strong>: Có thể mất dữ liệu (cache sập là dữ liệu mất)
              </div>
            </div>
            <div class="point">
              <span class="icon">🎯</span>
              <div>
                <strong>Phù hợp</strong>: Hệ thống flash sale, số lượt like, lượt xem (chấp nhận mất ít)
              </div>
            </div>
          </div>
        </div>

        <div class="diagram">
          <div class="diagram-title">
            Luồng ghi
          </div>
          <div class="flow-chart">
            <div class="flow-step">
              <div class="step-number">
                1
              </div>
              <div class="step-text">
                Ghi vào cache
              </div>
              <div class="step-time">
                ⚡ ~1ms
              </div>
            </div>
            <div class="flow-arrow">
              ↓
            </div>
            <div class="flow-step">
              <div class="step-number">
                2
              </div>
              <div class="step-text">
                Trả về ngay lập tức
              </div>
            </div>
            <div class="flow-arrow">
              ↓
            </div>
            <div class="flow-step pending">
              <div class="step-number">
                3
              </div>
              <div class="step-text">
                Ghi database theo lô, bất đồng bộ
              </div>
              <div class="step-time">
                🕐 Chạy nền
              </div>
            </div>
          </div>

          <div class="demo-controls">
            <button
              class="demo-btn"
              @click="simulateWriteBehind"
            >
              Mô phỏng ghi theo lô
            </button>
          </div>

          <div
            v-if="writeQueue.length > 0"
            class="write-queue"
          >
            <div class="queue-title">
              Queue chờ ghi
            </div>
            <div class="queue-items">
              <div
                v-for="(item, index) in writeQueue"
                :key="index"
                class="queue-item"
                :class="{ writing: item.writing, written: item.written }"
              >
                <span class="item-key">{{ item.key }}</span>
                <span class="item-status">{{ item.status }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="code-example">
          <div class="code-title">
            Ví dụ code
          </div>
          <pre class="code-block"><code>// Mô hình Write-Behind
def update_counter(post_id):
    # 1. Cập nhật cache ngay (cực nhanh)
    cache.incr(f'views:{post_id}')
    # Trả về ngay, không chờ database

    # 2. Bất đồng bộ ghi theo lô vào database ở nền
    async def flush_to_db():
        while True:
            await asyncio.sleep(5)  # Mỗi 5 giây ghi một lô
            batch = cache.get_many('views:*')
            db.batch_update(batch)

    asyncio.create_task(flush_to_db())</code></pre>
        </div>
      </div>
    </div>

    <div class="pattern-comparison">
      <div class="comparison-title">
        So sánh các mô hình
      </div>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Mô hình</th>
            <th>Độ phức tạp</th>
            <th>Hiệu năng</th>
            <th>Tính nhất quán</th>
            <th>Trường hợp dùng</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="{ highlight: activePattern === 'cache-aside' }">
            <td>Cache-Aside</td>
            <td>Trung bình</td>
            <td>Cao</td>
            <td>Trung bình</td>
            <td>Hầu hết các tình huống</td>
          </tr>
          <tr :class="{ highlight: activePattern === 'read-through' }">
            <td>Read-Through</td>
            <td>Thấp</td>
            <td>Trung bình</td>
            <td>Cao</td>
            <td>Tình huống đơn giản</td>
          </tr>
          <tr :class="{ highlight: activePattern === 'write-behind' }">
            <td>Write-Behind</td>
            <td>Cao</td>
            <td>Cực cao</td>
            <td>Thấp</td>
            <td>Ghi nhiều, chấp nhận mất</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activePattern = ref('cache-aside')
const flowStep = ref(0)
const cacheHit = ref(false)
const simulating = ref(false)
const writeQueue = ref([])

const patterns = [
  { id: 'cache-aside', name: 'Cache-Aside' },
  { id: 'read-through', name: 'Read-Through' },
  { id: 'write-behind', name: 'Write-Behind' }
]

const simulateCacheAside = async () => {
  simulating.value = true
  flowStep.value = 0

  const steps = cacheHit.value ? [1, 2] : [1, 2, 3, 4, 5]

  for (let i = 0; i < steps.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 600))
    flowStep.value = steps[i]
  }

  setTimeout(() => {
    flowStep.value = 0
    simulating.value = false
  }, 1000)
}

const simulateWriteBehind = async () => {
  writeQueue.value = [
    {
      key: 'views:post:1',
      value: 100,
      status: 'Chờ ghi',
      writing: false,
      written: false
    },
    {
      key: 'views:post:2',
      value: 200,
      status: 'Chờ ghi',
      writing: false,
      written: false
    },
    {
      key: 'views:post:3',
      value: 150,
      status: 'Chờ ghi',
      writing: false,
      written: false
    }
  ]

  for (let i = 0; i < writeQueue.value.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    writeQueue.value[i].writing = true
    writeQueue.value[i].status = 'Đang ghi...'

    await new Promise((resolve) => setTimeout(resolve, 700))
    writeQueue.value[i].writing = false
    writeQueue.value[i].written = true
    writeQueue.value[i].status = '✅ Đã ghi'
  }
}
</script>

<style scoped>
.cache-patterns-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.1rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.pattern-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.pattern-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.pattern-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.pattern-content {
  min-height: 400px;
}

.pattern-detail {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.description {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.pattern-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.pattern-subtitle {
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.pattern-points {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.point {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.diagram {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.diagram-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.flow-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.flow-step.active {
  border-color: var(--vp-c-brand);
  background: #eff6ff;
}

.flow-step.pending {
  border-color: #f59e0b;
  background: #fef3c7;
}

.step-number {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.85rem;
}

.step-text {
  font-weight: 600;
  font-size: 0.9rem;
}

.step-time {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.flow-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
}

.flow-decision {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.decision-label {
  font-weight: 600;
  padding: 0.5rem 1rem;
  background: #fef3c7;
  border-radius: 6px;
  border: 1px solid #f59e0b;
}

.decision-branches {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.branch {
  padding: 0.75rem;
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.branch.active {
  border-color: var(--vp-c-brand);
  background: #eff6ff;
}

.branch-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
}

.branch-result {
  text-align: center;
  padding: 0.5rem;
  background: #f0fdf4;
  border-radius: 6px;
  color: #166534;
  font-weight: 600;
}

.branch-steps {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.demo-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.demo-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.demo-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.demo-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
}

.architecture-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 640px) {
  .architecture-comparison {
    grid-template-columns: 1fr;
  }
}

.arch-block {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.arch-title {
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}

.arch-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.flow-box {
  padding: 0.75rem 1.5rem;
  background: white;
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  font-weight: 600;
}

.flow-box.cache {
  font-size: 0.85rem;
}

.flow-arrows {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.write-queue {
  margin-top: 1rem;
}

.queue-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.queue-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.queue-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.queue-item.writing {
  border-color: #f59e0b;
  background: #fef3c7;
}

.queue-item.written {
  border-color: #22c55e;
  background: #f0fdf4;
}

.item-key {
  font-weight: 600;
  font-size: 0.85rem;
}

.item-status {
  font-size: 0.8rem;
}

.code-example {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.code-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 0.75rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.6;
}

.pattern-comparison {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.comparison-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th,
.comparison-table td {
  padding: 0.75rem;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.comparison-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  font-size: 0.85rem;
}

.comparison-table td {
  font-size: 0.85rem;
}

.comparison-table tr.highlight {
  background: #eff6ff;
  border-left: 3px solid var(--vp-c-brand);
}
</style>
