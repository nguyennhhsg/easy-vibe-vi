<template>
  <div class="cloud-history-demo">
    <div class="timeline">
      <div 
        v-for="(event, index) in events" 
        :key="index"
        class="timeline-item"
        :class="{ active: selectedEvent === index }"
        @click="selectedEvent = index"
      >
        <div class="timeline-dot" />
        <div class="timeline-content">
          <div class="timeline-year">
            {{ event.year }}
          </div>
          <div class="timeline-title">
            {{ event.title }}
          </div>
        </div>
      </div>
    </div>
    
    <div
      v-if="selectedEventData"
      class="event-detail"
    >
      <div class="detail-year">
        {{ selectedEventData.year }}
      </div>
      <div class="detail-title">
        {{ selectedEventData.title }}
      </div>
      <div class="detail-desc">
        {{ selectedEventData.description }}
      </div>
      <div class="detail-impact">
        <span class="impact-label">Tác động:</span>
        <span class="impact-text">{{ selectedEventData.impact }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedEvent = ref(3)

const events = [
  {
    year: '1960s',
    title: 'Khởi nguồn ý tưởng',
    description: 'J.C.R. Licklider đề xuất ý tưởng "mạng máy tính liên thiên hà", là tiền thân sớm nhất của khái niệm cloud computing.',
    impact: 'Đặt nền móng lý thuyết cho distributed computing'
  },
  {
    year: '1990s',
    title: 'Công nghệ ảo hóa',
    description: 'VMware ra mắt công nghệ ảo hóa x86, cho phép chạy nhiều máy ảo trên một máy vật lý.',
    impact: 'Tạo nền tảng kỹ thuật cho việc pool tài nguyên trong cloud'
  },
  {
    year: '2006',
    title: 'AWS ra đời',
    description: 'Amazon ra mắt EC2 và S3, đánh dấu sự khởi đầu chính thức của dịch vụ cloud computing hiện đại.',
    impact: 'Khai sinh mô hình kinh doanh public cloud'
  },
  {
    year: '2009',
    title: 'Alibaba Cloud thành lập',
    description: 'Alibaba thành lập Alibaba Cloud, trở thành nhà cung cấp cloud computing sớm nhất Trung Quốc.',
    impact: 'Thúc đẩy sự phát triển của thị trường cloud Trung Quốc'
  },
  {
    year: '2010s',
    title: 'Kỷ nguyên cloud-native',
    description: 'Docker, Kubernetes và các công nghệ khác nổi lên, microservices trở thành kiến trúc chủ đạo.',
    impact: 'Thay đổi cách phát triển và deployment ứng dụng'
  },
  {
    year: '2020s',
    title: 'Kỷ nguyên AI Cloud',
    description: 'LLM và dịch vụ AI trở thành lợi thế cạnh tranh cốt lõi của các nhà cung cấp cloud, Serverless phổ biến.',
    impact: 'Cloud computing bước vào giai đoạn thông minh hóa mới'
  }
]

const selectedEventData = computed(() => events[selectedEvent.value])
</script>

<style scoped>
.cloud-history-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.timeline {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 80px;
}

.timeline-item:hover {
  background: var(--vp-c-bg);
}

.timeline-item.active {
  background: var(--vp-c-brand-soft);
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  transition: all 0.2s;
}

.timeline-item.active .timeline-dot {
  background: var(--vp-c-brand);
}

.timeline-content {
  text-align: center;
}

.timeline-year {
  font-weight: 600;
  font-size: 0.85rem;
}

.timeline-title {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.event-detail {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.detail-year {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.detail-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.detail-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.detail-impact {
  font-size: 0.8rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.impact-label {
  color: var(--vp-c-text-2);
  margin-right: 0.5rem;
}

.impact-text {
  font-weight: 500;
}
</style>
