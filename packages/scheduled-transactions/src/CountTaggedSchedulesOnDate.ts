import { GetTaggedSchedulesOnDate } from "./GetTaggedSchedulesOnDate";
import { Schedule } from "./types";

export async function CountTaggedSchedulesOnDateCount(
  range: Schedule[],
  date: Date,
  tags: string | string[]
): Promise<number> {
  const schedules = await GetTaggedSchedulesOnDate(range, date, tags);
  return schedules.length;
}
