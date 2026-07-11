import cron from "node-cron";

import BirthdayReminder from "./BirthdayReminder.js";
import ContractStartReminder from "./ContractStartReminder.js";
import ContractExpiryReminder from "./ContractExpiryReminder.js";
const DAILY_AT_8_AM = "0 8 * * *";
// const DAILY_AT_8_AM = "* * * * * *";

class ReminderScheduler {
  start() {
    cron.schedule(DAILY_AT_8_AM, async () => {
      const today = new Date();

      console.log(`🔄 Running reminders - ${today.toLocaleString("fa-IR")}`);

      const results = await Promise.allSettled([
        BirthdayReminder.run(today),
        ContractStartReminder.run(today),
        ContractExpiryReminder.run(today),
      ]);

      results.forEach((result) => {
        if (result.status === "rejected") {
          console.error(result.reason);
        }
      });
    });
  }
}

export default new ReminderScheduler();
