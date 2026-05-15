<!--
  AlertEscalationDemo.vue
  Demo luồng leo thang cảnh báo: cho thấy cách cảnh báo leo thang theo mức nghiêm trọng và thời gian
-->
<template>
  <div class="alert-escalation-demo">
    <div class="header">
      <div class="title">Luồng leo thang cảnh báo (Alert Escalation)</div>
      <div class="subtitle">Chọn một kịch bản, quan sát cảnh báo leo thang từng cấp</div>
    </div>

    <div class="scenario-select">
      <button
        v-for="s in scenarios"
        :key="s.id"
        :class="['scenario-btn', { active: activeScenario === s.id }]"
        @click="startScenario(s.id)"
      >
        {{ s.name }}
      </button>
    </div>

    <div class="escalation-flow">
      <div
        v-for="(step, index) in escalationSteps"
        :key="step.id"
        :class="[
          'esc-step',
          {
            active: currentStep === index,
            completed: currentStep > index,
            pending: currentStep < index
          }
        ]"
      >
        <div class="esc-left">
          <div class="esc-icon" :style="{ background: step.color }">
            {{ step.icon }}
          </div>
          <div v-if="index < escalationSteps.length - 1" class="esc-line">
            <div
              class="esc-line-fill"
              :class="{ filled: currentStep > index }"
            ></div>
          </div>
        </div>
        <div class="esc-content">
          <div class="esc-header">
            <span class="esc-title">{{ step.title }}</span>
            <span class="esc-time">{{ step.time }}</span>
          </div>
          <div class="esc-desc">{{ step.desc }}</div>
          <div v-if="step.action && currentStep >= index" class="esc-action">
            {{ step.action }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeScenario" class="timer-bar">
      <div class="timer-label">
        Tiến độ leo thang: cấp {{ currentStep + 1 }} / {{ escalationSteps.length }}
      </div>
      <div class="timer-track">
        <div
          class="timer-fill"
          :style="{
            width: ((currentStep + 1) / escalationSteps.length) * 100 + '%'
          }"
        ></div>
      </div>
      <div class="timer-controls">
        <button
          class="ctrl-btn"
          @click="prevStep"
          :disabled="currentStep <= 0"
        >
          Cấp trước
        </button>
        <button
          class="ctrl-btn"
          @click="nextStep"
          :disabled="currentStep >= escalationSteps.length - 1"
        >
          Leo lên cấp tiếp theo
        </button>
      </div>
    </div>

    <div class="rule-box">
      <div class="rule-title">Quy tắc leo thang</div>
      <div class="rules">
        <div class="rule-item">
          <span class="rule-dot" style="background: #22c55e"></span>
          <span>Cảnh báo P3/P4: chỉ báo engineer trực, không cần leo thang</span>
        </div>
        <div class="rule-item">
          <span class="rule-dot" style="background: #eab308"></span>
          <span>Cảnh báo P2: 15 phút không phản ứng thì leo lên tới team lead</span>
        </div>
        <div class="rule-item">
          <span class="rule-dot" style="background: #f59e0b"></span>
          <span>Cảnh báo P1: 5 phút không phản ứng thì leo thang, 30 phút chưa giải quyết thì leo lên director</span>
        </div>
        <div class="rule-item">
          <span class="rule-dot" style="background: #ef4444"></span>
          <span>Cảnh báo P0: báo ngay toàn tuyến, 15 phút chưa giảm thì leo lên VP/CTO</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeScenario = ref(null)
const currentStep = ref(0)

const scenarios = [
  { id: 'p0', name: 'P0 Database chết' },
  { id: 'p1', name: 'P1 API timeout' },
  { id: 'p2', name: 'P2 Hiệu năng giảm' }
]

