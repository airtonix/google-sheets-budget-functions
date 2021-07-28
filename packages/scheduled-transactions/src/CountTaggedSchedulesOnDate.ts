import { GetTaggedSchedulesOnDate } from "./GetTaggedSchedulesOnDate";
import { A1Notation } from "./types";

export async function CountTaggedSchedulesOnDateCount(
  range: A1Notation,
  date: Date,
  tags: string | string[]
): Promise<number> {
  const schedules = await GetTaggedSchedulesOnDate(range, date, tags);
  return schedules.length;
}
