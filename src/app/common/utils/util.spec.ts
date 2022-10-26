import { StatusAttendance } from '../interfaces';
import { Util } from './util';

fdescribe('Util', () => {
  let mockAttendanceHistoryUser: StatusAttendance = {
    isActive: false,
    isLater: false,
    isAbsent: false,
    date: '2022-09-12 00:00:00',
    isDayOff: false,
  };

  it('validate formatDateToHour', () => {
    const dateOneDigit = new Date('2022-09-06 00:00:00');
    const dateTwoDigit = new Date('2022-09-06 12:12:00');

    const formatedOneDigit = Util.formatDateToHour(dateOneDigit);
    const formatedTwoDigit = Util.formatDateToHour(dateTwoDigit);
    expect(formatedOneDigit).toEqual('00:00');
    expect(formatedTwoDigit).toEqual('12:12');
  });

  it('validate isInvalidRangeHour', () => {
    const dateStart = new Date();
    const dateEnd = new Date();
    expect(Util.isInvalidRangeHour(dateStart, dateEnd)).toBeTruthy();
    expect(Util.isInvalidRangeHour(null, null)).toBeFalsy();
  });

  it('validate formatHourToDate ', () => {
    const dateString = '12:12';
    const date = new Date();
    date.setHours(12, 12);
    const formatHourToDate = Util.formatHourToDate(dateString);
    expect(formatHourToDate).toEqual(date);
  });

  xit('validate getRestDaysOfWeek', () => {
    const dayOfWeek = new Date('2022-09-12').getDay() + 1;
    const listDate: string[] = [
      new Date('2022-09-13 00:00:00').toDateString(),
      new Date('2022-09-14 00:00:00').toDateString(),
      new Date('2022-09-15 00:00:00').toDateString(),
      new Date('2022-09-16 00:00:00').toDateString(),
      new Date('2022-09-17 00:00:00').toDateString(),
      new Date('2022-09-18 00:00:00').toDateString(),
    ];
    const listRestDaysOfWeek = Util.getRestDaysOfWeek(
      mockAttendanceHistoryUser,
      dayOfWeek,
    );
    expect(listRestDaysOfWeek).toEqual(listDate);
  });

  it('Validate currentSeconds', () => {
    const currentSeconds = Util.currentSeconds();
    expect(currentSeconds).toBeGreaterThan(0);
  });

  it('Validate totalSecondsOfSchedule', () => {
    const entryHour = '12:00';
    const exitHour = '20:00';
    const totalSecondsOfSchedule = Util.totalSecondsOfSchedule(entryHour, exitHour);
    expect(totalSecondsOfSchedule).toEqual(28800);
  });

  it('Validate restSecondsOfDay', () => {
    const exitHour = '22:00';
    const spyUtilCurrentSeconds = spyOn(Util, 'currentSeconds').and.returnValue(0);
    const restSecondsOfDay = Util.restSecondsOfDay(exitHour);

    expect(restSecondsOfDay).toEqual(79200);
    expect(spyUtilCurrentSeconds).toHaveBeenCalled();
  });

  it('Validate currentDayOfWeek', () => {
    // Sunday -> 6
    const mockCurrentDateSunday = '2022-09-18';
    expect(Util.currentDayOfWeek(mockCurrentDateSunday)).toEqual(7);
    // Monday -> 7
    const mockCurrentDateMonday = '2022-09-19';
    expect(Util.currentDayOfWeek(mockCurrentDateMonday)).toEqual(1);
    // Tuesday -> 1
    const mockCurrentDateTuesday = '2022-09-20';
    expect(Util.currentDayOfWeek(mockCurrentDateTuesday)).toEqual(2);
    // Wesnesday -> 2
    const mockCurrentDateWesnesday = '2022-09-21';
    expect(Util.currentDayOfWeek(mockCurrentDateWesnesday)).toEqual(3);
    // Thursday -> 3
    const mockCurrentDateThursday = '2022-09-22';
    expect(Util.currentDayOfWeek(mockCurrentDateThursday)).toEqual(4);
    // Friday -> 4
    const mockCurrentDateFriday = '2022-09-23';
    expect(Util.currentDayOfWeek(mockCurrentDateFriday)).toEqual(5);
    // Saturday -> 5
    const mockCurrentDateSaturday = '2022-09-24';
    expect(Util.currentDayOfWeek(mockCurrentDateSaturday)).toEqual(6);
    /*
    // Sunday -> 6
    const mockCurrentDateSunday = '2022-09-18';
    expect(Util.currentDayOfWeek(mockCurrentDateSunday)).toEqual(6);
    // Monday -> 7
    const mockCurrentDateMonday = '2022-09-19';
    expect(Util.currentDayOfWeek(mockCurrentDateMonday)).toEqual(7);
    // Tuesday -> 1
    const mockCurrentDateTuesday = '2022-09-20';
    expect(Util.currentDayOfWeek(mockCurrentDateTuesday)).toEqual(1);
    // Wesnesday -> 2
    const mockCurrentDateWesnesday = '2022-09-21';
    expect(Util.currentDayOfWeek(mockCurrentDateWesnesday)).toEqual(2);
    // Thursday -> 3
    const mockCurrentDateThursday = '2022-09-22';
    expect(Util.currentDayOfWeek(mockCurrentDateThursday)).toEqual(3);
    // Friday -> 4
    const mockCurrentDateFriday = '2022-09-23';
    expect(Util.currentDayOfWeek(mockCurrentDateFriday)).toEqual(4);
    // Saturday -> 5
    const mockCurrentDateSaturday = '2022-09-24';
    expect(Util.currentDayOfWeek(mockCurrentDateSaturday)).toEqual(5);*/
  });
});
