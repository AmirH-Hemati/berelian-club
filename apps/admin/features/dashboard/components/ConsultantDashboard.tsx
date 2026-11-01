"use client";

import { CalendarClock, CalendarCheck, Bell, CheckCircle2 } from "lucide-react";

import Stats from "./Stats";
import NotificationsList from "@/features/notifications/components/NotificationsList";

import { useConsultantDashboard } from "../hooks/useConsultantDashboard";
import AppointmentList from "@/features/appointments/components/AppointmentList";
import TodayFollowUps from "@/features/followUps/components/TodayFollowUps";

export default function ConsultantDashboard() {
  const { dashboard, isLoading, isError, refetch } = useConsultantDashboard();

  const stats = [
    {
      title: "درخواست‌های در انتظار",
      value: dashboard?.stats?.pendingAppointments ?? 0,
      icon: CalendarClock,
    },
    {
      title: "جلسات امروز",
      value: dashboard?.stats?.todayAppointments ?? 0,
      icon: CalendarCheck,
    },
    {
      title: "جلسات برگزارشده این ماه",
      value: dashboard?.stats?.monthlyCompletedAppointments ?? 0,
      icon: CheckCircle2,
    },
    {
      title: "اعلان‌های خوانده‌نشده",
      value: dashboard?.stats?.unreadNotifications ?? 0,
      icon: Bell,
    },
  ];

  return (
    <div className="mb-6 space-y-6">
      <Stats items={stats} isLoading={isLoading} />

      <div className="grid grid-cols-1 gap-4 text-right lg:grid-cols-2 2xl:grid-cols-3">
        <AppointmentList
          appointments={dashboard?.pendingAppointments?.appointments}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          title="درخواست‌های مشاوره جدید"
          mode="pending"
          emptyTitle="درخواست مشاوره‌ای وجود ندارد"
          emptyDescription="در حال حاضر درخواست مشاوره در انتظار بررسی ندارید."
        />

        <AppointmentList
          appointments={dashboard?.todayAppointments?.appointments}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          title="جلسات مشاوره امروز"
          mode="today"
          emptyTitle="جلسه‌ای برای امروز ندارید"
          emptyDescription="در حال حاضر جلسه مشاوره‌ای برای امروز برنامه‌ریزی نشده است."
        />

        <TodayFollowUps
          followUps={dashboard?.todayFollowUps?.followUps}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
        />

        <NotificationsList />
      </div>
    </div>
  );
}
