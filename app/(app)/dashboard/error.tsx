"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-24 text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">문제가 발생했습니다</h2>
        <p className="text-muted-foreground max-w-sm">
          대시보드를 불러오는 중 오류가 발생했습니다.
          {error.digest && (
            <span className="block mt-1 text-xs font-mono text-muted-foreground/70">
              오류 코드: {error.digest}
            </span>
          )}
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => unstable_retry()} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          다시 시도
        </Button>
        <Button variant="outline" asChild className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            홈으로
          </Link>
        </Button>
      </div>
    </div>
  );
}
