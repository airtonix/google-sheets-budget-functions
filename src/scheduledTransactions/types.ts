export type A1NotationSheet = string;
export type A1NotationCell = `${string}${number}`;
export type A1Notation =
  | A1NotationCell
  | `${A1NotationCell}:${A1NotationCell}`
  | `${A1NotationSheet}!${A1NotationCell}:${A1NotationCell}`;

export type ScheduleName = string;
export type ScheduleTags = string;
export type ScheduleAmount = number;
export type ScheduleStartDate = Date | undefined;
export type ScheduleEndDate = Date | undefined;
export type ScheduleFrequency = number;

export type Schedule = [
  ScheduleName,
  ScheduleTags,
  ScheduleAmount,
  ScheduleStartDate,
  ScheduleEndDate,
  ScheduleFrequency
];
