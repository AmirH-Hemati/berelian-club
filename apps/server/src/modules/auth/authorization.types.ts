import type { Types } from "mongoose";

export type AuthorizationUser = {
  _id: Types.ObjectId;
  role: string;
};

export type AuthorizationContext<TResource> = {
  user: AuthorizationUser;
  resource: TResource;
};

export type ResourcePolicy<TResource> = (
  context: AuthorizationContext<TResource>,
) => boolean | Promise<boolean>;

export type ResourcePolicies<
  TResource,
  TActions extends string,
> = Record<TActions, ResourcePolicy<TResource>>;

export type ResourceDefinition<
  TResource,
  TActions extends string,
> = {
  load: (id: string) => Promise<TResource | null>;
  policies: ResourcePolicies<TResource, TActions>;
};