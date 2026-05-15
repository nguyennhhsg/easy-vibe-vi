<!--
  LoRADemo.vue
  Component minh hoạ LoRA fine-tuning

  Mục đích:
  Trình bày LoRA (Low-Rank Adaptation) fine-tune model nhẹ ra sao, để sinh ra phong cách hoặc nhân vật cụ thể.

  Tương tác:
  - Điều chỉnh trọng số LoRA
  - Hiển thị tổ hợp base model + LoRA
  - So sánh hiệu quả sinh ảnh với các trọng số khác nhau
  - Trực quan hoá việc gộp nhiều LoRA
-->
<template>
  <div class="lora-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><Collection /></el-icon>
          <span>🎨 LoRA: Fine-tune nhẹ</span>
        </div>
      </template>

      <div class="demo-content">
        <!-- Giải thích khái niệm LoRA -->
        <div class="concept-section">
          <div class="concept-visual">
            <div class="model-box base">
              <div class="box-title">
                Base model
              </div>
              <div class="box-size">
                4-8 GB
              </div>
              <div class="box-desc">
                Kiến thức tổng quát
              </div>
            </div>
            <div class="plus-sign">
              +
            </div>
            <div class="model-box lora">
              <div class="box-title">
                Trọng số LoRA
              </div>
              <div class="box-size">
                50-200 MB
              </div>
              <div class="box-desc">
                Phong cách/nhân vật cụ thể
              </div>
            </div>
            <div class="equals-sign">
              =
            </div>
            <div class="model-box result">
              <div class="box-title">
                Model tuỳ biến
              </div>
              <div class="box-size">
                Không cần merge
              </div>
              <div class="box-desc">
                Nạp động
              </div>
            </div>
          </div>
        </div>

        <!-- Điều chỉnh trọng số LoRA -->
        <div class="weight-control-section">
          <div class="weight-header">
            <span>Điều chỉnh trọng số LoRA</span>
            <el-tag
              type="primary"
              effect="dark"
            >
              {{ loraWeight }}
            </el-tag>
          </div>
          <el-slider
            v-model="loraWeight"
            :min="0"
            :max="1.5"
            :step="0.1"
            show-stops
            :marks="{
              0: 'Không tác dụng',
              0.5: 'Nhẹ',
              1: 'Chuẩn',
              1.5: 'Mạnh'
            }"
          />

          <div class="lora-selector">
            <el-radio-group v-model="selectedLoRA">
              <el-radio-button label="anime">
                Phong cách anime
              </el-radio-button>
              <el-radio-button label="realistic">
                Phong cách tả thực
              </el-radio-button>
              <el-radio-button label="sketch">
                Phong cách phác thảo
              </el-radio-button>
              <el-radio-button label="3d">
                Phong cách 3D
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <!-- So sánh hiệu quả -->
        <div class="comparison-section">
          <div class="comparison-title">
            So sánh hiệu quả sinh ảnh
          </div>
          <div class="comparison-grid">
            <div class="comparison-item">
              <div class="item-label">
                <el-tag type="info">
                  Chỉ base model
                </el-tag>
              </div>
              <canvas
                ref="baseCanvas"
                width="200"
                height="200"
                class="comparison-canvas"
              />
              <div class="item-desc">
                Phong cách tổng quát
              </div>
            </div>

            <div class="comparison-item main">
              <div class="item-label">
                <el-tag type="success">
                  Base + LoRA ({{ loraWeight }})
                </el-tag>
              </div>
              <canvas
                ref="loraCanvas"
                width="200"
                height="200"
                class="comparison-canvas main-canvas"
              />
              <div class="item-desc">
                {{ getLoRADescription() }}
              </div>
            </div>
          </div>
        </div>

        <!-- Gộp nhiều LoRA -->
        <div class="fusion-section">
          <div class="fusion-title">
            🔀 Gộp nhiều LoRA
          </div>
          <div class="fusion-controls">
            <div
              v-for="(lora, index) in activeLoRAs"
              :key="index"
              class="fusion-item"
            >
              <el-tag
                :type="lora.type"
                closable
                @close="removeLoRA(index)"
              >
                {{ lora.name }}
              </el-tag>
              <el-slider
                v-model="lora.weight"
                :min="0"
                :max="1"
                :step="0.1"
                size="small"
                style="width: 120px"
              />
              <span class="weight-display">{{ lora.weight }}</span>
            </div>
            <el-dropdown @command="addLoRA">
              <el-button
                type="primary"
                size="small"
              >
                <el-icon><Plus /></el-icon> Thêm LoRA
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="anime">
                    Phong cách anime
                  </el-dropdown-item>
                  <el-dropdown-item command="realistic">
                    Phong cách tả thực
                  </el-dropdown-item>
                  <el-dropdown-item command="sketch">
                    Phong cách phác thảo
                  </el-dropdown-item>
                  <el-dropdown-item command="3d">
                    Phong cách 3D
                  </el-dropdown-item>
                  <el-dropdown-item command="watercolor">
                    Phong cách màu nước
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <div class="fusion-result">
            <canvas
              ref="fusionCanvas"
              width="250"
              height="250"
              class="fusion-canvas"
            />
            <div class="fusion-formula">
              <div class="formula-title">
                Công thức gộp
              </div>
              <div class="formula-content">
                Output = Base model + Σ(LoRAᵢ × trọng_sốᵢ)
              </div>
            </div>
          </div>
        </div>

        <!-- Tình huống ứng dụng -->
        <div class="use-cases">
          <div class="use-cases-title">
            🎯 Ứng dụng tiêu biểu của LoRA
          </div>
          <div class="use-cases-grid">
            <div class="use-case-card">
              <div class="use-case-icon">
                👤
              </div>
              <div class="use-case-title">
                Nhất quán nhân vật
              </div>
              <div class="use-case-desc">
                Huấn luyện nhân vật cụ thể, giữ hình tượng nhất quán
              </div>
            </div>
            <div class="use-case-card">
              <div class="use-case-icon">
                🎨
              </div>
              <div class="use-case-title">
                Phong cách nghệ thuật
              </div>
              <div class="use-case-desc">
                Mô phỏng phong cách của một hoạ sĩ hay trường phái cụ thể
              </div>
            </div>
            <div class="use-case-card">
              <div class="use-case-icon">
                👗
              </div>
              <div class="use-case-title">
                Concept trang phục
              </div>
              <div class="use-case-desc">
                Thiết kế trang phục hay phụ kiện cụ thể
              </div>
            </div>
            <div class="use-case-card">
              <div class="use-case-icon">
                🏢
              </div>
              <div class="use-case-title">
                Trưng bày sản phẩm
              </div>
              <div class="use-case-desc">
                Phong cách của sản phẩm hay thương hiệu cụ thể
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>Nguyên lý LoRA:</strong>
          LoRA fine-tune bằng cách thêm ma trận low-rank cạnh ma trận trọng số gốc, chỉ huấn luyện một lượng nhỏ tham số (thường &lt; 1%) là có thể học được phong cách hoặc nhân vật cụ thể. So với full fine-tune, LoRA có file nhỏ, train nhanh, và có thể kết hợp nhiều LoRA với nhau.
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Collection, Plus } from '@element-plus/icons-vue'