const scenarioSteps = {
  p0: [
    {
      id: 1,
      icon: '📡',
      color: '#3b82f6',
      title: 'Hệ thống monitor phát hiện',
      time: 'T+0s',
      desc: 'Prometheus phát hiện connection pool database cạn, mọi query timeout',
      action: 'Tự động trigger cảnh báo cấp P0'
    },
    {
      id: 2,
      icon: '📱',
      color: '#f59e0b',
      title: 'Engineer trực',
      time: 'T+30s',
      desc: 'Gọi điện + SMS + chat đồng thời báo DBA trực',
      action: 'Engineer trực xác nhận cảnh báo, bắt đầu điều tra'
    },
    {
      id: 3,
      icon: '👥',
      color: '#ef4444',
      title: 'Team lead',
      time: 'T+5min',
      desc: 'Tự động leo lên team lead database và team lead backend',
      action: 'Team lead triệu tập họp khẩn cấp'
    },
    {
      id: 4,
      icon: '🎖️',
      color: '#8b5cf6',
      title: 'Technical director',
      time: 'T+15min',
      desc: 'Vấn đề chưa giảm, tự động leo lên director kỹ thuật',
      action: 'Director điều phối nguồn lực liên team, khởi động phương án khẩn'
    },
    {
      id: 5,
      icon: '🏢',
      color: '#1e293b',
      title: 'VP / CTO',
      time: 'T+30min',
      desc: 'Sự cố lớn leo lên tầng quản lý cấp cao, chuẩn bị truyền thông ra ngoài',
      action: 'CTO quyết định có bật disaster recovery hay không'
    }
  ],
  p1: [
    {
      id: 1,
      icon: '📡',
      color: '#3b82f6',
      title: 'Hệ thống monitor phát hiện',
      time: 'T+0s',
      desc: 'API gateway phát hiện latency P99 vượt ngưỡng 3 giây',
      action: 'Trigger cảnh báo cấp P1'
    },
    {
      id: 2,
      icon: '📱',
      color: '#f59e0b',
      title: 'Engineer trực',
      time: 'T+1min',
      desc: 'Chat + SMS báo engineer backend trực',
      action: 'Engineer xem dashboard monitor và log'
    },
    {
      id: 3,
      icon: '👥',
      color: '#ef4444',
      title: 'Team lead',
      time: 'T+15min',
      desc: '15 phút chưa giải quyết, tự động leo lên team lead',
      action: 'Team lead đánh giá có cần thêm người hỗ trợ không'
    },
    {
      id: 4,
      icon: '🎖️',
      color: '#8b5cf6',
      title: 'Technical director',
      time: 'T+30min',
      desc: '30 phút chưa giảm, leo lên director kỹ thuật',
      action: 'Director quyết định có nâng lên P0 không'
    }
  ],
  p2: [
    {
      id: 1,
      icon: '📡',
      color: '#3b82f6',
      title: 'Hệ thống monitor phát hiện',
      time: 'T+0s',
      desc: 'Phát hiện thời gian load trang tăng từ 1.2s lên 2.8s',
      action: 'Trigger cảnh báo cấp P2'
    },
    {
      id: 2,
      icon: '📱',
      color: '#eab308',
      title: 'Engineer trực',
      time: 'T+5min',
      desc: 'Chat báo engineer frontend trực',
      action: 'Engineer xác nhận vấn đề, ghi ticket'
    },
    {
      id: 3,
      icon: '👥',
      color: '#f59e0b',
      title: 'Team lead',
      time: 'T+30min',
      desc: '30 phút chưa phản ứng thì leo lên team lead',
      action: 'Team lead sắp lịch fix trong ngày'
    }
  ]
}

const escalationSteps = computed(() => {
  if (!activeScenario.value) return scenarioSteps.p0
  return scenarioSteps[activeScenario.value]
})

const startScenario = (id) => {
  activeScenario.value = id
  currentStep.value = 0
}

const nextStep = () => {
  if (currentStep.value < escalationSteps.value.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>

<style scoped>
.alert-escalation-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.header { margin-bottom: 1.5rem; }
.title { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.scenario-select {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.scenario-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.scenario-btn:hover { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.scenario-btn.active { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }

.escalation-flow {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.esc-step {
  display: flex;
  gap: 1rem;
  opacity: 0.4;
  transition: all 0.3s;
}

.esc-step.active,
.esc-step.completed { opacity: 1; }

.esc-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.esc-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #fff;
  z-index: 1;
}

.esc-line {
  width: 3px;
  flex: 1;
  min-height: 20px;
  background: var(--vp-c-divider);
  margin: 4px 0;
}

.esc-line-fill {
  width: 100%;
  height: 0;
  background: var(--vp-c-brand);
  transition: height 0.5s;
}

.esc-line-fill.filled { height: 100%; }

.esc-content {
  padding-bottom: 1rem;
  flex: 1;
}

.esc-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.esc-title { font-weight: 600; font-size: 0.95rem; }
.esc-time { font-size: 0.8rem; color: var(--vp-c-text-3); font-family: monospace; }
.esc-desc { font-size: 0.85rem; color: var(--vp-c-text-2); margin-bottom: 0.3rem; }

.esc-action {
  font-size: 0.85rem;
  padding: 0.4rem 0.6rem;
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.08);
  border-radius: 4px;
  border-left: 3px solid var(--vp-c-brand);
  color: var(--vp-c-text-1);
}

.timer-bar {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.timer-label { font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; }

.timer-track {
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.timer-fill {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 3px;
  transition: width 0.3s;
}

.timer-controls { display: flex; gap: 0.5rem; }

.ctrl-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.ctrl-btn:hover:not(:disabled) { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.ctrl-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.rule-box {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.rule-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.75rem; }
.rules { display: flex; flex-direction: column; gap: 0.5rem; }

.rule-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.rule-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .scenario-select { flex-direction: column; }
  .scenario-btn { width: 100%; }
}
</style>
