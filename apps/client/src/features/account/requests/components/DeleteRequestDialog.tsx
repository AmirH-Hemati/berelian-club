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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useDeleteRequest } from "../hooks/useDeleteRequest";

interface DeleteRequestDialogProps {
  requestId: string;
}

export function DeleteRequestDialog({ requestId }: DeleteRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const { deleteRequest, isDeleting } = useDeleteRequest();

  const handleDelete = () => {
    deleteRequest(requestId, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex justify-start"
          >
            <Trash2 className="size-4" />
            حذف درخواست
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              آیا از حذف این درخواست مطمئن هستید؟
            </AlertDialogTitle>
            <AlertDialogDescription>
              با حذف این درخواست، تمام اطلاعات مرتبط با آن شامل:
              <ul className="list-disc pr-6 mt-2 space-y-1">
                <li>گفتگوی مرتبط با درخواست</li>
                <li>همه پیام‌های موجود در گفتگو</li>
                <li>اطلاعات درخواست</li>
              </ul>
              <span className="block mt-2 font-medium text-red-600">
                این عمل قابل بازگشت نیست!
              </span>
            </AlertDialogDescription>
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
                "حذف درخواست"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
