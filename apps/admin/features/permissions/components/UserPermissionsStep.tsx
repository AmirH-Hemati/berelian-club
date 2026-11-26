"use client";

import { Controller, type Control } from "react-hook-form";
import { Checkbox, Field, FieldError, Spinner } from "@repo/ui";

import type { CreateUserInputTypes } from "@repo/schema";
import { useGetPermissions } from "@/features/permissions/hooks/useGetPermissions";

type Props = {
  control: Control<CreateUserInputTypes>;
};

export default function UserPermissionsStep({ control }: Props) {
  const { permissions, isLoading, isError } = useGetPermissions();

  if (isLoading) return <Spinner />;

  if (isError) {
    return (
      <p className="text-sm text-destructive">
        دریافت دسترسی‌ها با خطا مواجه شد.
      </p>
    );
  }

  return (
    <Controller
      name="permissions"
      control={control}
      render={({ field, fieldState }) => {
        const selectedPermissions = field.value ?? [];

        const togglePermission = (id: string, checked: boolean) => {
          const nextPermissions = checked
            ? [...selectedPermissions, id]
            : selectedPermissions.filter((item) => item !== id);

          field.onChange(nextPermissions);
        };

        return (
          <Field data-invalid={fieldState.invalid} className="gap-4">
            <div>
              <h3 className="font-semibold text-foreground">
                تعیین سطح دسترسی کاربر
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                دسترسی‌های موردنیاز این کاربر را انتخاب کنید. امکان انتخاب چندین
                دسترسی وجود دارد.
              </p>
            </div>

            <div className="space-y-4">
              {permissions?.map((group) => {
                const groupIds = group.permissions.map(
                  (permission) => permission._id,
                );

                const selectedCount = groupIds.filter((id) =>
                  selectedPermissions.includes(id),
                ).length;

                const isAllSelected =
                  groupIds.length > 0 && selectedCount === groupIds.length;

                return (
                  <div
                    key={group.group}
                    className="rounded-xl border p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-medium text-sm">{group.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {group.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="text-xs text-primary hover:underline whitespace-nowrap"
                        onClick={() => {
                          if (isAllSelected) {
                            field.onChange(
                              selectedPermissions.filter(
                                (id) => !groupIds.includes(id),
                              ),
                            );
                          } else {
                            field.onChange([
                              ...new Set([...selectedPermissions, ...groupIds]),
                            ]);
                          }
                        }}
                      >
                        {isAllSelected ? "لغو انتخاب همه" : "انتخاب همه"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {group.permissions.map((permission) => (
                        <label
                          key={permission._id}
                          className="flex items-center gap-2.5 rounded-lg p-2 hover:bg-muted/60 cursor-pointer"
                        >
                          <Checkbox
                            checked={selectedPermissions.includes(
                              permission._id,
                            )}
                            onCheckedChange={(checked) =>
                              togglePermission(permission._id, checked === true)
                            }
                          />

                          <span className="text-sm">{permission.label}</span>
                        </label>
                      ))}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {selectedCount} از {group.permissions.length} دسترسی
                      انتخاب شده
                    </div>
                  </div>
                );
              })}
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
