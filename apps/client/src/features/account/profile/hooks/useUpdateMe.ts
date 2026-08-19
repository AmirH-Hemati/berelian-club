import { updateMe as updateMeApi } from "@repo/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUpdateMe() {
  const queryClient = useQueryClient();
  const { mutate: updateMe, isPending: isUpdating } = useMutation({
    mutationFn: updateMeApi,
    onSuccess: () => {
      toast.success("اطلاعات شما با موفقیت اپدیت شد");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { updateMe, isUpdating };
}
