<template>
  <div class="data-evolution-demo">
    <div class="demo-header">
      <span class="icon">📊</span>
      <span class="title">Tiến hóa của lưu trữ dữ liệu</span>
      <span class="subtitle">Từ cuốn sổ tay đến database</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn đang quản lý một <span class="highlight">tiệm sách</span>: từ ghi chép trên sổ tay, đến quản lý bằng Excel, rồi đến hệ thống database chuyên nghiệp. Mỗi bước tiến hóa đều nhằm giải quyết các vấn đề mới khi lượng dữ liệu tăng lên.
    </div>

    <div class="evolution-stages">
      <div
        v-for="(stage, i) in stages"
        :key="stage.id"
        class="stage"
        :class="{ active: activeStage === stage.id }"
        @click="activeStage = activeStage === stage.id ? null : stage.id"
      >
        <div class="stage-icon">
          {{ stage.icon }}
        </div>
        <div class="stage-name">
          {{ stage.name }}
        </div>
        <div class="stage-simple">
          {{ stage.simple }}
        </div>
        <div class="stage-capacity">
          {{ stage.capacity }}
        </div>
        <div
          v-if="i < stages.length - 1"
          class="arrow"
        >
          →
        </div>
      </div>
    </div>

    <div
      v-if="!activeStage"
      class="hint-text"
    >
      👆 Nhấn vào một giai đoạn ở trên để xem chi tiết
    </div>

    <Transition name="fade">
      <div
        v-if="activeStage"
        class="stage-detail"
      >
        <div class="detail-header">
          <span class="detail-icon">{{ currentStage?.icon }}</span>
          <span class="detail-title">{{ currentStage?.name }}</span>
          <span class="detail-capacity">{{ currentStage?.capacity }}</span>
        </div>
        <div class="detail-content">
          <div class="pros-cons">
            <div class="pros">
              <div class="list-title">
                ✅ Ưu điểm
              </div>
              <ul>
                <li
                  v-for="pro in currentStage?.pros"
                  :key="pro"
                >
                  {{ pro }}
                </li>
              </ul>
            </div>
            <div class="cons">
              <div class="list-title">
                ❌ Nhược điểm
              </div>
              <ul>
                <li
                  v-for="con in currentStage?.cons"
                  :key="con"
                >
                  {{ con }}
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="currentStage?.example"
            class="example-box"
          >
            <div class="example-label">
              🌰 Ví dụ:
            </div>
            <div class="example-content">
              {{ currentStage?.example }}
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý tưởng cốt lõi:</strong> Sự tiến hóa của cách lưu trữ dữ liệu, về bản chất là <span class="highlight">dùng hệ thống phức tạp hơn để giải quyết các vấn đề khi lượng dữ liệu tăng</span>. Từ "dùng được" đến "dễ dùng" rồi đến "chuyên nghiệp", mỗi bước đều nhằm tăng hiệu suất, đảm bảo an toàn, hỗ trợ quy mô lớn hơn.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStage = ref(null)

const stages = ref([
  {
    id: 1,
    icon: '📒',
    name: 'Sổ tay',
    simple: 'Ghi chép thủ công',
    capacity: '100 bản ghi',
    pros: ['Không cần kỹ năng, cầm bút là viết được', 'Đơn giản trực tiếp, xem lúc nào cũng được'],
    cons: ['Khó tra cứu, phải tính tay', 'Dễ mất, không thể sao lưu', 'Không thể thống kê, phân tích'],
    example: 'Bạn ghi vào sổ: 2024-01-15, Minh mua "Trăm năm cô đơn", 59k. Muốn thống kê tháng trước bán bao nhiêu, phải lật từng trang.'
  },
  {
    id: 2,
    icon: '📊',
    name: 'Excel',
    simple: 'Bảng tính điện tử',
    capacity: '1 triệu bản ghi',
    pros: ['Tự động tính tổng, sắp xếp, lọc', 'Giao diện trực quan, dễ làm quen', 'Hỗ trợ công thức đơn giản'],
    cons: ['Dung lượng hạn chế, nhiều dữ liệu là treo', 'Khó cộng tác, dễ xung đột', 'Dữ liệu trùng lặp, thông tin lặp lại nhiều'],
    example: 'Bạn dùng Excel quản lý đơn hàng, Minh mua 100 cuốn sách, địa chỉ và số điện thoại của bạn ấy được ghi lặp 100 lần. Khi đổi số điện thoại, phải sửa 100 dòng.'
  },
  {
    id: 3,
    icon: '🗄️',
    name: 'Database',
    simple: 'Hệ thống chuyên nghiệp',
    capacity: 'Hàng tỷ+',
    pros: ['Lưu lượng lớn, truy vấn mili giây', 'Cộng tác nhiều người, không xung đột', 'Dữ liệu an toàn, tự động sao lưu', 'Loại bỏ trùng lặp, quản lý thống nhất'],
    cons: ['Phải học ngôn ngữ SQL', 'Chi phí triển khai và bảo trì cao', 'Dự án nhỏ thì hơi "dùng dao mổ trâu để giết gà"'],
    example: 'Amazon dùng database để quản lý 1 tỷ đơn hàng. Địa chỉ của Minh chỉ lưu một lần, dù bạn ấy mua bao nhiêu sách, tra cứu mọi đơn của bạn ấy chỉ mất 0.01 giây.'
  }
])

const currentStage = computed(() => {
  return stages.value.find(s => s.id === activeStage.value)
})
</script>

<style scoped>
.data-evolution-demo {
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

.evolution-stages {
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow-x: auto;
}

.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 90px;
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.stage:hover {
  background: var(--vp-c-bg-soft);
}

.stage.active {
  background: var(--vp-c-brand-soft);
}

.stage-icon {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: var(--vp-c-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  transition: transform 0.2s ease;
}

.stage:hover .stage-icon {
  transform: scale(1.1);
}

.stage-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.stage-simple {
  font-size: 0.7rem;
  color: var(--vp-c-brand-1);
  margin-top: 0.2rem;
  font-weight: 500;
}

.stage-capacity {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  margin-top: 0.2rem;
  padding: 2px 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.arrow {
  position: absolute;
  right: -12px;
  top: 20px;
  color: var(--vp-c-text-3);
  font-size: 1rem;
}

.hint-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}

.stage-detail {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 0.75rem;
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
  flex: 1;
}

.detail-capacity {
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
  font-weight: 500;
  padding: 4px 8px;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .pros-cons {
    grid-template-columns: 1fr;
  }
}

.pros, .cons {
  padding: 0.75rem;
  border-radius: 6px;
}

.pros {
  background: rgba(34, 197, 94, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.cons {
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.list-title {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.pros ul, .cons ul {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.85rem;
  line-height: 1.6;
}

.pros li {
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.cons li {
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.example-box {
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

.example-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
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
  margin-top: 0.75rem;
  line-height: 1.5;
}

.info-box .icon { margin-right: 0.25rem; }

.info-box .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
