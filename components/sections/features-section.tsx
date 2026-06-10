import Link from "next/link";
import {
  Database,
  Type,
  LayoutGrid,
  ClipboardList,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const examples = [
  {
    icon: Database,
    title: "데이터 페칭",
    description:
      "Server Component에서 fetch API로 외부 데이터를 가져오고 Suspense로 스트리밍하는 방법을 확인하세요.",
    href: "/examples/data-fetching",
  },
  {
    icon: Type,
    title: "폰트 최적화",
    description:
      "next/font를 사용해 Google Fonts를 외부 네트워크 요청 없이 최적화하여 적용하는 방법을 확인하세요.",
    href: "/examples/fonts",
  },
  {
    icon: LayoutGrid,
    title: "UI 컴포넌트",
    description:
      "shadcn/ui의 Button, Card, Badge, Alert, Tabs 등 다양한 컴포넌트를 조합하는 방법을 확인하세요.",
    href: "/examples/ui-components",
  },
  {
    icon: ClipboardList,
    title: "폼 검증",
    description:
      "react-hook-form과 zod를 사용하여 타입 안전한 폼 검증과 실시간 에러 메시지를 구현하는 방법을 확인하세요.",
    href: "/examples/form-validation",
  },
];

export function FeaturesSection() {
  return (
    <section id="examples" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            예제
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            각 기술 스택의 실제 사용 방법을 동작하는 예제로 확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {examples.map((example) => (
            <Card
              key={example.title}
              className="group transition-shadow hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <example.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{example.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <CardDescription className="leading-relaxed">
                  {example.description}
                </CardDescription>
                <Button asChild variant="outline" size="sm" className="w-fit">
                  <Link href={example.href}>보기 →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
