"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  createUserSchema,
  type CreateUserInputTypes,
  type UserType,
} from "@repo/schema";

import { useCreateUser } from "../hooks/useCreateUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useCheckUserDuplicates } from "../hooks/useCheckUserDuplicates";
import { useGetDefaultPermissions } from "@/features/permissions/hooks/useGetDefaultPermissions";

import InvestorContractStep from "./InvestorContractStep";
import UserFormStepper from "./UserFormStepper";
import UserPermissionsStep from "../../permissions/components/UserPermissionsStep";
import UserIdentity from "./UserIdentity";

import { Button, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui";

type Props = {
  user?: UserType;
  onCloseDialog: () => void;
};

const IDENTITY_FIELDS = [
  "firstName",
  "lastName",
  "phoneNumber",
  "nationalCode",
  "email",
  "birthDate",
  "role",
] as const;

const PERMISSION_ROLES = ["reception", "consultant"] as const;

const IDENTITY_STEP = "اطلاعات هویتی";
const PERMISSIONS_STEP = "سطح دسترسی";
const CONTRACT_STEP = "اطلاعات قرارداد";

export function CreateUserForm({ user, onCloseDialog }: Props) {
  const [currentStep, setCurrentStep] = useState(1);

  const { createUser, isCreating } = useCreateUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const { checkUserDuplicates, isChecking } = useCheckUserDuplicates();
  const { getDefaultPermissions, isLoadingDefaults } =
    useGetDefaultPermissions();

  const editId = user?._id || "";
  const isEditSession = Boolean(editId);
  const isWorking = isCreating || isUpdating;

  const form = useForm<CreateUserInputTypes>({
    resolver: zodResolver(createUserSchema),

    defaultValues: isEditSession
      ? {
          ...user,
          birthDate: user?.birthDate ? new Date(user.birthDate) : undefined,

          contract: {
            startDate: user?.contract?.startDate
              ? new Date(user.contract.startDate)
              : undefined,

            endDate: user?.contract?.endDate
              ? new Date(user.contract.endDate)
              : undefined,
          },

          role: user?.role || "investor",
          permissions: user?.permissions || [],
        }
      : {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          nationalCode: "",
          email: "",
          birthDate: new Date(),
          role: "investor",
          permissions: [],
          contract: {
            startDate: new Date(),
            endDate: new Date(),
          },
        },
  });

  const selectedRole = useWatch({
    control: form.control,
    name: "role",
  });

  const isInvestor = selectedRole === "investor";

  const needsPermissions = PERMISSION_ROLES.includes(
    selectedRole as (typeof PERMISSION_ROLES)[number],
  );

  const visibleSteps = [
    IDENTITY_STEP,
    ...(needsPermissions ? [PERMISSIONS_STEP] : []),
    ...(isInvestor ? [CONTRACT_STEP] : []),
  ];

  const handleSubmit = (values: CreateUserInputTypes) => {
    if (isEditSession) {
      updateUser({ id: editId, data: values }, { onSuccess: onCloseDialog });
    } else {
      createUser(values, { onSuccess: onCloseDialog });
    }
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      const isValid = await form.trigger(IDENTITY_FIELDS);

      if (!isValid) return;

      const fields = ["phoneNumber", "nationalCode", "email"] as const;

      fields.forEach((name) => {
        if (form.getFieldState(name).error?.type === "duplicate") {
          form.clearErrors(name);
        }
      });

      form.clearErrors("root.duplicateCheck");

      const values = form.getValues();

      try {
        const result = await checkUserDuplicates({
          phoneNumber: values.phoneNumber,
          nationalCode: values.nationalCode,
          ...(values.email.trim() && {
            email: values.email.trim(),
          }),
          ...(isEditSession && {
            excludeUserId: editId,
          }),
        });

        let hasDuplicate = false;

        if (result.phoneNumber) {
          form.setError("phoneNumber", {
            type: "duplicate",
            message: "این شماره موبایل قبلاً ثبت شده است",
          });
          hasDuplicate = true;
        }

        if (result.nationalCode) {
          form.setError("nationalCode", {
            type: "duplicate",
            message: "این کد ملی قبلاً ثبت شده است",
          });
          hasDuplicate = true;
        }

        if (result.email) {
          form.setError("email", {
            type: "duplicate",
            message: "این ایمیل قبلاً ثبت شده است",
          });
          hasDuplicate = true;
        }

        if (hasDuplicate) return;

        // for submit admin
        if (!needsPermissions && !isInvestor) {
          await form.handleSubmit(handleSubmit)();
          return;
        }

        setCurrentStep(2);
      } catch {
        form.setError("root.duplicateCheck", {
          type: "server",
          message: "بررسی اطلاعات با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
        });
      }

      return;
    }

    if (currentStep === 2) {
      await form.handleSubmit(handleSubmit)();
    }
  };

  const handlePrevious = () => {
    setCurrentStep((step) => Math.max(1, step - 1));
  };

  const handleRoleChange = async (role: CreateUserInputTypes["role"]) => {
    form.setValue("role", role, {
      shouldValidate: true,
    });

    setCurrentStep(1);

    form.clearErrors("root.permissions");

    if (!PERMISSION_ROLES.includes(role as (typeof PERMISSION_ROLES)[number])) {
      form.setValue("permissions", [], {
        shouldDirty: true,
        shouldValidate: true,
      });
      return;
    }

    try {
      const permissionIds = await getDefaultPermissions(role);

      if (form.getValues("role") !== role) return;

      form.setValue("permissions", permissionIds, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } catch {
      form.setValue("permissions", [], {
        shouldValidate: true,
      });

      form.setError("root.permissions", {
        type: "server",
        message: "دریافت دسترسی‌های پیش‌فرض با خطا مواجه شد.",
      });
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isEditSession ? "ویرایش اطلاعات کاربر" : "ایجاد کاربر جدید"}
        </DialogTitle>

        <DialogDescription>
          اطلاعات کاربر و سطح دسترسی موردنیاز او را مشخص کنید.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-5 mb-2">
        <UserFormStepper currentStep={currentStep} steps={visibleSteps} />
      </div>

      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-5 flex flex-col gap-6"
      >
        {currentStep === 1 && (
          <UserIdentity
            control={form.control}
            handleRoleChange={handleRoleChange}
            form={form}
          />
        )}

        {currentStep === 2 && needsPermissions && (
          <UserPermissionsStep control={form.control} />
        )}

        {currentStep === 2 && isInvestor && (
          <InvestorContractStep control={form.control} />
        )}

        {form.formState.errors.root?.duplicateCheck && (
          <p className="text-sm text-destructive">
            {form.formState.errors.root.duplicateCheck.message}
          </p>
        )}

        {form.formState.errors.root?.permissions && (
          <p className="text-sm text-destructive">
            {form.formState.errors.root.permissions.message}
          </p>
        )}

        <div className="flex items-center gap-3 pt-2 mr-auto border-t">
          <Button
            type="button"
            variant="outline"
            onClick={currentStep === 1 ? onCloseDialog : handlePrevious}
            disabled={isWorking || isChecking || isLoadingDefaults}
          >
            {currentStep === 1 ? (
              "انصراف"
            ) : (
              <>
                <ArrowRight className="size-4" />
                مرحله قبل
              </>
            )}
          </Button>

          <Button
            type={currentStep === 2 ? "submit" : "button"}
            onClick={currentStep === 1 ? handleNext : undefined}
            disabled={isWorking || isChecking || isLoadingDefaults}
          >
            {isWorking ? (
              "در حال ثبت..."
            ) : isChecking ? (
              "در حال بررسی اطلاعات..."
            ) : isLoadingDefaults ? (
              "در حال دریافت دسترسی‌ها..."
            ) : currentStep === 2 ? (
              isEditSession ? (
                "ذخیره تغییرات"
              ) : (
                "ایجاد کاربر"
              )
            ) : (
              <>
                مرحله بعد
                <ArrowLeft className="size-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
