<!--
  VaeEncoderDemo.vue
  Component minh hoạ VAE Encoder/Decoder

  Mục đích:
  Trình bày VAE nén ảnh độ phân giải cao xuống latent space, và khôi phục ảnh từ latent space ra sao.
  Giúp bạn hiểu khái niệm Latent Space.

  Tương tác:
  - Chuyển đổi chế độ encode/decode
  - Trực quan hoá quá trình nén
  - Hiển thị biểu diễn trong latent space
  - So sánh ảnh gốc và ảnh tái tạo
-->
<template>
  <div class="vae-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-controls">
          <span class="title">🔍 VAE Encoder/Decoder</span>
          <el-radio-group
            v-model="mode"
            size="small"
          >
            <el-radio-button label="encode">
              <el-icon><ArrowRight /></el-icon> Encode
            </el-radio-button>
            <el-radio-button label="decode">
              <el-icon><ArrowLeft /></el-icon> Decode
            </el-radio-button>
          </el-radio-group>
        </div>
      </template>

      <div class="vae-flow">
        <!-- Phía đầu vào -->
        <div class="stage">
          <div class="stage-label">
            {{ mode === 'encode' ? 'Ảnh gốc' : 'Biểu diễn latent space' }}
          </div>
          <div class="stage-visual">
            <canvas
              ref="inputCanvas"
              width="200"
              height="200"
              class="stage-canvas"
            />
          </div>
          <div class="stage-info">
            <el-tag
              size="small"
              type="info"
            >
              {{ mode === 'encode' ? '512 × 512 × 3 = 786,432 giá trị' : '64 × 64 × 4 = 16,384 giá trị' }}
            </el-tag>
          </div>
        </div>

        <!-- Mũi tên -->
        <div class="arrow-stage">
          <el-icon
            class="flow-arrow"
            :size="32"
          >
            <component :is="mode === 'encode' ? ArrowRight : ArrowLeft" />
          </el-icon>
          <div class="compression-ratio">
            <el-tag
              type="success"
              effect="dark"
            >
              Tỉ lệ nén: 48×
            </el-tag>
          </div>
        </div>

        <!-- Phía đầu ra -->
        <div class="stage">
          <div class="stage-label">
            {{ mode === 'encode' ? 'Biểu diễn latent space' : 'Ảnh tái tạo' }}
          </div>
          <div class="stage-visual">
            <canvas
              ref="outputCanvas"
              width="200"
              height="200"
              class="stage-canvas"
            />
          </div>
          <div class="stage-info">
            <el-tag
              size="small"
              type="info"
            >
              {{ mode === 'encode' ? '64 × 64 × 4 = 16,384 giá trị' : '512 × 512 × 3 = 786,432 giá trị' }}
            </el-tag>
          </div>
        </div>
      </div>

      <!-- Trực quan hoá latent space -->
      <div
        v-if="mode === 'encode'"
        class="latent-viz"
      >
        <div class="latent-title">
          Bản đồ đặc trưng latent space (4 channel)
        </div>
        <div class="latent-channels">
          <div
            v-for="i in 4"
            :key="i"
            class="channel-box"
            :style="getChannelStyle(i)"
          >
            <span class="channel-label">Channel {{ i }}</span>
          </div>
        </div>
      </div>

      <div class="explanation">
        <el-alert
          :title="mode === 'encode' ? 'Encode: Ảnh → Latent space' : 'Decode: Latent space → Ảnh'"
          :type="mode === 'encode' ? 'warning' : 'success'"
          :description="mode === 'encode'
            ? 'VAE Encoder nén ảnh nhiều chiều xuống latent space ít chiều, giữ lại thông tin ngữ nghĩa quan trọng và bỏ đi chi tiết dư thừa. Giống như cô đọng một cuốn sách dày thành dàn ý.'
            : 'VAE Decoder tái tạo ảnh từ biểu diễn latent space. Tuy không thể khôi phục hoàn hảo mọi chi tiết, nhưng đủ để sinh ra ảnh chất lượng cao. Giống như viết lại một cuốn sách dựa trên dàn ý.'"
          show-icon
          :closable="false"
        />
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>Tại sao cần VAE?</strong>
          Huấn luyện diffusion model trực tiếp trong không gian pixel tốn quá nhiều tính toán. Nhờ nén xuống latent space qua VAE, hiệu suất tính toán tăng khoảng 48 lần mà vẫn giữ được chất lượng ảnh.
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue'

