<!--
  CoordinateSystemDemo.vue
  Component demo hệ toạ độ Canvas

  Mục đích:
  Minh hoạ hệ toạ độ Canvas: vị trí gốc, chiều trục, vẽ lưới...

  Tính năng tương tác:
  - Hiển thị lưới: bật/tắt lưới và trục toạ độ
  - Kéo điểm: kéo điểm để xem toạ độ thay đổi
  - Hiện toạ độ: hiển thị toạ độ chuột và điểm đang chọn theo thời gian thực
-->
<template>
  <div class="coordinate-demo">
    <div class="control-panel">
      <div class="toggle-group">
        <label class="toggle-option">
          <input
            v-model="showGrid"
            type="checkbox"
          >
          <span>Show Grid / Hiện lưới</span>
        </label>

        <label class="toggle-option">
          <input
            v-model="showAxis"
            type="checkbox"
          >
          <span>Show Axis / Hiện trục toạ độ</span>
        </label>

        <label class="toggle-option">
          <input
            v-model="showCoordinates"
            type="checkbox"
          >
          <span>Show Coordinates / Hiện toạ độ</span>
        </label>
      </div>

      <div class="info-display">
        <div class="info-item">
          <span class="label">Canvas Width:</span>
          <span class="value">600px</span>
        </div>
        <div class="info-item">
          <span class="label">Canvas Height:</span>
          <span class="value">400px</span>
        </div>
        <div class="info-item">
          <span class="label">Mouse Position:</span>
          <span class="value">({{ mouseX }}, {{ mouseY }})</span>
        </div>
        <div
          v-if="selectedPoint"
          class="info-item"
        >
          <span class="label">Selected Point:</span>
          <span class="value">({{ selectedPoint.x }}, {{ selectedPoint.y }})</span>
        </div>
      </div>
    </div>

    <div class="canvas-container">
      <canvas
        ref="canvasRef"
        width="600"
        height="400"
        @mousemove="handleMouseMove"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
      />
    </div>

    

    

    
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const canvasRef = ref(null)
const showGrid = ref(true)
const showAxis = ref(true)
const showCoordinates = ref(true)
const mouseX = ref(0)
const mouseY = ref(0)
const selectedPoint = ref(null)
const isDragging = ref(false)

const points = [
  { x: 100, y: 100 },
  { x: 300, y: 200 },
  { x: 500, y: 100 }
]

const drawGrid = (ctx) => {
  if (!showGrid.value) return

  ctx.strokeStyle = '#f0f0f0'
  ctx.lineWidth = 1

  // Đường dọc
  for (let x = 0; x <= 600; x += 50) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, 400)
    ctx.stroke()
  }

  // Đường ngang
  for (let y = 0; y <= 400; y += 50) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(600, y)
    ctx.stroke()
  }
}

const drawAxis = (ctx) => {
  if (!showAxis.value) return

  ctx.lineWidth = 2

  // Trục X
  ctx.strokeStyle = '#e74c3c'
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(600, 0)
  ctx.stroke()

  // Trục Y
  ctx.strokeStyle = '#3498db'
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(0, 400)
  ctx.stroke()

  // Đánh dấu gốc toạ độ
  ctx.fillStyle = '#2c3e50'
  ctx.font = '12px Arial'
  ctx.fillText('(0,0)', 5, 15)
}

const drawPoints = (ctx) => {
  points.forEach((point, index) => {
    // Vẽ điểm
    ctx.fillStyle =
      index === 0 ? '#e74c3c' : index === 1 ? '#3498db' : '#2ecc71'
    ctx.beginPath()
    ctx.arc(point.x, point.y, 8, 0, Math.PI * 2)
    ctx.fill()

    // Vẽ toạ độ
    if (showCoordinates.value) {
      ctx.fillStyle = '#2c3e50'
      ctx.font = '12px Arial'
      ctx.fillText(
        `(${Math.round(point.x)}, ${Math.round(point.y)})`,
        point.x + 12,
        point.y - 12
      )
    }
  })
}

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  // Xoá canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Vẽ nền
  ctx.fillStyle = '#fafafa'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Vẽ các layer
  drawGrid(ctx)
  drawAxis(ctx)
  drawPoints(ctx)
}

const handleMouseMove = (e) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  mouseX.value = Math.round(e.clientX - rect.left)
  mouseY.value = Math.round(e.clientY - rect.top)

  // Logic kéo thả
  if (isDragging.value && selectedPoint.value) {
    selectedPoint.value.x = mouseX.value
    selectedPoint.value.y = mouseY.value
    draw()
  }
}

const handleMouseDown = (e) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  // Kiểm tra xem có click vào điểm nào không
  points.forEach((point) => {
    const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2)
    if (distance < 15) {
      selectedPoint.value = point
      isDragging.value = true
    }
  })
}

const handleMouseUp = () => {
  isDragging.value = false
}

watch([showGrid, showAxis, showCoordinates], () => {
  draw()
})

onMounted(() => {
  draw()
})
</script>

<style scoped>
.coordinate-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.control-panel {
  margin-bottom: 1.5rem;
}

.toggle-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.toggle-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: all 0.2s;
}

.toggle-option:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.toggle-option input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--vp-c-brand);
}

.info-display {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.info-item .label {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.info-item .value {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-weight: 600;
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
  cursor: crosshair;
  background: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

</style>
