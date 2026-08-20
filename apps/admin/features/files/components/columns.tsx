"use client";
import { Badge } from "@repo/ui";
import { Button } from "@repo/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";
import { formatDate, formatFileSize } from "@/utils/helper";
import { FileType } from "@repo/schema";
import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  MoreHorizontalIcon,
  SendIcon,
  Trash2Icon,
  VideoIcon,
} from "lucide-react";
import DownloadButton from "@repo/ui/components/DownloadButton";
import { ColumnDef } from "@tanstack/react-table";
import { useDeleteFile } from "../hooks/useDeleteFile";

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

const getFileTypeBadge = (fileType: string, mimeType?: string) => {
  let label = "سایر";
  let className = "bg-gray-100 text-gray-700";

  if (fileType === "image" || mimeType?.startsWith("image/")) {
    label = "تصویر";
    className = "bg-blue-100 text-blue-700";
  } else if (fileType === "video" || mimeType?.startsWith("video/")) {
    label = "ویدئو";
    className = "bg-purple-100 text-purple-700";
  } else if (fileType === "document" || mimeType?.includes("pdf")) {
    label = "فایل";
    className = "bg-red-100 text-red-700";
  }
  return <Badge className={className}>{label}</Badge>;
};

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "file",
    header: "فایل",
    cell: ({ row }) => {
      const file = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="bg-muted/50 rounded-lg p-2">
            {getFileIcon(file.fileType)}
          </div>
          <div className="flex flex-col">
            <span
              className="text-sm font-medium max-w-50 truncate"
              title={file.originalName}
            >
              {file.originalName}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatFileSize(file.size)}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: "اندازه فایل",
    cell: ({ row }) => {
      const file = row.original;
      return (
        <span className="text-xs text-muted-foreground">
          {formatFileSize(file.size)}
        </span>
      );
    },
  },
  {
    accessorKey: "fileType",
    header: "نوع فایل",
    cell: ({ row }) => {
      const file = row.original;
      return getFileTypeBadge(file.fileType, file.mimeType);
    },
  },

  {
    accessorKey: "createdAt",
    header: "تاریخ آپلود",
    cell: ({ row }) => {
      const file = row.original;
      return (
        <div className="text-sm font-medium">{formatDate(file.createdAt)}</div>
      );
    },
  },
  {
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => {
      const { deleteFile, isDeleting } = useDeleteFile();
      const file = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="size-8 p-0">
              <MoreHorizontalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>فعالیت‌ها</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <SendIcon className="size-4 ml-2" />
              ارسال به کاربر
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <DownloadButton
                fileId={file._id}
                originalName={file.originalName}
              />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => deleteFile(file._id)}
              disabled={isDeleting}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2Icon className="size-4 ml-2" />
              حذف فایل
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
