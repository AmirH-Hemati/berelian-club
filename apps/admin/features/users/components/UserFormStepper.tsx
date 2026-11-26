"use client";

import { Check, UserRound, ShieldCheck, FileText } from "lucide-react";

type Props = {
  currentStep: number;
  steps: string[];
};

const stepIcons = [UserRound, ShieldCheck, FileText];

export default function UserFormStepper({ currentStep, steps }: Props) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isActive = currentStep === stepNumber;
        const StepIcon = stepIcons[index] || UserRound;

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`size-9 rounded-full flex items-center justify-center border transition-colors ${
                  isCompleted
                    ? "bg-primary text-primary-foreground border-primary"
                    : isActive
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <Check className="size-4" />
                ) : (
                  <StepIcon className="size-4" />
                )}
              </div>

              <span
                className={`text-xs whitespace-nowrap ${
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`h-px flex-1 mx-3 mb-6 ${
                  isCompleted ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
