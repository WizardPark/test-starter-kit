// 데이터 페칭 예제용 한글 mock 게시글 API Route Handler
// GET /api/posts → 한글 게시글 5건 반환

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const mockPosts: Post[] = [
  {
    id: 1,
    title: "Next.js 16 신기능 소개",
    body:
      "Next.js 16에서는 Turbopack이 기본 번들러로 채택되었습니다. 빌드 속도가 최대 10배 빨라졌으며, React 19의 새로운 기능들을 완전히 지원합니다. 특히 Server Actions와 Partial Prerendering이 정식 GA되어 더욱 강력한 풀스택 개발이 가능해졌습니다.",
    userId: 1,
  },
  {
    id: 2,
    title: "React Server Component 완벽 가이드",
    body:
      "RSC(React Server Components)는 서버에서만 실행되는 컴포넌트로, 클라이언트 번들 크기를 줄이고 데이터를 서버에서 직접 가져올 수 있습니다. async/await 문법으로 데이터 페칭이 자연스럽게 통합되어 별도의 useEffect 없이도 데이터를 렌더링할 수 있습니다.",
    userId: 1,
  },
  {
    id: 3,
    title: "Tailwind CSS v4 마이그레이션 팁",
    body:
      "Tailwind CSS v4는 CSS-native 설계로 완전히 재작성되었습니다. PostCSS 플러그인 방식에서 @import로 전환되었고, JIT가 기본으로 활성화됩니다. 기존 v3 프로젝트를 v4로 마이그레이션할 때 설정 파일 구조가 크게 달라지므로 공식 마이그레이션 가이드를 꼭 확인하세요.",
    userId: 2,
  },
  {
    id: 4,
    title: "shadcn/ui로 빠르게 UI 만들기",
    body:
      "shadcn/ui는 복사·붙여넣기 방식의 컴포넌트 라이브러리로, 프로젝트에 직접 소스코드를 추가합니다. Radix UI를 기반으로 접근성이 뛰어나며, Tailwind CSS로 스타일링되어 완전한 커스터마이징이 가능합니다. CLI 도구로 필요한 컴포넌트만 선택적으로 설치할 수 있어 번들 크기를 최소화할 수 있습니다.",
    userId: 2,
  },
  {
    id: 5,
    title: "TypeScript 5.x 주요 변경 사항",
    body:
      "TypeScript 5.x에서는 Decorator가 정식 지원되고, const 타입 매개변수, satisfies 연산자 등 강력한 타입 추론 기능이 추가되었습니다. 번들 크기도 크게 감소했으며, 빌드 성능도 개선되었습니다. 특히 verbose 에러 메시지가 더 친절해져 디버깅이 편리해졌습니다.",
    userId: 3,
  },
];

export async function GET() {
  return Response.json(mockPosts);
}
