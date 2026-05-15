# Hướng dẫn Hoàn chỉnh Claude Code MCP

## Claude Code MCP là gì?

**Claude Code** là công cụ dòng lệnh AI chính thức từ Anthropic, trong khi **MCP (Model Context Protocol)** là giao thức cho phép Claude Code kết nối với các công cụ và dịch vụ bên ngoài.

Nói cách đơn giản, MCP biến Claude Code từ một trợ lý AI "chỉ có thể đọc và ghi tệp cục bộ" thành một trợ lý siêu cấp "có thể truy cập GitHub, cơ sở dữ liệu, API, dịch vụ đám mây"!

## Tại sao bạn cần sử dụng MCP trong Claude Code?

### Claude Code Mà không MCP

```
Bạn có thể làm:
✓ Đọc tệp cục bộ
✓ Chỉnh sửa mã
✓ Chạy lệnh
✓ Sử dụng công cụ Bash

Bạn không thể làm:
✗ Xem các Issues GitHub của bạn
✗ Truy cập cơ sở dữ liệu đám mây
✗ Gọi API bên ngoài
✗ Nhận thời tiết thực tế
```

### Claude Code Với MCP

```
Bạn có thể làm:
✓ Tất cả các chức năng cũ
✓ Xem/tạo Issues và PR GitHub
✓ Truy vấn cơ sở dữ liệu SQLite, PostgreSQL
✓ Truy cập các dịch vụ bên ngoài như Notion, Slack
✓ Nhận dữ liệu thời tiết, bản đồ thực tế
✓ Tự động hóa trình duyệt
✓ ...và nhiều hơn nữa!
```

## Bắt đầu nhanh chóng

### Bước 1: Hiểu vị trí tệp cấu hình

Tệp cấu hình MCP của Claude Code nằm tại:

| Mức độ | Đường dẫn tệp cấu hình | Phạm vi áp dụng |
|-----|-------------|----------|
| **Cấp người dùng** | `~/.claude.json` | Tất cả các dự án |
| **Cấp dự án** | `.claude/mcp.json` | Dự án hiện tại |

Bạn nên ưu tiên sử dụng **cấu hình cấp dự án**, cho phép các dự án khác nhau sử dụng các dịch vụ MCP khác nhau.

### Bước 2: Thêm máy chủ MCP bằng ngôn ngữ tự nhiên

Trong Claude Code, bạn không cần phải chỉnh sửa tệp cấu hình hoặc ghi nhớ lệnh một cách thủ công. Bạn có thể mô tả trực tiếp bằng ngôn ngữ tự nhiên:

```
Bạn: Hãy thêm máy chủ MCP GitHub, token của tôi là ghp_xxx

Claude: Tôi sẽ giúp bạn cấu hình máy chủ MCP GitHub...

[Tự động cập nhật .claude/mcp.json]
```

```
Bạn: Thêm máy chủ cơ sở dữ liệu SQLite, tệp cơ sở dữ liệu nằm tại ./data/app.db

Claude: Được, tôi sẽ cấu hình máy chủ MCP SQLite...
```

```
Bạn: Thêm máy chủ MCP kiểu HTTP, địa chỉ là https://api.example.com/mcp

Claude: Tôi sẽ thêm máy chủ MCP từ xa này...
```

### Bước 3: Xác minh cấu hình

Hỏi Claude Code trực tiếp:

```
Bạn: Hiện có những máy chủ MCP nào có sẵn?

Claude: Các máy chủ MCP đã cấu hình hiện tại:
• github - Tích hợp GitHub
• sqlite - Cơ sở dữ liệu SQLite
• filesystem - Truy cập hệ thống tệp
```

Hoặc sử dụng lệnh chẩn đoán:

```
/doctor
```

### Bước 4: Bắt đầu sử dụng

Sau khi cấu hình thành công, gọi trực tiếp các chức năng MCP bằng ngôn ngữ tự nhiên:

```
Bạn: Hãy giúp tôi tạo một Issue trên GitHub

Claude: Tôi có thể giúp bạn tạo Issue GitHub. Vui lòng cho tôi biết:
- Địa chỉ kho lưu trữ (ví dụ: owner/repo)
- Tiêu đề Issue
- Mô tả Issue
```

