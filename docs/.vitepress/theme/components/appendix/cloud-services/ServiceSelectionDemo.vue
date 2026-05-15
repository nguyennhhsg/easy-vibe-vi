<template>
  <div class="service-selection-demo">
    <div class="demo-header">
      <h4>Cây quyết định chọn cloud service</h4>
      <p class="demo-desc">
        Trả lời vài câu hỏi đơn giản để có giải pháp cloud service phù hợp nhất với bạn
      </p>
    </div>

    <div
      v-if="!result"
      class="decision-flow"
    >
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: progress + '%' }"
        />
      </div>

      <div class="question-card">
        <div class="question-number">
          Câu hỏi {{ currentStep + 1 }}/{{ questions.length }}
        </div>
        <h5 class="question-text">
          {{ currentQuestion.text }}
        </h5>

        <div class="options-list">
          <button
            v-for="option in currentQuestion.options"
            :key="option.value"
            class="option-btn"
            @click="selectOption(option)"
          >
            <span class="option-icon">{{ option.icon }}</span>
            <span class="option-text">{{ option.text }}</span>
            <span class="option-desc">{{ option.desc }}</span>
          </button>
        </div>
      </div>
    </div>

    <div
      v-else
      class="result-panel"
    >
      <div class="result-header">
        <span class="result-icon">🎯</span>
        <h5>Giải pháp đề xuất</h5>
      </div>

      <div class="recommendation-cards">
        <div class="rec-card primary">
          <div class="rec-badge">
            Phù hợp nhất
          </div>
          <div class="rec-icon">
            {{ result.primary.icon }}
          </div>
          <div class="rec-title">
            {{ result.primary.name }}
          </div>
          <div class="rec-services">
            <span class="service aws">{{ result.primary.aws }}</span>
            <span class="vs">vs</span>
            <span class="service aliyun">{{ result.primary.aliyun }}</span>
          </div>
          <div class="rec-reason">
            {{ result.primary.reason }}
          </div>
        </div>

        <div class="rec-card secondary">
          <div class="rec-badge alt">
            Tùy chọn khác
          </div>
          <div class="rec-icon">
            {{ result.secondary.icon }}
          </div>
          <div class="rec-title">
            {{ result.secondary.name }}
          </div>
          <div class="rec-services">
            <span class="service aws">{{ result.secondary.aws }}</span>
            <span class="vs">vs</span>
            <span class="service aliyun">{{ result.secondary.aliyun }}</span>
          </div>
          <div class="rec-reason">
            {{ result.secondary.reason }}
          </div>
        </div>
      </div>

      <div class="result-actions">
        <button
          class="restart-btn"
          @click="restart"
        >
          <span>↺</span> Làm lại
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)
const answers = ref([])

const questions = [
  {
    text: 'Ứng dụng của bạn chủ yếu phục vụ khu vực nào?',
    options: [
      { value: 'global', icon: '🌍', text: 'User toàn cầu', desc: 'Cần phủ sóng nhiều quốc gia/khu vực' },
      { value: 'china', icon: '🇨🇳', text: 'Trung Quốc đại lục', desc: 'Chủ yếu phục vụ user trong nước' },
      { value: 'asia', icon: '🌏', text: 'Khu vực châu Á - Thái Bình Dương', desc: 'Phủ sóng châu Á và Thái Bình Dương' },
      { value: 'us', icon: '🇺🇸', text: 'Bắc Mỹ/châu Âu', desc: 'Chủ yếu phục vụ user Âu - Mỹ' }
    ]
  },
  {
    text: 'Yêu cầu về tài nguyên compute của ứng dụng bạn ra sao?',
    options: [
      { value: 'serverless', icon: '⚡', text: 'Event-driven/Serverless', desc: 'Chạy theo nhu cầu, traffic biến động lớn' },
      { value: 'webapp', icon: '🌐', text: 'Web Application', desc: 'Cần online 24/7' },
      { value: 'batch', icon: '📊', text: 'Batch processing/compute job', desc: 'Chạy định kỳ hoặc theo lô' },
      { value: 'hpc', icon: '🔬', text: 'High-performance computing', desc: 'Cần GPU hoặc cluster lớn' }
    ]
  },
  {
    text: 'Mức độ ưu tiên tối ưu chi phí của bạn?',
    options: [
      { value: 'lowest', icon: '💰', text: 'Tối ưu chi phí tối đa', desc: 'Chấp nhận cấu hình phức tạp để có giá thấp nhất' },
      { value: 'balanced', icon: '⚖️', text: 'Cân bằng', desc: 'Cân bằng giữa chi phí và dễ dùng' },
      { value: 'stable', icon: '📈', text: 'Chi phí dự đoán được', desc: 'Ưu tiên chi phí cố định, dễ lập ngân sách' },
      { value: 'premium', icon: '💎', text: 'Ưu tiên hiệu năng', desc: 'Chi phí thứ yếu, theo đuổi hiệu năng tốt nhất' }
    ]
  },
  {
    text: 'Nhu cầu lưu trữ dữ liệu chính của bạn là?',
    options: [
      { value: 'object', icon: '📦', text: 'Object storage (file/ảnh/video)', desc: 'Dữ liệu phi cấu trúc dung lượng lớn' },
      { value: 'database', icon: '🗄️', text: 'Database storage', desc: 'Dữ liệu có cấu trúc và xử lý transaction' },
      { value: 'cache', icon: '⚡', text: 'Cache/Session storage', desc: 'Lưu trữ dữ liệu tạm thời hiệu năng cao' },
      { value: 'mixed', icon: '🔀', text: 'Storage kết hợp', desc: 'Kết hợp nhiều loại storage' }
    ]
  }
]

