<template>
  <div class="best-practices-demo">
    <div class="demo-header">
      <span class="icon">✅</span>
      <span class="title">Best practice quản lý quyền</span>
      <span class="subtitle">Triển khai biện pháp bảo mật theo độ ưu tiên</span>
    </div>

    <div class="practices-list">
      <div
        v-for="(practice, index) in bestPractices"
        :key="index"
        class="practice-item"
        :class="{ active: expandedCard === index }"
        @click="toggleCard(index)"
      >
        <div class="item-header">
          <span class="item-icon">{{ practice.icon }}</span>
          <span class="item-title">{{ practice.title }}</span>
          <span
            class="item-priority"
            :class="practice.priority"
          >{{ practice.priorityText }}</span>
        </div>
        <div
          v-if="expandedCard === index"
          class="item-body"
        >
          <p class="item-desc">
            {{ practice.description }}
          </p>
          <div class="item-checks">
            <span
              v-for="(item, i) in practice.checklist.slice(0, 3)"
              :key="i"
              class="check-tag"
            >✓ {{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý tưởng cốt lõi:</strong> Triển khai dần theo độ ưu tiên, bắt đầu từ P0. Mỗi cải tiến đều tăng đáng kể độ an toàn của tài khoản.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const expandedCard = ref(0)

const bestPractices = [
  {
    icon: '👑',
    title: 'Bảo vệ tài khoản root',
    priority: 'p0',
    priorityText: 'P0',
    description: 'Tài khoản root là chủ sở hữu dịch vụ cloud, phải áp dụng mức bảo vệ cao nhất.',
    checklist: ['Bật MFA', 'Tạo user quản trị IAM', 'Xóa access key của root']
  },
  {
    icon: '👤',
    title: 'Tối thiểu hóa quyền user',
    priority: 'p0',
    priorityText: 'P0',
    description: 'Tuân thủ nguyên tắc least privilege, chỉ cấp cho user quyền tối thiểu cần để làm việc.',
    checklist: ['Tránh policy full quyền', 'Quản lý qua user group', 'Rà soát user định kỳ']
  },
  {
    icon: '🎭',
    title: 'Ưu tiên dùng IAM role',
    priority: 'p1',
    priorityText: 'P1',
    description: 'IAM role không có credential dài hạn, truy cập qua credential tạm thời, giảm rủi ro lộ.',
    checklist: ['EC2 dùng instance role', 'Lambda dùng execution role', 'Cross-account dùng AssumeRole']
  },
  {
    icon: '🔑',
    title: 'Quản lý access key an toàn',
    priority: 'p1',
    priorityText: 'P1',
    description: 'Nếu bắt buộc dùng AK/SK, cần áp dụng biện pháp quản lý bảo mật nghiêm ngặt.',
    checklist: ['Không hardcode credential', 'Dùng dịch vụ quản lý key', 'Xoay key định kỳ']
  },
  {
    icon: '📊',
    title: 'Giám sát & audit',
    priority: 'p2',
    priorityText: 'P2',
    description: 'Thiết lập cơ chế giám sát và audit toàn diện để phát hiện sự cố bảo mật kịp thời.',
    checklist: ['Bật CloudTrail', 'Cấu hình alert thao tác trọng yếu', 'Rà soát quyền định kỳ']
  }
]

function toggleCard(index) {
  expandedCard.value = expandedCard.value === index ? null : index
}
</script>

<style scoped>
.best-practices-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
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

.practices-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.practice-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.practice-item:hover { border-color: var(--vp-c-brand); }
.practice-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
}

.item-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem;
}

.item-icon { font-size: 1rem; }
.item-title { font-weight: 600; font-size: 0.85rem; flex: 1; }

.item-priority {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
}

.item-priority.p0 { background: var(--vp-c-danger); color: #fff; }
.item-priority.p1 { background: var(--vp-c-warning); color: #fff; }
.item-priority.p2 { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); }

.item-body {
  padding: 0 0.6rem 0.6rem;
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 0;
  padding-top: 0.5rem;
}

.item-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0 0 0.5rem;
  line-height: 1.4;
}

.item-checks {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.check-tag {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 3px;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
.info-box strong { color: var(--vp-c-text-1); }
</style>
