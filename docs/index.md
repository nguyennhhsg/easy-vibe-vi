---
layout: home
---

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
