#!/usr/bin/env bash
# Lặp: build -> tìm file vi-vn gây lỗi Vue -> fallback từ zh-cn -> rebuild.
# Mục tiêu: build pass, các file Vue phức tạp tạm dùng nội dung zh-cn.

set -u
cd "$(dirname "$0")/.."

MAX_ITERS=30
iter=0
fallback_count=0
fallback_list=()

while [ $iter -lt $MAX_ITERS ]; do
  iter=$((iter + 1))
  echo "=== Iter $iter ==="
  npm run build > /tmp/build-iter.log 2>&1
  rc=$?
  if [ $rc -eq 0 ]; then
    echo "Build OK after $iter iters. Fallback files: $fallback_count"
    if [ $fallback_count -gt 0 ]; then
      printf '  - %s\n' "${fallback_list[@]}"
    fi
    exit 0
  fi
  # Extract failing vi-vn .md file path
  bad=$(grep -oE "docs/vi-vn/[^ )]+\.md" /tmp/build-iter.log | head -1)
  if [ -z "$bad" ]; then
    echo "Build failed but no vi-vn file detected:"
    grep -E "build error|error:" /tmp/build-iter.log | head -5
    exit 1
  fi
  src="${bad/vi-vn/zh-cn}"
  if [ ! -f "$src" ]; then
    echo "No zh-cn fallback for $bad"
    exit 1
  fi
  echo "Falling back: $bad <- $src"
  cp "$src" "$bad"
  sed -i 's|/zh-cn/|/vi-vn/|g' "$bad"
  fallback_count=$((fallback_count + 1))
  fallback_list+=("$bad")
done

echo "Exceeded $MAX_ITERS iterations"
exit 1
