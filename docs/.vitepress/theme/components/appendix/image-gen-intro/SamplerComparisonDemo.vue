<!--
  SamplerComparisonDemo.vue
  Component so sánh sampler

  Mục đích:
  Trình bày đặc điểm sinh ảnh của các sampler khác nhau (Euler, DPM++, DDIM...), giúp bạn chọn sampler phù hợp.

  Tương tác:
  - Chọn và so sánh sampler
  - Điều chỉnh số bước
  - Trực quan hoá đường sinh ảnh
  - Hiển thị đánh đổi tốc độ/chất lượng
-->
<template>
  <div class="sampler-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><Timer /></el-icon>
          <span>⏱️ So sánh sampler</span>
        </div>
      </template>

      <div class="demo-content">
        <!-- Danh sách sampler -->
        <div class="sampler-list">
          <div
            v-for="sampler in samplers"
            :key="sampler.id"
            class="sampler-card"
            :class="{ active: selectedSampler === sampler.id }"
            @click="selectedSampler = sampler.id"
          >
            <div class="sampler-header">
              <span class="sampler-name">{{ sampler.name }}</span>
              <el-tag
                :type="sampler.speed"
                size="small"
              >
                {{ sampler.speedLabel }}
              </el-tag>
            </div>
            <div class="sampler-desc">
              {{ sampler.description }}
            </div>
            <div class="sampler-pros-cons">
              <div class="pros">
                <el-icon><CircleCheck /></el-icon>
                {{ sampler.pros }}
              </div>
              <div class="cons">
                <el-icon><CircleClose /></el-icon>
                {{ sampler.cons }}
              </div>
            </div>
          </div>
        </div>

        <!-- So sánh trực quan -->
        <div class="visualization-section">
          <div class="viz-header">
            <span class="viz-title">Trực quan hoá đường sinh ảnh</span>
            <el-slider
              v-model="steps"
              :min="10"
              :max="50"
              :step="5"
              show-stops
              style="width: 200px"
            />
            <span class="steps-label">{{ steps }} bước</span>
          </div>

          <div class="path-visualization">
            <canvas
              ref="pathCanvas"
              width="600"
              height="300"
              class="path-canvas"
            />
          </div>

          <div class="sampler-details">
            <el-descriptions
              :column="2"
              border
            >
              <el-descriptions-item label="Số bước khuyên dùng">
                {{ currentSampler.recommendedSteps }}
              </el-descriptions-item>
              <el-descriptions-item label="Tốc độ hội tụ">
                {{ currentSampler.convergence }}
              </el-descriptions-item>
              <el-descriptions-item label="Tình huống phù hợp">
                {{ currentSampler.useCase }}
              </el-descriptions-item>
              <el-descriptions-item label="Độ ổn định">
                <el-rate
                  :model-value="currentSampler.stability"
                  disabled
                  show-score
                  text-color="#ff9900"
                />
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- Ma trận khuyến nghị -->
        <div class="recommendation-matrix">
          <div class="matrix-title">
            🎯 Hướng dẫn chọn sampler
          </div>
          <div class="matrix-grid">
            <div class="matrix-row header">
              <div class="matrix-cell">
                Tình huống
              </div>
              <div class="matrix-cell">
                Sampler đề xuất
              </div>
              <div class="matrix-cell">
                Lý do
              </div>
            </div>
            <div
              v-for="rec in recommendations"
              :key="rec.scenario"
              class="matrix-row"
            >
              <div class="matrix-cell scenario">
                {{ rec.scenario }}
              </div>
              <div class="matrix-cell">
                <el-tag type="primary">
                  {{ rec.sampler }}
                </el-tag>
              </div>
              <div class="matrix-cell reason">
                {{ rec.reason }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>Vai trò của sampler:</strong>
          Sampler quyết định cách phục hồi ảnh từng bước từ noise. Các sampler khác nhau có đặc tính toán học khác nhau, ảnh hưởng đến tốc độ sinh, chất lượng và độ ổn định.
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Timer, CircleCheck, CircleClose } from '@element-plus/icons-vue'

const selectedSampler = ref('euler')
const steps = ref(20)
const pathCanvas = ref(null)

