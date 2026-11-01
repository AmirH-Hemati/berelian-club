"use client";

import { FilePlus, FileCheck, Bell, TrendingUp } from "lucide-react";

import Stats from "./Stats";
import RequestList from "@/features/requests/components/RequestList";
import { useReceptionDashboard } from "../hooks/useReceptionDashboard";
import NotificationsList from "@/features/notifications/components/NotificationsList";

export default function ReceptionDashboard() {
  const { receptions, isLoading, isError, refetch } = useReceptionDashboard();

  const stats = [
    {
      title: "درخواست‌های جدید",
      value: receptions?.stats?.newRequests ?? 0,
      icon: FilePlus,
    },
    {
      title: "درخواست‌های من",
      value: receptions?.stats?.myRequests ?? 0,
      icon: FileCheck,
    },
    {
      title: "نوتیفیکیشن‌های خوانده‌نشده",
      value: receptions?.stats?.unreadNotifications ?? 0,
      icon: Bell,
    },
    {
      title: "عملکرد ماهانه",
      value: receptions?.stats?.monthlyCompletedRequests ?? 0,
      icon: TrendingUp,
      description: "درخواست تکمیل‌شده در ماه جاری",
    },
  ];

  return (
    <div className="space-y-6 mb-6">
      <Stats items={stats} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4  text-right">
        <RequestList
          requests={receptions?.newRequests?.requests}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          newRequest
          title="درخواست‌های جدید"
          emptyTitle="درخواست جدیدی وجود ندارد"
          emptyDescription="در حال حاضر درخواست بررسی‌نشده‌ای ثبت نشده است."
        />

        <RequestList
          requests={receptions?.myRequests?.requests}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          title="درخواست‌های من"
        />
        <NotificationsList />
      </div>
    </div>
  );
}
