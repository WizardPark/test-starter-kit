import type { Metadata } from "next";
import { UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { AppHeader } from "@/components/layout/app-header";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "사용자 - 스타터킷",
};

// 사용자 목록 mock 데이터
const users = [
  {
    name: "김민준",
    email: "minjun@example.com",
    role: "관리자",
    status: "활성",
    joinedAt: "2024-01-15",
    lastActive: "방금 전",
  },
  {
    name: "이서연",
    email: "seoyeon@example.com",
    role: "편집자",
    status: "활성",
    joinedAt: "2024-01-14",
    lastActive: "3시간 전",
  },
  {
    name: "박지호",
    email: "jiho@example.com",
    role: "사용자",
    status: "비활성",
    joinedAt: "2024-01-13",
    lastActive: "5일 전",
  },
  {
    name: "최유나",
    email: "yuna@example.com",
    role: "편집자",
    status: "활성",
    joinedAt: "2024-01-12",
    lastActive: "1시간 전",
  },
  {
    name: "정도윤",
    email: "doyun@example.com",
    role: "사용자",
    status: "활성",
    joinedAt: "2024-01-11",
    lastActive: "어제",
  },
  {
    name: "한소희",
    email: "sohee@example.com",
    role: "사용자",
    status: "활성",
    joinedAt: "2024-01-09",
    lastActive: "2일 전",
  },
  {
    name: "오준혁",
    email: "junhyuk@example.com",
    role: "사용자",
    status: "비활성",
    joinedAt: "2024-01-07",
    lastActive: "2주 전",
  },
  {
    name: "임지수",
    email: "jisoo@example.com",
    role: "편집자",
    status: "활성",
    joinedAt: "2024-01-05",
    lastActive: "4시간 전",
  },
];

// 역할별 배지 색상
const roleVariant: Record<string, "default" | "secondary" | "outline"> = {
  관리자: "default",
  편집자: "secondary",
  사용자: "outline",
};

export default function UsersPage() {
  const activeCount = users.filter((u) => u.status === "활성").length;
  const adminCount = users.filter((u) => u.role === "관리자").length;

  return (
    <>
      <AppHeader
        breadcrumbs={[
          { label: "홈", href: "/" },
          { label: "대시보드", href: "/dashboard" },
          { label: "사용자" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <PageHeader
          title="사용자"
          description="서비스를 이용 중인 전체 사용자를 관리합니다."
        >
          <Button size="sm" className="gap-1.5">
            <UserPlus className="h-4 w-4" />
            사용자 추가
          </Button>
        </PageHeader>

        {/* 요약 통계 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            title="전체 사용자"
            value={String(users.length)}
            icon={Users}
          />
          <StatCard
            title="활성 사용자"
            value={String(activeCount)}
            change={`전체의 ${Math.round((activeCount / users.length) * 100)}%`}
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="관리자"
            value={String(adminCount)}
            icon={Users}
          />
        </div>

        {/* 검색 & 필터 */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            placeholder="이름 또는 이메일로 검색..."
            className="max-w-xs"
            disabled
          />
          <div className="flex gap-2">
            {["전체", "활성", "비활성"].map((filter) => (
              <Badge
                key={filter}
                variant={filter === "전체" ? "default" : "outline"}
                className="cursor-default"
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>

        {/* 사용자 테이블 */}
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>사용자</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="hidden md:table-cell">가입일</TableHead>
                <TableHead className="hidden lg:table-cell">
                  마지막 접속
                </TableHead>
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
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={roleVariant[user.role] ?? "outline"}
                      className="text-xs"
                    >
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
                  <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                    {user.lastActive}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* 페이지네이션 (정적) */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>총 {users.length}명 중 {users.length}명 표시</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              이전
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              다음
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
