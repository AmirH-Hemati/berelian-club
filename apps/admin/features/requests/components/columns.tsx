"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";
import { Button } from "@repo/ui";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { formatDate, formatToman } from "@/utils/helper";
import StatusBadge from "./StatusBadge";
import Typebadge from "./Typebadge";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";
import { useDeleteRequest } from "../hooks/useDeleteRequest";
import { RequestType } from "@repo/schema";
import { DeleteRequestDialog } from "./DeleteRequestDialog";

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
            {request.status == "approved" && (
              <DropdownMenuItem asChild>
                <Link href={`/chat/${request._id}`}>گفتگو </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link href={`/users/${request?.user?._id}`}>
                مشاهده جزئیات کاربر
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/requests/${request._id}`}>
                مشاهده جزئیات درخواست
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" asChild>
              <DeleteRequestDialog requestId={request._id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
