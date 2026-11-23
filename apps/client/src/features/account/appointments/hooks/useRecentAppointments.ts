"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecentMyAppointment } from "../services/appointmentsService";

export function useRecentAppointments() {
  const {
    data: appointments,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myAppointments"],
    queryFn: getRecentMyAppointment,
  });

  return { appointments, isLoading, isError, refetch };
}
