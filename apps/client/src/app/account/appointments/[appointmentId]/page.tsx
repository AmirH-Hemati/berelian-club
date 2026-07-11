"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import SessionReportCard from "@/features/account/appointments/components/SessionReportCard";
import UserAppointmentDataBox from "@/features/account/appointments/components/UserAppointmentDataBox";
import { useAppointment } from "@/features/account/appointments/hooks/useAppointment";
import StatusBadge from "@/features/account/requests/components/StatusBadge";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { appointment, isLoading } = useAppointment();
  const router = useRouter();
  if (isLoading) return <Spinner />;
  return (
    <div className="flex flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">داشبورد</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/appointments">مشاوره ها</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>جزیات مشاوره</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {appointment && (
        <>
          <div className="flex justify-between items-center ">
            <div className="flex items-center ">
              <Button
                variant="ghost"
                size="icon-lg"
                onClick={() => router.back()}
              >
                <ArrowRight className="size-5" />
              </Button>
              <h1 className="font-bold text-2xl my-5">درخواست</h1>
            </div>
            <StatusBadge status={appointment.status} />
          </div>
          <UserAppointmentDataBox appointment={appointment} />
          <SessionReportCard appointmentId={appointment._id} />
        </>
      )}
    </div>
  );
}
