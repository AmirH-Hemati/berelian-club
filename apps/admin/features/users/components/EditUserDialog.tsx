"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateUserForm } from "./CreateUserForm";
import { UserType } from "@repo/schema";

type Props = { user: UserType };
export default function EditUserDialog({ user }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full md:w-fit">
          ویرایش اطلاعات کاربر
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl! p-6! w-full max-h-[80vh] overflow-y-auto">
        <CreateUserForm user={user} />
      </DialogContent>
    </Dialog>
  );
}
