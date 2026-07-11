"use client";
import { useQuery } from "@tanstack/react-query";
import { getRequests } from "../services/requestServices";
import { useTableQuery } from "@/hooks/useTableQuery";

export function useRequests() {
  const query = useTableQuery();

  const {
    data = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["requests", query.page, query.limit, query.search, query.status],
    queryFn: () => getRequests(query),
  });
  return {
    requests: data.data ?? [],
    pagination: data.pagination ?? null,
    isLoading,
    isError,
    refetch,
  };
}
