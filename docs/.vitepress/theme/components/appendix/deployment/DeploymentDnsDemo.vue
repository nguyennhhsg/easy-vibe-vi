<!--
  DeploymentDnsDemo.vue
  DNS resolution (bản rút gọn)
-->
<template>
  <div class="deployment-dns">
    <div class="header">
      <span class="icon">🔍</span>
      <span class="title">DNS resolution</span>
      <span class="subtitle">Biến "tên dễ nhớ" thành "IP máy hiểu được"</span>
    </div>

    <div class="flow">
      <div class="step">
        <span class="emoji">💻</span>
        <span class="text">User nhập domain</span>
      </div>
      <span class="arrow">→</span>
      <div class="step">
        <span class="emoji">📋</span>
        <span class="text">Truy vấn DNS</span>
      </div>
      <span class="arrow">→</span>
      <div class="step success">
        <span class="emoji">✅</span>
        <span class="text">Trả về IP</span>
      </div>
    </div>

    <div class="example">
      <span class="label">Ví dụ:</span>
      <code>example.com → 192.168.1.1</code>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.deployment-dns {
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

.flow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  min-width: 60px;
}

.step.success {
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-delta);
}

.step .emoji {
  font-size: 1.25rem;
}

.step .text {
  font-weight: 600;
}

.arrow {
  font-size: 1rem;
  color: var(--vp-c-text-3);
}

.example {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.85rem;
}

.example .label {
  color: var(--vp-c-text-2);
}

.example code {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}
</style>