const mode = ref('encode')
const inputCanvas = ref(null)
const outputCanvas = ref(null)

// Vẽ ảnh ví dụ
const drawSampleImage = (canvas) => {
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  // Vẽ một bức tranh phong cảnh
  // Bầu trời
  const skyGradient = ctx.createLinearGradient(0, 0, 0, h * 0.6)
  skyGradient.addColorStop(0, '#87CEEB')
  skyGradient.addColorStop(1, '#E0F7FA')
  ctx.fillStyle = skyGradient
  ctx.fillRect(0, 0, w, h * 0.6)

  // Mặt trời
  ctx.beginPath()
  ctx.arc(w * 0.75, h * 0.2, w * 0.1, 0, Math.PI * 2)
  ctx.fillStyle = '#FFD700'
  ctx.fill()

  // Núi
  ctx.fillStyle = '#4CAF50'
  ctx.beginPath()
  ctx.moveTo(0, h * 0.6)
  ctx.lineTo(w * 0.3, h * 0.3)
  ctx.lineTo(w * 0.7, h * 0.5)
  ctx.lineTo(w, h * 0.4)
  ctx.lineTo(w, h)
  ctx.lineTo(0, h)
  ctx.fill()

  // Bãi cỏ
  ctx.fillStyle = '#8BC34A'
  ctx.fillRect(0, h * 0.6, w, h * 0.4)

  // Hoa
  const colors = ['#FF69B4', '#FFD700', '#FF6347', '#9370DB']
  for (let i = 0; i < 8; i++) {
    const x = (i * w * 0.12) + 20
    const y = h * 0.75 + (i % 2) * 30
    ctx.fillStyle = colors[i % colors.length]
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, Math.PI * 2)
    ctx.fill()
  }
}

// Vẽ biểu diễn latent space (trực quan hoá trừu tượng)
const drawLatentRepresentation = (canvas) => {
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  // Sinh kết cấu noise đại diện cho latent space
  const imageData = ctx.createImageData(w, h)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4
      // Dùng Perlin noise mô phỏng đặc trưng latent space
      const value = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 50 + 128
      imageData.data[i] = value + Math.random() * 30
      imageData.data[i + 1] = value + Math.random() * 30
      imageData.data[i + 2] = value + Math.random() * 30
      imageData.data[i + 3] = 255
    }
  }
  ctx.putImageData(imageData, 0, 0)
}

// Lấy style cho channel
const getChannelStyle = (channel) => {
  const hues = [200, 120, 30, 280]
  return {
    background: `linear-gradient(135deg, hsl(${hues[channel - 1]}, 70%, 50%), hsl(${hues[channel - 1]}, 70%, 30%))`
  }
}

// Cập nhật hiển thị
const updateDisplay = () => {
  if (!inputCanvas.value || !outputCanvas.value) return

  if (mode.value === 'encode') {
    drawSampleImage(inputCanvas.value)
    drawLatentRepresentation(outputCanvas.value)
  } else {
    drawLatentRepresentation(inputCanvas.value)
    drawSampleImage(outputCanvas.value)
  }
}

onMounted(updateDisplay)
watch(mode, updateDisplay)
</script>

<style scoped>
.vae-demo {
  margin: 0.5rem 0;
}

.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-weight: 600;
}

.vae-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px 0;
  flex-wrap: wrap;
}

.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.stage-label {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.stage-visual {
  width: 200px;
  height: 200px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid var(--vp-c-divider);
}

.stage-canvas {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stage-info {
  font-size: 0.75rem;
}

.arrow-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.flow-arrow {
  color: var(--vp-c-brand);
}

.compression-ratio {
  font-size: 0.8rem;
}

.latent-viz {
  margin-top: 16px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.latent-title {
  font-weight: 500;
  margin-bottom: 12px;
  text-align: center;
}

.latent-channels {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.channel-box {
  aspect-ratio: 1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.channel-label {
  position: absolute;
  bottom: 4px;
  left: 4px;
  font-size: 0.7rem;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 6px;
  border-radius: 3px;
}

.explanation {
  margin-top: 16px;
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
  .vae-flow {
    flex-direction: column;
  }

  .arrow-stage {
    transform: rotate(90deg);
  }

  .latent-channels {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
