import { SumScheduledTransactions } from "./SumScheduledTransactions";
import { GetTaggedSchedulesOnDate } from "./GetTaggedSchedulesOnDate";
import { A1Notation } from "./types";

export async function SumTaggedSchedulesOnDate(
  range: A1Notation,
  date: Date,
  tags: string | string[]
): Promise<number> {
  const schedules = await GetTaggedSchedulesOnDate(range, date, tags);
  return SumScheduledTransactions(schedules);
}