const loraWeight = ref(0.8)
const selectedLoRA = ref('anime')

const baseCanvas = ref(null)
const loraCanvas = ref(null)
const fusionCanvas = ref(null)

const activeLoRAs = ref([
  { name: 'Phong cách anime', type: 'primary', weight: 0.6 },
  { name: 'Hiệu ứng màu nước', type: 'success', weight: 0.3 }
])

const loraTypes = {
  anime: { name: 'Phong cách anime', type: 'primary', color: '#FFB6C1' },
  realistic: { name: 'Phong cách tả thực', type: 'success', color: '#DDA0DD' },
  sketch: { name: 'Phong cách phác thảo', type: 'warning', color: '#D3D3D3' },
  '3d': { name: 'Phong cách 3D', type: 'danger', color: '#87CEEB' },
  watercolor: { name: 'Hiệu ứng màu nước', type: 'info', color: '#98FB98' }
}

const getLoRADescription = () => {
  const descriptions = {
    anime: 'Phong cách anime mắt to, màu sắc tươi',
    realistic: 'Chân thực như ảnh chụp',
    sketch: 'Nét vẽ tay và đổ bóng',
    '3d': 'Cảm giác lập thể và render chất liệu',
    watercolor: 'Hiệu ứng loang màu nước nhẹ nhàng'
  }
  return descriptions[selectedLoRA.value] || ''
}

const addLoRA = (command) => {
  const loraInfo = loraTypes[command]
  if (loraInfo) {
    activeLoRAs.value.push({
      name: loraInfo.name,
      type: loraInfo.type,
      weight: 0.5
    })
  }
}

const removeLoRA = (index) => {
  activeLoRAs.value.splice(index, 1)
}

// Vẽ ảnh nền
const drawBaseImage = (ctx, width, height) => {
  ctx.fillStyle = '#f5f5f5'
  ctx.fillRect(0, 0, width, height)

  // Vẽ đường viền nhân vật đơn giản
  ctx.strokeStyle = '#666'
  ctx.lineWidth = 2

  // Đầu
  ctx.beginPath()
  ctx.arc(width * 0.5, height * 0.3, width * 0.2, 0, Math.PI * 2)
  ctx.stroke()

  // Thân
  ctx.beginPath()
  ctx.moveTo(width * 0.5, height * 0.5)
  ctx.lineTo(width * 0.5, height * 0.8)
  ctx.stroke()

  // Cánh tay
  ctx.beginPath()
  ctx.moveTo(width * 0.5, height * 0.55)
  ctx.lineTo(width * 0.25, height * 0.7)
  ctx.moveTo(width * 0.5, height * 0.55)
  ctx.lineTo(width * 0.75, height * 0.7)
  ctx.stroke()
}

