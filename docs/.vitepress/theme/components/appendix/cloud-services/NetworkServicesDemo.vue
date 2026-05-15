<template>
  <div class="network-services-demo">
    <div class="demo-header">
      <h4>Cấu hình kiến trúc network trực quan</h4>
      <p class="demo-desc">
        Kéo thả các component để xây dựng kiến trúc network trên cloud
      </p>
    </div>

    <div class="network-builder">
      <div class="components-panel">
        <div class="panel-title">
          Component khả dụng
        </div>
        <div class="component-list">
          <div
            v-for="component in networkComponents"
            :key="component.id"
            class="component-item"
            draggable="true"
            @dragstart="onDragStart($event, component)"
          >
            <span class="component-icon">{{ component.icon }}</span>
            <span class="component-name">{{ component.name }}</span>
          </div>
        </div>
      </div>

      <div class="canvas-area">
        <div
          class="network-canvas"
          @drop="onDrop"
          @dragover.prevent
        >
          <div
            v-if="canvasItems.length === 0"
            class="empty-state"
          >
            <div class="empty-icon">
              🏗️
            </div>
            <div class="empty-text">
              Kéo component bên trái vào đây
            </div>
            <div class="empty-subtext">
              Bắt đầu xây dựng kiến trúc network của bạn
            </div>
          </div>

          <div
            v-for="(item, index) in canvasItems"
            :key="item.id"
            class="canvas-item"
            :class="item.type"
            :style="itemStyle(index)"
            @click="selectItem(item)"
          >
            <div class="item-icon">
              {{ item.icon }}
            </div>
            <div class="item-name">
              {{ item.name }}
            </div>
            <button
              class="remove-btn"
              @click.stop="removeItem(index)"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="selectedItem"
      class="config-panel"
    >
      <div class="config-header">
        <span class="config-icon">{{ selectedItem.icon }}</span>
        <span class="config-title">Cấu hình {{ selectedItem.name }}</span>
        <button
          class="close-config"
          @click="selectedItem = null"
        >
          ×
        </button>
      </div>

      <div class="config-content">
        <div class="config-section">
          <div class="section-title">
            Cấu hình AWS
          </div>
          <div class="service-name">
            {{ selectedItem.awsService }}
          </div>
          <div class="config-options">
            <div
              v-for="(option, idx) in selectedItem.awsOptions"
              :key="idx"
              class="option-item"
            >
              <span class="option-check">✓</span>
              <span>{{ option }}</span>
            </div>
          </div>
        </div>

        <div class="config-divider" />

        <div class="config-section">
          <div class="section-title aliyun-title">
            Cấu hình Alibaba Cloud
          </div>
          <div class="service-name aliyun-service">
            {{ selectedItem.aliyunService }}
          </div>
          <div class="config-options">
            <div
              v-for="(option, idx) in selectedItem.aliyunOptions"
              :key="idx"
              class="option-item"
            >
              <span class="option-check aliyun-check">✓</span>
              <span>{{ option }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="config-footer">
        <div class="price-compare">
          <div class="price-item">
            <span class="price-label">AWS:</span>
            <span class="price-value">{{ selectedItem.awsPrice }}</span>
          </div>
          <div class="price-item">
            <span class="price-label">Alibaba Cloud:</span>
            <span class="price-value aliyun-price">{{ selectedItem.aliyunPrice }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const canvasItems = ref([])
const selectedItem = ref(null)
let draggedItem = null

const networkComponents = [
  {
    id: 'vpc',
    name: 'VPC',
    icon: '🏠',
    type: 'network',
    awsService: 'Amazon VPC',
    aliyunService: 'VPC',
    awsOptions: [
      'Tự định nghĩa dải địa chỉ IP',
      'Phân chia subnet đa AZ',
      'Network ACL và Security Group',
      'VPC peering và Transit Gateway'
    ],
    aliyunOptions: [
      'Tự định nghĩa CIDR mạng private',
      'Triển khai switch xuyên AZ',
      'Security Group và Network ACL',
      'VPC interconnect và Cloud Enterprise Network'
    ],
    awsPrice: 'Miễn phí (lưu lượng trong subnet)',
    aliyunPrice: 'Miễn phí (lưu lượng cùng VPC)'
  },
  {
    id: 'cdn',
    name: 'CDN',
    icon: '🚀',
    type: 'network',
    awsService: 'Amazon CloudFront',
    aliyunService: 'CDN',
    awsOptions: [
      '400+ edge node toàn cầu',
      'Hỗ trợ tăng tốc static và dynamic content',
      'Lambda@Edge edge computing',
      'Tích hợp bảo vệ với AWS Shield'
    ],
    aliyunOptions: [
      'Phủ sóng 2800+ node trong nước',
      'Tăng tốc full-site và download',
      'Edge script và tối ưu cache',
      'Liên kết với WAF để bảo vệ'
    ],
    awsPrice: 'HTTP: từ $0.085/GB',
    aliyunPrice: 'HTTP: từ ¥0.15/GB'
  },
  {
    id: 'lb',
    name: 'Load Balancer',
    icon: '⚖️',
    type: 'network',
    awsService: 'Elastic Load Balancing',
    aliyunService: 'SLB Load Balancer',
    awsOptions: [
      'Nhiều loại ALB/NLB/CLB',
      'Tự động health check và failover',
      'SSL/TLS termination và quản lý certificate',
      'Tích hợp với Auto Scaling'
    ],
    aliyunOptions: [
      'Hỗ trợ đầy đủ ALB/NLB/CLB',
      'Chế độ HA active-standby và cluster',
      'Triển khai HTTPS certificate một-click',
      'Liên kết với ESS auto-scaling'
    ],
    awsPrice: 'ALB: $0.0225/giờ + LCU',
    aliyunPrice: 'ALB: ¥0.15/giờ + LCU'
  },
  {
    id: 'waf',
    name: 'WAF Firewall',
    icon: '🛡️',
    type: 'security',
    awsService: 'AWS WAF',
    aliyunService: 'Web Application Firewall',
    awsOptions: [
      'Managed rule và custom rule',
      'Rate limit và IP blacklist',
      'Tích hợp với CloudFront/ALB',
      'Bot Control quản lý bot'
    ],
    aliyunOptions: [
      'Chính sách bảo vệ sẵn và custom rule',
      'Chống CC attack và chặn IP',
      'Tích hợp liền mạch với CDN/SLB',
      'Risk control dữ liệu và quản lý crawler'
    ],
    awsPrice: '$5/tháng + $0.6/triệu request',
    aliyunPrice: 'Từ ¥980/tháng + phí lưu lượng'
  },
  {
    id: 'nat',
    name: 'NAT Gateway',
    icon: '🚪',
    type: 'network',
    awsService: 'NAT Gateway',
    aliyunService: 'NAT Gateway',
    awsOptions: [
      'Tự động HA, không cần quản lý',
      'Triển khai độc lập theo AZ',
      'Hỗ trợ SNAT outbound',
      'Monitoring lưu lượng và alert'
    ],
    aliyunOptions: [
      'Disaster recovery đa AZ',
      'Chọn bandwidth theo spec',
      'Hỗ trợ SNAT/DNAT',
      'Monitoring lưu lượng và số kết nối'
    ],
    awsPrice: '$0.045/giờ + $0.045/GB',
    aliyunPrice: '¥0.35/giờ + phí lưu lượng'
  }
]

const onDragStart = (event, component) => {
  draggedItem = component
  event.dataTransfer.effectAllowed = 'copy'
}

const onDrop = (event) => {
  event.preventDefault()
  if (draggedItem) {
    canvasItems.value.push({
      ...draggedItem,
      id: `${draggedItem.id}-${Date.now()}`
    })
    draggedItem = null
  }
}

const itemStyle = (index) => {
  const positions = [
    { top: '10%', left: '10%' },
    { top: '10%', right: '10%' },
    { bottom: '10%', left: '10%' },
    { bottom: '10%', right: '10%' },
    { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  ]
  return positions[index % positions.length]
}

const selectItem = (item) => {
  selectedItem.value = item
}

const removeItem = (index) => {
  canvasItems.value.splice(index, 1)
  if (selectedItem.value && !canvasItems.value.find(i => i.id === selectedItem.value.id)) {
    selectedItem.value = null
  }
}
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

.network-builder {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.components-panel {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 16px;
}

.panel-title {
  font-weight: 600;
  font-size: 0.875rem;
  color: #e6f1ff;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.component-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.component-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  cursor: grab;
  transition: all 0.2s ease;
}

.component-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.component-item:active {
  cursor: grabbing;
}

.component-icon {
  font-size: 1.25rem;
}

.component-name {
  font-size: 0.8125rem;
  color: #e6f1ff;
}

.canvas-area {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  min-height: 400px;
}

.network-canvas {
  position: relative;
  width: 100%;
  height: 400px;
}

.empty-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}

.empty-text {
  font-size: 1rem;
  color: #e6f1ff;
  margin-bottom: 4px;
}

.empty-subtext {
  font-size: 0.8125rem;
  color: #8892b0;
}

.canvas-item {
  position: absolute;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 12px 16px;
  min-width: 120px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.canvas-item:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: scale(1.05);
}

.canvas-item.network {
  border-color: rgba(0, 212, 255, 0.4);
  background: rgba(0, 212, 255, 0.1);
}

.canvas-item.security {
  border-color: rgba(255, 99, 99, 0.4);
  background: rgba(255, 99, 99, 0.1);
}

.item-icon {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.item-name {
  font-size: 0.8125rem;
  color: #e6f1ff;
  font-weight: 500;
}

.remove-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  background: #ff4444;
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.canvas-item:hover .remove-btn {
  opacity: 1;
}

.config-panel {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 20px;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.config-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.config-icon {
  font-size: 1.25rem;
}

.config-title {
  font-weight: 600;
  font-size: 1rem;
  color: #e6f1ff;
  flex: 1;
}

.close-config {
  background: none;
  border: none;
  color: #8892b0;
  font-size: 1.25rem;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-config:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.config-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.config-section {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  padding: 16px;
}

.section-title {
  font-size: 0.75rem;
  color: #ff9900;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.aliyun-title {
  color: #ff6a00;
}

.service-name {
  font-size: 1rem;
  font-weight: 600;
  color: #e6f1ff;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.aliyun-service {
  color: #e6f1ff;
}

.config-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 0.8125rem;
  color: #e6f1ff;
  line-height: 1.4;
}

.option-check {
  color: #ff9900;
  font-weight: 700;
  flex-shrink: 0;
}

.aliyun-check {
  color: #ff6a00;
}

.config-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.config-footer {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 12px 16px;
}

.price-compare {
  display: flex;
  justify-content: space-around;
  gap: 16px;
}

.price-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-label {
  font-size: 0.8125rem;
  color: #8892b0;
}

.price-value {
  font-size: 0.875rem;
  color: #e6f1ff;
  font-weight: 500;
}

.aliyun-price {
  color: #ff6a00;
}

@media (max-width: 768px) {
  .network-builder {
    grid-template-columns: 1fr;
  }

  .components-panel {
    max-height: 200px;
    
  }

  .config-content {
    grid-template-columns: 1fr;
  }

  .config-divider {
    display: none;
  }

  .price-compare {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
