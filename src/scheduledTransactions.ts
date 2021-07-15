export type A1Notation = string;

export type InactiveSchedule = [
  string,
  string,
  number,
  undefined,
  undefined,
  number
];
export type IndefiniteActiveSchedule = [
  string,
  string,
  number,
  Date,
  undefined,
  number
];
export type ActiveSchedule = [string, string, number, Date, Date, number];

export type Schedule =
  | InactiveSchedule
  | IndefiniteActiveSchedule
  | ActiveSchedule;

// const ENUM_SCHEDULE_CELL_Name = 0;
const ENUM_SCHEDULE_CELL_Tags = 1;
const ENUM_SCHEDULE_CELL_Amount = 2;
const ENUM_SCHEDULE_CELL_Start = 3;
const ENUM_SCHEDULE_CELL_End = 4;
const ENUM_SCHEDULE_CELL_Frequency = 5;

export async function GetSchedules(range: A1Notation): Promise<Schedule[]> {
  if (!range) return [];
  const sheet = await SpreadsheetApp.getActiveSpreadsheet();
  const dataRange = await sheet.getRange(range);
  const schedules = await dataRange.getValues();
  return schedules as Schedule[];
}

export async function GetTaggedSchedulesOnDate(
  range: A1Notation,
  date: Date,
  tags?: string | string[]
) {
  const schedules = await GetSchedules(range);
  return FilterTaggedSchedulesOnDate(schedules, date, tags);
}

export async function GetSchedulesByTag(
  range: A1Notation,
  tags: string[] | string
) {
  const schedules = await GetSchedules(range);
  return FilterSchedulesByTag(schedules, tags);
}

export async function GetScheduleTags(range: A1Notation) {
  const schedules = await GetSchedules(range);
  return schedules.map((schedule) => schedule[ENUM_SCHEDULE_CELL_Tags]);
}

export async function GetScheduleTagCount(
  range: A1Notation,
  tags: string | string[]
) {
  const schedules = await GetSchedules(range);
  return FilterSchedulesByTag(schedules, tags).length;
}

export async function GetAllSchedulesForDate(range: A1Notation, date: Date) {
  const schedules = await GetSchedules(range);
  const activeSchedulesForDate = FilterActiveSchedules(schedules, date);
  return FilterSchedulesOnDate(activeSchedulesForDate, date);
}

export async function SumScheduledTransactions(schedules: Schedule[]) {
  return schedules.reduce((result, schedule) => {
    return result + (schedule[ENUM_SCHEDULE_CELL_Amount] || 0);
  }, 0);
}

export function FilterSchedulesByTag(
  schedules: Schedule[],
  tags: string[] | string
) {
  const searchTags = (typeof tags === "string" && [tags]) || tags;
  if (!schedules || !searchTags) return [];

  return schedules.filter((row) => {
    const tags = row[ENUM_SCHEDULE_CELL_Tags];
    if (!tags) return false;
    return (
      tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => searchTags.includes(tag)).length > 0
    );
  });
}

export function FilterActiveSchedules(schedules: Schedule[], date: Date) {
  const time = date.getTime();
  return schedules.filter((schedule): boolean => {
    const startDate = schedule[ENUM_SCHEDULE_CELL_Start];
    const endDate = schedule[ENUM_SCHEDULE_CELL_End];

    // is still going
    if (!!endDate && !!startDate) {
      return startDate.getTime() <= time && endDate.getTime() > time;
    }

    // has this schedule started?. (it runs indefinitely).
    else if (!endDate && !!startDate) {
      return startDate.getTime() < time;
    }

    // this schedule isn't active yet.
    return false;
  }) as (ActiveSchedule | IndefiniteActiveSchedule)[];
}

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

export function FilterSchedulesOnDate(
  schedules: (ActiveSchedule | IndefiniteActiveSchedule)[],
  date: Date
) {
  const time = date.getTime();
  return schedules.filter((schedule) => {
    const startDate = schedule[ENUM_SCHEDULE_CELL_Start].getTime();
    return (
      Math.ceil(startDate - time / schedule[ENUM_SCHEDULE_CELL_Frequency]) == 0
    );
  });
}
