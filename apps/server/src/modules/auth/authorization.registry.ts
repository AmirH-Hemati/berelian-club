import type { RequestDocument } from "../../models/request.model.js";
import RequestModel from "../../models/request.model.js";
import type { ResourceDefinition } from "./authorization.types.js";
import {
  requestPolicy,
  type RequestAction,
} from "./policies/request.policy.js";

export const authorizationRegistry = {
  request: {
    load: (id: string) => RequestModel.findById(id).exec(),
    policies: requestPolicy,
  } satisfies ResourceDefinition<RequestDocument, RequestAction>,
};
