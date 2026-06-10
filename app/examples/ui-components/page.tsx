import Link from "next/link";
import { ArrowLeft, Terminal, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "UI 컴포넌트 예제",
};

export default function UIComponentsPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">UI 컴포넌트</h1>
          <Badge variant="secondary">shadcn/ui</Badge>
        </div>
        <p className="text-muted-foreground">
          shadcn/ui는 복사-붙여넣기 방식으로 소유권을 갖는 접근성 중심 컴포넌트입니다.
          Radix UI 기반으로 키보드 탐색과 스크린 리더를 완벽히 지원합니다.
        </p>
      </div>

      <div className="space-y-10">
        {/* Button */}
        <section>
          <h2 className="mb-1 text-lg font-semibold">Button</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            6가지 variant와 3가지 size를 제공합니다.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <Separator />

        {/* Badge */}
        <section>
          <h2 className="mb-1 text-lg font-semibold">Badge</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            상태나 카테고리를 표시하는 작은 레이블입니다.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </section>

        <Separator />

        {/* Card */}
        <section>
          <h2 className="mb-1 text-lg font-semibold">Card</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            콘텐츠를 그룹화하는 컨테이너입니다.
          </p>
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>프로젝트 알림</CardTitle>
              <CardDescription>배포가 완료되었습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                프로덕션 환경에 성공적으로 배포되었습니다. 변경 사항을 확인하세요.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Alert */}
        <section>
          <h2 className="mb-1 text-lg font-semibold">Alert</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            사용자에게 중요한 정보를 전달합니다.
          </p>
          <div className="space-y-3">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>안내</AlertTitle>
              <AlertDescription>
                새 버전이 출시되었습니다. 패키지를 업데이트하세요.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <Info className="h-4 w-4" />
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>
                요청을 처리하는 중 오류가 발생했습니다.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <Separator />

        {/* Avatar */}
        <section>
          <h2 className="mb-1 text-lg font-semibold">Avatar</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            이미지가 없을 때 이니셜로 대체됩니다.
          </p>
          <div className="flex gap-3">
            {["김", "이", "박", "최"].map((name) => (
              <Avatar key={name}>
                <AvatarFallback>{name}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </section>

        <Separator />

        {/* Tabs */}
        <section>
          <h2 className="mb-1 text-lg font-semibold">Tabs</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            관련 콘텐츠를 탭으로 구분합니다.
          </p>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">개요</TabsTrigger>
              <TabsTrigger value="settings">설정</TabsTrigger>
              <TabsTrigger value="members">멤버</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4 rounded-lg border p-4 text-sm text-muted-foreground">
              프로젝트 개요 내용이 여기에 표시됩니다.
            </TabsContent>
            <TabsContent value="settings" className="mt-4 rounded-lg border p-4 text-sm text-muted-foreground">
              설정 내용이 여기에 표시됩니다.
            </TabsContent>
            <TabsContent value="members" className="mt-4 rounded-lg border p-4 text-sm text-muted-foreground">
              멤버 목록이 여기에 표시됩니다.
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
