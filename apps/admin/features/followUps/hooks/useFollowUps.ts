import { useQuery } from "@tanstack/react-query";
import { getFollowUps } from "../services/followUps.service";
import { useTableQuery } from "@/hooks/useTableQuery";

export function useFollowUps() {
  const query = useTableQuery();

  const {
    data = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["followUps", query.page, query.limit, query.search],

    queryFn: () => getFollowUps(query),
  });

  return {
    followUps: data.data ?? [],
    pagination: data.pagination ?? null,
    isLoading,
    isError,
    refetch,
  };
}
