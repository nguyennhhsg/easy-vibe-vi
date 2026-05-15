<template>
  <Transition name="progress-fade">
    <div 
      v-if="showProgress" 
      class="reading-progress"
      :class="{ 'is-dragging': isDragging }"
      :title="progressTitle"
      @mousedown="startDrag"
      @touchstart="startDrag"
      @click="handleClick"
    >
      <svg class="progress-ring" viewBox="0 0 56 56">
        <circle
          class="progress-ring-bg"
          cx="28"
          cy="28"
          r="24"
        />
        <circle
          class="progress-ring-circle"
          cx="28"
          cy="28"
          r="24"
          :style="{ strokeDashoffset: circumference - (progress / 100) * circumference }"
        />
      </svg>
      <Transition name="content-switch">
        <div v-if="showArrow && !isDragging" key="arrow" class="progress-arrow">↑</div>
        <div v-else key="percent" class="progress-text">{{ progress }}%</div>
      </Transition>

      <div v-if="!isDragging && bookmarkLabel" class="bookmark-label">
        {{ bookmarkLabel }}
      </div>
      
      <!-- Gợi ý khi đang kéo -->
      <div v-if="isDragging" class="drag-hint">Kéo để điều chỉnh</div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, nextTick, ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import {
  createReadingBookmarkSnapshot,
  readReadingBookmark,
  writeReadingBookmark
} from '../utils/readingBookmark.js'

const route = useRoute()
const progress = ref(0)
const showProgress = ref(false)
const showArrow = ref(false)
const articleTitle = ref('')
const activeSection = ref('')
const restoredBookmark = ref(null)
// Circle circumference = 2 * PI * r, where r=24
const circumference = 2 * Math.PI * 24
let scrollTimer = null
let saveTimer = null
let restoreTimer = null
let clickSaveTimer = null

// Trạng thái liên quan đến thao tác kéo
const isDragging = ref(false)
const startY = ref(0)
const startProgress = ref(0)
const movedDuringDrag = ref(false)
let dragRafId = null
let skipNextClick = false

const currentPath = () =>
  `${window.location.pathname}${window.location.search || ''}`

const getClientStorage = () => {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

const getMaxScrollY = () =>
  Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

const getArticleTitle = () => {
  const heading = document.querySelector('.vp-doc h1')
  return (heading?.textContent || document.title || '').trim()
}

const updateActiveSection = () => {
  const headings = Array.from(
    document.querySelectorAll('.vp-doc h2, .vp-doc h3')
  )
  let current = ''

  for (const heading of headings) {
    if (heading.getBoundingClientRect().top <= 96) {
      current = heading.textContent?.trim() || ''
    } else {
      break
    }
  }

  activeSection.value = current
}

const bookmarkLabel = computed(() => {
  const title = articleTitle.value || restoredBookmark.value?.title || ''
  const section = activeSection.value || restoredBookmark.value?.section || ''
  return section || title
})

const bookmarkTitle = computed(() => {
  const title =
    articleTitle.value || restoredBookmark.value?.title || 'Bài hiện tại'
  const section = activeSection.value || restoredBookmark.value?.section || ''
  return section ? `${title} - ${section}` : title
})

const progressTitle = computed(() =>
  isDragging.value
    ? 'Kéo để điều chỉnh vị trí'
    : `${bookmarkTitle.value} · Tiến độ đọc ${progress.value}%`
)

const clearBookmarkSaveTimer = () => {
  if (saveTimer) {
    window.clearTimeout(saveTimer)
    saveTimer = null
  }
}

const clearClickSaveTimer = () => {
  if (clickSaveTimer) {
    window.clearTimeout(clickSaveTimer)
    clickSaveTimer = null
  }
}

const saveBookmark = (path = currentPath()) => {
  writeReadingBookmark(
    getClientStorage(),
    createReadingBookmarkSnapshot({
      path,
      getTitle: () => articleTitle.value,
      getSection: () => activeSection.value,
      getScrollY: () => window.scrollY,
      getProgress: () => progress.value
    })
  )
}

const scheduleBookmarkSave = () => {
  const path = currentPath()
  clearBookmarkSaveTimer()
  saveTimer = window.setTimeout(() => {
    saveTimer = null
    saveBookmark(path)
  }, 180)
}

const updateProgress = () => {
  // Không cập nhật tiến độ khi đang kéo để tránh xung đột
  if (isDragging.value) return

  articleTitle.value = getArticleTitle()
  updateActiveSection()
  
  const scrollTop = window.scrollY
  const docHeight = getMaxScrollY()
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
  
  progress.value = Math.min(Math.round(scrollPercent), 100)
  showProgress.value = scrollTop > 0 // Hiển thị ngay khi bắt đầu cuộn
  restoredBookmark.value = null

  // Hiển thị phần trăm khi đang cuộn
  showArrow.value = false

  // Xoá timer cũ
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }

  // Hiển thị mũi tên sau 1.5s ngừng cuộn
  scrollTimer = window.setTimeout(() => {
    if (window.scrollY > 0) {
      showArrow.value = true
    }
  }, 1500)

  scheduleBookmarkSave()
}

