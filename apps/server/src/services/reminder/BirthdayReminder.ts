import UserModel from "../../models/user.model.js";
import NotificationService from "./NotificationService.js";

class BirthdayReminder {
  async run(today: Date) {
    today.setHours(0, 0, 0, 0);

    const month = today.getMonth() + 1;
    const day = today.getDate();

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
    }));

    await NotificationService.sendMany(notifications);
  }
}

export default new BirthdayReminder();
