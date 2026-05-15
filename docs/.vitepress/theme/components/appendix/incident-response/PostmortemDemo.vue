<!--
  PostmortemDemo.vue
  Demo postmortem: tương tác hiển thị phương pháp "5 Whys" và mẫu báo cáo postmortem
-->
<template>
  <div class="postmortem-demo">
    <div class="header">
      <div class="title">Postmortem: 5 Whys Analysis</div>
      <div class="subtitle">Click "Hỏi tiếp" để đào sâu từng tầng tới nguyên nhân gốc</div>
    </div>

    <div class="case-select">
      <button
        v-for="c in cases"
        :key="c.id"
        :class="['case-btn', { active: activeCase === c.id }]"
        @click="selectCase(c.id)"
      >
        {{ c.name }}
      </button>
    </div>

    <div v-if="currentCase" class="whys-chain">
      <div
        v-for="(why, index) in visibleWhys"
        :key="index"
        class="why-item"
      >
        <div class="why-header">
          <span class="why-badge">
            {{ index === 0 ? 'Hiện tượng' : 'Why thứ ' + index }}
          </span>
          <span class="why-depth">
            Độ sâu {{ index }} / {{ currentCase.whys.length - 1 }}
          </span>
        </div>
        <div class="why-question" v-if="index > 0">
          Tại sao {{ currentCase.whys[index - 1].answer }}?
        </div>
        <div class="why-answer">
          <span class="answer-icon">{{ index === currentCase.whys.length - 1 && revealedCount >= currentCase.whys.length ? '🎯' : '💡' }}</span>
          <span>{{ why.answer }}</span>
        </div>
        <div
          v-if="index < visibleWhys.length - 1"
          class="why-arrow"
        >
          ↓ Hỏi tiếp
        </div>
      </div>

      <div class="why-controls" v-if="revealedCount < currentCase.whys.length">
        <button class="ask-btn" @click="revealNext">
          Hỏi tiếp: Tại sao?
        </button>
      </div>

      <div v-else class="root-cause-box">
        <div class="root-label">Đã tìm ra nguyên nhân gốc</div>
        <div class="root-content">{{ currentCase.rootCause }}</div>
        <div class="root-actions">
          <div class="actions-label">Biện pháp cải tiến:</div>
          <div
            v-for="(action, i) in currentCase.actions"
            :key="i"
            class="action-item"
          >
            <span class="action-check">&#10003;</span>
            <span>{{ action }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="template-box">
      <div class="template-title">Mẫu báo cáo postmortem</div>
      <div class="template-sections">
        <div
          v-for="(section, i) in templateSections"
          :key="i"
          class="template-item"
          :class="{ expanded: expandedSection === i }"
          @click="expandedSection = expandedSection === i ? -1 : i"
        >
          <div class="template-item-header">
            <span class="template-num">{{ i + 1 }}</span>
            <span class="template-name">{{ section.name }}</span>
            <span class="template-toggle">
              {{ expandedSection === i ? '−' : '+' }}
            </span>
          </div>
          <div v-if="expandedSection === i" class="template-item-body">
            {{ section.desc }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCase = ref('payment')
const revealedCount = ref(1)
const expandedSection = ref(-1)

const casesData = {
  payment: {
    id: 'payment',
    name: 'Hệ thống thanh toán chết',
    whys: [
      { answer: 'hệ thống thanh toán hoàn toàn không khả dụng giờ cao điểm, kéo dài 18 phút' },
      { answer: 'connection pool database cạn, mọi request mới xếp hàng timeout' },
      { answer: 'một slow query chiếm connection tới 30 giây không nhả' },
      { answer: 'tính năng đối soát mới release thực hiện full table scan, không dùng index' },
      { answer: 'lúc code review không check execution plan SQL, cũng không có khâu test slow query' }
    ],
    rootCause: 'Khiếm khuyết quy trình R&D: checklist code review thiếu mục review hiệu năng SQL, CI/CD pipeline không có khâu phát hiện slow query.',
    actions: [
      'Thêm mục bắt buộc "Kiểm tra execution plan SQL" vào checklist code review',
      'Thêm phát hiện slow query tự động vào CI pipeline (ngưỡng 100ms)',
      'Connection pool database thêm giới hạn timeout per-query (cưỡng chế ngắt sau 5s)',
      'Thiết lập quy trình duyệt thay đổi đối với bảng lớn'
    ]
  },
  deploy: {
    id: 'deploy',
    name: 'Deploy gây gián đoạn dịch vụ',
    whys: [
      { answer: 'sau khi deploy bản mới, tính năng đăng nhập user chết hoàn toàn, kéo dài 25 phút' },
      { answer: 'dịch vụ xác thực bản mới không kết nối được cluster Redis cache' },
      { answer: 'script deploy dùng sai địa chỉ cluster Redis (trỏ về môi trường test)' },
      { answer: 'cấu hình môi trường được hard-code trong script deploy, không dùng config center' },
      { answer: 'team không có quy chuẩn quản lý cấu hình thống nhất, mỗi service tự quản lý cấu hình' }
    ],
    rootCause: 'Khiếm khuyết hạ tầng: thiếu nền tảng và quy chuẩn quản lý cấu hình thống nhất, cấu hình môi trường rải rác, dễ sai, khó audit.',
    actions: [
      'Đưa vào dùng config center (như Consul/Nacos), quản lý thống nhất mọi cấu hình môi trường',
      'Pipeline deploy thêm bước kiểm tra cấu hình (kiểm tra kết nối)',
      'Cấm hard-code địa chỉ môi trường trong code và script',
      'Thiết lập checklist trước deploy, bao gồm khâu xác nhận cấu hình'
    ]
  }
}

const cases = [
  { id: 'payment', name: 'Hệ thống thanh toán chết' },
  { id: 'deploy', name: 'Deploy gây gián đoạn dịch vụ' }
]

const currentCase = computed(() => casesData[activeCase.value] || null)

const visibleWhys = computed(() => {
  if (!currentCase.value) return []
  return currentCase.value.whys.slice(0, revealedCount.value)
})

const selectCase = (id) => {
  activeCase.value = id
  revealedCount.value = 1
}

const revealNext = () => {
  if (currentCase.value && revealedCount.value < currentCase.value.whys.length) {
    revealedCount.value++
  }
}

const templateSections = [
  { name: 'Tóm tắt sự cố', desc: 'Mô tả ngắn gọn thời gian xảy ra, thời lượng, phạm vi ảnh hưởng và mức nghiêm trọng. Ví dụ: "Ngày 15/3/2024 14:02-14:20, dịch vụ thanh toán không khả dụng hoàn toàn, ảnh hưởng khoảng 120k giao dịch."' },
  { name: 'Timeline', desc: 'Ghi nhận theo thứ tự thời gian từng sự kiện then chốt từ lúc phát hiện đến khi xử lý xong, chính xác đến phút. Gồm: trigger cảnh báo, phản ứng của người, quá trình điều tra, thao tác fix, dịch vụ phục hồi, v.v.' },
  { name: 'Đánh giá ảnh hưởng', desc: 'Lượng hoá tác động sự cố: số user bị ảnh hưởng, số request fail, ước tính thiệt hại kinh tế, ảnh hưởng SLA, v.v. Nói bằng số liệu, tránh mô tả mơ hồ.' },
  { name: 'Phân tích nguyên nhân gốc', desc: 'Dùng "5 Whys" và các phương pháp khác để phân tích sâu nguyên nhân gốc. Phân biệt nguyên nhân trực tiếp (yếu tố trigger) và nguyên nhân gốc (khiếm khuyết hệ thống).' },
  { name: 'Biện pháp cải tiến', desc: 'Liệt kê các action item cải tiến cụ thể, mỗi mục phải có người chịu trách nhiệm và deadline. Chia thành ngắn hạn (tuần này), trung hạn (tháng này), dài hạn (quý này).' },
  { name: 'Bài học kinh nghiệm', desc: 'Tổng kết những gì làm tốt (đáng giữ), những gì làm chưa tốt (cần cải tiến), những phát hiện ngoài dự kiến (rủi ro mới).' }
]
</script>

<style scoped>
.postmortem-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.header { margin-bottom: 1.5rem; }
.title { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.case-select {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.case-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.case-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.case-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.whys-chain {
  margin-bottom: 1.5rem;
}

.why-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.25rem;
}

.why-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}

.why-badge {
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-brand);
  color: #fff;
  border-radius: 4px;
}

.why-depth {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.why-question {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-style: italic;
  margin-bottom: 0.3rem;
  padding-left: 0.5rem;
  border-left: 2px solid var(--vp-c-divider);
}

.why-answer {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.answer-icon { flex-shrink: 0; }

.why-arrow {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
  padding: 0.25rem 0;
}

.why-controls {
  text-align: center;
  margin-top: 0.75rem;
}

.ask-btn {
  padding: 0.6rem 1.5rem;
  background: var(--vp-c-brand);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s;
}

.ask-btn:hover { opacity: 0.9; transform: translateY(-1px); }

.root-cause-box {
  background: rgba(34, 197, 94, 0.08);
  border: 2px solid #22c55e;
  border-radius: 10px;
  padding: 1rem;
  margin-top: 0.75rem;
}

.root-label {
  font-weight: 700;
  font-size: 0.95rem;
  color: #22c55e;
  margin-bottom: 0.5rem;
}

.root-content {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.actions-label {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
}

.action-item {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
}

.action-check {
  color: #22c55e;
  font-weight: 700;
  flex-shrink: 0;
}

.template-box {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.template-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.template-sections {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.template-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
}

.template-item:hover {
  border-color: var(--vp-c-brand);
}

.template-item.expanded {
  border-color: var(--vp-c-brand);
}

.template-item-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
}

.template-num {
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--vp-c-bg-soft);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 700; flex-shrink: 0;
}

.template-name {
  flex: 1;
  font-weight: 600;
  font-size: 0.9rem;
}

.template-toggle {
  font-size: 1.1rem;
  color: var(--vp-c-text-3);
  font-weight: 700;
}

.template-item-body {
  padding: 0 0.75rem 0.6rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .case-select { flex-direction: column; }
  .case-btn { width: 100%; }
}
</style>
