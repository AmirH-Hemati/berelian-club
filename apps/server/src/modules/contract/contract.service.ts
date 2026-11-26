import mongoose, { Types } from "mongoose";
import { AppError } from "../../utils/AppError.js";
import {
  ContractModel,
  type ContractStatus,
} from "../../models/contract.model.js";

type ContractInput = {
  user: Types.ObjectId;
  startDate: Date | string;
  endDate: Date | string;
  status: ContractStatus;
};

type ContractUpdateInput = Partial<ContractInput>;

class ContractService {
  private validateDates(startDate: Date | string, endDate: Date | string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new AppError("تاریخ قرارداد معتبر نیست", 400);
    }

    if (end <= start) {
      throw new AppError(
        "تاریخ پایان قرارداد باید بعد از تاریخ شروع باشد",
        400,
      );
    }
  }

  async createContract(data: ContractInput) {
    if (!mongoose.isValidObjectId(data.user)) {
      throw new AppError("شناسه کاربر معتبر نیست", 400);
    }

    this.validateDates(data.startDate, data.endDate);

    const contract = await ContractModel.create(data);

    return contract;
  }

  async getAllContracts(role: string) {
    return ContractModel.find().sort("-createdAt");
  }

  async getContractById(contractId: string, userId: string, role: string) {
    const contract = await ContractModel.findById(contractId);

    if (!contract) {
      throw new AppError("قرارداد پیدا نشد", 404);
    }

    return contract;
  }

  async updateContract(
    contractId: string,
    data: ContractUpdateInput,
    role: string,
  ) {
    const contract = await ContractModel.findById(contractId);

    if (!contract) {
      throw new AppError("قرارداد پیدا نشد", 404);
    }

    const startDate = data.startDate ?? contract.startDate;
    const endDate = data.endDate ?? contract.endDate;

    this.validateDates(startDate, endDate);

    Object.assign(contract, data);

    await contract.save();

    return contract;
  }

  async deleteContract(contractId: string, role: string) {
    const contract = await ContractModel.findByIdAndDelete(contractId);

    if (!contract) {
      throw new AppError("قرارداد پیدا نشد", 404);
    }

    return contract;
  }
}

export default ContractService;
