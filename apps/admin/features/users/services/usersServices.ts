import { axiosInstance } from "@repo/auth";
import { buildQueryParams, GetRequestsParams } from "@/utils/buildQueryParams";
import { CreateUserInputTypes, updateUserInputTypes } from "@repo/schema";

export async function getAllUsers(query: GetRequestsParams) {
  const searchFields = ["firstName", "lastName"];
  const params = buildQueryParams({
    ...query,
    searchFields: searchFields.join(","),
  });
  const { data } = await axiosInstance.get(`/users?${params}`);
  return data;
}

export type UserRole = "investor" | "consultant";

export type UserOption = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
};

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
