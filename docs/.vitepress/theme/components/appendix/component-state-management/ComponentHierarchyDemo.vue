<template>
  <div class="component-hierarchy-demo">
    <div class="demo-header">
      <span class="icon">🌳</span>
      <span class="title">Cấu trúc phân cấp component</span>
      <span class="subtitle">Quan hệ component giống như cây gia phả</span>
    </div>

    <div class="intro-text">
      Hãy tưởng tượng bạn đang làm việc trong <span class="highlight">sơ đồ tổ chức công ty</span>: CEO (root component) ở trên cùng, bên dưới là các phòng ban (parent component), trong mỗi phòng còn có nhân viên (child component). Đó chính là cây component!
    </div>

    <div class="demo-content">
      <div class="tree-container">
        <div
          class="tree-node root-node"
          :class="{ active: selectedNode === 'app' }"
          @click="selectNode('app')"
        >
          <div class="node-icon">
            👑
          </div>
          <div class="node-info">
            <div class="node-label">
              App (root component)
            </div>
            <div class="node-desc">
              CEO - quản lý toàn cục
            </div>
          </div>
        </div>

        <div class="tree-children">
          <div class="tree-branch">
            <div class="connector" />
            <div
              class="tree-node"
              :class="{ active: selectedNode === 'header' }"
              @click="selectNode('header')"
            >
              <div class="node-icon">
                📌
              </div>
              <div class="node-info">
                <div class="node-label">
                  Header
                </div>
                <div class="node-desc">
                  Phòng nav bar
                </div>
              </div>
            </div>
          </div>

          <div class="tree-branch">
            <div class="connector" />
            <div
              class="tree-node"
              :class="{ active: selectedNode === 'main' }"
              @click="selectNode('main')"
            >
              <div class="node-icon">
                📄
              </div>
              <div class="node-info">
                <div class="node-label">
                  Main Content
                </div>
                <div class="node-desc">
                  Phòng nội dung chính
                </div>
              </div>
            </div>

            <div class="tree-children">
              <div class="tree-branch">
                <div class="connector" />
                <div
                  class="tree-node"
                  :class="{ active: selectedNode === 'sidebar' }"
                  @click="selectNode('sidebar')"
                >
                  <div class="node-icon">
                    📑
                  </div>
                  <div class="node-info">
                    <div class="node-label">
                      Sidebar
                    </div>
                    <div class="node-desc">
                      Nhóm sidebar
                    </div>
                  </div>
                </div>
              </div>

              <div class="tree-branch">
                <div class="connector" />
                <div
                  class="tree-node"
                  :class="{ active: selectedNode === 'productlist' }"
                  @click="selectNode('productlist')"
                >
                  <div class="node-icon">
                    🛍️
                  </div>
                  <div class="node-info">
                    <div class="node-label">
                      ProductList
                    </div>
                    <div class="node-desc">
                      Nhóm danh sách sản phẩm
                    </div>
                  </div>
                </div>

                <div class="tree-children">
                  <div class="tree-branch">
                    <div class="connector" />
                    <div
                      class="tree-node leaf"
                      :class="{ active: selectedNode === 'productcard' }"
                      @click="selectNode('productcard')"
                    >
                      <div class="node-icon">
                        🏷️
                      </div>
                      <div class="node-info">
                        <div class="node-label">
                          ProductCard
                        </div>
                        <div class="node-desc">
                          Nhân viên product card
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tree-branch">
            <div class="connector" />
            <div
              class="tree-node"
              :class="{ active: selectedNode === 'footer' }"
              @click="selectNode('footer')"
            >
              <div class="node-icon">
                🔻
              </div>
              <div class="node-info">
                <div class="node-label">
                  Footer
                </div>
                <div class="node-desc">
                  Phòng footer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Transition name="fade">
        <div
          v-if="selectedNodeInfo"
          class="node-details"
        >
          <div class="detail-header">
            <span class="detail-icon">{{ selectedNodeInfo.icon }}</span>
            <span class="detail-title">{{ selectedNodeInfo.title }}</span>
          </div>
          <p class="detail-desc">
            {{ selectedNodeInfo.description }}
          </p>
          <div
            v-if="selectedNodeInfo.props || selectedNodeInfo.events"
            class="detail-info"
          >
            <div
              v-if="selectedNodeInfo.props"
              class="info-section"
            >
              <strong>📥 Nhận:</strong>
              <span class="prop-tags">{{ selectedNodeInfo.props.join(', ') }}</span>
            </div>
            <div
              v-if="selectedNodeInfo.events"
              class="info-section"
            >
              <strong>📤 Phát ra:</strong>
              <span class="prop-tags">{{ selectedNodeInfo.events.join(', ') }}</span>
            </div>
          </div>
        </div>
      </Transition>

      <div
        v-if="!selectedNode"
        class="hint-text"
      >
        👆 Bấm vào bất kỳ node nào ở trên để xem mô tả trách nhiệm
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Tư tưởng cốt lõi:</strong> Component giống như sơ đồ tổ chức — parent component quản lý tổng thể, child component đảm nhận chức năng cụ thể. Dữ liệu chảy từ trên xuống, sự kiện đẩy từ dưới lên.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedNode = ref(null)