const restoreBookmark = async () => {
  await nextTick()

  if (restoreTimer) {
    window.clearTimeout(restoreTimer)
  }

  restoreTimer = window.setTimeout(() => {
    articleTitle.value = getArticleTitle()
    updateActiveSection()

    const saved = readReadingBookmark(
      getClientStorage(),
      currentPath(),
      getMaxScrollY()
    )

    if (!saved || saved.scrollY <= 0) {
      updateProgress()
      return
    }

    restoredBookmark.value = saved
    articleTitle.value = saved.title || articleTitle.value
    activeSection.value = saved.section || activeSection.value
    progress.value = saved.progress
    showProgress.value = true
    showArrow.value = true

    window.scrollTo({
      top: saved.scrollY,
      behavior: 'auto'
    })

    window.setTimeout(updateProgress, 0)
  }, 80)
}

const resetRouteState = () => {
  progress.value = 0
  showProgress.value = false
  showArrow.value = false
  restoredBookmark.value = null
  articleTitle.value = ''
  activeSection.value = ''
}

// Bắt đầu kéo
const startDrag = (e) => {
  e.preventDefault()

  isDragging.value = true
  startY.value = 'touches' in e ? e.touches[0].clientY : e.clientY
  startProgress.value = progress.value
  movedDuringDrag.value = false

  // Đăng ký lắng nghe sự kiện toàn cục
  document.addEventListener('mousemove', onDrag, { passive: false })
  document.addEventListener('mouseup', endDrag)
  document.addEventListener('touchmove', onDrag, { passive: false })
  document.addEventListener('touchend', endDrag)
}

// Trong khi kéo
const onDrag = (e) => {
  if (!isDragging.value) return
  e.preventDefault()

  const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY
  const deltaY = startY.value - currentY // Kéo lên là giá trị dương
  if (Math.abs(deltaY) > 4) {
    movedDuringDrag.value = true
  }

  // Mỗi 3px kéo điều chỉnh 1% tiến độ
  const sensitivity = 3
  const progressDelta = deltaY / sensitivity

  // Tính giá trị tiến độ mới
  let newProgress = startProgress.value + progressDelta
  newProgress = Math.max(0, Math.min(100, newProgress))

  // Dùng requestAnimationFrame để tối ưu hiệu năng
  if (dragRafId) {
    cancelAnimationFrame(dragRafId)
  }

  dragRafId = requestAnimationFrame(() => {
    progress.value = Math.round(newProgress)

    // Cuộn trang theo thời gian thực
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    if (docHeight > 0) {
      window.scrollTo({
        top: (progress.value / 100) * docHeight,
        behavior: 'auto' // Dùng auto khi kéo để tránh trễ
      })
    }
  })
}

