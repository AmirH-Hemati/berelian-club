"use client";

import { DataTable } from "@/components/DataTable";
import TabsComponents from "@/components/TabsComponents";
import { columns } from "@/features/requests/components/columns";
import { useRequests } from "@/features/requests/hooks/useRequests";
import { ClipboardList } from "lucide-react";

export default function Page() {
  const { requests, pagination, isLoading, isError, refetch, error } =
    useRequests();

  return (
    <div className="mt-5 space-y-5">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardList className="size-5" />
          </div>

          <div>
            <h1 className="text-base font-bold text-foreground">
              مدیریت درخواست‌ها
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              مشاهده، بررسی و پیگیری درخواست‌های کاربران
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <TabsComponents />
      </div>

      {/* Requests Table */}
      <DataTable
        columns={columns}
        data={requests ?? []}
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.totalPages ?? 1}
        limit={pagination?.limit ?? 10}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        errorMessage={
          error?.response?.data?.message || "دریافت درخواست‌ها با خطا مواجه شد."
        }
      />
    </div>
  );
}
