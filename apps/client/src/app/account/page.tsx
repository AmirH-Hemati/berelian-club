import Stats from "@/features/account/dashboard/components/Stats";

import ContractStatus from "@/features/account/dashboard/components/ContractStatus";

import NotificationsWidget from "@/features/account/notifications/components/NotificationsList";
import RecentRequests from "@/features/account/requests/components/RecentRequests";
import RecentAppointments from "@/features/account/appointments/components/RecentAppointments";
import Spinner from "@/components/spinner/Spinner";
import { Suspense } from "react";

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <Stats />
      <ContractStatus />
      <Suspense fallback={<Spinner />}>
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentRequests />
          <RecentAppointments />
        </div>

        <NotificationsWidget />
      </Suspense>
    </div>
  );
}
