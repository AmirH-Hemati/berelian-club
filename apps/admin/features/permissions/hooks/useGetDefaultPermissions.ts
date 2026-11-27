import { useMutation } from "@tanstack/react-query";
import { getDefaultPermissions } from "../services/permissionsServices";

export function useGetDefaultPermissions() {
  const mutation = useMutation({
    mutationFn: getDefaultPermissions,
  });

  return {
    getDefaultPermissions: mutation.mutateAsync,
    isLoadingDefaults: mutation.isPending,
  };
}
