import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRequest as deleteRequestApi } from "../services/requestServices";
import { toast } from "react-toastify";

export const useDeleteRequest = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteRequest, isPending: isDeleting } = useMutation({
    mutationFn: deleteRequestApi,
    onSuccess: () => {
      toast.success("درخواست با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["conversation"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در تایید درخواست");
    },
  });

  return { deleteRequest, isDeleting };
};
