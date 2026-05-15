<!--
  TTSPipelineDemo.vue
  Component mô phỏng luồng TTS

  Mục đích:
  Trình bày luồng đầy đủ của tổng hợp giọng nói và so sánh các kiến trúc (autoregressive / non-autoregressive / flow matching).
-->
<template>
  <div class="tts-pipeline-demo">
    <div class="header">
      <div class="title">
        🔄 Tiến hoá kiến trúc TTS: từ chậm đến nhanh
      </div>
      <div class="subtitle">
        Cùng khám phá cách văn bản biến thành giọng nói và so sánh ưu nhược điểm của từng kiến trúc
      </div>
    </div>

    <div class="arch-selector">
      <button
        v-for="arch in architectures"
        :key="arch.id"
        class="arch-btn"
        :class="{ active: selectedArch === arch.id }"
        @click="selectArch(arch.id)"
      >
        <span class="arch-icon">{{ arch.icon }}</span>
        <span class="arch-name">{{ arch.name }}</span>
        <span
          class="arch-tag"
          :class="arch.tagClass"
        >{{ arch.tag }}</span>
      </button>
    </div>

    <div class="pipeline-flow">
      <div
        v-for="(stage, index) in currentStages"
        :key="stage.id"
        class="stage"
        :class="{ active: activeStage === index }"
        @click="activeStage = index"
      >
        <div class="stage-num">
          {{ index + 1 }}
        </div>
        <div class="stage-content">
          <div class="stage-icon">
            {{ stage.icon }}
          </div>
          <div class="stage-name">
            {{ stage.name }}
          </div>
          <div class="stage-desc">
            {{ stage.shortDesc }}
          </div>
        </div>
        <div
          v-if="index < currentStages.length - 1"
          class="stage-arrow"
        >
          →
        </div>
      </div>
    </div>

    <div
      v-if="currentStage"
      class="stage-detail"
    >
      <div class="detail-header">
        <span class="detail-icon">{{ currentStage.icon }}</span>
        <div>
          <div class="detail-name">
            {{ currentStage.name }}
          </div>
          <div class="detail-desc">
            {{ currentStage.description }}
          </div>
        </div>
      </div>
      <div class="detail-canvas">
        <canvas
          ref="detailCanvas"
          width="500"
          height="150"
        />
      </div>
      <div class="detail-meta">
        <div class="meta-item">
          <span class="label">Đầu vào:</span>
          <span>{{ currentStage.input }}</span>
        </div>
        <div class="meta-item">
          <span class="label">Đầu ra:</span>
          <span>{{ currentStage.output }}</span>
        </div>
        <div class="meta-item">
          <span class="label">Công nghệ:</span>
          <span>{{ currentStage.tech }}</span>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">
        📊 So sánh kiến trúc
      </div>
      <div class="table">
        <div class="table-header">
          <div class="cell">
            Đặc tính
          </div>
          <div class="cell">
            Tự hồi quy
          </div>
          <div class="cell">
            Phi tự hồi quy
          </div>
          <div class="cell">
            Flow matching
          </div>
        </div>
        <div
          v-for="row in comparisonRows"
          :key="row.feature"
          class="table-row"
        >
          <div class="cell feature">
            {{ row.feature }}
          </div>
          <div
            class="cell"
            :class="{ highlight: selectedArch === 'ar' }"
          >
            {{ row.ar }}
          </div>
          <div
            class="cell"
            :class="{ highlight: selectedArch === 'nar' }"
          >
            {{ row.nar }}
          </div>
          <div
            class="cell"
            :class="{ highlight: selectedArch === 'flow' }"
          >
            {{ row.flow }}
          </div>
        </div>
      </div>
    </div>

    <div class="models-section">
      <div class="models-title">
        🏆 Mô hình tiêu biểu
      </div>
      <div class="models-grid">
        <div
          v-for="model in models"
          :key="model.name"
          class="model-card"
          :class="{ active: model.arch === selectedArch }"
        >
          <div class="model-name">
            {{ model.name }}
          </div>
          <span
            class="model-tag"
            :class="model.tagClass"
          >{{ model.type }}</span>
          <div class="model-desc">
            {{ model.desc }}
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <p>
        <strong>Xu hướng tiến hoá của TTS:</strong>
        Từ các mô hình tự hồi quy thời đầu (như Tacotron) sang phi tự hồi quy (như FastSpeech) rồi đến flow matching mới nhất (như F5-TTS),
        công nghệ TTS đang đi theo hướng nhanh hơn, ổn định hơn và chất lượng cao hơn.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const architectures = [
  { id: 'ar', name: 'Tự hồi quy', icon: '📝', tag: 'AR', tagClass: 'primary' },
  { id: 'nar', name: 'Phi tự hồi quy', icon: '⚡', tag: 'NAR', tagClass: 'success' },
  { id: 'flow', name: 'Flow matching', icon: '🌊', tag: 'Flow', tagClass: 'warning' }
]

