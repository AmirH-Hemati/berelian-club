import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@repo/auth";
import { toast } from "react-toastify";

interface RescheduleParams {
  appointmentId: string;
  appointmentDate: Date;
  startAt: string;
  reason?: string;
}

export function useRescheduleAppointment() {
  const queryClient = useQueryClient();

  const { mutate: rescheduleAppointment, isPending: isRescheduling } =
    useMutation({
      mutationFn: async ({
        appointmentId,
        appointmentDate,
        startAt,
        reason,
      }: RescheduleParams) => {
        const { data } = await axiosInstance.patch(
          `/appointments/${appointmentId}/reschedule`,
          {
            appointmentDate,
            reason,
            startAt,
          },
        );
        return data.data;
      },
      onSuccess: (data) => {
        toast.success("زمان جلسه با موفقیت تغییر یافت");
        queryClient.invalidateQueries({ queryKey: ["appointments"] });
        queryClient.invalidateQueries({
          queryKey: ["appointment", data._id],
        });
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "خطا در تغییر زمان جلسه");
      },
    });

  return { rescheduleAppointment, isRescheduling };
}
