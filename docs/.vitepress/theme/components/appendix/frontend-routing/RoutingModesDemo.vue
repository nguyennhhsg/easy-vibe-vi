<template>
  <div class="routing-modes-demo">
    <div class="demo-header">
      <span class="icon">🔀</span>
      <span class="title">Các chế độ routing</span>
      <span class="subtitle">Những cách quản lý URL khác nhau</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn đang <span class="highlight">gửi hàng</span>: có thể chọn gửi thường (Hash, đơn giản nhưng chậm), gửi nhanh (History, nhanh nhưng cần phối hợp), hoặc giao tận tay (Memory, dùng cho tình huống đặc biệt). Mỗi chế độ phù hợp với nhu cầu khác nhau.
    </div>

    <div class="mode-selector">
      <button
        v-for="mode in modes"
        :key="mode.key"
        :class="['mode-btn', { active: currentMode === mode.key }]"
        @click="switchMode(mode.key)"
      >
        <span class="mode-icon">{{ mode.icon }}</span>
        <span class="mode-name">{{ mode.name }}</span>
      </button>
    </div>

    <div class="mode-detail">
      <div class="mode-info">
        <h5>{{ getCurrentMode().name }}</h5>
        <p class="mode-desc">
          {{ getCurrentMode().description }}
        </p>
      </div>

      <div class="mode-features">
        <div class="feature-section">
          <h6>✅ Ưu điểm</h6>
          <ul>
            <li
              v-for="pro in getCurrentMode().pros"
              :key="pro"
            >
              {{ pro }}
            </li>
          </ul>
        </div>
        <div class="feature-section">
          <h6>❌ Nhược điểm</h6>
          <ul>
            <li
              v-for="con in getCurrentMode().cons"
              :key="con"
            >
              {{ con }}
            </li>
          </ul>
        </div>
      </div>

      <div class="url-example">
        <h6>🌐 Ví dụ URL</h6>
        <div class="url-bar">
          <span class="url-prefix">https://example.com</span>
          <span class="url-suffix">{{ getUrlSuffix() }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Gợi ý lựa chọn:</strong> Ứng dụng web hiện đại ưu tiên History; dự án cũ hoặc tình huống đặc biệt dùng Hash; mobile app embed hoặc môi trường test có thể dùng Memory.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentMode = ref('history')

const modes = [
  {
    key: 'hash',
    name: 'Chế độ Hash',
    icon: '#',
    description: 'Dùng phần hash (#) của URL để mô phỏng route, tương thích tốt nhất',
    pros: ['Tương thích IE8+', 'Không cần cấu hình server', 'Deploy đơn giản'],
    cons: ['URL có dấu #', 'Không thân thiện SEO', 'Có thể mất hash khi chia sẻ']
  },
  {
    key: 'history',
    name: 'Chế độ History',
    icon: '/',
    description: 'Dùng HTML5 History API để quản lý URL, chế độ phổ biến nhất',
    pros: ['URL đẹp', 'Thân thiện SEO', 'Phù hợp thói quen người dùng'],
    cons: ['Cần cấu hình server', 'Tương thích IE10+', 'Refresh có thể trả 404']
  },
  {
    key: 'memory',
    name: 'Chế độ Memory',
    icon: 'M',
    description: 'Lưu thông tin route trong bộ nhớ, không thay đổi URL của trình duyệt',
    pros: ['Không cần môi trường trình duyệt', 'Hợp cho test', 'Embed trong mobile App'],
    cons: ['Không hỗ trợ refresh', 'URL không đổi', 'Chỉ phù hợp tình huống đặc biệt']
  }
]

const switchMode = (mode) => {
  currentMode.value = mode
}

const getCurrentMode = () => {
  return modes.find(m => m.key === currentMode.value) || modes[0]
}

const getUrlSuffix = () => {
  const path = '/home'
  switch (currentMode.value) {
    case 'hash':
      return `/#${path}`
    case 'history':
      return path
    case 'memory':
      return ' (URL不变)'
    default:
      return path
  }
}
</script>

<style scoped>
.routing-modes-demo {
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

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

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

.mode-selector {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.mode-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.85rem;
}

.mode-btn:hover {
  border-color: var(--vp-c-brand);
}

.mode-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.mode-icon {
  font-weight: bold;
  font-size: 1rem;
}

.mode-name {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.mode-detail {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.mode-info h5 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.mode-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.mode-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.feature-section h6 {
  margin: 0 0 0.5rem 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.feature-section ul {
  margin: 0;
  padding-left: 1rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.feature-section li {
  margin: 0.25rem 0;
}

.url-example {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  border-radius: 6px;
}

.url-example h6 {
  margin: 0 0 0.5rem 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.url-bar {
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8rem;
  border: 1px solid var(--vp-c-divider);
}

.url-prefix {
  color: var(--vp-c-text-3);
}

.url-suffix {
  color: var(--vp-c-brand);
  font-weight: 500;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon { margin-right: 0.25rem; }

@media (max-width: 768px) {
  .mode-features {
    grid-template-columns: 1fr;
  }
}
</style>
