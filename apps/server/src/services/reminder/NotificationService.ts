import NotificationModel from "../../models/notification.model.js";

type SendNotification = {
  userId: string;
  title: string;
  message: string;
  type:
    | "file_received"
    | "request_approved"
    | "request_rejected"
    | "request_completed"
    | "appointment_approved"
    | "appointment_rejected"
    | "appointment_completed"
    | "appointment_rescheduled"
    | "reminder"
    | "contract_start"
    | "contract_expiry"
    | "birthday";

  deduplicationKey?: string;
  link?: string;
};
class NotificationService {
  async send(data: SendNotification) {
    return NotificationModel.create({
      user: data.userId,
      title: data.title,
      message: data.message,
      type: data.type,
      link: data.link,
      deduplicationKey: data.deduplicationKey,
    });
  }

  async sendMany(notifications: SendNotification[]) {
    if (!notifications.length) return;

    const docs = notifications.map((n) => ({
      user: n.userId,
      title: n.title,
      message: n.message,
      type: n.type,
      link: n.link,
      deduplicationKey: n.deduplicationKey,
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
