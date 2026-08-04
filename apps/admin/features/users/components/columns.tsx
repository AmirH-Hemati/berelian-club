"use client";

import { Button } from "@repo/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { UserType } from "@repo/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";
import { Badge } from "@repo/ui";

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "photo",
    header: "",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Avatar>
          <AvatarImage src={user?.photo || ""} />
          <AvatarFallback>
            {user?.firstName[0] + user?.lastName[0]}
          </AvatarFallback>
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
        <Badge variant="secondary">
          {role === "admin" ? "ادمین" : ("سرمایه گذار" as string)}
        </Badge>
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
