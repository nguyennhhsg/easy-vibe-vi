<script setup>
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'

const categories = [
  {
    id: 'computer-fundamentals',
    name: 'Nền tảng máy tính',
    icon: '💻',
    color: '#10b981',
    bgGradient: 'linear-gradient(135deg, #10b98115, #10b98108)',
    description: 'Hiểu nguyên lý hoạt động ở tầng thấp nhất của máy tính',
    whyLearn: 'Đây là nền tảng của mọi kỹ thuật phần mềm. Nắm rõ cách máy tính thực thi code, quản lý bộ nhớ, xử lý request sẽ giúp bạn viết code hiệu quả hơn.',
    learningGoals: ['Nguyên lý CPU và bộ nhớ', 'Cốt lõi hệ điều hành', 'Cơ sở truyền thông mạng', 'Cấu trúc dữ liệu và thuật toán'],
    articles: [
      { title: 'Phát triển full-stack với Vibe Coding', path: '/vi-vn/appendix/1-computer-fundamentals/vibe-coding-fullstack', description: 'Toàn cảnh phát triển full-stack trong kỷ nguyên AI hỗ trợ', detail: 'Từ frontend đến backend, từ database đến triển khai, hệ thống hóa toàn bộ cây kỹ năng mà kỹ sư full-stack cần làm chủ trong kỷ nguyên AI hỗ trợ, giúp bạn có cái nhìn tổng thể.' },
      { title: 'Từ transistor đến CPU', path: '/vi-vn/appendix/1-computer-fundamentals/transistor-to-cpu', description: 'Hiểu logic phần cứng ở tầng thấp nhất của máy tính', detail: 'Bắt đầu từ công tắc transistor cơ bản nhất, từng bước xây dựng cổng logic, bộ cộng, thanh ghi, cuối cùng hiểu cách CPU thực thi từng dòng code bạn viết.' },
      { title: 'Hệ điều hành', path: '/vi-vn/appendix/1-computer-fundamentals/operating-systems', description: 'Quản lý tiến trình, bộ nhớ, hệ thống file', detail: 'Hệ điều hành là cầu nối giữa phần cứng và phần mềm. Tìm hiểu nguyên lý lập lịch tiến trình, bộ nhớ ảo, hệ thống file để hiểu môi trường tầng thấp nơi chương trình chạy.' },
      { title: 'Cấu trúc dữ liệu', path: '/vi-vn/appendix/1-computer-fundamentals/data-structures', description: 'Cách tổ chức mảng, danh sách liên kết, cây, đồ thị', detail: 'Cấu trúc dữ liệu quyết định cách chương trình lưu trữ và truy xuất dữ liệu hiệu quả. Nắm vững mảng, danh sách liên kết, stack, queue, cây, đồ thị và bối cảnh áp dụng của chúng.' },
      { title: 'Nhập môn tư duy thuật toán', path: '/vi-vn/appendix/1-computer-fundamentals/algorithm-thinking', description: 'Khung tư duy sắp xếp, tìm kiếm, đệ quy', detail: 'Thuật toán là cách tư duy giải quyết vấn đề. Qua các bài toán kinh điển như sắp xếp, tìm kiếm, đệ quy, quy hoạch động, rèn luyện khả năng phân tích và phân rã vấn đề phức tạp.' },
      { title: 'Bản đồ ngôn ngữ lập trình', path: '/vi-vn/appendix/1-computer-fundamentals/programming-languages', description: 'Tiến hóa từ assembly đến ngôn ngữ cấp cao', detail: 'Từ mã máy đến assembly, từ C đến Python, tìm hiểu hành trình tiến hóa, cách phân loại cùng triết lý thiết kế và lĩnh vực áp dụng của các ngôn ngữ lập trình.' },
      { title: 'Cơ sở mạng máy tính', path: '/vi-vn/appendix/1-computer-fundamentals/computer-networks', description: 'Nguyên lý truyền thông từ dây mạng đến Internet', detail: 'Từ tầng vật lý đến tầng ứng dụng, hiểu stack giao thức TCP/IP, phân giải DNS, truyền thông HTTP và các cơ sở mạng khác để biết hai máy tính trò chuyện xuyên ngàn dặm như thế nào.' }
    ]
  },
  {
    id: 'development-tools',
    name: 'Công cụ phát triển',
    icon: '🔧',
    color: '#3b82f6',
    bgGradient: 'linear-gradient(135deg, #3b82f615, #3b82f608)',
    description: 'Sử dụng thành thạo command line, Git, IDE và các công cụ khác',
    whyLearn: 'Công cụ là vũ khí của developer. Sử dụng công cụ hiệu quả sẽ giúp bạn làm việc với hiệu suất gấp đôi, giảm lao động lặp lại.',
    learningGoals: ['Sử dụng IDE hiệu quả', 'Quản lý phiên bản Git', 'Thao tác command line', 'Debug và xử lý sự cố'],
    articles: [
      { title: 'Cơ bản về IDE', path: '/vi-vn/appendix/2-development-tools/ide-basics', description: 'Mẹo sử dụng VS Code, Cursor, Trae', detail: 'So sánh tính năng cốt lõi của các IDE phổ biến, nắm vững phím tắt, hệ sinh thái plugin, code snippet và các mẹo tăng hiệu suất để biến editor thành vũ khí thuận tay nhất.' },
      { title: 'Command line và Shell', path: '/vi-vn/appendix/2-development-tools/command-line-shell', description: 'Thao tác terminal và tự động hóa script', detail: 'Từ lệnh cơ bản đến viết script Shell, học cách dùng command line để thao tác file, quản lý tiến trình, tự động hóa tác vụ lặp lại, tạm biệt sự phụ thuộc vào chuột.' },
      { title: 'Quản lý phiên bản Git', path: '/vi-vn/appendix/2-development-tools/git-version-control', description: 'Quản lý phiên bản và cộng tác nhóm', detail: 'Từ init đến rebase, nắm vững mô hình branch, chiến lược merge, giải quyết xung đột của Git, hiểu workflow Git trong cộng tác nhóm.' },
      { title: 'Biến môi trường và PATH', path: '/vi-vn/appendix/2-development-tools/environment-path', description: 'Cấu hình môi trường hệ thống và xử lý sự cố', detail: 'Hiểu cơ chế tra cứu PATH, phạm vi của biến môi trường, học cách xử lý các vấn đề phổ biến như "không tìm thấy lệnh", "sai phiên bản" trong môi trường phát triển.' },
      { title: 'Trình quản lý gói', path: '/vi-vn/appendix/2-development-tools/package-managers', description: 'Quản lý dependency với npm, pip, cargo', detail: 'Tìm hiểu cách trình quản lý gói giải quyết vấn đề dependency hell, nắm vững cách sử dụng npm, pip, cargo và ý nghĩa của file lock.' },
      { title: 'Nghệ thuật debug', path: '/vi-vn/appendix/2-development-tools/debugging-art/', description: 'Đặt breakpoint và xác định sự cố', detail: 'Từ console.log đến debug breakpoint, nắm vững phương pháp luận xác định vấn đề có hệ thống, học cách dùng DevTools và phân tích log để tìm nguyên nhân gốc của bug nhanh chóng.' }
    ]
  },
  {
    id: 'browser-frontend',
    name: 'Trình duyệt và Frontend',
    icon: '🌍',
    color: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #f59e0b15, #f59e0b08)',
    description: 'Nắm vững nguyên lý trình duyệt và kỹ thuật phát triển frontend',
    whyLearn: 'Trình duyệt là cổng giao tiếp giữa người dùng và phần mềm. Hiểu cách trình duyệt render trang sẽ giúp bạn xây dựng ứng dụng Web mượt mà hơn.',
    learningGoals: ['Nguyên lý render trình duyệt', 'JavaScript cốt lõi', 'So sánh framework frontend', 'Kỹ thuật hóa frontend'],
    articles: [
      { title: 'JavaScript chuyên sâu', path: '/vi-vn/appendix/3-browser-and-frontend/javascript-deep-dive', description: 'Khái niệm cốt lõi: closure, prototype, bất đồng bộ', detail: 'Hiểu sâu cơ chế closure, chuỗi kế thừa prototype, event loop và mô hình bất đồng bộ Promise của JavaScript, củng cố nền tảng ngôn ngữ trong phát triển frontend.' },
      { title: 'TypeScript', path: '/vi-vn/appendix/3-browser-and-frontend/typescript', description: 'Type safety và định nghĩa interface', detail: 'Học cách dùng hệ thống kiểu để bắt lỗi tại thời điểm biên dịch, nắm vững interface, generic, type inference và các tính năng cốt lõi khác để viết code frontend mạnh mẽ hơn.' },
      { title: 'Trình duyệt là một hệ điều hành', path: '/vi-vn/appendix/3-browser-and-frontend/browser-as-os', description: 'Mô hình tiến trình và quản lý tài nguyên', detail: 'Trình duyệt hiện đại có kiến trúc đa tiến trình, cô lập sandbox, lập lịch tác vụ ở cấp độ hệ điều hành. Hiểu các cơ chế này mới có thể viết ứng dụng Web hiệu năng cao.' },
      { title: 'Pipeline render trình duyệt', path: '/vi-vn/appendix/3-browser-and-frontend/browser-as-os-rendering', description: 'DOM, CSSOM, layout và paint', detail: 'Từ phân tích HTML đến hiển thị pixel, mổ xẻ toàn bộ từng giai đoạn của pipeline render trình duyệt, hiểu tác động hiệu năng của reflow và repaint.' },
      { title: 'So sánh framework frontend', path: '/vi-vn/appendix/3-browser-and-frontend/frontend-frameworks', description: 'React, Vue, Svelte, Angular', detail: 'So sánh ngang triết lý thiết kế, cơ chế reactive, hệ sinh thái và bối cảnh áp dụng của các framework frontend phổ biến, giúp bạn đưa ra lựa chọn công nghệ hợp lý.' },
      { title: 'Kỹ thuật hóa frontend', path: '/vi-vn/appendix/3-browser-and-frontend/frontend-engineering', description: 'Công cụ build và modular hóa', detail: 'Từ Webpack đến Vite, hiểu module bundling, code splitting, Tree Shaking và các thực hành kỹ thuật hóa khác, dựng pipeline phát triển frontend hiệu quả.' }
    ]
  },
  {
    id: 'server-backend',
    name: 'Server và Backend',
    icon: '⚙️',
    color: '#8b5cf6',
    bgGradient: 'linear-gradient(135deg, #8b5cf615, #8b5cf608)',
    description: 'Xây dựng dịch vụ backend và API đáng tin cậy',
    whyLearn: 'Backend là hệ thần kinh trung ương của ứng dụng. Học cách thiết kế API và xử lý dữ liệu sẽ giúp bạn tự mình hoàn thành phát triển full-stack.',
    learningGoals: ['Giao thức HTTP', 'Nguyên tắc thiết kế API', 'Xác thực và phân quyền', 'Cache và message queue'],
    articles: [
      { title: 'So sánh ngôn ngữ backend', path: '/vi-vn/appendix/4-server-and-backend/backend-languages', description: 'Lựa chọn backend: Go, Node.js, Python', detail: 'So sánh các ngôn ngữ backend phổ biến từ góc độ hiệu năng, hệ sinh thái, hiệu suất phát triển để giúp bạn chọn stack công nghệ phù hợp nhất theo nhu cầu dự án.' },
      { title: 'Giao thức HTTP', path: '/vi-vn/appendix/4-server-and-backend/http-protocol', description: 'Request, response và status code', detail: 'Hiểu sâu các phương thức HTTP, status code, header field, Cookie và cơ chế cache. Đây là cơ sở truyền thông của mọi phát triển Web.' },
      { title: 'Triết lý thiết kế API', path: '/vi-vn/appendix/4-server-and-backend/api-design', description: 'Thiết kế RESTful và GraphQL', detail: 'So sánh triết lý thiết kế và bối cảnh áp dụng của ba phong cách API: REST, GraphQL, gRPC; học cách thiết kế interface rõ ràng, nhất quán, dễ dùng.' },
      { title: 'Bản chất của Web framework', path: '/vi-vn/appendix/4-server-and-backend/web-frameworks', description: 'Routing, middleware, template engine', detail: 'Bóc tách lớp vỏ ngoài của framework, hiểu các cơ chế cốt lõi như routing matching, middleware pipeline, request context; biết cái gì và cũng biết tại sao.' },
      { title: 'Xác thực và phân quyền', path: '/vi-vn/appendix/4-server-and-backend/auth-authorization', description: 'JWT, OAuth và kiểm soát quyền', detail: 'Từ Session đến JWT, từ đăng nhập bằng mật khẩu đến phân quyền OAuth bên thứ ba, nắm vững giải pháp toàn diện về xác thực danh tính người dùng và kiểm soát quyền.' },
      { title: 'Chiến lược cache', path: '/vi-vn/appendix/4-server-and-backend/caching', description: 'Cache Redis và CDN', detail: 'Hiểu kiến trúc phân tầng của browser cache, CDN cache, Redis application cache; học cách dùng chiến lược cache để tăng tốc thời gian phản hồi hệ thống đáng kể.' },
      { title: 'Message queue', path: '/vi-vn/appendix/4-server-and-backend/message-queues', description: 'Ứng dụng RabbitMQ, Kafka', detail: 'Tìm hiểu cách message queue thực hiện decoupling dịch vụ, peak shaving và xử lý bất đồng bộ; so sánh khác biệt kiến trúc và bối cảnh áp dụng giữa RabbitMQ và Kafka.' }
    ]
  },
  {
    id: 'data',
    name: 'Dữ liệu',
    icon: '📊',
    color: '#ec4899',
    bgGradient: 'linear-gradient(135deg, #ec489915, #ec489908)',
    description: 'Làm chủ kỹ năng database và phân tích dữ liệu',
    whyLearn: 'Dữ liệu là tài sản cốt lõi của ứng dụng hiện đại. Học cách lưu trữ, truy vấn, phân tích dữ liệu sẽ giúp bạn ra quyết định dựa trên dữ liệu.',
    learningGoals: ['Truy vấn SQL', 'Nguyên lý database', 'Thiết kế mô hình dữ liệu', 'Cơ sở phân tích dữ liệu'],
    articles: [
      { title: 'SQL', path: '/vi-vn/appendix/5-data/sql', description: 'Truy vấn, aggregation và transaction', detail: 'Từ SELECT đến subquery, từ JOIN đến điều khiển transaction, học có hệ thống ngôn ngữ SQL, nắm vững năng lực cốt lõi để đối thoại với database.' },
      { title: 'Nguyên lý database', path: '/vi-vn/appendix/5-data/database-fundamentals', description: 'Index, transaction và isolation level', detail: 'Đi sâu vào cấu trúc index B+ tree, đặc tính ACID của transaction, kiểm soát đồng thời MVCC; hiểu cách database engine đảm bảo dữ liệu chính xác và hiệu quả.' },
      { title: 'Toàn cảnh mô hình dữ liệu', path: '/vi-vn/appendix/5-data/data-models', description: 'Quan hệ vs NoSQL vs NewSQL', detail: 'So sánh triết lý thiết kế của các mô hình dữ liệu khác nhau: relational, document, graph, time-series; học cách chọn giải pháp lưu trữ phù hợp theo bối cảnh nghiệp vụ.' },
      { title: 'Cơ sở phân tích dữ liệu', path: '/vi-vn/appendix/5-data/data-analysis', description: 'Excel, SQL và trực quan hóa BI', detail: 'Từ thu thập dữ liệu đến xây dựng hệ thống chỉ số, nắm vững funnel analysis, retention analysis và các phương pháp thường dùng; học cách dùng dữ liệu để dẫn dắt quyết định sản phẩm và nghiệp vụ.' }
    ]
  },
  {
    id: 'architecture',
    name: 'Thiết kế kiến trúc',
    icon: '🏗️',
    color: '#14b8a6',
    bgGradient: 'linear-gradient(135deg, #14b8a615, #14b8a608)',
    description: 'Học thiết kế hệ thống và các mẫu kiến trúc',
    whyLearn: 'Kiến trúc quyết định tương lai của hệ thống. Học cách thiết kế hệ thống từ góc nhìn vĩ mô sẽ giúp bạn xây dựng ứng dụng lớn có thể mở rộng.',
    learningGoals: ['Kiến trúc microservice', 'Hệ thống phân tán', 'Thiết kế high availability', 'Phương pháp luận thiết kế hệ thống'],
    articles: [
      { title: 'Từ monolith đến microservice', path: '/vi-vn/appendix/6-architecture-and-system-design/monolith-to-microservices', description: 'Tách dịch vụ và tiến hóa kiến trúc', detail: 'Hiểu các điểm nghẽn của kiến trúc monolith, học khi nào tách và tách microservice ra sao, cùng các thách thức mới sau khi tách như service discovery, data consistency.' },
      { title: 'Hệ thống phân tán', path: '/vi-vn/appendix/6-architecture-and-system-design/distributed-systems', description: 'Định lý CAP và tính nhất quán', detail: 'Đi sâu vào định lý CAP, distributed transaction, các giao thức nhất quán (Paxos/Raft); hiểu sự đánh đổi giữa nhất quán dữ liệu và tính khả dụng trong môi trường phân tán.' },
      { title: 'High availability và disaster recovery', path: '/vi-vn/appendix/6-architecture-and-system-design/high-availability', description: 'Load balancing và failover', detail: 'Học chiến lược load balancing, chuyển đổi master-slave, multi-active đa địa điểm, circuit breaker và các mẫu thiết kế high availability để hệ thống vẫn ổn định khi gặp sự cố.' },
      { title: 'Phương pháp luận thiết kế hệ thống', path: '/vi-vn/appendix/6-architecture-and-system-design/system-design-methodology', description: 'Lộ trình tư duy từ yêu cầu đến giải pháp', detail: 'Nắm vững khung tư duy trong phỏng vấn và thực chiến thiết kế hệ thống: phân tích yêu cầu, ước lượng dung lượng, thiết kế module cốt lõi, nhận diện điểm nghẽn và đánh đổi kiến trúc.' }
    ]
  },
  {
    id: 'infrastructure',
    name: 'Hạ tầng',
    icon: '☁️',
    color: '#06b6d4',
    bgGradient: 'linear-gradient(135deg, #06b6d415, #06b6d408)',
    description: 'Làm chủ kỹ năng cloud native và vận hành',
    whyLearn: 'Hạ tầng là nền tảng của ứng dụng. Học cách container hóa, triển khai tự động sẽ giúp bạn vận hành ứng dụng hiệu quả.',
    learningGoals: ['Cơ bản về Linux', 'Container Docker', 'Kubernetes', 'Tự động hóa CI/CD'],
    articles: [
      { title: 'Cơ bản về Linux', path: '/vi-vn/appendix/7-infrastructure-and-operations/linux-basics', description: 'Hệ thống file và quản lý tiến trình', detail: 'Nắm vững quyền file Linux, quản lý tiến trình, giám sát hệ thống và các thao tác cốt lõi; đây là cơ sở thiết yếu cho vận hành server và triển khai container.' },
      { title: 'Container hóa với Docker', path: '/vi-vn/appendix/7-infrastructure-and-operations/docker-containers', description: 'Image, container và network', detail: 'Từ viết Dockerfile đến build image, từ container network đến mount volume, học cách dùng Docker để đóng gói ứng dụng thành đơn vị chuẩn hóa và di động.' },
      { title: 'Kubernetes', path: '/vi-vn/appendix/7-infrastructure-and-operations/kubernetes', description: 'Pod, Deployment và Service', detail: 'Hiểu các khái niệm cốt lõi của K8s: lập lịch Pod, rolling update của Deployment, service discovery của Service; nắm vững công cụ chuẩn ngành để điều phối container.' },
      { title: 'Tự động hóa CI/CD', path: '/vi-vn/appendix/7-infrastructure-and-operations/ci-cd', description: 'GitHub Actions và pipeline', detail: 'Học triết lý continuous integration và continuous deployment, dùng GitHub Actions dựng pipeline tự động hóa, thực hiện tự động test, build và deploy ngay sau khi commit code.' }
    ]
  },
  {
    id: 'ai',
    name: 'Trí tuệ nhân tạo',
    icon: '🤖',
    color: '#f97316',
    bgGradient: 'linear-gradient(135deg, #f9731615, #f9731608)',
    description: 'Tìm hiểu nguyên lý AI và phát triển ứng dụng LLM',
    whyLearn: 'AI đang thay đổi cách phát triển phần mềm. Hiểu mô hình ngôn ngữ lớn sẽ giúp bạn tận dụng AI tốt hơn để tăng hiệu suất.',
    learningGoals: ['Cơ bản về mạng nơ-ron', 'Kiến trúc Transformer', 'Nguyên lý LLM', 'RAG và Agent'],
    articles: [
      { title: 'Lược sử AI', path: '/vi-vn/appendix/8-artificial-intelligence/ai-history', description: 'Từ hệ chuyên gia đến deep learning', detail: 'Nhìn lại các cột mốc quan trọng của AI từ Turing test đến GPT, hiểu sự chuyển dịch tư duy cốt lõi và động lực đằng sau mỗi bước đột phá công nghệ.' },
      { title: 'Mạng nơ-ron', path: '/vi-vn/appendix/8-artificial-intelligence/neural-networks', description: 'Perceptron và backpropagation', detail: 'Từ một nơ-ron đơn lẻ đến mạng đa tầng, hiểu forward propagation, hàm mất mát, backpropagation và gradient descent; đây là nền tảng của mọi deep learning.' },
      { title: 'Transformer', path: '/vi-vn/appendix/8-artificial-intelligence/transformer-attention', description: 'Cơ chế attention và self-attention', detail: 'Đi sâu vào cốt lõi của kiến trúc Transformer - cơ chế self-attention, hiểu cách nó giúp mô hình nắm bắt phụ thuộc tầm xa, trở thành nền tảng của các mô hình lớn hiện đại.' },
      { title: 'Nguyên lý mô hình ngôn ngữ lớn', path: '/vi-vn/appendix/8-artificial-intelligence/llm-principles', description: 'Pretraining và instruction fine-tuning', detail: 'Từ pretraining trên khối lượng văn bản khổng lồ đến căn chỉnh RLHF, mổ xẻ quy trình huấn luyện và nguyên lý hoạt động cốt lõi của các LLM như GPT, Claude.' },
      { title: 'Kiến trúc RAG', path: '/vi-vn/appendix/8-artificial-intelligence/rag', description: 'Thực chiến retrieval augmented generation', detail: 'Học cách dùng vector retrieval để bơm tri thức bên ngoài vào LLM, nắm vững quy trình RAG đầy đủ: chia tài liệu, Embedding, retrieval và generation.' },
      { title: 'AI Agent', path: '/vi-vn/appendix/8-artificial-intelligence/ai-agents', description: 'Kiến trúc Agent và tool calling', detail: 'Tìm hiểu cách AI Agent ra quyết định tự chủ thông qua planning, memory, tool calling; nắm vững các mẫu cốt lõi như ReAct, Function Calling.' }
    ]
  },
  {
    id: 'engineering',
    name: 'Tố chất kỹ thuật',
    icon: '✨',
    color: '#a855f7',
    bgGradient: 'linear-gradient(135deg, #a855f715, #a855f708)',
    description: 'Nâng cao chất lượng code và năng lực thực hành kỹ thuật',
    whyLearn: 'Code được viết ra cho con người đọc. Nắm vững design pattern, chiến lược test sẽ giúp bạn viết code thanh lịch và dễ bảo trì hơn.',
    learningGoals: ['Design pattern', 'Refactoring code', 'Chiến lược testing', 'Viết tài liệu kỹ thuật'],
    articles: [
      { title: 'Design pattern', path: '/vi-vn/appendix/9-engineering-excellence/design-patterns', description: 'Nguyên tắc SOLID và 23 mẫu', detail: 'Từ 5 nguyên tắc SOLID đến các mẫu kinh điển như factory, observer, strategy; học cách dùng design pattern để giải quyết các vấn đề cấu trúc lặp đi lặp lại trong code.' },
      { title: 'Chất lượng code và refactoring', path: '/vi-vn/appendix/9-engineering-excellence/code-quality-refactoring', description: 'Code smell và kỹ thuật refactoring', detail: 'Nhận diện các code smell phổ biến như code trùng lặp, hàm quá dài, kết hợp quá mức; nắm vững các kỹ thuật refactoring có hệ thống như extract method, inline variable, move field.' },
      { title: 'Chiến lược testing', path: '/vi-vn/appendix/9-engineering-excellence/testing-strategies', description: 'Unit test, integration test, E2E', detail: 'Hiểu chiến lược phân tầng của testing pyramid, học cách viết unit test, integration test và end-to-end test; dùng tự động hóa test để bảo vệ chất lượng code.' },
      { title: 'Viết tài liệu kỹ thuật', path: '/vi-vn/appendix/9-engineering-excellence/technical-writing', description: 'Tiêu chuẩn viết tài liệu và API', detail: 'Học cách viết README, tài liệu API và phương án kỹ thuật rõ ràng; kỹ năng viết tài liệu kỹ thuật tốt là kỹ năng mềm cốt lõi của kỹ sư cấp cao.' },
      { title: 'Cộng tác mã nguồn mở', path: '/vi-vn/appendix/9-engineering-excellence/open-source-collaboration', description: 'Issue, PR và tham gia cộng đồng', detail: 'Nắm vững quy trình cộng tác mã nguồn mở trên GitHub: tạo Issue, Fork repo, gửi PR, Code Review; học cách tham gia và bảo trì dự án mã nguồn mở.' }
    ]
  }
]

