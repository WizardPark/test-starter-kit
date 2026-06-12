---
name: patterns-recurring
description: 이 프로젝트에서 반복 발견되는 안티패턴, 컨벤션 위반, 주의할 패턴 목록
metadata:
  type: feedback
---

## 반복 발견 패턴 (2026-06-12 첫 전체 리뷰 기준)

### cn() 미사용 — 조건부 className 조합
- `site-header.tsx`와 `analytics/page.tsx`에서 템플릿 리터럴로 className 조합
- 프로젝트 컨벤션: 모든 className 조합은 `cn()` 사용 필수
- **Why:** tailwind-merge가 클래스 충돌을 해결하지 못함

### navLinks 중복 정의
- `site-header.tsx`와 `mobile-nav.tsx`에 동일한 `navLinks` 배열이 각각 정의됨
- 공유 상수 파일(`lib/nav-links.ts` 등)로 추출 권장

### metadata export 타입 미지정
- `analytics/page.tsx`, `users/page.tsx`, 예제 페이지들에서 `export const metadata = {}`로 plain object 사용
- 정확한 타입: `export const metadata: Metadata = {}`  (`import type { Metadata } from "next"` 필요)

### settings/page.tsx — "use client" + metadata export 불가
- 클라이언트 컴포넌트에서 metadata를 export하면 Next.js가 무시함 (경고 없이)
- 해결: 페이지를 Server Component로 두고, 상태 관리가 필요한 부분만 별도 Client Component로 분리

### ThemeToggle system 테마 미처리
- `theme === "dark"` 비교 사용 → system 테마일 때 항상 light로 토글됨
- 해결: `resolvedTheme` 사용 권장

### 인덱스를 key로 사용
- `loading.tsx`들에서 `Array.from({ length: N }).map((_, i) => ... key={i})` 패턴
- 정적 스켈레톤 목록에서는 실제 문제 없으나, 일관성을 위해 유의

### 하드코딩 색상값
- `analytics/page.tsx`의 채널 색상에 `bg-blue-500`, `bg-green-500`, `bg-orange-500` 직접 사용
- 다크모드에서 디자인 토큰과 불일치 가능성 있음

### Self-fetch 패턴 (data-fetching)
- Server Component에서 자신의 API Route를 fetch하는 패턴 사용
- `headers()`로 host 추출 → 절대 URL 구성은 올바른 접근이나, 같은 서버에서 네트워크 왕복 발생
- 예제용 코드이므로 허용 가능하나, 실제 앱에서는 직접 데이터 접근 권장
