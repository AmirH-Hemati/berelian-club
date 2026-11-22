"use client";

import PageSpinner from "@/components/PageSpinner";
import SearchFilter from "@/components/SearchFilter";

import AddNewFile from "@/features/files/components/AddNewFile";
import FilesTable from "@/features/files/components/FilesTable";
import { SendFileToAllModal } from "@/features/files/components/SendFileToAllModal";
import FilterButton from "@/features/filters/components/FilterButton";
import { fileFiltersConfig } from "@/features/filters/config/filters.config";

import { Files } from "lucide-react";
import { Suspense } from "react";

export default function Page() {
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchFilter />
        <FilterButton config={fileFiltersConfig} />
      </div>

      {/* Files Table */}
      <Suspense fallback={<PageSpinner />}>
        <FilesTable />
      </Suspense>
    </div>
  );
}
