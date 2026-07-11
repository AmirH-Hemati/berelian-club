import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { markAllNotificationsAsRead } from "../services/notificationsService";

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  const { mutate: markAllAsRead, isPending: isMarkingAll } = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      toast.success("همه اعلان‌ها خوانده شدند.");
    },
    onError: () => {
      toast.error("خطا در خواندن اعلان‌ها");
    },
  });

  return {
    markAllAsRead,
    isMarkingAll,
  };
}
