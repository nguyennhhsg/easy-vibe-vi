<!--
  PerformanceOverviewDemo.vue
  Bức tranh tổng quan tối ưu performance frontend: thể hiện quan hệ giữa nút thắt và các cách giải

  Tương tác:
  - Bấm vào từng nhóm (transfer, rendering, execution) để xem nút thắt và giải pháp tương ứng
  - Trình bày trực quan ảnh hưởng của nút thắt tới trải nghiệm người dùng
-->
<template>
  <div class="performance-overview">
    <div class="header">
      <div class="title">
        Bức tranh tổng quan tối ưu performance frontend
      </div>
      <div class="subtitle">
        Bấm vào các nhóm phía dưới để khám phá nút thắt và giải pháp tối ưu tương ứng
      </div>
    </div>

    <!-- Chuyển nhóm -->
    <div class="dimension-tabs">
      <button
        v-for="dim in dimensions"
        :key="dim.id"
        class="tab-btn"
        :class="{ active: currentDim.id === dim.id }"
        @click="currentDim = dim"
      >
        <span class="icon">{{ dim.icon }}</span>
        <span class="text">{{ dim.name }}</span>
      </button>
    </div>

    <!-- Khu nội dung -->
    <div
      class="content-area"
      :class="currentDim.id"
    >
      <div class="panel bottlenecks">
        <h3>
          <span class="icon">⚠️</span>
          Nút thắt thường gặp (Bottlenecks)
        </h3>
        <ul class="list">
          <li
            v-for="(item, index) in currentDim.bottlenecks"
            :key="index"
          >
            <div class="item-title">
              {{ item.title }}
            </div>
            <div class="item-desc">
              {{ item.desc }}
            </div>
          </li>
        </ul>
      </div>

      <div class="arrow">
        <div class="arrow-line" />
        <div class="arrow-text">
          Cách xử lý?
        </div>
      </div>

      <div class="panel solutions">
        <h3>
          <span class="icon">🚀</span>
          Giải pháp tối ưu (Solutions)
        </h3>
        <ul class="list">
          <li
            v-for="(item, index) in currentDim.solutions"
            :key="index"
          >
            <div class="item-title">
              {{ item.title }}
            </div>
            <div class="item-desc">
              {{ item.desc }}
            </div>
            <div class="tags">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="tag"
              >{{ tag }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Thanh tóm tắt -->
    <div class="summary-bar">
      <p>
        <strong>Mục tiêu chính:</strong>
        {{ currentDim.goal }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dimensions = [
  {
    id: 'network',
    name: 'Tầng truyền tải (Network)',
    icon: '📡',
    goal: 'Đưa tài nguyên đến trình duyệt nhanh hơn (giảm dung lượng, giảm số request, rút ngắn quãng đường)',
    bottlenecks: [
      { title: 'Dung lượng lớn', desc: 'Ảnh và JS bundle chưa nén, tải lâu' },
      { title: 'Quá nhiều request', desc: 'HTTP/1.1 bị nghẽn đầu hàng, tài nguyên phải xếp hàng tải' },
      { title: 'Độ trễ mạng', desc: 'Server cách xa người dùng, RTT cao' }
    ],
    solutions: [
      { title: 'Nén tài nguyên', desc: 'Gzip/Brotli, đổi định dạng ảnh (WebP)', tags: ['Giảm dung lượng'] },
      { title: 'Lazy load', desc: 'Chỉ tải tài nguyên đang nằm trong viewport', tags: ['Giảm dung lượng', 'Giảm số request'] },
      { title: 'Tăng tốc bằng CDN', desc: 'Phân phối tài nguyên tới node gần người dùng nhất', tags: ['Rút ngắn quãng đường'] },
      { title: 'Cache HTTP', desc: 'Tận dụng cache trình duyệt, tránh request lặp', tags: ['Giảm số request'] }
    ]
  },
  {
    id: 'rendering',
    name: 'Tầng render (Rendering)',
    icon: '🎨',
    goal: 'Vẽ trang nhanh hơn (giảm reflow/repaint, tận dụng GPU)',
    bottlenecks: [
      { title: 'Chặn critical path', desc: 'CSS/JS chặn việc dựng cây DOM' },
      { title: 'Reflow thường xuyên', desc: 'Sửa thuộc tính layout khiến phải tính lại toàn bộ' },
      { title: 'Animation giật', desc: 'Vẽ animation bằng CPU, framerate thấp hơn 60fps' }
    ],
    solutions: [
      { title: 'Inline critical CSS', desc: 'Đặt CSS first screen ngay trong HTML', tags: ['Critical path'] },
      { title: 'Tăng tốc bằng GPU', desc: 'Dùng transform/opacity để kích hoạt composite layer', tags: ['Animation'] },
      { title: 'Virtual list', desc: 'Chỉ render DOM trong viewport, xử lý dữ liệu khổng lồ', tags: ['Tối ưu DOM'] },
      { title: 'Debounce / throttle', desc: 'Giảm tần suất event tần số cao kích hoạt render', tags: ['Tối ưu logic'] }
    ]
  },
  {
    id: 'execution',
    name: 'Tầng thực thi (Scripting)',
    icon: '⚙️',
    goal: 'Giữ main thread không bị kẹt (giảm long task, tính toán song song)',
    bottlenecks: [
      { title: 'Chặn main thread', desc: 'Long Tasks khiến trang không thể phản hồi tương tác' },
      { title: 'Tính toán thừa', desc: 'Component trong React/Vue bị re-render không cần thiết' },
      { title: 'Rò rỉ bộ nhớ', desc: 'Listener không được dọn, trang ngày càng lag' }
    ],
    solutions: [
      { title: 'Web Workers', desc: 'Đẩy việc tính toán nặng ra background thread', tags: ['Song song'] },
      { title: 'Code split', desc: 'Tải JS theo nhu cầu, giảm áp lực parse cho main thread', tags: ['Giảm tải'] },
      { title: 'Time slicing', desc: 'Chia task lớn thành nhiều task nhỏ', tags: ['Phản hồi'] },
      { title: 'Tối ưu thuật toán', desc: 'Giảm độ phức tạp (ví dụ O(n²) -> O(n))', tags: ['Hiệu suất'] }
    ]
  }
]

const currentDim = ref(dimensions[0])
</script>

<style scoped>
.performance-overview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 0.5rem 0;
  font-family: var(--vp-font-family-sans);
}

.header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

.dimension-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-2);
}

