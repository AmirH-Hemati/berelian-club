"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  TableSkeleton,
  StatusBadge,
} from "@repo/ui";

import { PaginationControls } from "@/components/PaginationControls";

import { MoreHorizontalIcon, MessageCircle, Eye } from "lucide-react";
import Link from "next/link";

import { typesMap } from "../data/typesMap";
import { useRequests } from "../hooks/useRequests";

import Typebadge from "./Typebadge";
import ReceptionInfo from "./ReceptionInfo";
import { convertDate } from "@/utils/helper";
import { DeleteRequestDialog } from "./DeleteRequestDialog";
import { RequestType } from "@repo/schema";

export default function RequestsTable() {
  const { requests, pagination, isLoading, isError, error, refetch } =
    useRequests();

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="flex flex-col">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="h-12 px-4 text-right font-semibold">
                مسئول پیگیری
              </TableHead>

              <TableHead className="h-12 px-4 text-right font-semibold">
                نوع درخواست
              </TableHead>

              <TableHead className="h-12 px-4 text-right font-semibold">
                تاریخ ثبت
              </TableHead>

              <TableHead className="h-12 px-4 text-right font-semibold">
                زمان تکمیل
              </TableHead>

              <TableHead className="h-12 px-4 text-right font-semibold">
                وضعیت
              </TableHead>

              <TableHead className="whitespace-nowrap text-center">
                جزئیات / عملیات
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell colSpan={7} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      <MoreHorizontalIcon className="size-5" />
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {error?.message || "خطا در دریافت درخواست‌ها"}
                    </p>

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
            ) : requests?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <MessageCircle className="size-5" />
                    </div>

                    <p className="text-sm font-medium text-foreground">
                      هنوز درخواستی ثبت نکرده‌اید
                    </p>

                    <p className="text-xs text-muted-foreground">
                      درخواست‌های ثبت‌شده شما در این قسمت نمایش داده می‌شوند.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              requests?.map((request: RequestType) => (
                <TableRow
                  key={request._id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <TableCell className="px-4 py-4">
                    <ReceptionInfo
                      firstName={request.assignedTo?.firstName}
                      lastName={request.assignedTo?.lastName}
                      photo={request.assignedTo?.photo}
                    />
                  </TableCell>

                  <TableCell className="px-4 py-4">
                    <Typebadge type={request.type} types={typesMap} />
                  </TableCell>

                  <TableCell className="px-4 py-4">
                    {convertDate(request.createdAt)}
                  </TableCell>

                  <TableCell className="px-4 py-4">
                    {request.completedAt
                      ? convertDate(request.completedAt)
                      : "تکمیل نشده است"}
                  </TableCell>

                  <TableCell className="px-4 py-4">
                    <StatusBadge status={request.status} />
                  </TableCell>

                  <TableCell className="px-4 py-4">
                    <div className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-9 rounded-lg"
                          >
                            <MoreHorizontalIcon className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-48">
                          {request.status === "approved" && (
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/account/chat/${request._id}`}
                                className="flex cursor-pointer items-center gap-2"
                              >
                                <MessageCircle className="size-4" />
                                گفتگو با پذیرش
                              </Link>
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuItem asChild>
                            <Link
                              href={`requests/${request._id}`}
                              className="flex cursor-pointer items-center gap-2"
                            >
                              <Eye className="size-4" />
                              مشاهده جزئیات
                            </Link>
                          </DropdownMenuItem>

                          {request.status === "pending" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <DeleteRequestDialog
                                  fullWidth
                                  requestId={request._id}
                                />
                              </DropdownMenuItem>
                            </>
                          )}
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
            page={pagination?.page}
            totalPages={pagination?.totalPages}
          />
        </div>
      )}
    </div>
  );
}
