import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { authorizationRegistry } from "./authorization.registry.js";
import type { ResourceDefinition } from "./authorization.types.js";
import { AppError } from "../../utils/AppError.js";
import CatchError from "../../utils/catchAsync.js";

type AnyResourceDefinition = ResourceDefinition<any, string>;

type Registry = Record<string, AnyResourceDefinition>;

export function createAuthorizationMiddleware<TRegistry extends Registry>(
  registry: TRegistry,
) {
  return function authorize<
    TResource extends keyof TRegistry & string,
    TAction extends keyof TRegistry[TResource]["policies"] & string,
  >(resourceName: TResource, action: TAction, idParam = "id") {
    return CatchError(
      async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
          return next(new AppError("شما وارد نشده‌اید", 401));
        }

        const resourceId = req.params[idParam] as string;

        if (!resourceId || !mongoose.isValidObjectId(resourceId)) {
          return next(new AppError("شناسه منبع معتبر نیست", 400));
        }

        const definition = registry[resourceName] as TRegistry[TResource];

        const resource = await definition.load(resourceId);

        if (!resource) {
          return next(new AppError("اطلاعات موردنظر یافت نشد", 404));
        }

        const policy = definition.policies[action];

        if (!policy) {
          return next(new AppError("اطلاعات موردنظر یافت نشد", 404));
        }

        const hasAccess = await policy({
          user: req.user,
          resource,
        });

        if (!hasAccess) {
          return next(
            new AppError("شما اجازه انجام این عملیات را ندارید", 403),
          );
        }

        res.locals.authorizedResource = resource;

        next();
      },
    );
  };
}

export const authorize = createAuthorizationMiddleware(authorizationRegistry);
