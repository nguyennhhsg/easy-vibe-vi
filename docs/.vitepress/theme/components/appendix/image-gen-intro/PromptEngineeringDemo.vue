<!--
  PromptEngineeringDemo.vue
  Component minh hoạ prompt engineering

  Mục đích:
  Trình bày prompt ảnh hưởng tới kết quả sinh ảnh ra sao, giúp bạn hiểu tầm quan trọng của prompt engineering.

  Tương tác:
  - Chỉnh sửa prompt theo thời gian thực
  - Trích xuất và làm nổi bật từ khoá
  - Điều chỉnh trọng số
  - So sánh hiệu quả của các prompt khác nhau
-->
<template>
  <div class="prompt-engineering-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><EditPen /></el-icon>
          <span>✍️ Phòng thí nghiệm prompt engineering</span>
        </div>
      </template>

      <div class="demo-layout">
        <!-- Bên trái: chỉnh sửa prompt -->
        <div class="prompt-panel">
          <div class="prompt-input-section">
            <label>Prompt</label>
            <el-input
              v-model="prompt"
              type="textarea"
              :rows="4"
              placeholder="Nhập prompt của bạn..."
            />
          </div>

          <div class="prompt-analysis">
            <div class="analysis-title">
              Phân tích từ khoá
            </div>
            <div class="keywords-list">
              <div
                v-for="(keyword, index) in analyzedKeywords"
                :key="index"
                class="keyword-item"
                :class="keyword.type"
              >
                <span class="keyword-text">{{ keyword.text }}</span>
                <el-slider
                  v-model="keyword.weight"
                  :min="0"
                  :max="2"
                  :step="0.1"
                  size="small"
                  class="weight-slider"
                />
                <span class="weight-value">{{ keyword.weight.toFixed(1) }}</span>
              </div>
            </div>
          </div>

          <div class="prompt-tips">
            <el-collapse>
              <el-collapse-item title="💡 Mẹo viết prompt">
                <ul class="tips-list">
                  <li><strong>Mô tả chủ thể</strong>: Nói rõ bạn muốn vẽ gì (ví dụ "một con mèo vàng")</li>
                  <li><strong>Từ phong cách</strong>: Chỉ định phong cách nghệ thuật (ví dụ "tranh màu nước", "cyberpunk")</li>
                  <li><strong>Từ chất lượng</strong>: Nâng chất lượng ảnh (ví dụ "8k", "masterpiece", "highly detailed")</li>
                  <li><strong>Ánh sáng</strong>: Điều khiển hiệu ứng ánh sáng (ví dụ "golden hour", "volumetric lighting")</li>
                  <li><strong>Cú pháp trọng số</strong>: Dùng (word:1.5) để tăng trọng số, (word:0.5) để giảm</li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>

        <!-- Bên phải: xem trước hiệu quả -->
        <div class="preview-panel">
          <div class="preview-tabs">
            <el-tabs v-model="activeTab">
              <el-tab-pane
                label="Phân tích cấu trúc"
                name="structure"
              >
                <div class="structure-viz">
                  <div class="structure-section">
                    <div class="section-header">
                      <el-tag type="primary">
                        Chủ thể (Subject)
                      </el-tag>
                    </div>
                    <div class="section-content">
                      {{ extractSubject() || 'Không phát hiện chủ thể' }}
                    </div>
                  </div>

                  <div class="structure-section">
                    <div class="section-header">
                      <el-tag type="success">
                        Phong cách (Style)
                      </el-tag>
                    </div>
                    <div class="section-content">
                      {{ extractStyle() || 'Không phát hiện từ phong cách' }}
                    </div>
                  </div>

                  <div class="structure-section">
                    <div class="section-header">
                      <el-tag type="warning">
                        Chất lượng (Quality)
                      </el-tag>
                    </div>
                    <div class="section-content">
                      {{ extractQuality() || 'Không phát hiện từ chất lượng' }}
                    </div>
                  </div>

                  <div class="structure-section">
                    <div class="section-header">
                      <el-tag type="info">
                        Môi trường (Environment)
                      </el-tag>
                    </div>
                    <div class="section-content">
                      {{ extractEnvironment() || 'Không phát hiện mô tả môi trường' }}
                    </div>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane
                label="So sánh ví dụ"
                name="comparison"
              >
                <div class="comparison-list">
                  <div
                    v-for="(example, index) in promptExamples"
                    :key="index"
                    class="comparison-item"
                    :class="{ active: selectedExample === index }"
                    @click="selectExample(index)"
                  >
                    <div class="example-prompt">
                      {{ example.prompt }}
                    </div>
                    <div class="example-desc">
                      {{ example.description }}
                    </div>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane
                label="Negative prompt"
                name="negative"
              >
                <div class="negative-prompt-section">
                  <label>Negative Prompt</label>
                  <el-input
                    v-model="negativePrompt"
                    type="textarea"
                    :rows="3"
                    placeholder="Nhập nội dung bạn không muốn xuất hiện..."
                  />
                  <div class="negative-presets">
                    <el-tag
                      v-for="preset in negativePresets"
                      :key="preset"
                      size="small"
                      class="negative-preset-tag"
                      @click="addNegativePreset(preset)"
                    >
                      + {{ preset }}
                    </el-tag>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>Cốt lõi của prompt engineering:</strong>
          Prompt tốt = mô tả rõ ràng + từ phong cách phù hợp + từ tăng chất lượng. Bằng cách điều chỉnh trọng số của từng phần, bạn có thể kiểm soát chính xác kết quả sinh ảnh.
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { EditPen } from '@element-plus/icons-vue'

