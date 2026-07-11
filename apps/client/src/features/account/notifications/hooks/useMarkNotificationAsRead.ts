import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { markNotificationAsRead } from "../services/notificationsService";

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  const { mutate: markAsRead, isPending: isMarking } = useMutation({
    mutationFn: markNotificationAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      toast.success("اعلان خوانده شد");
    },

    onError: () => {
      toast.error("خطا در خواندن اعلان");
    },
  });

  return {
    markAsRead,
    isMarking,
  };
}
