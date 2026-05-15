<template>
  <div class="demo-wrapper">
    <div class="demo-header">Accessibility (a11y) / Cách screen reader nhìn bạn</div>

    <div class="split-pane">
      <!-- Cách làm tệ -->
      <div class="pane bad-pane">
        <h4 class="pane-title label-bad">Cách làm dở: toàn DIV</h4>

        <div class="component-card">
          <!-- Toàn bộ là component giả lập bằng div -->
          <div
            class="fake-btn"
            @mouseenter="speakBad('Gửi')"
            @mouseleave="stopSpeak"
            @keydown.enter="showError"
          >
            Gửi
          </div>

          <div
            class="fake-icon"
            @mouseenter="speakBad('Hình chữ X')"
            @mouseleave="stopSpeak"
          >
            ✖
          </div>
        </div>

        <div class="reader-box">
          <div class="reader-header">Screen reader đọc:</div>
          <div class="reader-text" :class="{ empty: !currentBadSpeech }">
            {{ currentBadSpeech || '(chỉ có chữ, không rõ chức năng, Enter trên bàn phím không có tác dụng)' }}
          </div>
        </div>
      </div>

      <!-- Cách làm tốt -->
      <div class="pane good-pane">
        <h4 class="pane-title label-good">Frontend chuẩn: semantic + ARIA</h4>

        <div class="component-card">
          <!-- Dùng button thực sự và ARIA -->
          <button
            class="real-btn"
            @mouseenter="speakGood('Nút Gửi. Bấm để gửi form.')"
            @mouseleave="stopSpeak"
            @click="triggerAction"
          >
            Gửi
          </button>

          <button
            class="real-icon-btn"
            aria-label="Đóng cửa sổ"
            @mouseenter="speakGood('Đóng cửa sổ, nút.')"
            @mouseleave="stopSpeak"
          >
            <span aria-hidden="true">✖</span>
          </button>
        </div>

        <div class="reader-box">
          <div class="reader-header">Screen reader đọc:</div>
          <div class="reader-text active">
            {{ currentGoodSpeech || '(hover để xem nội dung đọc, hỗ trợ tương tác bằng Tab và Enter)' }}
          </div>
        </div>
      </div>
    </div>

    <div class="status-msg">
      Mẹo: hover lên các nút bên trên để mô phỏng nội dung mà screen reader đọc cho người dùng khiếm thị.<br/>
      Bạn có thể dùng phím Tab để chọn rồi bấm Enter. Chỉ các nút bên phải mới phản hồi.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentBadSpeech = ref('')
const currentGoodSpeech = ref('')

const speakBad = (text) => {
  currentBadSpeech.value = `Text: "${text}"`
}
const speakGood = (text) => {
  currentGoodSpeech.value = `${text}`
}
const stopSpeak = () => {
  currentBadSpeech.value = ''
  currentGoodSpeech.value = ''
}
const showError = () => {
  alert('Nút giả không tự động có sự kiện @keydown.enter!')
}
const triggerAction = () => {
  alert('Nút thật đã được kích hoạt thành công!')
}
</script>

<style scoped>
.demo-wrapper {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.demo-header {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.split-pane {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.pane {
  flex: 1;
  min-width: 250px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.pane-title {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.label-bad { color: var(--vp-c-danger, #e74c3c); }
.label-good { color: var(--vp-c-brand-1, #10b981); }

.component-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-grow: 1;
  padding: 2rem 0;
}

/* Nút giả không phản hồi tab và không có style highlight mặc định */
.fake-btn, .real-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  user-select: none;
}
.fake-btn {
  background: #e2e8f0;
  color: #475569;
  cursor: pointer;
  /* Thiếu outline khi focus */
  outline: none; 
}
.real-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  cursor: pointer;
}
.real-btn:focus-visible {
  outline: 3px solid var(--vp-c-brand-soft);
  outline-offset: 2px;
}

.fake-icon, .real-icon-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.2rem;
}
.fake-icon {
  background: #f1f5f9;
  cursor: pointer;
}
.real-icon-btn {
  background: #f1f5f9;
  border: none;
  cursor: pointer;
  color: var(--vp-c-text-1);
}
.real-icon-btn:focus-visible {
  outline: 3px solid var(--vp-c-brand-soft);
}

.reader-box {
  background: #1e293b;
  border-radius: 6px;
  padding: 0.8rem;
  margin-top: auto;
  min-height: 80px;
  display: flex;
  flex-direction: column;
}

.reader-header {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-bottom: 0.4rem;
}

.reader-text {
  color: white;
  font-family: monospace;
  font-size: 0.85rem;
  font-weight: bold;
  line-height: 1.4;
}
.reader-text.empty {
  color: #64748b;
  font-weight: normal;
}
.reader-text.active {
  color: #34d399; /* emerald-400 */
}

.status-msg {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  background: var(--vp-c-bg);
  padding: 0.8rem;
  border-radius: 6px;
  border-left: 4px solid var(--vp-c-brand);
}
</style>
