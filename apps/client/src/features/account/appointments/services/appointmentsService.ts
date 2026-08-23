import { axiosInstance } from "@repo/auth";
import { buildQueryParams, GetRequestsParams } from "@/utils/buildQueryParams";
import { createAppointmentTypes } from "@repo/schema";

export const createAppointment = async (
  newAppointment: createAppointmentTypes,
) => {
  const { data } = await axiosInstance.post("/appointments", newAppointment);

  return data.data;
};

export const getAppointments = async (query: GetRequestsParams) => {
  const params = buildQueryParams(query);
  const { data } = await axiosInstance.get(
    `/appointments/myAppointments?${params}`,
  );

  return data;
};
export async function getAppointment(appointmentId: string) {
  const { data } = await axiosInstance.get(`/appointments/${appointmentId}`);

  return data.data;
}

export const deleteAppointment = async (appointmentId: string) => {
  const { data } = await axiosInstance.delete(`/appointments/${appointmentId}`);

  return data.data;
};
export const sessionReport = async (appointmentId: string) => {
  const { data: response } = await axiosInstance.get(
    `/sessionReports/${appointmentId}`,
  );
  return response.data;
};
