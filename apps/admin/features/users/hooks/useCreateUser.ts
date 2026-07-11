import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createUser as createUserApi } from "../services/usersServices";
import {CreateUserInputTypes} from "@repo/schema"

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: (data: CreateUserInputTypes) => createUserApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("کاربر جدید با موفقیت اضافه شد.");
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { createUser, isCreating };
}
