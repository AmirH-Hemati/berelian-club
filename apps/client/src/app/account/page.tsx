import Stats from "@/features/account/dashboard/components/Stats";

import ContractStatus from "@/features/account/dashboard/components/ContractStatus";

import NotificationsWidget from "@/features/account/dashboard/components/NotificationsWidget";
import RecentRequests from "@/features/account/requests/components/RecentRequests";

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <Stats />
      <ContractStatus />
      <div className="grid gap-6 lg:grid-cols-2">
        <NotificationsWidget />
        <RecentRequests />
      </div>
    </div>
  );
}
