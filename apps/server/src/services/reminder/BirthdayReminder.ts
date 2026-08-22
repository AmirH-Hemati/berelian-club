import { notificationService } from "../../container/index.js";
import UserModel from "../../models/user.model.js";

class BirthdayReminder {
  async run(today: Date) {
    today.setHours(0, 0, 0, 0);

    const month = today.getMonth() + 1;
    const day = today.getDate();
    const dateKey = today.toISOString().split("T")[0];

    const users = await UserModel.find({
      birthMonth: month,
      birthDay: day,
      isActive: true,
    })
      .select("_id firstName lastName")
      .lean();

    if (!users.length) return;
    const notifications = users.map((user) => ({
      userId: user._id.toString(),
      title: "🎂 تولدت مبارک",
      message: `${user.firstName} ${user.lastName} عزیز، تولدت مبارک. برایت سلامتی و موفقیت آرزو می‌کنیم.`,
      type: "birthday" as const,
      deduplicationKey: `${user._id}-birthday-${dateKey}`,
    }));

    await notificationService.sendMany(notifications);
  }
}

export default new BirthdayReminder();