## Quản lý tự nhiên ngôn ngữ của Claude Code

### Xem và quản lý máy chủ MCP

Bạn có thể hoàn toàn tương tác với Claude Code bằng ngôn ngữ tự nhiên:

```
Bạn: Liệt kê tất cả các máy chủ MCP đã cấu hình

Bạn: Kiểm tra trạng thái kết nối của máy chủ MCP

Bạn: Xóa máy chủ MCP notion

Bạn: Cập nhật token cho máy chủ github
```

### Chẩn đoán vấn đề

Khi gặp vấn đề:

```
Bạn: Kiểm tra xem kết nối MCP có vấn đề gì không

Claude: [Sẽ tự động chạy chẩn đoán, phân tích tệp cấu hình, kiểm tra trạng thái máy chủ]
```

## Chi tiết cách cấu hình

### Cấu hình cấp người dùng (Toàn cục)

Chỉnh sửa `~/.claude.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

### Cấu hình cấp dự án (Được Khuyến Nghị)

Chỉnh sửa `.claude/mcp.json` ở thư mục gốc dự án:

```json
{
  "mcpServers": {
    "project-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/app.db"]
    }
  }
}
```

**Lợi ích của cấu hình cấp dự án:**
- Các thành viên của nhóm có thể chia sẻ cấu hình (cam kết với Git)
- Các dự án khác nhau sử dụng các dịch vụ MCP khác nhau
- Cấu hình linh hoạt hơn, không sẽ làm ô nhiễm cấu hình toàn cục

### Cấu hình phương thức truyền tải

Claude Code hỗ trợ ba cách truyền tải:

#### STDIO (Quy trình cục bộ)

```json
{
  "mcpServers": {
    "local-tool": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}
```

#### HTTP (Dịch vụ từ xa)

```json
{
  "mcpServers": {
    "remote-api": {
      "url": "https://api.example.com/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer your-token"
      }
    }
  }
}
```

#### SSE (Máy chủ đẩy)

```json
{
  "mcpServers": {
    "streaming": {
      "url": "https://api.example.com/sse",
      "transport": "sse"
    }
  }
}
```

## Ví dụ thực tế

### Ví dụ 1: Tự động hóa quy trình làm việc GitHub

```
Bạn: Hãy đẩy các thay đổi hiện tại lên GitHub, sau đó tạo một PR với tiêu đề "Thêm tính năng mới"

Claude:
1. Kiểm tra trạng thái git hiện tại...
2. Tạo nhánh mới feature/new-feature...
3. Cam kết các thay đổi...
4. Đẩy đến máy chủ từ xa...
5. Gọi github_create_pull_request để tạo PR...
6. PR đã được tạo: https://github.com/owner/repo/pull/123
```

### Ví dụ 2: Truy vấn cơ sở dữ liệu

```
Bạn: Truy vấn 10 người dùng được đăng ký gần đây nhất trong cơ sở dữ liệu

Claude:
1. Kết nối với cơ sở dữ liệu SQLite...
2. Thực hiện truy vấn: SELECT * FROM users ORDER BY created_at DESC LIMIT 10
3. Trả về kết quả:
   - Trương Ba (zhang@example.com) - 2025-02-28
   - Lý Tư (li@example.com) - 2025-02-27
   ...
```

### Ví dụ 3: Phân tích ảnh chụp màn hình trang web

```
Bạn: Mở https://example.com và chụp ảnh màn hình, phân tích thiết kế trang

