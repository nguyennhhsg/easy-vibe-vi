<template>
  <div class="a2a-visual-demo">
    <div class="section-title">A2A là gì?</div>

    <div class="intro-text">
      A2A (Agent-to-Agent Protocol) là <strong>chuẩn giao tiếp giữa các agent</strong> do Google công bố vào tháng 4/2025. Nó cho phép các agent từ nhà cung cấp và framework khác nhau có thể khám phá nhau, phân công nhiệm vụ và trao đổi thông tin, giống như trang bị "bộ đàm" cho thế giới AI.
    </div>

    <div class="section-title">Khái niệm cốt lõi</div>

    <div class="concepts-grid">
      <div class="concept">
        <div class="concept-title">Agent Card (danh thiếp agent)</div>
        <div class="concept-desc">Metadata mà mỗi agent công khai, gồm mô tả năng lực, phiên bản, địa chỉ endpoint... tương tự như "danh thiếp" của con người</div>
      </div>
      <div class="concept">
        <div class="concept-title">Task (nhiệm vụ)</div>
        <div class="concept-desc">Đơn vị công việc trao đổi giữa các agent, có thể chứa nhiều lượt hội thoại, file đính kèm...</div>
      </div>
      <div class="concept">
        <div class="concept-title">Message (tin nhắn)</div>
        <div class="concept-desc">Nội dung giao tiếp giữa các agent, hỗ trợ đa phương thức: text, file, giọng nói...</div>
      </div>
      <div class="concept">
        <div class="concept-title">SSE (Server-Sent Events)</div>
        <div class="concept-desc">Kỹ thuật server đẩy sự kiện, dùng để cập nhật tiến độ task theo thời gian thực</div>
      </div>
    </div>

    <div class="section-title">Khi nào dùng A2A?</div>

    <div class="use-cases">
      <div class="use-case">
        <div class="use-case-title">Khi cần nhiều agent phối hợp giải quyết task phức tạp</div>
        <div class="use-case-desc">Một agent phân tích yêu cầu, một agent viết code, một agent test... mỗi agent phát huy thế mạnh riêng</div>
      </div>
      <div class="use-case">
        <div class="use-case-title">Khi cần tích hợp agent của các nhà cung cấp khác nhau</div>
        <div class="use-case-desc">Agent của Google, Anthropic, OpenAI cần phối hợp với nhau</div>
      </div>
      <div class="use-case">
        <div class="use-case-title">Khi cần ủy thác nhiệm vụ và theo dõi tiến độ</div>
        <div class="use-case-desc">Agent chính phân công cho các agent chuyên môn và nhận cập nhật tiến độ theo thời gian thực</div>
      </div>
    </div>

    <div class="section-title">Cách dùng A2A?</div>

    <div class="usage-steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-content">
          <div class="step-title">Công bố Agent Card</div>
          <div class="step-desc">Expose mô tả năng lực của agent tại đường dẫn /.well-known/agent.json</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-content">
          <div class="step-title">Khám phá agent</div>
          <div class="step-desc">Dùng API agents/get để lấy danh thiếp của các agent khác và hiểu năng lực của họ</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-content">
          <div class="step-title">Gửi task</div>
          <div class="step-desc">Dùng API tasks/send để gửi task, hỗ trợ SSE để nhận cập nhật tiến độ</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-content">
          <div class="step-title">Lấy kết quả</div>
          <div class="step-desc">Khi task xong, dùng API tasks/get để lấy kết quả cuối cùng</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.a2a-visual-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1rem 0;
}

.section-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  margin-top: 1.25rem;
}

.section-title:first-child {
  margin-top: 0;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.intro-text strong {
  color: var(--vp-c-brand);
}

.concepts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.concept {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.concept-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.concept-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.use-cases {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.use-case {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.use-case-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.use-case-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

@media (max-width: 640px) {
  .concepts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
