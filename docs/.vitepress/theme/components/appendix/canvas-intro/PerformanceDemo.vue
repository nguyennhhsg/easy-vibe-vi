<!--
  PerformanceDemo.vue
  Component demo tối ưu hiệu năng Canvas

  Mục đích:
  Trình bày các kỹ thuật tối ưu hiệu năng Canvas: offscreen canvas, giảm vẽ lại, quản lý layer...

  Tính năng tương tác:
  - So sánh hiệu năng: trước và sau khi tối ưu
  - Điều chỉnh số lượng đối tượng: kiểm tra hiệu năng dưới các mức tải khác nhau
  - Hiển thị FPS: hiển thị frame rate theo thời gian thực
  - Bật/tắt tối ưu: bật/tắt các kỹ thuật tối ưu
-->
<template>
  <div class="performance-demo">
    <div class="control-panel">
      <div class="test-selector">
        <label>Performance Test / Kiểm tra hiệu năng</label>
        <div class="button-group">
          <button
            v-for="test in tests"
            :key="test.value"
            :class="{ active: currentTest === test.value }"
            @click="switchTest(test.value)"
          >
            {{ test.label }}
          </button>
        </div>
      </div>

      <div class="parameters">
        <div class="param-row">
          <label>Object Count / Số đối tượng: {{ objectCount }}</label>
          <input
            v-model.number="objectCount"
            type="range"
            min="100"
            max="5000"
            step="100"
            @input="resetTest"
          >
        </div>
      </div>

      <div class="optimization-toggles">
        <label>Optimizations / Kỹ thuật tối ưu</label>
        <div class="toggle-grid">
          <label
            v-if="currentTest === 'redraw'"
            class="toggle-option"
          >
            <input
              v-model="useDirtyRect"
              type="checkbox"
            >
            <span>Dirty Rect / Hình chữ nhật bẩn</span>
          </label>

          <label
            v-if="currentTest === 'layer'"
            class="toggle-option"
          >
            <input
              v-model="useOffscreenCanvas"
              type="checkbox"
            >
            <span>Offscreen Canvas / Canvas ngoài màn hình</span>
          </label>

          <label
            v-if="currentTest === 'batch'"
            class="toggle-option"
          >
            <input
              v-model="useBatching"
              type="checkbox"
            >
            <span>Batch Rendering / Render theo lô</span>
          </label>
        </div>
      </div>

      <div class="stats">
        <div class="stat-item">
          <span class="label">FPS:</span>
          <span
            class="value"
            :class="{
              good: fps >= 55,
              warning: fps >= 30 && fps < 55,
              bad: fps < 30
            }"
          >
            {{ fps }}
          </span>
        </div>
        <div class="stat-item">
          <span class="label">Frame Time:</span>
          <span class="value">{{ frameTime }}ms</span>
        </div>
        <div class="stat-item">
          <span class="label">Objects:</span>
          <span class="value">{{ objectCount }}</span>
        </div>
      </div>

      <button
        class="reset-btn"
        @click="resetTest"
      >
        <span class="icon">🔄</span>
        Restart Test / Chạy lại kiểm tra
      </button>
    </div>

    <div class="canvas-container">
      <canvas
        ref="canvasRef"
        width="600"
        height="400"
      />
      <canvas
        v-if="useOffscreenCanvas"
        ref="offscreenCanvasRef"
        width="600"
        height="400"
        style="display: none"
      />
    </div>

    <div
      v-if="showComparison"
      class="comparison"
    >
      <h4>Performance Comparison / So sánh hiệu năng</h4>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>Technique / Kỹ thuật</th>
              <th>FPS</th>
              <th>Improvement / Cải thiện</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Baseline / Cơ sở</td>
              <td>{{ baselineFps }}</td>
              <td>-</td>
            </tr>
            <tr v-if="useDirtyRect">
              <td>Dirty Rect / Hình chữ nhật bẩn</td>
              <td>{{ fps }}</td>
              <td>
                {{ (((fps - baselineFps) / baselineFps) * 100).toFixed(1) }}%
              </td>
            </tr>
            <tr v-if="useOffscreenCanvas">
              <td>Offscreen Canvas / Canvas ngoài màn hình</td>
              <td>{{ fps }}</td>
              <td>
                {{ (((fps - baselineFps) / baselineFps) * 100).toFixed(1) }}%
              </td>
            </tr>
            <tr v-if="useBatching">
              <td>Batch Rendering / Render theo lô</td>
              <td>{{ fps }}</td>
              <td>
                {{ (((fps - baselineFps) / baselineFps) * 100).toFixed(1) }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    

    
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
const offscreenCanvasRef = ref(null)
const currentTest = ref('redraw')
const objectCount = ref(1000)
const useDirtyRect = ref(false)
const useOffscreenCanvas = ref(false)
const useBatching = ref(false)
const fps = ref(0)
const frameTime = ref(0)
const baselineFps = ref(0)
const showComparison = ref(false)

let animationId = null
let lastTime = 0
let frameCount = 0
let fpsTime = 0
let objects = []
let offscreenCtx = null

const tests = [
  { value: 'redraw', label: 'Minimize Redraw / Giảm vẽ lại' },
  { value: 'layer', label: 'Layer Management / Quản lý layer' },
  { value: 'batch', label: 'Batch Rendering / Render theo lô' }
]

const optimizationCode = computed(() => {
  const templates = {
    redraw: `// Tối ưu dirty rect - chỉ vẽ lại phần thay đổi
function draw() {
  // Không xóa toàn bộ canvas, chỉ xóa vùng thay đổi
  if (useDirtyRect) {
    objects.forEach(obj => {
      if (obj.moved) {
        // Xóa vị trí cũ
        ctx.clearRect(
          obj.oldX - obj.size,
          obj.oldY - obj.size,
          obj.size * 2,
          obj.size * 2
        )
        // Vẽ vị trí mới
        obj.draw(ctx)
        obj.moved = false
      }
    })
  } else {
    // Cách truyền thống: xóa toàn bộ canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    objects.forEach(obj => obj.draw(ctx))
  }
}`,

    layer: `// Offscreen Canvas - prerender nội dung tĩnh
// Tạo offscreen canvas khi khởi tạo
const offscreenCanvas = document.createElement('canvas')
const offscreenCtx = offscreenCanvas.getContext('2d')

// Prerender nền tĩnh
function drawBackground(ctx) {
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, 600, 400)
  // Vẽ grid và các nội dung tĩnh khác...
}

// Chỉ vẽ một lần vào offscreen canvas
drawBackground(offscreenCtx)

// Vòng lặp render chính
function draw() {
  if (useOffscreenCanvas) {
    // Sao chép trực tiếp nội dung đã prerender
    ctx.drawImage(offscreenCanvas, 0, 0)
  } else {
    // Vẽ lại nền mỗi frame
    drawBackground(ctx)
  }

  // Chỉ vẽ các đối tượng động
  objects.forEach(obj => obj.draw(ctx))
}`,

    batch: `// Render theo lô - giảm chuyển trạng thái
function draw() {
  if (useBatching) {
    // Nhóm theo màu
    const batches = {}
    objects.forEach(obj => {
      if (!batches[obj.color]) {
        batches[obj.color] = []
      }
      batches[obj.color].push(obj)
    })

    // Vẽ các đối tượng cùng màu theo lô
    Object.keys(batches).forEach(color => {
      ctx.fillStyle = color  // Chỉ set màu một lần
      batches[color].forEach(obj => {
        ctx.beginPath()
        ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2)
        ctx.fill()
      })
    })
  } else {
    // Cách truyền thống: mỗi đối tượng đều đổi trạng thái
    objects.forEach(obj => {
      ctx.fillStyle = obj.color  // Đổi trạng thái liên tục
      ctx.beginPath()
      ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2)
      ctx.fill()
    })
  }
}`
  }

  return templates[currentTest.value]
})

const initObjects = () => {
  objects = []
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6']

  for (let i = 0; i < objectCount.value; i++) {
    objects.push({
      x: Math.random() * 600,
      y: Math.random() * 400,
      size: 2 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      oldX: 0,
      oldY: 0,
      moved: false
    })
  }
}

const initOffscreenCanvas = () => {
  if (!offscreenCanvasRef.value) return
  offscreenCtx = offscreenCanvasRef.value.getContext('2d')

  // Prerender nền tĩnh
  offscreenCtx.fillStyle = '#fafafa'
  offscreenCtx.fillRect(0, 0, 600, 400)

  // Vẽ grid
  offscreenCtx.strokeStyle = '#e0e0e0'
  offscreenCtx.lineWidth = 1
  for (let x = 0; x < 600; x += 50) {
    offscreenCtx.beginPath()
    offscreenCtx.moveTo(x, 0)
    offscreenCtx.lineTo(x, 400)
    offscreenCtx.stroke()
  }
  for (let y = 0; y < 400; y += 50) {
    offscreenCtx.beginPath()
    offscreenCtx.moveTo(0, y)
    offscreenCtx.lineTo(600, y)
    offscreenCtx.stroke()
  }
}

const drawRedrawTest = (ctx) => {
  if (useDirtyRect.value) {
    // Chỉ vẽ lại các đối tượng đã di chuyển
    objects.forEach((obj) => {
      if (obj.moved) {
        ctx.clearRect(
          obj.oldX - obj.size - 1,
          obj.oldY - obj.size - 1,
          obj.size * 2 + 2,
          obj.size * 2 + 2
        )
        ctx.fillStyle = obj.color
        ctx.beginPath()
        ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2)
        ctx.fill()
        obj.moved = false
      }
    })
  } else {
    // Xóa toàn bộ canvas
    ctx.clearRect(0, 0, 600, 400)
    ctx.fillStyle = '#fafafa'
    ctx.fillRect(0, 0, 600, 400)

    // Vẽ tất cả đối tượng
    objects.forEach((obj) => {
      ctx.fillStyle = obj.color
      ctx.beginPath()
      ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2)
      ctx.fill()
    })
  }
}

