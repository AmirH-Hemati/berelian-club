"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui";

import Spinner from "@/components/PageSpinner";
import ErrorState from "@/components/ErrorState";

import UserDataBox from "@/features/users/components/UserDataBox";
import { useGetUser } from "@/features/users/hooks/useGetUser";
import ContractStatus from "@/features/users/components/ContractStatus";

import RequestList from "@/features/requests/components/RequestList";
import { useUserRequests } from "@/features/requests/hooks/useUserRequests";
import AppointmentList from "@/features/appointments/components/AppointmentList";
import { useUserAppointments } from "@/features/appointments/hooks/useUserAppointments";

export default function Page() {
  const { user, isLoading, isError, refetch } = useGetUser();

  const {
    requests,
    isLoading: requestsLoading,
    isError: requestsError,
    refetch: refetchRequests,
  } = useUserRequests(user?._id ?? "");

  const {
    appointments,
    isLoading: appointmentsLoading,
    isError: appointmentsError,
    refetch: refetchAppointments,
  } = useUserAppointments(user?._id ?? "");

  if (isLoading) return <Spinner />;

  if (isError || !user) {
    return (
      <div className="rounded-lg bg-muted/30 p-4">
        <ErrorState
          title="خطا در دریافت اطلاعات کاربر"
          description="امکان دریافت اطلاعات این کاربر وجود ندارد."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="mb-6 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">داشبورد</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/users">کاربران</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>
              {user.firstName} {user.lastName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <UserDataBox user={user} />

      <ContractStatus user={user} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <RequestList
          requests={requests}
          isLoading={requestsLoading}
          isError={requestsError}
          refetch={refetchRequests}
          title="درخواست‌های کاربر"
          emptyTitle="هیچ درخواستی ثبت نشده است"
          emptyDescription="این کاربر هنوز درخواستی ثبت نکرده است."
        />

        <AppointmentList
          appointments={appointments}
          isLoading={appointmentsLoading}
          isError={appointmentsError}
          refetch={refetchAppointments}
          title="نوبت‌های مشاوره اخیر"
        />
      </div>
    </div>
  );
}
