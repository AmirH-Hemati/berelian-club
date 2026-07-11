"use client";
import { DataTable } from "@/components/DataTable";
import SearchFilter from "@/components/SearchFilter";
import { columns } from "@/features/users/components/columns";
import UsersHeader from "@/features/users/components/UsersHeader";
import { useGetUsers } from "@/features/users/hooks/useGetUsers";

export default function Page() {
  const { users, pagination, isLoading, isError, refetch } = useGetUsers();

  return (
    <div className="space-y-6">
      <UsersHeader />
      <SearchFilter />
      <DataTable
        columns={columns}
        data={users}
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
