<!--
  AudioTokenizationDemo.vue
  Component mô phỏng audio tokenization

  Mục đích:
  Trình bày cách audio được nén thành các Token rời rạc qua neural codec (EnCodec, SoundStream, ...).

  Tính năng tương tác:
  - Luồng nén/giải nén audio
  - So sánh các bitrate khác nhau
  - Trực quan hoá Token
  - Đánh giá chất lượng tái tạo
-->
<template>
  <div class="audio-tokenization-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><Grid /></el-icon>
          <span>🎵 Audio tokenization: neural codec</span>
        </div>
      </template>

      <div class="demo-content">
        <!-- Sơ đồ luồng -->
        <div class="codec-flow">
          <div class="flow-section encode">
            <div class="section-title">
              🔽 Encoder
            </div>
            <div class="flow-steps">
              <div class="codec-step">
                <div class="step-visual">
                  <canvas
                    ref="originalWaveformCanvas"
                    width="150"
                    height="60"
                  />
                </div>
                <div class="step-label">
                  Sóng gốc
                </div>
                <div class="step-meta">
                  24kHz, 16-bit
                </div>
              </div>
              <el-icon class="flow-arrow">
                <ArrowRight />
              </el-icon>
              <div class="codec-step">
                <div class="step-visual">
                  <div class="cnn-layers">
                    <div
                      v-for="i in 4"
                      :key="i"
                      class="cnn-layer"
                      :style="{ opacity: 0.3 + i * 0.2 }"
                    >
                      Conv {{ i }}
                    </div>
                  </div>
                </div>
                <div class="step-label">
                  CNN downsampling
                </div>
                <div class="step-meta">
                  Giảm chiều 320x
                </div>
              </div>
              <el-icon class="flow-arrow">
                <ArrowRight />
              </el-icon>
              <div class="codec-step">
                <div class="step-visual">
                  <div class="vq-codebook">
                    <div class="codebook-grid">
                      <div
                        v-for="i in 16"
                        :key="i"
                        class="codebook-cell"
                        :class="{ active: i <= 4 }"
                      />
                    </div>
                  </div>
                </div>
                <div class="step-label">
                  Lượng tử hoá VQ
                </div>
                <div class="step-meta">
                  Token rời rạc
                </div>
              </div>
            </div>
          </div>

          <div class="flow-divider">
            <div class="divider-line" />
            <div class="divider-label">
              Sau khi nén: ~1.5 kbps
            </div>
            <div class="divider-line" />
          </div>

          <div class="flow-section decode">
            <div class="section-title">
              🔼 Decoder
            </div>
            <div class="flow-steps reverse">
              <div class="codec-step">
                <div class="step-visual">
                  <div class="token-sequence">
                    <span
                      v-for="(token, i) in [42, 128, 7, 255, 33, 91]"
                      :key="i"
                      class="token"
                      :style="{ background: `hsl(${token}, 70%, 50%)` }"
                    >
                      {{ token }}
                    </span>
                  </div>
                </div>
                <div class="step-label">
                  Token rời rạc
                </div>
                <div class="step-meta">
                  Chỉ mục Codebook
                </div>
              </div>
              <el-icon class="flow-arrow">
                <ArrowRight />
              </el-icon>
              <div class="codec-step">
                <div class="step-visual">
                  <div class="cnn-layers">
                    <div
                      v-for="i in 4"
                      :key="i"
                      class="cnn-layer"
                      :style="{ opacity: 1 - i * 0.15 }"
                    >
                      ConvT {{ 5 - i }}
                    </div>
                  </div>
                </div>
                <div class="step-label">
                  Transposed conv
                </div>
                <div class="step-meta">
                  Upsampling
                </div>
              </div>
              <el-icon class="flow-arrow">
                <ArrowRight />
              </el-icon>
              <div class="codec-step">
                <div class="step-visual">
                  <canvas
                    ref="reconstructedWaveformCanvas"
                    width="150"
                    height="60"
                  />
                </div>
                <div class="step-label">
                  Sóng tái tạo
                </div>
                <div class="step-meta">
                  24kHz
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- So sánh bitrate -->
        <div class="bitrate-comparison">
          <div class="comparison-title">
            📊 So sánh các bitrate
          </div>
          <div class="bitrate-cards">
            <div
              v-for="config in bitrateConfigs"
              :key="config.name"
              class="bitrate-card"
              :class="{ active: selectedBitrate === config.name }"
              @click="selectedBitrate = config.name"
            >
              <div class="bitrate-value">
                {{ config.bitrate }}
              </div>
              <div class="bitrate-name">
                {{ config.name }}
              </div>
              <div class="bitrate-detail">
                <div class="detail-item">
                  <span class="label">Sample rate:</span>
                  <span>{{ config.sampleRate }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">Frame rate:</span>
                  <span>{{ config.frameRate }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">Codebook size:</span>
                  <span>{{ config.codebookSize }}</span>
                </div>
              </div>
              <el-rate
                v-model="config.quality"
                disabled
                show-score
                text-color="#ff9900"
              />
            </div>
          </div>
        </div>

        <!-- Trực quan Token -->
        <div class="token-visualization">
          <div class="viz-title">
            🔢 Trực quan chuỗi Token
          </div>
          <div class="token-display">
            <div class="token-ruler">
              <span
                v-for="i in 20"
                :key="i"
                class="ruler-mark"
              >{{ i * 0.1 }}s</span>
            </div>
            <div class="token-stream">
              <div
                v-for="(token, i) in tokenSequence"
                :key="i"
                class="token-block"
                :style="{
                  background: `hsl(${token % 360}, 70%, ${50 + (token % 20)}%)`,
                  height: `${20 + (token % 30)}px`
                }"
                :title="`Token: ${token}`"
              />
            </div>
          </div>
          <div class="token-legend">
            <span class="legend-item">
              <span
                class="legend-color"
                style="background: #409eff"
              />
              Thành phần tần số thấp
            </span>
            <span class="legend-item">
              <span
                class="legend-color"
                style="background: #67c23a"
              />
              Thành phần tần số trung
            </span>
            <span class="legend-item">
              <span
                class="legend-color"
                style="background: #e6a23c"
              />
              Thành phần tần số cao
            </span>
          </div>
        </div>

        <!-- Ứng dụng -->
        <div class="applications">
          <div class="apps-title">
            🎯 Vì sao cần audio tokenization?
          </div>
          <div class="apps-grid">
            <div class="app-card">
              <div class="app-icon">
                🚀
              </div>
              <div class="app-title">
                Truyền hiệu quả
              </div>
              <div class="app-desc">
                Nén audio xuống ~1.5 kbps, nhỏ hơn audio gốc 256 lần, rất hợp để truyền qua mạng
              </div>
            </div>
            <div class="app-card">
              <div class="app-icon">
                🧠
              </div>
              <div class="app-title">
                Thân thiện với LLM
              </div>
              <div class="app-desc">
                Token rời rạc có thể được LLM xử lý trực tiếp, thống nhất mô hình hoá text và audio
              </div>
            </div>
            <div class="app-card">
              <div class="app-icon">
                🎵
              </div>
              <div class="app-title">
                Sinh nhạc
              </div>
              <div class="app-desc">
                Các mô hình như MusicGen, AudioLDM dùng audio Token để sinh nhạc và hiệu ứng âm thanh
              </div>
            </div>
            <div class="app-card">
              <div class="app-icon">
                🗣️
              </div>
              <div class="app-title">
                TTS
              </div>
              <div class="app-desc">
                Các mô hình TTS như VALL-E, SoundStorm sinh audio Token một cách trực tiếp
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>Neural audio codec:</strong>
          EnCodec (Meta), SoundStream (Google), SNAC, ... đều dùng kiến trúc VQ-VAE để nén audio thành Token rời rạc. Các Token này có thể được LLM xử lý, giúp sinh và nén audio chất lượng cao.
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Grid, ArrowRight } from '@element-plus/icons-vue'

