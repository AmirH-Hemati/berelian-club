import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authServices";
export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
    retry: false,
  });

  return { user, isLoading };
}
