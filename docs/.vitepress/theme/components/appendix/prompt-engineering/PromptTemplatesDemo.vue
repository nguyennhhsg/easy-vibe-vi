<template>
  <el-card
    class="templates-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <div class="header-left">
          <h3 class="title">
            Template các kịch bản phổ biến (đổi tab, copy là dùng được)
          </h3>
          <p class="subtitle">
            Chọn kịch bản → copy → thay placeholder bằng nội dung của bạn.
          </p>
        </div>
        <div class="header-right">
          <el-input
            v-model="q"
            placeholder="Tìm template (vd: họp / debug / dịch)"
            :prefix-icon="Search"
            clearable
            style="width: 240px"
          />
          <el-button 
            type="primary" 
            :icon="copied ? Check : CopyDocument" 
            :disabled="!active" 
            @click="copy(active.template)"
          >
            {{ copied ? 'Đã copy' : 'Copy template' }}
          </el-button>
        </div>
      </div>
    </template>

    <div class="tags-container">
      <el-space wrap>
        <el-button
          v-for="t in filtered"
          :key="t.id"
          :type="activeId === t.id ? 'primary' : ''"
          round
          size="small"
          @click="select(t.id)"
        >
          {{ t.title }}
        </el-button>
      </el-space>
      <el-empty 
        v-if="filtered.length === 0" 
        description="Không tìm thấy template phù hợp" 
        :image-size="60"
      />
    </div>

    <div
      v-if="active"
      class="content-area"
    >
      <el-alert
        :title="active.desc"
        type="info"
        :closable="false"
        show-icon
        class="desc-alert"
      />
      
      <el-card
        shadow="never"
        class="code-card"
      >
        <pre class="code-block"><code>{{ active.template }}</code></pre>
      </el-card>

      <div
        v-if="active.note"
        class="note-section"
      >
        <el-tag
          type="warning"
          size="small"
        >
          Note
        </el-tag>
        <span class="note-text">{{ active.note }}</span>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Search, CopyDocument, Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const q = ref('')
const copied = ref(false)

