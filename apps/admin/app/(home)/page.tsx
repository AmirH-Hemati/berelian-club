"use client";

import PageSpinner from "@/components/PageSpinner";
import AdminDashboard from "@/features/dashboard/components/AdminDashboard";
import ConsultantDashboard from "@/features/dashboard/components/ConsultantDashboard";
import ReceptionDashboard from "@/features/dashboard/components/ReceptionDashboard";
import { useUser } from "@repo/auth";

export default function DashboardPage() {
  const { user, isLoading } = useUser();
  if (isLoading) return <PageSpinner />;
  switch (user?.role) {
    case "admin":
      return <AdminDashboard />;

    case "reception":
      return <ReceptionDashboard />;

    case "consultant":
      return <ConsultantDashboard />;

    default:
      return null;
  }
}
