import { Schedule } from "./types";
import { FilterSchedulesOnDate } from "./FilterSchedulesOnDate";
import { FilterActiveSchedules } from "./FilterActiveSchedules";

export async function GetAllSchedulesForDate(
  schedules: Schedule[],
  date: Date
) {
  const activeSchedulesForDate = FilterActiveSchedules(schedules, date);
  return FilterSchedulesOnDate(activeSchedulesForDate, date);
}
