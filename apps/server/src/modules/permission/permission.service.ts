import mongoose from "mongoose";
import { PermissionModel } from "../../models/permission.model.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import { ROLE_PERMISSION_PRESETS } from "./permission.constants.js";
import type { UserRole } from "../../models/user.model.js";

type CreatePermissionInput = {
  key: string;
  name: string;
  group: string;
  description?: string;
};

type UpdatePermissionInput = {
  name?: string;
  group?: string;
  description?: string;
  isActive?: boolean;
};

const groupInfo: Record<string, { title: string; description: string }> = {
  users: {
    title: "مدیریت کاربران",
    description: "دسترسی به ایجاد و مدیریت کاربران",
  },
  requests: {
    title: "مدیریت درخواست‌ها",
    description: "دسترسی به مشاهده و مدیریت درخواست‌ها",
  },
  appointments: {
    title: "مدیریت نوبت‌ها",
    description: "دسترسی به مشاهده و مدیریت نوبت‌های مشاوره",
  },
  conversations: {
    title: "مدیریت گفتگوها",
    description: "دسترسی به مشاهده و پاسخگویی به گفتگوها",
  },
  files: {
    title: "مدیریت فایل‌ها",
    description: "دسترسی به مشاهده و ارسال فایل‌ها",
  },
  followUps: {
    title: "مدیریت پیگیری‌ها",
    description: "دسترسی به ایجاد و مدیریت پیگیری‌ها",
  },
};

export class PermissionService {
  constructor() {}

  async getAll() {
    const permissions = await PermissionModel.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $sort: {
          group: 1,
          key: 1,
        },
      },
      {
        $group: {
          _id: "$group",
          permissions: {
            $push: {
              key: "$key",
              label: "$name",
              _id: "$_id",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          group: "$_id",
          permissions: 1,
        },
      },
      {
        $sort: {
          group: 1,
        },
      },
    ]);

    return permissions.map((item) => ({
      group: item.group,
      title: groupInfo[item.group]?.title ?? item.group,
      description: groupInfo[item.group]?.description ?? "",
      permissions: item.permissions,
    }));
  }

  async getById(id: string) {
    const permission = await PermissionModel.findById(id);

    if (!permission) {
      throw new AppError("Permission پیدا نشد", 404);
    }

    return permission;
  }

  async validateAndGetIds(permissionIds: string[]) {
    const uniqueIds = [...new Set(permissionIds)];

    if (uniqueIds.length !== permissionIds.length) {
      throw new AppError("Permission تکراری ارسال شده است", 400);
    }

    const invalidIds = uniqueIds.some((id) => !mongoose.isValidObjectId(id));

    if (invalidIds) {
      throw new AppError("شناسه یکی از Permissionها معتبر نیست", 400);
    }

    const permissions = await PermissionModel.find({
      _id: { $in: uniqueIds },
      isActive: true,
    }).select("_id");

    if (permissions.length !== uniqueIds.length) {
      throw new AppError(
        "یک یا چند Permission وجود ندارد یا غیرفعال شده است",
        400,
      );
    }

    return permissions.map((permission) => permission._id);
  }

  async getDefaultPermissions(role: UserRole) {
    const permissionKeys = ROLE_PERMISSION_PRESETS[role];

    const permissions = await PermissionModel
      .find({
        key: { $in: permissionKeys },
        isActive: true,
      })
      .select("_id")
      .lean();

    return permissions.map((permission) => permission._id);
  }

  async create(data: CreatePermissionInput) {
    const existing = await PermissionModel.findOne({
      key: data.key,
    });

    if (existing) {
      throw new AppError("این Permission قبلاً ایجاد شده است", 409);
    }

    return PermissionModel.create({
      ...data,
      isSystem: false,
      isActive: true,
    });
  }

  async update(id: string, data: UpdatePermissionInput) {
    const permission = await getById(id);

    if (permission.isSystem && data.isActive === false) {
      throw new AppError("Permissionهای سیستمی قابل غیرفعال‌سازی نیستند", 400);
    }

    Object.assign(permission, data);

    await permission.save();

    return permission;
  }

  async delete(id: string) {
    const permission = await getById(id);

    if (permission.isSystem) {
      throw new AppError("Permission سیستمی قابل حذف نیست", 400);
    }

    permission.isActive = false;
    await permission.save();

    return permission;
  }
}
