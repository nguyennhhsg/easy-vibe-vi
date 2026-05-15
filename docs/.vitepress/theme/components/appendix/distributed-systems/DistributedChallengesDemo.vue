<!--
  DistributedChallengesDemo.vue
  Demo tương tác về các thách thức của hệ thống distributed
-->
<template>
  <div class="challenges-demo">
    <div class="header">
      <div class="title">8 thách thức của hệ thống distributed</div>
      <div class="subtitle">Bấm vào để xem chi tiết và cách xử lý từng thách thức</div>
    </div>

    <div class="challenge-grid">
      <div
        v-for="c in challenges"
        :key="c.key"
        :class="['challenge-card', { active: activeChallenge === c.key }]"
        @click="activeChallenge = activeChallenge === c.key ? null : c.key"
      >
        <div class="challenge-icon">{{ c.icon }}</div>
        <div class="challenge-name">{{ c.name }}</div>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.icon }} {{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="detail-scenario">
        <span class="label">Ví dụ tình huống:</span> {{ current.scenario }}
      </div>
      <div class="detail-solution">
        <span class="label">Cách xử lý:</span>
        <ul class="solution-list">
          <li v-for="(s, i) in current.solutions" :key="i">{{ s }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeChallenge = ref('network')

const challenges = [
  {
    key: 'network',
    name: 'Mạng không tin cậy',
    icon: '🔌',
    desc: 'Các node trong hệ thống distributed giao tiếp qua mạng, mà mạng thì lúc nào cũng có thể mất gói, trễ, hoặc đứt. Đây là thách thức cốt lõi nhất, bạn không bao giờ được giả định mạng luôn ổn.',
    scenario: 'Service A gọi service B, sau 3 giây không nhận được phản hồi. B chưa nhận được? Hay B đã xử lý mà response bị mất? A không cách nào phân biệt.',
    solutions: [
      'Timeout + retry: đặt timeout hợp lý, retry khi fail (cần đảm bảo idempotent)',
      'Heartbeat: định kỳ gửi heartbeat để kiểm tra connection còn sống không',
      'Circuit breaker: liên tục fail thì tạm dừng gọi để tránh cascading failure'
    ]
  },
  {
    key: 'clock',
    name: 'Đồng hồ lệch nhau',
    icon: '⏰',
    desc: 'Đồng hồ vật lý mỗi máy đều lệch chút ít (clock drift), kể cả dùng NTP đồng bộ cũng chỉ chính xác đến mili giây. Trong hệ thống distributed, bạn không thể dựa vào đồng hồ vật lý để xác định thứ tự sự kiện.',
    scenario: 'Node A ghi dữ liệu lúc 10:00:00.001, node B ghi lúc 10:00:00.002. Nhưng đồng hồ của B nhanh 5ms, thực ra B ghi trước.',
    solutions: [
      'Logical clock (Lamport Clock): dùng bộ đếm tăng dần thay cho đồng hồ vật lý',
      'Vector clock: mỗi node duy trì một vector để theo dõi quan hệ nhân quả',
      'TrueTime (Google Spanner): dùng GPS + đồng hồ nguyên tử để cung cấp thời gian có sai số giới hạn'
    ]
  },
  {
    key: 'partition',
    name: 'Network partition',
    icon: '✂️',
    desc: 'Network partition là khi một số node không thể liên lạc với nhau nhưng mỗi bên vẫn chạy. Lúc này hệ thống buộc phải chọn giữa consistency và availability (định lý CAP).',
    scenario: 'Cáp quang giữa data center A và B bị đứt, dịch vụ hai bên vẫn chạy nhưng dữ liệu bắt đầu phân nhánh.',
    solutions: [
      'Chiến lược CP: khi partition thì từ chối ghi để đảm bảo consistency (như ZooKeeper)',
      'Chiến lược AP: khi partition vẫn cho ghi, sau đó merge xung đột (như DynamoDB)',
      'Quorum write: chỉ cần đa số node xác nhận là coi như thành công'
    ]
  },
  {
    key: 'consistency',
    name: 'Đồng nhất dữ liệu',
    icon: '🔄',
    desc: 'Nhiều bản replica thì làm sao giữ dữ liệu đồng nhất? Strong consistency thì performance kém, eventual consistency thì có thể đọc trúng dữ liệu cũ. Không có viên đạn bạc, chỉ có sự đánh đổi.',
    scenario: 'User đổi ảnh đại diện ở node A, nhưng khi refresh thì request bị route sang node B và vẫn thấy ảnh cũ.',
    solutions: [
      'Read your writes: request đọc sau ghi được route về cùng node',
      'Read repair: phát hiện và sửa khi đọc gặp dữ liệu không đồng nhất',
      'Anti-entropy: định kỳ background đối chiếu các replica để sửa chênh lệch'
    ]
  },
  {
    key: 'failure',
    name: 'Lỗi cục bộ',
    icon: '💥',
    desc: 'Trong hệ thống distributed, một số node có thể fail trong khi các node khác vẫn chạy bình thường. Hệ thống cần tiếp tục phục vụ trong tình huống một phần bị lỗi.',
    scenario: 'Cluster 5 node có 2 node down, hệ thống cần quyết định: tiếp tục phục vụ hay dừng? Dữ liệu các node còn lại có đầy đủ không?',
    solutions: [
      'Replica dự phòng: dữ liệu lưu nhiều bản, lỗi single point không ảnh hưởng availability',
      'Phát hiện lỗi: dùng heartbeat và timeout để phát hiện node lỗi nhanh',
      'Tự động failover: khi phát hiện master lỗi, tự động chuyển sang node dự phòng'
    ]
  },
  {
    key: 'split-brain',
    name: 'Split-brain',
    icon: '🧠',
    desc: 'Khi partition mạng chia cluster thành hai phần, cả hai bên đều nghĩ mình là master và nhận ghi, gây xung đột dữ liệu. Đó là split-brain.',
    scenario: 'Trong kiến trúc master-slave, mạng giữa master và slave bị đứt, slave tưởng master chết và tự thăng cấp lên master. Giờ có hai master cùng ghi.',
    solutions: [
      'Bầu cử đa số: chỉ node nào được đa số phiếu mới được làm master',
      'Fencing token: request ghi của master cũ sẽ bị tầng storage từ chối',
      'Arbiter node: thêm node thứ ba để quyết định ai mới là master thật'
    ]
  },
  {
    key: 'ordering',
    name: 'Thứ tự sự kiện',
    icon: '📋',
    desc: 'Trong hệ thống distributed, các sự kiện xảy ra ở các node khác nhau không có thứ tự toàn cục thống nhất. Xác định "ai trước ai sau" là một bài toán nan giải.',
    scenario: 'Hai user đồng thời sửa cùng một document, node A nhận "xoá dòng 3", node B nhận "sửa dòng 3". Kết quả cuối phụ thuộc vào thứ tự thực thi.',
    solutions: [
      'Total Order Broadcast: mọi node xử lý message theo cùng thứ tự',
      'CRDT (Conflict-free Replicated Data Type): cấu trúc dữ liệu tự đảm bảo merge không xung đột',
      'OT (Operational Transformation): thuật toán collaborative editing mà Google Docs dùng'
    ]
  },
  {
    key: 'transaction',
    name: 'Distributed transaction',
    icon: '🔐',
    desc: 'Thao tác qua nhiều node làm sao đảm bảo atomic? Hoặc tất cả thành công, hoặc tất cả rollback. Phức tạp hơn nhiều so với transaction đơn máy.',
    scenario: 'Đặt hàng e-commerce: trừ tồn kho ở service A, trừ tiền ở service B, tạo order ở service C. Nếu trừ tiền fail, tồn kho phải rollback.',
    solutions: [
      '2PC (Two-Phase Commit): coordinator hỏi tất cả participant có thể commit không rồi mới commit thống nhất',
      'Saga: mỗi bước có thao tác bù trừ tương ứng, fail thì rollback từng bước',
      'TCC (Try-Confirm-Cancel): giữ chỗ resource → xác nhận → huỷ'
    ]
  }
]

const current = computed(() =>
  challenges.find(c => c.key === activeChallenge.value)
)
</script>

<style scoped>
.challenges-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.challenge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.challenge-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.6rem 0.4rem;
  border-radius: 8px;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.challenge-card:hover { border-color: var(--vp-c-brand); }
.challenge-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.05);
}
.challenge-icon { font-size: 1.3rem; }
.challenge-name { font-size: 0.75rem; font-weight: 600; text-align: center; }
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.4rem; }
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}
.detail-scenario {
  font-size: 0.82rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: rgba(245, 158, 11, 0.06);
  border-radius: 6px;
}
.detail-solution { font-size: 0.82rem; }
.solution-list {
  margin: 0.3rem 0 0 1.2rem;
  padding: 0;
}
.solution-list li {
  margin-bottom: 0.2rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
.label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
