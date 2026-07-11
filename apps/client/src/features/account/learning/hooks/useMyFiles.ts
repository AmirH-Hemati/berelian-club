"use client";
import { useQuery } from "@tanstack/react-query";
import { getMyFiles } from "../services/learning";
import { useTableQuery } from "@/hooks/useTableQuery";

export function useMyFiles() {
  const query = useTableQuery();

  const {
    data = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userFiles", query.page, query.limit, query.search],
    queryFn: () => getMyFiles(query),
  });

  return {
    files: data.data ?? [],
    pagination: data.pagination ?? null,
    isLoading,
    isError,
    refetch,
  };
}
