import React from "react";
import AddNewUserDialog from "./AddNewUserDialog";

export default function UsersHeader() {
  return (
    <div className="flex items-center justify-between  ">
      <h1 className="font-semibold">لیست کاربران</h1>
      <AddNewUserDialog />
    </div>
  );
}
