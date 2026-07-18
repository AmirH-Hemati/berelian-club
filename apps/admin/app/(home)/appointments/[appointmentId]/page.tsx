"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Spinner from "@/components/Spinner";
import AppointmentDataBox from "@/features/appointments/components/AppointmentDataBox";
import { useAppointment } from "@/features/appointments/hooks/useAppointment";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import StatusBadge from "@/features/requests/components/StatusBadge";
import SessionReportCard from "@/features/appointments/components/SessionReportCard";
import ErrorState from "@/components/ErrorState";
export default function Page() {
  const { appointment, isLoading, isError, refetch } = useAppointment();

  if (isLoading) return <Spinner />;
  if (isError) {
    return (
      <div className="bg-muted/30 p-4 rounded-lg ">
        <ErrorState
          title="خطا در دریافت اطلاعات جلسه"
          description="امکان دریافت اطلاعات این جلسه وجود ندارد."
          onRetry={refetch}
        />
      </div>
    );
  }
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
            <BreadcrumbPage>جزئیات مشاوره</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {appointment && (
        <>
          <div className="flex justify-between items-center ">
            <div className="flex items-center ">
              <Button variant="ghost" size="icon-lg">
                <ArrowRight className="size-5" />
              </Button>
              <h1 className="font-bold text-2xl my-5">درخواست</h1>
            </div>
            <StatusBadge status={appointment.status} />
          </div>
          <AppointmentDataBox appointment={appointment} />
          <SessionReportCard appointmentId={appointment._id} />
        </>
      )}
    </div>
  );
}
