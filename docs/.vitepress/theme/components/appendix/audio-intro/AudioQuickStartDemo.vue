<!--
  AudioQuickStartDemo.vue
  Component trải nghiệm nhanh AI âm thanh

  Mục đích:
  Giúp người dùng trải nghiệm nhanh các năng lực cốt lõi của AI âm thanh: TTS, ASR, voice cloning.

  Tính năng tương tác:
  - Chọn nhanh kịch bản
  - Mô phỏng hiệu ứng xử lý audio thời gian thực
  - Phản hồi trực quan
-->
<template>
  <div class="audio-quick-start">
    <div class="header">
      <div class="title">
        🎙️ Trải nghiệm AI âm thanh: để máy biết "lên tiếng"
      </div>
      <div class="subtitle">
        Từ TTS đến voice cloning, cùng xem AI làm sao để máy có "giọng nói"
      </div>
    </div>

    <div class="demo-window">
      <!-- Chọn kịch bản -->
      <div class="scene-selector">
        <button
          v-for="scene in scenes"
          :key="scene.id"
          class="scene-btn"
          :class="{ active: currentScene?.id === scene.id }"
          @click="selectScene(scene)"
        >
          <span class="scene-icon">{{ scene.icon }}</span>
          <span class="scene-name">{{ scene.name }}</span>
        </button>
      </div>

      <!-- Khu vực demo -->
      <div class="demo-area">
        <div
          v-if="!currentScene"
          class="empty-state"
        >
          <div class="emoji">
            🎵
          </div>
          <p>Bạn chọn một kịch bản để bắt đầu trải nghiệm AI âm thanh</p>
        </div>

        <!-- Kịch bản TTS -->
        <div
          v-else-if="currentScene.id === 'tts'"
          class="tts-demo"
        >
          <div class="input-section">
            <textarea
              v-model="ttsText"
              rows="3"
              placeholder="Bạn nhập văn bản cần tổng hợp..."
            />
          </div>
          <div class="voice-selector">
            <span class="label">Giọng đọc:</span>
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
          <button
            class="action-btn primary"
            :disabled="isProcessing"
            @click="synthesize"
          >
            <span v-if="isProcessing">Đang tổng hợp...</span>
            <span v-else>🎙️ Tổng hợp giọng nói</span>
          </button>

          <!-- Trực quan dạng sóng -->
          <div
            v-if="showWaveform"
            class="waveform-container"
          >
            <canvas
              ref="waveformCanvas"
              width="400"
              height="80"
            />
            <div class="audio-controls">
              <button
                class="play-btn"
                @click="togglePlay"
              >
                {{ isPlaying ? '⏸️' : '▶️' }}
              </button>
              <div class="progress-bar">
                <div
                  class="progress"
                  :style="{ width: progress + '%' }"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Kịch bản ASR -->
        <div
          v-else-if="currentScene.id === 'asr'"
          class="asr-demo"
        >
          <div class="record-section">
            <button
              class="record-btn"
              :class="{ recording: isRecording }"
              @click="toggleRecording"
            >
              <span class="record-icon">{{ isRecording ? '⏹️' : '🎤' }}</span>
              <span>{{ isRecording ? 'Dừng ghi âm' : 'Bắt đầu ghi âm' }}</span>
            </button>
          </div>

          <!-- Sóng ghi âm -->
          <div
            v-if="isRecording || hasRecorded"
            class="waveform-container"
          >
            <canvas
              ref="recordCanvas"
              width="400"
              height="80"
            />
          </div>

          <!-- Kết quả nhận dạng -->
          <div
            v-if="transcription"
            class="result-box"
          >
            <div class="result-label">
              Kết quả nhận dạng:
            </div>
            <div class="result-text">
              {{ transcription }}
            </div>
          </div>
        </div>

        <!-- Kịch bản voice cloning -->
        <div
          v-else-if="currentScene.id === 'clone'"
          class="clone-demo"
        >
          <div class="clone-steps">
            <div
              class="step"
              :class="{ active: cloneStep >= 1, done: cloneStep > 1 }"
            >
              <div class="step-num">
                1
              </div>
              <div class="step-content">
                <div class="step-title">
                  Ghi audio mẫu
                </div>
                <button
                  class="step-btn"
                  :disabled="cloneStep !== 1"
                  @click="recordReference"
                >
                  {{ cloneStep > 1 ? '✓ Đã xong' : '🎙️ Ghi 5 giây' }}
                </button>
              </div>
            </div>
            <div class="step-arrow">
              →
            </div>
            <div
              class="step"
              :class="{ active: cloneStep >= 2, done: cloneStep > 2 }"
            >
              <div class="step-num">
                2
              </div>
              <div class="step-content">
                <div class="step-title">
                  Trích xuất đặc trưng giọng
                </div>
                <div
                  v-if="cloneStep === 2"
                  class="processing"
                >
                  <div class="spinner" />
                  <span>Đang phân tích...</span>
                </div>
              </div>
            </div>
            <div class="step-arrow">
              →
            </div>
            <div
              class="step"
              :class="{ active: cloneStep >= 3 }"
            >
              <div class="step-num">
                3
              </div>
              <div class="step-content">
                <div class="step-title">
                  Tổng hợp giọng đã clone
                </div>
                <div
                  v-if="cloneStep === 3"
                  class="clone-input"
                >
                  <input
                    v-model="cloneText"
                    placeholder="Bạn nhập văn bản cần tổng hợp"
                  >
                  <button
                    class="step-btn"
                    @click="synthesizeClone"
                  >
                    Tổng hợp
                  </button>
                </div>
                <div
                  v-if="cloneStep > 3"
                  class="success-msg"
                >
                  ✓ Clone thành công!
                </div>
              </div>
            </div>
          </div>

          <!-- Trực quan đặc trưng giọng -->
          <div
            v-if="cloneStep >= 2"
            class="embedding-viz"
          >
            <div class="viz-title">
              Vector đặc trưng giọng (256 chiều)
            </div>
            <div class="embedding-bars">
              <div
                v-for="(val, i) in embeddingValues"
                :key="i"
                class="bar"
                :style="{ height: val + '%', opacity: 0.3 + val / 100 }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tips">
      <div class="tip-item">
        <span class="tip-icon">💡</span>
        <span>TTS: chuyển văn bản thành giọng nói, để AI đọc bất kỳ đoạn chữ nào</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🎯</span>
        <span>ASR: nhận dạng giọng nói, chuyển âm thanh thành văn bản</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🎭</span>
        <span>Voice cloning: chỉ vài giây audio là có thể nhân bản giọng của bất kỳ ai</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

