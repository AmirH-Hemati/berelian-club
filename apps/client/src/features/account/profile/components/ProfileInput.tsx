"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { LucideIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface ProfileInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  icon: LucideIcon;
  type?: string;
  disabled?: boolean;
}

export function ProfileInput<T extends FieldValues>({
  control,
  name,
  label,
  icon: Icon,
  type = "text",
  disabled = false,
}: ProfileInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <Icon className="size-4" />
            </InputGroupAddon>

            <InputGroupInput
              type={type}
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              disabled={disabled}
            />
          </InputGroup>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
