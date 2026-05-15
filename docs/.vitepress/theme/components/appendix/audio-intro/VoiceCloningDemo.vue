<!--
  VoiceCloningDemo.vue
  Component tương tác mô phỏng voice cloning

  Mục đích:
  Trình bày nguyên lý và quy trình của zero-shot voice cloning.
-->
<template>
  <div class="voice-clone-demo">
    <div class="header">
      <div class="title">
        🎭 Voice cloning: cho AI bắt chước bất kỳ ai
      </div>
      <div class="subtitle">
        Chỉ vài giây audio mẫu là AI có thể học giọng của bất kỳ ai
      </div>
    </div>

    <div class="mode-tabs">
      <button
        v-for="mode in modes"
        :key="mode.id"
        class="mode-btn"
        :class="{ active: selectedMode === mode.id }"
        @click="selectMode(mode.id)"
      >
        <span class="mode-icon">{{ mode.icon }}</span>
        <span>{{ mode.name }}</span>
      </button>
    </div>

    <div class="demo-area">
      <!-- Audio mẫu -->
      <div class="section">
        <div class="section-title">
          <span class="num">1</span>
          Cung cấp audio mẫu
        </div>
        <div class="audio-grid">
          <div
            v-for="reference in references"
            :key="reference.id"
            class="audio-card"
            :class="{ selected: selectedRef === reference.id }"
            @click="selectRef(reference.id)"
          >
            <div class="audio-avatar">
              {{ ref.avatar }}
            </div>
            <div class="audio-name">
              {{ ref.name }}
            </div>
            <div class="audio-desc">
              {{ ref.desc }}
            </div>
            <button
              class="play-btn"
              @click.stop="playRef(ref.id)"
            >
              {{ playingRef === ref.id ? '⏸' : '▶' }}
            </button>
          </div>
        </div>
        <div class="or-divider">
          hoặc
        </div>
        <button
          class="upload-btn"
          @click="uploadRef"
        >
          📤 Tải audio của bạn lên
        </button>
      </div>

      <!-- Quá trình xử lý -->
      <div class="section process-section">
        <div class="section-title">
          <span class="num">2</span>
          AI học đặc trưng giọng nói
        </div>
        <div class="process-flow">
          <div
            v-for="(step, index) in processSteps"
            :key="step.id"
            class="process-step"
            :class="{ active: currentStep >= index }"
          >
            <div class="step-icon">
              {{ step.icon }}
            </div>
            <div class="step-name">
              {{ step.name }}
            </div>
            <div
              v-if="index < processSteps.length - 1"
              class="step-arrow"
            >
              →
            </div>
          </div>
        </div>
        <div
          v-if="currentStep >= 2"
          class="feature-viz"
        >
          <canvas
            ref="featureCanvas"
            width="400"
            height="100"
          />
          <div class="viz-label">
            Vector đặc trưng giọng đã trích xuất
          </div>
        </div>
      </div>

      <!-- Kết quả sinh -->
      <div class="section">
        <div class="section-title">
          <span class="num">3</span>
          Nhập văn bản để sinh giọng
        </div>
        <div class="text-input">
          <textarea
            v-model="inputText"
            placeholder="Bạn nhập văn bản cần tổng hợp..."
            rows="3"
          />
          <button
            class="generate-btn"
            :disabled="!canGenerate"
            @click="generate"
          >
            <span
              v-if="isGenerating"
              class="spinner"
            />
            <span v-else>🎙 Sinh giọng</span>
          </button>
        </div>

        <div
          v-if="generatedAudio"
          class="result-area"
        >
          <div class="result-header">
            <span class="result-icon">🎵</span>
            <span>Kết quả sinh</span>
            <span class="similarity">Độ tương đồng: {{ similarity }}%</span>
          </div>
          <div class="waveform-mini">
            <canvas
              ref="resultCanvas"
              width="400"
              height="60"
            />
          </div>
          <div class="result-actions">
            <button
              class="action-btn"
              @click="playResult"
            >
              {{ playingResult ? '⏸ Tạm dừng' : '▶ Phát' }}
            </button>
            <button
              class="action-btn secondary"
              @click="download"
            >
              ⬇ Tải về
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="tips-section">
      <div class="tips-title">
        💡 Mẹo voice cloning
      </div>
      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-icon">
            ⏱️
          </div>
          <div class="tip-text">
            <strong>Độ dài audio mẫu</strong>
            <p>3-10 giây là đủ, chất lượng quan trọng hơn độ dài</p>
          </div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">
            🔇
          </div>
          <div class="tip-text">
            <strong>Yêu cầu môi trường</strong>
            <p>Bạn nên ở chỗ yên tĩnh, tránh tiếng ồn nền</p>
          </div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">
            🗣️
          </div>
          <div class="tip-text">
            <strong>Chọn nội dung</strong>
            <p>Có nhiều cao độ và tốc độ khác nhau thì hiệu quả tốt hơn</p>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">🔬</span>
      <p>
        <strong>Nguyên lý kỹ thuật:</strong>
        Voice cloning trích xuất đặc trưng âm sắc, ngữ điệu và phong cách nói từ audio mẫu để dựng vector embedding của người nói.
        Khi sinh, mô hình TTS kết hợp nội dung văn bản với speaker embedding để tổng hợp giọng tương tự audio mẫu.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const modes = [
  { id: 'zeroshot', name: 'Zero-shot cloning', icon: '🎯' },
  { id: 'fewshot', name: 'Few-shot cloning', icon: '📚' },
  { id: 'crosslingual', name: 'Cross-lingual cloning', icon: '🌍' }
]

