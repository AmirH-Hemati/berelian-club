"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui";
import { Button } from "@repo/ui";
import { Textarea } from "@repo/ui";
import { Label } from "@repo/ui";
import { Loader2, XCircle } from "lucide-react";
import { useRejectAppointment } from "../hooks/useRejectAppointment";
import { toast } from "react-toastify";

interface RejectAppointmentDialogProps {
  appointmentId: string;
}

export function RejectAppointmentDialog({
  appointmentId,
}: RejectAppointmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const { rejectAppointment, isPending } = useRejectAppointment();

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast.error("لطفاً دلیل رد را وارد کنید");
      return;
    }

    rejectAppointment(
      { appointmentId, rejectionReason },
      {
        onSuccess: () => {
          setOpen(false);
          setRejectionReason("");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isPending}
          variant="destructive"
          className="w-1/2 md:w-fit"
        >
          <XCircle className="size-4" />
          رد درخواست
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>رد درخواست مشاوره</DialogTitle>
          <DialogDescription>
            لطفاً دلیل رد درخواست مشاوره را وارد کنید. این دلیل برای کاربر نمایش
            داده خواهد شد.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason">دلیل رد درخواست</Label>
            <Textarea
              id="reason"
              placeholder="مثال: زمان مناسب وجود ندارد / اطلاعات ناقص است / ..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
              setRejectionReason("");
            }}
          >
            انصراف
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleReject}
            disabled={isPending || !rejectionReason.trim()}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 ml-2 animate-spin" />
                در حال رد...
              </>
            ) : (
              <>
                <XCircle className="size-4 ml-2" />
                رد درخواست
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
