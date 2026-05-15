<template>
  <div class="aws-vs-aliyun-demo">
    <div class="demo-header">
      <h4>AWS vs Alibaba Cloud - Khác biệt cốt lõi</h4>
      <p class="demo-desc">
        Click để xem so sánh theo từng khía cạnh
      </p>
    </div>

    <div class="comparison-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="comparison-content">
      <transition
        name="fade"
        mode="out-in"
      >
        <div
          :key="activeTab"
          class="tab-content"
        >
          <div class="vs-cards">
            <div class="vs-card aws-card">
              <div class="card-header">
                <div class="logo">
                  AWS
                </div>
                <div class="subtitle">
                  Amazon Web Services
                </div>
              </div>
              <div class="card-body">
                <div
                  v-for="(point, idx) in currentComparison.aws"
                  :key="idx"
                  class="point"
                >
                  <span class="check">✓</span>
                  <span>{{ point }}</span>
                </div>
              </div>
            </div>

            <div class="vs-divider">
              <div class="vs-text">
                VS
              </div>
            </div>

            <div class="vs-card aliyun-card">
              <div class="card-header">
                <div class="logo aliyun-logo">
                  Alibaba Cloud
                </div>
                <div class="subtitle">
                  Alibaba Cloud
                </div>
              </div>
              <div class="card-body">
                <div
                  v-for="(point, idx) in currentComparison.aliyun"
                  :key="idx"
                  class="point"
                >
                  <span class="check aliyun-check">✓</span>
                  <span>{{ point }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="verdict-box">
            <div class="verdict-title">
              💡 Gợi ý lựa chọn
            </div>
            <div class="verdict-text">
              {{ currentComparison.verdict }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('global')

const tabs = [
  { key: 'global', label: 'Phủ sóng toàn cầu' },
  { key: 'ecosystem', label: 'Hệ sinh thái' },
  { key: 'pricing', label: 'Chiến lược giá' },
  { key: 'enterprise', label: 'Dịch vụ doanh nghiệp' },
  { key: 'developer', label: 'Trải nghiệm developer' }
]

const comparisons = {
  global: {
    aws: [
      'Hơn 30 region toàn cầu, phủ sóng rộng nhất',
      'Hạ tầng tại các nước phát triển ổn định',
      'Kinh nghiệm tuân thủ dữ liệu xuyên biên giới phong phú'
    ],
    aliyun: [
      'Mật độ phủ sóng tại châu Á - Thái Bình Dương cao nhất',
      'Số node tại Trung Quốc đại lục dẫn đầu',
      'Triển khai tích cực tại khu vực Vành đai và Con đường'
    ],
    verdict: 'Vươn ra Âu - Mỹ thì chọn AWS, tập trung châu Á - Thái Bình Dương thì chọn Alibaba Cloud. Doanh nghiệp đa quốc gia có thể cân nhắc kiến trúc đa cloud.'
  },
  ecosystem: {
    aws: [
      'Đa dạng dịch vụ nhất (200+ service)',
      'Tích hợp với SaaS bên thứ ba cực mạnh',
      'Hỗ trợ open source toàn diện nhất'
    ],
    aliyun: [
      'Tích hợp liền mạch với sản phẩm hệ Alibaba',
      'Giải pháp cho e-commerce/bán lẻ hoàn thiện',
      'Hỗ trợ thay thế công nghệ nội địa tốt'
    ],
    verdict: 'Stack phức tạp, cần nhiều component thì chọn AWS; business hệ Alibaba, e-commerce/bán lẻ thì chọn Alibaba Cloud.'
  },
  pricing: {
    aws: [
      'Reserved instance giảm giá mạnh',
      'Spot instance giá cực rẻ',
      'Free tier tương đối hạn chế'
    ],
    aliyun: [
      'Ưu đãi cho user mới rất hấp dẫn',
      'Trả theo năm/tháng tỉ lệ chi phí tốt',
      'Nhiều ưu đãi cho sinh viên/developer'
    ],
    verdict: 'Workload ổn định lâu dài thì chọn AWS Reserved Instance; startup, ngân sách hạn chế thì chọn ưu đãi user mới của Alibaba Cloud.'
  },
  enterprise: {
    aws: [
      'Hệ thống hỗ trợ doanh nghiệp hoàn thiện',
      'Chứng nhận tuân thủ toàn diện nhất',
      'Giải pháp hybrid cloud (Outposts)'
    ],
    aliyun: [
      'Hỗ trợ bản địa hóa nhanh',
      'Hợp tác sâu với chính phủ/doanh nghiệp nhà nước',
      'Giải pháp private cloud/hybrid cloud hoàn thiện'
    ],
    verdict: 'Doanh nghiệp nước ngoài, yêu cầu tuân thủ nghiêm ngặt thì chọn AWS; khách hàng chính phủ, cần hỗ trợ bản địa hóa thì chọn Alibaba Cloud.'
  },
  developer: {
    aws: [
      'Chất lượng tài liệu là chuẩn mực của ngành',
      'Hệ thống chứng chỉ hoàn thiện',
      'Cộng đồng năng động nhất'
    ],
    aliyun: [
      'Tài liệu tiếng Trung chi tiết',
      'Lộ trình học rõ ràng',
      'Cộng đồng kỹ thuật năng động'
    ],
    verdict: 'Tiếng Anh tốt, muốn chứng chỉ quốc tế thì chọn AWS; developer dùng tiếng Trung, thích tài liệu tiếng Trung thì chọn Alibaba Cloud.'
  }
}

const currentComparison = computed(() => comparisons[activeTab.value])
</script>

<style scoped>
.aws-vs-aliyun-demo {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 12px;
  padding: 24px;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 20px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  background: linear-gradient(90deg, #00d4ff, #ff9900);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.demo-desc {
  margin: 0;
  color: #8892b0;
  font-size: 0.875rem;
}

.comparison-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.tab-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #8892b0;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.875rem;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e6f1ff;
}

.tab-btn.active {
  background: linear-gradient(135deg, #00d4ff, #7b2cbf);
  border-color: transparent;
  color: #fff;
}

.vs-cards {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.vs-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.aws-card {
  border-top: 3px solid #ff9900;
}

.aliyun-card {
  border-top: 3px solid #ff6a00;
}

.card-header {
  text-align: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff9900;
  margin-bottom: 4px;
}

.aliyun-logo {
  color: #ff6a00;
}

.subtitle {
  font-size: 0.75rem;
  color: #8892b0;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.point {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.875rem;
  color: #e6f1ff;
  line-height: 1.5;
}

.check {
  color: #ff9900;
  font-weight: 700;
  flex-shrink: 0;
}

.aliyun-check {
  color: #ff6a00;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-text {
  background: linear-gradient(135deg, #00d4ff, #7b2cbf);
  color: #fff;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
}

.verdict-box {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(123, 44, 191, 0.1));
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 12px;
  padding: 16px;
}

.verdict-title {
  font-weight: 600;
  color: #00d4ff;
  margin-bottom: 8px;
  font-size: 0.9375rem;
}

.verdict-text {
  color: #e6f1ff;
  font-size: 0.875rem;
  line-height: 1.6;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 768px) {
  .vs-cards {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .vs-divider {
    display: none;
  }

  .comparison-tabs {
    gap: 6px;
  }

  .tab-btn {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}
</style>
