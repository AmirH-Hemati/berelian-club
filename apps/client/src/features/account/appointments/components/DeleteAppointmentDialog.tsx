"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  cn,
} from "@repo/ui";
import { Trash2, Loader2 } from "lucide-react";
import { useDeleteAppointment } from "../hooks/useDeleteAppointment";
import { useRouter } from "next/navigation";

interface DeleteAppointmentDialogProps {
  appointmentId: string;
  fullWidth?: boolean;
}

export function DeleteAppointmentDialog({
  appointmentId,
  fullWidth = false,
}: DeleteAppointmentDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { deleteAppointment, isDeleting } = useDeleteAppointment();

  const handleDelete = () => {
    deleteAppointment(appointmentId, {
      onSuccess: () => {
        router.push("/account/appointments");
        setOpen(false);
      },
    });
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="sm"
            className={cn(fullWidth && "w-full flex justify-start")}
          >
            <Trash2 className="size-4" />
            حذف نوبت مشاوره
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              آیا از حذف این نوبت مطمئن هستید؟
            </AlertDialogTitle>
            <AlertDialogDescription>
              با حذف این نوبت، اطلاعات مرتبط با آن نیز حذف خواهند شد:
            </AlertDialogDescription>

            <ul className="list-disc pr-6 mt-2 space-y-1 text-sm text-muted-foreground">
              <li>اطلاعات نوبت مشاوره</li>
              <li>اطلاعات و تاریخ برگزاری جلسه</li>
            </ul>
            <p className="mt-2 text-sm font-medium text-destructive">
              این عمل قابل بازگشت نیست!
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>انصراف</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-4 ml-2 animate-spin" />
                  در حال حذف...
                </>
              ) : (
                "حذف نوبت مشاوره"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
