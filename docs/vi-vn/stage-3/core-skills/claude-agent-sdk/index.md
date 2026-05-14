# Hướng Dẫn Hoàn Chỉnh Claude Agent SDK

## Lời Dẫn

Bạn có thể đã từng dùng API cơ bản của Claude——gửi một tin nhắn, nhận một câu trả lời, giống như trò chuyện vậy. Nhưng nếu bạn muốn Claude giúp bạn đọc file, chạy lệnh, tìm kiếm code, sửa bug, rồi tự xác minh kết quả và tiếp tục sửa……khả năng "tự động làm việc" như thế này, API cơ bản không thể làm được.

Claude Agent SDK được sinh ra cho chính scenario này. Nó gói gọn toàn bộ khả năng của Claude Code——đọc/ghi file, thực thi lệnh, tìm kiếm code, chỉnh sửa file, duyệt web——thành một thư viện có thể lập trình. Bạn không cần tự viết vòng lặp gọi tool, Claude sẽ tự thực thi tool, tự lặp lại, cho đến khi task thực sự hoàn thành.

Tóm lại một câu: SDK cơ bản là "bạn hỏi nó trả lời", Agent SDK là "bạn đặt hàng nó làm việc".

---

## Nó khác API cơ bản thế nào?

Hãy nhìn code, rõ ràng ngay:

```python
# anthropic SDK cơ bản: bạn phải tự viết vòng lặp xử lý tool calls
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Sửa bug trong auth.py"}],
    tools=[...]  # Bạn phải tự định nghĩa tools
)
# Claude nói muốn gọi một tool nào đó
while response.stop_reason == "tool_use":
    result = your_tool_executor(response.tool_use)  # Bạn phải tự thực thi
    response = client.messages.create(tool_result=result, **params)  # Bạn phải tự feed lại
```

```python
# Agent SDK: một dòng xong, Claude tự đọc file, tìm bug, sửa code
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Sửa bug trong auth.py",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
):
    print(message)  # Claude tự đọc file, định vị vấn đề, sửa code
```

Khác biệt rất rõ:

| So Sánh | anthropic SDK cơ bản | Claude Agent SDK |
|---------|-------------------|-----------------|
| Thực thi tool | Bạn tự viết | Claude tự làm |
| Vòng lặp tool | Bạn tự implement | Tích hợp sẵn agent loop |
| Tool tích hợp | Không, toàn bộ do bạn định nghĩa | Đọc/ghi file, Bash, tìm kiếm v.v. sẵn có |
| Quản lý context | Bạn tự duy trì | Tự động nén, tự động quản lý |
| Phù hợp cho scenario | Chat, sinh văn bản, tool use đơn giản | Tự hoàn thành task phức tạp |

---

## Nó khác agent framework khác thế nào?

Có rất nhiều Agent framework trên thị trường——LangChain, LlamaIndex, CrewAI, AutoGPT……Claude Agent SDK so với chúng có gì độc đáo?

> 📚 **So sánh chi tiết tham khảo phần phụ lục**: [So sánh các framework chính](/vi-vn/appendix/8-artificial-intelligence/ai-agents.html#_7-so-sánh-các-framework-chính)

Nói đơn giản:

| Framework | Scenario tối ưu nhất |
|------|-------------|
| **Claude Agent SDK** | Cho Claude tự hoàn thành development code, thao tác file, thực thi lệnh |
| **LangChain** | Xây dựng AI app phức tạp hơn, cần tùy chỉnh quy trình cao độ |
| **CrewAI** | Mô phỏng scenario cộng tác đa vai trò (như đội ảo, vai trò) |
| **LlamaIndex** | Xây dựng hệ thống QA kho kiến thức, kết nối dữ liệu doanh nghiệp với LLM |

---

## Cài đặt và Cấu Hình

### Cài đặt

Python cần 3.10+, TypeScript cần Node.js 18+:

```bash
# Python
pip install claude-agent-sdk

# TypeScript
npm install @anthropic-ai/claude-agent-sdk
```

### Xác thực

Chỉ cần set biến môi trường API Key:

```bash
export ANTHROPIC_API_KEY=your-api-key
```

Cũng hỗ trợ xác thực nền tảng đám mây:
- AWS Bedrock: set `CLAUDE_CODE_USE_BEDROCK=1` + AWS credentials
- Google Vertex AI: set `CLAUDE_CODE_USE_VERTEX=1` + GCP credentials
- Microsoft Azure: set `CLAUDE_CODE_USE_FOUNDRY=1` + Azure credentials

### Tùy chỉnh địa chỉ API

Nếu bạn dùng proxy, gateway hoặc endpoint API tự xây dựng, có thể thay đổi URL API mặc định qua tham số `env`:

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Hello",
    options=ClaudeAgentOptions(
        env={
            "ANTHROPIC_BASE_URL": "https://your-proxy.example.com",
            "ANTHROPIC_API_KEY": "your-api-key",
        }
    ),
):
    print(message)
