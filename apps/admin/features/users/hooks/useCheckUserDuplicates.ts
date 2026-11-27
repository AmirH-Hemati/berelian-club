import { useMutation } from "@tanstack/react-query";
import type { CheckUserDuplicatesInput } from "@repo/schema";

import { checkUserDuplicates as checkUserDuplicatesService } from "../services/usersServices";

export function useCheckUserDuplicates() {
  const mutation = useMutation({
    mutationFn: (data: CheckUserDuplicatesInput) =>
      checkUserDuplicatesService(data),
  });

  return {
    checkUserDuplicates: mutation.mutateAsync,
    isChecking: mutation.isPending,
  };
}