const drawLayerTest = (ctx) => {
  if (useOffscreenCanvas.value && offscreenCtx) {
    // Sao chép nền đã prerender
    ctx.drawImage(offscreenCanvasRef.value, 0, 0)
  } else {
    // Vẽ nền
    ctx.fillStyle = '#fafafa'
    ctx.fillRect(0, 0, 600, 400)
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 1
    for (let x = 0; x < 600; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, 400)
      ctx.stroke()
    }
    for (let y = 0; y < 400; y += 50) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(600, y)
      ctx.stroke()
    }
  }

  // Vẽ đối tượng động
  objects.forEach((obj) => {
    ctx.fillStyle = obj.color
    ctx.beginPath()
    ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2)
    ctx.fill()
  })
}

const drawBatchTest = (ctx) => {
  ctx.clearRect(0, 0, 600, 400)
  ctx.fillStyle = '#fafafa'
  ctx.fillRect(0, 0, 600, 400)

  if (useBatching.value) {
    // Render theo lô, nhóm theo màu
    const batches = {}
    objects.forEach((obj) => {
      if (!batches[obj.color]) {
        batches[obj.color] = []
      }
      batches[obj.color].push(obj)
    })

    Object.keys(batches).forEach((color) => {
      ctx.fillStyle = color
      batches[color].forEach((obj) => {
        ctx.beginPath()
        ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2)
        ctx.fill()
      })
    })
  } else {
    // Render từng đối tượng
    objects.forEach((obj) => {
      ctx.fillStyle = obj.color
      ctx.beginPath()
      ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2)
      ctx.fill()
    })
  }
}