const templates = [
  {
    id: 'summary-boss',
    category: 'Tóm tắt',
    title: 'Tóm tắt cho sếp',
    desc: 'Phù hợp khi muốn nén bài dài thành "kết luận + ý chính + bước tiếp".',
    template: `Task: tóm tắt đoạn dưới đây cho "vị sếp bận rộn".\nYêu cầu:\n- 3 ý chính\n- 1 câu kết luận\n- 1 đề xuất bước tiếp theo\nOutput: Markdown\nVăn bản:\n\`\`\`text\n[dán nội dung]\n\`\`\`\n`
  },
  {
    id: 'extract-json',
    category: 'Trích xuất',
    title: 'Trích xuất thành JSON',
    desc: 'Phù hợp khi biến văn bản phi cấu trúc thành dữ liệu dùng được cho chương trình.',
    template: `Task: trích xuất thông tin từ văn bản.\nOutput: chỉ in JSON (không giải thích).\nCấu trúc JSON:\n\`\`\`json\n{\n  \"title\": \"\",\n  \"date\": \"\",\n  \"people\": [],\n  \"actions\": []\n}\n\`\`\`\nVăn bản:\n\`\`\`text\n[dán nội dung]\n\`\`\`\n`
  },
  {
    id: 'rewrite-clear',
    category: 'Viết lại',
    title: 'Trau chuốt văn bản',
    desc: 'Phù hợp khi biến nội dung khẩu ngữ/lộn xộn thành "bản chính thức" rõ ràng.',
    template: `Task: viết lại đoạn dưới cho rõ ràng, mạch lạc, không thay đổi nghĩa.\nYêu cầu:\n- Giữ nguyên thông tin chính và con số\n- Giọng văn: chuyên nghiệp nhưng không cứng nhắc\n- Mỗi đoạn không quá 2 câu\nOutput: Markdown\nNguyên bản:\n\`\`\`text\n[dán nội dung]\n\`\`\`\n`
  },
  {
    id: 'translate-deliver',
    category: 'Dịch',
    title: 'Dịch cấp giao việc',
    desc: 'Phù hợp khi cần bàn giao đa ngôn ngữ, nhấn mạnh nhất quán thuật ngữ và giữ cấu trúc.',
    template: `Task: dịch nội dung dưới sang tiếng Anh (hoặc ngôn ngữ bạn chỉ định).\nYêu cầu:\n- Giữ thuật ngữ nhất quán (chưa chắc thì đưa 2 phương án và giải thích khác biệt)\n- Giữ cấp tiêu đề và cấu trúc danh sách\nOutput: Markdown\nNguyên bản:\n\`\`\`text\n[dán nội dung]\n\`\`\`\n`
  },
  {
    id: 'brainstorm-12',
    category: 'Brainstorm',
    title: '12 ý tưởng khác nhau',
    desc: 'Phù hợp khi cần "đa dạng" thay vì duy nhất một đáp án đúng.',
    template: `Task: đưa ra 12 ý tưởng theo nhiều hướng khác nhau cho câu hỏi dưới.\nYêu cầu:\n- Mỗi ý <= 20 chữ\n- Bao phủ nhiều góc nhìn (user/kỹ thuật/kinh doanh/vận hành/rủi ro)\nOutput: danh sách Markdown\nCâu hỏi:\n\`\`\`text\n[mô tả vấn đề/mục tiêu/ràng buộc]\n\`\`\`\n`
  },
  {
    id: 'design-solution',
    category: 'Giải pháp',
    title: 'Thiết kế giải pháp (làm rõ trước)',
    desc: 'Phù hợp cho bài toán phức tạp: hỏi để bù thông tin trước, rồi mới đưa kiến trúc và task.',
    template: `Bạn là kiến trúc sư kỳ cựu.\nTask: đưa ra giải pháp kỹ thuật khả thi cho yêu cầu dưới.\nYêu cầu:\n1) Trước tiên liệt kê 5 câu hỏi làm rõ (thiếu thông tin thì hỏi)\n2) Tiếp theo đưa ra giải pháp (mô tả kiến trúc bằng chữ cũng được)\n3) Liệt kê các trade-off chính (ít nhất 3)\n4) Đưa bản phân chia task có thể thực hiện trong 1-2 tuần (theo ngày/module)\nOutput: Markdown\nYêu cầu:\n\`\`\`text\n[dán yêu cầu]\n\`\`\`\n`
  },
  {
    id: 'meeting-minutes',
    category: 'Cuộc họp',
    title: 'Biên bản họp (hành động hoá)',
    desc: 'Phù hợp khi biến "bản ghi" thành checklist có thể thực thi.',
    template: `Task: chuyển bản ghi họp dưới thành biên bản có thể thực thi.\nYêu cầu:\n- Kết luận (1-3 ý)\n- Quyết định (ai quyết điều gì)\n- Action Items (người phụ trách / deadline / sản phẩm bàn giao)\n- Rủi ro và mục cần xác nhận\nOutput: Markdown\nBản ghi họp:\n\`\`\`text\n[dán nội dung]\n\`\`\`\n`
  },
  {
    id: 'support-reply',
    category: 'Giao tiếp',
    title: 'Phản hồi khách hàng',
    desc: 'Phù hợp khi cần giọng văn ổn định + giảm hiểu nhầm + hướng dẫn user bổ sung thông tin.',
    template: `Bạn là chuyên viên hỗ trợ chuyên nghiệp.\nTask: phản hồi tin nhắn dưới của khách hàng.\nYêu cầu:\n- Mở đầu bằng một câu đồng cảm (không xin lỗi quá mức)\n- Hướng dẫn 3 bước để user kiểm tra (mỗi bước 1 câu)\n- Nếu cần thêm thông tin, liệt kê 3 thông tin cần user cung cấp\n- Giọng văn: thân thiện, rõ ràng, ít thuật ngữ\nOutput: Markdown\nTin nhắn của user:\n\`\`\`text\n[dán nội dung]\n\`\`\`\n`
  },
  {
    id: 'debug-fix',
    category: 'Debug',
    title: 'Khoanh vùng và fix',
    desc: 'Phù hợp với issue production/local: liệt kê nguyên nhân theo xác suất, kèm cách kiểm chứng và fix.',
    template: `Bạn là kỹ sư kỳ cựu.\nTask: dựa trên thông tin dưới, khoanh vùng và đề xuất phương án fix.\nYêu cầu:\n1) Liệt kê 3 nguyên nhân có khả năng nhất (sắp theo xác suất)\n2) Mỗi nguyên nhân có một bước kiểm chứng tối thiểu\n3) Đưa fix cuối (kèm đoạn code/cấu hình)\nOutput: Markdown\nContext:\n\`\`\`text\n[project/môi trường/version]\n\`\`\`\nLỗi và log:\n\`\`\`text\n[dán log lỗi]\n\`\`\`\nCode liên quan:\n\`\`\`text\n[dán code]\n\`\`\`\n`
  },
  {
    id: 'table-track',
    category: 'Cấu trúc',
    title: 'Đưa thành bảng theo dõi',
    desc: 'Phù hợp khi biến đoạn dài thành các mục có thể thực thi và theo dõi.',
    template: `Task: chuyển nội dung dưới thành bảng để dễ thực thi và theo dõi.\nYêu cầu:\n- Output một bảng Markdown\n- Các cột: Việc / Người phụ trách / Deadline / Trạng thái hiện tại / Ghi chú\n- Nếu thiếu người phụ trách/deadline, ghi "TBD"\nNguyên bản:\n\`\`\`text\n[dán nội dung]\n\`\`\`\n`
  },
  {
    id: 'self-check',
    category: 'Nghiệm thu',
    title: 'Checklist tự kiểm tra',
    desc: 'Phù hợp để output "có thể nghiệm thu": cuối bài bắt buộc tự kiểm để giảm lệch hướng.',
    template: `Task: hoàn thành nhiệm vụ dưới và tự kiểm cuối bài.\nYêu cầu:\n- Cuối output thêm "Checklist tự kiểm": trả lời từng mục có đáp ứng không (Có/Không/Không áp dụng)\n- Nếu không đạt, giải thích lý do và đưa bản cải thiện\nTask:\n\`\`\`text\n[mô tả task]\n\`\`\`\nRàng buộc (tuỳ chọn):\n\`\`\`text\n[độ dài/định dạng/phải có/phải tránh]\n\`\`\`\n`
  },
  {
    id: 'code-review',
    category: 'Kỹ thuật',
    title: 'Code review (checklist trước)',
    desc: 'Phù hợp để review có cấu trúc: đưa checklist trước, rồi list vấn đề và đoạn fix.',
    template: `Bạn là kỹ sư kỳ cựu.\nTask: review đoạn code dưới.\nYêu cầu:\n1) Liệt kê checklist (3-5 mục)\n2) Liệt kê vấn đề (hiện tượng/nguyên nhân/fix)\n3) Cuối cùng đưa đoạn fix\nCode:\n\`\`\`text\n[dán code]\n\`\`\`\n`
  }
]

