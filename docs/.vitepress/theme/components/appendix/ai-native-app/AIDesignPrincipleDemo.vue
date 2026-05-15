<template>
  <div class="principle-demo">
    <div class="header">
      <div class="title">Nguyên tắc thiết kế AI-native</div>
      <div class="subtitle">Bấm vào card để xem chi tiết mỗi nguyên tắc</div>
    </div>

    <div class="principle-grid">
      <div
        v-for="p in principles"
        :key="p.id"
        :class="['principle-card', { active: selected === p.id }]"
        @click="selected = p.id"
      >
        <div class="p-icon">{{ p.icon }}</div>
        <div class="p-name">{{ p.name }}</div>
        <div class="p-brief">{{ p.brief }}</div>
      </div>
    </div>

    <div v-if="selected" class="detail-panel">
      <div class="detail-header">
        <span>{{ currentPrinciple.icon }} {{ currentPrinciple.name }}</span>
      </div>

      <div class="detail-body">
        <div class="detail-desc">{{ currentPrinciple.detail }}</div>

        <div class="example-section">
          <div class="example-title">So sánh thực tiễn</div>
          <div class="compare-grid">
            <div class="compare-bad">
              <div class="compare-label bad-label">❌ Ví dụ phản diện</div>
              <div class="compare-text">{{ currentPrinciple.bad }}</div>
            </div>
            <div class="compare-good">
              <div class="compare-label good-label">✅ Cách làm đúng</div>
              <div class="compare-text">{{ currentPrinciple.good }}</div>
            </div>
          </div>
        </div>

        <div class="checklist">
          <div class="checklist-title">Checklist</div>
          <div
            v-for="(item, idx) in currentPrinciple.checklist"
            :key="idx"
            :class="['check-item', { checked: checkedItems[selected]?.[idx] }]"
            @click="toggleCheck(idx)"
          >
            <span class="check-box">
              {{ checkedItems[selected]?.[idx] ? '☑' : '☐' }}
            </span>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const principles = [
  {
    id: 'graceful',
    icon: '🛡️',
    name: 'Graceful degradation',
    brief: 'Khi AI lỗi, hệ thống vẫn dùng được',
    detail: 'Mô hình AI có thể timeout, trả lỗi, sinh ảo giác. Graceful degradation nghĩa là khi AI không khả dụng, hệ thống có phương án dự phòng, không sập thẳng. Đây là ranh giới giữa ứng dụng AI-native và project đồ chơi.',
    bad: 'Khi API mô hình timeout, trang hiện lỗi trắng, user chỉ còn cách refresh.',
    good: 'Khi mô hình timeout, hiển thị câu trả lời cache trước đó hoặc gợi ý tài liệu liên quan, đồng thời tự retry phía sau.',
    checklist: [
      'Đặt timeout API hợp lý (thường 30-60s)',
      'Chuẩn bị phương án dự phòng: cache, rule engine, chuyển human',
      'Hiển thị trạng thái minh bạch cho user',
      'Ghi log lỗi để cải thiện sau này'
    ]
  },
  {
    id: 'human',
    icon: '🤝',
    name: 'Human-in-the-loop',
    brief: 'Quyết định quan trọng do con người xác nhận',
    detail: 'AI giỏi sinh nội dung và gợi ý, nhưng không nên tự quyết trong tình huống rủi ro cao. Mô hình Human-in-the-Loop để AI lo bản nháp và đề xuất, con người duyệt và xác nhận.',
    bad: 'AI tự gửi email cho khách hàng, nội dung không qua duyệt, làm lan thông tin sai.',
    good: 'AI sinh bản nháp email và bôi đậm chỗ không chắc, user duyệt và sửa rồi mới gửi tay.',
    checklist: [
      'Xác định thao tác nào là "rủi ro cao" (gửi, xóa, thanh toán)',
      'Thao tác rủi ro cao phải có bước xác nhận của người',
      'Output AI có gắn confidence, nội dung confidence thấp phải duyệt tay',
      'Cung cấp giao diện chỉnh sửa thuận tiện'
    ]
  },
  {
    id: 'transparent',
    icon: '🔍',
    name: 'Minh bạch và giải thích được',
    brief: 'Cho user hiểu cách AI suy luận',
    detail: 'AI không phải hộp đen ma thuật. User cần biết tại sao AI đưa ra câu trả lời, dựa vào thông tin gì, độ chắc chắn ra sao. Minh bạch xây dựng niềm tin và giúp user biết khi nào tin, khi nào nên đặt câu hỏi.',
    bad: 'AI đưa kết luận thẳng, không giải thích, không trích nguồn, user không đánh giá được độ tin cậy.',
    good: 'Câu trả lời kèm quá trình suy luận, link nguồn trích dẫn, chỉ số confidence — user có thể truy vết.',
    checklist: [
      'Hiển thị chuỗi suy luận hoặc quá trình tư duy của AI',
      'Gắn nguồn và trích dẫn',
      'Hiện chỉ số confidence hoặc mức độ không chắc chắn',
      'Có chỗ giải thích "vì sao trả lời như vậy"'
    ]
  },
  {
    id: 'feedback',
    icon: '🔄',
    name: 'Vòng phản hồi',
    brief: 'Phản hồi của user thúc đẩy cải tiến liên tục',
    detail: 'Mỗi tương tác là một cơ hội cải thiện. Thu thập đánh giá của user (like/dislike, lịch sử chỉnh sửa, pattern hỏi tiếp) để liên tục tối ưu prompt, fine-tune mô hình, cải tiến retrieval.',
    bad: 'Khi AI trả lời sai, không có kênh phản hồi, lỗi tương tự cứ lặp lại.',
    good: 'User có thể đánh dấu câu sai, hệ thống tự gom lại để tối ưu prompt và retrieval.',
    checklist: [
      'Cung cấp cơ chế phản hồi đơn giản (nút 👍👎)',
      'Ghi nhận chỉnh sửa và hỏi tiếp như phản hồi ngầm',
      'Định kỳ phân tích dữ liệu phản hồi để tối ưu prompt template',
      'Có A/B test để xác minh hiệu quả cải tiến'
    ]
  }
]

