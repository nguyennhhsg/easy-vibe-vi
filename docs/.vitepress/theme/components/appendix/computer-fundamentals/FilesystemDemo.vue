<template>
  <div class="demo">
    <div class="title">📁 File bạn thấy vs các mảnh trên ổ cứng</div>

    <div class="scene">
      <!-- View file -->
      <div class="file-view">
        <div class="view-label">📂 Bạn thấy (thư mục)</div>
        <div class="folder-tree">
          <div class="folder">
            <span class="folder-icon">📁</span>
            <span>Ảnh</span>
          </div>
          <div class="files">
            <div
              class="file-item"
              :class="{ active: currentFile === 'pet' }"
            >
              <span class="file-icon">🖼️</span>
              <span>thucung.jpg</span>
              <span class="file-size">2.5MB</span>
            </div>
            <div
              class="file-item"
              :class="{ active: currentFile === 'trip' }"
            >
              <span class="file-icon">🖼️</span>
              <span>dulich.png</span>
              <span class="file-size">1.8MB</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Animation đọc -->
      <div class="read-animation" v-if="isReading">
        <div class="read-text">Đang đọc...</div>
        <div class="read-blocks">
          <div 
            v-for="(block, idx) in readingBlocks" 
            :key="idx"
            class="read-block"
            :class="{ read: idx <= readProgress }"
            :style="{ animationDelay: idx * 0.1 + 's' }"
          >
            {{ block }}
          </div>
        </div>
      </div>

      <!-- View ổ cứng -->
      <div class="disk-view">
        <div class="view-label">💾 Lưu thực tế trên ổ cứng (data block)</div>
        <div class="disk-grid">
          <div
            v-for="n in 12"
            :key="n"
            class="disk-block"
            :class="[
              getBlockType(n),
              { 
                active: isReading && currentBlocks.includes(n),
                reading: isReading && currentBlocks.indexOf(n) === readProgress
              }
            ]"
          >
            <span class="block-num">{{ n }}</span>
            <span class="block-content">{{ getBlockContent(n) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="explain">
      <strong>💡 Nguyên lý:</strong> Hệ thống file cắt file thành nhiều mảnh lưu rải rác trên ổ cứng (ví dụ thucung.jpg nằm ở block 3, 7, 11), sau đó dùng một "sổ cái" để ghi nhớ vị trí. Thư mục gọn gàng bạn nhìn thấy chỉ là bản ghi trong sổ cái thôi.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentFile = ref('')
const isReading = ref(false)
const readProgress = ref(-1)
const currentBlocks = ref([])

// Vị trí lưu file
const fileLocations = {
  pet: [3, 7, 11],    // thucung.jpg nằm ở block 3, 7, 11
  trip: [5, 6]        // dulich.png nằm ở block 5, 6
}

// Nội dung từng block
const blockContents = {
  3: 'TC-1',
  7: 'TC-2',
  11: 'TC-3',
  5: 'DL-1',
  6: 'DL-2'
}

let timer = null
let phase = 0

const getBlockType = (n) => {
  if (fileLocations.pet.includes(n)) return 'pet'
  if (fileLocations.trip.includes(n)) return 'trip'
  return 'empty'
}

const getBlockContent = (n) => {
  return blockContents[n] || ''
}

const readingBlocks = computed(() => {
  return currentBlocks.value.map(b => blockContents[b] || '')
})

const runDemo = () => {
  switch(phase) {
    case 0: // Bắt đầu đọc thucung.jpg
      currentFile.value = 'pet'
      currentBlocks.value = fileLocations.pet
      isReading.value = true
      readProgress.value = -1
      phase = 1
      break
    case 1: // Đọc từng block
      if (readProgress.value < currentBlocks.value.length - 1) {
        readProgress.value++
      } else {
        phase = 2
      }
      break
    case 2: // Đọc xong, dừng
      isReading.value = false
      phase = 3
      break
    case 3: // Bắt đầu đọc dulich.png
      currentFile.value = 'trip'
      currentBlocks.value = fileLocations.trip
      isReading.value = true
      readProgress.value = -1
      phase = 4
      break
    case 4: // Đọc từng block
      if (readProgress.value < currentBlocks.value.length - 1) {
        readProgress.value++
      } else {
        phase = 5
      }
      break
    case 5: // Reset
      isReading.value = false
      currentFile.value = ''
      currentBlocks.value = []
      phase = 0
      break
  }
}

onMounted(() => {
  timer = setInterval(runDemo, 800)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 1rem 0;
}

.title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
  text-align: center;
}

.scene {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.file-view, .disk-view {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 10px;
}

.view-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.folder-tree {
  padding-left: 8px;
}

.folder {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  margin-bottom: 4px;
}

.folder-icon {
  font-size: 16px;
}

.files {
  padding-left: 20px;
  border-left: 1px dashed var(--vp-c-divider);
  margin-left: 8px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 12px;
  transition: all 0.3s;
}

.file-item.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.file-icon {
  font-size: 14px;
}

.file-size {
  margin-left: auto;
  font-size: 10px;
  color: var(--vp-c-text-3);
}

.file-item.active .file-size {
  color: var(--vp-c-brand);
}

.read-animation {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 10px;
  text-align: center;
}

.read-text {
  font-size: 11px;
  color: var(--vp-c-brand);
  margin-bottom: 8px;
  font-weight: 600;
}

.read-blocks {
  display: flex;
  justify-content: center;
  gap: 4px;
}

.read-block {
  width: 32px;
  height: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  color: var(--vp-c-text-3);
  transition: all 0.2s;
}

.read-block.read {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
  animation: pulse 0.3s ease;
}

.disk-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
}

.disk-block {
  aspect-ratio: 1;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  transition: all 0.3s;
  position: relative;
}

.disk-block.empty {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
}

.disk-block.pet {
  background: #16a34a22;
  border-color: #16a34a55;
  color: #16a34a;
}

.disk-block.trip {
  background: #3b82f622;
  border-color: #3b82f655;
  color: #3b82f6;
}

.disk-block.active {
  box-shadow: 0 0 8px currentColor;
}

.disk-block.reading {
  transform: scale(1.1);
  font-weight: 600;
  animation: glow 0.5s ease infinite alternate;
}

.disk-block.pet.reading {
  background: #16a34a;
  color: white;
}

.disk-block.trip.reading {
  background: #3b82f6;
  color: white;
}

.block-num {
  font-size: 8px;
  opacity: 0.6;
  position: absolute;
  top: 2px;
  left: 3px;
}

.block-content {
  font-weight: 600;
}

.explain {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  padding: 10px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.explain strong { color: var(--vp-c-text-1); }

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes glow {
  from { box-shadow: 0 0 5px currentColor; }
  to { box-shadow: 0 0 15px currentColor; }
}
</style>
