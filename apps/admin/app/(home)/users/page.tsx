"use client";

import { DataTable } from "@/components/DataTable";
import SearchFilter from "@/components/SearchFilter";
import { columns } from "@/features/users/components/columns";
import UsersHeader from "@/features/users/components/UsersHeader";
import { useGetUsers } from "@/features/users/hooks/useGetUsers";

export default function Page() {
  const { users, pagination, isLoading, isError, refetch, error } =
    useGetUsers();

  return (
    <div className="mt-5 space-y-5">
      <UsersHeader />

      <div className="rounded-xl border border-border bg-card p-3">
        <SearchFilter />
      </div>

      <DataTable
        columns={columns}
        data={users ?? []}
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.totalPages ?? 1}
        limit={pagination?.limit ?? 10}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        errorMessage={
          error?.response?.data?.message ||
          "دریافت اطلاعات کاربران با خطا مواجه شد."
        }
      />
    </div>
  );
}
