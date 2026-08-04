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
import { FileText, Loader2, Users } from "lucide-react";
import { useState } from "react";
import { useSendFileToAll } from "../hooks/useSendFileToAll";
import { FileSelector } from "./FileSelector";

export function SendFileToAllModal() {
  const [open, setOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState("");
  const { sendFileToAll, isSending } = useSendFileToAll();

  const handleSend = () => {
    if (!selectedFileId) return;

    sendFileToAll(
      { fileId: selectedFileId },
      {
        onSuccess: () => {
          setOpen(false);
          setSelectedFileId("");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Users className="size-4" />
          ارسال فایل به همه
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ارسال فایل به همه سرمایه‌گذاران</DialogTitle>
          <DialogDescription>
            فایل مورد نظر را انتخاب کنید تا برای همه سرمایه‌گذاران ارسال شود.
          </DialogDescription>
        </DialogHeader>

        <FileSelector
          selectedFileId={selectedFileId}
          onSelect={setSelectedFileId}
        />

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            انصراف
          </Button>
          <Button onClick={handleSend} disabled={!selectedFileId || isSending}>
            {isSending ? (
              <>
                <Loader2 className="size-4 ml-2 animate-spin" />
                در حال ارسال...
              </>
            ) : (
              <>
                <FileText className="size-4 ml-2" />
                ارسال به همه
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
