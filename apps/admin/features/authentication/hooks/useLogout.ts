import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout as logoutApi } from "../services/authServices";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      router.push("/", { scroll: false });
    },
  });

  return { logout, isPending };
}
