"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecentAppointments } from "../services/appointmentServices";

export function useRecentAppointments() {
  const {
    data = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["recentAppointments"],
    queryFn: getRecentAppointments,
  });

  return { appointments: data.data ?? [], isLoading, isError, refetch };
}
