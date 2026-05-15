<template>
  <div class="clean-arch-demo">
    <div class="header">
      <div class="title">So sánh Clean Architecture và Layered Architecture</div>
      <div class="subtitle">Layered Architecture là nền tảng của Clean Architecture, hiểu mối quan hệ giúp xây hệ thống linh hoạt hơn</div>
    </div>

    <div class="tabs">
      <button
        v-for="t in tabs" :key="t.id"
        :class="['tab', { active: current === t.id }]"
        @click="current = t.id"
      >{{ t.name }}</button>
    </div>

    <div v-if="current === 'layered'" class="panel">
      <div class="arch-layers">
        <div v-for="l in layeredLayers" :key="l.name" :class="['arch-layer', l.cls]">
          <strong>{{ l.name }}</strong> <span>{{ l.desc }}</span>
        </div>
      </div>
      <div class="traits">
        <strong>Đặc điểm của Layered Architecture truyền thống</strong>
        <ul>
          <li>Phụ thuộc dọc: tầng trên phụ thuộc trực tiếp tầng dưới</li>
          <li>Đơn giản trực quan: cấu trúc rõ, dễ hiểu</li>
          <li>Phù hợp dự án vừa và nhỏ: phát triển nhanh, dễ bắt đầu</li>
          <li>Vấn đề tiềm ẩn: thay đổi tầng dưới có thể ảnh hưởng tầng trên</li>
        </ul>
      </div>
    </div>

    <div v-else-if="current === 'clean'" class="panel">
      <div class="clean-layers">
        <div v-for="l in cleanLayers" :key="l.name" :class="['arch-layer', l.cls]">
          <strong>{{ l.name }}</strong> <span>{{ l.items }}</span>
        </div>
      </div>
      <div class="dep-rule">Hướng phụ thuộc: tầng ngoài → tầng trong, tầng trong không biết tới tầng ngoài</div>
      <div class="traits">
        <strong>Đặc điểm Clean Architecture</strong>
        <ul>
          <li>Đảo ngược phụ thuộc: hướng phụ thuộc từ ngoài vào trong, cách ly qua interface</li>
          <li>Domain làm trung tâm: business logic nằm ở trung tâm, độc lập với framework</li>
          <li>Khả năng test cao: core business có thể unit test tách khỏi framework</li>
          <li>Độc lập công nghệ: dễ dàng thay đổi database, framework</li>
        </ul>
      </div>
    </div>

    <div v-else class="panel">
      <table>
        <thead><tr><th>Đặc điểm</th><th>Layered truyền thống</th><th>Clean Architecture</th></tr></thead>
        <tbody>
          <tr v-for="r in compareRows" :key="r.feature">
            <td>{{ r.feature }}</td><td>{{ r.layered }}</td><td>{{ r.clean }}</td>
          </tr>
        </tbody>
      </table>
      <div class="rec-grid">
        <div class="rec-card">
          <strong>Chọn Layered truyền thống khi...</strong>
          <ul>
            <li>Dự án nhỏ, nghiệp vụ đơn giản</li>
            <li>Team chưa quen DDD</li>
            <li>Cần ra mắt nhanh để kiểm chứng thị trường</li>
          </ul>
        </div>
        <div class="rec-card recommended">
          <strong>Chọn Clean Architecture khi...</strong>
          <ul>
            <li>Nghiệp vụ phức tạp, domain model phong phú</li>
            <li>Cần bảo trì và tiến hóa dài hạn</li>
            <li>Cần thường xuyên đổi tech stack</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const current = ref('layered')
const tabs = [
  { id: 'layered', name: 'Layered truyền thống' },
  { id: 'clean', name: 'Clean Architecture' },
  { id: 'compare', name: 'Tổng kết so sánh' }
]