.tab-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.tab-btn.active {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.2);
}

.content-area {
  display: flex;
  gap: 2rem;
  align-items: stretch;
  background-color: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

@media (max-width: 768px) {
  .content-area {
    flex-direction: column;
  }
}

.panel {
  flex: 1;
}

.panel h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-1);
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.list li {
  padding: 0.8rem;
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid transparent;
  transition: all 0.2s;
}

.bottlenecks .list li {
  border-left: 3px solid var(--vp-c-danger);
}

.solutions .list li {
  border-left: 3px solid var(--vp-c-brand);
}

.item-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.item-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.tags {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
}

.arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
  width: 80px;
}

@media (max-width: 768px) {
  .arrow {
    width: 100%;
    height: 40px;
    flex-direction: row;
    gap: 0.5rem;
  }
}

.arrow-line {
  flex: 1;
  width: 2px;
  background-color: var(--vp-c-divider);
}

@media (max-width: 768px) {
  .arrow-line {
    width: 100%;
    height: 2px;
    flex: 1;
  }
}

.summary-bar {
  margin-top: 1.5rem;
  padding: 0.75rem;
  background-color: var(--vp-c-brand-dimm);
  border-radius: 6px;
  text-align: center;
  color: var(--vp-c-brand-dark);
  font-size: 0.95rem;
}
</style>
