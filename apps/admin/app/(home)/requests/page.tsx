"use client";

import PageSpinner from "@/components/PageSpinner";
import FilterButton from "@/features/filters/components/FilterButton";
import { requestFiltersConfig } from "@/features/filters/config/filters.config";
import RequestsTable from "@/features/requests/components/RequestsTable";
import { useGetInvestors } from "@/features/users/hooks/useGetInvestors";
import { useGetReceptions } from "@/features/users/hooks/useGetReceptions";
import { ClipboardList } from "lucide-react";
import { Suspense } from "react";

export default function Page() {
  const { investors, isLoading: investorsLoading } = useGetInvestors();
  const { receptions, isLoading: receptionsLoading } = useGetReceptions();

  const filterOptions = {
    investor: {
      options: investors.map((user) => ({
        label: `${user.firstName} ${user.lastName}`,
        value: user._id,
        description: user.phoneNumber,
      })),
      isLoading: investorsLoading,
    },

    assignedTo: {
      options: receptions.map((user) => ({
        label: `${user.firstName} ${user.lastName}`,
        value: user._id,
        description: user.phoneNumber,
      })),
      isLoading: receptionsLoading,
    },
  };

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
        {/* Filters */}
        <FilterButton
          config={requestFiltersConfig}
          filterOptions={filterOptions}
        />
      </div>

      {/* <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <TabsComponents />
      </div> */}

      {/* Requests Table */}
      <Suspense fallback={<PageSpinner />}>
        <RequestsTable />
      </Suspense>
    </div>
  );
}
