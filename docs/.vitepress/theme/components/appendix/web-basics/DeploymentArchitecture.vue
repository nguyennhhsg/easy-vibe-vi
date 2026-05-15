<template>
  <div class="deployment-architecture">
    <div class="architecture-view">
      <div class="view-selector">
        <button
          v-for="(view, index) in views"
          :key="index"
          class="view-btn"
          :class="{ active: currentView === index }"
          @click="currentView = index"
        >
          {{ view.name }}
        </button>
      </div>

      <div class="architecture-diagram">
        <!-- Kiến trúc cơ bản -->
        <div
          v-if="currentView === 0"
          class="basic-architecture"
        >
          <div class="user-node">
            <div class="node-icon">
              👤
            </div>
            <div class="node-label">
              Người dùng
            </div>
          </div>

          <div class="arrow-down">
            ↓
          </div>

          <div class="domain-node">
            <div class="node-icon">
              🌐
            </div>
            <div class="node-label">
              Tên miền
            </div>
            <div class="node-desc">
              example.com
            </div>
          </div>

          <div class="arrow-down">
            ↓ Phân giải DNS
          </div>

          <div class="server-node">
            <div class="node-icon">
              🖥️
            </div>
            <div class="node-label">
              Máy chủ
            </div>
            <div class="node-desc">
              IP: 1.2.3.4
            </div>
          </div>

          <div class="arrow-down">
            ↓
          </div>

          <div class="web-node">
            <div class="node-icon">
              🌍
            </div>
            <div class="node-label">
              Ứng dụng Web
            </div>
          </div>
        </div>

        <!-- Kiến trúc CDN -->
        <div
          v-if="currentView === 1"
          class="cdn-architecture"
        >
          <div class="user-nodes">
            <div class="user-node china">
              <div class="node-icon">
                🇨🇳
              </div>
              <div class="node-label">
                Người dùng Trung Quốc
              </div>
            </div>
            <div class="user-node usa">
              <div class="node-icon">
                🇺🇸
              </div>
              <div class="node-label">
                Người dùng Mỹ
              </div>
            </div>
          </div>

          <div class="arrow-group">
            <div class="arrow-left">
              ↙
            </div>
            <div class="arrow-right">
              ↘
            </div>
          </div>

          <div class="cdn-nodes">
            <div class="cdn-node">
              <div class="node-icon">
                📡
              </div>
              <div class="node-label">
                Node CDN Bắc Kinh
              </div>
            </div>
            <div class="cdn-node">
              <div class="node-icon">
                📡
              </div>
              <div class="node-label">
                Node CDN New York
              </div>
            </div>
          </div>

          <div class="arrow-down">
            ↓ Cache miss
          </div>

          <div class="origin-node">
            <div class="node-icon">
              🖥️
            </div>
            <div class="node-label">
              Máy chủ gốc
            </div>
          </div>
        </div>

        <!-- Cân bằng tải -->
        <div
          v-if="currentView === 2"
          class="loadbalancer-architecture"
        >
          <div class="user-node">
            <div class="node-icon">
              👥
            </div>
            <div class="node-label">
              Yêu cầu của người dùng
            </div>
          </div>

          <div class="arrow-down">
            ↓
          </div>

          <div class="lb-node">
            <div class="node-icon">
              ⚖️
            </div>
            <div class="node-label">
              Bộ cân bằng tải
            </div>
          </div>

          <div class="arrow-group">
            <div class="arrow-1">
              ↖
            </div>
            <div class="arrow-2">
              ↑
            </div>
            <div class="arrow-3">
              ↗
            </div>
          </div>

          <div class="server-nodes">
            <div class="server-node">
              <div class="node-icon">
                🖥️
              </div>
              <div class="node-label">
                Máy chủ 1
              </div>
            </div>
            <div class="server-node">
              <div class="node-icon">
                🖥️
              </div>
              <div class="node-label">
                Máy chủ 2
              </div>
            </div>
            <div class="server-node">
              <div class="node-icon">
                🖥️
              </div>
              <div class="node-label">
                Máy chủ 3
              </div>
            </div>
          </div>
        </div>

        <!-- Kiến trúc hoàn chỉnh -->
        <div
          v-if="currentView === 3"
          class="full-architecture"
        >
          <div class="user-nodes">
            <div class="user-node">
              <div class="node-icon">
                👤
              </div>
              <div class="node-label">
                Người dùng
              </div>
            </div>
          </div>

          <div class="arrow-down">
            ↓
          </div>

          <div class="dns-node">
            <div class="node-icon">
              🔍
            </div>
            <div class="node-label">
              DNS
            </div>
          </div>

          <div class="arrow-down">
            ↓
          </div>

          <div class="cdn-lb-row">
            <div class="cdn-node">
              <div class="node-icon">
                📡
              </div>
              <div class="node-label">
                CDN
              </div>
            </div>
            <div class="lb-node">
              <div class="node-icon">
                ⚖️
              </div>
              <div class="node-label">
                LB
              </div>
            </div>
          </div>

          <div class="arrow-down">
            ↓
          </div>

          <div class="server-cluster">
            <div class="server-node">
              <div class="node-icon">
                🖥️
              </div>
              <div class="node-label">
                Web 1
              </div>
            </div>
            <div class="server-node">
              <div class="node-icon">
                🖥️
              </div>
              <div class="node-label">
                Web 2
              </div>
            </div>
            <div class="server-node">
              <div class="node-icon">
                💾
              </div>
              <div class="node-label">
                Database
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-cards">
      <div
        v-if="currentView === 0"
        class="info-card"
      >
        <div class="card-title">
          🌐 Tên miền (Domain)
        </div>
        <div class="card-content">
          <strong>Tên miền là gì?</strong>
          <br>Tên miền là địa chỉ của trang web, ví dụ example.com, dễ nhớ và truy cập. <br><br>
          <strong>Đăng ký tên miền</strong>
          <br>• Nhà đăng ký: GoDaddy, Namecheap, Alibaba Cloud <br>•
          Chọn đuôi: .com, .cn, .org, .io <br>• Giá: $10-50/năm
        </div>
      </div>

      <div
        v-if="currentView === 1"
        class="info-card"
      >
        <div class="card-title">
          📡 CDN (Mạng phân phối nội dung)
        </div>
        <div class="card-content">
          <strong>CDN là gì?</strong>
          <br>Lưu nội dung vào bộ nhớ đệm tại các node trên toàn cầu, người dùng truy cập gần nhất. <br><br>
          <strong>Ưu điểm</strong>
          <br>• Tăng tốc truy cập: lấy nội dung từ node gần nhất <br>• Giảm tải: giảm áp lực cho máy chủ gốc <br>•
          Tăng độ sẵn sàng: tự động chuyển node khi có sự cố <br><br>
          <strong>CDN phổ biến</strong>
          <br>• Cloudflare, AWS CloudFront, Alibaba Cloud CDN
        </div>
      </div>

      <div
        v-if="currentView === 2"
        class="info-card"
      >
        <div class="card-title">
          ⚖️ Cân bằng tải (Load Balancer)
        </div>
        <div class="card-content">
          <strong>Cân bằng tải là gì?</strong>
          <br>Phân phối yêu cầu đến nhiều máy chủ, tăng khả năng xử lý song song. <br><br>
          <strong>Thuật toán cân bằng tải</strong>
          <br>• Round Robin (xoay vòng) <br>• Least Connections (ít kết nối nhất)
          <br>• IP Hash (băm IP) <br><br>
          <strong>Công cụ phổ biến</strong>
          <br>• Nginx, HAProxy, AWS ELB
        </div>
      </div>

      <div
        v-if="currentView === 3"
        class="info-card"
      >
        <div class="card-title">
          🏗️ Kiến trúc triển khai hoàn chỉnh
        </div>
        <div class="card-content">
          <strong>Kiến trúc ứng dụng Web hiện đại</strong>
          <br><br>
          1. Người dùng truy cập qua tên miền
          <br>2. DNS phân giải đến CDN hoặc bộ cân bằng tải <br>3. CDN lưu cache tài nguyên tĩnh
          <br>4. Bộ cân bằng tải phân phối yêu cầu <br>5. Máy chủ Web xử lý yêu cầu động <br>6.
          Database lưu trữ dữ liệu bền vững <br><br>
          <strong>Giám sát và vận hành</strong>
          <br>• Thu thập log, giám sát hiệu năng, sao lưu tự động
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentView = ref(0)

