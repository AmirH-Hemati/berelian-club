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
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { formatDate, formatToman } from "@/utils/helper";
import StatusBadge from "./StatusBadge";
import Typebadge from "./Typebadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDeleteRequest } from "../hooks/useDeleteRequest";
import { RequestType } from "@repo/schema";

export const columns: ColumnDef<RequestType>[] = [
  {
    accessorKey: "userId.email",
    header: "اطلاعات کاربر",
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div className="flex items-start gap-1">
          <Avatar>
            <AvatarImage src="image" />
            <AvatarFallback>Cn</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start gap-0.5 font-semibold">
            <span>
              {request.user?.firstName + " " + request.user?.lastName ||
                "کاربر ناشناس"}
            </span>
            <span className="text-gray-400">{request.user?.phoneNumber}</span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: " تاریخ ثبت درخواست",
    cell: ({ row }) => {
      const request = row.original;

      return (
        <div className=" font-semibold">{formatDate(request.createdAt)}</div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "نوع درخواست",
    cell: ({ row }) => {
      const request = row.original;
      return <Typebadge type={request.type} />;
    },
  },
  {
    accessorKey: "status",
    header: "وضعیت درخواست",
    cell: ({ row }) => {
      const request = row.original;
      return <StatusBadge status={request.status} />;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;
      const { deleteRequest, isDeleting } = useDeleteRequest();

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
              <Link href={`/users/${request?.user?._id}`}>
                مشاهده جزئیات کاربر
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/requests/${request._id}`}>
                {" "}
                مشاهده جزئیات درخواست
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={isDeleting}
              variant="destructive"
              onClick={() => deleteRequest(request._id)}
            >
              حذف درخواست
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
