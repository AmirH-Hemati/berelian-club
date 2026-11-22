"use client";

import SearchFilter from "@/components/SearchFilter";
import { ClipboardCheck } from "lucide-react";
import { followupFiltersConfig } from "@/features/filters/config/filters.config";
import FilterButton from "@/features/filters/components/FilterButton";
import { useGetConsultant } from "@/features/users/hooks/useGetConsultant";
import FollowUpsTable from "@/features/followUps/components/FollowUpsTable";
import PageSpinner from "@/components/PageSpinner";
import { Suspense } from "react";

export default function Page() {
  const { consultants, isLoading: consultantsLoading } = useGetConsultant();

  const filterOptions = {
    consultant: {
      options: consultants.map((user) => ({
        label: `${user.firstName} ${user.lastName}`,
        value: user._id,
        description: user.phoneNumber,
      })),
      isLoading: consultantsLoading,
    },
  };

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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchFilter />
        <FilterButton
          config={followupFiltersConfig}
          filterOptions={filterOptions}
        />
      </div>

      {/* Follow Ups Table */}
      <Suspense fallback={<PageSpinner />}>
        <FollowUpsTable />
      </Suspense>
    </div>
  );
}
