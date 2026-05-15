<script setup>
import { ref } from 'vue'

const phase = ref('mark')
const isAnimating = ref(false)
const currentStep = ref(0)

const objects = ref([
  { id: 1, name: 'obj1', color: '#68d391', marked: false, collected: false },
  { id: 2, name: 'obj2', color: '#4299e1', marked: false, collected: false },
  { id: 3, name: 'obj3', color: '#ed8936', marked: false, collected: false },
  { id: 4, name: 'obj4', color: '#f687b3', marked: false, collected: false },
  { id: 5, name: 'obj5', color: '#a3bffa', marked: false, collected: false },
  { id: 6, name: 'obj6', color: '#fc8181', marked: false, collected: false }
])

const references = ref([
  { from: 'root', to: 1, active: false },
  { from: 1, to: 2, active: false },
  { from: 1, to: 3, active: false },
  { from: 3, to: 4, active: false }
])

const phases = [
  { name: 'mark', label: 'Pha mark', description: 'Bắt đầu từ root object, đánh dấu mọi object còn truy cập được' },
  { name: 'sweep', label: 'Pha sweep', description: 'Thu hồi những object chưa được đánh dấu' }
]

const steps = [
  { phase: 'mark', action: 'mark-root', description: 'Bắt đầu mark từ root object' },
  { phase: 'mark', action: 'mark-1', description: 'Mark obj1 (root tham chiếu)' },
  { phase: 'mark', action: 'mark-2', description: 'Mark obj2 (obj1 tham chiếu)' },
  { phase: 'mark', action: 'mark-3', description: 'Mark obj3 (obj1 tham chiếu)' },
  { phase: 'mark', action: 'mark-4', description: 'Mark obj4 (obj3 tham chiếu)' },
  { phase: 'sweep', action: 'collect-5', description: 'Thu hồi obj5 (chưa mark)' },
  { phase: 'sweep', action: 'collect-6', description: 'Thu hồi obj6 (chưa mark)' },
  { phase: 'done', action: 'finish', description: 'Garbage collection hoàn tất' }
]

const reset = () => {
  currentStep.value = 0
  phase.value = 'mark'
  isAnimating.value = false
  objects.value.forEach(obj => {
    obj.marked = false
    obj.collected = false
  })
  references.value.forEach(ref => {
    ref.active = false
  })
}

const nextStep = () => {
  if (currentStep.value >= steps.length) return

  const step = steps[currentStep.value]

  switch (step.action) {
    case 'mark-root':
      references.value[0].active = true
      break
    case 'mark-1':
      objects.value[0].marked = true
      references.value[1].active = true
      references.value[2].active = true
      break
    case 'mark-2':
      objects.value[1].marked = true
      break
    case 'mark-3':
      objects.value[2].marked = true
      references.value[3].active = true
      break
    case 'mark-4':
      objects.value[3].marked = true
      phase.value = 'sweep'
      break
    case 'collect-5':
      objects.value[4].collected = true
      break
    case 'collect-6':
      objects.value[5].collected = true
      phase.value = 'done'
      break
    case 'finish':
      phase.value = 'done'
      break
  }

  currentStep.value++
}

const play = async () => {
  if (isAnimating.value) return
  isAnimating.value = true
  reset()

  while (currentStep.value < steps.length && isAnimating.value) {
    nextStep()
    await new Promise(resolve => setTimeout(resolve, 1200))
  }

  isAnimating.value = false
}

const stop = () => {
  isAnimating.value = false
}
</script>