const updateObjects = () => {
  objects.forEach((obj) => {
    obj.oldX = obj.x
    obj.oldY = obj.y
    obj.x += obj.vx
    obj.y += obj.vy

    if (obj.x < 0 || obj.x > 600) obj.vx = -obj.vx
    if (obj.y < 0 || obj.y > 400) obj.vy = -obj.vy

    if (obj.x !== obj.oldX || obj.y !== obj.oldY) {
      obj.moved = true
    }
  })
}

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  updateObjects()

  switch (currentTest.value) {
    case 'redraw':
      drawRedrawTest(ctx)
      break
    case 'layer':
      drawLayerTest(ctx)
      break
    case 'batch':
      drawBatchTest(ctx)
      break
  }
}

const animate = (timestamp) => {
  if (!lastTime) lastTime = timestamp
  const deltaTime = timestamp - lastTime
  frameTime.value = deltaTime.toFixed(2)

  frameCount++
  fpsTime += deltaTime
  if (fpsTime >= 1000) {
    fps.value = Math.round((frameCount * 1000) / fpsTime)
    if (
      !showComparison.value &&
      !useDirtyRect.value &&
      !useOffscreenCanvas.value &&
      !useBatching.value
    ) {
      baselineFps.value = fps.value
    }
    frameCount = 0
    fpsTime = 0
    showComparison.value = true
  }

  lastTime = timestamp
  draw()
  animationId = requestAnimationFrame(animate)
}

