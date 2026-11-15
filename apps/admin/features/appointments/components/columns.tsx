"use client";

import type { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  StatusBadge,
  Button,
  Avatar,
  AvatarFallback,
  Badge,
  AvatarImage,
} from "@repo/ui";

import {
  CalendarDays,
  Clock3,
  MoreHorizontalIcon,
  Trash2,
  UserRound,
  Eye,
  PhoneCall,
  Video,
  UserCheck,
} from "lucide-react";

import Link from "next/link";
import { formatDate } from "@/utils/helper";
import { AppointmentType } from "@repo/schema";
import { useDeleteAppointment } from "../hooks/useDeleteAppointment";

const appointmentTypesMap = {
  phone: {
    label: "تلفنی",
    icon: PhoneCall,
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  online: {
    label: "آنلاین",
    icon: Video,
    className: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
};

function AppointmentActions({ appointment }: { appointment: AppointmentType }) {
  const { deleteAppointment, isDeleting } = useDeleteAppointment();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-9 rounded-lg">
          <MoreHorizontalIcon className="size-4" />
          <span className="sr-only">باز کردن منو</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          عملیات مشاوره
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href={`/users/${appointment.user?._id}`}
            className="flex cursor-pointer items-center gap-2"
          >
            <UserRound className="size-4" />
            مشاهده اطلاعات سرمایه گذاران
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href={`/appointments/${appointment._id}`}
            className="flex cursor-pointer items-center gap-2"
          >
            <Eye className="size-4" />
            مشاهده جزئیات مشاوره
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          disabled={isDeleting}
          onClick={() => deleteAppointment(appointment._id)}
          className="flex cursor-pointer items-center gap-2"
        >
          <Trash2 className="size-4" />
          حذف مشاوره
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<AppointmentType>[] = [
  {
    accessorKey: "user",
    header: "اطلاعات سرمایه گذاران",
    cell: ({ row }) => {
      const appointment = row.original;
      const user = appointment.user;

      const fullName =
        [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
        "کاربر ناشناس";

      const initials =
        `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}` || "?";

      const imageUrl = user.photo
        ? `${process.env.NEXT_PUBLIC_API_URL}/images/users/${user.photo}`
        : undefined;

      return (
        <div className="flex min-w-48 items-center gap-3">
          <Avatar className="size-10 rounded-xl border border-border">
            <AvatarImage src={imageUrl} />

            <AvatarFallback className="rounded-xl bg-primary/10 text-100 font-bold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex min-w-0 flex-col gap-1">
            <span className="truncate text-200 font-semibold text-foreground">
              {fullName}
            </span>

            <span className="text-100 text-muted-foreground" dir="ltr">
              {user?.phoneNumber || "شماره ثبت نشده"}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "type",
    header: "نوع مشاوره",
    cell: ({ row }) => {
      const type = row.original.type;

      const config =
        appointmentTypesMap[type as keyof typeof appointmentTypesMap];

      if (!config) {
        return <Badge variant="secondary">نامشخص</Badge>;
      }

      const Icon = config.icon;

      return (
        <Badge className={`gap-1.5 border-0 ${config.className}`}>
          <Icon className="size-3.5" />
          {config.label}
        </Badge>
      );
    },
  },

  {
    accessorKey: "appointmentDate",
    header: "زمان مشاوره",
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex min-w-36 flex-col gap-1.5">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <CalendarDays className="size-3.5 text-muted-foreground" />
            {formatDate(appointment.appointmentDate)}
          </span>

          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock3 className="size-3.5" />
            {appointment.startAt} تا {appointment.endAt}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "consultant",
    header: "مشاور",
    cell: ({ row }) => {
      const consultant = row.original.consultant;

      const fullName = [consultant?.firstName, consultant?.lastName]
        .filter(Boolean)
        .join(" ");

      return (
        <div className="flex min-w-36 items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            {consultant ? (
              <UserCheck className="size-4" />
            ) : (
              <UserRound className="size-4" />
            )}
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-foreground">
              {fullName || "تخصیص داده نشده"}
            </span>

            <span className="text-xs text-muted-foreground">
              {consultant ? "مشاور جلسه" : "در انتظار تخصیص"}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },

  {
    id: "actions",
    header: () => <div className="text-center">عملیات</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <AppointmentActions appointment={row.original} />
      </div>
    ),
  },
];
