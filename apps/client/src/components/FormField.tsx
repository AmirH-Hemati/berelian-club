import { LucideIcon } from "lucide-react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@repo/ui";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@repo/ui";

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  icon: LucideIcon;
}

export function FormField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  icon: Icon,
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <InputGroup>
            <InputGroupAddon align="inline-end">
              <Icon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              {...field}
              type={type}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete="off"
            />
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
