# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 중요: Next.js 버전 주의

이 프로젝트는 **Next.js 16 + React 19**를 사용한다. 훈련 데이터와 API, 컨벤션, 파일 구조가 다를 수 있으므로, Next.js 관련 코드를 작성하기 전에 반드시 `node_modules/next/dist/docs/` 의 가이드를 먼저 읽어라. Deprecation 경고를 무시하지 말 것.

## 명령어

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
```

테스트 설정 없음.

## 아키텍처

### 라우트 그룹 구조

두 개의 라우트 그룹이 완전히 다른 레이아웃을 사용한다:

- `app/(marketing)/` — 랜딩 페이지(`/`). 별도 레이아웃 없이 섹션 컴포넌트만 렌더링.
- `app/(app)/dashboard/` — 사이드바 기반 대시보드 레이아웃 (`SidebarProvider` + `AppSidebar`). Analytics, Users, Settings 서브페이지 포함.
- `app/examples/` — 예제 모음 (data-fetching, fonts, form-validation, layout-patterns, ui-components). 별도 `examples/layout.tsx` 공유.
- `app/api/posts/route.ts` — 데이터 페칭 예제용 Mock GET API.

루트 `app/layout.tsx`가 폰트(Geist), 전역 CSS, `Providers`를 설정하며 모든 라우트에 적용된다.

### Provider 스택

`components/providers/providers.tsx` — 클라이언트 컴포넌트로, 세 가지를 중첩 제공:
1. `ThemeProvider` (next-themes, `class` 속성 기반 다크모드)
2. `TooltipProvider` (Radix UI)
3. `Toaster` (sonner)

### 컴포넌트 계층

```
components/
  ui/          # shadcn/ui 컴포넌트 (직접 수정 가능한 소스코드)
  layout/      # 레이아웃 전용 (app-sidebar, app-header, site-header/footer, mobile-nav)
  sections/    # 마케팅 페이지 섹션 (hero, features, cta)
  shared/      # 앱 전반 공유 (code-block, page-header, stat-card, theme-toggle)
  providers/   # 전역 Provider 래퍼
```

새 shadcn 컴포넌트 추가: `npx shadcn add <component>`

### 스타일링

Tailwind CSS v4 사용 — `tailwind.config.js` 없음. 설정은 모두 `app/globals.css` 내 `@theme inline` 블록에서 CSS 변수로 처리된다. 색상 토큰은 `oklch` 값 사용. 다크모드는 `.dark` 클래스 기반 (`@custom-variant dark (&:is(.dark *))`).

### 유틸리티

- `lib/utils.ts` — `cn()` 함수 (clsx + tailwind-merge). 모든 className 조합에 사용.
- `hooks/use-mobile.ts` — 모바일 breakpoint 감지 훅.

### 폼 패턴

`react-hook-form` + `zod` + `@hookform/resolvers` 조합. `app/examples/form-validation/contact-form.tsx` 참고.

### TypeScript Path Alias

`@/*` → 프로젝트 루트. (예: `@/components/ui/button`, `@/lib/utils`)

### shadcn/ui 설정

`components.json` — style: `radix-nova`, baseColor: `neutral`, CSS 변수 사용, 아이콘: lucide-react.
