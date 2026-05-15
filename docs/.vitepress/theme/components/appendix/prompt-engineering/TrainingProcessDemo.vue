<template>
  <el-card
    class="training-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <h3 class="title">
          Nhìn dữ liệu training để hiểu hành vi mô hình
        </h3>
        <div class="mode-switch-container">
          <el-radio-group
            v-model="mode"
            size="large"
          >
            <el-radio-button label="pretrain">
              1. Pre-training
            </el-radio-button>
            <el-radio-button label="finetune">
              2. Fine-tuning
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </template>

    <!-- PRE-TRAINING MODE -->
    <div
      v-if="mode === 'pretrain'"
      class="demo-content"
    >
      <el-card
        shadow="never"
        class="concept-card"
      >
        <div class="concept-content">
          <div class="icon">
            📚
          </div>
          <div class="info">
            <h4>Đọc khắp thế gian (Reading the Web)</h4>
            <p>Mục tiêu cốt lõi: <strong>dự đoán token kế tiếp</strong></p>
            <p class="sub">
              Mô hình đã đọc lượng văn bản khổng lồ, bản năng của nó là "viết tiếp câu".
            </p>
          </div>
        </div>
      </el-card>

      <div class="interactive-area">
        <div class="editor-window">
          <div class="window-header">
            <span class="dot red" /><span class="dot yellow" /><span class="dot green" />
            <span class="window-title">Next Token Predictor</span>
          </div>
          <div class="editor-content">
            <span class="text-gray">Source: Wikipedia / Books</span>
            <br><br>
            <p>
              Natural selection, proposed by Darwin in 
              <span class="highlight">{{ currentPrediction || '...' }}</span>
            </p>
          </div>
        </div>

        <div class="controls">
          <el-button
            type="primary"
            size="large"
            :loading="isPredicting"
            @click="predictNext"
          >
            {{ isPredicting ? 'Đang tính xác suất...' : 'Dự đoán từ kế (Predict)' }}
          </el-button>
        </div>

        <el-collapse-transition>
          <div
            v-if="predictions.length > 0"
            class="predictions-panel"
          >
            <h5>Phân phối xác suất (Top 3 Candidates)</h5>
            <div class="chart-container">
              <div
                v-for="(item, index) in predictions"
                :key="index"
                class="bar-row"
                @click="selectPrediction(item)"
              >
                <div class="label">
                  {{ item.token }}
                </div>
                <div class="bar-container">
                  <el-progress 
                    :percentage="item.prob" 
                    :stroke-width="18" 
                    :text-inside="true" 
                    :color="index === 0 ? '#67c23a' : '#409eff'"
                  />
                </div>
              </div>
            </div>
            <p class="hint">
              👆 Bấm vào một từ dự đoán để điền vào (mô hình chỉ đang "đoán" theo quy luật thống kê)
            </p>
          </div>
        </el-collapse-transition>
      </div>
    </div>

    <!-- FINE-TUNING MODE -->
    <div
      v-if="mode === 'finetune'"
      class="demo-content"
    >
      <el-card
        shadow="never"
        class="concept-card"
      >
        <div class="concept-content">
          <div class="icon">
            🎓
          </div>
          <div class="info">
            <h4>Học quy tắc (Instruction Tuning)</h4>
            <p>Mục tiêu cốt lõi: <strong>nghe theo chỉ thị (Follow Instructions)</strong></p>
            <p class="sub">
              Thông qua cặp dữ liệu (câu hỏi → đáp án chuẩn), ta dạy mô hình "nói chuyện như một trợ lý".
            </p>
          </div>
        </div>
      </el-card>

      <div class="interactive-area">
        <div class="chat-window">
          <div class="message user">
            <div class="avatar">
              👤
            </div>
            <div class="bubble">
              Tôi đổi/trả hàng kiểu gì?
            </div>
          </div>
          
          <el-collapse-transition>
            <div
              v-if="ftState === 'base'"
              class="message ai base-model"
            >
              <div class="avatar">
                🤖
              </div>
              <div class="bubble">
                <el-tag
                  type="info"
                  size="small"
                  class="badge"
                >
                  Mô hình pre-train (Base Model)
                </el-tag>
                <div class="bubble-text">
                  Trả hàng là quá trình người tiêu dùng trả lại sản phẩm đã mua cho người bán. Trong thương mại điện tử, tỷ lệ trả hàng thường khoảng 20%. Theo "Luật bảo vệ người tiêu dùng"...
                  <br><br>
                  <small>❌ (Nó đang đọc thuộc lòng chứ không trả lời bạn)</small>
                </div>
              </div>
            </div>
          </el-collapse-transition>

          <el-collapse-transition>
            <div
              v-if="ftState === 'tuned'"
              class="message ai tuned-model"
            >
              <div class="avatar">
                ✨
              </div>
              <div class="bubble">
                <el-tag
                  type="success"
                  size="small"
                  class="badge"
                >
                  Mô hình fine-tuned (Instruct Model)
                </el-tag>
                <div class="bubble-text">
                  Đổi/trả hàng rất đơn giản, bạn làm theo các bước sau:
                  <ol>
                    <li>Đăng nhập tài khoản</li>
                    <li>Bấm "Đơn hàng của tôi"</li>
                    <li>Chọn sản phẩm muốn trả, bấm "Yêu cầu hậu mãi"</li>
                  </ol>
                  <small>✅ (Nó đã học được format "phản hồi chỉ thị")</small>
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>

        <div class="controls center-controls">
          <el-radio-group
            v-model="ftState"
            size="large"
          >
            <el-radio-button label="base">
              Mô hình gốc (Base)
            </el-radio-button>
            <el-radio-button label="tuned">
              Đã fine-tune (Instruct)
            </el-radio-button>
          </el-radio-group>
          <p class="hint">
            Chuyển công tắc để quan sát hành vi mô hình khác biệt rõ rệt
          </p>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('pretrain')
