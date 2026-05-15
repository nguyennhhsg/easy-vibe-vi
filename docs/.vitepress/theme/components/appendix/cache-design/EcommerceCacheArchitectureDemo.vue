
<template>
  <div class="demo-container">
    <div class="demo-header">
      <h4>{{ title }}</h4>
      <p class="hint">
        {{ description }}
      </p>
    </div>
    <div class="demo-content">
      <el-alert
        type="info"
        :closable="false"
      >
        Placeholder cho component demo kiến trúc cache thương mại điện tử - chờ triển khai chi tiết
      </el-alert>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Demo kiến trúc cache thương mại điện tử')
const description = ref('Minh họa thiết kế kiến trúc cache nhiều cấp trong hệ thống thương mại điện tử, bao gồm cache sản phẩm, cache tồn kho, cache người dùng v.v.')
</script>

<style scoped>
.demo-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
}

.demo-header {
  margin-bottom: 20px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.hint {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
