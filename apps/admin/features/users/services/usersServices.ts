import { axiosInstance } from "@repo/auth";
import { buildQueryParams, GetRequestsParams } from "@/utils/buildQueryParams";
import {
  CheckUserDuplicatesInput,
  CreateUserInputTypes,
  updateUserInputTypes,
} from "@repo/schema";

export async function getAllUsers(query: GetRequestsParams) {
  const searchFields = ["firstName", "lastName", "email", "phoneNumber"];
  const params = buildQueryParams({
    ...query,
    searchFields: searchFields.join(","),
  });
  const { data } = await axiosInstance.get(`/users?${params}`);
  return data;
}

export type UserRole = "investor" | "consultant" | "reception";

export type UserOption = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
};

export type CheckUserDuplicatesResult = {
  phoneNumber: boolean;
  nationalCode: boolean;
  email: boolean;
};

export async function checkUserDuplicates(data: CheckUserDuplicatesInput) {
  const response = await axiosInstance.post("/users/check-duplicates", data);

  return response.data.data;
}

export async function getUsersByRole(role: UserRole) {
  const { data } = await axiosInstance.get(`/users/by-role/${role}`);

  return data.data as UserOption[];
}

export async function getUser(id: string) {
  const { data } = await axiosInstance.get(`/users/${id}`);

  return data.data;
}
export async function createUser(newUser: CreateUserInputTypes) {
  const { data } = await axiosInstance.post(`/users`, newUser);

  return data.data;
}
export async function updateUser(newUser: updateUserInputTypes, id: string) {
  const { data } = await axiosInstance.patch(`/users/${id}`, newUser);

  return data.data;
}

export async function deleteUser(id: string) {
  const { data } = await axiosInstance.delete(`/users/${id}`);

  return data.data;
}
