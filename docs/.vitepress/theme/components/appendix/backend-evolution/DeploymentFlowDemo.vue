<template>
  <div class="deployment-flow-demo">
    <div class="demo-header">
      <h4>🚀 Tiến hóa cách thức triển khai</h4>
      <p>Hành trình từ triển khai thủ công đến pipeline tự động</p>
    </div>

    <div class="flow-timeline">
      <div
        v-for="(step, idx) in steps"
        :key="idx"
        class="flow-step"
        :class="{ active: currentStep === idx }"
        @click="currentStep = idx"
      >
        <div
          v-if="idx > 0"
          class="step-connector"
        >
          <div class="connector-line" />
        </div>
        <div class="step-content">
          <div class="step-icon">
            {{ step.icon }}
          </div>
          <div class="step-era">
            {{ step.era }}
          </div>
          <div class="step-title">
            {{ step.title }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="currentStep !== null"
      class="step-detail"
    >
      <h5>{{ steps[currentStep].title }}</h5>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="label">Cách triển khai:</span>
          <span class="value">{{ steps[currentStep].deploy }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Thời gian:</span>
          <span class="value">{{ steps[currentStep].time }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Rủi ro:</span>
          <span class="value">{{ steps[currentStep].risk }}</span>
        </div>
      </div>
      <div class="tools-list">
        <span class="tools-label">Công cụ tiêu biểu:</span>
        <span
          v-for="tool in steps[currentStep].tools"
          :key="tool"
          class="tool-tag"
        >{{ tool }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(1)

const steps = [
  {
    icon: '👤',
    era: '1990s',
    title: 'Triển khai thủ công',
    deploy: 'Upload file qua FTP',
    time: '30 phút - 2 giờ',
    risk: 'Tỉ lệ lỗi con người cao',
    tools: ['FTP', 'SSH', 'SCP']
  },
  {
    icon: '📦',
    era: '2000s',
    title: 'Triển khai bằng script',
    deploy: 'Script tự động',
    time: '10-30 phút',
    risk: 'Chi phí bảo trì script',
    tools: ['Shell', 'Ansible', 'Puppet']
  },
  {
    icon: '🔄',
    era: '2010s',
    title: 'Pipeline CI/CD',
    deploy: 'Pipeline tự động',
    time: '5-15 phút',
    risk: 'Cấu hình pipeline phức tạp',
    tools: ['Jenkins', 'GitLab CI', 'GitHub Actions']
  },
  {
    icon: '🚀',
    era: '2020s+',
    title: 'GitOps',
    deploy: 'Triển khai khai báo',
    time: 'Vài giây',
    risk: 'Đường cong học tập dốc',
    tools: ['ArgoCD', 'Flux', 'Kubernetes']
  }
]
</script>

<style scoped>
.deployment-flow-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  margin-bottom: 1rem;
}

.demo-header h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.demo-header p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.flow-timeline {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.flow-step {
  flex: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.step-connector {
  position: absolute;
  left: -0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0.5rem;
  height: 2px;
}

.connector-line {
  width: 100%;
  height: 100%;
  background: var(--vp-c-divider);
}

.step-content {
  flex: 1;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
  text-align: center;
  transition: all 0.2s;
}

.flow-step:hover .step-content,
.flow-step.active .step-content {
  border-color: var(--vp-c-brand);
  background: rgba(102, 126, 234, 0.05);
}

.step-icon {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.step-era {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.125rem;
}

.step-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.step-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.step-detail h5 {
  margin: 0 0 0.75rem 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.value {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.tools-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tools-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.tool-tag {
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .flow-timeline {
    flex-wrap: wrap;
  }

  .flow-step {
    flex: 0 0 calc(50% - 0.25rem);
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
