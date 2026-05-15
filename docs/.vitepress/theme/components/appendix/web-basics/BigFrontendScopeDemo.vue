<template>
  <div class="bigfe-demo">
    <div class="demo-header">
      <span class="icon">🌐</span>
      <span class="title">Frontend vs Big Frontend</span>
      <span class="subtitle">Tìm hiểu môi trường chạy và technology stack của các nền tảng khác nhau</span>
    </div>

    <div class="demo-content">
      <div class="platforms">
        <button
          v-for="p in platforms"
          :key="p.key"
          class="platform"
          :class="{ active: current === p.key }"
          @click="current = p.key"
        >
          <span class="icon">{{ p.icon }}</span>
          <span>{{ p.label }}</span>
        </button>
      </div>

      <div class="cards">
        <div class="card">
          <div class="label">
            Môi trường chạy
          </div>
          <div class="value">
            {{ currentData.runtime }}
          </div>
        </div>
        <div class="card">
          <div class="label">
            Công nghệ chính
          </div>
          <div class="value">
            {{ currentData.stack }}
          </div>
        </div>
        <div class="card">
          <div class="label">
            Cách phát hành
          </div>
          <div class="value">
            {{ currentData.release }}
          </div>
        </div>
      </div>

      <div class="skills">
        <div class="skills-title">
          Những năng lực nào là "dùng chung"?
        </div>
        <div class="tags">
          <span
            v-for="t in commonSkills.slice(0, 6)"
            :key="t"
            class="tag"
          >{{ t }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Tư tưởng cốt lõi:</strong> Big Frontend không phải là "biết nhiều framework hơn", mà là dùng cùng một bộ năng lực kỹ thuật để mang trải nghiệm tới các nền tảng khác nhau.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const platforms = [
  { key: 'web', label: 'Website Web', icon: '🌐' },
  { key: 'h5', label: 'Trang H5 sự kiện', icon: '📱' },
  { key: 'miniapp', label: 'Mini-program', icon: '🧩' },
  { key: 'native', label: 'App native', icon: '📲' },
  { key: 'cross', label: 'App cross-platform', icon: '🧱' },
  { key: 'desktop', label: 'Ứng dụng desktop', icon: '🖥️' }
]

const current = ref('web')

const data = {
  web: {
    runtime: 'Trình duyệt (Chrome/Safari/Edge)',
    stack: 'HTML + CSS + JavaScript / Vue / React',
    release: 'Deploy lên server/static hosting, người dùng refresh là cập nhật'
  },
  h5: {
    runtime: 'Trình duyệt di động / WebView trong App',
    stack: 'Giống Web, nhưng chú trọng performance và tương thích hơn',
    release: 'Gửi link/quét mã là dùng ngay, lặp lại rất nhanh'
  },
  miniapp: {
    runtime: 'Runtime mini-program (WeChat/Alipay v.v.)',
    stack: 'Framework mini-program + JS/TS + component',
    release: 'Cần kiểm duyệt/phát hành (chậm hơn web một chút)'
  },
  native: {
    runtime: 'Hệ thống native iOS/Android',
    stack: 'Swift/Objective-C / Kotlin/Java',
    release: 'Lên app store (quy trình chậm nhất, nhưng năng lực mạnh nhất)'
  },
  cross: {
    runtime: 'Vỏ native + engine cross-platform',
    stack: 'React Native / Flutter (một bộ code chạy nhiều nền tảng)',
    release: 'Vẫn theo quy trình store, nhưng tái sử dụng code cao hơn'
  },
  desktop: {
    runtime: 'Windows/macOS/Linux',
    stack: 'Electron / Tauri (dùng Web để làm desktop)',
    release: 'Đóng gói thành installer/tự động cập nhật'
  }
}

const currentData = computed(() => data[current.value] || data.web)

const commonSkills = [
  'HTTP/Mạng',
  'Tối ưu hiệu năng',
  'Kỹ thuật và build',
  'Component hoá',
  'Quản lý state',
  'Debug và xử lý lỗi',
  'Trải nghiệm người dùng'
]
</script>

<style scoped>
.bigfe-demo {
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

.demo-content {
  margin-bottom: 0.5rem;
}

.platforms {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.platform {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.2s;
}

.platform:hover {
  background: var(--vp-c-bg-soft);
}

.platform.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  font-weight: 600;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.card {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.85rem;
}

.label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.value {
  margin-top: 0.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--vp-c-text-1);
}

.skills {
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 0.75rem;
}

.skills-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.tag {
  font-size: 0.8rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
