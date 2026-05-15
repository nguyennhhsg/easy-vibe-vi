<template>
  <div class="spa-navigation-demo">
    <div class="demo-header">
      <span class="icon">🚀</span>
      <span class="title">Quy trình điều hướng SPA</span>
      <span class="subtitle">Hành trình từ click đến render</span>
    </div>

    <div class="intro-text">
      Hãy hình dung bạn đang <span class="highlight">gọi món tại nhà hàng</span>: từ xem menu, đặt món, bếp chuẩn bị, đến khi món ra bàn. Điều hướng SPA cũng vậy: sau khi người dùng kích hoạt, hệ thống đi qua một loạt bước rồi "phục vụ" món mới (trang) đến trước mặt bạn.
    </div>

    <div class="flow-container">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="flow-step"
      >
        <div class="step-number">
          {{ index + 1 }}
        </div>
        <div class="step-content">
          <div class="step-title">
            {{ step.title }}
          </div>
          <div class="step-desc">
            {{ step.desc }}
          </div>
        </div>
      </div>
    </div>

    <div class="highlight-box">
      <h5>⚡ Điểm tối ưu then chốt</h5>
      <div class="optimization-tips">
        <div class="tip-item">
          <span class="tip-icon">🎯</span>
          <div class="tip-content">
            <div class="tip-title">
              Lazy load route
            </div>
            <div class="tip-desc">
              Tải component theo nhu cầu, giảm kích thước bundle ban đầu
            </div>
          </div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🛡️</span>
          <div class="tip-content">
            <div class="tip-title">
              Preload trong guard
            </div>
            <div class="tip-desc">
              Tải trước dữ liệu trong beforeEnter để cải thiện trải nghiệm
            </div>
          </div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">⚡</span>
          <div class="tip-content">
            <div class="tip-title">
              Hiệu ứng chuyển trang
            </div>
            <div class="tip-desc">
              Thêm animation chuyển trang để điều hướng mượt hơn
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ưu điểm cốt lõi:</strong> Toàn bộ quy trình diễn ra trong trình duyệt, không cần máy chủ tham gia, trải nghiệm mượt như ứng dụng native. Đây chính là lợi thế lớn nhất của SPA so với MPA truyền thống.
    </div>
  </div>
</template>

<script setup>
const steps = [
  { title: 'Kích hoạt điều hướng', desc: 'Người dùng nhấp link hoặc gọi router.push()' },
  { title: 'URL thay đổi', desc: 'Thanh địa chỉ trình duyệt cập nhật, History API ghi nhận trạng thái' },
  { title: 'Khớp route', desc: 'Router khớp cấu hình route tương ứng theo URL' },
  { title: 'Kiểm tra guard', desc: 'Chạy guard toàn cục, guard riêng cho route và guard trong component' },
  { title: 'Tải component', desc: 'Component lazy-load được tải bất đồng bộ và phân giải' },
  { title: 'Render component', desc: 'Component mới được mount vào DOM, trang cập nhật' },
  { title: 'Hook sau', desc: 'Chạy hook afterEach, hoàn tất điều hướng' }
]
</script>

<style scoped>
.spa-navigation-demo {
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

.flow-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
  transition: all 0.2s;
}

.flow-step:hover {
  background: var(--vp-c-bg-soft);
  transform: translateX(4px);
}

.step-number {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.step-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}

.highlight-box {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.highlight-box h5 {
  margin: 0 0 0.75rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.optimization-tips {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tip-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.tip-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
}

.tip-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.tip-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon { margin-right: 0.25rem; }

@media (max-width: 768px) {
  .flow-step {
    padding: 0.5rem;
  }

  .step-number {
    width: 24px;
    height: 24px;
    font-size: 0.75rem;
  }
}
</style>
