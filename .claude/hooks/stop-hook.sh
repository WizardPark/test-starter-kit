# Claude Code → Slack Incoming Webhook (Stop 이벤트 전용)
# 호출: bash "$CLAUDE_PROJECT_DIR/.claude/hooks/stop-hook.sh"
# SLACK_WEBHOOK_URL은 .claude/settings.local.json 의 env 블록에서 주입됨
set -uo pipefail

# ──────────────────────────────────────────────
# 📝 알림 문구 (이 부분만 고치면 됩니다)
# ──────────────────────────────────────────────
MSG_DONE="Claude Code가 응답을 마쳤습니다."
MSG_FOOTER="Claude Code에서 알림이 도착했습니다."

# webhook URL 없으면 조용히 종료 (Claude 작업 흐름을 막지 않음)
[ -n "${SLACK_WEBHOOK_URL:-}" ] || exit 0

# stdin 에서 hook 이벤트 JSON 읽기
INPUT="$(cat)"

# jq 로 필드 추출
EVENT="$(printf '%s' "$INPUT"      | jq -r '.hook_event_name // "Stop"')"
CWD="$(printf '%s' "$INPUT"        | jq -r '.cwd // ""')"
TRANSCRIPT="$(printf '%s' "$INPUT" | jq -r '.transcript_path // ""')"
PROJ="${CWD##*/}"; PROJ="${PROJ:-claude-code}"

# KST(Asia/Seoul) 현재 시각
TIME="$(TZ=Asia/Seoul date '+%Y-%m-%d %H:%M:%S')"

# ──────────────────────────────────────────────
# transcript 에서 마지막 사용자 프롬프트 이후 수행한 작업 수집
#   - 실제 사용자 프롬프트: .type=="user" AND .message.content 가 string
#     (tool_result 는 배열이므로 자연스럽게 제외됨)
#   - 수집 범위: 변경(Write/Edit/MultiEdit/NotebookEdit) + 명령(Bash)만
#     Read/Grep 등 조회성 도구는 제외
# ──────────────────────────────────────────────
SUMMARY_BLOCK=""

if [ -n "$TRANSCRIPT" ] && [ -f "$TRANSCRIPT" ]; then

  # 마지막 실제 사용자 프롬프트의 줄 번호(0-based index) 파싱
  LAST_USER_IDX="$(jq -s '
    to_entries
    | map(select(.value.type=="user"
           and (.value.message.content | type) == "string"))
    | last
    | .key // -1
  ' "$TRANSCRIPT" 2>/dev/null)"

  if [ -n "$LAST_USER_IDX" ] && [ "$LAST_USER_IDX" != "-1" ]; then

    # 해당 인덱스 이후 assistant tool_use 중 변경/명령 도구만 추출
    TOOLS_JSON="$(jq -sc --argjson idx "$LAST_USER_IDX" '
      .[$idx+1:]
      | map(
          select(.type=="assistant")
          | .message.content[]?
          | select(.type=="tool_use")
          | select(.name | test("^(Write|Edit|MultiEdit|NotebookEdit|Bash)$"))
          | {name, input}
        )
    ' "$TRANSCRIPT" 2>/dev/null)"

    # 변경 파일 목록 (Write/Edit/MultiEdit/NotebookEdit → 상대경로 unique)
    CHANGED_FILES=""
    if [ -n "$CWD" ]; then
      CHANGED_FILES="$(printf '%s' "$TOOLS_JSON" | jq -r --arg cwd "$CWD" '
        map(
          select(.name | test("^(Write|Edit|MultiEdit|NotebookEdit)$"))
          | .input.file_path // ""
          | select(length > 0)
          | ltrimstr($cwd + "/")
        )
        | unique
        | .[]
      ' 2>/dev/null | tr '\n' ',' | sed 's/,$//' | sed 's/,/, /g')"
    fi

    # 실행 명령 목록 (Bash → description 우선, 없으면 command 80자)
    BASH_LINES=""
    while IFS= read -r line; do
      [ -z "$line" ] && continue
      DESC="$(printf '%s' "$line" | jq -r '.input.description // ""')"
      CMD="$(printf '%s' "$line"  | jq -r '.input.command // ""')"
      if [ -n "$DESC" ]; then
        ENTRY="$DESC"
      else
        ENTRY="$CMD"
      fi
      if [ "${#ENTRY}" -gt 80 ]; then
        ENTRY="${ENTRY:0:80}…"
      fi
      if [ -n "$BASH_LINES" ]; then
        BASH_LINES="${BASH_LINES}
💻 명령: ${ENTRY}"
      else
        BASH_LINES="💻 명령: ${ENTRY}"
      fi
    done < <(printf '%s' "$TOOLS_JSON" | jq -c '.[] | select(.name=="Bash")' 2>/dev/null)

    # 요약 블록 조립 (변경 또는 명령이 있을 때만)
    if [ -n "$CHANGED_FILES" ] || [ -n "$BASH_LINES" ]; then
      SUMMARY_BLOCK="
수행한 작업:"
      if [ -n "$CHANGED_FILES" ]; then
        SUMMARY_BLOCK="${SUMMARY_BLOCK}
📝 변경: ${CHANGED_FILES}"
      fi
      if [ -n "$BASH_LINES" ]; then
        SUMMARY_BLOCK="${SUMMARY_BLOCK}
${BASH_LINES}"
      fi
    fi
  fi
fi

# ──────────────────────────────────────────────
# Slack 메시지 조립
# 수행한 작업이 없으면 (순수 읽기/질문 응답) 요약 블록 생략
# ──────────────────────────────────────────────
TEXT="✅ 작업 완료 알림
프로젝트: ${PROJ}
상태: ${EVENT} — ${MSG_DONE}${SUMMARY_BLOCK}
시간: ${TIME}

${MSG_FOOTER}"

# jq 로 JSON 페이로드 빌드 (특수문자 이스케이프 자동 처리)
PAYLOAD="$(jq -n --arg text "$TEXT" '{text: $text}')"

# Slack Incoming Webhook 으로 POST (실패해도 Claude 흐름에 영향 없음)
curl -sf -X POST \
  -H 'Content-Type: application/json' \
  --data "$PAYLOAD" \
  "$SLACK_WEBHOOK_URL" >/dev/null 2>&1 || true

exit 0
