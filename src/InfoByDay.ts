import { Datum } from "./TokyoCoronaData";

export interface InfoByDay {
  date: Date;
  count: number;
  ratio: number;
}

export const InfoByDay = (
  day: Datum,
  sameDayOfLastWeek: Datum
): InfoByDay => {
  return {
    date: new Date(day.diagnosed_date),
    count: day.count,
    ratio: day.count / sameDayOfLastWeek.count
  }
}
