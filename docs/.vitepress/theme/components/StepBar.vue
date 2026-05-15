<template>
  <el-steps
    :active="active"
    align-center
  >
    <el-step
      v-for="(item, index) in items"
      :key="index"
      :title="item.title"
      :description="item.description"
    />
  </el-steps>
</template>

<script setup>
defineProps({
  active: {
    type: Number,
    default: 0
  },
  items: {
    type: Array,
    default: () => [
      { title: 'Thách thức và cơ hội', description: 'Khả năng lập trình mới cho mọi người' },
      { title: 'Khám phá năng lực', description: 'Trải nghiệm phát triển siêu tốc trong 60 giây' },
      { title: 'Thực chiến AI-native', description: 'Tạo game rắn săn mồi kiểu AI-native' },
      { title: 'Mở rộng và sáng tạo', description: 'Học một biết mười để làm game' }
    ]
  }
})
</script>
