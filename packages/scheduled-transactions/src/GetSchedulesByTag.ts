import { Schedule } from "./types";
import { FilterSchedulesByTag } from "./FilterSchedulesByTag";

export async function GetSchedulesByTag(
  schedules: Schedule[],
  tags: string[] | string
) {
  return FilterSchedulesByTag(schedules, tags);
}
