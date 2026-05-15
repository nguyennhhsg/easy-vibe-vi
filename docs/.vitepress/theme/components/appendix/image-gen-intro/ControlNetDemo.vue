<!--
  ControlNetDemo.vue
  Component minh hoạ ControlNet

  Mục đích:
  Trình bày ControlNet kiểm soát chính xác việc sinh ảnh ra sao, bao gồm các cách điều khiển như tư thế, cạnh, độ sâu...

  Tương tác:
  - Chuyển đổi giữa các loại điều khiển
  - Điều chỉnh cường độ điều khiển
  - Trực quan hoá tín hiệu điều khiển
  - So sánh kết quả khi có và không dùng ControlNet
-->
<template>
  <div class="controlnet-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><Pointer /></el-icon>
          <span>🎮 ControlNet: Kiểm soát chính xác</span>
        </div>
      </template>

      <div class="demo-content">
        <!-- Chọn loại điều khiển -->
        <div class="control-types">
          <div
            v-for="control in controlTypes"
            :key="control.id"
            class="control-card"
            :class="{ active: selectedControl === control.id }"
            @click="selectedControl = control.id"
          >
            <div class="control-icon">
              {{ control.icon }}
            </div>
            <div class="control-name">
              {{ control.name }}
            </div>
            <div class="control-desc">
              {{ control.description }}
            </div>
          </div>
        </div>

        <!-- Trực quan hoá quy trình -->
        <div class="workflow-viz">
          <div class="workflow-step">
            <div class="step-label">
              Ảnh đầu vào
            </div>
            <canvas
              ref="inputCanvas"
              width="200"
              height="200"
              class="workflow-canvas"
            />
          </div>

          <div class="workflow-arrow">
            <el-icon :size="24">
              <ArrowRight />
            </el-icon>
            <div class="arrow-label">
              Trích xuất
            </div>
          </div>

          <div class="workflow-step">
            <div class="step-label">
              Tín hiệu điều khiển
            </div>
            <canvas
              ref="controlCanvas"
              width="200"
              height="200"
              class="workflow-canvas control-signal"
            />
          </div>

          <div class="workflow-arrow">
            <el-icon :size="24">
              <ArrowRight />
            </el-icon>
            <div class="arrow-label">
              + Prompt
            </div>
          </div>

          <div class="workflow-step">
            <div class="step-label">
              Kết quả sinh ra
            </div>
            <canvas
              ref="outputCanvas"
              width="200"
              height="200"
              class="workflow-canvas"
            />
          </div>
        </div>

        <!-- Cường độ điều khiển -->
        <div class="strength-control">
          <div class="strength-header">
            <span>Cường độ điều khiển (Control Strength)</span>
            <el-tag
              type="primary"
              effect="dark"
            >
              {{ controlStrength }}
            </el-tag>
          </div>
          <el-slider
            v-model="controlStrength"
            :min="0"
            :max="2"
            :step="0.1"
            show-stops
            :marks="{
              0: 'Không điều khiển',
              1: 'Cân bằng',
              2: 'Điều khiển mạnh'
            }"
          />
          <div class="strength-desc">
            {{ getStrengthDescription() }}
          </div>
        </div>

        <!-- Khu vực so sánh -->
        <div class="comparison-section">
          <div class="comparison-title">
            So sánh: có và không có ControlNet
          </div>
          <div class="comparison-grid">
            <div class="comparison-item">
              <div class="item-label">
                <el-tag type="info">
                  Chỉ sinh từ văn bản
                </el-tag>
              </div>
              <canvas
                ref="textOnlyCanvas"
                width="180"
                height="180"
                class="comparison-canvas"
              />
              <div class="item-desc">
                Tư thế ngẫu nhiên, không kiểm soát được
              </div>
            </div>

            <div class="comparison-item">
              <div class="item-label">
                <el-tag type="success">
                  Có ControlNet điều khiển
                </el-tag>
              </div>
              <canvas
                ref="controlNetCanvas"
                width="180"
                height="180"
                class="comparison-canvas"
              />
              <div class="item-desc">
                Tư thế khớp chính xác với input
              </div>
            </div>
          </div>
        </div>

        <!-- Tình huống ứng dụng -->
        <div class="use-cases">
          <div class="use-cases-title">
            🎯 Các tình huống ứng dụng tiêu biểu
          </div>
          <div class="use-cases-grid">
            <div
              v-for="useCase in useCases"
              :key="useCase.title"
              class="use-case-card"
            >
              <div class="use-case-icon">
                {{ useCase.icon }}
              </div>
              <div class="use-case-title">
                {{ useCase.title }}
              </div>
              <div class="use-case-desc">
                {{ useCase.description }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>Nguyên lý ControlNet:</strong>
          ControlNet là một mạng nơ-ron gắn thêm vào diffusion model, học cách trích xuất thông tin cấu trúc cụ thể (như tư thế, cạnh) từ ảnh đầu vào, rồi dùng thông tin đó dẫn dắt quá trình sinh ảnh, đạt mức kiểm soát chính xác.
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Pointer, ArrowRight } from '@element-plus/icons-vue'

