"use client";
import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChangeEvent } from "react";
import { useUpdateMe } from "../hooks/useUpdateMe";
import { UserType } from "@repo/schema";

type Props = { user: UserType };
export default function ProfileHeader({ user }: Props) {
  const { updateMe, isUpdating } = useUpdateMe();

  function handleUpdateImage(e: ChangeEvent<HTMLInputElement>) {
    updateMe({ photo: e.target.files?.[0] });
  }
  return (
    <Card>
      <CardContent className="flex flex-col items-start gap-2 md:flex-row ">
        <Avatar className="w-14 h-14">
          <AvatarImage
            src={`http://localhost:5000/images/users/${user?.photo}`}
          />
          <AvatarFallback>
            {user.firstName[0] + user.lastName[0]}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-0.5">
          <h1 className="text-400 font-semibold">
            {user.firstName} {user.lastName}
          </h1>

          <p className="text-muted-foreground">مشتری طلایی</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>100 امتیاز</Badge>

            <Badge
              variant={
                user.contractStatus === "active" ? "outline" : "destructive"
              }
            >
              {user.contractStatus === "active" ? "فعال" : "غیر فعال"}
            </Badge>
          </div>
        </div>

        <label
          htmlFor="photo"
          className="border-border border rounded-md h-fit px-2 py-1 cursor-pointer hover:bg-muted"
        >
          <input
            type="file"
            disabled={isUpdating}
            id="photo"
            onChange={handleUpdateImage}
            name="photo"
            className="hidden"
          />
          ویرایش تصویر
        </label>
      </CardContent>
    </Card>
  );
}
