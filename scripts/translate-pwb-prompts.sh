#!/usr/bin/env bash
# Dịch personal-website-blog cho phép dịch nội dung bên trong ```markdown code fences
# (là các prompt mẫu dành cho người học gửi AI).

set -u
cd "$(dirname "$0")/.."
SRC="docs/zh-cn/stage-3/personal-brand/personal-website-blog/index.md"
DST="docs/vi-vn/stage-3/personal-brand/personal-website-blog/index.md"

SYS='You are a deterministic Chinese-to-Vietnamese translator for VitePress markdown.
This file contains code fences. There are TWO types:
- ```markdown ... ``` fences: these are SAMPLE PROMPTS a learner would copy and send to an AI IDE. TRANSLATE the Chinese content inside these fences to Vietnamese so Vietnamese learners can use them directly.
- All other code fences (```bash, ```js, ```python, ```yaml, etc.): these are real code. Do NOT translate code. Only translate Chinese comments inside them.

Other rules:
- Preserve YAML frontmatter keys, inline code, URLs, image syntax, HTML/Vue tags.
- Translate frontmatter STRING VALUES only.
- Rewrite /zh-cn/ to /vi-vn/.
- Keep tech terms English (AI, IDE, prompt, agent, vibe coding, Jekyll, Git, GitHub, Markdown).
- Keep product names: Claude, Cursor, Trae, VS Code, GitHub Pages, Jekyll.
- Friendly bạn tone.
- Output ONLY the translated markdown body. No preface, no closing remark.'

cat "$SRC" | claude -p "Translate this Chinese VitePress markdown to Vietnamese. Translate sample prompts inside markdown code fences. Output translated markdown only." \
  --model sonnet \
  --system-prompt "$SYS" \
  --output-format text > /tmp/pwb-vi.md 2>&1
rc=$?
size=$(wc -c < /tmp/pwb-vi.md)
echo "rc=$rc size=${size}B"
if [ $rc -eq 0 ] && [ "$size" -gt 30000 ]; then
  sed -i "s|/zh-cn/|/vi-vn/|g" /tmp/pwb-vi.md
  mv /tmp/pwb-vi.md "$DST"
  echo "OK"
else
  echo "FAIL — keep existing"
  head -3 /tmp/pwb-vi.md
fi
