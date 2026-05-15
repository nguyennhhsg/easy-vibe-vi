<template>
  <div class="btree-demo">
    <div class="demo-header">
      <span class="icon">🌳</span>
      <span class="title">Demo index B+ tree</span>
      <span class="subtitle">Hiểu cách database tra cứu dữ liệu nhanh</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn tra một chữ trong <span class="highlight">từ điển</span>. Bạn sẽ xem mục lục trước, định vị tới vùng chữ cái đầu, rồi tìm số trang cụ thể trong vùng đó. B+ tree chính là <span class="highlight">mục lục nhiều tầng</span> như vậy, giúp database tìm mục tiêu trong 1 tỷ bản ghi chỉ qua 3 bước.
    </div>

    <div class="comparison">
      <div class="compare-card scan">
        <div class="card-header">
          <span class="icon">🐢</span>
          <span class="title">Quét toàn bảng</span>
        </div>
        <div class="card-content">
          <div class="data-rows">
            <div
              v-for="i in 20"
              :key="i"
              class="data-row"
              :class="{ found: scanMode === 'found' && i === targetId }"
            >
              <span class="row-id">{{ String(i).padStart(3, '0') }}</span>
              <span class="row-name">User {{ i }}</span>
            </div>
          </div>
          <div class="scan-info">
            <p v-if="!scanMode">
              👆 Nhấn "Bắt đầu tìm" để xem quét toàn bảng chậm đến đâu
            </p>
            <p v-else-if="scanMode === 'scanning'">
              Đang quét... bản ghi thứ {{ scanCount }}
            </p>
            <p
              v-else
              class="found"
            >
              ✅ Tìm thấy! Đã quét {{ scanCount }} bản ghi, mất {{ scanTime }}s
            </p>
          </div>
          <button
            v-if="!scanMode"
            class="btn"
            @click="startScan"
          >
            Bắt đầu tìm
          </button>
        </div>
      </div>

      <div class="compare-card index">
        <div class="card-header">
          <span class="icon">⚡</span>
          <span class="title">Tra cứu bằng index</span>
        </div>
        <div class="card-content">
          <div class="tree-structure">
            <div class="tree-level root">
              <div class="node-label">
                Node gốc
              </div>
              <div class="node">
                1-100
              </div>
            </div>
            <div class="tree-level intermediate">
              <div class="node-label">
                Node trung gian
              </div>
              <div class="node">
                1-10
              </div>
            </div>
            <div class="tree-level leaf">
              <div class="node-label">
                Node lá
              </div>
              <div
                v-for="i in 10"
                :key="i"
                class="node leaf-node"
                :class="{ found: indexMode === 'found' && i === targetId }"
              >
                {{ i }}
              </div>
            </div>
          </div>
          <div class="index-info">
            <p v-if="!indexMode">
              👆 Nhấn "Bắt đầu tìm" để xem index nhanh đến đâu
            </p>
            <p v-else-if="indexMode === 'searching'">
              Đang tìm... bước {{ indexStep }}
            </p>
            <p
              v-else
              class="found"
            >
              ✅ Tìm thấy! Chỉ qua {{ indexSteps.length }} bước, mất {{ indexTime }}s
            </p>
          </div>
          <button
            v-if="!indexMode"
            class="btn"
            @click="startIndex"
          >
            Bắt đầu tìm
          </button>
        </div>
      </div>
    </div>

    <div class="stats-box">
      <div class="stat-item">
        <div class="stat-label">
          Số lượng dữ liệu
        </div>
        <div class="stat-value">
          1 triệu bản ghi
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-label">
          Quét toàn bảng
        </div>
        <div class="stat-value slow">
          Trung bình 500k lần so sánh
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-label">
          Index B+ tree
        </div>
        <div class="stat-value fast">
          Chỉ 3 lần so sánh
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-label">
          Tăng tốc
        </div>
        <div class="stat-value highlight">
          100.000 lần+
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Nguyên lý cốt lõi:</strong> B+ tree dùng thiết kế "thấp và rộng", chiều cao cây chỉ 3-4 tầng. Mỗi tầng có thể chứa hàng trăm đến hàng nghìn key, nên 1 tỷ bản ghi cũng chỉ cần 3 lần I/O đĩa. Đây là bí quyết giúp truy vấn database cực nhanh.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const targetId = ref(7)
const scanMode = ref(null)
const scanCount = ref(0)
const scanTime = ref(0)
const indexMode = ref(null)
const indexStep = ref(0)
const indexSteps = ref([])
const indexTime = ref(0)

const startScan = () => {
  scanMode.value = 'scanning'
  scanCount.value = 0
  let count = 0

  const interval = setInterval(() => {
    count += Math.floor(Math.random() * 3) + 1
    scanCount.value = count

    if (count >= targetId.value) {
      clearInterval(interval)
      scanMode.value = 'found'
      scanTime.value = (count * 0.001).toFixed(3)
    }
  }, 30)
}

const startIndex = () => {
  indexMode.value = 'searching'
  indexStep.value = 0
  indexSteps.value = ['Node gốc', 'Node trung gian', 'Node lá']

  let currentStep = 0

  const interval = setInterval(() => {
    currentStep++
    indexStep.value = currentStep

    if (currentStep >= 3) {
      clearInterval(interval)
      indexMode.value = 'found'
      indexTime.value = (0.003).toFixed(3)
    }
  }, 500)
}
</script>

<style scoped>
.btree-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
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

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .comparison {
    grid-template-columns: 1fr;
  }
}

.compare-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.card-header .icon { font-size: 1rem; }
.card-header .title { font-weight: 600; font-size: 0.85rem; }

.card-content {
  padding: 0.75rem;
}

.data-rows {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
  margin-bottom: 0.75rem;
}

.data-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.65rem;
  transition: background 0.2s;
}

.data-row.found {
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid #22c55e;
}

.row-id {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.row-name {
  color: var(--vp-c-text-3);
}

.tree-structure {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tree-level {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.node-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
}

.node {
  padding: 6px 12px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  min-width: 60px;
  text-align: center;
}

.leaf {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
}

.leaf-node {
  min-width: 28px;
  padding: 4px 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.leaf-node.found {
  background: rgba(34, 197, 94, 0.2);
  border-color: #22c55e;
  color: #22c55e;
}

.scan-info, .index-info {
  text-align: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scan-info .found, .index-info .found {
  color: #22c55e;
  font-weight: 500;
}

.btn {
  width: 100%;
  padding: 8px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn:hover {
  background: var(--vp-c-brand-1);
}

.stats-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .stats-box {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-item {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stat-value.slow {
  color: #ef4444;
}

.stat-value.fast {
  color: #22c55e;
}

.stat-value.highlight {
  color: var(--vp-c-brand-1);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box .icon { margin-right: 0.25rem; }
</style>
