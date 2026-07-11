"use client";

import { useSearchParams } from "next/navigation";

export function useTableQuery() {
  const searchParams = useSearchParams();

  return {
    page: searchParams.get("page") ?? "1",
    limit: searchParams.get("limit") ?? "10",
    search: searchParams.get("search") ?? "",
    status: searchParams.get("status") ?? "",
  };
}
