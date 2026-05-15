<template>
  <div class="evolution-intro-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">Hành trình tiến hóa kiến trúc backend</span>
      <span class="subtitle">Hiểu 30 năm tiến hóa kiến trúc qua ví von nhà hàng</span>
    </div>

    <div class="timeline-cards">
      <div
        v-for="(stage, idx) in stages"
        :key="idx"
        class="stage-card"
        :class="{ active: currentStage === idx }"
        @click="currentStage = idx"
      >
        <div class="stage-era">
          {{ stage.era }}
        </div>
        <div class="stage-icon">
          {{ stage.icon }}
        </div>
        <div class="stage-name">
          {{ stage.name }}
        </div>
        <div class="stage-arch">
          {{ stage.arch }}
        </div>
      </div>
    </div>

    <div
      v-if="currentStage !== null"
      class="stage-detail"
    >
      <Transition
        name="fade"
        mode="out-in"
      >
        <div
          :key="currentStage"
          class="detail-panel"
        >
          <div class="detail-header">
            <span class="detail-icon">{{ stages[currentStage].icon }}</span>
            <h4>{{ stages[currentStage].restaurant }}</h4>
          </div>
          <div class="detail-content">
            <div class="detail-section">
              <h5>🍽️ Tình huống nhà hàng</h5>
              <p>{{ stages[currentStage].scenario }}</p>
            </div>
            <div class="detail-section">
              <h5>💻 Ánh xạ vào backend</h5>
              <p>{{ stages[currentStage].mapping }}</p>
            </div>
            <div class="detail-section">
              <h5>⚡ Điểm đau cốt lõi</h5>
              <ul>
                <li
                  v-for="(pain, i) in stages[currentStage].pains"
                  :key="i"
                >
                  {{ pain }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Tư tưởng cốt lõi:</strong> Tiến hóa kiến trúc nhằm giải quyết điểm đau của thời đại trước, nhưng cũng kéo theo độ phức tạp mới. Không có kiến trúc tốt nhất, chỉ có kiến trúc phù hợp nhất.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStage = ref(0)

const stages = [
  {
    era: '1990s',
    icon: '🏠',
    name: 'Quán gia đình nhỏ',
    arch: 'Máy chủ vật lý',
    restaurant: 'Bếp gia đình nhỏ',
    scenario: 'Một đầu bếp trong một căn bếp nhỏ, tự mình đi chợ mua rau, rửa rau, thái, xào, dọn món. Khách đông là không xuể, chỉ có thể bắt khách xếp hàng chờ.',
    mapping: 'Một máy chủ vật lý xử lý mọi request: nhận HTTP request, đọc file, chạy script CGI, trả về response. CPU và RAM có hạn, request nhiều thì chỉ còn cách xếp hàng.',
    pains: [
      'Nghẽn hiệu năng đơn máy: khách quá đông, đầu bếp không kham nổi',
      'Mở rộng dọc đắt đỏ: mua máy mạnh hơn giống đổi bếp lớn hơn, chỉ trị triệu chứng',
      'Single point of failure: đầu bếp ốm là cả quán phải đóng cửa'
    ]
  },
  {
    era: '2000s',
    icon: '🏢',
    name: 'Bếp trung tâm lớn',
    arch: 'Kiến trúc monolith',
    restaurant: 'Bếp trung tâm chuỗi nhà hàng',
    scenario: 'Xây một bếp trung tâm lớn, phân công rõ ràng: người chuyên rửa rau, người chuyên thái, người chuyên xào. Nhưng tất cả làm việc trong cùng một không gian lớn, phụ thuộc lẫn nhau.',
    mapping: 'Kiến trúc monolith: tất cả module (user, order, payment) chạy trong cùng một process, dùng chung một database, triển khai trên một application server lớn.',
    pains: [
      'Sửa một chỗ ảnh hưởng toàn bộ: thợ thái rau bị đứt tay, cả bếp phải dừng',
      'Nợ kỹ thuật chồng chất: code cũ ngày càng nhiều, người mới khó tiếp quản',
      'Rủi ro triển khai cao: cập nhật một món (tính năng) có thể ảnh hưởng cả menu (hệ thống)'
    ]
  },
  {
    era: '2010s',
    icon: '🏭',
    name: 'Chuyên môn hóa',
    arch: 'Kiến trúc microservice',
    restaurant: 'Tập đoàn ẩm thực nhiều bếp',
    scenario: 'Tách bếp trung tâm thành nhiều bếp chuyên: một bếp chuyên đồ Á, một bếp chuyên đồ Âu, một bếp chuyên tráng miệng. Mỗi bếp vận hành độc lập, phối hợp qua quy trình chuẩn hóa.',
    mapping: 'Kiến trúc microservice: mỗi business function (user service, order service, payment service) là process độc lập, có database riêng, giao tiếp qua HTTP/gRPC.',
    pains: [
      'Độ phức tạp phân tán: phối hợp nhiều bếp khó hơn quản lý một bếp nhiều',
      'Phụ thuộc mạng: bếp Á cần nguyên liệu từ bếp Âu, có thể bị độ trễ mạng hoặc lỗi',
      'Chi phí vận hành tăng vọt: cần thêm nhân lực (kỹ sư DevOps) quản lý các bếp'
    ]
  },
  {
    era: '2020s+',
    icon: '🍽️',
    name: 'Nền tảng giao đồ ăn',
    arch: 'Serverless',
    restaurant: 'Đặt món/Cloud kitchen',
    scenario: 'Bạn không tự mở bếp nữa, mà đăng ký trên nền tảng giao đồ ăn. Khi có đơn, nền tảng điều phối các bếp gần đó làm món cho bạn. Bạn chỉ lo thiết kế món và quảng bá, không cần quan tâm bếp ở đâu, có bao nhiêu đầu bếp.',
    mapping: 'Kiến trúc Serverless: developer chỉ viết code nghiệp vụ (hàm), không quan tâm server ở đâu, có bao nhiêu máy, scale ra sao. Cloud platform tự điều phối tài nguyên, tính phí theo thời gian thực thi thực tế.',
    pains: [
      'Độ trễ cold start: bếp đầu tiên nhận đơn cần thời gian khởi động (cold start), khách phải chờ',
      'Phụ thuộc nền tảng: phụ thuộc hoàn toàn vào nhà cung cấp cloud, khó migrate',
      'Giới hạn tài nguyên: không làm món quá phức tạp (hàm có giới hạn thời gian và RAM)'
    ]
  }
]
</script>

<style scoped>
.evolution-intro-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header .icon {
  font-size: 1rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  margin-left: 0.4rem;
}

.timeline-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.stage-card {
  background: var(--vp-c-bg);
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0.75rem 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.stage-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.stage-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.stage-era {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.1rem;
}

.stage-icon {
  font-size: 1rem;
  margin-bottom: 0.2rem;
}

.stage-name {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.1rem;
}

.stage-arch {
  font-size: 0.55rem;
  color: var(--vp-c-text-3);
}

.stage-detail {
  background: var(--vp-c-bg);
  border-radius: 4px;
  padding: 0.5rem;
}

.detail-panel {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1rem;
}

.detail-header h4 {
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0;
  color: var(--vp-c-text-1);
}

.detail-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
}

.detail-section h5 {
  font-size: 0.7rem;
  font-weight: 600;
  margin: 0 0 0.3rem 0;
  color: var(--vp-c-brand);
}

.detail-section p {
  font-size: 0.65rem;
  line-height: 1.4;
  margin: 0 0 0.3rem 0;
  color: var(--vp-c-text-2);
}

.detail-section ul {
  margin: 0;
  padding-left: 0.75rem;
}

.detail-section li {
  font-size: 0.6rem;
  line-height: 1.4;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-2);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media (max-width: 768px) {
  .timeline-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .detail-content {
    grid-template-columns: 1fr;
  }
}
</style>
