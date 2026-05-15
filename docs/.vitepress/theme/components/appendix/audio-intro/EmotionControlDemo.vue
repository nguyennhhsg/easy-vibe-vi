<!--
  EmotionControlDemo.vue
  Component mô phỏng điều khiển cảm xúc

  Mục đích:
  Trình bày cách điều khiển cảm xúc, tốc độ, cao độ giọng, ... trong TTS.

  Tính năng tương tác:
  - Chọn cảm xúc
  - Thanh trượt tốc độ và cao độ
  - Xem trước realtime
  - Trực quan hoá vector cảm xúc
-->
<template>
  <div class="emotion-control-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><MagicStick /></el-icon>
          <span>🎭 Điều khiển cảm xúc và phong cách</span>
        </div>
      </template>

      <div class="demo-content">
        <!-- Chọn cảm xúc -->
        <div class="emotion-selector">
          <div class="selector-title">
            Chọn phong cách cảm xúc
          </div>
          <div class="emotion-grid">
            <div
              v-for="emotion in emotions"
              :key="emotion.id"
              class="emotion-card"
              :class="{ active: selectedEmotion === emotion.id }"
              @click="selectEmotion(emotion.id)"
            >
              <div class="emotion-emoji">
                {{ emotion.emoji }}
              </div>
              <div class="emotion-name">
                {{ emotion.name }}
              </div>
              <div class="emotion-desc">
                {{ emotion.description }}
              </div>
            </div>
          </div>
        </div>

        <!-- Trực quan vector cảm xúc -->
        <div class="emotion-embedding">
          <div class="embedding-title">
            Không gian vector cảm xúc (Emotion Embedding)
          </div>
          <canvas
            ref="emotionCanvas"
            width="400"
            height="200"
            class="emotion-canvas"
          />
          <div class="embedding-legend">
            <span
              v-for="emotion in emotions"
              :key="emotion.id"
              class="legend-item"
            >
              <span
                class="legend-dot"
                :style="{ background: emotion.color }"
              />
              {{ emotion.name }}
            </span>
          </div>
        </div>

        <!-- Tinh chỉnh tham số -->
        <div class="parameter-controls">
          <div class="control-title">
            🎚️ Điều khiển chi tiết
          </div>
          <div class="controls-grid">
            <div class="control-item">
              <div class="control-label">
                <span>Tốc độ nói</span>
                <el-tag size="small">
                  {{ speed }}x
                </el-tag>
              </div>
              <el-slider
                v-model="speed"
                :min="0.5"
                :max="2"
                :step="0.1"
              />
              <div class="control-hint">
                <span>Chậm</span>
                <span>Bình thường</span>
                <span>Nhanh</span>
              </div>
            </div>

            <div class="control-item">
              <div class="control-label">
                <span>Cao độ</span>
                <el-tag size="small">
                  {{ pitch > 0 ? '+' : '' }}{{ pitch }}
                </el-tag>
              </div>
              <el-slider
                v-model="pitch"
                :min="-10"
                :max="10"
                :step="1"
              />
              <div class="control-hint">
                <span>Trầm</span>
                <span>Bình thường</span>
                <span>Cao</span>
              </div>
            </div>

            <div class="control-item">
              <div class="control-label">
                <span>Biên độ âm lượng</span>
                <el-tag size="small">
                  {{ energy }}%
                </el-tag>
              </div>
              <el-slider
                v-model="energy"
                :min="50"
                :max="150"
                :step="5"
              />
              <div class="control-hint">
                <span>Êm dịu</span>
                <span>Vừa phải</span>
                <span>Sôi nổi</span>
              </div>
            </div>

            <div class="control-item">
              <div class="control-label">
                <span>Điều khiển khoảng dừng</span>
                <el-tag size="small">
                  {{ pause }}ms
                </el-tag>
              </div>
              <el-slider
                v-model="pause"
                :min="0"
                :max="500"
                :step="50"
              />
              <div class="control-hint">
                <span>Gấp gáp</span>
                <span>Tự nhiên</span>
                <span>Thư thái</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Nhập văn bản và xem trước -->
        <div class="preview-section">
          <div class="preview-title">
            🎙️ Xem trước tổng hợp
          </div>
          <el-input
            v-model="previewText"
            type="textarea"
            :rows="2"
            placeholder="Bạn nhập văn bản cần tổng hợp..."
            class="preview-input"
          />
          <div class="preview-actions">
            <el-button
              type="primary"
              @click="synthesize"
            >
              <el-icon><VideoPlay /></el-icon>
              Tổng hợp xem trước
            </el-button>
            <el-button @click="resetParameters">
              <el-icon><RefreshRight /></el-icon>
              Reset tham số
            </el-button>
          </div>
        </div>

        <!-- Phần giải thích kỹ thuật -->
        <div class="tech-explanation">
          <el-collapse>
            <el-collapse-item title="🔬 Nguyên lý điều khiển cảm xúc">
              <div class="tech-content">
                <h4>Global Style Token (GST)</h4>
                <p>
                  GST là một cách trích xuất đặc trưng phong cách từ audio mẫu. Mô hình học cách mã hoá cảm xúc, tốc độ, cao độ, ... thành một nhóm Token;
                  khi suy luận, ta chọn hoặc nội suy giữa các Token này để điều khiển phong cách tổng hợp.
                </p>

                <h4>Mã hoá audio mẫu</h4>
                <p>
                  Bạn cung cấp một đoạn audio mẫu có cảm xúc mong muốn, encoder trích xuất vector đặc trưng phong cách. Vector này được đưa vào TTS như điều kiện,
                  định hướng mô hình sinh giọng có phong cách tương tự.
                </p>

                <h4>Điều khiển chi tiết</h4>
                <p>
                  Các mô hình TTS hiện đại (như CosyVoice, F5-TTS) hỗ trợ điều khiển phong cách chi tiết, bao gồm:
                </p>
                <ul>
                  <li><strong>Điều khiển tốc độ:</strong> thay đổi tốc độ phát mà không đổi cao độ</li>
                  <li><strong>Điều khiển cao độ:</strong> thay đổi đường cong tần số cơ bản (F0)</li>
                  <li><strong>Điều khiển năng lượng:</strong> điều chỉnh đường bao âm lượng</li>
                  <li><strong>Điều khiển khoảng dừng:</strong> chỉnh độ dài khoảng lặng giữa câu và giữa cụm từ</li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>Điều khiển cảm xúc:</strong>
          Các hệ thống TTS hiện đại không chỉ tổng hợp giọng tự nhiên mà còn điều khiển chính xác cảm xúc, tốc độ, cao độ, ... Nhờ đó AI lồng tiếng có thể phù hợp với nhiều tình huống, từ hội thoại CSKH nhẹ nhàng đến bài diễn thuyết đầy nhiệt huyết.
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { MagicStick, VideoPlay, RefreshRight } from '@element-plus/icons-vue'

