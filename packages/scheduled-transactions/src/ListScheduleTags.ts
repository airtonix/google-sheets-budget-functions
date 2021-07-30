import { A1Notation } from "./types";
import { GetSchedules } from "./GetSchedules";
import { GetScheduleTags } from "./GetScheduleTags";

export async function ListScheduleTags(range: A1Notation) {
  const schedules = await GetSchedules(range);
  const output: string[] = [];
  for (const schedule of schedules) {
    for (const tag of GetScheduleTags(schedule)) {
      if (output.includes(tag)) continue;
      output.push(tag);
    }
  }
  return output;
}
