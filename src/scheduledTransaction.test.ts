import {
  addDays,
  addMonths,
  addWeeks,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";

import {
  FilterActiveSchedules,
  FilterSchedulesByTag,
  GetTaggedSchedulesOnDate,
  Schedule,
  SumTaggedSchedulesOnDate,
} from "./scheduledTransactions";

const today = new Date();

jest.mock("./scheduledTransactions/GetSchedules", () => {
  return {
    GetSchedules: async (): Promise<Schedule[]> => [
      [
        "SalaryMonthlyForeverEndsNextMonth",
        "Income, Salary",
        100,
        subYears(today, 1),
        subDays(addMonths(today, 1), 1),
        28,
      ],
      [
        "SalaryMonthlyForeverStartsNextMonth",
        "Income, Salary",
        100,
        addMonths(today, 1),
        undefined,
        28,
      ],
      [
        "DailySavings",
        "Expenses, Savings",
        20,
        subYears(today, 1),
        undefined,
        1,
      ],
      [
        "WeeklyForeverStartsLastWeek",
        "Expenses, Rent",
        350,
        subWeeks(today, 1),
        undefined,
        7,
      ],
      [
        "WeeklyForFiveWeeksStartsLastWeek",
        "Expenses, Fines",
        250,
        subWeeks(today, 1),
        addWeeks(today, 4),
        7,
      ],
      [
        "MonthlyForeverStartsToday",
        "Expenses, Internet",
        75,
        today,
        undefined,
        28,
      ],
    ],
  };
});

describe("ScheduledTransactions", () => {
  it("FilterSchedulesByTag", () => {
    const schedules: Schedule[] = [
      ["Name", "Bar", 100, addDays(today, 10), undefined, 28],
      ["Name", "Foo, Bar", 100, addDays(today, 10), undefined, 28],
      ["Name", "Kaboom, Foo", 100, subDays(today, 10), undefined, 28],
      ["Name", "Kaboom, Bar, Baz", 100, subDays(today, 10), undefined, 28],
    ];
    expect(FilterSchedulesByTag(schedules, "Foo")).toHaveLength(2);
    expect(FilterSchedulesByTag(schedules, "Bar")).toHaveLength(3);
    expect(FilterSchedulesByTag(schedules, "Kaboom")).toHaveLength(2);
    expect(FilterSchedulesByTag(schedules, "Baz")).toHaveLength(1);
  });

  it("FilterActiveSchedules", () => {
    const schedules: Schedule[] = [
      ["DoesntStartYet", "SomeTags", 100, addDays(today, 10), undefined, 1],
      ["Daily", "SomeTags", 100, subDays(today, 10), undefined, 1],
      ["Weekly", "SomeTags", 100, subDays(today, 7), undefined, 7],
      ["Monthly", "SomeTags", 100, subDays(today, 28), undefined, 28],
    ];
    expect(FilterActiveSchedules(schedules, today)).toHaveLength(3);
  });

  it("GetTaggedSchedulesOnDate should show 2 expenses", async () => {
    expect(
      await GetTaggedSchedulesOnDate("A1:F10", today, "Expenses")
    ).toHaveLength(3);
  });
  it("GetTaggedSchedulesOnDate should show 1 Income", async () => {
    expect(
      await GetTaggedSchedulesOnDate(
        "A1:F10",
        addDays(subMonths(today, 12), 28 * 4),
        "Income"
      )
    ).toHaveLength(1);
  });

  it("SumTaggedSchedulesOnDate should show 2 Income", async () => {
    expect(
      await SumTaggedSchedulesOnDate(
        "A1:F10",
        addDays(subMonths(today, 12), 28),
        ["Income", "Expenses"]
      )
    ).toBe(120);
  });
});
