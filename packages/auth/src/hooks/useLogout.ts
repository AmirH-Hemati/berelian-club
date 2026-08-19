"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout as logoutApi } from "../services/authServices";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLogouting } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      useAuthStore.getState().logout();

      queryClient.removeQueries({
        queryKey: ["user"],
      });

      toast.success("با موفقیت خارج شدید");

      router.replace("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "خطا در خروج از حساب");
    },
  });

  return { logout, isLogouting };
}
