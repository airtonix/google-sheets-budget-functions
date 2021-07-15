type A1Notation = string;

type InactiveSchedule = [string, string, number, undefined, undefined, number];
type IndefiniteActiveSchedule = [
  string,
  string,
  number,
  Date,
  undefined,
  number
];
type ActiveSchedule = [string, string, number, Date, Date, number];

type Schedule = InactiveSchedule | IndefiniteActiveSchedule | ActiveSchedule;

// const ENUM_SCHEDULE_CELL_Name = 0;
const ENUM_SCHEDULE_CELL_Tags = 1;
const ENUM_SCHEDULE_CELL_Amount = 2;
const ENUM_SCHEDULE_CELL_Start = 3;
const ENUM_SCHEDULE_CELL_End = 4;
const ENUM_SCHEDULE_CELL_Frequency = 5;

export const SumScheduledTransactions = (
  range: A1Notation,
  date: Date,
  tags?: string | string[]
) => {
  return GetScheduledTransactions(range, date, tags).reduce(
    (result, schedule) => {
      return result + (schedule[ENUM_SCHEDULE_CELL_Amount] || 0);
    },
    0
  );
};

export function GetScheduledTransactions(
  range: A1Notation,
  date: Date,
  tags?: string | string[]
) {
  let schedules = FilterSchedulesOnDate(
    FilterActiveSchedules(GetSchedules(range), date),
    date
  );

  return tags ? FilterSchedulesByTag(schedules, tags) : schedules;
}

export function GetSchedules(range: A1Notation): Schedule[] {
  if (!range) return [];
  return SpreadsheetApp.getActiveSpreadsheet()
    .getRange(range)
    .getValues() as Schedule[];
}

export const FilterSchedulesByTag = (
  schedules: Schedule[],
  tags: string[] | string
) => {
  if (!schedules) return [];
  const searchTags = (typeof tags === "string" && [tags]) || tags;
  if (!searchTags) return [];

  return schedules.filter((row) => {
    const tags = row[ENUM_SCHEDULE_CELL_Tags];
    if (!tags) return false;
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => searchTags.includes(tag));
  });
};

export const GetSchedulesByTag = (
  range: A1Notation,
  tags: string[] | string
) => {
  const schedules = GetSchedules(range);
  return FilterSchedulesByTag(schedules, tags);
};

export const FilterActiveSchedules = (schedules: Schedule[], date: Date) => {
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
};

export const FilterSchedulesOnDate = (
  schedules: (ActiveSchedule | IndefiniteActiveSchedule)[],
  date: Date
) => {
  const time = date.getTime();
  return schedules.filter((schedule) => {
    // work out frequency
    const startDate = schedule[ENUM_SCHEDULE_CELL_Start].getTime();
    return (
      Math.ceil(startDate - time / schedule[ENUM_SCHEDULE_CELL_Frequency]) == 0
    );
  });
};

export const GetAllSchedulesForDate = (range: A1Notation, date: Date) => {
  const schedules = GetSchedules(range);
  return FilterSchedulesOnDate(FilterActiveSchedules(schedules, date), date);
};
