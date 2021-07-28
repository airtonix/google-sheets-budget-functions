import { differenceInCalendarDays } from "date-fns";

import { Schedule } from "./types";
import {
  ENUM_SCHEDULE_CELL_Frequency,
  ENUM_SCHEDULE_CELL_Start,
} from "./constants";

export function FilterSchedulesOnDate(schedules: Schedule[], date: Date) {
  return schedules.filter((schedule) => {
    const cell = schedule[ENUM_SCHEDULE_CELL_Start];
    const frequency = schedule[ENUM_SCHEDULE_CELL_Frequency];
    if (!cell || !frequency) return false;

    const distance = differenceInCalendarDays(date, cell);
    const variance = Math.ceil(distance % frequency);
    const isForDate = variance == 0;
    return isForDate;
  });
}