const switchTest = (test) => {
  currentTest.value = test
  resetTest()
}

const resetTest = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  lastTime = 0
  frameCount = 0
  fpsTime = 0
  fps.value = 0
  baselineFps.value = 0
  showComparison.value = false
  useDirtyRect.value = false
  useOffscreenCanvas.value = false
  useBatching.value = false

  initObjects()
  if (currentTest.value === 'layer') {
    initOffscreenCanvas()
  }

  animationId = requestAnimationFrame(animate)
}

watch([useDirtyRect, useOffscreenCanvas, useBatching], () => {
  showComparison.value = true
})

onMounted(() => {
  initObjects()
  initOffscreenCanvas()
  animationId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.performance-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.control-panel {
  margin-bottom: 1.5rem;
}

.test-selector {
  margin-bottom: 15px;
}

.test-selector label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2c3e50;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.button-group button {
  padding: 0.5rem 1rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.25s ease;
}

.button-group button:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.button-group button.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.parameters {
  margin-bottom: 15px;
}

.param-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.param-row label {
  font-size: 13px;
  font-weight: 500;
  color: #555;
}

.param-row input[type='range'] {
  width: 100%;
}

.optimization-toggles {
  margin-bottom: 15px;
}

.optimization-toggles label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2c3e50;
}

.toggle-grid {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.toggle-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.toggle-option input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  padding: 12px;
  background: white;
  border-radius: 6px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.stat-item .label {
  font-weight: 600;
  color: #555;
}

.stat-item .value {
  font-family: 'Courier New', monospace;
  color: #2c3e50;
  background: #f0f0f0;
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: 700;
}

.stat-item .value.good {
  background: #d4edda;
  color: #155724;
}

.stat-item .value.warning {
  background: #fff3cd;
  color: #856404;
}

.stat-item .value.bad {
  background: #f8d7da;
  color: #721c24;
}

.reset-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #95a5a6;
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  background: #7f8c8d;
  transform: translateY(-1px);
}

.canvas-container {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 12px;
  border: 2px solid var(--vp-c-divider);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
}

canvas {
  border: 3px solid var(--vp-c-divider);
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.comparison {
  margin: 1.5rem 0;
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.comparison h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  font-weight: 600;
}

.comparison-table {
  overflow-x: auto;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th,
.comparison-table td {
  padding: 0.625rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

.comparison-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.813rem;
}

.comparison-table td {
  font-size: 0.813rem;
  color: var(--vp-c-text-2);
}

</style>