const references = [
  { id: 'male1', name: 'Nam A', avatar: '👨', desc: 'Trầm, ấm' },
  { id: 'female1', name: 'Nữ B', avatar: '👩', desc: 'Dịu dàng, ngọt ngào' },
  { id: 'child', name: 'Trẻ em', avatar: '🧒', desc: 'Lanh lảnh, đáng yêu' },
  { id: 'elder', name: 'Người lớn tuổi', avatar: '👴', desc: 'Già dặn, trầm tĩnh' }
]

const processSteps = [
  { id: 'load', name: 'Nạp audio', icon: '📂' },
  { id: 'encode', name: 'Encode đặc trưng', icon: '🔢' },
  { id: 'extract', name: 'Trích âm sắc', icon: '🎨' },
  { id: 'embed', name: 'Dựng embedding', icon: '💎' }
]

const selectedMode = ref('zeroshot')
const selectedRef = ref(null)
const currentStep = ref(0)
const inputText = ref('')
const isGenerating = ref(false)
const generatedAudio = ref(false)
const similarity = ref(0)
const playingRef = ref(null)
const playingResult = ref(false)

const featureCanvas = ref(null)
const resultCanvas = ref(null)

const canGenerate = computed(() => {
  return selectedRef.value && inputText.value.trim().length > 0 && !isGenerating.value
})

const selectMode = (id) => {
  selectedMode.value = id
  resetDemo()
}

const selectRef = (id) => {
  selectedRef.value = id
  currentStep.value = 0
  simulateProcess()
}

const playRef = (id) => {
  playingRef.value = playingRef.value === id ? null : id
}

const uploadRef = () => {
  alert('Mô phỏng: mở hộp thoại chọn file')
}

const simulateProcess = () => {
  currentStep.value = 0
  const interval = setInterval(() => {
    currentStep.value++
    if (currentStep.value >= processSteps.length) {
      clearInterval(interval)
      drawFeatures()
    }
  }, 500)
}

const drawFeatures = () => {
  const canvas = featureCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)

  // Trực quan hoá vector đặc trưng
  const features = 20
  const barW = (w - 40) / features

  for (let i = 0; i < features; i++) {
    const value = Math.random() * 0.8 + 0.2
    const barH = value * (h - 40)
    const hue = 200 + value * 60

    ctx.fillStyle = `hsl(${hue}, 70%, 50%)`
    ctx.fillRect(20 + i * barW, h - 20 - barH, barW - 2, barH)
  }
}

