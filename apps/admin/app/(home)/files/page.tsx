"use client";

import { DataTable } from "@/components/DataTable";
import SearchFilter from "@/components/SearchFilter";
import { TableSkeleton } from "@/components/TableSkeleton";
import AddNewFile from "@/features/files/components/AddNewFile";
import { columns } from "@/features/files/components/columns";
import { useFiles } from "@/features/files/hooks/useFiles";

export default function Page() {
  const { files, isLoading, pagination, isError, refetch } = useFiles();

  return (
    <div className="overflow-auto space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-500">مدیریت فایل ها</h1>
        <AddNewFile />
      </div>
      <SearchFilter />
      <DataTable
        columns={columns}
        data={files}
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
