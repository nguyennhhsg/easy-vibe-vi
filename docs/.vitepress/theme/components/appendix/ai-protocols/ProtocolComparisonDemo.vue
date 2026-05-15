<template>
  <div class="protocol-comparison-demo">
    <div class="demo-header">
      <span class="title">MCP vs A2A</span>
      <span class="subtitle">Khác biệt định vị giữa hai protocol cho AI agent</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn đang ở trong một <span class="highlight">trung tâm thương mại lớn</span>: MCP giống như "chuẩn ổ cắm thống nhất" của trung tâm, để mọi thiết bị (công cụ) đều cắm vào dùng được; A2A giống như "hệ thống bộ đàm nội bộ" để các cửa hàng (agent) phối hợp với nhau.
    </div>

    <div class="protocol-cards">
      <div class="protocol-card mcp">
        <div class="card-header">
          <span class="card-title">MCP</span>
          <span class="card-badge">Kết nối công cụ</span>
        </div>
        <div class="card-fullname">Model Context Protocol</div>
        <div class="card-desc">
          Protocol kết nối AI với công cụ và nguồn dữ liệu bên ngoài, viết code công cụ một lần là mọi ứng dụng AI đều dùng được
        </div>
        <div class="card-meta">
          <div class="meta-item">
            <span class="meta-label">Khởi xướng</span>
            <span class="meta-value">Anthropic</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Phát hành</span>
            <span class="meta-value">2024.11</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Kiến trúc</span>
            <span class="meta-value">Client-Server</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Định dạng dữ liệu</span>
            <span class="meta-value">JSON-RPC 2.0</span>
          </div>
        </div>
        <div class="card-analogy">
          <span class="analogy-label">Liên hệ</span>
          <span class="analogy-text">Cổng USB-C — thống nhất cách sạc cho mọi thiết bị</span>
        </div>
      </div>

      <div class="protocol-card a2a">
        <div class="card-header">
          <span class="card-title">A2A</span>
          <span class="card-badge">Phối hợp agent</span>
        </div>
        <div class="card-fullname">Agent-to-Agent Protocol</div>
        <div class="card-desc">
          Protocol giao tiếp giữa các agent, cho phép agent từ nhà cung cấp và framework khác nhau phối hợp mượt mà
        </div>
        <div class="card-meta">
          <div class="meta-item">
            <span class="meta-label">Khởi xướng</span>
            <span class="meta-value">Google</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Phát hành</span>
            <span class="meta-value">2025.04</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Kiến trúc</span>
            <span class="meta-value">Peer-to-Peer</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Định dạng dữ liệu</span>
            <span class="meta-value">HTTP + JSON</span>
          </div>
        </div>
        <div class="card-analogy">
          <span class="analogy-label">Liên hệ</span>
          <span class="analogy-text">Slack/Teams nội bộ — đồng nghiệp giao việc, nhắn tin với nhau</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Ý tưởng cốt lõi:</strong> MCP và A2A không cạnh tranh mà bổ trợ cho nhau. MCP giải quyết "AI lấy năng lực bên ngoài thế nào", A2A giải quyết "nhiều AI phối hợp ra sao".
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.protocol-comparison-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.intro-text .highlight {
  color: var(--vp-c-brand);
  font-weight: 500;
}

.protocol-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.protocol-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  background: var(--vp-c-bg);
}

.protocol-card.mcp {
  border-left: 3px solid #3b82f6;
}

.protocol-card.a2a {
  border-left: 3px solid #10b981;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.card-icon {
  font-size: 1.25rem;
}

.card-title {
  font-weight: bold;
  font-size: 1.1rem;
}

.card-badge {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  margin-left: auto;
}

.protocol-card.mcp .card-badge {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.protocol-card.a2a .card-badge {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.card-fullname {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.4rem;
}

.card-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  margin-bottom: 0.6rem;
}

.card-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.meta-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
}

.meta-value {
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.card-analogy {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.analogy-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.analogy-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
  align-items: flex-start;
}

.info-box .icon {
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .protocol-cards {
    grid-template-columns: 1fr;
  }
}
</style>
