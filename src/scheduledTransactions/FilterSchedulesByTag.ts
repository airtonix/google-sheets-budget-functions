import { Schedule } from "./types";
import { GetScheduleTags } from "./GetScheduleTags";

export function FilterSchedulesByTag(
  schedules: Schedule[],
  tags: string[] | string
) {
  const searchTags = (typeof tags === "string" && [tags]) || tags;
  if (!schedules || !searchTags) return [];

  return schedules.filter(
    (row) =>
      GetScheduleTags(row).filter((tag) => searchTags.includes(tag)).length > 0
  );
}
