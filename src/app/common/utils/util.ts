import { Constant } from '../constants/Constant';
import { StatusAttendance } from '../interfaces/attendance';

export class Util {
  static formatDateToHour(date): string {
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    if (hours.length == 1) {
      hours = `0${hours}`;
    }
    if (minutes.length == 1) {
      minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
  }

  static formatHourToDate(hour): Date {
    let date = new Date();
    date.setHours(parseInt(hour.slice(0, 2)));
    date.setMinutes(parseInt(hour.slice(3, 5)));
    return date;
  }

  static getRestDaysOfWeek(attendanceHistoryUser: StatusAttendance, dayOfWeek: number) {
    let arrayOfDate: Date[] = [];
    for (let i = 0; i < Constant.TOTAL_DAY_OF_WEEK - dayOfWeek; i++) {
      const result = new Date(attendanceHistoryUser.date);
      arrayOfDate.push(new Date(result.setDate(result.getDate() + i + 1)));
    }
    return arrayOfDate;
  }

  static currentSeconds(): number {
    const now = new Date();
    return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  }

  static totalSecondsOfSchedule(entryHour: string, exitHour: string): number {
    const hoursToSecondsEntryHour = parseInt(entryHour.slice(0, 2)) * 60 * 60;
    const minutesToSecondsEntryHour = parseInt(entryHour.slice(3, 5)) * 60;
    const hoursToSecondsExitHour = parseInt(exitHour.slice(0, 2)) * 60 * 60;
    const minutesToSecondsExitHour = parseInt(exitHour.slice(3, 5)) * 60;

    return (
      (hoursToSecondsExitHour + minutesToSecondsExitHour) -
      (hoursToSecondsEntryHour + minutesToSecondsEntryHour)
    );
  }

  static restSecondsOfDay(exitHour: string): number {
    const currentSeconds = Util.currentSeconds();
    console.log('currentSeconds ', currentSeconds);
    const hoursToSecondsExitHour = parseInt(exitHour.slice(0, 2)) * 60 * 60;
    const minutesToSecondsExitHour = parseInt(exitHour.slice(3, 5)) * 60;
    return hoursToSecondsExitHour + minutesToSecondsExitHour - currentSeconds;
  }
}
