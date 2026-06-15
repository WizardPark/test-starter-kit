# Claude Code hook → Slack Incoming Webhook 알림
# 호출 방식: bash "$CLAUDE_PROJECT_DIR/.claude/scripts/slack-notify.sh"
# (bash 명시 호출이므로 shebang·실행 비트 불필요)
#
# 처리 이벤트:
#   Notification — 권한 요청 또는 입력 대기 (stdin JSON의 message 필드 포함)
#   Stop        — 메인 에이전트 응답 완료
set -uo pipefail

# ──────────────────────────────────────────────
# 📝 알림 문구 (이 부분만 고치면 됩니다)
# {tool} 은 도구 이름(Bash, Read 등)으로 자동 치환됩니다.
# ──────────────────────────────────────────────
MSG_WAITING="Claude가 입력을 기다리고 있습니다."          # 입력 대기 시
MSG_PERMISSION="Claude가 {tool} 사용 권한을 요청합니다."  # 권한 요청 시
MSG_DONE="Claude Code가 응답을 마쳤습니다."               # 작업 완료 시
MSG_DEFAULT="Claude Code 알림"                            # 그 외 / 알 수 없는 경우

# 프로젝트 루트 결정: Claude Code hook이 $CLAUDE_PROJECT_DIR를 주입한다.
# 단독 테스트 실행 시에는 스크립트 위치(/.claude/scripts/) 기준 두 단계 위로 폴백.
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
WEBHOOK_FILE="$PROJECT_DIR/.claude/.slack-webhook-url"

# URL 파일이 없거나 비어 있으면 조용히 종료 (Claude 작업 흐름을 막지 않음)
[ -s "$WEBHOOK_FILE" ] || exit 0
WEBHOOK_URL="$(tr -d '[:space:]' < "$WEBHOOK_FILE")"
[ -n "$WEBHOOK_URL" ] || exit 0

INPUT="$(cat)"  # hook 이벤트 JSON (Claude Code가 stdin으로 전달)

# 문구 변수를 환경변수로 node에 전달 → node 코드 안에는 문구를 하드코딩하지 않음
PAYLOAD="$(printf '%s' "$INPUT" | \
  MSG_WAITING="$MSG_WAITING" \
  MSG_PERMISSION="$MSG_PERMISSION" \
  MSG_DONE="$MSG_DONE" \
  MSG_DEFAULT="$MSG_DEFAULT" \
  node -e '
let raw = "";
process.stdin.on("data", d => raw += d);
process.stdin.on("end", () => {
  let data = {};
  try { data = JSON.parse(raw); } catch (e) { process.exit(0); }

  // 상단 쉘 변수에서 넘어온 문구 읽기
  const msgWaiting    = process.env.MSG_WAITING    || "Claude가 입력을 기다리고 있습니다.";
  const msgPermission = process.env.MSG_PERMISSION || "Claude가 {tool} 사용 권한을 요청합니다.";
  const msgDone       = process.env.MSG_DONE       || "Claude Code가 응답을 마쳤습니다.";
  const msgDefault    = process.env.MSG_DEFAULT    || "Claude Code 알림";

  const ev   = data.hook_event_name || "";
  const proj = (data.cwd || "").split("/").filter(Boolean).pop() || "claude-code";
  const raw_msg = data.message || "";
  let body;

  if (ev === "Notification") {
    if (raw_msg.includes("waiting for your input")) {
      // 입력 대기
      body = msgWaiting;
    } else if (raw_msg.includes("needs your permission to use")) {
      // 권한 요청 — 도구명 추출 후 {tool} 치환
      const match = raw_msg.match(/needs your permission to use (.+)/);
      const tool  = match ? match[1].trim() : "도구";
      body = msgPermission.replace("{tool}", tool);
    } else {
      // 그 외 Notification: 영어 원문 그대로 (없으면 기본 문구)
      body = raw_msg || msgDefault;
    }
  } else if (ev === "Stop") {
    body = msgDone;
  } else {
    body = `${ev || msgDefault}`;
  }

  const title = ev === "Notification"
    ? `🔔 *권한/입력 요청* — \`${proj}\``
    : ev === "Stop"
      ? `✅ *작업 완료* — \`${proj}\``
      : `ℹ️ ${ev} — \`${proj}\``;

  process.stdout.write(JSON.stringify({ text: `${title}\n${body}` }));
});
')"

[ -n "$PAYLOAD" ] || exit 0

# Slack Incoming Webhook으로 POST (실패해도 Claude 흐름에 영향 없도록 || true)
curl -sf -X POST \
  -H 'Content-Type: application/json' \
  --data "$PAYLOAD" \
  "$WEBHOOK_URL" >/dev/null 2>&1 || true

exit 0
