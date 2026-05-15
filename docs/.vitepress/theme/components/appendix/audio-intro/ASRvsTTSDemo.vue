<!--
  ASRvsTTSDemo.vue
  Component mô phỏng chuyển đổi hai chiều ASR và TTS

  Mục đích:
  Trình bày hai quy trình ngược nhau là ASR (nhận dạng giọng nói) và TTS (tổng hợp giọng nói).
-->
<template>
  <div class="asr-tts-demo">
    <div class="header">
      <div class="title">
        🔄 ASR ↔ TTS: chuyển đổi hai chiều của giọng nói
      </div>
      <div class="subtitle">
        Cùng khám phá hai quy trình ngược nhau giữa ASR và TTS
      </div>
    </div>

    <div class="conversion-flow">
      <!-- Khu vực ASR -->
      <div class="flow-section">
        <div class="section-header">
          <span class="section-icon">🎙️</span>
          <div>
            <div class="section-name">
              ASR - nhận dạng giọng nói
            </div>
            <div class="section-desc">
              Âm thanh → văn bản
            </div>
          </div>
        </div>

        <div class="demo-box">
          <div class="input-area">
            <button
              class="record-btn"
              :class="{ recording: isRecording }"
              @click="toggleRecording"
            >
              <span class="record-icon">{{ isRecording ? '⏹' : '🎤' }}</span>
              <span>{{ isRecording ? 'Dừng ghi âm' : 'Bắt đầu ghi âm' }}</span>
            </button>
            <div class="or-text">
              hoặc
            </div>
            <button
              class="upload-audio-btn"
              @click="uploadAudio"
            >
              📁 Tải audio
            </button>
          </div>

          <div
            v-if="recordedAudio"
            class="audio-preview"
          >
            <canvas
              ref="inputWaveform"
              width="300"
              height="60"
            />
          </div>

          <button
            class="process-btn"
            :disabled="!recordedAudio || isProcessingASR"
            @click="processASR"
          >
            <span
              v-if="isProcessingASR"
              class="spinner"
            />
            <span v-else>🔍 Nhận dạng giọng nói</span>
          </button>

          <div
            v-if="asrResult"
            class="result-box"
          >
            <div class="result-label">
              Kết quả nhận dạng
            </div>
            <div class="result-text">
              {{ asrResult }}
            </div>
            <div class="result-meta">
              <span>Độ tin cậy: {{ asrConfidence }}%</span>
              <span>Thời gian: {{ asrTime }}ms</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Vùng chuyển đổi ở giữa -->
      <div class="flow-arrow">
        <div class="arrow-line" />
        <div class="arrow-btns">
          <button
            class="arrow-btn"
            :class="{ active: direction === 'asr' }"
            @click="direction = 'asr'"
          >
            ASR →
          </button>
          <button
            class="arrow-btn"
            :class="{ active: direction === 'tts' }"
            @click="direction = 'tts'"
          >
            ← TTS
          </button>
        </div>
      </div>

      <!-- Khu vực TTS -->
      <div class="flow-section">
        <div class="section-header">
          <span class="section-icon">🔊</span>
          <div>
            <div class="section-name">
              TTS - tổng hợp giọng nói
            </div>
            <div class="section-desc">
              Văn bản → âm thanh
            </div>
          </div>
        </div>

        <div class="demo-box">
          <div class="input-area">
            <textarea
              v-model="ttsInput"
              placeholder="Bạn nhập văn bản cần tổng hợp..."
              rows="3"
            />
          </div>

          <div class="voice-select">
            <label>Chọn giọng đọc:</label>
            <div class="voice-options">
              <button
                v-for="voice in voices"
                :key="voice.id"
                class="voice-btn"
                :class="{ active: selectedVoice === voice.id }"
                @click="selectedVoice = voice.id"
              >
                {{ voice.icon }} {{ voice.name }}
              </button>
            </div>
          </div>

          <button
            class="process-btn tts"
            :disabled="!ttsInput.trim() || isProcessingTTS"
            @click="processTTS"
          >
            <span
              v-if="isProcessingTTS"
              class="spinner"
            />
            <span v-else>🗣 Tổng hợp giọng nói</span>
          </button>

          <div
            v-if="ttsResult"
            class="result-box audio-result"
          >
            <div class="result-label">
              Kết quả tổng hợp
            </div>
            <canvas
              ref="outputWaveform"
              width="300"
              height="60"
            />
            <div class="audio-controls">
              <button
                class="play-btn"
                @click="playResult"
              >
                {{ playing ? '⏸' : '▶' }}
              </button>
              <div class="progress-bar">
                <div
                  class="progress"
                  :style="{ width: playProgress + '%' }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <div class="comp-title">
        📊 So sánh ASR vs TTS
      </div>
      <div class="comp-grid">
        <div class="comp-card">
          <div class="comp-icon">
            🎙️
          </div>
          <div class="comp-name">
            ASR
          </div>
          <div class="comp-items">
            <div class="comp-item">
              <span class="label">Đầu vào:</span>
              <span>Sóng âm</span>
            </div>
            <div class="comp-item">
              <span class="label">Đầu ra:</span>
              <span>Chuỗi văn bản</span>
            </div>
            <div class="comp-item">
              <span class="label">Khó khăn:</span>
              <span>Tiếng ồn, giọng vùng, từ đồng âm</span>
            </div>
          </div>
        </div>

        <div class="comp-card">
          <div class="comp-icon">
            🔊
          </div>
          <div class="comp-name">
            TTS
          </div>
          <div class="comp-items">
            <div class="comp-item">
              <span class="label">Đầu vào:</span>
              <span>Chuỗi văn bản</span>
            </div>
            <div class="comp-item">
              <span class="label">Đầu ra:</span>
              <span>Sóng âm</span>
            </div>
            <div class="comp-item">
              <span class="label">Khó khăn:</span>
              <span>Ngữ điệu, cảm xúc, độ tự nhiên</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pipeline-comparison">
      <div class="pipe-title">
        🔀 So sánh kiến trúc
      </div>
      <div class="pipeline-diagram">
        <div class="pipeline asr-pipe">
          <div class="pipe-label">
            ASR Pipeline
          </div>
          <div class="pipe-flow">
            <div class="pipe-step">
              Âm thanh
            </div>
            <span>→</span>
            <div class="pipe-step">
              Đặc trưng
            </div>
            <span>→</span>
            <div class="pipe-step">
              Encoder
            </div>
            <span>→</span>
            <div class="pipe-step">
              Decoder
            </div>
            <span>→</span>
            <div class="pipe-step output">
              Văn bản
            </div>
          </div>
        </div>

        <div class="pipeline tts-pipe">
          <div class="pipe-label">
            TTS Pipeline
          </div>
          <div class="pipe-flow">
            <div class="pipe-step">
              Văn bản
            </div>
            <span>→</span>
            <div class="pipe-step">
              Encoder
            </div>
            <span>→</span>
            <div class="pipe-step">
              Decoder
            </div>
            <span>→</span>
            <div class="pipe-step">
              vocoder
            </div>
            <span>→</span>
            <div class="pipe-step output">
              Âm thanh
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <p>
        <strong>Mối quan hệ ngược:</strong>
        ASR và TTS là hai hướng cốt lõi của công nghệ giọng nói, đảo ngược lẫn nhau.
        ASR biến tín hiệu âm thanh liên tục thành văn bản rời rạc, còn TTS biến văn bản rời rạc thành tín hiệu âm thanh liên tục.
        Cả hai đều dựa trên mô hình âm học và mô hình ngôn ngữ.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const direction = ref('asr')
