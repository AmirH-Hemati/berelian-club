"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontalIcon, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/helper";
import StatusBadge from "@/features/requests/components/StatusBadge";
import { useDeleteFollowUp } from "../hooks/useDeleteFollowUp";
import { useCompleteFollowUp } from "../hooks/useCompleteFollowUp";
import { FollowUpType } from "@repo/schema";

export const columns: ColumnDef<FollowUpType>[] = [
  {
    accessorKey: "sessionReport",
    header: "گزارش جلسه",
    cell: ({ row }) => {
      const followUp = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium max-w-40  truncate">
              {followUp.sessionReport?.summary || "گزارش جلسه"}
            </span>
            <span className="text-xs text-muted-foreground max-w-40  truncate">
              {followUp.sessionReport?.result || "نتیجه مشخص نشده"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "note",
    header: "توضیحات",
    cell: ({ row }) => {
      const followUp = row.original;
      return (
        <span className="text-sm max-w-40  truncate block">
          {followUp.note || "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "تاریخ سررسید",
    cell: ({ row }) => {
      const followUp = row.original;
      const isOverdue =
        new Date(followUp.dueDate) < new Date() &&
        followUp.status !== "completed";
      const isToday =
        new Date(followUp.dueDate).toDateString() === new Date().toDateString();

      return (
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {formatDate(followUp.dueDate)}
          </span>
          {isOverdue && (
            <Badge variant="destructive" className="text-[10px] h-5">
              <Clock className="size-3" />
              دیرکرد
            </Badge>
          )}
          {isToday && !isOverdue && followUp.status !== "completed" && (
            <Badge className="bg-blue-100 text-blue-700 text-[10px] h-5">
              امروز
            </Badge>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => {
      const followUp = row.original;
      return <StatusBadge status={followUp.status} />;
    },
  },
  {
    accessorKey: "isCompleted",
    header: "تکمیل",
    cell: ({ row }) => {
      const followUp = row.original;
      return (
        <Badge variant={followUp.isCompleted ? "default" : "secondary"}>
          {followUp.isCompleted ? " تکمیل شد" : " در انتظار"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ثبت",
    cell: ({ row }) => {
      const followUp = row.original;
      return <div className="text-sm">{formatDate(followUp.createdAt)}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const followUp = row.original;
      const { completeFollowUps, isCompleting } = useCompleteFollowUp();
      const { deleteFollowUp, isDeleting } = useDeleteFollowUp();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>فعالیت‌ها</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={`/followups/${followUp._id}`}>مشاهده جزئیات</Link>
            </DropdownMenuItem>

            {followUp.status !== "completed" && (
              <DropdownMenuItem
                onClick={() => completeFollowUps(followUp._id)}
                disabled={isCompleting}
              >
                تکمیل پیگیری
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              onClick={() => deleteFollowUp(followUp._id)}
              disabled={isDeleting}
            >
              حذف پیگیری
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
