<template>
  <div class="database-services-demo">
    <div class="demo-header">
      <h4>Trợ lý chọn database</h4>
      <p class="demo-desc">
        Đề xuất giải pháp database phù hợp nhất theo đặc điểm business của bạn
      </p>
    </div>

    <div class="db-selection">
      <div class="db-categories">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="cat-btn"
          :class="{ active: selectedCategory === cat.id }"
          @click="selectCategory(cat.id)"
        >
          <span class="cat-icon">{{ cat.icon }}</span>
          <span class="cat-name">{{ cat.name }}</span>
        </button>
      </div>

      <div
        v-if="selectedCategory"
        class="db-comparison"
      >
        <div class="comparison-header">
          <span class="aws-badge">AWS</span>
          <span class="vs-text">so sánh</span>
          <span class="aliyun-badge">Alibaba Cloud</span>
        </div>

        <div class="db-cards">
          <div class="db-card">
            <div class="db-header aws">
              <div class="db-name">
                {{ currentCategory.aws }}
              </div>
            </div>
            <div class="db-body">
              <div class="feature-list">
                <div
                  v-for="(feat, i) in currentCategory.awsFeatures"
                  :key="i"
                  class="feature"
                >
                  ✓ {{ feat }}
                </div>
              </div>
              <div class="price-tag">
                {{ currentCategory.awsPrice }}
              </div>
            </div>
          </div>

          <div class="db-card">
            <div class="db-header aliyun">
              <div class="db-name">
                {{ currentCategory.aliyun }}
              </div>
            </div>
            <div class="db-body">
              <div class="feature-list">
                <div
                  v-for="(feat, i) in currentCategory.aliyunFeatures"
                  :key="i"
                  class="feature"
                >
                  ✓ {{ feat }}
                </div>
              </div>
              <div class="price-tag aliyun">
                {{ currentCategory.aliyunPrice }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('relational')

const categories = [
  { id: 'relational', name: 'Relational Database', icon: '📊' },
  { id: 'nosql', name: 'NoSQL Database', icon: '📦' },
  { id: 'cache', name: 'Cache Service', icon: '⚡' },
  { id: 'analytics', name: 'Analytics Database', icon: '📈' }
]

const categoryData = {
  relational: {
    aws: 'Amazon RDS / Aurora',
    aliyun: 'RDS / PolarDB',
    awsFeatures: ['Hỗ trợ MySQL/PostgreSQL/Oracle/SQL Server', 'Aurora hiệu năng gấp 5 lần', 'Tự động failover và read replica', 'Serverless auto-scaling'],
    aliyunFeatures: ['Hỗ trợ MySQL/SQL Server/PostgreSQL/Oracle', 'PolarDB tách compute-storage', 'Backup/restore trong vài giây', 'Tương thích cú pháp Oracle'],
    awsPrice: 'Từ $0.017/giờ',
    aliyunPrice: 'Từ ¥0.12/giờ'
  },
  nosql: {
    aws: 'Amazon DynamoDB',
    aliyun: 'Tablestore',
    awsFeatures: ['NoSQL key-value và document database fully managed', 'Single-table design hỗ trợ quy mô PB', 'DAX in-memory cache tăng tốc', 'Global table replicate đa region'],
    aliyunFeatures: ['NoSQL database distributed', 'Auto sharding và load balancing', 'Secondary index và full-text search', 'Read/write latency cấp millisecond'],
    awsPrice: 'On-demand $1.25/triệu write',
    aliyunPrice: 'Pay-as-you-go 0.4¥/10k write'
  },
  cache: {
    aws: 'Amazon ElastiCache',
    aliyun: 'Cloud Database Redis',
    awsFeatures: ['Redis và Memcached được managed', 'Cluster mode auto sharding', 'Read replica và auto failover', 'Backup/restore và snapshot'],
    aliyunFeatures: ['Kiến trúc master-slave', 'Auto failover', 'Khả năng read-write splitting', 'Backup dữ liệu persistent'],
    awsPrice: 'Từ $0.012/giờ',
    aliyunPrice: 'Từ ¥0.08/giờ'
  },
  analytics: {
    aws: 'Amazon Redshift',
    aliyun: 'AnalyticDB',
    awsFeatures: ['Data warehouse cấp PB', 'Columnar storage và compression', 'Spectrum query data từ S3', 'Concurrency scaling và auto optimization'],
    aliyunFeatures: ['Analytics database real-time', 'MPP massive parallel processing', 'Query đồng thời cao, độ trễ thấp', 'Auto index và tối ưu'],
    awsPrice: 'Từ $0.25/giờ',
    aliyunPrice: 'Từ ¥2.0/giờ'
  }
}

const selectCategory = (id) => {
  selectedCategory.value = id
}

const currentCategory = computed(() => categoryData[selectedCategory.value])
</script>

<style scoped>
.database-services-demo {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 12px;
  padding: 24px;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  background: linear-gradient(90deg, #00d4ff, #7b2cbf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.demo-desc {
  margin: 0;
  color: #8892b0;
  font-size: 0.875rem;
}

.db-selection {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 20px;
}

.db-categories {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.cat-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e6f1ff;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.cat-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.cat-btn.active {
  background: linear-gradient(135deg, #00d4ff, #7b2cbf);
  border-color: transparent;
  color: #fff;
}

.cat-icon {
  font-size: 1rem;
}

.comparison-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.aws-badge, .aliyun-badge {
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 0.8125rem;
  font-weight: 600;
}

.aws-badge {
  background: rgba(255, 153, 0, 0.2);
  color: #ff9900;
}

.aliyun-badge {
  background: rgba(255, 106, 0, 0.2);
  color: #ff6a00;
}

.vs-text {
  color: #8892b0;
  font-size: 0.75rem;
}

.db-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.db-card {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

.db-header {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.db-header.aws {
  background: rgba(255, 153, 0, 0.1);
}

.db-header.aliyun {
  background: rgba(255, 106, 0, 0.1);
}

.db-name {
  font-size: 1rem;
  font-weight: 600;
  color: #e6f1ff;
}

.db-body {
  padding: 16px;
}

.feature-list {
  margin-bottom: 12px;
}

.feature {
  font-size: 0.8125rem;
  color: #e6f1ff;
  padding: 4px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.price-tag {
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
  text-align: center;
}

.price-tag.aliyun {
  color: #ff6a00;
  background: rgba(255, 106, 0, 0.1);
}

@media (max-width: 768px) {
  .db-categories {
    justify-content: center;
  }

  .db-cards {
    grid-template-columns: 1fr;
  }
}
</style>