// Kết thúc kéo
const endDrag = () => {
  const shouldSkipClick = movedDuringDrag.value
  isDragging.value = false

  // Gỡ bỏ lắng nghe sự kiện
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', endDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', endDrag)

  if (dragRafId) {
    cancelAnimationFrame(dragRafId)
    dragRafId = null
  }

  // Khôi phục hiển thị mũi tên
  if (window.scrollY > 0) {
    showArrow.value = true
  }

  articleTitle.value = getArticleTitle()
  updateActiveSection()
  saveBookmark()

  if (shouldSkipClick) {
    skipNextClick = true
    window.setTimeout(() => {
      skipNextClick = false
    }, 0)
  }
}

// Nhấp để về đầu trang
const handleClick = () => {
  // Nếu là cú nhấp ngay sau khi kéo thì không cuộn về đầu trang
  if (isDragging.value || skipNextClick) {
    skipNextClick = false
    return
  }
  
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  const path = currentPath()
  clearClickSaveTimer()
  clickSaveTimer = window.setTimeout(() => {
    clickSaveTimer = null
    updateProgress()
    saveBookmark(path)
  }, 400)
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  restoreBookmark()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }
  clearBookmarkSaveTimer()
  if (restoreTimer) {
    clearTimeout(restoreTimer)
  }
  clearClickSaveTimer()
  // Dọn dẹp sự kiện kéo
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', endDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', endDrag)
  if (dragRafId) {
    cancelAnimationFrame(dragRafId)
  }
})

watch(
  () => route.path,
  () => {
    clearBookmarkSaveTimer()
    clearClickSaveTimer()
    resetRouteState()
    restoreBookmark()
  }
)
</script>

<style scoped>
.reading-progress {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 56px;
  height: 56px;
  cursor: grab;
  z-index: 100;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  touch-action: none;
}

.reading-progress:focus {
  outline: none;
}

.reading-progress:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
  border-radius: 50%;
}

.dark .reading-progress {
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.reading-progress:hover {
  transform: scale(1.1);
}

.reading-progress:active {
  transform: scale(0.95);
}

.reading-progress.is-dragging {
  cursor: grabbing;
  transform: scale(1.15);
  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.2));
}

.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-ring-bg {
  fill: var(--vp-c-bg);
  stroke: var(--vp-c-divider);
  stroke-width: 3;
}

.progress-ring-circle {
  fill: none;
  stroke: var(--vp-c-brand-1);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 150.796; /* 2πr = 2 * 3.14159 * 24 */
  transition: stroke-dashoffset 0.1s ease;
}

.reading-progress.is-dragging .progress-ring-circle {
  transition: none; /* Bỏ hiệu ứng chuyển động khi kéo để phản hồi tức thì */
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  pointer-events: none;
  user-select: none;
}

.progress-arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 26px;
  font-weight: bold;
  color: var(--vp-c-brand-1);
  pointer-events: none;
  user-select: none;
  animation: bounce 1s ease-in-out infinite;
}

.bookmark-label {
  position: absolute;
  right: 0;
  bottom: 100%;
  width: max-content;
  max-width: min(260px, calc(100vw - 48px));
  margin-bottom: 8px;
  padding: 5px 9px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: opacity 0.18s ease, transform 0.18s ease;
  transform: translateY(4px);
}

.reading-progress:hover .bookmark-label {
  opacity: 1;
  transform: translateY(0);
}

@keyframes bounce {
  0%, 100% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -60%);
  }
}

/* Gợi ý kéo */
.drag-hint {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  padding: 4px 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 11px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  animation: fadeIn 0.2s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Hoạt ảnh chuyển nội dung */
.content-switch-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.content-switch-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.content-switch-enter-from {
  opacity: 0;
  transform: translate(-50%, -40%) scale(0.8);
}

.content-switch-leave-to {
  opacity: 0;
  transform: translate(-50%, -60%) scale(0.8);
}

/* Hoạt ảnh mờ dần */
.progress-fade-enter-active,
.progress-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.progress-fade-enter-from,
.progress-fade-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
}

/* Tối ưu cho thiết bị di động */
@media (max-width: 768px) {
  .reading-progress {
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
  }

  .progress-text {
    font-size: 11px;
  }
  
  .progress-arrow {
    font-size: 22px;
  }
}
</style>
