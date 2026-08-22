import { notificationService } from "../../container/index.js";
import UserModel from "../../models/user.model.js";

class ContractExpiryReminder {
  async run(today: Date) {
    today.setHours(0, 0, 0, 0);

    const targetDayStart = new Date(today);
    targetDayStart.setDate(today.getDate() + 2);

    const targetDayEnd = new Date(targetDayStart);
    targetDayEnd.setHours(23, 59, 59, 999);
    const dateKey = today.toISOString().split("T")[0];

    const users = await UserModel.find({
      isActive: true,
      contractEndDate: {
        $gte: targetDayStart,
        $lte: targetDayEnd,
      },
    })
      .select("_id firstName lastName contractEndDate")
      .lean();

    if (!users.length) return;

    const notifications = users.map((user) => ({
      userId: user._id.toString(),

      title: "⏳ یادآوری پایان قرارداد",

      message: `سلام ${user.firstName} ${user.lastName}،
قرارداد شما در تاریخ ${new Date(user.contractEndDate).toLocaleDateString(
        "fa-IR",
      )} به پایان می‌رسد.
لطفاً برای تمدید قرارداد اقدام نمایید.`,

      type: "contract_expiry" as const,
      deduplicationKey: `${user._id}-contract_expiry-${dateKey}`,
    }));

    await notificationService.sendMany(notifications);
  }
}

export default new ContractExpiryReminder();
