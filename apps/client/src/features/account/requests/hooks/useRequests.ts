import { useQuery } from "@tanstack/react-query";
import { getRequests } from "../services/requestsService";
import { useTableQuery } from "@/hooks/useTableQuery";

export function useRequests() {
  const query = useTableQuery();

  const {
    data = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => getRequests(query),
    queryKey: ["requests", query.page, query.limit, query.search],
  });

  return {
    requests: data.data ?? [],
    pagination: data.pagination ?? null,
    isLoading,
    isError,
    refetch,
  };
}
