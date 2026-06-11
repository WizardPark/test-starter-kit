import { Eye, TrendingUp, Clock, LogOut } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import { AppHeader } from "@/components/layout/app-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = {
  title: "분석 - 스타터킷",
};

// 통계 카드 데이터
const stats = [
  {
    title: "총 방문자",
    value: "38,492",
    change: "+18.4% 지난달 대비",
    changeType: "positive" as const,
    icon: Eye,
  },
  {
    title: "페이지뷰",
    value: "124,807",
    change: "+22.1% 지난달 대비",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "평균 체류 시간",
    value: "3분 42초",
    change: "+0:24 지난달 대비",
    changeType: "positive" as const,
    icon: Clock,
  },
  {
    title: "이탈률",
    value: "41.2%",
    change: "-3.7%p 지난달 대비",
    changeType: "positive" as const,
    icon: LogOut,
  },
];

// 인기 페이지 데이터
const popularPages = [
  { page: "/dashboard", views: 18_214, percentage: 100 },
  { page: "/examples/data-fetching", views: 10_847, percentage: 60 },
  { page: "/examples/form-validation", views: 7_392, percentage: 41 },
  { page: "/examples/fonts", views: 4_918, percentage: 27 },
  { page: "/dashboard/analytics", views: 3_204, percentage: 18 },
];

// 채널별 유입 데이터
const channels = [
  { name: "자연 검색", visitors: 15_284, percentage: 40, color: "bg-primary" },
  { name: "직접 접속", visitors: 9_623, percentage: 25, color: "bg-blue-500" },
  { name: "소셜 미디어", visitors: 7_698, percentage: 20, color: "bg-green-500" },
  { name: "추천 링크", visitors: 3_847, percentage: 10, color: "bg-orange-500" },
  { name: "기타", visitors: 2_040, percentage: 5, color: "bg-muted-foreground" },
];

export default function AnalyticsPage() {
  return (
    <>
      <AppHeader
        breadcrumbs={[
          { label: "홈", href: "/" },
          { label: "대시보드", href: "/dashboard" },
          { label: "분석" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <PageHeader
          title="분석"
          description="트래픽 현황과 사용자 행동 데이터를 분석합니다."
        />

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 인기 페이지 */}
          <div className="rounded-lg border p-6">
            <h3 className="mb-1 font-semibold">인기 페이지</h3>
            <p className="mb-5 text-sm text-muted-foreground">
              이번 달 가장 많이 방문된 페이지입니다.
            </p>
            <div className="space-y-4">
              {popularPages.map((item) => (
                <div key={item.page}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.page}
                    </span>
                    <span className="font-medium">
                      {item.views.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 유입 채널 */}
          <div className="rounded-lg border p-6">
            <h3 className="mb-1 font-semibold">유입 채널</h3>
            <p className="mb-5 text-sm text-muted-foreground">
              방문자가 어디서 유입되었는지 채널별로 확인합니다.
            </p>
            <div className="space-y-3">
              {channels.map((channel) => (
                <div key={channel.name} className="flex items-center gap-3">
                  <div className={`h-2.5 w-2.5 rounded-full ${channel.color}`} />
                  <div className="flex flex-1 items-center justify-between text-sm">
                    <span>{channel.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">
                        {channel.percentage}%
                      </span>
                      <span className="w-16 text-right font-medium">
                        {channel.visitors.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 상세 페이지 테이블 */}
        <div className="rounded-lg border p-6">
          <h3 className="mb-1 font-semibold">페이지별 상세 지표</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            각 페이지의 방문자, 이탈률, 평균 체류 시간을 확인합니다.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>페이지</TableHead>
                <TableHead className="text-right">방문자</TableHead>
                <TableHead className="hidden text-right md:table-cell">
                  이탈률
                </TableHead>
                <TableHead className="hidden text-right md:table-cell">
                  평균 체류
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {popularPages.map((item) => (
                <TableRow key={item.page}>
                  <TableCell className="font-mono text-xs">
                    {item.page}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.views.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden text-right text-muted-foreground md:table-cell">
                    {(35 + Math.round(item.percentage * 0.1))}%
                  </TableCell>
                  <TableCell className="hidden text-right text-muted-foreground md:table-cell">
                    {Math.floor(item.percentage / 30) + 1}분{" "}
                    {(item.percentage % 60).toString().padStart(2, "0")}초
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
