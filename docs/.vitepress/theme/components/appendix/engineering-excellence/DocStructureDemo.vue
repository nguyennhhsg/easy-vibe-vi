<template>
  <div class="doc-structure-demo">
    <div class="demo-label">Mẫu cấu trúc tài liệu ── Bấm để chuyển loại tài liệu</div>

    <div class="tabs">
      <button
        v-for="(doc, i) in docs"
        :key="i"
        class="tab"
        :class="{ active: current === i }"
        @click="current = i"
      >{{ doc.icon }} {{ doc.name }}</button>
    </div>

    <div class="structure-card">
      <div class="section-list">
        <div
          v-for="(sec, j) in docs[current].sections"
          :key="j"
          class="section-item"
          :class="{ active: selectedSec === j }"
          @click="selectedSec = selectedSec === j ? -1 : j"
        >
          <div class="sec-header">
            <span class="sec-num">{{ j + 1 }}</span>
            <span class="sec-name">{{ sec.name }}</span>
            <span class="sec-toggle">{{ selectedSec === j ? '▼' : '▶' }}</span>
          </div>
          <Transition name="fade">
            <div v-if="selectedSec === j" class="sec-detail">
              <p>{{ sec.desc }}</p>
              <pre v-if="sec.example"><code>{{ sec.example }}</code></pre>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const current = ref(0)
const selectedSec = ref(-1)
watch(current, () => { selectedSec.value = -1 })

const docs = [
  {
    name: 'README',
    icon: '📖',
    sections: [
      { name: 'Tên dự án + Mô tả một câu', desc: 'Cho người đọc biết dự án này là gì trong 3 giây.', example: '# MyApp\n> Cong cu quan ly task nhe' },
      { name: 'Bắt đầu nhanh', desc: 'Con đường ngắn nhất để user chạy được, thường là lệnh cài đặt + chạy.', example: 'npm install myapp\nnpx myapp init' },
      { name: 'Tính năng', desc: 'Liệt kê tính năng cốt lõi bằng list để user đánh giá có đáp ứng nhu cầu không.', example: '- Task board\n- Team collaboration\n- Data export' },
      { name: 'Ví dụ sử dụng', desc: 'Hiển thị đoạn code minh họa cách dùng điển hình, trực quan hơn mô tả bằng chữ.', example: null },
      { name: 'Hướng dẫn đóng góp + License', desc: 'Hướng dẫn cách tham gia đóng góp và license open-source của dự án.', example: null }
    ]
  },
  {
    name: 'Tài liệu API',
    icon: '🔌',
    sections: [
      { name: 'Tổng quan API', desc: 'Mô tả base URL của API, phương thức xác thực và các tham số chung.', example: 'Base URL: https://api.example.com/v1\nAuth: Bearer Token' },
      { name: 'Tham số request', desc: 'Liệt kê bằng bảng tên, kiểu, bắt buộc hay không, mô tả của từng tham số.', example: '| Tham so | Kieu   | Bat buoc | Mo ta    |\n| name    | string | Co       | Username |' },
      { name: 'Định dạng response', desc: 'Hiển thị ví dụ response JSON khi thành công và thất bại.', example: '{ "code": 200, "data": { ... } }' },
      { name: 'Mã lỗi', desc: 'Liệt kê tất cả mã lỗi có thể có và ý nghĩa của chúng.', example: '401 - Khong duoc cap quyen\n404 - Khong tim thay tai nguyen\n429 - Yeu cau qua thuong xuyen' }
    ]
  },
  {
    name: 'Tài liệu kiến trúc',
    icon: '🏛️',
    sections: [
      { name: 'Tổng quan hệ thống', desc: 'Mô tả ngắn gọn mục tiêu, phạm vi và ràng buộc cốt lõi của hệ thống.', example: null },
      { name: 'Sơ đồ kiến trúc', desc: 'Hiển thị kiến trúc tổng thể của hệ thống, gồm các module và quan hệ giữa chúng.', example: '[Client] -> [API Gateway] -> [Microservices]\n                              |\n                        [Database cluster]' },
      { name: 'Lựa chọn công nghệ', desc: 'Giải thích lý do chọn công nghệ chính và so sánh với phương án thay thế.', example: null },
      { name: 'Kiến trúc triển khai', desc: 'Mô tả cách triển khai môi trường production và chiến lược mở rộng.', example: null }
    ]
  }
]
</script>

<style scoped>
.doc-structure-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-label { font-size: 0.78rem; font-weight: bold; color: var(--vp-c-text-2); margin-bottom: 1rem; text-align: center; }
.tabs { display: flex; gap: 6px; margin-bottom: 1rem; flex-wrap: wrap; }
.tab { padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem; transition: all 0.2s; }
.tab.active { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }

.section-list { display: flex; flex-direction: column; gap: 6px; }
.section-item { border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); overflow: hidden; }
.sec-header { display: flex; align-items: center; gap: 8px; padding: 8px 12px; cursor: pointer; }
.sec-num { width: 22px; height: 22px; border-radius: 50%; background: var(--vp-c-brand); color: #fff; font-size: 0.72rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sec-name { flex: 1; font-size: 0.88rem; font-weight: 600; }
.sec-toggle { font-size: 0.7rem; color: var(--vp-c-text-3); }
.section-item.active { border-color: var(--vp-c-brand); }

.sec-detail { padding: 0 12px 10px; }
.sec-detail p { font-size: 0.83rem; color: var(--vp-c-text-2); margin: 0 0 6px; }
.sec-detail pre { margin: 0; padding: 8px; background: var(--vp-c-bg-soft); border-radius: 4px; font-size: 0.78rem; line-height: 1.5; overflow-x: auto; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
