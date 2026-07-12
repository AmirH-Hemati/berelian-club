export interface NotificationType {
  _id: string;
  title: string;
  message: string;
  isRead: boolean;
  type: "birthday" | "contract_expiry" | "contract_start" | "reminder" | "type";
  createdAt: string;
  updatedAt: string;
}
