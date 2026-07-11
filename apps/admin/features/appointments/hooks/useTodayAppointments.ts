import { useQuery } from "@tanstack/react-query";
import { getTodayAppointments } from "../services/appointmentServices";

export function useTodayAppointments() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: getTodayAppointments,
    queryKey: ["todayAppointments"],
  });

  return {
    appointments: data ?? [],
    isLoading,
    isError,
    refetch,
  };
}
