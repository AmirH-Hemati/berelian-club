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

import { PaginationControls } from "@/components/PaginationControls";
import { TableSkeleton } from "@/components/TableSkeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { convertDate } from "@/utils/helper";
import { RequestType } from "@repo/schema";
import { CircleAlert, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { typesMap } from "../data/typesMap";
import { useDeleteRequest } from "../hooks/useDeleteRequest";
import { useRequests } from "../hooks/useRequests";
import StatusBadge from "./StatusBadge";
import Typebadge from "./Typebadge";

export default function RequestsTable() {
  const { requests, pagination, isLoading, isError, refetch } = useRequests();
  const { deleteRequest, isDeleting } = useDeleteRequest();
  if (isLoading) return <TableSkeleton />;
  return (
    <div className="border border-border py-1 rounded-lg! flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>نوع درخواست</TableHead>
            <TableHead>تاریخ ثبت</TableHead>
            <TableHead>وضعیت</TableHead>
            <TableHead className="text-center ">جزئیات / عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isError && (
            <TableRow>
              <TableCell colSpan={4} className="py-10">
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
          {!isError && requests.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-8  text-muted-foreground"
              >
                <p className="text-300"> درخواستی ای یافت نشد</p>
              </TableCell>
            </TableRow>
          ) : (
            requests?.map((request: RequestType) => (
              <TableRow key={request._id}>
                <TableCell className="font-medium">
                  <Typebadge type={request.type} types={typesMap} />
                </TableCell>
                <TableCell>{convertDate(request.createdAt)}</TableCell>
                <TableCell>
                  <StatusBadge status={request.status} />
                </TableCell>

                <TableCell className="flex">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="mx-auto" asChild>
                      <Button variant="ghost" size="icon" className="  ">
                        <MoreHorizontalIcon />
                        <span className="sr-only">باز کردن منو</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {request.status == "approved" && (
                        <DropdownMenuItem asChild>
                          <Link href={`/chat/${request._id}`}>گفتگو </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem asChild>
                        <Link href={`requests/${request._id}`}>
                          مشاهده جزئیات
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        disabled={isDeleting}
                        variant="destructive"
                        onClick={() => deleteRequest(request._id)}
                      >
                        حذف درخواست
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
        page={pagination?.page}
        totalPages={pagination?.totalPages}
      />
    </div>
  );
}
