"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsersByRole } from "../services/usersServices";

export function useGetInvestors() {
  const query = useQuery({
    queryKey: ["users", "investor"],
    queryFn: () => getUsersByRole("investor"),
    staleTime: 5 * 60 * 1000,
  });

  return {
    investors: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