const isRecording = ref(false)
const recordedAudio = ref(false)
const isProcessingASR = ref(false)
const asrResult = ref('')
const asrConfidence = ref(0)
const asrTime = ref(0)

const ttsInput = ref('')
const selectedVoice = ref('default')
const isProcessingTTS = ref(false)
const ttsResult = ref(false)
const playing = ref(false)
const playProgress = ref(0)

const voices = [
  { id: 'default', name: 'Mặc định', icon: '🎙️' },
  { id: 'male', name: 'Giọng nam', icon: '👨' },
  { id: 'female', name: 'Giọng nữ', icon: '👩' },
  { id: 'child', name: 'Giọng trẻ em', icon: '🧒' }
]

const inputWaveform = ref(null)
const outputWaveform = ref(null)

const toggleRecording = () => {
  isRecording.value = !isRecording.value
  if (!isRecording.value) {
    recordedAudio.value = true
    drawWaveform(inputWaveform.value)
  }
}

const uploadAudio = () => {
  recordedAudio.value = true
  setTimeout(() => drawWaveform(inputWaveform.value), 100)
}

const drawWaveform = (canvas) => {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)
  ctx.strokeStyle = '#409eff'
  ctx.lineWidth = 2
  ctx.beginPath()

  for (let x = 0; x < w; x += 2) {
    const y = h / 2 + Math.sin(x * 0.1) * 20 + (Math.random() - 0.5) * 10
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }

  ctx.stroke()
}

