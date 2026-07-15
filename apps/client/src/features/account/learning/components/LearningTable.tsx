"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleAlert,
  FileIcon,
  FileTextIcon,
  ImageIcon,
  MoreHorizontalIcon,
  VideoIcon,
} from "lucide-react";
import { useMyFiles } from "../hooks/useMyFiles";
import { convertDate, formatFileSize } from "@/utils/helper";
import { Badge } from "@/components/ui/badge";
import DownloadButton from "./DownloadButton";
import { PaginationControls } from "@/components/PaginationControls";
import { TableSkeleton } from "@/components/TableSkeleton";
import { UserFileType } from "@repo/schema";

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
export default function LearningTable() {
  const { files, pagination, isLoading, isError, refetch } = useMyFiles();
  if (isLoading) return <TableSkeleton />;

  return (
    <div className="border border-border py-1 rounded-lg! flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>فایل</TableHead>
            <TableHead>تاریخ ارسال فایل</TableHead>
            <TableHead>نوع فایل</TableHead>
            <TableHead>ارسال کننده</TableHead>
            <TableHead className="text-center ">جزئیات / عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isError && (
            <TableRow>
              <TableCell colSpan={5} className="py-10">
                <div className="flex flex-col items-center justify-center gap-3 ">
                  <CircleAlert className="size-8 text-destructive" />

                  <div className="flex flex-col items-center">
                    <p className="font-medium text-300">
                      خطا در دریافت اطلاعات
                    </p>
                    <p className="mt-1 text-200 text-muted-foreground">
                      متأسفانه اطلاعات در حال حاضر قابل دریافت نیست. لطفاً
                      دوباره تلاش کنید.
                    </p>
                  </div>

                  <Button variant="outline" size="sm" onClick={() => refetch()}>
                    تلاش مجدد
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
          {!isError && files.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                <p className="text-300"> محتوای آموزشی ای یافت نشد</p>{" "}
              </TableCell>
            </TableRow>
          ) : (
            files.map((file: UserFileType) => (
              <TableRow key={file._id}>
                <TableCell className="font-medium flex items-center gap-3">
                  <div className="bg-muted/50 rounded-lg p-2">
                    {getFileIcon(file.file.fileType)}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="text-200 font-medium max-w-50 truncate"
                      title={file.file.originalName}
                    >
                      {file.file.originalName}
                    </span>
                    <span className="text-100 text-muted-foreground">
                      {formatFileSize(file.file.size)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{convertDate(file.createdAt)}</TableCell>
                <TableCell>
                  {getFileTypeBadge(file.file.fileType, file.file.mimeType)}
                </TableCell>

                <TableCell>
                  {file?.sentBy?.firstName + " " + file?.sentBy?.lastName}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className=" w-full mr-auto">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon />
                        <span className="sr-only">باز کردن منو</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <DownloadButton
                          fileId={file.file._id}
                          originalName={file.file.originalName}
                        />
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem variant="destructive">
                        حذف فایل
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <PaginationControls
        page={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
      />
    </div>
  );
}
