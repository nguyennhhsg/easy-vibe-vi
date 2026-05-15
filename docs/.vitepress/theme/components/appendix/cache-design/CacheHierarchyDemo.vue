<template>
  <div class="cache-hierarchy-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">Cấu trúc cấp bậc cache</span>
      <span class="subtitle">Dữ liệu luân chuyển giữa các cấp cache như thế nào</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn đi <span class="highlight">siêu thị</span>: trước tiên tìm trong giỏ hàng (cache L1), không có thì ra kệ hàng tìm (cache L2),
      vẫn không có thì vào kho (cache L3). Càng lên trên, tốc độ càng nhanh nhưng dung lượng càng nhỏ; càng xuống dưới, tốc độ càng chậm nhưng dung lượng càng lớn.
    </div>

    <div class="hierarchy-layers">
      <div
        v-for="(layer, index) in layers"
        :key="layer.id"
        class="layer"
        :class="{ active: activeLayer === layer.id }"
        @click="activeLayer = layer.id"
      >
        <div class="layer-header">
          <span class="layer-icon">{{ layer.icon }}</span>
          <span class="layer-name">{{ layer.name }}</span>
        </div>
        <div class="layer-stats">
          <div class="stat">
            <span class="stat-label">Tốc độ</span>
            <span
              class="stat-value"
              :class="layer.speedClass"
            >{{ layer.speed }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Dung lượng</span>
            <span class="stat-value">{{ layer.capacity }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Chi phí</span>
            <span class="stat-value">{{ layer.cost }}</span>
          </div>
        </div>
        <div
          v-if="index < layers.length - 1"
          class="arrow"
        >
          ↓
        </div>
      </div>
    </div>

    <div class="data-flow">
      <div class="flow-title">
        Mô phỏng luồng dữ liệu
      </div>
      <div class="flow-steps">
        <div
          class="flow-step"
          :class="{ active: flowStep >= 1 }"
        >
          <div class="step-number">
            1
          </div>
          <div class="step-text">
            Tra cứu cache L1
          </div>
          <div class="step-time">
            ~1ns
          </div>
        </div>
        <div class="flow-arrow">
          ↓
        </div>
        <div
          class="flow-step"
          :class="{ active: flowStep >= 2 }"
        >
          <div class="step-number">
            2
          </div>
          <div class="step-text">
            Miss, tra L2
          </div>
          <div class="step-time">
            ~10ns
          </div>
        </div>
        <div class="flow-arrow">
          ↓
        </div>
        <div
          class="flow-step"
          :class="{ active: flowStep >= 3 }"
        >
          <div class="step-number">
            3
          </div>
          <div class="step-text">
            Miss, tra L3
          </div>
          <div class="step-time">
            ~100ns
          </div>
        </div>
      </div>
      <button
        class="simulate-btn"
        @click="simulateFlow"
      >
        Mô phỏng tra cứu dữ liệu
      </button>
    </div>

    <div class="comparison-table">
      <div class="table-title">
        So sánh các cấp
      </div>
      <table>
        <thead>
          <tr>
            <th>Cấp</th>
            <th>Tốc độ</th>
            <th>Dung lượng</th>
            <th>Chi phí</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="layer in layers"
            :key="layer.id"
            :class="{ active: activeLayer === layer.id }"
          >
            <td>{{ layer.name }}</td>
            <td>{{ layer.speed }}</td>
            <td>{{ layer.capacity }}</td>
            <td>{{ layer.cost }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý tưởng cốt lõi:</strong> Cache nhiều cấp tận dụng <span class="highlight">nguyên lý cục bộ</span> — chương trình có xu hướng truy cập lại các vị trí dữ liệu vừa truy cập. Đặt dữ liệu hot ở cấp nhanh nhất giúp tăng đáng kể tốc độ truy cập.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeLayer = ref('l1')
const flowStep = ref(0)

const layers = [
  {
    id: 'l1',
    name: 'Cache L1',
    icon: '⚡',
    speed: '~1ns',
    capacity: '~64KB',
    cost: 'Cực cao',
    speedClass: 'fast'
  },
  {
    id: 'l2',
    name: 'Cache L2',
    icon: '🚀',
    speed: '~10ns',
    capacity: '~256KB',
    cost: 'Cao',
    speedClass: 'medium'
  },
  {
    id: 'l3',
    name: 'Cache L3',
    icon: '📦',
    speed: '~100ns',
    capacity: '~8MB',
    cost: 'Trung bình',
    speedClass: 'slow'
  }
]

const simulateFlow = () => {
  flowStep.value = 0
  setTimeout(() => { flowStep.value = 1 }, 300)
  setTimeout(() => { flowStep.value = 2 }, 800)
  setTimeout(() => { flowStep.value = 3 }, 1300)
}
</script>

<style scoped>
.cache-hierarchy-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  max-width: 600px;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.hierarchy-layers {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.layer {
  width: 100%;
  max-width: 400px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s;
}

.layer:hover {
  border-color: var(--vp-c-brand);
}

.layer.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.layer-icon {
  font-size: 1.5rem;
}

.layer-name {
  font-weight: 600;
  font-size: 1rem;
}

.layer-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.stat {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.stat-value {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
}

.stat-value.fast {
  color: #22c55e;
}

.stat-value.medium {
  color: #f59e0b;
}

.stat-value.slow {
  color: #ef4444;
}

.arrow {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  margin: 0.25rem 0;
}

.data-flow {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.flow-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
  width: 100%;
  max-width: 350px;
}

.flow-step.active {
  border-color: var(--vp-c-brand);
  background: #eff6ff;
}

.step-number {
  width: 28px;
  height: 28px;
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
  flex: 1;
  font-weight: 600;
  font-size: 0.9rem;
}

.step-time {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.flow-arrow {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}

.simulate-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.simulate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.table-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.5rem;
  text-align: left;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

tr.active {
  background: #eff6ff;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}

.info-box .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
