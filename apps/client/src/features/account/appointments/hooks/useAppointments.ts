"use client";

import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getAppointments } from "../services/appointmentsService";
import { useTableQuery } from "@/hooks/useTableQuery";

type ApiError = {
  message: string;
};

export function useAppointments() {
  const query = useTableQuery();

  const {
    data = {},
    isLoading,
    isError,
    refetch,
    error,
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
    error: error as AxiosError<ApiError> | null,
  };
}
