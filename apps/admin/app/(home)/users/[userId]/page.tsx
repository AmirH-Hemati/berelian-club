"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Spinner from "@/components/PageSpinner";
import UserDataBox from "@/features/users/components/UserDataBox";
import { useGetUser } from "@/features/users/hooks/useGetUser";
import ContractStatus from "@/features/users/components/ContractStatus";
import UserRequestsList from "@/features/requests/components/UserRequestsList";
import ErrorState from "@/components/ErrorState";

export default function Page() {
  const { user, isLoading, isError, refetch } = useGetUser();
  if (isLoading) return <Spinner />;

  if (isError) {
    return (
      <div className="bg-muted/30 p-4 rounded-lg ">
        <ErrorState
          title="خطا در دریافت اطلاعات کاربر"
          description="امکان دریافت اطلاعات این کاربر وجود ندارد."
          onRetry={refetch}
        />
      </div>
    );
  }
  return (
    <div className="space-y-6 mb-6">
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
              {user?.firstName} {user?.lastName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <UserDataBox user={user} />
      <ContractStatus user={user} />

      <div className="md:grid-cols-2 grid-cols-1 grid gap-6">
        <UserRequestsList userId={user?._id} />
        <UserRequestsList userId={user?._id} />
      </div>
    </div>
  );
}
