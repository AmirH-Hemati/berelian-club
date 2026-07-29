"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFile as deleteFileApi } from "../services/uploadServices";

export function useDeleteFile() {
  const qeuryClient = useQueryClient();
  const { mutate: deleteFile, isPending: isDeleting } = useMutation({
    mutationFn: deleteFileApi,
    onSuccess: () => {
      toast.success("فایل با موفقیت حذف شد");
      qeuryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: (err: any) => {
      toast.error(err.response.data.message || "خطا در حذف فایل");
    },
  });

  return { deleteFile, isDeleting };
}
