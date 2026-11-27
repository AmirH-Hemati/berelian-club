import type { CheckUserDuplicatesInput } from "@repo/schema";
import type { ContractStatus } from "../../models/contract.model.js";
import UserModel, { type UserRole } from "../../models/user.model.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import type ContractService from "../contract/contract.service.js";
import type { PermissionService } from "../permission/permission.service.js";

type CreateUserInput = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  nationalCode: string;
  email?: string;
  birthDate?: Date;
  role?: "admin" | "investor" | "reception" | "consultant";

  permissions?: string[];

  contract?: {
    startDate: Date;
    endDate: Date;
    status: ContractStatus;
  };

  bankAccountNumber?: string;
  shabaNumber?: string;
};

export class UserService {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly contractService: ContractService,
  ) {}

  async createUser(data: CreateUserInput) {
    const permissionIds = await this.permissionService.validateAndGetIds(
      data.permissions ?? [],
    );

    const { contract, ...userData } = data;

    const user = await UserModel.create({
      ...userData,
      permissions: permissionIds,
    });

    if (user.role === "investor" && contract) {
      await this.contractService.createContract({
        ...contract,
        user: user._id,
      });
    }

    return user;
  }

  async getUser(id: string) {
    const user = await UserModel.findById(id).populate({
      path: "contract",
      select: "startDate endDate status",
    });

    if (!user) {
      throw new AppError("کاربر موردنظر پیدا نشد", 404);
    }

    return user;
  }

  async getUsers(query: Record<string, unknown>) {
    const features = new ApiFeatures(UserModel.find(), query)
      .filter()
      .search()
      .sort()
      .fields();

    const { total, limit, page, totalPages } = await features.pagination();

    const users = await features.query.populate({
      path: "contract",
      select: "startDate endDate status",
    });
    return {
      users,
      pagination: {
        totalPages,
        total,
        limit,
        page,
      },
    };
  }

  async checkDuplicates(data: CheckUserDuplicatesInput) {
    const { phoneNumber, nationalCode, email, excludeUserId } = data;

    const conditions = [];

    if (phoneNumber) {
      conditions.push({ phoneNumber });
    }

    if (nationalCode) {
      conditions.push({ nationalCode });
    }

    if (email) {
      conditions.push({ email });
    }

    const filter: Record<string, unknown> = {
      $or: conditions,
    };

    if (excludeUserId) {
      filter._id = {
        $ne: excludeUserId,
      };
    }

    const users = await UserModel.find(filter)
      .select("phoneNumber nationalCode email")
      .lean();

    return {
      phoneNumber: data.phoneNumber
        ? users.some((user) => user.phoneNumber === data.phoneNumber)
        : false,

      nationalCode: data.nationalCode
        ? users.some((user) => user.nationalCode === data.nationalCode)
        : false,

      email: data.email
        ? users.some((user) => user.email === data.email)
        : false,
    };
  }

  async getContractDaysRemaining(userId: string) {
    const user = await UserModel.findById(userId);

    return user?.contractDaysRemaining ?? 0;
  }
  async getUsersByRole(role: UserRole) {
    return UserModel.find({ role }).select(
      "_id  firstName lastName phoneNumber role",
    );
  }

  async countUsersByRole(role: UserRole) {
    return UserModel.countDocuments({ role });
  }
}
