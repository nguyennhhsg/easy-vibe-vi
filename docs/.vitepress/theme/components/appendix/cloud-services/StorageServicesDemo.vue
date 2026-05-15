<template>
  <div class="storage-services-demo">
    <div class="demo-header">
      <h4>Trợ lý chọn dịch vụ Storage</h4>
      <p class="demo-desc">
        Đề xuất giải pháp storage phù hợp nhất theo use case của bạn
      </p>
    </div>

    <div class="scenario-selector">
      <div class="selector-title">
        Chọn use case chính của bạn:
      </div>
      <div class="scenario-grid">
        <button
          v-for="scenario in scenarios"
          :key="scenario.id"
          class="scenario-card"
          :class="{ active: selectedScenario === scenario.id }"
          @click="selectScenario(scenario.id)"
        >
          <div class="scenario-icon">
            {{ scenario.icon }}
          </div>
          <div class="scenario-name">
            {{ scenario.name }}
          </div>
          <div class="scenario-desc">
            {{ scenario.shortDesc }}
          </div>
        </button>
      </div>
    </div>

    <div
      v-if="selectedScenario"
      class="recommendation-result"
    >
      <div class="result-header">
        <span class="result-icon">🎯</span>
        <span class="result-title">Giải pháp đề xuất</span>
      </div>

      <div class="storage-comparison">
        <div class="provider-card aws">
          <div class="provider-header">
            <div class="provider-logo">
              AWS
            </div>
            <div class="provider-service">
              {{ currentScenario.awsService }}
            </div>
          </div>
          <div class="provider-features">
            <div
              v-for="(feature, idx) in currentScenario.awsFeatures"
              :key="idx"
              class="feature-item"
            >
              <span class="check">✓</span>
              <span>{{ feature }}</span>
            </div>
          </div>
          <div class="provider-pricing">
            <div class="price-label">
              Mô hình giá
            </div>
            <div class="price-value">
              {{ currentScenario.awsPricing }}
            </div>
          </div>
        </div>

        <div class="vs-divider">
          <div class="vs-line" />
          <div class="vs-badge">
            VS
          </div>
          <div class="vs-line" />
        </div>

        <div class="provider-card aliyun">
          <div class="provider-header">
            <div class="provider-logo aliyun-logo">
              Alibaba Cloud
            </div>
            <div class="provider-service">
              {{ currentScenario.aliyunService }}
            </div>
          </div>
          <div class="provider-features">
            <div
              v-for="(feature, idx) in currentScenario.aliyunFeatures"
              :key="idx"
              class="feature-item"
            >
              <span class="check aliyun-check">✓</span>
              <span>{{ feature }}</span>
            </div>
          </div>
          <div class="provider-pricing">
            <div class="price-label">
              Mô hình giá
            </div>
            <div class="price-value">
              {{ currentScenario.aliyunPricing }}
            </div>
          </div>
        </div>
      </div>

      <div class="decision-guide">
        <div class="guide-title">
          🤔 Chọn thế nào?
        </div>
        <div class="guide-content">
          <div class="guide-item">
            <div class="guide-condition">
              Chọn AWS nếu:
            </div>
            <div class="guide-reason">
              {{ currentScenario.chooseAwsWhen }}
            </div>
          </div>
          <div class="guide-item">
            <div class="guide-condition">
              Chọn Alibaba Cloud nếu:
            </div>
            <div class="guide-reason">
              {{ currentScenario.chooseAliyunWhen }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedScenario = ref(null)

const scenarios = [
  {
    id: 'website',
    name: 'Static Website Hosting',
    icon: '🌐',
    shortDesc: 'Host các tài nguyên tĩnh HTML/CSS/JS',
    awsService: 'Amazon S3 + CloudFront',
    aliyunService: 'OSS + CDN',
    awsFeatures: [
      'Tăng tốc qua 400+ edge node toàn cầu',
      'Tự động nén và hỗ trợ HTTP/2',
      'Tích hợp liền mạch với Route 53',
      'Hỗ trợ cấu hình static website hosting'
    ],
    aliyunFeatures: [
      'Phủ sóng 2800+ node tại Trung Quốc',
      'Nén thông minh và hỗ trợ QUIC protocol',
      'Bind domain Wanwang một-click',
      'Phân tích log và monitoring real-time'
    ],
    awsPricing: 'Storage $0.023/GB/tháng + Traffic $0.085-0.12/GB',
    aliyunPricing: 'Storage ¥0.12/GB/tháng + Traffic ¥0.24-0.80/GB',
    chooseAwsWhen: 'User chủ yếu ở nước ngoài, cần tăng tốc toàn cầu, hoặc đã dùng dịch vụ AWS khác',
    chooseAliyunWhen: 'User chủ yếu ở Trung Quốc đại lục, cần hỗ trợ ICP, ưu tiên tốc độ truy cập trong nước'
  },
  {
    id: 'database',
    name: 'Database Storage',
    icon: '🗄️',
    shortDesc: 'Relational và non-relational database',
    awsService: 'Amazon RDS/Aurora',
    aliyunService: 'RDS/PolarDB',
    awsFeatures: [
      'Aurora hiệu năng gấp 5 lần MySQL',
      'Tự động failover và read replica',
      'Hỗ trợ 6 database engine',
      'Serverless tự động co giãn'
    ],
    aliyunFeatures: [
      'PolarDB kiến trúc tách compute-storage',
      'One-write multi-read, read-write splitting',
      'Backup và restore trong vài giây',
      'Tương thích cú pháp Oracle'
    ],
    awsPricing: 'On-demand $0.017-0.68/giờ, Reserved tiết kiệm 40-60%',
    aliyunPricing: 'Pay-as-you-go ¥0.12-4.8/giờ, trả theo năm/tháng ưu đãi hơn',
    chooseAwsWhen: 'Cần hiệu năng Aurora, hoặc cần nhiều database engine khác nhau',
    chooseAliyunWhen: 'Cần tương thích Oracle, hoặc ưu tiên chi phí và hỗ trợ bản địa'
  },
  {
    id: 'backup',
    name: 'Backup và Archive',
    icon: '💾',
    shortDesc: 'Cold data và archive storage dài hạn',
    awsService: 'Amazon S3 Glacier',
    aliyunService: 'OSS Archive Storage',
    awsFeatures: [
      'Glacier Deep Archive rẻ nhất',
      'Thời gian retrieve từ phút đến giờ',
      'S3 Lifecycle policy tự động migrate',
      'Chính sách lưu trữ WORM tuân thủ'
    ],
    aliyunFeatures: [
      'Archive storage giá thấp nhất ngành',
      'Thời gian thaw có thể cấu hình',
      'Cross-region redundancy storage',
      'Tuân thủ yêu cầu trong nước'
    ],
    awsPricing: 'Glacier $0.004/GB/tháng, Deep Archive $0.00099/GB/tháng',
    aliyunPricing: 'Archive Storage ¥0.033/GB/tháng, Cold Archive còn rẻ hơn',
    chooseAwsWhen: 'Cần chi phí siêu thấp Deep Archive, hoặc cần lifecycle policy phức tạp',
    chooseAliyunWhen: 'Dữ liệu cần archive trong nước, hoặc ưu tiên chi phí tối ưu'
  },
  {
    id: 'media',
    name: 'Media Processing',
    icon: '🎬',
    shortDesc: 'Lưu trữ và phân phối audio/video',
    awsService: 'S3 + Elemental',
    aliyunService: 'OSS + Media Processing',
    awsFeatures: [
      'Elemental xử lý video chuyên nghiệp',
      'MediaConvert transcode format',
      'MediaLive xử lý live stream',
      'CloudFront phân phối độ trễ thấp'
    ],
    aliyunFeatures: [
      'Video screenshot, transcode, watermark',
      'Thumbnail thông minh và content moderation',
      'Live recording và time-shift playback',
      'Phân phối tăng tốc CDN toàn cầu'
    ],
    awsPricing: 'Tính theo usage, transcode $0.007-0.1/phút',
    aliyunPricing: 'Pay-as-you-go, transcode ¥0.03-0.5/phút',
    chooseAwsWhen: 'Cần xử lý cấp broadcast, hoặc phân phối live toàn cầu',
    chooseAliyunWhen: 'Cần content moderation thông minh, hoặc xử lý video trong nước'
  }
]

const selectScenario = (id) => {
  selectedScenario.value = id
}

const currentScenario = computed(() => {
  return scenarios.find(s => s.id === selectedScenario.value)
})
</script>

<style scoped>
.storage-services-demo {
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

.scenario-selector {
  margin-bottom: 24px;
}

.selector-title {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #e6f1ff;
  margin-bottom: 12px;
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.scenario-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
}

.scenario-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
}

.scenario-card.active {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(123, 44, 191, 0.15));
  border-color: rgba(0, 212, 255, 0.3);
}

