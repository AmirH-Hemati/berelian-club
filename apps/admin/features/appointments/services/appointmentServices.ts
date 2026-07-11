import axiosInstance from "@/lib/axiosInstance";
import { buildQueryParams, GetRequestsParams } from "@/utils/buildQueryParams";
import { SessionReportFormValues } from "@repo/schema";

export async function getAppointments(qeury: GetRequestsParams) {
  const params = buildQueryParams(qeury);
  const { data } = await axiosInstance.get(`/appointments?${params}`);

  return data;
}

export async function getAppointment(appointmentId: string) {
  const { data } = await axiosInstance.get(`/appointments/${appointmentId}`);

  return data.data;
}

export const getTodayAppointments = async () => {
  const { data } = await axiosInstance.get("/appointments/today");
  return data.data;
};

export const deleteAppointment = async (appointmentId: string) => {
  const { data } = await axiosInstance.delete(`/appointments/${appointmentId}`);

  return data.data;
};
export async function getRecentAppointments() {
  const { data } = await axiosInstance.get("/appointments");
  return data;
}
export const approveAppointment = async (appointmentsId: string) => {
  const { data } = await axiosInstance.patch(
    `/appointments/${appointmentsId}/approve`,
  );
  return data.data;
};
export const rejectAppointment = async (appointmentsId: string) => {
  const { data } = await axiosInstance.patch(
    `/appointments/${appointmentsId}/reject`,
  );
  return data.data;
};
export const completeAppointment = async (appointmentsId: string) => {
  const { data } = await axiosInstance.patch(
    `/appointments/${appointmentsId}/complete`,
  );
  return data.data;
};

export const createSessionReport = async (data: SessionReportFormValues) => {
  const { data: response } = await axiosInstance.post("/sessionReports", data);
  return response.data;
};
export const sessionReport = async (appointmentId: string) => {
  const { data: response } = await axiosInstance.get(
    `/sessionReports/${appointmentId}`,
  );
  return response.data;
};
export const deleteSessionReport = async (sessionReportId: string) => {
  const { data: response } = await axiosInstance.delete(
    `/sessionReports/${sessionReportId}`,
  );
  return response.data;
};
