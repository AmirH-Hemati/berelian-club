"use client";

import { DataTable } from "@/components/DataTable";
import SearchFilter from "@/components/SearchFilter";
import { columns } from "@/features/followUps/components/columns";
import { useFollowUps } from "@/features/followUps/hooks/useFollowUps";
import { ClipboardCheck } from "lucide-react";

export default function Page() {
  const { followUps, pagination, isLoading, isError, refetch, error } =
    useFollowUps();

  return (
    <div className="mt-5 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ClipboardCheck className="size-5" />
        </div>

        <div>
          <h1 className="text-base font-bold text-foreground">
            مدیریت پیگیری‌ها
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            بررسی گزارش جلسات، پیگیری اقدامات و کنترل موعدهای سررسید
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-xl border border-border bg-card p-3">
        <SearchFilter />
      </div>

      {/* Follow Ups Table */}
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
    </div>
  );
}
