"use client";

import Spinner from "@/components/PageSpinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Loader2, Users } from "lucide-react";
import { useState } from "react";
import { useFiles } from "../hooks/useFiles";
import { useSendFileToAll } from "../hooks/useSendFileToAll";

export function SendFileToAllModal() {
  const [open, setOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState("");
  const { files, isLoading } = useFiles();
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

  if (isLoading) return <Spinner />;
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

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>انتخاب فایل</Label>
            <Select value={selectedFileId} onValueChange={setSelectedFileId}>
              <SelectTrigger>
                <SelectValue placeholder="یک فایل انتخاب کنید..." />
              </SelectTrigger>
              <SelectContent>
                {files?.map((file: any) => (
                  <SelectItem key={file._id} value={file._id}>
                    {file.originalName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-700">
            این فایل برای <strong>همه سرمایه‌گذاران</strong> ارسال خواهد شد.
          </div>
        </div>

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
