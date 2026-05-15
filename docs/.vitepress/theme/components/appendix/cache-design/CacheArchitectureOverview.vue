<template>
  <div class="cache-architecture-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">Kiến trúc cache nhiều cấp</span>
      <span class="subtitle">Chặn request từng lớp như chuỗi thư viện chi nhánh</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn đang tìm sách trong <span class="highlight">chuỗi thư viện</span>: trước tiên tìm trên bàn làm việc (CDN), không có thì ra kệ sách trong phòng (cache cục bộ),
      vẫn không có thì lên phòng đọc chung của tầng (Redis), cuối cùng mới đến thư viện tổng (database). Mỗi lớp đều có thể chặn lại lượng lớn request.
    </div>

    <div class="architecture-diagram">
      <div class="layer user-layer">
        <div class="layer-icon">
          👤
        </div>
        <div class="layer-label">
          Yêu cầu của người dùng
        </div>
      </div>

      <div class="arrow-down">
        ⬇
      </div>

      <div
        class="layer cdn-layer"
        :class="{ active: activeLayer === 'cdn' }"
      >
        <div class="layer-header">
          <span class="icon">🌐</span>
          <span class="layer-name">CDN cache</span>
        </div>
        <div class="layer-details">
          <div class="detail-item">
            <span class="label">Vị trí</span>
            <span class="value">Edge node toàn cầu</span>
          </div>
          <div class="detail-item">
            <span class="label">Nội dung</span>
            <span class="value">Tài nguyên tĩnh</span>
          </div>
          <div class="detail-item">
            <span class="label">Tỷ lệ hit</span>
            <span class="value highlight">{{ cdnHitRate }}%</span>
          </div>
        </div>
      </div>

      <div class="arrow-down">
        ⬇
      </div>

      <div
        class="layer local-layer"
        :class="{ active: activeLayer === 'local' }"
      >
        <div class="layer-header">
          <span class="icon">💻</span>
          <span class="layer-name">Cache cục bộ</span>
        </div>
        <div class="layer-details">
          <div class="detail-item">
            <span class="label">Vị trí</span>
            <span class="value">Bộ nhớ của application server</span>
          </div>
          <div class="detail-item">
            <span class="label">Nội dung</span>
            <span class="value">Dữ liệu hot</span>
          </div>
          <div class="detail-item">
            <span class="label">Tốc độ</span>
            <span class="value highlight">Cực nhanh (~1ms)</span>
          </div>
        </div>
      </div>

      <div class="arrow-down">
        ⬇
      </div>

      <div
        class="layer distributed-layer"
        :class="{ active: activeLayer === 'distributed' }"
      >
        <div class="layer-header">
          <span class="icon">🗄️</span>
          <span class="layer-name">Cache phân tán</span>
        </div>
        <div class="layer-details">
          <div class="detail-item">
            <span class="label">Vị trí</span>
            <span class="value">Cluster Redis</span>
          </div>
          <div class="detail-item">
            <span class="label">Nội dung</span>
            <span class="value">Dữ liệu cache chia sẻ</span>
          </div>
          <div class="detail-item">
            <span class="label">Dung lượng</span>
            <span class="value highlight">Có thể mở rộng</span>
          </div>
        </div>
      </div>

      <div class="arrow-down">
        ⬇
      </div>

      <div class="layer database-layer">
        <div class="layer-header">
          <span class="icon">🗃️</span>
          <span class="layer-name">Database</span>
        </div>
        <div class="layer-details">
          <div class="detail-item">
            <span class="label">Vị trí</span>
            <span class="value">MySQL / PostgreSQL</span>
          </div>
          <div class="detail-item">
            <span class="label">Tốc độ</span>
            <span class="value warning">Chậm hơn (~100ms)</span>
          </div>
        </div>
      </div>
    </div>

    <div class="control-panel">
      <button
        v-for="layer in layers"
        :key="layer.id"
        class="layer-btn"
        :class="{ active: activeLayer === layer.id }"
        @click="activeLayer = layer.id"
      >
        {{ layer.name }}
      </button>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý tưởng cốt lõi:</strong> Cache nhiều cấp chặn request ở các lớp khác nhau, lọc dần qua từng lớp, cuối cùng chỉ rất ít request đi đến database. Giống như một cái phễu, càng xuống dưới lưu lượng càng ít.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeLayer = ref('local')
const cdnHitRate = ref(95)

const layers = [
  { id: 'cdn', name: 'CDN cache' },
  { id: 'local', name: 'Cache cục bộ' },
  { id: 'distributed', name: 'Cache phân tán' },
  { id: 'database', name: 'Database' }
]
</script>

<style scoped>
.cache-architecture-demo {
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

.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.layer {
  width: 100%;
  max-width: 400px;
  border-radius: 6px;
  transition: all 0.3s;
}

.user-layer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
}

.layer-icon {
  font-size: 2rem;
}

.layer-label {
  font-weight: 600;
  margin-top: 0.25rem;
  font-size: 0.9rem;
}

.cdn-layer,
.local-layer,
.distributed-layer,
.database-layer {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  padding: 0.75rem;
  cursor: pointer;
}

.layer.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.layer-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  font-size: 0.8rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-item .label {
  color: var(--vp-c-text-2);
  font-size: 0.7rem;
}

.detail-item .value {
  font-weight: 500;
}

.detail-item .value.highlight {
  color: #22c55e;
}

.detail-item .value.warning {
  color: #f59e0b;
}

.arrow-down {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  margin: 0.25rem 0;
}

.control-panel {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.layer-btn {
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
}

.layer-btn:hover {
  border-color: var(--vp-c-brand);
}

.layer-btn.active {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
