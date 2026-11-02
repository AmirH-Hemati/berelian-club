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
  FileText,
  MessageCircle,
  MoreHorizontal,
  UserRound,
  CalendarDays,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

import { formatDate } from "@/utils/helper";
import { RequestType } from "@repo/schema";
import Typebadge from "./Typebadge";
import { DeleteRequestDialog } from "./DeleteRequestDialog";

function UserInfo({
  firstName,
  lastName,
  phoneNumber,
}: {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}) {
  const fullName =
    [firstName, lastName].filter(Boolean).join(" ") || "کاربر ناشناس";

  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}` || "?";

  return (
    <div className="flex min-w-44 items-center gap-3">
      <Avatar className="size-10 rounded-xl border border-border">
        <AvatarFallback className="rounded-xl bg-primary/10 text-xs font-bold text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">
          {fullName}
        </p>
        <p className="mt-1 text-xs text-muted-foreground" dir="ltr">
          {phoneNumber || "شماره ثبت نشده"}
        </p>
      </div>
    </div>
  );
}

function ReceptionInfo({
  firstName,
  lastName,
}: {
  firstName?: string;
  lastName?: string;
}) {
  const fullName =
    [firstName, lastName].filter(Boolean).join(" ") || "در انتظار تخصیص";

  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}` || "?";

  return (
    <div className="flex min-w-40 items-center gap-3">
      <Avatar className="size-9 rounded-xl border border-border">
        <AvatarFallback className="rounded-xl bg-muted text-xs font-bold text-muted-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">
          {fullName}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">مسئول پیگیری</p>
      </div>
    </div>
  );
}

function RequestActions({ request }: { request: RequestType }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-lg"
          aria-label="عملیات درخواست"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>عملیات درخواست</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {request.status === "approved" && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href={`/chat/${request._id}`}
                className="flex cursor-pointer items-center gap-2"
              >
                <MessageCircle className="size-4" />
                گفتگو با پذیرش
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem asChild>
          <Link
            href={`/users/${request.user?._id}`}
            className="flex cursor-pointer items-center gap-2"
          >
            <UserRound className="size-4" />
            مشاهده اطلاعات کاربر
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href={`/requests/${request._id}`}
            className="flex cursor-pointer items-center gap-2"
          >
            <FileText className="size-4" />
            مشاهده جزئیات درخواست
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" asChild>
          <DeleteRequestDialog requestId={request._id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<RequestType>[] = [
  {
    accessorKey: "user",
    header: "اطلاعات کاربر",
    cell: ({ row }) => {
      const user = row.original.user;

      return (
        <UserInfo
          firstName={user?.firstName}
          lastName={user?.lastName}
          phoneNumber={user?.phoneNumber}
        />
      );
    },
  },
  {
    accessorKey: "type",
    header: "نوع درخواست",
    cell: ({ row }) => <Typebadge type={row.original.type} />,
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ثبت",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-foreground">
        <CalendarDays className="size-4 text-muted-foreground" />
        {formatDate(row.original.createdAt)}
      </div>
    ),
  },
  {
    accessorKey: "assignedTo",
    header: "مسئول پیگیری",
    cell: ({ row }) => {
      const receptionist = row.original.assignedTo;

      return (
        <ReceptionInfo
          firstName={receptionist?.firstName}
          lastName={receptionist?.lastName}
        />
      );
    },
  },
  {
    accessorKey: "status",
    header: "وضعیت درخواست",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => <RequestActions request={row.original} />,
  },
];
