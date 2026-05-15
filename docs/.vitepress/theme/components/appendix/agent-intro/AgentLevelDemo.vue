<!--
  AgentLevelDemo.vue
  Phân cấp Agent (L0-L5) tương tác: kéo level, xem "làm được gì / không làm được gì / task điển hình".
-->
<template>
  <div class="levels">
    <div class="header">
      <div>
        <div class="title">
          Phân cấp năng lực Agent (từ chat đến hợp tác)
        </div>
        <div class="subtitle">
          Kéo thử: level càng cao càng giống "đồng nghiệp có thể làm việc độc lập".
        </div>
      </div>
      <div class="badge">
        Hiện tại: {{ current.name }}
      </div>
    </div>

    <div class="slider">
      <input
        v-model.number="level"
        type="range"
        min="0"
        max="5"
        step="1"
      >
      <div class="ticks">
        <span
          v-for="n in 6"
          :key="n"
        >{{ n - 1 }}</span>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="k">
          Làm được gì
        </div>
        <ul>
          <li
            v-for="x in current.can"
            :key="x"
          >
            {{ x }}
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="k">
          Vấn đề dễ gặp
        </div>
        <ul>
          <li
            v-for="x in current.risk"
            :key="x"
          >
            {{ x }}
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="k">
          Task điển hình
        </div>
        <div class="v">
          {{ current.example }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const level = ref(2)

const levels = [
  {
    name: 'L0: Chỉ chat',
    can: ['Trả lời câu hỏi', 'Viết text/code (nhưng không thực thi)'],
    risk: ['Chỉ "nói" được, không "làm" được', 'Bạn phải tự chia bước thủ công'],
    example: 'Giải thích khái niệm, viết một đoạn văn bản'
  },
  {
    name: 'L1: Một tool',
    can: ['Gọi một tool cố định', 'Giải thích kết quả cho bạn'],
    risk: ['Dùng sai tham số tool', 'Thiếu khả năng lập kế hoạch phức tạp'],
    example: 'Chỉ tìm kiếm một lần / chỉ chạy code một lần'
  },
  {
    name: 'L2: Nhiều tool',
    can: ['Chọn giữa nhiều tool', 'Kết hợp gọi theo nhu cầu'],
    risk: ['Việc chọn tool không ổn định', 'Cần kiểm soát quyền và an toàn'],
    example: 'Search + mở trang web + tóm tắt'
  },
  {
    name: 'L3: Thực thi nhiều bước',
    can: ['Lập kế hoạch rồi mới thực thi', 'Hoàn thành một chuỗi bước', 'Ghi lại kết quả trung gian'],
    risk: ['Sót bước / sai thứ tự', 'Chi phí tăng (gọi nhiều hơn)'],
    example: 'Đọc code → sửa code → chạy test → ra báo cáo'
  },
  {
    name: 'L4: Tự sửa lỗi',
    can: ['Đổi chiến lược khi thất bại', 'Dùng checkpoint để tránh lệch hướng'],
    risk: ['Có thể thử lại lặp đi lặp lại (cần giới hạn)', 'Phụ thuộc vào monitoring và log hơn'],
    example: 'Test fail thì tự định vị và thử sửa'
  },
  {
    name: 'L5: Multi-Agent hợp tác',
    can: ['Nhiều vai trò chia việc', 'Xử lý task song song', 'Gộp kết quả'],
    risk: ['Chi phí hợp tác cao hơn', 'Cần protocol rõ ràng và cơ chế phân xử'],
    example: 'Researcher tìm tài liệu + Engineer hiện thực + Editor viết tổng kết'
  }
]

const current = computed(() => levels[level.value])
</script>

<style scoped>
.levels {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.title {
  font-weight: 800;
}
.subtitle {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
.badge {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 8px 12px;
  font-weight: 800;
}

.slider {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 10px 12px;
}
input[type='range'] {
  width: 100%;
}
.ticks {
  display: flex;
  justify-content: space-between;
  color: var(--vp-c-text-2);
  font-size: 12px;
  margin-top: 6px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}
.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.k {
  font-weight: 800;
  margin-bottom: 6px;
}
.v {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
ul {
  margin: 0;
  padding-left: 18px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
