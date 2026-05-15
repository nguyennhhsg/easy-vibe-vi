<template>
  <div class="url-to-browser-demo">
    <div class="stage-tracker">
      <button
        v-for="(stage, index) in stages"
        :key="index"
        class="tracker-node"
        :class="{
          active: currentStage === index,
          visited: currentStage > index
        }"
        @click="currentStage = index"
      >
        <div class="node-circle">
          <span class="icon">{{ stage.icon }}</span>
        </div>
        <span class="node-label">{{ stage.name }}</span>
      </button>
      <div class="tracker-line">
        <div
          class="line-fill"
          :style="{ width: (currentStage / (stages.length - 1)) * 100 + '%' }"
        />
      </div>
    </div>

    <div class="stage-display">
      <div class="header">
        <h2>{{ stages[currentStage].title }}</h2>
        <p>{{ stages[currentStage].desc }}</p>
      </div>

      <div class="component-wrapper">
        <transition
          name="fade"
          mode="out-in"
        >
          <component
            :is="stages[currentStage].component"
            :key="currentStage"
          />
        </transition>
      </div>

      <div
        v-if="currentStage < stages.length - 1"
        class="action-footer"
      >
        <button
          class="next-btn"
          @click="nextStage"
        >
          Bước tiếp theo →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStage = ref(0)

const stages = [
  {
    name: 'URL',
    title: '1. Viết phiếu đặt hàng (URL)',
    desc: 'Bạn muốn mua một món đồ chơi. Trước tiên phải ghi rõ trên đơn: đến cửa hàng nào (domain), mua gì (path), gửi bằng dịch vụ nào (protocol).',
    icon: '📝',
    component: 'UrlParserDemo'
  },
  {
    name: 'DNS',
    title: '2. Tìm địa chỉ cửa hàng (DNS)',
    desc: 'Anh shipper không biết "tiệm đồ chơi" ở đâu. Anh ấy cần tra bản đồ (DNS) để đổi tên cửa hàng thành toạ độ GPS cụ thể (địa chỉ IP).',
    icon: '🧭',
    component: 'DnsLookupDemo'
  },
  {
    name: 'TCP',
    title: '3. Bắt đầu cuộc gọi (TCP)',
    desc: 'Tìm được cửa hàng rồi! Trước khi vào, gõ cửa xác nhận: "Có ai không?" "Có!" "Vậy mình vào đây!". Đảm bảo kết nối thông suốt, không phải đi mất công.',
    icon: '📞',
    component: 'TcpHandshakeDemo'
  },
  {
    name: 'HTTP',
    title: '4. Mua hàng (HTTP)',
    desc: 'Vào cửa hàng, bạn đưa đơn đặt: "Cho mình món đồ chơi này". Nhân viên đi vào kho lấy hàng, cuối cùng đưa cho bạn gói hàng chứa đồ chơi (HTML).',
    icon: '📦',
    component: 'HttpExchangeDemo'
  },
  {
    name: 'Render',
    title: '5. Mở hộp lắp ráp (render)',
    desc: 'Về tới nhà, bạn mở gói hàng. Làm theo hướng dẫn (HTML), xếp các khối lego (DOM) lại, tô màu (CSS) - thế là món đồ chơi trở nên đẹp đẽ!',
    icon: '🧩',
    component: 'BrowserRenderingDemo'
  }
]

const nextStage = () => {
  if (currentStage.value < stages.length - 1) {
    currentStage.value++
  }
}
</script>

<style scoped>
.url-to-browser-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 2rem 0;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
}

.stage-tracker {
  display: flex;
  justify-content: space-between;
  padding: 2rem 2rem 1rem;
  position: relative;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.tracker-line {
  position: absolute;
  top: 3.2rem; /* Adjusted for padding */
  left: 3.5rem;
  right: 3.5rem;
  height: 2px;
  background: var(--vp-c-divider);
  z-index: 0;
}

.line-fill {
  height: 100%;
  background: var(--vp-c-brand);
  transition: width 0.3s ease;
}

.tracker-node {
  position: relative;
  z-index: 1;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0;
  width: 60px;
}

.node-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s;
}

.tracker-node.visited .node-circle {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
}

.tracker-node.active .node-circle {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 4px var(--vp-c-brand-dimm);
  transform: scale(1.1);
  background: var(--vp-c-bg);
}

.node-label {
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.tracker-node.active .node-label {
  color: var(--vp-c-brand);
}

.stage-display {
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h2 {
  border: none;
  margin: 0 0 0.5rem 0;
  padding: 0;
  font-size: 1.5rem;
}

.header p {
  margin: 0;
  color: var(--vp-c-text-2);
  max-width: 600px;
  margin: 0 auto;
}

.component-wrapper {
  background: var(--vp-c-bg);
  border-radius: 6px;
  /* padding: 0.75rem; */
}

.action-footer {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.next-btn {
  padding: 0.8rem 2rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.next-btn:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
