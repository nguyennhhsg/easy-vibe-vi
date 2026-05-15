<template>
  <div class="type-safety-demo">
    <h4>🛡️ Thực hành type safety: cạm bẫy thường gặp và cách phòng vệ</h4>
    <p class="desc">Bấm vào các tình huống cạm bẫy khác nhau để học cách dùng hệ kiểu bảo vệ code của bạn</p>

    <div class="trap-selector">
      <button
        v-for="(trap, i) in traps"
        :key="i"
        :class="['trap-btn', { active: selected === i }]"
        @click="selected = i"
      >
        <span class="trap-icon">{{ trap.icon }}</span>
        <span>{{ trap.name }}</span>
      </button>
    </div>

    <div class="trap-detail">
      <div class="danger-zone">
        <div class="zone-header danger">⚠️ Code nguy hiểm</div>
        <pre class="code-block">{{ traps[selected].dangerCode }}</pre>
        <div class="zone-result danger">{{ traps[selected].dangerResult }}</div>
      </div>

      <div class="safe-zone">
        <div class="zone-header safe">✅ Code an toàn</div>
        <pre class="code-block">{{ traps[selected].safeCode }}</pre>
        <div class="zone-result safe">{{ traps[selected].safeResult }}</div>
      </div>
    </div>

    <div class="defense-tip">
      <div class="tip-header">🔑 Chiến lược phòng vệ</div>
      <ul>
        <li v-for="(tip, j) in traps[selected].tips" :key="j">{{ tip }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(0)

const traps = [
  {
    icon: '💣', name: 'Tham chiếu null',
    dangerCode: `function getLength(str) {
  return str.length  // Lỡ str là null thì sao?
}
getLength(null)  // 💥 Crash lúc chạy`,
    dangerResult: '💥 TypeError: Cannot read properties of null',
    safeCode: `function getLength(str: string | null): number {
  if (str === null) return 0
  return str.length  // ✅ Trình biên dịch đảm bảo str khác null
}`,
    safeResult: '✅ Trình biên dịch buộc bạn xử lý trường hợp null',
    tips: ['Bật tùy chọn biên dịch strictNullChecks', 'Dùng union type string | null để khai báo có thể null', 'Dùng optional chaining ?. để truy cập thuộc tính an toàn']
  },
  {
    icon: '🎭', name: 'Lạm dụng type assertion',
    dangerCode: `const data = fetchAPI() as any
const name = data.user.profile.name
// Lỡ API đổi định dạng thì sao?`,
    dangerResult: '💥 Crash lúc chạy, any bỏ qua mọi kiểm tra kiểu',
    safeCode: `interface APIResponse {
  user: { profile: { name: string } }
}
const data: APIResponse = await fetchAPI()
const name = data.user.profile.name`,
    safeResult: '✅ Nếu định dạng API đổi, lỗi sẽ lộ ra lúc biên dịch',
    tips: ['Tránh dùng any, thay bằng unknown', 'Định nghĩa interface rõ ràng cho response API', 'Dùng thư viện như zod để kiểm tra ở runtime']
  },
  {
    icon: '🔄', name: 'Chuyển kiểu ngầm',
    dangerCode: `if (userId == 0) {
  // userId là "" cũng vào nhánh này!
  console.log("User không hợp lệ")
}
// "" == 0 → true (chuyển kiểu ngầm)`,
    dangerResult: '💥 Chuỗi rỗng bị coi là 0, logic sai',
    safeCode: `if (userId === 0) {
  console.log("User không hợp lệ")
}
// "" === 0 → false (so sánh nghiêm ngặt)`,
    safeResult: '✅ So sánh nghiêm ngặt không chuyển kiểu ngầm',
    tips: ['Luôn dùng === thay cho ==', 'Bật quy tắc eqeqeq của ESLint', 'Dùng strict mode của TypeScript']
  },
  {
    icon: '📦', name: 'Mảng không an toàn kiểu',
    dangerCode: `const items = []  // kiểu any[]
items.push(1)
items.push("hello")
items.push({ x: 1 })
// Mảng chứa đủ kiểu, lúc lấy ra dùng dễ lỗi`,
    dangerResult: '💥 Phần tử mảng không cùng kiểu, thao tác sau dễ crash',
    safeCode: `const items: number[] = []
items.push(1)
items.push("hello")  // ❌ Lỗi biên dịch!
// Trình biên dịch đảm bảo các phần tử cùng kiểu`,
    safeResult: '✅ Lúc biên dịch đã chặn các phần tử khác kiểu',
    tips: ['Chỉ định kiểu phần tử khi khai báo mảng', 'Dùng ReadonlyArray để tránh sửa ngoài ý muốn', 'Dùng tuple [string, number] cho cấu trúc cố định']
  }
]
</script>

<style scoped>
.type-safety-demo {
  padding: 20px; border: 1px solid var(--vp-c-divider);
  border-radius: 12px; margin: 16px 0; background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }
.trap-selector { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.trap-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 13px; transition: all 0.2s;
}
.trap-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.trap-icon { font-size: 16px; }
.trap-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
.danger-zone, .safe-zone { border-radius: 8px; border: 1px solid var(--vp-c-divider); overflow: hidden; background: var(--vp-c-bg); }
.zone-header { padding: 6px 12px; font-size: 13px; font-weight: 600; border-bottom: 1px solid var(--vp-c-divider); }
.zone-header.danger { background: #fef2f2; color: #991b1b; }
.zone-header.safe { background: #f0fdf4; color: #166534; }
.code-block { padding: 10px 12px; margin: 0; font-size: 12px; line-height: 1.5; white-space: pre-wrap; }
.zone-result { padding: 6px 12px; font-size: 12px; border-top: 1px solid var(--vp-c-divider); }
.zone-result.danger { background: #fef2f2; color: #991b1b; }
.zone-result.safe { background: #f0fdf4; color: #166534; }
.defense-tip { padding: 12px 14px; background: var(--vp-c-brand-soft); border-radius: 8px; }
.tip-header { font-weight: 600; font-size: 13px; margin-bottom: 6px; }
.defense-tip ul { margin: 0; padding-left: 18px; }
.defense-tip li { font-size: 13px; margin: 3px 0; }
@media (max-width: 640px) { .trap-detail { grid-template-columns: 1fr; } }
</style>
