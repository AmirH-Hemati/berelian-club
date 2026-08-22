import UserModel from "../../models/user.model.js";

export class UserService {
  async getContractDaysRemaining(userId: string) {
    const user = await UserModel.findById(userId);

    return user?.contractDaysRemaining ?? 0;
  }
}
