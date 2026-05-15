<template>
  <div class="language-ecosystem-demo">
    <div class="demo-header">
      <span class="icon">🌐</span>
      <span class="title">Hệ sinh thái</span>
      <span class="subtitle">Cộng đồng và package manager của các ngôn ngữ</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn <span class="highlight">đi siêu thị</span>: có nơi nhiều hàng nhưng chất lượng không đồng đều (NPM), có nơi hàng chất lượng cao nhưng đắt (Java Maven), có nơi hàng được tuyển chọn kỹ (Go Modules).
    </div>

    <div class="ecosystem-grid">
      <div
        v-for="eco in ecosystems"
        :key="eco.name"
        class="eco-card"
      >
        <div class="eco-icon">
          {{ eco.icon }}
        </div>
        <div class="eco-name">
          {{ eco.name }}
        </div>
        <div class="eco-lang">
          {{ eco.language }}
        </div>
        <div class="eco-stats">
          <div class="stat">
            <span class="stat-label">Số package</span>
            <span class="stat-value">{{ eco.packages }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Đặc điểm</span>
            <span class="stat-value">{{ eco.feature }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Tư tưởng cốt lõi:</strong> NPM của JavaScript/Node.js là kho package lớn nhất thế giới, hầu như mọi tính năng đều có sẵn. PyPI của Python vô địch trong lĩnh vực AI. Go Modules của Go gọn gàng đáng tin, không có dependency hell.
    </div>
  </div>
</template>

<script setup>
const ecosystems = [
  {
    name: 'NPM',
    icon: '💚',
    language: 'Node.js',
    packages: '2 triệu+',
    feature: 'Hệ sinh thái lớn nhất'
  },
  {
    name: 'PyPI',
    icon: '🐍',
    language: 'Python',
    packages: '500 nghìn+',
    feature: 'Bá chủ AI'
  },
  {
    name: 'Maven',
    icon: '☕',
    language: 'Java',
    packages: '300 nghìn+',
    feature: 'Enterprise'
  },
  {
    name: 'Go Modules',
    icon: '🐹',
    language: 'Go',
    packages: '100 nghìn+',
    feature: 'Gọn, đáng tin'
  },
  {
    name: 'Cargo',
    icon: '🦀',
    language: 'Rust',
    packages: '100 nghìn+',
    feature: 'Hiện đại'
  },
  {
    name: 'RubyGems',
    icon: '💎',
    language: 'Ruby',
    packages: '150 nghìn+',
    feature: 'Thanh lịch'
  }
]
</script>

<style scoped>
.language-ecosystem-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.ecosystem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.eco-card {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.eco-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.eco-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.15rem;
}

.eco-lang {
  font-size: 0.7rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.eco-stats {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
}

.stat-label {
  color: var(--vp-c-text-2);
}

.stat-value {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
