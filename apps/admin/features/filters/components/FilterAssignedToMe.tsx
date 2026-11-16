"use client";

import { useUser } from "@repo/auth";
import { Switch, Label } from "@repo/ui";

type Props = {
  label: string;
  selectedValue: string;
  onChange: (value: string) => void;
};

export default function FilterAssignedToMe({
  label,
  selectedValue,
  onChange,
}: Props) {
  const { user, isLoading } = useUser();

  const isChecked = !!user?._id && selectedValue === user._id;

  function handleChangeValue(checked: boolean) {
    if (checked) {
      if (!user?._id) return;
      onChange(user._id);
    } else {
      if (selectedValue === user?._id) {
        onChange("");
      }
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 ">
      <Label htmlFor={label} className="cursor-pointer text-sm font-medium">
        {label}
      </Label>

      <Switch
        id={label}
        checked={isChecked}
        disabled={isLoading || !user?._id}
        onCheckedChange={handleChangeValue}
      />
    </div>
  );
}
