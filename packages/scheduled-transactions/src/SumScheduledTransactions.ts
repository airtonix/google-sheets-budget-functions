import { Schedule } from "./types";
import { ENUM_SCHEDULE_CELL_Amount } from "./constants";

export function SumScheduledTransactions(schedules: Schedule[]) {
  return schedules.reduce((result, schedule) => {
    return result + (schedule[ENUM_SCHEDULE_CELL_Amount] || 0);
  }, 0);
}
