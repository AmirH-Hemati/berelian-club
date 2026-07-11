import NotificationModel from "../../models/notification.model.js";

type SendNotification = {
  userId: string;

  title: string;

  message: string;

  type: "contract_start" | "contract_expiry" | "birthday" | "reminder";
};
class NotificationService {
  async send(data: SendNotification) {
    const today = new Date().toISOString().split("T")[0];
    return NotificationModel.create({
      user: data.userId,
      title: data.title,
      message: data.message,
      type: data.type,
      deduplicationKey: `${data.type}-${today}`,
    });
  }
  async sendMany(notifications: SendNotification[]) {
    if (!notifications.length) return;
    const today = new Date().toISOString().split("T")[0];

    const docs = notifications.map((n) => ({
      user: n.userId,
      title: n.title,
      message: n.message,
      type: n.type,
      deduplicationKey: `${n.type}-${today}`,
    }));
    try {
      await NotificationModel.insertMany(docs, {
        ordered: false,
      });
    } catch (error: any) {
      if (error.code !== 11000) {
        throw error;
      }
    }
  }
}

export default new NotificationService();
