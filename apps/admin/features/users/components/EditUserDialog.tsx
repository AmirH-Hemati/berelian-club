"use client";
import { Button } from "@repo/ui";
import { Dialog, DialogContent, DialogTrigger } from "@repo/ui";
import { CreateUserForm } from "./CreateUserForm";
import { UserType } from "@repo/schema";
import { useState } from "react";

type Props = { user: UserType };
export default function EditUserDialog({ user }: Props) {
  const [open, setOpen] = useState(false);
  function handleCloseDialog() {
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full md:w-fit">
          ویرایش اطلاعات کاربر
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl! p-6! w-full max-h-[80vh] overflow-y-auto">
        <CreateUserForm user={user} onCloseDialog={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
}
