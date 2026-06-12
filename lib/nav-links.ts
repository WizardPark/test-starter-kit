// 사이트 네비게이션 링크 공유 상수
// site-header.tsx와 mobile-nav.tsx에서 함께 사용
export const navLinks = [
  { href: "/", label: "홈" },
  { href: "/#examples", label: "예제" },
  { href: "/dashboard", label: "대시보드" },
] as const;
