import CatchError from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
export function requiredPermissions(...requiredPermissions: string[]) {
  return CatchError(async (req, _res, next) => {
    if (!req.user) {
      throw new AppError("ابتدا وارد حساب کاربری شوید", 401);
    }

    
    if (req.user.role === "admin") {
      return next();
    }

    const userPermissions = req.user.permissions as {
      key: string;
      isActive: boolean;
    }[];

    const activePermissionKeys = new Set(
      userPermissions
        .filter((permission) => permission.isActive)
        .map((permission) => permission.key),
    );

    const hasPermission = requiredPermissions.some((permission) =>
      activePermissionKeys.has(permission),
    );

    if (!hasPermission) {
      throw new AppError("شما اجازه انجام این عملیات را ندارید", 403);
    }

    next();
  });
}
