<template>
  <div class="acid-demo">
    <div class="demo-header">
      <span class="icon">🔒</span>
      <span class="title">Demo đặc tính ACID của transaction</span>
      <span class="subtitle">Hiểu cách transaction đảm bảo an toàn dữ liệu</span>
    </div>

    <div class="intro-text">
      Hãy hình dung <span class="highlight">chuyển khoản ngân hàng</span>: A chuyển cho B 100k. Thao tác này gồm hai bước: trừ 100k của A, cộng 100k cho B. Nếu chỉ trừ tiền mà không vào tài khoản kia thì là thảm họa. Transaction đảm bảo hai bước này <span class="highlight">cùng thành công hoặc cùng thất bại</span>.
    </div>

    <div class="acid-cards">
      <div
        v-for="item in acidItems"
        :key="item.key"
        class="acid-card"
        :class="{ active: activeItem === item.key }"
        @click="activeItem = activeItem === item.key ? null : item.key"
      >
        <div class="card-icon">
          {{ item.icon }}
        </div>
        <div class="card-letter">
          {{ item.letter }}
        </div>
        <div class="card-name">
          {{ item.name }}
        </div>
        <div class="card-meaning">
          {{ item.meaning }}
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="activeItem"
        class="detail-panel"
      >
        <div class="detail-header">
          <span class="detail-icon">{{ currentItem?.icon }}</span>
          <span class="detail-title">{{ currentItem?.name }} ({{ currentItem?.letter }})</span>
        </div>
        <div class="detail-content">
          <div class="explanation">
            <strong>Ý nghĩa:</strong> {{ currentItem?.explanation }}
          </div>
          <div class="example">
            <div class="example-label">
              🌰 Ví dụ chuyển khoản ngân hàng:
            </div>
            <div class="example-text">
              {{ currentItem?.example }}
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div
      v-if="!activeItem"
      class="hint-text"
    >
      👆 Bấm vào bất kỳ đặc tính nào ở trên để xem giải thích chi tiết
    </div>

    <div class="scenario-box">
      <div class="scenario-title">
        🎯 Tình huống đặt vé tàu trên hệ thống bán vé
      </div>
      <div class="scenario-content">
        <p><strong>Tình huống:</strong> User A và B cùng thấy còn 1 vé, cùng bấm mua.</p>
        <p><strong>Không có transaction:</strong> A trừ tồn kho, B cũng trừ tồn kho, cùng một vé bán cho hai người!</p>
        <p><strong>Có transaction (isolation):</strong> Thao tác của A khóa lại, B phải chờ. Sau khi A mua xong, tồn kho về 0, B nhìn thấy "hết vé".</p>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Tư tưởng cốt lõi:</strong> Bốn đặc tính ACID cùng đảm bảo dữ liệu trong môi trường concurrency cao <span class="highlight">không mất, không loạn, không xung đột</span>. Đây là lý do mọi hệ thống liên quan tiền, đơn hàng đều phải dùng transaction.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeItem = ref(null)

const acidItems = ref([
  {
    key: 'atomicity',
    letter: 'A',
    icon: '⚛️',
    name: 'Nguyên tử',
    meaning: 'Atomicity',
    explanation: 'Các thao tác trong transaction hoặc cùng thành công hoặc cùng thất bại, không xảy ra cảnh "làm dở dang".',
    example: 'Khi chuyển khoản, trừ tiền và ghi có phải cùng thành công. Nếu trừ tiền thành công nhưng ghi có thất bại, hệ thống tự rollback và trả lại tiền.'
  },
  {
    key: 'consistency',
    letter: 'C',
    icon: '⚖️',
    name: 'Nhất quán',
    meaning: 'Consistency',
    explanation: 'Trước và sau khi transaction thực thi, dữ liệu phải ở trạng thái hợp lệ, thỏa các ràng buộc.',
    example: 'Trước và sau chuyển khoản, tổng số dư của A và B phải không đổi. Hết vé thì tồn kho phải bằng 0, không thể âm.'
  },
  {
    key: 'isolation',
    letter: 'I',
    icon: '🔒',
    name: 'Cô lập',
    meaning: 'Isolation',
    explanation: 'Khi nhiều transaction chạy đồng thời, chúng không ảnh hưởng lẫn nhau, mỗi transaction không cảm nhận được transaction khác.',
    example: 'Khi A đang mua vé, B sẽ chỉ thấy "hết vé" hoặc "còn 1 vé", không thấy trạng thái nửa chừng của A (như kho còn 0.5 vé).'
  },
  {
    key: 'durability',
    letter: 'D',
    icon: '💾',
    name: 'Bền vững',
    meaning: 'Durability',
    explanation: 'Transaction đã commit thì kết quả được lưu vĩnh viễn, kể cả mất điện, sập server cũng không mất.',
    example: 'Sau khi đơn hàng thành công, dù server mất điện ngay lập tức, bản ghi vé đã bán cũng không biến mất. Khởi động lại server, dữ liệu vẫn còn.'
  }
])

const currentItem = computed(() => {
  return acidItems.value.find(item => item.key === activeItem.value)
})
</script>

<style scoped>
.acid-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.acid-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .acid-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

.acid-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.acid-card:hover {
  background: var(--vp-c-bg-soft);
}

.acid-card.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.card-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.card-letter {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.25rem;
}

.card-name {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.card-meaning {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.explanation {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.example {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.example-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.example-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.hint-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.75rem;
}

.scenario-box {
  background: rgba(34, 197, 94, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.scenario-title {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.scenario-content p {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0.25rem 0;
  line-height: 1.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box .icon { margin-right: 0.25rem; }

.info-box .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
