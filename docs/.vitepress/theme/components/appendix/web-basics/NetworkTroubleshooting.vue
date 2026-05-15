<template>
  <div class="network-troubleshooting">
    <div class="problem-selector">
      <div class="selector-title">
        Chọn loại sự cố
      </div>
      <div class="problem-list">
        <button
          v-for="(problem, index) in problems"
          :key="index"
          class="problem-btn"
          :class="{ active: selectedProblem === index }"
          @click="selectProblem(index)"
        >
          <span class="problem-icon">{{ problem.icon }}</span>
          <span class="problem-text">{{ problem.name }}</span>
        </button>
      </div>
    </div>

    <div
      v-if="selectedProblem !== null"
      class="solution-panel"
    >
      <div class="solution-header">
        <div class="solution-title">
          {{ problems[selectedProblem].name }}
        </div>
        <div class="solution-desc">
          {{ problems[selectedProblem].description }}
        </div>
      </div>

      <div class="solution-steps">
        <div class="steps-title">
          🔧 Các bước xử lý
        </div>
        <div class="steps-list">
          <div
            v-for="(step, index) in problems[selectedProblem].steps"
            :key="index"
            class="step-item"
            :class="{ completed: completedSteps.has(index) }"
            @click="toggleStep(index)"
          >
            <div class="step-number">
              {{ index + 1 }}
            </div>
            <div class="step-content">
              <div class="step-action">
                {{ step.action }}
              </div>
              <div
                v-if="step.command"
                class="step-command"
              >
                <code>{{ step.command }}</code>
              </div>
              <div class="step-explanation">
                {{ step.explanation }}
              </div>
            </div>
            <div class="step-check">
              {{ completedSteps.has(index) ? '✓' : '○' }}
            </div>
          </div>
        </div>
      </div>

      <div class="related-tools">
        <div class="tools-title">
          🛠️ Công cụ liên quan
        </div>
        <div class="tools-list">
          <div
            v-for="(tool, index) in problems[selectedProblem].tools"
            :key="index"
            class="tool-item"
          >
            <div class="tool-name">
              {{ tool.name }}
            </div>
            <div class="tool-usage">
              {{ tool.usage }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="common-commands">
      <div class="commands-title">
        📋 Câu lệnh chẩn đoán thường dùng
      </div>
      <div class="commands-grid">
        <div
          v-for="(cmd, index) in commands"
          :key="index"
          class="command-card"
        >
          <div class="command-name">
            {{ cmd.name }}
          </div>
          <div class="command-syntax">
            {{ cmd.syntax }}
          </div>
          <div class="command-desc">
            {{ cmd.description }}
          </div>
        </div>
      </div>
    </div>

    <div class="troubleshooting-tips">
      <div class="tips-title">
        💡 Mẹo xử lý sự cố
      </div>
      <div class="tips-list">
        <div class="tip-item">
          <div class="tip-number">
            1
          </div>
          <div class="tip-content">
            <strong>Từ tầng thấp lên tầng cao</strong>
            <br>Tầng vật lý → tầng liên kết → tầng mạng → tầng giao vận → tầng ứng dụng
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-number">
            2
          </div>
          <div class="tip-content">
            <strong>Tìm theo từng tầng</strong>
            <br>Xác định sự cố ở tầng nào trước rồi xử lý đúng chỗ
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-number">
            3
          </div>
          <div class="tip-content">
            <strong>Khoanh vùng kiểu chia đôi</strong>
            <br>
            ping localhost → ping gateway → ping mạng ngoài → ping domain
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-number">
            4
          </div>
          <div class="tip-content">
            <strong>Xem log</strong>
            <br>Log hệ thống, log ứng dụng, log firewall ghi lại thông tin quan trọng
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedProblem = ref(0)
const completedSteps = ref(new Set())

const problems = [
  {
    icon: '🌐',
    name: 'Không truy cập được web',
    description: 'Trình duyệt không mở được trang, báo lỗi kết nối',
    steps: [
      {
        action: 'Kiểm tra kết nối mạng',
        command: 'ping 8.8.8.8',
        explanation: 'Kiểm tra xem có kết nối được Internet không (8.8.8.8 là DNS của Google)'
      },
      {
        action: 'Kiểm tra phân giải DNS',
        command: 'nslookup google.com',
        explanation: 'Kiểm tra xem domain có phân giải đúng thành địa chỉ IP không'
      },
      {
        action: 'Xoá cache DNS',
        command: 'ipconfig /flushdns (Windows)',
        explanation: 'Xoá cache DNS cục bộ, có thể khắc phục lỗi DNS sai hoặc hết hạn'
      },
      {
        action: 'Kiểm tra cấu hình proxy',
        command: 'Xem proxy của trình duyệt',
        explanation: 'Đảm bảo không cấu hình proxy sai'
      },
      {
        action: 'Thử trang khác',
        command: 'Truy cập một trang khác',
        explanation: 'Xác định lỗi chỉ ở một trang hay toàn bộ mạng'
      }
    ],
    tools: [
      { name: 'ping', usage: 'Kiểm tra thông mạng' },
      { name: 'nslookup', usage: 'Tra cứu bản ghi DNS' },
      { name: 'traceroute', usage: 'Truy vết đường đi của gói' }
    ]
  },
  {
    icon: '📶',
    name: 'Sự cố Wi-Fi',
    description: 'Sóng Wi-Fi yếu, hay rớt mạng hoặc không kết nối được',
    steps: [
      {
        action: 'Kiểm tra công tắc Wi-Fi',
        command: 'Kiểm tra công tắc vật lý hoặc settings hệ thống',
        explanation: 'Đảm bảo Wi-Fi đã bật'
      },
      {
        action: 'Khởi động lại thiết bị mạng',
        command: 'Khởi động lại router và modem',
        explanation: 'Tắt mở nguồn có thể khắc phục đa số lỗi tạm thời'
      },
      {
        action: 'Quên mạng và kết nối lại',
        command: 'Xoá cấu hình Wi-Fi rồi nhập lại mật khẩu',
        explanation: 'Xoá thông tin cấu hình sai'
      },
      {
        action: 'Cập nhật driver card mạng',
        command: 'Device Manager → Network adapters → Update driver',
        explanation: 'Driver cũ có thể gây ra lỗi tương thích'
      },
      {
        action: 'Đổi DNS server',
        command: 'Đặt thành 8.8.8.8 hoặc 1.1.1.1',
        explanation: 'DNS của ISP có thể không ổn định'
      }
    ],
    tools: [
      { name: 'wifi-menu (macOS)', usage: 'Xem thông tin Wi-Fi' },
      { name: 'netsh wlan (Windows)', usage: 'Quản lý mạng không dây' },
      { name: 'iwconfig (Linux)', usage: 'Cấu hình giao diện không dây' }
    ]
  },
  {
    icon: '🐌',
    name: 'Mạng chậm',
    description: 'Kết nối mạng bình thường nhưng tốc độ rất chậm',
    steps: [
      {
        action: 'Đo băng thông thực tế',
        command: 'Truy cập speedtest.net',
        explanation: 'Đo tốc độ upload và download hiện tại'
      },
      {
        action: 'Kiểm tra mức chiếm dụng mạng',
        command: 'netstat -an | grep ESTABLISHED',
        explanation: 'Xem có nhiều kết nối đang chiếm băng thông không'
      },
      {
        action: 'Tắt ứng dụng chạy nền',
        command: 'Kiểm tra download, update, đồng bộ cloud...',
        explanation: 'Ứng dụng chạy nền có thể ngốn nhiều băng thông'
      },
      {
        action: 'Đổi kênh Wi-Fi',
        command: 'Trang quản trị router → cấu hình không dây',
        explanation: 'Kênh bị nghẽn sẽ làm Wi-Fi chậm đi nhiều'
      },
      {
        action: 'Liên hệ ISP',
        command: 'Kiểm tra xem nhà mạng có sự cố hay bóp băng thông không',
        explanation: 'Có thể là sự cố đường truyền của nhà mạng'
      }
    ],
    tools: [
      { name: 'speedtest-cli', usage: 'Đo tốc độ qua CLI' },
      { name: 'nethogs', usage: 'Xem traffic theo process' },
      { name: 'iftop', usage: 'Giám sát băng thông realtime' }
    ]
  },
  {
    icon: '⏱️',
    name: 'Độ trễ cao',
    description: 'Mạng phản hồi chậm, chơi game bị giật',
    steps: [
      {
        action: 'Đo giá trị ping',
        command: 'ping -c 100 google.com',
        explanation: 'Gửi 100 gói, thống kê độ trễ trung bình và tỉ lệ mất gói'
      },
      {
        action: 'Truy vết route',
        command: 'traceroute google.com',
        explanation: 'Xem hop nào có độ trễ quá cao'
      },
      {
        action: 'Kiểm tra mạng nội bộ',
        command: 'ping các thiết bị khác trong LAN',
        explanation: 'Loại trừ sự cố mạng nội bộ'
      },
      {
        action: 'Dùng kết nối có dây',
        command: 'Cắm dây mạng để thử',
        explanation: 'Wi-Fi có thể không ổn định hoặc bị nhiễu'
      },
      {
        action: 'Kiểm tra cấu hình QoS',
        command: 'Cấu hình QoS trên router',
        explanation: 'Có thể bị thiết bị hoặc ứng dụng khác chiếm độ ưu tiên'
      }
    ],
    tools: [
      { name: 'ping', usage: 'Đo độ trễ và mất gói' },
      { name: 'traceroute', usage: 'Truy vết đường đi' },
      { name: 'mtr', usage: 'Kết hợp ping và traceroute' }
    ]
  },
  {
    icon: '🔌',
    name: 'Không truy cập được port',
    description: 'Service vẫn chạy nhưng bên ngoài không truy cập được',
    steps: [
      {
        action: 'Kiểm tra service đang listen',
        command: 'netstat -tuln | grep :80',
        explanation: 'Xác nhận service đang lắng nghe đúng port'
      },
      {
        action: 'Kiểm tra firewall',
        command: 'iptables -L (Linux) hoặc firewall-cmd (CentOS)',
        explanation: 'Firewall có thể đang chặn port'
      },
      {
        action: 'Thử truy cập từ máy local',
        command: 'curl http://localhost:8080',
        explanation: 'Xác nhận bản thân service hoạt động bình thường'
      },
      {
        action: 'Kiểm tra security group trên cloud',
        command: 'Console → Security group rules',
        explanation: 'Máy chủ trên cloud cần cấu hình security group thêm'
      },
      {
        action: 'Kiểm tra port đang bị chiếm',
        command: 'lsof -i :8080',
        explanation: 'Đảm bảo port không bị process khác chiếm'
      }
    ],
    tools: [
      { name: 'netstat', usage: 'Xem các kết nối mạng' },
      { name: 'telnet', usage: 'Kiểm tra thông port' },
      { name: 'nmap', usage: 'Công cụ quét port' }
    ]
  }
]

const commands = [
  {
    name: 'ping',
    syntax: 'ping [host]',
    description: 'Kiểm tra thông mạng và độ trễ đến host đích'
  },
  {
    name: 'traceroute',
    syntax: 'traceroute [host]',
    description: 'Hiển thị đường đi của gói tin đến đích'
  },
  {
    name: 'nslookup',
    syntax: 'nslookup [domain]',
    description: 'Tra cứu bản ghi DNS của một domain'
  },
  {
    name: 'netstat',
    syntax: 'netstat -tuln',
    description: 'Hiển thị kết nối mạng và các port đang lắng nghe'
  },
  {
    name: 'curl',
    syntax: 'curl -v [url]',
    description: 'Thử request HTTP và xem thông tin chi tiết'
  },
  {
    name: 'tcpdump',
    syntax: 'tcpdump -i eth0',
    description: 'Bắt gói tin mạng để phân tích'
  }
]

const selectProblem = (index) => {
  selectedProblem.value = index
  completedSteps.value = new Set()
}

const toggleStep = (index) => {
  if (completedSteps.value.has(index)) {
    completedSteps.value.delete(index)
  } else {
    completedSteps.value.add(index)
  }
}
</script>

<style scoped>
.network-troubleshooting {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.problem-selector {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 25px;
}

.selector-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.problem-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.problem-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: all 0.2s;
}

.problem-btn:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}