const selected = ref('graceful')
const checkedItems = reactive({})

const currentPrinciple = computed(() =>
  principles.find(p => p.id === selected.value) || principles[0]
)

const toggleCheck = (idx) => {
  if (!checkedItems[selected.value]) {
    checkedItems[selected.value] = {}
  }
  checkedItems[selected.value][idx] = !checkedItems[selected.value][idx]
}
</script>

<style scoped>
.principle-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 20px; margin: 20px 0;
}
.header { text-align: center; margin-bottom: 16px; }
.title {
  font-size: 17px; font-weight: 700;
  background: linear-gradient(120deg, #ef4444, #f59e0b);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.principle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px; margin-bottom: 16px;
}
.principle-card {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 10px; padding: 14px; cursor: pointer;
  transition: all 0.2s; text-align: center;
}
.principle-card:hover { background: var(--vp-c-bg-alt); }
.principle-card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.p-icon { font-size: 24px; margin-bottom: 6px; }
.p-name { font-weight: 600; font-size: 13px; }
.p-brief { font-size: 11px; color: var(--vp-c-text-2); margin-top: 4px; }

.detail-panel {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; overflow: hidden;
}
.detail-header {
  padding: 14px 16px; font-weight: 700; font-size: 15px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.detail-body { padding: 16px; }
.detail-desc {
  color: var(--vp-c-text-2); font-size: 13px;
  line-height: 1.7; margin-bottom: 16px;
}

.example-section { margin-bottom: 16px; }
.example-title { font-weight: 600; font-size: 13px; margin-bottom: 8px; }
.compare-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}
.compare-bad, .compare-good {
  padding: 12px; border-radius: 8px; font-size: 13px; line-height: 1.6;
}
.compare-bad { background: #fef2f2; border: 1px solid #fecaca; }
.compare-good { background: #f0fdf4; border: 1px solid #bbf7d0; }
.compare-label {
  font-weight: 600; font-size: 11px; margin-bottom: 6px;
}
.bad-label { color: #dc2626; }
.good-label { color: #16a34a; }
.compare-text { color: var(--vp-c-text-1); }

.checklist-title { font-weight: 600; font-size: 13px; margin-bottom: 8px; }
.check-item {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 10px; border-radius: 6px; font-size: 13px;
  cursor: pointer; transition: background 0.2s;
  border: 1px solid transparent;
}
.check-item:hover { background: var(--vp-c-bg-soft); }
.check-item.checked {
  background: #f0fdf4; border-color: #bbf7d0;
  text-decoration: line-through; color: var(--vp-c-text-3);
}
.check-box { font-size: 16px; flex-shrink: 0; }
</style>
