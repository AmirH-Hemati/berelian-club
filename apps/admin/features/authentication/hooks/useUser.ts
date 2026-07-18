import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authServices";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export function useUser() {
  const router = useRouter();
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
    retry: false,
  });

  useEffect(() => {
    if (isLoading) return;
    if (user?.role !== "investor") {
      router.replace("/login");
    }
  }, [isLoading, user]);

  return { user, isLoading, isError, refetch };
}
