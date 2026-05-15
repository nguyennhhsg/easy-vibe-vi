<template>
  <div class="demo ab-testing-demo">
    <div class="header">
      <span class="title">Demo A/B testing</span>
    </div>

    <div v-if="!props.tab" class="tabs">
      <button
        v-for="t in tabs"
        :key="t.id"
        :class="['tab', { active: activeTab === t.id }]"
        @click="activeTab = t.id"
      >
        {{ t.name }}
      </button>
    </div>

    <!-- Demo phân bổ traffic -->
    <div v-if="activeTab === 'traffic'" class="content">
      <h4>Trực quan phân bổ traffic</h4>
      <p class="desc">Quan sát cách người dùng được phân bổ ngẫu nhiên vào nhóm đối chứng (A) và nhóm thử nghiệm (B)</p>

      <div class="traffic-split">
        <div class="split-container">
          <div class="group group-a" :style="{ width: trafficSplit + '%' }">
            <div class="group-label">Nhóm A (đối chứng)</div>
            <div class="group-percent">{{ trafficSplit }}%</div>
          </div>
          <div
            class="group group-b"
            :style="{ width: 100 - trafficSplit + '%' }"
          >
            <div class="group-label">Nhóm B (thử nghiệm)</div>
            <div class="group-percent">{{ 100 - trafficSplit }}%</div>
          </div>
        </div>
      </div>



      <div class="traffic-stats">
        <div class="stat-item">
          <span class="stat-label">Tổng số người dùng</span>
          <span class="stat-value">{{ totalUsers }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Người dùng nhóm A</span>
          <span class="stat-value">{{ groupAUsers }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Người dùng nhóm B</span>
          <span class="stat-value">{{ groupBUsers }}</span>
        </div>
      </div>

      <div class="tips">
        <span class="tips-text">Tỉ lệ 50/50 phát hiện khác biệt nhanh nhất, đảm bảo cỡ mẫu hai nhóm đủ lớn để có ý nghĩa thống kê</span>
      </div>
    </div>

    <!-- Demo so sánh kết quả -->
    <div v-if="activeTab === 'results'" class="content">
      <h4>So sánh kết quả nhóm A và B</h4>
      <p class="desc">So sánh tỉ lệ chuyển đổi và mức ý nghĩa thống kê của hai nhóm</p>

      <div class="comparison-settings">
        <div class="setting-item">
          <label>Tỉ lệ chuyển đổi nhóm A (baseline)</label>
          <input
            v-model.number="conversionA"
            type="number"
            min="1"
            max="50"
            step="0.5"
            class="number-input"
          />
          <span class="unit">%</span>
        </div>
        <div class="setting-item">
          <label>Tỉ lệ chuyển đổi nhóm B</label>
          <input
            v-model.number="conversionB"
            type="number"
            min="1"
            max="50"
            step="0.5"
            class="number-input"
          />
          <span class="unit">%</span>
        </div>
        <div class="setting-item">
          <label>Cỡ mẫu mỗi nhóm</label>
          <input
            v-model.number="sampleSize"
            type="number"
            min="100"
            max="100000"
            step="100"
            class="number-input"
          />
        </div>
      </div>

      <div class="results-comparison">
        <div class="result-card result-a">
          <div class="card-header">Nhóm A (đối chứng)</div>
          <div class="card-metric">
            <span class="metric-label">Tỉ lệ chuyển đổi</span>
            <span class="metric-value">{{ conversionA }}%</span>
          </div>
          <div class="card-metric">
            <span class="metric-label">Số lượt chuyển đổi</span>
            <span class="metric-value">{{ conversionsA }}</span>
          </div>
          <div class="card-metric">
            <span class="metric-label">Cỡ mẫu</span>
            <span class="metric-value">{{ sampleSize }}</span>
          </div>
        </div>

        <div class="vs-divider">VS</div>

        <div class="result-card result-b">
          <div class="card-header">Nhóm B (thử nghiệm)</div>
          <div class="card-metric">
            <span class="metric-label">Tỉ lệ chuyển đổi</span>
            <span class="metric-value">{{ conversionB }}%</span>
          </div>
          <div class="card-metric">
            <span class="metric-label">Số lượt chuyển đổi</span>
            <span class="metric-value">{{ conversionsB }}</span>
          </div>
          <div class="card-metric">
            <span class="metric-label">Cỡ mẫu</span>
            <span class="metric-value">{{ sampleSize }}</span>
          </div>
        </div>
      </div>

      <div class="statistical-summary">
        <div class="summary-item">
          <span class="summary-label">Mức tăng tương đối</span>
          <span
            class="summary-value"
            :class="{
              positive: relativeLift > 0,
              negative: relativeLift < 0,
              neutral: relativeLift === 0
            }"
          >
            {{ relativeLift > 0 ? '+' : '' }}{{ relativeLift.toFixed(2) }}%
          </span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Z-score</span>
          <span class="summary-value">{{ zScore.toFixed(3) }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">P-value</span>
          <span class="summary-value">{{ pValue.toFixed(5) }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Ý nghĩa thống kê</span>
          <span
            class="summary-value significance"
            :class="{
              significant: isSignificant,
              'not-significant': !isSignificant
            }"
          >
            {{ isSignificant ? 'Có ý nghĩa' : 'Không có ý nghĩa' }}
          </span>
        </div>
      </div>

      <div class="confidence-interval">
        <div class="ci-header">Khoảng tin cậy 95%</div>
        <div class="ci-values">
          <span class="ci-bound">{{ ciLower.toFixed(2) }}%</span>
          <span class="ci-arrow">← Khác biệt thật sự →</span>
          <span class="ci-bound">{{ ciUpper.toFixed(2) }}%</span>
        </div>
        <div class="ci-note">Có 95% niềm tin rằng khác biệt thật sự nằm trong khoảng này</div>
      </div>

      <div class="tips">
        <span class="tips-text">P-value &lt; 0.05 cho thấy kết quả có ý nghĩa thống kê, khác biệt khó có khả năng do ngẫu nhiên</span>
      </div>
    </div>

    <!-- Bộ tính cỡ mẫu -->
    <div v-if="activeTab === 'calculator'" class="content">
      <h4>Bộ tính cỡ mẫu</h4>
      <p class="desc">Tính cỡ mẫu tối thiểu cần thiết để đạt ý nghĩa thống kê</p>

      <div class="calc-inputs">
        <div class="input-group">
          <label>Tỉ lệ chuyển đổi baseline</label>
          <div class="input-wrapper">
            <input
              v-model.number="baselineRate"
              type="number"
              min="1"
              max="50"
              step="0.5"
              class="number-input"
            />
            <span class="unit">%</span>
          </div>
          <span class="input-hint">Tỉ lệ chuyển đổi của phiên bản hiện tại</span>
        </div>

        <div class="input-group">
          <label>Mức tăng nhỏ nhất muốn phát hiện</label>
          <div class="input-wrapper">
            <input
              v-model.number="minimumDetectable"
              type="number"
              min="1"
              max="100"
              step="1"
              class="number-input"
            />
            <span class="unit">%</span>
          </div>
          <span class="input-hint">Mức tăng tương đối tối thiểu muốn phát hiện</span>
        </div>

        <div class="input-group">
          <label>Mức ý nghĩa (α)</label>
          <select v-model.number="alpha" class="select-input">
            <option :value="0.01">0.01 (độ tin cậy 99%)</option>
            <option :value="0.05">0.05 (độ tin cậy 95%) - khuyến nghị</option>
            <option :value="0.1">0.1 (độ tin cậy 90%)</option>
          </select>
          <span class="input-hint">Xác suất mắc sai số loại I</span>
        </div>

        <div class="input-group">
          <label>Statistical power (1-β)</label>
          <select v-model.number="power" class="select-input">
            <option :value="0.7">70%</option>
            <option :value="0.8">80% - khuyến nghị</option>
            <option :value="0.9">90%</option>
          </select>
          <span class="input-hint">Xác suất phát hiện được hiệu ứng thật</span>
        </div>
      </div>

      <button class="btn-primary btn-calc" @click="calculateSampleSize">
        Tính cỡ mẫu cần thiết
      </button>

      <div v-if="calculatedSampleSize > 0" class="calc-results">
        <div class="result-highlight">
          <div class="highlight-label">Cỡ mẫu cần thiết mỗi nhóm</div>
          <div class="highlight-value">
            {{ calculatedSampleSize.toLocaleString() }}
          </div>
        </div>

        <div class="result-details">
          <div class="detail-row">
            <span class="detail-label">Tổng cỡ mẫu (A+B)</span>
            <span class="detail-value">{{
              (calculatedSampleSize * 2).toLocaleString()
            }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Tỉ lệ chuyển đổi mục tiêu (nhóm thử nghiệm)</span>
            <span class="detail-value">{{ targetRate }}%</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Chênh lệch tuyệt đối</span>
            <span class="detail-value">{{ absoluteDifference }}%</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Ước tính thời gian</span>
            <span class="detail-value">{{ estimatedDays }}</span>
          </div>
        </div>
      </div>

      <div class="tips">
        <span class="tips-text">Mục tiêu tăng càng nhỏ, cỡ mẫu càng lớn. Tăng 5% cần nhiều mẫu hơn tăng 20%</span>
      </div>
    </div>

    <!-- Sai lầm thường gặp -->
    <div v-if="activeTab === 'pitfalls'" class="content">
      <h4>Sai lầm thường gặp khi A/B testing</h4>

      <div class="pitfall-list">
        <div v-for="pitfall in pitfalls" :key="pitfall.id" class="pitfall-card">
          <div class="pitfall-header">
            <span class="pitfall-title">{{ pitfall.title }}</span>
          </div>
          <div class="pitfall-desc">{{ pitfall.description }}</div>
          <div class="pitfall-example">
            <strong>Ví dụ:</strong> {{ pitfall.example }}
          </div>
          <div class="pitfall-solution">
            <strong>Giải pháp:</strong> {{ pitfall.solution }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  tab: {
    type: String,
    default: null
  }
})

const activeTab = ref(props.tab || 'traffic')

const tabs = [
  { id: 'traffic', name: 'Phân bổ traffic' },
  { id: 'results', name: 'So sánh kết quả' },
  { id: 'calculator', name: 'Tính cỡ mẫu' },
  { id: 'pitfalls', name: 'Sai lầm thường gặp' }
]

// Liên quan tới phân bổ traffic
const groupAUsers = ref(500)
const groupBUsers = ref(500)

const totalUsers = computed(() => groupAUsers.value + groupBUsers.value)
const trafficSplit = computed(() => {
  if (totalUsers.value === 0) return 50
  return Math.round((groupAUsers.value / totalUsers.value) * 100)
})

function allocateUser() {
  if (Math.random() < 0.5) {
    groupAUsers.value++
  } else {
    groupBUsers.value++
  }
}

function allocateBatch() {
  for (let i = 0; i < 100; i++) {
    allocateUser()
  }
}

function resetTraffic() {
  groupAUsers.value = 500
  groupBUsers.value = 500
}

// Liên quan tới so sánh kết quả
const conversionA = ref(5.0)
const conversionB = ref(6.0)
const sampleSize = ref(10000)

const conversionsA = computed(
  () => Math.round((conversionA.value / 100) * sampleSize.value)
)
const conversionsB = computed(
  () => Math.round((conversionB.value / 100) * sampleSize.value)
)

const relativeLift = computed(() => {
  if (conversionA.value === 0) return 0
  return ((conversionB.value - conversionA.value) / conversionA.value) * 100
})

// Tính Z-score
const zScore = computed(() => {
  const p1 = conversionA.value / 100
  const p2 = conversionB.value / 100
  const n1 = sampleSize.value
  const n2 = sampleSize.value

  const pooledP = (conversionsA.value + conversionsB.value) / (n1 + n2)
  const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / n1 + 1 / n2))

  if (se === 0) return 0
  return (p2 - p1) / se
})