const processASR = () => {
  isProcessingASR.value = true
  asrResult.value = ''

  setTimeout(() => {
    isProcessingASR.value = false
    asrResult.value = 'Đây là một đoạn kết quả nhận dạng giọng nói minh hoạ cho cách ASR hoạt động.'
    asrConfidence.value = 94
    asrTime.value = 320
    ttsInput.value = asrResult.value
  }, 1500)
}

const processTTS = () => {
  isProcessingTTS.value = true
  ttsResult.value = false

  setTimeout(() => {
    isProcessingTTS.value = false
    ttsResult.value = true
    setTimeout(() => drawWaveform(outputWaveform.value), 100)
  }, 1500)
}

const playResult = () => {
  playing.value = !playing.value
  if (playing.value) {
    playProgress.value = 0
    const interval = setInterval(() => {
      playProgress.value += 2
      if (playProgress.value >= 100) {
        playing.value = false
        playProgress.value = 0
        clearInterval(interval)
      }
    }, 100)
  }
}

onMounted(() => {
  if (recordedAudio.value) drawWaveform(inputWaveform.value)
})
</script>

<style scoped>
.asr-tts-demo {
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

.conversion-flow {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.flow-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.section-icon {
  font-size: 32px;
}

.section-name {
  font-weight: 600;
}

.section-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.demo-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.record-btn {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.record-btn:hover {
  border-color: #f56c6c;
}

.record-btn.recording {
  background: #f56c6c;
  color: white;
  border-color: #f56c6c;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.record-icon {
  font-size: 20px;
}

.or-text {
  text-align: center;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.upload-audio-btn {
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  color: var(--vp-c-text-2);
}

.audio-preview {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 12px;
}

.audio-preview canvas {
  width: 100%;
  height: auto;
}

.process-btn {
  padding: 12px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.process-btn.tts {
  background: #67c23a;
}

.process-btn:disabled {
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

.result-box {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
}

.result-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.result-text {
  font-size: 14px;
  line-height: 1.5;
}

.result-meta {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 14px;
  resize: vertical;
}

.voice-select {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.voice-select label {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.voice-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.voice-btn {
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.voice-btn.active {
  background: #67c23a;
  color: white;
  border-color: #67c23a;
}

.audio-result canvas {
  width: 100%;
  height: auto;
  margin-bottom: 12px;
}

.audio-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.play-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #67c23a;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--vp-c-bg);
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #67c23a;
  transition: width 0.1s;
}

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.arrow-line {
  width: 2px;
  height: 100px;
  background: var(--vp-c-divider);
}

.arrow-btns {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.arrow-btn {
  padding: 8px 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
}

.arrow-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.comparison-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
}

.comp-title {
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}

.comp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.comp-card {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
  text-align: center;
}

.comp-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.comp-name {
  font-weight: 600;
  margin-bottom: 12px;
}

.comp-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.comp-item {
  font-size: 13px;
}

.comp-item .label {
  color: var(--vp-c-text-3);
}

.pipeline-comparison {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
}

.pipe-title {
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}

.pipeline-diagram {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pipeline {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 16px;
}

.pipe-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 12px;
}

.pipe-flow {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.pipe-step {
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 12px;
}

.pipe-step.output {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
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

@media (max-width: 768px) {
  .conversion-flow {
    grid-template-columns: 1fr;
  }
  .flow-arrow {
    flex-direction: row;
  }
  .arrow-line {
    width: 100px;
    height: 2px;
  }
  .arrow-btns {
    flex-direction: row;
  }
}
</style>
