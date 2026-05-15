<!--
  HotReloadDemo.vue
  Demo cơ chế hot reload

  Mục đích:
  Cho thấy cách hoạt động của HMR (Hot Module Replacement).
-->
<template>
  <div class="hot-reload-demo">
    <div class="demo-header">
      <h3>🔥 Demo Hot Module Replacement (HMR)</h3>
      <p>Sửa code không cần refresh trang, hiệu lực ngay</p>
    </div>

    <div class="demo-content">
      <!-- So sánh -->
      <div class="comparison">
        <div class="method-card no-hmr">
          <div class="card-header">
            <span class="icon">🔄</span>
            <span class="title">Refresh truyền thống</span>
          </div>
          <div class="card-body">
            <div
              v-for="(step, i) in noHmrSteps"
              :key="i"
              class="step"
            >
              <span class="step-num">{{ i + 1 }}</span>
              <span class="step-text">{{ step }}</span>
            </div>
          </div>
          <div class="card-footer">
            <span class="time">⏱️ 5-10 giây</span>
            <span class="state">Trang nhấp nháy, mất trạng thái</span>
          </div>
        </div>

        <div class="vs-divider">
          VS
        </div>

        <div class="method-card hmr">
          <div class="card-header">
            <span class="icon">⚡</span>
            <span class="title">HMR (hot reload)</span>
          </div>
          <div class="card-body">
            <div
              v-for="(step, i) in hmrSteps"
              :key="i"
              class="step"
            >
              <span class="step-num">{{ i + 1 }}</span>
              <span class="step-text">{{ step }}</span>
            </div>
          </div>
          <div class="card-footer">
            <span class="time">⏱️ 50-200ms</span>
            <span class="state">Không refresh, giữ nguyên trạng thái</span>
          </div>
        </div>
      </div>

      <!-- Sơ đồ luồng -->
      <div class="flow-diagram">
        <h4>Quy trình hoạt động của HMR</h4>
        <div class="flow-steps">
          <div
            v-for="(step, i) in flowSteps"
            :key="i"
            class="flow-step"
          >
            <div class="step-box">
              <span class="step-icon">{{ step.icon }}</span>
              <span class="step-label">{{ step.label }}</span>
            </div>
            <div
              v-if="i < flowSteps.length - 1"
              class="step-arrow"
            >
              →
            </div>
          </div>
        </div>
      </div>

      <!-- Mức độ hỗ trợ -->
      <div class="support-table">
        <h4>Mức hỗ trợ HMR của các build tool</h4>
        <table>
          <thead>
            <tr>
              <th>Build tool</th>
              <th>Hỗ trợ HMR</th>
              <th>Tốc độ cập nhật</th>
              <th>Đặc điểm</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="tool in hmrTools"
              :key="tool.name"
            >
              <td><strong>{{ tool.name }}</strong></td>
              <td>
                <span
                  class="badge"
                  :class="tool.supportClass"
                >{{ tool.support }}</span>
              </td>
              <td>{{ tool.speed }}</td>
              <td>{{ tool.feature }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>Nguyên lý cốt lõi của HMR:</strong>
        Build tool duy trì kết nối với trình duyệt qua WebSocket. Khi file thay đổi, tool compile module bị thay đổi rồi báo cho trình duyệt qua WebSocket.
        HMR Runtime trong trình duyệt nhận bản cập nhật, thay thế module cũ, đồng thời giữ nguyên trạng thái ứng dụng.
        Giống như thay động cơ cho máy bay đang bay — không cần dừng vẫn cập nhật được.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const noHmrSteps = [
  'Sửa code rồi save',
  'Refresh trình duyệt thủ công',
  'Trang tải lại toàn bộ resource',
  'Trạng thái ứng dụng reset (mất login)'
]

const hmrSteps = [
  'Sửa code rồi save',
  'Build tool phát hiện thay đổi và compile',
  'WebSocket đẩy bản cập nhật xuống trình duyệt',
  'Thay thế module cục bộ, giữ nguyên state'
]

const flowSteps = [
  { icon: '👨‍💻', label: 'Dev sửa code' },
  { icon: '🛠️', label: 'Build tool compile' },
  { icon: '📡', label: 'WebSocket đẩy update' },
  { icon: '🔄', label: 'Trình duyệt thay module' },
  { icon: '✨', label: 'Trang cập nhật tức thì' }
]

const hmrTools = [
  {
    name: 'Vite',
    support: 'Hỗ trợ native',
    supportClass: 'excellent',
    speed: 'Cực nhanh (<100ms)',
    feature: 'Dựa trên ESM, HMR nhanh nhất'
  },
  {
    name: 'Webpack',
    support: 'Hỗ trợ đầy đủ',
    supportClass: 'good',
    speed: 'Khá nhanh (1-3s)',
    feature: 'Triển khai HMR trưởng thành nhất'
  },
  {
    name: 'Parcel',
    support: 'Tự động hỗ trợ',
    supportClass: 'good',
    speed: 'Nhanh (500ms-1s)',
    feature: 'Zero config, tự bật HMR'
  },
  {
    name: 'Rollup',
    support: 'Qua plugin',
    supportClass: 'fair',
    speed: 'Chậm hơn khi dev',
    feature: 'Chủ yếu dùng cho build production'
  }
]
</script>

<style scoped>
.hot-reload-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  font-family: var(--vp-font-family-mono);
}

.demo-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.demo-header p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.comparison {
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0;
  align-items: stretch;
}

@media (max-width: 768px) {
  .comparison {
    flex-direction: column;
  }
}

.method-card {
  flex: 1;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  overflow: hidden;
}

.method-card.hmr {
  border-color: var(--vp-c-brand);
}

.card-header {
  background: var(--vp-c-bg-soft);
  padding: 0.6rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.card-header .icon {
  font-size: 1.25rem;
}

.card-header .title {
  font-weight: 600;
  font-size: 0.9rem;
}

.card-body {
  padding: 0.75rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.4rem 0;
  font-size: 0.8rem;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.step:last-child {
  border-bottom: none;
}

.step-num {
  width: 18px;
  height: 18px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: bold;
  flex-shrink: 0;
}

.step-text {
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.card-footer {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.75rem;
}

.time {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.state {
  color: var(--vp-c-text-2);
}

.vs-divider {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

.flow-diagram {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  padding: 0.75rem;
  margin-bottom: 1rem;
}

.flow-diagram h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.flow-steps {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.step-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  min-width: 60px;
}

.step-icon {
  font-size: 1.1rem;
}

.step-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-top: 0.1rem;
}

.step-arrow {
  color: var(--vp-c-brand);
  font-size: 1rem;
  font-weight: bold;
}

.support-table {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  padding: 0.75rem;
  overflow-x: auto;
}

.support-table h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.support-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

.support-table th,
.support-table td {
  padding: 0.5rem 0.6rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

.support-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.badge {
  display: inline-block;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: 500;
}

.badge.excellent {
  background: rgba(34, 197, 94, 0.2);
  color: #16a34a;
}

.badge.good {
  background: rgba(59, 130, 246, 0.2);
  color: #2563eb;
}

.badge.fair {
  background: rgba(245, 158, 11, 0.2);
  color: #d97706;
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
}

.info-box .icon {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .flow-steps {
    flex-direction: column;
  }

  .flow-step {
    flex-direction: column;
  }

  .step-arrow {
    transform: rotate(90deg);
  }
}
</style>
