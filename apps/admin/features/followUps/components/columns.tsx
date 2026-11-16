"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  StatusBadge,
} from "@repo/ui";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import Link from "next/link";
import { formatDate } from "@/utils/helper";
import { FollowUpType } from "@repo/schema";
import { useDeleteFollowUp } from "../hooks/useDeleteFollowUp";
import { useCompleteFollowUp } from "../hooks/useCompleteFollowUp";

function ConsultantInfo({
  firstName,
  lastName,
}: {
  firstName?: string;
  lastName?: string;
}) {
  const fullName =
    [firstName, lastName].filter(Boolean).join(" ") || "مشاور نامشخص";

  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}` || "?";

  return (
    <div className="flex min-w-40 items-center gap-3">
      <Avatar className="size-10 shrink-0 rounded-xl border border-border">
        <AvatarFallback className="rounded-xl bg-primary/10 text-xs font-bold text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">
          {fullName}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">مشاور جلسه</p>
      </div>
    </div>
  );
}

const RESULT_CONFIG: Record<string, { label: string; className: string }> = {
  completed: {
    label: "جلسه انجام شده",
    className:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  pending: {
    label: "در انتظار نتیجه",
    className:
      "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  cancelled: {
    label: "لغو شده",
    className: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
  },
  failed: {
    label: "ناموفق",
    className:
      "border-gray-500/20 bg-gray-500/10 text-gray-600 dark:text-gray-400",
  },
};

function FollowUpNote({ note }: { note?: string }) {
  return (
    <div className="max-w-56">
      <p
        className="line-clamp-2 text-200 leading-6 text-foreground"
        title={note}
      >
        {note || "توضیحی ثبت نشده است"}
      </p>
    </div>
  );
}

function getTehranDateKey(date: Date | string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

function DueDateInfo({
  dueDate,
  status,
}: {
  dueDate: Date | string;
  status: string;
}) {
  const todayKey = getTehranDateKey(new Date());
  const dueDateKey = getTehranDateKey(dueDate);

  const isCompleted = status === "completed";
  const isOverdue = !isCompleted && dueDateKey < todayKey;
  const isToday = !isCompleted && dueDateKey === todayKey;

  return (
    <div className="flex min-w-36 flex-col items-start gap-2">
      <div className="flex items-center gap-2 whitespace-nowrap">
        <CalendarDays className="size-4 text-muted-foreground" />
        <span className="text-200 font-medium text-foreground">
          {formatDate(dueDate)}
        </span>
      </div>

      {isOverdue && (
        <Badge variant="destructive" className="gap-1 text-100">
          <Clock3 className="size-3" />
          دارای دیرکرد
        </Badge>
      )}

      {isToday && (
        <Badge className="gap-1 border-blue-500/20 bg-blue-500/10 text-100 text-blue-600 dark:text-blue-400">
          <Clock3 className="size-3" />
          موعد امروز
        </Badge>
      )}
    </div>
  );
}

function FollowUpActions({ followUp }: { followUp: FollowUpType }) {
  const { completeFollowUps, isCompleting } = useCompleteFollowUp();
  const { deleteFollowUp, isDeleting } = useDeleteFollowUp();

  const isCompleted = followUp.status === "completed";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-lg"
          aria-label="عملیات پیگیری"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>عملیات پیگیری</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href={`/followUps/${followUp._id}`}
            className="flex cursor-pointer items-center gap-2"
          >
            <Eye className="size-4" />
            مشاهده جزئیات پیگیری
          </Link>
        </DropdownMenuItem>

        {followUp.sessionReport?._id && (
          <DropdownMenuItem asChild>
            <Link
              href={`/appointments/${followUp.sessionReport.appointment}`}
              className="flex cursor-pointer items-center gap-2"
            >
              <FileText className="size-4" />
              مشاهده گزارش جلسه
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {!isCompleted && (
          <DropdownMenuItem
            disabled={isCompleting}
            onSelect={() => completeFollowUps(followUp._id)}
            className="flex cursor-pointer items-center gap-2"
          >
            <CheckCircle2 className="size-4 text-emerald-600" />
            تکمیل پیگیری
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          variant="destructive"
          disabled={isDeleting}
          onSelect={() => deleteFollowUp(followUp._id)}
          className="flex cursor-pointer items-center gap-2"
        >
          <Trash2 className="size-4" />
          حذف پیگیری
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<FollowUpType>[] = [
  {
    id: "consultant",
    header: "مشاور مسئول",
    cell: ({ row }) => {
      const consultant = row.original.sessionReport?.consultant;

      return (
        <ConsultantInfo
          firstName={consultant?.firstName}
          lastName={consultant?.lastName}
        />
      );
    },
  },

  {
    accessorKey: "note",
    header: "موضوع پیگیری",
    cell: ({ row }) => <FollowUpNote note={row.original.note} />,
  },
  {
    accessorKey: "dueDate",
    header: "موعد پیگیری",
    cell: ({ row }) => (
      <DueDateInfo
        dueDate={row.original.dueDate}
        status={row.original.status}
      />
    ),
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ثبت",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-200 text-muted-foreground">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => <FollowUpActions followUp={row.original} />,
  },
];
