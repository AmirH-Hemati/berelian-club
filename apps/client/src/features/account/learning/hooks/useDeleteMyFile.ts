"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFileApi } from "../services/learning";

export function useDeleteFile() {
  const queryClient = useQueryClient();

  const { mutate: deleteFile, isPending: isDeleting } = useMutation({
    mutationFn: deleteFileApi,

    onSuccess: () => {
      toast.success("فایل با موفقیت حذف شد");

      queryClient.invalidateQueries({
        queryKey: ["userFiles"],
      });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "خطا در حذف فایل");
    },
  });

  return {
    deleteFile,
    isDeleting,
  };
}
