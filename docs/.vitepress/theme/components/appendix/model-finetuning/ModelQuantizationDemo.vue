<template>
  <div class="quantization-demo">
    <div class="demo-header">
      <h4>Demo quantization mô hình</h4>
      <p class="subtitle">Chọn độ chính xác để cảm nhận trực quan thay đổi về kích thước, tốc độ và chất lượng</p>
    </div>

    <div class="precision-selector">
      <div
        v-for="(p, i) in precisions"
        :key="p.id"
        class="precision-card"
        :class="{ active: activePrecision === i }"
        @click="activePrecision = i"
      >
        <div class="prec-badge" :style="{ background: p.color }">{{ p.label }}</div>
        <div class="prec-bits">{{ p.bits }} bit</div>
      </div>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-icon">💾</div>
        <div class="metric-label">Kích thước mô hình</div>
        <div class="metric-bar-wrap">
          <div class="metric-bar" :style="{ width: currentPrecision.sizePercent + '%', background: currentPrecision.color }"></div>
        </div>
        <div class="metric-value">{{ currentPrecision.size }}</div>
      </div>

      <div class="metric-card">
        <div class="metric-icon">⚡</div>
        <div class="metric-label">Tốc độ inference</div>
        <div class="metric-bar-wrap">
          <div class="metric-bar" :style="{ width: currentPrecision.speedPercent + '%', background: '#10b981' }"></div>
        </div>
        <div class="metric-value">{{ currentPrecision.speed }}</div>
      </div>

      <div class="metric-card">
        <div class="metric-icon">🎯</div>
        <div class="metric-label">Chất lượng output</div>
        <div class="metric-bar-wrap">
          <div class="metric-bar" :style="{ width: currentPrecision.qualityPercent + '%', background: '#818cf8' }"></div>
        </div>
        <div class="metric-value">{{ currentPrecision.quality }}</div>
      </div>

      <div class="metric-card">
        <div class="metric-icon">🖥️</div>
        <div class="metric-label">Yêu cầu VRAM</div>
        <div class="metric-bar-wrap">
          <div class="metric-bar" :style="{ width: currentPrecision.vramPercent + '%', background: '#f59e0b' }"></div>
        </div>
        <div class="metric-value">{{ currentPrecision.vram }}</div>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-title">Chi tiết về {{ currentPrecision.label }}</div>
      <p class="detail-desc">{{ currentPrecision.description }}</p>

      <div class="bit-visual">
        <div class="bit-label">Minh họa lưu trữ một tham số</div>
        <div class="bit-row">
          <div
            v-for="i in currentPrecision.bits"
            :key="i"
            class="bit-cell"
            :style="{ background: currentPrecision.color }"
          >{{ i % 2 === 0 ? '1' : '0' }}</div>
        </div>
        <div class="bit-info">Mỗi tham số chiếm {{ currentPrecision.bits }} bit = {{ currentPrecision.bytes }} byte</div>
      </div>

      <div class="use-case">
        <span class="use-label">Tình huống phù hợp:</span>
        <span>{{ currentPrecision.useCase }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activePrecision = ref(0)

const precisions = [
  {
    id: 'fp32',
    label: 'FP32',
    bits: 32,
    bytes: 4,
    color: '#ef4444',
    size: '~28 GB (mô hình 7B)',
    sizePercent: 100,
    speed: '1x (baseline)',
    speedPercent: 25,
    quality: '100% (không suy giảm)',
    qualityPercent: 100,
    vram: '~32 GB',
    vramPercent: 100,
    description: 'FP32 (số thực 32 bit) là độ chính xác mặc định khi huấn luyện. Mỗi tham số dùng 32 bit, chính xác cao nhất nhưng tốn dung lượng nhất. Thường chỉ dùng lúc huấn luyện, hiếm khi dùng FP32 cho inference.',
    useCase: 'Huấn luyện mô hình, thí nghiệm khoa học, task nhạy với độ chính xác'
  },
  {
    id: 'fp16',
    label: 'FP16',
    bits: 16,
    bytes: 2,
    color: '#f59e0b',
    size: '~14 GB (mô hình 7B)',
    sizePercent: 50,
    speed: '2x',
    speedPercent: 50,
    quality: '~99.5%',
    qualityPercent: 99,
    vram: '~16 GB',
    vramPercent: 50,
    description: 'FP16 (số thực 16 bit) giảm độ chính xác đi một nửa, kích thước mô hình cũng giảm một nửa. Trong hầu hết tình huống, chất lượng output của FP16 gần như không khác FP32, là độ chính xác phổ biến nhất cho inference hiện nay.',
    useCase: 'Triển khai inference chuẩn, GPU server, đa số môi trường production'
  },
  {
    id: 'int8',
    label: 'INT8',
    bits: 8,
    bytes: 1,
    color: '#10b981',
    size: '~7 GB (mô hình 7B)',
    sizePercent: 25,
    speed: '3-4x',
    speedPercent: 75,
    quality: '~98%',
    qualityPercent: 96,
    vram: '~8 GB',
    vramPercent: 25,
    description: 'Quantization INT8 (số nguyên 8 bit) ánh xạ số thực sang số nguyên, kích thước chỉ bằng 1/4 FP32. Mất rất ít chất lượng nhưng tốc độ inference tăng đáng kể. Phù hợp chạy mô hình lớn trên GPU phổ thông.',
    useCase: 'GPU phổ thông (RTX 4090), tình huống nhạy chi phí'
  },
  {
    id: 'int4',
    label: 'INT4',
    bits: 4,
    bytes: 0.5,
    color: '#818cf8',
    size: '~3.5 GB (mô hình 7B)',
    sizePercent: 12.5,
    speed: '5-6x',
    speedPercent: 90,
    quality: '~93-95%',
    qualityPercent: 90,
    vram: '~4 GB',
    vramPercent: 12.5,
    description: 'INT4 (số nguyên 4 bit) là quantization khốc liệt nhất hiện nay. Kích thước mô hình nén còn 1/8 FP32, thậm chí chạy được mô hình 7B trên laptop. Có suy giảm chất lượng nhất định nhưng phần lớn ứng dụng vẫn dùng được.',
    useCase: 'Deploy trên laptop/điện thoại, edge computing, offline'
  }
]

const currentPrecision = computed(() => precisions[activePrecision.value])
</script>

<style scoped>
.quantization-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}

.demo-header h4 {
  margin: 0 0 4px;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin: 0 0 20px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.precision-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.precision-card {
  flex: 1;
  min-width: 80px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.precision-card.active {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.prec-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
}

.prec-bits {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

@media (max-width: 640px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}

.metric-card {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 14px;
}

.metric-icon {
  font-size: 18px;
  margin-bottom: 4px;
}

.metric-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.metric-bar-wrap {
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 6px;
}

.metric-bar {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.metric-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.detail-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
}

.detail-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.detail-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0 0 16px;
}

.bit-visual {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
}

.bit-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.bit-row {
  display: flex;
  gap: 2px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.bit-cell {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  font-family: monospace;
}

.bit-info {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.use-case {
  font-size: 13px;
  color: var(--vp-c-text-2);
  padding: 8px 12px;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
}

.use-label {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
</style>
