import { Attendance, ScheduleByUser } from '../../common/interfaces';

export class AttendanceMock {
  public static readonly scheduleByUser: ScheduleByUser = {
    dayIsValid: true,
    schedule: {
      id: 1,
      name: 'Mock',
      notificationIsActive: true,
      description: 'Description Mock',
      entryHour: '12:12',
      exitHour: '14:14',
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
      toleranceTime: 15,
    },
  };

  public static readonly attendance: Attendance = {
    isActive: true,
    isLater: false,
    isAbsent: false,
    description: 'string',
    date: '2022-18-09',
    entryTime: '14:14',
    exitTime: '17:17',
  };
  public static readonly descriptionEntryAttendance: string = 'Mock Description';
}
