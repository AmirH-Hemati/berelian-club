"use client";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Textarea } from "./ui/textarea";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
};
export default function TextareaFiled<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Textarea
            {...field}
            aria-invalid={fieldState.invalid}
            id={name}
            placeholder={placeholder}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
