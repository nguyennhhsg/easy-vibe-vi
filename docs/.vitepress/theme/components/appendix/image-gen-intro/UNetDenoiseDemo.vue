<!--
  UNetDenoiseDemo.vue
  Component minh hoạ quá trình khử nhiễu UNet

  Mục đích:
  Trình bày UNet/DiT khôi phục ảnh từng bước từ noise ra sao, để hiểu cơ chế khử nhiễu cốt lõi của diffusion model.

  Tương tác:
  - Chạy từng bước hoặc tự động cho quá trình khử nhiễu
  - Trực quan hoá dự đoán noise
  - Hiển thị kết quả dự đoán tại các timestep khác nhau
  - So sánh sinh ảnh có/không có text guidance
-->
<template>
  <div class="unet-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-controls">
          <span class="title">🧠 Mô hình khử nhiễu UNet</span>
          <div class="controls">
            <el-button-group>
              <el-button
                :disabled="currentStep <= 0"
                @click="stepBackward"
              >
                <el-icon><ArrowLeft /></el-icon>
              </el-button>
              <el-button @click="togglePlay">
                <el-icon v-if="isPlaying">
                  <VideoPause />
                </el-icon>
                <el-icon v-else>
                  <VideoPlay />
                </el-icon>
              </el-button>
              <el-button
                :disabled="currentStep >= totalSteps"
                @click="stepForward"
              >
                <el-icon><ArrowRight /></el-icon>
              </el-button>
            </el-button-group>
            <el-button @click="reset">
              Đặt lại
            </el-button>
          </div>
        </div>
      </template>

      <div class="demo-content">
        <!-- Khu vực chính -->
        <div class="main-display">
          <div class="display-section">
            <div class="section-label">
              Ảnh nhiễu hiện tại (Noisy Image)
            </div>
            <canvas
              ref="noisyCanvas"
              width="256"
              height="256"
              class="display-canvas"
            />
            <div class="timestep-info">
              <el-tag type="info">
                Timestep: {{ currentStep }} / {{ totalSteps }}
              </el-tag>
              <el-tag :type="getNoiseLevelType()">
                Mức noise: {{ getNoiseLevel() }}%
              </el-tag>
            </div>
          </div>

          <div class="arrow-section">
            <el-icon :size="24">
              <ArrowRight />
            </el-icon>
            <div class="model-box">
              <div class="model-name">
                UNet / DiT
              </div>
              <div class="model-desc">
                Dự đoán noise
              </div>
            </div>
            <el-icon :size="24">
              <ArrowRight />
            </el-icon>
          </div>

          <div class="display-section">
            <div class="section-label">
              Noise được dự đoán (Predicted Noise)
            </div>
            <canvas
              ref="noiseCanvas"
              width="256"
              height="256"
              class="display-canvas noise-preview"
            />
            <div class="noise-stats">
              <el-tag
                size="small"
                type="warning"
              >
                Ước lượng noise
              </el-tag>
            </div>
          </div>

          <div class="arrow-section">
            <el-icon :size="24">
              <ArrowRight />
            </el-icon>
            <div class="operation-box">
              <div class="op-name">
                Phép trừ
              </div>
              <div class="op-formula">
                x - ε
              </div>
            </div>
            <el-icon :size="24">
              <ArrowRight />
            </el-icon>
          </div>

          <div class="display-section">
            <div class="section-label">
              Kết quả khử nhiễu (Denoised)
            </div>
            <canvas
              ref="denoisedCanvas"
              width="256"
              height="256"
              class="display-canvas"
            />
            <div class="progress-info">
              <el-progress
                :percentage="(currentStep / totalSteps) * 100"
                :status="currentStep === totalSteps ? 'success' : ''"
              />
            </div>
          </div>
        </div>

        <!-- Trục thời gian -->
        <div class="timeline-section">
          <div class="timeline-label">
            Trục thời gian khử nhiễu
          </div>
          <el-slider
            v-model="currentStep"
            :min="0"
            :max="totalSteps"
            :step="1"
            show-stops
            :marks="marks"
            @input="updateDisplay"
          />
        </div>

        <!-- Chế độ so sánh -->
        <div class="compare-section">
          <el-switch
            v-model="showComparison"
            active-text="Hiện so sánh (có/không text guidance)"
          />
          <div
            v-if="showComparison"
            class="compare-display"
          >
            <div class="compare-item">
              <div class="compare-label">
                Không guidance (Unconditional)
              </div>
              <canvas
                ref="uncondCanvas"
                width="200"
                height="200"
                class="compare-canvas"
              />
            </div>
            <div class="compare-item">
              <div class="compare-label">
                Có guidance (CFG Scale=7.5)
              </div>
              <canvas
                ref="condCanvas"
                width="200"
                height="200"
                class="compare-canvas"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>Nguyên lý khử nhiễu:</strong>
          UNet học cách dự đoán noise trong ảnh, sau đó lấy ảnh gốc trừ đi noise dự đoán để ra kết quả rõ hơn. Lặp lại quá trình này cho đến khi từ noise thuần khôi phục ra ảnh rõ nét.
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowRight, ArrowLeft, VideoPlay, VideoPause } from '@element-plus/icons-vue'

