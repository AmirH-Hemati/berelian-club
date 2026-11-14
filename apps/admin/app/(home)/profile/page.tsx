"use client";
import PageSpinner from "@/components/PageSpinner";
import PersonalInformation from "@/features/users/components/PersonalInformation";
import ProfileHeader from "@/features/users/components/ProfileHeader";
import { useUser } from "@repo/auth";

function page() {
  const { user, isLoading } = useUser();
  if (isLoading) return <PageSpinner />;
  return (
    <div className="space-y-6">
      <ProfileHeader user={user} />
      <PersonalInformation user={user} />
    </div>
  );
}

export default page;
