"use client";

import { DataTable } from "@/components/DataTable";
import { useFiles } from "../hooks/useFiles";
import { columns } from "./columns";

export default function FilesTable() {
  const { files, isLoading, pagination, isError, refetch, error } = useFiles();

  return (
    <DataTable
      columns={columns}
      data={files ?? []}
      currentPage={pagination?.page ?? 1}
      totalPages={pagination?.totalPages ?? 1}
      limit={pagination?.limit ?? 10}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage={
        error?.response?.data?.message || "دریافت فایل‌ها با خطا مواجه شد."
      }
    />
  );
}