.scenario-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.scenario-name {
  font-weight: 600;
  font-size: 0.9375rem;
  color: #e6f1ff;
  margin-bottom: 4px;
}

.scenario-desc {
  font-size: 0.75rem;
  color: #8892b0;
}

.recommendation-result {
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.result-icon {
  font-size: 1.25rem;
}

.result-title {
  font-weight: 600;
  font-size: 1rem;
  color: #e6f1ff;
}

.storage-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.provider-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.provider-card.aws {
  border-top: 3px solid #ff9900;
}

.provider-card.aliyun {
  border-top: 3px solid #ff6a00;
}

.provider-header {
  text-align: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.provider-logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ff9900;
}

.provider-logo.aliyun-logo {
  color: #ff6a00;
}

.provider-service {
  font-size: 0.8125rem;
  color: #8892b0;
  margin-top: 4px;
}

.provider-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 0.8125rem;
  color: #e6f1ff;
  line-height: 1.4;
}

.check {
  color: #ff9900;
  font-weight: 700;
  flex-shrink: 0;
}

.aliyun-check {
  color: #ff6a00;
}

.provider-pricing {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 10px;
}

.price-label {
  font-size: 0.75rem;
  color: #8892b0;
  margin-bottom: 4px;
}

.price-value {
  font-size: 0.8125rem;
  color: #e6f1ff;
  font-weight: 500;
}

.vs-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.vs-line {
  width: 1px;
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
}

.vs-badge {
  background: linear-gradient(135deg, #00d4ff, #7b2cbf);
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
}

.decision-guide {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 16px;
}

.guide-title {
  font-weight: 600;
  font-size: 1rem;
  color: #e6f1ff;
  margin-bottom: 12px;
}

.guide-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.guide-item {
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  border-left: 3px solid #00d4ff;
}

.guide-condition {
  font-size: 0.8125rem;
  color: #00d4ff;
  font-weight: 500;
  margin-bottom: 4px;
}

.guide-reason {
  font-size: 0.875rem;
  color: #e6f1ff;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .scenario-grid {
    grid-template-columns: 1fr;
  }

  .storage-comparison {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .vs-divider {
    display: none;
  }
}
</style>
