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

  console.log(data.data);
  return { appointments: data.data ?? [], isLoading, isError, refetch };
}