const pValue = computed(() => {
  const z = Math.abs(zScore.value)
  // Dùng xấp xỉ phân phối chuẩn
  return 2 * (1 - normalCDF(z))
})

function normalCDF(x) {
  // Xấp xỉ CDF của phân phối chuẩn
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911

  const sign = x < 0 ? -1 : 1
  x = Math.abs(x) / Math.sqrt(2)

  const t = 1.0 / (1.0 + p * x)
  const y =
    1.0 -
    (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

  return 0.5 * (1.0 + sign * y)
}

const isSignificant = computed(() => pValue.value < 0.05)

// Khoảng tin cậy 95%
const ciLower = computed(() => {
  const diff = conversionB.value - conversionA.value
  const p1 = conversionA.value / 100
  const p2 = conversionB.value / 100
  const n = sampleSize.value

  const se = Math.sqrt((p1 * (1 - p1)) / n + (p2 * (1 - p2)) / n)
  const margin = 1.96 * se * 100 // 1.95996 là z-value cho khoảng tin cậy 95%

  return diff - margin
})

const ciUpper = computed(() => {
  const diff = conversionB.value - conversionA.value
  const p1 = conversionA.value / 100
  const p2 = conversionB.value / 100
  const n = sampleSize.value

  const se = Math.sqrt((p1 * (1 - p1)) / n + (p2 * (1 - p2)) / n)
  const margin = 1.96 * se * 100

  return diff + margin
})

// Liên quan tới bộ tính cỡ mẫu
const baselineRate = ref(5.0)
const minimumDetectable = ref(20)
const alpha = ref(0.05)
const power = ref(0.8)
const calculatedSampleSize = ref(0)

const targetRate = computed(
  () => (baselineRate.value * (1 + minimumDetectable.value / 100)).toFixed(2)
)

const absoluteDifference = computed(
  () => (targetRate.value - baselineRate.value).toFixed(2)
)

const estimatedDays = computed(() => {
  const dailyVisitors = 5000 // Giả sử 5000 khách/ngày
  const totalNeeded = calculatedSampleSize.value * 2
  const days = Math.ceil(totalNeeded / dailyVisitors)
  return `khoảng ${days} ngày`
})

function calculateSampleSize() {
  const p1 = baselineRate.value / 100
  const p2 = targetRate.value / 100
  const constZa = 1.96 // z-value tương ứng alpha = 0.05
  const constZb = 0.84 // z-value tương ứng power = 0.8

  // Độ lệch chuẩn gộp
  const pBar = (p1 + p2) / 2
  const sd1 = Math.sqrt(2 * pBar * (1 - pBar))
  const sd2 = Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))

  // Công thức cỡ mẫu rút gọn
  const n =
    (Math.pow(constZa * sd1 + constZb * sd2, 2)) / Math.pow(p2 - p1, 2)

  calculatedSampleSize.value = Math.ceil(n)
}

