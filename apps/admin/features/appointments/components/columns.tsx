"use client";
import { cn } from "@repo/ui";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  StatusBadge
} from "@repo/ui";
import { Button } from "@repo/ui";
import {
  CalendarDays,
  MoreHorizontalIcon,
  Trash2,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { formatDate, formatToman } from "@/utils/helper";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";
import Typebadge from "@/features/requests/components/Typebadge";
import { useDeleteAppointment } from "../hooks/useDeleteAppointment";
import { AppointmentType } from "@repo/schema";

export const columns: ColumnDef<AppointmentType>[] = [
  {
    accessorKey: "userId.email",
    header: "اطلاعات مشتری",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="flex items-start gap-1">
          <Avatar>
            <AvatarImage
              src={`http://localhost:5000/images/users/${appointment.user?.photo}`}
            />
            <AvatarFallback>
              {appointment.user?.firstName[0] + appointment.user?.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start gap-0.5 font-semibold">
            <span>
              {appointment.user?.firstName + " " + appointment.user?.lastName ||
                "کاربر ناشناس"}
            </span>
            <span className="text-gray-400">
              {appointment.user?.phoneNumber}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "appointmentDate",
    header: " تاریخ مشاوره",
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className=" font-semibold">
          {formatDate(appointment.appointmentDate)}
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => {
      const appointment = row.original;
      return <StatusBadge status={appointment.status} />;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const { deleteAppointment, isDeleting } = useDeleteAppointment();
      const appointment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 ">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-50">
            <DropdownMenuLabel>فعالیت ها </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/users/${appointment?.user?._id}`}
                className="flex items-center gap-2 font-semibold"
              >
                <UserRound className="size-4" />
                مشاهده جزئیات کاربر
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href={`/appointments/${appointment._id}`}
                className="flex items-center gap-2 font-semibold"
              >
                <CalendarDays className="size-4" />
                مشاهده جزئیات مشاوره
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              disabled={isDeleting}
              onClick={() => deleteAppointment(appointment._id)}
            >
              <Trash2 className="size-4" />
              حذف مشاوره
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
