<!--
  IncidentTimelineDemo.vue
  Demo timeline phản ứng sự cố: hiển thị toàn bộ luồng phản ứng từ phát hiện tới postmortem
-->
<template>
  <div class="incident-timeline-demo">
    <div class="header">
      <div class="title">Timeline phản ứng sự cố (Incident Timeline)</div>
      <div class="subtitle">Click vào từng giai đoạn để xem các hành động then chốt</div>
    </div>

    <div class="timeline">
      <div class="timeline-track">
        <div
          class="timeline-progress"
          :style="{ width: progressWidth }"
        ></div>
      </div>
      <div class="timeline-nodes">
        <div
          v-for="(phase, index) in phases"
          :key="phase.id"
          :class="[
            'timeline-node',
            {
              active: activePhase === phase.id,
              completed: completedPhases.includes(phase.id)
            }
          ]"
          @click="selectPhase(phase.id)"
        >
          <div class="node-dot">
            <span v-if="completedPhases.includes(phase.id)">&#10003;</span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div class="node-label">{{ phase.name }}</div>
          <div class="node-time">{{ phase.timeHint }}</div>
        </div>
      </div>
    </div>

    <div v-if="currentPhase" class="phase-detail">
      <div class="phase-header" :style="{ background: currentPhase.color }">
        <span class="phase-icon">{{ currentPhase.icon }}</span>
        <span class="phase-name">{{ currentPhase.name }}</span>
        <span class="phase-duration">{{ currentPhase.duration }}</span>
      </div>
      <div class="phase-body">
        <div class="phase-desc">{{ currentPhase.description }}</div>
        <div class="phase-actions">
          <div class="actions-title">Hành động then chốt:</div>
          <div
            v-for="(action, i) in currentPhase.actions"
            :key="i"
            class="action-item"
          >
            <span class="action-bullet">{{ i + 1 }}</span>
            <span>{{ action }}</span>
          </div>
        </div>
        <div class="phase-roles">
          <span class="roles-label">Vai trò tham gia:</span>
          <span
            v-for="role in currentPhase.roles"
            :key="role"
            class="role-tag"
          >
            {{ role }}
          </span>
        </div>
      </div>
    </div>

    <div class="auto-controls">
      <button class="play-btn" @click="autoPlay" :disabled="isPlaying">
        {{ isPlaying ? 'Đang chạy...' : 'Tự động demo toàn bộ luồng' }}
      </button>
      <button class="reset-btn" @click="resetAll">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activePhase = ref(null)
const completedPhases = ref([])
const isPlaying = ref(false)

const phases = [
  {
    id: 'detect',
    name: 'Phát hiện',
    timeHint: 'T+0',
    icon: '🔍',
    color: '#ef4444',
    duration: 'Mục tiêu < 5 phút',
    description:
      'Phát hiện hệ thống bất thường qua cảnh báo monitor, phản hồi của user hoặc tự động hoá. Càng phát hiện sớm, thiệt hại càng nhỏ.',
    actions: [
      'Hệ thống monitor trigger cảnh báo (CPU, latency, error rate, v.v.)',
      'Người trực nhận thông báo và xác nhận',
      'Đánh giá sơ bộ phạm vi ảnh hưởng',
      'Phát thông báo đầu tiên trên channel sự cố'
    ],
    roles: ['Engineer trực', 'Hệ thống monitor']
  },
  {
    id: 'triage',
    name: 'Phân cấp',
    timeHint: 'T+5min',
    icon: '📋',
    color: '#f59e0b',
    duration: 'Mục tiêu < 10 phút',
    description:
      'Đánh giá nhanh mức nghiêm trọng, xác định ưu tiên (P0-P4), quyết định quy mô phản ứng và đường leo thang.',
    actions: [
      'Đánh giá phạm vi ảnh hưởng user (bao nhiêu user bị ảnh hưởng?)',
      'Xác định ảnh hưởng nghiệp vụ (tính năng cốt lõi có chết không?)',
      'Gán mức sự cố (P0/P1/P2/P3/P4)',
      'Theo mức kích hoạt luồng phản ứng tương ứng'
    ],
    roles: ['Engineer trực', 'Incident Commander']
  },
  {
    id: 'mitigate',
    name: 'Cầm máu',
    timeHint: 'T+15min',
    icon: '🚑',
    color: '#3b82f6',
    duration: 'Mục tiêu < 1 giờ',
    description:
      'Thực hiện biện pháp khẩn để phục hồi dịch vụ, ưu tiên "cầm máu" thay vì chữa tận gốc. Rollback, degrade, rate limit là các thủ pháp phổ biến.',
    actions: [
      'Rollback thay đổi gần đây (code, config, hạ tầng)',
      'Kích hoạt phương án degrade hoặc hệ thống dự phòng',
      'Áp rate limit để bảo vệ chuỗi xử lý cốt lõi',
      'Liên tục giám sát tiến độ phục hồi và báo tình trạng'
    ],
    roles: ['Incident Commander', 'Engineer vận hành', 'Engineer phát triển']
  },
  {
    id: 'resolve',
    name: 'Giải quyết',
    timeHint: 'T+1h',
    icon: '🔧',
    color: '#22c55e',
    duration: 'Tuỳ độ phức tạp',
    description:
      'Sau khi dịch vụ phục hồi, định vị nguyên nhân gốc và thực hiện fix vĩnh viễn, đảm bảo lỗi tương tự không tái diễn.',
    actions: [
      'Phân tích sâu log, dữ liệu monitor để định vị nguyên nhân gốc',
      'Viết và review code fix',
      'Kiểm thử fix ở môi trường staging',
      'Canary release bản fix, xác nhận vấn đề đã giải quyết triệt để'
    ],
    roles: ['Engineer phát triển', 'Kiến trúc sư', 'QA engineer']
  },
  {
    id: 'postmortem',
    name: 'Postmortem',
    timeHint: 'T+48h',
    icon: '📝',
    color: '#8b5cf6',
    duration: 'Trong 48 giờ sau sự cố',
    description:
      'Tổ chức họp postmortem blameless, phân tích nguyên nhân gốc, rút kinh nghiệm, đặt biện pháp cải tiến để tránh lặp lại.',
    actions: [
      'Viết báo cáo postmortem (timeline, ảnh hưởng, nguyên nhân gốc)',
      'Họp postmortem, mọi người liên quan cùng thảo luận',
      'Dùng "5 Whys" để đào sâu nguyên nhân gốc',
      'Đặt và theo dõi action items cải tiến'
    ],
    roles: ['Incident Commander', 'Mọi người liên quan', 'Tầng quản lý']
  }
]

