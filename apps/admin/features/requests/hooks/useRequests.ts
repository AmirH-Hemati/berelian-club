"use client";
import { useQuery } from "@tanstack/react-query";
import { getRequests } from "../services/requestServices";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useSearchParams } from "next/navigation";

export function useRequests() {
  const searchParams = useSearchParams();
  const tableQuery = useTableQuery();

  const query = {
    ...tableQuery,
    status: searchParams.get("status") ?? "",
    type: searchParams.get("type") ?? "",
    assignedTo: searchParams.get("assignedTo") ?? "",
    investor: searchParams.get("investor") ?? "",
    "createdAt[gte]": searchParams.get("createdAt[gte]") ?? "",
    "createdAt[lte]": searchParams.get("createdAt[lte]") ?? "",
  };

  const {
    data = {},
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["requests", query],
    queryFn: () => getRequests(query),
  });
  return {
    requests: data.data ?? [],
    pagination: data.pagination ?? null,
    isLoading,
    isError,
    refetch,
    error,
  };
}
