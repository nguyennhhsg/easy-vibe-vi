<template>
  <div class="mcp-visual-demo">
    <div class="section-title">MCP là gì?</div>

    <div class="intro-text">
      MCP (Model Context Protocol) là <strong>chuẩn thống nhất để kết nối AI với công cụ bên ngoài</strong> do Anthropic công bố vào tháng 11/2024. Nó cho phép ứng dụng AI gọi công cụ ngoài, đọc dữ liệu tài nguyên, dùng prompt định sẵn — giống như trang bị "tay" và "mắt" cho AI.
    </div>

    <div class="section-title">Ba năng lực cốt lõi</div>

    <div class="能力-table">
      <div class="table-header">
        <div class="col-能力">Năng lực</div>
        <div class="col-英文">Tiếng Anh</div>
        <div class="col-作用">Vai trò</div>
        <div class="col-示例">Ví dụ</div>
      </div>
      <div class="table-row">
        <div class="col-能力"><strong>Công cụ</strong></div>
        <div class="col-英文">Tools</div>
        <div class="col-作用">Chức năng AI có thể gọi</div>
        <div class="col-示例">Tra thời tiết, gửi mail, gọi API</div>
      </div>
      <div class="table-row">
        <div class="col-能力"><strong>Tài nguyên</strong></div>
        <div class="col-英文">Resources</div>
        <div class="col-作用">Dữ liệu AI có thể đọc</div>
        <div class="col-示例">Nội dung file, record database, cấu hình</div>
      </div>
      <div class="table-row">
        <div class="col-能力"><strong>Prompt</strong></div>
        <div class="col-英文">Prompts</div>
        <div class="col-作用">Mẫu prompt định sẵn</div>
        <div class="col-示例">Mẫu code review, mẫu viết bài</div>
      </div>
    </div>

    <div class="section-title">Khi nào dùng MCP?</div>

    <div class="use-cases">
      <div class="use-case">
        <div class="use-case-title">Khi AI cần thực hiện thao tác thực tế</div>
        <div class="use-case-desc">AI không chỉ trả lời mà còn thật sự làm việc: gửi email, thao tác file, gọi API bên thứ ba</div>
      </div>
      <div class="use-case">
        <div class="use-case-title">Khi AI cần truy cập dữ liệu riêng</div>
        <div class="use-case-desc">Đọc file local, truy vấn database, truy cập hệ thống nội bộ doanh nghiệp</div>
      </div>
      <div class="use-case">
        <div class="use-case-title">Khi cần chuẩn hóa cách kết nối công cụ</div>
        <div class="use-case-desc">Phát triển một lần, nhiều ứng dụng AI dùng được (Claude, Cursor, Windsurf...)</div>
      </div>
    </div>

    <div class="section-title">Cách dùng MCP?</div>

    <div class="usage-steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-content">
          <div class="step-title">Phát triển MCP Server</div>
          <div class="step-desc">Hiện thực server theo chuẩn MCP, cung cấp tools/resources/prompts</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-content">
          <div class="step-title">Cấu hình kết nối trong ứng dụng AI</div>
          <div class="step-desc">Thêm cấu hình MCP Server (local hoặc remote) vào ứng dụng AI</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-content">
          <div class="step-title">AI gọi tự động</div>
          <div class="step-desc">AI dựa theo yêu cầu của task để tự khám phá và gọi công cụ phù hợp hoặc đọc resource</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.mcp-visual-demo {
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

.能力-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.table-header {
  display: flex;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  font-weight: 600;
  font-size: 0.8rem;
}

.table-row {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
}

.table-row:last-child {
  border-bottom: none;
}

.col-能力 {
  width: 15%;
  padding: 0.5rem 0.6rem;
  color: var(--vp-c-text-1);
}

.col-英文 {
  width: 18%;
  padding: 0.5rem 0.6rem;
  color: var(--vp-c-text-2);
}

.col-作用 {
  width: 32%;
  padding: 0.5rem 0.6rem;
  color: var(--vp-c-text-2);
}

.col-示例 {
  width: 35%;
  padding: 0.5rem 0.6rem;
  color: var(--vp-c-text-3);
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
  .table-header,
  .table-row {
    flex-direction: column;
  }

  .col-能力,
  .col-英文,
  .col-作用,
  .col-示例 {
    width: 100%;
    padding: 0.35rem 0.6rem;
  }

  .table-header {
    display: none;
  }

  .table-row {
    padding: 0.5rem 0;
  }

  .col-能力 {
    font-size: 0.85rem;
    padding-bottom: 0.2rem;
  }

  .col-英文 {
    font-size: 0.75rem;
    padding-top: 0;
    padding-bottom: 0.2rem;
  }

  .col-作用 {
    font-size: 0.8rem;
    padding-top: 0;
    padding-bottom: 0.2rem;
  }

  .col-示例 {
    font-size: 0.75rem;
    padding-top: 0;
  }
}
</style>
