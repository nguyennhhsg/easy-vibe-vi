<template>
  <div class="security-services-demo">
    <div class="demo-header">
      <h4>Trình cấu hình kiến trúc Security Services</h4>
      <p class="demo-desc">
        Chọn use case của bạn, sinh ngay giải pháp bảo mật
      </p>
    </div>

    <div class="scenario-selector">
      <div class="selector-title">
        Chọn use case
      </div>
      <div class="scenario-cards">
        <button
          v-for="scenario in scenarios"
          :key="scenario.id"
          class="scenario-btn"
          :class="{ active: selectedScenario === scenario.id }"
          @click="selectScenario(scenario.id)"
        >
          <span class="scenario-icon">{{ scenario.icon }}</span>
          <span class="scenario-name">{{ scenario.name }}</span>
        </button>
      </div>
    </div>

    <div
      v-if="selectedScenarioData"
      class="security-architecture"
    >
      <div class="architecture-header">
        <span class="header-icon">🏗️</span>
        <span class="header-title">Kiến trúc bảo mật đề xuất</span>
      </div>

      <div class="architecture-layers">
        <div class="layer edge-layer">
          <div class="layer-title">
            <span class="layer-icon">🌐</span>
            Edge protection layer
          </div>
          <div class="layer-services">
            <div class="service-card">
              <div class="service-header aws">
                <span class="service-name">{{ selectedScenarioData.edge.aws }}</span>
              </div>
              <div class="service-features">
                <div
                  v-for="(feat, idx) in selectedScenarioData.edge.awsFeatures"
                  :key="idx"
                  class="feature"
                >
                  ✓ {{ feat }}
                </div>
              </div>
            </div>
            <div class="vs-mini">
              VS
            </div>
            <div class="service-card">
              <div class="service-header aliyun">
                <span class="service-name">{{ selectedScenarioData.edge.aliyun }}</span>
              </div>
              <div class="service-features">
                <div
                  v-for="(feat, idx) in selectedScenarioData.edge.aliyunFeatures"
                  :key="idx"
                  class="feature"
                >
                  ✓ {{ feat }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="layer application-layer">
          <div class="layer-title">
            <span class="layer-icon">🔐</span>
            Application security layer
          </div>
          <div class="layer-services">
            <div class="service-card">
              <div class="service-header aws">
                <span class="service-name">{{ selectedScenarioData.app.aws }}</span>
              </div>
              <div class="service-features">
                <div
                  v-for="(feat, idx) in selectedScenarioData.app.awsFeatures"
                  :key="idx"
                  class="feature"
                >
                  ✓ {{ feat }}
                </div>
              </div>
            </div>
            <div class="vs-mini">
              VS
            </div>
            <div class="service-card">
              <div class="service-header aliyun">
                <span class="service-name">{{ selectedScenarioData.app.aliyun }}</span>
              </div>
              <div class="service-features">
                <div
                  v-for="(feat, idx) in selectedScenarioData.app.aliyunFeatures"
                  :key="idx"
                  class="feature"
                >
                  ✓ {{ feat }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="layer data-layer">
          <div class="layer-title">
            <span class="layer-icon">🗝️</span>
            Data security layer
          </div>
          <div class="layer-services">
            <div class="service-card">
              <div class="service-header aws">
                <span class="service-name">{{ selectedScenarioData.data.aws }}</span>
              </div>
              <div class="service-features">
                <div
                  v-for="(feat, idx) in selectedScenarioData.data.awsFeatures"
                  :key="idx"
                  class="feature"
                >
                  ✓ {{ feat }}
                </div>
              </div>
            </div>
            <div class="vs-mini">
              VS
            </div>
            <div class="service-card">
              <div class="service-header aliyun">
                <span class="service-name">{{ selectedScenarioData.data.aliyun }}</span>
              </div>
              <div class="service-features">
                <div
                  v-for="(feat, idx) in selectedScenarioData.data.aliyunFeatures"
                  :key="idx"
                  class="feature"
                >
                  ✓ {{ feat }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="security-recommendations">
        <div class="rec-title">
          💡 Khuyến nghị bảo mật
        </div>
        <div class="rec-list">
          <div
            v-for="(rec, idx) in selectedScenarioData.recommendations"
            :key="idx"
            class="rec-item"
          >
            <span class="rec-num">{{ idx + 1 }}</span>
            <span class="rec-text">{{ rec }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedScenario = ref('web')

const scenarios = [
  { id: 'web', name: 'Web Application', icon: '🌐' },
  { id: 'api', name: 'API Service', icon: '🔌' },
  { id: 'mobile', name: 'Mobile App', icon: '📱' },
  { id: 'enterprise', name: 'Enterprise System', icon: '🏢' }
]

const scenarioData = {
  web: {
    edge: {
      aws: 'CloudFront + WAF',
      aliyun: 'CDN + WAF',
      awsFeatures: ['400+ edge node toàn cầu', 'DDoS protection và Bot management', 'Tự động mã hóa SSL/TLS'],
      aliyunFeatures: ['2800+ node tại Trung Quốc', 'Chống CC attack và anti-crawler', 'Triển khai HTTPS certificate một-click']
    },
    app: {
      aws: 'AWS WAF + Shield',
      aliyun: 'Web Application Firewall',
      awsFeatures: ['Chống SQL injection và XSS', 'Rate limit và IP blacklist', 'Managed rule và custom rule'],
      aliyunFeatures: ['Chống OWASP Top 10', 'Chống rò rỉ dữ liệu nhạy cảm', 'Chính sách CC protection thông minh']
    },
    data: {
      aws: 'KMS + Secrets Manager',
      aliyun: 'KMS + Credentials Manager',
      awsFeatures: ['Thuật toán mã hóa AES-256', 'Tự động xoay vòng khóa', 'Tích hợp native với dịch vụ AWS'],
      aliyunFeatures: ['Hỗ trợ SM crypto', 'Quản lý version khóa', 'RAM kiểm soát phân quyền chi tiết']
    },
    recommendations: [
      'Bật HTTPS redirect bắt buộc, cấu hình HSTS header',
      'Cấu hình WAF rule để chống SQL injection, XSS và các tấn công phổ biến',
      'Bật CDN cache cho static asset, giảm tải origin server',
      'Cấu hình mã hóa dữ liệu nhạy cảm, dùng KMS để quản lý khóa'
    ]
  },
  api: {
    edge: {
      aws: 'API Gateway + WAF',
      aliyun: 'API Gateway + WAF',
      awsFeatures: ['Quản lý version API và kiểm soát lưu lượng', 'Caching và throttling', 'Chuyển đổi request/response'],
      aliyunFeatures: ['Phát hành API và quản lý lifecycle', 'Kiểm soát lưu lượng và rate limit', 'Validate parameter và Mock data']
    },
    app: {
      aws: 'Cognito + IAM',
      aliyun: 'Application Identity Service + RAM',
      awsFeatures: ['OAuth 2.0 và OpenID Connect', 'User pool và identity pool', 'MFA multi-factor authentication'],
      aliyunFeatures: ['Hỗ trợ protocol OIDC và SAML', 'Tích hợp AD/LDAP doanh nghiệp', 'Xác thực thực và device fingerprint']
    },
    data: {
      aws: 'KMS + Parameter Store',
      aliyun: 'KMS + Application Configuration',
      awsFeatures: ['Lưu API key mã hóa', 'Quản lý version config', 'Tích hợp với CloudFormation'],
      aliyunFeatures: ['Mã hóa config nhạy cảm', 'Gray release config', 'Audit thay đổi config']
    },
    recommendations: [
      'Triển khai authentication/authorization, dùng OAuth 2.0 hoặc API Key',
      'Cấu hình rate limit của API gateway để chống brute force',
      'Áp dụng IP whitelist cho API nhạy cảm',
      'Lưu mã hóa API key và config nhạy cảm'
    ]
  },
  mobile: {
    edge: {
      aws: 'CloudFront + WAF',
      aliyun: 'CDN + WAF',
      awsFeatures: ['Tối ưu mạng mobile', 'Hỗ trợ HTTP/2 và QUIC', 'Nén thông minh và tối ưu hình ảnh'],
      aliyunFeatures: ['Giải pháp tăng tốc mobile', 'Tối ưu môi trường mạng yếu', 'Điều chỉnh bitrate adaptive']
    },
    app: {
      aws: 'Cognito + Device Farm',
      aliyun: 'Application Identity Service + Mobile Testing',
      awsFeatures: ['Nhận diện device fingerprint', 'Đánh giá rủi ro thiết bị', 'Phát hiện jailbreak/Root'],
      aliyunFeatures: ['Xác thực thiết bị tin cậy', 'Phát hiện thiết bị gian lận', 'Bàn phím nhập liệu bảo mật']
    },
    data: {
      aws: 'KMS + S3',
      aliyun: 'KMS + OSS',
      awsFeatures: ['Mã hóa dữ liệu mobile', 'Mã hóa local cache', 'Lưu trữ khóa an toàn'],
      aliyunFeatures: ['Hỗ trợ SM4', 'Mã hóa database local', 'Bảo vệ white-box khóa']
    },
    recommendations: [
      'Triển khai device binding và device fingerprint',
      'Phát hiện thiết bị jailbreak/Root và hạn chế truy cập',
      'Mã hóa lưu trữ dữ liệu nhạy cảm local',
      'Dùng HTTPS certificate pinning để chống tấn công MITM'
    ]
  },
  enterprise: {
    edge: {
      aws: 'CloudFront + WAF + Shield Advanced',
      aliyun: 'CDN + WAF + DDoS Pro',
      awsFeatures: ['Tự động giảm thiểu DDoS', 'Hỗ trợ DRT team 24/7', 'Đảm bảo cost protection'],
      aliyunFeatures: ['Năng lực chống DDoS cấp Tbps', 'Làm sạch CC attack thông minh', 'Ứng phó khẩn cấp từ chuyên gia']
    },
    app: {
      aws: 'IAM + SSO + Directory Service',
      aliyun: 'RAM + IDaaS + Cloud SSO',
      awsFeatures: ['Tích hợp AD doanh nghiệp', 'Single Sign-On SSO', 'Temporary credentials và permission boundary'],
      aliyunFeatures: ['Đồng bộ LDAP/AD directory', 'Tích hợp SaaS application', 'Quản lý phân quyền chi tiết']
    },
    data: {
      aws: 'KMS + CloudHSM + Macie',
      aliyun: 'KMS + Encryption Service + Sensitive Data Protection',
      awsFeatures: ['HSM FIPS 140-2 Level 3', 'Tự động phát hiện dữ liệu nhạy cảm', 'Quản lý khóa phân cấp'],
      aliyunFeatures: ['HSM được chứng nhận SM', 'Tự động nhận diện dữ liệu nhạy cảm', 'Báo cáo audit tuân thủ']
    },
    recommendations: [
      'Triển khai DDoS Pro và bảo vệ WAF nhiều lớp',
      'Triển khai IAM thống nhất và SSO',
      'Bật mã hóa dữ liệu và bảo vệ dữ liệu nhạy cảm',
      'Xây dựng hệ thống audit bảo mật và monitoring tuân thủ'
    ]
  }
}

const selectScenario = (id) => {
  selectedScenario.value = id
}

const currentScenario = computed(() => scenarioData[selectedScenario.value])
</script>

<style scoped>
.network-services-demo {
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
  margin-bottom: 20px;
}

.selector-title {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #e6f1ff;
  margin-bottom: 12px;
}

.scenario-cards {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.scenario-btn {
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

.scenario-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.scenario-btn.active {
  background: linear-gradient(135deg, #00d4ff, #7b2cbf);
  border-color: transparent;
  color: #fff;
}

.scenario-icon {
  font-size: 1rem;
}

.security-architecture {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 20px;
}

.architecture-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-icon {
  font-size: 1.25rem;
}

.header-title {
  font-weight: 600;
  font-size: 1rem;
  color: #e6f1ff;
}

.architecture-layers {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.layer {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  padding: 16px;
}

.layer-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.9375rem;
  color: #e6f1ff;
  margin-bottom: 12px;
}

.layer-icon {
  font-size: 1.25rem;
}

.layer-services {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  align-items: start;
}

.service-card {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  overflow: hidden;
}

.service-header {
  padding: 10px 12px;
  font-weight: 600;
  font-size: 0.875rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.service-header.aws {
  background: rgba(255, 153, 0, 0.2);
  color: #ff9900;
}

.service-header.aliyun {
  background: rgba(255, 106, 0, 0.2);
  color: #ff6a00;
}

.service-features {
  padding: 12px;
}

.feature {
  font-size: 0.8125rem;
  color: #e6f1ff;
  padding: 4px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.feature:last-child {
  border-bottom: none;
}

.vs-mini {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #00d4ff, #7b2cbf);
  color: #fff;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 0.625rem;
  font-weight: 700;
  align-self: center;
}

.security-recommendations {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.rec-title {
  font-weight: 600;
  font-size: 1rem;
  color: #00d4ff;
  margin-bottom: 12px;
}

.rec-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rec-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: rgba(255, 255, 255, 0.03);
  padding: 10px 12px;
  border-radius: 6px;
  border-left: 3px solid #00d4ff;
}

.rec-num {
  background: linear-gradient(135deg, #00d4ff, #7b2cbf);
  color: #fff;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.rec-text {
  font-size: 0.875rem;
  color: #e6f1ff;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .scenario-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .layer-services {
    grid-template-columns: 1fr;
  }

  .vs-mini {
    display: none;
  }

  .config-content {
    grid-template-columns: 1fr;
  }
}
</style>
