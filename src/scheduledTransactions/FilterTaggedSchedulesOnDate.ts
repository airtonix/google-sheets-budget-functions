import { Schedule } from "./types";
import { FilterSchedulesByTag } from "./FilterSchedulesByTag";
import { FilterActiveSchedules } from "./FilterActiveSchedules";
import { FilterSchedulesOnDate } from "./FilterSchedulesOnDate";

export function FilterTaggedSchedulesOnDate(
  schedules: Schedule[],
  date: Date,
  tags?: string | string[]
) {
  const activeSchedules = FilterActiveSchedules(schedules, date);
  const schedulesForDate = FilterSchedulesOnDate(activeSchedules, date);
  return (
    (tags && FilterSchedulesByTag(schedulesForDate, tags)) || schedulesForDate
  );
}
