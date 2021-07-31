import { FilterSchedulesOnDate } from "./FilterSchedulesOnDate";
import { FilterActiveSchedules } from "./FilterActiveSchedules";
import { FilterSchedulesByTag } from "./FilterSchedulesByTag";
import { Schedule } from "./types";

export async function GetTaggedSchedulesOnDate(
  schedules: Schedule[],
  date: Date,
  tags: string | string[]
): Promise<Schedule[]> {
  const taggedSchedules = FilterSchedulesByTag(schedules, tags);
  const activeSchedules = FilterActiveSchedules(taggedSchedules, date);
  const schedulesForDate = FilterSchedulesOnDate(activeSchedules, date);
  return schedulesForDate;
}
