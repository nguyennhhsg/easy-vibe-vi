<template>
  <div class="demo data-tracking-demo">

    <!-- Methods: cùng tình huống, ba cách thu thập -->
    <div v-if="activeTab === 'methods'" class="content">
      <div class="scenario-bar">Tình huống: user bấm nút "Thêm vào giỏ" trong app e-commerce</div>
      <table class="capture-table">
        <thead>
          <tr>
            <th class="col-dim">Thông tin thu thập được</th>
            <th>Code tracking</th>
            <th>Visual tracking</th>
            <th>Auto tracking</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in captureRows" :key="row.label">
            <td class="col-dim">{{ row.label }}</td>
            <td><span :class="row.code ? 'yes' : 'no'">{{ row.code ? '✔' : '✘' }}</span></td>
            <td><span :class="row.visual ? 'yes' : 'no'">{{ row.visual ? '✔' : '✘' }}</span></td>
            <td><span :class="row.auto ? 'yes' : 'no'">{{ row.auto ? '✔' : '✘' }}</span></td>
          </tr>
        </tbody>
      </table>
      <div class="capture-footer">
        <span class="cf-item"><span class="yes">✔</span> Thu thập được</span>
        <span class="cf-item"><span class="no">✘</span> Không thu thập được</span>
      </div>
    </div>

    <!-- Model: bấm để xem JSON được lắp từng dòng -->
    <div v-if="activeTab === 'model'" class="content">
      <div class="sim-header">
        <button class="sim-btn" @click="runSimulation" :disabled="simRunning">
          {{ simRunning ? 'Đang sinh bản ghi...' : 'Mô phỏng: user bấm "Thêm vào giỏ"' }}
        </button>
      </div>
      <div class="json-build">
        <div class="json-line" v-for="(line, i) in jsonLines" :key="i"
             :class="{ visible: simStep > i, highlight: simStep === i + 1 }">
          <span class="line-tag" :style="{ background: line.color }">{{ line.tag }}</span>
          <code>{{ line.code }}</code>
        </div>
      </div>
      <div class="sim-hint" v-if="simStep === 0">Bấm nút phía trên để xem một bản ghi tracking được lắp ráp thế nào</div>
    </div>

    <!-- Pipeline: animation luồng dữ liệu -->
    <div v-if="activeTab === 'pipeline'" class="content">
      <div class="pipe-visual">
        <div class="pipe-stage" v-for="(s, i) in pipeStages" :key="i">
          <div class="stage-icon" :style="{ background: s.bg }">{{ s.icon }}</div>
          <div class="stage-name">{{ s.name }}</div>
        </div>
        <div class="pipe-track">
          <div class="packet" :class="{ flying: pipeFlying }"
               v-for="n in 3" :key="n"
               :style="{ animationDelay: (n - 1) * 0.6 + 's' }">
          </div>
        </div>
      </div>
      <button class="sim-btn pipe-btn" @click="startPipeAnim">
        {{ pipeFlying ? 'Đang truyền...' : 'Mô phỏng: gửi một batch dữ liệu' }}
      </button>
      <div class="pipe-legend">
        <span v-for="(s, i) in pipeStages" :key="i" class="legend-item">
          <span class="legend-dot" :style="{ background: s.bg }"></span>{{ s.label }}
        </span>
      </div>
    </div>

    <!-- ETL: so sánh dữ liệu before / after -->
    <div v-if="activeTab === 'overview'" class="content">
      <div class="etl-compare">
        <div class="etl-side etl-before">
          <div class="etl-side-title">Dữ liệu thô (server nhận được)</div>
          <div class="etl-row-data" v-for="(r, i) in rawData" :key="i" :class="r.issue">
            <code>{{ r.text }}</code>
            <span class="issue-tag" v-if="r.tag">{{ r.tag }}</span>
          </div>
        </div>
        <div class="etl-arrow-col">
          <div class="etl-arrow-label">ETL làm sạch</div>
          <div class="etl-arrow-icon">→</div>
        </div>
        <div class="etl-side etl-after">
          <div class="etl-side-title">Sau khi làm sạch (ghi vào data warehouse)</div>
          <div class="etl-row-data clean" v-for="(r, i) in cleanData" :key="i">
            <code>{{ r }}</code>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  tab: { type: String, default: 'overview' }
})
const activeTab = ref(props.tab)

