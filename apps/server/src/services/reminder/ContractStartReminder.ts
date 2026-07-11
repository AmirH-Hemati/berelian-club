import UserModel from "../../models/user.model.js";
import NotificationService from "./NotificationService.js";

class ContractStartReminder {
  async run(today: Date) {
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const users = await UserModel.find({
      contractStartDate: {
        $gte: today,
        $lt: tomorrow,
      },
      isActive: true,
    })
      .select("_id firstName lastName")
      .lean();

    if (!users.length) return;

    const notifications = users.map((user) => ({
      userId: user._id.toString(),
      title: "📄 شروع قرارداد",
      message: `${user.firstName} ${user.lastName} عزیز، قرارداد شما از امروز آغاز شده است.`,
      type: "contract_start" as const,
    }));

    await NotificationService.sendMany(notifications);
  }
}

export default new ContractStartReminder();
