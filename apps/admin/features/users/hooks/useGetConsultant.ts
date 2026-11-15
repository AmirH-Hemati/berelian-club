"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsersByRole } from "../services/usersServices";

export function useGetConsultant() {
  const query = useQuery({
    queryKey: ["users", "consultant"],
    queryFn: () => getUsersByRole("consultant"),
    staleTime: 5 * 60 * 1000,
  });

  return {
    consultants: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
