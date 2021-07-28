import { A1Notation } from "./types";
import { GetSchedules } from "./GetSchedules";
import { GetScheduleTags } from "./GetScheduleTags";

export async function ListScheduleTags(range: A1Notation) {
  const schedules = await GetSchedules(range);
  return [
    ...new Set(
      schedules.reduce<string[]>((result, schedule) => {
        return [...result, ...GetScheduleTags(schedule)];
      }, [])
    ),
  ];
}
