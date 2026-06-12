// Server Component — CodeBlock(async Server)을 직접 사용 가능
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/shared/code-block";

export const metadata: Metadata = {
  title: "레이아웃 패턴 예제",
};

// ── 코드 예제 문자열 ──────────────────────────────────────────
const flexboxCode = `{/* Flexbox 수평 정렬 — 양쪽 끝 배치 */}
<div className="flex items-center justify-between rounded-lg border p-4">
  <span className="font-medium">왼쪽 콘텐츠</span>
  <span className="text-sm text-muted-foreground">오른쪽 콘텐츠</span>
</div>

{/* Flexbox 세로 중앙 정렬 */}
<div className="flex h-24 items-center justify-center rounded-lg border">
  <span className="text-muted-foreground">수직 · 수평 중앙</span>
</div>

{/* Flexbox 간격 균등 분배 */}
<div className="flex gap-3">
  {["A", "B", "C"].map((item) => (
    <div key={item} className="flex-1 rounded-lg border p-3 text-center">
      {item}
    </div>
  ))}
</div>`;

const gridCode = `{/* 반응형 그리드: 모바일 1열 → 태블릿 2열 → 데스크탑 3열 */}
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {[1, 2, 3, 4, 5, 6].map((n) => (
    <div
      key={n}
      className="rounded-lg border bg-muted/40 p-4 text-center text-sm"
    >
      카드 {n}
    </div>
  ))}
</div>

{/* 비대칭 그리드: 메인 2/3 + 사이드 1/3 */}
<div className="grid grid-cols-3 gap-4">
  <div className="col-span-2 rounded-lg border p-4">메인 (2/3)</div>
  <div className="rounded-lg border p-4">사이드 (1/3)</div>
</div>`;

const sidebarCode = `{/* Holy Grail 레이아웃: 고정 사이드바 + 유연 메인 */}
<div className="flex min-h-[200px] gap-4 rounded-lg border p-4">
  {/* 사이드바 — 고정 너비 */}
  <aside className="w-40 shrink-0 rounded-lg bg-muted/60 p-3">
    <nav className="space-y-1 text-sm">
      <p className="font-semibold mb-2">사이드바</p>
      <a className="block rounded px-2 py-1 bg-primary/10">메뉴 1</a>
      <a className="block rounded px-2 py-1">메뉴 2</a>
      <a className="block rounded px-2 py-1">메뉴 3</a>
    </nav>
  </aside>

  {/* 메인 — 나머지 공간 채움 */}
  <main className="flex-1 rounded-lg border border-dashed p-4">
    <p className="text-sm text-muted-foreground">
      메인 콘텐츠 영역 (flex-1로 남은 공간 자동 채움)
    </p>
  </main>
</div>`;

const stickyCode = `{/* Sticky 헤더 — 스크롤 영역 내부에서 상단 고정 */}
<div className="relative h-48 overflow-y-auto rounded-lg border">
  {/* sticky: 스크롤 컨테이너 기준으로 상단에 붙음 */}
  <header className="sticky top-0 z-10 border-b bg-background/95 px-4 py-2
    backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <p className="text-sm font-semibold">📌 Sticky 헤더</p>
  </header>

  {/* 스크롤 콘텐츠 */}
  <div className="space-y-2 p-4">
    {Array.from({ length: 8 }, (_, i) => (
      <p key={i} className="text-sm text-muted-foreground">
        콘텐츠 줄 {i + 1} — 스크롤해도 헤더는 고정됩니다.
      </p>
    ))}
  </div>
</div>`;

