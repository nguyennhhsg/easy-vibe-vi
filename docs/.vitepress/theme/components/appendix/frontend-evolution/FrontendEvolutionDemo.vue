<!--
  FrontendEvolutionDemo.vue - Tổng quan tiến hoá frontend
  Trình bày theo dòng thời gian sự phát triển từ trang tĩnh tới các framework hiện đại
-->
<template>
  <div class="evolution-timeline">
    <div class="demo-header">
      <span class="icon">🚀</span>
      <span class="title">Dòng thời gian tiến hoá frontend</span>
      <span class="subtitle">20 năm chuyển mình từ "dán poster" đến "lắp Lego"</span>
    </div>

    <div class="demo-content">
      <!-- Dòng thời gian -->
      <div class="timeline-container">
        <div
          v-for="(era, index) in eras"
          :key="era.id"
          class="era-item"
          :class="{ active: activeEra === era.id }"
          @click="activeEra = activeEra === era.id ? null : era.id"
        >
          <div class="era-marker">
            <div class="era-dot">
              {{ era.emoji }}
            </div>
            <div
              v-if="index < eras.length - 1"
              class="era-line"
            />
          </div>

          <div class="era-content">
            <div class="era-header">
              <span class="era-year">{{ era.year }}</span>
              <span class="era-name">{{ era.name }}</span>
            </div>

            <div class="era-brief">
              {{ era.brief }}
            </div>

            <Transition name="expand">
              <div
                v-if="activeEra === era.id"
                class="era-detail"
              >
                <div class="detail-section">
                  <div class="section-title">
                    🔑 Công nghệ then chốt
                  </div>
                  <div class="tech-tags">
                    <span
                      v-for="tech in era.technologies.slice(0, 5)"
                      :key="tech"
                      class="tech-tag"
                    >{{ tech }}</span>
                  </div>
                </div>

                <div
                  v-if="era.metaphor"
                  class="detail-section"
                >
                  <div class="section-title">
                    💡 Ẩn dụ đời thường
                  </div>
                  <div class="metaphor-box">
                    {{ era.metaphor }}
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Tư tưởng cốt lõi:</strong> Sự tiến hoá của công nghệ frontend về bản chất là để giải hai bài toán: nâng hiệu suất phát triển (từ thủ công sang tự động) và đỡ được các ứng dụng phức tạp hơn (từ trang đơn giản tới ứng dụng cỡ desktop).
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeEra = ref(null)

const eras = [
  {
    id: 1,
    year: '2000s',
    name: 'Thời đại trang tĩnh',
    emoji: '🖼️',
    brief: 'Trang web giống tấm poster, chỉ xem chứ không tương tác',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Cắt ảnh', 'jQuery'],
    pros: ['Đơn giản, trực diện', 'Viết xong chạy luôn', 'Học vào nhanh'],
    cons: ['Tải chậm (nhiều request)', 'Khó bảo trì', 'Không thể cập nhật động'],
    metaphor: 'Giống như dán poster: bạn vẽ xong rồi dán lên tường là xong. Nội dung cố định, người xem chỉ nhìn, không tương tác được.'
  },
  {
    id: 2,
    year: 'Đầu 2010s',
    name: 'Thời đại responsive layout',
    emoji: '📱',
    brief: 'Một bộ code thích nghi cả điện thoại và máy tính',
    technologies: ['Media Query', 'Responsive Design', 'Bootstrap', 'Flexbox'],
    pros: ['Đa thiết bị', 'Chi phí bảo trì thấp', 'Trải nghiệm tốt'],
    cons: ['Thiết kế phức tạp', 'Debug phiền', 'Chi phí performance cao'],
    metaphor: 'Giống khung ảnh ma thuật: ảnh tự điều chỉnh cách trưng bày theo kích thước phòng. Phòng to trải rộng, phòng nhỏ thu lại.'
  },
  {
    id: 3,
    year: 'Giữa 2010s',
    name: 'Thời đại jQuery',
    emoji: '🔧',
    brief: 'Đơn giản hoá thao tác DOM, nhưng vẫn phải làm thủ công',
    technologies: ['jQuery', 'Thao tác DOM', 'AJAX', 'Hiệu ứng động'],
    pros: ['Dễ học', 'Tương thích tốt', 'Hệ sinh thái phong phú'],
    cons: ['Code đông là rối', 'Dễ phát sinh bug', 'Khó quản lý state'],
    metaphor: 'Giống thi công thủ công: bạn phải tự bảo thợ làm từng bước. Càng nhiều thợ, lệnh càng rối, càng dễ sai.'
  },
  {
    id: 4,
    year: 'Cuối 2010s',
    name: 'Thời đại framework hiện đại',
    emoji: '⚛️',
    brief: 'Data-driven, phát triển theo component',
    technologies: ['Vue.js', 'React', 'Angular', 'Component-based', 'State management'],
    pros: ['Code dễ bảo trì', 'Hiệu suất dev cao', 'Hợp ứng dụng phức tạp'],
    cons: ['Học hơi nặng', 'Build phức tạp', 'Hơi cồng kềnh với dự án nhỏ'],
    metaphor: 'Giống lắp Lego: bạn thiết kế trước hình dáng ngôi nhà, rồi các viên Lego sẽ tự được ráp theo bản vẽ.'
  },
  {
    id: 5,
    year: '2020s',
    name: 'Thời đại engineering',
    emoji: '🏭',
    brief: 'Tự động hoá, chuẩn hoá, mở rộng quy mô',
    technologies: ['Webpack', 'Vite', 'TypeScript', 'CI/CD', 'Testing'],
    pros: ['Hợp tác nhóm thuận lợi', 'Chất lượng code cao', 'Tối ưu performance tốt'],
    cons: ['Cấu hình phức tạp', 'Học khá dốc', 'Chi phí bảo trì cao'],
    metaphor: 'Giống một nhà máy hiện đại: từ nguyên liệu đến thành phẩm, toàn bộ dây chuyền sản xuất tự động, chuẩn hoá, kiểm soát được.'
  }
]
</script>

<style scoped>
.evolution-timeline {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.demo-header .icon {
  font-size: 1rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 0.9rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  margin-left: 0.25rem;
}

.demo-content {
  margin-bottom: 0.5rem;
}

/* Khung timeline */
.timeline-container {
  position: relative;
}

.era-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.era-item:hover {
  transform: translateX(4px);
}

.era-item.active {
  transform: translateX(8px);
}

/* Điểm đánh dấu */
.era-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.era-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: all 0.3s ease;
}

.era-item:hover .era-dot {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.era-line {
  width: 2px;
  flex: 1;
  background: var(--vp-c-divider);
  margin-top: 4px;
  min-height: 20px;
}

/* Khu nội dung */
.era-content {
  flex: 1;
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.era-item:hover .era-content {
  border-color: var(--vp-c-brand);
}

.era-item.active .era-content {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.era-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.era-year {
  padding: 1px 6px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: bold;
}

.era-name {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.era-brief {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

/* Mở rộng chi tiết */
.era-detail {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--vp-c-divider);
}

.detail-section {
  margin-bottom: 0.4rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 0.7rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tech-tag {
  padding: 1px 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 500;
}

.metaphor-box {
  background: var(--vp-c-bg-alt);
  border-left: 2px solid var(--vp-c-brand);
  padding: 0.4rem;
  border-radius: 4px;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* Animation */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  
  opacity: 1;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
