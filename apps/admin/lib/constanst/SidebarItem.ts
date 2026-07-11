import {
  ClockArrowDown,
  FilesIcon,
  LayoutDashboardIcon,
  SaudiRiyal,
  Users,
} from "lucide-react";
export const sidebarData = [
  { label: "داشبورد", icon: LayoutDashboardIcon, href: "/" },
  { label: "کاربران", icon: Users, href: "/users" },
  { label: "مشاوره ها", icon: ClockArrowDown, href: "/appointments" },
  { label: "درخواست ها", icon: SaudiRiyal, href: "/requests" },
  { label: "فایل ها", icon: FilesIcon, href: "/files" },
  { label: "پیگیری گزارشات", icon: FilesIcon, href: "/followUps" },
];