const progress = computed(() => {
  return ((currentStep.value + 1) / questions.length) * 100
})

const currentQuestion = computed(() => {
  return questions[currentStep.value]
})

const selectOption = (option) => {
  answers.value.push(option.value)
  if (currentStep.value < questions.length - 1) {
    currentStep.value++
  }
}

const result = computed(() => {
  if (answers.value.length < 4) return null

  const [region, compute, cost, storage] = answers.value

  // Tính toán đề xuất
  let primary, secondary

  if (compute === 'serverless') {
    primary = {
      icon: '⚡',
      name: 'Kiến trúc Serverless',
      aws: 'AWS Lambda + API Gateway',
      aliyun: 'Function Compute + API Gateway',
      reason: 'Trong kịch bản event-driven, tính phí theo lượt gọi, không cần provision server'
    }
    secondary = {
      icon: '🔲',
      name: 'Container Service',
      aws: 'AWS Fargate',
      aliyun: 'Serverless Kubernetes',
      reason: 'Phù hợp khi cần chạy lâu dài nhưng vẫn cần co giãn linh hoạt'
    }
  } else if (compute === 'hpc') {
    primary = {
      icon: '🔬',
      name: 'High-performance computing cluster',
      aws: 'AWS ParallelCluster',
      aliyun: 'E-HPC + Super Computing Cluster',
      reason: 'GPU instance và mạng high-speed, đáp ứng nhu cầu scientific compute và AI training'
    }
    secondary = {
      icon: '⚡',
      name: 'Elastic Bare Metal',
      aws: 'EC2 Bare Metal',
      aliyun: 'Elastic Bare Metal Server',
      reason: 'Phù hợp khi cần hiệu năng máy vật lý nhưng vẫn muốn quản lý kiểu cloud'
    }
  } else if (cost === 'lowest') {
    primary = {
      icon: '💰',
      name: 'Spot Instances',
      aws: 'EC2 Spot Instances',
      aliyun: 'Preemptible Instances',
      reason: 'Giá thấp tới 10% so với on-demand, phù hợp batch job có khả năng chịu lỗi cao'
    }
    secondary = {
      icon: '📅',
      name: 'Reserved Instances',
      aws: 'Reserved Instances',
      aliyun: 'Subscription (yearly/monthly)',
      reason: 'Workload ổn định lâu dài chọn Reserved Instance, tiết kiệm 30-60% chi phí'
    }
  } else {
    primary = {
      icon: '☁️',
      name: 'Cloud Server ECS',
      aws: 'Amazon EC2',
      aliyun: 'ECS Cloud Server',
      reason: 'Dịch vụ compute đa năng nhất, hỗ trợ nhiều mô hình giá và spec, hệ sinh thái hoàn thiện'
    }
    secondary = {
      icon: '📦',
      name: 'Container Instance',
      aws: 'AWS Fargate',
      aliyun: 'ECI Container Instance',
      reason: 'Không cần quản lý server, chạy container trực tiếp, phù hợp microservices'
    }
  }

  return { primary, secondary }
})

const restart = () => {
  currentStep.value = 0
  answers.value = []
}
</script>

<style scoped>
/* Add styles here */
</style>
