<template>
  <div class="architecture-comparison-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">So sánh tiến hóa kiến trúc</span>
      <span class="subtitle">Đặc điểm cốt lõi của 4 thời đại kiến trúc</span>
    </div>

    <div class="comparison-grid">
      <div
        v-for="era in eras"
        :key="era.name"
        class="era-card"
        :class="{ active: selectedEra === era.name }"
        @click="selectedEra = era.name"
      >
        <div class="era-icon">
          {{ era.icon }}
        </div>
        <div class="era-name">
          {{ era.name }}
        </div>
        <div class="era-year">
          {{ era.year }}
        </div>
        <div class="era-tag">
          {{ era.tag }}
        </div>
      </div>
    </div>

    <div
      v-if="selectedEra"
      class="detail-panel"
    >
      <div class="detail-header">
        <span class="detail-icon">{{ currentEra.icon }}</span>
        <h5>{{ currentEra.name }} ({{ currentEra.year }})</h5>
      </div>

      <div class="detail-content">
        <div class="feature-section">
          <h6>🏗️ Đặc điểm kiến trúc</h6>
          <ul>
            <li
              v-for="(feat, i) in currentEra.features"
              :key="i"
            >
              {{ feat }}
            </li>
          </ul>
        </div>

        <div class="feature-section">
          <h6>✅ Ưu điểm</h6>
          <ul>
            <li
              v-for="(pro, i) in currentEra.pros"
              :key="i"
            >
              {{ pro }}
            </li>
          </ul>
        </div>

        <div class="feature-section">
          <h6>❌ Điểm đau</h6>
          <ul>
            <li
              v-for="(con, i) in currentEra.cons"
              :key="i"
            >
              {{ con }}
            </li>
          </ul>
        </div>

        <div class="tech-stack">
          <h6>🔧 Công nghệ điển hình</h6>
          <div class="tech-tags">
            <span
              v-for="(tech, i) in currentEra.techs"
              :key="i"
              class="tech-tag"
            >{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Tư tưởng cốt lõi:</strong> Tiến hóa kiến trúc nhằm giải quyết điểm đau của thời đại trước, nhưng cũng mang lại độ phức tạp mới.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedEra = ref('Monolith')

const eras = [
  { name: 'Máy vật lý', icon: '🖥️', year: '1990s', tag: 'Đơn máy' },
  { name: 'Monolith', icon: '🏢', year: '2000s', tag: 'Tập trung' },
  { name: 'Microservice', icon: '🏭', year: '2010s', tag: 'Phân tán' },
  { name: 'Serverless', icon: '☁️', year: '2020s+', tag: 'Không server' }
]

const eraDetails = {
  'Máy vật lý': {
    features: ['Triển khai đơn máy, không dự phòng', 'Upload code thủ công qua FTP', 'Mở rộng dọc (mua máy mạnh hơn)', 'Chưa có khái niệm quản trị dịch vụ'],
    pros: ['Triển khai đơn giản, không cần cấu hình phức tạp', 'Hiệu năng đơn máy tốt, không có độ trễ mạng', 'Dễ debug và truy vết sự cố'],
    cons: ['Lỗi single point, dịch vụ ngừng hoạt động', 'Khó mở rộng, chỉ có thể scale dọc', 'Vận hành thủ công, hiệu suất thấp'],
    techs: ['Apache/Nginx', 'CGI/Perl', 'FTP/SFTP', 'Máy chủ vật lý']
  },
  'Monolith': {
    features: ['Một codebase duy nhất, tech stack thống nhất', 'Dùng chung database, transaction nhất quán', 'Triển khai thống nhất, release tổng thể', 'Giao tiếp trong process, không có overhead mạng'],
    pros: ['Phát triển đơn giản, dễ bắt đầu', 'Test thuận tiện, chạy local là được', 'Triển khai đơn giản, một gói là xong'],
    cons: ['Code coupling cao, sửa một chỗ ảnh hưởng toàn bộ', 'Tech stack đơn nhất, khó đưa vào công nghệ mới', 'Khó cộng tác khi team mở rộng'],
    techs: ['Spring/Django/Rails', 'Tomcat/Gunicorn', 'MySQL/PostgreSQL', 'Maven/Gradle']
  },
  'Microservice': {
    features: ['Tách dịch vụ, triển khai độc lập', 'Tech stack đa dạng, tự do lựa chọn', 'Database độc lập, nhất quán cuối cùng', 'Giao tiếp mạng giữa các dịch vụ'],
    pros: ['Dịch vụ độc lập, team tự chủ', 'Tech stack linh hoạt, chọn thứ phù hợp nhất', 'Cô lập lỗi, không ảnh hưởng toàn cục'],
    cons: ['Độ phức tạp phân tán, khó debug', 'Độ trễ mạng, hao tổn hiệu năng', 'Chi phí vận hành tăng vọt'],
    techs: ['Docker/Kubernetes', 'gRPC/REST', 'Kafka/RabbitMQ', 'Prometheus/Grafana']
  },
  'Serverless': {
    features: ['Đơn vị là hàm, event-driven', 'Auto scale, tính phí theo nhu cầu', 'Không quản lý server, nền tảng host', 'Cold start, có độ trễ'],
    pros: ['Không cần vận hành, tập trung vào business', 'Tự động mở rộng, ứng phó peak traffic', 'Trả phí theo lần gọi, chi phí thấp'],
    cons: ['Độ trễ cold start', 'Lock-in nền tảng, khó migrate', 'Khó debug, khó tái hiện local'],
    techs: ['AWS Lambda', 'Vercel/Cloudflare', 'Supabase/Firebase', 'EventBridge']
  }
}

const currentEra = computed(() => {
  const name = selectedEra.value
  return {
    icon: eras.find(e => e.name === name)?.icon || '🏗️',
    name,
    year: eras.find(e => e.name === name)?.year || '',
    ...eraDetails[name]
  }
})
</script>

<style scoped>
.architecture-comparison-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header .icon {
  font-size: 1rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  margin-left: 0.4rem;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.era-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.era-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.era-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.era-icon {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.era-name {
  font-weight: 600;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.1rem;
}

.era-year {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.25rem;
}

.era-tag {
  display: inline-block;
  padding: 0.1rem 0.3rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.55rem;
  color: var(--vp-c-text-2);
}

.detail-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1rem;
}

.detail-header h5 {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.detail-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
}

.feature-section {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.4rem;
}

.feature-section h6 {
  margin: 0 0 0.3rem 0;
  font-size: 0.7rem;
  color: var(--vp-c-brand);
}

.feature-section ul {
  margin: 0;
  padding-left: 0.75rem;
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
}

.feature-section li {
  margin-bottom: 0.15rem;
  line-height: 1.3;
}

.feature-section li:last-child {
  margin-bottom: 0;
}

.tech-stack {
  grid-column: 1 / -1;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.4rem;
}

.tech-stack h6 {
  margin: 0 0 0.3rem 0;
  font-size: 0.7rem;
  color: var(--vp-c-brand);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tech-tag {
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  font-size: 0.6rem;
  color: var(--vp-c-text-2);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
  display: flex;
  gap: 0.2rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .detail-content {
    grid-template-columns: 1fr;
  }
}
</style>