import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authServices";
import { useAuthStore } from "@/components/providers/authStore";
import { useEffect } from "react";
export function useUser() {
  const status = useAuthStore((auth) => auth.status);
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
    retry: false,
    enabled: status !== "unAuthenticated",
  });

  useEffect(() => {
    if (user) {
      useAuthStore.getState().login();
    }
  }, [user]);

  return { user, isLoading, isError, refetch };
}
