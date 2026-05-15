<!--
  CFGScaleDemo.vue
  Component minh hoạ CFG Scale

  Mục đích:
  Trình bày Classifier-Free Guidance (CFG) Scale ảnh hưởng tới kết quả sinh ảnh ra sao, giúp bạn hiểu khái niệm mức độ tuân theo prompt.

  Tương tác:
  - Trượt điều chỉnh CFG Scale
  - So sánh thời gian thực hiệu ứng của các giá trị CFG khác nhau
  - Trực quan hoá ảnh hưởng của CFG lên ảnh
-->
<template>
  <div class="cfg-scale-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><ScaleToOriginal /></el-icon>
          <span>⚖️ CFG Scale: Mức độ tuân theo prompt</span>
        </div>
      </template>

      <div class="demo-content">
        <!-- Điều khiển CFG -->
        <div class="cfg-control">
          <div class="cfg-slider-section">
            <div class="cfg-label">
              <span>CFG Scale</span>
              <el-tag
                type="primary"
                effect="dark"
                size="large"
              >
                {{ cfgScale }}
              </el-tag>
            </div>
            <el-slider
              v-model="cfgScale"
              :min="1"
              :max="15"
              :step="0.5"
              show-stops
              :marks="{
                1: '1\n(Tự do)',
                7: '7\n(Cân bằng)',
                15: '15\n(Tuân thủ chặt)'
              }"
            />
          </div>

          <div class="cfg-presets">
            <el-button
              v-for="preset in cfgPresets"
              :key="preset.value"
              :type="cfgScale === preset.value ? 'primary' : ''"
              size="small"
              @click="cfgScale = preset.value"
            >
              {{ preset.label }}
            </el-button>
          </div>
        </div>

        <!-- Khu vực so sánh -->
        <div class="comparison-display">
          <div class="comparison-item">
            <div class="item-label">
              <el-tag type="info">
                Sinh không điều kiện
              </el-tag>
              <span class="cfg-value">CFG = 1</span>
            </div>
            <canvas
              ref="uncondCanvas"
              width="200"
              height="200"
              class="comparison-canvas"
            />
            <div class="item-desc">
              Bỏ qua prompt, tự do sáng tạo
            </div>
          </div>

          <div class="comparison-arrow">
            <el-icon :size="32">
              <ArrowRight />
            </el-icon>
            <div class="guidance-formula">
              <div class="formula">
                Output = Không-điều-kiện + CFG × (Có-điều-kiện - Không-điều-kiện)
              </div>
              <div class="formula-desc">
                CFG càng lớn, ảnh hưởng của prompt càng mạnh
              </div>
            </div>
          </div>

          <div class="comparison-item">
            <div class="item-label">
              <el-tag type="success">
                Cấu hình hiện tại
              </el-tag>
              <span class="cfg-value">CFG = {{ cfgScale }}</span>
            </div>
            <canvas
              ref="currentCanvas"
              width="200"
              height="200"
              class="comparison-canvas"
            />
            <div class="item-desc">
              {{ getCfgDescription() }}
            </div>
          </div>
        </div>

        <!-- Khu vực hiệu ứng CFG -->
        <div class="cfg-effects">
          <div class="effects-title">
            So sánh hiệu ứng các giá trị CFG khác nhau
          </div>
          <div class="effects-grid">
            <div
              v-for="effect in cfgEffects"
              :key="effect.value"
              class="effect-item"
              :class="{ active: cfgScale === effect.value }"
              @click="cfgScale = effect.value"
            >
              <canvas
                :ref="el => setEffectCanvas(el, effect.value)"
                width="120"
                height="120"
                class="effect-canvas"
              />
              <div class="effect-label">
                CFG {{ effect.value }}
              </div>
              <div class="effect-desc">
                {{ effect.desc }}
              </div>
            </div>
          </div>
        </div>

        <!-- Cấu hình gợi ý -->
        <div class="recommendations">
          <div class="rec-title">
            🎯 Cấu hình gợi ý
          </div>
          <div class="rec-grid">
            <div class="rec-item">
              <div class="rec-scenario">
                Khám phá sáng tạo
              </div>
              <div class="rec-value">
                CFG 3-5
              </div>
              <div class="rec-desc">
                Cho AI nhiều tự do hơn, hợp khám phá nghệ thuật
              </div>
            </div>
            <div class="rec-item">
              <div class="rec-scenario">
                Chế độ cân bằng
              </div>
              <div class="rec-value">
                CFG 7-9
              </div>
              <div class="rec-desc">
                Lựa chọn tốt nhất cho đa số tình huống
              </div>
            </div>
            <div class="rec-item">
              <div class="rec-scenario">
                Kiểm soát chính xác
              </div>
              <div class="rec-value">
                CFG 12-15
              </div>
              <div class="rec-desc">
                Tuân thủ prompt chặt, nhưng có thể quá bão hoà
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>Nguyên lý CFG Scale:</strong>
          CFG (Classifier-Free Guidance) kiểm soát mức độ kết quả sinh ra tuân theo prompt. Giá trị càng cao, ảnh càng bám sát mô tả của prompt, nhưng quá cao sẽ khiến ảnh bị quá bão hoà hoặc méo.
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { ScaleToOriginal, ArrowRight } from '@element-plus/icons-vue'

