<template>
  <div class="skill-shift-demo">
    <div class="demo-header">
      <span class="title">Sự thay đổi tầm quan trọng của các kỹ năng</span>
      <span class="subtitle">Trong kỷ nguyên AI, những kỹ năng nào trở nên quan trọng hơn?</span>
    </div>

    <div class="comparison-grid">
      <div class="column">
        <div class="column-title">Quan trọng hơn trong thời kỳ truyền thống</div>
        <div class="skill-list">
          <div v-for="skill in beforeSkills" :key="skill.name" class="skill-item">
            <span class="skill-name">{{ skill.name }}</span>
            <div class="skill-bar">
              <div class="bar-fill before" :style="{ width: skill.level + '%' }"></div>
            </div>
            <span class="skill-desc">{{ skill.desc }}</span>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="column-title">Quan trọng hơn trong kỷ nguyên AI</div>
        <div class="skill-list">
          <div v-for="skill in afterSkills" :key="skill.name" class="skill-item">
            <span class="skill-name">{{ skill.name }}</span>
            <div class="skill-bar">
              <div class="bar-fill after" :style="{ width: skill.level + '%' }"></div>
            </div>
            <span class="skill-desc">{{ skill.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Insight quan trọng:</strong> AI có thể giúp bạn viết code, nhưng khả năng phán đoán, tư duy kiến trúc, kiến thức lĩnh vực và khả năng debug là những thứ AI không thay thế được.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const beforeSkills = ref([
  { name: 'Ghi nhớ cú pháp', level: 90, desc: 'Thuộc API và chi tiết cú pháp' },
  { name: 'Tốc độ gõ code', level: 85, desc: 'Khả năng viết code nhanh bằng tay' },
  { name: 'Khả năng tra tài liệu', level: 80, desc: 'Tìm cách dùng API nhanh chóng' }
])

const afterSkills = ref([
  { name: 'Mô tả yêu cầu', level: 95, desc: 'Diễn đạt yêu cầu chính xác bằng ngôn ngữ tự nhiên' },
  { name: 'Review code', level: 90, desc: 'Đánh giá đúng/sai của code do AI sinh ra' },
  { name: 'Thiết kế kiến trúc', level: 85, desc: 'Thiết kế cấu trúc tổng thể của hệ thống' },
  { name: 'Định vị lỗi', level: 80, desc: 'Biết bắt đầu kiểm tra từ đâu khi có sự cố' }
])
</script>

<style scoped>
.skill-shift-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.column-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.skill-name {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.skill-bar {
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.bar-fill.before {
  background: var(--vp-c-text-3);
}

.bar-fill.after {
  background: var(--vp-c-brand-1);
}

.skill-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.info-box {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}
</style>
