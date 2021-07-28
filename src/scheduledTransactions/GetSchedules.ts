import { A1Notation, Schedule } from "./types";

export async function GetSchedules(range: A1Notation): Promise<Schedule[]> {
  if (!range) return [];
  const sheet = await SpreadsheetApp.getActiveSpreadsheet();
  const dataRange = await sheet.getRange(range);
  const schedules = await dataRange.getValues();
  return schedules as Schedule[];
}
