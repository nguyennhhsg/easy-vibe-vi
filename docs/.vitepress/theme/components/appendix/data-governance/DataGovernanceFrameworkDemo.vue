<!--
  DataGovernanceFrameworkDemo.vue
  Demo data governance framework: minh hoạ quy trình data governance cốt lõi
-->
<template>
  <div class="governance-demo">
    <div class="header">
      <div class="title">Khung Data Governance</div>
      <div class="subtitle">Bấm vào từng giai đoạn để xem chi tiết</div>
    </div>

    <div class="pipeline">
      <div
        v-for="(stage, i) in stages"
        :key="stage.key"
        :class="['stage', { active: activeStage === stage.key }]"
        @click="activeStage = stage.key"
      >
        <div class="stage-num">{{ i + 1 }}</div>
        <div class="stage-name">{{ stage.name }}</div>
        <div v-if="i < stages.length - 1" class="arrow">→</div>
      </div>
    </div>

    <div v-if="current" class="stage-detail">
      <div class="detail-title">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="activities">
        <div v-for="(act, i) in current.activities" :key="i" class="activity">
          <span class="act-icon">{{ act.icon }}</span>
          <div>
            <div class="act-name">{{ act.name }}</div>
            <div class="act-desc">{{ act.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStage = ref('define')

const stages = [
  {
    key: 'define',
    name: 'Định nghĩa chuẩn',
    desc: 'Soạn chuẩn dữ liệu, quy ước đặt tên, data dictionary',
    activities: [
      { icon: '📖', name: 'Data dictionary', desc: 'Định nghĩa ý nghĩa, kiểu, miền giá trị của từng field' },
      { icon: '📏', name: 'Quy ước đặt tên', desc: 'Thống nhất tên field: snake_case, camelCase, quy ước tiền tố' },
      { icon: '🏷️', name: 'Phân loại phân cấp', desc: 'Phân theo độ nhạy cảm: công khai, nội bộ, mật, tuyệt mật' }
    ]
  },
  {
    key: 'collect',
    name: 'Thu thập tiếp nhận',
    desc: 'Chuẩn hoá quy trình thu thập dữ liệu, đảm bảo chất lượng từ nguồn',
    activities: [
      { icon: '🔌', name: 'Chuẩn tiếp nhận', desc: 'Định nghĩa format, giao thức, tần suất cho dữ liệu đầu vào' },
      { icon: '✅', name: 'Validate khi nạp', desc: 'Kiểm tra format, tính toàn vẹn, tính tuân thủ trước khi ghi' },
      { icon: '📝', name: 'Ghi data lineage', desc: 'Ghi lại nguồn gốc, đường đi xử lý, các quan hệ phụ thuộc' }
    ]
  },
  {
    key: 'store',
    name: 'Quản lý lưu trữ',
    desc: 'Lưu trữ dữ liệu hợp lý, kiểm soát chi phí và quyền truy cập',
    activities: [
      { icon: '🗄️', name: 'Lưu trữ phân tầng', desc: 'Data warehouse phân tầng ODS → DWD → DWS → ADS' },
      { icon: '🔒', name: 'Phân quyền', desc: 'Kiểm soát quyền đọc/ghi theo vai trò và mức độ phân loại dữ liệu' },
      { icon: '♻️', name: 'Vòng đời', desc: 'Dữ liệu nóng → ấm → lạnh → lưu kho/xoá' }
    ]
  },
  {
    key: 'use',
    name: 'Sử dụng',
    desc: 'Cho phép business dùng dữ liệu an toàn và hiệu quả',
    activities: [
      { icon: '🔍', name: 'Data catalog', desc: 'Cung cấp catalog tài sản dữ liệu có thể tìm kiếm, giảm công sức tìm dữ liệu' },
      { icon: '🎭', name: 'Mask dữ liệu', desc: 'Mask, mã hoá, generalize các field nhạy cảm' },
      { icon: '📊', name: 'Giám sát chất lượng', desc: 'Liên tục theo dõi chỉ số chất lượng dữ liệu, cảnh báo khi bất thường' }
    ]
  },
  {
    key: 'retire',
    name: 'Lưu kho/Huỷ',
    desc: 'Lưu kho hoặc huỷ dữ liệu an toàn theo yêu cầu tuân thủ',
    activities: [
      { icon: '📦', name: 'Chiến lược lưu kho', desc: 'Chuyển dữ liệu quá hạn giữ sang storage chi phí thấp' },
      { icon: '🗑️', name: 'Xoá an toàn', desc: 'Xoá hoàn toàn dữ liệu người dùng theo GDPR/Luật bảo vệ dữ liệu cá nhân' },
      { icon: '📋', name: 'Audit log', desc: 'Ghi lại thao tác xoá dữ liệu, đáp ứng yêu cầu audit tuân thủ' }
    ]
  }
]

const current = computed(() => stages.find(s => s.key === activeStage.value))
</script>

<style scoped>
.governance-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.pipeline { display: flex; align-items: center; gap: 0.25rem; margin-bottom: 1rem; flex-wrap: wrap; }
.stage {
  display: flex; align-items: center; gap: 0.4rem; padding: 0.5rem 0.75rem;
  border-radius: 8px; cursor: pointer; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); transition: all 0.2s; font-size: 0.85rem;
}
.stage:hover { border-color: var(--vp-c-brand); }
.stage.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.stage-num { width: 20px; height: 20px; border-radius: 50%; background: var(--vp-c-brand); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; }
.stage-name { font-weight: 600; }
.arrow { color: var(--vp-c-text-3); margin-left: 0.25rem; }
.stage-detail { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.detail-title { font-weight: 700; font-size: 1rem; margin-bottom: 0.25rem; }
.detail-desc { color: var(--vp-c-text-2); font-size: 0.85rem; margin-bottom: 0.75rem; }
.activities { display: flex; flex-direction: column; gap: 0.5rem; }
.activity { display: flex; gap: 0.5rem; padding: 0.5rem; border-radius: 6px; background: var(--vp-c-bg-soft); }
.act-icon { font-size: 1.2rem; }
.act-name { font-weight: 600; font-size: 0.85rem; }
.act-desc { font-size: 0.78rem; color: var(--vp-c-text-2); }
@media (max-width: 640px) { .pipeline { flex-direction: column; align-items: stretch; } .arrow { display: none; } }
</style>
