import { Schedule } from "./types";
import { ENUM_SCHEDULE_CELL_Tags } from "./constants";

export function GetScheduleTags(schedule: Schedule) {
  const tags = schedule[ENUM_SCHEDULE_CELL_Tags];
  return (
    (typeof tags == "string" && tags.split(",").map((tag) => tag.trim())) || []
  );
}
