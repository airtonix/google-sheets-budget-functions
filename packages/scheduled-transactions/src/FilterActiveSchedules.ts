import { Schedule } from "./types";
import { ENUM_SCHEDULE_CELL_End, ENUM_SCHEDULE_CELL_Start } from "./constants";

export function FilterActiveSchedules(schedules: Schedule[], date: Date) {
  const time = date.getTime();
  const output: Schedule[] = [];
  for (const schedule of schedules) {
    const startDate = schedule[ENUM_SCHEDULE_CELL_Start];
    const endDate = schedule[ENUM_SCHEDULE_CELL_End];

    // is still going
    if (
      !!endDate &&
      !!startDate &&
      startDate.getTime() <= time &&
      endDate.getTime() > time
    ) {
      output.push(schedule);
    } else if (!endDate && !!startDate && startDate.getTime() < time) {
      output.push(schedule);
    }
  }
  return output;
}
