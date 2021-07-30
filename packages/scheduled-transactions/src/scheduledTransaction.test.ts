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
} from ".";

const TODAY = new Date();
const ONE_YEAR_AGO = subYears(TODAY, 1);
const IN_A_MONTHS_TIME = addMonths(TODAY, 1);
const A_WEEK_AGO = subWeeks(TODAY, 1);
const IN_FOUR_WEEKS = addWeeks(TODAY, 4);
const END_OF_NEXT_MONTH = subDays(IN_A_MONTHS_TIME, 1);
const ON_FIRST_28_DAY = addDays(ONE_YEAR_AGO, 28);
const IN_TEN_DAYS = addDays(TODAY, 10);
const TEN_DAYS_AGO = subDays(TODAY, 10);

jest.mock("./GetSchedules", () => {
  return {
    GetSchedules: async (): Promise<Schedule[]> => [
      [
        "SalaryMonthlyForeverEndsNextMonth",
        "Income, Salary",
        100,
        ONE_YEAR_AGO,
        END_OF_NEXT_MONTH,
        28,
      ],
      [
        "SalaryMonthlyForeverStartsNextMonth",
        "Income, Salary",
        100,
        IN_A_MONTHS_TIME,
        undefined,
        28,
      ],
      ["DailySavings", "Expenses, Savings", 20, ONE_YEAR_AGO, undefined, 1],
      [
        "WeeklyForeverStartsLastWeek",
        "Expenses, Rent",
        350,
        A_WEEK_AGO,
        undefined,
        7,
      ],
      [
        "WeeklyForFiveWeeksStartsLastWeek",
        "Expenses, Fines",
        250,
        A_WEEK_AGO,
        IN_FOUR_WEEKS,
        7,
      ],
      [
        "MonthlyForeverStartsToday",
        "Expenses, Internet",
        75,
        TODAY,
        undefined,
        28,
      ],
    ],
  };
});

describe("ScheduledTransactions", () => {
  it("FilterSchedulesByTag", () => {
    const schedules: Schedule[] = [
      ["Name", "Bar", 100, IN_TEN_DAYS, undefined, 28],
      ["Name", "Foo, Bar", 100, IN_TEN_DAYS, undefined, 28],
      ["Name", "Kaboom, Foo", 100, TEN_DAYS_AGO, undefined, 28],
      ["Name", "Kaboom, Bar, Baz", 100, TEN_DAYS_AGO, undefined, 28],
    ];
    expect(FilterSchedulesByTag(schedules, "Foo")).toHaveLength(2);
    expect(FilterSchedulesByTag(schedules, "Bar")).toHaveLength(3);
    expect(FilterSchedulesByTag(schedules, "Kaboom")).toHaveLength(2);
    expect(FilterSchedulesByTag(schedules, "Baz")).toHaveLength(1);
  });

  it("FilterActiveSchedules", () => {
    const schedules: Schedule[] = [
      ["DoesntStartYet", "SomeTags", 100, addDays(TODAY, 10), undefined, 1],
      ["Daily", "SomeTags", 100, subDays(TODAY, 10), undefined, 1],
      ["Weekly", "SomeTags", 100, subDays(TODAY, 7), undefined, 7],
      ["Monthly", "SomeTags", 100, subDays(TODAY, 28), undefined, 28],
    ];
    expect(FilterActiveSchedules(schedules, TODAY)).toHaveLength(3);
  });

  it("GetTaggedSchedulesOnDate should show 2 expenses", async () => {
    expect(
      await GetTaggedSchedulesOnDate("A1:F10", ON_FIRST_28_DAY, "Expenses")
    ).toHaveLength(1);
  });
  it("GetTaggedSchedulesOnDate should show 1 Income", async () => {
    expect(
      await GetTaggedSchedulesOnDate("A1:F10", ON_FIRST_28_DAY, "Income")
    ).toHaveLength(1);
  });

  it("SumTaggedSchedulesOnDate should show 2 Income", async () => {
    expect(
      await SumTaggedSchedulesOnDate("A1:F10", ON_FIRST_28_DAY, [
        "Income",
        "Expenses",
      ])
    ).toBe(120);
  });
});