const samplers = [
  {
    id: 'euler',
    name: 'Euler',
    speed: 'success',
    speedLabel: 'Nhanh',
    description: 'Sampler đơn giản và hiệu quả nhất, hợp xem trước nhanh',
    pros: 'Tốc độ nhanh, chiếm ít bộ nhớ',
    cons: 'Số bước thấp có thể chưa tinh xảo',
    recommendedSteps: '20-30',
    convergence: 'Trung bình',
    useCase: 'Lặp nhanh, sinh phác thảo',
    stability: 3
  },
  {
    id: 'euler_a',
    name: 'Euler a',
    speed: 'success',
    speedLabel: 'Nhanh',
    description: 'Phiên bản tổ tiên của Euler, giàu tính sáng tạo hơn',
    pros: 'Kết quả sinh có nhiều sáng tạo hơn',
    cons: 'Hội tụ kém, kết quả không ổn định',
    recommendedSteps: '25-35',
    convergence: 'Chậm',
    useCase: 'Sáng tạo nghệ thuật, khám phá',
    stability: 2
  },
  {
    id: 'dpm',
    name: 'DPM++ 2M',
    speed: 'warning',
    speedLabel: 'Trung bình',
    description: 'Sampler phổ biến nhất hiện nay, cân bằng tốc độ và chất lượng',
    pros: 'Chất lượng cao, hội tụ nhanh',
    cons: 'Tính toán hơi nhiều',
    recommendedSteps: '20-30',
    convergence: 'Nhanh',
    useCase: 'Lựa chọn hàng đầu cho đa số tình huống',
    stability: 5
  },
  {
    id: 'dpm_karras',
    name: 'DPM++ 2M Karras',
    speed: 'warning',
    speedLabel: 'Trung bình',
    description: 'DPM++ dùng lịch noise Karras',
    pros: 'Số bước ít vẫn cho hiệu quả tốt',
    cons: 'Cần nhiều VRAM hơn',
    recommendedSteps: '15-25',
    convergence: 'Rất nhanh',
    useCase: 'Output chất lượng cao cuối cùng',
    stability: 5
  },
  {
    id: 'ddim',
    name: 'DDIM',
    speed: 'danger',
    speedLabel: 'Chậm hơn',
    description: 'Sampler tất định, kết quả có thể tái lập',
    pros: 'Tất định, cùng seed cho kết quả giống nhau',
    cons: 'Tốc độ chậm hơn',
    recommendedSteps: '25-50',
    convergence: 'Trung bình',
    useCase: 'Tình huống cần kết quả tái lập',
    stability: 4
  },
  {
    id: 'uni_pc',
    name: 'UniPC',
    speed: 'success',
    speedLabel: 'Nhanh',
    description: 'Sampler mới, chỉ 5-10 bước là ra ảnh',
    pros: 'Cực nhanh, hiệu quả tốt với số bước thấp',
    cons: 'Còn mới, độ tương thích cần kiểm chứng',
    recommendedSteps: '5-15',
    convergence: 'Cực nhanh',
    useCase: 'Ứng dụng thời gian thực, xem trước nhanh',
    stability: 4
  }
]

const currentSampler = computed(() => {
  return samplers.find(s => s.id === selectedSampler.value) || samplers[0]
})

const recommendations = [
  {
    scenario: 'Xem trước nhanh',
    sampler: 'Euler / UniPC',
    reason: 'Ít bước, nhanh, hợp thử nhiều prompt khác nhau'
  },
  {
    scenario: 'Output cuối cùng',
    sampler: 'DPM++ 2M Karras',
    reason: 'Chất lượng cao, hội tụ nhanh, 15-20 bước đã ra ảnh chất lượng'
  },
  {
    scenario: 'Sáng tạo nghệ thuật',
    sampler: 'Euler a',
    reason: 'Kết quả nhiều sáng tạo và ngẫu nhiên, hợp khám phá'
  },
  {
    scenario: 'Cần tái lập kết quả',
    sampler: 'DDIM',
    reason: 'Sampler tất định, cùng tham số cho kết quả hoàn toàn giống nhau'
  }
]