const noisyCanvas = ref(null)
const noiseCanvas = ref(null)
const denoisedCanvas = ref(null)
const uncondCanvas = ref(null)
const condCanvas = ref(null)

const currentStep = ref(0)
const totalSteps = 20
const isPlaying = ref(false)
const showComparison = ref(false)

const marks = {
  0: 'Noise thuần',
  10: 'Giữa quá trình',
  20: 'Ảnh rõ nét'
}

let animationId = null

// Sinh ảnh mục tiêu (phiên bản rút gọn)
const generateTargetImage = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  // Vẽ hoạ tiết mục tiêu đơn giản
  const gradient = ctx.createLinearGradient(0, 0, 256, 256)
  gradient.addColorStop(0, '#667eea')
  gradient.addColorStop(1, '#764ba2')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 256, 256)

  // Thêm vài hình dạng
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
  for (let i = 0; i < 5; i++) {
    ctx.beginPath()
    ctx.arc(50 + i * 40, 100 + (i % 2) * 50, 30, 0, Math.PI * 2)
    ctx.fill()
  }

  return ctx.getImageData(0, 0, 256, 256)
}

const targetImage = generateTargetImage()

// Sinh noise
const generateNoise = (width, height, intensity) => {
  const data = new Uint8ClampedArray(width * height * 4)
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * intensity * 255
    data[i] = 128 + noise
    data[i + 1] = 128 + noise
    data[i + 2] = 128 + noise
    data[i + 3] = 255
  }
  return new ImageData(data, width, height)
}

// Trộn ảnh với noise
const blendWithNoise = (imageData, noiseRatio) => {
  const result = new Uint8ClampedArray(imageData.data)
  for (let i = 0; i < result.length; i += 4) {
    const noise = (Math.random() - 0.5) * noiseRatio * 255
    result[i] = Math.max(0, Math.min(255, imageData.data[i] * (1 - noiseRatio) + 128 * noiseRatio + noise))
    result[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] * (1 - noiseRatio) + 128 * noiseRatio + noise))
    result[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] * (1 - noiseRatio) + 128 * noiseRatio + noise))
  }
  return new ImageData(result, imageData.width, imageData.height)
}

// Dự đoán noise (mô phỏng rút gọn)
const predictNoise = (width, height, step) => {
  const noiseRatio = 1 - (step / totalSteps)
  return generateNoise(width, height, noiseRatio * 0.5)
}

// Khử nhiễu
const denoise = (noisyData, noiseData, step) => {
  const result = new Uint8ClampedArray(noisyData.data)
  const denoiseStrength = 0.1 + (step / totalSteps) * 0.4

  for (let i = 0; i < result.length; i += 4) {
    // Mô phỏng: trừ noise dự đoán khỏi ảnh nhiễu
    const targetR = targetImage.data[i]
    const targetG = targetImage.data[i + 1]
    const targetB = targetImage.data[i + 2]

    const currentR = noisyData.data[i]
    const currentG = noisyData.data[i + 1]
    const currentB = noisyData.data[i + 2]

    result[i] = currentR + (targetR - currentR) * denoiseStrength
    result[i + 1] = currentG + (targetG - currentG) * denoiseStrength
    result[i + 2] = currentB + (targetB - currentB) * denoiseStrength
  }

  return new ImageData(result, noisyData.width, noisyData.height)
}