const selectedControl = ref('pose')
const controlStrength = ref(1.0)

const inputCanvas = ref(null)
const controlCanvas = ref(null)
const outputCanvas = ref(null)
const textOnlyCanvas = ref(null)
const controlNetCanvas = ref(null)

const controlTypes = [
  {
    id: 'pose',
    name: 'OpenPose',
    icon: '🕺',
    description: 'Điều khiển tư thế, trích xuất điểm khung xương người'
  },
  {
    id: 'canny',
    name: 'Canny',
    icon: '✏️',
    description: 'Phát hiện cạnh, trích xuất đường viền ảnh'
  },
  {
    id: 'depth',
    name: 'Depth',
    icon: '📐',
    description: 'Ước lượng độ sâu, kiểm soát cấu trúc không gian'
  },
  {
    id: 'scribble',
    name: 'Scribble',
    icon: '🎨',
    description: 'Điều khiển bằng nét vẽ tay, hướng dẫn sinh ảnh'
  },
  {
    id: 'segmentation',
    name: 'Segmentation',
    icon: '🧩',
    description: 'Phân đoạn ngữ nghĩa, kiểm soát bố cục đối tượng'
  }
]

const useCases = [
  {
    icon: '👗',
    title: 'Thử đồ ảo',
    description: 'Giữ tư thế nhân vật, thay đổi kiểu trang phục'
  },
  {
    icon: '🏠',
    title: 'Thiết kế nội thất',
    description: 'Dựa vào cấu trúc phòng, sinh ra phong cách trang trí khác nhau'
  },
  {
    icon: '🎭',
    title: 'Nhất quán nhân vật',
    description: 'Giữ tư thế nhân vật, thay đổi trang phục hoặc bối cảnh'
  },
  {
    icon: '📐',
    title: 'Trưng bày sản phẩm',
    description: 'Cố định góc sản phẩm, thay đổi nền và ánh sáng'
  }
]

const getStrengthDescription = () => {
  if (controlStrength.value < 0.5) {
    return 'Điều khiển yếu, kết quả tự do hơn nhưng có thể lệch cấu trúc mong muốn'
  } else if (controlStrength.value < 1.5) {
    return 'Chế độ cân bằng, dung hoà giữa tuân theo điều khiển và giữ sự sáng tạo'
  } else {
    return 'Chế độ điều khiển mạnh, bám sát cấu trúc đầu vào nhưng có thể đánh đổi chất lượng ảnh'
  }
}