Claude:
1. Khởi chạy trình duyệt...
2. Điều hướng đến https://example.com...
3. Chụp ảnh màn hình...
4. [Trả về ảnh chụp]
5. Phân tích thiết kế trang:
   - Bố cục sử dụng thiết kế tập trung, chiều rộng tối đa 1200px
   - Màu chính là xanh lam (#3b82f6)
   - Thanh điều hướng được cố định ở đầu trang
   ...
```

### Ví dụ 4: Tích hợp với Notion

```
Bạn: Lưu ghi chú của tôi vào Notion

Claude:
1. Sử dụng máy chủ MCP Notion...
2. Tạo trang mới...
3. Đã lưu: https://notion.so/page/xxx
```

## Mẹo gỡ lỗi

### Sử dụng chẩn đoán ngôn ngữ tự nhiên

Khi gặp vấn đề, hãy nói trực tiếp với Claude Code:

```
Bạn: Máy chủ MCP của tôi không thể kết nối, hãy kiểm tra xem

Bạn: Gọi công cụ MCP GitHub thất bại, lý do là gì?

Bạn: Tại sao máy chủ sqlite luôn hiển thị đang kết nối?
```

Claude Code sẽ tự động:
1. Kiểm tra định dạng tệp cấu hình
2. Xác minh các biến môi trường
3. Kiểm tra kết nối máy chủ
4. Cung cấp đề xuất sửa chữa cụ thể

### Khắc phục sự cố thường gặp

| Vấn đề | Nguyên nhân có thể | Giải pháp |
|-----|---------|----------|
| Máy chủ chưa kết nối | Định dạng tệp cấu hình không chính xác | Kiểm tra cú pháp JSON |
| Không thể gọi công cụ | Quyền không đủ | Kiểm tra các biến môi trường |
| Kết nối hết thời gian chờ | Vấn đề về mạng | Kiểm tra URL hoặc mạng |
| Quy trình bị sự cố | Lỗi mã máy chủ | Xem nhật ký máy chủ |

### Lệnh chẩn đoán thручной

```
/doctor
```

Ví dụ đầu ra:
```
Báo cáo chẩn đoán hệ thống:
===============

Claude Code: v2.5.0 ✓
Node.js: v20.0.0 ✓

Trạng thái máy chủ MCP:
• github: ✓ Đã kết nối (12 công cụ)
• sqlite: ✗ Kết nối thất bại - Database file not found
• puppeteer: ✓ Đã kết nối (8 công cụ)

Đề xuất:
1. Kiểm tra xem đường dẫn cơ sở dữ liệu sqlite có chính xác không
2. Đảm bảo định dạng .claude/mcp.json chính xác
```

## Thực hành tốt nhất

### 1. Ưu tiên cấu hình cấp dự án

**Tại sao khuyến nghị cấu hình cấp dự án?**

Các dự án khác nhau thường yêu cầu các dịch vụ MCP khác nhau. Ví dụ, dự án frontend có thể cần các công cụ kiểm tra trình duyệt, trong khi dự án backend lại cần kết nối cơ sở dữ liệu. Sử dụng cấu hình cấp dự án cho phép mỗi dự án có bộ máy chủ MCP riêng, tránh nhầm lẫn với cấu hình toàn cục.

Điều quan trọng hơn là, cấu hình cấp dự án có thể được cam kết với Git, các thành viên của nhóm sau khi sao chép dự án sẽ có thể sử dụng trực tiếp các dịch vụ MCP tương tự, không cần phải cấu hình lại.

```
Dự án A (Dự án frontend) → .claude/mcp.json chứa kiểm tra trình duyệt MCP
Dự án B (Dự án backend) → .claude/mcp.json chứa MCP cơ sở dữ liệu
```

### 2. Môi trường hóa thông tin nhạy cảm

**Không bao giờ mã hóa khóa trong tệp cấu hình!**

Tệp cấu hình có thể bị cam kết vô tình vào kho lưu trữ Git, dẫn đến rò rỉ khóa. Cách làm đúng là lưu trữ thông tin nhạy cảm trong các biến môi trường, tệp cấu hình chỉ tham chiếu tên biến. Bằng cách này, ngay cả khi tệp cấu hình bị công khai, khóa thực tế cũng sẽ không bị tiếp lộ.

```json
{
  "env": {
    "GITHUB_TOKEN": "$GITHUB_TOKEN",  // ✓ Tốt - Đọc từ biến môi trường
    "GITHUB_TOKEN": "ghp_abc123"       // ✗ Tệ - Mã hóa khóa
  }
}
```

### 3. Khóa phiên bản

**Tại sao cần khóa phiên bản?**

Theo mặc định, `npx -y` sẽ luôn sử dụng phiên bản mới nhất của máy chủ MCP. Điều này có thể gây ra vấn đề: phiên bản mới có thể giới thiệu các thay đổi không tương thích, hoặc máy chủ có thể bị gỡ xuống/đổi tên.

Bằng cách thêm `@số phiên bản` vào sau tên gói, bạn có thể đảm bảo luôn sử dụng phiên bản cụ thể đã được xác minh, tránh các vấn đề bất ngờ do cập nhật tự động gây ra.

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github@1.2.3"]  // Phiên bản được cố định
}
```

### 4. Tài liệu hóa cấu hình MCP của bạn

**Cho phép các thành viên của nhóm nhanh chóng hiểu cấu hình MCP**

Khi dự án có nhiều máy chủ MCP, các thành viên mới có thể không rõ mục đích của mỗi máy chủ và yêu cầu cấu hình. Tạo một tệp `README.md` trong thư mục `.claude/`, mô tả mục đích của mỗi máy chủ, các mục cấu hình bắt buộc và cách lấy chúng, có thể giảm đáng kể chi phí giao tiếp của nhóm.

Tạo `.claude/README.md` trong dự án:

Tạo `.claude/README.md` trong dự án:

```markdown
# Giải thích cấu hình MCP

Các máy chủ MCP được sử dụng trong dự án này:

## github
Dùng để tự động hóa các hoạt động GitHub, cần cấu hình GITHUB_TOKEN.

## sqlite
Kết nối với ./data/app.db, dùng để truy vấn và sửa đổi dữ liệu.

## puppeteer
Dùng cho kiểm tra E2E.
```

## Claude Code vs Claude Desktop

| Đặc điểm | Claude Code | Claude Desktop |
|-----|-------------|----------------|
| **Tệp cấu hình** | `~/.claude.json` hoặc `.claude/mcp.json` | `claude_desktop_config.json` |
| **Cấu hình cấp dự án** | ✓ Hỗ trợ | ✗ Không hỗ trợ |
| **Quản lý ngôn ngữ tự nhiên** | ✓ Hỗ trợ | ✗ Cần chỉnh sửa thủ công |
| **Công cụ chẩn đoán** | ✓ `/doctor` | ✗ Không có |
| **Tải lại nóng** | ✓ Tải lại tự động | ✗ Cần khởi động lại ứng dụng |
| **Trường hợp sử dụng** | Quy trình phát triển, CI/CD | Sử dụng hàng ngày, văn phòng |

## Máy chủ MCP thường dùng

> 💡 Để biết danh sách hoàn chỉnh các máy chủ MCP, vui lòng tham khảo phụ lục [Kho máy chủ MCP](/vi-vn/appendix/mcp-servers/)

### Máy chủ GitHub

**Chức năng:** Issues, PR, quản lý kho lưu trữ

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

**Nhận Token:** https://github.com/settings/tokens

### Máy chủ SQLite

**Chức năng:** Truy vấn và quản lý cơ sở dữ liệu SQLite

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/database.db"]
    }
  }
}
```

### Máy chủ hệ thống tệp

**Chức năng:** Truy cập tệp trong thư mục được chỉ định

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    }
  }
}
```

