"use client";
import { DataTable } from "@/components/DataTable";
import { useRequests } from "../hooks/useRequests";
import { columns } from "./columns";

export default function RequestsTable() {
  const { requests, pagination, isLoading, isError, refetch, error } =
    useRequests();
  return (
    <DataTable
      columns={columns}
      data={requests ?? []}
      currentPage={pagination?.page ?? 1}
      totalPages={pagination?.totalPages ?? 1}
      limit={pagination?.limit ?? 10}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage={
        error?.response?.data?.message || "دریافت درخواست‌ها با خطا مواجه شد."
      }
    />
  );
}
