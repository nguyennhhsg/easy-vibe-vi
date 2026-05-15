<template>
  <div class="rendering-pipeline-demo">
    <div class="demo-header">
      <span class="icon">🏭</span>
      <span class="title">Rendering pipeline</span>
      <span class="subtitle">Hành trình 5 bước từ code đến pixel</span>
    </div>

    <div class="intro-text">
      Hãy hình dung bạn làm trong một <span class="highlight">xưởng in</span>: bản thảo phải được dàn trang, in, đóng bìa, cuối cùng mới thành cuốn sách. Browser render trang web cũng vậy, HTML và CSS phải đi qua từng công đoạn mới biến thành hình ảnh trên màn hình.
    </div>

    <div class="pipeline">
      <div
        v-for="(stage, i) in stages"
        :key="stage.id"
        class="stage"
        :class="{ active: activeStage === stage.id }"
        @click="activeStage = activeStage === stage.id ? null : stage.id"
      >
        <div class="stage-icon">
          {{ stage.icon }}
        </div>
        <div class="stage-name">
          {{ stage.name }}
        </div>
        <div class="stage-simple">
          {{ stage.simple }}
        </div>
        <div
          v-if="i < stages.length - 1"
          class="arrow"
        >
          →
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="activeStage"
        class="stage-detail"
      >
        <div class="detail-header">
          <span class="detail-icon">{{ currentStage?.icon }}</span>
          <span class="detail-title">{{ currentStage?.name }}</span>
        </div>
        <div class="detail-content">
          <p class="detail-desc">
            {{ currentStage?.detailDesc }}
          </p>
          <div class="detail-example">
            <div class="example-label">
              Ví dụ:
            </div>
            <div class="example-content">
              {{ currentStage?.example }}
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div
      v-if="!activeStage"
      class="hint-text"
    >
      Bấm vào bất kỳ giai đoạn nào ở trên để xem giải thích chi tiết
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>Ý chính:</strong> Mỗi giai đoạn đảm nhận một việc, giai đoạn trước chuẩn bị dữ liệu cho giai đoạn sau. Hiểu quy trình này bạn sẽ biết lúc nào nên dùng cách nào để chỉnh trang, tránh các vấn đề hiệu năng.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStage = ref(null)

const stages = ref([
  {
    id: 1,
    icon: '🌲',
    name: 'Build DOM/CSSOM',
    simple: 'Parse code',
    detailDesc: 'Browser parse các thẻ HTML thành DOM tree (khung xương), parse CSS thành CSSOM tree (style). Hai cây này được build song song, nhưng CSS sẽ block rendering vì browser phải biết style mới hiển thị trang đúng được.',
    example: 'Khi browser gặp <div class="container">, nó sẽ tạo một node div trong DOM tree; khi đọc .container { width: 100px }, nó ghi luật style đó vào CSSOM tree.'
  },
  {
    id: 2,
    icon: '🎨',
    name: 'Build render tree',
    simple: 'Hợp nhất và lọc',
    detailDesc: 'Hợp DOM tree và CSSOM tree để tạo render tree. Chỉ giữ những phần tử thực sự hiển thị trên trang (loại bỏ head, script, các phần tử display:none, v.v.).',
    example: 'Giống như từ bản vẽ kiến trúc đầy đủ, ta lọc ra phần "nhìn thấy được": bỏ điện, ống nước trong tường, chỉ giữ tường và đồ nội thất. Như vậy việc tính toán sau đó sẽ hiệu quả hơn.'
  },
  {
    id: 3,
    icon: '📐',
    name: 'Layout',
    simple: 'Tính vị trí',
    detailDesc: 'Tính vị trí và kích thước chính xác của từng phần tử trên màn hình (thông tin hình học). Đây là một trong những thao tác tốn kém nhất, vì sửa một phần tử có thể ảnh hưởng vị trí của các phần tử khác (kéo theo cả chuỗi).',
    example: 'Browser tính ra: "div này cách top 100px, rộng 200px, cao 50px". Nếu đổi width của div, các phần tử con và phần tử anh em đều phải tính lại vị trí.'
  },
  {
    id: 4,
    icon: '✏️',
    name: 'Paint',
    simple: 'Tô màu',
    detailDesc: 'Vẽ thực sự các phần tử (đã có vị trí) thành pixel. Bao gồm tô màu nền, vẽ chữ, vẽ border, v.v. Nếu chỉ đổi vẻ ngoài (như color, background-color) thì sẽ trigger repaint, chi phí thấp hơn reflow.',
    example: 'Giống như sơn lại đồ nội thất: đổi màu đồ chỉ cần sơn lại (repaint), nhưng đổi vị trí đồ thì phải sắp xếp lại toàn bộ (reflow).'
  },
  {
    id: 5,
    icon: '🔮',
    name: 'Composite',
    simple: 'Hợp layer',
    detailDesc: 'Vũ khí tối thượng của browser hiện đại. Gộp nhiều layer paint theo đúng thứ tự thành ảnh cuối cùng. Tận dụng GPU xử lý song song, hiệu năng rất tốt. Animation transform và opacity chỉ trigger giai đoạn này.',
    example: 'Giống như layer trong Photoshop: mỗi layer vẽ riêng, cuối cùng gộp lại với nhau. Một số phần tử (như animation) sẽ được tách thành layer riêng, khi đổi chỉ cần điều chỉnh vị trí và độ trong, không cần repaint.'
  }
])

const currentStage = computed(() => {
  return stages.value.find(s => s.id === activeStage.value)
})
</script>

<style scoped>
.rendering-pipeline-demo {
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

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

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

.pipeline {
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow-x: auto;
}

.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 90px;
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.stage:hover {
  background: var(--vp-c-bg-soft);
}

.stage.active {
  background: var(--vp-c-brand-soft);
}

.stage-icon {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: var(--vp-c-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  transition: transform 0.2s ease;
}

.stage:hover .stage-icon {
  transform: scale(1.1);
}

.stage-name {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.stage-simple {
  font-size: 0.7rem;
  color: var(--vp-c-brand-1);
  margin-top: 0.2rem;
  font-weight: 500;
}

.arrow {
  position: absolute;
  right: -12px;
  top: 20px;
  color: var(--vp-c-text-3);
  font-size: 1rem;
}

.hint-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}

.stage-detail {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.detail-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.detail-example {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.example-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.example-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
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
  margin-top: 0.75rem;
}

.info-box .icon { margin-right: 0.25rem; }
</style>
