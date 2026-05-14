#!/usr/bin/env bash
# Dịch 1 file lớn bằng cách chia theo H2 (## ) headers, dịch từng chunk bằng
# claude -p (sonnet), rồi nối lại. Bảo toàn frontmatter + script blocks.
#
# Usage:
#   bash scripts/chunked-translate.sh <SRC> <DST> [START_LINE] [END_LINE]
# Ví dụ:
#   bash scripts/chunked-translate.sh docs/zh-cn/foo.md docs/vi-vn/foo.md
#   bash scripts/chunked-translate.sh docs/zh-cn/big.md /tmp/big-a.md 1 1369

set -u
cd "$(dirname "$0")/.."

SRC="$1"
DST="$2"
START_LINE="${3:-1}"
END_LINE="${4:-0}"

if [ ! -f "$SRC" ]; then
  echo "Source not found: $SRC" >&2
  exit 1
fi

# Cắt theo phạm vi dòng nếu cần
WORK=$(mktemp)
if [ "$END_LINE" -gt 0 ]; then
  sed -n "${START_LINE},${END_LINE}p" "$SRC" > "$WORK"
else
  cp "$SRC" "$WORK"
fi

src_size=$(wc -c < "$WORK")
echo "Source range: ${START_LINE}..${END_LINE:-end} (${src_size}B)"

# Tách frontmatter (chỉ chunk đầu mới có)
FM=$(mktemp)
BODY=$(mktemp)
if head -1 "$WORK" | grep -q '^---$'; then
  awk 'NR==1 {in_fm=1; print; next} in_fm==1 && /^---$/ {print; in_fm=2; next} in_fm==2 {print > "/dev/stderr"; next} {print > "/dev/stderr"}' "$WORK" > "$FM" 2> "$BODY"
else
  : > "$FM"
  cp "$WORK" "$BODY"
fi

# Chia BODY theo H2 (## ) bằng awk; mỗi chunk được lưu vào /tmp/chunk_NNN.md
CHUNKS_DIR=$(mktemp -d)
awk -v dir="$CHUNKS_DIR" '
  BEGIN { n=0 }
  /^## / {
    if (out) close(out)
    n++
    out = sprintf("%s/chunk_%03d.md", dir, n)
  }
  {
    if (!out) {
      n=1
      out = sprintf("%s/chunk_%03d.md", dir, n)
    }
    print > out
  }
' "$BODY"

count=$(ls "$CHUNKS_DIR" | wc -l)
echo "Split into $count chunks"

SYS='You are a deterministic Chinese-to-Vietnamese markdown translator for VitePress.
You NEVER ask questions, NEVER explain, NEVER spawn tools. Output ONLY translated markdown.
Rules:
1. Preserve frontmatter keys, code fences, inline code, URLs, image paths, HTML/Vue tags and prop names EXACTLY.
2. Translate only STRING values, not keys or code.
3. Inside Vue prop arrays like :items="[{title: '"'"'X'"'"'}]" translate the X strings but never introduce stray apostrophes or quotes.
4. Inside code blocks: do not translate code; translate Chinese comments only.
5. Rewrite /zh-cn/ to /vi-vn/.
6. Keep tech terms in English (AI, IDE, API, MCP, prompt, agent, RAG, LLM, frontend, backend, vibe coding) and product names (Claude, Cursor, VS Code, GitHub, Supabase, Stripe, Figma, MCP, Anthropic).
7. Address learner as bạn.
8. Output ONLY translated markdown body — no preface, no closing remark, no surrounding code fence.'

translate_chunk() {
  local in="$1"
  local out="$2"
  local sz=$(wc -c < "$in")
  cat "$in" | claude -p "Translate the Chinese markdown on stdin to Vietnamese per the system rules. Output only translated markdown." \
    --model sonnet \
    --system-prompt "$SYS" \
    --output-format text > "$out" 2>&1
  local rc=$?
  local osz=$(wc -c < "$out")
  if [ $rc -ne 0 ] || [ "$osz" -lt $((sz / 4)) ]; then
    echo "  CHUNK FAIL rc=$rc in=${sz}B out=${osz}B" >&2
    return 1
  fi
  # Rewrite zh-cn paths
  sed -i 's|/zh-cn/|/vi-vn/|g' "$out"
  echo "  chunk ok in=${sz}B out=${osz}B"
  return 0
}

# Translate frontmatter (if any)
RESULT=$(mktemp)
: > "$RESULT"
if [ -s "$FM" ]; then
  TFM=$(mktemp)
  if translate_chunk "$FM" "$TFM"; then
    cat "$TFM" >> "$RESULT"
    echo "" >> "$RESULT"
  else
    cat "$FM" >> "$RESULT"
    echo "" >> "$RESULT"
  fi
  rm -f "$TFM"
fi

# Translate each body chunk
failed=0
total=0
for chunk in $(ls "$CHUNKS_DIR"/chunk_*.md | sort); do
  total=$((total + 1))
  T=$(mktemp)
  echo "[$total/$count] $(basename "$chunk")"
  if translate_chunk "$chunk" "$T"; then
    cat "$T" >> "$RESULT"
  else
    cat "$chunk" >> "$RESULT"
    failed=$((failed + 1))
  fi
  rm -f "$T"
done

final_size=$(wc -c < "$RESULT")
echo "Combined: ${final_size}B (source ${src_size}B). Failed chunks: $failed/$total"

mkdir -p "$(dirname "$DST")"
mv "$RESULT" "$DST"
rm -rf "$CHUNKS_DIR" "$FM" "$BODY" "$WORK"
echo "Wrote $DST"
