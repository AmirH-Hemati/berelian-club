import cron from "node-cron";
import UserModel from "../models/user.model.js";
import NotificationModel from "../models/notification.model.js";

class ReminderService {
  private async runJob(name: string, handler: () => Promise<void>) {
    try {
      console.log(`Running ${name}`);

      await handler();

      console.log(`${name} finished`);
    } catch (err) {
      console.error(`${name} failed`, err);
    }
  }
  private async checkContractExpiry() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const twoDaysLater = new Date();
    twoDaysLater.setDate(today.getDate() + 2);
    twoDaysLater.setHours(23, 59, 59, 999);

    const users = await UserModel.find({
      contractEndDate: {
        $gte: twoDaysLater,
        $lte: new Date(twoDaysLater.getTime() + 24 * 60 * 60 * 1000),
      },
      isActive: true,
    });

    for (const user of users) {
      const existingNotification = await NotificationModel.findOne({
        user: user._id,
        type: "contract_expiry",
        createdAt: { $gte: today },
      });

      if (!existingNotification) {
        await NotificationModel.create({
          user: user._id,
          title: "تمدید قرارداد",
          message: `قرارداد شما در تاریخ ${new Date(user.contractEndDate).toLocaleDateString("fa-IR")} به پایان میرسد .
          لطفا جهت تمدید اقدام فرمایید`,
          type: "contract_expiry",
        });
      }
    }
  }

  private async checkContractStart() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const users = await UserModel.find({
      contractStartDate: {
        $gte: today,
        $lt: tomorrow,
      },
      isActive: true,
    });

    for (const user of users) {
      const existingNotification = await NotificationModel.findOne({
        user: user._id,
        type: "contract_start",
        createdAt: { $gte: today },
      });

      if (!existingNotification) {
        await NotificationModel.create({
          user: user._id,
          title: "شروع قرارداد",
          message: `قرارداد شما از امروز ${new Date().toLocaleDateString("fa-IR")} آغاز شد.`,
          type: "contract_start",
        });
      }
    }
  }

  private async checkBirthdays() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    const users = await UserModel.aggregate([
      {
        $match: {
          isActive: true,
          birthDate: { $exists: true, $ne: null },
        },
      },
      {
        $addFields: {
          birthMonth: { $month: "$birthDate" },
          birthDay: { $dayOfMonth: "$birthDate" },
        },
      },
      {
        $match: {
          birthMonth: todayMonth,
          birthDay: todayDay,
        },
      },
    ]);

    for (const user of users) {
      const existingNotification = await NotificationModel.findOne({
        user: user._id,
        type: "birthday",
        createdAt: { $gte: today },
      });

      if (!existingNotification) {
        await NotificationModel.create({
          user: user._id,
          title: "تولدت مبارک! 🎂",
          message: `تولد ${user.firstName} ${user.lastName} عزیز مبارک. برات آرزوی موفقیت و سلامتی داریم.`,
          type: "birthday",
        });
      }
    }
  }

  start() {
    cron.schedule("0 8 * * *", async () => {
      console.log(
        "🔄 Running daily reminder checks...",
        new Date().toLocaleString("fa-IR"),
      );
      await this.runJob("Contract Expiry", () => this.checkContractExpiry());

      await this.runJob("Contract Start", () => this.checkContractStart());

      await this.runJob("Birthday", () => this.checkBirthdays());
    });
  }
}

export default new ReminderService();
