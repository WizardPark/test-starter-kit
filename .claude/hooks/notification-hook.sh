# Claude Code → Slack Incoming Webhook (Notification 이벤트 전용)
# 호출: bash "$CLAUDE_PROJECT_DIR/.claude/hooks/notification-hook.sh"
# SLACK_WEBHOOK_URL은 .claude/settings.local.json 의 env 블록에서 주입됨
set -uo pipefail

# ──────────────────────────────────────────────
# 📝 알림 문구 (이 부분만 고치면 됩니다)
# {tool} 은 도구 이름(Bash, Write 등)으로 자동 치환됩니다.
# ──────────────────────────────────────────────
MSG_WAITING="Claude가 입력을 기다리고 있습니다."
MSG_PERMISSION="Claude가 {tool} 사용 권한을 요청합니다."
MSG_DEFAULT="Claude Code 알림"
MSG_FOOTER="Claude Code에서 알림이 도착했습니다."

# webhook URL 없으면 조용히 종료 (Claude 작업 흐름을 막지 않음)
[ -n "${SLACK_WEBHOOK_URL:-}" ] || exit 0

# stdin 에서 hook 이벤트 JSON 읽기
INPUT="$(cat)"

# jq 로 필드 추출
EVENT="$(printf '%s' "$INPUT"      | jq -r '.hook_event_name // "Notification"')"
RAW_MSG="$(printf '%s' "$INPUT"    | jq -r '.message // ""')"
CWD="$(printf '%s' "$INPUT"        | jq -r '.cwd // ""')"
SESSION="$(printf '%s' "$INPUT"    | jq -r '.session_id // ""')"
TRANSCRIPT="$(printf '%s' "$INPUT" | jq -r '.transcript_path // ""')"
PROJ="${CWD##*/}"; PROJ="${PROJ:-claude-code}"

# ──────────────────────────────────────────────
# 도구 정보 수집 전략
#  1순위: PreToolUse 훅이 기록한 상태 파일 (정확, race-condition 없음)
#  2순위: transcript 마지막 tool_use 추측 (폴백, 부정확할 수 있음)
# ──────────────────────────────────────────────
TOOL=""
DETAIL=""

STATE_FILE="${TMPDIR:-/tmp}/claude-pending-tool-${SESSION}.json"
if [ -n "$SESSION" ] && [ -f "$STATE_FILE" ]; then
  # 1순위: 상태 파일에서 읽기
  TOOL="$(jq -r '.tool // ""'   "$STATE_FILE" 2>/dev/null)"
  DETAIL="$(jq -r '.detail // ""' "$STATE_FILE" 2>/dev/null)"
elif [ -n "$TRANSCRIPT" ] && [ -f "$TRANSCRIPT" ]; then
  # 2순위: transcript 에서 마지막 tool_use 추측 (폴백)
  LAST_TOOL_JSON="$(jq -c 'select(.type=="assistant") | .message.content[]?
    | select(.type=="tool_use") | {name, input}' "$TRANSCRIPT" 2>/dev/null | tail -1)"

  if [ -n "$LAST_TOOL_JSON" ]; then
    TOOL="$(printf '%s' "$LAST_TOOL_JSON" | jq -r '.name // ""')"

    case "$TOOL" in
      Bash)
        DESC="$(printf '%s' "$LAST_TOOL_JSON" | jq -r '.input.description // ""')"
        CMD="$(printf '%s' "$LAST_TOOL_JSON"  | jq -r '.input.command // ""')"
        if [ -n "$DESC" ]; then
          DETAIL="$DESC"
        else
          DETAIL="$CMD"
        fi
        if [ "${#DETAIL}" -gt 80 ]; then
          DETAIL="${DETAIL:0:80}…"
        fi
        ;;
      Write|Edit|Read|NotebookEdit)
        FILE_PATH="$(printf '%s' "$LAST_TOOL_JSON" | jq -r '.input.file_path // ""')"
        if [ -n "$FILE_PATH" ] && [ -n "$CWD" ]; then
          DETAIL="${FILE_PATH#"$CWD/"}"
        else
          DETAIL="$FILE_PATH"
        fi
        ;;
    esac
  fi
fi

# ──────────────────────────────────────────────
# message 내용에 따라 알림 문구 결정
# ──────────────────────────────────────────────
EXTRA=""
case "$RAW_MSG" in
  *"waiting for your input"*)
    BODY="$MSG_WAITING"
    ;;
  *"needs your permission"*)
    if [ -n "$TOOL" ]; then
      BODY="${MSG_PERMISSION/\{tool\}/$TOOL}"
      if [ -n "$DETAIL" ]; then
        case "$TOOL" in
          Bash) EXTRA="명령: ${DETAIL}" ;;
          *)    EXTRA="대상: ${DETAIL}" ;;
        esac
      fi
    else
      BODY="${RAW_MSG:-$MSG_DEFAULT}"
    fi
    # 권한 요청 소비 후 상태 파일 삭제 (잔여 상태 방지)
    [ -f "$STATE_FILE" ] && rm -f "$STATE_FILE" 2>/dev/null || true
    ;;
  *)
    BODY="${RAW_MSG:-$MSG_DEFAULT}"
    ;;
esac

# KST(Asia/Seoul) 현재 시각
TIME="$(TZ=Asia/Seoul date '+%Y-%m-%d %H:%M:%S')"

# EXTRA 있으면 한 줄 더 추가
if [ -n "$EXTRA" ]; then
  TEXT="🔔 권한 요청 알림
프로젝트: ${PROJ}
상태: ${EVENT} — ${BODY}
${EXTRA}
시간: ${TIME}

${MSG_FOOTER}"
else
  TEXT="🔔 권한 요청 알림
프로젝트: ${PROJ}
상태: ${EVENT} — ${BODY}
시간: ${TIME}

${MSG_FOOTER}"
fi

# jq 로 JSON 페이로드 빌드 (특수문자 이스케이프 자동 처리)
PAYLOAD="$(jq -n --arg text "$TEXT" '{text: $text}')"

# Slack Incoming Webhook 으로 POST (실패해도 Claude 흐름에 영향 없음)
curl -sf -X POST \
  -H 'Content-Type: application/json' \
  --data "$PAYLOAD" \
  "$SLACK_WEBHOOK_URL" >/dev/null 2>&1 || true

exit 0
