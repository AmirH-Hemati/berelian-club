import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUser as updateUserApi } from "../services/usersServices";
import { updateUserInputTypes } from "@repo/schema";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ data, id }: { id: string; data: updateUserInputTypes }) =>
      updateUserApi(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("اطلاعات کاربر با موفقیت آپدیت شد");
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
    retry: false,
  });

  return { updateUser, isUpdating };
}
