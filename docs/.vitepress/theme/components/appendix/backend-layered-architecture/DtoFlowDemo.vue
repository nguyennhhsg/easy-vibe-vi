<template>
  <div class="dto-demo">
    <div class="header">
      <div class="title">Luồng DTO: chuyển đổi dữ liệu giữa các tầng</div>
      <div class="subtitle">DTO (Data Transfer Object) là vật mang dữ liệu giữa các tầng</div>
    </div>

    <div class="flow-box">
      <div class="flow-step green">
        <div class="step-label">Tầng Controller</div>
        <pre class="step-code"><code>// Nhận Request DTO
public ResponseEntity&lt;UserDTO&gt; createUser(
    @RequestBody @Valid UserCreateRequest request) { ... }</code></pre>
      </div>

      <div class="arrow">↓ Chuyển đổi thành tham số cho Service</div>

      <div class="flow-step orange">
        <div class="step-label">Tầng Service</div>
        <pre class="step-code"><code>public UserDTO createUser(UserCreateParam param) {
    User user = param.toEntity();   // Chuyển thành Entity
    userRepository.save(user);
    return UserDTO.from(user);      // Entity → DTO
}</code></pre>
      </div>

      <div class="arrow">↓ Chuyển thành Entity mà Repository cần</div>

      <div class="flow-step blue">
        <div class="step-label">Tầng Repository</div>
        <pre class="step-code"><code>public interface UserRepository
    extends JpaRepository&lt;User, Long&gt; { }</code></pre>
      </div>

      <div class="arrow">↑ Trả về Entity, chuyển thành DTO</div>

      <div class="flow-step">
        <div class="step-label">Trả về cho client</div>
        <pre class="step-code"><code>{ "id": 10001, "username": "Nguyen Van A",
  "email": "nguyenvana@example.com", "createdAt": "2024-01-15T10:30:00Z" }</code></pre>
      </div>
    </div>

    <div class="table-box">
      <div class="table-title">Trách nhiệm DTO theo từng tầng</div>
      <table>
        <thead>
          <tr><th>Tầng</th><th>Loại DTO</th><th>Trách nhiệm</th><th>Ví dụ</th></tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="r.layer">
            <td><span :class="['tag', r.cls]">{{ r.layer }}</span></td>
            <td>{{ r.type }}</td>
            <td>{{ r.purpose }}</td>
            <td><code>{{ r.example }}</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const rows = [
  { layer: 'Controller', cls: 'green', type: 'Request / Response DTO', purpose: 'Định nghĩa API contract, validate tham số', example: 'UserCreateRequest' },
  { layer: 'Service', cls: 'orange', type: 'Param / Result DTO', purpose: 'Đóng gói tham số method nghiệp vụ, decouple giữa các tầng', example: 'UserCreateParam' },
  { layer: 'Repository', cls: 'blue', type: 'Entity / DO', purpose: 'Ánh xạ cấu trúc bảng database', example: 'UserEntity' }
]
</script>

<style scoped>
.dto-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.flow-box {
  padding: 18px; border-radius: 10px; margin-bottom: 16px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.flow-step {
  border-radius: 6px; overflow: hidden;
  background: var(--vp-c-bg-soft); border-left: 3px solid var(--vp-c-divider);
}
.flow-step.green { border-left-color: #10b981; }
.flow-step.orange { border-left-color: #f59e0b; }
.flow-step.blue { border-left-color: #3b82f6; }

.step-label {
  padding: 10px 14px; font-weight: 600; font-size: 13px;
  color: var(--vp-c-text-1); border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}
.step-code {
  margin: 0; padding: 12px 14px; overflow-x: auto;
  font-size: 11px; line-height: 1.5;
}
.step-code code { color: var(--vp-c-text-2); font-family: var(--vp-font-family-mono); }
.arrow { text-align: center; padding: 8px; color: var(--vp-c-text-3); font-size: 12px; }

.table-box {
  padding: 16px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.table-title { text-align: center; font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); margin-bottom: 12px; }
table { width: 100%; border-collapse: collapse; font-size: 12px; }
th, td { padding: 10px; text-align: left; border-bottom: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); }
th { background: var(--vp-c-bg-soft); font-weight: 600; color: var(--vp-c-text-1); }
.tag { padding: 2px 8px; border-radius: 10px; font-size: 11px; color: #fff; }
.tag.green { background: #10b981; }
.tag.orange { background: #f59e0b; }
.tag.blue { background: #3b82f6; }
</style>