<template>
  <div class="garbage-collection-demo">
    <h3>Cơ chế garbage collection</h3>

    <!-- Chỉ báo pha -->
    <div class="phase-indicator">
      <div class="phase-tabs">
        <div
          v-for="p in phases"
          :key="p.name"
          :class="{ 'active': phase === p.name }"
          class="phase-tab"
        >
          <span class="phase-label">{{ p.label }}</span>
          <span class="phase-description">{{ p.description }}</span>
        </div>
      </div>
    </div>

    <!-- Sơ đồ quan hệ object -->
    <div class="graph-container">
      <div class="graph-header">
        <h4>Quan hệ tham chiếu giữa các object</h4>
        <div class="legend">
          <div class="legend-item">
            <span class="legend-color unmarked" />
            <span>Chưa mark</span>
          </div>
          <div class="legend-item">
            <span class="legend-color marked" />
            <span>Đã mark (còn truy cập được)</span>
          </div>
          <div class="legend-item">
            <span class="legend-color collected" />
            <span>Đã thu hồi</span>
          </div>
        </div>
      </div>

      <div class="object-graph">
        <!-- Root object -->
        <div class="root-object">
          <div class="object-box root">
            <div class="object-icon">
              🌳
            </div>
            <div class="object-name">
              Root
            </div>
          </div>
        </div>

        <!-- Object node -->
        <div class="objects-grid">
          <div
            v-for="obj in objects"
            :key="obj.id"
            class="object-node"
            :class="{
              'marked': obj.marked,
              'collected': obj.collected
            }"
          >
            <div
              class="object-box"
              :style="{ borderColor: obj.color }"
            >
              <div
                class="object-icon"
                :style="{ background: obj.color }"
              >
                {{ obj.collected ? '💀' : '📦' }}
              </div>
              <div class="object-name">
                {{ obj.name }}
              </div>
              <div
                v-if="obj.marked"
                class="object-status"
              >
                Truy cập được
              </div>
              <div
                v-if="obj.collected"
                class="object-status collected"
              >
                Đã thu hồi
              </div>
            </div>
          </div>
        </div>

        <!-- Đường tham chiếu (vẽ bằng SVG) -->
        <svg
          class="connections"
          viewBox="0 0 600 400"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#a0aec0"
              />
            </marker>
          </defs>
          <!-- Root -> obj1 -->
          <line
            x1="80"
            y1="200"
            x2="180"
            y2="100"
            :class="{ 'active': references[0].active }"
            marker-end="url(#arrowhead)"
          />
          <!-- obj1 -> obj2 -->
          <line
            x1="220"
            y1="120"
            x2="220"
            y2="180"
            :class="{ 'active': references[1].active }"
            marker-end="url(#arrowhead)"
          />
          <!-- obj1 -> obj3 -->
          <line
            x1="260"
            y1="120"
            x2="380"
            y2="120"
            :class="{ 'active': references[2].active }"
            marker-end="url(#arrowhead)"
          />
          <!-- obj3 -> obj4 -->
          <line
            x1="400"
            y1="140"
            x2="400"
            y2="200"
            :class="{ 'active': references[3].active }"
            marker-end="url(#arrowhead)"
          />
        </svg>
      </div>
    </div>

    <!-- Mô tả bước hiện tại -->
    <div class="step-description">
      <div class="step-content">
        <strong>Thao tác hiện tại:</strong>
        <span v-if="currentStep < steps.length">
          {{ steps[currentStep].description }}
        </span>
        <span v-else>
          Garbage collection hoàn tất
        </span>
      </div>
    </div>

    <!-- Nút điều khiển -->
    <div class="controls">
      <button
        :disabled="isAnimating"
        class="btn-play"
        @click="play"
      >
        {{ isAnimating ? 'Đang chạy...' : 'Tự chạy demo' }}
      </button>
      <button
        :disabled="isAnimating || currentStep >= steps.length"
        class="btn-step"
        @click="nextStep"
      >
        Chạy từng bước
      </button>
      <button
        :disabled="!isAnimating"
        class="btn-stop"
        @click="stop"
      >
        Dừng
      </button>
      <button
        :disabled="isAnimating"
        class="btn-reset"
        @click="reset"
      >
        Reset
      </button>
    </div>

    <!-- Mô tả thuật toán -->
    <div class="algorithm-box">
      <h4>Thuật toán Mark-and-Sweep</h4>
      <div class="algorithm-steps">
        <div class="algorithm-step">
          <span class="step-number">1</span>
          <div class="step-content">
            <strong>Pha mark</strong>
            <p>Bắt đầu từ root object, duyệt mọi object truy cập được và đánh dấu là "active object"</p>
          </div>
        </div>
        <div class="algorithm-step">
          <span class="step-number">2</span>
          <div class="step-content">
            <strong>Pha sweep</strong>
            <p>Duyệt toàn bộ heap, thu hồi mọi object chưa được mark</p>
          </div>
        </div>
        <div class="algorithm-step">
          <span class="step-number">3</span>
          <div class="step-content">
            <strong>Reset mark</strong>
            <p>Xoá tất cả mark bit, chuẩn bị cho lần garbage collection kế tiếp</p>
          </div>
        </div>
      </div>

      <div class="key-points">
        <h5>Điểm cốt lõi</h5>
        <ul>
          <li><strong>Root object:</strong> Biến toàn cục, biến trên stack... luôn được coi là truy cập được</li>
          <li><strong>Object truy cập được:</strong> Object mà từ root có thể đi tới qua chuỗi tham chiếu</li>
          <li><strong>Object rác:</strong> Object không thể truy cập từ root, sẽ bị thu hồi</li>
          <li><strong>Circular reference:</strong> Nếu hai object tham chiếu lẫn nhau nhưng không truy cập được từ root, vẫn bị thu hồi</li>
        </ul>
      </div>
    </div>

    <!-- Ứng dụng thực tế -->
    <div class="practical-tips">
      <h4>Mẹo áp dụng thực tế</h4>
      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-icon">
            💡
          </div>
          <div class="tip-content">
            <strong>Bỏ tham chiếu đúng lúc</strong>
            <p>Khi không dùng object nữa thì gán nó về null</p>
          </div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">
            🔒
          </div>
          <div class="tip-content">
            <strong>Tránh biến toàn cục vô tình</strong>
            <p>Dùng const/let thay cho var</p>
          </div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">
            🧹
          </div>
          <div class="tip-content">
            <strong>Dọn event listener</strong>
            <p>Khi component bị hủy thì gỡ hết listener</p>
          </div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">
            📊
          </div>
          <div class="tip-content">
            <strong>Kiểm tra bộ nhớ định kỳ</strong>
            <p>Dùng panel Memory trong devtools để theo dõi</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.garbage-collection-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  background: var(--vp-c-bg);
}

