import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteFollowUp as deleteFollowUpApi } from "../services/followUps.service";

export const useDeleteFollowUp = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteFollowUp, isPending: isDeleting } = useMutation({
    mutationFn: deleteFollowUpApi,
    onSuccess: () => {
      toast.success("پیگیری گزارش با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["followUps"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در حذف پیگیری گزارش");
    },
  });

  return { deleteFollowUp, isDeleting };
};