// Vẽ khung xương tư thế
const drawPoseSkeleton = (ctx, width, height, isControl = false) => {
  ctx.clearRect(0, 0, width, height)

  if (isControl) {
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = '#0f0'
    ctx.fillStyle = '#0f0'
  } else {
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = '#333'
    ctx.fillStyle = '#333'
  }

  ctx.lineWidth = isControl ? 3 : 2

  // Đầu
  ctx.beginPath()
  ctx.arc(width * 0.5, height * 0.15, width * 0.08, 0, Math.PI * 2)
  ctx.stroke()

  // Thân
  ctx.beginPath()
  ctx.moveTo(width * 0.5, height * 0.23)
  ctx.lineTo(width * 0.5, height * 0.5)
  ctx.stroke()

  // Tay trái
  ctx.beginPath()
  ctx.moveTo(width * 0.5, height * 0.3)
  ctx.lineTo(width * 0.25, height * 0.4)
  ctx.stroke()

  // Tay phải
  ctx.beginPath()
  ctx.moveTo(width * 0.5, height * 0.3)
  ctx.lineTo(width * 0.75, height * 0.35)
  ctx.stroke()

  // Chân trái
  ctx.beginPath()
  ctx.moveTo(width * 0.5, height * 0.5)
  ctx.lineTo(width * 0.35, height * 0.8)
  ctx.stroke()

  // Chân phải
  ctx.beginPath()
  ctx.moveTo(width * 0.5, height * 0.5)
  ctx.lineTo(width * 0.65, height * 0.75)
  ctx.stroke()

  // Điểm khớp
  const joints = [
    [0.5, 0.23], [0.5, 0.3], [0.5, 0.5],
    [0.25, 0.4], [0.75, 0.35],
    [0.35, 0.8], [0.65, 0.75]
  ]

  joints.forEach(([x, y]) => {
    ctx.beginPath()
    ctx.arc(width * x, height * y, isControl ? 4 : 3, 0, Math.PI * 2)
    ctx.fill()
  })
}

// Vẽ phát hiện cạnh
const drawCannyEdges = (ctx, width, height) => {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, width, height)
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 2

  // Vẽ cạnh hình học đơn giản
  ctx.beginPath()
  ctx.moveTo(width * 0.2, height * 0.2)
  ctx.lineTo(width * 0.8, height * 0.2)
  ctx.lineTo(width * 0.8, height * 0.8)
  ctx.lineTo(width * 0.2, height * 0.8)
  ctx.closePath()
  ctx.stroke()

  // Chi tiết bên trong
  ctx.beginPath()
  ctx.arc(width * 0.5, height * 0.5, width * 0.2, 0, Math.PI * 2)
  ctx.stroke()
}

// Vẽ depth map
const drawDepthMap = (ctx, width, height) => {
  // Tạo gradient độ sâu
  const gradient = ctx.createRadialGradient(
    width * 0.5, height * 0.5, 0,
    width * 0.5, height * 0.5, width * 0.5
  )
  gradient.addColorStop(0, '#fff')
  gradient.addColorStop(0.5, '#888')
  gradient.addColorStop(1, '#000')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
}

// Vẽ scribble
const drawScribble = (ctx, width, height) => {
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 3

  // Nét vẽ ngẫu nhiên
  ctx.beginPath()
  for (let i = 0; i < 5; i++) {
    ctx.moveTo(Math.random() * width, Math.random() * height)
    ctx.lineTo(Math.random() * width, Math.random() * height)
  }
  ctx.stroke()
}

// Vẽ phân đoạn ngữ nghĩa
const drawSegmentation = (ctx, width, height) => {
  // Bầu trời
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, width, height * 0.4)

  // Mặt đất
  ctx.fillStyle = '#8B4513'
  ctx.fillRect(0, height * 0.6, width, height * 0.4)

  // Toà nhà
  ctx.fillStyle = '#808080'
  ctx.fillRect(width * 0.3, height * 0.2, width * 0.4, height * 0.5)

  // Cây cối
  ctx.fillStyle = '#228B22'
  ctx.beginPath()
  ctx.arc(width * 0.15, height * 0.5, width * 0.1, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(width * 0.85, height * 0.5, width * 0.1, 0, Math.PI * 2)
  ctx.fill()
}

