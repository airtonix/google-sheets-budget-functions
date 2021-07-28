import { A1Notation } from "./types";
import { GetSchedules } from "./GetSchedules";
import { FilterSchedulesByTag } from "./FilterSchedulesByTag";

export async function GetScheduleTagCount(
  range: A1Notation,
  tags: string | string[]
) {
  const schedules = await GetSchedules(range);
  return FilterSchedulesByTag(schedules, tags).length;
}
