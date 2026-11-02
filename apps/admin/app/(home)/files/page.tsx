"use client";

import { DataTable } from "@/components/DataTable";
import SearchFilter from "@/components/SearchFilter";

import AddNewFile from "@/features/files/components/AddNewFile";
import { columns } from "@/features/files/components/columns";
import { SendFileToAllModal } from "@/features/files/components/SendFileToAllModal";
import { useFiles } from "@/features/files/hooks/useFiles";

import { Files } from "lucide-react";

export default function Page() {
  const { files, isLoading, pagination, isError, refetch, error } = useFiles();

  return (
    <div className="mt-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Files className="size-5" />
          </div>

          <div>
            <h1 className="text-base font-bold text-foreground">
              مدیریت فایل‌ها
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              مدیریت، بارگذاری و ارسال فایل‌های آموزشی و منابع کاربران
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <AddNewFile />
          <SendFileToAllModal />
        </div>
      </div>

      {/* Search */}
      <div className="rounded-xl border border-border bg-card p-3">
        <SearchFilter />
      </div>

      {/* Files Table */}
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
    </div>
  );
}
