<template>
  <div class="agent-chat-demo">
    <div class="header">
      <div class="title">
        🤖 Trải nghiệm Agent đầu tiên: từ "biết nói" đến "biết làm"
      </div>
      <div class="subtitle">
        Trải nghiệm cách Agent tự động gọi tool để hoàn thành task
      </div>
    </div>

    <!-- 场景选择 -->
    <div class="scenario-tabs">
      <button
        v-for="s in scenarios"
        :key="s.id"
        :class="['tab-btn', { active: currentScenario === s.id }]"
        @click="selectScenario(s.id)"
      >
        <span>{{ s.icon }}</span>
        <span>{{ s.name }}</span>
      </button>
    </div>

    <!-- 聊天窗口 -->
    <div class="chat-window">
      <!-- 用户消息 -->
      <div class="message user">
        <div class="avatar">
          👤
        </div>
        <div class="bubble">
          {{ currentScenarioData.query }}
        </div>
      </div>

      <!-- LLM 回复（对比） -->
      <div class="message llm">
        <div class="avatar">
          🤖
        </div>
        <div class="bubble llm-bubble">
          <div class="llm-label">
            LLM thường
          </div>
          <div class="llm-content">
            {{ currentScenarioData.llmResponse }}
          </div>
        </div>
      </div>

      <!-- Agent 回复 -->
      <div class="message agent">
        <div class="avatar agent-avatar">
          🦾
        </div>
        <div class="bubble agent-bubble">
          <div class="agent-label">
            Agent thông minh
          </div>

          <!-- Quá trình suy nghĩ (có thể thu gọn) -->
          <div
            v-if="showThinking"
            class="thinking-section"
          >
            <div
              class="thinking-header"
              @click="toggleThinking"
            >
              <span>🧠 Quá trình suy nghĩ</span>
              <span class="toggle-icon">{{ thinkingExpanded ? '▼' : '▶' }}</span>
            </div>
            <div
              v-if="thinkingExpanded"
              class="thinking-content"
            >
              <div class="thought-item">
                {{ currentScenarioData.thinking }}
              </div>
            </div>
          </div>

          <!-- Gọi tool (có thể thu gọn) -->
          <div
            v-if="showTools"
            ref="toolsSection"
            class="tools-section"
          >
            <div
              class="tools-header"
              @click="toggleTools"
            >
              <span>🔧 Gọi tool ({{ currentScenarioData.tools.length }} tool)</span>
              <span class="toggle-icon">{{ toolsExpanded ? '▼' : '▶' }}</span>
            </div>
            <div
              v-if="toolsExpanded"
              class="tools-list"
            >
              <div 
                v-for="(tool, idx) in currentScenarioData.tools" 
                :key="idx"
                :ref="el => setToolRef(el, idx)"
                class="tool-item"
                :class="{ completed: toolExecuted > idx, executing: toolExecuting === idx }"
              >
                <div class="tool-status">
                  <span v-if="toolExecuted > idx">✅</span>
                  <span
                    v-else-if="toolExecuting === idx"
                    class="spinner"
                  >⏳</span>
                  <span v-else>⏸️</span>
                </div>
                <div class="tool-info">
                  <div class="tool-name">
                    {{ tool.name }}
                  </div>
                  <div
                    v-if="toolExecuted > idx || toolExecuting === idx"
                    class="tool-detail"
                  >
                    <code class="tool-params">{{ tool.params }}</code>
                    <div
                      v-if="toolExecuted > idx"
                      class="tool-result"
                    >
                      {{ tool.result }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Câu trả lời cuối -->
          <div
            v-if="showResponse"
            class="final-response"
          >
            <div class="response-header">
              💬 Câu trả lời cuối
            </div>
            <div class="response-content">
              {{ currentScenarioData.agentResponse }}
            </div>
          </div>

          <!-- Nút chạy -->
          <button
            v-if="!isExecuting && !executionComplete"
            class="execute-btn"
            @click="startExecution"
          >
            ▶ Cho Agent chạy
          </button>
          <button
            v-else-if="executionComplete"
            class="execute-btn reset"
            @click="reset"
          >
            🔄 Reset hội thoại
          </button>
        </div>
      </div>
    </div>

    <!-- Khác biệt cốt lõi -->
    <div class="insight-bar">
      <span class="insight-label">💡 Khác biệt cốt lõi: </span>
      <span class="insight-text">{{ currentScenarioData.insight }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const scenarios = [
  {
    id: 'weather',
    icon: '🌤️',
    name: 'Tra thời tiết',
    query: 'Thời tiết Hà Nội hôm nay thế nào? Nên mặc gì?',
    llmResponse: 'Mình không thể lấy thông tin thời tiết realtime. Hà Nội mùa xuân thường khá dịu, gợi ý mặc áo khoác mỏng.',
    thinking: 'Người dùng muốn biết thời tiết Hà Nội hôm nay và gợi ý mặc đồ. Mình cần: 1) Tra thời tiết realtime 2) Dựa vào nhiệt độ gợi ý mặc đồ',
    tools: [
      { name: 'weather_api', params: '{"city": "Hà Nội", "date": "today"}', result: '☀️ Nắng, 15-25°C, chất lượng không khí tốt' }
    ],
    agentResponse: 'Hà Nội hôm nay nắng đẹp, 15-25°C, chất lượng không khí tốt. Gợi ý mặc áo khoác mỏng hoặc áo dài tay, chênh lệch nhiệt độ sáng/tối khá lớn, nên mang theo áo khoác mỏng.',
    insight: 'Agent gọi API thời tiết lấy dữ liệu realtime, LLM chỉ có thể đoán dựa trên dữ liệu huấn luyện.'
  },
  {
    id: 'calculate',
    icon: '🧮',
    name: 'Tính toán phức tạp',
    query: 'Tính giúp mình: vay 1 tỷ, lãi suất năm 4.2%, trả đều 30 năm, mỗi tháng trả bao nhiêu? Tổng lãi bao nhiêu?',
    llmResponse: 'Theo công thức, mỗi tháng khoảng 5 triệu, tổng lãi khoảng 800 triệu. Đây chỉ là ước lượng, nên dùng máy tính chuyên dụng.',
    thinking: 'Đây là bài toán lãi vay nhà, cần dùng công thức trả đều. Tiền hàng tháng = Nợ gốc × Lãi tháng × (1 + Lãi tháng)^Số tháng / [(1 + Lãi tháng)^Số tháng - 1]',
    tools: [
      { name: 'calculator', params: '{"principal": 1000000000, "rate": 0.042, "years": 30}', result: 'Hàng tháng: 4.890.190đ, Tổng lãi: 760.468.400đ' }
    ],
    agentResponse: 'Kết quả tính:\n• Trả hàng tháng: 4.890.190đ\n• Tổng phải trả: 1.760.468.400đ\n• Tổng lãi: 760.468.400đ\n\nSau 30 năm, lãi chiếm khoảng 76% nợ gốc.',
    insight: 'Agent gọi máy tính đảm bảo chính xác 100%, LLM nhẩm có thể sai.'
  },
  {
    id: 'stock',
    icon: '📈',
    name: 'Phân tích chứng khoán',
    query: 'Phân tích diễn biến cổ phiếu Tesla gần đây và dự đoán xu hướng ngày mai',
    llmResponse: 'Mình không lấy được dữ liệu chứng khoán realtime. Tesla là công ty xe điện nổi tiếng, giá cổ phiếu biến động mạnh, gợi ý xem trên website tài chính chuyên nghiệp.',
    thinking: 'Người dùng cần phân tích diễn biến cổ phiếu Tesla gần đây và dự đoán. Mình cần: 1) Lấy giá mới nhất 2) Lấy dữ liệu lịch sử 3) Phân tích kỹ thuật',
    tools: [
      { name: 'stock_api', params: '{"symbol": "TSLA", "period": "1mo"}', result: 'Giá hiện tại: $248.50, tăng tháng: +12.3%, KL: 120M' },
      { name: 'news_search', params: '{"query": "Tesla stock news", "limit": 5}', result: 'Tìm thấy 5 tin: báo cáo tài chính vượt kỳ vọng, ra mắt model mới...' },
      { name: 'technical_analysis', params: '{"data": "TSLA_price_data", "indicators": ["MA", "RSI"]}', result: 'RSI: 68 (sát overbought), MA20: $235, xu hướng: tăng' }
    ],
    agentResponse: 'Diễn biến Tesla (TSLA) gần đây:\n📈 Tăng tháng +12.3%, giá hiện tại $248.50\n📊 Chỉ báo kỹ thuật: RSI 68 (sát overbought), trên MA20\n📰 Tin tức: báo cáo tài chính vượt kỳ vọng, ra model mới có lợi\n\nDự đoán: ngắn hạn có thể điều chỉnh, trung dài hạn tích cực.',
    insight: 'Agent nối nhiều tool (giá + tin tức + phân tích kỹ thuật) để hoàn thành task phân tích phức tạp.'
  },
  {
    id: 'travel',
    icon: '✈️',
    name: 'Lập kế hoạch du lịch',
    query: 'Lập kế hoạch du lịch Tokyo 3 ngày 2 đêm, ngân sách 30 triệu, gồm vé máy bay, khách sạn, điểm tham quan',
    llmResponse: 'Tokyo là nơi rất hay! Mình có thể gợi ý: chùa Asakusa, Tokyo Tower, khu mua sắm Ginza đều đáng đi. Ngân sách 30 triệu hơi căng, nên đặt sớm.',
    thinking: 'Người dùng cần kế hoạch trọn vẹn Tokyo 3 ngày 2 đêm. Mình cần: 1) Tra vé máy bay 2) Search khách sạn 3) Gợi ý điểm tham quan 4) Lập lộ trình 5) Tính tổng ngân sách',
    tools: [
      { name: 'flight_search', params: '{"from": "HCM", "to": "Tokyo", "depart": "2024-03-15", "return": "2024-03-17"}', result: 'Vé khứ hồi: 9.500.000đ (Spring Airlines)' },
      { name: 'hotel_search', params: '{"city": "Tokyo", "checkin": "2024-03-15", "nights": 2, "budget": 9000000}', result: 'KS Shinjuku Washington: 3.600.000đ/đêm, đánh giá 4.5' },
      { name: 'attractions_search', params: '{"city": "Tokyo", "days": 3}', result: 'Điểm gợi ý: chùa Asakusa, Tokyo Tower, ngã tư Shibuya, Đền Meiji, Akihabara' },
      { name: 'route_planner', params: '{"spots": ["Asakusa", "Tokyo Tower", "Shibuya", "Akihabara"], "days": 3}', result: 'Day1: Asakusa→Tokyo Tower, Day2: Shibuya→Đền Meiji, Day3: Akihabara→Ginza' },
      { name: 'budget_calculator', params: '{"flight": 9500000, "hotel": 7200000, "food": 4500000, "transport": 1500000, "tickets": 2400000}', result: 'Tổng ngân sách: 25.100.000đ (còn 4.900.000đ để mua sắm)' }
    ],
    agentResponse: '✈️ Lịch trình Tokyo 3 ngày 2 đêm\n\n📅 Day1: Asakusa→Tokyo Tower\n📅 Day2: Shibuya→Đền Meiji\n📅 Day3: Akihabara→Ginza\n\n💰 Chi tiết ngân sách:\n• Vé máy bay khứ hồi: 9.500.000đ\n• Khách sạn 2 đêm: 7.200.000đ\n• Ăn uống: 4.500.000đ\n• Di chuyển: 1.500.000đ\n• Vé tham quan: 2.400.000đ\n• Tổng: 25.100.000đ (còn 4.900.000đ để mua sắm)',
    insight: 'Agent gọi 5 tool để hoàn thành kế hoạch trọn vẹn về vé máy bay, khách sạn, điểm tham quan, lộ trình, ngân sách.'
  },
  {
    id: 'shopping',
    icon: '🛒',
    name: 'Mua sắm thông minh',
    query: 'Mình muốn mua laptop khoảng 20 triệu, chủ yếu để lập trình và chơi game nhẹ, gợi ý vài model và so sánh',
    llmResponse: 'Ngân sách 20 triệu có thể mua được laptop ổn. Gợi ý Lenovo Slim Pro, Huawei MateBook, RedmiBook. Cấu hình nên có 16GB RAM, 512GB SSD.',
    thinking: 'Người dùng cần gợi ý laptop 20 triệu cho lập trình + chơi game. Mình cần: 1) Tìm model hot hiện tại 2) Lấy thông số chi tiết 3) Tra giá realtime 4) Xem review 5) So benchmark hiệu năng',
    tools: [
      { name: 'product_search', params: '{"category": "laptop", "budget": 20000000, "usage": "programming,gaming"}', result: 'Tìm thấy 6 model: Lenovo Slim Pro 16, ThinkBook 14+, Huawei MateBook 14, RedmiBook Pro 15, Honor MagicBook 14, Mechrevo Aurora Pro' },
      { name: 'specs_query', params: '{"products": ["Lenovo Slim Pro 16", "ThinkBook 14+", "Huawei MateBook 14"]}', result: 'Slim Pro 16: R7-7840HS/16G/1TB/2.5K; ThinkBook 14+: i5-13500H/16G/512G/2.8K; MateBook 14: i5-1340P/16G/512G/2K cảm ứng' },
      { name: 'price_compare', params: '{"products": ["Lenovo Slim Pro 16", "ThinkBook 14+", "Huawei MateBook 14"]}', result: 'Slim Pro 16: 19.900.000đ; ThinkBook 14+: 21.000.000đ; MateBook 14: 21.800.000đ' },
      { name: 'reviews_search', params: '{"products": ["Lenovo Slim Pro 16", "ThinkBook 14+"], "source": "shopee,lazada"}', result: 'Slim Pro 16: tỷ lệ tốt 96%, được khen về màn hình và hiệu năng; ThinkBook 14+: tỷ lệ tốt 94%, được khen về gia công' },
      { name: 'benchmark_compare', params: '{"products": ["Lenovo Slim Pro 16", "ThinkBook 14+"], "tests": ["cpu", "gpu", "battery"]}', result: 'CPU: Slim Pro 16 (R7) > ThinkBook 14+ (i5); GPU: cả hai đều là card tích hợp; Pin: ThinkBook 14+ 8h > Slim Pro 16 6.5h' }
    ],
    agentResponse: '💻 So sánh gợi ý laptop 20 triệu\n\n🥇 Lựa chọn ưu tiên: Lenovo Slim Pro 16\n• Cấu hình: R7-7840HS/16G/1TB/2.5K 120Hz\n• Giá: 19.900.000đ\n• Ưu thế: hiệu năng mạnh, màn hình đẹp, ổ lớn\n• Phù hợp: lập trình + chơi game nhẹ\n\n🥈 Phương án dự phòng: ThinkBook 14+\n• Cấu hình: i5-13500H/16G/512G/2.8K\n• Giá: 21.000.000đ\n• Ưu thế: gia công tốt, pin trâu, đầy đủ cổng\n• Phù hợp: công việc văn phòng + lập trình',
    insight: 'Agent gọi 5 tool để hoàn thành quyết định mua sắm trọn vẹn: tìm kiếm, tra cấu hình, so giá, xem review, so benchmark.'
  },
  {
    id: 'report',
    icon: '📊',
    name: 'Báo cáo nghiên cứu',
    query: 'Tạo giúp mình báo cáo phân tích ngành xe điện 2024, gồm quy mô thị trường, các tay chơi chính, xu hướng công nghệ',
    llmResponse: 'Ngành xe điện đang phát triển nhanh. Tesla, BYD là dẫn đầu. Quy mô thị trường dự kiến tăng tiếp, công nghệ pin là then chốt. Nên xem báo cáo ngành chuyên nghiệp để có số liệu chi tiết.',
    thinking: 'Người dùng cần báo cáo phân tích ngành xe điện trọn vẹn. Mình cần: 1) Tra dữ liệu thị trường mới nhất 2) Search thông tin các hãng chính 3) Lấy xu hướng công nghệ 4) Tìm chính sách 5) Sinh biểu đồ 6) Sắp xếp thành báo cáo',
    tools: [
      { name: 'market_data', params: '{"industry": "NEV", "year": 2024, "metrics": ["size", "growth", "penetration"]}', result: 'Doanh số NEV toàn cầu 2024: 17 triệu xe (+35%), Trung Quốc chiếm 60%, tỷ lệ thâm nhập: toàn cầu 18%, Trung Quốc 35%' },
      { name: 'company_search', params: '{"industry": "NEV", "ranking": "top10"}', result: 'TOP5: BYD (3.02M xe), Tesla (1.81M), Volkswagen (770K), Geely (680K), SAIC (630K)' },
      { name: 'tech_trends', params: '{"field": "NEV", "technologies": ["battery", "autonomous", "charging"]}', result: 'Pin: pin thể rắn sắp ra hàng loạt, mật độ năng lượng >400Wh/kg; Tự lái: L2+ phổ biến >50%, L4 bắt đầu thương mại; Sạc: nền tảng 800V phổ biến, 5 phút sạc 200km' },
      { name: 'policy_search', params: '{"region": "global", "topic": "NEV_policy", "year": 2024}', result: 'Trung Quốc: miễn thuế gia hạn đến 2027; EU: cấm bán xe xăng từ 2035; Mỹ: đạo luật IRA trợ cấp sản xuất nội địa' },
      { name: 'data_visualization', params: '{"type": "chart", "data": "NEV_market_share", "chart_type": "pie"}', result: 'Sinh biểu đồ tròn thị phần: BYD 35%, Tesla 21%, khác 44%' },
      { name: 'report_generator', params: '{"title": "Báo cáo phân tích ngành xe điện 2024", "sections": ["market", "players", "tech", "policy"], "format": "markdown"}', result: 'Báo cáo đã sinh: 12 trang, 6 biểu đồ, 3 bảng dữ liệu' }
    ],
    agentResponse: '📊 Báo cáo phân tích ngành xe điện 2024\n\n📈 Quy mô thị trường\n• Doanh số toàn cầu: 17 triệu xe (+35%)\n• Trung Quốc chiếm: 60%\n• Tỷ lệ thâm nhập toàn cầu: 18% (Trung Quốc 35%)\n\n🏆 Các tay chơi chính\n1. BYD: 3.02 triệu xe (35%)\n2. Tesla: 1.81 triệu xe (21%)\n3. Volkswagen: 770K xe\n\n🔋 Xu hướng công nghệ\n• Pin thể rắn mật độ năng lượng >400Wh/kg\n• L2+ phổ biến hơn 50%\n• Sạc nhanh 800V phổ biến\n\n📋 Báo cáo đã sinh: 12 trang phân tích đầy đủ',
    insight: 'Agent gọi 6 tool để hoàn thành quy trình nghiên cứu trọn vẹn: thu thập dữ liệu, phân tích, trực quan hóa và sinh báo cáo.'
  },
  {
    id: 'code-run',
    icon: '💻',
    name: 'Chạy code',
    query: 'Sinh danh sách số ngẫu nhiên 1-100, tìm các số nguyên tố trong đó, và tính giá trị trung bình',
    llmResponse: 'Mình có thể viết code nhưng không chạy thật được. Số nguyên tố là số chỉ chia hết cho 1 và chính nó, ví dụ 2, 3, 5, 7...',
    thinking: 'Người dùng cần: 1) Sinh danh sách số ngẫu nhiên 2) Lọc số nguyên tố 3) Tính trung bình. Mình cần chạy code Python trong sandbox',
    tools: [
      { name: 'python_executor', params: '{"code": "import random; nums = [random.randint(1,100) for _ in range(20)]; primes = [n for n in nums if all(n%i!=0 for i in range(2,int(n**0.5)+1)) and n>1]; print(f\"Random: {nums}\"); print(f\"Primes: {primes}\"); print(f\"Mean: {sum(nums)/len(nums):.2f}\")"}', result: 'Random: [42, 17, 89, 23, 56, 71, 34, 91, 13, 67...]\nPrimes: [17, 89, 23, 71, 13, 67, 47, 79]\nMean: 52.35' }
    ],
    agentResponse: 'Kết quả chạy:\n🎲 Sinh 20 số ngẫu nhiên: 42, 17, 89, 23, 56, 71...\n🔢 Trong đó số nguyên tố: 17, 89, 23, 71, 13, 67, 47, 79 (8 số)\n📊 Trung bình tất cả các số: 52.35',
    insight: 'Agent thực sự chạy code trong sandbox, LLM chỉ suy luận và không thể verify kết quả.'
  },
  {
    id: 'data-analysis',
    icon: '📉',
    name: 'Phân tích dữ liệu',
    query: 'Phân tích dữ liệu doanh thu quý trước của công ty mình, tìm dòng sản phẩm và khu vực tăng nhanh nhất',
    llmResponse: 'Mình không truy cập được dữ liệu nội bộ của công ty bạn. Gợi ý dùng Excel hoặc công cụ BI chuyên nghiệp để phân tích, chú ý tỷ lệ tăng theo năm và theo kỳ.',
    thinking: 'Người dùng cần phân tích dữ liệu doanh thu công ty. Mình cần: 1) Kết nối database lấy dữ liệu 2) Group theo dòng sản phẩm 3) Group theo khu vực 4) Tính tỷ lệ tăng 5) Sinh biểu đồ 6) Xuất báo cáo phân tích',
    tools: [
      { name: 'database_query', params: '{"table": "sales", "period": "Q4_2023", "fields": ["product", "region", "amount", "quantity"]}', result: 'Lấy được Q4: 15.230 bản ghi, 12 dòng sản phẩm, 8 khu vực' },
      { name: 'data_groupby', params: '{"data": "sales_q4", "group": "product", "agg": ["sum", "count", "avg"]}', result: 'Thống kê dòng sản phẩm: Điện tử 2.1M (+45%), Thời trang 1.8M (+12%), Gia dụng 1.2M (+28%)...' },
      { name: 'data_groupby', params: '{"data": "sales_q4", "group": "region", "agg": ["sum", "growth"]}', result: 'Thống kê khu vực: Miền Bắc 3.2M (+38%), Miền Nam 2.1M (+52%), Miền Trung 1.5M (+15%)...' },
      { name: 'growth_calculator', params: '{"current": "Q4_2023", "previous": "Q3_2023", "dimensions": ["product", "region"]}', result: 'Dòng sản phẩm tăng nhanh nhất: Điện tử +45%; Khu vực tăng nhanh nhất: Miền Nam +52%' },
      { name: 'chart_generator', params: '{"type": "bar", "data": "product_growth", "title": "So sánh tỷ lệ tăng dòng sản phẩm"}', result: 'Sinh biểu đồ cột: Điện tử 45%, Gia dụng 28%, Thời trang 12%' },
      { name: 'chart_generator', params: '{"type": "map", "data": "region_sales", "title": "Bản đồ nhiệt doanh thu theo khu vực"}', result: 'Sinh bản đồ nhiệt: Miền Bắc, Miền Nam là vùng giá trị cao' }
    ],
    agentResponse: '📊 Báo cáo phân tích doanh thu Q4\n\n🏆 Dòng sản phẩm tăng nhanh nhất\n1. Điện tử: +45% (2.1M USD)\n2. Gia dụng: +28% (1.2M USD)\n3. Thời trang: +12% (1.8M USD)\n\n🌍 Khu vực tăng nhanh nhất\n1. Miền Nam: +52% (2.1M USD)\n2. Miền Bắc: +38% (3.2M USD)\n3. Tây Nguyên: +22% (0.8M USD)\n\n💡 Gợi ý: tăng đầu tư cho Điện tử, mở rộng thị trường Miền Nam',
    insight: 'Agent gọi 6 tool để hoàn thành quy trình phân tích trọn vẹn: query, group, tính tỷ lệ tăng, trực quan hóa.'
  }
]

const currentScenario = ref('weather')
const isExecuting = ref(false)
const executionComplete = ref(false)
const toolExecuting = ref(-1)
const toolExecuted = ref(0)
const showThinking = ref(false)
const showTools = ref(false)
const showResponse = ref(false)
const thinkingExpanded = ref(true)
const toolsExpanded = ref(true)
const toolsSection = ref(null)
const toolRefs = ref([])

const currentScenarioData = computed(() => scenarios.find(s => s.id === currentScenario.value))

const setToolRef = (el, idx) => {
  if (el) {
    toolRefs.value[idx] = el
  }
}

const selectScenario = (id) => {
  currentScenario.value = id
  reset()
}

const startExecution = async () => {
  isExecuting.value = true
  executionComplete.value = false
  toolExecuting.value = -1
  toolExecuted.value = 0
  showThinking.value = true
  showTools.value = false
  showResponse.value = false
  thinkingExpanded.value = true
  toolsExpanded.value = true

  // Hiển thị suy nghĩ
  await wait(800)

  // Hiển thị gọi tool
  showTools.value = true
  toolsExpanded.value = true

  await nextTick()

  const tools = currentScenarioData.value.tools

  for (let i = 0; i < tools.length; i++) {
    toolExecuting.value = i

    // Cuộn đến tool đang chạy
    await nextTick()
    const toolEl = toolRefs.value[i]
    if (toolEl && toolsSection.value) {
      toolEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    await wait(1000)
    toolExecuted.value = i + 1
    toolExecuting.value = -1
    await wait(300)
  }

  // Hiển thị câu trả lời cuối
  await wait(500)
  showResponse.value = true
  isExecuting.value = false
  executionComplete.value = true
}

const reset = () => {
  isExecuting.value = false
  executionComplete.value = false
  toolExecuting.value = -1
  toolExecuted.value = 0
  showThinking.value = false
  showTools.value = false
  showResponse.value = false
}

const toggleThinking = () => {
  thinkingExpanded.value = !thinkingExpanded.value
}

const toggleTools = () => {
  toolsExpanded.value = !toolsExpanded.value
}

const wait = (ms) => new Promise(r => setTimeout(r, ms))
</script>

<style scoped>
.agent-chat-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 16px;
}

.title {
  font-size: 17px;
  font-weight: 700;
  background: linear-gradient(120deg, var(--vp-c-brand), #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

/* 场景标签 */
.scenario-tabs {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
}

.tab-btn:hover {
  background: var(--vp-c-bg-alt);
}

.tab-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

/* 聊天窗口 */
.chat-window {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 消息 */
.message {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.message.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.avatar.agent-avatar {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.bubble {
  max-width: 75%;
  padding: 12px 14px;
  border-radius: 14px;
  font-size: 13px;
  line-height: 1.5;
}

.message.user .bubble {
  background: var(--vp-c-brand);
  color: white;
  border-bottom-right-radius: 4px;
}

.message.llm .bubble {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-bottom-left-radius: 4px;
}

.message.agent .bubble {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-bottom-left-radius: 4px;
  max-width: 85%;
}

.llm-label, .agent-label {
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--vp-c-text-2);
}

.agent-label {
  color: var(--vp-c-brand);
}

.llm-content {
  color: #6b7280;
}

/* 思考过程 */
.thinking-section {
  margin-bottom: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.thinking-header, .tools-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: background 0.2s;
}

.thinking-header:hover, .tools-header:hover {
  background: var(--vp-c-bg-alt);
}

.toggle-icon {
  font-size: 10px;
  color: var(--vp-c-text-2);
}

.thinking-content {
  padding: 10px 12px;
  background: #fef3c7;
  font-size: 12px;
  color: #92400e;
}

.thought-item {
  line-height: 1.6;
}

/* 工具调用 */
.tools-section {
  margin-bottom: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.tools-list {
  padding: 10px;
  background: var(--vp-c-bg);
}

.tool-item {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.tool-item:last-child {
  margin-bottom: 0;
}

.tool-item.completed {
  border-color: #86efac;
  background: #f0fdf4;
}

.tool-item.executing {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.tool-status {
  font-size: 14px;
  flex-shrink: 0;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.tool-info {
  flex: 1;
  min-width: 0;
}

.tool-name {
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 6px;
}

.tool-params {
  display: block;
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-family: monospace;
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 6px;
}

.tool-result {
  font-size: 11px;
  color: #16a34a;
  padding: 6px 8px;
  background: #dcfce7;
  border-radius: 4px;
  white-space: pre-wrap;
}

/* 最终回复 */
.final-response {
  margin-top: 10px;
  padding: 12px;
  background: #dcfce7;
  border: 1px solid #86efac;
  border-radius: 6px;
}

.response-header {
  font-size: 11px;
  font-weight: 600;
  color: #166534;
  margin-bottom: 6px;
}

.response-content {
  font-size: 13px;
  color: #166534;
  line-height: 1.6;
  white-space: pre-wrap;
}

/* 执行按钮 */
.execute-btn {
  margin-top: 12px;
  width: 100%;
  padding: 10px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}

.execute-btn:hover {
  background: var(--vp-c-brand-dark);
}

.execute-btn.reset {
  background: #6b7280;
}

.execute-btn.reset:hover {
  background: #4b5563;
}

/* 核心区别 */
.insight-bar {
  margin-top: 16px;
  padding: 12px 16px;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
  font-size: 13px;
}

.insight-label {
  font-weight: 600;
  color: var(--vp-c-brand-dark);
}

.insight-text {
  color: var(--vp-c-text-1);
}
</style>
