<template>
  <div class="demo-card">
    <div class="expert-system-flow">
      <div class="es-card success">
        <div class="es-title">🌟 Thời hoàng kim của hệ chuyên gia</div>
        <div class="es-list">
          <div class="es-item">
            <span class="es-box input">Kinh nghiệm chuyên gia</span>
            <span class="es-arrow">→</span>
            <span class="es-box rules">Chuyển thành luật IF-THEN</span>
          </div>
          <div class="es-item">
            <span class="es-box input">Bài toán trong lĩnh vực cụ thể</span>
            <span class="es-arrow">→</span>
            <span class="es-box output">Suy luận ra đáp án (chẩn đoán/cấu hình)</span>
          </div>
        </div>
        <div class="es-tags">
          <span class="es-tag">1965: Dendral (hóa học)</span>
          <span class="es-tag">1977: MYCIN (y tế)</span>
          <span class="es-tag">1980: XCON (cấu hình)</span>
        </div>
      </div>

      <div class="es-arrow-down">⬇️ Giới hạn bộc lộ ⬇️</div>

      <div class="es-card winter">
        <div class="es-title"><span class="snow">❄️</span> Mùa đông AI lần thứ nhất (1974-1980)</div>
        <div class="winter-reasons">
          <div class="reason">
            <span class="r-icon">📝</span>
            <div class="r-text">
              <strong>Bottleneck thu nhận tri thức</strong>
              <span>Nghịch lý Polanyi: con người không thể diễn đạt hết mọi quy luật. Rất nhiều "tri thức thông thường" không thể hardcode được.</span>
            </div>
          </div>
          <div class="reason">
            <span class="r-icon">💥</span>
            <div class="r-text">
              <strong>Bùng nổ tổ hợp & dễ vỡ</strong>
              <span>Tình huống thực tế quá nhiều, liệt kê hết là rất khó; lại thiếu common sense, chỉ cần lệch luật một chút là hệ thống sụp đổ.</span>
            </div>
          </div>
          <div class="reason">
            <span class="r-icon">📉</span>
            <div class="r-text">
              <strong>Thiếu compute & đứt nguồn tài chính</strong>
              <span>Phần cứng thời đó không đủ sức cho việc suy luận logic bùng nổ, gặp đợt cắt ngân sách lớn của DARPA.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1rem 0; }
.expert-system-flow { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; }
.es-card { width: 100%; max-width: 500px; border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 1rem; background: var(--vp-c-bg); }
.es-card.success { border-top: 3px solid #059669; }
.es-card.winter { border-top: 3px solid #3b82f6; background: rgba(59, 130, 246, 0.03); }
.es-title { font-weight: bold; font-size: 0.9rem; margin-bottom: 0.8rem; text-align: center; color: var(--vp-c-text-1); }
.es-list { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1rem; }
.es-item { display: flex; align-items: center; justify-content: center; gap: 0.4rem; font-size: 0.75rem; }
.es-box { padding: 0.4rem 0.6rem; border-radius: 4px; font-weight: 500; border: 1px solid var(--vp-c-divider); text-align: center; }
.es-box.input { background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); }
.es-box.rules { background: #d1fae5; color: #065f46; border-color: #34d399; }
.es-box.output { background: #e0e7ff; color: #3730a3; border-color: #818cf8; }
.html.dark .es-box.rules { background: rgba(5, 150, 105, 0.2); color: #a7f3d0; border-color: #059669; }
.html.dark .es-box.output { background: rgba(79, 70, 229, 0.2); color: #c7d2fe; border-color: #4f46e5; }

.es-arrow { color: var(--vp-c-text-3); font-weight: bold; }
.es-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; }
.es-tag { font-size: 0.65rem; background: var(--vp-c-bg-soft); padding: 0.15rem 0.5rem; border-radius: 12px; color: var(--vp-c-text-2); border: 1px solid var(--vp-c-divider); }
.es-arrow-down { font-size: 0.8rem; color: var(--vp-c-text-3); font-weight: bold; margin: 0.2rem 0; }
.snow { color: #3b82f6; margin-right: 0.2rem; }
.winter-reasons { display: flex; flex-direction: column; gap: 0.6rem; }
.reason { display: flex; align-items: flex-start; gap: 0.6rem; background: var(--vp-c-bg-alt); padding: 0.6rem; border-radius: 6px; border: 1px solid var(--vp-c-divider); }
.r-icon { font-size: 1.2rem; margin-top: 0.1rem; }
.r-text { display: flex; flex-direction: column; }
.r-text strong { font-size: 0.8rem; color: var(--vp-c-text-1); }
.r-text span { font-size: 0.7rem; color: var(--vp-c-text-2); line-height: 1.4; margin-top: 0.15rem; }
</style>
