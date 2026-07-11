"use client";
import { useQuery } from "@tanstack/react-query";
import { getFiles } from "../services/uploadServices";
import { useTableQuery } from "@/hooks/useTableQuery";

export function useFiles() {
  const query = useTableQuery();

  const {
    data = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["files", query.page, query.limit, query.search],
    queryFn: () => getFiles(query),
  });
  return {
    files: data.data ?? [],
    pagination: data.pagination ?? null,
    isLoading,
    isError,
    refetch,
  };
}