const pipelineStages = {
  ar: [
    { id: 'text', name: 'Tiền xử lý văn bản', icon: '📝', shortDesc: 'Tách từ & phonemes', description: 'Chuyển văn bản đầu vào thành chuỗi phonemes', input: 'Văn bản gốc', output: 'Chuỗi phonemes', tech: 'G2P' },
    { id: 'encoder', name: 'Encode văn bản', icon: '🔢', shortDesc: 'Trích đặc trưng', description: 'Dùng Encoder để mã hoá văn bản', input: 'Chuỗi phonemes', output: 'Đặc trưng văn bản', tech: 'Transformer' },
    { id: 'decoder', name: 'Giải mã tự hồi quy', icon: '🎯', shortDesc: 'Sinh từng frame', description: 'Sinh mel-spectrogram theo từng bước thời gian', input: 'Đặc trưng văn bản', output: 'Mel-spectrogram', tech: 'AR Decoder' },
    { id: 'vocoder', name: 'Vocoder', icon: '🔊', shortDesc: 'Phổ sang sóng', description: 'Chuyển spectrogram sang sóng âm', input: 'Mel-spectrogram', output: 'Sóng âm', tech: 'HiFi-GAN' }
  ],
  nar: [
    { id: 'text', name: 'Tiền xử lý văn bản', icon: '📝', shortDesc: 'Tách từ & phonemes', description: 'Chuyển văn bản đầu vào thành chuỗi phonemes', input: 'Văn bản gốc', output: 'Chuỗi phonemes', tech: 'G2P' },
    { id: 'duration', name: 'Dự đoán độ dài', icon: '⏱️', shortDesc: 'Dự đoán duration', description: 'Dự đoán số frame cho mỗi phoneme', input: 'Chuỗi phonemes', output: 'Thông tin duration', tech: 'Duration Predictor' },
    { id: 'decoder', name: 'Giải mã song song', icon: '⚡', shortDesc: 'Sinh một lần', description: 'Sinh mel-spectrogram đầy đủ song song', input: 'Đặc trưng văn bản', output: 'Mel-spectrogram', tech: 'Non-AR Transformer' },
    { id: 'vocoder', name: 'Vocoder', icon: '🔊', shortDesc: 'Phổ sang sóng', description: 'Chuyển spectrogram sang sóng âm', input: 'Mel-spectrogram', output: 'Sóng âm', tech: 'HiFi-GAN' }
  ],
  flow: [
    { id: 'text', name: 'Tiền xử lý văn bản', icon: '📝', shortDesc: 'Tách từ & phonemes', description: 'Chuyển văn bản đầu vào thành chuỗi phonemes', input: 'Văn bản gốc', output: 'Chuỗi phonemes', tech: 'G2P' },
    { id: 'embedding', name: 'Text embedding', icon: '🔢', shortDesc: 'Trích đặc trưng', description: 'Chuyển phonemes thành vector', input: 'Chuỗi phonemes', output: 'Text embedding', tech: 'DiT' },
    { id: 'flow', name: 'Flow matching', icon: '🌊', shortDesc: 'Optimal transport', description: 'Dùng flow matching để sinh spectrogram', input: 'Text embedding', output: 'Mel-spectrogram', tech: 'Flow Matching' },
    { id: 'vocoder', name: 'Vocoder', icon: '🔊', shortDesc: 'Phổ sang sóng', description: 'Chuyển spectrogram sang sóng âm', input: 'Mel-spectrogram', output: 'Sóng âm', tech: 'Vocoder' }
  ]
}

const comparisonRows = [
  { feature: 'Tốc độ sinh', ar: 'Chậm', nar: 'Nhanh', flow: 'Rất nhanh' },
  { feature: 'Chất lượng giọng', ar: 'Cao', nar: 'Trung-cao', flow: 'Cao' },
  { feature: 'Độ ổn định', ar: 'Trung bình', nar: 'Cao', flow: 'Cao' },
  { feature: 'Khả năng điều khiển', ar: 'Trung bình', nar: 'Cao', flow: 'Cao' }
]

const models = [
  { name: 'Tacotron 2', arch: 'ar', type: 'AR', tagClass: 'primary', desc: 'Mô hình AR kinh điển, chất giọng tốt' },
  { name: 'FastSpeech 2', arch: 'nar', type: 'NAR', tagClass: 'success', desc: 'Sinh song song, tốc độ nhanh' },
  { name: 'F5-TTS', arch: 'flow', type: 'Flow', tagClass: 'warning', desc: 'SOTA mới nhất, sinh chỉ trong 10 bước' },
  { name: 'CosyVoice', arch: 'flow', type: 'Flow', tagClass: 'warning', desc: 'Open-source bởi Alibaba, hỗ trợ đa ngôn ngữ' }
]

const selectedArch = ref('flow')
const activeStage = ref(0)
const detailCanvas = ref(null)

const currentStages = computed(() => pipelineStages[selectedArch.value])
const currentStage = computed(() => currentStages.value[activeStage.value])

const selectArch = (id) => {
  selectedArch.value = id
  activeStage.value = 0
}

