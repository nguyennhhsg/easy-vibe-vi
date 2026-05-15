<!--
  DeploymentServerDemo.vue
  Chọn server (bản rút gọn)
-->
<template>
  <div class="deployment-server">
    <div class="header">
      <span class="icon">🖥️</span>
      <span class="title">Chọn server</span>
      <span class="subtitle">Chọn mặt bằng phù hợp theo lượng khách</span>
    </div>

    <div class="scenarios">
      <div
        class="scenario"
        :class="{ active: scenario === 'personal' }"
        @click="scenario = 'personal'"
      >
        <span class="name">Blog cá nhân</span>
        <span class="spec">1 core 1G</span>
        <span class="cost">~150K/tháng</span>
      </div>
      <div
        class="scenario"
        :class="{ active: scenario === 'small' }"
        @click="scenario = 'small'"
      >
        <span class="name">E-commerce nhỏ</span>
        <span class="spec">2 core 4G</span>
        <span class="cost">~1tr/tháng</span>
      </div>
      <div
        class="scenario"
        :class="{ active: scenario === 'medium' }"
        @click="scenario = 'medium'"
      >
        <span class="name">Ứng dụng vừa</span>
        <span class="spec">4 core 8G</span>
        <span class="cost">~3tr/tháng</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const scenario = ref('small')
</script>

<style scoped>
.deployment-server {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.header .icon {
  font-size: 1.25rem;
}

.header .title {
  font-weight: 700;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.scenarios {
  display: flex;
  gap: 0.5rem;
}

.scenario {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.scenario:hover {
  border-color: var(--vp-c-brand-soft);
}

.scenario.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
}

.scenario .name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.scenario .spec {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.scenario .cost {
  font-weight: 700;
  color: var(--vp-c-brand);
}
</style>
