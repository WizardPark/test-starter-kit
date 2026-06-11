import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Noto_Sans_KR, Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/shared/code-block";

export const metadata = {
  title: "폰트 최적화 예제",
};

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

const sampleText = {
  heading: "빠르고 아름다운 웹을 만드세요",
  body: "next/font는 Google Fonts를 자동으로 자체 호스팅합니다. 브라우저가 Google 서버에 별도 요청을 보내지 않아 개인정보 보호와 성능이 향상됩니다.",
  latin: "The quick brown fox jumps over the lazy dog.",
};

const codeExample = `// app/layout.tsx (전체 앱에 적용)
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={notoSansKr.className}>
      <body>{children}</body>
    </html>
  );
}

// 특정 컴포넌트에만 적용할 수도 있습니다
const inter = Inter({ subsets: ["latin"] });

function MyComponent() {
  return (
    <div className={inter.className}>
      이 영역만 Inter 폰트가 적용됩니다.
    </div>
  );
}`;

export default function FontsPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">폰트 최적화</h1>
          <Badge variant="secondary">next/font</Badge>
        </div>
        <p className="text-muted-foreground">
          <code className="rounded bg-muted px-1 py-0.5 text-sm font-mono">
            next/font/google
          </code>
          로 Google Fonts를 불러오면 빌드 시 자동으로 자체 호스팅되어 외부
          네트워크 요청이 발생하지 않습니다.
        </p>
      </div>

      {/* 결과 */}
      <section className="mb-10 space-y-6">
        <h2 className="text-lg font-semibold">결과</h2>

        <div className="rounded-lg border p-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Noto Sans KR
          </p>
          <div className={notoSansKr.className}>
            <p className="mb-2 text-2xl font-bold">{sampleText.heading}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {sampleText.body}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {sampleText.latin}
            </p>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Inter
          </p>
          <div className={inter.className}>
            <p className="mb-2 text-2xl font-bold">{sampleText.heading}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {sampleText.body}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {sampleText.latin}
            </p>
          </div>
        </div>
      </section>

      {/* 코드 — shiki 신택스 하이라이팅 적용 */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">코드</h2>
        <CodeBlock code={codeExample} lang="tsx" />
        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200">
          <strong>참고:</strong> 가변 폰트(variable font)를 사용하면 weight를
          배열로 지정할 필요 없이 더 나은 성능과 유연성을 얻을 수 있습니다.
        </div>
      </section>
    </div>
  );
}
