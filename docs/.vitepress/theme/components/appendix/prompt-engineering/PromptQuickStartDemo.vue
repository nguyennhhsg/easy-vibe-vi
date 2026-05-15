<template>
  <div class="quick-start-demo-container">
    <el-card
      class="quick-start-card"
      shadow="hover"
    >
      <template #header>
        <div class="header-content">
          <div class="title-group">
            <div class="title">
              🕹️ Trải nghiệm tương tác: tiến hoá prompt
            </div>
            <div class="subtitle">
              Đừng cố viết hoàn hảo ngay, hãy thử tối ưu prompt từng khối như xếp lego.
            </div>
          </div>
          <div class="controls">
            <span class="label">Chọn tác vụ:</span>
            <el-select
              v-model="taskId"
              style="width: 160px"
              size="large"
              @change="reset"
            >
              <el-option
                v-for="t in tasks"
                :key="t.id"
                :label="t.label"
                :value="t.id"
              />
            </el-select>
          </div>
        </div>
      </template>

      <!-- Khu chơi -->
      <div class="game-area">
        <!-- Bên trái: dựng prompt -->
        <div class="prompt-builder">
          <div class="section-title">
            Chỉ thị của bạn (Prompt)
          </div>
          
          <div class="prompt-box">
            <!-- Lớp cơ bản -->
            <div
              class="block base"
              :class="{ active: true }"
            >
              <span class="icon">📝</span>
              <span class="text">{{ basePrompt }}</span>
            </div>

            <!-- Lớp nâng cao: chỉ thị rõ ràng -->
            <div
              v-if="level >= 1"
              class="block clear animate-in"
            >
              <span class="icon">🎯</span>
              <span class="text">{{ clearPromptAddon }}</span>
            </div>

            <!-- Lớp chuyên gia: có cấu trúc -->
            <div
              v-if="level >= 2"
              class="block pro animate-in"
            >
              <span class="icon">🧠</span>
              <span class="text">{{ proPromptAddon }}</span>
            </div>
          </div>

          <!-- Nút nâng cấp -->
          <div class="upgrade-controls">
            <div class="level-info">
              <el-tag
                :type="levelColor"
                effect="dark"
                size="small"
                style="margin-bottom: 4px;"
              >
                Level {{ level }}
              </el-tag>
              <span
                class="level-desc"
                :style="{ color: levelColorCode }"
              >{{ levelLabel }}</span>
            </div>
            
            <div class="actions">
              <el-button-group>
                <el-button 
                  :disabled="level === 0"
                  icon="Minus"
                  @click="downgrade"
                >
                  ➖ Hạ cấp
                </el-button>
                <el-button
                  type="primary"
                  :disabled="level === 2"
                  icon="Plus"
                  @click="upgrade"
                >
                  Nâng cấp ➕
                </el-button>
              </el-button-group>
            </div>
          </div>
          
          <el-button 
            type="primary" 
            size="large" 
            :loading="isRunning"
            style="width: 100%; font-weight: bold; font-size: 1.1rem;"
            @click="run"
          >
            {{ isRunning ? 'Đang sinh...' : '🚀 Gửi cho AI' }}
          </el-button>
        </div>

        <!-- Bên phải: output AI mô phỏng -->
        <div class="chat-preview">
          <div class="section-title">
            <span>Phản hồi AI (Output)</span>
            <!-- Chuyển đổi lịch sử -->
            <div
              v-if="hasAnyHistory"
              class="history-tabs"
            >
              <el-radio-group
                v-model="viewLevel"
                size="small"
              >
                <el-radio-button 
                  v-for="l in availableLevels" 
                  :key="l" 
                  :label="l"
                >
                  L{{ l }}
                </el-radio-button>
              </el-radio-group>
            </div>
          </div>

          <div class="chat-window">
            <!-- Trạng thái rỗng -->
            <div
              v-if="!hasRun && !hasAnyHistory"
              class="empty-state"
            >
              <el-empty
                description="Bấm nút 'Gửi' bên trái để xem AI trả lời."
                :image-size="100"
              />
            </div>

            <!-- Vùng nội dung -->
            <div v-else>
              <!-- Gợi ý chế độ so sánh -->
              <el-alert
                v-if="viewLevel !== level"
                type="info"
                show-icon
                :closable="false"
                style="margin-bottom: 12px;"
              >
                <template #title>
                  Đang xem lịch sử Level {{ viewLevel }} (hiện tại là L{{ level }})
                  <el-button
                    link
                    type="primary"
                    style="padding: 0; vertical-align: baseline;"
                    @click="viewLevel = level"
                  >
                    Quay lại level hiện tại
                  </el-button>
                </template>
              </el-alert>

              <div
                class="message-bubble"
                :class="{ typing: isRunning && viewLevel === level }"
              >
                <div class="avatar">
                  🤖
                </div>
                <div class="content">
                  <div
                    v-if="isRunning && viewLevel === level"
                    class="typing-indicator"
                  >
                    <span /><span /><span />
                  </div>
                  <div
                    v-else
                    class="markdown-body"
                    v-html="renderMarkdown(getOutputForLevel(viewLevel))"
                  />
                </div>
              </div>
              
              <!-- Bong bóng nhận xét -->
              <div
                v-if="(!isRunning || viewLevel !== level) && getOutputForLevel(viewLevel)"
                class="feedback-bubble animate-pop"
              >
                <div class="feedback-title">
                  💡 {{ getFeedbackForLevel(viewLevel).title }}
                </div>
                <div class="feedback-text">
                  {{ getFeedbackForLevel(viewLevel).text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const tasks = [
  { id: 'copy', label: 'Viết caption mạng xã hội' },
  { id: 'summary', label: 'Tóm tắt biên bản họp' },
  { id: 'code', label: 'Viết hàm code' }
]

const taskId = ref('copy')
const level = ref(0) // 0: vague, 1: clear, 2: pro
const isRunning = ref(false)
const hasRun = ref(false)
const displayedOutput = ref('')

// Lưu lịch sử output: { 0: "...", 1: "..." }
const outputs = ref({})
const viewLevel = ref(0) // Level đang được xem

const hasAnyHistory = computed(() => Object.keys(outputs.value).length > 0)
const availableLevels = computed(() => Object.keys(outputs.value).map(Number).sort())

const reset = () => {
  level.value = 0
  hasRun.value = false
  displayedOutput.value = ''
  outputs.value = {}
  viewLevel.value = 0
}

const upgrade = () => {
  if (level.value < 2) level.value++
  hasRun.value = false
  viewLevel.value = level.value // khi đổi level, viewpoint cũng theo
}

const downgrade = () => {
  if (level.value > 0) level.value--
  hasRun.value = false
  viewLevel.value = level.value
}

const levelLabel = computed(() => ['Nói bừa', 'Chỉ thị rõ ràng', 'Prompt có cấu trúc'][level.value])
const levelColor = computed(() => ['info', 'warning', 'success'][level.value])
const levelColorCode = computed(() => ['#909399', '#e6a23c', '#67c23a'][level.value])

// Cấu hình nội dung prompt
const promptConfig = {
  copy: {
    base: 'Viết caption cho cốc cà phê',
    clear: '+ Phong cách: mạng xã hội, nhẹ nhàng tươi vui. Độ dài: khoảng 100 chữ. Điểm bán: ngoại hình đẹp, giữ nhiệt tốt.',
    pro: '+ Vai trò: blogger review hàng kỳ cựu\n+ Cấu trúc: nỗi đau -> điểm bán -> bối cảnh -> tương tác cuối\n+ Định dạng: dùng nhiều emoji, chia đoạn rõ ràng'
  },
  summary: {
    base: 'Tóm tắt đoạn văn này giúp tôi',
    clear: '+ Yêu cầu: rút ra 3 ý chính, mỗi ý không quá 20 chữ.',
    pro: '+ Vai trò: thư ký chuyên nghiệp\n+ Định dạng: danh sách bullet Markdown\n+ Loại trừ: không khách sáo, chỉ lấy nội dung cốt lõi'
  },
  code: {
    base: 'Viết một hàm sort',
    clear: '+ Ngôn ngữ: JavaScript (ES6). Yêu cầu: quick sort, có comment.',
    pro: '+ Vai trò: kiến trúc sư frontend kỳ cựu\n+ Robustness: xử lý edge case (mảng rỗng, không phải mảng)\n+ Ví dụ: kèm một test case'
  }
}

const basePrompt = computed(() => promptConfig[taskId.value].base)
const clearPromptAddon = computed(() => promptConfig[taskId.value].clear)
const proPromptAddon = computed(() => promptConfig[taskId.value].pro)

// Nội dung output mô phỏng
const outputConfig = {
  copy: [
    'Chiếc cốc cà phê này thực sự dễ dùng, mình giới thiệu cho mọi người. Màu đẹp, giữ nhiệt cũng tốt. Mua thôi.',
    '✨ Vật bất ly thân của hội đi làm sớm! Chiếc cốc giữ nhiệt này xinh hết nấc! 💖 Cầm trên tay là thấy chất, giữ nhiệt cực tốt, sáng pha cà phê chiều vẫn còn nóng! ☕️ Bỏ vào balo cũng không rò, hội chị em vào lụm thôi!',
    '👋 Vẫn đang khổ sở vì cà phê nguội?\n\n😫 **Nỗi đau**: pha cà phê sáng, chưa đến công ty đã nguội?\n\n🌟 **Gợi ý**: chiếc "cốc latte" này nhất định phải có!\n1️⃣ **Đẹp là chính**: tông trắng kem, chụp đại cũng ra ảnh chill 📸\n2️⃣ **Giữ nhiệt khủng**: test thực tế 6 tiếng vẫn còn nóng 🔥\n3️⃣ **Bạn đồng hành văn phòng**: thiết kế gioăng kín, ném vào balo không lo rò rỉ 🎒\n\n👇 Bình luận cho mình biết bạn thích màu nào nhất nhé!'
  ],
  summary: [
    'Đoạn này chủ yếu nói về... (lược bỏ 500 chữ lan man)... tóm lại là vậy.',
    '- Quan điểm chính: tăng trưởng người dùng chậm lại\n- Nguyên nhân chính: cạnh tranh thị trường gay gắt hơn\n- Khuyến nghị: tăng ngân sách marketing',
    '### 📝 Tóm tắt cốt lõi cuộc họp\n\n* **📉 Hiện trạng**: tăng trưởng người dùng Q3 giảm 15%\n* **🔍 Nguyên nhân**: đối thủ tung chiến lược giá rẻ, hút mạnh người dùng\n* **🚀 Hành động**: tuần tới khởi động chương trình "tri ân khách hàng cũ"'
  ],
  code: [
    'function sort(arr) { return arr.sort() } // chưa viết quick sort, hoặc có viết nhưng không comment',
    '// Quick sort\nconst quickSort = (arr) => {\n  if (arr.length <= 1) return arr;\n  const p = arr[0];\n  const left = arr.slice(1).filter(x => x < p);\n  const right = arr.slice(1).filter(x => x >= p);\n  return [...quickSort(left), p, ...quickSort(right)];\n}',
    '/**\n * Quick Sort (ES6+)\n * @param {Array} arr - mảng đầu vào\n * @returns {Array} - mảng mới đã sort\n */\nconst quickSort = (arr) => {\n  // 🛡️ Kiểm tra biên\n  if (!Array.isArray(arr)) throw new Error("Input must be an array");\n  if (arr.length <= 1) return arr;\n\n  const pivot = arr[0];\n  const left = [];\n  const right = [];\n\n  // Phân vùng\n  for (let i = 1; i < arr.length; i++) {\n    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);\n  }\n\n  return [...quickSort(left), pivot, ...quickSort(right)];\n};\n\n// ✅ Test case\nconsole.log(quickSort([3, 1, 4, 1, 5, 9])); // [1, 1, 3, 4, 5, 9]'
  ]
}

const feedbackConfig = {
  copy: [
    { title: 'Quá chung chung', text: 'AI không biết bạn muốn phong cách nào, chỉ ra được caption kiểu "hướng dẫn sử dụng".' },
    { title: 'Khá hơn nhiều', text: 'Đã có phong cách và điểm bán, AI biết cách "nói chuyện" rồi, nhưng cấu trúc chưa đủ hút.' },
    { title: 'Cấp chuyên nghiệp', text: 'Đã chỉ định vai trò và cấu trúc (nỗi đau - điểm bán), output logic rõ ràng, tỉ lệ chuyển đổi cao hơn.' }
  ],
  summary: [
    { title: 'Không bắt được trọng tâm', text: 'Không giới hạn số chữ và định dạng, AI dễ viết dài dòng.' },
    { title: 'Rõ ràng dễ hiểu', text: 'Giới hạn số chữ và số ý chính, dễ đọc hơn hẳn.' },
    { title: 'Bàn giao có cấu trúc', text: 'Chỉ định format Markdown và vai trò, dùng được ngay, không phải edit lại.' }
  ],
  code: [
    { title: 'Không dùng được', text: 'Có thể lười dùng hàm built-in hoặc thiếu comment, khó maintain.' },
    { title: 'Dùng được', text: 'Code chạy đúng, có comment cơ bản, nhưng chưa nghĩ đến tính robust.' },
    { title: 'Cấp production', text: 'Đã nghĩ đến edge case và type check, copy thẳng vào project được.' }
  ]
}

const getFeedbackForLevel = (l) => feedbackConfig[taskId.value][l]

// Lấy output cho một level (nếu là level hiện tại đang chạy thì hiển thị typing realtime; ngược lại hiển thị lịch sử)
const getOutputForLevel = (l) => {
  if (l === level.value && isRunning.value) return displayedOutput.value
  return outputs.value[l] || ''
}

const renderMarkdown = (text) => {
  if (!text) return ''
  
  // 1. HTML Escape (Basic)
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

  // 2. Bold: **text** -> <strong>text</strong>
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  return html
}

const run = () => {
  if (isRunning.value) return
  // Hiển thị kết quả trực tiếp, không mô phỏng chờ
  hasRun.value = true
  viewLevel.value = level.value // ép xem level hiện tại
  
  const fullText = outputConfig[taskId.value][level.value]
  displayedOutput.value = fullText
  outputs.value[level.value] = fullText
  isRunning.value = false
}
</script>

<style scoped>
.quick-start-demo-container {
  margin: 24px 0;
}

.quick-start-card {
  border-radius: 12px;
  overflow: visible; /* Allow selects to overflow if needed, though el-select uses popper */
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}

.title {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 4px;
  background: linear-gradient(120deg, var(--vp-c-brand) 30%, var(--vp-c-brand-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.game-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .game-area {
    grid-template-columns: 1fr;
  }
}

/* Khu vực builder bên trái */
.prompt-builder {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  letter-spacing: 0.5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.prompt-box {
  background: var(--vp-c-bg-alt);
  border: 2px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.3s;
}

.block {
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  align-items: flex-start;
}

.block.base {
  border-left: 3px solid var(--vp-c-text-2);
}

.block.clear {
  background: rgba(var(--vp-c-brand-rgb), 0.05);
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.2);
  border-left: 3px solid var(--vp-c-brand);
}

.block.pro {
  background: rgba(100, 108, 255, 0.05); /* Indigo-ish */
  border: 1px solid rgba(100, 108, 255, 0.2);
  border-left: 3px solid #646cff;
}

.block .icon {
  font-size: 1.2rem;
}

.block .text {
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
}

.animate-in {
  animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.upgrade-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vp-c-bg-alt);
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.level-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.level-desc {
  font-size: 0.9rem;
  font-weight: 700;
}

/* Khu vực preview bên phải */
.chat-preview {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-window {
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  padding: 20px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid var(--vp-c-divider);
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 200px;
}

.message-bubble {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  flex-shrink: 0;
}

.content {
  background: var(--vp-c-bg);
  padding: 12px 16px;
  border-radius: 0 12px 12px 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  max-width: 100%;
  position: relative;
}

.markdown-body {
  white-space: pre-wrap;
  line-height: 1.6;
}

.message-bubble.typing .content {
  min-width: 60px;
}

.typing-indicator span {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: var(--vp-c-text-2);
  border-radius: 50%;
  margin: 0 2px;
  animation: bounce 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.feedback-bubble {
  background: rgba(var(--vp-c-yellow-rgb), 0.1);
  border: 1px solid rgba(var(--vp-c-yellow-rgb), 0.3);
  padding: 12px;
  border-radius: 6px;
  margin-top: auto;
}

.feedback-title {
  font-weight: 700;
  color: var(--vp-c-yellow-1);
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.feedback-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.animate-pop {
  animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.9) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>