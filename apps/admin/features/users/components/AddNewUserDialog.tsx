"use client";
import { Button } from "@repo/ui";
import { Dialog, DialogContent, DialogTrigger } from "@repo/ui";
import { CreateUserForm } from "./CreateUserForm";
import { useState } from "react";

export default function AddNewUserDialog() {
  const [open, setOpen] = useState(false);
  function handleCloseDialog() {
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">اضافه کردن کاربر جدید</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl! p-6! w-full max-h-[80vh] overflow-y-auto">
        <CreateUserForm onCloseDialog={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
}
