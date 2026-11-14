import { updateProfileAvatar } from "@repo/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUpdateAvatar() {
  const queryClient = useQueryClient();
  const { mutate: updateAvatar, isPending: isUpdating } = useMutation({
    mutationFn: updateProfileAvatar,
    onSuccess: () => {
      toast.success("اطلاعات شما با موفقیت اپدیت شد");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { updateAvatar, isUpdating };
}
