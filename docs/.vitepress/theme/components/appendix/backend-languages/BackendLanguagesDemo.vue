<template>
  <div class="backend-languages-demo">
    <div class="demo-header">
      <span class="icon">🛠️</span>
      <span class="title">Hộp công cụ ngôn ngữ backend</span>
      <span class="subtitle">Chọn đúng công cụ cho công việc</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn là <span class="highlight">thợ xây</span>: vác gạch dùng xẻng, xây tường dùng bay, hoàn thiện dùng cọ. Ngôn ngữ backend cũng vậy, mỗi tình huống phù hợp với những "công cụ" khác nhau. Không có ngôn ngữ tốt nhất, chỉ có lựa chọn phù hợp nhất.
    </div>

    <div class="language-grid">
      <div
        v-for="lang in languages"
        :key="lang.name"
        class="language-card"
        :class="{ active: selectedLang === lang.name }"
        @click="selectedLang = lang.name"
      >
        <div class="lang-icon">
          {{ lang.icon }}
        </div>
        <div class="lang-name">
          {{ lang.name }}
        </div>
        <div class="lang-metaphor">
          {{ lang.metaphor }}
        </div>
        <div class="lang-description">
          {{ lang.description }}
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="selectedLang"
        class="lang-detail"
      >
        <div class="detail-header">
          <span class="detail-icon">{{ getCurrentLang().icon }}</span>
          <span class="detail-title">{{ getCurrentLang().name }}</span>
        </div>

        <div class="detail-sections">
          <div class="detail-section">
            <h6>🎯 Tình huống phù hợp</h6>
            <ul>
              <li
                v-for="scenario in getCurrentLang().scenarios"
                :key="scenario"
              >
                {{ scenario }}
              </li>
            </ul>
          </div>

          <div class="detail-section">
            <h6>✅ Ưu điểm</h6>
            <ul>
              <li
                v-for="pro in getCurrentLang().pros"
                :key="pro"
              >
                {{ pro }}
              </li>
            </ul>
          </div>

          <div class="detail-section">
            <h6>❌ Nhược điểm</h6>
            <ul>
              <li
                v-for="con in getCurrentLang().cons"
                :key="con"
              >
                {{ con }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>

    <div
      v-if="!selectedLang"
      class="hint-text"
    >
      👆 Bấm vào bất kỳ ngôn ngữ nào ở trên để xem chi tiết
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Tư tưởng cốt lõi:</strong> Khi chọn ngôn ngữ, hãy xác định rõ "bạn cần giải quyết vấn đề gì", đừng chạy theo "ngôn ngữ nào đang hot". Startup chọn Python/Node.js để kiểm chứng nhanh, doanh nghiệp lớn chọn Java/Go để đảm bảo ổn định, game dev chọn C++ để đạt hiệu năng tối đa.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedLang = ref('Go')

const languages = [
  {
    name: 'Go',
    icon: '🐹',
    metaphor: 'Tua-vít điện',
    description: 'Công cụ hiệu quả thời cloud-native',
    scenarios: [
      'Kiến trúc microservice (Docker, K8s đều viết bằng Go)',
      'API service concurrency cao',
      'Phát triển công cụ DevOps',
      'Hạ tầng blockchain'
    ],
    pros: [
      'Hiệu năng concurrency tốt (Goroutine - coroutine nhẹ)',
      'Biên dịch nhanh, triển khai đơn giản (file thực thi đơn lẻ)',
      'Cú pháp gọn, đường cong học tập thoải',
      'Tốn ít RAM, hiệu năng gần C++'
    ],
    cons: [
      'Hệ sinh thái chưa bằng Java/Python',
      'Xử lý lỗi rườm rà (if err != nil)',
      'Generic hỗ trợ yếu (mới có từ Go 1.18+)',
      'Không phù hợp tác vụ CPU-intensive'
    ]
  },
  {
    name: 'Python',
    icon: '🐍',
    metaphor: 'Dao Thụy Sĩ',
    description: 'Công cụ đa năng, làm gì cũng được',
    scenarios: [
      'AI/Machine learning (PyTorch, TensorFlow)',
      'Phân tích và xử lý dữ liệu',
      'Phát triển prototype nhanh',
      'Script tự động hóa'
    ],
    pros: [
      'Cú pháp cực gọn, đường cong học tập thoải',
      'Hệ sinh thái AI không đối thủ',
      'Tốc độ phát triển nhanh, ít code',
      'Thư viện phong phú, gần như mọi tính năng đều có sẵn'
    ],
    cons: [
      'Chạy chậm (chậm hơn Go/Java 10-100 lần)',
      'GIL giới hạn hiệu năng multi-thread',
      'Đóng gói triển khai phức tạp (dependency hell)',
      'Dynamic typing, lỗi runtime nhiều'
    ]
  },
  {
    name: 'Java',
    icon: '☕',
    metaphor: 'Máy xúc hạng nặng',
    description: 'Lựa chọn ổn định cho enterprise',
    scenarios: [
      'Hệ thống doanh nghiệp lớn (ngân hàng, bảo hiểm, e-commerce)',
      'Phát triển ứng dụng Android',
      'Xử lý big data (Hadoop, Spark)',
      'Kiến trúc microservice (Spring Cloud)'
    ],
    pros: [
      'Hệ sinh thái rất trưởng thành, framework đầy đủ',
      'Strong typing, kiểm tra ở compile time',
      'Mô hình multi-thread trưởng thành',
      'Cross-platform, JVM tối ưu mạnh'
    ],
    cons: [
      'Code dài dòng, nhiều boilerplate',
      'Khởi động chậm, ngốn RAM',
      'Đường cong học tập dốc (Spring full stack)',
      'Cập nhật version nhanh, vấn đề tương thích'
    ]
  },
  {
    name: 'Node.js',
    icon: '💚',
    metaphor: 'Cờ-lê vạn năng',
    description: 'Vũ khí thống nhất frontend và backend',
    scenarios: [
      'Web app full-stack (React + Node.js)',
      'Hệ thống realtime (chat, công cụ cộng tác)',
      'Serverless (AWS Lambda, Vercel)',
      'API I/O-intensive'
    ],
    pros: [
      'Frontend và backend cùng ngôn ngữ, giảm chi phí context-switch',
      'NPM ecosystem khổng lồ, kho package lớn nhất thế giới',
      'Phù hợp ứng dụng I/O-intensive',
      'Event-driven, non-blocking I/O'
    ],
    cons: [
      'Single-thread, hiệu năng CPU-intensive kém',
      'Callback hell (dù async/await đã cải thiện)',
      'Dynamic typing, lỗi runtime nhiều',
      'Vấn đề tương thích version nhiều'
    ]
  },
  {
    name: 'Rust',
    icon: '🦀',
    metaphor: 'Máy cắt laser',
    description: 'Công cụ hệ thống với memory safety',
    scenarios: [
      'Lập trình hệ thống (OS, database)',
      'Blockchain (Solana, Polkadot)',
      'WebAssembly (tính toán hiệu năng cao ở frontend)',
      'Hạ tầng (AWS Firecracker)'
    ],
    pros: [
      'Memory safety, đảm bảo không rò rỉ ở compile time',
      'Hiệu năng gần C++',
      'Cú pháp hiện đại, zero-cost abstraction',
      'Không có GC, runtime overhead thấp'
    ],
    cons: [
      'Đường cong học tập cực dốc',
      'Thời gian biên dịch lâu',
      'Hệ sinh thái chưa bằng Go/Java',
      'Tốc độ phát triển chậm'
    ]
  },
  {
    name: 'C++',
    icon: '⚡',
    metaphor: 'Khoan điện công nghiệp',
    description: 'Nền tảng cho tính toán hiệu năng cao',
    scenarios: [
      'Phát triển game (Unreal Engine)',
      'High-frequency trading (hệ thống tài chính)',
      'Engine trình duyệt (Chrome V8)',
      'Lớp dưới của AI framework (PyTorch, TF)'
    ],
    pros: [
      'Hiệu năng đỉnh cao, không ngôn ngữ nào vượt qua',
      'Khả năng kiểm soát mức thấp mạnh, thao tác trực tiếp bộ nhớ',
      'Chuẩn cho phát triển game',
      'Hệ sinh thái trưởng thành'
    ],
    cons: [
      'Đường cong học tập cực dốc',
      'Quản lý bộ nhớ phức tạp (dễ rò rỉ)',
      'Hiệu suất phát triển thấp',
      'Không phù hợp phát triển web'
    ]
  }
]

const getCurrentLang = () => {
  return languages.find(l => l.name === selectedLang.value) || languages[0]
}
</script>

<style scoped>
.backend-languages-demo {
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

.language-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  margin-bottom: 1rem;
}

.language-card {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.language-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.language-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}

.lang-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.lang-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.lang-metaphor {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.lang-description {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.hint-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin: 0.75rem 0;
}

.lang-detail {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.detail-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.detail-section h6 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.detail-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-section li {
  padding: 0.25rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  position: relative;
  padding-left: 1rem;
}

.detail-section li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
