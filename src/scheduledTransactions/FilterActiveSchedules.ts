import { Schedule } from "./types";
import { ENUM_SCHEDULE_CELL_End, ENUM_SCHEDULE_CELL_Start } from "./constants";

export function FilterActiveSchedules(schedules: Schedule[], date: Date) {
  const time = date.getTime();
  const output: Schedule[] = [];
  for (const schedule of schedules) {
    const startDate = schedule[ENUM_SCHEDULE_CELL_Start];
    const endDate = schedule[ENUM_SCHEDULE_CELL_End];

    // is still going
    const startedButNotYetFinished =
      !!endDate &&
      !!startDate &&
      startDate.getTime() <= time &&
      endDate.getTime() > time;

    const startedButDoesntEnd =
      !endDate && !!startDate && startDate.getTime() < time;

    if (startedButNotYetFinished || startedButDoesntEnd) {
      output.push(schedule);
    }
  }
  return output;
}
