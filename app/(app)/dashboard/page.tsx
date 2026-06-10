import { Users, DollarSign, Activity, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatCard } from "@/components/shared/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import { AppHeader } from "@/components/layout/app-header";

const stats = [
  {
    title: "총 사용자",
    value: "12,847",
    change: "+12% 지난달 대비",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "월 매출",
    value: "₩2,450,000",
    change: "+8.2% 지난달 대비",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "활성 세션",
    value: "1,293",
    change: "-3.1% 지난달 대비",
    changeType: "negative" as const,
    icon: Activity,
  },
  {
    title: "전환율",
    value: "3.24%",
    change: "+0.4%p 지난달 대비",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
];

const recentUsers = [
  {
    name: "김민준",
    email: "minjun@example.com",
    role: "관리자",
    status: "활성",
    joinedAt: "2024-01-15",
  },
  {
    name: "이서연",
    email: "seoyeon@example.com",
    role: "사용자",
    status: "활성",
    joinedAt: "2024-01-14",
  },
  {
    name: "박지호",
    email: "jiho@example.com",
    role: "사용자",
    status: "비활성",
    joinedAt: "2024-01-13",
  },
  {
    name: "최유나",
    email: "yuna@example.com",
    role: "편집자",
    status: "활성",
    joinedAt: "2024-01-12",
  },
  {
    name: "정도윤",
    email: "doyun@example.com",
    role: "사용자",
    status: "활성",
    joinedAt: "2024-01-11",
  },
];

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab = "overview" } = await searchParams;

  return (
    <>
      <AppHeader
        breadcrumbs={[{ label: "홈", href: "/" }, { label: "대시보드" }]}
      />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <PageHeader
          title="대시보드"
          description="서비스 현황과 주요 지표를 한눈에 확인하세요."
        >
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            새로 만들기
          </Button>
        </PageHeader>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* 탭 영역 */}
        <Tabs defaultValue={tab}>
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="users">사용자</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="rounded-lg border p-6">
              <h3 className="mb-1 font-semibold">최근 가입 사용자</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                최근 5명의 신규 가입자입니다.
              </p>
              <UserTable users={recentUsers} />
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-4">
            <div className="rounded-lg border p-6">
              <h3 className="mb-1 font-semibold">전체 사용자</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                모든 사용자 목록입니다.
              </p>
              <UserTable users={recentUsers} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function UserTable({
  users,
}: {
  users: typeof recentUsers;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>사용자</TableHead>
          <TableHead>역할</TableHead>
          <TableHead>상태</TableHead>
          <TableHead className="hidden md:table-cell">가입일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.email}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="text-xs">
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={user.status === "활성" ? "default" : "secondary"}
                className="text-xs"
              >
                {user.status}
              </Badge>
            </TableCell>
            <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
              {user.joinedAt}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
