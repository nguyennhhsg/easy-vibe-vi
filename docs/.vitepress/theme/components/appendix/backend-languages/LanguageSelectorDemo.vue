<template>
  <div class="language-selector-demo">
    <div class="demo-header">
      <span class="icon">🎯</span>
      <span class="title">Bộ chọn ngôn ngữ</span>
      <span class="subtitle">Chọn ngôn ngữ backend phù hợp nhất với nhu cầu</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn <span class="highlight">gọi món</span>: muốn ăn nhanh chọn Python (nhanh), muốn ăn sang chọn Java (chính thống), muốn ăn lành mạnh chọn Go (cân bằng). Không có lựa chọn "tốt nhất", chỉ có lựa chọn "phù hợp nhất".
    </div>

    <div class="questions-container">
      <div
        v-for="(question, index) in questions"
        :key="question.id"
        class="question-card"
        :class="{ active: currentQuestion === index }"
      >
        <div class="question-number">
          {{ index + 1 }}
        </div>
        <div class="question-content">
          <h6>{{ question.text }}</h6>
          <div class="options">
            <button
              v-for="option in question.options"
              :key="option.value"
              class="option-btn"
              :class="{ selected: answers[index] === option.value }"
              @click="selectAnswer(index, option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="recommendation"
        class="recommendation-panel"
      >
        <div class="rec-header">
          <span class="rec-icon">{{ recommendation.icon }}</span>
          <div class="rec-title">
            <h6>Ngôn ngữ được đề xuất</h6>
            <div class="rec-name">
              {{ recommendation.language }}
            </div>
          </div>
        </div>
        <div class="rec-reason">
          <strong>Lý do chọn:</strong>
          <p>{{ recommendation.reason }}</p>
        </div>
        <button
          class="reset-btn"
          @click="reset"
        >
          🔄 Chọn lại
        </button>
      </div>
    </Transition>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Tư tưởng cốt lõi:</strong> Đừng hỏi "ngôn ngữ nào đang hot", mà hãy hỏi "dự án của mình cần gì". Startup ưu tiên tốc độ phát triển (Python/Node.js), công ty lớn ưu tiên ổn định và hiệu năng (Java/Go), lập trình hệ thống ưu tiên an toàn (Rust).
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentQuestion = ref(0)
const answers = ref({})

const questions = [
  {
    id: 'project_type',
    text: 'Loại dự án là gì?',
    options: [
      { value: 'web', label: 'Ứng dụng Web' },
      { value: 'api', label: 'Dịch vụ API' },
      { value: 'ai', label: 'AI/ML' },
      { value: 'system', label: 'Lập trình hệ thống' }
    ]
  },
  {
    id: 'performance',
    text: 'Yêu cầu hiệu năng thế nào?',
    options: [
      { value: 'high', label: 'Hiệu năng cao' },
      { value: 'medium', label: 'Trung bình' },
      { value: 'low', label: 'Không nhạy cảm' }
    ]
  },
  {
    id: 'team',
    text: 'Nền tảng của team?',
    options: [
      { value: 'frontend', label: 'Team frontend' },
      { value: 'python', label: 'Nền Python' },
      { value: 'java', label: 'Nền Java' },
      { value: 'new', label: 'Team mới' }
    ]
  }
]

const recommendation = computed(() => {
  if (Object.keys(answers.value).length < 3) return null

  const { project_type, performance, team } = answers.value

  if (project_type === 'ai') {
    return {
      icon: '🐍',
      language: 'Python',
      reason: 'Vị trí thống trị tuyệt đối trong AI/ML, hệ sinh thái không đối thủ. Hiệu năng kém C++/Rust, nhưng 95% dự án AI đều dùng Python.'
    }
  }

  if (project_type === 'system' || performance === 'high') {
    return {
      icon: '🐹',
      language: 'Go',
      reason: 'Con cưng thời cloud-native, cú pháp gọn + concurrency bẩm sinh + biên dịch nhanh. Triển khai file thực thi đơn cực kỳ đơn giản.'
    }
  }

  if (team === 'frontend') {
    return {
      icon: '💚',
      language: 'Node.js',
      reason: 'Frontend và backend cùng ngôn ngữ, giảm chi phí context-switch. NPM ecosystem khổng lồ, phù hợp lặp nhanh và phát triển MVP.'
    }
  }

  if (team === 'python') {
    return {
      icon: '🐍',
      language: 'Python',
      reason: 'Tận dụng kỹ năng sẵn có của team, phát triển nhanh. Hệ sinh thái Django/FastAPI trưởng thành, phù hợp ứng dụng data-driven.'
    }
  }

  if (team === 'java') {
    return {
      icon: '☕',
      language: 'Java',
      reason: 'Lựa chọn tốt nhất cho phát triển enterprise. Hệ sinh thái Spring Boot cực kỳ trưởng thành, team đã quen, chi phí bảo trì thấp.'
    }
  }

  return {
    icon: '🐹',
    language: 'Go',
    reason: 'Ngôn ngữ hiệu năng cao thời cloud-native. So với Java thì gọn hơn, so với Node.js thì hiệu năng tốt hơn, so với Python thì ổn định hơn.'
  }
})

const selectAnswer = (questionIndex, value) => {
  answers.value[questionIndex] = value
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++
  }
}

const reset = () => {
  answers.value = {}
  currentQuestion.value = 0
}
</script>

<style scoped>
.language-selector-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.questions-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.question-card {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 2px solid transparent;
  display: flex;
  gap: 0.75rem;
}

.question-card.active {
  border-color: var(--vp-c-brand);
}

.question-number {
  width: 28px;
  height: 28px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.question-content {
  flex: 1;
}

.question-content h6 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.option-btn {
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
}

.option-btn:hover {
  border-color: var(--vp-c-brand);
}

.option-btn.selected {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.recommendation-panel {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border: 2px solid var(--vp-c-brand);
}

.rec-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.rec-icon {
  font-size: 2.5rem;
}

.rec-title h6 {
  margin: 0 0 0.25rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.rec-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vp-c-brand-1);
}

.rec-reason {
  margin-bottom: 0.75rem;
}

.rec-reason strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.rec-reason p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.reset-btn {
  width: 100%;
  padding: 0.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.reset-btn:hover {
  background: var(--vp-c-brand-dark);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
