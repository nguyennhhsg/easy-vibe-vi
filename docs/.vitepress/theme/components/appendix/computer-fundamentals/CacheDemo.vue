<template>
  <div class="cache-demo">
    <div class="demo-header">
      <span class="title">Nguyên lý Cache</span>
      <span class="subtitle">"Cầu nối" giữa CPU và bộ nhớ</span>
    </div>

    <div class="cache-visualization">
      <div class="cache-levels">
        <div class="level cpu-level">
          <div class="level-label">Nhân CPU</div>
          <div class="level-icon">⚡</div>
        </div>
        
        <div class="arrow-right">→</div>
        
        <div class="level l1-cache" :class="{ active: activeLevel === 'L1' }">
          <div class="level-label">Cache L1</div>
          <div class="level-info">
            <span class="size">64 KB</span>
            <span class="speed">~1ns</span>
          </div>
        </div>
        
        <div class="arrow-right">→</div>
        
        <div class="level l2-cache" :class="{ active: activeLevel === 'L2' }">
          <div class="level-label">Cache L2</div>
          <div class="level-info">
            <span class="size">256 KB</span>
            <span class="speed">~5ns</span>
          </div>
        </div>
        
        <div class="arrow-right">→</div>
        
        <div class="level l3-cache" :class="{ active: activeLevel === 'L3' }">
          <div class="level-label">Cache L3</div>
          <div class="level-info">
            <span class="size">8 MB</span>
            <span class="speed">~15ns</span>
          </div>
        </div>
        
        <div class="arrow-right">→</div>
        
        <div class="level memory" :class="{ active: activeLevel === 'MEM' }">
          <div class="level-label">Bộ nhớ chính</div>
          <div class="level-info">
            <span class="size">16 GB</span>
            <span class="speed">~100ns</span>
          </div>
        </div>
      </div>
    </div>

    <div class="cache-operation">
      <div class="control-panel">
        <div class="panel-title">Demo thao tác cache</div>
        <div class="btn-group">
          <button class="btn" @click="simulateRead(100)">Đọc địa chỉ 100</button>
          <button class="btn" @click="simulateRead(104)">Đọc địa chỉ 104</button>
          <button class="btn" @click="simulateRead(200)">Đọc địa chỉ 200</button>
          <button class="btn" @click="simulateRead(108)">Đọc địa chỉ 108</button>
        </div>
      </div>

      <div class="operation-log">
        <div class="log-title">Nhật ký thao tác</div>
        <div class="log-content">
          <div v-for="(log, i) in logs" :key="i" :class="['log-item', log.type]">
            <span class="log-time">T+{{ log.time }}ns</span>
            <span class="log-text">{{ log.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="locality-explanation">
      <div class="exp-title">Vì sao cache hiệu quả? Nguyên lý cục bộ</div>
      <div class="locality-grid">
        <div class="locality-card">
          <div class="locality-icon">⏱️</div>
          <div class="locality-name">Cục bộ theo thời gian</div>
          <div class="locality-desc">Dữ liệu vừa truy cập rất có khả năng được truy cập lại</div>
          <div class="locality-example">Biến trong vòng lặp</div>
        </div>
        <div class="locality-card">
          <div class="locality-icon">📦</div>
          <div class="locality-name">Cục bộ theo không gian</div>
          <div class="locality-desc">Sau khi truy cập một dữ liệu, các dữ liệu lân cận có thể cũng sẽ được truy cập</div>
          <div class="locality-example">Duyệt mảng, thực thi tuần tự</div>
        </div>
      </div>
    </div>

    <div class="cache-mapping">
      <div class="mapping-title">Phương thức ánh xạ cache</div>
      <div class="mapping-tabs">
        <button 
          v-for="map in mappings" 
          :key="map.type"
          :class="['map-btn', { active: selectedMapping === map.type }]"
          @click="selectedMapping = map.type"
        >
          {{ map.type }}
        </button>
      </div>
      
      <div class="mapping-details" v-if="selectedMappingData">
        <div class="mapping-desc">{{ selectedMappingData.desc }}</div>
        <div class="mapping-compare">
          <div class="compare-item">
            <span class="compare-label">Tốc độ</span>
            <span class="compare-value fast">{{ selectedMappingData.speed }}</span>
          </div>
          <div class="compare-item">
            <span class="compare-label">Tỉ lệ trúng cache</span>
            <span class="compare-value">{{ selectedMappingData.hitRate }}</span>
          </div>
          <div class="compare-item">
            <span class="compare-label">Độ phức tạp triển khai</span>
            <span class="compare-value">{{ selectedMappingData.complexity }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="hit-rate-calc">
      <div class="calc-title">Tính tỷ lệ trúng cache</div>
      <div class="calc-formula">
        <span class="formula">Thời gian truy cập trung bình = H × T<sub>c</sub> + (1-H) × T<sub>m</sub></span>
      </div>
      <div class="calc-example">
        <div class="calc-row">
          <label>Thời gian truy cập cache (Tc):</label>
          <input type="range" v-model="tc" min="1" max="10" />
          <span>{{ tc }} ns</span>
        </div>
        <div class="calc-row">
          <label>Thời gian truy cập RAM (Tm):</label>
          <input type="range" v-model="tm" min="50" max="200" />
          <span>{{ tm }} ns</span>
        </div>
        <div class="calc-row">
          <label>Tỷ lệ trúng cache (H):</label>
          <input type="range" v-model="hitRate" min="0" max="100" />
          <span>{{ hitRate }}%</span>
        </div>
        <div class="calc-result">
          Thời gian truy cập trung bình = {{ avgTime }} ns
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeLevel = ref('')
const logs = ref([])
const tc = ref(2)
const tm = ref(100)
const hitRate = ref(90)
const selectedMapping = ref('Ánh xạ trực tiếp')

const mappings = ref([
  {
    type: 'Ánh xạ trực tiếp',
    desc: 'Mỗi khối bộ nhớ chính chỉ ánh xạ tới một dòng cache duy nhất',
    speed: 'Nhanh nhất',
    hitRate: 'Khá thấp',
    complexity: 'Thấp nhất'
  },
  {
    type: 'Ánh xạ liên kết tập hợp',
    desc: 'Mỗi khối bộ nhớ chính có thể ánh xạ tới N dòng cache (set-associative N đường)',
    speed: 'Khá nhanh',
    hitRate: 'Khá cao',
    complexity: 'Trung bình'
  },
  {
    type: 'Ánh xạ liên kết đầy đủ',
    desc: 'Khối bộ nhớ chính có thể đặt vào bất kỳ dòng cache nào',
    speed: 'Chậm nhất',
    hitRate: 'Cao nhất',
    complexity: 'Cao nhất'
  }
])

const selectedMappingData = computed(() => {
  return mappings.value.find(m => m.type === selectedMapping.value)
})

const avgTime = computed(() => {
  const h = hitRate.value / 100
  return Math.round(h * tc.value + (1 - h) * tm.value)
})

const simulateRead = async (addr) => {
  logs.value = []
  
  if (addr >= 100 && addr < 110) {
    logs.value.push({ time: 0, text: `Đọc địa chỉ ${addr}`, type: 'read' })
    activeLevel.value = 'L1'
    logs.value.push({ time: tc.value, text: '✓ Trúng cache L1!', type: 'hit' })
  } else if (addr >= 200 && addr < 210) {
    logs.value.push({ time: 0, text: `Đọc địa chỉ ${addr}`, type: 'read' })
    activeLevel.value = 'L1'
    logs.value.push({ time: tc.value, text: '✗ Trượt cache L1', type: 'miss' })
    activeLevel.value = 'L2'
    logs.value.push({ time: tc.value + 5, text: '✗ Trượt cache L2', type: 'miss' })
    activeLevel.value = 'MEM'
    logs.value.push({ time: tc.value + 5 + 100, text: 'Tải dữ liệu từ bộ nhớ chính', type: 'load' })
    logs.value.push({ time: tc.value + 5 + 100, text: 'Lưu dữ liệu vào cache', type: 'store' })
  }
}
</script>

<style scoped>
.cache-demo {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.subtitle {
  font-size: 13px;
  color: #64748b;
  margin-left: auto;
}

.cache-visualization {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.cache-levels {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.level {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background: #f1f5f9;
  transition: all 0.3s;
}

.level.active {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.cpu-level {
  background: #fef3c7;
}

.l1-cache.active { background: #dbeafe; border: 2px solid #3b82f6; }
.l2-cache.active { background: #dbeafe; border: 2px solid #2563eb; }
.l3-cache.active { background: #dbeafe; border: 2px solid #1d4ed8; }
.memory.active { background: #dcfce7; border: 2px solid #16a34a; }

.level-label {
  font-size: 11px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.level-icon {
  font-size: 24px;
}

.level-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
}

.size { color: #0369a1; font-weight: 600; }
.speed { color: #64748b; }

.arrow-right {
  font-size: 18px;
  color: #94a3b8;
}

.cache-operation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.control-panel, .operation-log {
  background: white;
  border-radius: 8px;
  padding: 12px;
}

.panel-title, .log-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.btn {
  padding: 8px 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

.btn:hover {
  background: #2563eb;
}

.log-content {
  max-height: 120px;
  overflow-y: auto;
}

.log-item {
  display: flex;
  gap: 8px;
  padding: 4px 0;
  font-size: 11px;
}

.log-time {
  color: #64748b;
  min-width: 50px;
}

.log-item.hit .log-text { color: #16a34a; }
.log-item.miss .log-text { color: #ea580c; }
.log-item.load .log-text { color: #0369a1; }

.locality-explanation {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.exp-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.locality-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.locality-card {
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  text-align: center;
}

.locality-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.locality-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.locality-desc {
  font-size: 11px;
  color: #64748b;
  margin: 8px 0;
}

.locality-example {
  font-size: 10px;
  padding: 4px 8px;
  background: #e0f2fe;
  border-radius: 4px;
  color: #0369a1;
}

.cache-mapping {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.mapping-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.mapping-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.map-btn {
  padding: 8px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 13px;
}

.map-btn.active {
  border-color: #3b82f6;
  background: #eff6ff;
}

.mapping-desc {
  font-size: 12px;
  color: #475569;
  margin-bottom: 12px;
}

.mapping-compare {
  display: flex;
  gap: 16px;
}

.compare-item {
  display: flex;
  flex-direction: column;
}

.compare-label {
  font-size: 10px;
  color: #64748b;
}

.compare-value {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
}

.compare-value.fast { color: #16a34a; }

.hit-rate-calc {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.calc-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.calc-formula {
  text-align: center;
  margin-bottom: 16px;
}

.formula {
  font-family: monospace;
  font-size: 14px;
  color: #0369a1;
}

.calc-example {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.calc-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.calc-row label {
  min-width: 120px;
  color: #475569;
}

.calc-row input {
  flex: 1;
}

.calc-result {
  margin-top: 12px;
  padding: 12px;
  background: #dcfce7;
  border-radius: 6px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #166534;
}
</style>
