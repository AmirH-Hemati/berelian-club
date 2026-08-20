"use client";

import { DataTable } from "@/components/DataTable";
import TabsComponents from "@/components/TabsComponents";
import { columns } from "@/features/appointments/components/columns";
import { useAppointments } from "@/features/appointments/hooks/useAppointments";

export default function Page() {
  const { appointments, pagination, isLoading, isError, refetch } =
    useAppointments();

  return (
    <div className="overflow-auto space-y-4 mt-4">
      <h1 className="font-semibold text-500">مشاوره های رزرو شده</h1>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <TabsComponents />

        {/* <SearchFilter /> */}
      </div>
      <DataTable
        columns={columns}
        data={appointments}
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
