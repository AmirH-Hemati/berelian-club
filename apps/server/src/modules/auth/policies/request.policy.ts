import type { ResourcePolicies } from "../authorization.types.js";
import { getResourceId } from "../authorization.helpers.js";
import type { RequestDocument } from "../../../models/request.model.js";

export type RequestAction =
  "read" | "delete" | "approve" | "reject" | "complete";

export const requestPolicy: ResourcePolicies<RequestDocument, RequestAction> = {
  read: ({ user, resource }) => {
    switch (user.role) {
      case "admin":
      case "reception":
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

      case "reception":
        return (
          getResourceId(resource.assignedTo) === userId ||
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

  approve: ({ user, resource }) => {
    return user.role === "admin" || user.role === "reception";
  },

  reject: ({ user, resource }) => {
    return user.role === "admin" || user.role === "reception";
  },

  complete: ({ user, resource }) => {
    if (user.role === "admin") return true;

    return (
      user.role === "reception" &&
      getResourceId(resource.assignedTo) === user._id.toString()
    );
  },
};
