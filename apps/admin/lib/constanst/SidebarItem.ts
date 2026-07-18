import {
  CalendarClock,
  ClipboardCheck,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Users,
} from "lucide-react";

export const sidebarData = [
  {
    label: "داشبورد",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "کاربران",
    icon: Users,
    href: "/users",
  },
  {
    label: "مشاوره‌ها",
    icon: CalendarClock,
    href: "/appointments",
  },
  {
    label: "درخواست‌ها",
    icon: FileText,
    href: "/requests",
  },
  {
    label: "فایل‌ها",
    icon: FolderOpen,
    href: "/files",
  },
  {
    label: "پیگیری گزارشات",
    icon: ClipboardCheck,
    href: "/followUps",
  },
];
