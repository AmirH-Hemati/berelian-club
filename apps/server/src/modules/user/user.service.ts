import UserModel, { type UserRole } from "../../models/user.model.js";

export class UserService {
  async getContractDaysRemaining(userId: string) {
    const user = await UserModel.findById(userId);

    return user?.contractDaysRemaining ?? 0;
  }
  async getUsersByRole(role: UserRole) {
    return UserModel.find({ role }).select("_id");
  }
}