const isPredicting = ref(false)
const currentPrediction = ref('')
const predictions = ref([])
const ftState = ref('base')

const predictNext = () => {
  isPredicting.value = true
  predictions.value = []
  currentPrediction.value = ''
  
  setTimeout(() => {
    isPredicting.value = false
    predictions.value = [
      { token: '1859', prob: 85 },
      { token: 'his', prob: 10 },
      { token: 'the', prob: 5 }
    ]
  }, 600)
}

const selectPrediction = (item) => {
  currentPrediction.value = item.token
}
</script>

<style scoped>
.training-card {
  margin: 16px 0;
}

.card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.mode-switch-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.demo-content {
  padding-top: 10px;
}

.concept-card {
  margin-bottom: 24px;
}

.concept-content {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.concept-content .icon {
  font-size: 32px;
}

.concept-content h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.concept-content p {
  margin: 4px 0;
  font-size: 14px;
  line-height: 1.5;
}

.concept-content .sub {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

/* Pre-training styles */
.editor-window {
  background: #1e1e1e;
  border-radius: 6px;
  color: #d4d4d4;
  font-family: monospace;
  overflow: hidden;
  margin-bottom: 16px;
}

.window-header {
  background: #2d2d2d;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.red { background: #ff5f56; }
.yellow { background: #ffbd2e; }
.green { background: #27c93f; }

.window-title {
  margin-left: 10px;
  font-size: 12px;
  color: #999;
}

.editor-content {
  padding: 20px;
  line-height: 1.6;
}

.text-gray {
  color: #666;
  font-style: italic;
}

.highlight {
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--vp-c-brand);
  font-weight: bold;
  border-bottom: 2px dashed var(--vp-c-brand);
}

.predictions-panel {
  margin-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 16px;
}

.bar-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  cursor: pointer;
}

.label {
  width: 60px;
  text-align: right;
  font-family: monospace;
  font-weight: bold;
}

.bar-container {
  flex: 1;
}

.hint {
  font-size: 13px;
  color: var(--vp-c-text-3);
  text-align: center;
  margin-top: 12px;
}

/* Fine-tuning styles */
.chat-window {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
  min-height: 200px;
  border: 1px solid var(--vp-c-divider);
}

.message {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.avatar {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg);
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
}

.bubble {
  flex: 1;
  background: var(--vp-c-bg);
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  position: relative;
}

.badge {
  margin-bottom: 8px;
  display: inline-flex;
}

.bubble-text {
  line-height: 1.6;
}

.center-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .card-header {
    align-items: flex-start;
  }
  
  .mode-switch-container {
    justify-content: flex-start;
    overflow-x: auto;
  }
}
</style>