const prompt = ref('một con mèo vàng, ngồi trên bậu cửa sổ, ánh nắng chiếu, phong cách tranh màu nước, 8k chất lượng cao')
const negativePrompt = ref('blurry, low quality, deformed, extra fingers')
const activeTab = ref('structure')
const selectedExample = ref(0)

// Loại từ khoá
const keywordTypes = {
  subject: ['mèo', 'chó', 'người', 'phong cảnh', 'kiến trúc', 'xe', 'hoa', 'cây', 'cat', 'dog'],
  style: ['màu nước', 'sơn dầu', 'phác thảo', 'cyberpunk', 'pixel', 'tả thực', 'cartoon', 'anime', 'watercolor'],
  quality: ['8k', 'chất lượng cao', 'masterpiece', 'detailed', 'high quality', '4k', 'sharp'],
  environment: ['nắng', 'mưa', 'đêm', 'rừng', 'thành phố', 'biển', 'trong nhà', 'ngoài trời', 'ánh nắng']
}

// Phân tích từ khoá
const analyzedKeywords = computed(() => {
  const keywords = []
  const words = prompt.value.split(/[,，\s]+/).filter(w => w.length > 0)

  words.forEach(word => {
    let type = 'other'
    if (keywordTypes.subject.some(k => word.toLowerCase().includes(k.toLowerCase()))) type = 'subject'
    else if (keywordTypes.style.some(k => word.toLowerCase().includes(k.toLowerCase()))) type = 'style'
    else if (keywordTypes.quality.some(k => word.toLowerCase().includes(k.toLowerCase()))) type = 'quality'
    else if (keywordTypes.environment.some(k => word.toLowerCase().includes(k.toLowerCase()))) type = 'environment'

    keywords.push({
      text: word,
      type,
      weight: 1.0
    })
  })

  return keywords
})

// Trích xuất các loại từ khác nhau
const extractSubject = () => {
  return analyzedKeywords.value
    .filter(k => k.type === 'subject')
    .map(k => k.text)
    .join(', ')
}

const extractStyle = () => {
  return analyzedKeywords.value
    .filter(k => k.type === 'style')
    .map(k => k.text)
    .join(', ')
}

const extractQuality = () => {
  return analyzedKeywords.value
    .filter(k => k.type === 'quality')
    .map(k => k.text)
    .join(', ')
}

const extractEnvironment = () => {
  return analyzedKeywords.value
    .filter(k => k.type === 'environment')
    .map(k => k.text)
    .join(', ')
}

// Ví dụ prompt
const promptExamples = [
  {
    prompt: 'một con mèo',
    description: 'Mô tả cơ bản, kết quả có thể chưa ưng ý'
  },
  {
    prompt: 'một con mèo vàng, ngồi trên bậu cửa sổ',
    description: 'Thêm chi tiết chủ thể và bối cảnh'
  },
  {
    prompt: 'một con mèo vàng, ngồi trên bậu cửa sổ, ánh nắng chiếu, phong cách tranh màu nước',
    description: 'Thêm ánh sáng và phong cách'
  },
  {
    prompt: 'một con mèo vàng, ngồi trên bậu cửa sổ, ánh nắng chiếu, phong cách tranh màu nước, 8k chất lượng cao, masterpiece',
    description: 'Prompt đầy đủ, bao gồm từ chất lượng'
  }
]

// Preset negative prompt
const negativePresets = [
  'blurry',
  'low quality',
  'deformed',
  'extra fingers',
  'distorted face',
  'noise',
  'watermark',
  'text'
]

const selectExample = (index) => {
  selectedExample.value = index
  prompt.value = promptExamples[index].prompt
}

const addNegativePreset = (preset) => {
  if (!negativePrompt.value.includes(preset)) {
    negativePrompt.value = negativePrompt.value
      ? `${negativePrompt.value}, ${preset}`
      : preset
  }
}
</script>

<style scoped>
.prompt-engineering-demo {
  margin: 0.5rem 0;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.demo-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .demo-layout {
    grid-template-columns: 1fr;
  }
}

.prompt-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.prompt-input-section label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--vp-c-text-2);
}

.prompt-analysis {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 16px;
}

.analysis-title {
  font-weight: 500;
  margin-bottom: 12px;
}

.keywords-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.keyword-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-divider);
}

.keyword-item.subject {
  border-left-color: #409eff;
}

.keyword-item.style {
  border-left-color: #67c23a;
}

.keyword-item.quality {
  border-left-color: #e6a23c;
}

.keyword-item.environment {
  border-left-color: #909399;
}

.keyword-text {
  min-width: 80px;
  font-size: 0.875rem;
}

.weight-slider {
  flex: 1;
}

.weight-value {
  min-width: 40px;
  text-align: right;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.prompt-tips {
  margin-top: 8px;
}

.tips-list {
  margin: 0;
  padding-left: 20px;
}

.tips-list li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.preview-panel {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 16px;
}

.structure-viz {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.structure-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 12px;
}

.section-header {
  margin-bottom: 8px;
}

.section-content {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  min-height: 24px;
}

.comparison-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comparison-item {
  padding: 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.comparison-item:hover {
  border-color: var(--vp-c-brand);
}

.comparison-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.example-prompt {
  font-weight: 500;
  margin-bottom: 4px;
}

.example-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.negative-prompt-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.negative-prompt-section label {
  font-size: 0.875rem;
  font-weight: 500;
}

.negative-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.negative-preset-tag {
  cursor: pointer;
  transition: all 0.2s;
}

.negative-preset-tag:hover {
  transform: translateY(-2px);
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
