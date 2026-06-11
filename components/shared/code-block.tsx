// 신택스 하이라이팅 코드 블록 — async Server Component
// shiki로 서버사이드 렌더링하여 클라이언트 번들 크기 영향 없음
// 다크모드: globals.css의 .dark .shiki 규칙으로 자동 전환

import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export async function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    // defaultColor: false → 직접 색상 지정 없이 CSS 변수만 사용
    // globals.css에서 .dark .shiki 규칙으로 테마 전환
    defaultColor: false,
  });

  return (
    <div
      // 외부 컨테이너: 모서리 처리 + 스크롤 허용
      // 내부 <pre>(shiki 생성)에 패딩·폰트 스타일 주입
      className="overflow-hidden rounded-lg text-sm leading-relaxed [&>pre]:overflow-x-auto [&>pre]:p-5 [&>pre]:font-mono"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
