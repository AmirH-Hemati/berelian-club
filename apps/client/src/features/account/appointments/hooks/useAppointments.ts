"use client";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../services/appointmentsService";
import { useTableQuery } from "@/hooks/useTableQuery";

export function useAppointments() {
  const query = useTableQuery();

  const {
    data = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["appointments", query.page, query.limit, query.search],
    queryFn: () => getAppointments(query),
  });

  return {
    appointments: data.data ?? [],
    pagination: data.pagination ?? null,
    isLoading,
    isError,
    refetch,
  };
}
