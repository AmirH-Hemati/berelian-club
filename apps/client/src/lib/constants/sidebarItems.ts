import {
  LayoutDashboardIcon,
  UserIcon,
  ClipboardListIcon,
  CalendarClockIcon,
  BookOpenTextIcon,
} from "lucide-react";

export const sidebarItems = [
  { label: "داشبورد", icon: LayoutDashboardIcon, href: "" },
  { label: "پروفایل شخصی", icon: UserIcon, href: "/profile" },
  { label: "درخواست‌ها", icon: ClipboardListIcon, href: "/requests" },
  { label: "رزرو مشاوره", icon: CalendarClockIcon, href: "/appointments" },
  { label: "محتوای آموزشی", icon: BookOpenTextIcon, href: "/learning" },
];
