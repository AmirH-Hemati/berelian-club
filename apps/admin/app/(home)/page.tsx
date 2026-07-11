"use client";
import RecentAppoinetments from "@/features/appointments/components/RecentAppoinetments";
import { TodayAppointments } from "@/features/appointments/components/TodayAppointments";
import Stats from "@/features/dashboard/components/Stats";
import TodayFollowUps from "@/features/followUps/components/TodayFollowUps";
import RecentRequests from "@/features/requests/components/RecentRequests";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 my-4 text-right">
      <div className="  lg:col-span-2  2xl:col-span-3">
        <Stats />
      </div>
      <RecentRequests />
      <RecentAppoinetments />
      <TodayFollowUps />
      <TodayAppointments />
    </div>
  );
}