const selectedBitrate = ref('EnCodec-24k')
const originalWaveformCanvas = ref(null)
const reconstructedWaveformCanvas = ref(null)

const bitrateConfigs = [
  {
    name: 'EnCodec-24k',
    bitrate: '1.5 kbps',
    sampleRate: '24 kHz',
    frameRate: '75 Hz',
    codebookSize: '1024',
    quality: 4
  },
  {
    name: 'EnCodec-48k',
    bitrate: '3.0 kbps',
    sampleRate: '48 kHz',
    frameRate: '75 Hz',
    codebookSize: '1024',
    quality: 5
  },
  {
    name: 'SoundStream',
    bitrate: '6.0 kbps',
    sampleRate: '16 kHz',
    frameRate: '50 Hz',
    codebookSize: '1024',
    quality: 4.5
  },
  {
    name: 'SNAC',
    bitrate: '0.98 kbps',
    sampleRate: '24 kHz',
    frameRate: '43 Hz',
    codebookSize: '4096',
    quality: 4
  }
]

// Sinh chuỗi Token mô phỏng
const tokenSequence = Array.from({ length: 50 }, () => Math.floor(Math.random() * 1024))

// Vẽ dạng sóng
const drawWaveform = (canvas, isNoisy = false) => {
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)

  ctx.strokeStyle = '#409eff'
  ctx.lineWidth = 1.5
  ctx.beginPath()

  for (let x = 0; x < width; x++) {
    const t = x / width
    let y = height / 2

    // Sóng cơ bản
    y += Math.sin(t * Math.PI * 8) * 15
    y += Math.sin(t * Math.PI * 16) * 10

    // Thêm nhiễu (phiên bản tái tạo)
    if (isNoisy) {
      y += (Math.random() - 0.5) * 8
    }

    if (x === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }

  ctx.stroke()

  // Đường tâm
  ctx.strokeStyle = '#e0e0e0'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, height / 2)
  ctx.lineTo(width, height / 2)
  ctx.stroke()
}

