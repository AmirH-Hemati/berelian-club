import { Users, FileClock, CalendarClock, FileCheck } from "lucide-react";

import Stats from "./Stats";
import type { AdminDashboardStats } from "../types/adminDashboard";

interface AdminStatsProps {
  stats?: AdminDashboardStats;
  isLoading: boolean;
}

export default function AdminStats({ stats, isLoading }: AdminStatsProps) {
  const items = [
    {
      title: "کل سرمایه‌گذاران",
      value: stats?.investors ?? 0,
      icon: Users,
    },
    {
      title: "درخواست‌های در انتظار",
      value: stats?.pendingRequests ?? 0,
      icon: FileClock,
    },
    {
      title: "نوبت‌های در انتظار",
      value: stats?.pendingAppointments ?? 0,
      icon: CalendarClock,
    },
    {
      title: "درخواست‌های تکمیل‌شده ماه",
      value: stats?.monthlyCompletedRequests ?? 0,
      icon: FileCheck,
    },
  ];

  return <Stats items={items} isLoading={isLoading} />;
}
