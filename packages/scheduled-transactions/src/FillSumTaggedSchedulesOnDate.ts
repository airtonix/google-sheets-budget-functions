import { Schedule } from "./types";
import { SumTaggedSchedulesOnDate } from "./SumTaggedSchedulesOnDate";

export async function FillSumTaggedSchedulesOnDate(
  dateRange: string[],
  expensesRange: Schedule[],
  tags: string | string[]
) {
  return [
    "",
    ...Array(dateRange.length)
      .fill(0)
      .map((item, index) =>
        SumTaggedSchedulesOnDate(
          expensesRange,
          new Date(dateRange[index]),
          tags
        )
      ),
  ];
}
