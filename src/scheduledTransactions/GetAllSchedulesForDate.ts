import { A1Notation } from "./types";
import { GetSchedules } from "./GetSchedules";
import { FilterSchedulesOnDate } from "./FilterSchedulesOnDate";
import { FilterActiveSchedules } from "./FilterActiveSchedules";

export async function GetAllSchedulesForDate(range: A1Notation, date: Date) {
  const schedules = await GetSchedules(range);
  const activeSchedulesForDate = FilterActiveSchedules(schedules, date);
  return FilterSchedulesOnDate(activeSchedulesForDate, date);
}