const emotions = [
  { id: 'neutral', name: 'Trung tính', emoji: '😐', description: 'Bình ổn, tự nhiên', color: '#909399' },
  { id: 'happy', name: 'Vui vẻ', emoji: '😊', description: 'Nhẹ nhàng, vui tươi', color: '#67c23a' },
  { id: 'sad', name: 'Buồn', emoji: '😢', description: 'Trầm, chậm', color: '#409eff' },
  { id: 'angry', name: 'Giận dữ', emoji: '😠', description: 'Mạnh, dứt khoát', color: '#f56c6c' },
  { id: 'excited', name: 'Phấn khích', emoji: '🤩', description: 'Hào hứng, hứng khởi', color: '#e6a23c' },
  { id: 'calm', name: 'Thư thái', emoji: '😌', description: 'Nhẹ nhàng, thư giãn', color: '#13c2c2' }
]

const selectedEmotion = ref('neutral')
const speed = ref(1.0)
const pitch = ref(0)
const energy = ref(100)
const pause = ref(150)
const previewText = ref('Đây là một đoạn demo TTS có điều khiển cảm xúc.')

const emotionCanvas = ref(null)

const selectEmotion = (id) => {
  selectedEmotion.value = id
  drawEmotionEmbedding()
}

const resetParameters = () => {
  speed.value = 1.0
  pitch.value = 0
  energy.value = 100
  pause.value = 150
  selectedEmotion.value = 'neutral'
  drawEmotionEmbedding()
}