// === Methods tab: cùng tình huống, ba phương thức ===
const captureRows = [
  { label: 'Bấm nút nào', code: true, visual: true, auto: true },
  { label: 'Thời điểm bấm', code: true, visual: true, auto: true },
  { label: 'Người dùng ở lại bao lâu', code: false, visual: false, auto: true },
  { label: 'Tên / giá sản phẩm', code: true, visual: false, auto: false },
  { label: 'Đã dùng voucher nào', code: true, visual: false, auto: false },
  { label: 'Số dư tài khoản', code: true, visual: false, auto: false },
  { label: 'Quỹ đạo cuộn trang', code: false, visual: false, auto: true }
]

// === Model tab: mô phỏng JSON được ráp từng dòng ===
const simStep = ref(0)
const simRunning = ref(false)
const jsonLines = [
  { tag: 'What', color: '#10b981', code: '"event": "add_to_cart"' },
  { tag: 'Who', color: '#3b82f6', code: '"user_id": "u_98765"' },
  { tag: 'When', color: '#8b5cf6', code: '"time": "2025-08-12T10:33:09Z"' },
  { tag: 'Where', color: '#f59e0b', code: '"device": "iPhone 15", "network": "5G"' },
  { tag: 'What', color: '#10b981', code: '"product": "Điện thoại mới", "price": 2999' }
]

function runSimulation() {
  if (simRunning.value) return
  simRunning.value = true
  simStep.value = 0
  let i = 0
  const timer = setInterval(() => {
    i++
    simStep.value = i
    if (i >= jsonLines.length) {
      clearInterval(timer)
      simRunning.value = false
    }
  }, 600)
}

// === Pipeline tab: animation luồng dữ liệu ===
const pipeFlying = ref(false)
const pipeStages = [
  { icon: '📱', name: 'Điện thoại', label: 'Sinh dữ liệu', bg: '#e0f2fe' },
  { icon: '📦', name: 'Đóng gói', label: 'Gom batch', bg: '#fef08a' },
  { icon: '🌐', name: 'Gửi', label: 'Truyền qua mạng', bg: '#fed7aa' },
  { icon: '🚦', name: 'Xếp hàng', label: 'Message queue', bg: '#fecaca' },
  { icon: '🗄️', name: 'Lưu', label: 'Data warehouse', bg: '#bbf7d0' }
]

function startPipeAnim() {
  if (pipeFlying.value) return
  pipeFlying.value = true
  setTimeout(() => { pipeFlying.value = false }, 3000)
}

// === ETL tab: so sánh before / after ===
const rawData = [
  { text: 'id-001  userId: "anh"   add_to_cart  2999k', issue: '', tag: '' },
  { text: 'id-001  userId: "anh"   add_to_cart  2999k', issue: 'dup', tag: 'Trùng' },
  { text: 'id-002  user_id: "binh" click_buy    0k', issue: '', tag: '' },
  { text: 'id-003  userId: "cuong" pay  1970-01-01', issue: 'bad', tag: 'Time sai' },
  { text: 'id-004  user_id: "dung" click_buy    599k', issue: '', tag: '' }
]

const cleanData = [
  'id-001  user_id: "anh"   add_to_cart  2999k',
  'id-002  user_id: "binh"  click_buy    0k',
  'id-004  user_id: "dung"  click_buy    599k'
]
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.content {
  padding: 24px;
  background: #f8fafc;
}

.dark .content {
  background: var(--vp-c-bg-soft);
}

