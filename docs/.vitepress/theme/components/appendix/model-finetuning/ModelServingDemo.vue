<template>
  <div class="model-serving-demo">
    <div class="demo-header">
      <h4>Demo kiến trúc model serving</h4>
      <p class="subtitle">Bấm vào các phương án deploy để so sánh đặc điểm và tình huống phù hợp</p>
    </div>

    <div class="serving-options">
      <div
        v-for="(opt, i) in options"
        :key="opt.id"
        class="option-card"
        :class="{ active: activeOption === i }"
        @click="activeOption = i"
      >
        <div class="opt-icon">{{ opt.icon }}</div>
        <div class="opt-name">{{ opt.name }}</div>
        <div class="opt-brief">{{ opt.brief }}</div>
      </div>
    </div>

    <div class="option-detail" v-if="currentOption">
      <div class="detail-header">
        <span class="detail-icon">{{ currentOption.icon }}</span>
        <span class="detail-name">{{ currentOption.name }}</span>
      </div>
      <p class="detail-desc">{{ currentOption.description }}</p>

      <div class="arch-flow">
        <div class="flow-label">Luồng kiến trúc</div>
        <div class="flow-steps">
          <div v-for="(node, i) in currentOption.flow" :key="i" class="flow-node">
            <div class="node-box">{{ node }}</div>
            <div v-if="i < currentOption.flow.length - 1" class="flow-arrow-h">→</div>
          </div>
        </div>
      </div>

      <div class="specs-grid">
        <div v-for="spec in currentOption.specs" :key="spec.label" class="spec-item">
          <div class="spec-label">{{ spec.label }}</div>
          <div class="spec-value">{{ spec.value }}</div>
          <div class="spec-bar-wrap">
            <div class="spec-bar" :style="{ width: spec.score + '%', background: spec.color }"></div>
          </div>
        </div>
      </div>

      <div class="tools-section">
        <div class="tools-label">Công cụ phổ biến</div>
        <div class="tools-list">
          <span v-for="tool in currentOption.tools" :key="tool" class="tool-tag">{{ tool }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeOption = ref(0)

const options = [
  {
    id: 'api',
    icon: '🌐',
    name: 'API service',
    brief: 'Cách deploy online phổ biến nhất',
    description: 'Đóng gói mô hình thành dịch vụ RESTful API hoặc gRPC, gọi qua HTTP. Phù hợp ứng dụng online cần phản hồi thời gian thực như chatbot, CSKH thông minh, sinh nội dung. Là cách deploy phổ biến nhất hiện nay.',
    flow: ['Client request', 'Load balancer', 'Inference server', 'GPU inference', 'Trả kết quả'],
    specs: [
      { label: 'Độ trễ', value: '100ms - 2s', score: 70, color: '#10b981' },
      { label: 'Khả năng concurrent', value: 'Cao (scale ngang)', score: 85, color: '#818cf8' },
      { label: 'Chi phí deploy', value: 'Trung bình cao (cần GPU server)', score: 50, color: '#f59e0b' },
      { label: 'Độ phức tạp vận hành', value: 'Trung bình', score: 55, color: '#ef4444' }
    ],
    tools: ['vLLM', 'TGI', 'Triton', 'FastAPI', 'Ollama']
  },
  {
    id: 'edge',
    icon: '📱',
    name: 'Deploy edge',
    brief: 'Chạy ngay trên thiết bị đầu cuối',
    description: 'Triển khai mô hình đã quantize lên điện thoại, laptop, thiết bị nhúng — chạy được không cần mạng. Phù hợp tình huống nhạy quyền riêng tư, offline, hoặc yêu cầu độ trễ cực thấp.',
    flow: ['Quantize mô hình', 'Chuyển format', 'Tải lên thiết bị', 'Inference local', 'Output tức thì'],
    specs: [
      { label: 'Độ trễ', value: '50ms - 5s', score: 60, color: '#10b981' },
      { label: 'Khả năng concurrent', value: 'Thấp (đơn thiết bị)', score: 20, color: '#818cf8' },
      { label: 'Chi phí deploy', value: 'Thấp (không tốn server)', score: 90, color: '#f59e0b' },
      { label: 'Độ phức tạp vận hành', value: 'Thấp', score: 85, color: '#ef4444' }
    ],
    tools: ['llama.cpp', 'MLC LLM', 'ONNX Runtime', 'MediaPipe']
  },
  {
    id: 'batch',
    icon: '📦',
    name: 'Batch processing',
    brief: 'Inference batch khối lượng lớn offline',
    description: 'Gom nhiều request lại xử lý chung, không yêu cầu trả lời thời gian thực. Phù hợp các task offline như gán nhãn dữ liệu, tóm tắt tài liệu, dịch hàng loạt. Batch giúp tối đa hóa hiệu suất GPU và giảm mạnh chi phí mỗi request.',
    flow: ['Hàng đợi dữ liệu', 'Gom thành batch', 'GPU batch inference', 'Lưu kết quả', 'Thông báo bất đồng bộ'],
    specs: [
      { label: 'Độ trễ', value: 'Phút ~ giờ', score: 20, color: '#10b981' },
      { label: 'Throughput', value: 'Cực cao (tối ưu batch)', score: 95, color: '#818cf8' },
      { label: 'Chi phí deploy', value: 'Thấp (tận dụng GPU tốt)', score: 85, color: '#f59e0b' },
      { label: 'Độ phức tạp vận hành', value: 'Trung bình', score: 55, color: '#ef4444' }
    ],
    tools: ['Ray Serve', 'Spark', 'Celery', 'AWS Batch']
  }
]

const currentOption = computed(() => options[activeOption.value])
</script>

<style scoped>
.model-serving-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}

.demo-header h4 {
  margin: 0 0 4px;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin: 0 0 20px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.serving-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

@media (max-width: 640px) {
  .serving-options {
    grid-template-columns: 1fr;
  }
}

.option-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.option-card.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.opt-icon {
  font-size: 28px;
  margin-bottom: 6px;
}

.opt-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.opt-brief {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.option-detail {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.detail-icon {
  font-size: 22px;
}

.detail-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.detail-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0 0 16px;
}

.arch-flow {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 16px;
}

.flow-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.flow-steps {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
}

.flow-node {
  display: flex;
  align-items: center;
  gap: 4px;
}

.node-box {
  padding: 6px 12px;
  border-radius: 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.flow-arrow-h {
  color: var(--vp-c-text-3);
  font-size: 16px;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

@media (max-width: 640px) {
  .specs-grid {
    grid-template-columns: 1fr;
  }
}

.spec-item {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 10px 12px;
}

.spec-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.spec-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.spec-bar-wrap {
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  overflow: hidden;
}

.spec-bar {
  height: 100%;
  border-radius: 2px;
  transition: width 0.5s ease;
}

.tools-section {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 12px;
}

.tools-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.tools-list {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tool-tag {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}
</style>
