<!--
  SemanticTagsDemo.vue
  Tra nhanh thẻ semantic: Nhấp vào tên thẻ, bên phải hiển thị mục đích, có phải block/inline, ngữ cảnh thường dùng và HTML mẫu.
-->
<template>
  <div class="semantic">
    <div class="tags">
      <button
        v-for="t in tags"
        :key="t.name"
        :class="['tag-btn', { active: t.name === current.name }]"
        @click="current = t"
      >
        {{ t.name }}
      </button>
    </div>

    <div class="panel">
      <div class="row">
        <span class="label">Mục đích</span><span>{{ current.purpose }}</span>
      </div>
      <div class="row">
        <span class="label">Loại</span><span>{{ current.display }}</span>
      </div>
      <div class="row">
        <span class="label">Vị trí thường gặp</span><span>{{ current.scene }}</span>
      </div>
      <div class="row code-title">
        Ví dụ
      </div>
      <pre><code>{{ current.example }}</code></pre>
      <div class="row code-title">
        Kết quả render
      </div>
      <div
        class="preview-box"
        v-html="current.example"
      />
      <div class="row tip">
        Mẹo nhỏ: {{ current.tip }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tags = [
  {
    name: '<header>',
    purpose: 'Phần đầu của trang/khối, thường đặt Logo, nav',
    display: 'Block',
    scene: 'Đỉnh trang, đỉnh bài viết',
    example: `<header style="background:#eee; padding:10px;">\n  <h1 style="margin:0;">Trang web của tôi</h1>\n  <nav>...</nav>\n</header>`,
    tip: 'Một trang có thể có nhiều header, miễn là phần đầu của từng khối'
  },
  {
    name: '<nav>',
    purpose: 'Khu vực liên kết điều hướng',
    display: 'Block',
    scene: 'Nav toàn site, breadcrumb, sidebar',
    example: `<nav style="background:#f4f4f4; padding:10px;">\n  <a href="javascript:void(0)">Trang chủ</a> | <a href="javascript:void(0)">Giới thiệu</a>\n</nav>`,
    tip: 'Cố gắng chỉ đặt link điều hướng, để screen reader dễ nhận diện'
  },
  {
    name: '<main>',
    purpose: 'Thân tài liệu, mỗi trang chỉ được có một',
    display: 'Block',
    scene: 'Bọc khu vực nội dung chính',
    example: `<main style="border:1px dashed #999; padding:10px;">\n  <article>Khu vực nội dung chính...</article>\n</main>`,
    tip: 'Công nghệ hỗ trợ có thể nhảy nhanh đến main, tăng accessibility'
  },
  {
    name: '<section>',
    purpose: 'Khối được nhóm theo chủ đề',
    display: 'Block',
    scene: 'Phân đoạn trang, chương trong tài liệu',
    example: `<section style="border-left:4px solid #007acc; padding-left:10px;">\n  <h2 style="margin:0;">Điểm nổi bật</h2>\n  <p>Giới thiệu tính năng...</p>\n</section>`,
    tip: 'Mỗi section nên có tiêu đề (h2/h3)'
  },
  {
    name: '<article>',
    purpose: 'Một nội dung có thể độc lập lan truyền',
    display: 'Block',
    scene: 'Bài blog, bài forum, card',
    example: `<article style="border:1px solid #ddd; padding:10px; border-radius:4px;">\n  <h2 style="margin-top:0;">Tiêu đề blog</h2>\n  <p>Nội dung chính...</p>\n</article>`,
    tip: 'Trong article có thể lồng tiếp section'
  },
  {
    name: '<aside>',
    purpose: 'Thông tin phụ/sidebar',
    display: 'Block',
    scene: 'Sidebar, hộp gợi ý, link liên quan',
    example: `<aside style="background:#fff3cd; padding:10px;">\n  <h3 style="margin-top:0;">Đọc thêm</h3>\n  <ul style="margin-bottom:0;">\n    <li>Bài 1</li>\n    <li>Bài 2</li>\n  </ul>\n</aside>`,
    tip: 'Liên quan đến nội dung chính nhưng không phải nội dung chính'
  },
  {
    name: '<footer>',
    purpose: 'Phần cuối của trang/khối',
    display: 'Block',
    scene: 'Bản quyền, liên hệ, link',
    example: `<footer style="background:#333; color:#fff; padding:10px; text-align:center;">\n  <p style="margin:0;">© 2026 MySite</p>\n</footer>`,
    tip: 'Trang có thể có nhiều footer, tương ứng các khối khác nhau'
  },
  {
    name: '<figure>',
    purpose: 'Container chứa hình minh họa + chú thích',
    display: 'Block',
    scene: 'Ảnh/đoạn mã/bảng kèm chú thích',
    example: `<figure style="border:1px solid #ccc; padding:5px; margin:0; display:inline-block;">\n  <img src="https://placehold.co/150x100?text=Hero+Img" alt="ví dụ" style="display:block;"/>\n  <figcaption style="text-align:center; font-size:12px; color:#666;">Chú thích ảnh</figcaption>\n</figure>`,
    tip: 'Kết hợp với <figcaption> để chú thích nội dung'
  }
]

const current = ref(tags[0])
</script>

<style scoped>
.semantic {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 12px;
}
@media (max-width: 720px) {
  .semantic {
    grid-template-columns: 1fr;
  }
}
.tags {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
}
.tag-btn {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  text-align: left;
}
.tag-btn.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 14px;
}
.label {
  color: var(--vp-c-text-2);
  font-weight: 700;
}
.code-title {
  font-weight: 700;
  margin-top: 4px;
}
pre {
  margin: 0;
  background: #0b1221;
  color: #e5e7eb;
  border-radius: 6px;
  padding: 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  white-space: pre-wrap;
}
.preview-box {
  border: 1px dashed var(--vp-c-divider);
  padding: 16px;
  border-radius: 6px;
  background: var(--vp-c-bg);
}
.tip {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
</style>