.sim-btn {
  display: block;
  margin: 0 auto 20px;
  padding: 10px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.sim-btn:hover:not(:disabled) { background: #2563eb; }
.sim-btn:disabled { opacity: 0.6; cursor: not-allowed; }

/* === Methods: Capture Table === */
.scenario-bar {
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  background: #e0f2fe;
  padding: 10px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.capture-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  font-size: 13px;
}

.capture-table th,
.capture-table td {
  padding: 10px 14px;
  text-align: center;
  border-bottom: 1px solid #f1f5f9;
}

.capture-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #475569;
  font-size: 13px;
}

.col-dim {
  text-align: left !important;
  font-weight: 500;
  color: #1e293b;
}

.yes { color: #16a34a; font-weight: 700; }
.no { color: #dc2626; opacity: 0.4; }

.capture-footer {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 12px;
  font-size: 12px;
  color: #64748b;
}

.cf-item { display: flex; align-items: center; gap: 4px; }

/* === Model: lắp ráp JSON từng dòng === */
.sim-header {
  text-align: center;
}

.json-build {
  background: #1e293b;
  border-radius: 8px;
  padding: 20px 24px;
  min-height: 180px;
}

.json-line {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.4s ease;
}

.json-line.visible {
  opacity: 1;
  transform: translateY(0);
}

.json-line.highlight {
  background: rgba(56, 189, 248, 0.08);
  border-radius: 4px;
  margin: 0 -8px;
  padding: 6px 8px;
}

.line-tag {
  font-size: 11px;
  font-weight: 700;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  flex-shrink: 0;
  min-width: 44px;
  text-align: center;
}

.json-line code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  color: #cbd5e1;
}

.sim-hint {
  text-align: center;
  font-size: 13px;
  color: #94a3b8;
  margin-top: 12px;
}

/* === Pipeline: animation luồng dữ liệu === */
.pipe-visual {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 28px 24px;
  margin-bottom: 16px;
}

.pipe-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 1;
}

.stage-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.stage-name {
  font-size: 12px;
  font-weight: 600;
  color: #475569;
}

.pipe-track {
  position: absolute;
  top: 50%;
  left: 60px;
  right: 60px;
  height: 3px;
  background: #e2e8f0;
  transform: translateY(-8px);
}

.packet {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #3b82f6;
  border-radius: 50%;
  top: -3.5px;
  left: 0;
  opacity: 0;
}

.packet.flying {
  animation: fly-across 2.4s ease-in-out forwards;
}

@keyframes fly-across {
  0% { left: 0; opacity: 0; }
  5% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

.pipe-btn {
  margin-bottom: 12px;
}

.pipe-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 12px;
  color: #64748b;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

/* === ETL: so sánh Before / After === */
.etl-compare {
  display: flex;
  gap: 0;
  align-items: stretch;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  background: white;
}

.etl-side {
  flex: 1;
  padding: 16px;
}

.etl-before {
  background: #fefce8;
}

.etl-after {
  background: #f0fdf4;
}

.etl-side-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.etl-before .etl-side-title { color: #854d0e; }
.etl-after .etl-side-title { color: #166534; }

.etl-arrow-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  gap: 4px;
  flex-shrink: 0;
  background: #f1f5f9;
}

.etl-arrow-label {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  white-space: nowrap;
}

.etl-arrow-icon {
  font-size: 22px;
  color: #94a3b8;
}

.etl-row-data {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 11px;
  padding: 6px 8px;
  border-radius: 4px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475569;
}

.etl-row-data:last-child { margin-bottom: 0; }

.etl-row-data.dup {
  background: #fef2f2;
  text-decoration: line-through;
  color: #991b1b;
  opacity: 0.7;
}

.etl-row-data.bad {
  background: #fff7ed;
  color: #9a3412;
  opacity: 0.7;
}

.etl-row-data.clean {
  color: #166534;
}

.issue-tag {
  font-family: sans-serif;
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 3px;
  flex-shrink: 0;
  background: #fecaca;
  color: #991b1b;
}

/* Responsive */
@media (max-width: 640px) {
  .capture-table { font-size: 12px; }
  .capture-table th,
  .capture-table td { padding: 8px 8px; }

  .etl-compare { flex-direction: column; }

  .etl-arrow-col {
    flex-direction: row;
    padding: 8px;
  }

  .pipe-visual { padding: 20px 12px; }
  .stage-name { font-size: 10px; }
}
</style>