const cfgScale = ref(7.5)
const uncondCanvas = ref(null)
const currentCanvas = ref(null)
const effectCanvases = ref({})

const cfgPresets = [
  { label: 'Tự do (3)', value: 3 },
  { label: 'Cân bằng (7)', value: 7 },
  { label: 'Nghiêm ngặt (12)', value: 12 }
]

const cfgEffects = [
  { value: 1, desc: 'Hoàn toàn tự do' },
  { value: 3, desc: 'Ưu tiên sáng tạo' },
  { value: 5, desc: 'Dẫn dắt nhẹ' },
  { value: 7, desc: 'Cân bằng' },
  { value: 9, desc: 'Tuân thủ chặt' },
  { value: 12, desc: 'Rất nghiêm' },
  { value: 15, desc: 'Quá bão hoà' }
]

const setEffectCanvas = (el, value) => {
  if (el) {
    effectCanvases.value[value] = el
  }
}

// Vẽ ảnh mục tiêu
const drawTargetImage = (ctx, width, height, cfgValue) => {
  // Ảnh nền (prompt: một con mèo màu xanh)
  const baseColor = { r: 100, g: 150, b: 200 }

  // Điều chỉnh độ bão hoà màu theo giá trị CFG
  const saturationBoost = Math.min((cfgValue - 1) / 7, 1.5)
  const color = {
    r: Math.min(255, baseColor.r + saturationBoost * 50),
    g: Math.max(0, baseColor.g - saturationBoost * 30),
    b: Math.min(255, baseColor.b + saturationBoost * 30)
  }

  // Nền
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, width, height)

  // Hình con mèo
  ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`

  // Thân
  ctx.beginPath()
  ctx.ellipse(width / 2, height * 0.65, width * 0.25, height * 0.2, 0, 0, Math.PI * 2)
  ctx.fill()

  // Đầu
  ctx.beginPath()
  ctx.arc(width / 2, height * 0.4, width * 0.18, 0, Math.PI * 2)
  ctx.fill()

  // Tai
  ctx.beginPath()
  ctx.moveTo(width * 0.35, height * 0.3)
  ctx.lineTo(width * 0.3, height * 0.15)
  ctx.lineTo(width * 0.42, height * 0.25)
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(width * 0.65, height * 0.3)
  ctx.lineTo(width * 0.7, height * 0.15)
  ctx.lineTo(width * 0.58, height * 0.25)
  ctx.fill()

  // Mắt
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.ellipse(width * 0.45, height * 0.38, width * 0.05, height * 0.04, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(width * 0.55, height * 0.38, width * 0.05, height * 0.04, 0, 0, Math.PI * 2)
  ctx.fill()

  // Đồng tử
  ctx.fillStyle = '#000'
  ctx.beginPath()
  ctx.arc(width * 0.45, height * 0.38, width * 0.025, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(width * 0.55, height * 0.38, width * 0.025, 0, Math.PI * 2)
  ctx.fill()

  // Thêm noise (mô phỏng độ tự do của CFG thấp)
  if (cfgValue < 5) {
    const imageData = ctx.getImageData(0, 0, width, height)
    const noiseAmount = (5 - cfgValue) / 5 * 30
    for (let i = 0; i < imageData.data.length; i += 4) {
      const noise = (Math.random() - 0.5) * noiseAmount
      imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + noise))
      imageData.data[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] + noise))
      imageData.data[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] + noise))
    }
    ctx.putImageData(imageData, 0, 0)
  }

  // Thêm hiệu ứng quá bão hoà (CFG cao)
  if (cfgValue > 10) {
    const imageData = ctx.getImageData(0, 0, width, height)
    const oversaturation = (cfgValue - 10) / 5
    for (let i = 0; i < imageData.data.length; i += 4) {
      // Tăng độ tương phản
      const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3
      imageData.data[i] = Math.min(255, imageData.data[i] + (imageData.data[i] - avg) * oversaturation)
      imageData.data[i + 1] = Math.min(255, imageData.data[i + 1] + (imageData.data[i + 1] - avg) * oversaturation)
      imageData.data[i + 2] = Math.min(255, imageData.data[i + 2] + (imageData.data[i + 2] - avg) * oversaturation)
    }
    ctx.putImageData(imageData, 0, 0)
  }
}

const getCfgDescription = () => {
  if (cfgScale.value <= 3) return 'Tự do sáng tạo, AI có nhiều không gian phát huy'
  if (cfgScale.value <= 7) return 'Chế độ cân bằng, vừa sáng tạo vừa tuân theo'
  if (cfgScale.value <= 10) return 'Tuân thủ prompt nghiêm ngặt'
  return 'Kiểm soát quá mức, ảnh có thể bị méo'
}

const updateDisplay = () => {
  // Cập nhật sinh không điều kiện
  if (uncondCanvas.value) {
    const ctx = uncondCanvas.value.getContext('2d')
    drawTargetImage(ctx, 200, 200, 1)
  }

  // Cập nhật cấu hình hiện tại
  if (currentCanvas.value) {
    const ctx = currentCanvas.value.getContext('2d')
    drawTargetImage(ctx, 200, 200, cfgScale.value)
  }

  // Cập nhật lưới hiệu ứng
  cfgEffects.forEach(effect => {
    const canvas = effectCanvases.value[effect.value]
    if (canvas) {
      const ctx = canvas.getContext('2d')
      drawTargetImage(ctx, 120, 120, effect.value)
    }
  })
}

onMounted(updateDisplay)
watch(cfgScale, updateDisplay)
</script>

<style scoped>
.cfg-scale-demo {
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

.cfg-control {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.cfg-slider-section {
  margin-bottom: 16px;
}

.cfg-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.cfg-label span {
  font-weight: 500;
}

.cfg-presets {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.comparison-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.comparison-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.item-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cfg-value {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.comparison-canvas {
  width: 180px;
  height: 180px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
}

.item-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

.comparison-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--vp-c-brand);
}

.guidance-formula {
  text-align: center;
  max-width: 200px;
}

.formula {
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg);
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 4px;
}

.formula-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.cfg-effects {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.effects-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.effects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
}

.effect-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.effect-item:hover {
  border-color: var(--vp-c-brand);
}

.effect-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.effect-canvas {
  width: 100px;
  height: 100px;
  border-radius: 6px;
}

.effect-label {
  font-weight: 500;
  font-size: 0.875rem;
}

.effect-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

.recommendations {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.rec-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.rec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.rec-item {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 16px;
  text-align: center;
}

.rec-scenario {
  font-weight: 500;
  margin-bottom: 8px;
}

.rec-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 8px;
}

.rec-desc {
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
  .comparison-display {
    flex-direction: column;
  }

  .comparison-arrow {
    transform: rotate(90deg);
    margin: 8px 0;
  }
}
</style>