h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

h5 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.phase-indicator {
  margin-bottom: 20px;
}

.phase-tabs {
  display: flex;
  gap: 12px;
}

.phase-tab {
  flex: 1;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.phase-tab.active {
  border-color: var(--vp-c-brand-1);
  background: rgba(62, 175, 124, 0.1);
}

.phase-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.phase-description {
  display: block;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.graph-container {
  margin-bottom: 20px;
}

.graph-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.legend {
  display: flex;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid;
}

.legend-color.unmarked {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-border);
}

.legend-color.marked {
  background: rgba(104, 217, 145, 0.2);
  border-color: #68d391;
}

.legend-color.collected {
  background: rgba(245, 101, 101, 0.2);
  border-color: #f56565;
}

.object-graph {
  position: relative;
  height: 400px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.root-object {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.objects-grid {
  position: absolute;
  left: 150px;
  top: 20px;
  right: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.object-node {
  transition: all 0.3s ease;
}

.object-box {
  padding: 16px;
  background: var(--vp-c-bg);
  border: 3px solid var(--vp-c-border);
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
}

.object-box.root {
  border-color: var(--vp-c-brand-1);
  background: rgba(62, 175, 124, 0.1);
}

.object-node.marked .object-box {
  border-color: #68d391;
  background: rgba(104, 217, 145, 0.1);
}

.object-node.collected .object-box {
  border-color: #f56565;
  background: rgba(245, 101, 101, 0.1);
  opacity: 0.5;
}

.object-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: var(--vp-c-bg-soft);
}

.object-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.object-status {
  font-size: 12px;
  font-weight: 600;
}

.object-status:not(.collected) {
  color: #68d391;
}

.object-status.collected {
  color: #f56565;
}

.connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.connections line {
  stroke: #a0aec0;
  stroke-width: 2;
  transition: all 0.3s ease;
}

.connections line.active {
  stroke: var(--vp-c-brand-1);
  stroke-width: 3;
  animation: pulse 1s ease infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.step-description {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  margin-bottom: 20px;
}

.step-content {
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.step-content strong {
  color: var(--vp-c-brand-1);
}

.controls {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}

.btn-play {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-play:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}

.btn-step {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.btn-step:hover:not(:disabled) {
  background: var(--vp-c-bg-soft-hover);
}

.btn-stop {
  background: #ed8936;
  color: white;
}

.btn-stop:hover:not(:disabled) {
  background: #dd6b20;
}

.btn-reset {
  background: #f56565;
  color: white;
}

.btn-reset:hover:not(:disabled) {
  background: #e53e3e;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.algorithm-box {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.algorithm-steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.algorithm-step {
  display: flex;
  gap: 16px;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
}

.algorithm-step .step-content {
  flex: 1;
}

.algorithm-step strong {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.algorithm-step p {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.key-points {
  padding: 16px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.key-points ul {
  margin: 0;
  padding-left: 20px;
}

.key-points li {
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.key-points strong {
  color: var(--vp-c-text-1);
}

.practical-tips {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.tip-card {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.tip-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
}

.tip-content strong {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.tip-content p {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
