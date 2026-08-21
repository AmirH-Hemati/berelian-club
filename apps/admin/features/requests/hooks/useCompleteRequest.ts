import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeRequest as completeRequestApi } from "../services/requestServices";
import { toast } from "react-toastify";

export const useCompleteRequest = () => {
  const queryClient = useQueryClient();

  const { mutate: completeRequest, isPending:isCompleting } = useMutation({
    mutationFn: completeRequestApi,
    onSuccess: () => {
      toast.success("درخواست با موفقیت تکمیل شد");

      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در تایید درخواست");
    },
  });

  return { completeRequest, isCompleting };
};