const synthesize = () => {
  // Mô phỏng tổng hợp
  console.log('Synthesizing with:', {
    emotion: selectedEmotion.value,
    speed: speed.value,
    pitch: pitch.value,
    energy: energy.value,
    pause: pause.value
  })
}

// Vẽ không gian vector cảm xúc
const drawEmotionEmbedding = () => {
  const canvas = emotionCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)

  // Vẽ trục toạ độ
  ctx.strokeStyle = '#e0e0e0'
  ctx.lineWidth = 1

  // Trục X (Valence: tiêu cực -> tích cực)
  ctx.beginPath()
  ctx.moveTo(40, height / 2)
  ctx.lineTo(width - 20, height / 2)
  ctx.stroke()

  // Trục Y (Arousal: thư thái -> phấn khích)
  ctx.beginPath()
  ctx.moveTo(width / 2, height - 30)
  ctx.lineTo(width / 2, 20)
  ctx.stroke()

  // Nhãn trục
  ctx.fillStyle = '#666'
  ctx.font = '12px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Valence (tiêu cực → tích cực)', width / 2, height - 10)

  ctx.save()
  ctx.translate(15, height / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillText('Arousal (thư thái → phấn khích)', 0, 0)
  ctx.restore()

  // Vị trí các cảm xúc
  const emotionPositions = {
    neutral: { x: 0.5, y: 0.5 },
    happy: { x: 0.8, y: 0.7 },
    sad: { x: 0.2, y: 0.3 },
    angry: { x: 0.3, y: 0.9 },
    excited: { x: 0.9, y: 0.9 },
    calm: { x: 0.6, y: 0.2 }
  }

  // Vẽ tất cả điểm cảm xúc
  emotions.forEach(emotion => {
    const pos = emotionPositions[emotion.id]
    const x = 50 + pos.x * (width - 80)
    const y = height - 40 - pos.y * (height - 60)

    // Vẽ điểm
    ctx.beginPath()
    ctx.arc(x, y, emotion.id === selectedEmotion.value ? 12 : 8, 0, Math.PI * 2)
    ctx.fillStyle = emotion.color
    ctx.fill()

    // Hiệu ứng khi được chọn
    if (emotion.id === selectedEmotion.value) {
      ctx.strokeStyle = emotion.color
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(x, y, 18, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Nhãn
    ctx.fillStyle = '#333'
    ctx.font = emotion.id === selectedEmotion.value ? 'bold 12px sans-serif' : '12px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(emotion.name, x, y + 25)
  })
}

onMounted(drawEmotionEmbedding)
watch(selectedEmotion, drawEmotionEmbedding)
</script>

<style scoped>
.emotion-control-demo {
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

.emotion-selector {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.selector-title {
  font-weight: 500;
  margin-bottom: 16px;
}

.emotion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.emotion-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.emotion-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.emotion-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.emotion-emoji {
  font-size: 2rem;
  margin-bottom: 8px;
}

.emotion-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.emotion-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.emotion-embedding {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.embedding-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.emotion-canvas {
  width: 100%;
  height: auto;
  max-height: 200px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.embedding-legend {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.parameter-controls {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.control-title {
  font-weight: 500;
  margin-bottom: 16px;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.control-item {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 16px;
}

.control-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.control-hint {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.preview-section {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.preview-title {
  font-weight: 500;
  margin-bottom: 16px;
}

.preview-input {
  margin-bottom: 16px;
}

.preview-actions {
  display: flex;
  gap: 12px;
}

.tech-explanation {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.tech-content h4 {
  margin: 16px 0 8px 0;
  color: var(--vp-c-brand);
}

.tech-content h4:first-child {
  margin-top: 0;
}

.tech-content p {
  margin: 0 0 12px 0;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.tech-content ul {
  margin: 0;
  padding-left: 20px;
  color: var(--vp-c-text-2);
}

.tech-content li {
  margin-bottom: 8px;
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
</style>
