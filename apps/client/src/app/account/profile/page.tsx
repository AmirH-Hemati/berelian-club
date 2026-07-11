"use client";
import PersonalInformation from "@/features/account/profile/components/PersonalInformation";
import BankInformation from "@/features/account/profile/components/BankInformation";
import ProfileHeader from "@/features/account/profile/components/ProfileHeader";
import ContractStatus from "@/features/account/dashboard/components/ContractStatus";
import { useUser } from "@/features/auth/hooks/useUser";
import Spinner from "@/components/spinner/Spinner";

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  return (
    <div className="space-y-6 ">
      <ProfileHeader user={user} />

      <PersonalInformation user={user} />

      <ContractStatus />

      <BankInformation user={user} />
    </div>
  );
}
