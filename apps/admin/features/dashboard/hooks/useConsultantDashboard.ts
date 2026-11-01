import { useQuery } from "@tanstack/react-query";
import { getConsultantDashboard } from "../services/dashboardServices";

export function useConsultantDashboard() {
  const {
    data: dashboard,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["consultantDashboard"],
    queryFn: getConsultantDashboard,
  });

  return {
    dashboard,
    isLoading,
    error,
    isError,
    refetch,
  };
}
