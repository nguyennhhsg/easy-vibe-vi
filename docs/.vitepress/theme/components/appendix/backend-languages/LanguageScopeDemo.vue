<template>
  <div class="lang-scope">
    <div class="nav-bar">
      <button class="arrow" :disabled="current === 0" @click="current--">◀</button>
      <div class="tabs">
        <button
          v-for="(lang, i) in langs"
          :key="lang.id"
          class="tab"
          :class="{ active: current === i }"
          @click="current = i"
        >{{ lang.icon }} {{ lang.name }}</button>
      </div>
      <button class="arrow" :disabled="current === langs.length - 1" @click="current++">▶</button>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="lang-icon">{{ langs[current].icon }}</span>
        <div>
          <div class="lang-name">{{ langs[current].name }}</div>
          <div class="lang-desc">{{ langs[current].tagline }}</div>
        </div>
        <span class="dir-count">{{ langs[current].dirs.length }} hướng</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width:18%">Hướng ứng dụng</th>
              <th style="width:46%">Ví dụ chi tiết & mô tả</th>
              <th style="width:36%">Ứng dụng / chương trình tiêu biểu</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d in langs[current].dirs" :key="d.dir">
              <td class="dir-cell">{{ d.dir }}</td>
              <td>{{ d.detail }}</td>
              <td class="apps-cell"><span v-for="a in d.apps" :key="a" class="app-tag">{{ a }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const current = ref(0)
const langs = [
  {
    id: 'java', icon: '☕', name: 'Java',
    tagline: 'Cây cổ thụ enterprise · Hệ sinh thái JVM · Strong typing · Nền tảng big data',
    dirs: [
      { dir: 'Backend Web enterprise', detail: 'Microservice Spring Boot / Spring Cloud; truy cập dữ liệu MyBatis/JPA; xác thực/phân quyền Spring Security', apps: ['Hệ thống lõi Taobao', 'Dự án Spring Boot', 'Hệ thống ngân hàng online'] },
      { dir: 'Xử lý big data', detail: 'Hadoop MapReduce batch; Spark stream/batch; Flink stream realtime; Hive data warehouse', apps: ['Hadoop', 'Spark', 'Flink', 'Hive'] },
      { dir: 'Phát triển middleware', detail: 'Message queue (Kafka/RocketMQ); RPC framework (Dubbo); Service registry (Nacos/Zookeeper)', apps: ['Kafka', 'RocketMQ', 'Dubbo', 'Nacos'] },
      { dir: 'Search engine', detail: 'Elasticsearch full-text search; Lucene index nền; Solr enterprise search', apps: ['Elasticsearch', 'Lucene', 'Solr'] },
      { dir: 'Hệ thống giao dịch tài chính', detail: 'Matching engine độ trễ thấp; risk engine; hệ thống thanh toán bù trừ', apps: ['LMAX Exchange', 'Lõi Ant Financial'] },
      { dir: 'Ứng dụng Android', detail: 'Phát triển native Android SDK; thư viện Jetpack; hybrid với Kotlin', apps: ['App nội bộ doanh nghiệp', 'Android SDK'] },
      { dir: 'Build & DevOps', detail: 'Build Maven/Gradle; CI/CD Jenkins; chất lượng code SonarQube', apps: ['Maven', 'Gradle', 'Jenkins'] },
      { dir: 'Ứng dụng desktop', detail: 'JavaFX GUI desktop; Swing hệ thống cũ; công cụ đa nền tảng', apps: ['IntelliJ IDEA', 'Eclipse', 'DBeaver'] }
    ]
  },
  {
    id: 'nodejs', icon: '💚', name: 'Node.js',
    tagline: 'Full-stack JavaScript · Event-driven · Hệ sinh thái npm lớn nhất · Giao tiếp realtime',
    dirs: [
      { dir: 'Backend Web API', detail: 'REST API Express/Koa/Fastify; framework enterprise NestJS; tRPC type-safe', apps: ['NestJS', 'Express API', 'Strapi CMS'] },
      { dir: 'Framework full-stack', detail: 'Next.js App Router (React SSR); Nuxt 3 (Vue SSR); Remix; Astro', apps: ['Next.js', 'Nuxt', 'Remix', 'T3 Stack'] },
      { dir: 'Giao tiếp realtime', detail: 'WebSocket Socket.io; soạn thảo cộng tác CRDT Yjs/Automerge; signaling WebRTC', apps: ['Document cộng tác', 'Bảng vẽ realtime', 'Chat room'] },
      { dir: 'Serverless', detail: 'Vercel Edge Functions; Cloudflare Workers; AWS Lambda Node', apps: ['Vercel Serverless', 'Cloudflare Worker'] },
      { dir: 'Công cụ CLI', detail: 'Phân tích tham số Commander/Yargs; UI terminal Ink; phát hành qua npx', apps: ['create-react-app', 'Vercel CLI', 'eslint'] },
      { dir: 'Desktop Electron', detail: 'Electron + React/Vue desktop đa nền tảng; đóng gói electron-builder', apps: ['VS Code', 'Slack', 'Notion', 'Discord'] },
      { dir: 'Plugin trình duyệt/editor', detail: 'Chrome Extension MV3; VS Code Extension; Obsidian Plugin', apps: ['uBlock Origin', 'Dịch trang ngầm', 'GitLens'] },
      { dir: 'Bot & tự động hóa', detail: 'Telegraf (Telegram Bot); discord.js; Slack Bolt', apps: ['grammY Bot', 'discord.js Bot'] }
    ]
  },
  {
    id: 'go', icon: '🐹', name: 'Go',
    tagline: 'Vua cloud-native · Concurrency cao bẩm sinh · Phát hành đơn binary · Nền tảng DevOps',
    dirs: [
      { dir: 'Web API concurrency cao', detail: 'REST API framework Gin/Echo/Fiber; net/http chuẩn; goroutine concurrency bẩm sinh', apps: ['Gin API', 'Echo microservice', 'Fiber API'] },
      { dir: 'Kiến trúc microservice', detail: 'Giao tiếp gRPC + Protobuf; framework go-zero/Kratos; service registry/tracing', apps: ['Microservice gRPC', 'go-zero', 'Kratos'] },
      { dir: 'Hạ tầng cloud-native', detail: 'Docker/K8s/Terraform/Prometheus/etcd đều viết bằng Go; tự viết K8s Operator', apps: ['Docker', 'Kubernetes', 'Terraform', 'Prometheus'] },
      { dir: 'Công cụ CLI dòng lệnh', detail: 'Framework Cobra; TUI Bubble Tea; biên dịch file đơn đa nền tảng', apps: ['kubectl', 'gh CLI', 'lazygit', 'fzf'] },
      { dir: 'Proxy mạng & middleware', detail: 'Reverse proxy/load balancer; API gateway; VPN/intranet penetration; DNS', apps: ['Caddy', 'Traefik', 'frp', 'CoreDNS'] },
      { dir: 'Lưu trữ phân tán', detail: 'KV store phân tán; object storage; time-series database', apps: ['etcd', 'MinIO', 'TiKV', 'InfluxDB'] },
      { dir: 'Blockchain', detail: 'Client Ethereum; Hyperledger Fabric; cài đặt thuật toán đồng thuận', apps: ['go-ethereum', 'Hyperledger Fabric'] },
      { dir: 'Monitoring & observability', detail: 'Prometheus thu thập metrics; Grafana Agent; thu thập log', apps: ['Prometheus', 'Grafana Agent', 'Loki'] }
    ]
  },
  {
    id: 'rust', icon: '🦀', name: 'Rust',
    tagline: 'Memory safety · Zero-cost abstraction · Thay thế C++ hiện đại · Ngôn ngữ hệ thống tăng trưởng nhanh nhất',
    dirs: [
      { dir: 'Ứng dụng desktop Tauri', detail: 'Tauri 2.0 thay thế Electron (nhẹ hơn 10 lần+); frontend React/Vue + backend Rust', apps: ['Tauri App', 'Spacedrive', 'AppFlowy'] },
      { dir: 'Module WebAssembly', detail: 'Rust → WASM tính toán hiệu năng cao (ảnh/PDF/mã hóa); codec phía Web', apps: ['Engine render Figma', 'SWC', 'wasm-pack'] },
      { dir: 'Công cụ CLI', detail: 'CLI hiện đại ripgrep/fd/bat/exa; biên dịch binary đơn không phụ thuộc', apps: ['ripgrep', 'fd', 'bat', 'starship', 'delta'] },
      { dir: 'Phát triển hệ điều hành', detail: 'Microkernel Redox OS; module kernel Rust Linux 6.1+; RTOS nhúng', apps: ['Redox OS', 'Module Linux Rust', 'Tock OS'] },
      { dir: 'Phát triển nhúng', detail: 'embedded-rust trên firmware STM32/ESP32; framework concurrency realtime RTIC', apps: ['embassy-rs', 'Dự án RTIC', 'ESP-RS'] },
      { dir: 'Serverless / Edge', detail: 'Cloudflare Workers Rust→WASM; Fastly Compute@Edge; cold start cực nhanh', apps: ['Cloudflare Workers', 'Fermyon Spin', 'WasmEdge'] },
      { dir: 'Công cụ mạng hiệu năng cao', detail: 'Proxy mạng; reverse proxy/load balancer; VPN; intranet penetration; DNS', apps: ['Pingora', 'Linkerd2-proxy', 'Hickory DNS'] },
      { dir: 'Phát triển blockchain', detail: 'Smart contract Solana; framework Substrate (Polkadot); zero-knowledge proof', apps: ['Solana', 'Substrate', 'StarkNet'] },
      { dir: 'Backend Web', detail: 'API hiệu năng cao Actix-web / Axum; gRPC; backend tài chính/game độ trễ thấp', apps: ['Axum API', 'Actix-web', 'Tonic gRPC'] }
    ]
  },
  {
    id: 'csharp', icon: '🟣', name: 'C#',
    tagline: 'Hệ sinh thái .NET · Enterprise · Game Unity · Đa nền tảng',
    dirs: [
      { dir: 'Backend Web enterprise', detail: 'ASP.NET Core Web API; ORM Entity Framework; SignalR realtime', apps: ['Stack Overflow', 'Dự án ASP.NET'] },
      { dir: 'Phát triển game Unity', detail: 'Script C# trong Unity engine; game 2D/3D; ứng dụng AR/VR; công cụ game', apps: ['Game Unity', 'Pokemon GO', 'Beat Saber'] },
      { dir: 'Desktop Windows', detail: 'GUI desktop WPF/WinUI 3; hệ thống cũ WinForms; MAUI đa nền tảng', apps: ['Visual Studio', 'Paint.NET', 'Windows Terminal'] },
      { dir: 'Dịch vụ cloud Azure', detail: 'Serverless Azure Functions; Azure SDK; microservice (Dapr)', apps: ['Azure Functions', 'Dapr', 'Orleans'] },
      { dir: 'Kiến trúc microservice', detail: '.NET Aspire cloud-native; gRPC; message bus MassTransit', apps: ['.NET Aspire', 'MassTransit', 'CAP'] },
      { dir: 'Frontend Web Blazor', detail: 'Blazor Server/WASM viết frontend bằng C#; thay thế JavaScript', apps: ['Dự án Blazor', 'Thư viện component Radzen'] }
    ]
  },
  {
    id: 'kotlin', icon: '🟠', name: 'Kotlin',
    tagline: 'Ngôn ngữ JVM hiện đại · Chính thức cho Android · Null safety · Coroutine',
    dirs: [
      { dir: 'Ứng dụng Android', detail: 'UI khai báo Jetpack Compose; ngôn ngữ Google khuyến nghị chính thức', apps: ['Google App', 'Coursera', 'Pinterest'] },
      { dir: 'Backend trên JVM', detail: 'Framework Ktor nhẹ; Spring Boot hỗ trợ Kotlin; coroutine async', apps: ['Dịch vụ Ktor', 'Spring Boot Kotlin'] },
      { dir: 'Phát triển đa nền tảng', detail: 'Kotlin Multiplatform (KMP) chia sẻ logic nghiệp vụ iOS/Android/Web', apps: ['Dự án KMP', 'Netflix (một phần)'] },
      { dir: 'Script server-side', detail: 'Kotlin Script (.kts); script build Gradle (build.gradle.kts)', apps: ['Gradle Kotlin DSL', 'kscript'] },
      { dir: 'Xử lý dữ liệu', detail: 'Kotlin DataFrame; tương tác với hệ sinh thái Spark/Flink Java', apps: ['Kotlin DataFrame', 'Spark Kotlin'] }
    ]
  },
  {
    id: 'scala', icon: '🔴', name: 'Scala',
    tagline: 'Vua big data trên JVM · Functional + OOP · Hệ sinh thái Spark',
    dirs: [
      { dir: 'Xử lý big data', detail: 'Spark batch/stream; Flink Scala API; ETL data pipeline', apps: ['Apache Spark', 'Apache Flink', 'Databricks'] },
      { dir: 'Hệ thống phân tán', detail: 'Mô hình Actor Akka; Akka Cluster; Akka Streams', apps: ['Dự án Akka', 'Nền tảng Lightbend'] },
      { dir: 'Hệ thống tài chính', detail: 'Engine phân tích rủi ro; chiến lược trading định lượng; mô hình tính toán phức tạp', apps: ['Hệ thống giao dịch Goldman Sachs', 'Morgan Stanley'] },
      { dir: 'Backend Web', detail: 'Play Framework Web async; Scala.js frontend; http4s functional', apps: ['Play Framework', 'Backend Twitter', 'LinkedIn'] },
      { dir: 'Hệ thống tin nhắn', detail: 'Kafka Streams; Kafka Connect tích hợp dữ liệu', apps: ['Apache Kafka', 'Kafka Streams'] }
    ]
  },
  {
    id: 'swift', icon: '🍎', name: 'Swift',
    tagline: 'Ngôn ngữ chính thức của Apple · Type safety · Hiệu năng cao · Hệ sinh thái iOS/macOS',
    dirs: [
      { dir: 'Ứng dụng iOS', detail: 'Phát triển native SwiftUI / UIKit; Combine reactive; widget WidgetKit', apps: ['Mọi App iOS', 'Hệ sinh thái Apple'] },
      { dir: 'Ứng dụng macOS', detail: 'Desktop AppKit / SwiftUI; công cụ menu bar; system extension', apps: ['Xcode', 'Swift Playgrounds'] },
      { dir: 'Backend Web', detail: 'Framework Vapor / Hummingbird; SwiftNIO lớp mạng', apps: ['Vapor API', 'Dịch vụ Hummingbird'] },
      { dir: 'Mobile đa nền tảng', detail: 'Swift on Server + iOS chia sẻ lớp model; Swift for Android (thử nghiệm)', apps: ['LinkedIn (một phần)', 'Airbnb (một phần)'] },
      { dir: 'Lập trình hệ thống', detail: 'Tương tác với C/Obj-C; phát triển framework lớp thấp; driver/kernel extension', apps: ['Framework hệ thống Apple', 'Trình biên dịch Swift'] }
    ]
  },
  {
    id: 'ruby', icon: '💎', name: 'Ruby',
    tagline: 'Hạnh phúc của developer · Phát triển nhanh với Rails · Metaprogramming · Cú pháp thanh lịch',
    dirs: [
      { dir: 'Web full-stack', detail: 'Ruby on Rails MVC; Hotwire/Turbo frontend hiện đại; Action Cable realtime', apps: ['GitHub', 'Shopify', 'Basecamp'] },
      { dir: 'Prototype nhanh / MVP', detail: 'Rails scaffold; ORM ActiveRecord; convention over configuration', apps: ['Airbnb thuở đầu', 'Twitter thuở đầu'] },
      { dir: 'Backend API', detail: 'Grape / Rails API mode; GraphQL Ruby; Sidekiq background job', apps: ['Stripe API', 'GitLab'] },
      { dir: 'Công cụ DevOps', detail: 'Chef/Puppet quản lý cấu hình; Vagrant ảo hóa; Homebrew quản lý package', apps: ['Homebrew', 'Vagrant', 'Chef'] },
      { dir: 'Script & tự động hóa', detail: 'Task Rake; script migrate dữ liệu; xử lý văn bản', apps: ['Fastlane', 'CocoaPods', 'Jekyll'] }
    ]
  },
  {
    id: 'wasm', icon: '🔮', name: 'WebAssembly',
    tagline: 'Định dạng binary trình duyệt · Đích biên dịch đa ngôn ngữ · Sandbox an toàn · Hiệu năng gần native',
    dirs: [
      { dir: 'Tính toán hiệu năng cao trên trình duyệt', detail: 'Xử lý ảnh/video; render PDF; mã hóa giải mã; tính toán khoa học', apps: ['Figma', 'Google Earth', 'Photoshop Web'] },
      { dir: 'Game engine lên Web', detail: 'Unity/Godot/Unreal compile sang Web; render WebGL + WASM', apps: ['Unity WebGL', 'Godot Web', 'Game itch.io'] },
      { dir: 'Toolchain phát triển', detail: 'Compiler SWC/esbuild; SQLite WASM; Playground ngôn ngữ', apps: ['SWC', 'esbuild', 'SQLite WASM'] },
      { dir: 'Serverless / Edge', detail: 'Cloudflare Workers WASM; Fermyon Spin; Fastly Compute', apps: ['Cloudflare Workers', 'Fermyon Spin'] },
      { dir: 'Sandbox plugin', detail: 'Envoy WASM Filter; plugin Figma; thực thi code bên thứ ba cách ly an toàn', apps: ['Envoy Proxy', 'Plugin Figma', 'Extism'] }
    ]
  },
]
</script>

<style scoped>
.lang-scope { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 0.75rem; margin: 1rem 0; }
.nav-bar { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
.arrow { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 0.25rem 0.5rem; cursor: pointer; font-size: 0.8rem; }
.arrow:disabled { opacity: 0.3; cursor: not-allowed; }
.tabs { display: flex; gap: 0.25rem; overflow-x: auto; flex: 1; }
.tab { white-space: nowrap; padding: 0.25rem 0.5rem; border: 1px solid transparent; border-radius: 6px; background: none; cursor: pointer; font-size: 0.75rem; color: var(--vp-c-text-2); transition: all 0.2s; }
.tab:hover { background: var(--vp-c-bg); }
.tab.active { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.card { background: var(--vp-c-bg); border-radius: 8px; overflow: hidden; }
.card-header { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0.75rem; border-bottom: 1px solid var(--vp-c-divider); }
.lang-icon { font-size: 1.5rem; }
.lang-name { font-weight: 700; font-size: 0.95rem; }
.lang-desc { font-size: 0.75rem; color: var(--vp-c-text-2); }
.dir-count { margin-left: auto; font-size: 0.75rem; color: var(--vp-c-text-3); white-space: nowrap; }
.table-wrap { overflow-x: auto; max-height: 320px; overflow-y: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
thead { position: sticky; top: 0; background: var(--vp-c-bg); z-index: 1; }
th { text-align: left; padding: 0.4rem 0.6rem; border-bottom: 2px solid var(--vp-c-divider); font-size: 0.75rem; color: var(--vp-c-text-2); }
td { padding: 0.4rem 0.6rem; border-bottom: 1px solid var(--vp-c-divider); vertical-align: top; line-height: 1.5; }
.dir-cell { font-weight: 600; white-space: nowrap; color: var(--vp-c-brand-1); }
.apps-cell { display: flex; flex-wrap: wrap; gap: 0.25rem; }
.app-tag { display: inline-block; padding: 0.1rem 0.4rem; background: var(--vp-c-bg-soft); border-radius: 4px; font-size: 0.7rem; white-space: nowrap; }
</style>
