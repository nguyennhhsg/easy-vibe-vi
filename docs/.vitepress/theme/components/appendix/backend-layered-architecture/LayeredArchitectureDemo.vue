<template>
  <div class="layered-arch-demo">
    <div class="header">
      <div class="title">Tổng quan kiến trúc 4 tầng backend</div>
      <div class="subtitle">Bấm vào từng tầng để xem mô tả chi tiết</div>
    </div>

    <div class="main">
      <div class="layers">
        <div class="client-box">Client (Web / App)</div>
        <div class="arrow">↓ HTTP</div>

        <div
          v-for="layer in layers"
          :key="layer.id"
          :class="['layer-box', layer.id, { active: active === layer.id }]"
          @click="active = active === layer.id ? '' : layer.id"
        >
          <div class="layer-header">
            <span class="layer-name">{{ layer.name }}</span>
            <span class="layer-badge">{{ layer.badge }}</span>
          </div>
          <div class="layer-duty">{{ layer.duty }}</div>
        </div>

        <div class="arrow">↓ SQL</div>
        <div class="client-box db">Database (MySQL / PostgreSQL)</div>
      </div>

      <div v-if="active" class="info-panel">
        <div class="info-title">{{ activeInfo.title }}</div>
        <p>{{ activeInfo.desc }}</p>
        <div class="info-analogy">{{ activeInfo.analogy }}</div>
        <div class="info-mistakes">
          <strong>Sai lầm thường gặp:</strong>
          <ul>
            <li v-for="m in activeInfo.mistakes" :key="m">{{ m }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('')

const layers = [
  { id: 'controller', name: 'Controller', badge: 'Cổng vào', duty: 'Nhận request, validate tham số, gọi Service' },
  { id: 'service', name: 'Service', badge: 'Lõi nghiệp vụ', duty: 'Điều phối business logic, quản lý transaction, phối hợp giữa các module' },
  { id: 'repository', name: 'Repository', badge: 'Truy cập dữ liệu', duty: 'Persist dữ liệu, đóng gói query, ORM mapping' },
  { id: 'domain', name: 'Domain', badge: 'Mô hình domain', duty: 'Định nghĩa entity, business rule, value object' }
]

const infoMap = {
  controller: {
    title: 'Tầng Controller — "lễ tân" của request',
    desc: 'Nhận HTTP request, phân tích tham số, validate cơ bản rồi gọi tầng Service xử lý nghiệp vụ.',
    analogy: 'Giống lễ tân nhà hàng: tiếp đón khách, kiểm tra đặt bàn, dẫn vào chỗ ngồi, nhưng không nấu ăn.',
    mistakes: ['Viết business logic trong Controller', 'Truy cập database trực tiếp', 'Không validate tham số']
  },
  service: {
    title: 'Tầng Service — "đầu bếp" của business logic',
    desc: 'Điều phối business logic, quản lý transaction, phối hợp nhiều Repository. Chứa toàn bộ business rule và flow.',
    analogy: 'Giống đầu bếp nhà hàng: nấu theo công thức, phối hợp nguyên liệu, kiểm soát chất lượng món.',
    mistakes: ['Các Service phụ thuộc vòng tròn', 'Viết SQL trực tiếp', 'Một method quá dài, chứa nhiều ngữ cảnh nghiệp vụ']
  },
  repository: {
    title: 'Tầng Repository — "thủ kho" của dữ liệu',
    desc: 'Đóng gói toàn bộ logic truy cập dữ liệu, tầng trên không cần quan tâm loại database hay SQL cụ thể.',
    analogy: 'Giống thủ kho: lấy nguyên liệu từ kho, cất giữ phần dư, đầu bếp chỉ cần nói cần gì.',
    mistakes: ['Viết business logic trong Repository', 'Trả entity thẳng cho frontend', 'Một Repository thao tác nhiều bảng']
  },
  domain: {
    title: 'Tầng Domain — "bản thiết kế" của khái niệm nghiệp vụ',
    desc: 'Định nghĩa entity, value object, business rule. Là nền tảng phụ thuộc của mọi tầng, nhưng không phụ thuộc tầng nào.',
    analogy: 'Giống menu và tiêu chuẩn món: định nghĩa món "Pho bo" gồm gì, nguyên liệu nào, vị thế nào.',
    mistakes: ['Domain chứa annotation persistence', 'Viết thao tác database trong Domain', 'Các object Domain phụ thuộc vòng tròn']
  }
}

const activeInfo = computed(() => infoMap[active.value] || {})
</script>

<style scoped>
.layered-arch-demo {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
}
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.main { display: flex; gap: 20px; align-items: flex-start; }
.layers { flex: 1; display: flex; flex-direction: column; gap: 6px; }

.client-box {
  padding: 12px; text-align: center; border-radius: 8px;
  background: var(--vp-c-bg); color: var(--vp-c-text-2);
  font-size: 13px; border: 1px solid var(--vp-c-divider);
}
.client-box.db { border-left: 3px solid #8b5cf6; }
.arrow { text-align: center; color: var(--vp-c-text-3); font-size: 12px; padding: 2px; }

.layer-box {
  padding: 14px; border-radius: 8px; cursor: pointer;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-left: 3px solid var(--vp-c-divider);
  transition: all .2s;
}
.layer-box:hover { box-shadow: 0 2px 8px rgba(0,0,0,.06); }
.layer-box.active { border-color: var(--vp-c-brand-1); box-shadow: 0 0 0 2px var(--vp-c-brand-soft); }
.layer-box.controller { border-left-color: #10b981; }
.layer-box.service { border-left-color: #f59e0b; }
.layer-box.repository { border-left-color: #3b82f6; }
.layer-box.domain { border-left-color: #6b7280; }

.layer-header { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.layer-name { font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); }
.layer-badge {
  padding: 1px 8px; border-radius: 10px; font-size: 11px;
  background: var(--vp-c-bg-soft); color: var(--vp-c-text-3);
}
.layer-duty { font-size: 12px; color: var(--vp-c-text-2); }

.info-panel {
  width: 300px; padding: 18px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  position: sticky; top: 20px;
}
.info-title { font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); margin-bottom: 10px; padding-bottom: 8px; border-bottom: 2px solid var(--vp-c-brand-1); }
.info-panel p { font-size: 13px; color: var(--vp-c-text-2); line-height: 1.6; margin: 0 0 12px; }
.info-analogy {
  padding: 10px; border-radius: 6px; font-size: 12px; line-height: 1.5;
  background: var(--vp-c-brand-soft); color: var(--vp-c-text-1);
  border-left: 3px solid var(--vp-c-brand-1); margin-bottom: 12px;
}
.info-mistakes {
  padding: 10px; border-radius: 6px; font-size: 12px; line-height: 1.5;
  background: var(--vp-c-danger-soft); color: var(--vp-c-text-1);
  border-left: 3px solid var(--vp-c-danger-1);
}
.info-mistakes strong { font-size: 12px; }
.info-mistakes ul { margin: 6px 0 0; padding-left: 16px; }
.info-mistakes li { margin: 3px 0; }

@media (max-width: 768px) {
  .main { flex-direction: column; }
  .info-panel { width: 100%; position: static; }
}
</style>
