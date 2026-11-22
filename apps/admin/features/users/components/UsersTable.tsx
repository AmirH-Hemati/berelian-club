"use client";

import { useGetUsers } from "../hooks/useGetUsers";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";

export default function UsersTable() {
  const { users, pagination, isLoading, isError, refetch, error } =
    useGetUsers();
  return (
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
  );
}
