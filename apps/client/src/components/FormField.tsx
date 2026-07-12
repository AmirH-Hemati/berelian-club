"use client";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { cloneElement, ReactElement } from "react";

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  description?: string;
  children: ReactElement;
  className?: string;
}

export function FormField<T extends FieldValues>({
  name,
  control,
  label,
  children,
  className,
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className={className} data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          {cloneElement(children, {
            ...field,
            ...(fieldState.invalid ? { "aria-invalid": true } : {}),
          })}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
