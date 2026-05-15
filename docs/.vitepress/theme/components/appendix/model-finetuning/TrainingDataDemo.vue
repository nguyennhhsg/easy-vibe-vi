<template>
  <div class="training-data-demo">
    <div class="demo-header">
      <h4>Demo định dạng dữ liệu huấn luyện</h4>
      <p class="subtitle">Chuyển giữa các định dạng để hiểu cách tổ chức dữ liệu fine-tuning</p>
    </div>

    <div class="format-tabs">
      <button
        v-for="fmt in formats"
        :key="fmt.id"
        class="fmt-btn"
        :class="{ active: activeFormat === fmt.id }"
        @click="activeFormat = fmt.id"
      >
        <span class="fmt-icon">{{ fmt.icon }}</span>
        <span>{{ fmt.label }}</span>
      </button>
    </div>

    <div class="format-detail">
      <div class="format-info">
        <div class="info-title">{{ currentFormat.label }}</div>
        <p class="info-desc">{{ currentFormat.description }}</p>
        <div class="info-tags">
          <span class="tag" v-for="tag in currentFormat.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>

      <div class="data-preview">
        <div class="preview-header">
          <span class="preview-label">Mẫu dữ liệu</span>
          <button class="switch-btn" @click="nextExample">
            Đổi mẫu ↻
          </button>
        </div>
        <div class="json-block">
          <div v-for="(line, i) in currentExample" :key="i" class="json-line">
            <span class="json-key" v-if="line.key">{{ line.key }}</span>
            <span class="json-colon" v-if="line.key">: </span>
            <span :class="'json-value ' + (line.type || '')">{{ line.value }}</span>
          </div>
        </div>
      </div>

      <div class="quality-tips">
        <div class="tips-title">Lưu ý về chất lượng dữ liệu</div>
        <div class="tips-list">
          <div v-for="(tip, i) in currentFormat.tips" :key="i" class="tip-item">
            <span class="tip-check">✓</span>
            <span>{{ tip }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFormat = ref('instruction')
const exampleIndex = ref(0)

const formats = [
  {
    id: 'instruction',
    icon: '📝',
    label: 'Instruction following',
    description: 'Định dạng phổ biến nhất khi fine-tuning. Mỗi mẫu gồm instruction, input (tùy chọn) và output mong muốn. Phù hợp huấn luyện assistant đa năng.',
    tags: ['Assistant tổng quát', 'Phong cách ChatGPT', 'Phổ biến nhất'],
    tips: [
      'Instruction rõ ràng, không mơ hồ',
      'Output đầy đủ, chính xác, đúng format',
      'Phủ nhiều loại task (dịch, tóm tắt, Q&A...)',
      'Đề xuất: 1,000 ~ 50,000 mẫu'
    ],
    examples: [
      [
        { key: '"instruction"', value: '"Dịch tiếng Việt sau sang tiếng Anh"', type: 'string' },
        { key: '"input"', value: '"AI đang thay đổi thế giới"', type: 'string' },
        { key: '"output"', value: '"AI is changing the world"', type: 'string' }
      ],
      [
        { key: '"instruction"', value: '"Tóm tắt đoạn sau bằng một câu"', type: 'string' },
        { key: '"input"', value: '"Deep learning là một nhánh của machine learning..."', type: 'string' },
        { key: '"output"', value: '"Deep learning dùng neural network nhiều tầng để tự học đặc trưng"', type: 'string' }
      ],
      [
        { key: '"instruction"', value: '"Giải thích API là gì"', type: 'string' },
        { key: '"input"', value: '""', type: 'string' },
        { key: '"output"', value: '"API là giao diện lập trình ứng dụng, định nghĩa..."', type: 'string' }
      ]
    ]
  },
  {
    id: 'conversation',
    icon: '💬',
    label: 'Hội thoại nhiều lượt',
    description: 'Mô phỏng hội thoại nhiều lượt thật. Mỗi mẫu gồm một chuỗi tin nhắn: system prompt, tin của user, trả lời của assistant. Phù hợp huấn luyện chatbot.',
    tags: ['Chatbot', 'Tương tác nhiều lượt', 'Hiểu context'],
    tips: [
      'Hội thoại tự nhiên, đúng mẫu tương tác thực',
      'Giữ tính nhất quán nhân vật (system prompt xuyên suốt)',
      'Bao gồm các tình huống tham chiếu context và hỏi tiếp',
      'Đề xuất: 5,000 ~ 100,000 cuộc hội thoại'
    ],
    examples: [
      [
        { key: '"messages"', value: '[', type: 'bracket' },
        { key: '  {"role"', value: '"system", "content": "Bạn là một trợ lý lập trình"}', type: 'string' },
        { key: '  {"role"', value: '"user", "content": "Python đọc file như thế nào?"}', type: 'string' },
        { key: '  {"role"', value: '"assistant", "content": "Dùng hàm open()..."}', type: 'string' },
        { key: '', value: ']', type: 'bracket' }
      ],
      [
        { key: '"messages"', value: '[', type: 'bracket' },
        { key: '  {"role"', value: '"system", "content": "Bạn là một chuyên gia tư vấn y tế"}', type: 'string' },
        { key: '  {"role"', value: '"user", "content": "Bị cảm thì phải làm sao?"}', type: 'string' },
        { key: '  {"role"', value: '"assistant", "content": "Nên nghỉ ngơi và uống nhiều nước..."}', type: 'string' },
        { key: '  {"role"', value: '"user", "content": "Có cần uống thuốc không?"}', type: 'string' },
        { key: '  {"role"', value: '"assistant", "content": "Nếu triệu chứng nhẹ..."}', type: 'string' },
        { key: '', value: ']', type: 'bracket' }
      ]
    ]
  },
  {
    id: 'classification',
    icon: '🏷️',
    label: 'Phân loại / gán nhãn',
    description: 'Dùng cho task phân loại văn bản. Mỗi mẫu gồm văn bản đầu vào và nhãn tương ứng. Phù hợp phân tích cảm xúc, nhận diện ý định, kiểm duyệt nội dung...',
    tags: ['Phân tích cảm xúc', 'Nhận diện intent', 'Kiểm duyệt nội dung'],
    tips: [
      'Nhãn phải thống nhất, tránh khác biệt cách gõ',
      'Số mẫu giữa các lớp nên cân bằng',
      'Bao gồm cả trường hợp biên và dễ nhầm lẫn',
      'Đề xuất: ít nhất 100 mẫu cho mỗi lớp'
    ],
    examples: [
      [
        { key: '"text"', value: '"Món ăn của nhà hàng này rất ngon, phục vụ chu đáo"', type: 'string' },
        { key: '"label"', value: '"positive"', type: 'label' }
      ],
      [
        { key: '"text"', value: '"Đợi cả tiếng đồng hồ chưa có đồ ăn, quá thất vọng"', type: 'string' },
        { key: '"label"', value: '"negative"', type: 'label' }
      ],
      [
        { key: '"text"', value: '"Không gian bình thường, giá tầm trung"', type: 'string' },
        { key: '"label"', value: '"neutral"', type: 'label' }
      ]
    ]
  }
]

const currentFormat = computed(() => {
  return formats.find(f => f.id === activeFormat.value)
})

const currentExample = computed(() => {
  const examples = currentFormat.value.examples
  return examples[exampleIndex.value % examples.length]
})

function nextExample() {
  exampleIndex.value++
}
</script>

<style scoped>
.training-data-demo {
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
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.format-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.fmt-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.fmt-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.fmt-icon {
  font-size: 16px;
}

.format-detail {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.format-info {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.info-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.info-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0 0 10px;
}

.info-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  padding: 2px 10px;
  border-radius: 10px;
  font-size: 11px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.data-preview {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid var(--vp-c-divider);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.preview-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.switch-btn {
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 12px;
}

.switch-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.json-block {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 12px;
  font-family: 'Fira Code', monospace;
}

.json-line {
  font-size: 12px;
  line-height: 1.8;
}

.json-key {
  color: #818cf8;
}

.json-colon {
  color: var(--vp-c-text-3);
}

.json-value.string {
  color: #10b981;
}

.json-value.label {
  color: #f59e0b;
  font-weight: 600;
}

.json-value.bracket {
  color: var(--vp-c-text-3);
}

.quality-tips {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  border-left: 3px solid #10b981;
}

.tips-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.tip-check {
  color: #10b981;
  font-weight: 600;
  flex-shrink: 0;
}
</style>
