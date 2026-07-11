"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { UserType } from "@repo/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "photo",
    header: "",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: "نام کاربر",
    cell: ({ row }) => {
      const firstName = row.original.firstName as string;
      const lastName = row.original.lastName as string;
      return (
        <span>
          {firstName} {lastName}
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "ایمیل",
  },
  {
    accessorKey: "phoneNumber",
    header: "شماره موبایل",
  },
  {
    accessorKey: "role",
    header: "نقش کاربر",
    cell: ({ row }) => {
      const role = row.getValue("role");

      return (
        <div
          className={cn(
            `p-1 rounded-md w-max text-xs`,
            role === "user" && "bg-green-500/40",
            role === "admin" && "bg-red-500/40",
          )}
        >
          {role as string}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">باز شدن منو</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>فعالیت ها </DropdownMenuLabel>
            <DropdownMenuItem variant="destructive">حذف کاربر</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/users/${user._id}`}>مشاهده کاربر</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