// Vẽ trực quan hoá đường sinh ảnh
const drawPathVisualization = () => {
  const canvas = pathCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  // Xoá canvas
  ctx.fillStyle = '#f5f5f5'
  ctx.fillRect(0, 0, width, height)

  // Vẽ trục toạ độ
  ctx.strokeStyle = '#ccc'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(40, height - 40)
  ctx.lineTo(width - 20, height - 40)
  ctx.moveTo(40, height - 40)
  ctx.lineTo(40, 20)
  ctx.stroke()

  // Nhãn
  ctx.fillStyle = '#666'
  ctx.font = '12px sans-serif'
  ctx.fillText('Số bước →', width - 70, height - 20)
  ctx.save()
  ctx.translate(20, height / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillText('Chất lượng ảnh →', 0, 0)
  ctx.restore()

  // Vẽ đường hội tụ của từng sampler
  const samplerCurves = {
    euler: { color: '#67c23a', curve: t => 1 - Math.exp(-t * 2) },
    euler_a: { color: '#e6a23c', curve: t => 1 - Math.exp(-t * 1.5) + Math.sin(t * 10) * 0.05 },
    dpm: { color: '#409eff', curve: t => 1 - Math.exp(-t * 3) },
    dpm_karras: { color: '#409eff', curve: t => 1 - Math.exp(-t * 4), dashed: true },
    ddim: { color: '#f56c6c', curve: t => 1 - Math.exp(-t * 1.8) },
    uni_pc: { color: '#909399', curve: t => 1 - Math.exp(-t * 5) }
  }

  const plotWidth = width - 60
  const plotHeight = height - 60

  Object.entries(samplerCurves).forEach(([id, config]) => {
    if (id !== selectedSampler.value && id !== 'dpm_karras') return

    ctx.strokeStyle = config.color
    ctx.lineWidth = id === selectedSampler.value ? 3 : 2
    ctx.setLineDash(config.dashed ? [5, 5] : [])

    ctx.beginPath()
    for (let i = 0; i <= steps.value; i++) {
      const t = i / 50
      const x = 40 + (i / 50) * plotWidth
      const y = height - 40 - config.curve(t) * plotHeight * 0.9

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()
  })

  ctx.setLineDash([])

  // Vẽ dấu hiện số bước hiện tại
  const currentX = 40 + (steps.value / 50) * plotWidth
  ctx.strokeStyle = '#ff6b6b'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(currentX, 20)
  ctx.lineTo(currentX, height - 40)
  ctx.stroke()

  // Điểm đánh dấu
  const selectedCurve = samplerCurves[selectedSampler.value]
  const currentT = steps.value / 50
  const currentY = height - 40 - selectedCurve.curve(currentT) * plotHeight * 0.9

  ctx.fillStyle = '#ff6b6b'
  ctx.beginPath()
  ctx.arc(currentX, currentY, 6, 0, Math.PI * 2)
  ctx.fill()

  // Chú giải
  let legendY = 30
  ctx.font = '12px sans-serif'
  Object.entries(samplerCurves).forEach(([id, config]) => {
    if (id !== selectedSampler.value) return

    ctx.fillStyle = config.color
    ctx.fillRect(width - 120, legendY, 15, 3)
    ctx.fillStyle = '#666'
    ctx.fillText(samplers.find(s => s.id === id)?.name || id, width - 100, legendY + 5)
    legendY += 20
  })
}

onMounted(drawPathVisualization)
watch([selectedSampler, steps], drawPathVisualization)
</script>

<style scoped>
.sampler-demo {
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

.sampler-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.sampler-card {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.sampler-card:hover {
  border-color: var(--vp-c-brand);
}

.sampler-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.sampler-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.sampler-name {
  font-weight: 600;
  font-size: 1.1rem;
}

.sampler-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 12px;
}

.sampler-pros-cons {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.8rem;
}

.pros {
  color: #67c23a;
  display: flex;
  align-items: center;
  gap: 4px;
}

.cons {
  color: #f56c6c;
  display: flex;
  align-items: center;
  gap: 4px;
}

.visualization-section {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.viz-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.viz-title {
  font-weight: 500;
}

.steps-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.path-visualization {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 16px;
}

.path-canvas {
  width: 100%;
  height: auto;
  max-height: 300px;
}

.sampler-details {
  margin-top: 16px;
}

.recommendation-matrix {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.matrix-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.matrix-grid {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.matrix-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr 2fr;
  background: var(--vp-c-bg);
}

.matrix-row.header {
  background: var(--vp-c-bg-mute);
  font-weight: 600;
}

.matrix-cell {
  padding: 12px;
  display: flex;
  align-items: center;
}

.matrix-cell.scenario {
  font-weight: 500;
}

.matrix-cell.reason {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
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
  .matrix-row {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 12px;
  }

  .matrix-row.header {
    display: none;
  }

  .matrix-cell {
    padding: 4px;
  }

  .matrix-cell::before {
    content: attr(data-label);
    font-weight: 600;
    margin-right: 8px;
  }
}
</style>
