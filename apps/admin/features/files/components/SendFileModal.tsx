"use client";

import { Button } from "@repo/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui";
import { useSendFileToChat } from "@/features/chats/hooks/useSendFileToChat";
import { FilesIcon, Loader2, Paperclip, Send } from "lucide-react";
import { useState } from "react";
import { useSendFileToUser } from "../hooks/useSendFileToUser";
import { FileSelector } from "./FileSelector";

type Props = {
  userId: string;
  userName: string;
  iconChat?: boolean;
  conversationId?: string;
};
export function SendFileModal({
  userId,
  userName,
  iconChat = false,
  conversationId = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string>("");

  const { sendFile, isSending } = useSendFileToUser();
  const { sendFile: sendFileToChat, isSending: isSending2 } =
    useSendFileToChat();

  const isWorking = isSending || isSending2;

  function handleSendFile() {
    if (iconChat) {
      sendFileToChat(
        {
          conversationId,
          receiverId: userId,
          fileId: selectedFileId,
        },
        {
          onSuccess: () => {
            setOpen(false);
            setSelectedFileId("");
          },
        },
      );
    } else {
      sendFile(
        { userId, fileId: selectedFileId },
        {
          onSuccess: () => {
            setOpen(false);
            setSelectedFileId("");
          },
        },
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {iconChat ? (
          <Button variant="ghost" size="icon" className="shrink-0 size-9 mb-1">
            <Paperclip className="size-4" />
          </Button>
        ) : (
          <Button size="sm" variant="secondary" className="w-full sm:w-fit">
            <FilesIcon />
            ارسال فایل
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        style={{ scrollbarWidth: "thin" }}
        className="max-w-3xl max-h-[90vh] flex flex-col overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>ارسال فایل به کاربر</DialogTitle>
          <DialogDescription>
            فایل مورد نظر را انتخاب کنید و برای
            <span className="font-semibold">{userName}</span> ارسال نمایید.
          </DialogDescription>
        </DialogHeader>

        <FileSelector
          selectedFileId={selectedFileId}
          onSelect={setSelectedFileId}
        />

        <DialogFooter>
          <Button variant="outline">انصراف</Button>
          <Button
            onClick={handleSendFile}
            disabled={!selectedFileId || isWorking}
          >
            {isWorking ? (
              <Loader2 className="size-4 ml-2 animate-spin" />
            ) : (
              <Send className="size-4 ml-2" />
            )}
            ارسال فایل
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
