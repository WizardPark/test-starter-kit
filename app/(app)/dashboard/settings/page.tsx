"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 설정 페이지 — 클라이언트 컴포넌트(대화형 폼 요소 포함)
export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    weekly: true,
    security: true,
  });

  return (
    <>
      <AppHeader
        breadcrumbs={[
          { label: "홈", href: "/" },
          { label: "대시보드", href: "/dashboard" },
          { label: "설정" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <PageHeader
          title="설정"
          description="계정 및 서비스 환경 설정을 관리합니다."
        />

        <Tabs defaultValue="general" className="w-full">
          <TabsList>
            <TabsTrigger value="general">일반</TabsTrigger>
            <TabsTrigger value="account">계정</TabsTrigger>
            <TabsTrigger value="notifications">알림</TabsTrigger>
          </TabsList>

          {/* ── 일반 설정 탭 ── */}
          <TabsContent value="general" className="mt-6 space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="mb-1 font-semibold">프로필 정보</h3>
              <p className="mb-5 text-sm text-muted-foreground">
                공개 프로필에 표시되는 정보입니다.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">이름</Label>
                  <Input id="name" defaultValue="사용자" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="username">사용자명</Label>
                  <Input id="username" defaultValue="user123" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="email-general">이메일</Label>
                  <Input
                    id="email-general"
                    type="email"
                    defaultValue="user@example.com"
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <Button size="sm">변경사항 저장</Button>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="mb-1 font-semibold">인터페이스</h3>
              <p className="mb-5 text-sm text-muted-foreground">
                화면 표시 방식을 설정합니다.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">사이드바 자동 축소</p>
                    <p className="text-xs text-muted-foreground">
                      좁은 화면에서 사이드바를 자동으로 숨깁니다.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">키보드 단축키</p>
                    <p className="text-xs text-muted-foreground">
                      키보드 단축키를 활성화합니다.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── 계정 탭 ── */}
          <TabsContent value="account" className="mt-6 space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="mb-1 font-semibold">비밀번호 변경</h3>
              <p className="mb-5 text-sm text-muted-foreground">
                보안을 위해 정기적으로 비밀번호를 변경하세요.
              </p>
              <div className="grid gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="current-pw">현재 비밀번호</Label>
                  <Input id="current-pw" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="new-pw">새 비밀번호</Label>
                  <Input id="new-pw" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm-pw">새 비밀번호 확인</Label>
                  <Input id="confirm-pw" type="password" placeholder="••••••••" />
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <Button size="sm">비밀번호 변경</Button>
              </div>
            </div>

            <div className="rounded-lg border border-destructive/30 p-6">
              <h3 className="mb-1 font-semibold text-destructive">위험 구역</h3>
              <p className="mb-5 text-sm text-muted-foreground">
                계정을 삭제하면 모든 데이터가 영구적으로 제거되며 복구할 수 없습니다.
              </p>
              <Button variant="destructive" size="sm">
                계정 삭제
              </Button>
            </div>
          </TabsContent>

          {/* ── 알림 탭 ── */}
          <TabsContent value="notifications" className="mt-6 space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="mb-1 font-semibold">알림 수신 설정</h3>
              <p className="mb-5 text-sm text-muted-foreground">
                수신할 알림의 종류를 선택합니다.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">이메일 알림</p>
                    <p className="text-xs text-muted-foreground">
                      주요 업데이트를 이메일로 받습니다.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(v) =>
                      setNotifications((n) => ({ ...n, email: v }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">브라우저 알림</p>
                    <p className="text-xs text-muted-foreground">
                      브라우저 푸시 알림을 받습니다.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.browser}
                    onCheckedChange={(v) =>
                      setNotifications((n) => ({ ...n, browser: v }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">주간 요약</p>
                    <p className="text-xs text-muted-foreground">
                      매주 월요일 사용 통계 요약을 받습니다.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.weekly}
                    onCheckedChange={(v) =>
                      setNotifications((n) => ({ ...n, weekly: v }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">보안 알림</p>
                    <p className="text-xs text-muted-foreground">
                      로그인, 비밀번호 변경 등 보안 관련 알림입니다.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.security}
                    onCheckedChange={(v) =>
                      setNotifications((n) => ({ ...n, security: v }))
                    }
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <Button size="sm">알림 설정 저장</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
