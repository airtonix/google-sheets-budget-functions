import { FilterSchedulesOnDate } from "./FilterSchedulesOnDate";
import { FilterActiveSchedules } from "./FilterActiveSchedules";
import { FilterSchedulesByTag } from "./FilterSchedulesByTag";
import { A1Notation, Schedule } from "./types";
import { GetSchedules } from "./GetSchedules";

export async function GetTaggedSchedulesOnDate(
  range: A1Notation,
  date: Date,
  tags: string | string[]
): Promise<Schedule[]> {
  const schedules = await GetSchedules(range);
  const taggedSchedules = FilterSchedulesByTag(schedules, tags);
  const activeSchedules = FilterActiveSchedules(taggedSchedules, date);
  const schedulesForDate = FilterSchedulesOnDate(activeSchedules, date);
  return schedulesForDate;
}
