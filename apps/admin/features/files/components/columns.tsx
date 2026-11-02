"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { LucideIcon } from "lucide-react";

import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DownloadButton,
} from "@repo/ui";

import {
  File,
  FileText,
  Image,
  MoreHorizontal,
  Trash2,
  Video,
} from "lucide-react";

import { formatDate, formatFileSize } from "@/utils/helper";
import { FileType } from "@repo/schema";
import { useDeleteFile } from "../hooks/useDeleteFile";

type FileCategory = "image" | "video" | "document" | "default";

interface FileConfig {
  label: string;
  icon: LucideIcon;
  iconClassName: string;
  badgeClassName: string;
}

const FILE_TYPE_CONFIG: Record<FileCategory, FileConfig> = {
  image: {
    label: "تصویر",
    icon: Image,
    iconClassName: "text-blue-500",
    badgeClassName:
      "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  video: {
    label: "ویدئو",
    icon: Video,
    iconClassName: "text-purple-500",
    badgeClassName:
      "border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  document: {
    label: "سند",
    icon: FileText,
    iconClassName: "text-emerald-500",
    badgeClassName:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  default: {
    label: "سایر",
    icon: File,
    iconClassName: "text-muted-foreground",
    badgeClassName: "border-border bg-muted text-muted-foreground",
  },
};

function getFileConfig(fileType?: string, mimeType?: string): FileConfig {
  if (mimeType?.startsWith("image/") || fileType === "image") {
    return FILE_TYPE_CONFIG.image;
  }

  if (mimeType?.startsWith("video/") || fileType === "video") {
    return FILE_TYPE_CONFIG.video;
  }

  if (
    mimeType?.includes("pdf") ||
    mimeType?.includes("document") ||
    fileType === "document"
  ) {
    return FILE_TYPE_CONFIG.document;
  }

  return FILE_TYPE_CONFIG.default;
}

function FileInfo({ file }: { file: FileType }) {
  const config = getFileConfig(file.fileType, file.mimeType);
  const Icon = config.icon;

  return (
    <div className="flex min-w-52 items-center gap-3">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/40">
        <Icon className={`size-5 ${config.iconClassName}`} />
      </div>

      <div className="min-w-0">
        <p
          className="max-w-64 truncate text-sm font-semibold text-foreground"
          title={file.originalName}
        >
          {file.originalName}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {formatFileSize(file.size)}
        </p>
      </div>
    </div>
  );
}

function FileTypeBadge({
  fileType,
  mimeType,
}: {
  fileType?: string;
  mimeType?: string;
}) {
  const config = getFileConfig(fileType, mimeType);

  return (
    <Badge
      variant="outline"
      className={`whitespace-nowrap font-medium ${config.badgeClassName}`}
    >
      {config.label}
    </Badge>
  );
}

function FileActions({ file }: { file: FileType }) {
  const { deleteFile, isDeleting } = useDeleteFile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-lg"
          aria-label="عملیات فایل"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>عملیات فایل</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <DownloadButton fileId={file._id} originalName={file.originalName}>
            <FileText className="mr-2 size-4" />
            دانلود فایل
          </DownloadButton>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          disabled={isDeleting}
          onSelect={() => deleteFile(file._id)}
        >
          <Trash2 className="mr-2 size-4" />
          حذف فایل
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "originalName",
    header: "اطلاعات فایل",
    cell: ({ row }) => <FileInfo file={row.original} />,
  },
  {
    accessorKey: "fileType",
    header: "نوع فایل",
    cell: ({ row }) => (
      <FileTypeBadge
        fileType={row.original.fileType}
        mimeType={row.original.mimeType}
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ آپلود",
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium text-foreground">
        {formatDate(row.original.createdAt)}
      </div>
    ),
  },
  {
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => <FileActions file={row.original} />,
  },
];
