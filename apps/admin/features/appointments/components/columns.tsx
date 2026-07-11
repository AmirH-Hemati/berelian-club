"use client";
import { cn } from "@/lib/utils";
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
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { formatDate, formatToman } from "@/utils/helper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatusBadge from "@/features/requests/components/StatusBadge";
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
            <AvatarImage src="image" />
            <AvatarFallback>Cn</AvatarFallback>
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
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>فعالیت ها </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/users/${appointment?.user?._id}`}>
                مشاهده جزیات کاربر
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/appointments/${appointment._id}`}>
                مشاهده جزیات مشاوره
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              disabled={isDeleting}
              onClick={() => deleteAppointment(appointment._id)}
            >
              حذف مشاوره
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
