---
name: architecture-decisions
description: 프로젝트 특유의 아키텍처 패턴, 설계 결정 사항, 라우트 구조 주의점
metadata:
  type: project
---

## 아키텍처 결정 및 주의 사항 (2026-06-12)

### 라우트 중복 — app/page.tsx vs app/(marketing)/page.tsx
- **현재 상태:** 두 파일이 동시에 존재함. 빌드 성공하며 `app/page.tsx`가 우선 적용됨 (SiteHeader/SiteFooter 포함)
- `app/(marketing)/page.tsx`는 SiteHeader/SiteFooter 없이 섹션만 렌더링 (사실상 미사용)
- **Why:** 라우트 그룹 구조로 마이그레이션 중 루트 page.tsx가 정리되지 않은 상태
- **권고:** `app/page.tsx`를 삭제하고 `app/(marketing)/layout.tsx`에 SiteHeader/SiteFooter를 포함시켜야 함

### error.tsx의 unstable_retry prop
- 모든 error.tsx에서 `reset` 대신 `unstable_retry`를 사용
- Next.js 16.x 기준 `unstable_retry`는 공식 지원됨 (error-boundary.d.ts에 명시됨)
- `reset`도 함께 존재하나 두 props의 동작 차이가 있을 수 있으므로 모니터링 필요

### global-error.tsx — 인라인 스타일 의도적 사용
- Providers/globals.css가 로드되기 전 단계에서도 렌더링되어야 하므로 인라인 스타일이 의도적
- 하드코딩된 색상(#fff, #0a0a0a)은 이 컨텍스트에서 허용 가능

### CodeBlock — async Server Component
- shiki를 서버사이드에서 실행하여 번들 크기 최소화
- `dangerouslySetInnerHTML` 사용은 shiki 출력이 신뢰할 수 있는 서버 측 데이터이므로 허용

### SidebarTrigger의 aria-label
- `components/ui/sidebar.tsx`의 `SidebarTrigger`에 aria-label이 영어("Toggle Sidebar")로 되어 있음
- 한국어 프로젝트에서 다국어 접근성 처리가 필요할 수 있음

### 중첩 Provider 구조
- ThemeProvider > TooltipProvider > (children + Toaster) 순서
- Toaster가 children 밖에 위치하여 모든 라우트에서 사용 가능한 구조는 올바름
