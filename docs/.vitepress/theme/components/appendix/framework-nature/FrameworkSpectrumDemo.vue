<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">Phổ các framework</span>
      <span class="subtitle">Runtime ↔ Compile-time</span>
    </div>

    <div class="visualization-area">
      <div class="spectrum-wrapper">
        <div class="spectrum-labels">
          <span class="spectrum-label-left">Thiên về runtime</span>
          <span class="spectrum-label-right">Thiên về compile-time</span>
        </div>
        <div class="spectrum-bar">
          <button
            v-for="fw in frameworks"
            :key="fw.id"
            :class="['spectrum-dot', { selected: selectedId === fw.id }]"
            :style="{ left: fw.percent + '%' }"
            :title="fw.name"
            @click="selectFramework(fw.id)"
          >
            {{ fw.short }}
          </button>
        </div>
        <div class="spectrum-dot-labels">
          <span
            v-for="fw in frameworks"
            :key="'label-' + fw.id"
            class="dot-label"
            :style="{ left: fw.percent + '%' }"
          >
            {{ fw.name }}
          </span>
        </div>
      </div>

      <div class="detail-card">
        <div class="detail-header">
          <span class="detail-emoji">{{ selected.emoji }}</span>
          <span class="detail-name">{{ selected.name }}</span>
        </div>
        <div class="detail-summary">{{ selected.summary }}</div>
        <div class="work-bars">
          <div class="work-bar-row">
            <span class="work-label">Khối lượng runtime</span>
            <div class="work-bar-track">
              <div
                class="work-bar-fill runtime"
                :style="{ width: selected.runtimePercent + '%' }"
              />
            </div>
            <span class="work-value">{{ selected.runtimePercent }}%</span>
          </div>
          <div class="work-bar-row">
            <span class="work-label">Khối lượng compile-time</span>
            <div class="work-bar-track">
              <div
                class="work-bar-fill compile"
                :style="{ width: selected.compilePercent + '%' }"
              />
            </div>
            <span class="work-value">{{ selected.compilePercent }}%</span>
          </div>
        </div>
        <div class="detail-meta">
          <span class="meta-item">
            <span class="meta-label">Bundle size</span>
            <span class="meta-value">{{ selected.bundleSize }}</span>
          </span>
          <span class="meta-item">
            <span class="meta-label">Trải nghiệm dev</span>
            <span class="meta-value">{{ selected.devExperience }}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Xu hướng:</strong>
      {{ selected.trendMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const FRAMEWORKS = {
  react: {
    id: 'react',
    name: 'React',
    short: 'R',
    emoji: '⚛️',
    percent: 20,
    runtimePercent: 80,
    compilePercent: 20,
    bundleSize: 'Trung bình',
    devExperience: '★★★★☆',
    summary: 'Chủ yếu runtime: Virtual DOM + Reconciliation',
    trendMessage:
      'Xu hướng rất rõ: framework đang dần chuyển công việc từ runtime sang compile-time, mục tiêu là vừa có trải nghiệm dev tốt hơn vừa có hiệu năng chạy mượt hơn.'
  },
  vue3: {
    id: 'vue3',
    name: 'Vue 3',
    short: 'V',
    emoji: '💚',
    percent: 40,
    runtimePercent: 60,
    compilePercent: 40,
    bundleSize: 'Trung bình',
    devExperience: '★★★★★',
    summary: 'Lai: tối ưu template lúc compile + Virtual DOM ở runtime',
    trendMessage:
      'Xu hướng rất rõ: framework đang dần chuyển công việc từ runtime sang compile-time, mục tiêu là vừa có trải nghiệm dev tốt hơn vừa có hiệu năng chạy mượt hơn.'
  },
  vapor: {
    id: 'vapor',
    name: 'Vue Vapor',
    short: 'Vp',
    emoji: '🌫️',
    percent: 60,
    runtimePercent: 40,
    compilePercent: 60,
    bundleSize: 'Nhỏ',
    devExperience: '★★★★☆',
    summary: 'Chủ yếu compile-time: bỏ qua Virtual DOM, compile thẳng thành thao tác trực tiếp',
    trendMessage:
      'Xu hướng rất rõ: framework đang dần chuyển công việc từ runtime sang compile-time, mục tiêu là vừa có trải nghiệm dev tốt hơn vừa có hiệu năng chạy mượt hơn.'
  },
  svelte: {
    id: 'svelte',
    name: 'Svelte',
    short: 'S',
    emoji: '🔥',
    percent: 80,
    runtimePercent: 20,
    compilePercent: 80,
    bundleSize: 'Rất nhỏ',
    devExperience: '★★★★☆',
    summary: 'Chủ yếu compile-time: sinh sẵn code cập nhật DOM chính xác lúc compile',
    trendMessage:
      'Xu hướng rất rõ: framework đang dần chuyển công việc từ runtime sang compile-time, mục tiêu là vừa có trải nghiệm dev tốt hơn vừa có hiệu năng chạy mượt hơn.'
  },
  solid: {
    id: 'solid',
    name: 'Solid.js',
    short: 'Sd',
    emoji: '⬆️',
    percent: 90,
    runtimePercent: 10,
    compilePercent: 90,
    bundleSize: 'Rất nhỏ',
    devExperience: '★★★★☆',
    summary: 'Hoàn toàn compile-time: reactivity mịn, không có Virtual DOM',
    trendMessage:
      'Xu hướng rất rõ: framework đang dần chuyển công việc từ runtime sang compile-time, mục tiêu là vừa có trải nghiệm dev tốt hơn vừa có hiệu năng chạy mượt hơn.'
  }
}

const frameworks = Object.values(FRAMEWORKS)
const selectedId = ref('vue3')

const selected = computed(() => FRAMEWORKS[selectedId.value] ?? FRAMEWORKS.vue3)

function selectFramework(id) {
  selectedId.value = id
}
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.visualization-area {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 0.75rem;
}

.spectrum-wrapper {
  position: relative;
  margin: 2rem 0 3rem;
}

.spectrum-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.spectrum-bar {
  position: relative;
  height: 8px;
  background: linear-gradient(
    to right,
    var(--vp-c-brand),
    var(--vp-c-green-1)
  );
  border-radius: 4px;
}

.spectrum-dot {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  transition: all 0.2s;
  color: var(--vp-c-text-1);
}

.spectrum-dot:hover {
  border-color: var(--vp-c-brand);
}

.spectrum-dot.selected {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 10px var(--vp-c-brand);
  transform: translate(-50%, -50%) scale(1.2);
}

.spectrum-dot-labels {
  position: relative;
  height: 1.5rem;
  margin-top: 0.5rem;
}

.dot-label {
  position: absolute;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.detail-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 1rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.detail-emoji {
  font-size: 1.25rem;
}

.detail-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.detail-summary {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.work-bars {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.work-bar-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.work-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  width: 5rem;
  flex-shrink: 0;
}

.work-bar-track {
  flex: 1;
  height: 6px;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  overflow: hidden;
}

.work-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.work-bar-fill.runtime {
  background: var(--vp-c-brand);
}

.work-bar-fill.compile {
  background: var(--vp-c-green-1);
}

.work-value {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  width: 2.5rem;
  text-align: right;
}

.detail-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.8rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.meta-label {
  color: var(--vp-c-text-2);
}

.meta-value {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.info-box {
  display: flex;
  gap: 0.25rem;
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .dot-label {
    font-size: 0.6rem;
  }

  .spectrum-dot {
    width: 28px;
    height: 28px;
    font-size: 0.6rem;
  }

  .detail-card {
    width: 100%;
  }
}
</style>
