"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateUserForm } from "./CreateUserForm";

export default function AddNewUserDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">اضافه کردن کاربر جدید</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl! p-6! w-full max-h-[80vh] overflow-y-auto">
        <CreateUserForm />
      </DialogContent>
    </Dialog>
  );
}
