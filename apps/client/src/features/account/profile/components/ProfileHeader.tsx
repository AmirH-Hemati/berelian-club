"use client";

import type { ChangeEvent } from "react";
import {
  Card,
  CardContent,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
} from "@repo/ui";

import { Camera, Phone, UserRound } from "lucide-react";
import { useRef } from "react";
import { UserType } from "@repo/schema";
import { useUpdateAvatar } from "../hooks/useUpdateAvatar";

type Props = {
  user: UserType;
};

export default function ProfileHeader({ user }: Props) {
  const { updateAvatar, isUpdating } = useUpdateAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleUpdateImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    updateAvatar({ photo: file });

    e.target.value = "";
  }

  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  const imageUrl = user.photo
    ? `${process.env.NEXT_PUBLIC_API_URL}/images/users/${user.photo}`
    : undefined;

  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
        <div className="relative shrink-0">
          <Avatar className="size-[76px] border-2 border-background shadow-md">
            <AvatarImage src={imageUrl} alt={fullName} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {fullName ? (
                `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`
              ) : (
                <UserRound className="size-8" />
              )}
            </AvatarFallback>
          </Avatar>

          <button
            type="button"
            disabled={isUpdating}
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -left-1 flex size-8 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
            aria-label="تغییر تصویر پروفایل"
          >
            <Camera className="size-4" />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpdateImage}
            disabled={isUpdating}
          />
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-400 font-bold">{fullName || "کاربر برلیان"}</h1>

            <Badge
              variant={
                user.contractStatus === "active" ? "outline" : "destructive"
              }
            >
              {user.contractStatus === "active"
                ? "قرارداد فعال"
                : "قرارداد غیرفعال"}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-200 text-muted-foreground">
            <Phone className="size-4 shrink-0" />
            <span dir="ltr">{user.phoneNumber}</span>
          </div>

          <p className="text-100 text-muted-foreground">
            برای تغییر تصویر پروفایل، روی آیکون دوربین کلیک کنید.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
