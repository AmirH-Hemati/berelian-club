"use client";

import { DataTable } from "@/components/DataTable";
import SearchFilter from "@/components/SearchFilter";
import { columns } from "@/features/followUps/components/columns";
import { useFollowUps } from "@/features/followUps/hooks/useFollowUps";

export default function Page() {
  const { followUps, pagination, isLoading, isError, refetch } = useFollowUps();

  return (
    <div className="overflow-auto space-y-4 mt-4">
      <h1 className="font-semibold text-500">پیگیری گزارشات</h1>
      <SearchFilter />
      <DataTable
        columns={columns}
        data={followUps}
        currentPage={pagination?.page}
        totalPages={pagination?.totalPages}
        limit={pagination?.limit}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
      />
    </div>
  );
}