// Vẽ hiệu ứng LoRA
const drawLoRAImage = (ctx, width, height, loraType, weight) => {
  // Vẽ base trước
  drawBaseImage(ctx, width, height)

  // Thêm hiệu ứng theo loại LoRA
  const effects = {
    anime: () => {
      // Phong cách anime: mắt to, màu sắc tươi
      ctx.fillStyle = `rgba(255, 182, 193, ${weight * 0.5})`
      ctx.fillRect(0, 0, width, height)

      // Mắt to
      ctx.fillStyle = `rgba(100, 149, 237, ${weight})`
      ctx.beginPath()
      ctx.ellipse(width * 0.42, height * 0.28, width * 0.08 * weight, width * 0.1 * weight, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(width * 0.58, height * 0.28, width * 0.08 * weight, width * 0.1 * weight, 0, 0, Math.PI * 2)
      ctx.fill()
    },
    realistic: () => {
      // Phong cách tả thực: đổ bóng, chi tiết
      ctx.fillStyle = `rgba(139, 69, 19, ${weight * 0.3})`
      ctx.fillRect(0, 0, width, height)

      // Thêm bóng
      ctx.fillStyle = `rgba(0, 0, 0, ${weight * 0.2})`
      ctx.beginPath()
      ctx.ellipse(width * 0.5, height * 0.85, width * 0.3, height * 0.05, 0, 0, Math.PI * 2)
      ctx.fill()
    },
    sketch: () => {
      // Phong cách phác thảo: nét và bóng chéo
      ctx.strokeStyle = `rgba(0, 0, 0, ${weight * 0.5})`
      ctx.lineWidth = 1
      for (let i = 0; i < 10; i++) {
        ctx.beginPath()
        ctx.moveTo(0, i * height * 0.1)
        ctx.lineTo(width, i * height * 0.1 + height * 0.1)
        ctx.stroke()
      }
    },
    '3d': () => {
      // Phong cách 3D: gradient, cảm giác lập thể
      const gradient = ctx.createRadialGradient(
        width * 0.3, height * 0.3, 0,
        width * 0.5, height * 0.5, width * 0.6
      )
      gradient.addColorStop(0, `rgba(255, 255, 255, ${weight * 0.5})`)
      gradient.addColorStop(1, `rgba(0, 0, 0, ${weight * 0.2})`)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    }
  }

  if (effects[loraType]) {
    effects[loraType]()
  }
}

// Vẽ hiệu ứng gộp
const drawFusionImage = (ctx, width, height) => {
  ctx.fillStyle = '#f5f5f5'
  ctx.fillRect(0, 0, width, height)

  // Ảnh nền
  drawBaseImage(ctx, width, height)

  // Chồng tất cả hiệu ứng LoRA
  activeLoRAs.value.forEach(lora => {
    const loraKey = Object.keys(loraTypes).find(
      key => loraTypes[key].name === lora.name
    )
    if (loraKey) {
      ctx.save()
      ctx.globalAlpha = lora.weight
      drawLoRAImage(ctx, width, height, loraKey, 1)
      ctx.restore()
    }
  })
}

const updateDisplay = () => {
  if (baseCanvas.value) {
    const ctx = baseCanvas.value.getContext('2d')
    drawBaseImage(ctx, 200, 200)
  }

  if (loraCanvas.value) {
    const ctx = loraCanvas.value.getContext('2d')
    drawLoRAImage(ctx, 200, 200, selectedLoRA.value, loraWeight.value)
  }

  if (fusionCanvas.value) {
    const ctx = fusionCanvas.value.getContext('2d')
    drawFusionImage(ctx, 250, 250)
  }
}

onMounted(updateDisplay)
watch([loraWeight, selectedLoRA, activeLoRAs], updateDisplay, { deep: true })
</script>

<style scoped>
.lora-demo {
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

.concept-section {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.concept-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.model-box {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 16px 24px;
  text-align: center;
  border: 2px solid var(--vp-c-divider);
  min-width: 120px;
}

.model-box.base {
  border-color: #409eff;
}

.model-box.lora {
  border-color: #67c23a;
}

.model-box.result {
  border-color: #e6a23c;
}

.box-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.box-size {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.box-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.plus-sign, .equals-sign {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
}

.weight-control-section {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.weight-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.lora-selector {
  margin-top: 16px;
  display: flex;
  justify-content: center;
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

.comparison-item.main {
  transform: scale(1.1);
}

.item-label {
  font-weight: 500;
}

.comparison-canvas {
  width: 160px;
  height: 160px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
}

.comparison-canvas.main-canvas {
  border-color: var(--vp-c-brand);
}

.item-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.fusion-section {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.fusion-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.fusion-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 20px;
}

.fusion-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--vp-c-bg);
  padding: 8px 12px;
  border-radius: 6px;
}

.weight-display {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  min-width: 40px;
}

.fusion-result {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.fusion-canvas {
  width: 200px;
  height: 200px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 2px solid var(--vp-c-brand);
}

.fusion-formula {
  text-align: center;
}

.formula-title {
  font-weight: 500;
  margin-bottom: 8px;
}

.formula-content {
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  background: var(--vp-c-bg);
  padding: 12px;
  border-radius: 6px;
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
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
  font-size: 0.75rem;
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
</style>
