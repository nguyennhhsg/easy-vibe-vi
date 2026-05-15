<template>
  <div class="deployment-overview">
    <div class="demo-header">
      <span class="title">Toàn bộ quy trình đưa dịch vụ lên production</span>
      <span class="subtitle">Từ code đến trang web mà người dùng nhìn thấy</span>
    </div>

    <div class="demo-content">
      <div class="flow-section">
        <div class="section-title">
          Giai đoạn phát triển
        </div>
        <div class="service-flow">
          <div
            class="flow-step"
            :class="{ active: currentStep >= 1 }"
            @mouseenter="(e) => showTooltip(e, 'git')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Git
            </div>
            <div class="tech-term">
              Quản lý phiên bản code
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 2 }"
            @mouseenter="(e) => showTooltip(e, 'cicd')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              CI/CD
            </div>
            <div class="tech-term">
              Pipeline tự động hoá
            </div>
          </div>
        </div>
      </div>

      <div class="flow-section">
        <div class="section-title">
          Giai đoạn build
        </div>
        <div class="service-flow">
          <div
            class="flow-step"
            :class="{ active: currentStep >= 3 }"
            @mouseenter="(e) => showTooltip(e, 'test')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Test
            </div>
            <div class="tech-term">
              Kiểm thử tự động
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 4 }"
            @mouseenter="(e) => showTooltip(e, 'build')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Build
            </div>
            <div class="tech-term">
              Biên dịch & đóng gói
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 5 }"
            @mouseenter="(e) => showTooltip(e, 'artifact')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Artifact
            </div>
            <div class="tech-term">
              Lưu trữ sản phẩm build
            </div>
          </div>
        </div>
      </div>

      <div class="flow-section">
        <div class="section-title">
          Giai đoạn triển khai
        </div>
        <div class="service-flow">
          <div
            class="flow-step"
            :class="{ active: currentStep >= 6 }"
            @mouseenter="(e) => showTooltip(e, 'server')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Server
            </div>
            <div class="tech-term">
              Môi trường máy chủ
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 7 }"
            @mouseenter="(e) => showTooltip(e, 'deploy')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Deploy
            </div>
            <div class="tech-term">
              Triển khai ứng dụng
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 8 }"
            @mouseenter="(e) => showTooltip(e, 'nginx')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Nginx
            </div>
            <div class="tech-term">
              Reverse proxy
            </div>
          </div>
        </div>
      </div>

      <div class="flow-section">
        <div class="section-title">
          Cấu hình mạng
        </div>
        <div class="service-flow">
          <div
            class="flow-step"
            :class="{ active: currentStep >= 9 }"
            @mouseenter="(e) => showTooltip(e, 'https')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              HTTPS
            </div>
            <div class="tech-term">
              Chứng chỉ SSL
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 10 }"
            @mouseenter="(e) => showTooltip(e, 'cdn')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              CDN
            </div>
            <div class="tech-term">
              Tăng tốc phân phối nội dung
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 11 }"
            @mouseenter="(e) => showTooltip(e, 'dns')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              DNS
            </div>
            <div class="tech-term">
              Phân giải tên miền
            </div>
          </div>
        </div>
      </div>

      <div class="flow-section">
        <div class="section-title">
          Giai đoạn vận hành
        </div>
        <div class="service-flow">
          <div
            class="flow-step"
            :class="{ active: currentStep >= 12 }"
            @mouseenter="(e) => showTooltip(e, 'monitor')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Monitor
            </div>
            <div class="tech-term">
              Giám sát trạng thái
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 13 }"
            @mouseenter="(e) => showTooltip(e, 'log')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Log
            </div>
            <div class="tech-term">
              Thu thập log
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 14 }"
            @mouseenter="(e) => showTooltip(e, 'alert')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Alert
            </div>
            <div class="tech-term">
              Thông báo cảnh báo
            </div>
          </div>
        </div>
      </div>

      <Teleport to="body">
        <Transition name="fade">
          <div
            v-if="tooltipVisible"
            class="tooltip-box"
            :style="tooltipStyle"
          >
            <div class="tooltip-title">
              {{ tooltipContent.title }}
            </div>
            <div
              class="tooltip-content"
              v-html="tooltipContent.content"
            />
          </div>
        </Transition>
      </Teleport>

      <div class="info-box">
        <strong>Nguyên tắc cốt lõi</strong>: Làm từng bước nhỏ → Lên MVP trước → Hoàn thiện dần
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const currentStep = ref(0)
const tooltipVisible = ref(false)
const tooltipStyle = reactive({
  top: '0px',
  left: '0px'
})