const nodeInfoMap = {
  app: {
    icon: '👑',
    title: 'App - root component',
    description: 'Giống CEO của công ty, lo việc khởi tạo và quản lý toàn cục cho cả ứng dụng. Bao gồm routing, global state, cấu hình theme và các quyết định lớn.',
    props: [],
    events: []
  },
  header: {
    icon: '📌',
    title: 'Header - thanh điều hướng',
    description: 'Phòng tiếp tân: hiển thị logo, menu, thông tin user, giỏ hàng v.v. Hầu hết các trang đều dùng tới.',
    props: ['user', 'cartCount'],
    events: ['logout', 'search']
  },
  main: {
    icon: '📄',
    title: 'Main Content - nội dung chính',
    description: 'Phòng kinh doanh cốt lõi, quản lý khu vực nội dung chính của trang. Dùng flex hoặc grid để bố trí sidebar và nội dung.',
    props: [],
    events: []
  },
  sidebar: {
    icon: '📑',
    title: 'Sidebar - thanh bên',
    description: 'Nhóm điều hướng nội bộ, cung cấp menu có thể thu/gọn. Hay gặp trong hệ thống admin hoặc trang duyệt theo danh mục.',
    props: ['menuItems', 'collapsed'],
    events: ['select', 'toggle']
  },
  productlist: {
    icon: '🛍️',
    title: 'ProductList - danh sách sản phẩm',
    description: 'Đội trình bày sản phẩm, lo lấy data, phân trang, sắp xếp và lọc. Bên trong gồm nhiều ProductCard.',
    props: ['products', 'loading', 'total'],
    events: ['loadMore', 'sort', 'filter']
  },
  productcard: {
    icon: '🏷️',
    title: 'ProductCard - thẻ sản phẩm',
    description: 'Nhân viên cấp cơ sở, hiển thị thông tin của một sản phẩm (ảnh, tên, giá, đánh giá). Tập trung vào hiển thị UI.',
    props: ['product', 'showAddToCart'],
    events: ['addToCart', 'click']
  },
  footer: {
    icon: '🔻',
    title: 'Footer - chân trang',
    description: 'Phòng hậu cần, hiển thị thông tin bản quyền, link liên kết, liên hệ, mạng xã hội và các thông tin hỗ trợ khác.',
    props: [],
    events: []
  }
}

const selectedNodeInfo = computed(() => {
  return selectedNode.value ? nodeInfoMap[selectedNode.value] : null
})

const selectNode = (nodeId) => {
  selectedNode.value = selectedNode.value === nodeId ? null : nodeId
}
</script>

<style scoped>
.component-hierarchy-demo {
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

.demo-content {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.tree-container {
  overflow-x: auto;
}

.tree-children {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.75rem;
  margin-left: 1.5rem;
}

.tree-branch {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.connector {
  width: 16px;
  height: 2px;
  background: var(--vp-c-divider);
  margin-top: 18px;
  position: relative;
}

.connector::before {
  content: '';
  position: absolute;
  left: 0;
  top: -8px;
  width: 2px;
  height: 10px;
  background: var(--vp-c-divider);
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 180px;
}

.tree-node:hover {
  border-color: var(--vp-c-brand);
  transform: translateX(4px);
}

.tree-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 0 3px var(--vp-c-brand-delta);
}

.root-node {
  background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg));
  border-width: 3px;
}

.leaf .node-icon {
  opacity: 0.8;
}

.node-icon {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.node-info {
  display: flex;
  flex-direction: column;
}

.node-label {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
}

.node-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.15rem;
}

.node-details {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.detail-icon {
  font-size: 1.25rem;
}

.detail-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.detail-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.info-section strong {
  color: var(--vp-c-text-1);
  flex-shrink: 0;
}

.prop-tags {
  color: var(--vp-c-brand);
  font-family: monospace;
  font-size: 0.75rem;
}

.hint-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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

@media (max-width: 768px) {
  .tree-node {
    min-width: auto;
  }

  .tree-children {
    margin-left: 1rem;
  }
}
</style>
