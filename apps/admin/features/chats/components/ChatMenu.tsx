"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, XCircle, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCloseConversation } from "../hooks/useCloseConversation";
import { DeleteRequestDialog } from "@/features/requests/components/DeleteRequestDialog";

interface ChatMenuProps {
  conversationId: string;
  isActive: boolean;
  requestId: string;
}

export function ChatMenu({
  conversationId,
  isActive,
  requestId,
}: ChatMenuProps) {
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const { closeConversation, isClosing } = useCloseConversation();

  const handleClose = () => {
    closeConversation(conversationId);
    setCloseDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreVertical className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {isActive && (
            <DropdownMenuItem
              onClick={() => setCloseDialogOpen(true)}
              className="cursor-pointer"
            >
              <XCircle className="size-4 ml-2" />
              بستن گفتگو
            </DropdownMenuItem>
          )}

          <DeleteRequestDialog requestId={requestId} />
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={closeDialogOpen} onOpenChange={setCloseDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>آیا از بستن گفتگو مطمئن هستید؟</AlertDialogTitle>
            <AlertDialogDescription>
              با بستن گفتگو، دیگر نمی‌توانید پیام جدیدی ارسال یا دریافت کنید. در
              صورت نیاز میتوانید مجدداً گفتگو را باز کنید.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isClosing}>انصراف</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClose}
              disabled={isClosing}
              className="bg-red-600 hover:bg-red-700"
            >
              {isClosing ? "در حال بستن..." : "بستن گفتگو"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
