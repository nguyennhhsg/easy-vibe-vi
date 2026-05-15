<!--
  IncidentCommandDemo.vue
  Demo hệ thống chỉ huy sự cố: cho thấy phân vai và quan hệ phối hợp khi phản ứng sự cố
-->
<template>
  <div class="incident-command-demo">
    <div class="header">
      <div class="title">Hệ thống chỉ huy sự cố (Incident Command System)</div>
      <div class="subtitle">Click vào thẻ vai trò để xem trách nhiệm và quan hệ phối hợp</div>
    </div>

    <div class="org-chart">
      <div class="org-level org-top">
        <div
          :class="['role-card', 'commander', { active: activeRole === 'ic' }]"
          @click="selectRole('ic')"
        >
          <div class="role-icon">🎖️</div>
          <div class="role-name">Incident Commander</div>
          <div class="role-eng">Incident Commander</div>
        </div>
      </div>

      <div class="org-connector">
        <div class="connector-line"></div>
      </div>

      <div class="org-level org-middle">
        <div
          v-for="role in middleRoles"
          :key="role.id"
          :class="['role-card', { active: activeRole === role.id }]"
          @click="selectRole(role.id)"
        >
          <div class="role-icon">{{ role.icon }}</div>
          <div class="role-name">{{ role.name }}</div>
          <div class="role-eng">{{ role.eng }}</div>
        </div>
      </div>
    </div>

    <div v-if="currentRole" class="role-detail">
      <div class="detail-header" :style="{ background: currentRole.color }">
        <span class="detail-icon">{{ currentRole.icon }}</span>
        <span class="detail-name">{{ currentRole.name }}</span>
      </div>
      <div class="detail-body">
        <div class="detail-section">
          <div class="section-label">Trách nhiệm cốt lõi</div>
          <div class="responsibilities">
            <div
              v-for="(r, i) in currentRole.responsibilities"
              :key="i"
              class="resp-item"
            >
              <span class="resp-num">{{ i + 1 }}</span>
              <span>{{ r }}</span>
            </div>
          </div>
        </div>
        <div class="detail-section">
          <div class="section-label">Năng lực then chốt</div>
          <div class="skills">
            <span
              v-for="skill in currentRole.skills"
              :key="skill"
              class="skill-tag"
            >
              {{ skill }}
            </span>
          </div>
        </div>
        <div class="detail-section">
          <div class="section-label">Câu nói thường gặp</div>
          <div class="quote-box">
            "{{ currentRole.quote }}"
          </div>
        </div>
      </div>
    </div>

    <div class="scenario-box">
      <div class="scenario-title">Kịch bản mô phỏng: sự cố P0 hệ thống thanh toán</div>
      <div class="scenario-timeline">
        <div
          v-for="(event, i) in scenarioEvents"
          :key="i"
          class="event-item"
        >
          <span class="event-time">{{ event.time }}</span>
          <span
            class="event-role"
            :style="{ background: event.color }"
          >
            {{ event.role }}
          </span>
          <span class="event-text">{{ event.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeRole = ref('ic')

const allRoles = {
  ic: {
    id: 'ic',
    icon: '🎖️',
    name: 'Incident Commander',
    eng: 'Incident Commander',
    color: '#8b5cf6',
    responsibilities: [
      'Điều phối toàn bộ quá trình phản ứng sự cố',
      'Đưa quyết định then chốt (rollback, chuyển traffic, degrade, v.v.)',
      'Đảm bảo các vai trò phối hợp hiệu quả, tránh hỗn loạn',
      'Kiểm soát nhịp độ phản ứng, định kỳ đồng bộ tiến độ'
    ],
    skills: ['Tầm nhìn tổng thể', 'Năng lực quyết định', 'Giao tiếp & phối hợp', 'Quản lý áp lực'],
    quote: 'Tình trạng hiện tại: dịch vụ thanh toán không khả dụng. Team Ops điều tra database, team Backend chuẩn bị phương án rollback, team Comm sync mỗi 10 phút.'
  },
  comm: {
    id: 'comm',
    icon: '📢',
    name: 'Communications Lead',
    eng: 'Communications Lead',
    color: '#3b82f6',
    responsibilities: [
      'Đối nội: định kỳ thông báo tiến độ tới quản lý và các team liên quan',
      'Đối ngoại: cập nhật status page, thông báo cho khách hàng bị ảnh hưởng',
      'Ghi lại timeline sự cố làm tư liệu cho postmortem',
      'Lọc nhiễu thông tin để Commander tập trung quyết định'
    ],
    skills: ['Diễn đạt văn bản', 'Tổ chức thông tin', 'Giao tiếp đa bên', 'Quản lý thời gian'],
    quote: 'Cập nhật tình trạng: chúng tôi đã ghi nhận sự cố dịch vụ thanh toán, team đang xử lý khẩn, dự kiến phục hồi trong 30 phút.'
  },
  ops: {
    id: 'ops',
    icon: '🔧',
    name: 'Operations Lead',
    eng: 'Operations Lead',
    color: '#ef4444',
    responsibilities: [
      'Thực hiện thao tác kỹ thuật cụ thể (rollback, restart, scale, v.v.)',
      'Giám sát biến động chỉ số hệ thống, đánh giá hiệu quả thao tác',
      'Quản lý phản ứng khẩn ở tầng hạ tầng',
      'Báo cáo tiến độ ở mặt kỹ thuật cho Commander'
    ],
    skills: ['Vận hành hệ thống', 'Troubleshoot sự cố', 'Tự động hoá bằng script', 'Phân tích monitor'],
    quote: 'CPU master database 100%, đang failover master/slave, dự kiến xong trong 2 phút.'
  },
  dev: {
    id: 'dev',
    icon: '💻',
    name: 'Development Lead',
    eng: 'Development Lead',
    color: '#22c55e',
    responsibilities: [
      'Phân tích nguyên nhân gốc ở mức code',
      'Chuẩn bị và thực hiện fix hoặc rollback ở mức code',
      'Đánh giá rủi ro thay đổi, đưa phương án kỹ thuật',
      'Điều phối thành viên team dev tham gia điều tra'
    ],
    skills: ['Phân tích code', 'Debug nhanh', 'Đánh giá rủi ro', 'Quản lý version'],
    quote: 'Đã định vị vấn đề: bản batch query hôm qua thiếu phân trang, dẫn tới full table scan đè database. Sẵn sàng rollback về bản trước.'
  }
}

const middleRoles = [
  allRoles.comm,
  allRoles.ops,
  allRoles.dev
]

const currentRole = computed(() => {
  return allRoles[activeRole.value] || null
})

const selectRole = (id) => {
  activeRole.value = id
}

const scenarioEvents = [
  { time: '14:02', role: 'Monitor', color: '#3b82f6', text: 'Tỉ lệ thanh toán thành công rớt từ 99.9% xuống 12%, trigger cảnh báo P0' },
  { time: '14:03', role: 'Commander', color: '#8b5cf6', text: 'Xác nhận sự cố P0, mở channel sự cố, triệu tập các vai trò' },
  { time: '14:05', role: 'Comm', color: '#3b82f6', text: 'Báo cho quản lý, cập nhật status page sang "Service degraded"' },
  { time: '14:08', role: 'Ops', color: '#ef4444', text: 'Phát hiện CPU master database 100%, connection pool cạn' },
  { time: '14:10', role: 'Dev', color: '#22c55e', text: 'Định vị slow query release hôm qua là nguyên nhân gốc' },
  { time: '14:12', role: 'Commander', color: '#8b5cf6', text: 'Quyết định: rollback ngay thay đổi hôm qua + failover database master/slave' },
  { time: '14:15', role: 'Ops', color: '#ef4444', text: 'Failover database master/slave xong, connection phục hồi' },
  { time: '14:18', role: 'Dev', color: '#22c55e', text: 'Deploy rollback code hoàn tất' },
  { time: '14:20', role: 'Comm', color: '#3b82f6', text: 'Tỉ lệ thanh toán thành công về 99.8%, báo các bên dịch vụ phục hồi' }
]
</script>

<style scoped>
.incident-command-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.header { margin-bottom: 1.5rem; }
.title { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.org-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.org-level { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

.org-connector {
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
}

.connector-line {
  width: 2px;
  height: 24px;
  background: var(--vp-c-divider);
}

.role-card {
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
  min-width: 130px;
}

.role-card:hover { border-color: var(--vp-c-brand); transform: translateY(-2px); }
.role-card.active { border-color: var(--vp-c-brand); box-shadow: 0 2px 12px rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.15); }
.role-card.commander { border-width: 3px; }

.role-icon { font-size: 1.5rem; margin-bottom: 0.25rem; }
.role-name { font-weight: 600; font-size: 0.9rem; }
.role-eng { font-size: 0.75rem; color: var(--vp-c-text-3); }

.role-detail {
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

.detail-icon { font-size: 1.3rem; }
.detail-name { font-weight: 700; font-size: 1rem; }

.detail-body { padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
.detail-section { display: flex; flex-direction: column; gap: 0.3rem; }
.section-label { font-weight: 600; font-size: 0.85rem; color: var(--vp-c-text-2); }

.responsibilities { display: flex; flex-direction: column; gap: 0.3rem; }

.resp-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.resp-num {
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--vp-c-bg-soft);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.7rem; font-weight: 700; flex-shrink: 0;
}

.skills { display: flex; gap: 0.4rem; flex-wrap: wrap; }

.skill-tag {
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.8rem;
}

.quote-box {
  font-size: 0.85rem;
  padding: 0.6rem 0.8rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
  font-style: italic;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.scenario-box {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.scenario-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.75rem; }

.scenario-timeline { display: flex; flex-direction: column; gap: 0.4rem; }

.event-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  padding: 0.3rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.event-item:last-child { border-bottom: none; }

.event-time {
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  min-width: 40px;
}

.event-role {
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 45px;
  text-align: center;
}

.event-text { color: var(--vp-c-text-1); }

@media (max-width: 768px) {
  .org-level { flex-direction: column; align-items: center; }
  .event-item { flex-wrap: wrap; }
}
</style>
