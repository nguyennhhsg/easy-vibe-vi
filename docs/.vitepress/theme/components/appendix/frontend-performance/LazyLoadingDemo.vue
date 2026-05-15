<!--
  LazyLoadingDemo.vue
  Demo lazy load
-->
<template>
  <div class="lazy-loading-demo">
    <div class="header">
      <div class="title">
        Lazy load ảnh: tiết kiệm băng thông, tăng performance
      </div>
      <div class="subtitle">
        So sánh lazy load và tải ngay
      </div>
    </div>

    <div class="demo-container">
      <div class="mode-selector">
        <button
          :class="['mode-btn', { active: mode === 'eager' }]"
          @click="mode = 'eager'"
        >
          📦 Tải ngay
        </button>
        <button
          :class="['mode-btn', { active: mode === 'lazy' }]"
          @click="mode = 'lazy'"
        >
          ⏳ Lazy load
        </button>
      </div>

      <div class="stats-bar">
        <div class="stat">
          <span class="stat-label">Ảnh đã tải</span>
          <span class="stat-value">{{ loadedImages }} / {{ totalImages }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Băng thông tiết kiệm</span>
          <span
            class="stat-value"
            :class="{ positive: savedBandwidth > 0 }"
          >
            {{ savedBandwidth > 0 ? '-' : '' }}{{ savedBandwidth }} KB
          </span>
        </div>
        <div class="stat">
          <span class="stat-label">Thời gian tải</span>
          <span class="stat-value">{{ loadTime }} ms</span>
        </div>
      </div>

      <div
        ref="scrollContainer"
        class="scroll-container"
        @scroll="handleScroll"
      >
        <div class="content-area">
          <div class="placeholder">
            Cuộn xuống để xem thêm nội dung
          </div>

          <div
            v-for="(image, index) in images"
            :key="index"
            :ref="(el) => setImageRef(el, index)"
            class="image-item"
          >
            <div
              class="image-wrapper"
              :class="{ loading: image.loading, loaded: image.loaded }"
            >
              <div
                v-if="!image.loaded && mode === 'lazy'"
                class="placeholder-box"
              >
                <div class="spinner" />
                <div class="placeholder-text">
                  Đang tải...
                </div>
              </div>
              <div
                v-else-if="image.loaded"
                class="image-box"
              >
                <div class="image-icon">
                  🖼️
                </div>
                <div class="image-info">
                  <div class="image-size">
                    {{ image.size }}
                  </div>
                  <div class="image-dim">
                    {{ image.dimensions }}
                  </div>
                </div>
              </div>
            </div>
            <div class="image-caption">
              Ảnh {{ index + 1 }}
            </div>
          </div>

          <div class="placeholder">
            Đã hết nội dung
          </div>
        </div>
      </div>

      <div class="explanation">
        <div class="explanation-item">
          <h4>💡 Nguyên lý lazy load</h4>
          <p>
            Ảnh chỉ bắt đầu tải khi đi vào viewport (vùng người dùng nhìn thấy). Dùng Intersection
            Observer API có thể triển khai rất hiệu quả.
          </p>
        </div>

        <div class="explanation-item">
          <h4>📊 Lợi ích về performance</h4>
          <p>
            Lazy load có thể tiết kiệm 30-60% băng thông, đẩy nhanh tốc độ tải first screen rất nhiều, đặc biệt rõ rệt trên mobile.
          </p>
        </div>

        <div class="explanation-item">
          <h4>🔧 Cách triển khai</h4>
          <p>
            Thuộc tính <code>loading="lazy"</code>
            là cách đơn giản nhất, mọi trình duyệt hiện đại đều hỗ trợ. Nếu cần kiểm soát nhiều hơn thì dùng
            Intersection Observer.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const mode = ref('eager')
const scrollContainer = ref(null)
const totalImages = 12
const imageRefs = ref([])

const images = ref([])

const loadedImages = computed(() => {
  return images.value.filter((img) => img.loaded).length
})

const savedBandwidth = computed(() => {
  if (mode.value === 'eager') return 0
  const notLoaded = images.value.filter(
    (img) =>
      !img.loaded && !imageRefs.value[images.value.indexOf(img)]?.isVisible
  ).length
  return notLoaded * 150 // Giả định mỗi ảnh 150KB
})

const loadTime = computed(() => {
  if (mode.value === 'eager') return 2400
  return loadedImages.value * 150
})

function initializeImages() {
  images.value = Array.from({ length: totalImages }, (_, i) => ({
    loaded: mode.value === 'eager',
    loading: false,
    size: '150 KB',
    dimensions: '800×600'
  }))
}

function setImageRef(el, index) {
  if (el) {
    imageRefs.value[index] = el
  }
}

function handleScroll() {
  if (mode.value === 'lazy') {
    checkVisibility()
  }
}

function checkVisibility() {
  const container = scrollContainer.value
  if (!container) return

  const containerRect = container.getBoundingClientRect()
  const threshold = 100 // Bắt đầu tải sớm 100px trước

  images.value.forEach((image, index) => {
    if (image.loaded || image.loading) return

    const ref = imageRefs.value[index]
    if (!ref) return

    const rect = ref.getBoundingClientRect()
    const isVisible = rect.top < containerRect.bottom + threshold

    if (isVisible) {
      loadImage(index)
    }
  })
}

function loadImage(index) {
  const image = images.value[index]
  if (!image || image.loaded || image.loading) return

  image.loading = true

  // Mô phỏng độ trễ khi tải
  setTimeout(
    () => {
      image.loaded = true
      image.loading = false
    },
    300 + Math.random() * 500
  )
}

watch(mode, () => {
  initializeImages()
  if (mode.value === 'lazy') {
    setTimeout(() => checkVisibility(), 100)
  }
})

onMounted(() => {
  initializeImages()
  if (mode.value === 'lazy') {
    setTimeout(() => checkVisibility(), 100)
  }
})
</script>

<style scoped>
.lazy-loading-demo {
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
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.demo-container {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.5rem;
}

.mode-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.mode-btn {
  padding: 0.6rem 1.2rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s;
  color: var(--vp-c-text-1);
}

.mode-btn:hover {
  border-color: var(--vp-c-brand);
}

.mode-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}

.stats-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.stat {
  flex: 1;
  min-width: 120px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.8rem;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
}

.stat-value {
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.stat-value.positive {
  color: #22c55e;
}

.scroll-container {
  height: 400px;
  
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  margin-bottom: 1.5rem;
  background: var(--vp-c-bg-soft);
}

.content-area {
  padding: 0.75rem;
}

.placeholder {
  text-align: center;
  padding: 1.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.image-item {
  margin-bottom: 1rem;
}

.image-wrapper {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.3s;
}

.image-wrapper.loading {
  border-color: var(--vp-c-brand);
}

.image-wrapper.loaded {
  border-color: #22c55e;
}

.placeholder-box {
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.placeholder-text {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.image-box {
  height: 150px;
  display: flex;
  align-items: center;
  padding: 0.75rem;
  gap: 1rem;
}

.image-icon {
  font-size: 3rem;
}

.image-info {
  flex: 1;
}

.image-size {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.image-dim {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.image-caption {
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

.explanation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.explanation-item {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
}

.explanation-item h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.explanation-item p {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

.explanation-item code {
  background: var(--vp-c-bg);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
}
</style>
