import {
  LayoutDashboard,
  UserCircle,
  ClipboardList,
  CalendarClock,
  BookOpen,
} from "lucide-react";

export const sidebarItems = [
  { label: "داشبورد", icon: LayoutDashboard, href: "" },
  { label: "پروفایل شخصی", icon: UserCircle, href: "/profile" },
  { label: "درخواست‌ها", icon: ClipboardList, href: "/requests" },
  { label: "رزرو مشاوره", icon: CalendarClock, href: "/appointments" },
  { label: "محتوای آموزشی", icon: BookOpen, href: "/learning" },
];