const generate = () => {
  isGenerating.value = true
  generatedAudio.value = false

  setTimeout(() => {
    isGenerating.value = false
    generatedAudio.value = true
    similarity.value = Math.floor(Math.random() * 15) + 85
    drawResultWaveform()
  }, 2000)
}

const drawResultWaveform = () => {
  const canvas = resultCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)

  ctx.strokeStyle = '#409eff'
  ctx.lineWidth = 2
  ctx.beginPath()

  for (let x = 0; x < w; x += 2) {
    const y = h / 2 + Math.sin(x * 0.1) * 20 * Math.random()
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }

  ctx.stroke()
}

const playResult = () => {
  playingResult.value = !playingResult.value
}

const download = () => {
  alert('Mô phỏng: tải file audio về máy')
}

const resetDemo = () => {
  selectedRef.value = null
  currentStep.value = 0
  inputText.value = ''
  generatedAudio.value = false
  similarity.value = 0
}

onMounted(() => {
  if (featureCanvas.value) drawFeatures()
})
</script>

<style scoped>
.voice-clone-demo {
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
  background: linear-gradient(120deg, #409eff, #e6a23c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.mode-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  justify-content: center;
}

.mode-btn {
  padding: 10px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.mode-btn:hover {
  border-color: var(--vp-c-brand);
}

.mode-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.demo-area {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
}

.section {
  margin-bottom: 24px;
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  margin-bottom: 16px;
}

.section-title .num {
  width: 24px;
  height: 24px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.audio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.audio-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.audio-card:hover {
  border-color: var(--vp-c-brand);
}

.audio-card.selected {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.audio-avatar {
  font-size: 32px;
  margin-bottom: 8px;
}

.audio-name {
  font-weight: 500;
  font-size: 13px;
  margin-bottom: 4px;
}

.audio-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.play-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: var(--vp-c-brand);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.or-divider {
  text-align: center;
  color: var(--vp-c-text-3);
  margin: 12px 0;
  font-size: 13px;
}

.upload-btn {
  width: 100%;
  padding: 12px;
  border: 2px dashed var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.upload-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.process-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.process-step {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  opacity: 0.5;
  transition: all 0.3s;
}

.process-step.active {
  opacity: 1;
  background: var(--vp-c-brand);
  color: white;
}

.step-icon {
  font-size: 20px;
}

.step-name {
  font-size: 13px;
  font-weight: 500;
}

.step-arrow {
  color: var(--vp-c-text-3);
}

.feature-viz {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 16px;
  text-align: center;
}

.feature-viz canvas {
  width: 100%;
  height: auto;
}

.viz-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-top: 8px;
}

.text-input textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 14px;
  resize: vertical;
  margin-bottom: 12px;
}

.generate-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(120deg, #409eff, #67c23a);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.generate-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.generate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.result-area {
  margin-top: 16px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 2px solid #67c23a;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.result-icon {
  font-size: 20px;
}

.similarity {
  margin-left: auto;
  font-size: 12px;
  padding: 4px 8px;
  background: #67c23a33;
  color: #67c23a;
  border-radius: 4px;
}

.waveform-mini {
  background: var(--vp-c-bg);
  border-radius: 4px;
  margin-bottom: 12px;
}

.waveform-mini canvas {
  width: 100%;
  height: auto;
}

.result-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  padding: 10px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.action-btn.secondary {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.tips-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
}

.tips-title {
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.tip-card {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.tip-icon {
  font-size: 24px;
}

.tip-text strong {
  font-size: 13px;
  display: block;
  margin-bottom: 4px;
}

.tip-text p {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 0;
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
  .mode-tabs {
    flex-direction: column;
  }
  .process-flow {
    flex-direction: column;
  }
  .step-arrow {
    transform: rotate(90deg);
  }
}
</style>
