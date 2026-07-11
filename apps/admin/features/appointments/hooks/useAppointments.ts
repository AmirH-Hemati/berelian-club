import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../services/appointmentServices";
import { useTableQuery } from "@/hooks/useTableQuery";

export function useAppointments() {
  const query = useTableQuery();
  const {
    data = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => getAppointments(query),
    queryKey: [
      "appointments",
      query.page,
      query.limit,
      query.search,
      query.status,
    ],
  });

  return {
    appointments: data.data ?? [],
    pagination: data.pagination ?? null,
    isLoading,
    isError,
    refetch,
  };
}
