import type { ResourcePolicies } from "../authorization.types.js";
import { getResourceId } from "../authorization.helpers.js";
import type { FollowUpDocument } from "../../../models/followUp.model.js";

export type FollowUpAction = "read" | "delete" | "complete";

export const followUpPolicy: ResourcePolicies<
  FollowUpDocument,
  FollowUpAction
> = {
  read: ({ user, resource }) => {
    if (user.role === "admin") return true;

    return (
      user.role === "consultant" &&
      getResourceId(resource.consultant) === user._id.toString()
    );
  },

  delete: ({ user, resource }) => {
    if (user.role === "admin") return true;

    return (
      user.role === "consultant" &&
      getResourceId(resource.consultant) === user._id.toString()
    );
  },

  complete: ({ user, resource }) => {
    if (user.role === "admin") return true;

    return (
      user.role === "consultant" &&
      getResourceId(resource.consultant) === user._id.toString()
    );
  },
};
