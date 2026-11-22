"use client";

import { DataTable } from "@/components/DataTable";
import { useAppointments } from "../hooks/useAppointments";
import { columns } from "./columns";

export default function AppointmentsTable() {
  const { appointments, pagination, isLoading, isError, refetch, error } =
    useAppointments();
  return (
    <DataTable
      columns={columns}
      data={appointments ?? []}
      currentPage={pagination?.page ?? 1}
      totalPages={pagination?.totalPages ?? 1}
      limit={pagination?.limit ?? 10}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage={error?.response?.data?.message as string}
    />
  );
}
