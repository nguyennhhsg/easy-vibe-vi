<!--
  SeverityLevelDemo.vue
  Demo phân cấp mức nghiêm trọng sự cố: tương tác hiển thị định nghĩa P0-P4, ví dụ và yêu cầu phản ứng
-->
<template>
  <div class="severity-level-demo">
    <div class="header">
      <div class="title">Phân cấp mức nghiêm trọng sự cố (Severity Levels)</div>
      <div class="subtitle">Click từng cấp để xem yêu cầu phản ứng và ví dụ thực tế</div>
    </div>

    <div class="level-tabs">
      <button
        v-for="level in levels"
        :key="level.id"
        :class="['level-tab', level.id, { active: activeLevel === level.id }]"
        @click="activeLevel = level.id"
      >
        <span class="tab-badge">{{ level.id.toUpperCase() }}</span>
        <span class="tab-name">{{ level.shortName }}</span>
      </button>
    </div>

    <div v-if="current" class="level-detail">
      <div class="detail-header" :style="{ background: current.color }">
        <div class="detail-level">{{ current.id.toUpperCase() }}</div>
        <div class="detail-name">{{ current.name }}</div>
      </div>
      <div class="detail-body">
        <div class="detail-section">
          <div class="section-label">Định nghĩa</div>
          <div class="section-content">{{ current.definition }}</div>
        </div>
        <div class="detail-section">
          <div class="section-label">Thời gian phản ứng</div>
          <div class="section-content response-time">
            {{ current.responseTime }}
          </div>
        </div>
        <div class="detail-section">
          <div class="section-label">Kênh thông báo</div>
          <div class="channels">
            <span
              v-for="ch in current.channels"
              :key="ch"
              class="channel-tag"
            >
              {{ ch }}
            </span>
          </div>
        </div>
        <div class="detail-section">
          <div class="section-label">Ví dụ thực tế</div>
          <div class="examples">
            <div
              v-for="(ex, i) in current.examples"
              :key="i"
              class="example-item"
            >
              {{ ex }}
            </div>
          </div>
        </div>
        <div class="detail-section">
          <div class="section-label">Yêu cầu phản ứng</div>
          <div class="requirements">
            <div
              v-for="(req, i) in current.requirements"
              :key="i"
              class="req-item"
            >
              <span class="req-check">&#10003;</span>
              <span>{{ req }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">So sánh nhanh các cấp</div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Cấp</th>
              <th>Ảnh hưởng user</th>
              <th>Thời gian phản ứng</th>
              <th>Yêu cầu trực</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="level in levels"
              :key="level.id"
              :class="{ highlight: activeLevel === level.id }"
              @click="activeLevel = level.id"
            >
              <td>
                <span class="table-badge" :class="level.id">
                  {{ level.id.toUpperCase() }}
                </span>
              </td>
              <td>{{ level.userImpact }}</td>
              <td>{{ level.responseTime }}</td>
              <td>{{ level.oncallReq }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeLevel = ref('p0')

const levels = [
  {
    id: 'p0',
    shortName: 'Tử',
    name: 'Sự cố tử (Critical)',
    color: '#ef4444',
    definition: 'Business cốt lõi hoàn toàn không khả dụng, lượng lớn user bị ảnh hưởng, gây thiệt hại kinh tế nghiêm trọng hoặc rủi ro mất dữ liệu.',
    responseTime: 'Phản ứng ngay, có mặt trong 5 phút',
    userImpact: 'Toàn bộ user',
    oncallReq: 'Toàn đội có mặt',
    channels: ['Gọi điện', 'SMS', 'Chat tức thì', 'Email'],
    examples: [
      'Database chính chết, mọi request đọc/ghi đều fail',
      'Hệ thống thanh toán hoàn toàn không khả dụng, user không đặt đơn được',
      'Lộ dữ liệu user quy mô lớn'
    ],
    requirements: [
      'Incident commander phải có mặt trong 5 phút',
      '15 phút một lần báo cáo tiến độ lên quản lý',
      'Mọi team liên quan huỷ nghỉ phép, hỗ trợ ngay',
      'Hoàn tất postmortem trong 24 giờ sau sự cố'
    ]
  },
  {
    id: 'p1',
    shortName: 'Nghiêm trọng',
    name: 'Sự cố nghiêm trọng (Major)',
    color: '#f59e0b',
    definition: 'Tính năng cốt lõi hư hại một phần, lượng lớn user bị degrade trải nghiệm, nhưng hệ thống chưa chết hẳn.',
    responseTime: 'Phản ứng trong 15 phút',
    userImpact: 'Nhiều user',
    oncallReq: 'Team chính',
    channels: ['Chat tức thì', 'SMS', 'Email'],
    examples: [
      'Tính năng tìm kiếm trả kết quả chậm nghiêm trọng (>5s)',
      'User ở một số khu vực không đăng nhập được',
      'Queue xử lý đơn hàng tồn đọng nghiêm trọng'
    ],
    requirements: [
      'Engineer trực bắt đầu điều tra trong 15 phút',
      '30 phút một lần báo cáo tiến độ',
      'Cần thiết thì leo thang lên P0',
      'Hoàn tất postmortem trong 48 giờ sau sự cố'
    ]
  },
  {
    id: 'p2',
    shortName: 'Trung bình',
    name: 'Sự cố trung bình (Moderate)',
    color: '#eab308',
    definition: 'Tính năng phụ bị lỗi, một phần user bị ảnh hưởng, không ảnh hưởng luồng nghiệp vụ chính.',
    responseTime: 'Phản ứng trong 1 giờ',
    userImpact: 'Một phần user',
    oncallReq: 'Engineer trực',
    channels: ['Chat tức thì', 'Email'],
    examples: [
      'Avatar user không tải được',
      'Tính năng xuất báo cáo bị timeout',
      'Trang không quan trọng bị lệch CSS'
    ],
    requirements: [
      'Engineer trực xử lý trong giờ làm việc',
      'Đưa giải pháp fix trong ngày',
      'Không cần toàn đội phản ứng',
      'Ghi nhận vào báo cáo tuần'
    ]
  },
  {
    id: 'p3',
    shortName: 'Nhẹ',
    name: 'Vấn đề nhẹ (Minor)',
    color: '#84cc16',
    definition: 'Vấn đề nhỏ ở tính năng ngoài lề, rất ít user bị ảnh hưởng, không ảnh hưởng sử dụng bình thường.',
    responseTime: 'Xác nhận trong ngày, xử lý trong tuần',
    userImpact: 'Rất ít user',
    oncallReq: 'Lên lịch bình thường',
    channels: ['Email', 'Hệ thống ticket'],
    examples: [
      'Một nút bị lệch trên browser cụ thể',
      'Log có cảnh báo không quan trọng',
      'Văn án có lỗi chính tả'
    ],
    requirements: [
      'Ghi vào hệ thống tracking bug',
      'Đưa vào lịch sprint bình thường',
      'Không cần phản ứng khẩn',
      'Sau khi fix thì release bình thường'
    ]
  },
  {
    id: 'p4',
    shortName: 'Đề xuất',
    name: 'Đề xuất cải tiến (Suggestion)',
    color: '#64748b',
    definition: 'Không phải lỗi, thuộc loại đề xuất tối ưu hoặc tech debt, không ảnh hưởng tới user nào.',
    responseTime: 'Sắp lịch theo độ ưu tiên',
    userImpact: 'Không ảnh hưởng trực tiếp',
    oncallReq: 'Không cần trực',
    channels: ['Hệ thống ticket'],
    examples: [
      'Code có chỗ tối ưu được về hiệu năng',
      'Thư viện phụ thuộc quá cũ cần nâng cấp',
      'Độ phủ monitor chưa đủ, cần bổ sung'
    ],
    requirements: [
      'Ghi vào danh sách tech debt',
      'Đánh giá độ ưu tiên khi lên kế hoạch quý',
      'Theo dõi như mục cải tiến của team',
      'Không áp lực thời gian'
    ]
  }
]

const current = computed(() => {
  return levels.find((l) => l.id === activeLevel.value)
})
</script>

<style scoped>
.severity-level-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.level-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.level-tab {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.level-tab:hover {
  border-color: var(--vp-c-text-3);
}

.level-tab.active.p0 { border-color: #ef4444; background: rgba(239,68,68,0.08); }
.level-tab.active.p1 { border-color: #f59e0b; background: rgba(245,158,11,0.08); }
.level-tab.active.p2 { border-color: #eab308; background: rgba(234,179,8,0.08); }
.level-tab.active.p3 { border-color: #84cc16; background: rgba(132,204,22,0.08); }
.level-tab.active.p4 { border-color: #64748b; background: rgba(100,116,139,0.08); }

.tab-badge {
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  color: #fff;
}

.p0 .tab-badge { background: #ef4444; }
.p1 .tab-badge { background: #f59e0b; }
.p2 .tab-badge { background: #eab308; }
.p3 .tab-badge { background: #84cc16; }
.p4 .tab-badge { background: #64748b; }

.tab-name {
  font-weight: 500;
}

.level-detail {
  background: var(--vp-c-bg);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #fff;
}

.detail-level {
  font-weight: 800;
  font-size: 1.2rem;
}

.detail-name {
  font-weight: 600;
  font-size: 1rem;
}

.detail-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.section-label {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.section-content {
  font-size: 0.9rem;
  line-height: 1.6;
}

.response-time {
  font-weight: 700;
  color: var(--vp-c-brand);
}

.channels {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.channel-tag {
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.8rem;
}

.examples {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.example-item {
  font-size: 0.85rem;
  padding: 0.3rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  border-left: 3px solid var(--vp-c-divider);
}

.requirements {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.req-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
}

.req-check {
  color: #22c55e;
  font-weight: 700;
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.table-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

th {
  text-align: left;
  padding: 0.5rem;
  border-bottom: 2px solid var(--vp-c-divider);
  font-weight: 600;
  color: var(--vp-c-text-2);
}

td {
  padding: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

tr.highlight {
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.06);
}

tr {
  cursor: pointer;
  transition: background 0.2s;
}

tr:hover {
  background: var(--vp-c-bg-soft);
}

.table-badge {
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.75rem;
  color: #fff;
}

.table-badge.p0 { background: #ef4444; }
.table-badge.p1 { background: #f59e0b; }
.table-badge.p2 { background: #eab308; }
.table-badge.p3 { background: #84cc16; }
.table-badge.p4 { background: #64748b; }

@media (max-width: 768px) {
  .level-tabs {
    flex-direction: column;
  }

  .level-tab {
    width: 100%;
    justify-content: center;
  }
}
</style>