### Tự động hóa trình duyệt Puppeteer

**Chức năng:** Điều khiển trình duyệt, ảnh chụp, kiểm tra tự động hóa

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### Máy chủ tìm kiếm Brave

**Chức năng:** Tìm kiếm web

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-brave-api-key"
      }
    }
  }
}
```

## Tài liệu tham khảo

### Tài liệu chính thức

- [Tài liệu chính thức Claude Code - MCP](https://docs.anthropic.com/zh-CN/docs/claude-code/mcp)
- [Trang web chính thức MCP](https://modelcontextprotocol.io/)
- [Tài liệu đặc tả MCP](https://modelcontextprotocol.io/specification/)
- [Kho lưu trữ GitHub MCP](https://github.com/modelcontextprotocol)

### Máy chủ chính thức

- [@modelcontextprotocol/server-github](https://github.com/modelcontextprotocol/servers/tree/main/src/github) - Tích hợp GitHub
- [@modelcontextprotocol/server-sqlite](https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite) - Cơ sở dữ liệu SQLite
- [@modelcontextprotocol/server-postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) - Cơ sở dữ liệu PostgreSQL
- [@modelcontextprotocol/server-filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) - Truy cập hệ thống tệp
- [@modelcontextprotocol/server-puppeteer](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer) - Tự động hóa trình duyệt
- [@modelcontextprotocol/server-fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) - Cạo web
- [@modelcontextprotocol/server-brave-search](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) - Tìm kiếm Brave
- [@modelcontextprotocol/server-git](https://github.com/modelcontextprotocol/servers/tree/main/src/git) - Hoạt động Git

### Bài viết hướng dẫn

- [Giải thích chi tiết nguyên lý và thực hành MCP (tiếng Trung)](https://view.inews.qq.com/a/20250414A023WV00)
- [Kiến trúc MCP (Model Context Protocol) và nguyên lý hoạt động](https://m.toutiao.com/w/1826385835060307/)
- [Hướng dẫn mới nhất 2025 mô hình lớn: MCP từ bắt đầu đến thành thạo (tiếng Trung)](https://m.blog.csdn.net/weixin_45653328/article/details/150916706)
- [Bắt đầu từ đầu học MCP (Tám) - Xây dựng MCP server (tiếng Trung)](https://juejin.cn/post/7582510291667419187)

### Hướng dẫn cấu hình

- [Thực hành tốt nhất Claude Code](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Hướng dẫn cấu hình hoàn chỉnh Claude Code (tiếng Trung)](https://juejin.cn/post/7576838552472043563)

### Hướng dẫn phát triển

- [Hướng dẫn thực hành toàn diện xây dựng máy chủ MCP từ đầu TypeScript/Python (tiếng Trung)](https://m.blog.csdn.net/ztt123654/article/details/150844207)
- [Hướng dẫn xây dựng máy chủ MCP cuối cùng: Hướng dẫn hoàn chỉnh hai phiên bản TypeScript và Python (tiếng Trung)](https://m.blog.csdn.net/gitblog_00703/article/details/154862128)
- [Xây dựng máy chủ MCP đơn giản nhất bằng TypeScript (tiếng Trung)](https://m.blog.csdn.net/weixin_45653525/article/details/148433757)
- [Sử dụng Azure Container Apps tạo máy chủ MCP TypeScript](https://learn.microsoft.com/vi-vn/azure/developer/ai/build-mcp-server-ts)

### Tài nguyên máy chủ MCP

- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - Danh sách máy chủ MCP toàn diện nhất
- [Official MCP Registry](https://registry.modelcontextprotocol.io) - "App Store" chính thức của Anthropic
- [MCP.so](https://mcp.so) - Trung tâm máy chủ MCP cộng đồng
- [Glama.ai MCP](https://glama.ai/mcp/servers) - Thư mục MCP với xếp hạng và bình luận
- [Smithery](https://smithery.ai) - Thị trường máy chủ MCP
- [MCPHub](https://mcphub.io/registry) - Thư mục với giao diện đơn giản
- [LobeHub MCP](https://lobehub.com/zh/mcp) - Thư mục MCP tiếng Trung

### Dịch vụ bản đồ và thời tiết

- [High-Def Maps MCP Server](https://lobehub.com/zh/mcp/luozengchang-mcp-amap)
- [Tài liệu dịch vụ vị trí Tencent MCP (tiếng Trung)](https://lbs.qq.com/service/MCPServer/MCPServerGuide/overview)
- [Colorful Cloud Weather MCP Server](https://github.com/caiyunapp/mcp-caiyun-weather)
- [OpenWeatherMap MCP Server](https://github.com/CodeByWaqas/weather-mcp-server)

### Tài nguyên cộng đồng

- [Everything Claude Code Config](https://github.com/affaan-m/everything-claude-code) - Bộ sưu tập cấu hình Claude Code cấp sản xuất
- [AI Coding Guide](https://github.com/hacket/AICodingGuide) - Đường dẫn học tập Claude Code tiếng Trung

### Trường hợp ứng dụng thực tế

- [BlenderMCP - Mô hình 3D được hỗ trợ bởi AI](https://github.com/Belthur/blender-mcp) - 4.100+ ⭐
- [15 thực hành tốt nhất MCP trong môi trường sản xuất](https://learn.microsoft.com/vi-vn/azure/azure-functions/scenario-mcp-apps)
