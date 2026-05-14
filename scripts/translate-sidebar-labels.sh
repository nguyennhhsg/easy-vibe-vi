#!/usr/bin/env bash
# Đọc danh sách label tiếng Trung, gửi cho claude -p để dịch sang tiếng Việt.
# Output: JSON map { "中文": "Tiếng Việt" } ghi vào scripts/sidebar-labels-zh-to-vi.json.

set -u
cd "$(dirname "$0")/.."

INPUT="scripts/sidebar-labels-zh-to-vi.json"
OUTPUT="$INPUT"

SYS='You translate a JSON object of Chinese UI labels (sidebar/nav text) for a Vibe Coding course to Vietnamese.

Rules:
- Output ONLY a valid JSON object, no preamble, no markdown fence.
- Same keys (Chinese), values become Vietnamese translation.
- Translate naturally for an educational technology context.
- Keep these English/Latin tokens unchanged inside the strings: AI, IDE, API, MCP, RAG, LLM, VLM, UI, UX, DevOps, CI/CD, Git, GitHub, Docker, Kubernetes, Node, React, Vue, Linux, OS, CPU, GPU, SQL, NoSQL, JSON, HTTP, HTTPS, DNS, CDN, SSH, OAuth, JWT, B2B, B2C, C++, Java, JavaScript, TypeScript, Python, Go, Rust, Cursor, Claude, GPT, Supabase, Stripe, Figma, Dify, Vibe Coding, Vibe.
- Keep numbers, version strings, and codes like "0-1", "Stage 1" intact.
- Use "bạn" tone where appropriate (but most labels are noun phrases).
- Be concise — labels are sidebar/nav items.'

# Read input JSON and pipe to claude
cat "$INPUT" | claude -p "Translate this JSON of Chinese UI labels to Vietnamese. Output the JSON only (same keys, Vietnamese values)." \
  --model sonnet \
  --system-prompt "$SYS" \
  --output-format text > /tmp/sidebar-trans.json 2>&1
rc=$?
size=$(wc -c < /tmp/sidebar-trans.json)
echo "rc=$rc size=${size}B"
if [ $rc -ne 0 ]; then
  echo "FAIL:"
  head -5 /tmp/sidebar-trans.json
  exit 1
fi

# Strip optional ```json fence
sed -i 's/^```json//; s/^```//; /^```$/d' /tmp/sidebar-trans.json

# Validate JSON
if ! node -e "JSON.parse(require('fs').readFileSync('/tmp/sidebar-trans.json','utf8'))" 2>&1; then
  echo "Invalid JSON output. Head:"
  head -10 /tmp/sidebar-trans.json
  exit 2
fi

cp /tmp/sidebar-trans.json "$OUTPUT"
node -e "
const d = JSON.parse(require('fs').readFileSync('$OUTPUT','utf8'));
const total = Object.keys(d).length;
const translated = Object.values(d).filter(v => v && v !== null).length;
console.log('Total labels:', total, 'Translated:', translated);
"
