"use client";

import Spinner from "@/components/PageSpinner";
import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/utils/helper";
import { FileType } from "@repo/schema";
import {
  FileIcon,
  FilesIcon,
  FileTextIcon,
  ImageIcon,
  Loader2,
  Paperclip,
  Search,
  Send,
  VideoIcon,
} from "lucide-react";
import { useState } from "react";
import { useFiles } from "../hooks/useFiles";
import { useSendFileToUser } from "../hooks/useSendFileToUser";
import { PaginationControls } from "./PaginationControls";
import { useSendFileToChat } from "@/features/chats/hooks/useSendFileToChat";

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
  const [searchTerm, setSearchTerm] = useState("");
  const { files, pagination, isLoading } = useFiles();
  const { sendFile, isSending } = useSendFileToUser();
  const { sendFile: sendFileToChat, isSending: isSending2 } =
    useSendFileToChat();

  const isWorking = isSending || isSending2;

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "image":
        return <ImageIcon className="size-5 text-blue-500" />;
      case "video":
        return <VideoIcon className="size-5 text-purple-500" />;
      case "document":
        return <FileTextIcon className="size-5 text-green-500" />;
      default:
        return <FileIcon className="size-5 text-gray-500" />;
    }
  };

  const getFileTypeLabel = (fileType: string) => {
    switch (fileType) {
      case "image":
        return "تصویر";
      case "video":
        return "ویدئو";
      case "document":
        return "مستند";
      default:
        return "سایر";
    }
  };

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
          onSettled: () => {
            setOpen(false);
            setSelectedFileId("");
          },
        },
      );
    }
  }
  if (isLoading) return <Spinner />;

  const selectedFile = files?.find((f: FileType) => f._id === selectedFileId);

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

        <div className="space-y-3 ">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="جستجوی فایل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-9"
            />
          </div>

          <Tabs defaultValue="all">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                همه
              </TabsTrigger>
              <TabsTrigger value="image" className="flex-1">
                تصاویر
              </TabsTrigger>
              <TabsTrigger value="video" className="flex-1">
                ویدئوها
              </TabsTrigger>
              <TabsTrigger value="document" className="flex-1">
                مستندات
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ScrollArea className=" h-80 border rounded-lg p-2">
          {files?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <FileIcon className="size-12 mb-2 opacity-50" />
              <p>هیچ فایلی یافت نشد</p>
            </div>
          ) : (
            <RadioGroup
              value={selectedFileId}
              onValueChange={setSelectedFileId}
            >
              <div className="space-y-2">
                {files?.map((file: FileType) => (
                  <div
                    key={file._id}
                    className={cn(
                      selectedFileId === file._id &&
                        "border-primary bg-primary/5 ring-2 ring-primary/20",
                      "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-al hover:bg-muted/50",
                    )}
                    onClick={() => setSelectedFileId(file._id)}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <RadioGroupItem
                        value={file._id}
                        id={file._id}
                        className="shrink-0"
                      />
                      <div className="shrink-0">
                        {getFileIcon(file.fileType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium truncate">
                            {file.originalName}
                          </span>
                          <Badge variant="secondary" className="shrink-0">
                            {getFileTypeLabel(file.fileType)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>حجم: {formatFileSize(file.size)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}
        </ScrollArea>

        <PaginationControls
          page={pagination.page}
          totalPages={pagination.totalPages}
        />

        {selectedFile && (
          <div className="p-3 bg-primary/10 rounded-lg">
            <p className="text-sm font-medium text-primary">فایل انتخاب شده:</p>
            <p className="text-sm">{selectedFile.originalName}</p>
          </div>
        )}

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