onMounted(() => {
  drawWaveform(originalWaveformCanvas.value, false)
  drawWaveform(reconstructedWaveformCanvas.value, true)
})
</script>

<style scoped>
.audio-tokenization-demo {
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

.codec-flow {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.flow-section {
  margin-bottom: 16px;
}

.section-title {
  font-weight: 500;
  margin-bottom: 16px;
  color: var(--vp-c-brand);
}

.flow-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.flow-steps.reverse {
  flex-direction: row-reverse;
}

.codec-step {
  text-align: center;
  min-width: 120px;
}

.step-visual {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 8px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-visual canvas {
  width: 100%;
  height: auto;
}

.step-label {
  font-weight: 500;
  font-size: 0.875rem;
}

.step-meta {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.flow-arrow {
  color: var(--vp-c-text-3);
}

.cnn-layers {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cnn-layer {
  background: #409eff;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
}

.vq-codebook {
  padding: 8px;
}

.codebook-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}

.codebook-cell {
  width: 16px;
  height: 16px;
  background: #e0e0e0;
  border-radius: 2px;
}

.codebook-cell.active {
  background: #67c23a;
}

.token-sequence {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  max-width: 120px;
}

.token {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  color: white;
  font-family: monospace;
}

.flow-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 16px 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: var(--vp-c-divider);
}

.divider-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

.bitrate-comparison {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.comparison-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.bitrate-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.bitrate-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.bitrate-card:hover {
  border-color: var(--vp-c-brand);
}

.bitrate-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.bitrate-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 4px;
}

.bitrate-name {
  font-weight: 500;
  margin-bottom: 12px;
}

.bitrate-detail {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-bottom: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 2px 0;
}

.detail-item .label {
  color: var(--vp-c-text-2);
}

.token-visualization {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.viz-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.token-display {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
}

.token-ruler {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.ruler-mark {
  min-width: 30px;
}

.token-stream {
  display: flex;
  gap: 2px;
  align-items: flex-end;
  height: 60px;
}

.token-block {
  flex: 1;
  min-width: 8px;
  border-radius: 2px;
  transition: all 0.2s;
}

.token-block:hover {
  transform: scaleY(1.2);
  z-index: 1;
}

.token-legend {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.applications {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.apps-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.app-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 16px;
  text-align: center;
}

.app-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.app-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.app-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  line-height: 1.5;
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
  .flow-steps {
    flex-direction: column;
  }

  .flow-steps.reverse {
    flex-direction: column;
  }

  .flow-arrow {
    transform: rotate(90deg);
  }
}
</style>
