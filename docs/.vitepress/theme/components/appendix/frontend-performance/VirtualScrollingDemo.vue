<!--
  VirtualScrollingDemo.vue
  Demo cuộn ảo (virtual scrolling)
-->
<script setup>
import { ref, computed } from 'vue'

const TOTAL_ITEMS = 10000
const ITEM_HEIGHT = 50
const CONTAINER_HEIGHT = 280

// Generate mock data
const items = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i,
  content: `Item #${i + 1} - Nội dung của item trong danh sách cuộn ảo`
}))

const scrollTop = ref(0)
const containerRef = ref(null)

// Virtual scrolling calculations
const startIndex = computed(() => Math.floor(scrollTop.value / ITEM_HEIGHT))
const endIndex = computed(() =>
  Math.min(
    TOTAL_ITEMS,
    startIndex.value + Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT) + 2
  )
)
const visibleItems = computed(() => {
  return items.slice(startIndex.value, endIndex.value).map((item) => ({
    ...item,
    top: item.id * ITEM_HEIGHT
  }))
})

const totalHeight = TOTAL_ITEMS * ITEM_HEIGHT

const onScroll = (e) => {
  scrollTop.value = e.target.scrollTop
}

// Stats
const renderedCount = computed(() => visibleItems.value.length)
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="icon">📜</span>
      <span class="title">Cuộn ảo</span>
      <span class="subtitle">Chỉ render các item trong vùng nhìn thấy</span>
    </div>

    <div class="controls">
      <div class="stat-box">
        <div class="stat-label">
          Tổng dữ liệu
        </div>
        <div class="stat-value">
          {{ TOTAL_ITEMS.toLocaleString() }}
        </div>
      </div>
      <div class="stat-box highlight">
        <div class="stat-label">
          Thực tế render
        </div>
        <div class="stat-value">
          {{ renderedCount }}
        </div>
      </div>
      <div class="stat-box">
        <div class="stat-label">
          Tiết kiệm bộ nhớ
        </div>
        <div class="stat-value">
          ~{{ ((1 - renderedCount / TOTAL_ITEMS) * 100).toFixed(1) }}%
        </div>
      </div>
    </div>

    <div
      ref="containerRef"
      class="scroll-container"
      :style="{ height: CONTAINER_HEIGHT + 'px' }"
      @scroll="onScroll"
    >
      <div
        class="scroll-phantom"
        :style="{ height: totalHeight + 'px' }"
      />
      <div class="visible-list">
        <div
          v-for="item in visibleItems"
          :key="item.id"
          class="list-item"
          :style="{
            transform: `translateY(${item.top}px)`,
            height: ITEM_HEIGHT + 'px'
          }"
        >
          <span class="item-index">{{ item.id + 1 }}</span>
          <span class="item-content">{{ item.content }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Nguyên lý hoạt động:</strong> Không render toàn bộ {{ TOTAL_ITEMS }} item, chỉ render những item nhìn thấy trong viewport (cộng thêm vài item đệm). Khi cuộn, tính xem nên hiển thị item nào và dùng absolute positioning để tạo ảo giác danh sách đầy đủ. Hiệu năng từ O(n) tối ưu xuống O(1).
    </div>
  </div>
</template>

<style scoped>
.demo-container {
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

.controls {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.stat-box {
  background: var(--vp-c-bg);
  padding: 0.6rem;
  border-radius: 6px;
  flex: 1;
  min-width: 100px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.stat-box.highlight {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
}

.stat-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.scroll-container {
  
  position: relative;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.scroll-phantom {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
}

.visible-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  pointer-events: none;
}

.list-item {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  box-sizing: border-box;
  background: var(--vp-c-bg);
}

.item-index {
  font-weight: bold;
  color: var(--vp-c-brand);
  width: 50px;
  flex-shrink: 0;
  font-size: 0.85rem;
}

.item-content {
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.85rem;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon { margin-right: 0.25rem; }
</style>
