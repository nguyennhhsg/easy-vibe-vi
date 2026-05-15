<script setup>
import { ref } from 'vue'

const searchQuery = ref(55)
const isSearching = ref(false)
const scanCurrentIndex = ref(-1)
const treeActiveNodes = ref([])
const searchResult = ref(null)
const mode = ref('scan') // 'scan' or 'index'

const DATA_SIZE = 64
const data = Array.from({ length: DATA_SIZE }, (_, i) => ({
  id: i + 1,
  value: `Data-${i + 1}`
}))

// Simplified Tree Search Simulation (Binary Search steps)
const startSearch = async () => {
  if (isSearching.value) return
  isSearching.value = true
  scanCurrentIndex.value = -1
  treeActiveNodes.value = []
  searchResult.value = null

  const target = Number(searchQuery.value)

  if (mode.value === 'scan') {
    for (let i = 0; i < data.length; i++) {
      scanCurrentIndex.value = i
      await new Promise((r) => setTimeout(r, 30)) // 30ms per step
      if (data[i].id === target) {
        searchResult.value = data[i]
        break
      }
    }
  } else {
    // Tree Search Simulation (Binary Search steps)
    let start = 0
    let end = data.length - 1

    while (start <= end) {
      let mid = Math.floor((start + end) / 2)
      treeActiveNodes.value.push(mid) // Highlight the "node" we are checking
      await new Promise((r) => setTimeout(r, 400)) // Slower steps for tree to be visible

      if (data[mid].id === target) {
        searchResult.value = data[mid]
        break
      } else if (data[mid].id < target) {
        start = mid + 1
      } else {
        end = mid - 1
      }
    }
  }

  isSearching.value = false
}
</script>

<template>
  <div class="db-index-demo">
    <div class="demo-header">
      <span class="icon">🔍</span>
      <span class="title">Demo tìm kiếm có index</span>
      <span class="subtitle">Full table scan vs index lookup</span>
    </div>

    <div class="intro-text">
      Hãy hình dung bạn đang ở <span class="highlight">thư viện</span> tìm cuốn "Nguyên lý CSDL". Nếu không có mục lục, bạn phải đi từng kệ. Có số sách thì đến thẳng khu đó lấy. Index của database giống như <span class="highlight">số sách</span>: tốc độ tìm từ "lật hết mọi sách" thành "đi thẳng tới".
    </div>

    <div class="controls-area">
      <div class="input-group">
        <label>Tìm ID:</label>
        <el-input-number
          v-model="searchQuery"
          :min="1"
          :max="DATA_SIZE"
          size="small"
          :disabled="isSearching"
        />
      </div>

      <div class="mode-selector">
        <button
          class="mode-btn"
          :class="{ active: mode === 'scan' }"
          :disabled="isSearching"
          @click="mode = 'scan'"
        >
          🐢 Full table scan O(n)
        </button>
        <button
          class="mode-btn"
          :class="{ active: mode === 'index' }"
          :disabled="isSearching"
          @click="mode = 'index'"
        >
          ⚡ Index lookup O(log n)
        </button>
      </div>

      <button
        class="search-btn"
        :disabled="isSearching"
        @click="startSearch"
      >
        {{ isSearching ? 'Đang tìm...' : 'Bắt đầu tìm' }}
      </button>
    </div>

    <div class="visualization-area">
      <!-- Full Scan Visualization -->
      <div
        v-if="mode === 'scan'"
        class="view-container scan-view"
      >
        <div class="grid">
          <div
            v-for="(item, index) in data"
            :key="item.id"
            class="data-block"
            :class="{
              active: index === scanCurrentIndex,
              found: searchResult && searchResult.id === item.id,
              dimmed: scanCurrentIndex >= 0 && index > scanCurrentIndex
            }"
          >
            {{ item.id }}
          </div>
        </div>
        <p class="view-desc">
          Full table scan: database giống như <span class="highlight">lật từng kệ</span>, phải kiểm tra từng dòng cho tới khi tìm thấy. Dữ liệu càng nhiều, càng chậm.
        </p>
      </div>

      <!-- Index Visualization -->
      <div
        v-else
        class="view-container index-view"
      >
        <div class="grid">
          <div
            v-for="(item, index) in data"
            :key="item.id"
            class="data-block tree-node"
            :class="{
              visited: treeActiveNodes.includes(index),
              found: searchResult && searchResult.id === item.id,
              dimmed: treeActiveNodes.length > 0 && !treeActiveNodes.includes(index)
            }"
          >
            {{ item.id }}
          </div>
        </div>
        <p class="view-desc">
          Index lookup: giống như <span class="highlight">tra từ điển</span>, qua binary search hoặc B+ Tree, mỗi lần so sánh loại bỏ một nửa (hoặc nhiều hơn), định vị mục tiêu cực nhanh.
        </p>
      </div>
    </div>

    <div
      v-if="!isSearching && searchResult"
      class="stats-box"
    >
      <div class="stat-item">
        <span class="stat-icon">🎯</span>
        <div class="stat-content">
          <div class="stat-label">
            Kết quả tìm
          </div>
          <div class="stat-value">
            {{ searchResult.value }}
          </div>
        </div>
      </div>
      <div class="stat-item">
        <span class="stat-icon">{{ mode === 'scan' ? '🐢' : '⚡' }}</span>
        <div class="stat-content">
          <div class="stat-label">
            Số thao tác
          </div>
          <div
            class="stat-value"
            :class="mode"
          >
            {{ mode === 'scan' ? scanCurrentIndex + 1 : treeActiveNodes.length }} lần
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Tư tưởng cốt lõi:</strong> Index là ví dụ kinh điển của việc <span class="highlight">đánh đổi không gian lấy thời gian</span>. Tuy tốn thêm không gian để lưu cấu trúc index, nhưng tốc độ query tăng hàng nghìn, hàng vạn lần. Giống thẻ mục lục thư viện: tốn chỗ một chút, nhưng tìm sách nhanh hơn hẳn.
    </div>
  </div>
</template>

<style scoped>
.db-index-demo {
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

.controls-area {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.mode-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.mode-btn {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-1);
}

.mode-btn:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}

.mode-btn.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.mode-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.search-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.search-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-1);
}

.search-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.visualization-area {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.view-container {
  max-height: 300px;
  
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.data-block {
  width: 32px;
  height: 32px;
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  border-radius: 4px;
  color: var(--vp-c-text-2);
  transition: all 0.3s;
  border: 1px solid var(--vp-c-divider);
}

.data-block.active {
  background: var(--vp-c-brand);
  color: white;
  transform: scale(1.15);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
  border-color: var(--vp-c-brand);
  z-index: 1;
}

.data-block.found {
  background: #22c55e;
  color: white;
  transform: scale(1.2);
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.5);
  border-color: #22c55e;
  z-index: 2;
  font-weight: bold;
}

.data-block.dimmed {
  opacity: 0.2;
  filter: grayscale(100%);
}

.tree-node.visited {
  background: #f59e0b;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
  z-index: 1;
}

.view-desc {
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
}

.view-desc .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.stats-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.stat-item {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stat-value.scan {
  color: #ef4444;
}

.stat-value:not(.scan) {
  color: #22c55e;
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

.info-box .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
