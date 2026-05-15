<template>
  <div class="router-architecture-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">Kiến trúc router</span>
      <span class="subtitle">Các thành phần của hệ thống routing frontend</span>
    </div>

    <div class="intro-text">
      Hãy hình dung <span class="highlight">cơ cấu tổ chức công ty</span>: có lễ tân (lắng nghe URL), có trung tâm điều phối (khớp route), có các phòng ban (render component). Routing frontend cũng phối hợp phân tầng như vậy, ai vào việc nấy.
    </div>

    <div class="architecture-layers">
      <div
        v-for="(layer, index) in layers"
        :key="layer.name"
        class="layer"
      >
        <div class="layer-header">
          <span class="layer-icon">{{ layer.icon }}</span>
          <span class="layer-name">{{ layer.name }}</span>
          <span class="layer-desc">{{ layer.desc }}</span>
        </div>
        <div class="layer-components">
          <div
            v-for="comp in layer.components"
            :key="comp"
            class="component-tag"
          >
            {{ comp }}
          </div>
        </div>
        <div
          v-if="index < layers.length - 1"
          class="layer-arrow"
        >
          ↓
        </div>
      </div>
    </div>

    <div class="data-flow">
      <h5>📊 Luồng dữ liệu</h5>
      <div class="flow-steps">
        <div class="flow-step">
          <span class="step-num">1</span>
          <span>Người dùng nhấp link, URL thay đổi</span>
        </div>
        <div class="flow-step">
          <span class="step-num">2</span>
          <span>Bộ lắng nghe History bắt sự kiện thay đổi</span>
        </div>
        <div class="flow-step">
          <span class="step-num">3</span>
          <span>Bộ khớp route tìm cấu hình tương ứng</span>
        </div>
        <div class="flow-step">
          <span class="step-num">4</span>
          <span>Chạy guard để kiểm tra</span>
        </div>
        <div class="flow-step">
          <span class="step-num">5</span>
          <span>Render component vào RouterView</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý tưởng cốt lõi:</strong> Hệ thống routing lắng nghe URL thay đổi, khớp cấu hình route, chạy guard kiểm tra, rồi render component — chuỗi bước này hiện thực việc điều hướng không refresh cho single page app.
    </div>
  </div>
</template>

<script setup>
const layers = [
  {
    name: 'Lớp trình duyệt',
    icon: '🌐',
    desc: 'Cung cấp URL và History API',
    components: ['URL Bar', 'History API', 'Hash Change', 'PopState']
  },
  {
    name: 'Lớp lõi router',
    icon: '⚙️',
    desc: 'Logic cốt lõi của hệ thống routing',
    components: ['Router instance', 'Bộ khớp route', 'Quản lý History', 'Pipeline guard']
  },
  {
    name: 'Lớp component',
    icon: '🧩',
    desc: 'Render giao diện người dùng',
    components: ['RouterView', 'RouterLink', 'Component trang']
  }
]
</script>

<style scoped>
.router-architecture-demo {
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

.architecture-layers {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.layer {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.layer-icon {
  font-size: 1rem;
}

.layer-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.layer-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.layer-components {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.component-tag {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.layer-arrow {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.data-flow {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.data-flow h5 {
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.step-num {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.65rem;
  font-weight: 600;
  flex-shrink: 0;
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
  .layer-header {
    flex-wrap: wrap;
  }

  .layer-desc {
    margin-left: 0;
    width: 100%;
  }
}
</style>
