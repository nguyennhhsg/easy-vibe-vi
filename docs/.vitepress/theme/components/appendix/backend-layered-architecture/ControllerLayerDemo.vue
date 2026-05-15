<template>
  <div class="controller-demo">
    <div class="header">
      <div class="title">Tầng Controller: "Lễ tân" của request</div>
      <div class="subtitle">Bấm vào các node trong flow để xem chi tiết</div>
    </div>

    <div class="flow">
      <div class="step">
        <div class="step-label">Client gửi request</div>
        <pre class="step-code">POST /api/users/register
Content-Type: application/json
{ "username": "Nguyen Van A", "email": "nguyenvana@example.com", "password": "123456" }</pre>
      </div>

      <div class="arrow">↓ Request tới</div>

      <div :class="['step', 'clickable', { active: detail === 'ctrl' }]" @click="toggle('ctrl')">
        <div class="step-label accent">Controller nhận và phân tích request</div>
        <pre class="step-code">@RestController
@RequestMapping("/api/users")
public class UserController {
    @PostMapping("/register")
    public ResponseEntity&lt;UserDTO&gt; register(
        @RequestBody @Valid UserRegisterRequest request) {
        UserDTO user = userService.register(request);
        return ResponseEntity.ok(user);
    }
}</pre>
      </div>

      <div class="arrow">↓ Kiểm tra tham số + gọi</div>

      <div :class="['step', 'clickable', { active: detail === 'valid' }]" @click="toggle('valid')">
        <div class="step-label warn">Kiểm tra tham số (một trong các trách nhiệm của Controller)</div>
        <pre class="step-code">public class UserRegisterRequest {
    @NotBlank(message = "Username không được trống")
    @Size(min = 2, max = 20) private String username;
    @Email(message = "Email không đúng định dạng") private String email;
    @Size(min = 6, message = "Mật khẩu tối thiểu 6 ký tự") private String password;
}</pre>
        <div v-if="detail === 'valid'" class="detail-box">
          <strong>Vì sao đặt validation ở Controller?</strong>
          <ul>
            <li>Tuyến phòng thủ đầu tiên: chặn sớm request bất hợp lệ</li>
            <li>Giảm áp lực cho tầng dưới: Service có thể giả định dữ liệu đã được làm sạch</li>
            <li>Tách bạch mối quan tâm: Service tập trung vào nghiệp vụ, không xử lý kiểm tra định dạng</li>
          </ul>
        </div>
      </div>

      <div class="arrow">↓ Trả kết quả</div>

      <div class="step">
        <div class="step-label">Controller đóng gói response trả về</div>
        <pre class="step-code">HTTP/1.1 200 OK
{ "code": 200, "message": "Đăng ký thành công",
  "data": { "id": 10001, "username": "Nguyen Van A", "email": "nguyenvana@example.com" } }</pre>
      </div>
    </div>

    <div class="duties">
      <div class="duties-title">Trách nhiệm cốt lõi của Controller</div>
      <div class="duty-grid">
        <div class="duty" v-for="d in duties" :key="d.name">
          <div class="duty-name">{{ d.name }}</div>
          <div class="duty-desc">{{ d.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const detail = ref('')
const toggle = (s) => { detail.value = detail.value === s ? '' : s }

const duties = [
  { name: 'Nhận request', desc: 'Ánh xạ HTTP request vào method' },
  { name: 'Validate tham số', desc: 'Kiểm tra định dạng và trường bắt buộc' },
  { name: 'Gọi Service', desc: 'Chuyển tiếp request tới tầng business' },
  { name: 'Đóng gói response', desc: 'Trả về định dạng response thống nhất' }
]
</script>

<style scoped>
.controller-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.flow { display: flex; flex-direction: column; gap: 8px; }
.arrow { text-align: center; color: var(--vp-c-text-3); font-size: 12px; }

.step {
  padding: 14px; border-radius: 8px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.step.clickable { cursor: pointer; transition: all .2s; }
.step.clickable:hover { box-shadow: 0 2px 8px rgba(0,0,0,.06); }
.step.active { border-color: var(--vp-c-brand-1); box-shadow: 0 0 0 2px var(--vp-c-brand-soft); }

.step-label { font-weight: 600; font-size: 13px; color: var(--vp-c-text-1); margin-bottom: 8px; }
.step-label.accent { color: #10b981; }
.step-label.warn { color: #f59e0b; }

.step-code {
  margin: 0; padding: 10px; border-radius: 6px; overflow-x: auto;
  background: var(--vp-c-bg-soft); font-size: 11px; line-height: 1.5;
  color: var(--vp-c-text-2); font-family: var(--vp-font-family-mono);
}

.detail-box {
  margin-top: 12px; padding: 12px; border-radius: 6px;
  background: var(--vp-c-brand-soft); border-left: 3px solid var(--vp-c-brand-1);
  font-size: 12px; color: var(--vp-c-text-1); line-height: 1.6;
}
.detail-box ul { margin: 8px 0 0; padding-left: 18px; }
.detail-box li { margin: 4px 0; }

.duties { margin-top: 20px; padding: 16px; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); }
.duties-title { text-align: center; font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); margin-bottom: 12px; }
.duty-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.duty { text-align: center; padding: 12px 8px; background: var(--vp-c-bg-soft); border-radius: 6px; }
.duty-name { font-weight: 600; font-size: 13px; color: var(--vp-c-text-1); margin-bottom: 4px; }
.duty-desc { font-size: 11px; color: var(--vp-c-text-3); }

@media (max-width: 768px) {
  .duty-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
