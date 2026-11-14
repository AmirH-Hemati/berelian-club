"use client";

import AdminStats from "./AdminStats";

import AppointmentList from "@/features/appointments/components/AppointmentList";
import { useRecentAppointments } from "@/features/appointments/hooks/useRecentAppointments";
import NotificationsList from "@/features/notifications/components/NotificationsList";
import RequestList from "@/features/requests/components/RequestList";
import { useRecentRequests } from "@/features/requests/hooks/useRecentRequests";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import ActivityChart from "./ActivityChart";
import PerformanceChart from "./PerformanceCard";

export default function AdminDashboard() {
  const { dashboard, isLoading, isError, refetch } = useAdminDashboard();
  const {
    requests,
    isLoading: isLoading2,
    isError: isError2,
    refetch: refetch2,
  } = useRecentRequests();
  const {
    appointments,
    isLoading: isLoading3,
    isError: isError3,
    refetch: refetch3,
  } = useRecentAppointments();

  return (
    <div className="mb-6 space-y-6">
      <AdminStats stats={dashboard?.stats} isLoading={isLoading} />
      <ActivityChart
        requests={dashboard?.activityChart?.requests}
        appointments={dashboard?.activityChart?.appointments}
        isLoading={isLoading}
      />
      <PerformanceChart
        receptionPerformance={dashboard?.receptionPerformance}
        consultantPerformance={dashboard?.consultantPerformance}
        isLoading={isLoading}
      />

      <div className="grid grid-cols-1 gap-4 text-right lg:grid-cols-2 2xl:grid-cols-3">
        <RequestList
          requests={requests}
          isLoading={isLoading2}
          isError={isError2}
          refetch={refetch2}
          title="درخواست‌های اخیر"
        />

        <AppointmentList
          appointments={appointments}
          isLoading={isLoading3}
          isError={isError3}
          refetch={refetch3}
          title="نوبت‌های اخیر"
        />
      <NotificationsList />
      </div>
    </div>
  );
}
