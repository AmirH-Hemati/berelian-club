"use client";
import { DataTable } from "@/components/DataTable";
import { useFollowUps } from "../hooks/useFollowUps";
import { columns } from "./columns";

export default function FollowUpsTable() {
  const { followUps, pagination, isLoading, isError, refetch, error } =
    useFollowUps();
  return (
    <DataTable
      columns={columns}
      data={followUps ?? []}
      currentPage={pagination?.page ?? 1}
      totalPages={pagination?.totalPages ?? 1}
      limit={pagination?.limit ?? 10}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage={
        error?.response?.data?.message || "دریافت پیگیری‌ها با خطا مواجه شد."
      }
    />
  );
}
