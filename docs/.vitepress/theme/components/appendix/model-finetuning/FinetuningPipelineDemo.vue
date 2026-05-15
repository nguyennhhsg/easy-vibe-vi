<template>
  <div class="finetuning-pipeline-demo">
    <div class="pipeline-header">
      <h4>Demo pipeline fine-tuning</h4>
      <p class="subtitle">Bấm vào từng giai đoạn để hiểu trọn quy trình fine-tuning</p>
    </div>

    <div class="pipeline-steps">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        class="pipeline-step"
        :class="{ active: activeStep === index, completed: index < activeStep }"
        @click="setStep(index)"
      >
        <div class="step-icon">{{ step.icon }}</div>
        <div class="step-label">{{ step.label }}</div>
        <div v-if="index < steps.length - 1" class="step-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="step-detail" v-if="activeStep >= 0">
      <div class="detail-title">
        {{ steps[activeStep].icon }} {{ steps[activeStep].label }}
      </div>
      <p class="detail-desc">{{ steps[activeStep].description }}</p>

      <div class="detail-points">
        <div v-for="(point, i) in steps[activeStep].points" :key="i" class="point-item">
          <span class="point-bullet">{{ i + 1 }}</span>
          <span>{{ point }}</span>
        </div>
      </div>

      <div class="detail-example" v-if="steps[activeStep].example">
        <div class="example-label">Ví dụ</div>
        <code>{{ steps[activeStep].example }}</code>
      </div>
    </div>

    <div class="pipeline-controls">
      <button class="ctrl-btn" :disabled="activeStep <= 0" @click="prevStep">Bước trước</button>
      <span class="step-indicator">{{ activeStep + 1 }} / {{ steps.length }}</span>
      <button class="ctrl-btn primary" :disabled="activeStep >= steps.length - 1" @click="nextStep">Bước kế</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeStep = ref(0)

const steps = [
  {
    id: 'base',
    icon: '🧠',
    label: 'Chọn base model',
    description: 'Bước đầu của fine-tuning là chọn một base model đã được pre-train phù hợp. Base model đã học năng lực ngôn ngữ tổng quát trên khối lượng dữ liệu rất lớn, việc của bạn là "huấn luyện chuyên môn hóa" trên nền đó.',
    points: [
      'Chọn quy mô mô hình theo yêu cầu task (7B, 13B, 70B...)',
      'Cân nhắc giấy phép mã nguồn (Apache 2.0, Llama license...)',
      'Đánh giá năng lực cơ bản có phù hợp với tình huống đích không',
      'Lựa chọn phổ biến: Llama, Qwen, Mistral, DeepSeek...'
    ],
    example: 'model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2-7B")'
  },
  {
    id: 'data',
    icon: '📊',
    label: 'Chuẩn bị dữ liệu huấn luyện',
    description: 'Dữ liệu chất lượng là chìa khóa thành công khi fine-tuning. Chất lượng quan trọng hơn số lượng — 1000 mẫu được gán nhãn kỹ thường thắng 100,000 mẫu nhiễu.',
    points: [
      'Thu thập mẫu dữ liệu liên quan tới task',
      'Làm sạch: khử trùng lặp, lọc nội dung kém',
      'Format theo định dạng đầu vào của mô hình (ví dụ cặp instruction-response)',
      'Chia tập train, validation (thường 9:1)'
    ],
    example: '{"instruction": "Dịch sang tiếng Anh", "input": "Xin chào thế giới", "output": "Hello World"}'
  },
  {
    id: 'train',
    icon: '⚙️',
    label: 'Huấn luyện fine-tuning',
    description: 'Dùng dữ liệu đã chuẩn bị để huấn luyện mô hình. Fine-tuning hiện đại thường dùng phương pháp parameter-efficient (như LoRA), chỉ cập nhật một phần nhỏ tham số, giảm mạnh chi phí tính toán.',
    points: [
      'Cấu hình hyperparameter (learning rate, batch size, số epoch)',
      'Chọn chiến lược (full fine-tuning / LoRA / QLoRA)',
      'Theo dõi đường loss để tránh overfitting',
      'Thường cần 1-4 GPU, huấn luyện từ vài giờ đến vài ngày'
    ],
    example: 'trainer = SFTTrainer(model, train_dataset, peft_config=lora_config)'
  },
  {
    id: 'eval',
    icon: '📈',
    label: 'Đánh giá và test',
    description: 'Sau huấn luyện, cần đánh giá toàn diện. Ngoài chỉ số tự động, cần đánh giá thủ công để đảm bảo mô hình tốt trong tình huống thực.',
    points: [
      'Tính loss và perplexity trên tập validation',
      'Dùng chỉ số đặc thù task (BLEU, ROUGE, accuracy...)',
      'Đánh giá thủ công: độ trôi chảy, chính xác, an toàn',
      'So với base model để xác nhận fine-tuning có cải thiện'
    ],
    example: 'eval_results = trainer.evaluate(eval_dataset)'
  },
  {
    id: 'deploy',
    icon: '🚀',
    label: 'Triển khai lên production',
    description: 'Triển khai mô hình đã fine-tune vào môi trường production để phục vụ người dùng. Trước khi deploy thường cần tối ưu (quantize, distill...) để giảm chi phí inference.',
    points: [
      'Xuất trọng số mô hình, merge LoRA adapter',
      'Áp dụng quantization để giảm kích thước',
      'Chọn cách deploy (API service, edge...)',
      'Cấu hình monitoring và log để theo dõi liên tục'
    ],
    example: 'model.merge_and_unload().save_pretrained("my-finetuned-model")'
  }
]

function setStep(index) {
  activeStep.value = index
}

function prevStep() {
  if (activeStep.value > 0) activeStep.value--
}

function nextStep() {
  if (activeStep.value < steps.length - 1) activeStep.value++
}
</script>

<style scoped>
.finetuning-pipeline-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}

.pipeline-header h4 {
  margin: 0 0 4px;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin: 0 0 20px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.pipeline-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.pipeline-step {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.step-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.pipeline-step.active .step-icon {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: scale(1.1);
}

.pipeline-step.completed .step-icon {
  border-color: #10b981;
  background: #d1fae5;
}

.step-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  max-width: 64px;
  text-align: center;
  line-height: 1.3;
}

.pipeline-step.active .step-label {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.step-arrow {
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  margin: 0 2px;
}

.step-detail {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid var(--vp-c-divider);
}

.detail-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.detail-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0 0 12px;
}

.detail-points {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.point-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.point-bullet {
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
}

.detail-example {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 12px;
}

.example-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-example code {
  font-size: 12px;
  color: var(--vp-c-brand-1);
  word-break: break-all;
}

.pipeline-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.ctrl-btn {
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.ctrl-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.ctrl-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ctrl-btn.primary {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.ctrl-btn.primary:hover:not(:disabled) {
  opacity: 0.9;
}

.step-indicator {
  font-size: 13px;
  color: var(--vp-c-text-3);
}
</style>
