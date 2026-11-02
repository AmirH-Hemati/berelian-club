"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { LucideIcon } from "lucide-react";

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
} from "@repo/ui";

import {
  MoreHorizontal,
  UserRound,
  Trash2,
  ShieldCheck,
  TrendingUp,
  Headset,
  BriefcaseBusiness,
} from "lucide-react";

import Link from "next/link";
import { UserType } from "@repo/schema";

type UserRole = "admin" | "investor" | "reception" | "consultant";

interface RoleConfig {
  label: string;
  icon: LucideIcon;
  className: string;
}

const ROLE_CONFIG: Record<UserRole, RoleConfig> = {
  admin: {
    label: "مدیر سیستم",
    icon: ShieldCheck,
    className: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
  },
  investor: {
    label: "سرمایه‌گذار",
    icon: TrendingUp,
    className:
      "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  reception: {
    label: "پذیرش",
    icon: Headset,
    className:
      "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  consultant: {
    label: "مشاور",
    icon: BriefcaseBusiness,
    className:
      "border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
};

function UserInfo({ user }: { user: UserType }) {
  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "کاربر ناشناس";

  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}` || "?";

  return (
    <div className="flex min-w-48 items-center gap-3">
      <Avatar className="size-10 shrink-0 rounded-xl border border-border">
        <AvatarFallback className="rounded-xl bg-primary/10 text-xs font-bold text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">
          {fullName}
        </p>
        <p className="mt-1 truncate text-xs text-muted-foreground">
          شناسه: {user._id.slice(-8)}
        </p>
      </div>
    </div>
  );
}

function UserRoleBadge({ role }: { role: string }) {
  const config = ROLE_CONFIG[role as UserRole];

  if (!config) {
    return <Badge variant="secondary">نامشخص</Badge>;
  }

  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={`gap-1.5 whitespace-nowrap font-medium ${config.className}`}
    >
      <Icon className="size-3.5" />
      {config.label}
    </Badge>
  );
}

function UserActions({ user }: { user: UserType }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-lg"
          aria-label="عملیات کاربر"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>عملیات کاربر</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href={`/users/${user._id}`}
            className="flex cursor-pointer items-center gap-2"
          >
            <UserRound className="size-4" />
            مشاهده جزئیات کاربر
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer gap-2"
          disabled
        >
          <Trash2 className="size-4" />
          حذف کاربر
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "firstName",
    header: "اطلاعات کاربر",
    cell: ({ row }) => <UserInfo user={row.original} />,
  },
  {
    accessorKey: "email",
    header: "ایمیل",
    cell: ({ row }) => (
      <span
        className="block max-w-52 text-right truncate text-sm text-muted-foreground"
        dir="ltr"
        title={row.original.email}
      >
        {row.original.email || "ثبت نشده"}
      </span>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "شماره موبایل",
    cell: ({ row }) => (
      <span
        className="whitespace-nowrap text-sm font-medium text-foreground"
        dir="ltr"
      >
        {row.original.phoneNumber || "ثبت نشده"}
      </span>
    ),
  },
  {
    accessorKey: "role",
    header: "نقش کاربر",
    cell: ({ row }) => <UserRoleBadge role={row.original.role} />,
  },
  {
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => <UserActions user={row.original} />,
  },
];
