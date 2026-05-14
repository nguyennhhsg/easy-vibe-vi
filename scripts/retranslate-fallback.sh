#!/usr/bin/env bash
# Dịch lại các file bị lỗi Vue bằng Sonnet + prompt bảo toàn Vue prop arrays.

set -u
cd "$(dirname "$0")/.."

FILES=(
  "stage-1/learning-map/index.md"
  "stage-1/introduction-to-ai-ide/index.md"
  "stage-1/building-prototype/index.md"
  "stage-1/appendix-idea-sources/index.md"
)

SYS='You are a deterministic Chinese-to-Vietnamese markdown translator for VitePress + Vue SFC.
You NEVER ask questions, NEVER explain, NEVER spawn agents, NEVER use tools. You ONLY output translated markdown.

CRITICAL syntax preservation (any violation breaks the build):
1. Vue component tags <Component prop="..."> must remain syntactically identical except for translated string values.
2. Inside :items="[{title: '\''X'\'', description: '\''Y'\''}]" prop arrays: translate the X/Y strings but NEVER introduce stray '\'' or " chars in them. If a translation would contain an apostrophe, rephrase or omit it. Same for double-quote inside double-quoted props.
3. Preserve YAML frontmatter keys, code fences ```...```, inline code `...`, image syntax ![](...), URLs, file paths, and <script setup>...</script> blocks ENTIRELY (do not translate JS).
4. In YAML frontmatter, translate ONLY string values of: title, description, text, tagline, name.
5. Inside code blocks: do NOT translate code; translate Chinese comments only.
6. Rewrite /zh-cn/ -> /vi-vn/ in all links and props.
7. Keep tech terms in English: AI, IDE, API, MCP, prompt, agent, vibe coding, RAG, LLM, frontend, backend, framework, repo, commit, pull request.
8. Keep product names: Claude, Cursor, VS Code, GitHub, Supabase, Stripe, Figma, MCP, Anthropic.
9. Address learner as "bạn".
10. Output ONLY translated markdown body. No preface, no closing remark, no surrounding fence, no explanation.'

ok=0
fail=0
for rel in "${FILES[@]}"; do
  src="docs/zh-cn/$rel"
  dst="docs/vi-vn/$rel"
  echo "=== $rel ==="
  if [ ! -f "$src" ]; then echo "  no src"; fail=$((fail+1)); continue; fi
  tmp=$(mktemp)
  cat "$src" | claude -p "Translate the Chinese markdown on stdin to Vietnamese, preserving Vue/HTML/script syntax exactly per the system rules." \
    --model sonnet \
    --system-prompt "$SYS" \
    --output-format text > "$tmp" 2>&1
  rc=$?
  size=$(wc -c < "$tmp")
  src_size=$(wc -c < "$src")
  # Sanity: output should be at least 50% of source size
  min=$((src_size / 2))
  if [ $rc -eq 0 ] && [ "$size" -gt "$min" ]; then
    sed -i "s|/zh-cn/|/vi-vn/|g" "$tmp"
    mkdir -p "$(dirname "$dst")"
    mv "$tmp" "$dst"
    echo "  OK ${size}B (src ${src_size}B)"
    ok=$((ok+1))
  else
    echo "  FAIL rc=$rc size=${size}B src=${src_size}B"
    echo "  head:"
    head -3 "$tmp"
    rm -f "$tmp"
    fail=$((fail+1))
  fi
done
echo "Done. ok=$ok fail=$fail"