```

`ClaudeAgentOptions` không có tham số `base_url` trực tiếp, nhưng trường `env` có thể truyền bất kỳ biến môi trường nào tới Claude Code CLI bên dưới. Các biến môi trường thường dùng:

| Biến môi trường | Mục đích |
|---------|------|
| `ANTHROPIC_BASE_URL` | Tùy chỉnh endpoint API (proxy, gateway) |
| `ANTHROPIC_API_KEY` | API key |
| `ANTHROPIC_AUTH_TOKEN` | Token xác thực thay thế |
| `ANTHROPIC_CUSTOM_HEADERS` | Custom request headers |

---

## Khái Niệm Cốt Lõi

Nguyên lý hoạt động của Agent SDK có thể tóm gọn trong một câu: **Tập hợp context → Thực thi hành động → Xác minh kết quả → Lặp lại**.

Đây chính là cách lập trình viên con người làm việc——trước tiên đọc code, rồi sửa code, sau đó chạy test xem kết quả, không đúng thì tiếp tục sửa. Agent SDK tự động hóa vòng lặp này.

### Hai chế độ sử dụng

**Chế độ một: Hàm `query()` —— Không stateful, thích hợp cho task đơn lẻ**

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="Thư mục này có những file nào?",
        options=ClaudeAgentOptions(allowed_tools=["Bash", "Glob"]),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

**Chế độ hai: `ClaudeSDKClient` —— Có stateful, thích hợp cho đối thoại nhiều vòng**

Khi bạn cần giữ context, tương tác nhiều vòng. Ví dụ trước tiên cho Claude đọc một module, rồi cho nó tìm tất cả nơi gọi module này——vòng thứ hai nó còn nhớ vòng thứ nhất đã đọc cái gì.

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    session_id = None

    # Vòng 1: Đọc code module xác thực
    async for message in query(
        prompt="Đọc code của module xác thực",
        options=ClaudeAgentOptions(allowed_tools=["Read", "Glob"]),
    ):
        if hasattr(message, "subtype") and message.subtype == "init":
            session_id = message.session_id

    # Vòng 2: Tiếp tục dựa vào context
    async for message in query(
        prompt="Tìm tất cả nơi gọi nó",
        options=ClaudeAgentOptions(resume=session_id),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

---

## Tool Tích Hợp: Sẵn có ngay lập tức

Đây là điểm tuyệt nhất của Agent SDK——bạn không cần implement bất kỳ tool nào, Claude có thể dùng ngay:

| Tool | Chức năng | Mục đích điển hình |
|------|------|---------|
| Read | Đọc file | Xem code, đọc config |
| Write | Tạo file | Sinh file mới |
| Edit | Chỉnh sửa chính xác file | Sửa bug, refactor |
| Bash | Thực thi lệnh terminal | Chạy test, cài dependency, git |
| Glob | Tìm file theo pattern | `**/*.py`, `src/**/*.ts` |
| Grep | Tìm kiếm regex nội dung file | Tìm hàm, tìm TODO |
| WebSearch | Tìm kiếm web | Tìm tài liệu, tìm giải pháp |
| WebFetch | Lấy nội dung web | Đọc tài liệu online |
| Task | Khởi động sub agent | Xử lý sub task song song |

Kiểm soát tool nào agent có thể dùng thông qua tham số `allowed_tools`:

```python
# Agent chỉ đọc: chỉ xem, không thay đổi
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Glob", "Grep"],
    permission_mode="bypassPermissions"
)