// Dữ liệu các sai lầm thường gặp
const pitfalls = [
  {
    id: 'early-stop',
    title: 'Dừng thí nghiệm quá sớm',
    description:
      'Thấy kết quả "có ý nghĩa" là dừng ngay, thực ra chỉ là dao động ngẫu nhiên',
    example:
      'Sau 2 ngày thấy nhóm B dẫn trước, tuyên bố thắng cuộc. Nhưng chạy tiếp một tuần thì khác biệt biến mất.',
    solution: 'Tính trước cỡ mẫu cần thiết, chạy đủ chu kỳ (ít nhất 2 tuần) rồi mới ra quyết định'
  },
  {
    id: 'peeking',
    title: 'Liên tục dòm kết quả',
    description: 'Mỗi ngày xem dữ liệu, hễ "có ý nghĩa" là dừng, làm tăng mạnh tỉ lệ false positive',
    example:
      'Mỗi ngày kiểm tra p-value, thấy <0.05 là dừng. Cách này nâng tỉ lệ false positive từ 5% lên tới 30%+.',
    solution: 'Dùng phương pháp sequential testing, hoặc đặt sẵn các điểm kiểm tra duy nhất'
  },
  {
    id: 'simpson',
    title: 'Nghịch lý Simpson',
    description: 'Khi tách nhóm thấy B kém hơn, nhưng gộp lại B lại tốt hơn (hoặc ngược lại)',
    example:
      'Mobile B>A, desktop cũng B>A, nhưng gộp lại A>B. Nguyên nhân: phân bổ traffic không đồng đều.',
    solution: 'Phân tích riêng theo nguồn traffic, thiết bị, nhóm người dùng, kiểm tra tính ngẫu nhiên'
  },
  {
    id: 'p-hacking',
    title: 'P-hacking (thao túng p-value)',
    description: 'Thử nhiều chỉ số, nhiều nhóm con cho tới khi tìm được kết quả "có ý nghĩa"',
    example:
      'Chỉ số chính không có ý nghĩa, tách theo tuổi, vùng miền, thiết bị, thấy một nhóm có ý nghĩa là tuyên bố thành công.',
    solution: 'Đăng ký giả thuyết và chỉ số từ trước, chỉ phân tích các chỉ số đã định trước'
  },
  {
    id: 'novelty',
    title: 'Hiệu ứng mới lạ (novelty effect)',
    description: 'User tò mò bấm vào tính năng mới, làm số liệu ngắn hạn cao giả tạo',
    example:
      'Nút mới ra tuần đầu CTR tăng 30%, nhưng 3 tuần sau quay về mức cũ thậm chí thấp hơn.',
    solution: 'Chạy đủ thời gian (ít nhất 2-4 tuần) để hiệu ứng mới lạ phai nhạt'
  },
  {
    id: 'underpowered',
    title: 'Cỡ mẫu không đủ',
    description: 'Cỡ mẫu quá nhỏ, kể cả có khác biệt thật cũng không phát hiện được',
    example:
      'Kỳ vọng tăng 5% nhưng chỉ chạy 1000 mẫu, kết quả "không có ý nghĩa" rồi bỏ; thực ra cần 30000 mẫu.',
    solution: 'Trước thí nghiệm tính cỡ mẫu cần thiết, đảm bảo statistical power ≥ 80%'
  }
]
</script>

