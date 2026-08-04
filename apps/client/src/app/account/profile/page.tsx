"use client";
import PersonalInformation from "@/features/account/profile/components/PersonalInformation";
import BankInformation from "@/features/account/profile/components/BankInformation";
import ProfileHeader from "@/features/account/profile/components/ProfileHeader";
import ContractStatus from "@/features/account/dashboard/components/ContractStatus";
import { useUser } from "@/features/auth/hooks/useUser";
import Spinner from "@/components/spinner/Spinner";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@repo/ui";

export default function ProfilePage() {
  const { user, isLoading, isError, refetch } = useUser();
  if (isLoading) return <Spinner />;
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        <div className=" flex flex-col items-center gap-2">
          <h2 className="text-lg font-semibold">خطا در دریافت اطلاعات شخصی</h2>

          <p className="max-w-sm text-sm text-muted-foreground">
            ارتباط با سرور برقرار نشد للطفا بعدا دوباره تلاش کنید.
          </p>
        </div>

        {refetch && (
          <Button onClick={() => refetch()} disabled={isLoading}>
            <RefreshCw className="ml-2 h-4 w-4" />
            تلاش مجدد
          </Button>
        )}
      </div>
    );
  }
  return (
    <div className="space-y-6 ">
      <ProfileHeader user={user} />

      <PersonalInformation user={user} />

      <ContractStatus />

      <BankInformation user={user} />
    </div>
  );
}
