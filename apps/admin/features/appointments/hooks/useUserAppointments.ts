"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserAppointments } from "../services/appointmentServices";

export function useUserAppointments(userId: string) {
  const {
    data = [],
    isLoading,
    isError,
    refetch, error
  } = useQuery({
    queryKey: ["userAppointments", userId],
    queryFn: () => getUserAppointments(userId as string),
  });

  return { appointments: data ?? [], isLoading, isError, refetch ,error };
}
