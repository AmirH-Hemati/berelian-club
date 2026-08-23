"use client";

import { DataTable } from "@/components/DataTable";
import SearchFilter from "@/components/SearchFilter";
import AddNewFile from "@/features/files/components/AddNewFile";
import { columns } from "@/features/files/components/columns";
import { SendFileToAllModal } from "@/features/files/components/SendFileToAllModal";
import { useFiles } from "@/features/files/hooks/useFiles";

export default function Page() {
  const { files, isLoading, pagination, isError, refetch } = useFiles();

  return (
    <div className="overflow-auto space-y-4 mt-4">
      <div className="flex gap-2 md:items-center md:justify-between flex-col md:flex-row">
        <h1 className="font-semibold text-500">مدیریت فایل ها</h1>
        <div className="grid grid-cols-2 gap-2">
          <AddNewFile />
          <SendFileToAllModal />
        </div>
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