const tooltipContent = reactive({
  title: '',
  content: ''
})

const tooltipData = {
  git: {
    title: 'Git - Quản lý code',
    content: `
      <div class="tooltip-section">
        <h4>Đây là cái gì?</h4>
        <p>Hãy tưởng tượng bạn viết luận văn, mỗi lần sửa lại Ctrl+S lưu thành file mới: luanvan_v1.doc, luanvan_v2.doc, luanvan_v3.doc... như vậy bạn luôn có thể tìm lại phiên bản trước. Git làm đúng việc đó, nhưng nó chuyên quản lý code thay vì văn bản.</p>
      </div>
      <div class="tooltip-section">
        <h4>Tại sao phải dùng?</h4>
        <p>Nếu bạn dev một mình, có thể chưa thấy lợi ích. Nhưng khi làm team, 5 người cùng sửa một file, không có Git thì đúng là thảm hoạ — bạn đè code của tôi, tôi đè code của bạn, cuối cùng không ai biết bản nào mới nhất.</p>
        <p>Có Git rồi, mỗi người làm trên "branch" riêng, sửa xong mới merge vào nhau. Giống mấy người cùng sửa một căn nhà, mỗi người phụ trách một phòng, cuối cùng nghiệm thu rồi gộp lại.</p>
      </div>
      <div class="tooltip-section">
        <h4>Dùng như thế nào?</h4>
        <p>Nền tảng phổ biến nhất là GitHub, GitLab, Gitee (của Trung Quốc, tốc độ truy cập nhanh). Sau khi code xong ở máy local, dùng <code>git add .</code> để stage thay đổi, dùng <code>git commit -m "fix bug login"</code> để commit, rồi dùng <code>git push</code> để đẩy code lên cloud.</p>
        <p>Lần sau muốn xem trước đây mình sửa gì, chỉ cần <code>git log</code> là thấy đầy đủ lịch sử thay đổi.</p>
      </div>
    `
  },
  cicd: {
    title: 'CI/CD - Sức mạnh của tự động hoá',
    content: `
      <div class="tooltip-section">
        <h4>Đây là cái gì?</h4>
        <p>Bạn có thể hình dung nó như một "trợ lý robot" làm việc 24/7 không nghỉ. Trước đây, mỗi lần lên tính năng mới, bạn phải tự tay làm cả đống việc: mở máy, SSH lên server, pull code mới, cài dependency, chạy test, build, deploy... vừa mệt, vừa dễ bỏ sót bước nào đó.</p>
        <p>Có CI/CD rồi, bạn chỉ cần push code lên GitHub, robot tự động làm hết phần còn lại: pull code → cài dependency → chạy test → build → deploy, tất cả tự động, bạn rảnh tay làm việc khác.</p>
      </div>
      <div class="tooltip-section">
        <h4>Tại sao phải dùng?</h4>
        <p>Lợi ích thứ nhất là đỡ tốn công, bạn không phải làm thủ công nữa. Thứ hai là an toàn — robot không quên chạy test, không gõ nhầm lệnh vì say. Thứ ba là nhanh, việc trước kia làm tay mất nửa tiếng, robot làm trong 3 phút.</p>
      </div>
      <div class="tooltip-section">
        <h4>Dùng như thế nào?</h4>
        <p>GitHub Actions là lựa chọn đơn giản nhất, vì nó tích hợp sẵn trong GitHub, bạn chỉ cần thêm thư mục .github/workflows trong project và đặt file cấu hình vào là xong. File config khai báo rõ: trigger khi nào, làm các bước nào.</p>
        <p>File cấu hình đại khái như sau: code được push -> cài dependency -> chạy test -> build -> deploy lên server.</p>
      </div>
    `
  },
  test: {
    title: 'Test - Kiểm thử tự động',
    content: `
      <div class="tooltip-section">
        <h4>Đây là cái gì?</h4>
        <p>Bạn có thể hiểu nó là "đề thi thử trước kỳ thi". Trước khi chính thức lên production, để máy chạy qua các test case xem có bug không. Giống như làm vài bộ đề thi thử trước khi vào phòng thi, phát hiện chỗ chưa nắm vững thì bù ngay, hơn là vào phòng thi mới biết mình không làm được.</p>
      </div>
      <div class="tooltip-section">
        <h4>Tại sao phải dùng?</h4>
        <p>Test thủ công rất mệt, lại dễ bỏ sót các tình huống biên. Ví dụ bạn sửa code chức năng đăng nhập, nhìn bề ngoài thì OK, nhưng thật ra có thể đã làm hỏng tính năng "quên mật khẩu". Test thủ công dễ bỏ qua những thay đổi "vô tình" như vậy, còn để máy chạy test case thì mọi tính năng liên quan đều được kiểm tra lại.</p>
        <p>Hơn nữa test chỉ cần viết một lần, lần sau sửa code chạy lại là được, không cần bạn click click click mỗi lần.</p>
      </div>
      <div class="tooltip-section">
        <h4>Dùng như thế nào?</h4>
        <p>Frontend hay dùng Jest hoặc Vitest để viết test. Bạn cần viết test case trước, ví dụ "click nút đăng nhập, nhập đúng username/password, phải chuyển sang trang chủ". Viết xong, mỗi lần <code>npm run test</code> là tự động chạy hết các test này.</p>
        <p>Không cần ép buộc 100% coverage, cứ test các luồng nghiệp vụ chính trước đã, ví dụ user đăng ký, đăng nhập, đặt hàng, thanh toán — những path quan trọng đó.</p>
      </div>
    `
  },
  build: {
    title: 'Build - Biến code thành gói chạy được',
    content: `
      <div class="tooltip-section">
        <h4>Đây là cái gì?</h4>
        <p>Code Vue/React bạn viết, browser không hiểu được. Browser chỉ biết HTML, CSS, JavaScript thuần — những "ngôn ngữ gốc".</p>
        <p>Giống như bạn viết luận văn tiếng Việt rồi muốn đăng tạp chí quốc tế thì phải dịch sang tiếng Anh trước. Build chính là quá trình "dịch" đó — chuyển code high-level bạn viết (Vue/React) sang code mà browser hiểu được (HTML/CSS/JS).</p>
      </div>
      <div class="tooltip-section">
        <h4>Tại sao phải dùng?</h4>
        <p>Không chỉ dịch, Build còn giúp bạn tối ưu rất nhiều thứ:</p>
        <ul>
          <li><strong>Nén</strong>: Xoá hết khoảng trắng, comment trong code, đổi tên biến thành tên ngắn, file nhỏ đi nhiều, user load nhanh hơn</li>
          <li><strong>Gộp file</strong>: Bạn có thể có 10 file JS, sau khi build chỉ còn 1 file lớn, giảm số request HTTP</li>
          <li><strong>Obfuscate</strong>: Code sau khi nén con người gần như không đọc được, cũng coi là một dạng "mã hoá"</li>
          <li><strong>Cache</strong>: Tên file sẽ kèm chuỗi hash (ví dụ app.abc123.js), code đổi thì tên file đổi, browser tự download lại, file không đổi thì dùng cache</li>
        </ul>
      </div>
      <div class="tooltip-section">
        <h4>Dùng như thế nào?</h4>
        <p>Chạy <code>npm run build</code> (hoặc <code>yarn build</code>), rồi vào thư mục dist ở root project để lấy các file đã đóng gói. Đây là các file cuối cùng cần upload lên server.</p>
      </div>
    `
  },
  artifact: {
    title: 'Artifact - Lưu trữ sản phẩm build',
    content: `
      <div class="tooltip-section">
        <h4>Đây là cái gì?</h4>
        <p>Bạn có thể hiểu nó là "kho thành phẩm". File sinh ra sau Build (mấy file HTML/CSS/JS trong thư mục dist) không thể vứt đi, phải có chỗ lưu lại.</p>
        <p>Giống như mấy gói hàng đã đóng xong, không phải để ở trạm phát là xong, mà phải đưa vào kho, khi cần ship mới lấy ra.</p>
      </div>
      <div class="tooltip-section">
        <h4>Tại sao phải dùng?</h4>
        <p>Thứ nhất, mỗi lần Build lại thì lâu, lưu lại lần sau dùng ngay. Thứ hai, bạn có thể gắn tag version cho mỗi lần Build (ví dụ v1.0.0, v1.0.1), lỡ lên production có bug thì rollback một phát về version trước. Thứ ba, nếu bạn deploy nhiều server, có thể pull thống nhất từ kho, không cần mỗi server build một lần.</p>
      </div>
      <div class="tooltip-section">
        <h4>Dùng như thế nào?</h4>
        <p>Phương án đơn giản: upload thẳng sản phẩm Build lên cloud storage như Alibaba OSS hoặc AWS S3.</p>
        <p>Phương án nâng cao: dùng Docker Registry (nếu bạn xài Docker) hoặc Nexus. Mấy tool này giúp bạn quản lý các version khác nhau của artifact, còn set được quyền truy cập.</p>
      </div>
    `
  },
  server: {
    title: 'Server - Thuê một chiếc máy không bao giờ tắt',
    content: `
      <div class="tooltip-section">
        <h4>Đây là cái gì?</h4>
        <p>Là chiếc máy tính bạn thuê đặt trong datacenter chuyên dụng, chạy 24/24, mạng luôn được kết nối. Cái này chắc bạn thấy rồi — chính là thứ mà các công ty Internet hay gọi là "server".</p>
      </div>
      <div class="tooltip-section">
        <h4>Tại sao phải dùng?</h4>
        <p>Bạn không thể để máy ở nhà bật 24/24 được đâu? Chưa kể tiền điện, mạng nhà bạn cũng không ổn định, lỡ mất mạng là web không vào được. Hơn nữa máy ở nhà không có public IP, người ngoài không tìm thấy.</p>
        <p>Server đặt trong datacenter chuyên dụng, điện có nguồn dự phòng, mạng cáp quang gigabit, có người trực bảo trì, nhiệt độ độ ẩm đều được kiểm soát tốt. Bạn chỉ cần SSH từ xa lên để quản lý là được.</p>
      </div>
      <div class="tooltip-section">
        <h4>Dùng như thế nào?</h4>
        <p>Trong nước (VN) có thể dùng VNG Cloud, Viettel IDC, FPT Cloud. Trên thế giới khuyến nghị AWS, DigitalOcean (hỗ trợ thẻ Visa/Master).</p>
        <p>Cấu hình không cần cao, 1 core 2G RAM là đủ chạy project cá nhân. Nếu là sinh viên thì AWS Educate hoặc GitHub Student Pack có credit, rẻ hơn.</p>
        <p>Sau khi mua server, bạn sẽ có một địa chỉ IP (kiểu 123.45.67.89) và mật khẩu, dùng SSH client (như Termius, Xshell) login vào là quản lý được.</p>
      </div>
    `
  },
  deploy: {
    title: 'Deploy - Đưa code lên server',
    content: `
      <div class="tooltip-section">
        <h4>Đây là cái gì?</h4>
        <p>Là upload các file Build local lên server, rồi khởi động dịch vụ để website chạy.</p>
        <p>Giống bạn mở nhà hàng, bếp đã chuẩn bị xong (code đã viết xong và Build xong), giờ phải bưng món ra bàn (deploy lên server) thì khách mới ăn được.</p>
      </div>
      <div class="tooltip-section">
        <h4>Tại sao phải dùng?</h4>
        <p>Code ở máy local của bạn, chỉ mình bạn truy cập được. Muốn cả thế giới truy cập, bắt buộc phải deploy lên server.</p>
      </div>
      <div class="tooltip-section">
        <h4>Dùng như thế nào?</h4>
        <p><strong>Cách đơn giản nhất</strong>: dùng FTP tool (như FileZilla) upload file thủ công lên server.</p>
        <p><strong>Cách khuyến nghị</strong>: deploy bằng Docker. Bạn cần cài Docker trên server, viết một Dockerfile (giống công thức nấu ăn, mô tả cách chạy ứng dụng của bạn), cuối cùng <code>docker build</code> + <code>docker run</code> là xong.</p>
        <p>Lợi ích của Docker là "build một lần, chạy được mọi nơi" — local chạy được thì lên server chắc chắn chạy được, không có chuyện "máy em chạy được mà".</p>
      </div>
    `
  },
  nginx: {
    title: 'Nginx - Nhân viên đứng ở cửa',
    content: `
      <div class="tooltip-section">
        <h4>Đây là cái gì?</h4>
        <p>Nginx giống như lễ tân đứng cửa nhà hàng. User đến, gặp Nginx trước, Nginx mới phân user về các "đầu bếp" (ứng dụng của bạn) khác nhau tuỳ tình huống.</p>
        <p>Nó đứng cửa server, gánh giúp ứng dụng của bạn rất nhiều việc vất vả: tiếp nhận đồng thời nhiều user, xử lý file tĩnh (image/CSS/JS), cache response, v.v.</p>
      </div>
      <div class="tooltip-section">
        <h4>Tại sao phải dùng?</h4>
        <p>Nếu không có Nginx, để ứng dụng đối mặt trực tiếp với user, sẽ có nhiều vấn đề:</p>
        <ul>
          <li>Một ứng dụng chỉ chạy được một port, user dồn hết vào một chỗ</li>
          <li>Xử lý file tĩnh chậm, làm chậm cả business logic</li>
          <li>Không có load balancing, một server không gánh nổi</li>
        </ul>
        <p>Nginx ra đời để giải quyết các vấn đề này, nó có thể lắng nghe port 80 (port mặc định của HTTP), rồi forward request về port ứng dụng của bạn (ví dụ 3000).</p>
      </div>
      <div class="tooltip-section">
        <h4>Dùng như thế nào?</h4>
        <p>File cấu hình Nginx nhìn có vẻ phức tạp, nhưng cốt lõi chỉ vài dòng:</p>
        <pre>server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
    }

    location /static/ {
        alias /var/www/static/;
    }
}</pre>
        <p>Ý là: lắng nghe port 80, tên miền là yourdomain.com, user truy cập path / thì forward về ứng dụng local port 3000, truy cập /static/ thì trả thẳng file tĩnh.</p>
      </div>
    `
  },
  https: {
    title: 'HTTPS - Lắp ổ khoá cho website',
    content: `
      <div class="tooltip-section">
        <h4>Đây là cái gì?</h4>
        <p>HTTPS chính là HTTP + SSL/TLS, tương đương phủ một lớp mã hoá lên HTTP. Nói đơn giản là lắp một "ổ khoá" cho website của bạn, dữ liệu truyền giữa user và server đều được mã hoá, người thứ ba có chặn được cũng không đọc được.</p>
      </div>
      <div class="tooltip-section">
        <h4>Tại sao phải dùng?</h4>
        <p>Không có HTTPS thì mật khẩu user nhập vào website, thông tin cá nhân điền vào, đều truyền dạng plaintext, ai ở giữa cũng đọc lén được. Browser bây giờ rất thông minh, sẽ hiển thị "Không an toàn" với các website không có HTTPS, user nhìn vào là không dám dùng.</p>
        <p>Hơn nữa các công cụ tìm kiếm như Google cũng ưu tiên index website HTTPS, ảnh hưởng SEO.</p>
      </div>
      <div class="tooltip-section">
        <h4>Dùng như thế nào?</h4>
        <p><strong>Cách tiết kiệm nhất</strong>: dùng Let's Encrypt, hoàn toàn miễn phí. Kết hợp công cụ Certbot có thể tự động đăng ký và gia hạn, ba bốn năm không cần đụng tới.</p>
        <p><strong>Cách đơn giản nhất</strong>: dùng Cloudflare, nó cung cấp HTTPS miễn phí, lại ở mức DNS, bạn chỉ cần chuyển DNS tên miền sang Cloudflare, chứng chỉ tự lo.</p>
        <p>Sau khi cài chứng chỉ, trong config Nginx thêm dòng <code>ssl_certificate</code> trỏ vào file chứng chỉ, thêm <code>listen 443 ssl</code> là xong.</p>
      </div>
    `
  },
  cdn: {
    title: 'CDN - Cho user truy cập từ gần nhất',
    content: `
      <div class="tooltip-section">
        <h4>Đây là cái gì?</h4>
        <p>CDN là "Content Delivery Network" (mạng phân phối nội dung). Hãy tưởng tượng bạn mở chi nhánh ở khắp Việt Nam, thậm chí toàn cầu, user truy cập sẽ tự động được dẫn về cửa hàng gần nhất để lấy hàng, thay vì chạy về trụ sở chính.</p>
        <p>Cụ thể, CDN deploy "edge node" ở khắp nơi, cache các tài nguyên tĩnh của website (image, CSS, JS) lên các node đó. Khi user truy cập, sẽ tự động kết nối tới node gần nhất để lấy tài nguyên, đương nhiên tốc độ nhanh.</p>
      </div>
      <div class="tooltip-section">
        <h4>Tại sao phải dùng?</h4>
        <p>Không có CDN, user toàn cầu đều phải download tài nguyên từ một server duy nhất của bạn. User ở Mỹ phải vượt cả Thái Bình Dương để load, chậm chết. Hơn nữa băng thông server có hạn, đông user là nghẽn.</p>
        <p>Có CDN, user Mỹ lấy tài nguyên từ node Mỹ, user Nhật lấy từ node Nhật, không ai phải vượt đại dương nữa, tốc độ bay bổng, server cũng đỡ áp lực.</p>
      </div>
      <div class="tooltip-section">
        <h4>Dùng như thế nào?</h4>
        <p><strong>Cách đơn giản nhất</strong>: dùng Cloudflare, đăng ký tài khoản, đổi DNS tên miền sang địa chỉ DNS nó cấp là xong. Toàn bộ không cần cấu hình server.</p>
        <p>Trong nước (VN) có thể dùng CDN của Viettel, BizFly, hoặc các CDN quốc tế như Cloudflare, AWS CloudFront, đều ổn, chỉ cần đổi DNS tên miền sang đó, rồi vào dashboard CDN thêm cấu hình tên miền.</p>
        <p>Logic cấu hình chung: tên miền CDN → trỏ về IP server của bạn → user truy cập, CDN sẽ origin về server bạn để lấy tài nguyên rồi cache lại.</p>
      </div>
    `
  },
  dns: {
    title: 'DNS - Vai trò của tên miền',
    content: `
      <div class="tooltip-section">
        <h4>Đây là cái gì?</h4>
        <p>DNS là "Domain Name System" (hệ thống tên miền), tương đương cuốn "danh bạ điện thoại". User nhập tên miền dễ nhớ (như example.com), nhưng máy chỉ hiểu IP (như 192.168.1.1), DNS chính là người dịch tên miền thành IP.</p>
      </div>
      <div class="tooltip-section">
        <h4>Tại sao phải dùng?</h4>
        <p>Bạn không thể bảo user "vui lòng truy cập IP 123.45.67.89" đúng không? Vừa khó nhớ vừa không chuyên nghiệp. Mua một tên miền (như myproject.com), user gõ tên miền là vào được, đó mới là tư thế đúng.</p>
      </div>
      <div class="tooltip-section">
        <h4>Dùng như thế nào?</h4>
        <p>Bước 1: mua tên miền. Trong nước có Mắt Bão, PA Vietnam, Tenten; quốc tế có GoDaddy, Namecheap. Mỗi năm vài trăm nghìn.</p>
        <p>Bước 2: cấu hình DNS record. Phổ biến nhất là "A record" — trỏ tên miền về IP server.</p>
        <p>Ví dụ cấu hình: trong dashboard DNS thêm một record:</p>
        <ul>
          <li>Loại record: A</li>
          <li>Host record: @ (hoặc www)</li>
          <li>Giá trị record: IP server của bạn (như 123.45.67.89)</li>
        </ul>
        <p>Bước 3: chờ propagate. Sau khi sửa DNS cần vài phút đến 24 giờ để có hiệu lực toàn cầu, có thể dùng lệnh <code>ping tên-miền-của-bạn</code> để kiểm tra.</p>
      </div>
    `
  },
  monitor: {
    title: 'Monitor - Giám sát sức khoẻ website',
    content: `
      <div class="tooltip-section">
        <h4>Đây là cái gì?</h4>
        <p>Monitoring là lắp một "máy đo sức khoẻ" cho server, theo dõi realtime các chỉ số: CPU usage, memory, dung lượng đĩa, traffic mạng, response time của ứng dụng, tỉ lệ lỗi, v.v.</p>
      </div>
      <div class="tooltip-section">
        <h4>Tại sao phải dùng?</h4>
        <p>Server không biết nói, nó khó chịu cũng không chủ động báo bạn. Đợi user gọi điện bảo "website không vào được" thì bạn mới đi xử lý, thì lúc đó đã muộn.</p>
        <p>Có monitoring, bạn có thể set ngưỡng cảnh báo: CPU vượt 80% báo tôi, memory vượt 90% báo tôi, response time vượt 3 giây báo tôi. Nhờ vậy bạn có thể phát hiện và xử lý trước khi vấn đề trở nên nghiêm trọng.</p>
      </div>
      <div class="tooltip-section">
        <h4>Dùng như thế nào?</h4>
        <p><strong>Cách đơn giản nhất</strong>: dùng Uptime Robot. Đăng ký tài khoản, thêm URL website, nó sẽ check mỗi 5 phút xem website có bình thường không. Bản miễn phí giám sát được 50 website, không hỗ trợ Zalo/email push nhưng có SMS. Website chết sẽ gửi email báo bạn.</p>
        <p><strong>Cách nâng cao</strong>: dùng monitoring của AWS CloudWatch, GCP Monitoring (nếu server bạn mua ở đây, có sẵn).</p>
        <p><strong>Cách chuyên nghiệp</strong>: dùng Prometheus + Grafana, giám sát đủ loại chỉ số và vẽ biểu đồ đẹp, cấu hình hơi phức tạp một chút.</p>
      </div>
    `
  },
  log: {
    title: 'Log - Có sự cố tra ở đâu',
    content: `
      <div class="tooltip-section">
        <h4>Đây là cái gì?</h4>
        <p>Log là cuốn "nhật ký" của ứng dụng khi chạy, ghi lại đủ thông tin trong quá trình chương trình hoạt động: ai vào lúc nào, gọi endpoint nào, trả về gì, có lỗi không, lỗi gì...</p>
      </div>
      <div class="tooltip-section">
        <h4>Tại sao phải dùng?</h4>
        <p>Khi có sự cố, log là manh mối phá án. Không có log, bạn chỉ có thể đoán mò. Có log, bạn nhìn rõ ràng: user truy cập tính năng nào lúc mấy giờ, chương trình báo lỗi ở dòng nào, error message là gì.</p>
        <p>Giống hộp đen máy bay — lúc bay bình thường không ai để ý, nhưng tai nạn xảy ra thì phải nhờ nó dựng lại sự thật.</p>
      </div>
      <div class="tooltip-section">
        <h4>Dùng như thế nào?</h4>
        <p><strong>Cách đơn giản nhất</strong>: ghi log ra file trên server (logs/access.log). Khi có vấn đề, SSH lên server, dùng <code>grep "keyword" logs/app.log</code> để tìm log liên quan.</p>
        <p><strong>Cách nâng cao</strong>: dùng công cụ chuyên dụng để thu thập log, ví dụ Loki (miễn phí), ELK (Elasticsearch + Logstash + Kibana, mạnh nhưng hơi phức tạp), hoặc dịch vụ log của cloud provider.</p>
        <p>Khuyến nghị log nên có tối thiểu các thông tin: timestamp, request ID (traceId), loại thao tác, tham số quan trọng, kết quả trả về, error stack.</p>
      </div>
    `
  },
  alert: {
    title: 'Alert - Có vấn đề là tự báo bạn',
    content: `
      <div class="tooltip-section">
        <h4>Đây là cái gì?</h4>
        <p>Alert là khi hệ thống monitoring phát hiện vấn đề (như server chết, CPU bùng nổ, tỉ lệ lỗi tăng vọt), tự động gửi tin nhắn báo bạn. Bạn không cần ngồi canh dashboard, nó sẽ tự gọi bạn xử lý.</p>
      </div>
      <div class="tooltip-section">
        <h4>Tại sao phải dùng?</h4>
        <p>Bạn không thể ngồi canh dashboard 24/24 đúng không? Mà có ngồi được thì lúc bạn ngủ thì sao? Hệ thống alert giống đầu báo khói — cháy là tự rú, không cần bạn ngồi nhìn xem có khói không.</p>
      </div>
      <div class="tooltip-section">
        <h4>Dùng như thế nào?</h4>
        <p>Cách phổ biến nhất là tạo một group Telegram hay Slack, rồi add bot vào. Lấy được Webhook URL của bot, cấu hình vào tool monitoring là xong.</p>
        <p>Đề xuất thứ tự ưu tiên kênh alert:</p>
        <ul>
          <li><strong>Khẩn cấp (website chết hẳn)</strong>: gửi SMS + gọi điện, phải biết ngay</li>
          <li><strong>Nghiêm trọng (tỉ lệ lỗi tăng vọt)</strong>: gửi Slack/Telegram, thấy là xử lý</li>
          <li><strong>Bình thường (CPU hơi cao)</strong>: tổng hợp gửi email, ngày xem một lần là được</li>
        </ul>
        <p>Đừng cái gì cũng SMS làm phiền bản thân, set đúng mức alert rất quan trọng.</p>
      </div>
    `
  }
}