const drawVisualization = () => {
  const canvas = detailCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)

  const stage = currentStage.value
  if (!stage) return

  // Vẽ trực quan khác nhau tuỳ giai đoạn
  if (stage.id === 'text') {
    // Văn bản sang phonemes
    ctx.font = '16px sans-serif'
    ctx.fillStyle = '#333'
    ctx.fillText('"Hello"', 50, h/2)

    ctx.strokeStyle = '#409eff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(120, h/2)
    ctx.lineTo(200, h/2)
    ctx.stroke()

    const phonemes = ['h', 'ə', 'l', 'oʊ']
    let x = 220
    phonemes.forEach((p, i) => {
      ctx.fillStyle = `hsl(${200 + i * 30}, 70%, 50%)`
      ctx.fillRect(x, h/2 - 15, 30, 30)
      ctx.fillStyle = '#fff'
      ctx.fillText(p, x + 8, h/2 + 5)
      x += 40
    })
  } else if (stage.id === 'decoder' && selectedArch.value === 'ar') {
    // Giải mã tự hồi quy
    for (let i = 0; i < 5; i++) {
      const x = 80 + i * 80
      for (let j = 0; j < 8; j++) {
        const barH = Math.random() * 40 + 10
        ctx.fillStyle = `rgba(64, 158, 255, ${0.5 + i * 0.1})`
        ctx.fillRect(x + j * 8, h - 50 - barH, 6, barH)
      }
      if (i < 4) {
        ctx.strokeStyle = '#ccc'
        ctx.beginPath()
        ctx.moveTo(x + 70, h/2)
        ctx.lineTo(x + 80, h/2)
        ctx.stroke()
      }
    }
    ctx.fillStyle = '#666'
    ctx.fillText('Sinh theo từng bước thời gian', 50, 30)
  } else if (stage.id === 'flow') {
    // Flow matching
    ctx.strokeStyle = '#409eff'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(50, h - 50)
    for (let t = 0; t <= 1; t += 0.02) {
      const x = 50 + t * 400
      const y = h - 50 - t * (h - 100) + Math.sin(t * Math.PI * 4) * 20
      ctx.lineTo(x, y)
    }
    ctx.stroke()

    const steps = [0, 0.25, 0.5, 0.75, 1]
    steps.forEach((t, i) => {
      const x = 50 + t * 400
      const y = h - 50 - t * (h - 100) + Math.sin(t * Math.PI * 4) * 20
      ctx.fillStyle = '#e6a23c'
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()
    })
  }
}

onMounted(drawVisualization)
watch([selectedArch, activeStage], drawVisualization)
</script>

<style scoped>
.tts-pipeline-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 24px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(120deg, #409eff, #67c23a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.arch-selector {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.arch-btn {
  padding: 12px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.arch-btn:hover {
  border-color: var(--vp-c-brand);
}

.arch-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.arch-icon {
  font-size: 20px;
}

.arch-name {
  font-weight: 500;
}

.arch-tag {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
}

.arch-tag.primary { background: #409eff33; color: #409eff; }
.arch-tag.success { background: #67c23a33; color: #67c23a; }
.arch-tag.warning { background: #e6a23c33; color: #e6a23c; }

.pipeline-flow {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 20px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  margin-bottom: 20px;
}

.stage {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.stage-content {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 12px 16px;
  text-align: center;
  transition: all 0.2s;
  min-width: 100px;
}

.stage:hover .stage-content,
.stage.active .stage-content {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.stage-num {
  width: 24px;
  height: 24px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.stage-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.stage-name {
  font-weight: 500;
  font-size: 13px;
}

.stage-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.stage-arrow {
  color: var(--vp-c-text-3);
  font-size: 20px;
}

.stage-detail {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
}

.detail-header {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.detail-icon {
  font-size: 32px;
}

.detail-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.detail-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.detail-canvas {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin-bottom: 16px;
}

.detail-canvas canvas {
  width: 100%;
  height: auto;
}

.detail-meta {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 13px;
}

.meta-item .label {
  color: var(--vp-c-text-3);
  margin-right: 4px;
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
}

.table-title {
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}

.table {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background: var(--vp-c-bg);
}

.table-header {
  font-weight: 600;
  background: var(--vp-c-bg-mute);
}

.cell {
  padding: 12px;
  text-align: center;
  font-size: 13px;
}

.cell.feature {
  text-align: left;
  font-weight: 500;
}

.cell.highlight {
  background: rgba(64, 158, 255, 0.1);
  color: var(--vp-c-brand);
  font-weight: 500;
}

.models-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
}

.models-title {
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.model-card {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 16px;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.model-card.active {
  border-color: var(--vp-c-brand);
}

.model-name {
  font-weight: 600;
  margin-bottom: 8px;
}

.model-tag {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 8px;
}

.model-tag.primary { background: #409eff33; color: #409eff; }
.model-tag.success { background: #67c23a33; color: #67c23a; }
.model-tag.warning { background: #e6a23c33; color: #e6a23c; }

.model-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.info-box {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.6;
}

.info-box .icon {
  font-size: 18px;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .pipeline-flow {
    flex-direction: column;
  }
  .stage-arrow {
    transform: rotate(90deg);
  }
}
</style>
