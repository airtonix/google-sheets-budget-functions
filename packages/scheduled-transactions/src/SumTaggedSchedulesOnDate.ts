import { SumScheduledTransactions } from "./SumScheduledTransactions";
import { GetTaggedSchedulesOnDate } from "./GetTaggedSchedulesOnDate";
import { Schedule } from "./types";

export async function SumTaggedSchedulesOnDate(
  range: Schedule[],
  date: Date,
  tags: string | string[]
): Promise<number> {
  const schedules = await GetTaggedSchedulesOnDate(range, date, tags);
  return SumScheduledTransactions(schedules);
}