<style scoped>
.ab-testing-demo {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.icon {
  font-size: 24px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tab {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.tab:hover {
  background: #e2e8f0;
}

.tab.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.content {
  background: #f8fafc;
  border-radius: 8px;
  padding: 20px;
}

.content h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #1e293b;
}

.desc {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 16px;
}

/* Style phần phân bổ traffic */
.traffic-split {
  margin-bottom: 20px;
}

.split-container {
  display: flex;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e2e8f0;
}

.group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: width 0.3s ease;
}

.group-a {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.group-b {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.group-label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.group-percent {
  font-size: 32px;
  font-weight: 700;
}

.traffic-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.btn-tertiary,
.btn-calc {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: #8b5cf6;
  color: white;
}

.btn-secondary:hover {
  background: #7c3aed;
}

.btn-tertiary {
  background: #64748b;
  color: white;
}

.btn-tertiary:hover {
  background: #475569;
}

.btn-calc {
  width: 100%;
  margin-top: 16px;
  font-size: 16px;
  padding: 12px;
}

.traffic-stats {
  display: flex;
  gap: 24px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 12px;
  color: #64748b;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
}

/* Style so sánh kết quả */
.comparison-settings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-item label {
  font-size: 14px;
  font-weight: 500;
  color: #475569;
}

.number-input {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.unit {
  font-size: 14px;
  color: #64748b;
  margin-left: -40px;
  padding-left: 4px;
}

.setting-item {
  position: relative;
}

.setting-item .unit {
  position: absolute;
  right: 12px;
  top: 33px;
}

.setting-item input {
  padding-right: 40px;
}

.results-comparison {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.result-card {
  flex: 1;
  min-width: 200px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.result-a {
  border-left: 4px solid #3b82f6;
}

.result-b {
  border-left: 4px solid #f59e0b;
}

.card-header {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1e293b;
}

.card-metric {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
}

.card-metric:last-child {
  border-bottom: none;
}

.metric-label {
  font-size: 13px;
  color: #64748b;
}

.metric-value {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.vs-divider {
  font-size: 20px;
  font-weight: 700;
  color: #94a3b8;
  padding: 0 8px;
}

.statistical-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.summary-item {
  background: white;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.summary-label {
  font-size: 12px;
  color: #64748b;
}

.summary-value {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
}

.summary-value.positive {
  color: #10b981;
}

.summary-value.negative {
  color: #ef4444;
}

.summary-value.neutral {
  color: #64748b;
}

.summary-value.significance.significant {
  color: #10b981;
}

.summary-value.significance.not-significant {
  color: #f59e0b;
}

.confidence-interval {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.ci-header {
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 12px;
}

.ci-values {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 16px;
}

.ci-bound {
  font-weight: 600;
  color: #3b82f6;
}

.ci-arrow {
  color: #94a3b8;
  font-size: 14px;
}

.ci-note {
  text-align: center;
  font-size: 13px;
  color: #64748b;
  margin-top: 12px;
}

/* Style bộ tính cỡ mẫu */
.calc-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 14px;
  font-weight: 500;
  color: #475569;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper .unit {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 0;
  padding-left: 0;
}

.input-wrapper input {
  padding-right: 40px;
}

.select-input {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  width: 100%;
}

.input-hint {
  font-size: 12px;
  color: #94a3b8;
}

.calc-results {
  margin-top: 20px;
}

.result-highlight {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 16px;
}

.highlight-label {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
}

.highlight-value {
  font-size: 36px;
  font-weight: 700;
}

.result-details {
  background: white;
  padding: 16px;
  border-radius: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f1f5f9;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 14px;
  color: #64748b;
}

.detail-value {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

/* Style sai lầm thường gặp */
.pitfall-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pitfall-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid #f59e0b;
}

.pitfall-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.pitfall-icon {
  font-size: 24px;
}

.pitfall-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.pitfall-desc {
  font-size: 14px;
  color: #475569;
  margin-bottom: 12px;
  line-height: 1.6;
}

.pitfall-example {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 8px;
  padding: 12px;
  background: #fef3c7;
  border-radius: 6px;
  line-height: 1.6;
}

.pitfall-solution {
  font-size: 13px;
  color: #059669;
  padding: 12px;
  background: #d1fae5;
  border-radius: 6px;
  line-height: 1.6;
}

/* Style hộp gợi ý */
.tips {
  display: flex;
  gap: 12px;
  background: #fef3c7;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
}

.tips-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.tips-text {
  font-size: 14px;
  color: #92400e;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .results-comparison {
    flex-direction: column;
  }

  .vs-divider {
    transform: rotate(90deg);
  }

  .statistical-summary {
    grid-template-columns: 1fr;
  }
}
</style>
