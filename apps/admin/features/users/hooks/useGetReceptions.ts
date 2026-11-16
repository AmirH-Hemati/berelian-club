"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsersByRole } from "../services/usersServices";

export function useGetReceptions() {
  const query = useQuery({
    queryKey: ["users", "receptions"],
    queryFn: () => getUsersByRole("reception"),
    staleTime: 5 * 60 * 1000,
  });

  return {
    receptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}