// Vẽ kết quả sinh ra
const drawOutput = (ctx, width, height, withControl = true) => {
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, width, height)

  // Vẽ output khác nhau theo loại điều khiển
  if (selectedControl.value === 'pose') {
    // Vẽ một nhân vật, tư thế khớp với khung xương
    const strength = withControl ? controlStrength.value : 0.3

    // Đầu
    ctx.fillStyle = '#fdbcb4'
    ctx.beginPath()
    ctx.arc(width * 0.5, height * 0.15, width * 0.08 * (0.5 + strength * 0.5), 0, Math.PI * 2)
    ctx.fill()

    // Thân
    ctx.fillStyle = '#4a90e2'
    ctx.fillRect(
      width * (0.5 - 0.08 * strength),
      height * 0.23,
      width * 0.16 * strength,
      height * 0.27
    )

    // Tay chân đơn giản
    ctx.strokeStyle = '#fdbcb4'
    ctx.lineWidth = 8 * strength

    // Tay trái
    ctx.beginPath()
    ctx.moveTo(width * 0.5, height * 0.3)
    ctx.lineTo(width * (0.25 + (0.5 - strength) * 0.3), height * 0.4)
    ctx.stroke()

    // Tay phải
    ctx.beginPath()
    ctx.moveTo(width * 0.5, height * 0.3)
    ctx.lineTo(width * (0.75 - (0.5 - strength) * 0.3), height * 0.35)
    ctx.stroke()
  } else if (selectedControl.value === 'canny') {
    // Hiệu ứng điều khiển bằng cạnh
    const strength = withControl ? controlStrength.value : 0.3
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(width * 0.2, height * 0.2)
    ctx.lineTo(width * (0.8 - (1 - strength) * 0.3), height * 0.2)
    ctx.lineTo(width * 0.8, height * (0.8 - (1 - strength) * 0.2))
    ctx.lineTo(width * (0.2 + (1 - strength) * 0.3), height * 0.8)
    ctx.closePath()
    ctx.stroke()
  }
}

const updateDisplay = () => {
  // Ảnh đầu vào
  if (inputCanvas.value) {
    const ctx = inputCanvas.value.getContext('2d')
    drawPoseSkeleton(ctx, 200, 200, false)
  }

  // Tín hiệu điều khiển
  if (controlCanvas.value) {
    const ctx = controlCanvas.value.getContext('2d')
    switch (selectedControl.value) {
      case 'pose':
        drawPoseSkeleton(ctx, 200, 200, true)
        break
      case 'canny':
        drawCannyEdges(ctx, 200, 200)
        break
      case 'depth':
        drawDepthMap(ctx, 200, 200)
        break
      case 'scribble':
        drawScribble(ctx, 200, 200)
        break
      case 'segmentation':
        drawSegmentation(ctx, 200, 200)
        break
    }
  }

  // Output
  if (outputCanvas.value) {
    const ctx = outputCanvas.value.getContext('2d')
    drawOutput(ctx, 200, 200, true)
  }

  // So sánh
  if (textOnlyCanvas.value) {
    const ctx = textOnlyCanvas.value.getContext('2d')
    drawOutput(ctx, 180, 180, false)
  }

  if (controlNetCanvas.value) {
    const ctx = controlNetCanvas.value.getContext('2d')
    drawOutput(ctx, 180, 180, true)
  }
}

onMounted(updateDisplay)
watch([selectedControl, controlStrength], updateDisplay)
</script>

<style scoped>
.controlnet-demo {
  margin: 0.5rem 0;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.control-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.control-card {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.control-card:hover {
  border-color: var(--vp-c-brand);
}

.control-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.control-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.control-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.control-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.workflow-viz {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.workflow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-label {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.workflow-canvas {
  width: 160px;
  height: 160px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
}

.workflow-canvas.control-signal {
  background: #000;
}

.workflow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--vp-c-text-3);
}

.arrow-label {
  font-size: 0.75rem;
}

.strength-control {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.strength-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.strength-desc {
  margin-top: 12px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.comparison-section {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.comparison-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.comparison-grid {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.comparison-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.item-label {
  font-weight: 500;
}

.comparison-canvas {
  width: 150px;
  height: 150px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
}

.item-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.use-cases {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.use-cases-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.use-case-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 16px;
  text-align: center;
}

.use-case-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.use-case-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.use-case-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.info-box {
  margin-top: 16px;
  padding: 12px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.6;
}

.icon {
  font-size: 1.2em;
}

@media (max-width: 640px) {
  .workflow-viz {
    flex-direction: column;
  }

  .workflow-arrow {
    transform: rotate(90deg);
    margin: 8px 0;
  }
}
</style>
