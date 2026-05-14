#!/usr/bin/env bash
# Dịch toàn bộ docs/zh-cn/**/*.md sang docs/vi-vn/ qua claude -p.
# Usage: bash scripts/translate-zh-to-vi.sh [concurrency] [model]
# Env: FORCE=1 để dịch lại các file đã tồn tại.

set -u
cd "$(dirname "$0")/.."

CONCURRENCY="${1:-6}"
MODEL="${2:-haiku}"
SRC="docs/zh-cn"
DST="docs/vi-vn"

SYSTEM_PROMPT='You are a deterministic Chinese-to-Vietnamese markdown translator. You NEVER ask questions, NEVER explain. Output ONLY the translated markdown.
Rules:
1. Preserve EXACTLY: YAML frontmatter keys, code fences, inline code, URLs, file paths, image syntax, HTML/Vue tags and props.
2. In YAML frontmatter, translate ONLY string VALUES of: title, description, text, tagline, name.
3. Inside code blocks: do NOT translate code. Only translate Chinese comments inside code.
4. Rewrite every internal link "/zh-cn/" -> "/vi-vn/".
5. Keep tech terms untouched: AI, IDE, prompt, agent, API, frontend, backend, framework, repo, commit, pull request, vibe coding. Keep product names untouched: Claude, Cursor, VS Code, Supabase, Stripe, Figma, GitHub, MCP, Anthropic.
6. Tone: natural educational Vietnamese, address learner as "bạn".
7. Output ONLY the translated markdown body — no preface, no closing remark, no surrounding fence.
The user message contains source markdown between <SOURCE> and </SOURCE> tags. Output the translated content WITHOUT the tags.'

translate_one() {
  local src="$1"
  local rel="${src#$SRC/}"
  local dst="$DST/$rel"
  if [ -z "${FORCE:-}" ] && [ -f "$dst" ]; then
    echo "SKIP $rel"
    return 0
  fi
  mkdir -p "$(dirname "$dst")"
  local start=$(date +%s)
  local tmp
  tmp=$(mktemp)
  {
    printf '%s\n' '<SOURCE>'
    cat "$src"
    printf '\n%s\n' '</SOURCE>'
  } | claude -p "Translate the markdown inside <SOURCE>...</SOURCE> from Chinese to Vietnamese per the system rules. Output translated body only." \
        --model "$MODEL" \
        --append-system-prompt "$SYSTEM_PROMPT" \
        --output-format text > "$tmp" 2>/dev/null
  local rc=$?
  if [ $rc -ne 0 ] || [ ! -s "$tmp" ]; then
    echo "ERR  $rel (rc=$rc)"
    rm -f "$tmp"
    return 1
  fi
  # Belt-and-suspenders link rewrite
  sed -i 's|/zh-cn/|/vi-vn/|g' "$tmp"
  mv "$tmp" "$dst"
  local elapsed=$(( $(date +%s) - start ))
  echo "OK   $rel (${elapsed}s)"
}

export -f translate_one
export SRC DST MODEL SYSTEM_PROMPT FORCE

# Build list of files
mapfile -t files < <(find "$SRC" -type f -name "*.md" | sort)
total=${#files[@]}
echo "Found $total .md files. concurrency=$CONCURRENCY model=$MODEL force=${FORCE:-0}"

# Process in parallel
printf '%s\n' "${files[@]}" | xargs -P "$CONCURRENCY" -I {} bash -c 'translate_one "$@"' _ {}

echo "=== DONE ==="
echo "vi-vn .md count: $(find $DST -type f -name '*.md' | wc -l)"
