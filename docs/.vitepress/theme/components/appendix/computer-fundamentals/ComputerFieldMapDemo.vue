<template>
  <div class="field-map-demo">
    <div class="demo-header">
      <span class="title">Bản đồ tổng quan các lĩnh vực máy tính</span>
      <span class="subtitle">Bấm để xem chi tiết</span>
    </div>

    <div class="field-grid">
      <div
        v-for="field in fields"
        :key="field.name"
        class="field-card"
      >
        <div class="field-name">{{ field.name }}</div>
        <div class="field-desc">{{ field.desc }}</div>
        <div class="field-techs">
          <span v-for="tech in field.techs" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Lời khuyên:</strong> Đừng cố học tất cả các hướng cùng lúc. Hãy chọn một hướng để đi sâu, xây "căn cứ" trước rồi mới mở rộng theo chiều ngang.
    </div>
  </div>
</template>

<script setup>
const fields = [
  {
    name: 'Frontend',
    desc: 'Mọi thứ người dùng nhìn thấy và tương tác',
    techs: ['HTML/CSS', 'JavaScript', 'React/Vue']
  },
  {
    name: 'Backend',
    desc: 'Logic nghiệp vụ và xử lý dữ liệu phía server',
    techs: ['Node.js', 'Go', 'Java', 'Python']
  },
  {
    name: 'Mobile',
    desc: 'Trải nghiệm ứng dụng trên điện thoại',
    techs: ['Swift', 'Kotlin', 'Flutter']
  },
  {
    name: 'AI/Thuật toán',
    desc: 'Làm cho hệ thống trở nên "thông minh"',
    techs: ['PyTorch', 'TensorFlow', 'Machine Learning']
  },
  {
    name: 'DevOps',
    desc: 'Đảm bảo hệ thống chạy ổn định',
    techs: ['Docker', 'K8s', 'CI/CD']
  },
  {
    name: 'Data Engineering',
    desc: 'Thu thập, lưu trữ và phân tích dữ liệu',
    techs: ['SQL', 'Spark', 'Data Warehouse']
  }
]
</script>

<style scoped>
.field-map-demo {
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

.field-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.field-card {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.field-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.field-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
}

.field-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tech-tag {
  font-size: 0.68rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-text-2);
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
  .field-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
