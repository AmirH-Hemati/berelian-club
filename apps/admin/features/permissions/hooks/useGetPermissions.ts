import { useQuery } from "@tanstack/react-query";
import { getPermissions } from "../services/permissionsServices";

export function useGetPermissions() {
  const {
    data: permissions,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["permissions"],
    queryFn: getPermissions,
  });

  return { permissions, isLoading, isError, refetch };
}