// ── 페이지 ─────────────────────────────────────────────────────
export default function LayoutPatternsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      {/* 뒤로가기 */}
      <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2 gap-1.5">
        <Link href="/#examples">
          <ArrowLeft className="h-4 w-4" />
          예제 목록
        </Link>
      </Button>

      {/* 헤더 */}
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">레이아웃 패턴</h1>
          <Badge variant="secondary">Tailwind CSS</Badge>
        </div>
        <p className="text-muted-foreground">
          Tailwind CSS의{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-sm font-mono">
            flex
          </code>
          와{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-sm font-mono">
            grid
          </code>
          를 활용해 반응형 레이아웃을 구성하는 핵심 패턴을 확인하세요.
          별도 라이브러리 없이 유틸리티 클래스만으로 구현합니다.
        </p>
      </div>

      <div className="space-y-14">
        {/* ── 1. Flexbox 정렬 ── */}
        <section>
          <h2 className="mb-1 text-lg font-semibold">1. Flexbox 정렬</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            <code className="rounded bg-muted px-1 py-0.5 font-mono">
              items-center
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono">
              justify-between
            </code>{" "}
            등으로 수평·수직 정렬을 제어합니다.
          </p>

          {/* 결과 */}
          <div className="mb-4 space-y-3 rounded-xl border bg-muted/20 p-5">
            {/* 양쪽 끝 */}
            <div className="flex items-center justify-between rounded-lg border bg-background p-4">
              <span className="font-medium">왼쪽 콘텐츠</span>
              <span className="text-sm text-muted-foreground">오른쪽 콘텐츠</span>
            </div>
            {/* 수직 중앙 */}
            <div className="flex h-20 items-center justify-center rounded-lg border bg-background">
              <span className="text-sm text-muted-foreground">수직 · 수평 중앙</span>
            </div>
            {/* 균등 분배 */}
            <div className="flex gap-3">
              {["A", "B", "C"].map((item) => (
                <div
                  key={item}
                  className="flex-1 rounded-lg border bg-background p-3 text-center text-sm font-medium"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 코드 */}
          <CodeBlock code={flexboxCode} lang="tsx" />
        </section>

        <Separator />

        {/* ── 2. 반응형 그리드 ── */}
        <section>
          <h2 className="mb-1 text-lg font-semibold">2. 반응형 그리드</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            브레이크포인트 접두사(
            <code className="rounded bg-muted px-1 py-0.5 font-mono">md:</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono">lg:</code>
            )로 화면 크기에 따라 열 수를 바꿉니다.
          </p>

          {/* 결과 */}
          <div className="mb-4 space-y-4 rounded-xl border bg-muted/20 p-5">
            {/* 반응형 그리드 */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="rounded-lg border bg-background p-3 text-center text-sm"
                >
                  카드 {n}
                </div>
              ))}
            </div>
            {/* 비대칭 그리드 */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 rounded-lg border bg-background p-3 text-sm">
                메인 (2/3)
              </div>
              <div className="rounded-lg border bg-background p-3 text-sm">
                사이드 (1/3)
              </div>
            </div>
          </div>

          {/* 코드 */}
          <CodeBlock code={gridCode} lang="tsx" />
        </section>

        <Separator />

        {/* ── 3. 사이드바 레이아웃 ── */}
        <section>
          <h2 className="mb-1 text-lg font-semibold">3. 사이드바 레이아웃</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            <code className="rounded bg-muted px-1 py-0.5 font-mono">shrink-0</code>
            으로 사이드바 너비를 고정하고,{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono">flex-1</code>
            로 메인 영역이 남은 공간을 채웁니다.
          </p>

          {/* 결과 */}
          <div className="mb-4 rounded-xl border bg-muted/20 p-5">
            <div className="flex min-h-[180px] gap-3 rounded-lg border bg-background p-3">
              {/* 사이드바 */}
              <aside className="w-36 shrink-0 rounded-lg bg-muted/60 p-3">
                <p className="mb-2 text-xs font-semibold">사이드바</p>
                <nav className="space-y-1 text-xs">
                  <div className="rounded bg-primary/10 px-2 py-1 text-primary">
                    메뉴 1
                  </div>
                  <div className="rounded px-2 py-1 text-muted-foreground">
                    메뉴 2
                  </div>
                  <div className="rounded px-2 py-1 text-muted-foreground">
                    메뉴 3
                  </div>
                </nav>
              </aside>
              {/* 메인 */}
              <main className="flex-1 rounded-lg border border-dashed p-3">
                <p className="text-sm text-muted-foreground">
                  메인 콘텐츠 영역
                  <br />
                  <span className="text-xs">(flex-1로 남은 공간 자동 채움)</span>
                </p>
              </main>
            </div>
          </div>

          {/* 코드 */}
          <CodeBlock code={sidebarCode} lang="tsx" />
        </section>

        <Separator />

        {/* ── 4. Sticky 헤더 ── */}
        <section>
          <h2 className="mb-1 text-lg font-semibold">4. Sticky 헤더</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            <code className="rounded bg-muted px-1 py-0.5 font-mono">
              sticky top-0
            </code>
            으로 스크롤 시 헤더가 상단에 고정됩니다.{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono">
              backdrop-blur
            </code>
            로 배경 블러 효과를 추가할 수 있습니다.
          </p>

          {/* 결과 */}
          <div className="mb-4 rounded-xl border bg-muted/20 p-5">
            <div className="relative h-48 overflow-y-auto rounded-lg border bg-background">
              {/* sticky 헤더 */}
              <header className="sticky top-0 z-10 border-b bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <p className="text-sm font-semibold">📌 Sticky 헤더 — 스크롤해보세요</p>
              </header>
              {/* 스크롤 콘텐츠 */}
              <div className="space-y-2 p-4">
                {Array.from({ length: 8 }, (_, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    콘텐츠 줄 {i + 1} — 스크롤해도 헤더는 고정됩니다.
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* 코드 */}
          <CodeBlock code={stickyCode} lang="tsx" />
        </section>
      </div>
    </div>
  );
}
