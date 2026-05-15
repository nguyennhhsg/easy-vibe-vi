<template>
  <div class="mpa-routing-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">MPA vs SPA</span>
      <span class="subtitle">Đa trang vs Đơn trang</span>
    </div>

    <div class="intro-text">
      Hãy hình dung bạn đang <span class="highlight">ăn nhà hàng</span>: MPA giống như mỗi lần gọi món lại <span class="highlight">đổi sang nhà hàng khác</span> (tải lại toàn trang), còn SPA thì giống như đổi món trong cùng một nhà hàng (chỉ cập nhật phần cần thay đổi). Rõ ràng SPA cho trải nghiệm mượt mà hơn!
    </div>

    <div class="comparison-container">
      <div class="mode-box mpa">
        <div class="mode-header">
          <span class="mode-icon">🏢</span>
          <span class="mode-title">MPA (Multi-Page App)</span>
        </div>
        <div class="flow-steps">
          <div class="step">
            1. Người dùng nhấp vào link
          </div>
          <div class="step">
            2. Trình duyệt gửi HTTP request
          </div>
          <div class="step">
            3. Máy chủ trả về HTML đầy đủ
          </div>
          <div class="step">
            4. Trình duyệt phân tích và render trang mới
          </div>
          <div class="step">
            5. Tài nguyên trang tải lại (JS/CSS)
          </div>
        </div>
        <div class="mode-features">
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>Thân thiện SEO</span>
          </div>
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>First paint nhanh</span>
          </div>
          <div class="feature bad">
            <span class="feature-icon">✗</span>
            <span>Có nháy trắng trang</span>
          </div>
        </div>
      </div>

      <div class="mode-box spa">
        <div class="mode-header">
          <span class="mode-icon">⚡</span>
          <span class="mode-title">SPA (Single Page App)</span>
        </div>
        <div class="flow-steps">
          <div class="step">
            1. Người dùng nhấp vào link
          </div>
          <div class="step">
            2. Chặn hành vi mặc định
          </div>
          <div class="step">
            3. Cập nhật URL (History API)
          </div>
          <div class="step">
            4. Khớp cấu hình routing
          </div>
          <div class="step">
            5. Render component mới động
          </div>
          <div class="step">
            6. Trang cập nhật không cần refresh
          </div>
        </div>
        <div class="mode-features">
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>Chuyển trang mượt</span>
          </div>
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>Trải nghiệm tốt</span>
          </div>
          <div class="feature bad">
            <span class="feature-icon">✗</span>
            <span>Cần SSR để hỗ trợ SEO</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Khác biệt cốt lõi:</strong> MPA mỗi lần điều hướng đều phải tải lại toàn trang, SPA chỉ tải lúc đầu, sau đó chỉ cập nhật phần thay đổi. Đó là lý do SPA cho cảm giác "nhanh hơn".
    </div>
  </div>
</template>

<script setup>
const comparisonData = [
  { feature: 'Tải trang', mpa: 'Mỗi lần điều hướng tải toàn trang', spa: 'Sau lần tải đầu chỉ cập nhật nội dung' },
  { feature: 'URL thay đổi', mpa: 'Thanh địa chỉ trình duyệt thay đổi như bình thường', spa: 'History API điều khiển URL' },
  { feature: 'Trải nghiệm người dùng', mpa: 'Có nháy trắng trang', spa: 'Chuyển mượt, không refresh' },
  { feature: 'Thân thiện SEO', mpa: 'Tự nhiên thân thiện với công cụ tìm kiếm', spa: 'Cần SSR/prerender để tối ưu' },
  { feature: 'Thời gian màn hình đầu', mpa: 'Nhanh (chỉ tải trang hiện tại)', spa: 'Chậm hơn (tải toàn bộ app)' }
]
</script>

<style scoped>
.mpa-routing-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.mode-box {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.mode-header {
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.mode-box.mpa .mode-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.mode-box.spa .mode-header {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.mode-icon {
  font-size: 1.25rem;
}

.mode-title {
  font-size: 0.9rem;
  font-weight: 600;
}

.flow-steps {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand);
}

.mode-features {
  padding: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.feature-icon {
  font-size: 0.9rem;
}

.feature .feature-icon {
  color: #27c93f;
}

.feature.bad .feature-icon {
  color: #ff5f56;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
}

.info-box .icon { margin-right: 0.25rem; }

@media (max-width: 768px) {
  .comparison-container {
    grid-template-columns: 1fr;
  }
}
</style>
