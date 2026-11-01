"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Badge,
  DownloadButton,
  TableSkeleton,
} from "@repo/ui";

import {
  CircleAlert,
  FileIcon,
  FileTextIcon,
  ImageIcon,
  MoreHorizontalIcon,
  VideoIcon,
  Download,
  FolderOpen,
} from "lucide-react";

import { useMyFiles } from "../hooks/useMyFiles";
import { convertDate, formatFileSize } from "@/utils/helper";
import { PaginationControls } from "@/components/PaginationControls";
import { UserFileType } from "@repo/schema";

const getFileTypeBadge = (fileType?: string, mimeType?: string) => {
  if (fileType === "image" || mimeType?.startsWith("image/")) {
    return (
      <Badge className="border-0 bg-blue-100 text-blue-700 hover:bg-blue-100">
        تصویر
      </Badge>
    );
  }

  if (fileType === "video" || mimeType?.startsWith("video/")) {
    return (
      <Badge className="border-0 bg-purple-100 text-purple-700 hover:bg-purple-100">
        ویدئو
      </Badge>
    );
  }

  if (fileType === "document" || mimeType?.includes("pdf")) {
    return (
      <Badge className="border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
        سند و فایل
      </Badge>
    );
  }

  return <Badge variant="secondary">سایر فایل‌ها</Badge>;
};

const getFileIcon = (fileType?: string) => {
  switch (fileType) {
    case "image":
      return <ImageIcon className="size-5 text-blue-500" />;

    case "video":
      return <VideoIcon className="size-5 text-purple-500" />;

    case "document":
      return <FileTextIcon className="size-5 text-emerald-600" />;

    default:
      return <FileIcon className="size-5 text-muted-foreground" />;
  }
};

export default function LearningTable() {
  const { files, pagination, isLoading, isError, refetch } = useMyFiles();

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="flex flex-col">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="h-12 px-4 text-right font-semibold">
                فایل آموزشی
              </TableHead>

              <TableHead className="h-12 px-4 text-right font-semibold">
                تاریخ ارسال
              </TableHead>

              <TableHead className="h-12 px-4 text-right font-semibold">
                نوع فایل
              </TableHead>

              <TableHead className="h-12 px-4 text-right font-semibold">
                ارسال‌کننده
              </TableHead>

              <TableHead className="whitespace-nowrap text-center">
                عملیات
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell colSpan={5} className="h-44">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <CircleAlert className="size-9 text-destructive" />

                    <div className="text-center">
                      <p className="text-sm font-semibold text-foreground">
                        خطا در دریافت فایل‌ها
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        متأسفانه اطلاعات در حال حاضر قابل دریافت نیست. لطفاً
                        دوباره تلاش کنید.
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refetch()}
                    >
                      تلاش مجدد
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : files?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-44">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <FolderOpen className="size-6" />
                    </div>

                    <p className="text-sm font-semibold text-foreground">
                      هنوز فایلی برای شما ارسال نشده است
                    </p>

                    <p className="text-xs text-muted-foreground">
                      فایل‌های آموزشی ارسال‌شده در این قسمت نمایش داده می‌شوند.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              files?.map((file: UserFileType) => (
                <TableRow
                  key={file._id}
                  className="transition-colors hover:bg-muted/30"
                >
                  {/* File information */}
                  <TableCell className="px-4 py-4">
                    <div className="flex min-w-52 items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/40">
                        {getFileIcon(file.file?.fileType)}
                      </div>

                      <div className="flex min-w-0 flex-col">
                        <span
                          className="max-w-56 truncate text-sm font-semibold text-foreground"
                          title={file.file?.originalName}
                        >
                          {file.file?.originalName || "فایل بدون نام"}
                        </span>

                        <span className="mt-1 text-xs text-muted-foreground">
                          {formatFileSize(file.file?.size)}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Upload date */}
                  <TableCell className="px-4 py-4">
                    {" "}
                    {convertDate(file.createdAt)}
                  </TableCell>

                  {/* File type */}
                  <TableCell className="px-4 py-4">
                    {" "}
                    {getFileTypeBadge(file.file?.fileType, file.file?.mimeType)}
                  </TableCell>

                  {/* Sender */}
                  <TableCell className="px-4 py-4">
                    <div className="flex min-w-36 flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {[file.sentBy?.firstName, file.sentBy?.lastName]
                          .filter(Boolean)
                          .join(" ") || "نامشخص"}
                      </span>

                      <span className="mt-1 text-xs text-muted-foreground">
                        ارسال‌کننده فایل
                      </span>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-4 py-4">
                    {" "}
                    <div className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-9 rounded-lg"
                          >
                            <MoreHorizontalIcon className="size-4" />
                            <span className="sr-only">باز کردن منو</span>
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem asChild>
                            <DownloadButton
                              fileId={file.file?._id}
                              originalName={file.file?.originalName}
                              source="userFiles"
                            >
                              <span className="flex items-center gap-2">
                                دانلود فایل
                              </span>
                            </DownloadButton>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            disabled
                            className="text-destructive"
                          >
                            حذف فایل
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!isError && (pagination?.totalPages ?? 0) > 1 && (
        <div className="border-t border-border px-4 py-3">
          <PaginationControls
            page={pagination?.page || 1}
            totalPages={pagination?.totalPages || 1}
          />
        </div>
      )}
    </div>
  );
}
