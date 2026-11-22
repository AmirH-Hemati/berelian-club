import type { ResourcePolicies } from "../authorization.types.js";
import { getResourceId } from "../authorization.helpers.js";
import type { appointmentDocument } from "../../../models/appointment.model.js";

export type AppointmentAction =
  "read" | "delete" | "approve" | "reject" | "complete" | "reschedule";

export const appointmentPolicy: ResourcePolicies<
  appointmentDocument,
  AppointmentAction
> = {
  read: ({ user, resource }) => {
    switch (user.role) {
      case "admin":
      case "consultant":
        return true;

      case "investor":
        return getResourceId(resource.investor) === user._id.toString();

      default:
        return false;
    }
  },

  delete: ({ user, resource }) => {
    const userId = user._id.toString();

    switch (user.role) {
      case "admin":
        return true;

      case "consultant":
        return (
          getResourceId(resource.consultant) === userId ||
          resource.status === "pending"
        );

      case "investor":
        return (
          getResourceId(resource.investor) === userId &&
          resource.status === "pending"
        );

      default:
        return false;
    }
  },

  complete: ({ user, resource }) => {
    if (user.role === "admin") return true;

    return (
      user.role === "consultant" &&
      getResourceId(resource.consultant) === user._id.toString()
    );
  },
  approve: ({ user }) => {
    return user.role === "admin" || user.role === "consultant";
  },

  reject: ({ user, resource }) => {
    return user.role === "admin" || user.role === "consultant";
  },

  reschedule: ({ user, resource }) => {
    return user.role === "admin" || user.role === "consultant";
  },
};
