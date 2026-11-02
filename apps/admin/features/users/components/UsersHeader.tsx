"use client";

import { Users } from "lucide-react";
import AddNewUserDialog from "./AddNewUserDialog";

export default function UsersHeader() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Users className="size-5" />
        </div>

        <div>
          <h1 className="text-base font-bold text-foreground">
            مدیریت کاربران
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            مشاهده، مدیریت و افزودن کاربران سامانه
          </p>
        </div>
      </div>

      <AddNewUserDialog />
    </div>
  );
}
