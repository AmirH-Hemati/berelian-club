"use client";

import PageSpinner from "@/components/PageSpinner";
import AppointmentsTable from "@/features/appointments/components/AppointmentsTable";
import FilterButton from "@/features/filters/components/FilterButton";
import { appointmentFiltersConfig } from "@/features/filters/config/filters.config";
import { useGetConsultant } from "@/features/users/hooks/useGetConsultant";
import { useGetInvestors } from "@/features/users/hooks/useGetInvestors";

import { CalendarDays } from "lucide-react";
import { Suspense } from "react";

export default function Page() {
  const { investors, isLoading: investorsLoading } = useGetInvestors();
  const { consultants, isLoading: consultantsLoading } = useGetConsultant();

  const filterOptions = {
    investor: {
      options: investors.map((user) => ({
        label: `${user.firstName} ${user.lastName}`,
        value: user._id,
        description: user.phoneNumber,
      })),
      isLoading: investorsLoading,
    },

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
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CalendarDays className="size-5" />
          </div>

          <div>
            <h1 className="text-400 font-bold text-foreground">
              مدیریت جلسات مشاوره
            </h1>

            <p className="mt-1 text-200 text-muted-foreground">
              مشاهده، بررسی و مدیریت درخواست‌های رزرو مشاوره
            </p>
          </div>
        </div>

        {/* Filters */}

        <FilterButton
          config={appointmentFiltersConfig}
          filterOptions={filterOptions}
        />
      </div>

      {/* <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <TabsComponents />
      </div> */}

      {/* Appointments Table */}
      <Suspense fallback={<PageSpinner />}>
        <AppointmentsTable />
      </Suspense>
    </div>
  );
}