const scenes = [
  { id: 'tts', name: 'TTS', icon: '🗣️' },
  { id: 'asr', name: 'ASR', icon: '🎤' },
  { id: 'clone', name: 'Voice cloning', icon: '🎭' }
]

const voices = [
  { id: 'female1', name: 'Nữ A', icon: '👩' },
  { id: 'male1', name: 'Nam B', icon: '👨' },
  { id: 'female2', name: 'Nữ C', icon: '👧' }
]

const currentScene = ref(null)
const isProcessing = ref(false)
const isRecording = ref(false)
const hasRecorded = ref(false)
const transcription = ref('')
const showWaveform = ref(false)
const isPlaying = ref(false)
const progress = ref(0)
const cloneStep = ref(1)
const embeddingValues = ref([])

// TTS
const ttsText = ref('Xin chào, mình là trợ lý giọng nói AI.')
const selectedVoice = ref('female1')

// Clone
const cloneText = ref('Đây là giọng nói được tổng hợp bằng cách clone giọng của mình.')

const waveformCanvas = ref(null)
const recordCanvas = ref(null)
let animationId = null
let progressInterval = null

const selectScene = (scene) => {
  currentScene.value = scene
  resetState()
}

const resetState = () => {
  isProcessing.value = false
  isRecording.value = false
  hasRecorded.value = false
  transcription.value = ''
  showWaveform.value = false
  isPlaying.value = false
  progress.value = 0
  cloneStep.value = 1
  embeddingValues.value = []
  if (animationId) cancelAnimationFrame(animationId)
  if (progressInterval) clearInterval(progressInterval)
}

// Tổng hợp TTS
const synthesize = async () => {
  isProcessing.value = true
  showWaveform.value = true

  await nextTick()
  drawWaveform(waveformCanvas.value, false)

  setTimeout(() => {
    isProcessing.value = false
    startPlayback()
  }, 1500)
}

const startPlayback = () => {
  isPlaying.value = true
  progress.value = 0
  progressInterval = setInterval(() => {
    progress.value += 2
    if (progress.value >= 100) {
      progress.value = 100
      isPlaying.value = false
      clearInterval(progressInterval)
    }
  }, 100)
}

const togglePlay = () => {
  if (isPlaying.value) {
    isPlaying.value = false
    clearInterval(progressInterval)
  } else {
    if (progress.value >= 100) progress.value = 0
    startPlayback()
  }
}

// Ghi âm ASR
const toggleRecording = () => {
  if (isRecording.value) {
    isRecording.value = false
    hasRecorded.value = true
    stopRecordingAnimation()
    // Mô phỏng nhận dạng
    setTimeout(() => {
      transcription.value = 'Hôm nay thời tiết rất đẹp, hợp để ra ngoài đi dạo.'
    }, 800)
  } else {
    isRecording.value = true
    hasRecorded.value = false
    transcription.value = ''
    startRecordingAnimation()
  }
}