function showTooltip(event, key) {
  const data = tooltipData[key]
  if (!data) return

  tooltipContent.title = data.title
  tooltipContent.content = data.content

  const rect = event.target.getBoundingClientRect()
  const tooltipWidth = 480
  const tooltipMaxHeight = 550
  const padding = 16

  let left = rect.right + padding
  let top = rect.top

  if (left + tooltipWidth > window.innerWidth) {
    left = rect.left - tooltipWidth - padding
  }

  if (left < 0) {
    left = padding
  }

  if (top + tooltipMaxHeight > window.innerHeight) {
    top = window.innerHeight - tooltipMaxHeight - padding
  }

  if (top < 0) {
    top = padding
  }

  tooltipStyle.top = `${top}px`
  tooltipStyle.left = `${left}px`
  tooltipVisible.value = true
}

function hideTooltip() {
  tooltipVisible.value = false
}
</script>

<style scoped>
.deployment-overview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  position: relative;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header .title {
  font-weight: bold;
  font-size: 1.1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.demo-content {
  margin-bottom: 0.5rem;
}

.flow-section {
  margin-bottom: 1rem;
}

.flow-section:last-of-type {
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
  padding-left: 0.25rem;
}

.service-flow {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  min-width: 80px;
  cursor: pointer;
}

.flow-step:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.flow-step.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.step-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  text-align: center;
  white-space: nowrap;
}

.tech-term {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  text-align: center;
  white-space: normal;
  line-height: 1.2;
}

.flow-arrow {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
}

.info-box strong {
  color: var(--vp-c-text-1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style>
.tooltip-box {
  position: fixed;
  max-width: 480px;
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  z-index: 9999;
}

.tooltip-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.tooltip-content {
  max-height: 500px;

}

.tooltip-section {
  margin-bottom: 1.25rem;
}

.tooltip-section:last-child {
  margin-bottom: 0;
}

.tooltip-section h4 {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.tooltip-section p {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 0.5rem;
}

.tooltip-section ul {
  margin: 0.5rem 0;
  padding-left: 1.25rem;
}

.tooltip-section li {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.35rem;
}

.tooltip-section pre {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  overflow-x: auto;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
  margin: 0.5rem 0;
}

.tooltip-section code {
  background: var(--vp-c-bg-soft);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
}

.tooltip-section strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}
</style>
