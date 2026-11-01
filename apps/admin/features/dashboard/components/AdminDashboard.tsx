"use client";

import AdminStats from "./AdminStats";
import ConsultantPerformance from "./ConsultantPerformance";

import RequestList from "@/features/requests/components/RequestList";
import AppointmentList from "@/features/appointments/components/AppointmentList";
import NotificationsList from "@/features/notifications/components/NotificationsList";
import ReceptionPerformance from "./ReceptionPerformance.tsx";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { useRecentRequests } from "@/features/requests/hooks/useRecentRequests";
import { useRecentAppointments } from "@/features/appointments/hooks/useRecentAppointments";

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

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ReceptionPerformance
          receptions={dashboard?.receptionPerformance}
          isLoading={isLoading}
        />

        <ConsultantPerformance
          consultants={dashboard?.consultantPerformance}
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
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
      </div>

      <NotificationsList />
    </div>
  );
}