const activeCategory = ref(categories[0].id)
const hoveredArticle = ref(null)

const toggleCategory = (id) => {
  activeCategory.value = id
  hoveredArticle.value = null
}

const articleCount = categories.reduce((sum, cat) => sum + cat.articles.length, 0)

const activeCategoryData = computed(() => {
  if (!activeCategory.value) return null
  return categories.find(cat => cat.id === activeCategory.value)
})

const hoveredArticleData = computed(() => {
  if (!hoveredArticle.value || !activeCategoryData.value) return null
  return activeCategoryData.value.articles.find(a => a.path === hoveredArticle.value)
})
</script>

<template>
  <div class="appendix-bento">
    <div class="bento-header">
      <h3 class="bento-title">Khám phá phụ lục</h3>
      <p class="bento-subtitle">9 chủ đề · {{ articleCount }} bài viết</p>
    </div>

    <div class="bento-main">
      <!-- Bên trái: lưới thẻ -->
      <div class="bento-left">
        <div class="bento-grid">
          <div
            v-for="category in categories"
            :key="category.id"
            class="bento-card"
            :class="{ active: activeCategory === category.id }"
            :style="{
              '--card-color': category.color,
              '--card-bg': category.bgGradient
            }"
            @click="toggleCategory(category.id)"
          >
            <div class="card-icon">{{ category.icon }}</div>
            <div class="card-content">
              <h4 class="card-title">{{ category.name }}</h4>
            </div>
            <div class="card-indicator">
              <span>{{ category.articles.length }} bài {{ activeCategory === category.id ? '↓' : '→' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bên phải: bảng chi tiết -->
      <div
        class="detail-panel"
        :style="{ '--panel-color': activeCategoryData.color }"
        :key="activeCategoryData.id"
      >
        <div class="panel-header">
          <div class="panel-title-row">
            <span class="panel-icon">{{ hoveredArticleData ? '📄' : activeCategoryData.icon }}</span>
            <div class="panel-title-group">
              <h4 class="panel-title">{{ hoveredArticleData?.title || activeCategoryData.name }}</h4>
              <p class="panel-desc">{{ hoveredArticleData?.description || activeCategoryData.description }}</p>
            </div>
          </div>
          <div class="panel-body">
            <p class="intro-text">{{ hoveredArticleData?.detail || activeCategoryData.whyLearn }}</p>
          </div>
          <div v-if="!hoveredArticleData" class="panel-goals">
            <h5 class="goals-title">Bạn sẽ học được gì?</h5>
            <div class="goals-list">
              <span v-for="(goal, index) in activeCategoryData.learningGoals" :key="index" class="goal-tag">
                {{ goal }}
              </span>
            </div>
          </div>
        </div>

        <div class="panel-articles">
          <div class="articles-header">
            <span class="articles-icon">{{ activeCategoryData.icon }}</span>
            <span class="articles-title">Danh sách bài viết ({{ activeCategoryData.articles.length }} bài)</span>
          </div>
          <div class="articles-list-scroll">
            <a
              v-for="article in activeCategoryData.articles"
              :key="article.path"
              :href="withBase(article.path)"
              class="article-item"
              :class="{ hover: hoveredArticle === article.path }"
              @mouseenter="hoveredArticle = article.path"
              @mouseleave="hoveredArticle = null"
            >
              <span class="article-bullet"></span>
              <div class="article-info">
                <span class="article-name">{{ article.title }}</span>
                <span class="article-desc">{{ article.description }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appendix-bento {
  padding: 1rem 0;
}

.bento-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.bento-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem;
  letter-spacing: -0.02em;
}

.bento-subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.bento-main {
  display: grid;
  grid-template-columns: 1fr 280px;
  height: 520px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.bento-left {
  overflow-y: auto;
  padding: 0.75rem;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.bento-card {
  position: relative;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.bento-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--card-bg);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.bento-card:hover::before {
  opacity: 1;
}

.bento-card:hover {
  border-color: var(--card-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.bento-card.active {
  border-color: var(--card-color);
}

.bento-card.active::before {
  opacity: 1;
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  position: relative;
}

.card-content {
  position: relative;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem;
}

.card-indicator {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  position: relative;
}

.bento-card:hover .card-indicator {
  color: var(--card-color);
}

/* Bảng bên phải */
.detail-panel {
  background: var(--vp-c-bg);
  border-left: 1px solid var(--vp-c-divider);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  height: 200px;
  overflow-y: auto;
  flex-shrink: 0;
}

.panel-title-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.panel-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
}

.panel-title-group {
  flex: 1;
  min-width: 0;
}

.panel-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem;
}

.panel-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.4;
}

.panel-body {
  margin-bottom: 0.75rem;
}

.intro-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
}

/* Mục tiêu học tập */
.panel-goals {
  margin-top: 0.75rem;
}

.goals-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--panel-color);
  margin: 0 0 0.5rem;
}

.goals-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.goal-tag {
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-1);
}

/* Khu vực danh sách bài viết */
.panel-articles {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

.articles-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.articles-icon {
  font-size: 1.1rem;
}

.articles-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--panel-color);
}

.articles-list-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem;
}

.article-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.6rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.15s ease;
  margin-bottom: 0.25rem;
}

.article-item:hover,
.article-item.hover {
  background: var(--vp-c-bg-soft);
}

.article-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--panel-color);
  flex-shrink: 0;
  margin-top: 0.4rem;
}

.article-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.article-name {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.article-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

/* Responsive */
@media (max-width: 768px) {
  .bento-main {
    grid-template-columns: 1fr;
    height: auto;
    max-height: 80vh;
  }

  .bento-left {
    max-height: 300px;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .detail-panel {
    border-left: none;
    max-height: 400px;
  }
}

@media (max-width: 600px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
}
</style>
