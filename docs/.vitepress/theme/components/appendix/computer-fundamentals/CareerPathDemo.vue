<template>
  <div class="career-path-demo">
    <div class="demo-header">
      <span class="title">Lộ trình phát triển kỹ sư</span>
      <span class="subtitle">Hành trình kỹ năng từ nhập môn đến thành thạo</span>
    </div>

    <div class="path-container">
      <div
        v-for="stage in stages"
        :key="stage.name"
        class="stage-card"
      >
        <div class="stage-header">
          <span class="stage-icon">{{ stage.icon }}</span>
          <span class="stage-name">{{ stage.name }}</span>
          <span class="stage-time">{{ stage.time }}</span>
        </div>
        <div class="stage-content">
          <div class="stage-desc">{{ stage.desc }}</div>
          <div class="stage-skills">
            <span class="skill-label">Kỹ năng cốt lõi:</span>
            <div class="skill-tags">
              <span v-for="skill in stage.skills" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>
          <div class="stage-output">
            <span class="output-label">Kết quả điển hình:</span>
            <span class="output-text">{{ stage.output }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Điểm then chốt khi phát triển:</strong> 1-2 năm đầu xây nền tảng, hình thành khả năng tự hoàn thành nhiệm vụ; 2-3 năm chọn hướng đi và xây dựng chiều sâu; 3-5 năm mở rộng ngang, rèn tư duy kiến trúc; 5 năm+ ra quyết định kỹ thuật và tạo ảnh hưởng đến đội ngũ.
    </div>
  </div>
</template>

<script setup>
const stages = [
  {
    name: 'Giai đoạn nhập môn',
    icon: '🌱',
    time: '0-1 năm',
    desc: 'Học cú pháp và công cụ cơ bản, hoàn thành được nhiệm vụ đơn giản',
    skills: ['Nền tảng một ngôn ngữ', 'Dùng Git', 'Kỹ năng debug', 'Đọc tài liệu'],
    output: 'Tự làm được tính năng nhỏ, sửa Bug đơn giản'
  },
  {
    name: 'Giai đoạn phát triển',
    icon: '🌿',
    time: '1-2 năm',
    desc: 'Thông thạo framework phổ biến và best practice, độc lập phụ trách module',
    skills: ['Thành thạo framework', 'Chuẩn mã nguồn', 'Unit test', 'Thiết kế API'],
    output: 'Tự phụ trách một module tính năng, chất lượng code ổn định'
  },
  {
    name: 'Giai đoạn nâng cao',
    icon: '🌳',
    time: '2-3 năm',
    desc: 'Đi sâu vào một lĩnh vực, bắt đầu có khả năng lựa chọn công nghệ',
    skills: ['Chuyên sâu lĩnh vực', 'Tối ưu hiệu năng', 'Thiết kế kiến trúc', 'Lựa chọn công nghệ'],
    output: 'Chủ trì thiết kế giải pháp kỹ thuật, giải quyết vấn đề phức tạp'
  },
  {
    name: 'Giai đoạn trưởng thành',
    icon: '🌲',
    time: '3-5 năm',
    desc: 'Khả năng fullstack hoặc chuyên gia lĩnh vực, dẫn dắt nhóm nhỏ',
    skills: ['Năng lực fullstack', 'Hợp tác nhóm', 'Chia sẻ kỹ thuật', 'Quản lý dự án'],
    output: 'Phụ trách hệ thống lõi, hướng dẫn người mới'
  },
  {
    name: 'Giai đoạn chuyên gia',
    icon: '🏔️',
    time: '5 năm+',
    desc: 'Người ra quyết định kỹ thuật, có ảnh hưởng trong ngành',
    skills: ['Chiến lược kỹ thuật', 'Xây dựng đội ngũ', 'Hiểu biết ngành', 'Dẫn dắt đổi mới'],
    output: 'Quyết định hướng đi kỹ thuật, đào tạo đội ngũ kỹ thuật'
  }
]
</script>

<style scoped>
.career-path-demo {
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

.path-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stage-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stage-icon {
  font-size: 1.1rem;
}

.stage-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stage-time {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  margin-left: auto;
}

.stage-content {
  padding-left: 1.6rem;
}

.stage-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.stage-skills {
  margin-bottom: 0.35rem;
}

.skill-label,
.output-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-right: 0.35rem;
}

.skill-tags {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.2rem;
}

.skill-tag {
  font-size: 0.68rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
}

.stage-output {
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
}

.output-text {
  color: var(--vp-c-text-1);
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
  .stage-content {
    padding-left: 0;
  }
}
</style>
