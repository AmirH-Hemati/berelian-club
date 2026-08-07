"use client";

import { useState } from "react";
import {
  Search,
  FileIcon,
  ImageIcon,
  VideoIcon,
  FileTextIcon,
} from "lucide-react";
import { Input } from "@repo/ui";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui";
import { ScrollArea } from "@repo/ui";
import { RadioGroup, RadioGroupItem } from "@repo/ui";
import { Badge } from "@repo/ui";
import { cn } from "@repo/ui";
import { formatFileSize } from "@/utils/helper";
import { FileType } from "@repo/schema";
import { useFiles } from "../hooks/useFiles";
import { PaginationControls } from "./PaginationControls";
import { Spinner } from "@repo/ui";

interface FileSelectorProps {
  selectedFileId: string;
  onSelect: (fileId: string) => void;
}

export function FileSelector({ selectedFileId, onSelect }: FileSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { files, pagination, isLoading } = useFiles();

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

  if (isLoading) return <Spinner />;

  const selectedFile = files?.find((f: FileType) => f._id === selectedFileId);

  return (
    <div className="space-y-3">
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

      <ScrollArea className="h-80 border rounded-lg p-2">
        {files?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <FileIcon className="size-12 mb-2 opacity-50" />
            <p>هیچ فایلی یافت نشد</p>
          </div>
        ) : (
          <RadioGroup value={selectedFileId} onValueChange={onSelect}>
            <div className="space-y-2">
              {files?.map((file: FileType) => (
                <div
                  key={file._id}
                  className={cn(
                    selectedFileId === file._id &&
                      "border-primary bg-primary/5 ring-2 ring-primary/20",
                    "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all hover:bg-muted/50",
                  )}
                  onClick={() => onSelect(file._id)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <RadioGroupItem
                      value={file._id}
                      id={file._id}
                      className="shrink-0"
                    />
                    <div className="shrink-0">{getFileIcon(file.fileType)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-300 font-medium truncate">
                          {file.originalName}
                        </span>
                        <Badge
                          variant="secondary"
                          className="shrink-0 text-100"
                        >
                          {getFileTypeLabel(file.fileType)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-100 text-muted-foreground">
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

      {selectedFileId && (
        <div className="p-3 bg-primary/10 rounded-lg">
          <p className="text-200 font-medium text-primary">فایل انتخاب شده:</p>
          <p className="text-200">{selectedFile?.originalName}</p>
        </div>
      )}
    </div>
  );
}
