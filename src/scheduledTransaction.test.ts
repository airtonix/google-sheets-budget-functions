import { addDays, subDays } from "date-fns";

import {
  FilterActiveSchedules,
  FilterSchedulesByTag,
  Schedule,
} from "./scheduledTransactions";

describe("ScheduledTransactions", () => {
  const today = new Date();
  const schedules: Schedule[] = [
    ["Name", "Foo, Bar", 100, subDays(today, 20), addDays(today, 20), 28],
    ["Name", "Foo", 100, subDays(today, 20), undefined, 28],
    ["Name", "Foo", 100, subDays(today, 20), subDays(today, 10), 28],
    ["Name", "Bar", 100, addDays(today, 10), undefined, 28],
  ];

  it("FilterSchedulesByTag", () => {
    expect(FilterSchedulesByTag(schedules, "Foo")).toHaveLength(3);
    expect(FilterSchedulesByTag(schedules, "Bar")).toHaveLength(2);
  });

  it("FilterActiveSchedules", () => {
    expect(FilterActiveSchedules(schedules, today)).toHaveLength(2);
  });

  it("FilterActiveSchedules", () => {
    expect(FilterActiveSchedules(schedules, today)).toHaveLength(2);
  });
});
