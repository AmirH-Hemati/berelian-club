import type { ResourcePolicies } from "../authorization.types.js";
import { getResourceId } from "../authorization.helpers.js";
import type { SessionReportDocument } from "../../../models/sessionReport.model.js";

export type SessionReportAction = "read" | "delete";

export const sessionReportPolicy: ResourcePolicies<
  SessionReportDocument,
  SessionReportAction
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
};
