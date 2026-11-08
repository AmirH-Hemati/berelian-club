"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui";
import { MoreVertical, XCircle } from "lucide-react";
import { useCloseConversation } from "../hooks/useCloseConversation";

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
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <MoreVertical className="size-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-52 rounded-xl p-1.5 shadow-lg"
        >
          {isActive && (
            <DropdownMenuItem
              onClick={() => setCloseDialogOpen(true)}
              className="cursor-pointer gap-2 rounded-lg px-3 py-2.5 text-sm text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <XCircle className="size-4" />
              بستن گفتگو
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={closeDialogOpen} onOpenChange={setCloseDialogOpen}>
        <AlertDialogContent className="rounded-2xl sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right text-lg">
              بستن گفتگو
            </AlertDialogTitle>

            <AlertDialogDescription className="text-right leading-7">
              آیا از بستن این گفتگو مطمئن هستید؟ پس از بستن، امکان ارسال پیام
              جدید وجود نخواهد داشت.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-row-reverse gap-2">
            <AlertDialogAction
              onClick={handleClose}
              disabled={isClosing}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isClosing ? "در حال بستن..." : "بله، گفتگو بسته شود"}
            </AlertDialogAction>

            <AlertDialogCancel disabled={isClosing} className="mt-0">
              انصراف
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
