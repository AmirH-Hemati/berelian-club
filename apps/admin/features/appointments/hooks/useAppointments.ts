import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../services/appointmentServices";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
type ApiError = {
  message: string;
};
export function useAppointments() {
  const searchParams = useSearchParams();
  const tableQuery = useTableQuery();

  const query = {
    ...tableQuery,
    status: searchParams.get("status") ?? "",
    type: searchParams.get("type") ?? "",
    consultant: searchParams.get("consultant") ?? "",
    investor: searchParams.get("investor") ?? "",
    "appointmentDate[gte]": searchParams.get("appointmentDate[gte]") ?? "",
    "appointmentDate[lt]": searchParams.get("appointmentDate[lt]") ?? "",
  };

  const {
    data = {},
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryFn: () => getAppointments(query),
    queryKey: ["appointments", query],
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
