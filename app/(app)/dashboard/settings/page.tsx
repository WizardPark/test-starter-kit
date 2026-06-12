import type { Metadata } from "next";
import { AppHeader } from "@/components/layout/app-header";
import { PageHeader } from "@/components/shared/page-header";
import { SettingsTabs } from "./settings-tabs";

// 설정 페이지 — Server Component
// 대화형 탭 UI는 SettingsTabs(Client Component)로 분리
export const metadata: Metadata = {
  title: "설정 - 스타터킷",
};

export default function SettingsPage() {
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
        <SettingsTabs />
      </div>
    </>
  );
}
