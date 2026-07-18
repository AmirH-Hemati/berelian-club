import React from "react";
import AddNewUserDialog from "./AddNewUserDialog";

export default function UsersHeader() {
  return (
    <div className="flex md:items-center gap-2 md:justify-between flex-col md:flex-row  ">
      <h1 className="font-semibold text-500">لیست کاربران</h1>
      <AddNewUserDialog />
    </div>
  );
}
