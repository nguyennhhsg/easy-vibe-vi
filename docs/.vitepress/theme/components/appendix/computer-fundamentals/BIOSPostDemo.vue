<template>
  <div class="bios-post-demo">
    <div class="demo-label">BIOS POST tự kiểm tra phần cứng ── nhấp để xem các mục kiểm tra</div>

    <div class="post-items">
      <div
        v-for="item in postItems"
        :key="item.name"
        class="post-item"
        :class="{ passed: item.passed, error: item.error }"
        @click="item.passed = !item.passed"
      >
        <div class="item-status">{{ item.passed ? '✅' : item.error ? '❌' : '⏳' }}</div>
        <div class="item-info">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>

    <div class="post-result">
      <span v-if="allPassed" class="result-pass">✅ Tự kiểm tra thành công, sẵn sàng khởi động</span>
      <span v-else class="result-pending">⏳ Nhấp vào từng mục để mô phỏng trạng thái kiểm tra</span>
    </div>

    <div class="tap-hint">👆 Nhấp để mô phỏng kết quả kiểm tra</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const postItems = ref([
  { name: 'CPU', desc: 'Kiểm tra tính toàn vẹn của bộ xử lý', passed: false, error: false },
  { name: 'Bộ nhớ', desc: 'Kiểm tra dung lượng và khả dụng của RAM', passed: false, error: false },
  { name: 'Card đồ họa', desc: 'Khởi tạo bộ điều hợp hiển thị', passed: false, error: false },
  { name: 'Ổ cứng', desc: 'Nhận diện thiết bị lưu trữ', passed: false, error: false },
  { name: 'Bàn phím', desc: 'Kiểm tra giao tiếp bàn phím', passed: false, error: false },
  { name: 'Chuột', desc: 'Kiểm tra giao tiếp chuột', passed: false, error: false }
])

const allPassed = computed(() => postItems.value.every(item => item.passed))
</script>

<style scoped>
.bios-post-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
  cursor: pointer;
  user-select: none;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.post-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
}

.post-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: all 0.3s;
}

.post-item.passed {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}

.post-item.error {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.item-status {
  font-size: 1rem;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.item-desc {
  font-size: 0.62rem;
  color: var(--vp-c-text-3);
  margin-top: 0.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-result {
  margin-top: 0.75rem;
  text-align: center;
  padding: 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.result-pass {
  color: #22c55e;
  font-weight: 600;
}

.result-pending {
  color: var(--vp-c-text-3);
}

.tap-hint {
  text-align: center;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: 0.5rem;
}
</style>