# Agent toàn năng: có thể đọc, ghi, chạy lệnh
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
)
```

---

## Tính năng Nâng Cao

### Hooks: Chèn logic của bạn ở các điểm quan trọng

Hooks cho phép bạn chèn code tùy chỉnh tại những thời điểm quan trọng của agent——ví dụ ghi log, chặn thao tác nguy hiểm, audit thay đổi file.

Loại Hook được hỗ trợ: `PreToolUse` (trước khi thực thi tool), `PostToolUse` (sau khi thực thi tool), `Stop` (agent dừng), `SessionStart`, `SessionEnd` v.v.

```python
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# Mỗi lần file bị sửa, ghi vào audit log
async def log_file_change(input_data, tool_use_id, context):
    file_path = input_data.get("tool_input", {}).get("file_path", "unknown")
    with open("./audit.log", "a") as f:
        f.write(f"{datetime.now()}: modified {file_path}\n")
    return {}

async def main():
    async for message in query(
        prompt="Refactor utils.py để nâng cao khả năng đọc",
        options=ClaudeAgentOptions(
            permission_mode="acceptEdits",
            hooks={
                "PostToolUse": [
                    HookMatcher(matcher="Edit|Write", hooks=[log_file_change])
                ]
            },
        ),
    ):
        if hasattr(message, "result"):
            print(message.result)
```

Mục đích thực tế:
- Audit log: Ghi từng bước của agent
- Chặn bảo mật: Ngăn agent sửa một số file quan trọng
- Thông báo push: Agent hoàn thành task thì gửi message
- Giám sát chi phí: Thống kê số lần gọi tool và token tiêu thụ

### Sub Agent: Chia task lớn cho chuyên gia

Khi task đủ phức tạp, bạn có thể định nghĩa nhiều sub agent chuyên biệt, cho main agent phân công sub task cho chúng. Mỗi sub agent có hướng dẫn và quyền tool riêng, không ảnh hưởng lẫn nhau.

```python
from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition

async for message in query(
    prompt="Dùng code-reviewer agent để audit chất lượng code của dự án này",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep", "Task"],
        agents={
            "code-reviewer": AgentDefinition(
                description="Chuyên gia review code, chịu trách nhiệm kiểm tra chất lượng và bảo mật",
                prompt="Phân tích chất lượng code, tìm ra vấn đề tiềm ẩn và đưa ra gợi ý cải thiện.",
                tools=["Read", "Glob", "Grep"],
            ),
            "test-writer": AgentDefinition(
                description="Chuyên gia test, chịu trách nhiệm viết unit test",
                prompt="Viết unit test cho những hàm thiếu test.",
                tools=["Read", "Write", "Bash"],
            ),
        },
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

Tin nhắn của sub agent sẽ mang trường `parent_tool_use_id`, tiện cho bạn theo dõi tin nhắn nào đến từ sub agent nào.

### Tích hợp MCP: Kết nối thế giới bên ngoài

Qua Model Context Protocol (MCP), agent của bạn có thể kết nối cơ sở dữ liệu, trình duyệt, third-party API v.v. Cộng đồng đã có [hàng trăm MCP server](https://github.com/modelcontextprotocol/servers) có thể dùng ngay.

```python
# Kết nối Playwright, cho agent có thể tương tác trình duyệt
async for message in query(
    prompt="Mở example.com và mô tả cái bạn thấy",
    options=ClaudeAgentOptions(
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        }
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

Scenario tích hợp MCP phổ biến:
- Playwright: Tự động hóa trình duyệt, lấy dữ liệu web, điền form
- PostgreSQL/MySQL: Truy vấn và tương tác cơ sở dữ liệu trực tiếp
- Slack/Email: Gửi thông báo và tin nhắn
- GitHub: Tương tác PR, Issue, repo code

---

## Có thể làm gì? Scenario Thực Tế

Sau khi hiểu rõ chức năng, câu hỏi quan trọng nhất là: cái này có thể dùng để làm gì? Dưới đây là các scenario thực tế đã được cộng đồng xác minh.

### Scenario 1: Auto Fix Bug Agent

Cho nó mô tả bug, nó tự tìm code, định vị vấn đề, sửa, chạy test xác minh:

```python
async for message in query(
    prompt="Người dùng báo cáo đôi lúc bị lỗi 500 khi đăng nhập, hãy kiểm tra code trong src/auth/ và sửa",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
        permission_mode="acceptEdits",
    ),
):
    print(message)
```

Claude sẽ tự grep error log, đọc code liên quan, tìm bug, sửa code, chạy test xác minh fix.

### Scenario 2: Code Review Agent

Xây dựng một code review agent chỉ đọc, audit chất lượng code nhưng không thay đổi:

```python
async for message in query(
    prompt="Review code trong thư mục src/, tập trung vào lỗ hổng bảo mật, vấn đề hiệu năng và quy tắc code",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep"],
        permission_mode="bypassPermissions",
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

### Scenario 3: CI/CD Integration

Trong pipeline CI/CD, cho agent tự động phân tích test fail và cố gắng sửa:

```python
async for message in query(
    prompt="Chạy npm test, phân tích test case fail, sửa code để tất cả test pass",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob"],
        max_turns=20,
    ),
):
    print(message)
```

Đây là scenario ưu thế lớn nhất của Agent SDK so với CLI——CLI thích hợp cho con người ngồi tại terminal tương tác, SDK thích hợp nhúng vào quy trình tự động.

### Scenario 4: Research Agent

Cho agent tìm kiếm web, đọc tài liệu, tổng hợp thông tin rồi output báo cáo:

```python
async for message in query(
    prompt="Điều tra các web framework Python chính thống năm 2026, so sánh FastAPI, Django, Litestar, output báo cáo technical selection vào report.md",
    options=ClaudeAgentOptions(
        allowed_tools=["WebSearch", "WebFetch", "Write"],
    ),
):
    print(message)
```

### Scenario 5: Full-stack Agent với Trình Duyệt

Qua MCP tích hợp Playwright, agent không chỉ viết code mà còn mở trình duyệt xác minh hiệu quả:

```python
async for message in query(
    prompt="Sửa vấn đề style trang chủ, rồi mở trình duyệt chụp ảnh xác minh hiệu quả",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash"],
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        },
    ),
):
    print(message)
```

### Bảng tra cứu nhanh Scenario

| Scenario | Tool lõi | Độ khó |
|------|---------|------|
| Auto Fix Bug | Read, Edit, Bash, Grep | Cơ bản |
| Code Review | Read, Glob, Grep | Cơ bản |
| CI/CD Auto Fix | Read, Edit, Bash | Trung bình |
| Technical Research Report | WebSearch, WebFetch, Write | Cơ bản |
| Browser Automation | MCP (Playwright) | Trung bình |
| Multi-Agent Collaboration | Task + AgentDefinition | Nâng cao |
| Database Operations | MCP (PostgreSQL/MySQL) | Trung bình |
| Email/Notification Assistant | MCP (Slack/Email) | Trung bình |

---

## Khi nào nên dùng Agent SDK?

Không phải scenario nào cũng cần Agent SDK. Chọn đúng tool rất quan trọng:

| Bạn muốn làm gì | Nên dùng gì |
|-----------|---------|
| Chat đơn giản, sinh văn bản, dịch | SDK `anthropic` cơ bản |
| Tool use đơn lẻ (tìm thời tiết, tính toán) | SDK `anthropic` cơ bản |
| Tự hoàn thành task development đa bước | Agent SDK |
| Nhúng vào pipeline CI/CD | Agent SDK |
| Xây dựng app có thể tương tác file system | Agent SDK |
| Development tương tác hàng ngày | Claude Code CLI |
| Task nhanh chóng một lần | Claude Code CLI |

Nói đơn giản: nếu task của bạn cần Claude "tự tay làm việc" (đọc file, sửa code, chạy lệnh), dùng Agent SDK. Nếu chỉ "hỏi đáp", SDK cơ bản là đủ.

---

## Thực Tế Enterprise: Xây Dựng Pipeline Giám Sát Chất Lượng Code

Các scenario trước đây là agent đơn lẻ làm một việc. Nhưng trong môi trường doanh nghiệp thực tế, bạn cần một pipeline hoàn chỉnh——nhiều agent nối tiếp hợp tác, mỗi bước có input/output rõ ràng, có audit, có rollback, có thông báo.

Dưới đây chúng ta xây dựng một scenario thực tế: **Mỗi lần PR submit, tự động trigger code review → security scan → auto fix → test verify → generate report** của pipeline hoàn chỉnh.

### Thiết kế Kiến Trúc

```
PR Submit
  │
  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Code Review  │───▶│  Security    │───▶│  Auto Fix     │
│  Agent        │    │  Scan Agent  │    │  Agent        │
│ (Read-only)   │    │ (Read-only)  │    │ (Writable)    │
└─────────────┘    └─────────────┘    └─────────────┘
                                            │
                                            ▼
                                     ┌─────────────┐    ┌─────────────┐
                                     │  Test        │───▶│  Report      │
                                     │  Verify      │    │  Generation  │
                                     │  Agent       │    │  Agent       │
                                     │ (Bash)       │    │ (Write)      │
                                     └─────────────┘    └─────────────┘
                                                              │
                                                              ▼
                                                        Slack Notification
```

Ý tưởng cốt lõi: **Mỗi agent chỉ làm một việc, quyền tối thiểu, kết quả nối tiếp truyền**.

### Bước 1: Định nghĩa Framework Pipeline

```python
import asyncio
import json
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# Audit log: Ghi từng bước của mỗi agent
audit_log = []

async def audit_hook(input_data, tool_use_id, context):
    audit_log.append({
        "time": datetime.now().isoformat(),
        "tool": input_data.get("tool_name"),
        "input": input_data.get("tool_input", {}),
    })
    return {}

# Cấu hình hook chung: Tất cả agent chia sẻ khả năng audit
audit_hooks = {
    "PostToolUse": [HookMatcher(matcher=".*", hooks=[audit_hook])]
}
```

### Bước 2: Code Review Agent (Read-only)

```python
async def run_code_review(pr_diff: str) -> str:
    """Agent chỉ đọc, review chất lượng code, output báo cáo có cấu trúc"""
    result_text = ""
    async for message in query(
        prompt=f"""Review PR diff sau đây, phân tích từ các khía cạnh:
1. Quy tắc code: đặt tên, format, comment
2. Vấn đề logic: điều kiện biên, null pointer, race condition
3. Tiềm ẩn hiệu năng: N+1 query, memory leak, loop không cần thiết
4. Khả năng maintain: function quá dài, responsibility không rõ, magic number

PR Diff:
{pr_diff}

Output định dạng JSON: {{"issues": [{{"severity": "high/medium/low", "file": "...", "line": ..., "description": "..."}}], "summary": "..."}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=10,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Bước 3: Security Scan Agent (Read-only)

```python
async def run_security_scan() -> str:
    """Agent chỉ đọc, tập trung scan lỗ hổng bảo mật"""
    result_text = ""
    async for message in query(
        prompt="""Scan lỗ hổng bảo mật trong code dự án:
1. SQL injection, XSS, CSRF
2. Key hoặc credential bị hard-code
3. Version dependency không an toàn
4. Kiểm tra quyền hạn bị thiếu

Output JSON: {{"vulnerabilities": [{{"severity": "critical/high/medium", "type": "...", "file": "...", "description": "...", "fix_suggestion": "..."}}]}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep", "Bash"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Bước 4: Auto Fix Agent (Writable)

```python
async def run_auto_fix(review_result: str, security_result: str) -> str:
    """Agent có thể ghi, sửa code dựa trên audit và security result"""
    result_text = ""
    async for message in query(
        prompt=f"""Dựa trên kết quả audit sau đây sửa code:

Code Review Report:
{review_result}

Security Scan Report:
{security_result}

Quy tắc sửa:
1. Chỉ sửa vấn đề severity high hoặc critical
2. Sau mỗi sửa chạy test liên quan để xác minh không break code hiện tại
3. Đừng refactor code vô liên quan, chỉ sửa tối thiểu
4. Sau sửa xong output danh sách file đã sửa""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
            permission_mode="acceptEdits",
            hooks=audit_hooks,
            max_turns=30,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Bước 5: Test Verify + Report Generation

```python
async def run_test_and_report(fix_result: str) -> str:
    """Chạy test, sinh báo cáo cuối cùng"""
    result_text = ""
    async for message in query(
        prompt=f"""Thực thi các thao tác sau:
1. Chạy toàn bộ test suite (npm test hoặc pytest)
2. Thống kê tỷ lệ test pass
3. Sinh báo cáo định dạng Markdown vào pr-report.md, bao gồm:
   - Số lượng và phân bố severity của vấn đề tìm thấy
   - Số lượng lỗ hổng bảo mật
   - Nội dung auto fix: {fix_result}
   - Tỷ lệ test pass
   - Kết luận cuối cùng: có nên merge không""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Bash", "Write", "Glob"],
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Bước 6: Nối tiếp toàn bộ Pipeline

```python
import subprocess

async def run_pipeline():
    """Pipeline giám sát chất lượng PR hoàn chỉnh"""
    print("🔍 Bước 1/4: Code Review...")
    pr_diff = subprocess.run(
        ["git", "diff", "main...HEAD"], capture_output=True, text=True
    ).stdout
    review_result = await run_code_review(pr_diff)

    print("🛡️ Bước 2/4: Security Scan...")
    security_result = await run_security_scan()

    print("🔧 Bước 3/4: Auto Fix...")
    fix_result = await run_auto_fix(review_result, security_result)

    print("✅ Bước 4/4: Test Verify + Sinh báo cáo...")
    report = await run_test_and_report(fix_result)

    # Lưu audit log
    with open("audit-log.json", "w") as f:
        json.dump(audit_log, f, indent=2, ensure_ascii=False)

    print(f"Pipeline hoàn thành, audit log đã lưu (tổng {len(audit_log)} bản ghi thao tác)")
    return report

asyncio.run(run_pipeline())
```

### Thiết kế Thinking Enterprise

Pipeline này thể hiện một vài nguyên tắc thiết kế enterprise chính:

**Quyền Tối Thiểu**: Agent code review và security scan chỉ có quyền read-only, không thể sửa code sai. Chỉ auto fix agent mới có quyền write, lại giới hạn ở chế độ `acceptEdits`.

**Có Thể Audit**: Mỗi bước của mỗi agent được Hook ghi vào audit log. Có vấn đề có thể backtrack là agent nào tại thời gian nào làm thao tác gì.

**Kết Quả Nối Tiếp**: Output agent trước là input agent sau. Kết quả code review feed cho auto fix, kết quả auto fix feed cho test verify. Mỗi bước có contract input/output rõ ràng.

**Chi Phí Kiểm Soát**: Mỗi agent set `max_turns`, ngăn agent nào đó fail lặp lại vô tận. Môi trường production còn có thể thêm `max_budget_usd` để kiểm soát chi phí.

**Mở Rộng**: Muốn thêm bước mới? Ví dụ thêm agent "check tài liệu" hoặc agent "benchmark hiệu năng"? Chỉ cần viết hàm mới, insert vào pipeline xong.

Pattern này có thể direct nhúng vào GitHub Actions hoặc GitLab CI, mỗi lần PR tự động trigger, thực sự làm được "AI-driven code quality guardian".

---

## Error Handling

Agent SDK cung cấp clear exception type, tiện để làm error handling tốt ở production:

```python
from claude_agent_sdk import query, CLINotFoundError, ProcessError

try:
    async for msg in query(prompt="Phân tích code"):
        print(msg)
except CLINotFoundError:
    print("Claude Code CLI chưa cài, hãy cài trước")
except ProcessError as e:
    print(f"Process exit bất thường, exit code: {e.exit_code}")
```

---

## Tóm Lại

Giá trị cốt lõi của Claude Agent SDK là nâng cấp "model reasoning" lên "controlled execution". Nó không chỉ sinh text, mà có thể thực sự hoàn thành task trong một hệ thống tool có thể audit, có thể constraint.

Nhớ lấy một câu trong Anthropic official blog: Triết lý thiết kế Agent SDK là "cho agent một cái máy tính, để nó làm việc giống người".

Agent app tốt = thiết kế tool rõ ràng + task boundary rõ ràng + có độ giám sát từ người. Tool cho agent khả năng, boundary cho nó constraint, giám sát cho bạn confidence. Ba cái thiếu một cái không được.

---

## Tài Liệu Tham Khảo

### Tài Nguyên Chính Thức

- [Tài liệu chính thức Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview) - Tham khảo quyền tối tân nhất
- [GitHub - claude-agent-sdk-python](https://github.com/anthropics/claude-code-sdk-python) - Python SDK source
- [GitHub - claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) - TypeScript SDK source
- [Sample Agent Projects](https://github.com/anthropics/claude-agent-sdk-demos) - Email assistant, research agent v.v.

### Blog và Hướng Dẫn

- [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk) - Anthropic official engineering blog, giải thích triết lý thiết kế và kiến trúc
- [Claude Agent SDK Python Learning Guide](https://redreamality.com/blog/claude-agent-sdk-python-) - Thân thiện, hướng dẫn hoàn chỉnh từ không
- [Claude Agent SDK Complete Tutorial](https://blog.wenhaofree.com/en/posts/articles/claude-agent-sdk-tutorial/) - Tool system, Agent Loop, controlled execution thực hành
- [12 Practical Agent SDK Use Cases](https://skywork.ai/blog/claude-agent-sdk-use-cases-2025/) - Bao gồm coding, data, automation v.v.
- [Step-by-Step Agent Tutorial](https://skywork.ai/blog/how-to-use-claude-agent-sdk-step-by-step-ai-agent-tutorial/) - TypeScript + Python dual track
