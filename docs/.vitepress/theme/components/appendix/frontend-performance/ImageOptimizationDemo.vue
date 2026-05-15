<!--
  ImageOptimizationDemo.vue
  Demo so sánh các định dạng ảnh
-->
<template>
  <div class="image-optimization-demo">
    <div class="header">
      <div class="title">
        So sánh định dạng ảnh: cân bằng giữa dung lượng và chất lượng
      </div>
      <div class="subtitle">
        So sánh dung lượng và chất lượng giữa các định dạng ảnh khác nhau
      </div>
    </div>

    <div class="format-grid">
      <div
        v-for="format in formats"
        :key="format.name"
        class="format-card"
        :class="{ selected: selectedFormat === format.name }"
        @click="selectFormat(format.name)"
      >
        <div class="format-header">
          <div class="format-name">
            {{ format.name }}
          </div>
          <div
            class="format-badge"
            :class="format.badgeClass"
          >
            {{ format.badge }}
          </div>
        </div>

        <div
          class="format-preview"
          :style="{ background: format.gradient }"
        >
          <div class="preview-content">
            <div class="preview-image">
              🖼️
            </div>
            <div class="preview-size">
              {{ format.size }}
            </div>
          </div>
        </div>

        <div class="format-metrics">
          <div class="metric">
            <span class="metric-label">Dung lượng file</span>
            <span class="metric-value">{{ format.fileSize }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Tỉ lệ nén</span>
            <span class="metric-value">{{ format.compression }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Chất lượng</span>
            <div class="quality-bar">
              <div
                class="quality-fill"
                :style="{ width: format.quality + '%' }"
              />
            </div>
          </div>
          <div class="metric">
            <span class="metric-label">Hỗ trợ trình duyệt</span>
            <span class="metric-value">{{ format.support }}</span>
          </div>
        </div>

        <div class="format-use-case">
          <div class="use-case-label">
            Tình huống phù hợp
          </div>
          <div class="use-case-value">
            {{ format.useCase }}
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <h4>So sánh chi tiết</h4>
      <table>
        <thead>
          <tr>
            <th>Định dạng</th>
            <th>Dung lượng</th>
            <th>Chất lượng</th>
            <th>Trong suốt</th>
            <th>Animation</th>
            <th>Mức khuyến nghị</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="format in formats"
            :key="format.name"
          >
            <td>
              <strong>{{ format.name }}</strong>
            </td>
            <td>{{ format.sizeLevel }}</td>
            <td>{{ format.qualityLevel }}</td>
            <td>{{ format.transparency ? '✓' : '✗' }}</td>
            <td>{{ format.animation ? '✓' : '✗' }}</td>
            <td>
              <div class="recommendation">
                <div class="stars">
                  {{ '★'.repeat(Math.round(format.rating))
                  }}{{ '☆'.repeat(5 - Math.round(format.rating)) }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="tips">
      <div class="tip-card">
        <div class="tip-icon">
          💡
        </div>
        <div class="tip-content">
          <h4>Gợi ý tối ưu</h4>
          <ul>
            <li>Ưu tiên dùng định dạng WebP, có thể giảm 30-50% dung lượng</li>
            <li>Chuẩn bị phương án dự phòng JPEG/PNG cho các trình duyệt cũ</li>
            <li>
              Dùng phần tử
              <code class="inline-code">&lt;picture&gt;</code> để tự động dùng định dạng dự phòng
            </li>
            <li>Ảnh chụp dùng JPEG, icon dùng PNG hoặc SVG</li>
          </ul>
        </div>
      </div>

      <div class="tip-card">
        <div class="tip-icon">
          🔧
        </div>
        <div class="tip-content">
          <h4>Công cụ gợi ý</h4>
          <ul>
            <li><strong>Squoosh</strong>: công cụ nén ảnh open-source của Google</li>
            <li><strong>ImageOptim</strong>: công cụ tối ưu ảnh trên macOS</li>
            <li><strong>TinyPNG</strong>: nén ảnh thông minh online, hỗ trợ WebP</li>
            <li><strong>Sharp</strong>: thư viện xử lý ảnh trên Node.js, hợp tự động hoá</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedFormat = ref('WebP')

const formats = [
  {
    name: 'JPEG',
    badge: 'Kinh điển',
    badgeClass: 'classic',
    size: '500 KB',
    fileSize: '500 KB',
    compression: '70%',
    quality: 85,
    support: '100%',
    useCase: 'Ảnh chụp, ảnh phức tạp',
    sizeLevel: 'Trung bình',
    qualityLevel: 'Tốt',
    transparency: false,
    animation: false,
    rating: 4,
    gradient: 'linear-gradient(135deg, #60a5fa, #3b82f6)'
  },
  {
    name: 'PNG',
    badge: 'Không mất',
    badgeClass: 'lossless',
    size: '1.2 MB',
    fileSize: '1.2 MB',
    compression: '40%',
    quality: 100,
    support: '100%',
    useCase: 'Ảnh có trong suốt, icon',
    sizeLevel: 'Lớn',
    qualityLevel: 'Hoàn hảo',
    transparency: true,
    animation: false,
    rating: 4.5,
    gradient: 'linear-gradient(135deg, #a78bfa, #8b5cf6)'
  },
  {
    name: 'WebP',
    badge: 'Nên dùng',
    badgeClass: 'recommended',
    size: '250 KB',
    fileSize: '250 KB',
    compression: '85%',
    quality: 90,
    support: '95%',
    useCase: 'Hầu hết tình huống',
    sizeLevel: 'Nhỏ',
    qualityLevel: 'Xuất sắc',
    transparency: true,
    animation: true,
    rating: 5,
    gradient: 'linear-gradient(135deg, #34d399, #10b981)'
  },
  {
    name: 'AVIF',
    badge: 'Mới nhất',
    badgeClass: 'latest',
    size: '180 KB',
    fileSize: '180 KB',
    compression: '90%',
    quality: 95,
    support: '75%',
    useCase: 'Khi cần performance tối đa',
    sizeLevel: 'Nhỏ nhất',
    qualityLevel: 'Vượt trội',
    transparency: true,
    animation: false,
    rating: 4.5,
    gradient: 'linear-gradient(135deg, #f472b6, #ec4899)'
  }
]

function selectFormat(name) {
  selectedFormat.value = name
}
</script>

<style scoped>
.image-optimization-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.format-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.format-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s;
}

.format-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.format-card.selected {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.format-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.format-name {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.format-badge {
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.format-badge.classic {
  background: #dbeafe;
  color: #1e40af;
}

.format-badge.lossless {
  background: #ede9fe;
  color: #5b21b6;
}

.format-badge.recommended {
  background: #d1fae5;
  color: #065f46;
}

.format-badge.latest {
  background: #fce7f3;
  color: #9d174d;
}

.format-preview {
  height: 120px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.preview-content {
  text-align: center;
  color: #fff;
}

.preview-image {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.preview-size {
  font-size: 0.9rem;
  font-weight: 600;
}

.format-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.metric-label {
  color: var(--vp-c-text-2);
}

.metric-value {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.quality-bar {
  width: 80px;
  height: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 999px;
  overflow: hidden;
}

.quality-fill {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #14b8a6);
  transition: width 0.3s;
}

.format-use-case {
  padding-top: 0.8rem;
  border-top: 1px solid var(--vp-c-divider);
}

.use-case-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
}

.use-case-value {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.comparison-table {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.comparison-table h4 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

thead {
  background: var(--vp-c-bg-soft);
}

th {
  padding: 0.8rem;
  text-align: left;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-bottom: 2px solid var(--vp-c-divider);
}

td {
  padding: 0.8rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

tr:last-child td {
  border-bottom: none;
}

.stars {
  color: #f59e0b;
}

.tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.tip-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.2rem;
  display: flex;
  gap: 1rem;
}

.tip-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
}

.tip-content h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
  color: var(--vp-c-text-1);
}

.tip-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tip-content li {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 0.3rem;
}

.tip-content li:last-child {
  margin-bottom: 0;
}

.inline-code {
  background: var(--vp-c-bg-soft);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
}
</style>
