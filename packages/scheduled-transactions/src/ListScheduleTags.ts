import { Schedule } from "./types";
import { GetScheduleTags } from "./GetScheduleTags";

export async function ListScheduleTags(schedules: Schedule[]) {
  const output: string[] = [];
  for (const schedule of schedules) {
    for (const tag of GetScheduleTags(schedule)) {
      if (output.indexOf(tag) >= 0) continue;
      output.push(tag);
    }
  }
  return output;
}
