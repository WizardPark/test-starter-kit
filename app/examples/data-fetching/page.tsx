import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/shared/code-block";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// 로컬 API 라우트에서 한글 게시글 데이터를 가져옵니다.
// headers()로 현재 요청의 host를 읽어 절대 URL을 구성합니다.
async function getPosts(): Promise<Post[]> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const res = await fetch(`${protocol}://${host}/api/posts`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("데이터를 불러오는데 실패했습니다.");
  return res.json();
}

export const metadata = {
  title: "데이터 페칭 예제",
};

const codeExample = `// app/api/posts/route.ts — 데이터를 제공하는 Route Handler
export async function GET() {
  const posts = await db.query("SELECT * FROM posts LIMIT 5");
  return Response.json(posts);
}

// app/examples/data-fetching/page.tsx — async Server Component
import { headers } from "next/headers";

async function getPosts() {
  // headers()로 host를 읽어 절대 URL 구성 (서버 fetch 필수)
  const host = (await headers()).get("host") ?? "localhost:3000";
  const res = await fetch(\`http://\${host}/api/posts\`, {
    cache: "no-store",
  });
  return res.json();
}

// async 키워드로 Server Component를 비동기 함수로 선언
export default async function Page() {
  const posts = await getPosts(); // 서버에서 직접 실행

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`;

export default async function DataFetchingPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2 gap-1.5">
        <Link href="/#examples">
          <ArrowLeft className="h-4 w-4" />
          예제 목록
        </Link>
      </Button>

      <div className="mb-10">
        <div className="mb-3 flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">데이터 페칭</h1>
          <Badge variant="secondary">Server Component</Badge>
        </div>
        <p className="text-muted-foreground">
          비동기 Server Component에서{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-sm font-mono">
            fetch
          </code>{" "}
          API로 외부 데이터를 가져옵니다. 이 페이지 자체가 서버에서 데이터를
          fetch하여 렌더링됩니다.
        </p>
      </div>

      {/* 결과 */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">결과</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="rounded-lg border p-5">
              <p className="mb-1 text-xs text-muted-foreground">#{post.id}</p>
              <h3 className="mb-2 font-medium">{post.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {post.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 코드 — shiki 신택스 하이라이팅 적용 */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">코드</h2>
        <CodeBlock code={codeExample} lang="tsx" />
        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200">
          <strong>참고:</strong>{" "}
          <code className="font-mono">loading.tsx</code> 파일을 같은 폴더에
          두면 데이터를 가져오는 동안 자동으로 Suspense 스켈레톤 UI가
          표시됩니다.
        </div>
      </section>
    </div>
  );
}
