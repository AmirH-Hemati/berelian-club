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

import InvestorContractStep from "./InvestorContractStep";
import UserFormStepper from "./UserFormStepper";
import UserPermissionsStep from "../../permissions/components/UserPermissionsStep";

import { Button, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui";
import UserIdentity from "./UserIdentity";

type Props = {
  user?: UserType;
  onCloseDialog: () => void;
};

const STEPS = ["اطلاعات هویتی", "سطح دسترسی", "اطلاعات قرارداد"];

export function CreateUserForm({ user, onCloseDialog }: Props) {
  const { createUser, isCreating } = useCreateUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const [currentStep, setCurrentStep] = useState(1);

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
          permissions: [],
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

  const visibleSteps = isInvestor ? STEPS : STEPS.slice(0, 2);

  const handleSubmit = (values: CreateUserInputTypes) => {
    console.log(values);
    if (isEditSession) {
      updateUser(
        { id: editId, data: values },
        {
          onSuccess: onCloseDialog,
        },
      );
    } else {
      createUser(values, {
        onSuccess: onCloseDialog,
      });
    }
  };
  const handleNext = async () => {
    if (currentStep === 1) {
      const isValid = await form.trigger([
        "firstName",
        "lastName",
        "phoneNumber",
        "nationalCode",
        "email",
        "birthDate",
        "role",
      ]);

      if (!isValid) return;

      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      if (isInvestor) {
        setCurrentStep(3);
        return;
      }

      await form.handleSubmit(handleSubmit)();
    }
  };

  const handlePrevious = () => {
    setCurrentStep((step) => Math.max(1, step - 1));
  };

  const handleRoleChange = (role: CreateUserInputTypes["role"]) => {
    form.setValue("role", role, {
      shouldValidate: true,
    });

    // form.setValue("permissions", [...ROLE_DEFAULT_PERMISSIONS[role]], {
    //   shouldDirty: true,
    //   shouldValidate: true,
    // });
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
        {/* Step 1: Identity */}
        {currentStep === 1 && (
          <UserIdentity
            control={form.control}
            handleRoleChange={handleRoleChange}
            form={form}
          />
        )}

        {/* Step 2: Permissions */}
        {currentStep === 2 && <UserPermissionsStep control={form.control} />}

        {/* Step 3: Investor contract */}
        {currentStep === 3 && isInvestor && (
          <InvestorContractStep control={form.control} />
        )}

        {/* Navigation */}
        <div className="flex items-center gap-3 pt-2 mr-auto border-t">
          <Button
            type="button"
            variant="outline"
            onClick={currentStep === 1 ? onCloseDialog : handlePrevious}
            disabled={isWorking}
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
            type={currentStep === 3 ? "submit" : "button"}
            onClick={currentStep !== 3 ? handleNext : undefined}
            disabled={isWorking}
          >
            {isWorking ? (
              "در حال ثبت..."
            ) : currentStep === 3 || !isInvestor ? (
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