const filtered = computed(() => {
  const s = q.value.trim().toLowerCase()
  if (!s) return templates
  return templates.filter((t) => {
    const hay = `${t.category} ${t.title} ${t.desc}`.toLowerCase()
    return hay.includes(s)
  })
})

const activeId = ref(templates[0].id)
const active = computed(
  () => templates.find((t) => t.id === activeId.value) || templates[0]
)

const select = (id) => {
  activeId.value = id
  copied.value = false
}

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    ElMessage.success('Template đã được copy vào clipboard')
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    copied.value = false
    ElMessage.error('Copy thất bại, vui lòng copy thủ công')
  }
}
</script>

<style scoped>
.templates-card {
  margin: 16px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}

.header-left {
  flex: 1;
  min-width: 200px;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.header-right {
  display: flex;
  gap: 8px;
  align-items: center;
}

.tags-container {
  margin-bottom: 20px;
}

.desc-alert {
  margin-bottom: 16px;
}

.code-card {
  background-color: var(--vp-c-bg-alt);
  border-radius: 4px;
}

.code-block {
  margin: 0;
  font-family: monospace;
  font-size: 13px;
  white-space: pre-wrap;
  color: var(--vp-c-text-1);
}

.note-section {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.note-text {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
  }
  
  .header-right {
    width: 100%;
    justify-content: space-between;
  }
  
  .header-right .el-input {
    flex: 1;
  }
}
</style>