const startRecordingAnimation = () => {
  const animate = () => {
    if (!isRecording.value) return
    drawWaveform(recordCanvas.value, true)
    animationId = requestAnimationFrame(animate)
  }
  animate()
}

const stopRecordingAnimation = () => {
  if (animationId) cancelAnimationFrame(animationId)
}

// Voice cloning
const recordReference = async () => {
  isRecording.value = true
  startRecordingAnimation()

  setTimeout(() => {
    isRecording.value = false
    stopRecordingAnimation()
    cloneStep.value = 2

    // Mô phỏng trích xuất đặc trưng giọng
    setTimeout(() => {
      embeddingValues.value = Array.from({ length: 32 }, () => Math.random() * 80 + 10)
      cloneStep.value = 3
    }, 2000)
  }, 3000)
}

const synthesizeClone = () => {
  cloneStep.value = 4
  showWaveform.value = true
  nextTick(() => {
    drawWaveform(waveformCanvas.value, false)
  })
}

// Vẽ dạng sóng
const drawWaveform = (canvas, isDynamic = false) => {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)
  ctx.strokeStyle = '#409eff'
  ctx.lineWidth = 2
  ctx.beginPath()

  for (let x = 0; x < width; x++) {
    let amplitude = height * 0.3
    if (isDynamic) {
      amplitude = (Math.random() * 0.5 + 0.2) * height
    }
    const y = height / 2 + Math.sin(x * 0.05) * amplitude * Math.sin(x * 0.01)

    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }

  ctx.stroke()
}

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (progressInterval) clearInterval(progressInterval)
})
</script>

<style scoped>
.audio-quick-start {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.header {
  text-align: center;
  margin-bottom: 24px;
}

.title {
  font-size: 20px;
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

.demo-window {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.scene-selector {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.scene-btn {
  flex: 1;
  padding: 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  color: var(--vp-c-text-2);
}

.scene-btn:hover {
  background: var(--vp-c-bg-mute);
}

.scene-btn.active {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand);
  border-bottom: 2px solid var(--vp-c-brand);
}

.scene-icon {
  font-size: 24px;
}

.scene-name {
  font-size: 13px;
  font-weight: 500;
}

.demo-area {
  padding: 24px;
  min-height: 200px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--vp-c-text-3);
}

.empty-state .emoji {
  font-size: 48px;
  margin-bottom: 12px;
}

/* TTS Demo */
.tts-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tts-demo textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.voice-selector {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.voice-selector .label {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.voice-btn {
  padding: 8px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.voice-btn:hover {
  border-color: var(--vp-c-brand);
}

.voice-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.action-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-bg-mute);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.action-btn.primary {
  background: var(--vp-c-brand);
  color: white;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ASR Demo */
.asr-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.record-btn {
  padding: 16px 32px;
  border: 2px solid var(--vp-c-brand);
  border-radius: 50px;
  background: var(--vp-c-bg);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.record-btn.recording {
  background: #f56c6c;
  color: white;
  border-color: #f56c6c;
  animation: pulse 1.5s infinite;
}

.record-icon {
  font-size: 20px;
}

.result-box {
  width: 100%;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.result-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.result-text {
  font-size: 14px;
  line-height: 1.6;
}

/* Clone Demo */
.clone-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.clone-steps {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  opacity: 0.5;
  transition: all 0.2s;
}

.step.active {
  opacity: 1;
  background: var(--vp-c-bg-mute);
}

.step.done {
  opacity: 1;
  background: #f0f9ff;
  border: 1px solid #409eff;
}

.step-num {
  width: 28px;
  height: 28px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
}

.step-btn {
  padding: 8px 16px;
  border: 1px solid var(--vp-c-brand);
  border-radius: 6px;
  background: var(--vp-c-brand);
  color: white;
  cursor: pointer;
  font-size: 12px;
}

.step-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.step-arrow {
  font-size: 20px;
  color: var(--vp-c-text-3);
  padding-top: 20px;
}

.processing {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.clone-input {
  display: flex;
  gap: 8px;
}

.clone-input input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 12px;
}

.success-msg {
  color: #67c23a;
  font-size: 13px;
}

/* Embedding Visualization */
.embedding-viz {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.viz-title {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 12px;
  text-align: center;
}

.embedding-bars {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 60px;
}

.bar {
  flex: 1;
  background: linear-gradient(to top, #409eff, #67c23a);
  border-radius: 2px 2px 0 0;
  min-width: 4px;
}

/* Waveform */
.waveform-container {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.waveform-container canvas {
  width: 100%;
  height: auto;
}

.audio-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.play-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: var(--vp-c-brand);
  transition: width 0.1s linear;
}

/* Tips */
.tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 20px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 13px;
}

.tip-icon {
  font-size: 16px;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
