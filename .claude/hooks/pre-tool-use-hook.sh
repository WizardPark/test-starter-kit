# Claude Code → 도구 정보 상태 파일 기록 (PreToolUse 이벤트 전용)
# 호출: bash "$CLAUDE_PROJECT_DIR/.claude/hooks/pre-tool-use-hook.sh"
# Notification 훅이 도구 정보를 정확히 읽을 수 있도록 상태 파일에 기록.
# Slack 으로는 아무것도 전송하지 않음.
set -uo pipefail

# stdin 에서 PreToolUse 이벤트 JSON 읽기
INPUT="$(cat)"

# 세션 ID / 도구명 / 입력 / CWD 추출
SESSION="$(printf '%s' "$INPUT" | jq -r '.session_id // ""')"
TOOL="$(printf '%s' "$INPUT" | jq -r '.tool_name // ""')"
CWD="$(printf '%s' "$INPUT" | jq -r '.cwd // ""')"

# 세션 ID 없으면 상태 파일 기록 불가 → 조용히 종료
[ -n "$SESSION" ] || exit 0

# ──────────────────────────────────────────────
# 도구별 상세 정보(detail) 산출
# ──────────────────────────────────────────────
DETAIL=""
case "$TOOL" in
  Bash)
    # description 우선, 없으면 command (80자 절단)
    DESC="$(printf '%s' "$INPUT" | jq -r '.tool_input.description // ""')"
    CMD="$(printf '%s' "$INPUT"  | jq -r '.tool_input.command // ""')"
    if [ -n "$DESC" ]; then
      DETAIL="$DESC"
    else
      DETAIL="$CMD"
    fi
    if [ "${#DETAIL}" -gt 80 ]; then
      DETAIL="${DETAIL:0:80}…"
    fi
    ;;
  Write|Edit|MultiEdit|NotebookEdit|Read)
    # 파일 경로 → CWD 기준 상대경로
    FILE_PATH="$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // ""')"
    if [ -n "$FILE_PATH" ] && [ -n "$CWD" ]; then
      DETAIL="${FILE_PATH#"$CWD/"}"
    else
      DETAIL="$FILE_PATH"
    fi
    ;;
  *)
    # 그 외 도구: 이름만 (DETAIL 없음)
    ;;
esac

# ──────────────────────────────────────────────
# 상태 파일에 {tool, detail} 기록
# 경로: ${TMPDIR:-/tmp}/claude-pending-tool-<session>.json
# ──────────────────────────────────────────────
STATE_FILE="${TMPDIR:-/tmp}/claude-pending-tool-${SESSION}.json"
jq -n --arg tool "$TOOL" --arg detail "$DETAIL" \
  '{tool: $tool, detail: $detail}' > "$STATE_FILE" 2>/dev/null || true

exit 0