const currentPhase = computed(() => {
  if (!activePhase.value) return null
  return phases.find((p) => p.id === activePhase.value)
})

const progressWidth = computed(() => {
  if (completedPhases.value.length === 0 && !activePhase.value) return '0%'
  const activeIndex = phases.findIndex((p) => p.id === activePhase.value)
  if (activeIndex === -1) {
    const lastCompleted = completedPhases.value.length
    return `${(lastCompleted / phases.length) * 100}%`
  }
  return `${((activeIndex + 0.5) / phases.length) * 100}%`
})

const selectPhase = (id) => {
  activePhase.value = id
}

const autoPlay = async () => {
  isPlaying.value = true
  completedPhases.value = []
  activePhase.value = null

  for (let i = 0; i < phases.length; i++) {
    activePhase.value = phases[i].id
    await new Promise((r) => setTimeout(r, 1800))
    completedPhases.value.push(phases[i].id)
  }
  isPlaying.value = false
}

const resetAll = () => {
  activePhase.value = null
  completedPhases.value = []
  isPlaying.value = false
}
</script>

<style scoped>
.incident-timeline-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.timeline {
  position: relative;
  margin-bottom: 1.5rem;
}

.timeline-track {
  position: absolute;
  top: 16px;
  left: 5%;
  right: 5%;
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
}

.timeline-progress {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 2px;
  transition: width 0.5s ease;
}

.timeline-nodes {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.timeline-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  flex: 1;
  transition: all 0.2s;
}

.node-dot {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 3px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  transition: all 0.3s;
  z-index: 1;
}

.timeline-node.active .node-dot {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  transform: scale(1.2);
  box-shadow: 0 0 0 4px rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.2);
}

.timeline-node.completed .node-dot {
  border-color: #22c55e;
  background: #22c55e;
  color: #fff;
}

.node-label {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}

.node-time {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 0.15rem;
}

.phase-detail {
  background: var(--vp-c-bg);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.phase-header {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #fff;
}

.phase-icon {
  font-size: 1.3rem;
}

.phase-name {
  font-weight: 700;
  font-size: 1rem;
  flex: 1;
}

.phase-duration {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
}

.phase-body {
  padding: 1rem;
}

.phase-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.actions-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.action-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-2);
}

.action-bullet {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

.phase-roles {
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.roles-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.role-tag {
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.auto-controls {
  display: flex;
  gap: 0.5rem;
}

.play-btn,
.reset-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}

.play-btn {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.play-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-btn {
  background: var(--vp-c-bg);
}

.reset-btn:hover {
  border-color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .timeline-nodes {
    flex-direction: column;
    gap: 0.75rem;
  }

  .timeline-track {
    display: none;
  }

  .timeline-node {
    flex-direction: row;
    gap: 0.75rem;
  }

  .node-label {
    margin-top: 0;
  }

  .node-time {
    margin-top: 0;
    margin-left: auto;
  }
}
</style>
