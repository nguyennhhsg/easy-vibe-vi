---
layout: home
title: Easy-Vibe VI - Học Vibe Coding với AI từ con số 0
description: Hướng dẫn Easy-Vibe phiên bản tiếng Việt — Học Vibe Coding với AI từ con số 0, làm chủ Claude Code, Cursor và các công cụ AI IDE.
lang: vi-VN
head:
  - - meta
    - name: description
      content: Hướng dẫn Easy-Vibe phiên bản tiếng Việt — Học Vibe Coding với AI từ con số 0, làm chủ Claude Code, Cursor và các công cụ AI IDE.
  - - meta
    - property: og:description
      content: Hướng dẫn Easy-Vibe phiên bản tiếng Việt — Học Vibe Coding với AI từ con số 0, làm chủ Claude Code, Cursor và các công cụ AI IDE.
---

<noscript>
  <meta http-equiv="refresh" content="0; url=/vi-vn/" />
  <p>Đang chuyển hướng tới <a href="/vi-vn/">/vi-vn/</a>…</p>
</noscript>

<script setup>
import { onMounted } from 'vue'
import { withBase } from 'vitepress'

const WELCOME_SEEN_KEY = 'easy-vibe-welcome-seen'

onMounted(() => {
  // Phiên bản tiếng Việt: luôn chuyển tới /vi-vn/ bất kể ngôn ngữ trình duyệt
  const targetPath = withBase('/vi-vn/')

  let hasSeenWelcome = false
  try {
    hasSeenWelcome = window.localStorage.getItem(WELCOME_SEEN_KEY) === '1'
  } catch {
    hasSeenWelcome = false
  }

  if (!hasSeenWelcome) {
    window.location.replace(
      withBase(`/welcome/?next=${encodeURIComponent(targetPath)}`)
    )
    return
  }

  window.location.replace(targetPath)
})
</script>