const layeredLayers = [
  { name: 'Tầng Controller', desc: 'Nhận request, kiểm tra tham số', cls: 'green' },
  { name: 'Tầng Service', desc: 'Business logic, quản lý transaction', cls: 'orange' },
  { name: 'Tầng Repository', desc: 'Truy cập dữ liệu, ORM mapping', cls: 'blue' },
  { name: 'Tầng Domain', desc: 'Định nghĩa entity, business rule', cls: 'teal' }
]

const cleanLayers = [
  { name: 'Tầng Domain (lõi)', items: 'Entity / ValueObject / DomainService', cls: 'teal' },
  { name: 'Tầng Application', items: 'Service / UseCase / DTO', cls: 'orange' },
  { name: 'Tầng Interface Adapter', items: 'Controller / Gateway / Presenter', cls: 'blue' },
  { name: 'Tầng Framework & Driver', items: 'Web / DB / UI / Interface bên ngoài', cls: 'gray' }
]

const compareRows = [
  { feature: 'Hướng phụ thuộc', layered: 'Trên xuống dưới', clean: 'Ngoài vào trong' },
  { feature: 'Vị trí core business', layered: 'Tầng Service', clean: 'Tầng Domain (trung tâm)' },
  { feature: 'Phụ thuộc framework', layered: 'Sâu', clean: 'Nông (cách ly qua interface)' },
  { feature: 'Khả năng test', layered: 'Cần integration test', clean: 'Core có thể unit test' },
  { feature: 'Đường cong học tập', layered: 'Thoải', clean: 'Khá dốc' },
  { feature: 'Tình huống áp dụng', layered: 'Vừa và nhỏ, lặp nhanh', clean: 'Lớn, phức tạp, bảo trì dài hạn' }
]
</script>

<style scoped>
.clean-arch-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.tabs { display: flex; gap: 8px; margin-bottom: 16px; }
.tab {
  padding: 7px 16px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  border-radius: 6px; cursor: pointer; font-size: 13px; color: var(--vp-c-text-2); transition: all .2s;
}
.tab:hover { color: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); }
.tab.active { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: #fff; }

.panel {
  padding: 18px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}

.arch-layers, .clean-layers { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.arch-layer {
  padding: 12px 14px; border-radius: 6px;
  background: var(--vp-c-bg-soft); border-left: 3px solid var(--vp-c-divider);
  font-size: 13px; color: var(--vp-c-text-2);
}
.arch-layer strong { color: var(--vp-c-text-1); margin-right: 8px; }
.arch-layer.green { border-left-color: #10b981; }
.arch-layer.orange { border-left-color: #f59e0b; }
.arch-layer.blue { border-left-color: #3b82f6; }
.arch-layer.teal { border-left-color: #14b8a6; }
.arch-layer.gray { border-left-color: #6b7280; }

.dep-rule {
  text-align: center; padding: 10px; margin-bottom: 16px; border-radius: 6px;
  border: 2px dashed var(--vp-c-brand-1); font-size: 13px; color: var(--vp-c-brand-1); font-weight: 500;
}

.traits { padding: 14px; border-radius: 6px; background: var(--vp-c-bg-soft); font-size: 13px; }
.traits strong { color: var(--vp-c-text-1); }
.traits ul { margin: 8px 0 0; padding-left: 18px; }
.traits li { margin: 4px 0; color: var(--vp-c-text-2); line-height: 1.5; }

table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 16px; }
th, td { padding: 10px; text-align: left; border-bottom: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); }
th { background: var(--vp-c-bg-soft); font-weight: 600; color: var(--vp-c-text-1); }

.rec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.rec-card { padding: 14px; border-radius: 6px; background: var(--vp-c-bg-soft); font-size: 12px; }
.rec-card strong { font-size: 13px; color: var(--vp-c-text-1); display: block; margin-bottom: 8px; }
.rec-card ul { margin: 0; padding-left: 16px; }
.rec-card li { margin: 4px 0; color: var(--vp-c-text-2); }
.rec-card.recommended { border: 2px solid var(--vp-c-green-1); background: var(--vp-c-green-soft); }

@media (max-width: 768px) {
  .rec-grid { grid-template-columns: 1fr; }
}
</style>
