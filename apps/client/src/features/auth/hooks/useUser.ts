import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authServices";
import { useAuthStore } from "@/components/providers/authStore";
export function useUser() {
  const auth = useAuthStore();
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
    retry: false,
    enabled: auth.status === "unknown",
  });

  return { user, isLoading, isError, refetch };
}
