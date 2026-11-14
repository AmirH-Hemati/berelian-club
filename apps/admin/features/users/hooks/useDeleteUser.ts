import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteUser as deleteUserApi } from "../services/usersServices";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteUserApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("کاربر با موفقیت حذف شد");
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
    retry: false,
  });

  return { deleteUser, isDeleting };
}
