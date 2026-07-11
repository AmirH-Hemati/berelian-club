"use client";

import { DataTable } from "@/components/DataTable";
import Spinner from "@/components/Spinner";
import { columns } from "@/features/comments/components/columns";
import { useGetComments } from "@/features/comments/hooks/useGetComments";

export default function Page() {
  const { commetns, isLoading } = useGetComments();
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="overflow-auto space-y-4 mt-4">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">کامنت ها </h1>
      </div>
      <DataTable columns={columns} data={commetns} />
    </div>
  );
}
