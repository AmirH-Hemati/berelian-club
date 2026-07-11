"use client";

import { DataTable } from "@/components/DataTable";
import SearchFilter from "@/components/SearchFilter";
import { TableSkeleton } from "@/components/TableSkeleton";
import TabsComponents from "@/components/TabsComponents";
import { columns } from "@/features/requests/components/columns";
import { useRequests } from "@/features/requests/hooks/useRequests";

export default function Page() {
  const { requests, pagination, isLoading, isError, refetch } = useRequests();

  return (
    <div className="overflow-auto space-y-4 mt-4">
      <h1 className="font-semibold">درخواست های کاربران</h1>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <TabsComponents />

        <SearchFilter />
      </div>
      <DataTable
        columns={columns}
        data={requests}
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
