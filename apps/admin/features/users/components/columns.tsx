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
import { cn } from "@repo/ui";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2, UserRound } from "lucide-react";
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
          <AvatarImage
            src={`http://localhost:5000/images/users/${user?.photo}`}
          />
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
          <DropdownMenuContent align="end" className="w-50">
            <DropdownMenuLabel>فعالیت‌ها</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href={`/users/${user._id}`}
                className="flex items-center gap-2 font-semibold"
              >
                <UserRound className="size-4" />
                مشاهده کاربر
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" className="gap-2">
              <Trash2 className="size-4" />
              حذف کاربر
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
