import { useQuery } from "@tanstack/react-query";
import { getAdminDashboard } from "../services/dashboardServices";

export function useAdminDashboard() {
  const {
    data: dashboard,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: getAdminDashboard,
  });

  return {
    dashboard,
    isLoading,
    isError,
    error,
    refetch,
  };
}
