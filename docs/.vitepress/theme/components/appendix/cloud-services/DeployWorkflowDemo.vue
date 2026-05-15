<template>
  <div class="deploy-workflow-demo">
    <div class="workflow-steps">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step-card"
        :class="{ active: currentStep === index, completed: currentStep > index }"
        @click="currentStep = index"
      >
        <div class="step-number">
          {{ index + 1 }}
        </div>
        <div class="step-info">
          <div class="step-name">
            {{ step.name }}
          </div>
          <div class="step-time">
            {{ step.time }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="currentStepData"
      class="step-detail"
    >
      <div class="detail-header">
        <span class="detail-step">Bước {{ currentStep + 1 }}</span>
        <span class="detail-name">{{ currentStepData.name }}</span>
      </div>
      <div class="detail-content">
        <div class="detail-desc">
          {{ currentStepData.description }}
        </div>
        <div class="detail-tasks">
          <div class="tasks-title">
            Thao tác cụ thể:
          </div>
          <ul>
            <li
              v-for="(task, i) in currentStepData.tasks"
              :key="i"
            >
              {{ task }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="workflow-actions">
      <button
        class="action-btn"
        :disabled="currentStep === 0"
        @click="prevStep"
      >
        Bước trước
      </button>
      <button
        class="action-btn primary"
        :disabled="currentStep >= steps.length - 1"
        @click="nextStep"
      >
        {{ currentStep >= steps.length - 1 ? 'Hoàn thành' : 'Tiếp theo' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)

const steps = [
  {
    name: 'Chuẩn bị code',
    time: '5 phút',
    description: 'Đóng gói code website thành format deployable',
    tasks: [
      'Sắp xếp file HTML/CSS/JS',
      'Nén ảnh và static asset',
      'Kiểm tra đường dẫn file có đúng không'
    ]
  },
  {
    name: 'Tạo bucket storage',
    time: '2 phút',
    description: 'Tạo storage space trong object storage service',
    tasks: [
      'Đăng nhập console cloud',
      'Vào Object Storage OSS/S3',
      'Click "Tạo Bucket"',
      'Đặt tên Bucket và chọn region'
    ]
  },
  {
    name: 'Upload file',
    time: '3 phút',
    description: 'Upload file website lên bucket storage',
    tasks: [
      'Vào trang quản lý Bucket',
      'Click "Upload file"',
      'Chọn file website local',
      'Đợi upload hoàn tất'
    ]
  },
  {
    name: 'Cấu hình CDN',
    time: '5 phút',
    description: 'Cấu hình CDN để tăng tốc truy cập',
    tasks: [
      'Vào CDN console',
      'Thêm domain tăng tốc',
      'Cấu hình origin là bucket storage',
      'Đợi CDN deploy xong'
    ]
  },
  {
    name: 'Bind domain',
    time: '10 phút',
    description: 'Bind custom domain với CDN',
    tasks: [
      'Thêm record DNS cho domain',
      'Cấu hình CNAME tới CDN',
      'Đăng ký SSL certificate',
      'Test truy cập HTTPS'
    ]
  }
]

const currentStepData = computed(() => steps[currentStep.value])

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>

<style scoped>
.deploy-workflow-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.workflow-steps {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.step-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 120px;
}

.step-card:hover {
  border-color: var(--vp-c-brand);
}

.step-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.step-card.completed {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}

.step-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-card.active .step-number {
  background: var(--vp-c-brand);
  color: white;
}

.step-card.completed .step-number {
  background: #22c55e;
  color: white;
}

.step-info {
  flex: 1;
}

.step-name {
  font-weight: 500;
  font-size: 0.85rem;
}

.step-time {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.step-detail {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-step {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.detail-name {
  font-weight: 600;
}

.detail-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.tasks-title {
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
}

.detail-tasks ul {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.detail-tasks li {
  margin-bottom: 0.2rem;
}

.workflow-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.primary {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
}

.action-btn.primary:hover:not(:disabled) {
  opacity: 0.9;
}
</style>