// Cập nhật hiển thị
const updateDisplay = () => {
  const step = currentStep.value
  const noiseRatio = 1 - (step / totalSteps)

  // Vẽ ảnh nhiễu
  const noisyCtx = noisyCanvas.value.getContext('2d')
  const noisyData = blendWithNoise(targetImage, noiseRatio)
  noisyCtx.putImageData(noisyData, 0, 0)

  // Vẽ noise dự đoán
  const noiseCtx = noiseCanvas.value.getContext('2d')
  const noiseData = predictNoise(256, 256, step)
  noiseCtx.putImageData(noiseData, 0, 0)

  // Vẽ kết quả khử nhiễu
  const denoisedCtx = denoisedCanvas.value.getContext('2d')
  const denoisedData = denoise(noisyData, noiseData, step)
  denoisedCtx.putImageData(denoisedData, 0, 0)

  // Cập nhật ảnh so sánh
  if (showComparison.value && uncondCanvas.value && condCanvas.value) {
    // Sinh không điều kiện (còn nhiều noise hơn)
    const uncondCtx = uncondCanvas.value.getContext('2d')
    const uncondData = blendWithNoise(targetImage, noiseRatio * 0.3)
    uncondCtx.putImageData(uncondData, 0, 0)

    // Sinh có điều kiện (rõ nét hơn)
    const condCtx = condCanvas.value.getContext('2d')
    condCtx.putImageData(denoisedData, 0, 0)
  }
}

const getNoiseLevel = () => {
  return Math.round((1 - currentStep.value / totalSteps) * 100)
}

const getNoiseLevelType = () => {
  const level = getNoiseLevel()
  if (level > 70) return 'danger'
  if (level > 30) return 'warning'
  return 'success'
}

const stepForward = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++
    updateDisplay()
  }
}

const stepBackward = () => {
  if (currentStep.value > 0) {
    currentStep.value--
    updateDisplay()
  }
}

const togglePlay = () => {
  if (isPlaying.value) {
    stopAnimation()
  } else {
    startAnimation()
  }
}

const startAnimation = () => {
  isPlaying.value = true
  const animate = () => {
    if (!isPlaying.value) return

    if (currentStep.value >= totalSteps) {
      currentStep.value = 0
    } else {
      currentStep.value++
    }
    updateDisplay()

    animationId = setTimeout(() => {
      requestAnimationFrame(animate)
    }, 200)
  }
  animate()
}

const stopAnimation = () => {
  isPlaying.value = false
  if (animationId) {
    clearTimeout(animationId)
    animationId = null
  }
}

const reset = () => {
  stopAnimation()
  currentStep.value = 0
  updateDisplay()
}

onMounted(updateDisplay)
onUnmounted(stopAnimation)
</script>

<style scoped>
.unet-demo {
  margin: 0.5rem 0;
}

.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.title {
  font-weight: 600;
}

.controls {
  display: flex;
  gap: 8px;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.main-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 16px 0;
}

.display-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.section-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.display-canvas {
  width: 200px;
  height: 200px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
}

.noise-preview {
  filter: grayscale(100%);
}

.timestep-info {
  display: flex;
  gap: 8px;
}

.arrow-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-text-3);
}

.model-box,
.operation-box {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 12px 16px;
  text-align: center;
  min-width: 80px;
}

.model-name,
.op-name {
  font-weight: 600;
  font-size: 0.875rem;
}

.model-desc,
.op-formula {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 4px;
}

.progress-info {
  width: 100%;
  max-width: 200px;
}

.timeline-section {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.timeline-label {
  font-weight: 500;
  margin-bottom: 12px;
}

.compare-section {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.compare-display {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.compare-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.compare-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.compare-canvas {
  width: 150px;
  height: 150px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
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

@media (max-width: 768px) {
  .main-display {
    flex-direction: column;
  }

  .arrow-section {
    transform: rotate(90deg);
    margin: 8px 0;
  }
}
</style>
