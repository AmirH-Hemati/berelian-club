import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeFollowUps as completeFollowUpsApi } from "../services/followUps.service";
import { toast } from "react-toastify";

export function useCompleteFollowUp() {
  const queryClient = useQueryClient();

  const { mutate: completeFollowUps, isPending: isCompleting } = useMutation({
    mutationFn: completeFollowUpsApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["followUps"],
      });
      toast.success("پیگیری انجام شد.");
    },
    onError: (err: any) => {
      toast.error(err.response.data.message || "خطا در انجام پیگیری");
    },
  });

  return { completeFollowUps, isCompleting };
}
