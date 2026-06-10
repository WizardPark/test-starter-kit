import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 py-32 text-center px-4">
      <div className="space-y-2">
        <p className="text-8xl font-extrabold text-muted-foreground/20 select-none">
          404
        </p>
        <h1 className="text-2xl font-bold tracking-tight">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            홈으로 돌아가기
          </Link>
        </Button>
        <Button variant="outline" asChild className="gap-2">
          <Link href="/dashboard">
            <Search className="h-4 w-4" />
            대시보드
          </Link>
        </Button>
      </div>
    </div>
  );
}
