import differenceInCalendarDays from "date-fns/differenceInBusinessDays";
import differenceInDays from "date-fns/differenceInDays";

import { Schedule } from "./types";
import {
  ENUM_SCHEDULE_CELL_Frequency,
  ENUM_SCHEDULE_CELL_Start,
} from "./constants";

export function FilterSchedulesOnDate(schedules: Schedule[], date: Date) {
  return schedules.filter((schedule) => {
    const start = schedule[ENUM_SCHEDULE_CELL_Start];
    const frequency = schedule[ENUM_SCHEDULE_CELL_Frequency];
    if (!start || !frequency) return false;

    const distance = differenceInDays(date, start);
    const variance = Math.ceil(distance % frequency);
    const isForDate = variance === 0;
    return isForDate;
  });
}
