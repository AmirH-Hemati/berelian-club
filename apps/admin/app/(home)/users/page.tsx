"use client";

import PageSpinner from "@/components/PageSpinner";
import SearchFilter from "@/components/SearchFilter";
import FilterButton from "@/features/filters/components/FilterButton";
import { userFiltersConfig } from "@/features/filters/config/filters.config";
import UsersHeader from "@/features/users/components/UsersHeader";
import UsersTable from "@/features/users/components/UsersTable";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="mt-5 space-y-5">
      <UsersHeader />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchFilter />

        <FilterButton config={userFiltersConfig} />
      </div>

      <Suspense fallback={<PageSpinner />}>
        <UsersTable />
      </Suspense>
    </div>
  );
}