const views = [
  { name: 'Kiến trúc cơ bản' },
  { name: 'Tăng tốc CDN' },
  { name: 'Cân bằng tải' },
  { name: 'Kiến trúc hoàn chỉnh' }
]
</script>

<style scoped>
.deployment-architecture {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.architecture-view {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 25px;
}

.view-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  justify-content: center;
  flex-wrap: wrap;
}

.view-btn {
  padding: 10px 20px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.view-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.view-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
}

.architecture-diagram {
  min-height: 300px;
}

.node-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.node-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.node-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.user-node,
.domain-node,
.server-node,
.web-node,
.cdn-node,
.lb-node,
.dns-node,
.origin-node {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 15px;
  text-align: center;
  margin: 0 auto;
  max-width: 200px;
}

.arrow-down {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  margin: 10px 0;
}

.basic-architecture {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.cdn-architecture {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.user-nodes {
  display: flex;
  gap: 30px;
  justify-content: center;
}

.user-node.china {
  background: #ffebee;
  border-color: #f44336;
}

.user-node.usa {
  background: #e3f2fd;
  border-color: #2196f3;
}

.arrow-group {
  display: flex;
  gap: 20px;
  font-size: 2rem;
  color: var(--vp-c-text-3);
}

.cdn-nodes {
  display: flex;
  gap: 20px;
}

.cdn-node {
  background: #e8f5e9;
  border-color: #4caf50;
}

.loadbalancer-architecture {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.lb-node {
  background: #fff3e0;
  border-color: #ff9800;
}

.server-nodes {
  display: flex;
  gap: 15px;
}

.full-architecture {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.cdn-lb-row {
  display: flex;
  gap: 20px;
}

.server-cluster {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.info-cards {
  display: grid;
  gap: 15px;
}

.info-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  border-left: 4px solid var(--vp-c-brand);
}

.card-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.card-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

@media (max-width: 768px) {
  .user-nodes,
  .cdn-nodes,
  .server-nodes,
  .cdn-lb-row,
  .server-cluster {
    flex-direction: column;
    align-items: center;
  }
}
</style>
