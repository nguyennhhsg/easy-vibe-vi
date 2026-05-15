<template>
  <div class="api-call-demo">
    <div class="flow-steps">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="step"
        :class="{ active: currentStep >= index, completed: currentStep > index }"
      >
        <div class="step-num">
          {{ index + 1 }}
        </div>
        <div class="step-content">
          <div class="step-title">
            {{ step.title }}
          </div>
          <div class="step-desc">
            {{ step.desc }}
          </div>
        </div>
      </div>
    </div>
    
    <div class="action-panel">
      <button 
        class="action-btn" 
        :disabled="currentStep >= steps.length"
        @click="nextStep"
      >
        {{ currentStep >= steps.length ? 'Đã hoàn thành' : 'Tiếp theo' }}
      </button>
      <button
        class="action-btn outline"
        @click="reset"
      >
        Đặt lại
      </button>
    </div>
    
    <div
      v-if="currentStep > 0"
      class="code-preview"
    >
      <div class="code-title">
        {{ steps[currentStep - 1].codeTitle }}
      </div>
      <pre><code>{{ steps[currentStep - 1].code }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(0)

const steps = [
  {
    title: 'Lấy AccessKey',
    desc: 'Tạo AccessKey ID và Secret trong console',
    codeTitle: 'Cấu hình credentials',
    code: `// Thiết lập biến môi trường
export ALIYUN_ACCESS_KEY_ID=your_key_id
export ALIYUN_ACCESS_KEY_SECRET=your_secret`
  },
  {
    title: 'Cài đặt SDK',
    desc: 'Cài SDK cloud service cho ngôn ngữ tương ứng',
    codeTitle: 'Cài đặt dependencies',
    code: `# Python
pip install alibabacloud-ecs20140526

# Node.js
npm install @alicloud/ecs20140526`
  },
  {
    title: 'Viết code gọi API',
    desc: 'Dùng SDK để gọi cloud service API',
    codeTitle: 'Ví dụ gọi API',
    code: `from alibabacloud_ecs20140526 import models as ecs_models

# Tạo client
client = create_client()

# Gọi API
response = client.describe_instances(
  ecs_models.DescribeInstancesRequest()
)

print(response.body)`
  },
  {
    title: 'Xử lý response',
    desc: 'Parse dữ liệu API trả về',
    codeTitle: 'Xử lý kết quả',
    code: `// Parse response
instances = response.body.instances.instance

for inst in instances:
    print(f"ID: {inst.instance_id}")
    print(f"Trạng thái: {inst.status}")
    print(f"IP: {inst.public_ip_address}")`
  }
]

function nextStep() {
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
}

function reset() {
  currentStep.value = 0
}
</script>

<style scoped>
.api-call-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  opacity: 0.5;
  transition: all 0.2s;
}

.step.active {
  opacity: 1;
  background: var(--vp-c-bg);
}

.step.completed {
  opacity: 0.7;
}

.step-num {
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

.step.active .step-num {
  background: var(--vp-c-brand);
  color: white;
}

.step.completed .step-num {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.15rem;
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.action-panel {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-brand);
  border-radius: 4px;
  background: var(--vp-c-brand);
  color: white;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.outline {
  background: transparent;
  color: var(--vp-c-brand);
}

.code-preview {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.code-title {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

pre {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.5;
  overflow-x: auto;
}

code {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
}
</style>