.problem-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
}

.problem-btn.active .problem-text {
  color: white;
}

.problem-icon {
  font-size: 1.5rem;
}

.problem-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.solution-panel {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 25px;
}

.solution-header {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--vp-c-divider);
}

.solution-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.solution-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
}

.solution-steps {
  margin-bottom: 25px;
}

.steps-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
}

.step-item:hover {
  border-left-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}

.step-item.completed {
  border-left-color: #22c55e;
  opacity: 0.7;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-action {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.step-command {
  margin-bottom: 6px;
}

.step-command code {
  background: var(--vp-c-bg);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  font-family: monospace;
}

.step-explanation {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  line-height: 1.6;
}

.step-check {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.step-item.completed .step-check {
  border-color: #22c55e;
  color: #22c55e;
}

.related-tools {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 15px;
}

.tools-title {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.tools-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tool-item {
  background: var(--vp-c-bg);
  padding: 10px 15px;
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.tool-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  font-family: monospace;
  margin-bottom: 4px;
}

.tool-usage {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.common-commands {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 25px;
}

.commands-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.commands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.command-card {
  background: var(--vp-c-bg-soft);
  padding: 15px;
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.command-name {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  font-family: monospace;
  margin-bottom: 6px;
}

.command-syntax {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-family: monospace;
  margin-bottom: 6px;
}

.command-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  line-height: 1.5;
}

.troubleshooting-tips {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  border-left: 4px solid var(--vp-c-brand);
}

.tips-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tip-item {
  display: flex;
  gap: 15px;
}

.tip-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}
</style>
